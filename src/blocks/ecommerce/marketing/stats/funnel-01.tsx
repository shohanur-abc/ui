import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';

interface FunnelStatProps {
	stage: string;
	value: number;
	percentage: number;
	dropoff?: number;
}

const FunnelStat = ({ stage, value, percentage, dropoff }: FunnelStatProps) => (
	<div className="group relative">
		<div className="flex items-center gap-4">
			<div className="w-32 text-right">
				<p className="text-sm font-medium">{stage}</p>
				<p className="text-xs text-muted-foreground">{value.toLocaleString()}</p>
			</div>
			<div className="flex-1">
				<div
					className="h-10 rounded-lg bg-gradient-to-r from-primary to-primary/60 transition-all duration-500 group-hover:from-primary group-hover:to-primary/80"
					style={{ width: `${percentage}%` }}
				/>
			</div>
			<div className="w-20 text-right">
				<span className="text-sm font-semibold">{percentage}%</span>
				{dropoff && (
					<p className="text-xs text-destructive">-{dropoff}%</p>
				)}
			</div>
		</div>
	</div>
);

export default function Main() {
	const stats: FunnelStatProps[] = [
		{ stage: 'Visitors', value: 100000, percentage: 100 },
		{ stage: 'Product Views', value: 42000, percentage: 42, dropoff: 58 },
		{ stage: 'Add to Cart', value: 12000, percentage: 12, dropoff: 30 },
		{ stage: 'Checkout', value: 4800, percentage: 4.8, dropoff: 7.2 },
		{ stage: 'Purchase', value: 3200, percentage: 3.2, dropoff: 1.6 },
	];

	return (
		<section className="@container" data-theme="stats">
			<div className="mx-auto max-w-7xl px-4 py-16 @sm:px-6 @md:py-20 @xl:py-24 @2xl:px-8">
				<Card className="p-6 @md:p-8">
					<div className="mb-6 flex items-center justify-between">
						<h3 className="font-semibold">Conversion Funnel</h3>
						<Badge variant="outline">Last 30 days</Badge>
					</div>
					<div className="space-y-4">
						{stats.map((stat, i) => (
							<FunnelStat key={i} {...stat} />
						))}
					</div>
				</Card>
			</div>
		</section>
	);
}
