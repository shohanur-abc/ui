import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Separator } from '@/components/ui/separator';
import { Minus, Plus, Heart, X, ChevronRight, Gift, Percent } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';

interface CartItem {
	id: string;
	image: string;
	name: string;
	brand: string;
	price: number;
	quantity: number;
	isSaved: boolean;
}

interface PromoOffer {
	icon: React.ComponentType<{ className?: string }>;
	text: string;
	code?: string;
}

const PageTitle = ({ title, subtitle }: { title: string; subtitle: string }) => (
	<div className="text-center">
		<h1 className="text-3xl font-bold @md:text-4xl">{title}</h1>
		<p className="mt-2 text-muted-foreground">{subtitle}</p>
	</div>
);

const ItemImage = ({ src, alt }: { src: string; alt: string }) => (
	<div className="relative aspect-square overflow-hidden rounded-xl bg-muted">
		<Image src={src} alt={alt} fill className="object-cover transition-transform hover:scale-105" />
	</div>
);

const ItemBrand = ({ name }: { name: string }) => (
	<p className="text-xs font-medium uppercase tracking-wider text-primary">{name}</p>
);

const ItemName = ({ name }: { name: string }) => (
	<h3 className="mt-1 line-clamp-2 font-medium leading-tight">{name}</h3>
);

const ItemPrice = ({ price }: { price: number }) => (
	<p className="mt-2 text-lg font-bold">${price.toFixed(2)}</p>
);

const QuantityPicker = ({ quantity }: { quantity: number }) => (
	<div className="mt-4 flex items-center justify-between">
		<div className="flex items-center rounded-lg border">
			<Button size="icon-sm" variant="ghost" className="rounded-r-none">
				<Minus className="size-3" />
			</Button>
			<span className="w-10 text-center text-sm font-medium">{quantity}</span>
			<Button size="icon-sm" variant="ghost" className="rounded-l-none">
				<Plus className="size-3" />
			</Button>
		</div>
		<p className="font-medium text-muted-foreground">
			${(quantity * 99.99).toFixed(2)}
		</p>
	</div>
);

const ItemActions = ({ isSaved }: { isSaved: boolean }) => (
	<div className="mt-4 flex gap-2">
		<Button variant="ghost" size="sm" className="flex-1 gap-1 text-xs">
			<Heart className={`size-3 ${isSaved ? 'fill-red-500 text-red-500' : ''}`} />
			{isSaved ? 'Saved' : 'Save'}
		</Button>
		<Button variant="ghost" size="sm" className="flex-1 gap-1 text-xs text-destructive hover:text-destructive">
			<X className="size-3" />
			Remove
		</Button>
	</div>
);

const CartCard = ({ item }: { item: CartItem }) => (
	<Card className="overflow-hidden">
		<CardContent className="p-4">
			<ItemImage src={item.image} alt={item.name} />
			<div className="mt-4">
				<ItemBrand name={item.brand} />
				<ItemName name={item.name} />
				<ItemPrice price={item.price} />
				<QuantityPicker quantity={item.quantity} />
				<Separator className="my-4" />
				<ItemActions isSaved={item.isSaved} />
			</div>
		</CardContent>
	</Card>
);

const PromoCard = ({ icon: Icon, text, code }: PromoOffer) => (
	<div className="flex items-center gap-3 rounded-lg border border-dashed border-primary/50 bg-primary/5 p-4">
		<Icon className="size-5 text-primary" />
		<div className="flex-1">
			<p className="text-sm font-medium">{text}</p>
			{code && <p className="text-xs text-muted-foreground">Use code: {code}</p>}
		</div>
	</div>
);

const CouponInput = ({ placeholder, buttonLabel }: { placeholder: string; buttonLabel: string }) => (
	<div className="flex gap-2">
		<Input placeholder={placeholder} className="flex-1" />
		<Button variant="secondary">{buttonLabel}</Button>
	</div>
);

