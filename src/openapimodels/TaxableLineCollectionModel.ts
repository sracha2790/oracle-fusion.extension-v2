import { TaxableLineModel } from './TaxableLineModel';
import { SdkOpenApiSchemaProperty } from '@appknit-project/appknit-platform-sdk-v2';

export const TaxableLineCollectionModel: SdkOpenApiSchemaProperty = {
  description: 'TaxableLineCollectionModel',
  type: 'object',
  properties: {
    taxableLine: {
      type: 'array',
      items: TaxableLineModel,
    },
  },
};
