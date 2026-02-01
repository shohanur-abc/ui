'use client';

import { RadialBar, RadialBarChart, Cell } from 'recharts';
import {
	ArrowUpRight,
	CheckCircle2,
	Clock,
	Target,
	TrendingUp,
	type LucideIcon,
} from 'lucide-react';

import { Badge } from '@/components/ui/badge';
import { Card, CardContent } from '@/components/ui/card';
import { ChartConfig, ChartContainer } from '@/components/ui/chart';

type RadialCard = {
	title: string;
	value: string;
	target: string;
	progress: number;
	change: string;
	icon: LucideIcon;
	description: string;
	color: string;
};

const chartConfig: ChartConfig = {
	value: { label: 'Progress' },
};

const RadialCardComponent = ({
	title,
	value,
	target,
	progress,
	change,
	icon: Icon,
	description,
	color,
}: RadialCard) => {
	const chartData = [{ name: 'progress', value: progress }];

	return (
		<Card>
			<CardContent className="p-4">
				<div className="flex items-center justify-between">
					<div className="flex items-center gap-2">
						<Icon className="size-4 text-muted-foreground" />
						<span className="text-sm font-medium">{title}</span>
					</div>
					<Badge
						variant="secondary"
						className="bg-emerald-500/10 text-emerald-500 text-xs"
					>
						<ArrowUpRight className="mr-0.5 size-3" />
						{change}
					</Badge>
				</div>
				<div className="mt-4 flex items-center gap-4">
					<ChartContainer config={chartConfig} className="size-24">
						<RadialBarChart
							innerRadius="70%"
							outerRadius="100%"
							data={chartData}
							startAngle={90}
							endAngle={-270}
						>
							<RadialBar
								dataKey="value"
								background={{ fill: 'var(--muted)' }}
								cornerRadius={10}
							>
								<Cell fill={color} />
							</RadialBar>
						</RadialBarChart>
					</ChartContainer>
					<div className="flex-1">
						<p className="text-3xl font-bold">{value}</p>
						<p className="text-sm text-muted-foreground">of {target}</p>
						<div className="mt-2 flex items-center gap-1 text-xs">
							<CheckCircle2 className="size-3 text-emerald-500" />
							<span className="text-muted-foreground">{description}</span>
						</div>
					</div>
				</div>
			</CardContent>
		</Card>
	);
};

export default function Main() {
	const radialMetrics: RadialCard[] = [
		{
			title: 'Revenue Goal',
			value: '$248K',
			target: '$300K',
			progress: 83,
			change: '+28%',
			icon: Target,
			description: '17% to goal',
			color: 'var(--chart-1)',
		},
		{
			title: 'Orders Goal',
			value: '6,842',
			target: '8,000',
			progress: 86,
			change: '+22%',
			icon: TrendingUp,
			description: '14% to goal',
			color: 'var(--chart-2)',
		},
		{
			title: 'Customer Goal',
			value: '847',
			target: '1,000',
			progress: 85,
			change: '+18%',
			icon: Target,
			description: '15% to goal',
			color: 'var(--chart-3)',
		},
		{
			title: 'Sales Target',
			value: '12,456',
			target: '15,000',
			progress: 83,
			change: '+24%',
			icon: TrendingUp,
			description: '17% to goal',
			color: 'var(--chart-4)',
		},
		{
			title: 'Time Saved',
			value: '142h',
			target: '160h',
			progress: 89,
			change: '+35%',
			icon: Clock,
			description: '11% to goal',
			color: 'var(--chart-5)',
		},
		{
			title: 'Efficiency',
			value: '92%',
			target: '95%',
			progress: 97,
			change: '+5%',
			icon: CheckCircle2,
			description: '3% to goal',
			color: 'var(--chart-1)',
		},
	];

	return (
		<section className="@container" data-theme="dashboard">
			<div className="mx-auto max-w-7xl px-4 py-8 @sm:px-6 @md:py-10 @2xl:px-8 @3xl:py-12">
				<div className="grid gap-4 @sm:grid-cols-2 @xl:grid-cols-3">
					{radialMetrics.map((metric, i) => (
						<RadialCardComponent key={i} {...metric} />
					))}
				</div>
			</div>
		</section>
	);
}
