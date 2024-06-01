import { Router } from "express";
import { CountriesControler } from "./controller";
import { CountryDatasourceImpl } from "../../infraestructure/datasource/country.datasource.implementation";
import { CountryRepositoryImpl } from "../../infraestructure/repositories/country.repository.implementation";

export class CountriesRoutes {

  static get routes(): Router {
    const router = Router();

    // Si queremos cambiar de implementación (por ejemplo usar TypeOrm en lugar de Prisma, se puede inyectar desde acá)
    // Así evitamos la posible deuda técnica de tocar código en varios lugares del proyecto si quisiéramos cambiar de ORM
    const dataSource = new CountryDatasourceImpl();
    const countryRepository = new CountryRepositoryImpl(dataSource);

    const countriesController = new CountriesControler(countryRepository);
    router.get('/', countriesController.getCountries);
    return router;
  }

}
