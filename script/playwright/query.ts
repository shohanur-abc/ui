import { type Page } from 'playwright';

export class Query {
    constructor(private page: Page) {}

    async getText(selector: string): Promise<string | null> {
        return await this.page.locator(selector).textContent();
    }

    async getAll(selector: string): Promise<string[]> {
        return await this.page.locator(selector).allTextContents();
    }

    async getAttribute(selector: string, attr: string): Promise<string | null> {
        return await this.page.locator(selector).getAttribute(attr);
    }

    async exists(selector: string): Promise<boolean> {
        return (await this.page.locator(selector).count()) > 0;
    }

    async isVisible(selector: string): Promise<boolean> {
        return await this.page.locator(selector).isVisible();
    }

    async isEnabled(selector: string): Promise<boolean> {
        return await this.page.locator(selector).isEnabled();
    }

    async isChecked(selector: string): Promise<boolean> {
        return await this.page.locator(selector).isChecked();
    }

    async getCount(selector: string): Promise<number> {
        return await this.page.locator(selector).count();
    }

    async waitFor(selector: string, timeout = 30000): Promise<void> {
        await this.page.waitForSelector(selector, { timeout });
    }

    async scroll(selector: string): Promise<void> {
        await this.page.locator(selector).scrollIntoViewIfNeeded();
    }

    async evaluate<T>(fn: () => T): Promise<T> {
        return await this.page.evaluate(fn);
    }
}
