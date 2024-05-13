import { type Context } from 'elysia';
import type { SuccessResponse, ContextWithUser, LoggedInUser } from '../types';
import type { User } from '../database/models/users';
import { userServices } from '../services';

export const me = async (context: ContextWithUser): Promise<SuccessResponse<{ user: LoggedInUser }>> => {
  return {
    message: 'User details fetched successfully!',
    data: { user: context.user }
  };
};

export const create = async (context: Context): Promise<SuccessResponse<{ user: User }>> => {
  const body = context.body as User;

  const user = await userServices.create(body);

  return {
    data: { user },
    message: 'User created successfully.'
  };
};

export const fetchOne = async (context: Context): Promise<SuccessResponse<{ user: User }>> => {
  const { id } = context.params;
  const user = await userServices.fetchById(id);

  return {
    message: 'User fetched successfully.',
    data: { user }
  };
};
