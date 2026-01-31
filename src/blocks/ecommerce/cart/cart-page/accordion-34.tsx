import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import {
	Accordion,
	AccordionContent,
	AccordionItem,
	AccordionTrigger,
} from '@/components/ui/accordion';
import { Minus, Plus, X, ArrowRight, ShoppingBag, Truck, Tag, Wallet } from 'lucide-react';
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

interface Category {
	id: string;
	name: string;
	icon: React.ComponentType<{ className?: string }>;
	items: CartItem[];
}

const PageHeader = ({ title, count }: { title: string; count: number }) => (
	<div className="flex items-center justify-between">
		<h1 className="text-2xl font-bold @md:text-3xl">{title}</h1>
		<Badge variant="secondary" className="px-3 py-1">{count} items</Badge>
	</div>
);

const CategoryIcon = ({ icon: Icon }: { icon: React.ComponentType<{ className?: string }> }) => (
	<div className="size-8 rounded-lg bg-primary/10 flex items-center justify-center">
		<Icon className="size-4 text-primary" />
	</div>
);

const CategoryHeader = ({
	icon,
	name,
	count,
	subtotal,
}: {
	icon: React.ComponentType<{ className?: string }>;
	name: string;
	count: number;
	subtotal: number;
}) => (
	<div className="flex items-center gap-3 flex-1">
		<CategoryIcon icon={icon} />
		<div className="flex-1">
			<span className="font-semibold">{name}</span>
			<span className="ml-2 text-sm text-muted-foreground">({count})</span>
		</div>
		<span className="font-semibold">${subtotal.toFixed(2)}</span>
	</div>
);

const ItemThumb = ({ src, alt }: { src: string; alt: string }) => (
	<div className="relative size-14 shrink-0 overflow-hidden rounded-lg bg-muted">
		<Image src={src} alt={alt} fill className="object-cover" />
	</div>
);

const ItemInfo = ({ name, variant }: { name: string; variant: string }) => (
	<div className="min-w-0 flex-1">
		<h4 className="font-medium line-clamp-1">{name}</h4>
		<p className="text-sm text-muted-foreground">{variant}</p>
	</div>
);

const QuantityControl = ({ quantity }: { quantity: number }) => (
	<div className="flex items-center rounded border">
		<Button size="icon-sm" variant="ghost" className="size-7">
			<Minus className="size-3" />
		</Button>
		<span className="w-5 text-center text-sm">{quantity}</span>
		<Button size="icon-sm" variant="ghost" className="size-7">
			<Plus className="size-3" />
		</Button>
	</div>
);

const ItemPrice = ({ price, quantity }: { price: number; quantity: number }) => (
	<p className="font-medium w-16 text-right">${(price * quantity).toFixed(2)}</p>
);

const RemoveItem = () => (
	<Button size="icon-sm" variant="ghost" className="text-muted-foreground hover:text-destructive">
		<X className="size-4" />
	</Button>
);

const CartItemRow = ({ item }: { item: CartItem }) => (
	<div className="flex items-center gap-3 py-3">
		<ItemThumb src={item.image} alt={item.name} />
		<ItemInfo name={item.name} variant={item.variant} />
		<QuantityControl quantity={item.quantity} />
		<ItemPrice price={item.price} quantity={item.quantity} />
		<RemoveItem />
	</div>
);

const CategorySection = ({ category }: { category: Category }) => {
	const subtotal = category.items.reduce((sum, i) => sum + i.price * i.quantity, 0);

	return (
		<AccordionItem value={category.id} className="border rounded-lg px-4">
			<AccordionTrigger className="hover:no-underline py-4">
				<CategoryHeader
					icon={category.icon}
					name={category.name}
					count={category.items.length}
					subtotal={subtotal}
				/>
			</AccordionTrigger>
			<AccordionContent>
				<div className="divide-y">
					{category.items.map((item) => (
						<CartItemRow key={item.id} item={item} />
					))}
				</div>
			</AccordionContent>
		</AccordionItem>
	);
};

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
	<Card className="sticky top-4">
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
	const categories: Category[] = [
		{
			id: 'electronics',
			name: 'Electronics',
			icon: Wallet,
			items: [
				{
					id: '1',
					image: 'https://images.unsplash.com/photo-1585386959984-a4155224a1ad?w=100&h=100&fit=crop',
					name: 'Wireless Earbuds Pro',
					variant: 'White',
					price: 199.99,
					quantity: 1,
				},
				{
					id: '2',
					image: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=100&h=100&fit=crop',
					name: 'Studio Headphones',
					variant: 'Midnight Black',
					price: 349.99,
					quantity: 1,
				},
			],
		},
		{
			id: 'fashion',
			name: 'Fashion',
			icon: Tag,
			items: [
				{
					id: '3',
					image: 'https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=100&h=100&fit=crop',
					name: 'Running Shoes',
					variant: 'Red • US 10',
					price: 149.99,
					quantity: 1,
				},
			],
		},
		{
			id: 'accessories',
			name: 'Accessories',
			icon: ShoppingBag,
			items: [
				{
					id: '4',
					image: 'https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=100&h=100&fit=crop',
					name: 'Classic Watch',
					variant: 'Silver',
					price: 299.99,
					quantity: 1,
				},
				{
					id: '5',
					image: 'https://images.unsplash.com/photo-1560343090-f0409e92791a?w=100&h=100&fit=crop',
					name: 'Silk Scarf',
					variant: 'Navy Blue',
					price: 79.99,
					quantity: 2,
				},
			],
		},
	];

	const allItems = categories.flatMap((c) => c.items);
	const subtotal = allItems.reduce((sum, i) => sum + i.price * i.quantity, 0);
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
				<PageHeader title="Your Cart" count={allItems.length} />

				<div className="mt-8 grid gap-8 @lg:grid-cols-5">
					<div className="@lg:col-span-3">
						<Accordion
							type="multiple"
							defaultValue={categories.map((c) => c.id)}
							className="space-y-4"
						>
							{categories.map((category) => (
								<CategorySection key={category.id} category={category} />
							))}
						</Accordion>
					</div>

					<div className="@lg:col-span-2">
						<OrderSummary
							title="Order Summary"
							lines={summaryLines}
							checkoutLabel="Checkout"
							checkoutHref="/checkout"
						/>
					</div>
				</div>
			</div>
		</section>
	);
}
