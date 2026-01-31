import path from 'node:path';

export class PathUtil {
	static normalize(filePath: string): string {
		return path.normalize(filePath).replace(/\\/g, '/');
	}

	static getFileName(filePath: string): string {
		return path.basename(filePath);
	}

	static getExtension(filePath: string): string {
		return path.extname(filePath);
	}

	static join(...segments: string[]): string {
		return this.normalize(path.join(...segments));
	}

	static resolve(...segments: string[]): string {
		return this.normalize(path.resolve(...segments));
	}

	static dirname(filePath: string): string {
		return this.normalize(path.dirname(filePath));
	}

	static basename(filePath: string, ext?: string): string {
		return path.basename(filePath, ext);
	}

	static isAbsolute(filePath: string): boolean {
		return path.isAbsolute(filePath);
	}

	static relative(from: string, to: string): string {
		return this.normalize(path.relative(from, to));
	}
}
