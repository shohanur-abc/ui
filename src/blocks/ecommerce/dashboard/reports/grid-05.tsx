'use client';

import {
	AlertCircle,
	CheckCircle2,
	Clock,
	MoreHorizontal,
	Package,
	Truck,
	XCircle,
} from 'lucide-react';
import type { LucideIcon } from 'lucide-react';

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
	Table,
	TableBody,
	TableCell,
	TableHead,
	TableHeader,
	TableRow,
} from '@/components/ui/table';

type OrderStatus =
	| 'completed'
	| 'processing'
	| 'shipped'
	| 'cancelled'
	| 'pending';

type OrderReportItem = {
	id: string;
	customer: string;
	product: string;
	amount: string;
	status: OrderStatus;
	date: string;
};

const statusConfig: Record<
	OrderStatus,
	{ icon: LucideIcon; color: string; bg: string }
> = {
	completed: {
		icon: CheckCircle2,
		color: 'text-emerald-500',
		bg: 'bg-emerald-500/10',
	},
	processing: { icon: Clock, color: 'text-amber-500', bg: 'bg-amber-500/10' },
	shipped: { icon: Truck, color: 'text-blue-500', bg: 'bg-blue-500/10' },
	cancelled: { icon: XCircle, color: 'text-rose-500', bg: 'bg-rose-500/10' },
	pending: {
		icon: AlertCircle,
		color: 'text-orange-500',
		bg: 'bg-orange-500/10',
	},
};

const StatusBadge = ({ status }: { status: OrderStatus }) => {
	const config = statusConfig[status];
	const Icon = config.icon;
	return (
		<Badge
			variant="outline"
			className={`${config.bg} ${config.color} border-transparent`}
		>
			<Icon className="mr-1 size-3" />
			{status.charAt(0).toUpperCase() + status.slice(1)}
		</Badge>
	);
};

type OrderRowProps = OrderReportItem;

const OrderRow = ({
	id,
	customer,
	product,
	amount,
	status,
	date,
}: OrderRowProps) => (
	<TableRow className="group transition-colors hover:bg-muted/50">
		<TableCell className="font-mono text-sm font-medium">{id}</TableCell>
		<TableCell className="font-medium">{customer}</TableCell>
		<TableCell className="max-w-[200px] truncate">{product}</TableCell>
		<TableCell className="text-right font-medium">{amount}</TableCell>
		<TableCell>
			<StatusBadge status={status} />
		</TableCell>
		<TableCell className="text-right text-muted-foreground">{date}</TableCell>
	</TableRow>
);

type HeaderProps = {
	title: string;
	description: string;
};

const ReportHeader = ({ title, description }: HeaderProps) => (
	<CardHeader className="flex flex-row items-center justify-between">
		<div>
			<CardTitle className="text-lg @sm:text-xl">{title}</CardTitle>
			<CardDescription>{description}</CardDescription>
		</div>
		<Button variant="ghost" size="icon">
			<MoreHorizontal className="size-4" />
		</Button>
	</CardHeader>
);

export default function Main() {
	const headerProps: HeaderProps = {
		title: 'Order Status Report',
		description: 'Recent orders with current fulfillment status',
	};

	const orders: OrderReportItem[] = [
		{
			id: 'ORD-7821',
			customer: 'Emma Wilson',
			product: 'Wireless Bluetooth Speaker Pro',
			amount: '$129.99',
			status: 'completed',
			date: 'Jan 28, 2026',
		},
		{
			id: 'ORD-7820',
			customer: 'James Brown',
			product: 'Ergonomic Gaming Chair',
			amount: '$349.00',
			status: 'shipped',
			date: 'Jan 28, 2026',
		},
		{
			id: 'ORD-7819',
			customer: 'Sofia Garcia',
			product: 'Smart Home Security Camera',
			amount: '$89.99',
			status: 'processing',
			date: 'Jan 27, 2026',
		},
		{
			id: 'ORD-7818',
			customer: 'Oliver Martinez',
			product: 'Premium Noise-Canceling Headphones',
			amount: '$249.99',
			status: 'pending',
			date: 'Jan 27, 2026',
		},
		{
			id: 'ORD-7817',
			customer: 'Ava Thompson',
			product: 'Portable External SSD 1TB',
			amount: '$159.00',
			status: 'cancelled',
			date: 'Jan 26, 2026',
		},
		{
			id: 'ORD-7816',
			customer: 'Liam Anderson',
			product: 'Mechanical Keyboard RGB',
			amount: '$189.99',
			status: 'completed',
			date: 'Jan 26, 2026',
		},
	];

	return (
		<section className="@container" data-theme="reports">
			<div className="mx-auto max-w-7xl px-4 py-8 @sm:px-6 @md:py-10 @2xl:px-8 @3xl:py-12">
				<Card className="overflow-hidden border-border/50 bg-card/80 backdrop-blur-sm">
					<ReportHeader {...headerProps} />
					<CardContent className="p-0">
						<Table>
							<TableHeader>
								<TableRow className="border-border/50 hover:bg-transparent">
									<TableHead className="w-28">Order ID</TableHead>
									<TableHead>Customer</TableHead>
									<TableHead>Product</TableHead>
									<TableHead className="text-right">Amount</TableHead>
									<TableHead>Status</TableHead>
									<TableHead className="text-right">Date</TableHead>
								</TableRow>
							</TableHeader>
							<TableBody>
								{orders.map((order) => (
									<OrderRow key={order.id} {...order} />
								))}
							</TableBody>
						</Table>
					</CardContent>
				</Card>
			</div>
		</section>
	);
}
