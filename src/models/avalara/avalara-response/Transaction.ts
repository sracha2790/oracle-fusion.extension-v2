import { adjustmentReasonEnum } from "../AdjustTransaction";
import { AvaTaxMessage } from "../AvaTaxMessage";
import { InvoiceMessage } from "../InvoiceMessage";
import { TaxDetailsByTaxType } from "../TaxDetailsByTaxType";
import { TransactionAddress } from "../TransactionAddress";
import { TransactionLocationType } from "../TransactionLocationType";
import { TransactionParameter } from "../TransactionParameter";
import { TransactionSummary } from "../TransactionSummary";
import { TransactionTypeEnums } from "../TransactionTypes";
import { taxOverrideTypeEnum, TransactionLine, TransactionLinesWithTransactionLineDetails } from "./TransactionLine";

export enum statusEnum {
  Temporary = 'Temporary',
  Saved = 'Saved',
  Posted = 'Posted',
  Committed = 'Committed',
  Cancelled = 'Cancelled',
  Adjusted = 'Adjusted',
  Queued = 'Queued',
  PendingApproval = 'PendingApproval',
  Any = 'Any',
}




export class Transaction {
  id: number;
  code: string;
  companyId: number;
  date: string;
  paymentDate: string;
  status: statusEnum;
  type: TransactionTypeEnums;
  batchCode: string;
  currencyCode: string;
  customerUsageType: string;
  entityUseCode: string;
  customerVendorCode: string;
  customerCode: string;
  exemptNo: string;
  reconciled: boolean;
  locationCode: string;
  reportingLocationCode: string;
  purchaseOrderNo: string;
  referenceCode: string;
  salespersonCode:string;
  taxOverrideType: taxOverrideTypeEnum;
  taxOverrideAmount: number;
  taxOverrideReason: string;
  totalAmount: number;
  totalExempt: number;
  totalDiscount: number;
  totalTax: number;
  totalTaxable: number;
  totalTaxCalculated: number;
  adjustmentReason: adjustmentReasonEnum;
  adjustmentDescription: string;
  locked: boolean;
  region: string;
  country: string;
  version: number;
  softwareVersion: string;
  originAddressId: number;
  destinationAddressId: number;
  exchangeRateEffectiveDate: string;
  exchangeRate: number;
  isSellerImporterOfRecord: boolean;
  description: string;
  email: string;
  businessIdentificationNo: string;
  modifiedDate: string;
  modifiedUserId: number;
  taxDate: string;
  lines: Array<TransactionLine>;
  addresses: Array<TransactionAddress>
  locationTypes: Array<TransactionLocationType>;
  summary: Array<TransactionSummary>;
  taxDetailsByTaxType: Array<TaxDetailsByTaxType>;
  parameters: Array<TransactionParameter>
  messages: Array<AvaTaxMessage>;
  invoiceMessages: Array<InvoiceMessage>
}

export class TransactionWithTransactionLines extends Transaction {
  lines: Array<TransactionLinesWithTransactionLineDetails> 
}