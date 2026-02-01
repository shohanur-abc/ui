import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import {
	Award,
	ChevronRight,
	Crown,
	Gift,
	ShoppingCart,
	Star,
	Ticket,
	Trophy,
	Zap,
} from 'lucide-react';
import Link from 'next/link';

const ProfileCard = ({
	src,
	fallback,
	name,
	email,
	tier,
	tierColor,
}: {
	src: string;
	fallback: string;
	name: string;
	email: string;
	tier: string;
	tierColor: string;
}) => (
	<div className="relative overflow-hidden rounded-xl bg-gradient-to-br from-primary/20 via-primary/10 to-accent/20 p-6">
		<div className="absolute top-0 right-0 w-32 h-32 bg-primary/10 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2" />
		<div className="relative flex flex-col items-center text-center space-y-4">
			<Avatar className="size-20 ring-4 ring-background shadow-lg">
				<AvatarImage src={src} alt={name} />
				<AvatarFallback className="bg-primary text-primary-foreground text-xl">
					{fallback}
				</AvatarFallback>
			</Avatar>
			<div>
				<h2 className="text-lg font-bold">{name}</h2>
				<p className="text-sm text-muted-foreground">{email}</p>
			</div>
			<Badge className={`gap-1 ${tierColor}`}>
				<Crown className="size-3" />
				{tier}
			</Badge>
		</div>
	</div>
);

const LoyaltyCard = ({
	points,
	maxPoints,
	nextTier,
	rewards,
}: {
	points: number;
	maxPoints: number;
	nextTier: string;
	rewards: number;
}) => (
	<div className="space-y-4 p-4 rounded-xl bg-muted/30">
		<div className="flex items-center justify-between">
			<div className="flex items-center gap-2">
				<Trophy className="size-5 text-amber-500" />
				<span className="font-medium">Loyalty Points</span>
			</div>
			<span className="text-2xl font-bold">{points.toLocaleString()}</span>
		</div>
		<div className="space-y-2">
			<Progress value={(points / maxPoints) * 100} className="h-3" />
			<div className="flex justify-between text-xs text-muted-foreground">
				<span>{rewards} rewards available</span>
				<span>
					{(maxPoints - points).toLocaleString()} pts to {nextTier}
				</span>
			</div>
		</div>
	</div>
);

const QuickLinks = ({
	items,
}: {
	items: {
		icon: React.ElementType;
		label: string;
		description: string;
		href: string;
		badge?: string;
	}[];
}) => (
	<div className="space-y-2">
		{items.map((link, i) => (
			<Link
				key={i}
				href={link.href}
				className="flex items-center gap-3 p-3 rounded-lg hover:bg-muted/50 transition-colors group"
			>
				<div className="p-2 rounded-lg bg-muted group-hover:bg-primary/10 transition-colors">
					<link.icon className="size-5 text-muted-foreground group-hover:text-primary transition-colors" />
				</div>
				<div className="flex-1">
					<div className="flex items-center gap-2">
						<span className="font-medium">{link.label}</span>
						{link.badge && (
							<Badge variant="secondary" className="text-xs">
								{link.badge}
							</Badge>
						)}
					</div>
					<p className="text-sm text-muted-foreground">{link.description}</p>
				</div>
				<ChevronRight className="size-5 text-muted-foreground" />
			</Link>
		))}
	</div>
);

export default function Main() {
	const profileData = {
		profile: {
			src: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=400&h=400&fit=crop&crop=face',
			fallback: 'SW',
			name: 'Sophia Williams',
			email: 'sophia.w@example.com',
			tier: 'Gold Member',
			tierColor:
				'bg-gradient-to-r from-amber-500 to-orange-500 text-white border-0',
		},
		loyalty: {
			points: 12500,
			maxPoints: 20000,
			nextTier: 'Platinum',
			rewards: 3,
		},
		quickLinks: [
			{
				icon: ShoppingCart,
				label: 'My Orders',
				description: 'Track and manage orders',
				href: '/orders',
				badge: '2 Active',
			},
			{
				icon: Gift,
				label: 'Rewards',
				description: 'Redeem your points',
				href: '/rewards',
				badge: '3 New',
			},
			{
				icon: Ticket,
				label: 'Coupons',
				description: 'View available discounts',
				href: '/coupons',
				badge: '5',
			},
			{
				icon: Star,
				label: 'Reviews',
				description: 'Manage your reviews',
				href: '/reviews',
			},
		],
	};

	return (
		<section className="@container">
			<div className="mx-auto max-w-4xl px-4 @sm:px-6 @lg:px-8 py-8 @md:py-12">
				<Card>
					<CardContent className="p-6">
						<div className="grid @lg:grid-cols-[300px_1fr] gap-6">
							<div className="space-y-4">
								<ProfileCard {...profileData.profile} />
								<LoyaltyCard {...profileData.loyalty} />
							</div>
							<div>
								<h3 className="text-sm font-medium text-muted-foreground uppercase tracking-wider mb-4">
									Quick Access
								</h3>
								<QuickLinks items={profileData.quickLinks} />
							</div>
						</div>
					</CardContent>
				</Card>
			</div>
		</section>
	);
}
