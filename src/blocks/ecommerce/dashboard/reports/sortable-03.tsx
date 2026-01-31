'use client';

import {
	ArrowDown,
	ArrowUp,
	ArrowUpDown,
	Filter,
	Maximize2,
	RotateCcw,
} from 'lucide-react';
import { useState } from 'react';

import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import {
	Card,
	CardContent,
	CardDescription,
	CardHeader,
	CardTitle,
} from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import {
	Table,
	TableBody,
	TableCell,
	TableHead,
	TableHeader,
	TableRow,
} from '@/components/ui/table';
import {
	Tooltip,
	TooltipContent,
	TooltipProvider,
	TooltipTrigger,
} from '@/components/ui/tooltip';

type SalesRepItem = {
	id: string;
	name: string;
	avatar: string;
	initials: string;
	region: string;
	deals: number;
	revenue: number;
	target: number;
	quota: number;
};

type SortConfig = {
	key: keyof SalesRepItem | null;
	direction: 'asc' | 'desc';
};

type SortableColumnProps = {
	label: string;
	sortKey: keyof SalesRepItem;
	currentSort: SortConfig;
	onSort: (key: keyof SalesRepItem) => void;
	align?: 'left' | 'right' | 'center';
};

const SortableColumn = ({
	label,
	sortKey,
	currentSort,
	onSort,
	align = 'left',
}: SortableColumnProps) => {
	const isActive = currentSort.key === sortKey;
	const alignClass =
		align === 'right'
			? 'justify-end text-right'
			: align === 'center'
				? 'justify-center text-center'
				: '';

	return (
		<TableHead
			className={`cursor-pointer select-none ${alignClass}`}
			onClick={() => onSort(sortKey)}
		>
			<div className={`inline-flex items-center gap-1 ${alignClass}`}>
				{label}
				<span className="opacity-50 transition-opacity group-hover:opacity-100">
					{isActive ? (
						currentSort.direction === 'asc' ? (
							<ArrowUp className="size-3.5 text-primary" />
						) : (
							<ArrowDown className="size-3.5 text-primary" />
						)
					) : (
						<ArrowUpDown className="size-3" />
					)}
				</span>
			</div>
		</TableHead>
	);
};

type SalesRepRowProps = SalesRepItem;

const SalesRepRow = ({
	name,
	avatar,
	initials,
	region,
	deals,
	revenue,
	target,
	quota,
}: SalesRepRowProps) => {
	const progressPercent = Math.min((revenue / target) * 100, 100);
	const isOverTarget = revenue >= target;

	return (
		<TableRow className="group transition-colors hover:bg-muted/50">
			<TableCell>
				<div className="flex items-center gap-3">
					<Avatar className="size-9 ring-2 ring-border/50">
						<AvatarImage src={avatar} alt={name} />
						<AvatarFallback className="bg-primary/10 text-xs text-primary">
							{initials}
						</AvatarFallback>
					</Avatar>
					<div>
						<p className="font-medium">{name}</p>
						<p className="text-xs text-muted-foreground">{region}</p>
					</div>
				</div>
			</TableCell>
			<TableCell className="text-center font-medium">{deals}</TableCell>
			<TableCell className="text-right font-bold">
				${revenue.toLocaleString()}
			</TableCell>
			<TableCell className="text-right text-muted-foreground">
				${target.toLocaleString()}
			</TableCell>
			<TableCell className="w-40">
				<TooltipProvider>
					<Tooltip>
						<TooltipTrigger asChild>
							<div className="space-y-1">
								<Progress
									value={progressPercent}
									className={`h-2 ${isOverTarget ? '[&>div]:bg-emerald-500' : ''}`}
								/>
								<p
									className={`text-xs font-medium ${isOverTarget ? 'text-emerald-500' : 'text-muted-foreground'}`}
								>
									{quota}% of quota
								</p>
							</div>
						</TooltipTrigger>
						<TooltipContent>
							{isOverTarget ? 'Target exceeded!' : `${(100 - quota)}% remaining`}
						</TooltipContent>
					</Tooltip>
				</TooltipProvider>
			</TableCell>
		</TableRow>
	);
};

