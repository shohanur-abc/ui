'use client';

import * as React from 'react';
import {
	Package,
	Barcode,
	Upload,
	Printer,
	Download,
	Settings,
	Check,
} from 'lucide-react';

import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Checkbox } from '@/components/ui/checkbox';
import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from '@/components/ui/select';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';

type LabelConfig = {
	format: 'sku' | 'barcode' | 'qr';
	size: 'small' | 'medium' | 'large';
	includePrice: boolean;
	includeName: boolean;
	includeLocation: boolean;
};

type PreviewProps = {
	config: LabelConfig;
};

const LabelPreview = ({ config }: PreviewProps) => {
	const sizeClasses = {
		small: 'w-32 h-20',
		medium: 'w-40 h-24',
		large: 'w-48 h-32',
	};

	return (
		<div className={`${sizeClasses[config.size]} rounded border bg-white p-2 text-black flex flex-col justify-between`}>
			<div className="flex items-center justify-between">
				{config.includeName && <span className="text-xs font-medium truncate">Product Name</span>}
				{config.includePrice && <span className="text-xs font-bold">$29.99</span>}
			</div>
			<div className="flex justify-center py-1">
				{config.format === 'barcode' && (
					<div className="flex gap-px">
						{[...Array(20)].map((_, i) => (
							<div key={i} className="w-0.5 h-6 bg-black" style={{ height: `${Math.random() * 8 + 16}px` }} />
						))}
					</div>
				)}
				{config.format === 'qr' && (
					<div className="size-12 bg-gray-800 rounded" />
				)}
				{config.format === 'sku' && (
					<span className="font-mono text-sm font-bold">SKU-001234</span>
				)}
			</div>
			{config.includeLocation && (
				<div className="text-center text-[10px] text-gray-600">WH-001 • A-01-01</div>
			)}
		</div>
	);
};

type ProductSelectProps = {
	selectedCount: number;
	onSelectAll: () => void;
};

const ProductSelect = ({ selectedCount, onSelectAll }: ProductSelectProps) => (
	<div className="rounded-lg border p-4">
		<div className="flex items-center justify-between">
			<div>
				<p className="font-medium">Selected Products</p>
				<p className="text-sm text-muted-foreground">{selectedCount} products selected for label printing</p>
			</div>
			<div className="flex gap-2">
				<Button variant="outline" size="sm" onClick={onSelectAll}>Select All</Button>
				<Button variant="outline" size="sm">
					<Upload className="mr-2 size-4" />
					Import List
				</Button>
			</div>
		</div>
	</div>
);

export default function Main() {
	const [config, setConfig] = React.useState<LabelConfig>({
		format: 'barcode',
		size: 'medium',
		includePrice: true,
		includeName: true,
		includeLocation: true,
	});
	const [copies, setCopies] = React.useState(1);

	return (
		<section className="@container" data-theme="dashboard">
			<div className="mx-auto max-w-7xl px-4 py-8 @sm:px-6 @md:py-10 @2xl:px-8">
				<Card>
					<CardHeader>
						<CardTitle className="text-xl @lg:text-2xl">Label Generator</CardTitle>
						<CardDescription>Configure and print product labels</CardDescription>
					</CardHeader>
					<CardContent className="space-y-6">
						<ProductSelect selectedCount={24} onSelectAll={() => {}} />

						<div className="grid gap-6 @lg:grid-cols-2">
							<div className="space-y-6">
								<div className="space-y-3">
									<Label className="text-base">Label Format</Label>
									<RadioGroup
										value={config.format}
										onValueChange={(v) => setConfig({ ...config, format: v as LabelConfig['format'] })}
										className="grid grid-cols-3 gap-4"
									>
										<div className="flex items-center space-x-2 rounded-lg border p-3 cursor-pointer">
											<RadioGroupItem value="barcode" id="barcode" />
											<Label htmlFor="barcode" className="cursor-pointer">Barcode</Label>
										</div>
										<div className="flex items-center space-x-2 rounded-lg border p-3 cursor-pointer">
											<RadioGroupItem value="qr" id="qr" />
											<Label htmlFor="qr" className="cursor-pointer">QR Code</Label>
										</div>
										<div className="flex items-center space-x-2 rounded-lg border p-3 cursor-pointer">
											<RadioGroupItem value="sku" id="sku" />
											<Label htmlFor="sku" className="cursor-pointer">SKU Only</Label>
										</div>
									</RadioGroup>
								</div>

								<div className="space-y-3">
									<Label className="text-base">Label Size</Label>
									<Select value={config.size} onValueChange={(v) => setConfig({ ...config, size: v as LabelConfig['size'] })}>
										<SelectTrigger>
											<SelectValue />
										</SelectTrigger>
										<SelectContent>
											<SelectItem value="small">Small (32mm x 20mm)</SelectItem>
											<SelectItem value="medium">Medium (40mm x 24mm)</SelectItem>
											<SelectItem value="large">Large (48mm x 32mm)</SelectItem>
										</SelectContent>
									</Select>
								</div>

								<div className="space-y-3">
									<Label className="text-base">Include on Label</Label>
									<div className="space-y-2">
										<div className="flex items-center space-x-2">
											<Checkbox
												id="name"
												checked={config.includeName}
												onCheckedChange={(v) => setConfig({ ...config, includeName: !!v })}
											/>
											<Label htmlFor="name" className="font-normal">Product Name</Label>
										</div>
										<div className="flex items-center space-x-2">
											<Checkbox
												id="price"
												checked={config.includePrice}
												onCheckedChange={(v) => setConfig({ ...config, includePrice: !!v })}
											/>
											<Label htmlFor="price" className="font-normal">Price</Label>
										</div>
										<div className="flex items-center space-x-2">
											<Checkbox
												id="location"
												checked={config.includeLocation}
												onCheckedChange={(v) => setConfig({ ...config, includeLocation: !!v })}
											/>
											<Label htmlFor="location" className="font-normal">Location Code</Label>
										</div>
									</div>
								</div>

								<div className="space-y-2">
									<Label>Copies per Product</Label>
									<Input
										type="number"
										value={copies}
										onChange={(e) => setCopies(parseInt(e.target.value) || 1)}
										min={1}
										max={100}
									/>
								</div>
							</div>

							<div className="flex flex-col items-center justify-center rounded-lg border bg-muted/30 p-8">
								<p className="mb-4 text-sm font-medium text-muted-foreground">Preview</p>
								<LabelPreview config={config} />
							</div>
						</div>
					</CardContent>
					<CardFooter className="flex justify-end gap-3 border-t pt-6">
						<Button variant="outline">
							<Download className="mr-2 size-4" />
							Download PDF
						</Button>
						<Button>
							<Printer className="mr-2 size-4" />
							Print Labels
						</Button>
					</CardFooter>
				</Card>
			</div>
		</section>
	);
}
