'use client';

import * as React from 'react';
import {
	Settings2,
	Check,
	X,
	Package,
	Palette,
	Ruler,
	Weight,
	Boxes,
	RefreshCw,
	Plus,
} from 'lucide-react';

import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Checkbox } from '@/components/ui/checkbox';
import { Progress } from '@/components/ui/progress';
import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from '@/components/ui/select';
import {
	Dialog,
	DialogContent,
	DialogDescription,
	DialogFooter,
	DialogHeader,
	DialogTitle,
	DialogTrigger,
} from '@/components/ui/dialog';
import { Separator } from '@/components/ui/separator';

interface Attribute {
	id: string;
	name: string;
	icon: React.ElementType;
	type: 'select' | 'text' | 'number';
	options?: string[];
	unit?: string;
}

interface AttributeChange {
	attributeId: string;
	value: string;
}

interface Product {
	id: string;
	name: string;
	selected: boolean;
}

interface AttributeFieldProps {
	attribute: Attribute;
	value: string;
	onChange: (value: string) => void;
	isActive: boolean;
	onToggle: () => void;
}

const AttributeField = ({
	attribute,
	value,
	onChange,
	isActive,
	onToggle,
}: AttributeFieldProps) => {
	const Icon = attribute.icon;

	return (
		<div
			className={`rounded-lg border p-3 transition-all ${isActive ? 'border-primary bg-primary/5' : ''}`}
		>
			<div className="mb-2 flex items-center gap-2">
				<Checkbox checked={isActive} onCheckedChange={onToggle} />
				<Icon className="size-4 text-muted-foreground" />
				<span className="font-medium">{attribute.name}</span>
			</div>
			{isActive && (
				<div className="ml-6">
					{attribute.type === 'select' && (
						<Select value={value} onValueChange={onChange}>
							<SelectTrigger>
								<SelectValue placeholder={`Select ${attribute.name.toLowerCase()}`} />
							</SelectTrigger>
							<SelectContent>
								{attribute.options?.map((option) => (
									<SelectItem key={option} value={option}>
										{option}
									</SelectItem>
								))}
							</SelectContent>
						</Select>
					)}
					{attribute.type === 'text' && (
						<Input
							value={value}
							onChange={(e) => onChange(e.target.value)}
							placeholder={`Enter ${attribute.name.toLowerCase()}`}
						/>
					)}
					{attribute.type === 'number' && (
						<div className="flex items-center gap-2">
							<Input
								type="number"
								value={value}
								onChange={(e) => onChange(e.target.value)}
								placeholder="0"
							/>
							{attribute.unit && (
								<span className="text-sm text-muted-foreground">
									{attribute.unit}
								</span>
							)}
						</div>
					)}
				</div>
			)}
		</div>
	);
};

interface ProductListProps {
	products: Product[];
	onToggle: (id: string) => void;
	onToggleAll: () => void;
}

const ProductList = ({
	products,
	onToggle,
	onToggleAll,
}: ProductListProps) => {
	const selectedCount = products.filter((p) => p.selected).length;

	return (
		<div className="space-y-2">
			<div className="flex items-center justify-between">
				<Label>{selectedCount} products selected</Label>
				<Button variant="ghost" size="sm" onClick={onToggleAll}>
					{selectedCount === products.length ? 'Deselect All' : 'Select All'}
				</Button>
			</div>
			<div className="max-h-32 space-y-1 overflow-y-auto rounded-lg border p-2">
				{products.map((product) => (
					<label
						key={product.id}
						className="flex cursor-pointer items-center gap-2 rounded-md p-2 hover:bg-accent"
					>
						<Checkbox
							checked={product.selected}
							onCheckedChange={() => onToggle(product.id)}
						/>
						<Package className="size-4 text-muted-foreground" />
						<span>{product.name}</span>
					</label>
				))}
			</div>
		</div>
	);
};

interface ChangePreviewProps {
	changes: AttributeChange[];
	attributes: Attribute[];
	productCount: number;
}

const ChangePreview = ({
	changes,
	attributes,
	productCount,
}: ChangePreviewProps) => {
	if (changes.length === 0) return null;

	return (
		<div className="rounded-lg border bg-muted/30 p-3">
			<p className="mb-2 text-sm font-medium">Changes to Apply:</p>
			<div className="space-y-1">
				{changes.map((change) => {
					const attr = attributes.find((a) => a.id === change.attributeId);
					if (!attr) return null;
					const Icon = attr.icon;
					return (
						<div
							key={change.attributeId}
							className="flex items-center gap-2 text-sm"
						>
							<Icon className="size-4 text-muted-foreground" />
							<span className="font-medium">{attr.name}:</span>
							<span className="text-primary">
								{change.value}
								{attr.unit ? ` ${attr.unit}` : ''}
							</span>
						</div>
					);
				})}
			</div>
			<p className="mt-2 text-xs text-muted-foreground">
				Will be applied to {productCount} products
			</p>
		</div>
	);
};

interface BulkAttributeModalProps {
	trigger: React.ReactNode;
	products: Product[];
	onApply: (productIds: string[], changes: AttributeChange[]) => void;
}

