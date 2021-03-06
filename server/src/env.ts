import * as dotenv from 'dotenv';
import { isStringTrue } from './common/helpers/boolean.helper';
import { getOsEnv } from './common/helpers/path.helper';

dotenv.config();

export const env = {
  app: {
    port: getOsEnv('PORT'),
    url: getOsEnv('APP_URL'),
    secretKey: getOsEnv('APP_SECRET'),
    nodeEnv: getOsEnv('NODE_ENV'),
  },
  db: {
    url: getOsEnv('DATABASE_URL'),
    connection: getOsEnv('TYPEORM_CONNECTION'),
    host: getOsEnv('TYPEORM_HOST'),
    port: Number(getOsEnv('TYPEORM_PORT')),
    username: getOsEnv('TYPEORM_USERNAME'),
    password: getOsEnv('TYPEORM_PASSWORD'),
    name: getOsEnv('TYPEORM_DATABASE'),
    synchronize: isStringTrue(getOsEnv('TYPEORM_SYNCHRONIZE')),
    migrationsRun: isStringTrue(getOsEnv('TYPEORM_MIGRATIONS_RUN')),
    migrationsDir: getOsEnv('TYPEORM_MIGRATIONS'),
    enititiesDir: getOsEnv('TYPEORM_ENTITIES'),
    logging: isStringTrue(getOsEnv('TYPEORM_LOGGING')),
  },
  mailer: {
    service: getOsEnv('MAILER_SERVICE'),
    auth: {
      user: getOsEnv('MAILER_AUTH_USER'),
      clientId: getOsEnv('MAILER_AUTH_CLIENT_ID'),
      clientSecret: getOsEnv('MAILER_AUTH_CLIENT_SECRET'),
      refreshToken: getOsEnv('MAILER_AUTH_REFRESH_TOKEN'),
    },
  },
} as const;
