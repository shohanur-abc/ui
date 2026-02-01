'use client';

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
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import {
	ArrowRight,
	CreditCard,
	Gift,
	Lock,
	MapPin,
	Package,
	Shield,
	Sparkles,
	Tag,
	Truck,
} from 'lucide-react';
import Image from 'next/image';

interface Product {
	id: string;
	name: string;
	variant: string;
	price: number;
	quantity: number;
	image: string;
}

const TabHeader = ({
	icon: Icon,
	label,
}: {
	icon: React.ComponentType<{ className?: string }>;
	label: string;
}) => (
	<div className="flex items-center gap-2">
		<Icon className="size-4" />
		<span className="hidden @sm:inline">{label}</span>
	</div>
);

const ProductCard = ({ product }: { product: Product }) => (
	<div className="group relative flex gap-4 rounded-xl border bg-card p-4 transition-all hover:shadow-md">
		<div className="relative size-20 shrink-0 overflow-hidden rounded-lg bg-muted">
			<Image
				src={product.image}
				alt={product.name}
				fill
				className="object-cover transition-transform group-hover:scale-105"
			/>
		</div>
		<div className="flex flex-1 flex-col justify-between">
			<div>
				<h4 className="font-medium">{product.name}</h4>
				<p className="text-sm text-muted-foreground">{product.variant}</p>
			</div>
			<div className="flex items-center justify-between">
				<Badge variant="secondary">Qty: {product.quantity}</Badge>
				<span className="font-semibold">${product.price.toFixed(2)}</span>
			</div>
		</div>
	</div>
);

const InfoCard = ({
	icon: Icon,
	title,
	children,
}: {
	icon: React.ComponentType<{ className?: string }>;
	title: string;
	children: React.ReactNode;
}) => (
	<div className="rounded-xl border bg-card p-4">
		<div className="mb-3 flex items-center gap-2">
			<div className="flex size-8 items-center justify-center rounded-lg bg-primary/10">
				<Icon className="size-4 text-primary" />
			</div>
			<h4 className="font-medium">{title}</h4>
		</div>
		{children}
	</div>
);

const AddressInfo = ({
	name,
	street,
	city,
	phone,
}: {
	name: string;
	street: string;
	city: string;
	phone: string;
}) => (
	<div className="space-y-1 text-sm">
		<p className="font-medium">{name}</p>
		<p className="text-muted-foreground">{street}</p>
		<p className="text-muted-foreground">{city}</p>
		<p className="text-muted-foreground">{phone}</p>
	</div>
);

const ShippingMethod = ({
	name,
	estimate,
	price,
}: {
	name: string;
	estimate: string;
	price: string;
}) => (
	<div className="flex items-center justify-between">
		<div className="flex items-center gap-3">
			<Truck className="size-5 text-primary" />
			<div>
				<p className="font-medium">{name}</p>
				<p className="text-sm text-muted-foreground">{estimate}</p>
			</div>
		</div>
		<Badge variant="outline">{price}</Badge>
	</div>
);

const PaymentMethod = ({
	type,
	last4,
	expiry,
}: {
	type: string;
	last4: string;
	expiry: string;
}) => (
	<div className="flex items-center gap-4">
		<div className="flex size-12 items-center justify-center rounded-lg bg-gradient-to-br from-amber-500 to-orange-600">
			<CreditCard className="size-6 text-white" />
		</div>
		<div>
			<p className="font-medium">
				{type} ending in {last4}
			</p>
			<p className="text-sm text-muted-foreground">Expires {expiry}</p>
		</div>
	</div>
);

const PromoItem = ({
	code,
	description,
	discount,
}: {
	code: string;
	description: string;
	discount: string;
}) => (
	<div className="flex items-center justify-between rounded-lg bg-green-500/10 p-3">
		<div className="flex items-center gap-2">
			<Tag className="size-4 text-green-600 dark:text-green-400" />
			<div>
				<p className="font-mono text-sm font-medium">{code}</p>
				<p className="text-xs text-muted-foreground">{description}</p>
			</div>
		</div>
		<span className="font-medium text-green-600 dark:text-green-400">
			{discount}
		</span>
	</div>
);

const SummaryLine = ({
	label,
	value,
	large,
	green,
}: {
	label: string;
	value: string;
	large?: boolean;
	green?: boolean;
}) => (
	<div
		className={`flex justify-between ${large ? 'text-lg font-bold' : 'text-sm'}`}
	>
		<span className={large ? '' : 'text-muted-foreground'}>{label}</span>
		<span className={green ? 'text-green-600 dark:text-green-400' : ''}>
			{value}
		</span>
	</div>
);

