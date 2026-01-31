import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Package, Star, ArrowRight, ShoppingCart, Eye, TrendingUp } from 'lucide-react';

interface ProductOrderCard {
	id: string;
	name: string;
	image?: string;
	sku: string;
	ordersToday: number;
	ordersWeek: number;
	revenue: string;
	stock: number;
	rating: number;
	trend: 'up' | 'down' | 'stable';
}

interface ProductGridCardProps {
	product: ProductOrderCard;
	labels: { today: string; week: string; revenue: string; stock: string; view: string };
}

const StockBadge = ({ stock }: { stock: number }) => {
	if (stock === 0) return <Badge variant="destructive">Out of Stock</Badge>;
	if (stock < 10) return <Badge variant="outline" className="bg-yellow-500/10 text-yellow-600 border-yellow-500/30">Low Stock</Badge>;
	return <Badge variant="outline" className="bg-accent/10 text-accent border-accent/30">In Stock</Badge>;
};

const ProductGridCard = ({ product, labels }: ProductGridCardProps) => (
	<Card className="border-border/50 bg-card/50 backdrop-blur-sm hover:border-primary/30 hover:shadow-lg transition-all group overflow-hidden">
		<CardContent className="p-0">
			<div className="aspect-square bg-muted/50 relative overflow-hidden">
				{product.image ? (
					<img src={product.image} alt={product.name} className="size-full object-cover group-hover:scale-105 transition-transform duration-300" />
				) : (
					<div className="size-full flex items-center justify-center">
						<Package className="size-16 text-muted-foreground/50" />
					</div>
				)}
				<div className="absolute top-2 right-2">
					<StockBadge stock={product.stock} />
				</div>
				{product.trend === 'up' && (
					<div className="absolute top-2 left-2">
						<Badge className="bg-accent text-accent-foreground gap-1">
							<TrendingUp className="size-3" />
							Trending
						</Badge>
					</div>
				)}
			</div>

			<div className="p-4">
				<div className="flex items-center gap-1 mb-1">
					{[...Array(5)].map((_, i) => (
						<Star key={i} className={`size-3 ${i < product.rating ? 'text-yellow-500 fill-yellow-500' : 'text-muted'}`} />
					))}
					<span className="text-xs text-muted-foreground ml-1">{product.rating.toFixed(1)}</span>
				</div>

				<p className="font-semibold mb-1 line-clamp-1">{product.name}</p>
				<p className="text-xs text-muted-foreground font-mono mb-3">{product.sku}</p>

				<div className="grid grid-cols-2 gap-2 text-sm mb-3">
					<div className="p-2 rounded-lg bg-muted/30">
						<p className="text-muted-foreground text-xs">{labels.today}</p>
						<p className="font-bold">{product.ordersToday}</p>
					</div>
					<div className="p-2 rounded-lg bg-muted/30">
						<p className="text-muted-foreground text-xs">{labels.week}</p>
						<p className="font-bold">{product.ordersWeek}</p>
					</div>
				</div>

				<div className="flex items-center justify-between pt-3 border-t border-border/50">
					<div>
						<p className="text-xs text-muted-foreground">{labels.revenue}</p>
						<p className="text-lg font-bold text-accent">{product.revenue}</p>
					</div>
					<Button variant="ghost" size="icon" className="hover:bg-primary/10 hover:text-primary">
						<Eye className="size-5" />
					</Button>
				</div>
			</div>
		</CardContent>
	</Card>
);

export default function Main() {
	const labels = { today: 'Today', week: 'This Week', revenue: 'Revenue', stock: 'Stock', view: 'View' };

	const products: ProductOrderCard[] = [
		{ id: 'PROD-001', name: 'Wireless Bluetooth Headphones', sku: 'SKU-WBH-001', ordersToday: 24, ordersWeek: 156, revenue: '$12,450', stock: 45, rating: 4.8, trend: 'up' },
		{ id: 'PROD-002', name: 'USB-C Hub 7-in-1', sku: 'SKU-UCH-003', ordersToday: 18, ordersWeek: 98, revenue: '$5,820', stock: 8, rating: 4.5, trend: 'stable' },
		{ id: 'PROD-003', name: 'Ergonomic Laptop Stand', sku: 'SKU-ELS-007', ordersToday: 12, ordersWeek: 67, revenue: '$4,350', stock: 0, rating: 4.9, trend: 'down' },
		{ id: 'PROD-004', name: 'Mechanical Gaming Keyboard', sku: 'SKU-MGK-012', ordersToday: 31, ordersWeek: 187, revenue: '$18,230', stock: 122, rating: 4.7, trend: 'up' },
	];

	return (
		<section className="@container" data-theme="orders">
			<div className="mx-auto max-w-4xl px-4 @sm:px-6 @2xl:px-8 py-8 @md:py-10 @xl:py-12">
				<div className="grid grid-cols-1 @sm:grid-cols-2 @lg:grid-cols-4 gap-4">
					{products.map((product) => (
						<ProductGridCard key={product.id} product={product} labels={labels} />
					))}
				</div>
			</div>
		</section>
	);
}
