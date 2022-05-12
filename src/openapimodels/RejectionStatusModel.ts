import { SdkOpenApiSchemaProperty } from '@appknit-project/appknit-platform-sdk-v2';

export const RejectionStatusModel: SdkOpenApiSchemaProperty = {
  description: 'RejectionStatusModel',
  type: 'object',
  properties: {
    'ns:Success': {
      type: 'boolean',
    },
    'ns:ErrorString': {
      type: 'string',
    },
    'ns:ErrorMessageCode': {
      type: 'string',
    },
  },
};
