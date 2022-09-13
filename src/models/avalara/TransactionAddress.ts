export enum boundaryLevelEnum {
  'Address',
  'Zip9',
  'Zip5',
}

export class TransactionAddress {
  id: number;
  transactionId: number;
  boundaryLevel: boundaryLevelEnum;
  line1: string;
  line2: string;
  line3: string;
  city: string;
  region: string;
  postalCode: string;
  country: string;
  taxRegionId: number;
}