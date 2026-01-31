import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import {
	Heart,
	Layers,
	Maximize,
	Paintbrush,
	ShoppingCart,
	Star,
	Printer,
	FileType,
} from 'lucide-react';
import Image from 'next/image';

interface PrintProps {
	image: string;
	title: string;
	artist: string;
	price: number;
	sizes: { name: string; price: number }[];
	selectedSize: number;
	rating: number;
	reviews: number;
	printType: string;
	paperType: string;
}

const PrintPreview = ({ src, alt }: { src: string; alt: string }) => (
	<div className="relative aspect-[3/4] overflow-hidden rounded-xl bg-gradient-to-br from-slate-100 to-slate-200 p-4 dark:from-slate-900 dark:to-slate-800">
		<div className="relative h-full w-full overflow-hidden rounded-lg shadow-xl">
			<Image src={src} alt={alt} fill className="object-cover" />
		</div>
		<Button
			size="icon-sm"
			variant="secondary"
			className="absolute right-6 top-6 bg-white/90"
		>
			<Heart className="size-4" />
		</Button>
	</div>
);

const PrintTypeBadge = ({ text }: { text: string }) => (
	<Badge variant="secondary" className="gap-1 text-xs">
		<Printer className="size-3" />
		{text}
	</Badge>
);

const PrintTitle = ({ text }: { text: string }) => (
	<h3 className="font-semibold text-foreground">{text}</h3>
);

const ArtistName = ({ name }: { name: string }) => (
	<p className="text-sm text-muted-foreground">by {name}</p>
);

const PrintRating = ({
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

const SizeSelector = ({
	sizes,
	selected,
}: {
	sizes: { name: string; price: number }[];
	selected: number;
}) => (
	<div className="space-y-2">
		<p className="flex items-center gap-1 text-xs text-muted-foreground">
			<Maximize className="size-3" />
			Select Size
		</p>
		<div className="flex gap-2">
			{sizes.map((size, i) => (
				<button
					key={i}
					className={`rounded-lg border px-3 py-1.5 text-sm transition-colors ${
						i === selected
							? 'border-primary bg-primary/10 text-primary'
							: 'border-border bg-muted/50 text-muted-foreground hover:border-primary/50'
					}`}
				>
					{size.name}
				</button>
			))}
		</div>
	</div>
);

const PaperInfo = ({ paper }: { paper: string }) => (
	<div className="flex items-center gap-2 text-sm text-muted-foreground">
		<FileType className="size-4" />
		<span>{paper}</span>
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
	const print: PrintProps = {
		image:
			'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=400&h=530&fit=crop',
		title: 'Mountain Sunrise',
		artist: 'James Chen',
		price: 45.0,
		sizes: [
			{ name: '8×10"', price: 35 },
			{ name: '12×16"', price: 45 },
			{ name: '18×24"', price: 75 },
		],
		selectedSize: 1,
		rating: 4.8,
		reviews: 324,
		printType: 'Giclée Print',
		paperType: 'Museum-quality archival paper',
	};

	return (
		<section className="@container">
			<div className="mx-auto max-w-xs px-4 py-8">
				<Card className="group overflow-hidden">
					<PrintPreview src={print.image} alt={print.title} />
					<div className="space-y-3 p-4">
						<div className="flex items-center justify-between">
							<PrintTypeBadge text={print.printType} />
							<PrintRating rating={print.rating} reviews={print.reviews} />
						</div>
						<div className="space-y-0.5">
							<PrintTitle text={print.title} />
							<ArtistName name={print.artist} />
						</div>
						<SizeSelector sizes={print.sizes} selected={print.selectedSize} />
						<PaperInfo paper={print.paperType} />
						<Separator />
						<div className="flex items-center justify-between">
							<PriceTag amount={print.sizes[print.selectedSize].price} />
							<OrderButton label="Order" />
						</div>
					</div>
				</Card>
			</div>
		</section>
	);
}
