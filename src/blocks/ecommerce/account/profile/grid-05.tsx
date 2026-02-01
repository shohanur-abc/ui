import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import {
	Award,
	BookOpen,
	Calendar,
	CheckCircle2,
	ChevronRight,
	Clock,
	Flame,
	GraduationCap,
	Medal,
	Play,
	PlayCircle,
	Plus,
	Star,
	Target,
	Trophy,
	Users,
	Zap,
} from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';

const LearnerProfileCard = ({
	src,
	fallback,
	name,
	title,
	level,
	xp,
	nextLevelXp,
}: {
	src: string;
	fallback: string;
	name: string;
	title: string;
	level: number;
	xp: number;
	nextLevelXp: number;
}) => (
	<Card className="col-span-full @lg:col-span-2 bg-gradient-to-br from-violet-500/10 to-indigo-500/10">
		<CardContent className="p-6">
			<div className="flex items-center gap-4">
				<div className="relative">
					<Avatar className="size-16 ring-4 ring-violet-500/30">
						<AvatarImage src={src} alt={name} />
						<AvatarFallback className="text-xl">{fallback}</AvatarFallback>
					</Avatar>
					<div className="absolute -bottom-1 -right-1 bg-violet-500 text-white text-xs font-bold size-6 rounded-full flex items-center justify-center">
						{level}
					</div>
				</div>
				<div className="flex-1">
					<h1 className="text-xl font-bold">{name}</h1>
					<p className="text-muted-foreground">{title}</p>
					<div className="mt-2">
						<div className="flex items-center justify-between text-xs mb-1">
							<span>{xp} XP</span>
							<span className="text-muted-foreground">{nextLevelXp} XP</span>
						</div>
						<Progress value={(xp / nextLevelXp) * 100} className="h-2" />
					</div>
				</div>
			</div>
		</CardContent>
	</Card>
);

const StreakCard = ({
	current,
	longest,
	weeklyGoal,
	completed,
}: {
	current: number;
	longest: number;
	weeklyGoal: number;
	completed: number;
}) => (
	<Card className="col-span-2 bg-gradient-to-r from-orange-500/10 to-amber-500/10">
		<CardContent className="p-4">
			<div className="flex items-center justify-between">
				<div className="flex items-center gap-3">
					<div className="p-3 rounded-full bg-orange-500/20">
						<Flame className="size-6 text-orange-500" />
					</div>
					<div>
						<p className="text-2xl font-bold">{current} days</p>
						<p className="text-sm text-muted-foreground">Current Streak</p>
					</div>
				</div>
				<div className="text-right">
					<p className="text-sm">
						Longest: <span className="font-bold">{longest} days</span>
					</p>
					<p className="text-sm text-muted-foreground">
						{completed}/{weeklyGoal} this week
					</p>
				</div>
			</div>
		</CardContent>
	</Card>
);

const StatCard = ({
	icon: Icon,
	label,
	value,
	color,
}: {
	icon: React.ElementType;
	label: string;
	value: string;
	color: string;
}) => (
	<Card>
		<CardContent className="p-4">
			<Icon className={`size-6 ${color} mb-2`} />
			<p className="text-2xl font-bold">{value}</p>
			<p className="text-xs text-muted-foreground">{label}</p>
		</CardContent>
	</Card>
);

const CourseProgressCard = ({
	title,
	instructor,
	progress,
	thumbnail,
	nextLesson,
}: {
	title: string;
	instructor: string;
	progress: number;
	thumbnail: string;
	nextLesson: string;
}) => (
	<Card className="col-span-2 overflow-hidden">
		<div className="flex">
			<div className="relative w-24 shrink-0">
				<div
					className="absolute inset-0 bg-cover bg-center"
					style={{ backgroundImage: `url(${thumbnail})` }}
				/>
				<div className="absolute inset-0 bg-black/40 flex items-center justify-center">
					<PlayCircle className="size-8 text-white" />
				</div>
			</div>
			<CardContent className="p-4 flex-1">
				<Badge variant="secondary" className="mb-2">
					Continue Learning
				</Badge>
				<p className="font-semibold truncate">{title}</p>
				<p className="text-xs text-muted-foreground">{instructor}</p>
				<div className="flex items-center gap-2 mt-2">
					<Progress value={progress} className="flex-1 h-1.5" />
					<span className="text-xs font-medium">{progress}%</span>
				</div>
				<p className="text-xs text-muted-foreground mt-1">Next: {nextLesson}</p>
			</CardContent>
		</div>
	</Card>
);

