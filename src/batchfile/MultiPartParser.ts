import { DocumentDetails } from './DocumentDetails';
const parser = require('fast-xml-parser');

export class MultiPartParser {
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
  BOUNDARY = 'boundary="';
  BLEN = 'boundary="'.length;

  extractDocuments(data, boundary): DocumentDetails[] {
    let parts = this.getMultiParts(data, boundary);
    let documentDetails: DocumentDetails[];
    let i = 0;
    if (parts && parts.length > 0) {
      let sections = this.splitToHeaderAndData(parts[i]);
      let xml = sections[1].toString();
      documentDetails = this.parseXmlForDocOrDocs(xml);
    }
    i = 1;
    if (documentDetails) {
      let docDatas = [];
      for (; i < parts.length; i++) {
        let sections = this.splitToHeaderAndData(parts[i]);
        let headers = this.getHeaders(sections[0]);
        let content = sections[1];
        docDatas.push({
          headers: headers,
          content: content,
        });
      }
      for (let doc of documentDetails) {
        let dcid = '<' + doc.ContentID + '>';
        for (let docData of docDatas) {
          if (docData.headers) {
            if (docData.headers['Content-ID'] == dcid) {
              doc.Content = docData.content;
              break;
            }
          }
        }
      }
    }

    return documentDetails;
  }

  parseXmlForDocOrDocs(xml): DocumentDetails[] {
    // console.log('DocOrDocs - XML : '+xml);
    try {
      let resp = parser.parse(xml, this.ParserOptions);
      const body = resp.Envelope.Body;
      // console.log('BODY : ' + JSON.stringify(body));
      // console.log('RESULT : ',body.getDocumentsForFilePrefixResponse.result);

      if (body.getDocumentsForFilePrefixResponse) {
        return this.parseDocsForPrefixXml(resp);
      } else if (body.getDocumentForDocumentIdResponse) {
        return [this.parseDocForIdXml(resp)];
      }
    } catch (err) {
      console.log(err);
      console.log('Failed to parse the xml.');
    }
    return null;
  }

  getBoundaryFromResponse(response) {
    var contentType = response.headers['content-type'];
    return this.getBoundaryFromContentType(contentType);
  }

  getBoundaryFromContentType(contentType) {
    if (contentType) {
      let bidx = contentType.indexOf(this.BOUNDARY);
      if (bidx > -1) {
        return contentType.substring(bidx + this.BLEN, contentType.indexOf('"', bidx + this.BLEN + 1));
      }
    }
    return null;
  }

  getMultiParts(data, boundary) {
    // ADD TWO -- TO MAKE THE SEPARATION WORD
    let sbuff = Buffer.from('--' + boundary + '\r\n');
    let ebuff = Buffer.from('\r\n--' + boundary + '--\r\n');
    let ebPos = data.indexOf(ebuff, 0);
    let buff = data.slice(0, ebPos);

    let buffs = [];
    let start = 0;

    if (buff.indexOf(sbuff) == 0) {
      start = sbuff.length;
    } else {
      console.log("Didn't start with PartId [" + sbuff.toString() + ']. Not processing.');
      // console.log(data.toString())
      return null;
    }
    sbuff = Buffer.from('\r\n--' + boundary + '\r\n');

    let blength = buff.length;
    while (start < blength) {
      let index = buff.indexOf(sbuff, start);
      if (index == -1) {
        index = buff.length;
      }
      buffs.push(buff.slice(start, index));
      start = index + sbuff.length;
    }
    return buffs;
  }

  splitToHeaderAndData(part) {
    let sep = '\r\n\r\n';

    let fpend = part.indexOf(sep);
    let sections = [];
    if (fpend > -1 && fpend < part.length) {
      sections.push(part.slice(0, fpend));
      sections.push(part.slice(fpend + sep.length, part.length));
    }
    return sections;
  }

  getHeaders(hdrPart) {
    let splitter = '\r\n';
    let blength = hdrPart.length;
    let spLen = splitter.length;
    let start = 0;
    let headers = {};
    while (start < blength) {
      let index = hdrPart.indexOf(splitter, start);
      if (index == -1) {
        index = hdrPart.length;
      }
      let hdr = hdrPart.slice(start, index);
      let colIdx = hdr.indexOf(':');
      let key = hdr.slice(0, colIdx).toString().trim();
      let value = hdr
        .slice(colIdx + 1, hdr.length)
        .toString()
        .trim();
      headers[key] = value;
      start = index + spLen;
    }
    return headers;
  }

  parseDocForIdXml(xml): DocumentDetails {
    try {
      let resp = parser.parse(xml, this.ParserOptions);
      const body = resp.Envelope.Body;
      let res = body.getDocumentForDocumentIdResponse.result;
      let cidTagVal = res.Content.Include.attr['@_href'];
      let cid = cidTagVal.substring(4);
      let fileDetails: DocumentDetails = {
        DocumentName: res.DocumentName,
        DocumentTitle: res.DocumentTitle,
        DocumentAuthor: res.DocumentAuthor,
        DocumentSecurityGroup: res.DocumentSecurityGroup,
        DocumentAccount: res.DocumentAccount,
        DocumentId: res.DocumentId,
        ContentType: res.ContentType,
        FileName: res.FileName,
        ContentID: cid,
        Content: null,
      };

      return fileDetails;
    } catch (err) {
      console.log(err);
      console.log('Failed to parse the xml.');
    }
    return null;
  }

  parseDocsForPrefixXml(resp) {
    let documentDetails: DocumentDetails[] = [];

    const body = resp.Envelope.Body;
    let results;
    if (!body.getDocumentsForFilePrefixResponse.result) {
      return documentDetails;
    }
    if (Array.isArray(body.getDocumentsForFilePrefixResponse.result)) {
      results = body.getDocumentsForFilePrefixResponse.result;
    } else {
      results = [body.getDocumentsForFilePrefixResponse.result];
    }
    for (let res of results) {
      let cidTagVal = res.Content.Include.attr['@_href'];
      let cid = cidTagVal.substring(4);
      let fileDetails: DocumentDetails = {
        DocumentName: res.DocumentName,
        DocumentTitle: res.DocumentTitle,
        DocumentAuthor: res.DocumentAuthor,
        DocumentSecurityGroup: res.DocumentSecurityGroup,
        DocumentAccount: res.DocumentAccount,
        DocumentId: res.DocumentId,
        ContentType: res.ContentType,
        FileName: res.FileName,
        ContentID: cid,
        Content: null,
      };

      documentDetails.push(fileDetails);
    }

    return documentDetails;
  }

  extractUploadedDocumentId(data, boundary): string {
    let parts = this.getMultiParts(data, boundary);
    let id: string;
    if (parts && parts.length > 0) {
      let sections = this.splitToHeaderAndData(parts[0]);
      let xml = sections[1].toString();
      id = this.parseXmlForResultId(xml);
    }
    return id;
  }

  parseXmlForResultId(xml): string {
    try {
      let resp = parser.parse(xml, this.ParserOptions);
      const body = resp.Envelope.Body;
      console.log('BODY : ' + JSON.stringify(body));
      // console.log('RESULT : ',body.getDocumentsForFilePrefixResponse.result);

      if (body && body['uploadFileToUcmResponse'] && body['uploadFileToUcmResponse']['result']) {
        return body['uploadFileToUcmResponse']['result'];
      }
    } catch (err) {
      console.log(err);
      console.log('Failed to parse the xml.');
    }
    return null;
  }
}
