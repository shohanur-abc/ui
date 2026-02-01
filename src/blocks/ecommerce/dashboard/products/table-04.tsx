'use client';

import * as React from 'react';
import {
	MoreHorizontal,
	Search,
	Calendar,
	ArrowUp,
	ArrowDown,
	Package,
	AlertCircle,
	CheckCircle2,
	Clock,
} from 'lucide-react';

import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Checkbox } from '@/components/ui/checkbox';
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuItem,
	DropdownMenuSeparator,
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
import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from '@/components/ui/select';
import { Tabs, TabsList, TabsTrigger } from '@/components/ui/tabs';

interface Product {
	id: string;
	name: string;
	sku: string;
	image: string;
	price: number;
	cost: number;
	stock: number;
	status: 'active' | 'inactive' | 'pending';
	lastUpdated: string;
	type: 'physical' | 'digital' | 'subscription';
}

interface TabsFilterProps {
	tabs: { value: string; label: string; count: number }[];
	defaultValue: string;
}

const TabsFilter = ({ tabs, defaultValue }: TabsFilterProps) => (
	<Tabs defaultValue={defaultValue}>
		<TabsList>
			{tabs.map((tab) => (
				<TabsTrigger key={tab.value} value={tab.value} className="gap-2">
					{tab.label}
					<Badge
						variant="secondary"
						className="h-5 min-w-5 rounded-full text-xs"
					>
						{tab.count}
					</Badge>
				</TabsTrigger>
			))}
		</TabsList>
	</Tabs>
);

interface FiltersProps {
	searchPlaceholder: string;
	typeLabel: string;
	types: { value: string; label: string }[];
	dateLabel: string;
}

const Filters = ({
	searchPlaceholder,
	typeLabel,
	types,
	dateLabel,
}: FiltersProps) => (
	<div className="flex flex-wrap items-center gap-3">
		<div className="relative flex-1 min-w-[200px]">
			<Search className="absolute left-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" />
			<Input placeholder={searchPlaceholder} className="pl-10" />
		</div>
		<Select>
			<SelectTrigger className="w-36">
				<SelectValue placeholder={typeLabel} />
			</SelectTrigger>
			<SelectContent>
				{types.map((type) => (
					<SelectItem key={type.value} value={type.value}>
						{type.label}
					</SelectItem>
				))}
			</SelectContent>
		</Select>
		<Button variant="outline" className="gap-2">
			<Calendar className="size-4" />
			{dateLabel}
		</Button>
	</div>
);

interface StatusIconProps {
	status: 'active' | 'inactive' | 'pending';
}

const StatusIcon = ({ status }: StatusIconProps) => {
	const icons = {
		active: <CheckCircle2 className="size-4 text-emerald-500" />,
		inactive: <AlertCircle className="size-4 text-muted-foreground" />,
		pending: <Clock className="size-4 text-amber-500" />,
	};
	return icons[status];
};

interface ProductTypeBadgeProps {
	type: 'physical' | 'digital' | 'subscription';
	labels: Record<'physical' | 'digital' | 'subscription', string>;
}

const ProductTypeBadge = ({ type, labels }: ProductTypeBadgeProps) => {
	const variants: Record<
		'physical' | 'digital' | 'subscription',
		'default' | 'secondary' | 'outline'
	> = {
		physical: 'default',
		digital: 'secondary',
		subscription: 'outline',
	};
	return <Badge variant={variants[type]}>{labels[type]}</Badge>;
};

interface ProfitMarginProps {
	price: number;
	cost: number;
}

const ProfitMargin = ({ price, cost }: ProfitMarginProps) => {
	const profit = price - cost;
	const margin = ((profit / price) * 100).toFixed(1);
	const isPositive = profit > 0;

	return (
		<div className="flex items-center gap-1">
			{isPositive ? (
				<ArrowUp className="size-3.5 text-emerald-500" />
			) : (
				<ArrowDown className="size-3.5 text-red-500" />
			)}
			<span className={isPositive ? 'text-emerald-500' : 'text-red-500'}>
				{margin}%
			</span>
		</div>
	);
};

interface ProductRowProps {
	product: Product;
	selected: boolean;
	onSelect: (id: string, checked: boolean) => void;
	actions: {
		label: string;
		onClick: (id: string) => void;
		variant?: 'destructive';
	}[];
}

