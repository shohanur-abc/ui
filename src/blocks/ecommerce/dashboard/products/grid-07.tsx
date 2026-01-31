'use client';

import * as React from 'react';
import {
	Package,
	Box,
	Truck,
	Clock,
	CheckCircle2,
	XCircle,
	MoreHorizontal,
	MapPin,
	Calendar,
} from 'lucide-react';

import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import {
	Card,
	CardContent,
} from '@/components/ui/card';
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuItem,
	DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Separator } from '@/components/ui/separator';

interface Supplier {
	id: string;
	name: string;
	logo: string;
	location: string;
}

interface ProductSupply {
	id: string;
	name: string;
	sku: string;
	image: string;
	supplier: Supplier;
	unitCost: number;
	moq: number;
	leadTime: number;
	lastOrder: string;
	status: 'active' | 'pending' | 'discontinued';
	inTransit: number;
}

interface SupplierInfoProps {
	supplier: Supplier;
}

const SupplierInfo = ({ supplier }: SupplierInfoProps) => (
	<div className="flex items-center gap-3">
		<div className="size-10 overflow-hidden rounded-lg border bg-muted">
			{supplier.logo ? (
				<img src={supplier.logo} alt={supplier.name} className="size-full object-cover" />
			) : (
				<div className="flex size-full items-center justify-center text-sm font-bold text-muted-foreground">
					{supplier.name.charAt(0)}
				</div>
			)}
		</div>
		<div>
			<p className="font-medium">{supplier.name}</p>
			<p className="flex items-center gap-1 text-xs text-muted-foreground">
				<MapPin className="size-3" />
				{supplier.location}
			</p>
		</div>
	</div>
);

interface StatusBadgeProps {
	status: 'active' | 'pending' | 'discontinued';
	labels: Record<'active' | 'pending' | 'discontinued', string>;
}

const StatusBadge = ({ status, labels }: StatusBadgeProps) => {
	const config = {
		active: { icon: CheckCircle2, variant: 'default' as const, className: 'bg-emerald-500' },
		pending: { icon: Clock, variant: 'secondary' as const, className: '' },
		discontinued: { icon: XCircle, variant: 'outline' as const, className: 'text-muted-foreground' },
	};

	const { icon: Icon, variant, className } = config[status];

	return (
		<Badge variant={variant} className={`gap-1 ${className}`}>
			<Icon className="size-3" />
			{labels[status]}
		</Badge>
	);
};

interface InfoRowProps {
	icon: React.ElementType;
	label: string;
	value: string | number;
	highlight?: boolean;
}

const InfoRow = ({ icon: Icon, label, value, highlight }: InfoRowProps) => (
	<div className="flex items-center justify-between">
		<div className="flex items-center gap-2 text-sm text-muted-foreground">
			<Icon className="size-4" />
			<span>{label}</span>
		</div>
		<span className={`text-sm font-medium ${highlight ? 'text-primary' : ''}`}>{value}</span>
	</div>
);

interface InTransitProps {
	quantity: number;
	label: string;
}

const InTransit = ({ quantity, label }: InTransitProps) => {
	if (quantity === 0) return null;

	return (
		<div className="flex items-center gap-2 rounded-lg bg-blue-500/10 p-2 text-blue-500">
			<Truck className="size-4" />
			<span className="text-sm font-medium">{quantity} {label}</span>
		</div>
	);
};

interface ProductCardProps {
	product: ProductSupply;
	actions: { label: string; onClick: (id: string) => void }[];
	labels: {
		status: Record<'active' | 'pending' | 'discontinued', string>;
		unitCost: string;
		moq: string;
		leadTime: string;
		lastOrder: string;
		inTransit: string;
		daysLeadTime: string;
	};
}

const ProductCard = ({ product, actions, labels }: ProductCardProps) => (
	<Card className="overflow-hidden transition-shadow hover:shadow-lg">
		<CardContent className="p-0">
			<div className="flex gap-4 p-4">
				<div className="relative size-24 shrink-0 overflow-hidden rounded-lg bg-muted">
					{product.image ? (
						<img
							src={product.image}
							alt={product.name}
							className="size-full object-cover"
						/>
					) : (
						<div className="flex size-full items-center justify-center">
							<Package className="size-10 text-muted-foreground" />
						</div>
					)}
				</div>
				<div className="min-w-0 flex-1">
					<div className="mb-2 flex items-start justify-between">
						<div>
							<h3 className="font-semibold">{product.name}</h3>
							<p className="text-xs text-muted-foreground">{product.sku}</p>
						</div>
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
					</div>
					<StatusBadge status={product.status} labels={labels.status} />
				</div>
			</div>
			<Separator />
			<div className="p-4">
				<SupplierInfo supplier={product.supplier} />
			</div>
			<Separator />
			<div className="space-y-3 p-4">
				<InfoRow
					icon={Box}
					label={labels.unitCost}
					value={`$${product.unitCost.toFixed(2)}`}
					highlight
				/>
				<InfoRow
					icon={Package}
					label={labels.moq}
					value={`${product.moq} units`}
				/>
				<InfoRow
					icon={Clock}
					label={labels.leadTime}
					value={`${product.leadTime} ${labels.daysLeadTime}`}
				/>
				<InfoRow
					icon={Calendar}
					label={labels.lastOrder}
					value={new Date(product.lastOrder).toLocaleDateString('en-US', {
						month: 'short',
						day: 'numeric',
						year: 'numeric',
					})}
				/>
			</div>
			{product.inTransit > 0 && (
				<>
					<Separator />
					<div className="p-4">
						<InTransit quantity={product.inTransit} label={labels.inTransit} />
					</div>
				</>
			)}
		</CardContent>
	</Card>
);

