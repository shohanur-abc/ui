import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import {
	CheckCircle,
	Package,
	Truck,
	MapPin,
	Clock,
	Home,
	ArrowRight,
} from 'lucide-react';
import Link from 'next/link';

interface TimelineEventProps {
	icon: React.ElementType;
	title: string;
	description: string;
	time: string;
	location?: string;
	status: 'completed' | 'current' | 'upcoming';
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
	currentStatus,
}: {
	orderNumber: string;
	currentStatus: string;
}) => (
	<div className="text-center space-y-4">
		<div className="size-20 mx-auto rounded-full bg-blue-500/10 flex items-center justify-center">
			<Truck className="size-10 text-blue-500" />
		</div>
		<div>
			<h1 className="text-2xl @lg:text-4xl font-bold">Tracking Order</h1>
			<p className="text-muted-foreground">#{orderNumber}</p>
		</div>
		<Badge className="bg-blue-500">{currentStatus}</Badge>
	</div>
);

const TimelineEvent = ({
	icon: Icon,
	title,
	description,
	time,
	location,
	status,
}: TimelineEventProps) => (
	<div className="relative flex gap-4">
		<div className="flex flex-col items-center">
			<div
				className={`size-10 rounded-full flex items-center justify-center ${
					status === 'completed'
						? 'bg-emerald-500 text-white'
						: status === 'current'
							? 'bg-blue-500 text-white ring-4 ring-blue-500/20'
							: 'bg-muted text-muted-foreground'
				}`}
			>
				<Icon className="size-5" />
			</div>
			<div className="flex-1 w-0.5 bg-border mt-2" />
		</div>
		<div className="pb-6 flex-1">
			<div className="flex items-start justify-between">
				<div>
					<h3
						className={`font-semibold ${
							status === 'upcoming' ? 'text-muted-foreground' : ''
						}`}
					>
						{title}
					</h3>
					<p className="text-sm text-muted-foreground">{description}</p>
					{location && (
						<div className="flex items-center gap-1 mt-1 text-xs text-muted-foreground">
							<MapPin className="size-3" />
							{location}
						</div>
					)}
				</div>
				<div className="text-right text-sm text-muted-foreground">
					<p>{time}</p>
				</div>
			</div>
		</div>
	</div>
);

const EstimatedDeliveryCard = ({
	date,
	time,
}: {
	date: string;
	time: string;
}) => (
	<Card className="bg-blue-500 text-white border-0">
		<CardContent className="pt-6">
			<div className="flex items-center justify-between">
				<div className="flex items-center gap-3">
					<Home className="size-8" />
					<div>
						<p className="text-sm opacity-80">Estimated Delivery</p>
						<p className="text-xl font-bold">{date}</p>
					</div>
				</div>
				<div className="flex items-center gap-2 text-sm">
					<Clock className="size-4 opacity-80" />
					<span>{time}</span>
				</div>
			</div>
		</CardContent>
	</Card>
);

const CTA = ({ items }: CTAProps) => (
	<div className="flex flex-col @sm:flex-row gap-3 justify-center">
		{items.map(({ label, href, variant, icon: Icon }, i) => (
			<Button
				key={i}
				size="lg"
				variant={variant || 'default'}
				className="gap-2"
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
	const timelineEvents: TimelineEventProps[] = [
		{
			icon: CheckCircle,
			title: 'Order Confirmed',
			description: 'Payment received and order confirmed',
			time: 'Jan 15, 10:30 AM',
			status: 'completed',
		},
		{
			icon: Package,
			title: 'Order Picked',
			description: 'Items collected from warehouse',
			time: 'Jan 15, 2:45 PM',
			location: 'New York Warehouse',
			status: 'completed',
		},
		{
			icon: Truck,
			title: 'In Transit',
			description: 'Package is on the way',
			time: 'Jan 16, 8:00 AM',
			location: 'Newark Sorting Center',
			status: 'current',
		},
		{
			icon: MapPin,
			title: 'Out for Delivery',
			description: 'Package will be delivered today',
			time: 'Expected Jan 17',
			status: 'upcoming',
		},
		{
			icon: Home,
			title: 'Delivered',
			description: 'Package delivered to doorstep',
			time: 'Expected Jan 17',
			status: 'upcoming',
		},
	];

	return (
		<section className="@container min-h-screen py-12 @md:py-16 @xl:py-20">
			<div className="mx-auto max-w-3xl px-4 @sm:px-6 @2xl:px-8 space-y-8">
				<PageHeader orderNumber="ORD-78432" currentStatus="In Transit" />

				<EstimatedDeliveryCard date="Wednesday, Jan 17" time="Before 8 PM" />

				<Card>
					<CardContent className="pt-6">
						<h2 className="font-semibold mb-6">Shipment History</h2>
						<div>
							{timelineEvents.map((event, i) => (
								<TimelineEvent key={i} {...event} />
							))}
						</div>
					</CardContent>
				</Card>

				<CTA
					items={[
						{ label: 'Get Notifications', href: '/notify', icon: ArrowRight },
						{ label: 'Contact Carrier', href: '/contact', variant: 'outline' },
					]}
				/>
			</div>
		</section>
	);
}
