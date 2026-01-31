import fs from 'node:fs/promises';
import path from 'node:path';
import { existsSync } from 'node:fs';

export class File {
	static async read(
		filePath: string,
		encoding: BufferEncoding = 'utf-8',
	): Promise<string> {
		return await fs.readFile(filePath, { encoding });
	}

	static async write(filePath: string, content: string): Promise<void> {
		await fs.mkdir(path.dirname(filePath), { recursive: true });
		await fs.writeFile(filePath, content);
	}

	static async append(filePath: string, content: string): Promise<void> {
		await fs.mkdir(path.dirname(filePath), { recursive: true });
		await fs.appendFile(filePath, content);
	}

	static async delete(filePath: string): Promise<void> {
		if (existsSync(filePath)) await fs.unlink(filePath);
	}

	static async exists(filePath: string): Promise<boolean> {
		return existsSync(filePath);
	}

	static async readJSON<T>(filePath: string): Promise<T> {
		const content = await this.read(filePath);
		return JSON.parse(content);
	}

	static async writeJSON(
		filePath: string,
		data: unknown,
		pretty = true,
	): Promise<void> {
		const content = pretty
			? JSON.stringify(data, null, 2)
			: JSON.stringify(data);
		await this.write(filePath, content);
	}

	static async compare(file1: string, file2: string): Promise<boolean> {
		try {
			const content1 = await this.read(file1);
			const content2 = await this.read(file2);
			return content1 === content2;
		} catch {
			return false;
		}
	}
}
