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
import { JurisDataMapperAFC } from './afc-juris-mapper.service';
import { ConfigurationCodesServiceAFC } from './afc-configuration.service';

export class AFCResponseBuilderService {
    private jurisDataMapper: JurisDataMapperAFC;
    private configurationCodesService: ConfigurationCodesServiceAFC;
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
        this.jurisDataMapper = new JurisDataMapperAFC(
            sdk,
            customerProfile,
            currentLegalEntity,
            fusionRequest.taxableHeader['ns:ApplicationShortname']
        );
        this.configurationCodesService = new ConfigurationCodesServiceAFC(customerProfile?.AFC_CONFIG_CODES || []);
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
                if (avalaraTransactionLineDetail.tid != 0) {
                    await this.jurisDataMapper.addJurisDataforUS2USAFC(
                        detailTaxLine,
                        matchingFusionTaxableLine,
                        avalaraTransactionLine,
                        avalaraTransactionLineDetail,
                    );
                }
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
        // detailTaxLine['ns:ErrorMessageTypeFlag'] = 'S';
        if (avalaraTransactionLineDetail.tid == 0) {
            detailTaxLine['ns:ErrorMessageTypeFlag'] = 'X';
        } else {
            detailTaxLine['ns:ErrorMessageTypeFlag'] = 'S'; 
        }
        detailTaxLine['ns:EventClassCode'] = fusionTaxableLine['ns:EventClassCode'];
        detailTaxLine['ns:InternalOrganizationId'] = this.fusionRequest.taxableHeader['ns:InternalOrganizationId'];
        detailTaxLine['ns:LegalEntityId'] = this.fusionRequest.taxableHeader['ns:LegalEntityId'];
        detailTaxLine['ns:LineAmt'] = fusionTaxableLine['ns:LineAmt'];
        detailTaxLine['ns:ManuallyEnteredFlag'] = 'N';
        detailTaxLine['ns:PlaceOfSupplyTypeCode'] = 'SHIP_TO';
        detailTaxLine['ns:ReportingOnlyFlag'] = 'N';
        detailTaxLine['ns:SelfAssessedFlag'] = 'N';
        detailTaxLine['ns:TaxAmt'] = avalaraTransactionLineDetail.tax;
        detailTaxLine['ns:CalTaxAmtTaxCurr'] = avalaraTransactionLineDetail.tax;
        detailTaxLine['ns:TaxAmtTaxCurr'] = avalaraTransactionLineDetail.tax; 
        detailTaxLine['ns:TrxLineCurrencyCode'] = fusionTaxableLine['ns:TrxLineCurrencyCode'];
        detailTaxLine['ns:TaxDate'] = fusionTaxableLine['ns:TaxDate'] ? fusionTaxableLine['ns:TaxDate'] : this.fusionRequest.taxableHeader['ns:TrxDate'];
        detailTaxLine['ns:TaxDetermineDate'] = fusionTaxableLine['ns:TrxLineGlDate'] ? fusionTaxableLine['ns:TrxLineGlDate'] : this.fusionRequest.taxableHeader['ns:TrxDate'];
        detailTaxLine['ns:TrxLineNumber'] = fusionTaxableLine['ns:TrxLineNumber'];
        detailTaxLine['ns:TaxRate'] = avalaraTransactionLineDetail.rate
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

