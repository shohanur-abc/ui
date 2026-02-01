'use client';

import { Bar, BarChart, CartesianGrid, XAxis, YAxis, Cell } from 'recharts';
import { DollarSign, ArrowUpRight, ArrowDownRight } from 'lucide-react';

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
import { Progress } from '@/components/ui/progress';
import { Badge } from '@/components/ui/badge';

type ExpenseProps = {
	category: string;
	amount: string;
	percentage: number;
	change: number;
	color: string;
};

const ExpenseCard = ({
	category,
	amount,
	percentage,
	change,
	color,
}: ExpenseProps) => (
	<Card className="border-border/30 bg-card/60">
		<CardContent className="p-4">
			<div className="flex items-center justify-between">
				<div className="flex items-center gap-2">
					<div
						className="size-3 rounded-full"
						style={{ backgroundColor: color }}
					/>
					<span className="font-medium">{category}</span>
				</div>
				<Badge
					variant="outline"
					className={
						change <= 0
							? 'border-emerald-500/20 bg-emerald-500/10 text-emerald-500'
							: 'border-rose-500/20 bg-rose-500/10 text-rose-500'
					}
				>
					{change <= 0 ? (
						<ArrowDownRight className="mr-1 size-3" />
					) : (
						<ArrowUpRight className="mr-1 size-3" />
					)}
					{change > 0 ? '+' : ''}
					{change}%
				</Badge>
			</div>
			<p className="mt-2 text-2xl font-bold">{amount}</p>
			<Progress value={percentage} className="mt-2 h-1.5" />
			<p className="mt-1 text-xs text-muted-foreground">
				{percentage}% of total expenses
			</p>
		</CardContent>
	</Card>
);

const chartConfig: ChartConfig = {
	amount: {
		label: 'Amount',
		color: 'var(--chart-1)',
	},
};

export default function Main() {
	const expenses: ExpenseProps[] = [
		{
			category: 'Cost of Goods',
			amount: '$485,200',
			percentage: 42,
			change: 5.2,
			color: 'var(--chart-1)',
		},
		{
			category: 'Marketing',
			amount: '$185,400',
			percentage: 16,
			change: -8.4,
			color: 'var(--chart-2)',
		},
		{
			category: 'Shipping',
			amount: '$142,800',
			percentage: 12,
			change: 12.5,
			color: 'var(--chart-3)',
		},
		{
			category: 'Operations',
			amount: '$128,500',
			percentage: 11,
			change: 2.1,
			color: 'var(--chart-4)',
		},
		{
			category: 'Technology',
			amount: '$98,200',
			percentage: 8,
			change: -3.2,
			color: 'var(--chart-5)',
		},
		{
			category: 'Salaries',
			amount: '$85,400',
			percentage: 7,
			change: 0,
			color: 'var(--muted-foreground)',
		},
		{
			category: 'Other',
			amount: '$45,200',
			percentage: 4,
			change: 15.8,
			color: 'var(--muted)',
		},
	];

	const chartData = expenses.map((e) => ({
		name: e.category,
		amount: parseInt(e.amount.replace(/[$,]/g, '')),
		fill: e.color,
	}));

	const totalExpenses = expenses.reduce(
		(sum, e) => sum + parseInt(e.amount.replace(/[$,]/g, '')),
		0,
	);

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
									Expense Breakdown Report
								</CardTitle>
								<CardDescription>Cost distribution by category</CardDescription>
							</div>
						</div>
						<Badge variant="outline">
							Total: ${(totalExpenses / 1000000).toFixed(2)}M
						</Badge>
					</CardHeader>
					<CardContent className="space-y-6">
						<ChartContainer config={chartConfig} className="h-[200px] w-full">
							<BarChart
								data={chartData}
								layout="vertical"
								margin={{ left: 100 }}
							>
								<CartesianGrid
									strokeDasharray="3 3"
									horizontal
									vertical={false}
								/>
								<XAxis
									type="number"
									tickLine={false}
									axisLine={false}
									tickFormatter={(v) => `$${v / 1000}K`}
								/>
								<YAxis
									type="category"
									dataKey="name"
									tickLine={false}
									axisLine={false}
									width={90}
								/>
								<ChartTooltip content={<ChartTooltipContent />} />
								<Bar dataKey="amount" radius={4}>
									{chartData.map((entry, index) => (
										<Cell key={`cell-${index}`} fill={entry.fill} />
									))}
								</Bar>
							</BarChart>
						</ChartContainer>
						<div className="grid gap-4 @sm:grid-cols-2 @lg:grid-cols-3 @xl:grid-cols-4">
							{expenses.slice(0, 6).map((e, i) => (
								<ExpenseCard key={i} {...e} />
							))}
						</div>
					</CardContent>
				</Card>
			</div>
		</section>
	);
}
