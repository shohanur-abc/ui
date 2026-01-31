import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import { Download, Mail, Phone, Printer } from 'lucide-react';

interface LineItem {
	description: string;
	quantity: number;
	rate: number;
}

interface CompanyInfoProps {
	name: string;
	tagline: string;
	address: string[];
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

interface ClientInfoProps {
	name: string;
	company: string;
	address: string[];
	email: string;
}

interface ItemsSectionProps {
	items: LineItem[];
	currency: string;
}

interface TotalsSectionProps {
	subtotal: number;
	tax: number;
	taxLabel: string;
	total: number;
	currency: string;
}

interface ActionsSectionProps {
	actions: {
		icon: React.ComponentType<{ className?: string }>;
		label: string;
	}[];
}

const CompanyInfo = ({
	name,
	tagline,
	address,
	phone,
	email,
}: CompanyInfoProps) => (
	<div className="space-y-3">
		<div>
			<h1 className="text-2xl font-bold">{name}</h1>
			<p className="text-sm text-muted-foreground">{tagline}</p>
		</div>
		<div className="space-y-1 text-sm text-muted-foreground">
			{address.map((line, index) => (
				<p key={index}>{line}</p>
			))}
		</div>
		<div className="flex flex-col gap-1 text-sm">
			<span className="flex items-center gap-2 text-muted-foreground">
				<Phone className="size-3" />
				{phone}
			</span>
			<span className="flex items-center gap-2 text-muted-foreground">
				<Mail className="size-3" />
				{email}
			</span>
		</div>
	</div>
);

const InvoiceMeta = ({
	invoiceNumber,
	date,
	dueDate,
	terms,
	status,
}: InvoiceMetaProps) => (
	<div className="space-y-4">
		<div className="flex items-center gap-3">
			<h2 className="text-3xl font-bold text-primary">INVOICE</h2>
			<Badge variant="secondary">{status}</Badge>
		</div>
		<div className="space-y-2 text-sm">
			<div className="flex justify-between">
				<span className="text-muted-foreground">Invoice #</span>
				<span className="font-mono font-medium">{invoiceNumber}</span>
			</div>
			<div className="flex justify-between">
				<span className="text-muted-foreground">Date</span>
				<span className="font-medium">{date}</span>
			</div>
			<div className="flex justify-between">
				<span className="text-muted-foreground">Due Date</span>
				<span className="font-medium">{dueDate}</span>
			</div>
			<div className="flex justify-between">
				<span className="text-muted-foreground">Terms</span>
				<span className="font-medium">{terms}</span>
			</div>
		</div>
	</div>
);

const ClientInfo = ({ name, company, address, email }: ClientInfoProps) => (
	<div className="p-4 rounded-lg bg-muted/40 space-y-2">
		<p className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">
			Bill To
		</p>
		<p className="font-semibold">{name}</p>
		<p className="text-sm text-muted-foreground">{company}</p>
		{address.map((line, index) => (
			<p key={index} className="text-sm text-muted-foreground">
				{line}
			</p>
		))}
		<p className="text-sm text-muted-foreground">{email}</p>
	</div>
);

const ItemsSection = ({ items, currency }: ItemsSectionProps) => (
	<div className="space-y-3">
		<div className="grid grid-cols-12 gap-4 text-sm font-semibold text-muted-foreground border-b pb-2">
			<div className="col-span-6">Description</div>
			<div className="col-span-2 text-center">Qty</div>
			<div className="col-span-2 text-right">Rate</div>
			<div className="col-span-2 text-right">Amount</div>
		</div>
		{items.map((item, index) => (
			<div
				key={index}
				className="grid grid-cols-12 gap-4 text-sm py-2 border-b border-dashed last:border-0"
			>
				<div className="col-span-6 font-medium">{item.description}</div>
				<div className="col-span-2 text-center text-muted-foreground">
					{item.quantity}
				</div>
				<div className="col-span-2 text-right text-muted-foreground">
					{currency}
					{item.rate.toFixed(2)}
				</div>
				<div className="col-span-2 text-right font-medium">
					{currency}
					{(item.quantity * item.rate).toFixed(2)}
				</div>
			</div>
		))}
	</div>
);

const TotalsSection = ({
	subtotal,
	tax,
	taxLabel,
	total,
	currency,
}: TotalsSectionProps) => (
	<div className="space-y-2 pt-4">
		<div className="flex justify-between text-sm">
			<span className="text-muted-foreground">Subtotal</span>
			<span>
				{currency}
				{subtotal.toFixed(2)}
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
		<div className="flex justify-between text-xl font-bold">
			<span>Total Due</span>
			<span className="text-primary">
				{currency}
				{total.toFixed(2)}
			</span>
		</div>
	</div>
);

const ActionsSection = ({ actions }: ActionsSectionProps) => (
	<div className="flex flex-wrap gap-3">
		{actions.map((action, index) => (
			<Button key={index} variant="outline" size="sm" className="gap-2">
				<action.icon className="size-4" />
				{action.label}
			</Button>
		))}
	</div>
);

export default function Main() {
	const company: CompanyInfoProps = {
		name: 'Creative Studio',
		tagline: 'Design & Development',
		address: ['123 Design Street', 'Creative City, CC 12345'],
		phone: '+1 (555) 123-4567',
		email: 'hello@creativestudio.com',
	};

	const meta: InvoiceMetaProps = {
		invoiceNumber: 'CS-2024-0156',
		date: 'February 10, 2024',
		dueDate: 'March 10, 2024',
		terms: 'Net 30',
		status: 'Pending',
	};

	const client: ClientInfoProps = {
		name: 'Robert Johnson',
		company: 'Johnson Enterprises',
		address: ['456 Business Ave', 'Enterprise City, EC 67890'],
		email: 'robert@johnson-ent.com',
	};

	const items: LineItem[] = [
		{ description: 'Brand Strategy & Research', quantity: 1, rate: 2500.0 },
		{ description: 'Logo Design (3 concepts)', quantity: 1, rate: 1800.0 },
		{ description: 'Website Design', quantity: 1, rate: 4500.0 },
		{ description: 'Social Media Templates', quantity: 10, rate: 150.0 },
	];

	const totals: TotalsSectionProps = {
		subtotal: 10300.0,
		tax: 927.0,
		taxLabel: 'Tax (9%)',
		total: 11227.0,
		currency: '$',
	};

	const actions = [
		{ icon: Download, label: 'Download PDF' },
		{ icon: Printer, label: 'Print' },
		{ icon: Mail, label: 'Send Email' },
	];

	return (
		<section className="@container">
			<div className="mx-auto max-w-4xl px-4 @sm:px-6 @2xl:px-8 py-8 @md:py-12">
				<Card>
					<CardHeader className="border-b">
						<div className="grid @lg:grid-cols-2 gap-8">
							<CompanyInfo {...company} />
							<InvoiceMeta {...meta} />
						</div>
					</CardHeader>
					<CardContent className="pt-6">
						<div className="grid @lg:grid-cols-3 gap-8">
							<div className="@lg:col-span-1">
								<ClientInfo {...client} />
							</div>
							<div className="@lg:col-span-2 space-y-6">
								<ItemsSection items={items} currency="$" />
								<TotalsSection {...totals} />
								<Separator />
								<ActionsSection actions={actions} />
							</div>
						</div>
					</CardContent>
				</Card>
			</div>
		</section>
	);
}
