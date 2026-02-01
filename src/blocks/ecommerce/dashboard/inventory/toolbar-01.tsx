'use client';

import * as React from 'react';
import {
	Plus,
	Download,
	Upload,
	Filter,
	RefreshCw,
	MoreHorizontal,
	Printer,
	FileSpreadsheet,
	Settings,
	Trash2,
	LayoutGrid,
	List,
} from 'lucide-react';

import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuItem,
	DropdownMenuSeparator,
	DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Separator } from '@/components/ui/separator';
import { Toggle } from '@/components/ui/toggle';

type ViewMode = 'grid' | 'list';

type ToolbarButtonProps = {
	icon: React.ElementType;
	label: string;
	onClick?: () => void;
	variant?: 'default' | 'outline' | 'ghost' | 'secondary';
};

const ToolbarButton = ({
	icon: Icon,
	label,
	onClick,
	variant = 'outline',
}: ToolbarButtonProps) => (
	<Button variant={variant} size="sm" onClick={onClick} className="gap-2">
		<Icon className="size-4" />
		<span className="hidden @sm:inline">{label}</span>
	</Button>
);

type ToolbarIconButtonProps = {
	icon: React.ElementType;
	onClick?: () => void;
	tooltip?: string;
};

const ToolbarIconButton = ({
	icon: Icon,
	onClick,
	tooltip,
}: ToolbarIconButtonProps) => (
	<Button variant="ghost" size="icon-sm" onClick={onClick} title={tooltip}>
		<Icon className="size-4" />
	</Button>
);

type ViewToggleProps = {
	viewMode: ViewMode;
	onViewChange: (mode: ViewMode) => void;
};

const ViewToggle = ({ viewMode, onViewChange }: ViewToggleProps) => (
	<div className="flex rounded-lg border">
		<Toggle
			pressed={viewMode === 'grid'}
			onPressedChange={() => onViewChange('grid')}
			size="sm"
			className="rounded-r-none border-0"
		>
			<LayoutGrid className="size-4" />
		</Toggle>
		<Separator orientation="vertical" className="h-auto" />
		<Toggle
			pressed={viewMode === 'list'}
			onPressedChange={() => onViewChange('list')}
			size="sm"
			className="rounded-l-none border-0"
		>
			<List className="size-4" />
		</Toggle>
	</div>
);

type ExportMenuProps = {
	onExport: (format: string) => void;
	labels: { csv: string; excel: string; pdf: string };
};

const ExportMenu = ({ onExport, labels }: ExportMenuProps) => (
	<DropdownMenu>
		<DropdownMenuTrigger asChild>
			<Button variant="outline" size="sm">
				<Download className="size-4" />
				<span className="ml-2 hidden @sm:inline">Export</span>
			</Button>
		</DropdownMenuTrigger>
		<DropdownMenuContent align="end">
			<DropdownMenuItem onClick={() => onExport('csv')}>
				<FileSpreadsheet className="mr-2 size-4" />
				{labels.csv}
			</DropdownMenuItem>
			<DropdownMenuItem onClick={() => onExport('excel')}>
				<FileSpreadsheet className="mr-2 size-4" />
				{labels.excel}
			</DropdownMenuItem>
			<DropdownMenuItem onClick={() => onExport('pdf')}>
				<Printer className="mr-2 size-4" />
				{labels.pdf}
			</DropdownMenuItem>
		</DropdownMenuContent>
	</DropdownMenu>
);

type MoreActionsMenuProps = {
	onAction: (action: string) => void;
};

const MoreActionsMenu = ({ onAction }: MoreActionsMenuProps) => (
	<DropdownMenu>
		<DropdownMenuTrigger asChild>
			<Button variant="ghost" size="icon-sm">
				<MoreHorizontal className="size-4" />
			</Button>
		</DropdownMenuTrigger>
		<DropdownMenuContent align="end">
			<DropdownMenuItem onClick={() => onAction('print')}>
				<Printer className="mr-2 size-4" />
				Print Inventory
			</DropdownMenuItem>
			<DropdownMenuItem onClick={() => onAction('settings')}>
				<Settings className="mr-2 size-4" />
				Table Settings
			</DropdownMenuItem>
			<DropdownMenuSeparator />
			<DropdownMenuItem
				onClick={() => onAction('delete')}
				className="text-destructive"
			>
				<Trash2 className="mr-2 size-4" />
				Clear Filters
			</DropdownMenuItem>
		</DropdownMenuContent>
	</DropdownMenu>
);

export default function Main() {
	const [viewMode, setViewMode] = React.useState<ViewMode>('list');

	return (
		<section className="@container" data-theme="dashboard">
			<div className="mx-auto max-w-7xl px-4 py-8 @sm:px-6 @md:py-10 @2xl:px-8">
				<div className="rounded-lg border bg-card">
					{/* Toolbar */}
					<div className="flex flex-wrap items-center justify-between gap-3 border-b p-3">
						<div className="flex items-center gap-2">
							<Button size="sm">
								<Plus className="mr-2 size-4" />
								Add Product
							</Button>
							<ToolbarButton icon={Upload} label="Import" />
							<ExportMenu
								onExport={(format) => console.log(`Export ${format}`)}
								labels={{
									csv: 'Export CSV',
									excel: 'Export Excel',
									pdf: 'Export PDF',
								}}
							/>
						</div>
						<div className="flex items-center gap-2">
							<Input
								placeholder="Search products..."
								className="w-40 @lg:w-64"
							/>
							<ToolbarButton icon={Filter} label="Filter" />
							<ViewToggle viewMode={viewMode} onViewChange={setViewMode} />
							<ToolbarIconButton icon={RefreshCw} tooltip="Refresh" />
							<MoreActionsMenu onAction={(action) => console.log(action)} />
						</div>
					</div>
					{/* Content placeholder */}
					<div className="flex h-64 items-center justify-center border-b text-muted-foreground">
						{viewMode === 'grid' ? 'Grid View Content' : 'List View Content'}
					</div>
					{/* Footer */}
					<div className="flex items-center justify-between p-3 text-sm text-muted-foreground">
						<span>Showing 1-25 of 1,234 products</span>
						<div className="flex items-center gap-2">
							<Button variant="outline" size="sm" disabled>
								Previous
							</Button>
							<Button variant="outline" size="sm">
								Next
							</Button>
						</div>
					</div>
				</div>
			</div>
		</section>
	);
}
