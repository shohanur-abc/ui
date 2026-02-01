import {
	Calendar,
	Clock,
	DollarSign,
	ExternalLink,
	MapPin,
	MoreHorizontal,
	Package,
	ShoppingBag,
	Truck,
} from 'lucide-react';

import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuItem,
	DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';

interface OrderCustomer {
	id: string;
	name: string;
	email: string;
	avatar?: string;
	initials: string;
	order: {
		id: string;
		status: 'pending' | 'processing' | 'shipped' | 'delivered' | 'cancelled';
		total: string;
		items: number;
		placedAt: string;
		estimatedDelivery?: string;
	};
	shipping: {
		address: string;
		method: string;
	};
	isFirstOrder: boolean;
	isVIP: boolean;
}

const OrderStatusConfig = {
	pending: {
		label: 'Pending',
		className: 'bg-amber-500/10 text-amber-500 border-amber-500/20',
		icon: Clock,
	},
	processing: {
		label: 'Processing',
		className: 'bg-blue-500/10 text-blue-500 border-blue-500/20',
		icon: Package,
	},
	shipped: {
		label: 'Shipped',
		className: 'bg-violet-500/10 text-violet-500 border-violet-500/20',
		icon: Truck,
	},
	delivered: {
		label: 'Delivered',
		className: 'bg-emerald-500/10 text-emerald-500 border-emerald-500/20',
		icon: Package,
	},
	cancelled: {
		label: 'Cancelled',
		className: 'bg-slate-500/10 text-slate-400 border-slate-500/20',
		icon: Package,
	},
};

const OrderStatusBadge = ({
	status,
}: {
	status: OrderCustomer['order']['status'];
}) => {
	const config = OrderStatusConfig[status];
	const Icon = config.icon;
	return (
		<Badge variant="outline" className={`${config.className} gap-1`}>
			<Icon className="size-3" />
			{config.label}
		</Badge>
	);
};

const PageHeader = ({
	title,
	subtitle,
}: {
	title: string;
	subtitle: string;
}) => (
	<div className="flex items-center gap-3">
		<div className="bg-primary/10 text-primary rounded-lg p-2.5">
			<ShoppingBag className="size-5" />
		</div>
		<div>
			<h1 className="text-2xl font-bold tracking-tight">{title}</h1>
			<p className="text-muted-foreground text-sm">{subtitle}</p>
		</div>
	</div>
);

const OrderListItem = ({ customer }: { customer: OrderCustomer }) => (
	<div className="group flex flex-col @lg:flex-row @lg:items-center gap-4 rounded-lg border bg-card p-4 transition-colors hover:bg-muted/50">
		<div className="flex items-center gap-3 min-w-0">
			<div className="relative">
				<Avatar className="size-11">
					<AvatarImage src={customer.avatar} alt={customer.name} />
					<AvatarFallback className="bg-primary/10 text-primary">
						{customer.initials}
					</AvatarFallback>
				</Avatar>
				{customer.isVIP && (
					<div className="absolute -top-1 -right-1 size-4 rounded-full bg-amber-500 flex items-center justify-center">
						<span className="text-[10px] text-white font-bold">V</span>
					</div>
				)}
			</div>
			<div className="min-w-0">
				<div className="flex items-center gap-2">
					<p className="font-semibold truncate">{customer.name}</p>
					{customer.isFirstOrder && (
						<Badge
							variant="secondary"
							className="text-xs bg-blue-500/10 text-blue-500"
						>
							First Order
						</Badge>
					)}
				</div>
				<p className="text-muted-foreground text-sm truncate">
					{customer.email}
				</p>
			</div>
		</div>
		<div className="flex-1 grid grid-cols-2 @md:grid-cols-4 gap-4 @lg:gap-6">
			<div>
				<p className="text-muted-foreground text-xs">Order</p>
				<p className="font-mono text-sm font-medium">#{customer.order.id}</p>
			</div>
			<div>
				<p className="text-muted-foreground text-xs">Items</p>
				<p className="text-sm font-medium">{customer.order.items} items</p>
			</div>
			<div>
				<p className="text-muted-foreground text-xs">Total</p>
				<p className="text-sm font-semibold">{customer.order.total}</p>
			</div>
			<div>
				<p className="text-muted-foreground text-xs">Status</p>
				<div className="mt-0.5">
					<OrderStatusBadge status={customer.order.status} />
				</div>
			</div>
		</div>
		<div className="hidden @xl:block min-w-[160px]">
			<div className="flex items-start gap-1.5">
				<MapPin className="text-muted-foreground size-3.5 mt-0.5 shrink-0" />
				<div className="min-w-0">
					<p className="text-sm truncate">{customer.shipping.address}</p>
					<p className="text-muted-foreground text-xs">
						{customer.shipping.method}
					</p>
				</div>
			</div>
		</div>
		<div className="flex items-center gap-3 @lg:gap-4">
			<div className="text-right hidden @md:block">
				<p className="text-muted-foreground text-xs">Placed</p>
				<p className="text-sm">{customer.order.placedAt}</p>
			</div>
			{customer.order.estimatedDelivery &&
				customer.order.status !== 'delivered' &&
				customer.order.status !== 'cancelled' && (
					<div className="text-right hidden @lg:block">
						<p className="text-muted-foreground text-xs">Est. Delivery</p>
						<p className="text-sm text-emerald-500">
							{customer.order.estimatedDelivery}
						</p>
					</div>
				)}
			<div className="flex items-center gap-2">
				<Button variant="outline" size="sm" className="hidden @md:flex gap-1.5">
					<ExternalLink className="size-3.5" />
					View
				</Button>
				<DropdownMenu>
					<DropdownMenuTrigger asChild>
						<Button variant="ghost" size="icon-sm">
							<MoreHorizontal className="size-4" />
						</Button>
					</DropdownMenuTrigger>
					<DropdownMenuContent align="end">
						<DropdownMenuItem>View order details</DropdownMenuItem>
						<DropdownMenuItem>View customer</DropdownMenuItem>
						<DropdownMenuItem>Track shipment</DropdownMenuItem>
						<DropdownMenuItem>Print invoice</DropdownMenuItem>
						<DropdownMenuItem>Contact customer</DropdownMenuItem>
					</DropdownMenuContent>
				</DropdownMenu>
			</div>
		</div>
	</div>
);

