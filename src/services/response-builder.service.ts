import { AppknitSDK } from '@appknit-project/appknit-platform-sdk-v2';
import { AppknitGraphSDK } from '@appknit-project/common-frameworks';
import * as _ from 'lodash';
import { Helpers } from '../../src/utils/helpers';
import { getConfigurationCodeValue } from '../../src/expression-functions';
import { ConfigurationCodesService } from './configuration.service';
import { JurisDataMapper } from './juris-mapper.service';
export class ResponseBuilderService {
    private jurisDataMapper: JurisDataMapper;
    private configurationCodesService: ConfigurationCodesService;
    private taxApportionmentLineNumber: number;
    constructor(
        private sdk: AppknitSDK | AppknitGraphSDK,
        private avalaraResponse: Record<string, any>,
        private fusionRequest: Record<string, any>,
        private customerProfile: Record<string, any>,
        private currentLegalEntity: Record<string, any>,
        private isUS2US: boolean,
        private isCA2CA: boolean,
        private isUS2CA: boolean,
        private isIndia: boolean,
        private isIntl: boolean,
    ) {
        this.jurisDataMapper = new JurisDataMapper(
            sdk,
            customerProfile,
            currentLegalEntity,
            isUS2US,
            isCA2CA,
            isUS2CA,
            isIndia,
            isIntl,
        );
        this.configurationCodesService = new ConfigurationCodesService(customerProfile.ATX_CONFIG_CODES);
        this.taxApportionmentLineNumber = 0;
    }

    public async createResponse(
        vbtTaxAmtDetails: Record<string, any>,
    ) {
        vbtTaxAmtDetails = vbtTaxAmtDetails ? vbtTaxAmtDetails : {};
        switch (this.fusionRequest.header['ns:ApplicationShortname']) {
            case 'AR':
            case 'ONT':
                return await this.createO2CResponse()
            case 'AP':
            case 'PO':
                return await this.createP2PResponse(vbtTaxAmtDetails)
        }
    }

    async createO2CResponse(
    ) {
        const detailTaxLines = [];
        let i = 1;
        for (const avaTaxLine of this.avalaraResponse.lines) {
            if (Helpers.isCreditMemoAdditionalLine(avaTaxLine)) {
                continue;
            }
            const matchingFusionLine = Helpers.findMatchingFusionLineForAvataxResponseLine(avaTaxLine, this.fusionRequest.header.lines);
            for (const avaTaxLineDetail of avaTaxLine.details) {

                const detailTaxLine = this.buildFusionDetailTaxLine(
                    matchingFusionLine,
                    avaTaxLine,
                    avaTaxLineDetail,
                    undefined,
                    'N'
                );

                if (this.isUS2US) {
                    await this.jurisDataMapper.addJurisDataForUS2US(
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
                        functionArguments: ['PROCESS_US_TO_CA_TAXES', this.customerProfile.ATX_CONFIG_CODES],
                    }
                )

                if (
                    this.isCA2CA
                    || (
                        this.isUS2CA
                        && processUS2CATaxesSameAsCA2CA == 'Y'
                    )
                ) {
                    await this.jurisDataMapper.addJurisDataForCA2CA(
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
                        functionArguments: ['CUSTOM_DUTY_TAX', this.customerProfile.ATX_CONFIG_CODES],
                    }
                )

                if (
                    this.isUS2CA
                    && processUS2CATaxesSameAsCA2CA != 'Y'
                    && customerImplementsCustomDutyTax == 'Y'
                ) {
                    if (avaTaxLineDetail.jurisType != 'CNT') {
                        continue;
                    }
                    await this.jurisDataMapper.addJurisDataForUS2CA(
                        detailTaxLine,
                        matchingFusionLine,
                        avaTaxLine,
                        avaTaxLineDetail,
                    )
                }
                this.addToDetailTaxLinesCollection(detailTaxLines, detailTaxLine)
            }
        }
        return detailTaxLines;
    };

