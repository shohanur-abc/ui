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
import { Minus, Plus, X, ArrowRight, Sparkles } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';

interface CartItem {
	id: string;
	image: string;
	name: string;
	variant: string;
	price: number;
	quantity: number;
	featured?: boolean;
}

const PageHeader = ({ title }: { title: string }) => (
	<h1 className="text-2xl font-bold @md:text-3xl">{title}</h1>
);

const FeaturedItem = ({ item }: { item: CartItem }) => (
	<Card className="overflow-hidden border-primary/20 bg-gradient-to-br from-primary/5 to-transparent">
		<div className="relative aspect-[4/3] w-full bg-muted">
			<Image src={item.image} alt={item.name} fill className="object-cover" />
			<Badge className="absolute top-3 left-3 gap-1">
				<Sparkles className="size-3" />
				Featured
			</Badge>
			<Button
				size="icon-sm"
				variant="secondary"
				className="absolute top-3 right-3 size-8 rounded-full"
			>
				<X className="size-4" />
			</Button>
		</div>
		<CardContent className="p-5 space-y-4">
			<div>
				<h3 className="font-semibold text-xl">{item.name}</h3>
				<p className="text-muted-foreground">{item.variant}</p>
			</div>
			<div className="flex items-center justify-between">
				<div className="flex items-center rounded-xl border-2">
					<Button size="icon" variant="ghost" className="size-10">
						<Minus className="size-4" />
					</Button>
					<span className="w-8 text-center font-medium text-lg">
						{item.quantity}
					</span>
					<Button size="icon" variant="ghost" className="size-10">
						<Plus className="size-4" />
					</Button>
				</div>
				<p className="text-2xl font-bold text-primary">
					${(item.price * item.quantity).toFixed(2)}
				</p>
			</div>
		</CardContent>
	</Card>
);

const StandardItem = ({ item }: { item: CartItem }) => (
	<Card className="overflow-hidden">
		<CardContent className="p-4 flex gap-4">
			<div className="relative size-20 shrink-0 overflow-hidden rounded-lg bg-muted">
				<Image src={item.image} alt={item.name} fill className="object-cover" />
			</div>
			<div className="flex-1 min-w-0">
				<div className="flex items-start justify-between gap-2">
					<div>
						<h3 className="font-medium line-clamp-1">{item.name}</h3>
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
				<div className="mt-3 flex items-center justify-between">
					<div className="flex items-center rounded border">
						<Button size="icon-sm" variant="ghost" className="size-7">
							<Minus className="size-3" />
						</Button>
						<span className="w-5 text-center text-sm">{item.quantity}</span>
						<Button size="icon-sm" variant="ghost" className="size-7">
							<Plus className="size-3" />
						</Button>
					</div>
					<p className="font-semibold">
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
		className={`flex justify-between ${bold ? 'text-xl font-bold' : 'text-muted-foreground'}`}
	>
		<span>{label}</span>
		<span className={bold ? 'text-primary' : ''}>{value}</span>
	</div>
);

const OrderSummary = ({
	title,
	lines,
	checkoutLabel,
	checkoutHref,
}: {
	title: string;
	lines: { label: string; value: string; bold?: boolean }[];
	checkoutLabel: string;
	checkoutHref: string;
}) => (
	<Card className="sticky top-4">
		<CardHeader>
			<CardTitle>{title}</CardTitle>
		</CardHeader>
		<CardContent className="space-y-3">
			{lines.map((line, i) => (
				<div key={i}>
					{line.bold && <Separator className="my-3" />}
					<SummaryLine {...line} />
				</div>
			))}
		</CardContent>
		<CardFooter>
			<Button className="w-full gap-2" size="lg" asChild>
				<Link href={checkoutHref}>
					{checkoutLabel}
					<ArrowRight className="size-4" />
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
				'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=400&h=300&fit=crop',
			name: 'Studio Monitor Headphones',
			variant: 'Professional Edition',
			price: 349.99,
			quantity: 1,
			featured: true,
		},
		{
			id: '2',
			image:
				'https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=200&h=200&fit=crop',
			name: 'Classic Watch',
			variant: 'Silver',
			price: 199.99,
			quantity: 1,
		},
		{
			id: '3',
			image:
				'https://images.unsplash.com/photo-1560343090-f0409e92791a?w=200&h=200&fit=crop',
			name: 'Silk Scarf',
			variant: 'Navy Blue',
			price: 79.99,
			quantity: 1,
		},
		{
			id: '4',
			image:
				'https://images.unsplash.com/photo-1585386959984-a4155224a1ad?w=200&h=200&fit=crop',
			name: 'Wireless Earbuds',
			variant: 'White',
			price: 149.99,
			quantity: 2,
		},
	];

	const featuredItem = items.find((i) => i.featured);
	const standardItems = items.filter((i) => !i.featured);

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
			<div className="mx-auto max-w-6xl px-4 py-8 @md:py-12">
				<PageHeader title="Your Cart" />

				<div className="mt-8 grid gap-6 @lg:grid-cols-12">
					{/* Left: Featured item (large) */}
					<div className="@lg:col-span-5">
						{featuredItem && <FeaturedItem item={featuredItem} />}
					</div>

					{/* Right: Standard items + Summary */}
					<div className="@lg:col-span-7 space-y-6">
						{/* Standard items grid */}
						<div className="grid gap-4 @sm:grid-cols-2">
							{standardItems.map((item) => (
								<StandardItem key={item.id} item={item} />
							))}
						</div>

						{/* Order Summary */}
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
