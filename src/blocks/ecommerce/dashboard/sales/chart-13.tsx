'use client';

import { TrendingUp, TrendingDown, LineChart } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

type MiniChartData = {
	label: string;
	value: string;
	change: number;
	sparkline: number[];
};

type MiniSparklineGridCardProps = {
	title: string;
	metrics: MiniChartData[];
};

const MiniSparklineGridCard = ({
	title,
	metrics,
}: MiniSparklineGridCardProps) => (
	<Card className="group relative overflow-hidden transition-all duration-300 hover:shadow-lg hover:shadow-primary/5 hover:border-primary/30">
		<CardHeader className="flex flex-row items-center gap-3 pb-4">
			<div className="p-2 rounded-lg bg-primary/10 text-primary">
				<LineChart className="size-4" />
			</div>
			<CardTitle className="text-base font-semibold">{title}</CardTitle>
		</CardHeader>
		<CardContent>
			<div className="grid grid-cols-2 @lg:grid-cols-4 gap-4">
				{metrics.map((metric, idx) => {
					const isPositive = metric.change >= 0;
					const max = Math.max(...metric.sparkline);
					const min = Math.min(...metric.sparkline);
					const range = max - min || 1;

					return (
						<div
							key={idx}
							className="p-4 rounded-xl bg-muted/30 hover:bg-muted/50 transition-colors"
						>
							<p className="text-xs text-muted-foreground mb-1">
								{metric.label}
							</p>
							<div className="flex items-baseline justify-between mb-3">
								<p className="text-xl font-bold">{metric.value}</p>
								<div
									className={`flex items-center gap-0.5 text-xs font-medium ${isPositive ? 'text-emerald-500' : 'text-destructive'}`}
								>
									{isPositive ? (
										<TrendingUp className="size-3" />
									) : (
										<TrendingDown className="size-3" />
									)}
									{Math.abs(metric.change)}%
								</div>
							</div>
							<svg
								className="w-full h-10"
								viewBox={`0 0 ${metric.sparkline.length - 1} 40`}
								preserveAspectRatio="none"
							>
								<defs>
									<linearGradient
										id={`gradient-${idx}`}
										x1="0"
										y1="0"
										x2="0"
										y2="1"
									>
										<stop
											offset="0%"
											stopColor={
												isPositive
													? 'oklch(0.70 0.18 155)'
													: 'oklch(0.55 0.22 25)'
											}
											stopOpacity={0.4}
										/>
										<stop
											offset="100%"
											stopColor={
												isPositive
													? 'oklch(0.70 0.18 155)'
													: 'oklch(0.55 0.22 25)'
											}
											stopOpacity={0}
										/>
									</linearGradient>
								</defs>
								<path
									d={`M0,${40 - ((metric.sparkline[0] - min) / range) * 40} ${metric.sparkline.map((val, i) => `L${i},${40 - ((val - min) / range) * 40}`).join(' ')} L${metric.sparkline.length - 1},40 L0,40 Z`}
									fill={`url(#gradient-${idx})`}
								/>
								<path
									d={`M0,${40 - ((metric.sparkline[0] - min) / range) * 40} ${metric.sparkline.map((val, i) => `L${i},${40 - ((val - min) / range) * 40}`).join(' ')}`}
									fill="none"
									stroke={
										isPositive ? 'oklch(0.70 0.18 155)' : 'oklch(0.55 0.22 25)'
									}
									strokeWidth="2"
								/>
							</svg>
						</div>
					);
				})}
			</div>
		</CardContent>
	</Card>
);

export default function Main() {
	const metrics: MiniChartData[] = [
		{
			label: 'Revenue',
			value: '$42.5k',
			change: 12.5,
			sparkline: [25, 32, 28, 45, 38, 52, 48],
		},
		{
			label: 'Orders',
			value: '1,847',
			change: 8.2,
			sparkline: [120, 135, 128, 145, 155, 142, 168],
		},
		{
			label: 'Customers',
			value: '892',
			change: -3.4,
			sparkline: [85, 92, 88, 82, 78, 85, 80],
		},
		{
			label: 'Avg Order',
			value: '$89.50',
			change: 5.1,
			sparkline: [72, 78, 82, 85, 88, 86, 92],
		},
	];

	return (
		<section className="@container" data-theme="sales">
			<div className="mx-auto max-w-7xl px-4 @sm:px-6 @2xl:px-8 py-8 @md:py-12">
				<MiniSparklineGridCard title="Quick Metrics" metrics={metrics} />
			</div>
		</section>
	);
}
