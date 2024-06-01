export class CountryEntity {

  constructor(
    public name: string,
    public populationNumber: number,
    public percentageOfPopulation: number,
    public id?: number,
  ) { }

  public static fromObject(object: { [key: string]: any }): CountryEntity {
    const { name, populationNumber, percentageOfPopulation } = object;
    return { name, populationNumber, percentageOfPopulation };
  }

}
