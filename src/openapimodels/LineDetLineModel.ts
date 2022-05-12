import { DetailTaxLineModel } from './DetailTaxLineModel';
import { SdkOpenApiSchemaProperty } from '@appknit-project/appknit-platform-sdk-v2';
import { TaxableLineModel } from './TaxableLineModel';
export const LineDetLineModel: SdkOpenApiSchemaProperty = {
  description: 'LineDetLineModel',
  type: 'object',
  properties: {
    line: TaxableLineModel,
    dtl: DetailTaxLineModel,
  },
};
