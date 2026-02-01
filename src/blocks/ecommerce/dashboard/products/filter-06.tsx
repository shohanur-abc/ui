'use client';

import * as React from 'react';
import {
	Palette,
	Box,
	Tag,
	Ruler,
	X,
	Check,
	ChevronDown,
	ChevronUp,
	Filter,
} from 'lucide-react';

import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Checkbox } from '@/components/ui/checkbox';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Slider } from '@/components/ui/slider';
import {
	Collapsible,
	CollapsibleContent,
	CollapsibleTrigger,
} from '@/components/ui/collapsible';
import { Separator } from '@/components/ui/separator';

interface ColorOption {
	name: string;
	value: string;
	hex: string;
}

interface ColorFilterProps {
	colors: ColorOption[];
	selected: string[];
	onToggle: (color: string) => void;
}

const ColorFilter = ({ colors, selected, onToggle }: ColorFilterProps) => (
	<div className="space-y-3">
		<Label>Color</Label>
		<div className="flex flex-wrap gap-2">
			{colors.map((color) => (
				<button
					key={color.value}
					onClick={() => onToggle(color.value)}
					className={`group relative size-8 rounded-full transition-transform hover:scale-110 ${selected.includes(color.value) ? 'ring-2 ring-primary ring-offset-2' : ''}`}
					style={{ backgroundColor: color.hex }}
					title={color.name}
				>
					{selected.includes(color.value) && (
						<Check
							className={`absolute inset-0 m-auto size-4 ${color.value === 'white' ? 'text-black' : 'text-white'}`}
						/>
					)}
				</button>
			))}
		</div>
	</div>
);

interface SizeFilterProps {
	sizes: string[];
	selected: string[];
	onToggle: (size: string) => void;
}

const SizeFilter = ({ sizes, selected, onToggle }: SizeFilterProps) => (
	<div className="space-y-3">
		<Label>Size</Label>
		<div className="flex flex-wrap gap-2">
			{sizes.map((size) => (
				<Button
					key={size}
					variant={selected.includes(size) ? 'default' : 'outline'}
					size="sm"
					onClick={() => onToggle(size)}
					className="min-w-[40px]"
				>
					{size}
				</Button>
			))}
		</div>
	</div>
);

interface MaterialFilterProps {
	materials: { value: string; label: string; count: number }[];
	selected: string[];
	onToggle: (material: string) => void;
}

const MaterialFilter = ({
	materials,
	selected,
	onToggle,
}: MaterialFilterProps) => (
	<div className="space-y-3">
		<Label>Material</Label>
		<div className="space-y-2">
			{materials.map((material) => (
				<label
					key={material.value}
					className="flex cursor-pointer items-center gap-2"
				>
					<Checkbox
						checked={selected.includes(material.value)}
						onCheckedChange={() => onToggle(material.value)}
					/>
					<span className="flex-1 text-sm">{material.label}</span>
					<span className="text-sm text-muted-foreground">
						({material.count})
					</span>
				</label>
			))}
		</div>
	</div>
);

interface DimensionsFilterProps {
	dimensions: {
		width: [number, number];
		height: [number, number];
		weight: [number, number];
	};
	values: {
		width: [number, number];
		height: [number, number];
		weight: [number, number];
	};
	onChange: (
		key: 'width' | 'height' | 'weight',
		value: [number, number],
	) => void;
}

const DimensionsFilter = ({
	dimensions,
	values,
	onChange,
}: DimensionsFilterProps) => (
	<div className="space-y-4">
		<Label>Dimensions</Label>
		{Object.entries(dimensions).map(([key, [min, max]]) => (
			<div key={key} className="space-y-2">
				<div className="flex items-center justify-between text-sm">
					<span className="capitalize">{key}</span>
					<span className="text-muted-foreground">
						{values[key as keyof typeof values][0]} -{' '}
						{values[key as keyof typeof values][1]}
						{key === 'weight' ? ' kg' : ' cm'}
					</span>
				</div>
				<Slider
					min={min}
					max={max}
					step={1}
					value={values[key as keyof typeof values]}
					onValueChange={(v) =>
						onChange(
							key as 'width' | 'height' | 'weight',
							v as [number, number],
						)
					}
				/>
			</div>
		))}
	</div>
);