const BulkAttributeModal = ({
	trigger,
	products,
	onApply,
}: BulkAttributeModalProps) => {
	const [open, setOpen] = React.useState(false);
	const [productList, setProductList] = React.useState(products);
	const [activeAttributes, setActiveAttributes] = React.useState<string[]>([]);
	const [attributeValues, setAttributeValues] = React.useState<
		Record<string, string>
	>({});
	const [isApplying, setIsApplying] = React.useState(false);
	const [progress, setProgress] = React.useState(0);

	const attributes: Attribute[] = [
		{
			id: 'color',
			name: 'Color',
			icon: Palette,
			type: 'select',
			options: ['Red', 'Blue', 'Green', 'Black', 'White', 'Silver'],
		},
		{
			id: 'size',
			name: 'Size',
			icon: Ruler,
			type: 'select',
			options: ['XS', 'S', 'M', 'L', 'XL', 'XXL'],
		},
		{
			id: 'weight',
			name: 'Weight',
			icon: Weight,
			type: 'number',
			unit: 'kg',
		},
		{
			id: 'material',
			name: 'Material',
			icon: Boxes,
			type: 'select',
			options: ['Cotton', 'Polyester', 'Leather', 'Metal', 'Plastic', 'Wood'],
		},
	];

	const toggleProduct = (id: string) => {
		setProductList((prev) =>
			prev.map((p) => (p.id === id ? { ...p, selected: !p.selected } : p))
		);
	};

	const toggleAll = () => {
		const allSelected = productList.every((p) => p.selected);
		setProductList((prev) =>
			prev.map((p) => ({ ...p, selected: !allSelected }))
		);
	};

	const toggleAttribute = (id: string) => {
		setActiveAttributes((prev) =>
			prev.includes(id) ? prev.filter((a) => a !== id) : [...prev, id]
		);
	};

	const updateAttributeValue = (id: string, value: string) => {
		setAttributeValues((prev) => ({ ...prev, [id]: value }));
	};

	const getChanges = (): AttributeChange[] =>
		activeAttributes
			.filter((id) => attributeValues[id])
			.map((id) => ({ attributeId: id, value: attributeValues[id] }));

	const selectedProducts = productList.filter((p) => p.selected);
	const changes = getChanges();

	const handleApply = () => {
		setIsApplying(true);
		setProgress(0);

		const interval = setInterval(() => {
			setProgress((prev) => {
				if (prev >= 100) {
					clearInterval(interval);
					onApply(
						selectedProducts.map((p) => p.id),
						changes
					);
					setIsApplying(false);
					setOpen(false);
					return 100;
				}
				return prev + 20;
			});
		}, 300);
	};

	return (
		<Dialog open={open} onOpenChange={setOpen}>
			<DialogTrigger asChild>{trigger}</DialogTrigger>
			<DialogContent className="max-w-xl">
				<DialogHeader>
					<DialogTitle className="flex items-center gap-2">
						<Settings2 className="size-5" />
						Bulk Attribute Update
					</DialogTitle>
					<DialogDescription>
						Update attributes for multiple products at once
					</DialogDescription>
				</DialogHeader>

				<div className="space-y-4">
					<ProductList
						products={productList}
						onToggle={toggleProduct}
						onToggleAll={toggleAll}
					/>

					<Separator />

					<div className="space-y-2">
						<Label>Select Attributes to Update</Label>
						<div className="grid gap-3 @sm:grid-cols-2">
							{attributes.map((attr) => (
								<AttributeField
									key={attr.id}
									attribute={attr}
									value={attributeValues[attr.id] || ''}
									onChange={(v) => updateAttributeValue(attr.id, v)}
									isActive={activeAttributes.includes(attr.id)}
									onToggle={() => toggleAttribute(attr.id)}
								/>
							))}
						</div>
					</div>

					<ChangePreview
						changes={changes}
						attributes={attributes}
						productCount={selectedProducts.length}
					/>

					{isApplying && (
						<div className="space-y-2">
							<Progress value={progress} className="h-2" />
							<p className="text-center text-sm text-muted-foreground">
								Updating attributes...
							</p>
						</div>
					)}
				</div>

				<DialogFooter>
					<Button variant="outline" onClick={() => setOpen(false)}>
						Cancel
					</Button>
					<Button
						onClick={handleApply}
						disabled={
							isApplying ||
							selectedProducts.length === 0 ||
							changes.length === 0
						}
						className="gap-2"
					>
						{isApplying ? (
							<RefreshCw className="size-4 animate-spin" />
						) : (
							<Check className="size-4" />
						)}
						Apply Changes
					</Button>
				</DialogFooter>
			</DialogContent>
		</Dialog>
	);
};

export default function Main() {
	const products: Product[] = [
		{ id: '1', name: 'Wireless Mouse', selected: true },
		{ id: '2', name: 'USB Keyboard', selected: true },
		{ id: '3', name: 'Monitor Stand', selected: false },
		{ id: '4', name: 'Webcam HD', selected: true },
		{ id: '5', name: 'Desk Lamp', selected: false },
	];

	return (
		<section className="@container" data-theme="dashboard">
			<div className="mx-auto max-w-2xl space-y-6 px-4 py-8 @sm:px-6">
				<div className="flex items-center gap-3">
					<Settings2 className="size-5" />
					<h2 className="text-xl font-semibold">Bulk Attribute Updates</h2>
				</div>

				<BulkAttributeModal
					trigger={
						<Button className="w-full gap-2">
							<Settings2 className="size-4" />
							Update Product Attributes
						</Button>
					}
					products={products}
					onApply={(ids, changes) =>
						console.log('Applied', changes, 'to', ids)
					}
				/>
			</div>
		</section>
	);
}
