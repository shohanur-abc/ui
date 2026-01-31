import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import { ArrowDownLeft, Check, CreditCard, RefreshCcw } from 'lucide-react';

interface RefundHeaderProps {
	refundId: string;
	originalOrderId: string;
	refundDate: string;
	status: string;
}

interface RefundItemProps {
	name: string;
	reason: string;
	quantity: number;
	refundAmount: number;
	currency: string;
}

interface RefundSummaryProps {
	itemsRefund: number;
	shippingRefund: number;
	taxRefund: number;
	totalRefund: number;
	currency: string;
	refundMethod: string;
}

const RefundHeader = ({
	refundId,
	originalOrderId,
	refundDate,
	status,
}: RefundHeaderProps) => (
	<div className="space-y-4">
		<div className="flex items-center gap-3">
			<div className="size-10 rounded-full bg-green-500/10 flex items-center justify-center">
				<ArrowDownLeft className="size-5 text-green-500" />
			</div>
			<div>
				<p className="text-lg font-bold">Refund Processed</p>
				<p className="text-sm text-muted-foreground">{refundId}</p>
			</div>
		</div>
		<div className="flex items-center justify-between text-sm">
			<span className="text-muted-foreground">
				Original Order: {originalOrderId}
			</span>
			<Badge variant="default" className="gap-1">
				<Check className="size-3" />
				{status}
			</Badge>
		</div>
		<p className="text-sm text-muted-foreground">Processed on {refundDate}</p>
	</div>
);

const RefundItem = ({
	name,
	reason,
	quantity,
	refundAmount,
	currency,
}: RefundItemProps) => (
	<div className="flex justify-between py-3">
		<div>
			<p className="font-medium">{name}</p>
			<p className="text-sm text-muted-foreground">
				{reason} × {quantity}
			</p>
		</div>
		<p className="font-medium text-green-600">
			+{currency}
			{refundAmount.toFixed(2)}
		</p>
	</div>
);

const RefundSummary = ({
	itemsRefund,
	shippingRefund,
	taxRefund,
	totalRefund,
	currency,
	refundMethod,
}: RefundSummaryProps) => (
	<div className="space-y-3">
		<div className="space-y-2 text-sm">
			<div className="flex justify-between">
				<span className="text-muted-foreground">Items Refund</span>
				<span className="text-green-600">
					+{currency}
					{itemsRefund.toFixed(2)}
				</span>
			</div>
			{shippingRefund > 0 && (
				<div className="flex justify-between">
					<span className="text-muted-foreground">Shipping Refund</span>
					<span className="text-green-600">
						+{currency}
						{shippingRefund.toFixed(2)}
					</span>
				</div>
			)}
			<div className="flex justify-between">
				<span className="text-muted-foreground">Tax Refund</span>
				<span className="text-green-600">
					+{currency}
					{taxRefund.toFixed(2)}
				</span>
			</div>
		</div>
		<Separator />
		<div className="flex justify-between font-bold text-lg">
			<span>Total Refund</span>
			<span className="text-green-600">
				+{currency}
				{totalRefund.toFixed(2)}
			</span>
		</div>
		<div className="flex items-center gap-2 text-sm text-muted-foreground pt-2">
			<CreditCard className="size-4" />
			<span>Refunded to: {refundMethod}</span>
		</div>
	</div>
);

export default function Main() {
	const header: RefundHeaderProps = {
		refundId: 'REF-2024-1234',
		originalOrderId: '#ORD-5678',
		refundDate: 'February 20, 2024',
		status: 'Complete',
	};

	const items: RefundItemProps[] = [
		{
			name: 'Wireless Headphones',
			reason: 'Defective item',
			quantity: 1,
			refundAmount: 149.0,
			currency: '$',
		},
	];

	const summary: RefundSummaryProps = {
		itemsRefund: 149.0,
		shippingRefund: 0,
		taxRefund: 13.41,
		totalRefund: 162.41,
		currency: '$',
		refundMethod: 'Visa ****4521',
	};

	return (
		<section className="@container">
			<div className="mx-auto max-w-md px-4 @sm:px-6 py-8 @md:py-12">
				<div className="bg-card border rounded-lg p-6 space-y-6">
					<RefundHeader {...header} />
					<Separator />
					<div>
						<p className="text-xs font-medium text-muted-foreground uppercase tracking-wide mb-2">
							Refunded Items
						</p>
						{items.map((item, index) => (
							<RefundItem key={index} {...item} />
						))}
					</div>
					<Separator />
					<RefundSummary {...summary} />
					<div className="p-3 rounded-lg bg-muted/50 text-sm text-center text-muted-foreground">
						Refund will appear in 3-5 business days
					</div>
					<Button variant="outline" className="w-full gap-2" size="sm">
						<RefreshCcw className="size-4" />
						View Original Order
					</Button>
				</div>
			</div>
		</section>
	);
}
