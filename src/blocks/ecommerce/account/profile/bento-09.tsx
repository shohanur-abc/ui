import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import {
	Activity,
	ArrowRight,
	Calendar,
	ChevronRight,
	Clock,
	Dumbbell,
	Flame,
	Heart,
	MapPin,
	Medal,
	Moon,
	Ruler,
	Scale,
	Settings,
	Target,
	Trophy,
	TrendingUp,
	Zap,
} from 'lucide-react';
import Link from 'next/link';

const FitnessProfileCard = ({
	src,
	fallback,
	name,
	goal,
	streak,
	level,
}: {
	src: string;
	fallback: string;
	name: string;
	goal: string;
	streak: number;
	level: number;
}) => (
	<Card className="col-span-full @lg:col-span-2 bg-gradient-to-br from-orange-500/20 via-background to-red-500/20">
		<CardContent className="p-6">
			<div className="flex flex-col @sm:flex-row @sm:items-center gap-4">
				<div className="relative">
					<Avatar className="size-20 ring-4 ring-orange-500/30">
						<AvatarImage src={src} alt={name} />
						<AvatarFallback className="bg-orange-500 text-white text-2xl">
							{fallback}
						</AvatarFallback>
					</Avatar>
					<div className="absolute -bottom-1 -right-1 bg-orange-500 text-white text-xs font-bold rounded-full size-7 flex items-center justify-center ring-2 ring-background">
						{level}
					</div>
				</div>
				<div className="flex-1">
					<h2 className="text-xl font-bold">{name}</h2>
					<p className="text-muted-foreground text-sm">{goal}</p>
					<div className="flex items-center gap-4 mt-2">
						<div className="flex items-center gap-1">
							<Flame className="size-4 text-orange-500" />
							<span className="text-sm font-medium">{streak} day streak</span>
						</div>
						<Badge className="bg-orange-500/20 text-orange-600">
							Level {level}
						</Badge>
					</div>
				</div>
				<Button variant="outline" className="gap-2" asChild>
					<Link href="/fitness/settings">
						<Settings className="size-4" />
						Settings
					</Link>
				</Button>
			</div>
		</CardContent>
	</Card>
);

const DailyGoalsCard = ({
	items,
}: {
	items: {
		icon: React.ElementType;
		label: string;
		current: number;
		target: number;
		unit: string;
		color: string;
	}[];
}) => (
	<Card className="row-span-2">
		<CardContent className="p-4 h-full flex flex-col">
			<div className="flex items-center gap-2 mb-4">
				<Target className="size-5 text-primary" />
				<h3 className="font-medium">Today&apos;s Goals</h3>
			</div>
			<div className="flex-1 space-y-4">
				{items.map((goal, i) => (
					<div key={i} className="space-y-2">
						<div className="flex items-center justify-between">
							<div className="flex items-center gap-2">
								<goal.icon className={`size-4 ${goal.color}`} />
								<span className="text-sm">{goal.label}</span>
							</div>
							<span className="text-sm font-medium">
								{goal.current}/{goal.target} {goal.unit}
							</span>
						</div>
						<Progress
							value={(goal.current / goal.target) * 100}
							className="h-2"
						/>
					</div>
				))}
			</div>
			<Button variant="outline" size="sm" className="w-full mt-4" asChild>
				<Link href="/fitness/log">Log Activity</Link>
			</Button>
		</CardContent>
	</Card>
);

const WeeklyStatsCard = ({
	workouts,
	calories,
	activeMinutes,
}: {
	workouts: number;
	calories: number;
	activeMinutes: number;
}) => (
	<Card>
		<CardContent className="p-4">
			<div className="flex items-center gap-2 mb-4">
				<Activity className="size-5 text-muted-foreground" />
				<h3 className="font-medium">This Week</h3>
			</div>
			<div className="grid grid-cols-3 gap-2 text-center">
				<div className="p-2 rounded-lg bg-blue-500/10">
					<Dumbbell className="size-4 mx-auto mb-1 text-blue-500" />
					<p className="text-lg font-bold">{workouts}</p>
					<p className="text-xs text-muted-foreground">Workouts</p>
				</div>
				<div className="p-2 rounded-lg bg-orange-500/10">
					<Flame className="size-4 mx-auto mb-1 text-orange-500" />
					<p className="text-lg font-bold">{calories}</p>
					<p className="text-xs text-muted-foreground">Calories</p>
				</div>
				<div className="p-2 rounded-lg bg-green-500/10">
					<Clock className="size-4 mx-auto mb-1 text-green-500" />
					<p className="text-lg font-bold">{activeMinutes}</p>
					<p className="text-xs text-muted-foreground">Minutes</p>
				</div>
			</div>
		</CardContent>
	</Card>
);

