import { configurationCodeRecord, ConfigurationCodesService } from "../services/configuration.service"

export class RequestService {
    private configurationCodesService: ConfigurationCodesService;
    private TaxApportionmentCounter: number;
    constructor() {
        this.configurationCodesService = new ConfigurationCodesService();
        this.TaxApportionmentCounter = 0;
    }
    public convertIntoHierarchy(soapRequest: any): any {
        const env = soapRequest['soapenv:Envelope'];
        let action = '';
        const header = env['soapenv:Header'];
        if (header) {
            if (header['wsa:Action']) {
                if (header['wsa:Action']['value']) {
                    action = header['wsa:Action']['value'];
                } else {
                    action = header['wsa:Action'];
                }
            }
        }

        const mappings = this.makeMappingsObj();

        let soapReqBody;
        if (action === 'Calculation') {
            soapReqBody = env['soapenv:Body']['ns:CalculationRequest'];
        } else if (action === 'Rejection') {
            soapReqBody = env['soapenv:Body']['ns:RejectionRequest'];
        } else if (action === 'Update') {
            soapReqBody = env['soapenv:Body']['ns:UpdateRequest'];
        } else if (action === 'Cancellation') {
            soapReqBody = env['soapenv:Body']['ns:CancellationRequest'];
        } else if (action === 'Deletion') {
            soapReqBody = env['soapenv:Body']['ns:DeletionRequest'];
        } else if (action === 'Synchronization') {
            soapReqBody = env['soapenv:Body']['ns:SynchronizationRequest'];
        } else if (action === 'Notification') {
            soapReqBody = env['soapenv:Body']['ns:NotificationRequest'];
            // mappings['documentId'] = soapReqBody['ns:documentId'];
            // mappings['extractType'] = soapReqBody['ns:extractType'];
        } else if (action === 'BatchRejection') {
            soapReqBody = env['soapenv:Body']['ns:BatchRejectionRequest'];
            // mappings['documentId'] = soapReqBody['ns:documentId'];
        }

        const requestBody = soapReqBody;

        const txHeaders = requestBody['ns:taxableHeaders'];
        if (txHeaders) {
            mappings.taxableHeader = txHeaders;
            mappings.taxableHeader.taxableLines = []
        }

        let detTaxLineMap: Record<string, Array<any>> = {};
        const detTxLinesColl = requestBody['ns:detailTaxLines'];
        if (detTxLinesColl) {
            const detTxLines = detTxLinesColl['ns:DetailTaxLines'];
            let detTxLinesArray: Array<any>;
            if (detTxLines) {
                if (!Array.isArray(detTxLines)) {
                    detTxLinesArray = [detTxLines];
                } else {
                    detTxLinesArray = detTxLines;
                }
                for (const dtLine of detTxLinesArray) {
                    if (!dtLine['ns:CancelFlag'] || dtLine['ns:CancelFlag'] == 'N') {
                        if (detTaxLineMap.hasOwnProperty(dtLine['ns:TrxLineId'])) {
                            detTaxLineMap[dtLine['ns:TrxLineId']].push(dtLine)
                        } else {
                            detTaxLineMap[dtLine['ns:TrxLineId']] = [dtLine];
                        }
                    }
                }
            }
        }

        const txLinesColl = requestBody['ns:taxableLines'];
        if (txLinesColl) {
            const txLines = txLinesColl['ns:TaxableLine'];
            let taxLinesArray: Array<any>;
            if (txLines) {
                if (!Array.isArray(txLines)) {
                    taxLinesArray = [txLines]
                } else {
                    taxLinesArray = txLines
                }
                for (const line of taxLinesArray) {
                    this.extractAddresses(line);
                    if (detTaxLineMap.hasOwnProperty(line['ns:TrxLineId'])) {
                        line.detailTaxLines = detTaxLineMap[line['ns:TrxLineId']]
                    }
                    mappings.taxableHeader.taxableLines.push(line);
                }
            }
        }

        mappings.wsAction = action;
        return mappings;
    }

