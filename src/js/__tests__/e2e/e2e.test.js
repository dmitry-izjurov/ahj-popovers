import puppetteer from 'puppeteer';
import { fork } from 'child_process';

jest.setTimeout(30000); // default puppeteer timeout

describe('click form', () => {
  let browser = null;
  let page = null;
  let server = null;
  const baseUrl = 'http://localhost:8080';

  beforeAll(async () => {
    server = fork('./src/e2e.server.js');
    await new Promise((resolve, reject) => {
      server.on('error', reject);
      server.on('message', (message) => {
        if (message === 'ok') {
          resolve();
        }
      });
    });

    browser = await puppetteer.launch({
      // headless: false, // show gui
      // slowMo: 100,
      // devtools: true, // show devTools
    });
    page = await browser.newPage();
  });

  afterAll(async () => {
    await browser.close();
    server.kill();
  });

  describe('Проверка кнопок', () => {
    test('Проверка кнопки 1', async () => {
      await page.goto(baseUrl);
      const button = await page.$('.button');
      await button.click();
      const popopver = await page.evaluate(() => document.querySelector('.popopver').className);
      await expect(popopver).toBe('popopver popopver_top');
    });
  });
});
