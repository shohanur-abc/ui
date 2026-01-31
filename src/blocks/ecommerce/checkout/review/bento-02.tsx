import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import {
	ArrowRight,
	Box,
	Check,
	CheckCircle,
	CreditCard,
	Edit,
	Gift,
	MapPin,
	ShieldCheck,
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

const BentoTile = ({
	title,
	icon: Icon,
	span,
	verified,
	onEdit,
	children,
}: {
	title: string;
	icon: React.ComponentType<{ className?: string }>;
	span?: 'col-2' | 'row-2' | 'full';
	verified?: boolean;
	onEdit?: () => void;
	children: React.ReactNode;
}) => (
	<div
		className={`group relative overflow-hidden rounded-2xl border bg-card p-5 transition-all hover:border-primary/30 hover:shadow-lg hover:shadow-primary/5 ${
			span === 'col-2'
				? '@md:col-span-2'
				: span === 'row-2'
					? '@lg:row-span-2'
					: span === 'full'
						? '@md:col-span-2 @lg:col-span-3'
						: ''
		}`}
	>
		<div className="mb-4 flex items-center justify-between">
			<div className="flex items-center gap-3">
				<div className="flex size-10 items-center justify-center rounded-xl bg-primary/10">
					<Icon className="size-5 text-primary" />
				</div>
				<div>
					<h3 className="font-semibold">{title}</h3>
					{verified && (
						<div className="flex items-center gap-1 text-xs text-green-600 dark:text-green-400">
							<CheckCircle className="size-3" />
							Verified
						</div>
					)}
				</div>
			</div>
			{onEdit && (
				<Button
					variant="ghost"
					size="icon"
					className="size-8 opacity-0 transition-opacity group-hover:opacity-100"
					onClick={onEdit}
				>
					<Edit className="size-4" />
				</Button>
			)}
		</div>
		{children}
	</div>
);

const ProductCard = ({ item }: { item: CartItem }) => (
	<div className="flex gap-3 rounded-xl bg-muted/50 p-3">
		<div className="relative size-16 shrink-0 overflow-hidden rounded-lg">
			<Image src={item.image} alt={item.name} fill className="object-cover" />
		</div>
		<div className="flex flex-1 flex-col justify-between min-w-0">
			<div>
				<p className="truncate text-sm font-medium">{item.name}</p>
				<p className="text-xs text-muted-foreground">{item.variant}</p>
			</div>
			<div className="flex items-center justify-between">
				<span className="text-xs text-muted-foreground">×{item.quantity}</span>
				<span className="text-sm font-semibold">${item.price.toFixed(2)}</span>
			</div>
		</div>
	</div>
);

const AddressInfo = ({
	type,
	name,
	lines,
}: {
	type: string;
	name: string;
	lines: string[];
}) => (
	<div>
		<p className="mb-1 text-xs font-medium uppercase text-muted-foreground">{type}</p>
		<p className="font-medium">{name}</p>
		{lines.map((line, i) => (
			<p key={i} className="text-sm text-muted-foreground">
				{line}
			</p>
		))}
	</div>
);

const DeliveryInfo = ({
	method,
	date,
	price,
}: {
	method: string;
	date: string;
	price: string;
}) => (
	<div className="flex items-center gap-4 rounded-xl bg-muted/50 p-4">
		<Truck className="size-6 text-primary" />
		<div className="flex-1">
			<p className="font-medium">{method}</p>
			<p className="text-sm text-muted-foreground">{date}</p>
		</div>
		<Badge>{price}</Badge>
	</div>
);

const PaymentInfo = ({
	brand,
	last4,
	exp,
}: {
	brand: string;
	last4: string;
	exp: string;
}) => (
	<div className="flex items-center gap-4">
		<div className="flex size-14 items-center justify-center rounded-xl bg-gradient-to-br from-purple-500 to-indigo-600">
			<CreditCard className="size-7 text-white" />
		</div>
		<div>
			<p className="font-medium">{brand} •••• {last4}</p>
			<p className="text-sm text-muted-foreground">Expires {exp}</p>
		</div>
	</div>
);

const GiftWrap = ({ message }: { message: string }) => (
	<div className="flex items-start gap-3 rounded-xl bg-gradient-to-r from-amber-500/10 to-orange-500/10 p-4">
		<Gift className="mt-0.5 size-5 text-amber-600 dark:text-amber-400" />
		<div>
			<p className="font-medium">Gift wrap included</p>
			<p className="text-sm text-muted-foreground">&ldquo;{message}&rdquo;</p>
		</div>
	</div>
);

const SummaryLine = ({
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
	<div className={`flex justify-between ${bold ? 'text-lg font-bold' : 'text-sm'}`}>
		<span className={bold ? '' : 'text-muted-foreground'}>{label}</span>
		<span className={green ? 'text-green-600 dark:text-green-400' : ''}>{value}</span>
	</div>
);

export default function Main() {
	const items: CartItem[] = [
		{
			id: '1',
			name: 'Wireless Earbuds Pro',
			variant: 'Midnight Blue',
			price: 199.99,
			quantity: 1,
			image: 'https://images.unsplash.com/photo-1606220588913-b3aacb4d2f46?w=200&h=200&fit=crop',
		},
		{
			id: '2',
			name: 'Silicone Case',
			variant: 'Clear',
			price: 24.99,
			quantity: 2,
			image: 'https://images.unsplash.com/photo-1572569511254-d8f925fe2cbb?w=200&h=200&fit=crop',
		},
	];

	return (
		<section className="@container relative overflow-hidden" data-theme="neon">
			<div className="mx-auto max-w-6xl px-4 py-12 @sm:px-6 @md:py-16 @xl:py-20 @2xl:px-8">
				<div className="mb-10 text-center">
					<Badge variant="secondary" className="mb-4 gap-1.5">
						<Box className="size-3.5" />
						Order Review
					</Badge>
					<h1 className="text-3xl font-bold tracking-tight @md:text-4xl">
						Confirm Your Order
					</h1>
					<p className="mt-2 text-muted-foreground">
						Review all details before completing your purchase
					</p>
				</div>

				<div className="grid gap-4 @md:grid-cols-2 @lg:grid-cols-3">
					<BentoTile title="Order Items" icon={Box} span="col-2" verified onEdit={() => {}}>
						<div className="grid gap-3 @sm:grid-cols-2">
							{items.map((item) => (
								<ProductCard key={item.id} item={item} />
							))}
						</div>
					</BentoTile>

					<BentoTile title="Shipping" icon={MapPin} verified onEdit={() => {}}>
						<AddressInfo
							type="Ship to"
							name="Olivia Brown"
							lines={['500 Tech Drive', 'San Jose, CA 95110']}
						/>
					</BentoTile>

					<BentoTile title="Delivery" icon={Truck} verified onEdit={() => {}}>
						<DeliveryInfo
							method="Express Shipping"
							date="Arrives Dec 20-21, 2025"
							price="$12.99"
						/>
					</BentoTile>

					<BentoTile title="Payment" icon={CreditCard} verified onEdit={() => {}}>
						<PaymentInfo brand="Amex" last4="0000" exp="09/27" />
					</BentoTile>

					<BentoTile title="Gift Options" icon={Gift}>
						<GiftWrap message="Enjoy your new audio experience!" />
					</BentoTile>

					<Card className="@lg:row-span-2">
						<CardHeader>
							<CardTitle>Summary</CardTitle>
						</CardHeader>
						<CardContent className="space-y-3">
							<SummaryLine label="Subtotal (3 items)" value="$249.97" />
							<SummaryLine label="Shipping" value="$12.99" />
							<SummaryLine label="Gift Wrap" value="$5.99" />
							<SummaryLine label="Tax" value="$21.25" />
							<SummaryLine label="Promo" value="-$25.00" green />
							<Separator className="my-4" />
							<SummaryLine label="Total" value="$265.20" bold />
						</CardContent>
						<CardFooter className="flex-col gap-3">
							<Button size="lg" className="w-full gap-2">
								<ShieldCheck className="size-4" />
								Place Order
								<ArrowRight className="size-4" />
							</Button>
							<p className="text-center text-xs text-muted-foreground">
								30-day money-back guarantee
							</p>
						</CardFooter>
					</Card>
				</div>
			</div>
		</section>
	);
}
