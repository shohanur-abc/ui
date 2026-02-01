'use client';

import * as React from 'react';
import {
	ArrowUpDown,
	TrendingUp,
	TrendingDown,
	BarChart3,
	Calendar,
	Plus,
	X,
	Check,
} from 'lucide-react';

import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Checkbox } from '@/components/ui/checkbox';
import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from '@/components/ui/select';
import {
	Table,
	TableBody,
	TableCell,
	TableHead,
	TableHeader,
	TableRow,
} from '@/components/ui/table';
import { Progress } from '@/components/ui/progress';

interface Product {
	id: string;
	name: string;
	sku: string;
	revenue: number;
	units: number;
	conversion: number;
	rating: number;
}

interface ComparisonMetricProps {
	label: string;
	products: { name: string; value: number; color: string }[];
	format?: 'currency' | 'number' | 'percent';
}

const ComparisonMetric = ({
	label,
	products,
	format = 'number',
}: ComparisonMetricProps) => {
	const maxValue = Math.max(...products.map((p) => p.value));

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

	return (
		<div className="space-y-3">
			<h4 className="text-sm font-medium">{label}</h4>
			{products.map((product) => (
				<div key={product.name} className="space-y-1">
					<div className="flex items-center justify-between text-sm">
						<span className="truncate">{product.name}</span>
						<span className="font-medium">{formatValue(product.value)}</span>
					</div>
					<div className="h-3 overflow-hidden rounded-full bg-muted">
						<div
							className={`h-full rounded-full ${product.color}`}
							style={{ width: `${(product.value / maxValue) * 100}%` }}
						/>
					</div>
				</div>
			))}
		</div>
	);
};

interface ProductSelectorProps {
	products: Product[];
	selectedIds: string[];
	onSelect: (id: string) => void;
	maxSelection: number;
}

const ProductSelector = ({
	products,
	selectedIds,
	onSelect,
	maxSelection,
}: ProductSelectorProps) => (
	<div className="rounded-lg border bg-card">
		<div className="border-b p-4">
			<h3 className="font-semibold">Select Products to Compare</h3>
			<p className="text-sm text-muted-foreground">
				{selectedIds.length} of {maxSelection} selected
			</p>
		</div>
		<div className="max-h-64 overflow-y-auto p-2">
			{products.map((product) => {
				const isSelected = selectedIds.includes(product.id);
				const isDisabled = selectedIds.length >= maxSelection && !isSelected;

				return (
					<button
						key={product.id}
						onClick={() => onSelect(product.id)}
						disabled={isDisabled}
						className={`flex w-full items-center gap-3 rounded-md p-2 text-left transition-colors ${isSelected ? 'bg-primary/10' : 'hover:bg-accent'} ${isDisabled ? 'cursor-not-allowed opacity-50' : ''}`}
					>
						<Checkbox checked={isSelected} disabled={isDisabled} />
						<div className="min-w-0 flex-1">
							<p className="truncate text-sm font-medium">{product.name}</p>
							<p className="text-xs text-muted-foreground">{product.sku}</p>
						</div>
						{isSelected && (
							<Badge variant="secondary" className="shrink-0">
								Selected
							</Badge>
						)}
					</button>
				);
			})}
		</div>
	</div>
);

interface ComparisonTableProps {
	products: Product[];
	metrics: {
		key: keyof Product;
		label: string;
		format?: 'currency' | 'number' | 'percent';
	}[];
}

const ComparisonTable = ({ products, metrics }: ComparisonTableProps) => {
	const formatValue = (val: unknown, format?: string) => {
		const num = val as number;
		switch (format) {
			case 'currency':
				return `$${num.toLocaleString()}`;
			case 'percent':
				return `${num.toFixed(1)}%`;
			default:
				return num.toLocaleString();
		}
	};

	return (
		<div className="rounded-lg border bg-card">
			<Table>
				<TableHeader>
					<TableRow>
						<TableHead>Metric</TableHead>
						{products.map((p) => (
							<TableHead key={p.id} className="text-center">
								{p.name}
							</TableHead>
						))}
					</TableRow>
				</TableHeader>
				<TableBody>
					{metrics.map((metric) => {
						const values = products.map((p) => p[metric.key] as number);
						const maxVal = Math.max(...values);

						return (
							<TableRow key={metric.key}>
								<TableCell className="font-medium">{metric.label}</TableCell>
								{products.map((p) => {
									const val = p[metric.key] as number;
									const isMax = val === maxVal;

									return (
										<TableCell key={p.id} className="text-center">
											<span
												className={isMax ? 'font-bold text-emerald-500' : ''}
											>
												{formatValue(val, metric.format)}
											</span>
											{isMax && (
												<Badge
													variant="secondary"
													className="ml-2 bg-emerald-500/10 text-emerald-500"
												>
													Best
												</Badge>
											)}
										</TableCell>
									);
								})}
							</TableRow>
						);
					})}
				</TableBody>
			</Table>
		</div>
	);
};

interface WinnerSummaryProps {
	products: Product[];
}

