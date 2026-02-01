'use client';

import * as React from 'react';
import {
	Trash2,
	Check,
	X,
	Package,
	RefreshCw,
	AlertTriangle,
	Archive,
	RotateCcw,
	Eye,
} from 'lucide-react';

import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Checkbox } from '@/components/ui/checkbox';
import { Progress } from '@/components/ui/progress';
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
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

interface Product {
	id: string;
	name: string;
	sku: string;
	status: string;
	hasOrders: boolean;
	deletedAt?: string;
	selected: boolean;
}

interface ProductDeleteRowProps {
	product: Product;
	onToggle: () => void;
}

const ProductDeleteRow = ({ product, onToggle }: ProductDeleteRowProps) => (
	<div
		className={`flex items-center gap-3 rounded-lg border p-3 ${product.hasOrders ? 'border-amber-500/50 bg-amber-500/5' : ''}`}
	>
		<Checkbox checked={product.selected} onCheckedChange={onToggle} />
		<Package className="size-4 text-muted-foreground" />
		<div className="flex-1">
			<div className="flex items-center gap-2">
				<p className="font-medium">{product.name}</p>
				{product.hasOrders && (
					<Badge variant="outline" className="gap-1 text-amber-500">
						<AlertTriangle className="size-3" />
						Has Orders
					</Badge>
				)}
			</div>
			<p className="text-xs text-muted-foreground">{product.sku}</p>
		</div>
		<Badge variant={product.status === 'Active' ? 'default' : 'secondary'}>
			{product.status}
		</Badge>
	</div>
);

interface DeletedProductRowProps {
	product: Product;
	onToggle: () => void;
	onRestore: () => void;
}

const DeletedProductRow = ({
	product,
	onToggle,
	onRestore,
}: DeletedProductRowProps) => (
	<div className="flex items-center gap-3 rounded-lg border bg-muted/30 p-3">
		<Checkbox checked={product.selected} onCheckedChange={onToggle} />
		<Archive className="size-4 text-muted-foreground" />
		<div className="flex-1">
			<p className="font-medium">{product.name}</p>
			<p className="text-xs text-muted-foreground">
				Deleted {product.deletedAt}
			</p>
		</div>
		<Button variant="ghost" size="sm" onClick={onRestore} className="gap-1">
			<RotateCcw className="size-4" />
			Restore
		</Button>
	</div>
);

interface BulkDeleteModalProps {
	trigger: React.ReactNode;
	products: Product[];
	onDelete: (productIds: string[], permanent: boolean) => void;
	onRestore: (productIds: string[]) => void;
}

