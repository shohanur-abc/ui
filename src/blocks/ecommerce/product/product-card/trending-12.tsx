import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { ArrowUpRight, TrendingUp } from 'lucide-react';
import Image from 'next/image';

interface ProductProps {
	image: string;
	name: string;
	price: number;
	viewsToday: number;
	boughtToday: number;
	trending: boolean;
}

const ProductImage = ({ src, alt }: { src: string; alt: string }) => (
	<div className="relative aspect-[3/4] overflow-hidden bg-muted">
		<Image
			src={src}
			alt={alt}
			fill
			className="object-cover transition-all duration-500 group-hover:scale-105 group-hover:brightness-110"
		/>
	</div>
);

const TrendingBadge = () => (
	<div className="absolute right-3 top-3 flex items-center gap-1.5 rounded-full bg-primary px-2.5 py-1 text-xs font-medium text-primary-foreground">
		<TrendingUp className="size-3" />
		Trending
	</div>
);

const SocialProof = ({ views, bought }: { views: number; bought: number }) => (
	<div className="flex gap-4 text-xs text-muted-foreground">
		<span className="flex items-center gap-1">
			<span className="size-2 animate-pulse rounded-full bg-green-500" />
			{views} viewing now
		</span>
		<span>{bought}+ bought today</span>
	</div>
);

const ProductName = ({ text }: { text: string }) => (
	<h3 className="font-semibold text-foreground transition-colors group-hover:text-primary">
		{text}
	</h3>
);

const ProductPrice = ({ amount }: { amount: number }) => (
	<span className="text-xl font-bold text-foreground">
		${amount.toFixed(0)}
	</span>
);

const ShopButton = ({ label }: { label: string }) => (
	<Button
		variant="outline"
		className="gap-1.5 transition-colors group-hover:bg-primary group-hover:text-primary-foreground"
	>
		{label}
		<ArrowUpRight className="size-4" />
	</Button>
);

export default function Main() {
	const product: ProductProps = {
		image:
			'https://images.unsplash.com/photo-1583743814966-8936f5b7be1a?w=400&h=530&fit=crop',
		name: 'Vintage Graphic Tee',
		price: 45,
		viewsToday: 127,
		boughtToday: 43,
		trending: true,
	};

	return (
		<section className="@container">
			<div className="mx-auto max-w-xs px-4 py-8">
				<Card className="group cursor-pointer overflow-hidden border-0 shadow-lg transition-shadow hover:shadow-xl">
					<div className="relative">
						<ProductImage src={product.image} alt={product.name} />
						{product.trending && <TrendingBadge />}
					</div>
					<div className="space-y-3 p-4">
						<SocialProof
							views={product.viewsToday}
							bought={product.boughtToday}
						/>
						<ProductName text={product.name} />
						<div className="flex items-center justify-between">
							<ProductPrice amount={product.price} />
							<ShopButton label="Shop" />
						</div>
					</div>
				</Card>
			</div>
		</section>
	);
}
