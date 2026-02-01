'use client';

import * as React from 'react';
import {
	TrendingUp,
	TrendingDown,
	BarChart3,
	PieChart,
	Calendar,
	Users,
	Eye,
	ShoppingCart,
	DollarSign,
	Target,
} from 'lucide-react';

import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from '@/components/ui/select';
import { Progress } from '@/components/ui/progress';

interface VelocityMetricProps {
	icon: React.ElementType;
	label: string;
	value: string;
	period: string;
	change: number;
}

const VelocityMetric = ({
	icon: Icon,
	label,
	value,
	period,
	change,
}: VelocityMetricProps) => {
	const isPositive = change >= 0;

	return (
		<div className="rounded-lg border bg-card p-4">
			<div className="mb-2 flex items-center gap-2 text-muted-foreground">
				<Icon className="size-4" />
				<span className="text-sm">{label}</span>
			</div>
			<p className="text-2xl font-bold">{value}</p>
			<p className="text-xs text-muted-foreground">{period}</p>
			<div
				className={`mt-2 flex items-center gap-1 text-sm ${isPositive ? 'text-emerald-500' : 'text-red-500'}`}
			>
				{isPositive ? (
					<TrendingUp className="size-3.5" />
				) : (
					<TrendingDown className="size-3.5" />
				)}
				<span>
					{isPositive ? '+' : ''}
					{change}%
				</span>
			</div>
		</div>
	);
};

interface SalesVelocityChartProps {
	title: string;
	data: { period: string; value: number }[];
}

const SalesVelocityChart = ({ title, data }: SalesVelocityChartProps) => {
	const max = Math.max(...data.map((d) => d.value));

	return (
		<div className="rounded-lg border bg-card p-4">
			<h3 className="mb-4 font-semibold">{title}</h3>
			<div className="flex h-48 items-end gap-2">
				{data.map((item) => (
					<div
						key={item.period}
						className="flex flex-1 flex-col items-center gap-2"
					>
						<div
							className="w-full rounded-t bg-primary/20 transition-all hover:bg-primary/30"
							style={{ height: `${(item.value / max) * 100}%` }}
						>
							<div
								className="h-full w-full rounded-t bg-primary opacity-80"
								style={{ height: `${(item.value / max) * 100}%` }}
							/>
						</div>
						<span className="text-xs text-muted-foreground">{item.period}</span>
					</div>
				))}
			</div>
		</div>
	);
};

interface DayOfWeekDistributionProps {
	title: string;
	distribution: { day: string; percent: number }[];
}

const DayOfWeekDistribution = ({
	title,
	distribution,
}: DayOfWeekDistributionProps) => (
	<div className="rounded-lg border bg-card p-4">
		<h3 className="mb-4 font-semibold">{title}</h3>
		<div className="space-y-3">
			{distribution.map((item) => (
				<div key={item.day}>
					<div className="mb-1 flex items-center justify-between text-sm">
						<span>{item.day}</span>
						<span className="font-medium">{item.percent}%</span>
					</div>
					<Progress value={item.percent} className="h-2" />
				</div>
			))}
		</div>
	</div>
);

interface TimeOfDayHeatmapProps {
	title: string;
	hours: number[];
	days: string[];
	data: number[][];
}

const TimeOfDayHeatmap = ({
	title,
	hours,
	days,
	data,
}: TimeOfDayHeatmapProps) => {
	const max = Math.max(...data.flat());

	return (
		<div className="rounded-lg border bg-card p-4">
			<h3 className="mb-4 font-semibold">{title}</h3>
			<div className="overflow-x-auto">
				<div className="min-w-[400px]">
					<div className="mb-2 flex gap-1 pl-12">
						{hours.map((hour) => (
							<div
								key={hour}
								className="flex-1 text-center text-xs text-muted-foreground"
							>
								{hour}h
							</div>
						))}
					</div>
					{days.map((day, dayIdx) => (
						<div key={day} className="flex items-center gap-1">
							<span className="w-10 text-xs text-muted-foreground">{day}</span>
							{data[dayIdx]?.map((value, hourIdx) => (
								<div
									key={hourIdx}
									className="flex h-6 flex-1 items-center justify-center rounded"
									style={{
										backgroundColor: `rgba(var(--primary), ${(value / max) * 0.8 + 0.1})`,
									}}
								>
									<span className="text-[10px] text-primary-foreground">
										{value > 0 ? value : ''}
									</span>
								</div>
							))}
						</div>
					))}
				</div>
			</div>
		</div>
	);
};

