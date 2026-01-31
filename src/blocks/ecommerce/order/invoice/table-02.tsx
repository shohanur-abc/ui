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
import { Download, Printer } from 'lucide-react';

interface LineItem {
	id: string;
	product: string;
	sku: string;
	quantity: number;
	rate: number;
	amount: number;
}

interface LogoProps {
	name: string;
	tagline: string;
}

interface InvoiceMetaProps {
	invoiceId: string;
	issueDate: string;
	dueDate: string;
	status: 'paid' | 'pending' | 'overdue';
}

interface PartyInfoProps {
	title: string;
	company: string;
	addressLine1: string;
	addressLine2: string;
	taxId: string;
}

interface ItemsTableProps {
	items: LineItem[];
	currency: string;
}

interface SummaryProps {
	subtotal: number;
	discount: number;
	discountLabel: string;
	shipping: number;
	tax: number;
	taxLabel: string;
	total: number;
	currency: string;
}

interface ActionsProps {
	downloadLabel: string;
	printLabel: string;
}

const Logo = ({ name, tagline }: LogoProps) => (
	<div>
		<h1 className="text-xl font-bold tracking-tight">{name}</h1>
		<p className="text-xs text-muted-foreground">{tagline}</p>
	</div>
);

const InvoiceMeta = ({
	invoiceId,
	issueDate,
	dueDate,
	status,
}: InvoiceMetaProps) => {
	const statusVariant =
		status === 'paid'
			? 'default'
			: status === 'overdue'
				? 'destructive'
				: 'secondary';
	return (
		<div className="text-right space-y-2">
			<div className="flex items-center justify-end gap-2">
				<span className="text-2xl font-bold">INVOICE</span>
				<Badge variant={statusVariant} className="uppercase">
					{status}
				</Badge>
			</div>
			<div className="text-sm space-y-1">
				<p>
					<span className="text-muted-foreground">Invoice: </span>
					{invoiceId}
				</p>
				<p>
					<span className="text-muted-foreground">Issue Date: </span>
					{issueDate}
				</p>
				<p>
					<span className="text-muted-foreground">Due Date: </span>
					{dueDate}
				</p>
			</div>
		</div>
	);
};

const PartyInfo = ({
	title,
	company,
	addressLine1,
	addressLine2,
	taxId,
}: PartyInfoProps) => (
	<div className="space-y-2">
		<p className="text-sm font-semibold text-muted-foreground">{title}</p>
		<div className="space-y-1">
			<p className="font-semibold">{company}</p>
			<p className="text-sm text-muted-foreground">{addressLine1}</p>
			<p className="text-sm text-muted-foreground">{addressLine2}</p>
			<p className="text-sm text-muted-foreground">{taxId}</p>
		</div>
	</div>
);

const ItemsTable = ({ items, currency }: ItemsTableProps) => (
	<Table>
		<TableHeader>
			<TableRow className="bg-muted/50">
				<TableHead>Item</TableHead>
				<TableHead>SKU</TableHead>
				<TableHead className="text-center">Qty</TableHead>
				<TableHead className="text-right">Rate</TableHead>
				<TableHead className="text-right">Amount</TableHead>
			</TableRow>
		</TableHeader>
		<TableBody>
			{items.map((item) => (
				<TableRow key={item.id}>
					<TableCell className="font-medium">{item.product}</TableCell>
					<TableCell className="text-muted-foreground">{item.sku}</TableCell>
					<TableCell className="text-center">{item.quantity}</TableCell>
					<TableCell className="text-right">
						{currency}
						{item.rate.toFixed(2)}
					</TableCell>
					<TableCell className="text-right font-medium">
						{currency}
						{item.amount.toFixed(2)}
					</TableCell>
				</TableRow>
			))}
		</TableBody>
	</Table>
);