    async createP2PResponse(
        vbtTaxAmtDetails: Record<string, any>,
    ) {
        const detailTaxLines = [];
        let VendorLineHandledFlag = false;
        if (this.isUS2US && this.avalaraResponse.totalTax == 0 && this.configurationCodesService.getCodeValue('CORRECT_VBT_FOR_OC') == 'Y') {
            VendorLineHandledFlag = true;
            for (const line of this.fusionRequest.header.lines) {
                line.detailTaxLines?.filter((detailTaxLine: Record<string, any>) => Helpers.isVBTDetailtaxLine(detailTaxLine)).forEach((vbtDetailTaxLine: Record<string, any>) => {
                    vbtDetailTaxLine['ns:TaxAmt'] = 0
                    vbtDetailTaxLine['ns:UnroundedTaxAmt'] = 0
                    vbtDetailTaxLine['ns:TaxAmtTaxCurr'] = 0
                    vbtDetailTaxLine['ns:TaxRate'] = 0
                    this.addToDetailTaxLinesCollection(detailTaxLines, vbtDetailTaxLine);
                })
            }
        }

        let i = 1;
        for (const avaTaxLine of this.avalaraResponse.lines) {
            if (Helpers.isCreditMemoAdditionalLine(avaTaxLine)) {
                continue;
            }
            const matchingFusionLine = Helpers.findMatchingFusionLineForAvataxResponseLine(avaTaxLine, this.fusionRequest.header.lines);
            const vbtTaxAmtDetail: Record<string, any> = vbtTaxAmtDetails[avaTaxLine.lineNumber];
            if (!VendorLineHandledFlag) {
                for (const detailTaxLine of matchingFusionLine.detailTaxLines ? matchingFusionLine.detailTaxLines : []) {
                    if (Helpers.isVBTDetailtaxLine(detailTaxLine)) {
                        detailTaxLine['ns:TaxAmt'] = vbtTaxAmtDetail['taxAmt']
                        detailTaxLine['ns:UnroundedTaxAmt'] = vbtTaxAmtDetail['unroundedTaxAmt']
                        detailTaxLine['ns:TaxAmtTaxCurr'] = vbtTaxAmtDetail['taxAmtTaxCurr']
                        detailTaxLine['ns:TaxRate'] = vbtTaxAmtDetail['taxRate']
                        this.addToDetailTaxLinesCollection(detailTaxLines, detailTaxLine)
                    }
                }
            }

            if (vbtTaxAmtDetail?.ReturnVbtLineOnly) {
                continue; // was BREAK before ASK KRISHNA
            }

            if (await this.returnNoTaxCalculationForAvaTaxLine(avaTaxLine)) {
                this.addToDetailTaxLinesCollection(detailTaxLines, this.getNoCalculationDetailTaxLine(matchingFusionLine))
                continue;
            }
            for (const avaTaxLineDetail of avaTaxLine.details) {
                const detailTaxLine = this.buildFusionDetailTaxLine(
                    matchingFusionLine,
                    avaTaxLine,
                    avaTaxLineDetail,
                    vbtTaxAmtDetail,
                    this.fusionRequest.header['ns:ApplicationShortname'] == 'PO' ? 'N' : 'Y',
                );
                if (this.isUS2US) {
                    await this.jurisDataMapper.addJurisDataForUS2US(
                        detailTaxLine,
                        matchingFusionLine,
                        avaTaxLine,
                        avaTaxLineDetail,
                    )
                }
                if (
                    this.isCA2CA
                ) {
                    await this.jurisDataMapper.addJurisDataForCA2CA(
                        detailTaxLine,
                        matchingFusionLine,
                        avaTaxLine,
                        avaTaxLineDetail,
                    )
                }
                this.addToDetailTaxLinesCollection(detailTaxLines, detailTaxLine)
            }
        }
        return detailTaxLines
    }

    async createNoCalculationResponse(
        // sdk: AppknitSDK | AppknitGraphSDK,
        // message: string,
        // fusionRequest: Record<string, any>,
    ) {
        const detailTaxLines = [];
        for (const fusionRequestLine of this.fusionRequest.header.lines) {
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
        // sdk: AppknitSDK | AppknitGraphSDK,
        message: string,
        // fusionRequest: Record<string, any>,
    ) {
        const detailTaxLines = [];
        for (const fusionRequestLine of this.fusionRequest.header.lines) {
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
            detailTaxLine['ns:InternalOrganizationId'] = this.fusionRequest.header['ns:InternalOrganizationId'];
            detailTaxLine['ns:LegalEntityId'] = this.fusionRequest.header['ns:LegalEntityId'];

            detailTaxLines.push(detailTaxLine)
        }
        return detailTaxLines;
    }

    private addToDetailTaxLinesCollection(detailTaxLines: Array<Record<string, any>>, detailTaxLineToInsert: Record<string, any>) {
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
            detailTaxLineToInsert['ns:TaxApportionmentLineNumber'] = this.taxApportionmentLineNumber++;
            detailTaxLines.push(detailTaxLineToInsert)
        }
    }

