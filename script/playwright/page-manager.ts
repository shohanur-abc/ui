import { type Page } from 'playwright';
import { BrowserManager } from './browser';

export class PageManager {
	private pages: Map<string, Page> = new Map();
	private currentPage: Page | null = null;
	private browserManager: BrowserManager;

	constructor(browserManager: BrowserManager) {
		this.browserManager = browserManager;
	}

	async getPage(url?: string, id?: string): Promise<Page> {
		await this.browserManager.launch();
		const context = this.browserManager.getContext();
		const pageId = id || 'default';

		let page = this.pages.get(pageId);

		if (!page) {
			page = await context.newPage();
			this.pages.set(pageId, page);
		}

		this.currentPage = page;

		if (url) {
			const timeout = this.browserManager.getTimeout();
			await page.goto(url, { waitUntil: 'networkidle', timeout });
		}

		return page;
	}

	getOrCreateCurrent(): Page {
		if (!this.currentPage)
			throw new Error('No page initialized. Call getPage() first');
		return this.currentPage;
	}

	switchPage(id: string): Page {
		const page = this.pages.get(id);
		if (!page) throw new Error(`Page "${id}" not found`);
		this.currentPage = page;
		return page;
	}

	closePage(id?: string): void {
		const pageId = id || 'default';
		const page = this.pages.get(pageId);
		if (page) {
			page.close();
			this.pages.delete(pageId);
			if (this.currentPage === page) this.currentPage = null;
		}
	}

	async closeAll(): Promise<void> {
		for (const page of this.pages.values()) {
			await page.close();
		}
		this.pages.clear();
		this.currentPage = null;
	}

	getPageCount(): number {
		return this.pages.size;
	}
}
