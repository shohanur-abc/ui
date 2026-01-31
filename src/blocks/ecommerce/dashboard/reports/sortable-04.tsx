'use client';

import { ArrowDown, ArrowUp, ArrowUpDown, Clock, Globe, Zap } from 'lucide-react';
import { useState } from 'react';
import type { LucideIcon } from 'lucide-react';

import { Badge } from '@/components/ui/badge';
import {
	Card,
	CardContent,
	CardDescription,
	CardHeader,
	CardTitle,
} from '@/components/ui/card';
import {
	Table,
	TableBody,
	TableCell,
	TableHead,
	TableHeader,
	TableRow,
} from '@/components/ui/table';

type TrafficSourceItem = {
	id: number;
	source: string;
	channel: 'organic' | 'paid' | 'social' | 'referral' | 'direct';
	visitors: number;
	pageViews: number;
	bounceRate: number;
	avgDuration: string;
	conversions: number;
	conversionRate: number;
};

const channelConfig: Record<TrafficSourceItem['channel'], { color: string; icon: LucideIcon }> = {
	organic: { color: 'bg-emerald-500/10 text-emerald-500', icon: Globe },
	paid: { color: 'bg-blue-500/10 text-blue-500', icon: Zap },
	social: { color: 'bg-purple-500/10 text-purple-500', icon: Globe },
	referral: { color: 'bg-amber-500/10 text-amber-500', icon: Globe },
	direct: { color: 'bg-slate-500/10 text-slate-400', icon: Globe },
};

type SortConfig = {
	key: keyof TrafficSourceItem | null;
	direction: 'asc' | 'desc';
};

type HeaderCellProps = {
	label: string;
	sortKey: keyof TrafficSourceItem;
	sortConfig: SortConfig;
	onSort: (key: keyof TrafficSourceItem) => void;
	align?: 'left' | 'right';
};

const HeaderCell = ({
	label,
	sortKey,
	sortConfig,
	onSort,
	align = 'left',
}: HeaderCellProps) => {
	const isActive = sortConfig.key === sortKey;

	return (
		<TableHead
			className={`cursor-pointer transition-colors hover:text-foreground ${align === 'right' ? 'text-right' : ''}`}
			onClick={() => onSort(sortKey)}
		>
			<div
				className={`inline-flex items-center gap-1 ${align === 'right' ? 'flex-row-reverse' : ''}`}
			>
				{isActive ? (
					sortConfig.direction === 'asc' ? (
						<ArrowUp className="size-3.5 text-primary" />
					) : (
						<ArrowDown className="size-3.5 text-primary" />
					)
				) : (
					<ArrowUpDown className="size-3 opacity-40" />
				)}
				{label}
			</div>
		</TableHead>
	);
};

type SourceRowProps = TrafficSourceItem;

const SourceRow = ({
	source,
	channel,
	visitors,
	pageViews,
	bounceRate,
	avgDuration,
	conversions,
	conversionRate,
}: SourceRowProps) => {
	const config = channelConfig[channel];

	return (
		<TableRow className="group transition-colors hover:bg-muted/50">
			<TableCell>
				<div className="flex items-center gap-3">
					<div className={`rounded-md p-1.5 ${config.color}`}>
						<config.icon className="size-3.5" />
					</div>
					<span className="font-medium">{source}</span>
				</div>
			</TableCell>
			<TableCell>
				<Badge variant="secondary" className={`border-0 ${config.color}`}>
					{channel.charAt(0).toUpperCase() + channel.slice(1)}
				</Badge>
			</TableCell>
			<TableCell className="text-right font-medium">
				{visitors.toLocaleString()}
			</TableCell>
			<TableCell className="text-right">
				{pageViews.toLocaleString()}
			</TableCell>
			<TableCell className="text-right">
				<span
					className={
						bounceRate > 60
							? 'text-rose-500'
							: bounceRate > 40
								? 'text-amber-500'
								: 'text-emerald-500'
					}
				>
					{bounceRate}%
				</span>
			</TableCell>
			<TableCell className="text-right text-muted-foreground">
				<div className="inline-flex items-center gap-1">
					<Clock className="size-3" />
					{avgDuration}
				</div>
			</TableCell>
			<TableCell className="text-right">{conversions}</TableCell>
			<TableCell className="text-right font-medium text-primary">
				{conversionRate}%
			</TableCell>
		</TableRow>
	);
};

