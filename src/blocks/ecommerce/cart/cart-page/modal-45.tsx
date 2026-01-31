import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import {
	Dialog,
	DialogContent,
	DialogDescription,
	DialogFooter,
	DialogHeader,
	DialogTitle,
	DialogTrigger,
} from '@/components/ui/dialog';
import { Minus, Plus, X, ArrowRight, ShoppingCart, Trash2, Edit } from 'lucide-react';
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
			<ShoppingCart className="size-6 text-primary" />
			<h1 className="text-2xl font-bold @md:text-3xl">{title}</h1>
		</div>
		<Badge variant="secondary" className="px-3 py-1">{count} items</Badge>
	</div>
);

const ItemImage = ({ src, alt }: { src: string; alt: string }) => (
	<div className="relative size-20 shrink-0 overflow-hidden rounded-lg bg-muted">
		<Image src={src} alt={alt} fill className="object-cover" />
	</div>
);

const QuantityControl = ({ quantity }: { quantity: number }) => (
	<div className="flex items-center rounded-lg border">
		<Button size="icon-sm" variant="ghost" className="size-8">
			<Minus className="size-3" />
		</Button>
		<span className="w-6 text-center text-sm">{quantity}</span>
		<Button size="icon-sm" variant="ghost" className="size-8">
			<Plus className="size-3" />
		</Button>
	</div>
);

const DeleteDialog = ({ item }: { item: CartItem }) => (
	<Dialog>
		<DialogTrigger asChild>
			<Button size="icon-sm" variant="ghost" className="text-muted-foreground hover:text-destructive">
				<Trash2 className="size-4" />
			</Button>
		</DialogTrigger>
		<DialogContent>
			<DialogHeader>
				<DialogTitle>Remove Item</DialogTitle>
				<DialogDescription>
					Are you sure you want to remove "{item.name}" from your cart?
				</DialogDescription>
			</DialogHeader>
			<div className="flex items-center gap-4 py-4">
				<ItemImage src={item.image} alt={item.name} />
				<div>
					<p className="font-semibold">{item.name}</p>
					<p className="text-sm text-muted-foreground">{item.variant}</p>
					<p className="text-primary font-bold mt-1">${item.price.toFixed(2)}</p>
				</div>
			</div>
			<DialogFooter>
				<Button variant="outline">Cancel</Button>
				<Button variant="destructive" className="gap-1">
					<Trash2 className="size-4" />
					Remove
				</Button>
			</DialogFooter>
		</DialogContent>
	</Dialog>
);

const EditDialog = ({ item }: { item: CartItem }) => (
	<Dialog>
		<DialogTrigger asChild>
			<Button size="icon-sm" variant="ghost" className="text-muted-foreground">
				<Edit className="size-4" />
			</Button>
		</DialogTrigger>
		<DialogContent className="max-w-md">
			<DialogHeader>
				<DialogTitle>Edit Item</DialogTitle>
				<DialogDescription>
					Update quantity or options for this item.
				</DialogDescription>
			</DialogHeader>
			<div className="space-y-4 py-4">
				<div className="flex items-center gap-4">
					<ItemImage src={item.image} alt={item.name} />
					<div className="flex-1">
						<p className="font-semibold">{item.name}</p>
						<p className="text-sm text-muted-foreground">{item.variant}</p>
					</div>
				</div>
				<Separator />
				<div className="flex items-center justify-between">
					<span className="font-medium">Quantity</span>
					<QuantityControl quantity={item.quantity} />
				</div>
				<div className="flex items-center justify-between">
					<span className="font-medium">Price</span>
					<span className="text-primary font-bold">${item.price.toFixed(2)}</span>
				</div>
				<div className="flex items-center justify-between">
					<span className="font-medium">Total</span>
					<span className="text-xl font-bold">${(item.price * item.quantity).toFixed(2)}</span>
				</div>
			</div>
			<DialogFooter>
				<Button variant="outline">Cancel</Button>
				<Button className="gap-1">
					Save Changes
				</Button>
			</DialogFooter>
		</DialogContent>
	</Dialog>
);

const CartItemRow = ({ item }: { item: CartItem }) => (
	<div className="flex gap-4 py-4">
		<ItemImage src={item.image} alt={item.name} />
		<div className="flex-1 min-w-0">
			<div className="flex items-start justify-between gap-2">
				<div>
					<h3 className="font-semibold line-clamp-1">{item.name}</h3>
					<p className="text-sm text-muted-foreground">{item.variant}</p>
				</div>
				<div className="flex items-center gap-1">
					<EditDialog item={item} />
					<DeleteDialog item={item} />
				</div>
			</div>
			<div className="flex items-center justify-between mt-3">
				<QuantityControl quantity={item.quantity} />
				<p className="font-bold text-primary text-lg">${(item.price * item.quantity).toFixed(2)}</p>
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
	<div className={`flex justify-between ${bold ? 'text-xl font-bold' : 'text-muted-foreground'}`}>
		<span>{label}</span>
		<span className={bold ? 'text-primary' : ''}>{value}</span>
	</div>
);

const ClearCartDialog = ({ count }: { count: number }) => (
	<Dialog>
		<DialogTrigger asChild>
			<Button variant="ghost" size="sm" className="text-muted-foreground hover:text-destructive gap-1">
				<Trash2 className="size-4" />
				Clear cart
			</Button>
		</DialogTrigger>
		<DialogContent>
			<DialogHeader>
				<DialogTitle>Clear Cart</DialogTitle>
				<DialogDescription>
					Are you sure you want to remove all {count} items from your cart? This action cannot be undone.
				</DialogDescription>
			</DialogHeader>
			<DialogFooter>
				<Button variant="outline">Cancel</Button>
				<Button variant="destructive" className="gap-1">
					<Trash2 className="size-4" />
					Clear All
				</Button>
			</DialogFooter>
		</DialogContent>
	</Dialog>
);

export default function Main() {
	const items: CartItem[] = [
		{
			id: '1',
			image: 'https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=200&h=200&fit=crop',
			name: 'Running Shoes Pro',
			variant: 'Red • US 10',
			price: 149.99,
			quantity: 1,
		},
		{
			id: '2',
			image: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=200&h=200&fit=crop',
			name: 'Studio Headphones',
			variant: 'Black • Wireless',
			price: 299.99,
			quantity: 1,
		},
		{
			id: '3',
			image: 'https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=200&h=200&fit=crop',
			name: 'Classic Watch',
			variant: 'Silver • Leather',
			price: 249.99,
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
			<div className="mx-auto max-w-4xl px-4 py-8 @md:py-12">
				<PageHeader title="Shopping Cart" count={items.length} />

				<div className="mt-8 grid gap-8 @lg:grid-cols-3">
					<div className="@lg:col-span-2">
						<Card>
							<CardHeader className="flex flex-row items-center justify-between">
								<CardTitle>Cart Items</CardTitle>
								<ClearCartDialog count={items.length} />
							</CardHeader>
							<CardContent className="divide-y">
								{items.map((item) => (
									<CartItemRow key={item.id} item={item} />
								))}
							</CardContent>
						</Card>
					</div>

					<div>
						<Card className="sticky top-4">
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
							<CardFooter>
								<Button className="w-full gap-2" size="lg" asChild>
									<Link href="/checkout">
										Checkout
										<ArrowRight className="size-4" />
									</Link>
								</Button>
							</CardFooter>
						</Card>
					</div>
				</div>
			</div>
		</section>
	);
}
