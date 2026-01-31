import {
	ArrowUpRight,
	Mail,
	MapPin,
	MoreHorizontal,
	Phone,
	ShoppingCart,
	Star,
} from 'lucide-react';

import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';

type CustomerCard = {
	id: string;
	name: string;
	email: string;
	phone: string;
	location: string;
	initials: string;
	orders: number;
	spent: string;
	lastOrder: string;
	segment: 'vip' | 'regular' | 'new';
};

const getSegmentStyle = (segment: CustomerCard['segment']) => {
	switch (segment) {
		case 'vip':
			return 'bg-amber-500/10 text-amber-500 border-amber-500/20';
		case 'regular':
			return 'bg-primary/10 text-primary border-primary/20';
		case 'new':
			return 'bg-emerald-500/10 text-emerald-500 border-emerald-500/20';
	}
};

const CustomerCardComponent = (customer: CustomerCard) => (
	<Card>
		<CardContent className="p-4">
			<div className="flex items-start justify-between">
				<div className="flex items-center gap-3">
					<Avatar className="size-12 border-2 border-background shadow">
						<AvatarFallback className="text-sm font-medium">{customer.initials}</AvatarFallback>
					</Avatar>
					<div>
						<p className="font-medium">{customer.name}</p>
						<Badge variant="outline" className={`mt-1 ${getSegmentStyle(customer.segment)}`}>
							{customer.segment === 'vip' && <Star className="mr-1 size-3 fill-current" />}
							{customer.segment.toUpperCase()}
						</Badge>
					</div>
				</div>
				<Button variant="ghost" size="icon" className="size-8">
					<MoreHorizontal className="size-4" />
				</Button>
			</div>
			<div className="mt-4 space-y-2">
				<div className="flex items-center gap-2 text-sm text-muted-foreground">
					<Mail className="size-3.5" />
					{customer.email}
				</div>
				<div className="flex items-center gap-2 text-sm text-muted-foreground">
					<Phone className="size-3.5" />
					{customer.phone}
				</div>
				<div className="flex items-center gap-2 text-sm text-muted-foreground">
					<MapPin className="size-3.5" />
					{customer.location}
				</div>
			</div>
			<div className="mt-4 grid grid-cols-3 gap-2 rounded-lg bg-muted/50 p-3">
				<div className="text-center">
					<p className="text-lg font-bold">{customer.orders}</p>
					<p className="text-xs text-muted-foreground">Orders</p>
				</div>
				<div className="text-center">
					<p className="text-lg font-bold">{customer.spent}</p>
					<p className="text-xs text-muted-foreground">Spent</p>
				</div>
				<div className="text-center">
					<p className="text-xs font-medium">{customer.lastOrder}</p>
					<p className="text-xs text-muted-foreground">Last Order</p>
				</div>
			</div>
			<div className="mt-4 flex gap-2">
				<Button variant="outline" size="sm" className="flex-1 gap-1">
					<Mail className="size-3.5" />
					Message
				</Button>
				<Button size="sm" className="flex-1 gap-1">
					<ShoppingCart className="size-3.5" />
					View Orders
				</Button>
			</div>
		</CardContent>
	</Card>
);

export default function Main() {
	const customers: CustomerCard[] = [
		{ id: 'CUS-001', name: 'Sarah Wilson', email: 'sarah@example.com', phone: '+1 555-0101', location: 'New York, US', initials: 'SW', orders: 45, spent: '$4,521', lastOrder: 'Dec 12', segment: 'vip' },
		{ id: 'CUS-002', name: 'Michael Chen', email: 'michael@example.com', phone: '+1 555-0102', location: 'San Francisco, US', initials: 'MC', orders: 38, spent: '$3,892', lastOrder: 'Dec 11', segment: 'vip' },
		{ id: 'CUS-003', name: 'Emma Johnson', email: 'emma@example.com', phone: '+44 20-7946', location: 'London, UK', initials: 'EJ', orders: 22, spent: '$2,145', lastOrder: 'Dec 10', segment: 'regular' },
		{ id: 'CUS-004', name: 'James Brown', email: 'james@example.com', phone: '+1 416-555', location: 'Toronto, CA', initials: 'JB', orders: 12, spent: '$987', lastOrder: 'Dec 08', segment: 'regular' },
		{ id: 'CUS-005', name: 'Lisa Davis', email: 'lisa@example.com', phone: '+61 2-8765', location: 'Sydney, AU', initials: 'LD', orders: 2, spent: '$234', lastOrder: 'Dec 12', segment: 'new' },
		{ id: 'CUS-006', name: 'Robert Miller', email: 'robert@example.com', phone: '+49 30-1234', location: 'Berlin, DE', initials: 'RM', orders: 3, spent: '$456', lastOrder: 'Dec 11', segment: 'new' },
	];

	return (
		<section className="@container" data-theme="dashboard">
			<div className="mx-auto max-w-7xl px-4 py-8 @sm:px-6 @md:py-10 @2xl:px-8 @3xl:py-12">
				<div className="grid gap-4 @sm:grid-cols-2 @xl:grid-cols-3">
					{customers.map((customer) => (
						<CustomerCardComponent key={customer.id} {...customer} />
					))}
				</div>
			</div>
		</section>
	);
}
