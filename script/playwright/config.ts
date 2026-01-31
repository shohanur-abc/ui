// utils/PlaywrightHelper.ts
import { chromium, firefox, webkit, type Browser, type BrowserContext, type Page, type BrowserType } from 'playwright';
import fs from 'node:fs/promises';
import path from 'node:path';

interface PlaywrightConfig {
    browserName?: 'chromium' | 'firefox' | 'webkit';
    executablePath?: string;
    headless?: boolean;
    viewport?: { width: number; height: number };
    timeout?: number;
}

class pw {
    private static instance: pw | null = null;

    private browser: Browser | null = null;
    private context: BrowserContext | null = null;
    private page: Page | null = null;
    private pages: Map<string, Page> = new Map();

    private config: PlaywrightConfig;

    private constructor(config: PlaywrightConfig = {}) {
        this.config = {
            browserName: 'chromium',
            headless: true,
            viewport: { width: 1280, height: 800 },
            timeout: 60000,
            ...config,
        };
    }

    public static getInstance(config?: PlaywrightConfig): pw {
        if (!pw.instance) {
            pw.instance = new pw(config);
        }
        return pw.instance;
    }

    private getBrowserType(): BrowserType {
        const types: Record<string, BrowserType> = { chromium, firefox, webkit };
        const name = this.config.browserName ?? 'chromium';
        return types[name];
    }

    public async launch(): Promise<void> {
        if (this.browser) return;

        const bt = this.getBrowserType();
        this.browser = await bt.launch({
            headless: this.config.headless,
            ...(this.config.executablePath && { executablePath: this.config.executablePath }),
        });

        this.context = await this.browser.newContext({viewport: this.config.viewport,});
    }

    private get p(): Page {
        if (!this.page) throw new Error('Page not initialized');
        return this.page;
    }

    private get ctx(): BrowserContext {
        if (!this.context) throw new Error('Context not created');
        return this.context;
    }

    public async getPage(url?: string, id?: string): Promise<Page> {
        await this.launch();
        if (!this.context) throw new Error('Context not created');

        const pageId = id || 'default';
        let page = this.pages.get(pageId);

        if (!page) {
            page = await this.context.newPage();
            this.pages.set(pageId, page);
        }

        this.page = page; // Always update default reference

        if (url) {
            await page.goto(url, {
                waitUntil: 'networkidle',
                timeout: this.config.timeout,
            });
        }

        return page;
    }

    public switchPage(id: string): Page {
        const page = this.pages.get(id);
        if (!page) throw new Error(`Page "${id}" not found`);
        this.page = page;
        return page;
    }

    public closePage(id?: string): void {
        const pageId = id || 'default';
        const page = this.pages.get(pageId);
        if (page) {
            page.close();
            this.pages.delete(pageId);
        }
    }

    public async screenshot(
        selector: string | null = null,
        options: { id?: string; dir?: string; fullPage?: boolean } = {}
    ): Promise<string> {
        const { id = Date.now().toString(), dir = 'screenshots', fullPage = false } = options;
        await fs.mkdir(dir, { recursive: true });
        const filePath = path.join(dir, `${id}.png`);
        const target = selector ? this.p.locator(selector) : this.p;
        await target.screenshot({ path: filePath, fullPage, type: 'png' });
        console.log(`Screenshot saved → ${filePath}`);
        return filePath;
    }

    public async click(selector: string, opts?: { timeout?: number; force?: boolean }): Promise<void> {
        await this.p.locator(selector).click({ timeout: opts?.timeout, force: opts?.force });
    }

    public async type(selector: string, text: string, opts?: { delay?: number }): Promise<void> {
        await this.p.locator(selector).fill(text, { timeout: opts?.delay });
    }

    public async getText(selector: string): Promise<string | null> {
        return await this.p.locator(selector).textContent();
    }

    public async waitFor(selector: string, timeout = 30000): Promise<void> {
        await this.p.waitForSelector(selector, { timeout });
    }

    public async exists(selector: string): Promise<boolean> {
        return (await this.p.locator(selector).count()) > 0;
    }

    public async evaluate<T>(fn: () => T): Promise<T> {
        return await this.p.evaluate(fn);
    }

    public async scroll(selector: string): Promise<void> {
        await this.p.locator(selector).scrollIntoViewIfNeeded();
    }

    public async getAttribute(selector: string, attr: string): Promise<string | null> {
        return await this.p.locator(selector).getAttribute(attr);
    }

    public async upload(selector: string, filePath: string | string[]): Promise<void> {
        await this.p.locator(selector).setInputFiles(filePath);
    }

    public async pdf(options: { path?: string; format?: 'A4' | 'Letter' } = {}): Promise<Buffer> {
        const { path: filePath, format = 'A4' } = options;
        return await this.p.pdf({ path: filePath, format });
    }

    public async getCookies(): Promise<Array<{ name: string; value: string }>> {
        return await this.ctx.cookies();
    }

    public async setCookies(cookies: Array<{ name: string; value: string; url?: string }>): Promise<void> {
        await this.ctx.addCookies(cookies);
    }

    public async wait(ms: number): Promise<void> {
        await new Promise(resolve => setTimeout(resolve, ms));
    }

    public async selectOption(selector: string, value: string | string[]): Promise<void> {
        await this.p.locator(selector).selectOption(value);
    }

    public async check(selector: string): Promise<void> {
        await this.p.locator(selector).check();
    }

    public async uncheck(selector: string): Promise<void> {
        await this.p.locator(selector).uncheck();
    }

    public async hover(selector: string): Promise<void> {
        await this.p.locator(selector).hover();
    }

    public async press(selector: string, key: string): Promise<void> {
        await this.p.locator(selector).press(key);
    }

    public async reload(): Promise<void> {
        await this.p.reload({ waitUntil: 'networkidle' });
    }

    public async goBack(): Promise<void> {
        await this.p.goBack({ waitUntil: 'networkidle' });
    }

    public async goForward(): Promise<void> {
        await this.p.goForward({ waitUntil: 'networkidle' });
    }

    public async getAll(selector: string): Promise<string[]> {
        return await this.p.locator(selector).allTextContents();
    }

    public async close(): Promise<void> {
        this.pages.forEach(p => p.close());
        this.pages.clear();
        if (this.browser) {
            await this.browser.close();
            this.browser = null;
            this.context = null;
            this.page = null;
        }
    }

    // Static quick method (one-shot)
    public static async quickScreenshot(
        url: string,
        selector: string | null = null,
        options: { id?: string; dir?: string; fullPage?: boolean; config?: PlaywrightConfig } = {}
    ): Promise<string> {
        const helper = pw.getInstance(options.config);
        try {
            await helper.getPage(url);
            return await helper.screenshot(selector, options);
        } finally {
            await helper.close();
        }
    }
}

export default pw;