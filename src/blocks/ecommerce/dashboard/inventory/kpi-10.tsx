'use client';

import * as React from 'react';
import {
	Package,
	TrendingUp,
	TrendingDown,
	BarChart3,
	PieChart,
	Activity,
	Zap,
} from 'lucide-react';

import {
	Card,
	CardContent,
	CardHeader,
	CardTitle,
	CardDescription,
} from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';

type SparklineKPIProps = {
	title: string;
	value: string;
	change: { value: number; period: string };
	data: number[];
	color: string;
	icon: React.ReactNode;
};

const SparklineKPI = ({
	title,
	value,
	change,
	data,
	color,
	icon,
}: SparklineKPIProps) => {
	const maxValue = Math.max(...data);
	const minValue = Math.min(...data);
	const range = maxValue - minValue || 1;

	const points = data
		.map((v, i) => {
			const x = (i / (data.length - 1)) * 100;
			const y = 100 - ((v - minValue) / range) * 100;
			return `${x},${y}`;
		})
		.join(' ');

	const isPositive = change.value >= 0;

	return (
		<Card>
			<CardContent className="p-6">
				<div className="flex items-center justify-between">
					<div
						className={`flex size-10 items-center justify-center rounded-lg`}
						style={{ backgroundColor: `${color}20`, color }}
					>
						{icon}
					</div>
					<div
						className={`text-sm font-medium ${isPositive ? 'text-emerald-500' : 'text-destructive'}`}
					>
						{isPositive ? '+' : ''}
						{change.value}%
					</div>
				</div>
				<div className="mt-4">
					<p className="text-2xl font-bold">{value}</p>
					<p className="text-sm text-muted-foreground">{title}</p>
				</div>
				<div className="mt-4 h-12">
					<svg
						viewBox="0 0 100 100"
						preserveAspectRatio="none"
						className="size-full"
					>
						<defs>
							<linearGradient
								id={`gradient-${title}`}
								x1="0%"
								y1="0%"
								x2="0%"
								y2="100%"
							>
								<stop
									offset="0%"
									style={{ stopColor: color, stopOpacity: 0.3 }}
								/>
								<stop
									offset="100%"
									style={{ stopColor: color, stopOpacity: 0 }}
								/>
							</linearGradient>
						</defs>
						<polygon
							points={`0,100 ${points} 100,100`}
							fill={`url(#gradient-${title})`}
						/>
						<polyline
							points={points}
							fill="none"
							stroke={color}
							strokeWidth="2"
							vectorEffect="non-scaling-stroke"
						/>
					</svg>
				</div>
				<p className="mt-2 text-xs text-muted-foreground">{change.period}</p>
			</CardContent>
		</Card>
	);
};

export default function Main() {
	const kpis: SparklineKPIProps[] = [
		{
			title: 'Total Units',
			value: '45,678',
			change: { value: 8.5, period: 'vs last 7 days' },
			data: [65, 72, 68, 75, 82, 78, 85, 90, 88, 95, 92, 98],
			color: '#3b82f6',
			icon: <Package className="size-5" />,
		},
		{
			title: 'Revenue',
			value: '$234.5K',
			change: { value: 12.3, period: 'vs last 7 days' },
			data: [45, 52, 48, 58, 55, 62, 68, 72, 78, 82, 85, 90],
			color: '#10b981',
			icon: <TrendingUp className="size-5" />,
		},
		{
			title: 'Velocity',
			value: '1,234/day',
			change: { value: -3.2, period: 'vs last 7 days' },
			data: [85, 82, 78, 80, 75, 72, 68, 70, 65, 62, 60, 58],
			color: '#f59e0b',
			icon: <Zap className="size-5" />,
		},
		{
			title: 'Fill Rate',
			value: '96.8%',
			change: { value: 1.5, period: 'vs last 7 days' },
			data: [88, 90, 89, 92, 91, 93, 94, 95, 94, 96, 95, 97],
			color: '#8b5cf6',
			icon: <Activity className="size-5" />,
		},
	];

	return (
		<section className="@container" data-theme="dashboard">
			<div className="mx-auto max-w-7xl px-4 py-8 @sm:px-6 @md:py-10 @2xl:px-8">
				<div className="mb-6">
					<h2 className="text-xl font-semibold @lg:text-2xl">Live Metrics</h2>
					<p className="text-sm text-muted-foreground">
						Real-time inventory performance with sparklines
					</p>
				</div>
				<div className="grid gap-4 @sm:grid-cols-2 @xl:grid-cols-4">
					{kpis.map((kpi) => (
						<SparklineKPI key={kpi.title} {...kpi} />
					))}
				</div>
			</div>
		</section>
	);
}
