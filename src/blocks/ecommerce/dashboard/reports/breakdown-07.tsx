'use client';

import { Truck } from 'lucide-react';

import {
	Card,
	CardContent,
	CardDescription,
	CardHeader,
	CardTitle,
} from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { Badge } from '@/components/ui/badge';
import {
	Table,
	TableBody,
	TableCell,
	TableHead,
	TableHeader,
	TableRow,
} from '@/components/ui/table';

type ShippingMethodProps = {
	method: string;
	orders: string;
	percentage: number;
	avgCost: string;
	avgTime: string;
	onTime: number;
};

type ShippingStatusProps = {
	status: string;
	count: string;
	percentage: number;
	color: string;
};

const ShippingStatus = ({
	status,
	count,
	percentage,
	color,
}: ShippingStatusProps) => (
	<div className="rounded-lg border border-border/30 bg-muted/20 p-4">
		<div className="flex items-center gap-2">
			<div className="size-3 rounded-full" style={{ backgroundColor: color }} />
			<span className="text-sm font-medium">{status}</span>
		</div>
		<p className="mt-2 text-2xl font-bold">{count}</p>
		<Progress value={percentage} className="mt-2 h-1.5" />
		<p className="mt-1 text-xs text-muted-foreground">{percentage}% of total</p>
	</div>
);

export default function Main() {
	const statuses: ShippingStatusProps[] = [
		{
			status: 'Delivered',
			count: '8,450',
			percentage: 72,
			color: 'var(--chart-1)',
		},
		{
			status: 'In Transit',
			count: '1,850',
			percentage: 16,
			color: 'var(--chart-2)',
		},
		{
			status: 'Processing',
			count: '980',
			percentage: 8,
			color: 'var(--chart-3)',
		},
		{ status: 'Pending', count: '450', percentage: 4, color: 'var(--chart-4)' },
	];

	const methods: ShippingMethodProps[] = [
		{
			method: 'Standard Shipping',
			orders: '5,240',
			percentage: 45,
			avgCost: '$5.99',
			avgTime: '5-7 days',
			onTime: 94,
		},
		{
			method: 'Express Shipping',
			orders: '3,180',
			percentage: 27,
			avgCost: '$12.99',
			avgTime: '2-3 days',
			onTime: 96,
		},
		{
			method: 'Next Day',
			orders: '1,850',
			percentage: 16,
			avgCost: '$24.99',
			avgTime: '1 day',
			onTime: 98,
		},
		{
			method: 'Free Shipping',
			orders: '980',
			percentage: 8,
			avgCost: '$0.00',
			avgTime: '7-10 days',
			onTime: 89,
		},
		{
			method: 'Store Pickup',
			orders: '480',
			percentage: 4,
			avgCost: '$0.00',
			avgTime: 'Same day',
			onTime: 99,
		},
	];

	return (
		<section className="@container" data-theme="reports">
			<div className="mx-auto max-w-7xl px-4 py-8 @sm:px-6 @md:py-10 @2xl:px-8 @3xl:py-12">
				<Card className="border-border/50 bg-card/80 backdrop-blur-sm">
					<CardHeader className="flex flex-col gap-2 @sm:flex-row @sm:items-center @sm:justify-between">
						<div className="flex items-start gap-3">
							<div className="rounded-lg bg-primary/10 p-2">
								<Truck className="size-5 text-primary" />
							</div>
							<div>
								<CardTitle className="text-lg @sm:text-xl">
									Shipping Breakdown Report
								</CardTitle>
								<CardDescription>
									Distribution by status and shipping method
								</CardDescription>
							</div>
						</div>
						<Badge variant="outline">11,730 Total Shipments</Badge>
					</CardHeader>
					<CardContent className="space-y-6">
						<div className="grid gap-4 @sm:grid-cols-2 @xl:grid-cols-4">
							{statuses.map((s, i) => (
								<ShippingStatus key={i} {...s} />
							))}
						</div>
						<Card className="border-border/30 bg-muted/10">
							<CardContent className="p-4">
								<p className="mb-4 text-sm font-medium">By Shipping Method</p>
								<div className="overflow-x-auto">
									<Table>
										<TableHeader>
											<TableRow>
												<TableHead>Method</TableHead>
												<TableHead className="text-right">Orders</TableHead>
												<TableHead className="text-right">Share</TableHead>
												<TableHead className="text-right">Avg Cost</TableHead>
												<TableHead className="text-right">
													Delivery Time
												</TableHead>
												<TableHead className="text-right">On-Time %</TableHead>
											</TableRow>
										</TableHeader>
										<TableBody>
											{methods.map((m, i) => (
												<TableRow key={i}>
													<TableCell className="font-medium">
														{m.method}
													</TableCell>
													<TableCell className="text-right">
														{m.orders}
													</TableCell>
													<TableCell className="text-right">
														<Badge variant="outline" className="text-[10px]">
															{m.percentage}%
														</Badge>
													</TableCell>
													<TableCell className="text-right">
														{m.avgCost}
													</TableCell>
													<TableCell className="text-right text-muted-foreground">
														{m.avgTime}
													</TableCell>
													<TableCell className="text-right">
														<Badge
															variant="outline"
															className={
																m.onTime >= 95
																	? 'border-emerald-500/20 bg-emerald-500/10 text-emerald-500'
																	: m.onTime >= 90
																		? 'border-amber-500/20 bg-amber-500/10 text-amber-500'
																		: 'border-rose-500/20 bg-rose-500/10 text-rose-500'
															}
														>
															{m.onTime}%
														</Badge>
													</TableCell>
												</TableRow>
											))}
										</TableBody>
									</Table>
								</div>
							</CardContent>
						</Card>
					</CardContent>
				</Card>
			</div>
		</section>
	);
}
