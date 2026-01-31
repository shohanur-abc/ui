import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
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
import { ArrowLeft, Download, MoreHorizontal, Send } from 'lucide-react';

interface Subscription {
	name: string;
	description: string;
	period: string;
	unitCost: number;
	quantity: number;
}

interface BrandHeaderProps {
	logoSrc: string;
	logoFallback: string;
	companyName: string;
	invoiceLabel: string;
	invoiceNumber: string;
}

interface ActionBarProps {
	backLabel: string;
	actions: {
		icon: React.ComponentType<{ className?: string }>;
		label: string;
	}[];
}

interface BillingPeriodProps {
	label: string;
	period: string;
	status: string;
	statusVariant: 'default' | 'secondary' | 'destructive' | 'outline';
}

interface AccountInfoProps {
	label: string;
	accountName: string;
	accountId: string;
	email: string;
}

interface SubscriptionTableProps {
	items: Subscription[];
	currency: string;
}

interface CostBreakdownProps {
	items: { label: string; amount: number; isCredit?: boolean }[];
	total: { label: string; amount: number };
	currency: string;
}

interface InvoiceNoticeProps {
	title: string;
	message: string;
}

const BrandHeader = ({
	logoSrc,
	logoFallback,
	companyName,
	invoiceLabel,
	invoiceNumber,
}: BrandHeaderProps) => (
	<div className="flex items-center justify-between">
		<div className="flex items-center gap-3">
			<Avatar className="size-10">
				<AvatarImage src={logoSrc} alt={companyName} />
				<AvatarFallback>{logoFallback}</AvatarFallback>
			</Avatar>
			<div>
				<p className="font-semibold">{companyName}</p>
				<p className="text-xs text-muted-foreground">{invoiceLabel}</p>
			</div>
		</div>
		<p className="text-lg font-mono font-semibold">{invoiceNumber}</p>
	</div>
);

const ActionBar = ({ backLabel, actions }: ActionBarProps) => (
	<div className="flex items-center justify-between">
		<Button variant="ghost" size="sm" className="gap-2">
			<ArrowLeft className="size-4" />
			{backLabel}
		</Button>
		<div className="flex gap-2">
			{actions.map((action, index) => (
				<Button key={index} variant="outline" size="sm" className="gap-2">
					<action.icon className="size-4" />
					<span className="hidden @sm:inline">{action.label}</span>
				</Button>
			))}
			<Button variant="ghost" size="icon-sm">
				<MoreHorizontal className="size-4" />
			</Button>
		</div>
	</div>
);

const BillingPeriod = ({
	label,
	period,
	status,
	statusVariant,
}: BillingPeriodProps) => (
	<div className="flex flex-col @sm:flex-row @sm:items-center @sm:justify-between gap-2 p-4 rounded-lg bg-muted/40">
		<div>
			<p className="text-sm text-muted-foreground">{label}</p>
			<p className="font-semibold">{period}</p>
		</div>
		<Badge variant={statusVariant}>{status}</Badge>
	</div>
);

const AccountInfo = ({
	label,
	accountName,
	accountId,
	email,
}: AccountInfoProps) => (
	<div className="space-y-1">
		<p className="text-xs font-medium text-muted-foreground uppercase tracking-wider">
			{label}
		</p>
		<p className="font-semibold">{accountName}</p>
		<p className="text-sm text-muted-foreground">Account: {accountId}</p>
		<p className="text-sm text-muted-foreground">{email}</p>
	</div>
);

const SubscriptionTable = ({ items, currency }: SubscriptionTableProps) => (
	<div className="rounded-lg border overflow-hidden">
		<Table>
			<TableHeader>
				<TableRow className="bg-muted/50">
					<TableHead>Subscription</TableHead>
					<TableHead>Period</TableHead>
					<TableHead className="text-right">Unit Cost</TableHead>
					<TableHead className="text-center">Qty</TableHead>
					<TableHead className="text-right">Amount</TableHead>
				</TableRow>
			</TableHeader>
			<TableBody>
				{items.map((item, index) => (
					<TableRow key={index}>
						<TableCell>
							<div>
								<p className="font-medium">{item.name}</p>
								<p className="text-xs text-muted-foreground">
									{item.description}
								</p>
							</div>
						</TableCell>
						<TableCell className="text-sm text-muted-foreground">
							{item.period}
						</TableCell>
						<TableCell className="text-right">
							{currency}
							{item.unitCost.toFixed(2)}
						</TableCell>
						<TableCell className="text-center">{item.quantity}</TableCell>
						<TableCell className="text-right font-medium">
							{currency}
							{(item.unitCost * item.quantity).toFixed(2)}
						</TableCell>
					</TableRow>
				))}
			</TableBody>
		</Table>
	</div>
);

