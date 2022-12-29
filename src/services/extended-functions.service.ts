import { CreateTransaction } from "../../src/models/avalara/avalara-request/CreateTransaction";
import { LineItem } from "../../src/models/avalara/avalara-request/LineItem";
import { lineItemTaxOverrideTypeEnum } from "../../src/models/avalara/TaxOverride";

export class ExtendedFunctionsService {

    constructor(

    ) { }

    public addProratedTaxesAsTaxOverrides(
        taxOverrides: Record<string, any>,
        avalaraCreateTransactionModel: CreateTransaction,
        glDate: Date,
    ) {
        for (const avalaraRequestLineItem of avalaraCreateTransactionModel.lines) {
            const lineOverrideAmount = taxOverrides[avalaraRequestLineItem.number];
            if (!lineOverrideAmount) {
                avalaraRequestLineItem.taxOverride = null;
                continue;
            }
            if (glDate) {
                avalaraRequestLineItem.taxOverride = {
                    type: lineItemTaxOverrideTypeEnum.TaxAmount,
                    taxDate: avalaraCreateTransactionModel.date,
                    taxAmount: lineOverrideAmount,
                    reason: 'Tax Amount and Tax Date override'
                }
            } else {
                avalaraRequestLineItem.taxOverride = {
                    type: lineItemTaxOverrideTypeEnum.TaxAmount,
                    taxAmount: lineOverrideAmount,
                    reason: 'To get prorated vendor billed tax amounts for the lines'
                }
            }
        }
        avalaraCreateTransactionModel.commit = true;
        return avalaraCreateTransactionModel;
    }

    public addCreditMemoLines(
        avalaraCreateTransactionLineItems: Array<LineItem>,
    ) {
        const inputLines = avalaraCreateTransactionLineItems;
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