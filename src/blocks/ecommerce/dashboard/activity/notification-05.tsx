import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { ScrollArea } from '@/components/ui/scroll-area';
import {
	CreditCard,
	CheckCircle2,
	XCircle,
	AlertTriangle,
	RefreshCw,
	DollarSign,
	ArrowUpRight,
	ArrowDownRight,
	type LucideIcon,
} from 'lucide-react';

interface PaymentNotification {
	id: string;
	type: 'success' | 'failed' | 'refund' | 'pending' | 'dispute';
	orderId: string;
	amount: string;
	customer: {
		name: string;
		email: string;
		avatar?: string;
		initials: string;
	};
	paymentMethod: string;
	message: string;
	timestamp: string;
}

interface PaymentAlertsProps {
	title: string;
	notifications: PaymentNotification[];
	stats: {
		todayRevenue: string;
		successRate: string;
		pendingAmount: string;
	};
}

const TypeConfig: Record<
	PaymentNotification['type'],
	{ icon: LucideIcon; className: string; label: string }
> = {
	success: {
		icon: CheckCircle2,
		className: 'bg-emerald-500/20 text-emerald-400',
		label: 'Successful',
	},
	failed: {
		icon: XCircle,
		className: 'bg-rose-500/20 text-rose-400',
		label: 'Failed',
	},
	refund: {
		icon: ArrowDownRight,
		className: 'bg-amber-500/20 text-amber-400',
		label: 'Refunded',
	},
	pending: {
		icon: RefreshCw,
		className: 'bg-blue-500/20 text-blue-400',
		label: 'Pending',
	},
	dispute: {
		icon: AlertTriangle,
		className: 'bg-orange-500/20 text-orange-400',
		label: 'Dispute',
	},
};

const PaymentCard = ({
	notification,
}: {
	notification: PaymentNotification;
}) => {
	const config = TypeConfig[notification.type];
	const Icon = config.icon;
	const isPositive = notification.type === 'success';
	const isNegative = ['refund', 'failed'].includes(notification.type);

	return (
		<div
			className={`p-4 rounded-xl border backdrop-blur-sm transition-all hover:shadow-lg ${
				notification.type === 'failed' || notification.type === 'dispute'
					? 'border-rose-500/30 bg-rose-500/5'
					: 'border-border/50 bg-card/80'
			}`}
		>
			<div className="flex items-start gap-4">
				<div
					className={`flex size-10 shrink-0 items-center justify-center rounded-lg ${config.className}`}
				>
					<Icon className="size-5" />
				</div>
				<div className="flex-1 min-w-0">
					<div className="flex items-start justify-between gap-2 mb-2">
						<div className="flex items-center gap-2">
							<Avatar className="size-6">
								<AvatarImage
									src={notification.customer.avatar}
									alt={notification.customer.name}
								/>
								<AvatarFallback className="text-[10px] bg-secondary">
									{notification.customer.initials}
								</AvatarFallback>
							</Avatar>
							<span className="font-medium text-foreground">
								{notification.customer.name}
							</span>
							<Badge
								variant="outline"
								className={`text-xs ${
									notification.type === 'success'
										? 'bg-emerald-500/10 text-emerald-400 border-emerald-500/30'
										: notification.type === 'failed'
											? 'bg-rose-500/10 text-rose-400 border-rose-500/30'
											: ''
								}`}
							>
								{config.label}
							</Badge>
						</div>
						<span
							className={`font-mono font-semibold ${
								isPositive
									? 'text-emerald-400'
									: isNegative
										? 'text-rose-400'
										: 'text-foreground'
							}`}
						>
							{isPositive ? '+' : isNegative ? '-' : ''}
							{notification.amount}
						</span>
					</div>
					<p className="text-sm text-muted-foreground mb-2">
						{notification.message}
					</p>
					<div className="flex items-center justify-between text-xs text-muted-foreground">
						<div className="flex items-center gap-2">
							<span className="font-mono">{notification.orderId}</span>
							<span>•</span>
							<span>{notification.paymentMethod}</span>
						</div>
						<span>{notification.timestamp}</span>
					</div>
				</div>
			</div>
		</div>
	);
};

