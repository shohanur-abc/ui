import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle, CardFooter } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import { Receipt, Download, Printer, Mail, Building, User, Calendar, FileText, ExternalLink, CheckCircle } from 'lucide-react';

interface InvoiceDetailProps {
	invoice: {
		id: string;
		orderId: string;
		status: 'draft' | 'sent' | 'paid' | 'overdue';
		issueDate: string;
		dueDate: string;
		paidDate?: string;
		seller: { name: string; address: string; taxId: string };
		buyer: { name: string; email: string; address: string };
		items: { description: string; quantity: number; unitPrice: string; total: string }[];
		totals: { subtotal: string; tax: string; taxRate: string; discount?: string; total: string };
		paymentTerms: string;
		notes?: string;
	};
	labels: {
		from: string;
		to: string;
		items: string;
		subtotal: string;
		tax: string;
		discount: string;
		total: string;
		download: string;
		print: string;
		send: string;
	};
}

const StatusBadge = ({ status }: { status: InvoiceDetailProps['invoice']['status'] }) => {
	const config = {
		draft: { className: 'bg-muted text-muted-foreground border-border', label: 'Draft' },
		sent: { className: 'bg-blue-500/10 text-blue-500 border-blue-500/30', label: 'Sent' },
		paid: { className: 'bg-accent/10 text-accent border-accent/30', label: 'Paid' },
		overdue: { className: 'bg-destructive/10 text-destructive border-destructive/30', label: 'Overdue' },
	};
	const { className, label } = config[status];
	return <Badge variant="outline" className={className}>{label}</Badge>;
};

const InvoiceDetail = ({ invoice, labels }: InvoiceDetailProps) => (
	<Card className="border-border/50 bg-card/50 backdrop-blur-sm">
		<CardHeader className="border-b border-border/50">
			<div className="flex items-start justify-between">
				<div className="flex items-center gap-3">
					<div className="size-12 rounded-xl bg-primary/10 flex items-center justify-center">
						<Receipt className="size-6 text-primary" />
					</div>
					<div>
						<CardTitle className="text-2xl">{invoice.id}</CardTitle>
						<p className="text-sm text-muted-foreground">Order {invoice.orderId}</p>
					</div>
				</div>
				<div className="text-right">
					<StatusBadge status={invoice.status} />
					{invoice.status === 'paid' && invoice.paidDate && (
						<p className="text-xs text-accent mt-1 flex items-center gap-1 justify-end">
							<CheckCircle className="size-3" />
							Paid on {invoice.paidDate}
						</p>
					)}
				</div>
			</div>
		</CardHeader>

		<CardContent className="pt-6 space-y-6">
			<div className="grid grid-cols-2 gap-6">
				<div className="space-y-2">
					<div className="flex items-center gap-2 text-sm text-muted-foreground">
						<Building className="size-4" />
						{labels.from}
					</div>
					<div className="p-4 rounded-xl bg-muted/20 border border-border/50">
						<p className="font-semibold">{invoice.seller.name}</p>
						<p className="text-sm text-muted-foreground whitespace-pre-line">{invoice.seller.address}</p>
						<p className="text-xs text-muted-foreground mt-2">Tax ID: {invoice.seller.taxId}</p>
					</div>
				</div>

				<div className="space-y-2">
					<div className="flex items-center gap-2 text-sm text-muted-foreground">
						<User className="size-4" />
						{labels.to}
					</div>
					<div className="p-4 rounded-xl bg-muted/20 border border-border/50">
						<p className="font-semibold">{invoice.buyer.name}</p>
						<p className="text-sm text-muted-foreground">{invoice.buyer.email}</p>
						<p className="text-sm text-muted-foreground mt-1 whitespace-pre-line">{invoice.buyer.address}</p>
					</div>
				</div>
			</div>

			<div className="grid grid-cols-3 gap-4">
				<div className="p-3 rounded-lg bg-muted/30 text-center">
					<Calendar className="size-4 text-muted-foreground mx-auto mb-1" />
					<p className="text-xs text-muted-foreground">Issue Date</p>
					<p className="font-medium">{invoice.issueDate}</p>
				</div>
				<div className={`p-3 rounded-lg text-center ${invoice.status === 'overdue' ? 'bg-destructive/10 border border-destructive/20' : 'bg-muted/30'}`}>
					<Calendar className={`size-4 mx-auto mb-1 ${invoice.status === 'overdue' ? 'text-destructive' : 'text-muted-foreground'}`} />
					<p className="text-xs text-muted-foreground">Due Date</p>
					<p className={`font-medium ${invoice.status === 'overdue' ? 'text-destructive' : ''}`}>{invoice.dueDate}</p>
				</div>
				<div className="p-3 rounded-lg bg-muted/30 text-center">
					<FileText className="size-4 text-muted-foreground mx-auto mb-1" />
					<p className="text-xs text-muted-foreground">Terms</p>
					<p className="font-medium">{invoice.paymentTerms}</p>
				</div>
			</div>

			<div>
				<p className="text-sm font-semibold text-muted-foreground mb-3">{labels.items}</p>
				<div className="rounded-xl border border-border/50 overflow-hidden">
					<table className="w-full">
						<thead className="bg-muted/30">
							<tr>
								<th className="text-left text-xs font-medium text-muted-foreground px-4 py-3">Description</th>
								<th className="text-center text-xs font-medium text-muted-foreground px-4 py-3">Qty</th>
								<th className="text-right text-xs font-medium text-muted-foreground px-4 py-3">Unit Price</th>
								<th className="text-right text-xs font-medium text-muted-foreground px-4 py-3">Total</th>
							</tr>
						</thead>
						<tbody>
							{invoice.items.map((item, i) => (
								<tr key={i} className="border-t border-border/30">
									<td className="px-4 py-3 text-sm">{item.description}</td>
									<td className="px-4 py-3 text-sm text-center">{item.quantity}</td>
									<td className="px-4 py-3 text-sm text-right">{item.unitPrice}</td>
									<td className="px-4 py-3 text-sm font-medium text-right">{item.total}</td>
								</tr>
							))}
						</tbody>
					</table>
				</div>
			</div>

			<div className="flex justify-end">
				<div className="w-72 space-y-2">
					<div className="flex justify-between text-sm">
						<span className="text-muted-foreground">{labels.subtotal}</span>
						<span>{invoice.totals.subtotal}</span>
					</div>
					<div className="flex justify-between text-sm">
						<span className="text-muted-foreground">{labels.tax} ({invoice.totals.taxRate})</span>
						<span>{invoice.totals.tax}</span>
					</div>
					{invoice.totals.discount && (
						<div className="flex justify-between text-sm text-accent">
							<span>{labels.discount}</span>
							<span>-{invoice.totals.discount}</span>
						</div>
					)}
					<Separator />
					<div className="flex justify-between text-lg font-bold">
						<span>{labels.total}</span>
						<span className="text-accent">{invoice.totals.total}</span>
					</div>
				</div>
			</div>

			{invoice.notes && (
				<div className="p-4 rounded-xl bg-muted/20 border border-border/50">
					<p className="text-sm font-medium mb-1">Notes</p>
					<p className="text-sm text-muted-foreground">{invoice.notes}</p>
				</div>
			)}
		</CardContent>

		<CardFooter className="gap-3 border-t border-border/50">
			<Button variant="outline" className="flex-1 gap-1.5">
				<Download className="size-4" />
				{labels.download}
			</Button>
			<Button variant="outline" className="flex-1 gap-1.5">
				<Printer className="size-4" />
				{labels.print}
			</Button>
			<Button className="flex-1 gap-1.5">
				<Mail className="size-4" />
				{labels.send}
			</Button>
		</CardFooter>
	</Card>
);

