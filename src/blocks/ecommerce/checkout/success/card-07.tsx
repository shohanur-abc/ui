import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import {
	Trophy,
	Star,
	Crown,
	ArrowRight,
	Gift,
	Zap,
	Heart,
} from 'lucide-react';
import Link from 'next/link';

interface MembershipTierProps {
	tier: string;
	points: number;
	nextTier: string;
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

const MembershipCard = ({
	tier,
	points,
	memberSince,
	avatar,
	name,
}: {
	tier: string;
	points: number;
	memberSince: string;
	avatar?: string;
	name: string;
}) => (
	<Card className="bg-gradient-to-br from-amber-500 via-amber-400 to-yellow-500 text-amber-950 overflow-hidden">
		<div className="absolute top-0 right-0 size-32 bg-white/10 rounded-full -translate-y-1/2 translate-x-1/2" />
		<CardContent className="pt-6 relative">
			<div className="flex items-center gap-4">
				<Avatar className="size-16 border-2 border-amber-950/20">
					<AvatarImage src={avatar} />
					<AvatarFallback className="bg-amber-950/10 text-amber-950 font-bold">
						{name.charAt(0)}
					</AvatarFallback>
				</Avatar>
				<div className="flex-1">
					<p className="font-bold text-xl">{name}</p>
					<div className="flex items-center gap-2 mt-1">
						<Crown className="size-4" />
						<span className="font-medium">{tier} Member</span>
					</div>
				</div>
			</div>
			<Separator className="my-4 bg-amber-950/20" />
			<div className="flex items-center justify-between text-sm">
				<div>
					<p className="opacity-70">Points Balance</p>
					<p className="font-bold text-2xl">{points.toLocaleString()}</p>
				</div>
				<div className="text-right">
					<p className="opacity-70">Member Since</p>
					<p className="font-semibold">{memberSince}</p>
				</div>
			</div>
		</CardContent>
	</Card>
);

const SuccessCard = ({
	orderNumber,
	total,
	currency,
	pointsEarned,
}: {
	orderNumber: string;
	total: number;
	currency: string;
	pointsEarned: number;
}) => (
	<Card>
		<CardContent className="pt-6">
			<div className="flex items-center gap-4 mb-4">
				<div className="size-12 rounded-full bg-primary/10 flex items-center justify-center">
					<Trophy className="size-6 text-primary" />
				</div>
				<div>
					<h1 className="text-xl font-bold">Order Complete!</h1>
					<p className="text-muted-foreground text-sm">Order #{orderNumber}</p>
				</div>
			</div>
			<div className="grid grid-cols-2 gap-4">
				<div className="p-3 rounded-lg bg-muted/50">
					<p className="text-sm text-muted-foreground">Total Spent</p>
					<p className="font-bold text-lg">
						{currency}
						{total.toFixed(2)}
					</p>
				</div>
				<div className="p-3 rounded-lg bg-primary/10">
					<p className="text-sm text-muted-foreground">Points Earned</p>
					<p className="font-bold text-lg text-primary">+{pointsEarned}</p>
				</div>
			</div>
		</CardContent>
	</Card>
);

const BenefitItem = ({
	icon: Icon,
	title,
	description,
}: {
	icon: React.ElementType;
	title: string;
	description: string;
}) => (
	<div className="flex items-start gap-3">
		<div className="size-10 rounded-lg bg-primary/10 flex items-center justify-center shrink-0">
			<Icon className="size-5 text-primary" />
		</div>
		<div>
			<p className="font-medium">{title}</p>
			<p className="text-sm text-muted-foreground">{description}</p>
		</div>
	</div>
);

const TierBenefitsCard = () => (
	<Card>
		<CardHeader>
			<CardTitle className="text-base">Your Gold Benefits</CardTitle>
		</CardHeader>
		<CardContent className="space-y-4">
			<BenefitItem
				icon={Star}
				title="2x Points on All Purchases"
				description="Earn double points on every order"
			/>
			<BenefitItem
				icon={Gift}
				title="Free Shipping"
				description="Unlimited free shipping on all orders"
			/>
			<BenefitItem
				icon={Zap}
				title="Early Access"
				description="Shop new arrivals 24 hours early"
			/>
		</CardContent>
	</Card>
);

const TierProgressCard = ({
	currentPoints,
	nextTierPoints,
	nextTier,
}: {
	currentPoints: number;
	nextTierPoints: number;
	nextTier: string;
}) => {
	const progress = (currentPoints / nextTierPoints) * 100;
	const pointsNeeded = nextTierPoints - currentPoints;

	return (
		<Card className="bg-muted/30">
			<CardContent className="pt-6">
				<div className="flex items-center justify-between mb-3">
					<p className="font-medium">Next: {nextTier}</p>
					<Badge variant="outline">{pointsNeeded} pts to go</Badge>
				</div>
				<div className="h-3 rounded-full bg-muted overflow-hidden">
					<div
						className="h-full bg-gradient-to-r from-amber-500 to-yellow-500 rounded-full transition-all"
						style={{ width: `${progress}%` }}
					/>
				</div>
				<p className="text-xs text-muted-foreground mt-2 text-center">
					{currentPoints.toLocaleString()} / {nextTierPoints.toLocaleString()}{' '}
					points
				</p>
			</CardContent>
		</Card>
	);
};

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
	return (
		<section className="@container min-h-screen py-12 @md:py-16 @xl:py-20">
			<div className="mx-auto max-w-2xl px-4 @sm:px-6 @2xl:px-8 space-y-6">
				<MembershipCard
					tier="Gold"
					points={8750}
					memberSince="Jan 2023"
					name="John Doe"
				/>

				<SuccessCard
					orderNumber="ORD-2024-78432"
					total={299.99}
					currency="$"
					pointsEarned={600}
				/>

				<TierBenefitsCard />

				<TierProgressCard
					currentPoints={8750}
					nextTierPoints={10000}
					nextTier="Platinum"
				/>

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
