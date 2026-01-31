import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import {
	Table,
	TableBody,
	TableCell,
	TableHead,
	TableHeader,
	TableRow,
} from '@/components/ui/table';
import { CreditCard, FileCheck, Wallet } from 'lucide-react';

interface DepositItem {
	description: string;
	type: string;
	reference: string;
	amount: number;
	received: number;
}

interface DepositHeaderProps {
	title: string;
	invoiceNumber: string;
	projectName: string;
	stage: string;
}

interface PartiesGridProps {
	items: { label: string; lines: string[] }[];
}

interface DepositTableProps {
	items: DepositItem[];
	currency: string;
}

interface PaymentProgressProps {
	totalContract: number;
	depositsReceived: number;
	remainingBalance: number;
	currency: string;
}

interface PaymentMethodsProps {
	title: string;
	methods: {
		icon: React.ComponentType<{ className?: string }>;
		name: string;
		details: string;
	}[];
}

interface DepositTermsProps {
	title: string;
	terms: string[];
}

const DepositHeader = ({
	title,
	invoiceNumber,
	projectName,
	stage,
}: DepositHeaderProps) => (
	<div className="flex flex-col @lg:flex-row @lg:items-center @lg:justify-between gap-4">
		<div>
			<div className="flex items-center gap-3 mb-2">
				<h1 className="text-2xl font-bold">{title}</h1>
				<Badge variant="secondary">{stage}</Badge>
			</div>
			<p className="text-muted-foreground">{projectName}</p>
			<p className="text-sm text-muted-foreground font-mono">{invoiceNumber}</p>
		</div>
		<div className="flex size-16 items-center justify-center rounded-xl bg-primary/10">
			<FileCheck className="size-8 text-primary" />
		</div>
	</div>
);

const PartiesGrid = ({ items }: PartiesGridProps) => (
	<div className="grid @sm:grid-cols-2 @lg:grid-cols-3 gap-4">
		{items.map((item, index) => (
			<div key={index} className="p-4 rounded-lg border space-y-2">
				<p className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">
					{item.label}
				</p>
				<div className="space-y-0.5">
					{item.lines.map((line, lIndex) => (
						<p
							key={lIndex}
							className={
								lIndex === 0 ? 'font-semibold' : 'text-sm text-muted-foreground'
							}
						>
							{line}
						</p>
					))}
				</div>
			</div>
		))}
	</div>
);

const DepositTable = ({ items, currency }: DepositTableProps) => (
	<div className="rounded-lg border overflow-hidden">
		<Table>
			<TableHeader>
				<TableRow className="bg-muted/30">
					<TableHead className="w-[30%]">Description</TableHead>
					<TableHead>Type</TableHead>
					<TableHead>Reference</TableHead>
					<TableHead className="text-right">Due</TableHead>
					<TableHead className="text-right">Received</TableHead>
					<TableHead className="text-right">Outstanding</TableHead>
				</TableRow>
			</TableHeader>
			<TableBody>
				{items.map((item, index) => (
					<TableRow key={index}>
						<TableCell className="font-medium">{item.description}</TableCell>
						<TableCell>
							<Badge variant="outline">{item.type}</Badge>
						</TableCell>
						<TableCell className="font-mono text-sm text-muted-foreground">
							{item.reference}
						</TableCell>
						<TableCell className="text-right">
							{currency}
							{item.amount.toLocaleString()}
						</TableCell>
						<TableCell className="text-right text-green-600">
							{currency}
							{item.received.toLocaleString()}
						</TableCell>
						<TableCell className="text-right font-medium">
							{currency}
							{(item.amount - item.received).toLocaleString()}
						</TableCell>
					</TableRow>
				))}
			</TableBody>
		</Table>
	</div>
);

const PaymentProgress = ({
	totalContract,
	depositsReceived,
	remainingBalance,
	currency,
}: PaymentProgressProps) => (
	<div className="p-4 rounded-lg bg-gradient-to-r from-primary/10 to-primary/5 space-y-4">
		<p className="font-semibold">Payment Progress</p>
		<div className="grid grid-cols-3 gap-4">
			<div>
				<p className="text-xs text-muted-foreground">Contract Value</p>
				<p className="text-xl font-bold">
					{currency}
					{totalContract.toLocaleString()}
				</p>
			</div>
			<div>
				<p className="text-xs text-muted-foreground">Deposits Received</p>
				<p className="text-xl font-bold text-green-600">
					{currency}
					{depositsReceived.toLocaleString()}
				</p>
			</div>
			<div>
				<p className="text-xs text-muted-foreground">Remaining</p>
				<p className="text-xl font-bold text-primary">
					{currency}
					{remainingBalance.toLocaleString()}
				</p>
			</div>
		</div>
		<div className="h-2 bg-muted rounded-full overflow-hidden">
			<div
				className="h-full bg-green-500 rounded-full transition-all"
				style={{ width: `${(depositsReceived / totalContract) * 100}%` }}
			/>
		</div>
		<p className="text-sm text-muted-foreground text-center">
			{((depositsReceived / totalContract) * 100).toFixed(0)}% of contract value
			received
		</p>
	</div>
);

