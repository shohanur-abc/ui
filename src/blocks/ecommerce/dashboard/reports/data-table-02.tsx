'use client';

import { Calendar, Download, Filter, RefreshCw } from 'lucide-react';

import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import {
	Card,
	CardContent,
	CardDescription,
	CardHeader,
	CardTitle,
} from '@/components/ui/card';
import { Checkbox } from '@/components/ui/checkbox';
import {
	Table,
	TableBody,
	TableCell,
	TableHead,
	TableHeader,
	TableRow,
} from '@/components/ui/table';

type TransactionItem = {
	id: string;
	customer: {
		name: string;
		email: string;
		avatar: string;
		initials: string;
	};
	type: 'purchase' | 'refund' | 'subscription';
	amount: string;
	paymentMethod: string;
	date: string;
	time: string;
};

const typeStyles = {
	purchase: 'bg-emerald-500/10 text-emerald-500',
	refund: 'bg-rose-500/10 text-rose-500',
	subscription: 'bg-blue-500/10 text-blue-500',
};

type ActionButtonProps = {
	icon: React.ElementType;
	label: string;
	variant?: 'default' | 'outline' | 'ghost';
};

const ActionButton = ({
	icon: Icon,
	label,
	variant = 'outline',
}: ActionButtonProps) => (
	<Button variant={variant} size="sm" className="gap-2">
		<Icon className="size-4" />
		<span className="hidden @sm:inline">{label}</span>
	</Button>
);

type TransactionRowProps = TransactionItem & { selected?: boolean };

const TransactionRow = ({
	id,
	customer,
	type,
	amount,
	paymentMethod,
	date,
	time,
	selected,
}: TransactionRowProps) => (
	<TableRow
		className={`group transition-colors ${selected ? 'bg-primary/5' : 'hover:bg-muted/50'}`}
	>
		<TableCell className="w-12">
			<Checkbox checked={selected} />
		</TableCell>
		<TableCell className="font-mono text-sm">{id}</TableCell>
		<TableCell>
			<div className="flex items-center gap-3">
				<Avatar className="size-8">
					<AvatarImage src={customer.avatar} alt={customer.name} />
					<AvatarFallback className="bg-primary/10 text-xs text-primary">
						{customer.initials}
					</AvatarFallback>
				</Avatar>
				<div className="min-w-0">
					<p className="truncate font-medium">{customer.name}</p>
					<p className="truncate text-xs text-muted-foreground">
						{customer.email}
					</p>
				</div>
			</div>
		</TableCell>
		<TableCell>
			<Badge variant="secondary" className={`border-0 ${typeStyles[type]}`}>
				{type.charAt(0).toUpperCase() + type.slice(1)}
			</Badge>
		</TableCell>
		<TableCell
			className={`text-right font-medium ${type === 'refund' ? 'text-rose-500' : ''}`}
		>
			{type === 'refund' ? '-' : ''}
			{amount}
		</TableCell>
		<TableCell className="text-muted-foreground">{paymentMethod}</TableCell>
		<TableCell className="text-right">
			<div className="text-sm">
				<p>{date}</p>
				<p className="text-xs text-muted-foreground">{time}</p>
			</div>
		</TableCell>
	</TableRow>
);

type HeaderActionsProps = {
	actions: ActionButtonProps[];
};

const HeaderActions = ({ actions }: HeaderActionsProps) => (
	<div className="flex items-center gap-2">
		{actions.map((action, i) => (
			<ActionButton key={i} {...action} />
		))}
	</div>
);

export default function Main() {
	const actions: ActionButtonProps[] = [
		{ icon: Filter, label: 'Filter' },
		{ icon: Calendar, label: 'Date Range' },
		{ icon: Download, label: 'Export' },
	];

	const transactions: TransactionItem[] = [
		{ id: 'TXN-9281', customer: { name: 'Sarah Mitchell', email: 's.mitchell@email.com', avatar: '', initials: 'SM' }, type: 'purchase', amount: '$284.00', paymentMethod: 'Visa •••• 4242', date: 'Jan 28, 2026', time: '2:34 PM' },
		{ id: 'TXN-9280', customer: { name: 'John Cooper', email: 'jcooper@email.com', avatar: '', initials: 'JC' }, type: 'subscription', amount: '$29.99', paymentMethod: 'Mastercard •••• 8821', date: 'Jan 28, 2026', time: '1:15 PM' },
		{ id: 'TXN-9279', customer: { name: 'Maria Santos', email: 'm.santos@email.com', avatar: '', initials: 'MS' }, type: 'refund', amount: '$89.00', paymentMethod: 'PayPal', date: 'Jan 28, 2026', time: '11:42 AM' },
		{ id: 'TXN-9278', customer: { name: 'David Kim', email: 'dkim@email.com', avatar: '', initials: 'DK' }, type: 'purchase', amount: '$459.00', paymentMethod: 'Amex •••• 3001', date: 'Jan 27, 2026', time: '5:28 PM' },
		{ id: 'TXN-9277', customer: { name: 'Lisa Wang', email: 'lwang@email.com', avatar: '', initials: 'LW' }, type: 'purchase', amount: '$124.50', paymentMethod: 'Visa •••• 7654', date: 'Jan 27, 2026', time: '3:05 PM' },
	];

	return (
		<section className="@container" data-theme="reports">
			<div className="mx-auto max-w-7xl px-4 py-8 @sm:px-6 @md:py-10 @2xl:px-8 @3xl:py-12">
				<Card className="overflow-hidden border-border/50 bg-card/80 backdrop-blur-sm">
					<CardHeader className="flex flex-col gap-4 @lg:flex-row @lg:items-center @lg:justify-between">
						<div>
							<CardTitle className="text-lg @sm:text-xl">
								Transaction Report
							</CardTitle>
							<CardDescription>
								All payment transactions with customer details
							</CardDescription>
						</div>
						<HeaderActions actions={actions} />
					</CardHeader>
					<CardContent className="p-0">
						<Table>
							<TableHeader>
								<TableRow className="border-border/50 hover:bg-transparent">
									<TableHead className="w-12">
										<Checkbox />
									</TableHead>
									<TableHead>ID</TableHead>
									<TableHead>Customer</TableHead>
									<TableHead>Type</TableHead>
									<TableHead className="text-right">Amount</TableHead>
									<TableHead>Payment</TableHead>
									<TableHead className="text-right">Date</TableHead>
								</TableRow>
							</TableHeader>
							<TableBody>
								{transactions.map((transaction) => (
									<TransactionRow key={transaction.id} {...transaction} />
								))}
							</TableBody>
						</Table>
					</CardContent>
				</Card>
			</div>
		</section>
	);
}
