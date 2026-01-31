'use client';

import { GitBranch } from 'lucide-react';
import { Funnel, FunnelChart, LabelList, Cell } from 'recharts';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import {
	ChartConfig,
	ChartContainer,
	ChartTooltip,
	ChartTooltipContent,
} from '@/components/ui/chart';

type FunnelDataPoint = {
	name: string;
	value: number;
	fill: string;
};

type FunnelChartCardProps = {
	title: string;
	description: string;
	data: FunnelDataPoint[];
	config: ChartConfig;
};

const FunnelChartCard = ({
	title,
	description,
	data,
	config,
}: FunnelChartCardProps) => (
	<Card className="group relative overflow-hidden transition-all duration-300 hover:shadow-lg hover:shadow-primary/5 hover:border-primary/30">
		<CardHeader className="flex flex-row items-center gap-3 pb-2">
			<div className="p-2 rounded-lg bg-primary/10 text-primary">
				<GitBranch className="size-4" />
			</div>
			<div>
				<CardTitle className="text-base font-semibold">{title}</CardTitle>
				<p className="text-sm text-muted-foreground">{description}</p>
			</div>
		</CardHeader>
		<CardContent>
			<ChartContainer config={config} className="h-[350px] w-full">
				<FunnelChart margin={{ top: 20, right: 80, bottom: 20, left: 80 }}>
					<ChartTooltip content={<ChartTooltipContent />} />
					<Funnel dataKey="value" data={data} isAnimationActive>
						<LabelList
							position="right"
							fill="var(--foreground)"
							stroke="none"
							dataKey="name"
							className="text-sm font-medium"
						/>
						<LabelList
							position="left"
							fill="var(--muted-foreground)"
							stroke="none"
							dataKey="value"
							formatter={(value: number) => value.toLocaleString()}
							className="text-sm"
						/>
						{data.map((entry, index) => (
							<Cell key={`cell-${index}`} fill={entry.fill} />
						))}
					</Funnel>
				</FunnelChart>
			</ChartContainer>
		</CardContent>
	</Card>
);

export default function Main() {
	const chartData: FunnelDataPoint[] = [
		{ name: 'Visits', value: 50000, fill: 'oklch(0.70 0.18 155)' },
		{ name: 'Product Views', value: 32000, fill: 'oklch(0.67 0.17 160)' },
		{ name: 'Add to Cart', value: 12000, fill: 'oklch(0.64 0.16 165)' },
		{ name: 'Checkout', value: 6000, fill: 'oklch(0.61 0.15 170)' },
		{ name: 'Purchase', value: 4000, fill: 'oklch(0.58 0.14 175)' },
	];

	const chartConfig: ChartConfig = {
		value: { label: 'Users', color: 'oklch(0.70 0.18 155)' },
	};

	return (
		<section className="@container" data-theme="sales">
			<div className="mx-auto max-w-7xl px-4 @sm:px-6 @2xl:px-8 py-8 @md:py-12">
				<div className="max-w-2xl mx-auto">
					<FunnelChartCard
						title="Sales Funnel"
						description="User journey to purchase"
						data={chartData}
						config={chartConfig}
					/>
				</div>
			</div>
		</section>
	);
}
