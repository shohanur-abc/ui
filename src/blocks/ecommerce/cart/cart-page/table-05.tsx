import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import {
	Card,
	CardContent,
	CardFooter,
	CardHeader,
} from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import {
	Table,
	TableBody,
	TableCell,
	TableHead,
	TableHeader,
	TableRow,
} from '@/components/ui/table';
import { Minus, Plus, Trash2, ArrowLeft, Lock } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';

interface CartItem {
	id: string;
	image: string;
	name: string;
	variant: string;
	price: number;
	quantity: number;
	stock: number;
}

const Breadcrumb = ({
	items,
}: {
	items: { label: string; href?: string }[];
}) => (
	<nav className="flex items-center gap-2 text-sm text-muted-foreground">
		{items.map((item, i) => (
			<span key={i} className="flex items-center gap-2">
				{i > 0 && <span>/</span>}
				{item.href ? (
					<Link
						href={item.href}
						className="hover:text-foreground transition-colors"
					>
						{item.label}
					</Link>
				) : (
					<span className="text-foreground font-medium">{item.label}</span>
				)}
			</span>
		))}
	</nav>
);

const ProductCell = ({
	image,
	name,
	variant,
}: {
	image: string;
	name: string;
	variant: string;
}) => (
	<div className="flex items-center gap-4">
		<div className="relative size-16 shrink-0 overflow-hidden rounded-lg bg-muted">
			<Image src={image} alt={name} fill className="object-cover" />
		</div>
		<div className="min-w-0">
			<p className="font-medium truncate">{name}</p>
			<p className="text-sm text-muted-foreground">{variant}</p>
		</div>
	</div>
);

const PriceCell = ({ price }: { price: number }) => (
	<span className="font-medium">${price.toFixed(2)}</span>
);

const QuantityCell = ({
	quantity,
	stock,
}: {
	quantity: number;
	stock: number;
}) => (
	<div className="flex flex-col items-center gap-1">
		<div className="flex items-center gap-1">
			<Button size="icon-sm" variant="outline" className="size-7">
				<Minus className="size-3" />
			</Button>
			<Input
				type="number"
				value={quantity}
				className="h-7 w-14 text-center [appearance:textfield] [&::-webkit-inner-spin-button]:appearance-none [&::-webkit-outer-spin-button]:appearance-none"
				readOnly
			/>
			<Button size="icon-sm" variant="outline" className="size-7">
				<Plus className="size-3" />
			</Button>
		</div>
		{stock < 5 && (
			<Badge
				variant="outline"
				className="text-xs text-orange-500 border-orange-500/50"
			>
				Only {stock} left
			</Badge>
		)}
	</div>
);

const TotalCell = ({
	price,
	quantity,
}: {
	price: number;
	quantity: number;
}) => <span className="font-bold">${(price * quantity).toFixed(2)}</span>;

const RemoveCell = () => (
	<Button
		size="icon-sm"
		variant="ghost"
		className="text-muted-foreground hover:text-destructive"
	>
		<Trash2 className="size-4" />
	</Button>
);

const CartTable = ({
	items,
	headers,
}: {
	items: CartItem[];
	headers: string[];
}) => (
	<Table>
		<TableHeader>
			<TableRow>
				{headers.map((header, i) => (
					<TableHead key={i} className={i === 0 ? 'w-[40%]' : ''}>
						{header}
					</TableHead>
				))}
			</TableRow>
		</TableHeader>
		<TableBody>
			{items.map((item) => (
				<TableRow key={item.id}>
					<TableCell>
						<ProductCell
							image={item.image}
							name={item.name}
							variant={item.variant}
						/>
					</TableCell>
					<TableCell>
						<PriceCell price={item.price} />
					</TableCell>
					<TableCell>
						<QuantityCell quantity={item.quantity} stock={item.stock} />
					</TableCell>
					<TableCell className="text-right">
						<TotalCell price={item.price} quantity={item.quantity} />
					</TableCell>
					<TableCell>
						<RemoveCell />
					</TableCell>
				</TableRow>
			))}
		</TableBody>
	</Table>
);

const ContinueShopping = ({ label, href }: { label: string; href: string }) => (
	<Button variant="ghost" className="gap-2" asChild>
		<Link href={href}>
			<ArrowLeft className="size-4" />
			{label}
		</Link>
	</Button>
);

