module.exports = {
  preset: 'ts-jest',
  testEnvironment: 'node',
  collectCoverage: true,
  collectCoverageFrom: [
    'src/services/**/*.ts',
    'src/validators/**/*.ts'
  ],
  coverageDirectory: 'coverage',
  coverageThreshold: {
    global: {
      branches: 60,
      functions: 60,
      lines: 65,
      statements: 65
    }
  },
  moduleFileExtensions: ['ts','js','json'],
  testMatch: ['**/tests/unit/**/*.spec.ts']
};
