'use client';

import {
	ArrowDownRight,
	ArrowUpRight,
	CreditCard,
	type LucideIcon,
	Percent,
	RefreshCcw,
	TrendingUp,
} from 'lucide-react';

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';

type StatCardProps = {
	icon: LucideIcon;
	title: string;
	value: string;
	change: number;
	trend: 'up' | 'down';
	progress: number;
	target: string;
};

const StatCard = ({
	icon: Icon,
	title,
	value,
	change,
	trend,
	progress,
	target,
}: StatCardProps) => (
	<Card className="group border-border/50 bg-card/80 backdrop-blur-sm transition-all duration-300 hover:border-primary/30">
		<CardHeader className="flex flex-row items-center justify-between pb-2">
			<CardTitle className="text-sm font-medium text-muted-foreground">
				{title}
			</CardTitle>
			<div className="rounded-lg bg-primary/10 p-2 transition-colors group-hover:bg-primary/20">
				<Icon className="size-4 text-primary" />
			</div>
		</CardHeader>
		<CardContent className="space-y-3">
			<div className="flex items-baseline gap-2">
				<span className="text-2xl @sm:text-3xl font-bold">{value}</span>
				<span
					className={`inline-flex items-center gap-0.5 text-xs font-medium ${trend === 'up' ? 'text-emerald-500' : 'text-rose-500'}`}
				>
					{trend === 'up' ? (
						<ArrowUpRight className="size-3" />
					) : (
						<ArrowDownRight className="size-3" />
					)}
					{Math.abs(change)}%
				</span>
			</div>
			<div className="space-y-1.5">
				<div className="flex items-center justify-between text-xs text-muted-foreground">
					<span>Progress to target</span>
					<span>{progress}%</span>
				</div>
				<Progress value={progress} className="h-1.5" />
				<p className="text-xs text-muted-foreground">Target: {target}</p>
			</div>
		</CardContent>
	</Card>
);

const stats: StatCardProps[] = [
	{
		icon: TrendingUp,
		title: 'Conversion Rate',
		value: '3.24%',
		change: 12.5,
		trend: 'up',
		progress: 72,
		target: '4.5%',
	},
	{
		icon: CreditCard,
		title: 'Avg. Order Value',
		value: '$127.50',
		change: 5.3,
		trend: 'up',
		progress: 85,
		target: '$150',
	},
	{
		icon: RefreshCcw,
		title: 'Return Rate',
		value: '2.1%',
		change: 0.8,
		trend: 'down',
		progress: 21,
		target: '<3%',
	},
	{
		icon: Percent,
		title: 'Profit Margin',
		value: '24.8%',
		change: 2.1,
		trend: 'up',
		progress: 83,
		target: '30%',
	},
];

export default function Main() {
	return (
		<section className="@container" data-theme="dashboard">
			<div className="mx-auto max-w-7xl px-4 @sm:px-6 @2xl:px-8 py-8 @md:py-12 @xl:py-16">
				<div className="grid grid-cols-1 @sm:grid-cols-2 @xl:grid-cols-4 gap-4 @lg:gap-6">
					{stats.map((stat, i) => (
						<StatCard key={i} {...stat} />
					))}
				</div>
			</div>
		</section>
	);
}
