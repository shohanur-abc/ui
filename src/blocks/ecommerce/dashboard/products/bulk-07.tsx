'use client';

import * as React from 'react';
import {
	ToggleLeft,
	Check,
	X,
	Package,
	Eye,
	EyeOff,
	Archive,
	Play,
	Pause,
	RefreshCw,
} from 'lucide-react';

import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Checkbox } from '@/components/ui/checkbox';
import { Label } from '@/components/ui/label';
import { Progress } from '@/components/ui/progress';
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
	DialogTrigger,
} from '@/components/ui/dialog';

interface StatusOption {
	value: string;
	label: string;
	icon: React.ElementType;
	color: string;
	description: string;
}

interface Product {
	id: string;
	name: string;
	currentStatus: string;
	selected: boolean;
}

interface StatusButtonProps {
	status: StatusOption;
	isSelected: boolean;
	onClick: () => void;
}

const StatusButton = ({ status, isSelected, onClick }: StatusButtonProps) => {
	const Icon = status.icon;
	return (
		<button
			onClick={onClick}
			className={`flex flex-col items-center gap-2 rounded-lg border p-4 transition-all ${isSelected ? 'border-primary bg-primary/5' : 'hover:border-primary/50 hover:bg-accent'}`}
		>
			<div
				className={`flex size-12 items-center justify-center rounded-full ${status.color}`}
			>
				<Icon className="size-6 text-white" />
			</div>
			<span className="font-medium">{status.label}</span>
			<span className="text-center text-xs text-muted-foreground">
				{status.description}
			</span>
			{isSelected && (
				<Badge variant="default" className="mt-1">
					Selected
				</Badge>
			)}
		</button>
	);
};

interface ProductStatusRowProps {
	product: Product;
	newStatus: string | null;
	statuses: StatusOption[];
	onToggle: () => void;
}

const ProductStatusRow = ({
	product,
	newStatus,
	statuses,
	onToggle,
}: ProductStatusRowProps) => {
	const currentStatusOption = statuses.find(
		(s) => s.value === product.currentStatus
	);
	const newStatusOption = statuses.find((s) => s.value === newStatus);
	const CurrentIcon = currentStatusOption?.icon || Package;
	const NewIcon = newStatusOption?.icon || Package;

	return (
		<div className="flex items-center gap-3 rounded-lg border p-3">
			<Checkbox checked={product.selected} onCheckedChange={onToggle} />
			<Package className="size-4 text-muted-foreground" />
			<div className="flex-1">
				<p className="font-medium">{product.name}</p>
			</div>
			<div className="flex items-center gap-2 text-sm">
				<Badge variant="outline" className="gap-1">
					<CurrentIcon className="size-3" />
					{currentStatusOption?.label}
				</Badge>
				{newStatus && (
					<>
						<span className="text-muted-foreground">→</span>
						<Badge
							variant="default"
							className={`gap-1 ${newStatusOption?.color.replace('bg-', '')}`}
						>
							<NewIcon className="size-3" />
							{newStatusOption?.label}
						</Badge>
					</>
				)}
			</div>
		</div>
	);
};

interface BulkStatusModalProps {
	trigger: React.ReactNode;
	products: Product[];
	onApply: (productIds: string[], status: string) => void;
}

