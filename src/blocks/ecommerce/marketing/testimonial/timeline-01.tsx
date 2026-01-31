import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent } from '@/components/ui/card';
import { Clock, Quote, Star } from 'lucide-react';

interface TestimonialItem {
	quote: string;
	author: string;
	role: string;
	company: string;
	avatar: string;
	initials: string;
	rating: number;
	date: string;
	milestone?: string;
}

const SectionHeader = ({
	badge,
	title,
	highlight,
	description,
}: {
	badge: string;
	title: string;
	highlight: string;
	description: string;
}) => (
	<div className="text-center mb-12 @lg:mb-16">
		<Badge className="mb-4 gap-2 bg-primary text-primary-foreground">
			<Clock className="size-3" />
			{badge}
		</Badge>
		<h2 className="text-3xl @sm:text-4xl @lg:text-5xl font-bold tracking-tight mb-4">
			{title} <span className="text-primary">{highlight}</span>
		</h2>
		<p className="text-muted-foreground text-base @md:text-lg max-w-2xl mx-auto">
			{description}
		</p>
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

const TimelineDot = ({ milestone }: { milestone?: string }) => (
	<div className="absolute left-0 @lg:left-1/2 top-0 @lg:top-1/2 -translate-x-1/2 @lg:-translate-y-1/2 z-10">
		<div className="size-4 rounded-full bg-primary ring-4 ring-background" />
		{milestone && (
			<div className="absolute left-6 @lg:left-auto @lg:-top-8 @lg:left-1/2 @lg:-translate-x-1/2 whitespace-nowrap">
				<Badge variant="secondary" className="text-xs">
					{milestone}
				</Badge>
			</div>
		)}
	</div>
);

const TimelineCard = ({
	item,
	position,
}: {
	item: TestimonialItem;
	position: 'left' | 'right';
}) => (
	<div
		className={`relative pl-8 @lg:pl-0 @lg:w-[calc(50%-2rem)] ${
			position === 'left' ? '@lg:pr-0 @lg:text-right @lg:mr-auto' : '@lg:pl-0 @lg:ml-auto'
		}`}
	>
		<TimelineDot milestone={item.milestone} />
		<Card className="border-border/50 bg-card hover:shadow-lg hover:shadow-primary/5 hover:border-primary/20 transition-all duration-300 group">
			<CardContent className="p-5 @lg:p-6">
				<div
					className={`flex items-start gap-3 mb-3 ${
						position === 'left' ? '@lg:flex-row-reverse' : ''
					}`}
				>
					<Quote className="size-6 text-primary/20 shrink-0" />
					<span className="text-xs text-muted-foreground">{item.date}</span>
				</div>
				<div className={position === 'left' ? '@lg:flex @lg:justify-end' : ''}>
					<StarRating rating={item.rating} />
				</div>
				<p className="text-foreground leading-relaxed mb-4">"{item.quote}"</p>
				<div
					className={`flex items-center gap-3 pt-3 border-t border-border/50 ${
						position === 'left' ? '@lg:flex-row-reverse' : ''
					}`}
				>
					<Avatar className="size-10 ring-2 ring-primary/10 group-hover:ring-primary/30 transition-all">
						<AvatarImage src={item.avatar} alt={item.author} />
						<AvatarFallback className="bg-primary/10 text-primary font-semibold text-sm">
							{item.initials}
						</AvatarFallback>
					</Avatar>
					<div className={position === 'left' ? '@lg:text-right' : ''}>
						<p className="font-semibold text-sm text-foreground">{item.author}</p>
						<p className="text-xs text-muted-foreground">
							{item.role} · {item.company}
						</p>
					</div>
				</div>
			</CardContent>
		</Card>
	</div>
);

export default function Main() {
	const testimonials: TestimonialItem[] = [
		{
			quote:
				'Started using the platform and saw immediate improvements in our workflow efficiency.',
			author: 'Liam Foster',
			role: 'Operations Lead',
			company: 'StartupFirst',
			avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&h=100&fit=crop',
			initials: 'LF',
			rating: 5,
			date: 'January 2023',
			milestone: 'Day 1',
		},
		{
			quote:
				'After 30 days, we had fully integrated with our existing tools. Seamless experience.',
			author: 'Maria Chen',
			role: 'IT Manager',
			company: 'TechIntegrate',
			avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100&h=100&fit=crop',
			initials: 'MC',
			rating: 5,
			date: 'February 2023',
			milestone: 'Month 1',
		},
		{
			quote:
				'By Q2, our team productivity had increased by 40%. The ROI was undeniable.',
			author: 'Nathan Park',
			role: 'VP Operations',
			company: 'ProductivityPlus',
			avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop',
			initials: 'NP',
			rating: 5,
			date: 'April 2023',
			milestone: 'Month 3',
		},
		{
			quote:
				'One year later and we cannot imagine working without it. Absolutely essential.',
			author: 'Olivia Wright',
			role: 'CEO',
			company: 'GrowthCorp',
			avatar: 'https://images.unsplash.com/photo-1573497019940-1c28c88b4f3e?w=100&h=100&fit=crop',
			initials: 'OW',
			rating: 5,
			date: 'January 2024',
			milestone: 'Year 1',
		},
	];

	return (
		<section className="@container relative overflow-hidden" data-theme="testimonial">
			<div className="mx-auto max-w-7xl px-4 @sm:px-6 @2xl:px-8 py-16 @md:py-20 @xl:py-24 @3xl:py-32">
				<SectionHeader
					badge="Journey"
					title="Customer"
					highlight="Success Timeline"
					description="Follow the journey of our customers from first use to long-term success."
				/>

				<div className="relative">
					<div className="absolute left-0 @lg:left-1/2 top-0 bottom-0 w-0.5 bg-border @lg:-translate-x-1/2" />

					<div className="space-y-8 @lg:space-y-12">
						{testimonials.map((item, index) => (
							<TimelineCard
								key={index}
								item={item}
								position={index % 2 === 0 ? 'left' : 'right'}
							/>
						))}
					</div>
				</div>
			</div>
		</section>
	);
}
