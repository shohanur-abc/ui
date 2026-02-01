'use client';

import * as React from 'react';
import {
	Layers,
	Check,
	X,
	ArrowRight,
	DollarSign,
	Tag,
	Package,
	ToggleLeft,
	RefreshCw,
} from 'lucide-react';

import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Checkbox } from '@/components/ui/checkbox';
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
import { Progress } from '@/components/ui/progress';
import { Separator } from '@/components/ui/separator';

interface BulkActionOption {
	id: string;
	label: string;
	icon: React.ElementType;
	type: 'select' | 'input' | 'toggle';
	options?: string[];
}

interface BulkActionModalProps {
	trigger: React.ReactNode;
	title: string;
	action: BulkActionOption;
	selectedCount: number;
	onApply: (value: string | boolean) => void;
}

const BulkActionModal = ({
	trigger,
	title,
	action,
	selectedCount,
	onApply,
}: BulkActionModalProps) => {
	const [open, setOpen] = React.useState(false);
	const [value, setValue] = React.useState<string | boolean>('');
	const [isApplying, setIsApplying] = React.useState(false);
	const [progress, setProgress] = React.useState(0);

	const handleApply = () => {
		setIsApplying(true);
		setProgress(0);

		const interval = setInterval(() => {
			setProgress((prev) => {
				if (prev >= 100) {
					clearInterval(interval);
					onApply(value);
					setIsApplying(false);
					setOpen(false);
					return 100;
				}
				return prev + 20;
			});
		}, 300);
	};

	const Icon = action.icon;

	return (
		<Dialog open={open} onOpenChange={setOpen}>
			<DialogTrigger asChild>{trigger}</DialogTrigger>
			<DialogContent>
				<DialogHeader>
					<DialogTitle className="flex items-center gap-2">
						<Icon className="size-5" />
						{title}
					</DialogTitle>
				</DialogHeader>

				<div className="space-y-4 py-4">
					<div className="rounded-lg border bg-muted/30 p-3">
						<div className="flex items-center gap-2">
							<Package className="size-4 text-muted-foreground" />
							<span className="text-sm">
								This action will affect{' '}
								<span className="font-bold">{selectedCount}</span> products
							</span>
						</div>
					</div>

					<div className="space-y-2">
						<Label>{action.label}</Label>
						{action.type === 'select' && (
							<Select
								value={value as string}
								onValueChange={(v) => setValue(v)}
							>
								<SelectTrigger>
									<SelectValue placeholder="Select value..." />
								</SelectTrigger>
								<SelectContent>
									{action.options?.map((opt) => (
										<SelectItem key={opt} value={opt}>
											{opt}
										</SelectItem>
									))}
								</SelectContent>
							</Select>
						)}
						{action.type === 'input' && (
							<Input
								value={value as string}
								onChange={(e) => setValue(e.target.value)}
								placeholder="Enter value..."
							/>
						)}
						{action.type === 'toggle' && (
							<div className="flex items-center justify-between rounded-lg border p-3">
								<span>Enable</span>
								<Button
									variant={value ? 'default' : 'outline'}
									size="sm"
									onClick={() => setValue(!value)}
								>
									{value ? 'Yes' : 'No'}
								</Button>
							</div>
						)}
					</div>

					{isApplying && (
						<div className="space-y-2">
							<Progress value={progress} className="h-2" />
							<p className="text-center text-sm text-muted-foreground">
								Applying changes...
							</p>
						</div>
					)}
				</div>

				<DialogFooter>
					<Button
						variant="outline"
						onClick={() => setOpen(false)}
						disabled={isApplying}
					>
						Cancel
					</Button>
					<Button onClick={handleApply} disabled={isApplying || !value}>
						{isApplying ? (
							<RefreshCw className="mr-2 size-4 animate-spin" />
						) : (
							<Check className="mr-2 size-4" />
						)}
						Apply to {selectedCount} Products
					</Button>
				</DialogFooter>
			</DialogContent>
		</Dialog>
	);
};

interface PreviewChangeProps {
	products: { id: string; name: string; currentValue: string }[];
	newValue: string;
	field: string;
}

const PreviewChange = ({ products, newValue, field }: PreviewChangeProps) => (
	<div className="max-h-48 space-y-2 overflow-y-auto rounded-lg border bg-muted/30 p-3">
		{products.map((product) => (
			<div
				key={product.id}
				className="flex items-center justify-between rounded-lg bg-background p-2 text-sm"
			>
				<span className="font-medium">{product.name}</span>
				<div className="flex items-center gap-2">
					<span className="text-muted-foreground line-through">
						{product.currentValue}
					</span>
					<ArrowRight className="size-4 text-muted-foreground" />
					<span className="text-primary">{newValue}</span>
				</div>
			</div>
		))}
	</div>
);

export default function Main() {
	const bulkActions: BulkActionOption[] = [
		{
			id: 'status',
			label: 'Status',
			icon: ToggleLeft,
			type: 'select',
			options: ['Active', 'Draft', 'Archived'],
		},
		{
			id: 'category',
			label: 'Category',
			icon: Tag,
			type: 'select',
			options: ['Electronics', 'Clothing', 'Home', 'Sports'],
		},
		{
			id: 'price-adjust',
			label: 'Price Adjustment (%)',
			icon: DollarSign,
			type: 'input',
		},
		{
			id: 'featured',
			label: 'Featured',
			icon: Layers,
			type: 'toggle',
		},
	];

	const sampleProducts = [
		{ id: '1', name: 'Wireless Mouse', currentValue: 'Draft' },
		{ id: '2', name: 'USB Keyboard', currentValue: 'Draft' },
		{ id: '3', name: 'Monitor Stand', currentValue: 'Active' },
		{ id: '4', name: 'Webcam HD', currentValue: 'Draft' },
	];

	const [selectedStatus, setSelectedStatus] = React.useState('');

	return (
		<section className="@container" data-theme="dashboard">
			<div className="mx-auto max-w-2xl space-y-6 px-4 py-8 @sm:px-6">
				<div className="flex items-center gap-3">
					<Layers className="size-5" />
					<h2 className="text-xl font-semibold">Bulk Action Modals</h2>
				</div>

				<div className="grid gap-3 @sm:grid-cols-2">
					{bulkActions.map((action) => (
						<BulkActionModal
							key={action.id}
							trigger={
								<Button
									variant="outline"
									className="w-full justify-start gap-2"
								>
									<action.icon className="size-4" />
									Change {action.label}
								</Button>
							}
							title={`Change ${action.label}`}
							action={action}
							selectedCount={4}
							onApply={(value) =>
								console.log(`Applied ${action.label}:`, value)
							}
						/>
					))}
				</div>

				<Separator />

				<div className="space-y-4">
					<h3 className="font-medium">Preview Changes</h3>
					<div className="space-y-2">
						<Label>New Status</Label>
						<Select value={selectedStatus} onValueChange={setSelectedStatus}>
							<SelectTrigger>
								<SelectValue placeholder="Select status..." />
							</SelectTrigger>
							<SelectContent>
								<SelectItem value="Active">Active</SelectItem>
								<SelectItem value="Draft">Draft</SelectItem>
								<SelectItem value="Archived">Archived</SelectItem>
							</SelectContent>
						</Select>
					</div>

					{selectedStatus && (
						<PreviewChange
							products={sampleProducts}
							newValue={selectedStatus}
							field="Status"
						/>
					)}
				</div>
			</div>
		</section>
	);
}
