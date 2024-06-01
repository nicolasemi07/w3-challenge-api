import { Router } from "express";
import { CountriesRoutes } from "./countries/routes";

export class AppRoutes {

  static get routes(): Router {
    const router = Router();

    router.use('/api/countries', CountriesRoutes.routes);

    return router;
  }

}