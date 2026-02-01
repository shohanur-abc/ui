'use client';

import { ArrowDown, ArrowUp, ChevronDown, Search } from 'lucide-react';
import { useState } from 'react';

import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import {
	Card,
	CardContent,
	CardDescription,
	CardHeader,
	CardTitle,
} from '@/components/ui/card';
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

type SupplierItem = {
	id: string;
	name: string;
	contact: string;
	products: number;
	orders: number;
	totalValue: number;
	rating: number;
	status: 'active' | 'inactive' | 'pending';
};

type SortOption = {
	key: keyof SupplierItem;
	label: string;
	direction: 'asc' | 'desc';
};

const statusStyles = {
	active: 'bg-emerald-500/10 text-emerald-500',
	inactive: 'bg-rose-500/10 text-rose-500',
	pending: 'bg-amber-500/10 text-amber-500',
};

type SupplierRowProps = SupplierItem;

const SupplierRow = ({
	id,
	name,
	contact,
	products,
	orders,
	totalValue,
	rating,
	status,
}: SupplierRowProps) => (
	<TableRow className="group transition-colors hover:bg-muted/50">
		<TableCell className="font-mono text-xs text-muted-foreground">
			{id}
		</TableCell>
		<TableCell>
			<div className="flex flex-col">
				<span className="font-medium">{name}</span>
				<span className="text-xs text-muted-foreground">{contact}</span>
			</div>
		</TableCell>
		<TableCell className="text-right">{products}</TableCell>
		<TableCell className="text-right">{orders}</TableCell>
		<TableCell className="text-right font-medium">
			${totalValue.toLocaleString()}
		</TableCell>
		<TableCell className="text-right">
			<div className="flex items-center justify-end gap-1">
				<div className="flex">
					{[1, 2, 3, 4, 5].map((star) => (
						<div
							key={star}
							className={`size-2.5 rounded-full ${star <= rating ? 'bg-amber-500' : 'bg-muted'}`}
						/>
					))}
				</div>
				<span className="ml-1 text-sm">{rating.toFixed(1)}</span>
			</div>
		</TableCell>
		<TableCell>
			<Badge variant="secondary" className={`border-0 ${statusStyles[status]}`}>
				{status.charAt(0).toUpperCase() + status.slice(1)}
			</Badge>
		</TableCell>
	</TableRow>
);

type SortSelectorProps = {
	options: SortOption[];
	current: SortOption;
	onSelect: (option: SortOption) => void;
};

const SortSelector = ({ options, current, onSelect }: SortSelectorProps) => (
	<DropdownMenu>
		<DropdownMenuTrigger asChild>
			<Button variant="outline" size="sm" className="gap-2">
				{current.direction === 'asc' ? (
					<ArrowUp className="size-3" />
				) : (
					<ArrowDown className="size-3" />
				)}
				Sort: {current.label}
				<ChevronDown className="size-3" />
			</Button>
		</DropdownMenuTrigger>
		<DropdownMenuContent align="end">
			{options.map((option, i) => (
				<DropdownMenuItem key={i} onClick={() => onSelect(option)}>
					{option.direction === 'asc' ? (
						<ArrowUp className="mr-2 size-3" />
					) : (
						<ArrowDown className="mr-2 size-3" />
					)}
					{option.label}
				</DropdownMenuItem>
			))}
		</DropdownMenuContent>
	</DropdownMenu>
);

export default function Main() {
	const sortOptions: SortOption[] = [
		{ key: 'totalValue', label: 'Value (High to Low)', direction: 'desc' },
		{ key: 'totalValue', label: 'Value (Low to High)', direction: 'asc' },
		{ key: 'rating', label: 'Rating (High to Low)', direction: 'desc' },
		{ key: 'orders', label: 'Orders (High to Low)', direction: 'desc' },
		{ key: 'name', label: 'Name (A-Z)', direction: 'asc' },
	];

	const [currentSort, setCurrentSort] = useState<SortOption>(sortOptions[0]);

	const suppliers: SupplierItem[] = [
		{
			id: 'SUP-001',
			name: 'TechPro Electronics',
			contact: 'tech@supplier.com',
			products: 156,
			orders: 892,
			totalValue: 245800,
			rating: 4.8,
			status: 'active',
		},
		{
			id: 'SUP-002',
			name: 'Global Fashion Co',
			contact: 'info@globalfashion.com',
			products: 324,
			orders: 1245,
			totalValue: 189500,
			rating: 4.5,
			status: 'active',
		},
		{
			id: 'SUP-003',
			name: 'HomeStyle Living',
			contact: 'orders@homestyle.com',
			products: 89,
			orders: 456,
			totalValue: 78900,
			rating: 4.2,
			status: 'active',
		},
		{
			id: 'SUP-004',
			name: 'Sports Unlimited',
			contact: 'sales@sportsunlimited.com',
			products: 67,
			orders: 234,
			totalValue: 45600,
			rating: 3.9,
			status: 'pending',
		},
		{
			id: 'SUP-005',
			name: 'Beauty Essentials',
			contact: 'contact@beautyess.com',
			products: 212,
			orders: 678,
			totalValue: 92300,
			rating: 4.6,
			status: 'active',
		},
		{
			id: 'SUP-006',
			name: 'Books & Beyond',
			contact: 'orders@booksbeyond.com',
			products: 456,
			orders: 189,
			totalValue: 23400,
			rating: 3.4,
			status: 'inactive',
		},
	];

	const sortedSuppliers = [...suppliers].sort((a, b) => {
		const aVal = a[currentSort.key];
		const bVal = b[currentSort.key];
		const modifier = currentSort.direction === 'asc' ? 1 : -1;
		if (typeof aVal === 'string' && typeof bVal === 'string') {
			return aVal.localeCompare(bVal) * modifier;
		}
		return ((aVal as number) - (bVal as number)) * modifier;
	});

	return (
		<section className="@container" data-theme="reports">
			<div className="mx-auto max-w-7xl px-4 py-8 @sm:px-6 @md:py-10 @2xl:px-8 @3xl:py-12">
				<Card className="overflow-hidden border-border/50 bg-card/80 backdrop-blur-sm">
					<CardHeader className="flex flex-col gap-4 @lg:flex-row @lg:items-center @lg:justify-between">
						<div>
							<CardTitle className="text-lg @sm:text-xl">
								Supplier Report
							</CardTitle>
							<CardDescription>
								Supplier performance and order analytics
							</CardDescription>
						</div>
						<div className="flex items-center gap-3">
							<div className="relative">
								<Search className="absolute left-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" />
								<Input
									placeholder="Search suppliers..."
									className="h-9 w-[200px] pl-9"
								/>
							</div>
							<SortSelector
								options={sortOptions}
								current={currentSort}
								onSelect={setCurrentSort}
							/>
						</div>
					</CardHeader>
					<CardContent className="p-0">
						<Table>
							<TableHeader>
								<TableRow className="border-border/50 hover:bg-transparent">
									<TableHead>ID</TableHead>
									<TableHead>Supplier</TableHead>
									<TableHead className="text-right">Products</TableHead>
									<TableHead className="text-right">Orders</TableHead>
									<TableHead className="text-right">Total Value</TableHead>
									<TableHead className="text-right">Rating</TableHead>
									<TableHead>Status</TableHead>
								</TableRow>
							</TableHeader>
							<TableBody>
								{sortedSuppliers.map((supplier) => (
									<SupplierRow key={supplier.id} {...supplier} />
								))}
							</TableBody>
						</Table>
					</CardContent>
				</Card>
			</div>
		</section>
	);
}
