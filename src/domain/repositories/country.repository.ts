import { CountryEntity } from "../entities/country.entity";

export abstract class CountryRepository {

  abstract getAll(value: string): Promise<CountryEntity[]>;

}
