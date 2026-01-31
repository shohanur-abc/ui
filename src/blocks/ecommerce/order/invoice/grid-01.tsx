import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import {
	Building,
	Calendar,
	Download,
	FileText,
	Mail,
	Phone,
	User,
} from 'lucide-react';

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

const CompanyCard = ({
	company,
	label,
}: {
	company: CompanyProps;
	label: string;
}) => (
	<Card>
		<CardContent className="pt-4 space-y-2">
			<p className="text-xs text-muted-foreground uppercase tracking-wide">
				{label}
			</p>
			<div className="flex items-center gap-2">
				<Building className="size-4 text-primary" />
				<p className="font-semibold text-sm">{company.name}</p>
			</div>
			<p className="text-xs text-muted-foreground">{company.address}</p>
			<div className="flex gap-4 text-xs text-muted-foreground">
				<span className="flex items-center gap-1">
					<Phone className="size-3" />
					{company.phone}
				</span>
				<span className="flex items-center gap-1">
					<Mail className="size-3" />
					{company.email}
				</span>
			</div>
		</CardContent>
	</Card>
);

const MetaCard = ({
	invoiceNumber,
	date,
	dueDate,
	status,
}: InvoiceMetaProps) => (
	<Card>
		<CardContent className="pt-4 space-y-3">
			<div className="flex items-center justify-between">
				<div className="flex items-center gap-2">
					<FileText className="size-4 text-primary" />
					<span className="font-mono font-bold text-sm">{invoiceNumber}</span>
				</div>
				<Badge variant={status === 'Paid' ? 'default' : 'secondary'}>
					{status}
				</Badge>
			</div>
			<div className="grid grid-cols-2 gap-2 text-xs">
				<div>
					<p className="text-muted-foreground">Issue Date</p>
					<p className="font-medium">{date}</p>
				</div>
				<div>
					<p className="text-muted-foreground">Due Date</p>
					<p className="font-medium">{dueDate}</p>
				</div>
			</div>
		</CardContent>
	</Card>
);

const ItemCard = ({
	item,
	currency,
}: {
	item: LineItemProps;
	currency: string;
}) => (
	<Card>
		<CardContent className="pt-4">
			<div className="flex items-start justify-between">
				<div className="flex-1">
					<p className="font-medium text-sm">{item.description}</p>
					<p className="text-xs text-muted-foreground">
						{item.quantity} × {currency}
						{item.rate.toFixed(2)}
					</p>
				</div>
				<p className="font-bold text-sm">
					{currency}
					{item.amount.toFixed(2)}
				</p>
			</div>
		</CardContent>
	</Card>
);

const TotalsCard = ({ subtotal, tax, total, currency }: TotalsProps) => (
	<Card className="bg-primary text-primary-foreground">
		<CardContent className="pt-4 space-y-2">
			<div className="flex justify-between text-sm opacity-80">
				<span>Subtotal</span>
				<span>
					{currency}
					{subtotal.toFixed(2)}
				</span>
			</div>
			<div className="flex justify-between text-sm opacity-80">
				<span>Tax (8%)</span>
				<span>
					{currency}
					{tax.toFixed(2)}
				</span>
			</div>
			<Separator className="bg-primary-foreground/20" />
			<div className="flex justify-between font-bold text-lg">
				<span>Total</span>
				<span>
					{currency}
					{total.toFixed(2)}
				</span>
			</div>
		</CardContent>
	</Card>
);

export default function Main() {
	const from: CompanyProps = {
		name: 'Creative Agency Inc',
		address: '123 Design Street, New York, NY 10001',
		phone: '(555) 123-4567',
		email: 'billing@creative.com',
	};

	const to: CompanyProps = {
		name: 'Tech Startup LLC',
		address: '456 Innovation Ave, San Francisco, CA 94102',
		phone: '(555) 987-6543',
		email: 'accounts@techstartup.com',
	};

	const meta: InvoiceMetaProps = {
		invoiceNumber: 'INV-2024-001',
		date: 'Feb 15, 2024',
		dueDate: 'Mar 15, 2024',
		status: 'Pending',
	};

	const items: LineItemProps[] = [
		{ description: 'Website Redesign', quantity: 1, rate: 5000, amount: 5000 },
		{ description: 'Logo Design', quantity: 1, rate: 1500, amount: 1500 },
		{ description: 'Brand Guidelines', quantity: 1, rate: 2500, amount: 2500 },
		{ description: 'Social Media Kit', quantity: 1, rate: 1000, amount: 1000 },
	];

	const totals: TotalsProps = {
		subtotal: 10000,
		tax: 800,
		total: 10800,
		currency: '$',
	};

	return (
		<section className="@container">
			<div className="mx-auto max-w-4xl px-4 @sm:px-6 py-8">
				<div className="grid @md:grid-cols-3 gap-4">
					<CompanyCard company={from} label="From" />
					<CompanyCard company={to} label="Bill To" />
					<MetaCard {...meta} />
				</div>
				<div className="grid @sm:grid-cols-2 @lg:grid-cols-4 gap-4 mt-4">
					{items.map((item, index) => (
						<ItemCard key={index} item={item} currency="$" />
					))}
				</div>
				<div className="grid @md:grid-cols-3 gap-4 mt-4">
					<div className="@md:col-span-2 flex items-end">
						<Button className="gap-2">
							<Download className="size-4" />
							Download Invoice
						</Button>
					</div>
					<TotalsCard {...totals} />
				</div>
			</div>
		</section>
	);
}
