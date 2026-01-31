import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import {
	Heart,
	Layers,
	Minus,
	Package,
	Plus,
	ShoppingCart,
	Star,
	Truck,
	Percent,
} from 'lucide-react';
import Image from 'next/image';

interface BulkProps {
	image: string;
	name: string;
	brand: string;
	unitPrice: number;
	bulkPrice: number;
	unitCount: number;
	rating: number;
	reviews: number;
	savings: number;
	freeShipping: boolean;
	category: string;
}

const ProductImage = ({ src, alt }: { src: string; alt: string }) => (
	<div className="relative aspect-square overflow-hidden rounded-xl bg-gradient-to-br from-green-50 to-emerald-50 dark:from-green-950/20 dark:to-emerald-950/20">
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

const BulkBadge = ({ savings }: { savings: number }) => (
	<Badge className="absolute left-3 top-3 gap-1 bg-green-600">
		<Percent className="size-3" />
		Save {savings}%
	</Badge>
);

const BrandLabel = ({ text }: { text: string }) => (
	<span className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
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

const PackageContents = ({ count }: { count: number }) => (
	<div className="flex items-center gap-2 rounded-lg bg-muted/50 px-3 py-2 text-sm">
		<Layers className="size-4 text-primary" />
		<span className="text-muted-foreground">Pack of</span>
		<span className="font-bold text-foreground">{count}</span>
		<span className="text-muted-foreground">units</span>
	</div>
);

const PriceComparison = ({
	unit,
	bulk,
	count,
}: {
	unit: number;
	bulk: number;
	count: number;
}) => (
	<div className="space-y-2">
		<div className="flex items-center justify-between text-sm">
			<span className="text-muted-foreground">
				Regular ({count}× ${unit.toFixed(2)})
			</span>
			<span className="text-muted-foreground line-through">
				${(unit * count).toFixed(2)}
			</span>
		</div>
		<div className="flex items-center justify-between">
			<span className="font-medium text-foreground">Bulk Price</span>
			<span className="text-xl font-bold text-foreground">
				${bulk.toFixed(2)}
			</span>
		</div>
		<div className="flex items-center justify-between text-sm text-green-600">
			<span>You Save</span>
			<span className="font-medium">${(unit * count - bulk).toFixed(2)}</span>
		</div>
	</div>
);

const QuantitySelector = () => (
	<div className="flex items-center gap-3">
		<span className="text-sm text-muted-foreground">Qty:</span>
		<div className="flex items-center gap-2">
			<Button size="icon-sm" variant="outline">
				<Minus className="size-4" />
			</Button>
			<span className="w-8 text-center font-medium">1</span>
			<Button size="icon-sm" variant="outline">
				<Plus className="size-4" />
			</Button>
		</div>
	</div>
);

const FreeShipping = () => (
	<div className="flex items-center gap-2 text-sm text-green-600">
		<Truck className="size-4" />
		Free Shipping
	</div>
);

const AddButton = ({ label }: { label: string }) => (
	<Button className="w-full gap-2">
		<ShoppingCart className="size-4" />
		{label}
	</Button>
);

export default function Main() {
	const bulk: BulkProps = {
		image:
			'https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=400&h=400&fit=crop',
		name: 'Organic Coffee Pods',
		brand: 'Mountain Roast',
		unitPrice: 1.5,
		bulkPrice: 89.99,
		unitCount: 100,
		rating: 4.7,
		reviews: 3456,
		savings: 40,
		freeShipping: true,
		category: 'Food & Beverage',
	};

	return (
		<section className="@container">
			<div className="mx-auto max-w-xs px-4 py-8">
				<Card className="group overflow-hidden">
					<div className="relative">
						<ProductImage src={bulk.image} alt={bulk.name} />
						<BulkBadge savings={bulk.savings} />
					</div>
					<div className="space-y-3 p-4">
						<div className="flex items-center justify-between">
							<BrandLabel text={bulk.brand} />
							<ProductRating rating={bulk.rating} reviews={bulk.reviews} />
						</div>
						<ProductName text={bulk.name} />
						<PackageContents count={bulk.unitCount} />
						<PriceComparison
							unit={bulk.unitPrice}
							bulk={bulk.bulkPrice}
							count={bulk.unitCount}
						/>
						<div className="flex items-center justify-between">
							<QuantitySelector />
							{bulk.freeShipping && <FreeShipping />}
						</div>
						<Separator />
						<AddButton label="Add to Cart" />
					</div>
				</Card>
			</div>
		</section>
	);
}
