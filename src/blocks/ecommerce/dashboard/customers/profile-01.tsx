import {
	ArrowDownRight,
	ArrowUpRight,
	Calendar,
	Clock,
	CreditCard,
	Edit2,
	ExternalLink,
	Heart,
	Mail,
	MapPin,
	MoreHorizontal,
	Package,
	Phone,
	ShoppingBag,
	Star,
	User,
} from 'lucide-react';

import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuItem,
	DropdownMenuSeparator,
	DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';

interface CustomerProfile {
	id: string;
	name: string;
	email: string;
	phone: string;
	avatar?: string;
	initials: string;
	status: 'active' | 'inactive' | 'churned';
	tier: 'bronze' | 'silver' | 'gold' | 'platinum';
	memberSince: string;
	location: {
		city: string;
		country: string;
	};
	stats: {
		totalOrders: number;
		totalSpent: string;
		avgOrderValue: string;
		lastOrder: string;
	};
	loyaltyPoints: number;
	loyaltyProgress: number;
}

const TierBadge = ({ tier }: { tier: CustomerProfile['tier'] }) => {
	const config: Record<string, { label: string; className: string }> = {
		bronze: {
			label: 'Bronze',
			className: 'bg-orange-700/20 text-orange-400 border-orange-700/30',
		},
		silver: {
			label: 'Silver',
			className: 'bg-slate-400/20 text-slate-300 border-slate-400/30',
		},
		gold: {
			label: 'Gold',
			className: 'bg-amber-500/20 text-amber-400 border-amber-500/30',
		},
		platinum: {
			label: 'Platinum',
			className: 'bg-violet-500/20 text-violet-300 border-violet-500/30',
		},
	};
	const { label, className } = config[tier];
	return (
		<Badge variant="outline" className={`${className} gap-1`}>
			<Star className="size-3 fill-current" />
			{label}
		</Badge>
	);
};

const StatusIndicator = ({ status }: { status: CustomerProfile['status'] }) => {
	const config: Record<string, { label: string; color: string }> = {
		active: { label: 'Active', color: 'bg-emerald-500' },
		inactive: { label: 'Inactive', color: 'bg-amber-500' },
		churned: { label: 'Churned', color: 'bg-red-500' },
	};
	const { label, color } = config[status];
	return (
		<div className="flex items-center gap-1.5">
			<span className={`size-2 rounded-full ${color}`} />
			<span className="text-sm">{label}</span>
		</div>
	);
};

const StatCard = ({
	label,
	value,
	icon: Icon,
	subtext,
}: {
	label: string;
	value: string;
	icon: React.ElementType;
	subtext?: string;
}) => (
	<div className="rounded-lg border bg-muted/30 p-4">
		<div className="flex items-center justify-between mb-2">
			<span className="text-muted-foreground text-sm">{label}</span>
			<Icon className="size-4 text-muted-foreground" />
		</div>
		<p className="text-2xl font-bold">{value}</p>
		{subtext && <p className="text-muted-foreground text-xs mt-1">{subtext}</p>}
	</div>
);

const PageHeader = ({ customer }: { customer: CustomerProfile }) => (
	<div className="flex flex-col @lg:flex-row gap-6">
		<Avatar className="size-24 @lg:size-28">
			<AvatarImage src={customer.avatar} alt={customer.name} />
			<AvatarFallback className="bg-primary/10 text-primary text-3xl">
				{customer.initials}
			</AvatarFallback>
		</Avatar>
		<div className="flex-1 min-w-0">
			<div className="flex flex-col @md:flex-row @md:items-start @md:justify-between gap-4">
				<div>
					<div className="flex items-center gap-3 mb-2">
						<h1 className="text-2xl font-bold tracking-tight">
							{customer.name}
						</h1>
						<TierBadge tier={customer.tier} />
					</div>
					<div className="flex flex-col @sm:flex-row @sm:items-center gap-2 @sm:gap-4 text-sm text-muted-foreground">
						<span className="flex items-center gap-1.5">
							<Mail className="size-4" />
							{customer.email}
						</span>
						<span className="flex items-center gap-1.5">
							<Phone className="size-4" />
							{customer.phone}
						</span>
					</div>
					<div className="flex items-center gap-4 mt-2 text-sm text-muted-foreground">
						<span className="flex items-center gap-1.5">
							<MapPin className="size-4" />
							{customer.location.city}, {customer.location.country}
						</span>
						<span className="flex items-center gap-1.5">
							<Calendar className="size-4" />
							Member since {customer.memberSince}
						</span>
					</div>
				</div>
				<div className="flex items-center gap-2">
					<StatusIndicator status={customer.status} />
					<Button variant="outline" size="sm" className="gap-1.5">
						<Edit2 className="size-3.5" />
						Edit
					</Button>
					<DropdownMenu>
						<DropdownMenuTrigger asChild>
							<Button variant="outline" size="icon-sm">
								<MoreHorizontal className="size-4" />
							</Button>
						</DropdownMenuTrigger>
						<DropdownMenuContent align="end">
							<DropdownMenuItem>View orders</DropdownMenuItem>
							<DropdownMenuItem>Send message</DropdownMenuItem>
							<DropdownMenuItem>Export data</DropdownMenuItem>
							<DropdownMenuSeparator />
							<DropdownMenuItem className="text-red-500">
								Deactivate
							</DropdownMenuItem>
						</DropdownMenuContent>
					</DropdownMenu>
				</div>
			</div>
		</div>
	</div>
);

