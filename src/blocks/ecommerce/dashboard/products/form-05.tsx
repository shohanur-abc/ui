'use client';

import * as React from 'react';
import {
	DollarSign,
	Percent,
	TrendingUp,
	TrendingDown,
	Calendar,
	Clock,
	AlertTriangle,
	Calculator,
	Layers,
} from 'lucide-react';

import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Switch } from '@/components/ui/switch';
import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from '@/components/ui/select';
import { Separator } from '@/components/ui/separator';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

interface PricingData {
	basePrice: number;
	costPrice: number;
	salePrice: number | null;
	taxRate: number;
	isSaleActive: boolean;
	saleDates: { start: string; end: string };
}

interface PricingMetricProps {
	label: string;
	value: string;
	subtext?: string;
	icon: React.ElementType;
	trend?: 'up' | 'down' | null;
}

const PricingMetric = ({
	label,
	value,
	subtext,
	icon: Icon,
	trend,
}: PricingMetricProps) => (
	<div className="rounded-lg border bg-card p-4">
		<div className="flex items-start justify-between">
			<div className="flex size-10 items-center justify-center rounded-lg bg-primary/10">
				<Icon className="size-5 text-primary" />
			</div>
			{trend && (
				<Badge
					variant={trend === 'up' ? 'default' : 'destructive'}
					className="gap-1"
				>
					{trend === 'up' ? (
						<TrendingUp className="size-3" />
					) : (
						<TrendingDown className="size-3" />
					)}
					{trend === 'up' ? '+' : '-'}5%
				</Badge>
			)}
		</div>
		<div className="mt-3">
			<span className="text-2xl font-bold">{value}</span>
			{subtext && <p className="text-sm text-muted-foreground">{subtext}</p>}
		</div>
		<p className="mt-1 text-sm text-muted-foreground">{label}</p>
	</div>
);

interface PriceInputProps {
	label: string;
	value: number;
	onChange: (value: number) => void;
	prefix?: string;
	suffix?: string;
	helperText?: string;
}

const PriceInput = ({
	label,
	value,
	onChange,
	prefix = '$',
	suffix,
	helperText,
}: PriceInputProps) => (
	<div className="space-y-2">
		<Label>{label}</Label>
		<div className="relative">
			{prefix && (
				<span className="absolute left-3 top-1/2 -translate-y-1/2 text-sm text-muted-foreground">
					{prefix}
				</span>
			)}
			<Input
				type="number"
				value={value}
				onChange={(e) => onChange(parseFloat(e.target.value) || 0)}
				className={prefix ? 'pl-7' : '' + suffix ? ' pr-12' : ''}
			/>
			{suffix && (
				<span className="absolute right-3 top-1/2 -translate-y-1/2 text-sm text-muted-foreground">
					{suffix}
				</span>
			)}
		</div>
		{helperText && (
			<p className="text-xs text-muted-foreground">{helperText}</p>
		)}
	</div>
);

interface TierPricingProps {
	tiers: { minQty: number; price: number }[];
	onUpdate: (tiers: { minQty: number; price: number }[]) => void;
}

const TierPricing = ({ tiers, onUpdate }: TierPricingProps) => {
	const addTier = () => {
		const lastQty = tiers[tiers.length - 1]?.minQty || 0;
		const lastPrice = tiers[tiers.length - 1]?.price || 0;
		onUpdate([...tiers, { minQty: lastQty + 10, price: lastPrice * 0.9 }]);
	};

	const updateTier = (
		index: number,
		updates: Partial<{ minQty: number; price: number }>,
	) => {
		const newTiers = [...tiers];
		newTiers[index] = { ...newTiers[index], ...updates };
		onUpdate(newTiers);
	};

	const removeTier = (index: number) => {
		onUpdate(tiers.filter((_, i) => i !== index));
	};

	return (
		<Card>
			<CardHeader className="pb-3">
				<CardTitle className="flex items-center gap-2 text-base">
					<Layers className="size-4" />
					Quantity Discounts
				</CardTitle>
			</CardHeader>
			<CardContent>
				<div className="space-y-2">
					{tiers.map((tier, idx) => (
						<div key={idx} className="flex items-center gap-2">
							<Input
								type="number"
								value={tier.minQty}
								onChange={(e) =>
									updateTier(idx, { minQty: parseInt(e.target.value) || 0 })
								}
								className="w-20"
								placeholder="Qty"
							/>
							<span className="text-sm text-muted-foreground">+</span>
							<div className="relative flex-1">
								<span className="absolute left-2 top-1/2 -translate-y-1/2 text-sm text-muted-foreground">
									$
								</span>
								<Input
									type="number"
									value={tier.price}
									onChange={(e) =>
										updateTier(idx, { price: parseFloat(e.target.value) || 0 })
									}
									className="pl-6"
								/>
							</div>
							<Button
								variant="ghost"
								size="sm"
								onClick={() => removeTier(idx)}
								disabled={tiers.length <= 1}
							>
								×
							</Button>
						</div>
					))}
				</div>
				<Button variant="outline" size="sm" onClick={addTier} className="mt-3">
					Add Tier
				</Button>
			</CardContent>
		</Card>
	);
};

interface SaleConfigProps {
	isActive: boolean;
	salePrice: number | null;
	dates: { start: string; end: string };
	onToggle: (active: boolean) => void;
	onPriceChange: (price: number) => void;
	onDatesChange: (dates: { start: string; end: string }) => void;
}

