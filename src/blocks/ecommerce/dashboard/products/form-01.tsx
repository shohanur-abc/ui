'use client';

import * as React from 'react';
import {
	Plus,
	X,
	Upload,
	Trash2,
	Copy,
	Save,
	ArrowLeft,
	Package,
	DollarSign,
	Layers,
	FileText,
	Image as ImageIcon,
	Settings,
	Check,
} from 'lucide-react';

import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Switch } from '@/components/ui/switch';
import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from '@/components/ui/select';
import { Separator } from '@/components/ui/separator';
import { Progress } from '@/components/ui/progress';

interface FormStepProps {
	step: number;
	currentStep: number;
	title: string;
	icon: React.ElementType;
	isCompleted: boolean;
}

const FormStep = ({
	step,
	currentStep,
	title,
	icon: Icon,
	isCompleted,
}: FormStepProps) => {
	const isActive = step === currentStep;

	return (
		<div className="flex items-center gap-3">
			<div
				className={`flex size-10 items-center justify-center rounded-full border-2 transition-colors ${isActive ? 'border-primary bg-primary text-primary-foreground' : isCompleted ? 'border-emerald-500 bg-emerald-500 text-white' : 'border-muted bg-background'}`}
			>
				{isCompleted ? (
					<Check className="size-5" />
				) : (
					<Icon className="size-5" />
				)}
			</div>
			<span
				className={`hidden font-medium @sm:block ${isActive ? 'text-foreground' : 'text-muted-foreground'}`}
			>
				{title}
			</span>
		</div>
	);
};

interface FormStepsProps {
	steps: { title: string; icon: React.ElementType }[];
	currentStep: number;
	completedSteps: number[];
}

const FormSteps = ({ steps, currentStep, completedSteps }: FormStepsProps) => (
	<div className="flex items-center justify-between gap-2">
		{steps.map((step, idx) => (
			<React.Fragment key={step.title}>
				<FormStep
					step={idx + 1}
					currentStep={currentStep}
					title={step.title}
					icon={step.icon}
					isCompleted={completedSteps.includes(idx + 1)}
				/>
				{idx < steps.length - 1 && (
					<div className="hidden h-px flex-1 bg-border @sm:block" />
				)}
			</React.Fragment>
		))}
	</div>
);

interface BasicInfoStepProps {
	labels: {
		name: string;
		description: string;
		category: string;
		tags: string;
	};
}

const BasicInfoStep = ({ labels }: BasicInfoStepProps) => (
	<div className="space-y-6">
		<div className="space-y-2">
			<Label htmlFor="name">{labels.name} *</Label>
			<Input id="name" placeholder="Enter product name" />
		</div>
		<div className="space-y-2">
			<Label htmlFor="description">{labels.description}</Label>
			<Textarea
				id="description"
				rows={4}
				placeholder="Describe your product..."
			/>
		</div>
		<div className="grid gap-6 @sm:grid-cols-2">
			<div className="space-y-2">
				<Label htmlFor="category">{labels.category}</Label>
				<Select>
					<SelectTrigger>
						<SelectValue placeholder="Select category" />
					</SelectTrigger>
					<SelectContent>
						<SelectItem value="electronics">Electronics</SelectItem>
						<SelectItem value="clothing">Clothing</SelectItem>
						<SelectItem value="home">Home & Garden</SelectItem>
					</SelectContent>
				</Select>
			</div>
			<div className="space-y-2">
				<Label htmlFor="tags">{labels.tags}</Label>
				<Input id="tags" placeholder="Add tags separated by comma" />
			</div>
		</div>
	</div>
);

interface PricingStepProps {
	labels: {
		price: string;
		comparePrice: string;
		cost: string;
		sku: string;
		barcode: string;
	};
}

const PricingStep = ({ labels }: PricingStepProps) => (
	<div className="space-y-6">
		<div className="grid gap-6 @sm:grid-cols-3">
			<div className="space-y-2">
				<Label htmlFor="price">{labels.price} *</Label>
				<div className="relative">
					<span className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground">
						$
					</span>
					<Input id="price" type="number" placeholder="0.00" className="pl-7" />
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
						placeholder="0.00"
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
					<Input id="cost" type="number" placeholder="0.00" className="pl-7" />
				</div>
			</div>
		</div>
		<Separator />
		<div className="grid gap-6 @sm:grid-cols-2">
			<div className="space-y-2">
				<Label htmlFor="sku">{labels.sku}</Label>
				<Input id="sku" placeholder="SKU-001" />
			</div>
			<div className="space-y-2">
				<Label htmlFor="barcode">{labels.barcode}</Label>
				<Input id="barcode" placeholder="UPC or ISBN" />
			</div>
		</div>
		<div className="flex items-center gap-3">
			<Switch id="taxable" defaultChecked />
			<Label htmlFor="taxable">Charge tax on this product</Label>
		</div>
	</div>
);

interface InventoryStepProps {
	labels: {
		stock: string;
		lowStock: string;
		warehouse: string;
	};
}

