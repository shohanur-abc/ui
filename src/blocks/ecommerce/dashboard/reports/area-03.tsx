'use client';

import { Area, AreaChart, CartesianGrid, XAxis, YAxis } from 'recharts';
import { DollarSign, CreditCard, ArrowRightLeft } from 'lucide-react';
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
} from '@/components/ui/chart';

type CashflowData = {
	date: string;
	inflow: number;
	outflow: number;
};

type SummaryCardProps = {
	icon: LucideIcon;
	label: string;
	value: string;
	change: string;
	positive: boolean;
};

const SummaryCard = ({
	icon: Icon,
	label,
	value,
	change,
	positive,
}: SummaryCardProps) => (
	<Card className="border-border/30 bg-muted/30">
		<CardContent className="flex items-center gap-3 p-4">
			<div
				className={`rounded-lg p-2 ${positive ? 'bg-emerald-500/10' : 'bg-rose-500/10'}`}
			>
				<Icon
					className={`size-4 ${positive ? 'text-emerald-500' : 'text-rose-500'}`}
				/>
			</div>
			<div>
				<p className="text-xs text-muted-foreground">{label}</p>
				<p className="text-lg font-bold">{value}</p>
				<p
					className={`text-xs ${positive ? 'text-emerald-500' : 'text-rose-500'}`}
				>
					{change}
				</p>
			</div>
		</CardContent>
	</Card>
);

const chartConfig: ChartConfig = {
	inflow: {
		label: 'Cash Inflow',
		color: 'oklch(0.7 0.18 160)',
	},
	outflow: {
		label: 'Cash Outflow',
		color: 'oklch(0.62 0.24 25)',
	},
};

export default function Main() {
	const summaryCards: SummaryCardProps[] = [
		{
			icon: DollarSign,
			label: 'Total Inflow',
			value: '$2.45M',
			change: '+18.2%',
			positive: true,
		},
		{
			icon: CreditCard,
			label: 'Total Outflow',
			value: '$1.82M',
			change: '+12.5%',
			positive: false,
		},
		{
			icon: ArrowRightLeft,
			label: 'Net Cashflow',
			value: '$630K',
			change: '+32.1%',
			positive: true,
		},
	];

	const chartData: CashflowData[] = [
		{ date: 'Week 1', inflow: 185000, outflow: 142000 },
		{ date: 'Week 2', inflow: 198000, outflow: 156000 },
		{ date: 'Week 3', inflow: 212000, outflow: 168000 },
		{ date: 'Week 4', inflow: 195000, outflow: 152000 },
		{ date: 'Week 5', inflow: 225000, outflow: 178000 },
		{ date: 'Week 6', inflow: 248000, outflow: 188000 },
		{ date: 'Week 7', inflow: 232000, outflow: 195000 },
		{ date: 'Week 8', inflow: 265000, outflow: 198000 },
		{ date: 'Week 9', inflow: 278000, outflow: 205000 },
		{ date: 'Week 10', inflow: 292000, outflow: 218000 },
		{ date: 'Week 11', inflow: 285000, outflow: 212000 },
		{ date: 'Week 12', inflow: 315000, outflow: 225000 },
	];

	return (
		<section className="@container" data-theme="reports">
			<div className="mx-auto max-w-7xl px-4 py-8 @sm:px-6 @md:py-10 @2xl:px-8 @3xl:py-12">
				<Card className="border-border/50 bg-card/80 backdrop-blur-sm">
					<CardHeader>
						<CardTitle className="text-lg @sm:text-xl">
							Cashflow Report
						</CardTitle>
						<CardDescription>
							Weekly cash inflow and outflow analysis
						</CardDescription>
					</CardHeader>
					<CardContent className="space-y-6">
						<div className="grid gap-4 @sm:grid-cols-3">
							{summaryCards.map((card, i) => (
								<SummaryCard key={i} {...card} />
							))}
						</div>
						<ChartContainer config={chartConfig} className="h-[320px] w-full">
							<AreaChart data={chartData} margin={{ left: 12, right: 12 }}>
								<defs>
									<linearGradient id="inflowGrad" x1="0" y1="0" x2="0" y2="1">
										<stop
											offset="5%"
											stopColor="var(--color-inflow)"
											stopOpacity={0.4}
										/>
										<stop
											offset="95%"
											stopColor="var(--color-inflow)"
											stopOpacity={0}
										/>
									</linearGradient>
									<linearGradient id="outflowGrad" x1="0" y1="0" x2="0" y2="1">
										<stop
											offset="5%"
											stopColor="var(--color-outflow)"
											stopOpacity={0.3}
										/>
										<stop
											offset="95%"
											stopColor="var(--color-outflow)"
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
									tickFormatter={(value) => `$${value / 1000}k`}
								/>
								<ChartTooltip content={<ChartTooltipContent />} />
								<Area
									type="monotone"
									dataKey="inflow"
									stroke="var(--color-inflow)"
									strokeWidth={2}
									fill="url(#inflowGrad)"
								/>
								<Area
									type="monotone"
									dataKey="outflow"
									stroke="var(--color-outflow)"
									strokeWidth={2}
									fill="url(#outflowGrad)"
								/>
							</AreaChart>
						</ChartContainer>
					</CardContent>
				</Card>
			</div>
		</section>
	);
}
