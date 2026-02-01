import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { Separator } from '@/components/ui/separator';
import {
	Award,
	ChevronRight,
	Crown,
	Gift,
	Heart,
	LogOut,
	Package,
	Settings,
	Sparkles,
	Star,
	Trophy,
	User,
	Wallet,
	Zap,
} from 'lucide-react';
import Link from 'next/link';

const LoyaltySidebar = ({
	src,
	fallback,
	name,
	tier,
	tierIcon: TierIcon,
	tierGradient,
	points,
	nextTierPoints,
	nextTier,
}: {
	src: string;
	fallback: string;
	name: string;
	tier: string;
	tierIcon: React.ElementType;
	tierGradient: string;
	points: number;
	nextTierPoints: number;
	nextTier: string;
}) => (
	<div className="space-y-6">
		<div className="text-center">
			<div className="relative inline-block">
				<Avatar className="size-20 ring-4 ring-border">
					<AvatarImage src={src} alt={name} />
					<AvatarFallback className="bg-primary text-primary-foreground text-xl">
						{fallback}
					</AvatarFallback>
				</Avatar>
				<div
					className={`absolute -bottom-2 -right-2 p-1.5 rounded-full ${tierGradient}`}
				>
					<TierIcon className="size-4 text-white" />
				</div>
			</div>
			<h2 className="font-bold mt-4">{name}</h2>
			<Badge className={`mt-1 ${tierGradient} text-white border-0`}>
				{tier} Member
			</Badge>
		</div>
		<div className="p-4 rounded-xl bg-gradient-to-br from-primary/10 to-accent/10">
			<div className="flex items-center justify-between mb-2">
				<span className="text-sm">Points</span>
				<span className="font-bold">{points.toLocaleString()}</span>
			</div>
			<Progress value={(points / nextTierPoints) * 100} className="h-2" />
			<p className="text-xs text-muted-foreground mt-2">
				{(nextTierPoints - points).toLocaleString()} pts to {nextTier}
			</p>
		</div>
	</div>
);

const QuickLinks = ({
	links,
}: {
	links: {
		icon: React.ElementType;
		label: string;
		href: string;
		badge?: string;
	}[];
}) => (
	<div className="space-y-1">
		{links.map((link, i) => (
			<Link
				key={i}
				href={link.href}
				className="flex items-center gap-3 px-3 py-2.5 rounded-lg hover:bg-muted transition-colors group"
			>
				<link.icon className="size-5 text-muted-foreground group-hover:text-foreground" />
				<span className="flex-1 text-sm">{link.label}</span>
				{link.badge && <Badge variant="secondary">{link.badge}</Badge>}
				<ChevronRight className="size-4 text-muted-foreground opacity-0 group-hover:opacity-100" />
			</Link>
		))}
	</div>
);

const RewardsCards = ({
	rewards,
}: {
	rewards: {
		icon: React.ElementType;
		title: string;
		description: string;
		points: number;
		available: boolean;
	}[];
}) => (
	<div className="grid @md:grid-cols-2 gap-4">
		{rewards.map((reward, i) => (
			<Card key={i} className={!reward.available ? 'opacity-50' : ''}>
				<CardContent className="p-4 space-y-3">
					<div className="flex items-start justify-between">
						<div className="p-2 rounded-lg bg-primary/10">
							<reward.icon className="size-5 text-primary" />
						</div>
						<Badge variant={reward.available ? 'default' : 'secondary'}>
							{reward.points} pts
						</Badge>
					</div>
					<div>
						<h4 className="font-medium">{reward.title}</h4>
						<p className="text-sm text-muted-foreground">
							{reward.description}
						</p>
					</div>
					<Button size="sm" className="w-full" disabled={!reward.available}>
						{reward.available ? 'Redeem' : 'Not Enough Points'}
					</Button>
				</CardContent>
			</Card>
		))}
	</div>
);

