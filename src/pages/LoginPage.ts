import { Page, expect } from '@playwright/test';

export class LoginPage {

    constructor(private page: Page) {}

    async navigate(url:string){
        await this.page.goto(url);
    }

    async login(username:string,password:string){
        await this.page.locator('[name="username"]').fill(username);
        await this.page.locator('[name="password"]').fill(password);
        await this.page.locator('button[type="submit"]').click();
    }

    async expectFieldError(fieldName:string, expected: string | RegExp){
        const fieldError = this.page.locator(`xpath=//input[@name="${fieldName}"]/ancestor::div[contains(@class,"oxd-input-group")]//span[contains(@class,"oxd-input-field-error-message")]`);
        await expect(fieldError).toBeVisible();
        await expect(fieldError).toHaveText(expected);
    }

    async expectLoginError(expected: string | RegExp){
        const loginError = this.page.locator('.oxd-alert-content-text');
        await expect(loginError).toBeVisible();
        await expect(loginError).toHaveText(expected);
    }
}