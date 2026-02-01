'use client';

import * as React from 'react';
import {
	MoreHorizontal,
	Search,
	LayoutGrid,
	List,
	SortAsc,
	Package,
	ImageIcon,
	Tag,
	Layers,
} from 'lucide-react';

import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Checkbox } from '@/components/ui/checkbox';
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuItem,
	DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Input } from '@/components/ui/input';
import {
	Table,
	TableBody,
	TableCell,
	TableHead,
	TableHeader,
	TableRow,
} from '@/components/ui/table';
import { Separator } from '@/components/ui/separator';

interface ProductVariant {
	id: string;
	name: string;
	sku: string;
	price: number;
	stock: number;
}

interface Product {
	id: string;
	name: string;
	sku: string;
	images: string[];
	basePrice: number;
	totalStock: number;
	variants: ProductVariant[];
	tags: string[];
	collections: string[];
}

interface ToolbarProps {
	searchPlaceholder: string;
	viewMode: 'list' | 'grid';
	onViewChange: (mode: 'list' | 'grid') => void;
	sortLabel: string;
}

const Toolbar = ({
	searchPlaceholder,
	viewMode,
	onViewChange,
	sortLabel,
}: ToolbarProps) => (
	<div className="flex items-center justify-between gap-4 border-b px-6 py-4">
		<div className="relative flex-1 max-w-md">
			<Search className="absolute left-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" />
			<Input placeholder={searchPlaceholder} className="pl-10" />
		</div>
		<div className="flex items-center gap-2">
			<Button variant="outline" className="gap-2">
				<SortAsc className="size-4" />
				{sortLabel}
			</Button>
			<Separator orientation="vertical" className="h-6" />
			<div className="flex items-center rounded-md border p-1">
				<Button
					variant={viewMode === 'list' ? 'secondary' : 'ghost'}
					size="icon-sm"
					onClick={() => onViewChange('list')}
				>
					<List className="size-4" />
				</Button>
				<Button
					variant={viewMode === 'grid' ? 'secondary' : 'ghost'}
					size="icon-sm"
					onClick={() => onViewChange('grid')}
				>
					<LayoutGrid className="size-4" />
				</Button>
			</div>
		</div>
	</div>
);

interface ImageGalleryProps {
	images: string[];
	productName: string;
}

const ImageGallery = ({ images, productName }: ImageGalleryProps) => (
	<div className="flex items-center gap-1">
		{images.slice(0, 3).map((img, idx) => (
			<div
				key={idx}
				className="relative size-10 overflow-hidden rounded-md border bg-muted"
				style={{ marginLeft: idx > 0 ? '-8px' : 0, zIndex: 3 - idx }}
			>
				<img
					src={img}
					alt={`${productName} ${idx + 1}`}
					className="size-full object-cover"
				/>
			</div>
		))}
		{images.length > 3 && (
			<div
				className="flex size-10 items-center justify-center rounded-md border bg-muted text-xs font-medium"
				style={{ marginLeft: '-8px' }}
			>
				+{images.length - 3}
			</div>
		)}
		{images.length === 0 && (
			<div className="flex size-10 items-center justify-center rounded-md border bg-muted">
				<ImageIcon className="size-4 text-muted-foreground" />
			</div>
		)}
	</div>
);

interface TagsDisplayProps {
	tags: string[];
	maxVisible?: number;
}

const TagsDisplay = ({ tags, maxVisible = 2 }: TagsDisplayProps) => (
	<div className="flex items-center gap-1">
		{tags.slice(0, maxVisible).map((tag) => (
			<Badge key={tag} variant="outline" className="gap-1 text-xs">
				<Tag className="size-3" />
				{tag}
			</Badge>
		))}
		{tags.length > maxVisible && (
			<Badge variant="secondary" className="text-xs">
				+{tags.length - maxVisible}
			</Badge>
		)}
	</div>
);

interface CollectionsDisplayProps {
	collections: string[];
}

const CollectionsDisplay = ({ collections }: CollectionsDisplayProps) => (
	<div className="flex items-center gap-1">
		<Layers className="size-3.5 text-muted-foreground" />
		<span className="text-sm text-muted-foreground">
			{collections.length} collection{collections.length !== 1 ? 's' : ''}
		</span>
	</div>
);

interface VariantsSummaryProps {
	variants: ProductVariant[];
	label: string;
}

