import { type Page } from 'playwright';

export class Navigation {
    constructor(private page: Page) {}

    async goto(url: string, options?: { waitUntil?: 'load' | 'domcontentloaded' | 'networkidle'; timeout?: number }): Promise<void> {
        await this.page.goto(url, options);
    }

    async reload(options?: { waitUntil?: 'load' | 'domcontentloaded' | 'networkidle'; timeout?: number }): Promise<void> {
        await this.page.reload(options);
    }

    async back(): Promise<void> {
        await this.page.goBack({ waitUntil: 'networkidle' });
    }

    async forward(): Promise<void> {
        await this.page.goForward({ waitUntil: 'networkidle' });
    }

    async url(): Promise<string> {
        return this.page.url();
    }

    async title(): Promise<string> {
        return await this.page.title();
    }

    async waitForNavigation(action: () => Promise<void>): Promise<void> {
        await Promise.all([this.page.waitForNavigation(), action()]);
    }
}
