import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import {
	CalendarCheck,
	Clock,
	MapPin,
	User,
	Video,
	Phone,
	Mail,
	Bell,
	ArrowRight,
	Calendar,
	FileText,
	AlertCircle,
} from 'lucide-react';
import Link from 'next/link';

interface AppointmentDetailsProps {
	service: string;
	description: string;
	duration: string;
	price: number;
	currency: string;
}

interface ProviderProps {
	name: string;
	title: string;
	avatar?: string;
	rating: number;
	reviewCount: number;
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
	confirmationNumber,
	bookingDate,
}: {
	confirmationNumber: string;
	bookingDate: string;
}) => (
	<div className="flex items-center gap-4">
		<div className="size-14 rounded-full bg-emerald-500/10 flex items-center justify-center">
			<CalendarCheck className="size-7 text-emerald-500" />
		</div>
		<div>
			<h1 className="text-2xl @lg:text-3xl font-bold">Booking Confirmed</h1>
			<p className="text-muted-foreground">
				Confirmation #{confirmationNumber} • Booked on {bookingDate}
			</p>
		</div>
	</div>
);

const DateTimeCard = ({
	date,
	time,
	duration,
	timezone,
}: {
	date: string;
	time: string;
	duration: string;
	timezone: string;
}) => (
	<Card className="bg-gradient-to-br from-emerald-500 to-teal-500 text-white">
		<CardContent className="pt-6">
			<div className="grid @sm:grid-cols-3 gap-4 text-center">
				<div>
					<Calendar className="size-6 mx-auto mb-2 opacity-80" />
					<p className="text-sm opacity-80">Date</p>
					<p className="font-bold text-lg">{date}</p>
				</div>
				<div>
					<Clock className="size-6 mx-auto mb-2 opacity-80" />
					<p className="text-sm opacity-80">Time</p>
					<p className="font-bold text-lg">{time}</p>
				</div>
				<div>
					<Clock className="size-6 mx-auto mb-2 opacity-80" />
					<p className="text-sm opacity-80">Duration</p>
					<p className="font-bold text-lg">{duration}</p>
				</div>
			</div>
			<p className="text-center text-sm opacity-80 mt-4">{timezone}</p>
		</CardContent>
	</Card>
);

const ServiceCard = ({
	service,
	description,
	duration,
	price,
	currency,
}: AppointmentDetailsProps) => (
	<Card>
		<CardHeader>
			<CardTitle className="text-base">Service Details</CardTitle>
		</CardHeader>
		<CardContent className="space-y-4">
			<div className="flex items-start justify-between gap-4">
				<div>
					<p className="font-semibold text-lg">{service}</p>
					<p className="text-sm text-muted-foreground mt-1">{description}</p>
				</div>
				<p className="text-xl font-bold">
					{currency}
					{price.toFixed(2)}
				</p>
			</div>
			<div className="flex items-center gap-4 text-sm text-muted-foreground">
				<div className="flex items-center gap-1">
					<Clock className="size-4" />
					<span>{duration}</span>
				</div>
			</div>
		</CardContent>
	</Card>
);

const ProviderCard = ({
	name,
	title,
	avatar,
	rating,
	reviewCount,
}: ProviderProps) => (
	<Card>
		<CardHeader>
			<CardTitle className="text-base flex items-center gap-2">
				<User className="size-4" />
				Your Provider
			</CardTitle>
		</CardHeader>
		<CardContent>
			<div className="flex items-center gap-4">
				<Avatar className="size-16">
					<AvatarImage src={avatar} />
					<AvatarFallback className="text-lg font-bold">
						{name
							.split(' ')
							.map((n) => n[0])
							.join('')}
					</AvatarFallback>
				</Avatar>
				<div>
					<p className="font-semibold text-lg">{name}</p>
					<p className="text-muted-foreground">{title}</p>
					<div className="flex items-center gap-1 mt-1">
						<span className="text-amber-500">★</span>
						<span className="font-medium">{rating}</span>
						<span className="text-muted-foreground text-sm">
							({reviewCount} reviews)
						</span>
					</div>
				</div>
			</div>
		</CardContent>
	</Card>
);

const LocationCard = ({
	type,
	location,
	address,
	meetingLink,
}: {
	type: 'in-person' | 'video' | 'phone';
	location?: string;
	address?: string;
	meetingLink?: string;
}) => (
	<Card>
		<CardHeader>
			<CardTitle className="text-base flex items-center gap-2">
				{type === 'video' ? (
					<Video className="size-4" />
				) : type === 'phone' ? (
					<Phone className="size-4" />
				) : (
					<MapPin className="size-4" />
				)}
				{type === 'in-person'
					? 'Location'
					: type === 'video'
						? 'Video Call'
						: 'Phone Call'}
			</CardTitle>
		</CardHeader>
		<CardContent>
			{type === 'in-person' ? (
				<div className="space-y-2">
					<p className="font-medium">{location}</p>
					<p className="text-sm text-muted-foreground">{address}</p>
					<Button variant="outline" size="sm" className="mt-2 gap-2">
						<MapPin className="size-4" />
						Get Directions
					</Button>
				</div>
			) : type === 'video' ? (
				<div className="space-y-3">
					<p className="text-sm text-muted-foreground">
						A video call link will be sent to your email 15 minutes before your
						appointment.
					</p>
					<Badge variant="secondary">Zoom Meeting</Badge>
				</div>
			) : (
				<div className="space-y-3">
					<p className="text-sm text-muted-foreground">
						You will receive a call at the scheduled time.
					</p>
					<p className="font-medium">+1 (555) 123-4567</p>
				</div>
			)}
		</CardContent>
	</Card>
);