const InvoiceSummary = ({
	subtotal,
	discount,
	discountLabel,
	shipping,
	tax,
	taxLabel,
	total,
	currency,
}: SummaryProps) => (
	<div className="flex flex-col @md:flex-row @md:justify-between gap-6">
		<div className="space-y-2 text-sm text-muted-foreground max-w-md">
			<p className="font-medium text-foreground">Payment Instructions</p>
			<p>Bank: First National Bank</p>
			<p>Account: 1234567890</p>
			<p>Routing: 021000021</p>
		</div>
		<div className="w-full @sm:w-72 space-y-2">
			<div className="flex justify-between text-sm">
				<span className="text-muted-foreground">Subtotal</span>
				<span>
					{currency}
					{subtotal.toFixed(2)}
				</span>
			</div>
			<div className="flex justify-between text-sm text-green-600">
				<span>{discountLabel}</span>
				<span>
					-{currency}
					{discount.toFixed(2)}
				</span>
			</div>
			<div className="flex justify-between text-sm">
				<span className="text-muted-foreground">Shipping</span>
				<span>
					{currency}
					{shipping.toFixed(2)}
				</span>
			</div>
			<div className="flex justify-between text-sm">
				<span className="text-muted-foreground">{taxLabel}</span>
				<span>
					{currency}
					{tax.toFixed(2)}
				</span>
			</div>
			<Separator />
			<div className="flex justify-between font-bold text-lg">
				<span>Total Due</span>
				<span>
					{currency}
					{total.toFixed(2)}
				</span>
			</div>
		</div>
	</div>
);

const InvoiceActions = ({ downloadLabel, printLabel }: ActionsProps) => (
	<div className="flex flex-wrap gap-3">
		<Button variant="outline" className="gap-2">
			<Download className="size-4" />
			{downloadLabel}
		</Button>
		<Button variant="outline" className="gap-2">
			<Printer className="size-4" />
			{printLabel}
		</Button>
	</div>
);

export default function Main() {
	const logo = { name: 'TechFlow Inc.', tagline: 'Enterprise Solutions' };

	const meta: InvoiceMetaProps = {
		invoiceId: 'TF-2024-0892',
		issueDate: 'January 20, 2024',
		dueDate: 'February 20, 2024',
		status: 'pending',
	};

	const seller: PartyInfoProps = {
		title: 'From',
		company: 'TechFlow Inc.',
		addressLine1: '789 Innovation Drive',
		addressLine2: 'Austin, TX 78701',
		taxId: 'Tax ID: 12-3456789',
	};

	const buyer: PartyInfoProps = {
		title: 'Bill To',
		company: 'StartUp Labs',
		addressLine1: '321 Venture Blvd',
		addressLine2: 'Seattle, WA 98101',
		taxId: 'Tax ID: 98-7654321',
	};

	const items: LineItem[] = [
		{
			id: '1',
			product: 'Enterprise License',
			sku: 'ENT-001',
			quantity: 5,
			rate: 499.0,
			amount: 2495.0,
		},
		{
			id: '2',
			product: 'Premium Support',
			sku: 'SUP-PRO',
			quantity: 1,
			rate: 1200.0,
			amount: 1200.0,
		},
		{
			id: '3',
			product: 'API Access',
			sku: 'API-UNL',
			quantity: 1,
			rate: 350.0,
			amount: 350.0,
		},
		{
			id: '4',
			product: 'Training Session',
			sku: 'TRN-4HR',
			quantity: 2,
			rate: 200.0,
			amount: 400.0,
		},
	];

	const summary: SummaryProps = {
		subtotal: 4445.0,
		discount: 444.5,
		discountLabel: 'Volume Discount (10%)',
		shipping: 0.0,
		tax: 320.04,
		taxLabel: 'Sales Tax (8%)',
		total: 4320.54,
		currency: '$',
	};

	const actions = { downloadLabel: 'Download PDF', printLabel: 'Print' };

	return (
		<section className="@container">
			<div className="mx-auto max-w-4xl px-4 @sm:px-6 @2xl:px-8 py-8 @md:py-12">
				<Card>
					<CardHeader className="border-b">
						<div className="flex flex-col @md:flex-row @md:items-start @md:justify-between gap-6">
							<Logo {...logo} />
							<InvoiceMeta {...meta} />
						</div>
					</CardHeader>
					<CardContent className="space-y-8 pt-6">
						<div className="grid @md:grid-cols-2 gap-8">
							<PartyInfo {...seller} />
							<PartyInfo {...buyer} />
						</div>
						<ItemsTable items={items} currency="$" />
						<InvoiceSummary {...summary} />
						<Separator />
						<InvoiceActions {...actions} />
					</CardContent>
				</Card>
			</div>
		</section>
	);
}
