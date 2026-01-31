import {
	AlertTriangle,
	Calendar,
	CreditCard,
	DollarSign,
	ExternalLink,
	Mail,
	MoreHorizontal,
	Phone,
	Receipt,
	RefreshCw,
	XCircle,
} from 'lucide-react';

import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardFooter, CardHeader } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuItem,
	DropdownMenuSeparator,
	DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';

interface BillingCustomer {
	id: string;
	name: string;
	email: string;
	phone: string;
	avatar?: string;
	initials: string;
	billingStatus: 'current' | 'overdue' | 'partial' | 'disputed';
	currentBalance: string;
	creditLimit: string;
	creditUsed: number;
	lastPayment: {
		amount: string;
		date: string;
		method: string;
	};
	nextDue: {
		amount: string;
		date: string;
	};
	paymentHistory: {
		onTime: number;
		late: number;
		missed: number;
	};
	outstandingInvoices: number;
	preferredPaymentMethod: string;
}

const StatusConfig = {
	current: { label: 'Current', className: 'bg-emerald-500/10 text-emerald-500 border-emerald-500/20' },
	overdue: { label: 'Overdue', className: 'bg-red-500/10 text-red-500 border-red-500/20' },
	partial: { label: 'Partial Paid', className: 'bg-amber-500/10 text-amber-500 border-amber-500/20' },
	disputed: { label: 'Disputed', className: 'bg-violet-500/10 text-violet-500 border-violet-500/20' },
};

const BillingStatusBadge = ({ status }: { status: BillingCustomer['billingStatus'] }) => (
	<Badge variant="outline" className={StatusConfig[status].className}>
		{StatusConfig[status].label}
	</Badge>
);

const CreditUsageBar = ({
	used,
	balance,
	limit,
}: {
	used: number;
	balance: string;
	limit: string;
}) => (
	<div className="space-y-1.5">
		<div className="flex items-center justify-between text-sm">
			<span className="text-muted-foreground">Credit Usage</span>
			<span className="font-medium">{used}%</span>
		</div>
		<Progress
			value={used}
			className={`h-2 ${used > 90 ? '[&>div]:bg-red-500' : used > 75 ? '[&>div]:bg-amber-500' : ''}`}
		/>
		<div className="flex items-center justify-between text-xs text-muted-foreground">
			<span>Balance: {balance}</span>
			<span>Limit: {limit}</span>
		</div>
	</div>
);

const PaymentHistoryBar = ({
	onTime,
	late,
	missed,
}: {
	onTime: number;
	late: number;
	missed: number;
}) => {
	const total = onTime + late + missed;
	return (
		<div className="space-y-1.5">
			<div className="flex items-center justify-between text-xs">
				<span className="text-muted-foreground">Payment History</span>
				<span className="font-medium">{total} payments</span>
			</div>
			<div className="flex h-2 overflow-hidden rounded-full">
				{onTime > 0 && (
					<div
						className="bg-emerald-500"
						style={{ width: `${(onTime / total) * 100}%` }}
					/>
				)}
				{late > 0 && (
					<div
						className="bg-amber-500"
						style={{ width: `${(late / total) * 100}%` }}
					/>
				)}
				{missed > 0 && (
					<div
						className="bg-red-500"
						style={{ width: `${(missed / total) * 100}%` }}
					/>
				)}
			</div>
			<div className="flex justify-between text-xs text-muted-foreground">
				<span className="text-emerald-500">{onTime} on time</span>
				<span className="text-amber-500">{late} late</span>
				<span className="text-red-500">{missed} missed</span>
			</div>
		</div>
	);
};

const InfoRow = ({
	icon: Icon,
	label,
	value,
	highlight,
}: {
	icon: React.ElementType;
	label: string;
	value: string;
	highlight?: boolean;
}) => (
	<div className="flex items-center justify-between text-sm">
		<span className="text-muted-foreground flex items-center gap-1.5">
			<Icon className="size-3.5" />
			{label}
		</span>
		<span className={highlight ? 'font-semibold text-red-500' : 'font-medium'}>{value}</span>
	</div>
);

