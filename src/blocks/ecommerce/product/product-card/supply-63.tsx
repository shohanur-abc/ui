import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import {
	Box,
	Heart,
	Minus,
	Plus,
	ShoppingCart,
	Star,
	Truck,
	Package,
} from 'lucide-react';
import Image from 'next/image';

interface SupplyProps {
	image: string;
	name: string;
	brand: string;
	price: number;
	pricePerUnit: number;
	unit: string;
	rating: number;
	reviews: number;
	category: string;
	minOrder: number;
	inStock: number;
	shipping: string;
}

const SupplyImage = ({ src, alt }: { src: string; alt: string }) => (
	<div className="relative aspect-square overflow-hidden rounded-xl bg-muted">
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

const CategoryBadge = ({ text }: { text: string }) => (
	<Badge variant="secondary" className="gap-1 text-xs">
		<Box className="size-3" />
		{text}
	</Badge>
);

const BrandLabel = ({ text }: { text: string }) => (
	<span className="text-xs font-medium uppercase tracking-wider text-muted-foreground">
		{text}
	</span>
);

const SupplyName = ({ text }: { text: string }) => (
	<h3 className="font-semibold text-foreground">{text}</h3>
);

const SupplyRating = ({
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

const QuantitySelector = ({ min }: { min: number }) => (
	<div className="space-y-2">
		<p className="text-xs text-muted-foreground">Quantity (Min: {min})</p>
		<div className="flex items-center gap-2">
			<Button size="icon-sm" variant="outline">
				<Minus className="size-4" />
			</Button>
			<span className="w-12 text-center font-medium">{min}</span>
			<Button size="icon-sm" variant="outline">
				<Plus className="size-4" />
			</Button>
		</div>
	</div>
);

const StockInfo = ({ count }: { count: number }) => (
	<div className="flex items-center gap-2 text-sm text-muted-foreground">
		<Package className="size-4" />
		{count.toLocaleString()} in stock
	</div>
);

const ShippingInfo = ({ text }: { text: string }) => (
	<div className="flex items-center gap-2 text-sm text-muted-foreground">
		<Truck className="size-4 text-green-500" />
		{text}
	</div>
);

const PriceDisplay = ({
	total,
	perUnit,
	unit,
}: {
	total: number;
	perUnit: number;
	unit: string;
}) => (
	<div className="space-y-0.5">
		<span className="text-xl font-bold text-foreground">
			${total.toFixed(2)}
		</span>
		<p className="text-xs text-muted-foreground">
			${perUnit.toFixed(2)} per {unit}
		</p>
	</div>
);

const AddButton = ({ label }: { label: string }) => (
	<Button className="gap-2">
		<ShoppingCart className="size-4" />
		{label}
	</Button>
);

export default function Main() {
	const supply: SupplyProps = {
		image:
			'https://images.unsplash.com/photo-1586075010923-2dd4570fb338?w=400&h=400&fit=crop',
		name: 'Premium Copy Paper (10 Reams)',
		brand: 'OfficeMax',
		price: 89.99,
		pricePerUnit: 8.99,
		unit: 'ream',
		rating: 4.6,
		reviews: 1234,
		category: 'Office Supplies',
		minOrder: 1,
		inStock: 5420,
		shipping: 'Free Business Shipping',
	};

	return (
		<section className="@container">
			<div className="mx-auto max-w-xs px-4 py-8">
				<Card className="group space-y-4 p-4">
					<SupplyImage src={supply.image} alt={supply.name} />
					<div className="space-y-3">
						<div className="flex items-center justify-between">
							<CategoryBadge text={supply.category} />
							<SupplyRating rating={supply.rating} reviews={supply.reviews} />
						</div>
						<BrandLabel text={supply.brand} />
						<SupplyName text={supply.name} />
						<QuantitySelector min={supply.minOrder} />
						<StockInfo count={supply.inStock} />
						<ShippingInfo text={supply.shipping} />
					</div>
					<Separator />
					<div className="flex items-center justify-between">
						<PriceDisplay
							total={supply.price}
							perUnit={supply.pricePerUnit}
							unit={supply.unit}
						/>
						<AddButton label="Add" />
					</div>
				</Card>
			</div>
		</section>
	);
}
