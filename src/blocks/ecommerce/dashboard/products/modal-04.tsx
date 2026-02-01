'use client';

import * as React from 'react';
import {
	Edit,
	X,
	Check,
	Package,
	DollarSign,
	Tag,
	Layers,
	Save,
} from 'lucide-react';

import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Switch } from '@/components/ui/switch';
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
	DialogFooter,
	DialogHeader,
	DialogTitle,
	DialogTrigger,
} from '@/components/ui/dialog';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

interface Product {
	id: string;
	name: string;
	sku: string;
	price: number;
	salePrice: number | null;
	stock: number;
	category: string;
	status: string;
	description: string;
}

interface QuickEditFieldProps {
	label: string;
	children: React.ReactNode;
}

const QuickEditField = ({ label, children }: QuickEditFieldProps) => (
	<div className="space-y-2">
		<Label>{label}</Label>
		{children}
	</div>
);

interface QuickEditModalProps {
	product: Product;
	trigger: React.ReactNode;
	onSave: (product: Product) => void;
}

const QuickEditModal = ({ product, trigger, onSave }: QuickEditModalProps) => {
	const [open, setOpen] = React.useState(false);
	const [editedProduct, setEditedProduct] = React.useState(product);

	const handleSave = () => {
		onSave(editedProduct);
		setOpen(false);
	};

	const updateField = <K extends keyof Product>(key: K, value: Product[K]) => {
		setEditedProduct((prev) => ({ ...prev, [key]: value }));
	};

	return (
		<Dialog open={open} onOpenChange={setOpen}>
			<DialogTrigger asChild>{trigger}</DialogTrigger>
			<DialogContent className="max-w-lg">
				<DialogHeader>
					<DialogTitle className="flex items-center gap-2">
						<Edit className="size-5" />
						Quick Edit: {product.name}
					</DialogTitle>
				</DialogHeader>

				<Tabs defaultValue="basic" className="mt-4">
					<TabsList className="grid w-full grid-cols-3">
						<TabsTrigger value="basic" className="gap-1">
							<Package className="size-3" />
							Basic
						</TabsTrigger>
						<TabsTrigger value="pricing" className="gap-1">
							<DollarSign className="size-3" />
							Pricing
						</TabsTrigger>
						<TabsTrigger value="inventory" className="gap-1">
							<Layers className="size-3" />
							Inventory
						</TabsTrigger>
					</TabsList>

					<TabsContent value="basic" className="mt-4 space-y-4">
						<QuickEditField label="Product Name">
							<Input
								value={editedProduct.name}
								onChange={(e) => updateField('name', e.target.value)}
							/>
						</QuickEditField>
						<QuickEditField label="SKU">
							<Input
								value={editedProduct.sku}
								onChange={(e) => updateField('sku', e.target.value)}
							/>
						</QuickEditField>
						<QuickEditField label="Category">
							<Select
								value={editedProduct.category}
								onValueChange={(v) => updateField('category', v)}
							>
								<SelectTrigger>
									<SelectValue />
								</SelectTrigger>
								<SelectContent>
									<SelectItem value="Electronics">Electronics</SelectItem>
									<SelectItem value="Clothing">Clothing</SelectItem>
									<SelectItem value="Home">Home</SelectItem>
									<SelectItem value="Sports">Sports</SelectItem>
								</SelectContent>
							</Select>
						</QuickEditField>
						<QuickEditField label="Status">
							<Select
								value={editedProduct.status}
								onValueChange={(v) => updateField('status', v)}
							>
								<SelectTrigger>
									<SelectValue />
								</SelectTrigger>
								<SelectContent>
									<SelectItem value="Active">Active</SelectItem>
									<SelectItem value="Draft">Draft</SelectItem>
									<SelectItem value="Archived">Archived</SelectItem>
								</SelectContent>
							</Select>
						</QuickEditField>
					</TabsContent>

					<TabsContent value="pricing" className="mt-4 space-y-4">
						<QuickEditField label="Regular Price">
							<div className="relative">
								<span className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground">
									$
								</span>
								<Input
									type="number"
									value={editedProduct.price}
									onChange={(e) =>
										updateField('price', parseFloat(e.target.value) || 0)
									}
									className="pl-7"
								/>
							</div>
						</QuickEditField>
						<QuickEditField label="Sale Price">
							<div className="relative">
								<span className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground">
									$
								</span>
								<Input
									type="number"
									value={editedProduct.salePrice || ''}
									onChange={(e) =>
										updateField(
											'salePrice',
											e.target.value ? parseFloat(e.target.value) : null,
										)
									}
									className="pl-7"
									placeholder="No sale"
								/>
							</div>
						</QuickEditField>
						{editedProduct.salePrice && (
							<div className="rounded-md bg-green-500/10 p-3 text-green-600">
								Discount:{' '}
								{Math.round(
									((editedProduct.price - editedProduct.salePrice) /
										editedProduct.price) *
										100,
								)}
								% off
							</div>
						)}
					</TabsContent>

					<TabsContent value="inventory" className="mt-4 space-y-4">
						<QuickEditField label="Stock Quantity">
							<Input
								type="number"
								value={editedProduct.stock}
								onChange={(e) =>
									updateField('stock', parseInt(e.target.value) || 0)
								}
							/>
						</QuickEditField>
						<div className="rounded-md border p-3">
							<div className="flex items-center justify-between">
								<div>
									<p className="font-medium">Low Stock Alert</p>
									<p className="text-sm text-muted-foreground">
										Stock: {editedProduct.stock} units
									</p>
								</div>
								<Badge
									variant={
										editedProduct.stock > 50
											? 'default'
											: editedProduct.stock > 10
												? 'secondary'
												: 'destructive'
									}
								>
									{editedProduct.stock > 50
										? 'In Stock'
										: editedProduct.stock > 10
											? 'Low Stock'
											: 'Critical'}
								</Badge>
							</div>
						</div>
					</TabsContent>
				</Tabs>

				<DialogFooter className="mt-4">
					<Button variant="outline" onClick={() => setOpen(false)}>
						Cancel
					</Button>
					<Button onClick={handleSave} className="gap-2">
						<Save className="size-4" />
						Save Changes
					</Button>
				</DialogFooter>
			</DialogContent>
		</Dialog>
	);
};

