import { AppknitSDK, AppknitGraphSDK} from '@appknit-project/appknit-platform-sdk-v2';
import * as _ from 'lodash';
import { Helpers } from '../../src/utils/helpers';
import { getConfigurationCodeValue } from '../../src/expression-functions';
import { ConfigurationCodesService } from './configuration.service';
import { JurisDataMapper } from './juris-mapper.service';
import { TaxableHeaderWithLines } from '../../src/models/oracle/TaxableHeaders';
import { DetailTaxLine } from '../../src/models/oracle/DetailTaxLines';
import { TaxableLinesWithDetailTaxLines } from '../../src/models/oracle/TaxableLines';
import { AFCCalculateTaxesResponse, AFCLineItemResult, AFCTaxesGenerated } from 'src/models/afc/AFCCalculateTaxesResponse';

export class AFCResponseBuilderService {
    private jurisDataMapper: JurisDataMapper;
    private configurationCodesService: ConfigurationCodesService;
    private taxApportionmentLineNumber: number;
    private taxLineNumberMap: Record<string, number> = {};
    constructor(
        private sdk: AppknitSDK | AppknitGraphSDK,
        private avalaraTransaction: AFCCalculateTaxesResponse,
        private fusionRequest: {
            taxableHeader: TaxableHeaderWithLines;
        },
        private customerProfile: Record<string, any>,
        private currentLegalEntity: Record<string, any>,
    ) {
        this.jurisDataMapper = new JurisDataMapper(
            sdk,
            customerProfile,
            currentLegalEntity,
            fusionRequest.taxableHeader['ns:ApplicationShortname']
        );
        this.configurationCodesService = new ConfigurationCodesService(customerProfile?.ATX_CONFIG_CODES || []);
        this.taxApportionmentLineNumber = 0;
        this.setStartingApportionmentAndTaxLineNumber();
    }

    private setStartingApportionmentAndTaxLineNumber() {
        for (const line of this.fusionRequest.taxableHeader.taxableLines) {
          this.taxLineNumberMap[line['ns:TrxLineId']] = 0;
          for (const detailTaxLine of line.detailTaxLines || []) {
            if (detailTaxLine['ns:TaxLineNumber'] > this.taxLineNumberMap[line['ns:TrxLineId']]) {
              this.taxLineNumberMap[line['ns:TrxLineId']] = detailTaxLine['ns:TaxLineNumber'];
            }
            this.taxApportionmentLineNumber++;
          }
        }
      }
    
    async createAFCResponse(

    ) {
        const detailTaxLines:Array<DetailTaxLine> = [];
        let i = 1; 
        for (const avalaraTransactionLine of this.avalaraTransaction.inv[0].itms) {
            const matchingFusionTaxableLine: TaxableLinesWithDetailTaxLines = Helpers.findMatchingFusionLineForAFCResponseLine(avalaraTransactionLine, this.fusionRequest.taxableHeader.taxableLines);
            for (const avalaraTransactionLineDetail of avalaraTransactionLine.txs) {
                const detailTaxLine = this.buildAFCFusionDetailTaxLine(
                    matchingFusionTaxableLine,
                    avalaraTransactionLine,
                    avalaraTransactionLineDetail,
                );
                this.addToAFCDetailTaxLinesCollection(detailTaxLines,detailTaxLine)
            }
        }
        return detailTaxLines; 
    }


    private addToAFCDetailTaxLinesCollection(detailTaxLines: Array<DetailTaxLine>, detailTaxLineToInsert: DetailTaxLine) {
        let existingMatchingDetailTaxLine: Record<string, any>;
        if (detailTaxLineToInsert['ns:Tax'] && detailTaxLineToInsert['ns:TrxId'] && detailTaxLineToInsert['ns:TrxLineId'] && detailTaxLineToInsert['ns:TrxLineNumber']) {
            existingMatchingDetailTaxLine = detailTaxLines.find(detailTaxLine => {
                if (
                    detailTaxLineToInsert['ns:Tax'] == detailTaxLine['ns:Tax']
                    && detailTaxLineToInsert['ns:TrxId'] == detailTaxLine['ns:TrxId']
                    && detailTaxLineToInsert['ns:TrxLineId'] == detailTaxLine['ns:TrxLineId']
                    && detailTaxLineToInsert['ns:TrxLineNumber'] == detailTaxLine['ns:TrxLineNumber']
                    && detailTaxLine['ns:ManuallyEnteredFlag'] != 'Y'
                ) {
                    return true
                }
                return false;
            });
        }
        if (existingMatchingDetailTaxLine) {
            existingMatchingDetailTaxLine['ns:TaxAmt'] = _.toString(_.toNumber(existingMatchingDetailTaxLine['ns:TaxAmt']) + _.toNumber(detailTaxLineToInsert['ns:TaxAmt']));
            existingMatchingDetailTaxLine['ns:TaxAmtTaxCurr'] = _.toString(_.toNumber(existingMatchingDetailTaxLine['ns:TaxAmtTaxCurr']) + _.toNumber(detailTaxLineToInsert['ns:TaxAmtTaxCurr']));
            existingMatchingDetailTaxLine['ns:UnroundedTaxAmt'] = _.toString(_.toNumber(existingMatchingDetailTaxLine['ns:UnroundedTaxAmt']) + _.toNumber(detailTaxLineToInsert['ns:UnroundedTaxAmt']));
            existingMatchingDetailTaxLine['ns:TaxRate'] = _.toString(_.toNumber(existingMatchingDetailTaxLine['ns:TaxRate']) + _.toNumber(detailTaxLineToInsert['ns:TaxRate']));
        } else {
            detailTaxLineToInsert['ns:TaxApportionmentLineNumber'] = detailTaxLineToInsert['ns:TaxApportionmentLineNumber'] ? detailTaxLineToInsert['ns:TaxApportionmentLineNumber'] : ++this.taxApportionmentLineNumber;
            detailTaxLineToInsert['ns:TaxLineNumber'] = detailTaxLineToInsert['ns:TaxLineNumber'] ? detailTaxLineToInsert['ns:TaxLineNumber'] : ++this.taxLineNumberMap[detailTaxLineToInsert['ns:TrxLineId']];
            detailTaxLines.push(detailTaxLineToInsert)
        }
    }

