import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from '@/components/ui/select';
import { Minus, Plus, Trash2, RefreshCw, Calendar, ArrowRight, CheckCircle } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';

interface CartItem {
	id: string;
	image: string;
	name: string;
	variant: string;
	price: number;
	quantity: number;
	isSubscription?: boolean;
	frequency?: string;
}

interface FrequencyOption {
	value: string;
	label: string;
	discount: number;
}

const PageHeader = ({ title, badge }: { title: string; badge: string }) => (
	<div className="flex items-center gap-3">
		<RefreshCw className="size-6 text-primary" />
		<h1 className="text-2xl font-bold @md:text-3xl">{title}</h1>
		<Badge variant="secondary">{badge}</Badge>
	</div>
);

const ItemImage = ({ src, alt }: { src: string; alt: string }) => (
	<div className="relative aspect-square w-20 shrink-0 overflow-hidden rounded-xl bg-muted @sm:w-24">
		<Image src={src} alt={alt} fill className="object-cover" />
	</div>
);

const ItemInfo = ({ name, variant }: { name: string; variant: string }) => (
	<div className="min-w-0 flex-1">
		<h3 className="font-medium line-clamp-1">{name}</h3>
		<p className="text-sm text-muted-foreground">{variant}</p>
	</div>
);

const QuantityControl = ({ quantity }: { quantity: number }) => (
	<div className="flex items-center gap-1 rounded-md border">
		<Button size="icon-sm" variant="ghost" className="size-7">
			<Minus className="size-3" />
		</Button>
		<span className="w-6 text-center text-sm font-medium">{quantity}</span>
		<Button size="icon-sm" variant="ghost" className="size-7">
			<Plus className="size-3" />
		</Button>
	</div>
);

const FrequencySelector = ({
	current,
	options,
}: {
	current: string;
	options: FrequencyOption[];
}) => (
	<Select defaultValue={current}>
		<SelectTrigger className="w-40">
			<SelectValue />
		</SelectTrigger>
		<SelectContent>
			{options.map((opt) => (
				<SelectItem key={opt.value} value={opt.value}>
					<span className="flex items-center gap-2">
						{opt.label}
						{opt.discount > 0 && (
							<Badge variant="secondary" className="text-xs text-green-600">
								-{opt.discount}%
							</Badge>
						)}
					</span>
				</SelectItem>
			))}
		</SelectContent>
	</Select>
);

const ItemPricing = ({ price, quantity, discount }: { price: number; quantity: number; discount?: number }) => {
	const subtotal = price * quantity;
	const discounted = discount ? subtotal * (1 - discount / 100) : subtotal;

	return (
		<div className="text-right">
			{discount && (
				<p className="text-sm text-muted-foreground line-through">${subtotal.toFixed(2)}</p>
			)}
			<p className="text-lg font-bold">${discounted.toFixed(2)}</p>
		</div>
	);
};

const RemoveAction = () => (
	<Button size="icon-sm" variant="ghost" className="text-muted-foreground hover:text-destructive">
		<Trash2 className="size-4" />
	</Button>
);

const SubscriptionBadge = () => (
	<Badge className="gap-1 bg-green-500/10 text-green-600 border-green-500/20">
		<RefreshCw className="size-3" />
		Subscribe & Save
	</Badge>
);

const OneTimeBadge = () => (
	<Badge variant="outline" className="text-muted-foreground">
		One-time purchase
	</Badge>
);

const CartItemRow = ({
	item,
	frequencies,
}: {
	item: CartItem;
	frequencies: FrequencyOption[];
}) => (
	<Card className={`${item.isSubscription ? 'border-green-500/30 bg-green-500/5' : ''}`}>
		<CardContent className="p-4">
			<div className="flex gap-4">
				<ItemImage src={item.image} alt={item.name} />
				<div className="flex min-w-0 flex-1 flex-col gap-3">
					<div className="flex items-start justify-between gap-2">
						<div className="space-y-2">
							<ItemInfo name={item.name} variant={item.variant} />
							{item.isSubscription ? <SubscriptionBadge /> : <OneTimeBadge />}
						</div>
						<RemoveAction />
					</div>
					<div className="flex flex-wrap items-center justify-between gap-4">
						<div className="flex items-center gap-4">
							<QuantityControl quantity={item.quantity} />
							{item.isSubscription && (
								<FrequencySelector current={item.frequency || 'monthly'} options={frequencies} />
							)}
						</div>
						<ItemPricing
							price={item.price}
							quantity={item.quantity}
							discount={item.isSubscription ? 15 : undefined}
						/>
					</div>
				</div>
			</div>
		</CardContent>
	</Card>
);

const SubscriptionBenefits = ({ benefits }: { benefits: string[] }) => (
	<Card className="border-green-500/20 bg-gradient-to-br from-green-500/5 to-transparent">
		<CardHeader className="pb-3">
			<CardTitle className="flex items-center gap-2 text-lg">
				<RefreshCw className="size-5 text-green-500" />
				Subscription Benefits
			</CardTitle>
		</CardHeader>
		<CardContent className="space-y-2">
			{benefits.map((benefit, i) => (
				<div key={i} className="flex items-center gap-2 text-sm">
					<CheckCircle className="size-4 text-green-500" />
					<span>{benefit}</span>
				</div>
			))}
		</CardContent>
	</Card>
);

