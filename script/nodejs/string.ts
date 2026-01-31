export class StringUtil {
    static capitalize(str: string): string {
        return str.charAt(0).toUpperCase() + str.slice(1);
    }

    static toPascalCase(str: string): string {
        return str.split(/[-_\s]/).map(s => this.capitalize(s)).join('');
    }

    static toKebabCase(str: string): string {
        return str.replace(/([a-z])([A-Z])/g, '$1-$2').toLowerCase();
    }

    static toSnakeCase(str: string): string {
        return str.replace(/([a-z])([A-Z])/g, '$1_$2').toLowerCase();
    }

    static toCamelCase(str: string): string {
        return str.replace(/[-_\s](.)/g, (_, c) => c.toUpperCase());
    }

    static trim(str: string): string {
        return str.trim();
    }

    static reverse(str: string): string {
        return str.split('').reverse().join('');
    }

    static padLeft(str: string, length: number, char = ' '): string {
        return char.repeat(Math.max(0, length - str.length)) + str;
    }

    static padRight(str: string, length: number, char = ' '): string {
        return str + char.repeat(Math.max(0, length - str.length));
    }
}
