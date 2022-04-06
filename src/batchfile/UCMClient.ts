import { CsvToDocumentConverter } from './../convert/CsvToDocumentConverter';
import { DocumentDetails } from './DocumentDetails';
import { AppknitSDK, SdkHttpMethod, SdkHttpRequestOptions, SdkHttpResponse } from 'appknit-platform-sdk-v2';
import { MultiPartParser } from './MultiPartParser';
import * as zlib from 'zlib';
// import * as fs from 'fs';
import * as AdmZip from 'adm-zip';

export class UCMClient {
  parserOptions = {
    attributeNamePrefix: '@_',
    attrNodeName: 'attr', //default is 'false'
    textNodeName: '#text',
    ignoreAttributes: true,
    ignoreNameSpace: true,
    allowBooleanAttributes: false,
    parseNodeValue: true,
    parseAttributeValue: true,
    trimValues: true,
    cdataPositionChar: '\\c',
    arrayMode: false, //"strict"
  };

  async getAllDocumentsByPrefixAndInterval(
    sdk: AppknitSDK,
    prefix,
    account,
    comment,
    dateSuffixes,
  ): Promise<DocumentDetails[]> {
    if (!account || account === '') {
      account = 'fin$/tax$/export$';
    }
    let documents = [];
    for (let suffix of dateSuffixes) {
      let appendedPrefix = prefix + suffix;
      let body = `<soapenv:Envelope xmlns:soapenv="http://schemas.xmlsoap.org/soap/envelope/" xmlns:typ="http://xmlns.oracle.com/apps/financials/commonModules/shared/model/erpIntegrationService/types/">
       <soapenv:Header/>
       <soapenv:Body>
          <typ:getDocumentsForFilePrefix>
             <typ:prefix>${appendedPrefix}</typ:prefix>
             <typ:account>${account}</typ:account>
             <typ:comments>${comment}</typ:comments>
          </typ:getDocumentsForFilePrefix>
       </soapenv:Body>
    </soapenv:Envelope>`;
      let soapAction =
        'http://xmlns.oracle.com/apps/financials/commonModules/shared/model/erpIntegrationService/getDocumentsForFilePrefix';
      let periodDocuments = await this.sendGetDocSoapRequestSDK(sdk, body, soapAction);
      if (periodDocuments && Array.isArray(periodDocuments)) {
        documents.push(...periodDocuments);
      }
    }
    return documents;
  }

  getAllDocumentsByPrefix(sdk: AppknitSDK, prefix, account, comment): Promise<DocumentDetails[]> {
    if (!account || account === '') {
      account = 'fin$/tax$/export$';
    }
    let body = `<soapenv:Envelope xmlns:soapenv="http://schemas.xmlsoap.org/soap/envelope/" xmlns:typ="http://xmlns.oracle.com/apps/financials/commonModules/shared/model/erpIntegrationService/types/">
       <soapenv:Header/>
       <soapenv:Body>
          <typ:getDocumentsForFilePrefix>
             <typ:prefix>${prefix}</typ:prefix>
             <typ:account>${account}</typ:account>
             <typ:comments>${comment}</typ:comments>
          </typ:getDocumentsForFilePrefix>
       </soapenv:Body>
    </soapenv:Envelope>`;
    // console.log('Request : '+body);
    let soapAction =
      'http://xmlns.oracle.com/apps/financials/commonModules/shared/model/erpIntegrationService/getDocumentsForFilePrefix';
    return this.sendGetDocSoapRequestSDK(sdk, body, soapAction);
  }

