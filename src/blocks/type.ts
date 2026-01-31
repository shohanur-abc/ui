export interface IMetadata {
	website: string;
	category: string;
	block: string;
	href: string;
	colSpan: number;
	tags: string[];
	data: IBlock[];
}

export interface IBlock {
	inode: number;
	name: string;
	description: string;
	elements: string[];
	bookmark?: boolean;
}

export interface IMetadataFlat extends Omit<IMetadata, 'data'>, IBlock {
	variant: string;
	createdAt: string;
	updatedAt: string;
	href: string;
}
