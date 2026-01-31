import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Package, ChevronRight, Clock, Truck, CheckCircle2, XCircle } from 'lucide-react';

interface OrderItem {
	id: string;
	customer: { name: string; avatar: string; initials: string };
	items: number;
	total: string;
	status: 'pending' | 'processing' | 'shipped' | 'delivered' | 'cancelled';
	date: string;
}

interface OrderListItemProps {
	order: OrderItem;
	labels: { items: string; viewDetails: string };
}

const StatusConfig: Record<OrderItem['status'], { icon: typeof Clock; className: string; label: string }> = {
	pending: { icon: Clock, className: 'text-yellow-500 bg-yellow-500/10', label: 'Pending' },
	processing: { icon: Package, className: 'text-blue-500 bg-blue-500/10', label: 'Processing' },
	shipped: { icon: Truck, className: 'text-primary bg-primary/10', label: 'Shipped' },
	delivered: { icon: CheckCircle2, className: 'text-accent bg-accent/10', label: 'Delivered' },
	cancelled: { icon: XCircle, className: 'text-destructive bg-destructive/10', label: 'Cancelled' },
};

const OrderListItem = ({ order, labels }: OrderListItemProps) => {
	const { icon: Icon, className, label } = StatusConfig[order.status];
	return (
		<div className="flex items-center gap-4 p-4 rounded-xl bg-card/50 border border-border/50 hover:border-primary/30 hover:bg-card/80 transition-all cursor-pointer group">
			<Avatar className="size-12">
				<AvatarImage src={order.customer.avatar} alt={order.customer.name} />
				<AvatarFallback className="bg-primary/10 text-primary font-medium">{order.customer.initials}</AvatarFallback>
			</Avatar>

			<div className="flex-1 min-w-0">
				<div className="flex items-center gap-2 mb-1">
					<span className="font-semibold">{order.customer.name}</span>
					<span className="text-xs text-muted-foreground font-mono">{order.id}</span>
				</div>
				<div className="flex items-center gap-2 text-sm text-muted-foreground">
					<span>{order.items} {labels.items}</span>
					<span>•</span>
					<span>{order.date}</span>
				</div>
			</div>

			<div className="flex items-center gap-3">
				<span className="font-semibold text-lg">{order.total}</span>
				<Badge variant="outline" className={`gap-1 ${className}`}>
					<Icon className="size-3" />
					{label}
				</Badge>
				<Button variant="ghost" size="icon" className="opacity-0 group-hover:opacity-100 transition-opacity">
					<ChevronRight className="size-5" />
				</Button>
			</div>
		</div>
	);
};

export default function Main() {
	const labels = { items: 'items', viewDetails: 'View' };

	const orders: OrderItem[] = [
		{ id: '#ORD-001', customer: { name: 'Sarah Johnson', avatar: '', initials: 'SJ' }, items: 3, total: '$124.00', status: 'pending', date: 'Today, 2:30 PM' },
		{ id: '#ORD-002', customer: { name: 'Mike Chen', avatar: '', initials: 'MC' }, items: 5, total: '$299.00', status: 'processing', date: 'Today, 11:00 AM' },
		{ id: '#ORD-003', customer: { name: 'Emily Davis', avatar: '', initials: 'ED' }, items: 1, total: '$89.00', status: 'shipped', date: 'Yesterday' },
		{ id: '#ORD-004', customer: { name: 'Alex Brown', avatar: '', initials: 'AB' }, items: 2, total: '$156.00', status: 'delivered', date: 'Jan 28, 2024' },
		{ id: '#ORD-005', customer: { name: 'Lisa Wang', avatar: '', initials: 'LW' }, items: 4, total: '$445.00', status: 'cancelled', date: 'Jan 27, 2024' },
	];

	return (
		<section className="@container" data-theme="orders">
			<div className="mx-auto max-w-3xl px-4 @sm:px-6 @2xl:px-8 py-8 @md:py-10 @xl:py-12">
				<div className="space-y-3">
					{orders.map((order) => (
						<OrderListItem key={order.id} order={order} labels={labels} />
					))}
				</div>
			</div>
		</section>
	);
}
