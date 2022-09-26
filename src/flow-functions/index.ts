import { SdkFlowFunctionEntry } from "@appknit-project/common-frameworks";
import { ProRateTaxDetailModel } from "../../src/openapimodels/ProRateTaxDetailModel";
import {
    addCreditMemoLinesJS,
    addProratedTaxesAsTaxOverridesJS,
    checkAndProcessVBTDetailsJS,
    convertFusionRequestIntoHierarchyJS,
    mapToFusionForErrorResponseJS,
    mapToFusionForNoCalculationResponseJS,
    mapToFusionResponseJS,
    prepareBatchRequestJS,
    proRateTaxesJS,
} from "./function-js";

export const convertFusionRequestIntoHierarchy: SdkFlowFunctionEntry = {
    description: 'Converts the Fusion Request Into Hierarchy',
    longDescription: 'Converts the Fusion Request Into Hierarchy',
    inputSchema: {
        type: 'object',
        properties: {
            body: {
                type: 'object',
            },
        },
    },
    js: convertFusionRequestIntoHierarchyJS,
    outputSchema: {
        type: 'object',
    },
};

export const checkAndProcessVBTDetails: SdkFlowFunctionEntry = {
    description: 'Check and Process VBT Details',
    longDescription: 'Check and Process VBT Details',
    inputSchema: {
        type: 'object',
        properties: {
            fusionRequest: {
                type: 'object',
            },
            configCodes: {
                type: 'array',
                items: {
                    type: 'object'
                }
            },
            currentLegalEntity: {
                type: 'object',
            },
        },
    },
    js: checkAndProcessVBTDetailsJS,
    outputSchema: {
        type: 'object',
    },
};

export const addCreditMemoLines: SdkFlowFunctionEntry = {
    description: 'Add Credit Memo Lines',
    longDescription: 'Add Credit Memo Lines',
    inputSchema: {
        type: 'object',
        properties: {
            avalaraCreateTransactionLineItems: {
                type: 'array',
                items: {
                    type: 'object'
                }
            },
        },
    },
    js: addCreditMemoLinesJS,
    outputSchema: {
        type: 'object',
    },
};

export const proRateTaxes: SdkFlowFunctionEntry = {
    description: 'ProRateTaxCalculation',
    longDescription: 'Calculate ProRate taxes for AP module, return pro-rated tax for each line',
    inputSchema: {
        type: 'object',
        properties: {
            apSelfAssesTaxFlag: {
                title: 'Self Assess Tax Flag',
                type: 'string',
            },
            vendorBilledTax: {
                title: 'Self Assess Tax Flag',
                type: 'number',
            },
            avalaraTransactionLines: {
                title: 'Tolerance pct and amt',
                type: 'array',
                items: {
                    type: 'object',
                },
            },
            apTolerances: {
                title: 'Tolerance pct and amt',
                type: 'number',
            },
        },
    },
    js: proRateTaxesJS,
    outputSchema: {
        type: 'object',
        items: ProRateTaxDetailModel,
    },
};

export const addProratedTaxesAsTaxOverrides: SdkFlowFunctionEntry = {
    description: 'Add Pro Rated Taxes on Avalara Document',
    longDescription: 'Add Pro Rated Taxes on Avalara Document',
    inputSchema: {
        type: 'object',
        properties: {
            taxOverrides: {
                type: 'object',
            },
            avalaraCreateTransactionModel: {
                type: 'object',
            },
            glDate: {
                type: 'object',
            },
        },
    },
    js: addProratedTaxesAsTaxOverridesJS,
    outputSchema: {
        type: 'object',
    },
};

export const mapToFusionForNoCalculationResponse: SdkFlowFunctionEntry = {
    description: 'Map To Fusion For No Calculation Response.',
    longDescription: 'Map To Fusion For No Calculation Response.',
    inputSchema: {
        type: 'object',
        properties: {
            message: {
                type: 'string',
            },
            fusionRequest: {
                type: 'object',
            },
        },
    },
    js: mapToFusionForNoCalculationResponseJS,
    outputSchema: {
        type: 'object',
    },
};

export const mapToFusionForErrorResponse: SdkFlowFunctionEntry = {
    description: 'Map To Fusion For Error Response.',
    longDescription: 'Map To Fusion For Error Response.',
    inputSchema: {
        type: 'object',
        properties: {
            message: {
                type: 'string',
            },
            fusionRequest: {
                type: 'object',
            },
        },
    },
    js: mapToFusionForErrorResponseJS,
    outputSchema: {
        type: 'object',
    },
};

export const mapToFusionResponse: SdkFlowFunctionEntry = {
    description: 'Map To Fusion Response',
    longDescription: 'Map To Fusion Response.',
    inputSchema: {
        type: 'object',
        properties: {
            avalaraTransaction: {
                type: 'object',
            },
            fusionRequest: {
                type: 'object',
            },
            customerProfile: {
                type: 'object',
            },
            currentLegalEntity: {
                type: 'object',
            },
            vbtTaxAmtDetails: {
                type: 'object',
            },
            isUS2US: {
                type: 'boolean',
            },
            isUS2CA: {
                type: 'boolean',
            },
            isCA2CA: {
                type: 'boolean',
            },
            isIndia: {
                type: 'boolean',
            },
            isInternational: {
                type: 'boolean',
            },
        },
    },
    js: mapToFusionResponseJS,
    outputSchema: {
        type: 'object',
    },
};

export const prepareBatchRequest: SdkFlowFunctionEntry = {
    description: 'Prepare Batch Request For Processing.',
    longDescription: 'Prepare Batch Request For Processing.',
    inputSchema: {
        type: 'object',
        properties: {
            fusionRequest: {
                type: 'object',
            },
        },
    },
    js: prepareBatchRequestJS,
    outputSchema: {
        type: 'object',
    },
};