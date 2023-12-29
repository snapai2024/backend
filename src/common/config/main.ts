import dotenv from 'dotenv';
dotenv.config();

interface DatabaseConfig {
  name: string;
  host: string;
  port: number;
  user: string;
  password: string;
  dialect: string;
}

interface MainApiConfig {
  logsFolder: string;
  prod: boolean;
  apiPort: number;
  apiName: string;
  databaseConfig: DatabaseConfig;
  jwtSecret: string;
}

export const config: MainApiConfig = {
  logsFolder: process.env.LOGS_FOLDER!,
  prod: process.env.NODE_ENV! === 'production',
  apiPort: Number(process.env.PORT!),
  apiName: process.env.API_NAME!,
  databaseConfig: {
    name: process.env.DB_NAME!,
    host: process.env.DB_HOST!,
    port: Number(process.env.DB_PORT!),
    user: process.env.DB_USER!,
    password: process.env.DB_PASS!,
    dialect: process.env.DB_DIALECT!,
  },
  jwtSecret: process.env.JWT_SECRET!,
};
