'use client';

import * as React from 'react';
import {
	Package,
	X,
	Edit,
	Trash2,
	History,
	MapPin,
	TrendingUp,
	Copy,
	ExternalLink,
} from 'lucide-react';

import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import {
	Dialog,
	DialogContent,
	DialogHeader,
	DialogTitle,
	DialogDescription,
	DialogFooter,
} from '@/components/ui/dialog';
import {
	Sheet,
	SheetContent,
	SheetHeader,
	SheetTitle,
	SheetDescription,
	SheetFooter,
} from '@/components/ui/sheet';
import { Separator } from '@/components/ui/separator';

type Product = {
	id: string;
	name: string;
	sku: string;
	barcode: string;
	category: string;
	stock: number;
	minStock: number;
	maxStock: number;
	price: number;
	cost: number;
	location: string;
	status: 'in-stock' | 'low-stock' | 'out-of-stock';
	lastUpdated: string;
};

type DetailRowProps = {
	label: string;
	value: React.ReactNode;
};

const DetailRow = ({ label, value }: DetailRowProps) => (
	<div className="flex items-center justify-between py-2">
		<span className="text-muted-foreground">{label}</span>
		<span className="font-medium">{value}</span>
	</div>
);

type ProductSheetProps = {
	product: Product;
	open: boolean;
	onOpenChange: (open: boolean) => void;
};

const ProductSheet = ({ product, open, onOpenChange }: ProductSheetProps) => {
	const stockPercentage = (product.stock / product.maxStock) * 100;
	const margin = ((product.price - product.cost) / product.price) * 100;

	return (
		<Sheet open={open} onOpenChange={onOpenChange}>
			<SheetContent className="w-full overflow-y-auto @sm:max-w-lg">
				<SheetHeader>
					<div className="flex items-start gap-4">
						<div className="flex size-16 items-center justify-center rounded-lg border bg-muted">
							<Package className="size-8 text-muted-foreground" />
						</div>
						<div className="min-w-0 flex-1">
							<SheetTitle className="text-xl">{product.name}</SheetTitle>
							<SheetDescription className="flex items-center gap-2">
								<span>{product.sku}</span>
								<Button variant="ghost" size="icon-sm" className="size-5">
									<Copy className="size-3" />
								</Button>
							</SheetDescription>
						</div>
					</div>
				</SheetHeader>

				<div className="mt-6 space-y-6">
					{/* Stock Level */}
					<div className="rounded-lg border p-4">
						<div className="flex items-center justify-between">
							<span className="font-medium">Stock Level</span>
							<Badge
								variant={product.status === 'in-stock' ? 'default' : product.status === 'low-stock' ? 'secondary' : 'destructive'}
							>
								{product.status.replace('-', ' ')}
							</Badge>
						</div>
						<div className="mt-3 space-y-2">
							<Progress value={stockPercentage} className="h-3" />
							<div className="flex justify-between text-sm text-muted-foreground">
								<span>Min: {product.minStock}</span>
								<span className="font-semibold text-foreground">{product.stock} units</span>
								<span>Max: {product.maxStock}</span>
							</div>
						</div>
					</div>

					{/* Details */}
					<div>
						<h4 className="mb-3 font-medium">Details</h4>
						<div className="divide-y rounded-lg border">
							<div className="px-4">
								<DetailRow label="Barcode" value={product.barcode} />
							</div>
							<div className="px-4">
								<DetailRow label="Category" value={<Badge variant="outline">{product.category}</Badge>} />
							</div>
							<div className="px-4">
								<DetailRow
									label="Location"
									value={
										<span className="flex items-center gap-1">
											<MapPin className="size-3" />
											{product.location}
										</span>
									}
								/>
							</div>
						</div>
					</div>

					{/* Pricing */}
					<div>
						<h4 className="mb-3 font-medium">Pricing</h4>
						<div className="divide-y rounded-lg border">
							<div className="px-4">
								<DetailRow label="Cost Price" value={`$${product.cost.toFixed(2)}`} />
							</div>
							<div className="px-4">
								<DetailRow label="Sale Price" value={`$${product.price.toFixed(2)}`} />
							</div>
							<div className="px-4">
								<DetailRow
									label="Margin"
									value={
										<span className="flex items-center gap-1 text-emerald-500">
											<TrendingUp className="size-3" />
											{margin.toFixed(1)}%
										</span>
									}
								/>
							</div>
						</div>
					</div>

					{/* Activity */}
					<div className="text-sm text-muted-foreground">
						Last updated: {new Date(product.lastUpdated).toLocaleString()}
					</div>
				</div>

				<SheetFooter className="mt-6 flex-row gap-2">
					<Button variant="outline" className="flex-1">
						<History className="mr-2 size-4" />
						History
					</Button>
					<Button className="flex-1">
						<Edit className="mr-2 size-4" />
						Edit
					</Button>
				</SheetFooter>
			</SheetContent>
		</Sheet>
	);
};

type DeleteDialogProps = {
	productName: string;
	open: boolean;
	onOpenChange: (open: boolean) => void;
	onConfirm: () => void;
};

const DeleteDialog = ({ productName, open, onOpenChange, onConfirm }: DeleteDialogProps) => (
	<Dialog open={open} onOpenChange={onOpenChange}>
		<DialogContent>
			<DialogHeader>
				<DialogTitle>Delete Product</DialogTitle>
				<DialogDescription>
					Are you sure you want to delete "{productName}"? This action cannot be undone.
				</DialogDescription>
			</DialogHeader>
			<DialogFooter>
				<Button variant="outline" onClick={() => onOpenChange(false)}>
					Cancel
				</Button>
				<Button variant="destructive" onClick={onConfirm}>
					<Trash2 className="mr-2 size-4" />
					Delete
				</Button>
			</DialogFooter>
		</DialogContent>
	</Dialog>
);

export default function Main() {
	const [sheetOpen, setSheetOpen] = React.useState(true);
	const [deleteOpen, setDeleteOpen] = React.useState(false);

	const product: Product = {
		id: '1',
		name: 'Wireless Bluetooth Headphones',
		sku: 'WBH-001',
		barcode: '1234567890123',
		category: 'Electronics',
		stock: 245,
		minStock: 50,
		maxStock: 500,
		price: 79.99,
		cost: 45.00,
		location: 'Warehouse A - Shelf B12',
		status: 'in-stock',
		lastUpdated: '2024-01-18T14:30:00',
	};

	return (
		<section className="@container" data-theme="dashboard">
			<div className="mx-auto max-w-7xl px-4 py-8 @sm:px-6 @md:py-10 @2xl:px-8">
				<div className="space-y-4">
					<div className="flex gap-4">
						<Button onClick={() => setSheetOpen(true)}>Open Product Details</Button>
						<Button variant="destructive" onClick={() => setDeleteOpen(true)}>
							Delete Product
						</Button>
					</div>

					<ProductSheet
						product={product}
						open={sheetOpen}
						onOpenChange={setSheetOpen}
					/>

					<DeleteDialog
						productName={product.name}
						open={deleteOpen}
						onOpenChange={setDeleteOpen}
						onConfirm={() => {
							setDeleteOpen(false);
							// Handle delete
						}}
					/>
				</div>
			</div>
		</section>
	);
}
