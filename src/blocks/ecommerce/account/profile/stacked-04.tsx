import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import {
	Activity,
	Apple,
	Award,
	BarChart3,
	Calendar,
	Dumbbell,
	Flame,
	Footprints,
	Heart,
	Moon,
	Target,
	Timer,
	TrendingUp,
	Trophy,
	Zap,
} from 'lucide-react';
import Image from 'next/image';

const FitnessHeader = ({
	src,
	fallback,
	name,
	level,
	fitnessAge,
}: {
	src: string;
	fallback: string;
	name: string;
	level: string;
	fitnessAge: number;
}) => (
	<Card className="bg-gradient-to-r from-green-500/10 to-emerald-500/10">
		<CardContent className="p-6">
			<div className="flex flex-col @sm:flex-row items-center gap-6">
				<Avatar className="size-24 ring-4 ring-green-500/20">
					<AvatarImage src={src} alt={name} />
					<AvatarFallback className="text-2xl bg-green-500 text-white">{fallback}</AvatarFallback>
				</Avatar>
				<div className="text-center @sm:text-left flex-1">
					<h1 className="text-2xl font-bold">{name}</h1>
					<Badge className="bg-green-500/20 text-green-600 mt-1">{level}</Badge>
					<div className="flex items-center justify-center @sm:justify-start gap-2 mt-2">
						<Heart className="size-4 text-red-500" />
						<span className="text-muted-foreground">Fitness Age: {fitnessAge}</span>
					</div>
				</div>
				<div className="flex gap-3">
					<Button variant="outline" className="gap-2">
						<BarChart3 className="size-4" />
						Stats
					</Button>
					<Button className="gap-2">
						<Dumbbell className="size-4" />
						Start Workout
					</Button>
				</div>
			</div>
		</CardContent>
	</Card>
);

const TodayStats = ({
	stats,
}: {
	stats: { icon: React.ElementType; label: string; value: string; target: string; progress: number; color: string }[];
}) => (
	<Card>
		<CardHeader className="pb-3">
			<div className="flex items-center gap-2">
				<Calendar className="size-5" />
				<h2 className="font-semibold">Today's Activity</h2>
			</div>
		</CardHeader>
		<CardContent>
			<div className="grid grid-cols-2 @md:grid-cols-4 gap-4">
				{stats.map((stat, i) => (
					<div key={i} className="text-center">
						<div className={`mx-auto size-16 rounded-full flex items-center justify-center ${stat.color} mb-2`}>
							<stat.icon className="size-7 text-white" />
						</div>
						<p className="text-xl font-bold">{stat.value}</p>
						<p className="text-xs text-muted-foreground">{stat.label}</p>
						<Progress value={stat.progress} className="h-1 mt-2" />
						<p className="text-xs text-muted-foreground mt-1">Goal: {stat.target}</p>
					</div>
				))}
			</div>
		</CardContent>
	</Card>
);

const ActiveRings = ({
	move,
	exercise,
	stand,
}: {
	move: { current: number; goal: number };
	exercise: { current: number; goal: number };
	stand: { current: number; goal: number };
}) => (
	<Card>
		<CardHeader className="pb-3">
			<h2 className="font-semibold">Activity Rings</h2>
		</CardHeader>
		<CardContent>
			<div className="flex items-center justify-center gap-8">
				<div className="relative size-36">
					{/* Outer ring - Move */}
					<svg className="size-36 -rotate-90">
						<circle cx="72" cy="72" r="64" fill="none" stroke="currentColor" strokeWidth="12" className="text-red-500/20" />
						<circle
							cx="72" cy="72" r="64"
							fill="none" stroke="currentColor" strokeWidth="12"
							strokeDasharray={`${(move.current / move.goal) * 402} 402`}
							strokeLinecap="round"
							className="text-red-500"
						/>
					</svg>
					{/* Middle ring - Exercise */}
					<svg className="size-28 -rotate-90 absolute top-4 left-4">
						<circle cx="56" cy="56" r="48" fill="none" stroke="currentColor" strokeWidth="12" className="text-green-500/20" />
						<circle
							cx="56" cy="56" r="48"
							fill="none" stroke="currentColor" strokeWidth="12"
							strokeDasharray={`${(exercise.current / exercise.goal) * 301} 301`}
							strokeLinecap="round"
							className="text-green-500"
						/>
					</svg>
					{/* Inner ring - Stand */}
					<svg className="size-20 -rotate-90 absolute top-8 left-8">
						<circle cx="40" cy="40" r="32" fill="none" stroke="currentColor" strokeWidth="12" className="text-blue-500/20" />
						<circle
							cx="40" cy="40" r="32"
							fill="none" stroke="currentColor" strokeWidth="12"
							strokeDasharray={`${(stand.current / stand.goal) * 201} 201`}
							strokeLinecap="round"
							className="text-blue-500"
						/>
					</svg>
				</div>
				<div className="space-y-4">
					<div className="flex items-center gap-3">
						<div className="size-3 rounded-full bg-red-500" />
						<div>
							<p className="font-medium">Move</p>
							<p className="text-sm text-muted-foreground">{move.current}/{move.goal} cal</p>
						</div>
					</div>
					<div className="flex items-center gap-3">
						<div className="size-3 rounded-full bg-green-500" />
						<div>
							<p className="font-medium">Exercise</p>
							<p className="text-sm text-muted-foreground">{exercise.current}/{exercise.goal} min</p>
						</div>
					</div>
					<div className="flex items-center gap-3">
						<div className="size-3 rounded-full bg-blue-500" />
						<div>
							<p className="font-medium">Stand</p>
							<p className="text-sm text-muted-foreground">{stand.current}/{stand.goal} hrs</p>
						</div>
					</div>
				</div>
			</div>
		</CardContent>
	</Card>
);

