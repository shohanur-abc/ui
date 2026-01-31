import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import {
	Card,
	CardContent,
	CardFooter,
	CardHeader,
} from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import {
	Table,
	TableBody,
	TableCell,
	TableHead,
	TableHeader,
	TableRow,
} from '@/components/ui/table';
import { AlertCircle, Repeat, RotateCcw } from 'lucide-react';

interface RecurringItem {
	service: string;
	cycle: string;
	startDate: string;
	nextBilling: string;
	amount: number;
}

interface RecurringHeaderProps {
	title: string;
	subtitle: string;
	cycleLabel: string;
	cycleNumber: number;
}

interface SubscriberInfoProps {
	label: string;
	name: string;
	email: string;
	customerId: string;
	since: string;
}

interface RecurringTableProps {
	items: RecurringItem[];
	currency: string;
}

interface BillingHistoryProps {
	title: string;
	items: { date: string; amount: number; status: string }[];
	currency: string;
}

interface AutoPayInfoProps {
	enabled: boolean;
	method: string;
	last4: string;
	nextCharge: string;
}

interface RecurringSummaryProps {
	items: { label: string; value: number; isCredit?: boolean }[];
	total: { label: string; value: number };
	currency: string;
}

const RecurringHeader = ({
	title,
	subtitle,
	cycleLabel,
	cycleNumber,
}: RecurringHeaderProps) => (
	<div className="flex flex-col @md:flex-row @md:items-center @md:justify-between gap-4">
		<div className="flex items-center gap-4">
			<div className="flex size-12 items-center justify-center rounded-full bg-primary/10">
				<Repeat className="size-6 text-primary" />
			</div>
			<div>
				<h1 className="text-xl font-bold">{title}</h1>
				<p className="text-sm text-muted-foreground">{subtitle}</p>
			</div>
		</div>
		<div className="flex items-center gap-2">
			<Badge variant="secondary" className="gap-1">
				<RotateCcw className="size-3" />
				{cycleLabel} #{cycleNumber}
			</Badge>
		</div>
	</div>
);

const SubscriberInfo = ({
	label,
	name,
	email,
	customerId,
	since,
}: SubscriberInfoProps) => (
	<div className="p-4 rounded-lg border space-y-3">
		<p className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">
			{label}
		</p>
		<div className="space-y-1">
			<p className="font-semibold">{name}</p>
			<p className="text-sm text-muted-foreground">{email}</p>
			<div className="flex items-center gap-4 pt-2 text-sm">
				<span className="text-muted-foreground">
					ID: <span className="font-mono">{customerId}</span>
				</span>
				<span className="text-muted-foreground">Since: {since}</span>
			</div>
		</div>
	</div>
);

const RecurringTable = ({ items, currency }: RecurringTableProps) => (
	<div className="rounded-lg border overflow-hidden">
		<Table>
			<TableHeader>
				<TableRow className="bg-muted/30">
					<TableHead className="w-[30%]">Service</TableHead>
					<TableHead>Billing Cycle</TableHead>
					<TableHead>Started</TableHead>
					<TableHead>Next Billing</TableHead>
					<TableHead className="text-right">Amount</TableHead>
				</TableRow>
			</TableHeader>
			<TableBody>
				{items.map((item, index) => (
					<TableRow key={index}>
						<TableCell className="font-medium">{item.service}</TableCell>
						<TableCell>
							<Badge variant="outline">{item.cycle}</Badge>
						</TableCell>
						<TableCell className="text-muted-foreground">
							{item.startDate}
						</TableCell>
						<TableCell className="text-muted-foreground">
							{item.nextBilling}
						</TableCell>
						<TableCell className="text-right font-medium">
							{currency}
							{item.amount.toFixed(2)}
						</TableCell>
					</TableRow>
				))}
			</TableBody>
		</Table>
	</div>
);

const BillingHistory = ({ title, items, currency }: BillingHistoryProps) => (
	<div className="space-y-3">
		<p className="font-semibold">{title}</p>
		<div className="space-y-2">
			{items.map((item, index) => (
				<div
					key={index}
					className="flex items-center justify-between text-sm p-2 rounded hover:bg-muted/50"
				>
					<span className="text-muted-foreground">{item.date}</span>
					<div className="flex items-center gap-3">
						<span className="font-medium">
							{currency}
							{item.amount.toFixed(2)}
						</span>
						<Badge
							variant={item.status === 'Paid' ? 'default' : 'secondary'}
							className="text-xs"
						>
							{item.status}
						</Badge>
					</div>
				</div>
			))}
		</div>
	</div>
);