const RemindersCard = ({
	reminders,
}: {
	reminders: { type: string; timing: string; enabled: boolean }[];
}) => (
	<Card>
		<CardHeader>
			<CardTitle className="text-base flex items-center gap-2">
				<Bell className="size-4" />
				Reminders
			</CardTitle>
		</CardHeader>
		<CardContent className="space-y-3">
			{reminders.map((reminder, i) => (
				<div key={i} className="flex items-center justify-between">
					<div className="flex items-center gap-3">
						{reminder.type === 'email' ? (
							<Mail className="size-4 text-muted-foreground" />
						) : (
							<Phone className="size-4 text-muted-foreground" />
						)}
						<div>
							<p className="font-medium text-sm capitalize">{reminder.type}</p>
							<p className="text-xs text-muted-foreground">{reminder.timing}</p>
						</div>
					</div>
					<Badge variant={reminder.enabled ? 'secondary' : 'outline'}>
						{reminder.enabled ? 'Active' : 'Off'}
					</Badge>
				</div>
			))}
		</CardContent>
	</Card>
);

const PreparationCard = ({ items }: { items: string[] }) => (
	<Card className="bg-amber-500/5 border-amber-200 dark:border-amber-800/30">
		<CardHeader>
			<CardTitle className="text-base flex items-center gap-2 text-amber-700 dark:text-amber-400">
				<FileText className="size-4" />
				Preparation Checklist
			</CardTitle>
		</CardHeader>
		<CardContent>
			<ul className="space-y-2">
				{items.map((item, i) => (
					<li key={i} className="flex items-start gap-2 text-sm">
						<span className="text-amber-500 mt-0.5">•</span>
						{item}
					</li>
				))}
			</ul>
		</CardContent>
	</Card>
);

const CancellationCard = ({ policy }: { policy: string }) => (
	<Card className="bg-muted/30">
		<CardContent className="pt-6">
			<div className="flex items-start gap-3">
				<AlertCircle className="size-5 text-muted-foreground shrink-0" />
				<div>
					<p className="font-medium text-sm">Cancellation Policy</p>
					<p className="text-sm text-muted-foreground">{policy}</p>
				</div>
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
	const reminders = [
		{ type: 'email', timing: '24 hours before', enabled: true },
		{ type: 'email', timing: '1 hour before', enabled: true },
		{ type: 'SMS', timing: '30 minutes before', enabled: false },
	];

	const preparationItems = [
		'Complete the intake form sent to your email',
		'Prepare any questions you want to discuss',
		'Have your ID and insurance information ready',
		'Arrive 10 minutes early for check-in',
	];

	return (
		<section className="@container min-h-screen py-12 @md:py-16 @xl:py-20">
			<div className="mx-auto max-w-5xl px-4 @sm:px-6 @2xl:px-8 space-y-8">
				<PageHeader
					confirmationNumber="APT-2024-78432"
					bookingDate="January 15, 2024"
				/>

				<DateTimeCard
					date="Saturday, Jan 20"
					time="10:00 AM"
					duration="60 min"
					timezone="Eastern Time (ET)"
				/>

				<div className="grid @lg:grid-cols-3 gap-6">
					<div className="@lg:col-span-2 space-y-6">
						<ServiceCard
							service="Initial Consultation"
							description="A comprehensive first meeting to discuss your goals and create a personalized plan."
							duration="60 minutes"
							price={150}
							currency="$"
						/>
						<ProviderCard
							name="Dr. Sarah Johnson"
							title="Licensed Clinical Psychologist"
							rating={4.9}
							reviewCount={127}
						/>
						<PreparationCard items={preparationItems} />
					</div>
					<div className="space-y-6">
						<LocationCard
							type="in-person"
							location="Wellness Center"
							address="123 Health Street, Suite 400, New York, NY 10001"
						/>
						<RemindersCard reminders={reminders} />
						<CancellationCard policy="Free cancellation up to 24 hours before. Cancellations within 24 hours may incur a 50% charge." />
					</div>
				</div>

				<CTA
					items={[
						{ label: 'Add to Calendar', href: '/calendar', icon: Calendar },
						{
							label: 'Manage Booking',
							href: '/bookings',
							variant: 'outline',
							icon: ArrowRight,
						},
					]}
				/>
			</div>
		</section>
	);
}
