import { AFCCalculateTaxesResponse, AFCLineItemResult } from "src/models/afc/AFCCalculateTaxesResponse";
import { TransactionLinesWithTransactionLineDetails } from "src/models/avalara/avalara-response/TransactionLine";
import { DetailTaxLine } from "src/models/oracle/DetailTaxLines";
import { TaxableLinesWithDetailTaxLines } from "src/models/oracle/TaxableLines";

export class Helpers {
    static isVBTDetailtaxLine(detailTaxLine: DetailTaxLine): boolean {
        if (detailTaxLine['ns:ManuallyEnteredFlag'] == 'Y' && detailTaxLine['ns:CancelFlag'] == 'N' && detailTaxLine['ns:DeleteFlag'] == 'N') {
            return true
        }
        return false;
    }

    static isCreditMemoAdditionalLine(avalaraTransactionLine: TransactionLinesWithTransactionLineDetails): boolean {
        return (avalaraTransactionLine.lineNumber as string).endsWith('.1NT')
    }

    static findMatchingFusionLineForAvataxResponseLine(avalaraTransactionLine: TransactionLinesWithTransactionLineDetails, fusionTaxableLines: Array<TaxableLinesWithDetailTaxLines>) {
        const matchingFusionLine = fusionTaxableLines.find(
            fusionLine => 
            // @ts-ignore
                fusionLine['ns:TrxLineId'] == avalaraTransactionLine.originationDocumentId
            // @ts-ignore
                || (!avalaraTransactionLine.originationDocumentId && fusionLine['ns:TrxLineNumber'] == avalaraTransactionLine.lineNumber));
        if (!matchingFusionLine) {
            throw new Error(`No Matching Fusion Line Found for Avalara Response Line: ${avalaraTransactionLine.lineNumber}`);
        }
        return matchingFusionLine;
    }

    static findMatchingFusionLineForAFCResponseLine(avalaraTransactionLine: AFCLineItemResult, fusionTaxableLines:Array<TaxableLinesWithDetailTaxLines>) {
        const matchingFusionLine = fusionTaxableLines.find(
            fusionLine =>
            // @ts-ignore
                fusionLine['ns:TrxLineId'] == avalaraTransactionLine.ref 
        ); 
        if (!matchingFusionLine) {
            throw new Error(`No Matching Fusion Line Found for Avalara Response Line ${avalaraTransactionLine.ref}`);
        }
        return matchingFusionLine;
    }

    static convertYYYYMMDDToIsoDateString(YYYYMMDDString: string): string {
        if (!YYYYMMDDString){
            return undefined;
        }
        const year = YYYYMMDDString.substring(0, 4)
        const month = YYYYMMDDString.substring(4, 6);
        const dt = YYYYMMDDString.substring(6, 8);

        return year + '-' + month + '-' + dt;
    }
}