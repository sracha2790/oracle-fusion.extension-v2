import { SdkOpenApiSchemaProperty } from "appknit-platform-sdk-v2";

export const TaxableHeadersModel: SdkOpenApiSchemaProperty = {
  description: "TaxableHeadersModel",
  type: "object",
  properties: {
    "ns:ApplicationId": {
      type: "integer",
      format: "int64",
    },
    "ns:ApplicationShortname": {
      type: "string",
    },
    "ns:BatchName": {
      type: "string",
    },
    "ns:BatchSourceName": {
      type: "string",
    },
    "ns:CtrlHdrTxApplFlag": {
      type: "string",
    },
    "ns:CtrlTotalHdrTxAmt": {
      type: "integer",
      format: "double",
    },
    "ns:CurrencyConversionDate": {
      type: "string",
      format: "date",
    },
    "ns:CurrencyConversionRate": {
      type: "integer",
      format: "double",
    },
    "ns:CurrencyConversionType": {
      type: "string",
    },
    "ns:DefaultTaxationCountry": {
      type: "string",
    },
    "ns:DocEventStatus": {
      type: "string",
    },
    "ns:DocSeqName": {
      type: "string",
    },
    "ns:DocSeqValue": {
      type: "string",
    },
    "ns:DocumentSubType": {
      type: "string",
    },
    "ns:DocumentType": {
      type: "string",
    },
    "ns:EntityCode": {
      type: "string",
    },
    "ns:EventClassCode": {
      type: "string",
    },
    "ns:EstablishmentId": {
      type: "integer",
      format: "int64",
    },
    "ns:EstablishmentNumber": {
      type: "string",
    },
    "ns:EventClassMappingId": {
      type: "integer",
      format: "int64",
    },
    "ns:EventTypeCode": {
      type: "string",
    },
    "ns:EndPointUrl": {
      type: "string",
    },
    "ns:FirstPtyOrgId": {
      type: "integer",
      format: "int64",
    },
    "ns:FirstPtyRegId": {
      type: "integer",
      format: "int64",
    },
    "ns:FirstPtyRegNumber": {
      type: "string",
    },
    "ns:GlDate": {
      type: "string",
      format: "date",
    },
    "ns:HdrTrxUserKey1": {
      type: "string",
    },
    "ns:HdrTrxUserKey2": {
      type: "string",
    },
    "ns:HdrTrxUserKey3": {
      type: "string",
    },
    "ns:HdrTrxUserKey4": {
      type: "string",
    },
    "ns:HdrTrxUserKey5": {
      type: "string",
    },
    "ns:HdrTrxUserKey6": {
      type: "string",
    },
    "ns:HistoricalFlag": {
      type: "string",
    },
    "ns:HqEstbPartyTaxProfId": {
      type: "integer",
      format: "int64",
    },
    "ns:InternalOrgLocationId": {
      type: "integer",
      format: "int64",
    },
    "ns:InternalOrganizationId": {
      type: "integer",
      format: "int64",
    },
    "ns:LedgerId": {
      type: "integer",
      format: "int64",
    },
    "ns:LegalEntityId": {
      type: "integer",
      format: "int64",
    },
    "ns:LegalEntityNumber": {
      type: "string",
    },
    "ns:LogLevel": {
      type: "string",
    },
    "ns:PaymentMethod": {
      type: "string",
    },
    "ns:ReceivablesTrxTypeSeqId": {
      type: "integer",
      format: "int64",
    },
    "ns:TaxInvoiceDate": {
      type: "string",
      format: "date",
    },
    "ns:ShipFromSiteRegNumber": {
      type: "string",
    },
    "ns:TaxInvoiceNumber": {
      type: "string",
    },
    "ns:ThirdPtyRegId": {
      type: "integer",
      format: "int64",
    },
    "ns:ThirdPtyRegNumber": {
      type: "string",
    },
    "ns:TrxCurrencyCode": {
      type: "string",
    },
    "ns:TrxDate": {
      type: "string",
      format: "date",
    },
    "ns:TrxDescription": {
      type: "string",
    },
    "ns:TrxDocRevision": {
      type: "string",
    },
    "ns:TrxDueDate": {
      type: "string",
      format: "date",
    },
    "ns:TrxHeaderAmt": {
      type: "integer",
      format: "double",
    },
    "ns:TrxId": {
      type: "integer",
      format: "int64",
    },
    "ns:TrxLevelType": {
      type: "string",
    },
    "ns:TrxSource": {
      type: "string",
    },
    "ns:TrxNumber": {
      type: "string",
    },
  },
};
