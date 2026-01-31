import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import {
	Droplets,
	Heart,
	Leaf,
	ShoppingCart,
	Sparkles,
	Star,
	TestTube,
} from 'lucide-react';
import Image from 'next/image';

interface SkincareProps {
	image: string;
	name: string;
	brand: string;
	price: number;
	size: string;
	rating: number;
	reviews: number;
	skinTypes: string[];
	ingredients: string[];
	vegan: boolean;
}

const ProductImage = ({ src, alt }: { src: string; alt: string }) => (
	<div className="relative aspect-[3/4] overflow-hidden rounded-2xl bg-gradient-to-b from-rose-50 to-white dark:from-rose-950/20 dark:to-card">
		<Image
			src={src}
			alt={alt}
			fill
			className="object-contain p-6 transition-transform duration-500 group-hover:scale-105"
		/>
		<Button
			size="icon-sm"
			variant="ghost"
			className="absolute right-3 top-3 text-muted-foreground hover:text-destructive"
		>
			<Heart className="size-4" />
		</Button>
	</div>
);

const VeganBadge = () => (
	<Badge className="absolute left-3 top-3 gap-1 bg-green-600 text-white">
		<Leaf className="size-3" />
		Vegan
	</Badge>
);

const BrandName = ({ text }: { text: string }) => (
	<span className="text-xs font-medium uppercase tracking-wider text-primary">
		{text}
	</span>
);

const ProductName = ({ text }: { text: string }) => (
	<h3 className="font-semibold text-foreground">{text}</h3>
);

const ProductSize = ({ text }: { text: string }) => (
	<span className="text-sm text-muted-foreground">{text}</span>
);

const ProductRating = ({
	rating,
	reviews,
}: {
	rating: number;
	reviews: number;
}) => (
	<div className="flex items-center gap-1.5">
		<Star className="size-4 fill-yellow-400 text-yellow-400" />
		<span className="font-medium">{rating.toFixed(1)}</span>
		<span className="text-sm text-muted-foreground">({reviews})</span>
	</div>
);

const SkinTypes = ({ types }: { types: string[] }) => (
	<div className="space-y-1.5">
		<p className="flex items-center gap-1 text-xs text-muted-foreground">
			<Droplets className="size-3" />
			Skin Types
		</p>
		<div className="flex flex-wrap gap-1">
			{types.map((type, i) => (
				<Badge key={i} variant="outline" className="text-xs">
					{type}
				</Badge>
			))}
		</div>
	</div>
);

const KeyIngredients = ({ items }: { items: string[] }) => (
	<div className="space-y-1.5">
		<p className="flex items-center gap-1 text-xs text-muted-foreground">
			<TestTube className="size-3" />
			Key Ingredients
		</p>
		<div className="flex flex-wrap gap-1">
			{items.map((item, i) => (
				<Badge key={i} variant="secondary" className="text-xs">
					{item}
				</Badge>
			))}
		</div>
	</div>
);

const PriceTag = ({ amount }: { amount: number }) => (
	<span className="text-xl font-bold text-foreground">
		${amount.toFixed(2)}
	</span>
);

const AddButton = ({ label }: { label: string }) => (
	<Button className="gap-2">
		<ShoppingCart className="size-4" />
		{label}
	</Button>
);

export default function Main() {
	const product: SkincareProps = {
		image:
			'https://images.unsplash.com/photo-1620916566398-39f1143ab7be?w=400&h=530&fit=crop',
		name: 'Hydrating Vitamin C Serum',
		brand: 'Glow Lab',
		price: 48.0,
		size: '30ml / 1 fl oz',
		rating: 4.8,
		reviews: 1247,
		skinTypes: ['Dry', 'Normal', 'Combination'],
		ingredients: ['Vitamin C', 'Hyaluronic Acid', 'Niacinamide'],
		vegan: true,
	};

	return (
		<section className="@container">
			<div className="mx-auto max-w-xs px-4 py-8">
				<Card className="group overflow-hidden">
					<div className="relative">
						<ProductImage src={product.image} alt={product.name} />
						{product.vegan && <VeganBadge />}
					</div>
					<div className="space-y-3 p-4">
						<div className="flex items-center justify-between">
							<BrandName text={product.brand} />
							<ProductRating
								rating={product.rating}
								reviews={product.reviews}
							/>
						</div>
						<ProductName text={product.name} />
						<ProductSize text={product.size} />
						<SkinTypes types={product.skinTypes} />
						<KeyIngredients items={product.ingredients} />
						<Separator />
						<div className="flex items-center justify-between">
							<PriceTag amount={product.price} />
							<AddButton label="Add" />
						</div>
					</div>
				</Card>
			</div>
		</section>
	);
}
