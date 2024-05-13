import cors from '@elysiajs/cors';
import { Elysia, t } from 'elysia';
import jwt from '@elysiajs/jwt';
import config from '../config';

export default (app: Elysia) =>
  app.use(cors()).use(
    jwt({
      name: 'jwt',
      secret: config.auth.jwt.secret,
      schema: t.Object({
        id: t.String()
      }),
      exp: config.auth.jwt.expiresIn
    })
  );
