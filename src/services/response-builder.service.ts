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
        private avalaraTransaction: Record<string, any>,
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
        this.taxApportionmentLineNumber = 1;
    }

    public async createResponse(
        vbtTaxAmtDetails: Record<string, any>,
    ) {
        vbtTaxAmtDetails = vbtTaxAmtDetails ? vbtTaxAmtDetails : {};
        switch (this.fusionRequest.taxableHeader['ns:ApplicationShortname']) {
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
        for (const avalaraTransactionLine of this.avalaraTransaction.lines) {
            if (Helpers.isCreditMemoAdditionalLine(avalaraTransactionLine)) {
                continue;
            }
            const matchingFusionTaxableLine = Helpers.findMatchingFusionLineForAvataxResponseLine(avalaraTransactionLine, this.fusionRequest.taxableHeader.taxableLines);
            for (const avalaraTransactionLineDetail of avalaraTransactionLine.details) {

                const detailTaxLine = this.buildFusionDetailTaxLine(
                    matchingFusionTaxableLine,
                    avalaraTransactionLine,
                    avalaraTransactionLineDetail,
                    undefined,
                    'N'
                );

                if (this.isUS2US) {
                    await this.jurisDataMapper.addJurisDataForUS2US(
                        detailTaxLine,
                        matchingFusionTaxableLine,
                        avalaraTransactionLine,
                        avalaraTransactionLineDetail,
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
                        matchingFusionTaxableLine,
                        avalaraTransactionLine,
                        avalaraTransactionLineDetail,
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
                    if (avalaraTransactionLineDetail.jurisType != 'CNT') {
                        continue;
                    }
                    await this.jurisDataMapper.addJurisDataForUS2CA(
                        detailTaxLine,
                        matchingFusionTaxableLine,
                        avalaraTransactionLine,
                        avalaraTransactionLineDetail,
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
        if (this.isUS2US && this.avalaraTransaction.totalTax == 0 && this.configurationCodesService.getCodeValue('CORRECT_VBT_FOR_OC') == 'Y') {
            VendorLineHandledFlag = true;
            for (const line of this.fusionRequest.taxableHeader.taxableLines) {
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
        for (const avalaraTransactionLine of this.avalaraTransaction.lines) {
            if (Helpers.isCreditMemoAdditionalLine(avalaraTransactionLine)) {
                continue;
            }
            const matchingFusionTaxableLine = Helpers.findMatchingFusionLineForAvataxResponseLine(avalaraTransactionLine, this.fusionRequest.taxableHeader.taxableLines);
            const vbtTaxAmtDetail: Record<string, any> = vbtTaxAmtDetails[avalaraTransactionLine.lineNumber];
            if (!VendorLineHandledFlag) {
                for (const detailTaxLine of matchingFusionTaxableLine.detailTaxLines ? matchingFusionTaxableLine.detailTaxLines : []) {
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

            if (await this.returnNoTaxCalculationForAvaTaxLine(avalaraTransactionLine)) {
                this.addToDetailTaxLinesCollection(detailTaxLines, this.getNoCalculationDetailTaxLine(matchingFusionTaxableLine))
                continue;
            }
            for (const avalaraTransactionLineDetail of avalaraTransactionLine.details) {
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
                    )
                }
                if (
                    this.isCA2CA
                ) {
                    await this.jurisDataMapper.addJurisDataForCA2CA(
                        detailTaxLine,
                        matchingFusionTaxableLine,
                        avalaraTransactionLine,
                        avalaraTransactionLineDetail,
                    )
                }
                this.addToDetailTaxLinesCollection(detailTaxLines, detailTaxLine)
            }
        }
        return detailTaxLines
    }

    async createNoCalculationResponse(
    ) {
        const detailTaxLines = [];
        for (const fusionTaxableLine of this.fusionRequest.taxableHeader.taxableLines) {
            detailTaxLines.push(this.getNoCalculationDetailTaxLine(fusionTaxableLine))
        }
        return detailTaxLines;
    }

    private getNoCalculationDetailTaxLine(fusionTaxableLine: Record<string, any>): Record<string, any> {
        const detailTaxLine: Record<string, any> = {};
        detailTaxLine['ns:ErrorMessageTypeFlag'] = 'X';
        detailTaxLine['ns:ErrorString'] = "";
        detailTaxLine['ns:ApplicationId'] = fusionTaxableLine['ns:ApplicationId'];
        detailTaxLine['ns:EntityCode'] = fusionTaxableLine['ns:EntityCode'];
        detailTaxLine['ns:EventClassCode'] = fusionTaxableLine['ns:EventClassCode'];
        detailTaxLine['ns:TrxId'] = fusionTaxableLine['ns:TrxId'];
        detailTaxLine['ns:TrxLineId'] = fusionTaxableLine['ns:TrxLineId'];
        return detailTaxLine
    }

    async createErrorResponse(
        message: string,
    ) {
        const detailTaxLines = [];
        for (const fusionTaxableLine of this.fusionRequest.taxableHeader.taxableLines) {
            const detailTaxLine: Record<string, any> = {};
            detailTaxLine['ns:ErrorMessageTypeFlag'] = 'E';
            detailTaxLine['ns:ErrorString'] = message;
            detailTaxLine['ns:ApplicationId'] = fusionTaxableLine['ns:ApplicationId'];
            detailTaxLine['ns:EntityCode'] = fusionTaxableLine['ns:EntityCode'];
            detailTaxLine['ns:EventClassCode'] = fusionTaxableLine['ns:EventClassCode'];
            detailTaxLine['ns:TrxId'] = fusionTaxableLine['ns:TrxId'];

            detailTaxLine['ns:TaxCurrencyCode'] = fusionTaxableLine['ns:TrxLineCurrencyCode'];
            detailTaxLine['ns:TrxLineId'] = fusionTaxableLine['ns:TrxLineId'];
            detailTaxLine['ns:TrxLineNumber'] = fusionTaxableLine['ns:TrxLineNumber'];
            detailTaxLine['ns:TrxLevelType'] = fusionTaxableLine['ns:TrxLineNumber'];
            detailTaxLine['ns:InternalOrganizationId'] = this.fusionRequest.taxableHeader['ns:InternalOrganizationId'];
            detailTaxLine['ns:LegalEntityId'] = this.fusionRequest.taxableHeader['ns:LegalEntityId'];

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
        fusionTaxableLine: Record<string, any>,
        avalaraTransactionLine: Record<string, any>,
        avalaraTransactionLineDetail: Record<string, any>,
        vbtTaxAmtDetail: Record<string, any>,
        SelfAssessedFlag: string,
    ): Record<string, any> {
        const detailTaxLine: Record<string, any> = {};
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

        detailTaxLine['ns:TrxDate'] = fusionTaxableLine['ns:TrxDate'] ? fusionTaxableLine['ns:TrxDate'] : this.fusionRequest.taxableHeader['ns:TrxDate'];
        detailTaxLine['ns:TaxDate'] = fusionTaxableLine['ns:TaxDate'] ? fusionTaxableLine['ns:TaxDate'] : this.fusionRequest.taxableHeader['ns:TaxDate'];
        detailTaxLine['ns:TaxDetermineDate'] = fusionTaxableLine['ns:TaxDate'] ? fusionTaxableLine['ns:TaxDate'] : this.fusionRequest.taxableHeader['ns:TaxDate'];

        detailTaxLine['ns:TaxRate'] = _.toString(_.toNumber(avalaraTransactionLineDetail.rate) * 100);

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

        if (avalaraTransactionLine['ns:ref2']) {
            detailTaxLine['ns:LegalJustificationText3'] = avalaraTransactionLine.ref2;
        }

        if (vbtTaxAmtDetail && _.toNumber(avalaraTransactionLineDetail.taxCalculated) > _.toNumber(avalaraTransactionLineDetail.tax)) {
            detailTaxLine['ns:TaxAmt'] = _.toString(_.toNumber(avalaraTransactionLineDetail.taxCalculated) - _.toNumber(avalaraTransactionLineDetail.tax));
            detailTaxLine['ns:TaxAmtTaxCurr'] = _.toString(_.toNumber(avalaraTransactionLineDetail.taxCalculated) - _.toNumber(avalaraTransactionLineDetail.tax));
            detailTaxLine['ns:UnroundedTaxAmt'] = _.toString(_.toNumber(avalaraTransactionLineDetail.taxCalculated) - _.toNumber(avalaraTransactionLineDetail.tax));
        }
        return detailTaxLine;
    }

    private async returnNoTaxCalculationForAvaTaxLine(avalaraTransactionLine: Record<string, any>): Promise<boolean> {
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