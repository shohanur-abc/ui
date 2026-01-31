import {
	ArrowDownRight,
	ArrowUpRight,
	Clock,
	Eye,
	Mail,
	MapPin,
	Package,
	Settings2,
} from 'lucide-react';

import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Checkbox } from '@/components/ui/checkbox';
import {
	Table,
	TableBody,
	TableCell,
	TableHead,
	TableHeader,
	TableRow,
} from '@/components/ui/table';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

interface Customer {
	id: string;
	name: string;
	email: string;
	avatar?: string;
	initials: string;
	location: string;
	orders: number;
	spent: string;
	trend: 'up' | 'down';
	trendValue: string;
	lastActive: string;
	segment: 'vip' | 'regular' | 'new' | 'at-risk';
}

const TabHeader = ({
	tabs,
	defaultTab,
	rightContent,
}: {
	tabs: { value: string; label: string; count?: number }[];
	defaultTab: string;
	rightContent?: React.ReactNode;
}) => (
	<div className="flex flex-col gap-4 @lg:flex-row @lg:items-center @lg:justify-between border-b px-6 py-4">
		<TabsList className="h-9 w-full justify-start @lg:w-auto">
			{tabs.map((tab) => (
				<TabsTrigger key={tab.value} value={tab.value} className="gap-2">
					{tab.label}
					{tab.count !== undefined && (
						<Badge variant="secondary" className="h-5 px-1.5 text-xs">
							{tab.count}
						</Badge>
					)}
				</TabsTrigger>
			))}
		</TabsList>
		{rightContent}
	</div>
);

const SegmentBadge = ({ segment }: { segment: Customer['segment'] }) => {
	const config = {
		vip: { label: 'VIP', className: 'bg-violet-500/10 text-violet-500 border-violet-500/20' },
		regular: { label: 'Regular', className: 'bg-blue-500/10 text-blue-500 border-blue-500/20' },
		new: { label: 'New', className: 'bg-emerald-500/10 text-emerald-500 border-emerald-500/20' },
		'at-risk': { label: 'At Risk', className: 'bg-amber-500/10 text-amber-500 border-amber-500/20' },
	};
	return (
		<Badge variant="outline" className={config[segment].className}>
			{config[segment].label}
		</Badge>
	);
};

const TrendIndicator = ({
	trend,
	value,
}: {
	trend: 'up' | 'down';
	value: string;
}) => {
	const isUp = trend === 'up';
	return (
		<span
			className={`inline-flex items-center gap-0.5 text-sm ${isUp ? 'text-emerald-500' : 'text-red-500'}`}
		>
			{isUp ? <ArrowUpRight className="size-3.5" /> : <ArrowDownRight className="size-3.5" />}
			{value}
		</span>
	);
};

const CustomerRow = ({
	customer,
	selected,
	onSelect,
}: {
	customer: Customer;
	selected: boolean;
	onSelect: () => void;
}) => (
	<TableRow data-state={selected ? 'selected' : undefined}>
		<TableCell>
			<Checkbox checked={selected} onCheckedChange={onSelect} />
		</TableCell>
		<TableCell>
			<div className="flex items-center gap-3">
				<Avatar className="size-9">
					<AvatarImage src={customer.avatar} alt={customer.name} />
					<AvatarFallback className="bg-gradient-to-br from-primary/20 to-primary/10 text-primary text-xs font-medium">
						{customer.initials}
					</AvatarFallback>
				</Avatar>
				<div>
					<p className="font-medium">{customer.name}</p>
					<div className="text-muted-foreground flex items-center gap-1 text-xs">
						<MapPin className="size-3" />
						{customer.location}
					</div>
				</div>
			</div>
		</TableCell>
		<TableCell className="hidden @md:table-cell text-muted-foreground text-sm">
			{customer.email}
		</TableCell>
		<TableCell className="hidden @lg:table-cell">
			<SegmentBadge segment={customer.segment} />
		</TableCell>
		<TableCell className="hidden @xl:table-cell">
			<div className="flex items-center gap-2">
				<Package className="text-muted-foreground size-4" />
				<span>{customer.orders} orders</span>
			</div>
		</TableCell>
		<TableCell className="text-right">
			<div className="space-y-0.5">
				<p className="font-semibold">{customer.spent}</p>
				<TrendIndicator trend={customer.trend} value={customer.trendValue} />
			</div>
		</TableCell>
		<TableCell className="hidden @lg:table-cell">
			<div className="text-muted-foreground flex items-center gap-1.5 text-sm">
				<Clock className="size-3.5" />
				{customer.lastActive}
			</div>
		</TableCell>
		<TableCell>
			<div className="flex items-center gap-1">
				<Button variant="ghost" size="icon-sm" className="text-muted-foreground hover:text-foreground">
					<Eye className="size-4" />
				</Button>
				<Button variant="ghost" size="icon-sm" className="text-muted-foreground hover:text-foreground">
					<Mail className="size-4" />
				</Button>
			</div>
		</TableCell>
	</TableRow>
);