const BodyMetricsCard = ({
	weight,
	weightChange,
	height,
	bmi,
}: {
	weight: string;
	weightChange: string;
	height: string;
	bmi: string;
}) => (
	<Card>
		<CardContent className="p-4 space-y-3">
			<div className="flex items-center justify-between">
				<div className="flex items-center gap-2">
					<Scale className="size-5 text-muted-foreground" />
					<h3 className="font-medium">Body Metrics</h3>
				</div>
				<Button variant="ghost" size="icon" className="size-8" asChild>
					<Link href="/fitness/metrics">
						<ChevronRight className="size-4" />
					</Link>
				</Button>
			</div>
			<div className="grid grid-cols-2 gap-3">
				<div className="p-2 rounded-lg bg-muted/30">
					<div className="flex items-center gap-1">
						<Scale className="size-3 text-muted-foreground" />
						<span className="text-xs text-muted-foreground">Weight</span>
					</div>
					<p className="font-bold">{weight}</p>
					<p className="text-xs text-green-500">{weightChange}</p>
				</div>
				<div className="p-2 rounded-lg bg-muted/30">
					<div className="flex items-center gap-1">
						<Ruler className="size-3 text-muted-foreground" />
						<span className="text-xs text-muted-foreground">Height</span>
					</div>
					<p className="font-bold">{height}</p>
				</div>
			</div>
			<div className="p-2 rounded-lg bg-muted/30 text-center">
				<span className="text-xs text-muted-foreground">BMI:</span>
				<span className="font-bold ml-1">{bmi}</span>
				<Badge className="ml-2 bg-green-500/20 text-green-600">Healthy</Badge>
			</div>
		</CardContent>
	</Card>
);

const AchievementsCard = ({
	recent,
	total,
}: {
	recent: {
		icon: React.ElementType;
		title: string;
		date: string;
		color: string;
	}[];
	total: number;
}) => (
	<Card className="col-span-full @lg:col-span-2">
		<CardContent className="p-4">
			<div className="flex items-center justify-between mb-4">
				<div className="flex items-center gap-2">
					<Trophy className="size-5 text-amber-500" />
					<h3 className="font-medium">Achievements</h3>
				</div>
				<Badge variant="outline">{total} Earned</Badge>
			</div>
			<div className="grid @sm:grid-cols-3 gap-3">
				{recent.map((achievement, i) => (
					<div
						key={i}
						className="flex items-center gap-3 p-3 rounded-lg bg-muted/30"
					>
						<div className={`p-2 rounded-lg ${achievement.color}`}>
							<achievement.icon className="size-5" />
						</div>
						<div className="min-w-0">
							<p className="text-sm font-medium truncate">
								{achievement.title}
							</p>
							<p className="text-xs text-muted-foreground">
								{achievement.date}
							</p>
						</div>
					</div>
				))}
			</div>
			<Button variant="ghost" size="sm" className="w-full mt-4" asChild>
				<Link href="/fitness/achievements">View All Achievements</Link>
			</Button>
		</CardContent>
	</Card>
);

const SleepCard = ({ hours, quality }: { hours: string; quality: string }) => (
	<Card className="bg-gradient-to-br from-indigo-500/10 to-purple-500/10">
		<CardContent className="p-4">
			<div className="flex items-center gap-2 mb-3">
				<Moon className="size-5 text-indigo-500" />
				<h3 className="font-medium">Last Night</h3>
			</div>
			<div className="flex items-center justify-between">
				<div>
					<p className="text-2xl font-bold">{hours}</p>
					<p className="text-sm text-muted-foreground">hours of sleep</p>
				</div>
				<Badge className="bg-indigo-500/20 text-indigo-600">{quality}</Badge>
			</div>
		</CardContent>
	</Card>
);

export default function Main() {
	const profileData = {
		profile: {
			src: 'https://images.unsplash.com/photo-1568602471122-7832951cc4c5?w=400&h=400&fit=crop&crop=face',
			fallback: 'MK',
			name: 'Marcus King',
			goal: 'Building muscle & improving endurance',
			streak: 21,
			level: 15,
		},
		dailyGoals: [
			{
				icon: Flame,
				label: 'Calories',
				current: 1850,
				target: 2500,
				unit: 'kcal',
				color: 'text-orange-500',
			},
			{
				icon: Dumbbell,
				label: 'Steps',
				current: 7234,
				target: 10000,
				unit: '',
				color: 'text-blue-500',
			},
			{
				icon: Heart,
				label: 'Active Minutes',
				current: 42,
				target: 60,
				unit: 'min',
				color: 'text-red-500',
			},
			{
				icon: Zap,
				label: 'Water',
				current: 6,
				target: 8,
				unit: 'glasses',
				color: 'text-cyan-500',
			},
		],
		weeklyStats: {
			workouts: 5,
			calories: 12500,
			activeMinutes: 320,
		},
		bodyMetrics: {
			weight: '78 kg',
			weightChange: '-1.2 kg',
			height: '182 cm',
			bmi: '23.5',
		},
		achievements: {
			recent: [
				{
					icon: Medal,
					title: '21 Day Streak',
					date: 'Today',
					color: 'bg-amber-500/20 text-amber-500',
				},
				{
					icon: Trophy,
					title: '100km Runner',
					date: 'Yesterday',
					color: 'bg-blue-500/20 text-blue-500',
				},
				{
					icon: Zap,
					title: 'Early Bird',
					date: '3 days ago',
					color: 'bg-purple-500/20 text-purple-500',
				},
			],
			total: 24,
		},
		sleep: {
			hours: '7h 23m',
			quality: 'Good',
		},
	};

	return (
		<section className="@container">
			<div className="mx-auto max-w-4xl px-4 @sm:px-6 @lg:px-8 py-8 @md:py-12">
				<div className="grid grid-cols-1 @md:grid-cols-2 @lg:grid-cols-3 gap-4">
					<FitnessProfileCard {...profileData.profile} />
					<DailyGoalsCard items={profileData.dailyGoals} />
					<WeeklyStatsCard {...profileData.weeklyStats} />
					<BodyMetricsCard {...profileData.bodyMetrics} />
					<AchievementsCard {...profileData.achievements} />
					<SleepCard {...profileData.sleep} />
				</div>
			</div>
		</section>
	);
}
