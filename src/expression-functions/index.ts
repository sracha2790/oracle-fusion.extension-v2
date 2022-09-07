import { nodeSettingsForObject, SdkExpressionFunctionArgument, SdkExpressionFunctionEntry } from "@appknit-project/common-frameworks";
import _ = require("lodash");
import { ConfigurationCodesService } from "../../src/services/configuration.service";

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
  js: async (context: SdkExpressionFunctionArgument): Promise<any> => {
    const [codeName, configCodes, defaultValue] = context.functionArguments;

    const configurationCodesService = new ConfigurationCodesService(configCodes);
    return configurationCodesService.getCodeValue(codeName, defaultValue);
  },
  outputSchema: {
    title: 'Result',
    type: 'object',
  },
};

export const resolveFieldValueByFieldMapping: SdkExpressionFunctionEntry = {
  description: 'Appknit custom expression funtion to resolve field mapping',
  inputSchema: {
    type: 'object',
    properties: {
      functionArguments: {
        description: 'Function Arguments',
        type: 'array',
      },
    },
  },
  js: async (context: SdkExpressionFunctionArgument): Promise<any> => {
    const [fieldName, application, fieldMapping, fusionHeader, fusionLine, additionalData, defaultValue] = context.functionArguments;
    let additionalDataLine = (additionalData as Array<Record<string, any>>).find(item => {
      return (item.TRX_ID == fusionLine['ns:TrxId'] && item.TRX_LINE_ID == fusionLine['ns:TrxLineId'])
    })
    if (!additionalDataLine) {
      additionalDataLine = {};
    }
    let returnValue = defaultValue;
    for (const fieldMappingItem of fieldMapping) {
      if (fieldMappingItem.ATX_APPLICATION == application && fieldMappingItem.ATX_FIELD == fieldName) {
        const sortedByPriority = _.sortBy(fieldMappingItem.ATX_FIELD_MAPPING_PRIORITY, 'ATX_PRIORITY');
        for (const fieldMappingPriorityItem of sortedByPriority) {

          if (fieldMappingPriorityItem.ATX_FUSION_FIELD_TYPE == 'FFLD') {
            if (fieldMappingPriorityItem.ATX_FUSION_FIELD_LEVEL == 'HDR') {
              if (fusionHeader[fieldMappingPriorityItem.ATX_FUSION_PROP_COLUMN_NAME]) {
                returnValue = fusionHeader[fieldMappingPriorityItem.ATX_FUSION_PROP_COLUMN_NAME]
                break;
              }
            } else {
              if (fusionLine[fieldMappingPriorityItem.ATX_FUSION_PROP_COLUMN_NAME]) {
                returnValue = fusionLine[fieldMappingPriorityItem.ATX_FUSION_PROP_COLUMN_NAME]
                break;
              }
            }
          }

          if (fieldMappingPriorityItem.ATX_FUSION_FIELD_TYPE == 'FADD') {
            if (additionalData[fieldMappingPriorityItem.ATX_FUSION_PROP_COLUMN_NAME]) {
              returnValue = additionalDataLine[fieldMappingPriorityItem.ATX_FUSION_PROP_COLUMN_NAME]
              break;
            }
          }
        }
      }
    }
    return returnValue;
  },
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
  js: async (context: SdkExpressionFunctionArgument): Promise<any> => {
    const [application, UDFMapping, fusionHeader, fusionLine, additionalData] = context.functionArguments;
    let additionalDataLine = (additionalData as Array<Record<string, any>>).find(item => {
      return (item.TRX_ID == fusionLine['ns:TrxId'] && item.TRX_LINE_ID == fusionLine['ns:TrxLineId'])
    })
    if (!additionalDataLine) {
      additionalDataLine = {};
    }
    const returnValue = [];
    for (const UDFMappingItem of UDFMapping) {
      if (UDFMappingItem.ATX_APPLICATION == application) {

        const key = UDFMappingItem.ATX_FIELD;
        let value = UDFMappingItem.ATX_DEFAULT_VALUE;
        if (UDFMappingItem.ATX_FUSION_FIELD_TYPE == 'FFLD') {
          if (UDFMappingItem.ATX_FUSION_FIELD_LEVEL == 'HDR') {
            if (fusionHeader[UDFMappingItem.ATX_FUSION_PROP_COLUMN_NAME]) {
              value = fusionHeader[UDFMappingItem.ATX_FUSION_PROP_COLUMN_NAME]
              break;
            }
          } else {
            if (fusionLine[UDFMappingItem.ATX_FUSION_PROP_COLUMN_NAME]) {
              value = fusionLine[UDFMappingItem.ATX_FUSION_PROP_COLUMN_NAME]
              break;
            }
          }
        }

        if (UDFMappingItem.ATX_FUSION_FIELD_TYPE == 'FADD') {
          if (additionalData[UDFMappingItem.ATX_FUSION_PROP_COLUMN_NAME]) {
            value = additionalDataLine[UDFMappingItem.ATX_FUSION_PROP_COLUMN_NAME]
            break;
          }
        }

        if (value) {
          returnValue.push({
            name: key,
            value,
          })
        }

      }
    }
    if (returnValue.length > 0) {
      return returnValue;
    } else {
      return undefined
    }
  },
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
  js: async (context: SdkExpressionFunctionArgument): Promise<any> => {
    const [application, paramMapping, fusionHeader, additionalData] = context.functionArguments;

    const returnValue = [];
    for (const paramMappingItem of paramMapping) {
      if (paramMappingItem.ATX_APPLICATION == application) {

        const key = paramMappingItem.ATX_FIELD;
        let value = paramMappingItem.ATX_DEFAULT_VALUE;
        if (paramMappingItem.ATX_FUSION_FIELD_TYPE == 'FFLD') {
          if (fusionHeader[paramMappingItem.ATX_FUSION_PROP_COLUMN_NAME]) {
            value = fusionHeader[paramMappingItem.ATX_FUSION_PROP_COLUMN_NAME]
            break;
          }
        }

        if (value) {
          returnValue.push({
            name: key,
            value,
          })
        }

      }
    }
    if (returnValue.length > 0) {
      return returnValue;
    } else {
      return undefined
    }
  },
  outputSchema: {
    title: 'Result',
    type: 'array',
  },
};