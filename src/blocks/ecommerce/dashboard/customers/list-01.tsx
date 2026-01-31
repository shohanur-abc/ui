import {
	ChevronRight,
	ExternalLink,
	Mail,
	MoreHorizontal,
	Phone,
	Search,
	ShoppingBag,
	Users,
} from 'lucide-react';

import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuItem,
	DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';

interface Customer {
	id: string;
	name: string;
	email: string;
	phone: string;
	avatar?: string;
	initials: string;
	status: 'active' | 'inactive' | 'pending';
	totalOrders: number;
	totalSpent: string;
	lastOrder: string;
	joinDate: string;
}

const StatusBadge = ({ status }: { status: Customer['status'] }) => {
	const config = {
		active: { label: 'Active', className: 'bg-emerald-500/10 text-emerald-500 border-emerald-500/20' },
		inactive: { label: 'Inactive', className: 'bg-slate-500/10 text-slate-400 border-slate-500/20' },
		pending: { label: 'Pending', className: 'bg-amber-500/10 text-amber-500 border-amber-500/20' },
	};
	return (
		<Badge variant="outline" className={config[status].className}>
			{config[status].label}
		</Badge>
	);
};

const PageHeader = ({
	title,
	subtitle,
	count,
}: {
	title: string;
	subtitle: string;
	count: number;
}) => (
	<div className="flex flex-col gap-4 @lg:flex-row @lg:items-center @lg:justify-between">
		<div className="flex items-center gap-3">
			<div className="bg-primary/10 text-primary rounded-lg p-2.5">
				<Users className="size-5" />
			</div>
			<div>
				<h1 className="text-2xl font-bold tracking-tight">{title}</h1>
				<p className="text-muted-foreground text-sm">{subtitle}</p>
			</div>
			<Badge variant="secondary" className="ml-2">
				{count}
			</Badge>
		</div>
		<div className="relative">
			<Search className="text-muted-foreground absolute top-1/2 left-3 size-4 -translate-y-1/2" />
			<Input placeholder="Search customers..." className="w-full pl-9 @lg:w-64" />
		</div>
	</div>
);

const CustomerListItem = ({ customer }: { customer: Customer }) => (
	<div className="group flex items-center gap-4 rounded-lg border bg-card p-4 transition-colors hover:bg-muted/50">
		<Avatar className="size-12">
			<AvatarImage src={customer.avatar} alt={customer.name} />
			<AvatarFallback className="bg-primary/10 text-primary">
				{customer.initials}
			</AvatarFallback>
		</Avatar>
		<div className="flex-1 min-w-0">
			<div className="flex items-center gap-2">
				<p className="font-semibold truncate">{customer.name}</p>
				<StatusBadge status={customer.status} />
			</div>
			<div className="mt-1 flex items-center gap-4 text-sm text-muted-foreground">
				<span className="flex items-center gap-1 truncate">
					<Mail className="size-3.5" />
					{customer.email}
				</span>
				<span className="hidden items-center gap-1 @md:flex">
					<Phone className="size-3.5" />
					{customer.phone}
				</span>
			</div>
		</div>
		<div className="hidden items-center gap-6 text-sm @lg:flex">
			<div className="text-center">
				<p className="font-semibold">{customer.totalOrders}</p>
				<p className="text-muted-foreground text-xs">Orders</p>
			</div>
			<div className="text-center">
				<p className="font-semibold">{customer.totalSpent}</p>
				<p className="text-muted-foreground text-xs">Spent</p>
			</div>
			<div className="text-center">
				<p className="font-medium">{customer.lastOrder}</p>
				<p className="text-muted-foreground text-xs">Last Order</p>
			</div>
		</div>
		<div className="flex items-center gap-2">
			<Button variant="ghost" size="sm" className="hidden gap-1.5 @md:flex">
				<ExternalLink className="size-4" />
				View
			</Button>
			<DropdownMenu>
				<DropdownMenuTrigger asChild>
					<Button variant="ghost" size="icon-sm">
						<MoreHorizontal className="size-4" />
					</Button>
				</DropdownMenuTrigger>
				<DropdownMenuContent align="end">
					<DropdownMenuItem>View profile</DropdownMenuItem>
					<DropdownMenuItem>View orders</DropdownMenuItem>
					<DropdownMenuItem>Send email</DropdownMenuItem>
					<DropdownMenuItem>Edit customer</DropdownMenuItem>
				</DropdownMenuContent>
			</DropdownMenu>
		</div>
	</div>
);

export default function Main() {
	const customers: Customer[] = [
		{
			id: '1',
			name: 'Sarah Johnson',
			email: 'sarah.j@email.com',
			phone: '+1 555-0101',
			initials: 'SJ',
			status: 'active',
			totalOrders: 42,
			totalSpent: '$4,250',
			lastOrder: '2 days ago',
			joinDate: 'Jan 2022',
		},
		{
			id: '2',
			name: 'Michael Chen',
			email: 'michael.c@email.com',
			phone: '+1 555-0102',
			initials: 'MC',
			status: 'active',
			totalOrders: 28,
			totalSpent: '$3,120',
			lastOrder: '1 week ago',
			joinDate: 'Mar 2022',
		},
		{
			id: '3',
			name: 'Emily Davis',
			email: 'emily.d@email.com',
			phone: '+1 555-0103',
			initials: 'ED',
			status: 'pending',
			totalOrders: 5,
			totalSpent: '$420',
			lastOrder: '3 days ago',
			joinDate: 'Dec 2023',
		},
		{
			id: '4',
			name: 'James Wilson',
			email: 'james.w@email.com',
			phone: '+1 555-0104',
			initials: 'JW',
			status: 'inactive',
			totalOrders: 12,
			totalSpent: '$890',
			lastOrder: '3 months ago',
			joinDate: 'Jun 2022',
		},
		{
			id: '5',
			name: 'Amanda Foster',
			email: 'amanda.f@email.com',
			phone: '+1 555-0105',
			initials: 'AF',
			status: 'active',
			totalOrders: 35,
			totalSpent: '$5,600',
			lastOrder: '1 day ago',
			joinDate: 'Feb 2022',
		},
		{
			id: '6',
			name: 'Robert Kim',
			email: 'robert.k@email.com',
			phone: '+1 555-0106',
			initials: 'RK',
			status: 'active',
			totalOrders: 19,
			totalSpent: '$2,340',
			lastOrder: '5 days ago',
			joinDate: 'Aug 2022',
		},
		{
			id: '7',
			name: 'Lisa Thompson',
			email: 'lisa.t@email.com',
			phone: '+1 555-0107',
			initials: 'LT',
			status: 'pending',
			totalOrders: 2,
			totalSpent: '$150',
			lastOrder: '1 week ago',
			joinDate: 'Jan 2024',
		},
		{
			id: '8',
			name: 'David Martinez',
			email: 'david.m@email.com',
			phone: '+1 555-0108',
			initials: 'DM',
			status: 'active',
			totalOrders: 56,
			totalSpent: '$7,890',
			lastOrder: 'Today',
			joinDate: 'Nov 2021',
		},
	];

	return (
		<section className="@container" data-theme="dashboard">
			<div className="mx-auto max-w-5xl space-y-6 px-4 py-8 @sm:px-6 @2xl:px-8">
				<PageHeader
					title="Customer List"
					subtitle="Manage and view all customers"
					count={customers.length}
				/>
				<div className="space-y-3">
					{customers.map((customer) => (
						<CustomerListItem key={customer.id} customer={customer} />
					))}
				</div>
			</div>
		</section>
	);
}
