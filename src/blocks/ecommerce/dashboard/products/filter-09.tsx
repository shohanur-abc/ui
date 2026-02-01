'use client';

import * as React from 'react';
import {
	Package,
	Check,
	X,
	AlertTriangle,
	Archive,
	ChevronDown,
	ChevronUp,
} from 'lucide-react';

import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Checkbox } from '@/components/ui/checkbox';
import { Label } from '@/components/ui/label';
import {
	Collapsible,
	CollapsibleContent,
	CollapsibleTrigger,
} from '@/components/ui/collapsible';
import {
	Popover,
	PopoverContent,
	PopoverTrigger,
} from '@/components/ui/popover';

interface StockStatus {
	id: string;
	label: string;
	icon: React.ElementType;
	color: string;
	count: number;
	checked: boolean;
}

interface StockStatusItemProps {
	status: StockStatus;
	onToggle: () => void;
}

const StockStatusItem = ({ status, onToggle }: StockStatusItemProps) => {
	const Icon = status.icon;
	return (
		<label className="flex cursor-pointer items-center gap-3 rounded-lg p-2 hover:bg-accent">
			<Checkbox checked={status.checked} onCheckedChange={onToggle} />
			<Icon className={`size-4 ${status.color}`} />
			<span className="flex-1">{status.label}</span>
			<Badge variant="outline">{status.count}</Badge>
		</label>
	);
};

interface StockLevelFilterProps {
	statuses: StockStatus[];
	onToggle: (id: string) => void;
	onClearAll: () => void;
}

const StockLevelFilter = ({
	statuses,
	onToggle,
	onClearAll,
}: StockLevelFilterProps) => {
	const [isOpen, setIsOpen] = React.useState(true);
	const selectedCount = statuses.filter((s) => s.checked).length;

	return (
		<div className="rounded-lg border bg-card">
			<Collapsible open={isOpen} onOpenChange={setIsOpen}>
				<CollapsibleTrigger asChild>
					<button className="flex w-full items-center justify-between p-4 hover:bg-accent/50">
						<div className="flex items-center gap-2">
							<Package className="size-4" />
							<span className="font-medium">Stock Status</span>
							{selectedCount > 0 && (
								<Badge variant="secondary">{selectedCount} selected</Badge>
							)}
						</div>
						{isOpen ? (
							<ChevronUp className="size-4" />
						) : (
							<ChevronDown className="size-4" />
						)}
					</button>
				</CollapsibleTrigger>
				<CollapsibleContent>
					<div className="border-t p-4">
						<div className="space-y-1">
							{statuses.map((status) => (
								<StockStatusItem
									key={status.id}
									status={status}
									onToggle={() => onToggle(status.id)}
								/>
							))}
						</div>
						{selectedCount > 0 && (
							<Button
								variant="ghost"
								size="sm"
								onClick={onClearAll}
								className="mt-3 w-full gap-2"
							>
								<X className="size-4" />
								Clear Selection
							</Button>
						)}
					</div>
				</CollapsibleContent>
			</Collapsible>
		</div>
	);
};

interface QuickStockButtonsProps {
	statuses: StockStatus[];
	onToggle: (id: string) => void;
}

const QuickStockButtons = ({ statuses, onToggle }: QuickStockButtonsProps) => (
	<div className="flex flex-wrap gap-2">
		{statuses.map((status) => {
			const Icon = status.icon;
			return (
				<Button
					key={status.id}
					variant={status.checked ? 'default' : 'outline'}
					size="sm"
					onClick={() => onToggle(status.id)}
					className="gap-2"
				>
					<Icon className={`size-4 ${status.checked ? '' : status.color}`} />
					{status.label}
					<Badge
						variant={status.checked ? 'secondary' : 'outline'}
						className="ml-1"
					>
						{status.count}
					</Badge>
				</Button>
			);
		})}
	</div>
);

interface StockDropdownFilterProps {
	statuses: StockStatus[];
	onToggle: (id: string) => void;
}