export default function Main() {
	const [sortConfig, setSortConfig] = useState<SortConfig>({
		key: 'visitors',
		direction: 'desc',
	});

	const handleSort = (key: keyof TrafficSourceItem) => {
		setSortConfig((prev) => ({
			key,
			direction: prev.key === key && prev.direction === 'desc' ? 'asc' : 'desc',
		}));
	};

	const sources: TrafficSourceItem[] = [
		{ id: 1, source: 'Google Search', channel: 'organic', visitors: 45820, pageViews: 124500, bounceRate: 32, avgDuration: '4:23', conversions: 1834, conversionRate: 4.0 },
		{ id: 2, source: 'Facebook Ads', channel: 'paid', visitors: 28450, pageViews: 68200, bounceRate: 48, avgDuration: '2:15', conversions: 854, conversionRate: 3.0 },
		{ id: 3, source: 'Instagram', channel: 'social', visitors: 18920, pageViews: 42100, bounceRate: 55, avgDuration: '1:45', conversions: 378, conversionRate: 2.0 },
		{ id: 4, source: 'Direct Traffic', channel: 'direct', visitors: 15680, pageViews: 38900, bounceRate: 28, avgDuration: '5:12', conversions: 784, conversionRate: 5.0 },
		{ id: 5, source: 'Partner Sites', channel: 'referral', visitors: 8920, pageViews: 21400, bounceRate: 42, avgDuration: '3:08', conversions: 267, conversionRate: 3.0 },
		{ id: 6, source: 'Email Campaign', channel: 'direct', visitors: 6450, pageViews: 18200, bounceRate: 25, avgDuration: '4:45', conversions: 452, conversionRate: 7.0 },
	];

	const sortedSources = [...sources].sort((a, b) => {
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
					<CardHeader>
						<CardTitle className="text-lg @sm:text-xl">
							Traffic Sources Report
						</CardTitle>
						<CardDescription>
							Website traffic analytics by acquisition channel
						</CardDescription>
					</CardHeader>
					<CardContent className="p-0">
						<Table>
							<TableHeader>
								<TableRow className="border-border/50 hover:bg-transparent">
									<HeaderCell
										label="Source"
										sortKey="source"
										sortConfig={sortConfig}
										onSort={handleSort}
									/>
									<TableHead>Channel</TableHead>
									<HeaderCell
										label="Visitors"
										sortKey="visitors"
										sortConfig={sortConfig}
										onSort={handleSort}
										align="right"
									/>
									<HeaderCell
										label="Page Views"
										sortKey="pageViews"
										sortConfig={sortConfig}
										onSort={handleSort}
										align="right"
									/>
									<HeaderCell
										label="Bounce"
										sortKey="bounceRate"
										sortConfig={sortConfig}
										onSort={handleSort}
										align="right"
									/>
									<TableHead className="text-right">Duration</TableHead>
									<HeaderCell
										label="Conv."
										sortKey="conversions"
										sortConfig={sortConfig}
										onSort={handleSort}
										align="right"
									/>
									<HeaderCell
										label="Rate"
										sortKey="conversionRate"
										sortConfig={sortConfig}
										onSort={handleSort}
										align="right"
									/>
								</TableRow>
							</TableHeader>
							<TableBody>
								{sortedSources.map((source) => (
									<SourceRow key={source.id} {...source} />
								))}
							</TableBody>
						</Table>
					</CardContent>
				</Card>
			</div>
		</section>
	);
}
