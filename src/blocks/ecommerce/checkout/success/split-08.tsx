import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import {
	Check,
	FileText,
	Download,
	Printer,
	ArrowRight,
	Building,
	CreditCard,
} from 'lucide-react';
import Link from 'next/link';

interface InvoiceLineProps {
	description: string;
	quantity: number;
	unitPrice: number;
	total: number;
	currency: string;
}

interface CTAProps {
	items: {
		label: string;
		href: string;
		variant?: 'default' | 'outline' | 'ghost';
		icon?: React.ElementType;
	}[];
}

const InvoicePreview = ({
	orderNumber,
	date,
}: {
	orderNumber: string;
	date: string;
}) => (
	<div className="relative h-full min-h-[400px] @lg:min-h-0 bg-muted p-6 flex items-center justify-center">
		<div className="w-full max-w-[280px] @xl:max-w-[320px] bg-background rounded-lg shadow-2xl p-6 space-y-4">
			<div className="flex items-center justify-between">
				<div className="size-10 rounded-lg bg-primary flex items-center justify-center">
					<FileText className="size-5 text-primary-foreground" />
				</div>
				<Badge variant="secondary">INVOICE</Badge>
			</div>
			<Separator />
			<div className="space-y-2 text-xs">
				<div className="flex justify-between">
					<span className="text-muted-foreground">Invoice #</span>
					<span className="font-mono font-medium">{orderNumber}</span>
				</div>
				<div className="flex justify-between">
					<span className="text-muted-foreground">Date</span>
					<span className="font-medium">{date}</span>
				</div>
			</div>
			<Separator />
			<div className="space-y-2">
				{[1, 2, 3].map((i) => (
					<div key={i} className="flex justify-between text-xs">
						<div className="h-2 w-20 bg-muted rounded" />
						<div className="h-2 w-12 bg-muted rounded" />
					</div>
				))}
			</div>
			<Separator />
			<div className="flex justify-between font-semibold text-sm">
				<span>Total</span>
				<span>$459.99</span>
			</div>
			<div className="pt-2 flex justify-center">
				<div className="inline-flex items-center gap-1 text-xs text-primary">
					<Check className="size-3" />
					<span>Paid</span>
				</div>
			</div>
		</div>
		<div className="absolute top-4 right-4 flex gap-2">
			<Button variant="secondary" size="icon" className="size-8">
				<Download className="size-4" />
			</Button>
			<Button variant="secondary" size="icon" className="size-8">
				<Printer className="size-4" />
			</Button>
		</div>
	</div>
);

const Title = ({ text }: { text: string }) => (
	<h1 className="text-2xl @xl:text-3xl font-bold">{text}</h1>
);

const StatusBadge = ({ status }: { status: string }) => (
	<div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-primary/10 text-primary">
		<Check className="size-4" />
		<span className="font-medium text-sm">{status}</span>
	</div>
);

const InvoiceLine = ({
	description,
	quantity,
	unitPrice,
	total,
	currency,
}: InvoiceLineProps) => (
	<div className="flex items-center justify-between py-2">
		<div className="flex-1">
			<p className="font-medium text-sm">{description}</p>
			<p className="text-xs text-muted-foreground">
				{quantity} x {currency}
				{unitPrice.toFixed(2)}
			</p>
		</div>
		<p className="font-medium">
			{currency}
			{total.toFixed(2)}
		</p>
	</div>
);

const InvoiceDetails = ({
	lines,
	subtotal,
	tax,
	total,
	currency,
}: {
	lines: InvoiceLineProps[];
	subtotal: number;
	tax: number;
	total: number;
	currency: string;
}) => (
	<Card>
		<CardContent className="pt-6 space-y-4">
			<h3 className="font-semibold">Order Details</h3>
			<div className="divide-y">
				{lines.map((line, i) => (
					<InvoiceLine key={i} {...line} />
				))}
			</div>
			<Separator />
			<div className="space-y-2 text-sm">
				<div className="flex justify-between">
					<span className="text-muted-foreground">Subtotal</span>
					<span>
						{currency}
						{subtotal.toFixed(2)}
					</span>
				</div>
				<div className="flex justify-between">
					<span className="text-muted-foreground">Tax</span>
					<span>
						{currency}
						{tax.toFixed(2)}
					</span>
				</div>
			</div>
			<Separator />
			<div className="flex justify-between font-semibold text-lg">
				<span>Total</span>
				<span>
					{currency}
					{total.toFixed(2)}
				</span>
			</div>
		</CardContent>
	</Card>
);

