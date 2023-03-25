import { ExceptionFilter, Catch, ArgumentsHost, Logger } from '@nestjs/common';
import { HttpAdapterHost } from '@nestjs/core';
import { getErrorStatusCode } from '@/infra/common';

@Catch()
export class AllExceptionsFilter implements ExceptionFilter {
  constructor(
    private readonly httpAdapterHost: HttpAdapterHost,
    private readonly logger: Logger,
  ) {}

  catch(exception: Error, host: ArgumentsHost): void {
    const { httpAdapter } = this.httpAdapterHost;

    const ctx = host.switchToHttp();
    const statusCode = getErrorStatusCode(exception);
    const message =
      exception instanceof Error ? exception.message : 'Erro interno';

    exception instanceof Error
      ? this.logger.error(exception.message, JSON.stringify(exception.stack))
      : this.logger.error(JSON.stringify(exception));

    const responseBody = {
      message,
      statusCode,
    };

    httpAdapter.reply(ctx.getResponse(), responseBody, statusCode);
  }
}
