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
import { CheckCircle2, Copy, ExternalLink } from 'lucide-react';

interface OrderItem {
	name: string;
	variant: string;
	sku: string;
	quantity: number;
	price: number;
}

interface StatusBadgeProps {
	status: string;
	variant: 'default' | 'secondary' | 'destructive' | 'outline';
}

interface InvoiceTitleProps {
	title: string;
	invoiceNumber: string;
	status: StatusBadgeProps;
}

interface MetadataGridProps {
	items: { label: string; value: string }[];
}

interface PartyCardProps {
	heading: string;
	lines: string[];
}

interface OrderTableProps {
	items: OrderItem[];
	currency: string;
}

interface BreakdownRowProps {
	label: string;
	value: string;
	isBold?: boolean;
	isLarge?: boolean;
	isHighlight?: boolean;
}

interface PaymentMethodProps {
	method: string;
	last4: string;
	transactionId: string;
	paidAt: string;
}

const InvoiceTitle = ({ title, invoiceNumber, status }: InvoiceTitleProps) => (
	<div className="flex flex-col @sm:flex-row @sm:items-center gap-3">
		<div>
			<h1 className="text-2xl font-bold">{title}</h1>
			<p className="text-sm text-muted-foreground font-mono">{invoiceNumber}</p>
		</div>
		<Badge variant={status.variant} className="w-fit @sm:ml-auto">
			<CheckCircle2 className="size-3 mr-1" />
			{status.status}
		</Badge>
	</div>
);

const MetadataGrid = ({ items }: MetadataGridProps) => (
	<div className="grid grid-cols-2 @sm:grid-cols-4 gap-4 p-4 rounded-lg bg-muted/40">
		{items.map((item, index) => (
			<div key={index}>
				<p className="text-xs text-muted-foreground">{item.label}</p>
				<p className="text-sm font-medium">{item.value}</p>
			</div>
		))}
	</div>
);

const PartyCard = ({ heading, lines }: PartyCardProps) => (
	<div className="space-y-2">
		<p className="text-xs font-semibold uppercase tracking-wider text-primary">
			{heading}
		</p>
		<div className="space-y-0.5">
			{lines.map((line, index) => (
				<p
					key={index}
					className={
						index === 0 ? 'font-semibold' : 'text-sm text-muted-foreground'
					}
				>
					{line}
				</p>
			))}
		</div>
	</div>
);

const OrderTable = ({ items, currency }: OrderTableProps) => (
	<Table>
		<TableHeader>
			<TableRow>
				<TableHead className="w-[45%]">Product</TableHead>
				<TableHead>SKU</TableHead>
				<TableHead className="text-center">Qty</TableHead>
				<TableHead className="text-right">Price</TableHead>
				<TableHead className="text-right">Total</TableHead>
			</TableRow>
		</TableHeader>
		<TableBody>
			{items.map((item, index) => (
				<TableRow key={index}>
					<TableCell>
						<div>
							<p className="font-medium">{item.name}</p>
							<p className="text-xs text-muted-foreground">{item.variant}</p>
						</div>
					</TableCell>
					<TableCell className="font-mono text-xs text-muted-foreground">
						{item.sku}
					</TableCell>
					<TableCell className="text-center">{item.quantity}</TableCell>
					<TableCell className="text-right">
						{currency}
						{item.price.toFixed(2)}
					</TableCell>
					<TableCell className="text-right font-medium">
						{currency}
						{(item.quantity * item.price).toFixed(2)}
					</TableCell>
				</TableRow>
			))}
		</TableBody>
	</Table>
);

const BreakdownRow = ({
	label,
	value,
	isBold,
	isLarge,
	isHighlight,
}: BreakdownRowProps) => (
	<div
		className={`flex justify-between ${isLarge ? 'text-lg' : 'text-sm'} ${isBold ? 'font-semibold' : ''} ${isHighlight ? 'text-green-600' : ''}`}
	>
		<span className={isBold ? '' : 'text-muted-foreground'}>{label}</span>
		<span>{value}</span>
	</div>
);

