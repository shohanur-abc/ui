import {
	MapPin,
	MoreHorizontal,
	Star,
	Users,
} from 'lucide-react';

import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import {
	Table,
	TableBody,
	TableCell,
	TableHead,
	TableHeader,
	TableRow,
} from '@/components/ui/table';

type CustomerItem = {
	id: string;
	name: string;
	email: string;
	initials: string;
	location: string;
	orders: number;
	spent: string;
	lastOrder: string;
	segment: 'vip' | 'regular' | 'new' | 'inactive';
};

const getSegmentStyle = (segment: CustomerItem['segment']) => {
	switch (segment) {
		case 'vip':
			return 'bg-amber-500/10 text-amber-500';
		case 'regular':
			return 'bg-primary/10 text-primary';
		case 'new':
			return 'bg-emerald-500/10 text-emerald-500';
		case 'inactive':
			return 'bg-muted text-muted-foreground';
	}
};

const CustomerRow = (customer: CustomerItem) => (
	<TableRow>
		<TableCell>
			<div className="flex items-center gap-3">
				<Avatar className="size-9">
					<AvatarFallback className="text-xs">{customer.initials}</AvatarFallback>
				</Avatar>
				<div>
					<p className="font-medium">{customer.name}</p>
					<p className="text-xs text-muted-foreground">{customer.email}</p>
				</div>
			</div>
		</TableCell>
		<TableCell className="hidden @lg:table-cell">
			<div className="flex items-center gap-1.5 text-sm text-muted-foreground">
				<MapPin className="size-3" />
				{customer.location}
			</div>
		</TableCell>
		<TableCell>{customer.orders}</TableCell>
		<TableCell className="font-medium">{customer.spent}</TableCell>
		<TableCell className="hidden @xl:table-cell text-muted-foreground">{customer.lastOrder}</TableCell>
		<TableCell>
			<Badge variant="secondary" className={getSegmentStyle(customer.segment)}>
				{customer.segment}
			</Badge>
		</TableCell>
		<TableCell>
			<Button variant="ghost" size="icon" className="size-8">
				<MoreHorizontal className="size-4" />
			</Button>
		</TableCell>
	</TableRow>
);

