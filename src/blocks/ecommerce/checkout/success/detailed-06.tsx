import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import { Progress } from '@/components/ui/progress';
import {
	CheckCircle,
	Gift,
	Star,
	Sparkles,
	Crown,
	Trophy,
	Zap,
	ArrowRight,
	Wallet,
	PercentCircle,
} from 'lucide-react';
import Link from 'next/link';

interface RewardProps {
	type: string;
	description: string;
	value: string;
	expiresAt?: string;
	icon: React.ElementType;
}

interface TierProps {
	name: string;
	icon: React.ElementType;
	color: string;
	progress: number;
	pointsToNext: number;
	benefits: string[];
}

interface CTAProps {
	items: {
		label: string;
		href: string;
		variant?: 'default' | 'outline' | 'ghost';
		icon?: React.ElementType;
	}[];
}

const PageHeader = ({
	orderNumber,
	pointsEarned,
}: {
	orderNumber: string;
	pointsEarned: number;
}) => (
	<div className="flex flex-col @lg:flex-row @lg:items-center justify-between gap-4">
		<div className="flex items-center gap-4">
			<div className="size-14 rounded-full bg-amber-500/10 flex items-center justify-center">
				<CheckCircle className="size-7 text-amber-500" />
			</div>
			<div>
				<h1 className="text-2xl @lg:text-3xl font-bold">Order Complete!</h1>
				<p className="text-muted-foreground">Order #{orderNumber}</p>
			</div>
		</div>
		<div className="flex items-center gap-3 p-4 rounded-xl bg-gradient-to-r from-amber-500/10 to-orange-500/10">
			<Star className="size-6 text-amber-500" />
			<div>
				<p className="text-sm text-muted-foreground">Points Earned</p>
				<p className="text-2xl font-bold text-amber-600">+{pointsEarned}</p>
			</div>
		</div>
	</div>
);

const PointsBalanceCard = ({
	currentPoints,
	pendingPoints,
	lifetimePoints,
}: {
	currentPoints: number;
	pendingPoints: number;
	lifetimePoints: number;
}) => (
	<Card className="bg-gradient-to-br from-amber-500 via-orange-500 to-rose-500 text-white">
		<CardContent className="pt-6">
			<div className="flex items-center gap-3 mb-6">
				<Wallet className="size-8" />
				<span className="font-semibold text-lg">Your Points Balance</span>
			</div>
			<div className="grid @sm:grid-cols-3 gap-4">
				<div className="p-4 rounded-xl bg-white/10">
					<p className="text-sm opacity-80">Available</p>
					<p className="text-3xl font-bold">{currentPoints.toLocaleString()}</p>
				</div>
				<div className="p-4 rounded-xl bg-white/10">
					<p className="text-sm opacity-80">Pending</p>
					<p className="text-3xl font-bold">
						+{pendingPoints.toLocaleString()}
					</p>
				</div>
				<div className="p-4 rounded-xl bg-white/10">
					<p className="text-sm opacity-80">Lifetime</p>
					<p className="text-3xl font-bold">
						{lifetimePoints.toLocaleString()}
					</p>
				</div>
			</div>
		</CardContent>
	</Card>
);

const RewardCard = ({
	type,
	description,
	value,
	expiresAt,
	icon: Icon,
}: RewardProps) => (
	<div className="flex items-center gap-4 p-4 rounded-xl border hover:bg-muted/50 transition-colors">
		<div className="size-12 rounded-xl bg-amber-500/10 flex items-center justify-center">
			<Icon className="size-6 text-amber-500" />
		</div>
		<div className="flex-1 min-w-0">
			<div className="flex items-center gap-2">
				<p className="font-semibold">{type}</p>
				<Badge variant="secondary" className="text-xs">
					{value}
				</Badge>
			</div>
			<p className="text-sm text-muted-foreground">{description}</p>
			{expiresAt && (
				<p className="text-xs text-muted-foreground mt-1">
					Expires: {expiresAt}
				</p>
			)}
		</div>
		<Button size="sm">Use Now</Button>
	</div>
);

const RewardsSection = ({ rewards }: { rewards: RewardProps[] }) => (
	<Card>
		<CardHeader>
			<CardTitle className="flex items-center gap-2">
				<Sparkles className="size-5" />
				Rewards Unlocked
			</CardTitle>
		</CardHeader>
		<CardContent className="space-y-3">
			{rewards.map((reward, i) => (
				<RewardCard key={i} {...reward} />
			))}
		</CardContent>
	</Card>
);

