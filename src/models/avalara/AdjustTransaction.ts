import { CreateTransaction } from "./avalara-request/CreateTransaction";

export enum adjustmentReasonEnum {
  NotAdjusted = 'NotAdjusted',
  SourcingIssue = 'SourcingIssue',
  ReconciledWithGeneralLedger = 'ReconciledWithGeneralLedger',
  ExemptCertApplied = 'ExemptCertApplied',
  PriceAdjusted = 'PriceAdjusted',
  ProductReturned = 'ProductReturned',
  ProductExchanged = 'ProductExchanged',
  BadDebt = 'BadDebt',
  Other = 'Other',
  Offline = 'Offline',
}

export class AdjustTransaction {
  adjustmentReason: adjustmentReasonEnum; 
  adjustmentDescription: string; 
  newTransaction: CreateTransaction;
}