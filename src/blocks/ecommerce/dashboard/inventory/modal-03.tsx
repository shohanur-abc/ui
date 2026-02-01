'use client';

import * as React from 'react';
import { Package, AlertTriangle, X, Trash2, Check, Info } from 'lucide-react';

import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
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
import {
	Dialog,
	DialogContent,
	DialogDescription,
	DialogFooter,
	DialogHeader,
	DialogTitle,
} from '@/components/ui/dialog';
import { Checkbox } from '@/components/ui/checkbox';
import { Label } from '@/components/ui/label';

type BulkDeleteModalProps = {
	items: { id: string; name: string; sku: string }[];
	open: boolean;
	onOpenChange: (open: boolean) => void;
	onConfirm: () => void;
};

const BulkDeleteModal = ({
	items,
	open,
	onOpenChange,
	onConfirm,
}: BulkDeleteModalProps) => {
	const [confirmed, setConfirmed] = React.useState(false);

	return (
		<AlertDialog open={open} onOpenChange={onOpenChange}>
			<AlertDialogContent>
				<AlertDialogHeader>
					<AlertDialogTitle className="flex items-center gap-2">
						<AlertTriangle className="size-5 text-destructive" />
						Delete {items.length} Products?
					</AlertDialogTitle>
					<AlertDialogDescription>
						This action cannot be undone. The following products will be
						permanently deleted:
					</AlertDialogDescription>
				</AlertDialogHeader>
				<div className="my-4 max-h-48 space-y-2 overflow-y-auto rounded-lg border p-3">
					{items.map((item) => (
						<div key={item.id} className="flex items-center gap-3 py-1">
							<Package className="size-4 text-muted-foreground" />
							<div className="flex-1">
								<p className="text-sm font-medium">{item.name}</p>
								<p className="text-xs text-muted-foreground">{item.sku}</p>
							</div>
						</div>
					))}
				</div>
				<div className="flex items-start space-x-2 rounded-lg border border-destructive/30 bg-destructive/5 p-3">
					<Checkbox
						id="confirm-delete"
						checked={confirmed}
						onCheckedChange={(c) => setConfirmed(!!c)}
					/>
					<Label htmlFor="confirm-delete" className="text-sm leading-relaxed">
						I understand this action is irreversible and all associated data
						will be lost.
					</Label>
				</div>
				<AlertDialogFooter>
					<AlertDialogCancel onClick={() => setConfirmed(false)}>
						Cancel
					</AlertDialogCancel>
					<AlertDialogAction
						onClick={onConfirm}
						disabled={!confirmed}
						className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
					>
						<Trash2 className="mr-2 size-4" />
						Delete All
					</AlertDialogAction>
				</AlertDialogFooter>
			</AlertDialogContent>
		</AlertDialog>
	);
};

type SuccessModalProps = {
	title: string;
	message: string;
	open: boolean;
	onOpenChange: (open: boolean) => void;
};

const SuccessModal = ({
	title,
	message,
	open,
	onOpenChange,
}: SuccessModalProps) => (
	<Dialog open={open} onOpenChange={onOpenChange}>
		<DialogContent className="text-center max-w-sm">
			<div className="mx-auto flex size-16 items-center justify-center rounded-full bg-emerald-500/10">
				<Check className="size-8 text-emerald-500" />
			</div>
			<DialogHeader className="text-center">
				<DialogTitle>{title}</DialogTitle>
				<DialogDescription>{message}</DialogDescription>
			</DialogHeader>
			<DialogFooter className="sm:justify-center">
				<Button onClick={() => onOpenChange(false)}>Continue</Button>
			</DialogFooter>
		</DialogContent>
	</Dialog>
);

type InfoModalProps = {
	title: string;
	content: React.ReactNode;
	open: boolean;
	onOpenChange: (open: boolean) => void;
};

const InfoModal = ({ title, content, open, onOpenChange }: InfoModalProps) => (
	<Dialog open={open} onOpenChange={onOpenChange}>
		<DialogContent>
			<DialogHeader>
				<DialogTitle className="flex items-center gap-2">
					<Info className="size-5 text-primary" />
					{title}
				</DialogTitle>
			</DialogHeader>
			<div className="py-4">{content}</div>
			<DialogFooter>
				<Button variant="outline" onClick={() => onOpenChange(false)}>
					Close
				</Button>
			</DialogFooter>
		</DialogContent>
	</Dialog>
);

export default function Main() {
	const [deleteOpen, setDeleteOpen] = React.useState(false);
	const [successOpen, setSuccessOpen] = React.useState(false);
	const [infoOpen, setInfoOpen] = React.useState(false);

	const selectedItems = [
		{ id: '1', name: 'Wireless Earbuds Pro', sku: 'WEP-001' },
		{ id: '2', name: 'USB-C Fast Charger', sku: 'UFC-001' },
		{ id: '3', name: 'Phone Case Premium', sku: 'PCP-001' },
	];

	return (
		<section className="@container" data-theme="dashboard">
			<div className="mx-auto max-w-7xl px-4 py-8 @sm:px-6 @md:py-10 @2xl:px-8">
				<div className="mb-6">
					<h2 className="text-xl font-semibold @lg:text-2xl">Modal Examples</h2>
					<p className="text-sm text-muted-foreground">
						Confirmation and feedback dialogs
					</p>
				</div>
				<div className="flex flex-wrap gap-4">
					<Button variant="destructive" onClick={() => setDeleteOpen(true)}>
						<Trash2 className="mr-2 size-4" />
						Bulk Delete ({selectedItems.length})
					</Button>
					<Button variant="default" onClick={() => setSuccessOpen(true)}>
						<Check className="mr-2 size-4" />
						Show Success
					</Button>
					<Button variant="outline" onClick={() => setInfoOpen(true)}>
						<Info className="mr-2 size-4" />
						Show Info
					</Button>
				</div>

				<BulkDeleteModal
					items={selectedItems}
					open={deleteOpen}
					onOpenChange={setDeleteOpen}
					onConfirm={() => {
						setDeleteOpen(false);
						setSuccessOpen(true);
					}}
				/>

				<SuccessModal
					title="Products Deleted"
					message={`${selectedItems.length} products have been successfully removed from inventory.`}
					open={successOpen}
					onOpenChange={setSuccessOpen}
				/>

				<InfoModal
					title="Inventory Tips"
					content={
						<div className="space-y-3 text-sm text-muted-foreground">
							<p>• Keep safety stock levels updated to avoid stockouts</p>
							<p>• Regular cycle counts improve inventory accuracy</p>
							<p>• Set up alerts for low stock and reorder points</p>
							<p>• Review dead stock quarterly to optimize warehouse space</p>
						</div>
					}
					open={infoOpen}
					onOpenChange={setInfoOpen}
				/>
			</div>
		</section>
	);
}
