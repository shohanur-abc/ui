import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import {
	Baby,
	Heart,
	Shield,
	ShoppingCart,
	Star,
	Sparkles,
	Leaf,
} from 'lucide-react';
import Image from 'next/image';

interface BabyProductProps {
	image: string;
	name: string;
	ageRange: string;
	price: number;
	rating: number;
	reviews: number;
	features: string[];
	safety: boolean;
	organic: boolean;
}

const ProductImage = ({ src, alt }: { src: string; alt: string }) => (
	<div className="relative aspect-square overflow-hidden rounded-2xl bg-gradient-to-br from-pink-50 to-blue-50 dark:from-pink-950/20 dark:to-blue-950/20">
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

const AgeBadge = ({ range }: { range: string }) => (
	<Badge variant="secondary" className="gap-1.5">
		<Baby className="size-3" />
		{range}
	</Badge>
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

const SafetyBadges = ({
	safety,
	organic,
}: {
	safety: boolean;
	organic: boolean;
}) => (
	<div className="flex gap-2">
		{safety && (
			<span className="flex items-center gap-1 text-xs text-green-600">
				<Shield className="size-3" />
				Safety Certified
			</span>
		)}
		{organic && (
			<span className="flex items-center gap-1 text-xs text-green-600">
				<Leaf className="size-3" />
				Organic
			</span>
		)}
	</div>
);

const FeatureList = ({ items }: { items: string[] }) => (
	<div className="flex flex-wrap gap-1.5">
		{items.map((feature, i) => (
			<Badge key={i} variant="outline" className="text-xs">
				{feature}
			</Badge>
		))}
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
	const product: BabyProductProps = {
		image:
			'https://images.unsplash.com/photo-1515488042361-ee00e0ddd4e4?w=400&h=400&fit=crop',
		name: 'Organic Cotton Baby Blanket',
		ageRange: '0-12 months',
		price: 34.99,
		rating: 4.9,
		reviews: 856,
		features: ['Hypoallergenic', 'Machine Washable', 'Ultra Soft'],
		safety: true,
		organic: true,
	};

	return (
		<section className="@container">
			<div className="mx-auto max-w-xs px-4 py-8">
				<Card className="group space-y-4 p-4">
					<ProductImage src={product.image} alt={product.name} />
					<div className="space-y-3">
						<div className="flex items-center justify-between">
							<AgeBadge range={product.ageRange} />
							<ProductRating
								rating={product.rating}
								reviews={product.reviews}
							/>
						</div>
						<ProductName text={product.name} />
						<SafetyBadges safety={product.safety} organic={product.organic} />
						<FeatureList items={product.features} />
					</div>
					<Separator />
					<div className="flex items-center justify-between">
						<PriceTag amount={product.price} />
						<AddButton label="Add" />
					</div>
				</Card>
			</div>
		</section>
	);
}
