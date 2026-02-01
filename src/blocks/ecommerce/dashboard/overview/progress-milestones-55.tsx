'use client';

import { Area, AreaChart, XAxis, YAxis } from 'recharts';
import {
	ArrowUpRight,
	DollarSign,
	Package,
	ShoppingCart,
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
import {
	ChartConfig,
	ChartContainer,
	ChartTooltip,
	ChartTooltipContent,
} from '@/components/ui/chart';
import { Progress } from '@/components/ui/progress';

type KpiWithProgress = {
	title: string;
	value: string;
	target: string;
	progress: number;
	change: string;
	icon: LucideIcon;
};

type MilestoneItem = {
	label: string;
	value: string;
	achieved: boolean;
};

const KpiProgressCard = ({
	title,
	value,
	target,
	progress,
	change,
	icon: Icon,
}: KpiWithProgress) => (
	<Card>
		<CardContent className="p-5">
			<div className="flex items-center justify-between">
				<div className="flex items-center gap-3">
					<div className="rounded-lg bg-primary/10 p-2">
						<Icon className="size-4 text-primary" />
					</div>
					<span className="font-medium">{title}</span>
				</div>
				<Badge
					variant="secondary"
					className="bg-emerald-500/10 text-emerald-500 text-xs"
				>
					<ArrowUpRight className="mr-0.5 size-3" />
					{change}
				</Badge>
			</div>
			<div className="mt-4 flex items-end justify-between">
				<div>
					<p className="text-3xl font-bold">{value}</p>
					<p className="text-xs text-muted-foreground">Target: {target}</p>
				</div>
				<div className="text-right">
					<p className="text-xl font-semibold">{progress}%</p>
					<p className="text-xs text-muted-foreground">Complete</p>
				</div>
			</div>
			<Progress value={progress} className="mt-4 h-2" />
		</CardContent>
	</Card>
);

const MilestoneChip = ({ label, value, achieved }: MilestoneItem) => (
	<div
		className={`rounded-full px-3 py-1.5 text-xs font-medium ${
			achieved
				? 'bg-emerald-500/10 text-emerald-500'
				: 'bg-muted text-muted-foreground'
		}`}
	>
		{label}: {value}
	</div>
);

const chartConfig: ChartConfig = {
	current: { label: 'Current', color: 'var(--chart-1)' },
	target: { label: 'Target', color: 'var(--chart-2)' },
};

export default function Main() {
	const kpis: KpiWithProgress[] = [
		{
			title: 'Revenue',
			value: '$248K',
			target: '$300K',
			progress: 83,
			change: '+28%',
			icon: DollarSign,
		},
		{
			title: 'Orders',
			value: '6,842',
			target: '8,000',
			progress: 85,
			change: '+22%',
			icon: ShoppingCart,
		},
		{
			title: 'Products Sold',
			value: '12.4K',
			target: '15K',
			progress: 83,
			change: '+18%',
			icon: Package,
		},
		{
			title: 'Growth Rate',
			value: '28%',
			target: '35%',
			progress: 80,
			change: '+5%',
			icon: TrendingUp,
		},
	];

	const milestones: MilestoneItem[] = [
		{ label: '25%', value: '$75K', achieved: true },
		{ label: '50%', value: '$150K', achieved: true },
		{ label: '75%', value: '$225K', achieved: true },
		{ label: '100%', value: '$300K', achieved: false },
	];

	const chartData = [
		{ week: 'W1', current: 45000, target: 75000 },
		{ week: 'W2', current: 98000, target: 150000 },
		{ week: 'W3', current: 178000, target: 225000 },
		{ week: 'W4', current: 248000, target: 300000 },
	];

	return (
		<section className="@container" data-theme="dashboard">
			<div className="mx-auto max-w-7xl px-4 py-8 @sm:px-6 @md:py-10 @2xl:px-8 @3xl:py-12">
				<div className="space-y-6">
					<div className="grid gap-4 @sm:grid-cols-2">
						{kpis.map((kpi, i) => (
							<KpiProgressCard key={i} {...kpi} />
						))}
					</div>
					<Card>
						<CardHeader>
							<CardTitle>Revenue Progress</CardTitle>
							<CardDescription>
								Current vs Target progress over time
							</CardDescription>
						</CardHeader>
						<CardContent>
							<div className="mb-6 flex flex-wrap gap-2">
								{milestones.map((milestone, i) => (
									<MilestoneChip key={i} {...milestone} />
								))}
							</div>
							<ChartContainer config={chartConfig} className="h-[240px] w-full">
								<AreaChart data={chartData}>
									<defs>
										<linearGradient
											id="progress55current"
											x1="0"
											y1="0"
											x2="0"
											y2="1"
										>
											<stop
												offset="5%"
												stopColor="var(--color-current)"
												stopOpacity={0.3}
											/>
											<stop
												offset="95%"
												stopColor="var(--color-current)"
												stopOpacity={0}
											/>
										</linearGradient>
									</defs>
									<XAxis dataKey="week" tickLine={false} axisLine={false} />
									<YAxis
										tickLine={false}
										axisLine={false}
										tickFormatter={(value) => `$${value / 1000}K`}
									/>
									<ChartTooltip content={<ChartTooltipContent />} />
									<Area
										type="monotone"
										dataKey="target"
										stroke="var(--color-target)"
										strokeDasharray="5 5"
										fill="transparent"
									/>
									<Area
										type="monotone"
										dataKey="current"
										stroke="var(--color-current)"
										fill="url(#progress55current)"
									/>
								</AreaChart>
							</ChartContainer>
						</CardContent>
					</Card>
				</div>
			</div>
		</section>
	);
}
