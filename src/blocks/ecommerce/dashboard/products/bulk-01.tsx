'use client';

import * as React from 'react';
import {
	Checkbox,
	Edit,
	Trash2,
	Tag,
	Archive,
	Eye,
	EyeOff,
	Copy,
	Download,
	MoreHorizontal,
	AlertTriangle,
	X,
} from 'lucide-react';

import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuItem,
	DropdownMenuLabel,
	DropdownMenuSeparator,
	DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import {
	AlertDialog,
	AlertDialogAction,
	AlertDialogCancel,
	AlertDialogContent,
	AlertDialogDescription,
	AlertDialogFooter,
	AlertDialogHeader,
	AlertDialogTitle,
} from '@/components/ui/alert-dialog';
import { Progress } from '@/components/ui/progress';

interface BulkAction {
	id: string;
	label: string;
	icon: React.ElementType;
	variant?: 'default' | 'destructive';
	requiresConfirmation?: boolean;
}

interface SelectionBarProps {
	selectedCount: number;
	totalCount: number;
	onSelectAll: () => void;
	onDeselectAll: () => void;
	actions: BulkAction[];
	onAction: (actionId: string) => void;
	labels: { selected: string; selectAll: string; clear: string };
}

const SelectionBar = ({
	selectedCount,
	totalCount,
	onSelectAll,
	onDeselectAll,
	actions,
	onAction,
	labels,
}: SelectionBarProps) => {
	const [confirmAction, setConfirmAction] = React.useState<BulkAction | null>(
		null,
	);

	if (selectedCount === 0) return null;

	const handleAction = (action: BulkAction) => {
		if (action.requiresConfirmation) {
			setConfirmAction(action);
		} else {
			onAction(action.id);
		}
	};

	return (
		<>
			<div className="sticky top-0 z-10 flex items-center justify-between gap-4 rounded-lg border bg-primary/5 p-3">
				<div className="flex items-center gap-3">
					<Badge variant="secondary" className="text-base font-bold">
						{selectedCount}
					</Badge>
					<span className="text-sm">
						{labels.selected} {selectedCount < totalCount && `of ${totalCount}`}
					</span>
					{selectedCount < totalCount ? (
						<Button
							variant="link"
							size="sm"
							onClick={onSelectAll}
							className="h-auto p-0"
						>
							{labels.selectAll}
						</Button>
					) : (
						<Button
							variant="link"
							size="sm"
							onClick={onDeselectAll}
							className="h-auto p-0"
						>
							{labels.clear}
						</Button>
					)}
				</div>

				<div className="flex items-center gap-2">
					{actions.slice(0, 4).map((action) => (
						<Button
							key={action.id}
							variant={
								action.variant === 'destructive' ? 'destructive' : 'outline'
							}
							size="sm"
							className="gap-1.5"
							onClick={() => handleAction(action)}
						>
							<action.icon className="size-3.5" />
							{action.label}
						</Button>
					))}
					{actions.length > 4 && (
						<DropdownMenu>
							<DropdownMenuTrigger asChild>
								<Button variant="outline" size="sm">
									<MoreHorizontal className="size-4" />
								</Button>
							</DropdownMenuTrigger>
							<DropdownMenuContent align="end">
								<DropdownMenuLabel>More Actions</DropdownMenuLabel>
								<DropdownMenuSeparator />
								{actions.slice(4).map((action) => (
									<DropdownMenuItem
										key={action.id}
										onClick={() => handleAction(action)}
										className={
											action.variant === 'destructive' ? 'text-destructive' : ''
										}
									>
										<action.icon className="mr-2 size-4" />
										{action.label}
									</DropdownMenuItem>
								))}
							</DropdownMenuContent>
						</DropdownMenu>
					)}
					<Button variant="ghost" size="icon-sm" onClick={onDeselectAll}>
						<X className="size-4" />
					</Button>
				</div>
			</div>

			<AlertDialog
				open={!!confirmAction}
				onOpenChange={() => setConfirmAction(null)}
			>
				<AlertDialogContent>
					<AlertDialogHeader>
						<AlertDialogTitle className="flex items-center gap-2">
							<AlertTriangle className="size-5 text-amber-500" />
							Confirm {confirmAction?.label}
						</AlertDialogTitle>
						<AlertDialogDescription>
							Are you sure you want to {confirmAction?.label.toLowerCase()}{' '}
							{selectedCount} selected products? This action cannot be undone.
						</AlertDialogDescription>
					</AlertDialogHeader>
					<AlertDialogFooter>
						<AlertDialogCancel>Cancel</AlertDialogCancel>
						<AlertDialogAction
							onClick={() => {
								if (confirmAction) {
									onAction(confirmAction.id);
									setConfirmAction(null);
								}
							}}
							className={
								confirmAction?.variant === 'destructive'
									? 'bg-destructive text-destructive-foreground hover:bg-destructive/90'
									: ''
							}
						>
							{confirmAction?.label}
						</AlertDialogAction>
					</AlertDialogFooter>
				</AlertDialogContent>
			</AlertDialog>
		</>
	);
};

interface ProgressModalProps {
	isOpen: boolean;
	action: string;
	current: number;
	total: number;
	onCancel: () => void;
}

const ProgressModal = ({
	isOpen,
	action,
	current,
	total,
	onCancel,
}: ProgressModalProps) => {
	if (!isOpen) return null;

	const progress = (current / total) * 100;

	return (
		<div className="fixed inset-0 z-50 flex items-center justify-center bg-background/80 backdrop-blur-sm">
			<div className="w-full max-w-md rounded-lg border bg-card p-6 shadow-lg">
				<h3 className="font-semibold">{action} in progress...</h3>
				<div className="mt-4 space-y-2">
					<Progress value={progress} />
					<p className="text-sm text-muted-foreground">
						Processing {current} of {total} items
					</p>
				</div>
				<div className="mt-4 flex justify-end">
					<Button variant="outline" onClick={onCancel}>
						Cancel
					</Button>
				</div>
			</div>
		</div>
	);
};

