'use client';

import * as React from 'react';
import {
	Eye,
	Pencil,
	Trash2,
	Copy,
	Search,
	SlidersHorizontal,
	Package,
	Star,
	ChevronLeft,
	ChevronRight,
} from 'lucide-react';

import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Checkbox } from '@/components/ui/checkbox';
import { Input } from '@/components/ui/input';
import {
	Table,
	TableBody,
	TableCell,
	TableHead,
	TableHeader,
	TableRow,
} from '@/components/ui/table';
import {
	Tooltip,
	TooltipContent,
	TooltipTrigger,
} from '@/components/ui/tooltip';

interface Product {
	id: string;
	name: string;
	sku: string;
	image: string;
	price: number;
	stock: number;
	rating: number;
	reviews: number;
	category: string;
	vendor: string;
	featured: boolean;
}

interface SectionHeaderProps {
	title: string;
	count: number;
}

const SectionHeader = ({ title, count }: SectionHeaderProps) => (
	<div className="flex items-center gap-3 border-b px-6 py-4">
		<h2 className="text-lg font-semibold">{title}</h2>
		<Badge variant="secondary" className="rounded-full">
			{count}
		</Badge>
	</div>
);

interface SearchBarProps {
	placeholder: string;
	filtersLabel: string;
	filterCount?: number;
}

const SearchBar = ({
	placeholder,
	filtersLabel,
	filterCount,
}: SearchBarProps) => (
	<div className="flex items-center gap-2 border-b px-6 py-3">
		<div className="relative flex-1">
			<Search className="absolute left-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" />
			<Input placeholder={placeholder} className="pl-10" />
		</div>
		<Button variant="outline" className="gap-2">
			<SlidersHorizontal className="size-4" />
			{filtersLabel}
			{filterCount && filterCount > 0 && (
				<Badge variant="default" className="ml-1 size-5 rounded-full p-0">
					{filterCount}
				</Badge>
			)}
		</Button>
	</div>
);

interface RatingDisplayProps {
	rating: number;
	reviews: number;
}

const RatingDisplay = ({ rating, reviews }: RatingDisplayProps) => (
	<div className="flex items-center gap-1.5">
		<div className="flex items-center">
			<Star className="size-3.5 fill-amber-400 text-amber-400" />
			<span className="ml-1 text-sm font-medium">{rating.toFixed(1)}</span>
		</div>
		<span className="text-xs text-muted-foreground">({reviews})</span>
	</div>
);

interface ActionButtonsProps {
	onView: () => void;
	onEdit: () => void;
	onDuplicate: () => void;
	onDelete: () => void;
	tooltips: { view: string; edit: string; duplicate: string; delete: string };
}

const ActionButtons = ({
	onView,
	onEdit,
	onDuplicate,
	onDelete,
	tooltips,
}: ActionButtonsProps) => (
	<div className="flex items-center gap-1">
		<Tooltip>
			<TooltipTrigger asChild>
				<Button variant="ghost" size="icon-sm" onClick={onView}>
					<Eye className="size-4" />
				</Button>
			</TooltipTrigger>
			<TooltipContent>{tooltips.view}</TooltipContent>
		</Tooltip>
		<Tooltip>
			<TooltipTrigger asChild>
				<Button variant="ghost" size="icon-sm" onClick={onEdit}>
					<Pencil className="size-4" />
				</Button>
			</TooltipTrigger>
			<TooltipContent>{tooltips.edit}</TooltipContent>
		</Tooltip>
		<Tooltip>
			<TooltipTrigger asChild>
				<Button variant="ghost" size="icon-sm" onClick={onDuplicate}>
					<Copy className="size-4" />
				</Button>
			</TooltipTrigger>
			<TooltipContent>{tooltips.duplicate}</TooltipContent>
		</Tooltip>
		<Tooltip>
			<TooltipTrigger asChild>
				<Button variant="ghost" size="icon-sm" onClick={onDelete}>
					<Trash2 className="size-4 text-destructive" />
				</Button>
			</TooltipTrigger>
			<TooltipContent>{tooltips.delete}</TooltipContent>
		</Tooltip>
	</div>
);

interface ProductRowProps {
	product: Product;
	selected: boolean;
	onSelect: (id: string, checked: boolean) => void;
}

const ProductRow = ({ product, selected, onSelect }: ProductRowProps) => (
	<TableRow data-state={selected ? 'selected' : undefined}>
		<TableCell>
			<Checkbox
				checked={selected}
				onCheckedChange={(checked) => onSelect(product.id, !!checked)}
			/>
		</TableCell>
		<TableCell>
			<div className="flex items-center gap-3">
				<div className="relative size-14 overflow-hidden rounded-lg border bg-muted">
					{product.image ? (
						<img
							src={product.image}
							alt={product.name}
							className="size-full object-cover"
						/>
					) : (
						<div className="flex size-full items-center justify-center">
							<Package className="size-6 text-muted-foreground" />
						</div>
					)}
					{product.featured && (
						<div className="absolute right-1 top-1">
							<Star className="size-3.5 fill-amber-400 text-amber-400" />
						</div>
					)}
				</div>
				<div className="space-y-1">
					<div className="font-medium">{product.name}</div>
					<div className="flex items-center gap-2 text-xs text-muted-foreground">
						<span>{product.sku}</span>
						<span>•</span>
						<span>{product.vendor}</span>
					</div>
				</div>
			</div>
		</TableCell>
		<TableCell>
			<Badge variant="outline">{product.category}</Badge>
		</TableCell>
		<TableCell className="font-semibold">${product.price.toFixed(2)}</TableCell>
		<TableCell>
			<span
				className={
					product.stock === 0
						? 'text-destructive'
						: product.stock < 20
							? 'text-amber-500'
							: ''
				}
			>
				{product.stock} units
			</span>
		</TableCell>
		<TableCell>
			<RatingDisplay rating={product.rating} reviews={product.reviews} />
		</TableCell>
		<TableCell>
			<ActionButtons
				onView={() => console.log('View', product.id)}
				onEdit={() => console.log('Edit', product.id)}
				onDuplicate={() => console.log('Duplicate', product.id)}
				onDelete={() => console.log('Delete', product.id)}
				tooltips={{
					view: 'View details',
					edit: 'Edit product',
					duplicate: 'Duplicate',
					delete: 'Delete',
				}}
			/>
		</TableCell>
	</TableRow>
);