    public checkAndProcessVBTDetails(
        fusionRequest: {
            taxableHeader: Record<string, any>,
        },
        configCodes: Array<configurationCodeRecord>,
        currentLegalEntity: Record<string, any>,
    ): {
        taxableHeader: Record<string, any>,
        vendorTaxed: boolean,
        totalVBT: number,
        vendorTaxes: Record<string, number>
    } {
        this.configurationCodesService.setConfigCodes(configCodes);
        if (this.configurationCodesService.getCodeValue('AP_SELF_ASSESS_TAX') == 'Y') {
            if (fusionRequest.taxableHeader['ns:CtrlTotalHdrTxAmt'] && fusionRequest.taxableHeader['ns:CtrlTotalHdrTxAmt'] > 0) {
                this.addDetailTaxLinesWithAmount(fusionRequest, currentLegalEntity, fusionRequest.taxableHeader['ns:CtrlTotalHdrTxAmt'])
            } else {
                this.addMissingDetailTaxLineIfAtLestOneVBTLineAvailable(fusionRequest);
            }
        } else {
            if (this.atLeastOneLineHasVBTDetail(fusionRequest.taxableHeader.taxableLines)) {
                this.makeTaxZeroOnVBTDetails(fusionRequest.taxableHeader.taxableLines)
            } else {
                this.addDetailTaxLinesWithAmount(fusionRequest, currentLegalEntity, 0);
            }
        }

        const { vendorTaxed, totalVBT, vendorTaxes } = this.checkAndGetTotalVendorTax(fusionRequest.taxableHeader.taxableLines)

        return {
            taxableHeader: fusionRequest.taxableHeader,
            vendorTaxed,
            totalVBT,
            vendorTaxes,
        };
    }

    private checkAndGetTotalVendorTax(taxableLines: Record<string, any>): { vendorTaxed: boolean, totalVBT: number, vendorTaxes: Record<string, number> } {
        let totalVBT = 0;
        let vendorTaxed = false;
        let vendorTaxes = {}
        for (var i = 0; i < taxableLines.length; i++) {
            const taxableLine = taxableLines[i];
            let lineAmount = 0;
            for (var j = 0; j < taxableLine.detailTaxLines?.length; j++) {
                const detailTaxLine = taxableLine.detailTaxLines[j];
                if (this.isVBTDetail(detailTaxLine)) {
                    const vbtTaxAmt = parseFloat(detailTaxLine['ns:TaxAmt']);
                    if (vbtTaxAmt) {
                        vendorTaxed = true;
                        lineAmount = lineAmount + vbtTaxAmt;
                        totalVBT = totalVBT + vbtTaxAmt;
                    }
                }
            }
            if (lineAmount) {
                vendorTaxes[taxableLine['ns:TrxLineId']] = lineAmount;
            }
        }
        if (!vendorTaxed && this.configurationCodesService.getCodeValue('AP_SELF_ASSESS_TAX') != 'Y'){
            vendorTaxed = true;
        }
        return {
            totalVBT,
            vendorTaxed,
            vendorTaxes,
        }
    }

    private makeTaxZeroOnVBTDetails(taxableLines: Array<Record<string, any>>) {
        for (var i = 0; i < taxableLines.length; i++) {
            const taxableLine = taxableLines[i];
            for (var j = 0; j < taxableLine.detailTaxLines?.length; j++) {
                const detailTaxLine = taxableLine.detailTaxLines[j];
                if (this.isVBTDetail(detailTaxLine)) {
                    detailTaxLine['ns:TaxAmt'] = 0;
                    detailTaxLine['ns:TaxAmtTaxCurr'] = 0;
                    detailTaxLine['ns:UnroundedTaxAmt'] = 0;
                    detailTaxLine['ns:TaxRate'] = 0;
                }
            }
        }
    }

    private atLeastOneLineHasVBTDetail(taxableLines: Array<Record<string, any>>): boolean {
        for (var i = 0; i < taxableLines.length; i++) {
            const taxableLine = taxableLines[i];
            if (this.hasVBTDetails(taxableLine)) {
                return true;
            }
        }
        return false;
    }

