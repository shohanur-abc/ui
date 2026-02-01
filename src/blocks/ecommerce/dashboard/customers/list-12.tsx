import {
	ArrowDownRight,
	ArrowUpRight,
	Calendar,
	CreditCard,
	FileText,
	MoreHorizontal,
	Receipt,
} from 'lucide-react';

import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuItem,
	DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';

interface InvoiceCustomer {
	id: string;
	name: string;
	email: string;
	avatar?: string;
	initials: string;
	invoice: {
		number: string;
		status: 'draft' | 'sent' | 'paid' | 'overdue' | 'cancelled';
		amount: string;
		issuedDate: string;
		dueDate: string;
		paidDate?: string;
	};
	paymentMethod?: string;
	outstandingBalance: string;
	isRecurring: boolean;
}

const InvoiceStatusBadge = ({
	status,
}: {
	status: InvoiceCustomer['invoice']['status'];
}) => {
	const config: Record<string, { label: string; className: string }> = {
		draft: { label: 'Draft', className: 'bg-slate-500/10 text-slate-400' },
		sent: { label: 'Sent', className: 'bg-blue-500/10 text-blue-500' },
		paid: { label: 'Paid', className: 'bg-emerald-500/10 text-emerald-500' },
		overdue: { label: 'Overdue', className: 'bg-red-500/10 text-red-500' },
		cancelled: {
			label: 'Cancelled',
			className: 'bg-orange-500/10 text-orange-500',
		},
	};
	const { label, className } = config[status];
	return (
		<Badge variant="outline" className={className}>
			{label}
		</Badge>
	);
};

const PageHeader = ({
	title,
	subtitle,
}: {
	title: string;
	subtitle: string;
}) => (
	<div className="flex flex-col gap-4 @lg:flex-row @lg:items-center @lg:justify-between">
		<div className="flex items-center gap-3">
			<div className="bg-primary/10 text-primary rounded-lg p-2.5">
				<FileText className="size-5" />
			</div>
			<div>
				<h1 className="text-2xl font-bold tracking-tight">{title}</h1>
				<p className="text-muted-foreground text-sm">{subtitle}</p>
			</div>
		</div>
		<Button className="gap-1.5 w-fit">
			<FileText className="size-4" />
			Create Invoice
		</Button>
	</div>
);

const InvoiceListItem = ({ customer }: { customer: InvoiceCustomer }) => (
	<div className="group flex flex-col @lg:flex-row @lg:items-center gap-4 rounded-lg border bg-card p-4 transition-colors hover:bg-muted/50">
		<div className="flex items-center gap-3 min-w-0">
			<Avatar className="size-11">
				<AvatarImage src={customer.avatar} alt={customer.name} />
				<AvatarFallback className="bg-primary/10 text-primary">
					{customer.initials}
				</AvatarFallback>
			</Avatar>
			<div className="min-w-0">
				<div className="flex items-center gap-2">
					<p className="font-semibold truncate">{customer.name}</p>
					{customer.isRecurring && (
						<Badge variant="secondary" className="text-xs">
							Recurring
						</Badge>
					)}
				</div>
				<p className="text-muted-foreground text-sm truncate">
					{customer.email}
				</p>
			</div>
		</div>
		<div className="flex items-center gap-2 min-w-[140px]">
			<code className="font-mono text-sm">{customer.invoice.number}</code>
			<InvoiceStatusBadge status={customer.invoice.status} />
		</div>
		<div className="flex-1 grid grid-cols-2 @md:grid-cols-4 gap-4 text-sm">
			<div>
				<p className="text-muted-foreground text-xs">Amount</p>
				<p className="font-semibold text-lg">{customer.invoice.amount}</p>
			</div>
			<div>
				<p className="text-muted-foreground text-xs flex items-center gap-1">
					<Calendar className="size-3" /> Issued
				</p>
				<p>{customer.invoice.issuedDate}</p>
			</div>
			<div>
				<p className="text-muted-foreground text-xs flex items-center gap-1">
					<Calendar className="size-3" /> Due
				</p>
				<p
					className={
						customer.invoice.status === 'overdue'
							? 'text-red-500 font-medium'
							: ''
					}
				>
					{customer.invoice.dueDate}
				</p>
			</div>
			<div className="hidden @md:block">
				<p className="text-muted-foreground text-xs">Outstanding</p>
				<p
					className={`font-medium ${customer.outstandingBalance !== '$0.00' ? 'text-amber-500' : 'text-emerald-500'}`}
				>
					{customer.outstandingBalance}
				</p>
			</div>
		</div>
		{customer.paymentMethod && (
			<div className="hidden @lg:flex items-center gap-2 min-w-[120px]">
				<CreditCard className="text-muted-foreground size-4" />
				<span className="text-sm">{customer.paymentMethod}</span>
			</div>
		)}
		<div className="flex items-center gap-2">
			{customer.invoice.status === 'draft' && (
				<Button variant="outline" size="sm" className="hidden @md:flex">
					Send
				</Button>
			)}
			{customer.invoice.status === 'sent' && (
				<Button variant="outline" size="sm" className="hidden @md:flex">
					Remind
				</Button>
			)}
			{customer.invoice.status === 'overdue' && (
				<Button
					variant="outline"
					size="sm"
					className="hidden @md:flex text-red-500"
				>
					Follow up
				</Button>
			)}
			<DropdownMenu>
				<DropdownMenuTrigger asChild>
					<Button variant="ghost" size="icon-sm">
						<MoreHorizontal className="size-4" />
					</Button>
				</DropdownMenuTrigger>
				<DropdownMenuContent align="end">
					<DropdownMenuItem>View invoice</DropdownMenuItem>
					<DropdownMenuItem>Download PDF</DropdownMenuItem>
					<DropdownMenuItem>Send reminder</DropdownMenuItem>
					<DropdownMenuItem>Mark as paid</DropdownMenuItem>
					<DropdownMenuItem>Duplicate</DropdownMenuItem>
					<DropdownMenuItem className="text-red-500">
						Void invoice
					</DropdownMenuItem>
				</DropdownMenuContent>
			</DropdownMenu>
		</div>
	</div>
);

