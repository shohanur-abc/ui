import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import {
	CheckCircle,
	Store,
	QrCode,
	Clock,
	MapPin,
	Phone,
	Car,
	Package,
	Navigation,
} from 'lucide-react';
import Link from 'next/link';

interface PickupInfoProps {
	icon: React.ElementType;
	label: string;
	value: string;
}

interface OrderItemProps {
	name: string;
	quantity: number;
	price: string;
}

interface CTAProps {
	items: {
		label: string;
		href: string;
		variant?: 'default' | 'outline' | 'ghost';
		icon?: React.ElementType;
	}[];
}

const PageHeader = ({ orderNumber }: { orderNumber: string }) => (
	<div className="text-center space-y-4">
		<div className="size-20 mx-auto rounded-full bg-emerald-500/10 flex items-center justify-center">
			<CheckCircle className="size-10 text-emerald-500" />
		</div>
		<div>
			<h1 className="text-2xl @lg:text-4xl font-bold">Ready for Pickup!</h1>
			<p className="text-muted-foreground">Order #{orderNumber}</p>
		</div>
	</div>
);

const PickupTimeCard = ({
	date,
	timeSlot,
}: {
	date: string;
	timeSlot: string;
}) => (
	<Card className="bg-emerald-500 text-white border-0">
		<CardContent className="pt-6">
			<div className="text-center space-y-2">
				<Clock className="size-8 mx-auto opacity-80" />
				<p className="text-sm opacity-80">Pickup Window</p>
				<p className="text-2xl font-bold">{date}</p>
				<p className="font-medium">{timeSlot}</p>
			</div>
		</CardContent>
	</Card>
);

const QRCard = ({ code }: { code: string }) => (
	<Card>
		<CardContent className="pt-6">
			<div className="text-center space-y-3">
				<div className="size-36 mx-auto bg-white dark:bg-slate-900 rounded-xl p-3 border">
					<div className="size-full bg-muted rounded-lg flex items-center justify-center">
						<QrCode className="size-20 text-muted-foreground/50" />
					</div>
				</div>
				<p className="font-mono text-xl font-bold">{code}</p>
				<p className="text-sm text-muted-foreground">Show this at pickup</p>
			</div>
		</CardContent>
	</Card>
);

const InfoGridCard = ({ icon: Icon, label, value }: PickupInfoProps) => (
	<Card>
		<CardContent className="pt-6">
			<div className="flex items-center gap-3">
				<div className="size-10 rounded-lg bg-primary/10 flex items-center justify-center shrink-0">
					<Icon className="size-5 text-primary" />
				</div>
				<div>
					<p className="text-xs text-muted-foreground">{label}</p>
					<p className="font-medium">{value}</p>
				</div>
			</div>
		</CardContent>
	</Card>
);

const OrderItemCard = ({ name, quantity, price }: OrderItemProps) => (
	<Card>
		<CardContent className="pt-6">
			<div className="flex items-center gap-3">
				<div className="size-12 rounded-lg bg-muted flex items-center justify-center">
					<Package className="size-6 text-muted-foreground" />
				</div>
				<div className="flex-1 min-w-0">
					<p className="font-medium truncate">{name}</p>
					<p className="text-sm text-muted-foreground">×{quantity}</p>
				</div>
				<p className="font-semibold">{price}</p>
			</div>
		</CardContent>
	</Card>
);

const StoreCard = ({
	name,
	address,
	phone,
	hours,
}: {
	name: string;
	address: string;
	phone: string;
	hours: string;
}) => (
	<Card>
		<CardContent className="pt-6">
			<div className="space-y-4">
				<div className="flex items-start gap-3">
					<Store className="size-5 text-muted-foreground mt-0.5" />
					<div>
						<p className="font-semibold">{name}</p>
						<p className="text-sm text-muted-foreground">{address}</p>
					</div>
				</div>
				<div className="grid grid-cols-2 gap-3 text-sm">
					<div className="flex items-center gap-2">
						<Phone className="size-4 text-muted-foreground" />
						<span>{phone}</span>
					</div>
					<div className="flex items-center gap-2">
						<Clock className="size-4 text-muted-foreground" />
						<span>{hours}</span>
					</div>
				</div>
				<Button className="w-full gap-2">
					<Navigation className="size-4" />
					Get Directions
				</Button>
			</div>
		</CardContent>
	</Card>
);

const CurbsideCard = () => (
	<Card className="bg-muted/30">
		<CardContent className="pt-6">
			<div className="flex items-center gap-3">
				<Car className="size-5 text-muted-foreground" />
				<div className="flex-1">
					<p className="font-medium text-sm">Curbside Available</p>
					<p className="text-xs text-muted-foreground">
						Stay in your car
					</p>
				</div>
				<Button variant="outline" size="sm">
					Enable
				</Button>
			</div>
		</CardContent>
	</Card>
);

const CTA = ({ items }: CTAProps) => (
	<div className="flex flex-col @sm:flex-row gap-3 justify-center">
		{items.map(({ label, href, variant, icon: Icon }, i) => (
			<Button key={i} size="lg" variant={variant || 'default'} className="gap-2" asChild>
				<Link href={href}>
					{Icon && <Icon className="size-4" />}
					{label}
				</Link>
			</Button>
		))}
	</div>
);

export default function Main() {
	const pickupInfo: PickupInfoProps[] = [
		{ icon: Store, label: 'Store', value: 'Downtown Market' },
		{ icon: MapPin, label: 'Distance', value: '1.2 miles' },
	];

	const orderItems: OrderItemProps[] = [
		{ name: 'Organic Milk', quantity: 2, price: '$13.98' },
		{ name: 'Fresh Bread', quantity: 1, price: '$4.99' },
		{ name: 'Free Range Eggs', quantity: 1, price: '$5.49' },
	];

	return (
		<section className="@container min-h-screen py-12 @md:py-16 @xl:py-20">
			<div className="mx-auto max-w-5xl px-4 @sm:px-6 @2xl:px-8 space-y-6">
				<PageHeader orderNumber="PKP-78432" />

				<div className="grid @sm:grid-cols-2 @lg:grid-cols-3 gap-4">
					<PickupTimeCard date="Today, Jan 16" timeSlot="2:00 - 4:00 PM" />
					<QRCard code="PKP-7843" />
					<div className="grid gap-4">
						{pickupInfo.map((info, i) => (
							<InfoGridCard key={i} {...info} />
						))}
					</div>
				</div>

				<div className="grid @sm:grid-cols-2 @lg:grid-cols-3 gap-4">
					{orderItems.map((item, i) => (
						<OrderItemCard key={i} {...item} />
					))}
				</div>

				<div className="grid @lg:grid-cols-2 gap-4">
					<StoreCard
						name="Downtown Market"
						address="456 Main St, New York, NY 10001"
						phone="(555) 123-4567"
						hours="8AM - 9PM"
					/>
					<CurbsideCard />
				</div>

				<CTA
					items={[
						{ label: "I'm Here", href: '/checkin', icon: Store },
						{ label: 'Reschedule', href: '/reschedule', variant: 'outline' },
					]}
				/>
			</div>
		</section>
	);
}
