'use client';

import * as React from 'react';
import {
	Printer,
	FileText,
	Tag,
	Barcode,
	QrCode,
	Download,
	Settings,
	Check,
	Loader2,
} from 'lucide-react';

import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Checkbox } from '@/components/ui/checkbox';
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
import { Separator } from '@/components/ui/separator';

interface PrintProduct {
	id: string;
	name: string;
	sku: string;
	price: number;
	selected: boolean;
}

interface LabelPreviewProps {
	product: PrintProduct;
	showPrice: boolean;
	showBarcode: boolean;
	showQr: boolean;
	size: string;
}

const LabelPreview = ({
	product,
	showPrice,
	showBarcode,
	showQr,
	size,
}: LabelPreviewProps) => {
	const sizeClasses = {
		small: 'w-32 p-2',
		medium: 'w-48 p-3',
		large: 'w-64 p-4',
	};

	return (
		<div
			className={`rounded-lg border bg-white text-black ${sizeClasses[size as keyof typeof sizeClasses]}`}
		>
			<p className="font-bold">{product.name}</p>
			<p className="text-sm text-gray-600">{product.sku}</p>
			{showPrice && (
				<p className="mt-1 text-lg font-bold">${product.price.toFixed(2)}</p>
			)}
			<div className="mt-2 flex gap-2">
				{showBarcode && (
					<div className="flex h-8 flex-1 items-center justify-center rounded bg-gray-100">
						<Barcode className="size-6 text-gray-400" />
					</div>
				)}
				{showQr && (
					<div className="flex size-8 items-center justify-center rounded bg-gray-100">
						<QrCode className="size-5 text-gray-400" />
					</div>
				)}
			</div>
		</div>
	);
};

interface PrintSettingsProps {
	settings: {
		showPrice: boolean;
		showBarcode: boolean;
		showQr: boolean;
		copies: number;
		size: string;
	};
	onChange: (key: string, value: boolean | number | string) => void;
}

const PrintSettings = ({ settings, onChange }: PrintSettingsProps) => (
	<div className="space-y-4">
		<div className="space-y-2">
			<Label>Label Size</Label>
			<Select value={settings.size} onValueChange={(v) => onChange('size', v)}>
				<SelectTrigger>
					<SelectValue />
				</SelectTrigger>
				<SelectContent>
					<SelectItem value="small">Small (2" x 1")</SelectItem>
					<SelectItem value="medium">Medium (3" x 2")</SelectItem>
					<SelectItem value="large">Large (4" x 3")</SelectItem>
				</SelectContent>
			</Select>
		</div>

		<div className="space-y-2">
			<Label>Copies per Product</Label>
			<Input
				type="number"
				value={settings.copies}
				onChange={(e) => onChange('copies', parseInt(e.target.value) || 1)}
				min={1}
				max={100}
			/>
		</div>

		<Separator />

		<div className="space-y-3">
			<div className="flex items-center justify-between">
				<Label>Show Price</Label>
				<Switch
					checked={settings.showPrice}
					onCheckedChange={(v) => onChange('showPrice', v)}
				/>
			</div>
			<div className="flex items-center justify-between">
				<Label>Show Barcode</Label>
				<Switch
					checked={settings.showBarcode}
					onCheckedChange={(v) => onChange('showBarcode', v)}
				/>
			</div>
			<div className="flex items-center justify-between">
				<Label>Show QR Code</Label>
				<Switch
					checked={settings.showQr}
					onCheckedChange={(v) => onChange('showQr', v)}
				/>
			</div>
		</div>
	</div>
);

interface ProductSelectorProps {
	products: PrintProduct[];
	onToggle: (id: string) => void;
	onToggleAll: () => void;
}

const ProductSelector = ({
	products,
	onToggle,
	onToggleAll,
}: ProductSelectorProps) => {
	const selectedCount = products.filter((p) => p.selected).length;

	return (
		<div className="space-y-3">
			<div className="flex items-center justify-between">
				<Label>Select Products</Label>
				<Button variant="ghost" size="sm" onClick={onToggleAll}>
					{selectedCount === products.length ? 'Deselect All' : 'Select All'}
				</Button>
			</div>
			<div className="max-h-48 space-y-2 overflow-y-auto rounded-lg border p-2">
				{products.map((product) => (
					<label
						key={product.id}
						className="flex cursor-pointer items-center gap-3 rounded-md p-2 hover:bg-accent"
					>
						<Checkbox
							checked={product.selected}
							onCheckedChange={() => onToggle(product.id)}
						/>
						<div className="flex-1">
							<p className="font-medium">{product.name}</p>
							<p className="text-sm text-muted-foreground">{product.sku}</p>
						</div>
						<span className="font-medium">${product.price.toFixed(2)}</span>
					</label>
				))}
			</div>
			<p className="text-sm text-muted-foreground">
				{selectedCount} of {products.length} selected
			</p>
		</div>
	);
};

interface PrintModalProps {
	products: PrintProduct[];
	trigger: React.ReactNode;
}

