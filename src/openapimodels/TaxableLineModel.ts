import { SdkOpenApiSchemaProperty } from '@appknit-project/appknit-platform-sdk-v2';

export const TaxableLineModel: SdkOpenApiSchemaProperty = {
  description: 'TaxableLineModel',
  type: 'object',
  properties: {
    'ns:AccountCcid': {
      type: 'integer',
      format: 'int64',
    },
    'ns:ApplicationId': {
      type: 'integer',
      format: 'int64',
    },
    'ns:AccountString': {
      type: 'string',
    },
    'ns:AccrueOnReceiptFlag': {
      type: 'string',
    },
    'ns:AdjustedDocApplicationId': {
      type: 'integer',
      format: 'int64',
    },
    'ns:AdjustedDocDate': {
      type: 'string',
      format: 'date',
    },
    'ns:AdjustedDocEntityCode': {
      type: 'string',
    },
    'ns:AdjustedDocEventClassCode': {
      type: 'string',
    },
    'ns:AdjustedDocLineId': {
      type: 'integer',
      format: 'int64',
    },
    'ns:AdjustedDocNumber': {
      type: 'string',
    },
    'ns:AdjustedDocTrxId': {
      type: 'integer',
      format: 'int64',
    },
    'ns:AdjustedDocTrxLevelType': {
      type: 'string',
    },
    'ns:ApplicationDocStatus': {
      type: 'string',
    },
    'ns:AppliedFromApplicationId': {
      type: 'integer',
      format: 'int64',
    },
    'ns:AppliedFromEntityCode': {
      type: 'string',
    },
    'ns:AppliedFromEventClassCode': {
      type: 'string',
    },
    'ns:AppliedFromLineId': {
      type: 'integer',
      format: 'int64',
    },
    'ns:AppliedFromTrxId': {
      type: 'integer',
      format: 'int64',
    },
    'ns:AppliedFromTrxLevelType': {
      type: 'string',
    },
    'ns:AppliedFromTrxNumber': {
      type: 'string',
    },
    'ns:AppliedToApplicationId': {
      type: 'integer',
      format: 'int64',
    },
    'ns:AppliedToEntityCode': {
      type: 'string',
    },
    'ns:AppliedToEventClassCode': {
      type: 'string',
    },
    'ns:AppliedToTrxId': {
      type: 'integer',
      format: 'int64',
    },
    'ns:AppliedToTrxLevelType': {
      type: 'string',
    },
    'ns:AppliedToTrxLineId': {
      type: 'integer',
      format: 'int64',
    },
    'ns:AppliedToTrxNumber': {
      type: 'string',
    },
    'ns:AssessableValue': {
      type: 'integer',
      format: 'double',
    },
    'ns:AssetFlag': {
      type: 'string',
    },
    'ns:BillFromGeographyType1': {
      type: 'string',
    },
    'ns:BillFromGeographyType10': {
      type: 'string',
    },
    'ns:BillFromGeographyType2': {
      type: 'string',
    },
    'ns:BillFromGeographyType3': {
      type: 'string',
    },
    'ns:BillFromGeographyType4': {
      type: 'string',
    },
    'ns:BillFromGeographyType5': {
      type: 'string',
    },
    'ns:BillFromGeographyType6': {
      type: 'string',
    },
    'ns:BillFromGeographyType7': {
      type: 'string',
    },
    'ns:BillFromGeographyType8': {
      type: 'string',
    },
    'ns:BillFromGeographyType9': {
      type: 'string',
    },
    'ns:BillFromGeographyValue1': {
      type: 'string',
    },
    'ns:BillFromGeographyValue10': {
      type: 'string',
    },
    'ns:BillFromGeographyValue2': {
      type: 'string',
    },
    'ns:BillFromGeographyValue3': {
      type: 'string',
    },
    'ns:BillFromGeographyValue4': {
      type: 'string',
    },
    'ns:BillFromGeographyValue5': {
      type: 'string',
    },
    'ns:BillFromGeographyValue6': {
      type: 'string',
    },
    'ns:BillFromGeographyValue7': {
      type: 'string',
    },
    'ns:BillFromGeographyValue8': {
      type: 'string',
    },
    'ns:BillFromGeographyValue9': {
      type: 'string',
    },
    'ns:BillFromLocationId': {
      type: 'integer',
      format: 'int64',
    },
    'ns:BillFromPartyName': {
      type: 'string',
    },
    'ns:BillFromPartyNumber': {
      type: 'string',
    },
    'ns:BillThirdPtyAcctId': {
      type: 'integer',
      format: 'int64',
    },
    'ns:BillThirdPtyAcctSiteId': {
      type: 'integer',
      format: 'int64',
    },
    'ns:BillToGeographyType1': {
      type: 'string',
    },
    'ns:BillToGeographyType10': {
      type: 'string',
    },
    'ns:BillToGeographyType2': {
      type: 'string',
    },
    'ns:BillToGeographyType3': {
      type: 'string',
    },
    'ns:BillToGeographyType4': {
      type: 'string',
    },
    'ns:BillToGeographyType5': {
      type: 'string',
    },
    'ns:BillToGeographyType6': {
      type: 'string',
    },
    'ns:BillToGeographyType7': {
      type: 'string',
    },
    'ns:BillToGeographyType8': {
      type: 'string',
    },
    'ns:BillToGeographyType9': {
      type: 'string',
    },
    'ns:BillToGeographyValue1': {
      type: 'string',
    },
    'ns:BillToGeographyValue10': {
      type: 'string',
    },
    'ns:BillToGeographyValue2': {
      type: 'string',
    },
    'ns:BillToGeographyValue3': {
      type: 'string',
    },
    'ns:BillToGeographyValue4': {
      type: 'string',
    },
    'ns:BillToGeographyValue5': {
      type: 'string',
    },
    'ns:BillToGeographyValue6': {
      type: 'string',
    },
    'ns:BillToGeographyValue7': {
      type: 'string',
    },
    'ns:BillToGeographyValue8': {
      type: 'string',
    },
    'ns:BillToGeographyValue9': {
      type: 'string',
    },
    'ns:BillToLocationId': {
      type: 'integer',
      format: 'int64',
    },
    'ns:BillToPartyName': {
      type: 'string',
    },
    'ns:BillToPartyNumber': {
      type: 'string',
    },
    'ns:BillToSiteRegNumber': {
      type: 'string',
    },
    'ns:CashDiscount': {
      type: 'integer',
      format: 'double',
    },
    'ns:ConsignItmUponRecptFlag': {
      type: 'string',
    },
    'ns:ConsignedFlag': {
      type: 'string',
    },
    'ns:CountryOfOriginCode': {
      type: 'string',
    },
    'ns:CreditAccountCcid': {
      type: 'integer',
      format: 'int64',
    },
    'ns:CreditMemoReasonCode': {
      type: 'string',
    },
    'ns:CtrlTotalLineTxAmt': {
      type: 'integer',
      format: 'double',
    },
    'ns:CustomerName': {
      type: 'string',
    },
    'ns:DebitAccountCcid': {
      type: 'integer',
      format: 'int64',
    },
    'ns:DeliveryType': {
      type: 'string',
    },
    'ns:DestinationTypeCode': {
      type: 'string',
    },
    'ns:DropShipFlag': {
      type: 'string',
    },
    'ns:DropshipTypeId': {
      type: 'integer',
      format: 'int64',
    },
    'ns:EntityCode': {
      type: 'string',
    },
    'ns:EventClassCode': {
      type: 'string',
    },
    'ns:ExemptCertificateNumber': {
      type: 'string',
    },
    'ns:ExemptReason': {
      type: 'string',
    },
    'ns:ExemptReasonCode': {
      type: 'string',
    },
    'ns:ExemptionControlFlag': {
      type: 'string',
    },
    'ns:ExpenditureType': {
      type: 'string',
    },
    'ns:ExpenditureTypeId': {
      type: 'integer',
      format: 'int64',
    },
    'ns:FinalDischargeLocationId': {
      type: 'integer',
      format: 'int64',
    },
    'ns:FinalTransactionNodeFlag': {
      type: 'string',
    },
    'ns:FobPoint': {
      type: 'string',
    },
    'ns:FosTransactionId': {
      type: 'integer',
      format: 'int64',
    },
    'ns:InputTaxClassificationCode': {
      type: 'string',
    },
    'ns:InsuranceCharge': {
      type: 'integer',
      format: 'double',
    },
    'ns:LineAmt': {
      type: 'integer',
      format: 'double',
    },
    'ns:LineAmtIncludesTaxFlag': {
      type: 'string',
    },
    'ns:LineClass': {
      type: 'string',
    },
    'ns:LineGroupId': {
      type: 'integer',
      format: 'int64',
    },
    'ns:LineGroupNumber': {
      type: 'string',
    },
    'ns:LineIntendedUse': {
      type: 'string',
    },
    'ns:LineLevelAction': {
      type: 'string',
    },
    'ns:LineTrxUserKey1': {
      type: 'string',
    },
    'ns:LineTrxUserKey2': {
      type: 'string',
    },
    'ns:LineTrxUserKey3': {
      type: 'string',
    },
    'ns:LineTrxUserKey4': {
      type: 'string',
    },
    'ns:LineTrxUserKey5': {
      type: 'string',
    },
    'ns:LineTrxUserKey6': {
      type: 'string',
    },
    'ns:LinesDetFactorId': {
      type: 'integer',
      format: 'int64',
    },
    'ns:MatchType': {
      type: 'string',
    },
    'ns:MerchantPartyCountry': {
      type: 'string',
    },
    'ns:MerchantPartyDocumentNumber': {
      type: 'string',
    },
    'ns:MerchantPartyId': {
      type: 'integer',
      format: 'int64',
    },
    'ns:MerchantPartyName': {
      type: 'string',
    },
    'ns:MerchantPartyReference': {
      type: 'string',
    },
    'ns:MerchantPartyTaxRegNumber': {
      type: 'string',
    },
    'ns:MerchantPartyTaxpayerId': {
      type: 'string',
    },
    'ns:MinimumAccountableUnit': {
      type: 'integer',
      format: 'double',
    },
    'ns:MemoLineName': {
      type: 'string',
    },
    'ns:OtherCharge': {
      type: 'integer',
      format: 'double',
    },
    'ns:OtherInclusiveTaxAmount': {
      type: 'integer',
      format: 'double',
    },
    'ns:OutputTaxClassificationCode': {
      type: 'string',
    },
    'ns:OwnHqLocationId': {
      type: 'integer',
      format: 'int64',
    },
    'ns:PackingCharge': {
      type: 'integer',
      format: 'double',
    },
    'ns:PayingLocationId': {
      type: 'integer',
      format: 'int64',
    },
    'ns:PoaGeographyType1': {
      type: 'string',
    },
    'ns:PoaGeographyType10': {
      type: 'string',
    },
    'ns:PoaGeographyType2': {
      type: 'string',
    },
    'ns:PoaGeographyType3': {
      type: 'string',
    },
    'ns:PoaGeographyType4': {
      type: 'string',
    },
    'ns:PoaGeographyType5': {
      type: 'string',
    },
    'ns:PoaGeographyType6': {
      type: 'string',
    },
    'ns:PoaGeographyType7': {
      type: 'string',
    },
    'ns:PoaGeographyType8': {
      type: 'string',
    },
    'ns:PoaGeographyType9': {
      type: 'string',
    },
    'ns:PoaGeographyValue1': {
      type: 'string',
    },
    'ns:PoaGeographyValue10': {
      type: 'string',
    },
    'ns:PoaGeographyValue2': {
      type: 'string',
    },
    'ns:PoaGeographyValue3': {
      type: 'string',
    },
    'ns:PoaGeographyValue4': {
      type: 'string',
    },
    'ns:PoaGeographyValue5': {
      type: 'string',
    },
    'ns:PoaGeographyValue6': {
      type: 'string',
    },
    'ns:PoaGeographyValue7': {
      type: 'string',
    },
    'ns:PoaGeographyValue8': {
      type: 'string',
    },
    'ns:PoaGeographyValue9': {
      type: 'string',
    },
    'ns:PoaLocationId': {
      type: 'integer',
      format: 'int64',
    },
    'ns:PoaPartyName': {
      type: 'string',
    },
    'ns:PoaPartyNumber': {
      type: 'string',
    },
    'ns:PocLocationId': {
      type: 'integer',
      format: 'int64',
    },
    'ns:PodLocationId': {
      type: 'integer',
      format: 'int64',
    },
    'ns:PoiLocationId': {
      type: 'integer',
      format: 'int64',
    },
    'ns:PooGeographyType1': {
      type: 'string',
    },
    'ns:PooGeographyType10': {
      type: 'string',
    },
    'ns:PooGeographyType2': {
      type: 'string',
    },
    'ns:PooGeographyType3': {
      type: 'string',
    },
    'ns:PooGeographyType4': {
      type: 'string',
    },
    'ns:PooGeographyType5': {
      type: 'string',
    },
    'ns:PooGeographyType6': {
      type: 'string',
    },
    'ns:PooGeographyType7': {
      type: 'string',
    },
    'ns:PooGeographyType8': {
      type: 'string',
    },
    'ns:PooGeographyType9': {
      type: 'string',
    },
    'ns:PooGeographyValue1': {
      type: 'string',
    },
    'ns:PooGeographyValue10': {
      type: 'string',
    },
    'ns:PooGeographyValue2': {
      type: 'string',
    },
    'ns:PooGeographyValue3': {
      type: 'string',
    },
    'ns:PooGeographyValue4': {
      type: 'string',
    },
    'ns:PooGeographyValue5': {
      type: 'string',
    },
    'ns:PooGeographyValue6': {
      type: 'string',
    },
    'ns:PooGeographyValue7': {
      type: 'string',
    },
    'ns:PooGeographyValue8': {
      type: 'string',
    },
    'ns:PooGeographyValue9': {
      type: 'string',
    },
    'ns:PooLocationId': {
      type: 'integer',
      format: 'int64',
    },
    'ns:PooPartyName': {
      type: 'string',
    },
    'ns:PooPartyNumber': {
      type: 'string',
    },
    'ns:Precision': {
      type: 'integer',
      format: 'int32',
    },
    'ns:ProductCategory': {
      type: 'string',
    },
    'ns:ProductCode': {
      type: 'string',
    },
    'ns:ProductDescription': {
      type: 'string',
    },
    'ns:ProductFiscClassification': {
      type: 'string',
    },
    'ns:ProductId': {
      type: 'integer',
      format: 'int64',
    },
    'ns:ProductOrgId': {
      type: 'integer',
      format: 'int64',
    },
    'ns:ProductType': {
      type: 'string',
    },
    'ns:ProvnlTaxDeterminationDate': {
      type: 'string',
      format: 'date',
    },
    'ns:PseudoTrxLineFlag': {
      type: 'string',
    },
    'ns:PurchaseBasis': {
      type: 'string',
    },
    'ns:PurchasingCategoryId': {
      type: 'integer',
      format: 'int64',
    },
    'ns:ProrateAcrossAllLinesFlag': {
      type: 'string',
    },
    'ns:QuoteFlag': {
      type: 'string',
    },
    'ns:ReceiptSourceCode': {
      type: 'string',
    },
    'ns:RefDocApplicationId': {
      type: 'integer',
      format: 'int32',
    },
    'ns:RefDocEntityCode': {
      type: 'string',
    },
    'ns:RefDocEventClassCode': {
      type: 'string',
    },
    'ns:RefDocLineId': {
      type: 'integer',
      format: 'int64',
    },
    'ns:RefDocLineQuantity': {
      type: 'integer',
      format: 'int32',
    },
    'ns:RefDocTrxId': {
      type: 'integer',
      format: 'int64',
    },
    'ns:RefDocTrxLevelType': {
      type: 'string',
    },
    'ns:RelatedDocApplicationId': {
      type: 'integer',
      format: 'int64',
    },
    'ns:RelatedDocDate': {
      type: 'string',
      format: 'date',
    },
    'ns:RelatedDocEntityCode': {
      type: 'string',
    },
    'ns:RelatedDocEventClassCode': {
      type: 'string',
    },
    'ns:RelatedDocNumber': {
      type: 'string',
    },
    'ns:RelatedDocTrxId': {
      type: 'integer',
      format: 'int64',
    },
    'ns:RequisitionType': {
      type: 'string',
    },
    'ns:ShipFromGeographyType1': {
      type: 'string',
    },
    'ns:ShipFromGeographyType10': {
      type: 'string',
    },
    'ns:ShipFromGeographyType2': {
      type: 'string',
    },
    'ns:ShipFromGeographyType3': {
      type: 'string',
    },
    'ns:ShipFromGeographyType4': {
      type: 'string',
    },
    'ns:ShipFromGeographyType5': {
      type: 'string',
    },
    'ns:ShipFromGeographyType6': {
      type: 'string',
    },
    'ns:ShipFromGeographyType7': {
      type: 'string',
    },
    'ns:ShipFromGeographyType8': {
      type: 'string',
    },
    'ns:ShipFromGeographyType9': {
      type: 'string',
    },
    'ns:ShipFromGeographyValue1': {
      type: 'string',
    },
    'ns:ShipFromGeographyValue10': {
      type: 'string',
    },
    'ns:ShipFromGeographyValue2': {
      type: 'string',
    },
    'ns:ShipFromGeographyValue3': {
      type: 'string',
    },
    'ns:ShipFromGeographyValue4': {
      type: 'string',
    },
    'ns:ShipFromGeographyValue5': {
      type: 'string',
    },
    'ns:ShipFromGeographyValue6': {
      type: 'string',
    },
    'ns:ShipFromGeographyValue7': {
      type: 'string',
    },
    'ns:ShipFromGeographyValue8': {
      type: 'string',
    },
    'ns:ShipFromGeographyValue9': {
      type: 'string',
    },
    'ns:ShipFromLocationId': {
      type: 'integer',
      format: 'int64',
    },
    'ns:ShipFromPartyName': {
      type: 'string',
    },
    'ns:ShipFromPartyNumber': {
      type: 'string',
    },
    'ns:ShipThirdPtyAcctId': {
      type: 'integer',
      format: 'int64',
    },
    'ns:ShipThirdPtyAcctSiteId': {
      type: 'integer',
      format: 'int64',
    },
    'ns:ShipToGeographyType1': {
      type: 'string',
    },
    'ns:ShipToGeographyType10': {
      type: 'string',
    },
    'ns:ShipToGeographyType2': {
      type: 'string',
    },
    'ns:ShipToGeographyType3': {
      type: 'string',
    },
    'ns:ShipToGeographyType4': {
      type: 'string',
    },
    'ns:ShipToGeographyType5': {
      type: 'string',
    },
    'ns:ShipToGeographyType6': {
      type: 'string',
    },
    'ns:ShipToGeographyType7': {
      type: 'string',
    },
    'ns:ShipToGeographyType8': {
      type: 'string',
    },
    'ns:ShipToGeographyType9': {
      type: 'string',
    },
    'ns:ShipToGeographyValue1': {
      type: 'string',
    },
    'ns:ShipToGeographyValue10': {
      type: 'string',
    },
    'ns:ShipToGeographyValue2': {
      type: 'string',
    },
    'ns:ShipToGeographyValue3': {
      type: 'string',
    },
    'ns:ShipToGeographyValue4': {
      type: 'string',
    },
    'ns:ShipToGeographyValue5': {
      type: 'string',
    },
    'ns:ShipToGeographyValue6': {
      type: 'string',
    },
    'ns:ShipToGeographyValue7': {
      type: 'string',
    },
    'ns:ShipToGeographyValue8': {
      type: 'string',
    },
    'ns:ShipToGeographyValue9': {
      type: 'string',
    },
    'ns:FinalDischargeGeographyType1': {
      type: 'string',
    },
    'ns:FinalDischargeGeographyType10': {
      type: 'string',
    },
    'ns:FinalDischargeGeographyType2': {
      type: 'string',
    },
    'ns:FinalDischargeGeographyType3': {
      type: 'string',
    },
    'ns:FinalDischargeGeographyType4': {
      type: 'string',
    },
    'ns:FinalDischargeGeographyType5': {
      type: 'string',
    },
    'ns:FinalDischargeGeographyType6': {
      type: 'string',
    },
    'ns:FinalDischargeGeographyType7': {
      type: 'string',
    },
    'ns:FinalDischargeGeographyType8': {
      type: 'string',
    },
    'ns:FinalDischargeGeographyType9': {
      type: 'string',
    },
    'ns:FinalDischargeGeographyValue1': {
      type: 'string',
    },
    'ns:FinalDischargeGeographyValue10': {
      type: 'string',
    },
    'ns:FinalDischargeGeographyValue2': {
      type: 'string',
    },
    'ns:FinalDischargeGeographyValue3': {
      type: 'string',
    },
    'ns:FinalDischargeGeographyValue4': {
      type: 'string',
    },
    'ns:FinalDischargeGeographyValue5': {
      type: 'string',
    },
    'ns:FinalDischargeGeographyValue6': {
      type: 'string',
    },
    'ns:FinalDischargeGeographyValue7': {
      type: 'string',
    },
    'ns:FinalDischargeGeographyValue8': {
      type: 'string',
    },
    'ns:FinalDischargeGeographyValue9': {
      type: 'string',
    },
    'ns:ShipToLocationId': {
      type: 'integer',
      format: 'int64',
    },
    'ns:ShipToPartyName': {
      type: 'string',
    },
    'ns:ShipToPartyNumber': {
      type: 'string',
    },
    'ns:ShipmentType': {
      type: 'string',
    },
    'ns:SourceApplicationId': {
      type: 'integer',
      format: 'int32',
    },
    'ns:SourceEntityCode': {
      type: 'string',
    },
    'ns:SourceEventClassCode': {
      type: 'string',
    },
    'ns:SourceLineId': {
      type: 'integer',
      format: 'int64',
    },
    'ns:SourceTaxLineId': {
      type: 'integer',
      format: 'int64',
    },
    'ns:SourceTrxId': {
      type: 'integer',
      format: 'int64',
    },
    'ns:SourceTrxLevelType': {
      type: 'string',
    },
    'ns:StartExpenseDate': {
      type: 'string',
      format: 'date',
    },
    'ns:SupplierExchangeRate': {
      type: 'integer',
      format: 'double',
    },
    'ns:SupplierTaxInvoiceDate': {
      type: 'string',
      format: 'date',
    },
    'ns:SupplierTaxInvoiceNumber': {
      type: 'string',
    },
    'ns:ShipToSiteRegNumber': {
      type: 'string',
    },
    'ns:TaxCalcModeFlag': {
      type: 'string',
    },
    'ns:TaxProcessingCompletedFlag': {
      type: 'string',
    },
    'ns:TaxReportingFlag': {
      type: 'string',
    },
    'ns:TitleTransferLocationId': {
      type: 'integer',
      format: 'int64',
    },
    'ns:TradingDiscount': {
      type: 'integer',
      format: 'double',
    },
    'ns:TradingHqLocationId': {
      type: 'integer',
      format: 'int64',
    },
    'ns:TransferCharge': {
      type: 'integer',
      format: 'double',
    },
    'ns:TransportationCharge': {
      type: 'integer',
      format: 'double',
    },
    'ns:TrxBusinessCategory': {
      type: 'string',
    },
    'ns:TrxCommunicatedDate': {
      type: 'string',
      format: 'date',
    },
    'ns:TrxId': {
      type: 'integer',
      format: 'int64',
    },
    'ns:TrxLineCurrencyCode': {
      type: 'string',
    },
    'ns:TrxLineCurrencyConvDate': {
      type: 'string',
      format: 'date',
    },
    'ns:TrxLineCurrencyConvRate': {
      type: 'integer',
      format: 'double',
    },
    'ns:TrxLineCurrencyConvType': {
      type: 'string',
    },
    'ns:TrxLineDate': {
      type: 'string',
      format: 'date',
    },
    'ns:TrxLineDescription': {
      type: 'string',
    },
    'ns:TrxLineGlDate': {
      type: 'string',
      format: 'date',
    },
    'ns:TrxLineId': {
      type: 'integer',
      format: 'int64',
    },
    'ns:TrxLineMau': {
      type: 'integer',
      format: 'double',
    },
    'ns:TrxLineNumber': {
      type: 'integer',
      format: 'int32',
    },
    'ns:TrxLinePrecision': {
      type: 'integer',
      format: 'int32',
    },
    'ns:TrxLineQuantity': {
      type: 'integer',
      format: 'double',
    },
    'ns:TrxLineType': {
      type: 'string',
    },
    'ns:TrxLevelType': {
      type: 'string',
    },
    'ns:TrxReceiptDate': {
      type: 'string',
      format: 'date',
    },
    'ns:TrxShippingDate': {
      type: 'string',
      format: 'date',
    },
    'ns:TrxSicCode': {
      type: 'string',
    },
    'ns:TrxTypeDescription': {
      type: 'string',
    },
    'ns:TrxWaybillNumber': {
      type: 'string',
    },
    'ns:UnitPrice': {
      type: 'integer',
      format: 'double',
    },
    'ns:UomCode': {
      type: 'string',
    },
    'ns:UserDefinedFiscClass': {
      type: 'string',
    },
    'ns:VolumeDiscount': {
      type: 'integer',
      format: 'double',
    },
  },
};
