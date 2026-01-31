import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import {
	ArrowRight,
	Calendar,
	ExternalLink,
	MapPin,
	Users,
} from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';

export default function Main() {
	return (
		<section className="@container">
			<div className="mx-auto max-w-7xl px-4 @sm:px-6 @2xl:px-8 py-16 @md:py-20 @xl:py-24 @3xl:py-32">
				<Header
					eyebrow="Speaking"
					title="Conference Talks & Workshops"
					description="Sharing knowledge at events around the world."
				/>
				<SpeakingTabs
					tabs={[
						{
							id: 'upcoming',
							label: 'Upcoming',
							events: [
								{
									title: 'Building Scalable Design Systems',
									event: 'React Summit 2024',
									date: 'March 15, 2024',
									location: 'Amsterdam',
									type: 'Talk',
									image: 'https://picsum.photos/seed/ev1/600/400',
									link: 'https://example.com',
								},
								{
									title: 'Advanced TypeScript Patterns',
									event: 'JSConf EU',
									date: 'April 20, 2024',
									location: 'Berlin',
									type: 'Workshop',
									image: 'https://picsum.photos/seed/ev2/600/400',
									link: 'https://example.com',
								},
							],
						},
						{
							id: 'past',
							label: 'Past Events',
							events: [
								{
									title: 'The Future of Web Development',
									event: 'Next.js Conf',
									date: 'October 2023',
									location: 'San Francisco',
									type: 'Keynote',
									image: 'https://picsum.photos/seed/ev3/600/400',
									attendees: '5000+',
								},
								{
									title: 'Micro-Frontends in Practice',
									event: 'Frontend Love',
									date: 'February 2023',
									location: 'Amsterdam',
									type: 'Talk',
									image: 'https://picsum.photos/seed/ev4/600/400',
									attendees: '2000+',
								},
								{
									title: 'Testing Best Practices',
									event: 'TestJS Summit',
									date: 'November 2022',
									location: 'Online',
									type: 'Talk',
									image: 'https://picsum.photos/seed/ev5/600/400',
									attendees: '3000+',
								},
							],
						},
					]}
				/>
				<CTA label="Book Me to Speak" href="/speaking" icon={ArrowRight} />
			</div>
		</section>
	);
}

interface HeaderProps {
	eyebrow: string;
	title: string;
	description: string;
}

const Header = ({ eyebrow, title, description }: HeaderProps) => (
	<div className="text-center mb-12">
		<Badge variant="secondary" className="mb-4">
			{eyebrow}
		</Badge>
		<h1 className="text-3xl @lg:text-4xl font-bold mb-4">{title}</h1>
		<p className="text-muted-foreground max-w-xl mx-auto">{description}</p>
	</div>
);

interface EventItem {
	title: string;
	event: string;
	date: string;
	location: string;
	type: string;
	image: string;
	link?: string;
	attendees?: string;
}

interface TabData {
	id: string;
	label: string;
	events: EventItem[];
}

interface SpeakingTabsProps {
	tabs: TabData[];
}

const SpeakingTabs = ({ tabs }: SpeakingTabsProps) => (
	<Tabs defaultValue={tabs[0].id} className="max-w-4xl mx-auto">
		<TabsList className="grid w-full grid-cols-2 mb-8">
			{tabs.map((tab) => (
				<TabsTrigger key={tab.id} value={tab.id}>
					{tab.label}
				</TabsTrigger>
			))}
		</TabsList>
		{tabs.map((tab) => (
			<TabsContent key={tab.id} value={tab.id}>
				<div className="grid gap-6">
					{tab.events.map((event, i) => (
						<Card key={i} className="overflow-hidden py-0">
							<div className="flex flex-col @md:flex-row">
								<div className="relative @md:w-48 aspect-video @md:aspect-auto">
									<Image
										src={event.image}
										alt={event.title}
										fill
										className="object-cover"
									/>
								</div>
								<CardContent className="flex-1 p-4 @md:p-6">
									<div className="flex flex-wrap gap-2 mb-2">
										<Badge>{event.type}</Badge>
										<Badge variant="outline">{event.event}</Badge>
									</div>
									<h3 className="text-lg font-semibold mb-2">{event.title}</h3>
									<div className="flex flex-wrap gap-4 text-sm text-muted-foreground">
										<div className="flex items-center gap-1">
											<Calendar className="size-4" />
											<span>{event.date}</span>
										</div>
										<div className="flex items-center gap-1">
											<MapPin className="size-4" />
											<span>{event.location}</span>
										</div>
										{event.attendees && (
											<div className="flex items-center gap-1">
												<Users className="size-4" />
												<span>{event.attendees} attendees</span>
											</div>
										)}
									</div>
									{event.link && (
										<Button
											variant="link"
											className="p-0 h-auto mt-3 gap-1"
											asChild
										>
											<Link href={event.link}>
												Get Tickets
												<ExternalLink className="size-3" />
											</Link>
										</Button>
									)}
								</CardContent>
							</div>
						</Card>
					))}
				</div>
			</TabsContent>
		))}
	</Tabs>
);

interface CTAProps {
	label: string;
	href: string;
	icon: React.ComponentType<{ className?: string }>;
}

const CTA = ({ label, href, icon: Icon }: CTAProps) => (
	<div className="text-center mt-12">
		<Button className="gap-2" asChild>
			<Link href={href}>
				{label}
				<Icon className="size-4" />
			</Link>
		</Button>
	</div>
);