const BillingCard = ({ customer }: { customer: BillingCustomer }) => (
	<Card className={`group transition-shadow hover:shadow-lg ${customer.billingStatus === 'overdue' ? 'border-red-500/30' : ''}`}>
		<CardHeader className="pb-3">
			<div className="flex items-start justify-between">
				<div className="flex items-center gap-3">
					<Avatar className="size-11">
						<AvatarImage src={customer.avatar} alt={customer.name} />
						<AvatarFallback className="bg-primary/10 text-primary">
							{customer.initials}
						</AvatarFallback>
					</Avatar>
					<div>
						<p className="font-semibold">{customer.name}</p>
						<p className="text-muted-foreground text-xs">{customer.email}</p>
					</div>
				</div>
				<DropdownMenu>
					<DropdownMenuTrigger asChild>
						<Button variant="ghost" size="icon-sm">
							<MoreHorizontal className="size-4" />
						</Button>
					</DropdownMenuTrigger>
					<DropdownMenuContent align="end">
						<DropdownMenuItem>
							<ExternalLink className="mr-2 size-4" />
							View account
						</DropdownMenuItem>
						<DropdownMenuItem>View invoices</DropdownMenuItem>
						<DropdownMenuItem>Record payment</DropdownMenuItem>
						<DropdownMenuSeparator />
						<DropdownMenuItem>Send reminder</DropdownMenuItem>
						<DropdownMenuItem>Adjust credit limit</DropdownMenuItem>
					</DropdownMenuContent>
				</DropdownMenu>
			</div>
		</CardHeader>
		<CardContent className="space-y-4">
			<div className="flex items-center justify-between">
				<BillingStatusBadge status={customer.billingStatus} />
				{customer.outstandingInvoices > 0 && (
					<Badge variant="outline" className="gap-1">
						<Receipt className="size-3" />
						{customer.outstandingInvoices} invoices
					</Badge>
				)}
			</div>
			<CreditUsageBar
				used={customer.creditUsed}
				balance={customer.currentBalance}
				limit={customer.creditLimit}
			/>
			<div className="grid grid-cols-2 gap-3">
				<div className="rounded-lg border bg-muted/30 p-2.5">
					<p className="text-muted-foreground text-xs">Last Payment</p>
					<p className="font-semibold">{customer.lastPayment.amount}</p>
					<p className="text-muted-foreground text-xs">{customer.lastPayment.date}</p>
				</div>
				<div className={`rounded-lg border p-2.5 ${customer.billingStatus === 'overdue' ? 'bg-red-500/10 border-red-500/30' : 'bg-muted/30'}`}>
					<p className="text-muted-foreground text-xs">Next Due</p>
					<p className={`font-semibold ${customer.billingStatus === 'overdue' ? 'text-red-500' : ''}`}>
						{customer.nextDue.amount}
					</p>
					<p className={`text-xs ${customer.billingStatus === 'overdue' ? 'text-red-400' : 'text-muted-foreground'}`}>
						{customer.nextDue.date}
					</p>
				</div>
			</div>
			<PaymentHistoryBar
				onTime={customer.paymentHistory.onTime}
				late={customer.paymentHistory.late}
				missed={customer.paymentHistory.missed}
			/>
			<div className="flex items-center gap-2 rounded-lg bg-muted/50 px-3 py-2">
				<CreditCard className="text-muted-foreground size-4" />
				<span className="text-sm">{customer.preferredPaymentMethod}</span>
			</div>
		</CardContent>
		<CardFooter className="grid grid-cols-2 gap-2 border-t bg-muted/20 px-4 py-3">
			<Button variant="outline" size="sm" className="gap-1.5">
				<Mail className="size-3.5" />
				Email
			</Button>
			<Button variant="outline" size="sm" className="gap-1.5">
				<Phone className="size-3.5" />
				Call
			</Button>
		</CardFooter>
	</Card>
);

