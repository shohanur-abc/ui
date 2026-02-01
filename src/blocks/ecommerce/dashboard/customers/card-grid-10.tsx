import {
	Calendar,
	Clock,
	ExternalLink,
	Heart,
	MoreHorizontal,
	Package,
	ShoppingCart,
	Star,
	TrendingDown,
	TrendingUp,
} from 'lucide-react';

import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuItem,
	DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';

interface NewCustomer {
	id: string;
	name: string;
	email: string;
	avatar?: string;
	initials: string;
	joinDate: string;
	daysSinceJoin: number;
	source: string;
	firstOrder?: {
		id: string;
		amount: string;
		items: number;
		date: string;
	};
	browsingBehavior: {
		pageViews: number;
		wishlistItems: number;
		cartItems: number;
	};
	engagement: 'high' | 'medium' | 'low';
	welcomeEmailOpened: boolean;
	hasCompletedProfile: boolean;
	referredBy?: string;
}

const EngagementBadge = ({ level }: { level: NewCustomer['engagement'] }) => {
	const config = {
		high: {
			label: 'High Engagement',
			className: 'bg-emerald-500/10 text-emerald-500 border-emerald-500/20',
			icon: TrendingUp,
		},
		medium: {
			label: 'Medium',
			className: 'bg-amber-500/10 text-amber-500 border-amber-500/20',
			icon: TrendingUp,
		},
		low: {
			label: 'Low Engagement',
			className: 'bg-red-500/10 text-red-500 border-red-500/20',
			icon: TrendingDown,
		},
	};
	const Icon = config[level].icon;
	return (
		<Badge variant="outline" className={`${config[level].className} gap-1`}>
			<Icon className="size-3" />
			{config[level].label}
		</Badge>
	);
};

const SourceBadge = ({ source }: { source: string }) => (
	<Badge variant="secondary" className="text-xs">
		{source}
	</Badge>
);

const BrowsingStats = ({
	pageViews,
	wishlistItems,
	cartItems,
}: {
	pageViews: number;
	wishlistItems: number;
	cartItems: number;
}) => (
	<div className="grid grid-cols-3 gap-2 text-center">
		<div className="rounded-lg bg-muted/50 p-2">
			<p className="text-lg font-bold">{pageViews}</p>
			<p className="text-muted-foreground text-xs">Page Views</p>
		</div>
		<div className="rounded-lg bg-muted/50 p-2">
			<div className="flex items-center justify-center gap-1">
				<Heart className="text-red-400 size-3.5" />
				<span className="text-lg font-bold">{wishlistItems}</span>
			</div>
			<p className="text-muted-foreground text-xs">Wishlist</p>
		</div>
		<div className="rounded-lg bg-muted/50 p-2">
			<div className="flex items-center justify-center gap-1">
				<ShoppingCart className="text-primary size-3.5" />
				<span className="text-lg font-bold">{cartItems}</span>
			</div>
			<p className="text-muted-foreground text-xs">In Cart</p>
		</div>
	</div>
);

const FirstOrderDisplay = ({ order }: { order: NewCustomer['firstOrder'] }) => {
	if (!order) {
		return (
			<div className="rounded-lg border border-dashed bg-muted/20 p-3 text-center">
				<Package className="text-muted-foreground mx-auto size-5" />
				<p className="text-muted-foreground mt-1 text-sm">No orders yet</p>
			</div>
		);
	}
	return (
		<div className="rounded-lg border bg-muted/30 p-3">
			<div className="flex items-center justify-between">
				<span className="text-muted-foreground text-xs">First Order</span>
				<Badge variant="outline" className="font-mono text-xs">
					#{order.id}
				</Badge>
			</div>
			<div className="mt-1 flex items-center justify-between">
				<span className="font-semibold">{order.amount}</span>
				<span className="text-muted-foreground text-xs">
					{order.items} items
				</span>
			</div>
			<p className="text-muted-foreground mt-1 text-xs">{order.date}</p>
		</div>
	);
};

