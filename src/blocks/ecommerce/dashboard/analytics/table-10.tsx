'use client';

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';

type Refund = {
	orderId: string;
	customer: string;
	amount: number;
	reason: string;
	status: 'approved' | 'pending' | 'rejected';
	requestDate: string;
	processedDate: string | null;
};

const RefundRow = ({ refund }: { refund: Refund }) => (
	<TableRow className="hover:bg-muted/30">
		<TableCell className="font-mono text-xs">{refund.orderId}</TableCell>
		<TableCell className="font-medium">{refund.customer}</TableCell>
		<TableCell className="text-rose-500 font-medium">-${refund.amount.toFixed(2)}</TableCell>
		<TableCell>
			<Badge variant="outline" className="text-xs font-normal">
				{refund.reason}
			</Badge>
		</TableCell>
		<TableCell>
			<Badge
				variant="outline"
				className={
					refund.status === 'approved'
						? 'text-emerald-500 border-emerald-500/30'
						: refund.status === 'pending'
							? 'text-amber-500 border-amber-500/30'
							: 'text-rose-500 border-rose-500/30'
				}
			>
				{refund.status.charAt(0).toUpperCase() + refund.status.slice(1)}
			</Badge>
		</TableCell>
		<TableCell className="text-muted-foreground text-sm">{refund.requestDate}</TableCell>
		<TableCell className="text-muted-foreground text-sm">{refund.processedDate || '—'}</TableCell>
	</TableRow>
);

const refunds: Refund[] = [
	{ orderId: 'REF-2024-001', customer: 'Sarah Johnson', amount: 149.99, reason: 'Defective', status: 'approved', requestDate: 'Jan 15', processedDate: 'Jan 17' },
	{ orderId: 'REF-2024-002', customer: 'Michael Chen', amount: 89.99, reason: 'Wrong Item', status: 'approved', requestDate: 'Jan 16', processedDate: 'Jan 18' },
	{ orderId: 'REF-2024-003', customer: 'Emily Davis', amount: 299.99, reason: 'Changed Mind', status: 'pending', requestDate: 'Jan 17', processedDate: null },
	{ orderId: 'REF-2024-004', customer: 'James Wilson', amount: 59.99, reason: 'Not as Described', status: 'pending', requestDate: 'Jan 17', processedDate: null },
	{ orderId: 'REF-2024-005', customer: 'Lisa Brown', amount: 199.99, reason: 'Late Delivery', status: 'rejected', requestDate: 'Jan 14', processedDate: 'Jan 16' },
	{ orderId: 'REF-2024-006', customer: 'David Lee', amount: 79.99, reason: 'Defective', status: 'approved', requestDate: 'Jan 13', processedDate: 'Jan 15' },
];

const totalApproved = refunds.filter((r) => r.status === 'approved').reduce((a, b) => a + b.amount, 0);
const totalPending = refunds.filter((r) => r.status === 'pending').reduce((a, b) => a + b.amount, 0);

export default function Main() {
	return (
		<section className="@container" data-theme="dashboard">
			<div className="mx-auto max-w-7xl px-4 @sm:px-6 @2xl:px-8 py-8 @md:py-12 @xl:py-16">
				<Card className="border-border/50 bg-card/80 backdrop-blur-sm">
					<CardHeader className="pb-2">
						<div className="flex items-start justify-between">
							<div>
								<CardTitle className="text-sm font-medium">Refund Requests</CardTitle>
								<p className="text-xs text-muted-foreground">Customer refund tracking</p>
							</div>
							<div className="flex gap-4 text-sm">
								<div>
									<span className="text-muted-foreground">Approved: </span>
									<span className="text-rose-500 font-medium">${totalApproved.toFixed(2)}</span>
								</div>
								<div>
									<span className="text-muted-foreground">Pending: </span>
									<span className="text-amber-500 font-medium">${totalPending.toFixed(2)}</span>
								</div>
							</div>
						</div>
					</CardHeader>
					<CardContent>
						<div className="overflow-x-auto">
							<Table>
								<TableHeader>
									<TableRow>
										<TableHead>Refund ID</TableHead>
										<TableHead>Customer</TableHead>
										<TableHead>Amount</TableHead>
										<TableHead>Reason</TableHead>
										<TableHead>Status</TableHead>
										<TableHead>Requested</TableHead>
										<TableHead>Processed</TableHead>
									</TableRow>
								</TableHeader>
								<TableBody>
									{refunds.map((refund, i) => (
										<RefundRow key={i} refund={refund} />
									))}
								</TableBody>
							</Table>
						</div>
					</CardContent>
				</Card>
			</div>
		</section>
	);
}
