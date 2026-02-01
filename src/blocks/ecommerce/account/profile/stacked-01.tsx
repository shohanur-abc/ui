import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { Separator } from '@/components/ui/separator';
import {
	Award,
	Calendar,
	Clock,
	Edit,
	Gift,
	Heart,
	MapPin,
	Package,
	Settings,
	ShoppingBag,
	Star,
	TrendingUp,
	User,
	Wallet,
} from 'lucide-react';
import Link from 'next/link';

const ProfileBanner = ({
	backgroundUrl,
	avatarSrc,
	avatarFallback,
	name,
	email,
	memberSince,
}: {
	backgroundUrl: string;
	avatarSrc: string;
	avatarFallback: string;
	name: string;
	email: string;
	memberSince: string;
}) => (
	<div className="relative">
		<div
			className="h-32 @sm:h-40 @md:h-48 rounded-xl bg-cover bg-center"
			style={{ backgroundImage: `url(${backgroundUrl})` }}
		/>
		<div className="absolute -bottom-16 left-6 flex items-end gap-4">
			<Avatar className="size-24 @md:size-32 ring-4 ring-background">
				<AvatarImage src={avatarSrc} alt={name} />
				<AvatarFallback className="text-3xl">{avatarFallback}</AvatarFallback>
			</Avatar>
		</div>
		<Button
			variant="outline"
			size="sm"
			className="absolute top-4 right-4 gap-2"
		>
			<Edit className="size-4" />
			Edit Profile
		</Button>
	</div>
);

const ProfileInfo = ({
	name,
	email,
	memberSince,
	location,
}: {
	name: string;
	email: string;
	memberSince: string;
	location: string;
}) => (
	<div className="pt-20 @md:pt-16 px-6">
		<h1 className="text-2xl font-bold">{name}</h1>
		<p className="text-muted-foreground">{email}</p>
		<div className="flex flex-wrap items-center gap-4 mt-3 text-sm text-muted-foreground">
			<div className="flex items-center gap-1">
				<Calendar className="size-4" />
				Member since {memberSince}
			</div>
			<div className="flex items-center gap-1">
				<MapPin className="size-4" />
				{location}
			</div>
		</div>
	</div>
);

const StatsRow = ({
	stats,
}: {
	stats: {
		icon: React.ElementType;
		label: string;
		value: string;
		trend?: string;
	}[];
}) => (
	<div className="grid grid-cols-2 @md:grid-cols-4 gap-4 px-6">
		{stats.map((stat, i) => (
			<Card key={i}>
				<CardContent className="p-4">
					<div className="flex items-center gap-3">
						<div className="p-2 rounded-lg bg-primary/10">
							<stat.icon className="size-5 text-primary" />
						</div>
						<div>
							<p className="text-2xl font-bold">{stat.value}</p>
							<p className="text-sm text-muted-foreground">{stat.label}</p>
							{stat.trend && (
								<p className="text-xs text-green-500 flex items-center gap-1 mt-1">
									<TrendingUp className="size-3" />
									{stat.trend}
								</p>
							)}
						</div>
					</div>
				</CardContent>
			</Card>
		))}
	</div>
);

const LoyaltySection = ({
	tier,
	points,
	nextTier,
	progress,
}: {
	tier: string;
	points: string;
	nextTier: string;
	progress: number;
}) => (
	<div className="px-6">
		<Card className="bg-gradient-to-r from-amber-500/10 to-orange-500/10">
			<CardContent className="p-6">
				<div className="flex flex-col @md:flex-row @md:items-center @md:justify-between gap-4">
					<div className="flex items-center gap-4">
						<div className="p-3 rounded-full bg-amber-500/20">
							<Award className="size-8 text-amber-500" />
						</div>
						<div>
							<Badge className="bg-amber-500/20 text-amber-600">{tier}</Badge>
							<p className="text-2xl font-bold mt-1">{points} points</p>
						</div>
					</div>
					<div className="flex-1 max-w-xs">
						<div className="flex justify-between text-sm mb-2">
							<span>{points} pts</span>
							<span>{nextTier}</span>
						</div>
						<Progress value={progress} className="h-2" />
						<p className="text-xs text-muted-foreground mt-1">
							Next reward unlocks at {nextTier}
						</p>
					</div>
				</div>
			</CardContent>
		</Card>
	</div>
);

