import {
	ArrowDown,
	ArrowUp,
	Calendar,
	Check,
	CreditCard,
	Download,
	Eye,
	Filter,
	MoreVertical,
	Search,
	X,
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
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuItem,
	DropdownMenuSeparator,
	DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Input } from '@/components/ui/input';
import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from '@/components/ui/select';
import {
	Table,
	TableBody,
	TableCell,
	TableHead,
	TableHeader,
	TableRow,
} from '@/components/ui/table';

type Transaction = {
	id: string;
	date: string;
	description: string;
	amount: string;
	type: 'charge' | 'refund' | 'payout';
	status: 'completed' | 'pending' | 'failed';
	method: string;
};

type Summary = {
	label: string;
	value: string;
	change?: string;
	changeType?: 'positive' | 'negative';
};

const TransactionRow = ({
	id,
	date,
	description,
	amount,
	type,
	status,
	method,
}: Transaction) => {
	const statusStyles = {
		completed: 'bg-emerald-500/10 text-emerald-500',
		pending: 'bg-amber-500/10 text-amber-500',
		failed: 'bg-destructive/10 text-destructive',
	};

	const typeStyles = {
		charge: 'text-foreground',
		refund: 'text-destructive',
		payout: 'text-emerald-500',
	};

	return (
		<TableRow>
			<TableCell>
				<code className="text-xs">{id}</code>
			</TableCell>
			<TableCell className="text-muted-foreground">{date}</TableCell>
			<TableCell>{description}</TableCell>
			<TableCell className={`font-medium ${typeStyles[type]}`}>
				{type === 'refund' && '-'}
				{amount}
			</TableCell>
			<TableCell>
				<Badge className={`${statusStyles[status]} border-0`}>
					{status.charAt(0).toUpperCase() + status.slice(1)}
				</Badge>
			</TableCell>
			<TableCell className="text-muted-foreground">{method}</TableCell>
			<TableCell>
				<DropdownMenu>
					<DropdownMenuTrigger asChild>
						<Button variant="ghost" size="icon-sm">
							<MoreVertical className="size-4" />
						</Button>
					</DropdownMenuTrigger>
					<DropdownMenuContent align="end">
						<DropdownMenuItem>
							<Eye className="mr-2 size-4" />
							View Details
						</DropdownMenuItem>
						<DropdownMenuItem>
							<Download className="mr-2 size-4" />
							Download Receipt
						</DropdownMenuItem>
					</DropdownMenuContent>
				</DropdownMenu>
			</TableCell>
		</TableRow>
	);
};

const SummaryCard = ({ label, value, change, changeType }: Summary) => (
	<Card>
		<CardContent className="pt-6">
			<p className="text-sm text-muted-foreground">{label}</p>
			<p className="text-2xl font-bold mt-1">{value}</p>
			{change && (
				<p
					className={`text-sm mt-1 flex items-center gap-1 ${
						changeType === 'positive' ? 'text-emerald-500' : 'text-destructive'
					}`}
				>
					{changeType === 'positive' ? (
						<ArrowUp className="size-3" />
					) : (
						<ArrowDown className="size-3" />
					)}
					{change}
				</p>
			)}
		</CardContent>
	</Card>
);

export default function Main() {
	const transactions: Transaction[] = [
		{
			id: 'TXN-001',
			date: 'Jan 20, 2026',
			description: 'Pro Plan Subscription',
			amount: '$29.00',
			type: 'charge',
			status: 'completed',
			method: 'Visa •••• 4242',
		},
		{
			id: 'TXN-002',
			date: 'Jan 18, 2026',
			description: 'Order #12345 Payment',
			amount: '$149.99',
			type: 'charge',
			status: 'completed',
			method: 'PayPal',
		},
		{
			id: 'TXN-003',
			date: 'Jan 15, 2026',
			description: 'Order #12344 Refund',
			amount: '$49.99',
			type: 'refund',
			status: 'completed',
			method: 'Visa •••• 4242',
		},
		{
			id: 'TXN-004',
			date: 'Jan 12, 2026',
			description: 'Payout to Bank',
			amount: '$500.00',
			type: 'payout',
			status: 'pending',
			method: 'Bank Transfer',
		},
		{
			id: 'TXN-005',
			date: 'Jan 10, 2026',
			description: 'Order #12343 Payment',
			amount: '$89.00',
			type: 'charge',
			status: 'failed',
			method: 'Mastercard •••• 8888',
		},
	];

	const summaries: Summary[] = [
		{
			label: 'Total Spent',
			value: '$1,234.56',
			change: '+12%',
			changeType: 'positive',
		},
		{
			label: 'This Month',
			value: '$329.99',
			change: '-5%',
			changeType: 'negative',
		},
		{ label: 'Pending', value: '$500.00' },
		{ label: 'Refunded', value: '$49.99' },
	];

	return (
		<section className="@container" data-theme="settings">
			<div className="mx-auto max-w-5xl px-4 py-8 @sm:px-6 @md:py-10 @2xl:px-8 @3xl:py-12">
				<div className="space-y-6">
					<div className="grid gap-4 @sm:grid-cols-2 @lg:grid-cols-4">
						{summaries.map((summary) => (
							<SummaryCard key={summary.label} {...summary} />
						))}
					</div>

					<Card>
						<CardHeader className="border-b">
							<div className="flex flex-col gap-4 @md:flex-row @md:items-center @md:justify-between">
								<div>
									<CardTitle>Transaction History</CardTitle>
									<CardDescription>
										View all your payment transactions
									</CardDescription>
								</div>
								<div className="flex gap-2">
									<div className="relative flex-1 @md:w-64">
										<Search className="absolute left-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" />
										<Input
											placeholder="Search transactions..."
											className="pl-9"
										/>
									</div>
									<Select defaultValue="all">
										<SelectTrigger className="w-32">
											<SelectValue placeholder="Filter" />
										</SelectTrigger>
										<SelectContent>
											<SelectItem value="all">All Types</SelectItem>
											<SelectItem value="charge">Charges</SelectItem>
											<SelectItem value="refund">Refunds</SelectItem>
											<SelectItem value="payout">Payouts</SelectItem>
										</SelectContent>
									</Select>
									<Button variant="outline" className="gap-2">
										<Download className="size-4" />
										Export
									</Button>
								</div>
							</div>
						</CardHeader>
						<CardContent className="p-0">
							<Table>
								<TableHeader>
									<TableRow>
										<TableHead>ID</TableHead>
										<TableHead>Date</TableHead>
										<TableHead>Description</TableHead>
										<TableHead>Amount</TableHead>
										<TableHead>Status</TableHead>
										<TableHead>Method</TableHead>
										<TableHead className="w-10" />
									</TableRow>
								</TableHeader>
								<TableBody>
									{transactions.map((txn) => (
										<TransactionRow key={txn.id} {...txn} />
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
