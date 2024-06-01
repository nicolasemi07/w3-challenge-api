import { Request, Response } from "express";
import { CountryRepository } from "../../domain";

export class CountriesControler {

  constructor(private readonly countryRepository: CountryRepository) { }

  public getCountries = async (req: Request, res: Response) => {
    const value = req.query.value ? (req.query.value as string).trim() : undefined;

    if (!value || value.length < 3) return res.status(204).json();

    try {
      const countries = await this.countryRepository.getAll(value);
      return res.json(countries);
    } catch (error) {
      return res.status(500).json({ error });
    }

  }

}
