'use client';

import * as React from 'react';
import { Package, Plus, Upload, Barcode } from 'lucide-react';

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

type FormFieldProps = {
	label: string;
	required?: boolean;
	children: React.ReactNode;
	description?: string;
};

const FormField = ({
	label,
	required,
	children,
	description,
}: FormFieldProps) => (
	<div className="space-y-2">
		<Label>
			{label}
			{required && <span className="text-destructive"> *</span>}
		</Label>
		{children}
		{description && (
			<p className="text-xs text-muted-foreground">{description}</p>
		)}
	</div>
);

type ImageUploadProps = {
	label: string;
	description: string;
};

const ImageUpload = ({ label, description }: ImageUploadProps) => (
	<div className="space-y-2">
		<Label>{label}</Label>
		<div className="flex flex-col items-center justify-center rounded-lg border-2 border-dashed p-8 transition-colors hover:border-primary/50 hover:bg-muted/50">
			<div className="rounded-full bg-primary/10 p-3">
				<Upload className="size-6 text-primary" />
			</div>
			<p className="mt-2 font-medium">Click to upload</p>
			<p className="text-sm text-muted-foreground">{description}</p>
		</div>
	</div>
);

type Option = {
	value: string;
	label: string;
};

type SelectFieldProps = {
	label: string;
	placeholder: string;
	options: Option[];
	required?: boolean;
};

const SelectField = ({
	label,
	placeholder,
	options,
	required,
}: SelectFieldProps) => (
	<FormField label={label} required={required}>
		<Select>
			<SelectTrigger>
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
	</FormField>
);

export default function Main() {
	const categories: Option[] = [
		{ value: 'electronics', label: 'Electronics' },
		{ value: 'accessories', label: 'Accessories' },
		{ value: 'peripherals', label: 'Peripherals' },
		{ value: 'audio', label: 'Audio' },
	];

	const units: Option[] = [
		{ value: 'pieces', label: 'Pieces' },
		{ value: 'boxes', label: 'Boxes' },
		{ value: 'pallets', label: 'Pallets' },
		{ value: 'kg', label: 'Kilograms' },
	];

	const warehouses: Option[] = [
		{ value: 'wh-001', label: 'Main Warehouse' },
		{ value: 'wh-002', label: 'East Distribution' },
		{ value: 'wh-003', label: 'West Fulfillment' },
	];

	return (
		<section className="@container" data-theme="dashboard">
			<div className="mx-auto max-w-7xl px-4 py-8 @sm:px-6 @md:py-10 @2xl:px-8">
				<Card>
					<CardHeader>
						<CardTitle className="text-xl @lg:text-2xl">
							Add New Product
						</CardTitle>
						<CardDescription>Create a new inventory item</CardDescription>
					</CardHeader>
					<CardContent>
						<div className="grid gap-6 @lg:grid-cols-2">
							<div className="space-y-6">
								<FormField label="Product Name" required>
									<Input placeholder="Enter product name" />
								</FormField>
								<div className="grid grid-cols-2 gap-4">
									<FormField
										label="SKU"
										required
										description="Unique product identifier"
									>
										<div className="relative">
											<Input placeholder="SKU-0001" className="pr-10" />
											<Barcode className="absolute right-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" />
										</div>
									</FormField>
									<FormField label="Barcode">
										<Input placeholder="1234567890" />
									</FormField>
								</div>
								<SelectField
									label="Category"
									placeholder="Select category"
									options={categories}
									required
								/>
								<FormField label="Description">
									<Textarea
										placeholder="Enter product description"
										className="min-h-24"
									/>
								</FormField>
							</div>
							<div className="space-y-6">
								<ImageUpload
									label="Product Image"
									description="PNG, JPG or WEBP (max. 5MB)"
								/>
								<div className="grid grid-cols-2 gap-4">
									<FormField label="Cost Price" required>
										<div className="relative">
											<span className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground">
												$
											</span>
											<Input
												type="number"
												placeholder="0.00"
												className="pl-7"
											/>
										</div>
									</FormField>
									<FormField label="Sale Price" required>
										<div className="relative">
											<span className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground">
												$
											</span>
											<Input
												type="number"
												placeholder="0.00"
												className="pl-7"
											/>
										</div>
									</FormField>
								</div>
								<div className="grid grid-cols-2 gap-4">
									<FormField label="Initial Stock" required>
										<Input type="number" placeholder="0" />
									</FormField>
									<SelectField
										label="Unit"
										placeholder="Select unit"
										options={units}
										required
									/>
								</div>
								<SelectField
									label="Warehouse"
									placeholder="Select warehouse"
									options={warehouses}
									required
								/>
							</div>
						</div>
					</CardContent>
					<CardFooter className="flex justify-end gap-3 border-t pt-6">
						<Button variant="outline">Cancel</Button>
						<Button>
							<Plus className="mr-2 size-4" />
							Add Product
						</Button>
					</CardFooter>
				</Card>
			</div>
		</section>
	);
}
