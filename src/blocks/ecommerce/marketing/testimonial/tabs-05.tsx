'use client';

import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { CalendarDays, Quote, Star, Sparkles } from 'lucide-react';

interface TestimonialItem {
	quote: string;
	author: string;
	role: string;
	company: string;
	avatar: string;
	initials: string;
	rating: number;
	date: string;
}

interface TimePeriod {
	id: string;
	label: string;
	testimonials: TestimonialItem[];
}

const SectionHeader = ({
	badge,
	title,
	description,
}: {
	badge: string;
	title: string;
	description: string;
}) => (
	<div className="flex flex-col @lg:flex-row @lg:items-end @lg:justify-between gap-6 mb-12 @lg:mb-16">
		<div className="max-w-2xl">
			<Badge className="mb-4 gap-2 bg-primary text-primary-foreground">
				<Sparkles className="size-3" />
				{badge}
			</Badge>
			<h2 className="text-3xl @sm:text-4xl @lg:text-5xl font-bold tracking-tight mb-4">
				{title}
			</h2>
			<p className="text-muted-foreground text-base @md:text-lg">
				{description}
			</p>
		</div>
	</div>
);

const StarRating = ({ rating }: { rating: number }) => (
	<div className="flex gap-0.5 mb-3">
		{Array.from({ length: 5 }).map((_, i) => (
			<Star
				key={i}
				className={`size-4 ${i < rating ? 'fill-primary text-primary' : 'text-muted/30'}`}
			/>
		))}
	</div>
);

const DateTag = ({ date }: { date: string }) => (
	<div className="flex items-center gap-1.5 text-xs text-muted-foreground">
		<CalendarDays className="size-3" />
		<span>{date}</span>
	</div>
);

const TimelineCard = ({ item }: { item: TestimonialItem }) => (
	<Card className="border-border/50 bg-card hover:shadow-lg hover:shadow-primary/5 hover:border-primary/20 transition-all duration-300 group h-full">
		<CardContent className="p-6 flex flex-col h-full">
			<div className="flex items-center justify-between mb-3">
				<Quote className="size-7 text-primary/20" />
				<DateTag date={item.date} />
			</div>
			<StarRating rating={item.rating} />
			<p className="text-foreground leading-relaxed flex-1 mb-5">
				"{item.quote}"
			</p>
			<div className="flex items-center gap-3 pt-4 border-t border-border/50">
				<Avatar className="size-10 ring-2 ring-primary/10 group-hover:ring-primary/30 transition-all">
					<AvatarImage src={item.avatar} alt={item.author} />
					<AvatarFallback className="bg-primary/10 text-primary font-semibold text-sm">
						{item.initials}
					</AvatarFallback>
				</Avatar>
				<div>
					<p className="font-semibold text-sm text-foreground">{item.author}</p>
					<p className="text-xs text-muted-foreground">
						{item.role} · {item.company}
					</p>
				</div>
			</div>
		</CardContent>
	</Card>
);

export default function Main() {
	const timePeriods: TimePeriod[] = [
		{
			id: 'this-week',
			label: 'This Week',
			testimonials: [
				{
					quote: 'Just completed our migration. Exceeded all expectations!',
					author: 'Bella Thompson',
					role: 'IT Manager',
					company: 'QuickStart',
					avatar:
						'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100&h=100&fit=crop',
					initials: 'BT',
					rating: 5,
					date: '2 days ago',
				},
				{
					quote: 'The new dashboard features are incredible.',
					author: 'Chris Johnson',
					role: 'Data Analyst',
					company: 'DataFirst',
					avatar:
						'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&h=100&fit=crop',
					initials: 'CJ',
					rating: 5,
					date: '3 days ago',
				},
				{
					quote: 'Support helped us resolve an issue within minutes.',
					author: 'Diana Lee',
					role: 'Operations',
					company: 'FastTrack',
					avatar:
						'https://images.unsplash.com/photo-1573497019940-1c28c88b4f3e?w=100&h=100&fit=crop',
					initials: 'DL',
					rating: 5,
					date: '5 days ago',
				},
			],
		},
		{
			id: 'this-month',
			label: 'This Month',
			testimonials: [
				{
					quote: 'Our team productivity has improved dramatically.',
					author: 'Eric Williams',
					role: 'Team Lead',
					company: 'ProductiveCo',
					avatar:
						'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop',
					initials: 'EW',
					rating: 5,
					date: '2 weeks ago',
				},
				{
					quote: 'The integration with our existing tools is flawless.',
					author: 'Fiona Chen',
					role: 'DevOps Lead',
					company: 'IntegratePro',
					avatar:
						'https://images.unsplash.com/photo-1580489944761-15a19d654956?w=100&h=100&fit=crop',
					initials: 'FC',
					rating: 5,
					date: '3 weeks ago',
				},
				{
					quote: 'Best onboarding experience we have ever had.',
					author: 'George Park',
					role: 'HR Director',
					company: 'OnboardFirst',
					avatar:
						'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=100&h=100&fit=crop',
					initials: 'GP',
					rating: 5,
					date: '3 weeks ago',
				},
			],
		},
		{
			id: 'all-time',
			label: 'All Time',
			testimonials: [
				{
					quote: 'Been using this for 2 years. Only gets better.',
					author: 'Hannah Davis',
					role: 'CEO',
					company: 'LongTermPro',
					avatar:
						'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100&h=100&fit=crop',
					initials: 'HD',
					rating: 5,
					date: 'Jan 2023',
				},
				{
					quote: 'Early adopter here. Best decision we ever made.',
					author: 'Ian Brooks',
					role: 'Founder',
					company: 'EarlyStage',
					avatar:
						'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&h=100&fit=crop',
					initials: 'IB',
					rating: 5,
					date: 'Nov 2022',
				},
				{
					quote: 'Recommended to dozens of colleagues over the years.',
					author: 'Julia Martinez',
					role: 'Consultant',
					company: 'Advisory Pro',
					avatar:
						'https://images.unsplash.com/photo-1573497019940-1c28c88b4f3e?w=100&h=100&fit=crop',
					initials: 'JM',
					rating: 5,
					date: 'Mar 2022',
				},
			],
		},
	];

	return (
		<section
			className="@container relative overflow-hidden"
			data-theme="testimonial"
		>
			<div className="mx-auto max-w-7xl px-4 @sm:px-6 @2xl:px-8 py-16 @md:py-20 @xl:py-24 @3xl:py-32">
				<SectionHeader
					badge="Recent Reviews"
					title="Fresh Customer Feedback"
					description="See what customers are saying right now about their experience."
				/>

				<Tabs defaultValue="this-week" className="w-full">
					<TabsList className="mb-8 @lg:mb-12 bg-muted/50 h-auto p-1 rounded-full w-fit">
						{timePeriods.map((period) => (
							<TabsTrigger
								key={period.id}
								value={period.id}
								className="px-5 py-2 rounded-full data-[state=active]:bg-primary data-[state=active]:text-primary-foreground"
							>
								{period.label}
							</TabsTrigger>
						))}
					</TabsList>

					{timePeriods.map((period) => (
						<TabsContent key={period.id} value={period.id}>
							<div className="grid grid-cols-1 @md:grid-cols-2 @xl:grid-cols-3 gap-6">
								{period.testimonials.map((item, index) => (
									<TimelineCard key={index} item={item} />
								))}
							</div>
						</TabsContent>
					))}
				</Tabs>
			</div>
		</section>
	);
}
