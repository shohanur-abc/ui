import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { Separator } from '@/components/ui/separator';
import {
	Bell,
	Calendar,
	Clock,
	Heart,
	Package,
	ShoppingCart,
	Star,
	Truck,
} from 'lucide-react';
import Image from 'next/image';

interface PreorderProps {
	image: string;
	name: string;
	brand: string;
	price: number;
	originalPrice: number;
	rating: number;
	preorders: number;
	releaseDate: string;
	daysUntil: number;
	deposit: number;
	features: string[];
	guaranteed: boolean;
}

const ProductImage = ({ src, alt }: { src: string; alt: string }) => (
	<div className="relative aspect-square overflow-hidden rounded-xl bg-muted">
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

const PreorderBadge = () => (
	<Badge className="absolute left-3 top-3 gap-1 bg-gradient-to-r from-violet-600 to-purple-600">
		<Bell className="size-3" />
		Pre-Order
	</Badge>
);

const BrandLabel = ({ text }: { text: string }) => (
	<span className="text-xs font-semibold uppercase tracking-wider text-primary">
		{text}
	</span>
);

const ProductName = ({ text }: { text: string }) => (
	<h3 className="font-semibold text-foreground">{text}</h3>
);

const PreorderRating = ({
	rating,
	preorders,
}: {
	rating: number;
	preorders: number;
}) => (
	<div className="flex items-center gap-3">
		<div className="flex items-center gap-1.5">
			<Star className="size-4 fill-yellow-400 text-yellow-400" />
			<span className="font-medium">{rating.toFixed(1)}</span>
		</div>
		<span className="text-sm text-muted-foreground">
			{preorders.toLocaleString()} pre-orders
		</span>
	</div>
);

const ReleaseCountdown = ({ date, days }: { date: string; days: number }) => (
	<div className="space-y-2 rounded-lg bg-muted/50 p-3">
		<div className="flex items-center justify-between">
			<div className="flex items-center gap-2 text-sm text-muted-foreground">
				<Calendar className="size-4" />
				{date}
			</div>
			<Badge variant="secondary" className="text-xs">
				{days} days left
			</Badge>
		</div>
		<Progress value={((30 - days) / 30) * 100} className="h-2" />
	</div>
);

const GuaranteedBadge = () => (
	<div className="flex items-center gap-2 text-sm text-green-600">
		<Truck className="size-4" />
		Guaranteed release day delivery
	</div>
);

const FeatureList = ({ features }: { features: string[] }) => (
	<div className="flex flex-wrap gap-1.5">
		{features.map((f, i) => (
			<Badge key={i} variant="outline" className="text-xs">
				{f}
			</Badge>
		))}
	</div>
);

const PriceDisplay = ({
	price,
	original,
	deposit,
}: {
	price: number;
	original: number;
	deposit: number;
}) => (
	<div className="space-y-1">
		<div className="flex items-baseline gap-2">
			<span className="text-xl font-bold text-foreground">
				${price.toFixed(2)}
			</span>
			{original > price && (
				<span className="text-sm text-muted-foreground line-through">
					${original.toFixed(2)}
				</span>
			)}
		</div>
		<p className="text-xs text-muted-foreground">${deposit} deposit now</p>
	</div>
);

const PreorderButton = ({ label }: { label: string }) => (
	<Button className="gap-2">
		<Bell className="size-4" />
		{label}
	</Button>
);

export default function Main() {
	const preorder: PreorderProps = {
		image:
			'https://images.unsplash.com/photo-1606144042614-b2417e99c4e3?w=400&h=400&fit=crop',
		name: 'Next-Gen Console',
		brand: 'GameTech',
		price: 499.99,
		originalPrice: 549.99,
		rating: 4.9,
		preorders: 125430,
		releaseDate: 'Nov 15, 2025',
		daysUntil: 18,
		deposit: 50,
		features: ['4K Gaming', '1TB SSD', 'Ray Tracing'],
		guaranteed: true,
	};

	return (
		<section className="@container">
			<div className="mx-auto max-w-xs px-4 py-8">
				<Card className="group overflow-hidden">
					<div className="relative">
						<ProductImage src={preorder.image} alt={preorder.name} />
						<PreorderBadge />
					</div>
					<div className="space-y-3 p-4">
						<BrandLabel text={preorder.brand} />
						<ProductName text={preorder.name} />
						<PreorderRating
							rating={preorder.rating}
							preorders={preorder.preorders}
						/>
						<ReleaseCountdown
							date={preorder.releaseDate}
							days={preorder.daysUntil}
						/>
						{preorder.guaranteed && <GuaranteedBadge />}
						<FeatureList features={preorder.features} />
						<Separator />
						<div className="flex items-center justify-between">
							<PriceDisplay
								price={preorder.price}
								original={preorder.originalPrice}
								deposit={preorder.deposit}
							/>
							<PreorderButton label="Reserve" />
						</div>
					</div>
				</Card>
			</div>
		</section>
	);
}