export default function Main() {
	const [sortConfig, setSortConfig] = useState<SortConfig>({
		key: 'revenue',
		direction: 'desc',
	});

	const handleSort = (key: keyof SalesRepItem) => {
		setSortConfig((prev) => ({
			key,
			direction: prev.key === key && prev.direction === 'desc' ? 'asc' : 'desc',
		}));
	};

	const salesReps: SalesRepItem[] = [
		{ id: '1', name: 'Jessica Martinez', avatar: '', initials: 'JM', region: 'North America', deals: 34, revenue: 425000, target: 400000, quota: 106 },
		{ id: '2', name: 'Robert Chen', avatar: '', initials: 'RC', region: 'Asia Pacific', deals: 28, revenue: 312000, target: 350000, quota: 89 },
		{ id: '3', name: 'Emma Thompson', avatar: '', initials: 'ET', region: 'Europe', deals: 31, revenue: 389000, target: 380000, quota: 102 },
		{ id: '4', name: 'Michael Brown', avatar: '', initials: 'MB', region: 'Latin America', deals: 19, revenue: 178000, target: 250000, quota: 71 },
		{ id: '5', name: 'Sarah Williams', avatar: '', initials: 'SW', region: 'Middle East', deals: 22, revenue: 245000, target: 280000, quota: 88 },
		{ id: '6', name: 'David Lee', avatar: '', initials: 'DL', region: 'Australia', deals: 15, revenue: 156000, target: 200000, quota: 78 },
	];

	const sortedReps = [...salesReps].sort((a, b) => {
		if (!sortConfig.key) return 0;
		const aVal = a[sortConfig.key];
		const bVal = b[sortConfig.key];
		const modifier = sortConfig.direction === 'asc' ? 1 : -1;
		if (typeof aVal === 'string' && typeof bVal === 'string') {
			return aVal.localeCompare(bVal) * modifier;
		}
		return ((aVal as number) - (bVal as number)) * modifier;
	});

	return (
		<section className="@container" data-theme="reports">
			<div className="mx-auto max-w-7xl px-4 py-8 @sm:px-6 @md:py-10 @2xl:px-8 @3xl:py-12">
				<Card className="overflow-hidden border-border/50 bg-card/80 backdrop-blur-sm">
					<CardHeader className="flex flex-row items-center justify-between">
						<div>
							<CardTitle className="text-lg @sm:text-xl">
								Sales Rep Performance
							</CardTitle>
							<CardDescription>
								Individual performance against quota targets
							</CardDescription>
						</div>
						<div className="flex items-center gap-2">
							<Button
								variant="ghost"
								size="sm"
								onClick={() => setSortConfig({ key: 'revenue', direction: 'desc' })}
							>
								<RotateCcw className="size-4" />
							</Button>
							<Button variant="outline" size="sm">
								<Filter className="mr-2 size-4" />
								Filter
							</Button>
						</div>
					</CardHeader>
					<CardContent className="p-0">
						<Table>
							<TableHeader>
								<TableRow className="border-border/50 hover:bg-transparent">
									<SortableColumn
										label="Sales Rep"
										sortKey="name"
										currentSort={sortConfig}
										onSort={handleSort}
									/>
									<SortableColumn
										label="Deals"
										sortKey="deals"
										currentSort={sortConfig}
										onSort={handleSort}
										align="center"
									/>
									<SortableColumn
										label="Revenue"
										sortKey="revenue"
										currentSort={sortConfig}
										onSort={handleSort}
										align="right"
									/>
									<SortableColumn
										label="Target"
										sortKey="target"
										currentSort={sortConfig}
										onSort={handleSort}
										align="right"
									/>
									<SortableColumn
										label="Quota Progress"
										sortKey="quota"
										currentSort={sortConfig}
										onSort={handleSort}
									/>
								</TableRow>
							</TableHeader>
							<TableBody>
								{sortedReps.map((rep) => (
									<SalesRepRow key={rep.id} {...rep} />
								))}
							</TableBody>
						</Table>
					</CardContent>
				</Card>
			</div>
		</section>
	);
}
