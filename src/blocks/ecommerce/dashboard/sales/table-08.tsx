'use client';

import { RefreshCw, AlertTriangle, CheckCircle } from 'lucide-react';
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

type RefundData = {
	id: string;
	orderId: string;
	customer: string;
	amount: number;
	reason: string;
	requestDate: string;
	status: 'pending' | 'approved' | 'processed' | 'rejected';
	processingTime: string;
};

type RefundTableCardProps = {
	title: string;
	description: string;
	refunds: RefundData[];
	summaryStats: {
		label: string;
		value: string;
	}[];
};

const getStatusVariant = (status: RefundData['status']) => {
	switch (status) {
		case 'pending':
			return 'secondary';
		case 'approved':
			return 'outline';
		case 'processed':
			return 'default';
		case 'rejected':
			return 'destructive';
	}
};

const RefundTableCard = ({
	title,
	description,
	refunds,
	summaryStats,
}: RefundTableCardProps) => (
	<Card className="group relative overflow-hidden transition-all duration-300 hover:shadow-lg hover:shadow-primary/5 hover:border-primary/30">
		<CardHeader className="flex flex-row items-center justify-between pb-2">
			<div className="flex items-center gap-3">
				<div className="p-2 rounded-lg bg-primary/10 text-primary">
					<RefreshCw className="size-4" />
				</div>
				<div>
					<CardTitle className="text-base font-semibold">{title}</CardTitle>
					<p className="text-sm text-muted-foreground">{description}</p>
				</div>
			</div>
			<div className="hidden @lg:flex items-center gap-6">
				{summaryStats.map((stat, idx) => (
					<div key={idx} className="text-right">
						<p className="text-xs text-muted-foreground">{stat.label}</p>
						<p className="font-semibold">{stat.value}</p>
					</div>
				))}
			</div>
		</CardHeader>
		<CardContent>
			<div className="overflow-x-auto">
				<Table>
					<TableHeader>
						<TableRow>
							<TableHead>Refund ID</TableHead>
							<TableHead>Order</TableHead>
							<TableHead>Customer</TableHead>
							<TableHead className="text-right">Amount</TableHead>
							<TableHead>Reason</TableHead>
							<TableHead>Status</TableHead>
							<TableHead>Processing</TableHead>
						</TableRow>
					</TableHeader>
					<TableBody>
						{refunds.map((refund) => (
							<TableRow
								key={refund.id}
								className="hover:bg-muted/50 transition-colors"
							>
								<TableCell className="font-mono text-sm">{refund.id}</TableCell>
								<TableCell className="font-mono text-sm text-muted-foreground">
									{refund.orderId}
								</TableCell>
								<TableCell className="font-medium">{refund.customer}</TableCell>
								<TableCell className="text-right font-semibold">
									${refund.amount.toLocaleString()}
								</TableCell>
								<TableCell>
									<span className="text-sm text-muted-foreground line-clamp-1">
										{refund.reason}
									</span>
								</TableCell>
								<TableCell>
									<Badge variant={getStatusVariant(refund.status)}>
										{refund.status}
									</Badge>
								</TableCell>
								<TableCell className="text-muted-foreground">
									{refund.processingTime}
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
	const refunds: RefundData[] = [
		{
			id: 'REF-001',
			orderId: 'ORD-2820',
			customer: 'Emma Wilson',
			amount: 249,
			reason: 'Product not as described',
			requestDate: '2024-01-15',
			status: 'processed',
			processingTime: '2 days',
		},
		{
			id: 'REF-002',
			orderId: 'ORD-2815',
			customer: 'James Clark',
			amount: 89,
			reason: 'Changed mind',
			requestDate: '2024-01-15',
			status: 'pending',
			processingTime: 'In review',
		},
		{
			id: 'REF-003',
			orderId: 'ORD-2810',
			customer: 'Sarah Miller',
			amount: 450,
			reason: 'Defective item',
			requestDate: '2024-01-14',
			status: 'approved',
			processingTime: '1 day',
		},
		{
			id: 'REF-004',
			orderId: 'ORD-2805',
			customer: 'Michael Brown',
			amount: 120,
			reason: 'Wrong size',
			requestDate: '2024-01-14',
			status: 'processed',
			processingTime: '3 days',
		},
		{
			id: 'REF-005',
			orderId: 'ORD-2800',
			customer: 'Lisa Johnson',
			amount: 65,
			reason: 'Duplicate order',
			requestDate: '2024-01-13',
			status: 'rejected',
			processingTime: 'N/A',
		},
	];

	const summaryStats = [
		{ label: 'Total Pending', value: '$89' },
		{ label: 'This Week', value: '$973' },
		{ label: 'Avg Time', value: '2.1 days' },
	];

	return (
		<section className="@container" data-theme="sales">
			<div className="mx-auto max-w-7xl px-4 @sm:px-6 @2xl:px-8 py-8 @md:py-12">
				<RefundTableCard
					title="Refund Requests"
					description="Recent refund requests and status"
					refunds={refunds}
					summaryStats={summaryStats}
				/>
			</div>
		</section>
	);
}
