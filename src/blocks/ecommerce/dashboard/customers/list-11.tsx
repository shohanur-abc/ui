import {
	ArrowLeft,
	Calendar,
	Clock,
	MoreHorizontal,
	Package,
	RotateCcw,
	Truck,
	XCircle,
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

interface ReturnCustomer {
	id: string;
	name: string;
	email: string;
	avatar?: string;
	initials: string;
	return: {
		id: string;
		status: 'initiated' | 'in-transit' | 'received' | 'refunded' | 'rejected';
		type: 'return' | 'exchange' | 'refund';
		reason: string;
		items: number;
		value: string;
	};
	order: {
		id: string;
		date: string;
	};
	timeline: {
		initiated: string;
		estimated: string;
	};
	returnRate: number;
}

const StatusConfig = {
	initiated: { label: 'Initiated', color: 'bg-blue-500/10 text-blue-500', icon: Clock },
	'in-transit': { label: 'In Transit', color: 'bg-amber-500/10 text-amber-500', icon: Truck },
	received: { label: 'Received', color: 'bg-violet-500/10 text-violet-500', icon: Package },
	refunded: { label: 'Refunded', color: 'bg-emerald-500/10 text-emerald-500', icon: RotateCcw },
	rejected: { label: 'Rejected', color: 'bg-red-500/10 text-red-500', icon: XCircle },
};

const ReturnStatusBadge = ({ status }: { status: ReturnCustomer['return']['status'] }) => {
	const config = StatusConfig[status];
	const Icon = config.icon;
	return (
		<Badge variant="outline" className={`${config.color} gap-1`}>
			<Icon className="size-3" />
			{config.label}
		</Badge>
	);
};

const TypeBadge = ({ type }: { type: ReturnCustomer['return']['type'] }) => {
	const colors: Record<string, string> = {
		return: 'bg-blue-500/10 text-blue-500',
		exchange: 'bg-violet-500/10 text-violet-500',
		refund: 'bg-amber-500/10 text-amber-500',
	};
	return (
		<Badge variant="outline" className={`${colors[type]} capitalize`}>
			{type}
		</Badge>
	);
};

const ReturnRateIndicator = ({ rate }: { rate: number }) => {
	const getColor = (r: number) => {
		if (r > 30) return 'text-red-500';
		if (r > 15) return 'text-amber-500';
		return 'text-emerald-500';
	};
	return (
		<span className={`text-xs font-medium ${getColor(rate)}`}>
			{rate}% return rate
		</span>
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
		<div className="bg-amber-500/10 text-amber-500 rounded-lg p-2.5">
			<RotateCcw className="size-5" />
		</div>
		<div>
			<h1 className="text-2xl font-bold tracking-tight">{title}</h1>
			<p className="text-muted-foreground text-sm">{subtitle}</p>
		</div>
	</div>
);

const ReturnListItem = ({ customer }: { customer: ReturnCustomer }) => (
	<div className="group flex flex-col @lg:flex-row @lg:items-center gap-4 rounded-lg border bg-card p-4 transition-colors hover:bg-muted/50">
		<div className="flex items-center gap-3 min-w-0">
			<Avatar className="size-11">
				<AvatarImage src={customer.avatar} alt={customer.name} />
				<AvatarFallback className="bg-primary/10 text-primary">
					{customer.initials}
				</AvatarFallback>
			</Avatar>
			<div className="min-w-0">
				<p className="font-semibold truncate">{customer.name}</p>
				<div className="flex items-center gap-2">
					<span className="text-muted-foreground text-sm">Return #{customer.return.id}</span>
					<ReturnRateIndicator rate={customer.returnRate} />
				</div>
			</div>
		</div>
		<div className="flex items-center gap-2">
			<ReturnStatusBadge status={customer.return.status} />
			<TypeBadge type={customer.return.type} />
		</div>
		<div className="flex-1 min-w-0">
			<p className="text-sm truncate">{customer.return.reason}</p>
			<p className="text-muted-foreground text-xs">
				{customer.return.items} item{customer.return.items > 1 ? 's' : ''} • {customer.return.value}
			</p>
		</div>
		<div className="grid grid-cols-2 gap-4 text-sm min-w-[200px]">
			<div>
				<p className="text-muted-foreground text-xs flex items-center gap-1">
					<ArrowLeft className="size-3" /> Original Order
				</p>
				<p className="font-medium">#{customer.order.id}</p>
			</div>
			<div>
				<p className="text-muted-foreground text-xs flex items-center gap-1">
					<Calendar className="size-3" /> Initiated
				</p>
				<p className="text-sm">{customer.timeline.initiated}</p>
			</div>
		</div>
		<div className="hidden @xl:block text-right min-w-[100px]">
			<p className="text-muted-foreground text-xs">Est. Resolution</p>
			<p className="text-sm font-medium">{customer.timeline.estimated}</p>
		</div>
		<div className="flex items-center gap-2">
			<Button variant="outline" size="sm" className="hidden @md:flex gap-1.5">
				Process
			</Button>
			<DropdownMenu>
				<DropdownMenuTrigger asChild>
					<Button variant="ghost" size="icon-sm">
						<MoreHorizontal className="size-4" />
					</Button>
				</DropdownMenuTrigger>
				<DropdownMenuContent align="end">
					<DropdownMenuItem>View return details</DropdownMenuItem>
					<DropdownMenuItem>View original order</DropdownMenuItem>
					<DropdownMenuItem>Contact customer</DropdownMenuItem>
					<DropdownMenuItem>Process refund</DropdownMenuItem>
					<DropdownMenuItem className="text-red-500">Reject return</DropdownMenuItem>
				</DropdownMenuContent>
			</DropdownMenu>
		</div>
	</div>
);

export default function Main() {
	const customers: ReturnCustomer[] = [
		{
			id: '1',
			name: 'Yolanda Cruz',
			email: 'yolanda.c@email.com',
			initials: 'YC',
			return: { id: 'RET-4521', status: 'initiated', type: 'return', reason: 'Wrong size - need larger', items: 2, value: '$89.99' },
			order: { id: 'ORD-7823', date: '5 days ago' },
			timeline: { initiated: 'Today', estimated: '3-5 days' },
			returnRate: 8,
		},
		{
			id: '2',
			name: 'Zane Mitchell',
			email: 'zane.m@email.com',
			initials: 'ZM',
			return: { id: 'RET-4520', status: 'in-transit', type: 'exchange', reason: 'Defective product - screen flickering', items: 1, value: '$349.00' },
			order: { id: 'ORD-7812', date: '1 week ago' },
			timeline: { initiated: '2 days ago', estimated: '2-3 days' },
			returnRate: 12,
		},
		{
			id: '3',
			name: 'Audrey Palmer',
			email: 'audrey.p@email.com',
			initials: 'AP',
			return: { id: 'RET-4519', status: 'received', type: 'refund', reason: 'Changed mind - no longer needed', items: 3, value: '$156.50' },
			order: { id: 'ORD-7798', date: '2 weeks ago' },
			timeline: { initiated: '5 days ago', estimated: '1-2 days' },
			returnRate: 22,
		},
		{
			id: '4',
			name: 'Benjamin Lee',
			email: 'benjamin.l@email.com',
			initials: 'BL',
			return: { id: 'RET-4518', status: 'refunded', type: 'refund', reason: 'Item damaged during shipping', items: 1, value: '$79.99' },
			order: { id: 'ORD-7756', date: '3 weeks ago' },
			timeline: { initiated: '1 week ago', estimated: 'Completed' },
			returnRate: 5,
		},
		{
			id: '5',
			name: 'Cassandra Hill',
			email: 'cassandra.h@email.com',
			initials: 'CH',
			return: { id: 'RET-4517', status: 'rejected', type: 'return', reason: 'Item worn/used - return policy violation', items: 1, value: '$125.00' },
			order: { id: 'ORD-7701', date: '1 month ago' },
			timeline: { initiated: '2 weeks ago', estimated: 'Closed' },
			returnRate: 45,
		},
		{
			id: '6',
			name: 'Damian Foster',
			email: 'damian.f@email.com',
			initials: 'DF',
			return: { id: 'RET-4516', status: 'initiated', type: 'exchange', reason: 'Color different from product image', items: 1, value: '$45.00' },
			order: { id: 'ORD-7834', date: '4 days ago' },
			timeline: { initiated: 'Today', estimated: '5-7 days' },
			returnRate: 15,
		},
		{
			id: '7',
			name: 'Eleanor Wang',
			email: 'eleanor.w@email.com',
			initials: 'EW',
			return: { id: 'RET-4515', status: 'in-transit', type: 'return', reason: 'Duplicate order - received twice', items: 4, value: '$234.00' },
			order: { id: 'ORD-7789', date: '10 days ago' },
			timeline: { initiated: '3 days ago', estimated: '1-2 days' },
			returnRate: 3,
		},
		{
			id: '8',
			name: 'Franklin Moore',
			email: 'franklin.m@email.com',
			initials: 'FM',
			return: { id: 'RET-4514', status: 'received', type: 'refund', reason: 'Product quality below expectations', items: 2, value: '$189.00' },
			order: { id: 'ORD-7778', date: '2 weeks ago' },
			timeline: { initiated: '4 days ago', estimated: 'Today' },
			returnRate: 18,
		},
	];

	return (
		<section className="@container" data-theme="dashboard">
			<div className="mx-auto max-w-6xl space-y-6 px-4 py-8 @sm:px-6 @2xl:px-8">
				<PageHeader
					title="Returns & Refunds"
					subtitle="Customer return requests and status"
				/>
				<div className="space-y-3">
					{customers.map((customer) => (
						<ReturnListItem key={customer.id} customer={customer} />
					))}
				</div>
			</div>
		</section>
	);
}
