import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import {
	CheckCircle,
	Calendar,
	Clock,
	MapPin,
	User,
	Video,
	Phone,
	Bell,
	ArrowRight,
} from 'lucide-react';
import Link from 'next/link';

interface AppointmentInfoProps {
	icon: React.ElementType;
	label: string;
	value: string;
	subvalue?: string;
}

interface CTAProps {
	items: {
		label: string;
		href: string;
		variant?: 'default' | 'outline' | 'ghost';
		icon?: React.ElementType;
	}[];
}

const PageHeader = ({ confirmationNumber }: { confirmationNumber: string }) => (
	<div className="text-center space-y-4">
		<div className="size-20 mx-auto rounded-full bg-emerald-500/10 flex items-center justify-center">
			<CheckCircle className="size-10 text-emerald-500" />
		</div>
		<div>
			<h1 className="text-2xl @lg:text-4xl font-bold">Booking Confirmed!</h1>
			<p className="text-muted-foreground">Confirmation #{confirmationNumber}</p>
		</div>
	</div>
);

const InfoGridCard = ({
	icon: Icon,
	label,
	value,
	subvalue,
}: AppointmentInfoProps) => (
	<Card>
		<CardContent className="pt-6">
			<div className="text-center space-y-3">
				<div className="size-12 mx-auto rounded-xl bg-primary/10 flex items-center justify-center">
					<Icon className="size-6 text-primary" />
				</div>
				<div>
					<p className="text-sm text-muted-foreground">{label}</p>
					<p className="font-semibold text-lg">{value}</p>
					{subvalue && (
						<p className="text-sm text-muted-foreground">{subvalue}</p>
					)}
				</div>
			</div>
		</CardContent>
	</Card>
);

const ServiceCard = ({
	serviceName,
	duration,
	price,
	currency,
}: {
	serviceName: string;
	duration: string;
	price: number;
	currency: string;
}) => (
	<Card className="bg-gradient-to-br from-violet-500 to-purple-600 text-white border-0">
		<CardContent className="pt-6">
			<div className="text-center space-y-2">
				<Badge className="bg-white/20 hover:bg-white/30 text-white">
					Booked
				</Badge>
				<h2 className="text-2xl font-bold">{serviceName}</h2>
				<div className="flex items-center justify-center gap-4 text-sm opacity-90">
					<span className="flex items-center gap-1">
						<Clock className="size-4" />
						{duration}
					</span>
					<span>
						{currency}
						{price.toFixed(2)}
					</span>
				</div>
			</div>
		</CardContent>
	</Card>
);

const ProviderCard = ({
	name,
	title,
	rating,
}: {
	name: string;
	title: string;
	rating: number;
}) => (
	<Card>
		<CardContent className="pt-6">
			<div className="flex items-center gap-4">
				<div className="size-16 rounded-full bg-gradient-to-br from-violet-500 to-purple-600 flex items-center justify-center text-white text-xl font-bold">
					{name.split(' ').map(n => n[0]).join('')}
				</div>
				<div>
					<p className="font-semibold">{name}</p>
					<p className="text-sm text-muted-foreground">{title}</p>
					<div className="flex items-center gap-1 mt-1">
						<span className="text-amber-500">★</span>
						<span className="text-sm font-medium">{rating}</span>
					</div>
				</div>
			</div>
		</CardContent>
	</Card>
);

const MeetingTypeCard = ({
	type,
	details,
}: {
	type: 'in-person' | 'video' | 'phone';
	details: string;
}) => (
	<Card>
		<CardContent className="pt-6">
			<div className="flex items-center gap-4">
				<div className="size-12 rounded-xl bg-primary/10 flex items-center justify-center">
					{type === 'video' ? (
						<Video className="size-6 text-primary" />
					) : type === 'phone' ? (
						<Phone className="size-6 text-primary" />
					) : (
						<MapPin className="size-6 text-primary" />
					)}
				</div>
				<div>
					<p className="font-semibold capitalize">{type} Meeting</p>
					<p className="text-sm text-muted-foreground">{details}</p>
				</div>
			</div>
		</CardContent>
	</Card>
);

const ReminderCard = ({
	reminders,
}: {
	reminders: { time: string; type: string }[];
}) => (
	<Card className="bg-muted/30">
		<CardContent className="pt-6">
			<div className="flex items-center gap-3 mb-4">
				<Bell className="size-5 text-muted-foreground" />
				<span className="font-semibold">Reminders Set</span>
			</div>
			<div className="grid @sm:grid-cols-2 gap-3">
				{reminders.map((reminder, i) => (
					<div key={i} className="flex items-center justify-between p-2 rounded-lg bg-background">
						<span className="text-sm">{reminder.time}</span>
						<Badge variant="outline" className="text-xs">
							{reminder.type}
						</Badge>
					</div>
				))}
			</div>
		</CardContent>
	</Card>
);

const CTA = ({ items }: CTAProps) => (
	<div className="flex flex-col @sm:flex-row gap-3 justify-center">
		{items.map(({ label, href, variant, icon: Icon }, i) => (
			<Button key={i} size="lg" variant={variant || 'default'} className="gap-2" asChild>
				<Link href={href}>
					{label}
					{Icon && <Icon className="size-4" />}
				</Link>
			</Button>
		))}
	</div>
);

export default function Main() {
	const infoCards: AppointmentInfoProps[] = [
		{ icon: Calendar, label: 'Date', value: 'Saturday, Jan 20', subvalue: '2024' },
		{ icon: Clock, label: 'Time', value: '10:00 AM', subvalue: 'Eastern Time' },
		{ icon: Clock, label: 'Duration', value: '60 minutes' },
		{ icon: User, label: 'Attendees', value: '1 person' },
	];

	const reminders = [
		{ time: '24 hours before', type: 'Email' },
		{ time: '1 hour before', type: 'Email' },
		{ time: '30 min before', type: 'SMS' },
		{ time: '5 min before', type: 'Push' },
	];

	return (
		<section className="@container min-h-screen py-12 @md:py-16 @xl:py-20">
			<div className="mx-auto max-w-5xl px-4 @sm:px-6 @2xl:px-8 space-y-8">
				<PageHeader confirmationNumber="APT-78432" />

				<ServiceCard
					serviceName="Initial Consultation"
					duration="60 min"
					price={150}
					currency="$"
				/>

				<div className="grid @sm:grid-cols-2 @lg:grid-cols-4 gap-4">
					{infoCards.map((card, i) => (
						<InfoGridCard key={i} {...card} />
					))}
				</div>

				<div className="grid @lg:grid-cols-2 gap-4">
					<ProviderCard
						name="Dr. Sarah Johnson"
						title="Clinical Psychologist"
						rating={4.9}
					/>
					<MeetingTypeCard type="video" details="Zoom link will be sent 15 min before" />
				</div>

				<ReminderCard reminders={reminders} />

				<CTA
					items={[
						{ label: 'Add to Calendar', href: '/calendar', icon: Calendar },
						{ label: 'Manage Booking', href: '/bookings', variant: 'outline', icon: ArrowRight },
					]}
				/>
			</div>
		</section>
	);
}