const ProductRow = ({
	product,
	selected,
	onSelect,
	actions,
}: ProductRowProps) => (
	<TableRow data-state={selected ? 'selected' : undefined}>
		<TableCell>
			<Checkbox
				checked={selected}
				onCheckedChange={(checked) => onSelect(product.id, !!checked)}
			/>
		</TableCell>
		<TableCell>
			<div className="flex items-center gap-3">
				<div className="relative size-11 overflow-hidden rounded-lg border bg-muted">
					{product.image ? (
						<img
							src={product.image}
							alt={product.name}
							className="size-full object-cover"
						/>
					) : (
						<div className="flex size-full items-center justify-center">
							<Package className="size-5 text-muted-foreground" />
						</div>
					)}
				</div>
				<div className="space-y-0.5">
					<div className="flex items-center gap-2">
						<StatusIcon status={product.status} />
						<span className="font-medium">{product.name}</span>
					</div>
					<div className="text-xs text-muted-foreground">{product.sku}</div>
				</div>
			</div>
		</TableCell>
		<TableCell>
			<ProductTypeBadge
				type={product.type}
				labels={{
					physical: 'Physical',
					digital: 'Digital',
					subscription: 'Subscription',
				}}
			/>
		</TableCell>
		<TableCell>
			<div className="space-y-0.5">
				<div className="font-semibold">${product.price.toFixed(2)}</div>
				<div className="text-xs text-muted-foreground">
					Cost: ${product.cost.toFixed(2)}
				</div>
			</div>
		</TableCell>
		<TableCell>
			<ProfitMargin price={product.price} cost={product.cost} />
		</TableCell>
		<TableCell>
			{product.type === 'physical' ? (
				<span
					className={
						product.stock === 0
							? 'text-destructive font-medium'
							: product.stock < 10
								? 'text-amber-500 font-medium'
								: ''
					}
				>
					{product.stock}
				</span>
			) : (
				<span className="text-muted-foreground">—</span>
			)}
		</TableCell>
		<TableCell className="text-muted-foreground text-sm">
			{product.lastUpdated}
		</TableCell>
		<TableCell>
			<DropdownMenu>
				<DropdownMenuTrigger asChild>
					<Button variant="ghost" size="icon-sm">
						<MoreHorizontal className="size-4" />
					</Button>
				</DropdownMenuTrigger>
				<DropdownMenuContent align="end">
					{actions.map((action, idx) => (
						<React.Fragment key={action.label}>
							{action.variant === 'destructive' && <DropdownMenuSeparator />}
							<DropdownMenuItem
								onClick={() => action.onClick(product.id)}
								className={
									action.variant === 'destructive' ? 'text-destructive' : ''
								}
							>
								{action.label}
							</DropdownMenuItem>
						</React.Fragment>
					))}
				</DropdownMenuContent>
			</DropdownMenu>
		</TableCell>
	</TableRow>
);

export default function Main() {
	const [selectedIds, setSelectedIds] = React.useState<Set<string>>(new Set());

	const products: Product[] = [
		{
			id: '1',
			name: 'Cloud Storage Plan - Pro',
			sku: 'SUB-CSP-001',
			image: '',
			price: 29.99,
			cost: 8.0,
			stock: 0,
			status: 'active',
			lastUpdated: '2 hours ago',
			type: 'subscription',
		},
		{
			id: '2',
			name: 'E-Book: Marketing Mastery',
			sku: 'DIG-EB-002',
			image:
				'https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?w=100&h=100&fit=crop',
			price: 49.99,
			cost: 5.0,
			stock: 0,
			status: 'active',
			lastUpdated: '1 day ago',
			type: 'digital',
		},
		{
			id: '3',
			name: 'Wireless Charging Pad',
			sku: 'PHY-WCP-003',
			image:
				'https://images.unsplash.com/photo-1586816879360-004f5b0c51e5?w=100&h=100&fit=crop',
			price: 39.99,
			cost: 18.5,
			stock: 156,
			status: 'active',
			lastUpdated: '3 days ago',
			type: 'physical',
		},
		{
			id: '4',
			name: 'Premium Template Bundle',
			sku: 'DIG-TB-004',
			image:
				'https://images.unsplash.com/photo-1558655146-9f40138edfeb?w=100&h=100&fit=crop',
			price: 99.99,
			cost: 0,
			stock: 0,
			status: 'pending',
			lastUpdated: '5 days ago',
			type: 'digital',
		},
		{
			id: '5',
			name: 'USB-C Hub 7-in-1',
			sku: 'PHY-UCH-005',
			image:
				'https://images.unsplash.com/photo-1625723044792-44de16ccb4e9?w=100&h=100&fit=crop',
			price: 59.99,
			cost: 28.0,
			stock: 8,
			status: 'active',
			lastUpdated: '1 week ago',
			type: 'physical',
		},
	];

	const tabs = [
		{ value: 'all', label: 'All', count: 125 },
		{ value: 'active', label: 'Active', count: 98 },
		{ value: 'pending', label: 'Pending', count: 12 },
		{ value: 'inactive', label: 'Inactive', count: 15 },
	];

	const types = [
		{ value: 'all', label: 'All Types' },
		{ value: 'physical', label: 'Physical' },
		{ value: 'digital', label: 'Digital' },
		{ value: 'subscription', label: 'Subscription' },
	];

	const actions = [
		{ label: 'View', onClick: (id: string) => console.log('View', id) },
		{ label: 'Edit', onClick: (id: string) => console.log('Edit', id) },
		{
			label: 'Duplicate',
			onClick: (id: string) => console.log('Duplicate', id),
		},
		{
			label: 'Delete',
			onClick: (id: string) => console.log('Delete', id),
			variant: 'destructive' as const,
		},
	];

	const handleSelect = (id: string, checked: boolean) => {
		const newSet = new Set(selectedIds);
		if (checked) newSet.add(id);
		else newSet.delete(id);
		setSelectedIds(newSet);
	};

	const columns = ['Product', 'Type', 'Price', 'Margin', 'Stock', 'Updated'];

	return (
		<section className="@container" data-theme="dashboard">
			<div className="mx-auto max-w-7xl space-y-6 px-4 py-8 @sm:px-6 @2xl:px-8">
				<TabsFilter tabs={tabs} defaultValue="all" />
				<div className="rounded-xl border bg-card shadow-sm">
					<div className="border-b px-6 py-4">
						<Filters
							searchPlaceholder="Search products..."
							typeLabel="Type"
							types={types}
							dateLabel="Date Range"
						/>
					</div>
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
									actions={actions}
								/>
							))}
						</TableBody>
					</Table>
				</div>
			</div>
		</section>
	);
}
