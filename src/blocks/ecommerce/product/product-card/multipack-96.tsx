import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import {
	Heart,
	ShoppingCart,
	Star,
	Package2,
	Check,
	Box,
	Plus,
	Minus,
} from 'lucide-react';
import Image from 'next/image';

interface MultipackProps {
	image: string;
	name: string;
	brand: string;
	singlePrice: number;
	packPrice: number;
	packSize: number;
	rating: number;
	reviews: number;
	flavors: string[];
	calories: number;
	popular: boolean;
}

const ProductImage = ({ src, alt }: { src: string; alt: string }) => (
	<div className="relative aspect-square overflow-hidden rounded-xl bg-gradient-to-br from-amber-50 to-orange-50 dark:from-amber-950/20 dark:to-orange-950/20">
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

const MultipackBadge = ({ size }: { size: number }) => (
	<Badge className="gap-1 bg-gradient-to-r from-amber-500 to-orange-500 text-white">
		<Package2 className="size-3" />
		{size}-Pack
	</Badge>
);

const PopularBadge = () => (
	<Badge variant="destructive" className="absolute left-3 top-3">
		Best Seller
	</Badge>
);

const BrandLabel = ({ text }: { text: string }) => (
	<span className="text-xs font-medium uppercase tracking-wider text-muted-foreground">
		{text}
	</span>
);

const ProductName = ({ text }: { text: string }) => (
	<h3 className="font-semibold text-foreground">{text}</h3>
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

const FlavorTags = ({ flavors }: { flavors: string[] }) => (
	<div className="flex flex-wrap gap-1">
		{flavors.map((f, i) => (
			<Badge key={i} variant="outline" className="text-xs">
				{f}
			</Badge>
		))}
	</div>
);

const CalorieInfo = ({ calories }: { calories: number }) => (
	<div className="text-sm text-muted-foreground">
		<span className="font-medium text-foreground">{calories}</span> cal per bar
	</div>
);

const PriceComparison = ({
	single,
	pack,
	size,
}: {
	single: number;
	pack: number;
	size: number;
}) => {
	const perUnit = pack / size;
	const savings = Math.round(((single - perUnit) / single) * 100);
	return (
		<div className="space-y-1">
			<div className="flex items-baseline gap-2">
				<span className="text-xl font-bold text-foreground">
					${pack.toFixed(2)}
				</span>
				<span className="text-sm text-muted-foreground">
					(${perUnit.toFixed(2)} each)
				</span>
			</div>
			<div className="flex items-center gap-2">
				<span className="text-sm text-muted-foreground line-through">
					${single.toFixed(2)} each
				</span>
				<Badge variant="secondary" className="text-xs text-green-600">
					Save {savings}%
				</Badge>
			</div>
		</div>
	);
};

const QuantitySelector = () => (
	<div className="flex items-center gap-2">
		<Button size="icon-sm" variant="outline">
			<Minus className="size-4" />
		</Button>
		<span className="w-8 text-center font-medium">1</span>
		<Button size="icon-sm" variant="outline">
			<Plus className="size-4" />
		</Button>
	</div>
);

const AddButton = ({ label }: { label: string }) => (
	<Button className="flex-1 gap-2 bg-gradient-to-r from-amber-500 to-orange-500 hover:from-amber-600 hover:to-orange-600">
		<ShoppingCart className="size-4" />
		{label}
	</Button>
);

export default function Main() {
	const multipack: MultipackProps = {
		image:
			'https://images.unsplash.com/photo-1558961363-fa8fdf82db35?w=400&h=400&fit=crop',
		name: 'Protein Bar Variety Pack',
		brand: 'FitSnack',
		singlePrice: 3.99,
		packPrice: 24.99,
		packSize: 12,
		rating: 4.7,
		reviews: 3421,
		flavors: ['Chocolate', 'Peanut', 'Vanilla', 'Caramel'],
		calories: 190,
		popular: true,
	};

	return (
		<section className="@container">
			<div className="mx-auto max-w-xs px-4 py-8">
				<Card className="group overflow-hidden">
					<div className="relative">
						<ProductImage src={multipack.image} alt={multipack.name} />
						{multipack.popular && <PopularBadge />}
					</div>
					<div className="space-y-3 p-4">
						<div className="flex items-center justify-between">
							<MultipackBadge size={multipack.packSize} />
							<ProductRating
								rating={multipack.rating}
								reviews={multipack.reviews}
							/>
						</div>
						<BrandLabel text={multipack.brand} />
						<ProductName text={multipack.name} />
						<FlavorTags flavors={multipack.flavors} />
						<CalorieInfo calories={multipack.calories} />
						<Separator />
						<PriceComparison
							single={multipack.singlePrice}
							pack={multipack.packPrice}
							size={multipack.packSize}
						/>
						<div className="flex items-center gap-3">
							<QuantitySelector />
							<AddButton label="Add" />
						</div>
					</div>
				</Card>
			</div>
		</section>
	);
}
