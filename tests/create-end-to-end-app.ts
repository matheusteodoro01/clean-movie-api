import { AllExceptionsFilter } from '@/infra/common';
import { AppModule } from '@/main/modules/app.module';
import { Logger } from '@nestjs/common';
import { HttpAdapterHost } from '@nestjs/core';
import { Test, TestingModule } from '@nestjs/testing';

export const createEndToEndApp = async () => {
  const moduleFixture: TestingModule = await Test.createTestingModule({
    imports: [AppModule],
  }).compile();

  const app = moduleFixture.createNestApplication();
  const httpAdapter = app.get(HttpAdapterHost);
  const logger = new Logger();
  app.useGlobalFilters(new AllExceptionsFilter(httpAdapter, logger));
  app.init();
  return { app };
};