const StockDropdownFilter = ({
	statuses,
	onToggle,
}: StockDropdownFilterProps) => {
	const selectedCount = statuses.filter((s) => s.checked).length;

	return (
		<Popover>
			<PopoverTrigger asChild>
				<Button variant="outline" className="gap-2">
					<Package className="size-4" />
					Stock Status
					{selectedCount > 0 && (
						<Badge variant="secondary" className="ml-1">
							{selectedCount}
						</Badge>
					)}
				</Button>
			</PopoverTrigger>
			<PopoverContent className="w-64">
				<div className="space-y-1">
					{statuses.map((status) => (
						<StockStatusItem
							key={status.id}
							status={status}
							onToggle={() => onToggle(status.id)}
						/>
					))}
				</div>
			</PopoverContent>
		</Popover>
	);
};

interface StockOverviewProps {
	statuses: StockStatus[];
}

const StockOverview = ({ statuses }: StockOverviewProps) => {
	const total = statuses.reduce((acc, s) => acc + s.count, 0);

	return (
		<div className="rounded-lg border bg-card p-4">
			<h3 className="mb-3 font-medium">Stock Overview</h3>
			<div className="space-y-3">
				{statuses.map((status) => {
					const Icon = status.icon;
					const percentage = Math.round((status.count / total) * 100);
					return (
						<div key={status.id} className="space-y-1">
							<div className="flex items-center justify-between text-sm">
								<div className="flex items-center gap-2">
									<Icon className={`size-4 ${status.color}`} />
									<span>{status.label}</span>
								</div>
								<span className="text-muted-foreground">
									{status.count} ({percentage}%)
								</span>
							</div>
							<div className="h-2 overflow-hidden rounded-full bg-muted">
								<div
									className={`h-full rounded-full ${status.color.replace('text-', 'bg-')}`}
									style={{ width: `${percentage}%` }}
								/>
							</div>
						</div>
					);
				})}
			</div>
		</div>
	);
};

export default function Main() {
	const [statuses, setStatuses] = React.useState<StockStatus[]>([
		{ id: 'in-stock', label: 'In Stock', icon: Check, color: 'text-green-500', count: 156, checked: false },
		{ id: 'low-stock', label: 'Low Stock', icon: AlertTriangle, color: 'text-amber-500', count: 42, checked: false },
		{ id: 'out-of-stock', label: 'Out of Stock', icon: X, color: 'text-red-500', count: 18, checked: false },
		{ id: 'archived', label: 'Archived', icon: Archive, color: 'text-muted-foreground', count: 24, checked: false },
	]);

	const toggleStatus = (id: string) => {
		setStatuses((prev) =>
			prev.map((s) => (s.id === id ? { ...s, checked: !s.checked } : s))
		);
	};

	const clearAll = () => {
		setStatuses((prev) => prev.map((s) => ({ ...s, checked: false })));
	};

	return (
		<section className="@container" data-theme="dashboard">
			<div className="mx-auto max-w-2xl space-y-6 px-4 py-8 @sm:px-6">
				<div className="flex items-center gap-3">
					<Package className="size-5" />
					<h2 className="text-xl font-semibold">Stock Status Filters</h2>
				</div>

				<StockLevelFilter
					statuses={statuses}
					onToggle={toggleStatus}
					onClearAll={clearAll}
				/>

				<div className="space-y-2">
					<Label>Quick Filters</Label>
					<QuickStockButtons statuses={statuses} onToggle={toggleStatus} />
				</div>

				<div className="flex items-center gap-4">
					<span className="text-sm font-medium">Dropdown version:</span>
					<StockDropdownFilter statuses={statuses} onToggle={toggleStatus} />
				</div>

				<StockOverview statuses={statuses} />

				<div className="rounded-lg border bg-muted/30 p-4">
					<h3 className="mb-2 font-medium">Active Filters</h3>
					<div className="flex flex-wrap gap-2">
						{statuses.filter((s) => s.checked).length > 0 ? (
							statuses
								.filter((s) => s.checked)
								.map((status) => {
									const Icon = status.icon;
									return (
										<Badge key={status.id} variant="secondary" className="gap-1">
											<Icon className={`size-3 ${status.color}`} />
											{status.label}
											<button onClick={() => toggleStatus(status.id)}>
												<X className="size-3" />
											</button>
										</Badge>
									);
								})
						) : (
							<span className="text-sm text-muted-foreground">
								No filters applied
							</span>
						)}
					</div>
				</div>
			</div>
		</section>
	);
}
