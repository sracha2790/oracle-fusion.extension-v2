import { DocLevelDefinition } from '../batchfile/FileProcessingConfiguration';
import { parse } from 'csv/lib/sync';

export class CsvToDocumentConverter {
  parseCSVWithUpperCaseHeaders = (csvData: string) => {
    const headers = parse(csvData, {
      columns: false,
      toLine: 1,
      delimiter: ',',
    });
    const upperCaseHeaders = headers[0].map((header: string) => header.toUpperCase());
    const records = parse(csvData, {
      columns: upperCaseHeaders,
      fromLine: 2,
      skip_empty_lines: true,
      delimiter: ',',
    });
    return records;
  };

  parseCsvData(csvData: string) {
    let records = parse(csvData, {
      columns: true,
      skip_empty_lines: true,
    });
    return records;
  }

  convertCsvToDocuement(csvData: string) {
    //, levelStructure: DocLevelDefinition
    ////// uncomment and test
    let records = this.parseCsvData(csvData);
    // return [];
    let docs: [] = [];
    for (let row of records) {
      this.createDocument(row, docs);
    }
    return docs;
  }

  createDocument(row, docs: any[]) {
    let matchingDoc;
    for (let doc of docs) {
      if (doc['ns:ApplicationId'] == row['application_id'] && doc['ns:EventClassCode'] == row['event_class_code']) {
        matchingDoc = doc;
        break;
      }
    }
    if (!matchingDoc) {
      matchingDoc = {};
      this.copyHdrValues(matchingDoc, row);
      const tlineWrapper = {};
      matchingDoc['ns:taxableLines'] = tlineWrapper;
      tlineWrapper['ns:TaxableLine'] = [];
      docs.push(matchingDoc);
    }

    const line = {};
    this.createLine(line, row);
    matchingDoc['ns:taxableLines']['ns:TaxableLine'].push(line);
  }

  copyHdrValues(doc, row) {
    doc['ns:ApplicationId'] = row['APPLICATION_ID'];
    doc['ns:ApplicationShortname'] = row['APPLICATION_SHORTNAME'];
    doc['ns:CtrlHdrTxApplFlag'] = row['CTRL_HDR_TX_APPL_FLAG'];
    doc['ns:DefaultTaxationCountry'] = row['DEFAULT_TAXATION_COUNTRY'];
    doc['ns:DocEventStatus'] = row['DOC_EVENT_STATUS'];
    doc['ns:EntityCode'] = row['ENTITY_CODE'];
    doc['ns:EventClassCode'] = row['EVENT_CLASS_CODE'];
    doc['ns:EstablishmentId'] = row['ESTABLISHMENT_ID'];
    doc['ns:EstablishmentNumber'] = row['ESTABLISHMENT_NUMBER'];
    doc['ns:EventClassMappingId'] = row['EVENT_CLASS_MAPPING_ID'];
    doc['ns:EventTypeCode'] = row['EVENT_TYPE_CODE'];
    doc['ns:EndPointUrl'] = row['END_POINT_URL'];
    doc['ns:FirstPtyOrgId'] = row['FIRST_PTY_ORG_ID'];
    doc['ns:FirstPtyRegId'] = row['FIRST_PTY_REG_ID'];
    doc['ns:FirstPtyRegNumber'] = row['FIRST_PTY_REG_NUMBER'];
    doc['ns:HdrTrxUserKey1'] = row['HDR_TRX_USER_KEY1'];
    doc['ns:HistoricalFlag'] = row['HISTORICAL_FLAG'];
    doc['ns:HqEstbPartyTaxProfId'] = row['HQ_ESTB_PARTY_TAX_PROF_ID'];
    doc['ns:InternalOrganizationId'] = row['INTERNAL_ORGANIZATION_ID'];
    doc['ns:LedgerId'] = row['LEDGER_ID'];
    doc['ns:LegalEntityId'] = row['LEGAL_ENTITY_ID'];
    doc['ns:LegalEntityNumber'] = row['LEGAL_ENTITY_NUMBER'];
    doc['ns:LogLevel'] = row['LOG_LEVEL'];
    doc['ns:TrxCurrencyCode'] = row['TRX_CURRENCY_CODE'];
    doc['ns:TrxDate'] = row['TRX_DATE'];
    doc['ns:TrxHeaderAmt'] = row['TRX_HEADER_AMT'];
    doc['ns:TrxId'] = row['TRX_ID'];
    doc['ns:TrxLevelType'] = row['TRX_LEVEL_TYPE'];
    doc['ns:TrxSource'] = row['TRX_SOURCE'];
    doc['ns:TrxNumber'] = row['TRX_NUMBER'];
  }

