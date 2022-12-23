import { SdkExtension } from '@appknit-project/appknit-platform-sdk-v2';
import * as packageJson from '../package.json';
import * as expressionFunctions from './expression-functions';
import * as flowFunctions from './flow-functions';

const extension: SdkExtension = {
  name: 'oracleFusion',
  websiteUrl: '',
  documentationUrl: '',
  iconUrl: '',
  description: 'Oracle Fusion Tax Partner API Extension',
  longDescription: 'Oracle Fusion Tax Partner API Extension',
  version: packageJson.version,
  platformVersion: packageJson.dependencies['@appknit-project/appknit-platform-sdk-v2'],
  releaseChanges: 'Created extension',
  flowFunctions,
  graphFunctions: {},
  expressionFunctions,
};

export default extension;
