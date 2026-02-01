import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import {
	CheckCircle,
	Store,
	Package,
	QrCode,
	Clock,
	MapPin,
	Phone,
	Navigation,
	ArrowRight,
} from 'lucide-react';
import Link from 'next/link';

interface TimelineStepProps {
	icon: React.ElementType;
	title: string;
	description: string;
	time: string;
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

const PageHeader = ({ orderNumber }: { orderNumber: string }) => (
	<div className="text-center space-y-4">
		<div className="size-20 mx-auto rounded-full bg-orange-500/10 flex items-center justify-center">
			<Store className="size-10 text-orange-500" />
		</div>
		<div>
			<h1 className="text-2xl @lg:text-4xl font-bold">Ready for Pickup!</h1>
			<p className="text-muted-foreground">Order #{orderNumber}</p>
		</div>
		<Badge className="bg-orange-500">In-Store Pickup</Badge>
	</div>
);

const PickupCard = ({
	date,
	timeSlot,
	code,
}: {
	date: string;
	timeSlot: string;
	code: string;
}) => (
	<Card className="bg-gradient-to-br from-orange-500 via-amber-500 to-yellow-500 text-white border-0">
		<CardContent className="pt-6">
			<div className="grid @sm:grid-cols-2 gap-6">
				<div className="space-y-2">
					<div className="flex items-center gap-2">
						<Clock className="size-5" />
						<span className="text-sm opacity-80">Pickup Window</span>
					</div>
					<p className="text-xl font-bold">{date}</p>
					<p className="text-sm">{timeSlot}</p>
				</div>
				<div className="flex items-center justify-center @sm:justify-end">
					<div className="text-center">
						<div className="size-20 bg-white/20 rounded-lg flex items-center justify-center mb-2">
							<QrCode className="size-12" />
						</div>
						<p className="font-mono font-bold">{code}</p>
					</div>
				</div>
			</div>
		</CardContent>
	</Card>
);

const TimelineStep = ({
	icon: Icon,
	title,
	description,
	time,
	status,
}: TimelineStepProps) => (
	<div className="relative flex gap-4">
		<div className="flex flex-col items-center">
			<div
				className={`size-10 rounded-full flex items-center justify-center ${
					status === 'completed'
						? 'bg-emerald-500 text-white'
						: status === 'current'
							? 'bg-orange-500 text-white ring-4 ring-orange-500/20'
							: 'bg-muted text-muted-foreground'
				}`}
			>
				<Icon className="size-5" />
			</div>
			<div className="flex-1 w-0.5 bg-border mt-2" />
		</div>
		<div className="pb-6 flex-1">
			<div className="flex items-center justify-between">
				<h3
					className={`font-semibold ${
						status === 'upcoming' ? 'text-muted-foreground' : ''
					}`}
				>
					{title}
				</h3>
				<span className="text-sm text-muted-foreground">{time}</span>
			</div>
			<p className="text-sm text-muted-foreground">{description}</p>
		</div>
	</div>
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
			<h3 className="font-semibold mb-4">Pickup Location</h3>
			<div className="space-y-4">
				<div className="flex items-start gap-3">
					<Store className="size-5 text-orange-500 mt-0.5" />
					<div>
						<p className="font-medium">{name}</p>
						<p className="text-sm text-muted-foreground">{address}</p>
					</div>
				</div>
				<div className="grid grid-cols-2 gap-4 text-sm">
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
					{Icon && <Icon className="size-4" />}
					{label}
				</Link>
			</Button>
		))}
	</div>
);

export default function Main() {
	const timelineSteps: TimelineStepProps[] = [
		{
			icon: CheckCircle,
			title: 'Order Placed',
			description: 'Payment confirmed',
			time: 'Jan 15, 10:30 AM',
			status: 'completed',
		},
		{
			icon: Package,
			title: 'Order Prepared',
			description: 'Items packed and ready',
			time: 'Jan 15, 11:45 AM',
			status: 'completed',
		},
		{
			icon: Store,
			title: 'Ready for Pickup',
			description: 'Visit store to collect',
			time: 'Now',
			status: 'current',
		},
		{
			icon: CheckCircle,
			title: 'Order Collected',
			description: 'Show QR code at counter',
			time: 'Pending',
			status: 'upcoming',
		},
	];

	return (
		<section className="@container min-h-screen py-12 @md:py-16 @xl:py-20">
			<div className="mx-auto max-w-3xl px-4 @sm:px-6 @2xl:px-8 space-y-8">
				<PageHeader orderNumber="PKP-78432" />

				<PickupCard
					date="Today, Jan 15"
					timeSlot="2:00 PM - 6:00 PM"
					code="PKP-7843"
				/>

				<Card>
					<CardContent className="pt-6">
						<h2 className="font-semibold mb-6">Order Progress</h2>
						<div>
							{timelineSteps.map((step, i) => (
								<TimelineStep key={i} {...step} />
							))}
						</div>
					</CardContent>
				</Card>

				<StoreCard
					name="Downtown Market"
					address="456 Main St, New York, NY 10001"
					phone="(555) 123-4567"
					hours="8 AM - 9 PM"
				/>

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
