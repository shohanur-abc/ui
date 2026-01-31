'use client';

import * as React from 'react';
import {
	X,
	Eye,
	EyeOff,
	CheckCircle2,
	Loader2,
} from 'lucide-react';

import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import {
	Dialog,
	DialogContent,
	DialogDescription,
	DialogFooter,
	DialogHeader,
	DialogTitle,
} from '@/components/ui/dialog';
import { Progress } from '@/components/ui/progress';

interface Product {
	id: string;
	name: string;
	sku: string;
	price: number;
	status: 'active' | 'draft' | 'archived';
}

interface DeleteConfirmModalProps {
	isOpen: boolean;
	onClose: () => void;
	onConfirm: () => void;
	product: Product | null;
	labels: {
		title: string;
		description: string;
		warning: string;
		cancel: string;
		confirm: string;
	};
}

const DeleteConfirmModal = ({
	isOpen,
	onClose,
	onConfirm,
	product,
	labels,
}: DeleteConfirmModalProps) => {
	const [isDeleting, setIsDeleting] = React.useState(false);

	const handleConfirm = () => {
		setIsDeleting(true);
		setTimeout(() => {
			setIsDeleting(false);
			onConfirm();
			onClose();
		}, 1500);
	};

	return (
		<Dialog open={isOpen} onOpenChange={onClose}>
			<DialogContent className="max-w-md">
				<DialogHeader>
					<DialogTitle className="text-destructive">{labels.title}</DialogTitle>
					<DialogDescription>{labels.description}</DialogDescription>
				</DialogHeader>

				{product && (
					<div className="rounded-lg border bg-muted/30 p-4">
						<div className="flex items-center gap-3">
							<div className="size-12 rounded-md bg-muted" />
							<div>
								<p className="font-medium">{product.name}</p>
								<p className="text-sm text-muted-foreground">{product.sku}</p>
							</div>
						</div>
					</div>
				)}

				<p className="text-sm text-amber-500">{labels.warning}</p>

				<DialogFooter>
					<Button variant="outline" onClick={onClose} disabled={isDeleting}>
						{labels.cancel}
					</Button>
					<Button
						variant="destructive"
						onClick={handleConfirm}
						disabled={isDeleting}
						className="gap-2"
					>
						{isDeleting && <Loader2 className="size-4 animate-spin" />}
						{labels.confirm}
					</Button>
				</DialogFooter>
			</DialogContent>
		</Dialog>
	);
};

interface StatusChangeModalProps {
	isOpen: boolean;
	onClose: () => void;
	onConfirm: (status: 'active' | 'draft' | 'archived') => void;
	product: Product | null;
	targetStatus: 'active' | 'draft' | 'archived';
	labels: {
		publish: { title: string; description: string };
		unpublish: { title: string; description: string };
		archive: { title: string; description: string };
		cancel: string;
		confirm: string;
	};
}

const StatusChangeModal = ({
	isOpen,
	onClose,
	onConfirm,
	product,
	targetStatus,
	labels,
}: StatusChangeModalProps) => {
	const [isChanging, setIsChanging] = React.useState(false);

	const config = {
		active: { ...labels.publish, icon: Eye, color: 'text-emerald-500' },
		draft: { ...labels.unpublish, icon: EyeOff, color: 'text-amber-500' },
		archived: { ...labels.archive, icon: X, color: 'text-muted-foreground' },
	};

	const { title, description, icon: Icon, color } = config[targetStatus];

	const handleConfirm = () => {
		setIsChanging(true);
		setTimeout(() => {
			setIsChanging(false);
			onConfirm(targetStatus);
			onClose();
		}, 1000);
	};

	return (
		<Dialog open={isOpen} onOpenChange={onClose}>
			<DialogContent className="max-w-md">
				<DialogHeader>
					<DialogTitle className="flex items-center gap-2">
						<Icon className={`size-5 ${color}`} />
						{title}
					</DialogTitle>
					<DialogDescription>{description}</DialogDescription>
				</DialogHeader>

				{product && (
					<div className="rounded-lg border bg-muted/30 p-4">
						<div className="flex items-center gap-3">
							<div className="size-12 rounded-md bg-muted" />
							<div className="flex-1">
								<p className="font-medium">{product.name}</p>
								<p className="text-sm text-muted-foreground">{product.sku}</p>
							</div>
							<Badge
								variant="secondary"
								className={
									product.status === 'active'
										? 'bg-emerald-500/10 text-emerald-500'
										: product.status === 'draft'
											? 'bg-amber-500/10 text-amber-500'
											: ''
								}
							>
								{product.status}
							</Badge>
						</div>
					</div>
				)}

				<DialogFooter>
					<Button variant="outline" onClick={onClose} disabled={isChanging}>
						{labels.cancel}
					</Button>
					<Button onClick={handleConfirm} disabled={isChanging} className="gap-2">
						{isChanging && <Loader2 className="size-4 animate-spin" />}
						{labels.confirm}
					</Button>
				</DialogFooter>
			</DialogContent>
		</Dialog>
	);
};

interface SuccessModalProps {
	isOpen: boolean;
	onClose: () => void;
	message: string;
	subMessage?: string;
}

