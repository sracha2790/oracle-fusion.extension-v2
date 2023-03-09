export enum jurisTypeEnum {
  STA = 'STA',
  CTY = 'CTY',
  CIT = 'CIT',
  STJ = 'STJ',
  CNT = 'CNT',
  IGST = 'IGST',
}

export enum nonTaxableTypeEnum {
  RateRule = 'RateRule',
  RateOverrideRule = 'RateOverrideRule',
  BaseRule = 'BaseRule',
  ExemptEntityRule = 'ExemptEntityRule',
  ProductTaxabilityRule = 'ProductTaxabilityRule',
  NexusRule = 'NexusRule',
}

export enum sourcingEnum {
  Destination = 'Destination',
  Origin = 'Origin',
}

export enum taxTypeEnum {
  ConsumerUse = 'ConsumerUse',
  Excise = 'Excise',
  Fee = 'Fee',
  Input = 'Input',
  Nonrecoverable = 'Nonrecoverable',
  Output = 'Output',
  Rental = 'Rental',
  Sales = 'Sales',
  Use = 'Use',
}

export enum rateTypeEnum {
  ReducedA = 'ReducedA',
  ReducedB = 'ReducedB',
  Food = 'Food',
  General = 'General',
  IncreasedStandard = 'IncreasedStandard',
  LinenRental = 'LinenRental',
  Medical = 'Medical',
  Parking = 'Parking',
  SuperReduced = 'SuperReduced',
  ReducedR = 'ReducedR',
  Standard = 'Standard',
  Zero = 'Zero',
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
