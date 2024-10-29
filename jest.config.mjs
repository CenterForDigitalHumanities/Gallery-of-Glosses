/** @type {import('ts-jest').JestConfigWithTsJest} **/
const jestConfig= {
  testEnvironment: "node",
  transform: {
    "^.+.(t|j)sx?$": ["ts-jest", {}],
  },
  preset: "ts-jest",
  moduleNameMapper: {
    "^@/(.*)$": "<rootDir>/src/$1",
  },
};

export default jestConfig
