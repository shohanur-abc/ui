import {
	Calendar,
	Clock,
	DollarSign,
	Download,
	ExternalLink,
	MapPin,
	MoreHorizontal,
	Package,
	Search,
	ShoppingBag,
	Star,
	TrendingUp,
	User,
} from 'lucide-react';

import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuItem,
	DropdownMenuSeparator,
	DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';

interface VIPCustomer {
	id: string;
	name: string;
	email: string;
	avatar?: string;
	initials: string;
	vipSince: string;
	tier: 'gold' | 'platinum' | 'diamond';
	totalSpent: string;
	ordersThisYear: number;
	avgOrderValue: string;
	location: string;
	lastPurchase: string;
	specialPerks: string[];
	accountManager?: string;
	notes?: string;
}

const TierConfig = {
	gold: {
		label: 'Gold VIP',
		color: 'text-amber-500',
		bg: 'bg-amber-500/10',
		border: 'border-amber-500/30',
	},
	platinum: {
		label: 'Platinum VIP',
		color: 'text-violet-400',
		bg: 'bg-violet-400/10',
		border: 'border-violet-400/30',
	},
	diamond: {
		label: 'Diamond VIP',
		color: 'text-cyan-400',
		bg: 'bg-cyan-400/10',
		border: 'border-cyan-400/30',
	},
};

const PageHeader = ({
	title,
	subtitle,
}: {
	title: string;
	subtitle: string;
}) => (
	<div className="flex flex-col gap-4 @lg:flex-row @lg:items-center @lg:justify-between">
		<div className="flex items-center gap-3">
			<div className="bg-amber-500/10 text-amber-500 rounded-lg p-2.5">
				<Star className="size-5 fill-current" />
			</div>
			<div>
				<h1 className="text-2xl font-bold tracking-tight">{title}</h1>
				<p className="text-muted-foreground text-sm">{subtitle}</p>
			</div>
		</div>
		<div className="flex gap-2">
			<div className="relative">
				<Search className="text-muted-foreground absolute top-1/2 left-3 size-4 -translate-y-1/2" />
				<Input placeholder="Search VIP customers..." className="w-64 pl-9" />
			</div>
			<Button variant="outline" size="icon">
				<Download className="size-4" />
			</Button>
		</div>
	</div>
);

const VIPBadge = ({ tier }: { tier: VIPCustomer['tier'] }) => {
	const config = TierConfig[tier];
	return (
		<Badge
			variant="outline"
			className={`${config.color} ${config.border} gap-1`}
		>
			<Star className="size-3 fill-current" />
			{config.label}
		</Badge>
	);
};

const StatItem = ({
	icon: Icon,
	label,
	value,
}: {
	icon: React.ElementType;
	label: string;
	value: string | number;
}) => (
	<div className="flex items-center gap-2">
		<div className="bg-muted rounded-md p-1.5">
			<Icon className="text-muted-foreground size-3.5" />
		</div>
		<div>
			<p className="text-muted-foreground text-xs">{label}</p>
			<p className="text-sm font-semibold">{value}</p>
		</div>
	</div>
);

const VIPCard = ({ customer }: { customer: VIPCustomer }) => {
	const tierConfig = TierConfig[customer.tier];
	return (
		<Card
			className={`group relative overflow-hidden transition-shadow hover:shadow-lg ${tierConfig.border} border-2`}
		>
			<div
				className={`absolute inset-x-0 top-0 h-1 ${tierConfig.bg.replace('/10', '')}`}
			/>
			<CardHeader className="pb-3">
				<div className="flex items-start justify-between">
					<div className="flex items-center gap-3">
						<div className="relative">
							<Avatar className="size-14 border-2 border-amber-500/30">
								<AvatarImage src={customer.avatar} alt={customer.name} />
								<AvatarFallback className="bg-primary/10 text-primary text-lg">
									{customer.initials}
								</AvatarFallback>
							</Avatar>
							<div
								className={`absolute -right-1 -bottom-1 rounded-full p-1 ${tierConfig.bg}`}
							>
								<Star className={`size-3 ${tierConfig.color} fill-current`} />
							</div>
						</div>
						<div>
							<p className="text-lg font-semibold">{customer.name}</p>
							<p className="text-muted-foreground text-sm">{customer.email}</p>
							<div className="mt-1 flex items-center gap-1.5 text-xs text-muted-foreground">
								<MapPin className="size-3" />
								{customer.location}
							</div>
						</div>
					</div>
					<DropdownMenu>
						<DropdownMenuTrigger asChild>
							<Button variant="ghost" size="icon-sm">
								<MoreHorizontal className="size-4" />
							</Button>
						</DropdownMenuTrigger>
						<DropdownMenuContent align="end">
							<DropdownMenuItem>
								<ExternalLink className="mr-2 size-4" />
								View full profile
							</DropdownMenuItem>
							<DropdownMenuItem>View orders</DropdownMenuItem>
							<DropdownMenuItem>Send personal message</DropdownMenuItem>
							<DropdownMenuSeparator />
							<DropdownMenuItem>Add perk</DropdownMenuItem>
							<DropdownMenuItem>Upgrade tier</DropdownMenuItem>
						</DropdownMenuContent>
					</DropdownMenu>
				</div>
			</CardHeader>
			<CardContent className="space-y-4">
				<div className="flex items-center justify-between">
					<VIPBadge tier={customer.tier} />
					<span className="text-muted-foreground text-xs">
						VIP since {customer.vipSince}
					</span>
				</div>
				<div className="grid grid-cols-2 gap-3">
					<StatItem
						icon={DollarSign}
						label="Total Spent"
						value={customer.totalSpent}
					/>
					<StatItem
						icon={ShoppingBag}
						label="Orders (YTD)"
						value={customer.ordersThisYear}
					/>
					<StatItem
						icon={TrendingUp}
						label="Avg. Order"
						value={customer.avgOrderValue}
					/>
					<StatItem
						icon={Clock}
						label="Last Purchase"
						value={customer.lastPurchase}
					/>
				</div>
				<div className="space-y-2 border-t pt-3">
					<p className="text-muted-foreground text-xs font-medium">
						Special Perks
					</p>
					<div className="flex flex-wrap gap-1">
						{customer.specialPerks.map((perk) => (
							<Badge key={perk} variant="secondary" className="text-xs">
								{perk}
							</Badge>
						))}
					</div>
				</div>
				{customer.accountManager && (
					<div className="flex items-center gap-2 rounded-lg bg-muted/50 px-3 py-2">
						<User className="text-muted-foreground size-4" />
						<div>
							<p className="text-muted-foreground text-xs">Account Manager</p>
							<p className="text-sm font-medium">{customer.accountManager}</p>
						</div>
					</div>
				)}
			</CardContent>
		</Card>
	);
};

