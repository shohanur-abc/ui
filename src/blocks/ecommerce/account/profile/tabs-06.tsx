import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Progress } from '@/components/ui/progress';
import {
	Activity,
	Apple,
	Calendar,
	Flame,
	Heart,
	Moon,
	Pill,
	Scale,
	Target,
	Timer,
	TrendingUp,
	Zap,
} from 'lucide-react';

const HealthHeader = ({
	src,
	fallback,
	name,
	healthScore,
	todayProgress,
}: {
	src: string;
	fallback: string;
	name: string;
	healthScore: number;
	todayProgress: number;
}) => (
	<div className="flex flex-col @md:flex-row items-center gap-6 p-6 bg-gradient-to-r from-green-500/10 to-emerald-500/10 rounded-xl">
		<Avatar className="size-20 ring-4 ring-green-500/20">
			<AvatarImage src={src} alt={name} />
			<AvatarFallback className="text-2xl bg-green-500 text-white">{fallback}</AvatarFallback>
		</Avatar>
		<div className="text-center @md:text-left flex-1">
			<h1 className="text-2xl font-bold">{name}</h1>
			<p className="text-muted-foreground">Your health at a glance</p>
			<div className="flex items-center justify-center @md:justify-start gap-6 mt-4">
				<div className="text-center">
					<div className="relative size-16">
						<svg className="size-16 -rotate-90">
							<circle cx="32" cy="32" r="28" fill="none" stroke="currentColor" strokeWidth="4" className="text-muted" />
							<circle
								cx="32" cy="32" r="28"
								fill="none" stroke="currentColor" strokeWidth="4"
								strokeDasharray={`${healthScore * 1.76} 176`}
								className="text-green-500"
							/>
						</svg>
						<span className="absolute inset-0 flex items-center justify-center text-lg font-bold">{healthScore}</span>
					</div>
					<p className="text-xs text-muted-foreground mt-1">Health Score</p>
				</div>
				<div className="text-center">
					<div className="relative size-16">
						<svg className="size-16 -rotate-90">
							<circle cx="32" cy="32" r="28" fill="none" stroke="currentColor" strokeWidth="4" className="text-muted" />
							<circle
								cx="32" cy="32" r="28"
								fill="none" stroke="currentColor" strokeWidth="4"
								strokeDasharray={`${todayProgress * 1.76} 176`}
								className="text-blue-500"
							/>
						</svg>
						<span className="absolute inset-0 flex items-center justify-center text-lg font-bold">{todayProgress}%</span>
					</div>
					<p className="text-xs text-muted-foreground mt-1">Today</p>
				</div>
			</div>
		</div>
	</div>
);

const ActivityTab = ({
	metrics,
	weeklyData,
}: {
	metrics: { icon: React.ElementType; label: string; value: string; target: string; progress: number; color: string }[];
	weeklyData: { day: string; value: number }[];
}) => (
	<div className="space-y-6">
		<div className="grid grid-cols-2 @lg:grid-cols-4 gap-4">
			{metrics.map((metric, i) => (
				<Card key={i}>
					<CardContent className="p-4">
						<div className="flex items-center gap-2 mb-2">
							<metric.icon className={`size-5 ${metric.color}`} />
							<span className="text-sm text-muted-foreground">{metric.label}</span>
						</div>
						<p className="text-2xl font-bold">{metric.value}</p>
						<Progress value={metric.progress} className="h-1.5 mt-2" />
						<p className="text-xs text-muted-foreground mt-1">Goal: {metric.target}</p>
					</CardContent>
				</Card>
			))}
		</div>
		<Card>
			<CardHeader className="pb-3">
				<h3 className="font-semibold">Weekly Activity</h3>
			</CardHeader>
			<CardContent>
				<div className="flex items-end justify-between gap-2 h-32">
					{weeklyData.map((day, i) => (
						<div key={i} className="flex-1 flex flex-col items-center gap-2">
							<div
								className="w-full bg-green-500 rounded-t-lg transition-all"
								style={{ height: `${day.value}%` }}
							/>
							<span className="text-xs text-muted-foreground">{day.day}</span>
						</div>
					))}
				</div>
			</CardContent>
		</Card>
	</div>
);

