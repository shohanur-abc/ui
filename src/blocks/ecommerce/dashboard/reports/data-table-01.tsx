'use client';

import {
	ArrowDown,
	ArrowUp,
	ArrowUpDown,
	ChevronLeft,
	ChevronRight,
	Search,
} from 'lucide-react';

import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import {
	Card,
	CardContent,
	CardDescription,
	CardFooter,
	CardHeader,
	CardTitle,
} from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import {
	Table,
	TableBody,
	TableCell,
	TableHead,
	TableHeader,
	TableRow,
} from '@/components/ui/table';

type InventoryItem = {
	sku: string;
	name: string;
	category: string;
	stock: number;
	price: string;
	status: 'in-stock' | 'low-stock' | 'out-of-stock';
	lastUpdated: string;
};

const stockStatusStyles = {
	'in-stock': 'bg-emerald-500/10 text-emerald-500 border-emerald-500/20',
	'low-stock': 'bg-amber-500/10 text-amber-500 border-amber-500/20',
	'out-of-stock': 'bg-rose-500/10 text-rose-500 border-rose-500/20',
};

const stockStatusLabels = {
	'in-stock': 'In Stock',
	'low-stock': 'Low Stock',
	'out-of-stock': 'Out of Stock',
};

type TableHeaderCellProps = {
	label: string;
	sortable?: boolean;
	align?: 'left' | 'right' | 'center';
};

const SortableHeader = ({
	label,
	sortable = false,
	align = 'left',
}: TableHeaderCellProps) => (
	<TableHead className={align === 'right' ? 'text-right' : ''}>
		<div
			className={`flex items-center gap-1 ${align === 'right' ? 'justify-end' : ''}`}
		>
			{label}
			{sortable && <ArrowUpDown className="size-3 text-muted-foreground/50" />}
		</div>
	</TableHead>
);

type InventoryRowProps = InventoryItem;

const InventoryRow = ({
	sku,
	name,
	category,
	stock,
	price,
	status,
	lastUpdated,
}: InventoryRowProps) => (
	<TableRow className="group transition-colors hover:bg-muted/50">
		<TableCell className="font-mono text-sm">{sku}</TableCell>
		<TableCell className="font-medium">{name}</TableCell>
		<TableCell className="text-muted-foreground">{category}</TableCell>
		<TableCell className="text-right font-medium">{stock}</TableCell>
		<TableCell className="text-right font-medium">{price}</TableCell>
		<TableCell>
			<Badge variant="outline" className={stockStatusStyles[status]}>
				{stockStatusLabels[status]}
			</Badge>
		</TableCell>
		<TableCell className="text-right text-sm text-muted-foreground">
			{lastUpdated}
		</TableCell>
	</TableRow>
);

type SearchBarProps = {
	placeholder: string;
};

const SearchBar = ({ placeholder }: SearchBarProps) => (
	<div className="relative w-full max-w-sm">
		<Search className="absolute left-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" />
		<Input placeholder={placeholder} className="pl-9" />
	</div>
);

type PaginationProps = {
	currentPage: number;
	totalPages: number;
	totalItems: number;
	itemsPerPage: number;
};

const Pagination = ({
	currentPage,
	totalPages,
	totalItems,
	itemsPerPage,
}: PaginationProps) => {
	const startItem = (currentPage - 1) * itemsPerPage + 1;
	const endItem = Math.min(currentPage * itemsPerPage, totalItems);

	return (
		<div className="flex flex-col items-center justify-between gap-4 @sm:flex-row">
			<p className="text-sm text-muted-foreground">
				Showing {startItem} to {endItem} of {totalItems} entries
			</p>
			<div className="flex items-center gap-2">
				<Button variant="outline" size="sm" disabled={currentPage === 1}>
					<ChevronLeft className="size-4" />
				</Button>
				<div className="flex items-center gap-1">
					{Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
						<Button
							key={page}
							variant={page === currentPage ? 'default' : 'ghost'}
							size="sm"
							className="size-8"
						>
							{page}
						</Button>
					))}
				</div>
				<Button
					variant="outline"
					size="sm"
					disabled={currentPage === totalPages}
				>
					<ChevronRight className="size-4" />
				</Button>
			</div>
		</div>
	);
};

export default function Main() {
	const inventory: InventoryItem[] = [
		{
			sku: 'SKU-001',
			name: 'Premium Wireless Mouse',
			category: 'Electronics',
			stock: 245,
			price: '$49.99',
			status: 'in-stock',
			lastUpdated: 'Jan 28',
		},
		{
			sku: 'SKU-002',
			name: 'USB-C Hub 7-in-1',
			category: 'Accessories',
			stock: 12,
			price: '$79.99',
			status: 'low-stock',
			lastUpdated: 'Jan 28',
		},
		{
			sku: 'SKU-003',
			name: 'Laptop Stand Aluminum',
			category: 'Accessories',
			stock: 0,
			price: '$39.99',
			status: 'out-of-stock',
			lastUpdated: 'Jan 27',
		},
		{
			sku: 'SKU-004',
			name: 'Mechanical Keyboard TKL',
			category: 'Electronics',
			stock: 89,
			price: '$149.99',
			status: 'in-stock',
			lastUpdated: 'Jan 27',
		},
		{
			sku: 'SKU-005',
			name: 'Monitor Light Bar',
			category: 'Lighting',
			stock: 34,
			price: '$59.99',
			status: 'in-stock',
			lastUpdated: 'Jan 26',
		},
		{
			sku: 'SKU-006',
			name: 'Webcam 4K Ultra HD',
			category: 'Electronics',
			stock: 8,
			price: '$129.99',
			status: 'low-stock',
			lastUpdated: 'Jan 26',
		},
	];

	return (
		<section className="@container" data-theme="reports">
			<div className="mx-auto max-w-7xl px-4 py-8 @sm:px-6 @md:py-10 @2xl:px-8 @3xl:py-12">
				<Card className="overflow-hidden border-border/50 bg-card/80 backdrop-blur-sm">
					<CardHeader className="flex flex-col gap-4 @sm:flex-row @sm:items-center @sm:justify-between">
						<div>
							<CardTitle className="text-lg @sm:text-xl">
								Inventory Report
							</CardTitle>
							<CardDescription>
								Complete stock overview with status tracking
							</CardDescription>
						</div>
						<SearchBar placeholder="Search products..." />
					</CardHeader>
					<CardContent className="p-0">
						<Table>
							<TableHeader>
								<TableRow className="border-border/50 hover:bg-transparent">
									<SortableHeader label="SKU" sortable />
									<SortableHeader label="Product" sortable />
									<SortableHeader label="Category" />
									<SortableHeader label="Stock" sortable align="right" />
									<SortableHeader label="Price" sortable align="right" />
									<SortableHeader label="Status" />
									<SortableHeader label="Updated" align="right" />
								</TableRow>
							</TableHeader>
							<TableBody>
								{inventory.map((item) => (
									<InventoryRow key={item.sku} {...item} />
								))}
							</TableBody>
						</Table>
					</CardContent>
					<CardFooter className="border-t border-border/50 pt-6">
						<Pagination
							currentPage={1}
							totalPages={3}
							totalItems={24}
							itemsPerPage={6}
						/>
					</CardFooter>
				</Card>
			</div>
		</section>
	);
}
