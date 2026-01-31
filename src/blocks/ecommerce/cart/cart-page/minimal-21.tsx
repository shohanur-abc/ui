import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import { Minus, Plus, X, ArrowRight } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';

interface CartItem {
	id: string;
	image: string;
	name: string;
	price: number;
	quantity: number;
}

const PageTitle = ({ text }: { text: string }) => (
	<h1 className="text-xl font-semibold @md:text-2xl">{text}</h1>
);

const ItemImage = ({ src, alt }: { src: string; alt: string }) => (
	<div className="relative size-16 shrink-0 overflow-hidden rounded-lg bg-muted">
		<Image src={src} alt={alt} fill className="object-cover" />
	</div>
);

const ItemName = ({ name }: { name: string }) => (
	<p className="font-medium line-clamp-1">{name}</p>
);

const ItemPrice = ({ price }: { price: number }) => (
	<p className="text-muted-foreground">${price.toFixed(2)}</p>
);

const QuantityControl = ({ quantity }: { quantity: number }) => (
	<div className="flex items-center">
		<Button size="icon-sm" variant="ghost" className="size-7">
			<Minus className="size-3" />
		</Button>
		<span className="w-6 text-center text-sm">{quantity}</span>
		<Button size="icon-sm" variant="ghost" className="size-7">
			<Plus className="size-3" />
		</Button>
	</div>
);

const Subtotal = ({ price, quantity }: { price: number; quantity: number }) => (
	<p className="font-semibold">${(price * quantity).toFixed(2)}</p>
);

const RemoveBtn = () => (
	<Button size="icon-sm" variant="ghost" className="text-muted-foreground hover:text-destructive">
		<X className="size-4" />
	</Button>
);

const CartItemRow = ({ item }: { item: CartItem }) => (
	<div className="flex items-center gap-4 py-4">
		<ItemImage src={item.image} alt={item.name} />
		<div className="flex-1 min-w-0">
			<ItemName name={item.name} />
			<ItemPrice price={item.price} />
		</div>
		<QuantityControl quantity={item.quantity} />
		<Subtotal price={item.price} quantity={item.quantity} />
		<RemoveBtn />
	</div>
);

const SummaryRow = ({
	label,
	value,
	bold,
}: {
	label: string;
	value: string;
	bold?: boolean;
}) => (
	<div className={`flex justify-between ${bold ? 'font-semibold' : 'text-muted-foreground'}`}>
		<span>{label}</span>
		<span className={bold ? 'text-primary' : ''}>{value}</span>
	</div>
);

const CheckoutButton = ({ label, href }: { label: string; href: string }) => (
	<Button className="w-full gap-2" asChild>
		<Link href={href}>
			{label}
			<ArrowRight className="size-4" />
		</Link>
	</Button>
);

export default function Main() {
	const items: CartItem[] = [
		{
			id: '1',
			image: 'https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=100&h=100&fit=crop',
			name: 'Minimalist Watch',
			price: 129.99,
			quantity: 1,
		},
		{
			id: '2',
			image: 'https://images.unsplash.com/photo-1491553895911-0055uj8e14ee?w=100&h=100&fit=crop',
			name: 'Leather Wallet',
			price: 49.99,
			quantity: 2,
		},
	];

	const subtotal = items.reduce((sum, i) => sum + i.price * i.quantity, 0);

	return (
		<section className="@container">
			<div className="mx-auto max-w-2xl px-4 py-8 @md:py-12">
				<PageTitle text="Your Cart" />

				<div className="mt-6 divide-y">
					{items.map((item) => (
						<CartItemRow key={item.id} item={item} />
					))}
				</div>

				<Separator className="my-6" />

				<div className="space-y-3">
					<SummaryRow label="Subtotal" value={`$${subtotal.toFixed(2)}`} />
					<SummaryRow label="Shipping" value="Calculated at checkout" />
					<Separator className="my-3" />
					<SummaryRow label="Total" value={`$${subtotal.toFixed(2)}`} bold />
				</div>

				<div className="mt-6">
					<CheckoutButton label="Checkout" href="/checkout" />
				</div>
			</div>
		</section>
	);
}
