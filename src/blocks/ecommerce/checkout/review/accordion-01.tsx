'use client';

import {
	Accordion,
	AccordionContent,
	AccordionItem,
	AccordionTrigger,
} from '@/components/ui/accordion';
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
	ArrowRight,
	Check,
	CreditCard,
	FileText,
	Gift,
	MapPin,
	Package,
	Percent,
	Shield,
	ShoppingBag,
	Truck,
} from 'lucide-react';
import Image from 'next/image';

interface CartItem {
	id: string;
	name: string;
	variant: string;
	price: number;
	quantity: number;
	image: string;
}

const AccordionHeader = ({
	icon: Icon,
	title,
	isComplete,
}: {
	icon: React.ComponentType<{ className?: string }>;
	title: string;
	isComplete?: boolean;
}) => (
	<div className="flex items-center gap-3">
		<div
			className={`flex size-8 items-center justify-center rounded-full ${
				isComplete
					? 'bg-green-500/10 text-green-500'
					: 'bg-primary/10 text-primary'
			}`}
		>
			{isComplete ? <Check className="size-4" /> : <Icon className="size-4" />}
		</div>
		<span className="font-medium">{title}</span>
		{isComplete && (
			<Badge
				variant="outline"
				className="ml-auto mr-4 text-xs text-green-600 border-green-600/30"
			>
				Verified
			</Badge>
		)}
	</div>
);

const ItemCard = ({ item }: { item: CartItem }) => (
	<div className="flex items-center gap-4 rounded-lg bg-muted/30 p-3">
		<div className="relative size-16 shrink-0 overflow-hidden rounded-md bg-muted">
			<Image src={item.image} alt={item.name} fill className="object-cover" />
		</div>
		<div className="flex-1 min-w-0">
			<p className="truncate font-medium">{item.name}</p>
			<p className="text-sm text-muted-foreground">{item.variant}</p>
			<p className="text-sm text-muted-foreground">Qty: {item.quantity}</p>
		</div>
		<span className="font-semibold">${item.price.toFixed(2)}</span>
	</div>
);

const AddressDisplay = ({
	type,
	name,
	address,
	city,
	phone,
}: {
	type: string;
	name: string;
	address: string;
	city: string;
	phone: string;
}) => (
	<div className="rounded-lg border bg-card p-4">
		<p className="mb-2 text-xs font-medium uppercase tracking-wider text-muted-foreground">
			{type}
		</p>
		<p className="font-medium">{name}</p>
		<p className="text-sm text-muted-foreground">{address}</p>
		<p className="text-sm text-muted-foreground">{city}</p>
		<p className="mt-2 text-sm text-muted-foreground">{phone}</p>
	</div>
);

const ShippingOption = ({
	name,
	duration,
	price,
	selected,
}: {
	name: string;
	duration: string;
	price: string;
	selected?: boolean;
}) => (
	<div
		className={`flex items-center justify-between rounded-lg border p-4 ${
			selected ? 'border-primary bg-primary/5' : 'bg-card'
		}`}
	>
		<div className="flex items-center gap-3">
			<Truck
				className={`size-5 ${selected ? 'text-primary' : 'text-muted-foreground'}`}
			/>
			<div>
				<p className="font-medium">{name}</p>
				<p className="text-sm text-muted-foreground">{duration}</p>
			</div>
		</div>
		<div className="flex items-center gap-2">
			<span className="font-medium">{price}</span>
			{selected && <Check className="size-4 text-primary" />}
		</div>
	</div>
);

const PaymentCard = ({
	type,
	last4,
	expiry,
}: {
	type: string;
	last4: string;
	expiry: string;
}) => (
	<div className="flex items-center gap-4 rounded-lg border bg-card p-4">
		<div className="flex size-12 items-center justify-center rounded-lg bg-gradient-to-br from-slate-700 to-slate-900">
			<CreditCard className="size-6 text-white" />
		</div>
		<div className="flex-1">
			<p className="font-medium">
				{type} •••• {last4}
			</p>
			<p className="text-sm text-muted-foreground">Expires {expiry}</p>
		</div>
		<Badge variant="secondary">Default</Badge>
	</div>
);

const PromoCode = ({ code, discount }: { code: string; discount: string }) => (
	<div className="flex items-center justify-between rounded-lg bg-green-500/10 p-3">
		<div className="flex items-center gap-2">
			<Percent className="size-4 text-green-600 dark:text-green-400" />
			<span className="font-mono text-sm font-medium">{code}</span>
		</div>
		<span className="font-medium text-green-600 dark:text-green-400">
			{discount}
		</span>
	</div>
);

const SummaryLine = ({
	label,
	value,
	isTotal,
}: {
	label: string;
	value: string;
	isTotal?: boolean;
}) => (
	<div
		className={`flex justify-between ${isTotal ? 'text-lg font-bold' : 'text-sm'}`}
	>
		<span className={isTotal ? '' : 'text-muted-foreground'}>{label}</span>
		<span>{value}</span>
	</div>
);

