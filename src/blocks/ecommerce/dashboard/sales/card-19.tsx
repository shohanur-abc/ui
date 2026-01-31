'use client';

import { ShoppingCart, Package, DollarSign, Clock } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';

type SummaryItem = {
	label: string;
	value: string;
};

type QuickSummaryCardProps = {
	title: string;
	period: string;
	revenue: SummaryItem[];
	orders: SummaryItem[];
	timing: SummaryItem[];
};

const QuickSummaryCard = ({
	title,
	period,
	revenue,
	orders,
	timing,
}: QuickSummaryCardProps) => (
	<Card className="group relative overflow-hidden transition-all duration-300 hover:shadow-lg hover:shadow-primary/5 hover:border-primary/30">
		<CardHeader className="flex flex-row items-center justify-between pb-4">
			<CardTitle className="text-base font-semibold">{title}</CardTitle>
			<span className="text-sm text-muted-foreground">{period}</span>
		</CardHeader>
		<CardContent>
			<div className="grid grid-cols-1 @md:grid-cols-3 gap-6">
				<div className="space-y-4">
					<div className="flex items-center gap-2 text-primary">
						<DollarSign className="size-4" />
						<span className="font-medium text-sm">Revenue</span>
					</div>
					<div className="space-y-3">
						{revenue.map((item, idx) => (
							<div key={idx} className="flex items-center justify-between">
								<span className="text-sm text-muted-foreground">
									{item.label}
								</span>
								<span className="font-semibold">{item.value}</span>
							</div>
						))}
					</div>
				</div>

				<div className="space-y-4 @md:border-x @md:border-border/50 @md:px-6">
					<div className="flex items-center gap-2 text-primary">
						<Package className="size-4" />
						<span className="font-medium text-sm">Orders</span>
					</div>
					<div className="space-y-3">
						{orders.map((item, idx) => (
							<div key={idx} className="flex items-center justify-between">
								<span className="text-sm text-muted-foreground">
									{item.label}
								</span>
								<span className="font-semibold">{item.value}</span>
							</div>
						))}
					</div>
				</div>

				<div className="space-y-4">
					<div className="flex items-center gap-2 text-primary">
						<Clock className="size-4" />
						<span className="font-medium text-sm">Timing</span>
					</div>
					<div className="space-y-3">
						{timing.map((item, idx) => (
							<div key={idx} className="flex items-center justify-between">
								<span className="text-sm text-muted-foreground">
									{item.label}
								</span>
								<span className="font-semibold">{item.value}</span>
							</div>
						))}
					</div>
				</div>
			</div>
		</CardContent>
	</Card>
);

export default function Main() {
	return (
		<section className="@container" data-theme="sales">
			<div className="mx-auto max-w-7xl px-4 @sm:px-6 @2xl:px-8 py-8 @md:py-12">
				<QuickSummaryCard
					title="Quick Summary"
					period="January 2026"
					revenue={[
						{ label: 'Gross Revenue', value: '$148,520' },
						{ label: 'Net Revenue', value: '$135,234' },
						{ label: 'Refunds', value: '-$13,286' },
						{ label: 'Avg. Order', value: '$89.50' },
					]}
					orders={[
						{ label: 'Total Orders', value: '1,660' },
						{ label: 'Fulfilled', value: '1,520' },
						{ label: 'Pending', value: '98' },
						{ label: 'Cancelled', value: '42' },
					]}
					timing={[
						{ label: 'Peak Day', value: 'Saturday' },
						{ label: 'Peak Hour', value: '2:00 PM' },
						{ label: 'Avg. Fulfillment', value: '1.8 days' },
						{ label: 'Avg. Delivery', value: '4.2 days' },
					]}
				/>
			</div>
		</section>
	);
}
