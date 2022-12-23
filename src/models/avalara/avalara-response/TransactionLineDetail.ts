
export enum jurisTypeEnum {
  STA ='STA', 
  CTY= 'CTY', 
  CIT ='CIT',
  STJ= 'STJ', 
  CNT= 'CNT'
}

export enum nonTaxableTypeEnum {
  'RateRule', 'RateOverrideRule', 'BaseRule', 'ExemptEntityRule', 'ProductTaxabilityRule', 'NexusRule'
}

export enum sourcingEnum {
  'Destination', 'Origin'
}

export enum taxTypeEnum {
  'ConsumerUse', 'Excise', 'Fee', 'Input', 'Nonrecoverable', 'Output', 'Rental', 'Sales', 'Use'
}

export enum rateTypeEnum {
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

export class TransactionLineDetail {
  id: number;
  transactionLineId: number;
  transactionId: number;
  addressId: number;
  country: string;
  region: string;
  countyFIPS: string;
  stateFIPS: string;
  exemptAmount: number;
  exemptReasonId: number;
  inState: boolean;
  jurisCode: string;
  jurisName: string;
  jurisdictionId: number;
  jurisType: jurisTypeEnum;
  nonTaxableAmount: number;
  nonTaxableRuleId: number;
  nonTaxableType: nonTaxableTypeEnum;
  rate: number;
  rateRuleId: number;
  rateSourceId: number;
  signatureCode: string;
  serCode: string;
  sourcing: sourcingEnum;
  stateAssignedNo: string;
  tax: number;
  taxableAmount: number;
  taxType: taxTypeEnum;
  taxName: string;
  taxAuthorityTypeId: number;
  taxRegionId: number;
  taxCalculated: number;
  taxOverride: number;
  rateType: rateTypeEnum;
}