    private addMissingDetailTaxLineIfAtLestOneVBTLineAvailable(fusionRequest: {
        taxableHeader: Record<string, any>,
    }) {
        let hasAtleastOneLineWithVBTDetail = false;
        let masterVBTDetails = {};
        for (var i = 0; i < fusionRequest.taxableHeader.taxableLines.length; i++) {
            const taxableLine = fusionRequest.taxableHeader.taxableLines[i];
            if (taxableLine['ns:LineLevelAction'] == 'DISCARD') {
                continue;
            }
            if (this.hasVBTDetails(taxableLine)) {
                masterVBTDetails = this.getVBTDetail(taxableLine);
                hasAtleastOneLineWithVBTDetail = true;
                break;
            }
        }

        if (hasAtleastOneLineWithVBTDetail) {
            for (var i = 0; i < fusionRequest.taxableHeader.taxableLines.length; i++) {
                const taxableLine = fusionRequest.taxableHeader.taxableLines[i];
                if (taxableLine['ns:LineLevelAction'] == 'DISCARD') {
                    continue;
                }
                if (!this.hasVBTDetails(taxableLine)) {
                    this.addMissingVBTDetailFromMasterVBTDetail(taxableLine, masterVBTDetails)
                }
            }
        }
    }

    private addMissingVBTDetailFromMasterVBTDetail(taxableLine: Record<string, any>, masterVBTDetail: Record<string, any>) {
        if (!taxableLine.detailTaxLines || !Array.isArray(taxableLine.detailTaxLines)) {
            taxableLine.detailTaxLines = []
        }
        taxableLine.detailTaxLines.push({
            ...masterVBTDetail,
            'ns:AdditionalInformation': `Detail Tax Line copied - ${taxableLine['ns:TrxLineId']}`,
            'ns:LineAmt': taxableLine['ns:LineAmt'],
            'ns:LineAssessableValue': taxableLine['ns:LineAssessableValue'],
            'ns:MinimumAccountableUnit': taxableLine['ns:MinimumAccountableUnit'],
            'ns:Precision': taxableLine['ns:Precision'],
            'ns:TaxAmt': 0,
            'ns:TaxAmtTaxCurr': 0,
            'ns:UnroundedTaxAmt': 0,
            'ns:TaxApportionmentLineNumber': this.TaxApportionmentCounter++,
            'ns:UnroundedTaxableAmt': taxableLine['ns:LineAmt'],
            'ns:TaxLineId': taxableLine['ns:TaxLineId'],
            'ns:TaxLineNumber': taxableLine['ns:TaxLineNumber'],
            'ns:TaxableAmt': taxableLine['ns:LineAmt'],
            'ns:TaxableAmtTaxCurr': taxableLine['ns:LineAmt'],
            'ns:TrxLevelType': taxableLine['ns:TrxLevelType'],
            'ns:TrxLineId': taxableLine['ns:TrxLineId'],
            'ns:TrxLineNumber': taxableLine['ns:TrxLineNumber'],
        });
    }

    private hasVBTDetails(taxableLine: Record<string, any>): boolean {
        for (var i = 0; i < taxableLine.detailTaxLines?.length; i++) {
            if (this.isVBTDetail(taxableLine.detailTaxLines[i])) {
                return true
            }
        }
        return false;
    }

    private getVBTDetail(taxableLine: Record<string, any>): boolean {
        for (var i = 0; i < taxableLine.detailTaxLines?.length; i++) {
            if (this.isVBTDetail(taxableLine.detailTaxLines[i])) {
                return taxableLine.detailTaxLines[i]
            }
        }
        return;
    }

    private isVBTDetail(detailTaxLine: Record<string, any>): boolean {
        if (detailTaxLine['ns:ManuallyEnteredFlag'] == 'Y' && detailTaxLine['ns:CancelFlag'] == 'N' && detailTaxLine['ns:DeleteFlag'] == 'N') {
            return true
        }
        return false;
    }

