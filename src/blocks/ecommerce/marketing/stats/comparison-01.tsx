import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { TrendingUp, TrendingDown } from 'lucide-react';

interface ComparisonStatProps {
	label: string;
	current: string;
	previous: string;
	change: number;
	progress: number;
}

const ComparisonStat = ({
	label,
	current,
	previous,
	change,
	progress,
}: ComparisonStatProps) => {
	const isPositive = change >= 0;

	return (
		<Card className="group p-6 transition-all duration-300 hover:shadow-md">
			<div className="space-y-4">
				<div className="flex items-center justify-between">
					<span className="text-sm font-medium text-muted-foreground">
						{label}
					</span>
					<Badge
						variant={isPositive ? 'default' : 'destructive'}
						className="gap-1"
					>
						{isPositive ? (
							<TrendingUp className="size-3" />
						) : (
							<TrendingDown className="size-3" />
						)}
						{Math.abs(change)}%
					</Badge>
				</div>
				<div className="flex items-baseline justify-between">
					<p className="text-3xl font-bold tracking-tight">{current}</p>
					<p className="text-sm text-muted-foreground">vs {previous}</p>
				</div>
				<Progress value={progress} className="h-1.5" />
			</div>
		</Card>
	);
};

export default function Main() {
	const stats: ComparisonStatProps[] = [
		{
			label: 'Revenue',
			current: '$284K',
			previous: '$218K',
			change: 30.3,
			progress: 85,
		},
		{
			label: 'Orders',
			current: '8,492',
			previous: '7,124',
			change: 19.2,
			progress: 72,
		},
		{
			label: 'Customers',
			current: '4,284',
			previous: '3,847',
			change: 11.4,
			progress: 64,
		},
		{
			label: 'Avg. Order',
			current: '$142',
			previous: '$128',
			change: 10.9,
			progress: 58,
		},
	];

	return (
		<section className="@container" data-theme="stats">
			<div className="mx-auto max-w-7xl px-4 py-16 @sm:px-6 @md:py-20 @xl:py-24 @2xl:px-8">
				<div className="grid gap-4 @sm:grid-cols-2 @lg:gap-6 @2xl:grid-cols-4">
					{stats.map((stat, i) => (
						<ComparisonStat key={i} {...stat} />
					))}
				</div>
			</div>
		</section>
	);
}
