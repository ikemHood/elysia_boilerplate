import { Elysia } from 'elysia';
import { authControllers } from '../controllers';
import { authSchema } from '../schemas';

export default (app: Elysia) =>
  app
    .use(authSchema)
    .post('/signup', authControllers.signup, { body: 'auth' })
    .post('/login', authControllers.login, { body: 'auth' });
