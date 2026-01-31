import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Heart, ShoppingBag, Star } from 'lucide-react';
import Image from 'next/image';

interface ProductProps {
	image: string;
	name: string;
	designer: string;
	price: number;
	rating: number;
	discount?: number;
}

const ProductImage = ({ src, alt }: { src: string; alt: string }) => (
	<Image
		src={src}
		alt={alt}
		fill
		className="object-cover transition-transform duration-700 group-hover:scale-110"
	/>
);

const GradientOverlay = () => (
	<div className="absolute inset-0 bg-gradient-to-t from-black via-black/50 to-transparent opacity-60 transition-opacity group-hover:opacity-80" />
);

const DiscountBadge = ({ percent }: { percent: number }) => (
	<Badge className="absolute left-4 top-4 bg-destructive text-destructive-foreground">
		-{percent}%
	</Badge>
);

const WishlistButton = () => (
	<Button
		size="icon-sm"
		variant="secondary"
		className="absolute right-4 top-4 bg-white/10 backdrop-blur-md hover:bg-white/20"
	>
		<Heart className="size-4" />
	</Button>
);

const ProductInfo = ({
	name,
	designer,
	rating,
}: {
	name: string;
	designer: string;
	rating: number;
}) => (
	<div className="space-y-2">
		<p className="text-sm text-white/70">{designer}</p>
		<h3 className="text-xl font-semibold text-white">{name}</h3>
		<div className="flex items-center gap-1">
			<Star className="size-4 fill-primary text-primary" />
			<span className="text-sm text-white/80">{rating.toFixed(1)}</span>
		</div>
	</div>
);

const PriceTag = ({
	amount,
	discount,
}: {
	amount: number;
	discount?: number;
}) => {
	const finalPrice = discount ? amount * (1 - discount / 100) : amount;
	return (
		<div className="flex items-baseline gap-2">
			<span className="text-2xl font-bold text-white">
				${finalPrice.toFixed(0)}
			</span>
			{discount && (
				<span className="text-sm text-white/50 line-through">${amount}</span>
			)}
		</div>
	);
};

const QuickAddButton = ({ label }: { label: string }) => (
	<Button
		size="sm"
		className="w-full gap-2 bg-white text-black hover:bg-white/90"
	>
		<ShoppingBag className="size-4" />
		{label}
	</Button>
);

export default function Main() {
	const product: ProductProps = {
		image:
			'https://images.unsplash.com/photo-1584917865442-de89df76afd3?w=400&h=600&fit=crop',
		name: 'Designer Leather Bag',
		designer: 'Maison Luxe',
		price: 890,
		rating: 4.8,
		discount: 20,
	};

	return (
		<section className="@container">
			<div className="mx-auto max-w-xs px-4 py-8">
				<div className="group relative aspect-[3/4] cursor-pointer overflow-hidden rounded-2xl">
					<ProductImage src={product.image} alt={product.name} />
					<GradientOverlay />
					{product.discount && <DiscountBadge percent={product.discount} />}
					<WishlistButton />
					<div className="absolute inset-x-0 bottom-0 space-y-4 p-5">
						<ProductInfo
							name={product.name}
							designer={product.designer}
							rating={product.rating}
						/>
						<div className="flex items-center justify-between">
							<PriceTag amount={product.price} discount={product.discount} />
						</div>
						<div className="translate-y-full opacity-0 transition-all duration-300 group-hover:translate-y-0 group-hover:opacity-100">
							<QuickAddButton label="Add to Bag" />
						</div>
					</div>
				</div>
			</div>
		</section>
	);
}
