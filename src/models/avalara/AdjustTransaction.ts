import { CreateTransaction } from "./avalara-request/CreateTransaction";

export enum adjustmentReasonEnum {
  'NotAdusted',
  'SourcingIssue',
  'ReconciledWithGeneralLedger',
  'ExemptCertApplied',
  'PriceAdjusted',
  'ProductReturned',
  'ProductExchanged',
  'BadDebt',
  'Other',
  'Offline',
}

export class AdjustTransaction {
  adjustmentReason: adjustmentReasonEnum; 
  adjustmentDescription: string; 
  newTransaction: CreateTransaction;
}