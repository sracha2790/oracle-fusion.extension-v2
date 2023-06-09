import _ = require("lodash");
import { TaxableHeaderWithLines } from "../../src/models/oracle/TaxableHeaders";
import { TaxableLine, TaxableLinesWithDetailTaxLines } from "../../src/models/oracle/TaxableLines";
import { ConfigurationCodesService } from '../services/configuration.service';

export class FieldMappingService {

    public resolveFieldValueByFieldMapping = (
        fieldName, application, fieldMapping, fusionRequestTaxableHeader: TaxableHeaderWithLines, fusionRequestTaxableLine: TaxableLinesWithDetailTaxLines, additionalData, configCodes,defaultValue
    ): any => {
        let additionalDataLine = (additionalData as Array<Record<string, any>>)?.find(item => {
            return (item.TRX_ID == fusionRequestTaxableLine['ns:TrxId'] && item.TRX_LINE_ID == fusionRequestTaxableLine['ns:TrxLineId']);
        });
        if (!additionalDataLine) {
            additionalDataLine = {};
        }
        let returnValue = defaultValue;
        for (const fieldMappingItem of fieldMapping) {
            if (fieldMappingItem.ATX_APPLICATION == application && fieldMappingItem.ATX_FIELD == fieldName) {
                const sortedByPriority = _.sortBy(fieldMappingItem.ATX_FIELD_MAPPING_PRIORITY, [function (o) { return _.toNumber(o.ATX_PRIORITY); }]);
                for (const fieldMappingPriorityItem of sortedByPriority) {

                    if (fieldMappingPriorityItem.ATX_FUSION_FIELD_TYPE == 'FFLD') {
                        if (fieldMappingPriorityItem.ATX_FUSION_FIELD_LEVEL == 'HDR') {
                            if (fusionRequestTaxableHeader[fieldMappingPriorityItem.ATX_FUSION_PROP_COLUMN_NAME]) {
                                returnValue = fusionRequestTaxableHeader[fieldMappingPriorityItem.ATX_FUSION_PROP_COLUMN_NAME];
                                break;
                            }
                        } else {
                            if (fusionRequestTaxableLine[fieldMappingPriorityItem.ATX_FUSION_PROP_COLUMN_NAME]) {
                                returnValue = fusionRequestTaxableLine[fieldMappingPriorityItem.ATX_FUSION_PROP_COLUMN_NAME];
                                if (fieldMappingPriorityItem.ATX_FUSION_PROP_COLUMN_NAME.toLowerCase().includes('accountstring')) {
                                    returnValue = this.accountStringByPos(returnValue,configCodes);
                                }
                                break;
                            }
                        }
                    }

                    if (fieldMappingPriorityItem.ATX_FUSION_FIELD_TYPE == 'FADD') {
                        if (additionalDataLine[fieldMappingPriorityItem.ATX_FUSION_PROP_COLUMN_NAME]) {
                            returnValue = additionalDataLine[fieldMappingPriorityItem.ATX_FUSION_PROP_COLUMN_NAME];
                            break;
                        }
                    }
                }
            }
        }
        return returnValue;
    };

    public resolveUserDefinedFieldValues = (application, UDFMapping, fusionRequestTaxableHeader: TaxableHeaderWithLines, fusionRequestTaxableLine: TaxableLinesWithDetailTaxLines, additionalData,configCodes) => {
        let additionalDataLine = (additionalData as Array<Record<string, any>>)?.find(item => {
            return (item.TRX_ID == fusionRequestTaxableLine['ns:TrxId'] && item.TRX_LINE_ID == fusionRequestTaxableLine['ns:TrxLineId']);
        });
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
                            value = fusionRequestTaxableHeader[UDFMappingItem.ATX_FUSION_PROP_COLUMN_NAME];
                        }
                    } else {
                        if (fusionRequestTaxableLine[UDFMappingItem.ATX_FUSION_PROP_COLUMN_NAME]) {
                            value = fusionRequestTaxableLine[UDFMappingItem.ATX_FUSION_PROP_COLUMN_NAME];
                            if (UDFMappingItem.ATX_FUSION_PROP_COLUMN_NAME.toLowerCase().includes('accountstring')) {
                                value = this.accountStringByPos(value,configCodes);
                            }
                        }
                    }
                }

                if (UDFMappingItem.ATX_FUSION_FIELD_TYPE == 'FADD') {
                    if (additionalDataLine[UDFMappingItem.ATX_FUSION_PROP_COLUMN_NAME]) {
                        value = additionalDataLine[UDFMappingItem.ATX_FUSION_PROP_COLUMN_NAME];
                        continue;
                    }
                }

                if (value) {
                    returnValue.push({
                        name: key,
                        value,
                    });
                }

            }
        }
        if (returnValue.length > 0) {
            return returnValue;
        } else {
            return undefined;
        }
    };

    public resolveAvalaraParametersMapping = (application, paramMapping, fusionRequestTaxableHeader: TaxableHeaderWithLines, fusionRequestTaxableLine: TaxableLinesWithDetailTaxLines, additionalData,configCodes) => {
        const returnValue = [];
        for (const paramMappingItem of paramMapping) {
            if (paramMappingItem.ATX_APPLICATION == application) {

                const key = paramMappingItem.ATX_FIELD;
                let value = paramMappingItem.ATX_DEFAULT_VALUE;
                if (paramMappingItem.ATX_FUSION_FIELD_TYPE == 'FFLD') {
                    if (paramMappingItem.ATX_FUSION_FIELD_LEVEL == 'HDR') {
                        if (fusionRequestTaxableHeader[paramMappingItem.ATX_FUSION_PROP_COLUMN_NAME]) {
                            value = fusionRequestTaxableHeader[paramMappingItem.ATX_FUSION_PROP_COLUMN_NAME];
                        }
                    }
                    else {
                        if (fusionRequestTaxableLine[paramMappingItem.ATX_FUSION_PROP_COLUMN_NAME]) {
                            value = fusionRequestTaxableLine[paramMappingItem.ATX_FUSION_PROP_COLUMN_NAME];
                            if (paramMappingItem.ATX_FUSION_PROP_COLUMN_NAME.toLowerCase().includes('accountstring')) {
                                value = this.accountStringByPos(value,configCodes);
                            }
                        }
                    }
                }

                if (value) {
                    returnValue.push({
                        name: key,
                        value,
                    });
                }

            }
        }
        if (returnValue.length > 0) {
            return returnValue;
        } else {
            return undefined;
        }
    };

    public accountStringByPos = (
        accountString: string,configCodes
    ): string => {
        let returnValue = accountString;
        let configurationCodesService = new ConfigurationCodesService(configCodes);
        if (configurationCodesService.getCodeValue('USE_GL_ACCOUNT_STRING') == 'Y') {
            const accountStringDelim = configurationCodesService.getCodeValue('GL_ACCSTR_SEG_DELIM');
            const accountStringPos = Number(configurationCodesService.getCodeValueNbr('GL_ACCSTR_ACC_POSN'));
            const accountStringsplit = accountString.split(accountStringDelim);
            returnValue = accountStringsplit[accountStringPos - 1];
        }
        return returnValue;
    };

}
