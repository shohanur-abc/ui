'use client';

import {
	Line,
	LineChart,
	CartesianGrid,
	XAxis,
	YAxis,
	ReferenceArea,
} from 'recharts';
import { Calendar, TrendingUp } from 'lucide-react';

import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
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

type ConversionData = {
	date: string;
	rate: number;
	visitors: number;
};

type HighlightProps = {
	label: string;
	value: string;
	badge?: string;
};

const Highlight = ({ label, value, badge }: HighlightProps) => (
	<div className="flex items-center gap-3">
		<div>
			<p className="text-xs text-muted-foreground">{label}</p>
			<p className="text-lg font-bold">{value}</p>
		</div>
		{badge && (
			<Badge
				variant="outline"
				className="border-emerald-500/20 bg-emerald-500/10 text-emerald-500"
			>
				{badge}
			</Badge>
		)}
	</div>
);

const chartConfig: ChartConfig = {
	rate: {
		label: 'Conversion Rate',
		color: 'var(--chart-1)',
	},
};

export default function Main() {
	const highlights: HighlightProps[] = [
		{ label: 'Avg Conversion', value: '4.28%', badge: '+0.8%' },
		{ label: 'Peak Rate', value: '5.2%' },
		{ label: 'Total Conversions', value: '12,450' },
	];

	const chartData: ConversionData[] = [
		{ date: 'Jan 1', rate: 3.8, visitors: 12500 },
		{ date: 'Jan 4', rate: 4.1, visitors: 14200 },
		{ date: 'Jan 7', rate: 3.9, visitors: 13800 },
		{ date: 'Jan 10', rate: 4.3, visitors: 15600 },
		{ date: 'Jan 13', rate: 4.5, visitors: 16200 },
		{ date: 'Jan 16', rate: 4.2, visitors: 14900 },
		{ date: 'Jan 19', rate: 4.8, visitors: 17800 },
		{ date: 'Jan 22', rate: 5.2, visitors: 19200 },
		{ date: 'Jan 25', rate: 4.9, visitors: 18100 },
		{ date: 'Jan 28', rate: 4.6, visitors: 16800 },
		{ date: 'Jan 31', rate: 4.4, visitors: 15400 },
	];

	return (
		<section className="@container" data-theme="reports">
			<div className="mx-auto max-w-7xl px-4 py-8 @sm:px-6 @md:py-10 @2xl:px-8 @3xl:py-12">
				<Card className="border-border/50 bg-card/80 backdrop-blur-sm">
					<CardHeader className="flex flex-col gap-4 @lg:flex-row @lg:items-start @lg:justify-between">
						<div>
							<CardTitle className="text-lg @sm:text-xl">
								Conversion Rate Report
							</CardTitle>
							<CardDescription>
								Website conversion rate trends over time
							</CardDescription>
						</div>
						<div className="flex items-center gap-4">
							<div className="flex gap-4">
								{highlights.map((h, i) => (
									<Highlight key={i} {...h} />
								))}
							</div>
							<Button variant="outline" size="sm">
								<Calendar className="mr-2 size-4" />
								Date Range
							</Button>
						</div>
					</CardHeader>
					<CardContent>
						<ChartContainer config={chartConfig} className="h-[350px] w-full">
							<LineChart data={chartData} margin={{ left: 12, right: 12 }}>
								<defs>
									<linearGradient id="convGradient" x1="0" y1="0" x2="0" y2="1">
										<stop
											offset="5%"
											stopColor="var(--color-rate)"
											stopOpacity={0.15}
										/>
										<stop
											offset="95%"
											stopColor="var(--color-rate)"
											stopOpacity={0}
										/>
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
									tickFormatter={(value) => `${value}%`}
									domain={[3, 6]}
								/>
								<ReferenceArea
									x1="Jan 19"
									x2="Jan 25"
									fill="var(--chart-1)"
									fillOpacity={0.1}
									label={{
										value: 'Peak Period',
										position: 'top',
										fill: 'var(--muted-foreground)',
										fontSize: 11,
									}}
								/>
								<ChartTooltip content={<ChartTooltipContent />} />
								<Line
									type="monotone"
									dataKey="rate"
									stroke="var(--color-rate)"
									strokeWidth={2.5}
									dot={{ r: 4, fill: 'var(--background)', strokeWidth: 2 }}
									activeDot={{ r: 6, strokeWidth: 2 }}
									fill="url(#convGradient)"
								/>
							</LineChart>
						</ChartContainer>
					</CardContent>
				</Card>
			</div>
		</section>
	);
}