export default function Main() {
	const items: CartItem[] = [
		{
			id: '1',
			name: 'Wireless Earbuds Pro',
			variant: 'White',
			price: 179.99,
			quantity: 1,
			image:
				'https://images.unsplash.com/photo-1590658268037-6bf12165a8df?w=200&h=200&fit=crop',
		},
		{
			id: '2',
			name: 'Charging Case',
			variant: 'Standard',
			price: 49.99,
			quantity: 1,
			image:
				'https://images.unsplash.com/photo-1585386959984-a4155224a1ad?w=200&h=200&fit=crop',
		},
	];

	return (
		<section className="@container relative overflow-hidden" data-theme="neon">
			<div className="mx-auto max-w-4xl px-4 py-12 @sm:px-6 @md:py-16 @xl:py-20 @2xl:px-8">
				<div className="mb-8 flex items-center gap-3">
					<div className="flex size-12 items-center justify-center rounded-xl bg-primary/10">
						<ShoppingBag className="size-6 text-primary" />
					</div>
					<div>
						<h1 className="text-2xl font-bold @md:text-3xl">Order Review</h1>
						<p className="text-sm text-muted-foreground">
							Expand each section to review details
						</p>
					</div>
				</div>

				<div className="grid gap-6 @lg:grid-cols-[1fr_320px]">
					<Accordion
						type="multiple"
						defaultValue={['items', 'shipping', 'payment', 'promos']}
						className="space-y-4"
					>
						<AccordionItem
							value="items"
							className="rounded-xl border bg-card px-4"
						>
							<AccordionTrigger className="hover:no-underline">
								<AccordionHeader
									icon={Package}
									title="Order Items (2)"
									isComplete
								/>
							</AccordionTrigger>
							<AccordionContent className="space-y-3 pb-4">
								{items.map((item) => (
									<ItemCard key={item.id} item={item} />
								))}
							</AccordionContent>
						</AccordionItem>

						<AccordionItem
							value="address"
							className="rounded-xl border bg-card px-4"
						>
							<AccordionTrigger className="hover:no-underline">
								<AccordionHeader icon={MapPin} title="Addresses" isComplete />
							</AccordionTrigger>
							<AccordionContent className="grid gap-4 pb-4 @md:grid-cols-2">
								<AddressDisplay
									type="Shipping"
									name="Alex Rivera"
									address="321 Maple Lane"
									city="Seattle, WA 98101"
									phone="+1 (206) 555-0147"
								/>
								<AddressDisplay
									type="Billing"
									name="Alex Rivera"
									address="321 Maple Lane"
									city="Seattle, WA 98101"
									phone="+1 (206) 555-0147"
								/>
							</AccordionContent>
						</AccordionItem>

						<AccordionItem
							value="shipping"
							className="rounded-xl border bg-card px-4"
						>
							<AccordionTrigger className="hover:no-underline">
								<AccordionHeader
									icon={Truck}
									title="Shipping Method"
									isComplete
								/>
							</AccordionTrigger>
							<AccordionContent className="space-y-3 pb-4">
								<ShippingOption
									name="Express Delivery"
									duration="2-3 business days"
									price="$9.99"
									selected
								/>
								<div className="flex items-center gap-2 rounded-lg bg-primary/5 px-3 py-2 text-sm">
									<Gift className="size-4 text-primary" />
									<span>Arrives by December 22-24</span>
								</div>
							</AccordionContent>
						</AccordionItem>

						<AccordionItem
							value="payment"
							className="rounded-xl border bg-card px-4"
						>
							<AccordionTrigger className="hover:no-underline">
								<AccordionHeader icon={CreditCard} title="Payment" isComplete />
							</AccordionTrigger>
							<AccordionContent className="pb-4">
								<PaymentCard type="Mastercard" last4="5678" expiry="03/27" />
							</AccordionContent>
						</AccordionItem>

						<AccordionItem
							value="promos"
							className="rounded-xl border bg-card px-4"
						>
							<AccordionTrigger className="hover:no-underline">
								<AccordionHeader icon={Percent} title="Promotions" isComplete />
							</AccordionTrigger>
							<AccordionContent className="pb-4">
								<PromoCode code="HOLIDAY20" discount="-$46.00" />
							</AccordionContent>
						</AccordionItem>
					</Accordion>

					<div className="@lg:sticky @lg:top-8 @lg:self-start">
						<Card>
							<CardHeader>
								<CardTitle className="flex items-center gap-2">
									<FileText className="size-5" />
									Summary
								</CardTitle>
							</CardHeader>
							<CardContent className="space-y-3">
								<SummaryLine label="Subtotal" value="$229.98" />
								<SummaryLine label="Shipping" value="$9.99" />
								<SummaryLine label="Tax" value="$19.55" />
								<div className="flex justify-between text-sm text-green-600 dark:text-green-400">
									<span>Discount</span>
									<span>-$46.00</span>
								</div>
								<Separator className="my-4" />
								<SummaryLine label="Total" value="$213.52" isTotal />
							</CardContent>
							<CardFooter className="flex-col gap-3">
								<Button size="lg" className="w-full gap-2">
									Place Order
									<ArrowRight className="size-4" />
								</Button>
								<div className="flex items-center justify-center gap-2 text-xs text-muted-foreground">
									<Shield className="size-3.5" />
									<span>Secure checkout powered by Stripe</span>
								</div>
							</CardFooter>
						</Card>
					</div>
				</div>
			</div>
		</section>
	);
}