const SuccessModal = ({
	isOpen,
	onClose,
	message,
	subMessage,
}: SuccessModalProps) => (
	<Dialog open={isOpen} onOpenChange={onClose}>
		<DialogContent className="max-w-sm text-center">
			<div className="mx-auto mb-4 flex size-16 items-center justify-center rounded-full bg-emerald-500/10">
				<CheckCircle2 className="size-8 text-emerald-500" />
			</div>
			<DialogTitle>{message}</DialogTitle>
			{subMessage && (
				<DialogDescription>{subMessage}</DialogDescription>
			)}
			<Button onClick={onClose} className="w-full">
				Continue
			</Button>
		</DialogContent>
	</Dialog>
);

interface ProgressModalProps {
	isOpen: boolean;
	title: string;
	current: number;
	total: number;
}

const ProgressModal = ({
	isOpen,
	title,
	current,
	total,
}: ProgressModalProps) => {
	const percent = (current / total) * 100;

	return (
		<Dialog open={isOpen}>
			<DialogContent className="max-w-sm" onInteractOutside={(e) => e.preventDefault()}>
				<DialogHeader>
					<DialogTitle className="flex items-center gap-2">
						<Loader2 className="size-5 animate-spin" />
						{title}
					</DialogTitle>
				</DialogHeader>
				<div className="space-y-2">
					<Progress value={percent} />
					<p className="text-center text-sm text-muted-foreground">
						{current} of {total} completed
					</p>
				</div>
			</DialogContent>
		</Dialog>
	);
};

export default function Main() {
	const [deleteModalOpen, setDeleteModalOpen] = React.useState(false);
	const [statusModalOpen, setStatusModalOpen] = React.useState(false);
	const [successModalOpen, setSuccessModalOpen] = React.useState(false);
	const [progressModalOpen, setProgressModalOpen] = React.useState(false);
	const [progressCurrent, setProgressCurrent] = React.useState(0);

	const sampleProduct: Product = {
		id: '1',
		name: 'Premium Wireless Headphones',
		sku: 'WHP-PRO-001',
		price: 199.99,
		status: 'active',
	};

	const startProgress = () => {
		setProgressModalOpen(true);
		setProgressCurrent(0);
		const interval = setInterval(() => {
			setProgressCurrent((prev) => {
				if (prev >= 10) {
					clearInterval(interval);
					setProgressModalOpen(false);
					setSuccessModalOpen(true);
					return 10;
				}
				return prev + 1;
			});
		}, 300);
	};

	return (
		<section className="@container" data-theme="dashboard">
			<div className="mx-auto max-w-2xl space-y-6 px-4 py-8 @sm:px-6">
				<h2 className="text-xl font-semibold">Modal Components</h2>

				<div className="grid gap-4 @sm:grid-cols-2">
					<div className="rounded-lg border bg-card p-4">
						<h3 className="mb-3 font-medium">Delete Confirmation</h3>
						<p className="mb-4 text-sm text-muted-foreground">
							Confirms destructive actions with product preview
						</p>
						<Button variant="destructive" onClick={() => setDeleteModalOpen(true)}>
							Open Delete Modal
						</Button>
					</div>

					<div className="rounded-lg border bg-card p-4">
						<h3 className="mb-3 font-medium">Status Change</h3>
						<p className="mb-4 text-sm text-muted-foreground">
							Publish, unpublish, or archive products
						</p>
						<Button variant="outline" onClick={() => setStatusModalOpen(true)}>
							Open Status Modal
						</Button>
					</div>

					<div className="rounded-lg border bg-card p-4">
						<h3 className="mb-3 font-medium">Success Feedback</h3>
						<p className="mb-4 text-sm text-muted-foreground">
							Shows completion of an action
						</p>
						<Button onClick={() => setSuccessModalOpen(true)}>
							Open Success Modal
						</Button>
					</div>

					<div className="rounded-lg border bg-card p-4">
						<h3 className="mb-3 font-medium">Progress Indicator</h3>
						<p className="mb-4 text-sm text-muted-foreground">
							Shows bulk operation progress
						</p>
						<Button onClick={startProgress}>
							Start Progress
						</Button>
					</div>
				</div>

				<DeleteConfirmModal
					isOpen={deleteModalOpen}
					onClose={() => setDeleteModalOpen(false)}
					onConfirm={() => console.log('Deleted')}
					product={sampleProduct}
					labels={{
						title: 'Delete Product',
						description: 'Are you sure you want to delete this product?',
						warning: 'This action cannot be undone. The product will be permanently removed.',
						cancel: 'Cancel',
						confirm: 'Delete Product',
					}}
				/>

				<StatusChangeModal
					isOpen={statusModalOpen}
					onClose={() => setStatusModalOpen(false)}
					onConfirm={(status) => console.log('Changed to', status)}
					product={sampleProduct}
					targetStatus="draft"
					labels={{
						publish: { title: 'Publish Product', description: 'Make this product visible to customers' },
						unpublish: { title: 'Unpublish Product', description: 'Hide this product from your store' },
						archive: { title: 'Archive Product', description: 'Move this product to archive' },
						cancel: 'Cancel',
						confirm: 'Confirm',
					}}
				/>

				<SuccessModal
					isOpen={successModalOpen}
					onClose={() => setSuccessModalOpen(false)}
					message="Product Created Successfully!"
					subMessage="Your new product is now live in your store."
				/>

				<ProgressModal
					isOpen={progressModalOpen}
					title="Processing Products..."
					current={progressCurrent}
					total={10}
				/>
			</div>
		</section>
	);
}
