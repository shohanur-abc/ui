import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { Separator } from '@/components/ui/separator';
import { Minus, Plus, Trash2, Truck, Package, Clock, ChevronRight } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';

interface CartItem {
	id: string;
	image: string;
	name: string;
	variant: string;
	price: number;
	quantity: number;
	deliveryDate: string;
}

interface ShippingTier {
	threshold: number;
	label: string;
}

const FreeShippingProgress = ({
	current,
	threshold,
	progressLabel,
	completeLabel,
}: {
	current: number;
	threshold: number;
	progressLabel: string;
	completeLabel: string;
}) => {
	const progress = Math.min((current / threshold) * 100, 100);
	const remaining = threshold - current;

	return (
		<Card className="border-primary/20 bg-primary/5">
			<CardContent className="p-4">
				<div className="flex items-center gap-3 mb-3">
					<Truck className="size-5 text-primary" />
					<span className="font-medium">
						{remaining > 0 ? progressLabel.replace('{amount}', `$${remaining.toFixed(2)}`) : completeLabel}
					</span>
				</div>
				<Progress value={progress} className="h-2" />
			</CardContent>
		</Card>
	);
};

const ItemThumbnail = ({ src, alt }: { src: string; alt: string }) => (
	<div className="relative size-20 shrink-0 overflow-hidden rounded-lg bg-muted @sm:size-24">
		<Image src={src} alt={alt} fill className="object-cover" />
	</div>
);

const ItemHeader = ({ name, variant }: { name: string; variant: string }) => (
	<div>
		<h3 className="font-medium line-clamp-1">{name}</h3>
		<p className="text-sm text-muted-foreground">{variant}</p>
	</div>
);

const DeliveryEstimate = ({ icon: Icon, date }: { icon: React.ComponentType<{ className?: string }>; date: string }) => (
	<div className="flex items-center gap-2 text-sm text-muted-foreground">
		<Icon className="size-4" />
		<span>Delivery by {date}</span>
	</div>
);

const QuantityControl = ({ quantity }: { quantity: number }) => (
	<div className="flex items-center rounded-lg border bg-background">
		<Button size="icon-sm" variant="ghost" className="rounded-r-none">
			<Minus className="size-3" />
		</Button>
		<span className="w-10 text-center text-sm font-medium">{quantity}</span>
		<Button size="icon-sm" variant="ghost" className="rounded-l-none">
			<Plus className="size-3" />
		</Button>
	</div>
);

const PriceTag = ({ amount }: { amount: number }) => (
	<span className="text-lg font-bold">${amount.toFixed(2)}</span>
);

const DeleteButton = ({ label }: { label: string }) => (
	<Button variant="ghost" size="sm" className="gap-1 text-muted-foreground hover:text-destructive">
		<Trash2 className="size-4" />
		<span className="hidden @sm:inline">{label}</span>
	</Button>
);

const CartItemBlock = ({ item }: { item: CartItem }) => (
	<div className="flex gap-4 py-4">
		<ItemThumbnail src={item.image} alt={item.name} />
		<div className="flex min-w-0 flex-1 flex-col gap-2">
			<div className="flex items-start justify-between gap-2">
				<ItemHeader name={item.name} variant={item.variant} />
				<PriceTag amount={item.price * item.quantity} />
			</div>
			<DeliveryEstimate icon={Clock} date={item.deliveryDate} />
			<div className="mt-auto flex items-center justify-between">
				<QuantityControl quantity={item.quantity} />
				<DeleteButton label="Remove" />
			</div>
		</div>
	</div>
);

const PriceSummaryLine = ({
	label,
	value,
	isHighlighted,
	isFree,
}: {
	label: string;
	value: string;
	isHighlighted?: boolean;
	isFree?: boolean;
}) => (
	<div className={`flex justify-between ${isHighlighted ? 'text-xl font-bold' : ''}`}>
		<span className={isHighlighted ? '' : 'text-muted-foreground'}>{label}</span>
		<span className={isHighlighted ? 'text-primary' : isFree ? 'text-green-500 font-medium' : ''}>
			{value}
		</span>
	</div>
);

