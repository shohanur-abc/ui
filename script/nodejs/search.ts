import fs from 'node:fs/promises';
import path from 'node:path';
import { existsSync } from 'node:fs';
import { globSync } from 'glob';
import { File } from './file';

export class Search {
	static glob(pattern: string, options?: { cwd?: string }): string[] {
		return globSync(pattern, options);
	}

	static getFilesByExtension(
		dirPath: string,
		ext: string,
		recursive = true,
	): string[] {
		const pattern = recursive
			? `${dirPath}/**/*.${ext}`
			: `${dirPath}/*.${ext}`;
		return this.glob(pattern).map((f) => Search.normalizePath(f));
	}

	static getAllFiles(dirPath: string, recursive = true): string[] {
		const pattern = recursive ? `${dirPath}/**/*` : `${dirPath}/*`;
		return this.glob(pattern)
			.filter((f) => !existsSync(f) || !fs.stat(f))
			.map((f) => Search.normalizePath(f));
	}

	static async findFiles(
		dirPath: string,
		predicate: (name: string) => boolean,
	): Promise<string[]> {
		const files = this.glob(`${dirPath}/**/*`);
		return files.filter((f) => predicate(path.basename(f)));
	}

	static async findDirs(dirPath: string): Promise<string[]> {
		const pattern = `${dirPath}/**/`;
		return this.glob(pattern).map((f) => Search.normalizePath(f));
	}

	static async searchInFiles(
		dirPath: string,
		pattern: RegExp | string,
		ext?: string,
	): Promise<{ file: string; matches: number }[]> {
		const regex =
			typeof pattern === 'string' ? new RegExp(pattern, 'g') : pattern;
		const files = ext
			? this.getFilesByExtension(dirPath, ext)
			: this.glob(`${dirPath}/**/*`);
		const results: { file: string; matches: number }[] = [];

		for (const file of files) {
			try {
				if (!existsSync(file)) continue;
				const content = await File.read(file);
				const matches = (content.match(regex) || []).length;
				if (matches > 0) results.push({ file, matches });
			} catch {
				continue;
			}
		}
		return results;
	}

	static async getModifiedSince(
		dirPath: string,
		date: Date,
	): Promise<string[]> {
		const files = this.glob(`${dirPath}/**/*`);
		const result: string[] = [];

		for (const file of files) {
			try {
				const stat = await fs.stat(file);
				if (stat.mtime > date) result.push(file);
			} catch {
				continue;
			}
		}
		return result;
	}

	static async getModifiedBefore(
		dirPath: string,
		date: Date,
	): Promise<string[]> {
		const files = this.glob(`${dirPath}/**/*`);
		const result: string[] = [];

		for (const file of files) {
			try {
				const stat = await fs.stat(file);
				if (stat.mtime < date) result.push(file);
			} catch {
				continue;
			}
		}
		return result;
	}

	private static normalizePath(filePath: string): string {
		return path.normalize(filePath).replace(/\\/g, '/');
	}
}
