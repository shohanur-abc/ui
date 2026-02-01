import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import {
	Gift,
	Star,
	Crown,
	ArrowRight,
	Sparkles,
	Trophy,
	Zap,
} from 'lucide-react';
import Link from 'next/link';

interface RewardTierProps {
	name: string;
	icon: React.ElementType;
	pointsRequired: number;
	achieved: boolean;
	current: boolean;
}

interface BenefitProps {
	icon: React.ElementType;
	title: string;
	description: string;
}

interface CTAProps {
	items: {
		label: string;
		href: string;
		variant?: 'default' | 'outline' | 'ghost';
		icon?: React.ElementType;
	}[];
}

const RewardsBanner = ({ points, tier }: { points: number; tier: string }) => (
	<div className="relative h-full min-h-[350px] @lg:min-h-0 bg-gradient-to-br from-amber-500 via-amber-600 to-orange-600 flex items-center justify-center overflow-hidden">
		<div className="absolute inset-0">
			<div className="absolute top-1/4 left-1/4 size-32 rounded-full bg-white/10 blur-3xl" />
			<div className="absolute bottom-1/4 right-1/4 size-48 rounded-full bg-yellow-300/20 blur-3xl" />
		</div>
		<div className="relative text-center text-white p-8">
			<div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/20 backdrop-blur-sm mb-6">
				<Crown className="size-5" />
				<span className="font-medium">{tier} Member</span>
			</div>
			<div className="flex items-center justify-center gap-2 mb-2">
				<Sparkles className="size-8" />
				<span className="text-5xl @xl:text-6xl font-bold">+{points}</span>
			</div>
			<p className="text-xl text-white/80">Points Earned!</p>
		</div>
	</div>
);

const Title = ({ text }: { text: string }) => (
	<h1 className="text-2xl @xl:text-3xl font-bold">{text}</h1>
);

const OrderSummary = ({
	orderNumber,
	total,
	pointsEarned,
	currency,
}: {
	orderNumber: string;
	total: number;
	pointsEarned: number;
	currency: string;
}) => (
	<div className="p-4 rounded-xl bg-muted/50 border space-y-3">
		<div className="flex justify-between items-center">
			<span className="text-sm text-muted-foreground">Order</span>
			<span className="font-mono font-semibold">{orderNumber}</span>
		</div>
		<div className="flex justify-between items-center">
			<span className="text-sm text-muted-foreground">Total Spent</span>
			<span className="font-semibold">
				{currency}
				{total.toFixed(2)}
			</span>
		</div>
		<Separator />
		<div className="flex justify-between items-center">
			<span className="text-sm font-medium">Points Earned</span>
			<Badge className="bg-amber-500/10 text-amber-600 border-0 gap-1">
				<Star className="size-3 fill-current" />+{pointsEarned}
			</Badge>
		</div>
	</div>
);

const RewardTier = ({
	name,
	icon: Icon,
	pointsRequired,
	achieved,
	current,
}: RewardTierProps) => (
	<div
		className={`relative p-3 rounded-xl text-center transition-colors ${current ? 'bg-amber-500/10 border-2 border-amber-500' : achieved ? 'bg-muted/50' : 'bg-muted/30 opacity-50'}`}
	>
		{current && (
			<Badge className="absolute -top-2 left-1/2 -translate-x-1/2 bg-amber-500">
				Current
			</Badge>
		)}
		<Icon
			className={`size-6 mx-auto mb-2 ${current || achieved ? 'text-amber-500' : 'text-muted-foreground'}`}
		/>
		<p className={`font-medium text-sm ${current ? 'text-amber-600' : ''}`}>
			{name}
		</p>
		<p className="text-xs text-muted-foreground">{pointsRequired} pts</p>
	</div>
);

