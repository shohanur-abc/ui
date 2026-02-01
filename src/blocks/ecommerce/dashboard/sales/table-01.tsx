'use client';

import { Receipt } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
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
	customer: string;
	email: string;
	amount: number;
	status: 'completed' | 'pending' | 'failed' | 'refunded';
	date: string;
	paymentMethod: string;
};

type TransactionTableCardProps = {
	title: string;
	description: string;
	transactions: Transaction[];
};

const getStatusVariant = (status: Transaction['status']) => {
	switch (status) {
		case 'completed':
			return 'default';
		case 'pending':
			return 'secondary';
		case 'failed':
			return 'destructive';
		case 'refunded':
			return 'outline';
	}
};

const TransactionTableCard = ({
	title,
	description,
	transactions,
}: TransactionTableCardProps) => (
	<Card className="group relative overflow-hidden transition-all duration-300 hover:shadow-lg hover:shadow-primary/5 hover:border-primary/30">
		<CardHeader className="flex flex-row items-center gap-3 pb-2">
			<div className="p-2 rounded-lg bg-primary/10 text-primary">
				<Receipt className="size-4" />
			</div>
			<div>
				<CardTitle className="text-base font-semibold">{title}</CardTitle>
				<p className="text-sm text-muted-foreground">{description}</p>
			</div>
		</CardHeader>
		<CardContent>
			<div className="overflow-x-auto">
				<Table>
					<TableHeader>
						<TableRow>
							<TableHead>Order ID</TableHead>
							<TableHead>Customer</TableHead>
							<TableHead>Amount</TableHead>
							<TableHead>Status</TableHead>
							<TableHead>Payment</TableHead>
							<TableHead>Date</TableHead>
						</TableRow>
					</TableHeader>
					<TableBody>
						{transactions.map((tx) => (
							<TableRow
								key={tx.id}
								className="hover:bg-muted/50 transition-colors"
							>
								<TableCell className="font-mono text-sm">{tx.id}</TableCell>
								<TableCell>
									<div>
										<p className="font-medium">{tx.customer}</p>
										<p className="text-xs text-muted-foreground">{tx.email}</p>
									</div>
								</TableCell>
								<TableCell className="font-semibold">
									${tx.amount.toLocaleString()}
								</TableCell>
								<TableCell>
									<Badge variant={getStatusVariant(tx.status)}>
										{tx.status}
									</Badge>
								</TableCell>
								<TableCell className="text-muted-foreground">
									{tx.paymentMethod}
								</TableCell>
								<TableCell className="text-muted-foreground">
									{tx.date}
								</TableCell>
							</TableRow>
						))}
					</TableBody>
				</Table>
			</div>
		</CardContent>
	</Card>
);

export default function Main() {
	const transactions: Transaction[] = [
		{
			id: 'ORD-001',
			customer: 'Alice Johnson',
			email: 'alice@example.com',
			amount: 1250,
			status: 'completed',
			date: '2024-01-15',
			paymentMethod: 'Credit Card',
		},
		{
			id: 'ORD-002',
			customer: 'Bob Smith',
			email: 'bob@example.com',
			amount: 890,
			status: 'pending',
			date: '2024-01-15',
			paymentMethod: 'PayPal',
		},
		{
			id: 'ORD-003',
			customer: 'Carol White',
			email: 'carol@example.com',
			amount: 2100,
			status: 'completed',
			date: '2024-01-14',
			paymentMethod: 'Credit Card',
		},
		{
			id: 'ORD-004',
			customer: 'David Brown',
			email: 'david@example.com',
			amount: 450,
			status: 'failed',
			date: '2024-01-14',
			paymentMethod: 'Debit Card',
		},
		{
			id: 'ORD-005',
			customer: 'Emma Davis',
			email: 'emma@example.com',
			amount: 1680,
			status: 'refunded',
			date: '2024-01-13',
			paymentMethod: 'Credit Card',
		},
	];

	return (
		<section className="@container" data-theme="sales">
			<div className="mx-auto max-w-7xl px-4 @sm:px-6 @2xl:px-8 py-8 @md:py-12">
				<TransactionTableCard
					title="Recent Transactions"
					description="Latest orders and payments"
					transactions={transactions}
				/>
			</div>
		</section>
	);
}
