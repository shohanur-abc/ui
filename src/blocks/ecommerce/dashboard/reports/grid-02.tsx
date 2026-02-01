'use client';

import { ArrowUpRight, Eye, ShoppingCart, Star } from 'lucide-react';

import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';

type CustomerReportItem = {
	name: string;
	email: string;
	avatar: string;
	initials: string;
	totalSpent: string;
	orders: number;
	rating: number;
	conversionRate: number;
	status: 'active' | 'inactive' | 'new';
};

type CustomerCardProps = CustomerReportItem;

const StatusBadge = ({ status }: { status: CustomerReportItem['status'] }) => {
	const variants = {
		active: 'bg-emerald-500/10 text-emerald-500 border-emerald-500/20',
		inactive: 'bg-rose-500/10 text-rose-500 border-rose-500/20',
		new: 'bg-amber-500/10 text-amber-500 border-amber-500/20',
	};

	return (
		<Badge variant="outline" className={variants[status]}>
			{status.charAt(0).toUpperCase() + status.slice(1)}
		</Badge>
	);
};

const CustomerCard = ({
	name,
	email,
	avatar,
	initials,
	totalSpent,
	orders,
	rating,
	conversionRate,
	status,
}: CustomerCardProps) => (
	<Card className="group relative overflow-hidden border-border/50 bg-card/80 backdrop-blur-sm transition-all duration-300 hover:border-primary/30 hover:shadow-lg hover:shadow-primary/5">
		<div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
		<CardContent className="relative p-4 @sm:p-5">
			<div className="flex items-start gap-4">
				<Avatar className="size-12 ring-2 ring-border/50">
					<AvatarImage src={avatar} alt={name} />
					<AvatarFallback className="bg-primary/10 text-primary">
						{initials}
					</AvatarFallback>
				</Avatar>
				<div className="min-w-0 flex-1">
					<div className="flex items-start justify-between gap-2">
						<div>
							<h3 className="truncate font-semibold">{name}</h3>
							<p className="truncate text-sm text-muted-foreground">{email}</p>
						</div>
						<StatusBadge status={status} />
					</div>
					<div className="mt-4 grid grid-cols-3 gap-4">
						<div>
							<p className="text-xs text-muted-foreground">Total Spent</p>
							<p className="font-semibold">{totalSpent}</p>
						</div>
						<div>
							<p className="text-xs text-muted-foreground">Orders</p>
							<p className="font-semibold">{orders}</p>
						</div>
						<div>
							<p className="text-xs text-muted-foreground">Rating</p>
							<div className="flex items-center gap-1">
								<Star className="size-3 fill-amber-500 text-amber-500" />
								<span className="font-semibold">{rating}</span>
							</div>
						</div>
					</div>
					<div className="mt-3">
						<div className="mb-1 flex items-center justify-between text-xs">
							<span className="text-muted-foreground">Conversion Rate</span>
							<span className="font-medium">{conversionRate}%</span>
						</div>
						<Progress value={conversionRate} className="h-1.5" />
					</div>
				</div>
			</div>
		</CardContent>
	</Card>
);

type HeaderProps = {
	title: string;
	totalCustomers: number;
	activePercentage: string;
};

const ReportHeader = ({
	title,
	totalCustomers,
	activePercentage,
}: HeaderProps) => (
	<div className="mb-6 flex flex-col gap-4 @sm:flex-row @sm:items-center @sm:justify-between">
		<div>
			<h2 className="text-xl font-bold @sm:text-2xl">{title}</h2>
			<p className="text-sm text-muted-foreground">
				{totalCustomers.toLocaleString()} total customers • {activePercentage}{' '}
				active
			</p>
		</div>
	</div>
);

export default function Main() {
	const headerProps: HeaderProps = {
		title: 'Customer Insights Report',
		totalCustomers: 2847,
		activePercentage: '78%',
	};

	const customers: CustomerReportItem[] = [
		{
			name: 'Sarah Johnson',
			email: 'sarah.j@email.com',
			avatar: '',
			initials: 'SJ',
			totalSpent: '$4,250',
			orders: 28,
			rating: 4.9,
			conversionRate: 85,
			status: 'active',
		},
		{
			name: 'Michael Chen',
			email: 'mchen@email.com',
			avatar: '',
			initials: 'MC',
			totalSpent: '$3,180',
			orders: 21,
			rating: 4.7,
			conversionRate: 72,
			status: 'active',
		},
		{
			name: 'Emily Davis',
			email: 'emily.d@email.com',
			avatar: '',
			initials: 'ED',
			totalSpent: '$2,890',
			orders: 19,
			rating: 4.8,
			conversionRate: 68,
			status: 'new',
		},
		{
			name: 'James Wilson',
			email: 'jwilson@email.com',
			avatar: '',
			initials: 'JW',
			totalSpent: '$1,540',
			orders: 12,
			rating: 4.5,
			conversionRate: 45,
			status: 'inactive',
		},
		{
			name: 'Amanda Roberts',
			email: 'aroberts@email.com',
			avatar: '',
			initials: 'AR',
			totalSpent: '$2,120',
			orders: 15,
			rating: 4.6,
			conversionRate: 58,
			status: 'active',
		},
		{
			name: 'David Kim',
			email: 'dkim@email.com',
			avatar: '',
			initials: 'DK',
			totalSpent: '$890',
			orders: 7,
			rating: 4.3,
			conversionRate: 32,
			status: 'new',
		},
	];

	return (
		<section className="@container" data-theme="reports">
			<div className="mx-auto max-w-7xl px-4 py-8 @sm:px-6 @md:py-10 @2xl:px-8 @3xl:py-12">
				<ReportHeader {...headerProps} />
				<div className="grid gap-4 @sm:grid-cols-2 @xl:grid-cols-3 @xl:gap-6">
					{customers.map((customer, i) => (
						<CustomerCard key={i} {...customer} />
					))}
				</div>
			</div>
		</section>
	);
}