  async sendGetDocSoapRequestSDK(sdk: AppknitSDK, reqBody, soapAction): Promise<DocumentDetails[]> {
    const headers = {
      'User-Agent': 'appknit',
      'Content-Length': reqBody.length,
      'accept-charset': 'ISO-8859-1,utf-8;q=0.7,*;q=0.3',
      'accept-language': 'en-US,en;q=0.8',
      'Content-Type': 'text/xml; charset=utf-8',
      Accept: 'text/html,application/xhtml+xml,application/xml,text/xml;q=0.9,*/*;q=0.8',
      SOAPAction: soapAction,
      'accept-encoding': 'gzip,deflate',
    };
    // let secret = `Tax.Connector:Oracle123`;
    // secret = Buffer.from(secret, 'utf-8').toString('base64');
    // headers['Authorization'] = `Basic ${secret}`;
    const request: SdkHttpRequestOptions = {
      baseURL: 'https://oraclecloudinstance.com',
      path: '/fscmService/ErpIntegrationService',
      method: SdkHttpMethod.post,
      headers: headers,
      query: null,
      maxRedirects: 5,
      body: reqBody,
      binaryResponse: true,
      timeout: 300000,
    };

    const res: SdkHttpResponse = await sdk.request(request);

    const client = this;
    let docs: DocumentDetails[] = [];
    if (res.headers) {
      // console.log('HEADERS : ', res.headers);
      const contentTypeHdr = res.headers['content-type'];
      const encoding = res.headers['content-encoding'];
      let data;
      const buffer = Buffer.from(res.body);
      // fs.writeFileSync('BUFFERDATA', buffer);
      if (encoding == 'gzip') {
        data = zlib.gunzipSync(buffer);
        docs = await client.processGetDocumentResponseData(data, contentTypeHdr);
        // console.log('inside callback after processing docs');
        // console.log("After gunizp  "+data);
      } else if (encoding == 'deflate') {
        data = zlib.inflateSync(buffer);
        docs = await client.processGetDocumentResponseData(data, contentTypeHdr);
      } else {
        data = buffer;
        docs = await client.processGetDocumentResponseData(data, contentTypeHdr);
      }
    }
    // this.processDocumentDetails(docs);
    // console.log('docs : ' + JSON.stringify(docs));
    return docs;
  }

  async processDocumentResponse(res: SdkHttpResponse) {
    const client = this;
    let docs: DocumentDetails[] = [];
    if (res.headers) {
      // console.log('HEADERS : ', res.headers);
      const contentTypeHdr = res.headers['content-type'];
      const encoding = res.headers['content-encoding'];
      let data;
      const buffer = Buffer.from(res.body);
      // fs.writeFileSync('BUFFERDATA', buffer);
      if (encoding == 'gzip') {
        data = zlib.gunzipSync(buffer);
        docs = await client.processGetDocumentResponseData(data, contentTypeHdr);
        // console.log('inside callback after processing docs');
        // console.log("After gunizp");
      } else if (encoding == 'deflate') {
        data = zlib.inflateSync(buffer);
        docs = await client.processGetDocumentResponseData(data, contentTypeHdr);
      } else {
        data = buffer;
        docs = await client.processGetDocumentResponseData(data, contentTypeHdr);
      }
    }
    return docs;
  }

  async processGetDocumentResponseData(data, contentTypeHdr) {
    // console.log('processGetDocumentResponseData : data : ' + data);
    const multiparser = new MultiPartParser();
    let boundary = multiparser.getBoundaryFromContentType(contentTypeHdr);
    let documentDetails: DocumentDetails[] = multiparser.extractDocuments(data, boundary);
    // console.log('DocDetails : '+documentDetails);
    await this.processDocumentDetails(documentDetails);
    // this.extractZipFileContents(doc)
    return documentDetails;
  }

  async processDocumentDetails(documentDetails: DocumentDetails[]) {
    let docs = [];
    if (Array.isArray(documentDetails)) {
      for (let doc of documentDetails) {
        // docs.push(doc.DocumentName);
        if (doc.DocumentName.endsWith('.zip')) {
          await this.extractZipFileContents(doc);
        } else {
          // FIXING THE CONTENT CONVERSION HERE
          await this.extractBufferString(doc);
        }
      }
    }
    // showDocumentDetails(documentDetails);
    // this.writeFiles(documentDetails);
    // console.log('Docs inside process : ' + docs);
    return docs;
  }

  showDocumentDetails(documentDetails: DocumentDetails[]) {
    for (let doc of documentDetails) {
      console.log('Documents : ');
      if (doc.fileContents) {
        console.log(doc.fileContents.length);
        for (let cc of doc.fileContents) {
          console.log(cc.fileName);
        }
      }
    }
  }

  writeFiles(documentDetails: DocumentDetails[]) {
    for (let doc of documentDetails) {
      if (doc.DocumentName && doc.Content) {
        // fs.writeFileSync(doc.DocumentName, doc.Content);
      }
    }
  }

