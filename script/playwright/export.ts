import { type Page } from 'playwright';
import fs from 'node:fs/promises';
import path from 'node:path';

export class Export {
	constructor(private page: Page) {}

	async screenshot(
		selector: string | null = null,
		options: { id?: string; dir?: string; fullPage?: boolean } = {},
	): Promise<string> {
		const {
			id = Date.now().toString(),
			dir = 'screenshots',
			fullPage = false,
		} = options;
		await fs.mkdir(dir, { recursive: true });
		const filePath = path.join(dir, `${id}.png`);

		const target = selector ? this.page.locator(selector) : this.page;
		await target.screenshot({ path: filePath, fullPage, type: 'png' });
		console.log(`Screenshot saved → ${filePath}`);
		return filePath;
	}

	async pdf(
		options: { path?: string; format?: 'A4' | 'Letter' } = {},
	): Promise<Buffer> {
		const { path: filePath, format = 'A4' } = options;
		return await this.page.pdf({ path: filePath, format });
	}

	async html(): Promise<string> {
		return await this.page.content();
	}
}