const RewardsTiers = ({ tiers }: { tiers: RewardTierProps[] }) => (
	<div className="space-y-3">
		<h3 className="font-semibold text-sm">Your Rewards Journey</h3>
		<div className="grid grid-cols-4 gap-2">
			{tiers.map((tier, i) => (
				<RewardTier key={i} {...tier} />
			))}
		</div>
	</div>
);

const Benefit = ({ icon: Icon, title, description }: BenefitProps) => (
	<div className="flex items-start gap-3 p-3 rounded-lg bg-muted/30">
		<div className="size-8 rounded-lg bg-primary/10 flex items-center justify-center shrink-0">
			<Icon className="size-4 text-primary" />
		</div>
		<div>
			<p className="font-medium text-sm">{title}</p>
			<p className="text-xs text-muted-foreground">{description}</p>
		</div>
	</div>
);

const UnlockedBenefits = ({ benefits }: { benefits: BenefitProps[] }) => (
	<Card>
		<CardContent className="pt-6 space-y-3">
			<div className="flex items-center gap-2">
				<Trophy className="size-5 text-amber-500" />
				<h3 className="font-semibold">Your Benefits</h3>
			</div>
			<div className="space-y-2">
				{benefits.map((benefit, i) => (
					<Benefit key={i} {...benefit} />
				))}
			</div>
		</CardContent>
	</Card>
);

const NextReward = ({
	pointsToGo,
	reward,
}: {
	pointsToGo: number;
	reward: string;
}) => (
	<div className="p-4 rounded-xl bg-gradient-to-r from-amber-500/10 to-orange-500/10 border border-amber-500/20">
		<div className="flex items-center gap-3">
			<Zap className="size-6 text-amber-500" />
			<div>
				<p className="font-medium">
					{pointsToGo} points away from {reward}
				</p>
				<p className="text-sm text-muted-foreground">
					Keep shopping to unlock your next reward!
				</p>
			</div>
		</div>
	</div>
);

const CTA = ({ items }: CTAProps) => (
	<div className="flex gap-3">
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
	const rewardTiers: RewardTierProps[] = [
		{
			name: 'Bronze',
			icon: Star,
			pointsRequired: 0,
			achieved: true,
			current: false,
		},
		{
			name: 'Silver',
			icon: Star,
			pointsRequired: 500,
			achieved: true,
			current: false,
		},
		{
			name: 'Gold',
			icon: Crown,
			pointsRequired: 1000,
			achieved: true,
			current: true,
		},
		{
			name: 'Platinum',
			icon: Trophy,
			pointsRequired: 2500,
			achieved: false,
			current: false,
		},
	];

	const benefits: BenefitProps[] = [
		{
			icon: Gift,
			title: 'Birthday Bonus',
			description: 'Double points on your birthday',
		},
		{ icon: Zap, title: 'Early Access', description: 'Shop sales 24h early' },
		{
			icon: Star,
			title: 'Free Shipping',
			description: 'On all orders over $50',
		},
	];

	return (
		<section className="@container min-h-screen py-12 @md:py-16 @xl:py-20">
			<div className="mx-auto max-w-6xl px-4 @sm:px-6 @2xl:px-8">
				<div className="grid @lg:grid-cols-2 gap-0 rounded-2xl overflow-hidden border">
					<RewardsBanner points={250} tier="Gold" />

					<div className="p-6 @lg:p-8 space-y-6">
						<Title text="Order Complete! Here's Your Reward" />

						<OrderSummary
							orderNumber="ORD-2024-78432"
							total={249.99}
							pointsEarned={250}
							currency="$"
						/>

						<RewardsTiers tiers={rewardTiers} />

						<UnlockedBenefits benefits={benefits} />

						<NextReward pointsToGo={750} reward="Platinum Status" />

						<CTA
							items={[
								{ label: 'View Rewards', href: '/rewards', icon: ArrowRight },
								{ label: 'Track Order', href: '/track', variant: 'outline' },
							]}
						/>
					</div>
				</div>
			</div>
		</section>
	);
}
