import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import {
	ArrowRight,
	BookOpen,
	Calendar,
	CheckCircle2,
	Clock,
	Flame,
	GraduationCap,
	PlayCircle,
	Star,
	Target,
	Trophy,
	TrendingUp,
	Zap,
} from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';

const LearnerHeader = ({
	src,
	fallback,
	name,
	level,
	xp,
	streak,
}: {
	src: string;
	fallback: string;
	name: string;
	level: number;
	xp: string;
	streak: number;
}) => (
	<Card className="bg-gradient-to-r from-blue-500/10 to-cyan-500/10">
		<CardContent className="p-6">
			<div className="flex flex-col @md:flex-row items-center gap-6">
				<Avatar className="size-24 ring-4 ring-blue-500/20">
					<AvatarImage src={src} alt={name} />
					<AvatarFallback className="text-2xl">{fallback}</AvatarFallback>
				</Avatar>
				<div className="text-center @md:text-left flex-1">
					<h1 className="text-2xl font-bold">{name}</h1>
					<div className="flex items-center justify-center @md:justify-start gap-4 mt-2">
						<Badge className="bg-blue-500/20 text-blue-600 gap-1">
							<GraduationCap className="size-3" />
							Level {level}
						</Badge>
						<span className="text-muted-foreground">{xp} XP</span>
					</div>
				</div>
				<div className="flex items-center gap-2 p-3 rounded-lg bg-orange-500/10">
					<Flame className="size-6 text-orange-500" />
					<div>
						<p className="text-2xl font-bold text-orange-500">{streak}</p>
						<p className="text-xs text-muted-foreground">Day Streak</p>
					</div>
				</div>
			</div>
		</CardContent>
	</Card>
);

const DailyGoals = ({
	goals,
}: {
	goals: {
		label: string;
		current: number;
		target: number;
		icon: React.ElementType;
	}[];
}) => (
	<Card>
		<CardHeader className="pb-3">
			<div className="flex items-center gap-2">
				<Target className="size-5 text-primary" />
				<h2 className="font-semibold">Today's Goals</h2>
			</div>
		</CardHeader>
		<CardContent className="space-y-4">
			{goals.map((goal, i) => (
				<div key={i} className="space-y-2">
					<div className="flex items-center justify-between text-sm">
						<div className="flex items-center gap-2">
							<goal.icon className="size-4 text-muted-foreground" />
							<span>{goal.label}</span>
						</div>
						<span
							className={goal.current >= goal.target ? 'text-green-500' : ''}
						>
							{goal.current}/{goal.target}
							{goal.current >= goal.target && (
								<CheckCircle2 className="inline size-4 ml-1" />
							)}
						</span>
					</div>
					<Progress
						value={(goal.current / goal.target) * 100}
						className="h-2"
					/>
				</div>
			))}
		</CardContent>
	</Card>
);

const ContinueLearning = ({
	courses,
}: {
	courses: {
		image: string;
		title: string;
		instructor: string;
		progress: number;
		timeLeft: string;
	}[];
}) => (
	<Card>
		<CardHeader className="pb-3">
			<div className="flex items-center justify-between">
				<h2 className="font-semibold">Continue Learning</h2>
				<Button variant="ghost" size="sm" asChild>
					<Link href="/courses">All Courses</Link>
				</Button>
			</div>
		</CardHeader>
		<CardContent className="space-y-4">
			{courses.map((course, i) => (
				<div
					key={i}
					className="flex gap-4 p-3 rounded-lg hover:bg-muted/50 transition-colors cursor-pointer"
				>
					<div className="relative w-24 aspect-video rounded-lg overflow-hidden bg-muted shrink-0">
						<Image
							src={course.image}
							alt={course.title}
							fill
							className="object-cover"
						/>
						<div className="absolute inset-0 flex items-center justify-center bg-black/30">
							<PlayCircle className="size-8 text-white" />
						</div>
					</div>
					<div className="flex-1 min-w-0">
						<h4 className="font-medium truncate">{course.title}</h4>
						<p className="text-sm text-muted-foreground">{course.instructor}</p>
						<div className="flex items-center gap-2 mt-2">
							<Progress value={course.progress} className="h-1.5 flex-1" />
							<span className="text-xs text-muted-foreground">
								{course.progress}%
							</span>
						</div>
						<p className="text-xs text-muted-foreground mt-1">
							{course.timeLeft} left
						</p>
					</div>
				</div>
			))}
		</CardContent>
	</Card>
);

const Achievements = ({
	achievements,
}: {
	achievements: {
		icon: React.ElementType;
		title: string;
		description: string;
		date: string;
		color: string;
	}[];
}) => (
	<Card>
		<CardHeader className="pb-3">
			<div className="flex items-center gap-2">
				<Trophy className="size-5 text-amber-500" />
				<h2 className="font-semibold">Recent Achievements</h2>
			</div>
		</CardHeader>
		<CardContent className="space-y-3">
			{achievements.map((achievement, i) => (
				<div
					key={i}
					className="flex items-center gap-4 p-3 rounded-lg bg-muted/30"
				>
					<div className={`p-2 rounded-full ${achievement.color}`}>
						<achievement.icon className="size-5 text-white" />
					</div>
					<div className="flex-1">
						<p className="font-medium">{achievement.title}</p>
						<p className="text-sm text-muted-foreground">
							{achievement.description}
						</p>
					</div>
					<span className="text-xs text-muted-foreground">
						{achievement.date}
					</span>
				</div>
			))}
		</CardContent>
	</Card>
);

