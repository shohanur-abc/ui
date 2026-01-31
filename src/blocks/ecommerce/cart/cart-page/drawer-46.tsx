import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import { ScrollArea } from '@/components/ui/scroll-area';
import {
	Sheet,
	SheetContent,
	SheetDescription,
	SheetFooter,
	SheetHeader,
	SheetTitle,
	SheetTrigger,
} from '@/components/ui/sheet';
import { Minus, Plus, X, ArrowRight, ShoppingCart, Package, CreditCard, Percent } from 'lucide-react';
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

const PageHeader = ({ title, subtitle }: { title: string; subtitle: string }) => (
	<div>
		<h1 className="text-2xl font-bold @md:text-3xl">{title}</h1>
		<p className="text-muted-foreground">{subtitle}</p>
	</div>
);

const ItemImage = ({ src, alt }: { src: string; alt: string }) => (
	<div className="relative size-16 shrink-0 overflow-hidden rounded-lg bg-muted">
		<Image src={src} alt={alt} fill className="object-cover" />
	</div>
);

const QuantityControl = ({ quantity }: { quantity: number }) => (
	<div className="flex items-center rounded-lg border">
		<Button size="icon-sm" variant="ghost" className="size-7">
			<Minus className="size-3" />
		</Button>
		<span className="w-6 text-center text-sm">{quantity}</span>
		<Button size="icon-sm" variant="ghost" className="size-7">
			<Plus className="size-3" />
		</Button>
	</div>
);

const DrawerItem = ({ item }: { item: CartItem }) => (
	<div className="flex gap-3 py-3">
		<ItemImage src={item.image} alt={item.name} />
		<div className="flex-1 min-w-0">
			<div className="flex items-start justify-between gap-1">
				<div>
					<h4 className="font-medium text-sm line-clamp-1">{item.name}</h4>
					<p className="text-xs text-muted-foreground">{item.variant}</p>
				</div>
				<Button size="icon-sm" variant="ghost" className="size-6 text-muted-foreground hover:text-destructive">
					<X className="size-3" />
				</Button>
			</div>
			<div className="flex items-center justify-between mt-2">
				<QuantityControl quantity={item.quantity} />
				<p className="font-semibold text-sm">${(item.price * item.quantity).toFixed(2)}</p>
			</div>
		</div>
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
	<div className={`flex justify-between text-sm ${bold ? 'font-bold' : 'text-muted-foreground'}`}>
		<span>{label}</span>
		<span className={bold ? 'text-primary' : ''}>{value}</span>
	</div>
);

const CartDrawer = ({
	items,
	summaryLines,
}: {
	items: CartItem[];
	summaryLines: { label: string; value: string; bold?: boolean }[];
}) => (
	<Sheet>
		<SheetTrigger asChild>
			<Button variant="outline" className="gap-2">
				<ShoppingCart className="size-4" />
				View Cart ({items.length})
			</Button>
		</SheetTrigger>
		<SheetContent className="flex flex-col w-full sm:max-w-md">
			<SheetHeader>
				<SheetTitle className="flex items-center gap-2">
					<ShoppingCart className="size-5" />
					Your Cart
				</SheetTitle>
				<SheetDescription>
					{items.length} items in your cart
				</SheetDescription>
			</SheetHeader>

			<ScrollArea className="flex-1 -mx-6 px-6">
				<div className="divide-y">
					{items.map((item) => (
						<DrawerItem key={item.id} item={item} />
					))}
				</div>
			</ScrollArea>

			<div className="pt-4 space-y-3 border-t">
				{summaryLines.map((line, i) => (
					<SummaryLine key={i} {...line} />
				))}
			</div>

			<SheetFooter className="mt-4">
				<Button className="w-full gap-2" size="lg" asChild>
					<Link href="/checkout">
						Checkout
						<ArrowRight className="size-4" />
					</Link>
				</Button>
			</SheetFooter>
		</SheetContent>
	</Sheet>
);

