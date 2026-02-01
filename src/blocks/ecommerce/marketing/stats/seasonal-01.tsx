import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import {
	Calendar,
	DollarSign,
	Users,
	ShoppingCart,
	TrendingUp,
	Gift,
} from 'lucide-react';

interface SeasonalStatProps {
	season: string;
	period: string;
	revenue: string;
	growth: string;
	positive: boolean;
	topCategory: string;
}

const SeasonalCard = ({
	season,
	period,
	revenue,
	growth,
	positive,
	topCategory,
}: SeasonalStatProps) => (
	<Card className="group overflow-hidden transition-all duration-300 hover:shadow-md">
		<div className="p-5">
			<div className="flex items-center justify-between">
				<div className="flex items-center gap-2">
					<Calendar className="size-4 text-primary" />
					<span className="font-semibold">{season}</span>
				</div>
				<Badge variant={positive ? 'default' : 'destructive'}>{growth}</Badge>
			</div>
			<p className="mt-1 text-xs text-muted-foreground">{period}</p>
			<p className="mt-4 text-3xl font-bold">{revenue}</p>
		</div>
		<Separator />
		<div className="bg-secondary/30 p-3">
			<p className="text-xs text-muted-foreground">Top Category</p>
			<p className="font-medium">{topCategory}</p>
		</div>
	</Card>
);

export default function Main() {
	const seasons: SeasonalStatProps[] = [
		{
			season: 'Spring',
			period: 'Mar - May',
			revenue: '$1.8M',
			growth: '+12%',
			positive: true,
			topCategory: 'Outdoor & Garden',
		},
		{
			season: 'Summer',
			period: 'Jun - Aug',
			revenue: '$2.4M',
			growth: '+28%',
			positive: true,
			topCategory: 'Fashion & Swimwear',
		},
		{
			season: 'Fall',
			period: 'Sep - Nov',
			revenue: '$2.1M',
			growth: '+8%',
			positive: true,
			topCategory: 'Home & Kitchen',
		},
		{
			season: 'Winter',
			period: 'Dec - Feb',
			revenue: '$3.8M',
			growth: '+42%',
			positive: true,
			topCategory: 'Electronics & Gifts',
		},
	];

	return (
		<section className="@container" data-theme="stats">
			<div className="mx-auto max-w-7xl px-4 py-16 @sm:px-6 @md:py-20 @xl:py-24 @2xl:px-8">
				<div className="grid gap-4 @sm:grid-cols-2 @lg:gap-6 @2xl:grid-cols-4">
					{seasons.map((season, i) => (
						<SeasonalCard key={i} {...season} />
					))}
				</div>
			</div>
		</section>
	);
}