const BillingInfo = ({
	company,
	address,
}: {
	company: string;
	address: string;
}) => (
	<div className="p-4 rounded-xl bg-muted/50 border">
		<div className="flex items-start gap-3">
			<Building className="size-5 text-muted-foreground shrink-0" />
			<div>
				<p className="font-medium text-sm">{company}</p>
				<p className="text-sm text-muted-foreground mt-1">{address}</p>
			</div>
		</div>
	</div>
);

const PaymentInfo = ({
	method,
	last4,
}: {
	method: string;
	last4: string;
}) => (
	<div className="p-4 rounded-xl bg-muted/50 border">
		<div className="flex items-center gap-3">
			<CreditCard className="size-5 text-muted-foreground" />
			<div>
				<p className="font-medium text-sm">{method}</p>
				<p className="text-sm text-muted-foreground">**** **** **** {last4}</p>
			</div>
		</div>
	</div>
);

const DocumentActions = () => (
	<div className="flex gap-3">
		<Button variant="outline" className="flex-1 gap-2">
			<Download className="size-4" />
			Download PDF
		</Button>
		<Button variant="outline" className="flex-1 gap-2">
			<Printer className="size-4" />
			Print Invoice
		</Button>
	</div>
);

const CTA = ({ items }: CTAProps) => (
	<div className="flex gap-3">
		{items.map(({ label, href, variant, icon: Icon }, i) => (
			<Button
				key={i}
				size="lg"
				variant={variant || 'default'}
				className="flex-1 gap-2"
				asChild
			>
				<Link href={href}>
					{label}
					{Icon && <Icon className="size-4" />}
				</Link>
			</Button>
		))}
	</div>
);

export default function Main() {
	const invoiceLines: InvoiceLineProps[] = [
		{
			description: 'Premium Headphones',
			quantity: 1,
			unitPrice: 299.99,
			total: 299.99,
			currency: '$',
		},
		{
			description: 'Carrying Case',
			quantity: 1,
			unitPrice: 49.99,
			total: 49.99,
			currency: '$',
		},
		{
			description: 'Extended Warranty',
			quantity: 1,
			unitPrice: 59.99,
			total: 59.99,
			currency: '$',
		},
	];

	return (
		<section className="@container min-h-screen py-12 @md:py-16 @xl:py-20">
			<div className="mx-auto max-w-6xl px-4 @sm:px-6 @2xl:px-8">
				<div className="grid @lg:grid-cols-2 gap-0 rounded-2xl overflow-hidden border">
					<InvoicePreview orderNumber="INV-78432" date="Jan 15, 2024" />

					<div className="p-6 @lg:p-8 space-y-6">
						<div className="flex items-center justify-between">
							<Title text="Invoice Ready" />
							<StatusBadge status="Paid" />
						</div>

						<InvoiceDetails
							lines={invoiceLines}
							subtotal={409.97}
							tax={50.02}
							total={459.99}
							currency="$"
						/>

						<div className="grid grid-cols-2 gap-4">
							<BillingInfo
								company="John Doe"
								address="123 Main St, NY 10001"
							/>
							<PaymentInfo method="Visa" last4="4242" />
						</div>

						<DocumentActions />

						<CTA
							items={[
								{ label: 'View Orders', href: '/orders', icon: ArrowRight },
								{ label: 'Shop More', href: '/shop', variant: 'outline' },
							]}
						/>
					</div>
				</div>
			</div>
		</section>
	);
}