  async extractZipFileContents(document: DocumentDetails) {
    let zip = AdmZip(document.Content);
    // reset the document content to stop sending binary data
    document.Content = undefined;
    for (let entry of zip.getEntries()) {
      const fn = entry.entryName;
      // console.log("FileName : " + fn);
      let buf = zip.readFile(entry, null);
      if (buf[0] === 0xef && buf[1] === 0xbb && buf[2] === 0xbf) {
        buf = buf.slice(3);
      }
      // console.log(buf.toString());
      const fileContent = {
        fileName: fn,
        fileData: buf.toString(),
      };
      if (!document.fileContents) {
        document.fileContents = [fileContent];
      } else {
        document.fileContents.push(fileContent);
      }
    }
  }

  async extractBufferString(document: DocumentDetails) {
    const fileContent = {
      fileName: document.DocumentName,
      fileData: document.Content.toString(),
    };
    if (!document.fileContents) {
      document.fileContents = [fileContent];
    } else {
      document.fileContents.push(fileContent);
    }
  }
  //=====================================================//
  //   UPLOAD FILE TO UCM
  //=====================================================//

  /**
   * fileDetails should hava the Content as a Buffer
   **/
  uploadTaxFileFromBuffer(fileDetails, host, userName, passWord) {
    let base64data = fileDetails.Content.toString('base64');
  }
  async getXmlToUploadToUCM(sdk: AppknitSDK, documentDetail: DocumentDetails) {
    let data: string;
    if (documentDetail && documentDetail.Content) {
      // console.log('DocDetails Content : ', documentDetail.Content);
      // console.log('DocDetails Content --- ');
      // console.log(documentDetail.Content);
      // console.log('---- DocDetails Content');
      if (documentDetail.Content['data']) {
        data = Buffer.from(documentDetail.Content['data']).toString('base64');
      } else {
        data = documentDetail.Content.toString('base64');
      }
    } else if (documentDetail && documentDetail.fileContents && documentDetail.fileContents[0].fileData) {
      // console.log('DocDetails No Content');
      data = documentDetail.fileContents[0].fileData;
    }
    // console.log('DATA : ' + JSON.stringify(data, null, 2));

    let xmlBody = `
        <S:Envelope xmlns:S="http://schemas.xmlsoap.org/soap/envelope/" xmlns:SOAP-ENV="http://schemas.xmlsoap.org/soap/envelope/">
            <SOAP-ENV:Header/>
            <S:Body>
                <ns4:uploadFileToUcm xmlns:ns2="http://xmlns.oracle.com/adf/svc/types/" xmlns:ns3="http://xmlns.oracle.com/apps/financials/commonModules/shared/model/erpIntegrationService/" xmlns:ns4="http://xmlns.oracle.com/apps/financials/commonModules/shared/model/erpIntegrationService/types/" xmlns:ns5="http://xmlns.oracle.com/adf/svc/errors/" xmlns:ns6="commonj.sdo" xmlns:ns7="http://xmlns.oracle.com/oracleas/schema/oracle-fault-11_0">
                    <ns4:document>
                        <ns3:Content>${data}</ns3:Content>
                        <ns3:DocumentTitle>${documentDetail.DocumentTitle}</ns3:DocumentTitle>
                        <ns3:DocumentName>${documentDetail.DocumentName}</ns3:DocumentName>
                        <ns3:FileName>${documentDetail.FileName}</ns3:FileName>
                        <ns3:ContentType>${documentDetail.ContentType}</ns3:ContentType>
                        <ns3:DocumentAuthor>${documentDetail.DocumentAuthor}</ns3:DocumentAuthor>
                        <ns3:DocumentSecurityGroup>${documentDetail.DocumentSecurityGroup}</ns3:DocumentSecurityGroup>
                        <ns3:DocumentAccount>${documentDetail.DocumentAccount}</ns3:DocumentAccount>
                    </ns4:document>
                </ns4:uploadFileToUcm>
            </S:Body>
        </S:Envelope>
    `;

    return xmlBody;
  }

