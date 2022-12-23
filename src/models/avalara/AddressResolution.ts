import { AddressInfo } from "./AddressInfo";
import { AvaTaxMessage } from "./AvaTaxMessage";
import { CoordinateInfo } from "./CoordinateInfo";
import { TaxAuthorityInfo } from "./TaxAuthorityInfo";
import { ValidatedAddressInfo } from "./ValidatedAddressInfo";


export enum resolutionQualityEnum {
  'NotCoded',
  'External',
  'CountryCentroid',
  'RegionCentroid',
  'PartialCentroid',
  'PostalCentroidGood',
  'PostalCentroidBetter',
  'PostalCentroidBest',
  'Intersection',
  'Interpolated',
  'Rooftop',
  'Constant',
}
export class AddressResolution {
  address: AddressInfo; 
  validatedAddresses: ValidatedAddressInfo; 
  coordinates: CoordinateInfo; 
  resolutionQuality: resolutionQualityEnum;
  taxAuthorities: Array<TaxAuthorityInfo>; 
  messages: Array<AvaTaxMessage>;
}