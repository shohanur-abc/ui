'use client';

import * as React from 'react';
import {
	Package,
	Image as ImageIcon,
	Plus,
	X,
	Upload,
	Save,
	Trash2,
	ArrowLeft,
	ArrowRight,
	GripVertical,
	Star,
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
import { Switch } from '@/components/ui/switch';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Separator } from '@/components/ui/separator';

interface ProductImage {
	id: string;
	url: string;
	alt: string;
	isPrimary: boolean;
}

interface ImageUploaderProps {
	images: ProductImage[];
	onUpload: () => void;
	onRemove: (id: string) => void;
	onSetPrimary: (id: string) => void;
	labels: { upload: string; primary: string; setPrimary: string };
}

const ImageUploader = ({
	images,
	onUpload,
	onRemove,
	onSetPrimary,
	labels,
}: ImageUploaderProps) => (
	<div className="space-y-4">
		<div className="grid gap-4 @sm:grid-cols-2 @md:grid-cols-4">
			{images.map((image) => (
				<div
					key={image.id}
					className={`group relative aspect-square overflow-hidden rounded-lg border ${image.isPrimary ? 'ring-2 ring-primary' : ''}`}
				>
					<img
						src={image.url}
						alt={image.alt}
						className="size-full object-cover"
					/>
					<div className="absolute inset-0 flex items-center justify-center gap-2 bg-black/50 opacity-0 transition-opacity group-hover:opacity-100">
						<Button
							variant="secondary"
							size="icon-sm"
							onClick={() => onSetPrimary(image.id)}
							title={labels.setPrimary}
						>
							<Star
								className={`size-4 ${image.isPrimary ? 'fill-amber-400 text-amber-400' : ''}`}
							/>
						</Button>
						<Button
							variant="destructive"
							size="icon-sm"
							onClick={() => onRemove(image.id)}
						>
							<Trash2 className="size-4" />
						</Button>
					</div>
					{image.isPrimary && (
						<Badge className="absolute left-2 top-2 gap-1">
							<Star className="size-3 fill-current" />
							{labels.primary}
						</Badge>
					)}
				</div>
			))}
			<button
				onClick={onUpload}
				className="flex aspect-square flex-col items-center justify-center gap-2 rounded-lg border-2 border-dashed text-muted-foreground transition-colors hover:border-primary hover:text-primary"
			>
				<Upload className="size-8" />
				<span className="text-sm">{labels.upload}</span>
			</button>
		</div>
	</div>
);

interface BasicInfoFormProps {
	labels: {
		name: string;
		sku: string;
		description: string;
		category: string;
		status: string;
	};
}

const BasicInfoForm = ({ labels }: BasicInfoFormProps) => (
	<div className="grid gap-6 @lg:grid-cols-2">
		<div className="space-y-2">
			<Label htmlFor="name">{labels.name}</Label>
			<Input id="name" defaultValue="Premium Wireless Headphones" />
		</div>
		<div className="space-y-2">
			<Label htmlFor="sku">{labels.sku}</Label>
			<Input id="sku" defaultValue="WHP-PRO-001" />
		</div>
		<div className="space-y-2 @lg:col-span-2">
			<Label htmlFor="description">{labels.description}</Label>
			<Textarea
				id="description"
				rows={4}
				defaultValue="High-quality wireless headphones with active noise cancellation..."
			/>
		</div>
		<div className="space-y-2">
			<Label htmlFor="category">{labels.category}</Label>
			<Select defaultValue="electronics">
				<SelectTrigger>
					<SelectValue />
				</SelectTrigger>
				<SelectContent>
					<SelectItem value="electronics">Electronics</SelectItem>
					<SelectItem value="audio">Audio</SelectItem>
					<SelectItem value="accessories">Accessories</SelectItem>
				</SelectContent>
			</Select>
		</div>
		<div className="space-y-2">
			<Label htmlFor="status">{labels.status}</Label>
			<Select defaultValue="active">
				<SelectTrigger>
					<SelectValue />
				</SelectTrigger>
				<SelectContent>
					<SelectItem value="active">Active</SelectItem>
					<SelectItem value="draft">Draft</SelectItem>
					<SelectItem value="archived">Archived</SelectItem>
				</SelectContent>
			</Select>
		</div>
	</div>
);

interface PricingFormProps {
	labels: {
		price: string;
		comparePrice: string;
		cost: string;
		taxable: string;
	};
}

const PricingForm = ({ labels }: PricingFormProps) => (
	<div className="grid gap-6 @lg:grid-cols-3">
		<div className="space-y-2">
			<Label htmlFor="price">{labels.price}</Label>
			<div className="relative">
				<span className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground">
					$
				</span>
				<Input
					id="price"
					type="number"
					defaultValue="199.99"
					className="pl-7"
				/>
			</div>
		</div>
		<div className="space-y-2">
			<Label htmlFor="compare-price">{labels.comparePrice}</Label>
			<div className="relative">
				<span className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground">
					$
				</span>
				<Input
					id="compare-price"
					type="number"
					defaultValue="249.99"
					className="pl-7"
				/>
			</div>
		</div>
		<div className="space-y-2">
			<Label htmlFor="cost">{labels.cost}</Label>
			<div className="relative">
				<span className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground">
					$
				</span>
				<Input id="cost" type="number" defaultValue="89.00" className="pl-7" />
			</div>
		</div>
		<div className="flex items-center gap-3 @lg:col-span-3">
			<Switch id="taxable" defaultChecked />
			<Label htmlFor="taxable">{labels.taxable}</Label>
		</div>
	</div>
);

