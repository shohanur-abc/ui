import {
	ArrowRight,
	Clock,
	Mail,
	MapPin,
	MessageSquare,
	MoreHorizontal,
	Package,
	Phone,
	ShoppingBag,
	Star,
	Tag,
} from 'lucide-react';

import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardFooter } from '@/components/ui/card';
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuItem,
	DropdownMenuSeparator,
	DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';

interface RecentCustomer {
	id: string;
	name: string;
	email: string;
	phone: string;
	avatar?: string;
	initials: string;
	lastOrder: {
		id: string;
		amount: string;
		items: number;
		date: string;
	};
	location: {
		city: string;
		country: string;
	};
	isNewCustomer: boolean;
	hasActiveOrder: boolean;
	recentActivity: string;
	tags: string[];
}

const PageHeader = ({
	title,
	subtitle,
	actionLabel,
}: {
	title: string;
	subtitle: string;
	actionLabel: string;
}) => (
	<div className="flex items-center justify-between">
		<div>
			<h1 className="text-2xl font-bold tracking-tight">{title}</h1>
			<p className="text-muted-foreground text-sm">{subtitle}</p>
		</div>
		<Button variant="outline" size="sm" className="gap-2">
			{actionLabel}
			<ArrowRight className="size-4" />
		</Button>
	</div>
);

const CustomerCard = ({ customer }: { customer: RecentCustomer }) => (
	<Card className="group overflow-hidden transition-all hover:shadow-lg">
		<CardContent className="p-0">
			<div className="flex items-start justify-between p-4">
				<div className="flex items-center gap-3">
					<div className="relative">
						<Avatar className="size-12">
							<AvatarImage src={customer.avatar} alt={customer.name} />
							<AvatarFallback className="bg-primary/10 text-primary">
								{customer.initials}
							</AvatarFallback>
						</Avatar>
						{customer.hasActiveOrder && (
							<div className="absolute -right-0.5 -top-0.5 size-3 rounded-full border-2 border-background bg-emerald-500" />
						)}
					</div>
					<div>
						<div className="flex items-center gap-2">
							<p className="font-semibold">{customer.name}</p>
							{customer.isNewCustomer && (
								<Badge className="bg-blue-500/10 text-blue-500 text-xs">New</Badge>
							)}
						</div>
						<p className="text-muted-foreground text-xs">{customer.email}</p>
					</div>
				</div>
				<DropdownMenu>
					<DropdownMenuTrigger asChild>
						<Button variant="ghost" size="icon-sm" className="opacity-0 group-hover:opacity-100">
							<MoreHorizontal className="size-4" />
						</Button>
					</DropdownMenuTrigger>
					<DropdownMenuContent align="end">
						<DropdownMenuItem>View profile</DropdownMenuItem>
						<DropdownMenuItem>View orders</DropdownMenuItem>
						<DropdownMenuSeparator />
						<DropdownMenuItem>Send message</DropdownMenuItem>
					</DropdownMenuContent>
				</DropdownMenu>
			</div>

			<div className="border-t border-b bg-muted/30 px-4 py-3">
				<div className="flex items-center justify-between">
					<div className="flex items-center gap-2">
						<ShoppingBag className="text-muted-foreground size-4" />
						<span className="text-sm font-medium">Last Order</span>
					</div>
					<Badge variant="outline" className="font-mono text-xs">
						#{customer.lastOrder.id}
					</Badge>
				</div>
				<div className="mt-2 flex items-center justify-between text-sm">
					<span className="text-muted-foreground">{customer.lastOrder.items} items</span>
					<span className="font-semibold">{customer.lastOrder.amount}</span>
				</div>
				<p className="text-muted-foreground mt-1 text-xs">{customer.lastOrder.date}</p>
			</div>

			<div className="space-y-2 p-4">
				<div className="flex items-center gap-2 text-sm">
					<MapPin className="text-muted-foreground size-3.5" />
					<span className="text-muted-foreground">
						{customer.location.city}, {customer.location.country}
					</span>
				</div>
				<div className="flex items-center gap-2 text-sm">
					<Phone className="text-muted-foreground size-3.5" />
					<span className="text-muted-foreground">{customer.phone}</span>
				</div>
				<div className="flex items-center gap-2 text-sm">
					<Clock className="text-muted-foreground size-3.5" />
					<span className="text-muted-foreground">{customer.recentActivity}</span>
				</div>
			</div>

			{customer.tags.length > 0 && (
				<div className="flex flex-wrap gap-1 px-4 pb-4">
					{customer.tags.map((tag) => (
						<Badge key={tag} variant="secondary" className="text-xs">
							{tag}
						</Badge>
					))}
				</div>
			)}
		</CardContent>
		<CardFooter className="grid grid-cols-3 gap-2 border-t bg-muted/20 px-4 py-3">
			<Button variant="ghost" size="sm" className="gap-1.5 text-xs">
				<Mail className="size-3.5" />
				Email
			</Button>
			<Button variant="ghost" size="sm" className="gap-1.5 text-xs">
				<MessageSquare className="size-3.5" />
				Message
			</Button>
			<Button variant="ghost" size="sm" className="gap-1.5 text-xs">
				<Package className="size-3.5" />
				Orders
			</Button>
		</CardFooter>
	</Card>
);

