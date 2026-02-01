import {
	Table,
	TableBody,
	TableCell,
	TableHead,
	TableHeader,
	TableRow,
} from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import {
	Collapsible,
	CollapsibleContent,
	CollapsibleTrigger,
} from '@/components/ui/collapsible';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Separator } from '@/components/ui/separator';
import { ChevronDown, Package, MapPin, CreditCard, Phone } from 'lucide-react';

interface OrderItem {
	name: string;
	sku: string;
	quantity: number;
	price: string;
	image: string;
}

interface Order {
	id: string;
	customer: { name: string; email: string; phone: string; initials: string };
	items: OrderItem[];
	subtotal: string;
	shipping: string;
	total: string;
	status: 'processing' | 'shipped' | 'delivered';
	address: string;
	paymentMethod: string;
	date: string;
}

interface ExpandedDetailsProps {
	order: Order;
	labels: {
		itemsTitle: string;
		shippingTitle: string;
		paymentTitle: string;
		subtotalLabel: string;
		shippingLabel: string;
		totalLabel: string;
	};
}

interface ItemRowProps {
	item: OrderItem;
}

const StatusBadge = ({ status }: { status: Order['status'] }) => {
	const variants: Record<Order['status'], 'default' | 'secondary' | 'outline'> =
		{
			processing: 'secondary',
			shipped: 'default',
			delivered: 'default',
		};
	return (
		<Badge variant={variants[status]} className="capitalize">
			{status}
		</Badge>
	);
};

const ItemRow = ({ item }: ItemRowProps) => (
	<div className="flex items-center gap-4 py-3">
		<Avatar className="size-12 rounded-lg">
			<AvatarImage src={item.image} alt={item.name} />
			<AvatarFallback className="rounded-lg bg-muted text-xs">
				{item.name.substring(0, 2)}
			</AvatarFallback>
		</Avatar>
		<div className="flex-1 min-w-0">
			<p className="font-medium truncate">{item.name}</p>
			<p className="text-xs text-muted-foreground">SKU: {item.sku}</p>
		</div>
		<div className="text-right">
			<p className="font-medium">{item.price}</p>
			<p className="text-xs text-muted-foreground">Qty: {item.quantity}</p>
		</div>
	</div>
);

const ExpandedDetails = ({ order, labels }: ExpandedDetailsProps) => (
	<div className="px-6 py-4 bg-muted/20 border-t border-border/50">
		<div className="grid @md:grid-cols-3 gap-6">
			<div>
				<h4 className="text-sm font-semibold mb-3 flex items-center gap-2">
					<Package className="size-4 text-primary" />
					{labels.itemsTitle}
				</h4>
				<div className="space-y-1 divide-y divide-border/50">
					{order.items.map((item, i) => (
						<ItemRow key={i} item={item} />
					))}
				</div>
				<Separator className="my-3" />
				<div className="space-y-1.5 text-sm">
					<div className="flex justify-between">
						<span className="text-muted-foreground">
							{labels.subtotalLabel}
						</span>
						<span>{order.subtotal}</span>
					</div>
					<div className="flex justify-between">
						<span className="text-muted-foreground">
							{labels.shippingLabel}
						</span>
						<span>{order.shipping}</span>
					</div>
					<div className="flex justify-between font-semibold pt-1.5 border-t border-border/50">
						<span>{labels.totalLabel}</span>
						<span>{order.total}</span>
					</div>
				</div>
			</div>
			<div>
				<h4 className="text-sm font-semibold mb-3 flex items-center gap-2">
					<MapPin className="size-4 text-primary" />
					{labels.shippingTitle}
				</h4>
				<div className="space-y-2 text-sm">
					<p className="font-medium">{order.customer.name}</p>
					<p className="text-muted-foreground whitespace-pre-line">
						{order.address}
					</p>
					<p className="flex items-center gap-2 text-muted-foreground">
						<Phone className="size-3.5" />
						{order.customer.phone}
					</p>
				</div>
			</div>
			<div>
				<h4 className="text-sm font-semibold mb-3 flex items-center gap-2">
					<CreditCard className="size-4 text-primary" />
					{labels.paymentTitle}
				</h4>
				<div className="space-y-2 text-sm">
					<p className="text-muted-foreground">{order.paymentMethod}</p>
					<Badge
						variant="outline"
						className="bg-accent/10 text-accent border-accent/20"
					>
						Paid
					</Badge>
				</div>
			</div>
		</div>
	</div>
);