export default function Main() {
	const products: Product[] = [
		{
			id: '1',
			name: 'Mechanical Keyboard',
			variant: 'Cherry MX Blue / RGB',
			price: 159.99,
			quantity: 1,
			image:
				'https://images.unsplash.com/photo-1511467687858-23d96c32e4ae?w=200&h=200&fit=crop',
		},
		{
			id: '2',
			name: 'Gaming Mouse',
			variant: 'Wireless / Black',
			price: 79.99,
			quantity: 1,
			image:
				'https://images.unsplash.com/photo-1527814050087-3793815479db?w=200&h=200&fit=crop',
		},
		{
			id: '3',
			name: 'Mouse Pad XL',
			variant: 'Extended / Dark',
			price: 29.99,
			quantity: 1,
			image:
				'https://images.unsplash.com/photo-1616763355548-1b606f439f86?w=200&h=200&fit=crop',
		},
	];

	return (
		<section className="@container relative overflow-hidden" data-theme="neon">
			<div className="mx-auto max-w-5xl px-4 py-12 @sm:px-6 @md:py-16 @xl:py-20 @2xl:px-8">
				<div className="mb-8 text-center">
					<Badge className="mb-4 gap-1.5">
						<Sparkles className="size-3.5" />
						Almost Done
					</Badge>
					<h1 className="text-2xl font-bold tracking-tight @md:text-3xl @lg:text-4xl">
						Review Your Order
					</h1>
					<p className="mt-2 text-muted-foreground">
						Click on each tab to review your order details
					</p>
				</div>

				<div className="grid gap-8 @xl:grid-cols-[1fr_360px]">
					<Tabs defaultValue="items" className="w-full">
						<TabsList className="w-full justify-start gap-1 bg-transparent p-0">
							<TabsTrigger
								value="items"
								className="data-[state=active]:bg-primary data-[state=active]:text-primary-foreground"
							>
								<TabHeader icon={Package} label="Items" />
							</TabsTrigger>
							<TabsTrigger
								value="shipping"
								className="data-[state=active]:bg-primary data-[state=active]:text-primary-foreground"
							>
								<TabHeader icon={MapPin} label="Shipping" />
							</TabsTrigger>
							<TabsTrigger
								value="payment"
								className="data-[state=active]:bg-primary data-[state=active]:text-primary-foreground"
							>
								<TabHeader icon={CreditCard} label="Payment" />
							</TabsTrigger>
							<TabsTrigger
								value="promos"
								className="data-[state=active]:bg-primary data-[state=active]:text-primary-foreground"
							>
								<TabHeader icon={Gift} label="Promos" />
							</TabsTrigger>
						</TabsList>

						<TabsContent value="items" className="mt-6 space-y-4">
							{products.map((product) => (
								<ProductCard key={product.id} product={product} />
							))}
						</TabsContent>

						<TabsContent
							value="shipping"
							className="mt-6 grid gap-4 @md:grid-cols-2"
						>
							<InfoCard icon={MapPin} title="Shipping Address">
								<AddressInfo
									name="David Park"
									street="888 Innovation Blvd, Unit 5"
									city="Los Angeles, CA 90001"
									phone="+1 (323) 555-0189"
								/>
							</InfoCard>
							<InfoCard icon={MapPin} title="Billing Address">
								<AddressInfo
									name="David Park"
									street="888 Innovation Blvd, Unit 5"
									city="Los Angeles, CA 90001"
									phone="+1 (323) 555-0189"
								/>
							</InfoCard>
							<div className="@md:col-span-2">
								<InfoCard icon={Truck} title="Delivery Method">
									<ShippingMethod
										name="Express Delivery"
										estimate="Dec 19-21, 2025"
										price="$12.99"
									/>
								</InfoCard>
							</div>
						</TabsContent>

						<TabsContent value="payment" className="mt-6">
							<InfoCard icon={CreditCard} title="Payment Method">
								<PaymentMethod type="Visa" last4="9999" expiry="11/27" />
								<div className="mt-4 flex items-center gap-2 rounded-lg bg-muted/50 p-3 text-sm text-muted-foreground">
									<Shield className="size-4" />
									<span>Your payment is protected by 256-bit encryption</span>
								</div>
							</InfoCard>
						</TabsContent>

						<TabsContent value="promos" className="mt-6 space-y-4">
							<PromoItem
								code="GAMER25"
								description="25% off gaming accessories"
								discount="-$67.49"
							/>
							<PromoItem
								code="FREESHIP"
								description="Free shipping promotion"
								discount="-$12.99"
							/>
							<div className="rounded-xl border border-dashed bg-muted/30 p-6 text-center">
								<Gift className="mx-auto mb-2 size-8 text-muted-foreground" />
								<p className="text-sm font-medium">Add Another Promo Code</p>
								<p className="text-xs text-muted-foreground">
									Enter code at checkout to apply
								</p>
							</div>
						</TabsContent>
					</Tabs>

					<div className="@xl:sticky @xl:top-8 @xl:self-start">
						<Card className="border-primary/20">
							<CardHeader>
								<CardTitle>Order Summary</CardTitle>
							</CardHeader>
							<CardContent className="space-y-3">
								<SummaryLine label="Subtotal (3 items)" value="$269.97" />
								<SummaryLine label="Shipping" value="$12.99" />
								<SummaryLine label="Tax" value="$22.95" />
								<SummaryLine label="Discounts" value="-$80.48" green />
								<Separator className="my-4" />
								<SummaryLine label="Total" value="$225.43" large />
							</CardContent>
							<CardFooter className="flex-col gap-3">
								<Button size="lg" className="w-full gap-2">
									Place Order
									<ArrowRight className="size-4" />
								</Button>
								<div className="flex items-center justify-center gap-2 text-xs text-muted-foreground">
									<Lock className="size-3" />
									<span>Secure checkout</span>
								</div>
							</CardFooter>
						</Card>
					</div>
				</div>
			</div>
		</section>
	);
}
