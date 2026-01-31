import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import {
	Award,
	Book,
	BookOpen,
	Calendar,
	Clock,
	Gamepad2,
	Gift,
	Heart,
	Medal,
	Mic,
	Music,
	Palette,
	Play,
	PlayCircle,
	Plus,
	Sparkles,
	Star,
	Trophy,
	Users,
	Zap,
} from 'lucide-react';
import Image from 'next/image';

const KidsHeader = ({
	src,
	fallback,
	name,
	age,
	level,
	coins,
}: {
	src: string;
	fallback: string;
	name: string;
	age: number;
	level: number;
	coins: number;
}) => (
	<Card className="bg-gradient-to-r from-pink-500/20 to-purple-500/20 border-2 border-pink-500/30">
		<CardContent className="p-6">
			<div className="flex flex-col @sm:flex-row items-center gap-6">
				<div className="relative">
					<Avatar className="size-24 ring-4 ring-pink-500">
						<AvatarImage src={src} alt={name} />
						<AvatarFallback className="text-2xl bg-pink-500 text-white">{fallback}</AvatarFallback>
					</Avatar>
					<div className="absolute -bottom-2 -right-2 bg-amber-500 text-white text-xs font-bold px-2 py-1 rounded-full">
						Lvl {level}
					</div>
				</div>
				<div className="text-center @sm:text-left flex-1">
					<h1 className="text-2xl font-bold">{name}</h1>
					<p className="text-muted-foreground">Age {age} • Explorer</p>
					<div className="flex items-center justify-center @sm:justify-start gap-4 mt-3">
						<div className="flex items-center gap-1 bg-amber-500/20 px-3 py-1 rounded-full">
							<span className="text-lg">🪙</span>
							<span className="font-bold text-amber-600">{coins}</span>
						</div>
						<div className="flex items-center gap-1 bg-purple-500/20 px-3 py-1 rounded-full">
							<Sparkles className="size-4 text-purple-500" />
							<span className="font-bold text-purple-600">Super Star!</span>
						</div>
					</div>
				</div>
			</div>
		</CardContent>
	</Card>
);

const DailyQuests = ({
	quests,
}: {
	quests: { title: string; reward: number; completed: boolean; icon: string }[];
}) => (
	<Card className="border-2 border-blue-500/30">
		<CardHeader className="pb-3">
			<div className="flex items-center gap-2">
				<span className="text-2xl">🎯</span>
				<h2 className="font-semibold">Today's Quests</h2>
			</div>
		</CardHeader>
		<CardContent className="space-y-3">
			{quests.map((quest, i) => (
				<div
					key={i}
					className={`flex items-center justify-between p-3 rounded-xl ${
						quest.completed ? 'bg-green-500/10' : 'bg-muted/50'
					}`}
				>
					<div className="flex items-center gap-3">
						<span className="text-2xl">{quest.icon}</span>
						<span className={quest.completed ? 'line-through text-muted-foreground' : 'font-medium'}>
							{quest.title}
						</span>
					</div>
					<div className="flex items-center gap-2">
						<span className="text-sm">+{quest.reward} 🪙</span>
						{quest.completed && <span className="text-green-500 text-xl">✓</span>}
					</div>
				</div>
			))}
		</CardContent>
	</Card>
);

const LearningProgress = ({
	subjects,
}: {
	subjects: { name: string; progress: number; icon: string; color: string }[];
}) => (
	<Card className="border-2 border-green-500/30">
		<CardHeader className="pb-3">
			<div className="flex items-center gap-2">
				<span className="text-2xl">📚</span>
				<h2 className="font-semibold">Learning Journey</h2>
			</div>
		</CardHeader>
		<CardContent className="space-y-4">
			{subjects.map((subject, i) => (
				<div key={i} className="space-y-2">
					<div className="flex items-center justify-between">
						<div className="flex items-center gap-2">
							<span className="text-xl">{subject.icon}</span>
							<span className="font-medium">{subject.name}</span>
						</div>
						<span className="text-sm text-muted-foreground">{subject.progress}%</span>
					</div>
					<div className="h-3 rounded-full bg-muted overflow-hidden">
						<div
							className={`h-full rounded-full ${subject.color}`}
							style={{ width: `${subject.progress}%` }}
						/>
					</div>
				</div>
			))}
		</CardContent>
	</Card>
);

