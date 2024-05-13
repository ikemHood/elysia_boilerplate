import { Elysia } from 'elysia';
import { errorPlugin, loggerPlugin, securityPlugin } from './middlewares';
import { authRoutes, protectedRoutes } from './routes';
import config from './config';
import ConnectDB from './database';

export const app = new Elysia();

ConnectDB();

app
  .use(loggerPlugin)
  .use(securityPlugin)
  .use(errorPlugin)
  .get('/', () => ({
    name: config.app.name,
    version: config.app.version
  }))
  .use(authRoutes)
  .use(protectedRoutes)
  .listen(config.app.port, () => {
    console.log(`Environment: ${config.app.env}`);
    console.log(`${config.app.name} API Server is running at ${app.server?.hostname}:${app.server?.port}`);
  });