const QuickActions = ({
	actions,
}: {
	actions: {
		icon: React.ElementType;
		label: string;
		href: string;
		badge?: string;
	}[];
}) => (
	<div className="px-6">
		<h2 className="font-semibold mb-4">Quick Actions</h2>
		<div className="grid grid-cols-2 @sm:grid-cols-3 @md:grid-cols-4 gap-3">
			{actions.map((action, i) => (
				<Link
					key={i}
					href={action.href}
					className="flex flex-col items-center gap-2 p-4 rounded-lg border hover:bg-muted/50 transition-colors relative"
				>
					<action.icon className="size-6 text-muted-foreground" />
					<span className="text-sm font-medium">{action.label}</span>
					{action.badge && (
						<Badge className="absolute top-2 right-2 size-5 rounded-full p-0 flex items-center justify-center text-xs">
							{action.badge}
						</Badge>
					)}
				</Link>
			))}
		</div>
	</div>
);

const RecentActivity = ({
	activities,
}: {
	activities: {
		icon: React.ElementType;
		title: string;
		description: string;
		time: string;
	}[];
}) => (
	<div className="px-6">
		<h2 className="font-semibold mb-4">Recent Activity</h2>
		<Card>
			<CardContent className="p-4 divide-y">
				{activities.map((activity, i) => (
					<div
						key={i}
						className="flex items-center gap-4 py-3 first:pt-0 last:pb-0"
					>
						<div className="p-2 rounded-lg bg-muted">
							<activity.icon className="size-5 text-muted-foreground" />
						</div>
						<div className="flex-1">
							<p className="font-medium">{activity.title}</p>
							<p className="text-sm text-muted-foreground">
								{activity.description}
							</p>
						</div>
						<span className="text-xs text-muted-foreground">
							{activity.time}
						</span>
					</div>
				))}
			</CardContent>
		</Card>
	</div>
);

export default function Main() {
	const profileData = {
		banner: {
			backgroundUrl:
				'https://images.unsplash.com/photo-1557683316-973673baf926?w=1200',
			avatarSrc:
				'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=400&h=400&fit=crop&crop=face',
			avatarFallback: 'SM',
			name: 'Sarah Mitchell',
			email: 'sarah.mitchell@example.com',
			memberSince: 'March 2022',
		},
		info: {
			name: 'Sarah Mitchell',
			email: 'sarah.mitchell@example.com',
			memberSince: 'March 2022',
			location: 'New York, NY',
		},
		stats: [
			{
				icon: ShoppingBag,
				label: 'Orders',
				value: '47',
				trend: '+12% this month',
			},
			{ icon: Heart, label: 'Wishlist', value: '23' },
			{ icon: Star, label: 'Reviews', value: '18' },
			{ icon: Gift, label: 'Rewards', value: '5' },
		],
		loyalty: {
			tier: 'Gold Member',
			points: '2,450',
			nextTier: '5,000 pts',
			progress: 49,
		},
		quickActions: [
			{ icon: Package, label: 'Orders', href: '/orders', badge: '2' },
			{ icon: Heart, label: 'Wishlist', href: '/wishlist' },
			{ icon: Wallet, label: 'Wallet', href: '/wallet' },
			{ icon: Gift, label: 'Rewards', href: '/rewards' },
			{ icon: MapPin, label: 'Addresses', href: '/addresses' },
			{ icon: Settings, label: 'Settings', href: '/settings' },
			{ icon: User, label: 'Account', href: '/account' },
			{ icon: Clock, label: 'History', href: '/history' },
		],
		activities: [
			{
				icon: ShoppingBag,
				title: 'Order Placed',
				description: 'Order #12345 - 3 items',
				time: '2h ago',
			},
			{
				icon: Star,
				title: 'Review Posted',
				description: 'You reviewed "Wireless Headphones"',
				time: '1d ago',
			},
			{
				icon: Gift,
				title: 'Reward Earned',
				description: '+100 points from purchase',
				time: '2d ago',
			},
			{
				icon: Heart,
				title: 'Added to Wishlist',
				description: '"Premium Backpack" saved',
				time: '3d ago',
			},
		],
	};

	return (
		<section className="@container">
			<div className="mx-auto max-w-4xl px-4 @sm:px-6 @lg:px-8 py-8 @md:py-12 space-y-6">
				<ProfileBanner {...profileData.banner} />
				<ProfileInfo {...profileData.info} />
				<StatsRow stats={profileData.stats} />
				<LoyaltySection {...profileData.loyalty} />
				<QuickActions actions={profileData.quickActions} />
				<RecentActivity activities={profileData.activities} />
			</div>
		</section>
	);
}
