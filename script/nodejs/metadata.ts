import fs from 'node:fs/promises';
import { existsSync } from 'node:fs';
import { File } from './file';

export class Metadata {
    static async getStats(filePath: string): Promise<{ size: number; created: Date; modified: Date }> {
        const stat = await fs.stat(filePath);
        return {
            size: stat.size,
            created: stat.birthtime,
            modified: stat.mtime,
        };
    }

    static async getFull(filePath: string): Promise<{
        size: number;
        created: Date;
        modified: Date;
        accessed: Date;
        isFile: boolean;
        isDir: boolean;
        mode: number;
        uid?: number;
        gid?: number;
    }> {
        const stat = await fs.stat(filePath);
        return {
            size: stat.size,
            created: stat.birthtime,
            modified: stat.mtime,
            accessed: stat.atime,
            isFile: stat.isFile(),
            isDir: stat.isDirectory(),
            mode: stat.mode,
            uid: stat.uid,
            gid: stat.gid,
        };
    }

    static async getModifiedDate(filePath: string): Promise<Date> {
        const stat = await fs.stat(filePath);
        return stat.mtime;
    }

    static async getCreatedDate(filePath: string): Promise<Date> {
        const stat = await fs.stat(filePath);
        return stat.birthtime;
    }

    static async getAccessedDate(filePath: string): Promise<Date> {
        const stat = await fs.stat(filePath);
        return stat.atime;
    }

    static async getSize(filePath: string): Promise<number> {
        const stat = await fs.stat(filePath);
        return stat.size;
    }

    static async getAge(filePath: string): Promise<number> {
        const stat = await fs.stat(filePath);
        return Date.now() - stat.mtime.getTime();
    }

    static async isNewer(file1: string, file2: string): Promise<boolean> {
        const stat1 = await fs.stat(file1);
        const stat2 = await fs.stat(file2);
        return stat1.mtime > stat2.mtime;
    }

    static async isOlder(file1: string, file2: string): Promise<boolean> {
        const stat1 = await fs.stat(file1);
        const stat2 = await fs.stat(file2);
        return stat1.mtime < stat2.mtime;
    }

    static async touch(filePath: string): Promise<void> {
        if (existsSync(filePath)) {
            const now = new Date();
            await fs.utimes(filePath, now, now);
        } else {
            await File.write(filePath, '');
        }
    }

    static async setModifiedTime(filePath: string, date: Date): Promise<void> {
        await fs.utimes(filePath, date, date);
    }
}
