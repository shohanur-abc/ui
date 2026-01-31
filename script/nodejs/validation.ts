export class Validation {
    static isEmail(email: string): boolean {
        return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
    }

    static isUrl(url: string): boolean {
        try {
            new URL(url);
            return true;
        } catch {
            return false;
        }
    }

    static isJSON(str: string): boolean {
        try {
            JSON.parse(str);
            return true;
        } catch {
            return false;
        }
    }

    static isNumber(val: unknown): boolean {
        return typeof val === 'number' || !isNaN(Number(val));
    }

    static isString(val: unknown): boolean {
        return typeof val === 'string';
    }

    static isArray(val: unknown): boolean {
        return Array.isArray(val);
    }

    static isObject(val: unknown): boolean {
        return val !== null && typeof val === 'object' && !Array.isArray(val);
    }

    static isPhoneNumber(phone: string): boolean {
        return /^[+]?[(]?[0-9]{3}[)]?[-\s.]?[0-9]{3}[-\s.]?[0-9]{4,6}$/.test(phone);
    }
}
