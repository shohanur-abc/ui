import { Badge } from '@/components/ui/badge';
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

interface InvoiceItem {
	name: string;
	description: string;
	quantity: number;
	unitPrice: number;
	total: number;
}

interface InvoiceHeaderProps {
	invoiceNumber: string;
	date: string;
	dueDate: string;
	status: string;
}

interface AddressProps {
	label: string;
	name: string;
	address: string;
	city: string;
	email: string;
}

interface InvoiceTableProps {
	items: InvoiceItem[];
}

interface TotalsProps {
	subtotal: number;
	tax: number;
	taxRate: number;
	total: number;
	currency: string;
}

interface FooterNotesProps {
	notes: string;
	thankYouMessage: string;
}

const InvoiceHeader = ({
	invoiceNumber,
	date,
	dueDate,
	status,
}: InvoiceHeaderProps) => (
	<div className="flex flex-col @md:flex-row @md:items-center @md:justify-between gap-4">
		<div className="space-y-1">
			<h1 className="text-2xl @md:text-3xl font-bold tracking-tight">
				Invoice
			</h1>
			<p className="text-muted-foreground text-sm">{invoiceNumber}</p>
		</div>
		<div className="flex flex-col @sm:flex-row @sm:items-center gap-3 @md:gap-6">
			<div className="text-sm">
				<span className="text-muted-foreground">Date: </span>
				<span className="font-medium">{date}</span>
			</div>
			<div className="text-sm">
				<span className="text-muted-foreground">Due: </span>
				<span className="font-medium">{dueDate}</span>
			</div>
			<Badge variant="secondary" className="w-fit">
				{status}
			</Badge>
		</div>
	</div>
);

const AddressBlock = ({ label, name, address, city, email }: AddressProps) => (
	<div className="space-y-2">
		<p className="text-xs font-medium text-muted-foreground uppercase tracking-wider">
			{label}
		</p>
		<div className="space-y-1">
			<p className="font-semibold">{name}</p>
			<p className="text-sm text-muted-foreground">{address}</p>
			<p className="text-sm text-muted-foreground">{city}</p>
			<p className="text-sm text-muted-foreground">{email}</p>
		</div>
	</div>
);

const InvoiceTable = ({ items }: InvoiceTableProps) => (
	<Table>
		<TableHeader>
			<TableRow>
				<TableHead className="w-[40%]">Description</TableHead>
				<TableHead className="text-center">Qty</TableHead>
				<TableHead className="text-right">Unit Price</TableHead>
				<TableHead className="text-right">Amount</TableHead>
			</TableRow>
		</TableHeader>
		<TableBody>
			{items.map((item, index) => (
				<TableRow key={index}>
					<TableCell>
						<div>
							<p className="font-medium">{item.name}</p>
							<p className="text-sm text-muted-foreground">
								{item.description}
							</p>
						</div>
					</TableCell>
					<TableCell className="text-center">{item.quantity}</TableCell>
					<TableCell className="text-right">
						${item.unitPrice.toFixed(2)}
					</TableCell>
					<TableCell className="text-right font-medium">
						${item.total.toFixed(2)}
					</TableCell>
				</TableRow>
			))}
		</TableBody>
	</Table>
);

const InvoiceTotals = ({
	subtotal,
	tax,
	taxRate,
	total,
	currency,
}: TotalsProps) => (
	<div className="flex justify-end">
		<div className="w-full @sm:w-64 space-y-2">
			<div className="flex justify-between text-sm">
				<span className="text-muted-foreground">Subtotal</span>
				<span>
					{currency}
					{subtotal.toFixed(2)}
				</span>
			</div>
			<div className="flex justify-between text-sm">
				<span className="text-muted-foreground">Tax ({taxRate}%)</span>
				<span>
					{currency}
					{tax.toFixed(2)}
				</span>
			</div>
			<Separator />
			<div className="flex justify-between font-semibold text-lg">
				<span>Total</span>
				<span>
					{currency}
					{total.toFixed(2)}
				</span>
			</div>
		</div>
	</div>
);

const FooterNotes = ({ notes, thankYouMessage }: FooterNotesProps) => (
	<div className="space-y-4 text-sm text-muted-foreground">
		<p>{notes}</p>
		<p className="font-medium text-foreground">{thankYouMessage}</p>
	</div>
);

export default function Main() {
	const headerData = {
		invoiceNumber: '#INV-2024-001',
		date: 'Jan 15, 2024',
		dueDate: 'Feb 15, 2024',
		status: 'Pending',
	};

	const fromAddress = {
		label: 'From',
		name: 'Acme Corporation',
		address: '123 Business Avenue',
		city: 'San Francisco, CA 94102',
		email: 'billing@acme.com',
	};

	const toAddress = {
		label: 'Bill To',
		name: 'John Smith',
		address: '456 Customer Street',
		city: 'Los Angeles, CA 90001',
		email: 'john@example.com',
	};

	const items: InvoiceItem[] = [
		{
			name: 'Website Design',
			description: 'Custom homepage design',
			quantity: 1,
			unitPrice: 1500.0,
			total: 1500.0,
		},
		{
			name: 'Development',
			description: 'Frontend implementation',
			quantity: 40,
			unitPrice: 75.0,
			total: 3000.0,
		},
		{
			name: 'Hosting',
			description: 'Annual hosting plan',
			quantity: 1,
			unitPrice: 200.0,
			total: 200.0,
		},
	];

	const totals = {
		subtotal: 4700.0,
		tax: 423.0,
		taxRate: 9,
		total: 5123.0,
		currency: '$',
	};

	const footerData = {
		notes:
			'Payment is due within 30 days. Please include invoice number with your payment.',
		thankYouMessage: 'Thank you for your business!',
	};

	return (
		<section className="@container">
			<div className="mx-auto max-w-4xl px-4 @sm:px-6 @2xl:px-8 py-8 @md:py-12">
				<Card>
					<CardHeader>
						<InvoiceHeader {...headerData} />
					</CardHeader>
					<CardContent className="space-y-8">
						<div className="grid @md:grid-cols-2 gap-8">
							<AddressBlock {...fromAddress} />
							<AddressBlock {...toAddress} />
						</div>
						<InvoiceTable items={items} />
						<InvoiceTotals {...totals} />
					</CardContent>
					<CardFooter className="border-t pt-6">
						<FooterNotes {...footerData} />
					</CardFooter>
				</Card>
			</div>
		</section>
	);
}