const VariantsSummary = ({ variants, label }: VariantsSummaryProps) => {
	if (variants.length === 0) return null;

	const priceRange =
		variants.length > 1
			? `$${Math.min(...variants.map((v) => v.price)).toFixed(2)} - $${Math.max(...variants.map((v) => v.price)).toFixed(2)}`
			: `$${variants[0].price.toFixed(2)}`;

	return (
		<div className="flex items-center gap-2">
			<Badge variant="secondary" className="text-xs">
				{variants.length} {label}
			</Badge>
			<span className="text-xs text-muted-foreground">{priceRange}</span>
		</div>
	);
};

interface ProductRowProps {
	product: Product;
	selected: boolean;
	onSelect: (id: string, checked: boolean) => void;
	expanded: boolean;
	onExpand: (id: string) => void;
	actions: { label: string; onClick: (id: string) => void }[];
	variantsLabel: string;
}

const ProductRow = ({
	product,
	selected,
	onSelect,
	expanded,
	onExpand,
	actions,
	variantsLabel,
}: ProductRowProps) => (
	<>
		<TableRow
			data-state={selected ? 'selected' : undefined}
			className="cursor-pointer"
			onClick={() => onExpand(product.id)}
		>
			<TableCell onClick={(e) => e.stopPropagation()}>
				<Checkbox
					checked={selected}
					onCheckedChange={(checked) => onSelect(product.id, !!checked)}
				/>
			</TableCell>
			<TableCell>
				<ImageGallery images={product.images} productName={product.name} />
			</TableCell>
			<TableCell>
				<div className="space-y-1">
					<div className="font-medium">{product.name}</div>
					<div className="text-xs text-muted-foreground">{product.sku}</div>
				</div>
			</TableCell>
			<TableCell>
				<TagsDisplay tags={product.tags} />
			</TableCell>
			<TableCell>
				<CollectionsDisplay collections={product.collections} />
			</TableCell>
			<TableCell>
				<VariantsSummary variants={product.variants} label={variantsLabel} />
			</TableCell>
			<TableCell className="font-semibold">
				${product.basePrice.toFixed(2)}
			</TableCell>
			<TableCell>{product.totalStock}</TableCell>
			<TableCell onClick={(e) => e.stopPropagation()}>
				<DropdownMenu>
					<DropdownMenuTrigger asChild>
						<Button variant="ghost" size="icon-sm">
							<MoreHorizontal className="size-4" />
						</Button>
					</DropdownMenuTrigger>
					<DropdownMenuContent align="end">
						{actions.map((action) => (
							<DropdownMenuItem
								key={action.label}
								onClick={() => action.onClick(product.id)}
							>
								{action.label}
							</DropdownMenuItem>
						))}
					</DropdownMenuContent>
				</DropdownMenu>
			</TableCell>
		</TableRow>
		{expanded && product.variants.length > 0 && (
			<TableRow className="bg-muted/30">
				<TableCell colSpan={9} className="p-0">
					<div className="px-16 py-4">
						<Table>
							<TableHeader>
								<TableRow>
									<TableHead>Variant</TableHead>
									<TableHead>SKU</TableHead>
									<TableHead>Price</TableHead>
									<TableHead>Stock</TableHead>
								</TableRow>
							</TableHeader>
							<TableBody>
								{product.variants.map((variant) => (
									<TableRow key={variant.id}>
										<TableCell className="font-medium">
											{variant.name}
										</TableCell>
										<TableCell className="text-muted-foreground">
											{variant.sku}
										</TableCell>
										<TableCell>${variant.price.toFixed(2)}</TableCell>
										<TableCell>{variant.stock}</TableCell>
									</TableRow>
								))}
							</TableBody>
						</Table>
					</div>
				</TableCell>
			</TableRow>
		)}
	</>
);

