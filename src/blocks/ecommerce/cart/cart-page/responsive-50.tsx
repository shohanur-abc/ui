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
	ShoppingCart,
	Smartphone,
	Tablet,
	Monitor,
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
}

const PageHeader = ({ title, count }: { title: string; count: number }) => (
	<div className="flex items-center justify-between">
		<div className="flex items-center gap-3">
			<ShoppingCart className="size-6 text-primary" />
			<h1 className="text-xl font-bold @sm:text-2xl @md:text-3xl">{title}</h1>
		</div>
		<Badge variant="secondary" className="px-2 py-0.5 @sm:px-3 @sm:py-1">
			{count}
		</Badge>
	</div>
);

const ItemImageSmall = ({ src, alt }: { src: string; alt: string }) => (
	<div className="relative size-14 @sm:size-16 @md:size-20 shrink-0 overflow-hidden rounded-lg bg-muted">
		<Image src={src} alt={alt} fill className="object-cover" />
	</div>
);

const ItemImageLarge = ({ src, alt }: { src: string; alt: string }) => (
	<div className="relative aspect-square w-full overflow-hidden rounded-xl bg-muted">
		<Image src={src} alt={alt} fill className="object-cover" />
	</div>
);

const QuantityControlCompact = ({ quantity }: { quantity: number }) => (
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

const QuantityControlFull = ({ quantity }: { quantity: number }) => (
	<div className="flex items-center rounded-xl border-2">
		<Button size="icon" variant="ghost" className="size-10">
			<Minus className="size-4" />
		</Button>
		<span className="w-10 text-center font-medium">{quantity}</span>
		<Button size="icon" variant="ghost" className="size-10">
			<Plus className="size-4" />
		</Button>
	</div>
);

{
	/* Mobile view - compact list */
}
const MobileItem = ({ item }: { item: CartItem }) => (
	<div className="flex gap-3 py-3 @sm:hidden">
		<ItemImageSmall src={item.image} alt={item.name} />
		<div className="flex-1 min-w-0">
			<h4 className="font-medium text-sm line-clamp-1">{item.name}</h4>
			<p className="text-xs text-muted-foreground">{item.variant}</p>
			<div className="flex items-center justify-between mt-2">
				<QuantityControlCompact quantity={item.quantity} />
				<p className="font-bold text-sm">
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

{
	/* Tablet view - horizontal cards */
}
const TabletItem = ({ item }: { item: CartItem }) => (
	<Card className="hidden @sm:block @lg:hidden overflow-hidden">
		<CardContent className="p-0 flex">
			<div className="relative w-28 shrink-0 bg-muted">
				<Image src={item.image} alt={item.name} fill className="object-cover" />
			</div>
			<div className="flex-1 p-4 flex flex-col justify-between">
				<div className="flex items-start justify-between">
					<div>
						<h3 className="font-semibold">{item.name}</h3>
						<p className="text-sm text-muted-foreground">{item.variant}</p>
					</div>
					<Button
						size="icon-sm"
						variant="ghost"
						className="text-muted-foreground hover:text-destructive"
					>
						<X className="size-4" />
					</Button>
				</div>
				<div className="flex items-center justify-between mt-3">
					<div className="flex items-center rounded-lg border">
						<Button size="icon-sm" variant="ghost" className="size-8">
							<Minus className="size-3" />
						</Button>
						<span className="w-6 text-center text-sm">{item.quantity}</span>
						<Button size="icon-sm" variant="ghost" className="size-8">
							<Plus className="size-3" />
						</Button>
					</div>
					<p className="text-lg font-bold text-primary">
						${(item.price * item.quantity).toFixed(2)}
					</p>
				</div>
			</div>
		</CardContent>
	</Card>
);

{
	/* Desktop view - detailed grid */
}
const DesktopItem = ({ item }: { item: CartItem }) => (
	<Card className="hidden @lg:block overflow-hidden">
		<CardContent className="p-4">
			<ItemImageLarge src={item.image} alt={item.name} />
			<div className="mt-4 space-y-3">
				<div className="flex items-start justify-between gap-2">
					<div>
						<h3 className="font-semibold">{item.name}</h3>
						<p className="text-sm text-muted-foreground">{item.variant}</p>
					</div>
					<Button
						size="icon-sm"
						variant="ghost"
						className="text-muted-foreground hover:text-destructive"
					>
						<X className="size-4" />
					</Button>
				</div>
				<Separator />
				<div className="flex items-center justify-between">
					<QuantityControlFull quantity={item.quantity} />
					<p className="text-2xl font-bold text-primary">
						${(item.price * item.quantity).toFixed(2)}
					</p>
				</div>
			</div>
		</CardContent>
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
		className={`flex justify-between ${bold ? 'text-lg @md:text-xl font-bold' : 'text-sm @md:text-base text-muted-foreground'}`}
	>
		<span>{label}</span>
		<span className={bold ? 'text-primary' : ''}>{value}</span>
	</div>
);

const ViewportIndicator = () => (
	<div className="flex items-center gap-2 text-xs text-muted-foreground mb-4">
		<span className="@sm:hidden flex items-center gap-1">
			<Smartphone className="size-3" /> Mobile
		</span>
		<span className="hidden @sm:flex @lg:hidden items-center gap-1">
			<Tablet className="size-3" /> Tablet
		</span>
		<span className="hidden @lg:flex items-center gap-1">
			<Monitor className="size-3" /> Desktop
		</span>
		<span className="ml-auto opacity-50">Resize to see adaptive layout</span>
	</div>
);

export default function Main() {
	const items: CartItem[] = [
		{
			id: '1',
			image:
				'https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=300&h=300&fit=crop',
			name: 'Running Shoes Pro',
			variant: 'Red • US 10',
			price: 149.99,
			quantity: 1,
		},
		{
			id: '2',
			image:
				'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=300&h=300&fit=crop',
			name: 'Studio Headphones',
			variant: 'Black • Wireless',
			price: 299.99,
			quantity: 1,
		},
		{
			id: '3',
			image:
				'https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=300&h=300&fit=crop',
			name: 'Classic Watch',
			variant: 'Silver • Leather',
			price: 249.99,
			quantity: 1,
		},
		{
			id: '4',
			image:
				'https://images.unsplash.com/photo-1585386959984-a4155224a1ad?w=300&h=300&fit=crop',
			name: 'Wireless Earbuds',
			variant: 'White • ANC',
			price: 179.99,
			quantity: 2,
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
			<div className="mx-auto max-w-6xl px-3 @sm:px-4 py-6 @md:py-8 @lg:py-12">
				<ViewportIndicator />
				<PageHeader title="Shopping Cart" count={items.length} />

				<div className="mt-6 @md:mt-8 grid gap-6 @lg:gap-8 @lg:grid-cols-4">
					<div className="@lg:col-span-3">
						{/* Mobile list */}
						<Card className="@sm:hidden">
							<CardContent className="divide-y p-3">
								{items.map((item) => (
									<MobileItem key={item.id} item={item} />
								))}
							</CardContent>
						</Card>

						{/* Tablet stack */}
						<div className="hidden @sm:block @lg:hidden space-y-4">
							{items.map((item) => (
								<TabletItem key={item.id} item={item} />
							))}
						</div>

						{/* Desktop grid */}
						<div className="hidden @lg:grid grid-cols-2 gap-4">
							{items.map((item) => (
								<DesktopItem key={item.id} item={item} />
							))}
						</div>
					</div>

					<div>
						<Card className="sticky top-4">
							<CardHeader className="pb-3 @lg:pb-6">
								<CardTitle className="text-base @md:text-lg">
									Order Summary
								</CardTitle>
							</CardHeader>
							<CardContent className="space-y-2 @md:space-y-3">
								{summaryLines.map((line, i) => (
									<div key={i}>
										{line.bold && <Separator className="my-2 @md:my-3" />}
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
