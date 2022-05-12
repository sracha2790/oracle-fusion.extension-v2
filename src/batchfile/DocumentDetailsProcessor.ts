import { AppknitSDK } from '@appknit-project/appknit-platform-sdk-v2';
import { CsvToDocumentConverter } from './../convert/CsvToDocumentConverter';
import { FileProcessingConfiguration } from './FileProcessingConfiguration';
import { DocumentDetails } from './DocumentDetails';
export class DocumentDetailsProcessor {
  processDocumentDetails(
    sdk: AppknitSDK,
    configuration: {
      documentDetails: Array<DocumentDetails>;
      processingConfig: FileProcessingConfiguration[];
    },
  ) {
    const { documentDetails, processingConfig } = configuration;

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
            let docContent = docDet.Content.toString();
            if (proConfig.contentType == 'csv') {
              let csvDataJson = csvDocBuilder.parseCSVWithUpperCaseHeaders(docContent);
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
                contentDocuments.push(sdk.serialization.xml.parse(docContent));
              } else if (proConfig.contentType == 'json') {
                contentDocuments.push(sdk.serialization.json.parse(docContent));
              } else {
                contentDocuments.push(docContent);
              }
            }
          }
          mappedDocs[proConfig.mappingName].push(docDet);
        }
      }
    }

    return Promise.resolve(mappedDocs);
  }

  processCsvData(
    sdk: AppknitSDK,
    proConfig: FileProcessingConfiguration,
    contentDocuments,
    docContent: string,
    csvDocBuilder: CsvToDocumentConverter,
  ) {
    if (proConfig.contentType == 'csv') {
      let csvDataJson = csvDocBuilder.parseCSVWithUpperCaseHeaders(docContent);
      if (proConfig.docLevelid) {
        // Fetch the docLevel json and parse it and use it as DocLevelDef
        let docLevelDefs = {};
        let root = csvDocBuilder.createHierarchy(csvDataJson, null);
        contentDocuments = root[docLevelDefs['name']];
      } else if (proConfig.docLevels) {
        let root = csvDocBuilder.createHierarchy(csvDataJson, proConfig.docLevels);
        contentDocuments = root[proConfig.docLevels.name];
      } else {
        contentDocuments = [csvDataJson];
      }
    } else {
      if (proConfig.contentType == 'xml') {
        contentDocuments.push(sdk.serialization.xml.parse(docContent));
      } else if (proConfig.contentType == 'json') {
        contentDocuments.push(sdk.serialization.json.parse(docContent));
      } else {
        contentDocuments.push(docContent);
      }
    }
  }
}
