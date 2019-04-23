const ngxWallabyJest = require('ngx-wallaby-jest');
const compilerOptions = Object.assign(
  require('./tsconfig.json').compilerOptions,
  require('./src/tsconfig.spec.json').compilerOptions,
);
compilerOptions.module = 'CommonJs';

module.exports = function(wallaby) {
  return {
    files: [
      'src/**/*.+(ts|html|json|snap|sass)',
      'tsconfig.json',
      'src/tsconfig.spec.json',
      'jest.config.js',
      '!src/**/*.spec.ts',
    ],

    tests: ['src/**/*.spec.ts'],

    env: {
      type: 'node',
      runner: 'node',
    },
    compilers: {
      '**/*.ts?(x)': wallaby.compilers.typeScript(compilerOptions),
    },
    preprocessors: {
      'projects/**/*.component.ts': ngxWallabyJest,
    },
    testFramework: 'jest',
    setup: function(wallaby) {
      const jestConfig = require('./jest.config');
      wallaby.testFramework.configure(jestConfig);
    },
  };
};