export default function Main() {
	const customers: InvoiceCustomer[] = [
		{
			id: '1',
			name: 'George Harrison',
			email: 'george.h@company.com',
			initials: 'GH',
			invoice: {
				number: 'INV-2024-0145',
				status: 'sent',
				amount: '$2,450.00',
				issuedDate: 'Jan 15, 2024',
				dueDate: 'Feb 15, 2024',
			},
			paymentMethod: 'Bank Transfer',
			outstandingBalance: '$2,450.00',
			isRecurring: true,
		},
		{
			id: '2',
			name: 'Helen Brooks',
			email: 'helen.b@company.com',
			initials: 'HB',
			invoice: {
				number: 'INV-2024-0144',
				status: 'paid',
				amount: '$1,890.00',
				issuedDate: 'Jan 10, 2024',
				dueDate: 'Feb 10, 2024',
				paidDate: 'Jan 25, 2024',
			},
			paymentMethod: 'Credit Card',
			outstandingBalance: '$0.00',
			isRecurring: false,
		},
		{
			id: '3',
			name: 'Isaac Newton Ltd.',
			email: 'accounts@isaacnewton.com',
			initials: 'IN',
			invoice: {
				number: 'INV-2024-0143',
				status: 'overdue',
				amount: '$5,670.00',
				issuedDate: 'Dec 20, 2023',
				dueDate: 'Jan 20, 2024',
			},
			paymentMethod: 'Wire Transfer',
			outstandingBalance: '$5,670.00',
			isRecurring: true,
		},
		{
			id: '4',
			name: 'Janet Mitchell',
			email: 'janet.m@company.com',
			initials: 'JM',
			invoice: {
				number: 'INV-2024-0142',
				status: 'draft',
				amount: '$890.00',
				issuedDate: 'Jan 18, 2024',
				dueDate: 'Feb 18, 2024',
			},
			outstandingBalance: '$0.00',
			isRecurring: false,
		},
		{
			id: '5',
			name: 'Kenneth Wright Corp.',
			email: 'billing@kwright.com',
			initials: 'KW',
			invoice: {
				number: 'INV-2024-0141',
				status: 'paid',
				amount: '$12,340.00',
				issuedDate: 'Jan 5, 2024',
				dueDate: 'Feb 5, 2024',
				paidDate: 'Jan 30, 2024',
			},
			paymentMethod: 'Bank Transfer',
			outstandingBalance: '$0.00',
			isRecurring: true,
		},
		{
			id: '6',
			name: 'Linda Foster',
			email: 'linda.f@email.com',
			initials: 'LF',
			invoice: {
				number: 'INV-2024-0140',
				status: 'sent',
				amount: '$456.00',
				issuedDate: 'Jan 12, 2024',
				dueDate: 'Feb 12, 2024',
			},
			paymentMethod: 'PayPal',
			outstandingBalance: '$456.00',
			isRecurring: false,
		},
		{
			id: '7',
			name: 'Martin Tech Inc.',
			email: 'invoices@martintech.com',
			initials: 'MT',
			invoice: {
				number: 'INV-2024-0139',
				status: 'cancelled',
				amount: '$3,200.00',
				issuedDate: 'Jan 8, 2024',
				dueDate: 'Feb 8, 2024',
			},
			outstandingBalance: '$0.00',
			isRecurring: false,
		},
		{
			id: '8',
			name: 'Nancy Chen',
			email: 'nancy.c@company.com',
			initials: 'NC',
			invoice: {
				number: 'INV-2024-0138',
				status: 'overdue',
				amount: '$780.00',
				issuedDate: 'Dec 28, 2023',
				dueDate: 'Jan 28, 2024',
			},
			paymentMethod: 'Credit Card',
			outstandingBalance: '$780.00',
			isRecurring: false,
		},
	];

	return (
		<section className="@container" data-theme="dashboard">
			<div className="mx-auto max-w-6xl space-y-6 px-4 py-8 @sm:px-6 @2xl:px-8">
				<PageHeader
					title="Customer Invoices"
					subtitle="Invoice management and billing"
				/>
				<div className="space-y-3">
					{customers.map((customer) => (
						<InvoiceListItem key={customer.id} customer={customer} />
					))}
				</div>
			</div>
		</section>
	);
}