interface InventoryFormProps {
	labels: {
		stock: string;
		lowStock: string;
		trackInventory: string;
		allowBackorder: string;
	};
}

const InventoryForm = ({ labels }: InventoryFormProps) => (
	<div className="grid gap-6 @lg:grid-cols-2">
		<div className="space-y-2">
			<Label htmlFor="stock">{labels.stock}</Label>
			<Input id="stock" type="number" defaultValue="150" />
		</div>
		<div className="space-y-2">
			<Label htmlFor="low-stock">{labels.lowStock}</Label>
			<Input id="low-stock" type="number" defaultValue="20" />
		</div>
		<div className="flex items-center gap-3">
			<Switch id="track-inventory" defaultChecked />
			<Label htmlFor="track-inventory">{labels.trackInventory}</Label>
		</div>
		<div className="flex items-center gap-3">
			<Switch id="allow-backorder" />
			<Label htmlFor="allow-backorder">{labels.allowBackorder}</Label>
		</div>
	</div>
);

export default function Main() {
	const [activeTab, setActiveTab] = React.useState('basic');
	const [images, setImages] = React.useState<ProductImage[]>([
		{
			id: '1',
			url: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=300&h=300&fit=crop',
			alt: 'Product 1',
			isPrimary: true,
		},
		{
			id: '2',
			url: 'https://images.unsplash.com/photo-1583394838336-acd977736f90?w=300&h=300&fit=crop',
			alt: 'Product 2',
			isPrimary: false,
		},
		{
			id: '3',
			url: 'https://images.unsplash.com/photo-1484704849700-f032a568e944?w=300&h=300&fit=crop',
			alt: 'Product 3',
			isPrimary: false,
		},
	]);

	const handleUpload = () => {
		console.log('Upload image');
	};

	const handleRemoveImage = (id: string) => {
		setImages((prev) => prev.filter((img) => img.id !== id));
	};

	const handleSetPrimary = (id: string) => {
		setImages((prev) =>
			prev.map((img) => ({ ...img, isPrimary: img.id === id })),
		);
	};

	return (
		<section className="@container" data-theme="dashboard">
			<div className="mx-auto max-w-4xl px-4 py-8 @sm:px-6 @2xl:px-8">
				<div className="mb-6 flex items-center justify-between">
					<div>
						<h1 className="text-2xl font-bold">Edit Product</h1>
						<p className="text-sm text-muted-foreground">
							Update product information
						</p>
					</div>
					<div className="flex items-center gap-2">
						<Button variant="outline" className="gap-2">
							<Trash2 className="size-4" />
							Delete
						</Button>
						<Button className="gap-2">
							<Save className="size-4" />
							Save Changes
						</Button>
					</div>
				</div>

				<div className="grid gap-6 @lg:grid-cols-3">
					<div className="space-y-6 @lg:col-span-2">
						<div className="rounded-lg border bg-card p-6">
							<Tabs value={activeTab} onValueChange={setActiveTab}>
								<TabsList>
									<TabsTrigger value="basic">Basic Info</TabsTrigger>
									<TabsTrigger value="pricing">Pricing</TabsTrigger>
									<TabsTrigger value="inventory">Inventory</TabsTrigger>
								</TabsList>
								<TabsContent value="basic" className="mt-6">
									<BasicInfoForm
										labels={{
											name: 'Product Name',
											sku: 'SKU',
											description: 'Description',
											category: 'Category',
											status: 'Status',
										}}
									/>
								</TabsContent>
								<TabsContent value="pricing" className="mt-6">
									<PricingForm
										labels={{
											price: 'Selling Price',
											comparePrice: 'Compare at Price',
											cost: 'Cost per Item',
											taxable: 'Product is taxable',
										}}
									/>
								</TabsContent>
								<TabsContent value="inventory" className="mt-6">
									<InventoryForm
										labels={{
											stock: 'Stock Quantity',
											lowStock: 'Low Stock Alert',
											trackInventory: 'Track inventory',
											allowBackorder: 'Allow backorders',
										}}
									/>
								</TabsContent>
							</Tabs>
						</div>
					</div>

					<div className="space-y-6">
						<div className="rounded-lg border bg-card p-6">
							<h3 className="mb-4 font-semibold">Product Images</h3>
							<ImageUploader
								images={images}
								onUpload={handleUpload}
								onRemove={handleRemoveImage}
								onSetPrimary={handleSetPrimary}
								labels={{
									upload: 'Add Image',
									primary: 'Primary',
									setPrimary: 'Set as primary',
								}}
							/>
						</div>
					</div>
				</div>
			</div>
		</section>
	);
}
