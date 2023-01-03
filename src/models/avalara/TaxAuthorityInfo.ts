export enum jurisdictionTypeEnum {
  Country = 'Country',
  Composite = 'Composite',
  State = 'State',
  County = 'County',
  City = 'City',
  Special = 'Special',
}

export class TaxAuthorityInfo {
  avalaraId: string;
  jurisdictionName: string;
  jurisdictionType: jurisdictionTypeEnum;
  signatureCode: string;
}