const StatusIndicators = ({
	welcomeEmailOpened,
	hasCompletedProfile,
}: {
	welcomeEmailOpened: boolean;
	hasCompletedProfile: boolean;
}) => (
	<div className="flex gap-2">
		<div
			className={`flex items-center gap-1 rounded-full px-2 py-0.5 text-xs ${
				welcomeEmailOpened
					? 'bg-emerald-500/10 text-emerald-500'
					: 'bg-muted text-muted-foreground'
			}`}
		>
			<div
				className={`size-1.5 rounded-full ${welcomeEmailOpened ? 'bg-emerald-500' : 'bg-muted-foreground'}`}
			/>
			Welcome Email
		</div>
		<div
			className={`flex items-center gap-1 rounded-full px-2 py-0.5 text-xs ${
				hasCompletedProfile
					? 'bg-emerald-500/10 text-emerald-500'
					: 'bg-muted text-muted-foreground'
			}`}
		>
			<div
				className={`size-1.5 rounded-full ${hasCompletedProfile ? 'bg-emerald-500' : 'bg-muted-foreground'}`}
			/>
			Profile Complete
		</div>
	</div>
);

const NewCustomerCard = ({ customer }: { customer: NewCustomer }) => (
	<Card className="group transition-shadow hover:shadow-lg">
		<CardHeader className="pb-3">
			<div className="flex items-start justify-between">
				<div className="flex items-center gap-3">
					<div className="relative">
						<Avatar className="size-12">
							<AvatarImage src={customer.avatar} alt={customer.name} />
							<AvatarFallback className="bg-primary/10 text-primary">
								{customer.initials}
							</AvatarFallback>
						</Avatar>
						<div className="absolute -right-1 -top-1 rounded-full bg-blue-500 p-0.5">
							<Star className="size-2.5 fill-white text-white" />
						</div>
					</div>
					<div>
						<p className="font-semibold">{customer.name}</p>
						<p className="text-muted-foreground text-xs">{customer.email}</p>
					</div>
				</div>
				<DropdownMenu>
					<DropdownMenuTrigger asChild>
						<Button
							variant="ghost"
							size="icon-sm"
							className="opacity-0 group-hover:opacity-100"
						>
							<MoreHorizontal className="size-4" />
						</Button>
					</DropdownMenuTrigger>
					<DropdownMenuContent align="end">
						<DropdownMenuItem>
							<ExternalLink className="mr-2 size-4" />
							View profile
						</DropdownMenuItem>
						<DropdownMenuItem>Send welcome offer</DropdownMenuItem>
						<DropdownMenuItem>View activity</DropdownMenuItem>
					</DropdownMenuContent>
				</DropdownMenu>
			</div>
		</CardHeader>
		<CardContent className="space-y-4">
			<div className="flex items-center justify-between">
				<div className="flex items-center gap-2">
					<Calendar className="text-muted-foreground size-3.5" />
					<span className="text-muted-foreground text-xs">
						Joined {customer.joinDate}
					</span>
				</div>
				<Badge
					variant="outline"
					className="bg-blue-500/10 text-blue-500 border-blue-500/20"
				>
					{customer.daysSinceJoin} days ago
				</Badge>
			</div>
			<div className="flex items-center justify-between">
				<EngagementBadge level={customer.engagement} />
				<SourceBadge source={customer.source} />
			</div>
			<BrowsingStats
				pageViews={customer.browsingBehavior.pageViews}
				wishlistItems={customer.browsingBehavior.wishlistItems}
				cartItems={customer.browsingBehavior.cartItems}
			/>
			<FirstOrderDisplay order={customer.firstOrder} />
			<StatusIndicators
				welcomeEmailOpened={customer.welcomeEmailOpened}
				hasCompletedProfile={customer.hasCompletedProfile}
			/>
			{customer.referredBy && (
				<div className="flex items-center gap-2 rounded-lg bg-violet-500/10 px-3 py-2 text-xs text-violet-400">
					<span className="text-muted-foreground">Referred by:</span>
					<span className="font-medium">{customer.referredBy}</span>
				</div>
			)}
		</CardContent>
	</Card>
);