const EmptyState = ({ message }: { message: string }) => (
	<div className="text-muted-foreground flex h-32 items-center justify-center text-sm">
		{message}
	</div>
);

export default function Main() {
	const customers: Customer[] = [
		{
			id: '1',
			name: 'Olivia Martinez',
			email: 'olivia.m@email.com',
			initials: 'OM',
			location: 'New York, USA',
			orders: 47,
			spent: '$5,678',
			trend: 'up',
			trendValue: '12%',
			lastActive: '2h ago',
			segment: 'vip',
		},
		{
			id: '2',
			name: 'Noah Anderson',
			email: 'noah.a@email.com',
			initials: 'NA',
			location: 'Los Angeles, USA',
			orders: 23,
			spent: '$2,340',
			trend: 'up',
			trendValue: '8%',
			lastActive: '1d ago',
			segment: 'regular',
		},
		{
			id: '3',
			name: 'Emma Thompson',
			email: 'emma.t@email.com',
			initials: 'ET',
			location: 'Chicago, USA',
			orders: 3,
			spent: '$189',
			trend: 'up',
			trendValue: '100%',
			lastActive: '3h ago',
			segment: 'new',
		},
		{
			id: '4',
			name: 'Liam Jackson',
			email: 'liam.j@email.com',
			initials: 'LJ',
			location: 'Houston, USA',
			orders: 15,
			spent: '$1,234',
			trend: 'down',
			trendValue: '23%',
			lastActive: '2w ago',
			segment: 'at-risk',
		},
		{
			id: '5',
			name: 'Sophia Lee',
			email: 'sophia.l@email.com',
			initials: 'SL',
			location: 'Seattle, USA',
			orders: 31,
			spent: '$3,890',
			trend: 'up',
			trendValue: '5%',
			lastActive: '5h ago',
			segment: 'vip',
		},
	];

	const tabs = [
		{ value: 'all', label: 'All', count: 156 },
		{ value: 'vip', label: 'VIP', count: 23 },
		{ value: 'at-risk', label: 'At Risk', count: 12 },
		{ value: 'new', label: 'New', count: 45 },
	];

	return (
		<section className="@container" data-theme="dashboard">
			<div className="mx-auto max-w-7xl space-y-6 px-4 py-8 @sm:px-6 @2xl:px-8">
				<div className="flex items-center justify-between">
					<div>
						<h1 className="text-2xl font-bold tracking-tight">Customer Segments</h1>
						<p className="text-muted-foreground text-sm">
							View and manage customers by segment
						</p>
					</div>
					<Button variant="outline" size="sm" className="gap-2">
						<Settings2 className="size-4" />
						<span className="hidden @sm:inline">Manage Segments</span>
					</Button>
				</div>

				<Tabs defaultValue="all" className="w-full">
					<div className="overflow-hidden rounded-xl border bg-card">
						<TabHeader tabs={tabs} defaultTab="all" />
						<TabsContent value="all" className="m-0">
							<Table>
								<TableHeader>
									<TableRow className="hover:bg-transparent">
										<TableHead className="w-12">
											<Checkbox />
										</TableHead>
										<TableHead>Customer</TableHead>
										<TableHead className="hidden @md:table-cell">Email</TableHead>
										<TableHead className="hidden @lg:table-cell">Segment</TableHead>
										<TableHead className="hidden @xl:table-cell">Orders</TableHead>
										<TableHead className="text-right">Spent</TableHead>
										<TableHead className="hidden @lg:table-cell">Last Active</TableHead>
										<TableHead className="w-24">Actions</TableHead>
									</TableRow>
								</TableHeader>
								<TableBody>
									{customers.map((customer) => (
										<CustomerRow
											key={customer.id}
											customer={customer}
											selected={false}
											onSelect={() => {}}
										/>
									))}
								</TableBody>
							</Table>
						</TabsContent>
						<TabsContent value="vip" className="m-0">
							<Table>
								<TableHeader>
									<TableRow className="hover:bg-transparent">
										<TableHead className="w-12">
											<Checkbox />
										</TableHead>
										<TableHead>Customer</TableHead>
										<TableHead className="hidden @md:table-cell">Email</TableHead>
										<TableHead className="hidden @lg:table-cell">Segment</TableHead>
										<TableHead className="hidden @xl:table-cell">Orders</TableHead>
										<TableHead className="text-right">Spent</TableHead>
										<TableHead className="hidden @lg:table-cell">Last Active</TableHead>
										<TableHead className="w-24">Actions</TableHead>
									</TableRow>
								</TableHeader>
								<TableBody>
									{customers
										.filter((c) => c.segment === 'vip')
										.map((customer) => (
											<CustomerRow
												key={customer.id}
												customer={customer}
												selected={false}
												onSelect={() => {}}
											/>
										))}
								</TableBody>
							</Table>
						</TabsContent>
						<TabsContent value="at-risk" className="m-0">
							<Table>
								<TableHeader>
									<TableRow className="hover:bg-transparent">
										<TableHead className="w-12">
											<Checkbox />
										</TableHead>
										<TableHead>Customer</TableHead>
										<TableHead className="hidden @md:table-cell">Email</TableHead>
										<TableHead className="hidden @lg:table-cell">Segment</TableHead>
										<TableHead className="hidden @xl:table-cell">Orders</TableHead>
										<TableHead className="text-right">Spent</TableHead>
										<TableHead className="hidden @lg:table-cell">Last Active</TableHead>
										<TableHead className="w-24">Actions</TableHead>
									</TableRow>
								</TableHeader>
								<TableBody>
									{customers
										.filter((c) => c.segment === 'at-risk')
										.map((customer) => (
											<CustomerRow
												key={customer.id}
												customer={customer}
												selected={false}
												onSelect={() => {}}
											/>
										))}
								</TableBody>
							</Table>
						</TabsContent>
						<TabsContent value="new" className="m-0">
							<Table>
								<TableHeader>
									<TableRow className="hover:bg-transparent">
										<TableHead className="w-12">
											<Checkbox />
										</TableHead>
										<TableHead>Customer</TableHead>
										<TableHead className="hidden @md:table-cell">Email</TableHead>
										<TableHead className="hidden @lg:table-cell">Segment</TableHead>
										<TableHead className="hidden @xl:table-cell">Orders</TableHead>
										<TableHead className="text-right">Spent</TableHead>
										<TableHead className="hidden @lg:table-cell">Last Active</TableHead>
										<TableHead className="w-24">Actions</TableHead>
									</TableRow>
								</TableHeader>
								<TableBody>
									{customers
										.filter((c) => c.segment === 'new')
										.map((customer) => (
											<CustomerRow
												key={customer.id}
												customer={customer}
												selected={false}
												onSelect={() => {}}
											/>
										))}
								</TableBody>
							</Table>
						</TabsContent>
					</div>
				</Tabs>
			</div>
		</section>
	);
}
