module.exports = {
  preset: '../../jest.preset.js',
  coverageDirectory: '../../coverage/apps/pmp-api-e2e',
  testEnvironment: 'node',
  globals: { 'ts-jest': { tsConfig: '<rootDir>/tsconfig.spec.json' } },
  displayName: 'pmp-api-e2e'
};
