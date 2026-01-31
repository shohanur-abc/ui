import { Badge } from '@/components/ui/badge';
import { Card, CardContent } from '@/components/ui/card';
import { Calendar, MapPin, Users, ArrowRight } from 'lucide-react';
import Image from 'next/image';

export default function Main() {
	return (
		<section className="@container">
			<div className="mx-auto max-w-7xl px-4 @sm:px-6 @md:px-8 @xl:px-12 py-12 @md:py-16 @xl:py-20 @3xl:py-24">
				<div className="text-center max-w-3xl mx-auto mb-10 @md:mb-14">
					<Eyebrow text="Community" />
					<Title text="Speaking & Events" />
					<Description text="Sharing knowledge at conferences and meetups around the world." />
				</div>

				<EventCards
					items={[
						{
							image: 'https://picsum.photos/seed/event1/800/450',
							title: 'React Summit 2024',
							date: 'March 15-16, 2024',
							location: 'Amsterdam, NL',
							attendees: '1,500+',
							topic: 'Building Scalable Design Systems',
						},
						{
							image: 'https://picsum.photos/seed/event2/800/450',
							title: 'Next.js Conf',
							date: 'October 26, 2023',
							location: 'San Francisco, CA',
							attendees: '3,000+',
							topic: 'Server Components in Production',
						},
						{
							image: 'https://picsum.photos/seed/event3/800/450',
							title: 'TypeScript Berlin',
							date: 'May 10, 2023',
							location: 'Berlin, DE',
							attendees: '200+',
							topic: 'Type-Safe APIs with tRPC',
						},
					]}
				/>
			</div>
		</section>
	);
}

const Eyebrow = ({ text }: { text: string }) => (
	<Badge variant="outline" className="mb-3 @md:mb-4">
		{text}
	</Badge>
);

const Title = ({ text }: { text: string }) => (
	<h2 className="text-3xl @sm:text-4xl @md:text-5xl font-bold tracking-tight mb-4 @md:mb-6">
		{text}
	</h2>
);

const Description = ({ text }: { text: string }) => (
	<p className="text-base @md:text-lg text-muted-foreground leading-relaxed">
		{text}
	</p>
);

interface EventItem {
	image: string;
	title: string;
	date: string;
	location: string;
	attendees: string;
	topic: string;
}

const EventCards = ({ items }: { items: EventItem[] }) => (
	<div className="grid @md:grid-cols-2 @xl:grid-cols-3 gap-4 @md:gap-6">
		{items.map(({ image, title, date, location, attendees, topic }, i) => (
			<Card
				key={i}
				className="py-0 overflow-hidden group cursor-pointer hover:shadow-lg transition-all"
			>
				<div className="relative aspect-video">
					<Image
						src={image}
						alt={title}
						fill
						className="object-cover transition-transform duration-500 group-hover:scale-105"
					/>
					<div className="absolute inset-0 bg-gradient-to-t from-background via-background/40 to-transparent" />
					<div className="absolute bottom-3 left-3">
						<Badge variant="secondary">{topic}</Badge>
					</div>
				</div>
				<CardContent className="p-4 @md:p-5">
					<h3 className="font-bold text-base @md:text-lg mb-3 group-hover:text-primary transition-colors">
						{title}
					</h3>
					<div className="space-y-1.5 text-sm text-muted-foreground">
						<div className="flex items-center gap-2">
							<Calendar className="size-4" />
							{date}
						</div>
						<div className="flex items-center gap-2">
							<MapPin className="size-4" />
							{location}
						</div>
						<div className="flex items-center gap-2">
							<Users className="size-4" />
							{attendees} attendees
						</div>
					</div>
				</CardContent>
			</Card>
		))}
	</div>
);
