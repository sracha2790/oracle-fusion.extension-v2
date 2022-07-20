import { AppknitSDK } from '@appknit-project/appknit-platform-sdk-v2';
import { AppknitGraphSDK } from '@appknit-project/common-frameworks';
import * as _ from 'lodash';
import { getConfigurationCodeValue } from 'src/expression-functions';
import { ConfigurationCodesService } from './configuration.service';
import { JurisDataMapper } from './juris-mapper.service';
export class ResponseBuilderService {
    private jurisDataMapper: JurisDataMapper;
    private configurationCodesService: ConfigurationCodesService;
    private taxApportionmentLineNumber: number;
    constructor() {
        this.jurisDataMapper = null;
        const configurationCodesService = new ConfigurationCodesService();
        this.taxApportionmentLineNumber = 0;
    }

    public async createResponse(
        sdk: AppknitSDK | AppknitGraphSDK,
        avaTaxModel: Record<string, any>,
        fusionRequest: Record<string, any>,
        customerProfile: Record<string, any>,
        currentBusinessUnit: Record<string, any>,
        vbtTaxAmtDetails: Record<string, any>,
        isUS2US: boolean,
        isCA2CA: boolean,
        isUS2CA: boolean,
        isIndia: boolean,
        isIntl: boolean,
    ) {
        switch(fusionRequest.header['ns:ApplicationShortName']) {
            case 'AR':
            case 'ONT':
                return await this.createARONTResponse(
                    sdk,
                    avaTaxModel,
                    fusionRequest,
                    customerProfile,
                    currentBusinessUnit,
                    isUS2US, isCA2CA, isUS2CA, isIndia, isIntl,
                )
                break;
            case 'AP':
            case 'PO':
                return await this.createAPPOResponse(
                    sdk,
                    avaTaxModel,
                    fusionRequest,
                    customerProfile,
                    currentBusinessUnit,
                    vbtTaxAmtDetails,
                    isUS2US, isCA2CA, isUS2CA, isIndia, isIntl,
                )
                break;
        }
    }