    private addDetailTaxLinesWithAmount(
        fusionRequest: {
            taxableHeader: Record<string, any>,
        },
        currentLegalEntity: Record<string, any>,
        amountForFirstLine: number,
    ) {
        for (var i = 0; i < fusionRequest.taxableHeader.taxableLines.length; i++) {
            const taxableLine = fusionRequest.taxableHeader.taxableLines[i];
            if (taxableLine['ns:LineLevelAction'] == 'DISCARD') {
                continue;
            }
            taxableLine.detailTaxLines = [
                {
                    'ns:AdditionalInformation': `Detail Tax Line added - ${taxableLine['ns:TrxLineId']}`,
                    'ns:ApplicationId': taxableLine['ns:ApplicationId'],
                    'ns:CancelFlag': 'N',
                    'ns:CompoundingTaxFlag': 'N',
                    'ns:CopiedFromOtherDocFlag': 'N',
                    'ns:DeleteFlag': 'N',
                    'ns:EntityCode': fusionRequest.taxableHeader['ns:EntityCode'],
                    'ns:EventClassCode': fusionRequest.taxableHeader['ns:EventClassCode'],
                    'ns:InternalOrganizationId': fusionRequest.taxableHeader['ns:InternalOrganizationId'],
                    'ns:LedgerId': fusionRequest.taxableHeader['ns:LedgerId'],
                    'ns:LegalEntityId': fusionRequest.taxableHeader['ns:LegalEntityId'],
                    'ns:LineAmt': taxableLine['ns:LineAmt'],
                    'ns:LineAssessableValue': taxableLine['ns:LineAssessableValue'],
                    'ns:ManuallyEnteredFlag': 'Y',
                    'ns:MinimumAccountableUnit': taxableLine['ns:MinimumAccountableUnit'],
                    'ns:OffsetFlag': 'N',
                    'ns:OverriddenFlag': 'Y',
                    'ns:Precision': taxableLine['ns:Precision'],
                    'ns:ReportableFlag': 'Y',
                    'ns:ReportingOnlyFlag': 'N',
                    'ns:RoundingLevelCode': 'HEADER',
                    'ns:RoundingRuleCode': 'NEAREST',
                    'ns:SelfAssessedFlag': 'N',
                    'ns:Tax': this.configurationCodesService.getCodeValue('VBT_CODE'),
                    'ns:TaxAmt': i === 0 ? amountForFirstLine : 0,
                    'ns:TaxAmtTaxCurr': i === 0 ? amountForFirstLine : 0,
                    'ns:UnroundedTaxAmt': i === 0 ? amountForFirstLine : 0,
                    'ns:UnroundedTaxableAmt': taxableLine['ns:LineAmt'],
                    'ns:TaxRate': i === 0 ? 0 : 0,
                    'ns:TaxAmtIncludedFlag': 'N',
                    'ns:TaxApportionmentLineNumber': this.TaxApportionmentCounter++,
                    'ns:TaxCurrencyCode': fusionRequest.taxableHeader['ns:TaxCurrencyCode'],
                    'ns:TaxCurrencyConversionDate': fusionRequest.taxableHeader['ns:TaxCurrencyConversionDate'],
                    'ns:TaxCurrencyConversionRate': fusionRequest.taxableHeader['ns:TaxCurrencyConversionRate'],
                    'ns:TaxDate': fusionRequest.taxableHeader['ns:TaxDate'],
                    'ns:TaxDetermineDate': fusionRequest.taxableHeader['ns:TaxDetermineDate'],
                    'ns:TaxJurisdictionCode': currentLegalEntity.ATX_JURISDICTION_CODE_PREFIX + '-DEFAULT',
                    'ns:TaxLineId': taxableLine['ns:TaxLineId'],
                    'ns:TaxLineNumber': taxableLine['ns:TaxLineNumber'],
                    'ns:TaxOnlyLineFlag': 'N',
                    'ns:TaxPointBasis': 'INVOICE',
                    'ns:TaxRateCode': this.configurationCodesService.getCodeValue('VBT_RATE_CODE'),
                    'ns:TaxStatusCode': this.configurationCodesService.getCodeValue('VBT_STATUS_CODE'),
                    'ns:TaxRegimeCode': currentLegalEntity.ATX_TAX_REGIME_CODE,
                    'ns:TaxRateType': 'PERCENTAGE',
                    'ns:TaxableAmt': taxableLine['ns:LineAmt'],
                    'ns:TaxableAmtTaxCurr': taxableLine['ns:LineAmt'],
                    'ns:TrxCurrencyCode': fusionRequest.taxableHeader['ns:TrxCurrencyCode'],
                    'ns:TrxDate': fusionRequest.taxableHeader['ns:TrxDate'],
                    'ns:TrxId': fusionRequest.taxableHeader['ns:TrxId'],
                    'ns:TrxLevelType': taxableLine['ns:TrxLevelType'],
                    'ns:TrxLineId': taxableLine['ns:TrxLineId'],
                    'ns:TrxLineNumber': taxableLine['ns:TrxLineNumber'],
                },
            ];
        }
    }

    private makeMappingsObj(): {
        taxableHeader: Record<string, any>,
        wsAction: string,
    } {
        const taxableHeader = {};
        const vendorTaxes = new Map();
        let totalVBT = 0;
        let vendorTaxed = false;
        return {
            taxableHeader,
            wsAction: '',
        };
    }

