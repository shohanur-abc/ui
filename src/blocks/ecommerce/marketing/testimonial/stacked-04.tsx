import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent } from '@/components/ui/card';
import { AlignVerticalSpaceAround, Quote, Star } from 'lucide-react';

interface TestimonialItem {
	quote: string;
	author: string;
	role: string;
	company: string;
	avatar: string;
	initials: string;
	rating: number;
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
	<div className="text-center mb-12 @lg:mb-16">
		<Badge variant="secondary" className="mb-4 gap-2">
			<AlignVerticalSpaceAround className="size-3" />
			{badge}
		</Badge>
		<h2 className="text-3xl @sm:text-4xl @lg:text-5xl font-bold tracking-tight mb-4">
			{title}
		</h2>
		<p className="text-muted-foreground text-base @md:text-lg max-w-2xl mx-auto">
			{description}
		</p>
	</div>
);

const StarRating = ({ rating }: { rating: number }) => (
	<div className="flex gap-0.5">
		{Array.from({ length: 5 }).map((_, i) => (
			<Star
				key={i}
				className={`size-4 ${i < rating ? 'fill-primary text-primary' : 'text-muted/30'}`}
			/>
		))}
	</div>
);

const TestimonialRow = ({
	item,
	reverse = false,
}: {
	item: TestimonialItem;
	reverse?: boolean;
}) => (
	<Card className="border-border/50 bg-card hover:shadow-lg hover:shadow-primary/5 hover:border-primary/20 transition-all duration-300 group">
		<CardContent className="p-6">
			<div
				className={`flex flex-col @md:flex-row gap-6 ${reverse ? '@md:flex-row-reverse' : ''}`}
			>
				<div className="flex items-center gap-4 @md:w-64 shrink-0">
					<Avatar className="size-14 ring-2 ring-primary/10 group-hover:ring-primary/30 transition-all">
						<AvatarImage src={item.avatar} alt={item.author} />
						<AvatarFallback className="bg-primary text-primary-foreground font-bold">
							{item.initials}
						</AvatarFallback>
					</Avatar>
					<div>
						<p className="font-bold text-foreground">{item.author}</p>
						<p className="text-sm text-muted-foreground">{item.role}</p>
						<p className="text-xs text-muted-foreground">{item.company}</p>
					</div>
				</div>
				<div className="flex-1">
					<div className="flex items-center gap-3 mb-3">
						<Quote className="size-6 text-primary/30" />
						<StarRating rating={item.rating} />
					</div>
					<p className="text-foreground leading-relaxed">"{item.quote}"</p>
				</div>
			</div>
		</CardContent>
	</Card>
);

export default function Main() {
	const testimonials: TestimonialItem[] = [
		{
			quote:
				'The platform transformed our entire workflow. Tasks that took hours now take minutes. Highly recommend for any growing team.',
			author: 'Yolanda Davis',
			role: 'VP of Engineering',
			company: 'TechFlow',
			avatar: 'https://images.unsplash.com/photo-1573497019940-1c28c88b4f3e?w=100&h=100&fit=crop',
			initials: 'YD',
			rating: 5,
		},
		{
			quote:
				'Customer support responded within minutes and resolved our issue on the first call. That level of service is rare.',
			author: 'Zach Brown',
			role: 'IT Director',
			company: 'SupportPro',
			avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&h=100&fit=crop',
			initials: 'ZB',
			rating: 5,
		},
		{
			quote:
				'We evaluated 10+ solutions before choosing this one. Best decision we made all year. The ROI was immediate.',
			author: 'Amanda Foster',
			role: 'CEO',
			company: 'GrowthLabs',
			avatar: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?w=100&h=100&fit=crop',
			initials: 'AF',
			rating: 5,
		},
		{
			quote:
				'The analytics dashboard alone is worth the investment. We finally have visibility into our key metrics.',
			author: 'Brian Kim',
			role: 'Data Lead',
			company: 'InsightCorp',
			avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop',
			initials: 'BK',
			rating: 5,
		},
	];

	return (
		<section className="@container relative overflow-hidden" data-theme="testimonial">
			<div className="mx-auto max-w-5xl px-4 @sm:px-6 @2xl:px-8 py-16 @md:py-20 @xl:py-24 @3xl:py-32">
				<SectionHeader
					badge="Stacked List"
					title="Customer Testimonials"
					description="Real feedback from real customers who have transformed their business."
				/>

				<div className="flex flex-col gap-4">
					{testimonials.map((item, index) => (
						<TestimonialRow key={index} item={item} reverse={index % 2 === 1} />
					))}
				</div>
			</div>
		</section>
	);
}
