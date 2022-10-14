import { AppknitGraphSDK, AppknitSDK } from '@appknit-project/appknit-platform-sdk-v2';
import { ResponseBuilderService } from '../../src/services';
import { ExtendedFunctionsService } from '../../src/services/extended-functions.service';
import { TaxProrationService } from '../../src/services/tax-proration.service';
import { RequestService } from '../../src/services/request.service';

export const convertFusionRequestIntoHierarchyJS = (
  sdk: AppknitSDK | AppknitGraphSDK,
  configuration: any,
): Promise<any> => {
  const { body } = configuration;
  let request;
  if (body) {
    const requestService = new RequestService();
    request = requestService.convertIntoHierarchy(body);
  }
  return Promise.resolve(request);
};

export const checkAndProcessVBTDetailsJS = (sdk: AppknitSDK | AppknitGraphSDK, configuration: any): Promise<any> => {
  const { fusionRequest, configCodes, currentLegalEntity } = configuration;
  let mappedData;

  const requestService = new RequestService();
  mappedData = requestService.checkAndProcessVBTDetails(fusionRequest, configCodes, currentLegalEntity);

  return Promise.resolve(mappedData);
};

export const addCreditMemoLinesJS = async (sdk: AppknitSDK | AppknitGraphSDK, configuration: any): Promise<any> => {
  const { avalaraCreateTransactionLineItems } = configuration;
  const responseBuilder = new ExtendedFunctionsService();
  const result = responseBuilder.addCreditMemoLines(avalaraCreateTransactionLineItems);
  return result;
};

export const proRateTaxesJS = (sdk: AppknitSDK | AppknitGraphSDK, configuration: any): Promise<any> => {
  const { apSelfAssesTaxFlag, vendorBilledTax, avalaraTransactionLines, apTolerances } = configuration;

  const taxProrationService = new TaxProrationService();
  let taxOverRideDtls = taxProrationService.prorateTaxes(
    apSelfAssesTaxFlag,
    vendorBilledTax,
    avalaraTransactionLines,
    apTolerances.tolerancePct,
    apTolerances.toleranceAmt,
  );

  return Promise.resolve(taxOverRideDtls);
};

export const addProratedTaxesAsTaxOverridesJS = async (
  sdk: AppknitSDK | AppknitGraphSDK,
  configuration: any,
): Promise<any> => {
  const { taxOverrides, avalaraCreateTransactionModel, glDate } = configuration;
  const responseBuilder = new ExtendedFunctionsService();
  const result = responseBuilder.addProratedTaxesAsTaxOverrides(taxOverrides, avalaraCreateTransactionModel, glDate);
  return result;
};

export const mapToFusionForNoCalculationResponseJS = async (
  sdk: AppknitSDK | AppknitGraphSDK,
  configuration: any,
): Promise<any> => {
  const { message, fusionRequest } = configuration;
  const responseBuilder = new ResponseBuilderService(
    sdk,
    undefined,
    fusionRequest,
    undefined,
    undefined,
    undefined,
    undefined,
    undefined,
    undefined,
    undefined,
  );
  const result = await responseBuilder.createNoCalculationResponse();

  return result;
};

export const mapToFusionForErrorResponseJS = async (
  sdk: AppknitSDK | AppknitGraphSDK,
  configuration: any,
): Promise<any> => {
  const { message, fusionRequest } = configuration;
  const responseBuilder = new ResponseBuilderService(
    sdk,
    undefined,
    fusionRequest,
    undefined,
    undefined,
    undefined,
    undefined,
    undefined,
    undefined,
    undefined,
  );
  const result = await responseBuilder.createErrorResponse(message);

  return result;
};

export const mapToFusionResponseJS = async (sdk: AppknitSDK | AppknitGraphSDK, configuration: any): Promise<any> => {
  const {
    avalaraTransaction,
    fusionRequest,
    customerProfile,
    currentLegalEntity,
    vbtTaxAmtDetails,
    isUS2US,
    isCA2CA,
    isUS2CA,
    isIndia,
    isInternational,
  } = configuration;
  const responseBuilder = new ResponseBuilderService(
    sdk,
    avalaraTransaction,
    fusionRequest,
    customerProfile,
    currentLegalEntity,
    isUS2US,
    isCA2CA,
    isUS2CA,
    isIndia,
    isInternational,
  );
  const result = await responseBuilder.createResponse(vbtTaxAmtDetails);

  return result;
};

export const prepareBatchRequestJS = async (sdk: AppknitSDK | AppknitGraphSDK, configuration: any): Promise<any> => {
  const { fusionRequest } = configuration;

  const requestService = new RequestService();
  const result = requestService.prepareBatchRequest(fusionRequest);

  return Promise.resolve(result);
};
