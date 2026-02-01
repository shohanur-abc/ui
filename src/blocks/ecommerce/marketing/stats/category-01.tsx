import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';

interface CategoryStatProps {
	category: string;
	revenue: string;
	items: string;
	percentage: number;
	growth: string;
	positive: boolean;
}

const CategoryStat = ({
	category,
	revenue,
	items,
	percentage,
	growth,
	positive,
}: CategoryStatProps) => (
	<Card className="group overflow-hidden transition-all duration-300 hover:shadow-md">
		<div className="p-5">
			<div className="flex items-start justify-between">
				<div className="space-y-1">
					<p className="font-medium">{category}</p>
					<p className="text-xs text-muted-foreground">{items} items</p>
				</div>
				<Badge
					variant={positive ? 'default' : 'destructive'}
					className="text-[10px]"
				>
					{growth}
				</Badge>
			</div>
			<div className="mt-4 space-y-2">
				<div className="flex items-baseline justify-between">
					<span className="text-2xl font-bold">{revenue}</span>
					<span className="text-sm text-muted-foreground">{percentage}%</span>
				</div>
				<Progress value={percentage} className="h-1.5" />
			</div>
		</div>
	</Card>
);

export default function Main() {
	const stats: CategoryStatProps[] = [
		{
			category: 'Electronics',
			revenue: '$428K',
			items: '2,847',
			percentage: 34,
			growth: '+24%',
			positive: true,
		},
		{
			category: 'Fashion',
			revenue: '$312K',
			items: '4,294',
			percentage: 25,
			growth: '+18%',
			positive: true,
		},
		{
			category: 'Home & Garden',
			revenue: '$248K',
			items: '1,847',
			percentage: 20,
			growth: '+12%',
			positive: true,
		},
		{
			category: 'Sports',
			revenue: '$156K',
			items: '984',
			percentage: 12,
			growth: '-4%',
			positive: false,
		},
		{
			category: 'Beauty',
			revenue: '$98K',
			items: '1,284',
			percentage: 8,
			growth: '+8%',
			positive: true,
		},
		{
			category: 'Books',
			revenue: '$12K',
			items: '428',
			percentage: 1,
			growth: '-12%',
			positive: false,
		},
	];

	return (
		<section className="@container" data-theme="stats">
			<div className="mx-auto max-w-7xl px-4 py-16 @sm:px-6 @md:py-20 @xl:py-24 @2xl:px-8">
				<div className="grid gap-4 @sm:grid-cols-2 @lg:gap-6 @xl:grid-cols-3">
					{stats.map((stat, i) => (
						<CategoryStat key={i} {...stat} />
					))}
				</div>
			</div>
		</section>
	);
}
