'use client';

import * as React from 'react';
import {
	Plus,
	Minus,
	ArrowRightLeft,
	Package,
	Save,
	RotateCcw,
} from 'lucide-react';

import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import {
	Card,
	CardContent,
	CardHeader,
	CardTitle,
	CardDescription,
	CardFooter,
} from '@/components/ui/card';
import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from '@/components/ui/select';
import { Textarea } from '@/components/ui/textarea';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';

type AdjustmentType = 'add' | 'remove' | 'transfer';

type Product = {
	id: string;
	name: string;
	sku: string;
	currentStock: number;
	location: string;
};

type AdjustmentTypeCardProps = {
	type: AdjustmentType;
	selected: AdjustmentType;
	onSelect: (type: AdjustmentType) => void;
	icon: React.ElementType;
	label: string;
	description: string;
};

const AdjustmentTypeCard = ({
	type,
	selected,
	onSelect,
	icon: Icon,
	label,
	description,
}: AdjustmentTypeCardProps) => (
	<div
		className={`cursor-pointer rounded-lg border-2 p-4 transition-all ${
			selected === type
				? 'border-primary bg-primary/5'
				: 'hover:border-primary/50'
		}`}
		onClick={() => onSelect(type)}
	>
		<div className="flex items-center gap-3">
			<div
				className={`rounded-lg p-2 ${selected === type ? 'bg-primary/10' : 'bg-muted'}`}
			>
				<Icon
					className={`size-5 ${selected === type ? 'text-primary' : 'text-muted-foreground'}`}
				/>
			</div>
			<div>
				<p className="font-medium">{label}</p>
				<p className="text-sm text-muted-foreground">{description}</p>
			</div>
		</div>
	</div>
);

type ProductSelectProps = {
	product: Product | null;
	onSelect: (product: Product) => void;
	products: Product[];
	label: string;
};

const ProductSelect = ({
	product,
	onSelect,
	products,
	label,
}: ProductSelectProps) => (
	<div className="space-y-2">
		<Label>{label}</Label>
		<Select
			value={product?.id}
			onValueChange={(id) => {
				const selected = products.find((p) => p.id === id);
				if (selected) onSelect(selected);
			}}
		>
			<SelectTrigger>
				<SelectValue placeholder="Select a product" />
			</SelectTrigger>
			<SelectContent>
				{products.map((p) => (
					<SelectItem key={p.id} value={p.id}>
						<div className="flex items-center gap-2">
							<span>{p.name}</span>
							<span className="text-xs text-muted-foreground">({p.sku})</span>
						</div>
					</SelectItem>
				))}
			</SelectContent>
		</Select>
		{product && (
			<div className="mt-2 flex items-center gap-2 rounded-lg bg-muted p-3">
				<Package className="size-4 text-muted-foreground" />
				<span className="text-sm">Current Stock:</span>
				<Badge variant="secondary">{product.currentStock} units</Badge>
				<span className="text-sm text-muted-foreground">
					at {product.location}
				</span>
			</div>
		)}
	</div>
);

type QuantityInputProps = {
	value: number;
	onChange: (value: number) => void;
	label: string;
};

const QuantityInput = ({ value, onChange, label }: QuantityInputProps) => (
	<div className="space-y-2">
		<Label>{label}</Label>
		<div className="flex items-center gap-2">
			<Button
				variant="outline"
				size="icon"
				onClick={() => onChange(Math.max(0, value - 1))}
			>
				<Minus className="size-4" />
			</Button>
			<Input
				type="number"
				value={value}
				onChange={(e) => onChange(parseInt(e.target.value) || 0)}
				className="w-24 text-center"
			/>
			<Button variant="outline" size="icon" onClick={() => onChange(value + 1)}>
				<Plus className="size-4" />
			</Button>
		</div>
	</div>
);

