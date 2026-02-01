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
	LayoutGrid,
	Shirt,
	Headphones,
	Watch,
	ShoppingBag,
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
	category: 'electronics' | 'apparel' | 'accessories';
}

interface Segment {
	id: string;
	label: string;
	icon: React.ComponentType<{ className?: string }>;
	count: number;
}

const PageHeader = ({ title }: { title: string }) => (
	<div className="flex items-center gap-3">
		<LayoutGrid className="size-6 text-primary" />
		<h1 className="text-2xl font-bold @md:text-3xl">{title}</h1>
	</div>
);

const SegmentTabs = ({
	segments,
	activeSegment,
}: {
	segments: Segment[];
	activeSegment: string;
}) => (
	<div className="flex gap-2 overflow-x-auto pb-2">
		{segments.map((segment) => (
			<button
				key={segment.id}
				className={`flex items-center gap-2 px-4 py-2 rounded-lg whitespace-nowrap transition-colors ${
					activeSegment === segment.id
						? 'bg-primary text-primary-foreground'
						: 'bg-muted hover:bg-muted/80'
				}`}
			>
				<segment.icon className="size-4" />
				<span className="font-medium">{segment.label}</span>
				<Badge
					variant={activeSegment === segment.id ? 'secondary' : 'outline'}
					className="ml-1"
				>
					{segment.count}
				</Badge>
			</button>
		))}
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

const SegmentItem = ({ item }: { item: CartItem }) => (
	<div className="flex gap-4 py-4">
		<ItemImage src={item.image} alt={item.name} />
		<div className="flex-1 min-w-0">
			<div className="flex items-start justify-between gap-2">
				<div>
					<h3 className="font-semibold line-clamp-1">{item.name}</h3>
					<p className="text-sm text-muted-foreground">{item.variant}</p>
				</div>
				<Button
					size="icon-sm"
					variant="ghost"
					className="text-muted-foreground hover:text-destructive shrink-0"
				>
					<X className="size-4" />
				</Button>
			</div>
			<div className="flex items-center justify-between mt-3">
				<QuantityControl quantity={item.quantity} />
				<p className="font-bold text-primary">
					${(item.price * item.quantity).toFixed(2)}
				</p>
			</div>
		</div>
	</div>
);

const SegmentSummary = ({
	label,
	count,
	total,
}: {
	label: string;
	count: number;
	total: number;
}) => (
	<div className="flex items-center justify-between p-3 bg-muted/50 rounded-lg">
		<div className="flex items-center gap-2">
			<Badge variant="secondary">{count}</Badge>
			<span className="text-sm font-medium">{label}</span>
		</div>
		<span className="font-bold">${total.toFixed(2)}</span>
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
		<span>{label}</span>
		<span className={bold ? 'text-primary' : ''}>{value}</span>
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
			category: 'electronics',
		},
		{
			id: '2',
			image:
				'https://images.unsplash.com/photo-1585386959984-a4155224a1ad?w=200&h=200&fit=crop',
			name: 'Wireless Earbuds',
			variant: 'White • ANC',
			price: 179.99,
			quantity: 1,
			category: 'electronics',
		},
		{
			id: '3',
			image:
				'https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=200&h=200&fit=crop',
			name: 'Running Shoes',
			variant: 'Red • US 10',
			price: 149.99,
			quantity: 1,
			category: 'apparel',
		},
		{
			id: '4',
			image:
				'https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=200&h=200&fit=crop',
			name: 'Classic Watch',
			variant: 'Silver • Leather',
			price: 249.99,
			quantity: 1,
			category: 'accessories',
		},
		{
			id: '5',
			image:
				'https://images.unsplash.com/photo-1560343090-f0409e92791a?w=200&h=200&fit=crop',
			name: 'Silk Scarf',
			variant: 'Navy pattern',
			price: 89.99,
			quantity: 2,
			category: 'accessories',
		},
	];

	const electronicsItems = items.filter((i) => i.category === 'electronics');
	const apparelItems = items.filter((i) => i.category === 'apparel');
	const accessoriesItems = items.filter((i) => i.category === 'accessories');

	const segments: Segment[] = [
		{ id: 'all', label: 'All Items', icon: ShoppingBag, count: items.length },
		{
			id: 'electronics',
			label: 'Electronics',
			icon: Headphones,
			count: electronicsItems.length,
		},
		{
			id: 'apparel',
			label: 'Apparel',
			icon: Shirt,
			count: apparelItems.length,
		},
		{
			id: 'accessories',
			label: 'Accessories',
			icon: Watch,
			count: accessoriesItems.length,
		},
	];

	const subtotal = items.reduce((sum, i) => sum + i.price * i.quantity, 0);
	const electronicsTotal = electronicsItems.reduce(
		(sum, i) => sum + i.price * i.quantity,
		0,
	);
	const apparelTotal = apparelItems.reduce(
		(sum, i) => sum + i.price * i.quantity,
		0,
	);
	const accessoriesTotal = accessoriesItems.reduce(
		(sum, i) => sum + i.price * i.quantity,
		0,
	);
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
				<PageHeader title="Segmented Cart" />

				<div className="mt-6">
					<SegmentTabs segments={segments} activeSegment="all" />
				</div>

				<div className="mt-6 grid gap-8 @lg:grid-cols-3">
					<div className="@lg:col-span-2 space-y-6">
						{/* Electronics Segment */}
						{electronicsItems.length > 0 && (
							<Card>
								<CardHeader className="flex flex-row items-center gap-2 pb-2">
									<Headphones className="size-5 text-primary" />
									<CardTitle className="text-base">Electronics</CardTitle>
									<Badge variant="secondary" className="ml-auto">
										{electronicsItems.length}
									</Badge>
								</CardHeader>
								<CardContent className="divide-y">
									{electronicsItems.map((item) => (
										<SegmentItem key={item.id} item={item} />
									))}
								</CardContent>
							</Card>
						)}

						{/* Apparel Segment */}
						{apparelItems.length > 0 && (
							<Card>
								<CardHeader className="flex flex-row items-center gap-2 pb-2">
									<Shirt className="size-5 text-primary" />
									<CardTitle className="text-base">Apparel</CardTitle>
									<Badge variant="secondary" className="ml-auto">
										{apparelItems.length}
									</Badge>
								</CardHeader>
								<CardContent className="divide-y">
									{apparelItems.map((item) => (
										<SegmentItem key={item.id} item={item} />
									))}
								</CardContent>
							</Card>
						)}

						{/* Accessories Segment */}
						{accessoriesItems.length > 0 && (
							<Card>
								<CardHeader className="flex flex-row items-center gap-2 pb-2">
									<Watch className="size-5 text-primary" />
									<CardTitle className="text-base">Accessories</CardTitle>
									<Badge variant="secondary" className="ml-auto">
										{accessoriesItems.length}
									</Badge>
								</CardHeader>
								<CardContent className="divide-y">
									{accessoriesItems.map((item) => (
										<SegmentItem key={item.id} item={item} />
									))}
								</CardContent>
							</Card>
						)}
					</div>

					<div>
						<Card className="sticky top-4">
							<CardHeader>
								<CardTitle>Summary by Category</CardTitle>
							</CardHeader>
							<CardContent className="space-y-3">
								<SegmentSummary
									label="Electronics"
									count={electronicsItems.length}
									total={electronicsTotal}
								/>
								<SegmentSummary
									label="Apparel"
									count={apparelItems.length}
									total={apparelTotal}
								/>
								<SegmentSummary
									label="Accessories"
									count={accessoriesItems.length}
									total={accessoriesTotal}
								/>

								<Separator className="my-4" />

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
