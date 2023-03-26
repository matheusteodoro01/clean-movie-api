import { pathsToModuleNameMapper } from 'ts-jest';
import { compilerOptions } from './tsconfig.json';
import type { Config } from '@jest/types';

const config: Config.InitialOptions = {
  preset: 'ts-jest',
  rootDir: '.',
  clearMocks: true,
  collectCoverage: false,
  silent: true,
  collectCoverageFrom: [
    '<rootDir>/src/**/*.ts',
    '!<rootDir>/src/domain/repositories/index.ts',
    '!<rootDir>/src/infra/dto/**',
    '!<rootDir>/src/infra/common/index.ts',
    '!<rootDir>/src/main/ioc/*',
    '!<rootDir>/src/main/bootstrap.ts',
    '!<rootDir>/src/main/api/handler.ts',
  ],
  globalSetup: './integration.jest.setup.ts',
  transform: {
    '.+\\.ts$': 'ts-jest',
  },
  roots: ['<rootDir>/src/', '<rootDir>/tests/'],
  moduleNameMapper: pathsToModuleNameMapper(compilerOptions.paths, {
    prefix: '<rootDir>/',
  }),
};

export default config;
