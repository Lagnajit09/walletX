/** @type {import("eslint").Linter.Config} */
module.exports = {
  root: true,
  extends: ["@lm.swiftpay/eslint-config/next.js"],
  parser: "@typescript-eslint/parser",
  parserOptions: {
    project: true,
  },
  rules: {
    "turbo/no-undeclared-env-vars": "off",
  },
};
