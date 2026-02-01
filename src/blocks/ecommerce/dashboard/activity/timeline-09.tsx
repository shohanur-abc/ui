import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import {
	DollarSign,
	CreditCard,
	Wallet,
	Building2,
	RefreshCw,
	ArrowUpRight,
	ArrowDownRight,
	Clock,
	type LucideIcon,
} from 'lucide-react';

interface PaymentActivity {
	id: string;
	type: 'payment' | 'payout' | 'refund' | 'chargeback' | 'transfer';
	method: 'card' | 'bank' | 'wallet' | 'crypto';
	amount: string;
	currency: string;
	status: 'completed' | 'pending' | 'failed' | 'processing';
	description: string;
	reference: string;
	timestamp: string;
	customer?: {
		name: string;
		avatar?: string;
		initials: string;
	};
}

interface PaymentTimelineProps {
	title: string;
	activities: PaymentActivity[];
	todayTotal: string;
	pendingAmount: string;
}

const MethodIcon = ({ method }: { method: PaymentActivity['method'] }) => {
	const config: Record<
		PaymentActivity['method'],
		{ icon: LucideIcon; className: string }
	> = {
		card: { icon: CreditCard, className: 'text-blue-400' },
		bank: { icon: Building2, className: 'text-emerald-400' },
		wallet: { icon: Wallet, className: 'text-purple-400' },
		crypto: { icon: DollarSign, className: 'text-amber-400' },
	};

	const { icon: Icon, className } = config[method];
	return <Icon className={`size-4 ${className}`} />;
};

const TypeIndicator = ({ type }: { type: PaymentActivity['type'] }) => {
	const isIncoming = type === 'payment';
	const isOutgoing = type === 'payout' || type === 'refund';

	if (isIncoming) {
		return (
			<div className="flex size-8 items-center justify-center rounded-full bg-emerald-500/20">
				<ArrowDownRight className="size-4 text-emerald-400" />
			</div>
		);
	}
	if (isOutgoing) {
		return (
			<div className="flex size-8 items-center justify-center rounded-full bg-rose-500/20">
				<ArrowUpRight className="size-4 text-rose-400" />
			</div>
		);
	}
	return (
		<div className="flex size-8 items-center justify-center rounded-full bg-amber-500/20">
			<RefreshCw className="size-4 text-amber-400" />
		</div>
	);
};

const StatusBadge = ({ status }: { status: PaymentActivity['status'] }) => {
	const config = {
		completed: 'bg-emerald-500/20 text-emerald-400 border-emerald-500/30',
		pending: 'bg-amber-500/20 text-amber-400 border-amber-500/30',
		failed: 'bg-rose-500/20 text-rose-400 border-rose-500/30',
		processing: 'bg-blue-500/20 text-blue-400 border-blue-500/30',
	};

	return (
		<Badge variant="outline" className={`text-xs ${config[status]}`}>
			{status.charAt(0).toUpperCase() + status.slice(1)}
		</Badge>
	);
};

const AmountDisplay = ({
	amount,
	currency,
	type,
}: {
	amount: string;
	currency: string;
	type: PaymentActivity['type'];
}) => {
	const isIncoming = type === 'payment';
	const colorClass = isIncoming ? 'text-emerald-400' : 'text-foreground';
	const prefix = isIncoming
		? '+'
		: type === 'payout' || type === 'refund'
			? '-'
			: '';

	return (
		<span className={`font-semibold tabular-nums ${colorClass}`}>
			{prefix}
			{amount} {currency}
		</span>
	);
};

const PaymentCard = ({ activity }: { activity: PaymentActivity }) => (
	<div className="group relative flex gap-4 pb-6 last:pb-0">
		<div className="relative flex flex-col items-center">
			<TypeIndicator type={activity.type} />
			<div className="absolute top-8 h-[calc(100%+0.5rem)] w-px bg-gradient-to-b from-border to-transparent group-last:hidden" />
		</div>
		<div className="flex-1 min-w-0">
			<div className="rounded-lg border border-border/50 bg-card/80 p-4 backdrop-blur-sm transition-all hover:border-primary/30">
				<div className="flex flex-col gap-3">
					<div className="flex items-start justify-between gap-2">
						<div className="flex items-center gap-2 min-w-0">
							<MethodIcon method={activity.method} />
							<span className="font-medium text-foreground truncate">
								{activity.description}
							</span>
						</div>
						<AmountDisplay
							amount={activity.amount}
							currency={activity.currency}
							type={activity.type}
						/>
					</div>
					<div className="flex items-center justify-between">
						<div className="flex items-center gap-2">
							{activity.customer && (
								<div className="flex items-center gap-2">
									<Avatar className="size-5">
										<AvatarImage
											src={activity.customer.avatar}
											alt={activity.customer.name}
										/>
										<AvatarFallback className="text-[10px] bg-secondary">
											{activity.customer.initials}
										</AvatarFallback>
									</Avatar>
									<span className="text-sm text-muted-foreground">
										{activity.customer.name}
									</span>
								</div>
							)}
							<span className="text-xs font-mono text-muted-foreground/70">
								{activity.reference}
							</span>
						</div>
						<StatusBadge status={activity.status} />
					</div>
					<div className="flex items-center gap-1 text-xs text-muted-foreground/70">
						<Clock className="size-3" />
						<span>{activity.timestamp}</span>
					</div>
				</div>
			</div>
		</div>
	</div>
);

