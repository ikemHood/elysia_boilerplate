import { type Context } from 'elysia';
import type { SuccessResponse, ContextWithJWT } from '../types';
import { userServices, authServices } from '../services';
import type { User } from '../database/models/users';
import config from '../config';

const { create } = userServices;
const { signIn } = authServices;

export const signup = async (context: Context): Promise<SuccessResponse<User>> => {
  const payload = context.body as User;

  await create(payload);

  return {
    message: 'Signup successful!'
  };
};

export const login = async (context: ContextWithJWT): Promise<SuccessResponse<{ token: string }>> => {
  const payload = context.body as { email: string; password: string };

  const user = await signIn(payload);
  const token = await context.jwt.sign({ id: user.id });

  context.cookie.authorization.set({
    value: token,
    httpOnly: true,
    priority: 'high',
    maxAge: Date.now() + config.auth.cookie.expires
  });

  return {
    message: 'User logged in successfully!',
    data: { token }
  };
};

export const logout = async (context: ContextWithJWT): Promise<SuccessResponse<string>> => {
  context.cookie.authorization.remove();

  return {
    message: 'User logged out successfully!'
  };
};
