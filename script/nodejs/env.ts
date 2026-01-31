export class EnvUtil {
    static get(key: string, defaultValue?: string): string {
        return process.env[key] ?? defaultValue ?? '';
    }

    static getNumber(key: string, defaultValue = 0): number {
        return Number(process.env[key] ?? defaultValue);
    }

    static getBoolean(key: string, defaultValue = false): boolean {
        const val = process.env[key];
        return val ? val.toLowerCase() === 'true' : defaultValue;
    }

    static isDev(): boolean {
        return process.env.NODE_ENV === 'development';
    }

    static isProd(): boolean {
        return process.env.NODE_ENV === 'production';
    }

    static isTest(): boolean {
        return process.env.NODE_ENV === 'test';
    }

    static set(key: string, value: string): void {
        process.env[key] = value;
    }

    static getAll(): NodeJS.ProcessEnv {
        return process.env;
    }
}
