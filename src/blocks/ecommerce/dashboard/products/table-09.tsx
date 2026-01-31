'use client';

import * as React from 'react';
import {
	MoreHorizontal,
	Search,
	Package,
	TrendingUp,
	TrendingDown,
	Minus,
	Eye,
	ShoppingCart,
	DollarSign,
	BarChart3,
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
import { Tabs, TabsList, TabsTrigger } from '@/components/ui/tabs';

interface ProductPerformance {
	id: string;
	name: string;
	sku: string;
	image: string;
	category: string;
	views: number;
	viewsTrend: number;
	cartAdds: number;
	cartTrend: number;
	orders: number;
	ordersTrend: number;
	revenue: number;
	revenueTrend: number;
	conversionRate: number;
}

interface PeriodTabsProps {
	periods: { value: string; label: string }[];
	defaultValue: string;
	onChange: (value: string) => void;
}

const PeriodTabs = ({ periods, defaultValue, onChange }: PeriodTabsProps) => (
	<Tabs defaultValue={defaultValue} onValueChange={onChange}>
		<TabsList>
			{periods.map((period) => (
				<TabsTrigger key={period.value} value={period.value}>
					{period.label}
				</TabsTrigger>
			))}
		</TabsList>
	</Tabs>
);

interface TrendValueProps {
	value: number;
	trend: number;
	format?: 'number' | 'currency' | 'percent';
}

const TrendValue = ({ value, trend, format = 'number' }: TrendValueProps) => {
	const formatValue = (val: number) => {
		switch (format) {
			case 'currency':
				return `$${val.toLocaleString()}`;
			case 'percent':
				return `${val.toFixed(1)}%`;
			default:
				return val.toLocaleString();
		}
	};

	const getTrendIcon = () => {
		if (trend > 0) return <TrendingUp className="size-3.5 text-emerald-500" />;
		if (trend < 0) return <TrendingDown className="size-3.5 text-red-500" />;
		return <Minus className="size-3.5 text-muted-foreground" />;
	};

	const getTrendColor = () => {
		if (trend > 0) return 'text-emerald-500';
		if (trend < 0) return 'text-red-500';
		return 'text-muted-foreground';
	};

	return (
		<div className="space-y-1">
			<div className="font-semibold">{formatValue(value)}</div>
			<div className={`flex items-center gap-1 text-xs ${getTrendColor()}`}>
				{getTrendIcon()}
				<span>{Math.abs(trend)}%</span>
			</div>
		</div>
	);
};

interface ConversionBadgeProps {
	rate: number;
}

const ConversionBadge = ({ rate }: ConversionBadgeProps) => {
	const getVariant = (): 'default' | 'secondary' | 'destructive' => {
		if (rate >= 5) return 'default';
		if (rate >= 2) return 'secondary';
		return 'destructive';
	};

	return (
		<Badge variant={getVariant()} className="font-mono">
			{rate.toFixed(2)}%
		</Badge>
	);
};

interface MetricCellProps {
	icon: React.ElementType;
	value: number;
	trend: number;
	format?: 'number' | 'currency' | 'percent';
}

const MetricCell = ({ icon: Icon, value, trend, format }: MetricCellProps) => (
	<div className="flex items-center gap-2">
		<div className="flex size-8 items-center justify-center rounded-md bg-muted">
			<Icon className="size-4 text-muted-foreground" />
		</div>
		<TrendValue value={value} trend={trend} format={format} />
	</div>
);

interface ProductRowProps {
	product: ProductPerformance;
	selected: boolean;
	onSelect: (id: string, checked: boolean) => void;
	actions: { label: string; onClick: (id: string) => void }[];
}

const ProductRow = ({ product, selected, onSelect, actions }: ProductRowProps) => (
	<TableRow data-state={selected ? 'selected' : undefined}>
		<TableCell>
			<Checkbox
				checked={selected}
				onCheckedChange={(checked) => onSelect(product.id, !!checked)}
			/>
		</TableCell>
		<TableCell>
			<div className="flex items-center gap-3">
				<div className="relative size-12 overflow-hidden rounded-lg border bg-muted">
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
					<div className="font-medium">{product.name}</div>
					<div className="flex items-center gap-2">
						<span className="text-xs text-muted-foreground">{product.sku}</span>
						<Badge variant="outline" className="text-xs">
							{product.category}
						</Badge>
					</div>
				</div>
			</div>
		</TableCell>
		<TableCell>
			<MetricCell icon={Eye} value={product.views} trend={product.viewsTrend} />
		</TableCell>
		<TableCell>
			<MetricCell icon={ShoppingCart} value={product.cartAdds} trend={product.cartTrend} />
		</TableCell>
		<TableCell>
			<MetricCell icon={Package} value={product.orders} trend={product.ordersTrend} />
		</TableCell>
		<TableCell>
			<MetricCell
				icon={DollarSign}
				value={product.revenue}
				trend={product.revenueTrend}
				format="currency"
			/>
		</TableCell>
		<TableCell>
			<ConversionBadge rate={product.conversionRate} />
		</TableCell>
		<TableCell>
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
);

interface ToolbarProps {
	searchPlaceholder: string;
	periods: { value: string; label: string }[];
	selectedPeriod: string;
	onPeriodChange: (value: string) => void;
}

const Toolbar = ({
	searchPlaceholder,
	periods,
	selectedPeriod,
	onPeriodChange,
}: ToolbarProps) => (
	<div className="flex flex-col gap-4 border-b px-6 py-4 @lg:flex-row @lg:items-center @lg:justify-between">
		<div className="flex items-center gap-3">
			<BarChart3 className="size-5 text-primary" />
			<h2 className="text-lg font-semibold">Product Performance</h2>
		</div>
		<div className="flex flex-col gap-3 @sm:flex-row @sm:items-center">
			<div className="relative">
				<Search className="absolute left-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" />
				<Input placeholder={searchPlaceholder} className="w-full pl-10 @sm:w-64" />
			</div>
			<PeriodTabs
				periods={periods}
				defaultValue={selectedPeriod}
				onChange={onPeriodChange}
			/>
		</div>
	</div>
);

export default function Main() {
	const [selectedIds, setSelectedIds] = React.useState<Set<string>>(new Set());
	const [period, setPeriod] = React.useState('7d');

	const products: ProductPerformance[] = [
		{
			id: '1',
			name: 'Premium Wireless Earbuds',
			sku: 'AUD-WE-001',
			image: 'https://images.unsplash.com/photo-1590658268037-6bf12165a8df?w=100&h=100&fit=crop',
			category: 'Audio',
			views: 12450,
			viewsTrend: 15,
			cartAdds: 1890,
			cartTrend: 8,
			orders: 456,
			ordersTrend: 12,
			revenue: 91200,
			revenueTrend: 18,
			conversionRate: 3.66,
		},
		{
			id: '2',
			name: 'Smart Fitness Tracker',
			sku: 'FIT-TRK-002',
			image: 'https://images.unsplash.com/photo-1575311373937-040b8e1fd5b6?w=100&h=100&fit=crop',
			category: 'Wearables',
			views: 8920,
			viewsTrend: -5,
			cartAdds: 1234,
			cartTrend: -2,
			orders: 312,
			ordersTrend: 3,
			revenue: 46800,
			revenueTrend: 5,
			conversionRate: 3.50,
		},
		{
			id: '3',
			name: 'Portable Power Bank 20K',
			sku: 'PWR-PB-003',
			image: 'https://images.unsplash.com/photo-1609091839311-d5365f9ff1c5?w=100&h=100&fit=crop',
			category: 'Accessories',
			views: 15670,
			viewsTrend: 25,
			cartAdds: 2890,
			cartTrend: 20,
			orders: 892,
			ordersTrend: 28,
			revenue: 35680,
			revenueTrend: 32,
			conversionRate: 5.69,
		},
		{
			id: '4',
			name: 'Mechanical Keyboard RGB',
			sku: 'KEY-MEC-004',
			image: 'https://images.unsplash.com/photo-1511467687858-23d96c32e4ae?w=100&h=100&fit=crop',
			category: 'Peripherals',
			views: 6780,
			viewsTrend: 0,
			cartAdds: 890,
			cartTrend: -8,
			orders: 123,
			ordersTrend: -15,
			revenue: 18450,
			revenueTrend: -12,
			conversionRate: 1.81,
		},
		{
			id: '5',
			name: 'USB-C Docking Station',
			sku: 'DOC-UC-005',
			image: 'https://images.unsplash.com/photo-1625723044792-44de16ccb4e9?w=100&h=100&fit=crop',
			category: 'Accessories',
			views: 4560,
			viewsTrend: 10,
			cartAdds: 678,
			cartTrend: 15,
			orders: 234,
			ordersTrend: 22,
			revenue: 46800,
			revenueTrend: 25,
			conversionRate: 5.13,
		},
	];

	const periods = [
		{ value: '24h', label: '24h' },
		{ value: '7d', label: '7 days' },
		{ value: '30d', label: '30 days' },
		{ value: '90d', label: '90 days' },
	];

	const actions = [
		{ label: 'View Analytics', onClick: (id: string) => console.log('Analytics', id) },
		{ label: 'Edit Product', onClick: (id: string) => console.log('Edit', id) },
		{ label: 'Boost Product', onClick: (id: string) => console.log('Boost', id) },
		{ label: 'Export Data', onClick: (id: string) => console.log('Export', id) },
	];

	const handleSelect = (id: string, checked: boolean) => {
		const newSet = new Set(selectedIds);
		if (checked) newSet.add(id);
		else newSet.delete(id);
		setSelectedIds(newSet);
	};

	const columns = ['Product', 'Views', 'Cart Adds', 'Orders', 'Revenue', 'Conv. Rate'];

	return (
		<section className="@container" data-theme="dashboard">
			<div className="mx-auto max-w-7xl px-4 py-8 @sm:px-6 @2xl:px-8">
				<div className="overflow-hidden rounded-xl border bg-card shadow-sm">
					<Toolbar
						searchPlaceholder="Search products..."
						periods={periods}
						selectedPeriod={period}
						onPeriodChange={setPeriod}
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