const WinnerSummary = ({ products }: WinnerSummaryProps) => {
	const scores = products.map((p) => {
		let score = 0;
		const maxRevenue = Math.max(...products.map((x) => x.revenue));
		const maxUnits = Math.max(...products.map((x) => x.units));
		const maxConversion = Math.max(...products.map((x) => x.conversion));
		const maxRating = Math.max(...products.map((x) => x.rating));

		if (p.revenue === maxRevenue) score += 1;
		if (p.units === maxUnits) score += 1;
		if (p.conversion === maxConversion) score += 1;
		if (p.rating === maxRating) score += 1;

		return { product: p, score };
	});

	const sorted = scores.sort((a, b) => b.score - a.score);

	return (
		<div className="rounded-lg border bg-card p-4">
			<h3 className="mb-4 font-semibold">Winner Summary</h3>
			<div className="space-y-3">
				{sorted.map((item, idx) => (
					<div key={item.product.id} className="flex items-center gap-3">
						<div
							className={`flex size-8 items-center justify-center rounded-full text-sm font-bold ${idx === 0 ? 'bg-amber-500 text-white' : idx === 1 ? 'bg-slate-300 text-slate-700' : idx === 2 ? 'bg-amber-700 text-white' : 'bg-muted text-muted-foreground'}`}
						>
							{idx + 1}
						</div>
						<div className="flex-1">
							<p className="font-medium">{item.product.name}</p>
							<p className="text-sm text-muted-foreground">
								{item.score} wins out of 4 metrics
							</p>
						</div>
						{idx === 0 && (
							<Badge className="gap-1 bg-amber-500">
								<Check className="size-3" />
								Winner
							</Badge>
						)}
					</div>
				))}
			</div>
		</div>
	);
};

export default function Main() {
	const [selectedIds, setSelectedIds] = React.useState<string[]>(['1', '2']);

	const products: Product[] = [
		{
			id: '1',
			name: 'Premium Headphones',
			sku: 'WHP-001',
			revenue: 45678,
			units: 234,
			conversion: 3.2,
			rating: 4.5,
		},
		{
			id: '2',
			name: 'Sport Earbuds',
			sku: 'SEB-002',
			revenue: 32456,
			units: 456,
			conversion: 4.1,
			rating: 4.2,
		},
		{
			id: '3',
			name: 'Studio Monitor',
			sku: 'STM-003',
			revenue: 28900,
			units: 89,
			conversion: 2.8,
			rating: 4.8,
		},
		{
			id: '4',
			name: 'Gaming Headset',
			sku: 'GHS-004',
			revenue: 18765,
			units: 178,
			conversion: 3.5,
			rating: 4.0,
		},
		{
			id: '5',
			name: 'Travel Case',
			sku: 'TRC-005',
			revenue: 8900,
			units: 567,
			conversion: 5.2,
			rating: 4.3,
		},
	];

	const selectedProducts = products.filter((p) => selectedIds.includes(p.id));

	const handleSelect = (id: string) => {
		setSelectedIds((prev) =>
			prev.includes(id) ? prev.filter((x) => x !== id) : [...prev, id],
		);
	};

	const colors = [
		'bg-primary',
		'bg-emerald-500',
		'bg-amber-500',
		'bg-purple-500',
	];

	const metrics: {
		key: keyof Product;
		label: string;
		format?: 'currency' | 'number' | 'percent';
	}[] = [
		{ key: 'revenue', label: 'Revenue', format: 'currency' },
		{ key: 'units', label: 'Units Sold', format: 'number' },
		{ key: 'conversion', label: 'Conversion Rate', format: 'percent' },
		{ key: 'rating', label: 'Rating', format: 'number' },
	];

	return (
		<section className="@container" data-theme="dashboard">
			<div className="mx-auto max-w-5xl space-y-6 px-4 py-8 @sm:px-6 @2xl:px-8">
				<div className="flex items-center gap-3">
					<ArrowUpDown className="size-5" />
					<h2 className="text-xl font-semibold">Product Comparison</h2>
				</div>

				<div className="grid gap-6 @lg:grid-cols-3">
					<ProductSelector
						products={products}
						selectedIds={selectedIds}
						onSelect={handleSelect}
						maxSelection={4}
					/>

					<div className="@lg:col-span-2">
						{selectedProducts.length >= 2 ? (
							<div className="space-y-6">
								<ComparisonTable
									products={selectedProducts}
									metrics={metrics}
								/>

								<div className="grid gap-4 @sm:grid-cols-2">
									<ComparisonMetric
										label="Revenue Comparison"
										format="currency"
										products={selectedProducts.map((p, i) => ({
											name: p.name,
											value: p.revenue,
											color: colors[i],
										}))}
									/>
									<ComparisonMetric
										label="Units Sold"
										products={selectedProducts.map((p, i) => ({
											name: p.name,
											value: p.units,
											color: colors[i],
										}))}
									/>
								</div>

								<WinnerSummary products={selectedProducts} />
							</div>
						) : (
							<div className="flex h-64 items-center justify-center rounded-lg border bg-card">
								<div className="text-center">
									<BarChart3 className="mx-auto mb-3 size-12 text-muted-foreground" />
									<p className="font-medium">Select at least 2 products</p>
									<p className="text-sm text-muted-foreground">
										Choose products to compare their performance
									</p>
								</div>
							</div>
						)}
					</div>
				</div>
			</div>
		</section>
	);
}
