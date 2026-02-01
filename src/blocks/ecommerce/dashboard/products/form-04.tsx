'use client';

import * as React from 'react';
import {
	Plus,
	X,
	GripVertical,
	Copy,
	Trash2,
	ChevronDown,
	ChevronUp,
	Image as ImageIcon,
	DollarSign,
	Package,
} from 'lucide-react';

import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Switch } from '@/components/ui/switch';
import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from '@/components/ui/select';
import {
	Collapsible,
	CollapsibleContent,
	CollapsibleTrigger,
} from '@/components/ui/collapsible';
import { Separator } from '@/components/ui/separator';
import {
	Table,
	TableBody,
	TableCell,
	TableHead,
	TableHeader,
	TableRow,
} from '@/components/ui/table';

interface Attribute {
	id: string;
	name: string;
	values: string[];
}

interface Variant {
	id: string;
	attributes: Record<string, string>;
	sku: string;
	price: number;
	stock: number;
	enabled: boolean;
}

interface AttributeEditorProps {
	attribute: Attribute;
	onUpdate: (updates: Partial<Attribute>) => void;
	onRemove: () => void;
	onAddValue: (value: string) => void;
	onRemoveValue: (value: string) => void;
}

const AttributeEditor = ({
	attribute,
	onUpdate,
	onRemove,
	onAddValue,
	onRemoveValue,
}: AttributeEditorProps) => {
	const [newValue, setNewValue] = React.useState('');

	const handleAddValue = () => {
		if (newValue.trim() && !attribute.values.includes(newValue.trim())) {
			onAddValue(newValue.trim());
			setNewValue('');
		}
	};

	return (
		<div className="rounded-lg border bg-card p-4">
			<div className="mb-3 flex items-center justify-between">
				<div className="flex items-center gap-2">
					<GripVertical className="size-4 cursor-grab text-muted-foreground" />
					<Input
						value={attribute.name}
						onChange={(e) => onUpdate({ name: e.target.value })}
						className="w-40"
						placeholder="Attribute name"
					/>
				</div>
				<Button variant="ghost" size="icon-sm" onClick={onRemove}>
					<Trash2 className="size-4" />
				</Button>
			</div>

			<div className="flex flex-wrap gap-2">
				{attribute.values.map((value) => (
					<Badge key={value} variant="secondary" className="gap-1">
						{value}
						<button onClick={() => onRemoveValue(value)}>
							<X className="size-3" />
						</button>
					</Badge>
				))}
				<div className="flex gap-1">
					<Input
						value={newValue}
						onChange={(e) => setNewValue(e.target.value)}
						onKeyDown={(e) => e.key === 'Enter' && handleAddValue()}
						placeholder="Add value..."
						className="h-6 w-24 text-xs"
					/>
					<Button variant="ghost" size="icon-sm" onClick={handleAddValue}>
						<Plus className="size-3" />
					</Button>
				</div>
			</div>
		</div>
	);
};

interface VariantRowProps {
	variant: Variant;
	attributes: Attribute[];
	onUpdate: (updates: Partial<Variant>) => void;
	onDuplicate: () => void;
	onDelete: () => void;
}

