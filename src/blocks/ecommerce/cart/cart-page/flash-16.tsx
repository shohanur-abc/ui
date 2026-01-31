import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import { Minus, Plus, Trash2, Timer, Flame, Zap, ArrowRight } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';

interface CartItem {
	id: string;
	image: string;
	name: string;
	variant: string;
	price: number;
	originalPrice?: number;
	quantity: number;
	expiresIn?: number;
}

const PageTitle = ({ text, subtitle }: { text: string; subtitle: string }) => (
	<div>
		<h1 className="text-2xl font-bold @md:text-3xl flex items-center gap-2">
			<Flame className="size-7 text-orange-500" />
			{text}
		</h1>
		<p className="mt-1 text-muted-foreground">{subtitle}</p>
	</div>
);

const CountdownTimer = ({ minutes }: { minutes: number }) => {
	const hrs = Math.floor(minutes / 60);
	const mins = minutes % 60;

	return (
		<div className="flex items-center gap-2 rounded-full bg-orange-500/10 px-4 py-2 text-orange-500">
			<Timer className="size-4" />
			<span className="font-mono font-bold">
				{String(hrs).padStart(2, '0')}:{String(mins).padStart(2, '0')}:00
			</span>
			<span className="text-sm">left</span>
		</div>
	);
};

const ProductImage = ({ src, alt, expires }: { src: string; alt: string; expires?: boolean }) => (
	<div className="relative aspect-square w-24 shrink-0 overflow-hidden rounded-xl bg-muted @sm:w-28">
		<Image src={src} alt={alt} fill className="object-cover" />
		{expires && (
			<div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
		)}
	</div>
);

const ItemExpiry = ({ minutes }: { minutes: number }) => (
	<div className="absolute bottom-1 left-1 right-1 flex items-center justify-center gap-1 rounded bg-red-500 px-2 py-0.5 text-xs font-medium text-white">
		<Timer className="size-3" />
		{minutes} min
	</div>
);

const ProductDetails = ({
	name,
	variant,
	price,
	originalPrice,
}: {
	name: string;
	variant: string;
	price: number;
	originalPrice?: number;
}) => (
	<div className="min-w-0 flex-1">
		<h3 className="font-semibold line-clamp-1">{name}</h3>
		<p className="text-sm text-muted-foreground">{variant}</p>
		<div className="mt-2 flex items-center gap-2">
			<span className="text-lg font-bold text-primary">${price.toFixed(2)}</span>
			{originalPrice && (
				<>
					<span className="text-sm text-muted-foreground line-through">${originalPrice.toFixed(2)}</span>
					<Badge variant="destructive" className="text-xs">
						-{Math.round(((originalPrice - price) / originalPrice) * 100)}%
					</Badge>
				</>
			)}
		</div>
	</div>
);

const QuantitySelector = ({ quantity }: { quantity: number }) => (
	<div className="flex items-center rounded-lg border bg-background">
		<Button size="icon-sm" variant="ghost" className="size-8">
			<Minus className="size-3" />
		</Button>
		<span className="w-8 text-center font-medium">{quantity}</span>
		<Button size="icon-sm" variant="ghost" className="size-8">
			<Plus className="size-3" />
		</Button>
	</div>
);

const SubtotalDisplay = ({ price, quantity }: { price: number; quantity: number }) => (
	<p className="text-lg font-bold">${(price * quantity).toFixed(2)}</p>
);

const RemoveBtn = () => (
	<Button size="icon-sm" variant="ghost" className="text-muted-foreground hover:text-destructive">
		<Trash2 className="size-4" />
	</Button>
);

const CartItemRow = ({ item }: { item: CartItem }) => (
	<Card className={`transition-all ${item.expiresIn ? 'border-orange-500/50 bg-orange-500/5' : ''}`}>
		<CardContent className="flex gap-4 p-4 relative">
			<div className="relative">
				<ProductImage src={item.image} alt={item.name} expires={!!item.expiresIn} />
				{item.expiresIn && <ItemExpiry minutes={item.expiresIn} />}
			</div>
			<div className="flex min-w-0 flex-1 flex-col gap-3">
				<div className="flex items-start justify-between gap-2">
					<ProductDetails
						name={item.name}
						variant={item.variant}
						price={item.price}
						originalPrice={item.originalPrice}
					/>
					<RemoveBtn />
				</div>
				<div className="flex items-center justify-between mt-auto">
					<QuantitySelector quantity={item.quantity} />
					<SubtotalDisplay price={item.price} quantity={item.quantity} />
				</div>
			</div>
		</CardContent>
	</Card>
);

