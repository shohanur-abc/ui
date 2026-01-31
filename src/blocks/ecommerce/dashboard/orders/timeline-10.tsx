import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import { Bell, Package, Truck, CheckCircle2, AlertTriangle, CreditCard, Star, RotateCcw, Mail } from 'lucide-react';

interface NotificationEvent {
	id: string;
	type: 'order_placed' | 'shipped' | 'delivered' | 'issue' | 'review' | 'return' | 'payment' | 'promo';
	title: string;
	message: string;
	timestamp: string;
	read: boolean;
	actionUrl?: string;
}

interface NotificationTimelineProps {
	notifications: NotificationEvent[];
	labels: { today: string; yesterday: string; earlier: string };
}

interface NotificationItemProps {
	notification: NotificationEvent;
}

const TypeConfig: Record<NotificationEvent['type'], { icon: typeof Bell; color: string; bg: string }> = {
	order_placed: { icon: Package, color: 'text-primary', bg: 'bg-primary/10' },
	shipped: { icon: Truck, color: 'text-blue-500', bg: 'bg-blue-500/10' },
	delivered: { icon: CheckCircle2, color: 'text-accent', bg: 'bg-accent/10' },
	issue: { icon: AlertTriangle, color: 'text-destructive', bg: 'bg-destructive/10' },
	review: { icon: Star, color: 'text-yellow-500', bg: 'bg-yellow-500/10' },
	return: { icon: RotateCcw, color: 'text-orange-500', bg: 'bg-orange-500/10' },
	payment: { icon: CreditCard, color: 'text-green-500', bg: 'bg-green-500/10' },
	promo: { icon: Mail, color: 'text-purple-500', bg: 'bg-purple-500/10' },
};

const NotificationItem = ({ notification }: NotificationItemProps) => {
	const { icon: Icon, color, bg } = TypeConfig[notification.type];
	return (
		<div className={`flex items-start gap-3 p-3 rounded-xl transition-colors cursor-pointer ${notification.read ? 'hover:bg-muted/30' : 'bg-primary/5 hover:bg-primary/10'}`}>
			<div className={`size-10 rounded-full flex items-center justify-center shrink-0 ${bg}`}>
				<Icon className={`size-5 ${color}`} />
			</div>
			<div className="flex-1 min-w-0">
				<div className="flex items-start justify-between gap-2">
					<p className={`text-sm ${notification.read ? '' : 'font-semibold'}`}>{notification.title}</p>
					<span className="text-xs text-muted-foreground whitespace-nowrap">{notification.timestamp}</span>
				</div>
				<p className="text-sm text-muted-foreground line-clamp-2">{notification.message}</p>
			</div>
			{!notification.read && (
				<div className="size-2 rounded-full bg-primary shrink-0 mt-2" />
			)}
		</div>
	);
};

const NotificationGroup = ({ title, notifications }: { title: string; notifications: NotificationEvent[] }) => (
	<div>
		<p className="text-xs font-medium text-muted-foreground uppercase tracking-wider mb-2 px-3">{title}</p>
		<div className="space-y-1">
			{notifications.map((notification) => (
				<NotificationItem key={notification.id} notification={notification} />
			))}
		</div>
	</div>
);

export default function Main() {
	const todayNotifications: NotificationEvent[] = [
		{ id: '1', type: 'delivered', title: 'Order Delivered', message: 'Order #ORD-2024-156 has been delivered to the customer', timestamp: '2 hours ago', read: false },
		{ id: '2', type: 'issue', title: 'Return Requested', message: 'Customer requested return for order #ORD-2024-142', timestamp: '4 hours ago', read: false },
		{ id: '3', type: 'shipped', title: 'Order Shipped', message: 'Order #ORD-2024-158 has been shipped via UPS', timestamp: '6 hours ago', read: true },
	];

	const yesterdayNotifications: NotificationEvent[] = [
		{ id: '4', type: 'review', title: 'New Review', message: 'Customer left a 5-star review for Wireless Headphones', timestamp: 'Yesterday', read: true },
		{ id: '5', type: 'payment', title: 'Payment Received', message: 'Payment of $245.00 received for order #ORD-2024-155', timestamp: 'Yesterday', read: true },
	];

	const earlierNotifications: NotificationEvent[] = [
		{ id: '6', type: 'order_placed', title: 'New Order', message: 'New order #ORD-2024-150 received from Sarah Johnson', timestamp: 'Jan 28', read: true },
		{ id: '7', type: 'promo', title: 'Flash Sale Started', message: 'Your flash sale promotion is now active', timestamp: 'Jan 27', read: true },
	];

	return (
		<section className="@container" data-theme="orders">
			<div className="mx-auto max-w-md px-4 @sm:px-6 @2xl:px-8 py-8 @md:py-10 @xl:py-12">
				<Card className="border-border/50 bg-card/50 backdrop-blur-sm">
					<CardHeader className="pb-4">
						<div className="flex items-center justify-between">
							<CardTitle className="text-lg flex items-center gap-2">
								<Bell className="size-5" />
								Notifications
							</CardTitle>
							<Badge variant="secondary">3 new</Badge>
						</div>
					</CardHeader>
					<CardContent className="space-y-6">
						<NotificationGroup title="Today" notifications={todayNotifications} />
						<Separator />
						<NotificationGroup title="Yesterday" notifications={yesterdayNotifications} />
						<Separator />
						<NotificationGroup title="Earlier" notifications={earlierNotifications} />
					</CardContent>
				</Card>
			</div>
		</section>
	);
}
