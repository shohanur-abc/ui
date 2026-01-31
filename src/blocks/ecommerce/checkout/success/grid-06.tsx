import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import {
	CheckCircle,
	Gift,
	Star,
	Crown,
	Sparkles,
	Zap,
	ArrowRight,
} from 'lucide-react';
import Link from 'next/link';

interface RewardCardProps {
	icon: React.ElementType;
	title: string;
	description: string;
	value: string;
	color: string;
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
	<div className="text-center space-y-4">
		<div className="size-20 mx-auto rounded-full bg-amber-500/10 flex items-center justify-center">
			<CheckCircle className="size-10 text-amber-500" />
		</div>
		<div>
			<h1 className="text-2xl @lg:text-4xl font-bold">Order Complete!</h1>
			<p className="text-muted-foreground">Order #{orderNumber}</p>
		</div>
		<div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-amber-500/10">
			<Star className="size-5 text-amber-500" />
			<span className="font-semibold text-amber-600">+{pointsEarned} Points Earned</span>
		</div>
	</div>
);

const PointsBalanceCard = ({
	available,
	pending,
	nextReward,
	progress,
}: {
	available: number;
	pending: number;
	nextReward: number;
	progress: number;
}) => (
	<Card className="bg-gradient-to-br from-amber-500 via-orange-500 to-rose-500 text-white border-0">
		<CardContent className="pt-6">
			<div className="grid @sm:grid-cols-2 gap-6">
				<div className="space-y-2">
					<p className="opacity-80">Available Points</p>
					<p className="text-4xl font-bold">{available.toLocaleString()}</p>
					<p className="text-sm opacity-80">+{pending} pending</p>
				</div>
				<div className="space-y-2">
					<p className="opacity-80">Next Reward at</p>
					<p className="text-2xl font-bold">{nextReward.toLocaleString()}</p>
					<Progress value={progress} className="h-2 bg-white/20" />
				</div>
			</div>
		</CardContent>
	</Card>
);

const RewardCard = ({
	icon: Icon,
	title,
	description,
	value,
	color,
}: RewardCardProps) => (
	<Card className="hover:shadow-lg transition-shadow">
		<CardContent className="pt-6">
			<div className="text-center space-y-3">
				<div
					className={`size-12 mx-auto rounded-xl flex items-center justify-center ${color}`}
				>
					<Icon className="size-6 text-white" />
				</div>
				<div>
					<p className="font-semibold">{title}</p>
					<p className="text-xs text-muted-foreground">{description}</p>
				</div>
				<Badge variant="secondary">{value}</Badge>
			</div>
		</CardContent>
	</Card>
);

const TierCard = ({
	tierName,
	progress,
	pointsNeeded,
	benefits,
}: {
	tierName: string;
	progress: number;
	pointsNeeded: number;
	benefits: string[];
}) => (
	<Card>
		<CardContent className="pt-6">
			<div className="flex items-center gap-4 mb-4">
				<div className="size-14 rounded-xl bg-gradient-to-br from-amber-400 to-amber-600 flex items-center justify-center">
					<Crown className="size-7 text-white" />
				</div>
				<div className="flex-1">
					<p className="font-semibold text-lg">{tierName} Member</p>
					<p className="text-sm text-muted-foreground">
						{pointsNeeded.toLocaleString()} pts to next tier
					</p>
				</div>
			</div>
			<Progress value={progress} className="h-2 mb-4" />
			<div className="grid grid-cols-2 gap-2">
				{benefits.map((benefit, i) => (
					<div key={i} className="flex items-center gap-2 text-sm">
						<CheckCircle className="size-4 text-emerald-500" />
						<span>{benefit}</span>
					</div>
				))}
			</div>
		</CardContent>
	</Card>
);

const ActivityCard = ({
	activities,
}: {
	activities: { label: string; points: number; date: string }[];
}) => (
	<Card>
		<CardContent className="pt-6">
			<h3 className="font-semibold mb-4 flex items-center gap-2">
				<Zap className="size-4" />
				Recent Activity
			</h3>
			<div className="space-y-3">
				{activities.map((activity, i) => (
					<div key={i} className="flex items-center justify-between text-sm">
						<div>
							<p className="font-medium">{activity.label}</p>
							<p className="text-xs text-muted-foreground">{activity.date}</p>
						</div>
						<span className="text-emerald-600 font-semibold">
							+{activity.points}
						</span>
					</div>
				))}
			</div>
		</CardContent>
	</Card>
);

const CTA = ({ items }: CTAProps) => (
	<div className="flex flex-col @sm:flex-row gap-3 justify-center">
		{items.map(({ label, href, variant, icon: Icon }, i) => (
			<Button key={i} size="lg" variant={variant || 'default'} className="gap-2" asChild>
				<Link href={href}>
					{label}
					{Icon && <Icon className="size-4" />}
				</Link>
			</Button>
		))}
	</div>
);

export default function Main() {
	const rewards: RewardCardProps[] = [
		{
			icon: Gift,
			title: 'Birthday Bonus',
			description: 'Double points this month',
			value: '2x Points',
			color: 'bg-pink-500',
		},
		{
			icon: Star,
			title: 'Loyalty Discount',
			description: 'On your next order',
			value: '15% Off',
			color: 'bg-amber-500',
		},
		{
			icon: Sparkles,
			title: 'Free Shipping',
			description: 'All orders this month',
			value: 'Unlocked',
			color: 'bg-violet-500',
		},
		{
			icon: Crown,
			title: 'VIP Access',
			description: 'Early sale access',
			value: 'Active',
			color: 'bg-emerald-500',
		},
	];

	const tierBenefits = ['2x Points', 'Free Shipping', 'Early Access', 'Member Discounts'];

	const activities = [
		{ label: 'Order Complete', points: 250, date: 'Today' },
		{ label: 'Review Written', points: 50, date: 'Yesterday' },
		{ label: 'Birthday Bonus', points: 100, date: 'Jan 5' },
	];

	return (
		<section className="@container min-h-screen py-12 @md:py-16 @xl:py-20">
			<div className="mx-auto max-w-5xl px-4 @sm:px-6 @2xl:px-8 space-y-8">
				<PageHeader orderNumber="ORD-78432" pointsEarned={250} />

				<PointsBalanceCard
					available={3250}
					pending={250}
					nextReward={5000}
					progress={65}
				/>

				<div className="grid @sm:grid-cols-2 @lg:grid-cols-4 gap-4">
					{rewards.map((reward, i) => (
						<RewardCard key={i} {...reward} />
					))}
				</div>

				<div className="grid @lg:grid-cols-2 gap-6">
					<TierCard
						tierName="Gold"
						progress={65}
						pointsNeeded={1750}
						benefits={tierBenefits}
					/>
					<ActivityCard activities={activities} />
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
