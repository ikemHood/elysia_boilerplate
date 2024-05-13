import { StatusCodes } from 'http-status-codes';

export class ConflictError extends Error {
  public status: number;

  constructor(public message: string) {
    super(message);

    this.status = StatusCodes.CONFLICT;
  }
}

export class MongoServerError extends Error {
  public code: number;

  constructor(message: string, code: number) {
    super(message);
    this.name = 'MongoServerError';
    this.code = code;
  }
}

export class UnauthorizedError extends Error {
  public status: number;

  constructor(public message: string) {
    super(message);

    this.status = StatusCodes.UNAUTHORIZED;
  }
}
