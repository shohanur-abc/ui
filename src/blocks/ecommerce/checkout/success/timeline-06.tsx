import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import {
	CheckCircle,
	Ticket,
	Calendar,
	MapPin,
	Clock,
	QrCode,
	Music,
	Users,
	ArrowRight,
} from 'lucide-react';
import Link from 'next/link';

interface TimelineStepProps {
	icon: React.ElementType;
	title: string;
	description: string;
	date: string;
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
		<div className="size-20 mx-auto rounded-full bg-pink-500/10 flex items-center justify-center">
			<Ticket className="size-10 text-pink-500" />
		</div>
		<div>
			<h1 className="text-2xl @lg:text-4xl font-bold">Tickets Confirmed!</h1>
			<p className="text-muted-foreground">#{confirmationNumber}</p>
		</div>
		<Badge className="bg-pink-500">2 Tickets</Badge>
	</div>
);

const EventCard = ({
	name,
	date,
	time,
	venue,
	section,
}: {
	name: string;
	date: string;
	time: string;
	venue: string;
	section: string;
}) => (
	<Card className="bg-gradient-to-br from-pink-500 via-rose-500 to-red-500 text-white border-0">
		<CardContent className="pt-6">
			<div className="space-y-4">
				<div className="flex items-center gap-2">
					<Music className="size-5" />
					<h2 className="text-xl font-bold">{name}</h2>
				</div>
				<div className="grid @sm:grid-cols-2 gap-4">
					<div className="flex items-center gap-2">
						<Calendar className="size-4 opacity-80" />
						<span>{date}</span>
					</div>
					<div className="flex items-center gap-2">
						<Clock className="size-4 opacity-80" />
						<span>{time}</span>
					</div>
					<div className="flex items-center gap-2">
						<MapPin className="size-4 opacity-80" />
						<span>{venue}</span>
					</div>
					<div className="flex items-center gap-2">
						<Users className="size-4 opacity-80" />
						<span>{section}</span>
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
	date,
	status,
}: TimelineStepProps) => (
	<div className="relative flex gap-4">
		<div className="flex flex-col items-center">
			<div
				className={`size-10 rounded-full flex items-center justify-center ${
					status === 'completed'
						? 'bg-emerald-500 text-white'
						: status === 'current'
							? 'bg-pink-500 text-white ring-4 ring-pink-500/20'
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
				<span className="text-sm text-muted-foreground">{date}</span>
			</div>
			<p className="text-sm text-muted-foreground">{description}</p>
		</div>
	</div>
);

const QRCard = ({ ticketCode }: { ticketCode: string }) => (
	<Card>
		<CardContent className="pt-6">
			<div className="flex items-center gap-6">
				<div className="size-24 bg-muted rounded-lg flex items-center justify-center">
					<QrCode className="size-16 text-muted-foreground/50" />
				</div>
				<div>
					<h3 className="font-semibold">Mobile Ticket</h3>
					<p className="text-sm text-muted-foreground mb-2">
						Show this QR code at entry
					</p>
					<Badge variant="outline" className="font-mono">
						{ticketCode}
					</Badge>
				</div>
			</div>
		</CardContent>
	</Card>
);

const CTA = ({ items }: CTAProps) => (
	<div className="flex flex-col @sm:flex-row gap-3 justify-center">
		{items.map(({ label, href, variant, icon: Icon }, i) => (
			<Button key={i} size="lg" variant={variant || 'default'} className="gap-2" asChild>
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
			title: 'Tickets Purchased',
			description: 'Payment confirmed successfully',
			date: 'Jan 15',
			status: 'completed',
		},
		{
			icon: Ticket,
			title: 'Tickets Issued',
			description: 'Digital tickets ready',
			date: 'Jan 15',
			status: 'completed',
		},
		{
			icon: Calendar,
			title: 'Event Reminder',
			description: 'Get notified before the event',
			date: 'Feb 28',
			status: 'upcoming',
		},
		{
			icon: MapPin,
			title: 'Event Day',
			description: 'Show QR code at entrance',
			date: 'Mar 1',
			status: 'upcoming',
		},
	];

	return (
		<section className="@container min-h-screen py-12 @md:py-16 @xl:py-20">
			<div className="mx-auto max-w-3xl px-4 @sm:px-6 @2xl:px-8 space-y-8">
				<PageHeader confirmationNumber="TKT-78432" />

				<EventCard
					name="Summer Music Festival 2024"
					date="March 1, 2024"
					time="7:00 PM"
					venue="Madison Square Garden"
					section="Section A, Row 12"
				/>

				<Card>
					<CardContent className="pt-6">
						<h2 className="font-semibold mb-6">Your Journey</h2>
						<div>
							{timelineSteps.map((step, i) => (
								<TimelineStep key={i} {...step} />
							))}
						</div>
					</CardContent>
				</Card>

				<QRCard ticketCode="TKT-78432-A12" />

				<CTA
					items={[
						{ label: 'View Tickets', href: '/tickets', icon: Ticket },
						{ label: 'Add to Calendar', href: '/calendar', variant: 'outline', icon: Calendar },
					]}
				/>
			</div>
		</section>
	);
}
