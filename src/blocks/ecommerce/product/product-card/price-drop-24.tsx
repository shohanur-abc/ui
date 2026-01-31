import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import { Bell, Heart, ShoppingCart, TrendingDown } from 'lucide-react';
import Image from 'next/image';

interface ProductProps {
	image: string;
	name: string;
	currentPrice: number;
	priceHistory: { date: string; price: number }[];
	lowestPrice: number;
	highestPrice: number;
	isLowest: boolean;
}

const ProductImage = ({ src, alt }: { src: string; alt: string }) => (
	<div className="relative aspect-square overflow-hidden rounded-xl bg-muted">
		<Image src={src} alt={alt} fill className="object-cover" />
	</div>
);

const ProductName = ({ text }: { text: string }) => (
	<h3 className="font-semibold text-foreground">{text}</h3>
);

const PriceChart = ({
	history,
	current,
}: {
	history: { date: string; price: number }[];
	current: number;
}) => {
	const max = Math.max(...history.map((h) => h.price));
	const min = Math.min(...history.map((h) => h.price));
	const range = max - min || 1;

	return (
		<div className="space-y-2">
			<p className="text-xs text-muted-foreground">Price History (30 days)</p>
			<div className="flex h-16 items-end gap-1">
				{history.map((point, i) => {
					const height = ((point.price - min) / range) * 100;
					const isLatest = i === history.length - 1;
					return (
						<div
							key={i}
							className={`flex-1 rounded-t transition-colors ${isLatest ? 'bg-primary' : 'bg-muted-foreground/30'}`}
							style={{ height: `${Math.max(height, 10)}%` }}
							title={`${point.date}: $${point.price}`}
						/>
					);
				})}
			</div>
		</div>
	);
};

const PriceStats = ({
	current,
	lowest,
	highest,
	isLowest,
}: {
	current: number;
	lowest: number;
	highest: number;
	isLowest: boolean;
}) => (
	<div className="space-y-2">
		<div className="flex items-center justify-between">
			<span className="text-2xl font-bold text-foreground">
				${current.toFixed(2)}
			</span>
			{isLowest && (
				<Badge className="gap-1 bg-green-600 text-white">
					<TrendingDown className="size-3" />
					Lowest Price
				</Badge>
			)}
		</div>
		<div className="flex gap-4 text-xs text-muted-foreground">
			<span>
				Lowest: <span className="text-green-600">${lowest.toFixed(2)}</span>
			</span>
			<span>
				Highest: <span className="text-destructive">${highest.toFixed(2)}</span>
			</span>
		</div>
	</div>
);

const ActionButtons = () => (
	<div className="flex gap-2">
		<Button variant="outline" size="icon">
			<Heart className="size-4" />
		</Button>
		<Button variant="outline" size="icon">
			<Bell className="size-4" />
		</Button>
		<Button className="flex-1 gap-2">
			<ShoppingCart className="size-4" />
			Buy Now
		</Button>
	</div>
);

export default function Main() {
	const product: ProductProps = {
		image:
			'https://images.unsplash.com/photo-1572569511254-d8f925fe2cbb?w=400&h=400&fit=crop',
		name: 'Sony WH-1000XM5 Headphones',
		currentPrice: 298.0,
		priceHistory: [
			{ date: 'Dec 1', price: 349 },
			{ date: 'Dec 5', price: 349 },
			{ date: 'Dec 10', price: 329 },
			{ date: 'Dec 15', price: 329 },
			{ date: 'Dec 20', price: 319 },
			{ date: 'Dec 25', price: 298 },
			{ date: 'Dec 30', price: 298 },
		],
		lowestPrice: 298,
		highestPrice: 349,
		isLowest: true,
	};

	return (
		<section className="@container">
			<div className="mx-auto max-w-sm px-4 py-8">
				<Card className="space-y-4 p-4">
					<ProductImage src={product.image} alt={product.name} />
					<ProductName text={product.name} />
					<PriceChart
						history={product.priceHistory}
						current={product.currentPrice}
					/>
					<Separator />
					<PriceStats
						current={product.currentPrice}
						lowest={product.lowestPrice}
						highest={product.highestPrice}
						isLowest={product.isLowest}
					/>
					<ActionButtons />
				</Card>
			</div>
		</section>
	);
}
