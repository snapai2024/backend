import express, { Application } from 'express';
import { Logger, LogType } from '../common/services/logger';
import * as swaggerUi from 'swagger-ui-express';
import router from './routes';
import { config } from '../common/config/main';
import { openapiSpecification } from '../common/config/swagger';
import cookieParser from 'cookie-parser';
import db from '../database';
import bodyParser from 'body-parser';
import { Stepper, StepperFactory } from '../common/services/stepper';

export class APIBuilder {
  async build(): Promise<Application> {
    const stepper: Stepper = StepperFactory.create(6);

    Logger.info(
      `${stepper} - Starting ${config.apiName} on port ${config.apiPort}. Production : ${String(config.prod)}`,
      LogType.API,
    );

    // DATABASE instanciation
    stepper.nextStep();
    Logger.info(`${stepper} - Connecting to database.`, LogType.API);
    const databaseStepper: Stepper = StepperFactory.create(4);
    await db.initialize(databaseStepper);

    // GENERAL API INSTANTIATION
    stepper.nextStep();
    Logger.info(`${stepper} - Creating express application.`, LogType.API);
    const app: Application = express();

    app.listen(config.apiPort, () => Logger.info(`API is listening on port ${config.apiPort}.`, LogType.API));

    // PARSING CONFIGURATIONS
    stepper.nextStep();
    Logger.info(`${stepper} - Setting up parsing configurations.`, LogType.API);
    app.use(bodyParser.json({ limit: '50mb', type: 'application/json' }));
    app.use(bodyParser.urlencoded({ limit: '50mb', extended: true }));
    app.use(express.json());
    app.use(express.urlencoded({ extended: true }));
    app.use(cookieParser());

    stepper.nextStep();
    Logger.info(`${stepper} - Setting up router.`, LogType.API);
    app.use('/', router);

    Logger.info(`API ${config.apiName} is running on port ${config.apiPort}.`, LogType.API);

    // SWAGGER LOADER ----------
    stepper.nextStep();
    Logger.info(`${stepper} - Setting up swagger configuration.`, LogType.API);
    app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(openapiSpecification));

    return app;
  }
}

export const apiBuilder = new APIBuilder();
