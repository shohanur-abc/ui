import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import {
	Gauge,
	TrendingUp,
	TrendingDown,
	Target,
	Zap,
	AlertCircle,
} from 'lucide-react';

interface HealthScoreProps {
	category: string;
	score: number;
	status: 'excellent' | 'good' | 'warning' | 'critical';
	trend: 'up' | 'down' | 'stable';
	details: string;
}

const HealthCard = ({
	category,
	score,
	status,
	trend,
	details,
}: HealthScoreProps) => {
	const statusConfig = {
		excellent: { color: 'text-accent', bg: 'bg-accent/20' },
		good: { color: 'text-primary', bg: 'bg-primary/20' },
		warning: { color: 'text-yellow-500', bg: 'bg-yellow-500/20' },
		critical: { color: 'text-destructive', bg: 'bg-destructive/20' },
	};

	const TrendIcon =
		trend === 'up' ? TrendingUp : trend === 'down' ? TrendingDown : Target;

	return (
		<Card className="group p-5 transition-all duration-300 hover:shadow-md">
			<div className="flex items-center justify-between">
				<span className="font-medium">{category}</span>
				<TrendIcon
					className={`size-4 ${trend === 'up' ? 'text-accent' : trend === 'down' ? 'text-destructive' : 'text-muted-foreground'}`}
				/>
			</div>
			<div className="mt-4 flex items-center gap-3">
				<div
					className={`flex size-14 items-center justify-center rounded-full ${statusConfig[status].bg}`}
				>
					<span className={`text-xl font-bold ${statusConfig[status].color}`}>
						{score}
					</span>
				</div>
				<div className="flex-1">
					<Progress value={score} className="h-2" />
					<p className="mt-1 text-xs text-muted-foreground">{details}</p>
				</div>
			</div>
		</Card>
	);
};

export default function Main() {
	const overallScore = {
		score: 84,
		label: 'Store Health',
		status: 'good' as const,
	};

	const healthMetrics: HealthScoreProps[] = [
		{
			category: 'Customer Satisfaction',
			score: 92,
			status: 'excellent',
			trend: 'up',
			details: '+4 from last month',
		},
		{
			category: 'Inventory Health',
			score: 78,
			status: 'good',
			trend: 'stable',
			details: 'Optimal stock levels',
		},
		{
			category: 'Order Fulfillment',
			score: 88,
			status: 'excellent',
			trend: 'up',
			details: '98.2% on-time delivery',
		},
		{
			category: 'Revenue Growth',
			score: 72,
			status: 'good',
			trend: 'up',
			details: '+18% YoY',
		},
		{
			category: 'Cart Conversion',
			score: 45,
			status: 'warning',
			trend: 'down',
			details: 'Below target',
		},
		{
			category: 'Customer Retention',
			score: 68,
			status: 'good',
			trend: 'up',
			details: 'Improving trend',
		},
	];

	return (
		<section className="@container" data-theme="stats">
			<div className="mx-auto max-w-7xl px-4 py-16 @sm:px-6 @md:py-20 @xl:py-24 @2xl:px-8">
				<div className="mb-6">
					<Card className="flex items-center gap-6 p-6">
						<div className="flex size-20 items-center justify-center rounded-full bg-primary/20">
							<Gauge className="size-10 text-primary" />
						</div>
						<div>
							<p className="text-sm text-muted-foreground">
								{overallScore.label}
							</p>
							<p className="text-4xl font-bold">
								{overallScore.score}
								<span className="text-lg text-muted-foreground">/100</span>
							</p>
							<Badge className="mt-2">Good Health</Badge>
						</div>
					</Card>
				</div>
				<div className="grid gap-4 @sm:grid-cols-2 @lg:grid-cols-3">
					{healthMetrics.map((metric, i) => (
						<HealthCard key={i} {...metric} />
					))}
				</div>
			</div>
		</section>
	);
}
