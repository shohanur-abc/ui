'use client';

import * as React from 'react';
import {
	Zap,
	Plus,
	X,
	Wand2,
	Image as ImageIcon,
	FileText,
	Package,
	DollarSign,
	Tag,
	Loader2,
} from 'lucide-react';

import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
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
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

interface QuickAddField {
	name: string;
	label: string;
	type: 'text' | 'number' | 'select' | 'textarea';
	required: boolean;
	options?: string[];
	placeholder?: string;
}

interface QuickFieldInputProps {
	field: QuickAddField;
	value: string | number;
	onChange: (value: string | number) => void;
}

const QuickFieldInput = ({ field, value, onChange }: QuickFieldInputProps) => {
	switch (field.type) {
		case 'textarea':
			return (
				<div className="space-y-2">
					<Label>
						{field.label}
						{field.required && <span className="text-destructive">*</span>}
					</Label>
					<Textarea
						value={value as string}
						onChange={(e) => onChange(e.target.value)}
						placeholder={field.placeholder}
						rows={3}
					/>
				</div>
			);
		case 'select':
			return (
				<div className="space-y-2">
					<Label>
						{field.label}
						{field.required && <span className="text-destructive">*</span>}
					</Label>
					<Select value={value as string} onValueChange={onChange}>
						<SelectTrigger>
							<SelectValue placeholder={field.placeholder} />
						</SelectTrigger>
						<SelectContent>
							{field.options?.map((opt) => (
								<SelectItem key={opt} value={opt}>
									{opt}
								</SelectItem>
							))}
						</SelectContent>
					</Select>
				</div>
			);
		case 'number':
			return (
				<div className="space-y-2">
					<Label>
						{field.label}
						{field.required && <span className="text-destructive">*</span>}
					</Label>
					<Input
						type="number"
						value={value}
						onChange={(e) => onChange(parseFloat(e.target.value) || 0)}
						placeholder={field.placeholder}
					/>
				</div>
			);
		default:
			return (
				<div className="space-y-2">
					<Label>
						{field.label}
						{field.required && <span className="text-destructive">*</span>}
					</Label>
					<Input
						value={value as string}
						onChange={(e) => onChange(e.target.value)}
						placeholder={field.placeholder}
					/>
				</div>
			);
	}
};

interface QuickAddModalProps {
	title: string;
	fields: QuickAddField[];
	onSubmit: (data: Record<string, string | number>) => void;
	trigger: React.ReactNode;
}

const QuickAddModal = ({
	title,
	fields,
	onSubmit,
	trigger,
}: QuickAddModalProps) => {
	const [open, setOpen] = React.useState(false);
	const [formData, setFormData] = React.useState<
		Record<string, string | number>
	>({});

	const handleSubmit = () => {
		onSubmit(formData);
		setFormData({});
		setOpen(false);
	};

	return (
		<Dialog open={open} onOpenChange={setOpen}>
			<DialogTrigger asChild>{trigger}</DialogTrigger>
			<DialogContent>
				<DialogHeader>
					<DialogTitle>{title}</DialogTitle>
				</DialogHeader>
				<div className="space-y-4 py-4">
					{fields.map((field) => (
						<QuickFieldInput
							key={field.name}
							field={field}
							value={formData[field.name] || ''}
							onChange={(v) =>
								setFormData((prev) => ({ ...prev, [field.name]: v }))
							}
						/>
					))}
				</div>
				<DialogFooter>
					<Button variant="outline" onClick={() => setOpen(false)}>
						Cancel
					</Button>
					<Button onClick={handleSubmit}>Add</Button>
				</DialogFooter>
			</DialogContent>
		</Dialog>
	);
};

interface QuickActionCardProps {
	icon: React.ElementType;
	title: string;
	description: string;
	onClick: () => void;
}

const QuickActionCard = ({
	icon: Icon,
	title,
	description,
	onClick,
}: QuickActionCardProps) => (
	<button
		onClick={onClick}
		className="flex items-start gap-3 rounded-lg border bg-card p-4 text-left transition-colors hover:bg-accent"
	>
		<div className="flex size-10 items-center justify-center rounded-lg bg-primary/10">
			<Icon className="size-5 text-primary" />
		</div>
		<div>
			<p className="font-medium">{title}</p>
			<p className="text-sm text-muted-foreground">{description}</p>
		</div>
	</button>
);

interface AiGeneratorProps {
	onGenerate: (prompt: string) => void;
	isGenerating: boolean;
}

