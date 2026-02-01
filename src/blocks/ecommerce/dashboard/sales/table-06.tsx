'use client';

import {
	CreditCard,
	CheckCircle2,
	Clock,
	XCircle,
	AlertCircle,
} from 'lucide-react';
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

type PaymentData = {
	id: string;
	method: string;
	methodIcon: string;
	transactions: number;
	volume: number;
	fees: number;
	successRate: number;
	avgProcessingTime: string;
	status: 'active' | 'issues' | 'maintenance';
};

type PaymentTableCardProps = {
	title: string;
	description: string;
	payments: PaymentData[];
};

const getStatusIcon = (status: PaymentData['status']) => {
	switch (status) {
		case 'active':
			return <CheckCircle2 className="size-4 text-primary" />;
		case 'issues':
			return <AlertCircle className="size-4 text-amber-500" />;
		case 'maintenance':
			return <Clock className="size-4 text-muted-foreground" />;
	}
};

const PaymentTableCard = ({
	title,
	description,
	payments,
}: PaymentTableCardProps) => (
	<Card className="group relative overflow-hidden transition-all duration-300 hover:shadow-lg hover:shadow-primary/5 hover:border-primary/30">
		<CardHeader className="flex flex-row items-center gap-3 pb-2">
			<div className="p-2 rounded-lg bg-primary/10 text-primary">
				<CreditCard className="size-4" />
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
							<TableHead>Payment Method</TableHead>
							<TableHead className="text-right">Transactions</TableHead>
							<TableHead className="text-right">Volume</TableHead>
							<TableHead className="text-right">Fees</TableHead>
							<TableHead className="text-right">Success Rate</TableHead>
							<TableHead className="text-right">Avg Time</TableHead>
							<TableHead>Status</TableHead>
						</TableRow>
					</TableHeader>
					<TableBody>
						{payments.map((payment) => (
							<TableRow
								key={payment.id}
								className="hover:bg-muted/50 transition-colors"
							>
								<TableCell>
									<div className="flex items-center gap-3">
										<span className="text-2xl">{payment.methodIcon}</span>
										<span className="font-medium">{payment.method}</span>
									</div>
								</TableCell>
								<TableCell className="text-right">
									{payment.transactions.toLocaleString()}
								</TableCell>
								<TableCell className="text-right font-semibold">
									${payment.volume.toLocaleString()}
								</TableCell>
								<TableCell className="text-right text-muted-foreground">
									${payment.fees.toLocaleString()}
								</TableCell>
								<TableCell className="text-right">
									<span
										className={
											payment.successRate >= 98
												? 'text-primary'
												: payment.successRate >= 95
													? 'text-amber-500'
													: 'text-destructive'
										}
									>
										{payment.successRate}%
									</span>
								</TableCell>
								<TableCell className="text-right text-muted-foreground">
									{payment.avgProcessingTime}
								</TableCell>
								<TableCell>
									<div className="flex items-center gap-2">
										{getStatusIcon(payment.status)}
										<span className="text-sm capitalize">{payment.status}</span>
									</div>
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
	const payments: PaymentData[] = [
		{
			id: 'PAY-001',
			method: 'Credit Card',
			methodIcon: '💳',
			transactions: 4520,
			volume: 425000,
			fees: 12750,
			successRate: 98.5,
			avgProcessingTime: '2.3s',
			status: 'active',
		},
		{
			id: 'PAY-002',
			method: 'PayPal',
			methodIcon: '🅿️',
			transactions: 2180,
			volume: 185000,
			fees: 8325,
			successRate: 97.2,
			avgProcessingTime: '3.1s',
			status: 'active',
		},
		{
			id: 'PAY-003',
			method: 'Apple Pay',
			methodIcon: '🍎',
			transactions: 1250,
			volume: 142000,
			fees: 4260,
			successRate: 99.1,
			avgProcessingTime: '1.8s',
			status: 'active',
		},
		{
			id: 'PAY-004',
			method: 'Google Pay',
			methodIcon: '🔵',
			transactions: 890,
			volume: 98000,
			fees: 2940,
			successRate: 98.8,
			avgProcessingTime: '1.9s',
			status: 'issues',
		},
		{
			id: 'PAY-005',
			method: 'Bank Transfer',
			methodIcon: '🏦',
			transactions: 320,
			volume: 85000,
			fees: 850,
			successRate: 94.2,
			avgProcessingTime: '24h',
			status: 'active',
		},
	];

	return (
		<section className="@container" data-theme="sales">
			<div className="mx-auto max-w-7xl px-4 @sm:px-6 @2xl:px-8 py-8 @md:py-12">
				<PaymentTableCard
					title="Payment Methods"
					description="Transaction metrics by payment type"
					payments={payments}
				/>
			</div>
		</section>
	);
}
