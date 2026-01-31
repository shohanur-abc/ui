import {
	chromium,
	firefox,
	webkit,
	type Browser,
	type BrowserContext,
	type Page,
	type BrowserType,
} from 'playwright';
import { PlaywrightConfig, DEFAULT_CONFIG } from './types';

export class BrowserManager {
	private static instance: BrowserManager | null = null;
	private browser: Browser | null = null;
	private context: BrowserContext | null = null;
	private config: PlaywrightConfig;

	private constructor(config: PlaywrightConfig = {}) {
		this.config = { ...DEFAULT_CONFIG, ...config };
	}

	public static getInstance(config?: PlaywrightConfig): BrowserManager {
		if (!BrowserManager.instance) {
			BrowserManager.instance = new BrowserManager(config);
		}
		return BrowserManager.instance;
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
			...(this.config.executablePath && {
				executablePath: this.config.executablePath,
			}),
		});

		this.context = await this.browser.newContext({
			viewport: this.config.viewport,
		});
	}

	public getContext(): BrowserContext {
		if (!this.context)
			throw new Error('Context not created. Call launch() first');
		return this.context;
	}

	public getBrowser(): Browser {
		if (!this.browser)
			throw new Error('Browser not launched. Call launch() first');
		return this.browser;
	}

	public getTimeout(): number {
		return this.config.timeout ?? 60000;
	}

	public async close(): Promise<void> {
		if (this.browser) {
			await this.browser.close();
			this.browser = null;
			this.context = null;
		}
	}
}
