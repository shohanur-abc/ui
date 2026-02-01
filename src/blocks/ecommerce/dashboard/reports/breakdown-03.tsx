'use client';

import { Pie, PieChart, Cell, ResponsiveContainer, Sector } from 'recharts';
import { MapPin } from 'lucide-react';

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
import { Badge } from '@/components/ui/badge';
import {
	Table,
	TableBody,
	TableCell,
	TableHead,
	TableHeader,
	TableRow,
} from '@/components/ui/table';

type RegionData = {
	region: string;
	flag: string;
	revenue: string;
	percentage: number;
	orders: string;
	avgOrder: string;
	color: string;
};

const chartConfig: ChartConfig = {
	revenue: {
		label: 'Revenue',
	},
};

export default function Main() {
	const regions: RegionData[] = [
		{
			region: 'North America',
			flag: '🌎',
			revenue: '$542,300',
			percentage: 42,
			orders: '4,250',
			avgOrder: '$127.60',
			color: 'var(--chart-1)',
		},
		{
			region: 'Europe',
			flag: '🌍',
			revenue: '$285,600',
			percentage: 22,
			orders: '2,180',
			avgOrder: '$131.01',
			color: 'var(--chart-2)',
		},
		{
			region: 'Asia Pacific',
			flag: '🌏',
			revenue: '$232,400',
			percentage: 18,
			orders: '2,420',
			avgOrder: '$96.03',
			color: 'var(--chart-3)',
		},
		{
			region: 'Latin America',
			flag: '🌎',
			revenue: '$129,200',
			percentage: 10,
			orders: '1,150',
			avgOrder: '$112.35',
			color: 'var(--chart-4)',
		},
		{
			region: 'Middle East',
			flag: '🌍',
			revenue: '$64,800',
			percentage: 5,
			orders: '480',
			avgOrder: '$135.00',
			color: 'var(--chart-5)',
		},
		{
			region: 'Africa',
			flag: '🌍',
			revenue: '$38,700',
			percentage: 3,
			orders: '320',
			avgOrder: '$120.94',
			color: 'var(--muted-foreground)',
		},
	];

	const chartData = regions.map((r) => ({
		name: r.region,
		value: r.percentage,
		fill: r.color,
	}));

	return (
		<section className="@container" data-theme="reports">
			<div className="mx-auto max-w-7xl px-4 py-8 @sm:px-6 @md:py-10 @2xl:px-8 @3xl:py-12">
				<Card className="border-border/50 bg-card/80 backdrop-blur-sm">
					<CardHeader className="flex flex-col gap-2 @sm:flex-row @sm:items-center @sm:justify-between">
						<div className="flex items-start gap-3">
							<div className="rounded-lg bg-primary/10 p-2">
								<MapPin className="size-5 text-primary" />
							</div>
							<div>
								<CardTitle className="text-lg @sm:text-xl">
									Geographic Revenue Breakdown
								</CardTitle>
								<CardDescription>Sales distribution by region</CardDescription>
							</div>
						</div>
						<Badge variant="outline">6 Regions</Badge>
					</CardHeader>
					<CardContent>
						<div className="grid gap-6 @lg:grid-cols-2">
							<ChartContainer
								config={chartConfig}
								className="mx-auto aspect-square h-[300px]"
							>
								<PieChart>
									<ChartTooltip content={<ChartTooltipContent />} />
									<Pie
										data={chartData}
										dataKey="value"
										nameKey="name"
										cx="50%"
										cy="50%"
										outerRadius={100}
										paddingAngle={2}
									>
										{chartData.map((entry, index) => (
											<Cell key={`cell-${index}`} fill={entry.fill} />
										))}
									</Pie>
								</PieChart>
							</ChartContainer>
							<div className="overflow-x-auto">
								<Table>
									<TableHeader>
										<TableRow>
											<TableHead>Region</TableHead>
											<TableHead className="text-right">Revenue</TableHead>
											<TableHead className="text-right">Orders</TableHead>
											<TableHead className="text-right">AOV</TableHead>
										</TableRow>
									</TableHeader>
									<TableBody>
										{regions.map((r, i) => (
											<TableRow key={i}>
												<TableCell>
													<div className="flex items-center gap-2">
														<div
															className="size-2 rounded-full"
															style={{ backgroundColor: r.color }}
														/>
														<span className="mr-1">{r.flag}</span>
														<span className="font-medium">{r.region}</span>
													</div>
												</TableCell>
												<TableCell className="text-right font-medium">
													{r.revenue}
												</TableCell>
												<TableCell className="text-right text-muted-foreground">
													{r.orders}
												</TableCell>
												<TableCell className="text-right text-muted-foreground">
													{r.avgOrder}
												</TableCell>
											</TableRow>
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
