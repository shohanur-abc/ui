'use client';

import * as React from 'react';
import {
	Plus,
	Minus,
	X,
	Copy,
	Trash2,
	GripVertical,
	Image as ImageIcon,
	Palette,
	Ruler,
} from 'lucide-react';

import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from '@/components/ui/select';
import { Switch } from '@/components/ui/switch';
import { Separator } from '@/components/ui/separator';

interface VariantAttribute {
	id: string;
	name: string;
	values: string[];
}

interface ProductVariant {
	id: string;
	attributes: Record<string, string>;
	sku: string;
	price: number;
	stock: number;
	enabled: boolean;
}

interface AttributeEditorProps {
	attribute: VariantAttribute;
	onAddValue: (value: string) => void;
	onRemoveValue: (value: string) => void;
	onRemoveAttribute: () => void;
}

const AttributeEditor = ({
	attribute,
	onAddValue,
	onRemoveValue,
	onRemoveAttribute,
}: AttributeEditorProps) => {
	const [newValue, setNewValue] = React.useState('');

	const handleAdd = () => {
		if (newValue.trim()) {
			onAddValue(newValue.trim());
			setNewValue('');
		}
	};

	return (
		<div className="rounded-lg border bg-muted/30 p-4">
			<div className="mb-3 flex items-center justify-between">
				<div className="flex items-center gap-2">
					<GripVertical className="size-4 cursor-grab text-muted-foreground" />
					<span className="font-medium">{attribute.name}</span>
				</div>
				<Button variant="ghost" size="icon-sm" onClick={onRemoveAttribute}>
					<Trash2 className="size-4" />
				</Button>
			</div>
			<div className="flex flex-wrap gap-2">
				{attribute.values.map((value) => (
					<Badge key={value} variant="secondary" className="gap-1 pr-1">
						{value}
						<button
							onClick={() => onRemoveValue(value)}
							className="ml-1 rounded-full hover:bg-muted"
						>
							<X className="size-3" />
						</button>
					</Badge>
				))}
				<div className="flex gap-1">
					<Input
						value={newValue}
						onChange={(e) => setNewValue(e.target.value)}
						placeholder="Add value"
						className="h-6 w-24 text-xs"
						onKeyDown={(e) => e.key === 'Enter' && handleAdd()}
					/>
					<Button
						variant="ghost"
						size="icon-sm"
						className="size-6"
						onClick={handleAdd}
						disabled={!newValue.trim()}
					>
						<Plus className="size-3" />
					</Button>
				</div>
			</div>
		</div>
	);
};

interface AddAttributeButtonProps {
	onAdd: (name: string) => void;
	existingAttributes: string[];
	labels: {
		add: string;
		color: string;
		size: string;
		material: string;
		style: string;
	};
}

const AddAttributeButton = ({
	onAdd,
	existingAttributes,
	labels,
}: AddAttributeButtonProps) => {
	const allOptions = [
		{ id: 'color', name: labels.color, icon: Palette },
		{ id: 'size', name: labels.size, icon: Ruler },
		{ id: 'material', name: labels.material, icon: Ruler },
		{ id: 'style', name: labels.style, icon: Palette },
	];

	const availableOptions = allOptions.filter(
		(opt) => !existingAttributes.includes(opt.id),
	);

	if (availableOptions.length === 0) return null;

	return (
		<div className="flex flex-wrap gap-2">
			{availableOptions.map((opt) => (
				<Button
					key={opt.id}
					variant="outline"
					size="sm"
					className="gap-1.5"
					onClick={() => onAdd(opt.name)}
				>
					<opt.icon className="size-3.5" />
					{labels.add} {opt.name}
				</Button>
			))}
		</div>
	);
};

interface VariantRowProps {
	variant: ProductVariant;
	onUpdate: (field: keyof ProductVariant, value: any) => void;
	onDelete: () => void;
	onDuplicate: () => void;
}

