import {
	AlertCircle,
	ArrowUpRight,
	Bell,
	CheckCircle2,
	Info,
	Package,
	ShoppingCart,
	TrendingUp,
	XCircle,
} from 'lucide-react';

import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import {
	Card,
	CardContent,
	CardDescription,
	CardHeader,
	CardTitle,
} from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';

type NotificationItem = {
	id: string;
	type: 'success' | 'warning' | 'error' | 'info';
	title: string;
	message: string;
	time: string;
	action?: { label: string; href: string };
	read: boolean;
};

const getNotificationConfig = (type: NotificationItem['type']) => {
	switch (type) {
		case 'success':
			return {
				icon: CheckCircle2,
				color: 'text-emerald-500',
				bgColor: 'bg-emerald-500/10',
			};
		case 'warning':
			return {
				icon: AlertCircle,
				color: 'text-amber-500',
				bgColor: 'bg-amber-500/10',
			};
		case 'error':
			return { icon: XCircle, color: 'text-red-500', bgColor: 'bg-red-500/10' };
		case 'info':
			return { icon: Info, color: 'text-blue-500', bgColor: 'bg-blue-500/10' };
	}
};

const NotificationItemComponent = ({
	type,
	title,
	message,
	time,
	action,
	read,
}: NotificationItem) => {
	const config = getNotificationConfig(type);
	const Icon = config.icon;

	return (
		<div
			className={`flex gap-4 rounded-lg p-3 transition-colors ${read ? 'opacity-60' : 'bg-muted/50'}`}
		>
			<div className={`rounded-full p-2 ${config.bgColor}`}>
				<Icon className={`size-4 ${config.color}`} />
			</div>
			<div className="flex-1 space-y-1">
				<div className="flex items-start justify-between gap-2">
					<p className="font-medium">{title}</p>
					<span className="shrink-0 text-xs text-muted-foreground">{time}</span>
				</div>
				<p className="text-sm text-muted-foreground">{message}</p>
				{action && (
					<Button variant="link" size="sm" className="h-auto p-0 text-sm">
						{action.label}
						<ArrowUpRight className="ml-1 size-3" />
					</Button>
				)}
			</div>
			{!read && <div className="size-2 shrink-0 rounded-full bg-primary" />}
		</div>
	);
};

export default function Main() {
	const notifications: NotificationItem[] = [
		{
			id: '1',
			type: 'success',
			title: 'Order Delivered',
			message: 'Order #ORD-4518 was successfully delivered to the customer.',
			time: '5m ago',
			read: false,
		},
		{
			id: '2',
			type: 'warning',
			title: 'Low Stock Alert',
			message: 'Smart Watch Ultra has only 12 units remaining.',
			time: '20m ago',
			action: { label: 'Restock now', href: '#' },
			read: false,
		},
		{
			id: '3',
			type: 'info',
			title: 'New Feature Available',
			message:
				'Advanced analytics dashboard is now available for your account.',
			time: '1h ago',
			action: { label: 'Learn more', href: '#' },
			read: false,
		},
		{
			id: '4',
			type: 'error',
			title: 'Payment Failed',
			message:
				'Payment for order #ORD-4522 failed. Customer has been notified.',
			time: '2h ago',
			action: { label: 'View details', href: '#' },
			read: true,
		},
		{
			id: '5',
			type: 'success',
			title: 'Milestone Reached',
			message: 'Congratulations! You have reached 10,000 orders this month.',
			time: '3h ago',
			read: true,
		},
		{
			id: '6',
			type: 'info',
			title: 'Weekly Report Ready',
			message: 'Your weekly performance report is ready to download.',
			time: '5h ago',
			action: { label: 'Download', href: '#' },
			read: true,
		},
	];

	const unreadCount = notifications.filter((n) => !n.read).length;

	return (
		<section className="@container" data-theme="dashboard">
			<div className="mx-auto max-w-7xl px-4 py-8 @sm:px-6 @md:py-10 @2xl:px-8 @3xl:py-12">
				<Card>
					<CardHeader className="flex-row items-center justify-between">
						<div className="flex items-center gap-3">
							<div className="relative">
								<Bell className="size-5 text-primary" />
								{unreadCount > 0 && (
									<span className="absolute -right-1 -top-1 flex size-4 items-center justify-center rounded-full bg-red-500 text-[10px] text-white">
										{unreadCount}
									</span>
								)}
							</div>
							<div>
								<CardTitle>Notifications</CardTitle>
								<CardDescription>
									{unreadCount} unread notifications
								</CardDescription>
							</div>
						</div>
						<Button variant="ghost" size="sm">
							Mark all read
						</Button>
					</CardHeader>
					<CardContent className="space-y-2">
						{notifications.map((notification) => (
							<NotificationItemComponent
								key={notification.id}
								{...notification}
							/>
						))}
					</CardContent>
				</Card>
			</div>
		</section>
	);
}
