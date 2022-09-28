export class Helpers {
    static isVBTDetailtaxLine(detailTaxLine: Record<string, any>): boolean {
        if (detailTaxLine['ns:ManuallyEnteredFlag'] == 'Y' && detailTaxLine['ns:CancelFlag'] == 'N' && detailTaxLine['ns:DeleteFlag'] == 'N') {
            return true
        }
        return false;
    }

    static isCreditMemoAdditionalLine(avalaraTransactionLine: Record<string, any>): boolean {
        return (avalaraTransactionLine.lineNumber as string).endsWith('.1NT')
    }

    static findMatchingFusionLineForAvataxResponseLine(avalaraTransactionLine: Record<string, any>, fusionTaxableLines: Array<Record<string, any>>) {
        const matchingFusionLine = fusionTaxableLines.find(
            fusionLine =>
                fusionLine['ns:TrxLineId'] == avalaraTransactionLine.originationDocumentId
                || (!avalaraTransactionLine.originationDocumentId && fusionLine['ns:TrxLineNumber'] == avalaraTransactionLine.lineNumber));
        if (!matchingFusionLine) {
            throw new Error(`No Matching Fusion Line Found for Avalara Response Line: ${avalaraTransactionLine.lineNumber}`);
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