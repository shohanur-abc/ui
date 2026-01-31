import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import { Gift, Heart, MapPin, Sparkles, Star, Truck } from 'lucide-react';
import Image from 'next/image';

interface GiftProductProps {
	image: string;
	name: string;
	price: number;
	rating: number;
	occasions: string[];
	giftWrap: boolean;
	personalizable: boolean;
	deliveryDate: string;
}

const ProductImage = ({ src, alt }: { src: string; alt: string }) => (
	<div className="relative aspect-square overflow-hidden rounded-xl bg-gradient-to-br from-pink-100 to-purple-100 dark:from-pink-950/30 dark:to-purple-950/30">
		<Image src={src} alt={alt} fill className="object-cover" />
		<div className="absolute -right-6 -top-6 size-24 rotate-12 rounded-full bg-gradient-to-br from-primary/20 to-accent/20 blur-2xl" />
		<Button
			size="icon-sm"
			variant="secondary"
			className="absolute right-3 top-3"
		>
			<Heart className="size-4" />
		</Button>
	</div>
);

const OccasionTags = ({ items }: { items: string[] }) => (
	<div className="flex flex-wrap gap-1.5">
		{items.map((tag, i) => (
			<Badge key={i} variant="secondary" className="text-xs">
				{tag}
			</Badge>
		))}
	</div>
);

const ProductName = ({ text }: { text: string }) => (
	<h3 className="font-semibold text-foreground">{text}</h3>
);

const ProductRating = ({ rating }: { rating: number }) => (
	<div className="flex items-center gap-1">
		<Star className="size-4 fill-yellow-400 text-yellow-400" />
		<span className="text-sm font-medium">{rating.toFixed(1)}</span>
	</div>
);

const GiftFeatures = ({
	giftWrap,
	personalizable,
}: {
	giftWrap: boolean;
	personalizable: boolean;
}) => (
	<div className="flex flex-wrap gap-2">
		{giftWrap && (
			<span className="flex items-center gap-1.5 text-xs text-muted-foreground">
				<Gift className="size-3 text-primary" />
				Free gift wrap
			</span>
		)}
		{personalizable && (
			<span className="flex items-center gap-1.5 text-xs text-muted-foreground">
				<Sparkles className="size-3 text-primary" />
				Personalizable
			</span>
		)}
	</div>
);

const DeliveryInfo = ({ date }: { date: string }) => (
	<div className="flex items-center gap-2 rounded-lg bg-green-500/10 px-3 py-2 text-xs text-green-600 dark:text-green-400">
		<Truck className="size-4" />
		<span>Arrives by {date}</span>
	</div>
);

const PriceTag = ({ amount }: { amount: number }) => (
	<span className="text-xl font-bold text-foreground">
		${amount.toFixed(2)}
	</span>
);

const GiftButton = ({ label }: { label: string }) => (
	<Button className="flex-1 gap-2">
		<Gift className="size-4" />
		{label}
	</Button>
);

export default function Main() {
	const product: GiftProductProps = {
		image:
			'https://images.unsplash.com/photo-1549465220-1a8b9238cd48?w=400&h=400&fit=crop',
		name: 'Luxury Spa Gift Set',
		price: 79.99,
		rating: 4.9,
		occasions: ['Birthday', 'Anniversary', 'Thank You'],
		giftWrap: true,
		personalizable: true,
		deliveryDate: 'Dec 24',
	};

	return (
		<section className="@container">
			<div className="mx-auto max-w-xs px-4 py-8">
				<Card className="space-y-4 p-4">
					<ProductImage src={product.image} alt={product.name} />
					<div className="space-y-3">
						<OccasionTags items={product.occasions} />
						<div className="flex items-start justify-between gap-2">
							<ProductName text={product.name} />
							<ProductRating rating={product.rating} />
						</div>
						<GiftFeatures
							giftWrap={product.giftWrap}
							personalizable={product.personalizable}
						/>
					</div>
					<Separator />
					<DeliveryInfo date={product.deliveryDate} />
					<div className="flex items-center gap-3">
						<PriceTag amount={product.price} />
						<GiftButton label="Send as Gift" />
					</div>
				</Card>
			</div>
		</section>
	);
}
