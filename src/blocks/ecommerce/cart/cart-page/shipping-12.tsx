import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Separator } from '@/components/ui/separator';
import { Label } from '@/components/ui/label';
import {
	Minus,
	Plus,
	Trash2,
	Truck,
	Zap,
	Clock,
	ArrowRight,
	Check,
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

interface ShippingOption {
	id: string;
	icon: React.ComponentType<{ className?: string }>;
	name: string;
	description: string;
	price: number;
	eta: string;
}

const Title = ({ text }: { text: string }) => (
	<h1 className="text-2xl font-bold @md:text-3xl">{text}</h1>
);

const ItemThumbnail = ({ src, alt }: { src: string; alt: string }) => (
	<div className="relative size-20 shrink-0 overflow-hidden rounded-lg bg-muted">
		<Image src={src} alt={alt} fill className="object-cover" />
	</div>
);

const ItemDetails = ({ name, variant }: { name: string; variant: string }) => (
	<div className="min-w-0 flex-1">
		<h3 className="font-medium line-clamp-1">{name}</h3>
		<p className="text-sm text-muted-foreground">{variant}</p>
	</div>
);

const QuantityButtons = ({ quantity }: { quantity: number }) => (
	<div className="flex items-center border rounded-md">
		<Button size="icon-sm" variant="ghost" className="size-8 rounded-r-none">
			<Minus className="size-3" />
		</Button>
		<span className="w-8 text-center text-sm font-medium border-x">
			{quantity}
		</span>
		<Button size="icon-sm" variant="ghost" className="size-8 rounded-l-none">
			<Plus className="size-3" />
		</Button>
	</div>
);

const PriceLabel = ({ price }: { price: number }) => (
	<span className="font-semibold whitespace-nowrap">${price.toFixed(2)}</span>
);

const RemoveAction = () => (
	<Button
		size="icon-sm"
		variant="ghost"
		className="text-muted-foreground hover:text-destructive"
	>
		<Trash2 className="size-4" />
	</Button>
);

const ItemRow = ({ item }: { item: CartItem }) => (
	<div className="flex items-center gap-4 py-4">
		<ItemThumbnail src={item.image} alt={item.name} />
		<ItemDetails name={item.name} variant={item.variant} />
		<QuantityButtons quantity={item.quantity} />
		<PriceLabel price={item.price * item.quantity} />
		<RemoveAction />
	</div>
);

const ShippingChoice = ({
	option,
	selected,
}: {
	option: ShippingOption;
	selected: boolean;
}) => {
	const Icon = option.icon;
	return (
		<Label
			htmlFor={option.id}
			className={`flex items-center gap-4 rounded-xl border-2 p-4 cursor-pointer transition-all ${
				selected
					? 'border-primary bg-primary/5'
					: 'hover:border-muted-foreground/30'
			}`}
		>
			<RadioGroupItem value={option.id} id={option.id} className="sr-only" />
			<div
				className={`rounded-full p-2 ${selected ? 'bg-primary text-primary-foreground' : 'bg-muted'}`}
			>
				<Icon className="size-5" />
			</div>
			<div className="flex-1">
				<div className="flex items-center gap-2">
					<p className="font-medium">{option.name}</p>
					{selected && <Check className="size-4 text-primary" />}
				</div>
				<p className="text-sm text-muted-foreground">{option.description}</p>
			</div>
			<div className="text-right">
				<p className="font-semibold">
					{option.price === 0 ? 'Free' : `$${option.price.toFixed(2)}`}
				</p>
				<p className="text-xs text-muted-foreground">{option.eta}</p>
			</div>
		</Label>
	);
};

const ShippingSelector = ({
	title,
	options,
	selectedId,
}: {
	title: string;
	options: ShippingOption[];
	selectedId: string;
}) => (
	<Card>
		<CardHeader>
			<CardTitle className="flex items-center gap-2">
				<Truck className="size-5" />
				{title}
			</CardTitle>
		</CardHeader>
		<CardContent>
			<RadioGroup value={selectedId} className="space-y-3">
				{options.map((option) => (
					<ShippingChoice
						key={option.id}
						option={option}
						selected={option.id === selectedId}
					/>
				))}
			</RadioGroup>
		</CardContent>
	</Card>
);

const TotalLine = ({
	label,
	value,
	isBold,
	isGreen,
}: {
	label: string;
	value: string;
	isBold?: boolean;
	isGreen?: boolean;
}) => (
	<div className={`flex justify-between ${isBold ? 'text-lg font-bold' : ''}`}>
		<span className={isBold ? '' : 'text-muted-foreground'}>{label}</span>
		<span
			className={
				isBold ? 'text-primary' : isGreen ? 'text-green-500 font-medium' : ''
			}
		>
			{value}
		</span>
	</div>
);

const OrderSummary = ({
	lines,
	checkoutLabel,
	checkoutHref,
}: {
	lines: {
		label: string;
		value: string;
		isBold?: boolean;
		isGreen?: boolean;
	}[];
	checkoutLabel: string;
	checkoutHref: string;
}) => (
	<Card className="sticky top-4">
		<CardHeader>
			<CardTitle>Order Total</CardTitle>
		</CardHeader>
		<CardContent className="space-y-3">
			{lines.map((line, i) => (
				<div key={i}>
					{line.isBold && <Separator className="my-3" />}
					<TotalLine {...line} />
				</div>
			))}
		</CardContent>
		<CardContent className="pt-0">
			<Button className="w-full gap-2" size="lg" asChild>
				<Link href={checkoutHref}>
					{checkoutLabel}
					<ArrowRight className="size-4" />
				</Link>
			</Button>
		</CardContent>
	</Card>
);

export default function Main() {
	const items: CartItem[] = [
		{
			id: '1',
			image:
				'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=200&h=200&fit=crop',
			name: 'Premium Over-Ear Headphones',
			variant: 'Midnight Black / Wireless',
			price: 299.99,
			quantity: 1,
		},
		{
			id: '2',
			image:
				'https://images.unsplash.com/photo-1600185365483-26d7a4cc7519?w=200&h=200&fit=crop',
			name: 'Classic Low-Top Sneakers',
			variant: 'White / Size 10',
			price: 129.99,
			quantity: 1,
		},
		{
			id: '3',
			image:
				'https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=200&h=200&fit=crop',
			name: 'Canvas Messenger Bag',
			variant: 'Olive / Medium',
			price: 79.99,
			quantity: 2,
		},
	];

	const shippingOptions: ShippingOption[] = [
		{
			id: 'standard',
			icon: Truck,
			name: 'Standard Shipping',
			description: 'Delivered to your door',
			price: 0,
			eta: '5-7 business days',
		},
		{
			id: 'express',
			icon: Zap,
			name: 'Express Shipping',
			description: 'Priority handling',
			price: 14.99,
			eta: '2-3 business days',
		},
		{
			id: 'overnight',
			icon: Clock,
			name: 'Next Day Delivery',
			description: 'Order before 2PM',
			price: 29.99,
			eta: 'Next business day',
		},
	];

	const subtotal = items.reduce((sum, i) => sum + i.price * i.quantity, 0);
	const selectedShipping = 0; // Standard is free
	const tax = subtotal * 0.08;

	const summaryLines = [
		{ label: 'Subtotal', value: `$${subtotal.toFixed(2)}` },
		{
			label: 'Shipping',
			value:
				selectedShipping === 0 ? 'Free' : `$${selectedShipping.toFixed(2)}`,
			isGreen: selectedShipping === 0,
		},
		{ label: 'Tax', value: `$${tax.toFixed(2)}` },
		{
			label: 'Total',
			value: `$${(subtotal + selectedShipping + tax).toFixed(2)}`,
			isBold: true,
		},
	];

	return (
		<section className="@container">
			<div className="mx-auto max-w-6xl px-4 py-8 @md:py-12 @xl:py-16">
				<Title text="Your Cart" />

				<div className="mt-8 grid gap-8 @xl:grid-cols-5">
					<div className="space-y-6 @xl:col-span-3">
						<Card>
							<CardHeader>
								<CardTitle>Cart Items ({items.length})</CardTitle>
							</CardHeader>
							<CardContent className="divide-y">
								{items.map((item) => (
									<ItemRow key={item.id} item={item} />
								))}
							</CardContent>
						</Card>

						<ShippingSelector
							title="Shipping Method"
							options={shippingOptions}
							selectedId="standard"
						/>
					</div>

					<div className="@xl:col-span-2">
						<OrderSummary
							lines={summaryLines}
							checkoutLabel="Continue to Checkout"
							checkoutHref="/checkout"
						/>
					</div>
				</div>
			</div>
		</section>
	);
}
