import { SdkExpressionFunctionArgument } from '@appknit-project/appknit-platform-sdk-v2';
import { FieldMappingService } from '../../src/services/field-mapping.service';
import { ConfigurationCodesService } from '../../src/services/configuration.service';

export const getConfigurationCodeValueJS = async (context: SdkExpressionFunctionArgument): Promise<any> => {
  const [codeName, configCodes, defaultValue] = context.functionArguments;
  const configurationCodesService = new ConfigurationCodesService(configCodes);
  return configurationCodesService.getCodeValue(codeName, defaultValue);
};

export const resolveFieldValueByFieldMappingJS = async (context: SdkExpressionFunctionArgument): Promise<any> => {
  const [
    fieldName,
    application,
    fieldMapping,
    fusionRequestTaxableHeader,
    fusionRequestTaxableLines,
    additionalData,
    defaultValue,
  ] = context.functionArguments;
  const fieldMappingService = new FieldMappingService();
  return fieldMappingService.resolveFieldValueByFieldMapping(
    fieldName,
    application,
    fieldMapping,
    fusionRequestTaxableHeader,
    fusionRequestTaxableLines,
    additionalData,
    defaultValue,
  );
};

export const resolveUserDefinedFieldValuesJS = async (context: SdkExpressionFunctionArgument): Promise<any> => {
  const [
    application,
    UDFMapping,
    fusionRequestTaxableHeader,
    fusionRequestTaxableLines,
    additionalData,
  ] = context.functionArguments;
  const fieldMappingService = new FieldMappingService();
  return fieldMappingService.resolveUserDefinedFieldValues(
    application,
    UDFMapping,
    fusionRequestTaxableHeader,
    fusionRequestTaxableLines,
    additionalData,
  );
};

export const resolveAvalaraParametersMappingJS = async (context: SdkExpressionFunctionArgument): Promise<any> => {
  const [application, paramMapping, fusionRequestTaxableHeader, fusionRequestTaxableLines,additionalData] = context.functionArguments;
  const fieldMappingService = new FieldMappingService();
  return fieldMappingService.resolveAvalaraParametersMapping(
    application,
    paramMapping,
    fusionRequestTaxableHeader,
    fusionRequestTaxableLines,
    additionalData,
  );
};
