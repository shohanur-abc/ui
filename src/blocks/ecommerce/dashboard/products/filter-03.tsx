'use client';

import * as React from 'react';
import {
	Search,
	Filter,
	X,
	Save,
	Clock,
	Star,
	Trash2,
	Plus,
	ChevronRight,
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
	DialogHeader,
	DialogTitle,
	DialogTrigger,
	DialogFooter,
} from '@/components/ui/dialog';
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuItem,
	DropdownMenuLabel,
	DropdownMenuSeparator,
	DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Separator } from '@/components/ui/separator';

interface SavedFilter {
	id: string;
	name: string;
	isDefault: boolean;
	lastUsed: string;
	filters: {
		categories: string[];
		status: string[];
		priceRange: [number, number];
	};
}

interface RecentSearch {
	id: string;
	query: string;
	resultCount: number;
	timestamp: string;
}

interface SavedFilterCardProps {
	filter: SavedFilter;
	onApply: (filter: SavedFilter) => void;
	onSetDefault: (id: string) => void;
	onDelete: (id: string) => void;
	labels: {
		apply: string;
		setDefault: string;
		delete: string;
		default: string;
	};
}

const SavedFilterCard = ({
	filter,
	onApply,
	onSetDefault,
	onDelete,
	labels,
}: SavedFilterCardProps) => {
	const filterCount =
		filter.filters.categories.length +
		filter.filters.status.length +
		(filter.filters.priceRange[0] > 0 || filter.filters.priceRange[1] < 500
			? 1
			: 0);

	return (
		<div className="flex items-center gap-3 rounded-lg border bg-card p-3 transition-colors hover:bg-muted/50">
			<div className="flex-1">
				<div className="flex items-center gap-2">
					<span className="font-medium">{filter.name}</span>
					{filter.isDefault && (
						<Badge variant="secondary" className="gap-1 text-xs">
							<Star className="size-3 fill-current" />
							{labels.default}
						</Badge>
					)}
				</div>
				<div className="mt-1 flex items-center gap-2 text-xs text-muted-foreground">
					<span>{filterCount} filters</span>
					<span>•</span>
					<span>Last used {filter.lastUsed}</span>
				</div>
			</div>
			<div className="flex items-center gap-1">
				<Button variant="ghost" size="sm" onClick={() => onApply(filter)}>
					{labels.apply}
				</Button>
				<DropdownMenu>
					<DropdownMenuTrigger asChild>
						<Button variant="ghost" size="icon-sm">
							<ChevronRight className="size-4" />
						</Button>
					</DropdownMenuTrigger>
					<DropdownMenuContent align="end">
						<DropdownMenuItem onClick={() => onSetDefault(filter.id)}>
							<Star className="mr-2 size-4" />
							{labels.setDefault}
						</DropdownMenuItem>
						<DropdownMenuSeparator />
						<DropdownMenuItem
							onClick={() => onDelete(filter.id)}
							className="text-destructive"
						>
							<Trash2 className="mr-2 size-4" />
							{labels.delete}
						</DropdownMenuItem>
					</DropdownMenuContent>
				</DropdownMenu>
			</div>
		</div>
	);
};

interface RecentSearchRowProps {
	search: RecentSearch;
	onApply: (query: string) => void;
	onRemove: (id: string) => void;
}

const RecentSearchRow = ({
	search,
	onApply,
	onRemove,
}: RecentSearchRowProps) => (
	<div className="group flex items-center gap-3 rounded-md px-2 py-1.5 hover:bg-muted">
		<Clock className="size-4 text-muted-foreground" />
		<button
			onClick={() => onApply(search.query)}
			className="flex-1 text-left text-sm"
		>
			{search.query}
		</button>
		<span className="text-xs text-muted-foreground">
			{search.resultCount} results
		</span>
		<button
			onClick={() => onRemove(search.id)}
			className="opacity-0 transition-opacity group-hover:opacity-100"
		>
			<X className="size-4 text-muted-foreground hover:text-foreground" />
		</button>
	</div>
);

interface SaveFilterDialogProps {
	onSave: (name: string, isDefault: boolean) => void;
	labels: {
		title: string;
		description: string;
		name: string;
		default: string;
		save: string;
		cancel: string;
	};
}

const SaveFilterDialog = ({ onSave, labels }: SaveFilterDialogProps) => {
	const [name, setName] = React.useState('');
	const [isDefault, setIsDefault] = React.useState(false);
	const [isOpen, setIsOpen] = React.useState(false);

	const handleSave = () => {
		if (name.trim()) {
			onSave(name, isDefault);
			setName('');
			setIsDefault(false);
			setIsOpen(false);
		}
	};

	return (
		<Dialog open={isOpen} onOpenChange={setIsOpen}>
			<DialogTrigger asChild>
				<Button variant="outline" size="sm" className="gap-1.5">
					<Save className="size-3.5" />
					Save Filter
				</Button>
			</DialogTrigger>
			<DialogContent>
				<DialogHeader>
					<DialogTitle>{labels.title}</DialogTitle>
					<DialogDescription>{labels.description}</DialogDescription>
				</DialogHeader>
				<div className="space-y-4 py-4">
					<div className="space-y-2">
						<Label htmlFor="filter-name">{labels.name}</Label>
						<Input
							id="filter-name"
							value={name}
							onChange={(e) => setName(e.target.value)}
							placeholder="My custom filter"
						/>
					</div>
					<div className="flex items-center gap-2">
						<Checkbox
							id="is-default"
							checked={isDefault}
							onCheckedChange={(checked) => setIsDefault(checked as boolean)}
						/>
						<Label htmlFor="is-default" className="text-sm font-normal">
							{labels.default}
						</Label>
					</div>
				</div>
				<DialogFooter>
					<Button variant="outline" onClick={() => setIsOpen(false)}>
						{labels.cancel}
					</Button>
					<Button onClick={handleSave} disabled={!name.trim()}>
						{labels.save}
					</Button>
				</DialogFooter>
			</DialogContent>
		</Dialog>
	);
};