    async createARONTResponse(
        sdk: AppknitSDK | AppknitGraphSDK,
        avaTaxModel: Record<string, any>,
        fusionRequest: Record<string, any>,
        customerProfile: Record<string, any>,
        currentBusinessUnit: Record<string, any>,
        isUS2US: boolean,
        isCA2CA: boolean,
        isUS2CA: boolean,
        isIndia: boolean,
        isIntl: boolean,
    ) {
        this.jurisDataMapper = new JurisDataMapper(
            sdk,
            customerProfile,
            currentBusinessUnit,
            isUS2US,
            isCA2CA,
            isUS2CA,
            isIndia,
            isIntl,
        );

        const detailTaxLines = [];
        let i = 1;
        for (const avaTaxLine of avaTaxModel.lines) {
            if ((avaTaxLine.lineNumber as string).endsWith('.1NT')) {
                continue;
            }
            const matchingFusionLine = fusionRequest.lines.find(fusionLine => fusionLine['ns:TrxLineId'] == avaTaxLine.originationDocumentId);
            for (const avaTaxLineDetail of avaTaxLine.details) {
                const detailTaxLine: Record<string, any> = {};
                detailTaxLine['ns:ErrorMessageTypeFlag'] = 'S';
                detailTaxLine['ns:ApplicationId'] = matchingFusionLine['ns:ApplicationId'];
                detailTaxLine['ns:EntityCode'] = matchingFusionLine['ns:EntityCode'];
                detailTaxLine['ns:EventClassCode'] = matchingFusionLine['ns:EventClassCode'];
                detailTaxLine['ns:LineAmt'] = matchingFusionLine['ns:LineAmt'];
                detailTaxLine['ns:TrxId'] = matchingFusionLine['ns:TrxId'];

                detailTaxLine.TrxLineCurrencyCode = matchingFusionLine.TrxLineCurrencyCode;
                detailTaxLine['ns:TaxCurrencyCode'] = matchingFusionLine['ns:TrxLineCurrencyCode'];
                detailTaxLine['ns:TrxLineId'] = matchingFusionLine['ns:TrxLineId'];
                detailTaxLine['ns:TrxLineNumber'] = matchingFusionLine['ns:TrxLineNumber'];
                detailTaxLine['ns:TrxLevelType'] = matchingFusionLine['ns:TrxLevelType'];
                detailTaxLine['ns:InternalOrganizationId'] = fusionRequest.header['ns:InternalOrganizationId'];

                detailTaxLine['ns:LegalEntityId'] = fusionRequest.header['ns:LegalEntityId'];

                detailTaxLine['ns:SelfAssessedFlag'] = 'N';

                detailTaxLine['ns:TaxApportionmentLineNumber'] = i++;

                detailTaxLine['ns:TaxRate'] = _.toString(_.toNumber(avaTaxLineDetail.rate) * 100);
                detailTaxLine['ns:TaxAmt'] = avaTaxLineDetail.taxCalculated;
                detailTaxLine['ns:TaxAmtTaxCurr'] = avaTaxLineDetail.taxCalculated;
                detailTaxLine['ns:UnroundedTaxAmt'] = avaTaxLineDetail.taxCalculated;

                detailTaxLine['ns:TrxDate'] = matchingFusionLine['ns:TrxDate'] ? matchingFusionLine['ns:TrxDate'] : fusionRequest.header['ns:TrxDate'];
                detailTaxLine['ns:TaxDate'] = matchingFusionLine['ns:TaxDate'] ? matchingFusionLine['ns:TaxDate'] : fusionRequest.header['ns:TaxDate'];
                detailTaxLine['ns:TaxDetermineDate'] = matchingFusionLine['ns:TaxDate'] ? matchingFusionLine['ns:TaxDate'] : fusionRequest.header['ns:TaxDate'];
                detailTaxLine['ns:UnroundedTaxableAmt'] = avaTaxLineDetail.taxableAmount;
                detailTaxLine['ns:TaxableAmt'] = avaTaxLineDetail.taxableAmount;
                detailTaxLine['ns:TaxableAmtCurr'] = avaTaxLineDetail.taxableAmount;
                detailTaxLine['ns:ManuallyEnteredFlag'] = 'N';
                detailTaxLine['ns:PlaceOfSupplyTypeCode'] = 'SHIP_TO';
                detailTaxLine['ns:ReportingOnlyFlag'] = 'N';
                detailTaxLine['ns:TaxRegimeCode'] = currentBusinessUnit.TAX_REGIME_CODE;

                if (avaTaxLine['ns:ref2']) {
                    detailTaxLine['ns:LegalJustificationText3'] = avaTaxLine.ref2;
                }


                if (isUS2US) {
                    this.jurisDataMapper.mapJurisdictionForUS2US(
                        detailTaxLine,
                        matchingFusionLine,
                        avaTaxLine,
                        avaTaxLineDetail,
                    )

                }

                const processUS2CATaxesSameAsCA2CA = await getConfigurationCodeValue.js(
                    {
                        calculableFramework: null,
                        calculableContext: null,
                        runningContext: null,
                        functionArguments: ['PROCESS_US_TO_CA_TAXES', customerProfile.CONFIG_CODES],
                    }
                )

                if (
                    isCA2CA
                    || (
                        isUS2CA
                        && processUS2CATaxesSameAsCA2CA == 'Y'
                    )
                ) {
                    this.jurisDataMapper.mapJurisdictionForCA2CA(
                        detailTaxLine,
                        matchingFusionLine,
                        avaTaxLine,
                        avaTaxLineDetail,
                    )

                }

                const customerImplementsCustomDutyTax = await getConfigurationCodeValue.js(
                    {
                        calculableFramework: null,
                        calculableContext: null,
                        runningContext: null,
                        functionArguments: ['CUSTOM_DUTY_TAX ', customerProfile.CONFIG_CODES],
                    }
                )

                if (
                    isUS2CA
                    && processUS2CATaxesSameAsCA2CA != 'Y'
                    && customerImplementsCustomDutyTax == 'Y'
                ) {
                    if (
                        avaTaxLineDetail.jurisType === 'CNT'
                    ) {
                        continue;
                    } // krishna needs to confirm again
                    this.jurisDataMapper.mapJurisdictionForUS2CA(
                        detailTaxLine,
                        matchingFusionLine,
                        avaTaxLine,
                        avaTaxLineDetail,
                    )
                }
                this.addToDetailTaxLinesCollection(detailTaxLines, detailTaxLine)
                // detailTaxLines.push(detailTaxLine);
            }
        }
        return detailTaxLines;
    };

