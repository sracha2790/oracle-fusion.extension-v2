import { SdkExpressionFunctionEntry } from '@appknit-project/appknit-platform-sdk-v2';
import {
  getConfigurationCodeValueJS,
  resolveAvalaraParametersMappingJS,
  resolveFieldValueByFieldMappingJS,
  resolveUserDefinedFieldValuesJS,
  itemHSNCodeMappingJS,
} from './function-js';

export const getConfigurationCodeValue: SdkExpressionFunctionEntry = {
  description: 'Appknit custom expression funtion to fetch config code values',
  inputSchema: {
    type: 'object',
    properties: {
      functionArguments: {
        description: 'Function Arguments',
        type: 'array',
      },
    },
  },
  js: getConfigurationCodeValueJS,
  outputSchema: {
    title: 'Result',
    type: 'object',
  },
};

export const resolveFieldValueByFieldMapping: SdkExpressionFunctionEntry = {
  description: 'Expression funtion to resolve field mapping',
  inputSchema: {
    type: 'object',
    properties: {
      functionArguments: {
        description: 'Function Arguments',
        type: 'array',
      },
    },
  },
  js: resolveFieldValueByFieldMappingJS,
  outputSchema: {
    title: 'Result',
    type: 'string',
  },
};

export const resolveUserDefinedFieldValues: SdkExpressionFunctionEntry = {
  description: 'Appknit custom expression funtion to resolve Avalara User Defined Field Values',
  inputSchema: {
    type: 'object',
    properties: {
      functionArguments: {
        description: 'Function Arguments',
        type: 'array',
      },
    },
  },
  js: resolveUserDefinedFieldValuesJS,
  outputSchema: {
    title: 'Result',
    type: 'array',
  },
};

export const resolveAvalaraParametersMapping: SdkExpressionFunctionEntry = {
  description: 'Appknit custom expression funtion to resolve Avalara Parameters Mapping',
  inputSchema: {
    type: 'object',
    properties: {
      functionArguments: {
        description: 'Function Arguments',
        type: 'array',
      },
    },
  },
  js: resolveAvalaraParametersMappingJS,
  outputSchema: {
    title: 'Result',
    type: 'array',
  },
};

export const itemHSNCodeMapping: SdkExpressionFunctionEntry = {
  description: 'Appknit custom expression function to resolve HSNCODE Mapping',
  inputSchema: {
    type: 'object',
    properties: {
      functionArguments: {
        description: 'Function Arguments',
        type: 'array',
      },
    },
  },
  js: itemHSNCodeMappingJS,
  outputSchema: {
    title: 'Result',
    type: 'string',
  },
};