const TierProgressCard = ({
	name,
	icon: Icon,
	color,
	progress,
	pointsToNext,
	benefits,
}: TierProps) => (
	<Card>
		<CardHeader>
			<CardTitle className="text-base flex items-center gap-2">
				<Crown className="size-4" />
				Your Tier Status
			</CardTitle>
		</CardHeader>
		<CardContent className="space-y-4">
			<div className="flex items-center gap-4">
				<div
					className={`size-16 rounded-2xl ${color} flex items-center justify-center`}
				>
					<Icon className="size-8 text-white" />
				</div>
				<div>
					<p className="text-2xl font-bold">{name}</p>
					<p className="text-sm text-muted-foreground">Member Tier</p>
				</div>
			</div>
			<div>
				<div className="flex justify-between text-sm mb-2">
					<span className="text-muted-foreground">Progress to next tier</span>
					<span className="font-medium">{progress}%</span>
				</div>
				<Progress value={progress} className="h-3" />
				<p className="text-xs text-muted-foreground mt-2">
					{pointsToNext.toLocaleString()} points to reach Platinum
				</p>
			</div>
			<Separator />
			<div>
				<p className="text-sm font-medium mb-2">Your Benefits</p>
				<ul className="space-y-1.5">
					{benefits.map((benefit, i) => (
						<li key={i} className="flex items-center gap-2 text-sm">
							<CheckCircle className="size-4 text-emerald-500" />
							<span>{benefit}</span>
						</li>
					))}
				</ul>
			</div>
		</CardContent>
	</Card>
);

const UpcomingRewardsCard = ({
	rewards,
}: {
	rewards: { points: number; reward: string }[];
}) => (
	<Card>
		<CardHeader>
			<CardTitle className="text-base flex items-center gap-2">
				<Trophy className="size-4" />
				Upcoming Rewards
			</CardTitle>
		</CardHeader>
		<CardContent className="space-y-3">
			{rewards.map((reward, i) => (
				<div key={i} className="flex items-center justify-between">
					<span className="text-sm">{reward.reward}</span>
					<Badge variant="outline">{reward.points.toLocaleString()} pts</Badge>
				</div>
			))}
		</CardContent>
	</Card>
);

const RecentActivityCard = ({
	activities,
}: {
	activities: { action: string; points: number; date: string }[];
}) => (
	<Card>
		<CardHeader>
			<CardTitle className="text-base flex items-center gap-2">
				<Zap className="size-4" />
				Recent Activity
			</CardTitle>
		</CardHeader>
		<CardContent className="space-y-3">
			{activities.map((activity, i) => (
				<div key={i} className="flex items-center justify-between text-sm">
					<div>
						<p className="font-medium">{activity.action}</p>
						<p className="text-xs text-muted-foreground">{activity.date}</p>
					</div>
					<span className="text-emerald-600 font-medium">
						+{activity.points}
					</span>
				</div>
			))}
		</CardContent>
	</Card>
);

const CTA = ({ items }: CTAProps) => (
	<div className="flex flex-col @sm:flex-row gap-3">
		{items.map(({ label, href, variant, icon: Icon }, i) => (
			<Button
				key={i}
				size="lg"
				variant={variant || 'default'}
				className="flex-1 gap-2"
				asChild
			>
				<Link href={href}>
					{label}
					{Icon && <Icon className="size-4" />}
				</Link>
			</Button>
		))}
	</div>
);

export default function Main() {
	const rewards: RewardProps[] = [
		{
			type: 'Birthday Bonus',
			description: 'Double points on your next purchase',
			value: '2x Points',
			expiresAt: 'Feb 28, 2024',
			icon: Gift,
		},
		{
			type: 'Loyalty Discount',
			description: 'Extra discount for Gold members',
			value: '15% Off',
			icon: PercentCircle,
		},
		{
			type: 'Free Shipping',
			description: 'Free express shipping on all orders',
			value: 'Unlocked',
			icon: Sparkles,
		},
	];

	const tierBenefits = [
		'2x points on all purchases',
		'Free standard shipping',
		'Early access to sales',
		'Exclusive member discounts',
	];

	const upcomingRewards = [
		{ points: 500, reward: '$10 Store Credit' },
		{ points: 1000, reward: '$25 Store Credit' },
		{ points: 2500, reward: 'Platinum Status' },
	];

	const recentActivity = [
		{ action: 'Order Completed', points: 250, date: 'Today' },
		{ action: 'Review Written', points: 50, date: 'Jan 10' },
		{ action: 'Birthday Bonus', points: 100, date: 'Jan 5' },
	];

	return (
		<section className="@container min-h-screen py-12 @md:py-16 @xl:py-20">
			<div className="mx-auto max-w-5xl px-4 @sm:px-6 @2xl:px-8 space-y-8">
				<PageHeader orderNumber="ORD-2024-78432" pointsEarned={250} />

				<PointsBalanceCard
					currentPoints={3250}
					pendingPoints={250}
					lifetimePoints={12450}
				/>

				<div className="grid @lg:grid-cols-3 gap-6">
					<div className="@lg:col-span-2 space-y-6">
						<RewardsSection rewards={rewards} />
					</div>
					<div className="space-y-6">
						<TierProgressCard
							name="Gold"
							icon={Crown}
							color="bg-gradient-to-br from-amber-400 to-amber-600"
							progress={65}
							pointsToNext={1750}
							benefits={tierBenefits}
						/>
						<UpcomingRewardsCard rewards={upcomingRewards} />
						<RecentActivityCard activities={recentActivity} />
					</div>
				</div>

				<CTA
					items={[
						{ label: 'Explore Rewards', href: '/rewards', icon: ArrowRight },
						{ label: 'Continue Shopping', href: '/shop', variant: 'outline' },
					]}
				/>
			</div>
		</section>
	);
}
