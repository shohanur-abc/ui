'use client';

import {
	ArrowUpRight,
	ArrowDownRight,
	Package,
	Truck,
	DollarSign,
	Clock,
} from 'lucide-react';
import { Bar, BarChart, CartesianGrid, XAxis, YAxis } from 'recharts';

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
	ChartLegend,
	ChartLegendContent,
} from '@/components/ui/chart';
import { Badge } from '@/components/ui/badge';

type CarrierData = {
	carrier: string;
	cost: number;
	time: number;
};

type CarrierMetricProps = {
	carrier: string;
	icon: React.ElementType;
	avgCost: string;
	avgTime: string;
	onTime: string;
	onTimeChange: number;
	volume: string;
};

const CarrierMetric = ({
	carrier,
	icon: Icon,
	avgCost,
	avgTime,
	onTime,
	onTimeChange,
	volume,
}: CarrierMetricProps) => (
	<Card className="border-border/30 bg-card/60">
		<CardContent className="p-5">
			<div className="flex items-center justify-between">
				<div className="flex items-center gap-3">
					<div className="rounded-lg bg-primary/10 p-2">
						<Icon className="size-4 text-primary" />
					</div>
					<div>
						<p className="font-bold">{carrier}</p>
						<p className="text-xs text-muted-foreground">{volume} shipments</p>
					</div>
				</div>
			</div>
			<div className="mt-4 grid grid-cols-3 gap-4 text-center">
				<div>
					<p className="text-xs text-muted-foreground">Avg Cost</p>
					<p className="text-lg font-bold">{avgCost}</p>
				</div>
				<div>
					<p className="text-xs text-muted-foreground">Avg Time</p>
					<p className="text-lg font-bold">{avgTime}</p>
				</div>
				<div>
					<p className="text-xs text-muted-foreground">On-Time</p>
					<div className="flex items-center justify-center gap-1">
						<p className="text-lg font-bold">{onTime}</p>
						{onTimeChange >= 0 ? (
							<ArrowUpRight className="size-3 text-emerald-500" />
						) : (
							<ArrowDownRight className="size-3 text-rose-500" />
						)}
					</div>
				</div>
			</div>
		</CardContent>
	</Card>
);

const chartConfig: ChartConfig = {
	cost: {
		label: 'Avg Cost ($)',
		color: 'var(--chart-1)',
	},
	time: {
		label: 'Avg Days',
		color: 'var(--chart-2)',
	},
};

export default function Main() {
	const carriers: CarrierMetricProps[] = [
		{
			carrier: 'FedEx Express',
			icon: Truck,
			avgCost: '$12.45',
			avgTime: '2.1 days',
			onTime: '96%',
			onTimeChange: 2.1,
			volume: '4,250',
		},
		{
			carrier: 'UPS Ground',
			icon: Package,
			avgCost: '$8.90',
			avgTime: '3.8 days',
			onTime: '94%',
			onTimeChange: -1.2,
			volume: '6,120',
		},
		{
			carrier: 'USPS Priority',
			icon: Truck,
			avgCost: '$7.25',
			avgTime: '4.2 days',
			onTime: '89%',
			onTimeChange: 0.5,
			volume: '3,850',
		},
		{
			carrier: 'DHL Express',
			icon: Package,
			avgCost: '$15.80',
			avgTime: '1.8 days',
			onTime: '98%',
			onTimeChange: 1.8,
			volume: '1,980',
		},
	];

	const chartData: CarrierData[] = [
		{ carrier: 'FedEx', cost: 12.45, time: 2.1 },
		{ carrier: 'UPS', cost: 8.9, time: 3.8 },
		{ carrier: 'USPS', cost: 7.25, time: 4.2 },
		{ carrier: 'DHL', cost: 15.8, time: 1.8 },
	];

	const summary = [
		{ label: 'Best Value', value: 'USPS Priority', desc: '$7.25 avg cost' },
		{ label: 'Fastest', value: 'DHL Express', desc: '1.8 days avg' },
		{ label: 'Most Reliable', value: 'DHL Express', desc: '98% on-time' },
		{ label: 'Most Volume', value: 'UPS Ground', desc: '6,120 shipments' },
	];

	return (
		<section className="@container" data-theme="reports">
			<div className="mx-auto max-w-7xl px-4 py-8 @sm:px-6 @md:py-10 @2xl:px-8 @3xl:py-12">
				<Card className="border-border/50 bg-card/80 backdrop-blur-sm">
					<CardHeader>
						<CardTitle className="text-lg @sm:text-xl">
							Shipping Carrier Comparison
						</CardTitle>
						<CardDescription>
							Performance and cost analysis across carriers
						</CardDescription>
					</CardHeader>
					<CardContent className="space-y-6">
						<div className="grid gap-4 @sm:grid-cols-2 @xl:grid-cols-4">
							{carriers.map((c, i) => (
								<CarrierMetric key={i} {...c} />
							))}
						</div>
						<div className="grid gap-6 @lg:grid-cols-2">
							<Card className="border-border/30 bg-muted/10">
								<CardContent className="p-4">
									<p className="mb-4 text-sm font-medium">
										Cost vs Speed Comparison
									</p>
									<ChartContainer
										config={chartConfig}
										className="h-[240px] w-full"
									>
										<BarChart data={chartData} margin={{ left: 12, right: 12 }}>
											<CartesianGrid strokeDasharray="3 3" vertical={false} />
											<XAxis
												dataKey="carrier"
												tickLine={false}
												axisLine={false}
											/>
											<YAxis yAxisId="left" tickLine={false} axisLine={false} />
											<YAxis
												yAxisId="right"
												orientation="right"
												tickLine={false}
												axisLine={false}
											/>
											<ChartTooltip content={<ChartTooltipContent />} />
											<ChartLegend content={<ChartLegendContent />} />
											<Bar
												yAxisId="left"
												dataKey="cost"
												fill="var(--color-cost)"
												radius={4}
											/>
											<Bar
												yAxisId="right"
												dataKey="time"
												fill="var(--color-time)"
												radius={4}
											/>
										</BarChart>
									</ChartContainer>
								</CardContent>
							</Card>
							<Card className="border-border/30 bg-muted/10">
								<CardContent className="p-4">
									<p className="mb-4 text-sm font-medium">
										Summary & Recommendations
									</p>
									<div className="grid gap-3 @sm:grid-cols-2">
										{summary.map((s, i) => (
											<div
												key={i}
												className="rounded-lg border border-border/30 bg-muted/20 p-3"
											>
												<p className="text-xs text-muted-foreground">
													{s.label}
												</p>
												<p className="mt-1 font-bold">{s.value}</p>
												<p className="text-xs text-muted-foreground">
													{s.desc}
												</p>
											</div>
										))}
									</div>
								</CardContent>
							</Card>
						</div>
					</CardContent>
				</Card>
			</div>
		</section>
	);
}
