export enum lineItemTaxOverrideTypeEnum {
  None = 'None',
  TaxAmount = 'TaxAmount',
  Exemption = 'Exemption',
  TaxDate = 'TaxDate',
  AccruedTaxAmount = 'AccruedTaxAmount',
  DeriveTaxable = 'DeriveTaxable',
}

export class TaxOverride {
  type: lineItemTaxOverrideTypeEnum;
  taxAmount?: number;
  taxDate?: string;
  reason?: string;
}
