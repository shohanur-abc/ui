import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import {
	Award,
	Calendar,
	Clock,
	Crown,
	Gamepad2,
	Gift,
	Heart,
	Medal,
	MessageSquare,
	Plus,
	Settings,
	Shield,
	Star,
	Sword,
	Target,
	Trophy,
	Users,
	Zap,
} from 'lucide-react';
import Image from 'next/image';

const GamerProfileCard = ({
	src,
	fallback,
	username,
	tagline,
	level,
	xp,
	nextLevelXp,
	rank,
}: {
	src: string;
	fallback: string;
	username: string;
	tagline: string;
	level: number;
	xp: number;
	nextLevelXp: number;
	rank: string;
}) => (
	<Card className="col-span-full @lg:col-span-2 row-span-2 bg-gradient-to-br from-purple-500/20 to-pink-500/20 border-purple-500/30">
		<CardContent className="p-6 h-full flex flex-col">
			<div className="flex items-start justify-between">
				<div className="relative">
					<Avatar className="size-20 ring-4 ring-purple-500">
						<AvatarImage src={src} alt={username} />
						<AvatarFallback className="text-xl bg-purple-500 text-white">
							{fallback}
						</AvatarFallback>
					</Avatar>
					<div className="absolute -bottom-1 -right-1 bg-amber-500 text-white text-xs font-bold size-7 rounded-full flex items-center justify-center border-2 border-background">
						{level}
					</div>
				</div>
				<Badge className="bg-gradient-to-r from-amber-500 to-orange-500 text-white gap-1">
					<Crown className="size-3" />
					{rank}
				</Badge>
			</div>
			<div className="flex-1 mt-4">
				<h1 className="text-2xl font-bold">{username}</h1>
				<p className="text-muted-foreground">{tagline}</p>
				<div className="mt-4">
					<div className="flex items-center justify-between text-sm mb-1">
						<span>Level {level}</span>
						<span className="text-muted-foreground">
							{xp.toLocaleString()} / {nextLevelXp.toLocaleString()} XP
						</span>
					</div>
					<Progress
						value={(xp / nextLevelXp) * 100}
						className="h-3 bg-purple-500/20"
					/>
				</div>
			</div>
			<div className="flex gap-2 mt-4">
				<Button className="flex-1 bg-purple-500 hover:bg-purple-600">
					<Gamepad2 className="size-4 mr-2" />
					Play Now
				</Button>
				<Button variant="outline" size="icon">
					<Settings className="size-4" />
				</Button>
			</div>
		</CardContent>
	</Card>
);

const StatCard = ({
	icon: Icon,
	label,
	value,
	color,
	bgColor,
}: {
	icon: React.ElementType;
	label: string;
	value: string;
	color: string;
	bgColor: string;
}) => (
	<Card className={bgColor}>
		<CardContent className="p-4">
			<Icon className={`size-6 ${color} mb-2`} />
			<p className="text-2xl font-bold">{value}</p>
			<p className="text-xs text-muted-foreground">{label}</p>
		</CardContent>
	</Card>
);

const RankedStatsCard = ({
	mode,
	rank,
	points,
	wins,
	losses,
	winRate,
}: {
	mode: string;
	rank: string;
	points: number;
	wins: number;
	losses: number;
	winRate: number;
}) => (
	<Card className="col-span-2">
		<CardContent className="p-4">
			<div className="flex items-center justify-between mb-3">
				<div className="flex items-center gap-2">
					<Trophy className="size-5 text-amber-500" />
					<span className="font-semibold">{mode}</span>
				</div>
				<Badge className="bg-gradient-to-r from-amber-500 to-orange-500 text-white">
					{rank}
				</Badge>
			</div>
			<div className="grid grid-cols-4 gap-2 text-center">
				<div>
					<p className="text-xl font-bold">{points}</p>
					<p className="text-xs text-muted-foreground">Points</p>
				</div>
				<div>
					<p className="text-xl font-bold text-green-500">{wins}</p>
					<p className="text-xs text-muted-foreground">Wins</p>
				</div>
				<div>
					<p className="text-xl font-bold text-red-500">{losses}</p>
					<p className="text-xs text-muted-foreground">Losses</p>
				</div>
				<div>
					<p className="text-xl font-bold">{winRate}%</p>
					<p className="text-xs text-muted-foreground">Win Rate</p>
				</div>
			</div>
		</CardContent>
	</Card>
);

