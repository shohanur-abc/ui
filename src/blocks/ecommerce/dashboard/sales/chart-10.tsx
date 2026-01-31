'use client';

import { Radar } from 'lucide-react';
import {
	Radar as RechartsRadar,
	RadarChart,
	PolarGrid,
	PolarAngleAxis,
	PolarRadiusAxis,
} from 'recharts';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import {
	ChartConfig,
	ChartContainer,
	ChartTooltip,
	ChartTooltipContent,
} from '@/components/ui/chart';

type RadarDataPoint = {
	metric: string;
	current: number;
	target: number;
};

type RadarChartCardProps = {
	title: string;
	description: string;
	data: RadarDataPoint[];
	config: ChartConfig;
};

const RadarChartCard = ({
	title,
	description,
	data,
	config,
}: RadarChartCardProps) => (
	<Card className="group relative overflow-hidden transition-all duration-300 hover:shadow-lg hover:shadow-primary/5 hover:border-primary/30">
		<CardHeader className="flex flex-row items-center gap-3 pb-2">
			<div className="p-2 rounded-lg bg-primary/10 text-primary">
				<Radar className="size-4" />
			</div>
			<div>
				<CardTitle className="text-base font-semibold">{title}</CardTitle>
				<p className="text-sm text-muted-foreground">{description}</p>
			</div>
		</CardHeader>
		<CardContent>
			<ChartContainer config={config} className="h-[350px] w-full">
				<RadarChart data={data} cx="50%" cy="50%" outerRadius="75%">
					<PolarGrid className="stroke-border/50" />
					<PolarAngleAxis
						dataKey="metric"
						className="text-xs fill-muted-foreground"
					/>
					<PolarRadiusAxis
						angle={90}
						domain={[0, 100]}
						className="text-xs"
						tick={false}
					/>
					<ChartTooltip content={<ChartTooltipContent />} />
					<RechartsRadar
						name="Current"
						dataKey="current"
						stroke="var(--color-current)"
						fill="var(--color-current)"
						fillOpacity={0.4}
						strokeWidth={2}
					/>
					<RechartsRadar
						name="Target"
						dataKey="target"
						stroke="var(--color-target)"
						fill="var(--color-target)"
						fillOpacity={0.1}
						strokeWidth={2}
						strokeDasharray="5 5"
					/>
				</RadarChart>
			</ChartContainer>
		</CardContent>
	</Card>
);

export default function Main() {
	const chartData: RadarDataPoint[] = [
		{ metric: 'Revenue', current: 85, target: 100 },
		{ metric: 'Orders', current: 92, target: 100 },
		{ metric: 'AOV', current: 78, target: 100 },
		{ metric: 'Conversion', current: 65, target: 100 },
		{ metric: 'Retention', current: 72, target: 100 },
		{ metric: 'NPS', current: 88, target: 100 },
	];

	const chartConfig: ChartConfig = {
		current: { label: 'Current', color: 'oklch(0.70 0.18 155)' },
		target: { label: 'Target', color: 'oklch(0.60 0.012 155)' },
	};

	return (
		<section className="@container" data-theme="sales">
			<div className="mx-auto max-w-7xl px-4 @sm:px-6 @2xl:px-8 py-8 @md:py-12">
				<div className="max-w-2xl mx-auto">
					<RadarChartCard
						title="Performance Metrics"
						description="Current vs target performance"
						data={chartData}
						config={chartConfig}
					/>
				</div>
			</div>
		</section>
	);
}
