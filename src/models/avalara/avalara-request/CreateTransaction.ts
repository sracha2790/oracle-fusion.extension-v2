
import { AddressInfo } from "../AddressInfo";
import { TaxOverride } from "../TaxOverride";
import { TransactionParameter } from "../TransactionParameter";
import { TransactionTypeEnums } from "../TransactionTypes";
import { LineItem } from "./LineItem";

export enum serviceModeEnum {
  'Automatic',
  'Local',
  'Remote'
}

export enum debugLevelEnum {
  'Normal', 
  'Diagnostic'
}

export class CreateTransaction {
  companyCode: string;
  type: TransactionTypeEnums;
  code: string;
  date: string;
  salespersonCode: string;
  customerCode: string;
  customerUsageType:string;
  discount: number;
  purchaseOrderNo: string;
  exemptionNo: string;
  addresses: {
    Unkown: AddressInfo; 
    ShipFrom: AddressInfo; 
    ShipTo: AddressInfo; 
    PointOfOrderAcceptance: AddressInfo; 
    PointOfOrderOrigin: AddressInfo; 
    SingleLocation: AddressInfo; 
    Other: AddressInfo; 
  };
  lines: Array<LineItem>
  parameters: Array<TransactionParameter>;
  referenceCode: string;
  reportingLocationCode: string;
  commit: boolean;
  batchCode: string;
  taxOverride: TaxOverride; 
  taxDate: string;
  currencyCode: string;
  serviceMode: serviceModeEnum;
  paymentDate:string;
  exchangeRate: number;
  exchangeRateEffectiveDate: string;
  posLaneCode: string;
  businessIdentificationNo: string;
  isSellerImporterOfRecord: boolean;
  description: string;
  email: string;
  debugLevel: debugLevelEnum;
}