const NextDelivery = ({ date, manageLabel }: { date: string; manageLabel: string }) => (
	<Card>
		<CardContent className="flex items-center justify-between p-4">
			<div className="flex items-center gap-3">
				<div className="rounded-lg bg-primary/10 p-2">
					<Calendar className="size-5 text-primary" />
				</div>
				<div>
					<p className="text-sm text-muted-foreground">Next Delivery</p>
					<p className="font-semibold">{date}</p>
				</div>
			</div>
			<Button variant="outline" size="sm">
				{manageLabel}
			</Button>
		</CardContent>
	</Card>
);

const SummaryLine = ({
	label,
	value,
	variant,
}: {
	label: string;
	value: string;
	variant?: 'default' | 'discount' | 'total';
}) => (
	<div className={`flex justify-between ${variant === 'total' ? 'text-xl font-bold' : ''}`}>
		<span className={variant === 'total' ? '' : 'text-muted-foreground'}>{label}</span>
		<span
			className={
				variant === 'total'
					? 'text-primary'
					: variant === 'discount'
						? 'text-green-500 font-medium'
						: ''
			}
		>
			{value}
		</span>
	</div>
);

const OrderSummary = ({
	title,
	lines,
	checkoutLabel,
	checkoutHref,
}: {
	title: string;
	lines: { label: string; value: string; variant?: 'default' | 'discount' | 'total' }[];
	checkoutLabel: string;
	checkoutHref: string;
}) => (
	<Card className="sticky top-4">
		<CardHeader>
			<CardTitle>{title}</CardTitle>
		</CardHeader>
		<CardContent className="space-y-3">
			{lines.map((line, i) => (
				<div key={i}>
					{line.variant === 'total' && <Separator className="my-3" />}
					<SummaryLine {...line} />
				</div>
			))}
		</CardContent>
		<CardFooter>
			<Button className="w-full gap-2" size="lg" asChild>
				<Link href={checkoutHref}>
					{checkoutLabel}
					<ArrowRight className="size-4" />
				</Link>
			</Button>
		</CardFooter>
	</Card>
);

export default function Main() {
	const items: CartItem[] = [
		{
			id: '1',
			image: 'https://images.unsplash.com/photo-1556228720-195a672e8a03?w=200&h=200&fit=crop',
			name: 'Premium Coffee Beans',
			variant: '500g • Dark Roast',
			price: 24.99,
			quantity: 2,
			isSubscription: true,
			frequency: 'monthly',
		},
		{
			id: '2',
			image: 'https://images.unsplash.com/photo-1584568694244-14fbdf83bd30?w=200&h=200&fit=crop',
			name: 'Organic Protein Powder',
			variant: '1kg • Chocolate',
			price: 49.99,
			quantity: 1,
			isSubscription: true,
			frequency: 'biweekly',
		},
		{
			id: '3',
			image: 'https://images.unsplash.com/photo-1602143407151-7111542de6e8?w=200&h=200&fit=crop',
			name: 'Stainless Steel Water Bottle',
			variant: '750ml • Matte Black',
			price: 29.99,
			quantity: 1,
			isSubscription: false,
		},
	];

	const frequencies: FrequencyOption[] = [
		{ value: 'weekly', label: 'Weekly', discount: 20 },
		{ value: 'biweekly', label: 'Every 2 weeks', discount: 15 },
		{ value: 'monthly', label: 'Monthly', discount: 10 },
		{ value: 'bimonthly', label: 'Every 2 months', discount: 5 },
	];

	const benefits = [
		'15% off on all subscription items',
		'Free shipping on every delivery',
		'Skip, pause, or cancel anytime',
		'Exclusive member-only offers',
	];

	const summaryLines = [
		{ label: 'Subtotal', value: '$179.95' },
		{ label: 'Subscription Discount', value: '-$22.49', variant: 'discount' as const },
		{ label: 'Shipping', value: 'Free' },
		{ label: 'Tax', value: '$12.60' },
		{ label: 'Today\'s Total', value: '$170.06', variant: 'total' as const },
	];

	return (
		<section className="@container">
			<div className="mx-auto max-w-6xl px-4 py-8 @md:py-12 @xl:py-16">
				<PageHeader title="Your Cart" badge="2 subscriptions" />

				<div className="mt-8 grid gap-8 @xl:grid-cols-5">
					<div className="space-y-4 @xl:col-span-3">
						{items.map((item) => (
							<CartItemRow key={item.id} item={item} frequencies={frequencies} />
						))}
					</div>

					<div className="space-y-4 @xl:col-span-2">
						<OrderSummary
							title="Order Summary"
							lines={summaryLines}
							checkoutLabel="Subscribe & Checkout"
							checkoutHref="/checkout"
						/>
						<NextDelivery date="March 15, 2024" manageLabel="Manage" />
						<SubscriptionBenefits benefits={benefits} />
					</div>
				</div>
			</div>
		</section>
	);
}
