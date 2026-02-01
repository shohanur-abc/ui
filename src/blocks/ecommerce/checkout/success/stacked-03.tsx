import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import {
	PartyPopper,
	Gift,
	Star,
	ArrowRight,
	Sparkles,
	Trophy,
	Crown,
} from 'lucide-react';
import Link from 'next/link';

interface RewardProps {
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

const CelebrationHeader = ({ orderNumber }: { orderNumber: string }) => (
	<div className="text-center space-y-4">
		<div className="relative inline-block">
			<div className="size-24 rounded-full bg-gradient-to-br from-amber-400 via-yellow-400 to-orange-400 flex items-center justify-center mx-auto shadow-lg shadow-amber-500/25">
				<PartyPopper className="size-12 text-white" />
			</div>
			<div className="absolute -top-2 -right-2 size-8 rounded-full bg-primary flex items-center justify-center">
				<Sparkles className="size-4 text-primary-foreground" />
			</div>
		</div>
		<div>
			<h1 className="text-2xl @sm:text-3xl @lg:text-4xl font-bold bg-gradient-to-r from-amber-500 via-yellow-500 to-orange-500 bg-clip-text text-transparent">
				Congratulations!
			</h1>
			<p className="text-muted-foreground mt-2">
				Order #{orderNumber} is complete. Here's what you earned!
			</p>
		</div>
	</div>
);

const RewardCard = ({
	icon: Icon,
	title,
	description,
	value,
	color,
}: RewardProps) => (
	<div className={`p-6 rounded-2xl ${color}`}>
		<div className="flex items-center gap-4">
			<div className="size-14 rounded-xl bg-white/20 backdrop-blur-sm flex items-center justify-center">
				<Icon className="size-7" />
			</div>
			<div className="flex-1">
				<p className="font-semibold text-lg">{title}</p>
				<p className="text-sm opacity-80">{description}</p>
			</div>
			<Badge className="bg-white/20 backdrop-blur-sm text-current border-0 text-lg font-bold px-4 py-1">
				{value}
			</Badge>
		</div>
	</div>
);

const RewardsSection = ({ rewards }: { rewards: RewardProps[] }) => (
	<div className="space-y-4">
		<h2 className="font-semibold text-lg text-center">Your Rewards</h2>
		<div className="space-y-3">
			{rewards.map((reward, i) => (
				<RewardCard key={i} {...reward} />
			))}
		</div>
	</div>
);

const LevelProgress = ({
	currentLevel,
	nextLevel,
	progress,
	pointsToNext,
}: {
	currentLevel: string;
	nextLevel: string;
	progress: number;
	pointsToNext: number;
}) => (
	<div className="p-6 rounded-2xl bg-gradient-to-r from-slate-100 to-slate-50 dark:from-slate-900 dark:to-slate-800">
		<div className="flex items-center justify-between mb-4">
			<div className="flex items-center gap-2">
				<Crown className="size-5 text-amber-500" />
				<span className="font-semibold">{currentLevel}</span>
			</div>
			<span className="text-sm text-muted-foreground">
				{pointsToNext} pts to {nextLevel}
			</span>
		</div>
		<div className="h-4 rounded-full bg-muted overflow-hidden">
			<div
				className="h-full bg-gradient-to-r from-amber-400 to-yellow-400 rounded-full transition-all"
				style={{ width: `${progress}%` }}
			/>
		</div>
	</div>
);

const BonusOffer = ({
	title,
	description,
	code,
	validUntil,
}: {
	title: string;
	description: string;
	code: string;
	validUntil: string;
}) => (
	<div className="p-6 rounded-2xl border-2 border-dashed border-primary/30 bg-primary/5">
		<div className="flex items-start gap-4">
			<div className="size-12 rounded-xl bg-primary/10 flex items-center justify-center shrink-0">
				<Gift className="size-6 text-primary" />
			</div>
			<div className="flex-1">
				<p className="font-semibold">{title}</p>
				<p className="text-sm text-muted-foreground mt-1">{description}</p>
				<div className="flex items-center gap-3 mt-3">
					<code className="px-3 py-1.5 rounded-lg bg-primary/10 font-mono font-bold text-primary">
						{code}
					</code>
					<span className="text-xs text-muted-foreground">
						Valid until {validUntil}
					</span>
				</div>
			</div>
		</div>
	</div>
);

const OrderTotal = ({
	total,
	currency,
	savings,
}: {
	total: number;
	currency: string;
	savings: number;
}) => (
	<div className="p-6 rounded-2xl bg-muted/30">
		<div className="flex items-center justify-between">
			<div>
				<p className="text-sm text-muted-foreground">Order Total</p>
				<p className="text-2xl font-bold">
					{currency}
					{total.toFixed(2)}
				</p>
			</div>
			<Badge
				variant="secondary"
				className="text-emerald-600 bg-emerald-100 dark:bg-emerald-900/30"
			>
				Saved {currency}
				{savings.toFixed(2)}
			</Badge>
		</div>
	</div>
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
			icon: Star,
			title: 'Points Earned',
			description: 'Added to your rewards balance',
			value: '+500',
			color: 'bg-gradient-to-r from-violet-500 to-purple-500 text-white',
		},
		{
			icon: Trophy,
			title: 'Achievement Unlocked',
			description: 'First purchase of the year!',
			value: '🏆',
			color: 'bg-gradient-to-r from-amber-500 to-yellow-500 text-amber-950',
		},
	];

	return (
		<section className="@container min-h-screen py-12 @md:py-16 @xl:py-20">
			<div className="mx-auto max-w-2xl px-4 @sm:px-6 @2xl:px-8 space-y-8">
				<CelebrationHeader orderNumber="ORD-2024-78432" />

				<RewardsSection rewards={rewards} />

				<Separator />

				<LevelProgress
					currentLevel="Gold Member"
					nextLevel="Platinum"
					progress={75}
					pointsToNext={1250}
				/>

				<BonusOffer
					title="Exclusive Member Discount"
					description="Enjoy 20% off your next purchase as a thank you!"
					code="THANKYOU20"
					validUntil="Feb 15, 2024"
				/>

				<OrderTotal total={249.99} currency="$" savings={62.5} />

				<CTA
					items={[
						{ label: 'View Rewards', href: '/rewards', icon: Gift },
						{
							label: 'Track Order',
							href: '/track',
							variant: 'outline',
							icon: ArrowRight,
						},
					]}
				/>
			</div>
		</section>
	);
}
