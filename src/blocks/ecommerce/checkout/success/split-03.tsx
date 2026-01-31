import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import {
	PartyPopper,
	Package,
	Clock,
	MapPin,
	ArrowRight,
	Calendar,
	Receipt,
} from 'lucide-react';
import Link from 'next/link';

interface ProductCardProps {
	name: string;
	price: number;
	quantity: number;
	currency: string;
}

interface TimelineEventProps {
	icon: React.ElementType;
	title: string;
	time: string;
	active: boolean;
}

interface CTAProps {
	items: {
		label: string;
		href: string;
		variant?: 'default' | 'outline' | 'ghost';
		icon?: React.ElementType;
	}[];
}

const CelebrationBanner = () => (
	<div className="relative h-full min-h-[250px] @lg:min-h-0 bg-gradient-to-br from-amber-400 via-orange-500 to-rose-500 flex items-center justify-center overflow-hidden">
		<div className="absolute inset-0">
			{[...Array(12)].map((_, i) => (
				<div
					key={i}
					className="absolute size-3 rounded-full bg-white/20"
					style={{
						top: `${Math.random() * 100}%`,
						left: `${Math.random() * 100}%`,
					}}
				/>
			))}
		</div>
		<div className="relative text-center text-white p-8">
			<PartyPopper className="size-16 mx-auto mb-4" />
			<h1 className="text-3xl @xl:text-4xl font-bold mb-2">Woohoo!</h1>
			<p className="text-white/80 text-lg">Your order is confirmed</p>
		</div>
	</div>
);

const OrderBadge = ({
	orderNumber,
	date,
}: {
	orderNumber: string;
	date: string;
}) => (
	<div className="flex items-center justify-between p-4 rounded-xl bg-muted/50 border">
		<div>
			<p className="text-xs text-muted-foreground">Order Number</p>
			<p className="font-mono font-bold">{orderNumber}</p>
		</div>
		<div className="text-right">
			<p className="text-xs text-muted-foreground">Placed On</p>
			<p className="font-medium">{date}</p>
		</div>
	</div>
);

const ProductCard = ({
	name,
	price,
	quantity,
	currency,
}: ProductCardProps) => (
	<div className="flex items-center gap-3 p-3 rounded-lg bg-muted/30">
		<div className="size-12 rounded-lg bg-muted flex items-center justify-center">
			<Package className="size-6 text-muted-foreground" />
		</div>
		<div className="flex-1 min-w-0">
			<p className="font-medium text-sm truncate">{name}</p>
			<p className="text-xs text-muted-foreground">Qty: {quantity}</p>
		</div>
		<p className="font-semibold text-sm">
			{currency}
			{price.toFixed(2)}
		</p>
	</div>
);

const ProductList = ({ products }: { products: ProductCardProps[] }) => (
	<div className="space-y-3">
		<h3 className="font-semibold text-sm">Items Ordered</h3>
		<div className="space-y-2">
			{products.map((product, i) => (
				<ProductCard key={i} {...product} />
			))}
		</div>
	</div>
);

const TimelineEvent = ({
	icon: Icon,
	title,
	time,
	active,
}: TimelineEventProps) => (
	<div className="flex items-center gap-3">
		<div
			className={`size-8 rounded-full flex items-center justify-center ${active ? 'bg-primary text-primary-foreground' : 'bg-muted text-muted-foreground'}`}
		>
			<Icon className="size-4" />
		</div>
		<div className="flex-1">
			<p className={`text-sm ${active ? 'font-medium' : 'text-muted-foreground'}`}>
				{title}
			</p>
		</div>
		<p className="text-xs text-muted-foreground">{time}</p>
	</div>
);

const Timeline = ({ events }: { events: TimelineEventProps[] }) => (
	<Card>
		<CardContent className="pt-6 space-y-4">
			<h3 className="font-semibold text-sm">Order Timeline</h3>
			<div className="space-y-3">
				{events.map((event, i) => (
					<TimelineEvent key={i} {...event} />
				))}
			</div>
		</CardContent>
	</Card>
);

const DeliveryInfo = ({
	address,
	date,
}: {
	address: string;
	date: string;
}) => (
	<div className="grid grid-cols-2 gap-4">
		<div className="p-4 rounded-xl bg-muted/50">
			<div className="flex items-center gap-2 mb-2">
				<MapPin className="size-4 text-muted-foreground" />
				<p className="text-xs text-muted-foreground">Delivery Address</p>
			</div>
			<p className="text-sm font-medium">{address}</p>
		</div>
		<div className="p-4 rounded-xl bg-muted/50">
			<div className="flex items-center gap-2 mb-2">
				<Calendar className="size-4 text-muted-foreground" />
				<p className="text-xs text-muted-foreground">Expected By</p>
			</div>
			<p className="text-sm font-medium">{date}</p>
		</div>
	</div>
);

const TotalSection = ({
	total,
	currency,
}: {
	total: number;
	currency: string;
}) => (
	<div className="flex items-center justify-between p-4 rounded-xl bg-primary/5 border border-primary/20">
		<div className="flex items-center gap-2">
			<Receipt className="size-5 text-primary" />
			<span className="font-medium">Order Total</span>
		</div>
		<span className="text-xl font-bold">
			{currency}
			{total.toFixed(2)}
		</span>
	</div>
);

const CTA = ({ items }: CTAProps) => (
	<div className="flex gap-3">
		{items.map(({ label, href, variant, icon: Icon }, i) => (
			<Button
				key={i}
				size="lg"
				variant={variant || 'default'}
				className="flex-1 gap-2"
				asChild
			>
				<Link href={href}>
					{label}
					{Icon && <Icon className="size-4" />}
				</Link>
			</Button>
		))}
	</div>
);

export default function Main() {
	const products: ProductCardProps[] = [
		{ name: 'Smart Watch Pro', price: 399.99, quantity: 1, currency: '$' },
		{ name: 'Wireless Charger', price: 49.99, quantity: 2, currency: '$' },
	];

	const events: TimelineEventProps[] = [
		{ icon: Package, title: 'Order Confirmed', time: '2:30 PM', active: true },
		{ icon: Clock, title: 'Processing', time: 'Soon', active: false },
		{ icon: MapPin, title: 'Shipped', time: 'Pending', active: false },
	];

	return (
		<section className="@container min-h-screen py-12 @md:py-16 @xl:py-20">
			<div className="mx-auto max-w-6xl px-4 @sm:px-6 @2xl:px-8">
				<div className="grid @lg:grid-cols-5 gap-0 rounded-2xl overflow-hidden border">
					<div className="@lg:col-span-2">
						<CelebrationBanner />
					</div>

					<div className="@lg:col-span-3 p-6 @lg:p-8 space-y-6">
						<OrderBadge orderNumber="ORD-2024-78432" date="Jan 15, 2024" />

						<ProductList products={products} />

						<DeliveryInfo
							address="123 Main St, New York, NY"
							date="Jan 20-22, 2024"
						/>

						<Timeline events={events} />

						<TotalSection total={499.97} currency="$" />

						<CTA
							items={[
								{ label: 'Track Order', href: '/track', icon: ArrowRight },
								{ label: 'Shop More', href: '/shop', variant: 'outline' },
							]}
						/>
					</div>
				</div>
			</div>
		</section>
	);
}
