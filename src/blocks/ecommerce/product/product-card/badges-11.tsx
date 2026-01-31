import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Gift, Heart, ShoppingCart, Star, Zap } from 'lucide-react';
import Image from 'next/image';

interface ProductProps {
	image: string;
	name: string;
	price: number;
	originalPrice: number;
	rating: number;
	reviews: number;
	badges: { type: string; text: string }[];
	freeGift?: string;
}

const ProductImage = ({ src, alt }: { src: string; alt: string }) => (
	<div className="relative aspect-square overflow-hidden rounded-t-xl bg-gradient-to-br from-muted to-muted/50">
		<Image
			src={src}
			alt={alt}
			fill
			className="object-cover mix-blend-multiply"
		/>
	</div>
);

const BadgeStack = ({ items }: { items: { type: string; text: string }[] }) => (
	<div className="absolute left-3 top-3 flex flex-col gap-1.5">
		{items.map((badge, i) => (
			<Badge
				key={i}
				className={
					badge.type === 'sale'
						? 'bg-destructive text-destructive-foreground'
						: badge.type === 'hot'
							? 'bg-orange-500 text-white'
							: 'bg-primary text-primary-foreground'
				}
			>
				{badge.type === 'hot' && <Zap className="mr-1 size-3" />}
				{badge.text}
			</Badge>
		))}
	</div>
);

const WishlistButton = () => (
	<Button
		size="icon-sm"
		variant="ghost"
		className="absolute right-3 top-3 text-muted-foreground hover:text-destructive"
	>
		<Heart className="size-4" />
	</Button>
);

const ProductRating = ({
	rating,
	reviews,
}: {
	rating: number;
	reviews: number;
}) => (
	<div className="flex items-center gap-1.5">
		<div className="flex">
			{Array.from({ length: 5 }).map((_, i) => (
				<Star
					key={i}
					className={`size-3.5 ${i < Math.floor(rating) ? 'fill-yellow-400 text-yellow-400' : 'fill-muted text-muted'}`}
				/>
			))}
		</div>
		<span className="text-xs text-muted-foreground">({reviews})</span>
	</div>
);

const ProductName = ({ text }: { text: string }) => (
	<h3 className="line-clamp-2 text-sm font-medium text-foreground">{text}</h3>
);

const PriceDisplay = ({
	current,
	original,
}: {
	current: number;
	original: number;
}) => (
	<div className="flex items-center gap-2">
		<span className="text-lg font-bold text-primary">
			${current.toFixed(2)}
		</span>
		<span className="text-sm text-muted-foreground line-through">
			${original.toFixed(2)}
		</span>
	</div>
);

const FreeGiftBanner = ({ text }: { text: string }) => (
	<div className="flex items-center gap-2 rounded-lg bg-green-500/10 px-3 py-2 text-xs text-green-600 dark:text-green-400">
		<Gift className="size-4" />
		<span>{text}</span>
	</div>
);

const QuickAddButton = ({ label }: { label: string }) => (
	<Button size="sm" className="w-full gap-2">
		<ShoppingCart className="size-4" />
		{label}
	</Button>
);

export default function Main() {
	const product: ProductProps = {
		image:
			'https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=400&h=400&fit=crop',
		name: 'Smart Fitness Tracker with Heart Rate Monitor',
		price: 79.99,
		originalPrice: 149.99,
		rating: 4.7,
		reviews: 2341,
		badges: [
			{ type: 'sale', text: '-47%' },
			{ type: 'hot', text: 'Best Seller' },
		],
		freeGift: 'Free silicone band included',
	};

	return (
		<section className="@container">
			<div className="mx-auto max-w-xs px-4 py-8">
				<Card className="group relative overflow-hidden">
					<ProductImage src={product.image} alt={product.name} />
					<BadgeStack items={product.badges} />
					<WishlistButton />
					<div className="space-y-3 p-4">
						<ProductRating rating={product.rating} reviews={product.reviews} />
						<ProductName text={product.name} />
						<PriceDisplay
							current={product.price}
							original={product.originalPrice}
						/>
						{product.freeGift && <FreeGiftBanner text={product.freeGift} />}
						<QuickAddButton label="Quick Add" />
					</div>
				</Card>
			</div>
		</section>
	);
}
