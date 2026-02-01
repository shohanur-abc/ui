'use client';

import * as React from 'react';
import {
	FolderTree,
	Check,
	X,
	ChevronRight,
	ChevronDown,
	FolderOpen,
	Folder,
	Package,
	RefreshCw,
} from 'lucide-react';

import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Checkbox } from '@/components/ui/checkbox';
import { Progress } from '@/components/ui/progress';
import {
	Dialog,
	DialogContent,
	DialogFooter,
	DialogHeader,
	DialogTitle,
	DialogTrigger,
} from '@/components/ui/dialog';
import {
	Collapsible,
	CollapsibleContent,
	CollapsibleTrigger,
} from '@/components/ui/collapsible';

interface Category {
	id: string;
	name: string;
	count: number;
	children?: Category[];
}

interface Product {
	id: string;
	name: string;
	currentCategory: string;
}

interface CategoryTreeItemProps {
	category: Category;
	selectedId: string | null;
	onSelect: (id: string) => void;
	depth?: number;
}

const CategoryTreeItem = ({
	category,
	selectedId,
	onSelect,
	depth = 0,
}: CategoryTreeItemProps) => {
	const [isOpen, setIsOpen] = React.useState(false);
	const hasChildren = category.children && category.children.length > 0;
	const isSelected = selectedId === category.id;

	return (
		<div>
			<div
				className={`flex items-center gap-2 rounded-md p-2 transition-colors ${isSelected ? 'bg-primary/10' : 'hover:bg-accent'}`}
				style={{ paddingLeft: `${depth * 16 + 8}px` }}
			>
				{hasChildren ? (
					<button onClick={() => setIsOpen(!isOpen)} className="p-1">
						{isOpen ? (
							<ChevronDown className="size-4" />
						) : (
							<ChevronRight className="size-4" />
						)}
					</button>
				) : (
					<span className="w-6" />
				)}
				{hasChildren ? (
					isOpen ? (
						<FolderOpen className="size-4 text-amber-500" />
					) : (
						<Folder className="size-4 text-amber-500" />
					)
				) : (
					<Folder className="size-4 text-muted-foreground" />
				)}
				<button
					onClick={() => onSelect(category.id)}
					className="flex flex-1 items-center justify-between"
				>
					<span className="font-medium">{category.name}</span>
					<div className="flex items-center gap-2">
						<Badge variant="outline">{category.count}</Badge>
						{isSelected && <Check className="size-4 text-primary" />}
					</div>
				</button>
			</div>
			{hasChildren && isOpen && (
				<div>
					{category.children!.map((child) => (
						<CategoryTreeItem
							key={child.id}
							category={child}
							selectedId={selectedId}
							onSelect={onSelect}
							depth={depth + 1}
						/>
					))}
				</div>
			)}
		</div>
	);
};

interface CategorySelectorProps {
	categories: Category[];
	selectedId: string | null;
	onSelect: (id: string) => void;
}

const CategorySelector = ({
	categories,
	selectedId,
	onSelect,
}: CategorySelectorProps) => (
	<div className="max-h-64 space-y-1 overflow-y-auto rounded-lg border bg-muted/30 p-2">
		{categories.map((category) => (
			<CategoryTreeItem
				key={category.id}
				category={category}
				selectedId={selectedId}
				onSelect={onSelect}
			/>
		))}
	</div>
);

interface ProductSelectorProps {
	products: Product[];
	selectedIds: string[];
	onToggle: (id: string) => void;
	onToggleAll: () => void;
}

const ProductSelector = ({
	products,
	selectedIds,
	onToggle,
	onToggleAll,
}: ProductSelectorProps) => {
	const allSelected = selectedIds.length === products.length;

	return (
		<div className="space-y-2">
			<div className="flex items-center justify-between">
				<span className="text-sm font-medium">
					{selectedIds.length} of {products.length} selected
				</span>
				<Button variant="ghost" size="sm" onClick={onToggleAll}>
					{allSelected ? 'Deselect All' : 'Select All'}
				</Button>
			</div>
			<div className="max-h-48 space-y-1 overflow-y-auto rounded-lg border p-2">
				{products.map((product) => (
					<label
						key={product.id}
						className="flex cursor-pointer items-center gap-3 rounded-md p-2 hover:bg-accent"
					>
						<Checkbox
							checked={selectedIds.includes(product.id)}
							onCheckedChange={() => onToggle(product.id)}
						/>
						<Package className="size-4 text-muted-foreground" />
						<div className="flex-1">
							<p className="font-medium">{product.name}</p>
							<p className="text-xs text-muted-foreground">
								Current: {product.currentCategory}
							</p>
						</div>
					</label>
				))}
			</div>
		</div>
	);
};

interface CategoryAssignModalProps {
	trigger: React.ReactNode;
	products: Product[];
	categories: Category[];
	onAssign: (productIds: string[], categoryId: string) => void;
}