export default function Main() {
	const products: ProductSupply[] = [
		{
			id: '1',
			name: 'Organic Cotton T-Shirt',
			sku: 'TSH-ORG-001',
			image: 'https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=200&h=200&fit=crop',
			supplier: {
				id: 's1',
				name: 'EcoTextiles Co.',
				logo: '',
				location: 'Vietnam',
			},
			unitCost: 8.50,
			moq: 500,
			leadTime: 21,
			lastOrder: '2024-02-15',
			status: 'active',
			inTransit: 1500,
		},
		{
			id: '2',
			name: 'Leather Belt Premium',
			sku: 'BLT-LTH-002',
			image: 'https://images.unsplash.com/photo-1624222247344-550fb60583dc?w=200&h=200&fit=crop',
			supplier: {
				id: 's2',
				name: 'Italia Leather Works',
				logo: '',
				location: 'Italy',
			},
			unitCost: 24.00,
			moq: 100,
			leadTime: 14,
			lastOrder: '2024-01-28',
			status: 'active',
			inTransit: 0,
		},
		{
			id: '3',
			name: 'Canvas Backpack',
			sku: 'BAG-CVS-003',
			image: 'https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=200&h=200&fit=crop',
			supplier: {
				id: 's3',
				name: 'Shanghai Bags Ltd.',
				logo: '',
				location: 'China',
			},
			unitCost: 15.75,
			moq: 250,
			leadTime: 28,
			lastOrder: '2024-03-01',
			status: 'pending',
			inTransit: 500,
		},
		{
			id: '4',
			name: 'Wool Blend Sweater',
			sku: 'SWT-WOL-004',
			image: 'https://images.unsplash.com/photo-1576566588028-4147f3842f27?w=200&h=200&fit=crop',
			supplier: {
				id: 's4',
				name: 'Scottish Knits',
				logo: '',
				location: 'Scotland',
			},
			unitCost: 32.00,
			moq: 50,
			leadTime: 35,
			lastOrder: '2023-11-15',
			status: 'discontinued',
			inTransit: 0,
		},
		{
			id: '5',
			name: 'Denim Jeans Classic',
			sku: 'JNS-DNM-005',
			image: 'https://images.unsplash.com/photo-1542272604-787c3835535d?w=200&h=200&fit=crop',
			supplier: {
				id: 's5',
				name: 'Denim Masters',
				logo: '',
				location: 'Turkey',
			},
			unitCost: 18.50,
			moq: 200,
			leadTime: 18,
			lastOrder: '2024-02-20',
			status: 'active',
			inTransit: 400,
		},
		{
			id: '6',
			name: 'Silk Scarf Printed',
			sku: 'SCF-SLK-006',
			image: 'https://images.unsplash.com/photo-1601924921557-45e8ea5ffd96?w=200&h=200&fit=crop',
			supplier: {
				id: 's6',
				name: 'Hangzhou Silk',
				logo: '',
				location: 'China',
			},
			unitCost: 12.00,
			moq: 150,
			leadTime: 25,
			lastOrder: '2024-01-10',
			status: 'pending',
			inTransit: 0,
		},
	];

	const actions = [
		{ label: 'View Details', onClick: (id: string) => console.log('View', id) },
		{ label: 'Create Order', onClick: (id: string) => console.log('Order', id) },
		{ label: 'Contact Supplier', onClick: (id: string) => console.log('Contact', id) },
		{ label: 'Edit', onClick: (id: string) => console.log('Edit', id) },
	];

	const labels = {
		status: { active: 'Active', pending: 'Pending', discontinued: 'Discontinued' },
		unitCost: 'Unit Cost',
		moq: 'MOQ',
		leadTime: 'Lead Time',
		lastOrder: 'Last Order',
		inTransit: 'units in transit',
		daysLeadTime: 'days',
	};

	return (
		<section className="@container" data-theme="dashboard">
			<div className="mx-auto max-w-7xl px-4 py-8 @sm:px-6 @2xl:px-8">
				<div className="grid gap-4 @md:grid-cols-2 @xl:grid-cols-3">
					{products.map((product) => (
						<ProductCard
							key={product.id}
							product={product}
							actions={actions}
							labels={labels}
						/>
					))}
				</div>
			</div>
		</section>
	);
}
