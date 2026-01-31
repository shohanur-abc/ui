import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Minus, Plus, X, ArrowRight, ChevronLeft, ChevronRight, ChevronsLeft, ChevronsRight, FileStack } from 'lucide-react';
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
			<FileStack className="size-6 text-primary" />
			<h1 className="text-2xl font-bold @md:text-3xl">{title}</h1>
		</div>
		<Badge variant="secondary" className="px-3 py-1">{count} total items</Badge>
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

const PaginatedItem = ({ item }: { item: CartItem }) => (
	<div className="flex gap-4 py-4">
		<ItemImage src={item.image} alt={item.name} />
		<div className="flex-1 min-w-0">
			<div className="flex items-start justify-between gap-2">
				<div>
					<h3 className="font-semibold line-clamp-1">{item.name}</h3>
					<p className="text-sm text-muted-foreground">{item.variant}</p>
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

const PaginationControls = ({
	currentPage,
	totalPages,
	itemsPerPage,
}: {
	currentPage: number;
	totalPages: number;
	itemsPerPage: number;
}) => (
	<div className="flex flex-col @sm:flex-row items-center justify-between gap-4 py-4 border-t">
		<div className="flex items-center gap-2">
			<span className="text-sm text-muted-foreground">Items per page:</span>
			<Select defaultValue={String(itemsPerPage)}>
				<SelectTrigger className="w-[70px]">
					<SelectValue />
				</SelectTrigger>
				<SelectContent>
					<SelectItem value="3">3</SelectItem>
					<SelectItem value="5">5</SelectItem>
					<SelectItem value="10">10</SelectItem>
					<SelectItem value="20">20</SelectItem>
				</SelectContent>
			</Select>
		</div>

		<div className="flex items-center gap-1">
			<Button size="icon-sm" variant="outline" disabled={currentPage === 1}>
				<ChevronsLeft className="size-4" />
			</Button>
			<Button size="icon-sm" variant="outline" disabled={currentPage === 1}>
				<ChevronLeft className="size-4" />
			</Button>

			<div className="flex items-center gap-1 mx-2">
				{Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
					<Button
						key={page}
						size="icon-sm"
						variant={page === currentPage ? 'default' : 'outline'}
					>
						{page}
					</Button>
				))}
			</div>

			<Button size="icon-sm" variant="outline" disabled={currentPage === totalPages}>
				<ChevronRight className="size-4" />
			</Button>
			<Button size="icon-sm" variant="outline" disabled={currentPage === totalPages}>
				<ChevronsRight className="size-4" />
			</Button>
		</div>

		<span className="text-sm text-muted-foreground">
			Page {currentPage} of {totalPages}
		</span>
	</div>
);

const PageInfo = ({
	start,
	end,
	total,
}: {
	start: number;
	end: number;
	total: number;
}) => (
	<div className="text-sm text-muted-foreground py-2">
		Showing {start}-{end} of {total} items
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
	// Simulating a large cart with many items
	const allItems: CartItem[] = [
		{ id: '1', image: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=200&h=200&fit=crop', name: 'Studio Headphones Pro', variant: 'Black • Wireless', price: 299.99, quantity: 1 },
		{ id: '2', image: 'https://images.unsplash.com/photo-1585386959984-a4155224a1ad?w=200&h=200&fit=crop', name: 'Wireless Earbuds', variant: 'White • ANC', price: 179.99, quantity: 1 },
		{ id: '3', image: 'https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=200&h=200&fit=crop', name: 'Running Shoes', variant: 'Red • US 10', price: 149.99, quantity: 1 },
		{ id: '4', image: 'https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=200&h=200&fit=crop', name: 'Classic Watch', variant: 'Silver • Leather', price: 249.99, quantity: 1 },
		{ id: '5', image: 'https://images.unsplash.com/photo-1560343090-f0409e92791a?w=200&h=200&fit=crop', name: 'Silk Scarf', variant: 'Navy pattern', price: 89.99, quantity: 2 },
		{ id: '6', image: 'https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=200&h=200&fit=crop', name: 'Leather Bag', variant: 'Brown', price: 329.99, quantity: 1 },
		{ id: '7', image: 'https://images.unsplash.com/photo-1572635196237-14b3f281503f?w=200&h=200&fit=crop', name: 'Sunglasses', variant: 'Black', price: 159.99, quantity: 1 },
		{ id: '8', image: 'https://images.unsplash.com/photo-1526170375885-4d8ecf77b99f?w=200&h=200&fit=crop', name: 'Camera', variant: 'Digital SLR', price: 899.99, quantity: 1 },
		{ id: '9', image: 'https://images.unsplash.com/photo-1585386959984-a4155224a1ad?w=200&h=200&fit=crop', name: 'Earbuds Case', variant: 'White', price: 29.99, quantity: 1 },
	];

	const itemsPerPage = 3;
	const currentPage = 1;
	const totalPages = Math.ceil(allItems.length / itemsPerPage);
	const startIndex = (currentPage - 1) * itemsPerPage;
	const endIndex = startIndex + itemsPerPage;
	const currentItems = allItems.slice(startIndex, endIndex);

	const subtotal = allItems.reduce((sum, i) => sum + i.price * i.quantity, 0);
	const tax = subtotal * 0.08;
	const total = subtotal + tax;

	const summaryLines = [
		{ label: 'Subtotal (all pages)', value: `$${subtotal.toFixed(2)}` },
		{ label: 'Shipping', value: 'Free' },
		{ label: 'Tax', value: `$${tax.toFixed(2)}` },
		{ label: 'Total', value: `$${total.toFixed(2)}`, bold: true },
	];

	return (
		<section className="@container">
			<div className="mx-auto max-w-5xl px-4 py-8 @md:py-12">
				<PageHeader title="Paginated Cart" count={allItems.length} />

				<div className="mt-8 grid gap-8 @lg:grid-cols-3">
					<div className="@lg:col-span-2">
						<Card>
							<CardHeader className="pb-0">
								<PageInfo
									start={startIndex + 1}
									end={Math.min(endIndex, allItems.length)}
									total={allItems.length}
								/>
							</CardHeader>
							<CardContent className="divide-y">
								{currentItems.map((item) => (
									<PaginatedItem key={item.id} item={item} />
								))}
							</CardContent>
							<CardFooter className="flex-col p-0 px-6 pb-4">
								<PaginationControls
									currentPage={currentPage}
									totalPages={totalPages}
									itemsPerPage={itemsPerPage}
								/>
							</CardFooter>
						</Card>
					</div>

					<div>
						<Card className="sticky top-4">
							<CardHeader>
								<CardTitle>Order Summary</CardTitle>
							</CardHeader>
							<CardContent className="space-y-3">
								<div className="p-3 bg-muted/50 rounded-lg text-sm">
									<p><strong>{allItems.length}</strong> items across <strong>{totalPages}</strong> pages</p>
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
										Checkout All Items
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