const PrintModal = ({ products, trigger }: PrintModalProps) => {
	const [open, setOpen] = React.useState(false);
	const [printProducts, setPrintProducts] = React.useState(products);
	const [isPrinting, setIsPrinting] = React.useState(false);
	const [settings, setSettings] = React.useState({
		showPrice: true,
		showBarcode: true,
		showQr: false,
		copies: 1,
		size: 'medium',
	});

	const selectedProducts = printProducts.filter((p) => p.selected);

	const toggleProduct = (id: string) => {
		setPrintProducts((prev) =>
			prev.map((p) => (p.id === id ? { ...p, selected: !p.selected } : p)),
		);
	};

	const toggleAll = () => {
		const allSelected = printProducts.every((p) => p.selected);
		setPrintProducts((prev) =>
			prev.map((p) => ({ ...p, selected: !allSelected })),
		);
	};

	const handlePrint = () => {
		setIsPrinting(true);
		setTimeout(() => {
			setIsPrinting(false);
			setOpen(false);
		}, 2000);
	};

	return (
		<Dialog open={open} onOpenChange={setOpen}>
			<DialogTrigger asChild>{trigger}</DialogTrigger>
			<DialogContent className="max-w-2xl">
				<DialogHeader>
					<DialogTitle className="flex items-center gap-2">
						<Printer className="size-5" />
						Print Labels
					</DialogTitle>
				</DialogHeader>

				<div className="grid gap-6 @sm:grid-cols-2">
					<div className="space-y-4">
						<ProductSelector
							products={printProducts}
							onToggle={toggleProduct}
							onToggleAll={toggleAll}
						/>
						<PrintSettings
							settings={settings}
							onChange={(key, value) =>
								setSettings((prev) => ({ ...prev, [key]: value }))
							}
						/>
					</div>

					<div className="space-y-4">
						<Label>Preview</Label>
						<div className="flex flex-wrap gap-3 rounded-lg border bg-muted/30 p-4">
							{selectedProducts.slice(0, 3).map((product) => (
								<LabelPreview
									key={product.id}
									product={product}
									showPrice={settings.showPrice}
									showBarcode={settings.showBarcode}
									showQr={settings.showQr}
									size={settings.size}
								/>
							))}
							{selectedProducts.length > 3 && (
								<div className="flex items-center justify-center text-sm text-muted-foreground">
									+{selectedProducts.length - 3} more
								</div>
							)}
							{selectedProducts.length === 0 && (
								<p className="text-center text-sm text-muted-foreground">
									Select products to preview labels
								</p>
							)}
						</div>

						<div className="rounded-lg border bg-muted/30 p-3">
							<p className="text-sm">
								<span className="font-medium">Total labels:</span>{' '}
								{selectedProducts.length * settings.copies}
							</p>
						</div>
					</div>
				</div>

				<DialogFooter>
					<Button variant="outline" onClick={() => setOpen(false)}>
						Cancel
					</Button>
					<Button variant="outline" className="gap-2">
						<Download className="size-4" />
						Download PDF
					</Button>
					<Button
						onClick={handlePrint}
						disabled={isPrinting || selectedProducts.length === 0}
						className="gap-2"
					>
						{isPrinting ? (
							<Loader2 className="size-4 animate-spin" />
						) : (
							<Printer className="size-4" />
						)}
						{isPrinting ? 'Printing...' : 'Print Labels'}
					</Button>
				</DialogFooter>
			</DialogContent>
		</Dialog>
	);
};

export default function Main() {
	const products: PrintProduct[] = [
		{
			id: '1',
			name: 'Wireless Mouse',
			sku: 'WM-001',
			price: 29.99,
			selected: true,
		},
		{
			id: '2',
			name: 'USB Keyboard',
			sku: 'KB-001',
			price: 49.99,
			selected: true,
		},
		{
			id: '3',
			name: 'Monitor Stand',
			sku: 'MS-001',
			price: 39.99,
			selected: false,
		},
		{
			id: '4',
			name: 'Webcam HD',
			sku: 'WC-001',
			price: 59.99,
			selected: false,
		},
		{
			id: '5',
			name: 'Desk Lamp',
			sku: 'DL-001',
			price: 24.99,
			selected: false,
		},
	];

	return (
		<section className="@container" data-theme="dashboard">
			<div className="mx-auto max-w-2xl space-y-6 px-4 py-8 @sm:px-6">
				<div className="flex items-center gap-3">
					<Printer className="size-5" />
					<h2 className="text-xl font-semibold">Print Labels</h2>
				</div>

				<div className="rounded-lg border bg-card p-6">
					<div className="mb-4 flex items-center gap-3">
						<Tag className="size-8 text-primary" />
						<div>
							<h3 className="font-semibold">Product Labels</h3>
							<p className="text-sm text-muted-foreground">
								Print price tags, barcodes, and QR codes
							</p>
						</div>
					</div>
					<PrintModal
						products={products}
						trigger={
							<Button className="w-full gap-2">
								<Printer className="size-4" />
								Print Product Labels
							</Button>
						}
					/>
				</div>

				<div className="grid gap-4 @sm:grid-cols-2">
					<div className="rounded-lg border bg-card p-4">
						<div className="mb-3 flex items-center gap-2">
							<Barcode className="size-5 text-muted-foreground" />
							<span className="font-medium">Barcode Labels</span>
						</div>
						<p className="mb-3 text-sm text-muted-foreground">
							Print SKU barcodes for inventory
						</p>
						<Button variant="outline" className="w-full gap-2">
							<Printer className="size-4" />
							Print Barcodes
						</Button>
					</div>

					<div className="rounded-lg border bg-card p-4">
						<div className="mb-3 flex items-center gap-2">
							<FileText className="size-5 text-muted-foreground" />
							<span className="font-medium">Shelf Labels</span>
						</div>
						<p className="mb-3 text-sm text-muted-foreground">
							Print shelf edge labels for retail
						</p>
						<Button variant="outline" className="w-full gap-2">
							<Printer className="size-4" />
							Print Shelf Labels
						</Button>
					</div>
				</div>
			</div>
		</section>
	);
}
