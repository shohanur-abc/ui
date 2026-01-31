import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import {
	Table,
	TableBody,
	TableCell,
	TableHead,
	TableHeader,
	TableRow,
} from '@/components/ui/table';
import {
	Building2,
	Calendar,
	CreditCard,
	Download,
	FileText,
	Mail,
	MapPin,
	Phone,
	Printer,
	User,
} from 'lucide-react';

interface CompanyDetailsProps {
	name: string;
	address: string;
	city: string;
	phone: string;
	email: string;
	website: string;
	taxId: string;
}

interface CustomerDetailsProps {
	name: string;
	company: string;
	address: string;
	city: string;
	phone: string;
	email: string;
	customerNumber: string;
}

interface InvoiceMetadataProps {
	invoiceNumber: string;
	invoiceDate: string;
	dueDate: string;
	poNumber: string;
	terms: string;
	status: string;
}

interface LineItemProps {
	sku: string;
	description: string;
	quantity: number;
	unitPrice: number;
	discount: number;
	taxRate: number;
	total: number;
}

interface InvoiceTotalsProps {
	subtotal: number;
	totalDiscount: number;
	taxableAmount: number;
	taxAmount: number;
	shipping: number;
	total: number;
	amountPaid: number;
	balanceDue: number;
	currency: string;
}

interface PaymentInfoProps {
	bankName: string;
	accountName: string;
	accountNumber: string;
	routingNumber: string;
	swiftCode: string;
}

const CompanyDetails = ({
	name,
	address,
	city,
	phone,
	email,
	website,
	taxId,
}: CompanyDetailsProps) => (
	<div className="space-y-3">
		<div className="flex items-center gap-2">
			<Building2 className="size-5 text-primary" />
			<h2 className="text-xl font-bold">{name}</h2>
		</div>
		<div className="grid grid-cols-2 gap-2 text-sm">
			<div className="flex items-start gap-2">
				<MapPin className="size-4 text-muted-foreground mt-0.5" />
				<div>
					<p>{address}</p>
					<p>{city}</p>
				</div>
			</div>
			<div className="space-y-1">
				<div className="flex items-center gap-2">
					<Phone className="size-4 text-muted-foreground" />
					<span>{phone}</span>
				</div>
				<div className="flex items-center gap-2">
					<Mail className="size-4 text-muted-foreground" />
					<span>{email}</span>
				</div>
			</div>
		</div>
		<p className="text-xs text-muted-foreground">
			Tax ID: {taxId} • {website}
		</p>
	</div>
);

const CustomerDetails = ({
	name,
	company,
	address,
	city,
	phone,
	email,
	customerNumber,
}: CustomerDetailsProps) => (
	<Card>
		<CardHeader className="pb-3">
			<CardTitle className="text-sm font-medium text-muted-foreground flex items-center gap-2">
				<User className="size-4" />
				Bill To
			</CardTitle>
		</CardHeader>
		<CardContent className="space-y-2 text-sm">
			<p className="font-semibold">{name}</p>
			<p>{company}</p>
			<p className="text-muted-foreground">{address}</p>
			<p className="text-muted-foreground">{city}</p>
			<div className="pt-2 space-y-1 text-xs text-muted-foreground">
				<p>Phone: {phone}</p>
				<p>Email: {email}</p>
				<p>Customer #: {customerNumber}</p>
			</div>
		</CardContent>
	</Card>
);

const InvoiceMetadata = ({
	invoiceNumber,
	invoiceDate,
	dueDate,
	poNumber,
	terms,
	status,
}: InvoiceMetadataProps) => (
	<Card>
		<CardHeader className="pb-3">
			<div className="flex items-center justify-between">
				<CardTitle className="text-sm font-medium text-muted-foreground flex items-center gap-2">
					<FileText className="size-4" />
					Invoice Details
				</CardTitle>
				<Badge
					variant={
						status === 'Paid'
							? 'default'
							: status === 'Overdue'
								? 'destructive'
								: 'secondary'
					}
				>
					{status}
				</Badge>
			</div>
		</CardHeader>
		<CardContent className="grid grid-cols-2 gap-3 text-sm">
			<div>
				<p className="text-xs text-muted-foreground">Invoice Number</p>
				<p className="font-mono font-semibold">{invoiceNumber}</p>
			</div>
			<div>
				<p className="text-xs text-muted-foreground">Invoice Date</p>
				<p>{invoiceDate}</p>
			</div>
			<div>
				<p className="text-xs text-muted-foreground">Due Date</p>
				<p className="font-medium text-destructive">{dueDate}</p>
			</div>
			<div>
				<p className="text-xs text-muted-foreground">PO Number</p>
				<p>{poNumber}</p>
			</div>
			<div className="col-span-2">
				<p className="text-xs text-muted-foreground">Payment Terms</p>
				<p>{terms}</p>
			</div>
		</CardContent>
	</Card>
);