const BulkStatusModal = ({
	trigger,
	products,
	onApply,
}: BulkStatusModalProps) => {
	const [open, setOpen] = React.useState(false);
	const [selectedProducts, setSelectedProducts] = React.useState(
		products.filter((p) => p.selected).map((p) => p.id)
	);
	const [selectedStatus, setSelectedStatus] = React.useState<string | null>(
		null
	);
	const [isApplying, setIsApplying] = React.useState(false);
	const [progress, setProgress] = React.useState(0);

	const statuses: StatusOption[] = [
		{
			value: 'active',
			label: 'Active',
			icon: Eye,
			color: 'bg-green-500',
			description: 'Visible in store',
		},
		{
			value: 'draft',
			label: 'Draft',
			icon: EyeOff,
			color: 'bg-gray-500',
			description: 'Hidden from store',
		},
		{
			value: 'archived',
			label: 'Archived',
			icon: Archive,
			color: 'bg-amber-500',
			description: 'Removed from catalog',
		},
		{
			value: 'scheduled',
			label: 'Scheduled',
			icon: Play,
			color: 'bg-blue-500',
			description: 'Publish later',
		},
		{
			value: 'paused',
			label: 'Paused',
			icon: Pause,
			color: 'bg-red-500',
			description: 'Temporarily hidden',
		},
	];

	const toggleProduct = (id: string) => {
		setSelectedProducts((prev) =>
			prev.includes(id) ? prev.filter((p) => p !== id) : [...prev, id]
		);
	};

	const handleApply = () => {
		if (!selectedStatus) return;
		setIsApplying(true);
		setProgress(0);

		const interval = setInterval(() => {
			setProgress((prev) => {
				if (prev >= 100) {
					clearInterval(interval);
					onApply(selectedProducts, selectedStatus);
					setIsApplying(false);
					setOpen(false);
					return 100;
				}
				return prev + 20;
			});
		}, 300);
	};

	const updatedProducts = products.map((p) => ({
		...p,
		selected: selectedProducts.includes(p.id),
	}));

	return (
		<Dialog open={open} onOpenChange={setOpen}>
			<DialogTrigger asChild>{trigger}</DialogTrigger>
			<DialogContent className="max-w-2xl">
				<DialogHeader>
					<DialogTitle className="flex items-center gap-2">
						<ToggleLeft className="size-5" />
						Bulk Status Change
					</DialogTitle>
					<DialogDescription>
						Change the status of multiple products at once
					</DialogDescription>
				</DialogHeader>

				<div className="space-y-4">
					<div>
						<Label className="mb-3 block">Select New Status</Label>
						<div className="grid gap-3 @sm:grid-cols-3 @lg:grid-cols-5">
							{statuses.map((status) => (
								<StatusButton
									key={status.value}
									status={status}
									isSelected={selectedStatus === status.value}
									onClick={() => setSelectedStatus(status.value)}
								/>
							))}
						</div>
					</div>

					<div>
						<div className="mb-2 flex items-center justify-between">
							<Label>Products to Update</Label>
							<span className="text-sm text-muted-foreground">
								{selectedProducts.length} selected
							</span>
						</div>
						<div className="max-h-48 space-y-2 overflow-y-auto">
							{updatedProducts.map((product) => (
								<ProductStatusRow
									key={product.id}
									product={product}
									newStatus={
										selectedProducts.includes(product.id)
											? selectedStatus
											: null
									}
									statuses={statuses}
									onToggle={() => toggleProduct(product.id)}
								/>
							))}
						</div>
					</div>

					{isApplying && (
						<div className="space-y-2">
							<Progress value={progress} className="h-2" />
							<p className="text-center text-sm text-muted-foreground">
								Updating statuses...
							</p>
						</div>
					)}
				</div>

				<DialogFooter>
					<Button variant="outline" onClick={() => setOpen(false)}>
						Cancel
					</Button>
					<Button
						onClick={handleApply}
						disabled={
							isApplying || selectedProducts.length === 0 || !selectedStatus
						}
						className="gap-2"
					>
						{isApplying ? (
							<RefreshCw className="size-4 animate-spin" />
						) : (
							<Check className="size-4" />
						)}
						Update {selectedProducts.length} Products
					</Button>
				</DialogFooter>
			</DialogContent>
		</Dialog>
	);
};

export default function Main() {
	const products: Product[] = [
		{ id: '1', name: 'Wireless Mouse', currentStatus: 'active', selected: true },
		{ id: '2', name: 'USB Keyboard', currentStatus: 'draft', selected: true },
		{ id: '3', name: 'Monitor Stand', currentStatus: 'active', selected: false },
		{ id: '4', name: 'Webcam HD', currentStatus: 'paused', selected: true },
		{ id: '5', name: 'Desk Lamp', currentStatus: 'archived', selected: false },
	];

	return (
		<section className="@container" data-theme="dashboard">
			<div className="mx-auto max-w-2xl space-y-6 px-4 py-8 @sm:px-6">
				<div className="flex items-center gap-3">
					<ToggleLeft className="size-5" />
					<h2 className="text-xl font-semibold">Bulk Status Changes</h2>
				</div>

				<BulkStatusModal
					trigger={
						<Button className="w-full gap-2">
							<ToggleLeft className="size-4" />
							Change Product Status
						</Button>
					}
					products={products}
					onApply={(ids, status) =>
						console.log('Changed', ids, 'to', status)
					}
				/>

				<div className="rounded-lg border bg-muted/30 p-4">
					<h3 className="mb-3 font-medium">Current Products</h3>
					<div className="space-y-2">
						{products.map((product) => (
							<div
								key={product.id}
								className="flex items-center justify-between rounded-md p-2"
							>
								<div className="flex items-center gap-2">
									<Package className="size-4 text-muted-foreground" />
									<span>{product.name}</span>
								</div>
								<Badge variant="outline">{product.currentStatus}</Badge>
							</div>
						))}
					</div>
				</div>
			</div>
		</section>
	);
}
