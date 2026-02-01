'use client';

import {
	Line,
	LineChart,
	CartesianGrid,
	XAxis,
	YAxis,
	ReferenceLine,
} from 'recharts';
import { DollarSign, TrendingUp, TrendingDown } from 'lucide-react';

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

type CashflowData = {
	month: string;
	inflow: number;
	outflow: number;
	balance: number;
};

type SummaryCardProps = {
	label: string;
	value: string;
	change: number;
	positive?: boolean;
};

const SummaryCard = ({
	label,
	value,
	change,
	positive = true,
}: SummaryCardProps) => (
	<Card className="border-border/30 bg-card/60">
		<CardContent className="p-4">
			<p className="text-sm text-muted-foreground">{label}</p>
			<p className="mt-1 text-2xl font-bold">{value}</p>
			<Badge
				variant="outline"
				className={
					(positive && change >= 0) || (!positive && change < 0)
						? 'mt-2 border-emerald-500/20 bg-emerald-500/10 text-emerald-500'
						: 'mt-2 border-rose-500/20 bg-rose-500/10 text-rose-500'
				}
			>
				{change >= 0 ? (
					<TrendingUp className="mr-1 size-3" />
				) : (
					<TrendingDown className="mr-1 size-3" />
				)}
				{change >= 0 ? '+' : ''}
				{change}%
			</Badge>
		</CardContent>
	</Card>
);

const chartConfig: ChartConfig = {
	inflow: {
		label: 'Cash Inflow',
		color: 'var(--chart-1)',
	},
	outflow: {
		label: 'Cash Outflow',
		color: 'var(--chart-5)',
	},
	balance: {
		label: 'Net Balance',
		color: 'var(--chart-2)',
	},
};

export default function Main() {
	const summaries: SummaryCardProps[] = [
		{ label: 'Total Inflow', value: '$2.85M', change: 15.4 },
		{ label: 'Total Outflow', value: '$2.12M', change: 8.2, positive: false },
		{ label: 'Net Cashflow', value: '$730K', change: 28.5 },
		{ label: 'Avg Monthly', value: '$60.8K', change: 12.2 },
	];

	const chartData: CashflowData[] = [
		{ month: 'Jan', inflow: 220000, outflow: 185000, balance: 35000 },
		{ month: 'Feb', inflow: 235000, outflow: 192000, balance: 43000 },
		{ month: 'Mar', inflow: 280000, outflow: 210000, balance: 70000 },
		{ month: 'Apr', inflow: 245000, outflow: 205000, balance: 40000 },
		{ month: 'May', inflow: 295000, outflow: 225000, balance: 70000 },
		{ month: 'Jun', inflow: 320000, outflow: 245000, balance: 75000 },
		{ month: 'Jul', inflow: 265000, outflow: 215000, balance: 50000 },
		{ month: 'Aug', inflow: 285000, outflow: 228000, balance: 57000 },
		{ month: 'Sep', inflow: 310000, outflow: 238000, balance: 72000 },
		{ month: 'Oct', inflow: 295000, outflow: 242000, balance: 53000 },
		{ month: 'Nov', inflow: 345000, outflow: 265000, balance: 80000 },
		{ month: 'Dec', inflow: 385000, outflow: 270000, balance: 115000 },
	];

	return (
		<section className="@container" data-theme="reports">
			<div className="mx-auto max-w-7xl px-4 py-8 @sm:px-6 @md:py-10 @2xl:px-8 @3xl:py-12">
				<Card className="border-border/50 bg-card/80 backdrop-blur-sm">
					<CardHeader className="flex flex-col gap-2 @sm:flex-row @sm:items-center @sm:justify-between">
						<div className="flex items-start gap-3">
							<div className="rounded-lg bg-primary/10 p-2">
								<DollarSign className="size-5 text-primary" />
							</div>
							<div>
								<CardTitle className="text-lg @sm:text-xl">
									Cash Flow Timeline
								</CardTitle>
								<CardDescription>
									Monthly cash inflow, outflow and net balance
								</CardDescription>
							</div>
						</div>
						<Badge variant="outline">FY 2024</Badge>
					</CardHeader>
					<CardContent className="space-y-6">
						<div className="grid gap-4 @sm:grid-cols-2 @xl:grid-cols-4">
							{summaries.map((s, i) => (
								<SummaryCard key={i} {...s} />
							))}
						</div>
						<ChartContainer config={chartConfig} className="h-[350px] w-full">
							<LineChart data={chartData} margin={{ left: 12, right: 12 }}>
								<CartesianGrid strokeDasharray="3 3" vertical={false} />
								<XAxis
									dataKey="month"
									tickLine={false}
									axisLine={false}
									tickMargin={8}
								/>
								<YAxis
									tickLine={false}
									axisLine={false}
									tickMargin={8}
									tickFormatter={(v) => `$${v / 1000}K`}
								/>
								<ReferenceLine
									y={0}
									stroke="var(--border)"
									strokeDasharray="3 3"
								/>
								<ChartTooltip content={<ChartTooltipContent />} />
								<ChartLegend content={<ChartLegendContent />} />
								<Line
									type="monotone"
									dataKey="inflow"
									stroke="var(--color-inflow)"
									strokeWidth={2}
									dot={false}
								/>
								<Line
									type="monotone"
									dataKey="outflow"
									stroke="var(--color-outflow)"
									strokeWidth={2}
									dot={false}
								/>
								<Line
									type="monotone"
									dataKey="balance"
									stroke="var(--color-balance)"
									strokeWidth={3}
									dot={{ fill: 'var(--color-balance)', strokeWidth: 2, r: 4 }}
								/>
							</LineChart>
						</ChartContainer>
					</CardContent>
				</Card>
			</div>
		</section>
	);
}
