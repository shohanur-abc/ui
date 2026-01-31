'use client';

import { Bar, BarChart, CartesianGrid, XAxis, YAxis, Cell, ResponsiveContainer } from 'recharts';

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

type CategoryData = {
	category: string;
	current: number;
	benchmark: number;
};

type CategoryRowProps = {
	category: string;
	current: string;
	benchmark: string;
	variance: number;
	status: 'above' | 'below' | 'at';
};

const CategoryRow = ({ category, current, benchmark, variance, status }: CategoryRowProps) => (
	<TableRow>
		<TableCell className="font-medium">{category}</TableCell>
		<TableCell className="text-right font-medium">{current}</TableCell>
		<TableCell className="text-right text-muted-foreground">{benchmark}</TableCell>
		<TableCell className="text-right">
			<Badge
				variant="outline"
				className={
					status === 'above'
						? 'border-emerald-500/20 bg-emerald-500/10 text-emerald-500'
						: status === 'below'
							? 'border-rose-500/20 bg-rose-500/10 text-rose-500'
							: 'border-border bg-muted'
				}
			>
				{variance > 0 ? '+' : ''}{variance}%
			</Badge>
		</TableCell>
	</TableRow>
);

const chartConfig: ChartConfig = {
	current: {
		label: 'Your Performance',
		color: 'var(--chart-1)',
	},
	benchmark: {
		label: 'Industry Average',
		color: 'var(--chart-2)',
	},
};

export default function Main() {
	const chartData: CategoryData[] = [
		{ category: 'Conv Rate', current: 4.2, benchmark: 3.2 },
		{ category: 'AOV', current: 149, benchmark: 125 },
		{ category: 'Return Rate', current: 5.2, benchmark: 8.5 },
		{ category: 'CSAT', current: 4.7, benchmark: 4.2 },
		{ category: 'NPS', current: 62, benchmark: 45 },
	];

	const tableData: CategoryRowProps[] = [
		{ category: 'Conversion Rate', current: '4.2%', benchmark: '3.2%', variance: 31.3, status: 'above' },
		{ category: 'Average Order Value', current: '$149', benchmark: '$125', variance: 19.2, status: 'above' },
		{ category: 'Return Rate', current: '5.2%', benchmark: '8.5%', variance: -38.8, status: 'above' },
		{ category: 'Customer Satisfaction', current: '4.7/5', benchmark: '4.2/5', variance: 11.9, status: 'above' },
		{ category: 'Net Promoter Score', current: '62', benchmark: '45', variance: 37.8, status: 'above' },
		{ category: 'Response Time', current: '2.4 hrs', benchmark: '4.0 hrs', variance: -40.0, status: 'above' },
		{ category: 'Cart Abandonment', current: '24.5%', benchmark: '22.0%', variance: 11.4, status: 'below' },
		{ category: 'Repeat Purchase Rate', current: '32%', benchmark: '28%', variance: 14.3, status: 'above' },
	];

	return (
		<section className="@container" data-theme="reports">
			<div className="mx-auto max-w-7xl px-4 py-8 @sm:px-6 @md:py-10 @2xl:px-8 @3xl:py-12">
				<Card className="border-border/50 bg-card/80 backdrop-blur-sm">
					<CardHeader>
						<CardTitle className="text-lg @sm:text-xl">
							Industry Benchmark Comparison
						</CardTitle>
						<CardDescription>
							Your performance vs industry averages
						</CardDescription>
					</CardHeader>
					<CardContent className="space-y-6">
						<ChartContainer config={chartConfig} className="h-[280px] w-full">
							<BarChart
								data={chartData}
								layout="vertical"
								margin={{ left: 80, right: 20 }}
							>
								<CartesianGrid strokeDasharray="3 3" horizontal={true} vertical={false} />
								<XAxis type="number" tickLine={false} axisLine={false} />
								<YAxis
									type="category"
									dataKey="category"
									tickLine={false}
									axisLine={false}
									width={70}
								/>
								<ChartTooltip content={<ChartTooltipContent />} />
								<Bar dataKey="current" fill="var(--color-current)" radius={4} barSize={16} />
								<Bar dataKey="benchmark" fill="var(--color-benchmark)" radius={4} barSize={16} />
							</BarChart>
						</ChartContainer>
						<div className="overflow-x-auto">
							<Table>
								<TableHeader>
									<TableRow>
										<TableHead>Metric</TableHead>
										<TableHead className="text-right">Your Performance</TableHead>
										<TableHead className="text-right">Industry Avg</TableHead>
										<TableHead className="text-right">Variance</TableHead>
									</TableRow>
								</TableHeader>
								<TableBody>
									{tableData.map((row, i) => (
										<CategoryRow key={i} {...row} />
									))}
								</TableBody>
							</Table>
						</div>
					</CardContent>
				</Card>
			</div>
		</section>
	);
}
