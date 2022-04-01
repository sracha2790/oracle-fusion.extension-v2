import { DocLevelDefinition } from "./../batchfile/FileProcessingConfiguration";
import { CsvToDocumentConverter } from "./../convert/CsvToDocumentConverter";
import {
  AppknitSDK,
  SdkHttpMethod,
  SdkHttpRequestOptions,
  SdkHttpResponse,
} from "appknit-platform-sdk-v2";
import * as zlib from "zlib";
const parser = require("fast-xml-parser");

export class ReportClient {
  ParserOptions = {
    attributeNamePrefix: "@_",
    attrNodeName: "attr", //default is 'false'
    textNodeName: "#text",
    ignoreAttributes: false,
    ignoreNameSpace: true,
    allowBooleanAttributes: false,
    parseNodeValue: true,
    parseAttributeValue: true,
    trimValues: true,
    cdataPositionChar: "\\c",
    arrayMode: false, //"strict"
  };

  async getExciseDocument(
    sdk: AppknitSDK,
    reportPath: string,
    host: string,
    path: string,
    userid: string,
    password: string,
    trxId: string,
    docLevels: DocLevelDefinition
  ) {
    let exciseReportCsv = await this.runFusionReport(
      sdk,
      reportPath,
      host,
      path,
      userid,
      password,
      trxId,
      false
    );
    let csvDocBuilder = new CsvToDocumentConverter();
    let csvDataJson = csvDocBuilder.parseCSVWithUpperCaseHeaders(
      exciseReportCsv
    );
    if (docLevels) {
      csvDocBuilder.translateDocLevelDefinition(docLevels);
      let root = csvDocBuilder.createHierarchy(csvDataJson, docLevels);
      let doc = root[docLevels.name];
      return doc;
    }
    return exciseReportCsv;
  }

  async runFusionReportWithBody(
    sdk: AppknitSDK,
    host: string,
    path: string,
    reportRequest: any,
    userid: string,
    password: string,
    isDataModel: boolean
  ): Promise<string> {
    let arr = [];
    arr.push("<v2:reportRequest>");
    this.buildXmlFromJson("reportRequest", reportRequest, arr);
    arr.push("</v2:reportRequest>");
    let reportRequestAttrsXml = arr.join("");
    let body =
      `<soapenv:Envelope xmlns:soapenv="http://schemas.xmlsoap.org/soap/envelope/" xmlns:v2="http://xmlns.oracle.com/oxp/service/v2">
            <soapenv:Header/>
                <soapenv:Body>` +
      (isDataModel ? "<v2:runDataModel>" : "<v2:runReport>") +
      reportRequestAttrsXml +
      `<v2:userID>${userid}</v2:userID>
             <v2:password>${password}</v2:password>
             ` +
      (isDataModel ? "</v2:runDataModel>" : "</v2:runReport>") +
      `</soapenv:Body>
             </soapenv:Envelope>`;
    let soapAction =
      "http://xmlns.oracle.com/oxp/service/v2/ReportService/runReportRequest";
    return await this.sendGetDocSoapRequestSDK(
      sdk,
      host,
      path,
      body,
      soapAction,
      isDataModel
    );
  }

  async runFusionReport(
    sdk: AppknitSDK,
    reportPath: string,
    host: string,
    path: string,
    userid: string,
    password: string,
    parameters: any,
    isDataModel: boolean
  ): Promise<string> {
    let paramsXml = "";
    if (parameters && Array.isArray(parameters)) {
      for (let param of parameters) {
        paramsXml +=
          "<v2:item>" +
          "<v2:name>" +
          param["name"] +
          "</v2:name>" +
          "<v2:values>";
        if (Array.isArray(param["value"])) {
          for (let val of param["value"]) {
            paramsXml += "<v2:item>" + val + "</v2:item>";
          }
        } else {
          paramsXml += "<v2:item>" + param["value"] + "</v2:item>";
        }
        paramsXml += "</v2:values></v2:item>";
      }
    }

    let body =
      `<soapenv:Envelope xmlns:soapenv="http://schemas.xmlsoap.org/soap/envelope/" xmlns:v2="http://xmlns.oracle.com/oxp/service/v2">
            <soapenv:Header/>
                <soapenv:Body>` +
      (isDataModel ? "<v2:runDataModel>" : "<v2:runReport>") +
      `                    
                        <v2:reportRequest>
                            <v2:parameterNameValues>
                                <v2:listOfParamNameValues>` +
      paramsXml +
      `</v2:listOfParamNameValues>
                            </v2:parameterNameValues>         
                            <v2:reportAbsolutePath>${reportPath}</v2:reportAbsolutePath>
                        </v2:reportRequest>
                        <v2:userID>${userid}</v2:userID>
                        <v2:password>${password}</v2:password>
                        ` +
      (isDataModel ? "</v2:runDataModel>" : "</v2:runReport>") +
      `                    
                </soapenv:Body>
                </soapenv:Envelope>`;
    let soapAction =
      "http://xmlns.oracle.com/oxp/service/v2/ReportService/runReportRequest";

    return await this.sendGetDocSoapRequestSDK(
      sdk,
      host,
      path,
      body,
      soapAction,
      isDataModel
    );
  }

