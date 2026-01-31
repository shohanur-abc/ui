export class ArrayUtil {
	static chunk<T>(arr: T[], size: number): T[][] {
		return Array.from({ length: Math.ceil(arr.length / size) }, (_, i) =>
			arr.slice(i * size, i * size + size),
		);
	}

	static unique<T>(arr: T[]): T[] {
		return [...new Set(arr)];
	}

	static flatten<T>(arr: (T | T[])[]): T[] {
		return arr.flat(Infinity) as T[];
	}

	static shuffle<T>(arr: T[]): T[] {
		const copy = [...arr];
		for (let i = copy.length - 1; i > 0; i--) {
			const j = Math.floor(Math.random() * (i + 1));
			[copy[i], copy[j]] = [copy[j], copy[i]];
		}
		return copy;
	}

	static compact<T>(arr: (T | null | undefined)[]): T[] {
		return arr.filter((item): item is T => item != null);
	}

	static reverse<T>(arr: T[]): T[] {
		return [...arr].reverse();
	}

	static last<T>(arr: T[]): T | undefined {
		return arr[arr.length - 1];
	}

	static first<T>(arr: T[]): T | undefined {
		return arr[0];
	}

	static sum(arr: number[]): number {
		return arr.reduce((a, b) => a + b, 0);
	}
}