  async uploadTaxFileData(sdk: AppknitSDK, documentDetail: DocumentDetails) {
    let data: string;
    if (documentDetail && documentDetail.Content) {
      // console.log(documentDetail.Content);
      if (documentDetail.Content['data']) {
        data = Buffer.from(documentDetail.Content['data']).toString('base64');
      } else {
        data = documentDetail.Content.toString('base64');
      }
    } else if (documentDetail && documentDetail.fileContents && documentDetail.fileContents[0].fileData) {
      data = documentDetail.fileContents[0].fileData;
    }
    let xmlBody = `
        <S:Envelope xmlns:S="http://schemas.xmlsoap.org/soap/envelope/" xmlns:SOAP-ENV="http://schemas.xmlsoap.org/soap/envelope/">
            <SOAP-ENV:Header/>
            <S:Body>
                <ns4:uploadFileToUcm xmlns:ns2="http://xmlns.oracle.com/adf/svc/types/" xmlns:ns3="http://xmlns.oracle.com/apps/financials/commonModules/shared/model/erpIntegrationService/" xmlns:ns4="http://xmlns.oracle.com/apps/financials/commonModules/shared/model/erpIntegrationService/types/" xmlns:ns5="http://xmlns.oracle.com/adf/svc/errors/" xmlns:ns6="commonj.sdo" xmlns:ns7="http://xmlns.oracle.com/oracleas/schema/oracle-fault-11_0">
                    <ns4:document>
                        <ns3:Content>${data}</ns3:Content>
                        <ns3:DocumentTitle>${documentDetail.DocumentTitle}</ns3:DocumentTitle>
                        <ns3:DocumentName>${documentDetail.DocumentName}</ns3:DocumentName>
                        <ns3:FileName>${documentDetail.FileName}</ns3:FileName>
                        <ns3:ContentType>${documentDetail.ContentType}</ns3:ContentType>
                        <ns3:DocumentAuthor>${documentDetail.DocumentAuthor}</ns3:DocumentAuthor>
                        <ns3:DocumentSecurityGroup>${documentDetail.DocumentSecurityGroup}</ns3:DocumentSecurityGroup>
                        <ns3:DocumentAccount>${documentDetail.DocumentAccount}</ns3:DocumentAccount>
                    </ns4:document>
                </ns4:uploadFileToUcm>
            </S:Body>
        </S:Envelope>
    `;

    let soapAction =
      'http://xmlns.oracle.com/apps/financials/commonModules/shared/model/erpIntegrationService/uploadFileToUcm';
    return await this.sendUploadFileSoapRequest(sdk, xmlBody, soapAction);
  }

  async sendUploadFileSoapRequest(sdk, reqBody, soapAction) {
    let headers = {
      'User-Agent': 'Appknit',
      'Content-Length': reqBody.length,
      'accept-charset': 'ISO-8859-1,utf-8;q=0.7,*;q=0.3',
      'accept-language': 'en-US,en;q=0.8',
      'Content-Type': 'text/xml; charset=utf-8',
      Accept: 'text/html,application/xhtml+xml,application/xml,text/xml;q=0.9,*/*;q=0.8',
      SOAPAction: soapAction,
      'accept-encoding': 'gzip,deflate',
    };
    const request: SdkHttpRequestOptions = {
      baseURL: 'https://oraclecloudinstance.com',
      path: '/fscmService/ErpIntegrationService',
      method: SdkHttpMethod.post,
      headers: headers,
      query: null,
      maxRedirects: 5,
      body: reqBody,
      binaryResponse: true,
    };

    const res: SdkHttpResponse = await sdk.request(request);
    let docId: string = await this.processUploadDocumentResponse(res);
    return docId;
  }

  async processUploadDocumentResponse(res: SdkHttpResponse) {
    const client = this;
    let docId: string;
    if (res.headers) {
      // console.log('HEADERS : ', res.headers);
      const contentTypeHdr = res.headers['content-type'];
      const encoding = res.headers['content-encoding'];
      let data;
      const buffer = Buffer.from(res.body);
      // fs.writeFileSync('BUFFERDATA', buffer);
      if (encoding == 'gzip') {
        data = zlib.gunzipSync(buffer);
        docId = await client.processUploadDocumentResponseData(data, contentTypeHdr);
        // console.log('inside callback after processing docs');
        // console.log("After gunizp");
      } else if (encoding == 'deflate') {
        data = zlib.inflateSync(buffer);
        docId = await client.processUploadDocumentResponseData(data, contentTypeHdr);
      } else {
        data = buffer;
        docId = await client.processUploadDocumentResponseData(data, contentTypeHdr);
      }
    }
    return docId;
  }

  async processUploadDocumentResponseData(data, contentTypeHdr) {
    // console.log('processGetDocumentResponseData : data : ' + data);
    const multiparser = new MultiPartParser();
    let boundary = multiparser.getBoundaryFromContentType(contentTypeHdr);
    let documentId: string = multiparser.extractUploadedDocumentId(data, boundary);
    return documentId;
  }
}