export default function Main() {
	const labels = {
		from: 'From',
		to: 'Bill To',
		items: 'Line Items',
		subtotal: 'Subtotal',
		tax: 'Tax',
		discount: 'Discount',
		total: 'Total Due',
		download: 'Download',
		print: 'Print',
		send: 'Send',
	};

	const invoice = {
		id: 'INV-2024-001',
		orderId: 'ORD-2024-001',
		status: 'paid' as const,
		issueDate: 'Jan 26, 2024',
		dueDate: 'Feb 25, 2024',
		paidDate: 'Jan 30, 2024',
		seller: { name: 'TechStore Inc.', address: '100 Tech Boulevard\nSuite 500\nSan Francisco, CA 94105', taxId: 'US-12-3456789' },
		buyer: { name: 'John Smith', email: 'john@email.com', address: '123 Main Street, Apt 4B\nNew York, NY 10001' },
		items: [
			{ description: 'Wireless Bluetooth Headphones Pro', quantity: 1, unitPrice: '$159.00', total: '$159.00' },
			{ description: 'USB-C Charging Cable (6ft)', quantity: 2, unitPrice: '$12.50', total: '$25.00' },
		],
		totals: { subtotal: '$184.00', tax: '$14.72', taxRate: '8%', discount: '$10.00', total: '$188.72' },
		paymentTerms: 'Net 30',
		notes: 'Thank you for your business! For any questions regarding this invoice, please contact support@techstore.com',
	};

	return (
		<section className="@container" data-theme="orders">
			<div className="mx-auto max-w-3xl px-4 @sm:px-6 @2xl:px-8 py-8 @md:py-10 @xl:py-12">
				<InvoiceDetail invoice={invoice} labels={labels} />
			</div>
		</section>
	);
}
