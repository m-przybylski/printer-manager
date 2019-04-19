const esModules = ['@angular/common'].join('|');

module.exports = {
  rootDir: '.',
  preset: 'jest-preset-angular',
  globals: {
    'ts-jest': {
      allowSyntheticDefaultImports: true,
      tsConfig: '<rootDir>/src/tsconfig.spec.json',
      diagnostics: true,
    },
  },
  testMatch: ['<rootDir>/src/app/**/*.spec.ts'],
  transformIgnorePatterns: [`/node_modules/(?!${esModules})`],
};
