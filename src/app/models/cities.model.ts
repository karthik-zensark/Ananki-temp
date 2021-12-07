import { AccessType } from "./access.model";
import { CitiesAll } from "./citiesall.model";

export class CityWise {
  city: string;
  citiesall: CitiesAll[]
  access: AccessType[];

  constructor(city: string, citiesall: CitiesAll[], access: AccessType[],) {
    this.city = city;
    this.citiesall = citiesall;
    this.access = access;
  }
}
