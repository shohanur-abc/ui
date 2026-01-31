import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Separator } from '@/components/ui/separator';
import { Minus, Plus, X, ArrowRight, ShoppingCart, AlertCircle, CheckCircle2 } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';

interface CartItem {
	id: string;
	image: string;
	name: string;
	variant: string;
	price: number;
	quantity: number;
	maxQuantity: number;
	inStock: boolean;
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

const StockStatus = ({ inStock, maxQty }: { inStock: boolean; maxQty: number }) => {
	if (!inStock) {
		return (
			<div className="flex items-center gap-1 text-destructive text-xs mt-1">
				<AlertCircle className="size-3" />
				<span>Out of stock</span>
			</div>
		);
	}
	if (maxQty <= 3) {
		return (
			<div className="flex items-center gap-1 text-orange-500 text-xs mt-1">
				<AlertCircle className="size-3" />
				<span>Only {maxQty} left</span>
			</div>
		);
	}
	return (
		<div className="flex items-center gap-1 text-green-500 text-xs mt-1">
			<CheckCircle2 className="size-3" />
			<span>In stock</span>
		</div>
	);
};

const InlineQuantity = ({
	quantity,
	maxQuantity,
	disabled,
}: {
	quantity: number;
	maxQuantity: number;
	disabled?: boolean;
}) => (
	<div className="flex items-center gap-1">
		<Button size="icon-sm" variant="outline" className="size-8" disabled={disabled || quantity <= 1}>
			<Minus className="size-3" />
		</Button>
		<Input
			type="number"
			value={quantity}
			min={1}
			max={maxQuantity}
			disabled={disabled}
			className="w-14 h-8 text-center text-sm [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
		/>
		<Button size="icon-sm" variant="outline" className="size-8" disabled={disabled || quantity >= maxQuantity}>
			<Plus className="size-3" />
		</Button>
	</div>
);

const InlineItemRow = ({ item }: { item: CartItem }) => (
	<div className={`flex gap-4 py-4 ${!item.inStock ? 'opacity-60' : ''}`}>
		<ItemImage src={item.image} alt={item.name} />
		<div className="flex-1 min-w-0 flex flex-col @md:flex-row @md:items-center gap-3">
			<div className="flex-1">
				<h3 className="font-semibold line-clamp-1">{item.name}</h3>
				<p className="text-sm text-muted-foreground">{item.variant}</p>
				<StockStatus inStock={item.inStock} maxQty={item.maxQuantity} />
			</div>

			<div className="flex items-center gap-4 @md:gap-6">
				<p className="text-sm text-muted-foreground">
					${item.price.toFixed(2)} each
				</p>

				<InlineQuantity
					quantity={item.quantity}
					maxQuantity={item.maxQuantity}
					disabled={!item.inStock}
				/>

				<p className="font-bold text-primary w-20 text-right">
					${(item.price * item.quantity).toFixed(2)}
				</p>

				<Button size="icon-sm" variant="ghost" className="text-muted-foreground hover:text-destructive">
					<X className="size-4" />
				</Button>
			</div>
		</div>
	</div>
);

const TableHeader = () => (
	<div className="hidden @md:flex items-center gap-4 py-2 px-4 bg-muted/50 rounded-lg text-sm font-medium text-muted-foreground">
		<div className="flex-1">Product</div>
		<div className="w-24 text-center">Price</div>
		<div className="w-28 text-center">Quantity</div>
		<div className="w-20 text-right">Total</div>
		<div className="w-10" />
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

const PromoInput = () => (
	<div className="flex gap-2">
		<Input placeholder="Promo code" className="flex-1" />
		<Button variant="outline">Apply</Button>
	</div>
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
			maxQuantity: 10,
			inStock: true,
		},
		{
			id: '2',
			image: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=200&h=200&fit=crop',
			name: 'Studio Headphones',
			variant: 'Black • Wireless',
			price: 299.99,
			quantity: 2,
			maxQuantity: 5,
			inStock: true,
		},
		{
			id: '3',
			image: 'https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=200&h=200&fit=crop',
			name: 'Classic Watch',
			variant: 'Silver • Leather',
			price: 249.99,
			quantity: 1,
			maxQuantity: 2,
			inStock: true,
		},
		{
			id: '4',
			image: 'https://images.unsplash.com/photo-1585386959984-a4155224a1ad?w=200&h=200&fit=crop',
			name: 'Wireless Earbuds',
			variant: 'White • ANC',
			price: 179.99,
			quantity: 1,
			maxQuantity: 0,
			inStock: false,
		},
	];

	const inStockItems = items.filter((i) => i.inStock);
	const subtotal = inStockItems.reduce((sum, i) => sum + i.price * i.quantity, 0);
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
				<PageHeader title="Shopping Cart" count={items.length} />

				<div className="mt-8 grid gap-8 @lg:grid-cols-3">
					<div className="@lg:col-span-2">
						<Card>
							<CardContent className="p-4">
								<TableHeader />
								<div className="divide-y">
									{items.map((item) => (
										<InlineItemRow key={item.id} item={item} />
									))}
								</div>
							</CardContent>
						</Card>
					</div>

					<div>
						<Card className="sticky top-4">
							<CardHeader>
								<CardTitle>Order Summary</CardTitle>
							</CardHeader>
							<CardContent className="space-y-4">
								<PromoInput />
								<Separator />
								<div className="space-y-3">
									{summaryLines.map((line, i) => (
										<div key={i}>
											{line.bold && <Separator className="my-3" />}
											<SummaryLine {...line} />
										</div>
									))}
								</div>
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