const BulkDeleteModal = ({
	trigger,
	products,
	onDelete,
	onRestore,
}: BulkDeleteModalProps) => {
	const [open, setOpen] = React.useState(false);
	const [productList, setProductList] = React.useState(products);
	const [isProcessing, setIsProcessing] = React.useState(false);
	const [progress, setProgress] = React.useState(0);
	const [confirmText, setConfirmText] = React.useState('');

	const activeProducts = productList.filter((p) => !p.deletedAt);
	const deletedProducts = productList.filter((p) => p.deletedAt);
	const selectedActive = activeProducts.filter((p) => p.selected);
	const selectedDeleted = deletedProducts.filter((p) => p.selected);
	const hasOrdersWarning = selectedActive.some((p) => p.hasOrders);

	const toggleProduct = (id: string) => {
		setProductList((prev) =>
			prev.map((p) => (p.id === id ? { ...p, selected: !p.selected } : p))
		);
	};

	const processAction = (callback: () => void) => {
		setIsProcessing(true);
		setProgress(0);

		const interval = setInterval(() => {
			setProgress((prev) => {
				if (prev >= 100) {
					clearInterval(interval);
					callback();
					setIsProcessing(false);
					return 100;
				}
				return prev + 20;
			});
		}, 300);
	};

	const handleSoftDelete = () => {
		processAction(() => {
			onDelete(
				selectedActive.map((p) => p.id),
				false
			);
		});
	};

	const handlePermanentDelete = () => {
		if (confirmText !== 'DELETE') return;
		processAction(() => {
			onDelete(
				selectedDeleted.map((p) => p.id),
				true
			);
		});
	};

	const handleRestore = () => {
		processAction(() => {
			onRestore(selectedDeleted.map((p) => p.id));
		});
	};

	return (
		<Dialog open={open} onOpenChange={setOpen}>
			<DialogTrigger asChild>{trigger}</DialogTrigger>
			<DialogContent className="max-w-xl">
				<DialogHeader>
					<DialogTitle className="flex items-center gap-2">
						<Trash2 className="size-5" />
						Bulk Delete Operations
					</DialogTitle>
					<DialogDescription>
						Archive or permanently delete products
					</DialogDescription>
				</DialogHeader>

				<Tabs defaultValue="delete">
					<TabsList className="grid w-full grid-cols-2">
						<TabsTrigger value="delete" className="gap-2">
							<Archive className="size-4" />
							Archive ({activeProducts.length})
						</TabsTrigger>
						<TabsTrigger value="trash" className="gap-2">
							<Trash2 className="size-4" />
							Trash ({deletedProducts.length})
						</TabsTrigger>
					</TabsList>

					<TabsContent value="delete" className="mt-4 space-y-4">
						<div className="max-h-48 space-y-2 overflow-y-auto">
							{activeProducts.map((product) => (
								<ProductDeleteRow
									key={product.id}
									product={product}
									onToggle={() => toggleProduct(product.id)}
								/>
							))}
						</div>

						{hasOrdersWarning && (
							<div className="flex items-start gap-2 rounded-lg border border-amber-500/50 bg-amber-500/5 p-3">
								<AlertTriangle className="mt-0.5 size-4 shrink-0 text-amber-500" />
								<p className="text-sm text-amber-600">
									Some selected products have order history. Deleting them will
									preserve order records but hide the products from your catalog.
								</p>
							</div>
						)}

						<div className="flex justify-end gap-2">
							<Button
								onClick={handleSoftDelete}
								disabled={isProcessing || selectedActive.length === 0}
								variant="destructive"
								className="gap-2"
							>
								{isProcessing ? (
									<RefreshCw className="size-4 animate-spin" />
								) : (
									<Archive className="size-4" />
								)}
								Archive {selectedActive.length} Products
							</Button>
						</div>
					</TabsContent>

					<TabsContent value="trash" className="mt-4 space-y-4">
						{deletedProducts.length > 0 ? (
							<>
								<div className="max-h-48 space-y-2 overflow-y-auto">
									{deletedProducts.map((product) => (
										<DeletedProductRow
											key={product.id}
											product={product}
											onToggle={() => toggleProduct(product.id)}
											onRestore={() => {
												onRestore([product.id]);
											}}
										/>
									))}
								</div>

								{selectedDeleted.length > 0 && (
									<div className="space-y-3 rounded-lg border border-destructive/50 bg-destructive/5 p-3">
										<p className="text-sm font-medium text-destructive">
											Permanent Deletion
										</p>
										<p className="text-sm text-muted-foreground">
											Type <span className="font-bold">DELETE</span> to
											permanently remove {selectedDeleted.length} products:
										</p>
										<Input
											value={confirmText}
											onChange={(e) => setConfirmText(e.target.value)}
											placeholder="DELETE"
										/>
									</div>
								)}

								<div className="flex justify-between">
									<Button
										onClick={handleRestore}
										disabled={isProcessing || selectedDeleted.length === 0}
										variant="outline"
										className="gap-2"
									>
										<RotateCcw className="size-4" />
										Restore Selected
									</Button>
									<Button
										onClick={handlePermanentDelete}
										disabled={
											isProcessing ||
											selectedDeleted.length === 0 ||
											confirmText !== 'DELETE'
										}
										variant="destructive"
										className="gap-2"
									>
										{isProcessing ? (
											<RefreshCw className="size-4 animate-spin" />
										) : (
											<Trash2 className="size-4" />
										)}
										Delete Permanently
									</Button>
								</div>
							</>
						) : (
							<div className="py-8 text-center text-muted-foreground">
								<Archive className="mx-auto mb-2 size-12 opacity-30" />
								<p>No archived products</p>
							</div>
						)}
					</TabsContent>
				</Tabs>

				{isProcessing && (
					<div className="space-y-2">
						<Progress value={progress} className="h-2" />
						<p className="text-center text-sm text-muted-foreground">
							Processing...
						</p>
					</div>
				)}
			</DialogContent>
		</Dialog>
	);
};

export default function Main() {
	const products: Product[] = [
		{ id: '1', name: 'Wireless Mouse', sku: 'WM-001', status: 'Active', hasOrders: true, selected: false },
		{ id: '2', name: 'USB Keyboard', sku: 'KB-001', status: 'Active', hasOrders: false, selected: false },
		{ id: '3', name: 'Monitor Stand', sku: 'MS-001', status: 'Draft', hasOrders: false, selected: false },
		{ id: '4', name: 'Old Webcam', sku: 'WC-001', status: 'Archived', hasOrders: true, deletedAt: '3 days ago', selected: false },
		{ id: '5', name: 'Discontinued Lamp', sku: 'DL-001', status: 'Archived', hasOrders: false, deletedAt: '1 week ago', selected: false },
	];

	return (
		<section className="@container" data-theme="dashboard">
			<div className="mx-auto max-w-2xl space-y-6 px-4 py-8 @sm:px-6">
				<div className="flex items-center gap-3">
					<Trash2 className="size-5" />
					<h2 className="text-xl font-semibold">Bulk Delete Operations</h2>
				</div>

				<BulkDeleteModal
					trigger={
						<Button variant="destructive" className="w-full gap-2">
							<Trash2 className="size-4" />
							Manage Deleted Products
						</Button>
					}
					products={products}
					onDelete={(ids, permanent) =>
						console.log(permanent ? 'Permanently deleted' : 'Archived', ids)
					}
					onRestore={(ids) => console.log('Restored', ids)}
				/>
			</div>
		</section>
	);
}
