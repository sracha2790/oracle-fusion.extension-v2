
export enum lineItemTaxOverrideTypeEnum {
  'None', 'TaxAmount', 'Exemption', 'TaxDate', 'AccruedTaxAmount', 'DeriveTaxable'
}

export class TaxOverride {
  type: lineItemTaxOverrideTypeEnum;
  taxAmount?: number;
  taxDate?: string;
  reason?: string;
}