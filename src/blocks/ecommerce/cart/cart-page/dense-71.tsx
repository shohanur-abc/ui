import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardFooter, CardHeader } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import { Minus, Plus, X, ArrowRight, Layers } from 'lucide-react';
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
		<div className="flex items-center gap-2">
			<Layers className="size-5 text-primary" />
			<h1 className="text-xl font-bold @md:text-2xl">{title}</h1>
		</div>
		<Badge variant="secondary" className="text-xs px-2 py-0.5">{count}</Badge>
	</div>
);

const ItemImage = ({ src, alt }: { src: string; alt: string }) => (
	<div className="relative size-10 shrink-0 overflow-hidden rounded bg-muted">
		<Image src={src} alt={alt} fill className="object-cover" />
	</div>
);

const QuantityControl = ({ quantity }: { quantity: number }) => (
	<div className="flex items-center text-xs">
		<Button size="icon-sm" variant="ghost" className="size-5">
			<Minus className="size-2" />
		</Button>
		<span className="w-4 text-center">{quantity}</span>
		<Button size="icon-sm" variant="ghost" className="size-5">
			<Plus className="size-2" />
		</Button>
	</div>
);

const DenseItem = ({ item }: { item: CartItem }) => (
	<div className="flex items-center gap-2 py-1.5 text-sm border-b last:border-0">
		<ItemImage src={item.image} alt={item.name} />
		<div className="flex-1 min-w-0">
			<p className="font-medium text-xs line-clamp-1">{item.name}</p>
			<p className="text-[10px] text-muted-foreground">{item.variant}</p>
		</div>
		<QuantityControl quantity={item.quantity} />
		<p className="font-semibold text-xs w-14 text-right">${(item.price * item.quantity).toFixed(2)}</p>
		<Button size="icon-sm" variant="ghost" className="size-5 text-muted-foreground hover:text-destructive">
			<X className="size-2" />
		</Button>
	</div>
);

const SummaryLine = ({ label, value, bold }: { label: string; value: string; bold?: boolean }) => (
	<div className={`flex justify-between text-xs ${bold ? 'font-bold' : 'text-muted-foreground'}`}>
		<span>{label}</span>
		<span>{value}</span>
	</div>
);

export default function Main() {
	const items: CartItem[] = [
		{ id: '1', image: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=80&h=80&fit=crop', name: 'Headphones Pro', variant: 'Black', price: 299.99, quantity: 1 },
		{ id: '2', image: 'https://images.unsplash.com/photo-1585386959984-a4155224a1ad?w=80&h=80&fit=crop', name: 'Earbuds', variant: 'White', price: 179.99, quantity: 1 },
		{ id: '3', image: 'https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=80&h=80&fit=crop', name: 'Shoes', variant: 'Red', price: 149.99, quantity: 1 },
		{ id: '4', image: 'https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=80&h=80&fit=crop', name: 'Watch', variant: 'Silver', price: 249.99, quantity: 1 },
		{ id: '5', image: 'https://images.unsplash.com/photo-1560343090-f0409e92791a?w=80&h=80&fit=crop', name: 'Scarf', variant: 'Navy', price: 89.99, quantity: 2 },
	];

	const subtotal = items.reduce((sum, i) => sum + i.price * i.quantity, 0);
	const tax = subtotal * 0.08;
	const total = subtotal + tax;

	return (
		<section className="@container">
			<div className="mx-auto max-w-3xl px-3 py-4 @md:py-6">
				<PageHeader title="Cart" count={items.length} />

				<div className="mt-4 grid gap-4 @md:grid-cols-5">
					<Card className="@md:col-span-3 p-2">
						<CardContent className="p-2">
							{items.map((item) => (
								<DenseItem key={item.id} item={item} />
							))}
						</CardContent>
					</Card>

					<Card className="@md:col-span-2 p-2">
						<CardHeader className="p-2 pb-1">
							<p className="text-xs font-semibold">Summary</p>
						</CardHeader>
						<CardContent className="p-2 space-y-1">
							<SummaryLine label="Subtotal" value={`$${subtotal.toFixed(2)}`} />
							<SummaryLine label="Shipping" value="Free" />
							<SummaryLine label="Tax" value={`$${tax.toFixed(2)}`} />
							<Separator className="my-1" />
							<SummaryLine label="Total" value={`$${total.toFixed(2)}`} bold />
						</CardContent>
						<CardFooter className="p-2 pt-1">
							<Button className="w-full h-7 text-xs gap-1" asChild>
								<Link href="/checkout">
									Checkout <ArrowRight className="size-3" />
								</Link>
							</Button>
						</CardFooter>
					</Card>
				</div>
			</div>
		</section>
	);
}
