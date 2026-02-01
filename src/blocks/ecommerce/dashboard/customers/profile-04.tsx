import {
	Award,
	Calendar,
	ChevronRight,
	Clock,
	Crown,
	Gift,
	History,
	MoreHorizontal,
	Percent,
	ShoppingBag,
	Sparkles,
	Star,
	Target,
	Trophy,
	Zap,
} from 'lucide-react';

import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';

interface LoyaltyProfile {
	id: string;
	name: string;
	email: string;
	avatar?: string;
	initials: string;
	tier: {
		current: 'bronze' | 'silver' | 'gold' | 'platinum' | 'diamond';
		nextTier?: string;
		pointsToNext?: number;
	};
	points: {
		available: number;
		lifetime: number;
		expiring: number;
		expiryDate: string;
	};
	benefits: Array<{
		id: string;
		name: string;
		description: string;
		icon: 'percent' | 'gift' | 'truck' | 'star' | 'crown';
		active: boolean;
	}>;
	achievements: Array<{
		id: string;
		name: string;
		description: string;
		earnedDate: string;
		icon: string;
	}>;
	recentActivity: Array<{
		id: string;
		type: 'earned' | 'redeemed' | 'expired';
		description: string;
		points: number;
		date: string;
	}>;
	rewards: Array<{
		id: string;
		name: string;
		pointsCost: number;
		image?: string;
	}>;
}

const TierConfig = {
	bronze: {
		label: 'Bronze',
		color: 'text-orange-400',
		bg: 'bg-orange-500/10',
		border: 'border-orange-500/30',
	},
	silver: {
		label: 'Silver',
		color: 'text-slate-300',
		bg: 'bg-slate-400/10',
		border: 'border-slate-400/30',
	},
	gold: {
		label: 'Gold',
		color: 'text-amber-400',
		bg: 'bg-amber-500/10',
		border: 'border-amber-500/30',
	},
	platinum: {
		label: 'Platinum',
		color: 'text-violet-300',
		bg: 'bg-violet-500/10',
		border: 'border-violet-500/30',
	},
	diamond: {
		label: 'Diamond',
		color: 'text-cyan-300',
		bg: 'bg-cyan-500/10',
		border: 'border-cyan-500/30',
	},
};

const TierBadge = ({ tier }: { tier: LoyaltyProfile['tier']['current'] }) => {
	const config = TierConfig[tier];
	return (
		<Badge
			variant="outline"
			className={`${config.color} ${config.bg} ${config.border} gap-1.5`}
		>
			<Crown className="size-3.5 fill-current" />
			{config.label}
		</Badge>
	);
};

const BenefitIcon = ({ type }: { type: string }) => {
	const icons: Record<string, React.ElementType> = {
		percent: Percent,
		gift: Gift,
		truck: ShoppingBag,
		star: Star,
		crown: Crown,
	};
	const Icon = icons[type] || Star;
	return <Icon className="size-5" />;
};

const ActivityIcon = ({
	type,
}: {
	type: 'earned' | 'redeemed' | 'expired';
}) => {
	const config = {
		earned: { icon: Zap, color: 'text-emerald-500 bg-emerald-500/10' },
		redeemed: { icon: Gift, color: 'text-blue-500 bg-blue-500/10' },
		expired: { icon: Clock, color: 'text-red-500 bg-red-500/10' },
	};
	const { icon: Icon, color } = config[type];
	return (
		<div
			className={`size-8 rounded-full flex items-center justify-center ${color}`}
		>
			<Icon className="size-4" />
		</div>
	);
};

