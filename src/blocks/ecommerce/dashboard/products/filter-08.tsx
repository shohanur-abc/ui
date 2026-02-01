'use client';

import * as React from 'react';
import {
	DollarSign,
	SlidersHorizontal,
	ChevronDown,
	ChevronUp,
	X,
	Check,
} from 'lucide-react';

import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Slider } from '@/components/ui/slider';
import {
	Popover,
	PopoverContent,
	PopoverTrigger,
} from '@/components/ui/popover';
import {
	Collapsible,
	CollapsibleContent,
	CollapsibleTrigger,
} from '@/components/ui/collapsible';

interface PriceRange {
	min: number;
	max: number;
}

interface PricePreset {
	label: string;
	min: number;
	max: number;
}

interface PriceSliderProps {
	value: PriceRange;
	min: number;
	max: number;
	onChange: (value: PriceRange) => void;
}

const PriceSlider = ({ value, min, max, onChange }: PriceSliderProps) => (
	<div className="space-y-4">
		<Slider
			value={[value.min, value.max]}
			onValueChange={(v) => onChange({ min: v[0], max: v[1] })}
			min={min}
			max={max}
			step={1}
			className="w-full"
		/>
		<div className="flex items-center gap-2">
			<div className="relative flex-1">
				<span className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground">
					$
				</span>
				<Input
					type="number"
					value={value.min}
					onChange={(e) =>
						onChange({ ...value, min: parseInt(e.target.value) || 0 })
					}
					className="pl-7"
					min={min}
					max={value.max}
				/>
			</div>
			<span className="text-muted-foreground">to</span>
			<div className="relative flex-1">
				<span className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground">
					$
				</span>
				<Input
					type="number"
					value={value.max}
					onChange={(e) =>
						onChange({ ...value, max: parseInt(e.target.value) || max })
					}
					className="pl-7"
					min={value.min}
					max={max}
				/>
			</div>
		</div>
	</div>
);

interface PricePresetsProps {
	presets: PricePreset[];
	activeRange: PriceRange;
	onSelect: (range: PriceRange) => void;
}

const PricePresets = ({
	presets,
	activeRange,
	onSelect,
}: PricePresetsProps) => (
	<div className="flex flex-wrap gap-2">
		{presets.map((preset) => {
			const isActive =
				activeRange.min === preset.min && activeRange.max === preset.max;
			return (
				<Button
					key={preset.label}
					variant={isActive ? 'default' : 'outline'}
					size="sm"
					onClick={() => onSelect({ min: preset.min, max: preset.max })}
					className="gap-1"
				>
					{isActive && <Check className="size-3" />}
					{preset.label}
				</Button>
			);
		})}
	</div>
);

interface PriceHistogramProps {
	distribution: { range: string; count: number }[];
	maxCount: number;
}

const PriceHistogram = ({ distribution, maxCount }: PriceHistogramProps) => (
	<div className="flex items-end gap-1">
		{distribution.map((item) => (
			<div key={item.range} className="group flex flex-1 flex-col items-center">
				<span className="mb-1 hidden text-xs text-muted-foreground group-hover:block">
					{item.count}
				</span>
				<div
					className="w-full rounded-t bg-primary/30 transition-colors hover:bg-primary/50"
					style={{ height: `${(item.count / maxCount) * 60}px` }}
				/>
			</div>
		))}
	</div>
);

interface PriceRangeFilterProps {
	priceRange: PriceRange;
	minPrice: number;
	maxPrice: number;
	presets: PricePreset[];
	distribution: { range: string; count: number }[];
	onRangeChange: (range: PriceRange) => void;
	onClear: () => void;
}

const PriceRangeFilter = ({
	priceRange,
	minPrice,
	maxPrice,
	presets,
	distribution,
	onRangeChange,
	onClear,
}: PriceRangeFilterProps) => {
	const [isOpen, setIsOpen] = React.useState(true);
	const maxCount = Math.max(...distribution.map((d) => d.count));
	const isFiltered = priceRange.min > minPrice || priceRange.max < maxPrice;

	return (
		<div className="rounded-lg border bg-card">
			<Collapsible open={isOpen} onOpenChange={setIsOpen}>
				<CollapsibleTrigger asChild>
					<button className="flex w-full items-center justify-between p-4 hover:bg-accent/50">
						<div className="flex items-center gap-2">
							<DollarSign className="size-4" />
							<span className="font-medium">Price Range</span>
							{isFiltered && (
								<Badge variant="secondary" className="ml-2">
									${priceRange.min} - ${priceRange.max}
								</Badge>
							)}
						</div>
						{isOpen ? (
							<ChevronUp className="size-4" />
						) : (
							<ChevronDown className="size-4" />
						)}
					</button>
				</CollapsibleTrigger>
				<CollapsibleContent>
					<div className="space-y-4 border-t p-4">
						<PriceHistogram distribution={distribution} maxCount={maxCount} />
						<PriceSlider
							value={priceRange}
							min={minPrice}
							max={maxPrice}
							onChange={onRangeChange}
						/>
						<PricePresets
							presets={presets}
							activeRange={priceRange}
							onSelect={onRangeChange}
						/>
						{isFiltered && (
							<Button
								variant="ghost"
								size="sm"
								onClick={onClear}
								className="w-full gap-2"
							>
								<X className="size-4" />
								Clear Price Filter
							</Button>
						)}
					</div>
				</CollapsibleContent>
			</Collapsible>
		</div>
	);
};