    private addDetailsIfVBT(detTaxLine, mappings): void {
        const taxAmt = parseFloat(detTaxLine['ns:TaxAmt']);
        // console.log('VBT adding : ' + taxAmt);
        if (taxAmt != 0) {
            if (detTaxLine['ns:ManuallyEnteredFlag']) {
                if ('Y' == detTaxLine['ns:ManuallyEnteredFlag']) {
                    mappings.vendorTaxed = true;
                    let lineVBT = mappings.vendorTaxes.get(detTaxLine['ns:TrxLineId']);
                    if (lineVBT) {
                        lineVBT += taxAmt;
                    } else {
                        lineVBT = taxAmt;
                    }
                    mappings.vendorTaxes.set(detTaxLine['ns:TrxLineId'], lineVBT);
                    if (!mappings.totalVBT) {
                        mappings.totalVBT = taxAmt;
                    } else {
                        mappings.totalVBT += taxAmt;
                    }
                    // console.log('Total VBT : ' + mappings.totalVBT);
                }
            }
        }
    }

    private extractAddresses(taxableLine): void {
        const shipTo = this.extractAddressForType(taxableLine, 'ns:ShipTo');
        const shipFrom = this.extractAddressForType(taxableLine, 'ns:ShipFrom');
        const billTo = this.extractAddressForType(taxableLine, 'ns:BillTo');
        const billFrom = this.extractAddressForType(taxableLine, 'ns:BillFrom');
        const poo = this.extractAddressForType(taxableLine, 'ns:Poo');
        const poa = this.extractAddressForType(taxableLine, 'ns:Poa');
        const finalDischarge = this.extractAddressForType(taxableLine, 'ns:FinalDischarge');

        const addresses = {};
        addresses['shipFrom'] = shipFrom;
        addresses['shipTo'] = shipTo;
        addresses['billFrom'] = billFrom;
        addresses['billTo'] = billTo;
        addresses['pointOfOrderOrigin'] = poo;
        addresses['pointOfOrderAcceptance'] = poa;
        addresses['finalDischarge'] = finalDischarge;

        taxableLine['_addresses'] = addresses;
    }

    private extractAddressForType(taxableLine, addressType): any {
        const values = [
            taxableLine[addressType + 'GeographyValue1'],
            taxableLine[addressType + 'GeographyValue2'],
            taxableLine[addressType + 'GeographyValue3'],
            taxableLine[addressType + 'GeographyValue4'],
            taxableLine[addressType + 'GeographyValue5'],
            taxableLine[addressType + 'GeographyValue6'],
            taxableLine[addressType + 'GeographyValue7'],
            taxableLine[addressType + 'GeographyValue8'],
            taxableLine[addressType + 'GeographyValue9'],
            taxableLine[addressType + 'GeographyValue10'],
        ];

        let hasVal = false;
        for (const val of values) {
            if (val) {
                hasVal = true;
                break;
            }
        }
        if (!hasVal) {
            return null;
        }
        const address = this.extractAddress(
            [
                taxableLine[addressType + 'GeographyType1'],
                taxableLine[addressType + 'GeographyType2'],
                taxableLine[addressType + 'GeographyType3'],
                taxableLine[addressType + 'GeographyType4'],
                taxableLine[addressType + 'GeographyType5'],
                taxableLine[addressType + 'GeographyType6'],
                taxableLine[addressType + 'GeographyType7'],
                taxableLine[addressType + 'GeographyType8'],
                taxableLine[addressType + 'GeographyType9'],
                taxableLine[addressType + 'GeographyType10'],
            ],
            values,
        );
        return address;
    }

    private extractAddress(types, values): any {
        const address = {};
        for (let idx = 0; idx < types.length; idx++) {
            this.setAddrFieldValue(address, types[idx], values[idx]);
            // this.setSameNameAddrFieldValue(address, types[idx], values[idx]);
        }
        return address;
    }