interface AttributeGroupProps {
	title: string;
	icon: React.ElementType;
	isOpen: boolean;
	onToggle: () => void;
	children: React.ReactNode;
	activeCount: number;
}

const AttributeGroup = ({
	title,
	icon: Icon,
	isOpen,
	onToggle,
	children,
	activeCount,
}: AttributeGroupProps) => (
	<Collapsible open={isOpen} onOpenChange={onToggle}>
		<CollapsibleTrigger asChild>
			<button className="flex w-full items-center justify-between rounded-lg border p-3 text-left hover:bg-accent">
				<div className="flex items-center gap-2">
					<Icon className="size-4" />
					<span className="font-medium">{title}</span>
				</div>
				<div className="flex items-center gap-2">
					{activeCount > 0 && <Badge variant="secondary">{activeCount}</Badge>}
					{isOpen ? (
						<ChevronUp className="size-4 text-muted-foreground" />
					) : (
						<ChevronDown className="size-4 text-muted-foreground" />
					)}
				</div>
			</button>
		</CollapsibleTrigger>
		<CollapsibleContent>
			<div className="rounded-b-lg border-x border-b bg-muted/30 p-4">
				{children}
			</div>
		</CollapsibleContent>
	</Collapsible>
);

export default function Main() {
	const [openGroups, setOpenGroups] = React.useState<string[]>([
		'color',
		'size',
	]);
	const [selectedColors, setSelectedColors] = React.useState<string[]>([
		'black',
		'blue',
	]);
	const [selectedSizes, setSelectedSizes] = React.useState<string[]>([
		'M',
		'L',
	]);
	const [selectedMaterials, setSelectedMaterials] = React.useState<string[]>(
		[],
	);
	const [dimensions, setDimensions] = React.useState({
		width: [0, 100] as [number, number],
		height: [0, 50] as [number, number],
		weight: [0, 10] as [number, number],
	});

	const colors: ColorOption[] = [
		{ name: 'Black', value: 'black', hex: '#000000' },
		{ name: 'White', value: 'white', hex: '#FFFFFF' },
		{ name: 'Red', value: 'red', hex: '#EF4444' },
		{ name: 'Blue', value: 'blue', hex: '#3B82F6' },
		{ name: 'Green', value: 'green', hex: '#22C55E' },
		{ name: 'Yellow', value: 'yellow', hex: '#EAB308' },
		{ name: 'Purple', value: 'purple', hex: '#A855F7' },
		{ name: 'Pink', value: 'pink', hex: '#EC4899' },
	];

	const sizes = ['XS', 'S', 'M', 'L', 'XL', 'XXL'];

	const materials = [
		{ value: 'cotton', label: 'Cotton', count: 45 },
		{ value: 'polyester', label: 'Polyester', count: 32 },
		{ value: 'leather', label: 'Leather', count: 18 },
		{ value: 'wool', label: 'Wool', count: 12 },
		{ value: 'silk', label: 'Silk', count: 8 },
	];

	const toggleGroup = (group: string) => {
		setOpenGroups((prev) =>
			prev.includes(group) ? prev.filter((g) => g !== group) : [...prev, group],
		);
	};

	const toggleColor = (color: string) => {
		setSelectedColors((prev) =>
			prev.includes(color) ? prev.filter((c) => c !== color) : [...prev, color],
		);
	};

	const toggleSize = (size: string) => {
		setSelectedSizes((prev) =>
			prev.includes(size) ? prev.filter((s) => s !== size) : [...prev, size],
		);
	};

	const toggleMaterial = (material: string) => {
		setSelectedMaterials((prev) =>
			prev.includes(material)
				? prev.filter((m) => m !== material)
				: [...prev, material],
		);
	};

	const clearAll = () => {
		setSelectedColors([]);
		setSelectedSizes([]);
		setSelectedMaterials([]);
		setDimensions({
			width: [0, 100],
			height: [0, 50],
			weight: [0, 10],
		});
	};

	const totalActive =
		selectedColors.length + selectedSizes.length + selectedMaterials.length;

	return (
		<section className="@container" data-theme="dashboard">
			<div className="mx-auto max-w-md space-y-4 px-4 py-8 @sm:px-6">
				<div className="flex items-center justify-between">
					<div className="flex items-center gap-3">
						<Filter className="size-5" />
						<h2 className="text-xl font-semibold">Attribute Filters</h2>
					</div>
					{totalActive > 0 && (
						<Button variant="ghost" size="sm" onClick={clearAll}>
							Clear ({totalActive})
						</Button>
					)}
				</div>

				<div className="space-y-3">
					<AttributeGroup
						title="Color"
						icon={Palette}
						isOpen={openGroups.includes('color')}
						onToggle={() => toggleGroup('color')}
						activeCount={selectedColors.length}
					>
						<ColorFilter
							colors={colors}
							selected={selectedColors}
							onToggle={toggleColor}
						/>
					</AttributeGroup>

					<AttributeGroup
						title="Size"
						icon={Ruler}
						isOpen={openGroups.includes('size')}
						onToggle={() => toggleGroup('size')}
						activeCount={selectedSizes.length}
					>
						<SizeFilter
							sizes={sizes}
							selected={selectedSizes}
							onToggle={toggleSize}
						/>
					</AttributeGroup>

					<AttributeGroup
						title="Material"
						icon={Box}
						isOpen={openGroups.includes('material')}
						onToggle={() => toggleGroup('material')}
						activeCount={selectedMaterials.length}
					>
						<MaterialFilter
							materials={materials}
							selected={selectedMaterials}
							onToggle={toggleMaterial}
						/>
					</AttributeGroup>

					<AttributeGroup
						title="Dimensions"
						icon={Ruler}
						isOpen={openGroups.includes('dimensions')}
						onToggle={() => toggleGroup('dimensions')}
						activeCount={0}
					>
						<DimensionsFilter
							dimensions={{
								width: [0, 100],
								height: [0, 50],
								weight: [0, 10],
							}}
							values={dimensions}
							onChange={(key, value) =>
								setDimensions((prev) => ({ ...prev, [key]: value }))
							}
						/>
					</AttributeGroup>
				</div>

				{totalActive > 0 && (
					<>
						<Separator />
						<div>
							<p className="mb-2 text-sm text-muted-foreground">
								Active Filters:
							</p>
							<div className="flex flex-wrap gap-2">
								{selectedColors.map((c) => {
									const color = colors.find((x) => x.value === c);
									return (
										<Badge key={c} variant="secondary" className="gap-1">
											<span
												className="size-3 rounded-full"
												style={{ backgroundColor: color?.hex }}
											/>
											{color?.name}
											<button onClick={() => toggleColor(c)}>
												<X className="size-3" />
											</button>
										</Badge>
									);
								})}
								{selectedSizes.map((s) => (
									<Badge key={s} variant="secondary" className="gap-1">
										{s}
										<button onClick={() => toggleSize(s)}>
											<X className="size-3" />
										</button>
									</Badge>
								))}
								{selectedMaterials.map((m) => {
									const material = materials.find((x) => x.value === m);
									return (
										<Badge key={m} variant="secondary" className="gap-1">
											{material?.label}
											<button onClick={() => toggleMaterial(m)}>
												<X className="size-3" />
											</button>
										</Badge>
									);
								})}
							</div>
						</div>
					</>
				)}

				<Button className="w-full gap-2">
					<Filter className="size-4" />
					Apply Filters {totalActive > 0 && `(${totalActive})`}
				</Button>
			</div>
		</section>
	);
}
