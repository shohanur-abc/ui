'use client';

import * as React from 'react';
import { Tag, Plus, X, Check, Search, Sparkles } from 'lucide-react';

import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Checkbox } from '@/components/ui/checkbox';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Separator } from '@/components/ui/separator';

interface ExistingTag {
	id: string;
	name: string;
	color: string;
	count: number;
}

interface ProductWithTags {
	id: string;
	name: string;
	sku: string;
	currentTags: string[];
}

interface TagBadgeProps {
	tag: ExistingTag;
	isSelected: boolean;
	onToggle: () => void;
}

const TagBadge = ({ tag, isSelected, onToggle }: TagBadgeProps) => (
	<button
		onClick={onToggle}
		className={`inline-flex items-center gap-1.5 rounded-full border px-3 py-1 text-sm transition-colors ${isSelected ? 'border-primary bg-primary text-primary-foreground' : 'hover:bg-muted'}`}
	>
		<div className={`size-2 rounded-full ${tag.color}`} />
		{tag.name}
		<span className="text-xs opacity-70">({tag.count})</span>
		{isSelected && <Check className="size-3" />}
	</button>
);

interface TagSelectorProps {
	tags: ExistingTag[];
	selected: string[];
	onToggle: (tagId: string) => void;
	searchQuery: string;
	onSearchChange: (query: string) => void;
}

const TagSelector = ({
	tags,
	selected,
	onToggle,
	searchQuery,
	onSearchChange,
}: TagSelectorProps) => {
	const filteredTags = tags.filter((tag) =>
		tag.name.toLowerCase().includes(searchQuery.toLowerCase()),
	);

	return (
		<div className="space-y-4">
			<div className="relative">
				<Search className="absolute left-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" />
				<Input
					value={searchQuery}
					onChange={(e) => onSearchChange(e.target.value)}
					placeholder="Search tags..."
					className="pl-9"
				/>
			</div>
			<div className="flex flex-wrap gap-2">
				{filteredTags.map((tag) => (
					<TagBadge
						key={tag.id}
						tag={tag}
						isSelected={selected.includes(tag.id)}
						onToggle={() => onToggle(tag.id)}
					/>
				))}
			</div>
		</div>
	);
};

interface NewTagInputProps {
	onAdd: (name: string, color: string) => void;
	labels: { placeholder: string; add: string };
}

const NewTagInput = ({ onAdd, labels }: NewTagInputProps) => {
	const [name, setName] = React.useState('');
	const [color, setColor] = React.useState('bg-blue-500');

	const colors = [
		'bg-red-500',
		'bg-orange-500',
		'bg-amber-500',
		'bg-emerald-500',
		'bg-blue-500',
		'bg-purple-500',
		'bg-pink-500',
	];

	const handleAdd = () => {
		if (name.trim()) {
			onAdd(name, color);
			setName('');
		}
	};

	return (
		<div className="space-y-3 rounded-lg border bg-muted/30 p-4">
			<div className="flex gap-2">
				<Input
					value={name}
					onChange={(e) => setName(e.target.value)}
					placeholder={labels.placeholder}
					className="flex-1"
					onKeyDown={(e) => e.key === 'Enter' && handleAdd()}
				/>
				<Button onClick={handleAdd} disabled={!name.trim()} className="gap-1.5">
					<Plus className="size-4" />
					{labels.add}
				</Button>
			</div>
			<div className="flex items-center gap-2">
				<span className="text-sm text-muted-foreground">Color:</span>
				{colors.map((c) => (
					<button
						key={c}
						onClick={() => setColor(c)}
						className={`size-6 rounded-full ${c} transition-transform ${color === c ? 'scale-125 ring-2 ring-offset-2 ring-offset-background' : 'hover:scale-110'}`}
					/>
				))}
			</div>
		</div>
	);
};

interface ProductTagPreviewProps {
	product: ProductWithTags;
	addTags: string[];
	removeTags: string[];
	allTags: ExistingTag[];
}

const ProductTagPreview = ({
	product,
	addTags,
	removeTags,
	allTags,
}: ProductTagPreviewProps) => {
	const finalTags = [
		...product.currentTags.filter((t) => !removeTags.includes(t)),
		...addTags.filter((t) => !product.currentTags.includes(t)),
	];

	const getTag = (id: string) => allTags.find((t) => t.id === id);

	return (
		<div className="rounded-lg border bg-card p-3">
			<div className="flex items-center gap-3">
				<div className="size-10 rounded-md bg-muted" />
				<div className="min-w-0 flex-1">
					<p className="truncate text-sm font-medium">{product.name}</p>
					<p className="text-xs text-muted-foreground">{product.sku}</p>
				</div>
			</div>
			<div className="mt-3 flex flex-wrap gap-1.5">
				{finalTags.map((tagId) => {
					const tag = getTag(tagId);
					if (!tag) return null;
					const isNew = addTags.includes(tagId);
					return (
						<Badge
							key={tagId}
							variant="secondary"
							className={`gap-1 ${isNew ? 'ring-2 ring-primary ring-offset-1' : ''}`}
						>
							<div className={`size-2 rounded-full ${tag.color}`} />
							{tag.name}
							{isNew && <Sparkles className="size-3 text-primary" />}
						</Badge>
					);
				})}
				{removeTags
					.filter((t) => product.currentTags.includes(t))
					.map((tagId) => {
						const tag = getTag(tagId);
						if (!tag) return null;
						return (
							<Badge
								key={tagId}
								variant="outline"
								className="gap-1 line-through opacity-50"
							>
								<div className={`size-2 rounded-full ${tag.color}`} />
								{tag.name}
							</Badge>
						);
					})}
			</div>
		</div>
	);
};

