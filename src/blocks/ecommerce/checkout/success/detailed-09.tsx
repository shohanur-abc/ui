import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import {
	CheckCircle,
	Store,
	QrCode,
	Clock,
	MapPin,
	Phone,
	Navigation,
	Car,
	Package,
	Calendar,
	ArrowRight,
	Copy,
	Info,
} from 'lucide-react';
import Link from 'next/link';

interface StoreDetailsProps {
	name: string;
	address: string;
	city: string;
	phone: string;
	hours: string;
	distance: string;
}

interface OrderItemProps {
	name: string;
	quantity: number;
	price: number;
	currency: string;
}

interface CTAProps {
	items: {
		label: string;
		href: string;
		variant?: 'default' | 'outline' | 'ghost';
		icon?: React.ElementType;
	}[];
}

const PageHeader = ({
	orderNumber,
	pickupDate,
}: {
	orderNumber: string;
	pickupDate: string;
}) => (
	<div className="flex flex-col @lg:flex-row @lg:items-center justify-between gap-4">
		<div className="flex items-center gap-4">
			<div className="size-14 rounded-full bg-emerald-500/10 flex items-center justify-center">
				<CheckCircle className="size-7 text-emerald-500" />
			</div>
			<div>
				<h1 className="text-2xl @lg:text-3xl font-bold">Ready for Pickup</h1>
				<p className="text-muted-foreground">Order #{orderNumber}</p>
			</div>
		</div>
		<div className="flex items-center gap-2 p-3 rounded-xl bg-emerald-500/10">
			<Calendar className="size-5 text-emerald-500" />
			<div>
				<p className="text-xs text-muted-foreground">Pickup by</p>
				<p className="font-semibold text-emerald-600">{pickupDate}</p>
			</div>
		</div>
	</div>
);

const PickupQRCard = ({ pickupCode }: { pickupCode: string }) => (
	<Card className="text-center">
		<CardHeader>
			<CardTitle className="text-base">Your Pickup Code</CardTitle>
		</CardHeader>
		<CardContent>
			<div className="size-52 mx-auto bg-white dark:bg-slate-900 rounded-xl p-4 border mb-4">
				<div className="size-full bg-muted rounded-lg flex items-center justify-center">
					<QrCode className="size-32 text-muted-foreground/50" />
				</div>
			</div>
			<div className="flex items-center justify-center gap-2">
				<p className="font-mono text-2xl font-bold tracking-wider">
					{pickupCode}
				</p>
				<Button variant="ghost" size="icon">
					<Copy className="size-4" />
				</Button>
			</div>
			<p className="text-sm text-muted-foreground mt-2">
				Show this code at the store
			</p>
		</CardContent>
	</Card>
);

const StoreCard = ({
	name,
	address,
	city,
	phone,
	hours,
	distance,
}: StoreDetailsProps) => (
	<Card>
		<CardHeader>
			<CardTitle className="flex items-center gap-2">
				<Store className="size-5" />
				Pickup Location
			</CardTitle>
		</CardHeader>
		<CardContent className="space-y-4">
			<div className="h-40 rounded-xl bg-muted flex items-center justify-center">
				<MapPin className="size-12 text-muted-foreground/50" />
			</div>
			<div>
				<p className="font-semibold text-lg">{name}</p>
				<p className="text-muted-foreground">{address}</p>
				<p className="text-muted-foreground">{city}</p>
			</div>
			<div className="grid grid-cols-2 gap-4">
				<div className="flex items-start gap-2">
					<Phone className="size-4 text-muted-foreground mt-0.5" />
					<div>
						<p className="text-sm text-muted-foreground">Phone</p>
						<p className="font-medium text-sm">{phone}</p>
					</div>
				</div>
				<div className="flex items-start gap-2">
					<Car className="size-4 text-muted-foreground mt-0.5" />
					<div>
						<p className="text-sm text-muted-foreground">Distance</p>
						<p className="font-medium text-sm">{distance}</p>
					</div>
				</div>
			</div>
			<div className="flex items-start gap-2">
				<Clock className="size-4 text-muted-foreground mt-0.5" />
				<div>
					<p className="text-sm text-muted-foreground">Store Hours</p>
					<p className="font-medium text-sm">{hours}</p>
				</div>
			</div>
			<Button className="w-full gap-2">
				<Navigation className="size-4" />
				Get Directions
			</Button>
		</CardContent>
	</Card>
);

const OrderItemsCard = ({
	items,
	total,
	currency,
}: {
	items: OrderItemProps[];
	total: number;
	currency: string;
}) => (
	<Card>
		<CardHeader>
			<CardTitle className="text-base flex items-center gap-2">
				<Package className="size-4" />
				Order Items
			</CardTitle>
		</CardHeader>
		<CardContent className="space-y-4">
			{items.map((item, i) => (
				<div key={i} className="flex items-center gap-4">
					<div className="size-16 rounded-xl bg-muted flex items-center justify-center">
						<Package className="size-8 text-muted-foreground/50" />
					</div>
					<div className="flex-1">
						<p className="font-medium">{item.name}</p>
						<p className="text-sm text-muted-foreground">Qty: {item.quantity}</p>
					</div>
					<p className="font-semibold">
						{currency}
						{(item.price * item.quantity).toFixed(2)}
					</p>
				</div>
			))}
			<Separator />
			<div className="flex justify-between font-semibold">
				<span>Total</span>
				<span>
					{currency}
					{total.toFixed(2)}
				</span>
			</div>
		</CardContent>
	</Card>
);

