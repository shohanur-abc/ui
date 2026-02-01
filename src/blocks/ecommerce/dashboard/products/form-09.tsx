'use client';

import * as React from 'react';
import {
	Copy,
	Edit,
	Save,
	X,
	Check,
	AlertTriangle,
	ArrowRight,
	Layers,
	Wand2,
} from 'lucide-react';

import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Checkbox } from '@/components/ui/checkbox';
import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from '@/components/ui/select';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import {
	Table,
	TableBody,
	TableCell,
	TableHead,
	TableHeader,
	TableRow,
} from '@/components/ui/table';

interface Product {
	id: string;
	name: string;
	sku: string;
	price: number;
	category: string;
	status: string;
}

interface BulkField {
	key: string;
	label: string;
	type: 'text' | 'number' | 'select';
	options?: string[];
	enabled: boolean;
	value: string | number;
}

interface ProductPreviewRowProps {
	product: Product;
	fields: BulkField[];
	isSelected: boolean;
	onToggle: () => void;
}

const ProductPreviewRow = ({
	product,
	fields,
	isSelected,
	onToggle,
}: ProductPreviewRowProps) => {
	const enabledFields = fields.filter((f) => f.enabled);

	return (
		<TableRow className={isSelected ? 'bg-primary/5' : ''}>
			<TableCell>
				<Checkbox checked={isSelected} onCheckedChange={onToggle} />
			</TableCell>
			<TableCell>
				<div>
					<p className="font-medium">{product.name}</p>
					<p className="text-sm text-muted-foreground">{product.sku}</p>
				</div>
			</TableCell>
			{enabledFields.map((field) => (
				<TableCell key={field.key}>
					<div className="flex items-center gap-2">
						<span className="text-muted-foreground line-through">
							{product[field.key as keyof Product]}
						</span>
						<ArrowRight className="size-3 text-muted-foreground" />
						<span className="font-medium text-primary">{field.value}</span>
					</div>
				</TableCell>
			))}
		</TableRow>
	);
};

interface BulkFieldEditorProps {
	field: BulkField;
	onUpdate: (updates: Partial<BulkField>) => void;
}

const BulkFieldEditor = ({ field, onUpdate }: BulkFieldEditorProps) => (
	<div className="flex items-start gap-3 rounded-lg border p-3">
		<Checkbox
			checked={field.enabled}
			onCheckedChange={(v) => onUpdate({ enabled: !!v })}
		/>
		<div className="flex-1 space-y-2">
			<Label className={!field.enabled ? 'text-muted-foreground' : ''}>
				{field.label}
			</Label>
			{field.type === 'select' ? (
				<Select
					value={field.value as string}
					onValueChange={(v) => onUpdate({ value: v })}
					disabled={!field.enabled}
				>
					<SelectTrigger>
						<SelectValue placeholder="Select value..." />
					</SelectTrigger>
					<SelectContent>
						{field.options?.map((opt) => (
							<SelectItem key={opt} value={opt}>
								{opt}
							</SelectItem>
						))}
					</SelectContent>
				</Select>
			) : field.type === 'number' ? (
				<Input
					type="number"
					value={field.value}
					onChange={(e) => onUpdate({ value: parseFloat(e.target.value) || 0 })}
					disabled={!field.enabled}
				/>
			) : (
				<Input
					value={field.value as string}
					onChange={(e) => onUpdate({ value: e.target.value })}
					disabled={!field.enabled}
				/>
			)}
		</div>
	</div>
);

interface ApplyProgressProps {
	total: number;
	completed: number;
	isRunning: boolean;
}

const ApplyProgress = ({ total, completed, isRunning }: ApplyProgressProps) => {
	const percentage = (completed / total) * 100;

	if (!isRunning) return null;

	return (
		<div className="rounded-lg border bg-primary/5 p-4">
			<div className="mb-2 flex items-center justify-between">
				<span className="font-medium">Applying changes...</span>
				<span className="text-sm text-muted-foreground">
					{completed} / {total}
				</span>
			</div>
			<Progress value={percentage} className="h-2" />
		</div>
	);
};

