import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import {
	Heart,
	ShoppingCart,
	Star,
	Package,
	Check,
	Truck,
	Shield,
} from 'lucide-react';
import Image from 'next/image';

interface StarterProps {
	image: string;
	name: string;
	brand: string;
	price: number;
	rating: number;
	reviews: number;
	contents: string[];
	perfectFor: string;
	freeShipping: boolean;
	guarantee: string;
}

const ProductImage = ({ src, alt }: { src: string; alt: string }) => (
	<div className="relative aspect-square overflow-hidden rounded-xl bg-gradient-to-br from-green-50 to-emerald-50 dark:from-green-950/20 dark:to-emerald-950/20">
		<Image
			src={src}
			alt={alt}
			fill
			className="object-contain p-6 transition-transform duration-300 group-hover:scale-105"
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

const StarterBadge = () => (
	<Badge className="gap-1 bg-gradient-to-r from-green-500 to-emerald-500 text-white">
		<Package className="size-3" />
		Starter Kit
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

const PerfectForSection = ({ text }: { text: string }) => (
	<div className="rounded-lg bg-green-100 px-3 py-2 text-sm text-green-700 dark:bg-green-950 dark:text-green-400">
		<span className="font-medium">Perfect for:</span> {text}
	</div>
);

const ContentsList = ({ items }: { items: string[] }) => (
	<div className="space-y-2">
		<p className="text-xs font-semibold uppercase tracking-wide text-muted-foreground">
			Kit Contains:
		</p>
		<div className="grid grid-cols-2 gap-1.5">
			{items.map((item, i) => (
				<div
					key={i}
					className="flex items-center gap-1.5 text-sm text-muted-foreground"
				>
					<Check className="size-3 text-green-500" />
					{item}
				</div>
			))}
		</div>
	</div>
);

const ShippingGuarantee = ({
	freeShipping,
	guarantee,
}: {
	freeShipping: boolean;
	guarantee: string;
}) => (
	<div className="flex items-center gap-4">
		{freeShipping && (
			<div className="flex items-center gap-1.5 text-sm text-muted-foreground">
				<Truck className="size-4 text-green-500" />
				Free shipping
			</div>
		)}
		<div className="flex items-center gap-1.5 text-sm text-muted-foreground">
			<Shield className="size-4 text-blue-500" />
			{guarantee}
		</div>
	</div>
);

const PriceTag = ({ amount }: { amount: number }) => (
	<span className="text-xl font-bold text-foreground">
		${amount.toFixed(2)}
	</span>
);

const StartButton = ({ label }: { label: string }) => (
	<Button className="gap-2 bg-gradient-to-r from-green-500 to-emerald-500 hover:from-green-600 hover:to-emerald-600">
		<ShoppingCart className="size-4" />
		{label}
	</Button>
);

export default function Main() {
	const starter: StarterProps = {
		image:
			'https://images.unsplash.com/photo-1556228720-195a672e8a03?w=400&h=400&fit=crop',
		name: "Beginner's Art Starter Kit",
		brand: 'ArtStart',
		price: 49.99,
		rating: 4.7,
		reviews: 423,
		contents: [
			'12 acrylic paints',
			'5 brushes set',
			'2 canvases',
			'Palette',
			'Easel stand',
			'Guide book',
		],
		perfectFor: 'Complete beginners looking to start their creative journey',
		freeShipping: true,
		guarantee: '30-day guarantee',
	};

	return (
		<section className="@container">
			<div className="mx-auto max-w-xs px-4 py-8">
				<Card className="group space-y-4 p-4">
					<ProductImage src={starter.image} alt={starter.name} />
					<div className="space-y-3">
						<div className="flex items-center justify-between">
							<StarterBadge />
							<ProductRating
								rating={starter.rating}
								reviews={starter.reviews}
							/>
						</div>
						<BrandLabel text={starter.brand} />
						<ProductName text={starter.name} />
						<PerfectForSection text={starter.perfectFor} />
						<ContentsList items={starter.contents} />
						<ShippingGuarantee
							freeShipping={starter.freeShipping}
							guarantee={starter.guarantee}
						/>
					</div>
					<Separator />
					<div className="flex items-center justify-between">
						<PriceTag amount={starter.price} />
						<StartButton label="Get Started" />
					</div>
				</Card>
			</div>
		</section>
	);
}
