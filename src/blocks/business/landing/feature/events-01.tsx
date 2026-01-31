import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import {
	ArrowRight,
	CalendarDays,
	Clock,
	MapPin,
	Sparkles,
	Users,
} from 'lucide-react';
import Link from 'next/link';
import { ComponentType } from 'react';

interface Event {
	type: string;
	title: string;
	date: string;
	time: string;
	location: string;
	attendees: number;
	href: string;
}

export default function Main() {
	return (
		<section className="@container relative overflow-hidden" data-theme="neon">
			<div className="mx-auto max-w-7xl px-4 @sm:px-6 @2xl:px-8 py-16 @md:py-20 @xl:py-24 @3xl:py-32">
				<div className="text-center max-w-3xl mx-auto mb-10 @md:mb-12 @xl:mb-16">
					<Eyebrow icon={CalendarDays} text="Events" />
					<Title text="Upcoming" highlight="Events" />
					<Description text="Join us at conferences, webinars, and meetups around the world." />
				</div>

				<EventsGrid
					events={[
						{
							type: 'Conference',
							title: 'ProductCon 2026',
							date: 'Apr 15-17',
							time: '9:00 AM - 6:00 PM',
							location: 'San Francisco, CA',
							attendees: 2500,
							href: '/events/productcon',
						},
						{
							type: 'Webinar',
							title: 'AI in Enterprise',
							date: 'Mar 25',
							time: '2:00 PM EST',
							location: 'Online',
							attendees: 500,
							href: '/events/ai-webinar',
						},
						{
							type: 'Meetup',
							title: 'NYC User Group',
							date: 'Apr 5',
							time: '6:30 PM EST',
							location: 'New York, NY',
							attendees: 75,
							href: '/events/nyc-meetup',
						},
					]}
				/>

				<CTASection label="View All Events" href="/events" />
			</div>
		</section>
	);
}

const Eyebrow = ({
	icon: Icon,
	text,
}: {
	icon: ComponentType<{ className?: string }>;
	text: string;
}) => (
	<div className="mb-4">
		<Badge variant="secondary" className="gap-2 px-3 py-1">
			<Icon className="size-3.5" />
			{text}
		</Badge>
	</div>
);

const Title = ({ text, highlight }: { text: string; highlight: string }) => (
	<h2 className="mb-4 text-3xl @sm:text-4xl @xl:text-5xl font-bold tracking-tight">
		{text} <span className="text-primary">{highlight}</span>
	</h2>
);

const Description = ({ text }: { text: string }) => (
	<p className="text-base @md:text-lg text-muted-foreground">{text}</p>
);

const EventsGrid = ({ events }: { events: Event[] }) => (
	<div className="grid gap-6 @lg:grid-cols-3">
		{events.map((event) => (
			<Link key={event.title} href={event.href}>
				<Card className="group h-full border-border/50 bg-card/50 backdrop-blur-sm transition-all hover:border-primary/30 hover:shadow-lg">
					<CardContent className="p-5 @md:p-6">
						<div className="flex items-center justify-between mb-4">
							<Badge variant="outline">{event.type}</Badge>
							<div className="flex items-center gap-1 text-xs text-muted-foreground">
								<Users className="size-3" />
								{event.attendees}+ registered
							</div>
						</div>
						<h3 className="text-lg font-semibold mb-4 group-hover:text-primary transition-colors">
							{event.title}
						</h3>
						<div className="space-y-2 text-sm text-muted-foreground">
							<div className="flex items-center gap-2">
								<CalendarDays className="size-4 text-primary" />
								{event.date}
							</div>
							<div className="flex items-center gap-2">
								<Clock className="size-4 text-primary" />
								{event.time}
							</div>
							<div className="flex items-center gap-2">
								<MapPin className="size-4 text-primary" />
								{event.location}
							</div>
						</div>
						<Button className="w-full mt-6 gap-2" variant="outline">
							Register
							<ArrowRight className="size-4" />
						</Button>
					</CardContent>
				</Card>
			</Link>
		))}
	</div>
);

const CTASection = ({ label, href }: { label: string; href: string }) => (
	<div className="mt-10 @md:mt-12 text-center">
		<Button size="lg" variant="outline" className="gap-2" asChild>
			<Link href={href}>
				{label}
				<ArrowRight className="size-4" />
			</Link>
		</Button>
	</div>
);
