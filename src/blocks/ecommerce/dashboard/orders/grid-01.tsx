import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import {
	Package,
	Clock,
	Truck,
	CheckCircle2,
	XCircle,
	Eye,
	MoreVertical,
} from 'lucide-react';

interface OrderCard {
	id: string;
	customer: string;
	items: number;
	total: string;
	status: 'pending' | 'processing' | 'shipped' | 'delivered' | 'cancelled';
	date: string;
}

interface OrderGridCardProps {
	order: OrderCard;
	labels: { items: string; view: string };
}

const StatusConfig: Record<
	OrderCard['status'],
	{ icon: typeof Clock; className: string; bgClass: string; label: string }
> = {
	pending: {
		icon: Clock,
		className: 'text-yellow-500',
		bgClass: 'bg-yellow-500/10',
		label: 'Pending',
	},
	processing: {
		icon: Package,
		className: 'text-blue-500',
		bgClass: 'bg-blue-500/10',
		label: 'Processing',
	},
	shipped: {
		icon: Truck,
		className: 'text-primary',
		bgClass: 'bg-primary/10',
		label: 'Shipped',
	},
	delivered: {
		icon: CheckCircle2,
		className: 'text-accent',
		bgClass: 'bg-accent/10',
		label: 'Delivered',
	},
	cancelled: {
		icon: XCircle,
		className: 'text-destructive',
		bgClass: 'bg-destructive/10',
		label: 'Cancelled',
	},
};

const OrderGridCard = ({ order, labels }: OrderGridCardProps) => {
	const { icon: Icon, className, bgClass, label } = StatusConfig[order.status];
	return (
		<Card className="border-border/50 bg-card/50 backdrop-blur-sm hover:border-primary/30 hover:shadow-md transition-all group">
			<CardContent className="p-4">
				<div className="flex items-center justify-between mb-3">
					<div
						className={`size-10 rounded-lg flex items-center justify-center ${bgClass}`}
					>
						<Icon className={`size-5 ${className}`} />
					</div>
					<Button
						variant="ghost"
						size="icon-sm"
						className="opacity-0 group-hover:opacity-100 transition-opacity"
					>
						<MoreVertical className="size-4" />
					</Button>
				</div>

				<p className="font-mono text-sm text-muted-foreground mb-1">
					{order.id}
				</p>
				<p className="font-semibold mb-2">{order.customer}</p>

				<div className="flex items-center gap-2 text-sm text-muted-foreground mb-3">
					<Package className="size-4" />
					<span>
						{order.items} {labels.items}
					</span>
					<span>•</span>
					<span>{order.date}</span>
				</div>

				<div className="flex items-center justify-between pt-3 border-t border-border/50">
					<span className="text-xl font-bold">{order.total}</span>
					<Badge
						variant="outline"
						className={`${className} ${bgClass} border-current/30`}
					>
						{label}
					</Badge>
				</div>
			</CardContent>
		</Card>
	);
};

export default function Main() {
	const labels = { items: 'items', view: 'View' };

	const orders: OrderCard[] = [
		{
			id: '#ORD-001',
			customer: 'Sarah Johnson',
			items: 3,
			total: '$124.00',
			status: 'pending',
			date: 'Today',
		},
		{
			id: '#ORD-002',
			customer: 'Mike Chen',
			items: 5,
			total: '$299.00',
			status: 'processing',
			date: 'Today',
		},
		{
			id: '#ORD-003',
			customer: 'Emily Davis',
			items: 1,
			total: '$89.00',
			status: 'shipped',
			date: 'Yesterday',
		},
		{
			id: '#ORD-004',
			customer: 'Alex Brown',
			items: 2,
			total: '$156.00',
			status: 'delivered',
			date: 'Jan 28',
		},
		{
			id: '#ORD-005',
			customer: 'Lisa Wang',
			items: 4,
			total: '$445.00',
			status: 'cancelled',
			date: 'Jan 27',
		},
		{
			id: '#ORD-006',
			customer: 'David Kim',
			items: 2,
			total: '$189.00',
			status: 'pending',
			date: 'Today',
		},
	];

	return (
		<section className="@container" data-theme="orders">
			<div className="mx-auto max-w-5xl px-4 @sm:px-6 @2xl:px-8 py-8 @md:py-10 @xl:py-12">
				<div className="grid grid-cols-1 @sm:grid-cols-2 @lg:grid-cols-3 gap-4">
					{orders.map((order) => (
						<OrderGridCard key={order.id} order={order} labels={labels} />
					))}
				</div>
			</div>
		</section>
	);
}
