
/** @type {import('ts-jest/dist/types').InitialOptionsTsJest} */
module.exports = {
  preset: 'ts-jest',
  testEnvironment: 'node',
  transform: {
    "^.+\\.(ts|tsx)$": "ts-jest"
  },
  moduleNameMapper: {
    '^@chargers/(.*)$':  '<rootDir>/src/context/chargers/$1',
    '^@widgets/(.*)$':  '<rootDir>/src/context/widgets/$1',
    '^@shared/(.*)$':  '<rootDir>/src/context/shared/$1',
  }
};