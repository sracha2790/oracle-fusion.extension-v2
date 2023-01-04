import { AppknitGraphSDK, AppknitSDK } from '@appknit-project/appknit-platform-sdk-v2';
import * as _ from 'lodash';
import { Helpers } from '../../src/utils/helpers';
import { getConfigurationCodeValue } from '../../src/expression-functions';
import { ConfigurationCodesService } from './configuration.service';
import { JurisDataMapper } from './juris-mapper.service';
import { TaxableHeaderWithLines } from '../../src/models/oracle/TaxableHeaders';
import { Transaction, TransactionWithTransactionLines } from '../../src/models/avalara/avalara-response/Transaction';
import { DetailTaxLine } from '../../src/models/oracle/DetailTaxLines';
import { TaxableLinesWithDetailTaxLines } from '../../src/models/oracle/TaxableLines';
import { TransactionLinesWithTransactionLineDetails } from '../../src/models/avalara/avalara-response/TransactionLine';
import { jurisTypeEnum, taxTypeEnum, TransactionLineDetail } from '../../src/models/avalara/avalara-response/TransactionLineDetail';
import { TransactionTypeEnums } from "../../src/models/avalara/TransactionTypes";
import { boolean } from 'joi';
export class ResponseBuilderService {
  private jurisDataMapper: JurisDataMapper;
  private configurationCodesService: ConfigurationCodesService;
  private taxApportionmentLineNumber: number;
  private taxLineNumberMap: Record<string, number> = {};
  constructor(
    private sdk: AppknitSDK | AppknitGraphSDK,
    private avalaraTransaction: TransactionWithTransactionLines,
    // private avalaraTransaction: Transaction,
    private fusionRequest: {
      taxableHeader: TaxableHeaderWithLines;
    },
    private customerProfile: Record<string, any>,
    private currentLegalEntity: Record<string, any>,
    private isUS2US: boolean,
    private isCA2CA: boolean,
    private isUS2CA: boolean,
    private isIndia: boolean,
    private isInternational: boolean,
  ) {
    this.jurisDataMapper = new JurisDataMapper(
      sdk,
      customerProfile,
      currentLegalEntity,
      fusionRequest.taxableHeader['ns:ApplicationShortname'],
    );
    this.configurationCodesService = new ConfigurationCodesService(customerProfile?.ATX_CONFIG_CODES || []);
    this.taxApportionmentLineNumber = 0;
    this.setStartingApportionmentAndTaxLineNumber();
  }

  public async createResponse(vbtTaxAmtDetails: Record<string, any>) {
    vbtTaxAmtDetails = vbtTaxAmtDetails ? vbtTaxAmtDetails : {};
    switch (this.fusionRequest.taxableHeader['ns:ApplicationShortname']) {
      case 'AR':
      case 'ONT':
        return await this.createO2CResponse();
      case 'AP':
      case 'PO':
        return await this.createP2PResponse(vbtTaxAmtDetails);
    }
  }

  private setStartingApportionmentAndTaxLineNumber() {
    for (const line of this.fusionRequest.taxableHeader.taxableLines) {
      this.taxLineNumberMap[line['ns:TrxLineId']] = 0;
      for (const detailTaxLine of line.detailTaxLines || []) {
        if (detailTaxLine['ns:TaxLineNumber'] > this.taxLineNumberMap[line['ns:TrxLineId']]) {
          this.taxLineNumberMap[line['ns:TrxLineId']] = detailTaxLine['ns:TaxLineNumber'];
        }
        if (Helpers.isVBTDetailtaxLine(detailTaxLine)) {
          this.taxApportionmentLineNumber++;
        }
      }
    }
  }

