import {
	ArrowDownLeft,
	ArrowRight,
	ArrowUpRight,
	CreditCard,
	DollarSign,
	MoreHorizontal,
	RefreshCw,
	TrendingUp,
	Wallet,
	type LucideIcon,
} from 'lucide-react';
import Link from 'next/link';

import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import {
	Table,
	TableBody,
	TableCell,
	TableHead,
	TableHeader,
	TableRow,
} from '@/components/ui/table';

type FinanceKpi = {
	title: string;
	value: string;
	change: string;
	trend: 'up' | 'down';
	icon: LucideIcon;
};

type TransactionRow = {
	id: string;
	type: 'payment' | 'refund' | 'payout' | 'fee';
	description: string;
	orderId: string;
	amount: string;
	fee: string;
	net: string;
	date: string;
	status: 'completed' | 'pending' | 'failed';
	method: string;
};

const FinanceKpiCard = ({
	title,
	value,
	change,
	trend,
	icon: Icon,
}: FinanceKpi) => (
	<Card>
		<CardContent className="p-4">
			<div className="flex items-center gap-2 text-muted-foreground">
				<Icon className="size-4" />
				<span className="text-sm">{title}</span>
			</div>
			<div className="mt-2 flex items-end justify-between">
				<p className="text-2xl font-bold">{value}</p>
				<span
					className={`flex items-center text-xs ${
						trend === 'up' ? 'text-emerald-500' : 'text-red-500'
					}`}
				>
					{trend === 'up' ? (
						<ArrowUpRight className="size-3" />
					) : (
						<ArrowDownLeft className="size-3" />
					)}
					{change}
				</span>
			</div>
		</CardContent>
	</Card>
);

const getTypeIcon = (type: TransactionRow['type']) => {
	switch (type) {
		case 'payment':
			return <ArrowUpRight className="size-4 text-emerald-500" />;
		case 'refund':
			return <RefreshCw className="size-4 text-amber-500" />;
		case 'payout':
			return <ArrowDownLeft className="size-4 text-blue-500" />;
		case 'fee':
			return <CreditCard className="size-4 text-muted-foreground" />;
	}
};

const getStatusStyle = (status: TransactionRow['status']) => {
	switch (status) {
		case 'completed':
			return 'bg-emerald-500/10 text-emerald-500';
		case 'pending':
			return 'bg-amber-500/10 text-amber-500';
		case 'failed':
			return 'bg-red-500/10 text-red-500';
	}
};