    async createAPPOResponse(
        sdk: AppknitSDK | AppknitGraphSDK,
        avaTaxModel: Record<string, any>,
        fusionRequest: Record<string, any>,
        customerProfile: Record<string, any>,
        currentBusinessUnit: Record<string, any>,
        vbtTaxAmtDetails: Record<string, any>,
        isUS2US: boolean,
        isCA2CA: boolean,
        isUS2CA: boolean,
        isIndia: boolean,
        isIntl: boolean,
    ) {
        this.configurationCodesService.setConfigCodes(customerProfile.CONFIG_CODES);
        this.jurisDataMapper = new JurisDataMapper(
            sdk,
            customerProfile,
            currentBusinessUnit,
            isUS2US,
            isCA2CA,
            isUS2CA,
            isIndia,
            isIntl,
        );

        const detailTaxLines = [];
        const vbtDetailTaxLines = [];
        for (const line of fusionRequest.lines) {
            for (const detailTaxLine of line.detailTaxLines) {
                if (detailTaxLine['ns:ManuallyEnteredFlag'] == 'Y' && detailTaxLine['ns:CancelFlag'] == 'N' && detailTaxLine['ns:DeleteFlag'] == 'N') {
                    vbtDetailTaxLines.push(detailTaxLine)
                }
            }
        }

        let VendorLineHandledFlag = false;
        if (isUS2US) {
            if (avaTaxModel.totalTax == 0 && this.configurationCodesService.getCodeValue('CORRECT_VBT_FOR_OC') == 'Y') {
                vbtDetailTaxLines.forEach(vbtDetailTaxLine => {
                    vbtDetailTaxLine['ns:TaxAmt'] = 0
                    vbtDetailTaxLine['ns:UnroundedTaxAmt'] = 0
                    vbtDetailTaxLine['ns:TaxAmtTaxCurr'] = 0
                    vbtDetailTaxLine['ns:TaxRate'] = 0
                    VendorLineHandledFlag = true;
                    this.addToDetailTaxLinesCollection(detailTaxLines, vbtDetailTaxLine)
                    // detailTaxLines.push(vbtDetailTaxLine);
                })
            }
        }

        let i = 1;
        for (const avaTaxLine of avaTaxModel.lines) {
            if ((avaTaxLine.lineNumber as string).endsWith('.1NT')) {
                continue;
            }

            const matchingFusionLine = fusionRequest.lines.find(fusionLine => fusionLine['ns:TrxLineId'] == avaTaxLine.originationDocumentId);

            const vbtTaxAmtDetail: Record<string, any> = vbtTaxAmtDetails[avaTaxLine.lineNumber];
            if (!VendorLineHandledFlag) {
                for (const detailTaxLine of matchingFusionLine.detailTaxLines) {
                    if (detailTaxLine['ns:ManuallyEnteredFlag'] == 'Y' && detailTaxLine['ns:CancelFlag'] == 'N' && detailTaxLine['ns:DeleteFlag'] == 'N') {
                        detailTaxLine['ns:TaxAmt'] = vbtTaxAmtDetail['ns:TaxAmt']
                        detailTaxLine['ns:UnroundedTaxAmt'] = vbtTaxAmtDetail['ns:UnroundedTaxAmt']
                        detailTaxLine['ns:TaxAmtTaxCurr'] = vbtTaxAmtDetail['ns:TaxAmtTaxCurr']
                        detailTaxLine['ns:TaxRate'] = vbtTaxAmtDetail['ns:TaxRate']
                        this.addToDetailTaxLinesCollection(detailTaxLines, detailTaxLine)
                        // detailTaxLines.push(detailTaxLine);
                    }
                }
            }

            if (vbtTaxAmtDetail.ReturnVbtLineOnly) {
                break;
            }

            if (
                this.configurationCodesService.getCodeValue('AP_SELF_ASSESS_TAX') == 'Y'
                && this.configurationCodesService.getCodeValue('BLOCK_AP_SELF_ASSESS_RESP') == 'Y'
            ) {
                this.addToDetailTaxLinesCollection(detailTaxLines, this.getNoCalculationDetailTaxLine(matchingFusionLine))
                // detailTaxLines.push(this.getNoCalculationDetailTaxLine(matchingFusionLine))
                continue;
            }
            for (const avaTaxLineDetail of avaTaxLine.details) {
                const detailTaxLine: Record<string, any> = {};
                detailTaxLine['ns:ErrorMessageTypeFlag'] = 'S';
                detailTaxLine['ns:ApplicationId'] = matchingFusionLine['ns:ApplicationId'];
                detailTaxLine['ns:EntityCode'] = matchingFusionLine['ns:EntityCode'];
                detailTaxLine['ns:EventClassCode'] = matchingFusionLine['ns:EventClassCode'];
                detailTaxLine['ns:LineAmt'] = matchingFusionLine['ns:LineAmt'];
                detailTaxLine['ns:TrxId'] = matchingFusionLine['ns:TrxId'];

                detailTaxLine.TrxLineCurrencyCode = matchingFusionLine.TrxLineCurrencyCode;
                detailTaxLine['ns:TaxCurrencyCode'] = matchingFusionLine['ns:TrxLineCurrencyCode'];
                detailTaxLine['ns:TrxLineId'] = matchingFusionLine['ns:TrxLineId'];
                detailTaxLine['ns:TrxLineNumber'] = matchingFusionLine['ns:TrxLineNumber'];
                detailTaxLine['ns:TrxLevelType'] = matchingFusionLine['ns:TrxLevelType'];
                detailTaxLine['ns:InternalOrganizationId'] = fusionRequest.header['ns:InternalOrganizationId'];

                detailTaxLine['ns:LegalEntityId'] = fusionRequest.header['ns:LegalEntityId'];

                detailTaxLine['ns:SelfAssessedFlag'] = 'Y';
                if (fusionRequest.header['ns:ApplicationShortName'] == 'PO') {
                    detailTaxLine['ns:SelfAssessedFlag'] = 'N';
                }

                detailTaxLine['ns:TaxApportionmentLineNumber'] = i++;

                detailTaxLine['ns:TrxDate'] = matchingFusionLine['ns:TrxDate'] ? matchingFusionLine['ns:TrxDate'] : fusionRequest.header['ns:TrxDate'];
                detailTaxLine['ns:TaxDate'] = matchingFusionLine['ns:TaxDate'] ? matchingFusionLine['ns:TaxDate'] : fusionRequest.header['ns:TaxDate'];
                detailTaxLine['ns:TaxDetermineDate'] = matchingFusionLine['ns:TaxDate'] ? matchingFusionLine['ns:TaxDate'] : fusionRequest.header['ns:TaxDate'];

                detailTaxLine['ns:TaxRate'] = _.toString(_.toNumber(avaTaxLineDetail.rate) * 100);

                detailTaxLine['ns:TaxAmt'] = avaTaxLineDetail.taxCalculated;
                detailTaxLine['ns:TaxAmtTaxCurr'] = avaTaxLineDetail.taxCalculated;
                detailTaxLine['ns:UnroundedTaxAmt'] = avaTaxLineDetail.taxCalculated;

                if (vbtTaxAmtDetail && _.toNumber(avaTaxLineDetail.taxCalculated) > _.toNumber(avaTaxLineDetail.tax)) {
                    detailTaxLine['ns:TaxAmt'] = _.toString(_.toNumber(avaTaxLineDetail.taxCalculated) - _.toNumber(avaTaxLineDetail.tax));
                    detailTaxLine['ns:TaxAmtTaxCurr'] = _.toString(_.toNumber(avaTaxLineDetail.taxCalculated) - _.toNumber(avaTaxLineDetail.tax));
                    detailTaxLine['ns:UnroundedTaxAmt'] = _.toString(_.toNumber(avaTaxLineDetail.taxCalculated) - _.toNumber(avaTaxLineDetail.tax));
                }

                detailTaxLine['ns:UnroundedTaxableAmt'] = avaTaxLineDetail.taxableAmount;

                detailTaxLine['ns:TaxableAmt'] = avaTaxLineDetail.taxableAmount;
                detailTaxLine['ns:TaxableAmtCurr'] = avaTaxLineDetail.taxableAmount;
                detailTaxLine['ns:ManuallyEnteredFlag'] = 'N';
                detailTaxLine['ns:PlaceOfSupplyTypeCode'] = 'SHIP_TO';
                detailTaxLine['ns:ReportingOnlyFlag'] = 'N';
                detailTaxLine['ns:TaxRegimeCode'] = currentBusinessUnit.TAX_REGIME_CODE;

                if (avaTaxLine['ns:ref2']) {
                    detailTaxLine['ns:LegalJustificationText3'] = avaTaxLine.ref2;
                }

                if (isUS2US) {
                    this.jurisDataMapper.mapJurisdictionForUS2US(
                        detailTaxLine,
                        matchingFusionLine,
                        avaTaxLine,
                        avaTaxLineDetail,
                    )
                }

                if (
                    isCA2CA
                ) {
                    this.jurisDataMapper.mapJurisdictionForCA2CA(
                        detailTaxLine,
                        matchingFusionLine,
                        avaTaxLine,
                        avaTaxLineDetail,
                    )
                }

                this.addToDetailTaxLinesCollection(detailTaxLines, detailTaxLine)
                // detailTaxLines.push(detailTaxLine);
            }
        }
        return detailTaxLines
    }

