import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import { Minus, Plus, X, ArrowRight, ShoppingBag, Sparkles } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';

interface CartItem {
	id: string;
	image: string;
	name: string;
	variant: string;
	price: number;
	quantity: number;
	description: string;
}

const PageHeader = ({ title, count }: { title: string; count: number }) => (
	<div className="flex flex-col items-center text-center space-y-4">
		<div className="size-20 rounded-2xl bg-primary/10 flex items-center justify-center">
			<ShoppingBag className="size-10 text-primary" />
		</div>
		<div>
			<h1 className="text-4xl font-bold @md:text-5xl">{title}</h1>
			<p className="text-lg text-muted-foreground mt-2">You have {count} amazing items waiting</p>
		</div>
	</div>
);

const ItemImage = ({ src, alt }: { src: string; alt: string }) => (
	<div className="relative w-full aspect-square overflow-hidden rounded-2xl bg-muted">
		<Image src={src} alt={alt} fill className="object-cover" />
	</div>
);

const QuantityControl = ({ quantity }: { quantity: number }) => (
	<div className="flex items-center gap-4">
		<Button size="icon" variant="outline" className="size-12 rounded-xl">
			<Minus className="size-5" />
		</Button>
		<span className="text-2xl font-bold w-8 text-center">{quantity}</span>
		<Button size="icon" variant="outline" className="size-12 rounded-xl">
			<Plus className="size-5" />
		</Button>
	</div>
);

const SpaciousItem = ({ item }: { item: CartItem }) => (
	<Card className="overflow-hidden">
		<div className="grid @md:grid-cols-2 gap-8">
			<div className="p-8">
				<ItemImage src={item.image} alt={item.name} />
			</div>
			<div className="p-8 flex flex-col justify-center space-y-6">
				<div className="space-y-2">
					<Badge variant="secondary" className="mb-2">Premium</Badge>
					<h3 className="text-3xl font-bold">{item.name}</h3>
					<p className="text-lg text-muted-foreground">{item.variant}</p>
					<p className="text-muted-foreground mt-4">{item.description}</p>
				</div>

				<div className="flex items-center justify-between py-6 border-y">
					<QuantityControl quantity={item.quantity} />
					<p className="text-4xl font-bold text-primary">${(item.price * item.quantity).toFixed(2)}</p>
				</div>

				<Button variant="ghost" size="lg" className="w-fit text-muted-foreground hover:text-destructive gap-2">
					<X className="size-5" />
					Remove from cart
				</Button>
			</div>
		</div>
	</Card>
);

const PromoBanner = () => (
	<div className="bg-gradient-to-r from-primary to-primary/80 text-primary-foreground rounded-3xl p-8 flex items-center gap-6">
		<Sparkles className="size-12" />
		<div>
			<h3 className="text-2xl font-bold">Special Offer!</h3>
			<p className="text-lg opacity-90">Free express shipping on your order</p>
		</div>
	</div>
);

const SummaryLine = ({ label, value, bold }: { label: string; value: string; bold?: boolean }) => (
	<div className={`flex justify-between ${bold ? 'text-2xl font-bold' : 'text-lg text-muted-foreground'}`}>
		<span>{label}</span>
		<span className={bold ? 'text-primary' : ''}>{value}</span>
	</div>
);

export default function Main() {
	const items: CartItem[] = [
		{
			id: '1',
			image: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=500&h=500&fit=crop',
			name: 'Studio Headphones Pro',
			variant: 'Black • Wireless',
			price: 299.99,
			quantity: 1,
			description: 'Premium over-ear headphones with active noise cancellation and 30-hour battery life.',
		},
		{
			id: '2',
			image: 'https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=500&h=500&fit=crop',
			name: 'Classic Timepiece',
			variant: 'Silver • Leather Band',
			price: 449.99,
			quantity: 1,
			description: 'Swiss-made automatic movement with sapphire crystal glass and water resistance to 100m.',
		},
	];

	const subtotal = items.reduce((sum, i) => sum + i.price * i.quantity, 0);
	const tax = subtotal * 0.08;
	const total = subtotal + tax;

	return (
		<section className="@container">
			<div className="mx-auto max-w-5xl px-6 py-16 @md:py-24 space-y-16">
				<PageHeader title="Your Cart" count={items.length} />

				<PromoBanner />

				<div className="space-y-8">
					{items.map((item) => (
						<SpaciousItem key={item.id} item={item} />
					))}
				</div>

				<Card className="p-8">
					<CardHeader className="px-0 pt-0">
						<CardTitle className="text-2xl">Order Summary</CardTitle>
					</CardHeader>
					<CardContent className="px-0 space-y-4">
						<SummaryLine label="Subtotal" value={`$${subtotal.toFixed(2)}`} />
						<SummaryLine label="Express Shipping" value="Free" />
						<SummaryLine label="Estimated Tax" value={`$${tax.toFixed(2)}`} />
						<Separator className="my-6" />
						<SummaryLine label="Total" value={`$${total.toFixed(2)}`} bold />
					</CardContent>
					<CardFooter className="px-0 pt-6 flex-col gap-4">
						<Button className="w-full gap-3 h-16 text-xl rounded-xl" asChild>
							<Link href="/checkout">
								Proceed to Checkout
								<ArrowRight className="size-6" />
							</Link>
						</Button>
						<Button variant="outline" className="w-full h-14 text-lg rounded-xl" asChild>
							<Link href="/shop">Continue Shopping</Link>
						</Button>
					</CardFooter>
				</Card>
			</div>
		</section>
	);
}
