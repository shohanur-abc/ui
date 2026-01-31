'use client';

import { Cell, Pie, PieChart, RadialBar, RadialBarChart } from 'recharts';
import { ArrowUpRight } from 'lucide-react';

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

type RadialDataItem = {
	name: string;
	value: number;
	fill: string;
};

type StatItem = {
	label: string;
	value: string;
	change: string;
};

const StatDisplay = ({ label, value, change }: StatItem) => (
	<div className="flex flex-col items-center text-center">
		<span className="text-xs text-muted-foreground">{label}</span>
		<span className="text-lg font-bold">{value}</span>
		<span className="flex items-center text-xs text-emerald-500">
			<ArrowUpRight className="size-3" />
			{change}
		</span>
	</div>
);

const chartConfig: ChartConfig = {
	value: {
		label: 'Value',
	},
};

export default function Main() {
	const radialData: RadialDataItem[] = [
		{ name: 'Target', value: 100, fill: 'var(--muted)' },
		{ name: 'Current', value: 78, fill: 'var(--chart-1)' },
	];

	const stats: StatItem[] = [
		{ label: 'Revenue', value: '$78,432', change: '+18%' },
		{ label: 'Target', value: '$100,000', change: '78%' },
		{ label: 'Remaining', value: '$21,568', change: '22%' },
	];

	return (
		<section className="@container" data-theme="dashboard">
			<div className="mx-auto max-w-7xl px-4 py-8 @sm:px-6 @md:py-10 @2xl:px-8 @3xl:py-12">
				<Card>
					<CardHeader>
						<CardTitle className="text-lg">Monthly Goal Progress</CardTitle>
						<CardDescription>Track your monthly revenue target</CardDescription>
					</CardHeader>
					<CardContent>
						<div className="flex flex-col items-center gap-8 @lg:flex-row @lg:justify-around">
							<div className="relative">
								<ChartContainer
									config={chartConfig}
									className="h-[200px] w-[200px]"
								>
									<RadialBarChart
										innerRadius="70%"
										outerRadius="100%"
										data={radialData}
										startAngle={180}
										endAngle={0}
									>
										<RadialBar
											dataKey="value"
											cornerRadius={10}
											background
										/>
									</RadialBarChart>
								</ChartContainer>
								<div className="absolute inset-0 flex flex-col items-center justify-center pt-8">
									<span className="text-4xl font-bold">78%</span>
									<span className="text-sm text-muted-foreground">of goal</span>
								</div>
							</div>
							<div className="flex gap-8 @lg:flex-col @lg:gap-4">
								{stats.map((stat, i) => (
									<StatDisplay key={i} {...stat} />
								))}
							</div>
						</div>
					</CardContent>
				</Card>
			</div>
		</section>
	);
}
