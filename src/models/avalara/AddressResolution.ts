import { AddressInfo } from "./AddressInfo";
import { AvaTaxMessage } from "./AvaTaxMessage";
import { CoordinateInfo } from "./CoordinateInfo";
import { TaxAuthorityInfo } from "./TaxAuthorityInfo";
import { ValidatedAddressInfo } from "./ValidatedAddressInfo";


export enum resolutionQualityEnum {
  NotCoded = 'NotCoded',
  External = 'External',
  CountryCentroid = 'CountryCentroid',
  RegionCentroid = 'RegionCentroid',
  ParialCentroid = 'PartialCentroid',
  PostalCentroidGood = 'PostalCentroidGood',
  PostalCentroidBetter = 'PostalCentroidBetter',
  PostalCentroidBest = 'PostalCentroidBest',
  Intersection = 'Intersection',
  Interpolated = 'Interpolated',
  Rooftop = 'Rooftop',
  Constant = 'Constant',
}

export class AddressResolution {
  address: AddressInfo; 
  validatedAddresses: ValidatedAddressInfo; 
  coordinates: CoordinateInfo; 
  resolutionQuality: resolutionQualityEnum;
  taxAuthorities: Array<TaxAuthorityInfo>; 
  messages: Array<AvaTaxMessage>;
}