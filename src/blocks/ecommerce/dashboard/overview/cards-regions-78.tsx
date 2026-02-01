import {
	ArrowUpRight,
	Globe,
	MapPin,
	MoreHorizontal,
	Package,
	TrendingUp,
	Users,
} from 'lucide-react';

import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';

type RegionCard = {
	name: string;
	code: string;
	revenue: string;
	orders: number;
	customers: number;
	growth: string;
	marketShare: number;
	topProducts: string[];
};

const RegionCardComponent = (region: RegionCard) => (
	<Card>
		<CardContent className="p-4">
			<div className="flex items-start justify-between">
				<div className="flex items-center gap-3">
					<div className="flex size-10 items-center justify-center rounded-lg bg-primary/10 text-lg font-bold text-primary">
						{region.code}
					</div>
					<div>
						<p className="font-medium">{region.name}</p>
						<Badge
							variant="secondary"
							className="mt-1 bg-emerald-500/10 text-emerald-500 text-xs"
						>
							<ArrowUpRight className="mr-0.5 size-3" />
							{region.growth}
						</Badge>
					</div>
				</div>
				<Button variant="ghost" size="icon" className="size-8">
					<MoreHorizontal className="size-4" />
				</Button>
			</div>
			<div className="mt-4 grid grid-cols-3 gap-2">
				<div className="rounded-lg bg-muted/50 p-2 text-center">
					<p className="text-lg font-bold">{region.revenue}</p>
					<p className="text-xs text-muted-foreground">Revenue</p>
				</div>
				<div className="rounded-lg bg-muted/50 p-2 text-center">
					<p className="text-lg font-bold">{region.orders.toLocaleString()}</p>
					<p className="text-xs text-muted-foreground">Orders</p>
				</div>
				<div className="rounded-lg bg-muted/50 p-2 text-center">
					<p className="text-lg font-bold">
						{region.customers.toLocaleString()}
					</p>
					<p className="text-xs text-muted-foreground">Customers</p>
				</div>
			</div>
			<div className="mt-4 space-y-2">
				<div className="flex items-center justify-between text-sm">
					<span className="text-muted-foreground">Market Share</span>
					<span className="font-medium">{region.marketShare}%</span>
				</div>
				<Progress value={region.marketShare} className="h-2" />
			</div>
			<div className="mt-4">
				<p className="mb-2 text-xs font-medium text-muted-foreground">
					Top Products
				</p>
				<div className="flex flex-wrap gap-1">
					{region.topProducts.map((product, i) => (
						<Badge key={i} variant="outline" className="text-xs">
							{product}
						</Badge>
					))}
				</div>
			</div>
		</CardContent>
	</Card>
);

export default function Main() {
	const regions: RegionCard[] = [
		{
			name: 'United States',
			code: 'US',
			revenue: '$142K',
			orders: 3845,
			customers: 1245,
			growth: '+28%',
			marketShare: 45,
			topProducts: ['Headphones', 'Watches', 'Keyboards'],
		},
		{
			name: 'United Kingdom',
			code: 'UK',
			revenue: '$52K',
			orders: 1456,
			customers: 487,
			growth: '+24%',
			marketShare: 18,
			topProducts: ['Stands', 'Hubs', 'Cables'],
		},
		{
			name: 'Germany',
			code: 'DE',
			revenue: '$48K',
			orders: 1324,
			customers: 412,
			growth: '+20%',
			marketShare: 16,
			topProducts: ['Keyboards', 'Mice', 'Monitors'],
		},
		{
			name: 'Canada',
			code: 'CA',
			revenue: '$38K',
			orders: 987,
			customers: 356,
			growth: '+22%',
			marketShare: 12,
			topProducts: ['Headphones', 'Earbuds', 'Speakers'],
		},
		{
			name: 'Australia',
			code: 'AU',
			revenue: '$28K',
			orders: 756,
			customers: 245,
			growth: '+32%',
			marketShare: 9,
			topProducts: ['Watches', 'Bands', 'Cases'],
		},
		{
			name: 'France',
			code: 'FR',
			revenue: '$24K',
			orders: 654,
			customers: 198,
			growth: '+18%',
			marketShare: 8,
			topProducts: ['Stands', 'Docks', 'Hubs'],
		},
	];

	return (
		<section className="@container" data-theme="dashboard">
			<div className="mx-auto max-w-7xl px-4 py-8 @sm:px-6 @md:py-10 @2xl:px-8 @3xl:py-12">
				<div className="grid gap-4 @sm:grid-cols-2 @xl:grid-cols-3">
					{regions.map((region, i) => (
						<RegionCardComponent key={i} {...region} />
					))}
				</div>
			</div>
		</section>
	);
}
