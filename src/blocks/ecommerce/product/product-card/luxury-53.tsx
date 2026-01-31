import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import {
	Crown,
	Heart,
	Shield,
	ShoppingCart,
	Star,
	Gem,
	Award,
	Package,
} from 'lucide-react';
import Image from 'next/image';

interface LuxuryProps {
	image: string;
	name: string;
	brand: string;
	price: number;
	rating: number;
	reviews: number;
	material: string;
	warranty: string;
	limited: boolean;
	serialNumber: string;
}

const LuxuryImage = ({ src, alt }: { src: string; alt: string }) => (
	<div className="relative aspect-[4/5] overflow-hidden bg-gradient-to-br from-slate-900 to-slate-800">
		<Image
			src={src}
			alt={alt}
			fill
			className="object-cover transition-transform duration-700 group-hover:scale-105"
		/>
		<div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
		<Button
			size="icon-sm"
			variant="ghost"
			className="absolute right-4 top-4 text-white hover:bg-white/20"
		>
			<Heart className="size-4" />
		</Button>
	</div>
);

const LimitedBadge = () => (
	<Badge className="absolute left-4 top-4 gap-1 bg-gradient-to-r from-amber-500 to-yellow-400 text-black">
		<Crown className="size-3" />
		Limited Edition
	</Badge>
);

const LuxuryBrand = ({ text }: { text: string }) => (
	<span className="text-xs font-semibold uppercase tracking-[0.2em] text-primary">
		{text}
	</span>
);

const LuxuryName = ({ text }: { text: string }) => (
	<h3 className="text-lg font-semibold text-foreground">{text}</h3>
);

const LuxuryRating = ({
	rating,
	reviews,
}: {
	rating: number;
	reviews: number;
}) => (
	<div className="flex items-center gap-1.5">
		<Star className="size-4 fill-amber-400 text-amber-400" />
		<span className="font-medium">{rating.toFixed(1)}</span>
		<span className="text-sm text-muted-foreground">({reviews})</span>
	</div>
);

const MaterialInfo = ({ material }: { material: string }) => (
	<div className="flex items-center gap-2 text-sm text-muted-foreground">
		<Gem className="size-4 text-primary" />
		{material}
	</div>
);

const WarrantyInfo = ({ warranty }: { warranty: string }) => (
	<div className="flex items-center gap-2 text-sm text-muted-foreground">
		<Shield className="size-4 text-green-500" />
		{warranty}
	</div>
);

const SerialNumber = ({ serial }: { serial: string }) => (
	<div className="flex items-center gap-2 text-xs text-muted-foreground">
		<Award className="size-4" />
		Serial: {serial}
	</div>
);

const LuxuryPrice = ({ amount }: { amount: number }) => (
	<div className="space-y-0.5">
		<p className="text-xs uppercase tracking-wide text-muted-foreground">
			Price
		</p>
		<span className="text-2xl font-bold text-foreground">
			${amount.toLocaleString()}
		</span>
	</div>
);

const PurchaseButton = ({ label }: { label: string }) => (
	<Button className="gap-2 bg-gradient-to-r from-amber-500 to-yellow-400 text-black hover:from-amber-600 hover:to-yellow-500">
		<ShoppingCart className="size-4" />
		{label}
	</Button>
);

export default function Main() {
	const luxury: LuxuryProps = {
		image:
			'https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=500&h=625&fit=crop',
		name: 'Heritage Chronograph Watch',
		brand: 'Maison Luxe',
		price: 12500,
		rating: 4.9,
		reviews: 128,
		material: '18K Rose Gold & Sapphire Crystal',
		warranty: 'Lifetime Warranty',
		limited: true,
		serialNumber: 'ML-2025-0042',
	};

	return (
		<section className="@container">
			<div className="mx-auto max-w-xs px-4 py-8">
				<Card className="group overflow-hidden border-0 bg-gradient-to-b from-slate-50 to-white dark:from-slate-900 dark:to-slate-950">
					<div className="relative">
						<LuxuryImage src={luxury.image} alt={luxury.name} />
						{luxury.limited && <LimitedBadge />}
					</div>
					<div className="space-y-4 p-5">
						<div className="flex items-center justify-between">
							<LuxuryBrand text={luxury.brand} />
							<LuxuryRating rating={luxury.rating} reviews={luxury.reviews} />
						</div>
						<LuxuryName text={luxury.name} />
						<div className="space-y-2">
							<MaterialInfo material={luxury.material} />
							<WarrantyInfo warranty={luxury.warranty} />
							<SerialNumber serial={luxury.serialNumber} />
						</div>
						<Separator />
						<div className="flex items-center justify-between">
							<LuxuryPrice amount={luxury.price} />
							<PurchaseButton label="Reserve" />
						</div>
					</div>
				</Card>
			</div>
		</section>
	);
}
