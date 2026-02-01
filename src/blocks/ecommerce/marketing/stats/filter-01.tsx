import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Filter, Search, Tag, Layers, TrendingUp } from 'lucide-react';

interface FilterStatProps {
	filter: string;
	usageCount: string;
	conversionRate: number;
	impact: 'high' | 'medium' | 'low';
}

const FilterCard = ({
	filter,
	usageCount,
	conversionRate,
	impact,
}: FilterStatProps) => {
	const impactConfig = {
		high: { color: 'text-accent', badge: 'High Impact' },
		medium: { color: 'text-primary', badge: 'Medium' },
		low: { color: 'text-muted-foreground', badge: 'Low' },
	};

	return (
		<Card className="group p-4 transition-all duration-300 hover:shadow-md">
			<div className="flex items-center justify-between">
				<p className="font-medium">{filter}</p>
				<Badge variant="outline" className={impactConfig[impact].color}>
					{impactConfig[impact].badge}
				</Badge>
			</div>
			<div className="mt-3 space-y-2">
				<div className="flex justify-between text-sm">
					<span className="text-muted-foreground">Uses</span>
					<span className="font-semibold">{usageCount}</span>
				</div>
				<div className="flex justify-between text-sm">
					<span className="text-muted-foreground">Conversion</span>
					<span className="font-semibold">{conversionRate}%</span>
				</div>
				<Progress value={conversionRate * 10} className="h-1.5" />
			</div>
		</Card>
	);
};

export default function Main() {
	const summaryStats = [
		{ icon: Filter, label: 'Filter Uses', value: '248K' },
		{ icon: Search, label: 'Search Queries', value: '84,294' },
		{ icon: Tag, label: 'Tag Clicks', value: '42,847' },
		{ icon: TrendingUp, label: 'Filter Conversion', value: '6.8%' },
	];

	const filters: FilterStatProps[] = [
		{
			filter: 'Price Range',
			usageCount: '48,294',
			conversionRate: 8.4,
			impact: 'high',
		},
		{
			filter: 'Brand',
			usageCount: '42,847',
			conversionRate: 7.2,
			impact: 'high',
		},
		{
			filter: 'Category',
			usageCount: '38,284',
			conversionRate: 5.8,
			impact: 'medium',
		},
		{
			filter: 'Size',
			usageCount: '24,847',
			conversionRate: 6.4,
			impact: 'medium',
		},
		{
			filter: 'Color',
			usageCount: '18,294',
			conversionRate: 4.2,
			impact: 'low',
		},
		{
			filter: 'Rating',
			usageCount: '12,847',
			conversionRate: 9.2,
			impact: 'high',
		},
	];

	return (
		<section className="@container" data-theme="stats">
			<div className="mx-auto max-w-7xl px-4 py-16 @sm:px-6 @md:py-20 @xl:py-24 @2xl:px-8">
				<div className="mb-6 grid gap-4 @sm:grid-cols-2 @lg:grid-cols-4">
					{summaryStats.map((stat, i) => (
						<Card key={i} className="flex items-center gap-4 p-4">
							<div className="rounded-lg bg-primary/10 p-2">
								<stat.icon className="size-4 text-primary" />
							</div>
							<div>
								<p className="text-xl font-bold">{stat.value}</p>
								<p className="text-xs text-muted-foreground">{stat.label}</p>
							</div>
						</Card>
					))}
				</div>
				<div className="grid gap-4 @sm:grid-cols-2 @lg:grid-cols-3 @2xl:grid-cols-6">
					{filters.map((filter, i) => (
						<FilterCard key={i} {...filter} />
					))}
				</div>
			</div>
		</section>
	);
}
