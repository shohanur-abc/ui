'use client';

import { Cell, Pie, PieChart, Bar, BarChart, XAxis, YAxis } from 'recharts';
import { Calendar, Download, FileText, TrendingUp } from 'lucide-react';

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
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

type ReportSummary = {
	period: string;
	revenue: string;
	orders: string;
	growth: string;
};

type CategoryData = {
	name: string;
	value: number;
	fill: string;
};

const ReportCard = ({ period, revenue, orders, growth }: ReportSummary) => (
	<div className="rounded-xl border bg-card p-4">
		<div className="flex items-center justify-between">
			<p className="text-sm font-medium">{period}</p>
			<Badge
				variant="secondary"
				className="bg-emerald-500/10 text-emerald-500 text-xs"
			>
				{growth}
			</Badge>
		</div>
		<div className="mt-3 grid grid-cols-2 gap-4">
			<div>
				<p className="text-xs text-muted-foreground">Revenue</p>
				<p className="text-lg font-bold">{revenue}</p>
			</div>
			<div>
				<p className="text-xs text-muted-foreground">Orders</p>
				<p className="text-lg font-bold">{orders}</p>
			</div>
		</div>
	</div>
);

const salesConfig: ChartConfig = {
	value: { label: 'Sales', color: 'var(--chart-1)' },
};

const pieConfig: ChartConfig = {
	value: { label: 'Share' },
};

export default function Main() {
	const monthlySummaries: ReportSummary[] = [
		{
			period: 'December 2024',
			revenue: '$98,432',
			orders: '2,521',
			growth: '+28%',
		},
		{
			period: 'November 2024',
			revenue: '$87,654',
			orders: '2,234',
			growth: '+22%',
		},
		{
			period: 'October 2024',
			revenue: '$76,543',
			orders: '1,987',
			growth: '+18%',
		},
	];

	const quarterlySummaries: ReportSummary[] = [
		{ period: 'Q4 2024', revenue: '$262,629', orders: '6,742', growth: '+24%' },
		{ period: 'Q3 2024', revenue: '$234,567', orders: '5,987', growth: '+18%' },
		{ period: 'Q2 2024', revenue: '$198,765', orders: '5,123', growth: '+15%' },
	];

	const salesData = [
		{ month: 'Jul', value: 45000 },
		{ month: 'Aug', value: 52000 },
		{ month: 'Sep', value: 48000 },
		{ month: 'Oct', value: 76543 },
		{ month: 'Nov', value: 87654 },
		{ month: 'Dec', value: 98432 },
	];

	const categoryData: CategoryData[] = [
		{ name: 'Electronics', value: 42, fill: 'var(--chart-1)' },
		{ name: 'Accessories', value: 28, fill: 'var(--chart-2)' },
		{ name: 'Home', value: 18, fill: 'var(--chart-3)' },
		{ name: 'Other', value: 12, fill: 'var(--chart-4)' },
	];

	return (
		<section className="@container" data-theme="dashboard">
			<div className="mx-auto max-w-7xl px-4 py-8 @sm:px-6 @md:py-10 @2xl:px-8 @3xl:py-12">
				<div className="space-y-6">
					<Card>
						<CardHeader className="flex-row items-center justify-between">
							<div>
								<CardTitle>Reports Dashboard</CardTitle>
								<CardDescription>
									View and export performance reports
								</CardDescription>
							</div>
							<Button variant="outline" size="sm" className="gap-2">
								<Download className="size-4" />
								Export
							</Button>
						</CardHeader>
						<CardContent>
							<Tabs defaultValue="monthly" className="w-full">
								<TabsList className="mb-4">
									<TabsTrigger value="monthly">Monthly</TabsTrigger>
									<TabsTrigger value="quarterly">Quarterly</TabsTrigger>
									<TabsTrigger value="trends">Trends</TabsTrigger>
								</TabsList>
								<TabsContent value="monthly">
									<div className="grid gap-4 @lg:grid-cols-3">
										{monthlySummaries.map((summary, i) => (
											<ReportCard key={i} {...summary} />
										))}
									</div>
								</TabsContent>
								<TabsContent value="quarterly">
									<div className="grid gap-4 @lg:grid-cols-3">
										{quarterlySummaries.map((summary, i) => (
											<ReportCard key={i} {...summary} />
										))}
									</div>
								</TabsContent>
								<TabsContent value="trends">
									<div className="grid gap-6 @xl:grid-cols-2">
										<div>
											<p className="mb-4 text-sm font-medium">Sales Trend</p>
											<ChartContainer
												config={salesConfig}
												className="h-[200px] w-full"
											>
												<BarChart data={salesData}>
													<XAxis
														dataKey="month"
														tickLine={false}
														axisLine={false}
													/>
													<YAxis
														tickLine={false}
														axisLine={false}
														tickFormatter={(v) => `$${v / 1000}K`}
													/>
													<ChartTooltip content={<ChartTooltipContent />} />
													<Bar
														dataKey="value"
														fill="var(--color-value)"
														radius={[4, 4, 0, 0]}
													/>
												</BarChart>
											</ChartContainer>
										</div>
										<div>
											<p className="mb-4 text-sm font-medium">
												Sales by Category
											</p>
											<div className="flex items-center gap-6">
												<ChartContainer
													config={pieConfig}
													className="size-[160px]"
												>
													<PieChart>
														<Pie
															data={categoryData}
															dataKey="value"
															nameKey="name"
															innerRadius={45}
															outerRadius={70}
														>
															{categoryData.map((entry, index) => (
																<Cell key={`cell-${index}`} fill={entry.fill} />
															))}
														</Pie>
													</PieChart>
												</ChartContainer>
												<div className="space-y-2">
													{categoryData.map((item, i) => (
														<div key={i} className="flex items-center gap-2">
															<div
																className="size-3 rounded-full"
																style={{ backgroundColor: item.fill }}
															/>
															<span className="text-sm">{item.name}</span>
															<span className="text-sm font-medium">
																{item.value}%
															</span>
														</div>
													))}
												</div>
											</div>
										</div>
									</div>
								</TabsContent>
							</Tabs>
						</CardContent>
					</Card>
				</div>
			</div>
		</section>
	);
}