  async createO2CResponse() {
    const detailTaxLines: Array<DetailTaxLine> = [];
    let i = 1;
    for (const avalaraTransactionLine of this.avalaraTransaction.lines) {
      if (Helpers.isCreditMemoAdditionalLine(avalaraTransactionLine)) {
        continue;
      }
      const matchingFusionTaxableLine: TaxableLinesWithDetailTaxLines = Helpers.findMatchingFusionLineForAvataxResponseLine(
        avalaraTransactionLine,
        this.fusionRequest.taxableHeader.taxableLines,
      );
      for (const avalaraTransactionLineDetail of avalaraTransactionLine.details) {

        if(this.isUS2CA && avalaraTransactionLineDetail.country !="CA"){
          this.isUS2CA=false;
          this.isUS2US=true;
        }
        const detailTaxLine = this.buildFusionDetailTaxLine(
          matchingFusionTaxableLine,
          avalaraTransactionLine,
          avalaraTransactionLineDetail,
          undefined,
          'N',
        );
        if (this.isUS2US) {
          await this.jurisDataMapper.addJurisDataForUS2US(
            detailTaxLine,
            matchingFusionTaxableLine,
            avalaraTransactionLine,
            avalaraTransactionLineDetail,
          );
        }
        const processUS2CATaxesSameAsCA2CA = await getConfigurationCodeValue.js({
          calculableFramework: null,
          calculableContext: null,
          runningContext: null,
          functionArguments: ['PROCESS_US_TO_CA_TAXES', this.customerProfile.ATX_CONFIG_CODES],
        });

        if (this.isCA2CA || (this.isUS2CA && processUS2CATaxesSameAsCA2CA == 'Y')) {
          await this.jurisDataMapper.addJurisDataForCA2CA(
            detailTaxLine,
            matchingFusionTaxableLine,
            avalaraTransactionLine,
            avalaraTransactionLineDetail,
          );
        }
        if (this.isInternational) {
          await this.jurisDataMapper.addJurisDataForIntl(
            detailTaxLine,
            matchingFusionTaxableLine,
            avalaraTransactionLine,
            avalaraTransactionLineDetail,
          );

          detailTaxLine['ns:Char1'] = avalaraTransactionLine.vatCode;

          if (this.avalaraTransaction.invoiceMessages) {
            for (const avalaraTransactionInvoiceMessage of this.avalaraTransaction.invoiceMessages) {
              for (const avalaraTransactionInvoiceMessageLineNumber of avalaraTransactionInvoiceMessage.lineNumbers) {
                if (avalaraTransactionLine.lineNumber == avalaraTransactionInvoiceMessageLineNumber) {
                  if (!detailTaxLine['ns:LegalJustificationText1'] || detailTaxLine['ns:LegalJustificationText1'].length < 1 || detailTaxLine['ns:LegalJustificationText1'] == '') {
                    detailTaxLine['ns:LegalJustificationText1'] = avalaraTransactionInvoiceMessage.content;
                  }
                  else if (!detailTaxLine['ns:LegalJustificationText2'] || detailTaxLine['ns:LegalJustificationText2'].length < 1 || detailTaxLine['ns:LegalJustificationText2'] == '') {
                    detailTaxLine['ns:LegalJustificationText2'] = avalaraTransactionInvoiceMessage.content;
                  } else {
                    break;
                  }
                }
              }
            }
          }
        }

        const customerImplementsCustomDutyTax = await getConfigurationCodeValue.js({
          calculableFramework: null,
          calculableContext: null,
          runningContext: null,
          functionArguments: ['CUSTOM_DUTY_TAX', this.customerProfile.ATX_CONFIG_CODES],
        });

        if (this.isUS2CA && processUS2CATaxesSameAsCA2CA != 'Y' && customerImplementsCustomDutyTax == 'Y') {
          if (avalaraTransactionLineDetail.jurisType !== jurisTypeEnum.CNT) {
            continue;
          }
          await this.jurisDataMapper.addJurisDataForUS2CA(
            detailTaxLine,
            matchingFusionTaxableLine,
            avalaraTransactionLine,
            avalaraTransactionLineDetail,
          );
        }
        this.addToDetailTaxLinesCollection(detailTaxLines, detailTaxLine);
      }
    }
    return detailTaxLines;
  }