const PaymentMethod = ({
	method,
	last4,
	transactionId,
	paidAt,
}: PaymentMethodProps) => (
	<div className="rounded-lg border p-4 space-y-3">
		<div className="flex items-center justify-between">
			<p className="font-semibold">Payment Method</p>
			<Badge variant="outline" className="gap-1">
				<CheckCircle2 className="size-3 text-green-600" />
				Paid
			</Badge>
		</div>
		<div className="grid @sm:grid-cols-2 gap-3 text-sm">
			<div>
				<p className="text-muted-foreground">Method</p>
				<p className="font-medium">
					{method} •••• {last4}
				</p>
			</div>
			<div>
				<p className="text-muted-foreground">Transaction ID</p>
				<div className="flex items-center gap-1">
					<p className="font-mono text-xs">{transactionId}</p>
					<Button variant="ghost" size="icon-sm" className="size-5">
						<Copy className="size-3" />
					</Button>
				</div>
			</div>
			<div className="@sm:col-span-2">
				<p className="text-muted-foreground">Paid At</p>
				<p className="font-medium">{paidAt}</p>
			</div>
		</div>
	</div>
);

export default function Main() {
	const titleData: InvoiceTitleProps = {
		title: 'Invoice',
		invoiceNumber: 'INV-2024-00892',
		status: { status: 'Paid', variant: 'default' },
	};

	const metadata = [
		{ label: 'Issue Date', value: 'Jan 28, 2024' },
		{ label: 'Due Date', value: 'Feb 28, 2024' },
		{ label: 'Order ID', value: '#ORD-7821' },
		{ label: 'PO Number', value: 'PO-2024-45' },
	];

	const seller = {
		heading: 'From',
		lines: [
			'ModernShop Inc.',
			'500 Commerce Way',
			'New York, NY 10001',
			'billing@modernshop.com',
		],
	};

	const buyer = {
		heading: 'Bill To',
		lines: [
			'Jennifer Adams',
			'Creative Agency LLC',
			'123 Design Street',
			'Chicago, IL 60601',
		],
	};

	const items: OrderItem[] = [
		{
			name: 'Premium Wireless Headphones',
			variant: 'Color: Midnight Black',
			sku: 'WH-PRO-001',
			quantity: 2,
			price: 299.99,
		},
		{
			name: 'Leather Laptop Sleeve',
			variant: 'Size: 15 inch',
			sku: 'LS-LTH-015',
			quantity: 1,
			price: 89.99,
		},
		{
			name: 'USB-C Hub Pro',
			variant: '7-in-1 Adapter',
			sku: 'USB-HUB-7',
			quantity: 3,
			price: 59.99,
		},
	];

	const breakdown = [
		{ label: 'Subtotal', value: '$869.94' },
		{ label: 'Shipping', value: '$12.99' },
		{ label: 'Discount (SAVE20)', value: '-$86.99', isHighlight: true },
		{ label: 'Tax (8.875%)', value: '$70.58' },
	];

	const payment: PaymentMethodProps = {
		method: 'Visa',
		last4: '4242',
		transactionId: 'txn_3PkQ2xJ8sK9mN4pL',
		paidAt: 'January 28, 2024 at 2:34 PM EST',
	};

	return (
		<section className="@container">
			<div className="mx-auto max-w-4xl px-4 @sm:px-6 @2xl:px-8 py-8 @md:py-12">
				<Card>
					<CardHeader className="space-y-4">
						<InvoiceTitle {...titleData} />
						<MetadataGrid items={metadata} />
					</CardHeader>
					<CardContent className="space-y-6">
						<div className="grid @md:grid-cols-2 gap-6">
							<PartyCard {...seller} />
							<PartyCard {...buyer} />
						</div>
						<Separator />
						<OrderTable items={items} currency="$" />
						<div className="grid @md:grid-cols-2 gap-6">
							<PaymentMethod {...payment} />
							<div className="space-y-2 p-4 rounded-lg bg-muted/30">
								{breakdown.map((row, index) => (
									<BreakdownRow key={index} {...row} />
								))}
								<Separator className="my-2" />
								<BreakdownRow
									label="Total Paid"
									value="$866.52"
									isBold
									isLarge
								/>
							</div>
						</div>
						<div className="flex gap-3">
							<Button variant="outline" className="gap-2">
								<ExternalLink className="size-4" />
								View Receipt
							</Button>
						</div>
					</CardContent>
				</Card>
			</div>
		</section>
	);
}
