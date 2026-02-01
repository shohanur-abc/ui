'use client';

import * as React from 'react';
import {
	Package,
	Save,
	Trash2,
	History,
	Image as ImageIcon,
} from 'lucide-react';

import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
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
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Switch } from '@/components/ui/switch';

type Product = {
	id: string;
	name: string;
	sku: string;
	category: string;
	description: string;
	costPrice: number;
	salePrice: number;
	stock: number;
	minStock: number;
	maxStock: number;
	status: string;
	trackInventory: boolean;
	weight: number;
	dimensions: { length: number; width: number; height: number };
};

type FormFieldProps = {
	label: string;
	children: React.ReactNode;
};

const FormField = ({ label, children }: FormFieldProps) => (
	<div className="space-y-2">
		<Label>{label}</Label>
		{children}
	</div>
);

type SwitchFieldProps = {
	label: string;
	description: string;
	checked: boolean;
	onChange: (checked: boolean) => void;
};

const SwitchField = ({
	label,
	description,
	checked,
	onChange,
}: SwitchFieldProps) => (
	<div className="flex items-center justify-between rounded-lg border p-4">
		<div>
			<p className="font-medium">{label}</p>
			<p className="text-sm text-muted-foreground">{description}</p>
		</div>
		<Switch checked={checked} onCheckedChange={onChange} />
	</div>
);

type TabContentProps = {
	children: React.ReactNode;
};

const TabContent = ({ children }: TabContentProps) => (
	<div className="space-y-6 p-1">{children}</div>
);

