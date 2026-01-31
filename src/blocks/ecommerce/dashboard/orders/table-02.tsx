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
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { ArrowUpRight, Package, Clock, CheckCircle2, Truck } from 'lucide-react';

interface Order {
	id: string;
	customer: { name: string; avatar: string; initials: string };
	items: number;
	total: string;
	status: 'pending' | 'processing' | 'shipped' | 'delivered';
	date: string;
}

interface HeaderProps {
	title: string;
	description: string;
}

interface CustomerCellProps {
	customer: Order['customer'];
}

interface StatusBadgeProps {
	status: Order['status'];
}

const Header = ({ title, description }: HeaderProps) => (
	<CardHeader className="pb-4">
		<div className="flex items-center justify-between">
			<div>
				<CardTitle className="text-lg font-semibold">{title}</CardTitle>
				<CardDescription>{description}</CardDescription>
			</div>
			<Button variant="outline" size="sm" className="gap-1.5">
				View All
				<ArrowUpRight className="size-3.5" />
			</Button>
		</div>
	</CardHeader>
);

const CustomerCell = ({ customer }: CustomerCellProps) => (
	<div className="flex items-center gap-3">
		<Avatar className="size-8">
			<AvatarImage src={customer.avatar} alt={customer.name} />
			<AvatarFallback className="bg-primary/10 text-primary text-xs">
				{customer.initials}
			</AvatarFallback>
		</Avatar>
		<span className="font-medium">{customer.name}</span>
	</div>
);

const StatusBadge = ({ status }: StatusBadgeProps) => {
	const config: Record<Order['status'], { icon: typeof Package; label: string; variant: 'default' | 'secondary' | 'outline' }> = {
		pending: { icon: Clock, label: 'Pending', variant: 'outline' },
		processing: { icon: Package, label: 'Processing', variant: 'secondary' },
		shipped: { icon: Truck, label: 'Shipped', variant: 'default' },
		delivered: { icon: CheckCircle2, label: 'Delivered', variant: 'default' },
	};
	const { icon: Icon, label, variant } = config[status];
	return (
		<Badge variant={variant} className="gap-1">
			<Icon className="size-3" />
			{label}
		</Badge>
	);
};

const OrderRow = ({ order }: { order: Order }) => (
	<TableRow className="hover:bg-muted/30 transition-colors">
		<TableCell className="font-mono text-sm text-muted-foreground">{order.id}</TableCell>
		<TableCell>
			<CustomerCell customer={order.customer} />
		</TableCell>
		<TableCell className="text-center">{order.items}</TableCell>
		<TableCell className="font-semibold">{order.total}</TableCell>
		<TableCell>
			<StatusBadge status={order.status} />
		</TableCell>
		<TableCell className="text-muted-foreground text-sm">{order.date}</TableCell>
	</TableRow>
);

export default function Main() {
	const orders: Order[] = [
		{ id: '#8294', customer: { name: 'Alice Cooper', avatar: '', initials: 'AC' }, items: 3, total: '$342.00', status: 'delivered', date: 'Today' },
		{ id: '#8293', customer: { name: 'Bob Martin', avatar: '', initials: 'BM' }, items: 1, total: '$89.99', status: 'shipped', date: 'Today' },
		{ id: '#8292', customer: { name: 'Carol White', avatar: '', initials: 'CW' }, items: 5, total: '$567.50', status: 'processing', date: 'Yesterday' },
		{ id: '#8291', customer: { name: 'Dan Brown', avatar: '', initials: 'DB' }, items: 2, total: '$199.00', status: 'pending', date: 'Yesterday' },
		{ id: '#8290', customer: { name: 'Eve Davis', avatar: '', initials: 'ED' }, items: 4, total: '$445.00', status: 'delivered', date: 'Jan 29' },
	];

	const headers = ['Order', 'Customer', 'Items', 'Total', 'Status', 'Date'];

	return (
		<section className="@container" data-theme="orders">
			<div className="mx-auto max-w-7xl px-4 @sm:px-6 @2xl:px-8 py-8 @md:py-10 @xl:py-12">
				<Card className="border-border/50 bg-card/50 backdrop-blur-sm">
					<Header title="Recent Orders" description="Latest orders from your store" />
					<CardContent className="p-0">
						<Table>
							<TableHeader>
								<TableRow className="border-border/50 hover:bg-transparent">
									{headers.map((header) => (
										<TableHead key={header} className={header === 'Items' ? 'text-center' : ''}>
											{header}
										</TableHead>
									))}
								</TableRow>
							</TableHeader>
							<TableBody>
								{orders.map((order) => (
									<OrderRow key={order.id} order={order} />
								))}
							</TableBody>
						</Table>
					</CardContent>
				</Card>
			</div>
		</section>
	);
}
