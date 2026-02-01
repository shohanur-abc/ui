import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { ScrollArea } from '@/components/ui/scroll-area';
import {
	Target,
	TrendingUp,
	TrendingDown,
	DollarSign,
	Users,
	ShoppingCart,
	Package,
	Calendar,
	ChevronRight,
	type LucideIcon,
} from 'lucide-react';

interface Goal {
	id: string;
	name: string;
	description: string;
	type: 'revenue' | 'orders' | 'customers' | 'products';
	current: number;
	target: number;
	unit: string;
	period: string;
	trend: 'up' | 'down' | 'stable';
	trendValue: string;
	daysRemaining: number;
}

interface GoalTrackerProps {
	title: string;
	goals: Goal[];
	overallProgress: number;
}

const TypeConfig: Record<
	Goal['type'],
	{ icon: LucideIcon; className: string }
> = {
	revenue: {
		icon: DollarSign,
		className: 'bg-emerald-500/20 text-emerald-400',
	},
	orders: { icon: ShoppingCart, className: 'bg-blue-500/20 text-blue-400' },
	customers: { icon: Users, className: 'bg-purple-500/20 text-purple-400' },
	products: { icon: Package, className: 'bg-orange-500/20 text-orange-400' },
};

const GoalCard = ({ goal }: { goal: Goal }) => {
	const config = TypeConfig[goal.type];
	const Icon = config.icon;
	const progress = Math.min((goal.current / goal.target) * 100, 100);
	const isOnTrack = progress >= 70 || goal.daysRemaining > 10;
	const isNearComplete = progress >= 90;

	return (
		<div className="p-4 rounded-xl border border-border/50 bg-card/80 backdrop-blur-sm transition-all hover:shadow-lg">
			<div className="flex items-start gap-4">
				<div
					className={`flex size-10 shrink-0 items-center justify-center rounded-lg ${config.className}`}
				>
					<Icon className="size-5" />
				</div>
				<div className="flex-1 min-w-0">
					<div className="flex items-start justify-between gap-2 mb-2">
						<div>
							<h4 className="font-medium text-foreground">{goal.name}</h4>
							<p className="text-xs text-muted-foreground">
								{goal.description}
							</p>
						</div>
						<Button variant="ghost" size="icon-sm" className="size-7">
							<ChevronRight className="size-4" />
						</Button>
					</div>

					<div className="flex items-center gap-2 mb-3">
						<span className="text-2xl font-bold text-foreground">
							{goal.unit === '$'
								? `${goal.unit}${goal.current.toLocaleString()}`
								: `${goal.current.toLocaleString()}${goal.unit}`}
						</span>
						<span className="text-muted-foreground">
							/{' '}
							{goal.unit === '$'
								? `${goal.unit}${goal.target.toLocaleString()}`
								: `${goal.target.toLocaleString()}${goal.unit}`}
						</span>
						<Badge
							variant="outline"
							className={`ml-auto text-xs gap-1 ${
								goal.trend === 'up'
									? 'bg-emerald-500/10 text-emerald-400 border-emerald-500/30'
									: goal.trend === 'down'
										? 'bg-rose-500/10 text-rose-400 border-rose-500/30'
										: 'bg-muted text-muted-foreground'
							}`}
						>
							{goal.trend === 'up' ? (
								<TrendingUp className="size-3" />
							) : goal.trend === 'down' ? (
								<TrendingDown className="size-3" />
							) : null}
							{goal.trendValue}
						</Badge>
					</div>

					<div className="space-y-2">
						<div className="flex items-center justify-between text-xs">
							<span
								className={
									isNearComplete
										? 'text-emerald-400 font-medium'
										: isOnTrack
											? 'text-foreground'
											: 'text-amber-400'
								}
							>
								{progress.toFixed(1)}% complete
							</span>
							<span className="text-muted-foreground flex items-center gap-1">
								<Calendar className="size-3" />
								{goal.daysRemaining} days left
							</span>
						</div>
						<Progress
							value={progress}
							className={`h-2 ${
								isNearComplete
									? '[&>[data-slot=indicator]]:bg-emerald-500'
									: isOnTrack
										? '[&>[data-slot=indicator]]:bg-primary'
										: '[&>[data-slot=indicator]]:bg-amber-500'
							}`}
						/>
					</div>
				</div>
			</div>
		</div>
	);
};

const OverallProgress = ({
	progress,
	goalsCount,
}: {
	progress: number;
	goalsCount: number;
}) => (
	<div className="p-5 rounded-xl border border-primary/20 bg-primary/5">
		<div className="flex items-center justify-between mb-4">
			<div className="flex items-center gap-3">
				<div className="flex size-12 items-center justify-center rounded-xl bg-primary/20">
					<Target className="size-6 text-primary" />
				</div>
				<div>
					<span className="font-semibold text-foreground block">
						Overall Progress
					</span>
					<span className="text-sm text-muted-foreground">
						{goalsCount} active goals
					</span>
				</div>
			</div>
			<div className="text-right">
				<span className="text-3xl font-bold text-primary block">
					{progress}%
				</span>
				<span className="text-xs text-muted-foreground">on track</span>
			</div>
		</div>
		<Progress value={progress} className="h-3" />
	</div>
);

const GoalTracker = ({ title, goals, overallProgress }: GoalTrackerProps) => (
	<Card className="border-border/50 bg-card/50 backdrop-blur-sm">
		<CardHeader className="flex-row items-center justify-between border-b border-border/50">
			<CardTitle className="text-lg font-semibold flex items-center gap-2">
				<Target className="size-5" />
				{title}
			</CardTitle>
			<Button variant="outline" size="sm">
				Add Goal
			</Button>
		</CardHeader>
		<CardContent className="pt-6 space-y-4">
			<OverallProgress progress={overallProgress} goalsCount={goals.length} />
			<ScrollArea className="h-[350px]">
				<div className="space-y-3 pr-4">
					{goals.map((goal) => (
						<GoalCard key={goal.id} goal={goal} />
					))}
				</div>
			</ScrollArea>
		</CardContent>
	</Card>
);

export default function Main() {
	const goals: Goal[] = [
		{
			id: '1',
			name: 'Monthly Revenue',
			description: 'Hit $100K in monthly sales',
			type: 'revenue',
			current: 78500,
			target: 100000,
			unit: '$',
			period: 'March 2024',
			trend: 'up',
			trendValue: '+12.5%',
			daysRemaining: 12,
		},
		{
			id: '2',
			name: 'Order Volume',
			description: 'Process 500 orders this month',
			type: 'orders',
			current: 423,
			target: 500,
			unit: ' orders',
			period: 'March 2024',
			trend: 'up',
			trendValue: '+8.3%',
			daysRemaining: 12,
		},
		{
			id: '3',
			name: 'New Customers',
			description: 'Acquire 200 new customers',
			type: 'customers',
			current: 156,
			target: 200,
			unit: ' customers',
			period: 'Q1 2024',
			trend: 'stable',
			trendValue: '0%',
			daysRemaining: 25,
		},
		{
			id: '4',
			name: 'Product Launches',
			description: 'Launch 10 new products',
			type: 'products',
			current: 7,
			target: 10,
			unit: ' products',
			period: 'Q1 2024',
			trend: 'down',
			trendValue: '-1 behind',
			daysRemaining: 25,
		},
	];

	return (
		<section className="@container" data-theme="activity">
			<div className="mx-auto max-w-xl px-4 py-8 @sm:px-6 @sm:py-12 @2xl:px-8 @2xl:py-16">
				<GoalTracker title="Goal Tracker" goals={goals} overallProgress={72} />
			</div>
		</section>
	);
}