const CategoryAssignModal = ({
	trigger,
	products,
	categories,
	onAssign,
}: CategoryAssignModalProps) => {
	const [open, setOpen] = React.useState(false);
	const [selectedProducts, setSelectedProducts] = React.useState<string[]>([]);
	const [selectedCategory, setSelectedCategory] = React.useState<string | null>(
		null
	);
	const [isApplying, setIsApplying] = React.useState(false);
	const [progress, setProgress] = React.useState(0);

	const toggleProduct = (id: string) => {
		setSelectedProducts((prev) =>
			prev.includes(id) ? prev.filter((p) => p !== id) : [...prev, id]
		);
	};

	const toggleAll = () => {
		setSelectedProducts((prev) =>
			prev.length === products.length ? [] : products.map((p) => p.id)
		);
	};

	const handleAssign = () => {
		if (!selectedCategory) return;
		setIsApplying(true);
		setProgress(0);

		const interval = setInterval(() => {
			setProgress((prev) => {
				if (prev >= 100) {
					clearInterval(interval);
					onAssign(selectedProducts, selectedCategory);
					setIsApplying(false);
					setOpen(false);
					return 100;
				}
				return prev + 20;
			});
		}, 300);
	};

	const getCategoryName = (id: string): string => {
		const findCategory = (cats: Category[]): string | null => {
			for (const cat of cats) {
				if (cat.id === id) return cat.name;
				if (cat.children) {
					const found = findCategory(cat.children);
					if (found) return found;
				}
			}
			return null;
		};
		return findCategory(categories) || '';
	};

	return (
		<Dialog open={open} onOpenChange={setOpen}>
			<DialogTrigger asChild>{trigger}</DialogTrigger>
			<DialogContent className="max-w-xl">
				<DialogHeader>
					<DialogTitle className="flex items-center gap-2">
						<FolderTree className="size-5" />
						Assign Category
					</DialogTitle>
				</DialogHeader>

				<div className="space-y-4">
					<ProductSelector
						products={products}
						selectedIds={selectedProducts}
						onToggle={toggleProduct}
						onToggleAll={toggleAll}
					/>

					<div className="space-y-2">
						<span className="text-sm font-medium">Target Category</span>
						<CategorySelector
							categories={categories}
							selectedId={selectedCategory}
							onSelect={setSelectedCategory}
						/>
					</div>

					{selectedProducts.length > 0 && selectedCategory && (
						<div className="rounded-lg border bg-muted/30 p-3">
							<p className="text-sm">
								<span className="font-medium">{selectedProducts.length}</span>{' '}
								products will be moved to{' '}
								<span className="font-medium">
									{getCategoryName(selectedCategory)}
								</span>
							</p>
						</div>
					)}

					{isApplying && (
						<div className="space-y-2">
							<Progress value={progress} className="h-2" />
							<p className="text-center text-sm text-muted-foreground">
								Assigning categories...
							</p>
						</div>
					)}
				</div>

				<DialogFooter>
					<Button variant="outline" onClick={() => setOpen(false)}>
						Cancel
					</Button>
					<Button
						onClick={handleAssign}
						disabled={
							isApplying ||
							selectedProducts.length === 0 ||
							!selectedCategory
						}
						className="gap-2"
					>
						{isApplying ? (
							<RefreshCw className="size-4 animate-spin" />
						) : (
							<Check className="size-4" />
						)}
						Assign Category
					</Button>
				</DialogFooter>
			</DialogContent>
		</Dialog>
	);
};

export default function Main() {
	const products: Product[] = [
		{ id: '1', name: 'Wireless Mouse', currentCategory: 'Uncategorized' },
		{ id: '2', name: 'USB Keyboard', currentCategory: 'Electronics' },
		{ id: '3', name: 'Monitor Stand', currentCategory: 'Uncategorized' },
		{ id: '4', name: 'Webcam HD', currentCategory: 'Electronics' },
		{ id: '5', name: 'Desk Lamp', currentCategory: 'Home' },
	];

	const categories: Category[] = [
		{
			id: 'electronics',
			name: 'Electronics',
			count: 124,
			children: [
				{ id: 'computers', name: 'Computers', count: 45 },
				{
					id: 'accessories',
					name: 'Accessories',
					count: 67,
					children: [
						{ id: 'keyboards', name: 'Keyboards', count: 23 },
						{ id: 'mice', name: 'Mice', count: 18 },
						{ id: 'monitors', name: 'Monitors', count: 12 },
					],
				},
				{ id: 'audio', name: 'Audio', count: 12 },
			],
		},
		{
			id: 'home',
			name: 'Home & Garden',
			count: 89,
			children: [
				{ id: 'furniture', name: 'Furniture', count: 34 },
				{ id: 'lighting', name: 'Lighting', count: 28 },
				{ id: 'decor', name: 'Decor', count: 27 },
			],
		},
		{ id: 'clothing', name: 'Clothing', count: 67 },
		{ id: 'sports', name: 'Sports', count: 45 },
	];

	return (
		<section className="@container" data-theme="dashboard">
			<div className="mx-auto max-w-2xl space-y-6 px-4 py-8 @sm:px-6">
				<div className="flex items-center gap-3">
					<FolderTree className="size-5" />
					<h2 className="text-xl font-semibold">Bulk Category Assignment</h2>
				</div>

				<div className="rounded-lg border bg-card p-4">
					<CategoryAssignModal
						trigger={
							<Button className="w-full gap-2">
								<FolderTree className="size-4" />
								Assign Categories
							</Button>
						}
						products={products}
						categories={categories}
						onAssign={(ids, cat) =>
							console.log('Assigned', ids, 'to', cat)
						}
					/>
				</div>

				<div className="rounded-lg border bg-muted/30 p-4">
					<h3 className="mb-3 font-medium">Category Tree Preview</h3>
					<CategorySelector
						categories={categories}
						selectedId={null}
						onSelect={() => {}}
					/>
				</div>
			</div>
		</section>
	);
}
