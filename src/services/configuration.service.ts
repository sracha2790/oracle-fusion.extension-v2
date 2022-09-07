export type configurationCodeRecord = {
    ATX_CONFIG_CODE: string,
    ATX_CONFIG_CODE_STRING_VALUE: string,
}

export class ConfigurationCodesService {
    constructor(private configCodes?: Array<configurationCodeRecord>) {

    }

    public setConfigCodes(configCodes: Array<configurationCodeRecord>) {
        this.configCodes = configCodes;
    }

    public getCodeValue(codeName: string, defaultValue?: any): any {
        for (const configCode of this.configCodes) {
            if ((configCode.ATX_CONFIG_CODE as string).trim() == codeName && configCode.ATX_CONFIG_CODE_STRING_VALUE) {
                return configCode.ATX_CONFIG_CODE_STRING_VALUE
            }
        }
        return defaultValue;
    }
}