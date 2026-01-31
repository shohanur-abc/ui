import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import {
	ArrowRight,
	Calendar,
	ChevronRight,
	Clock,
	Crown,
	Gift,
	Gem,
	Heart,
	MapPin,
	Package,
	Percent,
	Sparkles,
	Star,
	Ticket,
	Trophy,
	Truck,
	Zap,
} from 'lucide-react';
import Link from 'next/link';
import Image from 'next/image';

const VIPBannerCard = ({
	src,
	fallback,
	name,
	tier,
	tierIcon: TierIcon,
	tierGradient,
	memberSince,
	expiresIn,
}: {
	src: string;
	fallback: string;
	name: string;
	tier: string;
	tierIcon: React.ElementType;
	tierGradient: string;
	memberSince: string;
	expiresIn: string;
}) => (
	<Card className={`col-span-full ${tierGradient} border-0 text-white`}>
		<CardContent className="p-6">
			<div className="flex flex-col @md:flex-row @md:items-center gap-4">
				<Avatar className="size-20 ring-4 ring-white/20">
					<AvatarImage src={src} alt={name} />
					<AvatarFallback className="bg-white/20 text-white text-2xl">{fallback}</AvatarFallback>
				</Avatar>
				<div className="flex-1">
					<div className="flex items-center gap-2 mb-1">
						<TierIcon className="size-5" />
						<Badge className="bg-white/20 text-white border-white/30">{tier} Member</Badge>
					</div>
					<h2 className="text-2xl font-bold">{name}</h2>
					<p className="opacity-80 text-sm">Member since {memberSince}</p>
				</div>
				<div className="text-right">
					<p className="text-sm opacity-80">Membership expires in</p>
					<p className="text-lg font-semibold">{expiresIn}</p>
					<Button variant="secondary" size="sm" className="mt-2" asChild>
						<Link href="/membership/renew">Renew Now</Link>
					</Button>
				</div>
			</div>
		</CardContent>
	</Card>
);

const BenefitsCard = ({
	items,
}: {
	items: { icon: React.ElementType; title: string; description: string; color: string }[];
}) => (
	<Card className="row-span-2">
		<CardContent className="p-4 h-full flex flex-col">
			<div className="flex items-center gap-2 mb-4">
				<Sparkles className="size-5 text-amber-500" />
				<h3 className="font-medium">VIP Benefits</h3>
			</div>
			<div className="flex-1 space-y-3">
				{items.map((benefit, i) => (
					<div key={i} className="flex items-start gap-3 p-3 rounded-lg bg-muted/30">
						<div className={`p-2 rounded-lg ${benefit.color} shrink-0`}>
							<benefit.icon className="size-4" />
						</div>
						<div>
							<p className="text-sm font-medium">{benefit.title}</p>
							<p className="text-xs text-muted-foreground">{benefit.description}</p>
						</div>
					</div>
				))}
			</div>
		</CardContent>
	</Card>
);

const PointsCard = ({
	points,
	pointsValue,
	expiringPoints,
	expiringDate,
}: {
	points: number;
	pointsValue: string;
	expiringPoints: number;
	expiringDate: string;
}) => (
	<Card className="bg-gradient-to-br from-amber-500/10 via-background to-orange-500/10">
		<CardContent className="p-4 space-y-3">
			<div className="flex items-center gap-2">
				<Gem className="size-5 text-amber-500" />
				<h3 className="font-medium">Points Balance</h3>
			</div>
			<div>
				<p className="text-3xl font-bold">{points.toLocaleString()}</p>
				<p className="text-sm text-muted-foreground">Worth {pointsValue}</p>
			</div>
			{expiringPoints > 0 && (
				<div className="flex items-center gap-2 text-xs text-amber-600 bg-amber-500/10 p-2 rounded">
					<Clock className="size-3" />
					<span>{expiringPoints} pts expire {expiringDate}</span>
				</div>
			)}
			<Button variant="outline" size="sm" className="w-full" asChild>
				<Link href="/points/redeem">Redeem Points</Link>
			</Button>
		</CardContent>
	</Card>
);

const ExclusiveDealsCard = ({
	count,
	savings,
}: {
	count: number;
	savings: string;
}) => (
	<Link href="/vip/deals">
		<Card className="h-full hover:bg-muted/50 transition-colors group">
			<CardContent className="p-4 h-full flex flex-col items-center justify-center text-center">
				<div className="p-4 rounded-full bg-purple-500/20 mb-3 group-hover:scale-110 transition-transform">
					<Ticket className="size-8 text-purple-500" />
				</div>
				<p className="text-2xl font-bold">{count}</p>
				<p className="text-sm text-muted-foreground">Exclusive Deals</p>
				<Badge className="mt-2 bg-purple-500/20 text-purple-600">Save up to {savings}</Badge>
			</CardContent>
		</Card>
	</Link>
);

