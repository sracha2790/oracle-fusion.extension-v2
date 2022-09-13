export class TaxDetailsByTaxType {
  taxType: string;
  totalTaxable: number;
  totalExempt: number
  totalNonTaxable: number;
  totalTax: number;
  taxSubTypeDetails: {
    taxSubType: string; 
    totalTaxable: number; 
    totalExempt: number; 
    totalNonTaxable: number; 
    totalTax: number; 
  }
}