const AiGenerator = ({ onGenerate, isGenerating }: AiGeneratorProps) => {
	const [prompt, setPrompt] = React.useState('');

	const suggestions = [
		'Wireless Bluetooth Headphones with noise cancellation',
		'Organic cotton t-shirt in multiple colors',
		'Smart home security camera with night vision',
	];

	return (
		<Card>
			<CardHeader className="pb-3">
				<CardTitle className="flex items-center gap-2 text-base">
					<Wand2 className="size-4 text-primary" />
					AI Product Generator
				</CardTitle>
			</CardHeader>
			<CardContent className="space-y-4">
				<div className="space-y-2">
					<Label>Describe your product</Label>
					<Textarea
						value={prompt}
						onChange={(e) => setPrompt(e.target.value)}
						placeholder="Enter a product description and let AI generate the details..."
						rows={3}
					/>
				</div>
				<div className="flex flex-wrap gap-2">
					<span className="text-sm text-muted-foreground">Try:</span>
					{suggestions.map((s) => (
						<Badge
							key={s}
							variant="outline"
							className="cursor-pointer"
							onClick={() => setPrompt(s)}
						>
							{s}
						</Badge>
					))}
				</div>
				<Button
					className="w-full gap-2"
					onClick={() => onGenerate(prompt)}
					disabled={!prompt || isGenerating}
				>
					{isGenerating ? (
						<Loader2 className="size-4 animate-spin" />
					) : (
						<Wand2 className="size-4" />
					)}
					{isGenerating ? 'Generating...' : 'Generate Product'}
				</Button>
			</CardContent>
		</Card>
	);
};

interface RecentlyAddedProps {
	products: { id: string; name: string; sku: string; addedAt: string }[];
}

const RecentlyAdded = ({ products }: RecentlyAddedProps) => (
	<Card>
		<CardHeader className="pb-3">
			<CardTitle className="text-base">Recently Added</CardTitle>
		</CardHeader>
		<CardContent>
			<div className="space-y-3">
				{products.map((product) => (
					<div
						key={product.id}
						className="flex items-center justify-between rounded-lg border p-3"
					>
						<div className="flex items-center gap-3">
							<div className="flex size-10 items-center justify-center rounded bg-muted text-xl">
								📦
							</div>
							<div>
								<p className="font-medium">{product.name}</p>
								<p className="text-sm text-muted-foreground">{product.sku}</p>
							</div>
						</div>
						<span className="text-sm text-muted-foreground">
							{product.addedAt}
						</span>
					</div>
				))}
			</div>
		</CardContent>
	</Card>
);

export default function Main() {
	const [isGenerating, setIsGenerating] = React.useState(false);

	const productFields: QuickAddField[] = [
		{
			name: 'name',
			label: 'Product Name',
			type: 'text',
			required: true,
			placeholder: 'Enter product name',
		},
		{
			name: 'sku',
			label: 'SKU',
			type: 'text',
			required: true,
			placeholder: 'e.g., PROD-001',
		},
		{
			name: 'price',
			label: 'Price',
			type: 'number',
			required: true,
			placeholder: '0.00',
		},
		{
			name: 'category',
			label: 'Category',
			type: 'select',
			required: true,
			options: ['Electronics', 'Clothing', 'Home', 'Sports'],
		},
		{
			name: 'description',
			label: 'Description',
			type: 'textarea',
			required: false,
			placeholder: 'Product description...',
		},
	];

	const categoryFields: QuickAddField[] = [
		{ name: 'name', label: 'Category Name', type: 'text', required: true },
		{
			name: 'parent',
			label: 'Parent Category',
			type: 'select',
			required: false,
			options: ['None', 'Electronics', 'Clothing', 'Home'],
		},
		{
			name: 'description',
			label: 'Description',
			type: 'textarea',
			required: false,
		},
	];

	const recentProducts = [
		{ id: '1', name: 'Wireless Mouse', sku: 'WM-001', addedAt: '5 min ago' },
		{ id: '2', name: 'USB-C Cable', sku: 'USB-C-2M', addedAt: '1 hour ago' },
		{ id: '3', name: 'Laptop Stand', sku: 'LS-PRO', addedAt: '2 hours ago' },
	];

	const handleAiGenerate = (prompt: string) => {
		setIsGenerating(true);
		setTimeout(() => setIsGenerating(false), 2000);
	};

	return (
		<section className="@container" data-theme="dashboard">
			<div className="mx-auto max-w-4xl space-y-6 px-4 py-8 @sm:px-6 @2xl:px-8">
				<div className="flex items-center gap-3">
					<Zap className="size-5" />
					<h2 className="text-xl font-semibold">Quick Add</h2>
				</div>

				<div className="grid gap-4 @sm:grid-cols-2 @lg:grid-cols-4">
					<QuickAddModal
						title="Quick Add Product"
						fields={productFields}
						onSubmit={(data) => console.log('Product added:', data)}
						trigger={
							<QuickActionCard
								icon={Package}
								title="Add Product"
								description="Create a new product"
								onClick={() => {}}
							/>
						}
					/>
					<QuickAddModal
						title="Quick Add Category"
						fields={categoryFields}
						onSubmit={(data) => console.log('Category added:', data)}
						trigger={
							<QuickActionCard
								icon={Tag}
								title="Add Category"
								description="Create a new category"
								onClick={() => {}}
							/>
						}
					/>
					<QuickActionCard
						icon={ImageIcon}
						title="Upload Images"
						description="Bulk upload product images"
						onClick={() => {}}
					/>
					<QuickActionCard
						icon={FileText}
						title="Import CSV"
						description="Import products from file"
						onClick={() => {}}
					/>
				</div>

				<div className="grid gap-6 @lg:grid-cols-2">
					<AiGenerator
						onGenerate={handleAiGenerate}
						isGenerating={isGenerating}
					/>
					<RecentlyAdded products={recentProducts} />
				</div>
			</div>
		</section>
	);
}
