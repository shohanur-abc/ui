'use client';

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import {
	Table,
	TableBody,
	TableCell,
	TableHead,
	TableHeader,
	TableRow,
} from '@/components/ui/table';

type Customer = {
	name: string;
	email: string;
	orders: number;
	spent: number;
	lastOrder: string;
	status: 'active' | 'inactive' | 'new';
};

const CustomerRow = ({ customer }: { customer: Customer }) => (
	<TableRow className="hover:bg-muted/30">
		<TableCell>
			<div className="flex items-center gap-3">
				<Avatar className="size-8">
					<AvatarFallback className="text-xs bg-primary/10 text-primary">
						{customer.name
							.split(' ')
							.map((n) => n[0])
							.join('')}
					</AvatarFallback>
				</Avatar>
				<div>
					<p className="font-medium text-sm">{customer.name}</p>
					<p className="text-xs text-muted-foreground">{customer.email}</p>
				</div>
			</div>
		</TableCell>
		<TableCell>{customer.orders}</TableCell>
		<TableCell>${customer.spent.toLocaleString()}</TableCell>
		<TableCell>{customer.lastOrder}</TableCell>
		<TableCell>
			<Badge
				variant="outline"
				className={
					customer.status === 'active'
						? 'text-emerald-500 border-emerald-500/30'
						: customer.status === 'new'
							? 'text-blue-500 border-blue-500/30'
							: 'text-slate-500 border-slate-500/30'
				}
			>
				{customer.status.charAt(0).toUpperCase() + customer.status.slice(1)}
			</Badge>
		</TableCell>
	</TableRow>
);

const customers: Customer[] = [
	{
		name: 'Sarah Johnson',
		email: 'sarah@example.com',
		orders: 28,
		spent: 4520,
		lastOrder: '2 hours ago',
		status: 'active',
	},
	{
		name: 'Michael Chen',
		email: 'michael@example.com',
		orders: 42,
		spent: 8920,
		lastOrder: '1 day ago',
		status: 'active',
	},
	{
		name: 'Emily Davis',
		email: 'emily@example.com',
		orders: 15,
		spent: 2340,
		lastOrder: '3 days ago',
		status: 'active',
	},
	{
		name: 'James Wilson',
		email: 'james@example.com',
		orders: 3,
		spent: 450,
		lastOrder: '1 week ago',
		status: 'new',
	},
	{
		name: 'Lisa Brown',
		email: 'lisa@example.com',
		orders: 8,
		spent: 1280,
		lastOrder: '2 weeks ago',
		status: 'inactive',
	},
	{
		name: 'David Lee',
		email: 'david@example.com',
		orders: 56,
		spent: 12450,
		lastOrder: '5 hours ago',
		status: 'active',
	},
];

export default function Main() {
	return (
		<section className="@container" data-theme="dashboard">
			<div className="mx-auto max-w-7xl px-4 @sm:px-6 @2xl:px-8 py-8 @md:py-12 @xl:py-16">
				<Card className="border-border/50 bg-card/80 backdrop-blur-sm">
					<CardHeader className="pb-2">
						<CardTitle className="text-sm font-medium">Top Customers</CardTitle>
						<p className="text-xs text-muted-foreground">
							Customer engagement and spending
						</p>
					</CardHeader>
					<CardContent>
						<div className="overflow-x-auto">
							<Table>
								<TableHeader>
									<TableRow>
										<TableHead>Customer</TableHead>
										<TableHead>Orders</TableHead>
										<TableHead>Total Spent</TableHead>
										<TableHead>Last Order</TableHead>
										<TableHead>Status</TableHead>
									</TableRow>
								</TableHeader>
								<TableBody>
									{customers.map((customer, i) => (
										<CustomerRow key={i} customer={customer} />
									))}
								</TableBody>
							</Table>
						</div>
					</CardContent>
				</Card>
			</div>
		</section>
	);
}
