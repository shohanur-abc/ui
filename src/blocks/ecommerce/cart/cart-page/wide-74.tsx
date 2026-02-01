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
	ShoppingBag,
	Truck,
	Shield,
	Percent,
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
		<div className="flex items-center gap-4">
			<div className="size-14 rounded-2xl bg-primary/10 flex items-center justify-center">
				<ShoppingBag className="size-7 text-primary" />
			</div>
			<div>
				<h1 className="text-3xl font-bold @lg:text-4xl">{title}</h1>
				<p className="text-muted-foreground">
					Review your items before checkout
				</p>
			</div>
		</div>
		<Badge variant="secondary" className="px-4 py-2 text-lg">
			{count} items
		</Badge>
	</div>
);

const FeaturePills = () => (
	<div className="flex gap-4 overflow-x-auto pb-2">
		<div className="flex items-center gap-2 px-4 py-2 bg-green-500/10 text-green-700 dark:text-green-400 rounded-full whitespace-nowrap">
			<Truck className="size-4" />
			<span className="text-sm font-medium">Free Shipping</span>
		</div>
		<div className="flex items-center gap-2 px-4 py-2 bg-blue-500/10 text-blue-700 dark:text-blue-400 rounded-full whitespace-nowrap">
			<Shield className="size-4" />
			<span className="text-sm font-medium">Secure Checkout</span>
		</div>
		<div className="flex items-center gap-2 px-4 py-2 bg-purple-500/10 text-purple-700 dark:text-purple-400 rounded-full whitespace-nowrap">
			<Percent className="size-4" />
			<span className="text-sm font-medium">10% Member Discount</span>
		</div>
	</div>
);

const ItemImage = ({ src, alt }: { src: string; alt: string }) => (
	<div className="relative w-40 h-40 shrink-0 overflow-hidden rounded-xl bg-muted">
		<Image src={src} alt={alt} fill className="object-cover" />
	</div>
);

const QuantityControl = ({ quantity }: { quantity: number }) => (
	<div className="flex items-center rounded-xl border bg-background">
		<Button size="icon" variant="ghost" className="size-10 rounded-l-xl">
			<Minus className="size-4" />
		</Button>
		<span className="w-10 text-center font-semibold">{quantity}</span>
		<Button size="icon" variant="ghost" className="size-10 rounded-r-xl">
			<Plus className="size-4" />
		</Button>
	</div>
);

const WideItem = ({ item }: { item: CartItem }) => (
	<div className="flex gap-6 py-6 border-b last:border-0 group">
		<ItemImage src={item.image} alt={item.name} />
		<div className="flex-1 flex flex-col justify-between">
			<div className="flex items-start justify-between">
				<div className="space-y-1">
					<h3 className="text-xl font-semibold">{item.name}</h3>
					<p className="text-muted-foreground">{item.variant}</p>
					<div className="flex gap-2 mt-2">
						<Badge variant="outline">In Stock</Badge>
						<Badge variant="outline">Free Returns</Badge>
					</div>
				</div>
				<Button
					size="icon"
					variant="ghost"
					className="opacity-0 group-hover:opacity-100 text-muted-foreground hover:text-destructive transition-opacity"
				>
					<X className="size-5" />
				</Button>
			</div>
			<div className="flex items-center justify-between mt-4">
				<QuantityControl quantity={item.quantity} />
				<p className="text-2xl font-bold text-primary">
					${(item.price * item.quantity).toFixed(2)}
				</p>
			</div>
		</div>
	</div>
);

const SummaryLine = ({
	label,
	value,
	bold,
	highlight,
}: {
	label: string;
	value: string;
	bold?: boolean;
	highlight?: boolean;
}) => (
	<div
		className={`flex justify-between ${bold ? 'text-xl font-bold' : ''} ${highlight ? 'text-green-600' : 'text-muted-foreground'}`}
	>
		<span className={bold ? 'text-foreground' : ''}>{label}</span>
		<span className={bold ? 'text-primary' : ''}>{value}</span>
	</div>
);

export default function Main() {
	const items: CartItem[] = [
		{
			id: '1',
			image:
				'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=300&h=300&fit=crop',
			name: 'Studio Headphones Pro',
			variant: 'Midnight Black • Wireless • Premium Edition',
			price: 299.99,
			quantity: 1,
		},
		{
			id: '2',
			image:
				'https://images.unsplash.com/photo-1585386959984-a4155224a1ad?w=300&h=300&fit=crop',
			name: 'Wireless Earbuds Elite',
			variant: 'Pearl White • Active Noise Cancellation',
			price: 179.99,
			quantity: 1,
		},
		{
			id: '3',
			image:
				'https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=300&h=300&fit=crop',
			name: 'Pro Running Shoes',
			variant: 'Racing Red • US 10 • Ultralight',
			price: 149.99,
			quantity: 1,
		},
	];

	const subtotal = items.reduce((sum, i) => sum + i.price * i.quantity, 0);
	const discount = subtotal * 0.1;
	const tax = (subtotal - discount) * 0.08;
	const total = subtotal - discount + tax;

	return (
		<section className="@container">
			<div className="mx-auto max-w-7xl px-6 py-10 @lg:py-16">
				<PageHeader title="Shopping Cart" count={items.length} />

				<div className="mt-8">
					<FeaturePills />
				</div>

				<div className="mt-8 grid gap-10 @xl:grid-cols-4">
					<div className="@xl:col-span-3">
						<Card>
							<CardHeader>
								<CardTitle>Your Items</CardTitle>
							</CardHeader>
							<CardContent>
								{items.map((item) => (
									<WideItem key={item.id} item={item} />
								))}
							</CardContent>
						</Card>
					</div>

					<div>
						<Card className="sticky top-6">
							<CardHeader>
								<CardTitle>Order Summary</CardTitle>
							</CardHeader>
							<CardContent className="space-y-3">
								<SummaryLine
									label="Subtotal"
									value={`$${subtotal.toFixed(2)}`}
								/>
								<SummaryLine
									label="Member Discount"
									value={`-$${discount.toFixed(2)}`}
									highlight
								/>
								<SummaryLine label="Shipping" value="Free" />
								<SummaryLine label="Tax" value={`$${tax.toFixed(2)}`} />
								<Separator className="my-4" />
								<SummaryLine
									label="Total"
									value={`$${total.toFixed(2)}`}
									bold
								/>
							</CardContent>
							<CardFooter className="flex-col gap-3">
								<Button className="w-full gap-2" size="lg" asChild>
									<Link href="/checkout">
										Checkout
										<ArrowRight className="size-5" />
									</Link>
								</Button>
								<Button variant="outline" className="w-full" asChild>
									<Link href="/shop">Continue Shopping</Link>
								</Button>
							</CardFooter>
						</Card>
					</div>
				</div>
			</div>
		</section>
	);
}
