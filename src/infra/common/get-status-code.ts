import { HttpStatus } from '@nestjs/common';
import { NotFoundError } from '@/domain/errors';
import { ZodError } from 'zod';

export const getErrorStatusCode = (error: Error) => {
  switch (error.constructor) {
    case ZodError:
      return HttpStatus.BAD_REQUEST;

    case NotFoundError:
      return HttpStatus.NOT_FOUND;

    default:
      return HttpStatus.INTERNAL_SERVER_ERROR;
  }
};
