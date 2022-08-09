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
}