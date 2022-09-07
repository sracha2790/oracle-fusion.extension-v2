import { AppknitSDK, AdhocQueryUnion, AdhocQuery } from '@appknit-project/appknit-platform-sdk-v2';
import { AppknitGraphSDK } from '@appknit-project/common-frameworks';
import _ = require('lodash');
export class JurisDataMapper {
    private jurisData: Array<Record<string, any>>;

    constructor(
        private sdk: AppknitSDK | AppknitGraphSDK,
        private customerProfile: Record<string, any>,
        private currentLegalEntity: Record<string, any>,
        private isUS2US: boolean,
        private isCA2CA: boolean,
        private isUS2CA: boolean,
        private isIndia: boolean,
        private isIntl: boolean,
    ) {
        this.jurisData = []
    }
    async addJurisDataForUS2US(
        detailTaxLine: Record<string, any>,
        matchingFusionLine: Record<string, any>,
        avaTaxLine: Record<string, any>,
        avaTaxLineDetail: Record<string, any>,
    ) {
        let queryResults: Record<string, any>;
        let whereClause: Record<string, any>;
        if (avaTaxLineDetail.jurisType === 'STA') {
            whereClause = {
                ATX_GEO_SOURCE: this.customerProfile.ATX_GEO_SOURCE,
                ATX_JURISDICTION_TYPE: 'STATE',
                ATX_REGION: avaTaxLineDetail.region,
                ATX_COUNTRY: avaTaxLineDetail.country,
            };
        }

        if (avaTaxLineDetail.jurisType === 'CTY') {
            whereClause = {
                ATX_GEO_SOURCE: this.customerProfile.ATX_GEO_SOURCE,
                ATX_JURISDICTION_TYPE: 'COUNTY',
                ATX_REGION: avaTaxLineDetail.region,
                ATX_COUNTRY: avaTaxLineDetail.country,
                ATX_COUNTY: avaTaxLineDetail.jurisName
            };
        }

        if (avaTaxLineDetail.jurisType === 'CIT') {
            whereClause = {
                ATX_GEO_SOURCE: this.customerProfile.ATX_GEO_SOURCE,
                ATX_JURISDICTION_TYPE: 'CITY',
                ATX_REGION: avaTaxLineDetail.region,
                ATX_COUNTRY: avaTaxLineDetail.country,
                ATX_CITY: avaTaxLineDetail.jurisName,
            };
        }

        if (avaTaxLineDetail.jurisType === 'STJ') {
            whereClause = {
                ATX_GEO_SOURCE: this.customerProfile.ATX_GEO_SOURCE,
                ATX_JURISDICTION_TYPE: 'SPECIAL',
                ATX_COUNTRY: avaTaxLineDetail.country,
            };
        }

        await this.findAndAddJurisDataOnDetailsTaxLine(whereClause, detailTaxLine);
    }

    async addJurisDataForCA2CA(
        detailTaxLine: Record<string, any>,
        matchingFusionLine: Record<string, any>,
        avaTaxLine: Record<string, any>,
        avaTaxLineDetail: Record<string, any>,
    ) {
        let whereClause: Record<string, any>;
        if (avaTaxLineDetail.jurisType === 'CNT') {
            let region = avaTaxLineDetail.country;
            (avaTaxLine.details as Array<Record<string, any>>).forEach(detail => {
                if (detail.id != avaTaxLineDetail.id && detail.jurisType == 'STA') {
                    region = detail.region;
                }
            });
            whereClause = {
                ATX_GEO_SOURCE: this.customerProfile.ATX_GEO_SOURCE,
                ATX_JURISDICTION_TYPE: 'COUNTRY',
                ATX_REGION: region,
                ATX_COUNTRY: avaTaxLineDetail.country,
            }
        }

        if (avaTaxLineDetail.jurisType === 'STA') {
            whereClause = {
                ATX_GEO_SOURCE: this.customerProfile.ATX_GEO_SOURCE,
                ATX_JURISDICTION_TYPE: 'COUNTRY',
                ATX_REGION: avaTaxLineDetail.region,
                ATX_COUNTRY: avaTaxLineDetail.country,
            };
        }

        await this.findAndAddJurisDataOnDetailsTaxLine(whereClause, detailTaxLine);
    }