const SaleConfig = ({
	isActive,
	salePrice,
	dates,
	onToggle,
	onPriceChange,
	onDatesChange,
}: SaleConfigProps) => (
	<Card>
		<CardHeader className="pb-3">
			<div className="flex items-center justify-between">
				<CardTitle className="flex items-center gap-2 text-base">
					<Percent className="size-4" />
					Sale Price
				</CardTitle>
				<Switch checked={isActive} onCheckedChange={onToggle} />
			</div>
		</CardHeader>
		{isActive && (
			<CardContent className="space-y-4">
				<PriceInput
					label="Sale Price"
					value={salePrice || 0}
					onChange={onPriceChange}
				/>
				<div className="grid gap-4 @sm:grid-cols-2">
					<div className="space-y-2">
						<Label>Start Date</Label>
						<Input
							type="datetime-local"
							value={dates.start}
							onChange={(e) =>
								onDatesChange({ ...dates, start: e.target.value })
							}
						/>
					</div>
					<div className="space-y-2">
						<Label>End Date</Label>
						<Input
							type="datetime-local"
							value={dates.end}
							onChange={(e) => onDatesChange({ ...dates, end: e.target.value })}
						/>
					</div>
				</div>
				<div className="flex items-center gap-2 rounded-md bg-amber-500/10 p-3 text-amber-500">
					<AlertTriangle className="size-4" />
					<span className="text-sm">
						Sale is scheduled and will activate automatically
					</span>
				</div>
			</CardContent>
		)}
	</Card>
);

export default function Main() {
	const [pricing, setPricing] = React.useState<PricingData>({
		basePrice: 99.99,
		costPrice: 45.0,
		salePrice: 79.99,
		taxRate: 8.25,
		isSaleActive: true,
		saleDates: {
			start: '2024-03-01T00:00',
			end: '2024-03-31T23:59',
		},
	});

	const [tiers, setTiers] = React.useState([
		{ minQty: 1, price: 99.99 },
		{ minQty: 10, price: 89.99 },
		{ minQty: 25, price: 79.99 },
		{ minQty: 50, price: 69.99 },
	]);

	const margin =
		((pricing.basePrice - pricing.costPrice) / pricing.basePrice) * 100;
	const profit = pricing.basePrice - pricing.costPrice;
	const priceWithTax = pricing.basePrice * (1 + pricing.taxRate / 100);

	return (
		<section className="@container" data-theme="dashboard">
			<div className="mx-auto max-w-4xl space-y-6 px-4 py-8 @sm:px-6 @2xl:px-8">
				<div className="flex items-center gap-3">
					<DollarSign className="size-5" />
					<h2 className="text-xl font-semibold">Pricing Manager</h2>
				</div>

				<div className="grid gap-4 @sm:grid-cols-2 @lg:grid-cols-4">
					<PricingMetric
						label="Base Price"
						value={`$${pricing.basePrice.toFixed(2)}`}
						icon={DollarSign}
					/>
					<PricingMetric
						label="Profit Margin"
						value={`${margin.toFixed(1)}%`}
						subtext={`$${profit.toFixed(2)} per unit`}
						icon={Percent}
						trend="up"
					/>
					<PricingMetric
						label="Price with Tax"
						value={`$${priceWithTax.toFixed(2)}`}
						subtext={`${pricing.taxRate}% tax`}
						icon={Calculator}
					/>
					<PricingMetric
						label="Sale Price"
						value={
							pricing.isSaleActive ? `$${pricing.salePrice?.toFixed(2)}` : 'N/A'
						}
						subtext={pricing.isSaleActive ? '20% off' : 'No active sale'}
						icon={Percent}
						trend={pricing.isSaleActive ? 'down' : null}
					/>
				</div>

				<div className="grid gap-6 @lg:grid-cols-2">
					<Card>
						<CardHeader className="pb-3">
							<CardTitle className="text-base">Base Pricing</CardTitle>
						</CardHeader>
						<CardContent className="space-y-4">
							<PriceInput
								label="Cost Price"
								value={pricing.costPrice}
								onChange={(v) => setPricing((p) => ({ ...p, costPrice: v }))}
								helperText="Your cost to acquire this product"
							/>
							<PriceInput
								label="Base Price"
								value={pricing.basePrice}
								onChange={(v) => setPricing((p) => ({ ...p, basePrice: v }))}
								helperText="Regular selling price"
							/>
							<PriceInput
								label="Tax Rate"
								value={pricing.taxRate}
								onChange={(v) => setPricing((p) => ({ ...p, taxRate: v }))}
								prefix=""
								suffix="%"
								helperText="Applied tax percentage"
							/>
						</CardContent>
					</Card>

					<SaleConfig
						isActive={pricing.isSaleActive}
						salePrice={pricing.salePrice}
						dates={pricing.saleDates}
						onToggle={(v) => setPricing((p) => ({ ...p, isSaleActive: v }))}
						onPriceChange={(v) => setPricing((p) => ({ ...p, salePrice: v }))}
						onDatesChange={(v) => setPricing((p) => ({ ...p, saleDates: v }))}
					/>
				</div>

				<TierPricing tiers={tiers} onUpdate={setTiers} />

				<div className="flex justify-end gap-2">
					<Button variant="outline">Cancel</Button>
					<Button>Save Pricing</Button>
				</div>
			</div>
		</section>
	);
}
