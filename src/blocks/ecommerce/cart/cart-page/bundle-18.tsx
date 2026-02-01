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
import { Minus, Plus, X, Box, Layers, Check, ArrowRight } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';

interface BundleItem {
	id: string;
	image: string;
	name: string;
	originalPrice: number;
	bundlePrice: number;
}

interface Bundle {
	id: string;
	name: string;
	description: string;
	items: BundleItem[];
	quantity: number;
	totalOriginal: number;
	totalBundle: number;
}

interface SingleItem {
	id: string;
	image: string;
	name: string;
	variant: string;
	price: number;
	quantity: number;
}

const PageHeader = ({ title, count }: { title: string; count: number }) => (
	<div className="flex items-center gap-3">
		<Box className="size-6 text-primary" />
		<h1 className="text-2xl font-bold @md:text-3xl">{title}</h1>
		<Badge variant="secondary">{count} items</Badge>
	</div>
);

const BundleHeader = ({
	name,
	description,
	savings,
}: {
	name: string;
	description: string;
	savings: number;
}) => (
	<div className="flex items-start justify-between gap-4">
		<div className="flex items-start gap-3">
			<div className="rounded-lg bg-primary/10 p-2">
				<Layers className="size-5 text-primary" />
			</div>
			<div>
				<h3 className="font-semibold">{name}</h3>
				<p className="text-sm text-muted-foreground">{description}</p>
			</div>
		</div>
		<Badge className="bg-green-500/10 text-green-600 border-green-500/20">
			Save ${savings.toFixed(2)}
		</Badge>
	</div>
);

const BundleItemRow = ({ item }: { item: BundleItem }) => (
	<div className="flex items-center gap-3">
		<div className="relative size-12 shrink-0 overflow-hidden rounded-lg bg-muted">
			<Image src={item.image} alt={item.name} fill className="object-cover" />
		</div>
		<div className="flex-1 min-w-0">
			<p className="text-sm font-medium line-clamp-1">{item.name}</p>
		</div>
		<div className="text-right text-sm">
			<p className="text-muted-foreground line-through">
				${item.originalPrice.toFixed(2)}
			</p>
			<p className="font-medium text-green-600">
				${item.bundlePrice.toFixed(2)}
			</p>
		</div>
	</div>
);

const QuantityButton = ({ quantity }: { quantity: number }) => (
	<div className="flex items-center gap-1 rounded-lg border">
		<Button size="icon-sm" variant="ghost" className="size-8">
			<Minus className="size-3" />
		</Button>
		<span className="w-8 text-center font-medium">{quantity}</span>
		<Button size="icon-sm" variant="ghost" className="size-8">
			<Plus className="size-3" />
		</Button>
	</div>
);

const BundleTotal = ({
	original,
	discounted,
	quantity,
}: {
	original: number;
	discounted: number;
	quantity: number;
}) => (
	<div className="text-right">
		<p className="text-sm text-muted-foreground line-through">
			${(original * quantity).toFixed(2)}
		</p>
		<p className="text-xl font-bold text-primary">
			${(discounted * quantity).toFixed(2)}
		</p>
	</div>
);

const RemoveBundle = () => (
	<Button
		size="sm"
		variant="ghost"
		className="text-muted-foreground hover:text-destructive gap-1"
	>
		<X className="size-3" />
		Remove
	</Button>
);

const BundleCard = ({ bundle }: { bundle: Bundle }) => {
	const savings = bundle.totalOriginal - bundle.totalBundle;

	return (
		<Card className="border-primary/20 bg-gradient-to-br from-primary/5 to-transparent">
			<CardHeader className="pb-4">
				<BundleHeader
					name={bundle.name}
					description={bundle.description}
					savings={savings * bundle.quantity}
				/>
			</CardHeader>
			<CardContent className="space-y-4">
				<div className="space-y-3 rounded-lg bg-background/50 p-4">
					{bundle.items.map((item) => (
						<BundleItemRow key={item.id} item={item} />
					))}
				</div>
				<div className="flex items-center justify-between">
					<div className="flex items-center gap-4">
						<QuantityButton quantity={bundle.quantity} />
						<RemoveBundle />
					</div>
					<BundleTotal
						original={bundle.totalOriginal}
						discounted={bundle.totalBundle}
						quantity={bundle.quantity}
					/>
				</div>
			</CardContent>
		</Card>
	);
};

const SingleItemImage = ({ src, alt }: { src: string; alt: string }) => (
	<div className="relative size-16 shrink-0 overflow-hidden rounded-lg bg-muted">
		<Image src={src} alt={alt} fill className="object-cover" />
	</div>
);