    async createNoCalculationResponse(
        sdk: AppknitSDK | AppknitGraphSDK,
        message: string,
        fusionRequest: Record<string, any>,
        customerProfile: Record<string, any>,
        currentBusinessUnit: Record<string, any>,
    ) {
        const detailTaxLines = [];
        for (const fusionRequestLine of fusionRequest.lines) {
            detailTaxLines.push(this.getNoCalculationDetailTaxLine(fusionRequestLine))
        }
        return detailTaxLines;
    }

    private getNoCalculationDetailTaxLine(fusionRequestLine: Record<string, any>): Record<string, any> {
        const detailTaxLine: Record<string, any> = {};
        detailTaxLine['ns:ErrorMessageTypeFlag'] = 'X';
        detailTaxLine['ns:ErrorString'] = "";
        detailTaxLine['ns:ApplicationId'] = fusionRequestLine['ns:ApplicationId'];
        detailTaxLine['ns:EntityCode'] = fusionRequestLine['ns:EntityCode'];
        detailTaxLine['ns:EventClassCode'] = fusionRequestLine['ns:EventClassCode'];
        detailTaxLine['ns:TrxId'] = fusionRequestLine['ns:TrxId'];
        detailTaxLine['ns:TrxLineId'] = fusionRequestLine['ns:TrxLineId'];
        return detailTaxLine
    }