const PaymentMethods = ({ title, methods }: PaymentMethodsProps) => (
	<div className="p-4 rounded-lg border space-y-3">
		<p className="font-semibold">{title}</p>
		<div className="space-y-2">
			{methods.map((method, index) => (
				<div
					key={index}
					className="flex items-center gap-3 p-2 rounded hover:bg-muted/50"
				>
					<method.icon className="size-5 text-muted-foreground" />
					<div>
						<p className="font-medium text-sm">{method.name}</p>
						<p className="text-xs text-muted-foreground">{method.details}</p>
					</div>
				</div>
			))}
		</div>
	</div>
);

const DepositTerms = ({ title, terms }: DepositTermsProps) => (
	<div className="space-y-2">
		<p className="font-semibold text-sm">{title}</p>
		<ul className="text-sm text-muted-foreground space-y-1">
			{terms.map((term, index) => (
				<li key={index}>• {term}</li>
			))}
		</ul>
	</div>
);

export default function Main() {
	const headerData: DepositHeaderProps = {
		title: 'Deposit Invoice',
		invoiceNumber: 'DEP-2024-0045',
		projectName: 'Custom Software Development',
		stage: 'Phase 2 Deposit',
	};

	const parties = [
		{
			label: 'Service Provider',
			lines: [
				'CodeCraft Solutions',
				'500 Developer Lane',
				'San Jose, CA 95110',
				'Tax ID: 94-1234567',
			],
		},
		{
			label: 'Client',
			lines: [
				'Retail Dynamics Inc.',
				'800 Commerce Blvd',
				'Chicago, IL 60601',
				'PO: RD-2024-156',
			],
		},
		{
			label: 'Project Details',
			lines: [
				'E-commerce Platform',
				'Contract: SC-2024-089',
				'Start: Jan 2024',
				'Est. Completion: Jun 2024',
			],
		},
	];

	const depositItems: DepositItem[] = [
		{
			description: 'Initial Deposit (20%)',
			type: 'Milestone',
			reference: 'DEP-001',
			amount: 15000,
			received: 15000,
		},
		{
			description: 'Phase 1 Completion (25%)',
			type: 'Milestone',
			reference: 'DEP-002',
			amount: 18750,
			received: 18750,
		},
		{
			description: 'Phase 2 Start (25%)',
			type: 'Milestone',
			reference: 'DEP-003',
			amount: 18750,
			received: 0,
		},
	];

	const progressData: PaymentProgressProps = {
		totalContract: 75000,
		depositsReceived: 33750,
		remainingBalance: 41250,
		currency: '$',
	};

	const paymentMethods = [
		{
			icon: CreditCard,
			name: 'Credit Card',
			details: 'Visa, Mastercard, Amex accepted',
		},
		{ icon: Wallet, name: 'Bank Transfer', details: 'ACH or Wire transfer' },
	];

	const termsData: DepositTermsProps = {
		title: 'Deposit Terms',
		terms: [
			'Deposits are non-refundable after work commences',
			'Payment due within 7 days of invoice date',
			'Late payments subject to 1.5% monthly fee',
			'Final payment due upon project completion',
		],
	};

	return (
		<section className="@container">
			<div className="mx-auto max-w-5xl px-4 @sm:px-6 @2xl:px-8 py-8 @md:py-12">
				<Card>
					<CardHeader className="border-b">
						<DepositHeader {...headerData} />
					</CardHeader>
					<CardContent className="space-y-6 pt-6">
						<PartiesGrid items={parties} />
						<DepositTable items={depositItems} currency="$" />
						<PaymentProgress {...progressData} />
						<Separator />
						<div className="grid @lg:grid-cols-2 gap-6">
							<PaymentMethods
								title="Accepted Payment Methods"
								methods={paymentMethods}
							/>
							<DepositTerms {...termsData} />
						</div>
						<div className="flex flex-wrap gap-3 pt-4">
							<Button size="lg">Pay Current Deposit</Button>
							<Button variant="outline">Download PDF</Button>
							<Button variant="ghost">Contact Support</Button>
						</div>
					</CardContent>
				</Card>
			</div>
		</section>
	);
}
