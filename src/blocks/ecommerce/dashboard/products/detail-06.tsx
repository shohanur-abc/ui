'use client';

import * as React from 'react';
import {
	Link2,
	Plus,
	X,
	Search,
	ArrowRight,
	ArrowUpDown,
	Package,
	Sparkles,
} from 'lucide-react';

import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from '@/components/ui/select';
import {
	Tabs,
	TabsContent,
	TabsList,
	TabsTrigger,
} from '@/components/ui/tabs';
import { Separator } from '@/components/ui/separator';

interface RelatedProduct {
	id: string;
	name: string;
	sku: string;
	price: number;
	image: string;
	category: string;
}

interface RelationType {
	id: string;
	label: string;
	description: string;
	products: RelatedProduct[];
}

interface ProductCardProps {
	product: RelatedProduct;
	onRemove: () => void;
}

const ProductCard = ({ product, onRemove }: ProductCardProps) => (
	<div className="flex items-center gap-3 rounded-lg border bg-card p-3">
		<div className="size-12 shrink-0 rounded-md bg-muted" />
		<div className="min-w-0 flex-1">
			<p className="truncate text-sm font-medium">{product.name}</p>
			<p className="text-xs text-muted-foreground">
				{product.sku} • ${product.price.toFixed(2)}
			</p>
		</div>
		<Button variant="ghost" size="icon-sm" onClick={onRemove}>
			<X className="size-4" />
		</Button>
	</div>
);

interface RelationSectionProps {
	relation: RelationType;
	onRemoveProduct: (productId: string) => void;
	onAddProduct: () => void;
}

const RelationSection = ({
	relation,
	onRemoveProduct,
	onAddProduct,
}: RelationSectionProps) => (
	<div className="space-y-3">
		<div className="flex items-center justify-between">
			<div>
				<h4 className="font-medium">{relation.label}</h4>
				<p className="text-sm text-muted-foreground">{relation.description}</p>
			</div>
			<Button variant="outline" size="sm" className="gap-1" onClick={onAddProduct}>
				<Plus className="size-3.5" />
				Add
			</Button>
		</div>
		<div className="grid gap-2 @sm:grid-cols-2">
			{relation.products.map((product) => (
				<ProductCard
					key={product.id}
					product={product}
					onRemove={() => onRemoveProduct(product.id)}
				/>
			))}
		</div>
		{relation.products.length === 0 && (
			<div className="rounded-lg border-2 border-dashed p-6 text-center">
				<Package className="mx-auto mb-2 size-8 text-muted-foreground" />
				<p className="text-sm text-muted-foreground">No products added yet</p>
			</div>
		)}
	</div>
);

interface ProductSearchProps {
	query: string;
	onQueryChange: (query: string) => void;
	results: RelatedProduct[];
	onSelect: (product: RelatedProduct) => void;
	labels: { placeholder: string; noResults: string };
}

const ProductSearch = ({
	query,
	onQueryChange,
	results,
	onSelect,
	labels,
}: ProductSearchProps) => (
	<div className="space-y-3">
		<div className="relative">
			<Search className="absolute left-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" />
			<Input
				value={query}
				onChange={(e) => onQueryChange(e.target.value)}
				placeholder={labels.placeholder}
				className="pl-9"
			/>
		</div>
		{query && (
			<div className="max-h-64 space-y-2 overflow-auto">
				{results.length > 0 ? (
					results.map((product) => (
						<button
							key={product.id}
							onClick={() => onSelect(product)}
							className="flex w-full items-center gap-3 rounded-lg border bg-card p-3 text-left transition-colors hover:bg-muted"
						>
							<div className="size-10 rounded-md bg-muted" />
							<div className="min-w-0 flex-1">
								<p className="truncate text-sm font-medium">{product.name}</p>
								<p className="text-xs text-muted-foreground">
									{product.sku} • {product.category}
								</p>
							</div>
							<p className="font-medium">${product.price.toFixed(2)}</p>
							<Plus className="size-4 text-muted-foreground" />
						</button>
					))
				) : (
					<p className="py-8 text-center text-sm text-muted-foreground">
						{labels.noResults}
					</p>
				)}
			</div>
		)}
	</div>
);

interface AutoSuggestionsProps {
	suggestions: RelatedProduct[];
	onAdd: (product: RelatedProduct) => void;
	labels: { title: string; based: string };
}

