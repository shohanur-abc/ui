'use client';

import * as React from 'react';
import {
	Package,
	TrendingUp,
	TrendingDown,
	ArrowUp,
	ArrowDown,
	Minus,
} from 'lucide-react';

import {
	Card,
	CardContent,
	CardHeader,
	CardTitle,
	CardDescription,
} from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';

type ComparisonKPIProps = {
	title: string;
	current: { value: string; period: string };
	previous: { value: string; period: string };
	change: number;
	status: 'up' | 'down' | 'neutral';
	trend: number[];
};

const ComparisonKPI = ({
	title,
	current,
	previous,
	change,
	status,
	trend,
}: ComparisonKPIProps) => {
	const statusColors = {
		up: 'text-emerald-500',
		down: 'text-destructive',
		neutral: 'text-muted-foreground',
	};

	const StatusIcon =
		status === 'up' ? ArrowUp : status === 'down' ? ArrowDown : Minus;

	const maxTrend = Math.max(...trend);
	const minTrend = Math.min(...trend);
	const range = maxTrend - minTrend || 1;

	return (
		<Card>
			<CardContent className="p-6">
				<p className="text-sm font-medium text-muted-foreground">{title}</p>
				<div className="mt-4 grid grid-cols-2 gap-4">
					<div>
						<p className="text-xs text-muted-foreground">{current.period}</p>
						<p className="mt-1 text-2xl font-bold">{current.value}</p>
					</div>
					<div>
						<p className="text-xs text-muted-foreground">{previous.period}</p>
						<p className="mt-1 text-2xl font-bold text-muted-foreground">
							{previous.value}
						</p>
					</div>
				</div>
				<div className="mt-4 flex items-center gap-2">
					<div className={`flex items-center gap-1 ${statusColors[status]}`}>
						<StatusIcon className="size-4" />
						<span className="font-semibold">{Math.abs(change)}%</span>
					</div>
					<span className="text-sm text-muted-foreground">change</span>
				</div>
				<div className="mt-4 flex h-8 items-end gap-0.5">
					{trend.map((value, index) => (
						<div
							key={index}
							className="flex-1 rounded-t bg-primary/30"
							style={{
								height: `${((value - minTrend) / range) * 100}%`,
								minHeight: '10%',
							}}
						/>
					))}
				</div>
			</CardContent>
		</Card>
	);
};

export default function Main() {
	const kpis: ComparisonKPIProps[] = [
		{
			title: 'Units Sold',
			current: { value: '12,458', period: 'This Month' },
			previous: { value: '10,234', period: 'Last Month' },
			change: 21.7,
			status: 'up',
			trend: [45, 52, 38, 65, 72, 58, 80, 75, 88, 92, 85, 95],
		},
		{
			title: 'Inventory Value',
			current: { value: '$2.4M', period: 'Current' },
			previous: { value: '$2.1M', period: '30 Days Ago' },
			change: 14.3,
			status: 'up',
			trend: [65, 68, 72, 70, 75, 78, 82, 85, 83, 88, 90, 92],
		},
		{
			title: 'Return Rate',
			current: { value: '3.2%', period: 'This Month' },
			previous: { value: '4.1%', period: 'Last Month' },
			change: -22.0,
			status: 'up',
			trend: [42, 38, 45, 35, 40, 32, 38, 30, 35, 28, 32, 25],
		},
		{
			title: 'Shrinkage',
			current: { value: '1.8%', period: 'This Quarter' },
			previous: { value: '1.5%', period: 'Last Quarter' },
			change: 20.0,
			status: 'down',
			trend: [12, 15, 14, 18, 16, 20, 18, 22, 20, 25, 22, 24],
		},
	];

	return (
		<section className="@container" data-theme="dashboard">
			<div className="mx-auto max-w-7xl px-4 py-8 @sm:px-6 @md:py-10 @2xl:px-8">
				<div className="mb-6">
					<h2 className="text-xl font-semibold @lg:text-2xl">
						Period Comparison
					</h2>
					<p className="text-sm text-muted-foreground">
						Compare KPIs across time periods
					</p>
				</div>
				<div className="grid gap-4 @sm:grid-cols-2 @xl:grid-cols-4">
					{kpis.map((kpi) => (
						<ComparisonKPI key={kpi.title} {...kpi} />
					))}
				</div>
			</div>
		</section>
	);
}
