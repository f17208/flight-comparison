import dotenv from 'dotenv';
import { test, expect } from '@playwright/test';

dotenv.config();

const APP_URL = `http://localhost:${process.env.PORT}`;

test('TODO test', async ({ page }) => {
  await page.goto(APP_URL);

  expect(true).toBe(true);
});
