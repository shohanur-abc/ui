import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { Separator } from '@/components/ui/separator';
import {
	Award,
	BarChart3,
	Camera,
	Check,
	ChevronRight,
	Crown,
	Diamond,
	Gift,
	Heart,
	Medal,
	Sparkles,
	Star,
	TrendingUp,
	Trophy,
	Zap,
} from 'lucide-react';
import Link from 'next/link';

const PremiumHeader = ({
	src,
	fallback,
	name,
	tier,
	tierIcon: TierIcon,
	nextTier,
	progress,
	benefits,
}: {
	src: string;
	fallback: string;
	name: string;
	tier: string;
	tierIcon: React.ElementType;
	nextTier: string;
	progress: number;
	benefits: number;
}) => (
	<div className="relative">
		<div className="absolute inset-0 bg-gradient-to-b from-amber-500/20 via-primary/10 to-transparent rounded-t-2xl -mx-6 -mt-6 h-40" />
		<div className="relative text-center space-y-4 pt-8">
			<div className="relative inline-block">
				<Avatar className="size-28 ring-4 ring-amber-500/30 shadow-2xl">
					<AvatarImage src={src} alt={name} />
					<AvatarFallback className="bg-gradient-to-br from-amber-500 to-orange-500 text-white text-3xl">
						{fallback}
					</AvatarFallback>
				</Avatar>
				<div className="absolute -bottom-2 -right-2 p-2 bg-gradient-to-br from-amber-400 to-amber-600 rounded-full shadow-lg">
					<TierIcon className="size-5 text-white" />
				</div>
			</div>
			<div>
				<h1 className="text-2xl font-bold">{name}</h1>
				<Badge className="mt-2 bg-gradient-to-r from-amber-500 to-orange-500 text-white border-0 px-4 py-1">
					<Sparkles className="size-3 mr-1" />
					{tier} Member
				</Badge>
			</div>
			<div className="max-w-xs mx-auto space-y-2">
				<div className="flex justify-between text-sm">
					<span className="flex items-center gap-1">
						<Diamond className="size-4 text-cyan-500" />
						{nextTier}
					</span>
					<span className="text-muted-foreground">{progress}%</span>
				</div>
				<Progress
					value={progress}
					className="h-2 [&>div]:bg-gradient-to-r [&>div]:from-amber-500 [&>div]:to-cyan-500"
				/>
			</div>
			<p className="text-sm text-muted-foreground">
				Enjoying{' '}
				<span className="font-semibold text-foreground">{benefits}</span>{' '}
				premium benefits
			</p>
		</div>
	</div>
);

const MembershipPerks = ({
	perks,
}: {
	perks: { icon: React.ElementType; title: string; active: boolean }[];
}) => (
	<div className="space-y-4">
		<h3 className="font-semibold text-center">Your Perks</h3>
		<div className="grid grid-cols-2 gap-3">
			{perks.map((perk, i) => (
				<div
					key={i}
					className={`p-4 rounded-xl text-center transition-all ${
						perk.active
							? 'bg-gradient-to-br from-primary/10 to-accent/10 border border-primary/20'
							: 'bg-muted/30 opacity-50'
					}`}
				>
					<perk.icon
						className={`size-6 mx-auto mb-2 ${perk.active ? 'text-primary' : 'text-muted-foreground'}`}
					/>
					<p className="text-sm font-medium">{perk.title}</p>
					{perk.active && (
						<Badge
							variant="outline"
							className="mt-2 text-xs border-green-500/30 text-green-600"
						>
							<Check className="size-3 mr-1" />
							Active
						</Badge>
					)}
				</div>
			))}
		</div>
	</div>
);

const LifetimeStats = ({
	items,
}: {
	items: { label: string; value: string }[];
}) => (
	<div className="space-y-4">
		<h3 className="font-semibold text-center flex items-center justify-center gap-2">
			<BarChart3 className="size-5 text-muted-foreground" />
			Lifetime Stats
		</h3>
		<div className="grid grid-cols-2 gap-3">
			{items.map((stat, i) => (
				<div key={i} className="p-3 rounded-lg bg-muted/30 text-center">
					<p className="text-xl font-bold">{stat.value}</p>
					<p className="text-xs text-muted-foreground">{stat.label}</p>
				</div>
			))}
		</div>
	</div>
);

const UpgradeCard = ({
	nextTier,
	benefits,
	price,
}: {
	nextTier: string;
	benefits: string[];
	price: string;
}) => (
	<div className="p-4 rounded-xl bg-gradient-to-br from-cyan-500/10 via-blue-500/10 to-purple-500/10 border border-cyan-500/20 space-y-4">
		<div className="flex items-center justify-between">
			<div className="flex items-center gap-2">
				<Diamond className="size-5 text-cyan-500" />
				<span className="font-semibold">Upgrade to {nextTier}</span>
			</div>
			<Badge className="bg-cyan-500/20 text-cyan-600">{price}/yr</Badge>
		</div>
		<div className="space-y-2">
			{benefits.map((benefit, i) => (
				<div key={i} className="flex items-center gap-2 text-sm">
					<Check className="size-4 text-green-500" />
					<span>{benefit}</span>
				</div>
			))}
		</div>
		<Button className="w-full bg-gradient-to-r from-cyan-500 to-blue-500 hover:from-cyan-600 hover:to-blue-600">
			Upgrade Now
		</Button>
	</div>
);

export default function Main() {
	const profileData = {
		header: {
			src: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=400&fit=crop&crop=face',
			fallback: 'DK',
			name: 'David Kim',
			tier: 'Platinum',
			tierIcon: Crown,
			nextTier: 'Diamond',
			progress: 78,
			benefits: 12,
		},
		perks: [
			{ icon: Zap, title: 'Priority Access', active: true },
			{ icon: Gift, title: 'Free Gifts', active: true },
			{ icon: TrendingUp, title: '2x Points', active: true },
			{ icon: Heart, title: 'Exclusive Sales', active: true },
			{ icon: Medal, title: 'VIP Events', active: false },
			{ icon: Trophy, title: 'Concierge', active: false },
		],
		stats: [
			{ label: 'Total Spent', value: '$12,450' },
			{ label: 'Points Earned', value: '124,500' },
			{ label: 'Orders', value: '87' },
			{ label: 'Years Member', value: '3' },
		],
		upgrade: {
			nextTier: 'Diamond',
			benefits: [
				'Personal shopping concierge',
				'VIP event invitations',
				'5x points on all purchases',
				'Free international shipping',
			],
			price: '$199',
		},
	};

	return (
		<section className="@container">
			<div className="mx-auto max-w-md px-4 @sm:px-6 py-8 @md:py-12">
				<Card className="overflow-hidden">
					<CardContent className="p-6 space-y-6">
						<PremiumHeader {...profileData.header} />
						<Separator />
						<MembershipPerks perks={profileData.perks} />
						<Separator />
						<LifetimeStats items={profileData.stats} />
						<UpgradeCard {...profileData.upgrade} />
					</CardContent>
				</Card>
			</div>
		</section>
	);
}
