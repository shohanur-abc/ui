import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import {
	Award,
	Heart,
	ShoppingCart,
	Star,
	Zap,
	Diamond,
	Verified,
} from 'lucide-react';
import Image from 'next/image';

interface PremiumProps {
	image: string;
	name: string;
	brand: string;
	price: number;
	rating: number;
	reviews: number;
	tier: string;
	premiumFeatures: string[];
	warranty: string;
	concierge: boolean;
}

const ProductImage = ({ src, alt }: { src: string; alt: string }) => (
	<div className="relative aspect-square overflow-hidden rounded-xl bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900">
		<Image
			src={src}
			alt={alt}
			fill
			className="object-cover transition-transform duration-700 group-hover:scale-105"
		/>
		<div className="absolute inset-0 ring-1 ring-inset ring-white/10" />
		<Button
			size="icon-sm"
			variant="ghost"
			className="absolute right-3 top-3 text-white/70 hover:bg-white/10 hover:text-white"
		>
			<Heart className="size-4" />
		</Button>
	</div>
);

const PremiumBadge = ({ tier }: { tier: string }) => (
	<Badge className="absolute left-3 top-3 gap-1 bg-gradient-to-r from-slate-700 to-slate-800 text-white ring-1 ring-white/20">
		<Diamond className="size-3" />
		{tier}
	</Badge>
);

const BrandLabel = ({ text }: { text: string }) => (
	<span className="text-xs font-bold uppercase tracking-[0.2em] text-primary">
		{text}
	</span>
);

const ProductName = ({ text }: { text: string }) => (
	<h3 className="text-lg font-semibold text-foreground">{text}</h3>
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

const PremiumFeatures = ({ features }: { features: string[] }) => (
	<div className="space-y-2">
		{features.map((f, i) => (
			<div key={i} className="flex items-center gap-2 text-sm">
				<div className="flex size-5 items-center justify-center rounded-full bg-primary/10">
					<Zap className="size-3 text-primary" />
				</div>
				<span className="text-muted-foreground">{f}</span>
			</div>
		))}
	</div>
);

const WarrantyBadge = ({ text }: { text: string }) => (
	<div className="flex items-center gap-2 text-sm text-muted-foreground">
		<Verified className="size-4 text-green-500" />
		{text}
	</div>
);

const ConciergeService = () => (
	<div className="rounded-lg bg-gradient-to-r from-primary/10 to-primary/5 px-3 py-2 text-sm">
		<div className="flex items-center gap-2">
			<Award className="size-4 text-primary" />
			<span className="text-foreground">Complimentary concierge service</span>
		</div>
	</div>
);

const PriceTag = ({ amount }: { amount: number }) => (
	<span className="text-xl font-bold text-foreground">
		${amount.toLocaleString()}
	</span>
);

const ShopButton = ({ label }: { label: string }) => (
	<Button className="gap-2">
		<ShoppingCart className="size-4" />
		{label}
	</Button>
);

export default function Main() {
	const premium: PremiumProps = {
		image:
			'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=400&h=400&fit=crop',
		name: 'Studio Reference Headphones',
		brand: 'AudioElite',
		price: 899,
		rating: 4.9,
		reviews: 156,
		tier: 'Premium',
		premiumFeatures: [
			'Hand-crafted in Germany',
			'Premium leather & titanium',
			'Studio-grade audio drivers',
			'Personalized tuning available',
		],
		warranty: 'Lifetime warranty included',
		concierge: true,
	};

	return (
		<section className="@container">
			<div className="mx-auto max-w-xs px-4 py-8">
				<Card className="group overflow-hidden border-slate-200 bg-gradient-to-b from-slate-50 to-white dark:border-slate-800 dark:from-slate-900 dark:to-slate-950">
					<div className="relative">
						<ProductImage src={premium.image} alt={premium.name} />
						<PremiumBadge tier={premium.tier} />
					</div>
					<div className="space-y-3 p-4">
						<div className="flex items-center justify-between">
							<BrandLabel text={premium.brand} />
							<ProductRating
								rating={premium.rating}
								reviews={premium.reviews}
							/>
						</div>
						<ProductName text={premium.name} />
						<PremiumFeatures features={premium.premiumFeatures} />
						<WarrantyBadge text={premium.warranty} />
						{premium.concierge && <ConciergeService />}
						<Separator />
						<div className="flex items-center justify-between">
							<PriceTag amount={premium.price} />
							<ShopButton label="Shop" />
						</div>
					</div>
				</Card>
			</div>
		</section>
	);
}
