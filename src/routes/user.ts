import { Elysia, t } from 'elysia';
import { userControllers } from '../controllers';

export default (app: Elysia) =>
  app
    .get('/me', userControllers.me)
    .get('/users/:id', userControllers.fetchOne)
    .post('/users', userControllers.create, {
      body: t.Object({
        name: t.String({ minLength: 1, maxLength: 256 }),
        email: t.String({ format: 'email', maxLength: 256 }),
        password: t.String({ minLength: 8, maxLength: 256 })
      })
    });