const LineItemsTable = ({
	items,
	currency,
}: {
	items: LineItemProps[];
	currency: string;
}) => (
	<Card>
		<CardContent className="pt-6">
			<Table>
				<TableHeader>
					<TableRow>
						<TableHead className="w-20">SKU</TableHead>
						<TableHead>Description</TableHead>
						<TableHead className="text-center w-16">Qty</TableHead>
						<TableHead className="text-right w-24">Unit Price</TableHead>
						<TableHead className="text-right w-20">Disc %</TableHead>
						<TableHead className="text-right w-20">Tax %</TableHead>
						<TableHead className="text-right w-24">Total</TableHead>
					</TableRow>
				</TableHeader>
				<TableBody>
					{items.map((item, index) => (
						<TableRow key={index}>
							<TableCell className="font-mono text-xs">{item.sku}</TableCell>
							<TableCell>{item.description}</TableCell>
							<TableCell className="text-center">{item.quantity}</TableCell>
							<TableCell className="text-right">
								{currency}
								{item.unitPrice.toFixed(2)}
							</TableCell>
							<TableCell className="text-right">{item.discount}%</TableCell>
							<TableCell className="text-right">{item.taxRate}%</TableCell>
							<TableCell className="text-right font-medium">
								{currency}
								{item.total.toFixed(2)}
							</TableCell>
						</TableRow>
					))}
				</TableBody>
			</Table>
		</CardContent>
	</Card>
);

const InvoiceTotals = ({
	subtotal,
	totalDiscount,
	taxableAmount,
	taxAmount,
	shipping,
	total,
	amountPaid,
	balanceDue,
	currency,
}: InvoiceTotalsProps) => (
	<Card>
		<CardContent className="pt-6 space-y-3">
			<div className="space-y-2 text-sm">
				<div className="flex justify-between">
					<span className="text-muted-foreground">Subtotal</span>
					<span>
						{currency}
						{subtotal.toFixed(2)}
					</span>
				</div>
				<div className="flex justify-between text-green-600">
					<span>Total Discount</span>
					<span>
						-{currency}
						{totalDiscount.toFixed(2)}
					</span>
				</div>
				<div className="flex justify-between">
					<span className="text-muted-foreground">Taxable Amount</span>
					<span>
						{currency}
						{taxableAmount.toFixed(2)}
					</span>
				</div>
				<div className="flex justify-between">
					<span className="text-muted-foreground">Tax</span>
					<span>
						{currency}
						{taxAmount.toFixed(2)}
					</span>
				</div>
				<div className="flex justify-between">
					<span className="text-muted-foreground">Shipping & Handling</span>
					<span>
						{currency}
						{shipping.toFixed(2)}
					</span>
				</div>
			</div>
			<Separator />
			<div className="flex justify-between font-bold text-lg">
				<span>Total</span>
				<span>
					{currency}
					{total.toFixed(2)}
				</span>
			</div>
			<div className="flex justify-between text-sm text-green-600">
				<span>Amount Paid</span>
				<span>
					-{currency}
					{amountPaid.toFixed(2)}
				</span>
			</div>
			<Separator />
			<div className="flex justify-between font-bold text-xl text-primary">
				<span>Balance Due</span>
				<span>
					{currency}
					{balanceDue.toFixed(2)}
				</span>
			</div>
		</CardContent>
	</Card>
);

const PaymentInfo = ({
	bankName,
	accountName,
	accountNumber,
	routingNumber,
	swiftCode,
}: PaymentInfoProps) => (
	<Card>
		<CardHeader className="pb-3">
			<CardTitle className="text-sm font-medium text-muted-foreground flex items-center gap-2">
				<CreditCard className="size-4" />
				Payment Information
			</CardTitle>
		</CardHeader>
		<CardContent className="grid grid-cols-2 gap-3 text-sm">
			<div>
				<p className="text-xs text-muted-foreground">Bank Name</p>
				<p>{bankName}</p>
			</div>
			<div>
				<p className="text-xs text-muted-foreground">Account Name</p>
				<p>{accountName}</p>
			</div>
			<div>
				<p className="text-xs text-muted-foreground">Account Number</p>
				<p className="font-mono">{accountNumber}</p>
			</div>
			<div>
				<p className="text-xs text-muted-foreground">Routing Number</p>
				<p className="font-mono">{routingNumber}</p>
			</div>
			<div className="col-span-2">
				<p className="text-xs text-muted-foreground">SWIFT Code</p>
				<p className="font-mono">{swiftCode}</p>
			</div>
		</CardContent>
	</Card>
);

