import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Switch } from '@/components/ui/switch';
import {
	Bell,
	BellOff,
	ShoppingCart,
	CreditCard,
	Package,
	Star,
	MessageSquare,
	Users,
	AlertTriangle,
	Settings,
	Filter,
	type LucideIcon,
} from 'lucide-react';

interface NotificationPreference {
	id: string;
	category: string;
	icon: LucideIcon;
	description: string;
	enabled: boolean;
	count: number;
}

interface RecentNotification {
	id: string;
	category: string;
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

interface NotificationSettingsProps {
	title: string;
	preferences: NotificationPreference[];
	recentNotifications: RecentNotification[];
	mutedUntil?: string;
}

const CategoryIcon = ({
	category,
	className,
}: {
	category: string;
	className?: string;
}) => {
	const icons: Record<string, LucideIcon> = {
		orders: ShoppingCart,
		payments: CreditCard,
		shipping: Package,
		reviews: Star,
		messages: MessageSquare,
		customers: Users,
		alerts: AlertTriangle,
	};

	const Icon = icons[category] || Bell;
	return <Icon className={className} />;
};

const PreferenceItem = ({
	preference,
}: {
	preference: NotificationPreference;
}) => {
	const Icon = preference.icon;

	return (
		<div className="flex items-center justify-between p-3 rounded-lg bg-muted/30 border border-border/50">
			<div className="flex items-center gap-3">
				<div className="flex size-9 items-center justify-center rounded-lg bg-primary/10">
					<Icon className="size-4 text-primary" />
				</div>
				<div>
					<div className="flex items-center gap-2">
						<span className="font-medium text-foreground text-sm">
							{preference.category}
						</span>
						{preference.count > 0 && (
							<Badge variant="secondary" className="text-xs">
								{preference.count}
							</Badge>
						)}
					</div>
					<span className="text-xs text-muted-foreground">
						{preference.description}
					</span>
				</div>
			</div>
			<Switch checked={preference.enabled} />
		</div>
	);
};

const RecentItem = ({ notification }: { notification: RecentNotification }) => (
	<div
		className={`flex items-start gap-3 p-3 rounded-lg transition-all hover:bg-muted/50 ${
			!notification.isRead ? 'bg-primary/5' : ''
		}`}
	>
		{notification.user ? (
			<Avatar className="size-8">
				<AvatarImage
					src={notification.user.avatar}
					alt={notification.user.name}
				/>
				<AvatarFallback className="text-xs bg-secondary">
					{notification.user.initials}
				</AvatarFallback>
			</Avatar>
		) : (
			<div className="flex size-8 items-center justify-center rounded-full bg-muted">
				<CategoryIcon
					category={notification.category}
					className="size-4 text-muted-foreground"
				/>
			</div>
		)}
		<div className="flex-1 min-w-0">
			<div className="flex items-center justify-between gap-2">
				<span
					className={`text-sm ${
						!notification.isRead
							? 'font-semibold text-foreground'
							: 'text-foreground'
					}`}
				>
					{notification.title}
				</span>
				{!notification.isRead && (
					<div className="size-2 rounded-full bg-primary shrink-0" />
				)}
			</div>
			<p className="text-xs text-muted-foreground line-clamp-1">
				{notification.message}
			</p>
			<span className="text-xs text-muted-foreground mt-1 block">
				{notification.timestamp}
			</span>
		</div>
	</div>
);

const MuteSection = ({ mutedUntil }: { mutedUntil?: string }) => (
	<div className="p-4 rounded-xl border border-border/50 bg-muted/30">
		<div className="flex items-center justify-between">
			<div className="flex items-center gap-3">
				<div className="flex size-10 items-center justify-center rounded-lg bg-amber-500/20">
					<BellOff className="size-5 text-amber-400" />
				</div>
				<div>
					<span className="font-medium text-foreground block">
						Do Not Disturb
					</span>
					<span className="text-xs text-muted-foreground">
						{mutedUntil
							? `Muted until ${mutedUntil}`
							: 'Temporarily pause notifications'}
					</span>
				</div>
			</div>
			<Button variant={mutedUntil ? 'secondary' : 'outline'} size="sm">
				{mutedUntil ? 'Unmute' : 'Mute'}
			</Button>
		</div>
	</div>
);

const NotificationSettings = ({
	title,
	preferences,
	recentNotifications,
	mutedUntil,
}: NotificationSettingsProps) => (
	<Card className="border-border/50 bg-card/50 backdrop-blur-sm">
		<CardHeader className="flex-row items-center justify-between border-b border-border/50">
			<CardTitle className="text-lg font-semibold flex items-center gap-2">
				<Settings className="size-5" />
				{title}
			</CardTitle>
			<Button variant="ghost" size="sm" className="gap-1">
				<Filter className="size-4" />
				Filters
			</Button>
		</CardHeader>
		<CardContent className="pt-6 space-y-6">
			<MuteSection mutedUntil={mutedUntil} />

			<div className="space-y-3">
				<h3 className="text-sm font-medium text-foreground">
					Notification Categories
				</h3>
				<div className="grid gap-2">
					{preferences.map((preference) => (
						<PreferenceItem key={preference.id} preference={preference} />
					))}
				</div>
			</div>

			<div className="space-y-3">
				<div className="flex items-center justify-between">
					<h3 className="text-sm font-medium text-foreground">Recent</h3>
					<Button variant="ghost" size="sm" className="text-xs">
						Clear All
					</Button>
				</div>
				<ScrollArea className="h-[200px]">
					<div className="space-y-1">
						{recentNotifications.map((notification) => (
							<RecentItem key={notification.id} notification={notification} />
						))}
					</div>
				</ScrollArea>
			</div>
		</CardContent>
	</Card>
);

export default function Main() {
	const preferences: NotificationPreference[] = [
		{
			id: '1',
			category: 'Orders',
			icon: ShoppingCart,
			description: 'New orders, cancellations, updates',
			enabled: true,
			count: 12,
		},
		{
			id: '2',
			category: 'Payments',
			icon: CreditCard,
			description: 'Successful payments, refunds, disputes',
			enabled: true,
			count: 5,
		},
		{
			id: '3',
			category: 'Shipping',
			icon: Package,
			description: 'Delivery updates, exceptions',
			enabled: true,
			count: 3,
		},
		{
			id: '4',
			category: 'Reviews',
			icon: Star,
			description: 'New reviews, responses',
			enabled: false,
			count: 0,
		},
		{
			id: '5',
			category: 'Messages',
			icon: MessageSquare,
			description: 'Customer inquiries, support tickets',
			enabled: true,
			count: 8,
		},
	];

	const recentNotifications: RecentNotification[] = [
		{
			id: '1',
			category: 'orders',
			title: 'New order received',
			message: 'Order #ORD-2024-0892 for $249.99',
			user: { name: 'Sarah Chen', initials: 'SC' },
			timestamp: '5 min ago',
			isRead: false,
		},
		{
			id: '2',
			category: 'payments',
			title: 'Payment successful',
			message: 'Payment of $1,299.00 received',
			timestamp: '15 min ago',
			isRead: false,
		},
		{
			id: '3',
			category: 'shipping',
			title: 'Order delivered',
			message: 'Order #ORD-2024-0845 delivered',
			timestamp: '1 hour ago',
			isRead: true,
		},
		{
			id: '4',
			category: 'messages',
			title: 'New message',
			message: 'Customer inquiry about product warranty',
			user: { name: 'Mike Johnson', initials: 'MJ' },
			timestamp: '2 hours ago',
			isRead: true,
		},
	];

	return (
		<section className="@container" data-theme="activity">
			<div className="mx-auto max-w-md px-4 py-8 @sm:px-6 @sm:py-12 @2xl:px-8 @2xl:py-16">
				<NotificationSettings
					title="Notification Settings"
					preferences={preferences}
					recentNotifications={recentNotifications}
				/>
			</div>
		</section>
	);
}
