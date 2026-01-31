import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import {
	CalendarCheck,
	Clock,
	User,
	MapPin,
	ArrowRight,
	Bell,
	Edit,
} from 'lucide-react';
import Link from 'next/link';

interface AppointmentSlotProps {
	date: string;
	time: string;
	duration: string;
}

interface ServiceProviderProps {
	name: string;
	role: string;
	rating: number;
	image?: string;
}

interface CTAProps {
	items: {
		label: string;
		href: string;
		variant?: 'default' | 'outline' | 'ghost';
		icon?: React.ElementType;
	}[];
}

const CalendarDisplay = ({
	month,
	day,
	weekday,
}: {
	month: string;
	day: number;
	weekday: string;
}) => (
	<div className="relative h-full min-h-[350px] @lg:min-h-0 bg-gradient-to-br from-primary via-primary/90 to-primary/80 flex items-center justify-center overflow-hidden">
		<div className="absolute inset-0">
			<div className="absolute top-0 left-0 right-0 h-1/3 bg-white/5" />
		</div>
		<div className="relative">
			<div className="w-48 @xl:w-56 bg-background rounded-2xl shadow-2xl overflow-hidden">
				<div className="bg-primary p-4 text-center text-primary-foreground">
					<p className="text-sm font-medium uppercase tracking-wider">
						{month}
					</p>
				</div>
				<div className="p-6 text-center">
					<p className="text-6xl @xl:text-7xl font-bold">{day}</p>
					<p className="text-muted-foreground font-medium mt-2">{weekday}</p>
				</div>
			</div>
			<div className="absolute -bottom-4 -right-4 size-16 rounded-xl bg-primary flex items-center justify-center shadow-lg">
				<CalendarCheck className="size-8 text-primary-foreground" />
			</div>
		</div>
	</div>
);

const Title = ({ text }: { text: string }) => (
	<h1 className="text-2xl @xl:text-3xl font-bold">{text}</h1>
);

const SuccessMessage = ({ message }: { message: string }) => (
	<div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 text-primary">
		<CalendarCheck className="size-4" />
		<span className="font-medium text-sm">{message}</span>
	</div>
);

const AppointmentSlot = ({ date, time, duration }: AppointmentSlotProps) => (
	<Card className="border-primary/20 bg-primary/5">
		<CardContent className="pt-6">
			<div className="flex items-center gap-4">
				<div className="size-14 rounded-xl bg-primary/10 flex items-center justify-center">
					<Clock className="size-7 text-primary" />
				</div>
				<div className="flex-1">
					<p className="font-semibold text-lg">{date}</p>
					<p className="text-muted-foreground">{time}</p>
				</div>
				<Badge variant="secondary">{duration}</Badge>
			</div>
		</CardContent>
	</Card>
);

const ServiceProvider = ({
	name,
	role,
	rating,
}: ServiceProviderProps) => (
	<div className="p-4 rounded-xl bg-muted/50 border">
		<div className="flex items-center gap-3">
			<div className="size-12 rounded-full bg-muted flex items-center justify-center">
				<User className="size-6 text-muted-foreground" />
			</div>
			<div className="flex-1">
				<p className="font-medium">{name}</p>
				<p className="text-sm text-muted-foreground">{role}</p>
			</div>
			<div className="text-right">
				<div className="flex items-center gap-1">
					<span className="text-amber-500">★</span>
					<span className="font-medium">{rating}</span>
				</div>
			</div>
		</div>
	</div>
);

const LocationInfo = ({
	name,
	address,
}: {
	name: string;
	address: string;
}) => (
	<div className="p-4 rounded-xl bg-muted/50 border">
		<div className="flex items-start gap-3">
			<MapPin className="size-5 text-muted-foreground shrink-0" />
			<div>
				<p className="font-medium">{name}</p>
				<p className="text-sm text-muted-foreground mt-1">{address}</p>
			</div>
		</div>
	</div>
);

const ReminderSettings = () => (
	<div className="p-4 rounded-xl bg-muted/30 border">
		<div className="flex items-center justify-between">
			<div className="flex items-center gap-3">
				<Bell className="size-5 text-muted-foreground" />
				<div>
					<p className="font-medium text-sm">Reminders</p>
					<p className="text-xs text-muted-foreground">
						Email & SMS 24h before
					</p>
				</div>
			</div>
			<Badge variant="outline">Active</Badge>
		</div>
	</div>
);

const QuickActions = () => (
	<div className="flex gap-3">
		<Button variant="outline" className="flex-1 gap-2">
			<Edit className="size-4" />
			Reschedule
		</Button>
		<Button variant="outline" className="flex-1 gap-2">
			<CalendarCheck className="size-4" />
			Add to Calendar
		</Button>
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
	return (
		<section className="@container min-h-screen py-12 @md:py-16 @xl:py-20">
			<div className="mx-auto max-w-6xl px-4 @sm:px-6 @2xl:px-8">
				<div className="grid @lg:grid-cols-2 gap-0 rounded-2xl overflow-hidden border">
					<CalendarDisplay month="January" day={20} weekday="Saturday" />

					<div className="p-6 @lg:p-8 space-y-6">
						<div className="space-y-3">
							<Title text="Appointment Confirmed!" />
							<SuccessMessage message="Booking successful" />
						</div>

						<AppointmentSlot
							date="Saturday, January 20, 2024"
							time="2:00 PM - 3:30 PM"
							duration="90 min"
						/>

						<ServiceProvider
							name="Dr. Sarah Johnson"
							role="Senior Consultant"
							rating={4.9}
						/>

						<LocationInfo
							name="Main Street Clinic"
							address="123 Main Street, Suite 400, New York, NY 10001"
						/>

						<ReminderSettings />

						<QuickActions />

						<CTA
							items={[
								{ label: 'View Booking', href: '/bookings', icon: ArrowRight },
								{ label: 'Home', href: '/', variant: 'outline' },
							]}
						/>
					</div>
				</div>
			</div>
		</section>
	);
}