const AchievementCard = ({
	name,
	description,
	icon,
	earned,
	date,
}: {
	name: string;
	description: string;
	icon: string;
	earned: boolean;
	date?: string;
}) => (
	<Card className={!earned ? 'opacity-50' : ''}>
		<CardContent className="p-4">
			<div className="flex items-center gap-3">
				<span className="text-3xl">{icon}</span>
				<div className="flex-1 min-w-0">
					<p className="font-medium truncate">{name}</p>
					<p className="text-xs text-muted-foreground truncate">
						{description}
					</p>
					{date && <p className="text-xs text-primary">{date}</p>}
				</div>
				{earned && <CheckCircle2 className="size-5 text-green-500 shrink-0" />}
			</div>
		</CardContent>
	</Card>
);

const SkillCard = ({
	name,
	level,
	progress,
	color,
}: {
	name: string;
	level: string;
	progress: number;
	color: string;
}) => (
	<Card>
		<CardContent className="p-4">
			<div className="flex items-center justify-between mb-2">
				<span className="font-medium text-sm">{name}</span>
				<Badge variant="outline">{level}</Badge>
			</div>
			<Progress value={progress} className={`h-2 ${color}`} />
		</CardContent>
	</Card>
);

const LeaderboardCard = ({
	position,
	users,
}: {
	position: number;
	users: { name: string; avatar: string; xp: number; position: number }[];
}) => (
	<Card className="col-span-2">
		<CardHeader className="pb-2">
			<div className="flex items-center justify-between">
				<h3 className="font-semibold flex items-center gap-2">
					<Trophy className="size-5 text-amber-500" />
					Leaderboard
				</h3>
				<Badge variant="outline">#{position}</Badge>
			</div>
		</CardHeader>
		<CardContent className="space-y-2">
			{users.map((user, i) => (
				<div
					key={i}
					className="flex items-center gap-3 p-2 rounded-lg bg-muted/30"
				>
					<span
						className={`size-6 rounded-full flex items-center justify-center text-xs font-bold ${
							user.position === 1
								? 'bg-amber-500 text-white'
								: user.position === 2
									? 'bg-gray-400 text-white'
									: user.position === 3
										? 'bg-amber-700 text-white'
										: 'bg-muted text-muted-foreground'
						}`}
					>
						{user.position}
					</span>
					<Avatar className="size-8">
						<AvatarImage src={user.avatar} />
						<AvatarFallback>{user.name[0]}</AvatarFallback>
					</Avatar>
					<span className="flex-1 font-medium text-sm">{user.name}</span>
					<span className="text-sm text-muted-foreground">
						{user.xp.toLocaleString()} XP
					</span>
				</div>
			))}
		</CardContent>
	</Card>
);

const UpcomingCard = ({
	events,
}: {
	events: { title: string; type: string; date: string; time: string }[];
}) => (
	<Card className="col-span-2">
		<CardHeader className="pb-2">
			<h3 className="font-semibold flex items-center gap-2">
				<Calendar className="size-5" />
				Upcoming
			</h3>
		</CardHeader>
		<CardContent className="space-y-2">
			{events.map((event, i) => (
				<div
					key={i}
					className="flex items-center justify-between p-2 rounded-lg bg-muted/30"
				>
					<div className="flex items-center gap-3">
						<div className="p-2 rounded-lg bg-primary/10">
							<Clock className="size-4 text-primary" />
						</div>
						<div>
							<p className="font-medium text-sm">{event.title}</p>
							<p className="text-xs text-muted-foreground">
								{event.date} at {event.time}
							</p>
						</div>
					</div>
					<Badge variant="secondary">{event.type}</Badge>
				</div>
			))}
		</CardContent>
	</Card>
);