const OrderLine = ({ label, value, isFinal }: { label: string; value: string; isFinal?: boolean }) => (
	<div className={`flex justify-between ${isFinal ? 'text-xl font-bold' : 'text-sm'}`}>
		<span className={isFinal ? '' : 'text-muted-foreground'}>{label}</span>
		<span className={isFinal ? 'text-primary' : ''}>{value}</span>
	</div>
);

const SummaryCard = ({
	lines,
	promos,
	checkoutLabel,
	checkoutHref,
}: {
	lines: { label: string; value: string; isFinal?: boolean }[];
	promos: PromoOffer[];
	checkoutLabel: string;
	checkoutHref: string;
}) => (
	<Card className="sticky top-4">
		<CardContent className="space-y-6 p-6">
			<h2 className="text-lg font-semibold">Order Summary</h2>

			{promos.map((promo, i) => (
				<PromoCard key={i} {...promo} />
			))}

			<CouponInput placeholder="Enter coupon code" buttonLabel="Apply" />

			<Separator />

			<div className="space-y-3">
				{lines.map((line, i) => (
					<div key={i}>
						{line.isFinal && <Separator className="mb-3" />}
						<OrderLine {...line} />
					</div>
				))}
			</div>

			<Button className="w-full gap-2" size="lg" asChild>
				<Link href={checkoutHref}>
					{checkoutLabel}
					<ChevronRight className="size-4" />
				</Link>
			</Button>

			<p className="text-center text-xs text-muted-foreground">
				Secure checkout powered by Stripe
			</p>
		</CardContent>
	</Card>
);

export default function Main() {
	const items: CartItem[] = [
		{
			id: '1',
			image: 'https://images.unsplash.com/photo-1491553895911-0055uj6e82?w=400&h=400&fit=crop',
			name: 'Minimalist Ceramic Vase Set',
			brand: 'Home Artisan',
			price: 89.99,
			quantity: 1,
			isSaved: false,
		},
		{
			id: '2',
			image: 'https://images.unsplash.com/photo-1616486338812-3dadae4b4ace?w=400&h=400&fit=crop',
			name: 'Modern Accent Chair',
			brand: 'Scandico',
			price: 449.99,
			quantity: 1,
			isSaved: true,
		},
		{
			id: '3',
			image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=400&fit=crop',
			name: 'Handwoven Throw Blanket',
			brand: 'Cozy Living',
			price: 129.99,
			quantity: 2,
			isSaved: false,
		},
		{
			id: '4',
			image: 'https://images.unsplash.com/photo-1513506003901-1e6a229e2d15?w=400&h=400&fit=crop',
			name: 'Brass Table Lamp',
			brand: 'Lumière',
			price: 179.99,
			quantity: 1,
			isSaved: false,
		},
	];

	const promos: PromoOffer[] = [
		{ icon: Gift, text: 'Free gift wrap available', code: 'GIFT2024' },
		{ icon: Percent, text: '15% off your next order', code: 'SAVE15' },
	];

	const orderLines = [
		{ label: 'Subtotal (5 items)', value: '$979.95' },
		{ label: 'Shipping', value: 'FREE' },
		{ label: 'Tax', value: '$78.40' },
		{ label: 'Total', value: '$1,058.35', isFinal: true },
	];

	return (
		<section className="@container">
			<div className="mx-auto max-w-7xl px-4 py-8 @md:py-12 @xl:py-16">
				<PageTitle title="Your Shopping Cart" subtitle="Review your items before checkout" />

				<div className="mt-10 grid gap-8 @xl:grid-cols-3">
					<div className="@xl:col-span-2">
						<div className="grid gap-4 @sm:grid-cols-2 @lg:grid-cols-2">
							{items.map((item) => (
								<CartCard key={item.id} item={item} />
							))}
						</div>
					</div>

					<div>
						<SummaryCard
							lines={orderLines}
							promos={promos}
							checkoutLabel="Proceed to Checkout"
							checkoutHref="/checkout"
						/>
					</div>
				</div>
			</div>
		</section>
	);
}
