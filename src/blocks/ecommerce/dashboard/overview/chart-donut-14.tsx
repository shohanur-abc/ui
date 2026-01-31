'use client';

import { Cell, Pie, PieChart } from 'recharts';

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

type PieDataItem = {
	name: string;
	value: number;
	fill: string;
};

type LegendItemProps = {
	name: string;
	value: number;
	percentage: string;
	fill: string;
};

const LegendItem = ({ name, value, percentage, fill }: LegendItemProps) => (
	<div className="flex items-center justify-between gap-4 py-2">
		<div className="flex items-center gap-2">
			<div className="size-3 rounded-full" style={{ backgroundColor: fill }} />
			<span className="text-sm">{name}</span>
		</div>
		<div className="flex items-center gap-2">
			<span className="font-medium">${(value / 1000).toFixed(1)}k</span>
			<span className="text-xs text-muted-foreground">({percentage})</span>
		</div>
	</div>
);

const chartConfig: ChartConfig = {
	value: {
		label: 'Revenue',
	},
};

export default function Main() {
	const pieData: PieDataItem[] = [
		{ name: 'Direct Sales', value: 45200, fill: 'var(--chart-1)' },
		{ name: 'Marketplace', value: 32100, fill: 'var(--chart-2)' },
		{ name: 'Affiliates', value: 18400, fill: 'var(--chart-3)' },
		{ name: 'Social Media', value: 12300, fill: 'var(--chart-4)' },
		{ name: 'Other', value: 8200, fill: 'var(--chart-5)' },
	];

	const total = pieData.reduce((sum, item) => sum + item.value, 0);
	const legendItems: LegendItemProps[] = pieData.map((item) => ({
		...item,
		percentage: `${((item.value / total) * 100).toFixed(1)}%`,
	}));

	return (
		<section className="@container" data-theme="dashboard">
			<div className="mx-auto max-w-7xl px-4 py-8 @sm:px-6 @md:py-10 @2xl:px-8 @3xl:py-12">
				<Card>
					<CardHeader>
						<CardTitle className="text-lg">Revenue by Channel</CardTitle>
						<CardDescription>Sales distribution across channels</CardDescription>
					</CardHeader>
					<CardContent>
						<div className="flex flex-col gap-8 @lg:flex-row @lg:items-center">
							<ChartContainer
								config={chartConfig}
								className="mx-auto h-[260px] w-full max-w-[260px]"
							>
								<PieChart>
									<ChartTooltip content={<ChartTooltipContent hideLabel />} />
									<Pie
										data={pieData}
										dataKey="value"
										nameKey="name"
										innerRadius={60}
										outerRadius={100}
										paddingAngle={2}
									>
										{pieData.map((entry, index) => (
											<Cell key={`cell-${index}`} fill={entry.fill} />
										))}
									</Pie>
								</PieChart>
							</ChartContainer>
							<div className="flex-1 divide-y">
								{legendItems.map((item, i) => (
									<LegendItem key={i} {...item} />
								))}
							</div>
						</div>
					</CardContent>
				</Card>
			</div>
		</section>
	);
}
