import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import {
	Card,
	CardContent,
	CardHeader,
} from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import {
	Award,
	CreditCard,
	Gift,
	Heart,
	Package,
	Star,
	TrendingUp,
} from 'lucide-react';
import Link from 'next/link';

const ProfileHeader = ({
	src,
	fallback,
	name,
	tier,
	tierColor,
}: {
	src: string;
	fallback: string;
	name: string;
	tier: string;
	tierColor: string;
}) => (
	<div className="flex items-center gap-4">
		<Avatar className="size-16 @md:size-20 ring-2 ring-border">
			<AvatarImage src={src} alt={name} />
			<AvatarFallback className="bg-primary text-primary-foreground text-lg">
				{fallback}
			</AvatarFallback>
		</Avatar>
		<div className="flex-1 min-w-0">
			<h2 className="text-lg @md:text-xl font-semibold truncate">{name}</h2>
			<Badge className={tierColor}>{tier}</Badge>
		</div>
	</div>
);

const LoyaltyProgress = ({
	points,
	maxPoints,
	nextTier,
}: {
	points: number;
	maxPoints: number;
	nextTier: string;
}) => (
	<div className="space-y-2">
		<div className="flex justify-between text-sm">
			<span className="text-muted-foreground">Loyalty Points</span>
			<span className="font-semibold">{points.toLocaleString()} pts</span>
		</div>
		<Progress value={(points / maxPoints) * 100} className="h-2" />
		<p className="text-xs text-muted-foreground text-right">
			{(maxPoints - points).toLocaleString()} pts to {nextTier}
		</p>
	</div>
);

const QuickStats = ({
	items,
}: {
	items: { icon: React.ElementType; label: string; value: string; color: string }[];
}) => (
	<div className="grid grid-cols-2 gap-3">
		{items.map((item, i) => (
			<div
				key={i}
				className="flex items-center gap-3 p-3 rounded-lg bg-muted/50 hover:bg-muted transition-colors"
			>
				<div className={`p-2 rounded-md ${item.color}`}>
					<item.icon className="size-4" />
				</div>
				<div>
					<p className="text-sm font-medium">{item.value}</p>
					<p className="text-xs text-muted-foreground">{item.label}</p>
				</div>
			</div>
		))}
	</div>
);

const QuickActions = ({
	items,
}: {
	items: { label: string; href: string; icon: React.ElementType }[];
}) => (
	<div className="grid grid-cols-4 gap-2">
		{items.map((action, i) => (
			<Button
				key={i}
				variant="ghost"
				size="sm"
				className="flex-col h-auto py-3 gap-1"
				asChild
			>
				<Link href={action.href}>
					<action.icon className="size-5" />
					<span className="text-xs">{action.label}</span>
				</Link>
			</Button>
		))}
	</div>
);

export default function Main() {
	const profileData = {
		avatar: {
			src: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=400&h=400&fit=crop&crop=face',
			fallback: 'SJ',
			name: 'Sarah Johnson',
			tier: 'Gold Member',
			tierColor: 'bg-amber-500/20 text-amber-600 border-amber-500/30',
		},
		loyalty: {
			points: 7500,
			maxPoints: 10000,
			nextTier: 'Platinum',
		},
		stats: [
			{ icon: Package, label: 'Orders', value: '156', color: 'bg-blue-500/20 text-blue-600' },
			{ icon: Heart, label: 'Wishlist', value: '28', color: 'bg-pink-500/20 text-pink-600' },
			{ icon: Star, label: 'Reviews', value: '42', color: 'bg-yellow-500/20 text-yellow-600' },
			{ icon: TrendingUp, label: 'Spent', value: '$4.2k', color: 'bg-green-500/20 text-green-600' },
		],
		actions: [
			{ label: 'Orders', href: '/orders', icon: Package },
			{ label: 'Wishlist', href: '/wishlist', icon: Heart },
			{ label: 'Rewards', href: '/rewards', icon: Gift },
			{ label: 'Payment', href: '/payment', icon: CreditCard },
		],
	};

	return (
		<section className="@container">
			<div className="mx-auto max-w-md px-4 @sm:px-6 @lg:px-8 py-8 @md:py-12">
				<Card>
					<CardHeader>
						<ProfileHeader {...profileData.avatar} />
					</CardHeader>
					<CardContent className="space-y-6">
						<LoyaltyProgress {...profileData.loyalty} />
						<QuickStats items={profileData.stats} />
						<QuickActions items={profileData.actions} />
					</CardContent>
				</Card>
			</div>
		</section>
	);
}
