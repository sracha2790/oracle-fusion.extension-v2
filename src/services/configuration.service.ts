export type configurationCodeRecord = {
    CONFIG_CODE: string,
    CONFIG_CODE_STRING_VALUE: string,
}

export class ConfigurationCodesService {
    constructor(private configCodes?: Array<configurationCodeRecord>) {

    }

    public setConfigCodes(configCodes: Array<configurationCodeRecord>) {
        this.configCodes = configCodes;
    }

    public getCodeValue(codeName: string): any {
        for (const configCode of this.configCodes) {
            if ((configCode.CONFIG_CODE as string).trim() == codeName && configCode.CONFIG_CODE_STRING_VALUE) {
                return configCode.CONFIG_CODE_STRING_VALUE
            }
        }
    }
}