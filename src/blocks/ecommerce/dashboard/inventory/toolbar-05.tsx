'use client';

import * as React from 'react';
import {
	ChevronLeft,
	ChevronRight,
	ChevronsLeft,
	ChevronsRight,
	ArrowUpDown,
	ArrowUp,
	ArrowDown,
	Columns,
	SlidersHorizontal,
} from 'lucide-react';

import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from '@/components/ui/select';
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuCheckboxItem,
	DropdownMenuLabel,
	DropdownMenuSeparator,
	DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';

type SortOption = {
	id: string;
	label: string;
};

type Column = {
	id: string;
	label: string;
	visible: boolean;
};

type PaginationToolbarProps = {
	currentPage: number;
	totalPages: number;
	pageSize: number;
	totalItems: number;
	sortBy: string;
	sortDirection: 'asc' | 'desc';
	columns: Column[];
	onPageChange: (page: number) => void;
	onPageSizeChange: (size: number) => void;
	onSortChange: (sortBy: string) => void;
	onSortDirectionChange: () => void;
	onColumnToggle: (columnId: string) => void;
};

const PaginationToolbar = ({
	currentPage,
	totalPages,
	pageSize,
	totalItems,
	sortBy,
	sortDirection,
	columns,
	onPageChange,
	onPageSizeChange,
	onSortChange,
	onSortDirectionChange,
	onColumnToggle,
}: PaginationToolbarProps) => {
	const startItem = (currentPage - 1) * pageSize + 1;
	const endItem = Math.min(currentPage * pageSize, totalItems);

	const sortOptions: SortOption[] = [
		{ id: 'name', label: 'Name' },
		{ id: 'sku', label: 'SKU' },
		{ id: 'stock', label: 'Stock Level' },
		{ id: 'price', label: 'Price' },
		{ id: 'updated', label: 'Last Updated' },
	];

	return (
		<div className="flex flex-wrap items-center justify-between gap-4 rounded-lg border bg-card p-4">
			<div className="flex items-center gap-4">
				<div className="flex items-center gap-2">
					<span className="text-sm text-muted-foreground">Sort by</span>
					<Select value={sortBy} onValueChange={onSortChange}>
						<SelectTrigger className="w-32">
							<SelectValue />
						</SelectTrigger>
						<SelectContent>
							{sortOptions.map((option) => (
								<SelectItem key={option.id} value={option.id}>
									{option.label}
								</SelectItem>
							))}
						</SelectContent>
					</Select>
					<Button variant="outline" size="icon" onClick={onSortDirectionChange}>
						{sortDirection === 'asc' ? (
							<ArrowUp className="size-4" />
						) : (
							<ArrowDown className="size-4" />
						)}
					</Button>
				</div>

				<DropdownMenu>
					<DropdownMenuTrigger asChild>
						<Button variant="outline" size="sm">
							<Columns className="mr-2 size-4" />
							Columns
							<Badge variant="secondary" className="ml-2">
								{columns.filter((c) => c.visible).length}
							</Badge>
						</Button>
					</DropdownMenuTrigger>
					<DropdownMenuContent align="start">
						<DropdownMenuLabel>Toggle Columns</DropdownMenuLabel>
						<DropdownMenuSeparator />
						{columns.map((column) => (
							<DropdownMenuCheckboxItem
								key={column.id}
								checked={column.visible}
								onCheckedChange={() => onColumnToggle(column.id)}
							>
								{column.label}
							</DropdownMenuCheckboxItem>
						))}
					</DropdownMenuContent>
				</DropdownMenu>
			</div>

			<div className="flex items-center gap-4">
				<div className="flex items-center gap-2">
					<span className="text-sm text-muted-foreground">Show</span>
					<Select
						value={pageSize.toString()}
						onValueChange={(v) => onPageSizeChange(parseInt(v))}
					>
						<SelectTrigger className="w-20">
							<SelectValue />
						</SelectTrigger>
						<SelectContent>
							<SelectItem value="10">10</SelectItem>
							<SelectItem value="25">25</SelectItem>
							<SelectItem value="50">50</SelectItem>
							<SelectItem value="100">100</SelectItem>
						</SelectContent>
					</Select>
					<span className="text-sm text-muted-foreground">per page</span>
				</div>

				<div className="text-sm text-muted-foreground">
					{startItem}-{endItem} of {totalItems}
				</div>

				<div className="flex items-center gap-1">
					<Button
						variant="outline"
						size="icon"
						onClick={() => onPageChange(1)}
						disabled={currentPage === 1}
					>
						<ChevronsLeft className="size-4" />
					</Button>
					<Button
						variant="outline"
						size="icon"
						onClick={() => onPageChange(currentPage - 1)}
						disabled={currentPage === 1}
					>
						<ChevronLeft className="size-4" />
					</Button>
					<span className="px-3 text-sm">
						Page {currentPage} of {totalPages}
					</span>
					<Button
						variant="outline"
						size="icon"
						onClick={() => onPageChange(currentPage + 1)}
						disabled={currentPage === totalPages}
					>
						<ChevronRight className="size-4" />
					</Button>
					<Button
						variant="outline"
						size="icon"
						onClick={() => onPageChange(totalPages)}
						disabled={currentPage === totalPages}
					>
						<ChevronsRight className="size-4" />
					</Button>
				</div>
			</div>
		</div>
	);
};

export default function Main() {
	const [currentPage, setCurrentPage] = React.useState(1);
	const [pageSize, setPageSize] = React.useState(25);
	const [sortBy, setSortBy] = React.useState('name');
	const [sortDirection, setSortDirection] = React.useState<'asc' | 'desc'>(
		'asc',
	);
	const [columns, setColumns] = React.useState<Column[]>([
		{ id: 'name', label: 'Name', visible: true },
		{ id: 'sku', label: 'SKU', visible: true },
		{ id: 'category', label: 'Category', visible: true },
		{ id: 'stock', label: 'Stock', visible: true },
		{ id: 'price', label: 'Price', visible: true },
		{ id: 'location', label: 'Location', visible: false },
		{ id: 'supplier', label: 'Supplier', visible: false },
	]);

	const totalItems = 1250;
	const totalPages = Math.ceil(totalItems / pageSize);

	const handleColumnToggle = (columnId: string) => {
		setColumns((prev) =>
			prev.map((col) =>
				col.id === columnId ? { ...col, visible: !col.visible } : col,
			),
		);
	};

	return (
		<section className="@container" data-theme="dashboard">
			<div className="mx-auto max-w-7xl px-4 py-8 @sm:px-6 @md:py-10 @2xl:px-8">
				<PaginationToolbar
					currentPage={currentPage}
					totalPages={totalPages}
					pageSize={pageSize}
					totalItems={totalItems}
					sortBy={sortBy}
					sortDirection={sortDirection}
					columns={columns}
					onPageChange={setCurrentPage}
					onPageSizeChange={setPageSize}
					onSortChange={setSortBy}
					onSortDirectionChange={() =>
						setSortDirection((prev) => (prev === 'asc' ? 'desc' : 'asc'))
					}
					onColumnToggle={handleColumnToggle}
				/>
			</div>
		</section>
	);
}
