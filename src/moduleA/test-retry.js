const { Builder, By, Key, until, Capabilities } = require("selenium-webdriver");
const assert = require("assert");

describe("BStack demo test Module A", () => {
  let driver;
  jest.retryTimes(2, {retryImmediately: true});

  beforeAll(async () => {
    driver = new Builder()
      .usingServer(`http://localhost:4444/wd/hub`)
      .withCapabilities(Capabilities.chrome())
      .build();

    await driver.get("https://bstackdemo.com");
    await driver.wait(until.titleMatches(/StackDemo/i), 10000);
  });
  
  afterAll(async () => {
    await driver.quit();
  })

  test("Test with framework-level retry - 2 retries configured", async () => {
    const randomOutcome = Math.random() > 0.7; // 30% chance of passing
    assert(randomOutcome);
  });

  test("Another Test with framework-level retry - 2 retries configured", async () => {
    const randomOutcome = Math.random() > 0.7; // 30% chance of passing
    assert(randomOutcome);
  });
});
