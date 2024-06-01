import { prisma } from "../../data/postgres";
import { CountryDatasource, CountryEntity } from "../../domain";

// Implementacion con Prisma
export class CountryDatasourceImpl implements CountryDatasource {

  async getAll(value: string): Promise<CountryEntity[]> {
    const countries = await prisma.country.findMany({
      where: {
        name: {
          contains: value,
          mode: 'insensitive',
        },
      },
      take: 5
    });

    let allPopulationCount = await this.getAllPopulationCount();

    return countries.map(country => CountryEntity.fromObject({
      ...country,
      percentageOfPopulation: this.getPercentage(allPopulationCount, country.populationNumber)
    }));
  }

  getPercentage(allCountriesNumber: number, populationNumber: number): number {
    return Math.round(populationNumber * 100 / allCountriesNumber);
  }

  async getAllPopulationCount(): Promise<number> {
    const allPopulationRows = await prisma.country.findMany({ select: { populationNumber: true } });
    let allPopulationCount = 0;
    for (const i of allPopulationRows) {
      allPopulationCount += i.populationNumber;
    }
    return allPopulationCount;
  }

}