const AutoPayInfo = ({
	enabled,
	method,
	last4,
	nextCharge,
}: AutoPayInfoProps) => (
	<div
		className={`p-4 rounded-lg ${enabled ? 'bg-green-500/10 border border-green-500/20' : 'bg-muted/40 border'}`}
	>
		<div className="flex items-center justify-between mb-3">
			<p className="font-semibold">Auto-Pay</p>
			<Badge variant={enabled ? 'default' : 'secondary'}>
				{enabled ? 'Enabled' : 'Disabled'}
			</Badge>
		</div>
		{enabled && (
			<div className="space-y-2 text-sm">
				<div className="flex justify-between">
					<span className="text-muted-foreground">Payment Method</span>
					<span className="font-medium">
						{method} •••• {last4}
					</span>
				</div>
				<div className="flex justify-between">
					<span className="text-muted-foreground">Next Charge</span>
					<span className="font-medium">{nextCharge}</span>
				</div>
			</div>
		)}
	</div>
);

const RecurringSummary = ({
	items,
	total,
	currency,
}: RecurringSummaryProps) => (
	<div className="p-4 rounded-lg bg-muted/30 space-y-2">
		{items.map((item, index) => (
			<div
				key={index}
				className={`flex justify-between text-sm ${item.isCredit ? 'text-green-600' : ''}`}
			>
				<span className="text-muted-foreground">{item.label}</span>
				<span>
					{item.isCredit ? '-' : ''}
					{currency}
					{Math.abs(item.value).toFixed(2)}
				</span>
			</div>
		))}
		<Separator />
		<div className="flex justify-between font-bold text-lg">
			<span>{total.label}</span>
			<span className="text-primary">
				{currency}
				{total.value.toFixed(2)}
			</span>
		</div>
	</div>
);

export default function Main() {
	const headerData: RecurringHeaderProps = {
		title: 'Recurring Invoice',
		subtitle: 'INV-REC-2024-0156',
		cycleLabel: 'Billing Cycle',
		cycleNumber: 24,
	};

	const subscriberData: SubscriberInfoProps = {
		label: 'Subscriber',
		name: 'Horizon Tech Solutions',
		email: 'accounts@horizontech.io',
		customerId: 'CUS-789456',
		since: 'Feb 2022',
	};

	const recurringItems: RecurringItem[] = [
		{
			service: 'Cloud Hosting Pro',
			cycle: 'Monthly',
			startDate: 'Feb 1, 2022',
			nextBilling: 'Feb 1, 2024',
			amount: 299.0,
		},
		{
			service: 'CDN Bandwidth (1TB)',
			cycle: 'Monthly',
			startDate: 'Jun 15, 2022',
			nextBilling: 'Feb 1, 2024',
			amount: 79.0,
		},
		{
			service: 'SSL Certificate',
			cycle: 'Yearly',
			startDate: 'Feb 1, 2023',
			nextBilling: 'Feb 1, 2025',
			amount: 149.0,
		},
		{
			service: 'Email Service (100 users)',
			cycle: 'Monthly',
			startDate: 'Sep 1, 2022',
			nextBilling: 'Feb 1, 2024',
			amount: 50.0,
		},
	];

	const billingHistory = [
		{ date: 'Jan 1, 2024', amount: 428.0, status: 'Paid' },
		{ date: 'Dec 1, 2023', amount: 428.0, status: 'Paid' },
		{ date: 'Nov 1, 2023', amount: 428.0, status: 'Paid' },
	];

	const autoPayData: AutoPayInfoProps = {
		enabled: true,
		method: 'Visa',
		last4: '8421',
		nextCharge: 'February 1, 2024',
	};

	const summaryItems = [
		{ label: 'Recurring Services', value: 577.0 },
		{ label: 'Loyalty Discount (5%)', value: 28.85, isCredit: true },
		{ label: 'Tax', value: 0.0 },
	];

	const totalData = { label: 'Amount Due', value: 548.15 };

	return (
		<section className="@container">
			<div className="mx-auto max-w-4xl px-4 @sm:px-6 @2xl:px-8 py-8 @md:py-12">
				<Card>
					<CardHeader className="border-b">
						<RecurringHeader {...headerData} />
					</CardHeader>
					<CardContent className="space-y-6 pt-6">
						<SubscriberInfo {...subscriberData} />
						<RecurringTable items={recurringItems} currency="$" />
						<div className="grid @lg:grid-cols-2 gap-6">
							<div className="space-y-4">
								<BillingHistory
									title="Recent Payments"
									items={billingHistory}
									currency="$"
								/>
								<AutoPayInfo {...autoPayData} />
							</div>
							<div className="space-y-4">
								<RecurringSummary
									items={summaryItems}
									total={totalData}
									currency="$"
								/>
								<div className="flex items-start gap-2 p-3 rounded-lg bg-amber-500/10 text-amber-700 dark:text-amber-400">
									<AlertCircle className="size-4 mt-0.5 shrink-0" />
									<p className="text-sm">
										Your subscription will auto-renew. Cancel anytime from your
										account settings.
									</p>
								</div>
							</div>
						</div>
					</CardContent>
					<CardFooter className="border-t pt-6 flex flex-wrap gap-3">
						<Button>Update Payment Method</Button>
						<Button variant="outline">Manage Subscriptions</Button>
					</CardFooter>
				</Card>
			</div>
		</section>
	);
}
