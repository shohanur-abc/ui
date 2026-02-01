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
	Sparkles,
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
			<div className="relative">
				<Sparkles className="size-6 text-primary animate-pulse" />
			</div>
			<h1 className="text-2xl font-bold @md:text-3xl">{title}</h1>
		</div>
		<Badge
			variant="secondary"
			className="px-3 py-1 animate-in slide-in-from-right duration-300"
		>
			{count} items
		</Badge>
	</div>
);

const ItemImage = ({ src, alt }: { src: string; alt: string }) => (
	<div className="relative size-20 shrink-0 overflow-hidden rounded-lg bg-muted transition-transform duration-300 hover:scale-105">
		<Image src={src} alt={alt} fill className="object-cover" />
	</div>
);

const QuantityControl = ({ quantity }: { quantity: number }) => (
	<div className="flex items-center rounded-lg border transition-all duration-200 hover:border-primary/50 hover:shadow-sm">
		<Button
			size="icon-sm"
			variant="ghost"
			className="size-8 transition-colors duration-200"
		>
			<Minus className="size-3" />
		</Button>
		<span className="w-6 text-center text-sm font-medium">{quantity}</span>
		<Button
			size="icon-sm"
			variant="ghost"
			className="size-8 transition-colors duration-200"
		>
			<Plus className="size-3" />
		</Button>
	</div>
);

const AnimatedItem = ({ item, index }: { item: CartItem; index: number }) => (
	<div
		className="flex gap-4 py-4 animate-in fade-in slide-in-from-left duration-500"
		style={{ animationDelay: `${index * 100}ms` }}
	>
		<ItemImage src={item.image} alt={item.name} />
		<div className="flex-1 min-w-0">
			<div className="flex items-start justify-between gap-2">
				<div>
					<h3 className="font-semibold line-clamp-1 transition-colors duration-200 hover:text-primary">
						{item.name}
					</h3>
					<p className="text-sm text-muted-foreground">{item.variant}</p>
				</div>
				<Button
					size="icon-sm"
					variant="ghost"
					className="text-muted-foreground hover:text-destructive hover:rotate-90 transition-all duration-300"
				>
					<X className="size-4" />
				</Button>
			</div>
			<div className="flex items-center justify-between mt-3">
				<QuantityControl quantity={item.quantity} />
				<p className="font-bold text-primary text-lg transition-all duration-200 hover:scale-110">
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
	delay,
}: {
	label: string;
	value: string;
	bold?: boolean;
	delay?: number;
}) => (
	<div
		className={`flex justify-between animate-in fade-in slide-in-from-right duration-500 ${
			bold ? 'text-xl font-bold' : 'text-muted-foreground'
		}`}
		style={{ animationDelay: `${delay || 0}ms` }}
	>
		<span>{label}</span>
		<span className={bold ? 'text-primary' : ''}>{value}</span>
	</div>
);

const PulseButton = ({
	children,
	href,
}: {
	children: React.ReactNode;
	href: string;
}) => (
	<Button
		className="w-full gap-2 relative overflow-hidden group"
		size="lg"
		asChild
	>
		<Link href={href}>
			<span className="absolute inset-0 bg-primary/20 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-700" />
			{children}
		</Link>
	</Button>
);

export default function Main() {
	const items: CartItem[] = [
		{
			id: '1',
			image:
				'https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=200&h=200&fit=crop',
			name: 'Running Shoes Pro',
			variant: 'Red • US 10',
			price: 149.99,
			quantity: 1,
		},
		{
			id: '2',
			image:
				'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=200&h=200&fit=crop',
			name: 'Studio Headphones',
			variant: 'Black • Wireless',
			price: 299.99,
			quantity: 1,
		},
		{
			id: '3',
			image:
				'https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=200&h=200&fit=crop',
			name: 'Classic Watch',
			variant: 'Silver • Leather',
			price: 249.99,
			quantity: 1,
		},
	];

	const subtotal = items.reduce((sum, i) => sum + i.price * i.quantity, 0);
	const tax = subtotal * 0.08;
	const total = subtotal + tax;

	const summaryLines = [
		{ label: 'Subtotal', value: `$${subtotal.toFixed(2)}`, delay: 100 },
		{ label: 'Shipping', value: 'Free', delay: 200 },
		{ label: 'Tax', value: `$${tax.toFixed(2)}`, delay: 300 },
		{ label: 'Total', value: `$${total.toFixed(2)}`, bold: true, delay: 400 },
	];

	return (
		<section className="@container">
			<div className="mx-auto max-w-4xl px-4 py-8 @md:py-12">
				<PageHeader title="Your Cart" count={items.length} />

				<div className="mt-8 grid gap-8 @lg:grid-cols-3">
					<div className="@lg:col-span-2">
						<Card className="overflow-hidden animate-in fade-in zoom-in-95 duration-500">
							<CardHeader>
								<CardTitle className="flex items-center gap-2">
									<ShoppingCart className="size-5 animate-bounce" />
									Cart Items
								</CardTitle>
							</CardHeader>
							<CardContent className="divide-y">
								{items.map((item, i) => (
									<AnimatedItem key={item.id} item={item} index={i} />
								))}
							</CardContent>
						</Card>
					</div>

					<div>
						<Card className="sticky top-4 animate-in fade-in slide-in-from-right duration-700">
							<CardHeader>
								<CardTitle>Order Summary</CardTitle>
							</CardHeader>
							<CardContent className="space-y-3">
								{summaryLines.map((line, i) => (
									<div key={i}>
										{line.bold && <Separator className="my-3" />}
										<SummaryLine {...line} />
									</div>
								))}
							</CardContent>
							<CardFooter className="animate-in fade-in duration-500 delay-500">
								<PulseButton href="/checkout">
									Checkout
									<ArrowRight className="size-4 group-hover:translate-x-1 transition-transform" />
								</PulseButton>
							</CardFooter>
						</Card>
					</div>
				</div>
			</div>
		</section>
	);
}
