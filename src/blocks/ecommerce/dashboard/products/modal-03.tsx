'use client';

import * as React from 'react';
import {
	Trash2,
	AlertTriangle,
	Package,
	Archive,
	RefreshCw,
	CheckCircle2,
	X,
} from 'lucide-react';

import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Checkbox } from '@/components/ui/checkbox';
import {
	Dialog,
	DialogContent,
	DialogDescription,
	DialogFooter,
	DialogHeader,
	DialogTitle,
	DialogTrigger,
} from '@/components/ui/dialog';
import {
	AlertDialog,
	AlertDialogAction,
	AlertDialogCancel,
	AlertDialogContent,
	AlertDialogDescription,
	AlertDialogFooter,
	AlertDialogHeader,
	AlertDialogTitle,
	AlertDialogTrigger,
} from '@/components/ui/alert-dialog';
import { Progress } from '@/components/ui/progress';

interface ConfirmationDialogProps {
	trigger: React.ReactNode;
	title: string;
	description: string;
	confirmText: string;
	confirmVariant?: 'default' | 'destructive';
	onConfirm: () => void;
}

const ConfirmationDialog = ({
	trigger,
	title,
	description,
	confirmText,
	confirmVariant = 'default',
	onConfirm,
}: ConfirmationDialogProps) => (
	<AlertDialog>
		<AlertDialogTrigger asChild>{trigger}</AlertDialogTrigger>
		<AlertDialogContent>
			<AlertDialogHeader>
				<AlertDialogTitle>{title}</AlertDialogTitle>
				<AlertDialogDescription>{description}</AlertDialogDescription>
			</AlertDialogHeader>
			<AlertDialogFooter>
				<AlertDialogCancel>Cancel</AlertDialogCancel>
				<AlertDialogAction
					onClick={onConfirm}
					className={
						confirmVariant === 'destructive'
							? 'bg-destructive text-destructive-foreground hover:bg-destructive/90'
							: ''
					}
				>
					{confirmText}
				</AlertDialogAction>
			</AlertDialogFooter>
		</AlertDialogContent>
	</AlertDialog>
);

interface DangerConfirmDialogProps {
	trigger: React.ReactNode;
	title: string;
	description: string;
	confirmPhrase: string;
	onConfirm: () => void;
}

const DangerConfirmDialog = ({
	trigger,
	title,
	description,
	confirmPhrase,
	onConfirm,
}: DangerConfirmDialogProps) => {
	const [inputValue, setInputValue] = React.useState('');
	const [open, setOpen] = React.useState(false);

	const handleConfirm = () => {
		if (inputValue === confirmPhrase) {
			onConfirm();
			setOpen(false);
			setInputValue('');
		}
	};

	return (
		<Dialog open={open} onOpenChange={setOpen}>
			<DialogTrigger asChild>{trigger}</DialogTrigger>
			<DialogContent>
				<DialogHeader>
					<div className="flex items-center gap-2 text-destructive">
						<AlertTriangle className="size-5" />
						<DialogTitle>{title}</DialogTitle>
					</div>
					<DialogDescription className="text-left">
						{description}
					</DialogDescription>
				</DialogHeader>
				<div className="space-y-3 py-4">
					<Label>
						Type <span className="font-mono font-bold">{confirmPhrase}</span> to
						confirm
					</Label>
					<Input
						value={inputValue}
						onChange={(e) => setInputValue(e.target.value)}
						placeholder={confirmPhrase}
					/>
				</div>
				<DialogFooter>
					<Button variant="outline" onClick={() => setOpen(false)}>
						Cancel
					</Button>
					<Button
						variant="destructive"
						onClick={handleConfirm}
						disabled={inputValue !== confirmPhrase}
					>
						Delete Permanently
					</Button>
				</DialogFooter>
			</DialogContent>
		</Dialog>
	);
};

interface BulkDeleteDialogProps {
	trigger: React.ReactNode;
	count: number;
	products: { id: string; name: string }[];
	onConfirm: () => void;
}

const BulkDeleteDialog = ({
	trigger,
	count,
	products,
	onConfirm,
}: BulkDeleteDialogProps) => {
	const [acknowledged, setAcknowledged] = React.useState(false);
	const [open, setOpen] = React.useState(false);

	return (
		<Dialog open={open} onOpenChange={setOpen}>
			<DialogTrigger asChild>{trigger}</DialogTrigger>
			<DialogContent>
				<DialogHeader>
					<div className="flex items-center gap-2 text-destructive">
						<Trash2 className="size-5" />
						<DialogTitle>Delete {count} Products</DialogTitle>
					</div>
					<DialogDescription>
						This action cannot be undone. The following products will be
						permanently deleted:
					</DialogDescription>
				</DialogHeader>
				<div className="max-h-48 space-y-2 overflow-y-auto rounded-lg border bg-muted/30 p-3">
					{products.map((product) => (
						<div key={product.id} className="flex items-center gap-2 text-sm">
							<Package className="size-4 text-muted-foreground" />
							{product.name}
						</div>
					))}
				</div>
				<label className="flex cursor-pointer items-start gap-2 rounded-lg border border-destructive/50 bg-destructive/5 p-3">
					<Checkbox
						checked={acknowledged}
						onCheckedChange={(v) => setAcknowledged(!!v)}
						className="mt-0.5"
					/>
					<span className="text-sm">
						I understand that this will permanently delete all {count} products
						and their associated data
					</span>
				</label>
				<DialogFooter>
					<Button variant="outline" onClick={() => setOpen(false)}>
						Cancel
					</Button>
					<Button
						variant="destructive"
						onClick={() => {
							onConfirm();
							setOpen(false);
						}}
						disabled={!acknowledged}
						className="gap-2"
					>
						<Trash2 className="size-4" />
						Delete {count} Products
					</Button>
				</DialogFooter>
			</DialogContent>
		</Dialog>
	);
};

