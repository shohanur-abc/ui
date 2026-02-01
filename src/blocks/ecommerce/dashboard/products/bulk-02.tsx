'use client';

import * as React from 'react';
import {
	DollarSign,
	Percent,
	ArrowUp,
	ArrowDown,
	Calculator,
	Check,
	X,
	AlertCircle,
} from 'lucide-react';

import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from '@/components/ui/select';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Separator } from '@/components/ui/separator';

interface ProductPreview {
	id: string;
	name: string;
	sku: string;
	currentPrice: number;
	newPrice: number;
	change: number;
	changePercent: number;
}

interface PriceChangeInputProps {
	type: 'fixed' | 'percent';
	value: number;
	onChange: (value: number) => void;
	direction: 'increase' | 'decrease' | 'set';
	onDirectionChange: (direction: 'increase' | 'decrease' | 'set') => void;
	labels: {
		fixed: string;
		percent: string;
		increase: string;
		decrease: string;
		setTo: string;
	};
}

const PriceChangeInput = ({
	type,
	value,
	onChange,
	direction,
	onDirectionChange,
	labels,
}: PriceChangeInputProps) => (
	<div className="space-y-4">
		<div className="flex gap-2">
			<Button
				variant={direction === 'increase' ? 'default' : 'outline'}
				size="sm"
				onClick={() => onDirectionChange('increase')}
				className="flex-1 gap-1"
			>
				<ArrowUp className="size-3.5" />
				{labels.increase}
			</Button>
			<Button
				variant={direction === 'decrease' ? 'default' : 'outline'}
				size="sm"
				onClick={() => onDirectionChange('decrease')}
				className="flex-1 gap-1"
			>
				<ArrowDown className="size-3.5" />
				{labels.decrease}
			</Button>
			<Button
				variant={direction === 'set' ? 'default' : 'outline'}
				size="sm"
				onClick={() => onDirectionChange('set')}
				className="flex-1"
			>
				{labels.setTo}
			</Button>
		</div>

		<div className="flex gap-2">
			<div className="flex-1">
				<div className="relative">
					{type === 'fixed' ? (
						<DollarSign className="absolute left-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" />
					) : (
						<Percent className="absolute right-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" />
					)}
					<Input
						type="number"
						value={value}
						onChange={(e) => onChange(Number(e.target.value))}
						className={type === 'fixed' ? 'pl-9' : 'pr-9'}
						placeholder="0"
					/>
				</div>
			</div>
			<Select value={type} onValueChange={() => {}}>
				<SelectTrigger className="w-32">
					<SelectValue />
				</SelectTrigger>
				<SelectContent>
					<SelectItem value="fixed">{labels.fixed}</SelectItem>
					<SelectItem value="percent">{labels.percent}</SelectItem>
				</SelectContent>
			</Select>
		</div>
	</div>
);

interface PreviewRowProps {
	product: ProductPreview;
}

const PreviewRow = ({ product }: PreviewRowProps) => {
	const isIncrease = product.change > 0;
	const isDecrease = product.change < 0;

	return (
		<div className="flex items-center gap-4 rounded-lg border bg-card p-3">
			<div className="size-10 rounded-md bg-muted" />
			<div className="min-w-0 flex-1">
				<p className="truncate text-sm font-medium">{product.name}</p>
				<p className="text-xs text-muted-foreground">{product.sku}</p>
			</div>
			<div className="text-right">
				<p className="text-sm text-muted-foreground line-through">
					${product.currentPrice.toFixed(2)}
				</p>
			</div>
			<div className="text-right">
				<p className="font-bold">${product.newPrice.toFixed(2)}</p>
				<p
					className={`flex items-center justify-end gap-1 text-xs ${isIncrease ? 'text-emerald-500' : isDecrease ? 'text-red-500' : 'text-muted-foreground'}`}
				>
					{isIncrease ? (
						<ArrowUp className="size-3" />
					) : isDecrease ? (
						<ArrowDown className="size-3" />
					) : null}
					{isIncrease ? '+' : ''}
					{product.changePercent.toFixed(1)}%
				</p>
			</div>
		</div>
	);
};

interface SummaryCardProps {
	selectedCount: number;
	avgChange: number;
	avgChangePercent: number;
	minPrice: number;
	maxPrice: number;
	labels: { products: string; avgChange: string; priceRange: string };
}

