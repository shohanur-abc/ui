import { Card } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { Target, BarChart3, PieChart, Activity } from 'lucide-react';

interface StatItemProps {
	icon: React.ElementType;
	label: string;
	value: string;
	progress: number;
	target: string;
}

const StatItem = ({ icon: Icon, label, value, progress, target }: StatItemProps) => (
	<div className="group flex gap-4 p-4 transition-colors hover:bg-secondary/30">
		<div className="flex-shrink-0 rounded-xl bg-gradient-to-br from-primary/15 to-primary/5 p-3">
			<Icon className="size-5 text-primary" />
		</div>
		<div className="flex-1 space-y-2">
			<div className="flex items-center justify-between">
				<span className="text-sm font-medium">{label}</span>
				<span className="text-sm text-muted-foreground">{target}</span>
			</div>
			<p className="text-2xl font-bold tracking-tight">{value}</p>
			<Progress value={progress} className="h-1.5" />
		</div>
	</div>
);

export default function Main() {
	const stats: StatItemProps[] = [
		{ icon: Target, label: 'Sales Goal', value: '$847,200', progress: 72, target: '72% of $1.2M' },
		{ icon: BarChart3, label: 'Active Users', value: '184,294', progress: 88, target: '88% of 210K' },
		{ icon: PieChart, label: 'Market Share', value: '24.8%', progress: 62, target: '62% of 40%' },
		{ icon: Activity, label: 'Engagement', value: '8.4 min', progress: 94, target: '94% of 9 min' },
	];

	return (
		<section className="@container" data-theme="stats">
			<div className="mx-auto max-w-7xl px-4 py-16 @sm:px-6 @md:py-20 @xl:py-24 @2xl:px-8">
				<Card className="divide-y divide-border overflow-hidden">
					{stats.map((stat, i) => (
						<StatItem key={i} {...stat} />
					))}
				</Card>
			</div>
		</section>
	);
}