interface TopSellingVariantsProps {
	variants: { name: string; sold: number; revenue: number }[];
}

const TopSellingVariants = ({ variants }: TopSellingVariantsProps) => {
	const maxSold = Math.max(...variants.map((v) => v.sold));

	return (
		<div className="rounded-lg border bg-card p-4">
			<h3 className="mb-4 font-semibold">Top Selling Variants</h3>
			<div className="space-y-3">
				{variants.map((variant, idx) => (
					<div key={variant.name} className="flex items-center gap-3">
						<span className="w-6 text-sm font-bold text-muted-foreground">
							#{idx + 1}
						</span>
						<div className="flex-1">
							<p className="text-sm font-medium">{variant.name}</p>
							<div className="mt-1 h-2 overflow-hidden rounded-full bg-muted">
								<div
									className="h-full bg-primary"
									style={{ width: `${(variant.sold / maxSold) * 100}%` }}
								/>
							</div>
						</div>
						<div className="text-right">
							<p className="text-sm font-medium">{variant.sold} sold</p>
							<p className="text-xs text-muted-foreground">
								${variant.revenue.toLocaleString()}
							</p>
						</div>
					</div>
				))}
			</div>
		</div>
	);
};

export default function Main() {
	const [period, setPeriod] = React.useState('30d');

	const metrics = [
		{
			icon: ShoppingCart,
			label: 'Units Sold',
			value: '1,234',
			period: 'per month',
			change: 15.2,
		},
		{
			icon: DollarSign,
			label: 'Revenue',
			value: '$45,678',
			period: 'per month',
			change: 23.1,
		},
		{
			icon: Target,
			label: 'Conversion Rate',
			value: '3.2%',
			period: 'avg',
			change: 0.5,
		},
		{
			icon: Eye,
			label: 'Views to Sale',
			value: '31:1',
			period: 'ratio',
			change: -8.2,
		},
	];

	const weeklyData = [
		{ period: 'W1', value: 234 },
		{ period: 'W2', value: 312 },
		{ period: 'W3', value: 287 },
		{ period: 'W4', value: 401 },
	];

	const dayDistribution = [
		{ day: 'Monday', percent: 12 },
		{ day: 'Tuesday', percent: 14 },
		{ day: 'Wednesday', percent: 16 },
		{ day: 'Thursday', percent: 18 },
		{ day: 'Friday', percent: 20 },
		{ day: 'Saturday', percent: 12 },
		{ day: 'Sunday', percent: 8 },
	];

	const variants = [
		{ name: 'Black / Large', sold: 145, revenue: 7250 },
		{ name: 'White / Medium', sold: 132, revenue: 6600 },
		{ name: 'Blue / Large', sold: 98, revenue: 4900 },
		{ name: 'Black / Medium', sold: 87, revenue: 4350 },
	];

	return (
		<section className="@container" data-theme="dashboard">
			<div className="mx-auto max-w-5xl space-y-6 px-4 py-8 @sm:px-6 @2xl:px-8">
				<div className="flex items-center justify-between">
					<div className="flex items-center gap-3">
						<BarChart3 className="size-5" />
						<h2 className="text-xl font-semibold">Sales Velocity</h2>
					</div>
					<Select value={period} onValueChange={setPeriod}>
						<SelectTrigger className="w-36">
							<Calendar className="mr-2 size-4" />
							<SelectValue />
						</SelectTrigger>
						<SelectContent>
							<SelectItem value="7d">Last 7 days</SelectItem>
							<SelectItem value="30d">Last 30 days</SelectItem>
							<SelectItem value="90d">Last 90 days</SelectItem>
						</SelectContent>
					</Select>
				</div>

				<div className="grid gap-4 @sm:grid-cols-2 @lg:grid-cols-4">
					{metrics.map((metric) => (
						<VelocityMetric key={metric.label} {...metric} />
					))}
				</div>

				<div className="grid gap-6 @lg:grid-cols-2">
					<SalesVelocityChart title="Weekly Sales Volume" data={weeklyData} />
					<DayOfWeekDistribution
						title="Sales by Day of Week"
						distribution={dayDistribution}
					/>
				</div>

				<div className="grid gap-6 @lg:grid-cols-2">
					<TopSellingVariants variants={variants} />
					<div className="rounded-lg border bg-card p-4">
						<h3 className="mb-4 font-semibold">Velocity Trends</h3>
						<div className="flex h-48 items-center justify-center rounded-lg bg-muted/30">
							<PieChart className="size-12 text-muted-foreground" />
						</div>
					</div>
				</div>
			</div>
		</section>
	);
}
