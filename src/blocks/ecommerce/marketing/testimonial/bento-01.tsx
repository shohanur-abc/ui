import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent } from '@/components/ui/card';
import { LayoutGrid, Quote, Star } from 'lucide-react';

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
			<LayoutGrid className="size-3" />
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

const LargeCard = ({ item }: { item: TestimonialItem }) => (
	<Card className="h-full border-primary/20 bg-gradient-to-br from-primary/10 via-card to-card shadow-lg shadow-primary/5 hover:shadow-xl hover:shadow-primary/10 transition-all duration-500 group">
		<CardContent className="p-8 @lg:p-10 flex flex-col h-full">
			<Quote className="size-12 text-primary/30 mb-6" />
			<StarRating rating={item.rating} />
			<p className="text-foreground text-xl @lg:text-2xl @xl:text-3xl leading-relaxed font-medium flex-1 mt-4 mb-8">
				"{item.quote}"
			</p>
			<div className="flex items-center gap-4 pt-6 border-t border-primary/20">
				<Avatar className="size-16 ring-4 ring-primary/20 group-hover:ring-primary/40 transition-all">
					<AvatarImage src={item.avatar} alt={item.author} />
					<AvatarFallback className="bg-primary text-primary-foreground font-bold text-xl">
						{item.initials}
					</AvatarFallback>
				</Avatar>
				<div>
					<p className="font-bold text-xl text-foreground">{item.author}</p>
					<p className="text-muted-foreground text-lg">
						{item.role} at {item.company}
					</p>
				</div>
			</div>
		</CardContent>
	</Card>
);

const MediumCard = ({ item }: { item: TestimonialItem }) => (
	<Card className="h-full border-border/50 bg-card hover:shadow-lg hover:shadow-primary/5 hover:border-primary/20 transition-all duration-300 group">
		<CardContent className="p-6 flex flex-col h-full">
			<Quote className="size-8 text-primary/20 mb-3" />
			<StarRating rating={item.rating} />
			<p className="text-foreground text-base leading-relaxed flex-1 mt-3 mb-5">
				"{item.quote}"
			</p>
			<div className="flex items-center gap-3 pt-4 border-t border-border/50">
				<Avatar className="size-11 ring-2 ring-primary/10 group-hover:ring-primary/30 transition-all">
					<AvatarImage src={item.avatar} alt={item.author} />
					<AvatarFallback className="bg-primary/10 text-primary font-semibold">
						{item.initials}
					</AvatarFallback>
				</Avatar>
				<div>
					<p className="font-semibold text-foreground">{item.author}</p>
					<p className="text-sm text-muted-foreground">
						{item.role} · {item.company}
					</p>
				</div>
			</div>
		</CardContent>
	</Card>
);

export default function Main() {
	const featured: TestimonialItem = {
		quote:
			'This platform completely transformed how our team collaborates. We have seen a 50% increase in productivity and our customer satisfaction scores have never been higher.',
		author: 'Harrison Ford',
		role: 'Director of Operations',
		company: 'Innovation Labs',
		avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&h=100&fit=crop',
		initials: 'HF',
		rating: 5,
	};

	const testimonials: TestimonialItem[] = [
		{
			quote:
				'The automation features alone saved us 20 hours per week. Incredible ROI.',
			author: 'Ingrid Bergman',
			role: 'Operations Lead',
			company: 'Streamline Co',
			avatar: 'https://images.unsplash.com/photo-1573497019940-1c28c88b4f3e?w=100&h=100&fit=crop',
			initials: 'IB',
			rating: 5,
		},
		{
			quote:
				'Customer support is phenomenal. They helped us every step of the way.',
			author: 'James Dean',
			role: 'Customer Success',
			company: 'HelpFirst',
			avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop',
			initials: 'JD',
			rating: 5,
		},
		{
			quote:
				'Enterprise-grade security with startup-friendly pricing. Perfect for us.',
			author: 'Kate Williams',
			role: 'Security Lead',
			company: 'SecureTech',
			avatar: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?w=100&h=100&fit=crop',
			initials: 'KW',
			rating: 5,
		},
	];

	return (
		<section className="@container relative overflow-hidden" data-theme="testimonial">
			<div className="mx-auto max-w-7xl px-4 @sm:px-6 @2xl:px-8 py-16 @md:py-20 @xl:py-24 @3xl:py-32">
				<SectionHeader
					badge="Bento Layout"
					title="Customer Success Stories"
					description="See how companies of all sizes are achieving remarkable results with our platform."
				/>

				<div className="grid grid-cols-1 @lg:grid-cols-2 gap-6">
					<LargeCard item={featured} />
					<div className="grid grid-cols-1 gap-6">
						{testimonials.map((item, index) => (
							<MediumCard key={index} item={item} />
						))}
					</div>
				</div>
			</div>
		</section>
	);
}
