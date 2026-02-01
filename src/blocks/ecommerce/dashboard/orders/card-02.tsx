import {
	Card,
	CardContent,
	CardHeader,
	CardTitle,
	CardAction,
} from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import {
	MoreHorizontal,
	Package,
	DollarSign,
	Clock,
	CheckCircle2,
	AlertCircle,
} from 'lucide-react';

interface Order {
	id: string;
	customer: { name: string; avatar: string; initials: string };
	amount: string;
	items: number;
	status: 'pending' | 'completed' | 'failed';
	timeAgo: string;
}

interface OrderCardCompactProps {
	order: Order;
}

interface StatusIconProps {
	status: Order['status'];
}

const StatusIcon = ({ status }: StatusIconProps) => {
	const config: Record<
		Order['status'],
		{ icon: typeof CheckCircle2; className: string }
	> = {
		pending: { icon: Clock, className: 'text-yellow-500 bg-yellow-500/10' },
		completed: { icon: CheckCircle2, className: 'text-accent bg-accent/10' },
		failed: {
			icon: AlertCircle,
			className: 'text-destructive bg-destructive/10',
		},
	};
	const { icon: Icon, className } = config[status];
	return (
		<div
			className={`size-8 rounded-full flex items-center justify-center ${className}`}
		>
			<Icon className="size-4" />
		</div>
	);
};

const CustomerInfo = ({ customer }: { customer: Order['customer'] }) => (
	<div className="flex items-center gap-3">
		<Avatar className="size-10">
			<AvatarImage src={customer.avatar} alt={customer.name} />
			<AvatarFallback className="bg-primary/10 text-primary text-sm">
				{customer.initials}
			</AvatarFallback>
		</Avatar>
		<div>
			<p className="font-medium">{customer.name}</p>
		</div>
	</div>
);

const OrderMetric = ({
	icon: Icon,
	value,
	label,
}: {
	icon: React.ComponentType<{ className?: string }>;
	value: string;
	label: string;
}) => (
	<div className="flex items-center gap-2 text-sm">
		<Icon className="size-4 text-muted-foreground" />
		<span className="text-muted-foreground">{label}:</span>
		<span className="font-semibold">{value}</span>
	</div>
);

const OrderCardCompact = ({ order }: OrderCardCompactProps) => (
	<Card className="border-border/50 bg-card/50 backdrop-blur-sm group hover:border-primary/30 transition-all hover:shadow-lg hover:shadow-primary/5">
		<CardContent className="p-4">
			<div className="flex items-start gap-4">
				<StatusIcon status={order.status} />
				<div className="flex-1 min-w-0">
					<div className="flex items-center justify-between mb-2">
						<span className="font-mono text-sm text-muted-foreground">
							{order.id}
						</span>
						<span className="text-xs text-muted-foreground">
							{order.timeAgo}
						</span>
					</div>
					<CustomerInfo customer={order.customer} />
					<div className="flex items-center gap-4 mt-3">
						<OrderMetric icon={DollarSign} value={order.amount} label="Total" />
						<OrderMetric
							icon={Package}
							value={order.items.toString()}
							label="Items"
						/>
					</div>
				</div>
				<Button
					variant="ghost"
					size="icon-sm"
					className="opacity-0 group-hover:opacity-100 transition-opacity"
				>
					<MoreHorizontal className="size-4" />
				</Button>
			</div>
		</CardContent>
	</Card>
);

export default function Main() {
	const orders: Order[] = [
		{
			id: '#ORD-7891',
			customer: { name: 'Alex Thompson', avatar: '', initials: 'AT' },
			amount: '$342.00',
			items: 3,
			status: 'completed',
			timeAgo: '2 min ago',
		},
		{
			id: '#ORD-7892',
			customer: { name: 'Maria Santos', avatar: '', initials: 'MS' },
			amount: '$89.99',
			items: 1,
			status: 'pending',
			timeAgo: '15 min ago',
		},
		{
			id: '#ORD-7893',
			customer: { name: 'James Chen', avatar: '', initials: 'JC' },
			amount: '$567.50',
			items: 5,
			status: 'completed',
			timeAgo: '1 hour ago',
		},
		{
			id: '#ORD-7894',
			customer: { name: 'Lisa Park', avatar: '', initials: 'LP' },
			amount: '$124.00',
			items: 2,
			status: 'failed',
			timeAgo: '2 hours ago',
		},
	];

	return (
		<section className="@container" data-theme="orders">
			<div className="mx-auto max-w-lg px-4 @sm:px-6 @2xl:px-8 py-8 @md:py-10 @xl:py-12">
				<div className="space-y-3">
					{orders.map((order) => (
						<OrderCardCompact key={order.id} order={order} />
					))}
				</div>
			</div>
		</section>
	);
}