const SummaryCards = ({
	todayTotal,
	pendingAmount,
}: {
	todayTotal: string;
	pendingAmount: string;
}) => (
	<div className="grid grid-cols-2 gap-4">
		<div className="rounded-lg border border-border/50 bg-emerald-500/10 p-4">
			<div className="flex items-center gap-2 mb-2">
				<ArrowDownRight className="size-4 text-emerald-400" />
				<span className="text-sm text-muted-foreground">Today's Revenue</span>
			</div>
			<span className="text-xl font-bold text-emerald-400">{todayTotal}</span>
		</div>
		<div className="rounded-lg border border-border/50 bg-amber-500/10 p-4">
			<div className="flex items-center gap-2 mb-2">
				<Clock className="size-4 text-amber-400" />
				<span className="text-sm text-muted-foreground">Pending</span>
			</div>
			<span className="text-xl font-bold text-amber-400">{pendingAmount}</span>
		</div>
	</div>
);

const PaymentTimeline = ({
	title,
	activities,
	todayTotal,
	pendingAmount,
}: PaymentTimelineProps) => (
	<Card className="border-border/50 bg-card/50 backdrop-blur-sm">
		<CardHeader className="flex-row items-center justify-between border-b border-border/50">
			<CardTitle className="text-lg font-semibold">{title}</CardTitle>
			<Button variant="outline" size="sm">
				Export Report
			</Button>
		</CardHeader>
		<CardContent className="pt-6 space-y-6">
			<SummaryCards todayTotal={todayTotal} pendingAmount={pendingAmount} />
			<div>
				{activities.map((activity) => (
					<PaymentCard key={activity.id} activity={activity} />
				))}
			</div>
		</CardContent>
	</Card>
);

export default function Main() {
	const paymentActivities: PaymentActivity[] = [
		{
			id: '1',
			type: 'payment',
			method: 'card',
			amount: '1,249.00',
			currency: 'USD',
			status: 'completed',
			description: 'Order payment received',
			reference: 'TXN-2024-001847',
			timestamp: '5 min ago',
			customer: { name: 'Sarah Chen', initials: 'SC' },
		},
		{
			id: '2',
			type: 'refund',
			method: 'card',
			amount: '299.00',
			currency: 'USD',
			status: 'processing',
			description: 'Refund processed',
			reference: 'REF-2024-000892',
			timestamp: '1 hour ago',
			customer: { name: 'Mike Johnson', initials: 'MJ' },
		},
		{
			id: '3',
			type: 'payout',
			method: 'bank',
			amount: '15,420.00',
			currency: 'USD',
			status: 'pending',
			description: 'Weekly payout',
			reference: 'PAY-2024-004521',
			timestamp: '2 hours ago',
		},
		{
			id: '4',
			type: 'payment',
			method: 'wallet',
			amount: '89.99',
			currency: 'USD',
			status: 'completed',
			description: 'Apple Pay purchase',
			reference: 'TXN-2024-001846',
			timestamp: '3 hours ago',
			customer: { name: 'Emma Davis', initials: 'ED' },
		},
		{
			id: '5',
			type: 'chargeback',
			method: 'card',
			amount: '450.00',
			currency: 'USD',
			status: 'pending',
			description: 'Dispute opened',
			reference: 'DSP-2024-000123',
			timestamp: '5 hours ago',
			customer: { name: 'James Wilson', initials: 'JW' },
		},
	];

	return (
		<section className="@container" data-theme="activity">
			<div className="mx-auto max-w-2xl px-4 py-8 @sm:px-6 @sm:py-12 @2xl:px-8 @2xl:py-16">
				<PaymentTimeline
					title="Payment Activity"
					activities={paymentActivities}
					todayTotal="$24,892.00"
					pendingAmount="$15,870.00"
				/>
			</div>
		</section>
	);
}
