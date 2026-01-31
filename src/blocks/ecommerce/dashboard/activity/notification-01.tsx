import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { ScrollArea } from '@/components/ui/scroll-area';
import {
	Bell,
	ShoppingCart,
	CreditCard,
	Package,
	Star,
	MessageSquare,
	Settings,
	Check,
	X,
	type LucideIcon,
} from 'lucide-react';

interface Notification {
	id: string;
	type: 'order' | 'payment' | 'shipping' | 'review' | 'message' | 'system';
	title: string;
	message: string;
	user?: {
		name: string;
		avatar?: string;
		initials: string;
	};
	timestamp: string;
	isRead: boolean;
}

interface NotificationCenterProps {
	title: string;
	notifications: Notification[];
	unreadCount: number;
}

const NotificationIcon = ({ type }: { type: Notification['type'] }) => {
	const config: Record<
		Notification['type'],
		{ icon: LucideIcon; className: string }
	> = {
		order: { icon: ShoppingCart, className: 'bg-blue-500/20 text-blue-400' },
		payment: { icon: CreditCard, className: 'bg-emerald-500/20 text-emerald-400' },
		shipping: { icon: Package, className: 'bg-purple-500/20 text-purple-400' },
		review: { icon: Star, className: 'bg-amber-500/20 text-amber-400' },
		message: { icon: MessageSquare, className: 'bg-pink-500/20 text-pink-400' },
		system: { icon: Bell, className: 'bg-muted text-muted-foreground' },
	};

	const { icon: Icon, className } = config[type];

	return (
		<div
			className={`flex size-10 shrink-0 items-center justify-center rounded-full ${className}`}
		>
			<Icon className="size-5" />
		</div>
	);
};

const NotificationItem = ({
	notification,
}: {
	notification: Notification;
}) => (
	<div
		className={`group flex items-start gap-4 p-4 transition-all hover:bg-muted/50 ${
			!notification.isRead ? 'bg-primary/5' : ''
		}`}
	>
		{notification.user ? (
			<Avatar className="size-10">
				<AvatarImage
					src={notification.user.avatar}
					alt={notification.user.name}
				/>
				<AvatarFallback className="bg-secondary text-sm">
					{notification.user.initials}
				</AvatarFallback>
			</Avatar>
		) : (
			<NotificationIcon type={notification.type} />
		)}
		<div className="flex-1 min-w-0">
			<div className="flex items-start justify-between gap-2">
				<h4
					className={`text-sm ${
						!notification.isRead
							? 'font-semibold text-foreground'
							: 'font-medium text-foreground'
					}`}
				>
					{notification.title}
				</h4>
				{!notification.isRead && (
					<div className="size-2 rounded-full bg-primary shrink-0 mt-1" />
				)}
			</div>
			<p className="text-sm text-muted-foreground line-clamp-2 mt-0.5">
				{notification.message}
			</p>
			<span className="text-xs text-muted-foreground mt-2 block">
				{notification.timestamp}
			</span>
		</div>
		<div className="flex gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
			<Button variant="ghost" size="icon-sm" className="size-7">
				<Check className="size-3" />
			</Button>
			<Button variant="ghost" size="icon-sm" className="size-7">
				<X className="size-3" />
			</Button>
		</div>
	</div>
);

const NotificationCenter = ({
	title,
	notifications,
	unreadCount,
}: NotificationCenterProps) => (
	<Card className="border-border/50 bg-card/50 backdrop-blur-sm">
		<CardHeader className="flex-row items-center justify-between border-b border-border/50">
			<CardTitle className="text-lg font-semibold flex items-center gap-2">
				<Bell className="size-5" />
				{title}
				{unreadCount > 0 && (
					<Badge className="bg-primary text-primary-foreground">
						{unreadCount}
					</Badge>
				)}
			</CardTitle>
			<div className="flex items-center gap-2">
				<Button variant="ghost" size="sm">
					Mark all read
				</Button>
				<Button variant="ghost" size="icon-sm">
					<Settings className="size-4" />
				</Button>
			</div>
		</CardHeader>
		<CardContent className="p-0">
			<ScrollArea className="h-[480px]">
				<div className="divide-y divide-border/50">
					{notifications.map((notification) => (
						<NotificationItem
							key={notification.id}
							notification={notification}
						/>
					))}
				</div>
			</ScrollArea>
		</CardContent>
	</Card>
);

export default function Main() {
	const notifications: Notification[] = [
		{
			id: '1',
			type: 'order',
			title: 'New order received',
			message:
				'You have a new order #ORD-2024-0892 for $249.99 waiting to be processed.',
			user: { name: 'Sarah Chen', initials: 'SC' },
			timestamp: '2 minutes ago',
			isRead: false,
		},
		{
			id: '2',
			type: 'payment',
			title: 'Payment successful',
			message: 'Payment of $1,299.00 has been received for order #ORD-2024-0891.',
			timestamp: '15 minutes ago',
			isRead: false,
		},
		{
			id: '3',
			type: 'shipping',
			title: 'Order shipped',
			message:
				'Order #ORD-2024-0845 has been shipped and is on its way to the customer.',
			timestamp: '1 hour ago',
			isRead: false,
		},
		{
			id: '4',
			type: 'review',
			title: 'New product review',
			message:
				'Mike Johnson left a 5-star review on Premium Wireless Headphones.',
			user: { name: 'Mike Johnson', initials: 'MJ' },
			timestamp: '2 hours ago',
			isRead: true,
		},
		{
			id: '5',
			type: 'message',
			title: 'New message from support',
			message:
				'Your support ticket #TKT-4521 has been updated with a new response.',
			timestamp: '3 hours ago',
			isRead: true,
		},
		{
			id: '6',
			type: 'system',
			title: 'System maintenance',
			message:
				'Scheduled maintenance will occur tonight from 2:00 AM to 4:00 AM PST.',
			timestamp: '5 hours ago',
			isRead: true,
		},
		{
			id: '7',
			type: 'order',
			title: 'Order cancelled',
			message: 'Order #ORD-2024-0844 has been cancelled by the customer.',
			user: { name: 'Emily Davis', initials: 'ED' },
			timestamp: '6 hours ago',
			isRead: true,
		},
		{
			id: '8',
			type: 'payment',
			title: 'Refund processed',
			message: 'A refund of $89.99 has been issued for order #ORD-2024-0820.',
			timestamp: 'Yesterday',
			isRead: true,
		},
	];

	return (
		<section className="@container" data-theme="activity">
			<div className="mx-auto max-w-md px-4 py-8 @sm:px-6 @sm:py-12 @2xl:px-8 @2xl:py-16">
				<NotificationCenter
					title="Notifications"
					notifications={notifications}
					unreadCount={3}
				/>
			</div>
		</section>
	);
}
