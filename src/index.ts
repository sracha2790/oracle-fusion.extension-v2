import { DateIntervalUtil } from './utils/dateIntervalUtil';
import { AuthenticationModel, AuthenticationHandler } from './authentication';
import { FileProcessingConfiguration, DocLevelDefinition } from './batchfile/FileProcessingConfiguration';
import { CsvToDocumentConverter } from './convert/CsvToDocumentConverter';
import { DocumentDetails } from './batchfile/DocumentDetails';
import { ProRateTaxDetailModel } from './openapimodels/ProRateTaxDetailModel';
import { ProRateTaxCalculator } from './connector/proRateTaxCalculator';
import { DetailTaxLineModel } from './openapimodels/DetailTaxLineModel';
import { LineDetLineModel } from './openapimodels/LineDetLineModel';
import { TaxableLineModel } from './openapimodels/TaxableLineModel';
import { TaxableHeadersModel } from './openapimodels/TaxableHeadersModel';
import { DataMapper } from './connector/dataMapper';
import * as packageJson from '../package.json';
import {
  AppknitSDK,
  SdkIntegration,
  SdkAuthenticationCredentialType,
  SdkIntegrationSourceType,
  SdkTriggerType,
  SdkHttpRequestOptions,
  SdkStopExecutionStatus,
  SdkGenericErrorCodes,
  SdkExecutionError,
} from 'appknit-platform-sdk-v2';
import { stringify } from 'csv/lib/sync';

const httpMethods = ['GET', 'POST', 'PUT', 'DELETE', 'PATCH', 'HEAD', 'TRACE', 'OPTIONS', 'CONNECT'];
enum CollectOperation {
  minus = 'MINUS',
  plus = 'PLUS',
}