export default function Main() {
	const customers: BillingCustomer[] = [
		{
			id: '1',
			name: 'Thomas Anderson',
			email: 'thomas.a@email.com',
			phone: '+1 555-0201',
			initials: 'TA',
			billingStatus: 'current',
			currentBalance: '$4,250',
			creditLimit: '$10,000',
			creditUsed: 42,
			lastPayment: { amount: '$1,500', date: 'Jan 15, 2024', method: 'Bank Transfer' },
			nextDue: { amount: '$2,000', date: 'Feb 15, 2024' },
			paymentHistory: { onTime: 18, late: 2, missed: 0 },
			outstandingInvoices: 1,
			preferredPaymentMethod: 'Bank Transfer',
		},
		{
			id: '2',
			name: 'Uma Patel',
			email: 'uma.p@email.com',
			phone: '+1 555-0202',
			initials: 'UP',
			billingStatus: 'overdue',
			currentBalance: '$8,750',
			creditLimit: '$10,000',
			creditUsed: 87,
			lastPayment: { amount: '$500', date: 'Dec 10, 2023', method: 'Credit Card' },
			nextDue: { amount: '$3,500', date: 'Overdue 15 days' },
			paymentHistory: { onTime: 8, late: 5, missed: 2 },
			outstandingInvoices: 3,
			preferredPaymentMethod: 'Visa •••• 4242',
		},
		{
			id: '3',
			name: 'Vincent Cruz',
			email: 'vincent.c@email.com',
			phone: '+1 555-0203',
			initials: 'VC',
			billingStatus: 'partial',
			currentBalance: '$3,200',
			creditLimit: '$5,000',
			creditUsed: 64,
			lastPayment: { amount: '$800', date: 'Jan 20, 2024', method: 'PayPal' },
			nextDue: { amount: '$1,200', date: 'Feb 1, 2024' },
			paymentHistory: { onTime: 12, late: 3, missed: 0 },
			outstandingInvoices: 2,
			preferredPaymentMethod: 'PayPal',
		},
		{
			id: '4',
			name: 'Wendy Kim',
			email: 'wendy.k@email.com',
			phone: '+1 555-0204',
			initials: 'WK',
			billingStatus: 'disputed',
			currentBalance: '$2,100',
			creditLimit: '$7,500',
			creditUsed: 28,
			lastPayment: { amount: '$2,500', date: 'Jan 5, 2024', method: 'Bank Transfer' },
			nextDue: { amount: '$1,500', date: 'Feb 5, 2024' },
			paymentHistory: { onTime: 20, late: 1, missed: 0 },
			outstandingInvoices: 1,
			preferredPaymentMethod: 'Bank Transfer',
		},
		{
			id: '5',
			name: 'Xavier Lopez',
			email: 'xavier.l@email.com',
			phone: '+1 555-0205',
			initials: 'XL',
			billingStatus: 'current',
			currentBalance: '$1,500',
			creditLimit: '$15,000',
			creditUsed: 10,
			lastPayment: { amount: '$5,000', date: 'Jan 25, 2024', method: 'Wire Transfer' },
			nextDue: { amount: '$1,500', date: 'Feb 25, 2024' },
			paymentHistory: { onTime: 24, late: 0, missed: 0 },
			outstandingInvoices: 0,
			preferredPaymentMethod: 'Wire Transfer',
		},
		{
			id: '6',
			name: 'Yolanda Davis',
			email: 'yolanda.d@email.com',
			phone: '+1 555-0206',
			initials: 'YD',
			billingStatus: 'overdue',
			currentBalance: '$6,800',
			creditLimit: '$8,000',
			creditUsed: 85,
			lastPayment: { amount: '$300', date: 'Dec 28, 2023', method: 'Check' },
			nextDue: { amount: '$2,800', date: 'Overdue 7 days' },
			paymentHistory: { onTime: 6, late: 4, missed: 3 },
			outstandingInvoices: 4,
			preferredPaymentMethod: 'Check',
		},
	];

	return (
		<section className="@container" data-theme="dashboard">
			<div className="mx-auto max-w-7xl space-y-6 px-4 py-8 @sm:px-6 @2xl:px-8">
				<div className="flex items-center gap-3">
					<div className="bg-primary/10 text-primary rounded-lg p-2.5">
						<Receipt className="size-5" />
					</div>
					<div>
						<h1 className="text-2xl font-bold tracking-tight">Billing & Payments</h1>
						<p className="text-muted-foreground text-sm">Monitor customer billing status and payment history</p>
					</div>
				</div>
				<div className="grid gap-4 @sm:grid-cols-2 @xl:grid-cols-3">
					{customers.map((customer) => (
						<BillingCard key={customer.id} customer={customer} />
					))}
				</div>
			</div>
		</section>
	);
}
