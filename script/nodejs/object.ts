export class ObjectUtil {
    static deepMerge<T extends Record<string, unknown>>(target: T, source: Partial<T>): T {
        const output = { ...target } as T;
        for (const key in source) {
            const val = source[key as keyof T];
            output[key as keyof T] = val instanceof Object && !Array.isArray(val)
                ? (this.deepMerge((output[key as keyof T] as Record<string, unknown>) || {}, val as Record<string, unknown>) as T[keyof T])
                : (val as T[keyof T]);
        }
        return output;
    }

    static pick<T extends object, K extends keyof T>(obj: T, keys: K[]): Partial<T> {
        return keys.reduce((acc, key) => ({ ...acc, [key]: obj[key] }), {} as Partial<T>);
    }

    static omit<T extends object, K extends keyof T>(obj: T, keys: K[]): Partial<T> {
        const keySet = new Set(keys);
        return Object.entries(obj).reduce((acc, [k, v]) => {
            if (!keySet.has(k as K)) acc[k as keyof T] = v;
            return acc;
        }, {} as Partial<T>);
    }

    static keys<T extends object>(obj: T): (keyof T)[] {
        return Object.keys(obj) as (keyof T)[];
    }

    static values<T extends object>(obj: T): T[keyof T][] {
        return Object.values(obj) as T[keyof T][];
    }

    static entries<T extends object>(obj: T): [keyof T, T[keyof T]][] {
        return Object.entries(obj) as [keyof T, T[keyof T]][];
    }

    static isEmpty<T extends object>(obj: T): boolean {
        return Object.keys(obj).length === 0;
    }
}