const ProfileHeader = ({ profile }: { profile: LoyaltyProfile }) => (
	<Card className="border-2 border-primary/20 bg-gradient-to-br from-primary/5 to-transparent">
		<CardContent className="p-6">
			<div className="flex flex-col @md:flex-row gap-6">
				<div className="flex items-center gap-4">
					<Avatar className="size-20 ring-4 ring-primary/20">
						<AvatarImage src={profile.avatar} alt={profile.name} />
						<AvatarFallback className="bg-primary/10 text-primary text-2xl">
							{profile.initials}
						</AvatarFallback>
					</Avatar>
					<div>
						<h1 className="text-2xl font-bold">{profile.name}</h1>
						<div className="flex items-center gap-2 mt-1">
							<TierBadge tier={profile.tier.current} />
							<span className="text-muted-foreground text-sm">
								{profile.email}
							</span>
						</div>
					</div>
				</div>
				<div className="flex-1 grid grid-cols-3 gap-4 @md:gap-6">
					<div className="text-center">
						<p className="text-3xl font-bold text-primary">
							{profile.points.available.toLocaleString()}
						</p>
						<p className="text-sm text-muted-foreground">Available Points</p>
					</div>
					<div className="text-center">
						<p className="text-3xl font-bold">
							{profile.points.lifetime.toLocaleString()}
						</p>
						<p className="text-sm text-muted-foreground">Lifetime Points</p>
					</div>
					<div className="text-center">
						<p className="text-3xl font-bold text-amber-500">
							{profile.points.expiring}
						</p>
						<p className="text-sm text-muted-foreground">
							Expiring {profile.points.expiryDate}
						</p>
					</div>
				</div>
			</div>

			{profile.tier.nextTier && (
				<div className="mt-6">
					<div className="flex items-center justify-between mb-2 text-sm">
						<span>Progress to {profile.tier.nextTier}</span>
						<span className="font-medium">
							{profile.tier.pointsToNext?.toLocaleString()} points needed
						</span>
					</div>
					<Progress value={75} className="h-2" />
				</div>
			)}
		</CardContent>
	</Card>
);

const BenefitCard = ({
	benefit,
}: {
	benefit: LoyaltyProfile['benefits'][0];
}) => (
	<div
		className={`flex items-center gap-3 rounded-lg border p-3 ${benefit.active ? 'bg-primary/5 border-primary/30' : 'opacity-60'}`}
	>
		<div
			className={`size-10 rounded-full flex items-center justify-center ${benefit.active ? 'bg-primary/10 text-primary' : 'bg-muted text-muted-foreground'}`}
		>
			<BenefitIcon type={benefit.icon} />
		</div>
		<div className="flex-1 min-w-0">
			<p className="font-medium text-sm">{benefit.name}</p>
			<p className="text-xs text-muted-foreground truncate">
				{benefit.description}
			</p>
		</div>
		{benefit.active && (
			<Badge
				variant="outline"
				className="bg-emerald-500/10 text-emerald-500 text-xs"
			>
				Active
			</Badge>
		)}
	</div>
);