  createLine(line, row) {
    line['ns:AccountCcid'] = row['ACCOUNT_CCID'];
    line['ns:ApplicationId'] = row['APPLICATION_ID'];
    line['ns:AccountString'] = row['ACCOUNT_STRING'];
    line['ns:AssessableValue'] = row['ASSESSABLE_VALUE'];
    line['ns:AssetFlag'] = row['ASSET_FLAG'];
    line['ns:BillFromGeographyType1'] = row['BILL_FROM_GEOGRAPHY_TYPE1'];
    line['ns:BillFromGeographyType10'] = row['BILL_FROM_GEOGRAPHY_TYPE10'];
    line['ns:BillFromGeographyType2'] = row['BILL_FROM_GEOGRAPHY_TYPE2'];
    line['ns:BillFromGeographyType3'] = row['BILL_FROM_GEOGRAPHY_TYPE3'];
    line['ns:BillFromGeographyType4'] = row['BILL_FROM_GEOGRAPHY_TYPE4'];
    line['ns:BillFromGeographyType5'] = row['BILL_FROM_GEOGRAPHY_TYPE5'];
    line['ns:BillFromGeographyType6'] = row['BILL_FROM_GEOGRAPHY_TYPE6'];
    line['ns:BillFromGeographyType7'] = row['BILL_FROM_GEOGRAPHY_TYPE7'];
    line['ns:BillFromGeographyType8'] = row['BILL_FROM_GEOGRAPHY_TYPE8'];
    line['ns:BillFromGeographyType9'] = row['BILL_FROM_GEOGRAPHY_TYPE9'];
    line['ns:BillFromGeographyValue1'] = row['BILL_FROM_GEOGRAPHY_VALUE1'];
    line['ns:BillFromGeographyValue5'] = row['BILL_FROM_GEOGRAPHY_VALUE5'];
    line['ns:BillFromGeographyValue6'] = row['BILL_FROM_GEOGRAPHY_VALUE6'];
    line['ns:BillFromGeographyValue7'] = row['BILL_FROM_GEOGRAPHY_VALUE7'];
    line['ns:BillFromGeographyValue8'] = row['BILL_FROM_GEOGRAPHY_VALUE8'];
    line['ns:BillFromGeographyValue9'] = row['BILL_FROM_GEOGRAPHY_VALUE9'];
    line['ns:BillFromLocationId'] = row['BILL_FROM_LOCATION_ID'];
    line['ns:BillFromPartyName'] = row['BILL_FROM_PARTY_NAME'];
    line['ns:BillFromPartyNumber'] = row['BILL_FROM_PARTY_NUMBER'];
    line['ns:BillThirdPtyAcctId'] = row['BILL_THIRD_PTY_ACCT_ID'];
    line['ns:BillThirdPtyAcctSiteId'] = row['BILL_THIRD_PTY_ACCT_SITE_ID'];
    line['ns:BillToGeographyType1'] = row['BILL_TO_GEOGRAPHY_TYPE1'];
    line['ns:BillToGeographyType10'] = row['BILL_TO_GEOGRAPHY_TYPE10'];
    line['ns:BillToGeographyType2'] = row['BILL_TO_GEOGRAPHY_TYPE2'];
    line['ns:BillToGeographyType3'] = row['BILL_TO_GEOGRAPHY_TYPE3'];
    line['ns:BillToGeographyType4'] = row['BILL_TO_GEOGRAPHY_TYPE4'];
    line['ns:BillToGeographyType5'] = row['BILL_TO_GEOGRAPHY_TYPE5'];
    line['ns:BillToGeographyType6'] = row['BILL_TO_GEOGRAPHY_TYPE6'];
    line['ns:BillToGeographyType7'] = row['BILL_TO_GEOGRAPHY_TYPE7'];
    line['ns:BillToGeographyType8'] = row['BILL_TO_GEOGRAPHY_TYPE8'];
    line['ns:BillToGeographyType9'] = row['BILL_TO_GEOGRAPHY_TYPE9'];
    line['ns:BillToGeographyValue1'] = row['BILL_TO_GEOGRAPHY_VALUE1'];
    line['ns:BillToGeographyValue5'] = row['BILL_TO_GEOGRAPHY_VALUE5'];
    line['ns:BillToGeographyValue6'] = row['BILL_TO_GEOGRAPHY_VALUE6'];
    line['ns:BillToGeographyValue7'] = row['BILL_TO_GEOGRAPHY_VALUE7'];
    line['ns:BillToGeographyValue8'] = row['BILL_TO_GEOGRAPHY_VALUE8'];
    line['ns:BillToGeographyValue9'] = row['BILL_TO_GEOGRAPHY_VALUE9'];
    line['ns:BillToLocationId'] = row['BILL_TO_LOCATION_ID'];
    line['ns:EntityCode'] = row['ENTITY_CODE'];
    line['ns:EventClassCode'] = row['EVENT_CLASS_CODE'];
    line['ns:LineAmt'] = row['LINE_AMT'];
    line['ns:LineAmtIncludesTaxFlag'] = row['LINE_AMT_INCLUDES_TAX_FLAG'];
    line['ns:LineClass'] = row['LINE_CLASS'];
    line['ns:LineLevelAction'] = row['LINE_LEVEL_ACTION'];
    line['ns:LinesDetFactorId'] = row['LINES_DET_FACTOR_ID'];
    line['ns:MatchType'] = row['MATCH_TYPE'];
    line['ns:MinimumAccountableUnit'] = row['MINIMUM_ACCOUNTABLE_UNIT'];
    line['ns:PoaGeographyType1'] = row['POA_GEOGRAPHY_TYPE1'];
    line['ns:PoaGeographyType10'] = row['POA_GEOGRAPHY_TYPE10'];
    line['ns:PoaGeographyType2'] = row['POA_GEOGRAPHY_TYPE2'];
    line['ns:PoaGeographyType3'] = row['POA_GEOGRAPHY_TYPE3'];
    line['ns:PoaGeographyType4'] = row['POA_GEOGRAPHY_TYPE4'];
    line['ns:PoaGeographyType5'] = row['POA_GEOGRAPHY_TYPE5'];
    line['ns:PoaGeographyType6'] = row['POA_GEOGRAPHY_TYPE6'];
    line['ns:PoaGeographyType7'] = row['POA_GEOGRAPHY_TYPE7'];
    line['ns:PoaGeographyType8'] = row['POA_GEOGRAPHY_TYPE8'];
    line['ns:PoaGeographyType9'] = row['POA_GEOGRAPHY_TYPE9'];
    line['ns:PooGeographyType1'] = row['POO_GEOGRAPHY_TYPE1'];
    line['ns:PooGeographyType10'] = row['POO_GEOGRAPHY_TYPE10'];
    line['ns:PooGeographyType2'] = row['POO_GEOGRAPHY_TYPE2'];
    line['ns:PooGeographyType3'] = row['POO_GEOGRAPHY_TYPE3'];
    line['ns:PooGeographyType4'] = row['POO_GEOGRAPHY_TYPE4'];
    line['ns:PooGeographyType5'] = row['POO_GEOGRAPHY_TYPE5'];
    line['ns:PooGeographyType6'] = row['POO_GEOGRAPHY_TYPE6'];
    line['ns:PooGeographyType7'] = row['POO_GEOGRAPHY_TYPE7'];
    line['ns:PooGeographyType8'] = row['POO_GEOGRAPHY_TYPE8'];
    line['ns:PooGeographyType9'] = row['POO_GEOGRAPHY_TYPE9'];
    line['ns:Precision'] = row['PRECISION'];
    line['ns:PseudoTrxLineFlag'] = row['PSEUDO_TRX_LINE_FLAG'];
    line['ns:ShipFromGeographyType1'] = row['SHIP_FROM_GEOGRAPHY_TYPE1'];
    line['ns:ShipFromGeographyType10'] = row['SHIP_FROM_GEOGRAPHY_TYPE10'];
    line['ns:ShipFromGeographyType2'] = row['SHIP_FROM_GEOGRAPHY_TYPE2'];
    line['ns:ShipFromGeographyType3'] = row['SHIP_FROM_GEOGRAPHY_TYPE3'];
    line['ns:ShipFromGeographyType4'] = row['SHIP_FROM_GEOGRAPHY_TYPE4'];
    line['ns:ShipFromGeographyType5'] = row['SHIP_FROM_GEOGRAPHY_TYPE5'];
    line['ns:ShipFromGeographyType6'] = row['SHIP_FROM_GEOGRAPHY_TYPE6'];
    line['ns:ShipFromGeographyType7'] = row['SHIP_FROM_GEOGRAPHY_TYPE7'];
    line['ns:ShipFromGeographyType8'] = row['SHIP_FROM_GEOGRAPHY_TYPE8'];
    line['ns:ShipFromGeographyType9'] = row['SHIP_FROM_GEOGRAPHY_TYPE9'];
    line['ns:ShipFromGeographyValue1'] = row['SHIP_FROM_GEOGRAPHY_VALUE1'];
    line['ns:ShipFromGeographyValue5'] = row['SHIP_FROM_GEOGRAPHY_VALUE5'];
    line['ns:ShipFromGeographyValue6'] = row['SHIP_FROM_GEOGRAPHY_VALUE6'];
    line['ns:ShipFromGeographyValue7'] = row['SHIP_FROM_GEOGRAPHY_VALUE7'];
    line['ns:ShipFromGeographyValue8'] = row['SHIP_FROM_GEOGRAPHY_VALUE8'];
    line['ns:ShipFromGeographyValue9'] = row['SHIP_FROM_GEOGRAPHY_VALUE9'];
    line['ns:ShipFromLocationId'] = row['SHIP_FROM_LOCATION_ID'];
    line['ns:ShipFromPartyName'] = row['SHIP_FROM_PARTY_NAME'];
    line['ns:ShipFromPartyNumber'] = row['SHIP_FROM_PARTY_NUMBER'];
    line['ns:ShipThirdPtyAcctId'] = row['SHIP_THIRD_PTY_ACCT_ID'];
    line['ns:ShipThirdPtyAcctSiteId'] = row['SHIP_THIRD_PTY_ACCT_SITE_ID'];
    line['ns:ShipToGeographyType1'] = row['SHIP_TO_GEOGRAPHY_TYPE1'];
    line['ns:ShipToGeographyType10'] = row['SHIP_TO_GEOGRAPHY_TYPE10'];
    line['ns:ShipToGeographyType2'] = row['SHIP_TO_GEOGRAPHY_TYPE2'];
    line['ns:ShipToGeographyType3'] = row['SHIP_TO_GEOGRAPHY_TYPE3'];
    line['ns:ShipToGeographyType4'] = row['SHIP_TO_GEOGRAPHY_TYPE4'];
    line['ns:ShipToGeographyType5'] = row['SHIP_TO_GEOGRAPHY_TYPE5'];
    line['ns:ShipToGeographyType6'] = row['SHIP_TO_GEOGRAPHY_TYPE6'];
    line['ns:ShipToGeographyType7'] = row['SHIP_TO_GEOGRAPHY_TYPE7'];
    line['ns:ShipToGeographyType8'] = row['SHIP_TO_GEOGRAPHY_TYPE8'];
    line['ns:ShipToGeographyType9'] = row['SHIP_TO_GEOGRAPHY_TYPE9'];
    line['ns:FinalDischargeGeographyType1'] = row['FINAL_DISCHARGE_GEOGRAPHY_TYPE1'];
    line['ns:FinalDischargeGeographyType10'] = row['FINAL_DISCHARGE_GEOGRAPHY_TYPE10'];
    line['ns:FinalDischargeGeographyType2'] = row['FINAL_DISCHARGE_GEOGRAPHY_TYPE2'];
    line['ns:FinalDischargeGeographyType3'] = row['FINAL_DISCHARGE_GEOGRAPHY_TYPE3'];
    line['ns:FinalDischargeGeographyType4'] = row['FINAL_DISCHARGE_GEOGRAPHY_TYPE4'];
    line['ns:FinalDischargeGeographyType5'] = row['FINAL_DISCHARGE_GEOGRAPHY_TYPE5'];
    line['ns:FinalDischargeGeographyType6'] = row['FINAL_DISCHARGE_GEOGRAPHY_TYPE6'];
    line['ns:FinalDischargeGeographyType7'] = row['FINAL_DISCHARGE_GEOGRAPHY_TYPE7'];
    line['ns:FinalDischargeGeographyType8'] = row['FINAL_DISCHARGE_GEOGRAPHY_TYPE8'];
    line['ns:FinalDischargeGeographyType9'] = row['FINAL_DISCHARGE_GEOGRAPHY_TYPE9'];
    line['ns:TaxProcessingCompletedFlag'] = row['TAX_PROCESSING_COMPLETED_FLAG'];
    line['ns:TaxReportingFlag'] = row['TAX_REPORTING_FLAG'];
    line['ns:TrxBusinessCategory'] = row['TRX_BUSINESS_CATEGORY'];
    line['ns:TrxId'] = row['TRX_ID'];
    line['ns:TrxLineCurrencyCode'] = row['TRX_LINE_CURRENCY_CODE'];
    line['ns:TrxLineDate'] = row['TRX_LINE_DATE'];
    line['ns:TrxLineGlDate'] = row['TRX_LINE_GL_DATE'];
    line['ns:TrxLineId'] = row['TRX_LINE_ID'];
    line['ns:TrxLineMau'] = row['TRX_LINE_MAU'];
    line['ns:TrxLineNumber'] = row['TRX_LINE_NUMBER'];
    line['ns:TrxLinePrecision'] = row['TRX_LINE_PRECISION'];
    line['ns:TrxLineQuantity'] = row['TRX_LINE_QUANTITY'];
    line['ns:TrxLineType'] = row['TRX_LINE_TYPE'];
    line['ns:TrxLevelType'] = row['TRX_LEVEL_TYPE'];
    line['ns:UnitPrice'] = row['UNIT_PRICE'];
  }

