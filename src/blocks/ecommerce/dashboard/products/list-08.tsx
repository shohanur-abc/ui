'use client';

import * as React from 'react';
import {
	Package,
	Box,
	Ruler,
	Weight,
	Truck,
	MapPin,
	DollarSign,
	MoreHorizontal,
	Pencil,
	Copy,
} from 'lucide-react';

import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuItem,
	DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Separator } from '@/components/ui/separator';

interface ShippingZone {
	name: string;
	rate: number;
	estimatedDays: string;
}

interface ProductShipping {
	id: string;
	name: string;
	sku: string;
	image: string;
	weight: { value: number; unit: string };
	dimensions: { length: number; width: number; height: number; unit: string };
	packageType: 'box' | 'envelope' | 'tube' | 'custom';
	shippingClass: 'standard' | 'fragile' | 'oversized' | 'hazmat';
	zones: ShippingZone[];
	freeShippingThreshold?: number;
	handlingFee: number;
}

interface DimensionDisplayProps {
	dimensions: { length: number; width: number; height: number; unit: string };
	label: string;
}

const DimensionDisplay = ({ dimensions, label }: DimensionDisplayProps) => (
	<div className="flex items-center gap-2 text-sm">
		<Ruler className="size-4 text-muted-foreground" />
		<span className="text-muted-foreground">{label}:</span>
		<span className="font-medium">
			{dimensions.length} × {dimensions.width} × {dimensions.height}{' '}
			{dimensions.unit}
		</span>
	</div>
);

interface WeightDisplayProps {
	weight: { value: number; unit: string };
	label: string;
}

const WeightDisplay = ({ weight, label }: WeightDisplayProps) => (
	<div className="flex items-center gap-2 text-sm">
		<Weight className="size-4 text-muted-foreground" />
		<span className="text-muted-foreground">{label}:</span>
		<span className="font-medium">
			{weight.value} {weight.unit}
		</span>
	</div>
);

interface PackageTypeBadgeProps {
	type: 'box' | 'envelope' | 'tube' | 'custom';
	labels: Record<'box' | 'envelope' | 'tube' | 'custom', string>;
}

const PackageTypeBadge = ({ type, labels }: PackageTypeBadgeProps) => {
	const icons = { box: Box, envelope: Package, tube: Package, custom: Package };
	const Icon = icons[type];

	return (
		<Badge variant="outline" className="gap-1">
			<Icon className="size-3" />
			{labels[type]}
		</Badge>
	);
};

interface ShippingClassBadgeProps {
	shippingClass: 'standard' | 'fragile' | 'oversized' | 'hazmat';
	labels: Record<'standard' | 'fragile' | 'oversized' | 'hazmat', string>;
}

const ShippingClassBadge = ({
	shippingClass,
	labels,
}: ShippingClassBadgeProps) => {
	const config = {
		standard: 'bg-blue-500/10 text-blue-500',
		fragile: 'bg-amber-500/10 text-amber-500',
		oversized: 'bg-purple-500/10 text-purple-500',
		hazmat: 'bg-red-500/10 text-red-500',
	};

	return (
		<Badge className={config[shippingClass]}>{labels[shippingClass]}</Badge>
	);
};

interface ShippingZonesProps {
	zones: ShippingZone[];
	freeThreshold?: number;
	handlingFee: number;
	labels: { zones: string; free: string; handling: string };
}

