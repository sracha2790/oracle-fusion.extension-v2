
import { AppknitSDK, SdkExecutionError, SdkGenericErrorCodes } from '@appknit-project/appknit-platform-sdk-v2';
import { AppknitGraphSDK } from '@appknit-project/common-frameworks';
import { ResponseBuilderService } from 'src/services';
import { ExtendedFunctionsService } from 'src/services/extended-functions.service';
import { TaxProrationService } from 'src/services/tax-proration.service';
import { RequestService } from '../../src/services/request.service';

export const convertFusionRequestIntoHierarchyJS = (sdk: AppknitSDK | AppknitGraphSDK, configuration: any): Promise<any> => {
    const { body } = configuration;
    let request;
    if (body) {
        const requestService = new RequestService();
        request = requestService.convertIntoHierarchy(body);
    }
    return Promise.resolve(request);
};

export const checkAndProcessVBTDetailsJS = (sdk: AppknitSDK | AppknitGraphSDK, configuration: any): Promise<any> => {
    const { request, configCodes, currentLegalEntity } = configuration;
    let mappedData;

    const requestService = new RequestService();
    mappedData = requestService.checkAndProcessVBTDetails(request, configCodes, currentLegalEntity);

    return Promise.resolve(mappedData);
};

export const addCreditMemoLinesJS = async (sdk: AppknitSDK | AppknitGraphSDK, configuration: any): Promise<any> => {
    const { avalaraDocumentLines } = configuration;
    const responseBuilder = new ExtendedFunctionsService();
    const result = responseBuilder.addCreditMemoLines(
        avalaraDocumentLines,
    );
    return result;
};

export const proRateTaxesJS = (sdk: AppknitSDK | AppknitGraphSDK, configuration: any): Promise<any> => {
    const { apSelfAssesTaxFlag, vendorBilledTax, taxedLines, apTolerances } = configuration;

    const taxProrationService = new TaxProrationService();
    let taxOverRideDtls = taxProrationService.prorateTaxes(
        apSelfAssesTaxFlag,
        vendorBilledTax,
        taxedLines,
        apTolerances.tolerancePct,
        apTolerances.toleranceAmt,
    );

    return Promise.resolve(taxOverRideDtls);
};

export const addProratedTaxesAsTaxOverridesJS = async (sdk: AppknitSDK | AppknitGraphSDK, configuration: any): Promise<any> => {
    const { taxOverrides, avalaraDocument, glDate } = configuration;
    const responseBuilder = new ExtendedFunctionsService();
    const result = responseBuilder.addProratedTaxesAsTaxOverrides(
        taxOverrides,
        avalaraDocument,
        glDate,
    );
    return result;
};

export const mapToFusionForNoCalculationResponseJS = async (sdk: AppknitSDK | AppknitGraphSDK, configuration: any): Promise<any> => {
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
    const result = await responseBuilder.createNoCalculationResponse()

    return result;
};

export const mapToFusionForErrorResponseJS = async (sdk: AppknitSDK | AppknitGraphSDK, configuration: any): Promise<any> => {
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
    const result = await responseBuilder.createErrorResponse(message)

    return result;
};

export const mapToFusionResponseJS = async (sdk: AppknitSDK | AppknitGraphSDK, configuration: any): Promise<any> => {
    const { avaTaxModel, fusionRequest, customerProfile, currentLegalEntity, vbtTaxAmtDetails, isUS2US, isCA2CA, isUS2CA, isIndia, isInternational } = configuration;
    const responseBuilder = new ResponseBuilderService(
        sdk,
        avaTaxModel,
        fusionRequest,
        customerProfile,
        currentLegalEntity,
        isUS2US,
        isCA2CA,
        isUS2CA,
        isIndia,
        isInternational,
    );
    const result = await responseBuilder.createResponse(
        vbtTaxAmtDetails,
    )

    return result;
};