export default function Main() {
	const profileData = {
		user: {
			src: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=200',
			fallback: 'LM',
			name: 'Lisa Martinez',
			title: 'Full Stack Developer',
			level: 24,
			xp: 12450,
			nextLevelXp: 15000,
		},
		streak: { current: 42, longest: 67, weeklyGoal: 7, completed: 5 },
		stats: [
			{ icon: BookOpen, label: 'Courses', value: '12', color: 'text-blue-500' },
			{ icon: Clock, label: 'Hours', value: '156', color: 'text-green-500' },
			{
				icon: Award,
				label: 'Certificates',
				value: '8',
				color: 'text-amber-500',
			},
			{ icon: Zap, label: 'Skills', value: '24', color: 'text-purple-500' },
		],
		currentCourse: {
			title: 'Advanced React Patterns',
			instructor: 'Kent C. Dodds',
			progress: 68,
			thumbnail:
				'https://images.unsplash.com/photo-1633356122544-f134324a6cee?w=400',
			nextLesson: 'Compound Components',
		},
		achievements: [
			{
				name: 'First Steps',
				description: 'Complete your first lesson',
				icon: '🎯',
				earned: true,
				date: 'Jan 2023',
			},
			{
				name: 'Quick Learner',
				description: 'Complete 10 lessons in a day',
				icon: '⚡',
				earned: true,
				date: 'Feb 2023',
			},
			{
				name: 'Dedicated',
				description: '30-day learning streak',
				icon: '🔥',
				earned: true,
				date: 'Mar 2023',
			},
			{
				name: 'Expert',
				description: 'Master 10 skills',
				icon: '🏆',
				earned: false,
			},
		],
		skills: [
			{ name: 'React', level: 'Advanced', progress: 85, color: '' },
			{ name: 'TypeScript', level: 'Intermediate', progress: 65, color: '' },
			{ name: 'Node.js', level: 'Intermediate', progress: 60, color: '' },
			{ name: 'Python', level: 'Beginner', progress: 35, color: '' },
		],
		leaderboard: {
			position: 12,
			users: [
				{
					name: 'Alex Kim',
					avatar: 'https://i.pravatar.cc/32?img=1',
					xp: 45200,
					position: 1,
				},
				{
					name: 'Sarah Chen',
					avatar: 'https://i.pravatar.cc/32?img=2',
					xp: 42100,
					position: 2,
				},
				{
					name: 'Mike Johnson',
					avatar: 'https://i.pravatar.cc/32?img=3',
					xp: 38900,
					position: 3,
				},
			],
		},
		upcoming: [
			{
				title: 'Live Workshop: React Hooks',
				type: 'Workshop',
				date: 'Feb 1',
				time: '3:00 PM',
			},
			{
				title: 'Assessment: TypeScript',
				type: 'Quiz',
				date: 'Feb 3',
				time: '10:00 AM',
			},
		],
	};

	return (
		<section className="@container">
			<div className="mx-auto max-w-4xl px-4 @sm:px-6 @lg:px-8 py-8 @md:py-12">
				<div className="grid grid-cols-2 @lg:grid-cols-4 gap-4">
					<LearnerProfileCard {...profileData.user} />
					{profileData.stats.map((stat, i) => (
						<StatCard key={i} {...stat} />
					))}
					<StreakCard {...profileData.streak} />
					<CourseProgressCard {...profileData.currentCourse} />
					{profileData.achievements.map((achievement, i) => (
						<AchievementCard key={i} {...achievement} />
					))}
					{profileData.skills.map((skill, i) => (
						<SkillCard key={i} {...skill} />
					))}
					<LeaderboardCard {...profileData.leaderboard} />
					<UpcomingCard events={profileData.upcoming} />
				</div>
			</div>
		</section>
	);
}
