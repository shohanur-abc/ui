import {
	Table,
	TableBody,
	TableCell,
	TableHead,
	TableHeader,
	TableRow,
} from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Switch } from '@/components/ui/switch';
import {
	Calendar,
	RefreshCw,
	Pause,
	Play,
	Settings,
	CreditCard,
} from 'lucide-react';

interface Subscription {
	id: string;
	customer: string;
	plan: string;
	amount: string;
	frequency: 'weekly' | 'monthly' | 'quarterly' | 'yearly';
	nextBilling: string;
	status: 'active' | 'paused' | 'cancelled';
	paymentMethod: string;
}

interface FrequencyBadgeProps {
	frequency: Subscription['frequency'];
}

interface StatusToggleProps {
	status: Subscription['status'];
	onToggle?: () => void;
}

interface ActionButtonsProps {
	status: Subscription['status'];
	labels: { pause: string; resume: string; manage: string };
}

const FrequencyBadge = ({ frequency }: FrequencyBadgeProps) => {
	const config: Record<
		Subscription['frequency'],
		{ label: string; variant: 'default' | 'secondary' | 'outline' }
	> = {
		weekly: { label: 'Weekly', variant: 'outline' },
		monthly: { label: 'Monthly', variant: 'secondary' },
		quarterly: { label: 'Quarterly', variant: 'default' },
		yearly: { label: 'Yearly', variant: 'default' },
	};
	return (
		<Badge variant={config[frequency].variant}>{config[frequency].label}</Badge>
	);
};

const StatusToggle = ({ status, onToggle }: StatusToggleProps) => (
	<div className="flex items-center gap-2">
		<Switch
			checked={status === 'active'}
			onCheckedChange={onToggle}
			disabled={status === 'cancelled'}
		/>
		<span
			className={`text-sm capitalize ${status === 'active' ? 'text-accent' : status === 'paused' ? 'text-muted-foreground' : 'text-destructive'}`}
		>
			{status}
		</span>
	</div>
);

const ActionButtons = ({ status, labels }: ActionButtonsProps) => (
	<div className="flex items-center gap-1">
		{status !== 'cancelled' && (
			<Button variant="ghost" size="icon-sm" className="hover:bg-muted">
				{status === 'active' ? (
					<Pause className="size-4" />
				) : (
					<Play className="size-4" />
				)}
			</Button>
		)}
		<Button variant="ghost" size="icon-sm" className="hover:bg-muted">
			<Settings className="size-4" />
		</Button>
	</div>
);

const PaymentCell = ({ method }: { method: string }) => (
	<div className="flex items-center gap-2 text-sm text-muted-foreground">
		<CreditCard className="size-4" />
		{method}
	</div>
);

const NextBillingCell = ({
	date,
	status,
}: {
	date: string;
	status: Subscription['status'];
}) => (
	<div className="flex items-center gap-2">
		<Calendar className="size-4 text-muted-foreground" />
		<span
			className={
				status === 'cancelled' ? 'line-through text-muted-foreground' : ''
			}
		>
			{date}
		</span>
	</div>
);

const SubscriptionRow = ({
	subscription,
	labels,
}: {
	subscription: Subscription;
	labels: ActionButtonsProps['labels'];
}) => (
	<TableRow className="hover:bg-muted/30 transition-colors">
		<TableCell className="font-mono text-sm">{subscription.id}</TableCell>
		<TableCell className="font-medium">{subscription.customer}</TableCell>
		<TableCell>{subscription.plan}</TableCell>
		<TableCell className="font-semibold">{subscription.amount}</TableCell>
		<TableCell>
			<FrequencyBadge frequency={subscription.frequency} />
		</TableCell>
		<TableCell>
			<NextBillingCell
				date={subscription.nextBilling}
				status={subscription.status}
			/>
		</TableCell>
		<TableCell>
			<PaymentCell method={subscription.paymentMethod} />
		</TableCell>
		<TableCell>
			<StatusToggle status={subscription.status} />
		</TableCell>
		<TableCell>
			<ActionButtons status={subscription.status} labels={labels} />
		</TableCell>
	</TableRow>
);

export default function Main() {
	const labels = { pause: 'Pause', resume: 'Resume', manage: 'Manage' };

	const subscriptions: Subscription[] = [
		{
			id: 'SUB-001',
			customer: 'John Smith',
			plan: 'Premium Box',
			amount: '$49.99/mo',
			frequency: 'monthly',
			nextBilling: 'Feb 1, 2026',
			status: 'active',
			paymentMethod: 'Visa •••• 4242',
		},
		{
			id: 'SUB-002',
			customer: 'Sarah Johnson',
			plan: 'Essential Pack',
			amount: '$29.99/mo',
			frequency: 'monthly',
			nextBilling: 'Feb 3, 2026',
			status: 'active',
			paymentMethod: 'PayPal',
		},
		{
			id: 'SUB-003',
			customer: 'Mike Wilson',
			plan: 'Quarterly Bundle',
			amount: '$119.99/qtr',
			frequency: 'quarterly',
			nextBilling: 'Mar 15, 2026',
			status: 'paused',
			paymentMethod: 'Mastercard •••• 5555',
		},
		{
			id: 'SUB-004',
			customer: 'Emily Brown',
			plan: 'Annual Unlimited',
			amount: '$399.99/yr',
			frequency: 'yearly',
			nextBilling: 'Jan 1, 2027',
			status: 'active',
			paymentMethod: 'Visa •••• 1234',
		},
		{
			id: 'SUB-005',
			customer: 'David Lee',
			plan: 'Weekly Fresh',
			amount: '$14.99/wk',
			frequency: 'weekly',
			nextBilling: '—',
			status: 'cancelled',
			paymentMethod: 'Amex •••• 9999',
		},
	];

	const headers = [
		'Subscription',
		'Customer',
		'Plan',
		'Amount',
		'Frequency',
		'Next Billing',
		'Payment',
		'Status',
		'Actions',
	];

	return (
		<section className="@container" data-theme="orders">
			<div className="mx-auto max-w-7xl px-4 @sm:px-6 @2xl:px-8 py-8 @md:py-10 @xl:py-12">
				<div className="flex items-center justify-between mb-6">
					<div>
						<h2 className="text-xl font-semibold">Recurring Orders</h2>
						<p className="text-sm text-muted-foreground">
							Manage subscription-based orders
						</p>
					</div>
					<Button variant="outline" size="sm" className="gap-1.5">
						<RefreshCw className="size-4" />
						Sync All
					</Button>
				</div>
				<div className="rounded-xl border border-border/50 overflow-hidden bg-card/50 backdrop-blur-sm overflow-x-auto">
					<Table>
						<TableHeader>
							<TableRow className="bg-muted/30 hover:bg-muted/30 border-border/50">
								{headers.map((header) => (
									<TableHead key={header}>{header}</TableHead>
								))}
							</TableRow>
						</TableHeader>
						<TableBody>
							{subscriptions.map((subscription) => (
								<SubscriptionRow
									key={subscription.id}
									subscription={subscription}
									labels={labels}
								/>
							))}
						</TableBody>
					</Table>
				</div>
			</div>
		</section>
	);
}
