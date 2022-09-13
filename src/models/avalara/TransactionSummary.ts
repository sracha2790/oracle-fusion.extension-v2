

export enum jurisTypeEnumSummary {
  'Country', 'State', 'County', 'City', 'Special'
}

export enum rateTypeEnumSummary{
    'ReducedA',
    'ReducedB',
    'Food',
    'General',
    'IncreasedStandard',
    'LinenRental',
    'Medical',
    'Parking',
    'SuperReduced',
    'ReducedR',
    'Standard',
    'Zero',
}
export class TransactionSummary {
  country: string;
  region: string;
  jurisType: jurisTypeEnumSummary ;
  jurisCode: string;
  jurisName: string;
  taxAuthorityType: number;
  stateAssignedNo: string;
  taxType: string;
  taxSubType: string;
  taxName: string;
  taxGroup: string;
  rateType: rateTypeEnumSummary;
  rateTypeCode: string;
  taxable: number;
  rate: number;
  tax: number;
  taxCalculated: number;
  nonTaxable: number;
  exemption: number;
}