import { AppknitSDK, AdhocQueryUnion, AdhocQuery, AppknitGraphSDK } from '@appknit-project/appknit-platform-sdk-v2';
import _ = require('lodash');
import { TransactionLinesWithTransactionLineDetails } from '../../src/models/avalara/avalara-response/TransactionLine';
import { jurisTypeEnum, TransactionLineDetail } from '../../src/models/avalara/avalara-response/TransactionLineDetail';
import { DetailTaxLine } from '../../src/models/oracle/DetailTaxLines';
import { TaxableLinesWithDetailTaxLines } from '../../src/models/oracle/TaxableLines';
import { RegimeAndJurisdiction } from '../types';
export class JurisDataMapper {
  private jurisData: Array<Record<string, any>>;

  constructor(
    private sdk: AppknitSDK | AppknitGraphSDK,
    private customerProfile: Record<string, any>,
    private currentLegalEntity: Record<string, any>,
    private application: string,
  ) {
    this.jurisData = [];
  }
  async addJurisDataForUS2US(
    detailTaxLine: DetailTaxLine,
    matchingFusionTaxableLine: TaxableLinesWithDetailTaxLines,
    avalaraTransactionLine: TransactionLinesWithTransactionLineDetails,
    avalaraTransactionLineDetail: TransactionLineDetail,
  ) {
    let queryResults: Record<string, any>;
    let whereClause: Record<string, any>;
    if (avalaraTransactionLineDetail.jurisType == jurisTypeEnum.STA) {
      whereClause = {
        ATX_GEO_SOURCE: this.customerProfile.ATX_GEO_SOURCE,
        ATX_JURISDICTION_TYPE: 'STATE',
        ATX_REGION: avalaraTransactionLineDetail.region,
        ATX_COUNTRY: avalaraTransactionLineDetail.country,
      };
    }

    if (avalaraTransactionLineDetail.jurisType == jurisTypeEnum.CTY) {
      whereClause = {
        ATX_GEO_SOURCE: this.customerProfile.ATX_GEO_SOURCE,
        ATX_JURISDICTION_TYPE: 'COUNTY',
        ATX_REGION: avalaraTransactionLineDetail.region,
        ATX_COUNTRY: avalaraTransactionLineDetail.country,
        ATX_COUNTY: avalaraTransactionLineDetail.jurisName,
      };
    }

    if (avalaraTransactionLineDetail.jurisType == jurisTypeEnum.CIT) {
      whereClause = {
        ATX_GEO_SOURCE: this.customerProfile.ATX_GEO_SOURCE,
        ATX_JURISDICTION_TYPE: 'CITY',
        ATX_REGION: avalaraTransactionLineDetail.region,
        ATX_COUNTRY: avalaraTransactionLineDetail.country,
        ATX_CITY: avalaraTransactionLineDetail.jurisName,
      };
    }

    if (avalaraTransactionLineDetail.jurisType == jurisTypeEnum.STJ) {
      whereClause = {
        ATX_GEO_SOURCE: this.customerProfile.ATX_GEO_SOURCE,
        ATX_JURISDICTION_TYPE: 'SPECIAL',
        ATX_COUNTRY: avalaraTransactionLineDetail.country,
      };
    }

    await this.findAndAddJurisDataOnDetailsTaxLine(whereClause, detailTaxLine);
  }

  async addJurisDataForCA2CA(
    detailTaxLine: DetailTaxLine,
    matchingFusionTaxableLine: TaxableLinesWithDetailTaxLines,
    avalaraTransactionLine: TransactionLinesWithTransactionLineDetails,
    avalaraTransactionLineDetail: TransactionLineDetail,
  ) {
    let whereClause: Record<string, any>;
    if (avalaraTransactionLineDetail.jurisType === jurisTypeEnum.CNT) {
      let region = avalaraTransactionLineDetail.country;
      (avalaraTransactionLine.details as Array<Record<string, any>>).forEach(detail => {
        if (detail.id != avalaraTransactionLineDetail.id && detail.jurisType == 'STA') {
          region = detail.region;
        }
      });
      whereClause = {
        ATX_GEO_SOURCE: this.customerProfile.ATX_GEO_SOURCE,
        ATX_JURISDICTION_TYPE: 'COUNTRY',
        ATX_REGION: region,
        ATX_COUNTRY: avalaraTransactionLineDetail.country,
      };
    }

    if (avalaraTransactionLineDetail.jurisType === jurisTypeEnum.STA) {
      whereClause = {
        ATX_GEO_SOURCE: this.customerProfile.ATX_GEO_SOURCE,
        ATX_JURISDICTION_TYPE: 'STATE',
        ATX_REGION: avalaraTransactionLineDetail.region,
        ATX_COUNTRY: avalaraTransactionLineDetail.country,
      };
    }

    await this.findAndAddJurisDataOnDetailsTaxLine(whereClause, detailTaxLine);
  }

