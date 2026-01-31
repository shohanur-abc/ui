import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Separator } from '@/components/ui/separator';
import { Minus, Plus, X, ShoppingCart, Tag, Truck, Shield, ArrowRight } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';

interface CartItem {
	id: string;
	image: string;
	name: string;
	category: string;
	price: number;
	quantity: number;
	color: string;
	size: string;
}

interface Feature {
	icon: React.ComponentType<{ className?: string }>;
	title: string;
	description: string;
}

const SectionTitle = ({ text, count }: { text: string; count?: number }) => (
	<h2 className="text-xl font-semibold @md:text-2xl">
		{text}
		{count !== undefined && (
			<span className="ml-2 text-muted-foreground">({count})</span>
		)}
	</h2>
);

const ProductImage = ({ src, alt }: { src: string; alt: string }) => (
	<div className="relative aspect-square w-28 shrink-0 overflow-hidden rounded-xl bg-muted @sm:w-32">
		<Image src={src} alt={alt} fill className="object-cover" />
	</div>
);

const ProductMeta = ({
	name,
	category,
	color,
	size,
}: {
	name: string;
	category: string;
	color: string;
	size: string;
}) => (
	<div className="space-y-1">
		<p className="text-xs uppercase tracking-wide text-muted-foreground">{category}</p>
		<h3 className="font-medium leading-tight">{name}</h3>
		<div className="flex gap-2 text-sm text-muted-foreground">
			<span>{color}</span>
			<span>•</span>
			<span>{size}</span>
		</div>
	</div>
);

const QuantityControl = ({ quantity }: { quantity: number }) => (
	<div className="inline-flex items-center rounded-full border bg-background">
		<Button size="icon-sm" variant="ghost" className="rounded-full">
			<Minus className="size-3" />
		</Button>
		<span className="w-8 text-center text-sm font-medium">{quantity}</span>
		<Button size="icon-sm" variant="ghost" className="rounded-full">
			<Plus className="size-3" />
		</Button>
	</div>
);

const PriceDisplay = ({ price, quantity }: { price: number; quantity: number }) => (
	<div className="text-right">
		<p className="text-lg font-bold">${(price * quantity).toFixed(2)}</p>
		{quantity > 1 && (
			<p className="text-xs text-muted-foreground">${price.toFixed(2)} each</p>
		)}
	</div>
);

const RemoveButton = () => (
	<Button
		size="icon-sm"
		variant="ghost"
		className="absolute -right-2 -top-2 size-6 rounded-full bg-muted hover:bg-destructive hover:text-destructive-foreground"
	>
		<X className="size-3" />
	</Button>
);

const CartItemCard = ({ item }: { item: CartItem }) => (
	<Card className="relative overflow-hidden transition-shadow hover:shadow-md">
		<RemoveButton />
		<CardContent className="flex gap-4 p-4">
			<ProductImage src={item.image} alt={item.name} />
			<div className="flex min-w-0 flex-1 flex-col justify-between">
				<ProductMeta
					name={item.name}
					category={item.category}
					color={item.color}
					size={item.size}
				/>
				<div className="mt-3 flex items-center justify-between">
					<QuantityControl quantity={item.quantity} />
					<PriceDisplay price={item.price} quantity={item.quantity} />
				</div>
			</div>
		</CardContent>
	</Card>
);

const PromoCodeInput = ({ placeholder, buttonLabel }: { placeholder: string; buttonLabel: string }) => (
	<div className="flex gap-2">
		<div className="relative flex-1">
			<Tag className="absolute left-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" />
			<Input placeholder={placeholder} className="pl-9" />
		</div>
		<Button variant="outline">{buttonLabel}</Button>
	</div>
);

const FeatureItem = ({ icon: Icon, title, description }: Feature) => (
	<div className="flex items-start gap-3">
		<div className="rounded-lg bg-primary/10 p-2">
			<Icon className="size-4 text-primary" />
		</div>
		<div>
			<p className="text-sm font-medium">{title}</p>
			<p className="text-xs text-muted-foreground">{description}</p>
		</div>
	</div>
);

