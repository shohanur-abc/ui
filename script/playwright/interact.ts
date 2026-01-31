import { type Page } from 'playwright';

export class Interact {
    constructor(private page: Page) {}

    async click(selector: string, opts?: { timeout?: number; force?: boolean }): Promise<void> {
        await this.page.locator(selector).click({ timeout: opts?.timeout, force: opts?.force });
    }

    async type(selector: string, text: string, opts?: { delay?: number }): Promise<void> {
        await this.page.locator(selector).fill(text, { timeout: opts?.delay });
    }

    async selectOption(selector: string, value: string | string[]): Promise<void> {
        await this.page.locator(selector).selectOption(value);
    }

    async check(selector: string): Promise<void> {
        await this.page.locator(selector).check();
    }

    async uncheck(selector: string): Promise<void> {
        await this.page.locator(selector).uncheck();
    }

    async hover(selector: string): Promise<void> {
        await this.page.locator(selector).hover();
    }

    async press(selector: string, key: string): Promise<void> {
        await this.page.locator(selector).press(key);
    }

    async upload(selector: string, filePath: string | string[]): Promise<void> {
        await this.page.locator(selector).setInputFiles(filePath);
    }

    async focus(selector: string): Promise<void> {
        await this.page.locator(selector).focus();
    }

    async blur(selector: string): Promise<void> {
        await this.page.locator(selector).blur();
    }
}
