import {
	ArrowDownRight,
	ArrowUpRight,
	CircleDollarSign,
	CreditCard,
	Package,
	RefreshCcw,
	ShoppingCart,
	TrendingUp,
	Wallet,
} from 'lucide-react';

import { Badge } from '@/components/ui/badge';
import {
	Card,
	CardContent,
	CardDescription,
	CardHeader,
	CardTitle,
} from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';

type TransactionItem = {
	id: string;
	type: 'sale' | 'refund' | 'payout' | 'subscription' | 'fee';
	description: string;
	amount: string;
	status: 'completed' | 'pending' | 'failed';
	date: string;
	reference: string;
};

const getTypeConfig = (type: TransactionItem['type']) => {
	switch (type) {
		case 'sale':
			return {
				icon: ShoppingCart,
				color: 'bg-emerald-500/10 text-emerald-500',
				isPositive: true,
			};
		case 'refund':
			return {
				icon: RefreshCcw,
				color: 'bg-red-500/10 text-red-500',
				isPositive: false,
			};
		case 'payout':
			return {
				icon: Wallet,
				color: 'bg-blue-500/10 text-blue-500',
				isPositive: false,
			};
		case 'subscription':
			return {
				icon: CreditCard,
				color: 'bg-violet-500/10 text-violet-500',
				isPositive: true,
			};
		case 'fee':
			return {
				icon: CircleDollarSign,
				color: 'bg-amber-500/10 text-amber-500',
				isPositive: false,
			};
	}
};

const getStatusStyle = (status: TransactionItem['status']) => {
	switch (status) {
		case 'completed':
			return 'bg-emerald-500/10 text-emerald-500';
		case 'pending':
			return 'bg-amber-500/10 text-amber-500';
		case 'failed':
			return 'bg-red-500/10 text-red-500';
	}
};

const TransactionRow = ({
	type,
	description,
	amount,
	status,
	date,
	reference,
}: TransactionItem) => {
	const config = getTypeConfig(type);
	const Icon = config.icon;

	return (
		<div className="flex items-center gap-4 py-3">
			<div className={`rounded-lg p-2 ${config.color}`}>
				<Icon className="size-4" />
			</div>
			<div className="flex-1">
				<p className="font-medium">{description}</p>
				<p className="text-xs text-muted-foreground">{reference}</p>
			</div>
			<div className="text-right">
				<p
					className={`font-medium ${config.isPositive ? 'text-emerald-500' : 'text-red-500'}`}
				>
					{config.isPositive ? '+' : '-'}
					{amount}
				</p>
				<div className="flex items-center gap-2">
					<span className="text-xs text-muted-foreground">{date}</span>
					<Badge
						variant="secondary"
						className={`text-[10px] ${getStatusStyle(status)}`}
					>
						{status}
					</Badge>
				</div>
			</div>
		</div>
	);
};

export default function Main() {
	const transactions: TransactionItem[] = [
		{
			id: '1',
			type: 'sale',
			description: 'Order #ORD-4521',
			amount: '$234.50',
			status: 'completed',
			date: 'Dec 12',
			reference: 'TXN-78451236',
		},
		{
			id: '2',
			type: 'sale',
			description: 'Order #ORD-4520',
			amount: '$189.00',
			status: 'completed',
			date: 'Dec 12',
			reference: 'TXN-78451235',
		},
		{
			id: '3',
			type: 'refund',
			description: 'Refund for #ORD-4510',
			amount: '$45.00',
			status: 'completed',
			date: 'Dec 12',
			reference: 'TXN-78451234',
		},
		{
			id: '4',
			type: 'payout',
			description: 'Weekly payout',
			amount: '$2,450.00',
			status: 'pending',
			date: 'Dec 11',
			reference: 'TXN-78451233',
		},
		{
			id: '5',
			type: 'subscription',
			description: 'Premium Plan',
			amount: '$29.99',
			status: 'completed',
			date: 'Dec 11',
			reference: 'TXN-78451232',
		},
		{
			id: '6',
			type: 'fee',
			description: 'Transaction fee',
			amount: '$12.50',
			status: 'completed',
			date: 'Dec 11',
			reference: 'TXN-78451231',
		},
		{
			id: '7',
			type: 'sale',
			description: 'Order #ORD-4519',
			amount: '$456.20',
			status: 'completed',
			date: 'Dec 11',
			reference: 'TXN-78451230',
		},
		{
			id: '8',
			type: 'sale',
			description: 'Order #ORD-4518',
			amount: '$78.90',
			status: 'failed',
			date: 'Dec 10',
			reference: 'TXN-78451229',
		},
	];

	const totalIn = transactions.filter(
		(t) => getTypeConfig(t.type).isPositive,
	).length;
	const totalOut = transactions.filter(
		(t) => !getTypeConfig(t.type).isPositive,
	).length;

	return (
		<section className="@container" data-theme="dashboard">
			<div className="mx-auto max-w-7xl px-4 py-8 @sm:px-6 @md:py-10 @2xl:px-8 @3xl:py-12">
				<Card>
					<CardHeader className="flex-row items-center justify-between">
						<div>
							<CardTitle>Transaction History</CardTitle>
							<CardDescription>
								{totalIn} incoming • {totalOut} outgoing
							</CardDescription>
						</div>
						<div className="flex items-center gap-4">
							<div className="flex items-center gap-1 text-sm text-emerald-500">
								<ArrowUpRight className="size-4" />
								<span>Income</span>
							</div>
							<div className="flex items-center gap-1 text-sm text-red-500">
								<ArrowDownRight className="size-4" />
								<span>Expense</span>
							</div>
						</div>
					</CardHeader>
					<CardContent>
						<div className="divide-y">
							{transactions.map((transaction) => (
								<TransactionRow key={transaction.id} {...transaction} />
							))}
						</div>
					</CardContent>
				</Card>
			</div>
		</section>
	);
}
