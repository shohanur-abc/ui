import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import { Minus, Plus, X, ArrowRight, ShoppingBag } from 'lucide-react';
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
			<div className="size-10 rounded-xl backdrop-blur-xl bg-white/20 border border-white/30 flex items-center justify-center shadow-lg">
				<ShoppingBag className="size-5" />
			</div>
			<h1 className="text-2xl font-bold @md:text-3xl">{title}</h1>
		</div>
		<Badge className="backdrop-blur-xl bg-white/20 border border-white/30 text-foreground px-3 py-1">
			{count} items
		</Badge>
	</div>
);

const GlassCard = ({
	children,
	className = '',
}: {
	children: React.ReactNode;
	className?: string;
}) => (
	<div
		className={`backdrop-blur-xl bg-white/30 dark:bg-white/10 rounded-2xl border border-white/40 shadow-xl ${className}`}
	>
		{children}
	</div>
);

const ItemImage = ({ src, alt }: { src: string; alt: string }) => (
	<div className="relative size-20 shrink-0 overflow-hidden rounded-xl border border-white/30 shadow-lg">
		<Image src={src} alt={alt} fill className="object-cover" />
	</div>
);

const QuantityControl = ({ quantity }: { quantity: number }) => (
	<div className="flex items-center rounded-lg backdrop-blur-md bg-white/30 border border-white/40">
		<Button size="icon-sm" variant="ghost" className="size-8 hover:bg-white/30">
			<Minus className="size-3" />
		</Button>
		<span className="w-6 text-center text-sm font-medium">{quantity}</span>
		<Button size="icon-sm" variant="ghost" className="size-8 hover:bg-white/30">
			<Plus className="size-3" />
		</Button>
	</div>
);

const GlassItem = ({ item }: { item: CartItem }) => (
	<div className="flex gap-4 py-4 group">
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
					className="opacity-0 group-hover:opacity-100 text-muted-foreground hover:text-destructive hover:bg-white/30 shrink-0 transition-opacity"
				>
					<X className="size-4" />
				</Button>
			</div>
			<div className="flex items-center justify-between mt-3">
				<QuantityControl quantity={item.quantity} />
				<p className="font-bold text-lg">
					${(item.price * item.quantity).toFixed(2)}
				</p>
			</div>
		</div>
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
		<span className={bold ? 'text-foreground' : ''}>{label}</span>
		<span>{value}</span>
	</div>
);

const GlassButton = ({
	children,
	className = '',
	href,
}: {
	children: React.ReactNode;
	className?: string;
	href: string;
}) => (
	<Button
		className={`backdrop-blur-md bg-white/40 hover:bg-white/60 text-foreground border border-white/50 shadow-lg ${className}`}
		size="lg"
		asChild
	>
		<Link href={href}>{children}</Link>
	</Button>
);

export default function Main() {
	const items: CartItem[] = [
		{
			id: '1',
			image:
				'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=200&h=200&fit=crop',
			name: 'Studio Headphones Pro',
			variant: 'Black • Wireless',
			price: 299.99,
			quantity: 1,
		},
		{
			id: '2',
			image:
				'https://images.unsplash.com/photo-1585386959984-a4155224a1ad?w=200&h=200&fit=crop',
			name: 'Wireless Earbuds',
			variant: 'White • ANC',
			price: 179.99,
			quantity: 1,
		},
		{
			id: '3',
			image:
				'https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=200&h=200&fit=crop',
			name: 'Running Shoes',
			variant: 'Red • US 10',
			price: 149.99,
			quantity: 1,
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
		<section className="@container relative min-h-screen">
			{/* Background gradient for glass effect */}
			<div className="absolute inset-0 -z-10 bg-gradient-to-br from-purple-400/30 via-pink-300/20 to-blue-400/30" />
			<div className="absolute inset-0 -z-10 bg-[url('data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSI2MCIgaGVpZ2h0PSI2MCI+CjxjaXJjbGUgY3g9IjMwIiBjeT0iMzAiIHI9IjEuNSIgZmlsbD0icmdiYSgyNTUsMjU1LDI1NSwwLjEpIi8+Cjwvc3ZnPg==')] opacity-50" />

			<div className="mx-auto max-w-5xl px-4 py-8 @md:py-12">
				<PageHeader title="Your Cart" count={items.length} />

				<div className="mt-8 grid gap-8 @lg:grid-cols-3">
					<div className="@lg:col-span-2">
						<GlassCard className="p-6">
							<h2 className="font-semibold text-lg mb-2">Cart Items</h2>
							<Separator className="bg-white/30 mb-2" />
							<div className="divide-y divide-white/20">
								{items.map((item) => (
									<GlassItem key={item.id} item={item} />
								))}
							</div>
						</GlassCard>
					</div>

					<div>
						<GlassCard className="sticky top-4 p-6">
							<h2 className="font-semibold text-lg mb-4">Order Summary</h2>

							<div className="space-y-3">
								{summaryLines.map((line, i) => (
									<div key={i}>
										{line.bold && <Separator className="my-3 bg-white/30" />}
										<SummaryLine {...line} />
									</div>
								))}
							</div>

							<div className="mt-6">
								<GlassButton href="/checkout" className="w-full gap-2">
									Checkout
									<ArrowRight className="size-4" />
								</GlassButton>
							</div>

							<p className="text-xs text-muted-foreground text-center mt-4">
								Secure checkout powered by Stripe
							</p>
						</GlassCard>
					</div>
				</div>
			</div>
		</section>
	);
}
