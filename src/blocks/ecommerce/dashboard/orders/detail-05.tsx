import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle, CardFooter } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import { CreditCard, DollarSign, Receipt, AlertTriangle, CheckCircle, Clock, ArrowDownLeft, ArrowUpRight, RefreshCw, Download, ExternalLink } from 'lucide-react';

interface PaymentDetailProps {
	payment: {
		transactionId: string;
		orderId: string;
		method: { type: 'card' | 'paypal' | 'bank'; brand?: string; last4?: string; email?: string };
		status: 'completed' | 'pending' | 'failed' | 'refunded';
		amounts: { subtotal: string; shipping: string; tax: string; discount?: string; total: string };
		refunds?: { id: string; amount: string; date: string; reason: string }[];
		timestamps: { created: string; processed?: string };
		billing: { name: string; address: string };
		securityChecks: { avs: boolean; cvv: boolean; threeDSecure: boolean };
	};
	labels: {
		transaction: string;
		method: string;
		amount: string;
		billing: string;
		security: string;
		refunds: string;
		refund: string;
		receipt: string;
	};
}

const StatusBadge = ({ status }: { status: PaymentDetailProps['payment']['status'] }) => {
	const config = {
		completed: { icon: CheckCircle, className: 'bg-accent/10 text-accent border-accent/30', label: 'Completed' },
		pending: { icon: Clock, className: 'bg-yellow-500/10 text-yellow-600 border-yellow-500/30', label: 'Pending' },
		failed: { icon: AlertTriangle, className: 'bg-destructive/10 text-destructive border-destructive/30', label: 'Failed' },
		refunded: { icon: RefreshCw, className: 'bg-blue-500/10 text-blue-500 border-blue-500/30', label: 'Refunded' },
	};
	const { icon: Icon, className, label } = config[status];
	return (
		<Badge variant="outline" className={`gap-1 ${className}`}>
			<Icon className="size-3" />
			{label}
		</Badge>
	);
};

const SecurityCheck = ({ label, passed }: { label: string; passed: boolean }) => (
	<div className="flex items-center gap-2">
		{passed ? (
			<CheckCircle className="size-4 text-accent" />
		) : (
			<AlertTriangle className="size-4 text-destructive" />
		)}
		<span className="text-sm">{label}</span>
	</div>
);