const PaymentStats = ({ stats }: { stats: PaymentAlertsProps['stats'] }) => (
	<div className="grid grid-cols-3 gap-3">
		<div className="p-4 rounded-lg bg-gradient-to-br from-emerald-500/20 to-emerald-500/5 border border-emerald-500/20">
			<div className="flex items-center gap-2 mb-2">
				<ArrowUpRight className="size-4 text-emerald-400" />
				<span className="text-xs text-muted-foreground">Today</span>
			</div>
			<span className="text-xl font-bold text-emerald-400">
				{stats.todayRevenue}
			</span>
		</div>
		<div className="p-4 rounded-lg bg-muted/30 border border-border/50">
			<div className="flex items-center gap-2 mb-2">
				<CheckCircle2 className="size-4 text-primary" />
				<span className="text-xs text-muted-foreground">Success</span>
			</div>
			<span className="text-xl font-bold text-foreground">
				{stats.successRate}
			</span>
		</div>
		<div className="p-4 rounded-lg bg-amber-500/10 border border-amber-500/20">
			<div className="flex items-center gap-2 mb-2">
				<RefreshCw className="size-4 text-amber-400" />
				<span className="text-xs text-muted-foreground">Pending</span>
			</div>
			<span className="text-xl font-bold text-amber-400">
				{stats.pendingAmount}
			</span>
		</div>
	</div>
);

const PaymentAlerts = ({ title, notifications, stats }: PaymentAlertsProps) => (
	<Card className="border-border/50 bg-card/50 backdrop-blur-sm">
		<CardHeader className="flex-row items-center justify-between border-b border-border/50">
			<CardTitle className="text-lg font-semibold flex items-center gap-2">
				<CreditCard className="size-5" />
				{title}
			</CardTitle>
			<Button variant="outline" size="sm">
				View Transactions
			</Button>
		</CardHeader>
		<CardContent className="pt-6 space-y-4">
			<PaymentStats stats={stats} />
			<ScrollArea className="h-[380px]">
				<div className="space-y-3 pr-4">
					{notifications.map((notification) => (
						<PaymentCard key={notification.id} notification={notification} />
					))}
				</div>
			</ScrollArea>
		</CardContent>
	</Card>
);

export default function Main() {
	const notifications: PaymentNotification[] = [
		{
			id: '1',
			type: 'success',
			orderId: 'ORD-2024-0892',
			amount: '$249.99',
			customer: {
				name: 'Sarah Chen',
				email: 'sarah@email.com',
				initials: 'SC',
			},
			paymentMethod: 'Visa •••• 4242',
			message: 'Payment received for Premium Wireless Headphones',
			timestamp: '2 min ago',
		},
		{
			id: '2',
			type: 'failed',
			orderId: 'ORD-2024-0893',
			amount: '$89.99',
			customer: {
				name: 'Mike Johnson',
				email: 'mike@email.com',
				initials: 'MJ',
			},
			paymentMethod: 'Mastercard •••• 5555',
			message: 'Payment declined - Insufficient funds',
			timestamp: '15 min ago',
		},
		{
			id: '3',
			type: 'refund',
			orderId: 'ORD-2024-0845',
			amount: '$159.00',
			customer: {
				name: 'Emily Davis',
				email: 'emily@email.com',
				initials: 'ED',
			},
			paymentMethod: 'PayPal',
			message: 'Refund processed for returned item',
			timestamp: '1 hour ago',
		},
		{
			id: '4',
			type: 'pending',
			orderId: 'ORD-2024-0894',
			amount: '$1,299.00',
			customer: { name: 'Alex Kim', email: 'alex@email.com', initials: 'AK' },
			paymentMethod: 'Bank Transfer',
			message: 'Awaiting bank confirmation for high-value order',
			timestamp: '2 hours ago',
		},
		{
			id: '5',
			type: 'dispute',
			orderId: 'ORD-2024-0820',
			amount: '$349.99',
			customer: {
				name: 'Jordan Lee',
				email: 'jordan@email.com',
				initials: 'JL',
			},
			paymentMethod: 'Amex •••• 1234',
			message: 'Customer opened a dispute - Item not received',
			timestamp: '3 hours ago',
		},
		{
			id: '6',
			type: 'success',
			orderId: 'ORD-2024-0891',
			amount: '$79.99',
			customer: {
				name: 'Lisa Anderson',
				email: 'lisa@email.com',
				initials: 'LA',
			},
			paymentMethod: 'Apple Pay',
			message: 'Payment received for Gaming Mouse',
			timestamp: '4 hours ago',
		},
	];

	return (
		<section className="@container" data-theme="activity">
			<div className="mx-auto max-w-xl px-4 py-8 @sm:px-6 @sm:py-12 @2xl:px-8 @2xl:py-16">
				<PaymentAlerts
					title="Payment Alerts"
					notifications={notifications}
					stats={{
						todayRevenue: '$12,487',
						successRate: '98.2%',
						pendingAmount: '$2,450',
					}}
				/>
			</div>
		</section>
	);
}
