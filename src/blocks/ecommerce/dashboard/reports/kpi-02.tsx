'use client';

import {
	ArrowUpRight,
	ArrowDownRight,
	Target,
	TrendingUp,
	BarChart3,
	Zap,
} from 'lucide-react';
import type { LucideIcon } from 'lucide-react';

import {
	Card,
	CardContent,
	CardDescription,
	CardHeader,
	CardTitle,
} from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';

type GoalKPIProps = {
	icon: LucideIcon;
	title: string;
	current: string;
	target: string;
	progress: number;
	trend: 'up' | 'down';
	trendValue: string;
};

const GoalKPI = ({
	icon: Icon,
	title,
	current,
	target,
	progress,
	trend,
	trendValue,
}: GoalKPIProps) => (
	<Card className="border-border/30 bg-card/60">
		<CardContent className="p-5">
			<div className="flex items-center justify-between">
				<div className="flex items-center gap-3">
					<div className="rounded-lg bg-muted/50 p-2">
						<Icon className="size-4 text-muted-foreground" />
					</div>
					<span className="font-medium">{title}</span>
				</div>
				<span
					className={`flex items-center text-xs ${
						trend === 'up' ? 'text-emerald-500' : 'text-rose-500'
					}`}
				>
					{trend === 'up' ? (
						<ArrowUpRight className="mr-0.5 size-3" />
					) : (
						<ArrowDownRight className="mr-0.5 size-3" />
					)}
					{trendValue}
				</span>
			</div>
			<div className="mt-4">
				<div className="flex items-baseline justify-between">
					<span className="text-2xl font-bold">{current}</span>
					<span className="text-sm text-muted-foreground">of {target}</span>
				</div>
				<Progress value={progress} className="mt-3 h-2" />
				<p className="mt-2 text-xs text-muted-foreground">
					{progress}% of target achieved
				</p>
			</div>
		</CardContent>
	</Card>
);

export default function Main() {
	const goals: GoalKPIProps[] = [
		{
			icon: Target,
			title: 'Revenue Goal',
			current: '$890K',
			target: '$1M',
			progress: 89,
			trend: 'up',
			trendValue: '+12.5%',
		},
		{
			icon: TrendingUp,
			title: 'Growth Rate',
			current: '18.2%',
			target: '20%',
			progress: 91,
			trend: 'up',
			trendValue: '+3.2%',
		},
		{
			icon: BarChart3,
			title: 'Market Share',
			current: '12.4%',
			target: '15%',
			progress: 83,
			trend: 'up',
			trendValue: '+1.8%',
		},
		{
			icon: Zap,
			title: 'Conversion Rate',
			current: '4.2%',
			target: '5%',
			progress: 84,
			trend: 'down',
			trendValue: '-0.3%',
		},
	];

	return (
		<section className="@container" data-theme="reports">
			<div className="mx-auto max-w-7xl px-4 py-8 @sm:px-6 @md:py-10 @2xl:px-8 @3xl:py-12">
				<Card className="border-border/50 bg-card/80 backdrop-blur-sm">
					<CardHeader>
						<CardTitle className="text-lg @sm:text-xl">
							Goal Progress Report
						</CardTitle>
						<CardDescription>
							Track progress toward quarterly business goals
						</CardDescription>
					</CardHeader>
					<CardContent>
						<div className="grid gap-4 @sm:grid-cols-2 @xl:grid-cols-4">
							{goals.map((goal, i) => (
								<GoalKPI key={i} {...goal} />
							))}
						</div>
					</CardContent>
				</Card>
			</div>
		</section>
	);
}
