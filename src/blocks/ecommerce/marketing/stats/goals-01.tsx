import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Trophy, Target, TrendingUp, Award, Star } from 'lucide-react';

interface GoalStatProps {
	icon: React.ElementType;
	title: string;
	current: string;
	target: string;
	progress: number;
	deadline: string;
}

const GoalCard = ({
	icon: Icon,
	title,
	current,
	target,
	progress,
	deadline,
}: GoalStatProps) => (
	<Card className="group p-5 transition-all duration-300 hover:shadow-md">
		<div className="flex items-center justify-between">
			<div className="flex items-center gap-3">
				<div className="rounded-lg bg-primary/10 p-2">
					<Icon className="size-4 text-primary" />
				</div>
				<span className="font-medium">{title}</span>
			</div>
			<Badge variant={progress >= 100 ? 'default' : 'outline'}>
				{progress >= 100 ? 'Complete' : `${progress}%`}
			</Badge>
		</div>
		<div className="mt-6 flex items-end justify-between">
			<div>
				<span className="text-3xl font-bold">{current}</span>
				<span className="text-muted-foreground"> / {target}</span>
			</div>
		</div>
		<Progress value={Math.min(progress, 100)} className="mt-4 h-2" />
		<p className="mt-3 text-xs text-muted-foreground">{deadline}</p>
	</Card>
);

export default function Main() {
	const goals: GoalStatProps[] = [
		{
			icon: Trophy,
			title: 'Monthly Revenue',
			current: '$847K',
			target: '$1M',
			progress: 85,
			deadline: 'Due in 8 days',
		},
		{
			icon: Target,
			title: 'New Customers',
			current: '4,284',
			target: '5,000',
			progress: 86,
			deadline: 'Due in 8 days',
		},
		{
			icon: TrendingUp,
			title: 'Conversion Rate',
			current: '4.2%',
			target: '5%',
			progress: 84,
			deadline: 'Due in 8 days',
		},
		{
			icon: Award,
			title: 'Average Order Value',
			current: '$128',
			target: '$150',
			progress: 85,
			deadline: 'Due in 8 days',
		},
		{
			icon: Star,
			title: 'Customer Satisfaction',
			current: '4.7',
			target: '4.8',
			progress: 98,
			deadline: 'Due in 8 days',
		},
	];

	return (
		<section className="@container" data-theme="stats">
			<div className="mx-auto max-w-7xl px-4 py-16 @sm:px-6 @md:py-20 @xl:py-24 @2xl:px-8">
				<div className="grid gap-4 @sm:grid-cols-2 @lg:gap-6 @xl:grid-cols-3 @3xl:grid-cols-5">
					{goals.map((goal, i) => (
						<GoalCard key={i} {...goal} />
					))}
				</div>
			</div>
		</section>
	);
}