const AutoSuggestions = ({
	suggestions,
	onAdd,
	labels,
}: AutoSuggestionsProps) => (
	<div className="rounded-lg border bg-muted/30 p-4">
		<div className="mb-3 flex items-center gap-2">
			<Sparkles className="size-4 text-primary" />
			<h4 className="font-medium">{labels.title}</h4>
		</div>
		<p className="mb-3 text-sm text-muted-foreground">{labels.based}</p>
		<div className="flex flex-wrap gap-2">
			{suggestions.map((product) => (
				<button
					key={product.id}
					onClick={() => onAdd(product)}
					className="flex items-center gap-2 rounded-full border bg-background px-3 py-1 text-sm transition-colors hover:bg-muted"
				>
					<span className="truncate max-w-32">{product.name}</span>
					<Plus className="size-3.5" />
				</button>
			))}
		</div>
	</div>
);

export default function Main() {
	const [activeTab, setActiveTab] = React.useState('related');
	const [searchQuery, setSearchQuery] = React.useState('');

	const relations: RelationType[] = [
		{
			id: 'related',
			label: 'Related Products',
			description: 'Products shown alongside this item',
			products: [
				{ id: '1', name: 'Headphone Stand', sku: 'HS-001', price: 29.99, image: '', category: 'Accessories' },
				{ id: '2', name: 'Carrying Case', sku: 'CC-001', price: 24.99, image: '', category: 'Accessories' },
			],
		},
		{
			id: 'upsell',
			label: 'Upsell Products',
			description: 'Higher-tier products to suggest',
			products: [
				{ id: '3', name: 'Premium Headphones Pro Max', sku: 'WHP-PRO-MAX', price: 349.99, image: '', category: 'Audio' },
			],
		},
		{
			id: 'crosssell',
			label: 'Cross-sell Products',
			description: 'Complementary products to add to cart',
			products: [],
		},
	];

	const searchResults: RelatedProduct[] = [
		{ id: '10', name: 'Replacement Ear Cushions', sku: 'REC-001', price: 19.99, image: '', category: 'Parts' },
		{ id: '11', name: 'Audio Cable 3.5mm', sku: 'AC-001', price: 14.99, image: '', category: 'Cables' },
		{ id: '12', name: 'USB-C Charging Cable', sku: 'UC-001', price: 12.99, image: '', category: 'Cables' },
	];

	const suggestions: RelatedProduct[] = [
		{ id: '20', name: 'DAC/Amp Combo', sku: 'DAC-001', price: 149.99, image: '', category: 'Audio' },
		{ id: '21', name: 'Headphone Amplifier', sku: 'AMP-001', price: 199.99, image: '', category: 'Audio' },
		{ id: '22', name: 'Wireless Adapter', sku: 'WA-001', price: 39.99, image: '', category: 'Accessories' },
	];

	const handleRemoveProduct = (relationId: string, productId: string) => {
		console.log('Remove', productId, 'from', relationId);
	};

	const handleAddProduct = (relationId: string) => {
		console.log('Add to', relationId);
	};

	return (
		<section className="@container" data-theme="dashboard">
			<div className="mx-auto max-w-3xl space-y-6 px-4 py-8 @sm:px-6">
				<div className="flex items-center gap-3">
					<Link2 className="size-5" />
					<h2 className="text-xl font-semibold">Related Products</h2>
				</div>

				<ProductSearch
					query={searchQuery}
					onQueryChange={setSearchQuery}
					results={searchResults}
					onSelect={(product) => console.log('Select', product)}
					labels={{
						placeholder: 'Search products to add...',
						noResults: 'No products found',
					}}
				/>

				<AutoSuggestions
					suggestions={suggestions}
					onAdd={(product) => console.log('Add suggestion', product)}
					labels={{
						title: 'AI Suggestions',
						based: 'Based on purchase history and browsing patterns',
					}}
				/>

				<Separator />

				<div className="space-y-6">
					{relations.map((relation) => (
						<RelationSection
							key={relation.id}
							relation={relation}
							onRemoveProduct={(productId) =>
								handleRemoveProduct(relation.id, productId)
							}
							onAddProduct={() => handleAddProduct(relation.id)}
						/>
					))}
				</div>
			</div>
		</section>
	);
}