const PriceLine = ({
	label,
	value,
	isBold,
	isDiscount,
}: {
	label: string;
	value: string;
	isBold?: boolean;
	isDiscount?: boolean;
}) => (
	<div className={`flex justify-between ${isBold ? 'text-lg font-bold' : ''}`}>
		<span className={isBold ? '' : 'text-muted-foreground'}>{label}</span>
		<span className={isDiscount ? 'text-green-500' : isBold ? 'text-primary' : ''}>
			{value}
		</span>
	</div>
);

const CheckoutPanel = ({
	subtotal,
	shipping,
	discount,
	total,
	features,
	checkoutHref,
	checkoutLabel,
}: {
	subtotal: string;
	shipping: string;
	discount: string;
	total: string;
	features: Feature[];
	checkoutHref: string;
	checkoutLabel: string;
}) => (
	<div className="space-y-6 rounded-2xl bg-muted/50 p-6">
		<PromoCodeInput placeholder="Promo code" buttonLabel="Apply" />
		
		<Separator />
		
		<div className="space-y-3">
			<PriceLine label="Subtotal" value={subtotal} />
			<PriceLine label="Shipping" value={shipping} />
			<PriceLine label="Discount" value={discount} isDiscount />
			<Separator />
			<PriceLine label="Total" value={total} isBold />
		</div>

		<Button className="w-full gap-2" size="lg" asChild>
			<Link href={checkoutHref}>
				{checkoutLabel}
				<ArrowRight className="size-4" />
			</Link>
		</Button>

		<Separator />

		<div className="space-y-4">
			{features.map((feature, i) => (
				<FeatureItem key={i} {...feature} />
			))}
		</div>
	</div>
);

export default function Main() {
	const items: CartItem[] = [
		{
			id: '1',
			image: 'https://images.unsplash.com/photo-1600185365926-3a2ce3cdb9eb?w=300&h=300&fit=crop',
			name: 'Leather Weekend Bag',
			category: 'Accessories',
			price: 245.0,
			quantity: 1,
			color: 'Brown',
			size: 'Large',
		},
		{
			id: '2',
			image: 'https://images.unsplash.com/photo-1606107557195-0e29a4b5b4aa?w=300&h=300&fit=crop',
			name: 'Performance Running Shoes',
			category: 'Footwear',
			price: 179.99,
			quantity: 2,
			color: 'White/Blue',
			size: 'US 10',
		},
		{
			id: '3',
			image: 'https://images.unsplash.com/photo-1576566588028-4147f3842f27?w=300&h=300&fit=crop',
			name: 'Organic Cotton T-Shirt',
			category: 'Apparel',
			price: 49.99,
			quantity: 3,
			color: 'Navy',
			size: 'M',
		},
	];

	const features: Feature[] = [
		{ icon: Truck, title: 'Free Shipping', description: 'On orders over $100' },
		{ icon: Shield, title: 'Secure Checkout', description: '256-bit SSL encryption' },
	];

	return (
		<section className="@container">
			<div className="mx-auto max-w-7xl px-4 py-8 @md:py-12 @xl:py-16">
				<div className="mb-8 flex items-center gap-3">
					<ShoppingCart className="size-6 text-primary" />
					<SectionTitle text="Your Cart" count={items.length} />
				</div>

				<div className="grid gap-8 @xl:grid-cols-5">
					<div className="space-y-4 @xl:col-span-3">
						{items.map((item) => (
							<CartItemCard key={item.id} item={item} />
						))}
					</div>

					<div className="@xl:col-span-2">
						<CheckoutPanel
							subtotal="$754.95"
							shipping="Free"
							discount="-$50.00"
							total="$704.95"
							features={features}
							checkoutHref="/checkout"
							checkoutLabel="Checkout"
						/>
					</div>
				</div>
			</div>
		</section>
	);
}
