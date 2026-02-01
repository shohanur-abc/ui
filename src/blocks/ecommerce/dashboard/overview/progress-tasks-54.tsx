'use client';

import { Cell, Pie, PieChart } from 'recharts';
import {
	Calendar,
	CheckCircle2,
	Clock,
	ListTodo,
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

type TaskStat = {
	title: string;
	value: number;
	icon: LucideIcon;
	color: string;
};

type TaskCategory = {
	name: string;
	completed: number;
	total: number;
	color: string;
};

type PieData = {
	name: string;
	value: number;
	fill: string;
};

const TaskStatCard = ({ title, value, icon: Icon, color }: TaskStat) => (
	<div className="flex items-center gap-3 rounded-xl border bg-card p-4">
		<div className={`rounded-lg p-2 ${color}`}>
			<Icon className="size-4" />
		</div>
		<div>
			<p className="text-2xl font-bold">{value}</p>
			<p className="text-xs text-muted-foreground">{title}</p>
		</div>
	</div>
);

const TaskCategoryRow = ({ name, completed, total, color }: TaskCategory) => {
	const percentage = Math.round((completed / total) * 100);

	return (
		<div className="space-y-2">
			<div className="flex items-center justify-between text-sm">
				<span>{name}</span>
				<span className="text-muted-foreground">
					{completed}/{total}
				</span>
			</div>
			<div className="h-2 overflow-hidden rounded-full bg-muted">
				<div
					className={`h-full rounded-full ${color}`}
					style={{ width: `${percentage}%` }}
				/>
			</div>
		</div>
	);
};

const chartConfig: ChartConfig = {
	value: { label: 'Tasks' },
};

export default function Main() {
	const stats: TaskStat[] = [
		{
			title: 'Total Tasks',
			value: 156,
			icon: ListTodo,
			color: 'bg-primary/10 text-primary',
		},
		{
			title: 'Completed',
			value: 98,
			icon: CheckCircle2,
			color: 'bg-emerald-500/10 text-emerald-500',
		},
		{
			title: 'In Progress',
			value: 42,
			icon: Clock,
			color: 'bg-amber-500/10 text-amber-500',
		},
		{
			title: 'Scheduled',
			value: 16,
			icon: Calendar,
			color: 'bg-blue-500/10 text-blue-500',
		},
	];

	const categories: TaskCategory[] = [
		{ name: 'Development', completed: 24, total: 30, color: 'bg-primary' },
		{ name: 'Design', completed: 18, total: 20, color: 'bg-emerald-500' },
		{ name: 'Marketing', completed: 32, total: 45, color: 'bg-amber-500' },
		{ name: 'Operations', completed: 24, total: 28, color: 'bg-blue-500' },
		{ name: 'Support', completed: 12, total: 33, color: 'bg-purple-500' },
	];

	const pieData: PieData[] = [
		{ name: 'Completed', value: 98, fill: 'var(--chart-2)' },
		{ name: 'In Progress', value: 42, fill: 'var(--chart-3)' },
		{ name: 'Scheduled', value: 16, fill: 'var(--chart-4)' },
	];

	const totalCompleted = 98;
	const totalTasks = 156;
	const completionRate = Math.round((totalCompleted / totalTasks) * 100);

	return (
		<section className="@container" data-theme="dashboard">
			<div className="mx-auto max-w-7xl px-4 py-8 @sm:px-6 @md:py-10 @2xl:px-8 @3xl:py-12">
				<div className="space-y-6">
					<div className="grid gap-4 @sm:grid-cols-2 @xl:grid-cols-4">
						{stats.map((stat, i) => (
							<TaskStatCard key={i} {...stat} />
						))}
					</div>
					<div className="grid gap-6 @xl:grid-cols-2">
						<Card>
							<CardHeader>
								<CardTitle>Task Completion</CardTitle>
								<CardDescription>Overall task progress</CardDescription>
							</CardHeader>
							<CardContent className="flex items-center gap-8">
								<ChartContainer config={chartConfig} className="size-[180px]">
									<PieChart>
										<Pie
											data={pieData}
											dataKey="value"
											nameKey="name"
											innerRadius={55}
											outerRadius={80}
										>
											{pieData.map((entry, index) => (
												<Cell key={`cell-${index}`} fill={entry.fill} />
											))}
										</Pie>
									</PieChart>
								</ChartContainer>
								<div className="flex-1 space-y-4">
									<div>
										<p className="text-4xl font-bold">{completionRate}%</p>
										<p className="text-sm text-muted-foreground">
											Completion Rate
										</p>
									</div>
									<div className="space-y-2">
										{pieData.map((item, i) => (
											<div
												key={i}
												className="flex items-center justify-between text-sm"
											>
												<div className="flex items-center gap-2">
													<div
														className="size-2.5 rounded-full"
														style={{ backgroundColor: item.fill }}
													/>
													<span>{item.name}</span>
												</div>
												<span className="font-medium">{item.value}</span>
											</div>
										))}
									</div>
								</div>
							</CardContent>
						</Card>
						<Card>
							<CardHeader>
								<CardTitle>By Category</CardTitle>
								<CardDescription>Progress across departments</CardDescription>
							</CardHeader>
							<CardContent className="space-y-4">
								{categories.map((category, i) => (
									<TaskCategoryRow key={i} {...category} />
								))}
							</CardContent>
						</Card>
					</div>
				</div>
			</div>
		</section>
	);
}
