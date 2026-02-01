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
	Layers,
	Package,
	Truck,
	Star,
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
	seller: string;
	freeShipping: boolean;
}

interface SellerGroup {
	seller: string;
	items: CartItem[];
	subtotal: number;
	freeShipping: boolean;
}

const PageHeader = ({ title, count }: { title: string; count: number }) => (
	<div className="flex items-center justify-between">
		<div className="flex items-center gap-3">
			<Layers className="size-6 text-primary" />
			<h1 className="text-2xl font-bold @md:text-3xl">{title}</h1>
		</div>
		<Badge variant="secondary" className="px-3 py-1">
			{count} items
		</Badge>
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
		<span className="w-5 text-center text-sm">{quantity}</span>
		<Button size="icon-sm" variant="ghost" className="size-7">
			<Plus className="size-3" />
		</Button>
	</div>
);

const GroupedItem = ({ item }: { item: CartItem }) => (
	<div className="flex gap-3 py-3">
		<ItemImage src={item.image} alt={item.name} />
		<div className="flex-1 min-w-0">
			<h4 className="font-medium text-sm line-clamp-1">{item.name}</h4>
			<p className="text-xs text-muted-foreground">{item.variant}</p>
			<div className="flex items-center justify-between mt-2">
				<QuantityControl quantity={item.quantity} />
				<p className="font-semibold text-sm">
					${(item.price * item.quantity).toFixed(2)}
				</p>
			</div>
		</div>
		<Button
			size="icon-sm"
			variant="ghost"
			className="size-6 text-muted-foreground hover:text-destructive shrink-0"
		>
			<X className="size-3" />
		</Button>
	</div>
);

const SellerHeader = ({
	seller,
	itemCount,
	freeShipping,
}: {
	seller: string;
	itemCount: number;
	freeShipping: boolean;
}) => (
	<div className="flex items-center justify-between p-3 bg-muted/50 rounded-t-xl border-b">
		<div className="flex items-center gap-2">
			<Package className="size-4 text-muted-foreground" />
			<span className="font-semibold">{seller}</span>
			<div className="flex items-center text-yellow-500">
				<Star className="size-3 fill-current" />
				<span className="text-xs ml-0.5">4.8</span>
			</div>
		</div>
		<div className="flex items-center gap-2">
			{freeShipping && (
				<Badge
					variant="outline"
					className="text-xs bg-green-500/10 border-green-500/30 text-green-600"
				>
					<Truck className="size-3 mr-1" />
					Free Shipping
				</Badge>
			)}
			<Badge variant="secondary">{itemCount} items</Badge>
		</div>
	</div>
);

const SellerFooter = ({ subtotal }: { subtotal: number }) => (
	<div className="flex items-center justify-between p-3 bg-muted/30 rounded-b-xl border-t">
		<span className="text-sm text-muted-foreground">Seller Subtotal</span>
		<span className="font-bold">${subtotal.toFixed(2)}</span>
	</div>
);

const SellerGroupCard = ({ group }: { group: SellerGroup }) => (
	<Card className="overflow-hidden">
		<SellerHeader
			seller={group.seller}
			itemCount={group.items.length}
			freeShipping={group.freeShipping}
		/>
		<CardContent className="divide-y px-4">
			{group.items.map((item) => (
				<GroupedItem key={item.id} item={item} />
			))}
		</CardContent>
		<SellerFooter subtotal={group.subtotal} />
	</Card>
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
		className={`flex justify-between ${bold ? 'text-xl font-bold' : 'text-muted-foreground'}`}
	>
		<span>{label}</span>
		<span className={bold ? 'text-primary' : ''}>{value}</span>
	</div>
);

export default function Main() {
	const items: CartItem[] = [
		{
			id: '1',
			image:
				'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=150&h=150&fit=crop',
			name: 'Studio Headphones Pro',
			variant: 'Black • Wireless',
			price: 299.99,
			quantity: 1,
			seller: 'TechStore Pro',
			freeShipping: true,
		},
		{
			id: '2',
			image:
				'https://images.unsplash.com/photo-1585386959984-a4155224a1ad?w=150&h=150&fit=crop',
			name: 'Wireless Earbuds',
			variant: 'White',
			price: 179.99,
			quantity: 1,
			seller: 'TechStore Pro',
			freeShipping: true,
		},
		{
			id: '3',
			image:
				'https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=150&h=150&fit=crop',
			name: 'Running Shoes',
			variant: 'Red • US 10',
			price: 149.99,
			quantity: 1,
			seller: 'SportGear Hub',
			freeShipping: false,
		},
		{
			id: '4',
			image:
				'https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=150&h=150&fit=crop',
			name: 'Classic Watch',
			variant: 'Silver',
			price: 249.99,
			quantity: 1,
			seller: 'Luxury Essentials',
			freeShipping: true,
		},
		{
			id: '5',
			image:
				'https://images.unsplash.com/photo-1560343090-f0409e92791a?w=150&h=150&fit=crop',
			name: 'Silk Scarf',
			variant: 'Navy',
			price: 89.99,
			quantity: 1,
			seller: 'Luxury Essentials',
			freeShipping: true,
		},
	];

	// Group items by seller
	const sellerMap = new Map<string, CartItem[]>();
	items.forEach((item) => {
		const existing = sellerMap.get(item.seller) || [];
		sellerMap.set(item.seller, [...existing, item]);
	});

	const sellerGroups: SellerGroup[] = Array.from(sellerMap.entries()).map(
		([seller, items]) => ({
			seller,
			items,
			subtotal: items.reduce((sum, i) => sum + i.price * i.quantity, 0),
			freeShipping: items.every((i) => i.freeShipping),
		}),
	);

	const subtotal = items.reduce((sum, i) => sum + i.price * i.quantity, 0);
	const shipping = sellerGroups.filter((g) => !g.freeShipping).length * 7.99;
	const tax = subtotal * 0.08;
	const total = subtotal + shipping + tax;

	const summaryLines = [
		{ label: 'Subtotal', value: `$${subtotal.toFixed(2)}` },
		{
			label: `Shipping (${sellerGroups.length} sellers)`,
			value: shipping === 0 ? 'Free' : `$${shipping.toFixed(2)}`,
		},
		{ label: 'Tax', value: `$${tax.toFixed(2)}` },
		{ label: 'Total', value: `$${total.toFixed(2)}`, bold: true },
	];

	return (
		<section className="@container">
			<div className="mx-auto max-w-5xl px-4 py-8 @md:py-12">
				<PageHeader title="Grouped Cart" count={items.length} />

				<p className="mt-2 text-muted-foreground">
					Items grouped by seller for easier shipping
				</p>

				<div className="mt-8 grid gap-8 @lg:grid-cols-3">
					<div className="@lg:col-span-2 space-y-6">
						{sellerGroups.map((group) => (
							<SellerGroupCard key={group.seller} group={group} />
						))}
					</div>

					<div>
						<Card className="sticky top-4">
							<CardHeader>
								<CardTitle>Order Summary</CardTitle>
							</CardHeader>
							<CardContent className="space-y-3">
								<div className="p-3 bg-muted/50 rounded-lg">
									<p className="text-sm font-medium">
										Shipping from {sellerGroups.length} sellers
									</p>
									<p className="text-xs text-muted-foreground mt-1">
										{sellerGroups.filter((g) => g.freeShipping).length} with
										free shipping
									</p>
								</div>

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
										Checkout All
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