    private buildAFCFusionDetailTaxLine(
        fusionTaxableLine: TaxableLinesWithDetailTaxLines,
        avalaraTransactionLine: AFCLineItemResult,
        avalaraTransactionLineDetail: AFCTaxesGenerated,
    ): DetailTaxLine {
        let detailTaxLine: DetailTaxLine = {}; 
        detailTaxLine['ns:ApplicationId'] = fusionTaxableLine['ns:ApplicationId']
        detailTaxLine['ns:EntityCode'] = fusionTaxableLine['ns:EntityCode'];
        detailTaxLine['ns:ErrorMessageTypeFlag'] = 'S';
        detailTaxLine['ns:EventClassCode'] = fusionTaxableLine['ns:EventClassCode'];
        detailTaxLine['ns:InternalOrganizationId'] = this.fusionRequest.taxableHeader['ns:InternalOrganizationId'];
        detailTaxLine['ns:LegalEntityId'] = this.fusionRequest.taxableHeader['ns:LegalEntityId'];
        detailTaxLine['ns:LineAmt'] = fusionTaxableLine['ns:LineAmt'];
        detailTaxLine['ns:ManuallyEnteredFlag'] = 'N';
        detailTaxLine['ns:PlaceOfSupplyTypeCode'] = 'SHIP_TO';
        detailTaxLine['ns:ReportingOnlyFlag'] = 'N';
        detailTaxLine['ns:SelfAssessedFlag'] = 'N';
        detailTaxLine['ns:Tax'] = avalaraTransactionLineDetail.cat; 
        detailTaxLine['ns:TaxAmt'] = avalaraTransactionLineDetail.tax;
        detailTaxLine['ns:CalTaxAmtTaxCurr'] = avalaraTransactionLineDetail.tax;
        detailTaxLine['ns:TrxLineCurrencyCode'] = fusionTaxableLine['ns:TrxLineCurrencyCode'];
        detailTaxLine['ns:TaxDate'] = fusionTaxableLine['ns:TaxDate'] ? fusionTaxableLine['ns:TaxDate'] : this.fusionRequest.taxableHeader['ns:TrxDate'];
        detailTaxLine['ns:TaxDetermineDate'] = fusionTaxableLine['ns:TrxLineGlDate'] ? fusionTaxableLine['ns:TrxLineGlDate'] : this.fusionRequest.taxableHeader['ns:TrxDate'];
        detailTaxLine['ns:TaxJurisdictionCode'] = 'USTJ-ST-0300000' //hardcoded for now, pick up from JSON
        detailTaxLine['ns:TrxLineNumber'] = fusionTaxableLine['ns:TrxLineNumber'];
        detailTaxLine['ns:TaxRate'] = _.toNumber(avalaraTransactionLineDetail.rate) * 100;
        detailTaxLine['ns:TaxRateCode'] = 'dynamic'; //hardcoded for now 
        detailTaxLine['ns:TaxRegimeCode'] = '' //fill in from avalara profile details
        detailTaxLine['ns:TaxStatusCode'] = ''//from json row
        detailTaxLine['ns:CalTaxableAmt'] = fusionTaxableLine['ns:LineAmt'];
        detailTaxLine['ns:TaxableAmtTaxCurr'] = fusionTaxableLine['ns:LineAmt'];
        detailTaxLine['ns:TrxCurrencyCode'] = this.fusionRequest.taxableHeader['ns:TrxCurrencyCode'];
        detailTaxLine['ns:TrxDate'] = this.fusionRequest.taxableHeader['ns:TrxDate'];
        detailTaxLine['ns:TrxId'] = fusionTaxableLine['ns:TrxId'];
        detailTaxLine['ns:TrxLevelType'] = fusionTaxableLine['ns:TrxLevelType'];
        detailTaxLine['ns:TrxLineId'] = fusionTaxableLine['ns:TrxLineId'];
        detailTaxLine['ns:TrxLineNumber'] = fusionTaxableLine['ns:TrxLineNumber'];
        detailTaxLine['ns:UnroundedTaxAmt'] = avalaraTransactionLineDetail.tax;
        detailTaxLine['ns:UnroundedTaxableAmt'] = avalaraTransactionLineDetail.tm; //check this is same as taxable amount??
        return detailTaxLine
    }


  async createAFCErrorResponse(message: string) {
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
      detailTaxLine['ns:TrxLineNumber'] = fusionTaxableLine['ns:TrxLineNumber'];
      detailTaxLine['ns:TrxLevelType'] = fusionTaxableLine['ns:TrxLevelType'];
      detailTaxLine['ns:InternalOrganizationId'] = this.fusionRequest.taxableHeader['ns:InternalOrganizationId'];
      detailTaxLine['ns:LegalEntityId'] = this.fusionRequest.taxableHeader['ns:LegalEntityId'];

      detailTaxLines.push(detailTaxLine);
    }
    return detailTaxLines;
  }

}

