import _ = require("lodash");
import { TaxableHeaderWithLines } from "src/models/oracle/TaxableHeaders";
import { TaxableLine, TaxableLinesWithDetailTaxLines } from "src/models/oracle/TaxableLines";

export class FieldMappingService {

    public resolveFieldValueByFieldMapping = (
        fieldName, application, fieldMapping, fusionRequestTaxableHeader: TaxableHeaderWithLines, fusionRequestTaxableLine: TaxableLinesWithDetailTaxLines, additionalData, defaultValue
    ): any => {
        let additionalDataLine = (additionalData as Array<Record<string, any>>).find(item => {
            return (item.TRX_ID == fusionRequestTaxableLine['ns:TrxId'] && item.TRX_LINE_ID == fusionRequestTaxableLine['ns:TrxLineId'])
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
                            if (fusionRequestTaxableHeader[fieldMappingPriorityItem.ATX_FUSION_PROP_COLUMN_NAME]) {
                                returnValue = fusionRequestTaxableHeader[fieldMappingPriorityItem.ATX_FUSION_PROP_COLUMN_NAME]
                                break;
                            }
                        } else {
                            if (fusionRequestTaxableLine[fieldMappingPriorityItem.ATX_FUSION_PROP_COLUMN_NAME]) {
                                returnValue = fusionRequestTaxableLine[fieldMappingPriorityItem.ATX_FUSION_PROP_COLUMN_NAME]
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
    }

    public resolveUserDefinedFieldValues = (application, UDFMapping, fusionRequestTaxableHeader: TaxableHeaderWithLines, fusionRequestTaxableLine: TaxableLinesWithDetailTaxLines, additionalData) => {
        let additionalDataLine = (additionalData as Array<Record<string, any>>).find(item => {
            return (item.TRX_ID == fusionRequestTaxableLine['ns:TrxId'] && item.TRX_LINE_ID == fusionRequestTaxableLine['ns:TrxLineId'])
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
                        if (fusionRequestTaxableHeader[UDFMappingItem.ATX_FUSION_PROP_COLUMN_NAME]) {
                            value = fusionRequestTaxableHeader[UDFMappingItem.ATX_FUSION_PROP_COLUMN_NAME]
                        }
                    } else {
                        if (fusionRequestTaxableLine[UDFMappingItem.ATX_FUSION_PROP_COLUMN_NAME]) {
                            value = fusionRequestTaxableLine[UDFMappingItem.ATX_FUSION_PROP_COLUMN_NAME]
                        }
                    }
                }

                if (UDFMappingItem.ATX_FUSION_FIELD_TYPE == 'FADD') {
                    if (additionalData[UDFMappingItem.ATX_FUSION_PROP_COLUMN_NAME]) {
                        value = additionalDataLine[UDFMappingItem.ATX_FUSION_PROP_COLUMN_NAME]
                        continue;
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
    }

    public resolveAvalaraParametersMapping = (application, paramMapping, fusionRequestTaxableHeader: TaxableHeaderWithLines, additionalData) => {
        const returnValue = [];
        for (const paramMappingItem of paramMapping) {
            if (paramMappingItem.ATX_APPLICATION == application) {

                const key = paramMappingItem.ATX_FIELD;
                let value = paramMappingItem.ATX_DEFAULT_VALUE;
                if (paramMappingItem.ATX_FUSION_FIELD_TYPE == 'FFLD') {
                    if (fusionRequestTaxableHeader[paramMappingItem.ATX_FUSION_PROP_COLUMN_NAME]) {
                        value = fusionRequestTaxableHeader[paramMappingItem.ATX_FUSION_PROP_COLUMN_NAME]
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
    }

}