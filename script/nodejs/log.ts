import { DateUtil } from './date';

export class Logger {
	static log(...args: unknown[]): void {
		console.log(`[${DateUtil.now()}]`, ...args);
	}

	static error(...args: unknown[]): void {
		console.error(`[ERROR ${DateUtil.now()}]`, ...args);
	}

	static warn(...args: unknown[]): void {
		console.warn(`[WARN ${DateUtil.now()}]`, ...args);
	}

	static info(...args: unknown[]): void {
		console.info(`[INFO ${DateUtil.now()}]`, ...args);
	}

	static debug(...args: unknown[]): void {
		if (process.env.DEBUG) {
			console.debug(`[DEBUG ${DateUtil.now()}]`, ...args);
		}
	}

	static success(...args: unknown[]): void {
		console.log(`[✓ ${DateUtil.now()}]`, ...args);
	}

	static fail(...args: unknown[]): void {
		console.error(`[✗ ${DateUtil.now()}]`, ...args);
	}
}
