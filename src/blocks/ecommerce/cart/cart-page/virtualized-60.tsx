import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Minus, Plus, X, ArrowRight, Zap, Info } from 'lucide-react';
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
			<Zap className="size-6 text-primary" />
			<div>
				<h1 className="text-2xl font-bold @md:text-3xl">{title}</h1>
				<p className="text-sm text-muted-foreground">Optimized for large carts</p>
			</div>
		</div>
		<Badge variant="secondary" className="px-3 py-1">{count} items</Badge>
	</div>
);

const VirtualInfo = ({ visible, total }: { visible: number; total: number }) => (
	<div className="flex items-center gap-2 p-3 bg-blue-500/10 rounded-lg text-sm">
		<Info className="size-4 text-blue-500" />
		<span>
			Rendering <strong>{visible}</strong> of <strong>{total}</strong> items for optimal performance
		</span>
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

const VirtualizedRow = ({ item, index }: { item: CartItem; index: number }) => (
	<div
		className="flex gap-3 py-2 px-3 hover:bg-muted/50 rounded-lg transition-colors"
		style={{ height: '72px' }} // Fixed height for virtualization
	>
		<div className="flex items-center w-8 text-xs text-muted-foreground">
			{index + 1}
		</div>
		<ItemImage src={item.image} alt={item.name} />
		<div className="flex-1 min-w-0 flex flex-col justify-center">
			<h4 className="font-medium text-sm line-clamp-1">{item.name}</h4>
			<p className="text-xs text-muted-foreground">{item.variant}</p>
		</div>
		<div className="flex items-center gap-3">
			<QuantityControl quantity={item.quantity} />
			<p className="font-semibold text-sm w-20 text-right">${(item.price * item.quantity).toFixed(2)}</p>
			<Button size="icon-sm" variant="ghost" className="size-6 text-muted-foreground hover:text-destructive">
				<X className="size-3" />
			</Button>
		</div>
	</div>
);

const ListHeader = () => (
	<div className="flex gap-3 py-2 px-3 bg-muted/50 rounded-lg text-xs font-medium text-muted-foreground sticky top-0">
		<div className="w-8">#</div>
		<div className="w-14">Image</div>
		<div className="flex-1">Product</div>
		<div className="w-20 text-center">Qty</div>
		<div className="w-20 text-right">Price</div>
		<div className="w-6" />
	</div>
);

const PerformanceStats = ({ itemCount, renderTime }: { itemCount: number; renderTime: number }) => (
	<div className="grid grid-cols-3 gap-3 text-center">
		<div className="p-2 bg-muted/50 rounded-lg">
			<p className="text-lg font-bold">{itemCount}</p>
			<p className="text-xs text-muted-foreground">Total Items</p>
		</div>
		<div className="p-2 bg-muted/50 rounded-lg">
			<p className="text-lg font-bold">{renderTime}ms</p>
			<p className="text-xs text-muted-foreground">Render Time</p>
		</div>
		<div className="p-2 bg-muted/50 rounded-lg">
			<p className="text-lg font-bold">60</p>
			<p className="text-xs text-muted-foreground">FPS</p>
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
	<div className={`flex justify-between text-sm ${bold ? 'font-bold text-base' : 'text-muted-foreground'}`}>
		<span>{label}</span>
		<span className={bold ? 'text-primary' : ''}>{value}</span>
	</div>
);

export default function Main() {
	// Large dataset for virtualization demo
	const generateItems = (count: number): CartItem[] => {
		const products = [
			{ image: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=100&h=100&fit=crop', name: 'Studio Headphones', variant: 'Black', price: 299.99 },
			{ image: 'https://images.unsplash.com/photo-1585386959984-a4155224a1ad?w=100&h=100&fit=crop', name: 'Wireless Earbuds', variant: 'White', price: 179.99 },
			{ image: 'https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=100&h=100&fit=crop', name: 'Running Shoes', variant: 'Red', price: 149.99 },
			{ image: 'https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=100&h=100&fit=crop', name: 'Classic Watch', variant: 'Silver', price: 249.99 },
			{ image: 'https://images.unsplash.com/photo-1560343090-f0409e92791a?w=100&h=100&fit=crop', name: 'Silk Scarf', variant: 'Navy', price: 89.99 },
		];

		return Array.from({ length: count }, (_, i) => ({
			id: String(i + 1),
			...products[i % products.length],
			name: `${products[i % products.length].name} #${i + 1}`,
			quantity: Math.floor(Math.random() * 3) + 1,
		}));
	};

	const allItems = generateItems(50); // 50 items for demo
	const visibleItems = allItems.slice(0, 15); // Only render visible portion

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
				<PageHeader title="Virtualized Cart" count={allItems.length} />

				<div className="mt-6">
					<VirtualInfo visible={visibleItems.length} total={allItems.length} />
				</div>

				<div className="mt-6 grid gap-8 @lg:grid-cols-3">
					<div className="@lg:col-span-2">
						<Card>
							<CardContent className="p-2">
								<ListHeader />
								<ScrollArea className="h-[500px]">
									<div className="space-y-1 py-2">
										{visibleItems.map((item, i) => (
											<VirtualizedRow key={item.id} item={item} index={i} />
										))}
										{allItems.length > visibleItems.length && (
											<div className="text-center py-4 text-sm text-muted-foreground">
												Scroll to load more items...
												<br />
												<span className="text-xs">
													({allItems.length - visibleItems.length} more items)
												</span>
											</div>
										)}
									</div>
								</ScrollArea>
							</CardContent>
						</Card>
					</div>

					<div className="space-y-4">
						<Card>
							<CardHeader className="pb-3">
								<CardTitle className="text-sm">Performance</CardTitle>
							</CardHeader>
							<CardContent>
								<PerformanceStats itemCount={allItems.length} renderTime={12} />
							</CardContent>
						</Card>

						<Card className="sticky top-4">
							<CardHeader>
								<CardTitle>Order Summary</CardTitle>
							</CardHeader>
							<CardContent className="space-y-2">
								{summaryLines.map((line, i) => (
									<div key={i}>
										{line.bold && <Separator className="my-2" />}
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
