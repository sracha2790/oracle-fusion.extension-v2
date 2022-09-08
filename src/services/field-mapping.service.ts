import _ = require("lodash");

export class FieldMappingService {

    public resolveFieldValueByFieldMapping = (
        fieldName, application, fieldMapping, fusionHeader, fusionLine, additionalData, defaultValue
    ): any => {
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
    }

    public resolveUserDefinedFieldValues = (application, UDFMapping, fusionHeader, fusionLine, additionalData) => {
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
    }

    public resolveAvalaraParametersMapping = (application, paramMapping, fusionHeader, additionalData) => {
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
    }

}