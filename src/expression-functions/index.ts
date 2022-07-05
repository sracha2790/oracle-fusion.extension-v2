import { nodeSettingsForObject, SdkExpressionFunctionArgument, SdkExpressionFunctionEntry } from "@appknit-project/common-frameworks";

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
      const [codeName, configCodes] = context.functionArguments;
      for (const configCode of configCodes) {
        if ((configCode.CONFIG_CODE as string).trim() == codeName && configCode.CONFIG_CODE_STRING_VALUE) {
            return configCode.CONFIG_CODE_STRING_VALUE
        }
      }
    },
    outputSchema: {
      title: 'Result',
      type: 'object',
    },
  };