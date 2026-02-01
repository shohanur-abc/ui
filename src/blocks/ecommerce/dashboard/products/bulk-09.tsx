'use client';

import * as React from 'react';
import {
	Copy,
	Check,
	X,
	Package,
	RefreshCw,
	Settings,
	Image,
	DollarSign,
	Layers,
} from 'lucide-react';

import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Checkbox } from '@/components/ui/checkbox';
import { Switch } from '@/components/ui/switch';
import { Progress } from '@/components/ui/progress';
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

interface DuplicateOption {
	id: string;
	label: string;
	description: string;
	icon: React.ElementType;
	enabled: boolean;
}

interface Product {
	id: string;
	name: string;
	sku: string;
	price: number;
	variants: number;
	selected: boolean;
}

interface DuplicateOptionsProps {
	options: DuplicateOption[];
	onToggle: (id: string) => void;
}

const DuplicateOptions = ({ options, onToggle }: DuplicateOptionsProps) => (
	<div className="space-y-3">
		{options.map((option) => {
			const Icon = option.icon;
			return (
				<div
					key={option.id}
					className="flex items-center justify-between rounded-lg border p-3"
				>
					<div className="flex items-center gap-3">
						<Icon className="size-5 text-muted-foreground" />
						<div>
							<p className="font-medium">{option.label}</p>
							<p className="text-sm text-muted-foreground">
								{option.description}
							</p>
						</div>
					</div>
					<Switch
						checked={option.enabled}
						onCheckedChange={() => onToggle(option.id)}
					/>
				</div>
			);
		})}
	</div>
);

interface NamingOptionsProps {
	prefix: string;
	suffix: string;
	onPrefixChange: (value: string) => void;
	onSuffixChange: (value: string) => void;
}

const NamingOptions = ({
	prefix,
	suffix,
	onPrefixChange,
	onSuffixChange,
}: NamingOptionsProps) => (
	<div className="space-y-3">
		<div className="grid gap-3 @sm:grid-cols-2">
			<div className="space-y-2">
				<Label>Prefix</Label>
				<Input
					value={prefix}
					onChange={(e) => onPrefixChange(e.target.value)}
					placeholder="e.g., Copy of"
				/>
			</div>
			<div className="space-y-2">
				<Label>Suffix</Label>
				<Input
					value={suffix}
					onChange={(e) => onSuffixChange(e.target.value)}
					placeholder="e.g., (Copy)"
				/>
			</div>
		</div>
		<div className="rounded-lg bg-muted/30 p-3">
			<p className="text-sm text-muted-foreground">Preview:</p>
			<p className="font-medium">
				{prefix || ''}Product Name{suffix ? ` ${suffix}` : ''}
			</p>
		</div>
	</div>
);

interface ProductDuplicateRowProps {
	product: Product;
	prefix: string;
	suffix: string;
	onToggle: () => void;
}

const ProductDuplicateRow = ({
	product,
	prefix,
	suffix,
	onToggle,
}: ProductDuplicateRowProps) => (
	<div className="flex items-center gap-3 rounded-lg border p-3">
		<Checkbox checked={product.selected} onCheckedChange={onToggle} />
		<Package className="size-4 text-muted-foreground" />
		<div className="flex-1">
			<p className="font-medium">{product.name}</p>
			<p className="text-xs text-muted-foreground">{product.sku}</p>
		</div>
		<div className="text-right text-sm">
			<p className="text-muted-foreground">New name:</p>
			<p className="font-medium text-primary">
				{prefix}
				{product.name}
				{suffix ? ` ${suffix}` : ''}
			</p>
		</div>
	</div>
);

interface BulkDuplicateModalProps {
	trigger: React.ReactNode;
	products: Product[];
	onDuplicate: (
		productIds: string[],
		options: { prefix: string; suffix: string; include: string[] }
	) => void;
}

