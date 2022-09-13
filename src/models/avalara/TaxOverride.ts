
export enum typeEnum {
  'None', 'TaxAmount', 'Exemption', 'TaxDate', 'AccruedTaxAmount', 'DeriveTaxable'
}

export class TaxOverride {
  type: typeEnum;
  taxAmount: number;
  taxDate: string;
  reason: string;
}