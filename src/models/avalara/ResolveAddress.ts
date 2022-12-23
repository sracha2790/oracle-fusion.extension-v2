export enum textCaseEnum {
  'Upper', 
  'Mixed'
}

export class ResolveAddress {
  line1: string;
  line2: string;
  line3: string;
  city: string;
  region: string;
  country: string;
  postalCode: string;
  textCase: textCaseEnum;
}