    private buildFusionDetailTaxLine(
        fusionLine: Record<string, any>,
        avaTaxLine: Record<string, any>,
        avaTaxLineDetail: Record<string, any>,
        vbtTaxAmtDetail: Record<string, any>,
        SelfAssessedFlag: string,
    ): Record<string, any> {
        const detailTaxLine: Record<string, any> = {};
        detailTaxLine['ns:ErrorMessageTypeFlag'] = 'S';
        detailTaxLine['ns:ApplicationId'] = fusionLine['ns:ApplicationId'];
        detailTaxLine['ns:EntityCode'] = fusionLine['ns:EntityCode'];
        detailTaxLine['ns:EventClassCode'] = fusionLine['ns:EventClassCode'];
        detailTaxLine['ns:LineAmt'] = fusionLine['ns:LineAmt'];
        detailTaxLine['ns:TrxId'] = fusionLine['ns:TrxId'];

        detailTaxLine['ns:TrxLineCurrencyCode'] = fusionLine['ns:TrxLineCurrencyCode'];
        detailTaxLine['ns:TaxCurrencyCode'] = fusionLine['ns:TrxLineCurrencyCode'];
        detailTaxLine['ns:TrxLineId'] = fusionLine['ns:TrxLineId'];
        detailTaxLine['ns:TrxLineNumber'] = fusionLine['ns:TrxLineNumber'];
        detailTaxLine['ns:TrxLevelType'] = fusionLine['ns:TrxLevelType'];
        detailTaxLine['ns:InternalOrganizationId'] = this.fusionRequest.header['ns:InternalOrganizationId'];
        detailTaxLine['ns:LegalEntityId'] = this.fusionRequest.header['ns:LegalEntityId'];

        detailTaxLine['ns:SelfAssessedFlag'] = SelfAssessedFlag;

        detailTaxLine['ns:TrxDate'] = fusionLine['ns:TrxDate'] ? fusionLine['ns:TrxDate'] : this.fusionRequest.header['ns:TrxDate'];
        detailTaxLine['ns:TaxDate'] = fusionLine['ns:TaxDate'] ? fusionLine['ns:TaxDate'] : this.fusionRequest.header['ns:TaxDate'];
        detailTaxLine['ns:TaxDetermineDate'] = fusionLine['ns:TaxDate'] ? fusionLine['ns:TaxDate'] : this.fusionRequest.header['ns:TaxDate'];

        detailTaxLine['ns:TaxRate'] = _.toString(_.toNumber(avaTaxLineDetail.rate) * 100);

        detailTaxLine['ns:TaxAmt'] = avaTaxLineDetail.taxCalculated;
        detailTaxLine['ns:TaxAmtTaxCurr'] = avaTaxLineDetail.taxCalculated;
        detailTaxLine['ns:UnroundedTaxAmt'] = avaTaxLineDetail.taxCalculated;

        detailTaxLine['ns:UnroundedTaxableAmt'] = avaTaxLineDetail.taxableAmount;
        detailTaxLine['ns:TaxableAmt'] = avaTaxLineDetail.taxableAmount;
        detailTaxLine['ns:TaxableAmtCurr'] = avaTaxLineDetail.taxableAmount;

        detailTaxLine['ns:ManuallyEnteredFlag'] = 'N';
        detailTaxLine['ns:PlaceOfSupplyTypeCode'] = 'SHIP_TO';
        detailTaxLine['ns:ReportingOnlyFlag'] = 'N';

        detailTaxLine['ns:TaxRegimeCode'] = this.currentLegalEntity.ATX_TAX_REGIME_CODE;

        if (avaTaxLine['ns:ref2']) {
            detailTaxLine['ns:LegalJustificationText3'] = avaTaxLine.ref2;
        }

        if (vbtTaxAmtDetail && _.toNumber(avaTaxLineDetail.taxCalculated) > _.toNumber(avaTaxLineDetail.tax)) {
            detailTaxLine['ns:TaxAmt'] = _.toString(_.toNumber(avaTaxLineDetail.taxCalculated) - _.toNumber(avaTaxLineDetail.tax));
            detailTaxLine['ns:TaxAmtTaxCurr'] = _.toString(_.toNumber(avaTaxLineDetail.taxCalculated) - _.toNumber(avaTaxLineDetail.tax));
            detailTaxLine['ns:UnroundedTaxAmt'] = _.toString(_.toNumber(avaTaxLineDetail.taxCalculated) - _.toNumber(avaTaxLineDetail.tax));
        }
        return detailTaxLine;
    }

    private async returnNoTaxCalculationForAvaTaxLine(avaTaxLine: Record<string, any>): Promise<boolean> {
        if (
            this.configurationCodesService.getCodeValue('AP_SELF_ASSESS_TAX') == 'Y'
            && this.configurationCodesService.getCodeValue('BLOCK_AP_SELF_ASSESS_RESP') == 'Y'
        ) {
            return true
        }
        if (this.configurationCodesService.getCodeValue('CHECK_FOR_REGIME_SUBSCRIPTION') == 'Y' && ! (await this.hasRegimeSubscription())) {
            return true
        }
        return false;
    }

    private async hasRegimeSubscription(): Promise<boolean> {

        return true;
    }

}