  async createP2PResponse(vbtTaxAmtDetails: Record<string, any>) {
    const detailTaxLines = [];
    let VendorLineHandledFlag = false;
    let isReverseCharge = ((this.fusionRequest.taxableHeader['ns:ApplicationShortname'] == 'AP' && this.avalaraTransaction.type == TransactionTypeEnums.ReverseChargeInvoice) || (this.fusionRequest.taxableHeader['ns:ApplicationShortname'] == 'PO' && this.avalaraTransaction.type == TransactionTypeEnums.ReverseChargeOrder));

    if (
      this.isUS2US &&
      this.avalaraTransaction.totalTax == 0 &&
      this.configurationCodesService.getCodeValue('CORRECT_VBT_FOR_OC') == 'Y'
    ) {
      VendorLineHandledFlag = true;
      for (const line of this.fusionRequest.taxableHeader.taxableLines) {
        line.detailTaxLines
          ?.filter((detailTaxLine: DetailTaxLine) => Helpers.isVBTDetailtaxLine(detailTaxLine))
          .forEach((vbtDetailTaxLine: DetailTaxLine) => {
            vbtDetailTaxLine['ns:TaxAmt'] = 0;
            vbtDetailTaxLine['ns:UnroundedTaxAmt'] = 0;
            vbtDetailTaxLine['ns:TaxAmtTaxCurr'] = 0;
            vbtDetailTaxLine['ns:TaxRate'] = 0;
            if (line['ns:LinesDetFactorId']) {
              vbtDetailTaxLine['ns:LinesDetFactorId'] = line['ns:LinesDetFactorId'];
            }
            this.addToDetailTaxLinesCollection(detailTaxLines, vbtDetailTaxLine);
          });
      }
    }

    let i = 1;
    for (const avalaraTransactionLine of this.avalaraTransaction.lines) {
      if (Helpers.isCreditMemoAdditionalLine(avalaraTransactionLine)) {
        continue;
      }
      const matchingFusionTaxableLine = Helpers.findMatchingFusionLineForAvataxResponseLine(
        avalaraTransactionLine,
        this.fusionRequest.taxableHeader.taxableLines,
      );
      const vbtTaxAmtDetail: Record<string, any> = vbtTaxAmtDetails[avalaraTransactionLine.lineNumber];
      if (!VendorLineHandledFlag) {
        for (const detailTaxLine of matchingFusionTaxableLine.detailTaxLines
          ? matchingFusionTaxableLine.detailTaxLines
          : []) {
          if (Helpers.isVBTDetailtaxLine(detailTaxLine)) {
            if (!this.isCA2CA) {
              detailTaxLine['ns:TaxAmt'] = vbtTaxAmtDetail['taxAmt'];
              detailTaxLine['ns:UnroundedTaxAmt'] = vbtTaxAmtDetail['unroundedTaxAmt'];
              detailTaxLine['ns:TaxAmtTaxCurr'] = vbtTaxAmtDetail['taxAmtTaxCurr'];
              detailTaxLine['ns:TaxRate'] = vbtTaxAmtDetail['taxRate'];
              if (matchingFusionTaxableLine['ns:LinesDetFactorId']) {
                detailTaxLine['ns:LinesDetFactorId'] = matchingFusionTaxableLine['ns:LinesDetFactorId'];
              }
            }
            for (const avalaraTransactionLineDetail of avalaraTransactionLine.details) {
              if (this.isInternational) {
                await this.jurisDataMapper.addJurisDataForIntl(
                  detailTaxLine,
                  matchingFusionTaxableLine,
                  avalaraTransactionLine,
                  avalaraTransactionLineDetail,
                );
              }
            }
            this.addToDetailTaxLinesCollection(detailTaxLines, detailTaxLine);
          }
        }
      }

      if (vbtTaxAmtDetail?.ReturnVbtLineOnly) {
        continue; // was BREAK before ASK KRISHNA
      }

      if (await this.returnNoTaxCalculationForAvaTaxLine(avalaraTransactionLine)) {
        this.addToDetailTaxLinesCollection(
          detailTaxLines,
          this.getNoCalculationDetailTaxLine(matchingFusionTaxableLine),
        );
        continue;
      }
      if (!(isReverseCharge && (this.fusionRequest.taxableHeader['ns:ApplicationShortname'] == 'AP' || this.fusionRequest.taxableHeader['ns:ApplicationShortname'] == 'PO'))) {
        this.addToDetailTaxLinesCollection(
          detailTaxLines,
          this.getNoCalculationDetailTaxLine(matchingFusionTaxableLine),
        );
        continue;
      }

      for (const avalaraTransactionLineDetail of avalaraTransactionLine.details) {

        if(this.isUS2CA && avalaraTransactionLineDetail.country !="CA"){
          this.isUS2CA=false;
          this.isUS2US=true;
        }
        
        const detailTaxLine = this.buildFusionDetailTaxLine(
          matchingFusionTaxableLine,
          avalaraTransactionLine,
          avalaraTransactionLineDetail,
          vbtTaxAmtDetail,
          this.fusionRequest.taxableHeader['ns:ApplicationShortname'] == 'PO' ? 'N' : 'Y',
        );
        if (this.isUS2US) {
          await this.jurisDataMapper.addJurisDataForUS2US(
            detailTaxLine,
            matchingFusionTaxableLine,
            avalaraTransactionLine,
            avalaraTransactionLineDetail,
          );
        }
        if (this.isCA2CA) {
          await this.jurisDataMapper.addJurisDataForCA2CA(
            detailTaxLine,
            matchingFusionTaxableLine,
            avalaraTransactionLine,
            avalaraTransactionLineDetail,
          );
        }

        if (this.isInternational) {
          if (isReverseCharge && this.fusionRequest.taxableHeader['ns:ApplicationShortname'] == 'AP' && avalaraTransactionLineDetail.taxType == taxTypeEnum.Input) {
            detailTaxLine['ns:TaxAmt'] = avalaraTransactionLineDetail.taxCalculated * -1;
            detailTaxLine['ns:UnroundedTaxAmt'] = avalaraTransactionLineDetail.taxCalculated * -1;
            detailTaxLine['ns:TaxAmtTaxCurr'] = avalaraTransactionLineDetail.taxCalculated * -1;
          }

          await this.jurisDataMapper.addJurisDataForIntl(
            detailTaxLine,
            matchingFusionTaxableLine,
            avalaraTransactionLine,
            avalaraTransactionLineDetail,
          );

          if (avalaraTransactionLineDetail.jurisType == jurisTypeEnum.CNT) {
            if (isReverseCharge && this.fusionRequest.taxableHeader['ns:ApplicationShortname'] == 'AP') {
              if (avalaraTransactionLineDetail.taxType == taxTypeEnum.Output) {
                detailTaxLine['ns:Tax'] = detailTaxLine['ns:Tax'].replace("INPUT", "OUTPUT");
                detailTaxLine['ns:TaxRateCode'] = detailTaxLine['ns:TaxRateCode'].replace("INPUT", "OUTPUT");
                detailTaxLine['ns:TaxRegimeCode'] = detailTaxLine['ns:TaxRegimeCode'].replace("INPUT", "OUTPUT");
                detailTaxLine['ns:ProviderRecRate'] = 0;
                detailTaxLine['ns:ProviderRecRateCode'] = '';
              }
              detailTaxLine['ns:SelfAssessedFlag'] = 'N';
            }
          }
          detailTaxLine['ns:Char1'] = avalaraTransactionLine.vatCode;

          if (this.avalaraTransaction.invoiceMessages) {
            for (const avalaraTransactionInvoiceMessage of this.avalaraTransaction.invoiceMessages) {
              for (const avalaraTransactionInvoiceMessageLineNumber of avalaraTransactionInvoiceMessage.lineNumbers) {
                if (avalaraTransactionLine.lineNumber == avalaraTransactionInvoiceMessageLineNumber) {
                  if (!detailTaxLine['ns:LegalJustificationText1'] || detailTaxLine['ns:LegalJustificationText1'].length < 1 || detailTaxLine['ns:LegalJustificationText1'] == '') {
                    detailTaxLine['ns:LegalJustificationText1'] = avalaraTransactionInvoiceMessage.content;
                  } else if (!detailTaxLine['ns:LegalJustificationText2'] || detailTaxLine['ns:LegalJustificationText2'].length < 1 || detailTaxLine['ns:LegalJustificationText2'] == '') {
                    detailTaxLine['ns:LegalJustificationText2'] = avalaraTransactionInvoiceMessage.content;
                  } else {
                    break;
                  }
                }
              }
            }
          }
        }
        this.addToDetailTaxLinesCollection(detailTaxLines, detailTaxLine);
      }
    }
    return detailTaxLines;
  }

