import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import {
	Award,
	ChevronRight,
	Flame,
	Gift,
	Heart,
	Medal,
	Package,
	ShoppingBag,
	Sparkles,
	Star,
	Target,
	Trophy,
	Zap,
} from 'lucide-react';
import Link from 'next/link';

const GamifiedHeader = ({
	src,
	fallback,
	name,
	level,
	xp,
	maxXp,
	rank,
	streak,
}: {
	src: string;
	fallback: string;
	name: string;
	level: number;
	xp: number;
	maxXp: number;
	rank: string;
	streak: number;
}) => (
	<div className="relative text-center">
		<div className="absolute inset-x-0 top-0 h-32 bg-gradient-to-b from-primary/20 to-transparent rounded-t-2xl" />
		<div className="relative pt-8 space-y-4">
			<div className="relative inline-block">
				<Avatar className="size-24 ring-4 ring-primary/30 shadow-xl">
					<AvatarImage src={src} alt={name} />
					<AvatarFallback className="bg-primary text-primary-foreground text-2xl">
						{fallback}
					</AvatarFallback>
				</Avatar>
				<div className="absolute -bottom-2 -right-2 bg-gradient-to-br from-amber-400 to-orange-500 text-white font-bold text-sm rounded-full size-10 flex items-center justify-center ring-4 ring-background shadow-lg">
					{level}
				</div>
			</div>
			<div>
				<h1 className="text-xl font-bold">{name}</h1>
				<Badge className="mt-1 bg-gradient-to-r from-amber-500/20 to-orange-500/20 text-amber-600 border-amber-500/30">
					<Medal className="size-3 mr-1" />
					{rank}
				</Badge>
			</div>
			<div className="flex items-center justify-center gap-4">
				<div className="flex items-center gap-1 text-orange-500">
					<Flame className="size-5" />
					<span className="font-bold">{streak}</span>
					<span className="text-sm text-muted-foreground">day streak</span>
				</div>
			</div>
			<div className="max-w-xs mx-auto space-y-2 px-4">
				<div className="flex justify-between text-sm">
					<span className="flex items-center gap-1">
						<Zap className="size-4 text-amber-500" />
						Level {level}
					</span>
					<span className="text-muted-foreground">{xp}/{maxXp} XP</span>
				</div>
				<Progress value={(xp / maxXp) * 100} className="h-3 [&>div]:bg-gradient-to-r [&>div]:from-amber-500 [&>div]:to-orange-500" />
			</div>
		</div>
	</div>
);

const AchievementShowcase = ({
	achievements,
	total,
}: {
	achievements: { icon: React.ElementType; name: string; color: string }[];
	total: number;
}) => (
	<div className="space-y-4">
		<div className="flex items-center justify-between">
			<h3 className="font-semibold flex items-center gap-2">
				<Trophy className="size-5 text-amber-500" />
				Achievements
			</h3>
			<Badge variant="outline">{achievements.length}/{total}</Badge>
		</div>
		<div className="flex justify-center gap-3">
			{achievements.map((achievement, i) => (
				<div
					key={i}
					className={`p-3 rounded-xl ${achievement.color} shadow-md hover:scale-110 transition-transform cursor-pointer`}
					title={achievement.name}
				>
					<achievement.icon className="size-6" />
				</div>
			))}
		</div>
		<Button variant="ghost" size="sm" className="w-full text-xs" asChild>
			<Link href="/achievements">
				View All Achievements <ChevronRight className="size-4 ml-1" />
			</Link>
		</Button>
	</div>
);

const StatsGrid = ({
	items,
}: {
	items: { icon: React.ElementType; value: string; label: string; xp: string }[];
}) => (
	<div className="grid grid-cols-2 gap-3">
		{items.map((stat, i) => (
			<div
				key={i}
				className="p-4 rounded-xl bg-muted/30 hover:bg-muted/50 transition-colors text-center"
			>
				<stat.icon className="size-6 mx-auto mb-2 text-muted-foreground" />
				<p className="text-xl font-bold">{stat.value}</p>
				<p className="text-sm text-muted-foreground">{stat.label}</p>
				<Badge variant="secondary" className="mt-2 text-xs">+{stat.xp} XP</Badge>
			</div>
		))}
	</div>
);

const DailyChallenge = ({
	title,
	progress,
	target,
	reward,
}: {
	title: string;
	progress: number;
	target: number;
	reward: string;
}) => (
	<div className="p-4 rounded-xl bg-gradient-to-r from-purple-500/10 to-pink-500/10 border border-purple-500/20 space-y-3">
		<div className="flex items-center justify-between">
			<div className="flex items-center gap-2">
				<Target className="size-5 text-purple-500" />
				<span className="font-medium text-sm">Daily Challenge</span>
			</div>
			<Badge className="bg-purple-500/20 text-purple-600">{reward}</Badge>
		</div>
		<p className="text-sm">{title}</p>
		<div className="space-y-1">
			<div className="flex justify-between text-xs">
				<span>Progress</span>
				<span>{progress}/{target}</span>
			</div>
			<Progress value={(progress / target) * 100} className="h-2 [&>div]:bg-purple-500" />
		</div>
	</div>
);

export default function Main() {
	const profileData = {
		header: {
			src: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=400&h=400&fit=crop&crop=face',
			fallback: 'TR',
			name: 'Tyler Roberts',
			level: 28,
			xp: 7500,
			maxXp: 10000,
			rank: 'Gold Shopper',
			streak: 14,
		},
		achievements: [
			{ icon: Star, name: 'First Review', color: 'bg-amber-500/20 text-amber-500' },
			{ icon: ShoppingBag, name: '10 Orders', color: 'bg-blue-500/20 text-blue-500' },
			{ icon: Heart, name: 'Wishlist Pro', color: 'bg-pink-500/20 text-pink-500' },
			{ icon: Award, name: 'Top Reviewer', color: 'bg-purple-500/20 text-purple-500' },
			{ icon: Flame, name: 'Week Streak', color: 'bg-orange-500/20 text-orange-500' },
		],
		totalAchievements: 24,
		stats: [
			{ icon: Package, value: '47', label: 'Orders', xp: '4700' },
			{ icon: Star, value: '23', label: 'Reviews', xp: '1150' },
			{ icon: Heart, value: '18', label: 'Wishlist', xp: '180' },
			{ icon: Gift, value: '5', label: 'Referrals', xp: '2500' },
		],
		challenge: {
			title: 'Write 2 product reviews today',
			progress: 1,
			target: 2,
			reward: '+100 XP',
		},
	};

	return (
		<section className="@container">
			<div className="mx-auto max-w-md px-4 @sm:px-6 py-8 @md:py-12">
				<Card className="overflow-hidden">
					<CardContent className="p-6 space-y-6">
						<GamifiedHeader {...profileData.header} />
						<AchievementShowcase
							achievements={profileData.achievements}
							total={profileData.totalAchievements}
						/>
						<StatsGrid items={profileData.stats} />
						<DailyChallenge {...profileData.challenge} />
						<Button className="w-full gap-2" asChild>
							<Link href="/rewards">
								<Sparkles className="size-4" />
								Claim Rewards
							</Link>
						</Button>
					</CardContent>
				</Card>
			</div>
		</section>
	);
}
