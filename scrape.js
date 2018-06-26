const puppeteer = require('puppeteer');

let scrape = async (url, xPath) => {
  const browser = await puppeteer.launch();
  const page = await browser.newPage();
  await page.goto(url);

  const el = await page.waitForXPath(xPath);
  const inner = await el.getProperty('innerText');
  const innerJSON = await inner.jsonValue();

  browser.close();

  return innerJSON;
};

module.exports = scrape;
