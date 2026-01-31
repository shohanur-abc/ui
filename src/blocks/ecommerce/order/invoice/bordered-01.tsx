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
	<div className="border-2 border-foreground p-4">
		<p className="text-xs font-bold uppercase tracking-widest border-b-2 border-foreground pb-2 mb-3">
			{label}
		</p>
		<div className="flex items-center gap-2 mb-2">
			<Building className="size-4" />
			<p className="font-bold">{company.name}</p>
		</div>
		<p className="text-sm text-muted-foreground mb-2">{company.address}</p>
		<div className="flex flex-col gap-1 text-sm text-muted-foreground">
			<span className="flex items-center gap-2">
				<Phone className="size-3" />
				{company.phone}
			</span>
			<span className="flex items-center gap-2">
				<Mail className="size-3" />
				{company.email}
			</span>
		</div>
	</div>
);

const MetaSection = ({
	invoiceNumber,
	date,
	dueDate,
	status,
}: InvoiceMetaProps) => (
	<div className="border-2 border-foreground p-4">
		<div className="flex items-center justify-between border-b-2 border-foreground pb-2 mb-3">
			<p className="font-mono text-xl font-bold">{invoiceNumber}</p>
			<Badge
				variant={status === 'Paid' ? 'default' : 'secondary'}
				className="rounded-none"
			>
				{status}
			</Badge>
		</div>
		<div className="grid grid-cols-2 gap-4">
			<div>
				<p className="text-xs font-bold uppercase tracking-widest">
					Issue Date
				</p>
				<p className="text-sm">{date}</p>
			</div>
			<div>
				<p className="text-xs font-bold uppercase tracking-widest">Due Date</p>
				<p className="text-sm">{dueDate}</p>
			</div>
		</div>
	</div>
);

const ItemsTable = ({
	items,
	currency,
}: {
	items: LineItemProps[];
	currency: string;
}) => (
	<div className="border-2 border-foreground">
		<div className="grid grid-cols-12 gap-2 p-3 border-b-2 border-foreground bg-foreground text-background font-bold text-sm">
			<div className="col-span-6">Description</div>
			<div className="col-span-2 text-center">Qty</div>
			<div className="col-span-2 text-right">Rate</div>
			<div className="col-span-2 text-right">Amount</div>
		</div>
		{items.map((item, index) => (
			<div
				key={index}
				className={`grid grid-cols-12 gap-2 p-3 text-sm ${index < items.length - 1 ? 'border-b border-foreground/30' : ''}`}
			>
				<div className="col-span-6">{item.description}</div>
				<div className="col-span-2 text-center">{item.quantity}</div>
				<div className="col-span-2 text-right">
					{currency}
					{item.rate.toFixed(2)}
				</div>
				<div className="col-span-2 text-right font-medium">
					{currency}
					{item.amount.toFixed(2)}
				</div>
			</div>
		))}
	</div>
);

const TotalsSection = ({ subtotal, tax, total, currency }: TotalsProps) => (
	<div className="border-2 border-foreground p-4 bg-foreground text-background">
		<div className="flex justify-between text-sm mb-2">
			<span>Subtotal</span>
			<span>
				{currency}
				{subtotal.toFixed(2)}
			</span>
		</div>
		<div className="flex justify-between text-sm mb-2">
			<span>Tax (10%)</span>
			<span>
				{currency}
				{tax.toFixed(2)}
			</span>
		</div>
		<Separator className="bg-background/30 my-3" />
		<div className="flex justify-between text-xl font-bold">
			<span>Total Due</span>
			<span>
				{currency}
				{total.toFixed(2)}
			</span>
		</div>
	</div>
);

export default function Main() {
	const from: CompanyProps = {
		name: 'Bold Design Studio',
		address: '789 Creative Way, Brooklyn, NY 11201',
		phone: '(555) 321-7890',
		email: 'hello@bolddesign.com',
	};

	const to: CompanyProps = {
		name: 'Forward Thinking Inc',
		address: '456 Innovation Blvd, Austin, TX 78701',
		phone: '(555) 654-3210',
		email: 'billing@forwardthinking.com',
	};

	const meta: InvoiceMetaProps = {
		invoiceNumber: 'INV-2024-0089',
		date: 'February 20, 2024',
		dueDate: 'March 20, 2024',
		status: 'Pending',
	};

	const items: LineItemProps[] = [
		{
			description: 'Brand Identity Package',
			quantity: 1,
			rate: 8500,
			amount: 8500,
		},
		{
			description: 'Website UI/UX Design',
			quantity: 1,
			rate: 12000,
			amount: 12000,
		},
		{
			description: 'Marketing Collateral Set',
			quantity: 1,
			rate: 3500,
			amount: 3500,
		},
		{
			description: 'Social Media Templates',
			quantity: 10,
			rate: 250,
			amount: 2500,
		},
	];

	const totals: TotalsProps = {
		subtotal: 26500,
		tax: 2650,
		total: 29150,
		currency: '$',
	};

	return (
		<section className="@container">
			<div className="mx-auto max-w-3xl px-4 @sm:px-6 py-8">
				<div className="grid @md:grid-cols-2 gap-4 mb-4">
					<CompanySection company={from} label="From" />
					<CompanySection company={to} label="Bill To" />
				</div>
				<div className="mb-4">
					<MetaSection {...meta} />
				</div>
				<div className="mb-4">
					<ItemsTable items={items} currency="$" />
				</div>
				<div className="grid @md:grid-cols-2 gap-4">
					<div className="border-2 border-foreground p-4">
						<p className="text-xs font-bold uppercase tracking-widest border-b-2 border-foreground pb-2 mb-3">
							Payment Info
						</p>
						<div className="text-sm space-y-1">
							<p>
								<span className="font-bold">Bank:</span> First National Bank
							</p>
							<p>
								<span className="font-bold">Account:</span> ****4567
							</p>
							<p>
								<span className="font-bold">Routing:</span> ****8901
							</p>
						</div>
					</div>
					<TotalsSection {...totals} />
				</div>
				<div className="flex justify-end mt-4">
					<Button className="gap-2 rounded-none">
						<Download className="size-4" />
						Download PDF
					</Button>
				</div>
			</div>
		</section>
	);
}