export default function Main() {
	const [products] = React.useState<Product[]>([
		{
			id: '1',
			name: 'Wireless Mouse',
			sku: 'WM-001',
			price: 29.99,
			category: 'Electronics',
			status: 'Active',
		},
		{
			id: '2',
			name: 'USB Keyboard',
			sku: 'KB-001',
			price: 49.99,
			category: 'Electronics',
			status: 'Active',
		},
		{
			id: '3',
			name: 'Monitor Stand',
			sku: 'MS-001',
			price: 39.99,
			category: 'Accessories',
			status: 'Draft',
		},
		{
			id: '4',
			name: 'Webcam HD',
			sku: 'WC-001',
			price: 59.99,
			category: 'Electronics',
			status: 'Active',
		},
		{
			id: '5',
			name: 'Desk Lamp',
			sku: 'DL-001',
			price: 24.99,
			category: 'Home',
			status: 'Active',
		},
	]);

	const [selectedIds, setSelectedIds] = React.useState<string[]>([
		'1',
		'2',
		'4',
	]);

	const [fields, setFields] = React.useState<BulkField[]>([
		{
			key: 'category',
			label: 'Category',
			type: 'select',
			options: ['Electronics', 'Accessories', 'Home', 'Office'],
			enabled: true,
			value: 'Electronics',
		},
		{
			key: 'status',
			label: 'Status',
			type: 'select',
			options: ['Active', 'Draft', 'Archived'],
			enabled: false,
			value: 'Active',
		},
		{ key: 'price', label: 'Price', type: 'number', enabled: false, value: 0 },
	]);

	const [isApplying, setIsApplying] = React.useState(false);
	const [applyProgress, setApplyProgress] = React.useState(0);

	const toggleProduct = (id: string) => {
		setSelectedIds((prev) =>
			prev.includes(id) ? prev.filter((i) => i !== id) : [...prev, id],
		);
	};

	const toggleAll = () => {
		if (selectedIds.length === products.length) {
			setSelectedIds([]);
		} else {
			setSelectedIds(products.map((p) => p.id));
		}
	};

	const updateField = (index: number, updates: Partial<BulkField>) => {
		setFields((prev) =>
			prev.map((f, i) => (i === index ? { ...f, ...updates } : f)),
		);
	};

	const applyChanges = () => {
		setIsApplying(true);
		setApplyProgress(0);

		const interval = setInterval(() => {
			setApplyProgress((prev) => {
				if (prev >= selectedIds.length) {
					clearInterval(interval);
					setIsApplying(false);
					return prev;
				}
				return prev + 1;
			});
		}, 500);
	};

	const enabledFields = fields.filter((f) => f.enabled);

	return (
		<section className="@container" data-theme="dashboard">
			<div className="mx-auto max-w-5xl space-y-6 px-4 py-8 @sm:px-6 @2xl:px-8">
				<div className="flex items-center justify-between">
					<div className="flex items-center gap-3">
						<Layers className="size-5" />
						<h2 className="text-xl font-semibold">Bulk Edit</h2>
					</div>
					<Badge variant="secondary">
						{selectedIds.length} products selected
					</Badge>
				</div>

				<div className="grid gap-6 @lg:grid-cols-3">
					<Card className="@lg:col-span-1">
						<CardHeader className="pb-3">
							<CardTitle className="text-base">Fields to Update</CardTitle>
						</CardHeader>
						<CardContent className="space-y-3">
							{fields.map((field, idx) => (
								<BulkFieldEditor
									key={field.key}
									field={field}
									onUpdate={(updates) => updateField(idx, updates)}
								/>
							))}
						</CardContent>
					</Card>

					<div className="@lg:col-span-2">
						<Card>
							<CardHeader className="pb-3">
								<div className="flex items-center justify-between">
									<CardTitle className="text-base">Preview Changes</CardTitle>
									{enabledFields.length === 0 && (
										<div className="flex items-center gap-2 text-amber-500">
											<AlertTriangle className="size-4" />
											<span className="text-sm">No fields selected</span>
										</div>
									)}
								</div>
							</CardHeader>
							<CardContent>
								<div className="overflow-x-auto">
									<Table>
										<TableHeader>
											<TableRow>
												<TableHead className="w-10">
													<Checkbox
														checked={selectedIds.length === products.length}
														onCheckedChange={toggleAll}
													/>
												</TableHead>
												<TableHead>Product</TableHead>
												{enabledFields.map((field) => (
													<TableHead key={field.key}>{field.label}</TableHead>
												))}
											</TableRow>
										</TableHeader>
										<TableBody>
											{products.map((product) => (
												<ProductPreviewRow
													key={product.id}
													product={product}
													fields={fields}
													isSelected={selectedIds.includes(product.id)}
													onToggle={() => toggleProduct(product.id)}
												/>
											))}
										</TableBody>
									</Table>
								</div>
							</CardContent>
						</Card>
					</div>
				</div>

				<ApplyProgress
					total={selectedIds.length}
					completed={applyProgress}
					isRunning={isApplying}
				/>

				<div className="flex justify-end gap-2">
					<Button variant="outline" disabled={isApplying}>
						Cancel
					</Button>
					<Button
						onClick={applyChanges}
						disabled={
							isApplying ||
							selectedIds.length === 0 ||
							enabledFields.length === 0
						}
						className="gap-2"
					>
						{isApplying ? (
							<>Applying...</>
						) : (
							<>
								<Check className="size-4" />
								Apply to {selectedIds.length} Products
							</>
						)}
					</Button>
				</div>
			</div>
		</section>
	);
}
