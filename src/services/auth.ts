import { errorHelper } from '../helpers';
import { db } from '../database';
import type { User } from '../database/models/users';

const { UnauthorizedError } = errorHelper;
const User = db.Users;

/**
 * Signs in a user.
 *
 * @param payload - The user data to be signed in.
 * @param {string} payload.email The email of the user.
 * @param {string} payload.password The password of the user.
 * @returns {Promise<User>} A promise that resolves to the user that signed in.
 */
export async function signIn(payload: { email: string; password: string }): Promise<User> {
  const user = await User.findOne({ email: payload.email }).select('+password');

  if (!user) {
    throw new UnauthorizedError('Invalid credentials!');
  }

  const isMatch = user.comparePassword(payload.password);

  if (!isMatch) {
    throw new UnauthorizedError('Invalid credentials!');
  }

  return user.toJSON();
}
