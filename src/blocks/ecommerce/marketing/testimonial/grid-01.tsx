import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent } from '@/components/ui/card';
import { Heart, Quote, Star } from 'lucide-react';

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
		<Badge variant="outline" className="mb-4 gap-2">
			<Heart className="size-3 fill-primary text-primary" />
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
	<div className="flex gap-0.5 mb-4">
		{Array.from({ length: 5 }).map((_, i) => (
			<Star
				key={i}
				className={`size-4 ${i < rating ? 'fill-primary text-primary' : 'text-muted/30'}`}
			/>
		))}
	</div>
);

const TestimonialCard = ({ item }: { item: TestimonialItem }) => (
	<Card className="h-full border-border/50 bg-card hover:bg-card/80 hover:shadow-lg hover:shadow-primary/5 hover:border-primary/20 transition-all duration-300 group">
		<CardContent className="p-6 flex flex-col h-full">
			<Quote className="size-8 text-primary/20 mb-2 group-hover:text-primary/40 transition-colors" />
			<StarRating rating={item.rating} />
			<p className="text-foreground leading-relaxed flex-1 mb-6">
				"{item.quote}"
			</p>
			<div className="flex items-center gap-3 pt-4 border-t border-border/50">
				<Avatar className="size-10 ring-2 ring-primary/10 group-hover:ring-primary/30 transition-all">
					<AvatarImage src={item.avatar} alt={item.author} />
					<AvatarFallback className="bg-primary/10 text-primary text-sm font-semibold">
						{item.initials}
					</AvatarFallback>
				</Avatar>
				<div>
					<p className="font-semibold text-sm text-foreground">{item.author}</p>
					<p className="text-xs text-muted-foreground">
						{item.role} at {item.company}
					</p>
				</div>
			</div>
		</CardContent>
	</Card>
);

const StatsBar = ({ items }: { items: { value: string; label: string }[] }) => (
	<div className="grid grid-cols-2 @md:grid-cols-4 gap-6 mt-12 @lg:mt-16 pt-12 border-t border-border/50">
		{items.map((item, index) => (
			<div key={index} className="text-center">
				<p className="text-3xl @md:text-4xl font-bold text-primary">
					{item.value}
				</p>
				<p className="text-sm text-muted-foreground mt-1">{item.label}</p>
			</div>
		))}
	</div>
);

export default function Main() {
	const testimonials: TestimonialItem[] = [
		{
			quote:
				'The platform has been instrumental in scaling our business. Highly recommended for anyone looking to grow.',
			author: 'Emma Thompson',
			role: 'CEO',
			company: 'GrowthLabs',
			avatar:
				'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100&h=100&fit=crop',
			initials: 'ET',
			rating: 5,
		},
		{
			quote:
				'Incredible value for the price. The features are comprehensive and the interface is intuitive.',
			author: 'James Wilson',
			role: 'CTO',
			company: 'TechVentures',
			avatar:
				'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&h=100&fit=crop',
			initials: 'JW',
			rating: 5,
		},
		{
			quote:
				'Customer support is top-notch. They resolved our issue within hours, not days.',
			author: 'Maria Garcia',
			role: 'Operations Director',
			company: 'Streamline Inc',
			avatar:
				'https://images.unsplash.com/photo-1580489944761-15a19d654956?w=100&h=100&fit=crop',
			initials: 'MG',
			rating: 5,
		},
		{
			quote:
				'We switched from a competitor and never looked back. The difference is night and day.',
			author: 'Alex Johnson',
			role: 'Product Manager',
			company: 'InnoSoft',
			avatar:
				'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop',
			initials: 'AJ',
			rating: 5,
		},
		{
			quote:
				'Perfect for teams of all sizes. We started with 5 users and now have over 200.',
			author: 'Sophie Brown',
			role: 'HR Director',
			company: 'PeopleFirst',
			avatar:
				'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=100&h=100&fit=crop',
			initials: 'SB',
			rating: 5,
		},
		{
			quote:
				'The analytics dashboard alone is worth the investment. Data-driven decisions made easy.',
			author: 'David Park',
			role: 'Data Lead',
			company: 'Analytics Pro',
			avatar:
				'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=100&h=100&fit=crop',
			initials: 'DP',
			rating: 5,
		},
	];

	const stats = [
		{ value: '10K+', label: 'Happy Customers' },
		{ value: '4.9', label: 'Average Rating' },
		{ value: '99%', label: 'Satisfaction Rate' },
		{ value: '24/7', label: 'Support Available' },
	];

	return (
		<section
			className="@container relative overflow-hidden"
			data-theme="testimonial"
		>
			<div className="mx-auto max-w-7xl px-4 @sm:px-6 @2xl:px-8 py-16 @md:py-20 @xl:py-24 @3xl:py-32">
				<SectionHeader
					badge="Customer Love"
					title="What People Are Saying"
					description="Join thousands of satisfied customers who have transformed their business with our solution."
				/>

				<div className="grid grid-cols-1 @md:grid-cols-2 @xl:grid-cols-3 gap-6">
					{testimonials.map((item, index) => (
						<TestimonialCard key={index} item={item} />
					))}
				</div>

				<StatsBar items={stats} />
			</div>
		</section>
	);
}