const TierProgressCard = ({
	currentTier,
	nextTier,
	spent,
	requiredSpend,
	benefits,
}: {
	currentTier: string;
	nextTier: string;
	spent: number;
	requiredSpend: number;
	benefits: string[];
}) => (
	<Card className="col-span-full @lg:col-span-2">
		<CardContent className="p-4 space-y-4">
			<div className="flex items-center justify-between">
				<h3 className="font-medium">Tier Progress</h3>
				<div className="flex items-center gap-2">
					<Badge variant="outline">{currentTier}</Badge>
					<ArrowRight className="size-4 text-muted-foreground" />
					<Badge className="bg-gradient-to-r from-primary to-accent text-white">{nextTier}</Badge>
				</div>
			</div>
			<div className="space-y-2">
				<div className="flex justify-between text-sm">
					<span>${spent.toLocaleString()} spent</span>
					<span className="text-muted-foreground">${requiredSpend.toLocaleString()}</span>
				</div>
				<Progress value={(spent / requiredSpend) * 100} className="h-3" />
				<p className="text-xs text-muted-foreground">
					Spend ${(requiredSpend - spent).toLocaleString()} more to reach {nextTier}
				</p>
			</div>
			<div className="p-3 rounded-lg bg-muted/30">
				<p className="text-xs font-medium mb-2">{nextTier} benefits include:</p>
				<div className="flex flex-wrap gap-2">
					{benefits.map((benefit, i) => (
						<Badge key={i} variant="secondary" className="text-xs">{benefit}</Badge>
					))}
				</div>
			</div>
		</CardContent>
	</Card>
);

const RewardsHistoryCard = ({
	items,
}: {
	items: { icon: React.ElementType; title: string; points: string; date: string }[];
}) => (
	<Card>
		<CardContent className="p-4">
			<div className="flex items-center justify-between mb-4">
				<div className="flex items-center gap-2">
					<Trophy className="size-5 text-amber-500" />
					<h3 className="font-medium">Recent Rewards</h3>
				</div>
				<Button variant="ghost" size="sm" className="text-xs" asChild>
					<Link href="/rewards/history">View All</Link>
				</Button>
			</div>
			<div className="space-y-3">
				{items.map((reward, i) => (
					<div key={i} className="flex items-center gap-3">
						<reward.icon className="size-4 text-muted-foreground" />
						<div className="flex-1 min-w-0">
							<p className="text-sm truncate">{reward.title}</p>
							<p className="text-xs text-muted-foreground">{reward.date}</p>
						</div>
						<span className="text-sm font-medium text-green-500">{reward.points}</span>
					</div>
				))}
			</div>
		</CardContent>
	</Card>
);

export default function Main() {
	const profileData = {
		vip: {
			src: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=400&h=400&fit=crop&crop=face',
			fallback: 'SC',
			name: 'Sophia Chen',
			tier: 'Diamond',
			tierIcon: Crown,
			tierGradient: 'bg-gradient-to-r from-cyan-600 via-blue-600 to-purple-600',
			memberSince: 'Jan 2021',
			expiresIn: '287 days',
		},
		benefits: [
			{ icon: Truck, title: 'Free Express Shipping', description: 'On all orders, no minimum', color: 'bg-blue-500/20 text-blue-500' },
			{ icon: Percent, title: '20% Member Discount', description: 'Extra off all purchases', color: 'bg-green-500/20 text-green-500' },
			{ icon: Gift, title: 'Birthday Bonus', description: 'Double points in your birthday month', color: 'bg-purple-500/20 text-purple-500' },
			{ icon: Zap, title: 'Early Access', description: 'Shop new arrivals 48h early', color: 'bg-amber-500/20 text-amber-500' },
		],
		points: {
			points: 45800,
			pointsValue: '$458.00',
			expiringPoints: 2500,
			expiringDate: 'Mar 31',
		},
		exclusiveDeals: {
			count: 12,
			savings: '50%',
		},
		tierProgress: {
			currentTier: 'Diamond',
			nextTier: 'Elite',
			spent: 8500,
			requiredSpend: 10000,
			benefits: ['25% Discount', 'VIP Events', 'Personal Stylist', 'Gift Wrapping'],
		},
		rewardsHistory: [
			{ icon: Package, title: 'Order #48291 bonus', points: '+450', date: 'Today' },
			{ icon: Star, title: 'Review reward', points: '+50', date: 'Yesterday' },
			{ icon: Heart, title: 'Referral bonus', points: '+500', date: '2 days ago' },
		],
	};

	return (
		<section className="@container">
			<div className="mx-auto max-w-4xl px-4 @sm:px-6 @lg:px-8 py-8 @md:py-12">
				<div className="grid grid-cols-1 @md:grid-cols-2 @lg:grid-cols-3 gap-4">
					<VIPBannerCard {...profileData.vip} />
					<BenefitsCard items={profileData.benefits} />
					<PointsCard {...profileData.points} />
					<ExclusiveDealsCard {...profileData.exclusiveDeals} />
					<TierProgressCard {...profileData.tierProgress} />
					<RewardsHistoryCard items={profileData.rewardsHistory} />
				</div>
			</div>
		</section>
	);
}
