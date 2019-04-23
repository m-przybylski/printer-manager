const esModules = ['@angular/common'].join('|');

module.exports = {
  rootDir: '.',
  preset: 'jest-preset-angular',
  setupFilesAfterEnv: ['<rootDir>/src/test.ts'],
  testMatch: ['<rootDir>/src/app/**/*.spec.ts'],
  transformIgnorePatterns: [`/node_modules/(?!${esModules})`],
};