const AchievementCard = ({
	name,
	description,
	icon,
	rarity,
	unlockedDate,
}: {
	name: string;
	description: string;
	icon: string;
	rarity: 'common' | 'rare' | 'epic' | 'legendary';
	unlockedDate: string;
}) => {
	const rarityColors = {
		common: 'border-gray-500/30 bg-gray-500/5',
		rare: 'border-blue-500/30 bg-blue-500/5',
		epic: 'border-purple-500/30 bg-purple-500/5',
		legendary: 'border-amber-500/30 bg-amber-500/5',
	};
	const rarityBadge = {
		common: 'bg-gray-500/20 text-gray-400',
		rare: 'bg-blue-500/20 text-blue-400',
		epic: 'bg-purple-500/20 text-purple-400',
		legendary: 'bg-amber-500/20 text-amber-400',
	};

	return (
		<Card className={rarityColors[rarity]}>
			<CardContent className="p-4">
				<div className="flex items-start gap-3">
					<span className="text-3xl">{icon}</span>
					<div className="flex-1 min-w-0">
						<div className="flex items-center gap-2">
							<p className="font-medium truncate">{name}</p>
							<Badge className={`${rarityBadge[rarity]} text-xs`}>
								{rarity}
							</Badge>
						</div>
						<p className="text-xs text-muted-foreground mt-1">{description}</p>
						<p className="text-xs text-muted-foreground mt-1">{unlockedDate}</p>
					</div>
				</div>
			</CardContent>
		</Card>
	);
};

const FriendsCard = ({
	friends,
	onlineCount,
}: {
	friends: {
		name: string;
		avatar: string;
		status: 'online' | 'in-game' | 'offline';
		game?: string;
	}[];
	onlineCount: number;
}) => (
	<Card className="col-span-2">
		<CardHeader className="pb-2">
			<div className="flex items-center justify-between">
				<h3 className="font-semibold flex items-center gap-2">
					<Users className="size-5" />
					Friends
					<Badge variant="secondary">{onlineCount} online</Badge>
				</h3>
				<Button variant="ghost" size="icon">
					<Plus className="size-4" />
				</Button>
			</div>
		</CardHeader>
		<CardContent className="space-y-2">
			{friends.map((friend, i) => (
				<div
					key={i}
					className="flex items-center gap-3 p-2 rounded-lg hover:bg-muted/50 transition-colors"
				>
					<div className="relative">
						<Avatar className="size-10">
							<AvatarImage src={friend.avatar} />
							<AvatarFallback>{friend.name[0]}</AvatarFallback>
						</Avatar>
						<div
							className={`absolute bottom-0 right-0 size-3 rounded-full border-2 border-background ${
								friend.status === 'online'
									? 'bg-green-500'
									: friend.status === 'in-game'
										? 'bg-blue-500'
										: 'bg-gray-500'
							}`}
						/>
					</div>
					<div className="flex-1 min-w-0">
						<p className="font-medium text-sm">{friend.name}</p>
						<p className="text-xs text-muted-foreground">
							{friend.status === 'in-game'
								? `Playing ${friend.game}`
								: friend.status}
						</p>
					</div>
					{friend.status !== 'offline' && (
						<Button variant="ghost" size="sm">
							Join
						</Button>
					)}
				</div>
			))}
		</CardContent>
	</Card>
);

const RecentMatchCard = ({
	game,
	result,
	kda,
	duration,
	timeAgo,
}: {
	game: string;
	result: 'victory' | 'defeat';
	kda: string;
	duration: string;
	timeAgo: string;
}) => (
	<Card
		className={
			result === 'victory' ? 'border-green-500/30' : 'border-red-500/30'
		}
	>
		<CardContent className="p-4">
			<div className="flex items-center justify-between mb-2">
				<span className="text-sm font-medium">{game}</span>
				<Badge
					className={
						result === 'victory'
							? 'bg-green-500/20 text-green-500'
							: 'bg-red-500/20 text-red-500'
					}
				>
					{result}
				</Badge>
			</div>
			<p className="text-lg font-bold">{kda}</p>
			<div className="flex items-center gap-2 text-xs text-muted-foreground mt-1">
				<Clock className="size-3" />
				{duration} • {timeAgo}
			</div>
		</CardContent>
	</Card>
);

