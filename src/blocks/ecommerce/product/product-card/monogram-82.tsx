import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import {
	Heart,
	Pen,
	ShoppingCart,
	Star,
	Type,
	Palette,
	Upload,
} from 'lucide-react';
import Image from 'next/image';

interface MonogramProps {
	image: string;
	name: string;
	brand: string;
	price: number;
	rating: number;
	reviews: number;
	monogramStyles: string[];
	selectedStyle: number;
	colors: { name: string; hex: string }[];
	selectedColor: number;
	initials: string;
}

const ProductImage = ({ src, alt }: { src: string; alt: string }) => (
	<div className="relative aspect-[4/3] overflow-hidden rounded-xl bg-gradient-to-br from-blue-50 to-indigo-50 dark:from-blue-950/20 dark:to-indigo-950/20">
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

const MonogramBadge = () => (
	<Badge className="absolute left-3 top-3 gap-1 bg-gradient-to-r from-blue-600 to-indigo-600">
		<Pen className="size-3" />
		Monogrammed
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

const StyleSelector = ({
	styles,
	selected,
}: {
	styles: string[];
	selected: number;
}) => (
	<div className="space-y-2">
		<p className="flex items-center gap-1 text-xs text-muted-foreground">
			<Type className="size-3" />
			Monogram Style
		</p>
		<div className="flex flex-wrap gap-2">
			{styles.map((style, i) => (
				<button
					key={i}
					className={`rounded-lg border px-3 py-1.5 text-sm transition-colors ${
						i === selected
							? 'border-primary bg-primary/10 text-primary'
							: 'border-border bg-muted/50 text-muted-foreground hover:border-primary/50'
					}`}
				>
					{style}
				</button>
			))}
		</div>
	</div>
);

const ColorSelector = ({
	colors,
	selected,
}: {
	colors: { name: string; hex: string }[];
	selected: number;
}) => (
	<div className="space-y-2">
		<p className="flex items-center gap-1 text-xs text-muted-foreground">
			<Palette className="size-3" />
			Thread Color: {colors[selected].name}
		</p>
		<div className="flex gap-2">
			{colors.map((color, i) => (
				<button
					key={i}
					className={`size-7 rounded-full border-2 transition-transform hover:scale-110 ${
						i === selected
							? 'border-primary ring-2 ring-primary/30'
							: 'border-transparent'
					}`}
					style={{ backgroundColor: color.hex }}
					title={color.name}
				/>
			))}
		</div>
	</div>
);

const InitialsInput = ({ initials }: { initials: string }) => (
	<div className="space-y-2">
		<p className="text-xs text-muted-foreground">Your Initials (up to 3)</p>
		<div className="flex gap-2">
			{[0, 1, 2].map((i) => (
				<input
					key={i}
					type="text"
					maxLength={1}
					defaultValue={initials[i] || ''}
					className="size-12 rounded-lg border border-input bg-background text-center text-lg font-semibold uppercase placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary"
				/>
			))}
		</div>
	</div>
);

const MonogramPreview = ({
	initials,
	style,
}: {
	initials: string;
	style: string;
}) => (
	<div className="flex items-center justify-center rounded-lg bg-muted/50 py-4">
		<span className="text-3xl font-serif font-bold tracking-widest text-primary">
			{initials}
		</span>
	</div>
);

const PriceTag = ({ amount }: { amount: number }) => (
	<span className="text-xl font-bold text-foreground">
		${amount.toFixed(2)}
	</span>
);

const OrderButton = ({ label }: { label: string }) => (
	<Button className="gap-2">
		<ShoppingCart className="size-4" />
		{label}
	</Button>
);

export default function Main() {
	const monogram: MonogramProps = {
		image:
			'https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=600&h=450&fit=crop',
		name: 'Leather Weekender Bag',
		brand: 'Heritage Goods',
		price: 295.0,
		rating: 4.9,
		reviews: 178,
		monogramStyles: ['Classic', 'Circle', 'Diamond', 'Banner'],
		selectedStyle: 0,
		colors: [
			{ name: 'Gold', hex: '#d4af37' },
			{ name: 'Silver', hex: '#c0c0c0' },
			{ name: 'Navy', hex: '#1e3a5f' },
			{ name: 'Black', hex: '#1a1a1a' },
		],
		selectedColor: 0,
		initials: 'JDS',
	};

	return (
		<section className="@container">
			<div className="mx-auto max-w-sm px-4 py-8">
				<Card className="group overflow-hidden">
					<div className="relative">
						<ProductImage src={monogram.image} alt={monogram.name} />
						<MonogramBadge />
					</div>
					<div className="space-y-3 p-4">
						<div className="flex items-center justify-between">
							<BrandLabel text={monogram.brand} />
							<ProductRating
								rating={monogram.rating}
								reviews={monogram.reviews}
							/>
						</div>
						<ProductName text={monogram.name} />
						<StyleSelector
							styles={monogram.monogramStyles}
							selected={monogram.selectedStyle}
						/>
						<ColorSelector
							colors={monogram.colors}
							selected={monogram.selectedColor}
						/>
						<InitialsInput initials={monogram.initials} />
						<MonogramPreview
							initials={monogram.initials}
							style={monogram.monogramStyles[monogram.selectedStyle]}
						/>
						<Separator />
						<div className="flex items-center justify-between">
							<PriceTag amount={monogram.price} />
							<OrderButton label="Add" />
						</div>
					</div>
				</Card>
			</div>
		</section>
	);
}
