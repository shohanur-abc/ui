import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardFooter, CardHeader } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Separator } from '@/components/ui/separator';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Minus, Plus, X, ShoppingCart, Sparkles, ArrowRight, Package } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';

interface CartItem {
	id: string;
	image: string;
	name: string;
	color: string;
	size: string;
	price: number;
	quantity: number;
}

interface Recommendation {
	id: string;
	image: string;
	name: string;
	price: number;
}

const HeaderWithBadge = ({ title, count }: { title: string; count: number }) => (
	<div className="flex items-center gap-3">
		<ShoppingCart className="size-6 text-primary" />
		<h1 className="text-2xl font-bold">{title}</h1>
		<Badge variant="secondary">{count}</Badge>
	</div>
);

const ProductThumb = ({ src, alt }: { src: string; alt: string }) => (
	<div className="relative size-24 shrink-0 overflow-hidden rounded-xl bg-muted">
		<Image src={src} alt={alt} fill className="object-cover" />
	</div>
);

const ProductMeta = ({ name, color, size }: { name: string; color: string; size: string }) => (
	<div>
		<h3 className="font-medium leading-tight">{name}</h3>
		<p className="mt-1 text-sm text-muted-foreground">
			{color} • {size}
		</p>
	</div>
);

const QuantityStepper = ({ quantity }: { quantity: number }) => (
	<div className="inline-flex items-center rounded-full border bg-muted/50">
		<Button size="icon-sm" variant="ghost" className="size-8 rounded-full">
			<Minus className="size-3" />
		</Button>
		<span className="w-8 text-center font-medium">{quantity}</span>
		<Button size="icon-sm" variant="ghost" className="size-8 rounded-full">
			<Plus className="size-3" />
		</Button>
	</div>
);

const LinePrice = ({ price, quantity }: { price: number; quantity: number }) => (
	<div className="text-right">
		<p className="font-bold">${(price * quantity).toFixed(2)}</p>
		{quantity > 1 && <p className="text-xs text-muted-foreground">${price.toFixed(2)} ea</p>}
	</div>
);

const RemoveBtn = () => (
	<Button size="icon-sm" variant="ghost" className="absolute -right-1 -top-1 size-6 rounded-full bg-background shadow-sm hover:bg-destructive hover:text-white">
		<X className="size-3" />
	</Button>
);

const CartRow = ({ item }: { item: CartItem }) => (
	<div className="relative flex gap-4 rounded-xl bg-card p-4 shadow-sm border">
		<RemoveBtn />
		<ProductThumb src={item.image} alt={item.name} />
		<div className="flex min-w-0 flex-1 flex-col justify-between">
			<ProductMeta name={item.name} color={item.color} size={item.size} />
			<div className="flex items-center justify-between gap-4">
				<QuantityStepper quantity={item.quantity} />
				<LinePrice price={item.price} quantity={item.quantity} />
			</div>
		</div>
	</div>
);

const RecommendationCard = ({ item, addLabel }: { item: Recommendation; addLabel: string }) => (
	<Card className="min-w-[160px] overflow-hidden">
		<div className="relative aspect-square bg-muted">
			<Image src={item.image} alt={item.name} fill className="object-cover" />
		</div>
		<CardContent className="p-3">
			<p className="text-sm font-medium line-clamp-1">{item.name}</p>
			<p className="text-sm font-bold text-primary">${item.price.toFixed(2)}</p>
		</CardContent>
		<CardFooter className="p-3 pt-0">
			<Button size="sm" variant="outline" className="w-full">
				{addLabel}
			</Button>
		</CardFooter>
	</Card>
);

const RecommendationsSection = ({
	title,
	items,
	addLabel,
}: {
	title: string;
	items: Recommendation[];
	addLabel: string;
}) => (
	<div className="mt-8">
		<div className="flex items-center gap-2 mb-4">
			<Sparkles className="size-5 text-primary" />
			<h2 className="font-semibold">{title}</h2>
		</div>
		<ScrollArea className="w-full">
			<div className="flex gap-4 pb-4">
				{items.map((item) => (
					<RecommendationCard key={item.id} item={item} addLabel={addLabel} />
				))}
			</div>
		</ScrollArea>
	</div>
);

const SummaryLine = ({
	label,
	value,
	isTotal,
	isDiscount,
}: {
	label: string;
	value: string;
	isTotal?: boolean;
	isDiscount?: boolean;
}) => (
	<div className={`flex justify-between ${isTotal ? 'text-xl font-bold' : ''}`}>
		<span className={isTotal ? '' : 'text-muted-foreground'}>{label}</span>
		<span className={isTotal ? 'text-primary' : isDiscount ? 'text-green-500' : ''}>{value}</span>
	</div>
);

