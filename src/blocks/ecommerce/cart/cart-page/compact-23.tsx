import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import { Minus, Plus, X, ShoppingBag, ArrowRight } from 'lucide-react';
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
	<div className="flex items-center gap-2">
		<ShoppingBag className="size-5 text-primary" />
		<h1 className="font-semibold">{title}</h1>
		<Badge variant="secondary" className="text-xs">{count}</Badge>
	</div>
);

const ItemThumb = ({ src, alt }: { src: string; alt: string }) => (
	<div className="relative size-12 shrink-0 overflow-hidden rounded-md bg-muted">
		<Image src={src} alt={alt} fill className="object-cover" />
	</div>
);

const ItemInfo = ({ name, variant }: { name: string; variant: string }) => (
	<div className="min-w-0 flex-1">
		<p className="text-sm font-medium line-clamp-1">{name}</p>
		<p className="text-xs text-muted-foreground">{variant}</p>
	</div>
);

const QuantityMini = ({ quantity }: { quantity: number }) => (
	<div className="flex items-center gap-0.5 rounded border text-xs">
		<Button size="icon-sm" variant="ghost" className="size-5">
			<Minus className="size-2" />
		</Button>
		<span className="w-4 text-center">{quantity}</span>
		<Button size="icon-sm" variant="ghost" className="size-5">
			<Plus className="size-2" />
		</Button>
	</div>
);

const ItemTotal = ({ price, quantity }: { price: number; quantity: number }) => (
	<p className="text-sm font-medium w-14 text-right">${(price * quantity).toFixed(2)}</p>
);

const RemoveBtn = () => (
	<Button size="icon-sm" variant="ghost" className="size-5 text-muted-foreground hover:text-destructive">
		<X className="size-3" />
	</Button>
);

const CartItemRow = ({ item }: { item: CartItem }) => (
	<div className="flex items-center gap-2 py-2">
		<ItemThumb src={item.image} alt={item.name} />
		<ItemInfo name={item.name} variant={item.variant} />
		<QuantityMini quantity={item.quantity} />
		<ItemTotal price={item.price} quantity={item.quantity} />
		<RemoveBtn />
	</div>
);

const SummaryLine = ({ label, value, bold }: { label: string; value: string; bold?: boolean }) => (
	<div className={`flex justify-between text-sm ${bold ? 'font-semibold' : 'text-muted-foreground'}`}>
		<span>{label}</span>
		<span>{value}</span>
	</div>
);

const CheckoutBtn = ({ label, href }: { label: string; href: string }) => (
	<Button className="w-full gap-1 text-sm" size="sm" asChild>
		<Link href={href}>
			{label}
			<ArrowRight className="size-3" />
		</Link>
	</Button>
);

const ContinueShopping = ({ label, href }: { label: string; href: string }) => (
	<Button variant="ghost" className="w-full text-xs" size="sm" asChild>
		<Link href={href}>{label}</Link>
	</Button>
);

export default function Main() {
	const items: CartItem[] = [
		{
			id: '1',
			image: 'https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=80&h=80&fit=crop',
			name: 'Classic Watch',
			variant: 'Silver',
			price: 149.99,
			quantity: 1,
		},
		{
			id: '2',
			image: 'https://images.unsplash.com/photo-1585386959984-a4155224a1ad?w=80&h=80&fit=crop',
			name: 'Earbuds Pro',
			variant: 'White',
			price: 199.99,
			quantity: 1,
		},
		{
			id: '3',
			image: 'https://images.unsplash.com/photo-1560343090-f0409e92791a?w=80&h=80&fit=crop',
			name: 'Silk Scarf',
			variant: 'Navy',
			price: 79.99,
			quantity: 2,
		},
	];

	const subtotal = items.reduce((sum, i) => sum + i.price * i.quantity, 0);

	return (
		<section className="@container">
			<div className="mx-auto max-w-sm px-4 py-6">
				<PageHeader title="Cart" count={items.length} />

				<div className="mt-4 divide-y">
					{items.map((item) => (
						<CartItemRow key={item.id} item={item} />
					))}
				</div>

				<Separator className="my-4" />

				<div className="space-y-2">
					<SummaryLine label="Subtotal" value={`$${subtotal.toFixed(2)}`} />
					<SummaryLine label="Shipping" value="Free" />
					<SummaryLine label="Tax" value={`$${(subtotal * 0.08).toFixed(2)}`} />
					<Separator className="my-2" />
					<SummaryLine label="Total" value={`$${(subtotal * 1.08).toFixed(2)}`} bold />
				</div>

				<div className="mt-4 space-y-2">
					<CheckoutBtn label="Checkout" href="/checkout" />
					<ContinueShopping label="Continue Shopping" href="/shop" />
				</div>
			</div>
		</section>
	);
}
