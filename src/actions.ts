import { AppknitSDK, SdkExecutionError, SdkGenericErrorCodes } from '@appknit-project/appknit-platform-sdk-v2';
import { stringify } from 'csv/lib/sync';
import { CollectOperation, toMappingArray } from './index';
import { DocumentDetails } from './batchfile/DocumentDetails';
import { DocLevelDefinition, FileProcessingConfiguration } from './batchfile/FileProcessingConfiguration';
import { DataMapper } from './connector/dataMapper';
import { ProRateTaxCalculator } from './connector/proRateTaxCalculator';
import { CsvToDocumentConverter } from './convert/CsvToDocumentConverter';
import { DateIntervalUtil } from './utils/dateIntervalUtil';
import { AppknitGraphSDK } from '@appknit-project/common-frameworks';
import { DataMapperV2 } from './connector/dataMapperV2';
import { ResponseBuilderService } from './services/response-builder.service';
import { configurationCodeRecord } from './services/configuration.service';
import { ExtendedFunctionsService } from './services/extended-functions.service';

export const joinValuesAction = (sdk: AppknitSDK | AppknitGraphSDK, configuration: any): Promise<any> => {
  const { values, joiner } = configuration;
  let result = '';
  if (values && values.length > 0) {
    for (let idx = 0; idx < values.length; idx++) {
      if (idx == 0) {
        result = values[idx];
      } else {
        result = result + joiner + values[idx];
      }
    }
  }
  return Promise.resolve(result);
};
export const toURLAction = (sdk: AppknitSDK | AppknitGraphSDK, configuration: any): Promise<any> => {
  const { urlString } = configuration;

  const {
    href,
    origin,
    protocol,
    username,
    password,
    host,
    hostname,
    port,
    pathname,
    search,
    searchParams,
    hash,
  }: URL = new URL(urlString);
  // console.log('URL : ' + { hostname, protocol, host, username, password, pathname, searchParams, href, port, search });
  return Promise.resolve({
    href,
    origin,
    protocol,
    username,
    password,
    host,
    hostname,
    port,
    pathname,
    search,
    searchParams,
    hash,
  });
};
export const mapFusionSoapRequestAction = (sdk: AppknitSDK | AppknitGraphSDK, configuration: any): Promise<any> => {
  const { body } = configuration;
  let mappedData;
  if (body) {
    const mapper = new DataMapper();
    mappedData = mapper.processIncomingSoapRequest(body);
  }
  return Promise.resolve(mappedData);
};

export const mapFusionSoapRequestActionV2 = (sdk: AppknitSDK | AppknitGraphSDK, configuration: any): Promise<any> => {
  const { body } = configuration;
  let mappedData;
  if (body) {
    const mapper = new DataMapperV2();
    mappedData = mapper.processIncomingSoapRequest(body);
  }
  return Promise.resolve(mappedData);
};

export const checkAndProcessVBTDetailsAction = (sdk: AppknitSDK | AppknitGraphSDK, configuration: any): Promise<any> => {
  const { request, configCodes, currentLegalEntity } = configuration;
  let mappedData;

  const mapper = new DataMapperV2();
  mappedData = mapper.checkAndProcessVBTDetails(request, configCodes, currentLegalEntity);

  return Promise.resolve(mappedData);
};

export const mapToFusionResponse = async (sdk: AppknitSDK | AppknitGraphSDK, configuration: any): Promise<any> => {
  const { avaTaxModel, fusionRequest, customerProfile, currentLegalEntity, vbtTaxAmtDetails, isUS2US, isCA2CA, isUS2CA, isIndia, isInternational } = configuration;
  const responseBuilder = new ResponseBuilderService(
    sdk,
    avaTaxModel,
    fusionRequest,
    customerProfile,
    currentLegalEntity,
    isUS2US,
    isCA2CA,
    isUS2CA,
    isIndia,
    isInternational,
  );
  const result = await responseBuilder.createResponse(
    vbtTaxAmtDetails,
  )

  return result;
};

export const addProratedTaxesAsTaxOverrides = async (sdk: AppknitSDK | AppknitGraphSDK, configuration: any): Promise<any> => {
  const { taxOverrides, avalaraDocument, glDate } = configuration;
  const responseBuilder = new ExtendedFunctionsService();
  const result = responseBuilder.addProratedTaxesAsTaxOverrides(
    taxOverrides,
    avalaraDocument,
    glDate,
  );
  return result;
};

export const addCreditMemoLines = async (sdk: AppknitSDK | AppknitGraphSDK, configuration: any): Promise<any> => {
  const { avalaraDocumentLines } = configuration;
  const responseBuilder = new ExtendedFunctionsService();
  const result = responseBuilder.addCreditMemoLines(
    avalaraDocumentLines,
  );
  return result;
};

export const createNoCalculationResponse = async (sdk: AppknitSDK | AppknitGraphSDK, configuration: any): Promise<any> => {
  const { message, fusionRequest } = configuration;
  const responseBuilder = new ResponseBuilderService(
    sdk,
    undefined,
    fusionRequest,
    undefined,
    undefined,
    undefined,
    undefined,
    undefined,
    undefined,
    undefined,
  );
  const result = await responseBuilder.createNoCalculationResponse()

  return result;
};

export const createErrorResponse = async (sdk: AppknitSDK | AppknitGraphSDK, configuration: any): Promise<any> => {
  const { message, fusionRequest } = configuration;
  const responseBuilder = new ResponseBuilderService(
    sdk,
    undefined,
    fusionRequest,
    undefined,
    undefined,
    undefined,
    undefined,
    undefined,
    undefined,
    undefined,
  );
  const result = await responseBuilder.createErrorResponse(message)

  return result;
};