const FeatureCard = ({
	icon: Icon,
	title,
	description,
}: {
	icon: React.ComponentType<{ className?: string }>;
	title: string;
	description: string;
}) => (
	<Card>
		<CardContent className="p-6 flex items-start gap-4">
			<div className="rounded-lg bg-primary/10 p-2">
				<Icon className="size-5 text-primary" />
			</div>
			<div>
				<h3 className="font-semibold">{title}</h3>
				<p className="text-sm text-muted-foreground">{description}</p>
			</div>
		</CardContent>
	</Card>
);

const OrderSummary = ({
	lines,
}: {
	lines: { label: string; value: string; bold?: boolean }[];
}) => (
	<Card>
		<CardHeader>
			<CardTitle>Order Summary</CardTitle>
		</CardHeader>
		<CardContent className="space-y-3">
			{lines.map((line, i) => (
				<div key={i}>
					{line.bold && <Separator className="my-3" />}
					<SummaryLine {...line} />
				</div>
			))}
		</CardContent>
	</Card>
);

export default function Main() {
	const items: CartItem[] = [
		{
			id: '1',
			image: 'https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=150&h=150&fit=crop',
			name: 'Running Shoes Pro',
			variant: 'Red • US 10',
			price: 149.99,
			quantity: 1,
		},
		{
			id: '2',
			image: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=150&h=150&fit=crop',
			name: 'Studio Headphones',
			variant: 'Black • Wireless',
			price: 299.99,
			quantity: 1,
		},
		{
			id: '3',
			image: 'https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=150&h=150&fit=crop',
			name: 'Classic Watch',
			variant: 'Silver • Leather',
			price: 249.99,
			quantity: 1,
		},
		{
			id: '4',
			image: 'https://images.unsplash.com/photo-1585386959984-a4155224a1ad?w=150&h=150&fit=crop',
			name: 'Wireless Earbuds',
			variant: 'White • ANC',
			price: 179.99,
			quantity: 2,
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

	const features = [
		{
			icon: Package,
			title: 'Free Shipping',
			description: 'On orders over $100',
		},
		{
			icon: CreditCard,
			title: 'Secure Payment',
			description: 'SSL encrypted checkout',
		},
		{
			icon: Percent,
			title: 'Member Discount',
			description: 'Save 10% on all orders',
		},
	];

	return (
		<section className="@container">
			<div className="mx-auto max-w-4xl px-4 py-8 @md:py-12">
				<div className="flex items-start justify-between gap-4">
					<PageHeader title="Shopping" subtitle="Continue browsing or review your cart" />
					<CartDrawer items={items} summaryLines={summaryLines} />
				</div>

				<div className="mt-10 grid gap-6 @md:grid-cols-3">
					{features.map((feature, i) => (
						<FeatureCard key={i} {...feature} />
					))}
				</div>

				<div className="mt-10 grid gap-8 @lg:grid-cols-2">
					<Card>
						<CardHeader>
							<CardTitle>Quick View</CardTitle>
						</CardHeader>
						<CardContent>
							<p className="text-muted-foreground mb-4">
								You have {items.length} items in your cart totaling{' '}
								<span className="font-bold text-foreground">${total.toFixed(2)}</span>
							</p>
							<div className="flex flex-wrap gap-2">
								{items.slice(0, 4).map((item) => (
									<div key={item.id} className="relative size-12 overflow-hidden rounded-lg bg-muted">
										<Image src={item.image} alt={item.name} fill className="object-cover" />
									</div>
								))}
								{items.length > 4 && (
									<div className="size-12 rounded-lg bg-muted flex items-center justify-center text-sm font-medium">
										+{items.length - 4}
									</div>
								)}
							</div>
						</CardContent>
						<CardFooter>
							<CartDrawer items={items} summaryLines={summaryLines} />
						</CardFooter>
					</Card>

					<OrderSummary lines={summaryLines} />
				</div>
			</div>
		</section>
	);
}
