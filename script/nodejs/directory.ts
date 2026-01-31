import fs from 'node:fs/promises';
import path from 'node:path';
import { existsSync } from 'node:fs';

export class Directory {
    static async list(dirPath: string): Promise<string[]> {
        return await fs.readdir(dirPath);
    }

    static async create(dirPath: string): Promise<void> {
        await fs.mkdir(dirPath, { recursive: true });
    }

    static async delete(dirPath: string): Promise<void> {
        if (existsSync(dirPath)) await fs.rm(dirPath, { recursive: true, force: true });
    }

    static async copy(src: string, dest: string): Promise<void> {
        await fs.cp(src, dest, { recursive: true });
    }

    static async isEmpty(dirPath: string): Promise<boolean> {
        const files = await fs.readdir(dirPath);
        return files.length === 0;
    }

    static async isDirectory(filePath: string): Promise<boolean> {
        try {
            const stat = await fs.stat(filePath);
            return stat.isDirectory();
        } catch {
            return false;
        }
    }

    static async getSize(dirPath: string): Promise<number> {
        let size = 0;
        const entries = await fs.readdir(dirPath, { withFileTypes: true });

        for (const entry of entries) {
            const fullPath = path.join(dirPath, entry.name);
            if (entry.isFile()) {
                const stat = await fs.stat(fullPath);
                size += stat.size;
            } else if (entry.isDirectory()) {
                size += await this.getSize(fullPath);
            }
        }
        return size;
    }

    static async rename(oldPath: string, newPath: string): Promise<void> {
        await fs.rename(oldPath, newPath);
    }

    static async renameFiles(dirPath: string, transform: (name: string) => string): Promise<void> {
        const entries = await fs.readdir(dirPath);
        for (const entry of entries) {
            const oldPath = path.join(dirPath, entry);
            const newName = transform(entry);
            const newPath = path.join(dirPath, newName);
            if (oldPath !== newPath) await fs.rename(oldPath, newPath);
        }
    }
}
