const { Builder, By, Key, until, Capabilities } = require("selenium-webdriver");
const assert = require("assert");

describe("BStack demo test Module C", () => {
  let driver;

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

  test(
    "flaky test - add products to cart",
    async () => {
        let elementLocator = Math.random() < 0.5 ? '//*[@id="1"]/p' : '//*[@id="random"]/p';

        // locating product on webpage and getting name of the product
        await driver.wait(until.elementLocated(By.xpath(elementLocator)));
        let productText = await driver
          .findElement(By.xpath('//*[@id="1"]/p'))
          .getText();
        // clicking the 'Add to cart' button
        await driver.findElement(By.xpath('//*[@id="1"]/div[4]')).click();
        // waiting until the Cart pane has been displayed on the webpage
        await driver.wait(until.elementLocated(By.className("float-cart__content")));
        await driver.findElement(By.className("float-cart__content"));
        // locating product in cart and getting name of the product in cart
        let productCartText = await driver
          .findElement(
            By.xpath(
              '//*[@id="__next"]/div/div/div[2]/div[2]/div[2]/div/div[3]/p[1]'
            )
          )
          .getText();
        // checking whether product has been added to cart by comparing product name
        expect(productText).toBe(productCartText);
    },
    10000
  );

  test("always failing test - missing element 1", async () => {
    await driver.wait(until.elementLocated(By.xpath('//*[@id="non-existent-1"]/p')));
  }, 2000);

  test("always failing test - same stacktrace 1", async () => {
    await driver.wait(until.elementLocated(By.xpath('//*[@id="common-error"]/p')));
  }, 2000);

  test("always failing test - same stacktrace 2", async () => {
    await driver.wait(until.elementLocated(By.xpath('//*[@id="common-error"]/p')));
  }, 2000);

  test("always passing test - example F", async () => {
    assert(true);
  }, 10000);

  test("always passing test - example G", async () => {
    assert(true);
  }, 10000);

  test("always passing test - example H", async () => {
    assert(true);
  }, 10000);

  test("always passing test - example I", async () => {
    assert(true);
  }, 10000);

  test("always passing test - verify page title", async () => {
    await driver.get("https://bstackdemo.com");
    await driver.wait(until.titleMatches(/StackDemo/i), 10000);
  }, 10000);

  test("Test with framework-level retry - 2 retries configured", async () => {
    jest.retryTimes(2);
    const randomOutcome = Math.random() > 0.7; // 30% chance of passing
    if (!randomOutcome) {
      throw new Error("Test failed, retrying...");
    }
  });

  test("Another Test with framework-level retry - 2 retries configured", async () => {
    jest.retryTimes(2);
    const randomOutcome = Math.random() > 0.7; // 30% chance of passing
    if (!randomOutcome) {
      throw new Error("Test failed, retrying...");
    }
  });
});