export default function Main() {
	const [activeTab, setActiveTab] = React.useState('add');
	const [searchQuery, setSearchQuery] = React.useState('');
	const [selectedAddTags, setSelectedAddTags] = React.useState<string[]>([
		'sale',
	]);
	const [selectedRemoveTags, setSelectedRemoveTags] = React.useState<string[]>(
		[],
	);

	const tags: ExistingTag[] = [
		{ id: 'bestseller', name: 'Bestseller', color: 'bg-amber-500', count: 45 },
		{ id: 'sale', name: 'Sale', color: 'bg-red-500', count: 23 },
		{ id: 'new', name: 'New Arrival', color: 'bg-emerald-500', count: 67 },
		{ id: 'featured', name: 'Featured', color: 'bg-purple-500', count: 12 },
		{ id: 'clearance', name: 'Clearance', color: 'bg-orange-500', count: 8 },
		{ id: 'limited', name: 'Limited Edition', color: 'bg-blue-500', count: 5 },
		{ id: 'eco', name: 'Eco-Friendly', color: 'bg-emerald-500', count: 34 },
		{ id: 'premium', name: 'Premium', color: 'bg-purple-500', count: 56 },
	];

	const products: ProductWithTags[] = [
		{
			id: '1',
			name: 'Wireless Headphones Pro',
			sku: 'WHP-001',
			currentTags: ['bestseller', 'premium'],
		},
		{
			id: '2',
			name: 'Mechanical Keyboard RGB',
			sku: 'MKB-002',
			currentTags: ['new', 'featured'],
		},
		{
			id: '3',
			name: 'Gaming Mouse Elite',
			sku: 'GME-003',
			currentTags: ['sale'],
		},
		{ id: '4', name: 'USB-C Hub 7-in-1', sku: 'UCH-004', currentTags: ['eco'] },
	];

	const toggleAddTag = (tagId: string) => {
		setSelectedAddTags((prev) =>
			prev.includes(tagId) ? prev.filter((t) => t !== tagId) : [...prev, tagId],
		);
	};

	const toggleRemoveTag = (tagId: string) => {
		setSelectedRemoveTags((prev) =>
			prev.includes(tagId) ? prev.filter((t) => t !== tagId) : [...prev, tagId],
		);
	};

	const handleAddNewTag = (name: string, color: string) => {
		console.log('Add new tag:', name, color);
	};

	return (
		<section className="@container" data-theme="dashboard">
			<div className="mx-auto max-w-2xl space-y-6 px-4 py-8 @sm:px-6">
				<div className="rounded-lg border bg-card p-6">
					<div className="mb-4 flex items-center gap-2">
						<Tag className="size-5" />
						<h2 className="font-semibold">Bulk Tag Management</h2>
					</div>
					<p className="mb-6 text-sm text-muted-foreground">
						Add or remove tags from {products.length} selected products
					</p>

					<Tabs value={activeTab} onValueChange={setActiveTab}>
						<TabsList className="grid w-full grid-cols-2">
							<TabsTrigger value="add" className="gap-1.5">
								<Plus className="size-3.5" />
								Add Tags
								{selectedAddTags.length > 0 && (
									<Badge variant="secondary" className="ml-1">
										{selectedAddTags.length}
									</Badge>
								)}
							</TabsTrigger>
							<TabsTrigger value="remove" className="gap-1.5">
								<X className="size-3.5" />
								Remove Tags
								{selectedRemoveTags.length > 0 && (
									<Badge variant="secondary" className="ml-1">
										{selectedRemoveTags.length}
									</Badge>
								)}
							</TabsTrigger>
						</TabsList>
						<TabsContent value="add" className="mt-4 space-y-4">
							<TagSelector
								tags={tags}
								selected={selectedAddTags}
								onToggle={toggleAddTag}
								searchQuery={searchQuery}
								onSearchChange={setSearchQuery}
							/>
							<Separator />
							<NewTagInput
								onAdd={handleAddNewTag}
								labels={{ placeholder: 'Create new tag...', add: 'Add' }}
							/>
						</TabsContent>
						<TabsContent value="remove" className="mt-4">
							<TagSelector
								tags={tags}
								selected={selectedRemoveTags}
								onToggle={toggleRemoveTag}
								searchQuery={searchQuery}
								onSearchChange={setSearchQuery}
							/>
						</TabsContent>
					</Tabs>
				</div>

				<div className="space-y-3">
					<h3 className="font-medium">Preview Changes</h3>
					<div className="space-y-2">
						{products.map((product) => (
							<ProductTagPreview
								key={product.id}
								product={product}
								addTags={selectedAddTags}
								removeTags={selectedRemoveTags}
								allTags={tags}
							/>
						))}
					</div>
				</div>

				<div className="flex gap-3">
					<Button variant="outline" className="flex-1 gap-2">
						<X className="size-4" />
						Cancel
					</Button>
					<Button className="flex-1 gap-2">
						<Check className="size-4" />
						Apply Changes
					</Button>
				</div>
			</div>
		</section>
	);
}