const WeeklyProgress = ({
	days,
}: {
	days: { day: string; minutes: number; completed: boolean }[];
}) => (
	<Card>
		<CardHeader className="pb-3">
			<div className="flex items-center justify-between">
				<h2 className="font-semibold">Weekly Progress</h2>
				<div className="flex items-center gap-1 text-green-500">
					<TrendingUp className="size-4" />
					<span className="text-sm">+15% vs last week</span>
				</div>
			</div>
		</CardHeader>
		<CardContent>
			<div className="flex items-end justify-between gap-2 h-32">
				{days.map((day, i) => (
					<div key={i} className="flex-1 flex flex-col items-center gap-2">
						<div
							className={`w-full rounded-t-lg transition-all ${day.completed ? 'bg-primary' : 'bg-muted'}`}
							style={{ height: `${Math.max(day.minutes, 10)}%` }}
						/>
						<span
							className={`text-xs ${day.completed ? 'font-medium' : 'text-muted-foreground'}`}
						>
							{day.day}
						</span>
					</div>
				))}
			</div>
		</CardContent>
	</Card>
);

const SkillsProgress = ({
	skills,
}: {
	skills: { name: string; level: number; xp: string }[];
}) => (
	<Card>
		<CardHeader className="pb-3">
			<h2 className="font-semibold">Skills</h2>
		</CardHeader>
		<CardContent className="space-y-4">
			{skills.map((skill, i) => (
				<div key={i} className="space-y-2">
					<div className="flex items-center justify-between">
						<span className="font-medium">{skill.name}</span>
						<div className="flex items-center gap-2">
							<Badge variant="secondary">Lvl {skill.level}</Badge>
							<span className="text-xs text-muted-foreground">{skill.xp}</span>
						</div>
					</div>
					<Progress value={(skill.level % 10) * 10} className="h-2" />
				</div>
			))}
		</CardContent>
	</Card>
);

export default function Main() {
	const profileData = {
		header: {
			src: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=400&h=400&fit=crop&crop=face',
			fallback: 'AK',
			name: 'Alex Kim',
			level: 24,
			xp: '12,450',
			streak: 14,
		},
		dailyGoals: [
			{ label: 'Complete 2 lessons', current: 1, target: 2, icon: BookOpen },
			{ label: 'Practice 30 minutes', current: 25, target: 30, icon: Clock },
			{ label: 'Earn 100 XP', current: 100, target: 100, icon: Zap },
		],
		courses: [
			{
				image:
					'https://images.unsplash.com/photo-1587620962725-abab7fe55159?w=300',
				title: 'Advanced React Patterns',
				instructor: 'Sarah Chen',
				progress: 68,
				timeLeft: '2h 15m',
			},
			{
				image:
					'https://images.unsplash.com/photo-1555949963-ff9fe0c870eb?w=300',
				title: 'TypeScript Fundamentals',
				instructor: 'Mike Johnson',
				progress: 45,
				timeLeft: '4h 30m',
			},
		],
		achievements: [
			{
				icon: Flame,
				title: 'On Fire!',
				description: '14 day learning streak',
				date: 'Today',
				color: 'bg-orange-500',
			},
			{
				icon: Trophy,
				title: 'Quick Learner',
				description: 'Complete 10 lessons in a day',
				date: 'Yesterday',
				color: 'bg-amber-500',
			},
			{
				icon: Star,
				title: 'Perfect Score',
				description: 'Ace a quiz with 100%',
				date: '3 days ago',
				color: 'bg-blue-500',
			},
		],
		weeklyProgress: [
			{ day: 'Mon', minutes: 45, completed: true },
			{ day: 'Tue', minutes: 60, completed: true },
			{ day: 'Wed', minutes: 30, completed: true },
			{ day: 'Thu', minutes: 55, completed: true },
			{ day: 'Fri', minutes: 25, completed: true },
			{ day: 'Sat', minutes: 0, completed: false },
			{ day: 'Sun', minutes: 0, completed: false },
		],
		skills: [
			{ name: 'JavaScript', level: 18, xp: '8,200 XP' },
			{ name: 'React', level: 12, xp: '4,500 XP' },
			{ name: 'TypeScript', level: 7, xp: '2,100 XP' },
			{ name: 'Node.js', level: 5, xp: '1,200 XP' },
		],
	};

	return (
		<section className="@container">
			<div className="mx-auto max-w-2xl px-4 @sm:px-6 @lg:px-8 py-8 @md:py-12 space-y-4">
				<LearnerHeader {...profileData.header} />
				<DailyGoals goals={profileData.dailyGoals} />
				<ContinueLearning courses={profileData.courses} />
				<WeeklyProgress days={profileData.weeklyProgress} />
				<Achievements achievements={profileData.achievements} />
				<SkillsProgress skills={profileData.skills} />
			</div>
		</section>
	);
}
