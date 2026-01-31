import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';

interface DistributionStatProps {
	segments: { label: string; value: number; color: string }[];
	total: string;
	label: string;
}

const DistributionStat = ({ segments, total, label }: DistributionStatProps) => {
	const totalValue = segments.reduce((acc, s) => acc + s.value, 0);

	return (
		<Card className="p-6 @md:p-8">
			<div className="space-y-6">
				<div className="text-center">
					<p className="text-4xl font-bold tracking-tight">{total}</p>
					<p className="text-sm text-muted-foreground">{label}</p>
				</div>
				<div className="flex h-4 overflow-hidden rounded-full">
					{segments.map((segment, i) => (
						<div
							key={i}
							className="transition-all duration-500 hover:opacity-80"
							style={{
								width: `${(segment.value / totalValue) * 100}%`,
								backgroundColor: `var(--${segment.color})`,
							}}
						/>
					))}
				</div>
				<div className="grid gap-3 @sm:grid-cols-2">
					{segments.map((segment, i) => (
						<div key={i} className="flex items-center gap-2">
							<div
								className="size-3 rounded-full"
								style={{ backgroundColor: `var(--${segment.color})` }}
							/>
							<span className="flex-1 text-sm">{segment.label}</span>
							<span className="text-sm font-medium">{Math.round((segment.value / totalValue) * 100)}%</span>
						</div>
					))}
				</div>
			</div>
		</Card>
	);
};

export default function Main() {
	const customerSegments: DistributionStatProps = {
		segments: [
			{ label: 'New Customers', value: 12847, color: 'chart-1' },
			{ label: 'Returning', value: 24294, color: 'chart-2' },
			{ label: 'VIP', value: 8294, color: 'chart-3' },
			{ label: 'At Risk', value: 2847, color: 'chart-4' },
		],
		total: '48,282',
		label: 'Total Customers',
	};

	const revenueSegments: DistributionStatProps = {
		segments: [
			{ label: 'Electronics', value: 428000, color: 'chart-1' },
			{ label: 'Fashion', value: 312000, color: 'chart-2' },
			{ label: 'Home', value: 248000, color: 'chart-3' },
			{ label: 'Other', value: 156000, color: 'chart-4' },
		],
		total: '$1.14M',
		label: 'Revenue by Category',
	};

	return (
		<section className="@container" data-theme="stats">
			<div className="mx-auto max-w-7xl px-4 py-16 @sm:px-6 @md:py-20 @xl:py-24 @2xl:px-8">
				<div className="grid gap-6 @lg:grid-cols-2">
					<DistributionStat {...customerSegments} />
					<DistributionStat {...revenueSegments} />
				</div>
			</div>
		</section>
	);
}
