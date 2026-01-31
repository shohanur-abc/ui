import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import {
	Heart,
	ShoppingCart,
	Star,
	Zap,
	Check,
	TrendingUp,
	Crown,
} from 'lucide-react';
import Image from 'next/image';

interface ProProps {
	image: string;
	name: string;
	brand: string;
	price: number;
	rating: number;
	reviews: number;
	proFeatures: string[];
	basicFeatures: string[];
	popular: boolean;
	savings: number;
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

const ProBadge = () => (
	<Badge className="gap-1 bg-gradient-to-r from-blue-600 to-indigo-600">
		<Zap className="size-3" />
		Pro
	</Badge>
);

const PopularBadge = () => (
	<Badge variant="destructive" className="absolute left-3 top-3 gap-1">
		<TrendingUp className="size-3" />
		Most Popular
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

const ProFeatures = ({ features }: { features: string[] }) => (
	<div className="space-y-1.5">
		<p className="flex items-center gap-1 text-xs font-medium text-primary">
			<Crown className="size-3" />
			Pro Features
		</p>
		{features.map((f, i) => (
			<div key={i} className="flex items-center gap-2 text-sm">
				<div className="flex size-4 items-center justify-center rounded-full bg-primary">
					<Check className="size-3 text-primary-foreground" />
				</div>
				<span className="text-foreground">{f}</span>
			</div>
		))}
	</div>
);

const BasicFeatures = ({ features }: { features: string[] }) => (
	<div className="space-y-1.5">
		<p className="text-xs text-muted-foreground">Also includes:</p>
		{features.map((f, i) => (
			<div
				key={i}
				className="flex items-center gap-2 text-sm text-muted-foreground"
			>
				<Check className="size-4 shrink-0 text-green-500" />
				{f}
			</div>
		))}
	</div>
);

const PriceDisplay = ({
	price,
	savings,
}: {
	price: number;
	savings: number;
}) => (
	<div className="space-y-0.5">
		<span className="text-xl font-bold text-foreground">
			${price.toFixed(2)}
		</span>
		<div className="flex items-center gap-1 text-sm text-green-600">
			<Zap className="size-3" />
			Save ${savings} vs. buying separately
		</div>
	</div>
);

const UpgradeButton = ({ label }: { label: string }) => (
	<Button className="w-full gap-2 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700">
		<Zap className="size-4" />
		{label}
	</Button>
);

export default function Main() {
	const pro: ProProps = {
		image:
			'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=400&h=400&fit=crop',
		name: 'Studio Headphones Pro',
		brand: 'AudioTech',
		price: 199.99,
		rating: 4.8,
		reviews: 892,
		proFeatures: [
			'Active noise cancellation',
			'40-hour battery life',
			'Hi-Res audio certified',
		],
		basicFeatures: ['Premium memory foam', 'Bluetooth 5.3', 'Carrying case'],
		popular: true,
		savings: 50,
	};

	return (
		<section className="@container">
			<div className="mx-auto max-w-xs px-4 py-8">
				<Card className="group overflow-hidden border-primary/20 ring-2 ring-primary/10">
					<div className="relative">
						<ProductImage src={pro.image} alt={pro.name} />
						{pro.popular && <PopularBadge />}
					</div>
					<div className="space-y-3 p-4">
						<div className="flex items-center justify-between">
							<ProBadge />
							<ProductRating rating={pro.rating} reviews={pro.reviews} />
						</div>
						<BrandLabel text={pro.brand} />
						<ProductName text={pro.name} />
						<ProFeatures features={pro.proFeatures} />
						<BasicFeatures features={pro.basicFeatures} />
						<Separator />
						<PriceDisplay price={pro.price} savings={pro.savings} />
						<UpgradeButton label="Get Pro" />
					</div>
				</Card>
			</div>
		</section>
	);
}
