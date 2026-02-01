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
import { ScrollArea } from '@/components/ui/scroll-area';
import { Minus, Plus, X, ArrowRight, Infinity, Loader2 } from 'lucide-react';
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

const PageHeader = ({
	title,
	loaded,
	total,
}: {
	title: string;
	loaded: number;
	total: number;
}) => (
	<div className="flex items-center justify-between">
		<div className="flex items-center gap-3">
			<Infinity className="size-6 text-primary" />
			<h1 className="text-2xl font-bold @md:text-3xl">{title}</h1>
		</div>
		<Badge variant="secondary" className="px-3 py-1">
			{loaded} / {total} loaded
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

const InfiniteItem = ({ item }: { item: CartItem }) => (
	<div className="flex gap-3 py-3 border-b last:border-0">
		<ItemImage src={item.image} alt={item.name} />
		<div className="flex-1 min-w-0">
			<div className="flex items-start justify-between gap-2">
				<div>
					<h4 className="font-medium text-sm line-clamp-1">{item.name}</h4>
					<p className="text-xs text-muted-foreground">{item.variant}</p>
				</div>
				<Button
					size="icon-sm"
					variant="ghost"
					className="size-6 text-muted-foreground hover:text-destructive shrink-0"
				>
					<X className="size-3" />
				</Button>
			</div>
			<div className="flex items-center justify-between mt-2">
				<QuantityControl quantity={item.quantity} />
				<p className="font-semibold text-sm">
					${(item.price * item.quantity).toFixed(2)}
				</p>
			</div>
		</div>
	</div>
);

const LoadingIndicator = () => (
	<div className="flex items-center justify-center py-6 gap-2 text-muted-foreground">
		<Loader2 className="size-5 animate-spin" />
		<span className="text-sm">Loading more items...</span>
	</div>
);

const LoadMoreButton = ({ remaining }: { remaining: number }) => (
	<div className="flex flex-col items-center py-6 gap-2">
		<Button variant="outline" className="gap-2">
			Load More
			<Badge variant="secondary">{remaining} remaining</Badge>
		</Button>
		<p className="text-xs text-muted-foreground">Scroll down to auto-load</p>
	</div>
);

const ScrollProgress = ({
	loaded,
	total,
}: {
	loaded: number;
	total: number;
}) => {
	const percentage = Math.round((loaded / total) * 100);
	return (
		<div className="space-y-1">
			<div className="flex justify-between text-xs text-muted-foreground">
				<span>Scroll progress</span>
				<span>{percentage}%</span>
			</div>
			<div className="h-1.5 bg-muted rounded-full overflow-hidden">
				<div
					className="h-full bg-primary transition-all duration-300"
					style={{ width: `${percentage}%` }}
				/>
			</div>
		</div>
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
	<div
		className={`flex justify-between ${bold ? 'text-xl font-bold' : 'text-muted-foreground'}`}
	>
		<span>{label}</span>
		<span className={bold ? 'text-primary' : ''}>{value}</span>
	</div>
);

export default function Main() {
	// Simulating loaded items (would be loaded incrementally)
	const loadedItems: CartItem[] = [
		{
			id: '1',
			image:
				'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=150&h=150&fit=crop',
			name: 'Studio Headphones Pro',
			variant: 'Black • Wireless',
			price: 299.99,
			quantity: 1,
		},
		{
			id: '2',
			image:
				'https://images.unsplash.com/photo-1585386959984-a4155224a1ad?w=150&h=150&fit=crop',
			name: 'Wireless Earbuds',
			variant: 'White • ANC',
			price: 179.99,
			quantity: 1,
		},
		{
			id: '3',
			image:
				'https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=150&h=150&fit=crop',
			name: 'Running Shoes',
			variant: 'Red • US 10',
			price: 149.99,
			quantity: 1,
		},
		{
			id: '4',
			image:
				'https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=150&h=150&fit=crop',
			name: 'Classic Watch',
			variant: 'Silver • Leather',
			price: 249.99,
			quantity: 1,
		},
		{
			id: '5',
			image:
				'https://images.unsplash.com/photo-1560343090-f0409e92791a?w=150&h=150&fit=crop',
			name: 'Silk Scarf',
			variant: 'Navy pattern',
			price: 89.99,
			quantity: 2,
		},
		{
			id: '6',
			image:
				'https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=150&h=150&fit=crop',
			name: 'Leather Bag',
			variant: 'Brown',
			price: 329.99,
			quantity: 1,
		},
	];

	const totalItems = 15; // Total items in cart
	const loadedCount = loadedItems.length;
	const remainingCount = totalItems - loadedCount;
	const isLoading = false;

	// Calculate based on all items (simulated total)
	const estimatedSubtotal =
		loadedItems.reduce((sum, i) => sum + i.price * i.quantity, 0) *
		(totalItems / loadedCount);
	const subtotal = loadedItems.reduce(
		(sum, i) => sum + i.price * i.quantity,
		0,
	);
	const tax = subtotal * 0.08;
	const total = subtotal + tax;

	const summaryLines = [
		{
			label: `Loaded items (${loadedCount})`,
			value: `$${subtotal.toFixed(2)}`,
		},
		{
			label: 'Estimated total (all)',
			value: `~$${estimatedSubtotal.toFixed(2)}`,
		},
		{ label: 'Shipping', value: 'Free' },
		{ label: 'Tax (loaded)', value: `$${tax.toFixed(2)}` },
		{ label: 'Current Total', value: `$${total.toFixed(2)}`, bold: true },
	];

	return (
		<section className="@container">
			<div className="mx-auto max-w-5xl px-4 py-8 @md:py-12">
				<PageHeader
					title="Infinite Cart"
					loaded={loadedCount}
					total={totalItems}
				/>

				<div className="mt-8 grid gap-8 @lg:grid-cols-3">
					<div className="@lg:col-span-2">
						<Card>
							<CardHeader className="pb-2">
								<ScrollProgress loaded={loadedCount} total={totalItems} />
							</CardHeader>
							<CardContent className="p-0">
								<ScrollArea className="h-[500px] px-4">
									<div className="py-2">
										{loadedItems.map((item) => (
											<InfiniteItem key={item.id} item={item} />
										))}

										{isLoading && <LoadingIndicator />}

										{!isLoading && remainingCount > 0 && (
											<LoadMoreButton remaining={remainingCount} />
										)}
									</div>
								</ScrollArea>
							</CardContent>
						</Card>
					</div>

					<div>
						<Card className="sticky top-4">
							<CardHeader>
								<CardTitle>Order Summary</CardTitle>
							</CardHeader>
							<CardContent className="space-y-3">
								<div className="p-3 bg-muted/50 rounded-lg text-sm space-y-1">
									<p className="flex justify-between">
										<span>Loaded:</span>
										<strong>{loadedCount} items</strong>
									</p>
									<p className="flex justify-between">
										<span>Remaining:</span>
										<strong>{remainingCount} items</strong>
									</p>
								</div>

								<Separator />

								{summaryLines.map((line, i) => (
									<div key={i}>
										{line.bold && <Separator className="my-3" />}
										<SummaryLine {...line} />
									</div>
								))}

								{remainingCount > 0 && (
									<p className="text-xs text-muted-foreground text-center">
										Load all items for accurate total
									</p>
								)}
							</CardContent>
							<CardFooter className="flex-col gap-2">
								{remainingCount > 0 && (
									<Button variant="outline" className="w-full">
										Load All Items
									</Button>
								)}
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
