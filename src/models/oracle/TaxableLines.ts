import { DetailTaxLine } from "./DetailTaxLines";

export class TaxableLine {
  'ns:AccountCcid': number; 
  'ns: ApplicationId': number; 
  'ns: AccountString': string; 
  'ns:AccrueOnReceiptFlag': string; 
  'ns:AdjustedDocApplicationId': number;
  'ns:AdjustedDocDate': string;
  'ns:AdjustedDocEntityCode': string;
  'ns:AdjustedDocEventClassCode': string;
  'ns:AdjustedDocLineId': number;
  'ns:AdjustedDocNumber': string;
  'ns:AdjustedDocTrxId': number;
  'ns:AdjustedDocTrxLevelType': string;
  'ns:ApplicationDocStatus': string;
  'ns:AppliedFromApplicationId': number;
  'ns:AppliedFromEntityCode': string;
  'ns:AppliedFromEventClassCode': string;
  'ns:AppliedFromLineId': number;
  'ns:AppliedFromTrxId': number;
  'ns:AppliedFromTrxLevelType': string;
  'ns:AppliedFromTrxNumber': string;
  'ns:AppliedToApplicationId': number;
  'ns:AppliedToEntityCode': string;
  'ns:AppliedToEventClassCode': string;
  'ns:AppliedToTrxId': number;
  'ns:AppliedToTrxLevelType': string;
  'ns:AppliedToTrxLineId': number;
  'ns:AppliedToTrxNumber': string;
  'ns:AssessableValue': number;
  'ns:AssetFlag': string;
  'ns:BillFromGeographyType1': string;
  'ns:BillFromGeographyType10': string;
  'ns:BillFromGeographyType2': string;
  'ns:BillFromGeographyType3': string;
  'ns:BillFromGeographyType4': string;
  'ns:BillFromGeographyType5': string;
  'ns:BillFromGeographyType6': string;
  'ns:BillFromGeographyType7': string;
  'ns:BillFromGeographyType8': string;
  'ns:BillFromGeographyType9': string;
  'ns:BillFromGeographyValue1': string;
  'ns:BillFromGeographyValue10': string;
  'ns:BillFromGeographyValue2': string;
  'ns:BillFromGeographyValue3': string;
  'ns:BillFromGeographyValue4': string;
  'ns:BillFromGeographyValue5': string;
  'ns:BillFromGeographyValue6': string;
  'ns:BillFromGeographyValue7': string;
  'ns:BillFromGeographyValue8': string;
  'ns:BillFromGeographyValue9': string;
  'ns:BillFromLocationId': number;
  'ns:BillFromPartyName': string;
  'ns:BillFromPartyNumber': string;
  'ns:BillThirdPtyAcctId': number;
  'ns:BillThirdPtyAcctSiteId': number;
  'ns:BillToGeographyType1': string;
  'ns:BillToGeographyType10': string;
  'ns:BillToGeographyType2': string;
  'ns:BillToGeographyType3': string;
  'ns:BillToGeographyType4': string;
  'ns:BillToGeographyType5': string;
  'ns:BillToGeographyType6': string;
  'ns:BillToGeographyType7': string;
  'ns:BillToGeographyType8': string;
  'ns:BillToGeographyType9': string;
  'ns:BillToGeographyValue1': string;
  'ns:BillToGeographyValue10': string;
  'ns:BillToGeographyValue2': string;
  'ns:BillToGeographyValue3': string;
  'ns:BillToGeographyValue4': string;
  'ns:BillToGeographyValue5': string;
  'ns:BillToGeographyValue6': string;
  'ns:BillToGeographyValue7': string;
  'ns:BillToGeographyValue8': string;
  'ns:BillToGeographyValue9': string;
  'ns:BillToLocationId': number;
  'ns:BillToPartyName': string;
  'ns:BillToPartyNumber': string;
  'ns:BillToSiteRegNumber': string;
  'ns:CashDiscount': number;
  'ns:ConsignItmUponRecptFlag': string;
  'ns:ConsignedFlag': string;
  'ns:CountryOfOriginCode': string;
  'ns:CreditAccountCcid': number;
  'ns:CreditMemoReasonCode':  string;
  'ns:CtrlTotalLineTxAmt': number;
  'ns:CustomerName': string;
  'ns:DebitAccountCcid': number;
  'ns:DeliveryType': string;
  'ns:DestinationTypeCode': string;
  'ns:DropShipFlag': string;
  'ns:DropshipTypeId': number;
  'ns:EntityCode': string;
  'ns:EventClassCode': string;
  'ns:ExemptCertificateNumber': string;
  'ns:ExemptReason': string;
  'ns:ExemptReasonCode': string;
  'ns:ExemptionControlFlag': string;
  'ns:ExpenditureType': string;
  'ns:ExpenditureTypeId': number;
  'ns:FinalDischargeLocationId': number;
  'ns:FinalTransactionNodeFlag': string;
  'ns:FobPoint': string;
  'ns:FosTransactionId': number;
  'ns:InputTaxClassificationCode': string;
  'ns:InsuranceCharge': number;
  'ns:LineAmt': number;
  'ns:LineAmtIncludesTaxFlag': string;
  'ns:LineClass': string;
  'ns:LineGroupId': number;
  'ns:LineGroupNumber': string;
  'ns:LineIntendedUse': string;
  'ns:LineLevelAction': string;
  'ns:LineTrxUserKey1': string;
  'ns:LineTrxUserKey2': string;
  'ns:LineTrxUserKey3': string;
  'ns:LineTrxUserKey4': string;
  'ns:LineTrxUserKey5': string;
  'ns:LineTrxUserKey6': string;
  'ns:LinesDetFactorId': number;
  'ns:MatchType': string;
  'ns:MerchantPartyCountry': string;
  'ns:MerchantPartyDocumentNumber': string;
  'ns:MerchantPartyId': number;
  'ns:MerchantPartyName': string;
  'ns:MerchantPartyReference': string;
  'ns:MerchantPartyTaxRegNumber': string;
  'ns:MerchantPartyTaxpayerId': string;
  'ns:MinimumAccountableUnit': number;
  'ns:MemoLineName': string;
  'ns:OtherCharge': number;
  'ns:OtherInclusiveTaxAmount': number;
  'ns:OutputTaxClassificationCode': string;
  'ns:OwnHqLocationId': number;
  'ns:PackingCharge': number;
  'ns:PayingLocationId': number;
  'ns:PoaGeographyType1': string;
  'ns:PoaGeographyType10': string;
  'ns:PoaGeographyType2': string;
  'ns:PoaGeographyType3': string;
  'ns:PoaGeographyType4': string;
  'ns:PoaGeographyType5': string;
  'ns:PoaGeographyType6': string;
  'ns:PoaGeographyType7': string;
  'ns:PoaGeographyType8': string;
  'ns:PoaGeographyType9': string;
  'ns:PoaGeographyValue1': string;
  'ns:PoaGeographyValue10': string;
  'ns:PoaGeographyValue2': string;
  'ns:PoaGeographyValue3': string;
  'ns:PoaGeographyValue4': string;
  'ns:PoaGeographyValue5': string;
  'ns:PoaGeographyValue6': string;
  'ns:PoaGeographyValue7': string;
  'ns:PoaGeographyValue8': string;
  'ns:PoaGeographyValue9': string;
  'ns:PoaLocationId': number;
  'ns:PoaPartyName':string; 
  'ns:PoaPartyNumber': string;
  'ns:PocLocationId': number;
  'ns:PodLocationId': number;
  'ns:PoiLocationId': number;
  'ns:PooGeographyType1': string;
  'ns:PooGeographyType10': string;
  'ns:PooGeographyType2': string;
  'ns:PooGeographyType3': string;
  'ns:PooGeographyType4': string;
  'ns:PooGeographyType5': string;
  'ns:PooGeographyType6': string;
  'ns:PooGeographyType7': string;
  'ns:PooGeographyType8': string;
  'ns:PooGeographyType9': string;
  'ns:PooGeographyValue1': string;
  'ns:PooGeographyValue10': string;
  'ns:PooGeographyValue2': string;
  'ns:PooGeographyValue3': string;
  'ns:PooGeographyValue4': string;
  'ns:PooGeographyValue5': string;
  'ns:PooGeographyValue6': string;
  'ns:PooGeographyValue7': string;
  'ns:PooGeographyValue8': string;
  'ns:PooGeographyValue9': string;
  'ns:PooLocationId': number;
  'ns:PooPartyName': string;
  'ns:PooPartyNumber': string;
  'ns:Precision': number;
  'ns:ProductCategory': string;
  'ns:ProductCode': string;
  'ns:ProductDescription':string;
  'ns:ProductFiscClassification': string;
  'ns:ProductId': number;
  'ns:ProductOrgId': number;
  'ns:ProductType': string;
  'ns:ProvnlTaxDeterminationDate': string;
  'ns:PseudoTrxLineFlag': string;
  'ns:PurchaseBasis': string;
  'ns:PurchasingCategoryId': number;
  'ns:ProrateAcrossAllLinesFlag': string;
  'ns:QuoteFlag': string;
  'ns:ReceiptSourceCode': string;
  'ns:RefDocApplicationId': number;
  'ns:RefDocEntityCode': string;
  'ns:RefDocEventClassCode': string;
  'ns:RefDocLineId': number;
  'ns:RefDocLineQuantity': number;
  'ns:RefDocTrxId': number;
  'ns:RefDocTrxLevelType': string;
  'ns:RelatedDocApplicationId': number;
  'ns:RelatedDocDate': string;
  'ns:RelatedDocEntityCode': string;
  'ns:RelatedDocEventClassCode': string;
  'ns:RelatedDocNumber': string;
  'ns:RelatedDocTrxId': number;
  'ns:RequisitionType': string;
  'ns:ShipFromGeographyType1':string;
  'ns:ShipFromGeographyType10': string;
  'ns:ShipFromGeographyType2': string;
  'ns:ShipFromGeographyType3': string;
  'ns:ShipFromGeographyType4': string;
  'ns:ShipFromGeographyType5': string;
  'ns:ShipFromGeographyType6': string;
  'ns:ShipFromGeographyType7': string;
  'ns:ShipFromGeographyType8': string;
  'ns:ShipFromGeographyType9': string;
  'ns:ShipFromGeographyValue1': string;
  'ns:ShipFromGeographyValue10': string;
  'ns:ShipFromGeographyValue2': string;
  'ns:ShipFromGeographyValue3': string;
  'ns:ShipFromGeographyValue4': string;
  'ns:ShipFromGeographyValue5': string;
  'ns:ShipFromGeographyValue6': string;
  'ns:ShipFromGeographyValue7': string;
  'ns:ShipFromGeographyValue8': string;
  'ns:ShipFromGeographyValue9': string;
  'ns:ShipFromLocationId': number;
  'ns:ShipFromPartyName': string;
  'ns:ShipFromPartyNumber': string;
  'ns:ShipThirdPtyAcctId': number;
  'ns:ShipThirdPtyAcctSiteId': number;
  'ns:ShipToGeographyType1': string;
  'ns:ShipToGeographyType10': string;
  'ns:ShipToGeographyType2': string;
  'ns:ShipToGeographyType3':  string;
  'ns:ShipToGeographyType4': string;
  'ns:ShipToGeographyType5': string;
  'ns:ShipToGeographyType6':string;
  'ns:ShipToGeographyType7': string;
  'ns:ShipToGeographyType8': string;
  'ns:ShipToGeographyType9': string;
  'ns:ShipToGeographyValue1': string;
  'ns:ShipToGeographyValue10': string;
  'ns:ShipToGeographyValue2': string;
  'ns:ShipToGeographyValue3': string;
  'ns:ShipToGeographyValue4': string;
  'ns:ShipToGeographyValue5': string;
  'ns:ShipToGeographyValue6': string;
  'ns:ShipToGeographyValue7': string;
  'ns:ShipToGeographyValue8': string;
  'ns:ShipToGeographyValue9': string;
  'ns:FinalDischargeGeographyType1': string;
  'ns:FinalDischargeGeographyType10': string;
  'ns:FinalDischargeGeographyType2': string;
  'ns:FinalDischargeGeographyType3': string;
  'ns:FinalDischargeGeographyType4': string;
  'ns:FinalDischargeGeographyType5': string;
  'ns:FinalDischargeGeographyType6': string;
  'ns:FinalDischargeGeographyType7': string;
  'ns:FinalDischargeGeographyType8': string;
  'ns:FinalDischargeGeographyType9': string;
  'ns:FinalDischargeGeographyValue1': string;
  'ns:FinalDischargeGeographyValue10': string;
  'ns:FinalDischargeGeographyValue2': string;
  'ns:FinalDischargeGeographyValue3': string;
  'ns:FinalDischargeGeographyValue4': string;
  'ns:FinalDischargeGeographyValue5': string;
  'ns:FinalDischargeGeographyValue6': string;
  'ns:FinalDischargeGeographyValue7': string;
  'ns:FinalDischargeGeographyValue8': string;
  'ns:FinalDischargeGeographyValue9': string;
  'ns:ShipToLocationId': number;
  'ns:ShipToPartyName': string;
  'ns:ShipToPartyNumber': string;
  'ns:ShipmentType': string;
  'ns:SourceApplicationId': number;
  'ns:SourceEntityCode': string;
  'ns:SourceEventClassCode': string;
  'ns:SourceLineId': number;
  'ns:SourceTaxLineId': number;
  'ns:SourceTrxId': number;
  'ns:SourceTrxLevelType': string;
  'ns:StartExpenseDate': string;
  'ns:SupplierExchangeRate': number;
  'ns:SupplierTaxInvoiceDate': string;
  'ns:SupplierTaxInvoiceNumber': string;
  'ns:ShipToSiteRegNumber': string;
  'ns:TaxCalcModeFlag': string;
  'ns:TaxProcessingCompletedFlag': string;
  'ns:TaxReportingFlag': string;
  'ns:TitleTransferLocationId': number;
  'ns:TradingDiscount': number;
  'ns:TradingHqLocationId': number;
  'ns:TransferCharge': number;
  'ns:TransportationCharge': number;
  'ns:TrxBusinessCategory': string;
  'ns:TrxCommunicatedDate': string;
  'ns:TrxId': number;
  'ns:TrxLineCurrencyCode': string;
  'ns:TrxLineCurrencyConvDate': string;
  'ns:TrxLineCurrencyConvRate': number;
  'ns:TrxLineCurrencyConvType': string;
  'ns:TrxLineDate': string;
  'ns:TrxLineDescription': string;
  'ns:TrxLineGlDate': string;
  'ns:TrxLineId': number;
  'ns:TrxLineMau': number;
  'ns:TrxLineNumber': number;
  'ns:TrxLinePrecision': number;
  'ns:TrxLineQuantity': number;
  'ns:TrxLineType': string;
  'ns:TrxLevelType': string;
  'ns:TrxReceiptDate': string;
  'ns:TrxShippingDate': string;
  'ns:TrxSicCode': string;
  'ns:TrxTypeDescription': string;
  'ns:TrxWaybillNumber': string;
  'ns:UnitPrice': number;
  'ns:UomCode': string;
  'ns:UserDefinedFiscClass': string;
  'ns:VolumeDiscount': number;

}

export class TaxableLinesWithDetailTaxLines extends TaxableLine {
  detailTaxLines?: Array<DetailTaxLine>; 
}