const SummaryLine = ({
	label,
	value,
	variant,
}: {
	label: string;
	value: string;
	variant?: 'default' | 'large' | 'discount';
}) => (
	<div
		className={`flex justify-between ${
			variant === 'large'
				? 'text-xl font-bold'
				: variant === 'discount'
					? 'text-green-500'
					: ''
		}`}
	>
		<span className={variant === 'large' ? '' : 'text-muted-foreground'}>
			{label}
		</span>
		<span className={variant === 'large' ? 'text-primary' : ''}>{value}</span>
	</div>
);

const OrderSummary = ({
	title,
	lines,
	promoPlaceholder,
	checkoutLabel,
	checkoutHref,
	securityNote,
}: {
	title: string;
	lines: {
		label: string;
		value: string;
		variant?: 'default' | 'large' | 'discount';
	}[];
	promoPlaceholder: string;
	checkoutLabel: string;
	checkoutHref: string;
	securityNote: string;
}) => (
	<Card>
		<CardHeader>
			<h2 className="text-lg font-semibold">{title}</h2>
		</CardHeader>
		<CardContent className="space-y-4">
			<div className="flex gap-2">
				<Input placeholder={promoPlaceholder} />
				<Button variant="outline">Apply</Button>
			</div>

			<div className="space-y-2 pt-4">
				{lines.map((line, i) => (
					<SummaryLine key={i} {...line} />
				))}
			</div>
		</CardContent>
		<CardFooter className="flex-col gap-4">
			<Button className="w-full gap-2" size="lg" asChild>
				<Link href={checkoutHref}>
					<Lock className="size-4" />
					{checkoutLabel}
				</Link>
			</Button>
			<p className="text-xs text-center text-muted-foreground">
				{securityNote}
			</p>
		</CardFooter>
	</Card>
);

export default function Main() {
	const items: CartItem[] = [
		{
			id: '1',
			image:
				'https://images.unsplash.com/photo-1602143407151-7111542de6e8?w=200&h=200&fit=crop',
			name: 'Stainless Steel Water Bottle',
			variant: '750ml / Midnight Blue',
			price: 34.99,
			quantity: 2,
			stock: 15,
		},
		{
			id: '2',
			image:
				'https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=200&h=200&fit=crop',
			name: 'Canvas Backpack',
			variant: 'Large / Olive Green',
			price: 89.99,
			quantity: 1,
			stock: 3,
		},
		{
			id: '3',
			image:
				'https://images.unsplash.com/photo-1544816155-12df9643f363?w=200&h=200&fit=crop',
			name: 'Leather Notebook Cover',
			variant: 'A5 / Brown',
			price: 45.99,
			quantity: 1,
			stock: 8,
		},
	];

	const breadcrumbItems = [
		{ label: 'Home', href: '/' },
		{ label: 'Shop', href: '/shop' },
		{ label: 'Cart' },
	];

	const summaryLines = [
		{ label: 'Subtotal', value: '$205.96' },
		{ label: 'Discount', value: '-$20.00', variant: 'discount' as const },
		{ label: 'Shipping', value: 'Calculated at checkout' },
		{ label: 'Estimated Total', value: '$185.96', variant: 'large' as const },
	];

	return (
		<section className="@container">
			<div className="mx-auto max-w-6xl px-4 py-8 @md:py-12 @xl:py-16">
				<Breadcrumb items={breadcrumbItems} />

				<h1 className="mt-6 text-3xl font-bold @md:text-4xl">Your Cart</h1>
				<p className="mt-2 text-muted-foreground">
					{items.length} items in your cart
				</p>

				<div className="mt-8 grid gap-8 @xl:grid-cols-3">
					<div className="@xl:col-span-2">
						<Card>
							<CardContent className="p-0">
								<CartTable
									items={items}
									headers={['Product', 'Price', 'Quantity', 'Total', '']}
								/>
							</CardContent>
							<CardFooter className="justify-start border-t">
								<ContinueShopping label="Continue Shopping" href="/shop" />
							</CardFooter>
						</Card>
					</div>

					<div>
						<OrderSummary
							title="Order Summary"
							lines={summaryLines}
							promoPlaceholder="Promo code"
							checkoutLabel="Secure Checkout"
							checkoutHref="/checkout"
							securityNote="Your payment information is secure and encrypted"
						/>
					</div>
				</div>
			</div>
		</section>
	);
}