  translateDocLevelDefinition(levelDef: DocLevelDefinition) {
    if (levelDef) {
      if (levelDef.levelKeysStr) {
        levelDef.levelKeys = levelDef.levelKeysStr.replace(/\r?\n|\r/g, '').split(',');
        for (let idx = 0; idx < levelDef.levelKeys.length; idx++) {
          levelDef.levelKeys[idx] = levelDef.levelKeys[idx].trim();
        }
      }
      if (levelDef.docKeysStr && levelDef.docKeysStr != '*' && !levelDef.docKeysStr.startsWith('*_')) {
        levelDef.docKeys = levelDef.docKeysStr.replace(/\r?\n|\r/g, '').split(',');
        for (let idx = 0; idx < levelDef.docKeys.length; idx++) {
          levelDef.docKeys[idx] = levelDef.docKeys[idx].trim();
        }
      }
      // Since levelFields comes from the row, no transformation will be done, the docFields will get the transformation
      if (levelDef.levelFieldsStr && levelDef.levelFieldsStr != '*') {
        levelDef.levelFields = levelDef.levelFieldsStr.replace(/\r?\n|\r/g, '').split(',');
        for (let idx = 0; idx < levelDef.levelFields.length; idx++) {
          levelDef.levelFields[idx] = levelDef.levelFields[idx].trim();
        }
      }
      if (levelDef.docFieldsStr && levelDef.docFieldsStr != '*' && !levelDef.docFieldsStr.startsWith('*_')) {
        levelDef.docFields = levelDef.docFieldsStr.replace(/\r?\n|\r/g, '').split(',');
        for (let idx = 0; idx < levelDef.docFields.length; idx++) {
          levelDef.docFields[idx] = levelDef.docFields[idx].trim();
        }
      }
      if (levelDef.childLevels) {
        for (const cl of levelDef.childLevels) {
          this.translateDocLevelDefinition(cl);
        }
      }
    }
  }