const ShippingZones = ({
	zones,
	freeThreshold,
	handlingFee,
	labels,
}: ShippingZonesProps) => (
	<div className="space-y-2">
		<div className="flex items-center justify-between text-sm">
			<span className="font-medium">{labels.zones}</span>
			{freeThreshold && (
				<Badge variant="secondary" className="text-xs">
					{labels.free} over ${freeThreshold}
				</Badge>
			)}
		</div>
		<div className="grid gap-2 @sm:grid-cols-2 @lg:grid-cols-4">
			{zones.map((zone) => (
				<div
					key={zone.name}
					className="rounded-lg border bg-muted/30 p-2 text-center"
				>
					<div className="flex items-center justify-center gap-1 text-xs text-muted-foreground">
						<MapPin className="size-3" />
						{zone.name}
					</div>
					<div className="text-lg font-bold">${zone.rate.toFixed(2)}</div>
					<div className="text-xs text-muted-foreground">
						{zone.estimatedDays}
					</div>
				</div>
			))}
		</div>
		{handlingFee > 0 && (
			<div className="flex items-center gap-2 text-sm text-muted-foreground">
				<DollarSign className="size-3" />
				{labels.handling}: ${handlingFee.toFixed(2)}
			</div>
		)}
	</div>
);

interface ProductRowProps {
	product: ProductShipping;
	actions: {
		label: string;
		icon: React.ElementType;
		onClick: (id: string) => void;
	}[];
	labels: {
		dimensions: string;
		weight: string;
		packageTypes: Record<'box' | 'envelope' | 'tube' | 'custom', string>;
		shippingClasses: Record<
			'standard' | 'fragile' | 'oversized' | 'hazmat',
			string
		>;
		zones: string;
		free: string;
		handling: string;
	};
}

const ProductRow = ({ product, actions, labels }: ProductRowProps) => (
	<div className="rounded-lg border bg-card p-4">
		<div className="mb-4 flex items-start gap-4">
			<div className="size-16 shrink-0 overflow-hidden rounded-lg bg-muted">
				{product.image ? (
					<img
						src={product.image}
						alt={product.name}
						className="size-full object-cover"
					/>
				) : (
					<div className="flex size-full items-center justify-center">
						<Package className="size-8 text-muted-foreground" />
					</div>
				)}
			</div>
			<div className="min-w-0 flex-1">
				<div className="flex items-start justify-between">
					<div>
						<h3 className="font-semibold">{product.name}</h3>
						<p className="text-sm text-muted-foreground">{product.sku}</p>
					</div>
					<div className="flex items-center gap-2">
						<PackageTypeBadge
							type={product.packageType}
							labels={labels.packageTypes}
						/>
						<ShippingClassBadge
							shippingClass={product.shippingClass}
							labels={labels.shippingClasses}
						/>
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
										<action.icon className="mr-2 size-4" />
										{action.label}
									</DropdownMenuItem>
								))}
							</DropdownMenuContent>
						</DropdownMenu>
					</div>
				</div>
				<div className="mt-2 flex flex-wrap gap-4">
					<DimensionDisplay
						dimensions={product.dimensions}
						label={labels.dimensions}
					/>
					<WeightDisplay weight={product.weight} label={labels.weight} />
				</div>
			</div>
		</div>
		<Separator className="mb-4" />
		<ShippingZones
			zones={product.zones}
			freeThreshold={product.freeShippingThreshold}
			handlingFee={product.handlingFee}
			labels={{
				zones: labels.zones,
				free: labels.free,
				handling: labels.handling,
			}}
		/>
	</div>
);

