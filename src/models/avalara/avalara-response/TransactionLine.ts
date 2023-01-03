import { sourcingEnum, TransactionLineDetail } from "./TransactionLineDetail";


export enum methodEnum {
  Accrual = 'Accrual',
  Cash = 'Cash',
}

export enum taxOverrideTypeEnum {
  None = 'None',
  TaxAmount = 'TaxAmount',
  Exemption = 'Exemption',
  TaxDate = 'TaxDate',
  AccruedTaxAmount = 'AccruedTaxAmount',
}

export class TransactionLine {
  id: number;
  transactionId: number;
  lineNumber: string;
  method: methodEnum;
  boundaryOverrideId: number;
  customerUsageType: string;
  description: string;
  destinationAddressId: number;
  discountAmount: number;
  discountTypeId: number;
  exemptAmount: number;
  exemptCertId: number;
  exemptNo: string;
  isItemTaxable: boolean;
  isSSTP: boolean;
  itemCode: string;
  lineAmount: number;
  originAddressId: number;
  quantity: number;
  ref1: string;
  ref2: string;
  reportingDate: string;
  revAccount: string;
  sourcing: sourcingEnum;
  tax: number;
  taxableAmount: number;
  taxCalculated: number;
  taxCode: string;
  taxCodeId: number;
  taxDate: string;
  taxEngine: string;
  taxOverrideType: taxOverrideTypeEnum;
  taxOverrideAmount: number;
  taxOverrideReason: string;
  taxIncluded: boolean;
  originationDocumentId: string;
  vatCode: string
}

export class TransactionLinesWithTransactionLineDetails extends TransactionLine {
  details?: Array<TransactionLineDetail>
}