const SummaryCard = ({
	selectedCount,
	avgChange,
	avgChangePercent,
	minPrice,
	maxPrice,
	labels,
}: SummaryCardProps) => (
	<div className="grid gap-4 rounded-lg border bg-muted/30 p-4 @sm:grid-cols-3">
		<div className="text-center">
			<p className="text-2xl font-bold">{selectedCount}</p>
			<p className="text-sm text-muted-foreground">{labels.products}</p>
		</div>
		<div className="text-center">
			<p
				className={`text-2xl font-bold ${avgChange >= 0 ? 'text-emerald-500' : 'text-red-500'}`}
			>
				{avgChange >= 0 ? '+' : ''}
				{avgChangePercent.toFixed(1)}%
			</p>
			<p className="text-sm text-muted-foreground">{labels.avgChange}</p>
		</div>
		<div className="text-center">
			<p className="text-2xl font-bold">
				${minPrice.toFixed(0)} - ${maxPrice.toFixed(0)}
			</p>
			<p className="text-sm text-muted-foreground">{labels.priceRange}</p>
		</div>
	</div>
);

interface RoundingOptionsProps {
	rounding: 'none' | '0.99' | '0.95' | '0.00';
	onChange: (rounding: 'none' | '0.99' | '0.95' | '0.00') => void;
	label: string;
}

const RoundingOptions = ({
	rounding,
	onChange,
	label,
}: RoundingOptionsProps) => (
	<div className="space-y-2">
		<Label className="text-sm">{label}</Label>
		<div className="flex gap-2">
			{(['none', '0.99', '0.95', '0.00'] as const).map((opt) => (
				<Button
					key={opt}
					variant={rounding === opt ? 'default' : 'outline'}
					size="sm"
					onClick={() => onChange(opt)}
				>
					{opt === 'none' ? 'None' : `$X.${opt.slice(-2)}`}
				</Button>
			))}
		</div>
	</div>
);

export default function Main() {
	const [direction, setDirection] = React.useState<
		'increase' | 'decrease' | 'set'
	>('increase');
	const [value, setValue] = React.useState(10);
	const [type] = React.useState<'fixed' | 'percent'>('percent');
	const [rounding, setRounding] = React.useState<
		'none' | '0.99' | '0.95' | '0.00'
	>('0.99');

	const products: ProductPreview[] = [
		{
			id: '1',
			name: 'Wireless Headphones Pro',
			sku: 'WHP-001',
			currentPrice: 149.99,
			newPrice: 164.99,
			change: 15,
			changePercent: 10,
		},
		{
			id: '2',
			name: 'Mechanical Keyboard RGB',
			sku: 'MKB-002',
			currentPrice: 199.99,
			newPrice: 219.99,
			change: 20,
			changePercent: 10,
		},
		{
			id: '3',
			name: 'Gaming Mouse Elite',
			sku: 'GME-003',
			currentPrice: 79.99,
			newPrice: 87.99,
			change: 8,
			changePercent: 10,
		},
		{
			id: '4',
			name: 'USB-C Hub 7-in-1',
			sku: 'UCH-004',
			currentPrice: 49.99,
			newPrice: 54.99,
			change: 5,
			changePercent: 10,
		},
	];

	return (
		<section className="@container" data-theme="dashboard">
			<div className="mx-auto max-w-2xl space-y-6 px-4 py-8 @sm:px-6">
				<div className="rounded-lg border bg-card p-6">
					<h2 className="mb-4 font-semibold">Bulk Price Update</h2>
					<p className="mb-6 text-sm text-muted-foreground">
						Update prices for 4 selected products
					</p>

					<PriceChangeInput
						type={type}
						value={value}
						onChange={setValue}
						direction={direction}
						onDirectionChange={setDirection}
						labels={{
							fixed: 'Fixed Amount',
							percent: 'Percentage',
							increase: 'Increase',
							decrease: 'Decrease',
							setTo: 'Set to',
						}}
					/>

					<Separator className="my-6" />

					<RoundingOptions
						rounding={rounding}
						onChange={setRounding}
						label="Price Rounding"
					/>
				</div>

				<SummaryCard
					selectedCount={products.length}
					avgChange={12}
					avgChangePercent={10}
					minPrice={54.99}
					maxPrice={219.99}
					labels={{
						products: 'Products',
						avgChange: 'Avg Change',
						priceRange: 'Price Range',
					}}
				/>

				<div className="space-y-3">
					<h3 className="font-medium">Preview Changes</h3>
					<div className="space-y-2">
						{products.map((product) => (
							<PreviewRow key={product.id} product={product} />
						))}
					</div>
				</div>

				<div className="flex gap-3">
					<Button variant="outline" className="flex-1 gap-2">
						<X className="size-4" />
						Cancel
					</Button>
					<Button className="flex-1 gap-2">
						<Check className="size-4" />
						Apply Changes
					</Button>
				</div>
			</div>
		</section>
	);
}
