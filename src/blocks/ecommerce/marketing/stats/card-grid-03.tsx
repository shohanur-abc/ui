import { Card } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { Target, TrendingUp, Zap, Award, type LucideIcon } from 'lucide-react';

interface StatItemProps {
	icon: LucideIcon;
	label: string;
	value: string;
	progress: number;
	target: string;
}

const StatCard = ({ icon: Icon, label, value, progress, target }: StatItemProps) => (
	<Card className="group relative overflow-hidden p-6 transition-all duration-300 hover:shadow-md">
		<div className="space-y-4">
			<div className="flex items-center gap-3">
				<div className="rounded-full bg-gradient-to-br from-primary/20 to-primary/5 p-2.5 ring-1 ring-primary/10 transition-all duration-300 group-hover:ring-primary/20">
					<Icon className="size-4 text-primary" />
				</div>
				<span className="text-sm font-medium text-muted-foreground">{label}</span>
			</div>
			<div className="space-y-3">
				<p className="text-3xl font-bold tracking-tight">{value}</p>
				<Progress value={progress} className="h-1.5" />
				<p className="text-xs text-muted-foreground">{target}</p>
			</div>
		</div>
	</Card>
);

export default function Main() {
	const stats: StatItemProps[] = [
		{ icon: Target, label: 'Sales Goal', value: '$84,200', progress: 78, target: '78% of $108,000 target' },
		{ icon: TrendingUp, label: 'Growth Rate', value: '23.4%', progress: 92, target: '92% above benchmark' },
		{ icon: Zap, label: 'Conversion', value: '4.8%', progress: 65, target: '65% of 7.5% target' },
		{ icon: Award, label: 'Customer Score', value: '94/100', progress: 94, target: 'Top 6% in industry' },
	];

	return (
		<section className="@container" data-theme="stats">
			<div className="mx-auto max-w-7xl px-4 py-16 @sm:px-6 @md:py-20 @xl:py-24 @2xl:px-8">
				<div className="grid gap-4 @sm:grid-cols-2 @lg:gap-6 @2xl:grid-cols-4">
					{stats.map((stat, i) => (
						<StatCard key={i} {...stat} />
					))}
				</div>
			</div>
		</section>
	);
}
