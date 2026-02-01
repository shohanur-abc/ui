'use client';

import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from '@/components/ui/select';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Checkbox } from '@/components/ui/checkbox';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import {
	Package,
	Shirt,
	Laptop,
	ArrowRight,
	Truck,
	AlertCircle,
} from 'lucide-react';

interface FieldProps {
	label: string;
	placeholder: string;
	type?: string;
}

interface SelectFieldProps {
	label: string;
	placeholder: string;
	options: { value: string; label: string }[];
}

interface ProductCategoryProps {
	icon: React.ElementType;
	label: string;
	items: string[];
	restrictions?: string;
}

const Field = ({ label, placeholder, type = 'text' }: FieldProps) => (
	<div className="space-y-2">
		<Label className="text-sm">{label}</Label>
		<Input type={type} placeholder={placeholder} />
	</div>
);

const SelectField = ({ label, placeholder, options }: SelectFieldProps) => (
	<div className="space-y-2">
		<Label className="text-sm">{label}</Label>
		<Select>
			<SelectTrigger className="w-full">
				<SelectValue placeholder={placeholder} />
			</SelectTrigger>
			<SelectContent>
				{options.map((option) => (
					<SelectItem key={option.value} value={option.value}>
						{option.label}
					</SelectItem>
				))}
			</SelectContent>
		</Select>
	</div>
);

const ProductCategory = ({
	icon: Icon,
	label,
	items,
	restrictions,
}: ProductCategoryProps) => (
	<div className="p-4 rounded-xl border border-border bg-muted/30">
		<div className="flex items-center gap-3 mb-3">
			<div className="size-10 rounded-lg bg-primary/10 flex items-center justify-center">
				<Icon className="size-5 text-primary" />
			</div>
			<div>
				<span className="font-medium">{label}</span>
				<Badge variant="secondary" className="ml-2 text-xs">
					{items.length} items
				</Badge>
			</div>
		</div>
		<ul className="text-sm text-muted-foreground space-y-1 mb-3">
			{items.map((item) => (
				<li key={item}>• {item}</li>
			))}
		</ul>
		{restrictions && (
			<div className="flex items-start gap-2 text-xs text-yellow-600 dark:text-yellow-400">
				<AlertCircle className="size-4 shrink-0 mt-0.5" />
				<span>{restrictions}</span>
			</div>
		)}
	</div>
);

const ClothingShipmentTab = ({
	countries,
	states,
}: {
	countries: { value: string; label: string }[];
	states: { value: string; label: string }[];
}) => (
	<div className="space-y-4">
		<ProductCategory
			icon={Shirt}
			label="Clothing Items"
			items={['Jacket - Size L', 'T-Shirt - Size M']}
		/>
		<Separator />
		<div className="grid @sm:grid-cols-2 gap-4">
			<Field label="First Name" placeholder="John" />
			<Field label="Last Name" placeholder="Doe" />
		</div>
		<SelectField
			label="Country"
			placeholder="Select country"
			options={countries}
		/>
		<Field label="Street Address" placeholder="123 Main Street" />
		<div className="grid @sm:grid-cols-3 gap-4">
			<Field label="City" placeholder="City" />
			<SelectField label="State" placeholder="State" options={states} />
			<Field label="ZIP" placeholder="12345" />
		</div>
	</div>
);

const ElectronicsShipmentTab = ({
	countries,
	states,
}: {
	countries: { value: string; label: string }[];
	states: { value: string; label: string }[];
}) => (
	<div className="space-y-4">
		<ProductCategory
			icon={Laptop}
			label="Electronics"
			items={['MacBook Pro 14"', 'USB-C Hub']}
			restrictions="Signature required for delivery. Items over $1000 require adult signature."
		/>
		<Separator />
		<div className="grid @sm:grid-cols-2 gap-4">
			<Field label="First Name" placeholder="John" />
			<Field label="Last Name" placeholder="Doe" />
		</div>
		<SelectField
			label="Country"
			placeholder="Select country"
			options={countries}
		/>
		<Field label="Street Address" placeholder="123 Main Street" />
		<div className="grid @sm:grid-cols-3 gap-4">
			<Field label="City" placeholder="City" />
			<SelectField label="State" placeholder="State" options={states} />
			<Field label="ZIP" placeholder="12345" />
		</div>
		<div className="flex items-center gap-2 pt-2">
			<Checkbox id="signature-required" defaultChecked disabled />
			<Label htmlFor="signature-required" className="text-sm font-normal">
				Signature required (mandatory for electronics)
			</Label>
		</div>
	</div>
);

