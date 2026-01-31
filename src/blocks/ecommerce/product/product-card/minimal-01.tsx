import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Heart, ShoppingCart } from 'lucide-react';
import Image from 'next/image';

interface ProductCardProps {
	image: string;
	name: string;
	price: number;
	originalPrice?: number;
	badge?: string;
}

const ProductImage = ({
	src,
	alt,
	badge,
}: {
	src: string;
	alt: string;
	badge?: string;
}) => (
	<div className="relative aspect-square overflow-hidden rounded-t-xl bg-muted">
		<Image
			src={src}
			alt={alt}
			fill
			className="object-cover transition-transform duration-300 group-hover:scale-105"
		/>
		{badge && (
			<Badge className="absolute left-3 top-3" variant="default">
				{badge}
			</Badge>
		)}
		<Button
			size="icon-sm"
			variant="secondary"
			className="absolute right-3 top-3 opacity-0 transition-opacity group-hover:opacity-100"
		>
			<Heart className="size-4" />
		</Button>
	</div>
);

const ProductInfo = ({
	name,
	price,
	originalPrice,
}: {
	name: string;
	price: number;
	originalPrice?: number;
}) => (
	<div className="space-y-2 p-4">
		<h3 className="truncate font-medium text-foreground">{name}</h3>
		<div className="flex items-center gap-2">
			<span className="text-lg font-bold text-primary">
				${price.toFixed(2)}
			</span>
			{originalPrice && (
				<span className="text-sm text-muted-foreground line-through">
					${originalPrice.toFixed(2)}
				</span>
			)}
		</div>
	</div>
);

const AddToCartButton = ({ label }: { label: string }) => (
	<div className="px-4 pb-4">
		<Button className="w-full gap-2" size="sm">
			<ShoppingCart className="size-4" />
			{label}
		</Button>
	</div>
);

export default function Main() {
	const product: ProductCardProps = {
		image:
			'https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=400&h=400&fit=crop',
		name: 'Premium Wireless Headphones',
		price: 299.99,
		originalPrice: 399.99,
		badge: 'Sale',
	};

	return (
		<section className="@container">
			<div className="mx-auto max-w-xs px-4 py-8">
				<Card className="group cursor-pointer overflow-hidden border-border/50 bg-card/50 backdrop-blur-sm transition-all hover:border-primary/50 hover:shadow-lg hover:shadow-primary/10">
					<ProductImage
						src={product.image}
						alt={product.name}
						badge={product.badge}
					/>
					<ProductInfo
						name={product.name}
						price={product.price}
						originalPrice={product.originalPrice}
					/>
					<AddToCartButton label="Add to Cart" />
				</Card>
			</div>
		</section>
	);
}
