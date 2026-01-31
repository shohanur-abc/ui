'use client';

import { RadialBar, RadialBarChart } from 'recharts';
import {
	ArrowUpRight,
	Calendar,
	Clock,
	Flag,
	Target,
	TrendingUp,
	type LucideIcon,
} from 'lucide-react';

import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import {
	ChartConfig,
	ChartContainer,
} from '@/components/ui/chart';
import { Progress } from '@/components/ui/progress';

type QuarterlyGoal = {
	title: string;
	current: string;
	target: string;
	progress: number;
	daysLeft: number;
	icon: LucideIcon;
	color: string;
};

type RadialData = {
	name: string;
	value: number;
	fill: string;
};

const QuarterlyGoalCard = ({ title, current, target, progress, daysLeft, icon: Icon, color }: QuarterlyGoal) => (
	<Card>
		<CardContent className="p-5">
			<div className="flex items-center gap-3">
				<div className={`rounded-lg p-2 ${color}`}>
					<Icon className="size-4" />
				</div>
				<div className="flex-1">
					<p className="font-medium">{title}</p>
					<p className="text-xs text-muted-foreground">{daysLeft} days left</p>
				</div>
				<Badge
					variant="secondary"
					className={progress >= 100 ? 'bg-emerald-500/10 text-emerald-500' : 'bg-primary/10 text-primary'}
				>
					{progress}%
				</Badge>
			</div>
			<Progress value={progress} className="mt-4 h-2" />
			<div className="mt-2 flex items-center justify-between text-sm">
				<span className="font-medium">{current}</span>
				<span className="text-muted-foreground">/ {target}</span>
			</div>
		</CardContent>
	</Card>
);

const chartConfig: ChartConfig = {
	value: { label: 'Progress' },
};

export default function Main() {
	const goals: QuarterlyGoal[] = [
		{ title: 'Quarterly Revenue', current: '$720K', target: '$900K', progress: 80, daysLeft: 21, icon: TrendingUp, color: 'bg-primary/10 text-primary' },
		{ title: 'New Customers', current: '845', target: '1,000', progress: 85, daysLeft: 21, icon: Target, color: 'bg-emerald-500/10 text-emerald-500' },
		{ title: 'Product Launches', current: '8', target: '12', progress: 67, daysLeft: 21, icon: Flag, color: 'bg-amber-500/10 text-amber-500' },
		{ title: 'Support Resolution', current: '94%', target: '95%', progress: 99, daysLeft: 21, icon: Clock, color: 'bg-blue-500/10 text-blue-500' },
	];

	const radialData: RadialData[] = [
		{ name: 'Q1', value: 100, fill: 'var(--chart-1)' },
		{ name: 'Q2', value: 100, fill: 'var(--chart-2)' },
		{ name: 'Q3', value: 100, fill: 'var(--chart-3)' },
		{ name: 'Q4', value: 83, fill: 'var(--chart-4)' },
	];

	return (
		<section className="@container" data-theme="dashboard">
			<div className="mx-auto max-w-7xl px-4 py-8 @sm:px-6 @md:py-10 @2xl:px-8 @3xl:py-12">
				<div className="grid gap-6 @xl:grid-cols-3">
					<div className="space-y-4 @xl:col-span-2">
						<Card>
							<CardHeader className="flex-row items-center gap-2 pb-2">
								<Calendar className="size-5 text-primary" />
								<div>
									<CardTitle className="text-base">Q4 2024 Goals</CardTitle>
									<CardDescription>21 days remaining</CardDescription>
								</div>
							</CardHeader>
						</Card>
						<div className="grid gap-4 @sm:grid-cols-2">
							{goals.map((goal, i) => (
								<QuarterlyGoalCard key={i} {...goal} />
							))}
						</div>
					</div>
					<Card>
						<CardHeader>
							<CardTitle className="text-base">Yearly Progress</CardTitle>
							<CardDescription>Quarterly achievements</CardDescription>
						</CardHeader>
						<CardContent className="flex flex-col items-center">
							<ChartContainer config={chartConfig} className="h-[180px] w-[180px]">
								<RadialBarChart
									innerRadius="30%"
									outerRadius="100%"
									data={radialData}
									startAngle={180}
									endAngle={-180}
								>
									<RadialBar
										dataKey="value"
										background
										cornerRadius={4}
									/>
								</RadialBarChart>
							</ChartContainer>
							<div className="mt-6 w-full space-y-3">
								{radialData.map((item, i) => (
									<div key={i} className="flex items-center justify-between">
										<div className="flex items-center gap-2">
											<div
												className="size-3 rounded-full"
												style={{ backgroundColor: item.fill }}
											/>
											<span className="text-sm">{item.name}</span>
										</div>
										<div className="flex items-center gap-2">
											<Progress value={item.value} className="h-1.5 w-16" />
											<span className="text-sm font-medium">{item.value}%</span>
										</div>
									</div>
								))}
							</div>
						</CardContent>
					</Card>
				</div>
			</div>
		</section>
	);
}
