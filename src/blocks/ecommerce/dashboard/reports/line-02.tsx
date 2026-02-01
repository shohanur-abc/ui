'use client';

import {
	Line,
	LineChart,
	CartesianGrid,
	XAxis,
	YAxis,
	ReferenceLine,
} from 'recharts';
import { AlertTriangle, CheckCircle } from 'lucide-react';

import { Badge } from '@/components/ui/badge';
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

type StockData = {
	day: string;
	stock: number;
	orders: number;
};

type AlertProps = {
	type: 'warning' | 'success';
	message: string;
};

const StockAlert = ({ type, message }: AlertProps) => (
	<Badge
		variant="outline"
		className={
			type === 'warning'
				? 'border-amber-500/20 bg-amber-500/10 text-amber-500'
				: 'border-emerald-500/20 bg-emerald-500/10 text-emerald-500'
		}
	>
		{type === 'warning' ? (
			<AlertTriangle className="mr-1 size-3" />
		) : (
			<CheckCircle className="mr-1 size-3" />
		)}
		{message}
	</Badge>
);

const chartConfig: ChartConfig = {
	stock: {
		label: 'Stock Level',
		color: 'var(--chart-1)',
	},
	orders: {
		label: 'Daily Orders',
		color: 'var(--chart-2)',
	},
};

export default function Main() {
	const alerts: AlertProps[] = [
		{ type: 'warning', message: 'Reorder point approaching' },
		{ type: 'success', message: 'Stock replenishment scheduled' },
	];

	const chartData: StockData[] = [
		{ day: 'Mon', stock: 2450, orders: 185 },
		{ day: 'Tue', stock: 2265, orders: 212 },
		{ day: 'Wed', stock: 2053, orders: 198 },
		{ day: 'Thu', stock: 1855, orders: 245 },
		{ day: 'Fri', stock: 1610, orders: 278 },
		{ day: 'Sat', stock: 1332, orders: 312 },
		{ day: 'Sun', stock: 1020, orders: 156 },
	];

	const reorderPoint = 1200;

	return (
		<section className="@container" data-theme="reports">
			<div className="mx-auto max-w-7xl px-4 py-8 @sm:px-6 @md:py-10 @2xl:px-8 @3xl:py-12">
				<Card className="border-border/50 bg-card/80 backdrop-blur-sm">
					<CardHeader className="flex flex-col gap-4 @sm:flex-row @sm:items-start @sm:justify-between">
						<div>
							<CardTitle className="text-lg @sm:text-xl">
								Stock Level Report
							</CardTitle>
							<CardDescription>
								Inventory depletion and order volume tracking
							</CardDescription>
						</div>
						<div className="flex flex-wrap gap-2">
							{alerts.map((alert, i) => (
								<StockAlert key={i} {...alert} />
							))}
						</div>
					</CardHeader>
					<CardContent>
						<ChartContainer config={chartConfig} className="h-[350px] w-full">
							<LineChart data={chartData} margin={{ left: 12, right: 12 }}>
								<CartesianGrid strokeDasharray="3 3" vertical={false} />
								<XAxis
									dataKey="day"
									tickLine={false}
									axisLine={false}
									tickMargin={8}
								/>
								<YAxis
									yAxisId="stock"
									tickLine={false}
									axisLine={false}
									tickMargin={8}
									orientation="left"
								/>
								<YAxis
									yAxisId="orders"
									tickLine={false}
									axisLine={false}
									tickMargin={8}
									orientation="right"
								/>
								<ReferenceLine
									yAxisId="stock"
									y={reorderPoint}
									stroke="var(--destructive)"
									strokeDasharray="5 5"
									label={{
										value: 'Reorder Point',
										position: 'right',
										fill: 'var(--destructive)',
										fontSize: 12,
									}}
								/>
								<ChartTooltip content={<ChartTooltipContent />} />
								<Line
									yAxisId="stock"
									type="monotone"
									dataKey="stock"
									stroke="var(--color-stock)"
									strokeWidth={2.5}
									dot={{ r: 4, fill: 'var(--color-stock)' }}
									activeDot={{ r: 6 }}
								/>
								<Line
									yAxisId="orders"
									type="monotone"
									dataKey="orders"
									stroke="var(--color-orders)"
									strokeWidth={2}
									dot={false}
									strokeDasharray="3 3"
								/>
							</LineChart>
						</ChartContainer>
					</CardContent>
				</Card>
			</div>
		</section>
	);
}