  createHierarchy(rows, levelDef: DocLevelDefinition) {
    // this.translateDocLevelDefinition(levelDef);
    let root = {};
    for (let row of rows) {
      this.traverseDocLevel(root, row, levelDef);
    }
    return root;
  }

  traverseDocLevel(parentItem: any, row: any, childLevelStructure: DocLevelDefinition) {
    let children = parentItem[childLevelStructure.name];
    let levelItem;
    if (children && !childLevelStructure.isArray) {
      levelItem = children;
    } else {
      // docKeysStr may need a transformation.
      if (
        !childLevelStructure.levelFields &&
        childLevelStructure.levelFieldsStr &&
        childLevelStructure.levelFieldsStr == '*'
      ) {
        childLevelStructure.levelFields = Object.keys(row);
      }
      const fieldsSize = childLevelStructure.levelFields?.length;
      const keysSize = childLevelStructure.levelKeys?.length;
      let matched = false;

      if (childLevelStructure.isArray) {
        if (!children) {
          children = [];
          levelItem = {};
          parentItem[childLevelStructure.name] = children;
        }
        const childrenCnt = children.length;
        if (keysSize > 0) {
          let docKeys = childLevelStructure.docKeys ? childLevelStructure.docKeys : childLevelStructure.levelKeys;
          for (let chIdx = 0; chIdx < childrenCnt; chIdx++) {
            levelItem = children[chIdx];
            matched = true;
            for (let idx = 0; idx < keysSize; idx++) {
              let key = childLevelStructure.levelKeys[idx];
              if (levelItem[docKeys[idx]] != row[key]) {
                matched = false;
                break;
              }
            }
            if (matched) {
              break;
            }
          }
        }
      } else {
        levelItem = {};
        matched = false;
        parentItem[childLevelStructure.name] = levelItem;
      }
      if (!matched) {
        levelItem = {};
        let docFields = childLevelStructure.docFields;
        if (!docFields) {
          docFields = childLevelStructure.levelFields;
        }
        let docKeys = childLevelStructure.docKeys ? childLevelStructure.docKeys : childLevelStructure.levelKeys;
        for (let idx = 0; idx < keysSize; idx++) {
          let levelKey = childLevelStructure.levelKeys[idx];
          levelItem[docKeys[idx]] = row[levelKey];
        }
        for (let idx = 0; idx < fieldsSize; idx++) {
          levelItem[docFields[idx]] = row[childLevelStructure.levelFields[idx]];
        }
        if (childLevelStructure.isArray) {
          children.push(levelItem);
        }
      }
    }
    let clevels = childLevelStructure.childLevels;
    if (clevels && clevels.length > 0) {
      for (let child of clevels) {
        this.traverseDocLevel(levelItem, row, child);
      }
    }
  }
}
