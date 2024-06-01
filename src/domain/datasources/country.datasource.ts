import { CountryEntity } from "../entities/country.entity";

export abstract class CountryDatasource {

  abstract getAll(value: string): Promise<CountryEntity[]>;

}
