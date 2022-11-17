

export type configurationCodeRecordAFC = {
    AFC_CONFIG_CODE: string,
    AFC_CONFIG_CODE_STRING_VALUE: string,
}

export class ConfigurationCodesServiceAFC {
    constructor(private configCodes?: Array<configurationCodeRecordAFC>) {

    }

    public setConfigCodesAFC(configCodes:Array<configurationCodeRecordAFC>) {
        this.configCodes = configCodes;
    }

    public getCodeValueAFC(codeName: string, defaultValue?: any): any {
        for (const configCode of this.configCodes) {
            if ((configCode.AFC_CONFIG_CODE as string).trim() == codeName && configCode.AFC_CONFIG_CODE_STRING_VALUE) {
                return configCode.AFC_CONFIG_CODE_STRING_VALUE;
            }
        }
        return defaultValue; 
    }
}