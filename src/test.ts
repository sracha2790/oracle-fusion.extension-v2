import { AppknitSDK, SdkExecutionError, SdkGenericErrorCodes } from '@appknit-project/appknit-platform-sdk-v2';
import extension from './index'
const input = {
    "avalaraTransaction": {
        "id": 85009687887965,
        "code": "1135050",
        "companyId": 884262,
        "date": "2022-06-15",
        "paymentDate": "1900-01-01",
        "status": "Committed",
        "type": "SalesInvoice",
        "batchCode": "",
        "currencyCode": "USD",
        "exchangeRateCurrencyCode": "USD",
        "customerUsageType": "",
        "entityUseCode": "",
        "customerVendorCode": "63009",
        "customerCode": "63009",
        "exemptNo": "",
        "reconciled": false,
        "locationCode": "",
        "reportingLocationCode": "",
        "purchaseOrderNo": "",
        "referenceCode": "",
        "salespersonCode": "",
        "taxOverrideType": "None",
        "taxOverrideAmount": 0,
        "taxOverrideReason": "",
        "totalAmount": 100,
        "totalExempt": 0,
        "totalDiscount": 0,
        "totalTax": 5.3,
        "totalTaxable": 100,
        "totalTaxCalculated": 5.3,
        "adjustmentReason": "Other",
        "adjustmentDescription": "Create or adjust transaction",
        "locked": false,
        "region": "VA",
        "country": "US",
        "version": 122,
        "softwareVersion": "22.8.2.0",
        "originAddressId": 0,
        "destinationAddressId": 0,
        "exchangeRateEffectiveDate": "2022-06-15",
        "exchangeRate": 1,
        "isSellerImporterOfRecord": false,
        "description": "",
        "businessIdentificationNo": "",
        "modifiedDate": "2022-09-18T19:40:54.7927242Z",
        "modifiedUserId": 34042,
        "taxDate": "2022-06-15",
        "lines": [
            {
                "id": 85009687887970,
                "transactionId": 85009687887965,
                "lineNumber": "1",
                "boundaryOverrideId": 0,
                "customerUsageType": "",
                "entityUseCode": "",
                "description": "HP Envy Printer 4520",
                "destinationAddressId": 85009687887966,
                "originAddressId": 85009687887967,
                "discountAmount": 0,
                "discountTypeId": 0,
                "exemptAmount": 0,
                "exemptCertId": 0,
                "exemptNo": "",
                "isItemTaxable": true,
                "isSSTP": false,
                "itemCode": "HPP4520",
                "lineAmount": 100,
                "quantity": 1,
                "ref1": "GOODS",
                "ref2": "COMPUTER|DESKTOP",
                "reportingDate": "2022-06-15",
                "revAccount": "SERPSOLS-00-410002-000-SERPSOLS-0-0-0-0-0",
                "sourcing": "Destination",
                "tax": 5.3,
                "taxableAmount": 100,
                "taxCalculated": 5.3,
                "taxCode": "PC070000",
                "taxCodeId": 10445,
                "taxDate": "2022-06-15",
                "taxEngine": "",
                "taxOverrideType": "None",
                "businessIdentificationNo": "",
                "taxOverrideAmount": 0,
                "taxOverrideReason": "",
                "taxIncluded": false,
                "originationDocumentId": "300000152343328",
                "details": [
                    {
                        "id": 85009687887977,
                        "transactionLineId": 85009687887970,
                        "transactionId": 85009687887965,
                        "addressId": 85009687887966,
                        "country": "US",
                        "region": "VA",
                        "countyFIPS": "",
                        "stateFIPS": "",
                        "exemptAmount": 0,
                        "exemptReasonId": 4,
                        "inState": false,
                        "jurisCode": "51",
                        "jurisName": "VIRGINIA",
                        "jurisdictionId": 60,
                        "signatureCode": "BTZU",
                        "stateAssignedNo": "",
                        "jurisType": "STA",
                        "jurisdictionType": "State",
                        "nonTaxableAmount": 0,
                        "nonTaxableRuleId": 0,
                        "nonTaxableType": "RateRule",
                        "rate": 0.043,
                        "rateRuleId": 1219774,
                        "rateSourceId": 3,
                        "serCode": "",
                        "sourcing": "Destination",
                        "tax": 4.3,
                        "taxableAmount": 100,
                        "taxType": "Sales",
                        "taxSubTypeId": "S",
                        "taxTypeGroupId": "SalesAndUse",
                        "taxName": "VA STATE TAX",
                        "taxAuthorityTypeId": 45,
                        "taxRegionId": 2107373,
                        "taxCalculated": 4.3,
                        "taxOverride": 0,
                        "rateType": "General",
                        "rateTypeCode": "G",
                        "taxableUnits": 100,
                        "nonTaxableUnits": 0,
                        "exemptUnits": 0,
                        "unitOfBasis": "PerCurrencyUnit",
                        "isNonPassThru": false,
                        "isFee": false,
                        "reportingTaxableUnits": 100,
                        "reportingNonTaxableUnits": 0,
                        "reportingExemptUnits": 0,
                        "reportingTax": 4.3,
                        "reportingTaxCalculated": 4.3,
                        "liabilityType": "Seller"
                    },
                    {
                        "id": 85009687887978,
                        "transactionLineId": 85009687887970,
                        "transactionId": 85009687887965,
                        "addressId": 85009687887966,
                        "country": "US",
                        "region": "VA",
                        "countyFIPS": "",
                        "stateFIPS": "",
                        "exemptAmount": 0,
                        "exemptReasonId": 4,
                        "inState": false,
                        "jurisCode": "21344",
                        "jurisName": "DANVILLE",
                        "jurisdictionId": 165784,
                        "signatureCode": "BUKH",
                        "stateAssignedNo": "51590",
                        "jurisType": "CIT",
                        "jurisdictionType": "City",
                        "nonTaxableAmount": 0,
                        "nonTaxableRuleId": 0,
                        "nonTaxableType": "RateRule",
                        "rate": 0.01,
                        "rateRuleId": 1098698,
                        "rateSourceId": 3,
                        "serCode": "",
                        "sourcing": "Destination",
                        "tax": 1,
                        "taxableAmount": 100,
                        "taxType": "Sales",
                        "taxSubTypeId": "S",
                        "taxTypeGroupId": "SalesAndUse",
                        "taxName": "VA CITY TAX",
                        "taxAuthorityTypeId": 45,
                        "taxRegionId": 2107373,
                        "taxCalculated": 1,
                        "taxOverride": 0,
                        "rateType": "General",
                        "rateTypeCode": "G",
                        "taxableUnits": 100,
                        "nonTaxableUnits": 0,
                        "exemptUnits": 0,
                        "unitOfBasis": "PerCurrencyUnit",
                        "isNonPassThru": false,
                        "isFee": false,
                        "reportingTaxableUnits": 100,
                        "reportingNonTaxableUnits": 0,
                        "reportingExemptUnits": 0,
                        "reportingTax": 1,
                        "reportingTaxCalculated": 1,
                        "liabilityType": "Seller"
                    }
                ],
                "nonPassthroughDetails": [],
                "lineLocationTypes": [
                    {
                        "documentLineLocationTypeId": 85009687887973,
                        "documentLineId": 85009687887970,
                        "documentAddressId": 85009687887968,
                        "locationTypeCode": "ShipFrom"
                    },
                    {
                        "documentLineLocationTypeId": 85009687887974,
                        "documentLineId": 85009687887970,
                        "documentAddressId": 85009687887966,
                        "locationTypeCode": "ShipTo"
                    },
                    {
                        "documentLineLocationTypeId": 85009687887975,
                        "documentLineId": 85009687887970,
                        "documentAddressId": 85009687887967,
                        "locationTypeCode": "PointOfOrderAcceptance"
                    }
                ],
                "userDefinedFields": [
                    {
                        "name": "UDF1",
                        "value": "ORACLE"
                    }
                ],
                "hsCode": "",
                "costInsuranceFreight": 0,
                "vatCode": "",
                "vatNumberTypeId": 0
            },
            {
                "id": 85009687887971,
                "transactionId": 85009687887965,
                "lineNumber": "2",
                "boundaryOverrideId": 0,
                "customerUsageType": "",
                "entityUseCode": "",
                "description": "$0 Retail Delivery Fee Item For Colorado State",
                "destinationAddressId": 85009687887966,
                "originAddressId": 85009687887967,
                "discountAmount": 0,
                "discountTypeId": 0,
                "exemptAmount": 0,
                "exemptCertId": 0,
                "exemptNo": "",
                "isItemTaxable": false,
                "isSSTP": false,
                "itemCode": "HPP4520_RDF",
                "lineAmount": 0,
                "quantity": 1,
                "ref1": "GOODS",
                "ref2": "COMPUTER|DESKTOP",
                "reportingDate": "2022-06-15",
                "revAccount": "SERPSOLS-00-410002-000-SERPSOLS-0-0-0-0-0",
                "sourcing": "Destination",
                "tax": 0,
                "taxableAmount": 0,
                "taxCalculated": 0,
                "taxCode": "OF400000",
                "taxCodeId": 5679172,
                "taxDate": "2022-06-15",
                "taxEngine": "",
                "taxOverrideType": "None",
                "businessIdentificationNo": "",
                "taxOverrideAmount": 0,
                "taxOverrideReason": "",
                "taxIncluded": false,
                "originationDocumentId": "300000152343329",
                "details": [
                    {
                        "id": 85009687887984,
                        "transactionLineId": 85009687887971,
                        "transactionId": 85009687887965,
                        "addressId": 85009687887966,
                        "country": "US",
                        "region": "VA",
                        "countyFIPS": "",
                        "stateFIPS": "",
                        "exemptAmount": 0,
                        "exemptReasonId": 4,
                        "inState": false,
                        "jurisCode": "51",
                        "jurisName": "VIRGINIA",
                        "jurisdictionId": 60,
                        "signatureCode": "BTZU",
                        "stateAssignedNo": "",
                        "jurisType": "STA",
                        "jurisdictionType": "State",
                        "nonTaxableAmount": 0,
                        "nonTaxableRuleId": 0,
                        "nonTaxableType": "RateRule",
                        "rate": 0.043,
                        "rateRuleId": 1219774,
                        "rateSourceId": 3,
                        "serCode": "",
                        "sourcing": "Destination",
                        "tax": 0,
                        "taxableAmount": 0,
                        "taxType": "Sales",
                        "taxSubTypeId": "S",
                        "taxTypeGroupId": "SalesAndUse",
                        "taxName": "VA STATE TAX",
                        "taxAuthorityTypeId": 45,
                        "taxRegionId": 2107373,
                        "taxCalculated": 0,
                        "taxOverride": 0,
                        "rateType": "General",
                        "rateTypeCode": "G",
                        "taxableUnits": 0,
                        "nonTaxableUnits": 0,
                        "exemptUnits": 0,
                        "unitOfBasis": "PerCurrencyUnit",
                        "isNonPassThru": false,
                        "isFee": false,
                        "reportingTaxableUnits": 0,
                        "reportingNonTaxableUnits": 0,
                        "reportingExemptUnits": 0,
                        "reportingTax": 0,
                        "reportingTaxCalculated": 0,
                        "liabilityType": "Seller"
                    },
                    {
                        "id": 85009687887985,
                        "transactionLineId": 85009687887971,
                        "transactionId": 85009687887965,
                        "addressId": 85009687887966,
                        "country": "US",
                        "region": "VA",
                        "countyFIPS": "",
                        "stateFIPS": "",
                        "exemptAmount": 0,
                        "exemptReasonId": 4,
                        "inState": false,
                        "jurisCode": "21344",
                        "jurisName": "DANVILLE",
                        "jurisdictionId": 165784,
                        "signatureCode": "BUKH",
                        "stateAssignedNo": "51590",
                        "jurisType": "CIT",
                        "jurisdictionType": "City",
                        "nonTaxableAmount": 0,
                        "nonTaxableRuleId": 0,
                        "nonTaxableType": "RateRule",
                        "rate": 0.01,
                        "rateRuleId": 1098698,
                        "rateSourceId": 3,
                        "serCode": "",
                        "sourcing": "Destination",
                        "tax": 0,
                        "taxableAmount": 0,
                        "taxType": "Sales",
                        "taxSubTypeId": "S",
                        "taxTypeGroupId": "SalesAndUse",
                        "taxName": "VA CITY TAX",
                        "taxAuthorityTypeId": 45,
                        "taxRegionId": 2107373,
                        "taxCalculated": 0,
                        "taxOverride": 0,
                        "rateType": "General",
                        "rateTypeCode": "G",
                        "taxableUnits": 0,
                        "nonTaxableUnits": 0,
                        "exemptUnits": 0,
                        "unitOfBasis": "PerCurrencyUnit",
                        "isNonPassThru": false,
                        "isFee": false,
                        "reportingTaxableUnits": 0,
                        "reportingNonTaxableUnits": 0,
                        "reportingExemptUnits": 0,
                        "reportingTax": 0,
                        "reportingTaxCalculated": 0,
                        "liabilityType": "Seller"
                    }
                ],
                "nonPassthroughDetails": [],
                "lineLocationTypes": [
                    {
                        "documentLineLocationTypeId": 85009687887980,
                        "documentLineId": 85009687887971,
                        "documentAddressId": 85009687887968,
                        "locationTypeCode": "ShipFrom"
                    },
                    {
                        "documentLineLocationTypeId": 85009687887981,
                        "documentLineId": 85009687887971,
                        "documentAddressId": 85009687887966,
                        "locationTypeCode": "ShipTo"
                    },
                    {
                        "documentLineLocationTypeId": 85009687887982,
                        "documentLineId": 85009687887971,
                        "documentAddressId": 85009687887967,
                        "locationTypeCode": "PointOfOrderAcceptance"
                    }
                ],
                "userDefinedFields": [
                    {
                        "name": "UDF1",
                        "value": "ORACLE"
                    }
                ],
                "hsCode": "",
                "costInsuranceFreight": 0,
                "vatCode": "",
                "vatNumberTypeId": 0
            }
        ],
        "addresses": [
            {
                "id": 85009687887966,
                "transactionId": 85009687887965,
                "boundaryLevel": "Address",
                "line1": "2136 RIVERSIDE DR",
                "line2": "",
                "line3": "",
                "city": "DANVILLE",
                "region": "VA",
                "postalCode": "24540-4215",
                "country": "US",
                "taxRegionId": 2107373,
                "latitude": "36.595404",
                "longitude": "-79.406343"
            },
            {
                "id": 85009687887967,
                "transactionId": 85009687887965,
                "boundaryLevel": "Address",
                "line1": "5570 BALDWIN WAY",
                "line2": "",
                "line3": "",
                "city": "PLEASANTON",
                "region": "CA",
                "postalCode": "94588-3679",
                "country": "US",
                "taxRegionId": 4017445,
                "latitude": "37.688868",
                "longitude": "-121.92819"
            },
            {
                "id": 85009687887968,
                "transactionId": 85009687887965,
                "boundaryLevel": "Address",
                "line1": "4683 CHABOT DR",
                "line2": "",
                "line3": "",
                "city": "PLEASANTON",
                "region": "CA",
                "postalCode": "94588-3830",
                "country": "US",
                "taxRegionId": 4017445,
                "latitude": "37.694322",
                "longitude": "-121.901154"
            }
        ],
        "locationTypes": [],
        "summary": [
            {
                "country": "US",
                "region": "VA",
                "jurisType": "State",
                "jurisCode": "51",
                "jurisName": "VIRGINIA",
                "taxAuthorityType": 45,
                "stateAssignedNo": "",
                "taxType": "Sales",
                "taxSubType": "S",
                "taxName": "VA STATE TAX",
                "rateType": "General",
                "taxable": 100,
                "rate": 0.043,
                "tax": 4.3,
                "taxCalculated": 4.3,
                "nonTaxable": 0,
                "exemption": 0
            },
            {
                "country": "US",
                "region": "VA",
                "jurisType": "City",
                "jurisCode": "21344",
                "jurisName": "DANVILLE",
                "taxAuthorityType": 45,
                "stateAssignedNo": "51590",
                "taxType": "Sales",
                "taxSubType": "S",
                "taxName": "VA CITY TAX",
                "rateType": "General",
                "taxable": 100,
                "rate": 0.01,
                "tax": 1,
                "taxCalculated": 1,
                "nonTaxable": 0,
                "exemption": 0
            }
        ]
    },
    "fusionRequest": {
        "taxableHeader": {
            "ns:ApplicationId": "222",
            "ns:ApplicationShortname": "AR",
            "ns:BatchSourceName": "Manual",
            "ns:CtrlHdrTxApplFlag": "N",
            "ns:DefaultTaxationCountry": "US",
            "ns:DocEventStatus": "VALIDATED_FOR_TAX",
            "ns:EntityCode": "TRANSACTIONS",
            "ns:EventClassCode": "INVOICE",
            "ns:EstablishmentId": "300000002080006",
            "ns:EstablishmentNumber": "7",
            "ns:EventClassMappingId": "4",
            "ns:EventTypeCode": "INV_CREATE",
            "ns:EndPointUrl": "https://ecae-test.fa.us2.oraclecloud.com",
            "ns:FirstPtyOrgId": "300000011119157",
            "ns:FirstPtyRegId": "300000004353017",
            "ns:FirstPtyRegNumber": "41-1234501",
            "ns:HdrTrxUserKey1": "CALCULATE",
            "ns:HistoricalFlag": "N",
            "ns:HqEstbPartyTaxProfId": "300000002080046",
            "ns:InternalOrganizationId": "300000011107181",
            "ns:LedgerId": "300000002064005",
            "ns:LegalEntityId": "300000002080003",
            "ns:LegalEntityNumber": "SERPSOLS",
            "ns:LogLevel": "SEVERE",
            "ns:ReceivablesTrxTypeSeqId": "34",
            "ns:TrxCurrencyCode": "USD",
            "ns:TrxDate": "2022-06-15",
            "ns:TrxDueDate": "2022-07-15",
            "ns:TrxId": "300000152343327",
            "ns:TrxLevelType": "ITEM",
            "ns:TrxNumber": "1135050",
            "taxableLines": [
                {
                    "ns:AccountCcid": "300000002075018",
                    "ns:ApplicationId": "222",
                    "ns:AccountString": "SERPSOLS-00-410002-000-SERPSOLS-0-0-0-0-0",
                    "ns:AssessableValue": "100",
                    "ns:BillFromGeographyType1": "ADDRESS1",
                    "ns:BillFromGeographyType10": "PROVINCE",
                    "ns:BillFromGeographyType2": "ADDRESS2",
                    "ns:BillFromGeographyType3": "ADDRESS3",
                    "ns:BillFromGeographyType4": "ADDRESS4",
                    "ns:BillFromGeographyType5": "COUNTRY",
                    "ns:BillFromGeographyType6": "STATE",
                    "ns:BillFromGeographyType7": "COUNTY",
                    "ns:BillFromGeographyType8": "CITY",
                    "ns:BillFromGeographyType9": "POSTALCODE",
                    "ns:BillFromGeographyValue1": "5570 Baldwin Way",
                    "ns:BillFromGeographyValue5": "US",
                    "ns:BillFromGeographyValue6": "CA",
                    "ns:BillFromGeographyValue7": "ALAMEDA",
                    "ns:BillFromGeographyValue8": "PLEASANTON",
                    "ns:BillFromGeographyValue9": "94588",
                    "ns:BillFromLocationId": "300000027712047",
                    "ns:BillThirdPtyAcctId": "300000033122697",
                    "ns:BillThirdPtyAcctSiteId": "300000033122698",
                    "ns:BillToGeographyType1": "ADDRESS1",
                    "ns:BillToGeographyType10": "PROVINCE",
                    "ns:BillToGeographyType2": "ADDRESS2",
                    "ns:BillToGeographyType3": "ADDRESS3",
                    "ns:BillToGeographyType4": "ADDRESS4",
                    "ns:BillToGeographyType5": "COUNTRY",
                    "ns:BillToGeographyType6": "STATE",
                    "ns:BillToGeographyType7": "COUNTY",
                    "ns:BillToGeographyType8": "CITY",
                    "ns:BillToGeographyType9": "POSTALCODE",
                    "ns:BillToGeographyValue1": "2136 Riverside Dr",
                    "ns:BillToGeographyValue5": "US",
                    "ns:BillToGeographyValue6": "VA",
                    "ns:BillToGeographyValue7": "PITTSYLVANIA",
                    "ns:BillToGeographyValue8": "DANVILLE",
                    "ns:BillToGeographyValue9": "24540",
                    "ns:BillToLocationId": "300000033122700",
                    "ns:CashDiscount": "0",
                    "ns:EntityCode": "TRANSACTIONS",
                    "ns:EventClassCode": "INVOICE",
                    "ns:ExemptionControlFlag": "S",
                    "ns:LineAmt": "100",
                    "ns:LineAmtIncludesTaxFlag": "S",
                    "ns:LineClass": "INVOICE",
                    "ns:LineLevelAction": "CREATE",
                    "ns:LinesDetFactorId": "14254708",
                    "ns:PoaGeographyType1": "ADDRESS1",
                    "ns:PoaGeographyType10": "PROVINCE",
                    "ns:PoaGeographyType2": "ADDRESS2",
                    "ns:PoaGeographyType3": "ADDRESS3",
                    "ns:PoaGeographyType4": "ADDRESS4",
                    "ns:PoaGeographyType5": "COUNTRY",
                    "ns:PoaGeographyType6": "STATE",
                    "ns:PoaGeographyType7": "COUNTY",
                    "ns:PoaGeographyType8": "CITY",
                    "ns:PoaGeographyType9": "POSTALCODE",
                    "ns:PoaGeographyValue1": "5570 Baldwin Way",
                    "ns:PoaGeographyValue5": "US",
                    "ns:PoaGeographyValue6": "CA",
                    "ns:PoaGeographyValue7": "ALAMEDA",
                    "ns:PoaGeographyValue8": "PLEASANTON",
                    "ns:PoaGeographyValue9": "94588",
                    "ns:PoaLocationId": "300000027712047",
                    "ns:Precision": "2",
                    "ns:ProductCode": "HPP4520",
                    "ns:ProductDescription": "HP Envy Printer 4520",
                    "ns:ProductFiscClassification": "COMPUTER|DESKTOP",
                    "ns:ProductId": "300000011351142",
                    "ns:ProductOrgId": "300000003634674",
                    "ns:ProductType": "GOODS",
                    "ns:ShipFromGeographyType1": "ADDRESS1",
                    "ns:ShipFromGeographyType10": "PROVINCE",
                    "ns:ShipFromGeographyType2": "ADDRESS2",
                    "ns:ShipFromGeographyType3": "ADDRESS3",
                    "ns:ShipFromGeographyType4": "ADDRESS4",
                    "ns:ShipFromGeographyType5": "COUNTRY",
                    "ns:ShipFromGeographyType6": "STATE",
                    "ns:ShipFromGeographyType7": "COUNTY",
                    "ns:ShipFromGeographyType8": "CITY",
                    "ns:ShipFromGeographyType9": "POSTALCODE",
                    "ns:ShipFromGeographyValue1": "4683 Chabot Dr",
                    "ns:ShipFromGeographyValue5": "US",
                    "ns:ShipFromGeographyValue6": "California",
                    "ns:ShipFromGeographyValue7": "Alameda",
                    "ns:ShipFromGeographyValue8": "Pleasanton",
                    "ns:ShipFromGeographyValue9": "94588",
                    "ns:ShipFromLocationId": "300000003492106",
                    "ns:ShipToGeographyType1": "ADDRESS1",
                    "ns:ShipToGeographyType10": "PROVINCE",
                    "ns:ShipToGeographyType2": "ADDRESS2",
                    "ns:ShipToGeographyType3": "ADDRESS3",
                    "ns:ShipToGeographyType4": "ADDRESS4",
                    "ns:ShipToGeographyType5": "COUNTRY",
                    "ns:ShipToGeographyType6": "STATE",
                    "ns:ShipToGeographyType7": "COUNTY",
                    "ns:ShipToGeographyType8": "CITY",
                    "ns:ShipToGeographyType9": "POSTALCODE",
                    "ns:ShipToGeographyValue1": "2136 Riverside Dr",
                    "ns:ShipToGeographyValue5": "US",
                    "ns:ShipToGeographyValue6": "VA",
                    "ns:ShipToGeographyValue7": "PITTSYLVANIA",
                    "ns:ShipToGeographyValue8": "DANVILLE",
                    "ns:ShipToGeographyValue9": "24540",
                    "ns:ShipToLocationId": "300000033122700",
                    "ns:TaxReportingFlag": "Y",
                    "ns:TrxBusinessCategory": "SALES_TRANSACTION",
                    "ns:TrxId": "300000152343327",
                    "ns:TrxLineCurrencyCode": "USD",
                    "ns:TrxLineDescription": "HP Envy Printer 4520",
                    "ns:TrxLineGlDate": "2022-06-15",
                    "ns:TrxLineId": "300000152343328",
                    "ns:TrxLineNumber": "1",
                    "ns:TrxLinePrecision": "2",
                    "ns:TrxLineQuantity": "1",
                    "ns:TrxLineType": "ITEM",
                    "ns:TrxLevelType": "LINE",
                    "ns:TrxTypeDescription": "Regular Invoice for Test",
                    "ns:UnitPrice": "100",
                    "ns:UomCode": "zzy",
                    "_addresses": {
                        "shipFrom": {
                            "line1": "4683 Chabot Dr",
                            "country": "US",
                            "region": "CA",
                            "county": "Alameda",
                            "city": "Pleasanton",
                            "postalCode": "94588"
                        },
                        "shipTo": {
                            "line1": "2136 Riverside Dr",
                            "country": "US",
                            "region": "VA",
                            "county": "PITTSYLVANIA",
                            "city": "DANVILLE",
                            "postalCode": "24540"
                        },
                        "billFrom": {
                            "line1": "5570 Baldwin Way",
                            "country": "US",
                            "region": "CA",
                            "county": "ALAMEDA",
                            "city": "PLEASANTON",
                            "postalCode": "94588"
                        },
                        "billTo": {
                            "line1": "2136 Riverside Dr",
                            "country": "US",
                            "region": "VA",
                            "county": "PITTSYLVANIA",
                            "city": "DANVILLE",
                            "postalCode": "24540"
                        },
                        "pointOfOrderOrigin": null,
                        "pointOfOrderAcceptance": {
                            "line1": "5570 Baldwin Way",
                            "country": "US",
                            "region": "CA",
                            "county": "ALAMEDA",
                            "city": "PLEASANTON",
                            "postalCode": "94588"
                        },
                        "finalDischarge": null
                    }
                },
                {
                    "ns:AccountCcid": "300000002075018",
                    "ns:ApplicationId": "222",
                    "ns:AccountString": "SERPSOLS-00-410002-000-SERPSOLS-0-0-0-0-0",
                    "ns:AssessableValue": "0",
                    "ns:BillFromGeographyType1": "ADDRESS1",
                    "ns:BillFromGeographyType10": "PROVINCE",
                    "ns:BillFromGeographyType2": "ADDRESS2",
                    "ns:BillFromGeographyType3": "ADDRESS3",
                    "ns:BillFromGeographyType4": "ADDRESS4",
                    "ns:BillFromGeographyType5": "COUNTRY",
                    "ns:BillFromGeographyType6": "STATE",
                    "ns:BillFromGeographyType7": "COUNTY",
                    "ns:BillFromGeographyType8": "CITY",
                    "ns:BillFromGeographyType9": "POSTALCODE",
                    "ns:BillFromGeographyValue1": "5570 Baldwin Way",
                    "ns:BillFromGeographyValue5": "US",
                    "ns:BillFromGeographyValue6": "CA",
                    "ns:BillFromGeographyValue7": "ALAMEDA",
                    "ns:BillFromGeographyValue8": "PLEASANTON",
                    "ns:BillFromGeographyValue9": "94588",
                    "ns:BillFromLocationId": "300000027712047",
                    "ns:BillThirdPtyAcctId": "300000033122697",
                    "ns:BillThirdPtyAcctSiteId": "300000033122698",
                    "ns:BillToGeographyType1": "ADDRESS1",
                    "ns:BillToGeographyType10": "PROVINCE",
                    "ns:BillToGeographyType2": "ADDRESS2",
                    "ns:BillToGeographyType3": "ADDRESS3",
                    "ns:BillToGeographyType4": "ADDRESS4",
                    "ns:BillToGeographyType5": "COUNTRY",
                    "ns:BillToGeographyType6": "STATE",
                    "ns:BillToGeographyType7": "COUNTY",
                    "ns:BillToGeographyType8": "CITY",
                    "ns:BillToGeographyType9": "POSTALCODE",
                    "ns:BillToGeographyValue1": "2136 Riverside Dr",
                    "ns:BillToGeographyValue5": "US",
                    "ns:BillToGeographyValue6": "VA",
                    "ns:BillToGeographyValue7": "PITTSYLVANIA",
                    "ns:BillToGeographyValue8": "DANVILLE",
                    "ns:BillToGeographyValue9": "24540",
                    "ns:BillToLocationId": "300000033122700",
                    "ns:CashDiscount": "0",
                    "ns:EntityCode": "TRANSACTIONS",
                    "ns:EventClassCode": "INVOICE",
                    "ns:ExemptionControlFlag": "S",
                    "ns:LineAmt": "0",
                    "ns:LineAmtIncludesTaxFlag": "S",
                    "ns:LineClass": "INVOICE",
                    "ns:LineLevelAction": "CREATE",
                    "ns:LinesDetFactorId": "14254707",
                    "ns:PoaGeographyType1": "ADDRESS1",
                    "ns:PoaGeographyType10": "PROVINCE",
                    "ns:PoaGeographyType2": "ADDRESS2",
                    "ns:PoaGeographyType3": "ADDRESS3",
                    "ns:PoaGeographyType4": "ADDRESS4",
                    "ns:PoaGeographyType5": "COUNTRY",
                    "ns:PoaGeographyType6": "STATE",
                    "ns:PoaGeographyType7": "COUNTY",
                    "ns:PoaGeographyType8": "CITY",
                    "ns:PoaGeographyType9": "POSTALCODE",
                    "ns:PoaGeographyValue1": "5570 Baldwin Way",
                    "ns:PoaGeographyValue5": "US",
                    "ns:PoaGeographyValue6": "CA",
                    "ns:PoaGeographyValue7": "ALAMEDA",
                    "ns:PoaGeographyValue8": "PLEASANTON",
                    "ns:PoaGeographyValue9": "94588",
                    "ns:PoaLocationId": "300000027712047",
                    "ns:Precision": "2",
                    "ns:ProductCode": "HPP4520_RDF",
                    "ns:ProductDescription": "$0 Retail Delivery Fee Item For Colorado State",
                    "ns:ProductFiscClassification": "COMPUTER|DESKTOP",
                    "ns:ProductId": "300000152343311",
                    "ns:ProductOrgId": "300000003634674",
                    "ns:ProductType": "GOODS",
                    "ns:ShipFromGeographyType1": "ADDRESS1",
                    "ns:ShipFromGeographyType10": "PROVINCE",
                    "ns:ShipFromGeographyType2": "ADDRESS2",
                    "ns:ShipFromGeographyType3": "ADDRESS3",
                    "ns:ShipFromGeographyType4": "ADDRESS4",
                    "ns:ShipFromGeographyType5": "COUNTRY",
                    "ns:ShipFromGeographyType6": "STATE",
                    "ns:ShipFromGeographyType7": "COUNTY",
                    "ns:ShipFromGeographyType8": "CITY",
                    "ns:ShipFromGeographyType9": "POSTALCODE",
                    "ns:ShipFromGeographyValue1": "4683 Chabot Dr",
                    "ns:ShipFromGeographyValue5": "US",
                    "ns:ShipFromGeographyValue6": "California",
                    "ns:ShipFromGeographyValue7": "Alameda",
                    "ns:ShipFromGeographyValue8": "Pleasanton",
                    "ns:ShipFromGeographyValue9": "94588",
                    "ns:ShipFromLocationId": "300000003492106",
                    "ns:ShipToGeographyType1": "ADDRESS1",
                    "ns:ShipToGeographyType10": "PROVINCE",
                    "ns:ShipToGeographyType2": "ADDRESS2",
                    "ns:ShipToGeographyType3": "ADDRESS3",
                    "ns:ShipToGeographyType4": "ADDRESS4",
                    "ns:ShipToGeographyType5": "COUNTRY",
                    "ns:ShipToGeographyType6": "STATE",
                    "ns:ShipToGeographyType7": "COUNTY",
                    "ns:ShipToGeographyType8": "CITY",
                    "ns:ShipToGeographyType9": "POSTALCODE",
                    "ns:ShipToGeographyValue1": "2136 Riverside Dr",
                    "ns:ShipToGeographyValue5": "US",
                    "ns:ShipToGeographyValue6": "VA",
                    "ns:ShipToGeographyValue7": "PITTSYLVANIA",
                    "ns:ShipToGeographyValue8": "DANVILLE",
                    "ns:ShipToGeographyValue9": "24540",
                    "ns:ShipToLocationId": "300000033122700",
                    "ns:TaxReportingFlag": "Y",
                    "ns:TrxBusinessCategory": "SALES_TRANSACTION",
                    "ns:TrxId": "300000152343327",
                    "ns:TrxLineCurrencyCode": "USD",
                    "ns:TrxLineDescription": "$0 Retail Delivery Fee Item For Colorado State",
                    "ns:TrxLineGlDate": "2022-06-15",
                    "ns:TrxLineId": "300000152343329",
                    "ns:TrxLineNumber": "2",
                    "ns:TrxLinePrecision": "2",
                    "ns:TrxLineQuantity": "0",
                    "ns:TrxLineType": "ITEM",
                    "ns:TrxLevelType": "LINE",
                    "ns:TrxTypeDescription": "Regular Invoice for Test",
                    "ns:UnitPrice": "0",
                    "ns:UomCode": "zzy",
                    "_addresses": {
                        "shipFrom": {
                            "line1": "4683 Chabot Dr",
                            "country": "US",
                            "region": "CA",
                            "county": "Alameda",
                            "city": "Pleasanton",
                            "postalCode": "94588"
                        },
                        "shipTo": {
                            "line1": "2136 Riverside Dr",
                            "country": "US",
                            "region": "VA",
                            "county": "PITTSYLVANIA",
                            "city": "DANVILLE",
                            "postalCode": "24540"
                        },
                        "billFrom": {
                            "line1": "5570 Baldwin Way",
                            "country": "US",
                            "region": "CA",
                            "county": "ALAMEDA",
                            "city": "PLEASANTON",
                            "postalCode": "94588"
                        },
                        "billTo": {
                            "line1": "2136 Riverside Dr",
                            "country": "US",
                            "region": "VA",
                            "county": "PITTSYLVANIA",
                            "city": "DANVILLE",
                            "postalCode": "24540"
                        },
                        "pointOfOrderOrigin": null,
                        "pointOfOrderAcceptance": {
                            "line1": "5570 Baldwin Way",
                            "country": "US",
                            "region": "CA",
                            "county": "ALAMEDA",
                            "city": "PLEASANTON",
                            "postalCode": "94588"
                        },
                        "finalDischarge": null
                    }
                }
            ]
        },
        "wsAction": "Calculation"
    },
    "customerProfile": {
        "createdAt": "2022-08-03T20:30:17.994Z",
        "updatedBy": "cFTk3vD1wok6CQpVQawMDB",
        "createdBy": "cFTk3vD1wok6CQpVQawMDB",
        "id": "7CTtbYo1ZjNbmHDqo1h4BK",
        "ATX_GEO_SOURCE": "AVA",
        "updatedAt": "2022-08-08T23:54:34.628Z",
        "ATX_CUSTOMER_BUSINESS_UNITS": [
            {
                "ATX_BUSINESS_UNIT": "SmartERP Italy BU",
                "createdAt": "2022-08-08T23:54:29.708Z",
                "ATX_BUSINESS_UNIT_ORGANIZATION_ID": "300000125717393",
                "createdBy": "cFTk3vD1wok6CQpVQawMDB",
                "id": "qM8ETikNr78r8pQhVmqAPu",
                "FIRST_PARTY_ORG_ID": "300000125689483",
                "ATX_CUSTOMER_LEGAL_ENTITIES": [
                    {
                        "createdAt": "2022-08-08T23:54:29.752Z",
                        "createdBy": "cFTk3vD1wok6CQpVQawMDB",
                        "ATX_COMPANY_CODE": "ECAETEST-UATST-ITALY",
                        "ATX_TAX_MODULE": "INSL",
                        "ATX_LEGAL_ENTITY_ID": "300000125689457",
                        "id": "ryH7WCY8yFLE48sRPxgLqJ",
                        "ATX_LEGAL_ENTITY_NAME": "SmartERP Italy LE",
                        "ATX_COUNTRY": "ITA"
                    }
                ],
                "ATX_BUSINESS_UNIT_REGIME_SUBSCRIPTION": [],
                "ATX_AP_TOLERANCE": {}
            },
            {
                "ATX_BUSINESS_UNIT": "SmartERP India BU",
                "createdAt": "2022-08-08T23:53:31.187Z",
                "ATX_BUSINESS_UNIT_ORGANIZATION_ID": "300000116064777",
                "createdBy": "cFTk3vD1wok6CQpVQawMDB",
                "id": "sVNmHpiscpBsVERaRp2jvq",
                "FIRST_PARTY_ORG_ID": "300000116087426",
                "ATX_CUSTOMER_LEGAL_ENTITIES": [
                    {
                        "createdAt": "2022-08-08T23:53:31.189Z",
                        "createdBy": "cFTk3vD1wok6CQpVQawMDB",
                        "ATX_COMPANY_CODE": "ECAETEST-UATST-INDIA",
                        "ATX_TAX_MODULE": "INSL",
                        "ATX_LEGAL_ENTITY_ID": "300000116087400",
                        "id": "wRzP91S3whNYKHWbACinDy",
                        "ATX_LEGAL_ENTITY_NAME": "SmartERP India LE",
                        "ATX_COUNTRY": "IND"
                    }
                ],
                "ATX_BUSINESS_UNIT_REGIME_SUBSCRIPTION": [],
                "ATX_AP_TOLERANCE": {}
            },
            {
                "ATX_BUSINESS_UNIT": "SmartERP Mexico BU",
                "createdAt": "2022-08-08T23:52:40.698Z",
                "ATX_BUSINESS_UNIT_ORGANIZATION_ID": "300000106686938",
                "createdBy": "cFTk3vD1wok6CQpVQawMDB",
                "id": "kEDRYatymFFYQiTyTKReR3",
                "FIRST_PARTY_ORG_ID": "300000106939098",
                "ATX_CUSTOMER_LEGAL_ENTITIES": [
                    {
                        "createdAt": "2022-08-08T23:52:40.700Z",
                        "createdBy": "cFTk3vD1wok6CQpVQawMDB",
                        "ATX_COMPANY_CODE": "ECAETEST-UATST-MEXICO",
                        "ATX_TAX_MODULE": "INSL",
                        "ATX_LEGAL_ENTITY_ID": "300000106939072",
                        "id": "thVaBCiHvxWRaoDm7DPtVJ",
                        "ATX_LEGAL_ENTITY_NAME": "SmartERP Mexico LE",
                        "ATX_COUNTRY": "MEX"
                    }
                ],
                "ATX_BUSINESS_UNIT_REGIME_SUBSCRIPTION": [],
                "ATX_AP_TOLERANCE": {}
            },
            {
                "ATX_BUSINESS_UNIT": "SmartERP Japan BU",
                "createdAt": "2022-08-08T23:51:45.474Z",
                "ATX_BUSINESS_UNIT_ORGANIZATION_ID": "300000106686884",
                "createdBy": "cFTk3vD1wok6CQpVQawMDB",
                "id": "dWoW1ViGjv63HAsiCMJjYS",
                "FIRST_PARTY_ORG_ID": "300000106939043",
                "ATX_CUSTOMER_LEGAL_ENTITIES": [
                    {
                        "createdAt": "2022-08-08T23:51:45.478Z",
                        "createdBy": "cFTk3vD1wok6CQpVQawMDB",
                        "ATX_COMPANY_CODE": "FUSION-ECAETEST-JP",
                        "ATX_TAX_MODULE": "INSL",
                        "ATX_LEGAL_ENTITY_ID": "300000106939017",
                        "id": "qUPb9kABvaMtt61N2ebrEi",
                        "ATX_LEGAL_ENTITY_NAME": "SmartERP Japan LE",
                        "ATX_COUNTRY": "JPN"
                    }
                ],
                "ATX_BUSINESS_UNIT_REGIME_SUBSCRIPTION": [],
                "ATX_AP_TOLERANCE": {}
            },
            {
                "ATX_BUSINESS_UNIT": "SmartERP Israel BU",
                "createdAt": "2022-08-08T23:50:28.472Z",
                "ATX_BUSINESS_UNIT_ORGANIZATION_ID": "300000105054777",
                "createdBy": "cFTk3vD1wok6CQpVQawMDB",
                "id": "jQBToZvBX3wEKPwj8J9MWE",
                "FIRST_PARTY_ORG_ID": "300000106092417",
                "ATX_CUSTOMER_LEGAL_ENTITIES": [
                    {
                        "createdAt": "2022-08-08T23:50:28.474Z",
                        "createdBy": "cFTk3vD1wok6CQpVQawMDB",
                        "ATX_COMPANY_CODE": "FUSION-OCICFG",
                        "ATX_TAX_MODULE": "INSL",
                        "ATX_LEGAL_ENTITY_ID": "300000106092391",
                        "id": "6KGjEzZJ5uQ7k2Sy587ZYv",
                        "ATX_LEGAL_ENTITY_NAME": "SmartERP Israel LE",
                        "ATX_COUNTRY": "ISR"
                    }
                ],
                "ATX_BUSINESS_UNIT_REGIME_SUBSCRIPTION": [],
                "ATX_AP_TOLERANCE": {}
            },
            {
                "ATX_BUSINESS_UNIT": "SmartERP France BU",
                "createdAt": "2022-08-08T23:49:22.871Z",
                "ATX_BUSINESS_UNIT_ORGANIZATION_ID": "300000105054521",
                "createdBy": "cFTk3vD1wok6CQpVQawMDB",
                "id": "aaQLk8ehDWQzGpgcNDBcS8",
                "FIRST_PARTY_ORG_ID": "300000106092336",
                "ATX_CUSTOMER_LEGAL_ENTITIES": [
                    {
                        "createdAt": "2022-08-08T23:49:22.873Z",
                        "createdBy": "cFTk3vD1wok6CQpVQawMDB",
                        "ATX_COMPANY_CODE": "ECAETEST-UATST-FR",
                        "ATX_TAX_MODULE": "INSL",
                        "ATX_LEGAL_ENTITY_ID": "300000106092310",
                        "id": "rtLHmqyoZ7YR66g2BvoKx6",
                        "ATX_LEGAL_ENTITY_NAME": "SmartERP FRA LE",
                        "ATX_COUNTRY": "FRA"
                    }
                ],
                "ATX_BUSINESS_UNIT_REGIME_SUBSCRIPTION": [],
                "ATX_AP_TOLERANCE": {}
            },
            {
                "ATX_BUSINESS_UNIT": "SmartERP Colombia BU",
                "createdAt": "2022-08-08T23:47:53.782Z",
                "ATX_BUSINESS_UNIT_ORGANIZATION_ID": "300000099185128",
                "createdBy": "cFTk3vD1wok6CQpVQawMDB",
                "id": "bKTgFHcwvBRzrQBUrYosJh",
                "FIRST_PARTY_ORG_ID": "300000099179285",
                "ATX_CUSTOMER_LEGAL_ENTITIES": [
                    {
                        "createdAt": "2022-08-08T23:47:53.786Z",
                        "createdBy": "cFTk3vD1wok6CQpVQawMDB",
                        "ATX_COMPANY_CODE": "ECAETEST-UATST-COLOMBIA",
                        "ATX_TAX_MODULE": "INSL",
                        "ATX_LEGAL_ENTITY_ID": "300000099179238",
                        "id": "6sV5dqmWxMG7eQaBoEy7gd",
                        "ATX_LEGAL_ENTITY_NAME": "SmartERP Colombia LE",
                        "ATX_COUNTRY": "COL"
                    }
                ],
                "ATX_BUSINESS_UNIT_REGIME_SUBSCRIPTION": [],
                "ATX_AP_TOLERANCE": {}
            },
            {
                "ATX_BUSINESS_UNIT": "SmartERP Ireland BU",
                "createdAt": "2022-08-08T23:46:40.886Z",
                "ATX_BUSINESS_UNIT_ORGANIZATION_ID": "300000099042074",
                "createdBy": "cFTk3vD1wok6CQpVQawMDB",
                "id": "m1kMb2x69pfThQLyBkdaJ2",
                "FIRST_PARTY_ORG_ID": "300000099119994",
                "ATX_CUSTOMER_LEGAL_ENTITIES": [
                    {
                        "createdAt": "2022-08-08T23:46:40.888Z",
                        "createdBy": "cFTk3vD1wok6CQpVQawMDB",
                        "ATX_COMPANY_CODE": "FUSION-OCICFG",
                        "ATX_TAX_MODULE": "INSL",
                        "ATX_LEGAL_ENTITY_ID": "300000099119954",
                        "id": "fUYmQYXk2rTi6eFBbia9GZ",
                        "ATX_LEGAL_ENTITY_NAME": "SmartERP Ireland LE",
                        "ATX_COUNTRY": "IRL"
                    }
                ],
                "ATX_BUSINESS_UNIT_REGIME_SUBSCRIPTION": [],
                "ATX_AP_TOLERANCE": {}
            },
            {
                "ATX_BUSINESS_UNIT": "Smart ERP Germany BU",
                "createdAt": "2022-08-08T23:43:13.370Z",
                "ATX_BUSINESS_UNIT_ORGANIZATION_ID": "2",
                "createdBy": "cFTk3vD1wok6CQpVQawMDB",
                "id": "sce3KpiSR9WSVJbbzGVHtT",
                "FIRST_PARTY_ORG_ID": "300000027470973",
                "ATX_CUSTOMER_LEGAL_ENTITIES": [
                    {
                        "createdAt": "2022-08-08T23:43:13.372Z",
                        "createdBy": "cFTk3vD1wok6CQpVQawMDB",
                        "ATX_COMPANY_CODE": "FUSION-OCICFG",
                        "ATX_TAX_MODULE": "INSL",
                        "ATX_LEGAL_ENTITY_ID": "3",
                        "id": "jnLBdcUsKJCkv2fYSErK1w",
                        "ATX_LEGAL_ENTITY_NAME": "SmartERP Germany LE",
                        "ATX_COUNTRY": "GER"
                    }
                ],
                "ATX_BUSINESS_UNIT_REGIME_SUBSCRIPTION": [],
                "ATX_AP_TOLERANCE": {}
            },
            {
                "ATX_BUSINESS_UNIT": "Smart ERP Canada BU",
                "createdAt": "2022-08-08T23:24:24.855Z",
                "ATX_BUSINESS_UNIT_ORGANIZATION_ID": "300000018736906",
                "createdBy": "cFTk3vD1wok6CQpVQawMDB",
                "id": "aAuhqZuu1eoChrGYiqiZUL",
                "FIRST_PARTY_ORG_ID": "300000027222408",
                "ATX_CUSTOMER_LEGAL_ENTITIES": [
                    {
                        "createdAt": "2022-08-08T23:24:24.858Z",
                        "createdBy": "cFTk3vD1wok6CQpVQawMDB",
                        "ATX_COMPANY_CODE": "FUSION-OCICFG-CANADA",
                        "ATX_TAX_MODULE": "CASL",
                        "ATX_LEGAL_ENTITY_ID": "300000027222382",
                        "id": "aMK6a9r8STtV8CBMokbjUw",
                        "ATX_LEGAL_ENTITY_NAME": "Smart ERP Canada LE",
                        "ATX_COUNTRY": "CA"
                    }
                ],
                "ATX_BUSINESS_UNIT_REGIME_SUBSCRIPTION": [],
                "ATX_AP_TOLERANCE": {}
            },
            {
                "ATX_BUSINESS_UNIT": "AppKnit Cloud Inc BU",
                "createdAt": "2022-08-08T23:09:03.079Z",
                "updatedBy": "cFTk3vD1wok6CQpVQawMDB",
                "ATX_BUSINESS_UNIT_ORGANIZATION_ID": "300000125689483554",
                "createdBy": "cFTk3vD1wok6CQpVQawMDB",
                "id": "sJ9gpPaQm7UcBiVpiUHebb",
                "FIRST_PARTY_ORG_ID": "30000012568948344",
                "updatedAt": "2022-08-08T23:12:28.351Z",
                "ATX_CUSTOMER_LEGAL_ENTITIES": [
                    {
                        "updatedBy": "cFTk3vD1wok6CQpVQawMDB",
                        "ATX_JURISDICTION_CODE_PREFIX": "USTJ7",
                        "ATX_LEGAL_ENTITY_ID": "300000125689483887",
                        "createdAt": "2022-08-08T23:09:03.174Z",
                        "ATX_TAX_REGIME_CODE": "AVATAX US7 SALES AND USE TAX",
                        "createdBy": "cFTk3vD1wok6CQpVQawMDB",
                        "ATX_COMPANY_CODE": "APPKNITCLOUDINC",
                        "ATX_TAX_MODULE": "USSL",
                        "id": "e4o2yDVk7woYGU94egEPG6",
                        "ATX_LEGAL_ENTITY_NAME": "AppKnit Cloud Inc.",
                        "updatedAt": "2022-08-08T23:12:28.570Z",
                        "ATX_COUNTRY": "US"
                    }
                ],
                "ATX_BUSINESS_UNIT_REGIME_SUBSCRIPTION": [],
                "ATX_AP_TOLERANCE": {}
            },
            {
                "ATX_BUSINESS_UNIT": "Smart ERP Services Inc.",
                "createdAt": "2022-08-03T20:30:19.033Z",
                "updatedBy": "cFTk3vD1wok6CQpVQawMDB",
                "ATX_BUSINESS_UNIT_ORGANIZATION_ID": "300000011107181",
                "createdBy": "cFTk3vD1wok6CQpVQawMDB",
                "id": "eFbvL9FZddVJWwqFPwcxVU",
                "FIRST_PARTY_ORG_ID": "300000011119157",
                "updatedAt": "2022-08-08T23:12:28.774Z",
                "ATX_CUSTOMER_LEGAL_ENTITIES": [
                    {
                        "updatedBy": "cFTk3vD1wok6CQpVQawMDB",
                        "ATX_JURISDICTION_CODE_PREFIX": "USTJ7",
                        "ATX_LEGAL_ENTITY_ID": "300000039824254",
                        "createdAt": "2022-08-03T20:30:19.761Z",
                        "ATX_TAX_REGIME_CODE": "AVATAX US7 SALES AND USE TAX",
                        "createdBy": "cFTk3vD1wok6CQpVQawMDB",
                        "ATX_COMPANY_CODE": "FUSION-OCICFG-US3LE",
                        "ATX_TAX_MODULE": "USSL",
                        "id": "1pyTApgkcxL86Vi9A1FZ7T",
                        "ATX_LEGAL_ENTITY_NAME": "Smart ERP US3 LE",
                        "updatedAt": "2022-08-08T23:12:28.777Z",
                        "ATX_COUNTRY": "US"
                    },
                    {
                        "updatedBy": "cFTk3vD1wok6CQpVQawMDB",
                        "ATX_JURISDICTION_CODE_PREFIX": "USTJ7",
                        "ATX_LEGAL_ENTITY_ID": "300000002080003",
                        "createdAt": "2022-08-03T20:30:19.269Z",
                        "ATX_TAX_REGIME_CODE": "AVATAX US7 SALES AND USE TAX",
                        "createdBy": "cFTk3vD1wok6CQpVQawMDB",
                        "ATX_COMPANY_CODE": "FUSION-OCICFG",
                        "ATX_TAX_MODULE": "USSL",
                        "id": "bycJzFDs8MAKLcawBSzXEU",
                        "ATX_LEGAL_ENTITY_NAME": "Smart ERP Solutions Inc.",
                        "updatedAt": "2022-08-08T23:12:28.853Z",
                        "ATX_COUNTRY": "US"
                    },
                    {
                        "updatedBy": "cFTk3vD1wok6CQpVQawMDB",
                        "ATX_JURISDICTION_CODE_PREFIX": "USTJ7",
                        "ATX_LEGAL_ENTITY_ID": "300000039824238",
                        "createdAt": "2022-08-03T20:30:19.519Z",
                        "ATX_TAX_REGIME_CODE": "AVATAX US7 SALES AND USE TAX",
                        "createdBy": "cFTk3vD1wok6CQpVQawMDB",
                        "ATX_COMPANY_CODE": "FUSION-OCICFG-US2LE",
                        "ATX_TAX_MODULE": "USSL",
                        "id": "cB2tQFakJUxtVNYJ3g8Vw1",
                        "ATX_LEGAL_ENTITY_NAME": "Smart ERP US2 LE",
                        "updatedAt": "2022-08-08T23:12:28.856Z",
                        "ATX_COUNTRY": "US"
                    }
                ],
                "ATX_BUSINESS_UNIT_REGIME_SUBSCRIPTION": [
                    {
                        "createdAt": "2022-08-09T00:09:59.660Z",
                        "ATX_BUSINESS_UNIT_ORGANIZATION_ID": "300000011107181",
                        "createdBy": "cFTk3vD1wok6CQpVQawMDB",
                        "ATX_APPLICATION_TYPE": "O2C",
                        "id": "vjLJZuRXhnQh4xU8Zz5heB",
                        "ATX_COUNTRY": "AUS"
                    },
                    {
                        "createdAt": "2022-08-09T00:10:27.011Z",
                        "ATX_BUSINESS_UNIT_ORGANIZATION_ID": "300000011107181",
                        "createdBy": "cFTk3vD1wok6CQpVQawMDB",
                        "ATX_APPLICATION_TYPE": "P2P",
                        "id": "4ASNiVBmcdBsKJUTjkL4eY",
                        "ATX_COUNTRY": "AUS"
                    },
                    {
                        "createdAt": "2022-08-09T00:11:15.863Z",
                        "ATX_BUSINESS_UNIT_ORGANIZATION_ID": "300000011107181",
                        "createdBy": "cFTk3vD1wok6CQpVQawMDB",
                        "ATX_APPLICATION_TYPE": "O2C",
                        "id": "uctQBHACLnKzeoGmm2Qqvc",
                        "ATX_COUNTRY": "CA"
                    },
                    {
                        "createdAt": "2022-08-09T00:11:27.896Z",
                        "ATX_BUSINESS_UNIT_ORGANIZATION_ID": "300000011107181",
                        "createdBy": "cFTk3vD1wok6CQpVQawMDB",
                        "ATX_APPLICATION_TYPE": "P2P",
                        "id": "swEwH7rd28ZYtGA8QaPJrN",
                        "ATX_COUNTRY": "CA"
                    }
                ],
                "ATX_AP_TOLERANCE": {
                    "createdAt": "2022-08-08T23:27:58.611Z",
                    "ATX_BUSINESS_UNIT_ORGANIZATION_ID": "300000011107181",
                    "createdBy": "cFTk3vD1wok6CQpVQawMDB",
                    "ATX_TOLERANCE_PERCENT": "0.00",
                    "id": "sKLXLp489o7rsVWhpiDt8H",
                    "ATX_TOLERANCE_AMOUNT": "0.00"
                }
            },
            {
                "ATX_BUSINESS_UNIT": "AppKnit US BU",
                "createdAt": "2022-08-03T20:30:18.314Z",
                "updatedBy": "cFTk3vD1wok6CQpVQawMDB",
                "ATX_BUSINESS_UNIT_ORGANIZATION_ID": "300000011481057",
                "createdBy": "cFTk3vD1wok6CQpVQawMDB",
                "id": "xkrhy9jwGrFC8xzmdLaqXK",
                "FIRST_PARTY_ORG_ID": "300000011343035",
                "updatedAt": "2022-08-08T23:12:28.859Z",
                "ATX_CUSTOMER_LEGAL_ENTITIES": [
                    {
                        "updatedBy": "cFTk3vD1wok6CQpVQawMDB",
                        "ATX_JURISDICTION_CODE_PREFIX": "USTJ",
                        "ATX_LEGAL_ENTITY_ID": "300000011342033",
                        "createdAt": "2022-08-03T20:30:18.627Z",
                        "ATX_TAX_REGIME_CODE": "AVATAX US SALES AND USE TAX",
                        "createdBy": "cFTk3vD1wok6CQpVQawMDB",
                        "ATX_COMPANY_CODE": "FUSION-OCICFG",
                        "ATX_TAX_MODULE": "USSL",
                        "id": "9BBjTofkaqMTiE8HiYtqJ4",
                        "ATX_LEGAL_ENTITY_NAME": "Appknit US LE",
                        "updatedAt": "2022-08-08T23:12:28.862Z",
                        "ATX_COUNTRY": "US"
                    }
                ],
                "ATX_BUSINESS_UNIT_REGIME_SUBSCRIPTION": [],
                "ATX_AP_TOLERANCE": {}
            }
        ],
        "ATX_COUNTRIES": [
            {
                "createdAt": "2022-08-09T15:07:18.913Z",
                "updatedBy": "cFTk3vD1wok6CQpVQawMDB",
                "createdBy": "cFTk3vD1wok6CQpVQawMDB",
                "id": "2vczLcaZcQCebt5wEycJGf",
                "updatedAt": "2022-08-09T15:09:32.887Z",
                "ATX_COUNTRY": "CA",
                "ATX_COUNTRIES_REGIME_DETAILS": [
                    {
                        "createdAt": "2022-08-09T15:09:33.085Z",
                        "ATX_TAX_REGIME_CODE": "AVATAX CA OUTPUT2 QST",
                        "createdBy": "cFTk3vD1wok6CQpVQawMDB",
                        "id": "avoUprh2oiU5ZynjB4pNbJ",
                        "ATX_APPLICATION": "AR",
                        "ATX_TAX_CODE": "CA OUTPUT2 QST",
                        "ATX_COUNTRY": "CA"
                    },
                    {
                        "createdAt": "2022-08-09T15:09:33.018Z",
                        "ATX_TAX_REGIME_CODE": "AVATAX CA INPUT2 PST",
                        "createdBy": "cFTk3vD1wok6CQpVQawMDB",
                        "id": "rLoMBYwwaswksu4DQi9Tpy",
                        "ATX_APPLICATION": "AP",
                        "ATX_TAX_CODE": "CA INPUT2 PST",
                        "ATX_COUNTRY": "CA"
                    },
                    {
                        "createdAt": "2022-08-09T15:09:32.981Z",
                        "ATX_TAX_REGIME_CODE": "AVATAX CA INPUT2 GST",
                        "createdBy": "cFTk3vD1wok6CQpVQawMDB",
                        "id": "uUCg9AqrDqPAdb1FBJYVmq",
                        "ATX_APPLICATION": "AP",
                        "ATX_TAX_CODE": "CA INPUT2 GST",
                        "ATX_COUNTRY": "CA"
                    },
                    {
                        "createdAt": "2022-08-09T15:09:33.021Z",
                        "ATX_TAX_REGIME_CODE": "AVATAX CA INPUT2 QST",
                        "createdBy": "cFTk3vD1wok6CQpVQawMDB",
                        "id": "pGKnZcdanrrjAAwTm5xFRc",
                        "ATX_APPLICATION": "AP",
                        "ATX_TAX_CODE": "CA INPUT2 QST",
                        "ATX_COUNTRY": "CA"
                    },
                    {
                        "createdAt": "2022-08-09T15:09:33.014Z",
                        "ATX_TAX_REGIME_CODE": "AVATAX CA INPUT2 HST",
                        "createdBy": "cFTk3vD1wok6CQpVQawMDB",
                        "id": "eSMBEfBeNWzphQ6BBrX3Qk",
                        "ATX_APPLICATION": "AP",
                        "ATX_TAX_CODE": "CA INPUT2 HST",
                        "ATX_COUNTRY": "CA"
                    },
                    {
                        "createdAt": "2022-08-09T15:09:33.024Z",
                        "ATX_TAX_REGIME_CODE": "AVATAX CA OUTPUT2 GST",
                        "createdBy": "cFTk3vD1wok6CQpVQawMDB",
                        "id": "aDpNbEreVuZVRBRamckZCz",
                        "ATX_APPLICATION": "AR",
                        "ATX_TAX_CODE": "CA OUTPUT2 GST",
                        "ATX_COUNTRY": "CA"
                    },
                    {
                        "createdAt": "2022-08-09T15:09:33.082Z",
                        "ATX_TAX_REGIME_CODE": "AVATAX CA OUTPUT2 PST",
                        "createdBy": "cFTk3vD1wok6CQpVQawMDB",
                        "id": "sxLY2G37cdonhQKN9Luceb",
                        "ATX_APPLICATION": "AR",
                        "ATX_TAX_CODE": "CA OUTPUT2 PST",
                        "ATX_COUNTRY": "CA"
                    },
                    {
                        "createdAt": "2022-08-09T15:09:33.027Z",
                        "ATX_TAX_REGIME_CODE": "AVATAX CA OUTPUT2 HST",
                        "createdBy": "cFTk3vD1wok6CQpVQawMDB",
                        "id": "2jjgLzoNzVTTiaZ6385ofm",
                        "ATX_APPLICATION": "AR",
                        "ATX_TAX_CODE": "CA OUTPUT2 HST",
                        "ATX_COUNTRY": "CA"
                    }
                ]
            },
            {
                "createdAt": "2022-08-08T23:29:55.817Z",
                "updatedBy": "cFTk3vD1wok6CQpVQawMDB",
                "createdBy": "cFTk3vD1wok6CQpVQawMDB",
                "id": "8Jy1VzVCW9vLdvJMYmbF3u",
                "updatedAt": "2022-08-08T23:36:47.852Z",
                "ATX_COUNTRY": "AUS",
                "ATX_COUNTRIES_REGIME_DETAILS": [
                    {
                        "createdAt": "2022-08-08T23:35:19.865Z",
                        "ATX_TAX_REGIME_CODE": "AVATAX AU INPUT GST",
                        "createdBy": "cFTk3vD1wok6CQpVQawMDB",
                        "ATX_JURISDICTION_CODE_PREFIX": "AUTJ",
                        "id": "qedCWtGJPwwKm3i2t6eDGm",
                        "ATX_APPLICATION": "AP",
                        "ATX_TAX_CODE": "AU INPUT GST",
                        "ATX_COUNTRY": "AUS"
                    },
                    {
                        "createdAt": "2022-08-08T23:35:19.868Z",
                        "ATX_TAX_REGIME_CODE": "AVATAX AU OUTPUT GST",
                        "createdBy": "cFTk3vD1wok6CQpVQawMDB",
                        "ATX_JURISDICTION_CODE_PREFIX": "AUTJ",
                        "id": "14c4zoPCbKFWtfYQZ332RM",
                        "ATX_APPLICATION": "AR",
                        "ATX_TAX_CODE": "AU OUTPUT GST",
                        "ATX_COUNTRY": "AUS"
                    }
                ]
            }
        ],
        "ATX_FIELD_MAPPING": [
            {
                "ATX_FIELD": "CustomerCode",
                "createdAt": "2022-08-25T00:46:07.101Z",
                "id": "jASC9cozbDw8wLQNpaUZ3q",
                "ATX_APPLICATION": "AP",
                "createdBy": "cFTk3vD1wok6CQpVQawMDB",
                "ATX_FIELD_MAPPING_PRIORITY": [
                    {
                        "createdAt": "2022-08-25T00:46:07.120Z",
                        "id": "gLVJUWUeeiEcR2peYfwh5v",
                        "createdBy": "cFTk3vD1wok6CQpVQawMDB",
                        "ATX_PRIORITY": "10",
                        "ATX_FUSION_FIELD": "VendorNumber",
                        "ATX_FUSION_FIELD_TYPE": "FFLD",
                        "ATX_FUSION_PROP_COLUMN_NAME": "ns:VendorNumber"
                    }
                ]
            },
            {
                "ATX_FIELD": "ITEMCODE",
                "createdAt": "2022-08-25T00:49:21.736Z",
                "id": "ws6Ahp6fhNYrtkMeU8fb1F",
                "ATX_APPLICATION": "AP",
                "createdBy": "cFTk3vD1wok6CQpVQawMDB",
                "ATX_FIELD_MAPPING_PRIORITY": [
                    {
                        "createdAt": "2022-08-25T00:49:21.807Z",
                        "id": "vaddjvN7NnVZTFUZT4BA9d",
                        "createdBy": "cFTk3vD1wok6CQpVQawMDB",
                        "ATX_PRIORITY": "20",
                        "ATX_FUSION_FIELD": "ProductCategory",
                        "ATX_FUSION_FIELD_TYPE": "FFLD",
                        "ATX_FUSION_PROP_COLUMN_NAME": "ns:ProductCategory"
                    },
                    {
                        "createdAt": "2022-08-25T00:49:21.814Z",
                        "id": "aZpiUxkZLfSkUqJu3ujZ5Z",
                        "createdBy": "cFTk3vD1wok6CQpVQawMDB",
                        "ATX_PRIORITY": "30",
                        "ATX_FUSION_FIELD": "PurchasingCategoryID",
                        "ATX_FUSION_FIELD_TYPE": "FFLD",
                        "ATX_FUSION_PROP_COLUMN_NAME": "ns:PurchasingCategoryID"
                    },
                    {
                        "createdAt": "2022-08-25T00:49:21.821Z",
                        "id": "nTcXEzohVwtWVCrLoCaEP6",
                        "createdBy": "cFTk3vD1wok6CQpVQawMDB",
                        "ATX_PRIORITY": "40",
                        "ATX_FUSION_FIELD": "ProductFiscClassification",
                        "ATX_FUSION_FIELD_TYPE": "FFLD",
                        "ATX_FUSION_PROP_COLUMN_NAME": "ns:ProductFiscClassification"
                    },
                    {
                        "createdAt": "2022-08-25T00:49:21.767Z",
                        "id": "mMPAkFnMnsi6caLShdoFLK",
                        "createdBy": "cFTk3vD1wok6CQpVQawMDB",
                        "ATX_PRIORITY": "5",
                        "ATX_FUSION_FIELD": "ProductCode",
                        "ATX_FUSION_FIELD_TYPE": "FFLD",
                        "ATX_FUSION_PROP_COLUMN_NAME": "ns:ProductCode"
                    },
                    {
                        "createdAt": "2022-08-25T00:49:21.800Z",
                        "id": "cPLFB2sGByPV2U7g6VN1us",
                        "createdBy": "cFTk3vD1wok6CQpVQawMDB",
                        "ATX_PRIORITY": "15",
                        "ATX_FUSION_FIELD": "UserDefinedFiscClass",
                        "ATX_FUSION_FIELD_TYPE": "FFLD",
                        "ATX_FUSION_PROP_COLUMN_NAME": "ns:UserDefinedFiscClass"
                    }
                ]
            },
            {
                "ATX_FIELD": "ref1",
                "createdAt": "2022-08-25T00:54:51.748Z",
                "id": "kC86b9UMendtHYK4hpL4qa",
                "ATX_APPLICATION": "AP",
                "createdBy": "cFTk3vD1wok6CQpVQawMDB",
                "ATX_FIELD_MAPPING_PRIORITY": [
                    {
                        "createdAt": "2022-08-25T00:54:51.781Z",
                        "id": "xf29dnamrQd4mj7WaPzpte",
                        "createdBy": "cFTk3vD1wok6CQpVQawMDB",
                        "ATX_PRIORITY": "10",
                        "ATX_FUSION_FIELD": "ProductType",
                        "ATX_FUSION_FIELD_TYPE": "FFLD",
                        "ATX_FUSION_PROP_COLUMN_NAME": "ns:ProductType",
                        "ATX_FUSION_FIELD_LEVEL": "LINE"
                    }
                ]
            },
            {
                "ATX_FIELD": "CustomerCode",
                "createdAt": "2022-08-25T00:55:38.974Z",
                "id": "qhbDGNciKYE2taSE8haWt1",
                "ATX_APPLICATION": "AR",
                "createdBy": "cFTk3vD1wok6CQpVQawMDB",
                "ATX_FIELD_MAPPING_PRIORITY": [
                    {
                        "createdAt": "2022-08-25T00:55:38.997Z",
                        "id": "kHkGXV9CJrViJBAfxRt2QJ",
                        "createdBy": "cFTk3vD1wok6CQpVQawMDB",
                        "ATX_PRIORITY": "10",
                        "ATX_FUSION_FIELD": "CustomerAccountNumber"
                    }
                ]
            },
            {
                "ATX_FIELD": "ITEMCODE",
                "createdAt": "2022-08-25T00:57:42.617Z",
                "updatedBy": "cFTk3vD1wok6CQpVQawMDB",
                "createdBy": "cFTk3vD1wok6CQpVQawMDB",
                "id": "12vFyA2FfrCdvMhQWWC4B5",
                "ATX_APPLICATION": "AR",
                "updatedAt": "2022-08-25T19:32:27.413Z",
                "ATX_FIELD_MAPPING_PRIORITY": [
                    {
                        "createdAt": "2022-08-25T00:57:42.687Z",
                        "updatedBy": "cFTk3vD1wok6CQpVQawMDB",
                        "createdBy": "cFTk3vD1wok6CQpVQawMDB",
                        "ATX_FUSION_FIELD_TYPE": "FFLD",
                        "ATX_PRIORITY": "30",
                        "id": "cj7jCJdqjftTtFrwhxTEro",
                        "ATX_FUSION_PROP_COLUMN_NAME": "ns:ProductFiscClassification",
                        "updatedAt": "2022-08-25T19:32:27.435Z",
                        "ATX_FUSION_FIELD": "ProductFiscClassification"
                    },
                    {
                        "createdAt": "2022-08-25T00:57:42.640Z",
                        "id": "eY34gzMPoXZZ8gcg6SPaea",
                        "createdBy": "cFTk3vD1wok6CQpVQawMDB",
                        "ATX_PRIORITY": "10",
                        "ATX_FUSION_FIELD": "MemoLine",
                        "ATX_FUSION_FIELD_TYPE": "FADD",
                        "ATX_FUSION_PROP_COLUMN_NAME": "CHAR1_LINE_MEMO_LINE",
                        "ATX_FUSION_FIELD_LEVEL": "LINE",
                        "ATX_REPORT_NAME": "AVALARA_AdditionalData_222"
                    },
                    {
                        "createdAt": "2022-08-25T00:57:42.699Z",
                        "id": "2qnvyaDrSa413WRSBESxQZ",
                        "createdBy": "cFTk3vD1wok6CQpVQawMDB",
                        "ATX_PRIORITY": "40",
                        "ATX_FUSION_FIELD": "UserDefinedFiscClass",
                        "ATX_FUSION_FIELD_TYPE": "FFLD",
                        "ATX_FUSION_PROP_COLUMN_NAME": "ns:UserDefinedFiscClass"
                    },
                    {
                        "createdAt": "2022-08-25T00:57:42.679Z",
                        "updatedBy": "cFTk3vD1wok6CQpVQawMDB",
                        "createdBy": "cFTk3vD1wok6CQpVQawMDB",
                        "ATX_FUSION_FIELD_TYPE": "FFLD",
                        "ATX_PRIORITY": "20",
                        "id": "i9kuxWBNzFFdcGKUkCuhdQ",
                        "ATX_FUSION_PROP_COLUMN_NAME": "ns:ProductCode",
                        "updatedAt": "2022-08-25T19:32:27.491Z",
                        "ATX_FUSION_FIELD": "ProductCode"
                    },
                    {
                        "createdAt": "2022-08-25T00:57:42.762Z",
                        "id": "efSHAEJ3FW4TiUqz6hhB5g",
                        "createdBy": "cFTk3vD1wok6CQpVQawMDB",
                        "ATX_PRIORITY": "50",
                        "ATX_FUSION_FIELD": "ProductCategory",
                        "ATX_FUSION_FIELD_TYPE": "FFLD",
                        "ATX_FUSION_PROP_COLUMN_NAME": "ns:ProductCategory"
                    }
                ]
            },
            {
                "ATX_FIELD": "ref1",
                "createdAt": "2022-08-25T00:58:56.488Z",
                "id": "iy1N9p5NbbyJfiu9cGrVPW",
                "ATX_APPLICATION": "AR",
                "createdBy": "cFTk3vD1wok6CQpVQawMDB",
                "ATX_FIELD_MAPPING_PRIORITY": [
                    {
                        "createdAt": "2022-08-25T00:58:56.513Z",
                        "id": "bkKjLgE8XvPLFVnbJHc7e7",
                        "createdBy": "cFTk3vD1wok6CQpVQawMDB",
                        "ATX_PRIORITY": "10",
                        "ATX_FUSION_FIELD": "ProductType",
                        "ATX_FUSION_FIELD_TYPE": "FFLD",
                        "ATX_FUSION_PROP_COLUMN_NAME": "ns:ProductType",
                        "ATX_FUSION_FIELD_LEVEL": "LINE"
                    }
                ]
            },
            {
                "ATX_FIELD": "ref2",
                "createdAt": "2022-08-25T01:00:35.166Z",
                "id": "gZTXP1gp8uRUNkSddwMnAA",
                "ATX_APPLICATION": "AR",
                "createdBy": "cFTk3vD1wok6CQpVQawMDB",
                "ATX_FIELD_MAPPING_PRIORITY": [
                    {
                        "createdAt": "2022-08-25T01:00:35.191Z",
                        "id": "fWdKa6HRT2JR1hYKL5883u",
                        "createdBy": "cFTk3vD1wok6CQpVQawMDB",
                        "ATX_PRIORITY": "10",
                        "ATX_FUSION_FIELD": "SEZ_OR_HSS",
                        "ATX_FUSION_FIELD_TYPE": "FADD",
                        "ATX_FUSION_PROP_COLUMN_NAME": "SEZ_OR_HSS",
                        "ATX_FUSION_FIELD_LEVEL": "HDR",
                        "ATX_REPORT_NAME": "AVALARA_AdditionalData_222"
                    },
                    {
                        "createdAt": "2022-08-25T01:00:35.231Z",
                        "id": "oBHiR1gyu2Mmspz9KkKfib",
                        "createdBy": "cFTk3vD1wok6CQpVQawMDB",
                        "ATX_FUSION_FIELD": "ProductFiscClassification",
                        "ATX_FUSION_FIELD_TYPE": "FFLD",
                        "ATX_FUSION_PROP_COLUMN_NAME": "ns:ProductFiscClassification"
                    }
                ]
            },
            {
                "ATX_FIELD": "revenueAccount",
                "createdAt": "2022-08-25T01:01:34.210Z",
                "id": "nmEswxNoGtPbguKzb6MXgv",
                "ATX_APPLICATION": "AR",
                "createdBy": "cFTk3vD1wok6CQpVQawMDB",
                "ATX_FIELD_MAPPING_PRIORITY": [
                    {
                        "createdAt": "2022-08-25T01:01:34.235Z",
                        "id": "2wPTtPNrtGKWhsWXRdGT93",
                        "createdBy": "cFTk3vD1wok6CQpVQawMDB",
                        "ATX_PRIORITY": "10",
                        "ATX_FUSION_FIELD": "AccountString",
                        "ATX_FUSION_FIELD_TYPE": "FFLD",
                        "ATX_FUSION_PROP_COLUMN_NAME": "ns:AccountString"
                    }
                ]
            },
            {
                "ATX_FIELD": "taxCode",
                "createdAt": "2022-08-25T01:02:24.324Z",
                "id": "m9HARvzbCrRP6ZePhdpFS9",
                "ATX_APPLICATION": "AR",
                "createdBy": "cFTk3vD1wok6CQpVQawMDB",
                "ATX_FIELD_MAPPING_PRIORITY": [
                    {
                        "createdAt": "2022-08-25T01:02:24.367Z",
                        "id": "hB5kDHLA2vMmcJZufUXLDc",
                        "createdBy": "cFTk3vD1wok6CQpVQawMDB",
                        "ATX_PRIORITY": "10",
                        "ATX_FUSION_FIELD": "TAXCODE",
                        "ATX_FUSION_FIELD_TYPE": "FADD",
                        "ATX_FUSION_PROP_COLUMN_NAME": "TAXCODE",
                        "ATX_FUSION_FIELD_LEVEL": "LINE",
                        "ATX_REPORT_NAME": "AVALARA_AdditionalData_222"
                    }
                ]
            },
            {
                "ATX_FIELD": "CustomerCode",
                "createdAt": "2022-08-25T01:03:55.298Z",
                "id": "qSe8y7NbWphdMmLYXPNysE",
                "ATX_APPLICATION": "ONT",
                "createdBy": "cFTk3vD1wok6CQpVQawMDB",
                "ATX_FIELD_MAPPING_PRIORITY": [
                    {
                        "createdAt": "2022-08-25T01:03:55.323Z",
                        "id": "pd79B8y1JAK9NcBujp2sZu",
                        "createdBy": "cFTk3vD1wok6CQpVQawMDB",
                        "ATX_PRIORITY": "10",
                        "ATX_FUSION_FIELD": "CustomerAccountNumber"
                    }
                ]
            },
            {
                "ATX_FIELD": "ITEMCODE",
                "createdAt": "2022-08-25T01:05:28.695Z",
                "id": "gRJUaAxP2kD64929DcskTT",
                "ATX_APPLICATION": "ONT",
                "createdBy": "cFTk3vD1wok6CQpVQawMDB",
                "ATX_FIELD_MAPPING_PRIORITY": [
                    {
                        "createdAt": "2022-08-25T01:05:28.761Z",
                        "id": "eGj1HV99ngerssVaoJbKNT",
                        "createdBy": "cFTk3vD1wok6CQpVQawMDB",
                        "ATX_PRIORITY": "20",
                        "ATX_FUSION_FIELD": "UserDefinedFiscClass",
                        "ATX_FUSION_FIELD_TYPE": "FFLD",
                        "ATX_FUSION_PROP_COLUMN_NAME": "ns:UserDefinedFiscClass"
                    },
                    {
                        "createdAt": "2022-08-25T01:05:28.717Z",
                        "id": "bnzxmgnjK94XhqFzA8kZX8",
                        "createdBy": "cFTk3vD1wok6CQpVQawMDB",
                        "ATX_PRIORITY": "10",
                        "ATX_FUSION_FIELD": "ProductFiscClassification",
                        "ATX_FUSION_FIELD_TYPE": "FFLD",
                        "ATX_FUSION_PROP_COLUMN_NAME": "ns:ProductFiscClassification"
                    },
                    {
                        "createdAt": "2022-08-25T01:05:28.776Z",
                        "id": "7GmDw8NExBHEbpVNEX1cS5",
                        "createdBy": "cFTk3vD1wok6CQpVQawMDB",
                        "ATX_PRIORITY": "40",
                        "ATX_FUSION_FIELD": "ProductCode",
                        "ATX_FUSION_FIELD_TYPE": "FFLD",
                        "ATX_FUSION_PROP_COLUMN_NAME": "ns:ProductCode"
                    },
                    {
                        "createdAt": "2022-08-25T01:05:28.769Z",
                        "id": "dxAsvZK5gDFF9d3ZBo4uzP",
                        "createdBy": "cFTk3vD1wok6CQpVQawMDB",
                        "ATX_PRIORITY": "30",
                        "ATX_FUSION_FIELD": "ProductCategory",
                        "ATX_FUSION_FIELD_TYPE": "FFLD",
                        "ATX_FUSION_PROP_COLUMN_NAME": "ns:ProductCategory"
                    }
                ]
            },
            {
                "ATX_FIELD": "MISCCODE",
                "createdAt": "2022-08-25T01:06:20.026Z",
                "id": "mDo5yxw6g9ZyjCFr5KScAX",
                "ATX_APPLICATION": "ONT",
                "createdBy": "cFTk3vD1wok6CQpVQawMDB",
                "ATX_FIELD_MAPPING_PRIORITY": [
                    {
                        "createdAt": "2022-08-25T01:06:20.057Z",
                        "id": "smjWWyqHN5fXYT7j6AEGrG",
                        "createdBy": "cFTk3vD1wok6CQpVQawMDB",
                        "ATX_PRIORITY": "10",
                        "ATX_FUSION_FIELD": "Miscellaneous 2"
                    }
                ]
            },
            {
                "ATX_FIELD": "ref1",
                "createdAt": "2022-08-25T01:06:51.942Z",
                "id": "6qfmXDRPFVshEvETZsN8dm",
                "ATX_APPLICATION": "ONT",
                "createdBy": "cFTk3vD1wok6CQpVQawMDB",
                "ATX_FIELD_MAPPING_PRIORITY": [
                    {
                        "createdAt": "2022-08-25T01:06:51.962Z",
                        "id": "nF1Gjp4X8grAfukfZf47nB",
                        "createdBy": "cFTk3vD1wok6CQpVQawMDB",
                        "ATX_PRIORITY": "10",
                        "ATX_FUSION_FIELD": "ProductCategory",
                        "ATX_FUSION_FIELD_TYPE": "FFLD",
                        "ATX_FUSION_PROP_COLUMN_NAME": "ns:ProductCategory"
                    }
                ]
            },
            {
                "ATX_FIELD": "ITEMCODE",
                "createdAt": "2022-08-25T01:20:01.525Z",
                "id": "jRTd6k18KKa1wWacM8LGri",
                "ATX_APPLICATION": "PO",
                "createdBy": "cFTk3vD1wok6CQpVQawMDB",
                "ATX_FIELD_MAPPING_PRIORITY": [
                    {
                        "createdAt": "2022-08-25T01:20:01.582Z",
                        "id": "vg4h3Bn55ERDDVmoVzeM6Z",
                        "createdBy": "cFTk3vD1wok6CQpVQawMDB",
                        "ATX_PRIORITY": "30",
                        "ATX_FUSION_FIELD": "PurchasingCategoryID",
                        "ATX_FUSION_FIELD_TYPE": "FFLD",
                        "ATX_FUSION_PROP_COLUMN_NAME": "ns:PurchasingCategoryID"
                    },
                    {
                        "createdAt": "2022-08-25T01:20:01.575Z",
                        "id": "nGhkGYuPwfKDhqgZ8FmAUS",
                        "createdBy": "cFTk3vD1wok6CQpVQawMDB",
                        "ATX_PRIORITY": "20",
                        "ATX_FUSION_FIELD": "ProductCategory",
                        "ATX_FUSION_FIELD_TYPE": "FFLD",
                        "ATX_FUSION_PROP_COLUMN_NAME": "ns:ProductCategory"
                    },
                    {
                        "createdAt": "2022-08-25T01:20:01.594Z",
                        "id": "rYuCHVCVrDRf9cuT2tyhFu",
                        "createdBy": "cFTk3vD1wok6CQpVQawMDB",
                        "ATX_PRIORITY": "40",
                        "ATX_FUSION_FIELD": "ProductFiscClassification",
                        "ATX_FUSION_FIELD_TYPE": "FFLD",
                        "ATX_FUSION_PROP_COLUMN_NAME": "ns:ProductFiscClassification"
                    },
                    {
                        "createdAt": "2022-08-25T01:20:01.602Z",
                        "id": "xhJ6HpPDwWUnjvuBMp4sX3",
                        "createdBy": "cFTk3vD1wok6CQpVQawMDB",
                        "ATX_PRIORITY": "60",
                        "ATX_FUSION_FIELD": "UserDefinedFiscClass",
                        "ATX_FUSION_FIELD_TYPE": "FFLD",
                        "ATX_FUSION_PROP_COLUMN_NAME": "ns:UserDefinedFiscClass"
                    },
                    {
                        "createdAt": "2022-08-25T01:20:01.545Z",
                        "id": "p6f2dYVx7W6YnJrqdK86C6",
                        "createdBy": "cFTk3vD1wok6CQpVQawMDB",
                        "ATX_PRIORITY": "10",
                        "ATX_FUSION_FIELD": "ProductCode",
                        "ATX_FUSION_FIELD_TYPE": "FFLD",
                        "ATX_FUSION_PROP_COLUMN_NAME": "ns:ProductCode"
                    }
                ]
            }
        ],
        "ATX_DOC_SEQUENCE_USAGE": [
            {
                "createdAt": "2022-08-09T15:15:07.037Z",
                "ATX_BATCH_SOURCE_NAME": "FBDI3 NEW",
                "ATX_DOCUMENT_SEQUENCE_USED": true,
                "id": "5dWKUNpxg3372iMT2uKFct",
                "createdBy": "cFTk3vD1wok6CQpVQawMDB"
            },
            {
                "createdAt": "2022-08-09T15:15:39.405Z",
                "ATX_BATCH_SOURCE_NAME": "Manual w Doc Seq.",
                "ATX_DOCUMENT_SEQUENCE_USED": true,
                "id": "fCsuwzRS69KUDG6J4CiySA",
                "createdBy": "cFTk3vD1wok6CQpVQawMDB"
            },
            {
                "createdAt": "2022-08-09T15:16:46.334Z",
                "ATX_BATCH_SOURCE_NAME": "Manual w Doc Sequencing",
                "ATX_DOCUMENT_SEQUENCE_USED": true,
                "id": "vRm9p4fhgfwEN88DD94yXk",
                "createdBy": "cFTk3vD1wok6CQpVQawMDB"
            },
            {
                "createdAt": "2022-08-09T15:16:59.220Z",
                "ATX_BATCH_SOURCE_NAME": "SERP Manual Doc Seq.",
                "ATX_DOCUMENT_SEQUENCE_USED": true,
                "id": "4PyxasVKcYjMLttCqbiM8R",
                "createdBy": "cFTk3vD1wok6CQpVQawMDB"
            },
            {
                "createdAt": "2022-08-09T15:17:13.934Z",
                "ATX_BATCH_SOURCE_NAME": "test",
                "id": "mRbyKwpmPwxyyqgqHs76bK",
                "createdBy": "cFTk3vD1wok6CQpVQawMDB"
            },
            {
                "createdAt": "2022-08-09T00:08:33.629Z",
                "ATX_BATCH_SOURCE_NAME": "CM FBDI3",
                "ATX_DOCUMENT_SEQUENCE_USED": true,
                "id": "5jUKVRvnmamd4UzGYLgpom",
                "createdBy": "cFTk3vD1wok6CQpVQawMDB"
            },
            {
                "createdAt": "2022-08-09T00:13:55.381Z",
                "ATX_BATCH_SOURCE_NAME": "Distributed Order Orchestration",
                "id": "oJjAM8XCzSQ4P4dB4dsbvA",
                "createdBy": "cFTk3vD1wok6CQpVQawMDB"
            },
            {
                "createdAt": "2022-08-09T00:17:56.689Z",
                "ATX_BATCH_SOURCE_NAME": "FBDI3",
                "ATX_DOCUMENT_SEQUENCE_USED": true,
                "id": "fNZQXGqAcqDPJf4TDkhrkr",
                "createdBy": "cFTk3vD1wok6CQpVQawMDB"
            }
        ],
        "ATX_TXN_TYPE_TAX_CALCULATION": [
            {
                "createdAt": "2022-08-08T14:09:57.405Z",
                "ATX_BATCH_SOURCE_NAME": "MANUAL",
                "ATX_TAX_CALCULATED": "Y",
                "ATX_BUSINESS_UNIT_ORGANIZATION_ID": "1057",
                "ATX_TRANSACTION_TYPE_SEQUENCE_ID": "034",
                "createdBy": "cFTk3vD1wok6CQpVQawMDB",
                "ATX_LEGAL_ENTITY_ID": "1033",
                "id": "5G49KykAWZZ3D7xDYRXzo2",
                "ATX_Bill_TO_SAME_ AS_ SHIP_TO": true,
                "ATX_TAX_CODE": "NT",
                "ATX_DOCUMENT_TYPE": "SalesOrder"
            }
        ],
        "ATX_TXN_SOURCE_TAX_CALCULATION": [
            {
                "createdAt": "2022-08-09T06:23:24.481Z",
                "id": "2BqQZZ4T9vP1GNBaeJ3F4q",
                "createdBy": "cFTk3vD1wok6CQpVQawMDB",
                "ATX_INVOICE_SOURCE": "FOS"
            },
            {
                "createdAt": "2022-08-09T06:23:35.591Z",
                "id": "kmTEZ6TKsteG8wBkACXHgD",
                "createdBy": "cFTk3vD1wok6CQpVQawMDB",
                "ATX_INVOICE_SOURCE": "FOS"
            },
            {
                "createdAt": "2022-08-09T06:24:14.152Z",
                "id": "27kydnJiUUTT8SSfLZiYDx",
                "createdBy": "cFTk3vD1wok6CQpVQawMDB",
                "ATX_INVOICE_SOURCE": "SERPS_LEGACY_AP"
            }
        ],
        "ATX_PARAMETER_MAPPING": [
            {
                "ATX_FIELD": "ITEMCODE",
                "createdAt": "2022-08-08T14:11:46.786Z",
                "createdBy": "cFTk3vD1wok6CQpVQawMDB",
                "id": "pzFycE6aphmBGcWkR9DtVy",
                "ATX_APPLICATION": "AP",
                "ATX_FUSION_FIELD": "ProductCategory"
            }
        ],
        "ATX_UDF_MAPPING": [
            {
                "ATX_FIELD": "UDF1",
                "createdAt": "2022-08-25T22:21:55.362Z",
                "ATX_DEFAULT_VALUE": "ORACLE",
                "createdBy": "cFTk3vD1wok6CQpVQawMDB",
                "id": "fLnRCfVYDRQTg5X461oGC2",
                "ATX_APPLICATION": "AP",
                "ATX_FUSION_FIELD": "OracleSourced",
                "ATX_FUSION_FIELD_TYPE": "FFLD",
                "ATX_FUSION_PROP_COLUMN_NAME": "ns:OracleSourced",
                "ATX_FUSION_FIELD_LEVEL": "FFLD"
            },
            {
                "ATX_FIELD": "UDF10",
                "createdAt": "2022-08-25T22:22:17.317Z",
                "createdBy": "cFTk3vD1wok6CQpVQawMDB",
                "id": "wC9QC9bhEoJsAfbLMdgUkR",
                "ATX_APPLICATION": "AP",
                "ATX_FUSION_FIELD": "PurchasingCategoryID",
                "ATX_FUSION_FIELD_TYPE": "FFLD",
                "ATX_FUSION_PROP_COLUMN_NAME": "ns:PurchasingCategoryID",
                "ATX_FUSION_FIELD_LEVEL": "FFLD"
            },
            {
                "ATX_FIELD": "UDF5",
                "createdAt": "2022-08-25T22:22:38.570Z",
                "createdBy": "cFTk3vD1wok6CQpVQawMDB",
                "id": "czN3WWS3S8CiWcX9dLdyhQ",
                "ATX_APPLICATION": "AP",
                "ATX_FUSION_FIELD": "BillToGeographyValue5",
                "ATX_FUSION_FIELD_TYPE": "FFLD",
                "ATX_FUSION_PROP_COLUMN_NAME": "ns:BillToGeographyValue5",
                "ATX_FUSION_FIELD_LEVEL": "FFLD"
            },
            {
                "ATX_FIELD": "UDF7",
                "createdAt": "2022-08-25T22:23:52.307Z",
                "createdBy": "cFTk3vD1wok6CQpVQawMDB",
                "id": "kCKYwFsf6YKkK7upcmecF3",
                "ATX_APPLICATION": "AP",
                "ATX_FUSION_FIELD": "VendorTypeLookupCode",
                "ATX_FUSION_FIELD_TYPE": "FFLD",
                "ATX_FUSION_PROP_COLUMN_NAME": "ns:VendorTypeLookupCode",
                "ATX_FUSION_FIELD_LEVEL": "FFLD"
            },
            {
                "ATX_FIELD": "UDF9",
                "createdAt": "2022-08-25T22:24:16.765Z",
                "createdBy": "cFTk3vD1wok6CQpVQawMDB",
                "id": "25boE93cLs2mU1mkRnc7Ur",
                "ATX_APPLICATION": "AP",
                "ATX_FUSION_FIELD": "ProductType",
                "ATX_FUSION_FIELD_TYPE": "FFLD",
                "ATX_FUSION_PROP_COLUMN_NAME": "ns:ProductType",
                "ATX_FUSION_FIELD_LEVEL": "FFLD"
            },
            {
                "ATX_FIELD": "UDF1",
                "createdAt": "2022-08-25T22:26:21.771Z",
                "ATX_DEFAULT_VALUE": "ORACLE",
                "createdBy": "cFTk3vD1wok6CQpVQawMDB",
                "id": "6FAsUmeoZnqDs9gJsDX4tC",
                "ATX_APPLICATION": "AR",
                "ATX_FUSION_FIELD": "OracleSourced",
                "ATX_FUSION_FIELD_TYPE": "FFLD",
                "ATX_FUSION_PROP_COLUMN_NAME": "ns:OracleSourced",
                "ATX_FUSION_FIELD_LEVEL": "FFLD"
            },
            {
                "ATX_FIELD": "UDF11",
                "createdAt": "2022-08-25T22:26:50.117Z",
                "createdBy": "cFTk3vD1wok6CQpVQawMDB",
                "id": "4Q8PyKgzg69YWsKXLYTxu1",
                "ATX_APPLICATION": "AR",
                "ATX_FUSION_FIELD": "BillToGeographyValue10",
                "ATX_FUSION_FIELD_TYPE": "FFLD",
                "ATX_FUSION_PROP_COLUMN_NAME": "ns:BillToGeographyValue10",
                "ATX_FUSION_FIELD_LEVEL": "FFLD"
            },
            {
                "ATX_FIELD": "UDF12",
                "createdAt": "2022-08-25T22:27:12.451Z",
                "createdBy": "cFTk3vD1wok6CQpVQawMDB",
                "id": "fzw9yyaHzTa9qv6M6A4X5u",
                "ATX_APPLICATION": "AR",
                "ATX_FUSION_FIELD": "UserDefinedFiscClass",
                "ATX_FUSION_FIELD_TYPE": "FFLD",
                "ATX_FUSION_PROP_COLUMN_NAME": "ns:UserDefinedFiscClass",
                "ATX_FUSION_FIELD_LEVEL": "FFLD"
            },
            {
                "ATX_FIELD": "UDF2",
                "createdAt": "2022-08-25T22:27:47.015Z",
                "createdBy": "cFTk3vD1wok6CQpVQawMDB",
                "id": "ajjs98AHauSaTN8zvRrRqh",
                "ATX_APPLICATION": "AR",
                "ATX_FUSION_FIELD": "BusinessSource_Custom",
                "ATX_FUSION_FIELD_TYPE": "FADD",
                "ATX_FUSION_PROP_COLUMN_NAME": "BUSINESS_SOURCE",
                "ATX_FUSION_FIELD_LEVEL": "FADD",
                "ATX_REPORT_NAME": "AVALARA_AdditionalData_222"
            },
            {
                "ATX_FIELD": "UDF3",
                "createdAt": "2022-08-25T22:28:05.177Z",
                "createdBy": "cFTk3vD1wok6CQpVQawMDB",
                "id": "c99gm7Qi1zH8Vo6DmRmuma",
                "ATX_APPLICATION": "AR",
                "ATX_FUSION_FIELD": "BillToGeographyValue1",
                "ATX_FUSION_FIELD_TYPE": "FFLD",
                "ATX_FUSION_PROP_COLUMN_NAME": "ns:BillToGeographyValue1",
                "ATX_FUSION_FIELD_LEVEL": "FFLD"
            },
            {
                "ATX_FIELD": "UDF4",
                "createdAt": "2022-08-25T22:31:27.668Z",
                "createdBy": "cFTk3vD1wok6CQpVQawMDB",
                "id": "it8pJQBVtEDM9DQWcWzxos",
                "ATX_APPLICATION": "AR",
                "ATX_FUSION_FIELD": "MemoLine",
                "ATX_FUSION_FIELD_TYPE": "FADD",
                "ATX_FUSION_PROP_COLUMN_NAME": "CHAR1_LINE_MEMO_LINE",
                "ATX_FUSION_FIELD_LEVEL": "FADD",
                "ATX_REPORT_NAME": "AVALARA_AdditionalData_222"
            },
            {
                "ATX_FIELD": "UDF5",
                "createdAt": "2022-08-25T22:31:46.967Z",
                "createdBy": "cFTk3vD1wok6CQpVQawMDB",
                "id": "91bP23XT1LQokzze3pbTK1",
                "ATX_APPLICATION": "AR",
                "ATX_FUSION_FIELD": "BillToGeographyValue5",
                "ATX_FUSION_FIELD_TYPE": "FFLD",
                "ATX_FUSION_PROP_COLUMN_NAME": "ns:BillToGeographyValue5",
                "ATX_FUSION_FIELD_LEVEL": "FFLD"
            },
            {
                "ATX_FIELD": "UDF6",
                "createdAt": "2022-08-25T22:32:06.597Z",
                "createdBy": "cFTk3vD1wok6CQpVQawMDB",
                "id": "kK1n6Qa45PifNoM9GEBs3y",
                "ATX_APPLICATION": "AR",
                "ATX_FUSION_FIELD": "FobPoint",
                "ATX_FUSION_FIELD_TYPE": "FFLD",
                "ATX_FUSION_PROP_COLUMN_NAME": "ns:FobPoint",
                "ATX_FUSION_FIELD_LEVEL": "FFLD"
            },
            {
                "ATX_FIELD": "UDF9",
                "createdAt": "2022-08-25T22:32:32.519Z",
                "createdBy": "cFTk3vD1wok6CQpVQawMDB",
                "id": "aRpYAyDQ3vGuBNHgzwELCN",
                "ATX_APPLICATION": "ONT",
                "ATX_FUSION_FIELD": "ProductType",
                "ATX_FUSION_FIELD_TYPE": "FFLD",
                "ATX_FUSION_PROP_COLUMN_NAME": "ns:ProductType",
                "ATX_FUSION_FIELD_LEVEL": "FFLD"
            },
            {
                "ATX_FIELD": "UDF10",
                "createdAt": "2022-08-25T22:32:51.057Z",
                "createdBy": "cFTk3vD1wok6CQpVQawMDB",
                "id": "eYDzkLGMAXj33veRy4NwyZ",
                "ATX_APPLICATION": "PO",
                "ATX_FUSION_FIELD": "PurchasingCategoryID",
                "ATX_FUSION_FIELD_TYPE": "FFLD",
                "ATX_FUSION_PROP_COLUMN_NAME": "ns:PurchasingCategoryID",
                "ATX_FUSION_FIELD_LEVEL": "FFLD"
            },
            {
                "ATX_FIELD": "UDF9",
                "createdAt": "2022-08-25T22:33:10.233Z",
                "createdBy": "cFTk3vD1wok6CQpVQawMDB",
                "id": "dd6ZhQdhQ14Li7mbWMwC6W",
                "ATX_APPLICATION": "PO",
                "ATX_FUSION_FIELD": "ProductType",
                "ATX_FUSION_FIELD_TYPE": "FFLD",
                "ATX_FUSION_PROP_COLUMN_NAME": "ns:ProductType",
                "ATX_FUSION_FIELD_LEVEL": "FFLD"
            }
        ],
        "ATX_CONFIG_CODES": [
            {
                "ATX_CONFIG_CODE_STRING_VALUE": "Y",
                "createdAt": "2022-09-05T15:20:33.150Z",
                "id": "pASbgAGE3tDbQW2PnSuJgx",
                "ATX_CONFIG_CODE": "AP_SELF_ASSESS_TAX",
                "createdBy": "cFTk3vD1wok6CQpVQawMDB"
            },
            {
                "ATX_CONFIG_CODE_STRING_VALUE": "N",
                "createdAt": "2022-09-05T15:20:50.592Z",
                "id": "9V1iA5fG3qmbKHxaKV3C3t",
                "ATX_CONFIG_CODE": "BLOCK_AP_SELF_ASSESS_RESP",
                "createdBy": "cFTk3vD1wok6CQpVQawMDB"
            },
            {
                "ATX_CONFIG_CODE_STRING_VALUE": "N",
                "createdAt": "2022-09-05T15:21:04.997Z",
                "id": "8HGvmrDfKkyMfCnGVVmP2G",
                "ATX_CONFIG_CODE": "BLOCK_CUST_TAX_CALC",
                "createdBy": "cFTk3vD1wok6CQpVQawMDB"
            },
            {
                "ATX_CONFIG_CODE_STRING_VALUE": "N",
                "createdAt": "2022-09-05T15:21:31.153Z",
                "id": "upJ24HyvjdLneWHwfgBs2N",
                "ATX_CONFIG_CODE": "BLOCK_OM_TAX_CALC",
                "createdBy": "cFTk3vD1wok6CQpVQawMDB"
            },
            {
                "ATX_CONFIG_CODE_STRING_VALUE": "N",
                "createdAt": "2022-09-05T15:21:45.142Z",
                "id": "a7bLEHCsFuA4xx3ANMJUec",
                "ATX_CONFIG_CODE": "BLOCK_PO_TAX_CALC",
                "createdBy": "cFTk3vD1wok6CQpVQawMDB"
            },
            {
                "ATX_CONFIG_CODE_STRING_VALUE": "N",
                "createdAt": "2022-09-05T15:22:00.800Z",
                "id": "hL3PBue6Sgs6SVyZyktTHe",
                "ATX_CONFIG_CODE": "BULK_FETCH_ADDITIONAL_DATA",
                "createdBy": "cFTk3vD1wok6CQpVQawMDB"
            },
            {
                "ATX_CONFIG_CODE_STRING_VALUE": "Y",
                "createdAt": "2022-09-05T15:22:18.249Z",
                "id": "ry5dxxf7wdZHYiH15g1eXL",
                "ATX_CONFIG_CODE": "CORRECT_VBT_FOR_OC",
                "createdBy": "cFTk3vD1wok6CQpVQawMDB"
            },
            {
                "ATX_CONFIG_CODE_STRING_VALUE": "Y",
                "createdAt": "2022-09-05T15:22:34.727Z",
                "id": "wkj6GNne4SQhSrzVBis7hz",
                "ATX_CONFIG_CODE": "CUSTOM_DUTY_TAX",
                "createdBy": "cFTk3vD1wok6CQpVQawMDB"
            },
            {
                "ATX_CONFIG_CODE_STRING_VALUE": "Y",
                "createdAt": "2022-09-05T15:22:50.398Z",
                "id": "gzr3JEKXQBwr46pk2L6XDM",
                "ATX_CONFIG_CODE": "EXEMPTION_CONTROL_FLAG",
                "createdBy": "cFTk3vD1wok6CQpVQawMDB"
            },
            {
                "ATX_CONFIG_CODE_NUMBER_VALUE": "2",
                "createdAt": "2022-09-05T15:23:12.104Z",
                "id": "57AAk8s48e8f1AGSmrdu55",
                "ATX_CONFIG_CODE": "GL_ACCSTR_ACC_POSN",
                "createdBy": "cFTk3vD1wok6CQpVQawMDB"
            },
            {
                "ATX_CONFIG_CODE_STRING_VALUE": "-",
                "createdAt": "2022-09-05T15:23:26.531Z",
                "id": "ngud3mXH943kGw1BN7xX5H",
                "ATX_CONFIG_CODE": "GL_ACCSTR_SEG_DELIM",
                "createdBy": "cFTk3vD1wok6CQpVQawMDB"
            },
            {
                "ATX_CONFIG_CODE_STRING_VALUE": "N",
                "createdAt": "2022-09-05T15:23:43.358Z",
                "id": "3LWt8Vb1GRKqb5phhdaqrG",
                "ATX_CONFIG_CODE": "IND_AR_SEND_IGST_FOR_SEZ_HSS",
                "createdBy": "cFTk3vD1wok6CQpVQawMDB"
            },
            {
                "createdAt": "2022-09-05T15:23:56.045Z",
                "id": "w2CVXdAV3m5fBeCL57MJKt",
                "ATX_CONFIG_CODE": "LEGACY_TAX_REGIME_CODE",
                "createdBy": "cFTk3vD1wok6CQpVQawMDB"
            },
            {
                "ATX_CONFIG_CODE_STRING_VALUE": "Y",
                "createdAt": "2022-09-05T15:24:09.732Z",
                "id": "vJJ5VAijUGBVSHrqTb5HHL",
                "ATX_CONFIG_CODE": "LOG_XML_PAYLOAD",
                "createdBy": "cFTk3vD1wok6CQpVQawMDB"
            },
            {
                "ATX_CONFIG_CODE_STRING_VALUE": "N",
                "createdAt": "2022-09-05T15:24:27.362Z",
                "id": "uZ7EvgdFVWpiwQKV12FCxH",
                "ATX_CONFIG_CODE": "PROCESS_US_TO_CA_TAXES",
                "createdBy": "cFTk3vD1wok6CQpVQawMDB"
            },
            {
                "ATX_CONFIG_CODE_STRING_VALUE": "Custom/Avalara",
                "createdAt": "2022-09-05T15:24:45.364Z",
                "id": "bz48Nf8QmkeJmumcs4wRRT",
                "ATX_CONFIG_CODE": "REPORT_STAGING_DIR",
                "createdBy": "cFTk3vD1wok6CQpVQawMDB"
            },
            {
                "ATX_CONFIG_CODE_STRING_VALUE": "Y",
                "createdAt": "2022-09-05T15:25:07.403Z",
                "id": "hZMTpRb59jitjDiEuKuznZ",
                "ATX_CONFIG_CODE": "RETURN_LEGACY_TAX_ROW",
                "createdBy": "cFTk3vD1wok6CQpVQawMDB"
            },
            {
                "ATX_CONFIG_CODE_STRING_VALUE": "N",
                "createdAt": "2022-09-05T15:25:22.463Z",
                "id": "qEjbZGye7kHFhgED86Fshw",
                "ATX_CONFIG_CODE": "SEND_SHIP_FROM_AS_POA",
                "createdBy": "cFTk3vD1wok6CQpVQawMDB"
            },
            {
                "ATX_CONFIG_CODE_STRING_VALUE": "N",
                "createdAt": "2022-09-05T15:25:35.729Z",
                "id": "ipapQ8KC2rgnnX7x98YzAc",
                "ATX_CONFIG_CODE": "USE_GL_ACCOUNT_STRING",
                "createdBy": "cFTk3vD1wok6CQpVQawMDB"
            },
            {
                "ATX_CONFIG_CODE_STRING_VALUE": "VENDOR BILLED TAX2",
                "createdAt": "2022-09-05T15:25:55.427Z",
                "id": "tJd63jfpwTmLPyLb73pFLL",
                "ATX_CONFIG_CODE": "VBT_CODE",
                "createdBy": "cFTk3vD1wok6CQpVQawMDB"
            },
            {
                "ATX_CONFIG_CODE_STRING_VALUE": "VENDOR BILLED RATE2",
                "createdAt": "2022-09-05T15:26:10.111Z",
                "id": "rZ1e3a8unx6RRWHLZUpTWW",
                "ATX_CONFIG_CODE": "VBT_RATE_CODE",
                "createdBy": "cFTk3vD1wok6CQpVQawMDB"
            },
            {
                "ATX_CONFIG_CODE_STRING_VALUE": "STANDARD",
                "createdAt": "2022-09-05T15:26:28.443Z",
                "id": "bSW81SUHrtzGrazBwShmCR",
                "ATX_CONFIG_CODE": "VBT_STATUS_CODE",
                "createdBy": "cFTk3vD1wok6CQpVQawMDB"
            },
            {
                "ATX_CONFIG_CODE_STRING_VALUE": "4",
                "createdAt": "2022-09-05T20:18:13.545Z",
                "id": "vpFpKBU4Jk5emSu3F9CZw3",
                "ATX_CONFIG_CODE": "BATCH_FILE_LOOKUP_DAYS",
                "createdBy": "cFTk3vD1wok6CQpVQawMDB"
            }
        ]
    },
    "currentLegalEntity": {
        "updatedBy": "cFTk3vD1wok6CQpVQawMDB",
        "ATX_JURISDICTION_CODE_PREFIX": "USTJ7",
        "ATX_LEGAL_ENTITY_ID": "300000002080003",
        "createdAt": "2022-08-03T20:30:19.269Z",
        "ATX_TAX_REGIME_CODE": "AVATAX US7 SALES AND USE TAX",
        "createdBy": "cFTk3vD1wok6CQpVQawMDB",
        "ATX_COMPANY_CODE": "FUSION-OCICFG",
        "ATX_TAX_MODULE": "USSL",
        "id": "bycJzFDs8MAKLcawBSzXEU",
        "ATX_LEGAL_ENTITY_NAME": "Smart ERP Solutions Inc.",
        "updatedAt": "2022-08-08T23:12:28.853Z",
        "ATX_COUNTRY": "US"
    },
    "vbtTaxAmtDetails": null,
    "isUS2US": true,
    "isUS2CA": null,
    "isCA2CA": null,
    "isIndia": null,
    "isInternational": null
}
let queryCounter = 1
const sdk = new AppknitSDK(null, null, {
    // @ts-ignore
    adhocDataProvider: {
        queryDataRecords: async (query)=>{
            console.log(JSON.stringify(query, null, 2))
            if (queryCounter === 1) {
                queryCounter = queryCounter + 1
                return [
                    {
                        ATX_TAX_CODE: 'STATE',
                        ATX_RATE_CODE: 'STANDARD',
                        ATX_TAX_STATUS_CODE: 'STANDARD',
                        ATX_JURISDICTION_CODE: '-ST-050000000',
                    }
                ]  
            }
            if (queryCounter === 2) {
                queryCounter = queryCounter + 1
                return [
                    {
                        ATX_TAX_CODE: 'COUNTY',
                        ATX_RATE_CODE: 'STANDARD',
                        ATX_TAX_STATUS_CODE: 'STANDARD',
                        ATX_JURISDICTION_CODE: '-CO-050010000',
                    }
                ]  
            }
            return [
                {
                    ATX_TAX_CODE: 'SPECIAL',
                    ATX_RATE_CODE: '_SPECIAL_RATE',
                    ATX_TAX_STATUS_CODE: 'STANDARD',
                    ATX_JURISDICTION_CODE: '-SPECIAL',
                }
            ]
        },
    }
})
extension.flowFunctions.mapToFusionResponse.js(sdk, input).then(result=>console.log(result))

// extension.flowFunctions.mapFusionSoapRequestV2.js(sdk, {body: triggerBody}).then(result=>console.log(result))