const VariantRow = ({
	variant,
	attributes,
	onUpdate,
	onDuplicate,
	onDelete,
}: VariantRowProps) => (
	<TableRow className={!variant.enabled ? 'opacity-50' : ''}>
		<TableCell>
			<Switch
				checked={variant.enabled}
				onCheckedChange={(enabled) => onUpdate({ enabled })}
			/>
		</TableCell>
		{attributes.map((attr) => (
			<TableCell key={attr.id}>
				<Select
					value={variant.attributes[attr.name] || ''}
					onValueChange={(v) =>
						onUpdate({
							attributes: { ...variant.attributes, [attr.name]: v },
						})
					}
				>
					<SelectTrigger className="h-8 w-24">
						<SelectValue placeholder="Select..." />
					</SelectTrigger>
					<SelectContent>
						{attr.values.map((val) => (
							<SelectItem key={val} value={val}>
								{val}
							</SelectItem>
						))}
					</SelectContent>
				</Select>
			</TableCell>
		))}
		<TableCell>
			<Input
				value={variant.sku}
				onChange={(e) => onUpdate({ sku: e.target.value })}
				className="h-8 w-28"
				placeholder="SKU"
			/>
		</TableCell>
		<TableCell>
			<div className="relative">
				<span className="absolute left-2 top-1/2 -translate-y-1/2 text-xs text-muted-foreground">
					$
				</span>
				<Input
					type="number"
					value={variant.price}
					onChange={(e) => onUpdate({ price: parseFloat(e.target.value) || 0 })}
					className="h-8 w-20 pl-5"
				/>
			</div>
		</TableCell>
		<TableCell>
			<Input
				type="number"
				value={variant.stock}
				onChange={(e) => onUpdate({ stock: parseInt(e.target.value) || 0 })}
				className="h-8 w-16"
			/>
		</TableCell>
		<TableCell>
			<div className="flex gap-1">
				<Button variant="ghost" size="icon-sm" onClick={onDuplicate}>
					<Copy className="size-3" />
				</Button>
				<Button variant="ghost" size="icon-sm" onClick={onDelete}>
					<Trash2 className="size-3" />
				</Button>
			</div>
		</TableCell>
	</TableRow>
);

interface BulkPricingProps {
	onApply: (type: 'set' | 'increase' | 'decrease', value: number) => void;
}

const BulkPricing = ({ onApply }: BulkPricingProps) => {
	const [type, setType] = React.useState<'set' | 'increase' | 'decrease'>(
		'set',
	);
	const [value, setValue] = React.useState('');

	return (
		<div className="flex items-center gap-2 rounded-lg border bg-muted/30 p-2">
			<Select value={type} onValueChange={(v: typeof type) => setType(v)}>
				<SelectTrigger className="h-8 w-32">
					<SelectValue />
				</SelectTrigger>
				<SelectContent>
					<SelectItem value="set">Set price to</SelectItem>
					<SelectItem value="increase">Increase by %</SelectItem>
					<SelectItem value="decrease">Decrease by %</SelectItem>
				</SelectContent>
			</Select>
			<Input
				type="number"
				value={value}
				onChange={(e) => setValue(e.target.value)}
				placeholder="Value"
				className="h-8 w-24"
			/>
			<Button
				size="sm"
				onClick={() => onApply(type, parseFloat(value) || 0)}
				disabled={!value}
			>
				Apply to All
			</Button>
		</div>
	);
};

