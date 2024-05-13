import { Elysia } from 'elysia';
import { authControllers } from '../controllers';
import { authPlugin } from '../middlewares';
import userRoutes from '../routes/user';

export default (app: Elysia) => app.use(authPlugin).use(userRoutes).post('/logout', authControllers.logout);
