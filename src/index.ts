import { ProRateTaxDetailModel } from './openapimodels/ProRateTaxDetailModel';
import { DetailTaxLineModel } from './openapimodels/DetailTaxLineModel';
import * as packageJson from '../package.json';
import {  SdkExtension } from '@appknit-io/common-frameworks';
import { 
  appendAction, 
  cloneAndExecuteForEachAction, 
  collectAction, 
  combineArraysAction, 
  convertToDocumentAction, 
  convertToDocumentsAction, 
  convertToXmlActions, 
  convertToXMLResponseAction, 
  copyProperties1Action, 
  copyPropertiesAction, 
  copyPropertiesToItemsAction, 
  copyValueToNestedAction, 
  createArrayAction, 
  createDetailTaxLineAction, 
  createDetailTaxLinesAction, 
  createDetailTaxLinesNoTaxAction, 
  createNewObjectToArrayAction, 
  createObjectAction, 
  excludeItemsByConditionAction, 
  executeForEachAction, 
  fieldValuesAction, 
  filterByUniqueValuesAction, 
  filterItemsWithPropertyMatchingAction, 
  filterMatchAction, 
  filterMatchShallowCopyAction, 
  findItemsWithFieldValuesAction, 
  findItemsWithFieldValuesMatchingAction, 
  findMatchAction, 
  findMatchingObjectAction, 
  findWithPrefernceAction, 
  findWithPrefernceOrDefaultAction, 
  flattenHierarchyToMapAction, 
  getIntervalTimesAction, 
  groupByAction, 
  groupByToObjectsAction, 
  joinMapAction, 
  joinValuesAction, 
  mapFusionSoapRequestAction, 
  mapNestedAction, 
  mapToMapAction, 
  matchAction, 
  matchCombinationAction, 
  mergeToItemsAction, 
  parseXMLAction, 
  proRateTaxesAction, 
  pullUpAndSetReferenceToAction, 
  pushObjectToArrayAction, 
  replaceByLookupAction, 
  separateItemsByConditionAction, 
  setCombinedFieldValuesAction, 
  setPropertiesAction, 
  setPropertyAction, 
  setReferenceToAction, 
  setValuesToItemsAction, 
  splitAction, 
  splitAllAction, 
  storeAction, 
  sumAllAction, 
  toCsvAction, 
  toSeparateCsvsByFieldAction, 
  toURLAction, 
  uniqueValuesFromFieldsAction
 } from './actions';

const httpMethods = ['GET', 'POST', 'PUT', 'DELETE', 'PATCH', 'HEAD', 'TRACE', 'OPTIONS', 'CONNECT'];
export enum CollectOperation {
  minus = 'MINUS',
  plus = 'PLUS',
}

export const toMappingArray = (arrayStr: string, colSeparator: string, mapSeparator: string): Array<string> => {
  const colMap = [];
  if (arrayStr) {
    const cols = arrayStr.split(colSeparator);
    for (const col of cols) {
      const map = col.split(mapSeparator);
      if (map.length == 1) {
        colMap.push([map[0], map[0]]);
      } else {
        colMap.push(map);
      }
    }
  }
  return colMap;
}


