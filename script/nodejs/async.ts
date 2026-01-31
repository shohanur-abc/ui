export class AsyncUtil {
	static async sleep(ms: number): Promise<void> {
		return new Promise((resolve) => setTimeout(resolve, ms));
	}

	static async retry<T>(
		fn: () => Promise<T>,
		maxRetries = 3,
		delayMs = 1000,
	): Promise<T> {
		for (let i = 0; i < maxRetries; i++) {
			try {
				return await fn();
			} catch (e) {
				if (i === maxRetries - 1) throw e;
				await this.sleep(delayMs * Math.pow(2, i));
			}
		}
		throw new Error('Max retries exceeded');
	}

	static async timeout<T>(promise: Promise<T>, ms: number): Promise<T> {
		return Promise.race([
			promise,
			new Promise<T>((_, reject) =>
				setTimeout(() => reject(new Error(`Timeout after ${ms}ms`)), ms),
			),
		]);
	}

	static async all<T>(promises: Promise<T>[]): Promise<T[]> {
		return Promise.all(promises);
	}

	static async race<T>(promises: Promise<T>[]): Promise<T> {
		return Promise.race(promises);
	}
}
