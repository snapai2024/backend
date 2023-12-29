import { Sequelize } from 'sequelize-typescript';
import { Role, User } from '../api/models';
import mysql from 'mysql2/promise';
import { config } from '../common/config/main';
import { LogType, Logger } from '../common/services/logger';
import { Stepper } from '../common/services/stepper';
import { CausalError } from '../common/errors/causal.error';

const db = () => {};

db.initialize = async (stepper: Stepper) => {
  try {
    Logger.info(`   ${stepper} - Create mysql connection to database.`, LogType.API);
    const connection = await mysql.createConnection({
      host: config.databaseConfig.host,
      port: config.databaseConfig.port,
      user: config.databaseConfig.user,
      password: config.databaseConfig.password,
    });

    stepper.nextStep();
    Logger.info(`   ${stepper} - Create database if not exists.`, LogType.API);
    await connection.query(`    CREATE DATABASE IF NOT EXISTS \`${config.databaseConfig.name}\`;`);

    stepper.nextStep();
    Logger.info(`   ${stepper} - Instanciation of Sequelize connection.`, LogType.API);
    const sequelize = new Sequelize({
      database: config.databaseConfig.name,
      dialect: 'mysql',
      username: config.databaseConfig.user,
      password: config.databaseConfig.password,
      models: [Role, User],
      logging: (msg) => Logger.info(msg, LogType.DB),
    });

    stepper.nextStep();
    Logger.info(`   ${stepper} - Syncing remote database.`, LogType.API);
    await sequelize.sync({ alter: true });

    Logger.info(`Database connection established.`, LogType.API);
  } catch (e) {
    Logger.error(`Unable to connect to the database : ${(e as CausalError).message}`, LogType.API);
  }
};

export default db;
