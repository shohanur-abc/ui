'use client';

import { Users, UserPlus, UserCheck, UserX } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';

type CustomerData = {
	name: string;
	email: string;
	avatar: string;
	initials: string;
	totalSpent: string;
	orders: number;
	status: 'active' | 'new' | 'returning' | 'churned';
};

type CustomerInsightCardProps = {
	title: string;
	customers: CustomerData[];
};

const statusConfig = {
	active: { label: 'Active', variant: 'default' as const },
	new: { label: 'New', variant: 'secondary' as const },
	returning: { label: 'Returning', variant: 'outline' as const },
	churned: { label: 'At Risk', variant: 'destructive' as const },
};

const CustomerInsightCard = ({
	title,
	customers,
}: CustomerInsightCardProps) => (
	<Card className="group relative overflow-hidden transition-all duration-300 hover:shadow-lg hover:shadow-primary/5 hover:border-primary/30">
		<CardHeader className="flex flex-row items-center gap-3 pb-4">
			<div className="p-2 rounded-lg bg-primary/10 text-primary">
				<Users className="size-4" />
			</div>
			<CardTitle className="text-base font-semibold">{title}</CardTitle>
		</CardHeader>
		<CardContent>
			<div className="space-y-3">
				{customers.map((customer, idx) => (
					<div
						key={idx}
						className="flex items-center gap-4 p-3 rounded-lg bg-muted/30 hover:bg-muted/50 transition-colors"
					>
						<Avatar className="size-10">
							<AvatarImage src={customer.avatar} alt={customer.name} />
							<AvatarFallback>{customer.initials}</AvatarFallback>
						</Avatar>
						<div className="flex-1 min-w-0">
							<div className="flex items-center gap-2">
								<p className="font-medium truncate">{customer.name}</p>
								<Badge variant={statusConfig[customer.status].variant}>
									{statusConfig[customer.status].label}
								</Badge>
							</div>
							<p className="text-xs text-muted-foreground truncate">
								{customer.email}
							</p>
						</div>
						<div className="text-right">
							<p className="font-semibold">{customer.totalSpent}</p>
							<p className="text-xs text-muted-foreground">
								{customer.orders} orders
							</p>
						</div>
					</div>
				))}
			</div>
		</CardContent>
	</Card>
);

export default function Main() {
	const customers: CustomerData[] = [
		{
			name: 'Sarah Johnson',
			email: 'sarah.j@example.com',
			avatar:
				'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100',
			initials: 'SJ',
			totalSpent: '$4,250',
			orders: 28,
			status: 'active',
		},
		{
			name: 'Michael Chen',
			email: 'michael.c@example.com',
			avatar:
				'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100',
			initials: 'MC',
			totalSpent: '$3,890',
			orders: 22,
			status: 'returning',
		},
		{
			name: 'Emily Davis',
			email: 'emily.d@example.com',
			avatar:
				'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=100',
			initials: 'ED',
			totalSpent: '$520',
			orders: 3,
			status: 'new',
		},
		{
			name: 'James Wilson',
			email: 'james.w@example.com',
			avatar:
				'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=100',
			initials: 'JW',
			totalSpent: '$2,150',
			orders: 12,
			status: 'churned',
		},
	];

	return (
		<section className="@container" data-theme="sales">
			<div className="mx-auto max-w-7xl px-4 @sm:px-6 @2xl:px-8 py-8 @md:py-12">
				<div className="max-w-2xl mx-auto">
					<CustomerInsightCard
						title="Customer Insights"
						customers={customers}
					/>
				</div>
			</div>
		</section>
	);
}
