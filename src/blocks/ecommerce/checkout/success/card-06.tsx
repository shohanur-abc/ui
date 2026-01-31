import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import {
	CalendarCheck,
	Clock,
	MapPin,
	User,
	ArrowRight,
	Calendar,
	Bell,
} from 'lucide-react';
import Link from 'next/link';

interface AppointmentDetailsProps {
	service: string;
	date: string;
	time: string;
	duration: string;
	provider: string;
	location: string;
}

interface ReminderOptionProps {
	icon: React.ElementType;
	label: string;
	description: string;
	active: boolean;
}

interface CTAProps {
	items: {
		label: string;
		href: string;
		variant?: 'default' | 'outline' | 'ghost';
		icon?: React.ElementType;
	}[];
}

const SuccessHeader = ({
	confirmationNumber,
}: {
	confirmationNumber: string;
}) => (
	<Card className="bg-gradient-to-r from-violet-500/10 via-purple-500/5 to-transparent border-violet-200 dark:border-violet-800/30">
		<CardContent className="pt-6 text-center">
			<div className="size-16 rounded-full bg-violet-500/10 flex items-center justify-center mx-auto mb-4">
				<CalendarCheck className="size-8 text-violet-500" />
			</div>
			<h1 className="text-2xl @lg:text-3xl font-bold mb-2">
				Appointment Booked!
			</h1>
			<p className="text-muted-foreground mb-3">
				Your appointment has been confirmed
			</p>
			<Badge variant="secondary" className="font-mono">
				#{confirmationNumber}
			</Badge>
		</CardContent>
	</Card>
);

const DateTimeCard = ({
	date,
	time,
	duration,
}: {
	date: string;
	time: string;
	duration: string;
}) => (
	<Card className="bg-primary text-primary-foreground">
		<CardContent className="pt-6">
			<div className="flex items-center justify-between">
				<div className="flex items-center gap-3">
					<div className="size-12 rounded-xl bg-primary-foreground/20 flex items-center justify-center">
						<Calendar className="size-6" />
					</div>
					<div>
						<p className="font-bold text-lg">{date}</p>
						<p className="opacity-80">{time}</p>
					</div>
				</div>
				<Badge className="bg-primary-foreground/20">{duration}</Badge>
			</div>
		</CardContent>
	</Card>
);

const AppointmentDetailsCard = ({
	service,
	provider,
	location,
}: Pick<AppointmentDetailsProps, 'service' | 'provider' | 'location'>) => (
	<Card>
		<CardHeader>
			<CardTitle className="text-base">Appointment Details</CardTitle>
		</CardHeader>
		<CardContent className="space-y-4">
			<div className="flex items-start gap-3">
				<div className="size-10 rounded-lg bg-muted flex items-center justify-center shrink-0 mt-0.5">
					<Clock className="size-5 text-muted-foreground" />
				</div>
				<div>
					<p className="font-medium">{service}</p>
					<p className="text-sm text-muted-foreground">Service booked</p>
				</div>
			</div>
			<Separator />
			<div className="flex items-start gap-3">
				<div className="size-10 rounded-lg bg-muted flex items-center justify-center shrink-0 mt-0.5">
					<User className="size-5 text-muted-foreground" />
				</div>
				<div>
					<p className="font-medium">{provider}</p>
					<p className="text-sm text-muted-foreground">Service provider</p>
				</div>
			</div>
			<Separator />
			<div className="flex items-start gap-3">
				<div className="size-10 rounded-lg bg-muted flex items-center justify-center shrink-0 mt-0.5">
					<MapPin className="size-5 text-muted-foreground" />
				</div>
				<div>
					<p className="font-medium">{location}</p>
					<p className="text-sm text-muted-foreground">
						<Button variant="link" className="h-auto p-0 text-primary">
							Get directions
						</Button>
					</p>
				</div>
			</div>
		</CardContent>
	</Card>
);

const ReminderOption = ({
	icon: Icon,
	label,
	description,
	active,
}: ReminderOptionProps) => (
	<div className={`flex items-center gap-3 p-3 rounded-lg border ${active ? 'border-primary bg-primary/5' : 'border-muted'}`}>
		<div className={`size-10 rounded-lg flex items-center justify-center ${active ? 'bg-primary/10' : 'bg-muted'}`}>
			<Icon className={`size-5 ${active ? 'text-primary' : 'text-muted-foreground'}`} />
		</div>
		<div className="flex-1">
			<p className="font-medium text-sm">{label}</p>
			<p className="text-xs text-muted-foreground">{description}</p>
		</div>
		{active && <Badge variant="secondary">Active</Badge>}
	</div>
);

const RemindersCard = () => (
	<Card>
		<CardHeader>
			<CardTitle className="text-base flex items-center gap-2">
				<Bell className="size-4" />
				Reminders
			</CardTitle>
		</CardHeader>
		<CardContent className="space-y-2">
			<ReminderOption
				icon={Bell}
				label="Email Reminder"
				description="24 hours before"
				active={true}
			/>
			<ReminderOption
				icon={Bell}
				label="SMS Reminder"
				description="2 hours before"
				active={true}
			/>
		</CardContent>
	</Card>
);

const PaymentCard = ({
	amount,
	currency,
	status,
}: {
	amount: number;
	currency: string;
	status: string;
}) => (
	<Card className="bg-muted/30">
		<CardContent className="pt-6">
			<div className="flex items-center justify-between">
				<div>
					<p className="text-sm text-muted-foreground">Payment Status</p>
					<div className="flex items-center gap-2 mt-1">
						<Badge variant="outline" className="text-emerald-600 border-emerald-200">
							{status}
						</Badge>
					</div>
				</div>
				<div className="text-right">
					<p className="text-sm text-muted-foreground">Amount Paid</p>
					<p className="text-xl font-bold">
						{currency}
						{amount.toFixed(2)}
					</p>
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
	return (
		<section className="@container min-h-screen py-12 @md:py-16 @xl:py-20">
			<div className="mx-auto max-w-2xl px-4 @sm:px-6 @2xl:px-8 space-y-6">
				<SuccessHeader confirmationNumber="APT-2024-78432" />

				<DateTimeCard
					date="Saturday, January 20"
					time="10:00 AM - 11:30 AM"
					duration="90 min"
				/>

				<AppointmentDetailsCard
					service="Full Body Massage"
					provider="Sarah Johnson"
					location="123 Wellness Center, Suite 4A"
				/>

				<RemindersCard />

				<PaymentCard amount={149.99} currency="$" status="Paid" />

				<CTA
					items={[
						{ label: 'Add to Calendar', href: '/calendar', icon: Calendar },
						{ label: 'Manage Booking', href: '/bookings', variant: 'outline' },
					]}
				/>
			</div>
		</section>
	);
}
