import {
	CheckCircle2,
	Clock,
	MapPin,
	MoreHorizontal,
	Package,
	Truck,
	XCircle,
} from 'lucide-react';

import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';

type OrderCard = {
	id: string;
	customer: string;
	email: string;
	address: string;
	items: number;
	total: string;
	date: string;
	status: 'pending' | 'processing' | 'shipped' | 'delivered' | 'cancelled';
};

const getStatusConfig = (status: OrderCard['status']) => {
	switch (status) {
		case 'pending':
			return { icon: Clock, color: 'bg-amber-500/10 text-amber-500', label: 'Pending' };
		case 'processing':
			return { icon: Package, color: 'bg-blue-500/10 text-blue-500', label: 'Processing' };
		case 'shipped':
			return { icon: Truck, color: 'bg-primary/10 text-primary', label: 'Shipped' };
		case 'delivered':
			return { icon: CheckCircle2, color: 'bg-emerald-500/10 text-emerald-500', label: 'Delivered' };
		case 'cancelled':
			return { icon: XCircle, color: 'bg-red-500/10 text-red-500', label: 'Cancelled' };
	}
};

const OrderCardComponent = (order: OrderCard) => {
	const statusConfig = getStatusConfig(order.status);
	const StatusIcon = statusConfig.icon;

	return (
		<Card>
			<CardContent className="p-4">
				<div className="flex items-start justify-between">
					<div>
						<p className="font-medium">{order.id}</p>
						<p className="text-xs text-muted-foreground">{order.date}</p>
					</div>
					<Badge variant="secondary" className={statusConfig.color}>
						<StatusIcon className="mr-1 size-3" />
						{statusConfig.label}
					</Badge>
				</div>
				<Separator className="my-3" />
				<div className="space-y-2">
					<div>
						<p className="text-sm font-medium">{order.customer}</p>
						<p className="text-xs text-muted-foreground">{order.email}</p>
					</div>
					<div className="flex items-start gap-2 text-sm text-muted-foreground">
						<MapPin className="mt-0.5 size-3.5 shrink-0" />
						<span>{order.address}</span>
					</div>
				</div>
				<Separator className="my-3" />
				<div className="flex items-center justify-between">
					<div className="flex items-center gap-2">
						<Package className="size-4 text-muted-foreground" />
						<span className="text-sm">{order.items} items</span>
					</div>
					<p className="text-lg font-bold">{order.total}</p>
				</div>
				<div className="mt-4 flex gap-2">
					<Button variant="outline" size="sm" className="flex-1">
						View Details
					</Button>
					{order.status === 'pending' && (
						<Button size="sm" className="flex-1">
							Process
						</Button>
					)}
					{order.status === 'processing' && (
						<Button size="sm" className="flex-1">
							Ship
						</Button>
					)}
					{order.status === 'shipped' && (
						<Button size="sm" className="flex-1">
							Track
						</Button>
					)}
				</div>
			</CardContent>
		</Card>
	);
};

export default function Main() {
	const orders: OrderCard[] = [
		{ id: 'ORD-4521', customer: 'John Doe', email: 'john@example.com', address: '123 Main St, New York, NY 10001', items: 3, total: '$234.50', date: 'Dec 12, 2024', status: 'pending' },
		{ id: 'ORD-4520', customer: 'Jane Smith', email: 'jane@example.com', address: '456 Oak Ave, San Francisco, CA 94102', items: 2, total: '$189.00', date: 'Dec 12, 2024', status: 'processing' },
		{ id: 'ORD-4519', customer: 'Bob Wilson', email: 'bob@example.com', address: '789 Pine Rd, Chicago, IL 60601', items: 5, total: '$456.20', date: 'Dec 11, 2024', status: 'shipped' },
		{ id: 'ORD-4518', customer: 'Alice Brown', email: 'alice@example.com', address: '321 Elm Blvd, Seattle, WA 98101', items: 1, total: '$78.90', date: 'Dec 11, 2024', status: 'delivered' },
		{ id: 'ORD-4517', customer: 'Mike Johnson', email: 'mike@example.com', address: '654 Maple Dr, Austin, TX 78701', items: 4, total: '$321.00', date: 'Dec 10, 2024', status: 'delivered' },
		{ id: 'ORD-4516', customer: 'Sarah Davis', email: 'sarah@example.com', address: '987 Cedar Ln, Boston, MA 02101', items: 2, total: '$145.50', date: 'Dec 10, 2024', status: 'cancelled' },
	];

	return (
		<section className="@container" data-theme="dashboard">
			<div className="mx-auto max-w-7xl px-4 py-8 @sm:px-6 @md:py-10 @2xl:px-8 @3xl:py-12">
				<div className="grid gap-4 @sm:grid-cols-2 @xl:grid-cols-3">
					{orders.map((order) => (
						<OrderCardComponent key={order.id} {...order} />
					))}
				</div>
			</div>
		</section>
	);
}