  async createNoCalculationResponse() {
    const detailTaxLines = [];
    for (const fusionTaxableLine of this.fusionRequest.taxableHeader.taxableLines) {
      detailTaxLines.push(this.getNoCalculationDetailTaxLine(fusionTaxableLine));
    }
    return detailTaxLines;
  }

  private getNoCalculationDetailTaxLine(fusionTaxableLine: TaxableLinesWithDetailTaxLines): DetailTaxLine {
    let detailTaxLine: DetailTaxLine = {};
    detailTaxLine['ns:ErrorMessageTypeFlag'] = 'X';
    detailTaxLine['ns:ErrorString'] = '';
    detailTaxLine['ns:ApplicationId'] = fusionTaxableLine['ns:ApplicationId'];
    detailTaxLine['ns:EntityCode'] = fusionTaxableLine['ns:EntityCode'];
    detailTaxLine['ns:EventClassCode'] = fusionTaxableLine['ns:EventClassCode'];
    detailTaxLine['ns:TrxId'] = fusionTaxableLine['ns:TrxId'];
    detailTaxLine['ns:TrxLineId'] = fusionTaxableLine['ns:TrxLineId'];
    detailTaxLine['ns:LinesDetFactorId'] = fusionTaxableLine['ns:LinesDetFactorId'];
    return detailTaxLine;
  }

