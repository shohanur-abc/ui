import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import { Minus, Plus, X, ArrowRight, ShoppingBag } from 'lucide-react';
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
			<div className="size-12 rounded-full bg-primary/10 flex items-center justify-center">
				<ShoppingBag className="size-6 text-primary" />
			</div>
			<h1 className="text-2xl font-bold @md:text-3xl">{title}</h1>
		</div>
		<Badge className="rounded-full px-4 py-1">{count} items</Badge>
	</div>
);

const RoundedCard = ({
	children,
	className = '',
}: {
	children: React.ReactNode;
	className?: string;
}) => (
	<Card className={`rounded-3xl overflow-hidden ${className}`}>
		{children}
	</Card>
);

const ItemImage = ({ src, alt }: { src: string; alt: string }) => (
	<div className="relative size-20 shrink-0 overflow-hidden rounded-2xl bg-muted">
		<Image src={src} alt={alt} fill className="object-cover" />
	</div>
);

const QuantityControl = ({ quantity }: { quantity: number }) => (
	<div className="flex items-center rounded-full bg-muted">
		<Button size="icon-sm" variant="ghost" className="size-8 rounded-full hover:bg-muted-foreground/20">
			<Minus className="size-3" />
		</Button>
		<span className="w-6 text-center text-sm font-medium">{quantity}</span>
		<Button size="icon-sm" variant="ghost" className="size-8 rounded-full hover:bg-muted-foreground/20">
			<Plus className="size-3" />
		</Button>
	</div>
);

const RoundedItem = ({ item }: { item: CartItem }) => (
	<div className="flex gap-4 py-4 group">
		<ItemImage src={item.image} alt={item.name} />
		<div className="flex-1 min-w-0">
			<div className="flex items-start justify-between gap-2">
				<div>
					<h3 className="font-semibold line-clamp-1">{item.name}</h3>
					<p className="text-sm text-muted-foreground">{item.variant}</p>
				</div>
				<Button
					size="icon-sm"
					variant="ghost"
					className="opacity-0 group-hover:opacity-100 size-8 rounded-full shrink-0 transition-opacity hover:bg-destructive/10 hover:text-destructive"
				>
					<X className="size-4" />
				</Button>
			</div>
			<div className="flex items-center justify-between mt-3">
				<QuantityControl quantity={item.quantity} />
				<p className="font-bold text-lg">${(item.price * item.quantity).toFixed(2)}</p>
			</div>
		</div>
	</div>
);

const PromoPill = () => (
	<div className="inline-flex items-center gap-2 px-5 py-3 bg-green-500/10 text-green-700 dark:text-green-400 rounded-full">
		<span className="size-2 rounded-full bg-green-500 animate-pulse" />
		<span className="text-sm font-medium">Free shipping on this order!</span>
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
	<div className={`flex justify-between ${bold ? 'text-xl font-bold' : 'text-muted-foreground'}`}>
		<span className={bold ? 'text-foreground' : ''}>{label}</span>
		<span>{value}</span>
	</div>
);

export default function Main() {
	const items: CartItem[] = [
		{
			id: '1',
			image: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=200&h=200&fit=crop',
			name: 'Studio Headphones Pro',
			variant: 'Black • Wireless',
			price: 299.99,
			quantity: 1,
		},
		{
			id: '2',
			image: 'https://images.unsplash.com/photo-1585386959984-a4155224a1ad?w=200&h=200&fit=crop',
			name: 'Wireless Earbuds',
			variant: 'White • ANC',
			price: 179.99,
			quantity: 1,
		},
		{
			id: '3',
			image: 'https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=200&h=200&fit=crop',
			name: 'Running Shoes',
			variant: 'Red • US 10',
			price: 149.99,
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
			<div className="mx-auto max-w-5xl px-4 py-8 @md:py-12">
				<PageHeader title="Your Cart" count={items.length} />

				<div className="mt-6 flex justify-center">
					<PromoPill />
				</div>

				<div className="mt-8 grid gap-8 @lg:grid-cols-3">
					<div className="@lg:col-span-2">
						<RoundedCard>
							<CardHeader className="rounded-t-3xl">
								<CardTitle className="flex items-center gap-2">
									<span className="size-3 rounded-full bg-primary" />
									Cart Items
								</CardTitle>
							</CardHeader>
							<CardContent className="divide-y">
								{items.map((item) => (
									<RoundedItem key={item.id} item={item} />
								))}
							</CardContent>
						</RoundedCard>
					</div>

					<div>
						<RoundedCard className="sticky top-4">
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
							<CardFooter className="flex-col gap-3">
								<Button className="w-full gap-2 rounded-full" size="lg" asChild>
									<Link href="/checkout">
										Checkout
										<ArrowRight className="size-4" />
									</Link>
								</Button>
								<Button variant="outline" className="w-full rounded-full" size="lg" asChild>
									<Link href="/shop">
										Continue Shopping
									</Link>
								</Button>
							</CardFooter>
						</RoundedCard>
					</div>
				</div>
			</div>
		</section>
	);
}
