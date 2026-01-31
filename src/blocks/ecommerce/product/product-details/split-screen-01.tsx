import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import {
	Star,
	ShoppingCart,
	Heart,
	Check,
	Truck,
	Shield,
	RotateCcw,
	type LucideIcon,
} from 'lucide-react';
import Link from 'next/link';
import Image from 'next/image';

interface ProductImageProps {
	src: string;
	alt: string;
}

interface ProductBadgeProps {
	text: string;
	variant?: 'default' | 'secondary' | 'destructive' | 'outline';
}

interface ProductTitleProps {
	text: string;
}

interface ProductPriceProps {
	current: string;
	original?: string;
	discount?: string;
}

interface ProductRatingProps {
	rating: number;
	reviewCount: number;
}

interface ProductDescriptionProps {
	text: string;
}

interface ProductFeatureProps {
	icon: LucideIcon;
	text: string;
}

interface ProductVariantProps {
	label: string;
	options: { value: string; available: boolean }[];
}

interface ProductCTAProps {
	items: {
		label: string;
		href: string;
		icon?: LucideIcon;
		variant?: 'default' | 'outline' | 'secondary';
	}[];
}

interface ProductTrustProps {
	items: { icon: LucideIcon; text: string }[];
}

const ProductImage = ({ src, alt }: ProductImageProps) => (
	<div className="relative aspect-square overflow-hidden rounded-2xl bg-muted/30">
		<Image
			src={src}
			alt={alt}
			fill
			className="object-cover transition-transform duration-500 hover:scale-105"
		/>
		<div className="absolute inset-0 bg-gradient-to-t from-background/20 to-transparent" />
	</div>
);

const ProductBadge = ({ text, variant = 'default' }: ProductBadgeProps) => (
	<Badge variant={variant} className="uppercase tracking-wider text-xs">
		{text}
	</Badge>
);

const ProductTitle = ({ text }: ProductTitleProps) => (
	<h1 className="text-2xl @sm:text-3xl @lg:text-4xl font-bold tracking-tight">
		{text}
	</h1>
);

const ProductPrice = ({ current, original, discount }: ProductPriceProps) => (
	<div className="flex items-center gap-3 flex-wrap">
		<span className="text-2xl @sm:text-3xl font-bold text-primary">
			{current}
		</span>
		{original && (
			<span className="text-lg text-muted-foreground line-through">
				{original}
			</span>
		)}
		{discount && (
			<Badge variant="destructive" className="text-xs">
				{discount}
			</Badge>
		)}
	</div>
);

const ProductRating = ({ rating, reviewCount }: ProductRatingProps) => (
	<div className="flex items-center gap-2">
		<div className="flex items-center gap-0.5">
			{Array.from({ length: 5 }).map((_, i) => (
				<Star
					key={i}
					className={`size-4 ${i < rating ? 'fill-primary text-primary' : 'fill-muted text-muted'}`}
				/>
			))}
		</div>
		<span className="text-sm text-muted-foreground">
			({reviewCount} reviews)
		</span>
	</div>
);

const ProductDescription = ({ text }: ProductDescriptionProps) => (
	<p className="text-muted-foreground leading-relaxed whitespace-pre-line">
		{text}
	</p>
);

const ProductFeatures = ({ items }: { items: ProductFeatureProps[] }) => (
	<ul className="space-y-2">
		{items.map((feature, i) => (
			<li key={i} className="flex items-center gap-2 text-sm">
				<feature.icon className="size-4 text-primary" />
				<span>{feature.text}</span>
			</li>
		))}
	</ul>
);

const ProductVariant = ({ label, options }: ProductVariantProps) => (
	<div className="space-y-2">
		<span className="text-sm font-medium">{label}</span>
		<div className="flex flex-wrap gap-2">
			{options.map((option, i) => (
				<button
					key={i}
					disabled={!option.available}
					className="px-4 py-2 text-sm border rounded-lg transition-all hover:border-primary hover:bg-primary/5 disabled:opacity-50 disabled:cursor-not-allowed focus-visible:ring-2 focus-visible:ring-primary"
				>
					{option.value}
				</button>
			))}
		</div>
	</div>
);

const ProductCTA = ({ items }: ProductCTAProps) => (
	<div className="flex flex-wrap gap-3">
		{items.map((item, i) => (
			<Button
				key={i}
				variant={item.variant || 'default'}
				size="lg"
				className="gap-2"
				asChild
			>
				<Link href={item.href}>
					{item.icon && <item.icon className="size-4" />}
					{item.label}
				</Link>
			</Button>
		))}
	</div>
);

const ProductTrust = ({ items }: ProductTrustProps) => (
	<div className="flex flex-wrap gap-4 @lg:gap-6">
		{items.map((item, i) => (
			<div
				key={i}
				className="flex items-center gap-2 text-sm text-muted-foreground"
			>
				<item.icon className="size-4" />
				<span>{item.text}</span>
			</div>
		))}
	</div>
);

export default function Main() {
	return (
		<section className="@container relative overflow-hidden" data-theme="neon">
			<div className="max-w-7xl mx-auto px-4 @sm:px-6 @2xl:px-8 py-12 @md:py-16 @xl:py-20">
				<div className="grid @lg:grid-cols-2 gap-8 @lg:gap-12 @xl:gap-16">
					{/* Left: Product Image */}
					<div>
						<ProductImage
							src="https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=800"
							alt="Premium smartwatch with leather strap"
						/>
					</div>

					{/* Right: Product Details */}
					<div className="flex flex-col gap-6">
						<div className="flex flex-wrap gap-2">
							<ProductBadge text="New Arrival" />
							<ProductBadge text="Limited Edition" variant="outline" />
						</div>

						<ProductTitle text="Premium Chronograph Watch" />

						<ProductRating rating={4} reviewCount={128} />

						<ProductPrice current="$299" original="$399" discount="-25%" />

						<Separator />

						<ProductDescription text="Crafted with precision and elegance, this premium chronograph watch features a stunning leather strap and sapphire crystal display. Water-resistant up to 100 meters with Swiss movement technology." />

						<ProductFeatures
							items={[
								{ icon: Check, text: 'Swiss automatic movement' },
								{ icon: Check, text: 'Sapphire crystal glass' },
								{ icon: Check, text: 'Genuine Italian leather strap' },
								{ icon: Check, text: '100m water resistance' },
							]}
						/>

						<ProductVariant
							label="Strap Color"
							options={[
								{ value: 'Black', available: true },
								{ value: 'Brown', available: true },
								{ value: 'Navy', available: false },
							]}
						/>

						<ProductCTA
							items={[
								{ label: 'Add to Cart', href: '#cart', icon: ShoppingCart },
								{
									label: 'Save',
									href: '#wishlist',
									icon: Heart,
									variant: 'outline',
								},
							]}
						/>

						<Separator />

						<ProductTrust
							items={[
								{ icon: Truck, text: 'Free shipping' },
								{ icon: Shield, text: '2 Year warranty' },
								{ icon: RotateCcw, text: '30-day returns' },
							]}
						/>
					</div>
				</div>
			</div>
		</section>
	);
}
