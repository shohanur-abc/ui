import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import {
	Award,
	Bell,
	Calendar,
	ChefHat,
	Clock,
	Flame,
	Heart,
	LineChart,
	ListChecks,
	Plus,
	Scale,
	ShoppingCart,
	Star,
	Target,
	Timer,
	TrendingDown,
	TrendingUp,
	Utensils,
} from 'lucide-react';
import Image from 'next/image';

const NutritionHeader = ({
	src,
	fallback,
	name,
	goal,
	currentWeight,
	targetWeight,
}: {
	src: string;
	fallback: string;
	name: string;
	goal: string;
	currentWeight: string;
	targetWeight: string;
}) => (
	<Card className="bg-gradient-to-r from-lime-500/10 to-green-500/10">
		<CardContent className="p-6">
			<div className="flex flex-col @md:flex-row items-center gap-6">
				<Avatar className="size-20 ring-4 ring-lime-500/20">
					<AvatarImage src={src} alt={name} />
					<AvatarFallback className="text-xl bg-lime-500 text-white">
						{fallback}
					</AvatarFallback>
				</Avatar>
				<div className="text-center @md:text-left flex-1">
					<h1 className="text-2xl font-bold">{name}</h1>
					<Badge className="bg-lime-500/20 text-lime-600 mt-1">{goal}</Badge>
					<div className="flex items-center justify-center @md:justify-start gap-6 mt-3 text-sm">
						<div className="flex items-center gap-2">
							<Scale className="size-4 text-muted-foreground" />
							<span>
								Current: <strong>{currentWeight}</strong>
							</span>
						</div>
						<div className="flex items-center gap-2">
							<Target className="size-4 text-muted-foreground" />
							<span>
								Target: <strong>{targetWeight}</strong>
							</span>
						</div>
					</div>
				</div>
				<Button className="gap-2">
					<Plus className="size-4" />
					Log Meal
				</Button>
			</div>
		</CardContent>
	</Card>
);

const DailyCalories = ({
	consumed,
	target,
	burned,
	remaining,
}: {
	consumed: number;
	target: number;
	burned: number;
	remaining: number;
}) => (
	<Card>
		<CardHeader className="pb-3">
			<div className="flex items-center justify-between">
				<h2 className="font-semibold">Today's Calories</h2>
				<Badge variant="outline">
					{remaining > 0 ? `${remaining} cal left` : 'Goal reached!'}
				</Badge>
			</div>
		</CardHeader>
		<CardContent>
			<div className="flex items-center justify-center gap-8">
				<div className="relative size-32">
					<svg className="size-32 -rotate-90">
						<circle
							cx="64"
							cy="64"
							r="56"
							fill="none"
							stroke="currentColor"
							strokeWidth="8"
							className="text-muted"
						/>
						<circle
							cx="64"
							cy="64"
							r="56"
							fill="none"
							stroke="currentColor"
							strokeWidth="8"
							strokeDasharray={`${Math.min((consumed / target) * 352, 352)} 352`}
							strokeLinecap="round"
							className="text-lime-500"
						/>
					</svg>
					<div className="absolute inset-0 flex flex-col items-center justify-center">
						<p className="text-2xl font-bold">{consumed}</p>
						<p className="text-xs text-muted-foreground">of {target} cal</p>
					</div>
				</div>
				<div className="space-y-4">
					<div className="flex items-center gap-3">
						<div className="p-2 rounded-lg bg-lime-500/10">
							<Utensils className="size-4 text-lime-500" />
						</div>
						<div>
							<p className="text-sm text-muted-foreground">Consumed</p>
							<p className="font-semibold">{consumed} cal</p>
						</div>
					</div>
					<div className="flex items-center gap-3">
						<div className="p-2 rounded-lg bg-orange-500/10">
							<Flame className="size-4 text-orange-500" />
						</div>
						<div>
							<p className="text-sm text-muted-foreground">Burned</p>
							<p className="font-semibold">{burned} cal</p>
						</div>
					</div>
				</div>
			</div>
		</CardContent>
	</Card>
);

