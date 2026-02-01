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
	CreditCard,
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
	<div className="text-center">
		<div className="inline-flex items-center justify-center size-16 rounded-full bg-primary/10 mb-4">
			<ShoppingCart className="size-8 text-primary" />
		</div>
		<h1 className="text-2xl font-bold @md:text-3xl">{title}</h1>
		<p className="mt-2 text-muted-foreground max-w-md mx-auto">{subtitle}</p>
	</div>
);

const ItemCard = ({ item }: { item: CartItem }) => (
	<Card className="overflow-hidden">
		<div className="relative aspect-square w-full bg-muted">
			<Image src={item.image} alt={item.name} fill className="object-cover" />
			<Button
				size="icon-sm"
				variant="secondary"
				className="absolute top-2 right-2 size-7 rounded-full opacity-80 hover:opacity-100"
			>
				<X className="size-3" />
			</Button>
		</div>
		<CardContent className="p-4 space-y-3">
			<div>
				<h3 className="font-semibold line-clamp-1">{item.name}</h3>
				<p className="text-sm text-muted-foreground">{item.variant}</p>
			</div>
			<div className="flex items-center justify-between">
				<div className="flex items-center rounded-lg border">
					<Button size="icon-sm" variant="ghost" className="size-8">
						<Minus className="size-3" />
					</Button>
					<span className="w-6 text-center text-sm">{item.quantity}</span>
					<Button size="icon-sm" variant="ghost" className="size-8">
						<Plus className="size-3" />
					</Button>
				</div>
				<p className="font-bold text-primary">
					${(item.price * item.quantity).toFixed(2)}
				</p>
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
		className={`flex justify-between ${bold ? 'text-xl font-bold' : 'text-muted-foreground'}`}
	>
		<span className={bold ? '' : ''}>{label}</span>
		<span className={bold ? 'text-primary' : ''}>{value}</span>
	</div>
);

const PaymentMethods = ({ methods }: { methods: string[] }) => (
	<div className="text-center text-sm text-muted-foreground">
		<p className="mb-2">We accept</p>
		<div className="flex justify-center gap-2">
			{methods.map((method, i) => (
				<Badge key={i} variant="outline" className="text-xs">
					{method}
				</Badge>
			))}
		</div>
	</div>
);

const SummaryCard = ({
	title,
	lines,
	checkoutLabel,
	checkoutHref,
	paymentMethods,
}: {
	title: string;
	lines: { label: string; value: string; bold?: boolean }[];
	checkoutLabel: string;
	checkoutHref: string;
	paymentMethods: string[];
}) => (
	<Card className="max-w-md mx-auto">
		<CardHeader className="text-center">
			<CardTitle>{title}</CardTitle>
		</CardHeader>
		<CardContent className="space-y-3">
			{lines.map((line, i) => (
				<div key={i}>
					{line.bold && <Separator className="my-4" />}
					<SummaryLine {...line} />
				</div>
			))}
		</CardContent>
		<CardFooter className="flex-col gap-4">
			<Button className="w-full gap-2" size="lg" asChild>
				<Link href={checkoutHref}>
					<CreditCard className="size-4" />
					{checkoutLabel}
					<ArrowRight className="size-4" />
				</Link>
			</Button>
			<PaymentMethods methods={paymentMethods} />
		</CardFooter>
	</Card>
);

const ContinueShopping = ({ label, href }: { label: string; href: string }) => (
	<div className="text-center">
		<Button variant="ghost" asChild>
			<Link href={href}>{label}</Link>
		</Button>
	</div>
);

export default function Main() {
	const items: CartItem[] = [
		{
			id: '1',
			image:
				'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=300&h=300&fit=crop',
			name: 'Premium Headphones',
			variant: 'Midnight Black',
			price: 299.99,
			quantity: 1,
		},
		{
			id: '2',
			image:
				'https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=300&h=300&fit=crop',
			name: 'Minimalist Watch',
			variant: 'Silver • Leather',
			price: 199.99,
			quantity: 1,
		},
		{
			id: '3',
			image:
				'https://images.unsplash.com/photo-1560343090-f0409e92791a?w=300&h=300&fit=crop',
			name: 'Designer Scarf',
			variant: 'Blue Pattern',
			price: 89.99,
			quantity: 2,
		},
	];

	const paymentMethods = ['Visa', 'Mastercard', 'PayPal', 'Apple Pay'];

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
			<div className="mx-auto max-w-4xl px-4 py-10 @md:py-16">
				<PageHeader
					title="Your Cart"
					subtitle="Review your items and proceed to checkout when ready"
				/>

				<div className="mt-10 grid grid-cols-2 gap-4 @sm:grid-cols-3 @lg:grid-cols-4">
					{items.map((item) => (
						<ItemCard key={item.id} item={item} />
					))}
				</div>

				<Separator className="my-10" />

				<SummaryCard
					title="Order Summary"
					lines={summaryLines}
					checkoutLabel="Checkout"
					checkoutHref="/checkout"
					paymentMethods={paymentMethods}
				/>

				<div className="mt-6">
					<ContinueShopping label="Continue Shopping" href="/shop" />
				</div>
			</div>
		</section>
	);
}