const RecentWorkouts = ({
	workouts,
}: {
	workouts: { type: string; duration: string; calories: string; date: string; icon: React.ElementType }[];
}) => (
	<Card>
		<CardHeader className="pb-3">
			<div className="flex items-center justify-between">
				<h2 className="font-semibold">Recent Workouts</h2>
				<Button variant="ghost" size="sm">View All</Button>
			</div>
		</CardHeader>
		<CardContent className="space-y-3">
			{workouts.map((workout, i) => (
				<div key={i} className="flex items-center justify-between p-3 rounded-lg bg-muted/30">
					<div className="flex items-center gap-3">
						<div className="p-2 rounded-lg bg-primary/10">
							<workout.icon className="size-5 text-primary" />
						</div>
						<div>
							<p className="font-medium">{workout.type}</p>
							<p className="text-sm text-muted-foreground">{workout.date}</p>
						</div>
					</div>
					<div className="text-right">
						<p className="font-medium">{workout.duration}</p>
						<p className="text-sm text-muted-foreground">{workout.calories} cal</p>
					</div>
				</div>
			))}
		</CardContent>
	</Card>
);

const WeeklySummary = ({
	summary,
}: {
	summary: { label: string; value: string; change: string; positive: boolean }[];
}) => (
	<Card>
		<CardHeader className="pb-3">
			<div className="flex items-center gap-2">
				<TrendingUp className="size-5" />
				<h2 className="font-semibold">This Week</h2>
			</div>
		</CardHeader>
		<CardContent>
			<div className="grid grid-cols-2 @md:grid-cols-4 gap-4">
				{summary.map((item, i) => (
					<div key={i} className="text-center p-3 rounded-lg bg-muted/30">
						<p className="text-2xl font-bold">{item.value}</p>
						<p className="text-sm text-muted-foreground">{item.label}</p>
						<p className={`text-xs mt-1 ${item.positive ? 'text-green-500' : 'text-red-500'}`}>
							{item.change}
						</p>
					</div>
				))}
			</div>
		</CardContent>
	</Card>
);

const Challenges = ({
	challenges,
}: {
	challenges: { title: string; progress: number; reward: string; daysLeft: number }[];
}) => (
	<Card>
		<CardHeader className="pb-3">
			<div className="flex items-center gap-2">
				<Trophy className="size-5 text-amber-500" />
				<h2 className="font-semibold">Active Challenges</h2>
			</div>
		</CardHeader>
		<CardContent className="space-y-4">
			{challenges.map((challenge, i) => (
				<div key={i} className="space-y-2">
					<div className="flex items-center justify-between">
						<p className="font-medium">{challenge.title}</p>
						<Badge variant="secondary">{challenge.daysLeft}d left</Badge>
					</div>
					<Progress value={challenge.progress} className="h-2" />
					<div className="flex items-center justify-between text-sm text-muted-foreground">
						<span>{challenge.progress}% complete</span>
						<span className="flex items-center gap-1">
							<Award className="size-3" />
							{challenge.reward}
						</span>
					</div>
				</div>
			))}
		</CardContent>
	</Card>
);

export default function Main() {
	const profileData = {
		header: {
			src: 'https://images.unsplash.com/photo-1571019614242-c5c5dee9f50b?w=400&h=400&fit=crop&crop=face',
			fallback: 'MR',
			name: 'Marcus Rodriguez',
			level: 'Elite Athlete',
			fitnessAge: 28,
		},
		todayStats: [
			{ icon: Footprints, label: 'Steps', value: '8,542', target: '10,000', progress: 85, color: 'bg-blue-500' },
			{ icon: Flame, label: 'Calories', value: '1,847', target: '2,500', progress: 74, color: 'bg-orange-500' },
			{ icon: Timer, label: 'Active', value: '52 min', target: '60 min', progress: 87, color: 'bg-green-500' },
			{ icon: Moon, label: 'Sleep', value: '7h 23m', target: '8h', progress: 92, color: 'bg-purple-500' },
		],
		rings: {
			move: { current: 425, goal: 500 },
			exercise: { current: 45, goal: 60 },
			stand: { current: 10, goal: 12 },
		},
		recentWorkouts: [
			{ type: 'Running', duration: '45 min', calories: '456', date: 'Today', icon: Activity },
			{ type: 'Weight Training', duration: '1h 15m', calories: '380', date: 'Yesterday', icon: Dumbbell },
			{ type: 'Yoga', duration: '30 min', calories: '120', date: '2 days ago', icon: Zap },
		],
		weeklySummary: [
			{ label: 'Workouts', value: '6', change: '+2 vs last week', positive: true },
			{ label: 'Active Min', value: '285', change: '+45 min', positive: true },
			{ label: 'Avg Steps', value: '9.2K', change: '-500 steps', positive: false },
			{ label: 'Calories', value: '12.5K', change: '+1.2K', positive: true },
		],
		challenges: [
			{ title: 'Run 50km this month', progress: 72, reward: '500 XP', daysLeft: 8 },
			{ title: 'Complete 20 workouts', progress: 85, reward: 'Gold Badge', daysLeft: 8 },
		],
	};

	return (
		<section className="@container">
			<div className="mx-auto max-w-2xl px-4 @sm:px-6 @lg:px-8 py-8 @md:py-12 space-y-4">
				<FitnessHeader {...profileData.header} />
				<TodayStats stats={profileData.todayStats} />
				<ActiveRings {...profileData.rings} />
				<RecentWorkouts workouts={profileData.recentWorkouts} />
				<WeeklySummary summary={profileData.weeklySummary} />
				<Challenges challenges={profileData.challenges} />
			</div>
		</section>
	);
}