interface CompactPriceFilterProps {
	priceRange: PriceRange;
	minPrice: number;
	maxPrice: number;
	presets: PricePreset[];
	onRangeChange: (range: PriceRange) => void;
}

const CompactPriceFilter = ({
	priceRange,
	minPrice,
	maxPrice,
	presets,
	onRangeChange,
}: CompactPriceFilterProps) => {
	const isFiltered = priceRange.min > minPrice || priceRange.max < maxPrice;

	return (
		<Popover>
			<PopoverTrigger asChild>
				<Button variant="outline" className="gap-2">
					<DollarSign className="size-4" />
					{isFiltered ? `$${priceRange.min} - $${priceRange.max}` : 'Price'}
					{isFiltered && (
						<Badge variant="secondary" className="ml-1 size-5 p-0">
							1
						</Badge>
					)}
				</Button>
			</PopoverTrigger>
			<PopoverContent className="w-80">
				<div className="space-y-4">
					<div className="flex items-center justify-between">
						<Label>Price Range</Label>
						{isFiltered && (
							<Button
								variant="ghost"
								size="sm"
								onClick={() => onRangeChange({ min: minPrice, max: maxPrice })}
							>
								Reset
							</Button>
						)}
					</div>
					<PriceSlider
						value={priceRange}
						min={minPrice}
						max={maxPrice}
						onChange={onRangeChange}
					/>
					<PricePresets
						presets={presets}
						activeRange={priceRange}
						onSelect={onRangeChange}
					/>
				</div>
			</PopoverContent>
		</Popover>
	);
};

export default function Main() {
	const [priceRange, setPriceRange] = React.useState<PriceRange>({
		min: 0,
		max: 500,
	});

	const minPrice = 0;
	const maxPrice = 500;

	const presets: PricePreset[] = [
		{ label: 'Under $50', min: 0, max: 50 },
		{ label: '$50 - $100', min: 50, max: 100 },
		{ label: '$100 - $200', min: 100, max: 200 },
		{ label: '$200+', min: 200, max: 500 },
	];

	const distribution = [
		{ range: '0-50', count: 45 },
		{ range: '50-100', count: 78 },
		{ range: '100-150', count: 92 },
		{ range: '150-200', count: 65 },
		{ range: '200-250', count: 43 },
		{ range: '250-300', count: 28 },
		{ range: '300-350', count: 15 },
		{ range: '350-400', count: 8 },
		{ range: '400-450', count: 5 },
		{ range: '450-500', count: 3 },
	];

	return (
		<section className="@container" data-theme="dashboard">
			<div className="mx-auto max-w-2xl space-y-6 px-4 py-8 @sm:px-6">
				<div className="flex items-center gap-3">
					<SlidersHorizontal className="size-5" />
					<h2 className="text-xl font-semibold">Price Range Filters</h2>
				</div>

				<PriceRangeFilter
					priceRange={priceRange}
					minPrice={minPrice}
					maxPrice={maxPrice}
					presets={presets}
					distribution={distribution}
					onRangeChange={setPriceRange}
					onClear={() => setPriceRange({ min: minPrice, max: maxPrice })}
				/>

				<div className="flex items-center gap-4">
					<span className="text-sm font-medium">Compact version:</span>
					<CompactPriceFilter
						priceRange={priceRange}
						minPrice={minPrice}
						maxPrice={maxPrice}
						presets={presets}
						onRangeChange={setPriceRange}
					/>
				</div>

				<div className="rounded-lg border bg-muted/30 p-4">
					<h3 className="mb-2 font-medium">Active Filter</h3>
					<p className="text-sm text-muted-foreground">
						Price: ${priceRange.min} - ${priceRange.max}
					</p>
				</div>
			</div>
		</section>
	);
}
