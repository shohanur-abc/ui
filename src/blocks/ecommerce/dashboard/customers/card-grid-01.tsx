import {
	ChevronDown,
	Download,
	Filter,
	Mail,
	MoreHorizontal,
	Phone,
	Plus,
	Search,
	ShoppingBag,
	Star,
} from 'lucide-react';

import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import {
	Card,
	CardContent,
	CardFooter,
	CardHeader,
} from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuItem,
	DropdownMenuSeparator,
	DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';

interface CustomerCard {
	id: string;
	name: string;
	email: string;
	phone: string;
	avatar?: string;
	initials: string;
	status: 'active' | 'inactive' | 'pending';
	tier: 'standard' | 'premium' | 'vip';
	totalOrders: number;
	totalSpent: string;
	joinDate: string;
	tags: string[];
}

const PageHeader = ({
	title,
	subtitle,
}: {
	title: string;
	subtitle: string;
}) => (
	<div className="flex flex-col gap-4 @lg:flex-row @lg:items-center @lg:justify-between">
		<div>
			<h1 className="text-2xl font-bold tracking-tight">{title}</h1>
			<p className="text-muted-foreground text-sm">{subtitle}</p>
		</div>
		<div className="flex gap-2">
			<Button variant="outline" size="sm" className="gap-2">
				<Download className="size-4" />
				Export
			</Button>
			<Button className="gap-2">
				<Plus className="size-4" />
				Add Customer
			</Button>
		</div>
	</div>
);

const SearchAndFilter = ({
	searchPlaceholder,
}: {
	searchPlaceholder: string;
}) => (
	<div className="flex flex-col gap-3 @lg:flex-row @lg:items-center @lg:justify-between">
		<div className="relative">
			<Search className="text-muted-foreground absolute top-1/2 left-3 size-4 -translate-y-1/2" />
			<Input placeholder={searchPlaceholder} className="w-full pl-9 @lg:w-80" />
		</div>
		<div className="flex gap-2">
			<DropdownMenu>
				<DropdownMenuTrigger asChild>
					<Button variant="outline" size="sm" className="gap-2">
						<Filter className="size-4" />
						Status
						<ChevronDown className="size-3.5" />
					</Button>
				</DropdownMenuTrigger>
				<DropdownMenuContent>
					<DropdownMenuItem>All Status</DropdownMenuItem>
					<DropdownMenuItem>Active</DropdownMenuItem>
					<DropdownMenuItem>Inactive</DropdownMenuItem>
					<DropdownMenuItem>Pending</DropdownMenuItem>
				</DropdownMenuContent>
			</DropdownMenu>
			<DropdownMenu>
				<DropdownMenuTrigger asChild>
					<Button variant="outline" size="sm" className="gap-2">
						Tier
						<ChevronDown className="size-3.5" />
					</Button>
				</DropdownMenuTrigger>
				<DropdownMenuContent>
					<DropdownMenuItem>All Tiers</DropdownMenuItem>
					<DropdownMenuItem>Standard</DropdownMenuItem>
					<DropdownMenuItem>Premium</DropdownMenuItem>
					<DropdownMenuItem>VIP</DropdownMenuItem>
				</DropdownMenuContent>
			</DropdownMenu>
		</div>
	</div>
);

const StatusBadge = ({ status }: { status: CustomerCard['status'] }) => {
	const config = {
		active: {
			label: 'Active',
			className: 'bg-emerald-500/10 text-emerald-500',
		},
		inactive: {
			label: 'Inactive',
			className: 'bg-slate-500/10 text-slate-400',
		},
		pending: { label: 'Pending', className: 'bg-amber-500/10 text-amber-500' },
	};
	return (
		<div
			className={`rounded-full px-2 py-0.5 text-xs font-medium ${config[status].className}`}
		>
			{config[status].label}
		</div>
	);
};

const TierBadge = ({ tier }: { tier: CustomerCard['tier'] }) => {
	const config = {
		standard: {
			label: 'Standard',
			className: 'border-slate-500/20 text-slate-400',
		},
		premium: {
			label: 'Premium',
			className: 'border-amber-500/20 text-amber-500',
		},
		vip: { label: 'VIP', className: 'border-violet-500/20 text-violet-500' },
	};
	return (
		<Badge variant="outline" className={`${config[tier].className} gap-1`}>
			{tier === 'vip' && <Star className="size-3 fill-current" />}
			{config[tier].label}
		</Badge>
	);
};

