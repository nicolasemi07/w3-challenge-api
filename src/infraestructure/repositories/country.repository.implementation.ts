import { CountryDatasource, CountryEntity, CountryRepository } from "../../domain";

// Implementacion con Prisma
export class CountryRepositoryImpl implements CountryRepository {

  constructor(private readonly dataSource: CountryDatasource) { }

  async getAll(value: string): Promise<CountryEntity[]> {
    return await this.dataSource.getAll(value);
  }

}
