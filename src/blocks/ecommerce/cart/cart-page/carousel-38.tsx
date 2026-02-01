import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import {
	Card,
	CardContent,
	CardFooter,
	CardHeader,
	CardTitle,
} from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import {
	Minus,
	Plus,
	X,
	ArrowRight,
	ChevronLeft,
	ChevronRight,
	ShoppingBag,
} from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';

interface CartItem {
	id: string;
	image: string;
	name: string;
	variant: string;
	price: number;
	quantity: number;
}

const PageHeader = ({ title, count }: { title: string; count: number }) => (
	<div className="flex items-center justify-between">
		<div className="flex items-center gap-3">
			<ShoppingBag className="size-6 text-primary" />
			<h1 className="text-2xl font-bold @md:text-3xl">{title}</h1>
		</div>
		<Badge variant="secondary" className="px-3 py-1">
			{count} items
		</Badge>
	</div>
);

const CarouselNav = ({
	direction,
	label,
}: {
	direction: 'left' | 'right';
	label: string;
}) => (
	<Button
		size="icon"
		variant="outline"
		className="rounded-full shrink-0"
		aria-label={label}
	>
		{direction === 'left' ? (
			<ChevronLeft className="size-5" />
		) : (
			<ChevronRight className="size-5" />
		)}
	</Button>
);

const ItemImage = ({ src, alt }: { src: string; alt: string }) => (
	<div className="relative aspect-square w-full overflow-hidden rounded-xl bg-muted">
		<Image src={src} alt={alt} fill className="object-cover" />
	</div>
);

const ItemInfo = ({ name, variant }: { name: string; variant: string }) => (
	<div>
		<h3 className="font-semibold line-clamp-1">{name}</h3>
		<p className="text-sm text-muted-foreground">{variant}</p>
	</div>
);

const QuantityControl = ({ quantity }: { quantity: number }) => (
	<div className="flex items-center justify-center rounded-lg border">
		<Button size="icon-sm" variant="ghost" className="size-8">
			<Minus className="size-3" />
		</Button>
		<span className="w-6 text-center text-sm font-medium">{quantity}</span>
		<Button size="icon-sm" variant="ghost" className="size-8">
			<Plus className="size-3" />
		</Button>
	</div>
);

const ItemPrice = ({
	price,
	quantity,
}: {
	price: number;
	quantity: number;
}) => (
	<p className="text-lg font-bold text-primary text-center">
		${(price * quantity).toFixed(2)}
	</p>
);

const RemoveItem = () => (
	<Button
		size="sm"
		variant="ghost"
		className="w-full gap-1 text-muted-foreground hover:text-destructive"
	>
		<X className="size-3" />
		Remove
	</Button>
);

const CarouselItem = ({ item }: { item: CartItem }) => (
	<Card className="w-64 shrink-0 snap-center">
		<CardContent className="p-4 space-y-4">
			<ItemImage src={item.image} alt={item.name} />
			<ItemInfo name={item.name} variant={item.variant} />
			<QuantityControl quantity={item.quantity} />
			<ItemPrice price={item.price} quantity={item.quantity} />
			<RemoveItem />
		</CardContent>
	</Card>
);

const CarouselIndicators = ({
	count,
	current,
}: {
	count: number;
	current: number;
}) => (
	<div className="flex justify-center gap-2 mt-4">
		{Array.from({ length: count }).map((_, i) => (
			<button
				key={i}
				className={`size-2 rounded-full transition-colors ${
					i === current ? 'bg-primary' : 'bg-muted-foreground/30'
				}`}
				aria-label={`Go to item ${i + 1}`}
			/>
		))}
	</div>
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
	<div
		className={`flex justify-between ${bold ? 'text-xl font-bold' : 'text-muted-foreground'}`}
	>
		<span>{label}</span>
		<span className={bold ? 'text-primary' : ''}>{value}</span>
	</div>
);

const OrderSummary = ({
	title,
	lines,
	checkoutLabel,
	checkoutHref,
}: {
	title: string;
	lines: { label: string; value: string; bold?: boolean }[];
	checkoutLabel: string;
	checkoutHref: string;
}) => (
	<Card>
		<CardHeader>
			<CardTitle>{title}</CardTitle>
		</CardHeader>
		<CardContent className="space-y-3">
			{lines.map((line, i) => (
				<div key={i}>
					{line.bold && <Separator className="my-3" />}
					<SummaryLine {...line} />
				</div>
			))}
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
			image:
				'https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=300&h=300&fit=crop',
			name: 'Running Shoes',
			variant: 'Red • US 10',
			price: 149.99,
			quantity: 1,
		},
		{
			id: '2',
			image:
				'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=300&h=300&fit=crop',
			name: 'Headphones',
			variant: 'Black',
			price: 299.99,
			quantity: 1,
		},
		{
			id: '3',
			image:
				'https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=300&h=300&fit=crop',
			name: 'Watch',
			variant: 'Silver',
			price: 249.99,
			quantity: 1,
		},
		{
			id: '4',
			image:
				'https://images.unsplash.com/photo-1585386959984-a4155224a1ad?w=300&h=300&fit=crop',
			name: 'Earbuds',
			variant: 'White',
			price: 179.99,
			quantity: 2,
		},
		{
			id: '5',
			image:
				'https://images.unsplash.com/photo-1560343090-f0409e92791a?w=300&h=300&fit=crop',
			name: 'Scarf',
			variant: 'Navy',
			price: 89.99,
			quantity: 1,
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
			<div className="mx-auto max-w-6xl px-4 py-8 @md:py-12">
				<PageHeader title="Your Cart" count={items.length} />

				<div className="mt-8">
					{/* Carousel */}
					<div className="flex items-center gap-4">
						<CarouselNav direction="left" label="Previous" />

						<div className="flex-1 overflow-x-auto snap-x snap-mandatory scrollbar-hide">
							<div className="flex gap-4 pb-4">
								{items.map((item) => (
									<CarouselItem key={item.id} item={item} />
								))}
							</div>
						</div>

						<CarouselNav direction="right" label="Next" />
					</div>

					<CarouselIndicators count={items.length} current={0} />
				</div>

				<div className="mt-10 max-w-md mx-auto">
					<OrderSummary
						title="Order Summary"
						lines={summaryLines}
						checkoutLabel="Checkout"
						checkoutHref="/checkout"
					/>
				</div>
			</div>
		</section>
	);
}
