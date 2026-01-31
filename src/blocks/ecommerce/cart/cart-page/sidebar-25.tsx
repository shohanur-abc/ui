import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Minus, Plus, X, ArrowRight, ShoppingBag, ChevronLeft } from 'lucide-react';
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

const SidebarHeader = ({
	title,
	count,
	closeLabel,
}: {
	title: string;
	count: number;
	closeLabel: string;
}) => (
	<div className="flex items-center justify-between border-b p-4">
		<div className="flex items-center gap-3">
			<ShoppingBag className="size-5 text-primary" />
			<h2 className="font-semibold text-lg">{title}</h2>
			<Badge variant="secondary">{count}</Badge>
		</div>
		<Button variant="ghost" size="sm" className="gap-1 text-muted-foreground" asChild>
			<Link href="/shop">
				<ChevronLeft className="size-4" />
				{closeLabel}
			</Link>
		</Button>
	</div>
);

const ItemThumb = ({ src, alt }: { src: string; alt: string }) => (
	<div className="relative size-16 shrink-0 overflow-hidden rounded-lg bg-muted">
		<Image src={src} alt={alt} fill className="object-cover" />
	</div>
);

const ItemInfo = ({ name, variant }: { name: string; variant: string }) => (
	<div className="min-w-0 flex-1">
		<p className="font-medium line-clamp-1">{name}</p>
		<p className="text-sm text-muted-foreground">{variant}</p>
	</div>
);

const QuantityControl = ({ quantity }: { quantity: number }) => (
	<div className="flex items-center gap-1 rounded border bg-muted/50">
		<Button size="icon-sm" variant="ghost" className="size-6">
			<Minus className="size-3" />
		</Button>
		<span className="w-5 text-center text-sm">{quantity}</span>
		<Button size="icon-sm" variant="ghost" className="size-6">
			<Plus className="size-3" />
		</Button>
	</div>
);

const ItemPrice = ({ price, quantity }: { price: number; quantity: number }) => (
	<div className="text-right">
		<p className="font-semibold">${(price * quantity).toFixed(2)}</p>
		{quantity > 1 && (
			<p className="text-xs text-muted-foreground">${price.toFixed(2)} each</p>
		)}
	</div>
);

const RemoveItem = () => (
	<Button size="icon-sm" variant="ghost" className="absolute -top-1 -right-1 size-5 rounded-full bg-muted hover:bg-destructive hover:text-destructive-foreground">
		<X className="size-3" />
	</Button>
);

const CartItem = ({ item }: { item: CartItem }) => (
	<div className="relative flex items-start gap-3 p-4 hover:bg-muted/30 transition-colors">
		<RemoveItem />
		<ItemThumb src={item.image} alt={item.name} />
		<div className="flex-1 space-y-2">
			<ItemInfo name={item.name} variant={item.variant} />
			<div className="flex items-center justify-between">
				<QuantityControl quantity={item.quantity} />
				<ItemPrice price={item.price} quantity={item.quantity} />
			</div>
		</div>
	</div>
);

const EmptyCart = ({ message, actionLabel, actionHref }: { message: string; actionLabel: string; actionHref: string }) => (
	<div className="flex-1 flex flex-col items-center justify-center p-8 text-center">
		<ShoppingBag className="size-12 text-muted-foreground/50 mb-4" />
		<p className="text-muted-foreground mb-4">{message}</p>
		<Button asChild>
			<Link href={actionHref}>{actionLabel}</Link>
		</Button>
	</div>
);

const SummaryLine = ({ label, value, bold }: { label: string; value: string; bold?: boolean }) => (
	<div className={`flex justify-between ${bold ? 'text-lg font-bold' : 'text-sm text-muted-foreground'}`}>
		<span>{label}</span>
		<span className={bold ? 'text-primary' : ''}>{value}</span>
	</div>
);

const CheckoutFooter = ({
	lines,
	checkoutLabel,
	checkoutHref,
}: {
	lines: { label: string; value: string; bold?: boolean }[];
	checkoutLabel: string;
	checkoutHref: string;
}) => (
	<div className="border-t bg-muted/30 p-4 space-y-4">
		<div className="space-y-2">
			{lines.map((line, i) => (
				<SummaryLine key={i} {...line} />
			))}
		</div>
		<Button className="w-full gap-2" size="lg" asChild>
			<Link href={checkoutHref}>
				{checkoutLabel}
				<ArrowRight className="size-4" />
			</Link>
		</Button>
	</div>
);

export default function Main() {
	const items: CartItem[] = [
		{
			id: '1',
			image: 'https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=100&h=100&fit=crop',
			name: 'Air Max Runners',
			variant: 'Black • US 10',
			price: 179.99,
			quantity: 1,
		},
		{
			id: '2',
			image: 'https://images.unsplash.com/photo-1585386959984-a4155224a1ad?w=100&h=100&fit=crop',
			name: 'Wireless Earbuds',
			variant: 'White',
			price: 149.99,
			quantity: 2,
		},
		{
			id: '3',
			image: 'https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=100&h=100&fit=crop',
			name: 'Classic Timepiece',
			variant: 'Silver',
			price: 299.99,
			quantity: 1,
		},
		{
			id: '4',
			image: 'https://images.unsplash.com/photo-1560343090-f0409e92791a?w=100&h=100&fit=crop',
			name: 'Leather Belt',
			variant: 'Brown • 32"',
			price: 59.99,
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
			<div className="mx-auto max-w-md h-screen flex flex-col bg-background border-x shadow-xl">
				<SidebarHeader title="Cart" count={items.length} closeLabel="Continue" />

				<ScrollArea className="flex-1">
					<div className="divide-y">
						{items.map((item) => (
							<CartItem key={item.id} item={item} />
						))}
					</div>
				</ScrollArea>

				<CheckoutFooter
					lines={summaryLines}
					checkoutLabel="Checkout"
					checkoutHref="/checkout"
				/>
			</div>
		</section>
	);
}