export default function Main() {
	const customers: OrderCustomer[] = [
		{
			id: '1',
			name: 'Henry Crawford',
			email: 'henry.c@email.com',
			initials: 'HC',
			order: {
				id: 'ORD-5128',
				status: 'processing',
				total: '$245.99',
				items: 3,
				placedAt: '2h ago',
				estimatedDelivery: 'Jan 28',
			},
			shipping: { address: '123 Main St, NYC', method: 'Express' },
			isFirstOrder: false,
			isVIP: true,
		},
		{
			id: '2',
			name: 'Iris Mitchell',
			email: 'iris.m@email.com',
			initials: 'IM',
			order: {
				id: 'ORD-5127',
				status: 'pending',
				total: '$89.50',
				items: 1,
				placedAt: '4h ago',
				estimatedDelivery: 'Jan 30',
			},
			shipping: { address: '456 Oak Ave, LA', method: 'Standard' },
			isFirstOrder: true,
			isVIP: false,
		},
		{
			id: '3',
			name: 'Jack Reynolds',
			email: 'jack.r@email.com',
			initials: 'JR',
			order: {
				id: 'ORD-5126',
				status: 'shipped',
				total: '$567.00',
				items: 5,
				placedAt: '1d ago',
				estimatedDelivery: 'Jan 26',
			},
			shipping: { address: '789 Pine Rd, Chicago', method: 'Express' },
			isFirstOrder: false,
			isVIP: false,
		},
		{
			id: '4',
			name: 'Katherine Liu',
			email: 'katherine.l@email.com',
			initials: 'KL',
			order: {
				id: 'ORD-5125',
				status: 'delivered',
				total: '$156.75',
				items: 2,
				placedAt: '3d ago',
			},
			shipping: { address: '321 Elm Blvd, Miami', method: 'Standard' },
			isFirstOrder: false,
			isVIP: true,
		},
		{
			id: '5',
			name: 'Liam Henderson',
			email: 'liam.h@email.com',
			initials: 'LH',
			order: {
				id: 'ORD-5124',
				status: 'cancelled',
				total: '$78.25',
				items: 1,
				placedAt: '2d ago',
			},
			shipping: { address: '654 Maple Dr, Seattle', method: 'Standard' },
			isFirstOrder: false,
			isVIP: false,
		},
		{
			id: '6',
			name: 'Maya Thompson',
			email: 'maya.t@email.com',
			initials: 'MT',
			order: {
				id: 'ORD-5123',
				status: 'shipped',
				total: '$892.00',
				items: 8,
				placedAt: '1d ago',
				estimatedDelivery: 'Jan 27',
			},
			shipping: { address: '987 Cedar Ln, Boston', method: 'Express' },
			isFirstOrder: false,
			isVIP: true,
		},
		{
			id: '7',
			name: 'Nathan Brooks',
			email: 'nathan.b@email.com',
			initials: 'NB',
			order: {
				id: 'ORD-5122',
				status: 'processing',
				total: '$234.50',
				items: 4,
				placedAt: '6h ago',
				estimatedDelivery: 'Jan 29',
			},
			shipping: { address: '147 Birch Way, Denver', method: 'Standard' },
			isFirstOrder: true,
			isVIP: false,
		},
		{
			id: '8',
			name: 'Olivia Chen',
			email: 'olivia.c@email.com',
			initials: 'OC',
			order: {
				id: 'ORD-5121',
				status: 'pending',
				total: '$445.00',
				items: 3,
				placedAt: '1h ago',
				estimatedDelivery: 'Jan 31',
			},
			shipping: { address: '258 Spruce Ct, Austin', method: 'Express' },
			isFirstOrder: false,
			isVIP: false,
		},
	];

	return (
		<section className="@container" data-theme="dashboard">
			<div className="mx-auto max-w-6xl space-y-6 px-4 py-8 @sm:px-6 @2xl:px-8">
				<PageHeader
					title="Recent Orders"
					subtitle="Customer orders and fulfillment status"
				/>
				<div className="space-y-3">
					{customers.map((customer) => (
						<OrderListItem key={customer.id} customer={customer} />
					))}
				</div>
			</div>
		</section>
	);
}
