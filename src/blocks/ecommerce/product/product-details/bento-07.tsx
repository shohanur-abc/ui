import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import {
	Star,
	ShoppingCart,
	Heart,
	Wifi,
	Volume2,
	Gauge,
	Settings,
	type LucideIcon,
} from 'lucide-react';
import Link from 'next/link';
import Image from 'next/image';

interface ProductImageProps {
	src: string;
	alt: string;
	badge?: string;
}

interface ProductInfoProps {
	brand: string;
	name: string;
	tagline: string;
}

interface RatingInfoProps {
	rating: number;
	reviews: number;
}

interface PriceInfoProps {
	current: string;
	original?: string;
}

interface TechSpecProps {
	icon: LucideIcon;
	label: string;
	value: string;
}

interface ColorPickerProps {
	colors: { name: string; hex: string; selected?: boolean }[];
}

interface CTAProps {
	buttons: {
		label: string;
		href: string;
		icon?: LucideIcon;
		variant?: 'default' | 'outline';
	}[];
}

interface SmallImageProps {
	src: string;
	alt: string;
}

const ProductImage = ({ src, alt, badge }: ProductImageProps) => (
	<div className="relative aspect-square overflow-hidden rounded-xl bg-muted">
		<Image src={src} alt={alt} fill className="object-cover" />
		{badge && (
			<Badge className="absolute top-3 left-3 bg-primary/90 backdrop-blur-sm">
				{badge}
			</Badge>
		)}
	</div>
);

const ProductInfo = ({ brand, name, tagline }: ProductInfoProps) => (
	<div className="space-y-1">
		<p className="text-sm text-primary font-semibold uppercase tracking-wider">
			{brand}
		</p>
		<h1 className="text-2xl @xl:text-3xl font-bold tracking-tight">{name}</h1>
		<p className="text-muted-foreground">{tagline}</p>
	</div>
);

const RatingInfo = ({ rating, reviews }: RatingInfoProps) => (
	<div className="flex items-center gap-2">
		<div className="flex">
			{Array.from({ length: 5 }).map((_, i) => (
				<Star
					key={i}
					className={`size-4 ${i < rating ? 'fill-yellow-400 text-yellow-400' : 'fill-muted text-muted'}`}
				/>
			))}
		</div>
		<span className="font-medium">{rating}</span>
		<span className="text-sm text-muted-foreground">
			({reviews.toLocaleString()} reviews)
		</span>
	</div>
);

const PriceInfo = ({ current, original }: PriceInfoProps) => (
	<div className="flex items-baseline gap-3">
		<span className="text-3xl font-bold text-primary">{current}</span>
		{original && (
			<span className="text-lg text-muted-foreground line-through">
				{original}
			</span>
		)}
	</div>
);

const TechSpec = ({ icon: Icon, label, value }: TechSpecProps) => (
	<div className="flex items-center gap-3 p-3 rounded-lg bg-muted/30">
		<Icon className="size-5 text-primary" />
		<div>
			<p className="text-xs text-muted-foreground">{label}</p>
			<p className="font-medium text-sm">{value}</p>
		</div>
	</div>
);

const ColorPicker = ({ colors }: ColorPickerProps) => (
	<div className="space-y-2">
		<span className="text-sm font-medium">Color</span>
		<div className="flex gap-2">
			{colors.map((color, i) => (
				<button
					key={i}
					title={color.name}
					className={`size-10 rounded-full border-2 transition-all ${
						color.selected
							? 'border-primary ring-2 ring-primary/30'
							: 'border-transparent hover:border-muted-foreground'
					}`}
					style={{ backgroundColor: color.hex }}
				/>
			))}
		</div>
	</div>
);

const CTA = ({ buttons }: CTAProps) => (
	<div className="flex gap-3">
		{buttons.map((btn, i) => (
			<Button
				key={i}
				variant={btn.variant || 'default'}
				size="lg"
				className={`gap-2 ${i === 0 ? 'flex-1' : ''}`}
				asChild
			>
				<Link href={btn.href}>
					{btn.icon && <btn.icon className="size-4" />}
					{btn.label}
				</Link>
			</Button>
		))}
	</div>
);

const SmallImage = ({ src, alt }: SmallImageProps) => (
	<div className="relative aspect-square overflow-hidden rounded-lg bg-muted">
		<Image src={src} alt={alt} fill className="object-cover" />
	</div>
);

export default function Main() {
	return (
		<section className="@container relative overflow-hidden" data-theme="neon">
			<div className="max-w-7xl mx-auto px-4 @sm:px-6 @2xl:px-8 py-12 @md:py-16 @xl:py-20">
				<div className="grid @lg:grid-cols-3 @xl:grid-cols-4 gap-4">
					{/* Main Image */}
					<div className="@lg:col-span-2 @xl:col-span-2 @lg:row-span-2">
						<ProductImage
							src="https://images.unsplash.com/photo-1608043152269-423dbba4e7e1?w=800"
							alt="Premium speaker"
							badge="New Release"
						/>
					</div>

					{/* Product Details Card */}
					<div className="@lg:col-span-1 @xl:col-span-2 @lg:row-span-2 flex flex-col gap-4 p-6 rounded-xl bg-card border">
						<ProductInfo
							brand="SonicPro"
							name="Quantum Bass Speaker"
							tagline="360° spatial audio with deep bass"
						/>

						<RatingInfo rating={5} reviews={4892} />

						<PriceInfo current="$449" original="$599" />

						<Separator />

						<div className="grid grid-cols-2 gap-2">
							<TechSpec icon={Volume2} label="Output" value="200W RMS" />
							<TechSpec
								icon={Wifi}
								label="Connectivity"
								value="WiFi 6 + BT 5.3"
							/>
							<TechSpec icon={Gauge} label="Response" value="20Hz - 40kHz" />
							<TechSpec icon={Settings} label="Drivers" value="4-way system" />
						</div>

						<ColorPicker
							colors={[
								{ name: 'Midnight Black', hex: '#1a1a1a', selected: true },
								{ name: 'Space Gray', hex: '#4a4a4a' },
								{ name: 'Pearl White', hex: '#f5f5f5' },
							]}
						/>

						<CTA
							buttons={[
								{ label: 'Add to Cart', href: '#cart', icon: ShoppingCart },
								{
									label: 'Save',
									href: '#wishlist',
									icon: Heart,
									variant: 'outline',
								},
							]}
						/>
					</div>

					{/* Gallery Row */}
					<div className="@lg:col-span-3 @xl:col-span-4 grid grid-cols-4 gap-4">
						<SmallImage
							src="https://images.unsplash.com/photo-1608043152269-423dbba4e7e1?w=400"
							alt="Speaker front"
						/>
						<SmallImage
							src="https://images.unsplash.com/photo-1608043152269-423dbba4e7e1?w=400"
							alt="Speaker side"
						/>
						<SmallImage
							src="https://images.unsplash.com/photo-1608043152269-423dbba4e7e1?w=400"
							alt="Speaker back"
						/>
						<SmallImage
							src="https://images.unsplash.com/photo-1608043152269-423dbba4e7e1?w=400"
							alt="Speaker detail"
						/>
					</div>
				</div>
			</div>
		</section>
	);
}
