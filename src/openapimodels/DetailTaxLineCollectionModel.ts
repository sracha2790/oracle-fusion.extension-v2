import { DetailTaxLineModel } from './DetailTaxLineModel';
import { SdkOpenApiSchemaProperty } from '@appknit-project/appknit-platform-sdk-v2';

export const DetailTaxLineCollectionModel: SdkOpenApiSchemaProperty = {
  description: 'DetailTaxLineCollectionModel',
  type: 'object',
  properties: {
    detailTaxLines: {
      type: 'array',
      items: DetailTaxLineModel,
    },
  },
};