export const filterByUniqueValuesAction = (sdk: AppknitSDK | AppknitGraphSDK, configuration: any): Promise<any> => {
  const { items, uniqueFields, selectBy } = configuration;
  const registry: { [k: string]: any } = {};
  if (items && items['length'] > 0) {
    for (let item of items) {
      let key = '';
      if (!uniqueFields || uniqueFields.length == 0) {
        key = 'und_key';
      } else {
        for (let uf of uniqueFields) {
          key = key + '-:-' + item[uf];
        }
      }
      if (!registry[key]) {
        registry[key] = item;
      } else {
        let selItem = registry[key];
        if (selectBy) {
          for (let sb of selectBy) {
            if (selItem[sb.field] != item[sb.field]) {
              if (sb.criteria == 'MAX') {
                if (item[sb.field] > selItem[sb.field]) {
                  selItem = item;
                  break;
                }
              } else if (sb.criteria == 'MIN') {
                if (item[sb.field] < selItem[sb.field]) {
                  selItem = item;
                  break;
                }
              }
            }
          }
          registry[key] = selItem;
        }
      }
    }
  }
  let results = [];
  for (let prop in registry) {
    results.push(registry[prop]);
  }
  return Promise.resolve(results);
};
export const splitAction = (sdk: AppknitSDK | AppknitGraphSDK, configuration: any): Promise<any> => {
  const { payload, separator } = configuration;
  return Promise.resolve(payload.split(separator));
};
export const splitAllAction = (sdk: AppknitSDK | AppknitGraphSDK, configuration: any): Promise<any> => {
  const { payload, separator } = configuration;
  let results = [];
  for (let str of payload) {
    results.push(str.split(separator));
  }
  return Promise.resolve(results);
};
export const toSeparateCsvsByFieldAction = (sdk: AppknitSDK | AppknitGraphSDK, configuration: any): Promise<any> => {
  const { payload, groupByField, header, columns, columnDelimiter } = configuration;
  let options = {};
  if (header) {
    options['header'] = true;
  }
  if (columns) {
    options['columns'] = columns;
  }
  if (columnDelimiter) {
    options['delimiter'] = columnDelimiter;
  }
  let resultObjects = [];
  if (payload) {
    let registry = {};
    if (groupByField) {
      for (let itm of payload) {
        let itmKey = itm[groupByField];
        let arr = registry[itmKey];
        if (!arr) {
          arr = [];
          registry[itmKey] = arr;
        }
        arr.push(itm);
      }
    } else {
      registry['all'] = payload;
    }
    for (let prop in registry) {
      let result = stringify(registry[prop], options);
      resultObjects.push({ key: prop, csv: result });
    }
  }
  return Promise.resolve(resultObjects);
};
export const toCsvAction = (sdk: AppknitSDK | AppknitGraphSDK, configuration: any): Promise<any> => {
  const { payload, header, columns, columnDelimiter } = configuration;
  let options = {};
  if (header) {
    options['header'] = true;
  }
  if (columns) {
    options['columns'] = columns;
  }
  if (columnDelimiter) {
    options['delimiter'] = columnDelimiter;
  }
  let result = stringify(payload, options);
  return Promise.resolve(result);
};
export const joinMapAction = (sdk: AppknitSDK | AppknitGraphSDK, configuration: any): Promise<any> => {
  const { items, join, mapWith, mapEmptyJoin } = configuration;
  let combinedResults = [];
  const itemsArray = Array.isArray(items) ? items : [items];

  for (let item of itemsArray) {
    let joinItems = join.itemsPath ? item[join.itemsPath] : item;
    let mapWithItems = item[mapWith.itemsPath];

    let joinNestedItems;
    if (joinItems) {
      joinNestedItems = joinItems[join.nestedPath];
      if (!joinNestedItems) {
        joinNestedItems = [];
      }
    }
    let mapWithNestedItems;
    if (mapWithItems) {
      mapWithNestedItems = mapWithItems[mapWith.nestedPath];
      if (!mapWithNestedItems) {
        mapWithNestedItems = [];
      }
    }
    let result = [];
    if (!joinNestedItems && !mapWithNestedItems) {
    } else if (!joinNestedItems) {
      if (mapEmptyJoin) {
        for (let mni of mapWithNestedItems) {
          let record = {};
          record[mapWith.setToField] = mni;
          result.push(record);
        }
      }
    } else if (!mapWithNestedItems) {
      for (let jni of joinNestedItems) {
        let record = {};
        record[join.setToField] = jni;
        result.push(record);
      }
    } else {
      for (let jni of joinNestedItems) {
        let hasMatch = false;
        for (let mni of mapWithNestedItems) {
          if (jni[join.mapByField] == mni[mapWith.mapByField]) {
            let record = {};
            record[join.setToField] = jni;
            record[mapWith.setToField] = mni;
            result.push(record);
            hasMatch = true;
          }
        }
        if (!hasMatch) {
          let record = {};
          record[join.setToField] = jni;
          result.push(record);
        }
      }
    }
    combinedResults.push(result);
  }
  const results = Array.isArray(items) ? combinedResults : combinedResults[0];
  console.log('Returning ', results);
  return Promise.resolve(results);
};
export const replaceByLookupAction = (sdk: AppknitSDK | AppknitGraphSDK, configuration: any): Promise<any> => {
  const { items, lookups, replace } = configuration;
  let result = items;
  if (items && lookups && replace) {
    for (let item of items) {
      for (let rep of replace) {
        // console.log(field l+ ' : ' + item[field]);
        let citem = item;
        if (rep.itemPath && rep.itemPath.trim() != '.') {
          if (rep.itemPath.includes('.')) {
            let path = rep.itemPath.split('.');
            // console.log(path);
            for (let p of path) {
              citem = citem[p];
              if (!citem) {
                // console.log('!citem ' + p);
                break;
              }
            }
          } else {
            citem = citem[rep.itemPath];
          }
        }
        if (citem) {
          let citemArr = citem;
          if (!Array.isArray(citem)) {
            citemArr = [citem];
          }
          for (let arrItem of citemArr) {
            for (let cfield of rep.fields) {
              if (arrItem[cfield]) {
                for (let kv of lookups.values) {
                  if (arrItem[cfield] == kv[lookups.key]) {
                    arrItem[cfield] = kv[lookups.value];
                  }
                }
                // arrItem[cfield]=lookups[];
              }
            }
          }
        }
      }
    }
  }
  return Promise.resolve(result);
};
export const uniqueValuesFromFieldsAction = (sdk: AppknitSDK | AppknitGraphSDK, configuration: any): Promise<any> => {
  const { items, fields, childItems } = configuration;
  const result = [];
  for (let item of items) {
    if (fields) {
      for (let field of fields) {
        console.log(field + ' : ' + item[field]);
        if (item[field] && result.indexOf(item[field] < 0)) {
          result.push(item[field]);
        }
      }
    }
    if (childItems) {
      for (let child of childItems) {
        if (child.fields) {
          let citem = item;
          if (child.name.includes('.')) {
            let path = child.name.split('.');
            console.log(path);
            for (let p of path) {
              citem = citem[p];
              if (!citem) {
                // console.log('!citem ' + p);
                break;
              }
            }
          }
          if (citem) {
            let citemArr = citem;
            if (!Array.isArray(citem)) {
              citemArr = [citem];
            }
            for (let arrItem of citemArr) {
              for (let cfield of child.fields) {
                if (arrItem[cfield] && result.indexOf(arrItem[cfield] < 0)) {
                  result.push(arrItem[cfield]);
                }
              }
            }
          }
        }
      }
    }
  }
  return Promise.resolve(result);
};
export const setCombinedFieldValuesAction = (sdk: AppknitSDK | AppknitGraphSDK, configuration: any): Promise<any> => {
  const { items, subPath, setToField, defaultVal, joiner, fields } = configuration;
  if (items) {
    let path;
    if (subPath && subPath.trim() != '.') {
      if (subPath.includes('.')) {
        path = subPath.split('.');
      } else {
        path = [subPath];
      }
    }
    for (let item of items) {
      let refObj = item;
      if (path) {
        for (let p of path) {
          refObj = refObj[p];
          if (!refObj) {
            // console.log('!citem ' + p);
            break;
          }
        }
      }
      if (refObj) {
        let refObjArr;
        if (Array.isArray(refObj)) {
          refObjArr = refObj;
        } else {
          refObjArr = [refObj];
        }
        for (let roItem of refObjArr) {
          let strVal = '';
          for (let idx = 0; idx < fields.length; idx++) {
            let val = roItem[fields[idx]];
            if (val || val == 0 || defaultVal) {
              if (!val && val != 0) {
                val = defaultVal;
              }
              if (joiner && idx > 0) {
                strVal = strVal + joiner + val;
              } else {
                strVal = strVal + val;
              }
            }
          }
          roItem[setToField] = strVal;
        }
      }
    }
  }
  return Promise.resolve(items);
};
export const getIntervalTimesAction = async (sdk: AppknitSDK | AppknitGraphSDK, configuration: any): Promise<any> => {
  const { last, dtPattern, interval, period, prior, future, combinedTenth } = configuration;
  let dateSuffixes = await new DateIntervalUtil().getIntervalTimes(
    last,
    dtPattern,
    interval,
    period,
    prior,
    future,
    combinedTenth,
  );
  return Promise.resolve(dateSuffixes);
};
export const convertToDocumentAction = (sdk: AppknitSDK | AppknitGraphSDK, configuration: any): Promise<any> => {
  let { data, docLevels } = configuration;
  let csvDocBuilder = new CsvToDocumentConverter();
  let csvDataJson = csvDocBuilder.parseCSVWithUpperCaseHeaders(data);
  // console.group('csvDataJson : ', csvDataJson);
  let doc;
  if (docLevels) {
    csvDocBuilder.translateDocLevelDefinition(docLevels);
    let root = csvDocBuilder.createHierarchy(csvDataJson, docLevels);
    doc = root[docLevels.name];
    // console.log('DOC : ' + JSON.stringify(doc, null, 2));
  }
  if (!doc) {
    if (docLevels) {
      if (docLevels.isArray) {
        doc = [];
      } else {
        doc = {};
      }
    } else {
      doc = {};
    }
  }
  return Promise.resolve(doc);
};
export const convertToDocumentsAction = (sdk: AppknitSDK | AppknitGraphSDK, configuration: any): Promise<any> => {
  const { documentDetails, processingConfig } = configuration;

  let configLen = processingConfig.length;
  // @TODO: remove this if block after missing functions are added to AppknitGraphSDK

  if (sdk instanceof AppknitGraphSDK) {
    throw new SdkExecutionError(SdkGenericErrorCodes.invalidArgument, 'Invalid SDK');
  }
  let mappedDocs = {};
  let csvDocBuilder;
  let regExps = [];
  for (let idx = 0; idx < configLen; idx++) {
    let pconfig = processingConfig[idx];
    if (!mappedDocs[pconfig.mappingName]) {
      mappedDocs[pconfig.mappingName] = [];
    }
    regExps[idx] = new RegExp(pconfig.fileNamePattern);
    if (processingConfig[idx].contentType == 'csv') {
      if (!csvDocBuilder) {
        csvDocBuilder = new CsvToDocumentConverter();
      }
      if (processingConfig[idx].docLevels) {
        csvDocBuilder.translateDocLevelDefinition(processingConfig[idx].docLevels);
      }
    }
  }

  const defProConfig: FileProcessingConfiguration = {
    fileNamePattern: '*',
    mappingName: 'unmapped',
    contentType: 'text',
  };
  mappedDocs[defProConfig.mappingName] = [];

  for (let docDet of documentDetails) {
    if (docDet.fileContents) {
      for (let fileContent of docDet.fileContents) {
        // Find which processingConfig to use depending on the name pattern
        let proConfig: FileProcessingConfiguration;
        for (let idx = 0; idx < configLen; idx++) {
          if (fileContent.fileName.match(regExps[idx])) {
            proConfig = processingConfig[idx];
            break;
          }
        }
        if (!proConfig) {
          proConfig = defProConfig;
        }
        let minLen = proConfig.minLength ? proConfig.minLength : 0;
        if (fileContent.fileData.trim().length > minLen) {
          if (proConfig.contentType == 'csv') {
            if (!fileContent.fileName.endsWith('.csv')) {
              fileContent.documents = [];
              continue;
            }
            let csvDataJson = csvDocBuilder.parseCSVWithUpperCaseHeaders(fileContent.fileData);
            if (proConfig.docLevelid) {
              // Fetch the docLevel json and parse it and use it as DocLevelDef
              let docLevelDefs = {};
              let root = csvDocBuilder.createHierarchy(csvDataJson, docLevelDefs);
              fileContent.documents = root[docLevelDefs['name']];
            } else if (proConfig.docLevels) {
              let root = csvDocBuilder.createHierarchy(csvDataJson, proConfig.docLevels);
              fileContent.documents = root[proConfig.docLevels.name];
            } else {
              fileContent.documents = [csvDataJson];
            }
          } else {
            let fileDocs = [];
            fileContent.documents = fileDocs;
            if (proConfig.contentType == 'xml') {
              fileDocs.push(sdk.serialization.xml.parse(fileContent.fileData));
            } else if (proConfig.contentType == 'json') {
              fileDocs.push(sdk.serialization.json.parse(fileContent.fileData));
            } else {
              fileDocs.push(fileContent.fileData);
            }
          }
        }
        if (fileContent.documents) {
          if (Array.isArray(fileContent.documents)) {
            for (let data of fileContent.documents) {
              if (Array.isArray(data)) {
                for (let dataDoc of data) {
                  if (typeof data == 'object' && typeof data != 'string') {
                    dataDoc['UCM_DocumentName'] = docDet.DocumentName;
                    dataDoc['UCM_DocumentId'] = docDet.DocumentId;
                    dataDoc['UCM_fileName'] = fileContent.fileName;
                  }
                  mappedDocs[proConfig.mappingName].push(dataDoc);
                }
              } else {
                if (typeof data == 'object' && typeof data != 'string') {
                  data['UCM_DocumentName'] = docDet.DocumentName;
                  data['UCM_DocumentId'] = docDet.DocumentId;
                  data['UCM_fileName'] = fileContent.fileName;
                }
                mappedDocs[proConfig.mappingName].push(data);
              }
            }
          } else {
            // ? This wont happen since the [csvDataJson] wrapping is there now for csv docs without docleveldefinition
            let data = {};
            data['UCM_DocumentName'] = docDet.DocumentName;
            data['UCM_DocumentId'] = docDet.DocumentId;
            data['UCM_fileName'] = fileContent.fileName;
            data['UCM_SingleDoc'] = 'SINGLEDOC';
            mappedDocs[proConfig.mappingName].push(data);
          }
        }
        // mappedDocs[proConfig.mappingName].push({
        //   DocumentName: docDet.DocumentName,
        //   DocumentId: docDet.DocumentId,
        //   fileName: fileContent.fileName,
        //   data: fileContent.documents,
        // });
      }
    } else {
      if (docDet.Content) {
        let contentDocuments = [];
        docDet.contentDocuments = contentDocuments;
        let proConfig: FileProcessingConfiguration;
        for (let idx = 0; idx < configLen; idx++) {
          if (docDet.DocumentName.match(regExps[idx])) {
            proConfig = processingConfig[idx];
            break;
          }
        }
        if (!proConfig) {
          proConfig = defProConfig;
        }
        let minLen = proConfig.minLength ? proConfig.minLength : 0;
        if (docDet.Content.length > minLen) {
          if (proConfig.contentType == 'csv') {
            let csvDataJson = csvDocBuilder.parseCSVWithUpperCaseHeaders(docDet.Content.toString());
            if (proConfig.docLevelid) {
              // Fetch the docLevel json and parse it and use it as DocLevelDef
              let docLevelDefs = {};
              let root = csvDocBuilder.createHierarchy(csvDataJson, docLevelDefs);
              contentDocuments = root[docLevelDefs['name']];
            } else if (proConfig.docLevels) {
              let root = csvDocBuilder.createHierarchy(csvDataJson, proConfig.docLevels);
              contentDocuments = root[proConfig.docLevels.name];
            } else {
              contentDocuments = [csvDataJson];
            }
          } else {
            if (proConfig.contentType == 'xml') {
              contentDocuments.push(sdk.serialization.xml.parse(docDet.Content.toString()));
            } else if (proConfig.contentType == 'json') {
              contentDocuments.push(sdk.serialization.json.parse(docDet.Content.toString()));
            } else {
              contentDocuments.push(docDet.Content.toString());
            }
          }
        }
        mappedDocs[proConfig.mappingName].push(docDet);
      }
    }
  }

  return Promise.resolve(mappedDocs);
};
export const groupByToObjectsAction = (sdk: AppknitSDK | AppknitGraphSDK, configuration: any): Promise<any> => {
  const { items, groupByField } = configuration;
  let result = [];
  if (items) {
    let registry = {};
    if (groupByField) {
      for (let itm of items) {
        let itmKey = itm[groupByField];
        let arr = registry[itmKey];
        if (!arr) {
          arr = [];
          registry[itmKey] = arr;
        }
        arr.push(itm);
      }
    }
    for (let prop in registry) {
      result.push({ key: prop, values: registry[prop] });
    }
  }
  return Promise.resolve(result);
};
export const groupByAction = (sdk: AppknitSDK | AppknitGraphSDK, configuration: any): Promise<any> => {
  const { items, groupByFields, aggregations } = configuration;

  let aggregatedGroups = [];

  const groupObj = {};

  if (items) {
    if (groupByFields) {
      let gfSize = groupByFields.length;

      for (let itm of items) {
        let itmKey = itm[groupByFields[0]];
        for (let idx = 1; idx < gfSize; idx++) {
          itmKey += '}{' + itm[groupByFields[idx]];
        }
        if (!groupObj[itmKey]) {
          const obj = Object.assign({}, itm);
          groupObj[itmKey] = obj;
          aggregatedGroups.push(obj);
        } else {
          const exist = groupObj[itmKey];
          for (let aggr of aggregations) {
            if (itm[aggr.field]) {
              if (exist[aggr.field]) {
                exist[aggr.field] += itm[aggr.field];
              } else {
                exist[aggr.field] = itm[aggr.field];
              }
            }
          }
        }
      }
    }
  }

  return Promise.resolve(aggregatedGroups);
};
export const mergeToItemsAction = (sdk: AppknitSDK | AppknitGraphSDK, configuration: any): Promise<any> => {
  const { mergeTo, mergeItems, matchFields, copyFields, levels } = configuration;
  for (let obj of mergeTo) {
    let matchingItem;
    for (let incoming of mergeItems) {
      // ! NOTE :- Leaving match fields empty will lead to copying all copyFields
      let found = true;
      if (matchFields) {
        for (let mf of matchFields) {
          if (obj[mf[0]] != incoming[mf[1]]) {
            found = false;
            break;
          }
        }
      }
      // ! NOTE :- Leaving match fields empty will lead to copying all copyFields
      if (found) {
        matchingItem = incoming;
        for (let cpf of copyFields) {
          obj[cpf] = matchingItem[cpf];
        }
        break;
      }
    }
    if (matchingItem) {
      if (levels) {
        let mergeToParent = obj;
        let mergingParent = matchingItem;
        for (let level of levels) {
          let mergeToLevelItems = mergeToParent[level.item];
          let mergingLevelItems;
          if (level.merge) {
            mergingLevelItems = mergingParent[level.merge];
          } else {
            mergingLevelItems = mergingParent;
          }
          if (!mergeToLevelItems || !mergingLevelItems) {
            break;
          }
          if (!Array.isArray(mergeToLevelItems)) {
            mergeToLevelItems = [mergeToLevelItems];
          }
          if (!Array.isArray(mergingLevelItems)) {
            mergeToLevelItems = [mergingLevelItems];
          }
          for (let mergeObj of mergeToLevelItems) {
            for (let mergingObj of mergingLevelItems) {
              // ! NOTE :- Leaving match fields empty will lead to copying all copyFields
              let found = true;
              if (level.matchFields) {
                for (let mf of level.matchFields) {
                  if (mergeObj[mf[0]] != mergingObj[mf[1]]) {
                    found = false;
                    break;
                  }
                }
              }
              // ! NOTE :- Leaving match fields empty will lead to copying all copyFields
              if (found) {
                for (let cpf of level.copyFields) {
                  mergeObj[cpf] = mergingObj[cpf];
                }
                mergeToParent = mergeObj;
                mergingParent = mergingObj;
                break;
              }
            }
          }
        }
      }
    }
  }
  return mergeTo;
};
export const filterItemsWithPropertyMatchingAction = (
  sdk: AppknitSDK | AppknitGraphSDK,
  configuration: any,
): Promise<any> => {
  const { items, filterField, filterValues } = configuration;
  let result = [];
  let found = false;
  const values = filterValues;

  let path;
  let field;
  if (filterField.includes('.')) {
    let fullPath = filterField.split('.');
    path = fullPath.slice(0, fullPath.length - 1);
    field = fullPath[fullPath.length - 1];
  } else {
    field = filterField;
  }
  for (const item of items) {
    let refObj = item;
    if (path && path.length > 0) {
      for (let p of path) {
        refObj = item[p];
        if (!refObj) {
          break;
        }
      }
    }
    if (refObj) {
      let refObjArr;
      if (Array.isArray(refObj)) {
        refObjArr = refObj;
      } else {
        refObjArr = [refObj];
      }
      let match = false;
      for (let refObjItem of refObjArr) {
        for (let idx = 0; idx < values.length; idx++) {
          if (refObjItem[field] == values[idx]) {
            match = true;
            break;
          }
        }
      }
      if (match) {
        found = true;
        result.push(item);
      }
    }
  }
  return Promise.resolve({ found, result });
};
export const flattenHierarchyToMapAction = (sdk: AppknitSDK | AppknitGraphSDK, configuration: any): Promise<any> => {
  const { items, itemName, arrayPropertyPath, arrayItemName } = configuration;
  const pathArr = arrayPropertyPath.split('/');
  const result = [];
  for (const item of items) {
    let refObj = item;
    let found = false;
    for (const path of pathArr) {
      if (!refObj) {
        found = false;
        break;
      }
      refObj = refObj[path];
      found = true;
    }
    if (found) {
      if (Array.isArray(refObj)) {
        for (let refObjItem of refObj) {
          let obj = {};
          obj[itemName] = item;
          obj[arrayItemName] = refObjItem;
          result.push(obj);
        }
      } else {
        let obj = {};
        obj[itemName] = item;
        obj[arrayItemName] = refObj;
        result.push(obj);
      }
    }
  }
  return Promise.resolve(result);
};
export const combineArraysAction = (sdk: AppknitSDK | AppknitGraphSDK, configuration: any): Promise<any> => {
  const { items } = configuration;
  let result = [].concat.apply([], items);
  return Promise.resolve(result.filter(n => n !== null && n !== undefined));
};
export const separateItemsByConditionAction = (sdk: AppknitSDK | AppknitGraphSDK, configuration: any): Promise<any> => {
  const { items, condition } = configuration;
  //***** Each condition is done in a separate loop to avoid the if/switch for comaprison operation inside the loop *****/
  //***** This may not be optimal when multiple conditions need to be specified *****/
  //* TODO : Implement all the comparisons */
  let matching = [];
  let nonMatching = [];
  if (condition.comparison == '==') {
    for (const item of items) {
      if (item[condition.field] == condition.value) {
        matching.push(item);
      } else {
        nonMatching.push(item);
      }
    }
  } else if (condition.comparison == '===') {
    for (const item of items) {
      if (item[condition.field] && condition.value && item[condition.field] === condition.value) {
        matching.push(item);
      } else {
        nonMatching.push(item);
      }
    }
  } else if (condition.comparison == '!=') {
    for (const item of items) {
      if (item[condition.field] && condition.value && item[condition.field] != condition.value) {
        matching.push(item);
      } else {
        nonMatching.push(item);
      }
    }
  } else if (condition.comparison == '!==') {
    for (const item of items) {
      if (item[condition.field] && condition.value && item[condition.field] !== condition.value) {
        matching.push(item);
      } else {
        nonMatching.push(item);
      }
    }
  } else if (condition.comparison == 'startsWith') {
    for (const item of items) {
      if (item[condition.field].startsWith(condition.value)) {
        matching.push(item);
      } else {
        nonMatching.push(item);
      }
    }
  } else if (condition.comparison == 'endsWith') {
    for (const item of items) {
      if (item[condition.field].endsWith(condition.value)) {
        matching.push(item);
      } else {
        nonMatching.push(item);
      }
    }
  } else if (condition.comparison == 'contains') {
    for (const item of items) {
      if (item[condition.field].contains(condition.value)) {
        matching.push(item);
      } else {
        nonMatching.push(item);
      }
    }
  } else if (condition.comparison == '>') {
    for (const item of items) {
      if (item[condition.field] && condition.value && item[condition.field] > condition.value) {
        matching.push(item);
      } else {
        nonMatching.push(item);
      }
    }
  } else if (condition.comparison == '<') {
    for (const item of items) {
      if (item[condition.field] && condition.value && item[condition.field] < condition.value) {
        matching.push(item);
      } else {
        nonMatching.push(item);
      }
    }
  } else if (condition.comparison == '<=') {
    for (const item of items) {
      if (item[condition.field] && condition.value && item[condition.field] <= condition.value) {
        matching.push(item);
      } else {
        nonMatching.push(item);
      }
    }
  } else if (condition.comparison == '>=') {
    for (const item of items) {
      if (item[condition.field] && condition.value && item[condition.field] >= condition.value) {
        matching.push(item);
      } else {
        nonMatching.push(item);
      }
    }
  }
  return Promise.resolve({ matching, nonMatching });
};
export const excludeItemsByConditionAction = (sdk: AppknitSDK | AppknitGraphSDK, configuration: any): Promise<any> => {
  const { items, condition } = configuration;

  let result = [];
  if (condition.comparison == '==') {
    for (const item of items) {
      if (!(item[condition.field] == condition.value)) {
        result.push(item);
      }
    }
  } else if (condition.comparison == '===') {
    for (const item of items) {
      if (item[condition.field] && condition.value && item[condition.field] === condition.value) {
      } else {
        result.push(item);
      }
    }
  } else if (condition.comparison == '!=') {
    for (const item of items) {
      if (item[condition.field] && condition.value && item[condition.field] != condition.value) {
      } else {
        result.push(item);
      }
    }
  } else if (condition.comparison == '!==') {
    for (const item of items) {
      if (item[condition.field] && condition.value && item[condition.field] !== condition.value) {
      } else {
        result.push(item);
      }
    }
  } else if (condition.comparison == 'startsWith') {
    for (const item of items) {
      if (!item[condition.field].startsWith(condition.value)) {
        result.push(item);
      }
    }
  } else if (condition.comparison == 'endsWith') {
    for (const item of items) {
      if (!item[condition.field].endsWith(condition.value)) {
        result.push(item);
      }
    }
  } else if (condition.comparison == 'contains') {
    for (const item of items) {
      if (!item[condition.field].contains(condition.value)) {
        result.push(item);
      }
    }
  } else if (condition.comparison == '>') {
    for (const item of items) {
      if (item[condition.field] && condition.value && item[condition.field] > condition.value) {
      } else {
        result.push(item);
      }
    }
  } else if (condition.comparison == '<') {
    for (const item of items) {
      if (item[condition.field] && condition.value && item[condition.field] < condition.value) {
      } else {
        result.push(item);
      }
    }
  } else if (condition.comparison == '<=') {
    for (const item of items) {
      if (item[condition.field] && condition.value && item[condition.field] <= condition.value) {
      } else {
        result.push(item);
      }
    }
  } else if (condition.comparison == '>=') {
    for (const item of items) {
      if (item[condition.field] && condition.value && item[condition.field] >= condition.value) {
      } else {
        result.push(item);
      }
    }
  }
  return Promise.resolve(result);
};
export const filterMatchShallowCopyAction = (sdk: AppknitSDK | AppknitGraphSDK, configuration: any): Promise<any> => {
  const { items, filterFields, filterValues } = configuration;

  const fields = filterFields.split(',');
  const values = filterValues.split(',');
  let result = [];
  for (const item of items) {
    let match = true;
    for (let idx = 0; idx < values.length; idx++) {
      if (item[fields[idx]] != values[idx]) {
        match = false;
        break;
      }
    }
    if (match) {
      result.push(Object.assign({}, item));
    }
  }
  return Promise.resolve(result);
};
export const filterMatchAction = (sdk: AppknitSDK | AppknitGraphSDK, configuration: any): Promise<any> => {
  const { items, filterFields, filterValues } = configuration;

  const fields = filterFields.split(',');
  const values = filterValues.split(',');
  let result = [];
  for (const item of items) {
    let match = true;
    for (let idx = 0; idx < values.length; idx++) {
      if (item[fields[idx]] != values[idx]) {
        match = false;
        break;
      }
    }
    if (match) {
      result.push(item);
    }
  }
  return Promise.resolve(result);
};
export const proRateTaxesAction = (sdk: AppknitSDK | AppknitGraphSDK, configuration: any): Promise<any> => {
  const { apSelfAssesTaxFlag, vendorBilledTax, taxedLines, apTolerances } = configuration;

  ////////////////////////////////////////////////////////////////////
  // Calculate proRateTaxes by ProRateTaxCalculator
  //
  ///////////////////////////////////////////////////////////////////

  const proRateCalculator = new ProRateTaxCalculator();
  let taxOverRideDtls = proRateCalculator.calculateProRateTax(
    apSelfAssesTaxFlag,
    vendorBilledTax,
    taxedLines,
    apTolerances.tolerancePct,
    apTolerances.toleranceAmt,
  );

  return Promise.resolve(taxOverRideDtls);
};
export const createDetailTaxLinesAction = (sdk: AppknitSDK | AppknitGraphSDK, configuration: any): Promise<any> => {
  const { lineTaxAndDetail, commonValues, fieldsMapping } = configuration;

  const tlColMap = toMappingArray(
    fieldsMapping.taxableLineMapping,
    fieldsMapping.columnSeparator,
    fieldsMapping.mappingSeparator,
  );

  const dtlColMap = toMappingArray(
    fieldsMapping.detailTaxLineMapping,
    fieldsMapping.columnSeparator,
    fieldsMapping.mappingSeparator,
  );

  const ltColMap = toMappingArray(
    fieldsMapping.lineTaxesMapping,
    fieldsMapping.columnSeparator,
    fieldsMapping.mappingSeparator,
  );

  const tdColMap = toMappingArray(
    fieldsMapping.taxDetailsMaping,
    fieldsMapping.columnSeparator,
    fieldsMapping.mappingSeparator,
  );
  const cvColMap = toMappingArray(
    fieldsMapping.commonValuesMaping,
    fieldsMapping.columnSeparator,
    fieldsMapping.mappingSeparator,
  );

  const detTaxLines = [];
  const wrapper = {};
  for (const combo of lineTaxAndDetail) {
    for (const taxDet of combo.taxDetails) {
      const detTaxLine = {};
      detTaxLines.push(detTaxLine);

      if (combo.line) {
        for (const dtc of tlColMap) {
          detTaxLine[dtc[0]] = combo.line[dtc[1]];
        }
      }
      if (combo.dtl) {
        for (const dtc of dtlColMap) {
          detTaxLine[dtc[0]] = combo.dtl[dtc[1]];
        }
      }
      if (combo.taxedLine) {
        for (const dtc of ltColMap) {
          detTaxLine[dtc[0]] = combo.taxedLine[dtc[1]];
        }
      }
      if (combo.taxDetails) {
        for (const dtc of tdColMap) {
          detTaxLine[dtc[0]] = taxDet[dtc[1]];
        }
      }
      if (commonValues) {
        for (const dtc of cvColMap) {
          detTaxLine[dtc[0]] = commonValues[dtc[1]];
        }
      }
      if (taxDet.jurisdiction) {
        // detTaxLine['ns:TaxJurisdictionCode'] = (taxDet.jurisdiction['JurisPrefix'] ? taxDet.jurisdiction['JurisPrefix'] : '') + taxDet.jurisdiction['JurisCode'];
        detTaxLine['ns:TaxJurisdictionCode'] = 'USTJ7' + taxDet.jurisdiction['JurisCode'];
        detTaxLine['ns:TaxStatusCode'] = taxDet.jurisdiction['RateCode'];
      }
    }
  }
  wrapper['ns:DetailTaxLines'] = detTaxLines;
  return Promise.resolve(wrapper);
};
export const collectAction = (sdk: AppknitSDK | AppknitGraphSDK, configuration: any): Promise<any> => {
  const { argument, operation, defaultValue } = configuration;

  let collector = defaultValue ? defaultValue : 0;

  if (Array.isArray(argument)) {
    for (const item of argument) {
      if (typeof item !== 'number') {
        console.log('item is not of type `number`', {
          item,
          type: typeof item,
        });

        continue;
      }

      if (operation === CollectOperation.plus) {
        collector += item;
      } else if (operation === CollectOperation.minus) {
        collector -= item;
      } else {
        console.error('Unknown operation', {
          operation,
        });
      }

      console.log('Collector is updated', {
        collector,
        operation,
        item,
      });
    }
  } else {
    console.log('Argument is not array');
  }

  return Promise.resolve(collector);
};
export const storeAction = (sdk: AppknitSDK | AppknitGraphSDK, configuration: any): Promise<any> => {
  const { data } = configuration;

  return Promise.resolve(data);
};
export const createObjectAction = (sdk: AppknitSDK | AppknitGraphSDK, configuration: any): Promise<any> => {
  const { data } = configuration;
  const madeObj = {};
  return Promise.resolve(madeObj);
};
export const createArrayAction = (sdk: AppknitSDK | AppknitGraphSDK, configuration: any): Promise<any> => {
  const { data } = configuration;
  const madeArray = [];
  return Promise.resolve(madeArray);
};
export const createNewObjectToArrayAction = (sdk: AppknitSDK | AppknitGraphSDK, configuration: any): Promise<any> => {
  const { objects } = configuration;
  const addObject = {};
  objects.push(addObject);
  return Promise.resolve(objects);
};
export const pushObjectToArrayAction = (sdk: AppknitSDK | AppknitGraphSDK, configuration: any): Promise<any> => {
  const { item, objects } = configuration;
  objects.push(item);
  return Promise.resolve(objects);
};
export const appendAction = (sdk: AppknitSDK | AppknitGraphSDK, configuration: any): Promise<any> => {
  const { first, second, joiner } = configuration;

  return Promise.resolve(first + joiner + second);
};
export const sumAllAction = (sdk: AppknitSDK | AppknitGraphSDK, configuration: any): Promise<any> => {
  const { items, fields, separator } = configuration;
  const fieldsArr = fields.split(separator);
  const faLen = fieldsArr.length;
  const result = [];
  for (let i = 0; i < faLen; i++) {
    result[i] = 0;
  }
  for (const item of items) {
    for (let i = 0; i < faLen; i++) {
      if (item[fieldsArr[i]]) {
        result[i] = result[i] + item[fieldsArr[i]];
      }
    }
  }
  return Promise.resolve(result);
};
export const matchAction = (sdk: AppknitSDK | AppknitGraphSDK, configuration: any): Promise<any> => {
  const { values, mapping } = configuration;

  let value: string = null;
  let max = 0;
  const vlen = values.length;
  let matches = false;
  for (const row of mapping) {
    max = row.length < vlen ? row.length : vlen;
    for (let i = 0; i < max; i++) {
      matches = false;
      if (row[i] === '*') {
        matches = true;
        continue;
      }
      const rval = row[i].split('|');
      for (const mval of rval) {
        if (values[i] === mval) {
          matches = true;
          break;
        }
      }
      if (!matches) {
        break;
      }
    }
    if (matches) {
      value = row[row.length - 1];
      break;
    }
  }
  return Promise.resolve(value);
  // return Promise.resolve(configuration);
};
export const matchCombinationAction = (sdk: AppknitSDK | AppknitGraphSDK, configuration: any): Promise<any> => {
  const { values, mapping, defVal } = configuration;
  const rowsStr = mapping.split('//');
  const rows = [];
  for (let row of rowsStr) {
    rows.push(row.split(','));
  }
  let value: string = defVal;
  let max = 0;
  const vlen = values.length;
  let matches = false;
  for (const row of rows) {
    max = row.length - 1 < vlen ? row.length - 1 : vlen;
    for (let i = 0; i < max; i++) {
      matches = false;
      if (row[i] === '*') {
        matches = true;
        continue;
      }
      const rval = row[i].split('|');
      for (const mval of rval) {
        if (values[i] === mval) {
          matches = true;
          break;
        }
      }
      if (!matches) {
        break;
      }
    }
    if (matches) {
      value = row[row.length - 1];
      break;
    }
  }
  return Promise.resolve(value);
};
export const fieldValuesAction = (sdk: AppknitSDK | AppknitGraphSDK, configuration: any): Promise<any> => {
  const { fieldNames, item } = configuration;
  const result = [];
  const fnArray = fieldNames.split(',');
  for (const fn of fnArray) {
    result.push(item[fn]);
  }
  return Promise.resolve(result);
  // return Promise.resolve(configuration);
};
export const setPropertyAction = (sdk: AppknitSDK | AppknitGraphSDK, configuration: any): Promise<any> => {
  const { setTo, fieldName, item } = configuration;
  setTo[fieldName] = item;
  return Promise.resolve(setTo);
  // return Promise.resolve(configuration);
};
export const setPropertiesAction = (sdk: AppknitSDK | AppknitGraphSDK, configuration: any): Promise<any> => {
  const { setTo, values } = configuration;
  for (let setVal of values) {
    let item = setTo;
    let fieldName = setVal.path;
    if (setVal.path.includes('.')) {
      let fullPath = setVal.path.split('.');
      fieldName = fullPath[fullPath.length - 1];
      let path = fullPath.slice(0, fullPath.length - 1);
      for (let p of path) {
        item = item[p];
        if (!item) {
          break;
        }
      }
    }
    if (item) {
      item[fieldName] = setVal.value;
    }
  }
  return Promise.resolve(setTo);
};
export const setReferenceToAction = (sdk: AppknitSDK | AppknitGraphSDK, configuration: any): Promise<any> => {
  const { items, propertyName, setTo } = configuration;
  for (const item of items) {
    item[setTo] = item[propertyName];
  }
  return Promise.resolve(items);
};
export const setValuesToItemsAction = (sdk: AppknitSDK | AppknitGraphSDK, configuration: any): Promise<any> => {
  const { items, setValues: references } = configuration;
  for (const item of items) {
    for (let ref of references) {
      if (ref.setValue) {
        item[ref.setTo] = ref.setValue;
      } else if (ref.propertyName) {
        item[ref.setTo] = item[ref.propertyName];
      }
    }
  }
  return Promise.resolve(items);
};
export const copyValueToNestedAction = (sdk: AppknitSDK | AppknitGraphSDK, configuration: any): Promise<any> => {
  const { items, propertyPath, copyValues } = configuration;
  if (items) {
    if (propertyPath && propertyPath.includes('.')) {
    }
    const pathArr = propertyPath.split('.');
    for (const item of items) {
      let refObj = item;
      for (const path of pathArr) {
        refObj = refObj[path];
        if (!refObj) {
          break;
        }
      }
      if (refObj) {
        if (Array.isArray(refObj)) {
          for (let robj of refObj) {
            for (let cv of copyValues) {
              robj[cv.setTo] = item[cv.setFrom];
            }
          }
        } else {
          for (let cv of copyValues) {
            refObj[cv.setTo] = item[cv.setFrom];
          }
        }
      }
    }
  }
  return Promise.resolve(items);
};
export const pullUpAndSetReferenceToAction = (sdk: AppknitSDK | AppknitGraphSDK, configuration: any): Promise<any> => {
  const { items, propertyPath, setTo } = configuration;
  if (items) {
    const pathArr = propertyPath.split('/');
    for (const item of items) {
      let refObj = item;
      let found = false;
      for (const path of pathArr) {
        if (!refObj) {
          found = false;
          break;
        }
        refObj = refObj[path];
        found = true;
      }
      if (found) {
        item[setTo] = refObj;
      }
    }
  }
  return Promise.resolve(items);
};
export const cloneAndExecuteForEachAction = (sdk: AppknitSDK | AppknitGraphSDK, configuration: any): Promise<any> => {
  const { items, operations } = configuration;
  let result = [];
  if (items) {
    let fn = [];
    for (let index = 0; index < operations.length; index++) {
      fn[index] = new Function('obj', '{' + operations[index] + '; }');
    }
    for (let obj of items) {
      const cloned = Object.assign({}, obj);
      for (let func of fn) {
        func(cloned);
      }
      result.push(cloned);
    }
  }
  return Promise.resolve({ found: result.length > 0, result });
};
export const executeForEachAction = (sdk: AppknitSDK | AppknitGraphSDK, configuration: any): Promise<any> => {
  const { items, operations } = configuration;
  if (items) {
    let fn = [];
    for (let index = 0; index < operations.length; index++) {
      fn[index] = new Function('obj', '{' + operations[index] + '; }');
    }
    for (let obj of items) {
      for (let func of fn) {
        func(obj);
      }
    }
  }
  return Promise.resolve({ found: items && items.length > 0, result: items });
};
export const findItemsWithFieldValuesAction = (sdk: AppknitSDK | AppknitGraphSDK, configuration: any): Promise<any> => {
  const { items, matchFields } = configuration;

  let result = [];

  for (let obj of items) {
    let matches = true;
    for (let mf of matchFields) {
      if (obj[mf.field] !== mf.value) {
        matches = false;
        break;
      }
    }
    if (matches) {
      result.push(obj);
    }
  }
  return Promise.resolve(result);
};
export const findItemsWithFieldValuesMatchingAction = (
  sdk: AppknitSDK | AppknitGraphSDK,
  configuration: any,
): Promise<any> => {
  const { items, matchFields } = configuration;

  let result = [];

  for (let obj of items) {
    let matches = true;
    for (let i = 0; i < matchFields.length; i++) {
      if (obj[matchFields[i][0]] !== matchFields[i][1]) {
        matches = false;
        break;
      }
    }
    if (matches) {
      result.push(obj);
    }
  }
  return Promise.resolve(result);
};
export const findMatchAction = (sdk: AppknitSDK | AppknitGraphSDK, configuration: any): Promise<any> => {
  const { source, sourceFields, rawValues, checkObjects, matchFields, matchVal, noMatchVal } = configuration;

  const sfArr = sourceFields.split(',');
  let compareValues = [];

  for (let i = 0; i < sfArr.length; i++) {
    compareValues.push(source[sfArr[i]]);
  }
  if (rawValues) {
    const rowValsArr = rawValues.split(',');
    for (let i = 0; i < rowValsArr.length; i++) {
      compareValues.push(rowValsArr[i]);
    }
  }

  let result = noMatchVal;
  let found = false;
  const matchArr = matchFields.split(',');
  for (let obj of checkObjects) {
    let matches = true;
    for (let i = 0; i < matchArr.length; i++) {
      if (compareValues[i] !== obj[matchArr[i]]) {
        matches = false;
        break;
      }
    }
    if (matches) {
      result = matchVal;
      break;
    }
  }
  return Promise.resolve(result);
};
export const findMatchingObjectAction = (sdk: AppknitSDK | AppknitGraphSDK, configuration: any): Promise<any> => {
  const { source, sourceFields, checkObjects, matchFields } = configuration;
  let found = false;
  let result;
  if (checkObjects) {
    const sfArr = sourceFields.split(',');
    let sourceVals = [];

    for (let i = 0; i < sfArr.length; i++) {
      sourceVals.push(source[sfArr[i]]);
    }
    const matchArr = matchFields.split(',');
    for (let obj of checkObjects) {
      let matches = true;
      for (let i = 0; i < matchArr.length; i++) {
        if (sourceVals[i] !== obj[matchArr[i]]) {
          matches = false;
          break;
        }
      }
      if (matches) {
        result = obj;
        found = true;
        break;
      }
    }
  }
  return Promise.resolve({ found, result });
};
export const findWithPrefernceAction = (sdk: AppknitSDK | AppknitGraphSDK, configuration: any): Promise<any> => {
  const { fields, objects } = configuration;

  let result = null;
  let found = false;
  let matchingItem = null;
  if (objects) {
    const arr = fields.split(',');
    for (let i = 0; i < arr.length; i++) {
      for (const item of objects) {
        if (item[arr[i]]) {
          found = true;
          matchingItem = item;
          result = item[arr[i]];
          break;
        }
      }
      if (result) {
        break;
      }
    }
  }
  return Promise.resolve({ found, result, matchingItem });
};
export const findWithPrefernceOrDefaultAction = (
  sdk: AppknitSDK | AppknitGraphSDK,
  configuration: any,
): Promise<any> => {
  const { fields, objects, defaultVal } = configuration;
  let result = null;
  let found = false;
  let matchingItem = null;
  if (objects) {
    const arr = fields.split(',');
    for (let i = 0; i < arr.length; i++) {
      for (const item of objects) {
        if (item[arr[i]]) {
          result = item[arr[i]];
          found = true;
          matchingItem = item;
          break;
        }
      }
      if (result) {
        break;
      }
    }
    if (!result) {
      result = defaultVal;
    }
  }
  return Promise.resolve({ found, result, matchingItem });
};
export const mapNestedAction = (sdk: AppknitSDK | AppknitGraphSDK, configuration: any): Promise<any> => {
  const { items, mapping } = configuration;
  let combinedResults = [];
  let subMappings = [];
  for (let item of items) {
    for (let mapConf of mapping) {
      if (item[mapConf.itemsPath] && item[mapConf.itemsPath][mapConf.nestedPath]) {
        let arr = item[mapConf.itemsPath][mapConf.nestedPath];
        if (arr) {
          subMappings.push({ items: arr, mapByField: mapConf.mapByField, setToField: mapConf.setToField });
        }
      } else {
        subMappings.push({ items: [], mapByField: mapConf.mapByField, setToField: mapConf.setToField });
      }
    }

    const registry: { [k: string]: {} } = {};

    for (const mappingItem of subMappings) {
      for (const object of mappingItem.items) {
        if (registry.hasOwnProperty(object[mappingItem.mapByField])) {
          registry[object[mappingItem.mapByField]][mappingItem.setToField] = object;
        } else {
          registry[object[mappingItem.mapByField]] = {
            [mappingItem.setToField]: object,
          };
        }
      }
    }
    let result = [];
    for (const key of Object.keys(registry)) {
      result.push(registry[key]);
    }
    combinedResults.push(result);
  }

  return Promise.resolve(combinedResults);
};
export const mapToMapAction = (sdk: AppknitSDK | AppknitGraphSDK, configuration: any): Promise<any> => {
  const { addToMap, mapByField, objects, setToField, refObject, refProperty } = configuration;
  if (addToMap && objects) {
    for (const mappingItem of addToMap) {
      const ref = mappingItem[refObject];
      if (ref) {
        const val = ref[refProperty];
        if (val) {
          for (const object of objects) {
            if (object[mapByField] == val) {
              mappingItem[setToField] = object;
              break;
            }
          }
        }
      }
    }
  }
  return Promise.resolve(addToMap);
};
export const copyProperties1Action = (sdk: AppknitSDK | AppknitGraphSDK, configuration: any): Promise<any> => {
  const { source, destination, fieldsMapping, rowSeparator, columnSeparator } = configuration;

  const rows = fieldsMapping.split(rowSeparator);
  for (const row of rows) {
    const cols = row.split(columnSeparator);
    destination[cols[1]] = source[cols[0]];
  }
  return Promise.resolve(destination);
};
export const copyPropertiesToItemsAction = (sdk: AppknitSDK | AppknitGraphSDK, configuration: any): Promise<any> => {
  const { source, destination, fieldsMapping, rowSeparator, columnSeparator } = configuration;

  const rows = fieldsMapping.split(rowSeparator);
  for (const row of rows) {
    const cols = row.split(columnSeparator);
    destination[cols[1]] = source[cols[0]];
  }
  return Promise.resolve(destination);
};
export const copyPropertiesAction = (sdk: AppknitSDK | AppknitGraphSDK, configuration: any): Promise<any> => {
  const { mapping } = configuration;

  for (const fieldMap of mapping.fieldsMapping) {
    mapping.destination[fieldMap[1]] = mapping.source[fieldMap[0]];
  }
  return Promise.resolve(mapping.destination);
};
export const createDetailTaxLineAction = (sdk: AppknitSDK | AppknitGraphSDK, configuration: any): Promise<any> => {
  const {
    taxableLine,
    detailLinesArray,
    internalOrganizationId,
    legalEntityId,
    errorMessageTypeFlag,
    errorString,
  } = configuration;
  const detailTaxLine = {};
  detailTaxLine['ErrorMessageTypeFlag'] = errorMessageTypeFlag;
  detailTaxLine['ErrorString'] = errorString;

  detailTaxLine['ApplicationId'] = taxableLine['ns:ApplicationId'];
  detailTaxLine['EntityCode'] = taxableLine['ns:EntityCode'];
  detailTaxLine['EventClassCode'] = taxableLine['ns:EventClassCode'];
  detailTaxLine['LineAmt'] = taxableLine['ns:LineAmt'];
  detailTaxLine['TrxId'] = taxableLine['ns:TrxId'];
  detailTaxLine['TrxCurrencyCode'] = taxableLine['ns:TrxCurrencyCode'];
  detailTaxLine['TrxLineId'] = taxableLine['ns:TrxLineId'];
  detailTaxLine['TrxLineNumber'] = taxableLine['ns:TrxLineNumber'];
  detailTaxLine['TrxLevelType'] = taxableLine['ns:TrxLevelType'];

  detailTaxLine['ns:InternalOrganizationId '] = internalOrganizationId;
  detailTaxLine['ns:LegalEntityId '] = legalEntityId;
  detailTaxLine['LinesDetFactorId '] = taxableLine['ns:LinesDetFactorId '];

  detailLinesArray.push(detailTaxLine);

  return Promise.resolve(detailTaxLine);
};
export const createDetailTaxLinesNoTaxAction = (
  sdk: AppknitSDK | AppknitGraphSDK,
  configuration: any,
): Promise<any> => {
  const { taxableLines, internalOrganizationId, legalEntityId, errorMessageTypeFlag, errorString } = configuration;
  const detailTaxLines = [];
  for (const inputLine of taxableLines) {
    const detailTaxLine = {};
    detailTaxLine['ns:ErrorMessageTypeFlag'] = errorMessageTypeFlag;
    detailTaxLine['ns:ErrorString'] = errorString;

    detailTaxLine['ns:ApplicationId'] = inputLine['ns:ApplicationId'];
    detailTaxLine['ns:EntityCode'] = inputLine['ns:EntityCode'];
    detailTaxLine['ns:EventClassCode'] = inputLine['ns:EventClassCode'];
    detailTaxLine['ns:LineAmt'] = inputLine['ns:LineAmt'];
    detailTaxLine['ns:TrxId'] = inputLine['ns:TrxId'];
    detailTaxLine['ns:TrxCurrencyCode'] = inputLine['ns:TrxCurrencyCode'];
    detailTaxLine['ns:TrxLineId'] = inputLine['ns:TrxLineId'];
    detailTaxLine['ns:TrxLineNumber'] = inputLine['ns:TrxLineNumber'];
    detailTaxLine['ns:TrxLevelType'] = inputLine['ns:TrxLevelType'];

    detailTaxLine['ns:InternalOrganizationId '] = internalOrganizationId;
    detailTaxLine['ns:LegalEntityId '] = legalEntityId;
    detailTaxLine['ns:LinesDetFactorId '] = inputLine['ns:LinesDetFactorId'];
    detailTaxLines.push(detailTaxLine);
  }
  return Promise.resolve(detailTaxLines);
};
export const convertToXMLResponseAction = (sdk: AppknitSDK | AppknitGraphSDK, configuration: any): Promise<any> => {
  // @TODO: remove this if block after missing functions are added to AppknitGraphSDK

  if (sdk instanceof AppknitGraphSDK) {
    throw new SdkExecutionError(SdkGenericErrorCodes.invalidArgument, 'Invalid SDK');
  }
  const { data } = configuration;
  const xml = sdk.serialization.xml.stringify(data);
  return Promise.resolve(data);
};
export const parseXMLAction = (sdk: AppknitSDK | AppknitGraphSDK, configuration: any): Promise<any> => {
  // @TODO: remove this if block after missing functions are added to AppknitGraphSDK

  if (sdk instanceof AppknitGraphSDK) {
    throw new SdkExecutionError(SdkGenericErrorCodes.invalidArgument, 'Invalid SDK');
  }
  const { data } = configuration;
  const json = sdk.serialization.xml.parse(data);
  return Promise.resolve(json);
};
export const convertToXmlActions = (sdk: AppknitSDK | AppknitGraphSDK, configuration: any): Promise<any> => {
  // @TODO: remove this if block after missing functions are added to AppknitGraphSDK

  if (sdk instanceof AppknitGraphSDK) {
    throw new SdkExecutionError(SdkGenericErrorCodes.invalidArgument, 'Invalid SDK');
  }
  const { jsonData } = configuration;
  const xmlData = sdk.serialization.xml.stringify(jsonData);
  return Promise.resolve(xmlData);
};
