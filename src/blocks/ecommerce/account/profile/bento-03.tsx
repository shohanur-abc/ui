import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { Separator } from '@/components/ui/separator';
import {
	ArrowUpRight,
	BarChart3,
	Calendar,
	Clock,
	Flame,
	Heart,
	Package,
	ShoppingBag,
	Star,
	Target,
	TrendingUp,
	Trophy,
	Zap,
} from 'lucide-react';
import Link from 'next/link';

const ProfileHero = ({
	src,
	fallback,
	name,
	level,
	xp,
	maxXp,
}: {
	src: string;
	fallback: string;
	name: string;
	level: number;
	xp: number;
	maxXp: number;
}) => (
	<Card className="col-span-full bg-gradient-to-r from-primary/20 via-background to-accent/20">
		<CardContent className="p-6">
			<div className="flex flex-col @sm:flex-row @sm:items-center gap-4">
				<div className="relative">
					<Avatar className="size-20 ring-4 ring-primary/30">
						<AvatarImage src={src} alt={name} />
						<AvatarFallback className="bg-primary text-primary-foreground text-2xl">
							{fallback}
						</AvatarFallback>
					</Avatar>
					<div className="absolute -bottom-1 -right-1 bg-primary text-primary-foreground text-xs font-bold rounded-full size-7 flex items-center justify-center ring-2 ring-background">
						{level}
					</div>
				</div>
				<div className="flex-1">
					<h2 className="text-xl font-bold">{name}</h2>
					<div className="mt-2 space-y-1">
						<div className="flex justify-between text-sm">
							<span>Level {level}</span>
							<span className="text-muted-foreground">{xp.toLocaleString()}/{maxXp.toLocaleString()} XP</span>
						</div>
						<Progress value={(xp / maxXp) * 100} className="h-2" />
					</div>
				</div>
				<Button asChild>
					<Link href="/profile/edit">Edit Profile</Link>
				</Button>
			</div>
		</CardContent>
	</Card>
);

const StreakCard = ({
	streak,
	bestStreak,
	reward,
}: {
	streak: number;
	bestStreak: number;
	reward: string;
}) => (
	<Card className="bg-gradient-to-br from-orange-500/20 to-red-500/20">
		<CardContent className="p-4 space-y-3">
			<div className="flex items-center gap-2">
				<Flame className="size-6 text-orange-500" />
				<span className="font-semibold">{streak} Day Streak</span>
			</div>
			<div className="flex justify-between text-sm">
				<span className="text-muted-foreground">Best: {bestStreak} days</span>
				<Badge className="bg-orange-500/20 text-orange-600">{reward}</Badge>
			</div>
		</CardContent>
	</Card>
);

const AchievementsCard = ({
	items,
	total,
}: {
	items: { icon: React.ElementType; label: string; unlocked: boolean }[];
	total: number;
}) => (
	<Card className="row-span-2">
		<CardContent className="p-4 space-y-4">
			<div className="flex items-center justify-between">
				<div className="flex items-center gap-2">
					<Trophy className="size-5 text-amber-500" />
					<span className="font-medium">Achievements</span>
				</div>
				<Badge variant="outline">{items.filter(a => a.unlocked).length}/{total}</Badge>
			</div>
			<div className="grid grid-cols-3 gap-2">
				{items.map((achievement, i) => (
					<div
						key={i}
						className={`p-2 rounded-lg text-center transition-all ${
							achievement.unlocked
								? 'bg-primary/10'
								: 'bg-muted/30 opacity-50'
						}`}
					>
						<achievement.icon className={`size-5 mx-auto mb-1 ${achievement.unlocked ? 'text-primary' : 'text-muted-foreground'}`} />
						<p className="text-xs truncate">{achievement.label}</p>
					</div>
				))}
			</div>
			<Button variant="ghost" size="sm" className="w-full" asChild>
				<Link href="/achievements">View All</Link>
			</Button>
		</CardContent>
	</Card>
);

