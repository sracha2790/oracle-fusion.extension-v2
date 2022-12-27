import { SdkOpenApiSchemaProperty } from '@appknit-project/appknit-platform-sdk-v2';

export const TaxOverrideDetailsModel: SdkOpenApiSchemaProperty = {
  description: 'TaxOverrideDetailsModel',
  type: 'object',
  properties: {
    ReturnOnlyVbtLines: {
      type: 'boolean',
      description: 'Whether to return only VBT line',
    },
    lineNumber: {
      type: 'number',
      description: 'Line number for which this tax override applies',
    },
    taxRate: {
      type: 'number',
      description: 'Tax Rate',
    },
    taxAmt: {
      type: 'number',
      description: 'Tax Amount',
    },
    taxAmtTaxCurr: {
      type: 'number',
      description: 'Tax Amount',
    },
    unroundedTaxAmt: {
      type: 'number',
      description: 'Unrounded Tax Amount',
    },
  },
};

export const ProRateTaxDetailModel: SdkOpenApiSchemaProperty = {
  description: 'TaxOverrideModel',
  type: 'object',
  properties: {
    ReturnOnlyVbtLines: {
      type: 'boolean',
      description: 'Return Only Vbt Lines',
    },
    overRides: {
      type: 'object',
      description: 'over Rides',
      properties:{
        lineNumber: {
          type: 'number',
          description: 'Line number for which this tax override applies',
        },
      },
    },
    vbtTaxAmtDetails: {
      type: 'object',
      description: 'vbt Tax Amt Details',
      properties:{
        taxRate: {
          type: 'number',
          description: 'taxRate',
        },
        taxAmt: {
          type: 'number',
          description: 'taxAmt',
        },
        taxAmtTaxCurr: {
          type: 'number',
          description: 'taxAmtTaxCurr',
        },
        unroundedTaxAmt: {
          type: 'number',
          description: 'unroundedTaxAmt',
        },
        taxDetails: {
          type: 'array',
          description: 'taxDetails',
          items:{
            type: 'object'
          }
        },
        ReturnVbtLineOnly: {
          type: 'boolean',
          description: 'ReturnVbtLineOnly',
        },
      }
    },
  },
};