const BulkDuplicateModal = ({
	trigger,
	products,
	onDuplicate,
}: BulkDuplicateModalProps) => {
	const [open, setOpen] = React.useState(false);
	const [productList, setProductList] = React.useState(products);
	const [prefix, setPrefix] = React.useState('Copy of ');
	const [suffix, setSuffix] = React.useState('');
	const [isDuplicating, setIsDuplicating] = React.useState(false);
	const [progress, setProgress] = React.useState(0);
	const [duplicateOptions, setDuplicateOptions] = React.useState<
		DuplicateOption[]
	>([
		{
			id: 'images',
			label: 'Include Images',
			description: 'Duplicate all product images',
			icon: Image,
			enabled: true,
		},
		{
			id: 'pricing',
			label: 'Include Pricing',
			description: 'Copy all pricing information',
			icon: DollarSign,
			enabled: true,
		},
		{
			id: 'variants',
			label: 'Include Variants',
			description: 'Duplicate all product variants',
			icon: Layers,
			enabled: true,
		},
		{
			id: 'settings',
			label: 'Include Settings',
			description: 'Copy SEO and visibility settings',
			icon: Settings,
			enabled: false,
		},
	]);

	const toggleProduct = (id: string) => {
		setProductList((prev) =>
			prev.map((p) => (p.id === id ? { ...p, selected: !p.selected } : p))
		);
	};

	const toggleOption = (id: string) => {
		setDuplicateOptions((prev) =>
			prev.map((o) => (o.id === id ? { ...o, enabled: !o.enabled } : o))
		);
	};

	const selectedProducts = productList.filter((p) => p.selected);
	const enabledOptions = duplicateOptions
		.filter((o) => o.enabled)
		.map((o) => o.id);

	const handleDuplicate = () => {
		setIsDuplicating(true);
		setProgress(0);

		const interval = setInterval(() => {
			setProgress((prev) => {
				if (prev >= 100) {
					clearInterval(interval);
					onDuplicate(
						selectedProducts.map((p) => p.id),
						{ prefix, suffix, include: enabledOptions }
					);
					setIsDuplicating(false);
					setOpen(false);
					return 100;
				}
				return prev + 20;
			});
		}, 400);
	};

	return (
		<Dialog open={open} onOpenChange={setOpen}>
			<DialogTrigger asChild>{trigger}</DialogTrigger>
			<DialogContent className="max-w-xl">
				<DialogHeader>
					<DialogTitle className="flex items-center gap-2">
						<Copy className="size-5" />
						Duplicate Products
					</DialogTitle>
					<DialogDescription>
						Create copies of selected products with customizable options
					</DialogDescription>
				</DialogHeader>

				<div className="space-y-4">
					<div>
						<Label className="mb-2 block">Naming Options</Label>
						<NamingOptions
							prefix={prefix}
							suffix={suffix}
							onPrefixChange={setPrefix}
							onSuffixChange={setSuffix}
						/>
					</div>

					<Separator />

					<div>
						<Label className="mb-2 block">Duplicate Options</Label>
						<DuplicateOptions
							options={duplicateOptions}
							onToggle={toggleOption}
						/>
					</div>

					<Separator />

					<div>
						<div className="mb-2 flex items-center justify-between">
							<Label>Products to Duplicate</Label>
							<span className="text-sm text-muted-foreground">
								{selectedProducts.length} selected
							</span>
						</div>
						<div className="max-h-40 space-y-2 overflow-y-auto">
							{productList.map((product) => (
								<ProductDuplicateRow
									key={product.id}
									product={product}
									prefix={prefix}
									suffix={suffix}
									onToggle={() => toggleProduct(product.id)}
								/>
							))}
						</div>
					</div>

					{isDuplicating && (
						<div className="space-y-2">
							<Progress value={progress} className="h-2" />
							<p className="text-center text-sm text-muted-foreground">
								Duplicating products...
							</p>
						</div>
					)}
				</div>

				<DialogFooter>
					<Button variant="outline" onClick={() => setOpen(false)}>
						Cancel
					</Button>
					<Button
						onClick={handleDuplicate}
						disabled={isDuplicating || selectedProducts.length === 0}
						className="gap-2"
					>
						{isDuplicating ? (
							<RefreshCw className="size-4 animate-spin" />
						) : (
							<Copy className="size-4" />
						)}
						Duplicate {selectedProducts.length} Products
					</Button>
				</DialogFooter>
			</DialogContent>
		</Dialog>
	);
};

export default function Main() {
	const products: Product[] = [
		{ id: '1', name: 'Wireless Mouse', sku: 'WM-001', price: 29.99, variants: 3, selected: true },
		{ id: '2', name: 'USB Keyboard', sku: 'KB-001', price: 49.99, variants: 2, selected: true },
		{ id: '3', name: 'Monitor Stand', sku: 'MS-001', price: 39.99, variants: 1, selected: false },
		{ id: '4', name: 'Webcam HD', sku: 'WC-001', price: 59.99, variants: 0, selected: false },
	];

	return (
		<section className="@container" data-theme="dashboard">
			<div className="mx-auto max-w-2xl space-y-6 px-4 py-8 @sm:px-6">
				<div className="flex items-center gap-3">
					<Copy className="size-5" />
					<h2 className="text-xl font-semibold">Bulk Duplicate Operations</h2>
				</div>

				<BulkDuplicateModal
					trigger={
						<Button className="w-full gap-2">
							<Copy className="size-4" />
							Duplicate Products
						</Button>
					}
					products={products}
					onDuplicate={(ids, options) =>
						console.log('Duplicating', ids, 'with', options)
					}
				/>

				<div className="rounded-lg border bg-muted/30 p-4">
					<h3 className="mb-3 font-medium">Products</h3>
					<div className="space-y-2">
						{products.map((product) => (
							<div
								key={product.id}
								className="flex items-center justify-between rounded-md p-2"
							>
								<div className="flex items-center gap-2">
									<Package className="size-4 text-muted-foreground" />
									<span>{product.name}</span>
								</div>
								<div className="flex items-center gap-2">
									<Badge variant="outline">{product.variants} variants</Badge>
									<span className="font-medium">${product.price}</span>
								</div>
							</div>
						))}
					</div>
				</div>
			</div>
		</section>
	);
}
