import {
	ArrowRight,
	ArrowUpRight,
	DollarSign,
	Mail,
	MapPin,
	MoreHorizontal,
	ShoppingBag,
	Star,
	TrendingUp,
	Users,
	type LucideIcon,
} from 'lucide-react';
import Link from 'next/link';

import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import {
	Table,
	TableBody,
	TableCell,
	TableHead,
	TableHeader,
	TableRow,
} from '@/components/ui/table';

type KpiItem = {
	title: string;
	value: string;
	change: string;
	icon: LucideIcon;
};

type CustomerRow = {
	id: string;
	name: string;
	email: string;
	avatar: string;
	initials: string;
	location: string;
	orders: number;
	spent: string;
	lastOrder: string;
	segment: 'vip' | 'regular' | 'new' | 'inactive';
};

const KpiMini = ({ title, value, change, icon: Icon }: KpiItem) => (
	<div className="flex items-center gap-3 rounded-xl border bg-card p-4">
		<div className="rounded-lg bg-primary/10 p-2">
			<Icon className="size-4 text-primary" />
		</div>
		<div className="flex-1">
			<p className="text-xs text-muted-foreground">{title}</p>
			<p className="text-lg font-bold">{value}</p>
		</div>
		<span className="flex items-center text-xs text-emerald-500">
			<ArrowUpRight className="size-3" />
			{change}
		</span>
	</div>
);

const getSegmentStyle = (segment: CustomerRow['segment']) => {
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

export default function Main() {
	const kpis: KpiItem[] = [
		{ title: 'Total Customers', value: '3,847', change: '+18%', icon: Users },
		{ title: 'New This Month', value: '234', change: '+24%', icon: TrendingUp },
		{
			title: 'Avg Lifetime Value',
			value: '$456',
			change: '+12%',
			icon: DollarSign,
		},
		{ title: 'VIP Customers', value: '156', change: '+8%', icon: Star },
	];

	const customers: CustomerRow[] = [
		{
			id: 'CUS-001',
			name: 'Sarah Wilson',
			email: 'sarah@example.com',
			avatar: '',
			initials: 'SW',
			location: 'New York, US',
			orders: 45,
			spent: '$4,521',
			lastOrder: 'Dec 12, 2024',
			segment: 'vip',
		},
		{
			id: 'CUS-002',
			name: 'Michael Chen',
			email: 'michael@example.com',
			avatar: '',
			initials: 'MC',
			location: 'San Francisco, US',
			orders: 38,
			spent: '$3,892',
			lastOrder: 'Dec 11, 2024',
			segment: 'vip',
		},
		{
			id: 'CUS-003',
			name: 'Emma Johnson',
			email: 'emma@example.com',
			avatar: '',
			initials: 'EJ',
			location: 'London, UK',
			orders: 32,
			spent: '$3,245',
			lastOrder: 'Dec 10, 2024',
			segment: 'regular',
		},
		{
			id: 'CUS-004',
			name: 'James Brown',
			email: 'james@example.com',
			avatar: '',
			initials: 'JB',
			location: 'Toronto, CA',
			orders: 12,
			spent: '$987',
			lastOrder: 'Dec 08, 2024',
			segment: 'regular',
		},
		{
			id: 'CUS-005',
			name: 'Lisa Davis',
			email: 'lisa@example.com',
			avatar: '',
			initials: 'LD',
			location: 'Sydney, AU',
			orders: 2,
			spent: '$234',
			lastOrder: 'Dec 12, 2024',
			segment: 'new',
		},
		{
			id: 'CUS-006',
			name: 'Robert Miller',
			email: 'robert@example.com',
			avatar: '',
			initials: 'RM',
			location: 'Berlin, DE',
			orders: 8,
			spent: '$456',
			lastOrder: 'Oct 15, 2024',
			segment: 'inactive',
		},
	];

	return (
		<section className="@container" data-theme="dashboard">
			<div className="mx-auto max-w-7xl px-4 py-8 @sm:px-6 @md:py-10 @2xl:px-8 @3xl:py-12">
				<div className="space-y-6">
					<div className="grid gap-4 @sm:grid-cols-2 @xl:grid-cols-4">
						{kpis.map((kpi, i) => (
							<KpiMini key={i} {...kpi} />
						))}
					</div>
					<Card>
						<CardHeader className="flex-row items-center justify-between pb-4">
							<CardTitle className="text-base">Customer Directory</CardTitle>
							<Button variant="ghost" size="sm" className="gap-1" asChild>
								<Link href="/customers">
									View All
									<ArrowRight className="size-3" />
								</Link>
							</Button>
						</CardHeader>
						<CardContent className="pt-0">
							<Table>
								<TableHeader>
									<TableRow>
										<TableHead>Customer</TableHead>
										<TableHead className="hidden @lg:table-cell">
											Location
										</TableHead>
										<TableHead>Orders</TableHead>
										<TableHead>Total Spent</TableHead>
										<TableHead className="hidden @xl:table-cell">
											Last Order
										</TableHead>
										<TableHead>Segment</TableHead>
										<TableHead className="w-10"></TableHead>
									</TableRow>
								</TableHeader>
								<TableBody>
									{customers.map((customer) => (
										<TableRow key={customer.id}>
											<TableCell>
												<div className="flex items-center gap-3">
													<Avatar className="size-9">
														<AvatarImage src={customer.avatar} />
														<AvatarFallback className="text-xs">
															{customer.initials}
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
											<TableCell className="hidden @lg:table-cell">
												<div className="flex items-center gap-1.5 text-sm text-muted-foreground">
													<MapPin className="size-3" />
													{customer.location}
												</div>
											</TableCell>
											<TableCell>{customer.orders}</TableCell>
											<TableCell className="font-medium">
												{customer.spent}
											</TableCell>
											<TableCell className="hidden @xl:table-cell text-muted-foreground">
												{customer.lastOrder}
											</TableCell>
											<TableCell>
												<Badge
													variant="secondary"
													className={getSegmentStyle(customer.segment)}
												>
													{customer.segment}
												</Badge>
											</TableCell>
											<TableCell>
												<Button variant="ghost" size="icon" className="size-8">
													<MoreHorizontal className="size-4" />
												</Button>
											</TableCell>
										</TableRow>
									))}
								</TableBody>
							</Table>
						</CardContent>
					</Card>
				</div>
			</div>
		</section>
	);
}
