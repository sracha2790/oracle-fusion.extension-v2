import { AppknitSDK, SdkExecutionError, SdkGenericErrorCodes } from '@appknit-project/appknit-platform-sdk-v2';
import extension from './index'

const input = {
        "avalaraTransaction": {
            "id": 85015875577317,
            "code": "1358097",
            "companyId": 7836794,
            "date": "2022-12-22",
            "paymentDate": "1900-01-01",
            "status": "Committed",
            "type": "SalesInvoice",
            "batchCode": "",
            "currencyCode": "USD",
            "exchangeRateCurrencyCode": "USD",
            "customerUsageType": "",
            "entityUseCode": "",
            "customerVendorCode": "66013",
            "customerCode": "66013",
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
            "totalAmount": 10,
            "totalExempt": 0,
            "totalDiscount": 0,
            "totalTax": 0,
            "totalTaxable": 10,
            "totalTaxCalculated": 0,
            "adjustmentReason": "Other",
            "adjustmentDescription": "Create or adjust transaction",
            "locked": false,
            "region": "MB",
            "country": "CA",
            "version": 2,
            "softwareVersion": "22.12.0.0",
            "originAddressId": 0,
            "destinationAddressId": 0,
            "exchangeRateEffectiveDate": "2022-12-22",
            "exchangeRate": 1,
            "isSellerImporterOfRecord": true,
            "description": "",
            "businessIdentificationNo": "",
            "modifiedDate": "2022-12-22T05:38:53.912241Z",
            "modifiedUserId": 34042,
            "taxDate": "2022-12-22",
            "lines": [
                {
                    "id": 85015875577322,
                    "transactionId": 85015875577317,
                    "lineNumber": "1",
                    "boundaryOverrideId": 0,
                    "customerUsageType": "",
                    "entityUseCode": "",
                    "description": "HP Envy Printer 4520",
                    "destinationAddressId": 85015875577318,
                    "originAddressId": 85015875577319,
                    "discountAmount": 0,
                    "discountTypeId": 0,
                    "exemptAmount": 0,
                    "exemptCertId": 0,
                    "exemptNo": "",
                    "isItemTaxable": true,
                    "isSSTP": false,
                    "itemCode": "COMPUTER|DESKTOP",
                    "lineAmount": 10,
                    "quantity": 1,
                    "ref1": "",
                    "ref2": "COMPUTER|DESKTOP",
                    "reportingDate": "2022-12-22",
                    "revAccount": "SERPSOLS-00-410002-000-SERPSOLS-0-0-0-0-0",
                    "sourcing": "Destination",
                    "tax": 0,
                    "taxableAmount": 10,
                    "taxCalculated": 0,
                    "taxCode": "P0000000",
                    "taxCodeId": 8087,
                    "taxDate": "2022-12-22",
                    "taxEngine": "",
                    "taxOverrideType": "None",
                    "businessIdentificationNo": "",
                    "taxOverrideAmount": 0,
                    "taxOverrideReason": "",
                    "taxIncluded": false,
                    "originationDocumentId": "300000200055938",
                    "details": [
                        {
                            "id": 85015875577339,
                            "transactionLineId": 85015875577322,
                            "transactionId": 85015875577317,
                            "addressId": 85015875577318,
                            "country": "CA",
                            "region": "CA",
                            "countyFIPS": "",
                            "stateFIPS": "",
                            "exemptAmount": 0,
                            "exemptReasonId": 4,
                            "inState": false,
                            "jurisCode": "CA",
                            "jurisName": "CANADA",
                            "jurisdictionId": 20451988,
                            "signatureCode": "",
                            "stateAssignedNo": "",
                            "jurisType": "CNT",
                            "jurisdictionType": "Country",
                            "nonTaxableAmount": 0,
                            "nonTaxableRuleId": 0,
                            "nonTaxableType": "RateRule",
                            "rate": 0,
                            "rateRuleId": 322399,
                            "rateSourceId": 0,
                            "serCode": "",
                            "sourcing": "Destination",
                            "tax": 0,
                            "taxableAmount": 10,
                            "taxType": "Output",
                            "taxSubTypeId": "O",
                            "taxTypeGroupId": "InputAndOutput",
                            "taxName": "CANADA GST/TPS",
                            "taxAuthorityTypeId": 45,
                            "taxRegionId": 0,
                            "taxCalculated": 0,
                            "taxOverride": 0,
                            "rateType": "Zero",
                            "rateTypeCode": "Z",
                            "taxableUnits": 10,
                            "nonTaxableUnits": 0,
                            "exemptUnits": 0,
                            "unitOfBasis": "PerCurrencyUnit",
                            "isNonPassThru": false,
                            "isFee": false,
                            "reportingTaxableUnits": 10,
                            "reportingNonTaxableUnits": 0,
                            "reportingExemptUnits": 0,
                            "reportingTax": 0,
                            "reportingTaxCalculated": 0,
                            "liabilityType": "Seller"
                        },
                        {
                            "id": 85015875577340,
                            "transactionLineId": 85015875577322,
                            "transactionId": 85015875577317,
                            "addressId": 85015875577318,
                            "country": "CA",
                            "region": "MB",
                            "countyFIPS": "",
                            "stateFIPS": "",
                            "exemptAmount": 0,
                            "exemptReasonId": 4,
                            "inState": false,
                            "jurisCode": "MB",
                            "jurisName": "MANITOBA",
                            "jurisdictionId": 20451991,
                            "signatureCode": "",
                            "stateAssignedNo": "",
                            "jurisType": "STA",
                            "jurisdictionType": "State",
                            "nonTaxableAmount": 0,
                            "nonTaxableRuleId": 0,
                            "nonTaxableType": "RateRule",
                            "rate": 0,
                            "rateRuleId": 4026411,
                            "rateSourceId": 0,
                            "serCode": "",
                            "sourcing": "Destination",
                            "tax": 0,
                            "taxableAmount": 10,
                            "taxType": "Output",
                            "taxSubTypeId": "O",
                            "taxTypeGroupId": "InputAndOutput",
                            "taxName": "MANITOBA PST",
                            "taxAuthorityTypeId": 45,
                            "taxRegionId": 0,
                            "taxCalculated": 0,
                            "taxOverride": 0,
                            "rateType": "Zero",
                            "rateTypeCode": "Z",
                            "taxableUnits": 10,
                            "nonTaxableUnits": 0,
                            "exemptUnits": 0,
                            "unitOfBasis": "PerCurrencyUnit",
                            "isNonPassThru": false,
                            "isFee": false,
                            "reportingTaxableUnits": 10,
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
                            "documentLineLocationTypeId": 85015875577324,
                            "documentLineId": 85015875577322,
                            "documentAddressId": 85015875577319,
                            "locationTypeCode": "ShipFrom"
                        },
                        {
                            "documentLineLocationTypeId": 85015875577325,
                            "documentLineId": 85015875577322,
                            "documentAddressId": 85015875577318,
                            "locationTypeCode": "ShipTo"
                        },
                        {
                            "documentLineLocationTypeId": 85015875577326,
                            "documentLineId": 85015875577322,
                            "documentAddressId": 85015875577319,
                            "locationTypeCode": "PointOfOrderAcceptance"
                        }
                    ],
                    "userDefinedFields": [
                        {
                            "name": "UDF1",
                            "value": "ORACLE"
                        },
                        {
                            "name": "UDF11",
                            "value": "AB"
                        },
                        {
                            "name": "UDF4",
                            "value": "HP Envy Printer 4520"
                        },
                        {
                            "name": "UDF5",
                            "value": "ITEM"
                        },
                        {
                            "name": "UDF8",
                            "value": "2008 Airport Road NE"
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
                    "id": 85015875577318,
                    "transactionId": 85015875577317,
                    "boundaryLevel": "Zip5",
                    "line1": "780 Powerhouse Rd",
                    "line2": "",
                    "line3": "",
                    "city": "Winnipeg",
                    "region": "MB",
                    "postalCode": "R3H 1C7",
                    "country": "CA",
                    "taxRegionId": 0
                },
                {
                    "id": 85015875577319,
                    "transactionId": 85015875577317,
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
                    "country": "CA",
                    "region": "CA",
                    "jurisType": "Country",
                    "jurisCode": "CA",
                    "jurisName": "CANADA",
                    "taxAuthorityType": 45,
                    "stateAssignedNo": "",
                    "taxType": "Output",
                    "taxSubType": "O",
                    "taxName": "CANADA GST/TPS",
                    "rateType": "Zero",
                    "taxable": 10,
                    "rate": 0,
                    "tax": 0,
                    "taxCalculated": 0,
                    "nonTaxable": 0,
                    "exemption": 0
                },
                {
                    "country": "CA",
                    "region": "MB",
                    "jurisType": "State",
                    "jurisCode": "MB",
                    "jurisName": "MANITOBA",
                    "taxAuthorityType": 45,
                    "stateAssignedNo": "",
                    "taxType": "Output",
                    "taxSubType": "O",
                    "taxName": "MANITOBA PST",
                    "rateType": "Zero",
                    "taxable": 10,
                    "rate": 0,
                    "tax": 0,
                    "taxCalculated": 0,
                    "nonTaxable": 0,
                    "exemption": 0
                }
            ],
            "messages": [
                {
                    "summary": "MissingHSCodeWarning",
                    "details": "No HSCode provided. Import Duty could not be calculated.",
                    "refersTo": "LineNo : 1",
                    "severity": "Success",
                    "source": "Avalara.AvaTax.TaxEngine"
                },
                {
                    "summary": "Shipment does not meet CA VAT de minimis threshold ((((((ShipFromCountry NOT IN ('US','MX')) OR HasMultipleShipFromForCA) AND VATTaxableAmount > 20) OR (ShipFromCountry IN ('US','MX') AND VATTaxableAmount > 40)) AND (CIRODeminimisException IS NULL OR CIRODeminimisException = FALSE)) OR CIRODeminimisException = TRUE). Therefore, VAT does not apply.",
                    "details": "",
                    "refersTo": "VAT",
                    "severity": "Success",
                    "source": "Avalara.AvaTax.TaxEngine"
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
                "ns:EventTypeCode": "INV_UPDATE",
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
                "ns:TrxDate": "2022-12-22",
                "ns:TrxDueDate": "2023-01-21",
                "ns:TrxId": "300000200055937",
                "ns:TrxLevelType": "ITEM",
                "ns:TrxNumber": "1358097",
                "taxableLines": [
                    {
                        "ns:AccountCcid": 300000002075018,
                        "ns:ApplicationId": 222,
                        "ns:AccountString": "SERPSOLS-00-410002-000-SERPSOLS-0-0-0-0-0",
                        "ns:AssessableValue": 10,
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
                        "ns:BillFromLocationId": 300000027712047,
                        "ns:BillThirdPtyAcctId": 300000033215458,
                        "ns:BillThirdPtyAcctSiteId": 300000033215459,
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
                        "ns:BillToGeographyValue1": "2008 Airport Road NE",
                        "ns:BillToGeographyValue10": "AB",
                        "ns:BillToGeographyValue5": "CA",
                        "ns:BillToGeographyValue8": "Calgary",
                        "ns:BillToGeographyValue9": "T2E 3B9",
                        "ns:BillToLocationId": 300000033215461,
                        "ns:CashDiscount": "0",
                        "ns:EntityCode": "TRANSACTIONS",
                        "ns:EventClassCode": "INVOICE",
                        "ns:ExemptionControlFlag": "S",
                        "ns:LineAmt": 10,
                        "ns:LineAmtIncludesTaxFlag": "S",
                        "ns:LineClass": "INVOICE",
                        "ns:LineLevelAction": "UPDATE",
                        "ns:LinesDetFactorId": 16870094,
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
                        "ns:Precision": 2,
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
                        "ns:ShipFromLocationId": 300000003492106,
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
                        "ns:ShipToGeographyValue1": "780 Powerhouse Rd",
                        "ns:ShipToGeographyValue10": "MB",
                        "ns:ShipToGeographyValue5": "CA",
                        "ns:ShipToGeographyValue8": "Winnipeg",
                        "ns:ShipToGeographyValue9": "R3H 1C7",
                        "ns:ShipToLocationId": "300000033216491",
                        "ns:TaxReportingFlag": "Y",
                        "ns:TrxBusinessCategory": "SALES_TRANSACTION",
                        "ns:TrxId": 300000200055937,
                        "ns:TrxLineCurrencyCode": "USD",
                        "ns:TrxLineDescription": "HP Envy Printer 4520",
                        "ns:TrxLineGlDate": "2022-12-22",
                        "ns:TrxLineId": 300000200055938,
                        "ns:TrxLineNumber": 1,
                        "ns:TrxLinePrecision": 2,
                        "ns:TrxLineQuantity": 1,
                        "ns:TrxLineType": "ITEM",
                        "ns:TrxLevelType": "LINE",
                        "ns:TrxTypeDescription": "Regular Invoice for Test",
                        "ns:UnitPrice": 10,
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
                                "line1": "780 Powerhouse Rd",
                                "country": "CA",
                                "city": "Winnipeg",
                                "postalCode": "R3H 1C7",
                                "province": "MB"
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
                                "line1": "2008 Airport Road NE",
                                "country": "CA",
                                "city": "Calgary",
                                "postalCode": "T2E 3B9",
                                "province": "AB"
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
            "createdAt": "2022-12-08T09:15:04.068Z",
            "updatedBy": "bhiaRBrWjFWZPpRapph1m8",
            "createdBy": "bhiaRBrWjFWZPpRapph1m8",
            "_recordId": "q1Q9DiEx17sjuxB8cNNnty",
            "ATX_GEO_SOURCE": "AVA",
            "updatedAt": "2022-12-21T16:21:22.138Z",
            "ATX_CUSTOMER_BUSINESS_UNITS": [
                {
                    "createdAt": "2022-12-08T09:15:04.412Z",
                    "ATX_BUSINESS_UNIT": "Smart ERP Services Inc.",
                    "ATX_BUSINESS_UNIT_ORGANIZATION_ID": "300000011107181",
                    "updatedBy": "bhiaRBrWjFWZPpRapph1m8",
                    "createdBy": "bhiaRBrWjFWZPpRapph1m8",
                    "_recordId": "p1c2gWxVVnd6xRwhDxwZbh",
                    "FIRST_PARTY_ORG_ID": "300000011119157",
                    "updatedAt": "2022-12-21T16:21:23.398Z",
                    "ATX_CUSTOMER_LEGAL_ENTITIES": [
                        {
                            "updatedBy": "bhiaRBrWjFWZPpRapph1m8",
                            "ATX_CERTIFICATE_CLIENT_ID": "",
                            "ATX_JURISDICTION_CODE_PREFIX": "USTJ7",
                            "_recordId": "sFfp5nAkCgLk5xKnQ791gj",
                            "ATX_LEGAL_ENTITY_ID": "300000002080003",
                            "createdAt": "2022-12-08T09:15:04.428Z",
                            "ATX_TAX_REGIME_CODE": "AVATAX US7 SALES AND USE TAX",
                            "ATX_COMPANY_CODE": "FUSIONOCICFGLEV2",
                            "createdBy": "bhiaRBrWjFWZPpRapph1m8",
                            "ATX_TAX_MODULE": "USSL",
                            "ATX_LEGAL_ENTITY_NAME": "Smart ERP Solutions Inc.",
                            "updatedAt": "2022-12-21T16:21:24.299Z",
                            "ATX_COUNTRY": "US"
                        },
                        {
                            "updatedBy": "bhiaRBrWjFWZPpRapph1m8",
                            "ATX_CERTIFICATE_CLIENT_ID": "",
                            "ATX_JURISDICTION_CODE_PREFIX": "USTJ7",
                            "_recordId": "4KAyEoBvuHfNuijtZQX8Jm",
                            "ATX_LEGAL_ENTITY_ID": "300000039824238",
                            "createdAt": "2022-12-08T09:15:04.453Z",
                            "ATX_TAX_REGIME_CODE": "AVATAX US7 SALES AND USE TAX",
                            "ATX_COMPANY_CODE": "FUSION-OCICFG-US2LE",
                            "createdBy": "bhiaRBrWjFWZPpRapph1m8",
                            "ATX_TAX_MODULE": "USSL",
                            "ATX_LEGAL_ENTITY_NAME": "Smart ERP US2 LE",
                            "updatedAt": "2022-12-21T16:21:24.537Z",
                            "ATX_COUNTRY": "US"
                        },
                        {
                            "updatedBy": "bhiaRBrWjFWZPpRapph1m8",
                            "ATX_CERTIFICATE_CLIENT_ID": "",
                            "ATX_JURISDICTION_CODE_PREFIX": "USTJ7",
                            "_recordId": "gzFjfagUcrsCipLi7iRGuX",
                            "ATX_LEGAL_ENTITY_ID": "300000039824254",
                            "createdAt": "2022-12-08T09:15:04.463Z",
                            "ATX_TAX_REGIME_CODE": "AVATAX US7 SALES AND USE TAX",
                            "ATX_COMPANY_CODE": "FUSION-OCICFG-US3LE",
                            "createdBy": "bhiaRBrWjFWZPpRapph1m8",
                            "ATX_TAX_MODULE": "USSL",
                            "ATX_LEGAL_ENTITY_NAME": "Smart ERP US3 LE",
                            "updatedAt": "2022-12-21T16:21:24.676Z",
                            "ATX_COUNTRY": "US"
                        }
                    ],
                    "ATX_BUSINESS_UNIT_REGIME_SUBSCRIPTION": [
                        {
                            "createdAt": "2022-12-08T09:15:05.724Z",
                            "updatedBy": "bhiaRBrWjFWZPpRapph1m8",
                            "ATX_BUSINESS_UNIT_ORGANIZATION_ID": "300000011107181",
                            "createdBy": "bhiaRBrWjFWZPpRapph1m8",
                            "_recordId": "8xzLL8HVXjQijwDhsNLMNk",
                            "ATX_APPLICATION_TYPE": "O2C",
                            "updatedAt": "2022-12-21T16:21:34.581Z",
                            "ATX_COUNTRY": "AU"
                        },
                        {
                            "createdAt": "2022-12-08T09:15:06.134Z",
                            "updatedBy": "bhiaRBrWjFWZPpRapph1m8",
                            "ATX_BUSINESS_UNIT_ORGANIZATION_ID": "300000011107181",
                            "createdBy": "bhiaRBrWjFWZPpRapph1m8",
                            "_recordId": "1VfXskhJFEwY2vnH4Nr9LU",
                            "ATX_APPLICATION_TYPE": "P2P",
                            "updatedAt": "2022-12-21T16:21:35.886Z",
                            "ATX_COUNTRY": "AU"
                        },
                        {
                            "createdAt": "2022-12-08T09:15:06.453Z",
                            "updatedBy": "bhiaRBrWjFWZPpRapph1m8",
                            "ATX_BUSINESS_UNIT_ORGANIZATION_ID": "300000011107181",
                            "createdBy": "bhiaRBrWjFWZPpRapph1m8",
                            "_recordId": "dsu4MvnVDtUgZ61R3DL5gy",
                            "ATX_APPLICATION_TYPE": "O2C",
                            "updatedAt": "2022-12-21T16:21:37.237Z",
                            "ATX_COUNTRY": "CA"
                        },
                        {
                            "createdAt": "2022-12-08T09:15:06.733Z",
                            "updatedBy": "bhiaRBrWjFWZPpRapph1m8",
                            "ATX_BUSINESS_UNIT_ORGANIZATION_ID": "300000011107181",
                            "createdBy": "bhiaRBrWjFWZPpRapph1m8",
                            "_recordId": "1anyQy4FELqY2vnMUsqaVj",
                            "ATX_APPLICATION_TYPE": "P2P",
                            "updatedAt": "2022-12-21T16:21:38.545Z",
                            "ATX_COUNTRY": "CA"
                        },
                        {
                            "createdAt": "2022-12-08T09:15:07.029Z",
                            "updatedBy": "bhiaRBrWjFWZPpRapph1m8",
                            "ATX_BUSINESS_UNIT_ORGANIZATION_ID": "300000011107181",
                            "createdBy": "bhiaRBrWjFWZPpRapph1m8",
                            "_recordId": "bGkzuyk5TZGsvwCvSw947T",
                            "ATX_APPLICATION_TYPE": "O2C",
                            "updatedAt": "2022-12-21T16:21:39.840Z",
                            "ATX_COUNTRY": "FR"
                        },
                        {
                            "createdAt": "2022-12-08T09:15:07.314Z",
                            "updatedBy": "bhiaRBrWjFWZPpRapph1m8",
                            "ATX_BUSINESS_UNIT_ORGANIZATION_ID": "300000011107181",
                            "createdBy": "bhiaRBrWjFWZPpRapph1m8",
                            "_recordId": "tSH7dwfCq3VSKtbA81bD6d",
                            "ATX_APPLICATION_TYPE": "P2P",
                            "updatedAt": "2022-12-21T16:21:41.151Z",
                            "ATX_COUNTRY": "FR"
                        },
                        {
                            "createdAt": "2022-12-08T09:15:07.626Z",
                            "updatedBy": "bhiaRBrWjFWZPpRapph1m8",
                            "ATX_BUSINESS_UNIT_ORGANIZATION_ID": "300000011107181",
                            "createdBy": "bhiaRBrWjFWZPpRapph1m8",
                            "_recordId": "sYDWePqEnKUeH2Trm5MYHK",
                            "ATX_APPLICATION_TYPE": "O2C",
                            "updatedAt": "2022-12-21T16:21:42.447Z",
                            "ATX_COUNTRY": "NL"
                        },
                        {
                            "createdAt": "2022-12-08T09:15:07.907Z",
                            "updatedBy": "bhiaRBrWjFWZPpRapph1m8",
                            "ATX_BUSINESS_UNIT_ORGANIZATION_ID": "300000011107181",
                            "createdBy": "bhiaRBrWjFWZPpRapph1m8",
                            "_recordId": "hoipYSsGUPgo6Vi7eVd5YW",
                            "ATX_APPLICATION_TYPE": "P2P",
                            "updatedAt": "2022-12-21T16:21:44.547Z",
                            "ATX_COUNTRY": "NL"
                        },
                        {
                            "createdAt": "2022-12-08T09:15:08.166Z",
                            "updatedBy": "bhiaRBrWjFWZPpRapph1m8",
                            "ATX_BUSINESS_UNIT_ORGANIZATION_ID": "300000011107181",
                            "createdBy": "bhiaRBrWjFWZPpRapph1m8",
                            "_recordId": "jXU4z5v6pniuJyPXqSQuqH",
                            "ATX_APPLICATION_TYPE": "O2C",
                            "updatedAt": "2022-12-21T16:21:45.876Z",
                            "ATX_COUNTRY": "SG"
                        },
                        {
                            "createdAt": "2022-12-08T09:15:08.467Z",
                            "updatedBy": "bhiaRBrWjFWZPpRapph1m8",
                            "ATX_BUSINESS_UNIT_ORGANIZATION_ID": "300000011107181",
                            "createdBy": "bhiaRBrWjFWZPpRapph1m8",
                            "_recordId": "rjfiQbdR3Wfw4E6bkXU1Bo",
                            "ATX_APPLICATION_TYPE": "O2C",
                            "updatedAt": "2022-12-21T16:21:47.216Z",
                            "ATX_COUNTRY": "US"
                        },
                        {
                            "createdAt": "2022-12-08T09:15:08.745Z",
                            "updatedBy": "bhiaRBrWjFWZPpRapph1m8",
                            "ATX_BUSINESS_UNIT_ORGANIZATION_ID": "300000011107181",
                            "createdBy": "bhiaRBrWjFWZPpRapph1m8",
                            "_recordId": "eKRi8Pokc2svR4rgdCGfyX",
                            "ATX_APPLICATION_TYPE": "P2P",
                            "updatedAt": "2022-12-21T16:21:48.528Z",
                            "ATX_COUNTRY": "US"
                        },
                        {
                            "createdAt": "2022-12-08T09:15:09.046Z",
                            "updatedBy": "bhiaRBrWjFWZPpRapph1m8",
                            "ATX_BUSINESS_UNIT_ORGANIZATION_ID": "300000011107181",
                            "createdBy": "bhiaRBrWjFWZPpRapph1m8",
                            "_recordId": "kYpux2Qkd8z2TFdtnPwHoB",
                            "ATX_APPLICATION_TYPE": "O2C",
                            "updatedAt": "2022-12-21T16:21:49.790Z",
                            "ATX_COUNTRY": "XI"
                        }
                    ],
                    "ATX_AP_TOLERANCE": {}
                },
                {
                    "createdAt": "2022-12-08T09:15:04.529Z",
                    "ATX_BUSINESS_UNIT": "SmartERP Ireland BU",
                    "ATX_BUSINESS_UNIT_ORGANIZATION_ID": "300000099042074",
                    "updatedBy": "bhiaRBrWjFWZPpRapph1m8",
                    "createdBy": "bhiaRBrWjFWZPpRapph1m8",
                    "_recordId": "rR7eLJaR2zRxzvBnpUkaUS",
                    "FIRST_PARTY_ORG_ID": "300000099119994",
                    "updatedAt": "2022-12-21T16:21:26.942Z",
                    "ATX_CUSTOMER_LEGAL_ENTITIES": [
                        {
                            "updatedBy": "bhiaRBrWjFWZPpRapph1m8",
                            "ATX_CERTIFICATE_CLIENT_ID": "",
                            "ATX_JURISDICTION_CODE_PREFIX": "",
                            "_recordId": "a46waDvR8HBuBKBjyjLjtC",
                            "ATX_LEGAL_ENTITY_ID": "300000099119954",
                            "createdAt": "2022-12-08T09:15:04.542Z",
                            "ATX_TAX_REGIME_CODE": "",
                            "ATX_COMPANY_CODE": "FUSIONOCICFGCANADAV2",
                            "createdBy": "bhiaRBrWjFWZPpRapph1m8",
                            "ATX_TAX_MODULE": "ILSL",
                            "ATX_LEGAL_ENTITY_NAME": "SmartERP Ireland LE",
                            "updatedAt": "2022-12-21T16:21:27.382Z",
                            "ATX_COUNTRY": "IE"
                        }
                    ],
                    "ATX_BUSINESS_UNIT_REGIME_SUBSCRIPTION": [
                        {
                            "createdAt": "2022-12-08T09:15:10.497Z",
                            "updatedBy": "bhiaRBrWjFWZPpRapph1m8",
                            "ATX_BUSINESS_UNIT_ORGANIZATION_ID": "300000099042074",
                            "createdBy": "bhiaRBrWjFWZPpRapph1m8",
                            "_recordId": "uaPnmFYdZKFvntSzQo21YP",
                            "ATX_APPLICATION_TYPE": "O2C",
                            "updatedAt": "2022-12-21T16:21:56.364Z",
                            "ATX_COUNTRY": "IE"
                        },
                        {
                            "createdAt": "2022-12-08T09:15:10.777Z",
                            "updatedBy": "bhiaRBrWjFWZPpRapph1m8",
                            "ATX_BUSINESS_UNIT_ORGANIZATION_ID": "300000099042074",
                            "createdBy": "bhiaRBrWjFWZPpRapph1m8",
                            "_recordId": "gN3961TcaYYR3XTru1c9zy",
                            "ATX_APPLICATION_TYPE": "P2P",
                            "updatedAt": "2022-12-21T16:21:57.672Z",
                            "ATX_COUNTRY": "IE"
                        }
                    ],
                    "ATX_AP_TOLERANCE": {}
                },
                {
                    "createdAt": "2022-12-08T09:15:04.733Z",
                    "ATX_BUSINESS_UNIT": "SmartERP Colombia BU",
                    "ATX_BUSINESS_UNIT_ORGANIZATION_ID": "300000099185128",
                    "updatedBy": "bhiaRBrWjFWZPpRapph1m8",
                    "createdBy": "bhiaRBrWjFWZPpRapph1m8",
                    "_recordId": "b5Qd66KcRRcKRq7JSENeGz",
                    "FIRST_PARTY_ORG_ID": "300000099179285",
                    "updatedAt": "2022-12-21T16:21:27.492Z",
                    "ATX_CUSTOMER_LEGAL_ENTITIES": [
                        {
                            "updatedBy": "bhiaRBrWjFWZPpRapph1m8",
                            "ATX_CERTIFICATE_CLIENT_ID": "",
                            "ATX_JURISDICTION_CODE_PREFIX": "",
                            "_recordId": "jTWJ28Va9JWF5yjbciuoi8",
                            "ATX_LEGAL_ENTITY_ID": "300000099179238",
                            "createdAt": "2022-12-08T09:15:04.845Z",
                            "ATX_TAX_REGIME_CODE": "",
                            "ATX_COMPANY_CODE": "FUSIONOCICFGCANADAV2",
                            "createdBy": "bhiaRBrWjFWZPpRapph1m8",
                            "ATX_TAX_MODULE": "ILSL",
                            "ATX_LEGAL_ENTITY_NAME": "SmartERP Colombia LE",
                            "updatedAt": "2022-12-21T16:21:27.937Z",
                            "ATX_COUNTRY": "CO"
                        }
                    ],
                    "ATX_BUSINESS_UNIT_REGIME_SUBSCRIPTION": [
                        {
                            "createdAt": "2022-12-08T09:15:11.059Z",
                            "updatedBy": "bhiaRBrWjFWZPpRapph1m8",
                            "ATX_BUSINESS_UNIT_ORGANIZATION_ID": "300000099185128",
                            "createdBy": "bhiaRBrWjFWZPpRapph1m8",
                            "_recordId": "geSdRdbXPFiYjctsADwqQ8",
                            "ATX_APPLICATION_TYPE": "O2C",
                            "updatedAt": "2022-12-21T16:21:58.960Z",
                            "ATX_COUNTRY": "CO"
                        }
                    ],
                    "ATX_AP_TOLERANCE": {}
                },
                {
                    "createdAt": "2022-12-08T09:15:05.103Z",
                    "ATX_BUSINESS_UNIT": "AppKnit Cloud Inc BU",
                    "ATX_BUSINESS_UNIT_ORGANIZATION_ID": "300000125689483554",
                    "updatedBy": "bhiaRBrWjFWZPpRapph1m8",
                    "createdBy": "bhiaRBrWjFWZPpRapph1m8",
                    "_recordId": "8ZpPE6e7v3UawzXoqK99rc",
                    "FIRST_PARTY_ORG_ID": "30000012568948344",
                    "updatedAt": "2022-12-21T16:21:32.032Z",
                    "ATX_CUSTOMER_LEGAL_ENTITIES": [
                        {
                            "updatedBy": "bhiaRBrWjFWZPpRapph1m8",
                            "ATX_CERTIFICATE_CLIENT_ID": "",
                            "ATX_JURISDICTION_CODE_PREFIX": "USTJ7",
                            "_recordId": "qkRCZE7StWtXx4b2wJcB1L",
                            "ATX_LEGAL_ENTITY_ID": "300000125689483887",
                            "createdAt": "2022-12-08T09:15:05.113Z",
                            "ATX_TAX_REGIME_CODE": "AVATAX US7 SALES AND USE TAX",
                            "ATX_COMPANY_CODE": "APPKNITCLOUDINC",
                            "createdBy": "bhiaRBrWjFWZPpRapph1m8",
                            "ATX_TAX_MODULE": "USSL",
                            "ATX_LEGAL_ENTITY_NAME": "AppKnit Cloud Inc.",
                            "updatedAt": "2022-12-21T16:21:32.482Z",
                            "ATX_COUNTRY": "US"
                        }
                    ],
                    "ATX_BUSINESS_UNIT_REGIME_SUBSCRIPTION": [],
                    "ATX_AP_TOLERANCE": {}
                },
                {
                    "createdAt": "2022-12-08T09:15:04.956Z",
                    "ATX_BUSINESS_UNIT": "SmartERP Israel BU",
                    "ATX_BUSINESS_UNIT_ORGANIZATION_ID": "300000105054777",
                    "updatedBy": "bhiaRBrWjFWZPpRapph1m8",
                    "createdBy": "bhiaRBrWjFWZPpRapph1m8",
                    "_recordId": "kFpcCuyS5NrPCdrjkuUsLs",
                    "FIRST_PARTY_ORG_ID": "300000106092417",
                    "updatedAt": "2022-12-21T16:21:28.618Z",
                    "ATX_CUSTOMER_LEGAL_ENTITIES": [
                        {
                            "updatedBy": "bhiaRBrWjFWZPpRapph1m8",
                            "ATX_CERTIFICATE_CLIENT_ID": "",
                            "ATX_JURISDICTION_CODE_PREFIX": "",
                            "_recordId": "hZXNdFKi2MzUssqZ6LRD9w",
                            "ATX_LEGAL_ENTITY_ID": "300000106092391",
                            "createdAt": "2022-12-08T09:15:05.005Z",
                            "ATX_TAX_REGIME_CODE": "",
                            "ATX_COMPANY_CODE": "FUSIONOCICFGCANADAV2",
                            "createdBy": "bhiaRBrWjFWZPpRapph1m8",
                            "ATX_TAX_MODULE": "ILSL",
                            "ATX_LEGAL_ENTITY_NAME": "SmartERP Israel LE",
                            "updatedAt": "2022-12-21T16:21:29.062Z",
                            "ATX_COUNTRY": "IL"
                        }
                    ],
                    "ATX_BUSINESS_UNIT_REGIME_SUBSCRIPTION": [
                        {
                            "createdAt": "2022-12-08T09:15:12.611Z",
                            "updatedBy": "bhiaRBrWjFWZPpRapph1m8",
                            "ATX_BUSINESS_UNIT_ORGANIZATION_ID": "300000105054777",
                            "createdBy": "bhiaRBrWjFWZPpRapph1m8",
                            "_recordId": "89jbmnq6vYrp44xwyfYSeq",
                            "ATX_APPLICATION_TYPE": "O2C",
                            "updatedAt": "2022-12-21T16:22:04.175Z",
                            "ATX_COUNTRY": "IL"
                        },
                        {
                            "createdAt": "2022-12-08T09:15:12.946Z",
                            "updatedBy": "bhiaRBrWjFWZPpRapph1m8",
                            "ATX_BUSINESS_UNIT_ORGANIZATION_ID": "300000105054777",
                            "createdBy": "bhiaRBrWjFWZPpRapph1m8",
                            "_recordId": "ajLvexGuUK8ARge5kDLomi",
                            "ATX_APPLICATION_TYPE": "P2P",
                            "updatedAt": "2022-12-21T16:22:05.468Z",
                            "ATX_COUNTRY": "IL"
                        }
                    ],
                    "ATX_AP_TOLERANCE": {}
                },
                {
                    "createdAt": "2022-12-08T09:15:04.204Z",
                    "ATX_BUSINESS_UNIT": "Smart ERP Germany BU",
                    "updatedBy": "bhiaRBrWjFWZPpRapph1m8",
                    "ATX_BUSINESS_UNIT_ORGANIZATION_ID": "2",
                    "createdBy": "bhiaRBrWjFWZPpRapph1m8",
                    "_recordId": "4Yzfw5zgvcM1whJsN8eXSB",
                    "FIRST_PARTY_ORG_ID": "300000027470973",
                    "updatedAt": "2022-12-21T16:21:22.364Z",
                    "ATX_CUSTOMER_LEGAL_ENTITIES": [
                        {
                            "updatedBy": "bhiaRBrWjFWZPpRapph1m8",
                            "ATX_CERTIFICATE_CLIENT_ID": "",
                            "ATX_JURISDICTION_CODE_PREFIX": "",
                            "_recordId": "eEhLWFKbATMHBhqndQAuzW",
                            "ATX_LEGAL_ENTITY_ID": "3",
                            "createdAt": "2022-12-08T09:15:04.287Z",
                            "ATX_TAX_REGIME_CODE": "",
                            "ATX_COMPANY_CODE": "FUSIONOCICFGCANADAV2",
                            "createdBy": "bhiaRBrWjFWZPpRapph1m8",
                            "ATX_TAX_MODULE": "ILSL",
                            "ATX_LEGAL_ENTITY_NAME": "SmartERP Germany LE",
                            "updatedAt": "2022-12-21T16:21:23.171Z",
                            "ATX_COUNTRY": "DE"
                        }
                    ],
                    "ATX_BUSINESS_UNIT_REGIME_SUBSCRIPTION": [],
                    "ATX_AP_TOLERANCE": {}
                },
                {
                    "createdAt": "2022-12-08T09:15:04.492Z",
                    "ATX_BUSINESS_UNIT": "Smart ERP Canada BU",
                    "ATX_BUSINESS_UNIT_ORGANIZATION_ID": "300000018736906",
                    "updatedBy": "bhiaRBrWjFWZPpRapph1m8",
                    "createdBy": "bhiaRBrWjFWZPpRapph1m8",
                    "_recordId": "aUd3jcA9JSJiMvQtFG3ivh",
                    "FIRST_PARTY_ORG_ID": "300000027222408",
                    "updatedAt": "2022-12-21T16:21:25.621Z",
                    "ATX_CUSTOMER_LEGAL_ENTITIES": [
                        {
                            "updatedBy": "bhiaRBrWjFWZPpRapph1m8",
                            "ATX_CERTIFICATE_CLIENT_ID": "",
                            "ATX_JURISDICTION_CODE_PREFIX": "",
                            "_recordId": "3ocVGgJe5E4u82qHDRFoEw",
                            "ATX_LEGAL_ENTITY_ID": "300000027222382",
                            "createdAt": "2022-12-08T09:15:04.501Z",
                            "ATX_TAX_REGIME_CODE": "",
                            "ATX_COMPANY_CODE": "FUSIONOCICFGCANADAV2",
                            "createdBy": "bhiaRBrWjFWZPpRapph1m8",
                            "ATX_TAX_MODULE": "CASL",
                            "ATX_LEGAL_ENTITY_NAME": "Smart ERP Canada LE",
                            "updatedAt": "2022-12-21T16:21:26.065Z",
                            "ATX_COUNTRY": "CA"
                        }
                    ],
                    "ATX_BUSINESS_UNIT_REGIME_SUBSCRIPTION": [
                        {
                            "createdAt": "2022-12-08T09:15:09.362Z",
                            "updatedBy": "bhiaRBrWjFWZPpRapph1m8",
                            "ATX_BUSINESS_UNIT_ORGANIZATION_ID": "300000018736906",
                            "createdBy": "bhiaRBrWjFWZPpRapph1m8",
                            "_recordId": "73fhXFKXu8KRZYZiE3nVn2",
                            "ATX_APPLICATION_TYPE": "O2C",
                            "updatedAt": "2022-12-21T16:21:51.103Z",
                            "ATX_COUNTRY": "CA"
                        },
                        {
                            "createdAt": "2022-12-08T09:15:09.645Z",
                            "updatedBy": "bhiaRBrWjFWZPpRapph1m8",
                            "ATX_BUSINESS_UNIT_ORGANIZATION_ID": "300000018736906",
                            "createdBy": "bhiaRBrWjFWZPpRapph1m8",
                            "_recordId": "eW1E4sTwgd75FbFR2QDu9E",
                            "ATX_APPLICATION_TYPE": "P2P",
                            "updatedAt": "2022-12-21T16:21:52.418Z",
                            "ATX_COUNTRY": "CA"
                        }
                    ],
                    "ATX_AP_TOLERANCE": {}
                },
                {
                    "createdAt": "2022-12-08T09:15:04.939Z",
                    "ATX_BUSINESS_UNIT": "SmartERP France BU",
                    "ATX_BUSINESS_UNIT_ORGANIZATION_ID": "300000105054521",
                    "updatedBy": "bhiaRBrWjFWZPpRapph1m8",
                    "createdBy": "bhiaRBrWjFWZPpRapph1m8",
                    "_recordId": "8D25eXNFjaUzcdJA4eGE6k",
                    "FIRST_PARTY_ORG_ID": "300000106092336",
                    "updatedAt": "2022-12-21T16:21:28.048Z",
                    "ATX_CUSTOMER_LEGAL_ENTITIES": [
                        {
                            "updatedBy": "bhiaRBrWjFWZPpRapph1m8",
                            "ATX_CERTIFICATE_CLIENT_ID": "",
                            "ATX_JURISDICTION_CODE_PREFIX": "",
                            "_recordId": "pMuDuG58VWyXnQ4UyEkVTA",
                            "ATX_LEGAL_ENTITY_ID": "300000106092310",
                            "createdAt": "2022-12-08T09:15:04.947Z",
                            "ATX_TAX_REGIME_CODE": "",
                            "ATX_COMPANY_CODE": "FUSIONOCICFGCANADAV2",
                            "createdBy": "bhiaRBrWjFWZPpRapph1m8",
                            "ATX_TAX_MODULE": "ILSL",
                            "ATX_LEGAL_ENTITY_NAME": "SmartERP FRA LE",
                            "updatedAt": "2022-12-21T16:21:28.509Z",
                            "ATX_COUNTRY": "FR"
                        }
                    ],
                    "ATX_BUSINESS_UNIT_REGIME_SUBSCRIPTION": [
                        {
                            "createdAt": "2022-12-08T09:15:11.761Z",
                            "updatedBy": "bhiaRBrWjFWZPpRapph1m8",
                            "ATX_BUSINESS_UNIT_ORGANIZATION_ID": "300000105054521",
                            "createdBy": "bhiaRBrWjFWZPpRapph1m8",
                            "_recordId": "vcuoEzKo8iojUGnZCGZQKh",
                            "ATX_APPLICATION_TYPE": "O2C",
                            "updatedAt": "2022-12-21T16:22:00.385Z",
                            "ATX_COUNTRY": "FR"
                        },
                        {
                            "createdAt": "2022-12-08T09:15:12.063Z",
                            "updatedBy": "bhiaRBrWjFWZPpRapph1m8",
                            "ATX_BUSINESS_UNIT_ORGANIZATION_ID": "300000105054521",
                            "createdBy": "bhiaRBrWjFWZPpRapph1m8",
                            "_recordId": "4QNrnyV7SQzxgdNxse99KM",
                            "ATX_APPLICATION_TYPE": "P2P",
                            "updatedAt": "2022-12-21T16:22:01.623Z",
                            "ATX_COUNTRY": "FR"
                        },
                        {
                            "createdAt": "2022-12-08T09:15:12.333Z",
                            "updatedBy": "bhiaRBrWjFWZPpRapph1m8",
                            "ATX_BUSINESS_UNIT_ORGANIZATION_ID": "300000105054521",
                            "createdBy": "bhiaRBrWjFWZPpRapph1m8",
                            "_recordId": "oijPjizVHoo8Gs5V5SxjPQ",
                            "ATX_APPLICATION_TYPE": "O2C",
                            "updatedAt": "2022-12-21T16:22:02.886Z",
                            "ATX_COUNTRY": "NL"
                        }
                    ],
                    "ATX_AP_TOLERANCE": {}
                },
                {
                    "createdAt": "2022-12-08T09:15:05.062Z",
                    "ATX_BUSINESS_UNIT": "SmartERP India BU",
                    "ATX_BUSINESS_UNIT_ORGANIZATION_ID": "300000116064777",
                    "updatedBy": "bhiaRBrWjFWZPpRapph1m8",
                    "createdBy": "bhiaRBrWjFWZPpRapph1m8",
                    "_recordId": "x3ky5FoM4oCy9UrB316XQw",
                    "FIRST_PARTY_ORG_ID": "300000116087426",
                    "updatedAt": "2022-12-21T16:21:30.612Z",
                    "ATX_CUSTOMER_LEGAL_ENTITIES": [
                        {
                            "updatedBy": "bhiaRBrWjFWZPpRapph1m8",
                            "ATX_CERTIFICATE_CLIENT_ID": "",
                            "ATX_JURISDICTION_CODE_PREFIX": "",
                            "_recordId": "8aKLGyrSXabTDZcNhvVDmj",
                            "ATX_LEGAL_ENTITY_ID": "300000116087400",
                            "createdAt": "2022-12-08T09:15:05.075Z",
                            "ATX_TAX_REGIME_CODE": "",
                            "ATX_COMPANY_CODE": "FUSIONOCICFGCANADAV2",
                            "createdBy": "bhiaRBrWjFWZPpRapph1m8",
                            "ATX_TAX_MODULE": "ILSL",
                            "ATX_LEGAL_ENTITY_NAME": "SmartERP India LE",
                            "updatedAt": "2022-12-21T16:21:31.331Z",
                            "ATX_COUNTRY": "IN"
                        }
                    ],
                    "ATX_BUSINESS_UNIT_REGIME_SUBSCRIPTION": [
                        {
                            "createdAt": "2022-12-08T09:15:13.237Z",
                            "updatedBy": "bhiaRBrWjFWZPpRapph1m8",
                            "ATX_BUSINESS_UNIT_ORGANIZATION_ID": "300000116064777",
                            "createdBy": "bhiaRBrWjFWZPpRapph1m8",
                            "_recordId": "sy6ZMq43RxRVtoxspzScgm",
                            "ATX_APPLICATION_TYPE": "O2C",
                            "updatedAt": "2022-12-21T16:22:06.787Z",
                            "ATX_COUNTRY": "IN"
                        },
                        {
                            "createdAt": "2022-12-08T09:15:13.527Z",
                            "updatedBy": "bhiaRBrWjFWZPpRapph1m8",
                            "ATX_BUSINESS_UNIT_ORGANIZATION_ID": "300000116064777",
                            "createdBy": "bhiaRBrWjFWZPpRapph1m8",
                            "_recordId": "5YdYaY98dHyWBqHL6i3M4L",
                            "ATX_APPLICATION_TYPE": "P2P",
                            "updatedAt": "2022-12-21T16:22:08.032Z",
                            "ATX_COUNTRY": "IN"
                        }
                    ],
                    "ATX_AP_TOLERANCE": {}
                },
                {
                    "createdAt": "2022-12-08T09:15:05.040Z",
                    "ATX_BUSINESS_UNIT": "SmartERP Mexico BU",
                    "ATX_BUSINESS_UNIT_ORGANIZATION_ID": "300000106686938",
                    "updatedBy": "bhiaRBrWjFWZPpRapph1m8",
                    "createdBy": "bhiaRBrWjFWZPpRapph1m8",
                    "_recordId": "qZPxf5SJxvrPxRFTapjJzg",
                    "FIRST_PARTY_ORG_ID": "300000106939098",
                    "updatedAt": "2022-12-21T16:21:29.746Z",
                    "ATX_CUSTOMER_LEGAL_ENTITIES": [
                        {
                            "updatedBy": "bhiaRBrWjFWZPpRapph1m8",
                            "ATX_CERTIFICATE_CLIENT_ID": "",
                            "ATX_JURISDICTION_CODE_PREFIX": "",
                            "_recordId": "2XKyqyyurr4GUgcqQGmwG2",
                            "ATX_LEGAL_ENTITY_ID": "300000106939072",
                            "createdAt": "2022-12-08T09:15:05.051Z",
                            "ATX_TAX_REGIME_CODE": "",
                            "ATX_COMPANY_CODE": "FUSIONOCICFGCANADAV2",
                            "createdBy": "bhiaRBrWjFWZPpRapph1m8",
                            "ATX_TAX_MODULE": "ILSL",
                            "ATX_LEGAL_ENTITY_NAME": "SmartERP Mexico LE",
                            "updatedAt": "2022-12-21T16:21:30.478Z",
                            "ATX_COUNTRY": "MX"
                        }
                    ],
                    "ATX_BUSINESS_UNIT_REGIME_SUBSCRIPTION": [],
                    "ATX_AP_TOLERANCE": {}
                },
                {
                    "createdAt": "2022-12-08T09:15:05.084Z",
                    "ATX_BUSINESS_UNIT": "SmartERP Italy BU",
                    "ATX_BUSINESS_UNIT_ORGANIZATION_ID": "300000125717393",
                    "updatedBy": "bhiaRBrWjFWZPpRapph1m8",
                    "createdBy": "bhiaRBrWjFWZPpRapph1m8",
                    "_recordId": "cVquemNPWcqyJ7YNvya842",
                    "FIRST_PARTY_ORG_ID": "300000125689483",
                    "updatedAt": "2022-12-21T16:21:31.447Z",
                    "ATX_CUSTOMER_LEGAL_ENTITIES": [
                        {
                            "updatedBy": "bhiaRBrWjFWZPpRapph1m8",
                            "ATX_CERTIFICATE_CLIENT_ID": "",
                            "ATX_JURISDICTION_CODE_PREFIX": "",
                            "_recordId": "2WJvz4afFQeJZnuZZgLiZ7",
                            "ATX_LEGAL_ENTITY_ID": "300000125689457",
                            "createdAt": "2022-12-08T09:15:05.093Z",
                            "ATX_TAX_REGIME_CODE": "",
                            "ATX_COMPANY_CODE": "FUSIONOCICFGCANADAV2",
                            "createdBy": "bhiaRBrWjFWZPpRapph1m8",
                            "ATX_TAX_MODULE": "ILSL",
                            "ATX_LEGAL_ENTITY_NAME": "SmartERP Italy LE",
                            "updatedAt": "2022-12-21T16:21:31.917Z",
                            "ATX_COUNTRY": "IT"
                        }
                    ],
                    "ATX_BUSINESS_UNIT_REGIME_SUBSCRIPTION": [
                        {
                            "createdAt": "2022-12-08T09:15:13.809Z",
                            "updatedBy": "bhiaRBrWjFWZPpRapph1m8",
                            "ATX_BUSINESS_UNIT_ORGANIZATION_ID": "300000125717393",
                            "createdBy": "bhiaRBrWjFWZPpRapph1m8",
                            "_recordId": "7sszK6ifiZk7R8E1kp3qPB",
                            "ATX_APPLICATION_TYPE": "O2C",
                            "updatedAt": "2022-12-21T16:22:09.363Z",
                            "ATX_COUNTRY": "IT"
                        },
                        {
                            "createdAt": "2022-12-08T09:15:14.106Z",
                            "updatedBy": "bhiaRBrWjFWZPpRapph1m8",
                            "ATX_BUSINESS_UNIT_ORGANIZATION_ID": "300000125717393",
                            "createdBy": "bhiaRBrWjFWZPpRapph1m8",
                            "_recordId": "jth9uDNnhXsCYZe4sHA1yp",
                            "ATX_APPLICATION_TYPE": "P2P",
                            "updatedAt": "2022-12-21T16:22:10.681Z",
                            "ATX_COUNTRY": "IT"
                        }
                    ],
                    "ATX_AP_TOLERANCE": {}
                },
                {
                    "createdAt": "2022-12-08T09:15:05.018Z",
                    "ATX_BUSINESS_UNIT": "SmartERP Japan BU",
                    "ATX_BUSINESS_UNIT_ORGANIZATION_ID": "300000106686884",
                    "updatedBy": "bhiaRBrWjFWZPpRapph1m8",
                    "createdBy": "bhiaRBrWjFWZPpRapph1m8",
                    "_recordId": "83HeTLHuL5MBvyPjcvqPBB",
                    "FIRST_PARTY_ORG_ID": "300000106939043",
                    "updatedAt": "2022-12-21T16:21:29.164Z",
                    "ATX_CUSTOMER_LEGAL_ENTITIES": [
                        {
                            "updatedBy": "bhiaRBrWjFWZPpRapph1m8",
                            "ATX_CERTIFICATE_CLIENT_ID": "",
                            "ATX_JURISDICTION_CODE_PREFIX": "",
                            "_recordId": "ubRzc9NoZwAjLZS6RruhmC",
                            "ATX_LEGAL_ENTITY_ID": "300000106939017",
                            "createdAt": "2022-12-08T09:15:05.026Z",
                            "ATX_TAX_REGIME_CODE": "",
                            "ATX_COMPANY_CODE": "FUSIONOCICFGCANADAV2",
                            "createdBy": "bhiaRBrWjFWZPpRapph1m8",
                            "ATX_TAX_MODULE": "ILSL",
                            "ATX_LEGAL_ENTITY_NAME": "SmartERP Japan LE",
                            "updatedAt": "2022-12-21T16:21:29.625Z",
                            "ATX_COUNTRY": "JP"
                        }
                    ],
                    "ATX_BUSINESS_UNIT_REGIME_SUBSCRIPTION": [],
                    "ATX_AP_TOLERANCE": {}
                },
                {
                    "createdAt": "2022-12-08T09:15:04.511Z",
                    "ATX_BUSINESS_UNIT": "AppKnit AFC US BU",
                    "ATX_BUSINESS_UNIT_ORGANIZATION_ID": "300000020674465",
                    "updatedBy": "bhiaRBrWjFWZPpRapph1m8",
                    "createdBy": "bhiaRBrWjFWZPpRapph1m8",
                    "_recordId": "gFQRx1N5yK9Gey1kAAWoGa",
                    "FIRST_PARTY_ORG_ID": "300000020580800",
                    "updatedAt": "2022-12-21T16:21:26.190Z",
                    "ATX_CUSTOMER_LEGAL_ENTITIES": [
                        {
                            "updatedBy": "bhiaRBrWjFWZPpRapph1m8",
                            "ATX_CERTIFICATE_CLIENT_ID": "",
                            "ATX_JURISDICTION_CODE_PREFIX": "USCTJ1",
                            "_recordId": "1NpLj4y3aomhtwz4VxCYa9",
                            "ATX_LEGAL_ENTITY_ID": "300000020579963",
                            "createdAt": "2022-12-08T09:15:04.519Z",
                            "ATX_TAX_REGIME_CODE": "AVATAX COMM TAX1",
                            "createdBy": "bhiaRBrWjFWZPpRapph1m8",
                            "ATX_COMPANY_CODE": "ABC",
                            "ATX_TAX_MODULE": "ILCM",
                            "ATX_LEGAL_ENTITY_NAME": "AppKnit AFC US LE",
                            "updatedAt": "2022-12-21T16:21:26.831Z",
                            "ATX_COUNTRY": "US"
                        }
                    ],
                    "ATX_BUSINESS_UNIT_REGIME_SUBSCRIPTION": [],
                    "ATX_AP_TOLERANCE": {}
                },
                {
                    "createdAt": "2022-12-08T09:15:04.473Z",
                    "ATX_BUSINESS_UNIT": "Appknit US BU",
                    "ATX_BUSINESS_UNIT_ORGANIZATION_ID": "300000011481057",
                    "updatedBy": "bhiaRBrWjFWZPpRapph1m8",
                    "createdBy": "bhiaRBrWjFWZPpRapph1m8",
                    "_recordId": "vkp6bqY4N8ib11kYr18HiC",
                    "FIRST_PARTY_ORG_ID": "300000011343035",
                    "updatedAt": "2022-12-21T16:21:24.883Z",
                    "ATX_CUSTOMER_LEGAL_ENTITIES": [
                        {
                            "updatedBy": "bhiaRBrWjFWZPpRapph1m8",
                            "ATX_CERTIFICATE_CLIENT_ID": "",
                            "ATX_JURISDICTION_CODE_PREFIX": "USTJ",
                            "_recordId": "9F3osfPZ9ivqZAQ3Yu69eD",
                            "ATX_LEGAL_ENTITY_ID": "300000011342033",
                            "createdAt": "2022-12-08T09:15:04.482Z",
                            "ATX_TAX_REGIME_CODE": "AVATAX US SALES AND USE TAX",
                            "ATX_COMPANY_CODE": "FUSION-OCICFG",
                            "createdBy": "bhiaRBrWjFWZPpRapph1m8",
                            "ATX_TAX_MODULE": "USEX",
                            "ATX_LEGAL_ENTITY_NAME": "Appknit US LE",
                            "updatedAt": "2022-12-21T16:21:25.508Z",
                            "ATX_COUNTRY": "US"
                        }
                    ],
                    "ATX_BUSINESS_UNIT_REGIME_SUBSCRIPTION": [],
                    "ATX_AP_TOLERANCE": {}
                }
            ],
            "ATX_COUNTRIES": [
                {
                    "createdAt": "2022-12-08T09:15:14.529Z",
                    "updatedBy": "bhiaRBrWjFWZPpRapph1m8",
                    "createdBy": "bhiaRBrWjFWZPpRapph1m8",
                    "_recordId": "vADuBoM7X215z3ByhG3Rik",
                    "updatedAt": "2022-12-21T16:22:12.312Z",
                    "ATX_COUNTRY": "AU",
                    "ATX_COUNTRIES_REGIME_DETAILS": [
                        {
                            "createdAt": "2022-12-08T09:15:14.648Z",
                            "ATX_TAX_NAME": "",
                            "updatedBy": "bhiaRBrWjFWZPpRapph1m8",
                            "ATX_TAX_REGIME_CODE": "AVATAX AU INPUT GST",
                            "createdBy": "bhiaRBrWjFWZPpRapph1m8",
                            "ATX_JURISDICTION_CODE_PREFIX": "AUTJ",
                            "_recordId": "3gSYUq4hbk1NQwJq58ho5v",
                            "ATX_APPLICATION": "AP",
                            "ATX_TAX_CODE": "AU INPUT GST",
                            "updatedAt": "2022-12-21T16:22:13.171Z",
                            "ATX_COUNTRY": "AU"
                        },
                        {
                            "createdAt": "2022-12-08T09:15:14.753Z",
                            "ATX_TAX_NAME": "",
                            "updatedBy": "bhiaRBrWjFWZPpRapph1m8",
                            "ATX_TAX_REGIME_CODE": "AVATAX AU OUTPUT GST",
                            "createdBy": "bhiaRBrWjFWZPpRapph1m8",
                            "ATX_JURISDICTION_CODE_PREFIX": "AUTJ",
                            "_recordId": "3m4QUmHf2T4xky3Jt5pik3",
                            "ATX_APPLICATION": "AR",
                            "ATX_TAX_CODE": "AU OUTPUT GST",
                            "updatedAt": "2022-12-21T16:22:13.352Z",
                            "ATX_COUNTRY": "AU"
                        }
                    ]
                },
                {
                    "createdAt": "2022-12-08T09:15:15.245Z",
                    "updatedBy": "bhiaRBrWjFWZPpRapph1m8",
                    "createdBy": "bhiaRBrWjFWZPpRapph1m8",
                    "_recordId": "v7o4vT22rg8L6hZzMyQy4e",
                    "updatedAt": "2022-12-21T16:22:14.482Z",
                    "ATX_COUNTRY": "CA",
                    "ATX_COUNTRIES_REGIME_DETAILS": [
                        {
                            "createdAt": "2022-12-08T09:15:15.371Z",
                            "ATX_TAX_NAME": "",
                            "updatedBy": "bhiaRBrWjFWZPpRapph1m8",
                            "ATX_TAX_REGIME_CODE": "AVATAX CA INPUT2 QST",
                            "createdBy": "bhiaRBrWjFWZPpRapph1m8",
                            "ATX_JURISDICTION_CODE_PREFIX": "",
                            "_recordId": "8XnYpbysxL5q2ReLsng5ge",
                            "ATX_APPLICATION": "AP",
                            "ATX_TAX_CODE": "CA INPUT2 QST",
                            "updatedAt": "2022-12-21T16:22:16.215Z",
                            "ATX_COUNTRY": "CA"
                        },
                        {
                            "createdAt": "2022-12-08T09:15:15.388Z",
                            "ATX_TAX_NAME": "",
                            "updatedBy": "bhiaRBrWjFWZPpRapph1m8",
                            "ATX_TAX_REGIME_CODE": "AVATAX CA OUTPUT2 HST",
                            "createdBy": "bhiaRBrWjFWZPpRapph1m8",
                            "ATX_JURISDICTION_CODE_PREFIX": "",
                            "_recordId": "vT3Ev8Ki1b6uKQLS1PmCoV",
                            "ATX_APPLICATION": "AR",
                            "ATX_TAX_CODE": "CA OUTPUT2 HST",
                            "updatedAt": "2022-12-21T16:22:16.753Z",
                            "ATX_COUNTRY": "CA"
                        },
                        {
                            "createdAt": "2022-12-08T09:15:15.354Z",
                            "ATX_TAX_NAME": "",
                            "updatedBy": "bhiaRBrWjFWZPpRapph1m8",
                            "ATX_TAX_REGIME_CODE": "AVATAX CA INPUT2 HST",
                            "createdBy": "bhiaRBrWjFWZPpRapph1m8",
                            "ATX_JURISDICTION_CODE_PREFIX": "",
                            "_recordId": "hYMXzuLscmiD4AUm8mWVAM",
                            "ATX_APPLICATION": "AP",
                            "ATX_TAX_CODE": "CA INPUT2 HST",
                            "updatedAt": "2022-12-21T16:22:15.675Z",
                            "ATX_COUNTRY": "CA"
                        },
                        {
                            "createdAt": "2022-12-08T09:15:15.379Z",
                            "ATX_TAX_NAME": "",
                            "updatedBy": "bhiaRBrWjFWZPpRapph1m8",
                            "ATX_TAX_REGIME_CODE": "AVATAX CA OUTPUT2 GST",
                            "createdBy": "bhiaRBrWjFWZPpRapph1m8",
                            "ATX_JURISDICTION_CODE_PREFIX": "",
                            "_recordId": "dAka7b4fjMq6HJaevosQhd",
                            "ATX_APPLICATION": "AR",
                            "ATX_TAX_CODE": "CA OUTPUT2 GST",
                            "updatedAt": "2022-12-21T16:22:16.483Z",
                            "ATX_COUNTRY": "CA"
                        },
                        {
                            "createdAt": "2022-12-08T09:15:15.405Z",
                            "ATX_TAX_NAME": "",
                            "updatedBy": "bhiaRBrWjFWZPpRapph1m8",
                            "ATX_TAX_REGIME_CODE": "AVATAX CA OUTPUT2 QST",
                            "createdBy": "bhiaRBrWjFWZPpRapph1m8",
                            "ATX_JURISDICTION_CODE_PREFIX": "",
                            "_recordId": "qciaNs4QNGooCXdVzDaj9U",
                            "ATX_APPLICATION": "AR",
                            "ATX_TAX_CODE": "CA OUTPUT2 QST",
                            "updatedAt": "2022-12-21T16:22:17.295Z",
                            "ATX_COUNTRY": "CA"
                        },
                        {
                            "createdAt": "2022-12-08T09:15:15.364Z",
                            "ATX_TAX_NAME": "",
                            "updatedBy": "bhiaRBrWjFWZPpRapph1m8",
                            "ATX_TAX_REGIME_CODE": "AVATAX CA INPUT2 PST",
                            "createdBy": "bhiaRBrWjFWZPpRapph1m8",
                            "ATX_JURISDICTION_CODE_PREFIX": "",
                            "_recordId": "kfgPGPXAn9YJaLJ8QHaAyj",
                            "ATX_APPLICATION": "AP",
                            "ATX_TAX_CODE": "CA INPUT2 PST",
                            "updatedAt": "2022-12-21T16:22:15.942Z",
                            "ATX_COUNTRY": "CA"
                        },
                        {
                            "createdAt": "2022-12-08T09:15:15.287Z",
                            "ATX_TAX_NAME": "",
                            "updatedBy": "bhiaRBrWjFWZPpRapph1m8",
                            "ATX_TAX_REGIME_CODE": "AVATAX CA INPUT2 GST",
                            "createdBy": "bhiaRBrWjFWZPpRapph1m8",
                            "ATX_JURISDICTION_CODE_PREFIX": "",
                            "_recordId": "42f5iWsFNSWbUNv2Lci6S4",
                            "ATX_APPLICATION": "AP",
                            "ATX_TAX_CODE": "CA INPUT2 GST",
                            "updatedAt": "2022-12-21T16:22:15.331Z",
                            "ATX_COUNTRY": "CA"
                        },
                        {
                            "createdAt": "2022-12-08T09:15:15.397Z",
                            "ATX_TAX_NAME": "",
                            "updatedBy": "bhiaRBrWjFWZPpRapph1m8",
                            "ATX_TAX_REGIME_CODE": "AVATAX CA OUTPUT2 PST",
                            "createdBy": "bhiaRBrWjFWZPpRapph1m8",
                            "ATX_JURISDICTION_CODE_PREFIX": "",
                            "_recordId": "exinaAoP9Jfw41CQ9oBuAF",
                            "ATX_APPLICATION": "AR",
                            "ATX_TAX_CODE": "CA OUTPUT2 PST",
                            "updatedAt": "2022-12-21T16:22:17.023Z",
                            "ATX_COUNTRY": "CA"
                        }
                    ]
                },
                {
                    "createdAt": "2022-12-08T09:15:15.747Z",
                    "updatedBy": "bhiaRBrWjFWZPpRapph1m8",
                    "createdBy": "bhiaRBrWjFWZPpRapph1m8",
                    "_recordId": "5qpvRmJ2HNxUZQuMKwGMQ4",
                    "updatedAt": "2022-12-21T16:22:18.663Z",
                    "ATX_COUNTRY": "CO",
                    "ATX_COUNTRIES_REGIME_DETAILS": [
                        {
                            "createdAt": "2022-12-08T09:15:15.787Z",
                            "ATX_TAX_NAME": "",
                            "updatedBy": "bhiaRBrWjFWZPpRapph1m8",
                            "ATX_TAX_REGIME_CODE": "AVATAX CO OUTPUT VAT",
                            "createdBy": "bhiaRBrWjFWZPpRapph1m8",
                            "ATX_JURISDICTION_CODE_PREFIX": "COTJ",
                            "_recordId": "qpK1bYvitXvkFcQ3Z4tHew",
                            "ATX_APPLICATION": "AR",
                            "ATX_TAX_CODE": "CO OUTPUT VAT",
                            "updatedAt": "2022-12-21T16:22:19.117Z",
                            "ATX_COUNTRY": "CO"
                        }
                    ]
                },
                {
                    "createdAt": "2022-12-08T09:15:16.187Z",
                    "updatedBy": "bhiaRBrWjFWZPpRapph1m8",
                    "createdBy": "bhiaRBrWjFWZPpRapph1m8",
                    "_recordId": "4DyCux31smSwnXwfs2r9Sy",
                    "updatedAt": "2022-12-21T16:22:19.942Z",
                    "ATX_COUNTRY": "FR",
                    "ATX_COUNTRIES_REGIME_DETAILS": [
                        {
                            "createdAt": "2022-12-08T09:15:16.296Z",
                            "ATX_TAX_NAME": "",
                            "updatedBy": "bhiaRBrWjFWZPpRapph1m8",
                            "ATX_TAX_REGIME_CODE": "AVATAX FR OUTPUT VAT2",
                            "createdBy": "bhiaRBrWjFWZPpRapph1m8",
                            "ATX_JURISDICTION_CODE_PREFIX": "FRTJ2",
                            "_recordId": "gLmxjq8RTUTbZn8hnLjXTA",
                            "ATX_APPLICATION": "AR",
                            "ATX_TAX_CODE": "FR OUTPUT VAT",
                            "updatedAt": "2022-12-21T16:22:20.590Z",
                            "ATX_COUNTRY": "FR"
                        },
                        {
                            "createdAt": "2022-12-08T09:15:16.221Z",
                            "ATX_TAX_NAME": "",
                            "updatedBy": "bhiaRBrWjFWZPpRapph1m8",
                            "ATX_TAX_REGIME_CODE": "AVATAX FR INPUT VAT2",
                            "createdBy": "bhiaRBrWjFWZPpRapph1m8",
                            "ATX_JURISDICTION_CODE_PREFIX": "FRTJ2",
                            "_recordId": "apSGuQbnktw54XfRouM7wK",
                            "ATX_APPLICATION": "AP",
                            "ATX_TAX_CODE": "FR INPUT VAT",
                            "updatedAt": "2022-12-21T16:22:20.408Z",
                            "ATX_COUNTRY": "FR"
                        }
                    ]
                },
                {
                    "createdAt": "2022-12-08T09:15:16.667Z",
                    "updatedBy": "bhiaRBrWjFWZPpRapph1m8",
                    "createdBy": "bhiaRBrWjFWZPpRapph1m8",
                    "_recordId": "8K3pck78pq3eVJkUvBwt4U",
                    "updatedAt": "2022-12-21T16:22:21.465Z",
                    "ATX_COUNTRY": "IE",
                    "ATX_COUNTRIES_REGIME_DETAILS": [
                        {
                            "createdAt": "2022-12-08T09:15:16.765Z",
                            "ATX_TAX_NAME": "",
                            "updatedBy": "bhiaRBrWjFWZPpRapph1m8",
                            "ATX_TAX_REGIME_CODE": "AVATAX IE OUTPUT VAT2",
                            "createdBy": "bhiaRBrWjFWZPpRapph1m8",
                            "ATX_JURISDICTION_CODE_PREFIX": "IETJ2",
                            "_recordId": "ayAZPL8cQLfArBfrTCPYXX",
                            "ATX_APPLICATION": "AR",
                            "ATX_TAX_CODE": "IE OUTPUT VAT",
                            "updatedAt": "2022-12-21T16:22:22.220Z",
                            "ATX_COUNTRY": "IE"
                        },
                        {
                            "createdAt": "2022-12-08T09:15:16.700Z",
                            "ATX_TAX_NAME": "",
                            "updatedBy": "bhiaRBrWjFWZPpRapph1m8",
                            "ATX_TAX_REGIME_CODE": "AVATAX IE INPUT VAT2",
                            "createdBy": "bhiaRBrWjFWZPpRapph1m8",
                            "ATX_JURISDICTION_CODE_PREFIX": "IETJ2",
                            "_recordId": "abS6pqKdt62xfxgdxzuC6Z",
                            "ATX_APPLICATION": "AP",
                            "ATX_TAX_CODE": "IE INPUT VAT",
                            "updatedAt": "2022-12-21T16:22:22.052Z",
                            "ATX_COUNTRY": "IE"
                        }
                    ]
                },
                {
                    "createdAt": "2022-12-08T09:15:17.133Z",
                    "updatedBy": "bhiaRBrWjFWZPpRapph1m8",
                    "createdBy": "bhiaRBrWjFWZPpRapph1m8",
                    "_recordId": "domV1Lucu4JUGi4cevvqjw",
                    "updatedAt": "2022-12-21T16:22:23.078Z",
                    "ATX_COUNTRY": "IL",
                    "ATX_COUNTRIES_REGIME_DETAILS": [
                        {
                            "createdAt": "2022-12-08T09:15:17.169Z",
                            "ATX_TAX_NAME": "",
                            "updatedBy": "bhiaRBrWjFWZPpRapph1m8",
                            "ATX_TAX_REGIME_CODE": "AVATAX IL INPUT VAT2",
                            "createdBy": "bhiaRBrWjFWZPpRapph1m8",
                            "ATX_JURISDICTION_CODE_PREFIX": "ILTJ2",
                            "_recordId": "eoDUSSWzYbtXCATRRyQ5JE",
                            "ATX_APPLICATION": "AP",
                            "ATX_TAX_CODE": "IL INPUT VAT",
                            "updatedAt": "2022-12-21T16:22:23.531Z",
                            "ATX_COUNTRY": "IL"
                        },
                        {
                            "createdAt": "2022-12-08T09:15:17.234Z",
                            "ATX_TAX_NAME": "",
                            "updatedBy": "bhiaRBrWjFWZPpRapph1m8",
                            "ATX_TAX_REGIME_CODE": "AVATAX IL OUTPUT VAT2",
                            "createdBy": "bhiaRBrWjFWZPpRapph1m8",
                            "ATX_JURISDICTION_CODE_PREFIX": "ILTJ2",
                            "_recordId": "21iRCazzi9tDr4JHesP4vb",
                            "ATX_APPLICATION": "AR",
                            "ATX_TAX_CODE": "IL OUTPUT VAT",
                            "updatedAt": "2022-12-21T16:22:23.690Z",
                            "ATX_COUNTRY": "IL"
                        }
                    ]
                },
                {
                    "createdAt": "2022-12-08T09:15:17.620Z",
                    "updatedBy": "bhiaRBrWjFWZPpRapph1m8",
                    "createdBy": "bhiaRBrWjFWZPpRapph1m8",
                    "_recordId": "ajJLS2zW7Hc7MTzsN1m5nu",
                    "updatedAt": "2022-12-21T16:22:24.696Z",
                    "ATX_COUNTRY": "IN",
                    "ATX_COUNTRIES_REGIME_DETAILS": [
                        {
                            "createdAt": "2022-12-08T09:15:17.731Z",
                            "ATX_TAX_NAME": "UTGST",
                            "updatedBy": "bhiaRBrWjFWZPpRapph1m8",
                            "ATX_TAX_REGIME_CODE": "AVATAX IN INPUT GST",
                            "createdBy": "bhiaRBrWjFWZPpRapph1m8",
                            "ATX_JURISDICTION_CODE_PREFIX": "INTJ",
                            "_recordId": "cKXjdG3hC5wrBvAJ5u9mkt",
                            "ATX_APPLICATION": "AP",
                            "ATX_TAX_CODE": "IN INPUT UTGST",
                            "updatedAt": "2022-12-21T16:22:26.152Z",
                            "ATX_COUNTRY": "IN"
                        },
                        {
                            "createdAt": "2022-12-08T09:15:17.761Z",
                            "ATX_TAX_NAME": "UTGST",
                            "updatedBy": "bhiaRBrWjFWZPpRapph1m8",
                            "ATX_TAX_REGIME_CODE": "AVATAX IN OUTPUT GST",
                            "createdBy": "bhiaRBrWjFWZPpRapph1m8",
                            "ATX_JURISDICTION_CODE_PREFIX": "INTJ",
                            "_recordId": "6uQhQHi4wbXzqP18p19cFL",
                            "ATX_APPLICATION": "AR",
                            "ATX_TAX_CODE": "IN OUTPUT UTGST",
                            "updatedAt": "2022-12-21T16:22:27.208Z",
                            "ATX_COUNTRY": "IN"
                        },
                        {
                            "createdAt": "2022-12-08T09:15:17.724Z",
                            "ATX_TAX_NAME": "SGST",
                            "updatedBy": "bhiaRBrWjFWZPpRapph1m8",
                            "ATX_TAX_REGIME_CODE": "AVATAX IN INPUT GST",
                            "createdBy": "bhiaRBrWjFWZPpRapph1m8",
                            "ATX_JURISDICTION_CODE_PREFIX": "INTJ",
                            "_recordId": "62iYbNqvVNPoDXExg9HFqb",
                            "ATX_APPLICATION": "AP",
                            "ATX_TAX_CODE": "IN INPUT SGST",
                            "updatedAt": "2022-12-21T16:22:25.881Z",
                            "ATX_COUNTRY": "IN"
                        },
                        {
                            "createdAt": "2022-12-08T09:15:17.754Z",
                            "ATX_TAX_NAME": "SGST",
                            "updatedBy": "bhiaRBrWjFWZPpRapph1m8",
                            "ATX_TAX_REGIME_CODE": "AVATAX IN OUTPUT GST",
                            "createdBy": "bhiaRBrWjFWZPpRapph1m8",
                            "ATX_JURISDICTION_CODE_PREFIX": "INTJ",
                            "_recordId": "h6hChUNCHzkiXFH6JCxQn5",
                            "ATX_APPLICATION": "AR",
                            "ATX_TAX_CODE": "IN OUTPUT SGST",
                            "updatedAt": "2022-12-21T16:22:26.945Z",
                            "ATX_COUNTRY": "IN"
                        },
                        {
                            "createdAt": "2022-12-08T09:15:17.738Z",
                            "ATX_TAX_NAME": "CGST",
                            "updatedBy": "bhiaRBrWjFWZPpRapph1m8",
                            "ATX_TAX_REGIME_CODE": "AVATAX IN OUTPUT GST",
                            "createdBy": "bhiaRBrWjFWZPpRapph1m8",
                            "ATX_JURISDICTION_CODE_PREFIX": "INTJ",
                            "_recordId": "7i3EKqAEd5Q2pvzN6ZuBve",
                            "ATX_APPLICATION": "AR",
                            "ATX_TAX_CODE": "IN OUTPUT CGST",
                            "updatedAt": "2022-12-21T16:22:26.413Z",
                            "ATX_COUNTRY": "IN"
                        },
                        {
                            "createdAt": "2022-12-08T09:15:17.746Z",
                            "ATX_TAX_NAME": "IGST",
                            "updatedBy": "bhiaRBrWjFWZPpRapph1m8",
                            "ATX_TAX_REGIME_CODE": "AVATAX IN OUTPUT GST",
                            "createdBy": "bhiaRBrWjFWZPpRapph1m8",
                            "ATX_JURISDICTION_CODE_PREFIX": "INTJ",
                            "_recordId": "xwtRmYHBEfoqMNiqDrVzS2",
                            "ATX_APPLICATION": "AR",
                            "ATX_TAX_CODE": "IN OUTPUT IGST",
                            "updatedAt": "2022-12-21T16:22:26.679Z",
                            "ATX_COUNTRY": "IN"
                        },
                        {
                            "createdAt": "2022-12-08T09:15:17.656Z",
                            "ATX_TAX_NAME": "CGST",
                            "updatedBy": "bhiaRBrWjFWZPpRapph1m8",
                            "ATX_TAX_REGIME_CODE": "AVATAX IN INPUT GST",
                            "createdBy": "bhiaRBrWjFWZPpRapph1m8",
                            "ATX_JURISDICTION_CODE_PREFIX": "INTJ",
                            "_recordId": "ojcus7nsTtT4djf2W33TLx",
                            "ATX_APPLICATION": "AP",
                            "ATX_TAX_CODE": "IN INPUT CGST",
                            "updatedAt": "2022-12-21T16:22:25.285Z",
                            "ATX_COUNTRY": "IN"
                        },
                        {
                            "createdAt": "2022-12-08T09:15:17.717Z",
                            "ATX_TAX_NAME": "IGST",
                            "updatedBy": "bhiaRBrWjFWZPpRapph1m8",
                            "ATX_TAX_REGIME_CODE": "AVATAX IN INPUT GST",
                            "createdBy": "bhiaRBrWjFWZPpRapph1m8",
                            "ATX_JURISDICTION_CODE_PREFIX": "INTJ",
                            "_recordId": "fGRoEEU9VB1Nz9129WPUfw",
                            "ATX_APPLICATION": "AP",
                            "ATX_TAX_CODE": "IN INPUT IGST",
                            "updatedAt": "2022-12-21T16:22:25.617Z",
                            "ATX_COUNTRY": "IN"
                        }
                    ]
                },
                {
                    "createdAt": "2022-12-08T09:15:18.105Z",
                    "updatedBy": "bhiaRBrWjFWZPpRapph1m8",
                    "createdBy": "bhiaRBrWjFWZPpRapph1m8",
                    "_recordId": "6B4NtECGvqJ7ZSMhZNw8Gz",
                    "updatedAt": "2022-12-21T16:22:28.508Z",
                    "ATX_COUNTRY": "IT",
                    "ATX_COUNTRIES_REGIME_DETAILS": [
                        {
                            "createdAt": "2022-12-08T09:15:18.136Z",
                            "ATX_TAX_NAME": "",
                            "updatedBy": "bhiaRBrWjFWZPpRapph1m8",
                            "ATX_TAX_REGIME_CODE": "AVATAX IT INPUT VAT",
                            "createdBy": "bhiaRBrWjFWZPpRapph1m8",
                            "ATX_JURISDICTION_CODE_PREFIX": "ITTJ",
                            "_recordId": "gCvdExmVib6kb4ac1yujv3",
                            "ATX_APPLICATION": "AP",
                            "ATX_TAX_CODE": "IT INPUT VAT",
                            "updatedAt": "2022-12-21T16:22:28.961Z",
                            "ATX_COUNTRY": "IT"
                        },
                        {
                            "createdAt": "2022-12-08T09:15:18.200Z",
                            "ATX_TAX_NAME": "",
                            "updatedBy": "bhiaRBrWjFWZPpRapph1m8",
                            "ATX_TAX_REGIME_CODE": "AVATAX IT OUTPUT VAT",
                            "createdBy": "bhiaRBrWjFWZPpRapph1m8",
                            "ATX_JURISDICTION_CODE_PREFIX": "ITTJ",
                            "_recordId": "qEfSPDmuFWUz1QydPtDhFB",
                            "ATX_APPLICATION": "AR",
                            "ATX_TAX_CODE": "IT OUTPUT VAT",
                            "updatedAt": "2022-12-21T16:22:29.128Z",
                            "ATX_COUNTRY": "IT"
                        }
                    ]
                },
                {
                    "createdAt": "2022-12-08T09:15:18.551Z",
                    "updatedBy": "bhiaRBrWjFWZPpRapph1m8",
                    "createdBy": "bhiaRBrWjFWZPpRapph1m8",
                    "_recordId": "7983N1ZkuwfB7E9idsafoW",
                    "updatedAt": "2022-12-21T16:22:29.834Z",
                    "ATX_COUNTRY": "JP",
                    "ATX_COUNTRIES_REGIME_DETAILS": [
                        {
                            "createdAt": "2022-12-08T09:15:18.658Z",
                            "ATX_TAX_NAME": "",
                            "updatedBy": "bhiaRBrWjFWZPpRapph1m8",
                            "ATX_TAX_REGIME_CODE": "AVATAX JP OUTPUT CT",
                            "createdBy": "bhiaRBrWjFWZPpRapph1m8",
                            "ATX_JURISDICTION_CODE_PREFIX": "JPTJ",
                            "_recordId": "kL4vJxhbKmGWg3gzVRUyn9",
                            "ATX_APPLICATION": "AR",
                            "ATX_TAX_CODE": "JP OUTPUT CT",
                            "updatedAt": "2022-12-21T16:22:30.433Z",
                            "ATX_COUNTRY": "JP"
                        },
                        {
                            "createdAt": "2022-12-08T09:15:18.586Z",
                            "ATX_TAX_NAME": "",
                            "updatedBy": "bhiaRBrWjFWZPpRapph1m8",
                            "ATX_TAX_REGIME_CODE": "AVATAX JP INPUT CT",
                            "createdBy": "bhiaRBrWjFWZPpRapph1m8",
                            "ATX_JURISDICTION_CODE_PREFIX": "JPTJ",
                            "_recordId": "oLWHeG8hoJ4dYQEGL9Qiy6",
                            "ATX_APPLICATION": "AP",
                            "ATX_TAX_CODE": "JP INPUT CT",
                            "updatedAt": "2022-12-21T16:22:30.279Z",
                            "ATX_COUNTRY": "JP"
                        }
                    ]
                },
                {
                    "createdAt": "2022-12-08T09:15:18.973Z",
                    "updatedBy": "bhiaRBrWjFWZPpRapph1m8",
                    "createdBy": "bhiaRBrWjFWZPpRapph1m8",
                    "_recordId": "bvt8i7nRmnMvWhmkau5D7X",
                    "updatedAt": "2022-12-21T16:22:31.170Z",
                    "ATX_COUNTRY": "MX",
                    "ATX_COUNTRIES_REGIME_DETAILS": [
                        {
                            "createdAt": "2022-12-08T09:15:19.008Z",
                            "ATX_TAX_NAME": "",
                            "updatedBy": "bhiaRBrWjFWZPpRapph1m8",
                            "ATX_TAX_REGIME_CODE": "AVATAX MX INPUT VAT",
                            "createdBy": "bhiaRBrWjFWZPpRapph1m8",
                            "ATX_JURISDICTION_CODE_PREFIX": "MXTJ",
                            "_recordId": "dSNjA2f1bzJbYmu4dcxPor",
                            "ATX_APPLICATION": "AP",
                            "ATX_TAX_CODE": "MX INPUT VAT",
                            "updatedAt": "2022-12-21T16:22:31.786Z",
                            "ATX_COUNTRY": "MX"
                        },
                        {
                            "createdAt": "2022-12-08T09:15:19.074Z",
                            "ATX_TAX_NAME": "",
                            "updatedBy": "bhiaRBrWjFWZPpRapph1m8",
                            "ATX_TAX_REGIME_CODE": "AVATAX MX OUTPUT VAT",
                            "createdBy": "bhiaRBrWjFWZPpRapph1m8",
                            "ATX_JURISDICTION_CODE_PREFIX": "MXTJ",
                            "_recordId": "hxHX2p8J1gq1yNMwXzSr49",
                            "ATX_APPLICATION": "AR",
                            "ATX_TAX_CODE": "MX OUTPUT VAT",
                            "updatedAt": "2022-12-21T16:22:31.940Z",
                            "ATX_COUNTRY": "MX"
                        }
                    ]
                },
                {
                    "createdAt": "2022-12-08T09:15:19.421Z",
                    "updatedBy": "bhiaRBrWjFWZPpRapph1m8",
                    "createdBy": "bhiaRBrWjFWZPpRapph1m8",
                    "_recordId": "4LiY8tRLCGSzc6NHzECQDU",
                    "updatedAt": "2022-12-21T16:22:32.730Z",
                    "ATX_COUNTRY": "NL",
                    "ATX_COUNTRIES_REGIME_DETAILS": [
                        {
                            "createdAt": "2022-12-08T09:15:19.472Z",
                            "ATX_TAX_NAME": "",
                            "updatedBy": "bhiaRBrWjFWZPpRapph1m8",
                            "ATX_TAX_REGIME_CODE": "AVATAX NL INPUT VAT",
                            "createdBy": "bhiaRBrWjFWZPpRapph1m8",
                            "ATX_JURISDICTION_CODE_PREFIX": "NLTJ",
                            "_recordId": "8Mu72ASkDPyA6uKF2VfajT",
                            "ATX_APPLICATION": "AP",
                            "ATX_TAX_CODE": "NL INPUT VAT",
                            "updatedAt": "2022-12-21T16:22:33.479Z",
                            "ATX_COUNTRY": "NL"
                        },
                        {
                            "createdAt": "2022-12-08T09:15:19.538Z",
                            "ATX_TAX_NAME": "",
                            "updatedBy": "bhiaRBrWjFWZPpRapph1m8",
                            "ATX_TAX_REGIME_CODE": "AVATAX NL OUTPUT VAT",
                            "createdBy": "bhiaRBrWjFWZPpRapph1m8",
                            "ATX_JURISDICTION_CODE_PREFIX": "NLTJ",
                            "_recordId": "3fWooYHQ42xPDHNbs5MzzT",
                            "ATX_APPLICATION": "AR",
                            "ATX_TAX_CODE": "NL OUTPUT VAT",
                            "updatedAt": "2022-12-21T16:22:33.716Z",
                            "ATX_COUNTRY": "NL"
                        }
                    ]
                },
                {
                    "createdAt": "2022-12-08T09:15:19.899Z",
                    "updatedBy": "bhiaRBrWjFWZPpRapph1m8",
                    "createdBy": "bhiaRBrWjFWZPpRapph1m8",
                    "_recordId": "3SyboHLkMTzacyNk6hcwMV",
                    "updatedAt": "2022-12-21T16:22:34.390Z",
                    "ATX_COUNTRY": "SG",
                    "ATX_COUNTRIES_REGIME_DETAILS": [
                        {
                            "createdAt": "2022-12-08T09:15:20.004Z",
                            "ATX_TAX_NAME": "",
                            "updatedBy": "bhiaRBrWjFWZPpRapph1m8",
                            "ATX_TAX_REGIME_CODE": "AVATAX SG OUTPUT GST2",
                            "createdBy": "bhiaRBrWjFWZPpRapph1m8",
                            "ATX_JURISDICTION_CODE_PREFIX": "SGTJ2",
                            "_recordId": "2c2LcqMeTeBSZjzr8RkFUb",
                            "ATX_APPLICATION": "AR",
                            "ATX_TAX_CODE": "SG OUTPUT GST",
                            "updatedAt": "2022-12-21T16:22:35.257Z",
                            "ATX_COUNTRY": "SG"
                        },
                        {
                            "createdAt": "2022-12-08T09:15:19.934Z",
                            "ATX_TAX_NAME": "",
                            "updatedBy": "bhiaRBrWjFWZPpRapph1m8",
                            "ATX_TAX_REGIME_CODE": "AVATAX SG INPUT GST2",
                            "createdBy": "bhiaRBrWjFWZPpRapph1m8",
                            "ATX_JURISDICTION_CODE_PREFIX": "SGTJ2",
                            "_recordId": "abZ7ibTwf1uPu77zypkJyt",
                            "ATX_APPLICATION": "AP",
                            "ATX_TAX_CODE": "SG INPUT GST",
                            "updatedAt": "2022-12-21T16:22:35.101Z",
                            "ATX_COUNTRY": "SG"
                        }
                    ]
                },
                {
                    "createdAt": "2022-12-08T09:15:20.365Z",
                    "updatedBy": "bhiaRBrWjFWZPpRapph1m8",
                    "createdBy": "bhiaRBrWjFWZPpRapph1m8",
                    "_recordId": "8osJJ1k2spMwRAQuxu22Xu",
                    "updatedAt": "2022-12-21T16:22:35.897Z",
                    "ATX_COUNTRY": "XI",
                    "ATX_COUNTRIES_REGIME_DETAILS": [
                        {
                            "createdAt": "2022-12-08T09:15:20.400Z",
                            "ATX_TAX_NAME": "",
                            "updatedBy": "bhiaRBrWjFWZPpRapph1m8",
                            "ATX_TAX_REGIME_CODE": "AVATAX XI OUTPUT VAT",
                            "createdBy": "bhiaRBrWjFWZPpRapph1m8",
                            "ATX_JURISDICTION_CODE_PREFIX": "XITJ",
                            "_recordId": "jeJF5Jii3MNkMVfonJwE3q",
                            "ATX_APPLICATION": "AR",
                            "ATX_TAX_CODE": "XI OUTPUT VAT",
                            "updatedAt": "2022-12-21T16:22:36.356Z",
                            "ATX_COUNTRY": "XI"
                        }
                    ]
                }
            ],
            "ATX_FIELD_MAPPING": [
                {
                    "ATX_FIELD": "CustomerCode",
                    "createdAt": "2022-12-16T05:27:53.238Z",
                    "updatedBy": "bhiaRBrWjFWZPpRapph1m8",
                    "createdBy": "bhiaRBrWjFWZPpRapph1m8",
                    "_recordId": "nP7PhRBCNqt9Dot78k6yMc",
                    "ATX_APPLICATION": "AP",
                    "updatedAt": "2022-12-21T16:22:39.339Z",
                    "ATX_FIELD_MAPPING_PRIORITY": [
                        {
                            "createdAt": "2022-12-16T05:27:53.393Z",
                            "updatedBy": "bhiaRBrWjFWZPpRapph1m8",
                            "createdBy": "bhiaRBrWjFWZPpRapph1m8",
                            "ATX_PRIORITY": "10",
                            "_recordId": "sqaE21mcTxRvL2R6QYExnx",
                            "updatedAt": "2022-12-21T16:22:39.580Z",
                            "ATX_FUSION_FIELD": "VendorNumber",
                            "ATX_FUSION_FIELD_TYPE": "FFLD",
                            "ATX_FUSION_PROP_COLUMN_NAME": "ns:VendorNumber"
                        }
                    ]
                },
                {
                    "ATX_FIELD": "ITEMCODE",
                    "createdAt": "2022-12-16T05:27:54.704Z",
                    "updatedBy": "bhiaRBrWjFWZPpRapph1m8",
                    "createdBy": "bhiaRBrWjFWZPpRapph1m8",
                    "_recordId": "mkZJbqhdEYthb1dBbbbivz",
                    "ATX_APPLICATION": "AP",
                    "updatedAt": "2022-12-21T16:22:40.708Z",
                    "ATX_FIELD_MAPPING_PRIORITY": [
                        {
                            "createdAt": "2022-12-16T05:27:54.763Z",
                            "updatedBy": "bhiaRBrWjFWZPpRapph1m8",
                            "createdBy": "bhiaRBrWjFWZPpRapph1m8",
                            "ATX_PRIORITY": "20",
                            "_recordId": "duS33vBZAr2PomMBpeaHpx",
                            "updatedAt": "2022-12-21T16:22:40.945Z",
                            "ATX_FUSION_FIELD": "ProductCategory",
                            "ATX_FUSION_FIELD_TYPE": "FFLD",
                            "ATX_FUSION_PROP_COLUMN_NAME": "ns:ProductCategory"
                        },
                        {
                            "createdAt": "2022-12-16T05:27:54.924Z",
                            "updatedBy": "bhiaRBrWjFWZPpRapph1m8",
                            "createdBy": "bhiaRBrWjFWZPpRapph1m8",
                            "ATX_PRIORITY": "50",
                            "_recordId": "2obRDNALoqZWKxLsQH8UUF",
                            "updatedAt": "2022-12-21T16:22:41.366Z",
                            "ATX_FUSION_FIELD": "UserDefinedFiscClass",
                            "ATX_FUSION_FIELD_TYPE": "FFLD",
                            "ATX_FUSION_PROP_COLUMN_NAME": "ns:UserDefinedFiscClass"
                        },
                        {
                            "createdAt": "2022-12-16T05:27:54.879Z",
                            "updatedBy": "bhiaRBrWjFWZPpRapph1m8",
                            "createdBy": "bhiaRBrWjFWZPpRapph1m8",
                            "ATX_PRIORITY": "40",
                            "_recordId": "tYzQwcHWwNHVdiLa76iJkc",
                            "updatedAt": "2022-12-21T16:22:41.184Z",
                            "ATX_FUSION_FIELD": "ProductFiscClassification",
                            "ATX_FUSION_FIELD_TYPE": "FFLD",
                            "ATX_FUSION_PROP_COLUMN_NAME": "ns:ProductFiscClassification"
                        },
                        {
                            "createdAt": "2022-12-16T05:27:54.858Z",
                            "updatedBy": "bhiaRBrWjFWZPpRapph1m8",
                            "createdBy": "bhiaRBrWjFWZPpRapph1m8",
                            "ATX_PRIORITY": "10",
                            "_recordId": "pq1zVxzXKjRfG4yebMTLJk",
                            "updatedAt": "2022-12-21T16:22:41.094Z",
                            "ATX_FUSION_FIELD": "ProductCode",
                            "ATX_FUSION_FIELD_TYPE": "FFLD",
                            "ATX_FUSION_PROP_COLUMN_NAME": "ns:ProductCode"
                        },
                        {
                            "createdAt": "2022-12-16T05:27:54.901Z",
                            "updatedBy": "bhiaRBrWjFWZPpRapph1m8",
                            "createdBy": "bhiaRBrWjFWZPpRapph1m8",
                            "ATX_PRIORITY": "30",
                            "_recordId": "qaLKbEGRXh8m2e79jw9L67",
                            "updatedAt": "2022-12-21T16:22:41.275Z",
                            "ATX_FUSION_FIELD": "PurchasingCategoryID",
                            "ATX_FUSION_FIELD_TYPE": "FFLD",
                            "ATX_FUSION_PROP_COLUMN_NAME": "ns:PurchasingCategoryID"
                        }
                    ]
                },
                {
                    "ATX_FIELD": "ref1",
                    "createdAt": "2022-12-16T05:27:56.064Z",
                    "updatedBy": "bhiaRBrWjFWZPpRapph1m8",
                    "createdBy": "bhiaRBrWjFWZPpRapph1m8",
                    "_recordId": "s7g7ZW3mzWth6y5dFjEAce",
                    "ATX_APPLICATION": "AP",
                    "updatedAt": "2022-12-21T16:22:42.448Z",
                    "ATX_FIELD_MAPPING_PRIORITY": [
                        {
                            "createdAt": "2022-12-16T05:27:56.121Z",
                            "updatedBy": "bhiaRBrWjFWZPpRapph1m8",
                            "createdBy": "bhiaRBrWjFWZPpRapph1m8",
                            "ATX_PRIORITY": "10",
                            "_recordId": "5BcevR1X6H23g7wAw4o1iJ",
                            "updatedAt": "2022-12-21T16:22:42.699Z",
                            "ATX_FUSION_FIELD": "ProductType",
                            "ATX_FUSION_FIELD_TYPE": "FFLD",
                            "ATX_FUSION_PROP_COLUMN_NAME": "ns:ProductType",
                            "ATX_FUSION_FIELD_LEVEL": "LINE"
                        }
                    ]
                },
                {
                    "ATX_FIELD": "CustomerCode",
                    "createdAt": "2022-12-16T05:27:57.288Z",
                    "updatedBy": "bhiaRBrWjFWZPpRapph1m8",
                    "createdBy": "bhiaRBrWjFWZPpRapph1m8",
                    "_recordId": "fDkTcaZuUBxahNbDNxaDHv",
                    "ATX_APPLICATION": "AR",
                    "updatedAt": "2022-12-21T16:22:44.881Z",
                    "ATX_FIELD_MAPPING_PRIORITY": [
                        {
                            "createdAt": "2022-12-16T05:27:57.343Z",
                            "updatedBy": "bhiaRBrWjFWZPpRapph1m8",
                            "createdBy": "bhiaRBrWjFWZPpRapph1m8",
                            "ATX_PRIORITY": "10",
                            "_recordId": "gT6zUocax7f9ywNwywxsxU",
                            "updatedAt": "2022-12-21T16:22:45.126Z",
                            "ATX_FUSION_FIELD": "CustomerAccountNumber"
                        }
                    ]
                },
                {
                    "ATX_FIELD": "ITEMCODE",
                    "createdAt": "2022-12-16T05:27:58.437Z",
                    "updatedBy": "bhiaRBrWjFWZPpRapph1m8",
                    "createdBy": "bhiaRBrWjFWZPpRapph1m8",
                    "_recordId": "p1c3Qsp2WxhJeL6cGv8fJ3",
                    "ATX_APPLICATION": "AR",
                    "updatedAt": "2022-12-21T16:22:46.274Z",
                    "ATX_FIELD_MAPPING_PRIORITY": [
                        {
                            "createdAt": "2022-12-16T05:27:58.586Z",
                            "updatedBy": "bhiaRBrWjFWZPpRapph1m8",
                            "createdBy": "bhiaRBrWjFWZPpRapph1m8",
                            "ATX_PRIORITY": "20",
                            "_recordId": "q8TJRN69UrxxzahWSHAbY7",
                            "updatedAt": "2022-12-21T16:22:46.665Z",
                            "ATX_FUSION_FIELD": "ProductCategory",
                            "ATX_FUSION_FIELD_TYPE": "FFLD",
                            "ATX_FUSION_PROP_COLUMN_NAME": "ns:ProductCategory"
                        },
                        {
                            "createdAt": "2022-12-16T05:27:58.632Z",
                            "updatedBy": "bhiaRBrWjFWZPpRapph1m8",
                            "createdBy": "bhiaRBrWjFWZPpRapph1m8",
                            "ATX_PRIORITY": "10",
                            "_recordId": "hDA9H13KK31hbmTR2gCqY4",
                            "updatedAt": "2022-12-21T16:22:46.858Z",
                            "ATX_FUSION_FIELD": "ProductFiscClassification",
                            "ATX_FUSION_FIELD_TYPE": "FFLD",
                            "ATX_FUSION_PROP_COLUMN_NAME": "ns:ProductFiscClassification"
                        },
                        {
                            "createdAt": "2022-12-16T05:27:58.655Z",
                            "updatedBy": "bhiaRBrWjFWZPpRapph1m8",
                            "createdBy": "bhiaRBrWjFWZPpRapph1m8",
                            "ATX_PRIORITY": "50",
                            "_recordId": "fNpnCoCYMTfQEBoox6aor6",
                            "updatedAt": "2022-12-21T16:22:46.949Z",
                            "ATX_FUSION_FIELD": "UserDefinedFiscClass",
                            "ATX_FUSION_FIELD_TYPE": "FFLD",
                            "ATX_FUSION_PROP_COLUMN_NAME": "ns:UserDefinedFiscClass"
                        },
                        {
                            "createdAt": "2022-12-16T05:27:58.604Z",
                            "updatedBy": "bhiaRBrWjFWZPpRapph1m8",
                            "createdBy": "bhiaRBrWjFWZPpRapph1m8",
                            "ATX_PRIORITY": "40",
                            "_recordId": "2giK5j7zxmvJDoTFRPyozc",
                            "updatedAt": "2022-12-21T16:22:46.756Z",
                            "ATX_FUSION_FIELD": "ProductCode",
                            "ATX_FUSION_FIELD_TYPE": "FFLD",
                            "ATX_FUSION_PROP_COLUMN_NAME": "ns:ProductCode"
                        },
                        {
                            "createdAt": "2022-12-16T05:27:58.488Z",
                            "updatedBy": "bhiaRBrWjFWZPpRapph1m8",
                            "createdBy": "bhiaRBrWjFWZPpRapph1m8",
                            "ATX_PRIORITY": "30",
                            "_recordId": "rD2HVoDeTXvDiYk67vUJWc",
                            "updatedAt": "2022-12-21T16:22:46.515Z",
                            "ATX_FUSION_FIELD": "MemoLineName",
                            "ATX_FUSION_FIELD_TYPE": "FFLD",
                            "ATX_FUSION_PROP_COLUMN_NAME": "ns:MemoLineName",
                            "ATX_FUSION_FIELD_LEVEL": "LINE"
                        }
                    ]
                },
                {
                    "ATX_FIELD": "ref1",
                    "createdAt": "2022-12-16T05:27:59.905Z",
                    "updatedBy": "bhiaRBrWjFWZPpRapph1m8",
                    "createdBy": "bhiaRBrWjFWZPpRapph1m8",
                    "_recordId": "wQPBkoAr5z2MWA1L5j4w4r",
                    "ATX_APPLICATION": "AR",
                    "updatedAt": "2022-12-21T16:22:48.001Z",
                    "ATX_FIELD_MAPPING_PRIORITY": [
                        {
                            "createdAt": "2022-12-16T05:27:59.953Z",
                            "updatedBy": "bhiaRBrWjFWZPpRapph1m8",
                            "createdBy": "bhiaRBrWjFWZPpRapph1m8",
                            "ATX_PRIORITY": "1",
                            "_recordId": "87mCfbb2W4z1QFUCoXHyz1",
                            "updatedAt": "2022-12-21T16:22:48.242Z",
                            "ATX_FUSION_FIELD": "ProductCategory",
                            "ATX_FUSION_FIELD_TYPE": "FFLD",
                            "ATX_FUSION_PROP_COLUMN_NAME": "ns:ProductCategory"
                        }
                    ]
                },
                {
                    "ATX_FIELD": "ref2",
                    "createdAt": "2022-12-16T05:28:00.975Z",
                    "updatedBy": "bhiaRBrWjFWZPpRapph1m8",
                    "createdBy": "bhiaRBrWjFWZPpRapph1m8",
                    "_recordId": "cf8NWmsE5cXCvBBgaAXye2",
                    "ATX_APPLICATION": "AR",
                    "updatedAt": "2022-12-21T16:22:49.262Z",
                    "ATX_FIELD_MAPPING_PRIORITY": [
                        {
                            "createdAt": "2022-12-16T05:28:01.020Z",
                            "updatedBy": "bhiaRBrWjFWZPpRapph1m8",
                            "createdBy": "bhiaRBrWjFWZPpRapph1m8",
                            "ATX_PRIORITY": "2",
                            "_recordId": "jy2KqbvCD3BcmitmQ1Xo6K",
                            "updatedAt": "2022-12-21T16:22:49.504Z",
                            "ATX_FUSION_FIELD": "BillToGeographyValue5",
                            "ATX_FUSION_FIELD_TYPE": "FFLD",
                            "ATX_FUSION_PROP_COLUMN_NAME": "ns:BillToGeographyValue5",
                            "ATX_FUSION_FIELD_LEVEL": "LINE"
                        },
                        {
                            "createdAt": "2022-12-16T05:28:01.116Z",
                            "updatedBy": "bhiaRBrWjFWZPpRapph1m8",
                            "createdBy": "bhiaRBrWjFWZPpRapph1m8",
                            "ATX_PRIORITY": "5",
                            "_recordId": "aF7h26TmKHCQtd5jtpJF4r",
                            "updatedAt": "2022-12-21T16:22:49.747Z",
                            "ATX_FUSION_FIELD": "SEZ_OR_HSS",
                            "ATX_FUSION_FIELD_TYPE": "FADD",
                            "ATX_FUSION_PROP_COLUMN_NAME": "SEZ_OR_HSS",
                            "ATX_FUSION_FIELD_LEVEL": "HDR",
                            "ATX_REPORT_NAME": "AVALARA_AdditionalData_222"
                        },
                        {
                            "createdAt": "2022-12-16T05:28:01.097Z",
                            "updatedBy": "bhiaRBrWjFWZPpRapph1m8",
                            "createdBy": "bhiaRBrWjFWZPpRapph1m8",
                            "ATX_PRIORITY": "1",
                            "_recordId": "94pius6zbvqxxPjBw6Hetx",
                            "updatedAt": "2022-12-21T16:22:49.669Z",
                            "ATX_FUSION_FIELD": "ProductFiscClassification",
                            "ATX_FUSION_FIELD_TYPE": "FFLD",
                            "ATX_FUSION_PROP_COLUMN_NAME": "ns:ProductFiscClassification"
                        }
                    ]
                },
                {
                    "ATX_FIELD": "revenueAccount",
                    "createdAt": "2022-12-16T05:28:02.021Z",
                    "updatedBy": "bhiaRBrWjFWZPpRapph1m8",
                    "createdBy": "bhiaRBrWjFWZPpRapph1m8",
                    "_recordId": "aT3hBTAVyBuQmjyqFFLjs6",
                    "ATX_APPLICATION": "AR",
                    "updatedAt": "2022-12-21T16:22:50.753Z",
                    "ATX_FIELD_MAPPING_PRIORITY": [
                        {
                            "createdAt": "2022-12-16T05:28:02.067Z",
                            "updatedBy": "bhiaRBrWjFWZPpRapph1m8",
                            "createdBy": "bhiaRBrWjFWZPpRapph1m8",
                            "ATX_PRIORITY": "13",
                            "_recordId": "tSov22pv37DURSSc2N3FBs",
                            "updatedAt": "2022-12-21T16:22:50.997Z",
                            "ATX_FUSION_FIELD": "AccountString",
                            "ATX_FUSION_FIELD_TYPE": "FFLD",
                            "ATX_FUSION_PROP_COLUMN_NAME": "ns:AccountString"
                        }
                    ]
                },
                {
                    "ATX_FIELD": "taxCode",
                    "createdAt": "2022-12-16T05:28:04.147Z",
                    "updatedBy": "bhiaRBrWjFWZPpRapph1m8",
                    "createdBy": "bhiaRBrWjFWZPpRapph1m8",
                    "_recordId": "c9NfjTHDMDX87boHqCQKoK",
                    "ATX_APPLICATION": "AR",
                    "updatedAt": "2022-12-21T16:22:52.025Z",
                    "ATX_FIELD_MAPPING_PRIORITY": [
                        {
                            "createdAt": "2022-12-16T05:28:04.200Z",
                            "updatedBy": "bhiaRBrWjFWZPpRapph1m8",
                            "createdBy": "bhiaRBrWjFWZPpRapph1m8",
                            "ATX_PRIORITY": "10",
                            "_recordId": "vHBFpeCqSaNSzo7ND986cV",
                            "updatedAt": "2022-12-21T16:22:52.270Z",
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
                    "createdAt": "2022-12-16T05:28:05.205Z",
                    "updatedBy": "bhiaRBrWjFWZPpRapph1m8",
                    "createdBy": "bhiaRBrWjFWZPpRapph1m8",
                    "_recordId": "inMM5wtxU1w1ye2CfHnNCt",
                    "ATX_APPLICATION": "ONT",
                    "updatedAt": "2022-12-21T16:22:53.317Z",
                    "ATX_FIELD_MAPPING_PRIORITY": [
                        {
                            "createdAt": "2022-12-16T05:28:05.254Z",
                            "updatedBy": "bhiaRBrWjFWZPpRapph1m8",
                            "createdBy": "bhiaRBrWjFWZPpRapph1m8",
                            "ATX_PRIORITY": "10",
                            "_recordId": "krHw6YLmV8tJm5LPJcFd8R",
                            "updatedAt": "2022-12-21T16:22:53.654Z",
                            "ATX_FUSION_FIELD": "CustomerAccountNumber"
                        }
                    ]
                },
                {
                    "ATX_FIELD": "ITEMCODE",
                    "createdAt": "2022-12-16T05:28:06.335Z",
                    "updatedBy": "bhiaRBrWjFWZPpRapph1m8",
                    "createdBy": "bhiaRBrWjFWZPpRapph1m8",
                    "_recordId": "g4BzLvN3uZcyiSxnKPyHLw",
                    "ATX_APPLICATION": "ONT",
                    "updatedAt": "2022-12-21T16:22:54.769Z",
                    "ATX_FIELD_MAPPING_PRIORITY": [
                        {
                            "createdAt": "2022-12-16T05:28:06.525Z",
                            "updatedBy": "bhiaRBrWjFWZPpRapph1m8",
                            "createdBy": "bhiaRBrWjFWZPpRapph1m8",
                            "ATX_PRIORITY": "10",
                            "_recordId": "oDCEUDJHvFKGzSjhDWJ8EP",
                            "updatedAt": "2022-12-21T16:22:55.290Z",
                            "ATX_FUSION_FIELD": "ProductFiscClassification",
                            "ATX_FUSION_FIELD_TYPE": "FFLD",
                            "ATX_FUSION_PROP_COLUMN_NAME": "ns:ProductFiscClassification"
                        },
                        {
                            "createdAt": "2022-12-16T05:28:06.507Z",
                            "updatedBy": "bhiaRBrWjFWZPpRapph1m8",
                            "createdBy": "bhiaRBrWjFWZPpRapph1m8",
                            "ATX_PRIORITY": "5",
                            "_recordId": "4P9Gsj8ExrjjXTFFJhpoAE",
                            "updatedAt": "2022-12-21T16:22:55.211Z",
                            "ATX_FUSION_FIELD": "ProductCode",
                            "ATX_FUSION_FIELD_TYPE": "FFLD",
                            "ATX_FUSION_PROP_COLUMN_NAME": "ns:ProductCode"
                        },
                        {
                            "createdAt": "2022-12-16T05:28:06.411Z",
                            "updatedBy": "bhiaRBrWjFWZPpRapph1m8",
                            "createdBy": "bhiaRBrWjFWZPpRapph1m8",
                            "ATX_PRIORITY": "30",
                            "_recordId": "uPyd9i7ekcxmnhYTPDEbrf",
                            "updatedAt": "2022-12-21T16:22:55.055Z",
                            "ATX_FUSION_FIELD": "ProductCategory",
                            "ATX_FUSION_FIELD_TYPE": "FFLD",
                            "ATX_FUSION_PROP_COLUMN_NAME": "ns:ProductCategory"
                        },
                        {
                            "createdAt": "2022-12-16T05:28:06.544Z",
                            "updatedBy": "bhiaRBrWjFWZPpRapph1m8",
                            "createdBy": "bhiaRBrWjFWZPpRapph1m8",
                            "ATX_PRIORITY": "20",
                            "_recordId": "niEGRh1RPAymRcrc76xqPN",
                            "updatedAt": "2022-12-21T16:22:55.370Z",
                            "ATX_FUSION_FIELD": "UserDefinedFiscClass",
                            "ATX_FUSION_FIELD_TYPE": "FFLD",
                            "ATX_FUSION_PROP_COLUMN_NAME": "ns:UserDefinedFiscClass"
                        }
                    ]
                },
                {
                    "ATX_FIELD": "ref1",
                    "createdAt": "2022-12-16T05:28:09.021Z",
                    "updatedBy": "bhiaRBrWjFWZPpRapph1m8",
                    "createdBy": "bhiaRBrWjFWZPpRapph1m8",
                    "_recordId": "6YJhXFbC8yvvam8BPtFcVA",
                    "ATX_APPLICATION": "ONT",
                    "updatedAt": "2022-12-21T16:22:57.764Z",
                    "ATX_FIELD_MAPPING_PRIORITY": [
                        {
                            "createdAt": "2022-12-16T05:28:09.065Z",
                            "updatedBy": "bhiaRBrWjFWZPpRapph1m8",
                            "createdBy": "bhiaRBrWjFWZPpRapph1m8",
                            "ATX_PRIORITY": "10",
                            "_recordId": "aNyC2ZhQcVfY6vNBa44rKM",
                            "updatedAt": "2022-12-21T16:22:58.009Z",
                            "ATX_FUSION_FIELD": "ProductCategory",
                            "ATX_FUSION_FIELD_TYPE": "FFLD",
                            "ATX_FUSION_PROP_COLUMN_NAME": "ns:ProductCategory"
                        }
                    ]
                },
                {
                    "ATX_FIELD": "ITEMCODE",
                    "createdAt": "2022-12-16T05:28:10.181Z",
                    "updatedBy": "bhiaRBrWjFWZPpRapph1m8",
                    "createdBy": "bhiaRBrWjFWZPpRapph1m8",
                    "_recordId": "b4jgbDfSpBTtq12yaST78z",
                    "ATX_APPLICATION": "PO",
                    "updatedAt": "2022-12-21T16:22:59.064Z",
                    "ATX_FIELD_MAPPING_PRIORITY": [
                        {
                            "createdAt": "2022-12-16T05:28:10.352Z",
                            "updatedBy": "bhiaRBrWjFWZPpRapph1m8",
                            "createdBy": "bhiaRBrWjFWZPpRapph1m8",
                            "ATX_PRIORITY": "60",
                            "_recordId": "cJYpZKWU1JWgjRnZcqdp4t",
                            "updatedAt": "2022-12-21T16:22:59.555Z",
                            "ATX_FUSION_FIELD": "ProductFiscClassification",
                            "ATX_FUSION_FIELD_TYPE": "FFLD",
                            "ATX_FUSION_PROP_COLUMN_NAME": "ns:ProductFiscClassification"
                        },
                        {
                            "createdAt": "2022-12-16T05:28:10.392Z",
                            "updatedBy": "bhiaRBrWjFWZPpRapph1m8",
                            "createdBy": "bhiaRBrWjFWZPpRapph1m8",
                            "ATX_PRIORITY": "70",
                            "_recordId": "rxzwu5jMTrprFeRUEKV6Nq",
                            "updatedAt": "2022-12-21T16:22:59.737Z",
                            "ATX_FUSION_FIELD": "UserDefinedFiscClass",
                            "ATX_FUSION_FIELD_TYPE": "FFLD",
                            "ATX_FUSION_PROP_COLUMN_NAME": "ns:UserDefinedFiscClass"
                        },
                        {
                            "createdAt": "2022-12-16T05:28:10.235Z",
                            "updatedBy": "bhiaRBrWjFWZPpRapph1m8",
                            "createdBy": "bhiaRBrWjFWZPpRapph1m8",
                            "ATX_PRIORITY": "30",
                            "_recordId": "fW3oP55B8xMm2c5HdtNpWc",
                            "updatedAt": "2022-12-21T16:22:59.319Z",
                            "ATX_FUSION_FIELD": "ProductCategory",
                            "ATX_FUSION_FIELD_TYPE": "FFLD",
                            "ATX_FUSION_PROP_COLUMN_NAME": "ns:ProductCategory"
                        },
                        {
                            "createdAt": "2022-12-16T05:28:10.330Z",
                            "updatedBy": "bhiaRBrWjFWZPpRapph1m8",
                            "createdBy": "bhiaRBrWjFWZPpRapph1m8",
                            "ATX_PRIORITY": "20",
                            "_recordId": "sTV7918w8d4u76Ny2npG3M",
                            "updatedAt": "2022-12-21T16:22:59.466Z",
                            "ATX_FUSION_FIELD": "ProductCode",
                            "ATX_FUSION_FIELD_TYPE": "FFLD",
                            "ATX_FUSION_PROP_COLUMN_NAME": "ns:ProductCode"
                        },
                        {
                            "createdAt": "2022-12-16T05:28:10.375Z",
                            "updatedBy": "bhiaRBrWjFWZPpRapph1m8",
                            "createdBy": "bhiaRBrWjFWZPpRapph1m8",
                            "ATX_PRIORITY": "50",
                            "_recordId": "kBMBBREn5KVhTxPDfuK7mG",
                            "updatedAt": "2022-12-21T16:22:59.646Z",
                            "ATX_FUSION_FIELD": "PurchasingCategoryID",
                            "ATX_FUSION_FIELD_TYPE": "FFLD",
                            "ATX_FUSION_PROP_COLUMN_NAME": "ns:PurchasingCategoryID"
                        }
                    ]
                },
                {
                    "ATX_FIELD": "MISCCODE",
                    "createdAt": "2022-12-08T09:15:31.941Z",
                    "updatedBy": "bhiaRBrWjFWZPpRapph1m8",
                    "createdBy": "bhiaRBrWjFWZPpRapph1m8",
                    "_recordId": "sum2JLrAqdFbLLmhiqv8eR",
                    "ATX_APPLICATION": "ONT",
                    "updatedAt": "2022-12-21T16:22:56.432Z",
                    "ATX_FIELD_MAPPING_PRIORITY": [
                        {
                            "createdAt": "2022-12-08T09:15:31.983Z",
                            "updatedBy": "bhiaRBrWjFWZPpRapph1m8",
                            "createdBy": "bhiaRBrWjFWZPpRapph1m8",
                            "ATX_PRIORITY": "1",
                            "_recordId": "n9k1JtPdTL3wamLnmUH12H",
                            "updatedAt": "2022-12-21T16:22:56.693Z",
                            "ATX_FUSION_FIELD": "Miscellaneous 2"
                        }
                    ]
                },
                {
                    "ATX_FIELD": "AFCServiceTypeAVField",
                    "createdAt": "2022-12-21T16:22:37.233Z",
                    "_recordId": "4YK7q5qJLJ6Yn3LRKsPYUx",
                    "ATX_APPLICATION": "AR",
                    "createdBy": "bhiaRBrWjFWZPpRapph1m8",
                    "ATX_FIELD_MAPPING_PRIORITY": [
                        {
                            "createdAt": "2022-12-21T16:22:37.307Z",
                            "_recordId": "2Jd5FtBfT3pMwTUQ4uZ3sg",
                            "createdBy": "bhiaRBrWjFWZPpRapph1m8",
                            "ATX_PRIORITY": "1",
                            "ATX_FUSION_FIELD": "AFCServiceType",
                            "ATX_FUSION_FIELD_TYPE": "FADD",
                            "ATX_FUSION_PROP_COLUMN_NAME": "SERVICE_TYPE",
                            "ATX_FUSION_FIELD_LEVEL": "LINE",
                            "ATX_REPORT_NAME": "AVALARA_AdditionalData_222_AFC"
                        }
                    ]
                },
                {
                    "ATX_FIELD": "AFCTransTypeAVField",
                    "createdAt": "2022-12-21T16:22:38.254Z",
                    "_recordId": "kNbpynS5xr4EeSPyyvAFF2",
                    "ATX_APPLICATION": "AR",
                    "createdBy": "bhiaRBrWjFWZPpRapph1m8",
                    "ATX_FIELD_MAPPING_PRIORITY": [
                        {
                            "createdAt": "2022-12-21T16:22:38.305Z",
                            "_recordId": "s5w7qTE6KyFA3JHZAymRfP",
                            "createdBy": "bhiaRBrWjFWZPpRapph1m8",
                            "ATX_PRIORITY": "1",
                            "ATX_FUSION_FIELD": "AFCTransType",
                            "ATX_FUSION_FIELD_TYPE": "FADD",
                            "ATX_FUSION_PROP_COLUMN_NAME": "TRANS_TYPE",
                            "ATX_FUSION_FIELD_LEVEL": "LINE",
                            "ATX_REPORT_NAME": "AVALARA_AdditionalData_222_AFC"
                        }
                    ]
                }
            ],
            "ATX_DOC_SEQUENCE_USAGE": [
                {
                    "createdAt": "2022-12-12T16:47:56.432Z",
                    "ATX_BATCH_SOURCE_NAME": "FBDI5",
                    "ATX_DOCUMENT_SEQUENCE_USED": true,
                    "updatedBy": "bhiaRBrWjFWZPpRapph1m8",
                    "ATX_BUSINESS_UNIT_ORGANIZATION_ID": "0.00",
                    "createdBy": "bhiaRBrWjFWZPpRapph1m8",
                    "_recordId": "vU9z4D7Bg6fSgx3w6AYgsN",
                    "ATX_LEGAL_ENTITY_ID": "103",
                    "updatedAt": "2022-12-21T16:23:00.894Z"
                },
                {
                    "createdAt": "2022-12-12T16:47:57.628Z",
                    "ATX_BATCH_SOURCE_NAME": "CM FBDI3",
                    "ATX_DOCUMENT_SEQUENCE_USED": true,
                    "updatedBy": "bhiaRBrWjFWZPpRapph1m8",
                    "ATX_BUSINESS_UNIT_ORGANIZATION_ID": "0.00",
                    "createdBy": "bhiaRBrWjFWZPpRapph1m8",
                    "_recordId": "rE8fSMNfp3PHVctrVWi5XG",
                    "ATX_LEGAL_ENTITY_ID": "",
                    "updatedAt": "2022-12-21T16:23:02.216Z"
                },
                {
                    "createdAt": "2022-12-12T16:47:58.626Z",
                    "ATX_BATCH_SOURCE_NAME": "Distributed Order Orchestration",
                    "ATX_DOCUMENT_SEQUENCE_USED": false,
                    "updatedBy": "bhiaRBrWjFWZPpRapph1m8",
                    "ATX_BUSINESS_UNIT_ORGANIZATION_ID": "0.00",
                    "createdBy": "bhiaRBrWjFWZPpRapph1m8",
                    "_recordId": "n75Eeuu9TZkc5mNxnQppF8",
                    "ATX_LEGAL_ENTITY_ID": "",
                    "updatedAt": "2022-12-21T16:23:03.538Z"
                },
                {
                    "createdAt": "2022-12-12T16:47:59.645Z",
                    "ATX_BATCH_SOURCE_NAME": "FBDI3",
                    "ATX_DOCUMENT_SEQUENCE_USED": true,
                    "updatedBy": "bhiaRBrWjFWZPpRapph1m8",
                    "ATX_BUSINESS_UNIT_ORGANIZATION_ID": "0.00",
                    "createdBy": "bhiaRBrWjFWZPpRapph1m8",
                    "_recordId": "f9Qhqx2Emk5TV2kgFhs4Cq",
                    "ATX_LEGAL_ENTITY_ID": "",
                    "updatedAt": "2022-12-21T16:23:04.839Z"
                },
                {
                    "createdAt": "2022-12-12T16:48:00.648Z",
                    "ATX_BATCH_SOURCE_NAME": "FBDI3 NEW",
                    "ATX_DOCUMENT_SEQUENCE_USED": true,
                    "updatedBy": "bhiaRBrWjFWZPpRapph1m8",
                    "ATX_BUSINESS_UNIT_ORGANIZATION_ID": "0.00",
                    "createdBy": "bhiaRBrWjFWZPpRapph1m8",
                    "_recordId": "2a1org8HXDeTHrws1bCxie",
                    "ATX_LEGAL_ENTITY_ID": "",
                    "updatedAt": "2022-12-21T16:23:06.293Z"
                },
                {
                    "createdAt": "2022-12-12T16:48:01.578Z",
                    "ATX_DOCUMENT_SEQUENCE_USED": true,
                    "ATX_BATCH_SOURCE_NAME": "Manual w Doc Seq.",
                    "updatedBy": "bhiaRBrWjFWZPpRapph1m8",
                    "ATX_BUSINESS_UNIT_ORGANIZATION_ID": "0.00",
                    "createdBy": "bhiaRBrWjFWZPpRapph1m8",
                    "_recordId": "8gqe4KBWHiiecbiwxWA734",
                    "ATX_LEGAL_ENTITY_ID": "",
                    "updatedAt": "2022-12-21T16:23:07.853Z"
                },
                {
                    "createdAt": "2022-12-12T16:48:02.463Z",
                    "ATX_DOCUMENT_SEQUENCE_USED": true,
                    "ATX_BATCH_SOURCE_NAME": "Manual w Doc Sequencing",
                    "updatedBy": "bhiaRBrWjFWZPpRapph1m8",
                    "ATX_BUSINESS_UNIT_ORGANIZATION_ID": "0.00",
                    "createdBy": "bhiaRBrWjFWZPpRapph1m8",
                    "_recordId": "ipazh8krN44Beh8JXAnDBu",
                    "ATX_LEGAL_ENTITY_ID": "",
                    "updatedAt": "2022-12-21T16:23:09.355Z"
                },
                {
                    "createdAt": "2022-12-12T16:48:03.499Z",
                    "ATX_DOCUMENT_SEQUENCE_USED": true,
                    "ATX_BATCH_SOURCE_NAME": "SERP Manual Doc Seq.",
                    "updatedBy": "bhiaRBrWjFWZPpRapph1m8",
                    "ATX_BUSINESS_UNIT_ORGANIZATION_ID": "0.00",
                    "createdBy": "bhiaRBrWjFWZPpRapph1m8",
                    "_recordId": "gQetbMgzoHBARwnwy2A5pf",
                    "ATX_LEGAL_ENTITY_ID": "",
                    "updatedAt": "2022-12-21T16:23:10.917Z"
                },
                {
                    "createdAt": "2022-12-12T16:48:04.470Z",
                    "ATX_BATCH_SOURCE_NAME": "test",
                    "ATX_DOCUMENT_SEQUENCE_USED": false,
                    "updatedBy": "bhiaRBrWjFWZPpRapph1m8",
                    "ATX_BUSINESS_UNIT_ORGANIZATION_ID": "0.00",
                    "createdBy": "bhiaRBrWjFWZPpRapph1m8",
                    "_recordId": "i5SC7F1w1FVGMPdBFQnzjV",
                    "ATX_LEGAL_ENTITY_ID": "",
                    "updatedAt": "2022-12-21T16:23:12.464Z"
                }
            ],
            "ATX_TXN_TYPE_TAX_CALCULATION": [
                {
                    "ATX_BATCH_SOURCE_NAME": "",
                    "ATX_BUSINESS_UNIT_ORGANIZATION_ID": "0.00",
                    "updatedBy": "bhiaRBrWjFWZPpRapph1m8",
                    "_recordId": "1ip9QkBwbayPgBAYz175hK",
                    "ATX_LEGAL_ENTITY_ID": "",
                    "ATX_Bill_TO_SAME_ AS_ SHIP_TO": true,
                    "createdAt": "2022-12-13T09:18:57.706Z",
                    "ATX_TRANSACTION_TYPE_SEQUENCE_ID": "0",
                    "ATX_TAX_CALCULATED": true,
                    "createdBy": "bhiaRBrWjFWZPpRapph1m8",
                    "ATX_TAX_CODE": "",
                    "ATX_DOCUMENT_TYPE": "SalesQuote",
                    "updatedAt": "2022-12-21T16:23:13.809Z"
                },
                {
                    "ATX_BATCH_SOURCE_NAME": "",
                    "ATX_BUSINESS_UNIT_ORGANIZATION_ID": "0.00",
                    "updatedBy": "bhiaRBrWjFWZPpRapph1m8",
                    "_recordId": "vMW7FZhaDUFEbVJ75jHTJw",
                    "ATX_LEGAL_ENTITY_ID": "",
                    "ATX_Bill_TO_SAME_ AS_ SHIP_TO": true,
                    "createdAt": "2022-12-13T09:18:59.268Z",
                    "ATX_TRANSACTION_TYPE_SEQUENCE_ID": "35",
                    "ATX_TAX_CALCULATED": true,
                    "createdBy": "bhiaRBrWjFWZPpRapph1m8",
                    "ATX_TAX_CODE": "",
                    "ATX_DOCUMENT_TYPE": "",
                    "updatedAt": "2022-12-21T16:23:15.098Z"
                },
                {
                    "ATX_BATCH_SOURCE_NAME": "",
                    "updatedBy": "bhiaRBrWjFWZPpRapph1m8",
                    "ATX_BUSINESS_UNIT_ORGANIZATION_ID": "0.00",
                    "_recordId": "ie97Zson22ubonimXU2t62",
                    "ATX_LEGAL_ENTITY_ID": "",
                    "ATX_Bill_TO_SAME_ AS_ SHIP_TO": false,
                    "createdAt": "2022-12-13T09:19:00.685Z",
                    "ATX_TRANSACTION_TYPE_SEQUENCE_ID": "300000033230325",
                    "ATX_TAX_CALCULATED": false,
                    "createdBy": "bhiaRBrWjFWZPpRapph1m8",
                    "ATX_TAX_CODE": "",
                    "updatedAt": "2022-12-21T16:23:16.495Z",
                    "ATX_DOCUMENT_TYPE": ""
                },
                {
                    "ATX_BATCH_SOURCE_NAME": "",
                    "ATX_BUSINESS_UNIT_ORGANIZATION_ID": "0.00",
                    "updatedBy": "bhiaRBrWjFWZPpRapph1m8",
                    "_recordId": "6EkfLyqAtVGBSUfcG3ab1A",
                    "ATX_LEGAL_ENTITY_ID": "",
                    "ATX_Bill_TO_SAME_ AS_ SHIP_TO": true,
                    "createdAt": "2022-12-13T09:19:02.003Z",
                    "ATX_TRANSACTION_TYPE_SEQUENCE_ID": "300000034416277",
                    "ATX_TAX_CALCULATED": true,
                    "createdBy": "bhiaRBrWjFWZPpRapph1m8",
                    "ATX_TAX_CODE": "D0000000",
                    "ATX_DOCUMENT_TYPE": "",
                    "updatedAt": "2022-12-21T16:23:17.739Z"
                },
                {
                    "ATX_BATCH_SOURCE_NAME": "",
                    "updatedBy": "bhiaRBrWjFWZPpRapph1m8",
                    "ATX_BUSINESS_UNIT_ORGANIZATION_ID": "0.00",
                    "_recordId": "hPNBNrUCLuSFZLYrAEqNDt",
                    "ATX_LEGAL_ENTITY_ID": "",
                    "ATX_Bill_TO_SAME_ AS_ SHIP_TO": false,
                    "createdAt": "2022-12-13T09:19:03.168Z",
                    "ATX_TRANSACTION_TYPE_SEQUENCE_ID": "300000036616275",
                    "ATX_TAX_CALCULATED": false,
                    "createdBy": "bhiaRBrWjFWZPpRapph1m8",
                    "ATX_TAX_CODE": "",
                    "updatedAt": "2022-12-21T16:23:18.999Z",
                    "ATX_DOCUMENT_TYPE": ""
                },
                {
                    "ATX_BATCH_SOURCE_NAME": "",
                    "updatedBy": "bhiaRBrWjFWZPpRapph1m8",
                    "ATX_BUSINESS_UNIT_ORGANIZATION_ID": "0.00",
                    "_recordId": "ptFgqHCt2FS1v62kQCrnoK",
                    "ATX_LEGAL_ENTITY_ID": "",
                    "ATX_Bill_TO_SAME_ AS_ SHIP_TO": false,
                    "createdAt": "2022-12-13T09:19:04.497Z",
                    "ATX_TRANSACTION_TYPE_SEQUENCE_ID": "300000036616277",
                    "ATX_TAX_CALCULATED": false,
                    "createdBy": "bhiaRBrWjFWZPpRapph1m8",
                    "ATX_TAX_CODE": "",
                    "updatedAt": "2022-12-21T16:23:20.312Z",
                    "ATX_DOCUMENT_TYPE": ""
                },
                {
                    "ATX_BATCH_SOURCE_NAME": "",
                    "updatedBy": "bhiaRBrWjFWZPpRapph1m8",
                    "ATX_BUSINESS_UNIT_ORGANIZATION_ID": "0.00",
                    "_recordId": "oVttY9Sqd4xVpfEW8mfG52",
                    "ATX_LEGAL_ENTITY_ID": "",
                    "ATX_Bill_TO_SAME_ AS_ SHIP_TO": true,
                    "createdAt": "2022-12-13T09:19:05.908Z",
                    "ATX_TRANSACTION_TYPE_SEQUENCE_ID": "300000145600222",
                    "ATX_TAX_CALCULATED": true,
                    "createdBy": "bhiaRBrWjFWZPpRapph1m8",
                    "ATX_TAX_CODE": "",
                    "updatedAt": "2022-12-21T16:23:21.667Z",
                    "ATX_DOCUMENT_TYPE": ""
                },
                {
                    "ATX_BATCH_SOURCE_NAME": "ENC_Subscription",
                    "ATX_BUSINESS_UNIT_ORGANIZATION_ID": "0.00",
                    "updatedBy": "bhiaRBrWjFWZPpRapph1m8",
                    "_recordId": "oFd1CeFNHcyEhvjrixkLWH",
                    "ATX_LEGAL_ENTITY_ID": "",
                    "ATX_Bill_TO_SAME_ AS_ SHIP_TO": true,
                    "createdAt": "2022-12-13T09:19:07.328Z",
                    "ATX_TRANSACTION_TYPE_SEQUENCE_ID": "300000145968924",
                    "ATX_TAX_CALCULATED": true,
                    "createdBy": "bhiaRBrWjFWZPpRapph1m8",
                    "ATX_TAX_CODE": "",
                    "ATX_DOCUMENT_TYPE": "",
                    "updatedAt": "2022-12-21T16:23:23.060Z"
                },
                {
                    "ATX_BATCH_SOURCE_NAME": "SERP Manual Doc Seq.",
                    "ATX_BUSINESS_UNIT_ORGANIZATION_ID": "0.00",
                    "updatedBy": "bhiaRBrWjFWZPpRapph1m8",
                    "_recordId": "fjJT1KmuaSNLZWLY5QPAes",
                    "ATX_LEGAL_ENTITY_ID": "",
                    "ATX_Bill_TO_SAME_ AS_ SHIP_TO": false,
                    "createdAt": "2022-12-13T09:19:08.728Z",
                    "ATX_TRANSACTION_TYPE_SEQUENCE_ID": "0",
                    "ATX_TAX_CALCULATED": false,
                    "createdBy": "bhiaRBrWjFWZPpRapph1m8",
                    "ATX_TAX_CODE": "",
                    "ATX_DOCUMENT_TYPE": "",
                    "updatedAt": "2022-12-21T16:23:24.525Z"
                }
            ],
            "ATX_TXN_SOURCE_TAX_CALCULATION": [
                {
                    "createdAt": "2022-12-13T09:19:09.985Z",
                    "ATX_BUSINESS_UNIT_ORGANIZATION_ID": "0.00",
                    "updatedBy": "bhiaRBrWjFWZPpRapph1m8",
                    "ATX_TAX_CALCULATED": false,
                    "createdBy": "bhiaRBrWjFWZPpRapph1m8",
                    "ATX_INVOICE_SOURCE": "FOS",
                    "_recordId": "6jzEG9sYSFmUmtsCFSZdMP",
                    "ATX_LEGAL_ENTITY_ID": "",
                    "updatedAt": "2022-12-21T16:23:25.544Z"
                },
                {
                    "createdAt": "2022-12-13T09:19:11.218Z",
                    "ATX_BUSINESS_UNIT_ORGANIZATION_ID": "0.00",
                    "updatedBy": "bhiaRBrWjFWZPpRapph1m8",
                    "ATX_TAX_CALCULATED": true,
                    "createdBy": "bhiaRBrWjFWZPpRapph1m8",
                    "ATX_INVOICE_SOURCE": "Manual Invoice Entry",
                    "_recordId": "ph1TjmqCvmSsA2Qd76CRah",
                    "ATX_LEGAL_ENTITY_ID": "",
                    "updatedAt": "2022-12-21T16:23:26.480Z"
                },
                {
                    "createdAt": "2022-12-13T09:19:12.309Z",
                    "ATX_BUSINESS_UNIT_ORGANIZATION_ID": "0.00",
                    "updatedBy": "bhiaRBrWjFWZPpRapph1m8",
                    "ATX_TAX_CALCULATED": true,
                    "createdBy": "bhiaRBrWjFWZPpRapph1m8",
                    "ATX_INVOICE_SOURCE": "External",
                    "_recordId": "1i7V3uDUoaLbn3wGym3D3P",
                    "ATX_LEGAL_ENTITY_ID": "",
                    "updatedAt": "2022-12-21T16:23:27.568Z"
                }
            ],
            "ATX_PARAMETER_MAPPING": [
                {
                    "ATX_FIELD": "",
                    "createdAt": "2022-12-08T09:15:34.211Z",
                    "ATX_DEFAULT_VALUE": "",
                    "updatedBy": "bhiaRBrWjFWZPpRapph1m8",
                    "createdBy": "bhiaRBrWjFWZPpRapph1m8",
                    "_recordId": "8HgeLySupkTobHbP1isfH7",
                    "ATX_APPLICATION": "",
                    "updatedAt": "2022-12-20T07:24:36.963Z",
                    "ATX_FUSION_FIELD": ""
                },
                {
                    "ATX_FIELD": "DeliveryTerms",
                    "createdAt": "2022-12-20T08:06:57.082Z",
                    "ATX_DEFAULT_VALUE": "",
                    "updatedBy": "bhiaRBrWjFWZPpRapph1m8",
                    "createdBy": "bhiaRBrWjFWZPpRapph1m8",
                    "_recordId": "fYfgE7dhTx2vo2VtvMWp1r",
                    "ATX_APPLICATION": "AR",
                    "updatedAt": "2022-12-21T16:23:28.739Z",
                    "ATX_FUSION_FIELD": "FobPoint",
                    "ATX_FUSION_FIELD_LEVEL": "LINE",
                    "ATX_REPORT_NAME": ""
                }
            ],
            "ATX_UDF_MAPPING": [
                {
                    "ATX_FIELD": "UDF7",
                    "createdAt": "2022-12-20T14:53:41.364Z",
                    "ATX_DEFAULT_VALUE": "",
                    "updatedBy": "bhiaRBrWjFWZPpRapph1m8",
                    "createdBy": "bhiaRBrWjFWZPpRapph1m8",
                    "_recordId": "wbcSZMW5sZiqw5oKx8gCx9",
                    "ATX_APPLICATION": "AR",
                    "updatedAt": "2022-12-21T16:23:29.961Z",
                    "ATX_FUSION_FIELD": "PaymentTerm",
                    "ATX_FUSION_FIELD_TYPE": "FADD",
                    "ATX_FUSION_FIELD_LEVEL": "LINE",
                    "ATX_FUSION_PROP_COLUMN_NAME": "CHAR1_HDR_PAYMENT_TERM",
                    "ATX_REPORT_NAME": "AVALARA_AdditionalData_222"
                },
                {
                    "ATX_FIELD": "UDF1",
                    "createdAt": "2022-12-20T14:53:42.347Z",
                    "ATX_DEFAULT_VALUE": "ORACLE",
                    "updatedBy": "bhiaRBrWjFWZPpRapph1m8",
                    "createdBy": "bhiaRBrWjFWZPpRapph1m8",
                    "_recordId": "1znyzY9Gh9EB5xJHYjXDcK",
                    "ATX_APPLICATION": "AR",
                    "updatedAt": "2022-12-21T16:23:36.073Z",
                    "ATX_FUSION_FIELD": "OracleSourced",
                    "ATX_FUSION_FIELD_TYPE": "FFLD",
                    "ATX_FUSION_FIELD_LEVEL": "LINE",
                    "ATX_FUSION_PROP_COLUMN_NAME": "ns:OracleSourced",
                    "ATX_REPORT_NAME": ""
                },
                {
                    "ATX_FIELD": "UDF2",
                    "createdAt": "2022-12-20T14:53:43.139Z",
                    "ATX_DEFAULT_VALUE": "",
                    "updatedBy": "bhiaRBrWjFWZPpRapph1m8",
                    "createdBy": "bhiaRBrWjFWZPpRapph1m8",
                    "_recordId": "gc4Sx4GoyPJsc42tkTjGWP",
                    "ATX_APPLICATION": "AR",
                    "updatedAt": "2022-12-21T16:23:37.367Z",
                    "ATX_FUSION_FIELD": "BusinessSource_Custom",
                    "ATX_FUSION_FIELD_TYPE": "FADD",
                    "ATX_FUSION_FIELD_LEVEL": "HDR",
                    "ATX_FUSION_PROP_COLUMN_NAME": "BUSINESS_SOURCE",
                    "ATX_REPORT_NAME": "AVALARA_AdditionalData_222"
                },
                {
                    "ATX_FIELD": "UDF8",
                    "createdAt": "2022-12-20T14:53:43.953Z",
                    "ATX_DEFAULT_VALUE": "",
                    "updatedBy": "bhiaRBrWjFWZPpRapph1m8",
                    "createdBy": "bhiaRBrWjFWZPpRapph1m8",
                    "_recordId": "tZjWVy5cDYCP5KSfN5JeMq",
                    "ATX_APPLICATION": "AP",
                    "updatedAt": "2022-12-21T16:23:38.615Z",
                    "ATX_FUSION_FIELD": "ShipFromPartyName",
                    "ATX_FUSION_FIELD_TYPE": "AUDF",
                    "ATX_FUSION_FIELD_LEVEL": "LINE",
                    "ATX_FUSION_PROP_COLUMN_NAME": "",
                    "ATX_REPORT_NAME": ""
                },
                {
                    "ATX_FIELD": "UDF9",
                    "createdAt": "2022-12-20T14:53:44.765Z",
                    "ATX_DEFAULT_VALUE": "",
                    "updatedBy": "bhiaRBrWjFWZPpRapph1m8",
                    "createdBy": "bhiaRBrWjFWZPpRapph1m8",
                    "_recordId": "sRfnwtwnyuc5EtBca5tnRh",
                    "ATX_APPLICATION": "AR",
                    "updatedAt": "2022-12-21T16:23:39.847Z",
                    "ATX_FUSION_FIELD": "ShipToPartyName",
                    "ATX_FUSION_FIELD_TYPE": "AUDF",
                    "ATX_FUSION_FIELD_LEVEL": "LINE",
                    "ATX_FUSION_PROP_COLUMN_NAME": "",
                    "ATX_REPORT_NAME": ""
                },
                {
                    "ATX_FIELD": "UDF7",
                    "createdAt": "2022-12-20T14:53:45.600Z",
                    "ATX_DEFAULT_VALUE": "",
                    "updatedBy": "bhiaRBrWjFWZPpRapph1m8",
                    "createdBy": "bhiaRBrWjFWZPpRapph1m8",
                    "_recordId": "cDStbXPh78eyt4AksqKfJF",
                    "ATX_APPLICATION": "AP",
                    "updatedAt": "2022-12-21T16:23:41.079Z",
                    "ATX_FUSION_FIELD": "VendorTypeLookupCode",
                    "ATX_FUSION_FIELD_TYPE": "FFLD",
                    "ATX_FUSION_FIELD_LEVEL": "LINE",
                    "ATX_FUSION_PROP_COLUMN_NAME": "ns:VendorTypeLookupCode",
                    "ATX_REPORT_NAME": ""
                },
                {
                    "ATX_FIELD": "UDF12",
                    "createdAt": "2022-12-20T14:53:46.426Z",
                    "ATX_DEFAULT_VALUE": "",
                    "updatedBy": "bhiaRBrWjFWZPpRapph1m8",
                    "createdBy": "bhiaRBrWjFWZPpRapph1m8",
                    "_recordId": "pca7pHeNMZubjwovCfQxeK",
                    "ATX_APPLICATION": "AP",
                    "updatedAt": "2022-12-21T16:23:42.264Z",
                    "ATX_FUSION_FIELD": "UserDefinedFiscClass",
                    "ATX_FUSION_FIELD_TYPE": "FFLD",
                    "ATX_FUSION_PROP_COLUMN_NAME": "ns:UserDefinedFiscClass"
                },
                {
                    "ATX_FIELD": "UDF10",
                    "createdAt": "2022-12-20T14:53:47.243Z",
                    "ATX_DEFAULT_VALUE": "",
                    "updatedBy": "bhiaRBrWjFWZPpRapph1m8",
                    "createdBy": "bhiaRBrWjFWZPpRapph1m8",
                    "_recordId": "uF8eZfydioDUEDKVgboKm2",
                    "ATX_APPLICATION": "PO",
                    "updatedAt": "2022-12-21T16:23:43.598Z",
                    "ATX_FUSION_FIELD": "PurchasingCategoryID",
                    "ATX_FUSION_FIELD_TYPE": "FFLD",
                    "ATX_FUSION_PROP_COLUMN_NAME": "ns:PurchasingCategoryID"
                },
                {
                    "ATX_FIELD": "UDF10",
                    "createdAt": "2022-12-20T14:53:48.069Z",
                    "ATX_DEFAULT_VALUE": "",
                    "updatedBy": "bhiaRBrWjFWZPpRapph1m8",
                    "createdBy": "bhiaRBrWjFWZPpRapph1m8",
                    "_recordId": "h2NxyWzKgNsuRABTtiTLSA",
                    "ATX_APPLICATION": "AP",
                    "updatedAt": "2022-12-21T16:23:44.828Z",
                    "ATX_FUSION_FIELD": "PurchasingCategoryID",
                    "ATX_FUSION_FIELD_TYPE": "FFLD",
                    "ATX_FUSION_PROP_COLUMN_NAME": "ns:PurchasingCategoryID"
                },
                {
                    "ATX_FIELD": "UDF12",
                    "createdAt": "2022-12-20T14:53:48.970Z",
                    "ATX_DEFAULT_VALUE": "",
                    "updatedBy": "bhiaRBrWjFWZPpRapph1m8",
                    "createdBy": "bhiaRBrWjFWZPpRapph1m8",
                    "_recordId": "n9DKJif5rCj7mAReaP39yL",
                    "ATX_APPLICATION": "AR",
                    "updatedAt": "2022-12-21T16:23:46.013Z",
                    "ATX_FUSION_FIELD": "UserDefinedFiscClass",
                    "ATX_FUSION_FIELD_TYPE": "FFLD",
                    "ATX_FUSION_PROP_COLUMN_NAME": "ns:UserDefinedFiscClass"
                },
                {
                    "ATX_FIELD": "UDF11",
                    "createdAt": "2022-12-20T14:53:49.920Z",
                    "ATX_DEFAULT_VALUE": "",
                    "updatedBy": "bhiaRBrWjFWZPpRapph1m8",
                    "createdBy": "bhiaRBrWjFWZPpRapph1m8",
                    "_recordId": "cYSaeRY3jmnqGatGdX6pV7",
                    "ATX_APPLICATION": "AR",
                    "updatedAt": "2022-12-21T16:23:47.284Z",
                    "ATX_FUSION_FIELD": "BillToGeographyValue10",
                    "ATX_FUSION_FIELD_TYPE": "FFLD",
                    "ATX_FUSION_FIELD_LEVEL": "LINE",
                    "ATX_FUSION_PROP_COLUMN_NAME": "ns:BillToGeographyValue10",
                    "ATX_REPORT_NAME": ""
                },
                {
                    "ATX_FIELD": "UDF5",
                    "createdAt": "2022-12-20T14:53:50.925Z",
                    "ATX_DEFAULT_VALUE": "",
                    "updatedBy": "bhiaRBrWjFWZPpRapph1m8",
                    "createdBy": "bhiaRBrWjFWZPpRapph1m8",
                    "_recordId": "mfFBXpDEFkdJioT8UxcrsU",
                    "ATX_APPLICATION": "AP",
                    "updatedAt": "2022-12-21T16:23:48.461Z",
                    "ATX_FUSION_FIELD": "BillToGeographyValue5",
                    "ATX_FUSION_FIELD_TYPE": "FFLD",
                    "ATX_FUSION_FIELD_LEVEL": "LINE",
                    "ATX_FUSION_PROP_COLUMN_NAME": "ns:BillToGeographyValue5"
                },
                {
                    "ATX_FIELD": "UDF6",
                    "createdAt": "2022-12-20T14:53:51.912Z",
                    "ATX_DEFAULT_VALUE": "",
                    "updatedBy": "bhiaRBrWjFWZPpRapph1m8",
                    "createdBy": "bhiaRBrWjFWZPpRapph1m8",
                    "_recordId": "p9tYgFL6P3DRQiVPZjc8yZ",
                    "ATX_APPLICATION": "AR",
                    "updatedAt": "2022-12-21T16:23:49.591Z",
                    "ATX_FUSION_FIELD": "FobPoint",
                    "ATX_FUSION_FIELD_TYPE": "FFLD",
                    "ATX_FUSION_FIELD_LEVEL": "LINE",
                    "ATX_FUSION_PROP_COLUMN_NAME": "ns:FobPoint",
                    "ATX_REPORT_NAME": ""
                },
                {
                    "ATX_FIELD": "UDF1",
                    "createdAt": "2022-12-20T14:53:52.793Z",
                    "ATX_DEFAULT_VALUE": "ORACLE",
                    "updatedBy": "bhiaRBrWjFWZPpRapph1m8",
                    "createdBy": "bhiaRBrWjFWZPpRapph1m8",
                    "_recordId": "fTpsfFhGoUE4RMJ9JhkoE5",
                    "ATX_APPLICATION": "AP",
                    "updatedAt": "2022-12-21T16:23:50.729Z",
                    "ATX_FUSION_FIELD": "OracleSourced",
                    "ATX_FUSION_FIELD_TYPE": "FFLD",
                    "ATX_FUSION_FIELD_LEVEL": "LINE",
                    "ATX_FUSION_PROP_COLUMN_NAME": "ns:OracleSourced",
                    "ATX_REPORT_NAME": ""
                },
                {
                    "ATX_FIELD": "UDF3",
                    "createdAt": "2022-12-20T15:08:19.361Z",
                    "ATX_DEFAULT_VALUE": "",
                    "updatedBy": "bhiaRBrWjFWZPpRapph1m8",
                    "createdBy": "bhiaRBrWjFWZPpRapph1m8",
                    "_recordId": "uMF54yKoiSqb3NxZRARM9E",
                    "ATX_APPLICATION": "AR",
                    "updatedAt": "2022-12-21T16:23:31.260Z",
                    "ATX_FUSION_FIELD": "LineIntendedUse",
                    "ATX_FUSION_FIELD_TYPE": "FFLD",
                    "ATX_FUSION_FIELD_LEVEL": "LINE",
                    "ATX_FUSION_PROP_COLUMN_NAME": "ns:LineIntendedUse",
                    "ATX_REPORT_NAME": ""
                },
                {
                    "ATX_FIELD": "UDF4",
                    "createdAt": "2022-12-20T15:08:20.312Z",
                    "ATX_DEFAULT_VALUE": "",
                    "updatedBy": "bhiaRBrWjFWZPpRapph1m8",
                    "createdBy": "bhiaRBrWjFWZPpRapph1m8",
                    "_recordId": "piG6eHvLdxSMxhDyJrdiVz",
                    "ATX_APPLICATION": "AR",
                    "updatedAt": "2022-12-21T16:23:33.695Z",
                    "ATX_FUSION_FIELD": "TrxLineDescription",
                    "ATX_FUSION_FIELD_TYPE": "FFLD",
                    "ATX_FUSION_FIELD_LEVEL": "LINE",
                    "ATX_FUSION_PROP_COLUMN_NAME": "ns:TrxLineDescription",
                    "ATX_REPORT_NAME": ""
                },
                {
                    "ATX_FIELD": "UDF5",
                    "createdAt": "2022-12-20T15:08:21.255Z",
                    "ATX_DEFAULT_VALUE": "",
                    "updatedBy": "bhiaRBrWjFWZPpRapph1m8",
                    "createdBy": "bhiaRBrWjFWZPpRapph1m8",
                    "_recordId": "vwAsBxTAE7KSxucsUceBKn",
                    "ATX_APPLICATION": "AR",
                    "updatedAt": "2022-12-21T16:23:34.907Z",
                    "ATX_FUSION_FIELD": "TrxLineType",
                    "ATX_FUSION_FIELD_TYPE": "FFLD",
                    "ATX_FUSION_FIELD_LEVEL": "LINE",
                    "ATX_FUSION_PROP_COLUMN_NAME": "ns:TrxLineType",
                    "ATX_REPORT_NAME": ""
                },
                {
                    "ATX_FIELD": "UDF8",
                    "createdAt": "2022-12-20T16:29:37.292Z",
                    "ATX_DEFAULT_VALUE": "",
                    "updatedBy": "bhiaRBrWjFWZPpRapph1m8",
                    "createdBy": "bhiaRBrWjFWZPpRapph1m8",
                    "_recordId": "jnRUeTXmvUBrsDoZ1mrhXY",
                    "ATX_APPLICATION": "AR",
                    "updatedAt": "2022-12-21T16:23:32.436Z",
                    "ATX_FUSION_FIELD": "BillToGeographyValue1",
                    "ATX_FUSION_FIELD_TYPE": "FFLD",
                    "ATX_FUSION_FIELD_LEVEL": "LINE",
                    "ATX_FUSION_PROP_COLUMN_NAME": "ns:BillToGeographyValue1",
                    "ATX_REPORT_NAME": ""
                }
            ],
            "ATX_CONFIG_CODES": [
                {
                    "ATX_CONFIG_CODE_NUMBER_VALUE": "0",
                    "ATX_CONFIG_CODE_STRING_VALUE": "Y",
                    "createdAt": "2022-12-08T09:15:49.410Z",
                    "ATX_CONFIG_CODE_DATE_VALUE": "",
                    "updatedBy": "bhiaRBrWjFWZPpRapph1m8",
                    "createdBy": "bhiaRBrWjFWZPpRapph1m8",
                    "_recordId": "2QwEM5Pn8d5PtrnABcmy6u",
                    "ATX_CONFIG_CODE": "AP_SELF_ASSESS_TAX",
                    "updatedAt": "2022-12-21T16:23:51.493Z"
                },
                {
                    "ATX_CONFIG_CODE_NUMBER_VALUE": "1",
                    "ATX_CONFIG_CODE_STRING_VALUE": "",
                    "createdAt": "2022-12-08T09:15:49.916Z",
                    "ATX_CONFIG_CODE_DATE_VALUE": "",
                    "updatedBy": "bhiaRBrWjFWZPpRapph1m8",
                    "createdBy": "bhiaRBrWjFWZPpRapph1m8",
                    "_recordId": "6JB6NG49TuHUrFhYMjP1Xw",
                    "ATX_CONFIG_CODE": "BATCH_FILE_LOOKUP_DAYS",
                    "updatedAt": "2022-12-21T16:23:53.098Z"
                },
                {
                    "ATX_CONFIG_CODE_STRING_VALUE": "AVALARA",
                    "ATX_CONFIG_CODE_NUMBER_VALUE": "0",
                    "createdAt": "2022-12-08T09:15:50.365Z",
                    "ATX_CONFIG_CODE_DATE_VALUE": "",
                    "updatedBy": "bhiaRBrWjFWZPpRapph1m8",
                    "createdBy": "bhiaRBrWjFWZPpRapph1m8",
                    "_recordId": "qJQyM3ehnbqt6q1LqUpP44",
                    "ATX_CONFIG_CODE": "BATCH_FILE_PREFIX",
                    "updatedAt": "2022-12-21T16:23:54.509Z"
                },
                {
                    "ATX_CONFIG_CODE_NUMBER_VALUE": "0",
                    "ATX_CONFIG_CODE_STRING_VALUE": "N",
                    "createdAt": "2022-12-08T09:15:50.714Z",
                    "ATX_CONFIG_CODE_DATE_VALUE": "",
                    "updatedBy": "bhiaRBrWjFWZPpRapph1m8",
                    "createdBy": "bhiaRBrWjFWZPpRapph1m8",
                    "_recordId": "spmnFn6Vvo6uvv43et7TKX",
                    "ATX_CONFIG_CODE": "BLOCK_AP_SELF_ASSESS_RESP",
                    "updatedAt": "2022-12-21T16:23:55.613Z"
                },
                {
                    "ATX_CONFIG_CODE_NUMBER_VALUE": "0",
                    "ATX_CONFIG_CODE_STRING_VALUE": "N",
                    "createdAt": "2022-12-08T09:15:51.052Z",
                    "ATX_CONFIG_CODE_DATE_VALUE": "",
                    "updatedBy": "bhiaRBrWjFWZPpRapph1m8",
                    "createdBy": "bhiaRBrWjFWZPpRapph1m8",
                    "_recordId": "o4Pfcv8nSS9i6fNxV1Ceik",
                    "ATX_CONFIG_CODE": "BLOCK_CUST_TAX_CALC",
                    "updatedAt": "2022-12-21T16:23:56.718Z"
                },
                {
                    "ATX_CONFIG_CODE_NUMBER_VALUE": "0",
                    "ATX_CONFIG_CODE_STRING_VALUE": "N",
                    "createdAt": "2022-12-08T09:15:51.399Z",
                    "ATX_CONFIG_CODE_DATE_VALUE": "",
                    "updatedBy": "bhiaRBrWjFWZPpRapph1m8",
                    "createdBy": "bhiaRBrWjFWZPpRapph1m8",
                    "_recordId": "eAy6N7hYu31cWt7om8cSpz",
                    "ATX_CONFIG_CODE": "BLOCK_OM_TAX_CALC",
                    "updatedAt": "2022-12-21T16:23:57.834Z"
                },
                {
                    "ATX_CONFIG_CODE_NUMBER_VALUE": "0",
                    "ATX_CONFIG_CODE_STRING_VALUE": "N",
                    "createdAt": "2022-12-08T09:15:51.745Z",
                    "ATX_CONFIG_CODE_DATE_VALUE": "",
                    "updatedBy": "bhiaRBrWjFWZPpRapph1m8",
                    "createdBy": "bhiaRBrWjFWZPpRapph1m8",
                    "_recordId": "34u3tHTckC5VMwV9Ppk3bd",
                    "ATX_CONFIG_CODE": "BLOCK_PO_TAX_CALC",
                    "updatedAt": "2022-12-21T16:23:58.947Z"
                },
                {
                    "ATX_CONFIG_CODE_NUMBER_VALUE": "0",
                    "ATX_CONFIG_CODE_STRING_VALUE": "Y",
                    "createdAt": "2022-12-08T09:15:52.065Z",
                    "ATX_CONFIG_CODE_DATE_VALUE": "",
                    "updatedBy": "bhiaRBrWjFWZPpRapph1m8",
                    "createdBy": "bhiaRBrWjFWZPpRapph1m8",
                    "_recordId": "afWiWo8rGtwCG6JXxKkpxu",
                    "ATX_CONFIG_CODE": "BULK_FETCH_ADDITIONAL_DATA",
                    "updatedAt": "2022-12-21T16:24:00.050Z"
                },
                {
                    "ATX_CONFIG_CODE_NUMBER_VALUE": "0",
                    "ATX_CONFIG_CODE_STRING_VALUE": "N",
                    "createdAt": "2022-12-08T09:15:52.412Z",
                    "ATX_CONFIG_CODE_DATE_VALUE": "",
                    "updatedBy": "bhiaRBrWjFWZPpRapph1m8",
                    "createdBy": "bhiaRBrWjFWZPpRapph1m8",
                    "_recordId": "5x7nyuMeg61kZe6VAdoiMu",
                    "ATX_CONFIG_CODE": "CHECK_END_POINT_URL",
                    "updatedAt": "2022-12-21T16:24:01.117Z"
                },
                {
                    "ATX_CONFIG_CODE_NUMBER_VALUE": "0",
                    "ATX_CONFIG_CODE_STRING_VALUE": "N",
                    "createdAt": "2022-12-08T09:15:52.745Z",
                    "ATX_CONFIG_CODE_DATE_VALUE": "",
                    "updatedBy": "bhiaRBrWjFWZPpRapph1m8",
                    "createdBy": "bhiaRBrWjFWZPpRapph1m8",
                    "_recordId": "vBhHyVKBBEo2Weso3H5qGE",
                    "ATX_CONFIG_CODE": "CHECK_FOR_REGIME_SUBSCRIPTION",
                    "updatedAt": "2022-12-21T16:24:02.238Z"
                },
                {
                    "ATX_CONFIG_CODE_NUMBER_VALUE": "0",
                    "ATX_CONFIG_CODE_STRING_VALUE": "Y",
                    "createdAt": "2022-12-08T09:15:53.053Z",
                    "ATX_CONFIG_CODE_DATE_VALUE": "",
                    "updatedBy": "bhiaRBrWjFWZPpRapph1m8",
                    "createdBy": "bhiaRBrWjFWZPpRapph1m8",
                    "_recordId": "pRE9ayj42YP8GFRBeWpH1C",
                    "ATX_CONFIG_CODE": "CORRECT_VBT_FOR_OC",
                    "updatedAt": "2022-12-21T16:24:03.352Z"
                },
                {
                    "ATX_CONFIG_CODE_NUMBER_VALUE": "0",
                    "ATX_CONFIG_CODE_STRING_VALUE": "N",
                    "createdAt": "2022-12-08T09:15:53.396Z",
                    "ATX_CONFIG_CODE_DATE_VALUE": "",
                    "updatedBy": "bhiaRBrWjFWZPpRapph1m8",
                    "createdBy": "bhiaRBrWjFWZPpRapph1m8",
                    "_recordId": "mpjijpqfptywTgZqc2jxzD",
                    "ATX_CONFIG_CODE": "CUSTOM_DUTY_TAX",
                    "updatedAt": "2022-12-21T16:24:04.856Z"
                },
                {
                    "ATX_CONFIG_CODE_NUMBER_VALUE": "0",
                    "ATX_CONFIG_CODE_STRING_VALUE": "Y",
                    "createdAt": "2022-12-08T09:15:53.709Z",
                    "ATX_CONFIG_CODE_DATE_VALUE": "",
                    "updatedBy": "bhiaRBrWjFWZPpRapph1m8",
                    "createdBy": "bhiaRBrWjFWZPpRapph1m8",
                    "_recordId": "bZqj4Sq3DAnCV5xsZveRS3",
                    "ATX_CONFIG_CODE": "EXEMPTION_CONTROL_FLAG",
                    "updatedAt": "2022-12-21T16:24:06.611Z"
                },
                {
                    "ATX_CONFIG_CODE_NUMBER_VALUE": "2",
                    "ATX_CONFIG_CODE_STRING_VALUE": "",
                    "createdAt": "2022-12-08T09:15:54.044Z",
                    "ATX_CONFIG_CODE_DATE_VALUE": "",
                    "updatedBy": "bhiaRBrWjFWZPpRapph1m8",
                    "createdBy": "bhiaRBrWjFWZPpRapph1m8",
                    "_recordId": "mi4ej4gs8n5hWrgMqLa3nE",
                    "ATX_CONFIG_CODE": "GL_ACCSTR_ACC_POSN",
                    "updatedAt": "2022-12-21T16:24:07.721Z"
                },
                {
                    "ATX_CONFIG_CODE_NUMBER_VALUE": "0",
                    "ATX_CONFIG_CODE_STRING_VALUE": "-",
                    "createdAt": "2022-12-08T09:15:54.362Z",
                    "ATX_CONFIG_CODE_DATE_VALUE": "",
                    "updatedBy": "bhiaRBrWjFWZPpRapph1m8",
                    "createdBy": "bhiaRBrWjFWZPpRapph1m8",
                    "_recordId": "5ESfR87AXkLCG7CU4dXkuz",
                    "ATX_CONFIG_CODE": "GL_ACCSTR_SEG_DELIM",
                    "updatedAt": "2022-12-21T16:24:08.821Z"
                },
                {
                    "ATX_CONFIG_CODE_NUMBER_VALUE": "0",
                    "ATX_CONFIG_CODE_STRING_VALUE": "Y",
                    "createdAt": "2022-12-08T09:15:54.688Z",
                    "ATX_CONFIG_CODE_DATE_VALUE": "",
                    "updatedBy": "bhiaRBrWjFWZPpRapph1m8",
                    "createdBy": "bhiaRBrWjFWZPpRapph1m8",
                    "_recordId": "6mt7NoPmpGgtHMAbRNDEr7",
                    "ATX_CONFIG_CODE": "IND_AR_SEND_IGST_FOR_SEZ_HSS",
                    "updatedAt": "2022-12-21T16:24:09.874Z"
                },
                {
                    "ATX_CONFIG_CODE_NUMBER_VALUE": "0",
                    "ATX_CONFIG_CODE_STRING_VALUE": "N",
                    "createdAt": "2022-12-08T09:15:55.013Z",
                    "ATX_CONFIG_CODE_DATE_VALUE": "",
                    "updatedBy": "bhiaRBrWjFWZPpRapph1m8",
                    "createdBy": "bhiaRBrWjFWZPpRapph1m8",
                    "_recordId": "jvLKBZCXr2RYdNHUW8SYE6",
                    "ATX_CONFIG_CODE": "LEGACY_TAX_REGIME_CODE",
                    "updatedAt": "2022-12-21T16:24:10.960Z"
                },
                {
                    "ATX_CONFIG_CODE_NUMBER_VALUE": "0",
                    "ATX_CONFIG_CODE_STRING_VALUE": "Y",
                    "createdAt": "2022-12-08T09:15:55.360Z",
                    "ATX_CONFIG_CODE_DATE_VALUE": "",
                    "updatedBy": "bhiaRBrWjFWZPpRapph1m8",
                    "createdBy": "bhiaRBrWjFWZPpRapph1m8",
                    "_recordId": "8WXPpW6KBhHzdHP4QJdiZv",
                    "ATX_CONFIG_CODE": "LOG_XML_PAYLOAD",
                    "updatedAt": "2022-12-21T16:24:12.085Z"
                },
                {
                    "ATX_CONFIG_CODE_NUMBER_VALUE": "0",
                    "ATX_CONFIG_CODE_STRING_VALUE": "Y",
                    "createdAt": "2022-12-08T09:15:55.683Z",
                    "ATX_CONFIG_CODE_DATE_VALUE": "",
                    "updatedBy": "bhiaRBrWjFWZPpRapph1m8",
                    "createdBy": "bhiaRBrWjFWZPpRapph1m8",
                    "_recordId": "hStEXfQ8vsE5i9GccBNmmv",
                    "ATX_CONFIG_CODE": "PROCESS_US_TO_CA_TAXES",
                    "updatedAt": "2022-12-21T16:24:13.178Z"
                },
                {
                    "ATX_CONFIG_CODE_NUMBER_VALUE": "0",
                    "ATX_CONFIG_CODE_STRING_VALUE": "REST",
                    "createdAt": "2022-12-08T09:15:56.004Z",
                    "ATX_CONFIG_CODE_DATE_VALUE": "",
                    "updatedBy": "bhiaRBrWjFWZPpRapph1m8",
                    "createdBy": "bhiaRBrWjFWZPpRapph1m8",
                    "_recordId": "7tVcYvf9QyKqsNaGxTDzog",
                    "ATX_CONFIG_CODE": "PROTOCOL",
                    "updatedAt": "2022-12-21T16:24:14.287Z"
                },
                {
                    "ATX_CONFIG_CODE_NUMBER_VALUE": "0",
                    "ATX_CONFIG_CODE_STRING_VALUE": "N",
                    "createdAt": "2022-12-08T09:15:56.308Z",
                    "ATX_CONFIG_CODE_DATE_VALUE": "",
                    "updatedBy": "bhiaRBrWjFWZPpRapph1m8",
                    "createdBy": "bhiaRBrWjFWZPpRapph1m8",
                    "_recordId": "aLrpoeg6CACjNsWa6CsFUN",
                    "ATX_CONFIG_CODE": "QUERY_BATCH_FILES_BY_HOUR",
                    "updatedAt": "2022-12-21T16:24:15.406Z"
                },
                {
                    "ATX_CONFIG_CODE_STRING_VALUE": "Custom/Avalara",
                    "ATX_CONFIG_CODE_NUMBER_VALUE": "0",
                    "createdAt": "2022-12-08T09:15:56.638Z",
                    "ATX_CONFIG_CODE_DATE_VALUE": "",
                    "updatedBy": "bhiaRBrWjFWZPpRapph1m8",
                    "createdBy": "bhiaRBrWjFWZPpRapph1m8",
                    "_recordId": "54N2tLfvhcj221hHi6n3z9",
                    "ATX_CONFIG_CODE": "REPORT_STAGING_DIR",
                    "updatedAt": "2022-12-21T16:24:16.552Z"
                },
                {
                    "ATX_CONFIG_CODE_NUMBER_VALUE": "0",
                    "ATX_CONFIG_CODE_STRING_VALUE": "Y",
                    "createdAt": "2022-12-08T09:15:56.967Z",
                    "ATX_CONFIG_CODE_DATE_VALUE": "",
                    "updatedBy": "bhiaRBrWjFWZPpRapph1m8",
                    "createdBy": "bhiaRBrWjFWZPpRapph1m8",
                    "_recordId": "pmxVi69nj3RHpNZAJjEVns",
                    "ATX_CONFIG_CODE": "RETURN_LEGACY_TAX_ROW",
                    "updatedAt": "2022-12-21T16:24:17.689Z"
                },
                {
                    "ATX_CONFIG_CODE_NUMBER_VALUE": "0",
                    "ATX_CONFIG_CODE_STRING_VALUE": "Y",
                    "createdAt": "2022-12-08T09:15:57.272Z",
                    "ATX_CONFIG_CODE_DATE_VALUE": "",
                    "updatedBy": "bhiaRBrWjFWZPpRapph1m8",
                    "createdBy": "bhiaRBrWjFWZPpRapph1m8",
                    "_recordId": "kDipNXWdQ6WGAU7jEnD8AR",
                    "ATX_CONFIG_CODE": "SEND_SHIP_FROM_AS_POA",
                    "updatedAt": "2022-12-21T16:24:18.750Z"
                },
                {
                    "ATX_CONFIG_CODE_NUMBER_VALUE": "0",
                    "ATX_CONFIG_CODE_STRING_VALUE": "N",
                    "createdAt": "2022-12-08T09:15:57.582Z",
                    "ATX_CONFIG_CODE_DATE_VALUE": "",
                    "updatedBy": "bhiaRBrWjFWZPpRapph1m8",
                    "createdBy": "bhiaRBrWjFWZPpRapph1m8",
                    "_recordId": "gmhqUVzDeRQ5y68FbkdmGo",
                    "ATX_CONFIG_CODE": "TAX_CODE_MANDATORY",
                    "updatedAt": "2022-12-21T16:24:19.849Z"
                },
                {
                    "ATX_CONFIG_CODE_NUMBER_VALUE": "0",
                    "ATX_CONFIG_CODE_STRING_VALUE": "N",
                    "createdAt": "2022-12-08T09:15:57.845Z",
                    "ATX_CONFIG_CODE_DATE_VALUE": "",
                    "updatedBy": "bhiaRBrWjFWZPpRapph1m8",
                    "createdBy": "bhiaRBrWjFWZPpRapph1m8",
                    "_recordId": "j3PtqHRKCQPukKreZmZX2g",
                    "ATX_CONFIG_CODE": "USE_GL_ACCOUNT_STRING",
                    "updatedAt": "2022-12-21T16:24:22.007Z"
                },
                {
                    "ATX_CONFIG_CODE_STRING_VALUE": "VENDOR BILLED TAX2",
                    "ATX_CONFIG_CODE_NUMBER_VALUE": "0",
                    "createdAt": "2022-12-08T09:15:58.179Z",
                    "ATX_CONFIG_CODE_DATE_VALUE": "",
                    "updatedBy": "bhiaRBrWjFWZPpRapph1m8",
                    "createdBy": "bhiaRBrWjFWZPpRapph1m8",
                    "_recordId": "9iRcKBcX3fUU4vGDog1xQ4",
                    "ATX_CONFIG_CODE": "VBT_CODE",
                    "updatedAt": "2022-12-21T16:24:23.100Z"
                },
                {
                    "ATX_CONFIG_CODE_STRING_VALUE": "VENDOR BILLED RATE2",
                    "ATX_CONFIG_CODE_NUMBER_VALUE": "0",
                    "createdAt": "2022-12-08T09:15:58.455Z",
                    "ATX_CONFIG_CODE_DATE_VALUE": "",
                    "updatedBy": "bhiaRBrWjFWZPpRapph1m8",
                    "createdBy": "bhiaRBrWjFWZPpRapph1m8",
                    "_recordId": "uVX8FyrfXZY7E2Jqpnxdb1",
                    "ATX_CONFIG_CODE": "VBT_RATE_CODE",
                    "updatedAt": "2022-12-21T16:24:24.177Z"
                },
                {
                    "ATX_CONFIG_CODE_STRING_VALUE": "STANDARD",
                    "ATX_CONFIG_CODE_NUMBER_VALUE": "0",
                    "createdAt": "2022-12-08T09:15:58.768Z",
                    "ATX_CONFIG_CODE_DATE_VALUE": "",
                    "updatedBy": "bhiaRBrWjFWZPpRapph1m8",
                    "createdBy": "bhiaRBrWjFWZPpRapph1m8",
                    "_recordId": "3Fo9gMHfrtohcjVG965f6w",
                    "ATX_CONFIG_CODE": "VBT_STATUS_CODE",
                    "updatedAt": "2022-12-21T16:24:25.294Z"
                },
                {
                    "ATX_CONFIG_CODE_NUMBER_VALUE": "0",
                    "ATX_CONFIG_CODE_STRING_VALUE": "N",
                    "createdAt": "2022-12-09T17:01:13.844Z",
                    "ATX_CONFIG_CODE_DATE_VALUE": "",
                    "updatedBy": "bhiaRBrWjFWZPpRapph1m8",
                    "createdBy": "bhiaRBrWjFWZPpRapph1m8",
                    "_recordId": "51qiJkuJLMkLUyLsQpv6LQ",
                    "ATX_CONFIG_CODE": "TRIM_ITEM_CODE",
                    "updatedAt": "2022-12-21T16:24:20.944Z"
                }
            ]
        },
        "currentLegalEntity": {
            "updatedBy": "bhiaRBrWjFWZPpRapph1m8",
            "ATX_CERTIFICATE_CLIENT_ID": "",
            "ATX_JURISDICTION_CODE_PREFIX": "USTJ7",
            "_recordId": "sFfp5nAkCgLk5xKnQ791gj",
            "ATX_LEGAL_ENTITY_ID": "300000002080003",
            "createdAt": "2022-12-08T09:15:04.428Z",
            "ATX_TAX_REGIME_CODE": "AVATAX US7 SALES AND USE TAX",
            "ATX_COMPANY_CODE": "FUSIONOCICFGLEV2",
            "createdBy": "bhiaRBrWjFWZPpRapph1m8",
            "ATX_TAX_MODULE": "USSL",
            "ATX_LEGAL_ENTITY_NAME": "Smart ERP Solutions Inc.",
            "updatedAt": "2022-12-21T16:21:24.299Z",
            "ATX_COUNTRY": "US"
        },
        "vbtTaxAmtDetails": null,
        "isUS2US": null,
        "isUS2CA": true,
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
extension.flowFunctions.mapToFusionResponse.js(sdk, input).then(result=>console.log(JSON.stringify(result,null,2)))

// extension.flowFunctions.mapFusionSoapRequestV2.js(sdk, {body: triggerBody}).then(result=>console.log(result))