  async createErrorResponse(message: string) {
    const detailTaxLines = [];
    for (const fusionTaxableLine of this.fusionRequest.taxableHeader.taxableLines) {
      let detailTaxLine: DetailTaxLine = {};
      detailTaxLine['ns:ErrorMessageTypeFlag'] = 'E';
      detailTaxLine['ns:ErrorString'] = message;
      detailTaxLine['ns:ApplicationId'] = fusionTaxableLine['ns:ApplicationId'];
      detailTaxLine['ns:EntityCode'] = fusionTaxableLine['ns:EntityCode'];
      detailTaxLine['ns:EventClassCode'] = fusionTaxableLine['ns:EventClassCode'];
      detailTaxLine['ns:TrxId'] = fusionTaxableLine['ns:TrxId'];

      detailTaxLine['ns:TaxCurrencyCode'] = fusionTaxableLine['ns:TrxLineCurrencyCode'];
      detailTaxLine['ns:TrxLineId'] = fusionTaxableLine['ns:TrxLineId'];
      detailTaxLine['ns:LinesDetFactorId'] = fusionTaxableLine['ns:LinesDetFactorId'];
      detailTaxLine['ns:TrxLineNumber'] = fusionTaxableLine['ns:TrxLineNumber'];
      detailTaxLine['ns:TrxLevelType'] = fusionTaxableLine['ns:TrxLevelType'];
      detailTaxLine['ns:InternalOrganizationId'] = this.fusionRequest.taxableHeader['ns:InternalOrganizationId'];
      detailTaxLine['ns:LegalEntityId'] = this.fusionRequest.taxableHeader['ns:LegalEntityId'];

      detailTaxLines.push(detailTaxLine);
    }
    return detailTaxLines;
  }

