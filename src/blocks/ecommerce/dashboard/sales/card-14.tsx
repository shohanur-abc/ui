'use client';

import { Clock, ArrowRight } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';

type HourlyData = {
	hour: string;
	orders: number;
	revenue: string;
	peak: boolean;
};

type HourlySalesCardProps = {
	title: string;
	data: HourlyData[];
	viewAllHref: string;
};

const HourlySalesCard = ({ title, data, viewAllHref }: HourlySalesCardProps) => {
	const maxOrders = Math.max(...data.map((d) => d.orders));

	return (
		<Card className="group relative overflow-hidden transition-all duration-300 hover:shadow-lg hover:shadow-primary/5 hover:border-primary/30">
			<CardHeader className="flex flex-row items-center justify-between pb-4">
				<div className="flex items-center gap-3">
					<div className="p-2 rounded-lg bg-primary/10 text-primary">
						<Clock className="size-4" />
					</div>
					<CardTitle className="text-base font-semibold">{title}</CardTitle>
				</div>
				<Button variant="ghost" size="sm" className="gap-1" asChild>
					<a href={viewAllHref}>
						View All
						<ArrowRight className="size-3" />
					</a>
				</Button>
			</CardHeader>
			<CardContent>
				<div className="space-y-3">
					{data.map((item, idx) => (
						<div
							key={idx}
							className="flex items-center gap-4 p-2 rounded-lg hover:bg-muted/30 transition-colors"
						>
							<span className="text-sm font-medium w-16 text-muted-foreground">
								{item.hour}
							</span>
							<div className="flex-1 h-6 bg-muted/30 rounded-full overflow-hidden">
								<div
									className={`h-full rounded-full transition-all duration-500 ${item.peak ? 'bg-primary' : 'bg-primary/50'}`}
									style={{ width: `${(item.orders / maxOrders) * 100}%` }}
								/>
							</div>
							<div className="flex items-center gap-3 min-w-[140px] justify-end">
								<span className="text-sm font-medium">{item.orders} orders</span>
								{item.peak && (
									<Badge variant="secondary" className="text-xs">
										Peak
									</Badge>
								)}
							</div>
							<span className="text-sm font-semibold min-w-[80px] text-right">
								{item.revenue}
							</span>
						</div>
					))}
				</div>
			</CardContent>
		</Card>
	);
};

export default function Main() {
	const hourlyData: HourlyData[] = [
		{ hour: '9:00 AM', orders: 45, revenue: '$2,250', peak: false },
		{ hour: '10:00 AM', orders: 72, revenue: '$3,600', peak: false },
		{ hour: '11:00 AM', orders: 89, revenue: '$4,450', peak: false },
		{ hour: '12:00 PM', orders: 156, revenue: '$7,800', peak: true },
		{ hour: '1:00 PM', orders: 134, revenue: '$6,700', peak: true },
		{ hour: '2:00 PM', orders: 98, revenue: '$4,900', peak: false },
		{ hour: '3:00 PM', orders: 76, revenue: '$3,800', peak: false },
		{ hour: '4:00 PM', orders: 82, revenue: '$4,100', peak: false },
	];

	return (
		<section className="@container" data-theme="sales">
			<div className="mx-auto max-w-7xl px-4 @sm:px-6 @2xl:px-8 py-8 @md:py-12">
				<HourlySalesCard
					title="Hourly Sales Distribution"
					data={hourlyData}
					viewAllHref="#hourly-report"
				/>
			</div>
		</section>
	);
}
