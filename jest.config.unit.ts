import { pathsToModuleNameMapper } from 'ts-jest'
import { compilerOptions } from './tsconfig.json'
import type { JestConfigWithTsJest } from 'ts-jest'

export default {
  preset: 'ts-jest',
  testEnvironment: 'node',
  testMatch: ['**/src/**/*.spec.(ts|js)'],
  moduleFileExtensions: ['js', 'ts'],
  transform: {
    "\\.ts$": [
    'ts-jest', {
      tsconfig: 'tsconfig.test.json'
    }
  ]},
  roots: ['<rootDir>'],
  modulePaths: [compilerOptions.baseUrl],
  moduleNameMapper: pathsToModuleNameMapper(compilerOptions.paths),
} as JestConfigWithTsJest;