export default function Main() {
	const [selectedIds, setSelectedIds] = React.useState<Set<string>>(new Set());
	const [expandedId, setExpandedId] = React.useState<string | null>(null);
	const [viewMode, setViewMode] = React.useState<'list' | 'grid'>('list');

	const products: Product[] = [
		{
			id: '1',
			name: 'Premium Cotton T-Shirt',
			sku: 'APP-TS-001',
			images: [
				'https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=100&h=100&fit=crop',
				'https://images.unsplash.com/photo-1503341504253-dff4815485f1?w=100&h=100&fit=crop',
				'https://images.unsplash.com/photo-1529374255404-311a2a4f1fd9?w=100&h=100&fit=crop',
				'https://images.unsplash.com/photo-1562157873-818bc0726f68?w=100&h=100&fit=crop',
			],
			basePrice: 29.99,
			totalStock: 450,
			variants: [
				{
					id: 'v1',
					name: 'Small / White',
					sku: 'APP-TS-001-SW',
					price: 29.99,
					stock: 120,
				},
				{
					id: 'v2',
					name: 'Medium / White',
					sku: 'APP-TS-001-MW',
					price: 29.99,
					stock: 85,
				},
				{
					id: 'v3',
					name: 'Large / White',
					sku: 'APP-TS-001-LW',
					price: 29.99,
					stock: 95,
				},
				{
					id: 'v4',
					name: 'Small / Black',
					sku: 'APP-TS-001-SB',
					price: 29.99,
					stock: 75,
				},
				{
					id: 'v5',
					name: 'Medium / Black',
					sku: 'APP-TS-001-MB',
					price: 29.99,
					stock: 75,
				},
			],
			tags: ['cotton', 'casual', 'bestseller'],
			collections: ['Summer 2024', 'Essentials'],
		},
		{
			id: '2',
			name: 'Classic Denim Jeans',
			sku: 'APP-DJ-002',
			images: [
				'https://images.unsplash.com/photo-1542272604-787c3835535d?w=100&h=100&fit=crop',
				'https://images.unsplash.com/photo-1541099649105-f69ad21f3246?w=100&h=100&fit=crop',
			],
			basePrice: 79.99,
			totalStock: 234,
			variants: [
				{
					id: 'v1',
					name: '30 / Regular',
					sku: 'APP-DJ-002-30R',
					price: 79.99,
					stock: 56,
				},
				{
					id: 'v2',
					name: '32 / Regular',
					sku: 'APP-DJ-002-32R',
					price: 79.99,
					stock: 78,
				},
				{
					id: 'v3',
					name: '34 / Regular',
					sku: 'APP-DJ-002-34R',
					price: 79.99,
					stock: 100,
				},
			],
			tags: ['denim', 'classic'],
			collections: ['Autumn Collection'],
		},
		{
			id: '3',
			name: 'Minimalist Watch',
			sku: 'ACC-WA-003',
			images: [
				'https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=100&h=100&fit=crop',
			],
			basePrice: 199.99,
			totalStock: 45,
			variants: [],
			tags: ['accessories', 'premium'],
			collections: ['Gift Guide', 'Premium'],
		},
	];

	const actions = [
		{ label: 'Edit', onClick: (id: string) => console.log('Edit', id) },
		{
			label: 'Duplicate',
			onClick: (id: string) => console.log('Duplicate', id),
		},
		{ label: 'Archive', onClick: (id: string) => console.log('Archive', id) },
		{ label: 'Delete', onClick: (id: string) => console.log('Delete', id) },
	];

	const handleSelect = (id: string, checked: boolean) => {
		const newSet = new Set(selectedIds);
		if (checked) newSet.add(id);
		else newSet.delete(id);
		setSelectedIds(newSet);
	};

	const handleExpand = (id: string) => {
		setExpandedId(expandedId === id ? null : id);
	};

	const columns = [
		'Images',
		'Product',
		'Tags',
		'Collections',
		'Variants',
		'Price',
		'Stock',
	];

	return (
		<section className="@container" data-theme="dashboard">
			<div className="mx-auto max-w-7xl px-4 py-8 @sm:px-6 @2xl:px-8">
				<div className="overflow-hidden rounded-xl border bg-card shadow-sm">
					<Toolbar
						searchPlaceholder="Search products..."
						viewMode={viewMode}
						onViewChange={setViewMode}
						sortLabel="Sort"
					/>
					<Table>
						<TableHeader>
							<TableRow>
								<TableHead className="w-12">
									<Checkbox />
								</TableHead>
								{columns.map((column) => (
									<TableHead key={column}>{column}</TableHead>
								))}
								<TableHead className="w-12" />
							</TableRow>
						</TableHeader>
						<TableBody>
							{products.map((product) => (
								<ProductRow
									key={product.id}
									product={product}
									selected={selectedIds.has(product.id)}
									onSelect={handleSelect}
									expanded={expandedId === product.id}
									onExpand={handleExpand}
									actions={actions}
									variantsLabel="variants"
								/>
							))}
						</TableBody>
					</Table>
				</div>
			</div>
		</section>
	);
}
