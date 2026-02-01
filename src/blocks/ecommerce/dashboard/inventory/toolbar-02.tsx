'use client';

import * as React from 'react';
import {
	Trash2,
	Archive,
	Tag,
	MoreHorizontal,
	CheckSquare,
	X,
	Download,
	Printer,
	Copy,
	Move,
} from 'lucide-react';

import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuItem,
	DropdownMenuSeparator,
	DropdownMenuTrigger,
	DropdownMenuSub,
	DropdownMenuSubTrigger,
	DropdownMenuSubContent,
} from '@/components/ui/dropdown-menu';

type BulkAction = {
	icon: React.ElementType;
	label: string;
	variant?: 'default' | 'destructive';
	onClick: () => void;
};

type BulkActionBarProps = {
	selectedCount: number;
	totalCount: number;
	onClearSelection: () => void;
	onSelectAll: () => void;
	actions: BulkAction[];
};

const BulkActionBar = ({
	selectedCount,
	totalCount,
	onClearSelection,
	onSelectAll,
	actions,
}: BulkActionBarProps) => {
	if (selectedCount === 0) return null;

	return (
		<div className="flex items-center justify-between rounded-lg bg-primary/10 px-4 py-3">
			<div className="flex items-center gap-3">
				<div className="flex items-center gap-2">
					<CheckSquare className="size-5 text-primary" />
					<span className="font-medium">
						{selectedCount} of {totalCount} selected
					</span>
				</div>
				{selectedCount < totalCount && (
					<Button
						variant="link"
						size="sm"
						onClick={onSelectAll}
						className="h-auto p-0"
					>
						Select all
					</Button>
				)}
			</div>
			<div className="flex items-center gap-2">
				{actions.slice(0, 3).map((action) => (
					<Button
						key={action.label}
						variant={
							action.variant === 'destructive' ? 'destructive' : 'secondary'
						}
						size="sm"
						onClick={action.onClick}
					>
						<action.icon className="mr-2 size-4" />
						<span className="hidden @sm:inline">{action.label}</span>
					</Button>
				))}
				{actions.length > 3 && (
					<DropdownMenu>
						<DropdownMenuTrigger asChild>
							<Button variant="secondary" size="sm">
								<MoreHorizontal className="size-4" />
							</Button>
						</DropdownMenuTrigger>
						<DropdownMenuContent align="end">
							{actions.slice(3).map((action) => (
								<DropdownMenuItem
									key={action.label}
									onClick={action.onClick}
									className={
										action.variant === 'destructive' ? 'text-destructive' : ''
									}
								>
									<action.icon className="mr-2 size-4" />
									{action.label}
								</DropdownMenuItem>
							))}
						</DropdownMenuContent>
					</DropdownMenu>
				)}
				<Button variant="ghost" size="icon-sm" onClick={onClearSelection}>
					<X className="size-4" />
				</Button>
			</div>
		</div>
	);
};

type CategoryMenuProps = {
	categories: { value: string; label: string }[];
	onSelect: (category: string) => void;
};

const CategoryMenu = ({ categories, onSelect }: CategoryMenuProps) => (
	<DropdownMenuSub>
		<DropdownMenuSubTrigger>
			<Tag className="mr-2 size-4" />
			Assign Category
		</DropdownMenuSubTrigger>
		<DropdownMenuSubContent>
			{categories.map((cat) => (
				<DropdownMenuItem key={cat.value} onClick={() => onSelect(cat.value)}>
					{cat.label}
				</DropdownMenuItem>
			))}
		</DropdownMenuSubContent>
	</DropdownMenuSub>
);

type LocationMenuProps = {
	locations: { value: string; label: string }[];
	onSelect: (location: string) => void;
};

const LocationMenu = ({ locations, onSelect }: LocationMenuProps) => (
	<DropdownMenuSub>
		<DropdownMenuSubTrigger>
			<Move className="mr-2 size-4" />
			Move to Location
		</DropdownMenuSubTrigger>
		<DropdownMenuSubContent>
			{locations.map((loc) => (
				<DropdownMenuItem key={loc.value} onClick={() => onSelect(loc.value)}>
					{loc.label}
				</DropdownMenuItem>
			))}
		</DropdownMenuSubContent>
	</DropdownMenuSub>
);

export default function Main() {
	const [selectedItems, setSelectedItems] = React.useState<string[]>([
		'1',
		'3',
		'5',
	]);
	const totalItems = 25;

	const categories = [
		{ value: 'electronics', label: 'Electronics' },
		{ value: 'accessories', label: 'Accessories' },
		{ value: 'audio', label: 'Audio' },
	];

	const locations = [
		{ value: 'warehouse-a', label: 'Warehouse A' },
		{ value: 'warehouse-b', label: 'Warehouse B' },
		{ value: 'store-nyc', label: 'Store NYC' },
	];

	const actions: BulkAction[] = [
		{ icon: Archive, label: 'Archive', onClick: () => console.log('Archive') },
		{ icon: Tag, label: 'Tag', onClick: () => console.log('Tag') },
		{ icon: Download, label: 'Export', onClick: () => console.log('Export') },
		{
			icon: Printer,
			label: 'Print Labels',
			onClick: () => console.log('Print'),
		},
		{ icon: Copy, label: 'Duplicate', onClick: () => console.log('Duplicate') },
		{
			icon: Trash2,
			label: 'Delete',
			variant: 'destructive',
			onClick: () => console.log('Delete'),
		},
	];

	return (
		<section className="@container" data-theme="dashboard">
			<div className="mx-auto max-w-7xl px-4 py-8 @sm:px-6 @md:py-10 @2xl:px-8">
				<div className="space-y-4">
					<BulkActionBar
						selectedCount={selectedItems.length}
						totalCount={totalItems}
						onClearSelection={() => setSelectedItems([])}
						onSelectAll={() =>
							setSelectedItems(
								Array.from({ length: totalItems }, (_, i) => String(i + 1)),
							)
						}
						actions={actions}
					/>

					{/* Sample items showing selection state */}
					<div className="rounded-lg border">
						{Array.from({ length: 5 }, (_, i) => {
							const id = String(i + 1);
							const isSelected = selectedItems.includes(id);
							return (
								<div
									key={id}
									className={`flex cursor-pointer items-center gap-4 border-b p-4 last:border-0 ${
										isSelected ? 'bg-primary/5' : 'hover:bg-muted/50'
									}`}
									onClick={() => {
										if (isSelected) {
											setSelectedItems(selectedItems.filter((s) => s !== id));
										} else {
											setSelectedItems([...selectedItems, id]);
										}
									}}
								>
									<div
										className={`flex size-5 items-center justify-center rounded border ${
											isSelected
												? 'border-primary bg-primary'
												: 'border-muted-foreground'
										}`}
									>
										{isSelected && (
											<CheckSquare className="size-4 text-primary-foreground" />
										)}
									</div>
									<div className="flex-1">
										<p className="font-medium">Product {i + 1}</p>
										<p className="text-sm text-muted-foreground">
											SKU-00{i + 1}
										</p>
									</div>
									<Badge variant="secondary">In Stock</Badge>
								</div>
							);
						})}
					</div>
				</div>
			</div>
		</section>
	);
}