export default function Main() {
	const company: CompanyDetailsProps = {
		name: 'Enterprise Solutions Ltd.',
		address: '1250 Technology Drive, Suite 400',
		city: 'San Jose, CA 95110',
		phone: '+1 (408) 555-0100',
		email: 'billing@enterprise.com',
		website: 'www.enterprise.com',
		taxId: '94-1234567',
	};

	const customer: CustomerDetailsProps = {
		name: 'Michael Thompson',
		company: 'Global Tech Industries',
		address: '500 Commerce Boulevard',
		city: 'Chicago, IL 60601',
		phone: '+1 (312) 555-0200',
		email: 'm.thompson@globaltech.com',
		customerNumber: 'CUST-2024-0089',
	};

	const metadata: InvoiceMetadataProps = {
		invoiceNumber: 'INV-2024-00456',
		invoiceDate: 'February 15, 2024',
		dueDate: 'March 15, 2024',
		poNumber: 'PO-2024-78901',
		terms: 'Net 30',
		status: 'Pending',
	};

	const items: LineItemProps[] = [
		{
			sku: 'SVC-001',
			description: 'Enterprise Software License - Annual',
			quantity: 25,
			unitPrice: 1200.0,
			discount: 10,
			taxRate: 8.5,
			total: 27000.0,
		},
		{
			sku: 'SVC-002',
			description: 'Implementation Services',
			quantity: 80,
			unitPrice: 175.0,
			discount: 0,
			taxRate: 8.5,
			total: 14000.0,
		},
		{
			sku: 'SVC-003',
			description: 'Training Sessions (Per Day)',
			quantity: 5,
			unitPrice: 2500.0,
			discount: 5,
			taxRate: 8.5,
			total: 11875.0,
		},
		{
			sku: 'HW-101',
			description: 'Server Hardware - Enterprise Grade',
			quantity: 2,
			unitPrice: 8500.0,
			discount: 0,
			taxRate: 8.5,
			total: 17000.0,
		},
	];

	const totals: InvoiceTotalsProps = {
		subtotal: 69875.0,
		totalDiscount: 5837.5,
		taxableAmount: 64037.5,
		taxAmount: 5443.19,
		shipping: 450.0,
		total: 69930.69,
		amountPaid: 20000.0,
		balanceDue: 49930.69,
		currency: '$',
	};

	const payment: PaymentInfoProps = {
		bankName: 'First National Bank',
		accountName: 'Enterprise Solutions Ltd.',
		accountNumber: '123456789012',
		routingNumber: '021000021',
		swiftCode: 'FNBAUS33',
	};

	return (
		<section className="@container">
			<div className="mx-auto max-w-5xl px-4 @sm:px-6 @2xl:px-8 py-8 @md:py-12">
				<div className="space-y-6">
					<div className="flex items-start justify-between">
						<CompanyDetails {...company} />
						<div className="text-right">
							<h1 className="text-3xl font-bold text-primary">INVOICE</h1>
							<p className="text-muted-foreground">{metadata.invoiceNumber}</p>
						</div>
					</div>
					<div className="grid @md:grid-cols-2 gap-4">
						<CustomerDetails {...customer} />
						<InvoiceMetadata {...metadata} />
					</div>
					<LineItemsTable items={items} currency="$" />
					<div className="grid @md:grid-cols-2 gap-4">
						<PaymentInfo {...payment} />
						<InvoiceTotals {...totals} />
					</div>
					<Card>
						<CardContent className="pt-6">
							<div className="flex items-center justify-between">
								<div className="text-sm text-muted-foreground">
									<p>Thank you for your business!</p>
									<p>Please include invoice number on all payments.</p>
								</div>
								<div className="flex gap-3">
									<Button variant="outline" className="gap-2">
										<Printer className="size-4" />
										Print
									</Button>
									<Button className="gap-2">
										<Download className="size-4" />
										Download PDF
									</Button>
								</div>
							</div>
						</CardContent>
					</Card>
				</div>
			</div>
		</section>
	);
}