const LoyaltyCard = ({
	points,
	progress,
	tier,
}: {
	points: number;
	progress: number;
	tier: CustomerProfile['tier'];
}) => {
	const nextTier: Record<string, string> = {
		bronze: 'Silver',
		silver: 'Gold',
		gold: 'Platinum',
		platinum: 'Max Level',
	};
	return (
		<Card>
			<CardHeader className="pb-2">
				<CardTitle className="text-base flex items-center gap-2">
					<Star className="size-4 text-amber-500" />
					Loyalty Program
				</CardTitle>
			</CardHeader>
			<CardContent>
				<div className="flex items-center justify-between mb-3">
					<span className="text-2xl font-bold">{points.toLocaleString()}</span>
					<span className="text-sm text-muted-foreground">points</span>
				</div>
				<div className="space-y-2">
					<div className="flex items-center justify-between text-sm">
						<span className="text-muted-foreground">
							Progress to {nextTier[tier]}
						</span>
						<span className="font-medium">{progress}%</span>
					</div>
					<Progress value={progress} className="h-2" />
				</div>
			</CardContent>
		</Card>
	);
};

export default function Main() {
	const customer: CustomerProfile = {
		id: '1',
		name: 'Alexandra Mitchell',
		email: 'alexandra.m@email.com',
		phone: '+1 555-0123',
		initials: 'AM',
		status: 'active',
		tier: 'gold',
		memberSince: 'March 2021',
		location: { city: 'San Francisco', country: 'USA' },
		stats: {
			totalOrders: 47,
			totalSpent: '$8,945',
			avgOrderValue: '$190',
			lastOrder: '3 days ago',
		},
		loyaltyPoints: 4250,
		loyaltyProgress: 72,
	};

	return (
		<section className="@container" data-theme="dashboard">
			<div className="mx-auto max-w-4xl space-y-6 px-4 py-8 @sm:px-6 @2xl:px-8">
				<PageHeader customer={customer} />

				<div className="grid grid-cols-2 @md:grid-cols-4 gap-4">
					<StatCard
						label="Total Orders"
						value={customer.stats.totalOrders.toString()}
						icon={Package}
						subtext={`Last: ${customer.stats.lastOrder}`}
					/>
					<StatCard
						label="Total Spent"
						value={customer.stats.totalSpent}
						icon={CreditCard}
					/>
					<StatCard
						label="Avg Order"
						value={customer.stats.avgOrderValue}
						icon={ShoppingBag}
					/>
					<StatCard
						label="Loyalty Points"
						value={customer.loyaltyPoints.toLocaleString()}
						icon={Star}
					/>
				</div>

				<div className="grid @md:grid-cols-2 gap-4">
					<LoyaltyCard
						points={customer.loyaltyPoints}
						progress={customer.loyaltyProgress}
						tier={customer.tier}
					/>
					<Card>
						<CardHeader className="pb-2">
							<CardTitle className="text-base flex items-center gap-2">
								<Clock className="size-4" />
								Recent Activity
							</CardTitle>
						</CardHeader>
						<CardContent>
							<div className="space-y-3 text-sm">
								<div className="flex items-center justify-between">
									<span>Placed order #ORD-4521</span>
									<span className="text-muted-foreground">3 days ago</span>
								</div>
								<div className="flex items-center justify-between">
									<span>Added 3 items to wishlist</span>
									<span className="text-muted-foreground">1 week ago</span>
								</div>
								<div className="flex items-center justify-between">
									<span>Left a 5-star review</span>
									<span className="text-muted-foreground">2 weeks ago</span>
								</div>
							</div>
						</CardContent>
					</Card>
				</div>
			</div>
		</section>
	);
}
