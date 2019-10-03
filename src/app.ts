import express, { Application } from 'express';
import mongoose from 'mongoose';
import helmet from 'helmet';

import { Controller } from './interfaces/controller.interface';

export class App {
  public app: Application;

  constructor(controllers: Controller[]) {
    this.app = express();

    this.connectToTheDatabase();
    this.initializeMiddlewares();
    this.initializeControllers(controllers);
  }

  listen() {
    this.app.listen(process.env.PORT, () => {
      console.log(`App listening on the port ${process.env.PORT}`);
    });
  }

  get getServer() {
    return this.app;
  }

  private initializeMiddlewares() {
    this.app.use(express.json());
    this.app.use(helmet());
  }

  private initializeControllers(controllers: Controller[]) {
    controllers.forEach(({ router }) => {
      this.app.use('/', router);
    });
  }

  private connectToTheDatabase() {
    mongoose.connect(`${process.env.MONGO_URI}`, {
      useNewUrlParser: true,
      useCreateIndex: true,
      useFindAndModify: false,
      useUnifiedTopology: true
    });
  }
}
