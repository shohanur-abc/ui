'use client';

import * as React from 'react';
import {
	X,
	AlertCircle,
	Check,
	Plus,
	Trash2,
	Upload,
	Sparkles,
	Loader2,
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
import {
	Dialog,
	DialogContent,
	DialogDescription,
	DialogFooter,
	DialogHeader,
	DialogTitle,
} from '@/components/ui/dialog';
import { Separator } from '@/components/ui/separator';

interface FormFieldProps {
	label: string;
	required?: boolean;
	error?: string;
	children: React.ReactNode;
}

const FormField = ({ label, required, error, children }: FormFieldProps) => (
	<div className="space-y-2">
		<Label className={error ? 'text-destructive' : ''}>
			{label}
			{required && <span className="ml-1 text-destructive">*</span>}
		</Label>
		{children}
		{error && (
			<p className="flex items-center gap-1 text-xs text-destructive">
				<AlertCircle className="size-3" />
				{error}
			</p>
		)}
	</div>
);

interface QuickAddFormProps {
	isOpen: boolean;
	onClose: () => void;
	labels: {
		title: string;
		description: string;
		name: string;
		price: string;
		category: string;
		status: string;
		cancel: string;
		create: string;
		creating: string;
	};
}

const QuickAddForm = ({ isOpen, onClose, labels }: QuickAddFormProps) => {
	const [isSubmitting, setIsSubmitting] = React.useState(false);
	const [errors, setErrors] = React.useState<Record<string, string>>({});

	const handleSubmit = () => {
		setIsSubmitting(true);
		// Simulate submission
		setTimeout(() => {
			setIsSubmitting(false);
			onClose();
		}, 1500);
	};

	return (
		<Dialog open={isOpen} onOpenChange={onClose}>
			<DialogContent className="max-w-lg">
				<DialogHeader>
					<DialogTitle>{labels.title}</DialogTitle>
					<DialogDescription>{labels.description}</DialogDescription>
				</DialogHeader>

				<div className="space-y-4 py-4">
					<FormField label={labels.name} required error={errors.name}>
						<Input placeholder="Enter product name" />
					</FormField>

					<div className="grid gap-4 @sm:grid-cols-2">
						<FormField label={labels.price} required error={errors.price}>
							<div className="relative">
								<span className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground">
									$
								</span>
								<Input type="number" placeholder="0.00" className="pl-7" />
							</div>
						</FormField>
						<FormField label={labels.category} error={errors.category}>
							<Select>
								<SelectTrigger>
									<SelectValue placeholder="Select..." />
								</SelectTrigger>
								<SelectContent>
									<SelectItem value="electronics">Electronics</SelectItem>
									<SelectItem value="clothing">Clothing</SelectItem>
									<SelectItem value="home">Home</SelectItem>
								</SelectContent>
							</Select>
						</FormField>
					</div>

					<FormField label={labels.status} error={errors.status}>
						<Select defaultValue="draft">
							<SelectTrigger>
								<SelectValue />
							</SelectTrigger>
							<SelectContent>
								<SelectItem value="active">Active</SelectItem>
								<SelectItem value="draft">Draft</SelectItem>
							</SelectContent>
						</Select>
					</FormField>
				</div>

				<DialogFooter>
					<Button variant="outline" onClick={onClose}>
						{labels.cancel}
					</Button>
					<Button
						onClick={handleSubmit}
						disabled={isSubmitting}
						className="gap-2"
					>
						{isSubmitting ? (
							<>
								<Loader2 className="size-4 animate-spin" />
								{labels.creating}
							</>
						) : (
							<>
								<Plus className="size-4" />
								{labels.create}
							</>
						)}
					</Button>
				</DialogFooter>
			</DialogContent>
		</Dialog>
	);
};

interface AiGeneratorProps {
	onGenerate: (data: { name: string; description: string }) => void;
	labels: {
		title: string;
		placeholder: string;
		generate: string;
		generating: string;
	};
}

const AiGenerator = ({ onGenerate, labels }: AiGeneratorProps) => {
	const [prompt, setPrompt] = React.useState('');
	const [isGenerating, setIsGenerating] = React.useState(false);

	const handleGenerate = () => {
		setIsGenerating(true);
		// Simulate AI generation
		setTimeout(() => {
			onGenerate({
				name: 'Premium Wireless Headphones',
				description:
					'Experience crystal-clear audio with our top-of-the-line wireless headphones.',
			});
			setIsGenerating(false);
			setPrompt('');
		}, 2000);
	};

	return (
		<div className="rounded-lg border bg-gradient-to-br from-primary/5 to-primary/10 p-4">
			<div className="mb-3 flex items-center gap-2">
				<Sparkles className="size-4 text-primary" />
				<h4 className="font-medium">{labels.title}</h4>
			</div>
			<div className="flex gap-2">
				<Textarea
					value={prompt}
					onChange={(e) => setPrompt(e.target.value)}
					placeholder={labels.placeholder}
					rows={2}
					className="resize-none"
				/>
				<Button
					onClick={handleGenerate}
					disabled={!prompt.trim() || isGenerating}
					className="shrink-0 gap-2"
				>
					{isGenerating ? (
						<>
							<Loader2 className="size-4 animate-spin" />
							{labels.generating}
						</>
					) : (
						<>
							<Sparkles className="size-4" />
							{labels.generate}
						</>
					)}
				</Button>
			</div>
		</div>
	);
};

interface ImageDropzoneProps {
	images: string[];
	onUpload: () => void;
	onRemove: (index: number) => void;
}

const ImageDropzone = ({ images, onUpload, onRemove }: ImageDropzoneProps) => (
	<div className="space-y-3">
		<div className="grid gap-3 @sm:grid-cols-4">
			{images.map((_, idx) => (
				<div
					key={idx}
					className="group relative aspect-square overflow-hidden rounded-lg border bg-muted"
				>
					<Button
						variant="destructive"
						size="icon-sm"
						className="absolute right-2 top-2 opacity-0 transition-opacity group-hover:opacity-100"
						onClick={() => onRemove(idx)}
					>
						<Trash2 className="size-3" />
					</Button>
				</div>
			))}
			<button
				onClick={onUpload}
				className="flex aspect-square flex-col items-center justify-center gap-2 rounded-lg border-2 border-dashed text-muted-foreground transition-colors hover:border-primary hover:text-primary"
			>
				<Upload className="size-6" />
				<span className="text-xs">Add Image</span>
			</button>
		</div>
	</div>
);

export default function Main() {
	const [isQuickAddOpen, setIsQuickAddOpen] = React.useState(false);
	const [images, setImages] = React.useState<string[]>(['', '', '']);
	const [generatedData, setGeneratedData] = React.useState<{
		name: string;
		description: string;
	} | null>(null);

	const handleAiGenerate = (data: { name: string; description: string }) => {
		setGeneratedData(data);
	};

	return (
		<section className="@container" data-theme="dashboard">
			<div className="mx-auto max-w-3xl space-y-6 px-4 py-8 @sm:px-6">
				<div className="flex items-center justify-between">
					<h2 className="text-xl font-semibold">Product Form Components</h2>
					<Button onClick={() => setIsQuickAddOpen(true)} className="gap-2">
						<Plus className="size-4" />
						Quick Add
					</Button>
				</div>

				<AiGenerator
					onGenerate={handleAiGenerate}
					labels={{
						title: 'AI Product Generator',
						placeholder: 'Describe the product you want to create...',
						generate: 'Generate',
						generating: 'Generating...',
					}}
				/>

				{generatedData && (
					<div className="rounded-lg border bg-emerald-500/10 p-4">
						<div className="mb-2 flex items-center justify-between">
							<Badge className="gap-1 bg-emerald-500">
								<Sparkles className="size-3" />
								AI Generated
							</Badge>
							<Button
								variant="ghost"
								size="icon-sm"
								onClick={() => setGeneratedData(null)}
							>
								<X className="size-4" />
							</Button>
						</div>
						<p className="font-medium">{generatedData.name}</p>
						<p className="text-sm text-muted-foreground">
							{generatedData.description}
						</p>
						<Button className="mt-3 gap-2" size="sm">
							<Check className="size-4" />
							Use This
						</Button>
					</div>
				)}

				<Separator />

				<div className="rounded-lg border bg-card p-6">
					<h3 className="mb-4 font-semibold">Form with Validation</h3>
					<div className="space-y-4">
						<FormField
							label="Product Name"
							required
							error="Product name is required"
						>
							<Input
								placeholder="Enter product name"
								className="border-destructive"
							/>
						</FormField>
						<FormField label="Price" required>
							<div className="relative">
								<span className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground">
									$
								</span>
								<Input type="number" placeholder="0.00" className="pl-7" />
							</div>
						</FormField>
						<FormField label="Description">
							<Textarea rows={3} placeholder="Describe your product..." />
						</FormField>
					</div>
				</div>

				<div className="rounded-lg border bg-card p-6">
					<h3 className="mb-4 font-semibold">Image Upload</h3>
					<ImageDropzone
						images={images}
						onUpload={() => setImages((prev) => [...prev, ''])}
						onRemove={(idx) =>
							setImages((prev) => prev.filter((_, i) => i !== idx))
						}
					/>
				</div>

				<QuickAddForm
					isOpen={isQuickAddOpen}
					onClose={() => setIsQuickAddOpen(false)}
					labels={{
						title: 'Quick Add Product',
						description: 'Create a new product with basic information',
						name: 'Name',
						price: 'Price',
						category: 'Category',
						status: 'Status',
						cancel: 'Cancel',
						create: 'Create Product',
						creating: 'Creating...',
					}}
				/>
			</div>
		</section>
	);
}