    async createErrorResponse(
        sdk: AppknitSDK | AppknitGraphSDK,
        message: string,
        fusionRequest: Record<string, any>,
        customerProfile: Record<string, any>,
        currentBusinessUnit: Record<string, any>,
    ) {
        const detailTaxLines = [];
        for (const fusionRequestLine of fusionRequest.lines) {
            const detailTaxLine: Record<string, any> = {};
            detailTaxLine['ns:ErrorMessageTypeFlag'] = 'E';
            detailTaxLine['ns:ErrorString'] = message;
            detailTaxLine['ns:ApplicationId'] = fusionRequestLine['ns:ApplicationId'];
            detailTaxLine['ns:EntityCode'] = fusionRequestLine['ns:EntityCode'];
            detailTaxLine['ns:EventClassCode'] = fusionRequestLine['ns:EventClassCode'];
            detailTaxLine['ns:TrxId'] = fusionRequestLine['ns:TrxId'];

            detailTaxLine['ns:TaxCurrencyCode'] = fusionRequestLine['ns:TrxLineCurrencyCode'];
            detailTaxLine['ns:TrxLineId'] = fusionRequestLine['ns:TrxLineId'];
            detailTaxLine['ns:TrxLineNumber'] = fusionRequestLine['ns:TrxLineNumber'];
            detailTaxLine['ns:TrxLevelType'] = fusionRequestLine['ns:TrxLineNumber'];
            detailTaxLine['ns:InternalOrganizationId'] = fusionRequest.header['ns:InternalOrganizationId'];
            detailTaxLine['ns:LegalEntityId'] = fusionRequest.header['ns:LegalEntityId'];

            detailTaxLines.push(detailTaxLine)
        }
        return detailTaxLines;
    }

    private addToDetailTaxLinesCollection(detailTaxLines: Array<Record<string, any>>, detailTaxLineToInsert: Record<string, any>): Array<Record<string, any>> {
        let existingMatchingDetailTaxLine: Record<string, any>;
        if (detailTaxLineToInsert['ns:Tax'] && detailTaxLineToInsert['ns:TrxId'] && detailTaxLineToInsert['ns:TrxLineId'] && detailTaxLineToInsert['ns:TrxLineNumber']) {
            existingMatchingDetailTaxLine = detailTaxLines.find(detailTaxLine => {
                if (
                    detailTaxLineToInsert['ns:Tax'] == detailTaxLine['ns:Tax']
                    && detailTaxLineToInsert['ns:TrxId'] == detailTaxLine['ns:TrxId']
                    && detailTaxLineToInsert['ns:TrxLineId'] == detailTaxLine['ns:TrxLineId']
                    && detailTaxLineToInsert['ns:TrxLineNumber'] == detailTaxLine['ns:TrxLineNumber']
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
            detailTaxLines.push(detailTaxLineToInsert)
        }
        return detailTaxLines;
    }

}