export class DataMapperV2 {
    VENDOR_BILLED_TAX = 'VENDOR BILLED TAX';

    processIncomingSoapRequest(soapRequest: any): any {
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
            mappings['documentId'] = soapReqBody['ns:documentId'];
            mappings['extractType'] = soapReqBody['ns:extractType'];
        } else if (action === 'BatchRejection') {
            soapReqBody = env['soapenv:Body']['ns:BatchRejectionRequest'];
            mappings['documentId'] = soapReqBody['ns:documentId'];
        }

        const requestBody = soapReqBody;

        const txHeaders = requestBody['ns:taxableHeaders'];
        if (txHeaders) {
            mappings.header = txHeaders;

            const trxNum = txHeaders['ns:TrxNumber'];
            if (trxNum && trxNum === '~$~$$$') {
                mappings['commit'] = false;
            }
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
                        this.addDetailsIfVBT(dtLine, mappings);
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
                    mappings.lines.push(line);
                }
            }
        }

        mappings.wsAction = action;
        return mappings;
    }

    makeMappingsObj(): {
        header: Record<string, any>,
        lines: Array<Record<string, any>>,
        vendorTaxes: Map<any, any>,
        totalVBT: number,
        vendorTaxed: boolean,
        wsAction: string,
    } {
        const header = [];
        const lines = [];
        const vendorTaxes = new Map();
        let totalVBT = 0;
        let vendorTaxed = false;
        return {
            header,
            lines,
            vendorTaxes,
            vendorTaxed,
            totalVBT,
            wsAction: '',
        };
    }

    addDetailsIfVBT(detTaxLine, mappings): void {
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

    extractAddresses(taxableLine): void {
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

    extractAddressForType(taxableLine, addressType): any {
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

    extractAddress(types, values): any {
        const address = {};
        for (let idx = 0; idx < types.length; idx++) {
            // this.setAddrFieldValue(address, types[idx], values[idx]);
            this.setSameNameAddrFieldValue(address, types[idx], values[idx]);
        }
        return address;
    }

    setAddrFieldValue(address, type, value): any {
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

    setSameNameAddrFieldValue(address, type, value): any {
        if (!type || !value || !(typeof type === 'string')) {
            return;
        }
        address[type] = value;
    }

    getStateCode(state: string): string {
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