export default function Main() {
	const customers: RecentCustomer[] = [
		{
			id: '1',
			name: 'Emma Thompson',
			email: 'emma.t@email.com',
			phone: '+1 (555) 123-4567',
			initials: 'ET',
			lastOrder: { id: 'ORD-4521', amount: '$234.99', items: 3, date: '2 hours ago' },
			location: { city: 'New York', country: 'USA' },
			isNewCustomer: false,
			hasActiveOrder: true,
			recentActivity: 'Placed order 2 hours ago',
			tags: ['VIP', 'Frequent Buyer'],
		},
		{
			id: '2',
			name: 'Lucas Martinez',
			email: 'lucas.m@email.com',
			phone: '+1 (555) 234-5678',
			initials: 'LM',
			lastOrder: { id: 'ORD-4520', amount: '$89.50', items: 1, date: '5 hours ago' },
			location: { city: 'Los Angeles', country: 'USA' },
			isNewCustomer: true,
			hasActiveOrder: true,
			recentActivity: 'First order placed',
			tags: ['New Customer'],
		},
		{
			id: '3',
			name: 'Sophie Chen',
			email: 'sophie.c@email.com',
			phone: '+1 (555) 345-6789',
			initials: 'SC',
			lastOrder: { id: 'ORD-4518', amount: '$456.00', items: 5, date: 'Yesterday' },
			location: { city: 'San Francisco', country: 'USA' },
			isNewCustomer: false,
			hasActiveOrder: false,
			recentActivity: 'Viewed 12 products',
			tags: ['Premium', 'Tech Enthusiast'],
		},
		{
			id: '4',
			name: 'Oliver Brown',
			email: 'oliver.b@email.com',
			phone: '+1 (555) 456-7890',
			initials: 'OB',
			lastOrder: { id: 'ORD-4515', amount: '$178.25', items: 2, date: '2 days ago' },
			location: { city: 'Chicago', country: 'USA' },
			isNewCustomer: false,
			hasActiveOrder: false,
			recentActivity: 'Left a review',
			tags: ['Returning'],
		},
		{
			id: '5',
			name: 'Ava Wilson',
			email: 'ava.w@email.com',
			phone: '+1 (555) 567-8901',
			initials: 'AW',
			lastOrder: { id: 'ORD-4512', amount: '$567.80', items: 7, date: '3 days ago' },
			location: { city: 'Miami', country: 'USA' },
			isNewCustomer: false,
			hasActiveOrder: true,
			recentActivity: 'Contacted support',
			tags: ['VIP', 'High Value'],
		},
		{
			id: '6',
			name: 'Noah Davis',
			email: 'noah.d@email.com',
			phone: '+1 (555) 678-9012',
			initials: 'ND',
			lastOrder: { id: 'ORD-4508', amount: '$123.45', items: 2, date: '4 days ago' },
			location: { city: 'Seattle', country: 'USA' },
			isNewCustomer: true,
			hasActiveOrder: false,
			recentActivity: 'Added items to wishlist',
			tags: ['New Customer', 'Newsletter'],
		},
	];

	return (
		<section className="@container" data-theme="dashboard">
			<div className="mx-auto max-w-7xl space-y-6 px-4 py-8 @sm:px-6 @2xl:px-8">
				<PageHeader
					title="Recent Customers"
					subtitle="Customers with recent activity"
					actionLabel="View All"
				/>
				<div className="grid gap-4 @sm:grid-cols-2 @xl:grid-cols-3">
					{customers.map((customer) => (
						<CustomerCard key={customer.id} customer={customer} />
					))}
				</div>
			</div>
		</section>
	);
}
