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
import { Progress } from '@/components/ui/progress';
import { Separator } from '@/components/ui/separator';
import {
	ArrowRight,
	Award,
	CheckCircle,
	CreditCard,
	Gift,
	Lock,
	MapPin,
	Package,
	Percent,
	Shield,
	Star,
	Truck,
} from 'lucide-react';
import Image from 'next/image';

interface Product {
	id: string;
	name: string;
	desc: string;
	price: number;
	qty: number;
	img: string;
	rating: number;
}

const SectionIcon = ({
	icon: Icon,
	verified,
}: {
	icon: React.ComponentType<{ className?: string }>;
	verified?: boolean;
}) => (
	<div className="relative">
		<div className="flex size-10 items-center justify-center rounded-xl bg-primary/10">
			<Icon className="size-5 text-primary" />
		</div>
		{verified && (
			<CheckCircle className="absolute -right-1 -top-1 size-4 rounded-full bg-background text-green-500" />
		)}
	</div>
);

const ProductEntry = ({ product }: { product: Product }) => (
	<div className="flex gap-4 py-3">
		<div className="relative size-20 shrink-0 overflow-hidden rounded-xl bg-muted">
			<Image
				src={product.img}
				alt={product.name}
				fill
				className="object-cover"
			/>
		</div>
		<div className="flex flex-1 flex-col justify-between">
			<div>
				<p className="font-medium">{product.name}</p>
				<p className="text-sm text-muted-foreground">{product.desc}</p>
				<div className="mt-1 flex items-center gap-1">
					{Array.from({ length: 5 }).map((_, i) => (
						<Star
							key={i}
							className={`size-3 ${i < product.rating ? 'fill-amber-400 text-amber-400' : 'text-muted'}`}
						/>
					))}
				</div>
			</div>
			<div className="flex items-center justify-between">
				<span className="text-sm text-muted-foreground">
					Qty: {product.qty}
				</span>
				<span className="font-semibold">${product.price.toFixed(2)}</span>
			</div>
		</div>
	</div>
);

const AddressCard = ({
	title,
	name,
	address,
}: {
	title: string;
	name: string;
	address: string[];
}) => (
	<div className="rounded-xl border bg-card p-4">
		<p className="mb-2 text-xs font-medium uppercase text-muted-foreground">
			{title}
		</p>
		<p className="font-medium">{name}</p>
		{address.map((line, i) => (
			<p key={i} className="text-sm text-muted-foreground">
				{line}
			</p>
		))}
	</div>
);

const DeliveryDetail = ({
	method,
	date,
	price,
}: {
	method: string;
	date: string;
	price: string;
}) => (
	<div className="flex items-center gap-4 rounded-xl border bg-card p-4">
		<Truck className="size-6 text-primary" />
		<div className="flex-1">
			<p className="font-medium">{method}</p>
			<p className="text-sm text-muted-foreground">{date}</p>
		</div>
		<Badge>{price}</Badge>
	</div>
);

const PaymentDetail = ({
	brand,
	last4,
	exp,
}: {
	brand: string;
	last4: string;
	exp: string;
}) => (
	<div className="flex items-center gap-4 rounded-xl border bg-card p-4">
		<div className="flex size-12 items-center justify-center rounded-xl bg-gradient-to-br from-amber-500 to-orange-500">
			<CreditCard className="size-6 text-white" />
		</div>
		<div>
			<p className="font-medium">
				{brand} •••• {last4}
			</p>
			<p className="text-sm text-muted-foreground">Expires {exp}</p>
		</div>
	</div>
);

const PromoApplied = ({
	code,
	discount,
}: {
	code: string;
	discount: string;
}) => (
	<div className="flex items-center justify-between rounded-xl bg-green-500/10 p-4">
		<div className="flex items-center gap-3">
			<Percent className="size-5 text-green-600 dark:text-green-400" />
			<span className="font-mono font-medium">{code}</span>
		</div>
		<span className="font-semibold text-green-600 dark:text-green-400">
			{discount}
		</span>
	</div>
);

const RewardPoints = ({
	points,
	progress,
}: {
	points: number;
	progress: number;
}) => (
	<div className="space-y-3 rounded-xl border bg-card p-4">
		<div className="flex items-center justify-between">
			<div className="flex items-center gap-2">
				<Award className="size-5 text-amber-500" />
				<span className="font-medium">Reward Points</span>
			</div>
			<Badge variant="secondary">+{points} pts</Badge>
		</div>
		<Progress value={progress} className="h-2" />
		<p className="text-xs text-muted-foreground">
			{100 - progress}% more to reach Gold status
		</p>
	</div>
);

const PriceLine = ({
	label,
	value,
	bold,
	green,
}: {
	label: string;
	value: string;
	bold?: boolean;
	green?: boolean;
}) => (
	<div
		className={`flex justify-between ${bold ? 'text-lg font-bold' : 'text-sm'}`}
	>
		<span className={bold ? '' : 'text-muted-foreground'}>{label}</span>
		<span className={green ? 'text-green-600 dark:text-green-400' : ''}>
			{value}
		</span>
	</div>
);