const InventoryStep = ({ labels }: InventoryStepProps) => (
	<div className="space-y-6">
		<div className="grid gap-6 @sm:grid-cols-2">
			<div className="space-y-2">
				<Label htmlFor="stock">{labels.stock} *</Label>
				<Input id="stock" type="number" placeholder="0" />
			</div>
			<div className="space-y-2">
				<Label htmlFor="low-stock">{labels.lowStock}</Label>
				<Input id="low-stock" type="number" placeholder="10" />
			</div>
		</div>
		<div className="space-y-2">
			<Label htmlFor="warehouse">{labels.warehouse}</Label>
			<Select>
				<SelectTrigger>
					<SelectValue placeholder="Select warehouse" />
				</SelectTrigger>
				<SelectContent>
					<SelectItem value="main">Main Warehouse</SelectItem>
					<SelectItem value="west">West Coast</SelectItem>
					<SelectItem value="east">East Coast</SelectItem>
				</SelectContent>
			</Select>
		</div>
		<div className="space-y-3">
			<div className="flex items-center gap-3">
				<Switch id="track-inventory" defaultChecked />
				<Label htmlFor="track-inventory">Track quantity</Label>
			</div>
			<div className="flex items-center gap-3">
				<Switch id="continue-selling" />
				<Label htmlFor="continue-selling">
					Continue selling when out of stock
				</Label>
			</div>
		</div>
	</div>
);

interface MediaStepProps {
	labels: { upload: string; drag: string };
}

const MediaStep = ({ labels }: MediaStepProps) => (
	<div className="space-y-6">
		<div className="flex flex-col items-center justify-center rounded-lg border-2 border-dashed p-8">
			<Upload className="mb-4 size-12 text-muted-foreground" />
			<p className="text-center font-medium">{labels.drag}</p>
			<p className="text-center text-sm text-muted-foreground">
				PNG, JPG, GIF up to 10MB
			</p>
			<Button variant="outline" className="mt-4">
				{labels.upload}
			</Button>
		</div>
		<div className="grid gap-4 @sm:grid-cols-4">
			{[1, 2, 3].map((i) => (
				<div
					key={i}
					className="group relative aspect-square overflow-hidden rounded-lg border bg-muted"
				>
					<div className="absolute inset-0 flex items-center justify-center opacity-0 transition-opacity group-hover:bg-black/50 group-hover:opacity-100">
						<Button variant="destructive" size="icon-sm">
							<Trash2 className="size-4" />
						</Button>
					</div>
				</div>
			))}
		</div>
	</div>
);

export default function Main() {
	const [currentStep, setCurrentStep] = React.useState(1);
	const [completedSteps, setCompletedSteps] = React.useState<number[]>([]);

	const steps = [
		{ title: 'Basic Info', icon: FileText },
		{ title: 'Pricing', icon: DollarSign },
		{ title: 'Inventory', icon: Package },
		{ title: 'Media', icon: ImageIcon },
	];

	const handleNext = () => {
		if (currentStep < steps.length) {
			setCompletedSteps((prev) => [...prev, currentStep]);
			setCurrentStep((prev) => prev + 1);
		}
	};

	const handlePrev = () => {
		if (currentStep > 1) {
			setCurrentStep((prev) => prev - 1);
		}
	};

	const progress = (completedSteps.length / steps.length) * 100;

	return (
		<section className="@container" data-theme="dashboard">
			<div className="mx-auto max-w-3xl space-y-6 px-4 py-8 @sm:px-6">
				<div className="flex items-center justify-between">
					<h2 className="text-xl font-semibold">Create New Product</h2>
					<Badge variant="secondary">{Math.round(progress)}% Complete</Badge>
				</div>

				<Progress value={progress} />

				<FormSteps
					steps={steps}
					currentStep={currentStep}
					completedSteps={completedSteps}
				/>

				<div className="rounded-lg border bg-card p-6">
					{currentStep === 1 && (
						<BasicInfoStep
							labels={{
								name: 'Product Name',
								description: 'Description',
								category: 'Category',
								tags: 'Tags',
							}}
						/>
					)}
					{currentStep === 2 && (
						<PricingStep
							labels={{
								price: 'Selling Price',
								comparePrice: 'Compare at Price',
								cost: 'Cost per Item',
								sku: 'SKU',
								barcode: 'Barcode',
							}}
						/>
					)}
					{currentStep === 3 && (
						<InventoryStep
							labels={{
								stock: 'Stock Quantity',
								lowStock: 'Low Stock Alert',
								warehouse: 'Warehouse',
							}}
						/>
					)}
					{currentStep === 4 && (
						<MediaStep
							labels={{
								upload: 'Browse Files',
								drag: 'Drag and drop your images here',
							}}
						/>
					)}
				</div>

				<div className="flex justify-between">
					<Button
						variant="outline"
						onClick={handlePrev}
						disabled={currentStep === 1}
						className="gap-2"
					>
						<ArrowLeft className="size-4" />
						Previous
					</Button>
					{currentStep < steps.length ? (
						<Button onClick={handleNext} className="gap-2">
							Next
							<ArrowLeft className="size-4 rotate-180" />
						</Button>
					) : (
						<Button className="gap-2">
							<Save className="size-4" />
							Create Product
						</Button>
					)}
				</div>
			</div>
		</section>
	);
}
