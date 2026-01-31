import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import {
	Armchair,
	Heart,
	Maximize,
	Package,
	ShoppingCart,
	Star,
	Truck,
} from 'lucide-react';
import Image from 'next/image';

interface FurnitureProps {
	image: string;
	name: string;
	collection: string;
	price: number;
	dimensions: string;
	material: string;
	rating: number;
	reviews: number;
	colors: string[];
	inStock: boolean;
	deliveryWeeks: number;
}

const FurnitureImage = ({ src, alt }: { src: string; alt: string }) => (
	<div className="relative aspect-[4/3] overflow-hidden rounded-xl bg-muted">
		<Image
			src={src}
			alt={alt}
			fill
			className="object-cover transition-transform duration-500 group-hover:scale-105"
		/>
		<Button
			size="icon-sm"
			variant="secondary"
			className="absolute right-3 top-3 bg-white/90"
		>
			<Heart className="size-4" />
		</Button>
	</div>
);

const CollectionBadge = ({ text }: { text: string }) => (
	<Badge variant="outline" className="gap-1 text-xs">
		<Armchair className="size-3" />
		{text}
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

const ProductSpecs = ({
	dimensions,
	material,
}: {
	dimensions: string;
	material: string;
}) => (
	<div className="flex gap-4 text-sm text-muted-foreground">
		<span className="flex items-center gap-1.5">
			<Maximize className="size-4" />
			{dimensions}
		</span>
		<span>{material}</span>
	</div>
);

const ColorOptions = ({ colors }: { colors: string[] }) => (
	<div className="flex items-center gap-2">
		<span className="text-xs text-muted-foreground">Colors:</span>
		<div className="flex gap-1">
			{colors.map((color, i) => (
				<button
					key={i}
					className="size-5 rounded-full border-2 border-border transition-transform hover:scale-110"
					style={{ backgroundColor: color }}
				/>
			))}
		</div>
	</div>
);

const DeliveryInfo = ({
	weeks,
	inStock,
}: {
	weeks: number;
	inStock: boolean;
}) => (
	<div className="flex items-center gap-2 text-sm">
		{inStock ? (
			<span className="flex items-center gap-1.5 text-green-600">
				<Package className="size-4" />
				In Stock
			</span>
		) : (
			<span className="flex items-center gap-1.5 text-muted-foreground">
				<Truck className="size-4" />
				{weeks} weeks delivery
			</span>
		)}
	</div>
);

const PriceTag = ({ amount }: { amount: number }) => (
	<span className="text-xl font-bold text-foreground">
		${amount.toLocaleString()}
	</span>
);

const AddButton = ({ label }: { label: string }) => (
	<Button className="gap-2">
		<ShoppingCart className="size-4" />
		{label}
	</Button>
);

export default function Main() {
	const furniture: FurnitureProps = {
		image:
			'https://images.unsplash.com/photo-1555041469-a586c61ea9bc?w=600&h=450&fit=crop',
		name: 'Modern Velvet Sofa',
		collection: 'Scandinavian',
		price: 1899,
		dimensions: '84"W × 38"D × 33"H',
		material: 'Velvet',
		rating: 4.7,
		reviews: 156,
		colors: ['#2d5a27', '#1a365d', '#7c3aed', '#475569'],
		inStock: true,
		deliveryWeeks: 2,
	};

	return (
		<section className="@container">
			<div className="mx-auto max-w-sm px-4 py-8">
				<Card className="group overflow-hidden">
					<FurnitureImage src={furniture.image} alt={furniture.name} />
					<div className="space-y-3 p-4">
						<div className="flex items-center justify-between">
							<CollectionBadge text={furniture.collection} />
							<ProductRating
								rating={furniture.rating}
								reviews={furniture.reviews}
							/>
						</div>
						<ProductName text={furniture.name} />
						<ProductSpecs
							dimensions={furniture.dimensions}
							material={furniture.material}
						/>
						<ColorOptions colors={furniture.colors} />
						<DeliveryInfo
							weeks={furniture.deliveryWeeks}
							inStock={furniture.inStock}
						/>
						<Separator />
						<div className="flex items-center justify-between">
							<PriceTag amount={furniture.price} />
							<AddButton label="Add" />
						</div>
					</div>
				</Card>
			</div>
		</section>
	);
}