export default function Main() {
	const kpis: FinanceKpi[] = [
		{
			title: 'Total Revenue',
			value: '$248,632',
			change: '+28%',
			trend: 'up',
			icon: DollarSign,
		},
		{
			title: 'Net Profit',
			value: '$67,842',
			change: '+22%',
			trend: 'up',
			icon: TrendingUp,
		},
		{
			title: 'Processing Fees',
			value: '$7,459',
			change: '+15%',
			trend: 'down',
			icon: CreditCard,
		},
		{
			title: 'Pending Payouts',
			value: '$12,340',
			change: '-8%',
			trend: 'up',
			icon: Wallet,
		},
	];

	const transactions: TransactionRow[] = [
		{
			id: 'TXN-001',
			type: 'payment',
			description: 'Order payment',
			orderId: 'ORD-4521',
			amount: '$234.50',
			fee: '$6.80',
			net: '$227.70',
			date: 'Dec 12, 2024 14:32',
			status: 'completed',
			method: 'Visa •••• 4242',
		},
		{
			id: 'TXN-002',
			type: 'payment',
			description: 'Order payment',
			orderId: 'ORD-4520',
			amount: '$189.00',
			fee: '$5.48',
			net: '$183.52',
			date: 'Dec 12, 2024 13:15',
			status: 'completed',
			method: 'Mastercard •••• 8888',
		},
		{
			id: 'TXN-003',
			type: 'refund',
			description: 'Order refund',
			orderId: 'ORD-4516',
			amount: '-$145.50',
			fee: '$0.00',
			net: '-$145.50',
			date: 'Dec 12, 2024 11:42',
			status: 'completed',
			method: 'Original method',
		},
		{
			id: 'TXN-004',
			type: 'payout',
			description: 'Weekly payout',
			orderId: '-',
			amount: '-$5,000.00',
			fee: '$0.00',
			net: '-$5,000.00',
			date: 'Dec 11, 2024 00:00',
			status: 'completed',
			method: 'Bank •••• 1234',
		},
		{
			id: 'TXN-005',
			type: 'payment',
			description: 'Order payment',
			orderId: 'ORD-4519',
			amount: '$456.20',
			fee: '$13.23',
			net: '$442.97',
			date: 'Dec 11, 2024 16:45',
			status: 'pending',
			method: 'PayPal',
		},
		{
			id: 'TXN-006',
			type: 'payment',
			description: 'Order payment',
			orderId: 'ORD-4518',
			amount: '$78.90',
			fee: '$2.29',
			net: '$76.61',
			date: 'Dec 11, 2024 15:20',
			status: 'completed',
			method: 'Apple Pay',
		},
	];

	return (
		<section className="@container" data-theme="dashboard">
			<div className="mx-auto max-w-7xl px-4 py-8 @sm:px-6 @md:py-10 @2xl:px-8 @3xl:py-12">
				<div className="space-y-6">
					<div className="grid gap-4 @sm:grid-cols-2 @xl:grid-cols-4">
						{kpis.map((kpi, i) => (
							<FinanceKpiCard key={i} {...kpi} />
						))}
					</div>
					<Card>
						<CardHeader className="flex-row items-center justify-between pb-4">
							<CardTitle className="text-base">Recent Transactions</CardTitle>
							<Button variant="ghost" size="sm" className="gap-1" asChild>
								<Link href="/transactions">
									View All
									<ArrowRight className="size-3" />
								</Link>
							</Button>
						</CardHeader>
						<CardContent className="pt-0">
							<Table>
								<TableHeader>
									<TableRow>
										<TableHead>Transaction</TableHead>
										<TableHead className="hidden @lg:table-cell">
											Order
										</TableHead>
										<TableHead>Amount</TableHead>
										<TableHead className="hidden @xl:table-cell">Fee</TableHead>
										<TableHead className="hidden @lg:table-cell">Net</TableHead>
										<TableHead className="hidden @xl:table-cell">
											Date
										</TableHead>
										<TableHead>Status</TableHead>
										<TableHead className="w-10"></TableHead>
									</TableRow>
								</TableHeader>
								<TableBody>
									{transactions.map((txn) => (
										<TableRow key={txn.id}>
											<TableCell>
												<div className="flex items-center gap-3">
													<div className="rounded-full bg-muted p-2">
														{getTypeIcon(txn.type)}
													</div>
													<div>
														<p className="font-medium">{txn.description}</p>
														<p className="text-xs text-muted-foreground">
															{txn.method}
														</p>
													</div>
												</div>
											</TableCell>
											<TableCell className="hidden @lg:table-cell text-muted-foreground">
												{txn.orderId}
											</TableCell>
											<TableCell
												className={`font-medium ${txn.amount.startsWith('-') ? 'text-red-500' : ''}`}
											>
												{txn.amount}
											</TableCell>
											<TableCell className="hidden @xl:table-cell text-muted-foreground">
												{txn.fee}
											</TableCell>
											<TableCell
												className={`hidden @lg:table-cell font-medium ${txn.net.startsWith('-') ? 'text-red-500' : ''}`}
											>
												{txn.net}
											</TableCell>
											<TableCell className="hidden @xl:table-cell text-muted-foreground">
												{txn.date}
											</TableCell>
											<TableCell>
												<Badge
													variant="secondary"
													className={getStatusStyle(txn.status)}
												>
													{txn.status}
												</Badge>
											</TableCell>
											<TableCell>
												<Button variant="ghost" size="icon" className="size-8">
													<MoreHorizontal className="size-4" />
												</Button>
											</TableCell>
										</TableRow>
									))}
								</TableBody>
							</Table>
						</CardContent>
					</Card>
				</div>
			</div>
		</section>
	);
}