interface ProductItem {
	id: string;
	name: string;
	sku: string;
	price: number;
	status: 'active' | 'draft' | 'archived';
	stock: number;
}

interface ProductRowProps {
	product: ProductItem;
	isSelected: boolean;
	onToggle: () => void;
}

const ProductRow = ({ product, isSelected, onToggle }: ProductRowProps) => {
	const statusColors = {
		active: 'bg-emerald-500/10 text-emerald-500',
		draft: 'bg-amber-500/10 text-amber-500',
		archived: 'bg-muted text-muted-foreground',
	};

	return (
		<div
			className={`flex items-center gap-4 rounded-lg border p-4 transition-colors ${isSelected ? 'border-primary bg-primary/5' : 'bg-card'}`}
		>
			<input
				type="checkbox"
				checked={isSelected}
				onChange={onToggle}
				className="size-4 rounded border-input"
			/>
			<div className="size-12 rounded-md bg-muted" />
			<div className="flex-1">
				<p className="font-medium">{product.name}</p>
				<p className="text-sm text-muted-foreground">{product.sku}</p>
			</div>
			<div className="text-right">
				<p className="font-semibold">${product.price.toFixed(2)}</p>
				<p className="text-sm text-muted-foreground">
					{product.stock} in stock
				</p>
			</div>
			<Badge className={statusColors[product.status]}>{product.status}</Badge>
		</div>
	);
};

export default function Main() {
	const [products] = React.useState<ProductItem[]>([
		{
			id: '1',
			name: 'Wireless Headphones Pro',
			sku: 'WHP-001',
			price: 149.99,
			status: 'active',
			stock: 45,
		},
		{
			id: '2',
			name: 'Mechanical Keyboard RGB',
			sku: 'MKB-002',
			price: 199.99,
			status: 'active',
			stock: 23,
		},
		{
			id: '3',
			name: 'Gaming Mouse Elite',
			sku: 'GME-003',
			price: 79.99,
			status: 'draft',
			stock: 0,
		},
		{
			id: '4',
			name: 'USB-C Hub 7-in-1',
			sku: 'UCH-004',
			price: 49.99,
			status: 'active',
			stock: 156,
		},
		{
			id: '5',
			name: 'Webcam 4K Ultra',
			sku: 'WCU-005',
			price: 129.99,
			status: 'archived',
			stock: 12,
		},
		{
			id: '6',
			name: 'Portable SSD 1TB',
			sku: 'SSD-006',
			price: 89.99,
			status: 'active',
			stock: 78,
		},
	]);

	const [selectedIds, setSelectedIds] = React.useState<string[]>([]);
	const [isProcessing, setIsProcessing] = React.useState(false);
	const [processProgress, setProcessProgress] = React.useState({
		current: 0,
		total: 0,
		action: '',
	});

	const bulkActions: BulkAction[] = [
		{ id: 'edit', label: 'Edit', icon: Edit },
		{ id: 'publish', label: 'Publish', icon: Eye },
		{ id: 'unpublish', label: 'Unpublish', icon: EyeOff },
		{ id: 'duplicate', label: 'Duplicate', icon: Copy },
		{ id: 'add-tags', label: 'Add Tags', icon: Tag },
		{ id: 'export', label: 'Export', icon: Download },
		{
			id: 'archive',
			label: 'Archive',
			icon: Archive,
			requiresConfirmation: true,
		},
		{
			id: 'delete',
			label: 'Delete',
			icon: Trash2,
			variant: 'destructive',
			requiresConfirmation: true,
		},
	];

	const toggleSelection = (id: string) => {
		setSelectedIds((prev) =>
			prev.includes(id) ? prev.filter((i) => i !== id) : [...prev, id],
		);
	};

	const selectAll = () => {
		setSelectedIds(products.map((p) => p.id));
	};

	const deselectAll = () => {
		setSelectedIds([]);
	};

	const handleAction = (actionId: string) => {
		const action = bulkActions.find((a) => a.id === actionId);
		if (!action) return;

		setIsProcessing(true);
		setProcessProgress({
			current: 0,
			total: selectedIds.length,
			action: action.label,
		});

		// Simulate processing
		let current = 0;
		const interval = setInterval(() => {
			current++;
			setProcessProgress((prev) => ({ ...prev, current }));
			if (current >= selectedIds.length) {
				clearInterval(interval);
				setIsProcessing(false);
				deselectAll();
			}
		}, 300);
	};

	return (
		<section className="@container" data-theme="dashboard">
			<div className="mx-auto max-w-4xl space-y-4 px-4 py-8 @sm:px-6 @2xl:px-8">
				<SelectionBar
					selectedCount={selectedIds.length}
					totalCount={products.length}
					onSelectAll={selectAll}
					onDeselectAll={deselectAll}
					actions={bulkActions}
					onAction={handleAction}
					labels={{
						selected: 'products selected',
						selectAll: 'Select all',
						clear: 'Clear selection',
					}}
				/>

				<div className="space-y-2">
					{products.map((product) => (
						<ProductRow
							key={product.id}
							product={product}
							isSelected={selectedIds.includes(product.id)}
							onToggle={() => toggleSelection(product.id)}
						/>
					))}
				</div>

				<ProgressModal
					isOpen={isProcessing}
					action={processProgress.action}
					current={processProgress.current}
					total={processProgress.total}
					onCancel={() => setIsProcessing(false)}
				/>
			</div>
		</section>
	);
}
