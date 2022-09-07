export class Helpers {
    static isVBTDetailtaxLine(detailTaxLine: Record<string, any>): boolean {
        if (detailTaxLine['ns:ManuallyEnteredFlag'] == 'Y' && detailTaxLine['ns:CancelFlag'] == 'N' && detailTaxLine['ns:DeleteFlag'] == 'N') {
            return true
        }
        return false;
    }

    static isCreditMemoAdditionalLine(avaTaxLine: Record<string, any>): boolean {
        return (avaTaxLine.lineNumber as string).endsWith('.1NT')
    }

    static findMatchingFusionLineForAvataxResponseLine(avaTaxResponseLine: Record<string, any>, fusionRequestLines: Array<Record<string, any>>) {
        const matchingFusionLine = fusionRequestLines.find(
            fusionLine =>
                fusionLine['ns:TrxLineId'] == avaTaxResponseLine.originationDocumentId
                || (!avaTaxResponseLine.originationDocumentId && fusionLine['ns:TrxLineNumber'] == avaTaxResponseLine.lineNumbr));
        if (!matchingFusionLine) {
            throw new Error(`No Matching Fusion Line Found for Avalara Response Line: ${avaTaxResponseLine.lineNumber}`);
        }
        return matchingFusionLine;
    }
}