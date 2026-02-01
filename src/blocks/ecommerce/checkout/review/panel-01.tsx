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
	ArrowLeft,
	ArrowRight,
	CheckCircle,
	CreditCard,
	Heart,
	Lock,
	MapPin,
	Package,
	Star,
	Truck,
} from 'lucide-react';
import Image from 'next/image';

interface OrderItem {
	id: string;
	name: string;
	variant: string;
	price: number;
	quantity: number;
	image: string;
	rating: number;
	favorite?: boolean;
}

const DetailPanel = ({
	title,
	icon: Icon,
	children,
	action,
}: {
	title: string;
	icon: React.ComponentType<{ className?: string }>;
	children: React.ReactNode;
	action?: React.ReactNode;
}) => (
	<div className="rounded-2xl border bg-card">
		<div className="flex items-center justify-between border-b px-5 py-4">
			<div className="flex items-center gap-3">
				<div className="flex size-10 items-center justify-center rounded-xl bg-primary/10">
					<Icon className="size-5 text-primary" />
				</div>
				<h3 className="font-semibold">{title}</h3>
			</div>
			{action}
		</div>
		<div className="p-5">{children}</div>
	</div>
);

const ItemCard = ({ item }: { item: OrderItem }) => (
	<div className="group relative flex gap-4 rounded-xl bg-muted/30 p-4 transition-colors hover:bg-muted/50">
		<div className="relative size-24 shrink-0 overflow-hidden rounded-lg">
			<Image src={item.image} alt={item.name} fill className="object-cover" />
			{item.favorite && (
				<div className="absolute right-1 top-1 rounded-full bg-background/80 p-1">
					<Heart className="size-3 fill-rose-500 text-rose-500" />
				</div>
			)}
		</div>
		<div className="flex flex-1 flex-col justify-between">
			<div>
				<p className="font-medium">{item.name}</p>
				<p className="text-sm text-muted-foreground">{item.variant}</p>
				<div className="mt-1 flex items-center gap-0.5">
					{Array.from({ length: 5 }).map((_, i) => (
						<Star
							key={i}
							className={`size-3 ${i < item.rating ? 'fill-amber-400 text-amber-400' : 'text-muted'}`}
						/>
					))}
				</div>
			</div>
			<div className="flex items-center justify-between">
				<Badge variant="secondary">Qty: {item.quantity}</Badge>
				<span className="text-lg font-bold">${item.price.toFixed(2)}</span>
			</div>
		</div>
	</div>
);

const AddressDisplay = ({
	type,
	name,
	lines,
	phone,
}: {
	type: string;
	name: string;
	lines: string[];
	phone: string;
}) => (
	<div className="rounded-xl bg-muted/30 p-4">
		<p className="mb-2 text-xs font-medium uppercase text-muted-foreground">
			{type}
		</p>
		<p className="font-medium">{name}</p>
		{lines.map((line, i) => (
			<p key={i} className="text-sm text-muted-foreground">
				{line}
			</p>
		))}
		<p className="mt-2 text-sm text-muted-foreground">{phone}</p>
	</div>
);

const DeliveryDisplay = ({
	method,
	date,
	cost,
}: {
	method: string;
	date: string;
	cost: string;
}) => (
	<div className="flex items-center gap-4 rounded-xl bg-muted/30 p-4">
		<div className="flex size-14 items-center justify-center rounded-full bg-primary/10">
			<Truck className="size-7 text-primary" />
		</div>
		<div className="flex-1">
			<p className="font-medium">{method}</p>
			<p className="text-sm text-muted-foreground">{date}</p>
		</div>
		<span className="text-lg font-bold">{cost}</span>
	</div>
);

const PaymentDisplay = ({
	brand,
	last4,
	exp,
}: {
	brand: string;
	last4: string;
	exp: string;
}) => (
	<div className="flex items-center gap-4 rounded-xl bg-muted/30 p-4">
		<div className="flex size-14 items-center justify-center rounded-xl bg-gradient-to-br from-violet-500 to-purple-600">
			<CreditCard className="size-7 text-white" />
		</div>
		<div>
			<p className="font-medium">
				{brand} •••• {last4}
			</p>
			<p className="text-sm text-muted-foreground">Expires {exp}</p>
		</div>
	</div>
);

const TotalRow = ({
	label,
	value,
	bold,
	discount,
}: {
	label: string;
	value: string;
	bold?: boolean;
	discount?: boolean;
}) => (
	<div
		className={`flex justify-between ${bold ? 'text-xl font-bold' : 'text-sm'}`}
	>
		<span className={bold ? '' : 'text-muted-foreground'}>{label}</span>
		<span className={discount ? 'text-green-600 dark:text-green-400' : ''}>
			{value}
		</span>
	</div>
);

