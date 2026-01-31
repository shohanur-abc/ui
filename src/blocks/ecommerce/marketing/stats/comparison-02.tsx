import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { ArrowUp, ArrowDown, Minus } from 'lucide-react';

interface ComparisonStatProps {
	label: string;
	thisMonth: string;
	lastMonth: string;
	trend: 'up' | 'down' | 'neutral';
}

const ComparisonStat = ({ label, thisMonth, lastMonth, trend }: ComparisonStatProps) => {
	const TrendIcon = trend === 'up' ? ArrowUp : trend === 'down' ? ArrowDown : Minus;
	const trendColors = {
		up: 'text-accent',
		down: 'text-destructive',
		neutral: 'text-muted-foreground',
	};

	return (
		<div className="group flex items-center justify-between p-4 transition-colors hover:bg-secondary/30">
			<span className="text-sm font-medium">{label}</span>
			<div className="flex items-center gap-6">
				<div className="text-right">
					<p className="text-xs text-muted-foreground">Last Month</p>
					<p className="font-medium text-muted-foreground">{lastMonth}</p>
				</div>
				<TrendIcon className={`size-4 ${trendColors[trend]}`} />
				<div className="text-right">
					<p className="text-xs text-muted-foreground">This Month</p>
					<p className="font-semibold">{thisMonth}</p>
				</div>
			</div>
		</div>
	);
};

export default function Main() {
	const stats: ComparisonStatProps[] = [
		{ label: 'Revenue', thisMonth: '$284,847', lastMonth: '$247,294', trend: 'up' },
		{ label: 'Orders', thisMonth: '8,492', lastMonth: '7,847', trend: 'up' },
		{ label: 'New Customers', thisMonth: '1,284', lastMonth: '1,284', trend: 'neutral' },
		{ label: 'Avg. Cart Value', thisMonth: '$147', lastMonth: '$162', trend: 'down' },
		{ label: 'Conversion Rate', thisMonth: '3.8%', lastMonth: '3.2%', trend: 'up' },
	];

	return (
		<section className="@container" data-theme="stats">
			<div className="mx-auto max-w-7xl px-4 py-16 @sm:px-6 @md:py-20 @xl:py-24 @2xl:px-8">
				<Card className="divide-y divide-border overflow-hidden">
					{stats.map((stat, i) => (
						<ComparisonStat key={i} {...stat} />
					))}
				</Card>
			</div>
		</section>
	);
}
