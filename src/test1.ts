import { AppknitSDK, SdkExecutionError, SdkGenericErrorCodes } from '@appknit-project/appknit-platform-sdk-v2';
import extension from './index'

const input = {
    "avalaraTransaction": {
        "id": 85015455486332,
        "code": "1355083",
        "companyId": 7836794,
        "date": "2022-12-14",
        "paymentDate": "1900-01-01",
        "status": "Committed",
        "type": "SalesInvoice",
        "batchCode": "",
        "currencyCode": "USD",
        "exchangeRateCurrencyCode": "USD",
        "customerUsageType": "",
        "entityUseCode": "",
        "customerVendorCode": "114011",
        "customerCode": "114011",
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
        "totalTax": 19,
        "totalTaxable": 100,
        "totalTaxCalculated": 19,
        "adjustmentReason": "Other",
        "adjustmentDescription": "Create or adjust transaction",
        "locked": false,
        "region": "",
        "country": "DE",
        "version": 7,
        "softwareVersion": "22.12.0.0",
        "originAddressId": 0,
        "destinationAddressId": 0,
        "exchangeRateEffectiveDate": "2022-12-14",
        "exchangeRate": 1,
        "isSellerImporterOfRecord": false,
        "description": "",
        "businessIdentificationNo": "",
        "modifiedDate": "2022-12-15T12:30:54.297146Z",
        "modifiedUserId": 34042,
        "taxDate": "2022-12-14",
        "lines": [
            {
                "id": 85015455486336,
                "transactionId": 85015455486332,
                "lineNumber": "1",
                "boundaryOverrideId": 0,
                "customerUsageType": "",
                "entityUseCode": "",
                "description": "HP Envy Printer 3",
                "destinationAddressId": 85015455486333,
                "originAddressId": 85015455486334,
                "discountAmount": 0,
                "discountTypeId": 0,
                "exemptAmount": 0,
                "exemptCertId": 0,
                "exemptNo": "",
                "isItemTaxable": true,
                "isSSTP": false,
                "itemCode": "COMPUTER|DESKTOP",
                "lineAmount": 100,
                "quantity": 1,
                "ref1": "",
                "ref2": "",
                "reportingDate": "2022-12-14",
                "revAccount": "SERPSOLS-00-410002-000-SERPSOLS-0-0-0-0-0",
                "sourcing": "Destination",
                "tax": 19,
                "taxableAmount": 100,
                "taxCalculated": 19,
                "taxCode": "P0000000",
                "taxCodeId": 8087,
                "taxDate": "2022-12-14",
                "taxEngine": "",
                "taxOverrideType": "None",
                "businessIdentificationNo": "",
                "taxOverrideAmount": 0,
                "taxOverrideReason": "",
                "taxIncluded": false,
                "originationDocumentId": "300000199920183",
                "details": [
                    {
                        "id": 85015455486370,
                        "transactionLineId": 85015455486336,
                        "transactionId": 85015455486332,
                        "addressId": 85015455486333,
                        "country": "NL",
                        "region": "NL",
                        "countyFIPS": "",
                        "stateFIPS": "",
                        "exemptAmount": 0,
                        "exemptReasonId": 4,
                        "inState": true,
                        "jurisCode": "DE",
                        "jurisName": "GERMANY",
                        "jurisdictionId": 200079,
                        "signatureCode": "",
                        "stateAssignedNo": "",
                        "jurisType": "CNT",
                        "jurisdictionType": "Country",
                        "nonTaxableAmount": 0,
                        "nonTaxableRuleId": 0,
                        "nonTaxableType": "RateRule",
                        "rate": 0.19,
                        "rateRuleId": 5096078,
                        "rateSourceId": 0,
                        "serCode": "",
                        "sourcing": "Destination",
                        "tax": 19,
                        "taxableAmount": 100,
                        "taxType": "Output",
                        "taxSubTypeId": "O",
                        "taxTypeGroupId": "InputAndOutput",
                        "taxName": "Standard",
                        "taxAuthorityTypeId": 45,
                        "taxRegionId": 205079,
                        "taxCalculated": 19,
                        "taxOverride": 0,
                        "rateType": "Standard",
                        "rateTypeCode": "S",
                        "taxableUnits": 100,
                        "nonTaxableUnits": 0,
                        "exemptUnits": 0,
                        "unitOfBasis": "PerCurrencyUnit",
                        "isNonPassThru": false,
                        "isFee": false,
                        "reportingTaxableUnits": 100,
                        "reportingNonTaxableUnits": 0,
                        "reportingExemptUnits": 0,
                        "reportingTax": 19,
                        "reportingTaxCalculated": 19,
                        "avtUserBIN": "",
                        "liabilityType": "Seller"
                    }
                ],
                "nonPassthroughDetails": [],
                "lineLocationTypes": [
                    {
                        "documentLineLocationTypeId": 85015455486338,
                        "documentLineId": 85015455486336,
                        "documentAddressId": 85015455486334,
                        "locationTypeCode": "ShipFrom"
                    },
                    {
                        "documentLineLocationTypeId": 85015455486339,
                        "documentLineId": 85015455486336,
                        "documentAddressId": 85015455486333,
                        "locationTypeCode": "ShipTo"
                    },
                    {
                        "documentLineLocationTypeId": 85015455486340,
                        "documentLineId": 85015455486336,
                        "documentAddressId": 85015455486334,
                        "locationTypeCode": "PointOfOrderAcceptance"
                    }
                ],
                "parameters": [
                    {
                        "name": "Transport",
                        "value": "Seller"
                    },
                    {
                        "name": "IsMarketplace",
                        "value": "False"
                    },
                    {
                        "name": "SupplyofService",
                        "value": "Generic"
                    },
                    {
                        "name": "IsTriangulation",
                        "value": "false"
                    },
                    {
                        "name": "IsGoodsSecondHand",
                        "value": "false"
                    }
                ],
                "userDefinedFields": [
                    {
                        "name": "UDF1",
                        "value": "ORACLE"
                    },
                    {
                        "name": "UDF3",
                        "value": "Unter den Linden 77,"
                    },
                    {
                        "name": "UDF5",
                        "value": "DE"
                    }
                ],
                "hsCode": "",
                "costInsuranceFreight": 0,
                "vatCode": "DESA190CNL",
                "vatNumberTypeId": 0
            },
            {
                "id": 85015455486336,
                "transactionId": 85015455486332,
                "lineNumber": "2",
                "boundaryOverrideId": 0,
                "customerUsageType": "",
                "entityUseCode": "",
                "description": "HP Envy Printer 3",
                "destinationAddressId": 85015455486333,
                "originAddressId": 85015455486334,
                "discountAmount": 0,
                "discountTypeId": 0,
                "exemptAmount": 0,
                "exemptCertId": 0,
                "exemptNo": "",
                "isItemTaxable": true,
                "isSSTP": false,
                "itemCode": "COMPUTER|DESKTOP",
                "lineAmount": 100,
                "quantity": 1,
                "ref1": "",
                "ref2": "",
                "reportingDate": "2022-12-14",
                "revAccount": "SERPSOLS-00-410002-000-SERPSOLS-0-0-0-0-0",
                "sourcing": "Destination",
                "tax": 19,
                "taxableAmount": 100,
                "taxCalculated": 19,
                "taxCode": "P0000000",
                "taxCodeId": 8087,
                "taxDate": "2022-12-14",
                "taxEngine": "",
                "taxOverrideType": "None",
                "businessIdentificationNo": "",
                "taxOverrideAmount": 0,
                "taxOverrideReason": "",
                "taxIncluded": false,
                "originationDocumentId": "300000199920183",
                "details": [
                    {
                        "id": 85015455486370,
                        "transactionLineId": 85015455486336,
                        "transactionId": 85015455486332,
                        "addressId": 85015455486333,
                        "country": "NL",
                        "region": "NL",
                        "countyFIPS": "",
                        "stateFIPS": "",
                        "exemptAmount": 0,
                        "exemptReasonId": 4,
                        "inState": true,
                        "jurisCode": "DE",
                        "jurisName": "GERMANY",
                        "jurisdictionId": 200079,
                        "signatureCode": "",
                        "stateAssignedNo": "",
                        "jurisType": "CNT",
                        "jurisdictionType": "Country",
                        "nonTaxableAmount": 0,
                        "nonTaxableRuleId": 0,
                        "nonTaxableType": "RateRule",
                        "rate": 0.19,
                        "rateRuleId": 5096078,
                        "rateSourceId": 0,
                        "serCode": "",
                        "sourcing": "Destination",
                        "tax": 19,
                        "taxableAmount": 100,
                        "taxType": "Output",
                        "taxSubTypeId": "O",
                        "taxTypeGroupId": "InputAndOutput",
                        "taxName": "Standard",
                        "taxAuthorityTypeId": 45,
                        "taxRegionId": 205079,
                        "taxCalculated": 19,
                        "taxOverride": 0,
                        "rateType": "Standard",
                        "rateTypeCode": "S",
                        "taxableUnits": 100,
                        "nonTaxableUnits": 0,
                        "exemptUnits": 0,
                        "unitOfBasis": "PerCurrencyUnit",
                        "isNonPassThru": false,
                        "isFee": false,
                        "reportingTaxableUnits": 100,
                        "reportingNonTaxableUnits": 0,
                        "reportingExemptUnits": 0,
                        "reportingTax": 19,
                        "reportingTaxCalculated": 19,
                        "avtUserBIN": "",
                        "liabilityType": "Seller"
                    }
                ],
                "nonPassthroughDetails": [],
                "lineLocationTypes": [
                    {
                        "documentLineLocationTypeId": 85015455486338,
                        "documentLineId": 85015455486336,
                        "documentAddressId": 85015455486334,
                        "locationTypeCode": "ShipFrom"
                    },
                    {
                        "documentLineLocationTypeId": 85015455486339,
                        "documentLineId": 85015455486336,
                        "documentAddressId": 85015455486333,
                        "locationTypeCode": "ShipTo"
                    },
                    {
                        "documentLineLocationTypeId": 85015455486340,
                        "documentLineId": 85015455486336,
                        "documentAddressId": 85015455486334,
                        "locationTypeCode": "PointOfOrderAcceptance"
                    }
                ],
                "parameters": [
                    {
                        "name": "Transport",
                        "value": "Seller"
                    },
                    {
                        "name": "IsMarketplace",
                        "value": "False"
                    },
                    {
                        "name": "SupplyofService",
                        "value": "Generic"
                    },
                    {
                        "name": "IsTriangulation",
                        "value": "false"
                    },
                    {
                        "name": "IsGoodsSecondHand",
                        "value": "false"
                    }
                ],
                "userDefinedFields": [
                    {
                        "name": "UDF1",
                        "value": "ORACLE"
                    },
                    {
                        "name": "UDF3",
                        "value": "Unter den Linden 77,"
                    },
                    {
                        "name": "UDF5",
                        "value": "DE"
                    }
                ],
                "hsCode": "",
                "costInsuranceFreight": 0,
                "vatCode": "DESA190CNL",
                "vatNumberTypeId": 0
            }
        ],
        "addresses": [
            {
                "id": 85015455486333,
                "transactionId": 85015455486332,
                "boundaryLevel": "Zip5",
                "line1": "Unter den Linden 77,",
                "line2": "",
                "line3": "",
                "city": "Berlin",
                "region": "",
                "postalCode": "10117",
                "country": "DE",
                "taxRegionId": 205079
            },
            {
                "id": 85015455486334,
                "transactionId": 85015455486332,
                "boundaryLevel": "Zip5",
                "line1": "Stadhouderskade 12",
                "line2": "",
                "line3": "",
                "city": "Amsterdam",
                "region": "",
                "postalCode": "1054 ES",
                "country": "NL",
                "taxRegionId": 205099
            }
        ],
        "locationTypes": [],
        "summary": [
            {
                "country": "DE",
                "region": "DE",
                "jurisType": "Country",
                "jurisCode": "DE",
                "jurisName": "GERMANY",
                "taxAuthorityType": 45,
                "stateAssignedNo": "",
                "taxType": "Output",
                "taxSubType": "O",
                "taxName": "Standard",
                "rateType": "Standard",
                "taxable": 100,
                "rate": 0.19,
                "tax": 19,
                "taxCalculated": 19,
                "nonTaxable": 0,
                "exemption": 0
            }
        ],
        "messages": [
            {
                "summary": "Invoice  Messages for the transaction",
                "details": "{\"InvoiceMessageMasterList\":[{\"MessageCode\":0,\"Message\":\"No applicable messaging for this line.\",\"CitationCode\":\"\"},{\"MessageCode\":1,\"Message\":\"Outside of scope of local VAT. Reverse charge may be due by customer per Art. 196 of the EU Directive 2006/112/EC\",\"CitationCode\":\"Out-of-Scope-EU\"},{\"MessageCode\":2,\"Message\":\"Article 138.1 - Directive 2006/112 EC\",\"CitationCode\":\"Article138.1\"}],\"InvoiceMessageList\":[{\"TaxLineNo\":\"1\",\"MessageCode\":1},{\"TaxLineNo\":\"2\",\"MessageCode\":2}]}",
                "refersTo": "",
                "severity": "Success",
                "source": "Avalara.AvaTax.TaxEngine"
            }
        ],
        "invoiceMessages": [
            {
                "content": "Outside of scope of local VAT. Reverse charge may be due by customer per Art. 196 of the EU Directive 2006/112/EC",
                "lineNumbers": [
                    "1","2"
                ]
            },
            {
                "content": "Article 138.1 - Directive 2006/112 EC",
                "lineNumbers": [
                    "3"
                ]
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
            "ns:TrxDate": "2022-12-14",
            "ns:TrxDueDate": "2023-01-13",
            "ns:TrxId": "300000199920182",
            "ns:TrxLevelType": "ITEM",
            "ns:TrxNumber": "1355083",
            "taxableLines": [
                {
                    "ns:AccountCcid": 300000002075018,
                    "ns:ApplicationId": 222,
                    "ns:AccountString": "SERPSOLS-00-410002-000-SERPSOLS-0-0-0-0-0",
                    "ns:AssessableValue": 100,
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
                    "ns:BillThirdPtyAcctId": 300000115983650,
                    "ns:BillThirdPtyAcctSiteId": 300000115983651,
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
                    "ns:BillToGeographyValue1": "Unter den Linden 77,",
                    "ns:BillToGeographyValue5": "DE",
                    "ns:BillToGeographyValue8": "Berlin",
                    "ns:BillToGeographyValue9": "10117",
                    "ns:BillToLocationId": 300000115983653,
                    "ns:CashDiscount": "0",
                    "ns:EntityCode": "TRANSACTIONS",
                    "ns:EventClassCode": "INVOICE",
                    "ns:ExemptionControlFlag": "S",
                    "ns:LineAmt": 100,
                    "ns:LineAmtIncludesTaxFlag": "S",
                    "ns:LineClass": "INVOICE",
                    "ns:LineLevelAction": "UPDATE",
                    "ns:LinesDetFactorId": 16863589,
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
                    "ns:ProductCode": "HPP4520-3",
                    "ns:ProductDescription": "HP Envy Printer 3",
                    "ns:ProductFiscClassification": "COMPUTER|DESKTOP",
                    "ns:ProductId": "300000051794679",
                    "ns:ProductOrgId": "300000126140735",
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
                    "ns:ShipFromGeographyValue1": "Stadhouderskade 12",
                    "ns:ShipFromGeographyValue4": "Amsterdam NL Address",
                    "ns:ShipFromGeographyValue5": "NL",
                    "ns:ShipFromGeographyValue8": "Amsterdam",
                    "ns:ShipFromGeographyValue9": "1054 ES",
                    "ns:ShipFromLocationId": 300000126140738,
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
                    "ns:ShipToGeographyValue1": "Unter den Linden 77,",
                    "ns:ShipToGeographyValue5": "DE",
                    "ns:ShipToGeographyValue8": "Berlin",
                    "ns:ShipToGeographyValue9": "10117",
                    "ns:ShipToLocationId": "300000115983653",
                    "ns:TaxReportingFlag": "Y",
                    "ns:TrxBusinessCategory": "SALES_TRANSACTION",
                    "ns:TrxId": 300000199920182,
                    "ns:TrxLineCurrencyCode": "USD",
                    "ns:TrxLineDescription": "HP Envy Printer 3",
                    "ns:TrxLineGlDate": "2022-12-14",
                    "ns:TrxLineId": 300000199920183,
                    "ns:TrxLineNumber": 1,
                    "ns:TrxLinePrecision": 2,
                    "ns:TrxLineQuantity": 1,
                    "ns:TrxLineType": "ITEM",
                    "ns:TrxLevelType": "LINE",
                    "ns:TrxTypeDescription": "Regular Invoice for Test",
                    "ns:UnitPrice": 100,
                    "ns:UomCode": "zzy",
                    "_addresses": {
                        "shipFrom": {
                            "line1": "Stadhouderskade 12",
                            "line4": "Amsterdam NL Address",
                            "country": "NL",
                            "city": "Amsterdam",
                            "postalCode": "1054 ES"
                        },
                        "shipTo": {
                            "line1": "Unter den Linden 77,",
                            "country": "DE",
                            "city": "Berlin",
                            "postalCode": "10117"
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
                            "line1": "Unter den Linden 77,",
                            "country": "DE",
                            "city": "Berlin",
                            "postalCode": "10117"
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
                    "ns:AccountCcid": 300000002075018,
                    "ns:ApplicationId": 222,
                    "ns:AccountString": "SERPSOLS-00-410002-000-SERPSOLS-0-0-0-0-0",
                    "ns:AssessableValue": 100,
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
                    "ns:BillThirdPtyAcctId": 300000115983650,
                    "ns:BillThirdPtyAcctSiteId": 300000115983651,
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
                    "ns:BillToGeographyValue1": "Unter den Linden 77,",
                    "ns:BillToGeographyValue5": "DE",
                    "ns:BillToGeographyValue8": "Berlin",
                    "ns:BillToGeographyValue9": "10117",
                    "ns:BillToLocationId": 300000115983653,
                    "ns:CashDiscount": "0",
                    "ns:EntityCode": "TRANSACTIONS",
                    "ns:EventClassCode": "INVOICE",
                    "ns:ExemptionControlFlag": "S",
                    "ns:LineAmt": 100,
                    "ns:LineAmtIncludesTaxFlag": "S",
                    "ns:LineClass": "INVOICE",
                    "ns:LineLevelAction": "UPDATE",
                    "ns:LinesDetFactorId": 16863589,
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
                    "ns:ProductCode": "HPP4520-3",
                    "ns:ProductDescription": "HP Envy Printer 3",
                    "ns:ProductFiscClassification": "COMPUTER|DESKTOP",
                    "ns:ProductId": "300000051794679",
                    "ns:ProductOrgId": "300000126140735",
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
                    "ns:ShipFromGeographyValue1": "Stadhouderskade 12",
                    "ns:ShipFromGeographyValue4": "Amsterdam NL Address",
                    "ns:ShipFromGeographyValue5": "NL",
                    "ns:ShipFromGeographyValue8": "Amsterdam",
                    "ns:ShipFromGeographyValue9": "1054 ES",
                    "ns:ShipFromLocationId": 300000126140738,
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
                    "ns:ShipToGeographyValue1": "Unter den Linden 77,",
                    "ns:ShipToGeographyValue5": "DE",
                    "ns:ShipToGeographyValue8": "Berlin",
                    "ns:ShipToGeographyValue9": "10117",
                    "ns:ShipToLocationId": "300000115983653",
                    "ns:TaxReportingFlag": "Y",
                    "ns:TrxBusinessCategory": "SALES_TRANSACTION",
                    "ns:TrxId": 300000199920182,
                    "ns:TrxLineCurrencyCode": "USD",
                    "ns:TrxLineDescription": "HP Envy Printer 3",
                    "ns:TrxLineGlDate": "2022-12-14",
                    "ns:TrxLineId": 300000199920183,
                    "ns:TrxLineNumber": 2,
                    "ns:TrxLinePrecision": 2,
                    "ns:TrxLineQuantity": 1,
                    "ns:TrxLineType": "ITEM",
                    "ns:TrxLevelType": "LINE",
                    "ns:TrxTypeDescription": "Regular Invoice for Test",
                    "ns:UnitPrice": 100,
                    "ns:UomCode": "zzy",
                    "_addresses": {
                        "shipFrom": {
                            "line1": "Stadhouderskade 12",
                            "line4": "Amsterdam NL Address",
                            "country": "NL",
                            "city": "Amsterdam",
                            "postalCode": "1054 ES"
                        },
                        "shipTo": {
                            "line1": "Unter den Linden 77,",
                            "country": "DE",
                            "city": "Berlin",
                            "postalCode": "10117"
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
                            "line1": "Unter den Linden 77,",
                            "country": "DE",
                            "city": "Berlin",
                            "postalCode": "10117"
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
        "updatedAt": "2022-12-15T10:02:11.656Z",
        "ATX_CUSTOMER_BUSINESS_UNITS": [
            {
                "ATX_BUSINESS_UNIT": "Smart ERP Services Inc.",
                "createdAt": "2022-12-08T09:15:04.412Z",
                "ATX_BUSINESS_UNIT_ORGANIZATION_ID": "300000011107181",
                "updatedBy": "bhiaRBrWjFWZPpRapph1m8",
                "createdBy": "bhiaRBrWjFWZPpRapph1m8",
                "_recordId": "p1c2gWxVVnd6xRwhDxwZbh",
                "FIRST_PARTY_ORG_ID": "300000011119157",
                "updatedAt": "2022-12-15T10:02:12.067Z",
                "ATX_CUSTOMER_LEGAL_ENTITIES": [
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
                        "updatedAt": "2022-12-15T10:02:12.272Z",
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
                        "updatedAt": "2022-12-15T10:02:12.205Z",
                        "ATX_COUNTRY": "US"
                    },
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
                        "updatedAt": "2022-12-15T10:02:12.137Z",
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
                        "updatedAt": "2022-12-15T10:02:15.023Z",
                        "ATX_COUNTRY": "AU"
                    },
                    {
                        "createdAt": "2022-12-08T09:15:06.134Z",
                        "updatedBy": "bhiaRBrWjFWZPpRapph1m8",
                        "ATX_BUSINESS_UNIT_ORGANIZATION_ID": "300000011107181",
                        "createdBy": "bhiaRBrWjFWZPpRapph1m8",
                        "_recordId": "1VfXskhJFEwY2vnH4Nr9LU",
                        "ATX_APPLICATION_TYPE": "P2P",
                        "updatedAt": "2022-12-15T10:02:15.697Z",
                        "ATX_COUNTRY": "AU"
                    },
                    {
                        "createdAt": "2022-12-08T09:15:06.453Z",
                        "updatedBy": "bhiaRBrWjFWZPpRapph1m8",
                        "ATX_BUSINESS_UNIT_ORGANIZATION_ID": "300000011107181",
                        "createdBy": "bhiaRBrWjFWZPpRapph1m8",
                        "_recordId": "dsu4MvnVDtUgZ61R3DL5gy",
                        "ATX_APPLICATION_TYPE": "O2C",
                        "updatedAt": "2022-12-15T10:02:16.869Z",
                        "ATX_COUNTRY": "CA"
                    },
                    {
                        "createdAt": "2022-12-08T09:15:06.733Z",
                        "updatedBy": "bhiaRBrWjFWZPpRapph1m8",
                        "ATX_BUSINESS_UNIT_ORGANIZATION_ID": "300000011107181",
                        "createdBy": "bhiaRBrWjFWZPpRapph1m8",
                        "_recordId": "1anyQy4FELqY2vnMUsqaVj",
                        "ATX_APPLICATION_TYPE": "P2P",
                        "updatedAt": "2022-12-15T10:02:17.372Z",
                        "ATX_COUNTRY": "CA"
                    },
                    {
                        "createdAt": "2022-12-08T09:15:07.029Z",
                        "updatedBy": "bhiaRBrWjFWZPpRapph1m8",
                        "ATX_BUSINESS_UNIT_ORGANIZATION_ID": "300000011107181",
                        "createdBy": "bhiaRBrWjFWZPpRapph1m8",
                        "_recordId": "bGkzuyk5TZGsvwCvSw947T",
                        "ATX_APPLICATION_TYPE": "O2C",
                        "updatedAt": "2022-12-15T10:02:18.009Z",
                        "ATX_COUNTRY": "FR"
                    },
                    {
                        "createdAt": "2022-12-08T09:15:07.314Z",
                        "updatedBy": "bhiaRBrWjFWZPpRapph1m8",
                        "ATX_BUSINESS_UNIT_ORGANIZATION_ID": "300000011107181",
                        "createdBy": "bhiaRBrWjFWZPpRapph1m8",
                        "_recordId": "tSH7dwfCq3VSKtbA81bD6d",
                        "ATX_APPLICATION_TYPE": "P2P",
                        "updatedAt": "2022-12-15T10:02:18.649Z",
                        "ATX_COUNTRY": "FR"
                    },
                    {
                        "createdAt": "2022-12-08T09:15:07.626Z",
                        "updatedBy": "bhiaRBrWjFWZPpRapph1m8",
                        "ATX_BUSINESS_UNIT_ORGANIZATION_ID": "300000011107181",
                        "createdBy": "bhiaRBrWjFWZPpRapph1m8",
                        "_recordId": "sYDWePqEnKUeH2Trm5MYHK",
                        "ATX_APPLICATION_TYPE": "O2C",
                        "updatedAt": "2022-12-15T10:02:19.255Z",
                        "ATX_COUNTRY": "NL"
                    },
                    {
                        "createdAt": "2022-12-08T09:15:07.907Z",
                        "updatedBy": "bhiaRBrWjFWZPpRapph1m8",
                        "ATX_BUSINESS_UNIT_ORGANIZATION_ID": "300000011107181",
                        "createdBy": "bhiaRBrWjFWZPpRapph1m8",
                        "_recordId": "hoipYSsGUPgo6Vi7eVd5YW",
                        "ATX_APPLICATION_TYPE": "P2P",
                        "updatedAt": "2022-12-15T10:02:19.752Z",
                        "ATX_COUNTRY": "NL"
                    },
                    {
                        "createdAt": "2022-12-08T09:15:08.166Z",
                        "updatedBy": "bhiaRBrWjFWZPpRapph1m8",
                        "ATX_BUSINESS_UNIT_ORGANIZATION_ID": "300000011107181",
                        "createdBy": "bhiaRBrWjFWZPpRapph1m8",
                        "_recordId": "jXU4z5v6pniuJyPXqSQuqH",
                        "ATX_APPLICATION_TYPE": "O2C",
                        "updatedAt": "2022-12-15T10:02:20.243Z",
                        "ATX_COUNTRY": "SG"
                    },
                    {
                        "createdAt": "2022-12-08T09:15:08.467Z",
                        "updatedBy": "bhiaRBrWjFWZPpRapph1m8",
                        "ATX_BUSINESS_UNIT_ORGANIZATION_ID": "300000011107181",
                        "createdBy": "bhiaRBrWjFWZPpRapph1m8",
                        "_recordId": "rjfiQbdR3Wfw4E6bkXU1Bo",
                        "ATX_APPLICATION_TYPE": "O2C",
                        "updatedAt": "2022-12-15T10:02:20.736Z",
                        "ATX_COUNTRY": "US"
                    },
                    {
                        "createdAt": "2022-12-08T09:15:08.745Z",
                        "updatedBy": "bhiaRBrWjFWZPpRapph1m8",
                        "ATX_BUSINESS_UNIT_ORGANIZATION_ID": "300000011107181",
                        "createdBy": "bhiaRBrWjFWZPpRapph1m8",
                        "_recordId": "eKRi8Pokc2svR4rgdCGfyX",
                        "ATX_APPLICATION_TYPE": "P2P",
                        "updatedAt": "2022-12-15T10:02:21.225Z",
                        "ATX_COUNTRY": "US"
                    },
                    {
                        "createdAt": "2022-12-08T09:15:09.046Z",
                        "updatedBy": "bhiaRBrWjFWZPpRapph1m8",
                        "ATX_BUSINESS_UNIT_ORGANIZATION_ID": "300000011107181",
                        "createdBy": "bhiaRBrWjFWZPpRapph1m8",
                        "_recordId": "kYpux2Qkd8z2TFdtnPwHoB",
                        "ATX_APPLICATION_TYPE": "O2C",
                        "updatedAt": "2022-12-15T10:02:21.808Z",
                        "ATX_COUNTRY": "XI"
                    }
                ],
                "ATX_AP_TOLERANCE": {}
            },
            {
                "ATX_BUSINESS_UNIT": "SmartERP Ireland BU",
                "createdAt": "2022-12-08T09:15:04.529Z",
                "ATX_BUSINESS_UNIT_ORGANIZATION_ID": "300000099042074",
                "updatedBy": "bhiaRBrWjFWZPpRapph1m8",
                "createdBy": "bhiaRBrWjFWZPpRapph1m8",
                "_recordId": "rR7eLJaR2zRxzvBnpUkaUS",
                "FIRST_PARTY_ORG_ID": "300000099119994",
                "updatedAt": "2022-12-15T10:02:12.722Z",
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
                        "updatedAt": "2022-12-15T10:02:12.782Z",
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
                        "updatedAt": "2022-12-15T10:02:24.538Z",
                        "ATX_COUNTRY": "IE"
                    },
                    {
                        "createdAt": "2022-12-08T09:15:10.777Z",
                        "updatedBy": "bhiaRBrWjFWZPpRapph1m8",
                        "ATX_BUSINESS_UNIT_ORGANIZATION_ID": "300000099042074",
                        "createdBy": "bhiaRBrWjFWZPpRapph1m8",
                        "_recordId": "gN3961TcaYYR3XTru1c9zy",
                        "ATX_APPLICATION_TYPE": "P2P",
                        "updatedAt": "2022-12-15T10:02:25.034Z",
                        "ATX_COUNTRY": "IE"
                    }
                ],
                "ATX_AP_TOLERANCE": {}
            },
            {
                "ATX_BUSINESS_UNIT": "SmartERP Colombia BU",
                "createdAt": "2022-12-08T09:15:04.733Z",
                "ATX_BUSINESS_UNIT_ORGANIZATION_ID": "300000099185128",
                "updatedBy": "bhiaRBrWjFWZPpRapph1m8",
                "createdBy": "bhiaRBrWjFWZPpRapph1m8",
                "_recordId": "b5Qd66KcRRcKRq7JSENeGz",
                "FIRST_PARTY_ORG_ID": "300000099179285",
                "updatedAt": "2022-12-15T10:02:12.841Z",
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
                        "updatedAt": "2022-12-15T10:02:12.901Z",
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
                        "updatedAt": "2022-12-15T10:02:25.528Z",
                        "ATX_COUNTRY": "CO"
                    }
                ],
                "ATX_AP_TOLERANCE": {}
            },
            {
                "ATX_BUSINESS_UNIT": "AppKnit Cloud Inc BU",
                "createdAt": "2022-12-08T09:15:05.103Z",
                "ATX_BUSINESS_UNIT_ORGANIZATION_ID": "300000125689483554",
                "updatedBy": "bhiaRBrWjFWZPpRapph1m8",
                "createdBy": "bhiaRBrWjFWZPpRapph1m8",
                "_recordId": "8ZpPE6e7v3UawzXoqK99rc",
                "FIRST_PARTY_ORG_ID": "30000012568948344",
                "updatedAt": "2022-12-15T10:02:14.015Z",
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
                        "updatedAt": "2022-12-15T10:02:14.088Z",
                        "ATX_COUNTRY": "US"
                    }
                ],
                "ATX_BUSINESS_UNIT_REGIME_SUBSCRIPTION": [],
                "ATX_AP_TOLERANCE": {}
            },
            {
                "ATX_BUSINESS_UNIT": "SmartERP Israel BU",
                "createdAt": "2022-12-08T09:15:04.956Z",
                "ATX_BUSINESS_UNIT_ORGANIZATION_ID": "300000105054777",
                "updatedBy": "bhiaRBrWjFWZPpRapph1m8",
                "createdBy": "bhiaRBrWjFWZPpRapph1m8",
                "_recordId": "kFpcCuyS5NrPCdrjkuUsLs",
                "FIRST_PARTY_ORG_ID": "300000106092417",
                "updatedAt": "2022-12-15T10:02:13.157Z",
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
                        "updatedAt": "2022-12-15T10:02:13.263Z",
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
                        "updatedAt": "2022-12-15T10:02:27.553Z",
                        "ATX_COUNTRY": "IL"
                    },
                    {
                        "createdAt": "2022-12-08T09:15:12.946Z",
                        "updatedBy": "bhiaRBrWjFWZPpRapph1m8",
                        "ATX_BUSINESS_UNIT_ORGANIZATION_ID": "300000105054777",
                        "createdBy": "bhiaRBrWjFWZPpRapph1m8",
                        "_recordId": "ajLvexGuUK8ARge5kDLomi",
                        "ATX_APPLICATION_TYPE": "P2P",
                        "updatedAt": "2022-12-15T10:02:28.054Z",
                        "ATX_COUNTRY": "IL"
                    }
                ],
                "ATX_AP_TOLERANCE": {}
            },
            {
                "ATX_BUSINESS_UNIT": "Smart ERP Germany BU",
                "createdAt": "2022-12-08T09:15:04.204Z",
                "updatedBy": "bhiaRBrWjFWZPpRapph1m8",
                "ATX_BUSINESS_UNIT_ORGANIZATION_ID": "2",
                "createdBy": "bhiaRBrWjFWZPpRapph1m8",
                "_recordId": "4Yzfw5zgvcM1whJsN8eXSB",
                "FIRST_PARTY_ORG_ID": "300000027470973",
                "updatedAt": "2022-12-15T10:02:11.735Z",
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
                        "updatedAt": "2022-12-15T10:02:11.887Z",
                        "ATX_COUNTRY": "DE"
                    }
                ],
                "ATX_BUSINESS_UNIT_REGIME_SUBSCRIPTION": [],
                "ATX_AP_TOLERANCE": {}
            },
            {
                "ATX_BUSINESS_UNIT": "Smart ERP Canada BU",
                "createdAt": "2022-12-08T09:15:04.492Z",
                "ATX_BUSINESS_UNIT_ORGANIZATION_ID": "300000018736906",
                "updatedBy": "bhiaRBrWjFWZPpRapph1m8",
                "createdBy": "bhiaRBrWjFWZPpRapph1m8",
                "_recordId": "aUd3jcA9JSJiMvQtFG3ivh",
                "FIRST_PARTY_ORG_ID": "300000027222408",
                "updatedAt": "2022-12-15T10:02:12.471Z",
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
                        "updatedAt": "2022-12-15T10:02:12.539Z",
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
                        "updatedAt": "2022-12-15T10:02:22.333Z",
                        "ATX_COUNTRY": "CA"
                    },
                    {
                        "createdAt": "2022-12-08T09:15:09.645Z",
                        "updatedBy": "bhiaRBrWjFWZPpRapph1m8",
                        "ATX_BUSINESS_UNIT_ORGANIZATION_ID": "300000018736906",
                        "createdBy": "bhiaRBrWjFWZPpRapph1m8",
                        "_recordId": "eW1E4sTwgd75FbFR2QDu9E",
                        "ATX_APPLICATION_TYPE": "P2P",
                        "updatedAt": "2022-12-15T10:02:22.836Z",
                        "ATX_COUNTRY": "CA"
                    }
                ],
                "ATX_AP_TOLERANCE": {}
            },
            {
                "ATX_BUSINESS_UNIT": "SmartERP France BU",
                "createdAt": "2022-12-08T09:15:04.939Z",
                "ATX_BUSINESS_UNIT_ORGANIZATION_ID": "300000105054521",
                "updatedBy": "bhiaRBrWjFWZPpRapph1m8",
                "createdBy": "bhiaRBrWjFWZPpRapph1m8",
                "_recordId": "8D25eXNFjaUzcdJA4eGE6k",
                "FIRST_PARTY_ORG_ID": "300000106092336",
                "updatedAt": "2022-12-15T10:02:12.961Z",
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
                        "updatedAt": "2022-12-15T10:02:13.075Z",
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
                        "updatedAt": "2022-12-15T10:02:26.050Z",
                        "ATX_COUNTRY": "FR"
                    },
                    {
                        "createdAt": "2022-12-08T09:15:12.063Z",
                        "updatedBy": "bhiaRBrWjFWZPpRapph1m8",
                        "ATX_BUSINESS_UNIT_ORGANIZATION_ID": "300000105054521",
                        "createdBy": "bhiaRBrWjFWZPpRapph1m8",
                        "_recordId": "4QNrnyV7SQzxgdNxse99KM",
                        "ATX_APPLICATION_TYPE": "P2P",
                        "updatedAt": "2022-12-15T10:02:26.548Z",
                        "ATX_COUNTRY": "FR"
                    },
                    {
                        "createdAt": "2022-12-08T09:15:12.333Z",
                        "updatedBy": "bhiaRBrWjFWZPpRapph1m8",
                        "ATX_BUSINESS_UNIT_ORGANIZATION_ID": "300000105054521",
                        "createdBy": "bhiaRBrWjFWZPpRapph1m8",
                        "_recordId": "oijPjizVHoo8Gs5V5SxjPQ",
                        "ATX_APPLICATION_TYPE": "O2C",
                        "updatedAt": "2022-12-15T10:02:27.057Z",
                        "ATX_COUNTRY": "NL"
                    }
                ],
                "ATX_AP_TOLERANCE": {}
            },
            {
                "ATX_BUSINESS_UNIT": "SmartERP India BU",
                "createdAt": "2022-12-08T09:15:05.062Z",
                "ATX_BUSINESS_UNIT_ORGANIZATION_ID": "300000116064777",
                "updatedBy": "bhiaRBrWjFWZPpRapph1m8",
                "createdBy": "bhiaRBrWjFWZPpRapph1m8",
                "_recordId": "x3ky5FoM4oCy9UrB316XQw",
                "FIRST_PARTY_ORG_ID": "300000116087426",
                "updatedAt": "2022-12-15T10:02:13.725Z",
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
                        "updatedAt": "2022-12-15T10:02:13.822Z",
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
                        "updatedAt": "2022-12-15T10:02:28.552Z",
                        "ATX_COUNTRY": "IN"
                    },
                    {
                        "createdAt": "2022-12-08T09:15:13.527Z",
                        "updatedBy": "bhiaRBrWjFWZPpRapph1m8",
                        "ATX_BUSINESS_UNIT_ORGANIZATION_ID": "300000116064777",
                        "createdBy": "bhiaRBrWjFWZPpRapph1m8",
                        "_recordId": "5YdYaY98dHyWBqHL6i3M4L",
                        "ATX_APPLICATION_TYPE": "P2P",
                        "updatedAt": "2022-12-15T10:02:29.048Z",
                        "ATX_COUNTRY": "IN"
                    }
                ],
                "ATX_AP_TOLERANCE": {}
            },
            {
                "ATX_BUSINESS_UNIT": "SmartERP Mexico BU",
                "createdAt": "2022-12-08T09:15:05.040Z",
                "ATX_BUSINESS_UNIT_ORGANIZATION_ID": "300000106686938",
                "updatedBy": "bhiaRBrWjFWZPpRapph1m8",
                "createdBy": "bhiaRBrWjFWZPpRapph1m8",
                "_recordId": "qZPxf5SJxvrPxRFTapjJzg",
                "FIRST_PARTY_ORG_ID": "300000106939098",
                "updatedAt": "2022-12-15T10:02:13.482Z",
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
                        "updatedAt": "2022-12-15T10:02:13.665Z",
                        "ATX_COUNTRY": "MX"
                    }
                ],
                "ATX_BUSINESS_UNIT_REGIME_SUBSCRIPTION": [],
                "ATX_AP_TOLERANCE": {}
            },
            {
                "ATX_BUSINESS_UNIT": "SmartERP Italy BU",
                "createdAt": "2022-12-08T09:15:05.084Z",
                "ATX_BUSINESS_UNIT_ORGANIZATION_ID": "300000125717393",
                "updatedBy": "bhiaRBrWjFWZPpRapph1m8",
                "createdBy": "bhiaRBrWjFWZPpRapph1m8",
                "_recordId": "cVquemNPWcqyJ7YNvya842",
                "FIRST_PARTY_ORG_ID": "300000125689483",
                "updatedAt": "2022-12-15T10:02:13.881Z",
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
                        "updatedAt": "2022-12-15T10:02:13.954Z",
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
                        "updatedAt": "2022-12-15T10:02:29.573Z",
                        "ATX_COUNTRY": "IT"
                    },
                    {
                        "createdAt": "2022-12-08T09:15:14.106Z",
                        "updatedBy": "bhiaRBrWjFWZPpRapph1m8",
                        "ATX_BUSINESS_UNIT_ORGANIZATION_ID": "300000125717393",
                        "createdBy": "bhiaRBrWjFWZPpRapph1m8",
                        "_recordId": "jth9uDNnhXsCYZe4sHA1yp",
                        "ATX_APPLICATION_TYPE": "P2P",
                        "updatedAt": "2022-12-15T10:02:30.074Z",
                        "ATX_COUNTRY": "IT"
                    }
                ],
                "ATX_AP_TOLERANCE": {}
            },
            {
                "ATX_BUSINESS_UNIT": "SmartERP Japan BU",
                "createdAt": "2022-12-08T09:15:05.018Z",
                "ATX_BUSINESS_UNIT_ORGANIZATION_ID": "300000106686884",
                "updatedBy": "bhiaRBrWjFWZPpRapph1m8",
                "createdBy": "bhiaRBrWjFWZPpRapph1m8",
                "_recordId": "83HeTLHuL5MBvyPjcvqPBB",
                "FIRST_PARTY_ORG_ID": "300000106939043",
                "updatedAt": "2022-12-15T10:02:13.361Z",
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
                        "updatedAt": "2022-12-15T10:02:13.423Z",
                        "ATX_COUNTRY": "JP"
                    }
                ],
                "ATX_BUSINESS_UNIT_REGIME_SUBSCRIPTION": [],
                "ATX_AP_TOLERANCE": {}
            },
            {
                "ATX_BUSINESS_UNIT": "AppKnit AFC US BU",
                "createdAt": "2022-12-08T09:15:04.511Z",
                "ATX_BUSINESS_UNIT_ORGANIZATION_ID": "300000020674465",
                "updatedBy": "bhiaRBrWjFWZPpRapph1m8",
                "createdBy": "bhiaRBrWjFWZPpRapph1m8",
                "_recordId": "gFQRx1N5yK9Gey1kAAWoGa",
                "FIRST_PARTY_ORG_ID": "300000020580800",
                "updatedAt": "2022-12-15T10:02:12.600Z",
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
                        "updatedAt": "2022-12-15T10:02:12.661Z",
                        "ATX_COUNTRY": "US"
                    }
                ],
                "ATX_BUSINESS_UNIT_REGIME_SUBSCRIPTION": [],
                "ATX_AP_TOLERANCE": {}
            },
            {
                "ATX_BUSINESS_UNIT": "Appknit US BU",
                "createdAt": "2022-12-08T09:15:04.473Z",
                "ATX_BUSINESS_UNIT_ORGANIZATION_ID": "300000011481057",
                "updatedBy": "bhiaRBrWjFWZPpRapph1m8",
                "createdBy": "bhiaRBrWjFWZPpRapph1m8",
                "_recordId": "vkp6bqY4N8ib11kYr18HiC",
                "FIRST_PARTY_ORG_ID": "300000011343035",
                "updatedAt": "2022-12-15T10:02:12.341Z",
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
                        "updatedAt": "2022-12-15T10:02:12.411Z",
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
                "updatedAt": "2022-12-15T10:02:30.717Z",
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
                        "updatedAt": "2022-12-15T10:02:30.817Z",
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
                        "updatedAt": "2022-12-15T10:02:30.959Z",
                        "ATX_COUNTRY": "AU"
                    }
                ]
            },
            {
                "createdAt": "2022-12-08T09:15:15.245Z",
                "updatedBy": "bhiaRBrWjFWZPpRapph1m8",
                "createdBy": "bhiaRBrWjFWZPpRapph1m8",
                "_recordId": "v7o4vT22rg8L6hZzMyQy4e",
                "updatedAt": "2022-12-15T10:02:31.572Z",
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
                        "updatedAt": "2022-12-15T10:02:31.977Z",
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
                        "updatedAt": "2022-12-15T10:02:32.164Z",
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
                        "updatedAt": "2022-12-15T10:02:31.819Z",
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
                        "updatedAt": "2022-12-15T10:02:32.063Z",
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
                        "updatedAt": "2022-12-15T10:02:32.323Z",
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
                        "updatedAt": "2022-12-15T10:02:31.898Z",
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
                        "updatedAt": "2022-12-15T10:02:31.663Z",
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
                        "updatedAt": "2022-12-15T10:02:32.243Z",
                        "ATX_COUNTRY": "CA"
                    }
                ]
            },
            {
                "createdAt": "2022-12-08T09:15:15.747Z",
                "updatedBy": "bhiaRBrWjFWZPpRapph1m8",
                "createdBy": "bhiaRBrWjFWZPpRapph1m8",
                "_recordId": "5qpvRmJ2HNxUZQuMKwGMQ4",
                "updatedAt": "2022-12-15T10:02:33.005Z",
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
                        "updatedAt": "2022-12-15T10:02:33.094Z",
                        "ATX_COUNTRY": "CO"
                    }
                ]
            },
            {
                "createdAt": "2022-12-08T09:15:16.187Z",
                "updatedBy": "bhiaRBrWjFWZPpRapph1m8",
                "createdBy": "bhiaRBrWjFWZPpRapph1m8",
                "_recordId": "4DyCux31smSwnXwfs2r9Sy",
                "updatedAt": "2022-12-15T10:02:33.744Z",
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
                        "updatedAt": "2022-12-15T10:02:33.993Z",
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
                        "updatedAt": "2022-12-15T10:02:33.852Z",
                        "ATX_COUNTRY": "FR"
                    }
                ]
            },
            {
                "createdAt": "2022-12-08T09:15:16.667Z",
                "updatedBy": "bhiaRBrWjFWZPpRapph1m8",
                "createdBy": "bhiaRBrWjFWZPpRapph1m8",
                "_recordId": "8K3pck78pq3eVJkUvBwt4U",
                "updatedAt": "2022-12-15T10:02:34.572Z",
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
                        "updatedAt": "2022-12-15T10:02:34.799Z",
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
                        "updatedAt": "2022-12-15T10:02:34.660Z",
                        "ATX_COUNTRY": "IE"
                    }
                ]
            },
            {
                "createdAt": "2022-12-08T09:15:17.133Z",
                "updatedBy": "bhiaRBrWjFWZPpRapph1m8",
                "createdBy": "bhiaRBrWjFWZPpRapph1m8",
                "_recordId": "domV1Lucu4JUGi4cevvqjw",
                "updatedAt": "2022-12-15T10:02:35.377Z",
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
                        "updatedAt": "2022-12-15T10:02:35.465Z",
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
                        "updatedAt": "2022-12-15T10:02:35.628Z",
                        "ATX_COUNTRY": "IL"
                    }
                ]
            },
            {
                "createdAt": "2022-12-08T09:15:17.620Z",
                "updatedBy": "bhiaRBrWjFWZPpRapph1m8",
                "createdBy": "bhiaRBrWjFWZPpRapph1m8",
                "_recordId": "ajJLS2zW7Hc7MTzsN1m5nu",
                "updatedAt": "2022-12-15T10:02:36.267Z",
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
                        "updatedAt": "2022-12-15T10:02:36.718Z",
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
                        "updatedAt": "2022-12-15T10:02:37.019Z",
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
                        "updatedAt": "2022-12-15T10:02:36.632Z",
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
                        "updatedAt": "2022-12-15T10:02:36.942Z",
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
                        "updatedAt": "2022-12-15T10:02:36.793Z",
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
                        "updatedAt": "2022-12-15T10:02:36.867Z",
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
                        "updatedAt": "2022-12-15T10:02:36.355Z",
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
                        "updatedAt": "2022-12-15T10:02:36.558Z",
                        "ATX_COUNTRY": "IN"
                    }
                ]
            },
            {
                "createdAt": "2022-12-08T09:15:18.105Z",
                "updatedBy": "bhiaRBrWjFWZPpRapph1m8",
                "createdBy": "bhiaRBrWjFWZPpRapph1m8",
                "_recordId": "6B4NtECGvqJ7ZSMhZNw8Gz",
                "updatedAt": "2022-12-15T10:02:37.635Z",
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
                        "updatedAt": "2022-12-15T10:02:37.726Z",
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
                        "updatedAt": "2022-12-15T10:02:37.911Z",
                        "ATX_COUNTRY": "IT"
                    }
                ]
            },
            {
                "createdAt": "2022-12-08T09:15:18.551Z",
                "updatedBy": "bhiaRBrWjFWZPpRapph1m8",
                "createdBy": "bhiaRBrWjFWZPpRapph1m8",
                "_recordId": "7983N1ZkuwfB7E9idsafoW",
                "updatedAt": "2022-12-15T10:02:39.223Z",
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
                        "updatedAt": "2022-12-15T10:02:39.452Z",
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
                        "updatedAt": "2022-12-15T10:02:39.310Z",
                        "ATX_COUNTRY": "JP"
                    }
                ]
            },
            {
                "createdAt": "2022-12-08T09:15:18.973Z",
                "updatedBy": "bhiaRBrWjFWZPpRapph1m8",
                "createdBy": "bhiaRBrWjFWZPpRapph1m8",
                "_recordId": "bvt8i7nRmnMvWhmkau5D7X",
                "updatedAt": "2022-12-15T10:02:40.059Z",
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
                        "updatedAt": "2022-12-15T10:02:40.146Z",
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
                        "updatedAt": "2022-12-15T10:02:40.286Z",
                        "ATX_COUNTRY": "MX"
                    }
                ]
            },
            {
                "createdAt": "2022-12-08T09:15:19.421Z",
                "updatedBy": "bhiaRBrWjFWZPpRapph1m8",
                "createdBy": "bhiaRBrWjFWZPpRapph1m8",
                "_recordId": "4LiY8tRLCGSzc6NHzECQDU",
                "updatedAt": "2022-12-15T10:02:40.866Z",
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
                        "updatedAt": "2022-12-15T10:02:40.952Z",
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
                        "updatedAt": "2022-12-15T10:02:41.090Z",
                        "ATX_COUNTRY": "NL"
                    }
                ]
            },
            {
                "createdAt": "2022-12-08T09:15:19.899Z",
                "updatedBy": "bhiaRBrWjFWZPpRapph1m8",
                "createdBy": "bhiaRBrWjFWZPpRapph1m8",
                "_recordId": "3SyboHLkMTzacyNk6hcwMV",
                "updatedAt": "2022-12-15T10:02:41.667Z",
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
                        "updatedAt": "2022-12-15T10:02:41.891Z",
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
                        "updatedAt": "2022-12-15T10:02:41.753Z",
                        "ATX_COUNTRY": "SG"
                    }
                ]
            },
            {
                "createdAt": "2022-12-08T09:15:20.365Z",
                "updatedBy": "bhiaRBrWjFWZPpRapph1m8",
                "createdBy": "bhiaRBrWjFWZPpRapph1m8",
                "_recordId": "8osJJ1k2spMwRAQuxu22Xu",
                "updatedAt": "2022-12-15T10:02:42.533Z",
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
                        "updatedAt": "2022-12-15T10:02:42.619Z",
                        "ATX_COUNTRY": "XI"
                    }
                ]
            }
        ],
        "ATX_FIELD_MAPPING": [
            {
                "ATX_FIELD": "CustomerCode",
                "createdAt": "2022-12-08T09:15:21.767Z",
                "updatedBy": "bhiaRBrWjFWZPpRapph1m8",
                "createdBy": "bhiaRBrWjFWZPpRapph1m8",
                "_recordId": "m9U4sJM3uL33DKq2xJsPL2",
                "ATX_APPLICATION": "AP",
                "updatedAt": "2022-12-15T10:02:43.684Z",
                "ATX_FIELD_MAPPING_PRIORITY": [
                    {
                        "createdAt": "2022-12-08T09:15:21.891Z",
                        "updatedBy": "bhiaRBrWjFWZPpRapph1m8",
                        "createdBy": "bhiaRBrWjFWZPpRapph1m8",
                        "ATX_PRIORITY": "10",
                        "_recordId": "fJc1PeGjsumDeQwj6gHYPa",
                        "updatedAt": "2022-12-15T10:02:43.780Z",
                        "ATX_FUSION_FIELD": "VendorNumber",
                        "ATX_FUSION_FIELD_TYPE": "FFLD",
                        "ATX_FUSION_PROP_COLUMN_NAME": "ns:VendorNumber",
                        "ATX_FUSION_FIELD_LEVEL": "",
                        "ATX_REPORT_NAME": ""
                    }
                ]
            },
            {
                "ATX_FIELD": "ITEMCODE",
                "createdAt": "2022-12-08T09:15:22.910Z",
                "updatedBy": "bhiaRBrWjFWZPpRapph1m8",
                "createdBy": "bhiaRBrWjFWZPpRapph1m8",
                "_recordId": "5hKpQikudkUzmzZ3DYs8ro",
                "ATX_APPLICATION": "AP",
                "updatedAt": "2022-12-15T10:02:45.058Z",
                "ATX_FIELD_MAPPING_PRIORITY": [
                    {
                        "createdAt": "2022-12-08T09:15:22.955Z",
                        "updatedBy": "bhiaRBrWjFWZPpRapph1m8",
                        "createdBy": "bhiaRBrWjFWZPpRapph1m8",
                        "ATX_PRIORITY": "20",
                        "_recordId": "ks25D64wb5RKHariZu7Kg4",
                        "updatedAt": "2022-12-15T10:02:45.154Z",
                        "ATX_FUSION_FIELD": "ProductCategory",
                        "ATX_FUSION_FIELD_TYPE": "FFLD",
                        "ATX_FUSION_PROP_COLUMN_NAME": "ns:ProductCategory",
                        "ATX_FUSION_FIELD_LEVEL": "",
                        "ATX_REPORT_NAME": ""
                    },
                    {
                        "createdAt": "2022-12-08T09:15:23.044Z",
                        "updatedBy": "bhiaRBrWjFWZPpRapph1m8",
                        "createdBy": "bhiaRBrWjFWZPpRapph1m8",
                        "ATX_PRIORITY": "40",
                        "_recordId": "8CbkH4kzeSxF1W42anMECn",
                        "updatedAt": "2022-12-15T10:02:45.310Z",
                        "ATX_FUSION_FIELD": "ProductFiscClassification",
                        "ATX_FUSION_FIELD_TYPE": "FFLD",
                        "ATX_FUSION_PROP_COLUMN_NAME": "ns:ProductFiscClassification",
                        "ATX_FUSION_FIELD_LEVEL": "",
                        "ATX_REPORT_NAME": ""
                    },
                    {
                        "createdAt": "2022-12-08T09:15:23.030Z",
                        "updatedBy": "bhiaRBrWjFWZPpRapph1m8",
                        "createdBy": "bhiaRBrWjFWZPpRapph1m8",
                        "ATX_PRIORITY": "10",
                        "_recordId": "n2nXV9vMXDZE6JQ7QB57N2",
                        "updatedAt": "2022-12-15T10:02:45.271Z",
                        "ATX_FUSION_FIELD": "ProductCode",
                        "ATX_FUSION_FIELD_TYPE": "FFLD",
                        "ATX_FUSION_PROP_COLUMN_NAME": "ns:ProductCode",
                        "ATX_FUSION_FIELD_LEVEL": "",
                        "ATX_REPORT_NAME": ""
                    },
                    {
                        "createdAt": "2022-12-08T09:15:23.072Z",
                        "updatedBy": "bhiaRBrWjFWZPpRapph1m8",
                        "createdBy": "bhiaRBrWjFWZPpRapph1m8",
                        "ATX_PRIORITY": "50",
                        "_recordId": "opVV3znZv2p5PWVaL6kakr",
                        "updatedAt": "2022-12-15T10:02:45.500Z",
                        "ATX_FUSION_FIELD": "UserDefinedFiscClass",
                        "ATX_FUSION_FIELD_TYPE": "FFLD",
                        "ATX_FUSION_PROP_COLUMN_NAME": "ns:UserDefinedFiscClass",
                        "ATX_FUSION_FIELD_LEVEL": "",
                        "ATX_REPORT_NAME": ""
                    },
                    {
                        "createdAt": "2022-12-08T09:15:23.058Z",
                        "updatedBy": "bhiaRBrWjFWZPpRapph1m8",
                        "createdBy": "bhiaRBrWjFWZPpRapph1m8",
                        "ATX_PRIORITY": "30",
                        "_recordId": "w9AzKFRLFsCh2NL9PQ2GNR",
                        "updatedAt": "2022-12-15T10:02:45.418Z",
                        "ATX_FUSION_FIELD": "PurchasingCategoryID",
                        "ATX_FUSION_FIELD_TYPE": "FFLD",
                        "ATX_FUSION_PROP_COLUMN_NAME": "ns:PurchasingCategoryID",
                        "ATX_FUSION_FIELD_LEVEL": "",
                        "ATX_REPORT_NAME": ""
                    }
                ]
            },
            {
                "ATX_FIELD": "ref1",
                "createdAt": "2022-12-08T09:15:23.881Z",
                "updatedBy": "bhiaRBrWjFWZPpRapph1m8",
                "createdBy": "bhiaRBrWjFWZPpRapph1m8",
                "_recordId": "8aoJGf8ozPUHtz6BysQGxQ",
                "ATX_APPLICATION": "AP",
                "updatedAt": "2022-12-15T10:02:46.756Z",
                "ATX_FIELD_MAPPING_PRIORITY": [
                    {
                        "createdAt": "2022-12-08T09:15:23.923Z",
                        "updatedBy": "bhiaRBrWjFWZPpRapph1m8",
                        "createdBy": "bhiaRBrWjFWZPpRapph1m8",
                        "ATX_PRIORITY": "10",
                        "_recordId": "jjwYQAjKKs31Ax7qCpwuJF",
                        "updatedAt": "2022-12-15T10:02:46.850Z",
                        "ATX_FUSION_FIELD": "ProductType",
                        "ATX_FUSION_FIELD_TYPE": "FFLD",
                        "ATX_FUSION_PROP_COLUMN_NAME": "ns:ProductType",
                        "ATX_FUSION_FIELD_LEVEL": "LINE",
                        "ATX_REPORT_NAME": ""
                    }
                ]
            },
            {
                "ATX_FIELD": "CustomerCode",
                "createdAt": "2022-12-08T09:15:24.769Z",
                "updatedBy": "bhiaRBrWjFWZPpRapph1m8",
                "createdBy": "bhiaRBrWjFWZPpRapph1m8",
                "_recordId": "2QTj8KbeqdRDcff5BpNG8C",
                "ATX_APPLICATION": "AR",
                "updatedAt": "2022-12-15T10:02:48.142Z",
                "ATX_FIELD_MAPPING_PRIORITY": [
                    {
                        "createdAt": "2022-12-08T09:15:24.811Z",
                        "updatedBy": "bhiaRBrWjFWZPpRapph1m8",
                        "createdBy": "bhiaRBrWjFWZPpRapph1m8",
                        "ATX_PRIORITY": "10",
                        "_recordId": "ntaauw52pjTKip5QefgbTB",
                        "updatedAt": "2022-12-15T10:02:48.282Z",
                        "ATX_FUSION_FIELD": "CustomerAccountNumber"
                    }
                ]
            },
            {
                "ATX_FIELD": "ITEMCODE",
                "createdAt": "2022-12-08T09:15:25.650Z",
                "updatedBy": "bhiaRBrWjFWZPpRapph1m8",
                "createdBy": "bhiaRBrWjFWZPpRapph1m8",
                "_recordId": "5Up7QpE18jUuvug2LtFMzr",
                "ATX_APPLICATION": "AR",
                "updatedAt": "2022-12-15T10:02:49.639Z",
                "ATX_FIELD_MAPPING_PRIORITY": [
                    {
                        "createdAt": "2022-12-08T09:15:25.806Z",
                        "updatedBy": "bhiaRBrWjFWZPpRapph1m8",
                        "createdBy": "bhiaRBrWjFWZPpRapph1m8",
                        "ATX_PRIORITY": "30",
                        "_recordId": "jvnUh5KAPUjRSh6jLPYYfY",
                        "updatedAt": "2022-12-15T10:02:49.945Z",
                        "ATX_FUSION_FIELD": "ProductFiscClassification",
                        "ATX_FUSION_FIELD_TYPE": "FFLD",
                        "ATX_FUSION_PROP_COLUMN_NAME": "ns:ProductFiscClassification",
                        "ATX_FUSION_FIELD_LEVEL": "",
                        "ATX_REPORT_NAME": ""
                    },
                    {
                        "createdAt": "2022-12-08T09:15:25.825Z",
                        "updatedBy": "bhiaRBrWjFWZPpRapph1m8",
                        "createdBy": "bhiaRBrWjFWZPpRapph1m8",
                        "ATX_PRIORITY": "40",
                        "_recordId": "kLsNt5dKvbwvbRkVLPxaJU",
                        "updatedAt": "2022-12-15T10:02:50.026Z",
                        "ATX_FUSION_FIELD": "UserDefinedFiscClass",
                        "ATX_FUSION_FIELD_TYPE": "FFLD",
                        "ATX_FUSION_PROP_COLUMN_NAME": "ns:UserDefinedFiscClass",
                        "ATX_FUSION_FIELD_LEVEL": "",
                        "ATX_REPORT_NAME": ""
                    },
                    {
                        "createdAt": "2022-12-08T09:15:25.766Z",
                        "updatedBy": "bhiaRBrWjFWZPpRapph1m8",
                        "createdBy": "bhiaRBrWjFWZPpRapph1m8",
                        "ATX_PRIORITY": "20",
                        "_recordId": "fNQoVsnuHSZaLkhkELy4SQ",
                        "updatedAt": "2022-12-15T10:02:49.866Z",
                        "ATX_FUSION_FIELD": "ProductCategory",
                        "ATX_FUSION_FIELD_TYPE": "FFLD",
                        "ATX_FUSION_PROP_COLUMN_NAME": "ns:ProductCategory",
                        "ATX_FUSION_FIELD_LEVEL": "",
                        "ATX_REPORT_NAME": ""
                    },
                    {
                        "createdAt": "2022-12-08T09:15:25.781Z",
                        "updatedBy": "bhiaRBrWjFWZPpRapph1m8",
                        "createdBy": "bhiaRBrWjFWZPpRapph1m8",
                        "ATX_PRIORITY": "5",
                        "_recordId": "6bjAoAPNesTPxPh4Yp8N83",
                        "updatedAt": "2022-12-15T10:02:49.907Z",
                        "ATX_FUSION_FIELD": "ProductCode",
                        "ATX_FUSION_FIELD_TYPE": "FFLD",
                        "ATX_FUSION_PROP_COLUMN_NAME": "ns:ProductCode",
                        "ATX_FUSION_FIELD_LEVEL": "",
                        "ATX_REPORT_NAME": ""
                    },
                    {
                        "createdAt": "2022-12-14T03:17:00.071Z",
                        "updatedBy": "bhiaRBrWjFWZPpRapph1m8",
                        "createdBy": "bhiaRBrWjFWZPpRapph1m8",
                        "ATX_PRIORITY": "10",
                        "_recordId": "5SFjg78rk3RjiN4fo9ZmSc",
                        "updatedAt": "2022-12-15T10:02:49.747Z",
                        "ATX_FUSION_FIELD": "MemoLineName",
                        "ATX_FUSION_FIELD_TYPE": "FFLD",
                        "ATX_FUSION_PROP_COLUMN_NAME": "ns:MemoLineName",
                        "ATX_FUSION_FIELD_LEVEL": "LINE",
                        "ATX_REPORT_NAME": ""
                    }
                ]
            },
            {
                "ATX_FIELD": "ref1",
                "createdAt": "2022-12-08T09:15:26.686Z",
                "updatedBy": "bhiaRBrWjFWZPpRapph1m8",
                "createdBy": "bhiaRBrWjFWZPpRapph1m8",
                "_recordId": "b6w6R1FtDffUU6bTap3oF4",
                "ATX_APPLICATION": "AR",
                "updatedAt": "2022-12-15T10:02:51.359Z",
                "ATX_FIELD_MAPPING_PRIORITY": [
                    {
                        "createdAt": "2022-12-08T09:15:26.729Z",
                        "updatedBy": "bhiaRBrWjFWZPpRapph1m8",
                        "createdBy": "bhiaRBrWjFWZPpRapph1m8",
                        "ATX_PRIORITY": "1",
                        "_recordId": "vPztRQnLEdx4bwjxQWymgy",
                        "updatedAt": "2022-12-15T10:02:51.463Z",
                        "ATX_FUSION_FIELD": "ProductCategory",
                        "ATX_FUSION_FIELD_TYPE": "FFLD",
                        "ATX_FUSION_PROP_COLUMN_NAME": "ns:ProductCategory",
                        "ATX_FUSION_FIELD_LEVEL": "",
                        "ATX_REPORT_NAME": ""
                    }
                ]
            },
            {
                "ATX_FIELD": "ref2",
                "createdAt": "2022-12-08T09:15:27.576Z",
                "updatedBy": "bhiaRBrWjFWZPpRapph1m8",
                "createdBy": "bhiaRBrWjFWZPpRapph1m8",
                "_recordId": "5FEkxzauB6bKuyCA1jRqFD",
                "ATX_APPLICATION": "AR",
                "updatedAt": "2022-12-15T10:02:52.710Z",
                "ATX_FIELD_MAPPING_PRIORITY": [
                    {
                        "createdAt": "2022-12-14T10:42:17.858Z",
                        "_recordId": "nZerPSdikEr2f2TEdoLj46",
                        "createdBy": "bhiaRBrWjFWZPpRapph1m8",
                        "ATX_PRIORITY": "0",
                        "ATX_FUSION_FIELD": ""
                    }
                ]
            },
            {
                "ATX_FIELD": "revenueAccount",
                "createdAt": "2022-12-08T09:15:28.395Z",
                "updatedBy": "bhiaRBrWjFWZPpRapph1m8",
                "createdBy": "bhiaRBrWjFWZPpRapph1m8",
                "_recordId": "6kZDCgmG854wVY2voSRgVg",
                "ATX_APPLICATION": "AR",
                "updatedAt": "2022-12-14T10:42:19.303Z",
                "ATX_FIELD_MAPPING_PRIORITY": [
                    {
                        "createdAt": "2022-12-08T09:15:28.430Z",
                        "updatedBy": "bhiaRBrWjFWZPpRapph1m8",
                        "createdBy": "bhiaRBrWjFWZPpRapph1m8",
                        "ATX_PRIORITY": "13",
                        "_recordId": "bAJ5punUeQdePNssVgdY98",
                        "updatedAt": "2022-12-14T10:42:19.391Z",
                        "ATX_FUSION_FIELD": "AccountString",
                        "ATX_FUSION_FIELD_TYPE": "FFLD",
                        "ATX_FUSION_PROP_COLUMN_NAME": "ns:AccountString",
                        "ATX_FUSION_FIELD_LEVEL": "",
                        "ATX_REPORT_NAME": ""
                    }
                ]
            },
            {
                "ATX_FIELD": "taxCode",
                "createdAt": "2022-12-08T09:15:29.239Z",
                "updatedBy": "bhiaRBrWjFWZPpRapph1m8",
                "createdBy": "bhiaRBrWjFWZPpRapph1m8",
                "_recordId": "aw579w3Q9YoiNJLSyJPsCF",
                "ATX_APPLICATION": "AR",
                "updatedAt": "2022-12-14T10:42:20.611Z",
                "ATX_FIELD_MAPPING_PRIORITY": [
                    {
                        "createdAt": "2022-12-08T09:15:29.280Z",
                        "updatedBy": "bhiaRBrWjFWZPpRapph1m8",
                        "createdBy": "bhiaRBrWjFWZPpRapph1m8",
                        "ATX_PRIORITY": "10",
                        "_recordId": "q9uzWXm7yTVVWWnaMjVKnV",
                        "updatedAt": "2022-12-14T10:42:20.697Z",
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
                "createdAt": "2022-12-08T09:15:30.120Z",
                "updatedBy": "bhiaRBrWjFWZPpRapph1m8",
                "createdBy": "bhiaRBrWjFWZPpRapph1m8",
                "_recordId": "qNXdQtn9GEKKmhkqXrucPt",
                "ATX_APPLICATION": "ONT",
                "updatedAt": "2022-12-14T10:42:21.917Z",
                "ATX_FIELD_MAPPING_PRIORITY": [
                    {
                        "createdAt": "2022-12-08T09:15:30.154Z",
                        "updatedBy": "bhiaRBrWjFWZPpRapph1m8",
                        "createdBy": "bhiaRBrWjFWZPpRapph1m8",
                        "ATX_PRIORITY": "10",
                        "_recordId": "hgDe3LMWBGsooF8msPWdA2",
                        "updatedAt": "2022-12-14T10:42:22.005Z",
                        "ATX_FUSION_FIELD": "CustomerAccountNumber"
                    }
                ]
            },
            {
                "ATX_FIELD": "ITEMCODE",
                "createdAt": "2022-12-08T09:15:31.008Z",
                "updatedBy": "bhiaRBrWjFWZPpRapph1m8",
                "createdBy": "bhiaRBrWjFWZPpRapph1m8",
                "_recordId": "hx6YZPgumUEvxfxCXkWgv5",
                "ATX_APPLICATION": "ONT",
                "updatedAt": "2022-12-14T10:42:23.339Z",
                "ATX_FIELD_MAPPING_PRIORITY": [
                    {
                        "createdAt": "2022-12-08T09:15:31.180Z",
                        "updatedBy": "bhiaRBrWjFWZPpRapph1m8",
                        "createdBy": "bhiaRBrWjFWZPpRapph1m8",
                        "ATX_PRIORITY": "20",
                        "_recordId": "7AXmmMjxk9uZJVqKCzpnLQ",
                        "updatedAt": "2022-12-14T10:42:23.655Z",
                        "ATX_FUSION_FIELD": "UserDefinedFiscClass",
                        "ATX_FUSION_FIELD_TYPE": "FFLD",
                        "ATX_FUSION_PROP_COLUMN_NAME": "ns:UserDefinedFiscClass",
                        "ATX_FUSION_FIELD_LEVEL": "",
                        "ATX_REPORT_NAME": ""
                    },
                    {
                        "createdAt": "2022-12-08T09:15:31.146Z",
                        "updatedBy": "bhiaRBrWjFWZPpRapph1m8",
                        "createdBy": "bhiaRBrWjFWZPpRapph1m8",
                        "ATX_PRIORITY": "5",
                        "_recordId": "2sn3R5dm2DhbRBCXWUZ9pD",
                        "updatedAt": "2022-12-14T10:42:23.540Z",
                        "ATX_FUSION_FIELD": "ProductCode",
                        "ATX_FUSION_FIELD_TYPE": "FFLD",
                        "ATX_FUSION_PROP_COLUMN_NAME": "ns:ProductCode",
                        "ATX_FUSION_FIELD_LEVEL": "",
                        "ATX_REPORT_NAME": ""
                    },
                    {
                        "createdAt": "2022-12-08T09:15:31.069Z",
                        "updatedBy": "bhiaRBrWjFWZPpRapph1m8",
                        "createdBy": "bhiaRBrWjFWZPpRapph1m8",
                        "ATX_PRIORITY": "30",
                        "_recordId": "4cePnVz2PxTLoFkooku5CX",
                        "updatedAt": "2022-12-14T10:42:23.430Z",
                        "ATX_FUSION_FIELD": "ProductCategory",
                        "ATX_FUSION_FIELD_TYPE": "FFLD",
                        "ATX_FUSION_PROP_COLUMN_NAME": "ns:ProductCategory",
                        "ATX_FUSION_FIELD_LEVEL": "",
                        "ATX_REPORT_NAME": ""
                    },
                    {
                        "createdAt": "2022-12-08T09:15:31.162Z",
                        "updatedBy": "bhiaRBrWjFWZPpRapph1m8",
                        "createdBy": "bhiaRBrWjFWZPpRapph1m8",
                        "ATX_PRIORITY": "10",
                        "_recordId": "8XcvHRDKqyh5F17TWcHjgt",
                        "updatedAt": "2022-12-14T10:42:23.570Z",
                        "ATX_FUSION_FIELD": "ProductFiscClassification",
                        "ATX_FUSION_FIELD_TYPE": "FFLD",
                        "ATX_FUSION_PROP_COLUMN_NAME": "ns:ProductFiscClassification",
                        "ATX_FUSION_FIELD_LEVEL": "",
                        "ATX_REPORT_NAME": ""
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
                "updatedAt": "2022-12-14T10:42:24.933Z",
                "ATX_FIELD_MAPPING_PRIORITY": [
                    {
                        "createdAt": "2022-12-08T09:15:31.983Z",
                        "updatedBy": "bhiaRBrWjFWZPpRapph1m8",
                        "createdBy": "bhiaRBrWjFWZPpRapph1m8",
                        "ATX_PRIORITY": "1",
                        "_recordId": "n9k1JtPdTL3wamLnmUH12H",
                        "updatedAt": "2022-12-14T10:42:25.020Z",
                        "ATX_FUSION_FIELD": "Miscellaneous 2"
                    }
                ]
            },
            {
                "ATX_FIELD": "ref1",
                "createdAt": "2022-12-08T09:15:32.693Z",
                "updatedBy": "bhiaRBrWjFWZPpRapph1m8",
                "createdBy": "bhiaRBrWjFWZPpRapph1m8",
                "_recordId": "bL865PVzuoffJeuGGe6gY2",
                "ATX_APPLICATION": "ONT",
                "updatedAt": "2022-12-14T10:42:26.238Z",
                "ATX_FIELD_MAPPING_PRIORITY": [
                    {
                        "createdAt": "2022-12-08T09:15:32.726Z",
                        "updatedBy": "bhiaRBrWjFWZPpRapph1m8",
                        "createdBy": "bhiaRBrWjFWZPpRapph1m8",
                        "ATX_PRIORITY": "10",
                        "_recordId": "dibJpPiQm5h5omKLrseC9q",
                        "updatedAt": "2022-12-14T10:42:26.325Z",
                        "ATX_FUSION_FIELD": "ProductCategory",
                        "ATX_FUSION_FIELD_TYPE": "FFLD",
                        "ATX_FUSION_PROP_COLUMN_NAME": "ns:ProductCategory",
                        "ATX_FUSION_FIELD_LEVEL": "",
                        "ATX_REPORT_NAME": ""
                    }
                ]
            },
            {
                "ATX_FIELD": "ITEMCODE",
                "createdAt": "2022-12-08T09:15:33.393Z",
                "updatedBy": "bhiaRBrWjFWZPpRapph1m8",
                "createdBy": "bhiaRBrWjFWZPpRapph1m8",
                "_recordId": "dRuLJi8vvpR16PE9Rphrx5",
                "ATX_APPLICATION": "PO",
                "updatedAt": "2022-12-14T10:42:27.582Z",
                "ATX_FIELD_MAPPING_PRIORITY": [
                    {
                        "createdAt": "2022-12-08T09:15:33.426Z",
                        "updatedBy": "bhiaRBrWjFWZPpRapph1m8",
                        "createdBy": "bhiaRBrWjFWZPpRapph1m8",
                        "ATX_PRIORITY": "30",
                        "_recordId": "63kTYMDQoRzE7VLUKzKxx8",
                        "updatedAt": "2022-12-14T10:42:27.670Z",
                        "ATX_FUSION_FIELD": "ProductCategory",
                        "ATX_FUSION_FIELD_TYPE": "FFLD",
                        "ATX_FUSION_PROP_COLUMN_NAME": "ns:ProductCategory",
                        "ATX_FUSION_FIELD_LEVEL": "",
                        "ATX_REPORT_NAME": ""
                    },
                    {
                        "createdAt": "2022-12-08T09:15:33.528Z",
                        "updatedBy": "bhiaRBrWjFWZPpRapph1m8",
                        "createdBy": "bhiaRBrWjFWZPpRapph1m8",
                        "ATX_PRIORITY": "70",
                        "_recordId": "aniZUtuuJzu7xzyhwZyHcB",
                        "updatedAt": "2022-12-14T10:42:27.971Z",
                        "ATX_FUSION_FIELD": "UserDefinedFiscClass",
                        "ATX_FUSION_FIELD_TYPE": "FFLD",
                        "ATX_FUSION_PROP_COLUMN_NAME": "ns:UserDefinedFiscClass",
                        "ATX_FUSION_FIELD_LEVEL": "",
                        "ATX_REPORT_NAME": ""
                    },
                    {
                        "createdAt": "2022-12-08T09:15:33.487Z",
                        "updatedBy": "bhiaRBrWjFWZPpRapph1m8",
                        "createdBy": "bhiaRBrWjFWZPpRapph1m8",
                        "ATX_PRIORITY": "20",
                        "_recordId": "vmTzcN1H2rhK3C6TX7r5PU",
                        "updatedAt": "2022-12-14T10:42:27.786Z",
                        "ATX_FUSION_FIELD": "ProductCode",
                        "ATX_FUSION_FIELD_TYPE": "FFLD",
                        "ATX_FUSION_PROP_COLUMN_NAME": "ns:ProductCode",
                        "ATX_FUSION_FIELD_LEVEL": "",
                        "ATX_REPORT_NAME": ""
                    },
                    {
                        "createdAt": "2022-12-08T09:15:33.515Z",
                        "updatedBy": "bhiaRBrWjFWZPpRapph1m8",
                        "createdBy": "bhiaRBrWjFWZPpRapph1m8",
                        "ATX_PRIORITY": "50",
                        "_recordId": "8fCs4vr1EVihyVQ2Lp2QzE",
                        "updatedAt": "2022-12-14T10:42:27.894Z",
                        "ATX_FUSION_FIELD": "PurchasingCategoryID",
                        "ATX_FUSION_FIELD_TYPE": "FFLD",
                        "ATX_FUSION_PROP_COLUMN_NAME": "ns:PurchasingCategoryID",
                        "ATX_FUSION_FIELD_LEVEL": "",
                        "ATX_REPORT_NAME": ""
                    },
                    {
                        "createdAt": "2022-12-08T09:15:33.501Z",
                        "updatedBy": "bhiaRBrWjFWZPpRapph1m8",
                        "createdBy": "bhiaRBrWjFWZPpRapph1m8",
                        "ATX_PRIORITY": "60",
                        "_recordId": "jUVawaDa5Dk4iXvhDMkjSi",
                        "updatedAt": "2022-12-14T10:42:27.820Z",
                        "ATX_FUSION_FIELD": "ProductFiscClassification",
                        "ATX_FUSION_FIELD_TYPE": "FFLD",
                        "ATX_FUSION_PROP_COLUMN_NAME": "ns:ProductFiscClassification",
                        "ATX_FUSION_FIELD_LEVEL": "",
                        "ATX_REPORT_NAME": ""
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
                "updatedAt": "2022-12-14T10:42:29.635Z"
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
                "updatedAt": "2022-12-14T10:42:31.277Z"
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
                "updatedAt": "2022-12-14T10:42:32.882Z"
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
                "updatedAt": "2022-12-14T10:42:34.544Z"
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
                "updatedAt": "2022-12-14T10:42:36.263Z"
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
                "updatedAt": "2022-12-14T10:42:37.968Z"
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
                "updatedAt": "2022-12-14T10:42:39.593Z"
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
                "updatedAt": "2022-12-14T10:42:41.226Z"
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
                "updatedAt": "2022-12-14T10:42:42.719Z"
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
                "updatedAt": "2022-12-14T10:42:44.108Z"
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
                "updatedAt": "2022-12-14T10:42:45.548Z"
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
                "updatedAt": "2022-12-14T10:42:46.871Z",
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
                "updatedAt": "2022-12-14T10:42:48.238Z"
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
                "updatedAt": "2022-12-14T10:42:49.557Z",
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
                "updatedAt": "2022-12-14T10:42:50.880Z",
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
                "updatedAt": "2022-12-14T10:42:52.175Z",
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
                "updatedAt": "2022-12-14T10:42:53.487Z"
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
                "updatedAt": "2022-12-14T10:42:54.810Z"
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
                "updatedAt": "2022-12-14T10:42:55.983Z"
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
                "updatedAt": "2022-12-14T10:42:57.041Z"
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
                "updatedAt": "2022-12-14T10:42:58.074Z"
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
                "updatedAt": "2022-12-14T10:42:59.156Z",
                "ATX_FUSION_FIELD": ""
            }
        ],
        "ATX_UDF_MAPPING": [
            {
                "ATX_FIELD": "UDF1",
                "createdAt": "2022-12-08T09:15:35.064Z",
                "ATX_DEFAULT_VALUE": "ORACLE",
                "updatedBy": "bhiaRBrWjFWZPpRapph1m8",
                "createdBy": "bhiaRBrWjFWZPpRapph1m8",
                "_recordId": "s1Gc3wkYmZoEoeM552NQjY",
                "ATX_APPLICATION": "AR",
                "updatedAt": "2022-12-14T10:43:00.444Z",
                "ATX_FUSION_FIELD": "OracleSourced",
                "ATX_FUSION_FIELD_TYPE": "FFLD",
                "ATX_FUSION_FIELD_LEVEL": "FFLD",
                "ATX_FUSION_PROP_COLUMN_NAME": "ns:OracleSourced",
                "ATX_REPORT_NAME": ""
            },
            {
                "ATX_FIELD": "UDF2",
                "createdAt": "2022-12-08T09:15:35.939Z",
                "ATX_DEFAULT_VALUE": "",
                "updatedBy": "bhiaRBrWjFWZPpRapph1m8",
                "createdBy": "bhiaRBrWjFWZPpRapph1m8",
                "_recordId": "kaTidpY8aUFjFex6aGmAWm",
                "ATX_APPLICATION": "AR",
                "updatedAt": "2022-12-14T10:43:01.761Z",
                "ATX_FUSION_FIELD": "BusinessSource_Custom",
                "ATX_FUSION_FIELD_TYPE": "AUDF",
                "ATX_FUSION_FIELD_LEVEL": "AUDF",
                "ATX_FUSION_PROP_COLUMN_NAME": "",
                "ATX_REPORT_NAME": ""
            },
            {
                "ATX_FIELD": "UDF8",
                "createdAt": "2022-12-08T09:15:36.779Z",
                "ATX_DEFAULT_VALUE": "",
                "updatedBy": "bhiaRBrWjFWZPpRapph1m8",
                "createdBy": "bhiaRBrWjFWZPpRapph1m8",
                "_recordId": "dbmnwfAJvYoHD6YaXYJDrx",
                "ATX_APPLICATION": "AP",
                "updatedAt": "2022-12-14T10:43:03.037Z",
                "ATX_FUSION_FIELD": "ShipFromPartyName",
                "ATX_FUSION_FIELD_TYPE": "AUDF",
                "ATX_FUSION_FIELD_LEVEL": "AUDF",
                "ATX_FUSION_PROP_COLUMN_NAME": "",
                "ATX_REPORT_NAME": ""
            },
            {
                "ATX_FIELD": "UDF9",
                "createdAt": "2022-12-08T09:15:37.549Z",
                "ATX_DEFAULT_VALUE": "",
                "updatedBy": "bhiaRBrWjFWZPpRapph1m8",
                "createdBy": "bhiaRBrWjFWZPpRapph1m8",
                "_recordId": "iAFVuVqb4gcLeizcCN77b9",
                "ATX_APPLICATION": "AR",
                "updatedAt": "2022-12-14T10:43:04.362Z",
                "ATX_FUSION_FIELD": "ShipToPartyName",
                "ATX_FUSION_FIELD_TYPE": "AUDF",
                "ATX_FUSION_FIELD_LEVEL": "AUDF",
                "ATX_FUSION_PROP_COLUMN_NAME": "",
                "ATX_REPORT_NAME": ""
            },
            {
                "ATX_FIELD": "UDF4",
                "createdAt": "2022-12-08T09:15:38.284Z",
                "ATX_DEFAULT_VALUE": "",
                "updatedBy": "bhiaRBrWjFWZPpRapph1m8",
                "createdBy": "bhiaRBrWjFWZPpRapph1m8",
                "_recordId": "6KCRc53pNUx3KCbtwRJ3dw",
                "ATX_APPLICATION": "AR",
                "updatedAt": "2022-12-14T10:43:05.662Z",
                "ATX_FUSION_FIELD": "MemoLine",
                "ATX_FUSION_FIELD_TYPE": "AUDF",
                "ATX_FUSION_FIELD_LEVEL": "AUDF",
                "ATX_FUSION_PROP_COLUMN_NAME": "",
                "ATX_REPORT_NAME": ""
            },
            {
                "ATX_FIELD": "UDF7",
                "createdAt": "2022-12-08T09:15:39.006Z",
                "ATX_DEFAULT_VALUE": "",
                "updatedBy": "bhiaRBrWjFWZPpRapph1m8",
                "createdBy": "bhiaRBrWjFWZPpRapph1m8",
                "_recordId": "gQb9NnXJEp9av6Exc51vwd",
                "ATX_APPLICATION": "AP",
                "updatedAt": "2022-12-14T10:43:06.978Z",
                "ATX_FUSION_FIELD": "VendorTypeLookupCode",
                "ATX_FUSION_FIELD_TYPE": "FFLD",
                "ATX_FUSION_FIELD_LEVEL": "FFLD",
                "ATX_FUSION_PROP_COLUMN_NAME": "ns:VendorTypeLookupCode",
                "ATX_REPORT_NAME": ""
            },
            {
                "ATX_FIELD": "UDF12",
                "createdAt": "2022-12-08T09:15:39.892Z",
                "ATX_DEFAULT_VALUE": "",
                "updatedBy": "bhiaRBrWjFWZPpRapph1m8",
                "createdBy": "bhiaRBrWjFWZPpRapph1m8",
                "_recordId": "7Te9ATKLS2XpazD5J6U6wv",
                "ATX_APPLICATION": "AP",
                "updatedAt": "2022-12-14T10:43:08.299Z",
                "ATX_FUSION_FIELD": "UserDefinedFiscClass",
                "ATX_FUSION_FIELD_TYPE": "FFLD",
                "ATX_FUSION_FIELD_LEVEL": "FFLD",
                "ATX_FUSION_PROP_COLUMN_NAME": "ns:UserDefinedFiscClass",
                "ATX_REPORT_NAME": ""
            },
            {
                "ATX_FIELD": "UDF3",
                "createdAt": "2022-12-08T09:15:40.830Z",
                "ATX_DEFAULT_VALUE": "",
                "updatedBy": "bhiaRBrWjFWZPpRapph1m8",
                "createdBy": "bhiaRBrWjFWZPpRapph1m8",
                "_recordId": "eKT5SYMtSR8iW69xWg64zK",
                "ATX_APPLICATION": "AR",
                "updatedAt": "2022-12-14T10:43:09.693Z",
                "ATX_FUSION_FIELD": "BillToGeographyValue1",
                "ATX_FUSION_FIELD_TYPE": "FFLD",
                "ATX_FUSION_FIELD_LEVEL": "FFLD",
                "ATX_FUSION_PROP_COLUMN_NAME": "ns:BillToGeographyValue1",
                "ATX_REPORT_NAME": ""
            },
            {
                "ATX_FIELD": "UDF10",
                "createdAt": "2022-12-08T09:15:41.763Z",
                "ATX_DEFAULT_VALUE": "",
                "updatedBy": "bhiaRBrWjFWZPpRapph1m8",
                "createdBy": "bhiaRBrWjFWZPpRapph1m8",
                "_recordId": "pSMud6eotWua4HsXZTdDNb",
                "ATX_APPLICATION": "PO",
                "updatedAt": "2022-12-14T10:43:11.033Z",
                "ATX_FUSION_FIELD": "PurchasingCategoryID",
                "ATX_FUSION_FIELD_TYPE": "AUDF",
                "ATX_FUSION_FIELD_LEVEL": "AUDF",
                "ATX_FUSION_PROP_COLUMN_NAME": "",
                "ATX_REPORT_NAME": ""
            },
            {
                "ATX_FIELD": "UDF10",
                "createdAt": "2022-12-08T09:15:42.724Z",
                "ATX_DEFAULT_VALUE": "",
                "updatedBy": "bhiaRBrWjFWZPpRapph1m8",
                "createdBy": "bhiaRBrWjFWZPpRapph1m8",
                "_recordId": "5EGDqrTB7rSVPyVvvHp8Z5",
                "ATX_APPLICATION": "AP",
                "updatedAt": "2022-12-14T10:43:12.441Z",
                "ATX_FUSION_FIELD": "PurchasingCategoryID",
                "ATX_FUSION_FIELD_TYPE": "FFLD",
                "ATX_FUSION_FIELD_LEVEL": "FFLD",
                "ATX_FUSION_PROP_COLUMN_NAME": "ns:PurchasingCategoryID",
                "ATX_REPORT_NAME": ""
            },
            {
                "ATX_FIELD": "UDF12",
                "createdAt": "2022-12-08T09:15:43.623Z",
                "ATX_DEFAULT_VALUE": "",
                "updatedBy": "bhiaRBrWjFWZPpRapph1m8",
                "createdBy": "bhiaRBrWjFWZPpRapph1m8",
                "_recordId": "nG4ZgDmcGPiDHApq7oc7nM",
                "ATX_APPLICATION": "AR",
                "updatedAt": "2022-12-14T10:43:13.755Z",
                "ATX_FUSION_FIELD": "UserDefinedFiscClass",
                "ATX_FUSION_FIELD_TYPE": "FFLD",
                "ATX_FUSION_FIELD_LEVEL": "FFLD",
                "ATX_FUSION_PROP_COLUMN_NAME": "ns:UserDefinedFiscClass",
                "ATX_REPORT_NAME": ""
            },
            {
                "ATX_FIELD": "UDF11",
                "createdAt": "2022-12-08T09:15:44.599Z",
                "ATX_DEFAULT_VALUE": "",
                "updatedBy": "bhiaRBrWjFWZPpRapph1m8",
                "createdBy": "bhiaRBrWjFWZPpRapph1m8",
                "_recordId": "wF6aKjoZtthX8yfLawfexT",
                "ATX_APPLICATION": "AR",
                "updatedAt": "2022-12-14T10:43:15.152Z",
                "ATX_FUSION_FIELD": "BillToGeographyValue10",
                "ATX_FUSION_FIELD_TYPE": "AUDF",
                "ATX_FUSION_FIELD_LEVEL": "AUDF",
                "ATX_FUSION_PROP_COLUMN_NAME": "",
                "ATX_REPORT_NAME": ""
            },
            {
                "ATX_FIELD": "UDF5",
                "createdAt": "2022-12-08T09:15:45.513Z",
                "ATX_DEFAULT_VALUE": "",
                "updatedBy": "bhiaRBrWjFWZPpRapph1m8",
                "createdBy": "bhiaRBrWjFWZPpRapph1m8",
                "_recordId": "5e28jsR57mCoZH6fqw7Hv3",
                "ATX_APPLICATION": "AP",
                "updatedAt": "2022-12-14T10:43:16.462Z",
                "ATX_FUSION_FIELD": "BillToGeographyValue5",
                "ATX_FUSION_FIELD_TYPE": "FFLD",
                "ATX_FUSION_FIELD_LEVEL": "FFLD",
                "ATX_FUSION_PROP_COLUMN_NAME": "ns:BillToGeographyValue5",
                "ATX_REPORT_NAME": ""
            },
            {
                "ATX_FIELD": "UDF5",
                "createdAt": "2022-12-08T09:15:46.825Z",
                "ATX_DEFAULT_VALUE": "",
                "updatedBy": "bhiaRBrWjFWZPpRapph1m8",
                "createdBy": "bhiaRBrWjFWZPpRapph1m8",
                "_recordId": "jzWJ2ccW47cDo53SXtysyY",
                "ATX_APPLICATION": "AR",
                "updatedAt": "2022-12-14T10:43:17.798Z",
                "ATX_FUSION_FIELD": "BillToGeographyValue5",
                "ATX_FUSION_FIELD_TYPE": "FFLD",
                "ATX_FUSION_FIELD_LEVEL": "FFLD",
                "ATX_FUSION_PROP_COLUMN_NAME": "ns:BillToGeographyValue5",
                "ATX_REPORT_NAME": ""
            },
            {
                "ATX_FIELD": "UDF6",
                "createdAt": "2022-12-08T09:15:47.924Z",
                "ATX_DEFAULT_VALUE": "",
                "updatedBy": "bhiaRBrWjFWZPpRapph1m8",
                "createdBy": "bhiaRBrWjFWZPpRapph1m8",
                "_recordId": "2x7zzy7ZAWf2eDYea5iZK5",
                "ATX_APPLICATION": "AR",
                "updatedAt": "2022-12-14T10:43:19.133Z",
                "ATX_FUSION_FIELD": "FobPoint",
                "ATX_FUSION_FIELD_TYPE": "FFLD",
                "ATX_FUSION_FIELD_LEVEL": "FFLD",
                "ATX_FUSION_PROP_COLUMN_NAME": "ns:FobPoint",
                "ATX_REPORT_NAME": ""
            },
            {
                "ATX_FIELD": "UDF1",
                "createdAt": "2022-12-08T09:15:48.819Z",
                "ATX_DEFAULT_VALUE": "ORACLE",
                "updatedBy": "bhiaRBrWjFWZPpRapph1m8",
                "createdBy": "bhiaRBrWjFWZPpRapph1m8",
                "_recordId": "d3mVyDzwYC6t9BL8wUWB3H",
                "ATX_APPLICATION": "AP",
                "updatedAt": "2022-12-14T10:43:20.444Z",
                "ATX_FUSION_FIELD": "OracleSourced",
                "ATX_FUSION_FIELD_TYPE": "FFLD",
                "ATX_FUSION_FIELD_LEVEL": "FFLD",
                "ATX_FUSION_PROP_COLUMN_NAME": "ns:OracleSourced",
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
                "updatedAt": "2022-12-14T10:43:21.254Z"
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
                "updatedAt": "2022-12-14T10:43:21.767Z"
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
                "updatedAt": "2022-12-14T10:43:22.266Z"
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
                "updatedAt": "2022-12-14T10:43:22.786Z"
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
                "updatedAt": "2022-12-14T10:43:23.288Z"
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
                "updatedAt": "2022-12-14T10:43:23.795Z"
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
                "updatedAt": "2022-12-14T10:43:24.301Z"
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
                "updatedAt": "2022-12-14T10:43:24.804Z"
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
                "updatedAt": "2022-12-14T10:43:25.311Z"
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
                "updatedAt": "2022-12-14T10:43:25.814Z"
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
                "updatedAt": "2022-12-14T10:43:26.315Z"
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
                "updatedAt": "2022-12-14T10:43:26.826Z"
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
                "updatedAt": "2022-12-14T10:43:27.337Z"
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
                "updatedAt": "2022-12-14T10:43:27.864Z"
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
                "updatedAt": "2022-12-14T10:43:28.380Z"
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
                "updatedAt": "2022-12-14T10:43:28.885Z"
            },
            {
                "ATX_CONFIG_CODE_NUMBER_VALUE": "0",
                "ATX_CONFIG_CODE_STRING_VALUE": "",
                "createdAt": "2022-12-08T09:15:55.013Z",
                "ATX_CONFIG_CODE_DATE_VALUE": "",
                "updatedBy": "bhiaRBrWjFWZPpRapph1m8",
                "createdBy": "bhiaRBrWjFWZPpRapph1m8",
                "_recordId": "jvLKBZCXr2RYdNHUW8SYE6",
                "ATX_CONFIG_CODE": "LEGACY_TAX_REGIME_CODE",
                "updatedAt": "2022-12-14T10:43:29.389Z"
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
                "updatedAt": "2022-12-14T10:43:29.898Z"
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
                "updatedAt": "2022-12-14T10:43:30.407Z"
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
                "updatedAt": "2022-12-14T10:43:30.922Z"
            },
            {
                "ATX_CONFIG_CODE_NUMBER_VALUE": "0",
                "ATX_CONFIG_CODE_STRING_VALUE": "Y",
                "createdAt": "2022-12-08T09:15:56.308Z",
                "ATX_CONFIG_CODE_DATE_VALUE": "",
                "updatedBy": "bhiaRBrWjFWZPpRapph1m8",
                "createdBy": "bhiaRBrWjFWZPpRapph1m8",
                "_recordId": "aLrpoeg6CACjNsWa6CsFUN",
                "ATX_CONFIG_CODE": "QUERY_BATCH_FILES_BY_HOUR",
                "updatedAt": "2022-12-14T10:43:31.425Z"
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
                "updatedAt": "2022-12-14T10:43:31.928Z"
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
                "updatedAt": "2022-12-14T10:43:32.434Z"
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
                "updatedAt": "2022-12-14T10:43:32.955Z"
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
                "updatedAt": "2022-12-14T10:43:33.480Z"
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
                "updatedAt": "2022-12-14T10:43:34.512Z"
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
                "updatedAt": "2022-12-14T10:43:35.026Z"
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
                "updatedAt": "2022-12-14T10:43:35.534Z"
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
                "updatedAt": "2022-12-14T10:43:36.045Z"
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
                "updatedAt": "2022-12-14T10:43:33.992Z"
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
        "updatedAt": "2022-12-15T10:02:12.137Z",
        "ATX_COUNTRY": "US"
    },
    "vbtTaxAmtDetails": null,
    "isUS2US": null,
    "isUS2CA": null,
    "isCA2CA": null,
    "isIndia": null,
    "isInternational": true
}

let queryCounter = 1
const sdk = new AppknitSDK(null, null, {
    // @ts-ignore
    adhocDataProvider: {
        queryDataRecords: async (query)=>{
           // console.log(JSON.stringify(query, null, 2))
           
            return [
                {
                    ATX_TAX_CODE: 'NL OUTPUT VAT',
                    ATX_RATE_CODE: 'NL_OUTPUTVAT_STANDARD_RATE',
                    ATX_TAX_STATUS_CODE: 'STANDARD',
                    ATX_JURISDICTION_CODE: '-NETHERLANDS',
                    ATX_PROVIDER_REC_RATE:'0',
                    ATX_PROVIDER_REC_RATE_CODE:'',
                }
            ]
        },
    }
})
extension.flowFunctions.mapToFusionResponse.js(sdk, input).then(result=>console.log(JSON.stringify(result,null,2)))

// extension.flowFunctions.mapFusionSoapRequestV2.js(sdk, {body: triggerBody}).then(result=>console.log(result))