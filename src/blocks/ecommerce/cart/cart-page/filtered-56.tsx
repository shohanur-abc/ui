import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Checkbox } from '@/components/ui/checkbox';
import { Minus, Plus, X, ArrowRight, Filter, Search, SlidersHorizontal } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';

interface CartItem {
	id: string;
	image: string;
	name: string;
	variant: string;
	price: number;
	quantity: number;
	category: string;
	brand: string;
	inStock: boolean;
}

const PageHeader = ({ title, count }: { title: string; count: number }) => (
	<div className="flex items-center justify-between">
		<div className="flex items-center gap-3">
			<Filter className="size-6 text-primary" />
			<h1 className="text-2xl font-bold @md:text-3xl">{title}</h1>
		</div>
		<Badge variant="secondary" className="px-3 py-1">{count} items</Badge>
	</div>
);

const SearchBar = () => (
	<div className="relative">
		<Search className="absolute left-3 top-1/2 -translate-y-1/2 size-4 text-muted-foreground" />
		<input
			type="text"
			placeholder="Search cart items..."
			className="w-full pl-10 pr-4 py-2 border rounded-lg text-sm"
		/>
	</div>
);

const FilterBar = ({
	categories,
	brands,
}: {
	categories: string[];
	brands: string[];
}) => (
	<div className="flex flex-wrap gap-3 items-center">
		<Select defaultValue="all">
			<SelectTrigger className="w-[140px]">
				<SelectValue placeholder="Category" />
			</SelectTrigger>
			<SelectContent>
				<SelectItem value="all">All Categories</SelectItem>
				{categories.map((cat) => (
					<SelectItem key={cat} value={cat.toLowerCase()}>
						{cat}
					</SelectItem>
				))}
			</SelectContent>
		</Select>

		<Select defaultValue="all">
			<SelectTrigger className="w-[130px]">
				<SelectValue placeholder="Brand" />
			</SelectTrigger>
			<SelectContent>
				<SelectItem value="all">All Brands</SelectItem>
				{brands.map((brand) => (
					<SelectItem key={brand} value={brand.toLowerCase()}>
						{brand}
					</SelectItem>
				))}
			</SelectContent>
		</Select>

		<label className="flex items-center gap-2 text-sm cursor-pointer">
			<Checkbox id="in-stock" defaultChecked />
			<span>In Stock Only</span>
		</label>

		<Button variant="outline" size="sm" className="ml-auto gap-1">
			<SlidersHorizontal className="size-3" />
			More Filters
		</Button>
	</div>
);

const ActiveFilters = ({ filters }: { filters: string[] }) => (
	<div className="flex items-center gap-2 flex-wrap">
		<span className="text-sm text-muted-foreground">Active filters:</span>
		{filters.map((filter) => (
			<Badge key={filter} variant="secondary" className="gap-1">
				{filter}
				<button className="hover:text-destructive">
					<X className="size-3" />
				</button>
			</Badge>
		))}
		<Button variant="ghost" size="sm" className="text-xs">
			Clear all
		</Button>
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

const FilteredItem = ({ item }: { item: CartItem }) => (
	<div className={`flex gap-4 py-4 ${!item.inStock ? 'opacity-50' : ''}`}>
		<ItemImage src={item.image} alt={item.name} />
		<div className="flex-1 min-w-0">
			<div className="flex items-start justify-between gap-2">
				<div>
					<h3 className="font-semibold line-clamp-1">{item.name}</h3>
					<p className="text-sm text-muted-foreground">{item.variant}</p>
					<div className="flex gap-1 mt-1">
						<Badge variant="outline" className="text-xs">{item.category}</Badge>
						<Badge variant="outline" className="text-xs">{item.brand}</Badge>
					</div>
				</div>
				<Button size="icon-sm" variant="ghost" className="text-muted-foreground hover:text-destructive shrink-0">
					<X className="size-4" />
				</Button>
			</div>
			<div className="flex items-center justify-between mt-3">
				<QuantityControl quantity={item.quantity} />
				<p className="font-bold text-primary">${(item.price * item.quantity).toFixed(2)}</p>
			</div>
		</div>
	</div>
);

const ResultsInfo = ({ showing, total }: { showing: number; total: number }) => (
	<div className="flex items-center justify-between text-sm text-muted-foreground">
		<span>Showing {showing} of {total} items</span>
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
			image: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=150&h=150&fit=crop',
			name: 'Studio Headphones Pro',
			variant: 'Black • Wireless',
			price: 299.99,
			quantity: 1,
			category: 'Electronics',
			brand: 'AudioMax',
			inStock: true,
		},
		{
			id: '2',
			image: 'https://images.unsplash.com/photo-1585386959984-a4155224a1ad?w=150&h=150&fit=crop',
			name: 'Wireless Earbuds',
			variant: 'White • ANC',
			price: 179.99,
			quantity: 1,
			category: 'Electronics',
			brand: 'SoundPro',
			inStock: true,
		},
		{
			id: '3',
			image: 'https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=150&h=150&fit=crop',
			name: 'Running Shoes',
			variant: 'Red • US 10',
			price: 149.99,
			quantity: 1,
			category: 'Footwear',
			brand: 'RunFast',
			inStock: true,
		},
		{
			id: '4',
			image: 'https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=150&h=150&fit=crop',
			name: 'Classic Watch',
			variant: 'Silver • Leather',
			price: 249.99,
			quantity: 1,
			category: 'Accessories',
			brand: 'TimeClass',
			inStock: false,
		},
	];

	const categories = [...new Set(items.map((i) => i.category))];
	const brands = [...new Set(items.map((i) => i.brand))];
	const activeFilters = ['In Stock'];
	const filteredItems = items.filter((i) => i.inStock);

	const subtotal = filteredItems.reduce((sum, i) => sum + i.price * i.quantity, 0);
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
				<PageHeader title="Filtered Cart" count={items.length} />

				<div className="mt-6 space-y-4">
					<SearchBar />
					<FilterBar categories={categories} brands={brands} />
					<ActiveFilters filters={activeFilters} />
				</div>

				<div className="mt-6 grid gap-8 @lg:grid-cols-3">
					<div className="@lg:col-span-2">
						<Card>
							<CardHeader className="pb-2">
								<ResultsInfo showing={filteredItems.length} total={items.length} />
							</CardHeader>
							<CardContent className="divide-y">
								{filteredItems.map((item) => (
									<FilteredItem key={item.id} item={item} />
								))}
							</CardContent>
						</Card>
					</div>

					<div>
						<Card className="sticky top-4">
							<CardHeader>
								<CardTitle>Summary (filtered)</CardTitle>
							</CardHeader>
							<CardContent className="space-y-3">
								<p className="text-sm text-muted-foreground">
									Showing {filteredItems.length} of {items.length} items
								</p>
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