interface PaginationProps {
	currentPage: number;
	totalPages: number;
	totalItems: number;
	itemsPerPage: number;
	labels: { showing: string; of: string; results: string };
	onPageChange: (page: number) => void;
}

const TablePagination = ({
	currentPage,
	totalPages,
	totalItems,
	itemsPerPage,
	labels,
	onPageChange,
}: PaginationProps) => {
	const start = (currentPage - 1) * itemsPerPage + 1;
	const end = Math.min(currentPage * itemsPerPage, totalItems);

	return (
		<div className="flex items-center justify-between border-t px-6 py-4">
			<span className="text-sm text-muted-foreground">
				{labels.showing} {start}-{end} {labels.of} {totalItems} {labels.results}
			</span>
			<div className="flex items-center gap-2">
				<Button
					variant="outline"
					size="icon-sm"
					onClick={() => onPageChange(currentPage - 1)}
					disabled={currentPage === 1}
				>
					<ChevronLeft className="size-4" />
				</Button>
				{Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
					<Button
						key={page}
						variant={page === currentPage ? 'default' : 'outline'}
						size="icon-sm"
						onClick={() => onPageChange(page)}
					>
						{page}
					</Button>
				))}
				<Button
					variant="outline"
					size="icon-sm"
					onClick={() => onPageChange(currentPage + 1)}
					disabled={currentPage === totalPages}
				>
					<ChevronRight className="size-4" />
				</Button>
			</div>
		</div>
	);
};

export default function Main() {
	const [selectedIds, setSelectedIds] = React.useState<Set<string>>(new Set());
	const [currentPage, setCurrentPage] = React.useState(1);

	const products: Product[] = [
		{
			id: '1',
			name: 'Premium Noise-Canceling Headphones',
			sku: 'AUD-NC-001',
			image:
				'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=100&h=100&fit=crop',
			price: 349.99,
			stock: 156,
			rating: 4.8,
			reviews: 234,
			category: 'Audio',
			vendor: 'SoundMax',
			featured: true,
		},
		{
			id: '2',
			name: 'Wireless Earbuds Pro',
			sku: 'AUD-WE-002',
			image:
				'https://images.unsplash.com/photo-1590658268037-6bf12165a8df?w=100&h=100&fit=crop',
			price: 199.99,
			stock: 89,
			rating: 4.6,
			reviews: 178,
			category: 'Audio',
			vendor: 'TechAudio',
			featured: false,
		},
		{
			id: '3',
			name: 'Smart Home Speaker',
			sku: 'HOM-SP-003',
			image:
				'https://images.unsplash.com/photo-1543512214-318c7553f230?w=100&h=100&fit=crop',
			price: 149.99,
			stock: 15,
			rating: 4.4,
			reviews: 89,
			category: 'Smart Home',
			vendor: 'HomeSync',
			featured: true,
		},
		{
			id: '4',
			name: 'Portable Bluetooth Speaker',
			sku: 'AUD-BT-004',
			image:
				'https://images.unsplash.com/photo-1608043152269-423dbba4e7e1?w=100&h=100&fit=crop',
			price: 79.99,
			stock: 0,
			rating: 4.2,
			reviews: 156,
			category: 'Audio',
			vendor: 'SoundMax',
			featured: false,
		},
		{
			id: '5',
			name: 'Studio Monitor Speakers',
			sku: 'AUD-SM-005',
			image:
				'https://images.unsplash.com/photo-1545454675-3531b543be5d?w=100&h=100&fit=crop',
			price: 599.99,
			stock: 34,
			rating: 4.9,
			reviews: 67,
			category: 'Audio',
			vendor: 'ProAudio',
			featured: true,
		},
	];

	const handleSelect = (id: string, checked: boolean) => {
		const newSet = new Set(selectedIds);
		if (checked) {
			newSet.add(id);
		} else {
			newSet.delete(id);
		}
		setSelectedIds(newSet);
	};

	const columns = [
		'Product',
		'Category',
		'Price',
		'Stock',
		'Rating',
		'Actions',
	];

	return (
		<section className="@container" data-theme="dashboard">
			<div className="mx-auto max-w-7xl px-4 py-8 @sm:px-6 @2xl:px-8">
				<div className="overflow-hidden rounded-xl border bg-card shadow-sm">
					<SectionHeader title="All Products" count={products.length} />
					<SearchBar
						placeholder="Search products by name, SKU, or vendor..."
						filtersLabel="Filters"
						filterCount={2}
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
							</TableRow>
						</TableHeader>
						<TableBody>
							{products.map((product) => (
								<ProductRow
									key={product.id}
									product={product}
									selected={selectedIds.has(product.id)}
									onSelect={handleSelect}
								/>
							))}
						</TableBody>
					</Table>
					<TablePagination
						currentPage={currentPage}
						totalPages={3}
						totalItems={15}
						itemsPerPage={5}
						labels={{ showing: 'Showing', of: 'of', results: 'results' }}
						onPageChange={setCurrentPage}
					/>
				</div>
			</div>
		</section>
	);
}
