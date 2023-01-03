

export enum jurisTypeEnumSummary {
  Country='Country',
  State='State',
  County='County',
  City='City',
  Special='Special',
}

export enum rateTypeEnumSummary{
  ReducedA='ReducedA',
  ReducedB='ReducedB',
  Food='Food',
  General='General',
  IncreasedStandard= 'IncreasedStandard',
  LinenRental='LinenRental',
  Medical='Medical',
  Parking='Parking',
  SuperReduced='SuperReduced',
  ReducedR='ReducedR',
  Standard='Standard',
  Zero='Zero',
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