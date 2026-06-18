import { test } from '@playwright/test';
import { LoginPage } from '../src/pages/LoginPage';
import { ENV } from '../src/utils/env';

const INVALID_USERNAME = 'invalid.user';
const INVALID_PASSWORD = 'wrongPassword123!';

test.describe('OrangeHRM negative login scenarios', () => {
  test.beforeEach(async ({ page }) => {
    const loginPage = new LoginPage(page);
    await loginPage.navigate(ENV.BASE_URL);
  });

  test('login fails when username is empty', async ({ page }) => {
    const loginPage = new LoginPage(page);

    await loginPage.login('', ENV.PASSWORD);
    await loginPage.expectFieldError('username', /Required/);
  });

  test('login fails when password is empty', async ({ page }) => {
    const loginPage = new LoginPage(page);

    await loginPage.login(ENV.USERNAME, '');
    await loginPage.expectFieldError('password', /Required/);
  });

  test('login fails with invalid username and valid password', async ({ page }) => {
    const loginPage = new LoginPage(page);

    await loginPage.login(INVALID_USERNAME, ENV.PASSWORD);
    await loginPage.expectLoginError(/Invalid credentials|Invalid username or password/i);
  });

  test('login fails with valid username and invalid password', async ({ page }) => {
    const loginPage = new LoginPage(page);

    await loginPage.login(ENV.USERNAME, INVALID_PASSWORD);
    await loginPage.expectLoginError(/Invalid credentials|Invalid username or password/i);
  });

  test('login fails with invalid username and invalid password', async ({ page }) => {
    const loginPage = new LoginPage(page);

    await loginPage.login(INVALID_USERNAME, INVALID_PASSWORD);
    await loginPage.expectLoginError(/Invalid credentials|Invalid username or password/i);
  });
});