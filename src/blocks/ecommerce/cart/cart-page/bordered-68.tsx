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
	<div className="flex items-center justify-between pb-4 border-b-4 border-foreground">
		<div className="flex items-center gap-3">
			<div className="size-10 border-4 border-foreground flex items-center justify-center">
				<ShoppingBag className="size-5" />
			</div>
			<h1 className="text-2xl font-black @md:text-3xl uppercase tracking-tight">
				{title}
			</h1>
		</div>
		<Badge className="border-4 border-foreground bg-background text-foreground rounded-none px-4 py-1 font-bold">
			{count}
		</Badge>
	</div>
);

const BorderedCard = ({
	children,
	className = '',
	borderWidth = 4,
}: {
	children: React.ReactNode;
	className?: string;
	borderWidth?: 2 | 4;
}) => (
	<div className={`border-${borderWidth} border-foreground p-6 ${className}`}>
		{children}
	</div>
);

const ItemImage = ({ src, alt }: { src: string; alt: string }) => (
	<div className="relative size-20 shrink-0 overflow-hidden border-4 border-foreground">
		<Image src={src} alt={alt} fill className="object-cover" />
	</div>
);

const QuantityControl = ({ quantity }: { quantity: number }) => (
	<div className="flex items-center border-4 border-foreground">
		<Button
			size="icon-sm"
			variant="ghost"
			className="size-8 rounded-none border-r-4 border-foreground hover:bg-foreground hover:text-background"
		>
			<Minus className="size-3" />
		</Button>
		<span className="w-8 text-center text-sm font-bold">{quantity}</span>
		<Button
			size="icon-sm"
			variant="ghost"
			className="size-8 rounded-none border-l-4 border-foreground hover:bg-foreground hover:text-background"
		>
			<Plus className="size-3" />
		</Button>
	</div>
);

const BorderedItem = ({ item }: { item: CartItem }) => (
	<div className="flex gap-4 py-4 border-b-2 border-foreground/30 last:border-0 group">
		<ItemImage src={item.image} alt={item.name} />
		<div className="flex-1 min-w-0">
			<div className="flex items-start justify-between gap-2">
				<div>
					<h3 className="font-bold line-clamp-1 uppercase">{item.name}</h3>
					<p className="text-sm text-muted-foreground">{item.variant}</p>
				</div>
				<Button
					size="icon-sm"
					variant="ghost"
					className="opacity-0 group-hover:opacity-100 border-2 border-foreground size-7 rounded-none shrink-0 transition-opacity hover:bg-destructive hover:border-destructive hover:text-destructive-foreground"
				>
					<X className="size-3" />
				</Button>
			</div>
			<div className="flex items-center justify-between mt-3">
				<QuantityControl quantity={item.quantity} />
				<p className="font-black text-lg">
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
		className={`flex justify-between ${bold ? 'text-xl font-black uppercase' : 'text-muted-foreground'}`}
	>
		<span className={bold ? 'text-foreground' : ''}>{label}</span>
		<span>{value}</span>
	</div>
);

const PromoBanner = () => (
	<div className="border-4 border-foreground bg-foreground text-background p-4 flex items-center justify-between">
		<span className="font-bold uppercase">Free Shipping Over $500</span>
		<Badge className="bg-background text-foreground border-0 rounded-none font-bold">
			Qualified ✓
		</Badge>
	</div>
);

export default function Main() {
	const items: CartItem[] = [
		{
			id: '1',
			image:
				'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=200&h=200&fit=crop',
			name: 'Studio Headphones',
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
		{ label: 'SUBTOTAL', value: `$${subtotal.toFixed(2)}` },
		{ label: 'SHIPPING', value: 'FREE' },
		{ label: 'TAX', value: `$${tax.toFixed(2)}` },
		{ label: 'TOTAL', value: `$${total.toFixed(2)}`, bold: true },
	];

	return (
		<section className="@container">
			<div className="mx-auto max-w-5xl px-4 py-8 @md:py-12">
				<PageHeader title="Shopping Cart" count={items.length} />

				<div className="mt-6">
					<PromoBanner />
				</div>

				<div className="mt-8 grid gap-8 @lg:grid-cols-3">
					<div className="@lg:col-span-2">
						<div className="border-4 border-foreground p-6">
							<h2 className="font-bold text-lg uppercase tracking-tight mb-4 pb-2 border-b-4 border-foreground">
								Items ({items.length})
							</h2>
							<div>
								{items.map((item) => (
									<BorderedItem key={item.id} item={item} />
								))}
							</div>
						</div>
					</div>

					<div>
						<div className="border-4 border-foreground p-6 sticky top-4">
							<h2 className="font-bold text-lg uppercase tracking-tight mb-4 pb-2 border-b-4 border-foreground">
								Summary
							</h2>

							<div className="space-y-3">
								{summaryLines.map((line, i) => (
									<div key={i}>
										{line.bold && (
											<Separator className="my-3 bg-foreground h-1" />
										)}
										<SummaryLine {...line} />
									</div>
								))}
							</div>

							<div className="mt-6 space-y-3">
								<Button
									className="w-full gap-2 rounded-none font-bold uppercase tracking-wide"
									size="lg"
									asChild
								>
									<Link href="/checkout">
										Checkout Now
										<ArrowRight className="size-4" />
									</Link>
								</Button>
								<Button
									variant="outline"
									className="w-full rounded-none border-4 border-foreground font-bold uppercase tracking-wide hover:bg-foreground hover:text-background"
									size="lg"
									asChild
								>
									<Link href="/shop">Continue Shopping</Link>
								</Button>
							</div>
						</div>
					</div>
				</div>
			</div>
		</section>
	);
}
