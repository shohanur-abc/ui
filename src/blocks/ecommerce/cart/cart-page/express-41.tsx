import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import { Minus, Plus, X, Zap, CreditCard, ArrowRight } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';

interface CartItem {
	id: string;
	image: string;
	name: string;
	price: number;
	quantity: number;
}

const ExpressHeader = ({
	title,
	subtitle,
}: {
	title: string;
	subtitle: string;
}) => (
	<div className="flex items-center gap-3">
		<div className="rounded-full bg-primary/10 p-2">
			<Zap className="size-5 text-primary" />
		</div>
		<div>
			<h1 className="text-xl font-bold @md:text-2xl">{title}</h1>
			<p className="text-sm text-muted-foreground">{subtitle}</p>
		</div>
	</div>
);

const ItemThumb = ({ src, alt }: { src: string; alt: string }) => (
	<div className="relative size-14 shrink-0 overflow-hidden rounded-lg bg-muted">
		<Image src={src} alt={alt} fill className="object-cover" />
	</div>
);

const ItemCompact = ({ item }: { item: CartItem }) => (
	<div className="flex items-center gap-3 py-2">
		<ItemThumb src={item.image} alt={item.name} />
		<div className="flex-1 min-w-0">
			<p className="font-medium text-sm line-clamp-1">{item.name}</p>
			<div className="flex items-center gap-2 mt-1">
				<div className="flex items-center rounded border text-xs">
					<Button size="icon-sm" variant="ghost" className="size-6">
						<Minus className="size-2" />
					</Button>
					<span className="w-4 text-center">{item.quantity}</span>
					<Button size="icon-sm" variant="ghost" className="size-6">
						<Plus className="size-2" />
					</Button>
				</div>
				<Button
					size="icon-sm"
					variant="ghost"
					className="size-6 text-muted-foreground hover:text-destructive"
				>
					<X className="size-3" />
				</Button>
			</div>
		</div>
		<p className="font-semibold">${(item.price * item.quantity).toFixed(2)}</p>
	</div>
);

const QuickTotal = ({ label, value }: { label: string; value: string }) => (
	<div className="flex justify-between items-center text-lg font-bold py-2">
		<span>{label}</span>
		<span className="text-primary">{value}</span>
	</div>
);

const PaymentOption = ({
	icon,
	label,
	badge,
}: {
	icon: React.ReactNode;
	label: string;
	badge?: string;
}) => (
	<Button variant="outline" className="flex-1 h-auto py-3 gap-2">
		{icon}
		<span>{label}</span>
		{badge && (
			<Badge variant="secondary" className="ml-1 text-xs">
				{badge}
			</Badge>
		)}
	</Button>
);

export default function Main() {
	const items: CartItem[] = [
		{
			id: '1',
			image:
				'https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=100&h=100&fit=crop',
			name: 'Running Shoes Pro',
			price: 149.99,
			quantity: 1,
		},
		{
			id: '2',
			image:
				'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=100&h=100&fit=crop',
			name: 'Studio Headphones',
			price: 299.99,
			quantity: 1,
		},
	];

	const subtotal = items.reduce((sum, i) => sum + i.price * i.quantity, 0);
	const tax = subtotal * 0.08;
	const total = subtotal + tax;

	return (
		<section className="@container">
			<div className="mx-auto max-w-md px-4 py-6">
				<ExpressHeader
					title="Express Checkout"
					subtitle="Quick & easy payment"
				/>

				<Card className="mt-6">
					<CardContent className="p-4 divide-y">
						{items.map((item) => (
							<ItemCompact key={item.id} item={item} />
						))}
					</CardContent>
				</Card>

				<div className="mt-4 space-y-2 text-sm text-muted-foreground">
					<div className="flex justify-between">
						<span>Subtotal</span>
						<span>${subtotal.toFixed(2)}</span>
					</div>
					<div className="flex justify-between">
						<span>Shipping</span>
						<span>Free</span>
					</div>
					<div className="flex justify-between">
						<span>Tax</span>
						<span>${tax.toFixed(2)}</span>
					</div>
				</div>

				<Separator className="my-4" />

				<QuickTotal label="Total" value={`$${total.toFixed(2)}`} />

				<div className="mt-6 space-y-3">
					<p className="text-sm font-medium text-center text-muted-foreground">
						Express payment
					</p>
					<div className="flex gap-2">
						<PaymentOption
							icon={<CreditCard className="size-4" />}
							label="Apple Pay"
						/>
						<PaymentOption
							icon={<CreditCard className="size-4" />}
							label="Google Pay"
						/>
					</div>

					<div className="relative">
						<Separator className="my-4" />
						<span className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-background px-2 text-xs text-muted-foreground">
							or
						</span>
					</div>

					<Button className="w-full gap-2" size="lg" asChild>
						<Link href="/checkout">
							Standard Checkout
							<ArrowRight className="size-4" />
						</Link>
					</Button>
				</div>
			</div>
		</section>
	);
}
