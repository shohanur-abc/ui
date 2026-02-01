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
		<div className="flex items-center gap-2">
			<ShoppingBag className="size-5 text-primary" />
			<h1 className="text-lg font-bold">{title}</h1>
		</div>
		<Badge variant="secondary" className="text-xs">
			{count}
		</Badge>
	</div>
);

const ItemImage = ({ src, alt }: { src: string; alt: string }) => (
	<div className="relative size-14 shrink-0 overflow-hidden rounded-lg bg-muted">
		<Image src={src} alt={alt} fill className="object-cover" />
	</div>
);

const QuantityControl = ({ quantity }: { quantity: number }) => (
	<div className="flex items-center rounded border text-xs">
		<Button size="icon-sm" variant="ghost" className="size-6">
			<Minus className="size-2" />
		</Button>
		<span className="w-4 text-center">{quantity}</span>
		<Button size="icon-sm" variant="ghost" className="size-6">
			<Plus className="size-2" />
		</Button>
	</div>
);

const NarrowItem = ({ item }: { item: CartItem }) => (
	<div className="flex flex-col gap-2 py-3 border-b last:border-0">
		<div className="flex gap-3">
			<ItemImage src={item.image} alt={item.name} />
			<div className="flex-1 min-w-0">
				<h3 className="font-medium text-sm line-clamp-1">{item.name}</h3>
				<p className="text-xs text-muted-foreground">{item.variant}</p>
			</div>
			<Button
				size="icon-sm"
				variant="ghost"
				className="size-6 shrink-0 text-muted-foreground hover:text-destructive"
			>
				<X className="size-3" />
			</Button>
		</div>
		<div className="flex items-center justify-between">
			<QuantityControl quantity={item.quantity} />
			<p className="font-bold text-sm">
				${(item.price * item.quantity).toFixed(2)}
			</p>
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
	<div
		className={`flex justify-between text-sm ${bold ? 'font-bold' : 'text-muted-foreground'}`}
	>
		<span>{label}</span>
		<span>{value}</span>
	</div>
);

export default function Main() {
	const items: CartItem[] = [
		{
			id: '1',
			image:
				'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=120&h=120&fit=crop',
			name: 'Studio Headphones Pro',
			variant: 'Black • Wireless',
			price: 299.99,
			quantity: 1,
		},
		{
			id: '2',
			image:
				'https://images.unsplash.com/photo-1585386959984-a4155224a1ad?w=120&h=120&fit=crop',
			name: 'Wireless Earbuds',
			variant: 'White • ANC',
			price: 179.99,
			quantity: 1,
		},
		{
			id: '3',
			image:
				'https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=120&h=120&fit=crop',
			name: 'Running Shoes',
			variant: 'Red • US 10',
			price: 149.99,
			quantity: 1,
		},
	];

	const subtotal = items.reduce((sum, i) => sum + i.price * i.quantity, 0);
	const tax = subtotal * 0.08;
	const total = subtotal + tax;

	return (
		<section className="@container">
			<div className="mx-auto max-w-xs px-3 py-6">
				<PageHeader title="Cart" count={items.length} />

				<Card className="mt-4">
					<CardContent className="p-3">
						{items.map((item) => (
							<NarrowItem key={item.id} item={item} />
						))}
					</CardContent>
				</Card>

				<Card className="mt-4">
					<CardHeader className="p-3 pb-2">
						<CardTitle className="text-sm">Summary</CardTitle>
					</CardHeader>
					<CardContent className="p-3 pt-0 space-y-2">
						<SummaryLine label="Subtotal" value={`$${subtotal.toFixed(2)}`} />
						<SummaryLine label="Shipping" value="Free" />
						<SummaryLine label="Tax" value={`$${tax.toFixed(2)}`} />
						<Separator className="my-2" />
						<SummaryLine label="Total" value={`$${total.toFixed(2)}`} bold />
					</CardContent>
					<CardFooter className="p-3 pt-0">
						<Button className="w-full gap-1" size="sm" asChild>
							<Link href="/checkout">
								Checkout <ArrowRight className="size-3" />
							</Link>
						</Button>
					</CardFooter>
				</Card>
			</div>
		</section>
	);
}