const NutritionTab = ({
	macros,
	meals,
}: {
	macros: { label: string; current: number; target: number; color: string }[];
	meals: { name: string; time: string; calories: number; items: string[] }[];
}) => (
	<div className="space-y-6">
		<Card>
			<CardHeader className="pb-3">
				<h3 className="font-semibold">Today's Macros</h3>
			</CardHeader>
			<CardContent className="space-y-4">
				{macros.map((macro, i) => (
					<div key={i} className="space-y-2">
						<div className="flex justify-between text-sm">
							<span>{macro.label}</span>
							<span>{macro.current}g / {macro.target}g</span>
						</div>
						<div className="h-2 rounded-full bg-muted overflow-hidden">
							<div className={`h-full rounded-full ${macro.color}`} style={{ width: `${(macro.current / macro.target) * 100}%` }} />
						</div>
					</div>
				))}
			</CardContent>
		</Card>
		<Card>
			<CardHeader className="pb-3">
				<h3 className="font-semibold">Meals Today</h3>
			</CardHeader>
			<CardContent className="space-y-4">
				{meals.map((meal, i) => (
					<div key={i} className="flex items-center justify-between p-3 rounded-lg bg-muted/30">
						<div>
							<p className="font-medium">{meal.name}</p>
							<p className="text-sm text-muted-foreground">{meal.time}</p>
							<p className="text-xs text-muted-foreground mt-1">{meal.items.join(', ')}</p>
						</div>
						<Badge variant="secondary">{meal.calories} cal</Badge>
					</div>
				))}
			</CardContent>
		</Card>
	</div>
);

const SleepTab = ({
	sleepData,
	weeklyAverage,
}: {
	sleepData: { duration: string; quality: string; bedtime: string; wakeTime: string };
	weeklyAverage: { day: string; hours: number }[];
}) => (
	<div className="space-y-6">
		<div className="grid @sm:grid-cols-2 @lg:grid-cols-4 gap-4">
			<Card>
				<CardContent className="p-4 text-center">
					<Moon className="size-6 mx-auto text-purple-500 mb-2" />
					<p className="text-2xl font-bold">{sleepData.duration}</p>
					<p className="text-sm text-muted-foreground">Last Night</p>
				</CardContent>
			</Card>
			<Card>
				<CardContent className="p-4 text-center">
					<Activity className="size-6 mx-auto text-green-500 mb-2" />
					<p className="text-2xl font-bold">{sleepData.quality}</p>
					<p className="text-sm text-muted-foreground">Sleep Quality</p>
				</CardContent>
			</Card>
			<Card>
				<CardContent className="p-4 text-center">
					<Timer className="size-6 mx-auto text-blue-500 mb-2" />
					<p className="text-2xl font-bold">{sleepData.bedtime}</p>
					<p className="text-sm text-muted-foreground">Bedtime</p>
				</CardContent>
			</Card>
			<Card>
				<CardContent className="p-4 text-center">
					<Zap className="size-6 mx-auto text-amber-500 mb-2" />
					<p className="text-2xl font-bold">{sleepData.wakeTime}</p>
					<p className="text-sm text-muted-foreground">Wake Time</p>
				</CardContent>
			</Card>
		</div>
		<Card>
			<CardHeader className="pb-3">
				<h3 className="font-semibold">Weekly Sleep</h3>
			</CardHeader>
			<CardContent>
				<div className="space-y-3">
					{weeklyAverage.map((day, i) => (
						<div key={i} className="flex items-center gap-4">
							<span className="w-12 text-sm">{day.day}</span>
							<div className="flex-1 h-4 bg-muted rounded-full overflow-hidden">
								<div className="h-full bg-purple-500 rounded-full" style={{ width: `${(day.hours / 10) * 100}%` }} />
							</div>
							<span className="text-sm font-medium w-12">{day.hours}h</span>
						</div>
					))}
				</div>
			</CardContent>
		</Card>
	</div>
);

const VitalsTab = ({
	vitals,
}: {
	vitals: { icon: React.ElementType; label: string; value: string; unit: string; status: 'normal' | 'warning' | 'alert'; history: number[] }[];
}) => (
	<div className="grid @md:grid-cols-2 gap-4">
		{vitals.map((vital, i) => (
			<Card key={i}>
				<CardContent className="p-4">
					<div className="flex items-center justify-between mb-3">
						<div className="flex items-center gap-2">
							<vital.icon className={`size-5 ${
								vital.status === 'normal' ? 'text-green-500' :
								vital.status === 'warning' ? 'text-amber-500' : 'text-red-500'
							}`} />
							<span className="font-medium">{vital.label}</span>
						</div>
						<Badge className={
							vital.status === 'normal' ? 'bg-green-500/20 text-green-600' :
							vital.status === 'warning' ? 'bg-amber-500/20 text-amber-600' : 'bg-red-500/20 text-red-600'
						}>
							{vital.status}
						</Badge>
					</div>
					<p className="text-3xl font-bold">{vital.value} <span className="text-lg text-muted-foreground">{vital.unit}</span></p>
					<div className="flex items-end gap-1 mt-3 h-12">
						{vital.history.map((value, j) => (
							<div key={j} className="flex-1 bg-muted rounded-t" style={{ height: `${value}%` }} />
						))}
					</div>
				</CardContent>
			</Card>
		))}
	</div>
);

