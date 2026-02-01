import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import {
	Card,
	CardContent,
	CardHeader,
	CardTitle,
	CardDescription,
} from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import {
	Minus,
	Plus,
	Trash2,
	CreditCard,
	Wallet,
	Receipt,
	ArrowRight,
	Shield,
	Clock,
} from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';

interface CartItem {
	id: string;
	image: string;
	name: string;
	description: string;
	price: number;
	quantity: number;
}

interface PaymentMethod {
	id: string;
	icon: React.ComponentType<{ className?: string }>;
	name: string;
	description: string;
	selected?: boolean;
}

const PageHeading = ({
	title,
	description,
}: {
	title: string;
	description: string;
}) => (
	<div className="text-center @xl:text-left">
		<h1 className="text-3xl font-bold @md:text-4xl">{title}</h1>
		<p className="mt-2 text-muted-foreground">{description}</p>
	</div>
);

const ItemImage = ({ src, alt }: { src: string; alt: string }) => (
	<div className="relative size-28 shrink-0 overflow-hidden rounded-2xl bg-muted @sm:size-32">
		<Image src={src} alt={alt} fill className="object-cover" />
	</div>
);

const ItemMeta = ({
	name,
	description,
}: {
	name: string;
	description: string;
}) => (
	<div className="min-w-0 flex-1">
		<h3 className="font-semibold text-lg leading-tight">{name}</h3>
		<p className="mt-1 text-sm text-muted-foreground line-clamp-2">
			{description}
		</p>
	</div>
);

const QuantityControl = ({ quantity }: { quantity: number }) => (
	<div className="flex items-center rounded-xl border-2 bg-background p-1">
		<Button size="icon-sm" variant="ghost" className="size-8 rounded-lg">
			<Minus className="size-4" />
		</Button>
		<span className="w-10 text-center font-semibold">{quantity}</span>
		<Button size="icon-sm" variant="ghost" className="size-8 rounded-lg">
			<Plus className="size-4" />
		</Button>
	</div>
);

const ItemTotal = ({
	price,
	quantity,
}: {
	price: number;
	quantity: number;
}) => (
	<div className="text-right">
		<p className="text-xl font-bold">${(price * quantity).toFixed(2)}</p>
		<p className="text-sm text-muted-foreground">${price.toFixed(2)} each</p>
	</div>
);

const DeleteItem = () => (
	<Button
		size="sm"
		variant="ghost"
		className="text-destructive hover:text-destructive hover:bg-destructive/10"
	>
		<Trash2 className="size-4" />
	</Button>
);

const CartItemCard = ({ item }: { item: CartItem }) => (
	<Card className="overflow-hidden">
		<CardContent className="p-5">
			<div className="flex gap-5">
				<ItemImage src={item.image} alt={item.name} />
				<div className="flex min-w-0 flex-1 flex-col gap-4">
					<div className="flex items-start justify-between gap-3">
						<ItemMeta name={item.name} description={item.description} />
						<DeleteItem />
					</div>
					<div className="flex items-center justify-between mt-auto">
						<QuantityControl quantity={item.quantity} />
						<ItemTotal price={item.price} quantity={item.quantity} />
					</div>
				</div>
			</div>
		</CardContent>
	</Card>
);

const PaymentOption = ({
	method,
	selected,
}: {
	method: PaymentMethod;
	selected?: boolean;
}) => {
	const Icon = method.icon;
	return (
		<button
			type="button"
			className={`flex items-center gap-4 rounded-xl border-2 p-4 text-left transition-all w-full ${
				selected
					? 'border-primary bg-primary/5 shadow-sm'
					: 'hover:border-primary/30'
			}`}
		>
			<div
				className={`rounded-lg p-2 ${selected ? 'bg-primary text-primary-foreground' : 'bg-muted'}`}
			>
				<Icon className="size-5" />
			</div>
			<div className="flex-1">
				<p className="font-medium">{method.name}</p>
				<p className="text-sm text-muted-foreground">{method.description}</p>
			</div>
			<div
				className={`size-5 rounded-full border-2 ${selected ? 'border-primary bg-primary' : 'border-muted-foreground/30'}`}
			>
				{selected && (
					<svg
						className="size-full text-primary-foreground"
						viewBox="0 0 20 20"
						fill="currentColor"
					>
						<path
							fillRule="evenodd"
							d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
							clipRule="evenodd"
						/>
					</svg>
				)}
			</div>
		</button>
	);
};

