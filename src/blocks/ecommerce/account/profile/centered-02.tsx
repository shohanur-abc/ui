import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { Separator } from '@/components/ui/separator';
import {
	Award,
	ChevronRight,
	Crown,
	Gift,
	Heart,
	Package,
	Settings,
	Shield,
	Sparkles,
	Star,
	Truck,
} from 'lucide-react';
import Link from 'next/link';

const ProfileHeader = ({
	src,
	fallback,
	name,
	tier,
	tierIcon: TierIcon,
	points,
	pointsToNext,
	nextTier,
}: {
	src: string;
	fallback: string;
	name: string;
	tier: string;
	tierIcon: React.ElementType;
	points: number;
	pointsToNext: number;
	nextTier: string;
}) => (
	<div className="text-center space-y-4">
		<div className="relative inline-block">
			<Avatar className="size-28 ring-4 ring-primary/20 shadow-lg">
				<AvatarImage src={src} alt={name} />
				<AvatarFallback className="bg-primary text-primary-foreground text-3xl">
					{fallback}
				</AvatarFallback>
			</Avatar>
			<div className="absolute -bottom-2 left-1/2 -translate-x-1/2 bg-gradient-to-r from-amber-500 to-orange-500 text-white px-3 py-1 rounded-full text-xs font-semibold flex items-center gap-1 shadow-lg">
				<TierIcon className="size-3" />
				{tier}
			</div>
		</div>
		<div>
			<h1 className="text-2xl font-bold">{name}</h1>
			<p className="text-muted-foreground">{points.toLocaleString()} loyalty points</p>
		</div>
		<div className="max-w-xs mx-auto space-y-2">
			<div className="flex justify-between text-sm">
				<span>Progress to {nextTier}</span>
				<span className="text-muted-foreground">{pointsToNext} pts left</span>
			</div>
			<Progress value={75} className="h-2" />
		</div>
	</div>
);

const BenefitsList = ({
	items,
}: {
	items: { icon: React.ElementType; title: string; description: string }[];
}) => (
	<div className="space-y-4">
		<h3 className="text-center font-semibold">Your Benefits</h3>
		<div className="grid gap-3">
			{items.map((benefit, i) => (
				<div
					key={i}
					className="flex items-center gap-4 p-4 rounded-xl bg-gradient-to-r from-muted/50 to-muted/30 hover:from-muted to-muted/50 transition-colors"
				>
					<div className="p-2 rounded-lg bg-primary/10">
						<benefit.icon className="size-5 text-primary" />
					</div>
					<div className="flex-1">
						<p className="font-medium">{benefit.title}</p>
						<p className="text-sm text-muted-foreground">{benefit.description}</p>
					</div>
					<ChevronRight className="size-5 text-muted-foreground" />
				</div>
			))}
		</div>
	</div>
);

const QuickStats = ({
	items,
}: {
	items: { icon: React.ElementType; value: string; label: string }[];
}) => (
	<div className="grid grid-cols-3 gap-4 text-center">
		{items.map((stat, i) => (
			<div key={i} className="p-4 rounded-xl bg-muted/30">
				<stat.icon className="size-5 mx-auto mb-2 text-muted-foreground" />
				<p className="text-xl font-bold">{stat.value}</p>
				<p className="text-xs text-muted-foreground">{stat.label}</p>
			</div>
		))}
	</div>
);

const ActionButtons = () => (
	<div className="flex flex-col @sm:flex-row gap-3 justify-center">
		<Button className="gap-2" asChild>
			<Link href="/rewards/redeem">
				<Gift className="size-4" />
				Redeem Points
			</Link>
		</Button>
		<Button variant="outline" className="gap-2" asChild>
			<Link href="/settings">
				<Settings className="size-4" />
				Settings
			</Link>
		</Button>
	</div>
);

export default function Main() {
	const profileData = {
		header: {
			src: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=400&h=400&fit=crop&crop=face',
			fallback: 'SL',
			name: 'Sarah Lopez',
			tier: 'Gold',
			tierIcon: Crown,
			points: 7850,
			pointsToNext: 2150,
			nextTier: 'Platinum',
		},
		benefits: [
			{ icon: Truck, title: 'Free Shipping', description: 'On all orders over $25' },
			{ icon: Sparkles, title: '10% Discount', description: 'On all purchases' },
			{ icon: Gift, title: 'Birthday Gift', description: '2x points in your birthday month' },
		],
		stats: [
			{ icon: Package, value: '89', label: 'Orders' },
			{ icon: Heart, value: '23', label: 'Wishlist' },
			{ icon: Star, value: '41', label: 'Reviews' },
		],
	};

	return (
		<section className="@container">
			<div className="mx-auto max-w-lg px-4 @sm:px-6 @lg:px-8 py-12 @md:py-16">
				<div className="bg-gradient-to-b from-background via-muted/20 to-background rounded-3xl border shadow-lg p-8 space-y-8">
					<ProfileHeader {...profileData.header} />
					<Separator />
					<BenefitsList items={profileData.benefits} />
					<Separator />
					<QuickStats items={profileData.stats} />
					<ActionButtons />
				</div>
			</div>
		</section>
	);
}
