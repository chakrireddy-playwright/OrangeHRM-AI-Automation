import { test, expect } from '@playwright/test';
import { LoginPage } from '../src/pages/LoginPage';
import { DashboardPage } from '../src/pages/DashboardPage';
import { ENV } from '../src/utils/env';

const INVALID_USERNAME = 'invalid.user';
const INVALID_PASSWORD = 'wrongPassword123!';
const LONG_USERNAME = 'A'.repeat(150);
const LONG_PASSWORD = 'P'.repeat(150);

test.describe('OrangeHRM login page', () => {
  test.beforeEach(async ({ page }) => {
    const loginPage = new LoginPage(page);
    await loginPage.navigate(ENV.BASE_URL);
  });

  test('displays login form controls', async ({ page }) => {
    const usernameField = page.locator('[name="username"]');
    const passwordField = page.locator('[name="password"]');
    const submitButton = page.locator('button[type="submit"]');

    await expect(usernameField).toBeVisible();
    await expect(passwordField).toBeVisible();
    await expect(submitButton).toBeVisible();
    await expect(usernameField).toHaveAttribute('name', 'username');
    await expect(passwordField).toHaveAttribute('name', 'password');
  });

  test('logs in successfully with valid credentials', async ({ page }) => {
    const loginPage = new LoginPage(page);
    const dashboardPage = new DashboardPage(page);

    await loginPage.login(ENV.USERNAME, ENV.PASSWORD);
    await dashboardPage.verifyDashboard();
  });

  test('shows required validation when both username and password are empty', async ({ page }) => {
    const loginPage = new LoginPage(page);

    await loginPage.login('', '');
    await loginPage.expectFieldError('username', /Required/);
    await loginPage.expectFieldError('password', /Required/);
  });

  test('shows required validation when username is empty', async ({ page }) => {
    const loginPage = new LoginPage(page);

    await loginPage.login('', ENV.PASSWORD);
    await loginPage.expectFieldError('username', /Required/);
  });

  test('shows required validation when password is empty', async ({ page }) => {
    const loginPage = new LoginPage(page);

    await loginPage.login(ENV.USERNAME, '');
    await loginPage.expectFieldError('password', /Required/);
  });

  test('shows invalid credentials when username is incorrect', async ({ page }) => {
    const loginPage = new LoginPage(page);

    await loginPage.login(INVALID_USERNAME, ENV.PASSWORD);
    await loginPage.expectLoginError(/Invalid credentials|Invalid username or password/i);
  });

  test('shows invalid credentials when password is incorrect', async ({ page }) => {
    const loginPage = new LoginPage(page);

    await loginPage.login(ENV.USERNAME, INVALID_PASSWORD);
    await loginPage.expectLoginError(/Invalid credentials|Invalid username or password/i);
  });

  test('shows invalid credentials when both username and password are incorrect', async ({ page }) => {
    const loginPage = new LoginPage(page);

    await loginPage.login(INVALID_USERNAME, INVALID_PASSWORD);
    await loginPage.expectLoginError(/Invalid credentials|Invalid username or password/i);
  });

  test('shows invalid credentials for very long username boundary input', async ({ page }) => {
    const loginPage = new LoginPage(page);

    await loginPage.login(LONG_USERNAME, ENV.PASSWORD);
    await loginPage.expectLoginError(/Invalid credentials|Invalid username or password/i);
  });

  test('shows invalid credentials for very long password boundary input', async ({ page }) => {
    const loginPage = new LoginPage(page);

    await loginPage.login(ENV.USERNAME, LONG_PASSWORD);
    await loginPage.expectLoginError(/Invalid credentials|Invalid username or password/i);
  });
});
