import { SdkOpenApiSchemaProperty } from '@appknit-project/appknit-platform-sdk-v2';

export const VoidModel: SdkOpenApiSchemaProperty = {
  description: 'VoidModel',
  type: 'object',
  properties: {
    'ns:ErrorString': {
      type: 'string',
    },
    'ns:ErrorMessageCode': {
      type: 'string',
    },
  },
};
