export class ExtendedFunctionsService {

    constructor(

    ) { }

    public addProratedTaxesAsTaxOverrides(
        taxOverrides: Record<string, any>,
        avalaraRequest: Record<string, any>,
        glDate: Date,
    ) {
        for (const line of avalaraRequest.lines) {
            const lineOverrideItem = taxOverrides[line.number];
            if (!lineOverrideItem) {
                line.taxOverride = null;
                continue;
            }
            if (glDate) {
                line.taxOverride = {
                    type: 'TaxAmount',
                    taxDate: avalaraRequest.date,
                    taxAmount: lineOverrideItem,
                    reason: 'Tax Amount and Tax Date override'
                }
            } else {
                line.taxOverride = {
                    type: 'TaxAmount',
                    taxAmount: lineOverrideItem,
                    reason: 'To get prorated vendor billed tax amounts for the lines'
                }
            }
        }
        avalaraRequest.commitFlag = true;
        return avalaraRequest;
    }

    public addCreditMemoLines(
        avalaraRequestLines: Array<Record<string, any>>,
    ) {
        const inputLines = avalaraRequestLines;
        const outputLines = [];
        for (const inputLine of inputLines) {
            if (
                inputLine.fusionLine['ns:EventClassCode'] == 'CREDIT_MEMO'
                && inputLine.fusionLine['ns:LineLevelAction'] == 'ALLOCATE_TAX_ONLY_ADJUSTMENT'
            ) {
                const additionalLine = {
                    number: inputLine.number + '.1NT',
                    taxCode: 'NT',
                    itemCode: inputLine.itemCode,
                    addresses: inputLine.addresses,
                    revenueAccount: inputLine.revenueAccount,
                };
                const detailTaxLineWithAmt = inputLine.fusionLine.detailTaxLines.find(detailTaxLine => detailTaxLine['ns:TaxAmt'] != 0);
                let amount = inputLine.amount;
                if (detailTaxLineWithAmt) {
                    amount = detailTaxLineWithAmt['ns:TaxableAmt']
                }
                if (inputLine.fusionLine['ns:TrxLineQuantity'] < 0) {
                    additionalLine['amount'] = amount;
                    inputLine.amount = amount * -1;
                } else {
                    additionalLine['amount'] = amount * -1;
                    inputLine.amount = amount;
                }
                additionalLine['taxOverride'] = {
                    type: 'TaxAmount',
                    taxAmount: 0,
                    reason: 'Credit Memo TaxOverride'
                };
                outputLines.push(additionalLine)
            }
            outputLines.push(inputLine);
            delete (inputLine.fusionLine)
        }
        return outputLines;
    }

}