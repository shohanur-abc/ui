import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import {
	Card,
	CardContent,
	CardFooter,
	CardHeader,
	CardTitle,
} from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Separator } from '@/components/ui/separator';
import { Slider } from '@/components/ui/slider';
import {
	Minus,
	Plus,
	X,
	ShoppingBag,
	Wallet,
	CreditCard,
	ArrowRight,
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

interface RewardPoints {
	available: number;
	toUse: number;
	valuePerPoint: number;
}

const Title = ({ text }: { text: string }) => (
	<div className="flex items-center gap-3">
		<ShoppingBag className="size-7 text-primary" />
		<h1 className="text-2xl font-bold @md:text-3xl">{text}</h1>
	</div>
);

const ItemThumbnail = ({ src, alt }: { src: string; alt: string }) => (
	<div className="relative aspect-square w-20 shrink-0 overflow-hidden rounded-xl bg-muted @sm:w-24">
		<Image src={src} alt={alt} fill className="object-cover" />
	</div>
);

const ItemInfo = ({
	name,
	variant,
	price,
}: {
	name: string;
	variant: string;
	price: number;
}) => (
	<div className="min-w-0 flex-1">
		<h3 className="font-medium line-clamp-1">{name}</h3>
		<p className="text-sm text-muted-foreground">{variant}</p>
		<p className="mt-1 font-bold text-primary">${price.toFixed(2)}</p>
	</div>
);

const QuantityBtns = ({ quantity }: { quantity: number }) => (
	<div className="flex items-center gap-1 rounded-lg border">
		<Button size="icon-sm" variant="ghost" className="size-8">
			<Minus className="size-3" />
		</Button>
		<span className="w-8 text-center text-sm font-medium">{quantity}</span>
		<Button size="icon-sm" variant="ghost" className="size-8">
			<Plus className="size-3" />
		</Button>
	</div>
);

const LineTotal = ({ amount }: { amount: number }) => (
	<p className="text-lg font-bold">${amount.toFixed(2)}</p>
);

const RemoveButton = () => (
	<Button
		size="icon-sm"
		variant="ghost"
		className="text-muted-foreground hover:text-destructive"
	>
		<X className="size-4" />
	</Button>
);

const ItemRow = ({ item }: { item: CartItem }) => (
	<div className="flex gap-4 py-4">
		<ItemThumbnail src={item.image} alt={item.name} />
		<div className="flex min-w-0 flex-1 items-center gap-4">
			<ItemInfo name={item.name} variant={item.variant} price={item.price} />
			<QuantityBtns quantity={item.quantity} />
			<LineTotal amount={item.price * item.quantity} />
			<RemoveButton />
		</div>
	</div>
);

const RewardsSlider = ({
	points,
	onChange,
	maxLabel,
	valueLabel,
}: {
	points: RewardPoints;
	onChange?: (value: number) => void;
	maxLabel: string;
	valueLabel: string;
}) => {
	const dollarValue = (points.toUse * points.valuePerPoint).toFixed(2);

	return (
		<Card className="border-primary/20 bg-gradient-to-br from-primary/5 to-transparent">
			<CardHeader className="pb-2">
				<CardTitle className="flex items-center gap-2 text-lg">
					<Wallet className="size-5 text-primary" />
					Reward Points
				</CardTitle>
			</CardHeader>
			<CardContent className="space-y-4">
				<div className="flex items-center justify-between text-sm">
					<span className="text-muted-foreground">{maxLabel}</span>
					<Badge variant="secondary">
						{points.available.toLocaleString()} pts
					</Badge>
				</div>
				<Slider
					value={[points.toUse]}
					max={points.available}
					step={100}
					className="py-2"
				/>
				<div className="flex items-center justify-between">
					<span className="text-sm text-muted-foreground">{valueLabel}</span>
					<div className="text-right">
						<p className="font-bold text-green-500">-${dollarValue}</p>
						<p className="text-xs text-muted-foreground">
							({points.toUse.toLocaleString()} pts)
						</p>
					</div>
				</div>
			</CardContent>
		</Card>
	);
};

const GiftCardInput = ({
	placeholder,
	applyLabel,
}: {
	placeholder: string;
	applyLabel: string;
}) => (
	<Card>
		<CardHeader className="pb-2">
			<CardTitle className="flex items-center gap-2 text-lg">
				<CreditCard className="size-5 text-primary" />
				Gift Card
			</CardTitle>
		</CardHeader>
		<CardContent>
			<div className="flex gap-2">
				<Input placeholder={placeholder} />
				<Button variant="outline">{applyLabel}</Button>
			</div>
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
	<div
		className={`flex justify-between ${variant === 'total' ? 'text-xl font-bold' : ''}`}
	>
		<span className={variant === 'total' ? '' : 'text-muted-foreground'}>
			{label}
		</span>
		<span
			className={
				variant === 'total'
					? 'text-primary'
					: variant === 'discount'
						? 'text-green-500'
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
	lines: {
		label: string;
		value: string;
		variant?: 'default' | 'discount' | 'total';
	}[];
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
			image:
				'https://images.unsplash.com/photo-1560769629-975ec94e6a86?w=200&h=200&fit=crop',
			name: 'Retro Basketball Sneakers',
			variant: 'White/Red • Size 10',
			price: 159.99,
			quantity: 1,
		},
		{
			id: '2',
			image:
				'https://images.unsplash.com/photo-1603252109303-2751441dd157?w=200&h=200&fit=crop',
			name: 'Premium Cotton Hoodie',
			variant: 'Black • Large',
			price: 89.99,
			quantity: 2,
		},
		{
			id: '3',
			image:
				'https://images.unsplash.com/photo-1556821840-3a63f95609a7?w=200&h=200&fit=crop',
			name: 'Slim Fit Cargo Pants',
			variant: 'Olive • 32W',
			price: 79.99,
			quantity: 1,
		},
	];

	const rewardPoints: RewardPoints = {
		available: 5000,
		toUse: 2000,
		valuePerPoint: 0.01,
	};

	const subtotal = items.reduce((sum, i) => sum + i.price * i.quantity, 0);
	const pointsDiscount = rewardPoints.toUse * rewardPoints.valuePerPoint;

	const summaryLines = [
		{ label: 'Subtotal', value: `$${subtotal.toFixed(2)}` },
		{
			label: 'Reward Points',
			value: `-$${pointsDiscount.toFixed(2)}`,
			variant: 'discount' as const,
		},
		{ label: 'Shipping', value: 'Free' },
		{
			label: 'Tax',
			value: `$${((subtotal - pointsDiscount) * 0.08).toFixed(2)}`,
		},
		{
			label: 'Total',
			value: `$${((subtotal - pointsDiscount) * 1.08).toFixed(2)}`,
			variant: 'total' as const,
		},
	];

	return (
		<section className="@container">
			<div className="mx-auto max-w-6xl px-4 py-8 @md:py-12 @xl:py-16">
				<Title text="Your Cart" />

				<div className="mt-8 grid gap-8 @xl:grid-cols-5">
					<div className="space-y-6 @xl:col-span-3">
						<Card>
							<CardContent className="divide-y p-4">
								{items.map((item) => (
									<ItemRow key={item.id} item={item} />
								))}
							</CardContent>
						</Card>

						<div className="grid gap-4 @md:grid-cols-2">
							<RewardsSlider
								points={rewardPoints}
								maxLabel="Available Points"
								valueLabel="Discount Applied"
							/>
							<GiftCardInput
								placeholder="Enter gift card code"
								applyLabel="Apply"
							/>
						</div>
					</div>

					<div className="@xl:col-span-2">
						<OrderSummary
							title="Order Summary"
							lines={summaryLines}
							checkoutLabel="Checkout"
							checkoutHref="/checkout"
						/>
					</div>
				</div>
			</div>
		</section>
	);
}
