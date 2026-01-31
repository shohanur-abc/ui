import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import {
	Bell,
	ShoppingCart,
	CreditCard,
	Package,
	Star,
	AlertTriangle,
	CheckCircle2,
	XCircle,
	VolumeX,
	Settings,
	type LucideIcon,
} from 'lucide-react';

interface AlertItem {
	id: string;
	type: 'order' | 'payment' | 'shipping' | 'review' | 'stock' | 'system';
	priority: 'critical' | 'warning' | 'info';
	title: string;
	message: string;
	data?: {
		amount?: string;
		orderId?: string;
		productName?: string;
		customer?: {
			name: string;
			avatar?: string;
			initials: string;
		};
	};
	actions?: {
		primary?: string;
		secondary?: string;
	};
	timestamp: string;
	isRead?: boolean;
}

interface AlertStreamProps {
	title: string;
	alerts: AlertItem[];
	stats: {
		unread: number;
		critical: number;
		todayTotal: number;
	};
}

const AlertIcon = ({ type }: { type: AlertItem['type'] }) => {
	const config: Record<
		AlertItem['type'],
		{ icon: LucideIcon; className: string }
	> = {
		order: { icon: ShoppingCart, className: 'bg-blue-500/20 text-blue-400' },
		payment: { icon: CreditCard, className: 'bg-emerald-500/20 text-emerald-400' },
		shipping: { icon: Package, className: 'bg-purple-500/20 text-purple-400' },
		review: { icon: Star, className: 'bg-amber-500/20 text-amber-400' },
		stock: { icon: AlertTriangle, className: 'bg-orange-500/20 text-orange-400' },
		system: { icon: Bell, className: 'bg-muted text-muted-foreground' },
	};

	const { icon: Icon, className } = config[type];

	return (
		<div
			className={`flex size-10 shrink-0 items-center justify-center rounded-lg ${className}`}
		>
			<Icon className="size-5" />
		</div>
	);
};

const PriorityIndicator = ({ priority }: { priority: AlertItem['priority'] }) => {
	const config = {
		critical: 'bg-rose-400',
		warning: 'bg-amber-400',
		info: 'bg-blue-400',
	};

	return (
		<div className="relative">
			<div className={`size-2 rounded-full ${config[priority]}`} />
			{priority === 'critical' && (
				<div
					className={`absolute inset-0 size-2 rounded-full ${config[priority]} animate-ping`}
				/>
			)}
		</div>
	);
};

const AlertCard = ({ alert }: { alert: AlertItem }) => (
	<div
		className={`p-4 rounded-xl border backdrop-blur-sm transition-all hover:shadow-lg ${
			alert.priority === 'critical'
				? 'border-rose-500/30 bg-rose-500/5'
				: alert.priority === 'warning'
					? 'border-amber-500/30 bg-amber-500/5'
					: 'border-border/50 bg-card/80'
		} ${!alert.isRead ? 'ring-1 ring-primary/20' : ''}`}
	>
		<div className="flex gap-4">
			<AlertIcon type={alert.type} />
			<div className="flex-1 min-w-0">
				<div className="flex items-start justify-between gap-2 mb-2">
					<div className="flex items-center gap-2">
						<PriorityIndicator priority={alert.priority} />
						<h4 className="font-medium text-foreground">{alert.title}</h4>
					</div>
					<span className="text-xs text-muted-foreground shrink-0">
						{alert.timestamp}
					</span>
				</div>
				<p className="text-sm text-muted-foreground mb-3">{alert.message}</p>

				{alert.data && (
					<div className="flex items-center gap-3 mb-3 flex-wrap">
						{alert.data.customer && (
							<div className="flex items-center gap-2">
								<Avatar className="size-5">
									<AvatarImage
										src={alert.data.customer.avatar}
										alt={alert.data.customer.name}
									/>
									<AvatarFallback className="text-[9px] bg-secondary">
										{alert.data.customer.initials}
									</AvatarFallback>
								</Avatar>
								<span className="text-sm text-foreground">
									{alert.data.customer.name}
								</span>
							</div>
						)}
						{alert.data.orderId && (
							<Badge variant="outline" className="text-xs font-mono">
								{alert.data.orderId}
							</Badge>
						)}
						{alert.data.amount && (
							<Badge
								variant="outline"
								className="text-xs font-mono bg-emerald-500/10 text-emerald-400 border-emerald-500/30"
							>
								{alert.data.amount}
							</Badge>
						)}
					</div>
				)}

				{alert.actions && (
					<div className="flex items-center gap-2">
						{alert.actions.primary && (
							<Button size="sm" className="h-7">
								{alert.actions.primary}
							</Button>
						)}
						{alert.actions.secondary && (
							<Button variant="outline" size="sm" className="h-7">
								{alert.actions.secondary}
							</Button>
						)}
					</div>
				)}
			</div>
		</div>
	</div>
);

