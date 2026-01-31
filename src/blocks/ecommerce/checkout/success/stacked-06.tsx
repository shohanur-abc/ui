import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import {
	CalendarCheck,
	Clock,
	MapPin,
	User,
	ArrowRight,
	Bell,
	Phone,
	Video,
} from 'lucide-react';
import Link from 'next/link';

interface AppointmentProps {
	service: string;
	provider: string;
	date: string;
	time: string;
	duration: string;
	location?: string;
	isOnline?: boolean;
}

interface CTAProps {
	items: {
		label: string;
		href: string;
		variant?: 'default' | 'outline' | 'ghost';
		icon?: React.ElementType;
	}[];
}

const BookingHeader = ({
	confirmationNumber,
}: {
	confirmationNumber: string;
}) => (
	<div className="text-center space-y-4">
		<div className="size-20 rounded-full bg-emerald-500/10 flex items-center justify-center mx-auto">
			<CalendarCheck className="size-10 text-emerald-500" />
		</div>
		<div>
			<h1 className="text-2xl @sm:text-3xl @lg:text-4xl font-bold">
				Booking Confirmed!
			</h1>
			<p className="text-muted-foreground mt-2">
				Your appointment has been scheduled
			</p>
		</div>
		<Badge variant="outline" className="font-mono">
			#{confirmationNumber}
		</Badge>
	</div>
);

const DateTimeBlock = ({
	date,
	time,
	duration,
}: {
	date: string;
	time: string;
	duration: string;
}) => (
	<div className="p-6 rounded-2xl bg-emerald-500 text-white">
		<div className="text-center">
			<p className="text-sm opacity-80 mb-1">Your Appointment</p>
			<p className="text-2xl @lg:text-3xl font-bold">{date}</p>
			<div className="flex items-center justify-center gap-4 mt-3">
				<div className="flex items-center gap-2">
					<Clock className="size-4 opacity-80" />
					<span>{time}</span>
				</div>
				<span className="opacity-50">•</span>
				<span>{duration}</span>
			</div>
		</div>
	</div>
);

const ServiceDetails = ({
	service,
	provider,
	price,
	currency,
}: {
	service: string;
	provider: string;
	price: number;
	currency: string;
}) => (
	<div className="space-y-4">
		<h2 className="font-semibold text-lg">Service Details</h2>
		<div className="p-4 rounded-xl bg-muted/30">
			<div className="flex items-center gap-4">
				<div className="size-12 rounded-full bg-muted flex items-center justify-center">
					<User className="size-6 text-muted-foreground" />
				</div>
				<div className="flex-1">
					<p className="font-medium">{service}</p>
					<p className="text-sm text-muted-foreground">with {provider}</p>
				</div>
				<p className="font-semibold">
					{currency}
					{price.toFixed(2)}
				</p>
			</div>
		</div>
	</div>
);

const LocationSection = ({
	type,
	location,
	address,
	meetingLink,
}: {
	type: 'in-person' | 'online';
	location?: string;
	address?: string;
	meetingLink?: string;
}) => (
	<div className="space-y-4">
		<h2 className="font-semibold text-lg">
			{type === 'online' ? 'Meeting Details' : 'Location'}
		</h2>
		<div className="p-4 rounded-xl bg-muted/30">
			{type === 'online' ? (
				<div className="flex items-start gap-3">
					<div className="size-10 rounded-lg bg-blue-500/10 flex items-center justify-center shrink-0">
						<Video className="size-5 text-blue-500" />
					</div>
					<div className="flex-1">
						<p className="font-medium">Video Call</p>
						<p className="text-sm text-muted-foreground">
							Link will be sent 15 minutes before
						</p>
					</div>
					<Badge variant="secondary">Online</Badge>
				</div>
			) : (
				<div className="flex items-start gap-3">
					<MapPin className="size-5 text-muted-foreground mt-0.5" />
					<div>
						<p className="font-medium">{location}</p>
						<p className="text-sm text-muted-foreground">{address}</p>
						<Button variant="link" className="h-auto p-0 text-primary text-sm">
							Get directions
						</Button>
					</div>
				</div>
			)}
		</div>
	</div>
);

const RemindersSection = () => (
	<div className="space-y-4">
		<h2 className="font-semibold text-lg flex items-center gap-2">
			<Bell className="size-5" />
			Reminders
		</h2>
		<div className="grid @sm:grid-cols-2 gap-3">
			<div className="p-3 rounded-lg border flex items-center gap-3">
				<div className="size-8 rounded-lg bg-primary/10 flex items-center justify-center">
					<Bell className="size-4 text-primary" />
				</div>
				<div className="flex-1">
					<p className="text-sm font-medium">Email</p>
					<p className="text-xs text-muted-foreground">24h before</p>
				</div>
				<Badge variant="outline" className="text-xs">Active</Badge>
			</div>
			<div className="p-3 rounded-lg border flex items-center gap-3">
				<div className="size-8 rounded-lg bg-primary/10 flex items-center justify-center">
					<Phone className="size-4 text-primary" />
				</div>
				<div className="flex-1">
					<p className="text-sm font-medium">SMS</p>
					<p className="text-xs text-muted-foreground">2h before</p>
				</div>
				<Badge variant="outline" className="text-xs">Active</Badge>
			</div>
		</div>
	</div>
);

const CancellationPolicy = ({ policy }: { policy: string }) => (
	<div className="p-4 rounded-xl bg-muted/30">
		<p className="text-sm text-muted-foreground">
			<span className="font-medium text-foreground">Cancellation Policy: </span>
			{policy}
		</p>
	</div>
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
	return (
		<section className="@container min-h-screen py-12 @md:py-16 @xl:py-20">
			<div className="mx-auto max-w-2xl px-4 @sm:px-6 @2xl:px-8 space-y-8">
				<BookingHeader confirmationNumber="APT-2024-78432" />

				<DateTimeBlock
					date="Saturday, January 20, 2024"
					time="10:00 AM"
					duration="60 minutes"
				/>

				<Separator />

				<ServiceDetails
					service="Consultation Session"
					provider="Dr. Sarah Johnson"
					price={150}
					currency="$"
				/>

				<LocationSection
					type="in-person"
					location="Wellness Clinic"
					address="123 Health Street, Suite 400, New York, NY 10001"
				/>

				<RemindersSection />

				<CancellationPolicy
					policy="Free cancellation up to 24 hours before your appointment. Late cancellations may incur a 50% fee."
				/>

				<CTA
					items={[
						{ label: 'Add to Calendar', href: '/calendar', icon: CalendarCheck },
						{ label: 'Manage Booking', href: '/bookings', variant: 'outline', icon: ArrowRight },
					]}
				/>
			</div>
		</section>
	);
}