export default function Main() {
	const profile: LoyaltyProfile = {
		id: '1',
		name: 'Victoria Hayes',
		email: 'victoria.h@email.com',
		initials: 'VH',
		tier: { current: 'gold', nextTier: 'Platinum', pointsToNext: 2500 },
		points: {
			available: 7500,
			lifetime: 45200,
			expiring: 1200,
			expiryDate: 'Mar 31',
		},
		benefits: [
			{
				id: '1',
				name: '15% Off All Orders',
				description: 'Exclusive tier discount',
				icon: 'percent',
				active: true,
			},
			{
				id: '2',
				name: 'Free Shipping',
				description: 'On orders over $50',
				icon: 'truck',
				active: true,
			},
			{
				id: '3',
				name: 'Birthday Reward',
				description: '500 bonus points',
				icon: 'gift',
				active: true,
			},
			{
				id: '4',
				name: 'Early Access',
				description: 'Shop sales 24h early',
				icon: 'star',
				active: true,
			},
			{
				id: '5',
				name: 'VIP Support',
				description: 'Priority customer service',
				icon: 'crown',
				active: false,
			},
		],
		achievements: [
			{
				id: '1',
				name: 'First Purchase',
				description: 'Made your first order',
				earnedDate: 'Jan 2022',
				icon: '🎉',
			},
			{
				id: '2',
				name: 'Super Shopper',
				description: '25 orders placed',
				earnedDate: 'Jun 2023',
				icon: '🛒',
			},
			{
				id: '3',
				name: 'Review Master',
				description: '10 product reviews',
				earnedDate: 'Aug 2023',
				icon: '⭐',
			},
			{
				id: '4',
				name: 'Referral Pro',
				description: '5 friends referred',
				earnedDate: 'Oct 2023',
				icon: '🤝',
			},
		],
		recentActivity: [
			{
				id: '1',
				type: 'earned',
				description: 'Order #ORD-8912',
				points: 450,
				date: 'Today',
			},
			{
				id: '2',
				type: 'redeemed',
				description: '$20 discount applied',
				points: -2000,
				date: 'Yesterday',
			},
			{
				id: '3',
				type: 'earned',
				description: 'Product review bonus',
				points: 100,
				date: '3 days ago',
			},
			{
				id: '4',
				type: 'expired',
				description: 'Points expired',
				points: -200,
				date: '1 week ago',
			},
		],
		rewards: [
			{ id: '1', name: '$10 Off', pointsCost: 1000 },
			{ id: '2', name: '$25 Off', pointsCost: 2500 },
			{ id: '3', name: 'Free Gift', pointsCost: 3500 },
			{ id: '4', name: '$50 Off', pointsCost: 5000 },
		],
	};

	return (
		<section className="@container" data-theme="dashboard">
			<div className="mx-auto max-w-5xl space-y-6 px-4 py-8 @sm:px-6 @2xl:px-8">
				<ProfileHeader profile={profile} />

				<div className="grid @lg:grid-cols-3 gap-6">
					<div className="@lg:col-span-2 space-y-6">
						<Card>
							<CardHeader>
								<CardTitle className="text-base flex items-center gap-2">
									<Sparkles className="size-4" />
									Tier Benefits
								</CardTitle>
							</CardHeader>
							<CardContent className="grid @sm:grid-cols-2 gap-3">
								{profile.benefits.map((benefit) => (
									<BenefitCard key={benefit.id} benefit={benefit} />
								))}
							</CardContent>
						</Card>

						<Card>
							<CardHeader>
								<CardTitle className="text-base flex items-center gap-2">
									<Trophy className="size-4" />
									Achievements
								</CardTitle>
							</CardHeader>
							<CardContent>
								<div className="flex flex-wrap gap-3">
									{profile.achievements.map((achievement) => (
										<div
											key={achievement.id}
											className="flex items-center gap-2 rounded-full border bg-muted/30 px-3 py-1.5"
										>
											<span className="text-lg">{achievement.icon}</span>
											<span className="text-sm font-medium">
												{achievement.name}
											</span>
										</div>
									))}
								</div>
							</CardContent>
						</Card>
					</div>

					<div className="space-y-6">
						<Card>
							<CardHeader>
								<CardTitle className="text-base flex items-center gap-2">
									<History className="size-4" />
									Recent Activity
								</CardTitle>
							</CardHeader>
							<CardContent className="space-y-3">
								{profile.recentActivity.map((activity) => (
									<div key={activity.id} className="flex items-center gap-3">
										<ActivityIcon type={activity.type} />
										<div className="flex-1 min-w-0">
											<p className="text-sm truncate">{activity.description}</p>
											<p className="text-xs text-muted-foreground">
												{activity.date}
											</p>
										</div>
										<span
											className={`text-sm font-medium ${activity.points > 0 ? 'text-emerald-500' : 'text-red-500'}`}
										>
											{activity.points > 0 ? '+' : ''}
											{activity.points}
										</span>
									</div>
								))}
							</CardContent>
						</Card>

						<Card>
							<CardHeader>
								<CardTitle className="text-base flex items-center gap-2">
									<Gift className="size-4" />
									Redeem Points
								</CardTitle>
							</CardHeader>
							<CardContent className="space-y-2">
								{profile.rewards.map((reward) => (
									<div
										key={reward.id}
										className="flex items-center justify-between rounded-lg border p-3"
									>
										<span className="font-medium text-sm">{reward.name}</span>
										<Button
											variant="outline"
											size="sm"
											disabled={profile.points.available < reward.pointsCost}
										>
											{reward.pointsCost.toLocaleString()} pts
										</Button>
									</div>
								))}
							</CardContent>
						</Card>
					</div>
				</div>
			</div>
		</section>
	);
}
