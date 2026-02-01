import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { ScrollArea } from '@/components/ui/scroll-area';
import {
	Bell,
	ShoppingCart,
	Package,
	Truck,
	CheckCircle2,
	Clock,
	MapPin,
	ChevronRight,
} from 'lucide-react';

interface OrderNotification {
	id: string;
	orderId: string;
	status: 'confirmed' | 'processing' | 'shipped' | 'delivered';
	customer: string;
	items: number;
	total: string;
	eta?: string;
	location?: string;
	timestamp: string;
}

interface OrderNotificationsProps {
	title: string;
	notifications: OrderNotification[];
	counts: {
		confirmed: number;
		processing: number;
		shipped: number;
		delivered: number;
	};
}

const StatusConfig = {
	confirmed: {
		icon: ShoppingCart,
		label: 'Confirmed',
		className: 'bg-blue-500/20 text-blue-400 border-blue-500/30',
		iconClass: 'bg-blue-500/20 text-blue-400',
	},
	processing: {
		icon: Package,
		label: 'Processing',
		className: 'bg-purple-500/20 text-purple-400 border-purple-500/30',
		iconClass: 'bg-purple-500/20 text-purple-400',
	},
	shipped: {
		icon: Truck,
		label: 'Shipped',
		className: 'bg-amber-500/20 text-amber-400 border-amber-500/30',
		iconClass: 'bg-amber-500/20 text-amber-400',
	},
	delivered: {
		icon: CheckCircle2,
		label: 'Delivered',
		className: 'bg-emerald-500/20 text-emerald-400 border-emerald-500/30',
		iconClass: 'bg-emerald-500/20 text-emerald-400',
	},
};

const OrderCard = ({ notification }: { notification: OrderNotification }) => {
	const config = StatusConfig[notification.status];
	const Icon = config.icon;

	return (
		<div className="group p-4 rounded-xl border border-border/50 bg-card/80 transition-all hover:bg-muted/50 hover:border-primary/30">
			<div className="flex items-start gap-4">
				<div
					className={`flex size-12 shrink-0 items-center justify-center rounded-xl ${config.iconClass}`}
				>
					<Icon className="size-6" />
				</div>
				<div className="flex-1 min-w-0">
					<div className="flex items-center justify-between gap-2 mb-1">
						<div className="flex items-center gap-2">
							<span className="font-semibold text-foreground">
								{notification.orderId}
							</span>
							<Badge variant="outline" className={config.className}>
								{config.label}
							</Badge>
						</div>
						<ChevronRight className="size-4 text-muted-foreground opacity-0 group-hover:opacity-100 transition-opacity" />
					</div>
					<p className="text-sm text-muted-foreground mb-2">
						{notification.customer} • {notification.items} items
					</p>
					<div className="flex items-center justify-between">
						<div className="flex items-center gap-3 text-xs text-muted-foreground">
							{notification.eta && (
								<span className="flex items-center gap-1">
									<Clock className="size-3" />
									ETA: {notification.eta}
								</span>
							)}
							{notification.location && (
								<span className="flex items-center gap-1">
									<MapPin className="size-3" />
									{notification.location}
								</span>
							)}
						</div>
						<span className="font-semibold text-foreground">
							{notification.total}
						</span>
					</div>
				</div>
			</div>
		</div>
	);
};

const StatusTabs = ({
	counts,
}: {
	counts: OrderNotificationsProps['counts'];
}) => (
	<div className="flex gap-2 overflow-x-auto pb-2">
		{Object.entries(StatusConfig).map(([status, config]) => {
			const count = counts[status as keyof typeof counts];
			return (
				<Button
					key={status}
					variant="outline"
					size="sm"
					className={`shrink-0 gap-2 ${
						status === 'confirmed' ? 'bg-primary/10 border-primary/30' : ''
					}`}
				>
					<config.icon className="size-4" />
					{config.label}
					<Badge variant="secondary" className="size-5 p-0 justify-center">
						{count}
					</Badge>
				</Button>
			);
		})}
	</div>
);

const OrderNotifications = ({
	title,
	notifications,
	counts,
}: OrderNotificationsProps) => (
	<Card className="border-border/50 bg-card/50 backdrop-blur-sm">
		<CardHeader className="flex-row items-center justify-between border-b border-border/50">
			<CardTitle className="text-lg font-semibold flex items-center gap-2">
				<Bell className="size-5" />
				{title}
			</CardTitle>
			<Button variant="outline" size="sm">
				View All Orders
			</Button>
		</CardHeader>
		<CardContent className="pt-6 space-y-4">
			<StatusTabs counts={counts} />
			<ScrollArea className="h-[420px]">
				<div className="space-y-3 pr-4">
					{notifications.map((notification) => (
						<OrderCard key={notification.id} notification={notification} />
					))}
				</div>
			</ScrollArea>
		</CardContent>
	</Card>
);

export default function Main() {
	const notifications: OrderNotification[] = [
		{
			id: '1',
			orderId: 'ORD-2024-0892',
			status: 'confirmed',
			customer: 'Sarah Chen',
			items: 3,
			total: '$249.99',
			timestamp: '2 min ago',
		},
		{
			id: '2',
			orderId: 'ORD-2024-0891',
			status: 'processing',
			customer: 'Mike Johnson',
			items: 1,
			total: '$1,299.00',
			timestamp: '15 min ago',
		},
		{
			id: '3',
			orderId: 'ORD-2024-0890',
			status: 'shipped',
			customer: 'Emily Davis',
			items: 2,
			total: '$189.50',
			eta: 'Tomorrow',
			location: 'Chicago, IL',
			timestamp: '1 hour ago',
		},
		{
			id: '4',
			orderId: 'ORD-2024-0889',
			status: 'delivered',
			customer: 'Alex Kim',
			items: 5,
			total: '$459.99',
			location: 'San Francisco, CA',
			timestamp: '2 hours ago',
		},
		{
			id: '5',
			orderId: 'ORD-2024-0888',
			status: 'shipped',
			customer: 'Jordan Lee',
			items: 1,
			total: '$79.99',
			eta: 'Mar 18',
			location: 'Seattle, WA',
			timestamp: '3 hours ago',
		},
		{
			id: '6',
			orderId: 'ORD-2024-0887',
			status: 'processing',
			customer: 'Lisa Anderson',
			items: 4,
			total: '$349.00',
			timestamp: '4 hours ago',
		},
	];

	return (
		<section className="@container" data-theme="activity">
			<div className="mx-auto max-w-xl px-4 py-8 @sm:px-6 @sm:py-12 @2xl:px-8 @2xl:py-16">
				<OrderNotifications
					title="Order Updates"
					notifications={notifications}
					counts={{
						confirmed: 5,
						processing: 12,
						shipped: 8,
						delivered: 47,
					}}
				/>
			</div>
		</section>
	);
}