const toMappingArray = (arrayStr: string, colSeparator: string, mapSeparator: string): Array<string> => {
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

function addAuthenticationHeaders(
  sdk: AppknitSDK,
  requestOptions: SdkHttpRequestOptions,
  credentialType: SdkAuthenticationCredentialType,
  credential: any,
): Promise<void> {
  if (credential && credentialType == SdkAuthenticationCredentialType.custom) {
    let secret = `${credential.username}:${credential.password}`;
    secret = Buffer.from(secret, 'utf-8').toString('base64');
    requestOptions.headers.Authorization = `Basic ${secret}`;
    if (credential.endPoint) {
      const url = new URL(credential.endPoint);
      requestOptions.baseURL = url.origin;
      requestOptions.path = url.pathname;
    }
  }
  return;
}

const integration: SdkIntegration = {
  name: 'oracle-fusion-tax-integration-v2',
  websiteUrl: '',
  documentationUrl: '',
  iconUrl: '',
  description: 'Oracle Fusion Tax Partner API Integration - Listener for Tax Calls from Fusion',
  longDescription: 'Oracle Fusion Tax Partner API Integration - Listener for Tax Calls from Fusion',
  version: packageJson.version,
  platformVersion: packageJson.dependencies['appknit-platform-sdk-v2'],
  source: {
    type: SdkIntegrationSourceType.git,
    git: { url: packageJson.repository, path: '/dist' },
  },
  releaseChanges: 'Created integration',
  authentication: {
    name: 'oracle-fusion-authentication',
    description: 'Oracle Fusion AUthentication',
    type: SdkAuthenticationCredentialType.custom,
    configuration: AuthenticationModel,
    testJs: AuthenticationHandler,
    labelFormat: '$.authenticatedUserName',
    hooks: {
      customizeHttpRequest: addAuthenticationHeaders,
    },
  },
  triggers: {
    incomingSoapRequest: {
      description: 'Fusion Tax Calculation Trigger for SOAP request',
      longDescription: 'SOAP WS request from Fusion for calculating tax',
      type: SdkTriggerType.incomingHttpRequest,
      hooks: {
        customizeHttpRequest: null,
        js: (
          sdk: AppknitSDK,
          params: {
            http: {
              version: string;
              method: 'GET' | 'POST' | 'PUT' | 'DELETE' | 'PATCH' | 'HEAD' | 'TRACE' | 'OPTIONS' | 'CONNECT';
              headers: any;
              query: any;
              body: string;
              pathAndQuery: string;
            };
          },
          configuration: any,
          credentials: any,
        ): Promise<{
          mappedData: any;
        }> => {
          // let credentials = sdk.getAuthentication();
          let authorized = false;
          let mappedData: any;
          if (params.http.query && (params.http.query.hasOwnProperty('wsdl') || params.http.query.hasOwnProperty('WSDL'))) {
            let url = new URL(sdk.getSdkMetadata().apiUrl + params.http.pathAndQuery);
            let endPoint = url.protocol + '//' + url.host + url.pathname;
            mappedData = { 'sendWsdl': true, 'wsdl': wsdl.replace('@@endpoint@@', endPoint) };
            sdk.setHttpResponse(200, {
              'content-type': 'application/xml',
            }, wsdl.replace('@@endpoint@@', endPoint));
            sdk.setStopExecution(SdkStopExecutionStatus.succeed, 'Sending wsdl xml for wsdl request');
            authorized = true;
          } else if (credentials) {
            // console.log('Credentials provided : ' + JSON.stringify(credentials, null, 2));
            let xmlBody = sdk.serialization.xml.parse(params.http.body);
            // console.log('XML : ', xmlBody);
            let auth = xmlBody?.['soapenv:Envelope']?.['soapenv:Header']?.['wsse:Security']?.['wsse:UsernameToken'];
            // console.log('AUTH : ', auth);
            if (auth) {
              if (auth['wsse:Username'] && auth['wsse:Password']) {
                let user = '';
                let pass = '';
                if (auth['wsse:Username']['value']) {
                  user = auth['wsse:Username']['value'];
                } else {
                  user = auth['wsse:Username'];
                }
                if (auth['wsse:Password']['value']) {
                  pass = auth['wsse:Password']['value'];
                } else {
                  pass = auth['wsse:Password'];
                }
                // console.log('Authorization : ' + user + ' : ' + pass);
                if (user == credentials['username'] && pass == credentials['password']) {
                  authorized = true;
                  mappedData = { 'sendWsdl': false, 'body': xmlBody, params: params.http };
                }
              }
            }
          } else {
            // console.log('Not a wsdl request and no credentials provided');
          }
          if (!authorized) {
            mappedData = { 'error': 'Not authorized' };
            sdk.setHttpResponse(403, {
              'content-type': 'text/html',
            }, 'Forbidden');
            sdk.setStopExecution(SdkStopExecutionStatus.succeed, 'Unauthorized flow request');
          }
          return Promise.resolve(
            mappedData,
          );
        },
      },
      output: {
        dataSchema: {
          type: 'object',
          properties: {
            mappedData: {
              type: 'object',
              properties: {
                mappings: {
                  type: 'object',
                  properties: {
                    wsAction: {
                      description: 'SOAP Action to execute',
                      type: 'string'
                    },
                    headers: {
                      description: 'TaxableHeader from the SOAP request',
                      type: 'array',
                      items: TaxableHeadersModel,
                    },
                    lines: {
                      description: 'Array of TaxableLine from the SOAP request',
                      type: 'array',
                      items: TaxableLineModel
                    },
                    lineDetLine: {
                      description: 'Mapping of TaxableLine to DetailTaxLine if there is a matching DetailTaxLine with ManuallyEnteredFlag Y',
                      type: 'array',
                      items: LineDetLineModel
                    },
                    vendorTaxed: {
                      description: 'If there is any vendor tax in the incoming detail tax lines',
                      type: 'boolean'
                    },
                    documentId: {
                      description: 'Document ID if Notification or BatchRejection Action',
                      type: 'string',
                    },
                    extractType: {
                      description: 'ExtractType from SOAP request if Notification action',
                      type: 'string',
                    }
                  }
                },
                request: {
                  description: 'Original incoming HTTP request, body having SOAP xml',
                  type: 'object'
                }
              },
            },
          },
        },
        samples: [],
      },
      configuration: {},
    },
  },
  // conditions: {
  //   comparisonCondition: {
  //     title: 'Comparable condition',
  //     description:
  //       'Condition has to be used to compare 2 arguments by specific comparison operator (more, less,' +
  //       ' equal, not equal, etc.)',
  //     configuration: {
  //       argument1: {
  //         title: 'First argument',
  //         description: 'Value for usage in comparison',
  //         default: null,
  //       },
  //       argument2: {
  //         title: 'Second argument',
  //         description: 'Value for usage in comparison',
  //         default: null,
  //       },
  //       comparisonOperator: {
  //         title: 'Comparison operator',
  //         type: 'string',
  //         enum: ['==', '===', '!=', '!==', '>', '>=', '<', '<=', 'contains', 'pattern'],
  //       },
  //     },
  //     js: (
  //       sdk: AppknitSDK,
  //       configuration: {
  //         argument1: any;
  //         argument2: any;
  //         comparisonOperator: '==' | '===' | '!=' | '!==' | '>' | '>=' | '<' | '<=' | 'contains' | 'pattern';
  //       },
  //     ): Promise<boolean> => {
  //       const { argument1, argument2, comparisonOperator } = configuration;

  //       if (comparisonOperator === '==') {
  //         return Promise.resolve(argument1 == argument2);
  //       } else if (comparisonOperator === '===') {
  //         return Promise.resolve(argument1 === argument2);
  //       } else if (comparisonOperator === '!=') {
  //         return Promise.resolve(argument1 != argument2);
  //       } else if (comparisonOperator === '!==') {
  //         return Promise.resolve(argument1 !== argument2);
  //       } else if (comparisonOperator === '>') {
  //         return Promise.resolve(argument1 > argument2);
  //       } else if (comparisonOperator === '<') {
  //         return Promise.resolve(argument1 < argument2);
  //       } else if (comparisonOperator === '>=') {
  //         return Promise.resolve(argument1 >= argument2);
  //       } else if (comparisonOperator === '<=') {
  //         return Promise.resolve(argument1 <= argument2);
  //       } else if (comparisonOperator === 'contains') {
  //         if (!Array.isArray(argument1) && typeof argument1 !== 'string') {
  //           throw new SdkExecutionError(
  //             SdkGenericErrorCodes.invalidArgument,
  //             '`contains` can be used only with arrays and strings',
  //           );
  //         }

  //         return Promise.resolve(configuration.argument1.includes(configuration.argument2));
  //       } else if (comparisonOperator === 'pattern') {
  //         if (typeof argument1 !== 'string') {
  //           throw new SdkExecutionError(SdkGenericErrorCodes.invalidArgument, '`pattern` can be used only with strings');
  //         } else if (typeof argument2 !== 'string') {
  //           throw new SdkExecutionError(SdkGenericErrorCodes.invalidArgument, '`pattern` can be used only with strings');
  //         }

  //         const r = new RegExp(argument2);

  //         return Promise.resolve(argument1.match(r) !== null);
  //       } else {
  //         throw new SdkExecutionError(SdkGenericErrorCodes.invalidArgument, 'Comparable operator is invalid');
  //       }
  //     },
  //   },
  //   existsCondition: {
  //     title: 'Exists condition',
  //     description: '',
  //     configuration: {
  //       argument: {
  //         title: 'Argument',
  //         description: 'Value to check for existance',
  //         default: null,
  //       },
  //     },
  //     js: (
  //       sdk: AppknitSDK,
  //       configuration: {
  //         argument: any;
  //       },
  //     ): Promise<boolean> => {
  //       const { argument } = configuration;

  //       if (argument) {
  //         return Promise.resolve(true);
  //       } else {
  //         return Promise.resolve(false);
  //       }
  //     },
  //   },
  //   notExistsCondition: {
  //     title: 'Exists condition',
  //     description: '',
  //     configuration: {
  //       argument: {
  //         title: 'Argument',
  //         description: 'Value to check for existance',
  //         default: null,
  //       },
  //     },
  //     js: (
  //       sdk: AppknitSDK,
  //       configuration: {
  //         argument: any;
  //       },
  //     ): Promise<boolean> => {
  //       const { argument } = configuration;

  //       if (argument) {
  //         return Promise.resolve(false);
  //       } else {
  //         return Promise.resolve(true);
  //       }
  //     },
  //   },
  // },
  servers:{},
  actions: {
    joinValues: {
      description: 'Join the string values together with joiner',
      longDescription: '',
      configuration: {
        values: {
          title: 'Values to join',
          type: 'array',
        },
        joiner: {
          title: 'Joiner',
          type: 'string',
        },
      },
      js: async (
        sdk: AppknitSDK,
        configuration: {
          values: Array<string>,
          joiner: string,
        },
      ): Promise<any> => {
        const {
          values, joiner
        } = configuration;
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
      },
      output: {
        dataSchema: {
          title: 'Result of joining all strings together',
        },
        samples: [],
      },
    },
    toURL: {
      description: 'Convert string to URL object',
      longDescription: 'Converts the given url string to URL object',
      configuration: {
        urlString: {
          type: 'string',
          title: 'String representation of the URL',
        },
      },
      js: async (
        sdk: AppknitSDK,
        configuration: {
          urlString: string,
        },
      ): Promise<any> => {
        const { urlString } = configuration;

        const { href, origin, protocol, username, password, host, hostname, port, pathname, search, searchParams, hash }: URL = new URL(urlString);
        // console.log('URL : ' + { hostname, protocol, host, username, password, pathname, searchParams, href, port, search });
        return Promise.resolve({ href, origin, protocol, username, password, host, hostname, port, pathname, search, searchParams, hash });
      },
      output: {
        dataSchema: {
          type: 'string',
        },
        samples: [],
      },
    },
    mapFusionSoapRequest: {
      description: 'Map Fusion Soap Request values',
      longDescription: 'Maps the fusion tax calculation request and create document and VBT details',
      configuration: {
        body: {
          type: 'object',
        }
      },
      js: async (
        sdk: AppknitSDK,
        configuration: {
          body: string
        },
      ): Promise<any> => {
        const { body } = configuration;
        let mappedData;
        if (body) {
          const mapper = new DataMapper();
          mappedData = mapper.processIncomingSoapRequest(body);
        }
        return Promise.resolve(
          mappedData,
        );
      },
      output: {
        dataSchema: {
          type: 'object',
        },
        samples: [],
      },
    },
    filterByUniqueValues: {
      description: 'Filter items by unique field values',
      longDescription: '',
      configuration: {
        items: {
          type: 'string',
        },
        uniqueFields: {
          type: 'array',
        },
        selectBy: {
          type: 'array'
        }
      },
      js: async (
        sdk: AppknitSDK,
        configuration: {
          items: any,
          uniqueFields: Array<string>,
          selectBy: Array<{
            criteria: string,
            field: string,
            valueType: string,
          }>,
        },
      ): Promise<any> => {
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
                registry[key] = selItem
              }
            }
          }
        }
        let results = [];
        for (let prop in registry) {
          results.push(registry[prop]);
        }
        return Promise.resolve(results);
      },
      output: {
        dataSchema: {
          type: 'string',
        },
        samples: [],
      },
    },
    split: {
      description: 'Split a text to a text array',
      longDescription: '',
      configuration: {
        payload: {
          type: 'string',
        },
        separator: {
          type: 'string',
          default: ',',
        },
      },
      js: async (
        sdk: AppknitSDK,
        configuration: {
          payload: string,
          separator: string
        },
      ): Promise<any> => {
        const { payload, separator } = configuration;
        return Promise.resolve(payload.split(separator));
      },
      output: {
        dataSchema: {
          type: 'string',
        },
        samples: [],
      },
    },
    splitAll: {
      description: 'Split all texts to array of text array',
      longDescription: '',
      configuration: {
        payload: {
          type: 'array',
          items: {
            type: 'string'
          }
        },
        separator: {
          type: 'string',
          default: ',',
        },
      },
      js: async (
        sdk: AppknitSDK,
        configuration: {
          payload: Array<string>,
          separator: string
        },
      ): Promise<any> => {
        const { payload, separator } = configuration;
        let results = [];
        for (let str of payload) {
          results.push(str.split(separator));
        }
        return Promise.resolve(results);
      },
      output: {
        dataSchema: {
          type: 'string',
        },
        samples: [],
      },
    },
    toSeparateCsvsByField: {
      description: 'Serialize payload to separate CSV, grouped by field',
      longDescription: '',
      configuration: {
        payload: {
          type: 'array',
        },
        groupByField: {
          type: 'string'
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
      js: async (
        sdk: AppknitSDK,
        configuration: {
          payload: any,
          groupByField: string,
          header: boolean,
          columns: Array<string>,
          columnDelimiter: string
        },
      ): Promise<any> => {
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
      },
      output: {
        dataSchema: {
          type: 'string',
        },
        samples: [],
      },
    },
    toCsv: {
      description: 'Serialize payload to CSV',
      longDescription: '',
      configuration: {
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
      js: async (
        sdk: AppknitSDK,
        configuration: {
          payload: any,
          header: boolean,
          columns: Array<string>,
          columnDelimiter: string
        },
      ): Promise<any> => {
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
      },
      output: {
        dataSchema: {
          type: 'string',
        },
        samples: [],
      },
    },
    joinMap: {
      description: 'Map items with an existing array of mapped objects',
      longDescription: '',
      configuration: {
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
        }
      },
      js: async (
        sdk: AppknitSDK,
        configuration: {
          items: any,
          join: {
            itemsPath: string,
            nestedPath: string,
            mapByField: string,
            setToField: string,
          },
          mapWith: {
            itemsPath: string,
            nestedPath: string,
            mapByField: string,
            setToField: string,
          },
          mapEmptyJoin: boolean,
        },
      ): Promise<any> => {
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
      },
      output: {
        dataSchema: {
          type: 'object',
          description: 'An array of the input map with the input objects mapped for each item',
        },
        samples: [],
      },
    },
    replaceByLookup: {
      description: 'Replace field value by lookup value',
      longDescription: 'Replace field value by lookup value',
      configuration: {
        items: {
          type: 'array',
        },
        lookups: {
          type: 'object'
        },
        replace: {
          type: 'object'
        }
      },
      js: async (
        sdk: AppknitSDK,
        configuration: {
          items: Array<any>,
          lookups: {
            values: Array<any>,
            key: string,
            value: string
          },
          replace: Array<{
            itemPath: string,
            fields: Array<string>
          }>
        },
      ): Promise<any> => {
        const {
          items, lookups, replace
        } = configuration;
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
      },
      output: {
        dataSchema: {
          title: 'New object',
          description: 'New object to use for later',
          type: 'object'
        },
        samples: [],
      },
    },
    uniqueValuesFromFields: {
      description: 'Extract unique values from specified fields',
      longDescription: 'Extract unique values from specified fields',
      configuration: {
        data: {
          type: 'object',
        },
      },
      js: async (
        sdk: AppknitSDK,
        configuration: {
          items: any,
          fields: Array<string>,
          childItems: Array<{
            name: string,
            fields: Array<string>,
          }>
        },
      ): Promise<any> => {
        const {
          items, fields, childItems
        } = configuration;
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
      },
      output: {
        dataSchema: {
          title: 'New object',
          description: 'New object to use for later',
          type: 'object'
        },
        samples: [],
      },
    },
    setCombinedFieldValues: {
      description: 'Set the value of a field as the concatenation of given field values',
      longDescription: 'Set the value of a field as the concatenation of given field values',
      configuration: {
        items: {
          title: 'Host',
          type: 'string',
        },
        path: {
          title: 'path of items',
          type: 'string'
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
      js: async (
        sdk: AppknitSDK,
        configuration: {
          items: Array<any>,
          subPath: string,
          setToField: string,
          defaultVal: string,
          joiner: string,
          fields: Array<string>
        },
      ): Promise<any> => {
        const {
          items,
          subPath,
          setToField,
          defaultVal,
          joiner,
          fields,
        } = configuration;
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
      },
      output: {
        dataSchema: {
          title: 'Data',
          type: 'object',
          description: 'The passed object',
        },
        samples: [],
      },
    },
    getIntervalTimes: {
      description: 'Download files from Oracle UCM',
      longDescription: '',
      configuration: {
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
      js: async (
        sdk: AppknitSDK,
        configuration: {
          last: string, dtPattern: string, interval: number, period: string,
          prior: number, future: number, combinedTenth: boolean
        },
      ): Promise<any> => {
        const {
          last, dtPattern, interval, period,
          prior, future, combinedTenth } = configuration;
        let dateSuffixes = await new DateIntervalUtil().getIntervalTimes(last, dtPattern, interval, period, prior, future, combinedTenth);
        return Promise.resolve(dateSuffixes);
      },
      output: {
        dataSchema: {
          type: 'array',
        },
        samples: [],
      },
    },
    convertToDocument: {
      description: 'Convert text/csv data to document structure',
      longDescription: '',
      configuration: {
        // host, userName, passWord, prefix, account
        data: {
          title: 'Data',
          type: 'string',
        },
        docLevels: {
          title: 'Document levels definition',
          type: 'object',
        }
      },
      js: async (
        sdk: AppknitSDK,
        configuration: {
          data: string, docLevels: DocLevelDefinition
        },
      ): Promise<any> => {
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
      },
      output: {
        dataSchema: {
          type: 'string',
        },
        samples: [],
      },
    },
    convertToDocuments: {
      description: 'Convert to documents',
      longDescription: 'Convert text data to documents, following the processing configuration',
      configuration: {
        documentDetails: {
          title: 'Items',
          type: 'array',
        },
        processingConfig: {
          title: 'File Processing Configuration',
          type: 'array',
        },
      },
      js: async (
        sdk: AppknitSDK,
        configuration: {
          documentDetails: Array<DocumentDetails>,
          processingConfig: FileProcessingConfiguration[],
        },
      ): Promise<any> => {
        const {
          documentDetails,
          processingConfig,
        } = configuration;

        let configLen = processingConfig.length;

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
          contentType: 'text'
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
                  let csvDataJson = csvDocBuilder.parseCSVWithUpperCaseHeaders(
                    fileContent.fileData
                  );
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
                        if (typeof (data) == 'object' && typeof (data) != 'string') {
                          dataDoc['UCM_DocumentName'] = docDet.DocumentName;
                          dataDoc['UCM_DocumentId'] = docDet.DocumentId;
                          dataDoc['UCM_fileName'] = fileContent.fileName;
                        }
                        mappedDocs[proConfig.mappingName].push(dataDoc);
                      }
                    } else {
                      if (typeof (data) == 'object' && typeof (data) != 'string') {
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
                  let csvDataJson = csvDocBuilder.parseCSVWithUpperCaseHeaders(
                    docDet.Content.toString()
                  );
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
      },
      output: {
        dataSchema: {
          title: 'Grouped and aggregated data',
          type: 'array',
        },
        samples: [],
      },
    },
    groupByToObjects: {
      description: 'Group By',
      longDescription: 'Merge multiple items into one when they all have the same value for the groupByFields.',
      configuration: {
        items: {
          title: 'Items',
          type: 'array',
        },
        groupByField: {
          title: 'Group by fields',
          type: 'string',
        },
      },
      js: async (
        sdk: AppknitSDK,
        configuration: {
          items: Array<any>,
          groupByField: string,
        },
      ): Promise<any> => {
        const {
          items,
          groupByField,
        } = configuration;
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
      },
      output: {
        dataSchema: {
          title: 'Grouped and aggregated data',
          type: 'array',
        },
        samples: [],
      },
    },
    groupBy: {
      description: 'Group By',
      longDescription: 'Merge multiple items into one when they all have the same value for the groupByFields.',
      configuration: {
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
      js: async (
        sdk: AppknitSDK,
        configuration: {
          items: Array<any>,
          groupByFields: Array<string>,
          aggregations: Array<{
            field: string,
            operation: 'SUM',
          }>,
        },
      ): Promise<any> => {
        const {
          items,
          groupByFields,
          aggregations,
        } = configuration;

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
                aggregatedGroups.push(obj)
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

        return Promise.resolve(
          aggregatedGroups
        );
      },
      output: {
        dataSchema: {
          title: 'Grouped and aggregated data',
          type: 'array',
        },
        samples: [],
      },
    },
    mergeToItems: {
      description: 'Merge (copy properties of) an object to the item upto two levels deep',
      longDescription: '',
      configuration: {
        items: {
          type: 'array'
        }
      },
      js: async (
        sdk: AppknitSDK,
        configuration: {
          mergeTo: Array<any>,
          mergeItems: Array<any>,
          matchFields: Array<Array<string>>,
          copyFields: Array<string>,
          levels: Array<{
            item: string,
            merge: string,
            matchFields: Array<Array<string>>,
            copyFields: Array<string>
          }>
        },
      ): Promise<any> => {
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
      },
      output: {
        dataSchema: {
          type: 'array',
        },
        samples: [],
      },
    },
    filterItemsWithPropertyMatching: {
      description: 'Filter items from an array  based on field values',
      longDescription: '',
      configuration: {
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
            type: 'string'
          }
        }
      },
      js: async (
        sdk: AppknitSDK,
        configuration: {
          items: Array<any>;
          filterField: string;
          filterValues: Array<string>;
        },
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
      },
      output: {
        dataSchema: {
          type: 'object',
        },
        samples: [],
      },
    },
    flattenHierarchyToMap: {
      description: 'Flattens on an array items and map',
      longDescription: '',
      configuration: {
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
      js: async (
        sdk: AppknitSDK,
        configuration: {
          items: Array<any>;
          itemName: string,
          arrayPropertyPath: string;
          arrayItemName: string,
        },
      ): Promise<any> => {
        const { items, itemName, arrayPropertyPath, arrayItemName } = configuration;
        const pathArr = arrayPropertyPath.split('/');
        const result = [];
        for (const item of items) {
          let refObj = item;
          let found = false;
          for (const path of pathArr) {
            if (!refObj) { found = false; break; }
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
      },
      output: {
        dataSchema: {
          type: 'array',
          description: 'The array of mapping objects with each row having one item in the array mapped with the item',
        },
        samples: [],
      },
    },
    combineArrays: {
      description: 'Combine two or more arrays',
      longDescription: '',
      configuration: {
        items: {
          title: 'Arrays to combine',
          type: 'array',
          items: { type: 'array', }
        },
      },
      js: async (
        sdk: AppknitSDK,
        configuration: {
          items: Array<Array<any>>;
        },
      ): Promise<any> => {
        const { items } = configuration;
        let result = [].concat.apply([], items);
        return Promise.resolve(result.filter(n => n !== null && n !== undefined));
      },

      output: {
        dataSchema: {
          type: 'array',
        },
        samples: [],
      },
    },
    separateItemsByCondition: {
      description: 'Exclude items from an array based on field values',
      longDescription: '',
      configuration: {
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
            }
          }
        },
      },
      js: async (
        sdk: AppknitSDK,
        configuration: {
          items: Array<any>;
          condition: {
            field: string,
            comparison: string,
            value: string
          }
        },
      ): Promise<any> => {
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
      },

      output: {
        dataSchema: {
          type: 'object',
          properties: {
            matching: {
              type: 'array'
            },
            nonMatching: {
              type: 'array'
            }
          }
        },
        samples: [],
      },
    },
    excludeItemsByCondition: {
      description: 'Exclude items from an array based on field values',
      longDescription: '',
      configuration: {
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
            }
          }
        },
      },
      js: async (
        sdk: AppknitSDK,
        configuration: {
          items: Array<any>;
          condition: {
            field: string,
            comparison: string,
            value: string
          }
        },
      ): Promise<any> => {
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
      },

      output: {
        dataSchema: {
          type: 'array',
        },
        samples: [],
      },
    },
    filterMatchShallowCopy: {
      description: 'Filter items from an array based on field values and shallow copy to an array',
      longDescription: '',
      configuration: {
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
        }
      },
      js: async (
        sdk: AppknitSDK,
        configuration: {
          items: Array<any>;
          filterFields: string;
          filterValues: string;
        },
      ): Promise<any> => {
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
      },
      output: {
        dataSchema: {
          type: 'object',
        },
        samples: [],
      },
    },
    filterMatch: {
      description: 'Filter items from an array  based on field values',
      longDescription: '',
      configuration: {
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
        }
      },
      js: async (
        sdk: AppknitSDK,
        configuration: {
          items: Array<any>;
          filterFields: string;
          filterValues: string;
        },
      ): Promise<any> => {
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
      },

      output: {
        dataSchema: {
          type: 'object',
        },
        samples: [],
      },
    },
    proRateTaxes: {
      description: 'ProRateTaxCalculation',
      longDescription: 'Calculate ProRate taxes for AP module, return pro-rated tax for each line',
      configuration: {
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
            type: 'object'
          }
        },
        apTolerances: {
          title: 'Tolerance pct and amt',
          type: 'number',
        },
      },
      js: async (
        sdk: AppknitSDK,
        configuration: {
          apSelfAssesTaxFlag: string,
          vendorBilledTax: number,
          taxedLines: Array<any>,
          apTolerances: { tolerancePct: number, toleranceAmt: number },
        },
      ): Promise<any> => {
        const { apSelfAssesTaxFlag, vendorBilledTax, taxedLines, apTolerances } = configuration;

        ////////////////////////////////////////////////////////////////////
        // Calculate proRateTaxes by ProRateTaxCalculator
        // 
        ///////////////////////////////////////////////////////////////////

        const proRateCalculator = new ProRateTaxCalculator();
        let taxOverRideDtls = proRateCalculator.calculateProRateTax(apSelfAssesTaxFlag, vendorBilledTax, taxedLines, apTolerances.tolerancePct, apTolerances.toleranceAmt);

        return Promise.resolve(taxOverRideDtls);
      },

      output: {
        dataSchema: {
          type: 'object',
          items: ProRateTaxDetailModel,
        },
        samples: [],
      },
    },
    createDetailTaxLines: {
      description: 'Create detail tax lines with taxes/copy field values',
      longDescription: '',
      configuration: {
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
          type: 'object'
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
      js: async (
        sdk: AppknitSDK,
        configuration: {
          lineTaxAndDetail: Array<{
            line,
            dtl,
            taxedLine,
            taxDetails,
          }>,
          commonValues: any,
          fieldsMapping: {
            taxableLineMapping,
            detailTaxLineMapping,
            lineTaxesMapping,
            taxDetailsMaping,
            commonValuesMaping,
            columnSeparator,
            mappingSeparator,
          }
        },
      ): Promise<any> => {
        const { lineTaxAndDetail, commonValues, fieldsMapping } = configuration;

        const tlColMap = toMappingArray(fieldsMapping.taxableLineMapping, fieldsMapping.columnSeparator, fieldsMapping.mappingSeparator);

        const dtlColMap = toMappingArray(fieldsMapping.detailTaxLineMapping, fieldsMapping.columnSeparator, fieldsMapping.mappingSeparator);

        const ltColMap = toMappingArray(fieldsMapping.lineTaxesMapping, fieldsMapping.columnSeparator, fieldsMapping.mappingSeparator);

        const tdColMap = toMappingArray(fieldsMapping.taxDetailsMaping, fieldsMapping.columnSeparator, fieldsMapping.mappingSeparator);
        const cvColMap = toMappingArray(fieldsMapping.commonValuesMaping, fieldsMapping.columnSeparator, fieldsMapping.mappingSeparator);

        const detTaxLines = [];
        const wrapper = {};
        for (const combo of lineTaxAndDetail) {
          for (const taxDet of combo.taxDetails) {

            const detTaxLine = {};
            detTaxLines.push(detTaxLine);

            if (combo.line) {
              for (const dtc of tlColMap) {
                detTaxLine[dtc[0]] = combo.line[dtc[1]]
              }
            }
            if (combo.dtl) {
              for (const dtc of dtlColMap) {
                detTaxLine[dtc[0]] = combo.dtl[dtc[1]]
              }
            }
            if (combo.taxedLine) {
              for (const dtc of ltColMap) {
                detTaxLine[dtc[0]] = combo.taxedLine[dtc[1]]
              }
            }
            if (combo.taxDetails) {
              for (const dtc of tdColMap) {
                detTaxLine[dtc[0]] = taxDet[dtc[1]]
              }
            }
            if (commonValues) {
              for (const dtc of cvColMap) {
                detTaxLine[dtc[0]] = commonValues[dtc[1]]
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
      },

      output: {
        dataSchema: {
          type: 'array',
          items: DetailTaxLineModel,
        },
        samples: [],
      },
    },
    collect: {
      description: 'Collect',
      longDescription: '',
      configuration: {
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
      js: async (
        sdk: AppknitSDK,
        configuration: {
          argument: any;
          operation: CollectOperation;
          defaultValue: number;
        },
      ): Promise<any> => {
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
      },
      output: {
        dataSchema: {
          type: 'number',
        },
        samples: [],
      },
    },
    store: {
      description: 'Store',
      longDescription: 'Place a data that so that it can be referred to the by step/action',
      configuration: {
        data: {
          type: 'object',
        },
      },
      js: async (
        sdk: AppknitSDK,
        configuration: {
          data: any,
        },
      ): Promise<any> => {
        const {
          data,
        } = configuration;

        return Promise.resolve(data);
      },
      output: {
        dataSchema: {
          title: 'Data',
          type: 'object',
          description: 'The passed object',
        },
        samples: [],
      },
    },
    createObject: {
      description: 'Create new Object to use',
      longDescription: 'Create object to use in later actions',
      configuration: {
        data: {
          type: 'object',
        },
      },
      js: async (
        sdk: AppknitSDK,
        configuration: {
          data: any,
        },
      ): Promise<any> => {
        const {
          data,
        } = configuration;
        const madeObj = {};
        return Promise.resolve(madeObj);
      },
      output: {
        dataSchema: {
          title: 'New object',
          description: 'New object to use for later',
          type: 'object'
        },
        samples: [],
      },
    },
    createArray: {
      description: 'Create an empty array to use',
      longDescription: '',
      configuration: {
        data: {
          type: 'object',
        },
      },
      js: async (
        sdk: AppknitSDK,
        configuration: {
          data: any,
        },
      ): Promise<any> => {
        const {
          data,
        } = configuration;
        const madeArray = [];
        return Promise.resolve(madeArray);
      },
      output: {
        dataSchema: {
          title: 'Data',
          type: 'array',
        },
        samples: [],
      },
    },
    createNewObjectToArray: {
      description: 'Add a new object to the array',
      longDescription: '',
      configuration: {
        objects: {
          title: 'Array of items to add new object to.',
          type: 'array',
        },
      },
      js: async (
        sdk: AppknitSDK,
        configuration: {
          objects: Array<any>,
        },
      ): Promise<any> => {
        const {
          objects,
        } = configuration;
        const addObject = {};
        objects.push(addObject);
        return Promise.resolve(objects);
      },
      output: {
        dataSchema: {
          title: 'Data',
        },
        samples: [],
      },
    },
    pushObjectToArray: {
      description: 'Add a new object to the array',
      longDescription: '',
      configuration: {
        item: {
          title: 'Array of items to add new object to.',
          type: 'object',
        },
        objects: {
          title: 'Array of items to add new object to.',
          type: 'array',
        },
      },
      js: async (
        sdk: AppknitSDK,
        configuration: {
          item: any,
          objects: Array<any>,
        },
      ): Promise<any> => {
        const { item, objects, } = configuration;
        objects.push(item);
        return Promise.resolve(objects);
      },
      output: {
        dataSchema: {
          title: 'Data',
        },
        samples: [],
      },
    },
    append: {
      description: 'Append a value to another with a joiner',
      longDescription: 'Appends a value to the other with the joiner',
      configuration: {
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
      js: async (
        sdk: AppknitSDK,
        configuration: {
          first: string,
          second: string,
          joiner: string,
        },
      ): Promise<any> => {
        const {
          first, second, joiner
        } = configuration;

        return Promise.resolve(first + joiner + second);
      },
      output: {
        dataSchema: {
          title: 'Data',
        },
        samples: [],
      },
    },
    sumAll: {
      description: 'Sum the values of a field of all items in an array',
      longDescription: '',
      configuration: {
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
      js: async (
        sdk: AppknitSDK,
        configuration: {
          items: Array<any>,
          fields: string,
          separator: string,
        },
      ): Promise<any> => {
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
      },
      output: {
        dataSchema: {
          title: 'Data',
        },
        samples: [],
      },
    },
    match: {
      description: 'Match',
      longDescription: '',
      configuration: {
        values: {
          title: 'Values to search for',
          type: 'array',
        },
        mapping: {
          title: 'Match all and return last value in Array',
          type: 'array',
        },
      },
      js: async (
        sdk: AppknitSDK,
        configuration: {
          values: Array<any>,
          mapping: Array<Array<any>>;
        },
      ): Promise<any> => {
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
      },
      output: {
        dataSchema: {
          type: 'object',
          properties: {
            collector: {
              type: 'number',
            },
          },
        },
        samples: [],
      },
    },
    matchCombination: {
      description: 'Match',
      longDescription: 'Math array of values and return the result. If no matching found returns the default value(defVal)',
      configuration: {
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
          type: 'string'
        }
      },
      js: async (
        sdk: AppknitSDK,
        configuration: {
          values: Array<any>,
          mapping: 'string';
          defVal: 'string'
        },
      ): Promise<any> => {
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
      },
      output: {
        dataSchema: {
          type: 'string',
        },
        samples: [],
      },
    },
    fieldValues: {
      description: 'Create an Array containing the values of the fields from the object',
      longDescription: '',
      configuration: {
        fieldNames: {
          title: 'Field names to get value',
          type: 'string',
        },
        item: {
          title: 'Object for values',
          type: 'object',
        },
      },
      js: async (
        sdk: AppknitSDK,
        configuration: {
          fieldNames: string;
          item: any;
        },
      ): Promise<any> => {
        const { fieldNames, item } = configuration;
        const result = [];
        const fnArray = fieldNames.split(',');
        for (const fn of fnArray) {
          result.push(item[fn]);
        }
        return Promise.resolve(result);
        // return Promise.resolve(configuration);
      },
      output: {
        dataSchema: {
          type: 'array',
          items: {
            type: 'object'
          }
        },
        samples: [],
      },
    },
    setProperty: {
      description: 'Set a property to an object',
      longDescription: '',
      configuration: {
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
      js: async (
        sdk: AppknitSDK,
        configuration: {
          setTo: any,
          fieldName: string;
          item: any;
        },
      ): Promise<any> => {
        const { setTo, fieldName, item } = configuration;
        setTo[fieldName] = item;
        return Promise.resolve(setTo);
        // return Promise.resolve(configuration);
      },
      output: {
        dataSchema: {
          type: 'object',
        },
        samples: [],
      },
    },
    setProperties: {
      description: 'Set a property to an object',
      longDescription: '',
      configuration: {
        setTo: {
          title: 'Set to object',
          type: 'object',
        },
        values: {
          title: 'Name of the property',
          type: 'string',
        }
      },
      js: async (
        sdk: AppknitSDK,
        configuration: {
          setTo: any,
          values: Array<{
            path: string,
            value: any
          }>
        },
      ): Promise<any> => {
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
      },
      output: {
        dataSchema: {
          type: 'object',
        },
        samples: [],
      },
    },
    setReferenceTo: {
      description: 'Set a property to an object',
      longDescription: '',
      configuration: {
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
      js: async (
        sdk: AppknitSDK,
        configuration: {
          items: Array<any>;
          propertyName: string;
          setTo: string,
        },
      ): Promise<any> => {
        const { items, propertyName, setTo } = configuration;
        for (const item of items) {
          item[setTo] = item[propertyName];
        }
        return Promise.resolve(items);
      },
      output: {
        dataSchema: {
          type: 'array',
        },
        samples: [],
      },
    },
    setValuesToItems: {
      description: 'Set a property to an object',
      longDescription: '',
      configuration: {
        items: {
          title: 'Items',
          type: 'array',
        },
        setValues: {
          type: 'array',
        }
      },
      js: async (
        sdk: AppknitSDK,
        configuration: {
          items: Array<any>;
          setValues: Array<{
            propertyName: string,
            setValue: any,
            setTo: string,
          }>,
        },
      ): Promise<any> => {
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
      },
      output: {
        dataSchema: {
          type: 'array',
        },
        samples: [],
      },
    },
    copyValueToNested: {
      description: 'Copy values of an object to its children',
      longDescription: '',
      configuration: {
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
      js: async (
        sdk: AppknitSDK,
        configuration: {
          items: Array<any>;
          propertyPath: string;
          copyValues: Array<{ setFrom: string, setTo: string }>,
        },
      ): Promise<any> => {
        const { items, propertyPath, copyValues } = configuration;
        if (items) {
          if (propertyPath && propertyPath.includes('.')) { }
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
      },
      output: {
        dataSchema: {
          type: 'object',
          description: 'The array of items each with the property referred to by \'setTo\' set with the property found in the path',
        },
        samples: [],
      },
    },
    pullUpAndSetReferenceTo: {
      description: 'Pulls up a property from same or down level and sets to a property at this level',
      longDescription: '',
      configuration: {
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
      js: async (
        sdk: AppknitSDK,
        configuration: {
          items: Array<any>;
          propertyPath: string;
          setTo: string,
        },
      ): Promise<any> => {
        const { items, propertyPath, setTo } = configuration;
        if (items) {
          const pathArr = propertyPath.split('/');
          for (const item of items) {
            let refObj = item;
            let found = false;
            for (const path of pathArr) {
              if (!refObj) { found = false; break; }
              refObj = refObj[path];
              found = true;
            }
            if (found) {
              item[setTo] = refObj;
            }
          }
        }
        return Promise.resolve(items);
      },
      output: {
        dataSchema: {
          type: 'object',
          description: 'The array of items each with the property referred to by \'setTo\' set with the property found in the path',
        },
        samples: [],
      },
    },
    cloneAndExecuteForEach: {
      description: 'Clone the given items and execute the operations on them',
      longDescription: '',
      configuration: {
        items: {
          title: 'Array of items to execute the operation',
          type: 'array',
        },
        operations: {
          title: 'Array of operations to execute',
          type: 'array',
          items: {
            type: 'string'
          }
        },
      },
      js: async (
        sdk: AppknitSDK,
        configuration: {
          items: Array<any>,
          operations: Array<string>;
        },
      ): Promise<any> => {
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
      },
      output: {
        dataSchema: {
          type: 'array',
          description: 'Items with field values matching to the given values',
        },
        samples: [],
      },
    },
    executeForEach: {
      description: 'Execute the operations on each item of an array',
      longDescription: '',
      configuration: {
        items: {
          title: 'Array of items to search',
          type: 'array',
        },
        operations: {
          title: 'Array of values to check',
          type: 'array',
          items: {
            type: 'string'
          }
        },
      },
      js: async (
        sdk: AppknitSDK,
        configuration: {
          items: Array<any>,
          operations: Array<string>;
        },
      ): Promise<any> => {
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
      },
      output: {
        dataSchema: {
          type: 'array',
          description: 'Items with field values matching to the given values',
        },
        samples: [],
      },
    },
    findItemsWithFieldValues: {
      description: 'Find the first item in the array with matching values from source object or values',
      longDescription: '',
      configuration: {
        items: {
          title: 'Array of items to search',
          type: 'array',
        },
        matchFields: {
          title: 'Array of values to check',
          type: 'array',
          items: {
            type: 'array'
          }
        },
      },
      js: async (
        sdk: AppknitSDK,
        configuration: {
          items: Array<any>,
          matchFields: Array<{ field: string, value: any }>;
        },
      ): Promise<any> => {
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
      },
      output: {
        dataSchema: {
          type: 'array',
          description: 'Items with field values matching to the given values',
        },
        samples: [],
      },
    },
    findItemsWithFieldValuesMatching: {
      description: 'Find the first item in the array with matching values from source object or values',
      longDescription: '',
      configuration: {
        items: {
          title: 'Array of items to search',
          type: 'array',
        },
        matchFields: {
          title: 'Array of values to check',
          type: 'array',
          items: {
            type: 'array'
          }
        },
      },
      js: async (
        sdk: AppknitSDK,
        configuration: {
          items: Array<any>,
          matchFields: Array<Array<any>>;
        },
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
      },
      output: {
        dataSchema: {
          type: 'array',
          description: 'Items with field values matching to the given values',
        },
        samples: [],
      },
    },
    findMatch: {
      description: 'Find the first item in the array with matching values from source object and plain values',
      longDescription: '',
      configuration: {
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
      js: async (
        sdk: AppknitSDK,
        configuration: {
          source: any,
          sourceFields: string;
          rawValues: string;
          checkObjects: Array<any>;
          matchFields: string;
          matchVal: string;
          noMatchVal: string;
        },
      ): Promise<any> => {
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
      },
      output: {
        dataSchema: {
          type: 'object',
          description: 'The first found property in any of the objects',
        },
        samples: [],
      },
    },
    findMatchingObject: {
      description: 'Find combination of values in the objects',
      longDescription: '',
      configuration: {
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
      js: async (
        sdk: AppknitSDK,
        configuration: {
          source: any,
          sourceFields: string;
          checkObjects: Array<any>;
          matchFields: string;
        },
      ): Promise<any> => {
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
      },
      output: {
        dataSchema: {
          type: 'object',
          description: 'The first found property in any of the objects',
        },
        samples: [],
      },
    },
    findWithPrefernce: {
      description: 'Find values with preference to earlier ones',
      longDescription: '',
      configuration: {
        fields: {
          title: 'Fields to search for, comma separated',
          type: 'string',
        },
        objects: {
          title: 'Array of items to search',
          type: 'array',
        },
      },
      js: async (
        sdk: AppknitSDK,
        configuration: {
          fields: string;
          objects: Array<any>;
        },
      ): Promise<any> => {
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
      },
      output: {
        dataSchema: {
          type: 'object',
          description: 'The first found property in any of the objects',
        },
        samples: [],
      },
    },
    findWithPrefernceOrDefault: {
      description: 'Find values with preference to earlier ones',
      longDescription: '',
      configuration: {
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
        }
      },
      js: async (
        sdk: AppknitSDK,
        configuration: {
          fields: string;
          objects: Array<any>;
          defaultVal: any;
        },
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
      },
      output: {
        dataSchema: {
          type: 'object',
        },
        samples: [],
      },
    },
    mapNested: {
      description: 'Map',
      longDescription: '',
      configuration: {
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
      js: async (
        sdk: AppknitSDK,
        configuration: {
          items: Array<any>,
          mapping: Array<{
            itemsPath: string,
            nestedPath: string,
            mapByField: string,
            setToField: string,
          }>
        },
      ): Promise<any> => {
        const { items, mapping } = configuration;
        let combinedResults = [];
        let subMappings = [];
        for (let item of items) {
          for (let mapConf of mapping) {
            if (item[mapConf.itemsPath] && item[mapConf.itemsPath][mapConf.nestedPath]) {
              let arr = item[mapConf.itemsPath][mapConf.nestedPath];
              if (arr) {
                subMappings.push({ items: arr, mapByField: mapConf.mapByField, setToField: mapConf.setToField })
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
      },
      output: {
        dataSchema: {
          type: 'object',
          description: 'An array of the input map with the input objects mapped for each item',
        },
        samples: [],
      },
    },
    mapToMap: {
      description: 'Map',
      longDescription: '',
      configuration: {
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
      js: async (
        sdk: AppknitSDK,
        configuration: {
          addToMap: Array<any>;
          mapByField: string;
          objects: Array<any>;
          setToField: string;
          refObject: string,
          refProperty: string,
        },
      ): Promise<any> => {
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
      },
      output: {
        dataSchema: {
          type: 'object',
          description: 'An array of the input map with the input objects mapped for each item',
        },
        samples: [],
      },
    },
    copyProperties1: {
      description: 'Copy properties',
      longDescription: '',
      configuration: {
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
        }
      },
      js: async (
        sdk: AppknitSDK,
        configuration: {
          source: any;
          destination: any;
          fieldsMapping: string;
          rowSeparator: string;
          columnSeparator: string;
        },
      ): Promise<any> => {
        const { source, destination, fieldsMapping, rowSeparator, columnSeparator } = configuration;

        const rows = fieldsMapping.split(rowSeparator);
        for (const row of rows) {
          const cols = row.split(columnSeparator);
          destination[cols[1]] = source[cols[0]];
        }
        return Promise.resolve(destination);
      },

      output: {
        dataSchema: {
          type: 'object',
          description: 'Object with the properties defined in fieldsMapping copied from the source',
        },
        samples: [],
      },
    },
    copyPropertiesToItems: {
      description: 'Copy properties',
      longDescription: '',
      configuration: {
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
        }
      },
      js: async (
        sdk: AppknitSDK,
        configuration: {
          source: any;
          destination: any;
          fieldsMapping: string;
          rowSeparator: string;
          columnSeparator: string;
        },
      ): Promise<any> => {
        const { source, destination, fieldsMapping, rowSeparator, columnSeparator } = configuration;

        const rows = fieldsMapping.split(rowSeparator);
        for (const row of rows) {
          const cols = row.split(columnSeparator);
          destination[cols[1]] = source[cols[0]];
        }
        return Promise.resolve(destination);
      },

      output: {
        dataSchema: {
          type: 'object',
        },
        samples: [],
      },
    },
    copyProperties: {
      description: 'Map',
      longDescription: '',
      configuration: {
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
      js: async (
        sdk: AppknitSDK,
        configuration: {
          mapping: {
            source: any;
            destination: any;
            fieldsMapping: Array<string[]>;
          };
        },
      ): Promise<any> => {
        const { mapping } = configuration;

        for (const fieldMap of mapping.fieldsMapping) {
          mapping.destination[fieldMap[1]] = mapping.source[fieldMap[0]];
        }
        return Promise.resolve(mapping.destination);
      },

      output: {
        dataSchema: {
          type: 'object',
        },
        samples: [],
      },
    },
    createDetailTaxLine: {
      description: 'CreateDetailTaxLines',
      longDescription: 'Creates detail tax lines from TaxableLines',
      configuration: {
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
      js: async (
        sdk: AppknitSDK,
        configuration: {
          taxableLine: any,
          detailLinesArray: Array<any>,
          internalOrganizationId: string,
          legalEntityId: string,
          errorMessageTypeFlag: string,
          errorString: string,
        },
      ): Promise<any> => {
        const { taxableLine, detailLinesArray, internalOrganizationId, legalEntityId, errorMessageTypeFlag, errorString } = configuration;
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
      },

      output: {
        dataSchema: {
          type: 'array',
          items: DetailTaxLineModel
        },
        samples: [],
      },
    },
    createDetailTaxLinesNoTax: {
      description: 'CreateDetailTaxLines',
      longDescription: 'Creates detail tax lines from TaxableLines',
      configuration: {
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
      js: async (
        sdk: AppknitSDK,
        configuration: {
          taxableLines: Array<any>,
          internalOrganizationId: string,
          legalEntityId: string,
          errorMessageTypeFlag: string,
          errorString: string,
        },
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
      },

      output: {
        dataSchema: {
          type: 'array',
          items: DetailTaxLineModel
        },
        samples: [],
      },
    },
    convertToXMLResponse: {
      description: 'convertToXml',
      longDescription: '',
      configuration: {
        data: {
          title: 'Data',
        },
      },
      js: async (
        sdk: AppknitSDK,
        configuration: {
          data: any;
        },
      ): Promise<any> => {
        const { data } = configuration;
        const xml = sdk.serialization.xml.stringify(data);
        return Promise.resolve(data);
      },
      output: {
        dataSchema: {
          title: 'Data',
        },
        samples: [],
      },
    },
    parseXML: {
      description: 'Parse XML to Json',
      longDescription: 'Parses XML and returns JSON',
      configuration: {
        data: {
          title: 'Data',
        },
      },
      js: async (
        sdk: AppknitSDK,
        configuration: {
          data: any;
        },
      ): Promise<any> => {
        const { data } = configuration;
        const json = sdk.serialization.xml.parse(data);
        return Promise.resolve(json);
      },
      output: {
        dataSchema: {
          title: 'Data',
        },
        samples: [],
      },
    },
    convertToXmlAction: {
      description: 'Convert json to xml',
      longDescription: '',
      configuration: {
        data: {
          title: 'Data',
          type: 'object',
        },
      },
      js: (
        sdk: AppknitSDK,
        configuration: {
          jsonData: any;
        },
      ): Promise<any> => {
        const { jsonData } = configuration;
        const xmlData = sdk.serialization.xml.stringify(jsonData);
        return Promise.resolve(xmlData);
      },
      output: {
        dataSchema: {
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
        samples: [],
      },
    },
  },
  schemas: {},
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

export default integration;
