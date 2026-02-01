'use client';

import * as React from 'react';
import {
	FolderOpen,
	Plus,
	Tag,
	ArrowRight,
	Settings,
} from 'lucide-react';

import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';

interface CategoryCardProps {
	name: string;
	count: number;
	onClick: () => void;
}

const CategoryCard = ({ name, count, onClick }: CategoryCardProps) => (
	<button
		onClick={onClick}
		className="flex items-center justify-between rounded-lg border p-4 text-left transition-colors hover:bg-accent"
	>
		<div className="flex items-center gap-3">
			<Tag className="size-5 text-muted-foreground" />
			<span className="font-medium">{name}</span>
		</div>
		<div className="flex items-center gap-2">
			<Badge variant="secondary">{count}</Badge>
			<ArrowRight className="size-4 text-muted-foreground" />
		</div>
	</button>
);

interface EmptyCategoryStateProps {
	categoryName: string;
	onAddProduct: () => void;
	onMoveProducts: () => void;
	onEditCategory: () => void;
}

const EmptyCategoryState = ({
	categoryName,
	onAddProduct,
	onMoveProducts,
	onEditCategory,
}: EmptyCategoryStateProps) => (
	<div className="flex flex-col items-center justify-center rounded-lg border-2 border-dashed bg-muted/30 px-6 py-12 text-center">
		<div className="mb-4 flex size-16 items-center justify-center rounded-full bg-muted">
			<FolderOpen className="size-8 text-muted-foreground" />
		</div>
		<h3 className="mb-2 text-lg font-semibold">
			No Products in "{categoryName}"
		</h3>
		<p className="mb-6 max-w-sm text-muted-foreground">
			This category is empty. Add products to this category or move existing
			products here.
		</p>
		<div className="flex flex-wrap justify-center gap-3">
			<Button onClick={onAddProduct} className="gap-2">
				<Plus className="size-4" />
				Add Product
			</Button>
			<Button variant="outline" onClick={onMoveProducts} className="gap-2">
				Move Products Here
			</Button>
			<Button variant="ghost" onClick={onEditCategory} className="gap-2">
				<Settings className="size-4" />
				Edit Category
			</Button>
		</div>
	</div>
);

interface OtherCategoriesProps {
	categories: { name: string; count: number }[];
	onSelect: (name: string) => void;
}

const OtherCategories = ({
	categories,
	onSelect,
}: OtherCategoriesProps) => (
	<div className="rounded-lg border bg-card p-4">
		<h4 className="mb-3 font-medium">Other Categories with Products</h4>
		<div className="space-y-2">
			{categories.map((cat) => (
				<CategoryCard
					key={cat.name}
					name={cat.name}
					count={cat.count}
					onClick={() => onSelect(cat.name)}
				/>
			))}
		</div>
	</div>
);

export default function Main() {
	const [selectedCategory] = React.useState('New Arrivals');
	const otherCategories = [
		{ name: 'Electronics', count: 124 },
		{ name: 'Clothing', count: 89 },
		{ name: 'Home & Garden', count: 67 },
		{ name: 'Sports', count: 45 },
	];

	return (
		<section className="@container" data-theme="dashboard">
			<div className="mx-auto max-w-2xl space-y-6 px-4 py-8 @sm:px-6">
				<div className="flex items-center gap-2">
					<Tag className="size-5" />
					<h2 className="text-xl font-semibold">{selectedCategory}</h2>
					<Badge variant="outline">0 products</Badge>
				</div>

				<EmptyCategoryState
					categoryName={selectedCategory}
					onAddProduct={() => console.log('Add product')}
					onMoveProducts={() => console.log('Move products')}
					onEditCategory={() => console.log('Edit category')}
				/>

				<OtherCategories
					categories={otherCategories}
					onSelect={(name) => console.log('Selected:', name)}
				/>
			</div>
		</section>
	);
}
