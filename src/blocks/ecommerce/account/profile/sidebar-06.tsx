import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { Separator } from '@/components/ui/separator';
import {
	Activity,
	Award,
	Calendar,
	ChevronRight,
	Dumbbell,
	Flame,
	Heart,
	LogOut,
	Moon,
	Settings,
	Target,
	Timer,
	Trophy,
	User,
	Zap,
} from 'lucide-react';
import Link from 'next/link';

const FitnessSidebar = ({
	src,
	fallback,
	name,
	memberSince,
	streak,
	totalWorkouts,
}: {
	src: string;
	fallback: string;
	name: string;
	memberSince: string;
	streak: number;
	totalWorkouts: number;
}) => (
	<div className="space-y-4">
		<div className="text-center">
			<Avatar className="size-20 mx-auto ring-4 ring-green-500/30">
				<AvatarImage src={src} alt={name} />
				<AvatarFallback className="bg-green-500 text-white text-xl">
					{fallback}
				</AvatarFallback>
			</Avatar>
			<h2 className="font-bold mt-3">{name}</h2>
			<p className="text-sm text-muted-foreground">Member since {memberSince}</p>
		</div>
		<div className="flex justify-center gap-6">
			<div className="text-center">
				<div className="flex items-center gap-1 text-orange-500">
					<Flame className="size-5" />
					<span className="text-xl font-bold">{streak}</span>
				</div>
				<p className="text-xs text-muted-foreground">Day Streak</p>
			</div>
			<div className="text-center">
				<div className="flex items-center gap-1 text-green-500">
					<Dumbbell className="size-5" />
					<span className="text-xl font-bold">{totalWorkouts}</span>
				</div>
				<p className="text-xs text-muted-foreground">Workouts</p>
			</div>
		</div>
	</div>
);

const FitnessNav = ({
	items,
	activeHref,
}: {
	items: { icon: React.ElementType; label: string; href: string; badge?: string }[];
	activeHref: string;
}) => (
	<nav className="space-y-1">
		{items.map((item, i) => (
			<Link
				key={i}
				href={item.href}
				className={`flex items-center gap-3 px-3 py-2.5 rounded-lg transition-colors ${
					item.href === activeHref
						? 'bg-green-500 text-white'
						: 'hover:bg-muted'
				}`}
			>
				<item.icon className="size-5" />
				<span className="flex-1 text-sm font-medium">{item.label}</span>
				{item.badge && (
					<Badge variant={item.href === activeHref ? 'secondary' : 'outline'}>
						{item.badge}
					</Badge>
				)}
			</Link>
		))}
	</nav>
);

const TodayStats = ({
	stats,
}: {
	stats: { icon: React.ElementType; value: string; label: string; progress: number; color: string }[];
}) => (
	<div className="grid grid-cols-2 gap-4">
		{stats.map((stat, i) => (
			<Card key={i}>
				<CardContent className="p-4 text-center">
					<stat.icon className={`size-6 mx-auto mb-2 ${stat.color}`} />
					<p className="text-2xl font-bold">{stat.value}</p>
					<p className="text-xs text-muted-foreground mb-2">{stat.label}</p>
					<Progress value={stat.progress} className="h-1.5" />
				</CardContent>
			</Card>
		))}
	</div>
);

const WorkoutPlan = ({
	days,
}: {
	days: { day: string; workout: string; completed: boolean }[];
}) => (
	<Card>
		<CardHeader className="pb-3">
			<div className="flex items-center justify-between">
				<h3 className="font-semibold flex items-center gap-2">
					<Calendar className="size-5 text-green-500" />
					This Week
				</h3>
				<Button variant="ghost" size="sm">Edit Plan</Button>
			</div>
		</CardHeader>
		<CardContent className="space-y-2">
			{days.map((day, i) => (
				<div
					key={i}
					className={`flex items-center justify-between p-3 rounded-lg ${
						day.completed ? 'bg-green-500/10' : 'bg-muted/30'
					}`}
				>
					<div className="flex items-center gap-3">
						<div className={`size-8 rounded-full flex items-center justify-center ${
							day.completed ? 'bg-green-500 text-white' : 'bg-muted'
						}`}>
							{day.completed ? '✓' : day.day.charAt(0)}
						</div>
						<div>
							<p className="font-medium">{day.day}</p>
							<p className="text-sm text-muted-foreground">{day.workout}</p>
						</div>
					</div>
					{!day.completed && (
						<Button size="sm" className="bg-green-500 hover:bg-green-600">Start</Button>
					)}
				</div>
			))}
		</CardContent>
	</Card>
);