    private setAddrFieldValue(address, type, value): any {
        if (!type || !value || !(typeof type === 'string')) {
            return;
        }
        // console.log('Addr : '+address+', type : '+type+', val '+value)
        switch (type.toUpperCase()) {
            case 'ADDRESS1':
                address.line1 = value;
                break;
            case 'ADDRESS2':
                address.line2 = value;
                break;
            case 'ADDRESS3':
                address.line3 = value;
                break;
            case 'ADDRESS4':
                address.line4 = value;
                break;
            case 'COUNTRY':
                address.country = value;
                break;
            case 'STATE':
                if (value.length > 2) {
                    address.region = this.getStateCode(value);
                } else {
                    address.region = value;
                }
                break;
            case 'COUNTY':
                address.county = value;
                break;
            case 'CITY':
                address.city = value;
                break;
            case 'POSTALCODE':
                address.postalCode = value;
                break;
            case 'PROVINCE':
                address.province = value;
                break;
            case 'LATITUDE':
                address.latitude = value;
                break;
            case 'LONGITUDE':
                address.longitude = value;
                break;
        }
    }

    private setSameNameAddrFieldValue(address, type, value): any {
        if (!type || !value || !(typeof type === 'string')) {
            return;
        }
        address[type] = value;
    }

    private getStateCode(state: string): string {
        switch (state) {
            case 'Alabama':
                return 'AL';

            case 'Alaska':
                return 'AK';

            case 'Alberta':
                return 'AB';

            case 'American Samoa':
                return 'AS';

            case 'Arizona':
                return 'AZ';

            case 'Arkansas':
                return 'AR';

            case 'Armed Forces (AE)':
                return 'AE';

            case 'Armed Forces Americas':
                return 'AA';

            case 'Armed Forces Pacific':
                return 'AP';

            case 'British Columbia':
                return 'BC';

            case 'California':
                return 'CA';

            case 'Colorado':
                return 'CO';

            case 'Connecticut':
                return 'CT';

            case 'Delaware':
                return 'DE';

            case 'District Of Columbia':
                return 'DC';

            case 'Florida':
                return 'FL';

            case 'Georgia':
                return 'GA';

            case 'Guam':
                return 'GU';

            case 'Hawaii':
                return 'HI';

            case 'Idaho':
                return 'ID';

            case 'Illinois':
                return 'IL';

            case 'Indiana':
                return 'IN';

            case 'Iowa':
                return 'IA';

            case 'Kansas':
                return 'KS';

            case 'Kentucky':
                return 'KY';

            case 'Louisiana':
                return 'LA';

            case 'Maine':
                return 'ME';

            case 'Manitoba':
                return 'MB';

            case 'Maryland':
                return 'MD';

            case 'Massachusetts':
                return 'MA';

            case 'Michigan':
                return 'MI';

            case 'Minnesota':
                return 'MN';

            case 'Mississippi':
                return 'MS';

            case 'Missouri':
                return 'MO';

            case 'Montana':
                return 'MT';

            case 'Nebraska':
                return 'NE';

            case 'Nevada':
                return 'NV';

            case 'New Brunswick':
                return 'NB';

            case 'New Hampshire':
                return 'NH';

            case 'New Jersey':
                return 'NJ';

            case 'New Mexico':
                return 'NM';

            case 'New York':
                return 'NY';

            case 'Newfoundland':
                return 'NF';

            case 'North Carolina':
                return 'NC';

            case 'North Dakota':
                return 'ND';

            case 'Northwest Territories':
                return 'NT';

            case 'Nova Scotia':
                return 'NS';

            case 'Nunavut':
                return 'NU';

            case 'Ohio':
                return 'OH';

            case 'Oklahoma':
                return 'OK';

            case 'Ontario':
                return 'ON';

            case 'Oregon':
                return 'OR';

            case 'Pennsylvania':
                return 'PA';

            case 'Prince Edward Island':
                return 'PE';

            case 'Puerto Rico':
                return 'PR';

            case 'Quebec':
                return 'QC';

            case 'Rhode Island':
                return 'RI';

            case 'Saskatchewan':
                return 'SK';

            case 'South Carolina':
                return 'SC';

            case 'South Dakota':
                return 'SD';

            case 'Tennessee':
                return 'TN';

            case 'Texas':
                return 'TX';

            case 'Utah':
                return 'UT';

            case 'Vermont':
                return 'VT';

            case 'Virgin Islands':
                return 'VI';

            case 'Virginia':
                return 'VA';

            case 'Washington':
                return 'WA';

            case 'West Virginia':
                return 'WV';

            case 'Wisconsin':
                return 'WI';

            case 'Wyoming':
                return 'WY';

            case 'Yukon Territory':
                return 'YT';
            default:
                return '';
        }
    }
}
