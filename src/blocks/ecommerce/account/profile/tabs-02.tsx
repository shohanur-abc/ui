import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Progress } from '@/components/ui/progress';
import { Input } from '@/components/ui/input';
import { Switch } from '@/components/ui/switch';
import { Separator } from '@/components/ui/separator';
import {
	Award,
	Bell,
	Crown,
	Gift,
	Heart,
	Key,
	Lock,
	Mail,
	Phone,
	Shield,
	Smartphone,
	Sparkles,
	Star,
	Trophy,
	User,
	Wallet,
	Zap,
} from 'lucide-react';

const LoyaltyHeader = ({
	src,
	fallback,
	name,
	tier,
	tierGradient,
	tierIcon: TierIcon,
	points,
	nextTierPoints,
	nextTier,
}: {
	src: string;
	fallback: string;
	name: string;
	tier: string;
	tierGradient: string;
	tierIcon: React.ElementType;
	points: number;
	nextTierPoints: number;
	nextTier: string;
}) => (
	<Card className="overflow-hidden">
		<div className={`h-24 ${tierGradient}`} />
		<CardContent className="-mt-12 px-6 pb-6">
			<div className="flex flex-col @sm:flex-row items-center gap-4">
				<div className="relative">
					<Avatar className="size-24 ring-4 ring-background">
						<AvatarImage src={src} alt={name} />
						<AvatarFallback className="text-2xl">{fallback}</AvatarFallback>
					</Avatar>
					<div
						className={`absolute -bottom-1 -right-1 p-2 rounded-full ${tierGradient}`}
					>
						<TierIcon className="size-4 text-white" />
					</div>
				</div>
				<div className="text-center @sm:text-left flex-1">
					<h1 className="text-2xl font-bold">{name}</h1>
					<Badge className={`${tierGradient} text-white border-0 mt-1`}>
						{tier} Member
					</Badge>
					<div className="mt-3 space-y-2">
						<div className="flex items-center justify-between text-sm">
							<span>{points.toLocaleString()} points</span>
							<span className="text-muted-foreground">
								{nextTierPoints.toLocaleString()} to {nextTier}
							</span>
						</div>
						<Progress value={(points / nextTierPoints) * 100} className="h-2" />
					</div>
				</div>
			</div>
		</CardContent>
	</Card>
);

const RewardsTab = ({
	rewards,
}: {
	rewards: {
		icon: React.ElementType;
		title: string;
		description: string;
		points: number;
		available: boolean;
	}[];
}) => (
	<div className="grid @sm:grid-cols-2 @lg:grid-cols-3 gap-4">
		{rewards.map((reward, i) => (
			<Card key={i} className={!reward.available ? 'opacity-60' : ''}>
				<CardContent className="p-5 space-y-4">
					<div className="flex items-center justify-between">
						<div className="p-2.5 rounded-xl bg-primary/10">
							<reward.icon className="size-6 text-primary" />
						</div>
						<Badge variant="secondary">{reward.points} pts</Badge>
					</div>
					<div>
						<h4 className="font-semibold">{reward.title}</h4>
						<p className="text-sm text-muted-foreground">
							{reward.description}
						</p>
					</div>
					<Button className="w-full" disabled={!reward.available}>
						{reward.available ? 'Redeem Now' : 'Not Enough Points'}
					</Button>
				</CardContent>
			</Card>
		))}
	</div>
);

const AchievementsTab = ({
	achievements,
}: {
	achievements: {
		icon: React.ElementType;
		title: string;
		description: string;
		progress: number;
		earned: boolean;
	}[];
}) => (
	<div className="grid @md:grid-cols-2 gap-4">
		{achievements.map((achievement, i) => (
			<Card key={i} className={achievement.earned ? 'border-amber-500/50' : ''}>
				<CardContent className="p-5 flex items-center gap-4">
					<div
						className={`p-3 rounded-xl ${achievement.earned ? 'bg-amber-500/20' : 'bg-muted'}`}
					>
						<achievement.icon
							className={`size-6 ${achievement.earned ? 'text-amber-500' : 'text-muted-foreground'}`}
						/>
					</div>
					<div className="flex-1">
						<div className="flex items-center justify-between">
							<h4 className="font-semibold">{achievement.title}</h4>
							{achievement.earned && (
								<Badge className="bg-amber-500/20 text-amber-600">Earned</Badge>
							)}
						</div>
						<p className="text-sm text-muted-foreground">
							{achievement.description}
						</p>
						{!achievement.earned && (
							<Progress value={achievement.progress} className="h-1.5 mt-2" />
						)}
					</div>
				</CardContent>
			</Card>
		))}
	</div>
);

const BenefitsTab = ({
	benefits,
}: {
	benefits: {
		icon: React.ElementType;
		title: string;
		description: string;
		active: boolean;
	}[];
}) => (
	<Card>
		<CardHeader className="pb-3">
			<h3 className="font-semibold">Your Benefits</h3>
		</CardHeader>
		<CardContent className="space-y-4">
			{benefits.map((benefit, i) => (
				<div
					key={i}
					className="flex items-center gap-4 p-4 rounded-lg bg-muted/30"
				>
					<div
						className={`p-2.5 rounded-lg ${benefit.active ? 'bg-green-500/10' : 'bg-muted'}`}
					>
						<benefit.icon
							className={`size-5 ${benefit.active ? 'text-green-500' : 'text-muted-foreground'}`}
						/>
					</div>
					<div className="flex-1">
						<h4 className="font-medium">{benefit.title}</h4>
						<p className="text-sm text-muted-foreground">
							{benefit.description}
						</p>
					</div>
					{benefit.active ? (
						<Badge className="bg-green-500/20 text-green-600">Active</Badge>
					) : (
						<Badge variant="secondary">Locked</Badge>
					)}
				</div>
			))}
		</CardContent>
	</Card>
);

