import { SdkExpressionFunctionArgument } from "@appknit-project/common-frameworks";
import { FieldMappingService } from "../../src/services/field-mapping.service";
import { ConfigurationCodesService } from "../../src/services/configuration.service";

export const getConfigurationCodeValueJS = async (context: SdkExpressionFunctionArgument): Promise<any> => {
    const [codeName, configCodes, defaultValue] = context.functionArguments;
    const configurationCodesService = new ConfigurationCodesService(configCodes);
    return configurationCodesService.getCodeValue(codeName, defaultValue);
}

export const resolveFieldValueByFieldMappingJS = async (context: SdkExpressionFunctionArgument): Promise<any> => {
    const [fieldName, application, fieldMapping, fusionHeader, fusionLine, additionalData, defaultValue] = context.functionArguments;
    const fieldMappingService = new FieldMappingService()
    return fieldMappingService.resolveFieldValueByFieldMapping(fieldName,
        application,
        fieldMapping,
        fusionHeader,
        fusionLine,
        additionalData,
        defaultValue,
    );
};

export const resolveUserDefinedFieldValuesJS = async (context: SdkExpressionFunctionArgument): Promise<any> => {
    const [application, UDFMapping, fusionHeader, fusionLine, additionalData] = context.functionArguments;
    const fieldMappingService = new FieldMappingService()
    return fieldMappingService.resolveUserDefinedFieldValues(
      application,
      UDFMapping,
      fusionHeader,
      fusionLine,
      additionalData,
    );
  };

  export const resolveAvalaraParametersMappingJS = async (context: SdkExpressionFunctionArgument): Promise<any> => {
    const [application, paramMapping, fusionHeader, additionalData] = context.functionArguments;
    const fieldMappingService = new FieldMappingService();
    fieldMappingService.resolveAvalaraParametersMapping(
      application,
      paramMapping,
      fusionHeader,
      additionalData,
    )
  };