const Macros = ({
	macros,
}: {
	macros: {
		name: string;
		current: number;
		target: number;
		unit: string;
		color: string;
	}[];
}) => (
	<Card>
		<CardHeader className="pb-3">
			<h2 className="font-semibold">Macros</h2>
		</CardHeader>
		<CardContent className="space-y-4">
			{macros.map((macro, i) => (
				<div key={i} className="space-y-2">
					<div className="flex items-center justify-between text-sm">
						<span className="font-medium">{macro.name}</span>
						<span>
							{macro.current}
							{macro.unit} / {macro.target}
							{macro.unit}
						</span>
					</div>
					<div className="h-2 rounded-full bg-muted overflow-hidden">
						<div
							className={`h-full rounded-full ${macro.color}`}
							style={{
								width: `${Math.min((macro.current / macro.target) * 100, 100)}%`,
							}}
						/>
					</div>
				</div>
			))}
		</CardContent>
	</Card>
);

const MealLog = ({
	meals,
}: {
	meals: {
		type: string;
		time: string;
		items: { name: string; calories: number }[];
		totalCalories: number;
	}[];
}) => (
	<Card>
		<CardHeader className="pb-3">
			<div className="flex items-center justify-between">
				<h2 className="font-semibold">Meal Log</h2>
				<Button variant="ghost" size="sm">
					<Plus className="size-4 mr-1" />
					Add Meal
				</Button>
			</div>
		</CardHeader>
		<CardContent className="space-y-4">
			{meals.map((meal, i) => (
				<div key={i} className="p-3 rounded-lg bg-muted/30">
					<div className="flex items-center justify-between mb-2">
						<div className="flex items-center gap-2">
							<ChefHat className="size-4 text-muted-foreground" />
							<span className="font-medium">{meal.type}</span>
						</div>
						<div className="flex items-center gap-2 text-sm text-muted-foreground">
							<Clock className="size-3" />
							{meal.time}
						</div>
					</div>
					<div className="space-y-1">
						{meal.items.map((item, j) => (
							<div
								key={j}
								className="flex items-center justify-between text-sm"
							>
								<span>{item.name}</span>
								<span className="text-muted-foreground">
									{item.calories} cal
								</span>
							</div>
						))}
					</div>
					<div className="flex items-center justify-between mt-2 pt-2 border-t">
						<span className="text-sm font-medium">Total</span>
						<span className="font-semibold">{meal.totalCalories} cal</span>
					</div>
				</div>
			))}
		</CardContent>
	</Card>
);

const WeightProgress = ({
	data,
	weeklyChange,
	positive,
}: {
	data: { date: string; weight: number }[];
	weeklyChange: string;
	positive: boolean;
}) => (
	<Card>
		<CardHeader className="pb-3">
			<div className="flex items-center justify-between">
				<h2 className="font-semibold flex items-center gap-2">
					<LineChart className="size-5" />
					Weight Progress
				</h2>
				<div
					className={`flex items-center gap-1 ${positive ? 'text-green-500' : 'text-red-500'}`}
				>
					{positive ? (
						<TrendingDown className="size-4" />
					) : (
						<TrendingUp className="size-4" />
					)}
					<span className="text-sm font-medium">{weeklyChange}</span>
				</div>
			</div>
		</CardHeader>
		<CardContent>
			<div className="flex items-end justify-between gap-2 h-24">
				{data.map((point, i) => (
					<div key={i} className="flex-1 flex flex-col items-center gap-1">
						<div
							className="w-full bg-primary rounded-t transition-all"
							style={{ height: `${((point.weight - 150) / 20) * 100}%` }}
						/>
						<span className="text-xs text-muted-foreground">{point.date}</span>
					</div>
				))}
			</div>
		</CardContent>
	</Card>
);

const WaterIntake = ({
	current,
	target,
}: {
	current: number;
	target: number;
}) => (
	<Card>
		<CardContent className="p-4">
			<div className="flex items-center justify-between">
				<div className="flex items-center gap-3">
					<div className="relative">
						<div className="size-12 rounded-full border-4 border-blue-500 flex items-center justify-center">
							<span className="text-lg">💧</span>
						</div>
					</div>
					<div>
						<p className="font-medium">Water Intake</p>
						<p className="text-sm text-muted-foreground">
							{current} of {target} glasses
						</p>
					</div>
				</div>
				<div className="flex gap-1">
					{Array.from({ length: target }).map((_, i) => (
						<div
							key={i}
							className={`w-2 h-8 rounded-full ${i < current ? 'bg-blue-500' : 'bg-muted'}`}
						/>
					))}
				</div>
			</div>
		</CardContent>
	</Card>
);

