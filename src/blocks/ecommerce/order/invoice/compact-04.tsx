import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { Clock, Zap } from 'lucide-react';

interface SubscriptionInfoProps {
	planName: string;
	billingCycle: string;
	nextBilling: string;
	status: string;
}

interface UsageItemProps {
	feature: string;
	used: number;
	limit: number;
	unit: string;
}

interface BillingTotalsProps {
	planCost: number;
	overage: number;
	credits: number;
	total: number;
	currency: string;
}

const SubscriptionHeader = ({
	planName,
	billingCycle,
	nextBilling,
	status,
}: SubscriptionInfoProps) => (
	<div className="flex items-center justify-between">
		<div className="flex items-center gap-2">
			<Zap className="size-4 text-primary" />
			<div>
				<p className="font-bold text-sm">{planName}</p>
				<p className="text-[10px] text-muted-foreground">{billingCycle}</p>
			</div>
		</div>
		<Badge variant="default" className="text-[10px]">
			{status}
		</Badge>
	</div>
);

const UsageMetrics = ({ items }: { items: UsageItemProps[] }) => (
	<div className="space-y-2">
		{items.map((item, index) => (
			<div key={index} className="space-y-1">
				<div className="flex justify-between text-xs">
					<span className="text-muted-foreground">{item.feature}</span>
					<span className="font-medium">
						{item.used}/{item.limit} {item.unit}
					</span>
				</div>
				<div className="h-1.5 rounded-full bg-muted overflow-hidden">
					<div
						className={`h-full rounded-full ${item.used > item.limit ? 'bg-red-500' : 'bg-primary'}`}
						style={{
							width: `${Math.min((item.used / item.limit) * 100, 100)}%`,
						}}
					/>
				</div>
			</div>
		))}
	</div>
);

const BillingTotals = ({
	planCost,
	overage,
	credits,
	total,
	currency,
}: BillingTotalsProps) => (
	<div className="text-xs space-y-1">
		<div className="flex justify-between">
			<span className="text-muted-foreground">Plan Cost</span>
			<span>
				{currency}
				{planCost.toFixed(2)}
			</span>
		</div>
		{overage > 0 && (
			<div className="flex justify-between text-orange-500">
				<span>Overage</span>
				<span>
					+{currency}
					{overage.toFixed(2)}
				</span>
			</div>
		)}
		{credits > 0 && (
			<div className="flex justify-between text-green-600">
				<span>Credits</span>
				<span>
					-{currency}
					{credits.toFixed(2)}
				</span>
			</div>
		)}
		<Separator className="my-2" />
		<div className="flex justify-between font-bold text-sm">
			<span>Total</span>
			<span>
				{currency}
				{total.toFixed(2)}
			</span>
		</div>
	</div>
);

export default function Main() {
	const subscription: SubscriptionInfoProps = {
		planName: 'Pro Plan',
		billingCycle: 'Monthly',
		nextBilling: 'Mar 1, 2024',
		status: 'Active',
	};

	const usage: UsageItemProps[] = [
		{ feature: 'API Calls', used: 45000, limit: 50000, unit: '' },
		{ feature: 'Storage', used: 8.5, limit: 10, unit: 'GB' },
		{ feature: 'Team Members', used: 5, limit: 5, unit: '' },
	];

	const billing: BillingTotalsProps = {
		planCost: 49.0,
		overage: 0,
		credits: 5.0,
		total: 44.0,
		currency: '$',
	};

	return (
		<section className="@container">
			<div className="mx-auto max-w-xs px-4 py-6">
				<div className="rounded-lg border p-4 space-y-4">
					<SubscriptionHeader {...subscription} />
					<div className="p-2 rounded bg-muted/50 flex items-center justify-center gap-2 text-[10px] text-muted-foreground">
						<Clock className="size-3" />
						<span>Next billing: {subscription.nextBilling}</span>
					</div>
					<Separator />
					<UsageMetrics items={usage} />
					<Separator />
					<BillingTotals {...billing} />
				</div>
			</div>
		</section>
	);
}
