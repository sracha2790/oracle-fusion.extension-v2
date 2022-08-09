import { AppknitSDK, AdhocQuery } from '@appknit-project/appknit-platform-sdk-v2';
import { AppknitGraphSDK } from '@appknit-project/common-frameworks';
export class JurisDataMapper {


    constructor(
        private sdk: AppknitSDK | AppknitGraphSDK,
        private customerProfile: Record<string, any>,
        private currentBusinessUnit: Record<string, any>,
        private currentLegalEntity: Record<string, any>,
        private isUS2US: boolean,
        private isCA2CA: boolean,
        private isUS2CA: boolean,
        private isIndia: boolean,
        private isIntl: boolean,
    ){
        
    }
    async mapJurisdictionForUS2US(
        detailTaxLine: Record<string, any>,
        matchingFusionLine: Record<string, any>,
        avaTaxLine: Record<string, any>,
        avaTaxLineDetail: Record<string, any>,
    ) {
        let queryResults: Record<string, any>;

        if (avaTaxLineDetail.jurisType === 'STA') {
            queryResults = await this.sdk.adhocDataProvider.queryDataRecords(this.getJurisdictionQuery({
                ATX_GEO_SOURCE: this.customerProfile.ATX_CUSTOMER.ATX_GEO_SOURCE,
                ATX_JURISDICTION_TYPE: 'STATE',
                ATX_REGION: avaTaxLineDetail.region,
                ATX_COUNTRY: avaTaxLineDetail.country,
            }));
        }

        if (avaTaxLineDetail.jurisType === 'CTY') {
            queryResults = await this.sdk.adhocDataProvider.queryDataRecords(this.getJurisdictionQuery({
                ATX_GEO_SOURCE: this.customerProfile.ATX_CUSTOMER.ATX_GEO_SOURCE,
                ATX_JURISDICTION_TYPE: 'COUNTY',
                ATX_REGION: avaTaxLineDetail.region,
                ATX_COUNTRY: avaTaxLineDetail.country,
                ATX_COUNTY: avaTaxLineDetail.jurisName
            }));
        }

        if (avaTaxLineDetail.jurisType === 'CIT') {
            queryResults = await this.sdk.adhocDataProvider.queryDataRecords(this.getJurisdictionQuery({
                ATX_GEO_SOURCE: this.customerProfile.ATX_CUSTOMER.ATX_GEO_SOURCE,
                ATX_JURISDICTION_TYPE: 'CITY',
                ATX_REGION: avaTaxLineDetail.region,
                ATX_COUNTRY: avaTaxLineDetail.country,
                ATX_CITY: avaTaxLineDetail.jurisName,
            }));
        }

        if (avaTaxLineDetail.jurisType === 'STJ') {
            queryResults = await this.sdk.adhocDataProvider.queryDataRecords(this.getJurisdictionQuery({
                ATX_GEO_SOURCE: this.customerProfile.ATX_CUSTOMER.ATX_GEO_SOURCE,
                ATX_JURISDICTION_TYPE: 'SPECIAL',
                ATX_COUNTRY: avaTaxLineDetail.country,
            }));
        }

        if (!Array.isArray(queryResults) || queryResults[0]) {
            detailTaxLine['ns:Tax'] = queryResults[0].ATX_TAX_CODE;
            detailTaxLine['ns:TaxRateCode'] = queryResults[0].ATX_RATE_CODE;
            detailTaxLine['ns:TaxStatusCode'] = queryResults[0].ATX_TAX_STATUS_CODE;
            detailTaxLine['ns:TaxJurisdictionCode'] = this.currentLegalEntity.ATX_JURISDICTION_CODE_PREFIX + queryResults[0].ATX_JURISDICTION_CODE;
            if (queryResults[0].ATX_PROVIDER_REC_RATE > 0) {
                detailTaxLine['ns:ProviderRecRate'] = queryResults[0].ATX_PROVIDER_REC_RATE;
            };
            if (queryResults[0].ATX_PROVIDER_REC_RATE_CODE > 0) {
                detailTaxLine['ns:ProviderRecRateCode'] = queryResults[0].ATX_PROVIDER_REC_RATE_CODE;
            };
        }
    }