const AlertStats = ({ stats }: { stats: AlertStreamProps['stats'] }) => (
	<div className="grid grid-cols-3 gap-3">
		<div className="flex items-center gap-3 p-3 rounded-lg bg-primary/10 border border-primary/20">
			<Bell className="size-5 text-primary" />
			<div>
				<span className="text-xl font-bold text-primary">{stats.unread}</span>
				<span className="text-xs text-muted-foreground block">Unread</span>
			</div>
		</div>
		<div className="flex items-center gap-3 p-3 rounded-lg bg-rose-500/10 border border-rose-500/20">
			<AlertTriangle className="size-5 text-rose-400" />
			<div>
				<span className="text-xl font-bold text-rose-400">{stats.critical}</span>
				<span className="text-xs text-muted-foreground block">Critical</span>
			</div>
		</div>
		<div className="flex items-center gap-3 p-3 rounded-lg bg-muted/30 border border-border/50">
			<CheckCircle2 className="size-5 text-muted-foreground" />
			<div>
				<span className="text-xl font-bold text-foreground">
					{stats.todayTotal}
				</span>
				<span className="text-xs text-muted-foreground block">Today</span>
			</div>
		</div>
	</div>
);

const AlertStream = ({ title, alerts, stats }: AlertStreamProps) => (
	<Card className="border-border/50 bg-card/50 backdrop-blur-sm">
		<CardHeader className="flex-row items-center justify-between border-b border-border/50">
			<CardTitle className="text-lg font-semibold flex items-center gap-2">
				<Bell className="size-5" />
				{title}
				{stats.unread > 0 && (
					<Badge className="bg-primary text-primary-foreground">
						{stats.unread}
					</Badge>
				)}
			</CardTitle>
			<div className="flex items-center gap-2">
				<Button variant="ghost" size="icon-sm">
					<VolumeX className="size-4" />
				</Button>
				<Button variant="ghost" size="icon-sm">
					<Settings className="size-4" />
				</Button>
			</div>
		</CardHeader>
		<CardContent className="pt-6 space-y-4">
			<AlertStats stats={stats} />
			<div className="space-y-3 max-h-[400px] overflow-y-auto">
				{alerts.map((alert) => (
					<AlertCard key={alert.id} alert={alert} />
				))}
			</div>
		</CardContent>
	</Card>
);

export default function Main() {
	const alerts: AlertItem[] = [
		{
			id: '1',
			type: 'payment',
			priority: 'critical',
			title: 'Payment Failed',
			message: 'A high-value order payment was declined by the payment processor.',
			data: {
				orderId: 'ORD-2024-0892',
				amount: '$1,299.00',
				customer: { name: 'Sarah Chen', initials: 'SC' },
			},
			actions: { primary: 'View Order', secondary: 'Contact Customer' },
			timestamp: '2 min ago',
			isRead: false,
		},
		{
			id: '2',
			type: 'stock',
			priority: 'warning',
			title: 'Low Stock Alert',
			message: 'Premium Wireless Headphones is running low on stock (5 remaining).',
			data: { productName: 'Premium Wireless Headphones' },
			actions: { primary: 'Reorder', secondary: 'Dismiss' },
			timestamp: '15 min ago',
			isRead: false,
		},
		{
			id: '3',
			type: 'order',
			priority: 'info',
			title: 'New Order Received',
			message: 'A new order has been placed and is awaiting fulfillment.',
			data: {
				orderId: 'ORD-2024-0893',
				amount: '$249.99',
				customer: { name: 'Mike Johnson', initials: 'MJ' },
			},
			actions: { primary: 'Process Order' },
			timestamp: '30 min ago',
			isRead: true,
		},
		{
			id: '4',
			type: 'review',
			priority: 'info',
			title: 'New 1-Star Review',
			message: 'A customer left a negative review that may need attention.',
			data: {
				productName: 'Gaming Mouse',
				customer: { name: 'Alex Kim', initials: 'AK' },
			},
			actions: { primary: 'Respond', secondary: 'View Review' },
			timestamp: '1 hour ago',
			isRead: true,
		},
		{
			id: '5',
			type: 'shipping',
			priority: 'warning',
			title: 'Delivery Exception',
			message: 'A shipment has been marked as undeliverable and is being returned.',
			data: { orderId: 'ORD-2024-0845' },
			actions: { primary: 'Track Package', secondary: 'Contact Carrier' },
			timestamp: '2 hours ago',
			isRead: true,
		},
	];

	return (
		<section className="@container" data-theme="activity">
			<div className="mx-auto max-w-2xl px-4 py-8 @sm:px-6 @sm:py-12 @2xl:px-8 @2xl:py-16">
				<AlertStream
					title="Alerts"
					alerts={alerts}
					stats={{
						unread: 2,
						critical: 1,
						todayTotal: 47,
					}}
				/>
			</div>
		</section>
	);
}
