import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import {
	Heart,
	PenTool,
	ShoppingCart,
	Star,
	Clock,
	Type,
	Sparkles,
} from 'lucide-react';
import Image from 'next/image';

interface PersonalizedProps {
	image: string;
	name: string;
	brand: string;
	basePrice: number;
	rating: number;
	reviews: number;
	personalizationTypes: { name: string; price: number }[];
	selectedType: number;
	fonts: string[];
	maxChars: number;
	preview: string;
}

const ProductImage = ({ src, alt }: { src: string; alt: string }) => (
	<div className="relative aspect-[4/3] overflow-hidden rounded-xl bg-muted">
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

const PersonalizedBadge = () => (
	<Badge className="absolute left-3 top-3 gap-1 bg-gradient-to-r from-pink-500 to-rose-500">
		<PenTool className="size-3" />
		Personalized
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

const TypeSelector = ({
	types,
	selected,
}: {
	types: { name: string; price: number }[];
	selected: number;
}) => (
	<div className="space-y-2">
		<p className="text-xs text-muted-foreground">Personalization Style</p>
		<div className="flex flex-wrap gap-2">
			{types.map((type, i) => (
				<button
					key={i}
					className={`rounded-lg border px-3 py-1.5 text-sm transition-colors ${
						i === selected
							? 'border-primary bg-primary/10 text-primary'
							: 'border-border bg-muted/50 text-muted-foreground hover:border-primary/50'
					}`}
				>
					{type.name} (+${type.price})
				</button>
			))}
		</div>
	</div>
);

const FontSelector = ({ fonts }: { fonts: string[] }) => (
	<div className="space-y-2">
		<p className="flex items-center gap-1 text-xs text-muted-foreground">
			<Type className="size-3" />
			Choose Font
		</p>
		<div className="flex gap-2">
			{fonts.map((font, i) => (
				<Badge
					key={i}
					variant={i === 0 ? 'default' : 'outline'}
					className="cursor-pointer text-xs"
					style={{ fontFamily: font }}
				>
					Aa
				</Badge>
			))}
		</div>
	</div>
);

const TextPreview = ({
	text,
	maxChars,
}: {
	text: string;
	maxChars: number;
}) => (
	<div className="space-y-2">
		<div className="flex items-center justify-between">
			<p className="text-xs text-muted-foreground">Your Text</p>
			<span className="text-xs text-muted-foreground">
				{text.length}/{maxChars}
			</span>
		</div>
		<input
			type="text"
			defaultValue={text}
			maxLength={maxChars}
			className="w-full rounded-lg border border-input bg-background px-3 py-2 text-center text-sm placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary"
		/>
	</div>
);

const PriceDisplay = ({ base, extra }: { base: number; extra: number }) => (
	<div className="space-y-0.5">
		<span className="text-xl font-bold text-foreground">
			${(base + extra).toFixed(2)}
		</span>
		<p className="text-xs text-muted-foreground">
			${base.toFixed(2)} + ${extra.toFixed(2)} personalization
		</p>
	</div>
);

const OrderButton = ({ label }: { label: string }) => (
	<Button className="gap-2">
		<Sparkles className="size-4" />
		{label}
	</Button>
);

export default function Main() {
	const personalized: PersonalizedProps = {
		image:
			'https://images.unsplash.com/photo-1522273400909-fd1a8f77637e?w=600&h=450&fit=crop',
		name: 'Custom Name Necklace',
		brand: 'Jewelry Studio',
		basePrice: 45.0,
		rating: 4.8,
		reviews: 892,
		personalizationTypes: [
			{ name: 'Engraved', price: 10 },
			{ name: '3D Print', price: 20 },
			{ name: 'Handwritten', price: 35 },
		],
		selectedType: 0,
		fonts: ['Script', 'Sans', 'Serif', 'Modern'],
		maxChars: 15,
		preview: 'Sarah',
	};

	return (
		<section className="@container">
			<div className="mx-auto max-w-sm px-4 py-8">
				<Card className="group overflow-hidden">
					<div className="relative">
						<ProductImage src={personalized.image} alt={personalized.name} />
						<PersonalizedBadge />
					</div>
					<div className="space-y-3 p-4">
						<div className="flex items-center justify-between">
							<BrandLabel text={personalized.brand} />
							<ProductRating
								rating={personalized.rating}
								reviews={personalized.reviews}
							/>
						</div>
						<ProductName text={personalized.name} />
						<TypeSelector
							types={personalized.personalizationTypes}
							selected={personalized.selectedType}
						/>
						<FontSelector fonts={personalized.fonts} />
						<TextPreview
							text={personalized.preview}
							maxChars={personalized.maxChars}
						/>
						<Separator />
						<div className="flex items-center justify-between">
							<PriceDisplay
								base={personalized.basePrice}
								extra={
									personalized.personalizationTypes[personalized.selectedType]
										.price
								}
							/>
							<OrderButton label="Order" />
						</div>
					</div>
				</Card>
			</div>
		</section>
	);
}
