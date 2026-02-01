'use client';

import * as React from 'react';
import {
	Package,
	DollarSign,
	TrendingUp,
	TrendingDown,
	ArrowUpRight,
	ArrowDownRight,
} from 'lucide-react';

import {
	Card,
	CardContent,
	CardHeader,
	CardTitle,
	CardDescription,
} from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';

type StatItem = {
	id: string;
	title: string;
	value: string;
	change: number;
	changeLabel: string;
	icon: React.ReactNode;
	trend: 'up' | 'down';
};

type StatCardProps = {
	stat: StatItem;
};

const StatCard = ({ stat }: StatCardProps) => (
	<Card>
		<CardContent className="p-6">
			<div className="flex items-center justify-between">
				<div className="flex size-10 items-center justify-center rounded-lg bg-primary/10">
					{stat.icon}
				</div>
				<Badge
					variant={stat.trend === 'up' ? 'default' : 'destructive'}
					className="flex items-center gap-1"
				>
					{stat.trend === 'up' ? (
						<ArrowUpRight className="size-3" />
					) : (
						<ArrowDownRight className="size-3" />
					)}
					{Math.abs(stat.change)}%
				</Badge>
			</div>
			<div className="mt-4">
				<p className="text-sm text-muted-foreground">{stat.title}</p>
				<p className="mt-1 text-2xl font-bold @lg:text-3xl">{stat.value}</p>
				<p className="mt-1 text-xs text-muted-foreground">{stat.changeLabel}</p>
			</div>
		</CardContent>
	</Card>
);

export default function Main() {
	const stats: StatItem[] = [
		{
			id: '1',
			title: 'Total Inventory Value',
			value: '$1,284,500',
			change: 12.5,
			changeLabel: 'vs last month',
			icon: <DollarSign className="size-5 text-primary" />,
			trend: 'up',
		},
		{
			id: '2',
			title: 'Total SKUs',
			value: '2,847',
			change: 8.2,
			changeLabel: 'New items added',
			icon: <Package className="size-5 text-primary" />,
			trend: 'up',
		},
		{
			id: '3',
			title: 'Avg Turnover Rate',
			value: '4.2x',
			change: 15.3,
			changeLabel: 'Improvement in velocity',
			icon: <TrendingUp className="size-5 text-primary" />,
			trend: 'up',
		},
		{
			id: '4',
			title: 'Dead Stock',
			value: '127 items',
			change: -18.5,
			changeLabel: 'vs last month',
			icon: <TrendingDown className="size-5 text-primary" />,
			trend: 'down',
		},
	];

	return (
		<section className="@container" data-theme="dashboard">
			<div className="mx-auto max-w-7xl px-4 py-8 @sm:px-6 @md:py-10 @2xl:px-8">
				<div className="space-y-6">
					<div>
						<h2 className="text-xl font-semibold @lg:text-2xl">
							Inventory Stats
						</h2>
						<p className="text-sm text-muted-foreground">
							Key performance metrics
						</p>
					</div>
					<div className="grid gap-4 @sm:grid-cols-2 @xl:grid-cols-4">
						{stats.map((stat) => (
							<StatCard key={stat.id} stat={stat} />
						))}
					</div>
				</div>
			</div>
		</section>
	);
}