const CostBreakdown = ({ items, total, currency }: CostBreakdownProps) => (
	<div className="w-full @md:w-80 ml-auto space-y-2">
		{items.map((item, index) => (
			<div
				key={index}
				className={`flex justify-between text-sm ${item.isCredit ? 'text-green-600' : ''}`}
			>
				<span className="text-muted-foreground">{item.label}</span>
				<span>
					{item.isCredit ? '-' : ''}
					{currency}
					{Math.abs(item.amount).toFixed(2)}
				</span>
			</div>
		))}
		<Separator />
		<div className="flex justify-between text-lg font-bold">
			<span>{total.label}</span>
			<span>
				{currency}
				{total.amount.toFixed(2)}
			</span>
		</div>
	</div>
);

const InvoiceNotice = ({ title, message }: InvoiceNoticeProps) => (
	<div className="p-4 rounded-lg border-l-4 border-l-primary bg-primary/5">
		<p className="font-medium">{title}</p>
		<p className="text-sm text-muted-foreground mt-1">{message}</p>
	</div>
);

export default function Main() {
	const brandData: BrandHeaderProps = {
		logoSrc: '',
		logoFallback: 'CL',
		companyName: 'CloudSync Platform',
		invoiceLabel: 'Monthly Invoice',
		invoiceNumber: '#CS-2024-0156',
	};

	const actionButtons = [
		{ icon: Download, label: 'Download' },
		{ icon: Send, label: 'Send' },
	];

	const billingData: BillingPeriodProps = {
		label: 'Billing Period',
		period: 'January 1 - January 31, 2024',
		status: 'Auto-Pay Enabled',
		statusVariant: 'secondary',
	};

	const accountData: AccountInfoProps = {
		label: 'Billed To',
		accountName: 'DataFlow Analytics',
		accountId: 'ACC-892145',
		email: 'billing@dataflow.io',
	};

	const subscriptions: Subscription[] = [
		{
			name: 'Enterprise Plan',
			description: 'Unlimited users, 10TB storage',
			period: 'Monthly',
			unitCost: 499.0,
			quantity: 1,
		},
		{
			name: 'Premium Support',
			description: '24/7 priority support',
			period: 'Monthly',
			unitCost: 149.0,
			quantity: 1,
		},
		{
			name: 'API Requests',
			description: 'Additional 1M requests',
			period: 'Usage',
			unitCost: 50.0,
			quantity: 3,
		},
		{
			name: 'Data Backup',
			description: 'Daily encrypted backups',
			period: 'Monthly',
			unitCost: 29.0,
			quantity: 1,
		},
	];

	const costItems = [
		{ label: 'Subtotal', amount: 827.0 },
		{ label: 'Credits Applied', amount: 50.0, isCredit: true },
		{ label: 'Tax (0%)', amount: 0.0 },
	];

	const totalData = { label: 'Amount Due', amount: 777.0 };

	const noticeData: InvoiceNoticeProps = {
		title: 'Payment will be processed automatically',
		message:
			'This invoice will be charged to your Visa ending in 4242 on February 1, 2024.',
	};

	return (
		<section className="@container">
			<div className="mx-auto max-w-4xl px-4 @sm:px-6 @2xl:px-8 py-8 @md:py-12 space-y-4">
				<ActionBar backLabel="Back to Invoices" actions={actionButtons} />
				<Card>
					<CardHeader className="border-b space-y-4">
						<BrandHeader {...brandData} />
						<BillingPeriod {...billingData} />
					</CardHeader>
					<CardContent className="space-y-6 pt-6">
						<AccountInfo {...accountData} />
						<SubscriptionTable items={subscriptions} currency="$" />
						<CostBreakdown items={costItems} total={totalData} currency="$" />
					</CardContent>
					<CardFooter className="border-t pt-6">
						<InvoiceNotice {...noticeData} />
					</CardFooter>
				</Card>
			</div>
		</section>
	);
}