  private addToDetailTaxLinesCollection(detailTaxLines: Array<DetailTaxLine>, detailTaxLineToInsert: DetailTaxLine) {
    let existingMatchingDetailTaxLine: Record<string, any>;
    if (
      detailTaxLineToInsert['ns:Tax'] &&
      detailTaxLineToInsert['ns:TrxId'] &&
      detailTaxLineToInsert['ns:TrxLineId'] &&
      detailTaxLineToInsert['ns:TrxLineNumber']
    ) {
      existingMatchingDetailTaxLine = detailTaxLines.find(detailTaxLine => {
        if (
          detailTaxLineToInsert['ns:Tax'] == detailTaxLine['ns:Tax'] &&
          detailTaxLineToInsert['ns:TrxId'] == detailTaxLine['ns:TrxId'] &&
          detailTaxLineToInsert['ns:TrxLineId'] == detailTaxLine['ns:TrxLineId'] &&
          detailTaxLineToInsert['ns:TrxLineNumber'] == detailTaxLine['ns:TrxLineNumber'] &&
          detailTaxLine['ns:ManuallyEnteredFlag'] != 'Y'
        ) {
          return true;
        }
        return false;
      });
    }
    if (existingMatchingDetailTaxLine) {
      existingMatchingDetailTaxLine['ns:TaxAmt'] = _.toString(
        _.toNumber(existingMatchingDetailTaxLine['ns:TaxAmt']) + _.toNumber(detailTaxLineToInsert['ns:TaxAmt']),
      );
      existingMatchingDetailTaxLine['ns:TaxAmtTaxCurr'] = _.toString(
        _.toNumber(existingMatchingDetailTaxLine['ns:TaxAmtTaxCurr']) +
        _.toNumber(detailTaxLineToInsert['ns:TaxAmtTaxCurr']),
      );
      existingMatchingDetailTaxLine['ns:UnroundedTaxAmt'] = _.toString(
        _.toNumber(existingMatchingDetailTaxLine['ns:UnroundedTaxAmt']) +
        _.toNumber(detailTaxLineToInsert['ns:UnroundedTaxAmt']),
      );
      existingMatchingDetailTaxLine['ns:TaxRate'] = _.toString(
        _.toNumber(existingMatchingDetailTaxLine['ns:TaxRate']) + _.toNumber(detailTaxLineToInsert['ns:TaxRate']),
      );
    } else {
      detailTaxLineToInsert['ns:TaxApportionmentLineNumber'] = detailTaxLineToInsert['ns:TaxApportionmentLineNumber']
        ? detailTaxLineToInsert['ns:TaxApportionmentLineNumber']
        : ++this.taxApportionmentLineNumber;
      detailTaxLineToInsert['ns:TaxLineNumber'] = detailTaxLineToInsert['ns:TaxLineNumber']
        ? detailTaxLineToInsert['ns:TaxLineNumber']
        : ++this.taxLineNumberMap[detailTaxLineToInsert['ns:TrxLineId']];
      detailTaxLines.push(detailTaxLineToInsert);
    }
  }