export default function Main() {
	const profileData = {
		header: {
			src: 'https://images.unsplash.com/photo-1571019614242-c5c5dee9f50b?w=400&h=400&fit=crop&crop=face',
			fallback: 'AJ',
			name: 'Alex Johnson',
			healthScore: 87,
			todayProgress: 72,
		},
		activity: [
			{ icon: Flame, label: 'Calories', value: '1,456', target: '2,000', progress: 73, color: 'text-orange-500' },
			{ icon: Target, label: 'Steps', value: '8,247', target: '10,000', progress: 82, color: 'text-blue-500' },
			{ icon: Timer, label: 'Active', value: '45 min', target: '60 min', progress: 75, color: 'text-green-500' },
			{ icon: Heart, label: 'Heart', value: '72 bpm', target: '60-80', progress: 100, color: 'text-red-500' },
		],
		weeklyActivity: [
			{ day: 'Mon', value: 85 },
			{ day: 'Tue', value: 65 },
			{ day: 'Wed', value: 90 },
			{ day: 'Thu', value: 75 },
			{ day: 'Fri', value: 95 },
			{ day: 'Sat', value: 60 },
			{ day: 'Sun', value: 72 },
		],
		macros: [
			{ label: 'Protein', current: 95, target: 120, color: 'bg-red-500' },
			{ label: 'Carbs', current: 180, target: 250, color: 'bg-blue-500' },
			{ label: 'Fat', current: 55, target: 65, color: 'bg-amber-500' },
		],
		meals: [
			{ name: 'Breakfast', time: '8:00 AM', calories: 420, items: ['Oatmeal', 'Banana', 'Coffee'] },
			{ name: 'Lunch', time: '12:30 PM', calories: 650, items: ['Grilled Chicken', 'Salad', 'Rice'] },
			{ name: 'Snack', time: '3:00 PM', calories: 180, items: ['Protein Bar', 'Apple'] },
		],
		sleepData: { duration: '7h 32m', quality: '85%', bedtime: '11:15 PM', wakeTime: '6:47 AM' },
		weeklySleep: [
			{ day: 'Mon', hours: 7.5 },
			{ day: 'Tue', hours: 6.8 },
			{ day: 'Wed', hours: 8.2 },
			{ day: 'Thu', hours: 7.0 },
			{ day: 'Fri', hours: 6.5 },
			{ day: 'Sat', hours: 9.0 },
			{ day: 'Sun', hours: 7.5 },
		],
		vitals: [
			{ icon: Heart, label: 'Heart Rate', value: '72', unit: 'bpm', status: 'normal' as const, history: [65, 70, 68, 75, 72, 78, 72] },
			{ icon: Activity, label: 'Blood Pressure', value: '120/80', unit: 'mmHg', status: 'normal' as const, history: [80, 85, 82, 78, 80, 83, 80] },
			{ icon: Scale, label: 'Weight', value: '165', unit: 'lbs', status: 'normal' as const, history: [90, 88, 85, 87, 86, 85, 85] },
			{ icon: Zap, label: 'Blood Sugar', value: '95', unit: 'mg/dL', status: 'normal' as const, history: [75, 80, 78, 82, 80, 78, 76] },
		],
	};

	return (
		<section className="@container">
			<div className="mx-auto max-w-5xl px-4 @sm:px-6 @lg:px-8 py-8 @md:py-12">
				<HealthHeader {...profileData.header} />
				<Tabs defaultValue="activity" className="mt-8">
					<TabsList className="w-full justify-start overflow-x-auto">
						<TabsTrigger value="activity" className="gap-2">
							<Flame className="size-4" />
							Activity
						</TabsTrigger>
						<TabsTrigger value="nutrition" className="gap-2">
							<Apple className="size-4" />
							Nutrition
						</TabsTrigger>
						<TabsTrigger value="sleep" className="gap-2">
							<Moon className="size-4" />
							Sleep
						</TabsTrigger>
						<TabsTrigger value="vitals" className="gap-2">
							<Heart className="size-4" />
							Vitals
						</TabsTrigger>
					</TabsList>
					<TabsContent value="activity" className="mt-6">
						<ActivityTab metrics={profileData.activity} weeklyData={profileData.weeklyActivity} />
					</TabsContent>
					<TabsContent value="nutrition" className="mt-6">
						<NutritionTab macros={profileData.macros} meals={profileData.meals} />
					</TabsContent>
					<TabsContent value="sleep" className="mt-6">
						<SleepTab sleepData={profileData.sleepData} weeklyAverage={profileData.weeklySleep} />
					</TabsContent>
					<TabsContent value="vitals" className="mt-6">
						<VitalsTab vitals={profileData.vitals} />
					</TabsContent>
				</Tabs>
			</div>
		</section>
	);
}
