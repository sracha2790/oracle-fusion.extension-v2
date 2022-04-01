// For a detailed explanation regarding each configuration property, visit:
// https://jestjs.io/docs/en/configuration.html

module.exports = {
  clearMocks: true,
  coverageDirectory: "coverage",
  moduleFileExtensions: [
    "js",
    "ts",
  ],
  rootDir: ".",
  testEnvironment: "node",
  testRegex: ".test.ts$",
  transform: {
    "^.+\\.(t|j)s$": "ts-jest"
  },
};
