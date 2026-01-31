import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import { Minus, Plus, X, ArrowRight, Sparkles, ShoppingBag } from 'lucide-react';
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
	<div className="relative">
		<div className="absolute inset-0 bg-gradient-to-r from-purple-500/20 via-pink-500/20 to-orange-500/20 blur-3xl -z-10" />
		<div className="flex items-center justify-between">
			<div className="flex items-center gap-3">
				<div className="size-10 rounded-xl bg-gradient-to-br from-purple-500 to-pink-500 flex items-center justify-center">
					<ShoppingBag className="size-5 text-white" />
				</div>
				<h1 className="text-2xl font-bold @md:text-3xl bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
					{title}
				</h1>
			</div>
			<Badge className="bg-gradient-to-r from-purple-500 to-pink-500 text-white border-0 px-3 py-1">
				{count} items
			</Badge>
		</div>
	</div>
);

const GradientBanner = () => (
	<div className="relative overflow-hidden rounded-2xl bg-gradient-to-r from-purple-600 via-pink-500 to-orange-400 p-6">
		<div className="absolute top-0 right-0 -mt-4 -mr-4 size-24 bg-white/20 rounded-full blur-2xl" />
		<div className="absolute bottom-0 left-0 -mb-4 -ml-4 size-32 bg-white/10 rounded-full blur-2xl" />
		<div className="relative flex items-center gap-3 text-white">
			<Sparkles className="size-8" />
			<div>
				<h3 className="font-bold text-lg">Summer Sale Active!</h3>
				<p className="text-white/80 text-sm">Extra 15% off on checkout</p>
			</div>
		</div>
	</div>
);

const ItemImage = ({ src, alt }: { src: string; alt: string }) => (
	<div className="relative size-24 shrink-0 overflow-hidden rounded-2xl bg-gradient-to-br from-purple-100 to-pink-100">
		<Image src={src} alt={alt} fill className="object-cover" />
	</div>
);

const QuantityControl = ({ quantity }: { quantity: number }) => (
	<div className="flex items-center rounded-xl bg-gradient-to-r from-purple-100 to-pink-100">
		<Button size="icon-sm" variant="ghost" className="size-8 text-purple-600 hover:bg-purple-200/50 rounded-l-xl">
			<Minus className="size-3" />
		</Button>
		<span className="w-6 text-center text-sm font-semibold text-purple-700">{quantity}</span>
		<Button size="icon-sm" variant="ghost" className="size-8 text-purple-600 hover:bg-purple-200/50 rounded-r-xl">
			<Plus className="size-3" />
		</Button>
	</div>
);

const GradientItem = ({ item }: { item: CartItem }) => (
	<div className="group relative p-4 rounded-2xl hover:bg-gradient-to-r hover:from-purple-50 hover:to-pink-50 transition-all duration-300">
		<div className="flex gap-4">
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
						className="opacity-0 group-hover:opacity-100 text-muted-foreground hover:text-destructive shrink-0 transition-opacity"
					>
						<X className="size-4" />
					</Button>
				</div>
				<div className="flex items-center justify-between mt-4">
					<QuantityControl quantity={item.quantity} />
					<p className="font-bold text-xl bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
						${(item.price * item.quantity).toFixed(2)}
					</p>
				</div>
			</div>
		</div>
	</div>
);

const GradientCard = ({
	children,
	className = '',
}: {
	children: React.ReactNode;
	className?: string;
}) => (
	<Card className={`relative overflow-hidden border-0 shadow-xl ${className}`}>
		<div className="absolute inset-0 bg-gradient-to-br from-purple-500/5 via-transparent to-pink-500/5" />
		<div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-purple-500/10 to-pink-500/10 rounded-full -mt-16 -mr-16 blur-2xl" />
		<div className="relative">{children}</div>
	</Card>
);

const SummaryLine = ({
	label,
	value,
	bold,
	discount,
}: {
	label: string;
	value: string;
	bold?: boolean;
	discount?: boolean;
}) => (
	<div className={`flex justify-between ${bold ? 'text-xl font-bold' : 'text-muted-foreground'}`}>
		<span className={bold ? 'text-foreground' : ''}>{label}</span>
		<span className={`${bold ? 'bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent' : ''} ${discount ? 'text-green-600' : ''}`}>
			{value}
		</span>
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
		},
		{
			id: '2',
			image: 'https://images.unsplash.com/photo-1585386959984-a4155224a1ad?w=200&h=200&fit=crop',
			name: 'Wireless Earbuds',
			variant: 'White • ANC',
			price: 179.99,
			quantity: 1,
		},
		{
			id: '3',
			image: 'https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=200&h=200&fit=crop',
			name: 'Running Shoes',
			variant: 'Red • US 10',
			price: 149.99,
			quantity: 1,
		},
	];

	const subtotal = items.reduce((sum, i) => sum + i.price * i.quantity, 0);
	const discount = subtotal * 0.15;
	const tax = (subtotal - discount) * 0.08;
	const total = subtotal - discount + tax;

	const summaryLines = [
		{ label: 'Subtotal', value: `$${subtotal.toFixed(2)}` },
		{ label: 'Summer Sale (-15%)', value: `-$${discount.toFixed(2)}`, discount: true },
		{ label: 'Shipping', value: 'Free' },
		{ label: 'Tax', value: `$${tax.toFixed(2)}` },
		{ label: 'Total', value: `$${total.toFixed(2)}`, bold: true },
	];

	return (
		<section className="@container">
			<div className="mx-auto max-w-5xl px-4 py-8 @md:py-12">
				<PageHeader title="Your Cart" count={items.length} />

				<div className="mt-6">
					<GradientBanner />
				</div>

				<div className="mt-8 grid gap-8 @lg:grid-cols-3">
					<div className="@lg:col-span-2">
						<GradientCard>
							<CardHeader className="border-b">
								<CardTitle className="flex items-center gap-2">
									<span className="size-2 rounded-full bg-gradient-to-r from-purple-500 to-pink-500" />
									Cart Items
								</CardTitle>
							</CardHeader>
							<CardContent className="divide-y p-2">
								{items.map((item) => (
									<GradientItem key={item.id} item={item} />
								))}
							</CardContent>
						</GradientCard>
					</div>

					<div>
						<GradientCard className="sticky top-4">
							<CardHeader className="border-b">
								<CardTitle>Order Summary</CardTitle>
							</CardHeader>
							<CardContent className="space-y-3 pt-6">
								{summaryLines.map((line, i) => (
									<div key={i}>
										{line.bold && <Separator className="my-3" />}
										<SummaryLine {...line} />
									</div>
								))}
							</CardContent>
							<CardFooter>
								<Button
									className="w-full gap-2 bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 border-0 shadow-lg shadow-purple-500/25"
									size="lg"
									asChild
								>
									<Link href="/checkout">
										<Sparkles className="size-4" />
										Checkout
										<ArrowRight className="size-4" />
									</Link>
								</Button>
							</CardFooter>
						</GradientCard>
					</div>
				</div>
			</div>
		</section>
	);
}
