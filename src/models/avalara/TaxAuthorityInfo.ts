export enum jurisdictionTypeEnum {
  'Country', 
  'Composite', 
  'State', 
  'County', 
  'City', 
  'Special'
}


export class TaxAuthorityInfo {
  avalaraId: string; 
  jurisdictionName: string; 
  jurisdictionType: jurisdictionTypeEnum; 
  signatureCode: string;
}