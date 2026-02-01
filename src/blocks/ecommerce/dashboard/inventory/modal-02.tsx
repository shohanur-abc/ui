'use client';

import * as React from 'react';
import {
	Package,
	X,
	Plus,
	Minus,
	ShoppingCart,
	Tag,
	Truck,
	Save,
} from 'lucide-react';

import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import {
	Dialog,
	DialogContent,
	DialogDescription,
	DialogFooter,
	DialogHeader,
	DialogTitle,
	DialogTrigger,
} from '@/components/ui/dialog';
import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from '@/components/ui/select';

type QuickAdjustModalProps = {
	productName: string;
	currentStock: number;
	open: boolean;
	onOpenChange: (open: boolean) => void;
	onSave: (adjustment: number, reason: string) => void;
};

const QuickAdjustModal = ({
	productName,
	currentStock,
	open,
	onOpenChange,
	onSave,
}: QuickAdjustModalProps) => {
	const [adjustment, setAdjustment] = React.useState(0);
	const [reason, setReason] = React.useState('');

	const newStock = currentStock + adjustment;

	const handleSave = () => {
		onSave(adjustment, reason);
		onOpenChange(false);
		setAdjustment(0);
		setReason('');
	};

	return (
		<Dialog open={open} onOpenChange={onOpenChange}>
			<DialogContent>
				<DialogHeader>
					<DialogTitle>Quick Stock Adjustment</DialogTitle>
					<DialogDescription>
						Adjust inventory for {productName}
					</DialogDescription>
				</DialogHeader>
				<div className="space-y-6 py-4">
					<div className="flex items-center justify-center gap-6">
						<div className="text-center">
							<p className="text-sm text-muted-foreground">Current</p>
							<p className="text-2xl font-bold">{currentStock}</p>
						</div>
						<div className="flex items-center gap-2">
							<Button
								variant="outline"
								size="icon"
								onClick={() => setAdjustment((a) => a - 1)}
							>
								<Minus className="size-4" />
							</Button>
							<Input
								type="number"
								value={adjustment}
								onChange={(e) => setAdjustment(parseInt(e.target.value) || 0)}
								className="w-20 text-center"
							/>
							<Button
								variant="outline"
								size="icon"
								onClick={() => setAdjustment((a) => a + 1)}
							>
								<Plus className="size-4" />
							</Button>
						</div>
						<div className="text-center">
							<p className="text-sm text-muted-foreground">New</p>
							<p
								className={`text-2xl font-bold ${newStock < 0 ? 'text-destructive' : ''}`}
							>
								{newStock}
							</p>
						</div>
					</div>
					<div className="space-y-2">
						<Label>Reason for Adjustment</Label>
						<Select value={reason} onValueChange={setReason}>
							<SelectTrigger>
								<SelectValue placeholder="Select reason" />
							</SelectTrigger>
							<SelectContent>
								<SelectItem value="received">Stock Received</SelectItem>
								<SelectItem value="sold">Sale Correction</SelectItem>
								<SelectItem value="damaged">Damaged/Defective</SelectItem>
								<SelectItem value="returned">Customer Return</SelectItem>
								<SelectItem value="count">Physical Count Adjustment</SelectItem>
								<SelectItem value="other">Other</SelectItem>
							</SelectContent>
						</Select>
					</div>
					<div className="space-y-2">
						<Label>Notes (Optional)</Label>
						<Textarea placeholder="Add any additional notes..." rows={2} />
					</div>
				</div>
				<DialogFooter>
					<Button variant="outline" onClick={() => onOpenChange(false)}>
						Cancel
					</Button>
					<Button onClick={handleSave} disabled={!reason || newStock < 0}>
						<Save className="mr-2 size-4" />
						Save Adjustment
					</Button>
				</DialogFooter>
			</DialogContent>
		</Dialog>
	);
};

type ProductCardProps = {
	id: string;
	name: string;
	sku: string;
	stock: number;
	status: 'in-stock' | 'low' | 'out';
	onAdjust: () => void;
};

const ProductCard = ({
	name,
	sku,
	stock,
	status,
	onAdjust,
}: ProductCardProps) => (
	<div className="rounded-lg border p-4">
		<div className="flex items-start justify-between">
			<div className="flex items-center gap-3">
				<div className="flex size-12 items-center justify-center rounded-lg bg-muted">
					<Package className="size-6 text-muted-foreground" />
				</div>
				<div>
					<p className="font-medium">{name}</p>
					<p className="text-sm text-muted-foreground">{sku}</p>
				</div>
			</div>
			<Badge
				variant={
					status === 'in-stock'
						? 'default'
						: status === 'low'
							? 'secondary'
							: 'destructive'
				}
			>
				{status === 'in-stock' ? 'In Stock' : status === 'low' ? 'Low' : 'Out'}
			</Badge>
		</div>
		<div className="mt-4 flex items-center justify-between">
			<div>
				<p className="text-sm text-muted-foreground">Current Stock</p>
				<p className="text-xl font-bold">{stock}</p>
			</div>
			<Button variant="outline" size="sm" onClick={onAdjust}>
				Adjust Stock
			</Button>
		</div>
	</div>
);

export default function Main() {
	const [modalOpen, setModalOpen] = React.useState(false);
	const [selectedProduct, setSelectedProduct] = React.useState<{
		name: string;
		stock: number;
	} | null>(null);

	const products = [
		{
			id: '1',
			name: 'Wireless Earbuds Pro',
			sku: 'WEP-001',
			stock: 245,
			status: 'in-stock' as const,
		},
		{
			id: '2',
			name: 'USB-C Fast Charger',
			sku: 'UFC-001',
			stock: 12,
			status: 'low' as const,
		},
		{
			id: '3',
			name: 'Phone Case Premium',
			sku: 'PCP-001',
			stock: 0,
			status: 'out' as const,
		},
	];

	const handleAdjust = (product: { name: string; stock: number }) => {
		setSelectedProduct(product);
		setModalOpen(true);
	};

	return (
		<section className="@container" data-theme="dashboard">
			<div className="mx-auto max-w-7xl px-4 py-8 @sm:px-6 @md:py-10 @2xl:px-8">
				<div className="mb-6">
					<h2 className="text-xl font-semibold @lg:text-2xl">Quick Adjust</h2>
					<p className="text-sm text-muted-foreground">
						Click to adjust stock levels
					</p>
				</div>
				<div className="grid gap-4 @sm:grid-cols-2 @lg:grid-cols-3">
					{products.map((product) => (
						<ProductCard
							key={product.id}
							{...product}
							onAdjust={() => handleAdjust(product)}
						/>
					))}
				</div>
				{selectedProduct && (
					<QuickAdjustModal
						productName={selectedProduct.name}
						currentStock={selectedProduct.stock}
						open={modalOpen}
						onOpenChange={setModalOpen}
						onSave={(adj, reason) => console.log('Adjust', adj, reason)}
					/>
				)}
			</div>
		</section>
	);
}