const OrderActions = ({
	primaryLabel,
	primaryHref,
	secondaryLabel,
	secondaryHref,
}: {
	primaryLabel: string;
	primaryHref: string;
	secondaryLabel: string;
	secondaryHref: string;
}) => (
	<div className="space-y-3">
		<Button className="w-full gap-2" size="lg" asChild>
			<Link href={primaryHref}>
				{primaryLabel}
				<ChevronRight className="size-4" />
			</Link>
		</Button>
		<Button variant="outline" className="w-full" asChild>
			<Link href={secondaryHref}>{secondaryLabel}</Link>
		</Button>
	</div>
);

const DeliveryInfo = ({ icon: Icon, title, description }: { icon: React.ComponentType<{ className?: string }>; title: string; description: string }) => (
	<div className="flex items-start gap-3 rounded-lg border p-4">
		<Icon className="size-5 text-primary shrink-0" />
		<div>
			<p className="font-medium">{title}</p>
			<p className="text-sm text-muted-foreground">{description}</p>
		</div>
	</div>
);

export default function Main() {
	const items: CartItem[] = [
		{
			id: '1',
			image: 'https://images.unsplash.com/photo-1622560480605-d83c853bc5c3?w=200&h=200&fit=crop',
			name: 'Ergonomic Office Chair Pro',
			variant: 'Mesh / Black',
			price: 449.99,
			quantity: 1,
			deliveryDate: 'Mar 15-18',
		},
		{
			id: '2',
			image: 'https://images.unsplash.com/photo-1593062096033-9a26b09da705?w=200&h=200&fit=crop',
			name: 'Adjustable Standing Desk',
			variant: '60" / Walnut',
			price: 599.99,
			quantity: 1,
			deliveryDate: 'Mar 20-25',
		},
		{
			id: '3',
			image: 'https://images.unsplash.com/photo-1527864550417-7fd91fc51a46?w=200&h=200&fit=crop',
			name: 'LED Desk Lamp with Wireless Charger',
			variant: 'White',
			price: 79.99,
			quantity: 2,
			deliveryDate: 'Mar 12-14',
		},
	];

	const subtotal = items.reduce((sum, item) => sum + item.price * item.quantity, 0);
	const freeShippingThreshold = 1500;

	return (
		<section className="@container">
			<div className="mx-auto max-w-6xl px-4 py-8 @md:py-12 @xl:py-16">
				<div className="flex items-center justify-between">
					<h1 className="text-2xl font-bold @md:text-3xl">Shopping Cart</h1>
					<Badge variant="secondary" className="text-sm">
						{items.length} items
					</Badge>
				</div>

				<div className="mt-6">
					<FreeShippingProgress
						current={subtotal}
						threshold={freeShippingThreshold}
						progressLabel="Add {amount} more for FREE shipping"
						completeLabel="You've unlocked FREE shipping!"
					/>
				</div>

				<div className="mt-8 grid gap-8 @xl:grid-cols-5">
					<div className="@xl:col-span-3">
						<Card>
							<CardContent className="divide-y p-4 @sm:p-6">
								{items.map((item) => (
									<CartItemBlock key={item.id} item={item} />
								))}
							</CardContent>
						</Card>
					</div>

					<div className="space-y-6 @xl:col-span-2">
						<Card>
							<CardContent className="p-6 space-y-4">
								<h2 className="font-semibold text-lg">Order Summary</h2>
								<PriceSummaryLine label="Subtotal" value={`$${subtotal.toFixed(2)}`} />
								<PriceSummaryLine
									label="Shipping"
									value={subtotal >= freeShippingThreshold ? 'FREE' : '$29.99'}
									isFree={subtotal >= freeShippingThreshold}
								/>
								<PriceSummaryLine label="Estimated Tax" value={`$${(subtotal * 0.08).toFixed(2)}`} />
								<Separator />
								<PriceSummaryLine
									label="Total"
									value={`$${(subtotal + (subtotal >= freeShippingThreshold ? 0 : 29.99) + subtotal * 0.08).toFixed(2)}`}
									isHighlighted
								/>
							</CardContent>
						</Card>

						<OrderActions
							primaryLabel="Proceed to Checkout"
							primaryHref="/checkout"
							secondaryLabel="Continue Shopping"
							secondaryHref="/shop"
						/>

						<div className="space-y-3">
							<DeliveryInfo
								icon={Truck}
								title="Free Shipping"
								description="On orders over $1,500"
							/>
							<DeliveryInfo
								icon={Package}
								title="Easy Returns"
								description="30-day return policy"
							/>
						</div>
					</div>
				</div>
			</div>
		</section>
	);
}