const PromoInput = ({ placeholder, label }: { placeholder: string; label: string }) => (
	<div className="flex gap-2">
		<Input placeholder={placeholder} className="flex-1" />
		<Button variant="secondary">{label}</Button>
	</div>
);

const ShippingEstimate = ({ icon: Icon, text }: { icon: React.ComponentType<{ className?: string }>; text: string }) => (
	<div className="flex items-center gap-2 rounded-lg bg-green-500/10 p-3 text-sm text-green-600 dark:text-green-400">
		<Icon className="size-4" />
		<span>{text}</span>
	</div>
);

const SummaryPanel = ({
	lines,
	promoPlaceholder,
	promoLabel,
	shippingNote,
	checkoutLabel,
	checkoutHref,
}: {
	lines: { label: string; value: string; isTotal?: boolean; isDiscount?: boolean }[];
	promoPlaceholder: string;
	promoLabel: string;
	shippingNote: string;
	checkoutLabel: string;
	checkoutHref: string;
}) => (
	<Card className="sticky top-4">
		<CardHeader>
			<h2 className="text-lg font-semibold">Order Summary</h2>
		</CardHeader>
		<CardContent className="space-y-4">
			<PromoInput placeholder={promoPlaceholder} label={promoLabel} />

			<Separator />

			<div className="space-y-3">
				{lines.map((line, i) => (
					<div key={i}>
						{line.isTotal && <Separator className="mb-3" />}
						<SummaryLine {...line} />
					</div>
				))}
			</div>

			<ShippingEstimate icon={Package} text={shippingNote} />
		</CardContent>
		<CardFooter>
			<Button className="w-full gap-2" size="lg" asChild>
				<Link href={checkoutHref}>
					{checkoutLabel}
					<ArrowRight className="size-4" />
				</Link>
			</Button>
		</CardFooter>
	</Card>
);

export default function Main() {
	const items: CartItem[] = [
		{
			id: '1',
			image: 'https://images.unsplash.com/photo-1560769629-975ec94e6a86?w=200&h=200&fit=crop',
			name: 'Retro High-Top Sneakers',
			color: 'White/Red',
			size: 'US 9',
			price: 129.99,
			quantity: 1,
		},
		{
			id: '2',
			image: 'https://images.unsplash.com/photo-1622470953794-aa9c70b0fb9d?w=200&h=200&fit=crop',
			name: 'Oversized Graphic Hoodie',
			color: 'Black',
			size: 'L',
			price: 89.99,
			quantity: 2,
		},
		{
			id: '3',
			image: 'https://images.unsplash.com/photo-1618354691373-d851c5c3a990?w=200&h=200&fit=crop',
			name: 'Essential Cotton Tee',
			color: 'White',
			size: 'M',
			price: 34.99,
			quantity: 3,
		},
	];

	const recommendations: Recommendation[] = [
		{
			id: 'r1',
			image: 'https://images.unsplash.com/photo-1556821840-3a63f95609a7?w=200&h=200&fit=crop',
			name: 'Cargo Pants',
			price: 79.99,
		},
		{
			id: 'r2',
			image: 'https://images.unsplash.com/photo-1588850561407-ed78c282e89b?w=200&h=200&fit=crop',
			name: 'Baseball Cap',
			price: 29.99,
		},
		{
			id: 'r3',
			image: 'https://images.unsplash.com/photo-1611312449408-fcece27cdbb7?w=200&h=200&fit=crop',
			name: 'Canvas Belt',
			price: 24.99,
		},
		{
			id: 'r4',
			image: 'https://images.unsplash.com/photo-1617127365659-c47fa864d8bc?w=200&h=200&fit=crop',
			name: 'Athletic Socks Pack',
			price: 19.99,
		},
	];

	const summaryLines = [
		{ label: 'Subtotal (6 items)', value: '$414.91' },
		{ label: 'Shipping', value: 'Free', isDiscount: true },
		{ label: 'Tax', value: '$33.19' },
		{ label: 'Total', value: '$448.10', isTotal: true },
	];

	return (
		<section className="@container bg-muted/30">
			<div className="mx-auto max-w-6xl px-4 py-8 @md:py-12 @xl:py-16">
				<HeaderWithBadge title="Your Cart" count={items.length} />

				<div className="mt-8 grid gap-8 @xl:grid-cols-5">
					<div className="@xl:col-span-3 space-y-4">
						{items.map((item) => (
							<CartRow key={item.id} item={item} />
						))}

						<RecommendationsSection
							title="You might also like"
							items={recommendations}
							addLabel="Add"
						/>
					</div>

					<div className="@xl:col-span-2">
						<SummaryPanel
							lines={summaryLines}
							promoPlaceholder="Promo code"
							promoLabel="Apply"
							shippingNote="You qualify for free shipping!"
							checkoutLabel="Checkout"
							checkoutHref="/checkout"
						/>
					</div>
				</div>
			</div>
		</section>
	);
}