export default function Main() {
	const customers: NewCustomer[] = [
		{
			id: '1',
			name: 'Hannah Foster',
			email: 'hannah.f@email.com',
			initials: 'HF',
			joinDate: 'Jan 22, 2024',
			daysSinceJoin: 3,
			source: 'Google Ads',
			firstOrder: {
				id: 'ORD-5001',
				amount: '$156.99',
				items: 2,
				date: 'Jan 23, 2024',
			},
			browsingBehavior: { pageViews: 45, wishlistItems: 8, cartItems: 3 },
			engagement: 'high',
			welcomeEmailOpened: true,
			hasCompletedProfile: true,
			referredBy: 'Jessica Taylor',
		},
		{
			id: '2',
			name: 'Ian Cooper',
			email: 'ian.c@email.com',
			initials: 'IC',
			joinDate: 'Jan 21, 2024',
			daysSinceJoin: 4,
			source: 'Direct',
			browsingBehavior: { pageViews: 28, wishlistItems: 4, cartItems: 2 },
			engagement: 'medium',
			welcomeEmailOpened: true,
			hasCompletedProfile: false,
		},
		{
			id: '3',
			name: 'Julia Bennett',
			email: 'julia.b@email.com',
			initials: 'JB',
			joinDate: 'Jan 20, 2024',
			daysSinceJoin: 5,
			source: 'Instagram',
			firstOrder: {
				id: 'ORD-4998',
				amount: '$89.50',
				items: 1,
				date: 'Jan 21, 2024',
			},
			browsingBehavior: { pageViews: 62, wishlistItems: 12, cartItems: 0 },
			engagement: 'high',
			welcomeEmailOpened: true,
			hasCompletedProfile: true,
		},
		{
			id: '4',
			name: 'Kevin Nguyen',
			email: 'kevin.n@email.com',
			initials: 'KN',
			joinDate: 'Jan 19, 2024',
			daysSinceJoin: 6,
			source: 'Facebook',
			browsingBehavior: { pageViews: 12, wishlistItems: 0, cartItems: 0 },
			engagement: 'low',
			welcomeEmailOpened: false,
			hasCompletedProfile: false,
		},
		{
			id: '5',
			name: 'Laura Mitchell',
			email: 'laura.m@email.com',
			initials: 'LM',
			joinDate: 'Jan 18, 2024',
			daysSinceJoin: 7,
			source: 'Email Campaign',
			firstOrder: {
				id: 'ORD-4990',
				amount: '$245.00',
				items: 3,
				date: 'Jan 19, 2024',
			},
			browsingBehavior: { pageViews: 38, wishlistItems: 6, cartItems: 1 },
			engagement: 'high',
			welcomeEmailOpened: true,
			hasCompletedProfile: true,
			referredBy: 'Andrew Miller',
		},
		{
			id: '6',
			name: 'Marcus Reed',
			email: 'marcus.r@email.com',
			initials: 'MR',
			joinDate: 'Jan 17, 2024',
			daysSinceJoin: 8,
			source: 'TikTok',
			browsingBehavior: { pageViews: 22, wishlistItems: 3, cartItems: 4 },
			engagement: 'medium',
			welcomeEmailOpened: true,
			hasCompletedProfile: false,
		},
	];

	return (
		<section className="@container" data-theme="dashboard">
			<div className="mx-auto max-w-7xl space-y-6 px-4 py-8 @sm:px-6 @2xl:px-8">
				<div className="flex items-center gap-3">
					<div className="bg-blue-500/10 text-blue-500 rounded-lg p-2.5">
						<Star className="size-5" />
					</div>
					<div>
						<h1 className="text-2xl font-bold tracking-tight">New Customers</h1>
						<p className="text-muted-foreground text-sm">
							Recently joined customers in the last 7 days
						</p>
					</div>
				</div>
				<div className="grid gap-4 @sm:grid-cols-2 @xl:grid-cols-3">
					{customers.map((customer) => (
						<NewCustomerCard key={customer.id} customer={customer} />
					))}
				</div>
			</div>
		</section>
	);
}
