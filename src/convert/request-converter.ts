// import * as fs from "fs";
import { AppknitSDK } from '@appknit-project/appknit-platform-sdk-v2';

export class RequestConverter {
  convertFusionRequestToJson = (request: string) => {
    console.log('Request ' + request);
  };

  parseXml(xml: string): any {
    const sdk = new AppknitSDK({});
    try {
      const resp = sdk.serialization.xml.parse(xml);
      const json = JSON.stringify(resp, null, 2);
      // fs.writeFileSync('schema.json', Buffer.from(json));
      console.log(JSON.stringify(resp, null, 2));
      const body = resp.Envelope.Body;
      if (body) {
        return this.mapBody(body);
      }
    } catch (err) {
      console.log(err);
      console.log('Failed to parse the xml.');
    }
    return null;
  }

  mapBody(body: any): any {
    console.log('Map body ' + JSON.stringify(body, null, 2));
  }
}

// const rs = new RequestConverter();
// // const file='../../test/samplefiles/Cloud-Incoming-Request.xml';
// const file = "../../test/samplefiles/OracleCloudTaxPortService.xml";
// const xml = fs.readFileSync(file, "utf-8");
// const parsed = rs.parseXml(xml);
// console.log(JSON.stringify(parsed, null, 2));