const extension: SdkExtension = {
  name: 'oracle-fusion.extension-v2',
  websiteUrl: '',
  documentationUrl: '',
  iconUrl: '',
  description: 'Oracle Fusion Tax Partner API Extension - Listener for Tax Calls from Fusion',
  longDescription: 'Oracle Fusion Tax Partner API Extension - Listener for Tax Calls from Fusion',
  version: packageJson.version,
  platformVersion: packageJson.dependencies['@appknit-io/common-frameworks'],
  releaseChanges: 'Created extension',
  flowFunctions: {
    joinValues: {
      description: 'Join the string values together with joiner',
      longDescription: '',
      inputSchema: {
        type: 'object',
        properties: {
          values: {
            title: 'Values to join',
            type: 'array',
          },
          joiner: {
            title: 'Joiner',
            type: 'string',
          },
        },
      },
      js: joinValuesAction,
      outputSchema: {
        title: 'Result of joining all strings together',
      },
    },
    toURL: {
      description: 'Convert string to URL object',
      longDescription: 'Converts the given url string to URL object',
      inputSchema: {
        type: 'object',
        properties: {
          urlString: {
            type: 'string',
            title: 'String representation of the URL',
          },
        },
      },
      js: toURLAction,
      outputSchema: {
        type: 'string',
      },
    },
    mapFusionSoapRequest: {
      description: 'Map Fusion Soap Request values',
      longDescription: 'Maps the fusion tax calculation request and create document and VBT details',
      inputSchema: {
        type: 'object',
        properties: {
          body: {
            type: 'object',
          },
        },
      },
      js: mapFusionSoapRequestAction,
      outputSchema: {
        type: 'object',
      },
    },
    filterByUniqueValues: {
      description: 'Filter items by unique field values',
      longDescription: '',
      inputSchema: {
        type: 'object',
        properties: {
          items: {
            type: 'string',
          },
          uniqueFields: {
            type: 'array',
          },
          selectBy: {
            type: 'array',
          },
        },
      },
      js: filterByUniqueValuesAction,
      outputSchema: {
        type: 'string',
      },
    },
    split: {
      description: 'Split a text to a text array',
      longDescription: '',
      inputSchema: {
        type: 'object',
        properties: {
          payload: {
            type: 'string',
          },
          separator: {
            type: 'string',
            default: ',',
          },
        },
      },
      js: splitAction,
      outputSchema: {
        type: 'string',
      },
    },
    splitAll: {
      description: 'Split all texts to array of text array',
      longDescription: '',
      inputSchema: {
        type: 'object',
        properties: {
          payload: {
            type: 'array',
            items: {
              type: 'string',
            },
          },
          separator: {
            type: 'string',
            default: ',',
          },
        },
      },
      js: splitAllAction,
      outputSchema: {
        type: 'string',
      },
    },
    toSeparateCsvsByField: {
      description: 'Serialize payload to separate CSV, grouped by field',
      longDescription: '',
      inputSchema: {
        type: 'object',
        properties: {
          payload: {
            type: 'array',
          },
          groupByField: {
            type: 'string',
          },
          header: {
            type: 'boolean',
            default: true,
          },
          columns: {
            type: 'array',
            items: {
              type: 'object',
            },
          },
          columnDelimiter: {
            type: 'string',
            default: ',',
          },
        },
      },
      js: toSeparateCsvsByFieldAction,
      outputSchema: {
        type: 'string',
      },
    },
    toCsv: {
      description: 'Serialize payload to CSV',
      longDescription: '',
      inputSchema: {
        type: 'object',
        properties: {
          payload: {
            type: 'array',
          },
          header: {
            type: 'boolean',
            default: true,
          },
          columns: {
            type: 'array',
            items: {
              type: 'object',
            },
          },
          columnDelimiter: {
            type: 'string',
            default: ',',
          },
        },
      },
      js: toCsvAction,
      outputSchema: {
        type: 'string',
      },
    },
    joinMap: {
      description: 'Map items with an existing array of mapped objects',
      longDescription: '',
      inputSchema: {
        type: 'object',
        properties: {
          items: {
            title: 'Objects to add to the existing mapping objects',
            type: 'array',
          },
          join: {
            title: 'Join details',
            type: 'object',
          },
          mapWith: {
            title: 'Join details',
            type: 'object',
          },
        },
      },
      js: joinMapAction,
      outputSchema: {
        type: 'object',
        description: 'An array of the input map with the input objects mapped for each item',
      },
    },
    replaceByLookup: {
      description: 'Replace field value by lookup value',
      longDescription: 'Replace field value by lookup value',
      inputSchema: {
        type: 'object',
        properties: {
          items: {
            type: 'array',
          },
          lookups: {
            type: 'object',
          },
          replace: {
            type: 'object',
          },
        },
      },
      js: replaceByLookupAction,
      outputSchema: {
        title: 'New object',
        description: 'New object to use for later',
        type: 'object',
      },
    },
    uniqueValuesFromFields: {
      description: 'Extract unique values from specified fields',
      longDescription: 'Extract unique values from specified fields',
      inputSchema: {
        type: 'object',
        properties: {
          data: {
            type: 'object',
          },
        },
      },
      js: uniqueValuesFromFieldsAction,
      outputSchema: {
        title: 'New object',
        description: 'New object to use for later',
        type: 'object',
      },
    },
    setCombinedFieldValues: {
      description: 'Set the value of a field as the concatenation of given field values',
      longDescription: 'Set the value of a field as the concatenation of given field values',
      inputSchema: {
        type: 'object',
        properties: {
          items: {
            title: 'Host',
            type: 'string',
          },
          path: {
            title: 'path of items',
            type: 'string',
          },
          setToField: {
            title: 'setToField',
            type: 'string',
          },
          defaultVal: {
            title: 'defaultVal',
            type: 'string',
          },
          joiner: {
            title: 'joiner',
            type: 'string',
          },
          fields: {
            title: 'fields',
            type: 'array',
          },
        },
      },
      js: setCombinedFieldValuesAction,
      outputSchema: {
        title: 'Data',
        type: 'object',
        description: 'The passed object',
      },
    },
    getIntervalTimes: {
      description: 'Download files from Oracle UCM',
      longDescription: '',
      inputSchema: {
        type: 'object',
        properties: {
          last: {
            title: 'Last',
            type: 'string',
          },
          dtPattern: {
            title: 'Date Pattern',
            type: 'string',
          },
          interval: {
            title: 'Interval',
            type: 'string',
          },
          period: {
            title: 'Period',
            type: 'string',
          },
          prior: {
            title: 'Prior',
            type: 'string',
          },
          future: {
            title: 'Future',
            type: 'string',
          },
          combinedTenth: {
            title: 'Combine tenths (XYZ10 to XYZ19 will be trimmed to XYZ1 and so on)',
            type: 'string',
          },
        },
      },
      js: getIntervalTimesAction,
      outputSchema: {
        type: 'array',
      },
    },
    convertToDocument: {
      description: 'Convert text/csv data to document structure',
      longDescription: '',
      inputSchema: {
        type: 'object',
        properties: {
          // host, userName, passWord, prefix, account
          data: {
            title: 'Data',
            type: 'string',
          },
          docLevels: {
            title: 'Document levels definition',
            type: 'object',
          },
        },
      },
      js: convertToDocumentAction,
      outputSchema: {
        type: 'string',
      },
    },
    convertToDocuments: {
      description: 'Convert to documents',
      longDescription: 'Convert text data to documents, following the processing configuration',
      inputSchema: {
        type: 'object',
        properties: {
          documentDetails: {
            title: 'Items',
            type: 'array',
          },
          processingConfig: {
            title: 'File Processing Configuration',
            type: 'array',
          },
        },
      },
      js: convertToDocumentsAction,
      outputSchema: {
        title: 'Grouped and aggregated data',
        type: 'array',
      },
    },
    groupByToObjects: {
      description: 'Group By',
      longDescription: 'Merge multiple items into one when they all have the same value for the groupByFields.',
      inputSchema: {
        type: 'object',

        properties: {
          items: {
            title: 'Items',
            type: 'array',
          },
          groupByField: {
            title: 'Group by fields',
            type: 'string',
          },
        },
      },

      js: groupByToObjectsAction,
      outputSchema: {
        title: 'Grouped and aggregated data',
        type: 'array',
      },
    },
    groupBy: {
      description: 'Group By',
      longDescription: 'Merge multiple items into one when they all have the same value for the groupByFields.',
      inputSchema: {
        type: 'object',

        properties: {
          items: {
            title: 'Items',
            type: 'array',
          },
          groupByFields: {
            title: 'Group by fields',
            type: 'array',
          },
          aggregations: {
            title: 'Aggregations',
            type: 'array',
            items: {
              type: 'object',
              properties: {
                field: {
                  title: 'Field',
                  type: 'string',
                },
                operation: {
                  title: 'Operation',
                  type: 'string',
                  enum: ['SUM'],
                },
              },
            },
          },
        },
      },

      js: groupByAction,
      outputSchema: {
        title: 'Grouped and aggregated data',
        type: 'array',
      },
    },
    mergeToItems: {
      description: 'Merge (copy properties of) an object to the item upto two levels deep',
      longDescription: '',
      inputSchema: {
        type: 'object',
        properties: {
          items: {
            type: 'array',
          },
        },
      },
      js: mergeToItemsAction,
      outputSchema: {
        type: 'array',
      },
    },
    filterItemsWithPropertyMatching: {
      description: 'Filter items from an array  based on field values',
      longDescription: '',
      inputSchema: {
        type: 'object',
        properties: {
          items: {
            title: 'Array to filter from',
            type: 'array',
          },
          filterField: {
            title: 'Fields whose values are used to filter',
            type: 'string',
          },
          filterValues: {
            title: 'Values for filtering',
            type: 'array',
            items: {
              type: 'string',
            },
          },
        },
      },
      js: filterItemsWithPropertyMatchingAction,
      outputSchema: {
        type: 'object',
      },
    },
    flattenHierarchyToMap: {
      description: 'Flattens on an array items and map',
      longDescription: '',
      inputSchema: {
        type: 'object',
        properties: {
          items: {
            title: 'Items',
            description: 'Items to do this operation on',
            type: 'array',
          },
          itemName: {
            title: 'Property name for the item in the mapping object',
            type: 'string',
          },
          arrayPropertyPath: {
            title: 'Property Path',
            description: 'Path to the property from the current level',
            type: 'string',
          },
          arrayItemName: {
            title: 'Property name for the array item in the mapping object',
            type: 'string',
          },
        },
      },
      js: flattenHierarchyToMapAction,
      outputSchema: {
        type: 'array',
        description: 'The array of mapping objects with each row having one item in the array mapped with the item',
      },
    },
    combineArrays: {
      description: 'Combine two or more arrays',
      longDescription: '',
      inputSchema: {
        type: 'object',
        properties: {
          items: {
            title: 'Arrays to combine',
            type: 'array',
            items: { type: 'array' },
          },
        },
      },
      js: combineArraysAction,
      outputSchema: {
        type: 'array',
      },
    },
    separateItemsByCondition: {
      description: 'Exclude items from an array based on field values',
      longDescription: '',
      inputSchema: {
        type: 'object',
        properties: {
          items: {
            title: 'Array to filter from',
            type: 'array',
          },
          condition: {
            title: 'Condition for excluding',
            type: 'object',
            properties: {
              field: {
                title: 'Field to check',
                type: 'string',
              },
              comparison: {
                title: 'Comparison operator',
                type: 'string',
                enum: ['==', '===', '!=', '!==', '>', '>=', '<', '<=', 'contains', 'endsWith', 'startsWith', 'pattern'],
              },
              value: {
                title: 'Values for filtering',
                type: 'string',
              },
            },
          },
        },
      },
      js: separateItemsByConditionAction,
      outputSchema: {
        type: 'object',
        properties: {
          matching: {
            type: 'array',
          },
          nonMatching: {
            type: 'array',
          },
        },
      },
    },
    excludeItemsByCondition: {
      description: 'Exclude items from an array based on field values',
      longDescription: '',
      inputSchema: {
        type: 'object',
        properties: {
          items: {
            title: 'Array to filter from',
            type: 'array',
          },
          condition: {
            title: 'Condition for excluding',
            type: 'object',
            properties: {
              field: {
                title: 'Field to check',
                type: 'string',
              },
              comparison: {
                title: 'Comparison operator',
                type: 'string',
                enum: ['==', '===', '!=', '!==', '>', '>=', '<', '<=', 'contains', 'endsWith', 'startsWith', 'pattern'],
              },
              value: {
                title: 'Values for filtering',
                type: 'string',
              },
            },
          },
        },
      },
      js: excludeItemsByConditionAction,
      outputSchema: {
        type: 'array',
      },
    },
    filterMatchShallowCopy: {
      description: 'Filter items from an array based on field values and shallow copy to an array',
      longDescription: '',
      inputSchema: {
        type: 'object',
        properties: {
          items: {
            title: 'Array to filter from',
            type: 'array',
          },
          filterFields: {
            title: 'Fields whose values are used to filter',
            type: 'string',
          },
          filterValues: {
            title: 'Values for filtering',
            type: 'string',
          },
        },
      },
      js: filterMatchShallowCopyAction,
      outputSchema: {
        type: 'object',
      },
    },
    filterMatch: {
      description: 'Filter items from an array  based on field values',
      longDescription: '',
      inputSchema: {
        type: 'object',
        properties: {
          items: {
            title: 'Array to filter from',
            type: 'array',
          },
          filterFields: {
            title: 'Fields whose values are used to filter',
            type: 'string',
          },
          filterValues: {
            title: 'Values for filtering',
            type: 'string',
          },
        },
      },
      js: filterMatchAction,
      outputSchema: {
        type: 'object',
      },
    },
    proRateTaxes: {
      description: 'ProRateTaxCalculation',
      longDescription: 'Calculate ProRate taxes for AP module, return pro-rated tax for each line',
      inputSchema: {
        type: 'object',
        properties: {
          apSelfAssesTaxFlag: {
            title: 'Self Assess Tax Flag',
            type: 'string',
          },
          vendorBilledTax: {
            title: 'Self Assess Tax Flag',
            type: 'number',
          },
          taxedLines: {
            title: 'Tolerance pct and amt',
            type: 'array',
            items: {
              // Should set the avalara taxline model ????
              type: 'object',
            },
          },
          apTolerances: {
            title: 'Tolerance pct and amt',
            type: 'number',
          },
        },
      },
      js: proRateTaxesAction,
      outputSchema: {
        type: 'object',
        items: ProRateTaxDetailModel,
      },
    },
    createDetailTaxLines: {
      description: 'Create detail tax lines with taxes/copy field values',
      longDescription: '',
      inputSchema: {
        type: 'object',
        properties: {
          lineTaxAndDetail: {
            title: 'Source object to copy from',
            type: 'array',
            items: {
              type: 'object',
              properties: {
                line: {
                  type: 'object',
                },
                dtl: {
                  type: 'object',
                },
                taxedLine: {
                  type: 'object',
                },
                taxDetails: {
                  type: 'array',
                },
              },
            },
          },
          commonValues: {
            title: 'Common values to copy for all lines',
            type: 'object',
          },
          fieldsMapping: {
            title: 'Field Mapping as [source_Field,destination_Field]',
            type: 'object',
            properties: {
              taxableLineMapping: {
                type: 'string',
              },
              detailTaxLineMapping: {
                type: 'string',
              },
              lineTaxesMapping: {
                type: 'string',
              },
              taxDetailsMaping: {
                type: 'string',
              },
              columnSeparator: {
                title: 'Column separator for the fieldsMapping array',
                type: 'string',
              },
              mappingSeparator: {
                title: 'Column separator for the fieldsMapping array',
                type: 'string',
              },
            },
          },
        },
      },
      js: createDetailTaxLinesAction,
      outputSchema: {
        type: 'array',
        items: DetailTaxLineModel,
      },
    },
    collect: {
      description: 'Collect',
      longDescription: '',
      inputSchema: {
        type: 'object',
        properties: {
          argument: {
            title: 'Argument',
            type: 'object',
          },
          operation: {
            title: 'Operation',
            type: 'string',
            enum: [CollectOperation.minus, CollectOperation.plus],
          },
          defaultValue: {
            title: 'Default value',
            type: 'number',
          },
        },
      },
      js: collectAction,
      outputSchema: {
        type: 'number',
      },
    },
    store: {
      description: 'Store',
      longDescription: 'Place a data that so that it can be referred to the by step/action',
      inputSchema: {
        type: 'object',
        properties: {
          data: {
            type: 'object',
          },
        },
      },
      js: storeAction,
      outputSchema: {
        title: 'Data',
        type: 'object',
        description: 'The passed object',
      },
    },
    createObject: {
      description: 'Create new Object to use',
      longDescription: 'Create object to use in later actions',
      inputSchema: {
        type: 'object',
        properties: {
          data: {
            type: 'object',
          },
        },
      },
      js: createObjectAction,
      outputSchema: {
        title: 'New object',
        description: 'New object to use for later',
        type: 'object',
      },
    },
    createArray: {
      description: 'Create an empty array to use',
      longDescription: '',
      inputSchema: {
        type: 'object',
        properties: {
          data: {
            type: 'object',
          },
        },
      },
      js: createArrayAction,
      outputSchema: {
        title: 'Data',
        type: 'array',
      },
    },
    createNewObjectToArray: {
      description: 'Add a new object to the array',
      longDescription: '',
      inputSchema: {
        type: 'object',
        properties: {
          objects: {
            title: 'Array of items to add new object to.',
            type: 'array',
          },
        },
      },
      js: createNewObjectToArrayAction,
      outputSchema: {
        title: 'Data',
      },
    },
    pushObjectToArray: {
      description: 'Add a new object to the array',
      longDescription: '',
      inputSchema: {
        type: 'object',
        properties: {
          item: {
            title: 'Array of items to add new object to.',
            type: 'object',
          },
          objects: {
            title: 'Array of items to add new object to.',
            type: 'array',
          },
        },
      },
      js: pushObjectToArrayAction,
      outputSchema: {
        title: 'Data',
      },
    },
    append: {
      description: 'Append a value to another with a joiner',
      longDescription: 'Appends a value to the other with the joiner',
      inputSchema: {
        type: 'object',
        properties: {
          first: {
            title: 'First',
            type: 'string',
          },
          second: {
            title: 'Second',
            type: 'string',
          },
          joiner: {
            title: 'Joiner',
            type: 'string',
          },
        },
      },
      js: appendAction,
      outputSchema: {
        title: 'Data',
      },
    },
    sumAll: {
      description: 'Sum the values of a field of all items in an array',
      longDescription: '',
      inputSchema: {
        type: 'object',
        properties: {
          items: {
            title: 'Items to add field value',
            type: 'array',
          },
          fields: {
            title: 'Fields',
            type: 'string',
          },
          separator: {
            title: 'Field separator',
            type: 'string',
          },
        },
      },
      js: sumAllAction,
      outputSchema: {
        title: 'Data',
      },
    },
    match: {
      description: 'Match',
      longDescription: '',
      inputSchema: {
        type: 'object',
        properties: {
          values: {
            title: 'Values to search for',
            type: 'array',
          },
          mapping: {
            title: 'Match all and return last value in Array',
            type: 'array',
          },
        },
      },
      js: matchAction,
      outputSchema: {
        type: 'object',
        properties: {
          collector: {
            type: 'number',
          },
        },
      },
    },
    matchCombination: {
      description: 'Match',
      longDescription:
        'Math array of values and return the result. If no matching found returns the default value(defVal)',
      inputSchema: {
        type: 'object',
        properties: {
          values: {
            title: 'Values to search for',
            type: 'array',
          },
          mapping: {
            title: 'Mapping for matching. Each value separated by , and each row separated by //',
            type: 'string',
          },
          defVal: {
            title: 'Default value to return if no value found',
            type: 'string',
          },
        },
      },
      js: matchCombinationAction,
      outputSchema: {
        type: 'string',
      },
    },
    fieldValues: {
      description: 'Create an Array containing the values of the fields from the object',
      longDescription: '',
      inputSchema: {
        type: 'object',
        properties: {
          fieldNames: {
            title: 'Field names to get value',
            type: 'string',
          },
          item: {
            title: 'Object for values',
            type: 'object',
          },
        },
      },
      js: fieldValuesAction,
      outputSchema: {
        type: 'array',
        items: {
          type: 'object',
        },
      },
    },
    setProperty: {
      description: 'Set a property to an object',
      longDescription: '',
      inputSchema: {
        type: 'object',
        properties: {
          setTo: {
            title: 'Set to object',
            type: 'object',
          },
          fieldName: {
            title: 'Name of the property',
            type: 'string',
          },
          item: {
            title: 'Setting property object',
            type: 'object',
          },
        },
      },
      js: setPropertyAction,
      outputSchema: {
        type: 'object',
      },
    },
    setProperties: {
      description: 'Set a property to an object',
      longDescription: '',
      inputSchema: {
        type: 'object',
        properties: {
          setTo: {
            title: 'Set to object',
            type: 'object',
          },
          values: {
            title: 'Name of the property',
            type: 'string',
          },
        },
      },
      js: setPropertiesAction,
      outputSchema: {
        type: 'object',
      },
    },
    setReferenceTo: {
      description: 'Set a property to an object',
      longDescription: '',
      inputSchema: {
        type: 'object',
        properties: {
          items: {
            title: 'Items',
            type: 'array',
          },
          propertyName: {
            title: 'Name of the property',
            type: 'string',
          },
          setTo: {
            title: 'Setting property',
            type: 'string',
          },
        },
      },
      js: setReferenceToAction,
      outputSchema: {
        type: 'array',
      },
    },
    setValuesToItems: {
      description: 'Set a property to an object',
      longDescription: '',
      inputSchema: {
        type: 'object',
        properties: {
          items: {
            title: 'Items',
            type: 'array',
          },
          setValues: {
            type: 'array',
          },
        },
      },
      js: setValuesToItemsAction,
      outputSchema: {
        type: 'array',
      },
    },
    copyValueToNested: {
      description: 'Copy values of an object to its children',
      longDescription: '',
      inputSchema: {
        type: 'object',
        properties: {
          items: {
            title: 'Items',
            description: 'Items to do this operation on',
            type: 'array',
          },
          propertyPath: {
            title: 'Property Path',
            description: 'Path to the property from the current level',
            type: 'string',
          },
          copyValues: {
            title: 'From and to to Set to',
            description: 'Property name to set to',
            type: 'array',
          },
        },
      },
      js: copyValueToNestedAction,
      outputSchema: {
        type: 'object',
        description:
          "The array of items each with the property referred to by 'setTo' set with the property found in the path",
      },
    },
    pullUpAndSetReferenceTo: {
      description: 'Pulls up a property from same or down level and sets to a property at this level',
      longDescription: '',
      inputSchema: {
        type: 'object',
        properties: {
          items: {
            title: 'Items',
            description: 'Items to do this operation on',
            type: 'array',
          },
          propertyPath: {
            title: 'Property Path',
            description: 'Path to the property from the current level',
            type: 'string',
          },
          setTo: {
            title: 'Set To',
            description: 'Property name to set to',
            type: 'string',
          },
        },
      },
      js: pullUpAndSetReferenceToAction,
      outputSchema: {
        type: 'object',
        description:
          "The array of items each with the property referred to by 'setTo' set with the property found in the path",
      },
    },
    cloneAndExecuteForEach: {
      description: 'Clone the given items and execute the operations on them',
      longDescription: '',
      inputSchema: {
        type: 'object',
        properties: {
          items: {
            title: 'Array of items to execute the operation',
            type: 'array',
          },
          operations: {
            title: 'Array of operations to execute',
            type: 'array',
            items: {
              type: 'string',
            },
          },
        },
      },
      js: cloneAndExecuteForEachAction,
      outputSchema: {
        type: 'array',
        description: 'Items with field values matching to the given values',
      },
    },
    executeForEach: {
      description: 'Execute the operations on each item of an array',
      longDescription: '',
      inputSchema: {
        type: 'object',
        properties: {
          items: {
            title: 'Array of items to search',
            type: 'array',
          },
          operations: {
            title: 'Array of values to check',
            type: 'array',
            items: {
              type: 'string',
            },
          },
        },
      },
      js: executeForEachAction,
      outputSchema: {
        type: 'array',
        description: 'Items with field values matching to the given values',
      },
    },
    findItemsWithFieldValues: {
      description: 'Find the first item in the array with matching values from source object or values',
      longDescription: '',
      inputSchema: {
        type: 'object',
        properties: {
          items: {
            title: 'Array of items to search',
            type: 'array',
          },
          matchFields: {
            title: 'Array of values to check',
            type: 'array',
            items: {
              type: 'array',
            },
          },
        },
      },
      js: findItemsWithFieldValuesAction,
      outputSchema: {
        type: 'array',
        description: 'Items with field values matching to the given values',
      },
    },
    findItemsWithFieldValuesMatching: {
      description: 'Find the first item in the array with matching values from source object or values',
      longDescription: '',
      inputSchema: {
        type: 'object',
        properties: {
          items: {
            title: 'Array of items to search',
            type: 'array',
          },
          matchFields: {
            title: 'Array of values to check',
            type: 'array',
            items: {
              type: 'array',
            },
          },
        },
      },
      js: findItemsWithFieldValuesMatchingAction,
      outputSchema: {
        type: 'array',
        description: 'Items with field values matching to the given values',
      },
    },
    findMatch: {
      description: 'Find the first item in the array with matching values from source object and plain values',
      longDescription: '',
      inputSchema: {
        type: 'object',
        properties: {
          source: {
            title: 'Object to get match values from',
            type: 'object',
          },
          sourceFields: {
            title: 'Fields to search for, comma separated',
            type: 'string',
          },
          rawValues: {
            title: 'Extra values to be checked, not field values',
            type: 'string',
          },
          checkObjects: {
            title: 'Array of items to search',
            type: 'array',
          },
          matchFields: {
            title: 'Fields to match ',
            type: 'string',
          },
          matchVal: {
            title: 'Value to return if matches',
            type: 'string',
          },
          noMatchVal: {
            title: 'Value to return if no match found',
            type: 'string',
          },
        },
      },
      js: findMatchAction,
      outputSchema: {
        type: 'object',
        description: 'The first found property in any of the objects',
      },
    },
    findMatchingObject: {
      description: 'Find combination of values in the objects',
      longDescription: '',
      inputSchema: {
        type: 'object',
        properties: {
          source: {
            title: 'Object to get match values from',
            type: 'object',
          },
          sourceFields: {
            title: 'Fields to search for, comma separated',
            type: 'string',
          },
          checkObjects: {
            title: 'Array of items to search',
            type: 'array',
          },
          matchFields: {
            title: 'Fields to match ',
            type: 'string',
          },
        },
      },
      js: findMatchingObjectAction,
      outputSchema: {
        type: 'object',
        description: 'The first found property in any of the objects',
      },
    },
    findWithPrefernce: {
      description: 'Find values with preference to earlier ones',
      longDescription: '',
      inputSchema: {
        type: 'object',
        properties: {
          fields: {
            title: 'Fields to search for, comma separated',
            type: 'string',
          },
          objects: {
            title: 'Array of items to search',
            type: 'array',
          },
        },
      },
      js: findWithPrefernceAction,
      outputSchema: {
        type: 'object',
        description: 'The first found property in any of the objects',
      },
    },
    findWithPrefernceOrDefault: {
      description: 'Find values with preference to earlier ones',
      longDescription: '',
      inputSchema: {
        type: 'object',
        properties: {
          fields: {
            title: 'Fields to search for, comma separated',
            type: 'string',
          },
          objects: {
            title: 'Array of items to search',
            type: 'array',
          },
          defaultVal: {
            title: 'Default value to return',
            type: 'object',
          },
        },
      },
      js: findWithPrefernceOrDefaultAction,
      outputSchema: {
        type: 'object',
      },
    },
    mapNested: {
      description: 'Map',
      longDescription: '',
      inputSchema: {
        type: 'object',
        properties: {
          mapping: {
            title: 'Mapping',
            type: 'array',
            items: {
              type: 'object',
              properties: {
                items: {
                  title: 'Objects to add to the existing mapping objects',
                  type: 'array',
                },
                nestedPath: {
                  title: 'Path to the nested items',
                  type: 'string',
                },
                mapByField: {
                  title: 'Object field to map by',
                  type: 'string',
                },
                setToField: {
                  title: 'Result field to assign object to',
                  type: 'string',
                },
              },
            },
          },
        },
      },
      js: mapNestedAction,
      outputSchema: {
        type: 'object',
        description: 'An array of the input map with the input objects mapped for each item',
      },
    },
    mapToMap: {
      description: 'Map',
      longDescription: '',
      inputSchema: {
        type: 'object',
        properties: {
          mapping: {
            title: 'Mapping',
            type: 'array',
            items: {
              type: 'object',
              properties: {
                addToMap: {
                  title: 'Mapped array to include new objects',
                  type: 'array',
                },
                mapByField: {
                  title: 'Object field to map by',
                  type: 'string',
                },
                objects: {
                  title: 'Objects to add to the existing mapping objects',
                  type: 'array',
                },
                setToField: {
                  title: 'Result field to assign object to',
                  type: 'string',
                },
                refObject: {
                  title: 'Object to take the value to match with the map by field value of object',
                  type: 'string',
                },
                refProperty: {
                  title: 'Property to take the value from the refObject to match with the map by field value of object',
                  type: 'string',
                },
              },
            },
          },
        },
      },
      js: mapToMapAction,
      outputSchema: {
        type: 'object',
        description: 'An array of the input map with the input objects mapped for each item',
      },
    },
    copyProperties1: {
      description: 'Copy properties',
      longDescription: '',
      inputSchema: {
        type: 'object',
        properties: {
          source: {
            title: 'Source object to copy from',
            type: 'object',
          },
          destination: {
            title: 'Destination object to copy to',
            type: 'object',
          },
          fieldsMapping: {
            title: 'Field Mapping as [source_Field,destination_Field]',
            type: 'string',
          },
          rowSeparator: {
            title: 'Row separator for the fieldsMapping array',
            type: 'string',
          },
          columnSeparator: {
            title: 'Column separator for the fieldsMapping array',
            type: 'string',
          },
        },
      },
      js: copyProperties1Action,

      outputSchema: {
        type: 'object',
        description: 'Object with the properties defined in fieldsMapping copied from the source',
      },
    },
    copyPropertiesToItems: {
      description: 'Copy properties',
      longDescription: '',
      inputSchema: {
        type: 'object',
        properties: {
          source: {
            title: 'Source object to copy from',
            type: 'object',
          },
          destination: {
            title: 'Destination object to copy to',
            type: 'object',
          },
          fieldsMapping: {
            title: 'Field Mapping as [source_Field,destination_Field]',
            type: 'string',
          },
          rowSeparator: {
            title: 'Row separator for the fieldsMapping array',
            type: 'string',
          },
          columnSeparator: {
            title: 'Column separator for the fieldsMapping array',
            type: 'string',
          },
        },
      },
      js: copyPropertiesToItemsAction,
      outputSchema: {
        type: 'object',
      },
    },
    copyProperties: {
      description: 'Map',
      longDescription: '',
      inputSchema: {
        type: 'object',
        properties: {
          mapping: {
            title: 'Mapping',
            type: 'array',
            items: {
              type: 'object',
              properties: {
                source: {
                  title: 'Source object to copy from',
                  type: 'object',
                },
                destination: {
                  title: 'Destination object to copy to',
                  type: 'object',
                },
                fieldsMapping: {
                  title: 'Field Mapping as array of string array[source_Field,destination_Field]',
                  type: 'array',
                },
              },
            },
          },
        },
      },
      js: copyPropertiesAction,
      outputSchema: {
        type: 'object',
      },
    },
    createDetailTaxLine: {
      description: 'CreateDetailTaxLines',
      longDescription: 'Creates detail tax lines from TaxableLines',
      inputSchema: {
        type: 'object',
        properties: {
          taxableLine: {
            title: 'Create Detail TaxLines',
            type: 'object',
          },
          detailLinesArray: {
            title: 'Array of detail tax lines to push to',
            type: 'array',
          },
          internalOrganizationId: {
            title: 'LegalEntityId',
            type: 'string',
          },
          legalEntityId: {
            title: 'LegalEntityId',
            type: 'string',
          },
          errorMessageTypeFlag: {
            title: 'ErrorMessageTypeFlag',
            type: 'string',
          },
          errorString: {
            title: 'ErrorString',
            type: 'string',
          },
        },
      },
      js:createDetailTaxLineAction,

      outputSchema: {
        type: 'array',
        items: DetailTaxLineModel,
      },
    },
    createDetailTaxLinesNoTax: {
      description: 'CreateDetailTaxLines',
      longDescription: 'Creates detail tax lines from TaxableLines',
      inputSchema: {
        type: 'object',
        properties: {
          taxableLines: {
            title: 'Create Detail TaxLines',
            type: 'array',
          },
          internalOrganizationId: {
            title: 'InternalOrganizationId',
            type: 'string',
          },
          legalEntityId: {
            title: 'LegalEntityId',
            type: 'string',
          },
          errorMessageTypeFlag: {
            title: 'ErrorMessageTypeFlag',
            type: 'string',
          },
          errorString: {
            title: 'ErrorString',
            type: 'string',
          },
        },
      },
      js: createDetailTaxLinesNoTaxAction,

      outputSchema: {
        type: 'array',
        items: DetailTaxLineModel,
      },
    },
    convertToXMLResponse: {
      description: 'convertToXml',
      longDescription: '',
      inputSchema: {
        type: 'object',
        properties: {
          data: {
            title: 'Data',
          },
        },
      },
      js: convertToXMLResponseAction,
      outputSchema: {
        title: 'Data',
      },
    },
    parseXML: {
      description: 'Parse XML to Json',
      longDescription: 'Parses XML and returns JSON',
      inputSchema: {
        type: 'object',
        properties: {
          data: {
            title: 'Data',
          },
        },
      },
      js: parseXMLAction,
      outputSchema: {
        title: 'Data',
      },
    },
    convertToXmlAction: {
      description: 'Convert json to xml',
      longDescription: '',
      inputSchema: {
        type: 'object',
        properties: {
          data: {
            title: 'Data',
            type: 'object',
          },
        },
      },
      js: convertToXmlActions,
      outputSchema: {
        type: 'object',
        properties: {
          status: {
            type: 'integer',
          },
          headers: {
            type: 'object',
          },
          body: {
            type: 'object',
          },
        },
      },
    },
  },
  graphFunctions:{
    joinValues: {
      description: 'Join the string values together with joiner',
      longDescription: '',
      inputSchema: {
        type: 'object',
        properties: {
          values: {
            title: 'Values to join',
            type: 'array',
          },
          joiner: {
            title: 'Joiner',
            type: 'string',
          },
        },
      },
      js: joinValuesAction,
      outputSchema: {
        title: 'Result of joining all strings together',
      },
    },
    toURL: {
      description: 'Convert string to URL object',
      longDescription: 'Converts the given url string to URL object',
      inputSchema: {
        type: 'object',
        properties: {
          urlString: {
            type: 'string',
            title: 'String representation of the URL',
          },
        },
      },
      js: toURLAction,
      outputSchema: {
        type: 'string',
      },
    },
    mapFusionSoapRequest: {
      description: 'Map Fusion Soap Request values',
      longDescription: 'Maps the fusion tax calculation request and create document and VBT details',
      inputSchema: {
        type: 'object',
        properties: {
          body: {
            type: 'object',
          },
        },
      },
      js: mapFusionSoapRequestAction,
      outputSchema: {
        type: 'object',
      },
    },
    filterByUniqueValues: {
      description: 'Filter items by unique field values',
      longDescription: '',
      inputSchema: {
        type: 'object',
        properties: {
          items: {
            type: 'string',
          },
          uniqueFields: {
            type: 'array',
          },
          selectBy: {
            type: 'array',
          },
        },
      },
      js: filterByUniqueValuesAction,
      outputSchema: {
        type: 'string',
      },
    },
    split: {
      description: 'Split a text to a text array',
      longDescription: '',
      inputSchema: {
        type: 'object',
        properties: {
          payload: {
            type: 'string',
          },
          separator: {
            type: 'string',
            default: ',',
          },
        },
      },
      js: splitAction,
      outputSchema: {
        type: 'string',
      },
    },
    splitAll: {
      description: 'Split all texts to array of text array',
      longDescription: '',
      inputSchema: {
        type: 'object',
        properties: {
          payload: {
            type: 'array',
            items: {
              type: 'string',
            },
          },
          separator: {
            type: 'string',
            default: ',',
          },
        },
      },
      js: splitAllAction,
      outputSchema: {
        type: 'string',
      },
    },
    toSeparateCsvsByField: {
      description: 'Serialize payload to separate CSV, grouped by field',
      longDescription: '',
      inputSchema: {
        type: 'object',
        properties: {
          payload: {
            type: 'array',
          },
          groupByField: {
            type: 'string',
          },
          header: {
            type: 'boolean',
            default: true,
          },
          columns: {
            type: 'array',
            items: {
              type: 'object',
            },
          },
          columnDelimiter: {
            type: 'string',
            default: ',',
          },
        },
      },
      js: toSeparateCsvsByFieldAction,
      outputSchema: {
        type: 'string',
      },
    },
    toCsv: {
      description: 'Serialize payload to CSV',
      longDescription: '',
      inputSchema: {
        type: 'object',
        properties: {
          payload: {
            type: 'array',
          },
          header: {
            type: 'boolean',
            default: true,
          },
          columns: {
            type: 'array',
            items: {
              type: 'object',
            },
          },
          columnDelimiter: {
            type: 'string',
            default: ',',
          },
        },
      },
      js: toCsvAction,
      outputSchema: {
        type: 'string',
      },
    },
    joinMap: {
      description: 'Map items with an existing array of mapped objects',
      longDescription: '',
      inputSchema: {
        type: 'object',
        properties: {
          items: {
            title: 'Objects to add to the existing mapping objects',
            type: 'array',
          },
          join: {
            title: 'Join details',
            type: 'object',
          },
          mapWith: {
            title: 'Join details',
            type: 'object',
          },
        },
      },
      js: joinMapAction,
      outputSchema: {
        type: 'object',
        description: 'An array of the input map with the input objects mapped for each item',
      },
    },
    replaceByLookup: {
      description: 'Replace field value by lookup value',
      longDescription: 'Replace field value by lookup value',
      inputSchema: {
        type: 'object',
        properties: {
          items: {
            type: 'array',
          },
          lookups: {
            type: 'object',
          },
          replace: {
            type: 'object',
          },
        },
      },
      js: replaceByLookupAction,
      outputSchema: {
        title: 'New object',
        description: 'New object to use for later',
        type: 'object',
      },
    },
    uniqueValuesFromFields: {
      description: 'Extract unique values from specified fields',
      longDescription: 'Extract unique values from specified fields',
      inputSchema: {
        type: 'object',
        properties: {
          data: {
            type: 'object',
          },
        },
      },
      js: uniqueValuesFromFieldsAction,
      outputSchema: {
        title: 'New object',
        description: 'New object to use for later',
        type: 'object',
      },
    },
    setCombinedFieldValues: {
      description: 'Set the value of a field as the concatenation of given field values',
      longDescription: 'Set the value of a field as the concatenation of given field values',
      inputSchema: {
        type: 'object',
        properties: {
          items: {
            title: 'Host',
            type: 'string',
          },
          path: {
            title: 'path of items',
            type: 'string',
          },
          setToField: {
            title: 'setToField',
            type: 'string',
          },
          defaultVal: {
            title: 'defaultVal',
            type: 'string',
          },
          joiner: {
            title: 'joiner',
            type: 'string',
          },
          fields: {
            title: 'fields',
            type: 'array',
          },
        },
      },
      js: setCombinedFieldValuesAction,
      outputSchema: {
        title: 'Data',
        type: 'object',
        description: 'The passed object',
      },
    },
    getIntervalTimes: {
      description: 'Download files from Oracle UCM',
      longDescription: '',
      inputSchema: {
        type: 'object',
        properties: {
          last: {
            title: 'Last',
            type: 'string',
          },
          dtPattern: {
            title: 'Date Pattern',
            type: 'string',
          },
          interval: {
            title: 'Interval',
            type: 'string',
          },
          period: {
            title: 'Period',
            type: 'string',
          },
          prior: {
            title: 'Prior',
            type: 'string',
          },
          future: {
            title: 'Future',
            type: 'string',
          },
          combinedTenth: {
            title: 'Combine tenths (XYZ10 to XYZ19 will be trimmed to XYZ1 and so on)',
            type: 'string',
          },
        },
      },
      js: getIntervalTimesAction,
      outputSchema: {
        type: 'array',
      },
    },
    convertToDocument: {
      description: 'Convert text/csv data to document structure',
      longDescription: '',
      inputSchema: {
        type: 'object',
        properties: {
          // host, userName, passWord, prefix, account
          data: {
            title: 'Data',
            type: 'string',
          },
          docLevels: {
            title: 'Document levels definition',
            type: 'object',
          },
        },
      },
      js: convertToDocumentAction,
      outputSchema: {
        type: 'string',
      },
    },
    convertToDocuments: {
      description: 'Convert to documents',
      longDescription: 'Convert text data to documents, following the processing configuration',
      inputSchema: {
        type: 'object',
        properties: {
          documentDetails: {
            title: 'Items',
            type: 'array',
          },
          processingConfig: {
            title: 'File Processing Configuration',
            type: 'array',
          },
        },
      },
      js: convertToDocumentsAction,
      outputSchema: {
        title: 'Grouped and aggregated data',
        type: 'array',
      },
    },
    groupByToObjects: {
      description: 'Group By',
      longDescription: 'Merge multiple items into one when they all have the same value for the groupByFields.',
      inputSchema: {
        type: 'object',

        properties: {
          items: {
            title: 'Items',
            type: 'array',
          },
          groupByField: {
            title: 'Group by fields',
            type: 'string',
          },
        },
      },

      js: groupByToObjectsAction,
      outputSchema: {
        title: 'Grouped and aggregated data',
        type: 'array',
      },
    },
    groupBy: {
      description: 'Group By',
      longDescription: 'Merge multiple items into one when they all have the same value for the groupByFields.',
      inputSchema: {
        type: 'object',

        properties: {
          items: {
            title: 'Items',
            type: 'array',
          },
          groupByFields: {
            title: 'Group by fields',
            type: 'array',
          },
          aggregations: {
            title: 'Aggregations',
            type: 'array',
            items: {
              type: 'object',
              properties: {
                field: {
                  title: 'Field',
                  type: 'string',
                },
                operation: {
                  title: 'Operation',
                  type: 'string',
                  enum: ['SUM'],
                },
              },
            },
          },
        },
      },

      js: groupByAction,
      outputSchema: {
        title: 'Grouped and aggregated data',
        type: 'array',
      },
    },
    mergeToItems: {
      description: 'Merge (copy properties of) an object to the item upto two levels deep',
      longDescription: '',
      inputSchema: {
        type: 'object',
        properties: {
          items: {
            type: 'array',
          },
        },
      },
      js: mergeToItemsAction,
      outputSchema: {
        type: 'array',
      },
    },
    filterItemsWithPropertyMatching: {
      description: 'Filter items from an array  based on field values',
      longDescription: '',
      inputSchema: {
        type: 'object',
        properties: {
          items: {
            title: 'Array to filter from',
            type: 'array',
          },
          filterField: {
            title: 'Fields whose values are used to filter',
            type: 'string',
          },
          filterValues: {
            title: 'Values for filtering',
            type: 'array',
            items: {
              type: 'string',
            },
          },
        },
      },
      js: filterItemsWithPropertyMatchingAction,
      outputSchema: {
        type: 'object',
      },
    },
    flattenHierarchyToMap: {
      description: 'Flattens on an array items and map',
      longDescription: '',
      inputSchema: {
        type: 'object',
        properties: {
          items: {
            title: 'Items',
            description: 'Items to do this operation on',
            type: 'array',
          },
          itemName: {
            title: 'Property name for the item in the mapping object',
            type: 'string',
          },
          arrayPropertyPath: {
            title: 'Property Path',
            description: 'Path to the property from the current level',
            type: 'string',
          },
          arrayItemName: {
            title: 'Property name for the array item in the mapping object',
            type: 'string',
          },
        },
      },
      js: flattenHierarchyToMapAction,
      outputSchema: {
        type: 'array',
        description: 'The array of mapping objects with each row having one item in the array mapped with the item',
      },
    },
    combineArrays: {
      description: 'Combine two or more arrays',
      longDescription: '',
      inputSchema: {
        type: 'object',
        properties: {
          items: {
            title: 'Arrays to combine',
            type: 'array',
            items: { type: 'array' },
          },
        },
      },
      js: combineArraysAction,
      outputSchema: {
        type: 'array',
      },
    },
    separateItemsByCondition: {
      description: 'Exclude items from an array based on field values',
      longDescription: '',
      inputSchema: {
        type: 'object',
        properties: {
          items: {
            title: 'Array to filter from',
            type: 'array',
          },
          condition: {
            title: 'Condition for excluding',
            type: 'object',
            properties: {
              field: {
                title: 'Field to check',
                type: 'string',
              },
              comparison: {
                title: 'Comparison operator',
                type: 'string',
                enum: ['==', '===', '!=', '!==', '>', '>=', '<', '<=', 'contains', 'endsWith', 'startsWith', 'pattern'],
              },
              value: {
                title: 'Values for filtering',
                type: 'string',
              },
            },
          },
        },
      },
      js: separateItemsByConditionAction,
      outputSchema: {
        type: 'object',
        properties: {
          matching: {
            type: 'array',
          },
          nonMatching: {
            type: 'array',
          },
        },
      },
    },
    excludeItemsByCondition: {
      description: 'Exclude items from an array based on field values',
      longDescription: '',
      inputSchema: {
        type: 'object',
        properties: {
          items: {
            title: 'Array to filter from',
            type: 'array',
          },
          condition: {
            title: 'Condition for excluding',
            type: 'object',
            properties: {
              field: {
                title: 'Field to check',
                type: 'string',
              },
              comparison: {
                title: 'Comparison operator',
                type: 'string',
                enum: ['==', '===', '!=', '!==', '>', '>=', '<', '<=', 'contains', 'endsWith', 'startsWith', 'pattern'],
              },
              value: {
                title: 'Values for filtering',
                type: 'string',
              },
            },
          },
        },
      },
      js: excludeItemsByConditionAction,
      outputSchema: {
        type: 'array',
      },
    },
    filterMatchShallowCopy: {
      description: 'Filter items from an array based on field values and shallow copy to an array',
      longDescription: '',
      inputSchema: {
        type: 'object',
        properties: {
          items: {
            title: 'Array to filter from',
            type: 'array',
          },
          filterFields: {
            title: 'Fields whose values are used to filter',
            type: 'string',
          },
          filterValues: {
            title: 'Values for filtering',
            type: 'string',
          },
        },
      },
      js: filterMatchShallowCopyAction,
      outputSchema: {
        type: 'object',
      },
    },
    filterMatch: {
      description: 'Filter items from an array  based on field values',
      longDescription: '',
      inputSchema: {
        type: 'object',
        properties: {
          items: {
            title: 'Array to filter from',
            type: 'array',
          },
          filterFields: {
            title: 'Fields whose values are used to filter',
            type: 'string',
          },
          filterValues: {
            title: 'Values for filtering',
            type: 'string',
          },
        },
      },
      js: filterMatchAction,
      outputSchema: {
        type: 'object',
      },
    },
    proRateTaxes: {
      description: 'ProRateTaxCalculation',
      longDescription: 'Calculate ProRate taxes for AP module, return pro-rated tax for each line',
      inputSchema: {
        type: 'object',
        properties: {
          apSelfAssesTaxFlag: {
            title: 'Self Assess Tax Flag',
            type: 'string',
          },
          vendorBilledTax: {
            title: 'Self Assess Tax Flag',
            type: 'number',
          },
          taxedLines: {
            title: 'Tolerance pct and amt',
            type: 'array',
            items: {
              // Should set the avalara taxline model ????
              type: 'object',
            },
          },
          apTolerances: {
            title: 'Tolerance pct and amt',
            type: 'number',
          },
        },
      },
      js: proRateTaxesAction,
      outputSchema: {
        type: 'object',
        items: ProRateTaxDetailModel,
      },
    },
    createDetailTaxLines: {
      description: 'Create detail tax lines with taxes/copy field values',
      longDescription: '',
      inputSchema: {
        type: 'object',
        properties: {
          lineTaxAndDetail: {
            title: 'Source object to copy from',
            type: 'array',
            items: {
              type: 'object',
              properties: {
                line: {
                  type: 'object',
                },
                dtl: {
                  type: 'object',
                },
                taxedLine: {
                  type: 'object',
                },
                taxDetails: {
                  type: 'array',
                },
              },
            },
          },
          commonValues: {
            title: 'Common values to copy for all lines',
            type: 'object',
          },
          fieldsMapping: {
            title: 'Field Mapping as [source_Field,destination_Field]',
            type: 'object',
            properties: {
              taxableLineMapping: {
                type: 'string',
              },
              detailTaxLineMapping: {
                type: 'string',
              },
              lineTaxesMapping: {
                type: 'string',
              },
              taxDetailsMaping: {
                type: 'string',
              },
              columnSeparator: {
                title: 'Column separator for the fieldsMapping array',
                type: 'string',
              },
              mappingSeparator: {
                title: 'Column separator for the fieldsMapping array',
                type: 'string',
              },
            },
          },
        },
      },
      js: createDetailTaxLinesAction,
      outputSchema: {
        type: 'array',
        items: DetailTaxLineModel,
      },
    },
    collect: {
      description: 'Collect',
      longDescription: '',
      inputSchema: {
        type: 'object',
        properties: {
          argument: {
            title: 'Argument',
            type: 'object',
          },
          operation: {
            title: 'Operation',
            type: 'string',
            enum: [CollectOperation.minus, CollectOperation.plus],
          },
          defaultValue: {
            title: 'Default value',
            type: 'number',
          },
        },
      },
      js: collectAction,
      outputSchema: {
        type: 'number',
      },
    },
    store: {
      description: 'Store',
      longDescription: 'Place a data that so that it can be referred to the by step/action',
      inputSchema: {
        type: 'object',
        properties: {
          data: {
            type: 'object',
          },
        },
      },
      js: storeAction,
      outputSchema: {
        title: 'Data',
        type: 'object',
        description: 'The passed object',
      },
    },
    createObject: {
      description: 'Create new Object to use',
      longDescription: 'Create object to use in later actions',
      inputSchema: {
        type: 'object',
        properties: {
          data: {
            type: 'object',
          },
        },
      },
      js: createObjectAction,
      outputSchema: {
        title: 'New object',
        description: 'New object to use for later',
        type: 'object',
      },
    },
    createArray: {
      description: 'Create an empty array to use',
      longDescription: '',
      inputSchema: {
        type: 'object',
        properties: {
          data: {
            type: 'object',
          },
        },
      },
      js: createArrayAction,
      outputSchema: {
        title: 'Data',
        type: 'array',
      },
    },
    createNewObjectToArray: {
      description: 'Add a new object to the array',
      longDescription: '',
      inputSchema: {
        type: 'object',
        properties: {
          objects: {
            title: 'Array of items to add new object to.',
            type: 'array',
          },
        },
      },
      js: createNewObjectToArrayAction,
      outputSchema: {
        title: 'Data',
      },
    },
    pushObjectToArray: {
      description: 'Add a new object to the array',
      longDescription: '',
      inputSchema: {
        type: 'object',
        properties: {
          item: {
            title: 'Array of items to add new object to.',
            type: 'object',
          },
          objects: {
            title: 'Array of items to add new object to.',
            type: 'array',
          },
        },
      },
      js: pushObjectToArrayAction,
      outputSchema: {
        title: 'Data',
      },
    },
    append: {
      description: 'Append a value to another with a joiner',
      longDescription: 'Appends a value to the other with the joiner',
      inputSchema: {
        type: 'object',
        properties: {
          first: {
            title: 'First',
            type: 'string',
          },
          second: {
            title: 'Second',
            type: 'string',
          },
          joiner: {
            title: 'Joiner',
            type: 'string',
          },
        },
      },
      js: appendAction,
      outputSchema: {
        title: 'Data',
      },
    },
    sumAll: {
      description: 'Sum the values of a field of all items in an array',
      longDescription: '',
      inputSchema: {
        type: 'object',
        properties: {
          items: {
            title: 'Items to add field value',
            type: 'array',
          },
          fields: {
            title: 'Fields',
            type: 'string',
          },
          separator: {
            title: 'Field separator',
            type: 'string',
          },
        },
      },
      js: sumAllAction,
      outputSchema: {
        title: 'Data',
      },
    },
    match: {
      description: 'Match',
      longDescription: '',
      inputSchema: {
        type: 'object',
        properties: {
          values: {
            title: 'Values to search for',
            type: 'array',
          },
          mapping: {
            title: 'Match all and return last value in Array',
            type: 'array',
          },
        },
      },
      js: matchAction,
      outputSchema: {
        type: 'object',
        properties: {
          collector: {
            type: 'number',
          },
        },
      },
    },
    matchCombination: {
      description: 'Match',
      longDescription:
        'Math array of values and return the result. If no matching found returns the default value(defVal)',
      inputSchema: {
        type: 'object',
        properties: {
          values: {
            title: 'Values to search for',
            type: 'array',
          },
          mapping: {
            title: 'Mapping for matching. Each value separated by , and each row separated by //',
            type: 'string',
          },
          defVal: {
            title: 'Default value to return if no value found',
            type: 'string',
          },
        },
      },
      js: matchCombinationAction,
      outputSchema: {
        type: 'string',
      },
    },
    fieldValues: {
      description: 'Create an Array containing the values of the fields from the object',
      longDescription: '',
      inputSchema: {
        type: 'object',
        properties: {
          fieldNames: {
            title: 'Field names to get value',
            type: 'string',
          },
          item: {
            title: 'Object for values',
            type: 'object',
          },
        },
      },
      js: fieldValuesAction,
      outputSchema: {
        type: 'array',
        items: {
          type: 'object',
        },
      },
    },
    setProperty: {
      description: 'Set a property to an object',
      longDescription: '',
      inputSchema: {
        type: 'object',
        properties: {
          setTo: {
            title: 'Set to object',
            type: 'object',
          },
          fieldName: {
            title: 'Name of the property',
            type: 'string',
          },
          item: {
            title: 'Setting property object',
            type: 'object',
          },
        },
      },
      js: setPropertyAction,
      outputSchema: {
        type: 'object',
      },
    },
    setProperties: {
      description: 'Set a property to an object',
      longDescription: '',
      inputSchema: {
        type: 'object',
        properties: {
          setTo: {
            title: 'Set to object',
            type: 'object',
          },
          values: {
            title: 'Name of the property',
            type: 'string',
          },
        },
      },
      js: setPropertiesAction,
      outputSchema: {
        type: 'object',
      },
    },
    setReferenceTo: {
      description: 'Set a property to an object',
      longDescription: '',
      inputSchema: {
        type: 'object',
        properties: {
          items: {
            title: 'Items',
            type: 'array',
          },
          propertyName: {
            title: 'Name of the property',
            type: 'string',
          },
          setTo: {
            title: 'Setting property',
            type: 'string',
          },
        },
      },
      js: setReferenceToAction,
      outputSchema: {
        type: 'array',
      },
    },
    setValuesToItems: {
      description: 'Set a property to an object',
      longDescription: '',
      inputSchema: {
        type: 'object',
        properties: {
          items: {
            title: 'Items',
            type: 'array',
          },
          setValues: {
            type: 'array',
          },
        },
      },
      js: setValuesToItemsAction,
      outputSchema: {
        type: 'array',
      },
    },
    copyValueToNested: {
      description: 'Copy values of an object to its children',
      longDescription: '',
      inputSchema: {
        type: 'object',
        properties: {
          items: {
            title: 'Items',
            description: 'Items to do this operation on',
            type: 'array',
          },
          propertyPath: {
            title: 'Property Path',
            description: 'Path to the property from the current level',
            type: 'string',
          },
          copyValues: {
            title: 'From and to to Set to',
            description: 'Property name to set to',
            type: 'array',
          },
        },
      },
      js: copyValueToNestedAction,
      outputSchema: {
        type: 'object',
        description:
          "The array of items each with the property referred to by 'setTo' set with the property found in the path",
      },
    },
    pullUpAndSetReferenceTo: {
      description: 'Pulls up a property from same or down level and sets to a property at this level',
      longDescription: '',
      inputSchema: {
        type: 'object',
        properties: {
          items: {
            title: 'Items',
            description: 'Items to do this operation on',
            type: 'array',
          },
          propertyPath: {
            title: 'Property Path',
            description: 'Path to the property from the current level',
            type: 'string',
          },
          setTo: {
            title: 'Set To',
            description: 'Property name to set to',
            type: 'string',
          },
        },
      },
      js: pullUpAndSetReferenceToAction,
      outputSchema: {
        type: 'object',
        description:
          "The array of items each with the property referred to by 'setTo' set with the property found in the path",
      },
    },
    cloneAndExecuteForEach: {
      description: 'Clone the given items and execute the operations on them',
      longDescription: '',
      inputSchema: {
        type: 'object',
        properties: {
          items: {
            title: 'Array of items to execute the operation',
            type: 'array',
          },
          operations: {
            title: 'Array of operations to execute',
            type: 'array',
            items: {
              type: 'string',
            },
          },
        },
      },
      js: cloneAndExecuteForEachAction,
      outputSchema: {
        type: 'array',
        description: 'Items with field values matching to the given values',
      },
    },
    executeForEach: {
      description: 'Execute the operations on each item of an array',
      longDescription: '',
      inputSchema: {
        type: 'object',
        properties: {
          items: {
            title: 'Array of items to search',
            type: 'array',
          },
          operations: {
            title: 'Array of values to check',
            type: 'array',
            items: {
              type: 'string',
            },
          },
        },
      },
      js: executeForEachAction,
      outputSchema: {
        type: 'array',
        description: 'Items with field values matching to the given values',
      },
    },
    findItemsWithFieldValues: {
      description: 'Find the first item in the array with matching values from source object or values',
      longDescription: '',
      inputSchema: {
        type: 'object',
        properties: {
          items: {
            title: 'Array of items to search',
            type: 'array',
          },
          matchFields: {
            title: 'Array of values to check',
            type: 'array',
            items: {
              type: 'array',
            },
          },
        },
      },
      js: findItemsWithFieldValuesAction,
      outputSchema: {
        type: 'array',
        description: 'Items with field values matching to the given values',
      },
    },
    findItemsWithFieldValuesMatching: {
      description: 'Find the first item in the array with matching values from source object or values',
      longDescription: '',
      inputSchema: {
        type: 'object',
        properties: {
          items: {
            title: 'Array of items to search',
            type: 'array',
          },
          matchFields: {
            title: 'Array of values to check',
            type: 'array',
            items: {
              type: 'array',
            },
          },
        },
      },
      js: findItemsWithFieldValuesMatchingAction,
      outputSchema: {
        type: 'array',
        description: 'Items with field values matching to the given values',
      },
    },
    findMatch: {
      description: 'Find the first item in the array with matching values from source object and plain values',
      longDescription: '',
      inputSchema: {
        type: 'object',
        properties: {
          source: {
            title: 'Object to get match values from',
            type: 'object',
          },
          sourceFields: {
            title: 'Fields to search for, comma separated',
            type: 'string',
          },
          rawValues: {
            title: 'Extra values to be checked, not field values',
            type: 'string',
          },
          checkObjects: {
            title: 'Array of items to search',
            type: 'array',
          },
          matchFields: {
            title: 'Fields to match ',
            type: 'string',
          },
          matchVal: {
            title: 'Value to return if matches',
            type: 'string',
          },
          noMatchVal: {
            title: 'Value to return if no match found',
            type: 'string',
          },
        },
      },
      js: findMatchAction,
      outputSchema: {
        type: 'object',
        description: 'The first found property in any of the objects',
      },
    },
    findMatchingObject: {
      description: 'Find combination of values in the objects',
      longDescription: '',
      inputSchema: {
        type: 'object',
        properties: {
          source: {
            title: 'Object to get match values from',
            type: 'object',
          },
          sourceFields: {
            title: 'Fields to search for, comma separated',
            type: 'string',
          },
          checkObjects: {
            title: 'Array of items to search',
            type: 'array',
          },
          matchFields: {
            title: 'Fields to match ',
            type: 'string',
          },
        },
      },
      js: findMatchingObjectAction,
      outputSchema: {
        type: 'object',
        description: 'The first found property in any of the objects',
      },
    },
    findWithPrefernce: {
      description: 'Find values with preference to earlier ones',
      longDescription: '',
      inputSchema: {
        type: 'object',
        properties: {
          fields: {
            title: 'Fields to search for, comma separated',
            type: 'string',
          },
          objects: {
            title: 'Array of items to search',
            type: 'array',
          },
        },
      },
      js: findWithPrefernceAction,
      outputSchema: {
        type: 'object',
        description: 'The first found property in any of the objects',
      },
    },
    findWithPrefernceOrDefault: {
      description: 'Find values with preference to earlier ones',
      longDescription: '',
      inputSchema: {
        type: 'object',
        properties: {
          fields: {
            title: 'Fields to search for, comma separated',
            type: 'string',
          },
          objects: {
            title: 'Array of items to search',
            type: 'array',
          },
          defaultVal: {
            title: 'Default value to return',
            type: 'object',
          },
        },
      },
      js: findWithPrefernceOrDefaultAction,
      outputSchema: {
        type: 'object',
      },
    },
    mapNested: {
      description: 'Map',
      longDescription: '',
      inputSchema: {
        type: 'object',
        properties: {
          mapping: {
            title: 'Mapping',
            type: 'array',
            items: {
              type: 'object',
              properties: {
                items: {
                  title: 'Objects to add to the existing mapping objects',
                  type: 'array',
                },
                nestedPath: {
                  title: 'Path to the nested items',
                  type: 'string',
                },
                mapByField: {
                  title: 'Object field to map by',
                  type: 'string',
                },
                setToField: {
                  title: 'Result field to assign object to',
                  type: 'string',
                },
              },
            },
          },
        },
      },
      js: mapNestedAction,
      outputSchema: {
        type: 'object',
        description: 'An array of the input map with the input objects mapped for each item',
      },
    },
    mapToMap: {
      description: 'Map',
      longDescription: '',
      inputSchema: {
        type: 'object',
        properties: {
          mapping: {
            title: 'Mapping',
            type: 'array',
            items: {
              type: 'object',
              properties: {
                addToMap: {
                  title: 'Mapped array to include new objects',
                  type: 'array',
                },
                mapByField: {
                  title: 'Object field to map by',
                  type: 'string',
                },
                objects: {
                  title: 'Objects to add to the existing mapping objects',
                  type: 'array',
                },
                setToField: {
                  title: 'Result field to assign object to',
                  type: 'string',
                },
                refObject: {
                  title: 'Object to take the value to match with the map by field value of object',
                  type: 'string',
                },
                refProperty: {
                  title: 'Property to take the value from the refObject to match with the map by field value of object',
                  type: 'string',
                },
              },
            },
          },
        },
      },
      js: mapToMapAction,
      outputSchema: {
        type: 'object',
        description: 'An array of the input map with the input objects mapped for each item',
      },
    },
    copyProperties1: {
      description: 'Copy properties',
      longDescription: '',
      inputSchema: {
        type: 'object',
        properties: {
          source: {
            title: 'Source object to copy from',
            type: 'object',
          },
          destination: {
            title: 'Destination object to copy to',
            type: 'object',
          },
          fieldsMapping: {
            title: 'Field Mapping as [source_Field,destination_Field]',
            type: 'string',
          },
          rowSeparator: {
            title: 'Row separator for the fieldsMapping array',
            type: 'string',
          },
          columnSeparator: {
            title: 'Column separator for the fieldsMapping array',
            type: 'string',
          },
        },
      },
      js: copyProperties1Action,

      outputSchema: {
        type: 'object',
        description: 'Object with the properties defined in fieldsMapping copied from the source',
      },
    },
    copyPropertiesToItems: {
      description: 'Copy properties',
      longDescription: '',
      inputSchema: {
        type: 'object',
        properties: {
          source: {
            title: 'Source object to copy from',
            type: 'object',
          },
          destination: {
            title: 'Destination object to copy to',
            type: 'object',
          },
          fieldsMapping: {
            title: 'Field Mapping as [source_Field,destination_Field]',
            type: 'string',
          },
          rowSeparator: {
            title: 'Row separator for the fieldsMapping array',
            type: 'string',
          },
          columnSeparator: {
            title: 'Column separator for the fieldsMapping array',
            type: 'string',
          },
        },
      },
      js: copyPropertiesToItemsAction,
      outputSchema: {
        type: 'object',
      },
    },
    copyProperties: {
      description: 'Map',
      longDescription: '',
      inputSchema: {
        type: 'object',
        properties: {
          mapping: {
            title: 'Mapping',
            type: 'array',
            items: {
              type: 'object',
              properties: {
                source: {
                  title: 'Source object to copy from',
                  type: 'object',
                },
                destination: {
                  title: 'Destination object to copy to',
                  type: 'object',
                },
                fieldsMapping: {
                  title: 'Field Mapping as array of string array[source_Field,destination_Field]',
                  type: 'array',
                },
              },
            },
          },
        },
      },
      js: copyPropertiesAction,
      outputSchema: {
        type: 'object',
      },
    },
    createDetailTaxLine: {
      description: 'CreateDetailTaxLines',
      longDescription: 'Creates detail tax lines from TaxableLines',
      inputSchema: {
        type: 'object',
        properties: {
          taxableLine: {
            title: 'Create Detail TaxLines',
            type: 'object',
          },
          detailLinesArray: {
            title: 'Array of detail tax lines to push to',
            type: 'array',
          },
          internalOrganizationId: {
            title: 'LegalEntityId',
            type: 'string',
          },
          legalEntityId: {
            title: 'LegalEntityId',
            type: 'string',
          },
          errorMessageTypeFlag: {
            title: 'ErrorMessageTypeFlag',
            type: 'string',
          },
          errorString: {
            title: 'ErrorString',
            type: 'string',
          },
        },
      },
      js:createDetailTaxLineAction,

      outputSchema: {
        type: 'array',
        items: DetailTaxLineModel,
      },
    },
    createDetailTaxLinesNoTax: {
      description: 'CreateDetailTaxLines',
      longDescription: 'Creates detail tax lines from TaxableLines',
      inputSchema: {
        type: 'object',
        properties: {
          taxableLines: {
            title: 'Create Detail TaxLines',
            type: 'array',
          },
          internalOrganizationId: {
            title: 'InternalOrganizationId',
            type: 'string',
          },
          legalEntityId: {
            title: 'LegalEntityId',
            type: 'string',
          },
          errorMessageTypeFlag: {
            title: 'ErrorMessageTypeFlag',
            type: 'string',
          },
          errorString: {
            title: 'ErrorString',
            type: 'string',
          },
        },
      },
      js: createDetailTaxLinesNoTaxAction,

      outputSchema: {
        type: 'array',
        items: DetailTaxLineModel,
      },
    },
    convertToXMLResponse: {
      description: 'convertToXml',
      longDescription: '',
      inputSchema: {
        type: 'object',
        properties: {
          data: {
            title: 'Data',
          },
        },
      },
      js: convertToXMLResponseAction,
      outputSchema: {
        title: 'Data',
      },
    },
    parseXML: {
      description: 'Parse XML to Json',
      longDescription: 'Parses XML and returns JSON',
      inputSchema: {
        type: 'object',
        properties: {
          data: {
            title: 'Data',
          },
        },
      },
      js: parseXMLAction,
      outputSchema: {
        title: 'Data',
      },
    },
    convertToXmlAction: {
      description: 'Convert json to xml',
      longDescription: '',
      inputSchema: {
        type: 'object',
        properties: {
          data: {
            title: 'Data',
            type: 'object',
          },
        },
      },
      js: convertToXmlActions,
      outputSchema: {
        type: 'object',
        properties: {
          status: {
            type: 'integer',
          },
          headers: {
            type: 'object',
          },
          body: {
            type: 'object',
          },
        },
      },
    },
  },
  expressionFunctions:{},
};

