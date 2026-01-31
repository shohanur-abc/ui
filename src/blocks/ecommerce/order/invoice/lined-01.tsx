import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import { Building, Download, Mail, Phone } from 'lucide-react';

interface CompanyProps {
	name: string;
	address: string;
	phone: string;
	email: string;
}

interface InvoiceMetaProps {
	invoiceNumber: string;
	date: string;
	dueDate: string;
	terms: string;
	status: string;
}

interface LineItemProps {
	description: string;
	quantity: number;
	rate: number;
	amount: number;
}

interface TotalsProps {
	subtotal: number;
	discount: number;
	tax: number;
	total: number;
	currency: string;
}

const CompanySection = ({
	company,
	label,
}: {
	company: CompanyProps;
	label: string;
}) => (
	<div className="py-4">
		<p className="text-xs font-medium uppercase tracking-widest text-muted-foreground mb-3">
			{label}
		</p>
		<div className="space-y-1">
			<p className="font-bold flex items-center gap-2">
				<Building className="size-4 text-primary" />
				{company.name}
			</p>
			<p className="text-sm text-muted-foreground">{company.address}</p>
			<p className="text-sm text-muted-foreground flex items-center gap-2">
				<Phone className="size-3" />
				{company.phone}
			</p>
			<p className="text-sm text-muted-foreground flex items-center gap-2">
				<Mail className="size-3" />
				{company.email}
			</p>
		</div>
	</div>
);

const MetaSection = ({
	invoiceNumber,
	date,
	dueDate,
	terms,
	status,
}: InvoiceMetaProps) => (
	<div className="py-4">
		<div className="flex items-center justify-between mb-4">
			<h1 className="text-2xl font-bold tracking-tight">INVOICE</h1>
			<Badge variant={status === 'Paid' ? 'default' : 'secondary'}>
				{status}
			</Badge>
		</div>
		<div className="grid grid-cols-2 gap-4 text-sm">
			<div>
				<p className="text-muted-foreground">Invoice Number</p>
				<p className="font-mono font-bold">{invoiceNumber}</p>
			</div>
			<div>
				<p className="text-muted-foreground">Terms</p>
				<p className="font-medium">{terms}</p>
			</div>
			<div>
				<p className="text-muted-foreground">Issue Date</p>
				<p className="font-medium">{date}</p>
			</div>
			<div>
				<p className="text-muted-foreground">Due Date</p>
				<p className="font-medium">{dueDate}</p>
			</div>
		</div>
	</div>
);

const ItemRow = ({
	item,
	currency,
}: {
	item: LineItemProps;
	currency: string;
}) => (
	<>
		<div className="grid grid-cols-12 gap-4 py-4 text-sm">
			<div className="col-span-6">
				<p className="font-medium">{item.description}</p>
			</div>
			<div className="col-span-2 text-center">
				<p>{item.quantity}</p>
			</div>
			<div className="col-span-2 text-right">
				<p>
					{currency}
					{item.rate.toFixed(2)}
				</p>
			</div>
			<div className="col-span-2 text-right">
				<p className="font-medium">
					{currency}
					{item.amount.toFixed(2)}
				</p>
			</div>
		</div>
		<Separator />
	</>
);

const TotalsSection = ({
	subtotal,
	discount,
	tax,
	total,
	currency,
}: TotalsProps) => (
	<div className="py-4 space-y-3">
		<div className="flex justify-between text-sm">
			<span className="text-muted-foreground">Subtotal</span>
			<span>
				{currency}
				{subtotal.toFixed(2)}
			</span>
		</div>
		{discount > 0 && (
			<>
				<div className="flex justify-between text-sm text-green-600">
					<span>Discount (10%)</span>
					<span>
						-{currency}
						{discount.toFixed(2)}
					</span>
				</div>
				<Separator />
			</>
		)}
		<div className="flex justify-between text-sm">
			<span className="text-muted-foreground">Tax (8%)</span>
			<span>
				{currency}
				{tax.toFixed(2)}
			</span>
		</div>
		<Separator />
		<div className="flex justify-between text-xl font-bold pt-2">
			<span>Total</span>
			<span className="text-primary">
				{currency}
				{total.toFixed(2)}
			</span>
		</div>
	</div>
);

export default function Main() {
	const from: CompanyProps = {
		name: 'Modern Solutions Inc',
		address: '123 Business Lane, New York, NY 10001',
		phone: '(555) 123-4567',
		email: 'billing@modernsolutions.com',
	};

	const to: CompanyProps = {
		name: 'Digital Ventures LLC',
		address: '456 Tech Park Drive, San Francisco, CA 94102',
		phone: '(555) 987-6543',
		email: 'accounts@digitalventures.com',
	};

	const meta: InvoiceMetaProps = {
		invoiceNumber: 'INV-2024-0142',
		date: 'February 25, 2024',
		dueDate: 'March 25, 2024',
		terms: 'Net 30',
		status: 'Pending',
	};

	const items: LineItemProps[] = [
		{
			description: 'Web Application Development',
			quantity: 1,
			rate: 15000,
			amount: 15000,
		},
		{
			description: 'UI/UX Design Services',
			quantity: 1,
			rate: 5000,
			amount: 5000,
		},
		{ description: 'API Integration', quantity: 3, rate: 1500, amount: 4500 },
		{
			description: 'Technical Consulting (hours)',
			quantity: 20,
			rate: 150,
			amount: 3000,
		},
		{
			description: 'Maintenance & Support (monthly)',
			quantity: 3,
			rate: 500,
			amount: 1500,
		},
	];

	const totals: TotalsProps = {
		subtotal: 29000,
		discount: 2900,
		tax: 2088,
		total: 28188,
		currency: '$',
	};

	return (
		<section className="@container">
			<div className="mx-auto max-w-3xl px-4 @sm:px-6 py-8">
				<div className="grid @md:grid-cols-2 gap-8">
					<CompanySection company={from} label="From" />
					<CompanySection company={to} label="Bill To" />
				</div>
				<Separator className="my-2" />
				<MetaSection {...meta} />
				<Separator className="my-2" />
				<div className="grid grid-cols-12 gap-4 py-3 text-xs font-medium uppercase tracking-widest text-muted-foreground">
					<div className="col-span-6">Description</div>
					<div className="col-span-2 text-center">Qty</div>
					<div className="col-span-2 text-right">Rate</div>
					<div className="col-span-2 text-right">Amount</div>
				</div>
				<Separator />
				{items.map((item, index) => (
					<ItemRow key={index} item={item} currency="$" />
				))}
				<div className="grid @md:grid-cols-2 gap-8 mt-4">
					<div className="py-4">
						<p className="text-xs font-medium uppercase tracking-widest text-muted-foreground mb-2">
							Notes
						</p>
						<p className="text-sm text-muted-foreground">
							Thank you for your business. Payment is due within 30 days. Please
							include invoice number with your payment.
						</p>
					</div>
					<TotalsSection {...totals} />
				</div>
				<Separator className="my-4" />
				<div className="flex justify-end">
					<Button className="gap-2">
						<Download className="size-4" />
						Download PDF
					</Button>
				</div>
			</div>
		</section>
	);
}
