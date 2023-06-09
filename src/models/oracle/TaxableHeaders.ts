import { TaxableLinesWithDetailTaxLines } from "./TaxableLines";

export class TaxableHeader {
  'ns:ApplicationId'?: number;
  'ns:ApplicationShortname'?: string;
  'ns:BatchName'?: string;
  'ns:BatchSourceName'?: string;
  'ns:CtrlHdrTxApplFlag'?: string;
  'ns:CtrlTotalHdrTxAmt'?: number;
  'ns:CurrencyConversionDate'?: string;
  'ns:CurrencyConversionRate'?: number;
  'ns:CurrencyConversionType'?: string;
  'ns:DefaultTaxationCountry'?: string;
  'ns:DocEventStatus'?: string;
  'ns:DocSeqName'?: string;
  'ns:DocSeqValue'?: string;
  'ns:DocumentSubType'?: string;
  'ns:DocumentType'?: string;
  'ns:EntityCode'?: string;
  'ns:EventClassCode'?:string;
  'ns:EstablishmentId'?: number;
  'ns:EstablishmentNumber'?: string;
  'ns:EventClassMappingId'?: number;
  'ns:EventTypeCode'?:string;
  'ns:EndPointUrl'?: string;
  'ns:FirstPtyOrgId'?: number;
  'ns:FirstPtyRegId'?: number;
  'ns:FirstPtyRegNumber'?: string;
  'ns:GlDate'?: string;
  'ns:HdrTrxUserKey1'?: string; 
  'ns:HdrTrxUserKey2'?: string;
  'ns:HdrTrxUserKey3'?: string;
  'ns:HdrTrxUserKey4'?: string;
  'ns:HdrTrxUserKey5'?: string;
  'ns:HdrTrxUserKey6'?: string;
  'ns:HistoricalFlag'?: string;
  'ns:HqEstbPartyTaxProfId'?: number;
  'ns:InternalOrgLocationId'?: number;
  'ns:InternalOrganizationId'?: number;
  'ns:LedgerId'?: number;
  'ns:LegalEntityId'?: number;
  'ns:LegalEntityNumber'?: string;
  'ns:LogLevel'?: string;
  'ns:PaymentMethod'?:string;
  'ns:ReceivablesTrxTypeSeqId'?: number;
  'ns:TaxInvoiceDate'?: string;
  'ns:ShipFromSiteRegNumber'?: string;
  'ns:TaxInvoiceNumber'?: string;
  'ns:ThirdPtyRegId'?: number;
  'ns:ThirdPtyRegNumber'?: string;
  'ns:TrxCurrencyCode'?: string;
  'ns:TrxDate'?: string;
  'ns:TrxDescription'?: string;
  'ns:TrxDocRevision'?: string;
  'ns:TrxDueDate'?: string;
  'ns:TrxHeaderAmt'?: number;
  'ns:TrxId'?: number;
  'ns:TrxLevelType'?: string;
  'ns:TrxSource'?: string;
  'ns:TrxNumber'?: string;
};

export class TaxableHeaderWithLines extends TaxableHeader {
  taxableLines?: Array<TaxableLinesWithDetailTaxLines>
}