const VariantRow = ({
	variant,
	onUpdate,
	onDelete,
	onDuplicate,
}: VariantRowProps) => (
	<div
		className={`grid items-center gap-4 rounded-lg border bg-card p-3 @sm:grid-cols-6 ${!variant.enabled ? 'opacity-50' : ''}`}
	>
		<div className="flex items-center gap-2 @sm:col-span-2">
			<GripVertical className="size-4 cursor-grab text-muted-foreground" />
			<div className="size-10 rounded-md bg-muted" />
			<div className="min-w-0">
				<p className="truncate text-sm font-medium">
					{Object.values(variant.attributes).join(' / ')}
				</p>
				<p className="text-xs text-muted-foreground">{variant.sku}</p>
			</div>
		</div>
		<div>
			<div className="relative">
				<span className="absolute left-2 top-1/2 -translate-y-1/2 text-xs text-muted-foreground">
					$
				</span>
				<Input
					type="number"
					value={variant.price}
					onChange={(e) => onUpdate('price', Number(e.target.value))}
					className="h-8 pl-5 text-sm"
				/>
			</div>
		</div>
		<div>
			<Input
				type="number"
				value={variant.stock}
				onChange={(e) => onUpdate('stock', Number(e.target.value))}
				className="h-8 text-sm"
			/>
		</div>
		<div className="flex items-center justify-center">
			<Switch
				checked={variant.enabled}
				onCheckedChange={(checked) => onUpdate('enabled', checked)}
			/>
		</div>
		<div className="flex items-center justify-end gap-1">
			<Button variant="ghost" size="icon-sm" onClick={onDuplicate}>
				<Copy className="size-4" />
			</Button>
			<Button variant="ghost" size="icon-sm" onClick={onDelete}>
				<Trash2 className="size-4" />
			</Button>
		</div>
	</div>
);

interface VariantSummaryProps {
	totalVariants: number;
	enabledVariants: number;
	totalStock: number;
	labels: { total: string; enabled: string; stock: string };
}

const VariantSummary = ({
	totalVariants,
	enabledVariants,
	totalStock,
	labels,
}: VariantSummaryProps) => (
	<div className="grid gap-4 rounded-lg border bg-muted/30 p-4 @sm:grid-cols-3">
		<div className="text-center">
			<p className="text-2xl font-bold">{totalVariants}</p>
			<p className="text-sm text-muted-foreground">{labels.total}</p>
		</div>
		<div className="text-center">
			<p className="text-2xl font-bold text-emerald-500">{enabledVariants}</p>
			<p className="text-sm text-muted-foreground">{labels.enabled}</p>
		</div>
		<div className="text-center">
			<p className="text-2xl font-bold">{totalStock}</p>
			<p className="text-sm text-muted-foreground">{labels.stock}</p>
		</div>
	</div>
);