const PickupInstructionsCard = ({
	instructions,
}: {
	instructions: { step: number; text: string }[];
}) => (
	<Card>
		<CardHeader>
			<CardTitle className="text-base flex items-center gap-2">
				<Info className="size-4" />
				Pickup Instructions
			</CardTitle>
		</CardHeader>
		<CardContent className="space-y-4">
			{instructions.map((instruction) => (
				<div key={instruction.step} className="flex items-start gap-3">
					<div className="size-7 rounded-full bg-primary/10 flex items-center justify-center shrink-0 text-sm font-bold text-primary">
						{instruction.step}
					</div>
					<p className="text-sm pt-1">{instruction.text}</p>
				</div>
			))}
		</CardContent>
	</Card>
);

const PickupTimeCard = ({
	date,
	timeSlot,
	status,
}: {
	date: string;
	timeSlot: string;
	status: string;
}) => (
	<Card className="bg-emerald-500/5 border-emerald-200 dark:border-emerald-800/30">
		<CardContent className="pt-6">
			<div className="flex items-center gap-4">
				<div className="size-14 rounded-xl bg-emerald-500 text-white flex items-center justify-center">
					<Clock className="size-7" />
				</div>
				<div className="flex-1">
					<p className="font-semibold text-lg">{date}</p>
					<p className="text-muted-foreground">{timeSlot}</p>
				</div>
				<Badge className="bg-emerald-500">{status}</Badge>
			</div>
		</CardContent>
	</Card>
);

const WhatToBringCard = ({ items }: { items: string[] }) => (
	<Card>
		<CardHeader>
			<CardTitle className="text-base">What to Bring</CardTitle>
		</CardHeader>
		<CardContent>
			<ul className="space-y-2">
				{items.map((item, i) => (
					<li key={i} className="flex items-center gap-2 text-sm">
						<CheckCircle className="size-4 text-emerald-500" />
						<span>{item}</span>
					</li>
				))}
			</ul>
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
						Stay in your car - we&apos;ll bring it out
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
	<div className="flex flex-col @sm:flex-row gap-3">
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
	const orderItems: OrderItemProps[] = [
		{ name: 'Organic Whole Milk (1 gal)', quantity: 2, price: 6.99, currency: '$' },
		{ name: 'Fresh Bread Loaf', quantity: 1, price: 4.99, currency: '$' },
		{ name: 'Free Range Eggs (12)', quantity: 1, price: 5.49, currency: '$' },
		{ name: 'Mixed Greens Salad', quantity: 2, price: 3.99, currency: '$' },
	];

	const pickupInstructions = [
		{ step: 1, text: 'Park in one of the designated pickup spots near the store entrance' },
		{ step: 2, text: 'Open the app and check in to notify us of your arrival' },
		{ step: 3, text: 'Show your pickup code to the store associate' },
		{ step: 4, text: 'Verify your items and complete the pickup' },
	];

	const whatToBring = [
		'Valid photo ID',
		'This pickup confirmation',
		'Payment card used for purchase (if applicable)',
	];

	return (
		<section className="@container min-h-screen py-12 @md:py-16 @xl:py-20">
			<div className="mx-auto max-w-5xl px-4 @sm:px-6 @2xl:px-8 space-y-8">
				<PageHeader
					orderNumber="PKP-2024-78432"
					pickupDate="January 16, 2024"
				/>

				<PickupTimeCard
					date="Today, January 16"
					timeSlot="2:00 PM - 4:00 PM"
					status="Ready"
				/>

				<div className="grid @lg:grid-cols-3 gap-6">
					<div className="space-y-6">
						<PickupQRCard pickupCode="PKP-7843" />
					</div>
					<div className="@lg:col-span-2 space-y-6">
						<StoreCard
							name="Downtown Market"
							address="456 Main Street"
							city="New York, NY 10001"
							phone="(555) 123-4567"
							hours="Mon-Sat: 8AM-9PM, Sun: 9AM-7PM"
							distance="1.2 miles"
						/>
						<OrderItemsCard
							items={orderItems}
							total={32.44}
							currency="$"
						/>
					</div>
				</div>

				<div className="grid @lg:grid-cols-2 gap-6">
					<PickupInstructionsCard instructions={pickupInstructions} />
					<div className="space-y-6">
						<WhatToBringCard items={whatToBring} />
						<CurbsideCard />
					</div>
				</div>

				<CTA
					items={[
						{ label: "I'm Here", href: '/checkin', icon: ArrowRight },
						{ label: 'Reschedule Pickup', href: '/reschedule', variant: 'outline' },
					]}
				/>
			</div>
		</section>
	);
}
