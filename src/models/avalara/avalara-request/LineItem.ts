import { AddressLocation } from "../AddressLocation";
import { TaxOverride } from "../TaxOverride";


export class LineItem {
  number: string;
  quantity: number;
  amount: number;
  addresses: {
    Unknown: AddressLocation; 
    ShipFrom: AddressLocation; 
    ShipTo: AddressLocation; 
    PointOfOrderAcceptance: AddressLocation; 
    PointOfOrderOrigin: AddressLocation; 
    SingleLocation: AddressLocation; 
    Other: AddressLocation; 
  };
  taxCode: string;
  customerUsageType: string;
  entityUseCode: string;
  itemCode: string;
  exemptionCode: string;
  discounted: boolean;
  taxIncluded: boolean;
  revenueAccount: string;
  ref1: string;
  ref2: string;
  description: string;
  businessIdentificationNo: string;
  taxOverride: TaxOverride; 
  hsCode: string;
}