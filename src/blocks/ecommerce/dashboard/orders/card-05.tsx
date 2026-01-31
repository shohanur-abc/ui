import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Separator } from '@/components/ui/separator';
import { Package, CreditCard, MapPin, Mail, Phone, Printer, Download, RotateCcw } from 'lucide-react';

interface OrderItem {
	name: string;
	sku: string;
	quantity: number;
	price: string;
	image: string;
}

interface OrderInvoiceCardProps {
	order: {
		id: string;
		invoiceNumber: string;
		date: string;
		dueDate: string;
		customer: {
			name: string;
			email: string;
			phone: string;
			address: string;
			avatar: string;
			initials: string;
		};
		items: OrderItem[];
		subtotal: string;
		tax: string;
		shipping: string;
		discount: string;
		total: string;
		paymentMethod: string;
		paymentStatus: 'paid' | 'pending' | 'overdue';
	};
	labels: {
		billTo: string;
		items: string;
		subtotal: string;
		tax: string;
		shipping: string;
		discount: string;
		total: string;
		payment: string;
		print: string;
		download: string;
		refund: string;
	};
}

interface PaymentStatusBadgeProps {
	status: OrderInvoiceCardProps['order']['paymentStatus'];
}

const PaymentStatusBadge = ({ status }: PaymentStatusBadgeProps) => {
	const config: Record<typeof status, { variant: 'default' | 'secondary' | 'destructive'; label: string }> = {
		paid: { variant: 'default', label: 'Paid' },
		pending: { variant: 'secondary', label: 'Pending' },
		overdue: { variant: 'destructive', label: 'Overdue' },
	};
	return <Badge variant={config[status].variant}>{config[status].label}</Badge>;
};

const CustomerInfo = ({ customer, label }: { customer: OrderInvoiceCardProps['order']['customer']; label: string }) => (
	<div>
		<p className="text-xs font-medium text-muted-foreground uppercase tracking-wide mb-3">{label}</p>
		<div className="flex items-start gap-3">
			<Avatar className="size-10">
				<AvatarImage src={customer.avatar} alt={customer.name} />
				<AvatarFallback className="bg-primary/10 text-primary">{customer.initials}</AvatarFallback>
			</Avatar>
			<div className="space-y-1 text-sm">
				<p className="font-medium">{customer.name}</p>
				<p className="text-muted-foreground flex items-center gap-1.5">
					<Mail className="size-3" />
					{customer.email}
				</p>
				<p className="text-muted-foreground flex items-center gap-1.5">
					<Phone className="size-3" />
					{customer.phone}
				</p>
				<p className="text-muted-foreground flex items-center gap-1.5">
					<MapPin className="size-3" />
					{customer.address}
				</p>
			</div>
		</div>
	</div>
);

const InvoiceItemRow = ({ item }: { item: OrderItem }) => (
	<div className="flex items-center gap-4 py-3">
		<Avatar className="size-12 rounded-lg">
			<AvatarImage src={item.image} alt={item.name} />
			<AvatarFallback className="rounded-lg bg-muted text-xs">{item.name.substring(0, 2)}</AvatarFallback>
		</Avatar>
		<div className="flex-1">
			<p className="font-medium">{item.name}</p>
			<p className="text-xs text-muted-foreground">SKU: {item.sku} • Qty: {item.quantity}</p>
		</div>
		<span className="font-semibold">{item.price}</span>
	</div>
);

const TotalRow = ({ label, value, isTotal }: { label: string; value: string; isTotal?: boolean }) => (
	<div className={`flex justify-between ${isTotal ? 'text-lg font-bold pt-2 border-t border-border' : 'text-sm'}`}>
		<span className={isTotal ? '' : 'text-muted-foreground'}>{label}</span>
		<span>{value}</span>
	</div>
);

const OrderInvoiceCard = ({ order, labels }: OrderInvoiceCardProps) => (
	<Card className="border-border/50 bg-card/50 backdrop-blur-sm">
		<CardHeader className="border-b border-border/50">
			<div className="flex items-start justify-between">
				<div>
					<CardDescription>Invoice {order.invoiceNumber}</CardDescription>
					<CardTitle className="text-lg font-mono">{order.id}</CardTitle>
				</div>
				<div className="text-right">
					<p className="text-sm text-muted-foreground">Date: {order.date}</p>
					<p className="text-sm text-muted-foreground">Due: {order.dueDate}</p>
					<div className="mt-2">
						<PaymentStatusBadge status={order.paymentStatus} />
					</div>
				</div>
			</div>
		</CardHeader>
		<CardContent className="p-6 space-y-6">
			<CustomerInfo customer={order.customer} label={labels.billTo} />
			
			<div>
				<p className="text-xs font-medium text-muted-foreground uppercase tracking-wide mb-3">{labels.items}</p>
				<div className="divide-y divide-border/50">
					{order.items.map((item, i) => (
						<InvoiceItemRow key={i} item={item} />
					))}
				</div>
			</div>

			<Separator />

			<div className="space-y-2">
				<TotalRow label={labels.subtotal} value={order.subtotal} />
				<TotalRow label={labels.tax} value={order.tax} />
				<TotalRow label={labels.shipping} value={order.shipping} />
				<TotalRow label={labels.discount} value={order.discount} />
				<TotalRow label={labels.total} value={order.total} isTotal />
			</div>

			<div className="flex items-center gap-2 pt-4">
				<div className="flex items-center gap-2 text-sm text-muted-foreground">
					<CreditCard className="size-4" />
					<span>{order.paymentMethod}</span>
				</div>
			</div>

			<div className="flex gap-3">
				<Button variant="outline" className="flex-1 gap-1.5">
					<Printer className="size-4" />
					{labels.print}
				</Button>
				<Button variant="outline" className="flex-1 gap-1.5">
					<Download className="size-4" />
					{labels.download}
				</Button>
				<Button variant="ghost" className="gap-1.5 text-muted-foreground">
					<RotateCcw className="size-4" />
					{labels.refund}
				</Button>
			</div>
		</CardContent>
	</Card>
);

export default function Main() {
	const labels = {
		billTo: 'Bill To',
		items: 'Items',
		subtotal: 'Subtotal',
		tax: 'Tax (8%)',
		shipping: 'Shipping',
		discount: 'Discount',
		total: 'Total',
		payment: 'Payment',
		print: 'Print',
		download: 'Download',
		refund: 'Refund',
	};

	const order = {
		id: 'ORD-2024-001',
		invoiceNumber: 'INV-2024-001',
		date: 'Jan 25, 2026',
		dueDate: 'Feb 25, 2026',
		customer: {
			name: 'John Smith',
			email: 'john.smith@email.com',
			phone: '+1 (555) 123-4567',
			address: '123 Main St, New York, NY 10001',
			avatar: '',
			initials: 'JS',
		},
		items: [
			{ name: 'Wireless Headphones Pro', sku: 'WHP-001', quantity: 1, price: '$199.00', image: '' },
			{ name: 'USB-C Charging Cable', sku: 'UCC-002', quantity: 2, price: '$29.98', image: '' },
		],
		subtotal: '$228.98',
		tax: '$18.32',
		shipping: '$9.99',
		discount: '-$20.00',
		total: '$237.29',
		paymentMethod: 'Visa ending in 4242',
		paymentStatus: 'paid' as const,
	};

	return (
		<section className="@container" data-theme="orders">
			<div className="mx-auto max-w-lg px-4 @sm:px-6 @2xl:px-8 py-8 @md:py-10 @xl:py-12">
				<OrderInvoiceCard order={order} labels={labels} />
			</div>
		</section>
	);
}
