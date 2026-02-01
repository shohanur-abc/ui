'use client';

import {
	Line,
	LineChart,
	CartesianGrid,
	XAxis,
	YAxis,
	Area,
	ComposedChart,
} from 'recharts';
import { Users, UserPlus, UserMinus } from 'lucide-react';
import type { LucideIcon } from 'lucide-react';

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

type CustomerData = {
	month: string;
	acquired: number;
	churned: number;
	net: number;
};

type StatCardProps = {
	icon: LucideIcon;
	label: string;
	value: string;
	subtext: string;
	iconColor: string;
};

const StatCard = ({
	icon: Icon,
	label,
	value,
	subtext,
	iconColor,
}: StatCardProps) => (
	<div className="flex items-center gap-3 rounded-lg bg-muted/50 px-4 py-3">
		<div className={`rounded-md p-2 ${iconColor}`}>
			<Icon className="size-4" />
		</div>
		<div>
			<p className="text-xs text-muted-foreground">{label}</p>
			<p className="font-bold">{value}</p>
			<p className="text-xs text-muted-foreground">{subtext}</p>
		</div>
	</div>
);

const chartConfig: ChartConfig = {
	acquired: {
		label: 'Acquired',
		color: 'oklch(0.7 0.18 160)',
	},
	churned: {
		label: 'Churned',
		color: 'oklch(0.62 0.24 25)',
	},
	net: {
		label: 'Net Growth',
		color: 'var(--chart-1)',
	},
};

export default function Main() {
	const stats: StatCardProps[] = [
		{
			icon: Users,
			label: 'Total Customers',
			value: '24,580',
			subtext: '+12% growth',
			iconColor: 'bg-primary/10 text-primary',
		},
		{
			icon: UserPlus,
			label: 'Acquired (YTD)',
			value: '4,820',
			subtext: 'Avg 402/month',
			iconColor: 'bg-emerald-500/10 text-emerald-500',
		},
		{
			icon: UserMinus,
			label: 'Churned (YTD)',
			value: '1,245',
			subtext: '5.1% rate',
			iconColor: 'bg-rose-500/10 text-rose-500',
		},
	];

	const chartData: CustomerData[] = [
		{ month: 'Jan', acquired: 380, churned: 95, net: 285 },
		{ month: 'Feb', acquired: 420, churned: 88, net: 332 },
		{ month: 'Mar', acquired: 465, churned: 102, net: 363 },
		{ month: 'Apr', acquired: 398, churned: 115, net: 283 },
		{ month: 'May', acquired: 445, churned: 98, net: 347 },
		{ month: 'Jun', acquired: 512, churned: 108, net: 404 },
		{ month: 'Jul', acquired: 478, churned: 112, net: 366 },
		{ month: 'Aug', acquired: 502, churned: 95, net: 407 },
		{ month: 'Sep', acquired: 425, churned: 105, net: 320 },
		{ month: 'Oct', acquired: 458, churned: 118, net: 340 },
		{ month: 'Nov', acquired: 489, churned: 102, net: 387 },
		{ month: 'Dec', acquired: 548, churned: 107, net: 441 },
	];

	return (
		<section className="@container" data-theme="reports">
			<div className="mx-auto max-w-7xl px-4 py-8 @sm:px-6 @md:py-10 @2xl:px-8 @3xl:py-12">
				<Card className="border-border/50 bg-card/80 backdrop-blur-sm">
					<CardHeader>
						<CardTitle className="text-lg @sm:text-xl">
							Customer Growth Report
						</CardTitle>
						<CardDescription>
							Customer acquisition, churn, and net growth trends
						</CardDescription>
					</CardHeader>
					<CardContent className="space-y-6">
						<div className="grid gap-3 @sm:grid-cols-3">
							{stats.map((stat, i) => (
								<StatCard key={i} {...stat} />
							))}
						</div>
						<ChartContainer config={chartConfig} className="h-[320px] w-full">
							<ComposedChart data={chartData} margin={{ left: 12, right: 12 }}>
								<defs>
									<linearGradient id="netGradient" x1="0" y1="0" x2="0" y2="1">
										<stop
											offset="5%"
											stopColor="var(--color-net)"
											stopOpacity={0.2}
										/>
										<stop
											offset="95%"
											stopColor="var(--color-net)"
											stopOpacity={0}
										/>
									</linearGradient>
								</defs>
								<CartesianGrid strokeDasharray="3 3" vertical={false} />
								<XAxis
									dataKey="month"
									tickLine={false}
									axisLine={false}
									tickMargin={8}
								/>
								<YAxis tickLine={false} axisLine={false} tickMargin={8} />
								<ChartTooltip content={<ChartTooltipContent />} />
								<Area
									type="monotone"
									dataKey="net"
									fill="url(#netGradient)"
									stroke="var(--color-net)"
									strokeWidth={2}
								/>
								<Line
									type="monotone"
									dataKey="acquired"
									stroke="var(--color-acquired)"
									strokeWidth={2}
									dot={false}
								/>
								<Line
									type="monotone"
									dataKey="churned"
									stroke="var(--color-churned)"
									strokeWidth={2}
									dot={false}
									strokeDasharray="4 4"
								/>
							</ComposedChart>
						</ChartContainer>
					</CardContent>
				</Card>
			</div>
		</section>
	);
}
