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
import { Checkbox } from '@/components/ui/checkbox';
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuItem,
	DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { MoreHorizontal, Eye, Truck, XCircle } from 'lucide-react';

interface Order {
	id: string;
	customer: string;
	email: string;
	amount: string;
	status: 'pending' | 'processing' | 'shipped' | 'delivered' | 'cancelled';
	date: string;
}

interface TableHeaderCellProps {
	children: React.ReactNode;
	className?: string;
}

interface OrderRowProps {
	order: Order;
	onSelect?: (id: string) => void;
	actions: { label: string; icon: React.ComponentType<{ className?: string }>; onClick: () => void }[];
}

interface StatusBadgeProps {
	status: Order['status'];
	labels: Record<Order['status'], string>;
}

interface ActionsMenuProps {
	actions: OrderRowProps['actions'];
}

const TableHeaderCell = ({ children, className }: TableHeaderCellProps) => (
	<TableHead className={className}>{children}</TableHead>
);

const StatusBadge = ({ status, labels }: StatusBadgeProps) => {
	const variants: Record<Order['status'], 'default' | 'secondary' | 'destructive' | 'outline'> = {
		pending: 'outline',
		processing: 'secondary',
		shipped: 'default',
		delivered: 'default',
		cancelled: 'destructive',
	};
	return (
		<Badge variant={variants[status]} className="capitalize">
			{labels[status]}
		</Badge>
	);
};

const ActionsMenu = ({ actions }: ActionsMenuProps) => (
	<DropdownMenu>
		<DropdownMenuTrigger asChild>
			<Button variant="ghost" size="icon-sm" className="hover:bg-muted">
				<MoreHorizontal className="size-4" />
			</Button>
		</DropdownMenuTrigger>
		<DropdownMenuContent align="end">
			{actions.map((action, i) => (
				<DropdownMenuItem key={i} onClick={action.onClick} className="gap-2">
					<action.icon className="size-4" />
					{action.label}
				</DropdownMenuItem>
			))}
		</DropdownMenuContent>
	</DropdownMenu>
);

const OrderRow = ({ order, onSelect, actions }: OrderRowProps) => (
	<TableRow className="group hover:bg-muted/50 transition-colors">
		<TableCell>
			<Checkbox onCheckedChange={() => onSelect?.(order.id)} />
		</TableCell>
		<TableCell className="font-medium text-foreground">{order.id}</TableCell>
		<TableCell>
			<div className="flex flex-col">
				<span className="font-medium">{order.customer}</span>
				<span className="text-xs text-muted-foreground">{order.email}</span>
			</div>
		</TableCell>
		<TableCell className="font-semibold">{order.amount}</TableCell>
		<TableCell>
			<StatusBadge
				status={order.status}
				labels={{
					pending: 'Pending',
					processing: 'Processing',
					shipped: 'Shipped',
					delivered: 'Delivered',
					cancelled: 'Cancelled',
				}}
			/>
		</TableCell>
		<TableCell className="text-muted-foreground">{order.date}</TableCell>
		<TableCell>
			<ActionsMenu actions={actions} />
		</TableCell>
	</TableRow>
);

export default function Main() {
	const orders: Order[] = [
		{ id: 'ORD-001', customer: 'John Smith', email: 'john@email.com', amount: '$299.00', status: 'delivered', date: 'Jan 28, 2026' },
		{ id: 'ORD-002', customer: 'Sarah Johnson', email: 'sarah@email.com', amount: '$149.50', status: 'shipped', date: 'Jan 27, 2026' },
		{ id: 'ORD-003', customer: 'Mike Wilson', email: 'mike@email.com', amount: '$89.99', status: 'processing', date: 'Jan 27, 2026' },
		{ id: 'ORD-004', customer: 'Emily Brown', email: 'emily@email.com', amount: '$459.00', status: 'pending', date: 'Jan 26, 2026' },
		{ id: 'ORD-005', customer: 'David Lee', email: 'david@email.com', amount: '$199.00', status: 'cancelled', date: 'Jan 25, 2026' },
	];

	const actions = [
		{ label: 'View Details', icon: Eye, onClick: () => {} },
		{ label: 'Track Order', icon: Truck, onClick: () => {} },
		{ label: 'Cancel Order', icon: XCircle, onClick: () => {} },
	];

	const headers = ['', 'Order ID', 'Customer', 'Amount', 'Status', 'Date', ''];

	return (
		<section className="@container" data-theme="orders">
			<div className="mx-auto max-w-7xl px-4 @sm:px-6 @2xl:px-8 py-8 @md:py-10 @xl:py-12">
				<Table>
					<TableHeader>
						<TableRow className="border-border/50 hover:bg-transparent">
							{headers.map((header, i) => (
								<TableHeaderCell key={i}>{header}</TableHeaderCell>
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
		</section>
	);
}