const HistoryTab = ({
	history,
}: {
	history: {
		action: string;
		points: number;
		date: string;
		type: 'earned' | 'spent';
	}[];
}) => (
	<Card>
		<CardHeader className="pb-3">
			<h3 className="font-semibold">Points History</h3>
		</CardHeader>
		<CardContent className="space-y-3">
			{history.map((item, i) => (
				<div
					key={i}
					className="flex items-center justify-between p-3 rounded-lg hover:bg-muted/50"
				>
					<div>
						<p className="font-medium">{item.action}</p>
						<p className="text-sm text-muted-foreground">{item.date}</p>
					</div>
					<span
						className={`font-semibold ${item.type === 'earned' ? 'text-green-500' : 'text-red-500'}`}
					>
						{item.type === 'earned' ? '+' : '-'}
						{item.points} pts
					</span>
				</div>
			))}
		</CardContent>
	</Card>
);

export default function Main() {
	const profileData = {
		header: {
			src: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=400&h=400&fit=crop&crop=face',
			fallback: 'EJ',
			name: 'Emily Johnson',
			tier: 'Gold',
			tierGradient: 'bg-gradient-to-r from-amber-400 to-orange-500',
			tierIcon: Crown,
			points: 7500,
			nextTierPoints: 10000,
			nextTier: 'Platinum',
		},
		rewards: [
			{
				icon: Gift,
				title: '$10 Off',
				description: 'On orders $50+',
				points: 1000,
				available: true,
			},
			{
				icon: Sparkles,
				title: 'Free Shipping',
				description: 'One-time use',
				points: 500,
				available: true,
			},
			{
				icon: Star,
				title: '25% Off',
				description: 'Selected items',
				points: 2500,
				available: true,
			},
			{
				icon: Zap,
				title: 'VIP Access',
				description: 'Early sale access',
				points: 5000,
				available: true,
			},
			{
				icon: Award,
				title: 'Exclusive Gift',
				description: 'Mystery reward',
				points: 10000,
				available: false,
			},
			{
				icon: Crown,
				title: 'Double Points',
				description: 'For 30 days',
				points: 15000,
				available: false,
			},
		],
		achievements: [
			{
				icon: Star,
				title: 'First Purchase',
				description: 'Complete your first order',
				progress: 100,
				earned: true,
			},
			{
				icon: Heart,
				title: 'Loyal Customer',
				description: 'Make 10 purchases',
				progress: 100,
				earned: true,
			},
			{
				icon: Trophy,
				title: 'Big Spender',
				description: 'Spend $1,000 total',
				progress: 75,
				earned: false,
			},
			{
				icon: Zap,
				title: 'Speed Shopper',
				description: '5 orders in one month',
				progress: 40,
				earned: false,
			},
		],
		benefits: [
			{
				icon: Gift,
				title: 'Birthday Reward',
				description: 'Get a special gift on your birthday',
				active: true,
			},
			{
				icon: Zap,
				title: 'Early Access',
				description: 'Shop sales 24 hours early',
				active: true,
			},
			{
				icon: Sparkles,
				title: 'Free Shipping',
				description: 'On all orders',
				active: true,
			},
			{
				icon: Crown,
				title: 'Concierge Service',
				description: 'Personal shopping assistant',
				active: false,
			},
		],
		history: [
			{
				action: 'Purchase - Order #48291',
				points: 156,
				date: 'Jan 28, 2024',
				type: 'earned' as const,
			},
			{
				action: 'Redeemed - Free Shipping',
				points: 500,
				date: 'Jan 25, 2024',
				type: 'spent' as const,
			},
			{
				action: 'Purchase - Order #48280',
				points: 234,
				date: 'Jan 20, 2024',
				type: 'earned' as const,
			},
			{
				action: 'Review Bonus',
				points: 50,
				date: 'Jan 18, 2024',
				type: 'earned' as const,
			},
		],
	};

	return (
		<section className="@container">
			<div className="mx-auto max-w-5xl px-4 @sm:px-6 @lg:px-8 py-8 @md:py-12">
				<LoyaltyHeader {...profileData.header} />
				<Tabs defaultValue="rewards" className="mt-8">
					<TabsList className="w-full justify-start overflow-x-auto">
						<TabsTrigger value="rewards" className="gap-2">
							<Gift className="size-4" />
							Rewards
						</TabsTrigger>
						<TabsTrigger value="achievements" className="gap-2">
							<Trophy className="size-4" />
							Achievements
						</TabsTrigger>
						<TabsTrigger value="benefits" className="gap-2">
							<Sparkles className="size-4" />
							Benefits
						</TabsTrigger>
						<TabsTrigger value="history" className="gap-2">
							<Wallet className="size-4" />
							History
						</TabsTrigger>
					</TabsList>
					<TabsContent value="rewards" className="mt-6">
						<RewardsTab rewards={profileData.rewards} />
					</TabsContent>
					<TabsContent value="achievements" className="mt-6">
						<AchievementsTab achievements={profileData.achievements} />
					</TabsContent>
					<TabsContent value="benefits" className="mt-6">
						<BenefitsTab benefits={profileData.benefits} />
					</TabsContent>
					<TabsContent value="history" className="mt-6">
						<HistoryTab history={profileData.history} />
					</TabsContent>
				</Tabs>
			</div>
		</section>
	);
}