const ExpandableOrderRow = ({
	order,
	labels,
}: {
	order: Order;
	labels: ExpandedDetailsProps['labels'];
}) => (
	<Collapsible asChild>
		<>
			<TableRow className="hover:bg-muted/30 transition-colors">
				<TableCell>
					<CollapsibleTrigger asChild>
						<Button
							variant="ghost"
							size="icon-sm"
							className="hover:bg-muted data-[state=open]:rotate-180 transition-transform"
						>
							<ChevronDown className="size-4" />
						</Button>
					</CollapsibleTrigger>
				</TableCell>
				<TableCell className="font-mono text-sm">{order.id}</TableCell>
				<TableCell className="font-medium">{order.customer.name}</TableCell>
				<TableCell className="text-muted-foreground">
					{order.customer.email}
				</TableCell>
				<TableCell className="font-semibold">{order.total}</TableCell>
				<TableCell>
					<StatusBadge status={order.status} />
				</TableCell>
				<TableCell className="text-muted-foreground">{order.date}</TableCell>
			</TableRow>
			<CollapsibleContent asChild>
				<tr>
					<td colSpan={7} className="p-0">
						<ExpandedDetails order={order} labels={labels} />
					</td>
				</tr>
			</CollapsibleContent>
		</>
	</Collapsible>
);

export default function Main() {
	const labels = {
		itemsTitle: 'Order Items',
		shippingTitle: 'Shipping Address',
		paymentTitle: 'Payment Method',
		subtotalLabel: 'Subtotal',
		shippingLabel: 'Shipping',
		totalLabel: 'Total',
	};

	const orders: Order[] = [
		{
			id: 'ORD-5001',
			customer: {
				name: 'Alex Johnson',
				email: 'alex@example.com',
				phone: '+1 (555) 123-4567',
				initials: 'AJ',
			},
			items: [
				{
					name: 'Wireless Mouse Pro',
					sku: 'WMP-001',
					quantity: 1,
					price: '$79.99',
					image: '',
				},
				{
					name: 'USB-C Cable 2m',
					sku: 'USC-002',
					quantity: 2,
					price: '$29.98',
					image: '',
				},
			],
			subtotal: '$109.97',
			shipping: '$9.99',
			total: '$119.96',
			status: 'delivered',
			address: '123 Main Street\nApt 4B\nNew York, NY 10001',
			paymentMethod: 'Visa ending in 4242',
			date: 'Jan 28, 2026',
		},
		{
			id: 'ORD-5002',
			customer: {
				name: 'Sarah Miller',
				email: 'sarah@example.com',
				phone: '+1 (555) 987-6543',
				initials: 'SM',
			},
			items: [
				{
					name: 'Mechanical Keyboard',
					sku: 'MKB-003',
					quantity: 1,
					price: '$149.00',
					image: '',
				},
			],
			subtotal: '$149.00',
			shipping: '$0.00',
			total: '$149.00',
			status: 'shipped',
			address: '456 Oak Avenue\nLos Angeles, CA 90001',
			paymentMethod: 'PayPal',
			date: 'Jan 27, 2026',
		},
		{
			id: 'ORD-5003',
			customer: {
				name: 'Mike Davis',
				email: 'mike@example.com',
				phone: '+1 (555) 456-7890',
				initials: 'MD',
			},
			items: [
				{
					name: 'Monitor Stand',
					sku: 'MST-004',
					quantity: 1,
					price: '$89.00',
					image: '',
				},
				{
					name: 'Desk Lamp LED',
					sku: 'DLL-005',
					quantity: 1,
					price: '$45.00',
					image: '',
				},
				{
					name: 'Mouse Pad XL',
					sku: 'MPX-006',
					quantity: 1,
					price: '$25.00',
					image: '',
				},
			],
			subtotal: '$159.00',
			shipping: '$12.99',
			total: '$171.99',
			status: 'processing',
			address: '789 Pine Road\nSuite 100\nChicago, IL 60601',
			paymentMethod: 'Mastercard ending in 5555',
			date: 'Jan 27, 2026',
		},
	];

	const headers = ['', 'Order', 'Customer', 'Email', 'Total', 'Status', 'Date'];

	return (
		<section className="@container" data-theme="orders">
			<div className="mx-auto max-w-7xl px-4 @sm:px-6 @2xl:px-8 py-8 @md:py-10 @xl:py-12">
				<div className="rounded-xl border border-border/50 overflow-hidden bg-card/50 backdrop-blur-sm">
					<Table>
						<TableHeader>
							<TableRow className="bg-muted/30 hover:bg-muted/30 border-border/50">
								{headers.map((header) => (
									<TableHead key={header}>{header}</TableHead>
								))}
							</TableRow>
						</TableHeader>
						<TableBody>
							{orders.map((order) => (
								<ExpandableOrderRow
									key={order.id}
									order={order}
									labels={labels}
								/>
							))}
						</TableBody>
					</Table>
				</div>
			</div>
		</section>
	);
}
