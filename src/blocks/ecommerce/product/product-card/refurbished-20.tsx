import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import {
	ExternalLink,
	Heart,
	Package,
	RefreshCw,
	RotateCcw,
	ShoppingCart,
	Star,
} from 'lucide-react';
import Image from 'next/image';

interface ProductProps {
	images: { src: string; alt: string }[];
	name: string;
	brand: string;
	price: number;
	originalPrice: number;
	condition: string;
	rating: number;
	returns: string;
}

const ImageStack = ({ images }: { images: { src: string; alt: string }[] }) => (
	<div className="relative aspect-square">
		{images.map((img, i) => (
			<div
				key={i}
				className={`absolute overflow-hidden rounded-xl bg-muted ${
					i === 0
						? 'inset-0 z-10'
						: i === 1
							? 'right-2 top-2 size-[85%] z-0 opacity-60'
							: 'right-4 top-4 size-[70%] z-0 opacity-30'
				}`}
			>
				<Image src={img.src} alt={img.alt} fill className="object-cover" />
			</div>
		))}
		<Badge className="absolute left-3 top-3 z-20 gap-1 bg-green-600 text-white">
			<RefreshCw className="size-3" />
			Refurbished
		</Badge>
	</div>
);

const ProductBrand = ({ text }: { text: string }) => (
	<span className="text-xs font-medium uppercase tracking-wider text-muted-foreground">
		{text}
	</span>
);

const ProductName = ({ text }: { text: string }) => (
	<h3 className="font-semibold text-foreground">{text}</h3>
);

const ConditionBadge = ({ condition }: { condition: string }) => (
	<Badge variant="outline" className="text-xs">
		{condition}
	</Badge>
);

const ProductRating = ({ rating }: { rating: number }) => (
	<div className="flex items-center gap-1">
		<Star className="size-4 fill-yellow-400 text-yellow-400" />
		<span className="text-sm font-medium">{rating.toFixed(1)}</span>
	</div>
);

const PriceComparison = ({
	current,
	original,
}: {
	current: number;
	original: number;
}) => {
	const savings = original - current;
	return (
		<div className="space-y-1">
			<div className="flex items-center gap-2">
				<span className="text-xl font-bold text-foreground">
					${current.toFixed(0)}
				</span>
				<span className="text-sm text-muted-foreground line-through">
					${original.toFixed(0)}
				</span>
			</div>
			<p className="text-xs text-green-600">You save ${savings.toFixed(0)}</p>
		</div>
	);
};

const ReturnsPolicy = ({ text }: { text: string }) => (
	<div className="flex items-center gap-2 text-xs text-muted-foreground">
		<RotateCcw className="size-3" />
		<span>{text}</span>
	</div>
);

const ActionButtons = () => (
	<div className="flex gap-2">
		<Button size="icon" variant="outline">
			<Heart className="size-4" />
		</Button>
		<Button className="flex-1 gap-2">
			<ShoppingCart className="size-4" />
			Add to Cart
		</Button>
	</div>
);

export default function Main() {
	const product: ProductProps = {
		images: [
			{
				src: 'https://images.unsplash.com/photo-1592286927505-1def25115558?w=400&h=400&fit=crop',
				alt: 'Laptop front',
			},
			{
				src: 'https://images.unsplash.com/photo-1496181133206-80ce9b88a853?w=400&h=400&fit=crop',
				alt: 'Laptop side',
			},
			{
				src: 'https://images.unsplash.com/photo-1525547719571-a2d4ac8945e2?w=400&h=400&fit=crop',
				alt: 'Laptop back',
			},
		],
		name: 'MacBook Pro 14" M3 Pro',
		brand: 'Apple',
		price: 1599,
		originalPrice: 1999,
		condition: 'Excellent - Like New',
		rating: 4.8,
		returns: '90-day returns',
	};

	return (
		<section className="@container">
			<div className="mx-auto max-w-sm px-4 py-8">
				<Card className="overflow-hidden p-4">
					<div className="space-y-4">
						<ImageStack images={product.images} />
						<div className="space-y-2">
							<ProductBrand text={product.brand} />
							<ProductName text={product.name} />
							<div className="flex items-center gap-3">
								<ConditionBadge condition={product.condition} />
								<ProductRating rating={product.rating} />
							</div>
						</div>
						<Separator />
						<PriceComparison
							current={product.price}
							original={product.originalPrice}
						/>
						<ReturnsPolicy text={product.returns} />
						<ActionButtons />
					</div>
				</Card>
			</div>
		</section>
	);
}