  async sendGetDocSoapRequestSDK(
    sdk: AppknitSDK,
    host,
    path,
    reqBody,
    soapAction,
    isDataModel
  ): Promise<string> {
    const headers = {
      "User-Agent": "appknit",
      "Content-Length": reqBody.length,
      "accept-charset": "ISO-8859-1,utf-8;q=0.7,*;q=0.3",
      "accept-language": "en-US,en;q=0.8",
      "Content-Type": "text/xml; charset=utf-8",
      Accept:
        "text/html,application/xhtml+xml,application/xml,text/xml;q=0.9,*/*;q=0.8",
      SOAPAction: soapAction,
      "accept-encoding": "gzip,deflate",
    };
    const request: SdkHttpRequestOptions = {
      baseURL: host,
      path: path,
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
    let docs: string;
    if (res.headers) {
      // console.log('HEADERS : ', res.headers);
      const contentTypeHdr = res.headers["content-type"];
      const encoding = res.headers["content-encoding"];
      let data;
      const buffer = Buffer.from(res.body);
      // fs.writeFileSync('BUFFERDATA', buffer);
      if (encoding == "gzip") {
        data = zlib.gunzipSync(buffer);
        docs = await client.processReportData(data, isDataModel);
        // console.log('inside callback after processing docs');
        // console.log("After gunizp");
      } else if (encoding == "deflate") {
        data = zlib.inflateSync(buffer);
        docs = await client.processReportData(data, isDataModel);
      } else {
        data = buffer;
        docs = await client.processReportData(data, isDataModel);
      }
    }
    return docs;
  }

  async processReportData(data, isDataModel) {
    try {
      let resp = await parser.parse(data.toString(), this.ParserOptions);
      let respBody = resp["Envelope"] ? resp["Envelope"]["Body"] : undefined;
      if (isDataModel) {
        if (
          respBody &&
          respBody["runDataModelResponse"] &&
          respBody["runDataModelResponse"]["runDataModelReturn"] &&
          respBody["runDataModelResponse"]["runDataModelReturn"]["reportBytes"]
        ) {
          let reportBytes;
          reportBytes =
            resp["Envelope"]["Body"]["runDataModelResponse"][
              "runDataModelReturn"
            ]["reportBytes"];
          let buf = Buffer.from(reportBytes, "base64");
          if (buf[0] === 0xef && buf[1] === 0xbb && buf[2] === 0xbf) {
            buf = buf.slice(3);
          }
          let text = buf.toString("utf8");
          return text;
        }
      } else {
        if (
          respBody &&
          respBody["runReportResponse"] &&
          respBody["runReportResponse"]["runReportReturn"] &&
          respBody["runReportResponse"]["runReportReturn"]["reportBytes"]
        ) {
          let reportBytes;
          reportBytes =
            resp["Envelope"]["Body"]["runReportResponse"]["runReportReturn"][
              "reportBytes"
            ];
          let buf = Buffer.from(reportBytes, "base64");
          if (buf[0] === 0xef && buf[1] === 0xbb && buf[2] === 0xbf) {
            buf = buf.slice(3);
          }
          let text = buf.toString("utf8");
          return text;
        }
      }
    } catch (err) {
      console.log("ERROR " + err);
      console.error(err);
    }
    return "";
  }

  buildXmlFromJson(propName, obj, arr) {
    if (obj instanceof Object) {
      if (Array.isArray(obj)) {
        for (let item of obj) {
          arr.push("<v2:" + propName + ">");
          this.buildXmlFromJson(propName, item, arr);
          arr.push("</v2:" + propName + ">");
        }
      } else {
        for (let k in obj) {
          if (obj.hasOwnProperty(k)) {
            let nextObj = obj[k];
            if (Array.isArray(nextObj)) {
              this.buildXmlFromJson(k, nextObj, arr);
            } else {
              arr.push("<v2:" + k + ">");
              this.buildXmlFromJson(k, nextObj, arr);
              arr.push("</v2:" + k + ">");
            }
          }
        }
      }
    } else {
      arr.push(obj);
    }
  }
}