    async mapJurisdictionForCA2CA(
        detailTaxLine: Record<string, any>,
        matchingFusionLine: Record<string, any>,
        avaTaxLine: Record<string, any>,
        avaTaxLineDetail: Record<string, any>,
    ) {
        let queryResults: Record<string, any>;

        if (avaTaxLineDetail.jurisType === 'CNT') {
            let region = avaTaxLineDetail.country;
            (avaTaxLine.details as Array<Record<string, any>>).forEach(detail=> {
                if (detail.id != avaTaxLineDetail.id && detail.jurisType == 'STA') {
                    region = detail.region;
                }
            });
            queryResults = await this.sdk.adhocDataProvider.queryDataRecords(this.getJurisdictionQuery({
                ATX_GEO_SOURCE: this.customerProfile.ATX_CUSTOMER.ATX_GEO_SOURCE,
                ATX_JURISDICTION_TYPE: 'COUNTRY',
                ATX_REGION: region,
                ATX_COUNTRY: avaTaxLineDetail.country,
            }));
        }

        if (avaTaxLineDetail.jurisType === 'STA') {

            queryResults = await this.sdk.adhocDataProvider.queryDataRecords(this.getJurisdictionQuery({
                ATX_GEO_SOURCE: this.customerProfile.ATX_CUSTOMER.ATX_GEO_SOURCE,
                ATX_JURISDICTION_TYPE: 'COUNTRY',
                ATX_REGION: avaTaxLineDetail.region,
                ATX_COUNTRY: avaTaxLineDetail.country,
            }));
        }

        if (!Array.isArray(queryResults) || queryResults[0]) {
            detailTaxLine['ns:Tax'] = queryResults[0].ATX_TAX_CODE;
            detailTaxLine['ns:TaxRateCode'] = queryResults[0].ATX_RATE_CODE;
            detailTaxLine['ns:TaxStatusCode'] = queryResults[0].ATX_TAX_STATUS_CODE;
            detailTaxLine['ns:TaxJurisdictionCode'] = this.currentLegalEntity.ATX_JURISDICTION_CODE_PREFIX + queryResults[0].ATX_JURISDICTION_CODE;
            if (queryResults[0].ATX_PROVIDER_REC_RATE > 0) {
                detailTaxLine['ns:ProviderRecRate'] = queryResults[0].ATX_PROVIDER_REC_RATE;
            };
            if (queryResults[0].ATX_PROVIDER_REC_RATE_CODE > 0) {
                detailTaxLine['ns:ProviderRecRateCode'] = queryResults[0].ATX_PROVIDER_REC_RATE_CODE;
            };
        }
    }

    async mapJurisdictionForUS2CA(
        detailTaxLine: Record<string, any>,
        matchingFusionLine: Record<string, any>,
        avaTaxLine: Record<string, any>,
        avaTaxLineDetail: Record<string, any>,
    ) {
        let queryResults: Record<string, any>;


        if (avaTaxLineDetail.jurisType == 'CNT') {

            queryResults = await this.sdk.adhocDataProvider.queryDataRecords(this.getJurisdictionQuery({
                ATX_GEO_SOURCE: this.customerProfile.ATX_CUSTOMER.ATX_GEO_SOURCE,
                ATX_JURISDICTION_TYPE: 'STATE',
                ATX_STATE: 'CANADA',
                ATX_COUNTRY: 'US',
            }));
        }

        if (!Array.isArray(queryResults) || queryResults[0]) {
            detailTaxLine['ns:Tax'] = queryResults[0].ATX_TAX_CODE;
            detailTaxLine['ns:TaxRateCode'] = queryResults[0].ATX_RATE_CODE;
            detailTaxLine['ns:TaxStatusCode'] = queryResults[0].ATX_TAX_STATUS_CODE;
            detailTaxLine['ns:TaxJurisdictionCode'] = this.currentLegalEntity.ATX_JURISDICTION_CODE_PREFIX + queryResults[0].ATX_JURISDICTION_CODE;
            if (queryResults[0].ATX_PROVIDER_REC_RATE > 0) {
                detailTaxLine['ns:ProviderRecRate'] = queryResults[0].ATX_PROVIDER_REC_RATE;
            };
            if (queryResults[0].ATX_PROVIDER_REC_RATE_CODE > 0) {
                detailTaxLine['ns:ProviderRecRateCode'] = queryResults[0].ATX_PROVIDER_REC_RATE_CODE;
            };
        }
    }

    private getJurisdictionQuery(whereClause: Record<string, any>): AdhocQuery {
        const queryFilters = [];
        for (const key in whereClause) {
            const newClause = {};
            newClause[`@FIELD:ATX_JURIS_DATA.${key}`] = {
                '@eq': `${whereClause[key]}`,
            }
            queryFilters.push(newClause);
        }


        const query: AdhocQuery = {
            fieldSets: {
                ATX_JURIS_DATA: 'oPDTkqKHHQjUTW52GYS2qy'
            },
            joins: undefined,
            select: {
                ATX_TAX_CODE: '@FIELD:ATX_JURIS_DATA.ATX_TAX_CODE',
                ATX_TAX_STATUS_CODE: '@FIELD:ATX_JURIS_DATA.ATX_TAX_STATUS_CODE',
                ATX_JURISDICTION_CODE: '@FIELD:ATX_JURIS_DATA.ATX_JURISDICTION_CODE',
                ATX_RATE_CODE: '@FIELD:ATX_JURIS_DATA.ATX_RATE_CODE',
                ATX_PROVIDER_REC_DATE: '@FIELD:ATX_JURIS_DATA.ATX_PROVIDER_REC_DATE',
                ATX_PROVIDER_REC_RATE_CODE: '@FIELD:ATX_JURIS_DATA.ATX_PROVIDER_REC_RATE_CODE',
            },
            filter: {
                '@and': queryFilters,
            }
        }
        return query;
    }
}