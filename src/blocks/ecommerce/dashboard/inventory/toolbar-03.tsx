'use client';

import * as React from 'react';
import {
	Search,
	Download,
	Upload,
	Printer,
	MoreVertical,
	RefreshCw,
	Settings,
	Bell,
	LayoutGrid,
	List,
} from 'lucide-react';

import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Toggle } from '@/components/ui/toggle';
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuItem,
	DropdownMenuSeparator,
	DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';

type ViewMode = 'grid' | 'list';

type ToolbarProps = {
	searchQuery: string;
	onSearchChange: (query: string) => void;
	viewMode: ViewMode;
	onViewModeChange: (mode: ViewMode) => void;
	onRefresh: () => void;
};

const MainToolbar = ({
	searchQuery,
	onSearchChange,
	viewMode,
	onViewModeChange,
	onRefresh,
}: ToolbarProps) => (
	<div className="flex flex-wrap items-center gap-4 rounded-lg border bg-card p-4">
		<div className="relative flex-1 min-w-64">
			<Search className="absolute left-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" />
			<Input
				value={searchQuery}
				onChange={(e) => onSearchChange(e.target.value)}
				placeholder="Search inventory..."
				className="pl-9"
			/>
		</div>

		<div className="flex items-center gap-2">
			<div className="flex rounded-lg border">
				<Toggle
					pressed={viewMode === 'grid'}
					onPressedChange={() => onViewModeChange('grid')}
					className="rounded-r-none border-0"
					aria-label="Grid view"
				>
					<LayoutGrid className="size-4" />
				</Toggle>
				<Toggle
					pressed={viewMode === 'list'}
					onPressedChange={() => onViewModeChange('list')}
					className="rounded-l-none border-0 border-l"
					aria-label="List view"
				>
					<List className="size-4" />
				</Toggle>
			</div>

			<Button variant="outline" size="icon" onClick={onRefresh}>
				<RefreshCw className="size-4" />
			</Button>

			<Button variant="outline">
				<Download className="mr-2 size-4" />
				Export
			</Button>

			<Button variant="outline">
				<Upload className="mr-2 size-4" />
				Import
			</Button>

			<Button variant="outline" size="icon">
				<Printer className="size-4" />
			</Button>

			<DropdownMenu>
				<DropdownMenuTrigger asChild>
					<Button variant="outline" size="icon">
						<MoreVertical className="size-4" />
					</Button>
				</DropdownMenuTrigger>
				<DropdownMenuContent align="end">
					<DropdownMenuItem>
						<Settings className="mr-2 size-4" />
						Settings
					</DropdownMenuItem>
					<DropdownMenuItem>
						<Bell className="mr-2 size-4" />
						Notifications
					</DropdownMenuItem>
					<DropdownMenuSeparator />
					<DropdownMenuItem>View All Products</DropdownMenuItem>
					<DropdownMenuItem>View Low Stock</DropdownMenuItem>
					<DropdownMenuItem>View Out of Stock</DropdownMenuItem>
				</DropdownMenuContent>
			</DropdownMenu>
		</div>
	</div>
);

export default function Main() {
	const [searchQuery, setSearchQuery] = React.useState('');
	const [viewMode, setViewMode] = React.useState<ViewMode>('grid');

	return (
		<section className="@container" data-theme="dashboard">
			<div className="mx-auto max-w-7xl px-4 py-8 @sm:px-6 @md:py-10 @2xl:px-8">
				<MainToolbar
					searchQuery={searchQuery}
					onSearchChange={setSearchQuery}
					viewMode={viewMode}
					onViewModeChange={setViewMode}
					onRefresh={() => console.log('Refresh')}
				/>
			</div>
		</section>
	);
}
