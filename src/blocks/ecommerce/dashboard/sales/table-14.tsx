'use client';

import { Clock, TrendingUp, TrendingDown, Minus } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import {
	Table,
	TableBody,
	TableCell,
	TableHead,
	TableHeader,
	TableRow,
} from '@/components/ui/table';

type HourlyData = {
	hour: string;
	orders: number;
	revenue: number;
	avgOrderValue: number;
	visitors: number;
	conversionRate: number;
	trend: 'up' | 'down' | 'stable';
	peakStatus: 'peak' | 'normal' | 'low';
};

type HourlyTableCardProps = {
	title: string;
	description: string;
	data: HourlyData[];
};

const getTrendIcon = (trend: HourlyData['trend']) => {
	switch (trend) {
		case 'up':
			return <TrendingUp className="size-4 text-primary" />;
		case 'down':
			return <TrendingDown className="size-4 text-destructive" />;
		default:
			return <Minus className="size-4 text-muted-foreground" />;
	}
};

const getPeakBadge = (status: HourlyData['peakStatus']) => {
	switch (status) {
		case 'peak':
			return <Badge className="bg-primary">Peak</Badge>;
		case 'low':
			return <Badge variant="secondary">Low</Badge>;
		default:
			return null;
	}
};

const HourlyTableCard = ({
	title,
	description,
	data,
}: HourlyTableCardProps) => {
	const maxRevenue = Math.max(...data.map((d) => d.revenue));

	return (
		<Card className="group relative overflow-hidden transition-all duration-300 hover:shadow-lg hover:shadow-primary/5 hover:border-primary/30">
			<CardHeader className="flex flex-row items-center gap-3 pb-2">
				<div className="p-2 rounded-lg bg-primary/10 text-primary">
					<Clock className="size-4" />
				</div>
				<div>
					<CardTitle className="text-base font-semibold">{title}</CardTitle>
					<p className="text-sm text-muted-foreground">{description}</p>
				</div>
			</CardHeader>
			<CardContent>
				<div className="overflow-x-auto max-h-[400px] overflow-y-auto">
					<Table>
						<TableHeader className="sticky top-0 bg-card z-10">
							<TableRow>
								<TableHead>Hour</TableHead>
								<TableHead className="text-right">Orders</TableHead>
								<TableHead>Revenue</TableHead>
								<TableHead className="text-right">AOV</TableHead>
								<TableHead className="text-right">Visitors</TableHead>
								<TableHead className="text-right">Conv %</TableHead>
								<TableHead>Trend</TableHead>
							</TableRow>
						</TableHeader>
						<TableBody>
							{data.map((row, idx) => (
								<TableRow
									key={idx}
									className={`hover:bg-muted/50 transition-colors ${
										row.peakStatus === 'peak' ? 'bg-primary/5' : ''
									}`}
								>
									<TableCell>
										<div className="flex items-center gap-2">
											<span className="font-mono font-medium">{row.hour}</span>
											{getPeakBadge(row.peakStatus)}
										</div>
									</TableCell>
									<TableCell className="text-right font-medium">
										{row.orders}
									</TableCell>
									<TableCell>
										<div className="flex items-center gap-2">
											<div
												className="h-2 rounded-full bg-primary"
												style={{
													width: `${(row.revenue / maxRevenue) * 100}%`,
													minWidth: '20px',
													maxWidth: '100px',
												}}
											/>
											<span className="font-semibold">
												${row.revenue.toLocaleString()}
											</span>
										</div>
									</TableCell>
									<TableCell className="text-right">
										${row.avgOrderValue}
									</TableCell>
									<TableCell className="text-right text-muted-foreground">
										{row.visitors.toLocaleString()}
									</TableCell>
									<TableCell className="text-right">
										<span
											className={
												row.conversionRate >= 4
													? 'text-primary font-semibold'
													: row.conversionRate >= 2
														? 'text-amber-500'
														: 'text-muted-foreground'
											}
										>
											{row.conversionRate}%
										</span>
									</TableCell>
									<TableCell>{getTrendIcon(row.trend)}</TableCell>
								</TableRow>
							))}
						</TableBody>
					</Table>
				</div>
			</CardContent>
		</Card>
	);
};

export default function Main() {
	const data: HourlyData[] = [
		{ hour: '00:00', orders: 12, revenue: 1080, avgOrderValue: 90, visitors: 450, conversionRate: 2.7, trend: 'down', peakStatus: 'low' },
		{ hour: '01:00', orders: 8, revenue: 680, avgOrderValue: 85, visitors: 320, conversionRate: 2.5, trend: 'down', peakStatus: 'low' },
		{ hour: '06:00', orders: 25, revenue: 2375, avgOrderValue: 95, visitors: 680, conversionRate: 3.7, trend: 'up', peakStatus: 'normal' },
		{ hour: '09:00', orders: 85, revenue: 8925, avgOrderValue: 105, visitors: 2100, conversionRate: 4.0, trend: 'up', peakStatus: 'normal' },
		{ hour: '10:00', orders: 120, revenue: 13200, avgOrderValue: 110, visitors: 2800, conversionRate: 4.3, trend: 'up', peakStatus: 'peak' },
		{ hour: '11:00', orders: 135, revenue: 15525, avgOrderValue: 115, visitors: 3100, conversionRate: 4.4, trend: 'up', peakStatus: 'peak' },
		{ hour: '12:00', orders: 145, revenue: 17400, avgOrderValue: 120, visitors: 3400, conversionRate: 4.3, trend: 'stable', peakStatus: 'peak' },
		{ hour: '13:00', orders: 125, revenue: 14375, avgOrderValue: 115, visitors: 2900, conversionRate: 4.3, trend: 'down', peakStatus: 'normal' },
		{ hour: '14:00', orders: 95, revenue: 10450, avgOrderValue: 110, visitors: 2400, conversionRate: 4.0, trend: 'down', peakStatus: 'normal' },
		{ hour: '18:00', orders: 110, revenue: 12100, avgOrderValue: 110, visitors: 2600, conversionRate: 4.2, trend: 'up', peakStatus: 'peak' },
		{ hour: '19:00', orders: 130, revenue: 15600, avgOrderValue: 120, visitors: 3000, conversionRate: 4.3, trend: 'up', peakStatus: 'peak' },
		{ hour: '20:00', orders: 115, revenue: 12650, avgOrderValue: 110, visitors: 2700, conversionRate: 4.3, trend: 'down', peakStatus: 'normal' },
	];

	return (
		<section className="@container" data-theme="sales">
			<div className="mx-auto max-w-7xl px-4 @sm:px-6 @2xl:px-8 py-8 @md:py-12">
				<HourlyTableCard
					title="Hourly Sales Breakdown"
					description="Today's sales performance by hour"
					data={data}
				/>
			</div>
		</section>
	);
}
