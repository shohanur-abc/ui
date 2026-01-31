import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { ScrollArea } from '@/components/ui/scroll-area';
import {
	DollarSign,
	CreditCard,
	ArrowUpRight,
	ArrowDownRight,
	RefreshCw,
	Wallet,
	Building,
	CircleDollarSign,
	Filter,
	Download,
	TrendingUp,
	TrendingDown,
	type LucideIcon,
} from 'lucide-react';

interface TransactionLog {
	id: string;
	type: 'payment' | 'refund' | 'payout' | 'fee' | 'transfer' | 'adjustment';
	status: 'completed' | 'pending' | 'failed';
	amount: string;
	currency: string;
	description: string;
	reference: string;
	paymentMethod?: string;
	destination?: string;
	timestamp: string;
}

interface TransactionLogProps {
	title: string;
	transactions: TransactionLog[];
	summary: {
		totalRevenue: string;
		pendingPayouts: string;
		fees: string;
		netBalance: string;
	};
}

const TypeIcon = ({ type }: { type: TransactionLog['type'] }) => {
	const config: Record<
		TransactionLog['type'],
		{ icon: LucideIcon; className: string }
	> = {
		payment: { icon: ArrowUpRight, className: 'bg-emerald-500/20 text-emerald-400' },
		refund: { icon: ArrowDownRight, className: 'bg-rose-500/20 text-rose-400' },
		payout: { icon: Building, className: 'bg-blue-500/20 text-blue-400' },
		fee: { icon: CircleDollarSign, className: 'bg-amber-500/20 text-amber-400' },
		transfer: { icon: RefreshCw, className: 'bg-purple-500/20 text-purple-400' },
		adjustment: { icon: Wallet, className: 'bg-muted text-muted-foreground' },
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

const StatusBadge = ({ status }: { status: TransactionLog['status'] }) => {
	const config = {
		completed: 'bg-emerald-500/20 text-emerald-400 border-emerald-500/30',
		pending: 'bg-amber-500/20 text-amber-400 border-amber-500/30',
		failed: 'bg-rose-500/20 text-rose-400 border-rose-500/30',
	};

	return (
		<Badge variant="outline" className={`text-xs ${config[status]}`}>
			{status.charAt(0).toUpperCase() + status.slice(1)}
		</Badge>
	);
};

const AmountDisplay = ({
	amount,
	type,
	currency,
}: {
	amount: string;
	type: TransactionLog['type'];
	currency: string;
}) => {
	const isPositive = ['payment', 'transfer'].includes(type);
	const isNegative = ['refund', 'payout', 'fee'].includes(type);

	return (
		<div className="flex items-center gap-1">
			{isPositive && <TrendingUp className="size-4 text-emerald-400" />}
			{isNegative && <TrendingDown className="size-4 text-rose-400" />}
			<span
				className={`font-mono font-semibold ${
					isPositive ? 'text-emerald-400' : isNegative ? 'text-rose-400' : 'text-foreground'
				}`}
			>
				{isNegative && '-'}
				{amount} {currency}
			</span>
		</div>
	);
};

const TransactionEntry = ({ transaction }: { transaction: TransactionLog }) => (
	<div className="group p-4 rounded-xl border border-border/50 bg-card/50 transition-all hover:bg-muted/50 hover:border-border">
		<div className="flex gap-4">
			<TypeIcon type={transaction.type} />
			<div className="flex-1 min-w-0">
				<div className="flex items-start justify-between gap-2 mb-2">
					<div>
						<div className="flex items-center gap-2 mb-1">
							<span className="font-medium text-foreground capitalize">
								{transaction.type}
							</span>
							<StatusBadge status={transaction.status} />
						</div>
						<p className="text-sm text-muted-foreground">
							{transaction.description}
						</p>
					</div>
					<AmountDisplay
						amount={transaction.amount}
						type={transaction.type}
						currency={transaction.currency}
					/>
				</div>
				<div className="flex items-center gap-4 text-xs text-muted-foreground pt-2 border-t border-border/50 mt-2">
					<span className="font-mono">{transaction.reference}</span>
					{transaction.paymentMethod && (
						<>
							<span>•</span>
							<span className="flex items-center gap-1">
								<CreditCard className="size-3" />
								{transaction.paymentMethod}
							</span>
						</>
					)}
					{transaction.destination && (
						<>
							<span>•</span>
							<span>{transaction.destination}</span>
						</>
					)}
					<span className="ml-auto">{transaction.timestamp}</span>
				</div>
			</div>
		</div>
	</div>
);

const SummaryCard = ({
	label,
	value,
	icon: Icon,
	variant = 'default',
}: {
	label: string;
	value: string;
	icon: LucideIcon;
	variant?: 'default' | 'success' | 'warning' | 'info';
}) => {
	const variants = {
		default: 'bg-muted/30 border-border/50',
		success: 'bg-emerald-500/10 border-emerald-500/20',
		warning: 'bg-amber-500/10 border-amber-500/20',
		info: 'bg-blue-500/10 border-blue-500/20',
	};

	const iconVariants = {
		default: 'text-muted-foreground',
		success: 'text-emerald-400',
		warning: 'text-amber-400',
		info: 'text-blue-400',
	};

	return (
		<div className={`flex flex-col p-3 rounded-lg border ${variants[variant]}`}>
			<div className="flex items-center gap-2 mb-1">
				<Icon className={`size-4 ${iconVariants[variant]}`} />
				<span className="text-xs text-muted-foreground">{label}</span>
			</div>
			<span className="text-lg font-bold text-foreground">{value}</span>
		</div>
	);
};

const TransactionLogViewer = ({
	title,
	transactions,
	summary,
}: TransactionLogProps) => (
	<Card className="border-border/50 bg-card/50 backdrop-blur-sm">
		<CardHeader className="flex-row items-center justify-between border-b border-border/50">
			<CardTitle className="text-lg font-semibold flex items-center gap-2">
				<DollarSign className="size-5" />
				{title}
			</CardTitle>
			<div className="flex items-center gap-2">
				<Button variant="ghost" size="sm" className="gap-1">
					<Filter className="size-4" />
					Filter
				</Button>
				<Button variant="outline" size="sm" className="gap-1">
					<Download className="size-4" />
					Export
				</Button>
			</div>
		</CardHeader>
		<CardContent className="pt-6 space-y-4">
			<div className="grid grid-cols-4 gap-3">
				<SummaryCard
					label="Total Revenue"
					value={summary.totalRevenue}
					icon={TrendingUp}
					variant="success"
				/>
				<SummaryCard
					label="Pending Payouts"
					value={summary.pendingPayouts}
					icon={Building}
					variant="warning"
				/>
				<SummaryCard
					label="Fees"
					value={summary.fees}
					icon={CircleDollarSign}
				/>
				<SummaryCard
					label="Net Balance"
					value={summary.netBalance}
					icon={Wallet}
					variant="info"
				/>
			</div>
			<ScrollArea className="h-[380px]">
				<div className="space-y-3 pr-4">
					{transactions.map((transaction) => (
						<TransactionEntry key={transaction.id} transaction={transaction} />
					))}
				</div>
			</ScrollArea>
		</CardContent>
	</Card>
);

export default function Main() {
	const transactions: TransactionLog[] = [
		{
			id: '1',
			type: 'payment',
			status: 'completed',
			amount: '$249.99',
			currency: 'USD',
			description: 'Order #ORD-2024-0892 - Premium Headphones',
			reference: 'txn_abc123',
			paymentMethod: 'Visa •••• 4242',
			timestamp: '5 min ago',
		},
		{
			id: '2',
			type: 'refund',
			status: 'completed',
			amount: '$89.99',
			currency: 'USD',
			description: 'Refund for Order #ORD-2024-0845',
			reference: 'txn_def456',
			paymentMethod: 'Mastercard •••• 5555',
			timestamp: '25 min ago',
		},
		{
			id: '3',
			type: 'payout',
			status: 'pending',
			amount: '$5,420.00',
			currency: 'USD',
			description: 'Weekly payout - Week 11',
			reference: 'po_ghi789',
			destination: 'Chase Bank ••5678',
			timestamp: '1 hour ago',
		},
		{
			id: '4',
			type: 'fee',
			status: 'completed',
			amount: '$7.50',
			currency: 'USD',
			description: 'Processing fee - 3% of $249.99',
			reference: 'fee_jkl012',
			timestamp: '5 min ago',
		},
		{
			id: '5',
			type: 'payment',
			status: 'completed',
			amount: '$1,299.00',
			currency: 'USD',
			description: 'Order #ORD-2024-0891 - Smart TV Bundle',
			reference: 'txn_mno345',
			paymentMethod: 'Apple Pay',
			timestamp: '2 hours ago',
		},
		{
			id: '6',
			type: 'transfer',
			status: 'completed',
			amount: '$500.00',
			currency: 'USD',
			description: 'Internal transfer to marketing budget',
			reference: 'tfr_pqr678',
			timestamp: '4 hours ago',
		},
		{
			id: '7',
			type: 'adjustment',
			status: 'completed',
			amount: '$15.00',
			currency: 'USD',
			description: 'Chargeback dispute won - Order #ORD-2024-0789',
			reference: 'adj_stu901',
			timestamp: '1 day ago',
		},
	];

	return (
		<section className="@container" data-theme="activity">
			<div className="mx-auto max-w-4xl px-4 py-8 @sm:px-6 @sm:py-12 @2xl:px-8 @2xl:py-16">
				<TransactionLogViewer
					title="Transaction Log"
					transactions={transactions}
					summary={{
						totalRevenue: '$89,450',
						pendingPayouts: '$5,420',
						fees: '$2,340',
						netBalance: '$81,690',
					}}
				/>
			</div>
		</section>
	);
}