const PaymentDetail = ({ payment, labels }: PaymentDetailProps) => (
	<Card className="border-border/50 bg-card/50 backdrop-blur-sm">
		<CardHeader className="pb-4">
			<div className="flex items-start justify-between">
				<div>
					<CardTitle className="text-lg flex items-center gap-2">
						<Receipt className="size-5" />
						Payment Details
					</CardTitle>
					<p className="text-sm text-muted-foreground font-mono mt-1">{payment.transactionId}</p>
				</div>
				<StatusBadge status={payment.status} />
			</div>
		</CardHeader>

		<CardContent className="space-y-6">
			<div className="grid grid-cols-2 gap-4">
				<div className="p-4 rounded-xl bg-muted/20 border border-border/50">
					<p className="text-sm text-muted-foreground mb-2">{labels.method}</p>
					<div className="flex items-center gap-3">
						<div className="size-10 rounded-lg bg-primary/10 flex items-center justify-center">
							<CreditCard className="size-5 text-primary" />
						</div>
						<div>
							<p className="font-medium">{payment.method.brand} •••• {payment.method.last4}</p>
							<p className="text-xs text-muted-foreground">Processed {payment.timestamps.processed}</p>
						</div>
					</div>
				</div>

				<div className="p-4 rounded-xl bg-muted/20 border border-border/50">
					<p className="text-sm text-muted-foreground mb-2">{labels.billing}</p>
					<p className="font-medium">{payment.billing.name}</p>
					<p className="text-sm text-muted-foreground">{payment.billing.address}</p>
				</div>
			</div>

			<div className="p-4 rounded-xl bg-muted/20 border border-border/50">
				<p className="text-sm text-muted-foreground mb-3">{labels.amount}</p>
				<div className="space-y-2">
					<div className="flex justify-between text-sm">
						<span>Subtotal</span>
						<span>{payment.amounts.subtotal}</span>
					</div>
					<div className="flex justify-between text-sm">
						<span>Shipping</span>
						<span>{payment.amounts.shipping}</span>
					</div>
					<div className="flex justify-between text-sm">
						<span>Tax</span>
						<span>{payment.amounts.tax}</span>
					</div>
					{payment.amounts.discount && (
						<div className="flex justify-between text-sm text-accent">
							<span>Discount</span>
							<span>-{payment.amounts.discount}</span>
						</div>
					)}
					<Separator />
					<div className="flex justify-between text-lg font-bold">
						<span>Total</span>
						<span className="text-accent">{payment.amounts.total}</span>
					</div>
				</div>
			</div>

			<div className="p-4 rounded-xl bg-muted/20 border border-border/50">
				<p className="text-sm text-muted-foreground mb-3">{labels.security}</p>
				<div className="flex items-center gap-6">
					<SecurityCheck label="AVS Match" passed={payment.securityChecks.avs} />
					<SecurityCheck label="CVV Check" passed={payment.securityChecks.cvv} />
					<SecurityCheck label="3D Secure" passed={payment.securityChecks.threeDSecure} />
				</div>
			</div>

			{payment.refunds && payment.refunds.length > 0 && (
				<div className="p-4 rounded-xl bg-blue-500/5 border border-blue-500/20">
					<p className="text-sm text-muted-foreground mb-3">{labels.refunds}</p>
					<div className="space-y-3">
						{payment.refunds.map((refund) => (
							<div key={refund.id} className="flex items-center justify-between p-3 rounded-lg bg-background/50">
								<div className="flex items-center gap-3">
									<ArrowUpRight className="size-5 text-blue-500" />
									<div>
										<p className="font-medium">{refund.amount}</p>
										<p className="text-xs text-muted-foreground">{refund.reason}</p>
									</div>
								</div>
								<span className="text-sm text-muted-foreground">{refund.date}</span>
							</div>
						))}
					</div>
				</div>
			)}
		</CardContent>

		<CardFooter className="gap-3 border-t border-border/50">
			<Button variant="outline" className="flex-1 gap-1.5">
				<Download className="size-4" />
				{labels.receipt}
			</Button>
			<Button className="flex-1 gap-1.5">
				<RefreshCw className="size-4" />
				{labels.refund}
			</Button>
		</CardFooter>
	</Card>
);

export default function Main() {
	const labels = {
		transaction: 'Transaction',
		method: 'Payment Method',
		amount: 'Amount Breakdown',
		billing: 'Billing Address',
		security: 'Security Checks',
		refunds: 'Refund History',
		refund: 'Issue Refund',
		receipt: 'Download Receipt',
	};

	const payment = {
		transactionId: 'TXN-2024-001-ABCD',
		orderId: 'ORD-2024-001',
		method: { type: 'card' as const, brand: 'Visa', last4: '4242' },
		status: 'completed' as const,
		amounts: { subtotal: '$183.99', shipping: '$9.99', tax: '$15.52', discount: '$20.00', total: '$189.50' },
		refunds: [
			{ id: 'REF-001', amount: '$24.99', date: 'Jan 30, 2024', reason: 'Partial refund - damaged item' },
		],
		timestamps: { created: 'Jan 26, 2024 9:00 PM', processed: 'Jan 26, 2024 9:02 PM' },
		billing: { name: 'John Smith', address: '123 Main St, New York, NY 10001' },
		securityChecks: { avs: true, cvv: true, threeDSecure: true },
	};

	return (
		<section className="@container" data-theme="orders">
			<div className="mx-auto max-w-2xl px-4 @sm:px-6 @2xl:px-8 py-8 @md:py-10 @xl:py-12">
				<PaymentDetail payment={payment} labels={labels} />
			</div>
		</section>
	);
}
