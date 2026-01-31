import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Checkbox } from '@/components/ui/checkbox';
import { Package, MoreVertical, Eye, Printer, Trash2 } from 'lucide-react';
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuItem,
	DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';

interface OrderItem {
	id: string;
	product: string;
	sku: string;
	quantity: number;
	price: string;
	status: 'pending' | 'ready' | 'packed';
	image?: string;
}

interface OrderListCompactProps {
	orders: OrderItem[];
	onSelect?: (id: string, checked: boolean) => void;
	labels: {
		qty: string;
		view: string;
		print: string;
		delete: string;
	};
}

interface OrderRowProps {
	order: OrderItem;
	labels: OrderListCompactProps['labels'];
}

const StatusDot = ({ status }: { status: OrderItem['status'] }) => {
	const colors: Record<OrderItem['status'], string> = {
		pending: 'bg-yellow-500',
		ready: 'bg-accent',
		packed: 'bg-primary',
	};
	return <span className={`size-2 rounded-full ${colors[status]}`} />;
};

const OrderRow = ({ order, labels }: OrderRowProps) => (
	<div className="flex items-center gap-3 py-3 px-4 hover:bg-muted/30 transition-colors border-b border-border/50 last:border-b-0">
		<Checkbox id={order.id} className="data-[state=checked]:bg-primary" />
		
		<div className="size-10 rounded-lg bg-muted/50 border border-border/50 flex items-center justify-center">
			{order.image ? (
				<img src={order.image} alt="" className="size-full object-cover rounded-lg" />
			) : (
				<Package className="size-5 text-muted-foreground" />
			)}
		</div>

		<div className="flex-1 min-w-0">
			<p className="font-medium text-sm truncate">{order.product}</p>
			<p className="text-xs text-muted-foreground font-mono">{order.sku}</p>
		</div>

		<div className="flex items-center gap-2">
			<StatusDot status={order.status} />
			<span className="text-xs capitalize text-muted-foreground">{order.status}</span>
		</div>

		<Badge variant="secondary" className="font-mono text-xs">
			{labels.qty}: {order.quantity}
		</Badge>

		<span className="font-semibold min-w-[80px] text-right">{order.price}</span>

		<DropdownMenu>
			<DropdownMenuTrigger asChild>
				<Button variant="ghost" size="icon-sm">
					<MoreVertical className="size-4" />
				</Button>
			</DropdownMenuTrigger>
			<DropdownMenuContent align="end">
				<DropdownMenuItem className="gap-2">
					<Eye className="size-4" />
					{labels.view}
				</DropdownMenuItem>
				<DropdownMenuItem className="gap-2">
					<Printer className="size-4" />
					{labels.print}
				</DropdownMenuItem>
				<DropdownMenuItem className="gap-2 text-destructive">
					<Trash2 className="size-4" />
					{labels.delete}
				</DropdownMenuItem>
			</DropdownMenuContent>
		</DropdownMenu>
	</div>
);

export default function Main() {
	const labels = { qty: 'Qty', view: 'View Details', print: 'Print Label', delete: 'Delete' };

	const orders: OrderItem[] = [
		{ id: 'ITM-001', product: 'Wireless Bluetooth Headphones', sku: 'SKU-WBH-001', quantity: 2, price: '$159.98', status: 'pending' },
		{ id: 'ITM-002', product: 'USB-C Charging Cable 3-Pack', sku: 'SKU-UCC-003', quantity: 1, price: '$24.99', status: 'ready' },
		{ id: 'ITM-003', product: 'Laptop Stand Adjustable', sku: 'SKU-LSA-007', quantity: 1, price: '$89.00', status: 'packed' },
		{ id: 'ITM-004', product: 'Mechanical Keyboard RGB', sku: 'SKU-MKR-012', quantity: 1, price: '$149.00', status: 'pending' },
		{ id: 'ITM-005', product: 'Wireless Mouse Ergonomic', sku: 'SKU-WME-005', quantity: 3, price: '$119.97', status: 'ready' },
		{ id: 'ITM-006', product: 'Monitor Light Bar', sku: 'SKU-MLB-002', quantity: 1, price: '$69.99', status: 'packed' },
	];

	return (
		<section className="@container" data-theme="orders">
			<div className="mx-auto max-w-3xl px-4 @sm:px-6 @2xl:px-8 py-8 @md:py-10 @xl:py-12">
				<div className="rounded-xl border border-border/50 bg-card/50 backdrop-blur-sm overflow-hidden">
					{orders.map((order) => (
						<OrderRow key={order.id} order={order} labels={labels} />
					))}
				</div>
			</div>
		</section>
	);
}