  private buildFusionDetailTaxLine(
    fusionTaxableLine: TaxableLinesWithDetailTaxLines,
    avalaraTransactionLine: TransactionLinesWithTransactionLineDetails,
    avalaraTransactionLineDetail: TransactionLineDetail,
    vbtTaxAmtDetail: Record<string, any>,
    SelfAssessedFlag: string,
  ): DetailTaxLine {
    let detailTaxLine: DetailTaxLine = {};
    detailTaxLine['ns:ErrorMessageTypeFlag'] = 'S';
    detailTaxLine['ns:ApplicationId'] = fusionTaxableLine['ns:ApplicationId'];
    detailTaxLine['ns:EntityCode'] = fusionTaxableLine['ns:EntityCode'];
    detailTaxLine['ns:EventClassCode'] = fusionTaxableLine['ns:EventClassCode'];
    detailTaxLine['ns:LineAmt'] = fusionTaxableLine['ns:LineAmt'];
    detailTaxLine['ns:TrxId'] = fusionTaxableLine['ns:TrxId'];

    detailTaxLine['ns:TrxLineCurrencyCode'] = fusionTaxableLine['ns:TrxLineCurrencyCode'];
    detailTaxLine['ns:TaxCurrencyCode'] = fusionTaxableLine['ns:TrxLineCurrencyCode'];
    detailTaxLine['ns:TrxLineId'] = fusionTaxableLine['ns:TrxLineId'];
    detailTaxLine['ns:TrxLineNumber'] = fusionTaxableLine['ns:TrxLineNumber'];
    detailTaxLine['ns:TrxLevelType'] = fusionTaxableLine['ns:TrxLevelType'];
    detailTaxLine['ns:InternalOrganizationId'] = this.fusionRequest.taxableHeader['ns:InternalOrganizationId'];
    detailTaxLine['ns:LegalEntityId'] = this.fusionRequest.taxableHeader['ns:LegalEntityId'];

    detailTaxLine['ns:SelfAssessedFlag'] = SelfAssessedFlag;

    detailTaxLine['ns:TrxDate'] = avalaraTransactionLine.taxDate;
    detailTaxLine['ns:TaxDate'] = avalaraTransactionLine.taxDate;
    detailTaxLine['ns:TaxDetermineDate'] = avalaraTransactionLine.taxDate;

    detailTaxLine['ns:TaxRate'] = _.toNumber(avalaraTransactionLineDetail.rate) * 100;

    detailTaxLine['ns:TaxAmt'] = avalaraTransactionLineDetail.taxCalculated;
    detailTaxLine['ns:TaxAmtTaxCurr'] = avalaraTransactionLineDetail.taxCalculated;
    detailTaxLine['ns:UnroundedTaxAmt'] = avalaraTransactionLineDetail.taxCalculated;

    detailTaxLine['ns:UnroundedTaxableAmt'] = avalaraTransactionLineDetail.taxableAmount;
    detailTaxLine['ns:TaxableAmt'] = avalaraTransactionLineDetail.taxableAmount;
    detailTaxLine['ns:TaxableAmtCurr'] = avalaraTransactionLineDetail.taxableAmount;

    detailTaxLine['ns:ManuallyEnteredFlag'] = 'N';
    detailTaxLine['ns:PlaceOfSupplyTypeCode'] = 'SHIP_TO';
    detailTaxLine['ns:ReportingOnlyFlag'] = 'N';

    detailTaxLine['ns:TaxRegimeCode'] = this.currentLegalEntity.ATX_TAX_REGIME_CODE;

    if (avalaraTransactionLine.ref2) {
      detailTaxLine['ns:LegalJustificationText3'] = avalaraTransactionLine.ref2;
    }
    if (fusionTaxableLine['ns:LinesDetFactorId']) {
      detailTaxLine['ns:LinesDetFactorId'] = fusionTaxableLine['ns:LinesDetFactorId'];
    }

    if (
      vbtTaxAmtDetail &&
      _.toNumber(avalaraTransactionLineDetail.taxCalculated) > _.toNumber(avalaraTransactionLineDetail.tax)
    ) {
      detailTaxLine['ns:TaxAmt'] =
        _.toNumber(avalaraTransactionLineDetail.taxCalculated) - _.toNumber(avalaraTransactionLineDetail.tax);
      detailTaxLine['ns:TaxAmtTaxCurr'] =
        _.toNumber(avalaraTransactionLineDetail.taxCalculated) - _.toNumber(avalaraTransactionLineDetail.tax);
      detailTaxLine['ns:UnroundedTaxAmt'] =
        _.toNumber(avalaraTransactionLineDetail.taxCalculated) - _.toNumber(avalaraTransactionLineDetail.tax);
    }
    return detailTaxLine;
  }

  private async returnNoTaxCalculationForAvaTaxLine(
    avalaraTransactionLine: TransactionLinesWithTransactionLineDetails,
  ): Promise<boolean> {
    if (
      this.configurationCodesService.getCodeValue('AP_SELF_ASSESS_TAX') == 'Y' &&
      this.configurationCodesService.getCodeValue('BLOCK_AP_SELF_ASSESS_RESP') == 'Y'
    ) {
      return true;
    }
    if (
      this.configurationCodesService.getCodeValue('CHECK_FOR_REGIME_SUBSCRIPTION') == 'Y' &&
      !(await this.hasRegimeSubscription())
    ) {
      return true;
    }
    return false;
  }

  private async hasRegimeSubscription(): Promise<boolean> {
    return true;
  }
}