const CustomerCardItem = ({ customer }: { customer: CustomerCard }) => (
	<Card className="group transition-shadow hover:shadow-lg">
		<CardHeader className="pb-3">
			<div className="flex items-start justify-between">
				<div className="flex items-center gap-3">
					<Avatar className="size-12">
						<AvatarImage src={customer.avatar} alt={customer.name} />
						<AvatarFallback className="bg-primary/10 text-primary">
							{customer.initials}
						</AvatarFallback>
					</Avatar>
					<div>
						<div className="flex items-center gap-2">
							<p className="font-semibold">{customer.name}</p>
							<StatusBadge status={customer.status} />
						</div>
						<p className="text-muted-foreground text-sm">{customer.email}</p>
					</div>
				</div>
				<DropdownMenu>
					<DropdownMenuTrigger asChild>
						<Button
							variant="ghost"
							size="icon-sm"
							className="opacity-0 group-hover:opacity-100"
						>
							<MoreHorizontal className="size-4" />
						</Button>
					</DropdownMenuTrigger>
					<DropdownMenuContent align="end">
						<DropdownMenuItem>View profile</DropdownMenuItem>
						<DropdownMenuItem>Edit customer</DropdownMenuItem>
						<DropdownMenuSeparator />
						<DropdownMenuItem>Send email</DropdownMenuItem>
						<DropdownMenuItem className="text-destructive">
							Delete
						</DropdownMenuItem>
					</DropdownMenuContent>
				</DropdownMenu>
			</div>
		</CardHeader>
		<CardContent className="space-y-4">
			<div className="flex flex-wrap gap-1">
				<TierBadge tier={customer.tier} />
				{customer.tags.map((tag) => (
					<Badge key={tag} variant="secondary" className="text-xs">
						{tag}
					</Badge>
				))}
			</div>
			<div className="grid grid-cols-2 gap-4 text-sm">
				<div>
					<p className="text-muted-foreground">Total Orders</p>
					<p className="flex items-center gap-1 font-semibold">
						<ShoppingBag className="size-4" />
						{customer.totalOrders}
					</p>
				</div>
				<div>
					<p className="text-muted-foreground">Total Spent</p>
					<p className="font-semibold">{customer.totalSpent}</p>
				</div>
			</div>
		</CardContent>
		<CardFooter className="border-t pt-4">
			<div className="flex w-full items-center justify-between">
				<p className="text-muted-foreground text-xs">
					Member since {customer.joinDate}
				</p>
				<div className="flex gap-1">
					<Button variant="ghost" size="icon-sm">
						<Mail className="size-4" />
					</Button>
					<Button variant="ghost" size="icon-sm">
						<Phone className="size-4" />
					</Button>
				</div>
			</div>
		</CardFooter>
	</Card>
);

export default function Main() {
	const customers: CustomerCard[] = [
		{
			id: '1',
			name: 'Alexandra Johnson',
			email: 'alex.j@email.com',
			phone: '+1 (555) 123-4567',
			initials: 'AJ',
			status: 'active',
			tier: 'vip',
			totalOrders: 47,
			totalSpent: '$12,450',
			joinDate: 'Jan 2022',
			tags: ['Loyal', 'High Value'],
		},
		{
			id: '2',
			name: 'Benjamin Carter',
			email: 'ben.c@email.com',
			phone: '+1 (555) 234-5678',
			initials: 'BC',
			status: 'active',
			tier: 'premium',
			totalOrders: 23,
			totalSpent: '$4,890',
			joinDate: 'Mar 2023',
			tags: ['Returning'],
		},
		{
			id: '3',
			name: 'Caroline Davis',
			email: 'caroline.d@email.com',
			phone: '+1 (555) 345-6789',
			initials: 'CD',
			status: 'inactive',
			tier: 'standard',
			totalOrders: 5,
			totalSpent: '$450',
			joinDate: 'Aug 2023',
			tags: ['At Risk'],
		},
		{
			id: '4',
			name: 'Daniel Evans',
			email: 'daniel.e@email.com',
			phone: '+1 (555) 456-7890',
			initials: 'DE',
			status: 'pending',
			tier: 'standard',
			totalOrders: 0,
			totalSpent: '$0',
			joinDate: 'Jan 2024',
			tags: ['New'],
		},
		{
			id: '5',
			name: 'Elena Foster',
			email: 'elena.f@email.com',
			phone: '+1 (555) 567-8901',
			initials: 'EF',
			status: 'active',
			tier: 'premium',
			totalOrders: 34,
			totalSpent: '$7,230',
			joinDate: 'Jun 2022',
			tags: ['Engaged'],
		},
		{
			id: '6',
			name: 'Frank Garcia',
			email: 'frank.g@email.com',
			phone: '+1 (555) 678-9012',
			initials: 'FG',
			status: 'active',
			tier: 'vip',
			totalOrders: 89,
			totalSpent: '$24,560',
			joinDate: 'Nov 2021',
			tags: ['Top Spender', 'VIP'],
		},
	];

	return (
		<section className="@container" data-theme="dashboard">
			<div className="mx-auto max-w-7xl space-y-6 px-4 py-8 @sm:px-6 @2xl:px-8">
				<PageHeader
					title="Customers"
					subtitle="Manage your customer database"
				/>
				<SearchAndFilter searchPlaceholder="Search customers..." />
				<div className="grid gap-4 @sm:grid-cols-2 @xl:grid-cols-3">
					{customers.map((customer) => (
						<CustomerCardItem key={customer.id} customer={customer} />
					))}
				</div>
			</div>
		</section>
	);
}