const StatsCard = ({
	items,
}: {
	items: { icon: React.ElementType; label: string; value: string; change: string; positive: boolean }[];
}) => (
	<Card className="col-span-full @lg:col-span-2">
		<CardContent className="p-4">
			<div className="flex items-center gap-2 mb-4">
				<BarChart3 className="size-5 text-muted-foreground" />
				<span className="font-medium">This Month</span>
			</div>
			<div className="grid grid-cols-2 @sm:grid-cols-4 gap-4">
				{items.map((stat, i) => (
					<div key={i} className="text-center">
						<stat.icon className="size-5 mx-auto mb-1 text-muted-foreground" />
						<p className="text-xl font-bold">{stat.value}</p>
						<p className="text-xs text-muted-foreground">{stat.label}</p>
						<div className={`flex items-center justify-center gap-1 text-xs mt-1 ${stat.positive ? 'text-green-500' : 'text-red-500'}`}>
							<TrendingUp className={`size-3 ${!stat.positive && 'rotate-180'}`} />
							{stat.change}
						</div>
					</div>
				))}
			</div>
		</CardContent>
	</Card>
);

const ChallengeCard = ({
	title,
	progress,
	target,
	reward,
	deadline,
}: {
	title: string;
	progress: number;
	target: number;
	reward: string;
	deadline: string;
}) => (
	<Card>
		<CardContent className="p-4 space-y-3">
			<div className="flex items-center gap-2">
				<Target className="size-5 text-purple-500" />
				<span className="font-medium text-sm">Challenge</span>
			</div>
			<div>
				<p className="text-sm font-medium">{title}</p>
				<div className="flex items-center gap-2 mt-2">
					<Progress value={(progress / target) * 100} className="flex-1 h-2" />
					<span className="text-xs font-medium">{progress}/{target}</span>
				</div>
			</div>
			<div className="flex items-center justify-between text-xs text-muted-foreground">
				<div className="flex items-center gap-1">
					<Clock className="size-3" />
					{deadline}
				</div>
				<Badge variant="secondary">{reward}</Badge>
			</div>
		</CardContent>
	</Card>
);

export default function Main() {
	const profileData = {
		hero: {
			src: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=400&h=400&fit=crop&crop=face',
			fallback: 'DL',
			name: 'Daniel Lee',
			level: 28,
			xp: 7200,
			maxXp: 10000,
		},
		streak: {
			streak: 14,
			bestStreak: 21,
			reward: '+2x XP',
		},
		achievements: {
			items: [
				{ icon: ShoppingBag, label: 'Shopper', unlocked: true },
				{ icon: Star, label: 'Reviewer', unlocked: true },
				{ icon: Heart, label: 'Collector', unlocked: true },
				{ icon: Zap, label: 'Speed', unlocked: true },
				{ icon: Trophy, label: 'Champion', unlocked: false },
				{ icon: Target, label: 'Focused', unlocked: false },
			],
			total: 24,
		},
		stats: [
			{ icon: ShoppingBag, label: 'Orders', value: '8', change: '+2', positive: true },
			{ icon: Star, label: 'Reviews', value: '5', change: '+3', positive: true },
			{ icon: Heart, label: 'Wishlist', value: '12', change: '+4', positive: true },
			{ icon: Zap, label: 'XP Earned', value: '2.4k', change: '+18%', positive: true },
		],
		challenge: {
			title: 'Complete 5 reviews this week',
			progress: 3,
			target: 5,
			reward: '+500 XP',
			deadline: '3 days left',
		},
	};

	return (
		<section className="@container">
			<div className="mx-auto max-w-4xl px-4 @sm:px-6 @lg:px-8 py-8 @md:py-12">
				<div className="grid grid-cols-1 @md:grid-cols-2 @lg:grid-cols-3 gap-4">
					<ProfileHero {...profileData.hero} />
					<StreakCard {...profileData.streak} />
					<ChallengeCard {...profileData.challenge} />
					<AchievementsCard {...profileData.achievements} />
					<StatsCard items={profileData.stats} />
				</div>
			</div>
		</section>
	);
}
