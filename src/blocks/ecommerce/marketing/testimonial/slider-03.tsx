import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent } from '@/components/ui/card';
import { LayoutList, Quote, Star } from 'lucide-react';

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
		<Badge className="mb-4 gap-2 bg-primary text-primary-foreground">
			<LayoutList className="size-3" />
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

const VerticalSlide = ({ item }: { item: TestimonialItem }) => (
	<Card className="shrink-0 h-[280px] @md:h-[320px] border-border/50 bg-card hover:shadow-lg hover:shadow-primary/5 hover:border-primary/20 transition-all duration-300 snap-center group">
		<CardContent className="p-6 flex flex-col h-full">
			<Quote className="size-8 text-primary/20 mb-3" />
			<StarRating rating={item.rating} />
			<p className="text-foreground leading-relaxed flex-1 mt-3 line-clamp-4">
				"{item.quote}"
			</p>
			<div className="flex items-center gap-3 pt-4 border-t border-border/50 mt-auto">
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

const Pagination = ({ current, total }: { current: number; total: number }) => (
	<div className="flex items-center justify-center gap-4 mt-8">
		<span className="text-sm text-muted-foreground">
			{current + 1} / {total}
		</span>
		<div className="flex gap-2">
			{Array.from({ length: total }).map((_, i) => (
				<button
					key={i}
					className={`h-2 rounded-full transition-all ${
						i === current
							? 'w-8 bg-primary'
							: 'w-2 bg-muted-foreground/30 hover:bg-muted-foreground/50'
					}`}
					aria-label={`Go to slide ${i + 1}`}
				/>
			))}
		</div>
	</div>
);

export default function Main() {
	const testimonials: TestimonialItem[] = [
		{
			quote:
				'This solution has streamlined our entire workflow. We now accomplish in hours what used to take days.',
			author: 'Lisa Park',
			role: 'Operations Manager',
			company: 'Efficiency Pro',
			avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100&h=100&fit=crop',
			initials: 'LP',
			rating: 5,
		},
		{
			quote:
				'The customer success team went above and beyond to ensure our integration was smooth.',
			author: 'Michael Chen',
			role: 'Tech Lead',
			company: 'IntegrateCo',
			avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&h=100&fit=crop',
			initials: 'MC',
			rating: 5,
		},
		{
			quote:
				'We evaluated several solutions and this was the clear winner in terms of features and value.',
			author: 'Nancy Williams',
			role: 'Procurement Lead',
			company: 'EvaluatePro',
			avatar: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?w=100&h=100&fit=crop',
			initials: 'NW',
			rating: 5,
		},
		{
			quote:
				'The reporting and analytics have given us visibility we never had before. Transformative.',
			author: 'Oliver Brown',
			role: 'Data Analyst',
			company: 'InsightFirst',
			avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop',
			initials: 'OB',
			rating: 5,
		},
		{
			quote:
				'Security and compliance were our top priorities. This platform exceeded all requirements.',
			author: 'Patricia Davis',
			role: 'Security Director',
			company: 'SecureFirst',
			avatar: 'https://images.unsplash.com/photo-1573497019940-1c28c88b4f3e?w=100&h=100&fit=crop',
			initials: 'PD',
			rating: 5,
		},
	];

	return (
		<section className="@container relative overflow-hidden" data-theme="testimonial">
			<div className="mx-auto max-w-7xl px-4 @sm:px-6 @2xl:px-8 py-16 @md:py-20 @xl:py-24 @3xl:py-32">
				<SectionHeader
					badge="Slider View"
					title="Customer Feedback"
					description="Scroll through testimonials from customers who have achieved remarkable results."
				/>

				<div className="grid grid-cols-1 @sm:grid-cols-2 @lg:grid-cols-3 @xl:grid-cols-5 gap-4">
					{testimonials.map((item, index) => (
						<VerticalSlide key={index} item={item} />
					))}
				</div>

				<Pagination current={0} total={5} />
			</div>
		</section>
	);
}