const InventoryCard = ({
	items,
}: {
	items: { name: string; rarity: string; icon: string }[];
}) => (
	<Card className="col-span-2">
		<CardHeader className="pb-2">
			<div className="flex items-center justify-between">
				<h3 className="font-semibold flex items-center gap-2">
					<Gift className="size-5" />
					Recent Items
				</h3>
				<Button variant="ghost" size="sm">
					View All
				</Button>
			</div>
		</CardHeader>
		<CardContent>
			<div className="flex gap-3">
				{items.map((item, i) => (
					<div
						key={i}
						className="flex flex-col items-center p-3 rounded-lg bg-muted/30 hover:bg-muted/50 transition-colors cursor-pointer"
					>
						<span className="text-3xl">{item.icon}</span>
						<p className="text-xs font-medium mt-1 truncate w-16 text-center">
							{item.name}
						</p>
						<Badge variant="outline" className="text-xs mt-1">
							{item.rarity}
						</Badge>
					</div>
				))}
			</div>
		</CardContent>
	</Card>
);

export default function Main() {
	const profileData = {
		user: {
			src: 'https://images.unsplash.com/photo-1568602471122-7832951cc4c5?w=200',
			fallback: 'SN',
			username: 'ShadowNinja',
			tagline: 'Fear the shadows',
			level: 87,
			xp: 45200,
			nextLevelXp: 50000,
			rank: 'Diamond',
		},
		stats: [
			{
				icon: Sword,
				label: 'Matches',
				value: '1,247',
				color: 'text-red-500',
				bgColor: 'bg-red-500/5',
			},
			{
				icon: Trophy,
				label: 'Victories',
				value: '723',
				color: 'text-amber-500',
				bgColor: 'bg-amber-500/5',
			},
			{
				icon: Target,
				label: 'K/D Ratio',
				value: '2.4',
				color: 'text-blue-500',
				bgColor: 'bg-blue-500/5',
			},
			{
				icon: Clock,
				label: 'Play Time',
				value: '842h',
				color: 'text-purple-500',
				bgColor: 'bg-purple-500/5',
			},
		],
		rankedStats: {
			mode: 'Competitive',
			rank: 'Diamond III',
			points: 2847,
			wins: 156,
			losses: 89,
			winRate: 64,
		},
		achievements: [
			{
				name: 'First Blood',
				description: 'Get the first kill in 100 matches',
				icon: '🩸',
				rarity: 'rare' as const,
				unlockedDate: 'Jan 15, 2024',
			},
			{
				name: 'Untouchable',
				description: 'Win a match without dying',
				icon: '🛡️',
				rarity: 'legendary' as const,
				unlockedDate: 'Jan 10, 2024',
			},
		],
		friends: [
			{
				name: 'DragonSlayer',
				avatar: 'https://i.pravatar.cc/40?img=11',
				status: 'in-game' as const,
				game: 'Valorant',
			},
			{
				name: 'NightHawk',
				avatar: 'https://i.pravatar.cc/40?img=12',
				status: 'online' as const,
			},
			{
				name: 'PhoenixRise',
				avatar: 'https://i.pravatar.cc/40?img=13',
				status: 'offline' as const,
			},
		],
		onlineCount: 5,
		recentMatches: [
			{
				game: 'Ranked',
				result: 'victory' as const,
				kda: '24 / 8 / 12',
				duration: '34m',
				timeAgo: '2h ago',
			},
			{
				game: 'Quick Play',
				result: 'defeat' as const,
				kda: '15 / 14 / 9',
				duration: '28m',
				timeAgo: '4h ago',
			},
		],
		inventory: [
			{ name: 'Dragon Blade', rarity: 'Legendary', icon: '⚔️' },
			{ name: 'Phoenix Wings', rarity: 'Epic', icon: '🔥' },
			{ name: 'Shadow Cloak', rarity: 'Rare', icon: '🧥' },
		],
	};

	return (
		<section className="@container">
			<div className="mx-auto max-w-4xl px-4 @sm:px-6 @lg:px-8 py-8 @md:py-12">
				<div className="grid grid-cols-2 @lg:grid-cols-4 gap-4">
					<GamerProfileCard {...profileData.user} />
					{profileData.stats.map((stat, i) => (
						<StatCard key={i} {...stat} />
					))}
					<RankedStatsCard {...profileData.rankedStats} />
					{profileData.achievements.map((achievement, i) => (
						<AchievementCard key={i} {...achievement} />
					))}
					<FriendsCard
						friends={profileData.friends}
						onlineCount={profileData.onlineCount}
					/>
					{profileData.recentMatches.map((match, i) => (
						<RecentMatchCard key={i} {...match} />
					))}
					<InventoryCard items={profileData.inventory} />
				</div>
			</div>
		</section>
	);
}
