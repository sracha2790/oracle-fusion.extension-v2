import { AppknitSDK, AdhocQueryUnion, AdhocQuery, AppknitGraphSDK } from '@appknit-project/appknit-platform-sdk-v2';
import _ = require('lodash');
import { AFCLineItemResult, AFCTaxesGenerated } from 'src/models/afc/AFCCalculateTaxesResponse';
import { DetailTaxLine } from '../../src/models/oracle/DetailTaxLines';
import { TaxableLinesWithDetailTaxLines } from '../../src/models/oracle/TaxableLines';
import { RegimeAndJurisdiction, RegimeAndJurisdictionAFC } from '../types';
export class JurisDataMapperAFC {
  private jurisData: Array<Record<string, any>>;

  constructor(
    private sdk: AppknitSDK | AppknitGraphSDK,
    private customerProfile: Record<string, any>,
    private currentLegalEntity: Record<string, any>,
    private application: string,
  ) {
    this.jurisData = [];
  }
  async addJurisDataforUS2USAFC(
    detailTaxLine: DetailTaxLine,
    matchingFusionTaxableLine: TaxableLinesWithDetailTaxLines,
    avalaraTransactionLine: AFCLineItemResult,
    avalaraTransactionLineDetail: AFCTaxesGenerated,
  ) {
    let queryResults: Record<string, any>;
    // let whereClause: Record<string, any>;
    const whereClause = {
        AFC_TAX_TYPE: avalaraTransactionLineDetail.tid,
        AFC_TAX_LEVEL: avalaraTransactionLineDetail.lvl,
    };

    await this.findAndAddJurisDataOnDetailsTaxLineAFC(whereClause, detailTaxLine, avalaraTransactionLineDetail);
  }


  private async findAndAddJurisDataOnDetailsTaxLineAFC(whereClause: Record<string, any>, detailTaxLine: DetailTaxLine, avalaraTransactionLineDetail: AFCTaxesGenerated) {
    let jurisDataResults = _.filter(this.jurisData, whereClause);
    if (jurisDataResults.length <= 0) {
        jurisDataResults = await this.sdk.adhocDataProvider.queryDataRecords(this.getJurisdictionQueryAFC(whereClause, avalaraTransactionLineDetail));
        if (jurisDataResults && Array.isArray(jurisDataResults) && jurisDataResults.length > 0) {
            this.jurisData.push(...jurisDataResults);
        }
    }
    if (jurisDataResults && Array.isArray(jurisDataResults) && jurisDataResults.length > 0) {
        const regimeCodeAndJurisdiction = this.getRegimeAndJurisdictionAFC(
            this.application,
            jurisDataResults
        );
        if (regimeCodeAndJurisdiction) {
            detailTaxLine['ns:TaxRegimeCode'] = regimeCodeAndJurisdiction.taxRegimeCode;
            detailTaxLine['ns:TaxRateCode'] = regimeCodeAndJurisdiction.taxRateCode;
            detailTaxLine['ns:TaxStatusCode'] = regimeCodeAndJurisdiction.taxStatusCode;
            detailTaxLine['ns:TaxJurisdictionCode'] = regimeCodeAndJurisdiction.taxJurisdictionCode;
        }
    }
  }

  private getJurisdictionQueryAFC(whereClause: Record<string, any>, avalaraTransactionLineDetail: AFCTaxesGenerated): AdhocQuery {
    const queryFilters = [];
    for (const key in whereClause) {
      const newClause = {};
      newClause[`@FIELD:AFC_JURIS_DATA.${key}`] = {
        '@eq': `${whereClause[key]}`,
      };
      queryFilters.push(newClause);
    }

    const query: AdhocQuery = {
      fieldSets: {
        AFC_JURIS_DATA: '@NAME:AFC_JURIS_DATA',
      },
      joins: undefined,
      select: {
        AFC_TAX_TYPE: '@FIELD:AFC_JURIS_DATA.AFC_TAX_TYPE',
        AFC_TAX_LEVEL: '@FIELD:AFC_JURIS_DATA.AFC_TAX_LEVEL',
        AFC_TAX_DESCRIPTION: '@FIELD:AFC_JURIS_DATA.AFC_TAX_DESCRIPTION',
        AFC_TAX_LEVEL_DESCRIPTION: '@FIELD:AFC_JURIS_DATA.AFC_TAX_LEVEL_DESCRIPTION',
        AFC_TAX_STATUS_CODE: '@FIELD:AFC_JURIS_DATA.AFC_TAX_STATUS_CODE',
        AFC_TAX_RATE_CODE: '@FIELD:AFC_JURIS_DATA.AFC_TAX_RATE_CODE',
        AFC_TAX_JURISDICTION_CODE: '@FIELD:AFC_JURIS_DATA.AFC_TAX_JURISDICTION_CODE',
      },
      filter: {
        '@and': queryFilters,
      },
    };
    return query;
    }


private getRegimeAndJurisdictionAFC(
    application: string,
    jurisDataResults: Array<Record<string, any>>,
  ): RegimeAndJurisdictionAFC {
    let result: RegimeAndJurisdictionAFC;
    result = {
        taxRateCode: (this.currentLegalEntity.ATX_JURISDICTION_CODE_PREFIX || '') + jurisDataResults[0].AFC_TAX_RATE_CODE,
        taxStatusCode: jurisDataResults[0].AFC_TAX_STATUS_CODE,
        taxJurisdictionCode:
            (this.currentLegalEntity.ATX_JURISDICTION_CODE_PREFIX || '') + jurisDataResults[0].AFC_JURISDICTION_CODE,
        taxRegimeCode: this.currentLegalEntity.ATX_TAX_REGIME_CODE|| '',
        };
        return result;
    }
}



