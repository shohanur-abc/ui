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
import { Input } from '@/components/ui/input';
import { Checkbox } from '@/components/ui/checkbox';
import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from '@/components/ui/select';
import { Search, Filter, Download, RefreshCw, ArrowUpDown } from 'lucide-react';

interface Order {
	id: string;
	product: string;
	quantity: number;
	amount: string;
	status: 'pending' | 'confirmed' | 'shipped' | 'delivered' | 'returned';
	payment: 'paid' | 'unpaid' | 'refunded';
	date: string;
}

interface ToolbarProps {
	searchPlaceholder: string;
	filterLabel: string;
	exportLabel: string;
	refreshLabel: string;
}

interface SortableHeaderProps {
	label: string;
	sortable?: boolean;
}

interface PaymentBadgeProps {
	payment: Order['payment'];
}

interface StatusBadgeProps {
	status: Order['status'];
}

const Toolbar = ({
	searchPlaceholder,
	filterLabel,
	exportLabel,
	refreshLabel,
}: ToolbarProps) => (
	<div className="flex flex-col @sm:flex-row gap-3 @sm:items-center @sm:justify-between mb-6">
		<div className="relative flex-1 max-w-sm">
			<Search className="absolute left-3 top-1/2 -translate-y-1/2 size-4 text-muted-foreground" />
			<Input placeholder={searchPlaceholder} className="pl-9 bg-muted/50" />
		</div>
		<div className="flex items-center gap-2">
			<Select defaultValue="all">
				<SelectTrigger className="w-32 bg-muted/50">
					<Filter className="size-4 mr-2" />
					<SelectValue placeholder={filterLabel} />
				</SelectTrigger>
				<SelectContent>
					<SelectItem value="all">All</SelectItem>
					<SelectItem value="pending">Pending</SelectItem>
					<SelectItem value="confirmed">Confirmed</SelectItem>
					<SelectItem value="shipped">Shipped</SelectItem>
				</SelectContent>
			</Select>
			<Button variant="outline" size="sm" className="gap-1.5">
				<Download className="size-4" />
				<span className="hidden @md:inline">{exportLabel}</span>
			</Button>
			<Button variant="ghost" size="icon-sm">
				<RefreshCw className="size-4" />
				<span className="sr-only">{refreshLabel}</span>
			</Button>
		</div>
	</div>
);

const SortableHeader = ({ label, sortable = true }: SortableHeaderProps) => (
	<TableHead>
		<button className="flex items-center gap-1 hover:text-foreground transition-colors">
			{label}
			{sortable && <ArrowUpDown className="size-3" />}
		</button>
	</TableHead>
);

const StatusBadge = ({ status }: StatusBadgeProps) => {
	const variants: Record<
		Order['status'],
		'default' | 'secondary' | 'destructive' | 'outline'
	> = {
		pending: 'outline',
		confirmed: 'secondary',
		shipped: 'default',
		delivered: 'default',
		returned: 'destructive',
	};
	return (
		<Badge variant={variants[status]} className="capitalize">
			{status}
		</Badge>
	);
};

const PaymentBadge = ({ payment }: PaymentBadgeProps) => {
	const config: Record<Order['payment'], { className: string }> = {
		paid: { className: 'bg-accent/20 text-accent border-accent/30' },
		unpaid: {
			className: 'bg-destructive/20 text-destructive border-destructive/30',
		},
		refunded: { className: 'bg-muted text-muted-foreground' },
	};
	return (
		<Badge
			variant="outline"
			className={`capitalize ${config[payment].className}`}
		>
			{payment}
		</Badge>
	);
};

const OrderRow = ({ order }: { order: Order }) => (
	<TableRow className="hover:bg-muted/30 transition-colors">
		<TableCell>
			<Checkbox />
		</TableCell>
		<TableCell className="font-mono text-sm">{order.id}</TableCell>
		<TableCell className="font-medium">{order.product}</TableCell>
		<TableCell className="text-center">{order.quantity}</TableCell>
		<TableCell className="font-semibold">{order.amount}</TableCell>
		<TableCell>
			<StatusBadge status={order.status} />
		</TableCell>
		<TableCell>
			<PaymentBadge payment={order.payment} />
		</TableCell>
		<TableCell className="text-muted-foreground text-sm">
			{order.date}
		</TableCell>
	</TableRow>
);

export default function Main() {
	const orders: Order[] = [
		{
			id: 'INV-2401',
			product: 'Wireless Headphones Pro',
			quantity: 2,
			amount: '$299.00',
			status: 'delivered',
			payment: 'paid',
			date: 'Jan 28, 2026',
		},
		{
			id: 'INV-2402',
			product: 'Smart Watch Ultra',
			quantity: 1,
			amount: '$499.00',
			status: 'shipped',
			payment: 'paid',
			date: 'Jan 27, 2026',
		},
		{
			id: 'INV-2403',
			product: 'Laptop Stand Adjustable',
			quantity: 3,
			amount: '$89.97',
			status: 'confirmed',
			payment: 'unpaid',
			date: 'Jan 27, 2026',
		},
		{
			id: 'INV-2404',
			product: 'USB-C Hub 7-in-1',
			quantity: 1,
			amount: '$59.99',
			status: 'pending',
			payment: 'unpaid',
			date: 'Jan 26, 2026',
		},
		{
			id: 'INV-2405',
			product: 'Mechanical Keyboard RGB',
			quantity: 1,
			amount: '$149.00',
			status: 'returned',
			payment: 'refunded',
			date: 'Jan 25, 2026',
		},
	];

	const headers = [
		{ label: '', sortable: false },
		{ label: 'Invoice', sortable: true },
		{ label: 'Product', sortable: true },
		{ label: 'Qty', sortable: true },
		{ label: 'Amount', sortable: true },
		{ label: 'Status', sortable: true },
		{ label: 'Payment', sortable: true },
		{ label: 'Date', sortable: true },
	];

	return (
		<section className="@container" data-theme="orders">
			<div className="mx-auto max-w-7xl px-4 @sm:px-6 @2xl:px-8 py-8 @md:py-10 @xl:py-12">
				<Toolbar
					searchPlaceholder="Search orders..."
					filterLabel="Filter"
					exportLabel="Export"
					refreshLabel="Refresh"
				/>
				<div className="rounded-lg border border-border/50 overflow-hidden bg-card/30">
					<Table>
						<TableHeader>
							<TableRow className="bg-muted/30 hover:bg-muted/30">
								{headers.map((header, i) => (
									<SortableHeader
										key={i}
										label={header.label}
										sortable={header.sortable}
									/>
								))}
							</TableRow>
						</TableHeader>
						<TableBody>
							{orders.map((order) => (
								<OrderRow key={order.id} order={order} />
							))}
						</TableBody>
					</Table>
				</div>
			</div>
		</section>
	);
}
