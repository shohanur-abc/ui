'use client';

import { Eye, MoreHorizontal, Star, TrendingDown, TrendingUp } from 'lucide-react';

import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import {
	Card,
	CardContent,
	CardDescription,
	CardHeader,
	CardTitle,
} from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import {
	Table,
	TableBody,
	TableCell,
	TableHead,
	TableHeader,
	TableRow,
} from '@/components/ui/table';

type ProductPerformanceItem = {
	rank: number;
	name: string;
	category: string;
	revenue: string;
	views: number;
	conversionRate: number;
	rating: number;
	trend: 'up' | 'down';
	change: string;
};

type RankBadgeProps = { rank: number };

const RankBadge = ({ rank }: RankBadgeProps) => {
	const styles =
		rank <= 3
			? 'bg-gradient-to-br from-amber-400 to-amber-600 text-amber-950'
			: 'bg-muted text-muted-foreground';
	return (
		<div
			className={`flex size-7 items-center justify-center rounded-full text-xs font-bold ${styles}`}
		>
			{rank}
		</div>
	);
};

type RatingStarsProps = { rating: number };

const RatingStars = ({ rating }: RatingStarsProps) => (
	<div className="flex items-center gap-1">
		<Star className="size-3 fill-amber-500 text-amber-500" />
		<span className="text-sm font-medium">{rating.toFixed(1)}</span>
	</div>
);

type ProductRowProps = ProductPerformanceItem;

const ProductRow = ({
	rank,
	name,
	category,
	revenue,
	views,
	conversionRate,
	rating,
	trend,
	change,
}: ProductRowProps) => (
	<TableRow className="group transition-colors hover:bg-muted/50">
		<TableCell>
			<RankBadge rank={rank} />
		</TableCell>
		<TableCell>
			<div className="flex flex-col">
				<span className="font-medium">{name}</span>
				<span className="text-xs text-muted-foreground">{category}</span>
			</div>
		</TableCell>
		<TableCell className="text-right font-bold">{revenue}</TableCell>
		<TableCell className="text-right">
			<div className="flex items-center justify-end gap-1.5 text-muted-foreground">
				<Eye className="size-3" />
				{views.toLocaleString()}
			</div>
		</TableCell>
		<TableCell>
			<div className="flex flex-col gap-1">
				<Progress value={conversionRate} className="h-1.5" />
				<span className="text-xs text-muted-foreground">
					{conversionRate}%
				</span>
			</div>
		</TableCell>
		<TableCell>
			<RatingStars rating={rating} />
		</TableCell>
		<TableCell className="text-right">
			<div
				className={`inline-flex items-center gap-1 ${trend === 'up' ? 'text-emerald-500' : 'text-rose-500'}`}
			>
				{trend === 'up' ? (
					<TrendingUp className="size-3" />
				) : (
					<TrendingDown className="size-3" />
				)}
				<span className="text-sm font-medium">{change}</span>
			</div>
		</TableCell>
	</TableRow>
);

export default function Main() {
	const products: ProductPerformanceItem[] = [
		{ rank: 1, name: 'Pro Wireless Headphones', category: 'Electronics', revenue: '$48,250', views: 12480, conversionRate: 8.5, rating: 4.9, trend: 'up', change: '+24.5%' },
		{ rank: 2, name: 'Smart Fitness Watch', category: 'Wearables', revenue: '$35,180', views: 9850, conversionRate: 7.2, rating: 4.7, trend: 'up', change: '+18.3%' },
		{ rank: 3, name: 'Premium Leather Bag', category: 'Fashion', revenue: '$28,900', views: 7620, conversionRate: 6.8, rating: 4.8, trend: 'up', change: '+12.1%' },
		{ rank: 4, name: 'Ultra HD Monitor 32"', category: 'Electronics', revenue: '$24,500', views: 5480, conversionRate: 5.9, rating: 4.6, trend: 'down', change: '-3.2%' },
		{ rank: 5, name: 'Ergonomic Office Chair', category: 'Furniture', revenue: '$21,300', views: 4890, conversionRate: 5.4, rating: 4.5, trend: 'up', change: '+8.7%' },
		{ rank: 6, name: 'Wireless Charging Pad', category: 'Accessories', revenue: '$18,750', views: 8920, conversionRate: 4.2, rating: 4.4, trend: 'down', change: '-1.8%' },
	];

	return (
		<section className="@container" data-theme="reports">
			<div className="mx-auto max-w-7xl px-4 py-8 @sm:px-6 @md:py-10 @2xl:px-8 @3xl:py-12">
				<Card className="overflow-hidden border-border/50 bg-card/80 backdrop-blur-sm">
					<CardHeader className="flex flex-row items-center justify-between">
						<div>
							<CardTitle className="text-lg @sm:text-xl">
								Top Products Performance
							</CardTitle>
							<CardDescription>
								Product ranking by revenue with engagement metrics
							</CardDescription>
						</div>
						<Button variant="ghost" size="icon">
							<MoreHorizontal className="size-4" />
						</Button>
					</CardHeader>
					<CardContent className="p-0">
						<Table>
							<TableHeader>
								<TableRow className="border-border/50 hover:bg-transparent">
									<TableHead className="w-16">Rank</TableHead>
									<TableHead>Product</TableHead>
									<TableHead className="text-right">Revenue</TableHead>
									<TableHead className="text-right">Views</TableHead>
									<TableHead className="w-28">Conversion</TableHead>
									<TableHead>Rating</TableHead>
									<TableHead className="text-right">Trend</TableHead>
								</TableRow>
							</TableHeader>
							<TableBody>
								{products.map((product) => (
									<ProductRow key={product.rank} {...product} />
								))}
							</TableBody>
						</Table>
					</CardContent>
				</Card>
			</div>
		</section>
	);
}
