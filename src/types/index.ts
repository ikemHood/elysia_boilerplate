import { type Context } from "elysia";

export interface ContextWithJWT extends Context {
  jwt: {
    readonly sign: (
      morePayload: Record<string, string | number>
    ) => Promise<string>;
    readonly verify: (
      jwt?: string | undefined
    ) => Promise<false | Record<string, string | number>>;
  };
}

export interface ContextWithUser extends ContextWithJWT {
  readonly user: {
    id: string;
  };
}

export interface ErrorResponse<Code = string> {
  message: string;
  code: Code;
}

export interface SuccessResponse<Data> {
  message: string;
  data?: Data;
}