export default function Main() {
	const [product, setProduct] = React.useState<Product>({
		id: 'PRD-001',
		name: 'Wireless Bluetooth Headphones',
		sku: 'WBH-001',
		category: 'electronics',
		description:
			'High-quality wireless headphones with noise cancellation and 30-hour battery life.',
		costPrice: 45.0,
		salePrice: 79.99,
		stock: 245,
		minStock: 50,
		maxStock: 500,
		status: 'active',
		trackInventory: true,
		weight: 0.35,
		dimensions: { length: 20, width: 18, height: 8 },
	});

	const categories = [
		{ value: 'electronics', label: 'Electronics' },
		{ value: 'accessories', label: 'Accessories' },
		{ value: 'audio', label: 'Audio' },
	];

	return (
		<section className="@container" data-theme="dashboard">
			<div className="mx-auto max-w-7xl px-4 py-8 @sm:px-6 @md:py-10 @2xl:px-8">
				<Card>
					<CardHeader>
						<div className="flex items-start justify-between">
							<div>
								<CardTitle className="text-xl @lg:text-2xl">
									Edit Product
								</CardTitle>
								<CardDescription className="flex items-center gap-2">
									<span>{product.sku}</span>
									<Badge variant="secondary">{product.status}</Badge>
								</CardDescription>
							</div>
							<div className="flex gap-2">
								<Button variant="outline" size="sm">
									<History className="mr-2 size-4" />
									History
								</Button>
								<Button variant="destructive" size="sm">
									<Trash2 className="mr-2 size-4" />
									Delete
								</Button>
							</div>
						</div>
					</CardHeader>
					<CardContent>
						<Tabs defaultValue="general" className="w-full">
							<TabsList className="w-full justify-start">
								<TabsTrigger value="general">General</TabsTrigger>
								<TabsTrigger value="pricing">Pricing</TabsTrigger>
								<TabsTrigger value="inventory">Inventory</TabsTrigger>
								<TabsTrigger value="shipping">Shipping</TabsTrigger>
							</TabsList>
							<TabsContent value="general" className="mt-6">
								<TabContent>
									<div className="grid gap-6 @lg:grid-cols-2">
										<FormField label="Product Name">
											<Input
												value={product.name}
												onChange={(e) =>
													setProduct({ ...product, name: e.target.value })
												}
											/>
										</FormField>
										<FormField label="SKU">
											<Input
												value={product.sku}
												onChange={(e) =>
													setProduct({ ...product, sku: e.target.value })
												}
											/>
										</FormField>
									</div>
									<FormField label="Category">
										<Select
											value={product.category}
											onValueChange={(value) =>
												setProduct({ ...product, category: value })
											}
										>
											<SelectTrigger>
												<SelectValue />
											</SelectTrigger>
											<SelectContent>
												{categories.map((cat) => (
													<SelectItem key={cat.value} value={cat.value}>
														{cat.label}
													</SelectItem>
												))}
											</SelectContent>
										</Select>
									</FormField>
									<FormField label="Description">
										<Textarea
											value={product.description}
											onChange={(e) =>
												setProduct({ ...product, description: e.target.value })
											}
											className="min-h-24"
										/>
									</FormField>
									<div className="rounded-lg border p-6">
										<div className="flex items-center gap-4">
											<div className="flex size-24 items-center justify-center rounded-lg border-2 border-dashed bg-muted">
												<ImageIcon className="size-8 text-muted-foreground" />
											</div>
											<Button variant="outline">Change Image</Button>
										</div>
									</div>
								</TabContent>
							</TabsContent>
							<TabsContent value="pricing" className="mt-6">
								<TabContent>
									<div className="grid gap-6 @sm:grid-cols-2">
										<FormField label="Cost Price">
											<div className="relative">
												<span className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground">
													$
												</span>
												<Input
													type="number"
													value={product.costPrice}
													onChange={(e) =>
														setProduct({
															...product,
															costPrice: parseFloat(e.target.value),
														})
													}
													className="pl-7"
												/>
											</div>
										</FormField>
										<FormField label="Sale Price">
											<div className="relative">
												<span className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground">
													$
												</span>
												<Input
													type="number"
													value={product.salePrice}
													onChange={(e) =>
														setProduct({
															...product,
															salePrice: parseFloat(e.target.value),
														})
													}
													className="pl-7"
												/>
											</div>
										</FormField>
									</div>
									<div className="rounded-lg border bg-muted/50 p-4">
										<div className="flex items-center justify-between">
											<span className="text-muted-foreground">
												Profit Margin
											</span>
											<span className="font-semibold text-emerald-500">
												{(
													((product.salePrice - product.costPrice) /
														product.salePrice) *
													100
												).toFixed(1)}
												%
											</span>
										</div>
									</div>
								</TabContent>
							</TabsContent>
							<TabsContent value="inventory" className="mt-6">
								<TabContent>
									<SwitchField
										label="Track Inventory"
										description="Enable inventory tracking for this product"
										checked={product.trackInventory}
										onChange={(checked) =>
											setProduct({ ...product, trackInventory: checked })
										}
									/>
									<div className="grid gap-6 @sm:grid-cols-3">
										<FormField label="Current Stock">
											<Input
												type="number"
												value={product.stock}
												onChange={(e) =>
													setProduct({
														...product,
														stock: parseInt(e.target.value),
													})
												}
											/>
										</FormField>
										<FormField label="Min Stock Level">
											<Input
												type="number"
												value={product.minStock}
												onChange={(e) =>
													setProduct({
														...product,
														minStock: parseInt(e.target.value),
													})
												}
											/>
										</FormField>
										<FormField label="Max Stock Level">
											<Input
												type="number"
												value={product.maxStock}
												onChange={(e) =>
													setProduct({
														...product,
														maxStock: parseInt(e.target.value),
													})
												}
											/>
										</FormField>
									</div>
								</TabContent>
							</TabsContent>
							<TabsContent value="shipping" className="mt-6">
								<TabContent>
									<FormField label="Weight (kg)">
										<Input
											type="number"
											value={product.weight}
											onChange={(e) =>
												setProduct({
													...product,
													weight: parseFloat(e.target.value),
												})
											}
										/>
									</FormField>
									<div className="grid gap-6 @sm:grid-cols-3">
										<FormField label="Length (cm)">
											<Input
												type="number"
												value={product.dimensions.length}
												onChange={(e) =>
													setProduct({
														...product,
														dimensions: {
															...product.dimensions,
															length: parseFloat(e.target.value),
														},
													})
												}
											/>
										</FormField>
										<FormField label="Width (cm)">
											<Input
												type="number"
												value={product.dimensions.width}
												onChange={(e) =>
													setProduct({
														...product,
														dimensions: {
															...product.dimensions,
															width: parseFloat(e.target.value),
														},
													})
												}
											/>
										</FormField>
										<FormField label="Height (cm)">
											<Input
												type="number"
												value={product.dimensions.height}
												onChange={(e) =>
													setProduct({
														...product,
														dimensions: {
															...product.dimensions,
															height: parseFloat(e.target.value),
														},
													})
												}
											/>
										</FormField>
									</div>
								</TabContent>
							</TabsContent>
						</Tabs>
					</CardContent>
					<CardFooter className="flex justify-end gap-3 border-t pt-6">
						<Button variant="outline">Discard Changes</Button>
						<Button>
							<Save className="mr-2 size-4" />
							Save Changes
						</Button>
					</CardFooter>
				</Card>
			</div>
		</section>
	);
}