export default function Main() {
	const [adjustmentType, setAdjustmentType] =
		React.useState<AdjustmentType>('add');
	const [selectedProduct, setSelectedProduct] = React.useState<Product | null>(
		null,
	);
	const [quantity, setQuantity] = React.useState(0);
	const [reason, setReason] = React.useState('');
	const [destinationLocation, setDestinationLocation] = React.useState('');

	const products: Product[] = [
		{
			id: '1',
			name: 'Wireless Headphones',
			sku: 'WH-001',
			currentStock: 245,
			location: 'Warehouse A',
		},
		{
			id: '2',
			name: 'Bluetooth Speaker',
			sku: 'BS-002',
			currentStock: 189,
			location: 'Warehouse A',
		},
		{
			id: '3',
			name: 'USB-C Cable',
			sku: 'USB-003',
			currentStock: 542,
			location: 'Warehouse B',
		},
	];

	const locations = [
		{ value: 'warehouse-a', label: 'Warehouse A' },
		{ value: 'warehouse-b', label: 'Warehouse B' },
		{ value: 'store-nyc', label: 'Store NYC' },
		{ value: 'store-la', label: 'Store LA' },
	];

	const reasons = [
		{ value: 'received', label: 'Received from supplier' },
		{ value: 'returned', label: 'Customer return' },
		{ value: 'damaged', label: 'Damaged/Defective' },
		{ value: 'lost', label: 'Lost/Missing' },
		{ value: 'adjustment', label: 'Inventory count adjustment' },
	];

	const newStock = selectedProduct
		? adjustmentType === 'add'
			? selectedProduct.currentStock + quantity
			: selectedProduct.currentStock - quantity
		: 0;

	return (
		<section className="@container" data-theme="dashboard">
			<div className="mx-auto max-w-7xl px-4 py-8 @sm:px-6 @md:py-10 @2xl:px-8">
				<Card>
					<CardHeader>
						<CardTitle className="text-xl @lg:text-2xl">
							Stock Adjustment
						</CardTitle>
						<CardDescription>
							Add, remove, or transfer inventory
						</CardDescription>
					</CardHeader>
					<CardContent className="space-y-6">
						<div className="grid gap-3 @sm:grid-cols-3">
							<AdjustmentTypeCard
								type="add"
								selected={adjustmentType}
								onSelect={setAdjustmentType}
								icon={Plus}
								label="Add Stock"
								description="Increase inventory"
							/>
							<AdjustmentTypeCard
								type="remove"
								selected={adjustmentType}
								onSelect={setAdjustmentType}
								icon={Minus}
								label="Remove Stock"
								description="Decrease inventory"
							/>
							<AdjustmentTypeCard
								type="transfer"
								selected={adjustmentType}
								onSelect={setAdjustmentType}
								icon={ArrowRightLeft}
								label="Transfer"
								description="Move between locations"
							/>
						</div>

						<ProductSelect
							product={selectedProduct}
							onSelect={setSelectedProduct}
							products={products}
							label="Select Product"
						/>

						<div className="grid gap-6 @sm:grid-cols-2">
							<QuantityInput
								value={quantity}
								onChange={setQuantity}
								label="Quantity"
							/>
							{adjustmentType === 'transfer' && (
								<div className="space-y-2">
									<Label>Destination Location</Label>
									<Select
										value={destinationLocation}
										onValueChange={setDestinationLocation}
									>
										<SelectTrigger>
											<SelectValue placeholder="Select location" />
										</SelectTrigger>
										<SelectContent>
											{locations.map((loc) => (
												<SelectItem key={loc.value} value={loc.value}>
													{loc.label}
												</SelectItem>
											))}
										</SelectContent>
									</Select>
								</div>
							)}
						</div>

						<div className="space-y-2">
							<Label>Reason</Label>
							<Select value={reason} onValueChange={setReason}>
								<SelectTrigger>
									<SelectValue placeholder="Select reason" />
								</SelectTrigger>
								<SelectContent>
									{reasons.map((r) => (
										<SelectItem key={r.value} value={r.value}>
											{r.label}
										</SelectItem>
									))}
								</SelectContent>
							</Select>
						</div>

						<div className="space-y-2">
							<Label>Notes (Optional)</Label>
							<Textarea placeholder="Add any additional notes..." />
						</div>

						{selectedProduct && quantity > 0 && (
							<div className="rounded-lg bg-muted p-4">
								<div className="flex items-center justify-between">
									<span className="text-muted-foreground">
										Stock after adjustment:
									</span>
									<div className="flex items-center gap-2">
										<span className="text-muted-foreground line-through">
											{selectedProduct.currentStock}
										</span>
										<span className="text-lg font-bold">→</span>
										<span
											className={`text-lg font-bold ${newStock < 0 ? 'text-destructive' : 'text-emerald-500'}`}
										>
											{newStock}
										</span>
										<span className="text-sm text-muted-foreground">units</span>
									</div>
								</div>
							</div>
						)}
					</CardContent>
					<CardFooter className="flex justify-end gap-3 border-t pt-6">
						<Button variant="outline">
							<RotateCcw className="mr-2 size-4" />
							Reset
						</Button>
						<Button disabled={!selectedProduct || quantity === 0}>
							<Save className="mr-2 size-4" />
							Apply Adjustment
						</Button>
					</CardFooter>
				</Card>
			</div>
		</section>
	);
}
