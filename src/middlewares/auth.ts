import { Elysia } from 'elysia';
import { errorHelper } from '../helpers';

const { UnauthorizedError } = errorHelper;

export default (app: Elysia) =>
  app.derive(
    async ({
      //@ts-expect-error
      jwt,
      headers: { authorization },
      cookie: { authorization: cookieAuth }
    }) => {
      const user = await jwt.verify(authorization?.split(' ')[1] ?? cookieAuth.value);

      if (!user) {
        throw new UnauthorizedError('Invalid token!');
      }

      return {
        user
      };
    }
  );