export default function Main() {
	const [searchQuery, setSearchQuery] = React.useState('');
	const [savedFilters, setSavedFilters] = React.useState<SavedFilter[]>([
		{
			id: '1',
			name: 'Low Stock Items',
			isDefault: true,
			lastUsed: '2 hours ago',
			filters: { categories: [], status: ['low-stock'], priceRange: [0, 500] },
		},
		{
			id: '2',
			name: 'Premium Electronics',
			isDefault: false,
			lastUsed: 'Yesterday',
			filters: {
				categories: ['electronics'],
				status: ['active'],
				priceRange: [200, 500],
			},
		},
		{
			id: '3',
			name: 'Sale Candidates',
			isDefault: false,
			lastUsed: '3 days ago',
			filters: { categories: [], status: ['active'], priceRange: [50, 150] },
		},
	]);

	const [recentSearches, setRecentSearches] = React.useState<RecentSearch[]>([
		{
			id: '1',
			query: 'wireless headphones',
			resultCount: 45,
			timestamp: '1 hour ago',
		},
		{
			id: '2',
			query: 'gaming keyboard RGB',
			resultCount: 23,
			timestamp: '3 hours ago',
		},
		{ id: '3', query: 'USB-C hub', resultCount: 12, timestamp: 'Yesterday' },
	]);

	const handleApplyFilter = (filter: SavedFilter) => {
		console.log('Applying filter:', filter.name);
	};

	const handleSetDefault = (id: string) => {
		setSavedFilters((prev) =>
			prev.map((f) => ({ ...f, isDefault: f.id === id })),
		);
	};

	const handleDeleteFilter = (id: string) => {
		setSavedFilters((prev) => prev.filter((f) => f.id !== id));
	};

	const handleSaveFilter = (name: string, isDefault: boolean) => {
		const newFilter: SavedFilter = {
			id: String(Date.now()),
			name,
			isDefault,
			lastUsed: 'Just now',
			filters: { categories: [], status: [], priceRange: [0, 500] },
		};
		setSavedFilters((prev) => [
			...(isDefault ? prev.map((f) => ({ ...f, isDefault: false })) : prev),
			newFilter,
		]);
	};

	const handleApplyRecentSearch = (query: string) => {
		setSearchQuery(query);
	};

	const handleRemoveRecentSearch = (id: string) => {
		setRecentSearches((prev) => prev.filter((s) => s.id !== id));
	};

	return (
		<section className="@container" data-theme="dashboard">
			<div className="mx-auto max-w-2xl space-y-6 px-4 py-8 @sm:px-6">
				<div className="relative">
					<Search className="absolute left-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" />
					<Input
						value={searchQuery}
						onChange={(e) => setSearchQuery(e.target.value)}
						placeholder="Search products..."
						className="pl-9 pr-24"
					/>
					<div className="absolute right-2 top-1/2 flex -translate-y-1/2 items-center gap-1">
						<SaveFilterDialog
							onSave={handleSaveFilter}
							labels={{
								title: 'Save Filter',
								description:
									'Save your current filter settings for quick access later.',
								name: 'Filter Name',
								default: 'Set as default filter',
								save: 'Save',
								cancel: 'Cancel',
							}}
						/>
					</div>
				</div>

				<div className="space-y-3">
					<div className="flex items-center justify-between">
						<h3 className="font-medium">Saved Filters</h3>
						<span className="text-sm text-muted-foreground">
							{savedFilters.length} saved
						</span>
					</div>
					<div className="space-y-2">
						{savedFilters.map((filter) => (
							<SavedFilterCard
								key={filter.id}
								filter={filter}
								onApply={handleApplyFilter}
								onSetDefault={handleSetDefault}
								onDelete={handleDeleteFilter}
								labels={{
									apply: 'Apply',
									setDefault: 'Set as default',
									delete: 'Delete',
									default: 'Default',
								}}
							/>
						))}
					</div>
				</div>

				<Separator />

				<div className="space-y-3">
					<div className="flex items-center justify-between">
						<h3 className="font-medium">Recent Searches</h3>
						<Button
							variant="ghost"
							size="sm"
							onClick={() => setRecentSearches([])}
							className="text-xs text-muted-foreground"
						>
							Clear all
						</Button>
					</div>
					<div className="space-y-1">
						{recentSearches.map((search) => (
							<RecentSearchRow
								key={search.id}
								search={search}
								onApply={handleApplyRecentSearch}
								onRemove={handleRemoveRecentSearch}
							/>
						))}
					</div>
				</div>
			</div>
		</section>
	);
}
