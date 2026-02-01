'use client';

import * as React from 'react';
import { Search, X, Star, Clock, Save, Trash2 } from 'lucide-react';

import {
	Card,
	CardContent,
	CardHeader,
	CardTitle,
	CardDescription,
	CardFooter,
} from '@/components/ui/card';
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
import { ScrollArea } from '@/components/ui/scroll-area';

type SavedFilter = {
	id: string;
	name: string;
	description: string;
	filters: Record<string, string>;
	isDefault?: boolean;
	lastUsed?: string;
};

type SavedFilterItemProps = {
	filter: SavedFilter;
	onApply: (id: string) => void;
	onSetDefault: (id: string) => void;
	onDelete: (id: string) => void;
};

const SavedFilterItem = ({
	filter,
	onApply,
	onSetDefault,
	onDelete,
}: SavedFilterItemProps) => (
	<div className="group flex items-center justify-between rounded-lg border p-3 hover:bg-muted/50 transition-colors">
		<div className="flex-1 cursor-pointer" onClick={() => onApply(filter.id)}>
			<div className="flex items-center gap-2">
				<p className="font-medium">{filter.name}</p>
				{filter.isDefault && (
					<Badge variant="default" className="text-xs">
						Default
					</Badge>
				)}
			</div>
			<p className="text-sm text-muted-foreground">{filter.description}</p>
			{filter.lastUsed && (
				<p className="mt-1 text-xs text-muted-foreground flex items-center gap-1">
					<Clock className="size-3" />
					Last used: {filter.lastUsed}
				</p>
			)}
		</div>
		<div className="flex gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
			<Button
				variant="ghost"
				size="icon-sm"
				onClick={() => onSetDefault(filter.id)}
				className={filter.isDefault ? 'text-amber-500' : ''}
			>
				<Star className="size-4" />
			</Button>
			<Button
				variant="ghost"
				size="icon-sm"
				onClick={() => onDelete(filter.id)}
			>
				<Trash2 className="size-4 text-destructive" />
			</Button>
		</div>
	</div>
);

type QuickFilterProps = {
	label: string;
	count: number;
	isActive?: boolean;
	onClick: () => void;
};

const QuickFilter = ({ label, count, isActive, onClick }: QuickFilterProps) => (
	<button
		onClick={onClick}
		className={`rounded-full px-4 py-2 text-sm font-medium transition-colors ${
			isActive
				? 'bg-primary text-primary-foreground'
				: 'bg-muted hover:bg-muted/80'
		}`}
	>
		{label}
		<span className="ml-2 opacity-70">{count}</span>
	</button>
);

export default function Main() {
	const [searchSaved, setSearchSaved] = React.useState('');
	const [activeQuickFilter, setActiveQuickFilter] = React.useState('all');

	const quickFilters = [
		{ id: 'all', label: 'All', count: 3152 },
		{ id: 'low-stock', label: 'Low Stock', count: 234 },
		{ id: 'out-of-stock', label: 'Out of Stock', count: 89 },
		{ id: 'reorder', label: 'Needs Reorder', count: 156 },
		{ id: 'new', label: 'New Items', count: 45 },
	];

	const [savedFilters, setSavedFilters] = React.useState<SavedFilter[]>([
		{
			id: '1',
			name: 'Low Stock Electronics',
			description: 'Electronics with stock < 50 units',
			filters: { category: 'Electronics', stockBelow: '50' },
			isDefault: true,
			lastUsed: '2 hours ago',
		},
		{
			id: '2',
			name: 'Dead Stock Report',
			description: 'Items with no movement in 90 days',
			filters: { noMovement: '90' },
			lastUsed: 'Yesterday',
		},
		{
			id: '3',
			name: 'High Value Items',
			description: 'Products valued over $1000',
			filters: { valueAbove: '1000' },
			lastUsed: '3 days ago',
		},
		{
			id: '4',
			name: 'Warehouse A Critical',
			description: 'Critical stock in Main Warehouse',
			filters: { location: 'Main Warehouse', status: 'Critical' },
			lastUsed: 'Last week',
		},
	]);

	const handleSetDefault = (id: string) => {
		setSavedFilters((prev) =>
			prev.map((f) => ({ ...f, isDefault: f.id === id })),
		);
	};

	const handleDelete = (id: string) => {
		setSavedFilters((prev) => prev.filter((f) => f.id !== id));
	};

	const filteredSaved = savedFilters.filter((f) =>
		f.name.toLowerCase().includes(searchSaved.toLowerCase()),
	);

	return (
		<section className="@container" data-theme="dashboard">
			<div className="mx-auto max-w-7xl px-4 py-8 @sm:px-6 @md:py-10 @2xl:px-8">
				<Card>
					<CardHeader>
						<CardTitle className="text-xl @lg:text-2xl">
							Filter Presets
						</CardTitle>
						<CardDescription>Quick filters and saved presets</CardDescription>
					</CardHeader>
					<CardContent className="space-y-6">
						<div className="space-y-2">
							<Label>Quick Filters</Label>
							<div className="flex flex-wrap gap-2">
								{quickFilters.map((filter) => (
									<QuickFilter
										key={filter.id}
										label={filter.label}
										count={filter.count}
										isActive={activeQuickFilter === filter.id}
										onClick={() => setActiveQuickFilter(filter.id)}
									/>
								))}
							</div>
						</div>

						<div className="space-y-4">
							<div className="flex items-center justify-between">
								<Label className="text-base">Saved Presets</Label>
								<Button variant="outline" size="sm">
									<Save className="mr-2 size-4" />
									Save Current
								</Button>
							</div>
							<div className="relative">
								<Search className="absolute left-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" />
								<Input
									value={searchSaved}
									onChange={(e) => setSearchSaved(e.target.value)}
									placeholder="Search saved filters..."
									className="pl-9"
								/>
							</div>
							<ScrollArea className="h-64">
								<div className="space-y-2 pr-4">
									{filteredSaved.map((filter) => (
										<SavedFilterItem
											key={filter.id}
											filter={filter}
											onApply={(id) => console.log('Apply', id)}
											onSetDefault={handleSetDefault}
											onDelete={handleDelete}
										/>
									))}
								</div>
							</ScrollArea>
						</div>
					</CardContent>
				</Card>
			</div>
		</section>
	);
}