  async addJurisDataForIntl(
    detailTaxLine: DetailTaxLine,
    matchingFusionTaxableLine: TaxableLinesWithDetailTaxLines,
    avalaraTransactionLine: TransactionLinesWithTransactionLineDetails,
    avalaraTransactionLineDetail: TransactionLineDetail,
  ) {
    let queryResults: Record<string, any>;
    let whereClause: Record<string, any>;

    if (avalaraTransactionLineDetail.jurisType == jurisTypeEnum.CNT) {
      whereClause = {
        ATX_GEO_SOURCE: 'AVA',
        ATX_JURISDICTION_TYPE: 'COUNTRY',
        // ATX_REGION: avalaraTransactionLineDetail.region,
        ATX_COUNTRY: avalaraTransactionLineDetail.country,
      };
    }
    await this.findAndAddJurisDataOnDetailsTaxLine(whereClause, detailTaxLine);
  }

  async addJurisDataForIndia(
    detailTaxLine: DetailTaxLine,
    matchingFusionTaxableLine: TaxableLinesWithDetailTaxLines,
    avalaraTransactionLine: TransactionLinesWithTransactionLineDetails,
    avalaraTransactionLineDetail: TransactionLineDetail,
  ) {
    let queryResults: Record<string, any>;
    let whereClause: Record<string, any>;

    if (avalaraTransactionLineDetail.jurisType == jurisTypeEnum.CNT && avalaraTransactionLineDetail.taxName == jurisTypeEnum.IGST) {
      whereClause = {
        ATX_GEO_SOURCE: this.customerProfile.ATX_GEO_SOURCE,
        ATX_JURISDICTION_TYPE: 'COUNTRY',
        ATX_COUNTRY: avalaraTransactionLineDetail.country,
        ATX_TAX_CODE: ['contains', 'IGST'],
      };
    }
    if (avalaraTransactionLineDetail.jurisType == jurisTypeEnum.CNT) {
      whereClause = {
        ATX_GEO_SOURCE: this.customerProfile.ATX_GEO_SOURCE,
        ATX_JURISDICTION_TYPE: 'COUNTRY',
        ATX_COUNTRY: avalaraTransactionLineDetail.country,
        ATX_TAX_CODE: ['contains', 'CGST'],
      };
    }
    if (avalaraTransactionLineDetail.jurisType == jurisTypeEnum.STA) {
      whereClause = {
        ATX_GEO_SOURCE: this.customerProfile.ATX_GEO_SOURCE,
        ATX_JURISDICTION_TYPE: 'STATE',
        ATX_REGION: avalaraTransactionLineDetail.region,
        ATX_COUNTRY: avalaraTransactionLineDetail.country,
      };
    }
    await this.findAndAddJurisDataOnDetailsTaxLine(whereClause, detailTaxLine);
  }

  async addJurisDataForUS2CA(
    detailTaxLine: DetailTaxLine,
    matchingFusionTaxableLine: TaxableLinesWithDetailTaxLines,
    avalaraTransactionLine: TransactionLinesWithTransactionLineDetails,
    avalaraTransactionLineDetail: TransactionLineDetail,
  ) {
    let whereClause: Record<string, any>;
    if (avalaraTransactionLineDetail.jurisType == jurisTypeEnum.CNT) {
      whereClause = {
        ATX_GEO_SOURCE: this.customerProfile.ATX_GEO_SOURCE,
        ATX_JURISDICTION_TYPE: 'STATE',
        ATX_STATE: 'CANADA',
        ATX_COUNTRY: 'US',
      };
    }

    await this.findAndAddJurisDataOnDetailsTaxLine(whereClause, detailTaxLine);
  }

  private async findAndAddJurisDataOnDetailsTaxLine(whereClause: Record<string, any>, detailTaxLine: DetailTaxLine) {
    let jurisDataResults = _.filter(this.jurisData, whereClause);
    if (jurisDataResults.length <= 0) {
      jurisDataResults = await this.sdk.adhocDataProvider.queryDataRecords(this.getJurisdictionQuery(whereClause));
      if (jurisDataResults && Array.isArray(jurisDataResults) && jurisDataResults.length > 0) {
        this.jurisData.push(...jurisDataResults);
      }
    }
    if (jurisDataResults && Array.isArray(jurisDataResults) && jurisDataResults.length > 0) {
      const regimeCodeAndJurisdiction = this.getRegimeAndJurisdiction(
        whereClause.ATX_COUNTRY,
        this.application,
        jurisDataResults,
      );
      if (regimeCodeAndJurisdiction) {
        detailTaxLine['ns:Tax'] = regimeCodeAndJurisdiction.tax;
        detailTaxLine['ns:TaxRegimeCode'] = regimeCodeAndJurisdiction.taxRegimeCode;
        detailTaxLine['ns:TaxRateCode'] = regimeCodeAndJurisdiction.taxRateCode;
        detailTaxLine['ns:TaxStatusCode'] = regimeCodeAndJurisdiction.taxStatusCode;
        detailTaxLine['ns:TaxJurisdictionCode'] = regimeCodeAndJurisdiction.taxJurisdictionCode;
        if (_.toNumber(regimeCodeAndJurisdiction.providerRecRate) > 0) {
          detailTaxLine['ns:ProviderRecRate'] = regimeCodeAndJurisdiction.providerRecRate;
          detailTaxLine['ns:ProviderRecRateCode'] = regimeCodeAndJurisdiction.providerRecRateCode;
        }
      }
    }
  }

