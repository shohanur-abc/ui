'use client';

import { ArrowUp, ArrowDown, Minus, Activity } from 'lucide-react';

import {
	Card,
	CardContent,
	CardDescription,
	CardHeader,
	CardTitle,
} from '@/components/ui/card';

type StatCardProps = {
	label: string;
	value: string;
	previousValue: string;
	change: number;
	unit: string;
};

const StatCard = ({
	label,
	value,
	previousValue,
	change,
	unit,
}: StatCardProps) => {
	const isPositive = change > 0;
	const isNeutral = change === 0;

	return (
		<div className="rounded-xl border border-border/30 bg-gradient-to-br from-muted/30 to-transparent p-4">
			<p className="text-xs font-medium uppercase tracking-wider text-muted-foreground">
				{label}
			</p>
			<div className="mt-2 flex items-baseline gap-2">
				<span className="text-2xl font-bold @lg:text-3xl">{value}</span>
				<span className="text-xs text-muted-foreground">{unit}</span>
			</div>
			<div className="mt-3 flex items-center gap-2 border-t border-border/30 pt-3">
				<div
					className={`flex items-center gap-1 rounded-full px-2 py-0.5 text-xs font-medium ${
						isNeutral
							? 'bg-muted text-muted-foreground'
							: isPositive
								? 'bg-emerald-500/10 text-emerald-500'
								: 'bg-rose-500/10 text-rose-500'
					}`}
				>
					{isNeutral ? (
						<Minus className="size-3" />
					) : isPositive ? (
						<ArrowUp className="size-3" />
					) : (
						<ArrowDown className="size-3" />
					)}
					{Math.abs(change)}%
				</div>
				<span className="text-xs text-muted-foreground">
					vs {previousValue}
				</span>
			</div>
		</div>
	);
};

type HighlightProps = {
	title: string;
	value: string;
	description: string;
};

const Highlight = ({ title, value, description }: HighlightProps) => (
	<div className="flex items-center gap-4 rounded-lg bg-primary/5 p-4">
		<div className="rounded-full bg-primary/10 p-3">
			<Activity className="size-5 text-primary" />
		</div>
		<div>
			<p className="text-sm text-muted-foreground">{title}</p>
			<p className="text-xl font-bold">{value}</p>
			<p className="text-xs text-muted-foreground">{description}</p>
		</div>
	</div>
);

export default function Main() {
	const stats: StatCardProps[] = [
		{
			label: 'Gross Revenue',
			value: '$1.24M',
			previousValue: 'last month',
			change: 18.5,
			unit: 'USD',
		},
		{
			label: 'Net Profit',
			value: '$248K',
			previousValue: 'last month',
			change: 12.3,
			unit: 'USD',
		},
		{
			label: 'Profit Margin',
			value: '20.0%',
			previousValue: 'last month',
			change: -1.5,
			unit: '%',
		},
		{
			label: 'Operating Costs',
			value: '$992K',
			previousValue: 'last month',
			change: 22.1,
			unit: 'USD',
		},
		{
			label: 'Customer Acquisition',
			value: '$42.50',
			previousValue: 'last month',
			change: -8.2,
			unit: 'per customer',
		},
		{
			label: 'Lifetime Value',
			value: '$385',
			previousValue: 'last month',
			change: 5.4,
			unit: 'per customer',
		},
		{
			label: 'Payback Period',
			value: '3.2',
			previousValue: 'last month',
			change: 0,
			unit: 'months',
		},
		{
			label: 'Revenue per Visit',
			value: '$8.42',
			previousValue: 'last month',
			change: 6.8,
			unit: 'USD',
		},
	];

	const highlights: HighlightProps[] = [
		{
			title: 'Best Performing',
			value: 'Electronics',
			description: '+32% revenue growth',
		},
		{ title: 'Top Market', value: 'California', description: '$185K in sales' },
	];

	return (
		<section className="@container" data-theme="reports">
			<div className="mx-auto max-w-7xl px-4 py-8 @sm:px-6 @md:py-10 @2xl:px-8 @3xl:py-12">
				<Card className="border-border/50 bg-card/80 backdrop-blur-sm">
					<CardHeader>
						<CardTitle className="text-lg @sm:text-xl">
							Financial KPI Report
						</CardTitle>
						<CardDescription>
							Comprehensive financial performance metrics
						</CardDescription>
					</CardHeader>
					<CardContent className="space-y-6">
						<div className="grid gap-4 @sm:grid-cols-2 @lg:grid-cols-4">
							{stats.map((stat, i) => (
								<StatCard key={i} {...stat} />
							))}
						</div>
						<div className="grid gap-4 @md:grid-cols-2">
							{highlights.map((h, i) => (
								<Highlight key={i} {...h} />
							))}
						</div>
					</CardContent>
				</Card>
			</div>
		</section>
	);
}
