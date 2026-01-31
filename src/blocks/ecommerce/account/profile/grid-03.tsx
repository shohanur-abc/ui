import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import {
	Activity,
	Apple,
	Award,
	Beef,
	Clock,
	Dumbbell,
	Flame,
	Footprints,
	Heart,
	Moon,
	Plus,
	Scale,
	Target,
	Timer,
	TrendingDown,
	TrendingUp,
	Utensils,
	Zap,
} from 'lucide-react';

const FitnessProfileCard = ({
	src,
	fallback,
	name,
	goal,
	streak,
}: {
	src: string;
	fallback: string;
	name: string;
	goal: string;
	streak: number;
}) => (
	<Card className="col-span-full @lg:col-span-2 bg-gradient-to-br from-violet-500/10 to-purple-500/10">
		<CardContent className="p-6">
			<div className="flex items-center gap-4">
				<Avatar className="size-16 ring-4 ring-violet-500/30">
					<AvatarImage src={src} alt={name} />
					<AvatarFallback className="text-xl">{fallback}</AvatarFallback>
				</Avatar>
				<div className="flex-1">
					<h1 className="text-xl font-bold">{name}</h1>
					<Badge variant="outline">{goal}</Badge>
				</div>
				<div className="text-center p-3 rounded-lg bg-orange-500/10">
					<Flame className="size-6 text-orange-500 mx-auto" />
					<p className="text-lg font-bold">{streak}</p>
					<p className="text-xs text-muted-foreground">Day Streak</p>
				</div>
			</div>
		</CardContent>
	</Card>
);

const CalorieRingCard = ({
	consumed,
	burned,
	target,
	remaining,
}: {
	consumed: number;
	burned: number;
	target: number;
	remaining: number;
}) => (
	<Card className="col-span-2 row-span-2">
		<CardHeader className="pb-2">
			<h3 className="font-semibold flex items-center gap-2">
				<Flame className="size-5 text-orange-500" />
				Calories
			</h3>
		</CardHeader>
		<CardContent className="flex flex-col items-center justify-center">
			<div className="relative size-40">
				<svg className="size-40 -rotate-90">
					<circle cx="80" cy="80" r="70" fill="none" stroke="currentColor" strokeWidth="12" className="text-muted" />
					<circle
						cx="80" cy="80" r="70"
						fill="none" stroke="currentColor" strokeWidth="12"
						strokeDasharray={`${(consumed / target) * 440} 440`}
						strokeLinecap="round"
						className="text-orange-500"
					/>
				</svg>
				<div className="absolute inset-0 flex flex-col items-center justify-center">
					<p className="text-3xl font-bold">{consumed}</p>
					<p className="text-sm text-muted-foreground">of {target}</p>
				</div>
			</div>
			<div className="grid grid-cols-2 gap-4 w-full mt-4">
				<div className="text-center p-2 rounded-lg bg-green-500/10">
					<Utensils className="size-4 text-green-500 mx-auto" />
					<p className="font-semibold">{consumed}</p>
					<p className="text-xs text-muted-foreground">Consumed</p>
				</div>
				<div className="text-center p-2 rounded-lg bg-red-500/10">
					<Activity className="size-4 text-red-500 mx-auto" />
					<p className="font-semibold">{burned}</p>
					<p className="text-xs text-muted-foreground">Burned</p>
				</div>
			</div>
		</CardContent>
	</Card>
);

const MacroCard = ({
	name,
	current,
	target,
	unit,
	icon: Icon,
	color,
}: {
	name: string;
	current: number;
	target: number;
	unit: string;
	icon: React.ElementType;
	color: string;
}) => (
	<Card>
		<CardContent className="p-4">
			<div className="flex items-center gap-2 mb-2">
				<Icon className={`size-4 ${color}`} />
				<span className="text-sm font-medium">{name}</span>
			</div>
			<p className="text-xl font-bold">{current}<span className="text-sm text-muted-foreground">/{target}{unit}</span></p>
			<Progress value={(current / target) * 100} className="h-1.5 mt-2" />
		</CardContent>
	</Card>
);

const ActivityStatCard = ({
	icon: Icon,
	label,
	value,
	unit,
	target,
	color,
}: {
	icon: React.ElementType;
	label: string;
	value: string;
	unit: string;
	target: string;
	color: string;
}) => (
	<Card>
		<CardContent className="p-4">
			<Icon className={`size-6 ${color} mb-2`} />
			<p className="text-2xl font-bold">{value}<span className="text-sm text-muted-foreground">{unit}</span></p>
			<p className="text-xs text-muted-foreground">{label}</p>
			<p className="text-xs text-muted-foreground mt-1">Goal: {target}</p>
		</CardContent>
	</Card>
);

const WorkoutCard = ({
	name,
	duration,
	calories,
	time,
	type,
}: {
	name: string;
	duration: string;
	calories: number;
	time: string;
	type: string;
}) => (
	<Card>
		<CardContent className="p-4">
			<div className="flex items-center justify-between mb-2">
				<Badge variant="secondary">{type}</Badge>
				<span className="text-xs text-muted-foreground">{time}</span>
			</div>
			<p className="font-semibold">{name}</p>
			<div className="flex items-center gap-3 mt-2 text-xs text-muted-foreground">
				<span className="flex items-center gap-1">
					<Clock className="size-3" />
					{duration}
				</span>
				<span className="flex items-center gap-1">
					<Flame className="size-3" />
					{calories} cal
				</span>
			</div>
		</CardContent>
	</Card>
);