const UrgencyBanner = ({ icon: Icon, text }: { icon: React.ComponentType<{ className?: string }>; text: string }) => (
	<div className="flex items-center gap-2 rounded-lg bg-gradient-to-r from-orange-500 to-red-500 p-4 text-white">
		<Icon className="size-5 shrink-0" />
		<p className="text-sm font-medium">{text}</p>
	</div>
);

const PriceLine = ({
	label,
	value,
	variant,
}: {
	label: string;
	value: string;
	variant?: 'default' | 'savings' | 'total';
}) => (
	<div className={`flex justify-between ${variant === 'total' ? 'text-xl font-bold' : ''}`}>
		<span className={variant === 'total' ? '' : 'text-muted-foreground'}>{label}</span>
		<span
			className={
				variant === 'total'
					? 'text-primary'
					: variant === 'savings'
						? 'text-green-500 font-medium'
						: ''
			}
		>
			{value}
		</span>
	</div>
);

const SummaryCard = ({
	title,
	lines,
	checkoutLabel,
	checkoutHref,
	countdown,
}: {
	title: string;
	lines: { label: string; value: string; variant?: 'default' | 'savings' | 'total' }[];
	checkoutLabel: string;
	checkoutHref: string;
	countdown: number;
}) => (
	<Card className="sticky top-4">
		<CardHeader className="pb-4">
			<div className="flex items-center justify-between">
				<CardTitle>{title}</CardTitle>
				<CountdownTimer minutes={countdown} />
			</div>
		</CardHeader>
		<CardContent className="space-y-3">
			{lines.map((line, i) => (
				<div key={i}>
					{line.variant === 'total' && <Separator className="my-3" />}
					<PriceLine {...line} />
				</div>
			))}
		</CardContent>
		<CardFooter className="flex-col gap-4">
			<Button className="w-full gap-2 bg-gradient-to-r from-orange-500 to-red-500 hover:from-orange-600 hover:to-red-600" size="lg" asChild>
				<Link href={checkoutHref}>
					<Zap className="size-4" />
					{checkoutLabel}
				</Link>
			</Button>
			<UrgencyBanner
				icon={Flame}
				text="Prices locked for your session only. Complete checkout to secure your savings!"
			/>
		</CardFooter>
	</Card>
);

export default function Main() {
	const items: CartItem[] = [
		{
			id: '1',
			image: 'https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=300&h=300&fit=crop',
			name: 'Performance Running Shoes Pro',
			variant: 'Red/Black • Size 10',
			price: 119.99,
			originalPrice: 179.99,
			quantity: 1,
			expiresIn: 15,
		},
		{
			id: '2',
			image: 'https://images.unsplash.com/photo-1585386959984-a4155224a1ad?w=300&h=300&fit=crop',
			name: 'Premium Wireless Headphones',
			variant: 'Matte Black',
			price: 249.99,
			originalPrice: 349.99,
			quantity: 1,
		},
		{
			id: '3',
			image: 'https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=300&h=300&fit=crop',
			name: 'Classic Minimalist Watch',
			variant: 'Silver • Leather Band',
			price: 189.99,
			quantity: 1,
			expiresIn: 8,
		},
	];

	const subtotal = items.reduce((sum, i) => sum + (i.originalPrice || i.price) * i.quantity, 0);
	const discountedTotal = items.reduce((sum, i) => sum + i.price * i.quantity, 0);
	const savings = subtotal - discountedTotal;

	const summaryLines = [
		{ label: 'Original Price', value: `$${subtotal.toFixed(2)}` },
		{ label: 'Flash Savings', value: `-$${savings.toFixed(2)}`, variant: 'savings' as const },
		{ label: 'Shipping', value: 'Free' },
		{ label: 'Tax', value: `$${(discountedTotal * 0.08).toFixed(2)}` },
		{ label: 'Total', value: `$${(discountedTotal * 1.08).toFixed(2)}`, variant: 'total' as const },
	];

	return (
		<section className="@container">
			<div className="mx-auto max-w-6xl px-4 py-8 @md:py-12 @xl:py-16">
				<PageTitle
					text="Flash Sale Cart"
					subtitle="Complete your order before prices expire"
				/>

				<div className="mt-8 grid gap-8 @xl:grid-cols-5">
					<div className="space-y-4 @xl:col-span-3">
						{items.map((item) => (
							<CartItemRow key={item.id} item={item} />
						))}
					</div>

					<div className="@xl:col-span-2">
						<SummaryCard
							title="Order Summary"
							lines={summaryLines}
							checkoutLabel="Secure This Deal"
							checkoutHref="/checkout"
							countdown={45}
						/>
					</div>
				</div>
			</div>
		</section>
	);
}