  private getJurisdictionQuery(whereClause: Record<string, any>): AdhocQuery {
    const queryFilters = [];
    for (const key in whereClause) {
      const newClause = {};
      if (typeof whereClause[key] === 'string') {
        newClause[`@FIELD:ATX_JURIS_DATA.${key}`] = {
          '@eq': `${whereClause[key]}`,
        };
      } else {
        newClause[`@FIELD:ATX_JURIS_DATA.${key}`] = {
          [`@${whereClause[key][0]}`]: `${whereClause[key][1]}`,
        };
      }
      queryFilters.push(newClause);
    }

    const query: AdhocQuery = {
      fieldSets: {
        ATX_JURIS_DATA: '@NAME:ATX_JURIS_DATA',
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
        ATX_PROVIDER_REC_RATE: '@FIELD:ATX_JURIS_DATA.ATX_PROVIDER_REC_RATE',
        ATX_PROVIDER_REC_RATE_CODE: '@FIELD:ATX_JURIS_DATA.ATX_PROVIDER_REC_RATE_CODE',
      },
      filter: {
        '@and': queryFilters,
      },
    };
    return query;
  }

  private getRegimeAndJurisdiction(
    country: string,
    application: string,
    jurisDataResults: Array<Record<string, any>>,
  ): RegimeAndJurisdiction {
    let result: RegimeAndJurisdiction;
    let regimeConfigItem: Record<string, any>;
    let jurisData: Record<string, any>;
    if (country != 'US') {
      if (application == "PO") {
        application = "AP";
      } else if (application == "ONT") {
        application = "AR";
      }
      for (const jurisDataResultsItem of jurisDataResults) {
        regimeConfigItem = (this.customerProfile.ATX_COUNTRIES as Array<Record<string, any>>)
          ?.find(countryItem => countryItem.ATX_COUNTRY == country)
          ?.ATX_COUNTRIES_REGIME_DETAILS?.find(
            countryRegimeItem =>
              countryRegimeItem.ATX_APPLICATION == application &&
              countryRegimeItem.ATX_TAX_CODE == jurisDataResultsItem.ATX_TAX_CODE,
          );
        if (regimeConfigItem) {
          jurisData = jurisDataResultsItem;
          break;
        }
      }

      result = {
        tax: jurisData?.ATX_TAX_CODE || '',
        taxRateCode:
          jurisData?.ATX_TAX_CODE == 'SPECIAL'
            ? (regimeConfigItem.ATX_JURISDICTION_CODE_PREFIX || '') + jurisData?.ATX_RATE_CODE
            : jurisData?.ATX_RATE_CODE,
        taxStatusCode: jurisData?.ATX_TAX_STATUS_CODE,
        taxJurisdictionCode: (regimeConfigItem.ATX_JURISDICTION_CODE_PREFIX || '') + jurisData?.ATX_JURISDICTION_CODE,
        taxRegimeCode: regimeConfigItem.ATX_TAX_REGIME_CODE || '',
        providerRecRate: jurisData?.ATX_PROVIDER_REC_RATE,
        providerRecRateCode: jurisData?.ATX_PROVIDER_REC_RATE_CODE,
      };
    } else {
      result = {
        tax: jurisDataResults[0].ATX_TAX_CODE,
        taxRateCode:
          jurisDataResults[0].ATX_TAX_CODE == 'SPECIAL'
            ? (this.currentLegalEntity.ATX_JURISDICTION_CODE_PREFIX || '') + jurisDataResults[0].ATX_RATE_CODE
            : jurisDataResults[0].ATX_RATE_CODE,
        taxStatusCode: jurisDataResults[0].ATX_TAX_STATUS_CODE,
        taxJurisdictionCode:
          (this.currentLegalEntity.ATX_JURISDICTION_CODE_PREFIX || '') + jurisDataResults[0].ATX_JURISDICTION_CODE,
        taxRegimeCode: this.currentLegalEntity.ATX_TAX_REGIME_CODE || '',
        providerRecRate: jurisDataResults[0].ATX_PROVIDER_REC_RATE,
        providerRecRateCode: jurisDataResults[0].ATX_PROVIDER_REC_RATE_CODE,
      };
    }
    return result;
  }
}
