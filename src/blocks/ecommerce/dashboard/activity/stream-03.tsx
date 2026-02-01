import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import {
	DollarSign,
	TrendingUp,
	TrendingDown,
	ArrowUpRight,
	CreditCard,
	Wallet,
	Building,
	RefreshCw,
	MoreVertical,
} from 'lucide-react';

interface Transaction {
	id: string;
	type: 'sale' | 'refund' | 'subscription' | 'payout';
	amount: string;
	currency: string;
	customer?: {
		name: string;
		email: string;
		avatar?: string;
		initials: string;
	};
	paymentMethod?: string;
	destination?: string;
	description: string;
	status: 'completed' | 'pending' | 'failed';
	timestamp: string;
}

interface RevenueStreamProps {
	title: string;
	transactions: Transaction[];
	summary: {
		totalToday: string;
		change: string;
		trend: 'up' | 'down';
		pendingAmount: string;
	};
}

const TransactionIcon = ({ type }: { type: Transaction['type'] }) => {
	const config = {
		sale: {
			icon: ArrowUpRight,
			className: 'bg-emerald-500/20 text-emerald-400',
		},
		refund: { icon: TrendingDown, className: 'bg-rose-500/20 text-rose-400' },
		subscription: {
			icon: CreditCard,
			className: 'bg-purple-500/20 text-purple-400',
		},
		payout: { icon: Building, className: 'bg-blue-500/20 text-blue-400' },
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

const AmountDisplay = ({
	amount,
	type,
	currency,
}: {
	amount: string;
	type: Transaction['type'];
	currency: string;
}) => {
	const isPositive = ['sale', 'subscription'].includes(type);

	return (
		<span
			className={`font-mono text-sm font-semibold ${
				isPositive ? 'text-emerald-400' : 'text-rose-400'
			}`}
		>
			{isPositive ? '+' : '-'}
			{amount} {currency}
		</span>
	);
};

const StatusDot = ({ status }: { status: Transaction['status'] }) => {
	const config = {
		completed: 'bg-emerald-400',
		pending: 'bg-amber-400 animate-pulse',
		failed: 'bg-rose-400',
	};

	return <div className={`size-2 rounded-full ${config[status]}`} />;
};

const TransactionItem = ({ transaction }: { transaction: Transaction }) => (
	<div className="group flex items-center gap-4 p-3 rounded-lg transition-all hover:bg-muted/50">
		<TransactionIcon type={transaction.type} />
		<div className="flex-1 min-w-0">
			<div className="flex items-center gap-2 mb-1">
				{transaction.customer ? (
					<>
						<Avatar className="size-5">
							<AvatarImage
								src={transaction.customer.avatar}
								alt={transaction.customer.name}
							/>
							<AvatarFallback className="text-[9px] bg-secondary">
								{transaction.customer.initials}
							</AvatarFallback>
						</Avatar>
						<span className="font-medium text-sm text-foreground truncate">
							{transaction.customer.name}
						</span>
					</>
				) : (
					<span className="font-medium text-sm text-foreground">
						{transaction.description}
					</span>
				)}
				<StatusDot status={transaction.status} />
			</div>
			<div className="flex items-center gap-2 text-xs text-muted-foreground">
				<span className="capitalize">{transaction.type}</span>
				{transaction.paymentMethod && (
					<>
						<span>•</span>
						<span>{transaction.paymentMethod}</span>
					</>
				)}
				{transaction.destination && (
					<>
						<span>•</span>
						<span>{transaction.destination}</span>
					</>
				)}
			</div>
		</div>
		<div className="flex flex-col items-end gap-1">
			<AmountDisplay
				amount={transaction.amount}
				type={transaction.type}
				currency={transaction.currency}
			/>
			<span className="text-xs text-muted-foreground">
				{transaction.timestamp}
			</span>
		</div>
	</div>
);

const RevenueSummary = ({
	summary,
}: {
	summary: RevenueStreamProps['summary'];
}) => (
	<div className="grid grid-cols-3 gap-3">
		<div className="col-span-2 p-4 rounded-lg bg-gradient-to-br from-primary/20 to-primary/5 border border-primary/20">
			<div className="flex items-center justify-between mb-2">
				<DollarSign className="size-5 text-primary" />
				<div
					className={`flex items-center gap-1 text-xs ${
						summary.trend === 'up' ? 'text-emerald-400' : 'text-rose-400'
					}`}
				>
					{summary.trend === 'up' ? (
						<TrendingUp className="size-3" />
					) : (
						<TrendingDown className="size-3" />
					)}
					{summary.change}
				</div>
			</div>
			<p className="text-2xl font-bold text-foreground">{summary.totalToday}</p>
			<p className="text-xs text-muted-foreground">Today's Revenue</p>
		</div>
		<div className="p-4 rounded-lg bg-muted/30 border border-border/50">
			<Wallet className="size-5 text-amber-400 mb-2" />
			<p className="text-lg font-bold text-foreground">
				{summary.pendingAmount}
			</p>
			<p className="text-xs text-muted-foreground">Pending</p>
		</div>
	</div>
);

const RevenueStream = ({
	title,
	transactions,
	summary,
}: RevenueStreamProps) => (
	<Card className="border-border/50 bg-card/50 backdrop-blur-sm">
		<CardHeader className="flex-row items-center justify-between border-b border-border/50">
			<CardTitle className="text-lg font-semibold flex items-center gap-2">
				<DollarSign className="size-5" />
				{title}
			</CardTitle>
			<div className="flex items-center gap-2">
				<Button variant="ghost" size="sm" className="gap-2">
					<RefreshCw className="size-4" />
					Refresh
				</Button>
				<Button variant="ghost" size="icon-sm">
					<MoreVertical className="size-4" />
				</Button>
			</div>
		</CardHeader>
		<CardContent className="pt-6 space-y-4">
			<RevenueSummary summary={summary} />
			<div className="space-y-1 max-h-[350px] overflow-y-auto">
				{transactions.map((transaction) => (
					<TransactionItem key={transaction.id} transaction={transaction} />
				))}
			</div>
		</CardContent>
	</Card>
);

export default function Main() {
	const transactions: Transaction[] = [
		{
			id: '1',
			type: 'sale',
			amount: '249.99',
			currency: 'USD',
			customer: {
				name: 'Sarah Chen',
				email: 'sarah@email.com',
				initials: 'SC',
			},
			paymentMethod: 'Visa •••• 4242',
			description: 'Premium Headphones',
			status: 'completed',
			timestamp: 'now',
		},
		{
			id: '2',
			type: 'subscription',
			amount: '29.99',
			currency: 'USD',
			customer: {
				name: 'Mike Johnson',
				email: 'mike@email.com',
				initials: 'MJ',
			},
			paymentMethod: 'Apple Pay',
			description: 'Monthly Pro Plan',
			status: 'completed',
			timestamp: '5m ago',
		},
		{
			id: '3',
			type: 'refund',
			amount: '89.99',
			currency: 'USD',
			customer: {
				name: 'Emily Davis',
				email: 'emily@email.com',
				initials: 'ED',
			},
			paymentMethod: 'Mastercard •••• 5555',
			description: 'Order #ORD-2024-0845',
			status: 'pending',
			timestamp: '15m ago',
		},
		{
			id: '4',
			type: 'sale',
			amount: '1,299.00',
			currency: 'USD',
			customer: {
				name: 'Alex Kim',
				email: 'alex@email.com',
				initials: 'AK',
			},
			paymentMethod: 'PayPal',
			description: 'Smart TV Bundle',
			status: 'completed',
			timestamp: '25m ago',
		},
		{
			id: '5',
			type: 'payout',
			amount: '5,420.00',
			currency: 'USD',
			destination: 'Chase Bank ••5678',
			description: 'Weekly payout',
			status: 'pending',
			timestamp: '1h ago',
		},
		{
			id: '6',
			type: 'sale',
			amount: '79.99',
			currency: 'USD',
			customer: {
				name: 'Jordan Lee',
				email: 'jordan@email.com',
				initials: 'JL',
			},
			paymentMethod: 'Google Pay',
			description: 'Gaming Mouse',
			status: 'completed',
			timestamp: '1h ago',
		},
	];

	return (
		<section className="@container" data-theme="activity">
			<div className="mx-auto max-w-2xl px-4 py-8 @sm:px-6 @sm:py-12 @2xl:px-8 @2xl:py-16">
				<RevenueStream
					title="Revenue Stream"
					transactions={transactions}
					summary={{
						totalToday: '$24,567.89',
						change: '+12.5%',
						trend: 'up',
						pendingAmount: '$5,510',
					}}
				/>
			</div>
		</section>
	);
}
