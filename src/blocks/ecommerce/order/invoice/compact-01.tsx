import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import { Download, FileText } from 'lucide-react';

interface InvoiceHeaderProps {
	invoiceNumber: string;
	date: string;
	dueDate: string;
	status: string;
}

interface PartyProps {
	label: string;
	name: string;
	address: string;
}

interface LineItemProps {
	description: string;
	quantity: number;
	price: number;
}

interface TotalsProps {
	subtotal: number;
	tax: number;
	total: number;
	currency: string;
}

const InvoiceHeader = ({
	invoiceNumber,
	date,
	dueDate,
	status,
}: InvoiceHeaderProps) => (
	<div className="flex items-center justify-between">
		<div className="flex items-center gap-2">
			<FileText className="size-5 text-primary" />
			<span className="font-bold">{invoiceNumber}</span>
		</div>
		<div className="flex items-center gap-4 text-xs">
			<span className="text-muted-foreground">Date: {date}</span>
			<span className="text-muted-foreground">Due: {dueDate}</span>
			<Badge
				variant={status === 'Paid' ? 'default' : 'secondary'}
				className="text-xs"
			>
				{status}
			</Badge>
		</div>
	</div>
);

const PartyInfo = ({ label, name, address }: PartyProps) => (
	<div className="text-xs">
		<p className="text-muted-foreground uppercase tracking-wide text-[10px]">
			{label}
		</p>
		<p className="font-medium">{name}</p>
		<p className="text-muted-foreground">{address}</p>
	</div>
);

const LineItems = ({
	items,
	currency,
}: {
	items: LineItemProps[];
	currency: string;
}) => (
	<div className="space-y-1">
		{items.map((item, index) => (
			<div
				key={index}
				className="flex items-center justify-between text-xs py-1"
			>
				<span className="flex-1">{item.description}</span>
				<span className="w-12 text-center">{item.quantity}</span>
				<span className="w-16 text-right">
					{currency}
					{item.price.toFixed(2)}
				</span>
				<span className="w-20 text-right font-medium">
					{currency}
					{(item.quantity * item.price).toFixed(2)}
				</span>
			</div>
		))}
	</div>
);

const Totals = ({ subtotal, tax, total, currency }: TotalsProps) => (
	<div className="text-xs space-y-1 text-right">
		<div className="flex justify-end gap-8">
			<span className="text-muted-foreground">Subtotal</span>
			<span className="w-20">
				{currency}
				{subtotal.toFixed(2)}
			</span>
		</div>
		<div className="flex justify-end gap-8">
			<span className="text-muted-foreground">Tax</span>
			<span className="w-20">
				{currency}
				{tax.toFixed(2)}
			</span>
		</div>
		<div className="flex justify-end gap-8 font-bold text-sm pt-1">
			<span>Total</span>
			<span className="w-20 text-primary">
				{currency}
				{total.toFixed(2)}
			</span>
		</div>
	</div>
);

export default function Main() {
	const header: InvoiceHeaderProps = {
		invoiceNumber: 'INV-2024-001',
		date: 'Feb 15, 2024',
		dueDate: 'Mar 15, 2024',
		status: 'Pending',
	};

	const from: PartyProps = {
		label: 'From',
		name: 'Acme Corp',
		address: '123 Business St, City, ST 12345',
	};

	const to: PartyProps = {
		label: 'Bill To',
		name: 'Client Inc',
		address: '456 Customer Ave, Town, ST 67890',
	};

	const items: LineItemProps[] = [
		{ description: 'Web Design Services', quantity: 1, price: 2500 },
		{ description: 'Development Hours', quantity: 40, price: 125 },
		{ description: 'Hosting (Annual)', quantity: 1, price: 299 },
	];

	const totals: TotalsProps = {
		subtotal: 7799,
		tax: 624,
		total: 8423,
		currency: '$',
	};

	return (
		<section className="@container">
			<div className="mx-auto max-w-xl px-4 py-6">
				<div className="rounded-lg border p-4 space-y-4">
					<InvoiceHeader {...header} />
					<Separator />
					<div className="grid grid-cols-2 gap-4">
						<PartyInfo {...from} />
						<PartyInfo {...to} />
					</div>
					<Separator />
					<div className="text-xs text-muted-foreground flex gap-4 border-b pb-1">
						<span className="flex-1">Description</span>
						<span className="w-12 text-center">Qty</span>
						<span className="w-16 text-right">Price</span>
						<span className="w-20 text-right">Amount</span>
					</div>
					<LineItems items={items} currency="$" />
					<Separator />
					<Totals {...totals} />
					<div className="flex justify-end">
						<Button size="sm" className="gap-2">
							<Download className="size-3" />
							Download
						</Button>
					</div>
				</div>
			</div>
		</section>
	);
}
