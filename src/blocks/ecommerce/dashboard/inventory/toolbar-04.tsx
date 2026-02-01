'use client';

import * as React from 'react';
import {
	Plus,
	Trash2,
	Edit,
	Copy,
	Archive,
	Tag,
	MoveRight,
	MoreHorizontal,
	CheckSquare,
	X,
} from 'lucide-react';

import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuItem,
	DropdownMenuSeparator,
	DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Separator } from '@/components/ui/separator';

type BulkActionToolbarProps = {
	selectedCount: number;
	totalCount: number;
	onSelectAll: () => void;
	onClearSelection: () => void;
	onDelete: () => void;
	onArchive: () => void;
	onTransfer: () => void;
	onTag: () => void;
};

const BulkActionToolbar = ({
	selectedCount,
	totalCount,
	onSelectAll,
	onClearSelection,
	onDelete,
	onArchive,
	onTransfer,
	onTag,
}: BulkActionToolbarProps) => {
	const hasSelection = selectedCount > 0;

	return (
		<div
			className={`rounded-lg border p-4 transition-colors ${hasSelection ? 'bg-primary/5 border-primary/30' : 'bg-card'}`}
		>
			<div className="flex flex-wrap items-center gap-4">
				<div className="flex items-center gap-3">
					<Button
						variant={hasSelection ? 'default' : 'outline'}
						size="sm"
						onClick={hasSelection ? onClearSelection : onSelectAll}
					>
						{hasSelection ? (
							<>
								<X className="mr-2 size-4" />
								Clear
							</>
						) : (
							<>
								<CheckSquare className="mr-2 size-4" />
								Select All
							</>
						)}
					</Button>
					{hasSelection && (
						<Badge variant="secondary" className="text-sm">
							{selectedCount} of {totalCount} selected
						</Badge>
					)}
				</div>

				{hasSelection && (
					<>
						<Separator orientation="vertical" className="h-8" />
						<div className="flex items-center gap-2">
							<Button variant="outline" size="sm" onClick={onTag}>
								<Tag className="mr-2 size-4" />
								Add Tags
							</Button>
							<Button variant="outline" size="sm" onClick={onTransfer}>
								<MoveRight className="mr-2 size-4" />
								Transfer
							</Button>
							<Button variant="outline" size="sm" onClick={onArchive}>
								<Archive className="mr-2 size-4" />
								Archive
							</Button>
							<Button variant="destructive" size="sm" onClick={onDelete}>
								<Trash2 className="mr-2 size-4" />
								Delete
							</Button>
							<DropdownMenu>
								<DropdownMenuTrigger asChild>
									<Button variant="outline" size="sm">
										<MoreHorizontal className="size-4" />
									</Button>
								</DropdownMenuTrigger>
								<DropdownMenuContent align="end">
									<DropdownMenuItem>
										<Copy className="mr-2 size-4" />
										Duplicate
									</DropdownMenuItem>
									<DropdownMenuItem>
										<Edit className="mr-2 size-4" />
										Bulk Edit
									</DropdownMenuItem>
									<DropdownMenuSeparator />
									<DropdownMenuItem>Export Selected</DropdownMenuItem>
									<DropdownMenuItem>Print Labels</DropdownMenuItem>
								</DropdownMenuContent>
							</DropdownMenu>
						</div>
					</>
				)}

				<div className="ml-auto">
					<Button>
						<Plus className="mr-2 size-4" />
						Add Product
					</Button>
				</div>
			</div>
		</div>
	);
};

export default function Main() {
	const [selectedCount, setSelectedCount] = React.useState(5);
	const totalCount = 150;

	return (
		<section className="@container" data-theme="dashboard">
			<div className="mx-auto max-w-7xl px-4 py-8 @sm:px-6 @md:py-10 @2xl:px-8">
				<BulkActionToolbar
					selectedCount={selectedCount}
					totalCount={totalCount}
					onSelectAll={() => setSelectedCount(totalCount)}
					onClearSelection={() => setSelectedCount(0)}
					onDelete={() => console.log('Delete')}
					onArchive={() => console.log('Archive')}
					onTransfer={() => console.log('Transfer')}
					onTag={() => console.log('Tag')}
				/>
			</div>
		</section>
	);
}