const SingleItemInfo = ({
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
		<p className="mt-1 font-semibold">${price.toFixed(2)}</p>
	</div>
);

const SingleItemRow = ({ item }: { item: SingleItem }) => (
	<div className="flex items-center gap-4 py-3">
		<SingleItemImage src={item.image} alt={item.name} />
		<SingleItemInfo
			name={item.name}
			variant={item.variant}
			price={item.price}
		/>
		<QuantityButton quantity={item.quantity} />
		<p className="font-bold w-20 text-right">
			${(item.price * item.quantity).toFixed(2)}
		</p>
		<Button
			size="icon-sm"
			variant="ghost"
			className="text-muted-foreground hover:text-destructive"
		>
			<X className="size-4" />
		</Button>
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
					: variant === 'savings'
						? 'text-green-500 font-medium'
						: ''
			}
		>
			{value}
		</span>
	</div>
);

const SavingsSummary = ({
	items,
}: {
	items: { label: string; value: string }[];
}) => (
	<Card className="border-green-500/20 bg-green-500/5">
		<CardContent className="p-4 space-y-2">
			<div className="flex items-center gap-2 text-green-600 font-medium mb-3">
				<Check className="size-4" />
				<span>Your Savings</span>
			</div>
			{items.map((item, i) => (
				<div key={i} className="flex justify-between text-sm">
					<span className="text-muted-foreground">{item.label}</span>
					<span className="text-green-600">{item.value}</span>
				</div>
			))}
		</CardContent>
	</Card>
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
		variant?: 'default' | 'savings' | 'total';
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
					<PriceLine {...line} />
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
	const bundles: Bundle[] = [
		{
			id: 'b1',
			name: 'Home Office Essentials',
			description: '3 items bundled together',
			quantity: 1,
			totalOriginal: 449.97,
			totalBundle: 349.99,
			items: [
				{
					id: 'b1-1',
					image:
						'https://images.unsplash.com/photo-1527864550417-7fd91fc51a46?w=100&h=100&fit=crop',
					name: 'LED Desk Lamp',
					originalPrice: 79.99,
					bundlePrice: 59.99,
				},
				{
					id: 'b1-2',
					image:
						'https://images.unsplash.com/photo-1593062096033-9a26b09da705?w=100&h=100&fit=crop',
					name: 'Monitor Stand',
					originalPrice: 149.99,
					bundlePrice: 119.99,
				},
				{
					id: 'b1-3',
					image:
						'https://images.unsplash.com/photo-1618384887929-16ec33fab9ef?w=100&h=100&fit=crop',
					name: 'Wireless Keyboard',
					originalPrice: 219.99,
					bundlePrice: 170.01,
				},
			],
		},
	];

	const singleItems: SingleItem[] = [
		{
			id: 's1',
			image:
				'https://images.unsplash.com/photo-1606220588913-b3aacb4d2f46?w=100&h=100&fit=crop',
			name: 'Ergonomic Mouse Pad',
			variant: 'Black • Large',
			price: 24.99,
			quantity: 1,
		},
	];

	const savingsItems = [
		{ label: 'Bundle Discount', value: '-$99.98' },
		{ label: 'Free Shipping', value: '-$12.99' },
	];

	const summaryLines = [
		{ label: 'Subtotal', value: '$474.96' },
		{ label: 'Bundle Savings', value: '-$99.98', variant: 'savings' as const },
		{ label: 'Shipping', value: 'Free' },
		{ label: 'Tax', value: '$30.00' },
		{ label: 'Total', value: '$404.98', variant: 'total' as const },
	];

	return (
		<section className="@container">
			<div className="mx-auto max-w-6xl px-4 py-8 @md:py-12 @xl:py-16">
				<PageHeader
					title="Your Cart"
					count={
						bundles.reduce((sum, b) => sum + b.items.length, 0) +
						singleItems.length
					}
				/>

				<div className="mt-8 grid gap-8 @xl:grid-cols-5">
					<div className="space-y-6 @xl:col-span-3">
						{bundles.map((bundle) => (
							<BundleCard key={bundle.id} bundle={bundle} />
						))}

						{singleItems.length > 0 && (
							<Card>
								<CardHeader>
									<CardTitle className="text-lg">Individual Items</CardTitle>
								</CardHeader>
								<CardContent className="divide-y">
									{singleItems.map((item) => (
										<SingleItemRow key={item.id} item={item} />
									))}
								</CardContent>
							</Card>
						)}
					</div>

					<div className="space-y-4 @xl:col-span-2">
						<OrderSummary
							title="Order Summary"
							lines={summaryLines}
							checkoutLabel="Checkout"
							checkoutHref="/checkout"
						/>
						<SavingsSummary items={savingsItems} />
					</div>
				</div>
			</div>
		</section>
	);
}