export default function Main() {
	const customers: VIPCustomer[] = [
		{
			id: '1',
			name: 'Victoria Sterling',
			email: 'victoria.s@email.com',
			initials: 'VS',
			vipSince: 'Jan 2021',
			tier: 'diamond',
			totalSpent: '$125,450',
			ordersThisYear: 48,
			avgOrderValue: '$2,614',
			location: 'New York, USA',
			lastPurchase: '2 days ago',
			specialPerks: [
				'Free Shipping',
				'Early Access',
				'Personal Shopper',
				'20% Off',
			],
			accountManager: 'Sarah Johnson',
		},
		{
			id: '2',
			name: 'Alexander Hayes',
			email: 'alex.h@email.com',
			initials: 'AH',
			vipSince: 'Mar 2021',
			tier: 'platinum',
			totalSpent: '$78,230',
			ordersThisYear: 32,
			avgOrderValue: '$2,445',
			location: 'Los Angeles, USA',
			lastPurchase: '1 week ago',
			specialPerks: ['Free Shipping', 'Priority Support', '15% Off'],
			accountManager: 'Michael Chen',
		},
		{
			id: '3',
			name: 'Charlotte Moore',
			email: 'charlotte.m@email.com',
			initials: 'CM',
			vipSince: 'Jun 2022',
			tier: 'platinum',
			totalSpent: '$56,890',
			ordersThisYear: 28,
			avgOrderValue: '$2,032',
			location: 'Chicago, USA',
			lastPurchase: '3 days ago',
			specialPerks: ['Free Returns', 'Exclusive Events', '15% Off'],
			accountManager: 'Emily Watson',
		},
		{
			id: '4',
			name: 'William Foster',
			email: 'william.f@email.com',
			initials: 'WF',
			vipSince: 'Sep 2022',
			tier: 'gold',
			totalSpent: '$34,560',
			ordersThisYear: 22,
			avgOrderValue: '$1,571',
			location: 'Miami, USA',
			lastPurchase: '5 days ago',
			specialPerks: ['Free Shipping', 'Birthday Gift', '10% Off'],
		},
		{
			id: '5',
			name: 'Isabella Clarke',
			email: 'isabella.c@email.com',
			initials: 'IC',
			vipSince: 'Nov 2022',
			tier: 'gold',
			totalSpent: '$28,900',
			ordersThisYear: 18,
			avgOrderValue: '$1,606',
			location: 'Seattle, USA',
			lastPurchase: '1 week ago',
			specialPerks: ['Free Returns', 'Early Access', '10% Off'],
		},
		{
			id: '6',
			name: 'James Richardson',
			email: 'james.r@email.com',
			initials: 'JR',
			vipSince: 'Feb 2023',
			tier: 'gold',
			totalSpent: '$22,340',
			ordersThisYear: 15,
			avgOrderValue: '$1,489',
			location: 'Boston, USA',
			lastPurchase: '2 weeks ago',
			specialPerks: ['Free Shipping', 'Priority Support', '10% Off'],
		},
	];

	return (
		<section className="@container" data-theme="dashboard">
			<div className="mx-auto max-w-7xl space-y-6 px-4 py-8 @sm:px-6 @2xl:px-8">
				<PageHeader
					title="VIP Customers"
					subtitle="Your most valuable customers with special privileges"
				/>
				<div className="grid gap-4 @sm:grid-cols-2 @xl:grid-cols-3">
					{customers.map((customer) => (
						<VIPCard key={customer.id} customer={customer} />
					))}
				</div>
			</div>
		</section>
	);
}
