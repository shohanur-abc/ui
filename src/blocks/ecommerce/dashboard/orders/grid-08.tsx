import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Globe, Package, DollarSign, TrendingUp, TrendingDown, ArrowUpRight } from 'lucide-react';

interface RegionCard {
	region: string;
	flag: string;
	orders: number;
	revenue: string;
	growth: string;
	growthType: 'positive' | 'negative';
	topProduct: string;
	avgShipping: string;
}

interface RegionGridCardProps {
	region: RegionCard;
	labels: { orders: string; revenue: string; shipping: string; topProduct: string; viewDetails: string };
}

const RegionGridCard = ({ region, labels }: RegionGridCardProps) => {
	const TrendIcon = region.growthType === 'positive' ? TrendingUp : TrendingDown;
	return (
		<Card className="border-border/50 bg-card/50 backdrop-blur-sm hover:border-primary/30 hover:shadow-lg transition-all group overflow-hidden">
			<div className={`h-1 ${region.growthType === 'positive' ? 'bg-accent' : 'bg-destructive'}`} />
			<CardContent className="p-4">
				<div className="flex items-center justify-between mb-4">
					<div className="flex items-center gap-3">
						<div className="size-10 rounded-lg bg-muted/50 border border-border/50 flex items-center justify-center text-2xl">
							{region.flag}
						</div>
						<div>
							<p className="font-semibold">{region.region}</p>
							<div className={`flex items-center gap-1 text-sm ${region.growthType === 'positive' ? 'text-accent' : 'text-destructive'}`}>
								<TrendIcon className="size-3" />
								<span>{region.growth}</span>
							</div>
						</div>
					</div>
					<Button variant="ghost" size="icon" className="opacity-0 group-hover:opacity-100 transition-opacity">
						<ArrowUpRight className="size-4" />
					</Button>
				</div>

				<div className="grid grid-cols-2 gap-3 mb-4">
					<div className="p-3 rounded-lg bg-muted/30">
						<div className="flex items-center gap-1.5 text-muted-foreground mb-1">
							<Package className="size-3" />
							<span className="text-xs">{labels.orders}</span>
						</div>
						<p className="text-xl font-bold">{region.orders.toLocaleString()}</p>
					</div>
					<div className="p-3 rounded-lg bg-muted/30">
						<div className="flex items-center gap-1.5 text-muted-foreground mb-1">
							<DollarSign className="size-3" />
							<span className="text-xs">{labels.revenue}</span>
						</div>
						<p className="text-xl font-bold text-accent">{region.revenue}</p>
					</div>
				</div>

				<div className="space-y-2 text-sm">
					<div className="flex items-center justify-between">
						<span className="text-muted-foreground">{labels.shipping}</span>
						<span className="font-medium">{region.avgShipping}</span>
					</div>
					<div className="flex items-center justify-between">
						<span className="text-muted-foreground">{labels.topProduct}</span>
						<Badge variant="secondary" className="text-xs max-w-[120px] truncate">{region.topProduct}</Badge>
					</div>
				</div>
			</CardContent>
		</Card>
	);
};

export default function Main() {
	const labels = { orders: 'Orders', revenue: 'Revenue', shipping: 'Avg Shipping', topProduct: 'Top Seller', viewDetails: 'View' };

	const regions: RegionCard[] = [
		{ region: 'North America', flag: '🇺🇸', orders: 4521, revenue: '$245K', growth: '+15%', growthType: 'positive', topProduct: 'Wireless Headphones', avgShipping: '3-5 days' },
		{ region: 'Europe', flag: '🇪🇺', orders: 3892, revenue: '$198K', growth: '+12%', growthType: 'positive', topProduct: 'Laptop Stand', avgShipping: '5-7 days' },
		{ region: 'Asia Pacific', flag: '🇯🇵', orders: 2847, revenue: '$156K', growth: '+28%', growthType: 'positive', topProduct: 'USB-C Hub', avgShipping: '7-10 days' },
		{ region: 'Latin America', flag: '🇧🇷', orders: 1256, revenue: '$67K', growth: '-5%', growthType: 'negative', topProduct: 'Phone Case', avgShipping: '10-14 days' },
	];

	return (
		<section className="@container" data-theme="orders">
			<div className="mx-auto max-w-4xl px-4 @sm:px-6 @2xl:px-8 py-8 @md:py-10 @xl:py-12">
				<div className="grid grid-cols-1 @sm:grid-cols-2 @lg:grid-cols-4 gap-4">
					{regions.map((region, i) => (
						<RegionGridCard key={i} region={region} labels={labels} />
					))}
				</div>
			</div>
		</section>
	);
}
