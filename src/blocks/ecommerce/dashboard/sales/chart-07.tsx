'use client';

import { Gauge } from 'lucide-react';
import { RadialBar, RadialBarChart, PolarAngleAxis } from 'recharts';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { ChartConfig, ChartContainer } from '@/components/ui/chart';
import { Badge } from '@/components/ui/badge';

type GaugeData = {
	label: string;
	value: number;
	target: number;
	unit: string;
	status: 'success' | 'warning' | 'danger';
};

type GaugeChartCardProps = {
	title: string;
	gauges: GaugeData[];
	config: ChartConfig;
};

const statusColors = {
	success: 'oklch(0.70 0.18 155)',
	warning: 'oklch(0.75 0.15 85)',
	danger: 'oklch(0.55 0.22 25)',
};

const GaugeChartCard = ({ title, gauges, config }: GaugeChartCardProps) => (
	<Card className="group relative overflow-hidden transition-all duration-300 hover:shadow-lg hover:shadow-primary/5 hover:border-primary/30">
		<CardHeader className="flex flex-row items-center gap-3 pb-2">
			<div className="p-2 rounded-lg bg-primary/10 text-primary">
				<Gauge className="size-4" />
			</div>
			<CardTitle className="text-base font-semibold">{title}</CardTitle>
		</CardHeader>
		<CardContent>
			<div className="grid grid-cols-1 @sm:grid-cols-2 @lg:grid-cols-3 gap-6">
				{gauges.map((gauge, idx) => {
					const percentage = Math.min((gauge.value / gauge.target) * 100, 100);
					const fill = statusColors[gauge.status];

					return (
						<div key={idx} className="text-center p-4 rounded-xl bg-muted/30">
							<ChartContainer config={config} className="h-[140px] w-full">
								<RadialBarChart
									cx="50%"
									cy="50%"
									innerRadius="65%"
									outerRadius="100%"
									data={[{ value: percentage, fill }]}
									startAngle={180}
									endAngle={0}
								>
									<PolarAngleAxis
										type="number"
										domain={[0, 100]}
										angleAxisId={0}
										tick={false}
									/>
									<RadialBar
										background={{ fill: 'var(--muted)' }}
										dataKey="value"
										cornerRadius={10}
									/>
								</RadialBarChart>
							</ChartContainer>
							<div className="-mt-8">
								<p className="text-2xl font-bold">
									{gauge.value}
									<span className="text-sm text-muted-foreground ml-1">
										{gauge.unit}
									</span>
								</p>
								<p className="text-sm font-medium mt-1">{gauge.label}</p>
								<Badge
									variant={
										gauge.status === 'success'
											? 'default'
											: gauge.status === 'warning'
												? 'secondary'
												: 'destructive'
									}
									className="mt-2"
								>
									Target: {gauge.target}
									{gauge.unit}
								</Badge>
							</div>
						</div>
					);
				})}
			</div>
		</CardContent>
	</Card>
);

export default function Main() {
	const gauges: GaugeData[] = [
		{
			label: 'Conversion Rate',
			value: 3.8,
			target: 4.0,
			unit: '%',
			status: 'success',
		},
		{
			label: 'Avg Order Value',
			value: 85,
			target: 100,
			unit: '$',
			status: 'warning',
		},
		{
			label: 'Customer Satisfaction',
			value: 4.2,
			target: 4.5,
			unit: '/5',
			status: 'success',
		},
	];

	const chartConfig: ChartConfig = {
		value: { label: 'Value', color: 'oklch(0.70 0.18 155)' },
	};

	return (
		<section className="@container" data-theme="sales">
			<div className="mx-auto max-w-7xl px-4 @sm:px-6 @2xl:px-8 py-8 @md:py-12">
				<GaugeChartCard
					title="Performance Gauges"
					gauges={gauges}
					config={chartConfig}
				/>
			</div>
		</section>
	);
}
