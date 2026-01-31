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
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Checkbox } from '@/components/ui/checkbox';
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuItem,
	DropdownMenuSeparator,
	DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { MoreVertical, Printer, Mail, FileText, Truck, Ban, Copy, ExternalLink } from 'lucide-react';

interface Product {
	name: string;
	image: string;
	variant: string;
}

interface Order {
	id: string;
	product: Product;
	quantity: number;
	unitPrice: string;
	total: string;
	status: 'confirmed' | 'packed' | 'shipped' | 'delivered';
	trackingNumber?: string;
}

interface BulkActionsProps {
	selectedCount: number;
	labels: { selected: string; print: string; email: string; export: string };
}

interface ActionMenuProps {
	actions: { icon: React.ComponentType<{ className?: string }>; label: string; variant?: 'default' | 'destructive' }[];
}

interface ProductCellProps {
	product: Product;
}

const BulkActions = ({ selectedCount, labels }: BulkActionsProps) => (
	<div className="flex items-center gap-3 px-4 py-3 bg-primary/5 border-b border-border/50">
		<span className="text-sm font-medium">
			{selectedCount} {labels.selected}
		</span>
		<div className="flex items-center gap-2 ml-auto">
			<Button variant="outline" size="sm" className="gap-1.5">
				<Printer className="size-4" />
				{labels.print}
			</Button>
			<Button variant="outline" size="sm" className="gap-1.5">
				<Mail className="size-4" />
				{labels.email}
			</Button>
			<Button variant="outline" size="sm" className="gap-1.5">
				<FileText className="size-4" />
				{labels.export}
			</Button>
		</div>
	</div>
);

const ProductCell = ({ product }: ProductCellProps) => (
	<div className="flex items-center gap-3">
		<Avatar className="size-10 rounded-lg">
			<AvatarImage src={product.image} alt={product.name} />
			<AvatarFallback className="rounded-lg bg-muted text-xs">
				{product.name.substring(0, 2)}
			</AvatarFallback>
		</Avatar>
		<div>
			<p className="font-medium">{product.name}</p>
			<p className="text-xs text-muted-foreground">{product.variant}</p>
		</div>
	</div>
);

const StatusBadge = ({ status }: { status: Order['status'] }) => {
	const config: Record<Order['status'], { label: string; variant: 'default' | 'secondary' | 'outline' }> = {
		confirmed: { label: 'Confirmed', variant: 'outline' },
		packed: { label: 'Packed', variant: 'secondary' },
		shipped: { label: 'Shipped', variant: 'default' },
		delivered: { label: 'Delivered', variant: 'default' },
	};
	return <Badge variant={config[status].variant}>{config[status].label}</Badge>;
};

const ActionMenu = ({ actions }: ActionMenuProps) => (
	<DropdownMenu>
		<DropdownMenuTrigger asChild>
			<Button variant="ghost" size="icon-sm" className="hover:bg-muted">
				<MoreVertical className="size-4" />
			</Button>
		</DropdownMenuTrigger>
		<DropdownMenuContent align="end" className="w-48">
			{actions.map((action, i) => (
				<>
					{action.variant === 'destructive' && <DropdownMenuSeparator key={`sep-${i}`} />}
					<DropdownMenuItem
						key={i}
						className={`gap-2 ${action.variant === 'destructive' ? 'text-destructive focus:text-destructive' : ''}`}
					>
						<action.icon className="size-4" />
						{action.label}
					</DropdownMenuItem>
				</>
			))}
		</DropdownMenuContent>
	</DropdownMenu>
);

const OrderRow = ({ order, actions }: { order: Order; actions: ActionMenuProps['actions'] }) => (
	<TableRow className="hover:bg-muted/30 transition-colors">
		<TableCell>
			<Checkbox />
		</TableCell>
		<TableCell className="font-mono text-sm">{order.id}</TableCell>
		<TableCell>
			<ProductCell product={order.product} />
		</TableCell>
		<TableCell className="text-center">{order.quantity}</TableCell>
		<TableCell className="text-muted-foreground">{order.unitPrice}</TableCell>
		<TableCell className="font-semibold">{order.total}</TableCell>
		<TableCell>
			<StatusBadge status={order.status} />
		</TableCell>
		<TableCell className="font-mono text-xs text-muted-foreground">
			{order.trackingNumber || '—'}
		</TableCell>
		<TableCell>
			<ActionMenu actions={actions} />
		</TableCell>
	</TableRow>
);

export default function Main() {
	const actions = [
		{ icon: ExternalLink, label: 'View Details' },
		{ icon: Copy, label: 'Duplicate Order' },
		{ icon: Truck, label: 'Update Shipping' },
		{ icon: Printer, label: 'Print Label' },
		{ icon: Ban, label: 'Cancel Order', variant: 'destructive' as const },
	];

	const orders: Order[] = [
		{
			id: 'SO-2024001',
			product: { name: 'Premium Wireless Earbuds', image: '', variant: 'Midnight Black' },
			quantity: 2,
			unitPrice: '$149.00',
			total: '$298.00',
			status: 'shipped',
			trackingNumber: '1Z999AA10123456784',
		},
		{
			id: 'SO-2024002',
			product: { name: 'Smart Fitness Tracker', image: '', variant: 'Rose Gold / Small' },
			quantity: 1,
			unitPrice: '$199.00',
			total: '$199.00',
			status: 'packed',
		},
		{
			id: 'SO-2024003',
			product: { name: 'Portable Power Bank', image: '', variant: '20000mAh' },
			quantity: 3,
			unitPrice: '$59.99',
			total: '$179.97',
			status: 'confirmed',
		},
		{
			id: 'SO-2024004',
			product: { name: 'Wireless Charging Pad', image: '', variant: 'White' },
			quantity: 1,
			unitPrice: '$39.99',
			total: '$39.99',
			status: 'delivered',
			trackingNumber: '1Z999AA10987654321',
		},
	];

	const headers = ['', 'Order ID', 'Product', 'Qty', 'Unit Price', 'Total', 'Status', 'Tracking', ''];

	return (
		<section className="@container" data-theme="orders">
			<div className="mx-auto max-w-7xl px-4 @sm:px-6 @2xl:px-8 py-8 @md:py-10 @xl:py-12">
				<div className="rounded-xl border border-border/50 overflow-hidden bg-card/50 backdrop-blur-sm">
					<BulkActions
						selectedCount={2}
						labels={{ selected: 'orders selected', print: 'Print', email: 'Email', export: 'Export' }}
					/>
					<Table>
						<TableHeader>
							<TableRow className="bg-muted/20 hover:bg-muted/20 border-border/50">
								<TableHead className="w-12">
									<Checkbox />
								</TableHead>
								{headers.slice(1).map((header) => (
									<TableHead key={header} className={header === 'Qty' ? 'text-center' : ''}>
										{header}
									</TableHead>
								))}
							</TableRow>
						</TableHeader>
						<TableBody>
							{orders.map((order) => (
								<OrderRow key={order.id} order={order} actions={actions} />
							))}
						</TableBody>
					</Table>
				</div>
			</div>
		</section>
	);
}
