import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent } from '@/components/ui/card';
import { CircleCheck, Quote, Sparkles, Star } from 'lucide-react';

interface TestimonialItem {
	quote: string;
	author: string;
	role: string;
	company: string;
	avatar: string;
	initials: string;
	rating: number;
}

interface StatItem {
	value: string;
	label: string;
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
			<Sparkles className="size-3" />
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
	<div className="flex justify-center gap-0.5 mb-4">
		{Array.from({ length: 5 }).map((_, i) => (
			<Star
				key={i}
				className={`size-5 ${i < rating ? 'fill-primary text-primary' : 'text-muted/30'}`}
			/>
		))}
	</div>
);

const StatsBar = ({ stats }: { stats: StatItem[] }) => (
	<div className="grid grid-cols-2 @md:grid-cols-4 gap-4 mb-12 @lg:mb-16">
		{stats.map((stat, index) => (
			<div key={index} className="text-center p-4 @md:p-6 bg-muted/30 rounded-xl">
				<p className="text-2xl @md:text-3xl font-bold text-primary mb-1">{stat.value}</p>
				<p className="text-sm text-muted-foreground">{stat.label}</p>
			</div>
		))}
	</div>
);

const CenteredTestimonial = ({ item }: { item: TestimonialItem }) => (
	<Card className="text-center border-border/50 bg-card hover:shadow-lg hover:shadow-primary/5 hover:border-primary/20 transition-all duration-300 group h-full">
		<CardContent className="p-6 @md:p-8 flex flex-col h-full">
			<div className="flex justify-center mb-4">
				<div className="relative">
					<Avatar className="size-16 ring-4 ring-primary/10 group-hover:ring-primary/30 transition-all">
						<AvatarImage src={item.avatar} alt={item.author} />
						<AvatarFallback className="bg-primary text-primary-foreground font-bold text-lg">
							{item.initials}
						</AvatarFallback>
					</Avatar>
					<div className="absolute -bottom-1 -right-1 size-6 rounded-full bg-primary text-primary-foreground flex items-center justify-center">
						<CircleCheck className="size-4" />
					</div>
				</div>
			</div>
			<StarRating rating={item.rating} />
			<Quote className="size-8 text-primary/20 mx-auto mb-3" />
			<p className="text-foreground text-lg leading-relaxed flex-1 mb-5">"{item.quote}"</p>
			<div className="pt-4 border-t border-border/50">
				<p className="font-bold text-foreground">{item.author}</p>
				<p className="text-muted-foreground text-sm">
					{item.role} · {item.company}
				</p>
			</div>
		</CardContent>
	</Card>
);

export default function Main() {
	const stats: StatItem[] = [
		{ value: '50K+', label: 'Happy Customers' },
		{ value: '4.9', label: 'Average Rating' },
		{ value: '99%', label: 'Satisfaction Rate' },
		{ value: '24/7', label: 'Support Available' },
	];

	const testimonials: TestimonialItem[] = [
		{
			quote:
				'The platform exceeded all our expectations. Implementation was smooth and results were immediate.',
			author: 'Tina Johnson',
			role: 'Product Manager',
			company: 'ProductFirst',
			avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100&h=100&fit=crop',
			initials: 'TJ',
			rating: 5,
		},
		{
			quote:
				'Customer support is outstanding. They resolved our issues within minutes.',
			author: 'Uma Patel',
			role: 'IT Director',
			company: 'TechSupport',
			avatar: 'https://images.unsplash.com/photo-1573497019940-1c28c88b4f3e?w=100&h=100&fit=crop',
			initials: 'UP',
			rating: 5,
		},
		{
			quote:
				'Best ROI we have ever seen from a software investment. Highly recommend.',
			author: 'Victor Lee',
			role: 'CFO',
			company: 'ROI Masters',
			avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&h=100&fit=crop',
			initials: 'VL',
			rating: 5,
		},
	];

	return (
		<section className="@container relative overflow-hidden" data-theme="testimonial">
			<div className="mx-auto max-w-7xl px-4 @sm:px-6 @2xl:px-8 py-16 @md:py-20 @xl:py-24 @3xl:py-32">
				<SectionHeader
					badge="Verified Reviews"
					title="Trusted by Thousands"
					description="See why customers choose us and keep coming back."
				/>

				<StatsBar stats={stats} />

				<div className="grid grid-cols-1 @md:grid-cols-2 @xl:grid-cols-3 gap-6">
					{testimonials.map((item, index) => (
						<CenteredTestimonial key={index} item={item} />
					))}
				</div>
			</div>
		</section>
	);
}