const PricingLine = ({
	label,
	value,
	highlight,
}: {
	label: string;
	value: string;
	highlight?: boolean;
}) => (
	<div
		className={`flex justify-between ${highlight ? 'text-xl font-bold' : ''}`}
	>
		<span className={highlight ? '' : 'text-muted-foreground'}>{label}</span>
		<span className={highlight ? 'text-primary' : ''}>{value}</span>
	</div>
);

const TrustBadge = ({
	icon: Icon,
	text,
}: {
	icon: React.ComponentType<{ className?: string }>;
	text: string;
}) => (
	<div className="flex items-center gap-2 text-sm text-muted-foreground">
		<Icon className="size-4" />
		<span>{text}</span>
	</div>
);

const CheckoutCard = ({
	title,
	paymentMethods,
	pricingLines,
	checkoutLabel,
	checkoutHref,
}: {
	title: string;
	paymentMethods: PaymentMethod[];
	pricingLines: { label: string; value: string; highlight?: boolean }[];
	checkoutLabel: string;
	checkoutHref: string;
}) => (
	<Card className="sticky top-4">
		<CardHeader>
			<CardTitle>{title}</CardTitle>
			<CardDescription>Select your preferred payment method</CardDescription>
		</CardHeader>
		<CardContent className="space-y-6">
			<div className="space-y-3">
				{paymentMethods.map((method) => (
					<PaymentOption
						key={method.id}
						method={method}
						selected={method.selected}
					/>
				))}
			</div>

			<Separator />

			<div className="space-y-3">
				{pricingLines.map((line, i) => (
					<div key={i}>
						{line.highlight && <Separator className="mb-3" />}
						<PricingLine {...line} />
					</div>
				))}
			</div>

			<Button className="w-full gap-2" size="lg" asChild>
				<Link href={checkoutHref}>
					{checkoutLabel}
					<ArrowRight className="size-4" />
				</Link>
			</Button>

			<div className="flex flex-wrap justify-center gap-4 pt-2">
				<TrustBadge icon={Shield} text="Secure Payment" />
				<TrustBadge icon={Clock} text="24/7 Support" />
			</div>
		</CardContent>
	</Card>
);

export default function Main() {
	const items: CartItem[] = [
		{
			id: '1',
			image:
				'https://images.unsplash.com/photo-1585386959984-a4155224a1ad?w=300&h=300&fit=crop',
			name: 'Sony WH-1000XM5',
			description:
				'Premium wireless noise-canceling headphones with exceptional sound quality',
			price: 349.99,
			quantity: 1,
		},
		{
			id: '2',
			image:
				'https://images.unsplash.com/photo-1605464315542-bda3e2f4e605?w=300&h=300&fit=crop',
			name: 'MacBook Pro 14"',
			description: 'Apple M3 Pro chip, 18GB RAM, 512GB SSD, Space Gray',
			price: 1999.99,
			quantity: 1,
		},
		{
			id: '3',
			image:
				'https://images.unsplash.com/photo-1544244015-0df4b3ffc6b0?w=300&h=300&fit=crop',
			name: 'Apple iPad Pro 12.9"',
			description: 'M2 chip, 256GB, Wi-Fi + Cellular, Silver',
			price: 1199.99,
			quantity: 1,
		},
	];

	const paymentMethods: PaymentMethod[] = [
		{
			id: 'card',
			icon: CreditCard,
			name: 'Credit Card',
			description: 'Visa, Mastercard, Amex',
			selected: true,
		},
		{
			id: 'wallet',
			icon: Wallet,
			name: 'Digital Wallet',
			description: 'Apple Pay, Google Pay',
		},
		{
			id: 'invoice',
			icon: Receipt,
			name: 'Pay Later',
			description: 'Klarna, Afterpay',
		},
	];

	const pricingLines = [
		{ label: 'Subtotal', value: '$3,549.97' },
		{ label: 'Shipping', value: 'Free' },
		{ label: 'Tax', value: '$283.99' },
		{ label: 'Total', value: '$3,833.96', highlight: true },
	];

	return (
		<section className="@container">
			<div className="mx-auto max-w-6xl px-4 py-8 @md:py-12 @xl:py-16">
				<PageHeading
					title="Your Shopping Cart"
					description="Review your items and proceed to checkout"
				/>

				<div className="mt-10 grid gap-8 @xl:grid-cols-5">
					<div className="space-y-4 @xl:col-span-3">
						{items.map((item) => (
							<CartItemCard key={item.id} item={item} />
						))}
					</div>

					<div className="@xl:col-span-2">
						<CheckoutCard
							title="Payment"
							paymentMethods={paymentMethods}
							pricingLines={pricingLines}
							checkoutLabel="Complete Purchase"
							checkoutHref="/checkout"
						/>
					</div>
				</div>
			</div>
		</section>
	);
}
