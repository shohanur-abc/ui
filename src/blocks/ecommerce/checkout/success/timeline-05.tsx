import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import {
	CheckCircle,
	Calendar,
	Clock,
	Video,
	Bell,
	User,
	MapPin,
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

const PageHeader = ({ confirmationNumber }: { confirmationNumber: string }) => (
	<div className="text-center space-y-4">
		<div className="size-20 mx-auto rounded-full bg-teal-500/10 flex items-center justify-center">
			<CheckCircle className="size-10 text-teal-500" />
		</div>
		<div>
			<h1 className="text-2xl @lg:text-4xl font-bold">Appointment Booked!</h1>
			<p className="text-muted-foreground">#{confirmationNumber}</p>
		</div>
	</div>
);

const AppointmentCard = ({
	date,
	time,
	duration,
	type,
}: {
	date: string;
	time: string;
	duration: string;
	type: string;
}) => (
	<Card className="bg-gradient-to-br from-teal-500 via-cyan-500 to-blue-500 text-white border-0">
		<CardContent className="pt-6">
			<div className="grid @sm:grid-cols-2 gap-6">
				<div className="space-y-2">
					<div className="flex items-center gap-2">
						<Calendar className="size-5" />
						<span className="text-sm opacity-80">Date</span>
					</div>
					<p className="text-2xl font-bold">{date}</p>
				</div>
				<div className="space-y-2">
					<div className="flex items-center gap-2">
						<Clock className="size-5" />
						<span className="text-sm opacity-80">Time</span>
					</div>
					<p className="text-2xl font-bold">{time}</p>
					<p className="text-sm opacity-80">
						{duration} • {type}
					</p>
				</div>
			</div>
		</CardContent>
	</Card>
);

const ProviderCard = ({
	name,
	title,
	image,
}: {
	name: string;
	title: string;
	image: string;
}) => (
	<Card>
		<CardContent className="pt-6">
			<div className="flex items-center gap-4">
				<Avatar className="size-14">
					<AvatarImage src={image} alt={name} />
					<AvatarFallback>
						{name
							.split(' ')
							.map((n) => n[0])
							.join('')}
					</AvatarFallback>
				</Avatar>
				<div className="flex-1">
					<p className="font-semibold">{name}</p>
					<p className="text-sm text-muted-foreground">{title}</p>
				</div>
				<Badge variant="outline">
					<Video className="size-3 mr-1" />
					Virtual
				</Badge>
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
							? 'bg-teal-500 text-white ring-4 ring-teal-500/20'
							: 'bg-muted text-muted-foreground'
				}`}
			>
				<Icon className="size-5" />
			</div>
			<div className="flex-1 w-0.5 bg-border mt-2" />
		</div>
		<div className="pb-6 flex-1">
			<h3
				className={`font-semibold ${
					status === 'upcoming' ? 'text-muted-foreground' : ''
				}`}
			>
				{title}
			</h3>
			<p className="text-sm text-muted-foreground">{description}</p>
			<p className="text-xs text-muted-foreground mt-1">{time}</p>
		</div>
	</div>
);

const ReminderCard = ({
	reminders,
}: {
	reminders: { time: string; method: string }[];
}) => (
	<Card className="bg-muted/30">
		<CardContent className="pt-6">
			<h3 className="font-semibold mb-4 flex items-center gap-2">
				<Bell className="size-4" />
				Reminders Set
			</h3>
			<div className="space-y-2">
				{reminders.map((reminder, i) => (
					<div key={i} className="flex items-center justify-between text-sm">
						<span className="text-muted-foreground">{reminder.time}</span>
						<Badge variant="secondary">{reminder.method}</Badge>
					</div>
				))}
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
			title: 'Booking Confirmed',
			description: 'Your appointment has been scheduled',
			time: 'Today, 10:30 AM',
			status: 'completed',
		},
		{
			icon: Bell,
			title: 'Reminder Set',
			description: 'You will receive reminders',
			time: 'Today, 10:31 AM',
			status: 'completed',
		},
		{
			icon: Video,
			title: 'Join Meeting',
			description: 'Video link will be available 10 min before',
			time: 'Jan 20, 10:00 AM',
			status: 'current',
		},
		{
			icon: User,
			title: 'Consultation',
			description: '30 minute session with Dr. Smith',
			time: 'Jan 20, 10:00 AM',
			status: 'upcoming',
		},
	];

	const reminders = [
		{ time: '1 day before', method: 'Email' },
		{ time: '1 hour before', method: 'SMS' },
		{ time: '10 min before', method: 'Push' },
	];

	return (
		<section className="@container min-h-screen py-12 @md:py-16 @xl:py-20">
			<div className="mx-auto max-w-3xl px-4 @sm:px-6 @2xl:px-8 space-y-8">
				<PageHeader confirmationNumber="APT-78432" />

				<AppointmentCard
					date="Jan 20, 2024"
					time="10:00 AM"
					duration="30 min"
					type="Virtual"
				/>

				<ProviderCard
					name="Dr. Sarah Smith"
					title="General Physician"
					image=""
				/>

				<Card>
					<CardContent className="pt-6">
						<h2 className="font-semibold mb-6">What&apos;s Next</h2>
						<div>
							{timelineSteps.map((step, i) => (
								<TimelineStep key={i} {...step} />
							))}
						</div>
					</CardContent>
				</Card>

				<ReminderCard reminders={reminders} />

				<CTA
					items={[
						{ label: 'Add to Calendar', href: '/calendar', icon: Calendar },
						{ label: 'Reschedule', href: '/reschedule', variant: 'outline' },
					]}
				/>
			</div>
		</section>
	);
}