const ConfirmBanner = () => (
	<div className="flex items-center gap-3 rounded-xl bg-gradient-to-r from-green-500/10 to-emerald-500/10 p-4">
		<CheckCircle className="size-6 text-green-600 dark:text-green-400" />
		<div>
			<p className="font-medium text-green-600 dark:text-green-400">
				Ready to confirm
			</p>
			<p className="text-sm text-muted-foreground">
				All details have been verified
			</p>
		</div>
	</div>
);

export default function Main() {
	const items: OrderItem[] = [
		{
			id: '1',
			name: 'Handmade Ceramic Vase',
			variant: 'Large / Earth Tones',
			price: 89.99,
			quantity: 1,
			image:
				'https://images.unsplash.com/photo-1578749556568-bc2c40e68b61?w=200&h=200&fit=crop',
			rating: 5,
			favorite: true,
		},
		{
			id: '2',
			name: 'Dried Flower Arrangement',
			variant: 'Mixed Bouquet',
			price: 45.99,
			quantity: 2,
			image:
				'https://images.unsplash.com/photo-1490750967868-88aa4486c946?w=200&h=200&fit=crop',
			rating: 4,
		},
	];

	return (
		<section className="@container relative overflow-hidden" data-theme="neon">
			<div className="mx-auto max-w-5xl px-4 py-12 @sm:px-6 @md:py-16 @xl:py-20 @2xl:px-8">
				<div className="mb-8">
					<Button variant="ghost" size="sm" className="mb-4 gap-1.5">
						<ArrowLeft className="size-4" />
						Back to Cart
					</Button>
					<h1 className="text-2xl font-bold tracking-tight @md:text-3xl">
						Review Your Order
					</h1>
					<p className="mt-1 text-muted-foreground">
						Verify all details before completing your purchase
					</p>
				</div>

				<div className="space-y-6">
					<ConfirmBanner />

					<DetailPanel title="Order Items" icon={Package}>
						<div className="grid gap-4 @md:grid-cols-2">
							{items.map((item) => (
								<ItemCard key={item.id} item={item} />
							))}
						</div>
					</DetailPanel>

					<div className="grid gap-6 @lg:grid-cols-2">
						<DetailPanel title="Shipping Address" icon={MapPin}>
							<AddressDisplay
								type="Ship to"
								name="Sophie Anderson"
								lines={['123 Garden Street', 'Portland, OR 97201']}
								phone="+1 (503) 555-0123"
							/>
						</DetailPanel>

						<DetailPanel title="Billing Address" icon={MapPin}>
							<AddressDisplay
								type="Bill to"
								name="Sophie Anderson"
								lines={['123 Garden Street', 'Portland, OR 97201']}
								phone="+1 (503) 555-0123"
							/>
						</DetailPanel>
					</div>

					<div className="grid gap-6 @lg:grid-cols-2">
						<DetailPanel title="Delivery" icon={Truck}>
							<DeliveryDisplay
								method="Express Delivery"
								date="Arrives Dec 21-22, 2025"
								cost="$9.99"
							/>
						</DetailPanel>

						<DetailPanel title="Payment" icon={CreditCard}>
							<PaymentDisplay brand="Visa" last4="4444" exp="12/26" />
						</DetailPanel>
					</div>

					<Card className="bg-gradient-to-br from-card to-muted/30">
						<CardHeader>
							<CardTitle>Order Summary</CardTitle>
						</CardHeader>
						<CardContent className="space-y-3">
							<TotalRow label="Subtotal (3 items)" value="$181.97" />
							<TotalRow label="Shipping" value="$9.99" />
							<TotalRow label="Tax" value="$15.47" />
							<TotalRow label="Promo (HOME15)" value="-$27.30" discount />
							<Separator className="my-4" />
							<TotalRow label="Total" value="$180.13" bold />
						</CardContent>
						<CardFooter className="flex-col gap-4 @md:flex-row">
							<Button variant="outline" className="w-full gap-2 @md:w-auto">
								<ArrowLeft className="size-4" />
								Edit Order
							</Button>
							<Button size="lg" className="w-full gap-2 @md:flex-1">
								<Lock className="size-4" />
								Complete Purchase
								<ArrowRight className="size-4" />
							</Button>
						</CardFooter>
					</Card>
				</div>
			</div>
		</section>
	);
}