export default function Main() {
	const products: Product[] = [
		{
			id: '1',
			name: 'Noise Cancelling Headphones',
			desc: 'Over-ear / Space Gray',
			price: 349.99,
			qty: 1,
			img: 'https://images.unsplash.com/photo-1546435770-a3e426bf472b?w=200&h=200&fit=crop',
			rating: 5,
		},
		{
			id: '2',
			name: 'Headphone Stand',
			desc: 'Aluminum / Silver',
			price: 49.99,
			qty: 1,
			img: 'https://images.unsplash.com/photo-1583394838336-acd977736f90?w=200&h=200&fit=crop',
			rating: 4,
		},
	];

	return (
		<section className="@container relative overflow-hidden" data-theme="neon">
			<div className="mx-auto max-w-4xl px-4 py-12 @sm:px-6 @md:py-16 @xl:py-20 @2xl:px-8">
				<div className="mb-8">
					<Badge variant="secondary" className="mb-4 gap-1.5">
						<Gift className="size-3.5" />
						Rewards Member
					</Badge>
					<h1 className="text-2xl font-bold tracking-tight @md:text-3xl">
						Review Your Order
					</h1>
					<p className="mt-1 text-muted-foreground">
						Expand sections to view and edit details
					</p>
				</div>

				<div className="grid gap-6 @lg:grid-cols-[1fr_340px]">
					<Accordion
						type="multiple"
						defaultValue={[
							'items',
							'addresses',
							'delivery',
							'payment',
							'promos',
						]}
						className="space-y-3"
					>
						<AccordionItem
							value="items"
							className="rounded-2xl border bg-card px-5"
						>
							<AccordionTrigger className="gap-3 hover:no-underline">
								<SectionIcon icon={Package} verified />
								<div className="flex-1 text-left">
									<p className="font-semibold">Order Items</p>
									<p className="text-sm text-muted-foreground">2 items</p>
								</div>
							</AccordionTrigger>
							<AccordionContent className="divide-y pb-4">
								{products.map((product) => (
									<ProductEntry key={product.id} product={product} />
								))}
							</AccordionContent>
						</AccordionItem>

						<AccordionItem
							value="addresses"
							className="rounded-2xl border bg-card px-5"
						>
							<AccordionTrigger className="gap-3 hover:no-underline">
								<SectionIcon icon={MapPin} verified />
								<div className="flex-1 text-left">
									<p className="font-semibold">Addresses</p>
									<p className="text-sm text-muted-foreground">
										Shipping & billing
									</p>
								</div>
							</AccordionTrigger>
							<AccordionContent className="grid gap-4 pb-4 @sm:grid-cols-2">
								<AddressCard
									title="Ship To"
									name="Chris Taylor"
									address={['100 Music Lane', 'Nashville, TN 37201']}
								/>
								<AddressCard
									title="Bill To"
									name="Chris Taylor"
									address={['100 Music Lane', 'Nashville, TN 37201']}
								/>
							</AccordionContent>
						</AccordionItem>

						<AccordionItem
							value="delivery"
							className="rounded-2xl border bg-card px-5"
						>
							<AccordionTrigger className="gap-3 hover:no-underline">
								<SectionIcon icon={Truck} verified />
								<div className="flex-1 text-left">
									<p className="font-semibold">Delivery</p>
									<p className="text-sm text-muted-foreground">
										Priority shipping
									</p>
								</div>
							</AccordionTrigger>
							<AccordionContent className="pb-4">
								<DeliveryDetail
									method="Priority Express"
									date="Arrives Dec 18-19, 2025"
									price="$19.99"
								/>
							</AccordionContent>
						</AccordionItem>

						<AccordionItem
							value="payment"
							className="rounded-2xl border bg-card px-5"
						>
							<AccordionTrigger className="gap-3 hover:no-underline">
								<SectionIcon icon={CreditCard} verified />
								<div className="flex-1 text-left">
									<p className="font-semibold">Payment</p>
									<p className="text-sm text-muted-foreground">
										Visa ending 7890
									</p>
								</div>
							</AccordionTrigger>
							<AccordionContent className="pb-4">
								<PaymentDetail brand="Visa" last4="7890" exp="06/27" />
							</AccordionContent>
						</AccordionItem>

						<AccordionItem
							value="promos"
							className="rounded-2xl border bg-card px-5"
						>
							<AccordionTrigger className="gap-3 hover:no-underline">
								<SectionIcon icon={Percent} verified />
								<div className="flex-1 text-left">
									<p className="font-semibold">Promotions</p>
									<p className="text-sm text-muted-foreground">
										1 code applied
									</p>
								</div>
							</AccordionTrigger>
							<AccordionContent className="pb-4">
								<PromoApplied code="AUDIO15" discount="-$60.00" />
							</AccordionContent>
						</AccordionItem>
					</Accordion>

					<div className="space-y-4 @lg:sticky @lg:top-8 @lg:self-start">
						<RewardPoints points={450} progress={68} />

						<Card className="bg-gradient-to-br from-card to-card/50">
							<CardHeader>
								<CardTitle>Order Summary</CardTitle>
							</CardHeader>
							<CardContent className="space-y-3">
								<PriceLine label="Subtotal" value="$399.98" />
								<PriceLine label="Shipping" value="$19.99" />
								<PriceLine label="Tax" value="$33.60" />
								<PriceLine label="Discount" value="-$60.00" green />
								<Separator className="my-4" />
								<PriceLine label="Total" value="$393.57" bold />
							</CardContent>
							<CardFooter className="flex-col gap-3">
								<Button size="lg" className="w-full gap-2">
									<Lock className="size-4" />
									Complete Order
									<ArrowRight className="size-4" />
								</Button>
								<div className="flex items-center justify-center gap-2 text-xs text-muted-foreground">
									<Shield className="size-3" />
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
