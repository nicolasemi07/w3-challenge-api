import express, { Router } from 'express';

interface Options {
  port: number;
  routes: Router;
}

export class Server {

  private readonly port: number;
  private readonly routes: Router;
  public readonly app = express();
  private serverListener?: any;

  constructor(options: Options) {
    const { port, routes } = options;
    this.port = port;
    this.routes = routes;
  }

  async start() {
    // Middlewares
    this.app.use(express.json());
    this.app.use(express.urlencoded({ extended: true }));

    // Routes
    this.app.use(this.routes);

    this.serverListener = this.app.listen(this.port, () => {
      console.log(`Server running on port ${this.port}`);
    });
  }

  public close() {
    this.serverListener?.close();
  }
}

