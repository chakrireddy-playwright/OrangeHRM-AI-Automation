import { Page } from '@playwright/test';

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
}