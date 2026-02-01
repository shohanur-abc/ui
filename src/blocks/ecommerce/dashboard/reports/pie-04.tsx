'use client';

import { Pie, PieChart, Cell, Label } from 'recharts';

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
import {
	Table,
	TableBody,
	TableCell,
	TableHead,
	TableHeader,
	TableRow,
} from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';

type ExpenseData = {
	category: string;
	amount: number;
	fill: string;
};

type ExpenseRowProps = {
	category: string;
	amount: string;
	percentage: string;
	trend: 'up' | 'down' | 'stable';
	trendValue: string;
	color: string;
};

const ExpenseRow = ({
	category,
	amount,
	percentage,
	trend,
	trendValue,
	color,
}: ExpenseRowProps) => {
	const trendConfig = {
		up: 'text-rose-500 bg-rose-500/10',
		down: 'text-emerald-500 bg-emerald-500/10',
		stable: 'text-amber-500 bg-amber-500/10',
	};

	return (
		<TableRow>
			<TableCell>
				<div className="flex items-center gap-2">
					<div className={`size-2.5 rounded-full ${color}`} />
					<span className="font-medium">{category}</span>
				</div>
			</TableCell>
			<TableCell className="text-right font-medium">{amount}</TableCell>
			<TableCell className="text-right">{percentage}</TableCell>
			<TableCell className="text-right">
				<Badge variant="secondary" className={trendConfig[trend]}>
					{trendValue}
				</Badge>
			</TableCell>
		</TableRow>
	);
};

const chartConfig: ChartConfig = {
	marketing: {
		label: 'Marketing',
		color: 'oklch(0.7 0.2 280)',
	},
	operations: {
		label: 'Operations',
		color: 'oklch(0.7 0.18 160)',
	},
	technology: {
		label: 'Technology',
		color: 'oklch(0.72 0.16 200)',
	},
	logistics: {
		label: 'Logistics',
		color: 'oklch(0.65 0.2 320)',
	},
	personnel: {
		label: 'Personnel',
		color: 'oklch(0.75 0.15 55)',
	},
	other: {
		label: 'Other',
		color: 'oklch(0.6 0.1 240)',
	},
};

export default function Main() {
	const chartData: ExpenseData[] = [
		{ category: 'marketing', amount: 285000, fill: 'var(--color-marketing)' },
		{ category: 'operations', amount: 245000, fill: 'var(--color-operations)' },
		{ category: 'technology', amount: 198000, fill: 'var(--color-technology)' },
		{ category: 'logistics', amount: 175000, fill: 'var(--color-logistics)' },
		{ category: 'personnel', amount: 425000, fill: 'var(--color-personnel)' },
		{ category: 'other', amount: 72000, fill: 'var(--color-other)' },
	];

	const expenseRows: ExpenseRowProps[] = [
		{
			category: 'Personnel',
			amount: '$425K',
			percentage: '30.4%',
			trend: 'up',
			trendValue: '+5.2%',
			color: 'bg-[oklch(0.75_0.15_55)]',
		},
		{
			category: 'Marketing',
			amount: '$285K',
			percentage: '20.4%',
			trend: 'down',
			trendValue: '-8.1%',
			color: 'bg-[oklch(0.7_0.2_280)]',
		},
		{
			category: 'Operations',
			amount: '$245K',
			percentage: '17.5%',
			trend: 'stable',
			trendValue: '+0.5%',
			color: 'bg-[oklch(0.7_0.18_160)]',
		},
		{
			category: 'Technology',
			amount: '$198K',
			percentage: '14.2%',
			trend: 'up',
			trendValue: '+12.3%',
			color: 'bg-[oklch(0.72_0.16_200)]',
		},
		{
			category: 'Logistics',
			amount: '$175K',
			percentage: '12.5%',
			trend: 'down',
			trendValue: '-3.2%',
			color: 'bg-[oklch(0.65_0.2_320)]',
		},
		{
			category: 'Other',
			amount: '$72K',
			percentage: '5.1%',
			trend: 'stable',
			trendValue: '+1.1%',
			color: 'bg-[oklch(0.6_0.1_240)]',
		},
	];

	const totalExpenses = chartData.reduce((sum, item) => sum + item.amount, 0);

	return (
		<section className="@container" data-theme="reports">
			<div className="mx-auto max-w-7xl px-4 py-8 @sm:px-6 @md:py-10 @2xl:px-8 @3xl:py-12">
				<Card className="border-border/50 bg-card/80 backdrop-blur-sm">
					<CardHeader>
						<CardTitle className="text-lg @sm:text-xl">
							Expense Breakdown Report
						</CardTitle>
						<CardDescription>
							Operating expenses by category with trends
						</CardDescription>
					</CardHeader>
					<CardContent>
						<div className="grid gap-8 @lg:grid-cols-[260px,1fr]">
							<ChartContainer
								config={chartConfig}
								className="mx-auto aspect-square h-[260px]"
							>
								<PieChart>
									<ChartTooltip content={<ChartTooltipContent />} />
									<Pie
										data={chartData}
										dataKey="amount"
										nameKey="category"
										innerRadius={65}
										outerRadius={100}
										strokeWidth={2}
										stroke="var(--background)"
									>
										<Label
											content={({ viewBox }) => {
												if (viewBox && 'cx' in viewBox && 'cy' in viewBox) {
													return (
														<text
															x={viewBox.cx}
															y={viewBox.cy}
															textAnchor="middle"
															dominantBaseline="middle"
														>
															<tspan
																x={viewBox.cx}
																y={viewBox.cy}
																className="fill-foreground text-xl font-bold"
															>
																$1.4M
															</tspan>
															<tspan
																x={viewBox.cx}
																y={(viewBox.cy || 0) + 18}
																className="fill-muted-foreground text-xs"
															>
																Total
															</tspan>
														</text>
													);
												}
											}}
										/>
									</Pie>
								</PieChart>
							</ChartContainer>
							<div className="overflow-x-auto">
								<Table>
									<TableHeader>
										<TableRow>
											<TableHead>Category</TableHead>
											<TableHead className="text-right">Amount</TableHead>
											<TableHead className="text-right">% of Total</TableHead>
											<TableHead className="text-right">
												vs Last Month
											</TableHead>
										</TableRow>
									</TableHeader>
									<TableBody>
										{expenseRows.map((row, i) => (
											<ExpenseRow key={i} {...row} />
										))}
									</TableBody>
								</Table>
							</div>
						</div>
					</CardContent>
				</Card>
			</div>
		</section>
	);
}