const AchievementsList = ({
	achievements,
}: {
	achievements: {
		icon: React.ElementType;
		title: string;
		earned: boolean;
		progress?: number;
	}[];
}) => (
	<Card>
		<CardHeader className="pb-3">
			<div className="flex items-center justify-between">
				<h3 className="font-semibold flex items-center gap-2">
					<Trophy className="size-5 text-amber-500" />
					Achievements
				</h3>
				<Button variant="ghost" size="sm" asChild>
					<Link href="/achievements">View All</Link>
				</Button>
			</div>
		</CardHeader>
		<CardContent className="space-y-3">
			{achievements.map((achievement, i) => (
				<div key={i} className="flex items-center gap-3">
					<div
						className={`p-2 rounded-lg ${achievement.earned ? 'bg-amber-500/20' : 'bg-muted'}`}
					>
						<achievement.icon
							className={`size-5 ${achievement.earned ? 'text-amber-500' : 'text-muted-foreground'}`}
						/>
					</div>
					<div className="flex-1">
						<p
							className={`text-sm font-medium ${!achievement.earned && 'text-muted-foreground'}`}
						>
							{achievement.title}
						</p>
						{achievement.progress !== undefined && !achievement.earned && (
							<Progress value={achievement.progress} className="h-1 mt-1" />
						)}
					</div>
					{achievement.earned && (
						<Badge className="bg-green-500/20 text-green-600">Earned</Badge>
					)}
				</div>
			))}
		</CardContent>
	</Card>
);

export default function Main() {
	const profileData = {
		sidebar: {
			src: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=400&h=400&fit=crop&crop=face',
			fallback: 'SL',
			name: 'Sarah Lopez',
			tier: 'Gold',
			tierIcon: Crown,
			tierGradient: 'bg-gradient-to-r from-amber-500 to-orange-500',
			points: 7500,
			nextTierPoints: 10000,
			nextTier: 'Platinum',
		},
		quickLinks: [
			{ icon: Package, label: 'Orders', href: '/orders', badge: '2' },
			{ icon: Heart, label: 'Wishlist', href: '/wishlist' },
			{ icon: User, label: 'Profile', href: '/profile' },
			{ icon: Settings, label: 'Settings', href: '/settings' },
		],
		rewards: [
			{
				icon: Gift,
				title: '$10 Off',
				description: 'On your next order',
				points: 1000,
				available: true,
			},
			{
				icon: Sparkles,
				title: 'Free Shipping',
				description: 'One-time use',
				points: 500,
				available: true,
			},
			{
				icon: Star,
				title: '20% Off',
				description: 'On selected items',
				points: 2000,
				available: true,
			},
			{
				icon: Zap,
				title: 'VIP Access',
				description: 'Early sale access',
				points: 5000,
				available: true,
			},
		],
		achievements: [
			{ icon: Package, title: 'First Order', earned: true },
			{ icon: Star, title: 'First Review', earned: true },
			{ icon: Award, title: '10 Orders', earned: false, progress: 70 },
			{ icon: Trophy, title: 'Top Reviewer', earned: false, progress: 30 },
		],
	};

	return (
		<section className="@container">
			<div className="mx-auto max-w-6xl px-4 @sm:px-6 @lg:px-8 py-8 @md:py-12">
				<div className="flex flex-col @lg:flex-row gap-8">
					<aside className="w-full @lg:w-72 shrink-0">
						<Card className="sticky top-4">
							<CardContent className="p-6 space-y-6">
								<LoyaltySidebar {...profileData.sidebar} />
								<Separator />
								<QuickLinks links={profileData.quickLinks} />
								<Separator />
								<Button
									variant="ghost"
									className="w-full justify-start gap-3 text-destructive hover:text-destructive"
								>
									<LogOut className="size-5" />
									Sign Out
								</Button>
							</CardContent>
						</Card>
					</aside>
					<div className="flex-1 space-y-6">
						<div>
							<h1 className="text-2xl font-bold">Rewards Center</h1>
							<p className="text-muted-foreground">
								Redeem points for exclusive rewards
							</p>
						</div>
						<RewardsCards rewards={profileData.rewards} />
						<AchievementsList achievements={profileData.achievements} />
					</div>
				</div>
			</div>
		</section>
	);
}
