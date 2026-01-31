import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import { Minus, Plus, X, ArrowRight, Eye, ZoomIn, Star, Truck } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';

interface CartItem {
	id: string;
	image: string;
	images: string[];
	name: string;
	variant: string;
	price: number;
	quantity: number;
	rating: number;
	reviews: number;
	description: string;
}

const PageHeader = ({ title, count }: { title: string; count: number }) => (
	<div className="flex items-center justify-between">
		<div className="flex items-center gap-3">
			<Eye className="size-6 text-primary" />
			<h1 className="text-2xl font-bold @md:text-3xl">{title}</h1>
		</div>
		<Badge variant="secondary" className="px-3 py-1">{count} items</Badge>
	</div>
);

const MainImage = ({ src, alt }: { src: string; alt: string }) => (
	<div className="relative aspect-square w-full overflow-hidden rounded-xl bg-muted group">
		<Image src={src} alt={alt} fill className="object-cover" />
		<Button
			size="icon"
			variant="secondary"
			className="absolute bottom-3 right-3 opacity-0 group-hover:opacity-100 transition-opacity"
		>
			<ZoomIn className="size-4" />
		</Button>
	</div>
);

const ThumbnailGallery = ({ images, alt }: { images: string[]; alt: string }) => (
	<div className="flex gap-2 mt-2">
		{images.slice(0, 4).map((img, i) => (
			<button
				key={i}
				className={`relative size-14 overflow-hidden rounded-lg bg-muted border-2 ${
					i === 0 ? 'border-primary' : 'border-transparent hover:border-muted-foreground/30'
				}`}
			>
				<Image src={img} alt={`${alt} ${i + 1}`} fill className="object-cover" />
			</button>
		))}
	</div>
);

const StarRating = ({ rating, reviews }: { rating: number; reviews: number }) => (
	<div className="flex items-center gap-2">
		<div className="flex">
			{Array.from({ length: 5 }).map((_, i) => (
				<Star
					key={i}
					className={`size-4 ${
						i < rating ? 'fill-yellow-400 text-yellow-400' : 'text-muted-foreground'
					}`}
				/>
			))}
		</div>
		<span className="text-sm text-muted-foreground">({reviews} reviews)</span>
	</div>
);

const QuantityControl = ({ quantity }: { quantity: number }) => (
	<div className="flex items-center rounded-xl border-2">
		<Button size="icon" variant="ghost" className="size-10">
			<Minus className="size-4" />
		</Button>
		<span className="w-10 text-center font-medium">{quantity}</span>
		<Button size="icon" variant="ghost" className="size-10">
			<Plus className="size-4" />
		</Button>
	</div>
);

const ProductPreviewCard = ({ item }: { item: CartItem }) => (
	<Card className="overflow-hidden">
		<CardContent className="p-0">
			<div className="grid @md:grid-cols-2 gap-6 p-6">
				{/* Image Gallery */}
				<div>
					<MainImage src={item.image} alt={item.name} />
					<ThumbnailGallery images={item.images} alt={item.name} />
				</div>

				{/* Details */}
				<div className="space-y-4">
					<div className="flex items-start justify-between">
						<div>
							<h3 className="text-xl font-bold">{item.name}</h3>
							<p className="text-muted-foreground">{item.variant}</p>
						</div>
						<Button size="icon-sm" variant="ghost" className="text-muted-foreground hover:text-destructive">
							<X className="size-4" />
						</Button>
					</div>

					<StarRating rating={item.rating} reviews={item.reviews} />

					<p className="text-sm text-muted-foreground leading-relaxed">
						{item.description}
					</p>

					<div className="flex items-center gap-2 text-sm text-green-600">
						<Truck className="size-4" />
						<span>Free shipping on this item</span>
					</div>

					<Separator />

					<div className="flex items-center justify-between">
						<QuantityControl quantity={item.quantity} />
						<p className="text-2xl font-bold text-primary">
							${(item.price * item.quantity).toFixed(2)}
						</p>
					</div>
				</div>
			</div>
		</CardContent>
	</Card>
);

const SummaryLine = ({
	label,
	value,
	bold,
}: {
	label: string;
	value: string;
	bold?: boolean;
}) => (
	<div className={`flex justify-between ${bold ? 'text-xl font-bold' : 'text-muted-foreground'}`}>
		<span>{label}</span>
		<span className={bold ? 'text-primary' : ''}>{value}</span>
	</div>
);

export default function Main() {
	const items: CartItem[] = [
		{
			id: '1',
			image: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=400&h=400&fit=crop',
			images: [
				'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=100&h=100&fit=crop',
				'https://images.unsplash.com/photo-1484704849700-f032a568e944?w=100&h=100&fit=crop',
				'https://images.unsplash.com/photo-1583394838336-acd977736f90?w=100&h=100&fit=crop',
				'https://images.unsplash.com/photo-1487215078519-e21cc028cb29?w=100&h=100&fit=crop',
			],
			name: 'Studio Headphones Pro',
			variant: 'Midnight Black • Wireless',
			price: 349.99,
			quantity: 1,
			rating: 5,
			reviews: 128,
			description:
				'Premium wireless headphones with active noise cancellation, 40-hour battery life, and studio-quality sound. Comfortable over-ear design with memory foam cushions.',
		},
		{
			id: '2',
			image: 'https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=400&h=400&fit=crop',
			images: [
				'https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=100&h=100&fit=crop',
				'https://images.unsplash.com/photo-1606107557195-0e29a4b5b4aa?w=100&h=100&fit=crop',
				'https://images.unsplash.com/photo-1460353581641-37baddab0fa2?w=100&h=100&fit=crop',
				'https://images.unsplash.com/photo-1539185441755-769473a23570?w=100&h=100&fit=crop',
			],
			name: 'Running Shoes Pro',
			variant: 'Red/Black • US 10',
			price: 179.99,
			quantity: 1,
			rating: 4,
			reviews: 89,
			description:
				'Lightweight running shoes with responsive cushioning and breathable mesh upper. Perfect for daily training and long-distance runs.',
		},
	];

	const subtotal = items.reduce((sum, i) => sum + i.price * i.quantity, 0);
	const tax = subtotal * 0.08;
	const total = subtotal + tax;

	const summaryLines = [
		{ label: 'Subtotal', value: `$${subtotal.toFixed(2)}` },
		{ label: 'Shipping', value: 'Free' },
		{ label: 'Tax', value: `$${tax.toFixed(2)}` },
		{ label: 'Total', value: `$${total.toFixed(2)}`, bold: true },
	];

	return (
		<section className="@container">
			<div className="mx-auto max-w-4xl px-4 py-8 @md:py-12">
				<PageHeader title="Cart Preview" count={items.length} />

				<div className="mt-8 space-y-6">
					{items.map((item) => (
						<ProductPreviewCard key={item.id} item={item} />
					))}
				</div>

				<Card className="mt-8">
					<CardHeader>
						<CardTitle>Order Summary</CardTitle>
					</CardHeader>
					<CardContent className="space-y-3">
						{summaryLines.map((line, i) => (
							<div key={i}>
								{line.bold && <Separator className="my-3" />}
								<SummaryLine {...line} />
							</div>
						))}
					</CardContent>
					<CardFooter>
						<Button className="w-full gap-2" size="lg" asChild>
							<Link href="/checkout">
								Proceed to Checkout
								<ArrowRight className="size-4" />
							</Link>
						</Button>
					</CardFooter>
				</Card>
			</div>
		</section>
	);
}
