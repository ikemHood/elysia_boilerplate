import data from '../package.json';

const isTestEnvironment = Bun.env.NODE_ENV === 'test';

export default {
  app: {
    env: Bun.env.NODE_ENV,
    name: data.name,
    version: data.version,
    host: Bun.env.TEST_APP_HOST || Bun.env.APP_HOST || 'localhost',
    port: (isTestEnvironment ? Bun.env.TEST_APP_PORT : Bun.env.APP_PORT) || '3000'
  },
  db: {
    mongodb: Bun.env.MONGO_URI!
  },
  auth: {
    jwt: {
      secret: Bun.env.JWT_SECRET!,
      expiresIn: Bun.env.JWT_EXPIRES_IN!
    },
    cookie: {
      expires: Number(Bun.env.COOKIES_EXPIRES_IN_DAYS!) * 60 * 60 * 24
    }
  },
  socials: {
    website: Bun.env.WEBSITE!,
    x: Bun.env.X_URL!,
    tg: Bun.env.TG_URL!
  }
};