    async addJurisDataForUS2CA(
        detailTaxLine: Record<string, any>,
        matchingFusionLine: Record<string, any>,
        avaTaxLine: Record<string, any>,
        avaTaxLineDetail: Record<string, any>,
    ) {
        let whereClause: Record<string, any>;
        if (avaTaxLineDetail.jurisType == 'CNT') {
            const whereClause = {
                ATX_GEO_SOURCE: this.customerProfile.ATX_GEO_SOURCE,
                ATX_JURISDICTION_TYPE: 'STATE',
                ATX_STATE: 'CANADA',
                ATX_COUNTRY: 'US',
            };
        }

        await this.findAndAddJurisDataOnDetailsTaxLine(whereClause, detailTaxLine);
    }

    private async findAndAddJurisDataOnDetailsTaxLine(whereClause: Record<string, any>, detailTaxLine: Record<string, any>) {
        let jurisDataResult = _.find(this.jurisData, whereClause);
        if (!jurisDataResult) {
            const jurisDataResultFromDB = await this.sdk.adhocDataProvider.queryDataRecords(this.getJurisdictionQuery(whereClause));
            if (jurisDataResultFromDB && Array.isArray(jurisDataResultFromDB) && jurisDataResultFromDB[0]) {
                jurisDataResult = jurisDataResultFromDB[0];
                this.jurisData.push(jurisDataResult)
            }
        }
        if (jurisDataResult) {
            if (jurisDataResult) {
                detailTaxLine['ns:Tax'] = jurisDataResult.ATX_TAX_CODE;
                if (jurisDataResult.ATX_TAX_CODE == 'SPECIAL' || jurisDataResult.ATX_JURISDICTION_TYPE == 'SPECIAL') {
                    detailTaxLine['ns:TaxRateCode'] = this.currentLegalEntity.ATX_JURISDICTION_CODE_PREFIX + jurisDataResult.ATX_RATE_CODE;
                } else {
                    detailTaxLine['ns:TaxRateCode'] = jurisDataResult.ATX_RATE_CODE;
                }
                detailTaxLine['ns:TaxStatusCode'] = jurisDataResult.ATX_TAX_STATUS_CODE;
                detailTaxLine['ns:TaxJurisdictionCode'] = this.currentLegalEntity.ATX_JURISDICTION_CODE_PREFIX + jurisDataResult.ATX_JURISDICTION_CODE;
                if (jurisDataResult.ATX_PROVIDER_REC_RATE > 0) {
                    detailTaxLine['ns:ProviderRecRate'] = jurisDataResult.ATX_PROVIDER_REC_RATE;
                };
                if (jurisDataResult.ATX_PROVIDER_REC_RATE_CODE > 0) {
                    detailTaxLine['ns:ProviderRecRateCode'] = jurisDataResult.ATX_PROVIDER_REC_RATE_CODE;
                };
            }
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
                ATX_JURIS_DATA: '3oZt8K4pbDtFtBJSovmEpL'
            },
            joins: undefined,
            select: {
                ATX_GEO_SOURCE: '@FIELD:ATX_JURIS_DATA.ATX_GEO_SOURCE',
                ATX_JURISDICTION_TYPE: '@FIELD:ATX_JURIS_DATA.ATX_JURISDICTION_TYPE',
                ATX_REGION: '@FIELD:ATX_JURIS_DATA.ATX_REGION',
                ATX_COUNTRY: '@FIELD:ATX_JURIS_DATA.ATX_COUNTRY',
                ATX_COUNTY: '@FIELD:ATX_JURIS_DATA.ATX_COUNTY',
                ATX_CITY: '@FIELD:ATX_JURIS_DATA.ATX_CITY',

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