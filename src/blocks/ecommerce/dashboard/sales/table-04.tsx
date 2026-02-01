'use client';

import { Users, Star, ShoppingBag } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import {
	Table,
	TableBody,
	TableCell,
	TableHead,
	TableHeader,
	TableRow,
} from '@/components/ui/table';

type Customer = {
	id: string;
	name: string;
	avatar: string;
	email: string;
	totalSpent: number;
	ordersCount: number;
	avgOrderValue: number;
	tier: 'platinum' | 'gold' | 'silver' | 'bronze';
	lastPurchase: string;
};

type CustomerTableCardProps = {
	title: string;
	description: string;
	customers: Customer[];
};

const getTierStyle = (tier: Customer['tier']) => {
	switch (tier) {
		case 'platinum':
			return 'bg-gradient-to-r from-slate-400 to-slate-600 text-white border-0';
		case 'gold':
			return 'bg-gradient-to-r from-amber-400 to-amber-600 text-white border-0';
		case 'silver':
			return 'bg-gradient-to-r from-gray-300 to-gray-500 text-white border-0';
		case 'bronze':
			return 'bg-gradient-to-r from-orange-400 to-orange-600 text-white border-0';
	}
};

const CustomerTableCard = ({
	title,
	description,
	customers,
}: CustomerTableCardProps) => (
	<Card className="group relative overflow-hidden transition-all duration-300 hover:shadow-lg hover:shadow-primary/5 hover:border-primary/30">
		<CardHeader className="flex flex-row items-center gap-3 pb-2">
			<div className="p-2 rounded-lg bg-primary/10 text-primary">
				<Users className="size-4" />
			</div>
			<div>
				<CardTitle className="text-base font-semibold">{title}</CardTitle>
				<p className="text-sm text-muted-foreground">{description}</p>
			</div>
		</CardHeader>
		<CardContent>
			<div className="overflow-x-auto">
				<Table>
					<TableHeader>
						<TableRow>
							<TableHead>Customer</TableHead>
							<TableHead>Tier</TableHead>
							<TableHead className="text-right">Total Spent</TableHead>
							<TableHead className="text-right">Orders</TableHead>
							<TableHead className="text-right">Avg Order</TableHead>
							<TableHead>Last Purchase</TableHead>
						</TableRow>
					</TableHeader>
					<TableBody>
						{customers.map((customer) => (
							<TableRow
								key={customer.id}
								className="hover:bg-muted/50 transition-colors"
							>
								<TableCell>
									<div className="flex items-center gap-3">
										<Avatar className="size-10">
											<AvatarImage src={customer.avatar} alt={customer.name} />
											<AvatarFallback>
												{customer.name
													.split(' ')
													.map((n) => n[0])
													.join('')}
											</AvatarFallback>
										</Avatar>
										<div>
											<p className="font-medium">{customer.name}</p>
											<p className="text-xs text-muted-foreground">
												{customer.email}
											</p>
										</div>
									</div>
								</TableCell>
								<TableCell>
									<Badge className={getTierStyle(customer.tier)}>
										<Star className="size-3 mr-1" />
										{customer.tier}
									</Badge>
								</TableCell>
								<TableCell className="text-right font-semibold">
									${customer.totalSpent.toLocaleString()}
								</TableCell>
								<TableCell className="text-right">
									<span className="inline-flex items-center gap-1">
										<ShoppingBag className="size-3 text-muted-foreground" />
										{customer.ordersCount}
									</span>
								</TableCell>
								<TableCell className="text-right">
									${customer.avgOrderValue.toFixed(0)}
								</TableCell>
								<TableCell className="text-muted-foreground">
									{customer.lastPurchase}
								</TableCell>
							</TableRow>
						))}
					</TableBody>
				</Table>
			</div>
		</CardContent>
	</Card>
);

export default function Main() {
	const customers: Customer[] = [
		{
			id: 'CUS-001',
			name: 'Alexandra Chen',
			avatar: '/placeholder.svg',
			email: 'alex.chen@example.com',
			totalSpent: 12580,
			ordersCount: 42,
			avgOrderValue: 299,
			tier: 'platinum',
			lastPurchase: 'Today',
		},
		{
			id: 'CUS-002',
			name: 'Marcus Johnson',
			avatar: '/placeholder.svg',
			email: 'm.johnson@example.com',
			totalSpent: 8920,
			ordersCount: 28,
			avgOrderValue: 318,
			tier: 'gold',
			lastPurchase: '2 days ago',
		},
		{
			id: 'CUS-003',
			name: 'Sofia Rodriguez',
			avatar: '/placeholder.svg',
			email: 'sofia.r@example.com',
			totalSpent: 5640,
			ordersCount: 19,
			avgOrderValue: 297,
			tier: 'silver',
			lastPurchase: '5 days ago',
		},
		{
			id: 'CUS-004',
			name: 'James Williams',
			avatar: '/placeholder.svg',
			email: 'j.williams@example.com',
			totalSpent: 3280,
			ordersCount: 12,
			avgOrderValue: 273,
			tier: 'bronze',
			lastPurchase: '1 week ago',
		},
		{
			id: 'CUS-005',
			name: 'Emily Davis',
			avatar: '/placeholder.svg',
			email: 'e.davis@example.com',
			totalSpent: 9850,
			ordersCount: 35,
			avgOrderValue: 281,
			tier: 'gold',
			lastPurchase: 'Yesterday',
		},
	];

	return (
		<section className="@container" data-theme="sales">
			<div className="mx-auto max-w-7xl px-4 @sm:px-6 @2xl:px-8 py-8 @md:py-12">
				<CustomerTableCard
					title="Top Customers"
					description="Highest value customers by lifetime spend"
					customers={customers}
				/>
			</div>
		</section>
	);
}