const Achievements = ({
	achievements,
}: {
	achievements: { icon: React.ElementType; title: string; description: string; earned: boolean }[];
}) => (
	<Card>
		<CardHeader className="pb-3">
			<h3 className="font-semibold flex items-center gap-2">
				<Trophy className="size-5 text-amber-500" />
				Achievements
			</h3>
		</CardHeader>
		<CardContent className="space-y-3">
			{achievements.map((achievement, i) => (
				<div key={i} className="flex items-center gap-3">
					<div className={`p-2 rounded-lg ${
						achievement.earned ? 'bg-amber-500/20' : 'bg-muted'
					}`}>
						<achievement.icon className={`size-5 ${
							achievement.earned ? 'text-amber-500' : 'text-muted-foreground'
						}`} />
					</div>
					<div className="flex-1">
						<p className={`text-sm font-medium ${!achievement.earned && 'text-muted-foreground'}`}>
							{achievement.title}
						</p>
						<p className="text-xs text-muted-foreground">{achievement.description}</p>
					</div>
					{achievement.earned && <Badge className="bg-amber-500/20 text-amber-600">Earned</Badge>}
				</div>
			))}
		</CardContent>
	</Card>
);

export default function Main() {
	const profileData = {
		sidebar: {
			src: 'https://images.unsplash.com/photo-1571019614242-c5c5dee9f50b?w=400&h=400&fit=crop&crop=face',
			fallback: 'AJ',
			name: 'Alex Johnson',
			memberSince: 'Aug 2023',
			streak: 28,
			totalWorkouts: 156,
		},
		nav: [
			{ icon: Activity, label: 'Dashboard', href: '/fitness' },
			{ icon: Dumbbell, label: 'Workouts', href: '/workouts', badge: '3' },
			{ icon: Calendar, label: 'Schedule', href: '/schedule' },
			{ icon: Trophy, label: 'Achievements', href: '/achievements' },
			{ icon: User, label: 'Profile', href: '/profile' },
			{ icon: Settings, label: 'Settings', href: '/settings' },
		],
		stats: [
			{ icon: Flame, value: '486', label: 'Calories', progress: 65, color: 'text-orange-500' },
			{ icon: Timer, value: '45m', label: 'Active Time', progress: 75, color: 'text-blue-500' },
			{ icon: Heart, value: '72', label: 'Avg BPM', progress: 50, color: 'text-red-500' },
			{ icon: Target, value: '8,247', label: 'Steps', progress: 82, color: 'text-green-500' },
		],
		weekPlan: [
			{ day: 'Monday', workout: 'Upper Body', completed: true },
			{ day: 'Tuesday', workout: 'Cardio', completed: true },
			{ day: 'Wednesday', workout: 'Lower Body', completed: true },
			{ day: 'Thursday', workout: 'Core & Abs', completed: false },
			{ day: 'Friday', workout: 'Full Body', completed: false },
		],
		achievements: [
			{ icon: Flame, title: '7 Day Streak', description: 'Work out 7 days in a row', earned: true },
			{ icon: Zap, title: 'Early Bird', description: 'Complete a workout before 7am', earned: true },
			{ icon: Award, title: '100 Workouts', description: 'Complete 100 total workouts', earned: true },
			{ icon: Trophy, title: 'Marathon', description: 'Run a total of 26.2 miles', earned: false },
		],
	};

	return (
		<section className="@container">
			<div className="mx-auto max-w-6xl px-4 @sm:px-6 @lg:px-8 py-8 @md:py-12">
				<div className="flex flex-col @lg:flex-row gap-8">
					<aside className="w-full @lg:w-64 shrink-0">
						<Card className="sticky top-4">
							<CardContent className="p-6 space-y-6">
								<FitnessSidebar {...profileData.sidebar} />
								<Separator />
								<FitnessNav items={profileData.nav} activeHref="/fitness" />
								<Separator />
								<Button variant="ghost" className="w-full justify-start gap-3 text-destructive">
									<LogOut className="size-5" />
									Sign Out
								</Button>
							</CardContent>
						</Card>
					</aside>
					<div className="flex-1 space-y-6">
						<h1 className="text-2xl font-bold">Fitness Dashboard</h1>
						<TodayStats stats={profileData.stats} />
						<WorkoutPlan days={profileData.weekPlan} />
						<Achievements achievements={profileData.achievements} />
					</div>
				</div>
			</div>
		</section>
	);
}
