import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import {
	CheckCircle,
	MapPin,
	Clock,
	Package,
	ArrowRight,
	Navigation,
	Phone,
} from 'lucide-react';
import Link from 'next/link';

interface TrackingPointProps {
	location: string;
	status: string;
	time: string;
	current: boolean;
}

interface ContactProps {
	name: string;
	role: string;
	phone: string;
}

interface CTAProps {
	items: {
		label: string;
		href: string;
		variant?: 'default' | 'outline' | 'ghost';
		icon?: React.ElementType;
	}[];
}

const MapPlaceholder = () => (
	<div className="relative h-full min-h-[300px] @lg:min-h-0 bg-muted">
		<div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-primary/10" />
		<div className="absolute inset-0 flex items-center justify-center">
			<div className="text-center">
				<div className="size-16 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-4">
					<Navigation className="size-8 text-primary" />
				</div>
				<p className="text-sm text-muted-foreground">Live tracking map</p>
				<p className="text-xs text-muted-foreground mt-1">
					Your package is on its way!
				</p>
			</div>
		</div>
		<div className="absolute top-4 left-4 right-4">
			<div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-background/95 backdrop-blur-sm border shadow-sm">
				<div className="size-2 rounded-full bg-primary animate-pulse" />
				<span className="text-xs font-medium">Live Tracking Active</span>
			</div>
		</div>
		<div className="absolute bottom-4 left-4 right-4">
			<Card className="bg-background/95 backdrop-blur-sm">
				<CardContent className="py-3 px-4">
					<div className="flex items-center gap-3">
						<Package className="size-5 text-primary" />
						<div className="flex-1">
							<p className="text-sm font-medium">In Transit</p>
							<p className="text-xs text-muted-foreground">
								Est. arrival: 2:00 PM - 4:00 PM
							</p>
						</div>
					</div>
				</CardContent>
			</Card>
		</div>
	</div>
);

const Title = ({ text, orderNumber }: { text: string; orderNumber: string }) => (
	<div className="flex items-center justify-between">
		<h1 className="text-xl @xl:text-2xl font-bold">{text}</h1>
		<Badge variant="outline" className="font-mono">
			{orderNumber}
		</Badge>
	</div>
);

const SuccessAlert = () => (
	<div className="flex items-center gap-3 p-4 rounded-xl bg-primary/5 border border-primary/20">
		<CheckCircle className="size-5 text-primary" />
		<div>
			<p className="font-medium">Order confirmed and shipped!</p>
			<p className="text-sm text-muted-foreground">
				Your package is on its way to you
			</p>
		</div>
	</div>
);

const TrackingPoint = ({
	location,
	status,
	time,
	current,
}: TrackingPointProps) => (
	<div className="flex items-start gap-3">
		<div className="flex flex-col items-center">
			<div
				className={`size-3 rounded-full ${current ? 'bg-primary' : 'bg-muted-foreground/30'}`}
			/>
			<div className="w-px h-8 bg-border last:hidden" />
		</div>
		<div className="flex-1 -mt-1">
			<div className="flex items-center justify-between">
				<p className={`font-medium text-sm ${current ? '' : 'text-muted-foreground'}`}>
					{status}
				</p>
				<span className="text-xs text-muted-foreground">{time}</span>
			</div>
			<p className="text-xs text-muted-foreground">{location}</p>
		</div>
	</div>
);

const TrackingTimeline = ({ points }: { points: TrackingPointProps[] }) => (
	<div className="space-y-3">
		<h3 className="font-semibold text-sm">Tracking Updates</h3>
		<div className="space-y-0">
			{points.map((point, i) => (
				<TrackingPoint key={i} {...point} />
			))}
		</div>
	</div>
);

const DeliveryAddress = ({ address }: { address: string }) => (
	<div className="p-4 rounded-xl bg-muted/50 border">
		<div className="flex items-start gap-3">
			<MapPin className="size-5 text-muted-foreground shrink-0" />
			<div>
				<p className="text-sm font-medium">Delivery Address</p>
				<p className="text-sm text-muted-foreground mt-1">{address}</p>
			</div>
		</div>
	</div>
);

const DriverContact = ({ name, role, phone }: ContactProps) => (
	<div className="p-4 rounded-xl bg-muted/50 border">
		<div className="flex items-center justify-between">
			<div className="flex items-center gap-3">
				<div className="size-10 rounded-full bg-muted flex items-center justify-center">
					<span className="text-sm font-semibold">
						{name.split(' ').map((n) => n[0]).join('')}
					</span>
				</div>
				<div>
					<p className="font-medium text-sm">{name}</p>
					<p className="text-xs text-muted-foreground">{role}</p>
				</div>
			</div>
			<Button variant="outline" size="icon">
				<Phone className="size-4" />
			</Button>
		</div>
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
	const trackingPoints: TrackingPointProps[] = [
		{
			location: 'New York Distribution Center',
			status: 'Out for Delivery',
			time: '10:30 AM',
			current: true,
		},
		{
			location: 'Newark, NJ',
			status: 'In Transit',
			time: '8:15 AM',
			current: false,
		},
		{
			location: 'Philadelphia, PA',
			status: 'Departed Facility',
			time: 'Yesterday',
			current: false,
		},
		{
			location: 'Warehouse',
			status: 'Order Shipped',
			time: 'Jan 15',
			current: false,
		},
	];

	return (
		<section className="@container min-h-screen py-12 @md:py-16 @xl:py-20">
			<div className="mx-auto max-w-6xl px-4 @sm:px-6 @2xl:px-8">
				<div className="grid @lg:grid-cols-2 gap-0 rounded-2xl overflow-hidden border">
					<MapPlaceholder />

					<div className="p-6 @lg:p-8 space-y-6">
						<Title text="Order on the Way!" orderNumber="ORD-78432" />

						<SuccessAlert />

						<TrackingTimeline points={trackingPoints} />

						<DeliveryAddress address="123 Main Street, Apt 4B, New York, NY 10001" />

						<DriverContact
							name="Mike Johnson"
							role="Delivery Driver"
							phone="+1 (555) 123-4567"
						/>

						<CTA
							items={[
								{ label: 'Get Directions', href: '/directions', icon: Navigation },
								{ label: 'View Order', href: '/orders', variant: 'outline' },
							]}
						/>
					</div>
				</div>
			</div>
		</section>
	);
}
