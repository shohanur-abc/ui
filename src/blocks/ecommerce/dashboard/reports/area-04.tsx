'use client';

import { Area, AreaChart, CartesianGrid, XAxis, YAxis } from 'recharts';
import { Smartphone, Laptop, Tablet } from 'lucide-react';
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
	ChartLegend,
	ChartLegendContent,
} from '@/components/ui/chart';
import { Progress } from '@/components/ui/progress';

type DeviceData = {
	date: string;
	mobile: number;
	desktop: number;
	tablet: number;
};

type DeviceBreakdownProps = {
	icon: LucideIcon;
	device: string;
	percentage: number;
	sessions: string;
};

const DeviceBreakdown = ({ icon: Icon, device, percentage, sessions }: DeviceBreakdownProps) => (
	<div className="space-y-2">
		<div className="flex items-center justify-between">
			<div className="flex items-center gap-2">
				<Icon className="size-4 text-muted-foreground" />
				<span className="text-sm font-medium">{device}</span>
			</div>
			<span className="text-sm text-muted-foreground">{sessions}</span>
		</div>
		<Progress value={percentage} className="h-2" />
		<p className="text-right text-xs text-muted-foreground">{percentage}%</p>
	</div>
);

const chartConfig: ChartConfig = {
	mobile: {
		label: 'Mobile',
		color: 'var(--chart-1)',
	},
	desktop: {
		label: 'Desktop',
		color: 'var(--chart-2)',
	},
	tablet: {
		label: 'Tablet',
		color: 'var(--chart-3)',
	},
};

export default function Main() {
	const devices: DeviceBreakdownProps[] = [
		{ icon: Smartphone, device: 'Mobile', percentage: 58, sessions: '142.5K' },
		{ icon: Laptop, device: 'Desktop', percentage: 32, sessions: '78.4K' },
		{ icon: Tablet, device: 'Tablet', percentage: 10, sessions: '24.8K' },
	];

	const chartData: DeviceData[] = [
		{ date: 'Mon', mobile: 12500, desktop: 6800, tablet: 2100 },
		{ date: 'Tue', mobile: 14200, desktop: 7500, tablet: 2400 },
		{ date: 'Wed', mobile: 15800, desktop: 8200, tablet: 2600 },
		{ date: 'Thu', mobile: 14500, desktop: 7800, tablet: 2300 },
		{ date: 'Fri', mobile: 16200, desktop: 8600, tablet: 2800 },
		{ date: 'Sat', mobile: 18500, desktop: 9200, tablet: 3200 },
		{ date: 'Sun', mobile: 17800, desktop: 8800, tablet: 2900 },
	];

	return (
		<section className="@container" data-theme="reports">
			<div className="mx-auto max-w-7xl px-4 py-8 @sm:px-6 @md:py-10 @2xl:px-8 @3xl:py-12">
				<Card className="border-border/50 bg-card/80 backdrop-blur-sm">
					<CardHeader>
						<CardTitle className="text-lg @sm:text-xl">
							Device Usage Report
						</CardTitle>
						<CardDescription>
							Session breakdown by device type over time
						</CardDescription>
					</CardHeader>
					<CardContent>
						<div className="grid gap-8 @lg:grid-cols-[1fr,280px]">
							<ChartContainer config={chartConfig} className="h-[320px] w-full">
								<AreaChart data={chartData} margin={{ left: 12, right: 12 }}>
									<defs>
										<linearGradient id="mobileGrad" x1="0" y1="0" x2="0" y2="1">
											<stop offset="5%" stopColor="var(--color-mobile)" stopOpacity={0.5} />
											<stop offset="95%" stopColor="var(--color-mobile)" stopOpacity={0} />
										</linearGradient>
										<linearGradient id="desktopGrad" x1="0" y1="0" x2="0" y2="1">
											<stop offset="5%" stopColor="var(--color-desktop)" stopOpacity={0.5} />
											<stop offset="95%" stopColor="var(--color-desktop)" stopOpacity={0} />
										</linearGradient>
										<linearGradient id="tabletGrad" x1="0" y1="0" x2="0" y2="1">
											<stop offset="5%" stopColor="var(--color-tablet)" stopOpacity={0.5} />
											<stop offset="95%" stopColor="var(--color-tablet)" stopOpacity={0} />
										</linearGradient>
									</defs>
									<CartesianGrid strokeDasharray="3 3" vertical={false} />
									<XAxis
										dataKey="date"
										tickLine={false}
										axisLine={false}
										tickMargin={8}
									/>
									<YAxis
										tickLine={false}
										axisLine={false}
										tickMargin={8}
										tickFormatter={(value) => `${value / 1000}k`}
									/>
									<ChartTooltip content={<ChartTooltipContent />} />
									<ChartLegend content={<ChartLegendContent />} />
									<Area
										type="monotone"
										dataKey="mobile"
										stackId="1"
										stroke="var(--color-mobile)"
										fill="url(#mobileGrad)"
									/>
									<Area
										type="monotone"
										dataKey="desktop"
										stackId="1"
										stroke="var(--color-desktop)"
										fill="url(#desktopGrad)"
									/>
									<Area
										type="monotone"
										dataKey="tablet"
										stackId="1"
										stroke="var(--color-tablet)"
										fill="url(#tabletGrad)"
									/>
								</AreaChart>
							</ChartContainer>
							<div className="space-y-6">
								<h4 className="text-sm font-medium">Device Breakdown</h4>
								{devices.map((d, i) => (
									<DeviceBreakdown key={i} {...d} />
								))}
							</div>
						</div>
					</CardContent>
				</Card>
			</div>
		</section>
	);
}