interface InlineEditCellProps {
	value: string | number;
	type?: 'text' | 'number';
	prefix?: string;
	onSave: (value: string | number) => void;
}

const InlineEditCell = ({
	value,
	type = 'text',
	prefix,
	onSave,
}: InlineEditCellProps) => {
	const [isEditing, setIsEditing] = React.useState(false);
	const [editValue, setEditValue] = React.useState(value);

	const handleSave = () => {
		onSave(editValue);
		setIsEditing(false);
	};

	const handleCancel = () => {
		setEditValue(value);
		setIsEditing(false);
	};

	if (isEditing) {
		return (
			<div className="flex items-center gap-1">
				<Input
					type={type}
					value={editValue}
					onChange={(e) =>
						setEditValue(
							type === 'number' ? parseFloat(e.target.value) : e.target.value,
						)
					}
					className="h-8 w-24"
					autoFocus
					onKeyDown={(e) => {
						if (e.key === 'Enter') handleSave();
						if (e.key === 'Escape') handleCancel();
					}}
				/>
				<Button variant="ghost" size="icon-sm" onClick={handleSave}>
					<Check className="size-3 text-green-500" />
				</Button>
				<Button variant="ghost" size="icon-sm" onClick={handleCancel}>
					<X className="size-3 text-red-500" />
				</Button>
			</div>
		);
	}

	return (
		<button
			onClick={() => setIsEditing(true)}
			className="group flex items-center gap-1 rounded px-2 py-1 hover:bg-accent"
		>
			{prefix}
			{value}
			<Edit className="size-3 opacity-0 transition-opacity group-hover:opacity-100" />
		</button>
	);
};

export default function Main() {
	const [products, setProducts] = React.useState<Product[]>([
		{
			id: '1',
			name: 'Wireless Mouse',
			sku: 'WM-001',
			price: 29.99,
			salePrice: null,
			stock: 100,
			category: 'Electronics',
			status: 'Active',
			description: 'High-quality wireless mouse',
		},
		{
			id: '2',
			name: 'USB Keyboard',
			sku: 'KB-001',
			price: 49.99,
			salePrice: 39.99,
			stock: 45,
			category: 'Electronics',
			status: 'Active',
			description: 'Mechanical keyboard',
		},
		{
			id: '3',
			name: 'Monitor Stand',
			sku: 'MS-001',
			price: 39.99,
			salePrice: null,
			stock: 8,
			category: 'Home',
			status: 'Draft',
			description: 'Adjustable monitor stand',
		},
	]);

	const updateProduct = (updated: Product) => {
		setProducts((prev) => prev.map((p) => (p.id === updated.id ? updated : p)));
	};

	const updateProductField = <K extends keyof Product>(
		id: string,
		key: K,
		value: Product[K],
	) => {
		setProducts((prev) =>
			prev.map((p) => (p.id === id ? { ...p, [key]: value } : p)),
		);
	};

	return (
		<section className="@container" data-theme="dashboard">
			<div className="mx-auto max-w-4xl space-y-6 px-4 py-8 @sm:px-6 @2xl:px-8">
				<div className="flex items-center gap-3">
					<Edit className="size-5" />
					<h2 className="text-xl font-semibold">Quick Edit Modals</h2>
				</div>

				<div className="space-y-4">
					{products.map((product) => (
						<div
							key={product.id}
							className="flex flex-wrap items-center gap-4 rounded-lg border bg-card p-4"
						>
							<div className="flex-1">
								<div className="flex items-center gap-2">
									<InlineEditCell
										value={product.name}
										onSave={(v) =>
											updateProductField(product.id, 'name', v as string)
										}
									/>
									<Badge
										variant={
											product.status === 'Active' ? 'default' : 'secondary'
										}
									>
										{product.status}
									</Badge>
								</div>
								<p className="text-sm text-muted-foreground">{product.sku}</p>
							</div>

							<div className="flex items-center gap-4">
								<div className="text-right">
									<InlineEditCell
										value={product.price}
										type="number"
										prefix="$"
										onSave={(v) =>
											updateProductField(product.id, 'price', v as number)
										}
									/>
									{product.salePrice && (
										<p className="text-sm text-green-500">
											Sale: ${product.salePrice}
										</p>
									)}
								</div>

								<div className="text-right">
									<InlineEditCell
										value={product.stock}
										type="number"
										onSave={(v) =>
											updateProductField(product.id, 'stock', v as number)
										}
									/>
									<p className="text-xs text-muted-foreground">in stock</p>
								</div>

								<QuickEditModal
									product={product}
									trigger={
										<Button variant="outline" size="sm" className="gap-2">
											<Edit className="size-4" />
											Full Edit
										</Button>
									}
									onSave={updateProduct}
								/>
							</div>
						</div>
					))}
				</div>
			</div>
		</section>
	);
}
