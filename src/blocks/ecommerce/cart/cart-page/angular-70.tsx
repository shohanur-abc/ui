import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import { Minus, Plus, X, ArrowRight, ShoppingBag, Hexagon } from 'lucide-react';
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
			<div className="relative size-12">
				<Hexagon className="size-12 text-primary fill-primary/10" />
				<ShoppingBag className="size-5 absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-primary" />
			</div>
			<h1 className="text-2xl font-bold @md:text-3xl tracking-tight">{title}</h1>
		</div>
		<Badge className="bg-primary clip-path-angular px-4 py-1.5">{count} items</Badge>
	</div>
);

const AngularCard = ({
	children,
	className = '',
}: {
	children: React.ReactNode;
	className?: string;
}) => (
	<div
		className={`bg-background border relative ${className}`}
		style={{
			clipPath: 'polygon(0 0, calc(100% - 20px) 0, 100% 20px, 100% 100%, 20px 100%, 0 calc(100% - 20px))',
		}}
	>
		{children}
	</div>
);

const ItemImage = ({ src, alt }: { src: string; alt: string }) => (
	<div
		className="relative size-20 shrink-0 overflow-hidden bg-muted"
		style={{
			clipPath: 'polygon(0 0, calc(100% - 10px) 0, 100% 10px, 100% 100%, 10px 100%, 0 calc(100% - 10px))',
		}}
	>
		<Image src={src} alt={alt} fill className="object-cover" />
	</div>
);

const QuantityControl = ({ quantity }: { quantity: number }) => (
	<div className="flex items-center bg-muted" style={{ clipPath: 'polygon(8px 0, 100% 0, calc(100% - 8px) 100%, 0 100%)' }}>
		<Button size="icon-sm" variant="ghost" className="size-8 rounded-none hover:bg-muted-foreground/20">
			<Minus className="size-3" />
		</Button>
		<span className="w-6 text-center text-sm font-medium">{quantity}</span>
		<Button size="icon-sm" variant="ghost" className="size-8 rounded-none hover:bg-muted-foreground/20">
			<Plus className="size-3" />
		</Button>
	</div>
);

const AngularItem = ({ item }: { item: CartItem }) => (
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
					className="opacity-0 group-hover:opacity-100 size-7 rounded-none shrink-0 transition-opacity hover:bg-destructive/10 hover:text-destructive"
				>
					<X className="size-4" />
				</Button>
			</div>
			<div className="flex items-center justify-between mt-3">
				<QuantityControl quantity={item.quantity} />
				<p className="font-bold text-lg">${(item.price * item.quantity).toFixed(2)}</p>
			</div>
		</div>
	</div>
);

const TechBanner = () => (
	<div
		className="bg-gradient-to-r from-primary to-primary/80 text-primary-foreground p-4 flex items-center justify-between"
		style={{
			clipPath: 'polygon(20px 0, 100% 0, calc(100% - 20px) 100%, 0 100%)',
		}}
	>
		<div className="flex items-center gap-3 ml-4">
			<Hexagon className="size-6" />
			<span className="font-semibold">Premium Tech Rewards Active</span>
		</div>
		<Badge className="bg-white/20 text-white border-0 mr-4">+50 Points</Badge>
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
		<span className={bold ? 'text-foreground' : ''}>{label}</span>
		<span>{value}</span>
	</div>
);

const AngularButton = ({
	children,
	className = '',
	href,
	variant = 'primary',
}: {
	children: React.ReactNode;
	className?: string;
	href: string;
	variant?: 'primary' | 'outline';
}) => (
	<Button
		className={`gap-2 rounded-none ${className}`}
		style={{
			clipPath: 'polygon(10px 0, 100% 0, calc(100% - 10px) 100%, 0 100%)',
		}}
		variant={variant === 'outline' ? 'outline' : 'default'}
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
				<PageHeader title="Your Cart" count={items.length} />

				<div className="mt-6">
					<TechBanner />
				</div>

				<div className="mt-8 grid gap-8 @lg:grid-cols-3">
					<div className="@lg:col-span-2">
						<AngularCard className="p-6">
							<h2 className="font-semibold text-lg mb-4 flex items-center gap-2">
								<Hexagon className="size-4 text-primary" />
								Cart Items
							</h2>
							<Separator className="mb-2" />
							<div className="divide-y">
								{items.map((item) => (
									<AngularItem key={item.id} item={item} />
								))}
							</div>
						</AngularCard>
					</div>

					<div>
						<AngularCard className="sticky top-4 p-6">
							<h2 className="font-semibold text-lg mb-4 flex items-center gap-2">
								<Hexagon className="size-4 text-primary" />
								Summary
							</h2>
							<Separator className="mb-4" />

							<div className="space-y-3">
								{summaryLines.map((line, i) => (
									<div key={i}>
										{line.bold && <Separator className="my-3" />}
										<SummaryLine {...line} />
									</div>
								))}
							</div>

							<div className="mt-6 space-y-3">
								<AngularButton href="/checkout" className="w-full">
									Checkout
									<ArrowRight className="size-4" />
								</AngularButton>
								<AngularButton href="/shop" variant="outline" className="w-full">
									Continue Shopping
								</AngularButton>
							</div>
						</AngularCard>
					</div>
				</div>
			</div>
		</section>
	);
}
