export class TaxableToDetailTaxMapper {
  createDetailTaxLinesFromTaxableLines(taxableLines, legalEntityId): any {
    const detailTaxLines = [];
    for (const taxableLine of taxableLines) {
      const detTaxLine = {};
      this.setBaseValuesFromInputLine(detTaxLine, taxableLine, legalEntityId);
      detailTaxLines.push(detTaxLine);
    }
    return detailTaxLines;
  }

  setBaseValuesFromInputLine(detailTaxLine, inputLine, legalEntityId): any {
    detailTaxLine['ApplicationId'] = inputLine.applicationId;
    detailTaxLine['EntityCode'] = inputLine.entityCode;
    detailTaxLine['EventClassCode'] = inputLine.eventClassCode;
    detailTaxLine['LineAmt'] = inputLine.lineAmt;
    detailTaxLine['TrxId'] = inputLine.trxId;
    detailTaxLine['TrxCurrencyCode'] = inputLine.trxLineCurrencyCode;
    detailTaxLine['TrxLineId'] = inputLine.trxLineId;
    detailTaxLine['TrxLineNumber'] = inputLine.trxLineNumber;
    detailTaxLine['TrxLevelType'] = inputLine.trxLevelType;

    detailTaxLine['InternalOrganizationId '] = legalEntityId;
    detailTaxLine['LinesDetFactorId '] = inputLine.linesDetFactorId;
  }

  setFlags(detailTaxLine: any, isSelfAssessed: boolean): any {
    detailTaxLine['ManuallyEnteredFlag '] = 'N';
    detailTaxLine['SelfAssessedFlag '] = isSelfAssessed ? 'Y' : 'N';
    detailTaxLine['ReportingOnlyFlag '] = 'N';
  }

  createNoTaxDetailLine(
    taxableLines: any,
    internalOrganizationId,
    legalEntityId,
    errorString: string,
    errorMessageTypeFlag: string,
  ): any {
    const detailTaxLines = [];
    for (const taxableLine of taxableLines) {
      const detTaxLine = {};

      detTaxLine['ErrorMessageTypeFlag'] = errorMessageTypeFlag;
      detTaxLine['ErrorString'] = errorString;

      detTaxLine['ApplicationId'] = taxableLine.applicationId;
      detTaxLine['EntityCode'] = taxableLine.entityCode;
      detTaxLine['EventClassCode'] = taxableLine.eventClassCode;
      detTaxLine['TrxId'] = taxableLine.trxId;
      detTaxLine['TrxCurrencyCode'] = taxableLine.trxLineCurrencyCode;
      detTaxLine['TrxLineId'] = taxableLine.getTrxLineId;
      detTaxLine['TrxLineNumber'] = taxableLine.getTrxLineNumber;
      detTaxLine['TrxLevelType'] = taxableLine.getTrxLevelType;
      detTaxLine['InternalOrganizationId'] = internalOrganizationId;
      detTaxLine['LegalEntityId'] = legalEntityId;
      detailTaxLines.push(detTaxLine);
    }
    return detailTaxLines;
  }
}
