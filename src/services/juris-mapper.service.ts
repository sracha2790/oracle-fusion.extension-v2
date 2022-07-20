import { AppknitSDK, AdhocQuery } from '@appknit-project/appknit-platform-sdk-v2';
import { AppknitGraphSDK } from '@appknit-project/common-frameworks';
export class JurisDataMapper {


    constructor(
        private sdk: AppknitSDK | AppknitGraphSDK,
        private customerProfile: Record<string, any>,
        private currentBusinessUnit: Record<string, any>,
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
                TAX_GEO_SOURCE: this.customerProfile.TAX_GEO_SOURCE,
                JURIS_TYPE: 'STATE',
                REGION: avaTaxLineDetail.region,
                COUNTRY_CODE: avaTaxLineDetail.country,
            }));
        }

        if (avaTaxLineDetail.jurisType === 'CTY') {
            queryResults = await this.sdk.adhocDataProvider.queryDataRecords(this.getJurisdictionQuery({
                TAX_GEO_SOURCE: this.customerProfile.TAX_GEO_SOURCE,
                JURIS_TYPE: 'COUNTY',
                REGION: avaTaxLineDetail.region,
                COUNTRY_CODE: avaTaxLineDetail.country,
                COUNTY: avaTaxLineDetail.jurisName
            }));
        }

        if (avaTaxLineDetail.jurisType === 'CIT') {
            queryResults = await this.sdk.adhocDataProvider.queryDataRecords(this.getJurisdictionQuery({
                TAX_GEO_SOURCE: this.customerProfile.TAX_GEO_SOURCE,
                JURIS_TYPE: 'CITY',
                REGION: avaTaxLineDetail.region,
                COUNTRY_CODE: avaTaxLineDetail.country,
                CITY: avaTaxLineDetail.jurisName,
            }));
        }

        if (avaTaxLineDetail.jurisType === 'STJ') {
            queryResults = await this.sdk.adhocDataProvider.queryDataRecords(this.getJurisdictionQuery({
                TAX_GEO_SOURCE: this.customerProfile.TAX_GEO_SOURCE,
                JURIS_TYPE: 'STJ',
                COUNTRY_CODE: avaTaxLineDetail.country,
            }));
        }

        if (!Array.isArray(queryResults) || queryResults[0]) {
            detailTaxLine['ns:Tax'] = queryResults[0].TAX_CODE;
            detailTaxLine['ns:TaxRateCode'] = queryResults[0].RATE_CODE;
            detailTaxLine['ns:TaxStatusCode'] = queryResults[0].TAX_STATUS_CODE;
            detailTaxLine['ns:TaxJurisdictionCode'] = this.currentBusinessUnit.JURIS_CODE_PREFIX + queryResults[0].JURIS_CODE;
            if (queryResults[0].PROVIDER_REC_RATE > 0) {
                detailTaxLine['ns:ProviderRecRate'] = queryResults[0].PROVIDER_REC_RATE;
            };
            if (queryResults[0].PROVIDER_REC_RATE_CODE > 0) {
                detailTaxLine['ns:ProviderRecRateCode'] = queryResults[0].PROVIDER_REC_RATE_CODE;
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
                TAX_GEO_SOURCE: this.customerProfile.TAX_GEO_SOURCE,
                JURIS_TYPE: 'COUNTRY',
                REGION: region,
                COUNTRY_CODE: avaTaxLineDetail.country,
            }));
        }

        if (avaTaxLineDetail.jurisType === 'STA') {

            queryResults = await this.sdk.adhocDataProvider.queryDataRecords(this.getJurisdictionQuery({
                TAX_GEO_SOURCE: this.customerProfile.TAX_GEO_SOURCE,
                JURIS_TYPE: 'COUNTRY',
                REGION: avaTaxLineDetail.region,
                COUNTRY_CODE: avaTaxLineDetail.country,
            }));
        }

        if (!Array.isArray(queryResults) || queryResults[0]) {
            detailTaxLine['ns:Tax'] = queryResults[0].TAX_CODE;
            detailTaxLine['ns:TaxRateCode'] = queryResults[0].RATE_CODE;
            detailTaxLine['ns:TaxStatusCode'] = queryResults[0].TAX_STATUS_CODE;
            detailTaxLine['ns:TaxJurisdictionCode'] = this.currentBusinessUnit.JURIS_CODE_PREFIX + queryResults[0].JURIS_CODE;
            if (queryResults[0].PROVIDER_REC_RATE > 0) {
                detailTaxLine['ns:ProviderRecRate'] = queryResults[0].PROVIDER_REC_RATE;
            };
            if (queryResults[0].PROVIDER_REC_RATE_CODE > 0) {
                detailTaxLine['ns:ProviderRecRateCode'] = queryResults[0].PROVIDER_REC_RATE_CODE;
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


        if (avaTaxLineDetail.jurisType === 'STA') {

            queryResults = await this.sdk.adhocDataProvider.queryDataRecords(this.getJurisdictionQuery({
                TAX_GEO_SOURCE: this.customerProfile.TAX_GEO_SOURCE,
                JURIS_TYPE: 'STATE',
                STATE: 'CANADA',
                COUNTRY_CODE: 'US',
            }));
        }

        if (!Array.isArray(queryResults) || queryResults[0]) {
            detailTaxLine['ns:Tax'] = queryResults[0].TAX_CODE;
            detailTaxLine['ns:TaxRateCode'] = queryResults[0].RATE_CODE;
            detailTaxLine['ns:TaxStatusCode'] = queryResults[0].TAX_STATUS_CODE;
            detailTaxLine['ns:TaxJurisdictionCode'] = this.currentBusinessUnit.JURIS_CODE_PREFIX + queryResults[0].JURIS_CODE;
            if (queryResults[0].PROVIDER_REC_RATE > 0) {
                detailTaxLine['ns:ProviderRecRate'] = queryResults[0].PROVIDER_REC_RATE;
            };
            if (queryResults[0].PROVIDER_REC_RATE_CODE > 0) {
                detailTaxLine['ns:ProviderRecRateCode'] = queryResults[0].PROVIDER_REC_RATE_CODE;
            };
        }
    }

    private getJurisdictionQuery(whereClause: Record<string, any>): AdhocQuery {
        const queryFilters = [];
        for (const key in whereClause) {
            const newClause = {};
            newClause[`@FIELD:JURIS_DATA.${key}`] = {
                '@eq': `${whereClause[key]}`,
            }
            queryFilters.push(newClause);
        }


        const query: AdhocQuery = {
            fieldSets: {
                JURIS_DATA: 'oPDTkqKHHQjUTW52GYS2qy'
            },
            joins: undefined,
            select: {
                TAX_CODE: '@FIELD:JURIS_DATA.TAX_CODE',
                TAX_STATUS_CODE: '@FIELD:JURIS_DATA.TAX_STATUS_CODE',
                JURIS_CODE: '@FIELD:JURIS_DATA.JURIS_CODE',
                RATE_CODE: '@FIELD:JURIS_DATA.RATE_CODE',
                PROVIDER_REC_DATE: '@FIELD:JURIS_DATA.PROVIDER_REC_DATE',
                PROVIDER_REC_RATE_CODE: '@FIELD:JURIS_DATA.PROVIDER_REC_RATE_CODE',
            },
            filter: {
                '@and': queryFilters,
            }
        }
        return query;
    }
}