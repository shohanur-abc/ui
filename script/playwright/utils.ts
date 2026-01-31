import { type Page } from 'playwright';

export class Utils {
    constructor(private page: Page) {}

    async wait(ms: number): Promise<void> {
        return new Promise(resolve => setTimeout(resolve, ms));
    }

    async waitForFunction(fn: () => boolean, timeout = 30000): Promise<void> {
        const start = Date.now();
        while (Date.now() - start < timeout) {
            if (fn()) return;
            await this.wait(100);
        }
        throw new Error(`Timeout waiting for function after ${timeout}ms`);
    }

    async waitForElement(selector: string, timeout = 30000): Promise<void> {
        await this.page.waitForSelector(selector, { timeout });
    }

    async waitForNavigation(action: () => Promise<void>, timeout = 30000): Promise<void> {
        await Promise.all([
            this.page.waitForNavigation({ waitUntil: 'networkidle', timeout }),
            action(),
        ]);
    }

    getPage(): Page {
        return this.page;
    }
}