const CombinedShipmentTab = ({
	countries,
	states,
}: {
	countries: { value: string; label: string }[];
	states: { value: string; label: string }[];
}) => (
	<div className="space-y-4">
		<div className="p-4 rounded-xl bg-green-500/10 border border-green-500/20">
			<div className="flex items-center gap-2 mb-2">
				<Truck className="size-5 text-green-500" />
				<span className="font-medium text-green-600 dark:text-green-400">
					Ship all items together
				</span>
			</div>
			<p className="text-sm text-muted-foreground">
				All items will be consolidated and shipped in one package
			</p>
		</div>
		<Separator />
		<div className="grid @sm:grid-cols-2 gap-4">
			<Field label="First Name" placeholder="John" />
			<Field label="Last Name" placeholder="Doe" />
		</div>
		<SelectField
			label="Country"
			placeholder="Select country"
			options={countries}
		/>
		<Field label="Street Address" placeholder="123 Main Street" />
		<div className="grid @sm:grid-cols-3 gap-4">
			<Field label="City" placeholder="City" />
			<SelectField label="State" placeholder="State" options={states} />
			<Field label="ZIP" placeholder="12345" />
		</div>
		<div className="flex items-center gap-2 pt-2">
			<Checkbox id="eco-packaging" />
			<Label
				htmlFor="eco-packaging"
				className="text-sm font-normal cursor-pointer"
			>
				Use eco-friendly packaging
			</Label>
		</div>
	</div>
);

export default function Main() {
	const countries = [
		{ value: 'us', label: 'United States' },
		{ value: 'ca', label: 'Canada' },
	];

	const states = [
		{ value: 'ca', label: 'California' },
		{ value: 'ny', label: 'New York' },
	];

	return (
		<section className="@container" data-theme="neon">
			<div className="mx-auto max-w-2xl px-4 @sm:px-6 @2xl:px-8 py-12 @md:py-16 @xl:py-20">
				<Card>
					<CardHeader>
						<div className="flex items-center gap-3">
							<div className="size-12 rounded-xl bg-primary/10 flex items-center justify-center">
								<Package className="size-6 text-primary" />
							</div>
							<div>
								<CardTitle>Shipment Address</CardTitle>
								<p className="text-sm text-muted-foreground">
									Ship by product category or combine
								</p>
							</div>
						</div>
					</CardHeader>
					<CardContent>
						<Tabs defaultValue="combined">
							<TabsList className="w-full grid grid-cols-3 mb-6">
								<TabsTrigger value="clothing" className="gap-2">
									<Shirt className="size-4" />
									<span className="hidden @sm:inline">Clothing</span>
								</TabsTrigger>
								<TabsTrigger value="electronics" className="gap-2">
									<Laptop className="size-4" />
									<span className="hidden @sm:inline">Electronics</span>
								</TabsTrigger>
								<TabsTrigger value="combined" className="gap-2">
									<Package className="size-4" />
									<span className="hidden @sm:inline">Combined</span>
								</TabsTrigger>
							</TabsList>

							<TabsContent value="clothing">
								<ClothingShipmentTab countries={countries} states={states} />
							</TabsContent>

							<TabsContent value="electronics">
								<ElectronicsShipmentTab countries={countries} states={states} />
							</TabsContent>

							<TabsContent value="combined">
								<CombinedShipmentTab countries={countries} states={states} />
							</TabsContent>
						</Tabs>
					</CardContent>
				</Card>

				<Button size="lg" className="w-full mt-8 gap-2">
					Continue to Payment
					<ArrowRight className="size-4" />
				</Button>
			</div>
		</section>
	);
}
