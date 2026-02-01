import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import {
	Card,
	CardContent,
	CardHeader,
	CardTitle,
	CardFooter,
} from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import {
	Package,
	Truck,
	MapPin,
	CreditCard,
	User,
	Calendar,
	Copy,
	Printer,
	Download,
} from 'lucide-react';

interface OrderDetailProps {
	order: {
		id: string;
		status: 'pending' | 'processing' | 'shipped' | 'delivered';
		customer: { name: string; email: string; phone: string };
		shipping: { address: string; city: string; country: string; zip: string };
		billing: { method: string; last4: string };
		dates: { placed: string; shipped?: string; delivered?: string };
		items: { name: string; sku: string; quantity: number; price: string }[];
		totals: { subtotal: string; shipping: string; tax: string; total: string };
	};
	labels: {
		customer: string;
		shipping: string;
		billing: string;
		items: string;
		summary: string;
		print: string;
		download: string;
	};
}

interface InfoRowProps {
	icon: React.ComponentType<{ className?: string }>;
	label: string;
	value: string;
	copyable?: boolean;
}

const StatusBadge = ({
	status,
}: {
	status: OrderDetailProps['order']['status'];
}) => {
	const config = {
		pending: 'bg-yellow-500/10 text-yellow-600 border-yellow-500/30',
		processing: 'bg-blue-500/10 text-blue-500 border-blue-500/30',
		shipped: 'bg-primary/10 text-primary border-primary/30',
		delivered: 'bg-accent/10 text-accent border-accent/30',
	};
	return (
		<Badge variant="outline" className={`capitalize ${config[status]}`}>
			{status}
		</Badge>
	);
};

const InfoRow = ({ icon: Icon, label, value, copyable }: InfoRowProps) => (
	<div className="flex items-start gap-3">
		<Icon className="size-4 text-muted-foreground mt-0.5" />
		<div className="flex-1">
			<p className="text-xs text-muted-foreground">{label}</p>
			<p className="font-medium">{value}</p>
		</div>
		{copyable && (
			<Button variant="ghost" size="icon-sm" className="size-6">
				<Copy className="size-3" />
			</Button>
		)}
	</div>
);

const OrderDetail = ({ order, labels }: OrderDetailProps) => (
	<Card className="border-border/50 bg-card/50 backdrop-blur-sm">
		<CardHeader className="pb-4">
			<div className="flex items-center justify-between">
				<div>
					<CardTitle className="text-lg font-mono">{order.id}</CardTitle>
					<p className="text-sm text-muted-foreground">
						Placed {order.dates.placed}
					</p>
				</div>
				<StatusBadge status={order.status} />
			</div>
		</CardHeader>
		<CardContent className="space-y-6">
			<div className="grid grid-cols-1 @md:grid-cols-2 gap-6">
				<div className="space-y-4">
					<h3 className="text-sm font-semibold text-muted-foreground">
						{labels.customer}
					</h3>
					<InfoRow icon={User} label="Name" value={order.customer.name} />
					<InfoRow
						icon={User}
						label="Email"
						value={order.customer.email}
						copyable
					/>
					<InfoRow icon={User} label="Phone" value={order.customer.phone} />
				</div>

				<div className="space-y-4">
					<h3 className="text-sm font-semibold text-muted-foreground">
						{labels.shipping}
					</h3>
					<InfoRow
						icon={MapPin}
						label="Address"
						value={`${order.shipping.address}, ${order.shipping.city}`}
					/>
					<InfoRow
						icon={MapPin}
						label="Country"
						value={`${order.shipping.country} ${order.shipping.zip}`}
					/>
					<InfoRow
						icon={CreditCard}
						label="Payment"
						value={`${order.billing.method} •••• ${order.billing.last4}`}
					/>
				</div>
			</div>

			<Separator />

			<div>
				<h3 className="text-sm font-semibold text-muted-foreground mb-4">
					{labels.items}
				</h3>
				<div className="space-y-3">
					{order.items.map((item, i) => (
						<div
							key={i}
							className="flex items-center gap-4 p-3 rounded-lg bg-muted/30"
						>
							<div className="size-12 rounded-lg bg-muted flex items-center justify-center">
								<Package className="size-6 text-muted-foreground" />
							</div>
							<div className="flex-1">
								<p className="font-medium">{item.name}</p>
								<p className="text-xs text-muted-foreground font-mono">
									{item.sku}
								</p>
							</div>
							<p className="text-sm text-muted-foreground">× {item.quantity}</p>
							<p className="font-semibold">{item.price}</p>
						</div>
					))}
				</div>
			</div>

			<Separator />

			<div className="space-y-2">
				<div className="flex justify-between text-sm">
					<span className="text-muted-foreground">Subtotal</span>
					<span>{order.totals.subtotal}</span>
				</div>
				<div className="flex justify-between text-sm">
					<span className="text-muted-foreground">Shipping</span>
					<span>{order.totals.shipping}</span>
				</div>
				<div className="flex justify-between text-sm">
					<span className="text-muted-foreground">Tax</span>
					<span>{order.totals.tax}</span>
				</div>
				<Separator />
				<div className="flex justify-between text-lg font-bold">
					<span>Total</span>
					<span>{order.totals.total}</span>
				</div>
			</div>
		</CardContent>
		<CardFooter className="gap-3 border-t border-border/50">
			<Button variant="outline" className="gap-1.5">
				<Printer className="size-4" />
				{labels.print}
			</Button>
			<Button variant="outline" className="gap-1.5">
				<Download className="size-4" />
				{labels.download}
			</Button>
		</CardFooter>
	</Card>
);

export default function Main() {
	const labels = {
		customer: 'Customer',
		shipping: 'Shipping',
		billing: 'Billing',
		items: 'Items',
		summary: 'Summary',
		print: 'Print',
		download: 'Download',
	};

	const order = {
		id: 'ORD-2024-001',
		status: 'shipped' as const,
		customer: {
			name: 'John Smith',
			email: 'john@email.com',
			phone: '+1 (555) 123-4567',
		},
		shipping: {
			address: '123 Main Street, Apt 4B',
			city: 'New York, NY',
			country: 'United States',
			zip: '10001',
		},
		billing: { method: 'Visa', last4: '4242' },
		dates: { placed: 'Jan 26, 2024', shipped: 'Jan 28, 2024' },
		items: [
			{
				name: 'Wireless Bluetooth Headphones',
				sku: 'SKU-WBH-001',
				quantity: 1,
				price: '$159.00',
			},
			{
				name: 'USB-C Charging Cable',
				sku: 'SKU-UCC-003',
				quantity: 2,
				price: '$24.99',
			},
		],
		totals: {
			subtotal: '$183.99',
			shipping: '$9.99',
			tax: '$15.52',
			total: '$209.50',
		},
	};

	return (
		<section className="@container" data-theme="orders">
			<div className="mx-auto max-w-2xl px-4 @sm:px-6 @2xl:px-8 py-8 @md:py-10 @xl:py-12">
				<OrderDetail order={order} labels={labels} />
			</div>
		</section>
	);
}
