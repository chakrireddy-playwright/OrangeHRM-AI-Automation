import { test } from '@playwright/test';
import { LoginPage } from '../pages/LoginPage.ts';
import { DashboardPage } from '../pages/DashboardPage';
import { ENV } from '../utils/env';

test('OrangeHRM Login', async ({ page }) => {

    const loginPage = new LoginPage(page);
    const dashboardPage = new DashboardPage(page);

    await loginPage.navigate(ENV.BASE_URL);

    await loginPage.login(
        ENV.USERNAME,
        ENV.PASSWORD
    );

    await dashboardPage.verifyDashboard();
});