export default function Main() {
	const allCustomers: CustomerItem[] = [
		{ id: 'CUS-001', name: 'Sarah Wilson', email: 'sarah@example.com', initials: 'SW', location: 'New York, US', orders: 45, spent: '$4,521', lastOrder: 'Dec 12, 2024', segment: 'vip' },
		{ id: 'CUS-002', name: 'Michael Chen', email: 'michael@example.com', initials: 'MC', location: 'San Francisco, US', orders: 38, spent: '$3,892', lastOrder: 'Dec 11, 2024', segment: 'vip' },
		{ id: 'CUS-003', name: 'Emma Johnson', email: 'emma@example.com', initials: 'EJ', location: 'London, UK', orders: 32, spent: '$3,245', lastOrder: 'Dec 10, 2024', segment: 'regular' },
		{ id: 'CUS-004', name: 'James Brown', email: 'james@example.com', initials: 'JB', location: 'Toronto, CA', orders: 12, spent: '$987', lastOrder: 'Dec 08, 2024', segment: 'regular' },
		{ id: 'CUS-005', name: 'Lisa Davis', email: 'lisa@example.com', initials: 'LD', location: 'Sydney, AU', orders: 2, spent: '$234', lastOrder: 'Dec 12, 2024', segment: 'new' },
		{ id: 'CUS-006', name: 'Robert Miller', email: 'robert@example.com', initials: 'RM', location: 'Berlin, DE', orders: 8, spent: '$456', lastOrder: 'Oct 15, 2024', segment: 'inactive' },
	];

	const vip = allCustomers.filter((c) => c.segment === 'vip');
	const regular = allCustomers.filter((c) => c.segment === 'regular');
	const newCustomers = allCustomers.filter((c) => c.segment === 'new');
	const inactive = allCustomers.filter((c) => c.segment === 'inactive');

	return (
		<section className="@container" data-theme="dashboard">
			<div className="mx-auto max-w-7xl px-4 py-8 @sm:px-6 @md:py-10 @2xl:px-8 @3xl:py-12">
				<Card>
					<CardHeader>
						<CardTitle className="flex items-center gap-2">
							<Users className="size-5 text-primary" />
							Customer Segments
						</CardTitle>
						<CardDescription>View customers by segment type</CardDescription>
					</CardHeader>
					<CardContent>
						<Tabs defaultValue="all" className="w-full">
							<TabsList className="mb-4">
								<TabsTrigger value="all">All ({allCustomers.length})</TabsTrigger>
								<TabsTrigger value="vip">
									<Star className="mr-1 size-3 fill-amber-500 text-amber-500" />
									VIP ({vip.length})
								</TabsTrigger>
								<TabsTrigger value="regular">Regular ({regular.length})</TabsTrigger>
								<TabsTrigger value="new">New ({newCustomers.length})</TabsTrigger>
								<TabsTrigger value="inactive">Inactive ({inactive.length})</TabsTrigger>
							</TabsList>
							<TabsContent value="all">
								<Table>
									<TableHeader>
										<TableRow>
											<TableHead>Customer</TableHead>
											<TableHead className="hidden @lg:table-cell">Location</TableHead>
											<TableHead>Orders</TableHead>
											<TableHead>Total Spent</TableHead>
											<TableHead className="hidden @xl:table-cell">Last Order</TableHead>
											<TableHead>Segment</TableHead>
											<TableHead className="w-10"></TableHead>
										</TableRow>
									</TableHeader>
									<TableBody>
										{allCustomers.map((customer) => (
											<CustomerRow key={customer.id} {...customer} />
										))}
									</TableBody>
								</Table>
							</TabsContent>
							<TabsContent value="vip">
								<Table>
									<TableHeader>
										<TableRow>
											<TableHead>Customer</TableHead>
											<TableHead className="hidden @lg:table-cell">Location</TableHead>
											<TableHead>Orders</TableHead>
											<TableHead>Total Spent</TableHead>
											<TableHead className="hidden @xl:table-cell">Last Order</TableHead>
											<TableHead>Segment</TableHead>
											<TableHead className="w-10"></TableHead>
										</TableRow>
									</TableHeader>
									<TableBody>
										{vip.map((customer) => (
											<CustomerRow key={customer.id} {...customer} />
										))}
									</TableBody>
								</Table>
							</TabsContent>
							<TabsContent value="regular">
								<Table>
									<TableHeader>
										<TableRow>
											<TableHead>Customer</TableHead>
											<TableHead className="hidden @lg:table-cell">Location</TableHead>
											<TableHead>Orders</TableHead>
											<TableHead>Total Spent</TableHead>
											<TableHead className="hidden @xl:table-cell">Last Order</TableHead>
											<TableHead>Segment</TableHead>
											<TableHead className="w-10"></TableHead>
										</TableRow>
									</TableHeader>
									<TableBody>
										{regular.map((customer) => (
											<CustomerRow key={customer.id} {...customer} />
										))}
									</TableBody>
								</Table>
							</TabsContent>
							<TabsContent value="new">
								<Table>
									<TableHeader>
										<TableRow>
											<TableHead>Customer</TableHead>
											<TableHead className="hidden @lg:table-cell">Location</TableHead>
											<TableHead>Orders</TableHead>
											<TableHead>Total Spent</TableHead>
											<TableHead className="hidden @xl:table-cell">Last Order</TableHead>
											<TableHead>Segment</TableHead>
											<TableHead className="w-10"></TableHead>
										</TableRow>
									</TableHeader>
									<TableBody>
										{newCustomers.map((customer) => (
											<CustomerRow key={customer.id} {...customer} />
										))}
									</TableBody>
								</Table>
							</TabsContent>
							<TabsContent value="inactive">
								<Table>
									<TableHeader>
										<TableRow>
											<TableHead>Customer</TableHead>
											<TableHead className="hidden @lg:table-cell">Location</TableHead>
											<TableHead>Orders</TableHead>
											<TableHead>Total Spent</TableHead>
											<TableHead className="hidden @xl:table-cell">Last Order</TableHead>
											<TableHead>Segment</TableHead>
											<TableHead className="w-10"></TableHead>
										</TableRow>
									</TableHeader>
									<TableBody>
										{inactive.map((customer) => (
											<CustomerRow key={customer.id} {...customer} />
										))}
									</TableBody>
								</Table>
							</TabsContent>
						</Tabs>
					</CardContent>
				</Card>
			</div>
		</section>
	);
}
