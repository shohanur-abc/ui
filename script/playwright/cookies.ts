import { type BrowserContext, type Page } from 'playwright';

export class Cookies {
    constructor(private context: BrowserContext, private page: Page) {}

    async get(): Promise<Array<{ name: string; value: string }>> {
        return await this.context.cookies();
    }

    async set(cookies: Array<{ name: string; value: string; url?: string }>): Promise<void> {
        await this.context.addCookies(cookies);
    }

    async clear(): Promise<void> {
        await this.context.clearCookies();
    }

    async delete(name: string): Promise<void> {
        const cookies = await this.get();
        const filtered = cookies.filter(c => c.name !== name);
        await this.clear();
        await this.set(filtered);
    }

    async getByName(name: string): Promise<string | null> {
        const cookies = await this.get();
        return cookies.find(c => c.name === name)?.value ?? null;
    }
}
