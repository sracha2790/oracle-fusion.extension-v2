import { AppknitSDK, SdkHttpMethod, SdkHttpRequestOptions, SdkHttpResponse } from 'appknit-platform-sdk-v2';
const parser = require('fast-xml-parser');
import * as zlib from 'zlib';
// import * as fs from 'fs'
export class TaxPartnerClient {
  ParserOptions = {
    attributeNamePrefix: '@_',
    attrNodeName: 'attr', //default is 'false'
    textNodeName: '#text',
    ignoreAttributes: false,
    ignoreNameSpace: true,
    allowBooleanAttributes: false,
    parseNodeValue: true,
    parseAttributeValue: true,
    trimValues: true,
    cdataPositionChar: '\\c',
    arrayMode: false, //"strict"
  };

  async invokeImportTaxLines(sdk: AppknitSDK, host: string, documentId: string) {
    let body = `<soapenv:Envelope xmlns:soapenv="http://schemas.xmlsoap.org/soap/envelope/" xmlns:typ="http://xmlns.oracle.com/apps/financials/tax/transaction/taxPartnerService/types/">
        <soapenv:Header/>
        <soapenv:Body>
           <typ:importTaxLines>
              <typ:documentId>${documentId}</typ:documentId>
           </typ:importTaxLines>
        </soapenv:Body>
     </soapenv:Envelope>`;
    // console.log('BODY ' + body);
    let soapAction = 'http://xmlns.oracle.com/apps/financials/tax/transaction/taxPartnerService/importTaxLines';

    const result = await this.sendInvokeImportTaxLinesRequest(sdk, body, soapAction, host);

    return result;
  }

  async sendInvokeImportTaxLinesRequest(sdk: AppknitSDK, reqBody, soapAction, host): Promise<string> {
    const headers = {
      'User-Agent': 'appknit',
      'Content-Length': reqBody.length,
      'accept-charset': 'ISO-8859-1,utf-8;q=0.7,*;q=0.3',
      'accept-language': 'en-US,en;q=0.8',
      'Content-Type': 'text/xml; charset=utf-8',
      Accept: 'text/html,application/xhtml+xml,application/xml,text/xml;q=0.9,*/*;q=0.8',
      'accept-encoding': 'gzip,deflate',
      SOAPAction: soapAction,
    };
    const request: SdkHttpRequestOptions = {
      baseURL: host,
      path: '/fscmService/TaxPartnerService',
      method: SdkHttpMethod.post,
      headers: headers,
      query: null,
      maxRedirects: 5,
      body: reqBody,
      binaryResponse: true,
    };

    const res: SdkHttpResponse = await sdk.request(request);
    let procId: string = await this.parseImportTaxLinesResponse(res);
    return procId;
  }

  async parseImportTaxLinesResponse(res: SdkHttpResponse) {
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
        data = zlib.gunzipSync(buffer).toString();
        docId = await client.parseXmlForResultId(data, contentTypeHdr);
        // console.log("After gunizp");
      } else if (encoding == 'deflate') {
        data = zlib.inflateSync(buffer).toString();
        docId = await client.parseXmlForResultId(data, contentTypeHdr);
      } else {
        data = buffer.toString();
        docId = await client.parseXmlForResultId(data, contentTypeHdr);
      }
    }
    return docId;
  }

  async parseXmlForResultId(xml, contentTypeHdr) {
    // No clue why doc id is coming back, so returning everything in the response body
    return xml;
    // console.log('XML ',xml);
    // try {
    //     let resp = await parser.parse(xml, this.ParserOptions);
    //     const body = resp.Envelope.Body;
    //     console.log('BODY : ' + JSON.stringify(body));
    //     // console.log('RESULT : ', body.result);
    //     if (body && body['result']) {
    //         return body['result'];
    //     }
    // } catch (err) {
    //     console.log(err);
    //     console.log("Failed to parse the xml.");
    // }
    // return null;
  }
}