const BadgesSection = ({
	badges,
}: {
	badges: { name: string; icon: string; earned: boolean; description: string }[];
}) => (
	<Card className="border-2 border-amber-500/30">
		<CardHeader className="pb-3">
			<div className="flex items-center gap-2">
				<span className="text-2xl">🏆</span>
				<h2 className="font-semibold">Badge Collection</h2>
			</div>
		</CardHeader>
		<CardContent>
			<div className="grid grid-cols-4 @sm:grid-cols-6 gap-3">
				{badges.map((badge, i) => (
					<div
						key={i}
						className={`flex flex-col items-center p-2 rounded-xl ${
							badge.earned ? 'bg-amber-500/10' : 'bg-muted/50 opacity-50'
						}`}
						title={badge.description}
					>
						<span className="text-3xl">{badge.icon}</span>
						<span className="text-xs text-center mt-1 truncate w-full">{badge.name}</span>
					</div>
				))}
			</div>
		</CardContent>
	</Card>
);

const Activities = ({
	activities,
}: {
	activities: { title: string; type: string; icon: React.ElementType; color: string }[];
}) => (
	<Card className="border-2 border-purple-500/30">
		<CardHeader className="pb-3">
			<div className="flex items-center gap-2">
				<span className="text-2xl">🎮</span>
				<h2 className="font-semibold">Fun Activities</h2>
			</div>
		</CardHeader>
		<CardContent>
			<div className="grid grid-cols-2 @sm:grid-cols-4 gap-3">
				{activities.map((activity, i) => (
					<button
						key={i}
						className={`flex flex-col items-center gap-2 p-4 rounded-xl ${activity.color} hover:scale-105 transition-transform`}
					>
						<activity.icon className="size-8 text-white" />
						<span className="text-sm font-medium text-white">{activity.title}</span>
					</button>
				))}
			</div>
		</CardContent>
	</Card>
);

const FriendsSection = ({
	friends,
}: {
	friends: { name: string; avatar: string; status: 'online' | 'offline' }[];
}) => (
	<Card className="border-2 border-cyan-500/30">
		<CardHeader className="pb-3">
			<div className="flex items-center justify-between">
				<div className="flex items-center gap-2">
					<span className="text-2xl">👫</span>
					<h2 className="font-semibold">Friends</h2>
				</div>
				<Button variant="outline" size="sm" className="gap-1">
					<Plus className="size-3" />
					Add
				</Button>
			</div>
		</CardHeader>
		<CardContent>
			<div className="flex gap-3 overflow-x-auto pb-2">
				{friends.map((friend, i) => (
					<div key={i} className="flex flex-col items-center shrink-0">
						<div className="relative">
							<Avatar className="size-14">
								<AvatarImage src={friend.avatar} />
								<AvatarFallback>{friend.name[0]}</AvatarFallback>
							</Avatar>
							<div className={`absolute bottom-0 right-0 size-3 rounded-full border-2 border-background ${
								friend.status === 'online' ? 'bg-green-500' : 'bg-gray-400'
							}`} />
						</div>
						<span className="text-xs mt-1 truncate w-14 text-center">{friend.name}</span>
					</div>
				))}
			</div>
		</CardContent>
	</Card>
);

const RewardsShop = ({
	rewards,
}: {
	rewards: { name: string; icon: string; cost: number }[];
}) => (
	<Card className="border-2 border-orange-500/30">
		<CardHeader className="pb-3">
			<div className="flex items-center gap-2">
				<span className="text-2xl">🎁</span>
				<h2 className="font-semibold">Rewards Shop</h2>
			</div>
		</CardHeader>
		<CardContent>
			<div className="grid grid-cols-3 gap-3">
				{rewards.map((reward, i) => (
					<button key={i} className="flex flex-col items-center p-3 rounded-xl bg-muted/50 hover:bg-muted transition-colors">
						<span className="text-3xl">{reward.icon}</span>
						<span className="text-xs font-medium mt-1">{reward.name}</span>
						<div className="flex items-center gap-1 mt-1">
							<span className="text-xs">🪙</span>
							<span className="text-xs font-bold">{reward.cost}</span>
						</div>
					</button>
				))}
			</div>
		</CardContent>
	</Card>
);

