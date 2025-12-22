module.exports = {
  coverageProvider: "v8",
  maxWorkers: 5,
  roots: ["src"],
  testMatch: ["**/test.js"],
  testPathIgnorePatterns: ["/node_modules/"],
  testTimeout: 30 * 1000,
};
