import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
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
		<div className="flex items-center gap-3">
			<div className="size-10 rounded-lg border-2 border-foreground flex items-center justify-center">
				<ShoppingBag className="size-5" />
			</div>
			<h1 className="text-2xl font-bold @md:text-3xl">{title}</h1>
		</div>
		<Badge variant="outline" className="border-2 px-3 py-1 font-semibold">
			{count} items
		</Badge>
	</div>
);

const OutlinedCard = ({
	children,
	className = '',
}: {
	children: React.ReactNode;
	className?: string;
}) => (
	<div className={`rounded-xl border-2 border-foreground/20 p-6 ${className}`}>
		{children}
	</div>
);

const ItemImage = ({ src, alt }: { src: string; alt: string }) => (
	<div className="relative size-20 shrink-0 overflow-hidden rounded-lg border-2 border-foreground/20">
		<Image src={src} alt={alt} fill className="object-cover" />
	</div>
);

const QuantityControl = ({ quantity }: { quantity: number }) => (
	<div className="flex items-center rounded-md border-2 border-foreground/30">
		<Button size="icon-sm" variant="ghost" className="size-8 hover:bg-muted">
			<Minus className="size-3" />
		</Button>
		<span className="w-6 text-center text-sm font-medium">{quantity}</span>
		<Button size="icon-sm" variant="ghost" className="size-8 hover:bg-muted">
			<Plus className="size-3" />
		</Button>
	</div>
);

const OutlinedItem = ({ item }: { item: CartItem }) => (
	<div className="flex gap-4 py-4 group">
		<ItemImage src={item.image} alt={item.name} />
		<div className="flex-1 min-w-0">
			<div className="flex items-start justify-between gap-2">
				<div>
					<h3 className="font-semibold line-clamp-1">{item.name}</h3>
					<p className="text-sm text-muted-foreground">{item.variant}</p>
				</div>
				<Button
					size="icon-sm"
					variant="outline"
					className="opacity-0 group-hover:opacity-100 border-2 size-7 shrink-0 transition-opacity hover:border-destructive hover:text-destructive"
				>
					<X className="size-3" />
				</Button>
			</div>
			<div className="flex items-center justify-between mt-3">
				<QuantityControl quantity={item.quantity} />
				<p className="font-bold text-lg">
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
}: {
	label: string;
	value: string;
	bold?: boolean;
}) => (
	<div
		className={`flex justify-between ${bold ? 'text-xl font-bold' : 'text-muted-foreground'}`}
	>
		<span className={bold ? 'text-foreground' : ''}>{label}</span>
		<span>{value}</span>
	</div>
);

const OutlinedButton = ({
	children,
	className = '',
	href,
	primary,
}: {
	children: React.ReactNode;
	className?: string;
	href: string;
	primary?: boolean;
}) => (
	<Button
		variant={primary ? 'default' : 'outline'}
		className={`border-2 ${primary ? 'border-primary' : 'border-foreground/30'} ${className}`}
		size="lg"
		asChild
	>
		<Link href={href}>{children}</Link>
	</Button>
);

export default function Main() {
	const items: CartItem[] = [
		{
			id: '1',
			image:
				'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=200&h=200&fit=crop',
			name: 'Studio Headphones Pro',
			variant: 'Black • Wireless',
			price: 299.99,
			quantity: 1,
		},
		{
			id: '2',
			image:
				'https://images.unsplash.com/photo-1585386959984-a4155224a1ad?w=200&h=200&fit=crop',
			name: 'Wireless Earbuds',
			variant: 'White • ANC',
			price: 179.99,
			quantity: 1,
		},
		{
			id: '3',
			image:
				'https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=200&h=200&fit=crop',
			name: 'Running Shoes',
			variant: 'Red • US 10',
			price: 149.99,
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
			<div className="mx-auto max-w-5xl px-4 py-8 @md:py-12">
				<PageHeader title="Your Cart" count={items.length} />

				<div className="mt-8 grid gap-8 @lg:grid-cols-3">
					<div className="@lg:col-span-2">
						<OutlinedCard>
							<div className="flex items-center justify-between mb-4">
								<h2 className="font-semibold text-lg">Cart Items</h2>
								<Badge variant="outline" className="border-2">
									{items.length} products
								</Badge>
							</div>
							<Separator className="mb-2" />
							<div className="divide-y">
								{items.map((item) => (
									<OutlinedItem key={item.id} item={item} />
								))}
							</div>
						</OutlinedCard>
					</div>

					<div>
						<OutlinedCard className="sticky top-4">
							<h2 className="font-semibold text-lg mb-4">Order Summary</h2>
							<Separator className="mb-4" />

							<div className="space-y-3">
								{summaryLines.map((line, i) => (
									<div key={i}>
										{line.bold && <Separator className="my-3" />}
										<SummaryLine {...line} />
									</div>
								))}
							</div>

							<div className="mt-6 space-y-3">
								<OutlinedButton
									href="/checkout"
									primary
									className="w-full gap-2"
								>
									Proceed to Checkout
									<ArrowRight className="size-4" />
								</OutlinedButton>
								<OutlinedButton href="/shop" className="w-full">
									Continue Shopping
								</OutlinedButton>
							</div>
						</OutlinedCard>
					</div>
				</div>
			</div>
		</section>
	);
}
