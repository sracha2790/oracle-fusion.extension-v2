export class TaxOverrideDetails {
  ReturnOnlyVbtLines: boolean;
  lineNumber: number;
  taxRate: number;
  taxAmt: number;
  taxAmtTaxCurr: number;
  unroundedTaxAmt: number;
}

export class ProRateTaxDetail {
  taxOverrideDetails: Array<TaxOverrideDetails> 
}