export default function Main() {
	const [attributes, setAttributes] = React.useState<Attribute[]>([
		{ id: '1', name: 'Size', values: ['S', 'M', 'L', 'XL'] },
		{ id: '2', name: 'Color', values: ['Black', 'White', 'Blue'] },
	]);

	const [variants, setVariants] = React.useState<Variant[]>([
		{
			id: '1',
			attributes: { Size: 'M', Color: 'Black' },
			sku: 'PROD-M-BLK',
			price: 49.99,
			stock: 100,
			enabled: true,
		},
		{
			id: '2',
			attributes: { Size: 'L', Color: 'Black' },
			sku: 'PROD-L-BLK',
			price: 49.99,
			stock: 75,
			enabled: true,
		},
		{
			id: '3',
			attributes: { Size: 'M', Color: 'White' },
			sku: 'PROD-M-WHT',
			price: 49.99,
			stock: 50,
			enabled: true,
		},
		{
			id: '4',
			attributes: { Size: 'XL', Color: 'Blue' },
			sku: 'PROD-XL-BLU',
			price: 54.99,
			stock: 25,
			enabled: false,
		},
	]);

	const addAttribute = () => {
		setAttributes((prev) => [
			...prev,
			{ id: `${Date.now()}`, name: '', values: [] },
		]);
	};

	const updateAttribute = (id: string, updates: Partial<Attribute>) => {
		setAttributes((prev) =>
			prev.map((attr) => (attr.id === id ? { ...attr, ...updates } : attr)),
		);
	};

	const removeAttribute = (id: string) => {
		setAttributes((prev) => prev.filter((attr) => attr.id !== id));
	};

	const addAttributeValue = (id: string, value: string) => {
		setAttributes((prev) =>
			prev.map((attr) =>
				attr.id === id ? { ...attr, values: [...attr.values, value] } : attr,
			),
		);
	};

	const removeAttributeValue = (id: string, value: string) => {
		setAttributes((prev) =>
			prev.map((attr) =>
				attr.id === id
					? { ...attr, values: attr.values.filter((v) => v !== value) }
					: attr,
			),
		);
	};

	const updateVariant = (id: string, updates: Partial<Variant>) => {
		setVariants((prev) =>
			prev.map((v) => (v.id === id ? { ...v, ...updates } : v)),
		);
	};

	const duplicateVariant = (id: string) => {
		const variant = variants.find((v) => v.id === id);
		if (variant) {
			setVariants((prev) => [
				...prev,
				{ ...variant, id: `${Date.now()}`, sku: `${variant.sku}-COPY` },
			]);
		}
	};

	const deleteVariant = (id: string) => {
		setVariants((prev) => prev.filter((v) => v.id !== id));
	};

	const applyBulkPricing = (
		type: 'set' | 'increase' | 'decrease',
		value: number,
	) => {
		setVariants((prev) =>
			prev.map((v) => {
				if (!v.enabled) return v;
				let newPrice = v.price;
				if (type === 'set') newPrice = value;
				else if (type === 'increase') newPrice = v.price * (1 + value / 100);
				else if (type === 'decrease') newPrice = v.price * (1 - value / 100);
				return { ...v, price: Math.round(newPrice * 100) / 100 };
			}),
		);
	};

	return (
		<section className="@container" data-theme="dashboard">
			<div className="mx-auto max-w-5xl space-y-6 px-4 py-8 @sm:px-6 @2xl:px-8">
				<div className="flex items-center justify-between">
					<h2 className="text-xl font-semibold">Variant Editor</h2>
					<Badge variant="secondary">{variants.length} variants</Badge>
				</div>

				<div className="space-y-3">
					<div className="flex items-center justify-between">
						<h3 className="font-medium">Attributes</h3>
						<Button
							variant="outline"
							size="sm"
							onClick={addAttribute}
							className="gap-2"
						>
							<Plus className="size-4" />
							Add Attribute
						</Button>
					</div>
					{attributes.map((attr) => (
						<AttributeEditor
							key={attr.id}
							attribute={attr}
							onUpdate={(updates) => updateAttribute(attr.id, updates)}
							onRemove={() => removeAttribute(attr.id)}
							onAddValue={(value) => addAttributeValue(attr.id, value)}
							onRemoveValue={(value) => removeAttributeValue(attr.id, value)}
						/>
					))}
				</div>

				<Separator />

				<div className="space-y-3">
					<div className="flex items-center justify-between">
						<h3 className="font-medium">Variants</h3>
						<BulkPricing onApply={applyBulkPricing} />
					</div>

					<div className="overflow-x-auto rounded-lg border">
						<Table>
							<TableHeader>
								<TableRow>
									<TableHead className="w-12">Active</TableHead>
									{attributes.map((attr) => (
										<TableHead key={attr.id}>{attr.name}</TableHead>
									))}
									<TableHead>SKU</TableHead>
									<TableHead>Price</TableHead>
									<TableHead>Stock</TableHead>
									<TableHead className="w-20">Actions</TableHead>
								</TableRow>
							</TableHeader>
							<TableBody>
								{variants.map((variant) => (
									<VariantRow
										key={variant.id}
										variant={variant}
										attributes={attributes}
										onUpdate={(updates) => updateVariant(variant.id, updates)}
										onDuplicate={() => duplicateVariant(variant.id)}
										onDelete={() => deleteVariant(variant.id)}
									/>
								))}
							</TableBody>
						</Table>
					</div>
				</div>

				<div className="flex justify-end gap-2">
					<Button variant="outline">Generate All Combinations</Button>
					<Button>Save Variants</Button>
				</div>
			</div>
		</section>
	);
}