interface ProgressDialogProps {
	isOpen: boolean;
	title: string;
	total: number;
	completed: number;
	onClose: () => void;
}

const ProgressDialog = ({
	isOpen,
	title,
	total,
	completed,
	onClose,
}: ProgressDialogProps) => {
	const percentage = (completed / total) * 100;
	const isComplete = completed >= total;

	return (
		<Dialog open={isOpen}>
			<DialogContent className="sm:max-w-md" hideCloseButton>
				<DialogHeader>
					<DialogTitle className="flex items-center gap-2">
						{isComplete ? (
							<CheckCircle2 className="size-5 text-green-500" />
						) : (
							<RefreshCw className="size-5 animate-spin text-primary" />
						)}
						{title}
					</DialogTitle>
				</DialogHeader>
				<div className="space-y-3 py-4">
					<Progress value={percentage} className="h-2" />
					<div className="flex items-center justify-between text-sm text-muted-foreground">
						<span>{isComplete ? 'Complete!' : 'Processing...'}</span>
						<span>
							{completed} / {total}
						</span>
					</div>
				</div>
				{isComplete && (
					<DialogFooter>
						<Button onClick={onClose}>Done</Button>
					</DialogFooter>
				)}
			</DialogContent>
		</Dialog>
	);
};

export default function Main() {
	const [showProgress, setShowProgress] = React.useState(false);
	const [progress, setProgress] = React.useState(0);

	const sampleProducts = [
		{ id: '1', name: 'Wireless Mouse' },
		{ id: '2', name: 'USB Keyboard' },
		{ id: '3', name: 'Monitor Stand' },
	];

	const handleBulkAction = () => {
		setShowProgress(true);
		setProgress(0);
		const interval = setInterval(() => {
			setProgress((prev) => {
				if (prev >= 3) {
					clearInterval(interval);
					return prev;
				}
				return prev + 1;
			});
		}, 800);
	};

	return (
		<section className="@container" data-theme="dashboard">
			<div className="mx-auto max-w-2xl space-y-6 px-4 py-8 @sm:px-6">
				<div className="flex items-center gap-3">
					<AlertTriangle className="size-5" />
					<h2 className="text-xl font-semibold">Confirmation Modals</h2>
				</div>

				<div className="grid gap-4 @sm:grid-cols-2">
					<ConfirmationDialog
						trigger={
							<Button variant="outline" className="gap-2">
								<Archive className="size-4" />
								Archive Product
							</Button>
						}
						title="Archive Product?"
						description="This product will be moved to the archive and hidden from the catalog. You can restore it later."
						confirmText="Archive"
						onConfirm={() => console.log('Archived')}
					/>

					<ConfirmationDialog
						trigger={
							<Button variant="destructive" className="gap-2">
								<Trash2 className="size-4" />
								Delete Product
							</Button>
						}
						title="Delete Product?"
						description="This action cannot be undone. This will permanently delete the product and all its variants."
						confirmText="Delete"
						confirmVariant="destructive"
						onConfirm={() => console.log('Deleted')}
					/>

					<DangerConfirmDialog
						trigger={
							<Button variant="destructive" className="gap-2">
								<AlertTriangle className="size-4" />
								Permanent Delete
							</Button>
						}
						title="Permanently Delete Product?"
						description="This will permanently delete the product, all variants, images, reviews, and order history. This cannot be undone."
						confirmPhrase="DELETE"
						onConfirm={() => console.log('Permanently deleted')}
					/>

					<BulkDeleteDialog
						trigger={
							<Button variant="destructive" className="gap-2">
								<Trash2 className="size-4" />
								Bulk Delete (3)
							</Button>
						}
						count={3}
						products={sampleProducts}
						onConfirm={handleBulkAction}
					/>
				</div>

				<div className="rounded-lg border bg-muted/30 p-4">
					<h3 className="mb-3 font-medium">Progress Dialog Demo</h3>
					<Button onClick={handleBulkAction}>Start Bulk Operation</Button>
				</div>

				<ProgressDialog
					isOpen={showProgress}
					title={progress >= 3 ? 'Operation Complete' : 'Deleting Products...'}
					total={3}
					completed={progress}
					onClose={() => setShowProgress(false)}
				/>
			</div>
		</section>
	);
}