const WeeklyStreak = ({
	days,
}: {
	days: { day: string; completed: boolean }[];
}) => (
	<Card className="border-2 border-red-500/30">
		<CardContent className="p-4">
			<div className="flex items-center justify-between">
				<div className="flex items-center gap-2">
					<span className="text-2xl">🔥</span>
					<span className="font-semibold">Weekly Streak</span>
				</div>
				<div className="flex gap-2">
					{days.map((day, i) => (
						<div
							key={i}
							className={`size-8 rounded-full flex items-center justify-center text-xs font-bold ${
								day.completed ? 'bg-red-500 text-white' : 'bg-muted text-muted-foreground'
							}`}
						>
							{day.day}
						</div>
					))}
				</div>
			</div>
		</CardContent>
	</Card>
);

export default function Main() {
	const profileData = {
		header: {
			src: 'https://images.unsplash.com/photo-1489710437720-ebb67ec84dd2?w=400&h=400&fit=crop&crop=face',
			fallback: 'LS',
			name: 'Lily Star',
			age: 8,
			level: 12,
			coins: 450,
		},
		quests: [
			{ title: 'Complete 3 math puzzles', reward: 50, completed: true, icon: '🧮' },
			{ title: 'Read a story', reward: 30, completed: true, icon: '📖' },
			{ title: 'Draw a picture', reward: 40, completed: false, icon: '🎨' },
			{ title: 'Play a learning game', reward: 25, completed: false, icon: '🎮' },
		],
		subjects: [
			{ name: 'Math', progress: 75, icon: '➕', color: 'bg-blue-500' },
			{ name: 'Reading', progress: 85, icon: '📚', color: 'bg-green-500' },
			{ name: 'Science', progress: 60, icon: '🔬', color: 'bg-purple-500' },
			{ name: 'Art', progress: 90, icon: '🎨', color: 'bg-pink-500' },
		],
		badges: [
			{ name: 'Star Reader', icon: '⭐', earned: true, description: 'Read 10 books' },
			{ name: 'Math Wizard', icon: '🧙', earned: true, description: 'Complete 50 math problems' },
			{ name: 'Artist', icon: '🎨', earned: true, description: 'Create 20 artworks' },
			{ name: 'Explorer', icon: '🗺️', earned: true, description: 'Try 5 different subjects' },
			{ name: 'Scientist', icon: '🔬', earned: false, description: 'Complete 10 experiments' },
			{ name: 'Musician', icon: '🎵', earned: false, description: 'Learn 5 songs' },
		],
		activities: [
			{ title: 'Games', type: 'play', icon: Gamepad2, color: 'bg-purple-500' },
			{ title: 'Music', type: 'music', icon: Music, color: 'bg-pink-500' },
			{ title: 'Stories', type: 'read', icon: BookOpen, color: 'bg-blue-500' },
			{ title: 'Art', type: 'create', icon: Palette, color: 'bg-orange-500' },
		],
		friends: [
			{ name: 'Max', avatar: 'https://i.pravatar.cc/56?img=33', status: 'online' as const },
			{ name: 'Sophie', avatar: 'https://i.pravatar.cc/56?img=44', status: 'online' as const },
			{ name: 'Jake', avatar: 'https://i.pravatar.cc/56?img=12', status: 'offline' as const },
			{ name: 'Emma', avatar: 'https://i.pravatar.cc/56?img=9', status: 'online' as const },
			{ name: 'Lucas', avatar: 'https://i.pravatar.cc/56?img=8', status: 'offline' as const },
		],
		rewards: [
			{ name: 'Stickers', icon: '🌟', cost: 100 },
			{ name: 'Avatar Hat', icon: '🎩', cost: 200 },
			{ name: 'Pet Dragon', icon: '🐉', cost: 500 },
		],
		weeklyStreak: [
			{ day: 'M', completed: true },
			{ day: 'T', completed: true },
			{ day: 'W', completed: true },
			{ day: 'T', completed: true },
			{ day: 'F', completed: true },
			{ day: 'S', completed: false },
			{ day: 'S', completed: false },
		],
	};

	return (
		<section className="@container">
			<div className="mx-auto max-w-2xl px-4 @sm:px-6 @lg:px-8 py-8 @md:py-12 space-y-4">
				<KidsHeader {...profileData.header} />
				<WeeklyStreak days={profileData.weeklyStreak} />
				<DailyQuests quests={profileData.quests} />
				<LearningProgress subjects={profileData.subjects} />
				<Activities activities={profileData.activities} />
				<BadgesSection badges={profileData.badges} />
				<FriendsSection friends={profileData.friends} />
				<RewardsShop rewards={profileData.rewards} />
			</div>
		</section>
	);
}