const Streaks = ({
	streaks,
}: {
	streaks: {
		label: string;
		days: number;
		icon: React.ElementType;
		active: boolean;
	}[];
}) => (
	<Card>
		<CardHeader className="pb-3">
			<h2 className="font-semibold flex items-center gap-2">
				<Award className="size-5 text-amber-500" />
				Streaks
			</h2>
		</CardHeader>
		<CardContent>
			<div className="grid grid-cols-3 gap-4">
				{streaks.map((streak, i) => (
					<div
						key={i}
						className={`text-center p-3 rounded-lg ${streak.active ? 'bg-amber-500/10' : 'bg-muted/30'}`}
					>
						<streak.icon
							className={`size-6 mx-auto ${streak.active ? 'text-amber-500' : 'text-muted-foreground'}`}
						/>
						<p className="text-xl font-bold mt-1">{streak.days}</p>
						<p className="text-xs text-muted-foreground">{streak.label}</p>
					</div>
				))}
			</div>
		</CardContent>
	</Card>
);

export default function Main() {
	const profileData = {
		header: {
			src: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=400&h=400&fit=crop&crop=face',
			fallback: 'EW',
			name: 'Emma Wilson',
			goal: 'Weight Loss',
			currentWeight: '165 lbs',
			targetWeight: '150 lbs',
		},
		calories: { consumed: 1456, target: 1800, burned: 320, remaining: 664 },
		macros: [
			{
				name: 'Protein',
				current: 85,
				target: 120,
				unit: 'g',
				color: 'bg-red-500',
			},
			{
				name: 'Carbs',
				current: 145,
				target: 180,
				unit: 'g',
				color: 'bg-blue-500',
			},
			{
				name: 'Fat',
				current: 48,
				target: 60,
				unit: 'g',
				color: 'bg-amber-500',
			},
			{
				name: 'Fiber',
				current: 18,
				target: 25,
				unit: 'g',
				color: 'bg-green-500',
			},
		],
		meals: [
			{
				type: 'Breakfast',
				time: '8:30 AM',
				items: [
					{ name: 'Greek Yogurt with Berries', calories: 180 },
					{ name: 'Whole Grain Toast', calories: 120 },
				],
				totalCalories: 300,
			},
			{
				type: 'Lunch',
				time: '12:45 PM',
				items: [
					{ name: 'Grilled Chicken Salad', calories: 420 },
					{ name: 'Sparkling Water', calories: 0 },
				],
				totalCalories: 420,
			},
			{
				type: 'Snack',
				time: '3:30 PM',
				items: [{ name: 'Apple with Almond Butter', calories: 200 }],
				totalCalories: 200,
			},
		],
		weightProgress: {
			data: [
				{ date: 'Mon', weight: 166 },
				{ date: 'Tue', weight: 165.5 },
				{ date: 'Wed', weight: 165.8 },
				{ date: 'Thu', weight: 165.2 },
				{ date: 'Fri', weight: 165 },
				{ date: 'Sat', weight: 164.5 },
				{ date: 'Sun', weight: 165 },
			],
			weeklyChange: '-1.0 lbs',
			positive: true,
		},
		water: { current: 6, target: 8 },
		streaks: [
			{ label: 'Logging', days: 14, icon: ListChecks, active: true },
			{ label: 'Under Goal', days: 8, icon: Target, active: true },
			{ label: 'Hydrated', days: 3, icon: Timer, active: false },
		],
	};

	return (
		<section className="@container">
			<div className="mx-auto max-w-2xl px-4 @sm:px-6 @lg:px-8 py-8 @md:py-12 space-y-4">
				<NutritionHeader {...profileData.header} />
				<DailyCalories {...profileData.calories} />
				<Macros macros={profileData.macros} />
				<WaterIntake {...profileData.water} />
				<MealLog meals={profileData.meals} />
				<WeightProgress {...profileData.weightProgress} />
				<Streaks streaks={profileData.streaks} />
			</div>
		</section>
	);
}
