'use client';

import * as React from 'react';
import {
	Package,
	TrendingUp,
	TrendingDown,
	ArrowUpRight,
	ArrowDownRight,
	Minus,
	RefreshCw,
} from 'lucide-react';

import {
	Card,
	CardContent,
	CardHeader,
	CardTitle,
	CardDescription,
} from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';

type OverviewStat = {
	id: string;
	title: string;
	value: string;
	change: number;
	changeLabel: string;
	sparkline: number[];
	status: 'up' | 'down' | 'neutral';
};

type StatCardProps = {
	stat: OverviewStat;
};

const StatCard = ({ stat }: StatCardProps) => {
	const statusConfig = {
		up: { color: 'text-emerald-500', bg: 'bg-emerald-500', icon: TrendingUp },
		down: {
			color: 'text-destructive',
			bg: 'bg-destructive',
			icon: TrendingDown,
		},
		neutral: {
			color: 'text-muted-foreground',
			bg: 'bg-muted-foreground',
			icon: Minus,
		},
	};

	const config = statusConfig[stat.status];
	const TrendIcon = config.icon;

	const maxValue = Math.max(...stat.sparkline);
	const minValue = Math.min(...stat.sparkline);
	const range = maxValue - minValue || 1;

	return (
		<Card className="overflow-hidden">
			<CardContent className="p-0">
				<div className="p-6 pb-2">
					<div className="flex items-start justify-between">
						<div>
							<p className="text-sm font-medium text-muted-foreground">
								{stat.title}
							</p>
							<p className="mt-2 text-3xl font-bold">{stat.value}</p>
						</div>
						<Badge
							variant="outline"
							className={`gap-1 ${config.color} border-current`}
						>
							{stat.status === 'up' ? (
								<ArrowUpRight className="size-3" />
							) : stat.status === 'down' ? (
								<ArrowDownRight className="size-3" />
							) : (
								<Minus className="size-3" />
							)}
							{Math.abs(stat.change)}%
						</Badge>
					</div>
					<p className="mt-1 text-sm text-muted-foreground">
						{stat.changeLabel}
					</p>
				</div>
				<div className="h-16 px-6">
					<svg
						viewBox="0 0 100 32"
						preserveAspectRatio="none"
						className="size-full"
					>
						<defs>
							<linearGradient
								id={`grad-${stat.id}`}
								x1="0%"
								y1="0%"
								x2="0%"
								y2="100%"
							>
								<stop
									offset="0%"
									className={config.color}
									style={{ stopOpacity: 0.3 }}
								/>
								<stop
									offset="100%"
									className={config.color}
									style={{ stopOpacity: 0 }}
								/>
							</linearGradient>
						</defs>
						<polygon
							points={`0,32 ${stat.sparkline
								.map((v, i) => {
									const x = (i / (stat.sparkline.length - 1)) * 100;
									const y = 32 - ((v - minValue) / range) * 28;
									return `${x},${y}`;
								})
								.join(' ')} 100,32`}
							fill={`url(#grad-${stat.id})`}
						/>
						<polyline
							points={stat.sparkline
								.map((v, i) => {
									const x = (i / (stat.sparkline.length - 1)) * 100;
									const y = 32 - ((v - minValue) / range) * 28;
									return `${x},${y}`;
								})
								.join(' ')}
							fill="none"
							className={config.color}
							stroke="currentColor"
							strokeWidth="2"
							vectorEffect="non-scaling-stroke"
						/>
					</svg>
				</div>
			</CardContent>
		</Card>
	);
};

export default function Main() {
	const stats: OverviewStat[] = [
		{
			id: '1',
			title: 'Total Inventory Value',
			value: '$4.2M',
			change: 12.5,
			changeLabel: 'vs last month',
			sparkline: [65, 72, 68, 75, 82, 78, 85, 90, 88, 95, 92, 98],
			status: 'up',
		},
		{
			id: '2',
			title: 'Total Units',
			value: '45,678',
			change: 8.3,
			changeLabel: 'vs last month',
			sparkline: [55, 58, 62, 60, 65, 68, 72, 75, 78, 82, 85, 88],
			status: 'up',
		},
		{
			id: '3',
			title: 'Low Stock Items',
			value: '234',
			change: -15.2,
			changeLabel: 'Improved from 276',
			sparkline: [85, 82, 78, 80, 75, 72, 68, 70, 65, 62, 60, 58],
			status: 'down',
		},
		{
			id: '4',
			title: 'Inventory Turnover',
			value: '8.4x',
			change: 0,
			changeLabel: 'Same as last quarter',
			sparkline: [70, 72, 71, 73, 72, 74, 73, 75, 74, 76, 75, 76],
			status: 'neutral',
		},
		{
			id: '5',
			title: 'Fill Rate',
			value: '96.8%',
			change: 2.1,
			changeLabel: 'vs last month',
			sparkline: [88, 90, 89, 92, 91, 93, 94, 95, 94, 96, 95, 97],
			status: 'up',
		},
		{
			id: '6',
			title: 'Dead Stock Value',
			value: '$124K',
			change: 5.8,
			changeLabel: 'Needs attention',
			sparkline: [45, 48, 52, 55, 58, 62, 60, 65, 68, 72, 70, 75],
			status: 'down',
		},
	];

	return (
		<section className="@container" data-theme="dashboard">
			<div className="mx-auto max-w-7xl px-4 py-8 @sm:px-6 @md:py-10 @2xl:px-8">
				<div className="mb-6 flex items-center justify-between">
					<div>
						<h2 className="text-xl font-semibold @lg:text-2xl">
							Inventory Overview
						</h2>
						<p className="text-sm text-muted-foreground">
							Key metrics at a glance
						</p>
					</div>
					<Button variant="outline" size="sm">
						<RefreshCw className="mr-2 size-4" />
						Refresh
					</Button>
				</div>
				<div className="grid gap-4 @sm:grid-cols-2 @lg:grid-cols-3">
					{stats.map((stat) => (
						<StatCard key={stat.id} stat={stat} />
					))}
				</div>
			</div>
		</section>
	);
}
