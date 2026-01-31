import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import {
	Card,
	CardContent,
} from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import {
	Award,
	ChevronRight,
	Crown,
	Diamond,
	Flame,
	Gift,
	Medal,
	Star,
	Target,
	Trophy,
	Zap,
} from 'lucide-react';
import Link from 'next/link';

const GamificationHeader = ({
	src,
	fallback,
	name,
	level,
	xp,
	maxXp,
	rank,
}: {
	src: string;
	fallback: string;
	name: string;
	level: number;
	xp: number;
	maxXp: number;
	rank: string;
}) => (
	<div className="relative bg-gradient-to-br from-primary/20 via-background to-accent/10 p-6 rounded-xl">
		<div className="flex items-center gap-4">
			<div className="relative">
				<Avatar className="size-20 ring-4 ring-primary/30">
					<AvatarImage src={src} alt={name} />
					<AvatarFallback className="bg-primary text-primary-foreground text-xl">
						{fallback}
					</AvatarFallback>
				</Avatar>
				<div className="absolute -bottom-1 -right-1 bg-primary text-primary-foreground text-xs font-bold rounded-full size-7 flex items-center justify-center ring-2 ring-background">
					{level}
				</div>
			</div>
			<div className="flex-1">
				<div className="flex items-center gap-2 mb-1">
					<h2 className="text-lg font-bold">{name}</h2>
					<Badge className="gap-1 bg-gradient-to-r from-amber-500 to-orange-500 text-white border-0">
						<Crown className="size-3" />
						{rank}
					</Badge>
				</div>
				<div className="space-y-1">
					<div className="flex justify-between text-xs">
						<span>Level {level}</span>
						<span>{xp}/{maxXp} XP</span>
					</div>
					<Progress value={(xp / maxXp) * 100} className="h-2" />
				</div>
			</div>
		</div>
	</div>
);

const DailyStreak = ({
	streak,
	reward,
}: {
	streak: number;
	reward: string;
}) => (
	<div className="flex items-center justify-between p-4 bg-gradient-to-r from-orange-500/10 to-red-500/10 rounded-lg border border-orange-500/20">
		<div className="flex items-center gap-3">
			<div className="p-2 bg-orange-500/20 rounded-lg">
				<Flame className="size-5 text-orange-500" />
			</div>
			<div>
				<p className="font-semibold">{streak} Day Streak!</p>
				<p className="text-xs text-muted-foreground">Keep shopping to earn more</p>
			</div>
		</div>
		<Badge variant="secondary" className="bg-orange-500/20 text-orange-600 border-orange-500/30">
			{reward}
		</Badge>
	</div>
);

const Achievements = ({
	items,
}: {
	items: { icon: React.ElementType; label: string; progress: number; color: string }[];
}) => (
	<div className="space-y-3">
		<div className="flex items-center justify-between">
			<h3 className="font-medium">Achievements</h3>
			<Button variant="ghost" size="sm" className="text-xs gap-1" asChild>
				<Link href="/achievements">
					View All <ChevronRight className="size-3" />
				</Link>
			</Button>
		</div>
		<div className="grid grid-cols-3 gap-3">
			{items.map((achievement, i) => (
				<div
					key={i}
					className={`flex flex-col items-center gap-2 p-3 rounded-lg border transition-all ${
						achievement.progress >= 100
							? 'bg-primary/10 border-primary/30'
							: 'bg-muted/30 border-transparent'
					}`}
				>
					<div className={`p-2 rounded-lg ${achievement.color}`}>
						<achievement.icon className="size-5" />
					</div>
					<span className="text-xs text-center font-medium">{achievement.label}</span>
					{achievement.progress < 100 && (
						<Progress value={achievement.progress} className="h-1 w-full" />
					)}
				</div>
			))}
		</div>
	</div>
);

const Leaderboard = ({
	rank,
	topUsers,
}: {
	rank: number;
	topUsers: { name: string; points: string; avatar: string }[];
}) => (
	<div className="space-y-3">
		<div className="flex items-center justify-between">
			<h3 className="font-medium">Leaderboard</h3>
			<Badge variant="outline">Your Rank: #{rank}</Badge>
		</div>
		<div className="space-y-2">
			{topUsers.map((user, i) => (
				<div
					key={i}
					className="flex items-center gap-3 p-2 rounded-lg hover:bg-muted/50 transition-colors"
				>
					<span className="text-sm font-bold text-muted-foreground w-4">
						{i + 1}
					</span>
					<Avatar className="size-8">
						<AvatarImage src={user.avatar} alt={user.name} />
						<AvatarFallback className="text-xs">{user.name[0]}</AvatarFallback>
					</Avatar>
					<span className="flex-1 text-sm font-medium">{user.name}</span>
					<span className="text-sm text-muted-foreground">{user.points}</span>
				</div>
			))}
		</div>
	</div>
);

export default function Main() {
	const profileData = {
		header: {
			src: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=400&h=400&fit=crop&crop=face',
			fallback: 'JC',
			name: 'Jessica Chen',
			level: 24,
			xp: 7500,
			maxXp: 10000,
			rank: 'Diamond',
		},
		streak: {
			streak: 14,
			reward: '+50 XP',
		},
		achievements: [
			{ icon: Trophy, label: 'First Buy', progress: 100, color: 'bg-amber-500/20 text-amber-500' },
			{ icon: Star, label: 'Reviewer', progress: 100, color: 'bg-blue-500/20 text-blue-500' },
			{ icon: Gift, label: 'Gifter', progress: 75, color: 'bg-pink-500/20 text-pink-500' },
			{ icon: Zap, label: 'Flash Buyer', progress: 100, color: 'bg-purple-500/20 text-purple-500' },
			{ icon: Target, label: 'Collector', progress: 60, color: 'bg-green-500/20 text-green-500' },
			{ icon: Diamond, label: 'Premium', progress: 40, color: 'bg-cyan-500/20 text-cyan-500' },
		],
		leaderboard: {
			rank: 42,
			topUsers: [
				{ name: 'Alex Thompson', points: '45.2k', avatar: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=100' },
				{ name: 'Maria Garcia', points: '42.8k', avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100' },
				{ name: 'James Wilson', points: '39.5k', avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100' },
			],
		},
	};

	return (
		<section className="@container">
			<div className="mx-auto max-w-md px-4 @sm:px-6 @lg:px-8 py-8 @md:py-12">
				<Card className="overflow-hidden p-0">
					<CardContent className="p-4 space-y-4">
						<GamificationHeader {...profileData.header} />
						<DailyStreak {...profileData.streak} />
						<Achievements items={profileData.achievements} />
						<Leaderboard {...profileData.leaderboard} />
					</CardContent>
				</Card>
			</div>
		</section>
	);
}
