'use client';

import { Cell, Pie, PieChart, RadialBar, RadialBarChart } from 'recharts';
import {
	ArrowUpRight,
	Briefcase,
	DollarSign,
	Flag,
	Percent,
	Target,
	Timer,
	TrendingUp,
	type LucideIcon,
} from 'lucide-react';

import { Badge } from '@/components/ui/badge';
import {
	Card,
	CardContent,
	CardDescription,
	CardHeader,
	CardTitle,
} from '@/components/ui/card';
import { ChartConfig, ChartContainer } from '@/components/ui/chart';
import { Progress } from '@/components/ui/progress';
import { Separator } from '@/components/ui/separator';

type OKRItem = {
	objective: string;
	keyResults: {
		title: string;
		progress: number;
		target: string;
	}[];
	overallProgress: number;
};

type SummaryKpi = {
	title: string;
	value: string;
	icon: LucideIcon;
	color: string;
};

const OKRCard = ({ objective, keyResults, overallProgress }: OKRItem) => (
	<Card>
		<CardHeader className="pb-3">
			<div className="flex items-start justify-between">
				<CardTitle className="text-base">{objective}</CardTitle>
				<Badge
					variant="secondary"
					className={
						overallProgress >= 70
							? 'bg-emerald-500/10 text-emerald-500'
							: 'bg-amber-500/10 text-amber-500'
					}
				>
					{overallProgress}%
				</Badge>
			</div>
			<Progress value={overallProgress} className="h-2" />
		</CardHeader>
		<CardContent className="space-y-3 pt-0">
			{keyResults.map((kr, i) => (
				<div key={i} className="space-y-1.5">
					<div className="flex items-center justify-between text-sm">
						<span>{kr.title}</span>
						<span className="text-muted-foreground">{kr.progress}%</span>
					</div>
					<Progress value={kr.progress} className="h-1.5" />
				</div>
			))}
		</CardContent>
	</Card>
);

const SummaryKpiCard = ({ title, value, icon: Icon, color }: SummaryKpi) => (
	<div className="flex items-center gap-3 rounded-xl border bg-card p-4">
		<div className={`rounded-lg p-2 ${color}`}>
			<Icon className="size-4" />
		</div>
		<div>
			<p className="text-xl font-bold">{value}</p>
			<p className="text-xs text-muted-foreground">{title}</p>
		</div>
	</div>
);

const chartConfig: ChartConfig = {
	value: { label: 'Progress' },
};

export default function Main() {
	const okrs: OKRItem[] = [
		{
			objective: 'Increase Market Share',
			keyResults: [
				{ title: 'Acquire 1000 new customers', progress: 85, target: '1,000' },
				{ title: 'Launch in 3 new regions', progress: 67, target: '3' },
				{ title: 'Achieve 4.5 NPS score', progress: 92, target: '4.5' },
			],
			overallProgress: 81,
		},
		{
			objective: 'Improve Operational Efficiency',
			keyResults: [
				{ title: 'Reduce shipping time by 20%', progress: 75, target: '20%' },
				{ title: 'Automate 50% of processes', progress: 60, target: '50%' },
				{ title: 'Zero critical incidents', progress: 100, target: '0' },
			],
			overallProgress: 78,
		},
		{
			objective: 'Drive Revenue Growth',
			keyResults: [
				{ title: 'Reach $1M monthly revenue', progress: 83, target: '$1M' },
				{ title: 'Increase AOV by 15%', progress: 90, target: '15%' },
				{ title: 'Launch premium tier', progress: 100, target: '1' },
			],
			overallProgress: 91,
		},
	];

	const summaryKpis: SummaryKpi[] = [
		{
			title: 'OKRs On Track',
			value: '8/9',
			icon: Target,
			color: 'bg-emerald-500/10 text-emerald-500',
		},
		{
			title: 'Avg Completion',
			value: '83%',
			icon: Percent,
			color: 'bg-primary/10 text-primary',
		},
		{
			title: 'Days Remaining',
			value: '21',
			icon: Timer,
			color: 'bg-amber-500/10 text-amber-500',
		},
		{
			title: 'Team Velocity',
			value: '+15%',
			icon: TrendingUp,
			color: 'bg-blue-500/10 text-blue-500',
		},
	];

	const pieData = okrs.map((okr, i) => ({
		name: okr.objective.split(' ')[0],
		value: okr.overallProgress,
		fill: `var(--chart-${i + 1})`,
	}));

	return (
		<section className="@container" data-theme="dashboard">
			<div className="mx-auto max-w-7xl px-4 py-8 @sm:px-6 @md:py-10 @2xl:px-8 @3xl:py-12">
				<div className="space-y-6">
					<div className="grid gap-4 @sm:grid-cols-2 @xl:grid-cols-4">
						{summaryKpis.map((kpi, i) => (
							<SummaryKpiCard key={i} {...kpi} />
						))}
					</div>
					<div className="grid gap-6 @xl:grid-cols-3">
						<div className="space-y-4 @xl:col-span-2">
							{okrs.map((okr, i) => (
								<OKRCard key={i} {...okr} />
							))}
						</div>
						<Card>
							<CardHeader>
								<CardTitle className="text-base">OKR Distribution</CardTitle>
								<CardDescription>Progress by objective</CardDescription>
							</CardHeader>
							<CardContent className="flex flex-col items-center">
								<ChartContainer
									config={chartConfig}
									className="h-[200px] w-[200px]"
								>
									<PieChart>
										<Pie
											data={pieData}
											dataKey="value"
											nameKey="name"
											innerRadius={60}
											outerRadius={90}
										>
											{pieData.map((entry, index) => (
												<Cell key={`cell-${index}`} fill={entry.fill} />
											))}
										</Pie>
									</PieChart>
								</ChartContainer>
								<div className="mt-6 w-full space-y-3">
									{okrs.map((okr, i) => (
										<div
											key={i}
											className="flex items-center justify-between text-sm"
										>
											<div className="flex items-center gap-2">
												<div
													className="size-3 rounded-full"
													style={{ backgroundColor: `var(--chart-${i + 1})` }}
												/>
												<span className="truncate max-w-[140px]">
													{okr.objective}
												</span>
											</div>
											<span className="font-medium">
												{okr.overallProgress}%
											</span>
										</div>
									))}
								</div>
							</CardContent>
						</Card>
					</div>
				</div>
			</div>
		</section>
	);
}
