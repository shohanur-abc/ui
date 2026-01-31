import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import { ArrowRight, Clock, Repeat } from 'lucide-react';

interface SubscriptionHeaderProps {
	productName: string;
	planName: string;
	status: string;
}

interface BillingCycleProps {
	currentPeriodStart: string;
	currentPeriodEnd: string;
	nextBillingDate: string;
}

interface ChargeItemProps {
	description: string;
	amount: number;
	currency: string;
}

interface PaymentSummaryProps {
	subtotal: number;
	discount: number;
	discountLabel: string;
	total: number;
	currency: string;
}

const SubscriptionHeader = ({
	productName,
	planName,
	status,
}: SubscriptionHeaderProps) => (
	<div className="flex items-center justify-between">
		<div className="flex items-center gap-3">
			<div className="size-12 rounded-lg bg-primary/10 flex items-center justify-center">
				<Repeat className="size-6 text-primary" />
			</div>
			<div>
				<p className="font-semibold">{productName}</p>
				<p className="text-sm text-muted-foreground">{planName}</p>
			</div>
		</div>
		<Badge variant="default">{status}</Badge>
	</div>
);

const BillingCycle = ({
	currentPeriodStart,
	currentPeriodEnd,
	nextBillingDate,
}: BillingCycleProps) => (
	<div className="p-4 rounded-lg bg-muted/50 space-y-3">
		<div className="flex items-center gap-2 text-sm">
			<Clock className="size-4 text-muted-foreground" />
			<span className="text-muted-foreground">Current Billing Period</span>
		</div>
		<div className="flex items-center gap-2 text-sm font-medium">
			<span>{currentPeriodStart}</span>
			<ArrowRight className="size-4 text-muted-foreground" />
			<span>{currentPeriodEnd}</span>
		</div>
		<p className="text-xs text-muted-foreground">
			Next billing: {nextBillingDate}
		</p>
	</div>
);

const ChargeItem = ({ description, amount, currency }: ChargeItemProps) => (
	<div className="flex justify-between py-2">
		<span className="text-muted-foreground">{description}</span>
		<span className="font-medium">
			{currency}
			{amount.toFixed(2)}
		</span>
	</div>
);

const PaymentSummary = ({
	subtotal,
	discount,
	discountLabel,
	total,
	currency,
}: PaymentSummaryProps) => (
	<div className="space-y-2">
		<div className="flex justify-between text-sm">
			<span className="text-muted-foreground">Subtotal</span>
			<span>
				{currency}
				{subtotal.toFixed(2)}
			</span>
		</div>
		{discount > 0 && (
			<div className="flex justify-between text-sm text-green-600">
				<span>{discountLabel}</span>
				<span>
					-{currency}
					{discount.toFixed(2)}
				</span>
			</div>
		)}
		<Separator />
		<div className="flex justify-between font-bold text-lg pt-1">
			<span>Total</span>
			<span className="text-primary">
				{currency}
				{total.toFixed(2)}
			</span>
		</div>
	</div>
);

export default function Main() {
	const header: SubscriptionHeaderProps = {
		productName: 'CloudSync Pro',
		planName: 'Business Plan - Monthly',
		status: 'Active',
	};

	const billing: BillingCycleProps = {
		currentPeriodStart: 'Feb 1, 2024',
		currentPeriodEnd: 'Feb 29, 2024',
		nextBillingDate: 'Mar 1, 2024',
	};

	const charges: ChargeItemProps[] = [
		{ description: 'Business Plan (Monthly)', amount: 49.0, currency: '$' },
		{ description: 'Additional Storage (50GB)', amount: 10.0, currency: '$' },
		{ description: 'Priority Support Add-on', amount: 15.0, currency: '$' },
	];

	const summary: PaymentSummaryProps = {
		subtotal: 74.0,
		discount: 7.4,
		discountLabel: 'Annual Commitment (-10%)',
		total: 66.6,
		currency: '$',
	};

	return (
		<section className="@container">
			<div className="mx-auto max-w-md px-4 @sm:px-6 py-8 @md:py-12">
				<div className="bg-card border rounded-lg p-6 space-y-6">
					<SubscriptionHeader {...header} />
					<BillingCycle {...billing} />
					<div>
						{charges.map((charge, index) => (
							<ChargeItem key={index} {...charge} />
						))}
					</div>
					<Separator />
					<PaymentSummary {...summary} />
					<div className="flex gap-3">
						<Button variant="outline" className="flex-1" size="sm">
							Manage Plan
						</Button>
						<Button className="flex-1" size="sm">
							Pay Now
						</Button>
					</div>
				</div>
			</div>
		</section>
	);
}