const wsdl =
  '<?xml version=\'1.0\' encoding=\'UTF-8\'?>' +
  '<wsdl:definitions xmlns:wsdl="http://schemas.xmlsoap.org/wsdl/" xmlns:soap="http://schemas.xmlsoap.org/wsdl/soap/" xmlns:tns="http://smarterp.com/integration/services/fusion" targetNamespace="http://smarterp.com/integration/services/fusion">' +
  '<wsdl:types>' +
  '<xs:schema xmlns:xs="http://www.w3.org/2001/XMLSchema" elementFormDefault="qualified" targetNamespace="http://smarterp.com/integration/services/fusion">' +
  '<xs:complexType name="TaxableHeaders">' +
  '<xs:annotation>' +
  '<xs:appinfo>' +
  '<key>' +
  '<attribute>ApplicationId</attribute>' +
  '<attribute>EntityCode</attribute>' +
  '<attribute>EventClassCode</attribute>' +
  '<attribute>TrxId</attribute>' +
  '</key>' +
  '</xs:appinfo>' +
  '</xs:annotation>' +
  '<xs:sequence>' +
  '<xs:element minOccurs="1" name="ApplicationId" type="xs:long"/>' +
  '<xs:element minOccurs="0" name="ApplicationShortname" nillable="true" type="xs:string"/>' +
  '<xs:element minOccurs="0" name="BatchName" nillable="true" type="xs:string"/>' +
  '<xs:element minOccurs="0" name="BatchSourceName" nillable="true" type="xs:string"/>' +
  '<xs:element minOccurs="0" name="CtrlHdrTxApplFlag" nillable="true" type="xs:string"/>' +
  '<xs:element minOccurs="0" name="CtrlTotalHdrTxAmt" nillable="true" type="xs:decimal"/>' +
  '<xs:element minOccurs="0" name="CurrencyConversionDate" nillable="true" type="xs:date"/>' +
  '<xs:element minOccurs="0" name="CurrencyConversionRate" nillable="true" type="xs:decimal"/>' +
  '<xs:element minOccurs="0" name="CurrencyConversionType" nillable="true" type="xs:string"/>' +
  '<xs:element minOccurs="0" name="DefaultTaxationCountry" nillable="true" type="xs:string"/>' +
  '<xs:element minOccurs="0" name="DocEventStatus" nillable="true" type="xs:string"/>' +
  '<xs:element minOccurs="0" name="DocSeqName" nillable="true" type="xs:string"/>' +
  '<xs:element minOccurs="0" name="DocSeqValue" nillable="true" type="xs:string"/>' +
  '<xs:element minOccurs="0" name="DocumentSubType" nillable="true" type="xs:string"/>' +
  '<xs:element minOccurs="0" name="DocumentType" nillable="true" type="xs:string"/>' +
  '<xs:element minOccurs="1" name="EntityCode" type="xs:string"/>' +
  '<xs:element minOccurs="1" name="EventClassCode" type="xs:string"/>' +
  '<xs:element minOccurs="0" name="EstablishmentId" nillable="true" type="xs:long"/>' +
  '<xs:element minOccurs="0" name="EstablishmentNumber" nillable="true" type="xs:string"/>' +
  '<xs:element minOccurs="0" name="EventClassMappingId" nillable="true" type="xs:long"/>' +
  '<xs:element minOccurs="0" name="EventTypeCode" type="xs:string"/>' +
  '<xs:element minOccurs="0" name="EndPointUrl" type="xs:string"/>' +
  '<xs:element minOccurs="0" name="FirstPtyOrgId" nillable="true" type="xs:long"/>' +
  '<xs:element minOccurs="0" name="FirstPtyRegId" nillable="true" type="xs:long"/>' +
  '<xs:element minOccurs="0" name="FirstPtyRegNumber" nillable="true" type="xs:string"/>' +
  '<xs:element minOccurs="0" name="GlDate" nillable="true" type="xs:date"/>' +
  '<xs:element minOccurs="0" name="HdrTrxUserKey1" nillable="true" type="xs:string"/>' +
  '<xs:element minOccurs="0" name="HdrTrxUserKey2" nillable="true" type="xs:string"/>' +
  '<xs:element minOccurs="0" name="HdrTrxUserKey3" nillable="true" type="xs:string"/>' +
  '<xs:element minOccurs="0" name="HdrTrxUserKey4" nillable="true" type="xs:string"/>' +
  '<xs:element minOccurs="0" name="HdrTrxUserKey5" nillable="true" type="xs:string"/>' +
  '<xs:element minOccurs="0" name="HdrTrxUserKey6" nillable="true" type="xs:string"/>' +
  '<xs:element minOccurs="0" name="HistoricalFlag" nillable="true" type="xs:string"/>' +
  '<xs:element minOccurs="0" name="HqEstbPartyTaxProfId" nillable="true" type="xs:long"/>' +
  '<xs:element minOccurs="0" name="InternalOrgLocationId" nillable="true" type="xs:long"/>' +
  '<xs:element minOccurs="0" name="InternalOrganizationId" nillable="true" type="xs:long"/>' +
  '<xs:element minOccurs="0" name="LedgerId" nillable="true" type="xs:long"/>' +
  '<xs:element minOccurs="0" name="LegalEntityId" nillable="true" type="xs:long"/>' +
  '<xs:element minOccurs="0" name="LegalEntityNumber" nillable="true" type="xs:string"/>' +
  '<xs:element minOccurs="0" name="LogLevel" nillable="true" type="xs:string"/>' +
  '<xs:element minOccurs="0" name="PaymentMethod" nillable="true" type="xs:string"/>' +
  '<xs:element minOccurs="0" name="ReceivablesTrxTypeSeqId" nillable="true" type="xs:long"/>' +
  '<xs:element minOccurs="0" name="TaxInvoiceDate" nillable="true" type="xs:date"/>' +
  '<xs:element minOccurs="0" name="ShipFromSiteRegNumber" nillable="true" type="xs:string"/>' +
  '<xs:element minOccurs="0" name="TaxInvoiceNumber" nillable="true" type="xs:string"/>' +
  '<xs:element minOccurs="0" name="ThirdPtyRegId" nillable="true" type="xs:long"/>' +
  '<xs:element minOccurs="0" name="ThirdPtyRegNumber" nillable="true" type="xs:string"/>' +
  '<xs:element minOccurs="0" name="TrxCurrencyCode" nillable="true" type="xs:string"/>' +
  '<xs:element minOccurs="0" name="TrxDate" type="xs:date"/>' +
  '<xs:element minOccurs="0" name="TrxDescription" nillable="true" type="xs:string"/>' +
  '<xs:element minOccurs="0" name="TrxDocRevision" nillable="true" type="xs:string"/>' +
  '<xs:element minOccurs="0" name="TrxDueDate" nillable="true" type="xs:date"/>' +
  '<xs:element minOccurs="0" name="TrxHeaderAmt" nillable="true" type="xs:decimal"/>' +
  '<xs:element minOccurs="1" name="TrxId" type="xs:long"/>' +
  '<xs:element minOccurs="0" name="TrxLevelType" type="xs:string"/>' +
  '<xs:element minOccurs="0" name="TrxSource" nillable="true" type="xs:string"/>' +
  '<xs:element minOccurs="0" name="TrxNumber" nillable="true" type="xs:string"/>' +
  '</xs:sequence>' +
  '</xs:complexType>' +
  '<xs:complexType name="TaxableLineCollection">' +
  '<xs:sequence>' +
  '<xs:element maxOccurs="unbounded" minOccurs="1" name="TaxableLine" type="tns:TaxableLine"/>' +
  '</xs:sequence>' +
  '</xs:complexType>' +
  '<xs:complexType name="TaxableLine">' +
  '<xs:annotation>' +
  '<xs:appinfo>' +
  '<key>' +
  '<attribute>TrxId</attribute>' +
  '<attribute>TrxLevelType</attribute>' +
  '<attribute>TrxLineId</attribute>' +
  '<attribute>ApplicationId</attribute>' +
  '<attribute>EntityCode</attribute>' +
  '<attribute>EventClassCode</attribute>' +
  '</key>' +
  '</xs:appinfo>' +
  '</xs:annotation>' +
  '<xs:sequence>' +
  '<xs:element minOccurs="0" name="AccountCcid" nillable="true" type="xs:long"/>' +
  '<xs:element minOccurs="1" name="ApplicationId" type="xs:long"/>' +
  '<xs:element minOccurs="0" name="AccountString" nillable="true" type="xs:string"/>' +
  '<xs:element minOccurs="0" name="AccrueOnReceiptFlag" nillable="true" type="xs:string"/>' +
  '<xs:element minOccurs="0" name="AdjustedDocApplicationId" nillable="true" type="xs:long"/>' +
  '<xs:element minOccurs="0" name="AdjustedDocDate" nillable="true" type="xs:date"/>' +
  '<xs:element minOccurs="0" name="AdjustedDocEntityCode" nillable="true" type="xs:string"/>' +
  '<xs:element minOccurs="0" name="AdjustedDocEventClassCode" nillable="true" type="xs:string"/>' +
  '<xs:element minOccurs="0" name="AdjustedDocLineId" nillable="true" type="xs:long"/>' +
  '<xs:element minOccurs="0" name="AdjustedDocNumber" nillable="true" type="xs:string"/>' +
  '<xs:element minOccurs="0" name="AdjustedDocTrxId" nillable="true" type="xs:long"/>' +
  '<xs:element minOccurs="0" name="AdjustedDocTrxLevelType" nillable="true" type="xs:string"/>' +
  '<xs:element minOccurs="0" name="ApplicationDocStatus" nillable="true" type="xs:string"/>' +
  '<xs:element minOccurs="0" name="AppliedFromApplicationId" nillable="true" type="xs:long"/>' +
  '<xs:element minOccurs="0" name="AppliedFromEntityCode" nillable="true" type="xs:string"/>' +
  '<xs:element minOccurs="0" name="AppliedFromEventClassCode" nillable="true" type="xs:string"/>' +
  '<xs:element minOccurs="0" name="AppliedFromLineId" nillable="true" type="xs:long"/>' +
  '<xs:element minOccurs="0" name="AppliedFromTrxId" nillable="true" type="xs:long"/>' +
  '<xs:element minOccurs="0" name="AppliedFromTrxLevelType" nillable="true" type="xs:string"/>' +
  '<xs:element minOccurs="0" name="AppliedFromTrxNumber" nillable="true" type="xs:string"/>' +
  '<xs:element minOccurs="0" name="AppliedToApplicationId" nillable="true" type="xs:long"/>' +
  '<xs:element minOccurs="0" name="AppliedToEntityCode" nillable="true" type="xs:string"/>' +
  '<xs:element minOccurs="0" name="AppliedToEventClassCode" nillable="true" type="xs:string"/>' +
  '<xs:element minOccurs="0" name="AppliedToTrxId" nillable="true" type="xs:long"/>' +
  '<xs:element minOccurs="0" name="AppliedToTrxLevelType" nillable="true" type="xs:string"/>' +
  '<xs:element minOccurs="0" name="AppliedToTrxLineId" nillable="true" type="xs:long"/>' +
  '<xs:element minOccurs="0" name="AppliedToTrxNumber" nillable="true" type="xs:string"/>' +
  '<xs:element minOccurs="0" name="AssessableValue" nillable="true" type="xs:decimal"/>' +
  '<xs:element minOccurs="0" name="AssetFlag" nillable="true" type="xs:string"/>' +
  '<xs:element minOccurs="0" name="BillFromGeographyType1" nillable="true" type="xs:string"/>' +
  '<xs:element minOccurs="0" name="BillFromGeographyType10" nillable="true" type="xs:string"/>' +
  '<xs:element minOccurs="0" name="BillFromGeographyType2" nillable="true" type="xs:string"/>' +
  '<xs:element minOccurs="0" name="BillFromGeographyType3" nillable="true" type="xs:string"/>' +
  '<xs:element minOccurs="0" name="BillFromGeographyType4" nillable="true" type="xs:string"/>' +
  '<xs:element minOccurs="0" name="BillFromGeographyType5" nillable="true" type="xs:string"/>' +
  '<xs:element minOccurs="0" name="BillFromGeographyType6" nillable="true" type="xs:string"/>' +
  '<xs:element minOccurs="0" name="BillFromGeographyType7" nillable="true" type="xs:string"/>' +
  '<xs:element minOccurs="0" name="BillFromGeographyType8" nillable="true" type="xs:string"/>' +
  '<xs:element minOccurs="0" name="BillFromGeographyType9" nillable="true" type="xs:string"/>' +
  '<xs:element minOccurs="0" name="BillFromGeographyValue1" nillable="true" type="xs:string"/>' +
  '<xs:element minOccurs="0" name="BillFromGeographyValue10" nillable="true" type="xs:string"/>' +
  '<xs:element minOccurs="0" name="BillFromGeographyValue2" nillable="true" type="xs:string"/>' +
  '<xs:element minOccurs="0" name="BillFromGeographyValue3" nillable="true" type="xs:string"/>' +
  '<xs:element minOccurs="0" name="BillFromGeographyValue4" nillable="true" type="xs:string"/>' +
  '<xs:element minOccurs="0" name="BillFromGeographyValue5" nillable="true" type="xs:string"/>' +
  '<xs:element minOccurs="0" name="BillFromGeographyValue6" nillable="true" type="xs:string"/>' +
  '<xs:element minOccurs="0" name="BillFromGeographyValue7" nillable="true" type="xs:string"/>' +
  '<xs:element minOccurs="0" name="BillFromGeographyValue8" nillable="true" type="xs:string"/>' +
  '<xs:element minOccurs="0" name="BillFromGeographyValue9" nillable="true" type="xs:string"/>' +
  '<xs:element minOccurs="0" name="BillFromLocationId" nillable="true" type="xs:long"/>' +
  '<xs:element minOccurs="0" name="BillFromPartyName" nillable="true" type="xs:string"/>' +
  '<xs:element minOccurs="0" name="BillFromPartyNumber" nillable="true" type="xs:string"/>' +
  '<xs:element minOccurs="0" name="BillThirdPtyAcctId" nillable="true" type="xs:long"/>' +
  '<xs:element minOccurs="0" name="BillThirdPtyAcctSiteId" nillable="true" type="xs:long"/>' +
  '<xs:element minOccurs="0" name="BillToGeographyType1" nillable="true" type="xs:string"/>' +
  '<xs:element minOccurs="0" name="BillToGeographyType10" nillable="true" type="xs:string"/>' +
  '<xs:element minOccurs="0" name="BillToGeographyType2" nillable="true" type="xs:string"/>' +
  '<xs:element minOccurs="0" name="BillToGeographyType3" nillable="true" type="xs:string"/>' +
  '<xs:element minOccurs="0" name="BillToGeographyType4" nillable="true" type="xs:string"/>' +
  '<xs:element minOccurs="0" name="BillToGeographyType5" nillable="true" type="xs:string"/>' +
  '<xs:element minOccurs="0" name="BillToGeographyType6" nillable="true" type="xs:string"/>' +
  '<xs:element minOccurs="0" name="BillToGeographyType7" nillable="true" type="xs:string"/>' +
  '<xs:element minOccurs="0" name="BillToGeographyType8" nillable="true" type="xs:string"/>' +
  '<xs:element minOccurs="0" name="BillToGeographyType9" nillable="true" type="xs:string"/>' +
  '<xs:element minOccurs="0" name="BillToGeographyValue1" nillable="true" type="xs:string"/>' +
  '<xs:element minOccurs="0" name="BillToGeographyValue10" nillable="true" type="xs:string"/>' +
  '<xs:element minOccurs="0" name="BillToGeographyValue2" nillable="true" type="xs:string"/>' +
  '<xs:element minOccurs="0" name="BillToGeographyValue3" nillable="true" type="xs:string"/>' +
  '<xs:element minOccurs="0" name="BillToGeographyValue4" nillable="true" type="xs:string"/>' +
  '<xs:element minOccurs="0" name="BillToGeographyValue5" nillable="true" type="xs:string"/>' +
  '<xs:element minOccurs="0" name="BillToGeographyValue6" nillable="true" type="xs:string"/>' +
  '<xs:element minOccurs="0" name="BillToGeographyValue7" nillable="true" type="xs:string"/>' +
  '<xs:element minOccurs="0" name="BillToGeographyValue8" nillable="true" type="xs:string"/>' +
  '<xs:element minOccurs="0" name="BillToGeographyValue9" nillable="true" type="xs:string"/>' +
  '<xs:element minOccurs="0" name="BillToLocationId" nillable="true" type="xs:long"/>' +
  '<xs:element minOccurs="0" name="BillToPartyName" nillable="true" type="xs:string"/>' +
  '<xs:element minOccurs="0" name="BillToPartyNumber" nillable="true" type="xs:string"/>' +
  '<xs:element minOccurs="0" name="BillToSiteRegNumber" nillable="true" type="xs:string"/>' +
  '<xs:element minOccurs="0" name="CashDiscount" nillable="true" type="xs:decimal"/>' +
  '<xs:element minOccurs="0" name="ConsignItmUponRecptFlag" nillable="true" type="xs:string"/>' +
  '<xs:element minOccurs="0" name="ConsignedFlag" nillable="true" type="xs:string"/>' +
  '<xs:element minOccurs="0" name="CountryOfOriginCode" nillable="true" type="xs:string"/>' +
  '<xs:element minOccurs="0" name="CreditAccountCcid" nillable="true" type="xs:long"/>' +
  '<xs:element minOccurs="0" name="CreditMemoReasonCode" nillable="true" type="xs:string"/>' +
  '<xs:element minOccurs="0" name="CtrlTotalLineTxAmt" nillable="true" type="xs:decimal"/>' +
  '<xs:element minOccurs="0" name="CustomerName" nillable="true" type="xs:string"/>' +
  '<xs:element minOccurs="0" name="DebitAccountCcid" nillable="true" type="xs:long"/>' +
  '<xs:element minOccurs="0" name="DeliveryType" nillable="true" type="xs:string"/>' +
  '<xs:element minOccurs="0" name="DestinationTypeCode" nillable="true" type="xs:string"/>' +
  '<xs:element minOccurs="0" name="DropShipFlag" nillable="true" type="xs:string"/>' +
  '<xs:element minOccurs="0" name="DropshipTypeId" nillable="true" type="xs:long"/>' +
  '<xs:element minOccurs="1" name="EntityCode" type="xs:string"/>' +
  '<xs:element minOccurs="1" name="EventClassCode" type="xs:string"/>' +
  '<xs:element minOccurs="0" name="ExemptCertificateNumber" nillable="true" type="xs:string"/>' +
  '<xs:element minOccurs="0" name="ExemptReason" nillable="true" type="xs:string"/>' +
  '<xs:element minOccurs="0" name="ExemptReasonCode" nillable="true" type="xs:string"/>' +
  '<xs:element minOccurs="0" name="ExemptionControlFlag" nillable="true" type="xs:string"/>' +
  '<xs:element minOccurs="0" name="ExpenditureType" nillable="true" type="xs:string"/>' +
  '<xs:element minOccurs="0" name="ExpenditureTypeId" nillable="true" type="xs:long"/>' +
  '<xs:element minOccurs="0" name="FinalDischargeLocationId" nillable="true" type="xs:long"/>' +
  '<xs:element minOccurs="0" name="FinalTransactionNodeFlag" nillable="true" type="xs:string"/>' +
  '<xs:element minOccurs="0" name="FobPoint" nillable="true" type="xs:string"/>' +
  '<xs:element minOccurs="0" name="FosTransactionId" nillable="true" type="xs:long"/>' +
  '<xs:element minOccurs="0" name="InputTaxClassificationCode" nillable="true" type="xs:string"/>' +
  '<xs:element minOccurs="0" name="InsuranceCharge" nillable="true" type="xs:decimal"/>' +
  '<xs:element minOccurs="0" name="LineAmt" type="xs:decimal"/>' +
  '<xs:element minOccurs="0" name="LineAmtIncludesTaxFlag" type="xs:string"/>' +
  '<xs:element minOccurs="0" name="LineClass" nillable="true" type="xs:string"/>' +
  '<xs:element minOccurs="0" name="LineGroupId" nillable="true" type="xs:long"/>' +
  '<xs:element minOccurs="0" name="LineGroupNumber" nillable="true" type="xs:string"/>' +
  '<xs:element minOccurs="0" name="LineIntendedUse" nillable="true" type="xs:string"/>' +
  '<xs:element minOccurs="0" name="LineLevelAction" type="xs:string"/>' +
  '<xs:element minOccurs="0" name="LineTrxUserKey1" nillable="true" type="xs:string"/>' +
  '<xs:element minOccurs="0" name="LineTrxUserKey2" nillable="true" type="xs:string"/>' +
  '<xs:element minOccurs="0" name="LineTrxUserKey3" nillable="true" type="xs:string"/>' +
  '<xs:element minOccurs="0" name="LineTrxUserKey4" nillable="true" type="xs:string"/>' +
  '<xs:element minOccurs="0" name="LineTrxUserKey5" nillable="true" type="xs:string"/>' +
  '<xs:element minOccurs="0" name="LineTrxUserKey6" nillable="true" type="xs:string"/>' +
  '<xs:element minOccurs="0" name="LinesDetFactorId" nillable="true" type="xs:long"/>' +
  '<xs:element minOccurs="0" name="MatchType" nillable="true" type="xs:string"/>' +
  '<xs:element minOccurs="0" name="MerchantPartyCountry" nillable="true" type="xs:string"/>' +
  '<xs:element minOccurs="0" name="MerchantPartyDocumentNumber" nillable="true" type="xs:string"/>' +
  '<xs:element minOccurs="0" name="MerchantPartyId" nillable="true" type="xs:long"/>' +
  '<xs:element minOccurs="0" name="MerchantPartyName" nillable="true" type="xs:string"/>' +
  '<xs:element minOccurs="0" name="MerchantPartyReference" nillable="true" type="xs:string"/>' +
  '<xs:element minOccurs="0" name="MerchantPartyTaxRegNumber" nillable="true" type="xs:string"/>' +
  '<xs:element minOccurs="0" name="MerchantPartyTaxpayerId" nillable="true" type="xs:string"/>' +
  '<xs:element minOccurs="0" name="MinimumAccountableUnit" nillable="true" type="xs:decimal"/>' +
  '<xs:element minOccurs="0" name="MemoLineName" nillable="true" type="xs:string"/>' +
  '<xs:element minOccurs="0" name="OtherCharge" nillable="true" type="xs:decimal"/>' +
  '<xs:element minOccurs="0" name="OtherInclusiveTaxAmount" nillable="true" type="xs:decimal"/>' +
  '<xs:element minOccurs="0" name="OutputTaxClassificationCode" nillable="true" type="xs:string"/>' +
  '<xs:element minOccurs="0" name="OwnHqLocationId" nillable="true" type="xs:long"/>' +
  '<xs:element minOccurs="0" name="PackingCharge" nillable="true" type="xs:decimal"/>' +
  '<xs:element minOccurs="0" name="PayingLocationId" nillable="true" type="xs:long"/>' +
  '<xs:element minOccurs="0" name="PoaGeographyType1" nillable="true" type="xs:string"/>' +
  '<xs:element minOccurs="0" name="PoaGeographyType10" nillable="true" type="xs:string"/>' +
  '<xs:element minOccurs="0" name="PoaGeographyType2" nillable="true" type="xs:string"/>' +
  '<xs:element minOccurs="0" name="PoaGeographyType3" nillable="true" type="xs:string"/>' +
  '<xs:element minOccurs="0" name="PoaGeographyType4" nillable="true" type="xs:string"/>' +
  '<xs:element minOccurs="0" name="PoaGeographyType5" nillable="true" type="xs:string"/>' +
  '<xs:element minOccurs="0" name="PoaGeographyType6" nillable="true" type="xs:string"/>' +
  '<xs:element minOccurs="0" name="PoaGeographyType7" nillable="true" type="xs:string"/>' +
  '<xs:element minOccurs="0" name="PoaGeographyType8" nillable="true" type="xs:string"/>' +
  '<xs:element minOccurs="0" name="PoaGeographyType9" nillable="true" type="xs:string"/>' +
  '<xs:element minOccurs="0" name="PoaGeographyValue1" nillable="true" type="xs:string"/>' +
  '<xs:element minOccurs="0" name="PoaGeographyValue10" nillable="true" type="xs:string"/>' +
  '<xs:element minOccurs="0" name="PoaGeographyValue2" nillable="true" type="xs:string"/>' +
  '<xs:element minOccurs="0" name="PoaGeographyValue3" nillable="true" type="xs:string"/>' +
  '<xs:element minOccurs="0" name="PoaGeographyValue4" nillable="true" type="xs:string"/>' +
  '<xs:element minOccurs="0" name="PoaGeographyValue5" nillable="true" type="xs:string"/>' +
  '<xs:element minOccurs="0" name="PoaGeographyValue6" nillable="true" type="xs:string"/>' +
  '<xs:element minOccurs="0" name="PoaGeographyValue7" nillable="true" type="xs:string"/>' +
  '<xs:element minOccurs="0" name="PoaGeographyValue8" nillable="true" type="xs:string"/>' +
  '<xs:element minOccurs="0" name="PoaGeographyValue9" nillable="true" type="xs:string"/>' +
  '<xs:element minOccurs="0" name="PoaLocationId" nillable="true" type="xs:long"/>' +
  '<xs:element minOccurs="0" name="PoaPartyName" nillable="true" type="xs:string"/>' +
  '<xs:element minOccurs="0" name="PoaPartyNumber" nillable="true" type="xs:string"/>' +
  '<xs:element minOccurs="0" name="PocLocationId" nillable="true" type="xs:long"/>' +
  '<xs:element minOccurs="0" name="PodLocationId" nillable="true" type="xs:long"/>' +
  '<xs:element minOccurs="0" name="PoiLocationId" nillable="true" type="xs:long"/>' +
  '<xs:element minOccurs="0" name="PooGeographyType1" nillable="true" type="xs:string"/>' +
  '<xs:element minOccurs="0" name="PooGeographyType10" nillable="true" type="xs:string"/>' +
  '<xs:element minOccurs="0" name="PooGeographyType2" nillable="true" type="xs:string"/>' +
  '<xs:element minOccurs="0" name="PooGeographyType3" nillable="true" type="xs:string"/>' +
  '<xs:element minOccurs="0" name="PooGeographyType4" nillable="true" type="xs:string"/>' +
  '<xs:element minOccurs="0" name="PooGeographyType5" nillable="true" type="xs:string"/>' +
  '<xs:element minOccurs="0" name="PooGeographyType6" nillable="true" type="xs:string"/>' +
  '<xs:element minOccurs="0" name="PooGeographyType7" nillable="true" type="xs:string"/>' +
  '<xs:element minOccurs="0" name="PooGeographyType8" nillable="true" type="xs:string"/>' +
  '<xs:element minOccurs="0" name="PooGeographyType9" nillable="true" type="xs:string"/>' +
  '<xs:element minOccurs="0" name="PooGeographyValue1" nillable="true" type="xs:string"/>' +
  '<xs:element minOccurs="0" name="PooGeographyValue10" nillable="true" type="xs:string"/>' +
  '<xs:element minOccurs="0" name="PooGeographyValue2" nillable="true" type="xs:string"/>' +
  '<xs:element minOccurs="0" name="PooGeographyValue3" nillable="true" type="xs:string"/>' +
  '<xs:element minOccurs="0" name="PooGeographyValue4" nillable="true" type="xs:string"/>' +
  '<xs:element minOccurs="0" name="PooGeographyValue5" nillable="true" type="xs:string"/>' +
  '<xs:element minOccurs="0" name="PooGeographyValue6" nillable="true" type="xs:string"/>' +
  '<xs:element minOccurs="0" name="PooGeographyValue7" nillable="true" type="xs:string"/>' +
  '<xs:element minOccurs="0" name="PooGeographyValue8" nillable="true" type="xs:string"/>' +
  '<xs:element minOccurs="0" name="PooGeographyValue9" nillable="true" type="xs:string"/>' +
  '<xs:element minOccurs="0" name="PooLocationId" nillable="true" type="xs:long"/>' +
  '<xs:element minOccurs="0" name="PooPartyName" nillable="true" type="xs:string"/>' +
  '<xs:element minOccurs="0" name="PooPartyNumber" nillable="true" type="xs:string"/>' +
  '<xs:element minOccurs="0" name="Precision" nillable="true" type="xs:int"/>' +
  '<xs:element minOccurs="0" name="ProductCategory" nillable="true" type="xs:string"/>' +
  '<xs:element minOccurs="0" name="ProductCode" nillable="true" type="xs:string"/>' +
  '<xs:element minOccurs="0" name="ProductDescription" nillable="true" type="xs:string"/>' +
  '<xs:element minOccurs="0" name="ProductFiscClassification" nillable="true" type="xs:string"/>' +
  '<xs:element minOccurs="0" name="ProductId" nillable="true" type="xs:long"/>' +
  '<xs:element minOccurs="0" name="ProductOrgId" nillable="true" type="xs:long"/>' +
  '<xs:element minOccurs="0" name="ProductType" nillable="true" type="xs:string"/>' +
  '<xs:element minOccurs="0" name="ProvnlTaxDeterminationDate" nillable="true" type="xs:date"/>' +
  '<xs:element minOccurs="0" name="PseudoTrxLineFlag" nillable="true" type="xs:string"/>' +
  '<xs:element minOccurs="0" name="PurchaseBasis" nillable="true" type="xs:string"/>' +
  '<xs:element minOccurs="0" name="PurchasingCategoryId" nillable="true" type="xs:long"/>' +
  '<xs:element minOccurs="0" name="ProrateAcrossAllLinesFlag" nillable="true" type="xs:string"/>' +
  '<xs:element minOccurs="0" name="QuoteFlag" nillable="true" type="xs:string"/>' +
  '<xs:element minOccurs="0" name="ReceiptSourceCode" nillable="true" type="xs:string"/>' +
  '<xs:element minOccurs="0" name="RefDocApplicationId" nillable="true" type="xs:int"/>' +
  '<xs:element minOccurs="0" name="RefDocEntityCode" nillable="true" type="xs:string"/>' +
  '<xs:element minOccurs="0" name="RefDocEventClassCode" nillable="true" type="xs:string"/>' +
  '<xs:element minOccurs="0" name="RefDocLineId" nillable="true" type="xs:long"/>' +
  '<xs:element minOccurs="0" name="RefDocLineQuantity" nillable="true" type="xs:decimal"/>' +
  '<xs:element minOccurs="0" name="RefDocTrxId" nillable="true" type="xs:long"/>' +
  '<xs:element minOccurs="0" name="RefDocTrxLevelType" nillable="true" type="xs:string"/>' +
  '<xs:element minOccurs="0" name="RelatedDocApplicationId" nillable="true" type="xs:long"/>' +
  '<xs:element minOccurs="0" name="RelatedDocDate" nillable="true" type="xs:date"/>' +
  '<xs:element minOccurs="0" name="RelatedDocEntityCode" nillable="true" type="xs:string"/>' +
  '<xs:element minOccurs="0" name="RelatedDocEventClassCode" nillable="true" type="xs:string"/>' +
  '<xs:element minOccurs="0" name="RelatedDocNumber" nillable="true" type="xs:string"/>' +
  '<xs:element minOccurs="0" name="RelatedDocTrxId" nillable="true" type="xs:long"/>' +
  '<xs:element minOccurs="0" name="RequisitionType" nillable="true" type="xs:string"/>' +
  '<xs:element minOccurs="0" name="ShipFromGeographyType1" nillable="true" type="xs:string"/>' +
  '<xs:element minOccurs="0" name="ShipFromGeographyType10" nillable="true" type="xs:string"/>' +
  '<xs:element minOccurs="0" name="ShipFromGeographyType2" nillable="true" type="xs:string"/>' +
  '<xs:element minOccurs="0" name="ShipFromGeographyType3" nillable="true" type="xs:string"/>' +
  '<xs:element minOccurs="0" name="ShipFromGeographyType4" nillable="true" type="xs:string"/>' +
  '<xs:element minOccurs="0" name="ShipFromGeographyType5" nillable="true" type="xs:string"/>' +
  '<xs:element minOccurs="0" name="ShipFromGeographyType6" nillable="true" type="xs:string"/>' +
  '<xs:element minOccurs="0" name="ShipFromGeographyType7" nillable="true" type="xs:string"/>' +
  '<xs:element minOccurs="0" name="ShipFromGeographyType8" nillable="true" type="xs:string"/>' +
  '<xs:element minOccurs="0" name="ShipFromGeographyType9" nillable="true" type="xs:string"/>' +
  '<xs:element minOccurs="0" name="ShipFromGeographyValue1" nillable="true" type="xs:string"/>' +
  '<xs:element minOccurs="0" name="ShipFromGeographyValue10" nillable="true" type="xs:string"/>' +
  '<xs:element minOccurs="0" name="ShipFromGeographyValue2" nillable="true" type="xs:string"/>' +
  '<xs:element minOccurs="0" name="ShipFromGeographyValue3" nillable="true" type="xs:string"/>' +
  '<xs:element minOccurs="0" name="ShipFromGeographyValue4" nillable="true" type="xs:string"/>' +
  '<xs:element minOccurs="0" name="ShipFromGeographyValue5" nillable="true" type="xs:string"/>' +
  '<xs:element minOccurs="0" name="ShipFromGeographyValue6" nillable="true" type="xs:string"/>' +
  '<xs:element minOccurs="0" name="ShipFromGeographyValue7" nillable="true" type="xs:string"/>' +
  '<xs:element minOccurs="0" name="ShipFromGeographyValue8" nillable="true" type="xs:string"/>' +
  '<xs:element minOccurs="0" name="ShipFromGeographyValue9" nillable="true" type="xs:string"/>' +
  '<xs:element minOccurs="0" name="ShipFromLocationId" nillable="true" type="xs:long"/>' +
  '<xs:element minOccurs="0" name="ShipFromPartyName" nillable="true" type="xs:string"/>' +
  '<xs:element minOccurs="0" name="ShipFromPartyNumber" nillable="true" type="xs:string"/>' +
  '<xs:element minOccurs="0" name="ShipThirdPtyAcctId" nillable="true" type="xs:long"/>' +
  '<xs:element minOccurs="0" name="ShipThirdPtyAcctSiteId" nillable="true" type="xs:long"/>' +
  '<xs:element minOccurs="0" name="ShipToGeographyType1" nillable="true" type="xs:string"/>' +
  '<xs:element minOccurs="0" name="ShipToGeographyType10" nillable="true" type="xs:string"/>' +
  '<xs:element minOccurs="0" name="ShipToGeographyType2" nillable="true" type="xs:string"/>' +
  '<xs:element minOccurs="0" name="ShipToGeographyType3" nillable="true" type="xs:string"/>' +
  '<xs:element minOccurs="0" name="ShipToGeographyType4" nillable="true" type="xs:string"/>' +
  '<xs:element minOccurs="0" name="ShipToGeographyType5" nillable="true" type="xs:string"/>' +
  '<xs:element minOccurs="0" name="ShipToGeographyType6" nillable="true" type="xs:string"/>' +
  '<xs:element minOccurs="0" name="ShipToGeographyType7" nillable="true" type="xs:string"/>' +
  '<xs:element minOccurs="0" name="ShipToGeographyType8" nillable="true" type="xs:string"/>' +
  '<xs:element minOccurs="0" name="ShipToGeographyType9" nillable="true" type="xs:string"/>' +
  '<xs:element minOccurs="0" name="ShipToGeographyValue1" nillable="true" type="xs:string"/>' +
  '<xs:element minOccurs="0" name="ShipToGeographyValue10" nillable="true" type="xs:string"/>' +
  '<xs:element minOccurs="0" name="ShipToGeographyValue2" nillable="true" type="xs:string"/>' +
  '<xs:element minOccurs="0" name="ShipToGeographyValue3" nillable="true" type="xs:string"/>' +
  '<xs:element minOccurs="0" name="ShipToGeographyValue4" nillable="true" type="xs:string"/>' +
  '<xs:element minOccurs="0" name="ShipToGeographyValue5" nillable="true" type="xs:string"/>' +
  '<xs:element minOccurs="0" name="ShipToGeographyValue6" nillable="true" type="xs:string"/>' +
  '<xs:element minOccurs="0" name="ShipToGeographyValue7" nillable="true" type="xs:string"/>' +
  '<xs:element minOccurs="0" name="ShipToGeographyValue8" nillable="true" type="xs:string"/>' +
  '<xs:element minOccurs="0" name="ShipToGeographyValue9" nillable="true" type="xs:string"/>' +
  '<xs:element minOccurs="0" name="FinalDischargeGeographyType1" nillable="true" type="xs:string"/>' +
  '<xs:element minOccurs="0" name="FinalDischargeGeographyType10" nillable="true" type="xs:string"/>' +
  '<xs:element minOccurs="0" name="FinalDischargeGeographyType2" nillable="true" type="xs:string"/>' +
  '<xs:element minOccurs="0" name="FinalDischargeGeographyType3" nillable="true" type="xs:string"/>' +
  '<xs:element minOccurs="0" name="FinalDischargeGeographyType4" nillable="true" type="xs:string"/>' +
  '<xs:element minOccurs="0" name="FinalDischargeGeographyType5" nillable="true" type="xs:string"/>' +
  '<xs:element minOccurs="0" name="FinalDischargeGeographyType6" nillable="true" type="xs:string"/>' +
  '<xs:element minOccurs="0" name="FinalDischargeGeographyType7" nillable="true" type="xs:string"/>' +
  '<xs:element minOccurs="0" name="FinalDischargeGeographyType8" nillable="true" type="xs:string"/>' +
  '<xs:element minOccurs="0" name="FinalDischargeGeographyType9" nillable="true" type="xs:string"/>' +
  '<xs:element minOccurs="0" name="FinalDischargeGeographyValue1" nillable="true" type="xs:string"/>' +
  '<xs:element minOccurs="0" name="FinalDischargeGeographyValue10" nillable="true" type="xs:string"/>' +
  '<xs:element minOccurs="0" name="FinalDischargeGeographyValue2" nillable="true" type="xs:string"/>' +
  '<xs:element minOccurs="0" name="FinalDischargeGeographyValue3" nillable="true" type="xs:string"/>' +
  '<xs:element minOccurs="0" name="FinalDischargeGeographyValue4" nillable="true" type="xs:string"/>' +
  '<xs:element minOccurs="0" name="FinalDischargeGeographyValue5" nillable="true" type="xs:string"/>' +
  '<xs:element minOccurs="0" name="FinalDischargeGeographyValue6" nillable="true" type="xs:string"/>' +
  '<xs:element minOccurs="0" name="FinalDischargeGeographyValue7" nillable="true" type="xs:string"/>' +
  '<xs:element minOccurs="0" name="FinalDischargeGeographyValue8" nillable="true" type="xs:string"/>' +
  '<xs:element minOccurs="0" name="FinalDischargeGeographyValue9" nillable="true" type="xs:string"/>' +
  '<xs:element minOccurs="0" name="ShipToLocationId" nillable="true" type="xs:long"/>' +
  '<xs:element minOccurs="0" name="ShipToPartyName" nillable="true" type="xs:string"/>' +
  '<xs:element minOccurs="0" name="ShipToPartyNumber" nillable="true" type="xs:string"/>' +
  '<xs:element minOccurs="0" name="ShipmentType" nillable="true" type="xs:string"/>' +
  '<xs:element minOccurs="0" name="SourceApplicationId" nillable="true" type="xs:int"/>' +
  '<xs:element minOccurs="0" name="SourceEntityCode" nillable="true" type="xs:string"/>' +
  '<xs:element minOccurs="0" name="SourceEventClassCode" nillable="true" type="xs:string"/>' +
  '<xs:element minOccurs="0" name="SourceLineId" nillable="true" type="xs:long"/>' +
  '<xs:element minOccurs="0" name="SourceTaxLineId" nillable="true" type="xs:long"/>' +
  '<xs:element minOccurs="0" name="SourceTrxId" nillable="true" type="xs:long"/>' +
  '<xs:element minOccurs="0" name="SourceTrxLevelType" nillable="true" type="xs:string"/>' +
  '<xs:element minOccurs="0" name="StartExpenseDate" nillable="true" type="xs:date"/>' +
  '<xs:element minOccurs="0" name="SupplierExchangeRate" nillable="true" type="xs:decimal"/>' +
  '<xs:element minOccurs="0" name="SupplierTaxInvoiceDate" nillable="true" type="xs:date"/>' +
  '<xs:element minOccurs="0" name="SupplierTaxInvoiceNumber" nillable="true" type="xs:string"/>' +
  '<xs:element minOccurs="0" name="ShipToSiteRegNumber" nillable="true" type="xs:string"/>' +
  '<xs:element minOccurs="0" name="TaxCalcModeFlag" nillable="true" type="xs:string"/>' +
  '<xs:element minOccurs="0" name="TaxProcessingCompletedFlag" nillable="true" type="xs:string"/>' +
  '<xs:element minOccurs="0" name="TaxReportingFlag" nillable="true" type="xs:string"/>' +
  '<xs:element minOccurs="0" name="TitleTransferLocationId" nillable="true" type="xs:long"/>' +
  '<xs:element minOccurs="0" name="TradingDiscount" nillable="true" type="xs:decimal"/>' +
  '<xs:element minOccurs="0" name="TradingHqLocationId" nillable="true" type="xs:long"/>' +
  '<xs:element minOccurs="0" name="TransferCharge" nillable="true" type="xs:decimal"/>' +
  '<xs:element minOccurs="0" name="TransportationCharge" nillable="true" type="xs:decimal"/>' +
  '<xs:element minOccurs="0" name="TrxBusinessCategory" nillable="true" type="xs:string"/>' +
  '<xs:element minOccurs="0" name="TrxCommunicatedDate" nillable="true" type="xs:date"/>' +
  '<xs:element minOccurs="1" name="TrxId" type="xs:long"/>' +
  '<xs:element minOccurs="0" name="TrxLineCurrencyCode" nillable="true" type="xs:string"/>' +
  '<xs:element minOccurs="0" name="TrxLineCurrencyConvDate" nillable="true" type="xs:date"/>' +
  '<xs:element minOccurs="0" name="TrxLineCurrencyConvRate" nillable="true" type="xs:decimal"/>' +
  '<xs:element minOccurs="0" name="TrxLineCurrencyConvType" nillable="true" type="xs:string"/>' +
  '<xs:element minOccurs="0" name="TrxLineDate" nillable="true" type="xs:date"/>' +
  '<xs:element minOccurs="0" name="TrxLineDescription" nillable="true" type="xs:string"/>' +
  '<xs:element minOccurs="0" name="TrxLineGlDate" nillable="true" type="xs:date"/>' +
  '<xs:element minOccurs="1" name="TrxLineId" type="xs:long"/>' +
  '<xs:element minOccurs="0" name="TrxLineMau" nillable="true" type="xs:decimal"/>' +
  '<xs:element minOccurs="0" name="TrxLineNumber" nillable="true" type="xs:int"/>' +
  '<xs:element minOccurs="0" name="TrxLinePrecision" nillable="true" type="xs:int"/>' +
  '<xs:element minOccurs="0" name="TrxLineQuantity" nillable="true" type="xs:decimal"/>' +
  '<xs:element minOccurs="0" name="TrxLineType" nillable="true" type="xs:string"/>' +
  '<xs:element minOccurs="1" name="TrxLevelType" type="xs:string"/>' +
  '<xs:element minOccurs="0" name="TrxReceiptDate" nillable="true" type="xs:date"/>' +
  '<xs:element minOccurs="0" name="TrxShippingDate" nillable="true" type="xs:date"/>' +
  '<xs:element minOccurs="0" name="TrxSicCode" nillable="true" type="xs:string"/>' +
  '<xs:element minOccurs="0" name="TrxTypeDescription" nillable="true" type="xs:string"/>' +
  '<xs:element minOccurs="0" name="TrxWaybillNumber" nillable="true" type="xs:string"/>' +
  '<xs:element minOccurs="0" name="UnitPrice" nillable="true" type="xs:decimal"/>' +
  '<xs:element minOccurs="0" name="UomCode" nillable="true" type="xs:string"/>' +
  '<xs:element minOccurs="0" name="UserDefinedFiscClass" nillable="true" type="xs:string"/>' +
  '<xs:element minOccurs="0" name="VolumeDiscount" nillable="true" type="xs:decimal"/>' +
  '<xs:element minOccurs="0" name="ProjectId" nillable="true" type="xs:long"/>' +
  '<xs:element minOccurs="0" name="TaskId" nillable="true" type="xs:long"/>' +
  '<xs:element minOccurs="0" name="PoNumber" nillable="true" type="xs:string"/>' +
  '<xs:element minOccurs="0" name="VendorTypeLookupCode" nillable="true" type="xs:string"/>' +
  '<xs:element minOccurs="0" name="VendorNumber" nillable="true" type="xs:string"/>' +
  '</xs:sequence>' +
  '</xs:complexType>' +
  '<xs:complexType name="DetailTaxLineCollection">' +
  '<xs:sequence>' +
  '<xs:element maxOccurs="unbounded" minOccurs="1" name="DetailTaxLines" type="tns:DetailTaxLine"/>' +
  '</xs:sequence>' +
  '</xs:complexType>' +
  '<xs:complexType name="DetailTaxLine">' +
  '<xs:annotation>' +
  '<xs:appinfo>' +
  '<key>' +
  '<attribute>ApplicationId</attribute>' +
  '<attribute>EntityCode</attribute>' +
  '<attribute>EventClassCode</attribute>' +
  '<attribute>TrxId</attribute>' +
  '<attribute>TrxLineId</attribute>' +
  '<attribute>TrxLevelType</attribute>' +
  '<attribute>TaxRegimeCode</attribute>' +
  '<attribute>Tax</attribute>' +
  '<attribute>TaxApportionmentLineNumber</attribute>' +
  '</key>' +
  '</xs:appinfo>' +
  '</xs:annotation>' +
  '<xs:sequence>' +
  '<xs:element minOccurs="0" name="AdditionalInformation" nillable="true" type="xs:string"/>' +
  '<xs:element minOccurs="1" name="ApplicationId" type="xs:long"/>' +
  '<xs:element minOccurs="0" name="Attribute1" nillable="true" type="xs:string"/>' +
  '<xs:element minOccurs="0" name="Attribute10" nillable="true" type="xs:string"/>' +
  '<xs:element minOccurs="0" name="Attribute11" nillable="true" type="xs:string"/>' +
  '<xs:element minOccurs="0" name="Attribute12" nillable="true" type="xs:string"/>' +
  '<xs:element minOccurs="0" name="Attribute13" nillable="true" type="xs:string"/>' +
  '<xs:element minOccurs="0" name="Attribute14" nillable="true" type="xs:string"/>' +
  '<xs:element minOccurs="0" name="Attribute15" nillable="true" type="xs:string"/>' +
  '<xs:element minOccurs="0" name="Attribute2" nillable="true" type="xs:string"/>' +
  '<xs:element minOccurs="0" name="Attribute3" nillable="true" type="xs:string"/>' +
  '<xs:element minOccurs="0" name="Attribute4" nillable="true" type="xs:string"/>' +
  '<xs:element minOccurs="0" name="Attribute5" nillable="true" type="xs:string"/>' +
  '<xs:element minOccurs="0" name="Attribute6" nillable="true" type="xs:string"/>' +
  '<xs:element minOccurs="0" name="Attribute7" nillable="true" type="xs:string"/>' +
  '<xs:element minOccurs="0" name="Attribute8" nillable="true" type="xs:string"/>' +
  '<xs:element minOccurs="0" name="Attribute9" nillable="true" type="xs:string"/>' +
  '<xs:element minOccurs="0" name="AttributeCategory" nillable="true" type="xs:string"/>' +
  '<xs:element minOccurs="0" name="AttributeDate1" nillable="true" type="xs:date"/>' +
  '<xs:element minOccurs="0" name="AttributeDate2" nillable="true" type="xs:date"/>' +
  '<xs:element minOccurs="0" name="AttributeDate3" nillable="true" type="xs:date"/>' +
  '<xs:element minOccurs="0" name="AttributeDate4" nillable="true" type="xs:date"/>' +
  '<xs:element minOccurs="0" name="AttributeDate5" nillable="true" type="xs:date"/>' +
  '<xs:element minOccurs="0" name="AttributeNumber1" nillable="true" type="xs:decimal"/>' +
  '<xs:element minOccurs="0" name="AttributeNumber2" nillable="true" type="xs:decimal"/>' +
  '<xs:element minOccurs="0" name="AttributeNumber3" nillable="true" type="xs:decimal"/>' +
  '<xs:element minOccurs="0" name="AttributeNumber4" nillable="true" type="xs:decimal"/>' +
  '<xs:element minOccurs="0" name="AttributeNumber5" nillable="true" type="xs:decimal"/>' +
  '<xs:element minOccurs="0" name="CalTaxAmt" nillable="true" type="xs:decimal"/>' +
  '<xs:element minOccurs="0" name="CalTaxAmtTaxCurr" nillable="true" type="xs:decimal"/>' +
  '<xs:element minOccurs="0" name="CalTaxableAmt" nillable="true" type="xs:decimal"/>' +
  '<xs:element minOccurs="0" name="CancelFlag" nillable="true" type="xs:string"/>' +
  '<xs:element minOccurs="0" name="Char1" nillable="true" type="xs:string"/>' +
  '<xs:element minOccurs="0" name="Char10" nillable="true" type="xs:string"/>' +
  '<xs:element minOccurs="0" name="Char2" nillable="true" type="xs:string"/>' +
  '<xs:element minOccurs="0" name="Char3" nillable="true" type="xs:string"/>' +
  '<xs:element minOccurs="0" name="Char4" nillable="true" type="xs:string"/>' +
  '<xs:element minOccurs="0" name="Char5" nillable="true" type="xs:string"/>' +
  '<xs:element minOccurs="0" name="Char6" nillable="true" type="xs:string"/>' +
  '<xs:element minOccurs="0" name="Char7" nillable="true" type="xs:string"/>' +
  '<xs:element minOccurs="0" name="Char8" nillable="true" type="xs:string"/>' +
  '<xs:element minOccurs="0" name="Char9" nillable="true" type="xs:string"/>' +
  '<xs:element minOccurs="0" name="CompoundingTaxFlag" nillable="true" type="xs:string"/>' +
  '<xs:element minOccurs="0" name="CopiedFromOtherDocFlag" nillable="true" type="xs:string"/>' +
  '<xs:element minOccurs="0" name="CurrencyConversionDate" nillable="true" type="xs:date"/>' +
  '<xs:element minOccurs="0" name="CurrencyConversionRate" nillable="true" type="xs:decimal"/>' +
  '<xs:element minOccurs="0" name="CurrencyConversionType" nillable="true" type="xs:string"/>' +
  '<xs:element minOccurs="0" name="Date1" nillable="true" type="xs:date"/>' +
  '<xs:element minOccurs="0" name="Date10" nillable="true" type="xs:date"/>' +
  '<xs:element minOccurs="0" name="Date2" nillable="true" type="xs:date"/>' +
  '<xs:element minOccurs="0" name="Date3" nillable="true" type="xs:date"/>' +
  '<xs:element minOccurs="0" name="Date4" nillable="true" type="xs:date"/>' +
  '<xs:element minOccurs="0" name="Date5" nillable="true" type="xs:date"/>' +
  '<xs:element minOccurs="0" name="Date6" nillable="true" type="xs:date"/>' +
  '<xs:element minOccurs="0" name="Date7" nillable="true" type="xs:date"/>' +
  '<xs:element minOccurs="0" name="Date8" nillable="true" type="xs:date"/>' +
  '<xs:element minOccurs="0" name="Date9" nillable="true" type="xs:date"/>' +
  '<xs:element minOccurs="0" name="DeleteFlag" nillable="true" type="xs:string"/>' +
  '<xs:element minOccurs="1" name="EntityCode" type="xs:string"/>' +
  '<xs:element minOccurs="0" name="ErrorString" type="xs:string"/>' +
  '<xs:element minOccurs="0" name="ErrorMessageCode" type="xs:string"/>' +
  '<xs:element minOccurs="0" name="ErrorMessageTypeFlag" type="xs:string"/>' +
  '<xs:element minOccurs="1" name="EventClassCode" type="xs:string"/>' +
  '<xs:element minOccurs="0" name="ExceptionRate" nillable="true" type="xs:decimal"/>' +
  '<xs:element minOccurs="0" name="ExemptCertificateNumber" nillable="true" type="xs:string"/>' +
  '<xs:element minOccurs="0" name="ExemptRateModifier" nillable="true" type="xs:decimal"/>' +
  '<xs:element minOccurs="0" name="ExemptReason" nillable="true" type="xs:string"/>' +
  '<xs:element minOccurs="0" name="ExemptReasonCode" nillable="true" type="xs:string"/>' +
  '<xs:element minOccurs="1" name="InternalOrganizationId" type="xs:long"/>' +
  '<xs:element minOccurs="0" name="LedgerId" nillable="true" type="xs:long"/>' +
  '<xs:element minOccurs="0" name="LegalEntityId" nillable="true" type="xs:long"/>' +
  '<xs:element minOccurs="0" name="LegalJustificationText1" nillable="true" type="xs:string"/>' +
  '<xs:element minOccurs="0" name="LegalJustificationText2" nillable="true" type="xs:string"/>' +
  '<xs:element minOccurs="0" name="LegalJustificationText3" nillable="true" type="xs:string"/>' +
  '<xs:element minOccurs="0" name="LegalMessageAppl2" nillable="true" type="xs:string"/>' +
  '<xs:element minOccurs="0" name="LegalMessageBasis" nillable="true" type="xs:string"/>' +
  '<xs:element minOccurs="0" name="LegalMessageCalc" nillable="true" type="xs:string"/>' +
  '<xs:element minOccurs="0" name="LegalMessageExcpt" nillable="true" type="xs:string"/>' +
  '<xs:element minOccurs="0" name="LegalMessageExmpt" nillable="true" type="xs:string"/>' +
  '<xs:element minOccurs="0" name="LegalMessagePos" nillable="true" type="xs:string"/>' +
  '<xs:element minOccurs="0" name="LegalMessageStatus" nillable="true" type="xs:string"/>' +
  '<xs:element minOccurs="0" name="LegalMessageRate" nillable="true" type="xs:string"/>' +
  '<xs:element minOccurs="0" name="LegalMessageThreshold" nillable="true" type="xs:string"/>' +
  '<xs:element minOccurs="0" name="LegalMessageTrn" nillable="true" type="xs:string"/>' +
  '<xs:element minOccurs="0" name="LegalReportingStatus" nillable="true" type="xs:string"/>' +
  '<xs:element minOccurs="0" name="LineAmt" nillable="true" type="xs:decimal"/>' +
  '<xs:element minOccurs="0" name="LineAssessableValue" nillable="true" type="xs:decimal"/>' +
  '<xs:element minOccurs="0" name="ManuallyEnteredFlag" nillable="true" type="xs:string"/>' +
  '<xs:element minOccurs="0" name="MessageCause" nillable="true" type="xs:string"/>' +
  '<xs:element minOccurs="0" name="MessageUserAction" nillable="true" type="xs:string"/>' +
  '<xs:element minOccurs="0" name="MinimumAccountableUnit" nillable="true" type="xs:decimal"/>' +
  '<xs:element minOccurs="0" name="Numeric1" nillable="true" type="xs:int"/>' +
  '<xs:element minOccurs="0" name="Numeric10" nillable="true" type="xs:int"/>' +
  '<xs:element minOccurs="0" name="Numeric2" nillable="true" type="xs:int"/>' +
  '<xs:element minOccurs="0" name="Numeric3" nillable="true" type="xs:int"/>' +
  '<xs:element minOccurs="0" name="Numeric4" nillable="true" type="xs:int"/>' +
  '<xs:element minOccurs="0" name="Numeric5" nillable="true" type="xs:int"/>' +
  '<xs:element minOccurs="0" name="Numeric6" nillable="true" type="xs:int"/>' +
  '<xs:element minOccurs="0" name="Numeric7" nillable="true" type="xs:int"/>' +
  '<xs:element minOccurs="0" name="Numeric8" nillable="true" type="xs:int"/>' +
  '<xs:element minOccurs="0" name="Numeric9" nillable="true" type="xs:int"/>' +
  '<xs:element minOccurs="0" name="OffsetFlag" nillable="true" type="xs:string"/>' +
  '<xs:element minOccurs="0" name="OffsetTaxRateCode" nillable="true" type="xs:string"/>' +
  '<xs:element minOccurs="0" name="OtherDocLineAmt" nillable="true" type="xs:decimal"/>' +
  '<xs:element minOccurs="0" name="OtherDocLineTaxAmt" nillable="true" type="xs:decimal"/>' +
  '<xs:element minOccurs="0" name="OtherDocLineTaxableAmt" nillable="true" type="xs:decimal"/>' +
  '<xs:element minOccurs="0" name="OtherDocSource" nillable="true" type="xs:string"/>' +
  '<xs:element minOccurs="0" name="OverriddenFlag" nillable="true" type="xs:string"/>' +
  '<xs:element minOccurs="0" name="PlaceOfSupplyTypeCode" nillable="true" type="xs:string"/>' +
  '<xs:element minOccurs="0" name="Precision" nillable="true" type="xs:int"/>' +
  '<xs:element minOccurs="0" name="ProrationCode" nillable="true" type="xs:string"/>' +
  '<xs:element minOccurs="0" name="ProviderRecRate" nillable="true" type="xs:decimal"/>' +
  '<xs:element minOccurs="0" name="ProviderRecRateCode" nillable="true" type="xs:string"/>' +
  '<xs:element minOccurs="0" name="ReportableFlag" nillable="true" type="xs:string"/>' +
  '<xs:element minOccurs="0" name="ReportingOnlyFlag" nillable="true" type="xs:string"/>' +
  '<xs:element minOccurs="0" name="RoundingLevelCode" nillable="true" type="xs:string"/>' +
  '<xs:element minOccurs="0" name="RoundingRuleCode" nillable="true" type="xs:string"/>' +
  '<xs:element minOccurs="0" name="RegistrationPartyType" nillable="true" type="xs:string"/>' +
  '<xs:element minOccurs="0" name="SelfAssessedFlag" nillable="true" type="xs:string"/>' +
  '<xs:element minOccurs="1" name="Tax" nillable="true" type="xs:string"/>' +
  '<xs:element minOccurs="0" name="TaxAmt" nillable="true" type="xs:decimal"/>' +
  '<xs:element minOccurs="0" name="TaxAmtIncludedFlag" nillable="true" type="xs:string"/>' +
  '<xs:element minOccurs="0" name="TaxAmtTaxCurr" nillable="true" type="xs:decimal"/>' +
  '<xs:element minOccurs="1" name="TaxApportionmentLineNumber" nillable="true" type="xs:int"/>' +
  '<xs:element minOccurs="0" name="TaxCurrencyCode" nillable="true" type="xs:string"/>' +
  '<xs:element minOccurs="0" name="TaxCurrencyConversionDate" nillable="true" type="xs:date"/>' +
  '<xs:element minOccurs="0" name="TaxCurrencyConversionRate" nillable="true" type="xs:decimal"/>' +
  '<xs:element minOccurs="0" name="TaxCurrencyConversionType" nillable="true" type="xs:string"/>' +
  '<xs:element minOccurs="0" name="TaxDate" nillable="true" type="xs:date"/>' +
  '<xs:element minOccurs="0" name="TaxDetermineDate" nillable="true" type="xs:date"/>' +
  '<xs:element minOccurs="0" name="TaxHoldCode" nillable="true" type="xs:int"/>' +
  '<xs:element minOccurs="0" name="TaxHoldReason" nillable="true" type="xs:string"/>' +
  '<xs:element minOccurs="0" name="TaxHoldReleasedCode" nillable="true" type="xs:int"/>' +
  '<xs:element minOccurs="0" name="TaxJurisdictionCode" nillable="true" type="xs:string"/>' +
  '<xs:element minOccurs="0" name="TaxJurisdictionName" nillable="true" type="xs:string"/>' +
  '<xs:element minOccurs="0" name="TaxLineId" type="xs:long"/>' +
  '<xs:element minOccurs="0" name="TaxLineNumber" type="xs:int"/>' +
  '<xs:element minOccurs="0" name="TaxOnlyLineFlag" nillable="true" type="xs:string"/>' +
  '<xs:element minOccurs="0" name="TaxPointBasis" nillable="true" type="xs:string"/>' +
  '<xs:element minOccurs="0" name="TaxRate" nillable="true" type="xs:decimal"/>' +
  '<xs:element minOccurs="0" name="TaxRateBeforeException" nillable="true" type="xs:decimal"/>' +
  '<xs:element minOccurs="0" name="TaxRateBeforeExemption" nillable="true" type="xs:decimal"/>' +
  '<xs:element minOccurs="0" name="TaxRateCode" nillable="true" type="xs:string"/>' +
  '<xs:element minOccurs="0" name="TaxRateNameBeforeException" nillable="true" type="xs:string"/>' +
  '<xs:element minOccurs="0" name="TaxRateNameBeforeExemption" nillable="true" type="xs:string"/>' +
  '<xs:element minOccurs="0" name="TaxRateType" nillable="true" type="xs:string"/>' +
  '<xs:element minOccurs="1" name="TaxRegimeCode" nillable="true" type="xs:string"/>' +
  '<xs:element minOccurs="0" name="TaxRegistrationNumber" nillable="true" type="xs:string"/>' +
  '<xs:element minOccurs="0" name="TaxStatusCode" nillable="true" type="xs:string"/>' +
  '<xs:element minOccurs="0" name="TaxableAmt" nillable="true" type="xs:decimal"/>' +
  '<xs:element minOccurs="0" name="TaxableAmtTaxCurr" nillable="true" type="xs:decimal"/>' +
  '<xs:element minOccurs="0" name="TrxCurrencyCode" nillable="true" type="xs:string"/>' +
  '<xs:element minOccurs="0" name="TrxDate" nillable="true" type="xs:date"/>' +
  '<xs:element minOccurs="1" name="TrxId" type="xs:long"/>' +
  '<xs:element minOccurs="1" name="TrxLevelType" type="xs:string"/>' +
  '<xs:element minOccurs="1" name="TrxLineId" type="xs:long"/>' +
  '<xs:element minOccurs="0" name="TrxLineNumber" nillable="true" type="xs:int"/>' +
  '<xs:element minOccurs="0" name="TaxLineGroupId" nillable="true" type="xs:long"/>' +
  '<xs:element minOccurs="0" name="ThresholdIndicatorFlag" nillable="true" type="xs:string"/>' +
  '<xs:element minOccurs="0" name="UnroundedTaxAmt" nillable="true" type="xs:decimal"/>' +
  '<xs:element minOccurs="0" name="UnroundedTaxableAmt" nillable="true" type="xs:decimal"/>' +
  '</xs:sequence>' +
  '</xs:complexType>' +
  '<xs:complexType name="Void">' +
  '<xs:sequence>' +
  '<xs:element minOccurs="0" name="ErrorString" type="xs:string"/>' +
  '<xs:element minOccurs="0" name="ErrorMessageCode" type="xs:string"/>' +
  '</xs:sequence>' +
  '</xs:complexType>' +
  '<xs:complexType name="RejectionStatus">' +
  '<xs:sequence>' +
  '<xs:element minOccurs="1" name="Success" type="xs:boolean"/>' +
  '<xs:element minOccurs="0" name="ErrorString" type="xs:string"/>' +
  '<xs:element minOccurs="0" name="ErrorMessageCode" type="xs:string"/>' +
  '</xs:sequence>' +
  '</xs:complexType>' +
  '<xs:element name="CalculationRequest">' +
  '<xs:complexType>' +
  '<xs:sequence>' +
  '<xs:element minOccurs="1" name="taxableHeaders" type="tns:TaxableHeaders"/>' +
  '<xs:element maxOccurs="1" minOccurs="1" name="taxableLines" type="tns:TaxableLineCollection"/>' +
  '<xs:element maxOccurs="1" minOccurs="0" name="detailTaxLines" type="tns:DetailTaxLineCollection"/>' +
  '</xs:sequence>' +
  '</xs:complexType>' +
  '</xs:element>' +
  '<xs:element name="CalculationResponse">' +
  '<xs:complexType>' +
  '<xs:sequence>' +
  '<xs:element maxOccurs="1" minOccurs="1" name="detailTaxLines" type="tns:DetailTaxLineCollection"/>' +
  '</xs:sequence>' +
  '</xs:complexType>' +
  '</xs:element>' +
  '<xs:element name="RejectionRequest">' +
  '<xs:complexType>' +
  '<xs:sequence>' +
  '<xs:element minOccurs="1" name="taxableHeaders" type="tns:TaxableHeaders"/>' +
  '<xs:element maxOccurs="1" minOccurs="1" name="taxableLines" type="tns:TaxableLineCollection"/>' +
  '<xs:element maxOccurs="1" minOccurs="0" name="detailTaxLines" type="tns:DetailTaxLineCollection"/>' +
  '</xs:sequence>' +
  '</xs:complexType>' +
  '</xs:element>' +
  '<xs:element name="RejectionResponse">' +
  '<xs:complexType>' +
  '<xs:sequence>' +
  '<xs:element maxOccurs="1" minOccurs="1" name="rejectionStatus" type="tns:RejectionStatus"/>' +
  '</xs:sequence>' +
  '</xs:complexType>' +
  '</xs:element>' +
  '<xs:element name="UpdateRequest">' +
  '<xs:complexType>' +
  '<xs:sequence>' +
  '<xs:element minOccurs="1" name="taxableHeaders" type="tns:TaxableHeaders"/>' +
  '<xs:element maxOccurs="1" minOccurs="1" name="taxableLines" type="tns:TaxableLineCollection"/>' +
  '<xs:element maxOccurs="1" minOccurs="0" name="detailTaxLines" type="tns:DetailTaxLineCollection"/>' +
  '</xs:sequence>' +
  '</xs:complexType>' +
  '</xs:element>' +
  '<xs:element name="UpdateResponse">' +
  '<xs:complexType>' +
  '<xs:sequence>' +
  '<xs:element maxOccurs="1" name="void" type="tns:Void"/>' +
  '</xs:sequence>' +
  '</xs:complexType>' +
  '</xs:element>' +
  '<xs:element name="CancellationRequest">' +
  '<xs:complexType>' +
  '<xs:sequence>' +
  '<xs:element minOccurs="1" name="taxableHeaders" type="tns:TaxableHeaders"/>' +
  '</xs:sequence>' +
  '</xs:complexType>' +
  '</xs:element>' +
  '<xs:element name="CancellationResponse">' +
  '<xs:complexType>' +
  '<xs:sequence>' +
  '<xs:element maxOccurs="1" name="void" type="tns:Void"/>' +
  '</xs:sequence>' +
  '</xs:complexType>' +
  '</xs:element>' +
  '<xs:element name="DeletionRequest">' +
  '<xs:complexType>' +
  '<xs:sequence>' +
  '<xs:element minOccurs="1" name="taxableHeaders" type="tns:TaxableHeaders"/>' +
  '</xs:sequence>' +
  '</xs:complexType>' +
  '</xs:element>' +
  '<xs:element name="DeletionResponse">' +
  '<xs:complexType>' +
  '<xs:sequence>' +
  '<xs:element maxOccurs="1" name="void" type="tns:Void"/>' +
  '</xs:sequence>' +
  '</xs:complexType>' +
  '</xs:element>' +
  '<xs:element name="SynchronizationRequest">' +
  '<xs:complexType>' +
  '<xs:sequence>' +
  '<xs:element minOccurs="1" name="taxableHeaders" type="tns:TaxableHeaders"/>' +
  '<xs:element maxOccurs="1" minOccurs="1" name="taxableLines" type="tns:TaxableLineCollection"/>' +
  '<xs:element maxOccurs="1" minOccurs="0" name="detailTaxLines" type="tns:DetailTaxLineCollection"/>' +
  '</xs:sequence>' +
  '</xs:complexType>' +
  '</xs:element>' +
  '<xs:element name="SynchronizationResponse">' +
  '<xs:complexType>' +
  '<xs:sequence>' +
  '<xs:element maxOccurs="1" name="void" type="tns:Void"/>' +
  '</xs:sequence>' +
  '</xs:complexType>' +
  '</xs:element>' +
  '<xs:element name="NotificationRequest">' +
  '<xs:complexType>' +
  '<xs:sequence>' +
  '<xs:element name="documentId" type="xs:string"/>' +
  '<xs:element maxOccurs="1" minOccurs="1" name="extractType" type="xs:string"/>' +
  '</xs:sequence>' +
  '</xs:complexType>' +
  '</xs:element>' +
  '<xs:element name="NotificationResponse">' +
  '<xs:complexType>' +
  '<xs:sequence>' +
  '<xs:element name="response" type="xs:string"/>' +
  '</xs:sequence>' +
  '</xs:complexType>' +
  '</xs:element>' +
  '<xs:element name="BatchRejectionRequest">' +
  '<xs:complexType>' +
  '<xs:sequence>' +
  '<xs:element name="documentId" type="xs:string"/>' +
  '</xs:sequence>' +
  '</xs:complexType>' +
  '</xs:element>' +
  '<xs:element name="BatchRejectionResponse">' +
  '<xs:complexType>' +
  '<xs:sequence>' +
  '<xs:element name="response" type="xs:string"/>' +
  '</xs:sequence>' +
  '</xs:complexType>' +
  '</xs:element>' +
  '</xs:schema>' +
  '</wsdl:types>' +
  '<wsdl:message name="CalculationRequest">' +
  '<wsdl:part element="tns:CalculationRequest" name="CalculationRequest"/>' +
  '</wsdl:message>' +
  '<wsdl:message name="CalculationResponse">' +
  '<wsdl:part element="tns:CalculationResponse" name="CalculationResponse"/>' +
  '</wsdl:message>' +
  '<wsdl:message name="RejectionRequest">' +
  '<wsdl:part element="tns:RejectionRequest" name="RejectionRequest"/>' +
  '</wsdl:message>' +
  '<wsdl:message name="RejectionResponse">' +
  '<wsdl:part element="tns:RejectionResponse" name="RejectionResponse"/>' +
  '</wsdl:message>' +
  '<wsdl:message name="UpdateRequest">' +
  '<wsdl:part element="tns:UpdateRequest" name="UpdateRequest"/>' +
  '</wsdl:message>' +
  '<wsdl:message name="UpdateResponse">' +
  '<wsdl:part element="tns:UpdateResponse" name="UpdateResponse"/>' +
  '</wsdl:message>' +
  '<wsdl:message name="CancellationRequest">' +
  '<wsdl:part element="tns:CancellationRequest" name="CancellationRequest"/>' +
  '</wsdl:message>' +
  '<wsdl:message name="CancellationResponse">' +
  '<wsdl:part element="tns:CancellationResponse" name="CancellationResponse"/>' +
  '</wsdl:message>' +
  '<wsdl:message name="DeletionRequest">' +
  '<wsdl:part element="tns:DeletionRequest" name="DeletionRequest"/>' +
  '</wsdl:message>' +
  '<wsdl:message name="DeletionResponse">' +
  '<wsdl:part element="tns:DeletionResponse" name="DeletionResponse"/>' +
  '</wsdl:message>' +
  '<wsdl:message name="SynchronizationRequest">' +
  '<wsdl:part element="tns:SynchronizationRequest" name="SynchronizationRequest"/>' +
  '</wsdl:message>' +
  '<wsdl:message name="SynchronizationResponse">' +
  '<wsdl:part element="tns:SynchronizationResponse" name="SynchronizationResponse"/>' +
  '</wsdl:message>' +
  '<wsdl:message name="NotificationRequest">' +
  '<wsdl:part element="tns:NotificationRequest" name="NotificationRequest"/>' +
  '</wsdl:message>' +
  '<wsdl:message name="NotificationResponse">' +
  '<wsdl:part element="tns:NotificationResponse" name="NotificationResponse"/>' +
  '</wsdl:message>' +
  '<wsdl:message name="BatchRejectionRequest">' +
  '<wsdl:part element="tns:BatchRejectionRequest" name="BatchRejectionRequest"/>' +
  '</wsdl:message>' +
  '<wsdl:message name="BatchRejectionResponse">' +
  '<wsdl:part element="tns:BatchRejectionResponse" name="BatchRejectionResponse"/>' +
  '</wsdl:message>' +
  '<wsdl:portType name="OracleCloudTaxPort">' +
  '<wsdl:operation name="Calculation">' +
  '<wsdl:input message="tns:CalculationRequest" name="CalculationRequest"/>' +
  '<wsdl:output message="tns:CalculationResponse" name="CalculationResponse"/>' +
  '</wsdl:operation>' +
  '<wsdl:operation name="Rejection">' +
  '<wsdl:input message="tns:RejectionRequest" name="RejectionRequest"/>' +
  '<wsdl:output message="tns:RejectionResponse" name="RejectionResponse"/>' +
  '</wsdl:operation>' +
  '<wsdl:operation name="Update">' +
  '<wsdl:input message="tns:UpdateRequest" name="UpdateRequest"/>' +
  '<wsdl:output message="tns:UpdateResponse" name="UpdateResponse"/>' +
  '</wsdl:operation>' +
  '<wsdl:operation name="Cancellation">' +
  '<wsdl:input message="tns:CancellationRequest" name="CancellationRequest"/>' +
  '<wsdl:output message="tns:CancellationResponse" name="CancellationResponse"/>' +
  '</wsdl:operation>' +
  '<wsdl:operation name="Deletion">' +
  '<wsdl:input message="tns:DeletionRequest" name="DeletionRequest"/>' +
  '<wsdl:output message="tns:DeletionResponse" name="DeletionResponse"/>' +
  '</wsdl:operation>' +
  '<wsdl:operation name="Synchronization">' +
  '<wsdl:input message="tns:SynchronizationRequest" name="SynchronizationRequest"/>' +
  '<wsdl:output message="tns:SynchronizationResponse" name="SynchronizationResponse"/>' +
  '</wsdl:operation>' +
  '<wsdl:operation name="Notification">' +
  '<wsdl:input message="tns:NotificationRequest" name="NotificationRequest"/>' +
  '<wsdl:output message="tns:NotificationResponse" name="NotificationResponse"/>' +
  '</wsdl:operation>' +
  '<wsdl:operation name="BatchRejection">' +
  '<wsdl:input message="tns:BatchRejectionRequest" name="BatchRejectionRequest"/>' +
  '<wsdl:output message="tns:BatchRejectionResponse" name="BatchRejectionResponse"/>' +
  '</wsdl:operation>' +
  '</wsdl:portType>' +
  '<wsdl:binding name="OracleCloudTaxPortSoap11" type="tns:OracleCloudTaxPort">' +
  '<soap:binding style="document" transport="http://schemas.xmlsoap.org/soap/http"/>' +
  '<wsdl:operation name="Calculation">' +
  '<soap:operation soapAction=""/>' +
  '<wsdl:input name="CalculationRequest">' +
  '<soap:body use="literal"/>' +
  '</wsdl:input>' +
  '<wsdl:output name="CalculationResponse">' +
  '<soap:body use="literal"/>' +
  '</wsdl:output>' +
  '</wsdl:operation>' +
  '<wsdl:operation name="Rejection">' +
  '<soap:operation soapAction=""/>' +
  '<wsdl:input name="RejectionRequest">' +
  '<soap:body use="literal"/>' +
  '</wsdl:input>' +
  '<wsdl:output name="RejectionResponse">' +
  '<soap:body use="literal"/>' +
  '</wsdl:output>' +
  '</wsdl:operation>' +
  '<wsdl:operation name="Update">' +
  '<soap:operation soapAction=""/>' +
  '<wsdl:input name="UpdateRequest">' +
  '<soap:body use="literal"/>' +
  '</wsdl:input>' +
  '<wsdl:output name="UpdateResponse">' +
  '<soap:body use="literal"/>' +
  '</wsdl:output>' +
  '</wsdl:operation>' +
  '<wsdl:operation name="Cancellation">' +
  '<soap:operation soapAction=""/>' +
  '<wsdl:input name="CancellationRequest">' +
  '<soap:body use="literal"/>' +
  '</wsdl:input>' +
  '<wsdl:output name="CancellationResponse">' +
  '<soap:body use="literal"/>' +
  '</wsdl:output>' +
  '</wsdl:operation>' +
  '<wsdl:operation name="Deletion">' +
  '<soap:operation soapAction=""/>' +
  '<wsdl:input name="DeletionRequest">' +
  '<soap:body use="literal"/>' +
  '</wsdl:input>' +
  '<wsdl:output name="DeletionResponse">' +
  '<soap:body use="literal"/>' +
  '</wsdl:output>' +
  '</wsdl:operation>' +
  '<wsdl:operation name="Synchronization">' +
  '<soap:operation soapAction=""/>' +
  '<wsdl:input name="SynchronizationRequest">' +
  '<soap:body use="literal"/>' +
  '</wsdl:input>' +
  '<wsdl:output name="SynchronizationResponse">' +
  '<soap:body use="literal"/>' +
  '</wsdl:output>' +
  '</wsdl:operation>' +
  '<wsdl:operation name="Notification">' +
  '<soap:operation soapAction=""/>' +
  '<wsdl:input name="NotificationRequest">' +
  '<soap:body use="literal"/>' +
  '</wsdl:input>' +
  '<wsdl:output name="NotificationResponse">' +
  '<soap:body use="literal"/>' +
  '</wsdl:output>' +
  '</wsdl:operation>' +
  '<wsdl:operation name="BatchRejection">' +
  '<soap:operation soapAction=""/>' +
  '<wsdl:input name="BatchRejectionRequest">' +
  '<soap:body use="literal"/>' +
  '</wsdl:input>' +
  '<wsdl:output name="BatchRejectionResponse">' +
  '<soap:body use="literal"/>' +
  '</wsdl:output>' +
  '</wsdl:operation>' +
  '</wsdl:binding>' +
  '<wsdl:service name="OracleCloudTaxPortService">' +
  '<wsdl:port binding="tns:OracleCloudTaxPortSoap11" name="OracleCloudTaxPortSoap11">' +
  '<soap:address location="@@endpoint@@"/>' +
  '</wsdl:port>' +
  '</wsdl:service>' +
  '</wsdl:definitions>';

export default extension;
