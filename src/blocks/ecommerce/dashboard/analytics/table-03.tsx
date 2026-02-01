'use client';

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
import { TrendingUp, TrendingDown } from 'lucide-react';

type Order = {
	id: string;
	customer: string;
	items: number;
	total: number;
	status: 'pending' | 'processing' | 'shipped' | 'delivered' | 'cancelled';
	date: string;
};

const statusColors = {
	pending: 'text-amber-500 border-amber-500/30 bg-amber-500/10',
	processing: 'text-blue-500 border-blue-500/30 bg-blue-500/10',
	shipped: 'text-purple-500 border-purple-500/30 bg-purple-500/10',
	delivered: 'text-emerald-500 border-emerald-500/30 bg-emerald-500/10',
	cancelled: 'text-rose-500 border-rose-500/30 bg-rose-500/10',
};

const OrderRow = ({ order }: { order: Order }) => (
	<TableRow className="hover:bg-muted/30">
		<TableCell className="font-mono text-xs">{order.id}</TableCell>
		<TableCell className="font-medium">{order.customer}</TableCell>
		<TableCell>{order.items}</TableCell>
		<TableCell>${order.total.toFixed(2)}</TableCell>
		<TableCell>
			<Badge variant="outline" className={statusColors[order.status]}>
				{order.status.charAt(0).toUpperCase() + order.status.slice(1)}
			</Badge>
		</TableCell>
		<TableCell className="text-muted-foreground">{order.date}</TableCell>
	</TableRow>
);

const orders: Order[] = [
	{
		id: 'ORD-2024-001',
		customer: 'Sarah Johnson',
		items: 3,
		total: 245.99,
		status: 'delivered',
		date: 'Jan 15, 2024',
	},
	{
		id: 'ORD-2024-002',
		customer: 'Michael Chen',
		items: 1,
		total: 149.99,
		status: 'shipped',
		date: 'Jan 16, 2024',
	},
	{
		id: 'ORD-2024-003',
		customer: 'Emily Davis',
		items: 5,
		total: 432.5,
		status: 'processing',
		date: 'Jan 17, 2024',
	},
	{
		id: 'ORD-2024-004',
		customer: 'James Wilson',
		items: 2,
		total: 89.99,
		status: 'pending',
		date: 'Jan 17, 2024',
	},
	{
		id: 'ORD-2024-005',
		customer: 'Lisa Brown',
		items: 1,
		total: 299.99,
		status: 'cancelled',
		date: 'Jan 18, 2024',
	},
	{
		id: 'ORD-2024-006',
		customer: 'David Lee',
		items: 4,
		total: 567.0,
		status: 'shipped',
		date: 'Jan 18, 2024',
	},
];

export default function Main() {
	return (
		<section className="@container" data-theme="dashboard">
			<div className="mx-auto max-w-7xl px-4 @sm:px-6 @2xl:px-8 py-8 @md:py-12 @xl:py-16">
				<Card className="border-border/50 bg-card/80 backdrop-blur-sm">
					<CardHeader className="pb-2">
						<CardTitle className="text-sm font-medium">Recent Orders</CardTitle>
						<p className="text-xs text-muted-foreground">
							Latest order activity
						</p>
					</CardHeader>
					<CardContent>
						<div className="overflow-x-auto">
							<Table>
								<TableHeader>
									<TableRow>
										<TableHead>Order ID</TableHead>
										<TableHead>Customer</TableHead>
										<TableHead>Items</TableHead>
										<TableHead>Total</TableHead>
										<TableHead>Status</TableHead>
										<TableHead>Date</TableHead>
									</TableRow>
								</TableHeader>
								<TableBody>
									{orders.map((order, i) => (
										<OrderRow key={i} order={order} />
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
