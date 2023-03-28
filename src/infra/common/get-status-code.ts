import { ZodError } from 'zod';
import { HttpStatus } from '@nestjs/common';
import { NotFoundError } from '@/domain/errors';

export const getErrorStatusCode = (error: unknown): HttpStatus => {
  if (!(error instanceof Error)) {
    return HttpStatus.INTERNAL_SERVER_ERROR;
  }

  switch (error.constructor) {
    case NotFoundError:
      return HttpStatus.NOT_FOUND;
    case ZodError:
      return HttpStatus.BAD_REQUEST;
    default:
      return HttpStatus.INTERNAL_SERVER_ERROR;
  }
};
