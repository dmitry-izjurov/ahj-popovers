import puppetteer from 'puppeteer';
import { fork } from 'child_process';

jest.setTimeout(30000); // default puppeteer timeout

describe('Credit Card Validator form', () => {
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

  describe('Проверка карт', () => {
    test('Проверка карты Visa', async () => {
      await page.goto(baseUrl);
      const form = await page.$('.form');
      const input = await form.$('.field');
      await input.type('4233444334343444');
      const submit = await form.$('.form__button');
      await submit.click();
      const visa = await page.evaluate(() => document.getElementById('visa').closest('.item').className);
      await expect(visa).toBe('item');
    });

    test('Проверка карты Mastercard', async () => {
      await page.goto(baseUrl);
      const form = await page.$('.form');
      const input = await form.$('.field');
      await input.type('5112345454553889');
      const submit = await form.$('.form__button');
      await submit.click();
      const mastercard = await page.evaluate(() => document.getElementById('mastercard').closest('.item').className);
      await expect(mastercard).toBe('item');
    });

    test('Проверка карты Maestro', async () => {
      await page.goto(baseUrl);
      const form = await page.$('.form');
      const input = await form.$('.field');
      await input.type('6304544490871230');
      const submit = await form.$('.form__button');
      await submit.click();
      const maestro = await page.evaluate(() => document.getElementById('maestro').closest('.item').className);
      await expect(maestro).toBe('item');
    });

    test('Проверка карты Mir', async () => {
      await page.goto(baseUrl);
      const form = await page.$('.form');
      const input = await form.$('.field');
      await input.type('2202433377887777');
      const submit = await form.$('.form__button');
      await submit.click();
      const mir = await page.evaluate(() => document.getElementById('mir').closest('.item').className);
      await expect(mir).toBe('item');
    });
  });
});
