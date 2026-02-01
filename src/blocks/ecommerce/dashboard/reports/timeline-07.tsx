'use client';

import { Area, AreaChart, CartesianGrid, XAxis, YAxis } from 'recharts';
import { Target, ArrowUp, ArrowDown, Minus } from 'lucide-react';

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
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';

type MilestoneData = {
	month: string;
	actual: number;
	target: number;
};

type MilestoneCardProps = {
	title: string;
	current: string;
	target: string;
	progress: number;
	status: 'ahead' | 'on-track' | 'behind';
};

const MilestoneCard = ({
	title,
	current,
	target,
	progress,
	status,
}: MilestoneCardProps) => {
	const statusConfig = {
		ahead: {
			icon: ArrowUp,
			color: 'text-emerald-500',
			bgColor: 'bg-emerald-500',
		},
		'on-track': {
			icon: Minus,
			color: 'text-amber-500',
			bgColor: 'bg-amber-500',
		},
		behind: { icon: ArrowDown, color: 'text-rose-500', bgColor: 'bg-rose-500' },
	};
	const { icon: Icon, color, bgColor } = statusConfig[status];

	return (
		<Card className="border-border/30 bg-card/60">
			<CardContent className="p-4">
				<div className="flex items-center justify-between">
					<p className="text-sm text-muted-foreground">{title}</p>
					<Badge
						variant="outline"
						className={`${color} border-current/20 bg-current/10`}
					>
						<Icon className="mr-1 size-3" />
						{status}
					</Badge>
				</div>
				<div className="mt-2 flex items-baseline gap-2">
					<span className="text-2xl font-bold">{current}</span>
					<span className="text-sm text-muted-foreground">/ {target}</span>
				</div>
				<Progress value={progress} className="mt-3 h-2" />
			</CardContent>
		</Card>
	);
};

const chartConfig: ChartConfig = {
	actual: {
		label: 'Actual',
		color: 'var(--chart-1)',
	},
	target: {
		label: 'Target',
		color: 'var(--chart-3)',
	},
};

export default function Main() {
	const milestones: MilestoneCardProps[] = [
		{
			title: 'Revenue Target',
			current: '$12.5M',
			target: '$15M',
			progress: 83,
			status: 'on-track',
		},
		{
			title: 'New Customers',
			current: '15,420',
			target: '12,000',
			progress: 100,
			status: 'ahead',
		},
		{
			title: 'Orders Target',
			current: '42,800',
			target: '50,000',
			progress: 85,
			status: 'on-track',
		},
		{
			title: 'Retention Goal',
			current: '68%',
			target: '75%',
			progress: 90,
			status: 'behind',
		},
	];

	const chartData: MilestoneData[] = [
		{ month: 'Jan', actual: 850000, target: 1000000 },
		{ month: 'Feb', actual: 1750000, target: 2000000 },
		{ month: 'Mar', actual: 2850000, target: 3500000 },
		{ month: 'Apr', actual: 3950000, target: 4500000 },
		{ month: 'May', actual: 5250000, target: 6000000 },
		{ month: 'Jun', actual: 6500000, target: 7500000 },
		{ month: 'Jul', actual: 7800000, target: 9000000 },
		{ month: 'Aug', actual: 9200000, target: 10500000 },
		{ month: 'Sep', actual: 10500000, target: 12000000 },
		{ month: 'Oct', actual: 11800000, target: 13500000 },
		{ month: 'Nov', actual: 12500000, target: 14500000 },
		{ month: 'Dec', actual: null, target: 15000000 },
	];

	return (
		<section className="@container" data-theme="reports">
			<div className="mx-auto max-w-7xl px-4 py-8 @sm:px-6 @md:py-10 @2xl:px-8 @3xl:py-12">
				<Card className="border-border/50 bg-card/80 backdrop-blur-sm">
					<CardHeader className="flex flex-col gap-2 @sm:flex-row @sm:items-center @sm:justify-between">
						<div className="flex items-start gap-3">
							<div className="rounded-lg bg-primary/10 p-2">
								<Target className="size-5 text-primary" />
							</div>
							<div>
								<CardTitle className="text-lg @sm:text-xl">
									Goal Progress Timeline
								</CardTitle>
								<CardDescription>
									Tracking annual goals and milestones
								</CardDescription>
							</div>
						</div>
						<Badge variant="outline">83% Overall Progress</Badge>
					</CardHeader>
					<CardContent className="space-y-6">
						<div className="grid gap-4 @sm:grid-cols-2 @xl:grid-cols-4">
							{milestones.map((m, i) => (
								<MilestoneCard key={i} {...m} />
							))}
						</div>
						<ChartContainer config={chartConfig} className="h-[320px] w-full">
							<AreaChart data={chartData} margin={{ left: 12, right: 12 }}>
								<CartesianGrid strokeDasharray="3 3" vertical={false} />
								<XAxis
									dataKey="month"
									tickLine={false}
									axisLine={false}
									tickMargin={8}
								/>
								<YAxis
									tickLine={false}
									axisLine={false}
									tickMargin={8}
									tickFormatter={(v) => `$${v / 1000000}M`}
								/>
								<ChartTooltip content={<ChartTooltipContent />} />
								<Area
									type="monotone"
									dataKey="target"
									stroke="var(--color-target)"
									fill="var(--color-target)"
									fillOpacity={0.1}
									strokeDasharray="4 4"
								/>
								<Area
									type="monotone"
									dataKey="actual"
									stroke="var(--color-actual)"
									fill="var(--color-actual)"
									fillOpacity={0.3}
								/>
							</AreaChart>
						</ChartContainer>
					</CardContent>
				</Card>
			</div>
		</section>
	);
}
