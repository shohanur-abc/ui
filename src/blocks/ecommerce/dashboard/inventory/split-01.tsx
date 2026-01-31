'use client';

import * as React from 'react';
import {
	Package,
	MapPin,
	Box,
	Truck,
	AlertCircle,
	ChevronLeft,
	ChevronRight,
} from 'lucide-react';

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { ScrollArea } from '@/components/ui/scroll-area';

type Location = {
	id: string;
	name: string;
	code: string;
	type: 'warehouse' | 'store' | 'fulfillment';
	itemCount: number;
};

type Product = {
	id: string;
	name: string;
	sku: string;
	stock: number;
	status: 'in-stock' | 'low-stock' | 'out-of-stock';
};

type LocationListProps = {
	locations: Location[];
	selectedId: string | null;
	onSelect: (id: string) => void;
};

const LocationList = ({ locations, selectedId, onSelect }: LocationListProps) => {
	const typeIcons = {
		warehouse: Box,
		store: MapPin,
		fulfillment: Truck,
	};

	return (
		<div className="space-y-2">
			{locations.map((location) => {
				const Icon = typeIcons[location.type];
				const isSelected = location.id === selectedId;

				return (
					<div
						key={location.id}
						className={`cursor-pointer rounded-lg border p-3 transition-all ${
							isSelected ? 'border-primary bg-primary/5' : 'hover:bg-muted/50'
						}`}
						onClick={() => onSelect(location.id)}
					>
						<div className="flex items-center gap-3">
							<div className={`rounded-lg p-2 ${isSelected ? 'bg-primary/10' : 'bg-muted'}`}>
								<Icon className={`size-4 ${isSelected ? 'text-primary' : 'text-muted-foreground'}`} />
							</div>
							<div className="min-w-0 flex-1">
								<p className="truncate font-medium">{location.name}</p>
								<p className="text-xs text-muted-foreground">{location.code}</p>
							</div>
							<Badge variant="secondary">{location.itemCount}</Badge>
						</div>
					</div>
				);
			})}
		</div>
	);
};

type ProductListProps = {
	products: Product[];
	locationName: string;
};

const ProductList = ({ products, locationName }: ProductListProps) => {
	const statusConfig = {
		'in-stock': { label: 'In Stock', color: 'bg-emerald-500' },
		'low-stock': { label: 'Low Stock', color: 'bg-amber-500' },
		'out-of-stock': { label: 'Out of Stock', color: 'bg-red-500' },
	};

	return (
		<div className="space-y-4">
			<div className="flex items-center justify-between">
				<h3 className="font-semibold">{locationName}</h3>
				<Badge variant="outline">{products.length} products</Badge>
			</div>
			<div className="space-y-2">
				{products.map((product) => {
					const status = statusConfig[product.status];
					return (
						<div
							key={product.id}
							className="flex items-center justify-between rounded-lg border p-3 transition-colors hover:bg-muted/50"
						>
							<div className="flex items-center gap-3">
								<div className="flex size-8 items-center justify-center rounded border bg-muted">
									<Package className="size-4 text-muted-foreground" />
								</div>
								<div>
									<p className="font-medium">{product.name}</p>
									<p className="text-xs text-muted-foreground">{product.sku}</p>
								</div>
							</div>
							<div className="flex items-center gap-3">
								<div className="text-right">
									<p className="font-semibold tabular-nums">{product.stock}</p>
									<p className="text-xs text-muted-foreground">units</p>
								</div>
								<div className={`size-2 rounded-full ${status.color}`} title={status.label} />
							</div>
						</div>
					);
				})}
			</div>
		</div>
	);
};

export default function Main() {
	const [selectedLocation, setSelectedLocation] = React.useState<string>('loc-1');
	const [sidebarOpen, setSidebarOpen] = React.useState(true);

	const locations: Location[] = [
		{ id: 'loc-1', name: 'Main Warehouse', code: 'WH-001', type: 'warehouse', itemCount: 1250 },
		{ id: 'loc-2', name: 'East Distribution', code: 'WH-002', type: 'warehouse', itemCount: 890 },
		{ id: 'loc-3', name: 'NYC Store', code: 'ST-NYC', type: 'store', itemCount: 145 },
		{ id: 'loc-4', name: 'LA Store', code: 'ST-LA', type: 'store', itemCount: 120 },
		{ id: 'loc-5', name: 'West Fulfillment', code: 'FC-001', type: 'fulfillment', itemCount: 680 },
	];

	const products: Product[] = [
		{ id: '1', name: 'Wireless Headphones', sku: 'WH-001', stock: 245, status: 'in-stock' },
		{ id: '2', name: 'Bluetooth Speaker', sku: 'BS-002', stock: 18, status: 'low-stock' },
		{ id: '3', name: 'USB-C Cable', sku: 'USB-003', stock: 0, status: 'out-of-stock' },
		{ id: '4', name: 'Power Bank', sku: 'PB-004', stock: 156, status: 'in-stock' },
		{ id: '5', name: 'Phone Case', sku: 'PC-005', stock: 422, status: 'in-stock' },
	];

	const selectedLocationData = locations.find((l) => l.id === selectedLocation);

	return (
		<section className="@container" data-theme="dashboard">
			<div className="mx-auto max-w-7xl px-4 py-8 @sm:px-6 @md:py-10 @2xl:px-8">
				<Card className="overflow-hidden">
					<div className="flex">
						{/* Sidebar */}
						<div
							className={`shrink-0 border-r transition-all ${
								sidebarOpen ? 'w-64' : 'w-0'
							} overflow-hidden`}
						>
							<CardHeader className="pb-3">
								<CardTitle className="text-lg">Locations</CardTitle>
							</CardHeader>
							<CardContent>
								<LocationList
									locations={locations}
									selectedId={selectedLocation}
									onSelect={setSelectedLocation}
								/>
							</CardContent>
						</div>

						{/* Toggle button */}
						<Button
							variant="ghost"
							size="icon-sm"
							className="my-auto -ml-3 rounded-full border bg-background shadow-sm"
							onClick={() => setSidebarOpen(!sidebarOpen)}
						>
							{sidebarOpen ? <ChevronLeft className="size-4" /> : <ChevronRight className="size-4" />}
						</Button>

						{/* Main content */}
						<div className="flex-1">
							<CardHeader className="pb-3">
								<CardTitle className="text-lg">Inventory</CardTitle>
							</CardHeader>
							<CardContent>
								{selectedLocationData ? (
									<ProductList
										products={products}
										locationName={selectedLocationData.name}
									/>
								) : (
									<div className="flex h-48 items-center justify-center text-muted-foreground">
										Select a location to view inventory
									</div>
								)}
							</CardContent>
						</div>
					</div>
				</Card>
			</div>
		</section>
	);
}