export default function Main() {
	const [attributes, setAttributes] = React.useState<VariantAttribute[]>([
		{ id: 'color', name: 'Color', values: ['Black', 'White', 'Navy'] },
		{ id: 'size', name: 'Size', values: ['S', 'M', 'L', 'XL'] },
	]);

	const [variants, setVariants] = React.useState<ProductVariant[]>([
		{
			id: '1',
			attributes: { color: 'Black', size: 'S' },
			sku: 'TEE-BLK-S',
			price: 29.99,
			stock: 50,
			enabled: true,
		},
		{
			id: '2',
			attributes: { color: 'Black', size: 'M' },
			sku: 'TEE-BLK-M',
			price: 29.99,
			stock: 75,
			enabled: true,
		},
		{
			id: '3',
			attributes: { color: 'Black', size: 'L' },
			sku: 'TEE-BLK-L',
			price: 29.99,
			stock: 60,
			enabled: true,
		},
		{
			id: '4',
			attributes: { color: 'White', size: 'S' },
			sku: 'TEE-WHT-S',
			price: 29.99,
			stock: 45,
			enabled: true,
		},
		{
			id: '5',
			attributes: { color: 'White', size: 'M' },
			sku: 'TEE-WHT-M',
			price: 29.99,
			stock: 30,
			enabled: false,
		},
	]);

	const handleAddAttribute = (name: string) => {
		setAttributes((prev) => [
			...prev,
			{ id: name.toLowerCase(), name, values: [] },
		]);
	};

	const handleRemoveAttribute = (id: string) => {
		setAttributes((prev) => prev.filter((a) => a.id !== id));
	};

	const handleAddValue = (attrId: string, value: string) => {
		setAttributes((prev) =>
			prev.map((a) =>
				a.id === attrId ? { ...a, values: [...a.values, value] } : a,
			),
		);
	};

	const handleRemoveValue = (attrId: string, value: string) => {
		setAttributes((prev) =>
			prev.map((a) =>
				a.id === attrId
					? { ...a, values: a.values.filter((v) => v !== value) }
					: a,
			),
		);
	};

	const handleUpdateVariant = (
		variantId: string,
		field: keyof ProductVariant,
		value: any,
	) => {
		setVariants((prev) =>
			prev.map((v) => (v.id === variantId ? { ...v, [field]: value } : v)),
		);
	};

	const handleDeleteVariant = (id: string) => {
		setVariants((prev) => prev.filter((v) => v.id !== id));
	};

	const handleDuplicateVariant = (variant: ProductVariant) => {
		setVariants((prev) => [
			...prev,
			{ ...variant, id: Date.now().toString(), sku: `${variant.sku}-COPY` },
		]);
	};

	const enabledCount = variants.filter((v) => v.enabled).length;
	const totalStock = variants.reduce((sum, v) => sum + v.stock, 0);

	return (
		<section className="@container" data-theme="dashboard">
			<div className="mx-auto max-w-4xl space-y-6 px-4 py-8 @sm:px-6 @2xl:px-8">
				<div className="rounded-lg border bg-card p-6">
					<h2 className="mb-4 font-semibold">Variant Attributes</h2>
					<div className="space-y-3">
						{attributes.map((attr) => (
							<AttributeEditor
								key={attr.id}
								attribute={attr}
								onAddValue={(val) => handleAddValue(attr.id, val)}
								onRemoveValue={(val) => handleRemoveValue(attr.id, val)}
								onRemoveAttribute={() => handleRemoveAttribute(attr.id)}
							/>
						))}
					</div>
					<Separator className="my-4" />
					<AddAttributeButton
						onAdd={handleAddAttribute}
						existingAttributes={attributes.map((a) => a.id)}
						labels={{
							add: 'Add',
							color: 'Color',
							size: 'Size',
							material: 'Material',
							style: 'Style',
						}}
					/>
				</div>

				<VariantSummary
					totalVariants={variants.length}
					enabledVariants={enabledCount}
					totalStock={totalStock}
					labels={{
						total: 'Total Variants',
						enabled: 'Enabled',
						stock: 'Total Stock',
					}}
				/>

				<div className="space-y-3">
					<div className="flex items-center justify-between">
						<h3 className="font-semibold">Product Variants</h3>
						<Button size="sm" className="gap-1.5">
							<Plus className="size-4" />
							Generate Variants
						</Button>
					</div>

					<div className="hidden items-center gap-4 px-3 text-xs text-muted-foreground @sm:grid @sm:grid-cols-6">
						<span className="@sm:col-span-2">Variant</span>
						<span>Price</span>
						<span>Stock</span>
						<span className="text-center">Enabled</span>
						<span className="text-right">Actions</span>
					</div>

					<div className="space-y-2">
						{variants.map((variant) => (
							<VariantRow
								key={variant.id}
								variant={variant}
								onUpdate={(field, value) =>
									handleUpdateVariant(variant.id, field, value)
								}
								onDelete={() => handleDeleteVariant(variant.id)}
								onDuplicate={() => handleDuplicateVariant(variant)}
							/>
						))}
					</div>
				</div>
			</div>
		</section>
	);
}
