'use client';

import { Cell, Pie, PieChart, RadialBar, RadialBarChart } from 'recharts';
import {
	ArrowUpRight,
	CheckCircle2,
	Clock,
	DollarSign,
	Flag,
	Package,
	ShoppingCart,
	Target,
	TrendingUp,
	Users,
	type LucideIcon,
} from 'lucide-react';

import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import {
	ChartConfig,
	ChartContainer,
	ChartTooltip,
	ChartTooltipContent,
} from '@/components/ui/chart';

type GoalItem = {
	title: string;
	current: number;
	target: number;
	icon: LucideIcon;
	color: string;
};

type MilestoneItem = {
	title: string;
	progress: number;
	deadline: string;
	status: 'on-track' | 'at-risk' | 'completed';
};

type RadialDataItem = {
	name: string;
	value: number;
	fill: string;
};

const GoalCard = ({ title, current, target, icon: Icon, color }: GoalItem) => {
	const percentage = Math.min((current / target) * 100, 100);
	return (
		<Card className="group transition-all hover:border-primary/50">
			<CardContent className="p-4">
				<div className="flex items-center gap-3">
					<div className={`rounded-lg p-2 ${color}`}>
						<Icon className="size-4" />
					</div>
					<div className="flex-1">
						<p className="text-sm font-medium">{title}</p>
						<div className="flex items-baseline gap-1">
							<span className="text-xl font-bold">{current.toLocaleString()}</span>
							<span className="text-xs text-muted-foreground">
								/ {target.toLocaleString()}
							</span>
						</div>
					</div>
					<span className="text-sm font-medium text-primary">
						{percentage.toFixed(0)}%
					</span>
				</div>
				<Progress value={percentage} className="mt-3 h-2" />
			</CardContent>
		</Card>
	);
};

const getStatusStyle = (status: MilestoneItem['status']) => {
	switch (status) {
		case 'completed':
			return 'bg-emerald-500/10 text-emerald-500';
		case 'on-track':
			return 'bg-primary/10 text-primary';
		case 'at-risk':
			return 'bg-amber-500/10 text-amber-500';
	}
};

const MilestoneRow = ({ title, progress, deadline, status }: MilestoneItem) => (
	<div className="rounded-lg border bg-card/50 p-4 transition-all hover:bg-card">
		<div className="flex items-start justify-between">
			<div className="flex-1">
				<p className="font-medium">{title}</p>
				<div className="mt-1 flex items-center gap-2 text-xs text-muted-foreground">
					<Clock className="size-3" />
					{deadline}
				</div>
			</div>
			<Badge variant="secondary" className={getStatusStyle(status)}>
				{status.replace('-', ' ')}
			</Badge>
		</div>
		<div className="mt-3">
			<div className="flex justify-between text-xs text-muted-foreground mb-1">
				<span>Progress</span>
				<span>{progress}%</span>
			</div>
			<Progress value={progress} className="h-1.5" />
		</div>
	</div>
);

const radialConfig: ChartConfig = {
	value: { label: 'Progress' },
};

const pieConfig: ChartConfig = {
	value: { label: 'Value' },
};

export default function Main() {
	const goals: GoalItem[] = [
		{ title: 'Monthly Revenue', current: 78432, target: 100000, icon: DollarSign, color: 'bg-primary/10 text-primary' },
		{ title: 'New Customers', current: 234, target: 300, icon: Users, color: 'bg-emerald-500/10 text-emerald-500' },
		{ title: 'Total Orders', current: 1847, target: 2000, icon: ShoppingCart, color: 'bg-amber-500/10 text-amber-500' },
		{ title: 'Products Sold', current: 3456, target: 4000, icon: Package, color: 'bg-blue-500/10 text-blue-500' },
	];

	const milestones: MilestoneItem[] = [
		{ title: 'Q1 Revenue Target', progress: 92, deadline: 'Mar 31, 2024', status: 'on-track' },
		{ title: 'New Product Launch', progress: 78, deadline: 'Apr 15, 2024', status: 'on-track' },
		{ title: 'Customer Acquisition Goal', progress: 45, deadline: 'Apr 30, 2024', status: 'at-risk' },
		{ title: '1000 5-Star Reviews', progress: 100, deadline: 'Completed', status: 'completed' },
	];

	const radialData: RadialDataItem[] = [
		{ name: 'Revenue', value: 78, fill: 'var(--chart-1)' },
		{ name: 'Orders', value: 92, fill: 'var(--chart-2)' },
		{ name: 'Customers', value: 78, fill: 'var(--chart-3)' },
	];

	const pieData = [
		{ name: 'Completed', value: 65, fill: 'var(--chart-1)' },
		{ name: 'In Progress', value: 25, fill: 'var(--chart-2)' },
		{ name: 'Not Started', value: 10, fill: 'var(--chart-3)' },
	];

	return (
		<section className="@container" data-theme="dashboard">
			<div className="mx-auto max-w-7xl px-4 py-8 @sm:px-6 @md:py-10 @2xl:px-8 @3xl:py-12">
				<div className="grid gap-6 @xl:grid-cols-2">
					<div className="space-y-4">
						<div className="grid grid-cols-2 gap-4">
							{goals.map((goal, i) => (
								<GoalCard key={i} {...goal} />
							))}
						</div>
						<Card>
							<CardHeader className="pb-2">
								<div className="flex items-center gap-2">
									<Target className="size-4 text-muted-foreground" />
									<CardTitle className="text-base">Overall Progress</CardTitle>
								</div>
							</CardHeader>
							<CardContent className="flex items-center gap-6">
								<ChartContainer config={pieConfig} className="h-[140px] w-[140px]">
									<PieChart>
										<ChartTooltip content={<ChartTooltipContent hideLabel />} />
										<Pie
											data={pieData}
											dataKey="value"
											nameKey="name"
											innerRadius={40}
											outerRadius={65}
										>
											{pieData.map((entry, index) => (
												<Cell key={`cell-${index}`} fill={entry.fill} />
											))}
										</Pie>
									</PieChart>
								</ChartContainer>
								<div className="flex-1 space-y-2">
									{pieData.map((item, i) => (
										<div key={i} className="flex items-center justify-between">
											<div className="flex items-center gap-2">
												<div
													className="size-2.5 rounded-full"
													style={{ backgroundColor: item.fill }}
												/>
												<span className="text-sm">{item.name}</span>
											</div>
											<span className="text-sm font-medium">{item.value}%</span>
										</div>
									))}
								</div>
							</CardContent>
						</Card>
					</div>
					<Card>
						<CardHeader className="pb-4">
							<div className="flex items-center gap-2">
								<Flag className="size-4 text-muted-foreground" />
								<CardTitle className="text-base">Key Milestones</CardTitle>
							</div>
						</CardHeader>
						<CardContent className="space-y-4 pt-0">
							{milestones.map((milestone, i) => (
								<MilestoneRow key={i} {...milestone} />
							))}
						</CardContent>
					</Card>
				</div>
			</div>
		</section>
	);
}
