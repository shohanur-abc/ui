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
import { Input } from '@/components/ui/input';
import {
	Minus,
	Plus,
	Trash2,
	ArrowRight,
	Truck,
	ShieldCheck,
	Package,
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

const PageHeader = ({
	title,
	subtitle,
}: {
	title: string;
	subtitle: string;
}) => (
	<div>
		<h1 className="text-3xl font-bold @lg:text-4xl">{title}</h1>
		<p className="mt-2 text-lg text-muted-foreground">{subtitle}</p>
	</div>
);

const TrustBadges = ({
	badges,
}: {
	badges: { icon: React.ComponentType<{ className?: string }>; text: string }[];
}) => (
	<div className="flex flex-wrap gap-6 py-6 border-y">
		{badges.map((badge, i) => (
			<div key={i} className="flex items-center gap-2">
				<badge.icon className="size-5 text-primary" />
				<span className="text-sm">{badge.text}</span>
			</div>
		))}
	</div>
);

const ColumnHeaders = ({ columns }: { columns: string[] }) => (
	<div className="hidden @md:grid @md:grid-cols-12 gap-4 py-3 border-b text-sm font-medium text-muted-foreground">
		<div className="col-span-6">{columns[0]}</div>
		<div className="col-span-2 text-center">{columns[1]}</div>
		<div className="col-span-2 text-center">{columns[2]}</div>
		<div className="col-span-2 text-right">{columns[3]}</div>
	</div>
);

const ItemImage = ({ src, alt }: { src: string; alt: string }) => (
	<div className="relative size-24 shrink-0 overflow-hidden rounded-xl bg-muted @lg:size-28">
		<Image src={src} alt={alt} fill className="object-cover" />
	</div>
);

const ItemInfo = ({ name, variant }: { name: string; variant: string }) => (
	<div>
		<h3 className="font-semibold text-lg">{name}</h3>
		<p className="text-muted-foreground">{variant}</p>
	</div>
);

const QuantitySelector = ({ quantity }: { quantity: number }) => (
	<div className="flex items-center justify-center rounded-lg border">
		<Button size="icon" variant="ghost" className="size-10">
			<Minus className="size-4" />
		</Button>
		<span className="w-10 text-center font-medium text-lg">{quantity}</span>
		<Button size="icon" variant="ghost" className="size-10">
			<Plus className="size-4" />
		</Button>
	</div>
);

const ItemPrice = ({ price }: { price: number }) => (
	<p className="font-medium text-lg">${price.toFixed(2)}</p>
);

const ItemTotal = ({
	price,
	quantity,
}: {
	price: number;
	quantity: number;
}) => (
	<p className="font-bold text-xl text-primary">
		${(price * quantity).toFixed(2)}
	</p>
);

const RemoveBtn = ({ label }: { label: string }) => (
	<Button
		variant="ghost"
		size="sm"
		className="text-muted-foreground hover:text-destructive gap-1"
	>
		<Trash2 className="size-4" />
		<span className="hidden @lg:inline">{label}</span>
	</Button>
);

const CartItemRow = ({ item }: { item: CartItem }) => (
	<div className="grid @md:grid-cols-12 gap-4 py-6 border-b items-center">
		<div className="@md:col-span-6 flex items-center gap-4">
			<ItemImage src={item.image} alt={item.name} />
			<ItemInfo name={item.name} variant={item.variant} />
		</div>
		<div className="@md:col-span-2 flex @md:justify-center">
			<QuantitySelector quantity={item.quantity} />
		</div>
		<div className="hidden @md:block @md:col-span-2 text-center">
			<ItemPrice price={item.price} />
		</div>
		<div className="@md:col-span-2 flex items-center justify-between @md:justify-end gap-4">
			<ItemTotal price={item.price} quantity={item.quantity} />
			<RemoveBtn label="Remove" />
		</div>
	</div>
);

const PromoSection = ({
	placeholder,
	buttonLabel,
}: {
	placeholder: string;
	buttonLabel: string;
}) => (
	<div className="flex gap-3">
		<Input placeholder={placeholder} className="flex-1 h-12 text-lg" />
		<Button variant="secondary" size="lg" className="px-8">
			{buttonLabel}
		</Button>
	</div>
);

const SummaryLine = ({
	label,
	value,
	variant,
}: {
	label: string;
	value: string;
	variant?: 'default' | 'total';
}) => (
	<div
		className={`flex justify-between ${variant === 'total' ? 'text-2xl font-bold' : 'text-lg'}`}
	>
		<span className={variant === 'total' ? '' : 'text-muted-foreground'}>
			{label}
		</span>
		<span className={variant === 'total' ? 'text-primary' : ''}>{value}</span>
	</div>
);

const OrderSummary = ({
	title,
	lines,
	checkoutLabel,
	checkoutHref,
}: {
	title: string;
	lines: { label: string; value: string; variant?: 'default' | 'total' }[];
	checkoutLabel: string;
	checkoutHref: string;
}) => (
	<Card className="@lg:sticky @lg:top-4">
		<CardHeader>
			<CardTitle className="text-xl">{title}</CardTitle>
		</CardHeader>
		<CardContent className="space-y-4">
			{lines.map((line, i) => (
				<div key={i}>
					{line.variant === 'total' && <Separator className="my-4" />}
					<SummaryLine {...line} />
				</div>
			))}
		</CardContent>
		<CardFooter>
			<Button className="w-full gap-2 text-lg" size="lg" asChild>
				<Link href={checkoutHref}>
					{checkoutLabel}
					<ArrowRight className="size-5" />
				</Link>
			</Button>
		</CardFooter>
	</Card>
);

export default function Main() {
	const items: CartItem[] = [
		{
			id: '1',
			image:
				'https://images.unsplash.com/photo-1491553895911-0055uj8e14ee?w=200&h=200&fit=crop',
			name: 'Premium Leather Bag',
			variant: 'Cognac Brown',
			price: 249.99,
			quantity: 1,
		},
		{
			id: '2',
			image:
				'https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=200&h=200&fit=crop',
			name: 'Athletic Running Shoes',
			variant: 'Red/Black • US 10',
			price: 159.99,
			quantity: 2,
		},
		{
			id: '3',
			image:
				'https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=200&h=200&fit=crop',
			name: 'Designer Watch',
			variant: 'Rose Gold',
			price: 399.99,
			quantity: 1,
		},
	];

	const trustBadges = [
		{ icon: Truck, text: 'Free Shipping' },
		{ icon: ShieldCheck, text: 'Secure Payment' },
		{ icon: Package, text: 'Easy Returns' },
	];

	const columnHeaders = ['Product', 'Quantity', 'Price', 'Total'];

	const subtotal = items.reduce((sum, i) => sum + i.price * i.quantity, 0);
	const tax = subtotal * 0.08;
	const total = subtotal + tax;

	const summaryLines = [
		{ label: 'Subtotal', value: `$${subtotal.toFixed(2)}` },
		{ label: 'Shipping', value: 'Free' },
		{ label: 'Tax', value: `$${tax.toFixed(2)}` },
		{
			label: 'Total',
			value: `$${total.toFixed(2)}`,
			variant: 'total' as const,
		},
	];

	return (
		<section className="@container">
			<div className="mx-auto max-w-7xl px-4 py-10 @lg:py-16">
				<PageHeader
					title="Shopping Cart"
					subtitle={`${items.length} items in your cart`}
				/>

				<div className="mt-8">
					<TrustBadges badges={trustBadges} />
				</div>

				<div className="mt-8 grid gap-10 @lg:grid-cols-3">
					<div className="@lg:col-span-2">
						<ColumnHeaders columns={columnHeaders} />
						{items.map((item) => (
							<CartItemRow key={item.id} item={item} />
						))}
						<div className="mt-8">
							<PromoSection
								placeholder="Enter promo code"
								buttonLabel="Apply"
							/>
						</div>
					</div>

					<div>
						<OrderSummary
							title="Order Summary"
							lines={summaryLines}
							checkoutLabel="Proceed to Checkout"
							checkoutHref="/checkout"
						/>
					</div>
				</div>
			</div>
		</section>
	);
}
