import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Minus, Plus, X, ArrowRight, ArrowUpDown, ArrowUp, ArrowDown, SortAsc } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';

interface CartItem {
	id: string;
	image: string;
	name: string;
	variant: string;
	price: number;
	quantity: number;
	dateAdded: string;
}

type SortOption = 'price-asc' | 'price-desc' | 'name-asc' | 'name-desc' | 'date-asc' | 'date-desc';

const PageHeader = ({ title, count }: { title: string; count: number }) => (
	<div className="flex items-center justify-between">
		<div className="flex items-center gap-3">
			<SortAsc className="size-6 text-primary" />
			<h1 className="text-2xl font-bold @md:text-3xl">{title}</h1>
		</div>
		<Badge variant="secondary" className="px-3 py-1">{count} items</Badge>
	</div>
);

const SortControl = ({ currentSort }: { currentSort: SortOption }) => (
	<div className="flex items-center gap-3">
		<span className="text-sm text-muted-foreground">Sort by:</span>
		<Select defaultValue={currentSort}>
			<SelectTrigger className="w-[180px]">
				<SelectValue placeholder="Sort by" />
			</SelectTrigger>
			<SelectContent>
				<SelectItem value="price-asc">
					<span className="flex items-center gap-2">
						<ArrowUp className="size-3" /> Price: Low to High
					</span>
				</SelectItem>
				<SelectItem value="price-desc">
					<span className="flex items-center gap-2">
						<ArrowDown className="size-3" /> Price: High to Low
					</span>
				</SelectItem>
				<SelectItem value="name-asc">
					<span className="flex items-center gap-2">
						<ArrowUp className="size-3" /> Name: A to Z
					</span>
				</SelectItem>
				<SelectItem value="name-desc">
					<span className="flex items-center gap-2">
						<ArrowDown className="size-3" /> Name: Z to A
					</span>
				</SelectItem>
				<SelectItem value="date-asc">
					<span className="flex items-center gap-2">
						<ArrowUp className="size-3" /> Date: Oldest First
					</span>
				</SelectItem>
				<SelectItem value="date-desc">
					<span className="flex items-center gap-2">
						<ArrowDown className="size-3" /> Date: Newest First
					</span>
				</SelectItem>
			</SelectContent>
		</Select>
	</div>
);

const QuickSortButtons = ({ currentSort }: { currentSort: SortOption }) => (
	<div className="flex gap-2 overflow-x-auto pb-2">
		<Button
			variant={currentSort.startsWith('price') ? 'default' : 'outline'}
			size="sm"
			className="gap-1"
		>
			Price
			<ArrowUpDown className="size-3" />
		</Button>
		<Button
			variant={currentSort.startsWith('name') ? 'default' : 'outline'}
			size="sm"
			className="gap-1"
		>
			Name
			<ArrowUpDown className="size-3" />
		</Button>
		<Button
			variant={currentSort.startsWith('date') ? 'default' : 'outline'}
			size="sm"
			className="gap-1"
		>
			Date Added
			<ArrowUpDown className="size-3" />
		</Button>
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

const SortedItem = ({ item, rank }: { item: CartItem; rank: number }) => (
	<div className="flex gap-4 py-4">
		<div className="flex items-center justify-center w-6 text-muted-foreground text-sm font-medium">
			#{rank}
		</div>
		<ItemImage src={item.image} alt={item.name} />
		<div className="flex-1 min-w-0">
			<div className="flex items-start justify-between gap-2">
				<div>
					<h3 className="font-semibold line-clamp-1">{item.name}</h3>
					<p className="text-sm text-muted-foreground">{item.variant}</p>
					<p className="text-xs text-muted-foreground mt-1">
						Added: {new Date(item.dateAdded).toLocaleDateString()}
					</p>
				</div>
				<Button size="icon-sm" variant="ghost" className="text-muted-foreground hover:text-destructive shrink-0">
					<X className="size-4" />
				</Button>
			</div>
			<div className="flex items-center justify-between mt-3">
				<QuantityControl quantity={item.quantity} />
				<p className="font-bold text-primary text-lg">${(item.price * item.quantity).toFixed(2)}</p>
			</div>
		</div>
	</div>
);

const SortInfo = ({ sortBy }: { sortBy: string }) => (
	<div className="flex items-center gap-2 p-2 bg-muted/50 rounded-lg text-sm">
		<ArrowUpDown className="size-4 text-primary" />
		<span>Currently sorted by: <strong>{sortBy}</strong></span>
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

export default function Main() {
	const items: CartItem[] = [
		{
			id: '1',
			image: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=200&h=200&fit=crop',
			name: 'Studio Headphones Pro',
			variant: 'Black • Wireless',
			price: 299.99,
			quantity: 1,
			dateAdded: '2024-01-15',
		},
		{
			id: '2',
			image: 'https://images.unsplash.com/photo-1585386959984-a4155224a1ad?w=200&h=200&fit=crop',
			name: 'Wireless Earbuds',
			variant: 'White • ANC',
			price: 179.99,
			quantity: 1,
			dateAdded: '2024-01-18',
		},
		{
			id: '3',
			image: 'https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=200&h=200&fit=crop',
			name: 'Running Shoes',
			variant: 'Red • US 10',
			price: 149.99,
			quantity: 1,
			dateAdded: '2024-01-10',
		},
		{
			id: '4',
			image: 'https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=200&h=200&fit=crop',
			name: 'Classic Watch',
			variant: 'Silver • Leather',
			price: 249.99,
			quantity: 1,
			dateAdded: '2024-01-20',
		},
	];

	// Sort by price descending (high to low)
	const sortedItems = [...items].sort((a, b) => b.price - a.price);

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
				<PageHeader title="Sorted Cart" count={items.length} />

				<div className="mt-6 space-y-4">
					<div className="flex flex-col @md:flex-row @md:items-center @md:justify-between gap-4">
						<QuickSortButtons currentSort="price-desc" />
						<SortControl currentSort="price-desc" />
					</div>
					<SortInfo sortBy="Price: High to Low" />
				</div>

				<div className="mt-6 grid gap-8 @lg:grid-cols-3">
					<div className="@lg:col-span-2">
						<Card>
							<CardContent className="divide-y pt-4">
								{sortedItems.map((item, i) => (
									<SortedItem key={item.id} item={item} rank={i + 1} />
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
								<div className="p-3 bg-muted/50 rounded-lg">
									<p className="text-sm">
										<strong>Highest priced:</strong> {sortedItems[0]?.name}
									</p>
									<p className="text-sm mt-1">
										<strong>Lowest priced:</strong> {sortedItems[sortedItems.length - 1]?.name}
									</p>
								</div>

								<Separator />

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
