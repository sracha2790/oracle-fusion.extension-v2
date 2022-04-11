import { SdkOpenApiSchemaProperty } from 'appknit-platform-sdk-v2';

export const OverrideTaxDetailModel: SdkOpenApiSchemaProperty = {
  description: 'TaxOverrideModel',
  type: 'object',
  properties: {
    lineNum: {
      type: 'string',
      description: 'Line number for this over riding tax',
    },
    TaxRate: {
      type: 'number',
      description: 'Tax rate for calculation',
    },
    TaxAmt: {
      type: 'number',
      description: 'Calculated Tax override',
    },
    TaxAmtTaxCurr: {
      type: 'number',
      description: '',
    },
    UnroundedTaxAmt: {
      type: 'number',
      description: '',
    },
    ReturnVbtLineOnly: {
      type: 'boolean',
      description: 'If only VBT line has to be returned for this',
    },
  },
};