const WeeklyProgressCard = ({
	data,
}: {
	data: { day: string; value: number; target: number }[];
}) => (
	<Card className="col-span-full @lg:col-span-2">
		<CardHeader className="pb-2">
			<h3 className="font-semibold">Weekly Activity</h3>
		</CardHeader>
		<CardContent>
			<div className="flex items-end justify-between gap-2 h-24">
				{data.map((day, i) => (
					<div key={i} className="flex-1 flex flex-col items-center gap-1">
						<div className="relative w-full h-20 bg-muted rounded-t overflow-hidden">
							<div
								className="absolute bottom-0 w-full bg-primary rounded-t transition-all"
								style={{ height: `${(day.value / day.target) * 100}%` }}
							/>
						</div>
						<span className="text-xs text-muted-foreground">{day.day}</span>
					</div>
				))}
			</div>
		</CardContent>
	</Card>
);

const SleepCard = ({
	hours,
	quality,
	bedtime,
	wakeup,
}: {
	hours: number;
	quality: number;
	bedtime: string;
	wakeup: string;
}) => (
	<Card className="col-span-2 bg-gradient-to-br from-indigo-500/10 to-blue-500/10">
		<CardContent className="p-4">
			<div className="flex items-center gap-2 mb-3">
				<Moon className="size-5 text-indigo-500" />
				<span className="font-semibold">Sleep</span>
			</div>
			<div className="grid grid-cols-4 gap-2 text-center">
				<div>
					<p className="text-xl font-bold">{hours}h</p>
					<p className="text-xs text-muted-foreground">Duration</p>
				</div>
				<div>
					<p className="text-xl font-bold">{quality}%</p>
					<p className="text-xs text-muted-foreground">Quality</p>
				</div>
				<div>
					<p className="text-xl font-bold">{bedtime}</p>
					<p className="text-xs text-muted-foreground">Bedtime</p>
				</div>
				<div>
					<p className="text-xl font-bold">{wakeup}</p>
					<p className="text-xs text-muted-foreground">Wake Up</p>
				</div>
			</div>
		</CardContent>
	</Card>
);

const GoalCard = ({
	title,
	current,
	target,
	unit,
	change,
	positive,
}: {
	title: string;
	current: string;
	target: string;
	unit: string;
	change: string;
	positive: boolean;
}) => (
	<Card>
		<CardContent className="p-4">
			<div className="flex items-center justify-between mb-2">
				<Target className="size-5 text-muted-foreground" />
				<span className={`text-xs flex items-center gap-1 ${positive ? 'text-green-500' : 'text-red-500'}`}>
					{positive ? <TrendingDown className="size-3" /> : <TrendingUp className="size-3" />}
					{change}
				</span>
			</div>
			<p className="text-sm text-muted-foreground">{title}</p>
			<p className="text-xl font-bold">{current} <span className="text-sm text-muted-foreground">/ {target} {unit}</span></p>
		</CardContent>
	</Card>
);

export default function Main() {
	const profileData = {
		user: {
			src: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=200',
			fallback: 'AR',
			name: 'Amanda Rodriguez',
			goal: 'Weight Loss',
			streak: 28,
		},
		calories: { consumed: 1450, burned: 420, target: 2000, remaining: 970 },
		macros: [
			{ name: 'Protein', current: 85, target: 120, unit: 'g', icon: Beef, color: 'text-red-500' },
			{ name: 'Carbs', current: 145, target: 200, unit: 'g', icon: Apple, color: 'text-amber-500' },
			{ name: 'Fats', current: 48, target: 65, unit: 'g', icon: Zap, color: 'text-purple-500' },
		],
		activities: [
			{ icon: Footprints, label: 'Steps', value: '8,432', unit: '', target: '10,000', color: 'text-blue-500' },
			{ icon: Timer, label: 'Active Time', value: '45', unit: ' min', target: '60 min', color: 'text-green-500' },
		],
		workouts: [
			{ name: 'Morning Run', duration: '32 min', calories: 320, time: '7:00 AM', type: 'Cardio' },
			{ name: 'Upper Body', duration: '45 min', calories: 280, time: 'Yesterday', type: 'Strength' },
		],
		weeklyProgress: [
			{ day: 'M', value: 8500, target: 10000 },
			{ day: 'T', value: 12000, target: 10000 },
			{ day: 'W', value: 9200, target: 10000 },
			{ day: 'T', value: 11500, target: 10000 },
			{ day: 'F', value: 7800, target: 10000 },
			{ day: 'S', value: 14000, target: 10000 },
			{ day: 'S', value: 8432, target: 10000 },
		],
		sleep: { hours: 7.5, quality: 85, bedtime: '11:00', wakeup: '6:30' },
		goals: [
			{ title: 'Current Weight', current: '156', target: '145', unit: 'lbs', change: '-2.5 lbs', positive: true },
			{ title: 'Body Fat', current: '24', target: '20', unit: '%', change: '-1.2%', positive: true },
		],
	};

	return (
		<section className="@container">
			<div className="mx-auto max-w-4xl px-4 @sm:px-6 @lg:px-8 py-8 @md:py-12">
				<div className="grid grid-cols-2 @lg:grid-cols-4 gap-4">
					<FitnessProfileCard {...profileData.user} />
					{profileData.activities.map((stat, i) => (
						<ActivityStatCard key={i} {...stat} />
					))}
					<CalorieRingCard {...profileData.calories} />
					{profileData.macros.map((macro, i) => (
						<MacroCard key={i} {...macro} />
					))}
					<SleepCard {...profileData.sleep} />
					{profileData.workouts.map((workout, i) => (
						<WorkoutCard key={i} {...workout} />
					))}
					<WeeklyProgressCard data={profileData.weeklyProgress} />
					{profileData.goals.map((goal, i) => (
						<GoalCard key={i} {...goal} />
					))}
				</div>
			</div>
		</section>
	);
}