export default function Main() {
	const products: ProductShipping[] = [
		{
			id: '1',
			name: 'Ceramic Vase Set',
			sku: 'HOM-VAS-001',
			image:
				'https://images.unsplash.com/photo-1612196808214-b8e1d6145a8c?w=100&h=100&fit=crop',
			weight: { value: 2.5, unit: 'kg' },
			dimensions: { length: 30, width: 20, height: 40, unit: 'cm' },
			packageType: 'box',
			shippingClass: 'fragile',
			zones: [
				{ name: 'Local', rate: 5.99, estimatedDays: '1-2 days' },
				{ name: 'Domestic', rate: 12.99, estimatedDays: '3-5 days' },
				{ name: 'Europe', rate: 24.99, estimatedDays: '7-10 days' },
				{ name: 'International', rate: 45.99, estimatedDays: '14-21 days' },
			],
			freeShippingThreshold: 100,
			handlingFee: 3.0,
		},
		{
			id: '2',
			name: 'Art Print Collection',
			sku: 'ART-PRT-002',
			image:
				'https://images.unsplash.com/photo-1513519245088-0e12902e5a38?w=100&h=100&fit=crop',
			weight: { value: 0.3, unit: 'kg' },
			dimensions: { length: 60, width: 5, height: 90, unit: 'cm' },
			packageType: 'tube',
			shippingClass: 'standard',
			zones: [
				{ name: 'Local', rate: 3.99, estimatedDays: '1-2 days' },
				{ name: 'Domestic', rate: 7.99, estimatedDays: '3-5 days' },
				{ name: 'Europe', rate: 15.99, estimatedDays: '7-10 days' },
				{ name: 'International', rate: 29.99, estimatedDays: '14-21 days' },
			],
			handlingFee: 0,
		},
		{
			id: '3',
			name: 'Industrial Shelf Unit',
			sku: 'FUR-SHF-003',
			image:
				'https://images.unsplash.com/photo-1532372576444-dda954194ad0?w=100&h=100&fit=crop',
			weight: { value: 25, unit: 'kg' },
			dimensions: { length: 120, width: 40, height: 180, unit: 'cm' },
			packageType: 'custom',
			shippingClass: 'oversized',
			zones: [
				{ name: 'Local', rate: 29.99, estimatedDays: '2-3 days' },
				{ name: 'Domestic', rate: 79.99, estimatedDays: '5-7 days' },
				{ name: 'Europe', rate: 199.99, estimatedDays: '10-14 days' },
				{ name: 'International', rate: 399.99, estimatedDays: '21-30 days' },
			],
			handlingFee: 15.0,
		},
		{
			id: '4',
			name: 'Gift Card Pack',
			sku: 'GFT-CRD-004',
			image:
				'https://images.unsplash.com/photo-1549465220-1a8b9238cd48?w=100&h=100&fit=crop',
			weight: { value: 0.05, unit: 'kg' },
			dimensions: { length: 15, width: 10, height: 0.5, unit: 'cm' },
			packageType: 'envelope',
			shippingClass: 'standard',
			zones: [
				{ name: 'Local', rate: 1.99, estimatedDays: '1 day' },
				{ name: 'Domestic', rate: 2.99, estimatedDays: '2-3 days' },
				{ name: 'Europe', rate: 5.99, estimatedDays: '5-7 days' },
				{ name: 'International', rate: 9.99, estimatedDays: '7-14 days' },
			],
			freeShippingThreshold: 25,
			handlingFee: 0,
		},
	];

	const actions = [
		{
			label: 'Edit Shipping',
			icon: Pencil,
			onClick: (id: string) => console.log('Edit', id),
		},
		{
			label: 'Duplicate',
			icon: Copy,
			onClick: (id: string) => console.log('Duplicate', id),
		},
		{
			label: 'Calculate Rate',
			icon: Truck,
			onClick: (id: string) => console.log('Calculate', id),
		},
	];

	const labels = {
		dimensions: 'Dimensions',
		weight: 'Weight',
		packageTypes: {
			box: 'Box',
			envelope: 'Envelope',
			tube: 'Tube',
			custom: 'Custom',
		},
		shippingClasses: {
			standard: 'Standard',
			fragile: 'Fragile',
			oversized: 'Oversized',
			hazmat: 'Hazmat',
		},
		zones: 'Shipping Zones',
		free: 'Free',
		handling: 'Handling fee',
	};

	return (
		<section className="@container" data-theme="dashboard">
			<div className="mx-auto max-w-5xl space-y-4 px-4 py-8 @sm:px-6 @2xl:px-8">
				{products.map((product) => (
					<ProductRow
						key={product.id}
						product={product}
						actions={actions}
						labels={labels}
					/>
				))}
			</div>
		</section>
	);
}
