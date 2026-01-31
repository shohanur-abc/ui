import { readFile } from "node:fs/promises";
import { IMetadataFlat } from "./type";

const registry: IMetadataFlat[] = JSON.parse(
    await readFile("src/blocks/registry.json", "utf-8")
);

export class Blocks extends Array<IMetadataFlat> {
    constructor(...items: IMetadataFlat[]) {
        super(...(items.length === 0 ? registry : items));
    }

    get [Symbol.species]() {
        return Blocks;
    }

    website(website: string) {
        return this.filter(b => b.website === website) as this;
    }

    block(blockName: string) {
        return this.filter(b => b.block === blockName) as this;
    }

    variant(variant: string) {
        return this.filter(b => b.variant === variant) as this;
    }

    elements(items: string[]) {
        return this.filter(b => items.every(item => b.elements.includes(item))) as this;
    }

    tag(tag: string) {
        return this.filter(b => b.tags.includes(tag)) as this;
    }

    dateRange(
        from: string,
        to: string = new Date().toISOString().slice(0, 10)
    ) {
        const start = new Date(from)
        const end = new Date(to)
        end.setHours(23, 59, 59, 999)

        return this.filter(b => {
            const createdAt = new Date(b.createdAt)
            return createdAt >= start && createdAt <= end
        }) as this
    }

    sortByDate(order: 'asc' | 'desc' = 'desc') {
        return this.sort((a, b) => {
            const dateA = new Date(a.createdAt).getTime()
            const dateB = new Date(b.createdAt).getTime()
            return order === 'desc' ? dateB - dateA : dateA - dateB
        }) as this
    }

    lazy(params: Partial<IMetadataFlat>) {
        const paramsEntries = Object.entries(params).filter(([, value]) => value !== undefined && value !== null);
        return this.filter(block => {
            for (const [key, value] of paramsEntries) {
                const blockValue = block[key as keyof IMetadataFlat];
                if (typeof value === 'string' && blockValue !== value) return false;
                if (Array.isArray(value) && !value.every(v => (blockValue as string[]).includes(v))) return false;
            } return true;
        }) as this;
    }
}

export const blocks = new Blocks();
// const ownProp = new Set(Object.getOwnPropertyNames(Blocks.prototype));
// ["constructor"].forEach(m => ownProp.delete(m));

// const counter = ((count = 0, cycle = 1) => () => ++count % 13 === 0 ? `cycle ${cycle++}` : count)();
// export const blocks = new Proxy(new Blocks(), {
//     get(target, prop: string) {
//         if (ownProp.has(prop)){
//             console.warn(prop)
//             console.log(`${counter()} => ${prop}`);
//         }

//         return target[prop as keyof Blocks];
//     }
// });