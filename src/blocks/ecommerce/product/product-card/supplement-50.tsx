import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { Separator } from '@/components/ui/separator';
import {
	Dumbbell,
	Heart,
	ShoppingCart,
	Star,
	Truck,
	Weight,
	Flame,
	Apple,
} from 'lucide-react';
import Image from 'next/image';

interface SupplementProps {
	image: string;
	name: string;
	brand: string;
	price: number;
	servings: number;
	rating: number;
	reviews: number;
	flavor: string;
	type: string;
	nutrition: { protein: number; calories: number };
	inStock: boolean;
}

const ProductImage = ({ src, alt }: { src: string; alt: string }) => (
	<div className="relative aspect-square overflow-hidden rounded-xl bg-gradient-to-br from-blue-50 to-indigo-50 dark:from-blue-950/20 dark:to-indigo-950/20">
		<Image
			src={src}
			alt={alt}
			fill
			className="object-contain p-4 transition-transform duration-300 group-hover:scale-105"
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

const TypeBadge = ({ text }: { text: string }) => (
	<Badge variant="secondary" className="gap-1 text-xs">
		<Dumbbell className="size-3" />
		{text}
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

const FlavorInfo = ({
	flavor,
	servings,
}: {
	flavor: string;
	servings: number;
}) => (
	<div className="flex gap-3 text-sm text-muted-foreground">
		<span className="flex items-center gap-1">
			<Apple className="size-4" />
			{flavor}
		</span>
		<span>{servings} servings</span>
	</div>
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

const NutritionInfo = ({
	protein,
	calories,
}: {
	protein: number;
	calories: number;
}) => (
	<div className="grid grid-cols-2 gap-3">
		<div className="flex items-center gap-2 rounded-lg bg-muted/50 px-3 py-2">
			<Weight className="size-4 text-primary" />
			<div className="text-sm">
				<span className="font-semibold">{protein}g</span>
				<span className="text-muted-foreground"> protein</span>
			</div>
		</div>
		<div className="flex items-center gap-2 rounded-lg bg-muted/50 px-3 py-2">
			<Flame className="size-4 text-orange-500" />
			<div className="text-sm">
				<span className="font-semibold">{calories}</span>
				<span className="text-muted-foreground"> cal</span>
			</div>
		</div>
	</div>
);

const StockStatus = ({ inStock }: { inStock: boolean }) => (
	<div className="flex items-center gap-2 text-sm">
		<Truck className="size-4 text-green-600" />
		<span className={inStock ? 'text-green-600' : 'text-destructive'}>
			{inStock ? 'In Stock - Free Shipping' : 'Out of Stock'}
		</span>
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
	const supplement: SupplementProps = {
		image:
			'https://images.unsplash.com/photo-1593095948071-474c5cc2989d?w=400&h=400&fit=crop',
		name: 'Gold Standard Whey Protein',
		brand: 'Optimum Nutrition',
		price: 54.99,
		servings: 74,
		rating: 4.8,
		reviews: 12453,
		flavor: 'Double Chocolate',
		type: 'Whey Protein',
		nutrition: { protein: 24, calories: 120 },
		inStock: true,
	};

	return (
		<section className="@container">
			<div className="mx-auto max-w-xs px-4 py-8">
				<Card className="group space-y-4 p-4">
					<ProductImage src={supplement.image} alt={supplement.name} />
					<div className="space-y-3">
						<div className="flex items-center justify-between">
							<TypeBadge text={supplement.type} />
							<ProductRating
								rating={supplement.rating}
								reviews={supplement.reviews}
							/>
						</div>
						<BrandName text={supplement.brand} />
						<ProductName text={supplement.name} />
						<FlavorInfo
							flavor={supplement.flavor}
							servings={supplement.servings}
						/>
						<NutritionInfo {...supplement.nutrition} />
						<StockStatus inStock={supplement.inStock} />
					</div>
					<Separator />
					<div className="flex items-center justify-between">
						<PriceTag amount={supplement.price} />
						<AddButton label="Add" />
					</div>
				</Card>
			</div>
		</section>
	);
}
