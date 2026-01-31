import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent } from '@/components/ui/card';
import { Crown, Quote, Sparkles, Star } from 'lucide-react';

interface TestimonialItem {
	quote: string;
	author: string;
	role: string;
	company: string;
	companyLogo?: string;
	avatar: string;
	initials: string;
	rating: number;
	featured?: boolean;
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
	<div className="max-w-3xl mx-auto text-center mb-12 @lg:mb-16">
		<Badge variant="outline" className="mb-4 gap-2 border-primary/30">
			<Crown className="size-3 text-primary" />
			{badge}
		</Badge>
		<h2 className="text-3xl @sm:text-4xl @lg:text-5xl font-bold tracking-tight mb-4">
			{title} <span className="text-primary">{highlight}</span>
		</h2>
		<p className="text-muted-foreground text-base @md:text-lg">{description}</p>
	</div>
);

const StarRating = ({ rating, size = 'sm' }: { rating: number; size?: 'sm' | 'lg' }) => (
	<div className="flex gap-0.5">
		{Array.from({ length: 5 }).map((_, i) => (
			<Star
				key={i}
				className={`${size === 'lg' ? 'size-5' : 'size-4'} ${
					i < rating ? 'fill-primary text-primary' : 'text-muted/30'
				}`}
			/>
		))}
	</div>
);

const FeaturedCard = ({ item }: { item: TestimonialItem }) => (
	<Card className="border-primary/30 bg-gradient-to-br from-primary/5 via-card to-card shadow-lg shadow-primary/5 hover:shadow-xl hover:shadow-primary/10 transition-all duration-500">
		<CardContent className="p-8 @lg:p-10">
			<div className="flex items-center justify-between mb-6">
				<Badge className="bg-primary text-primary-foreground gap-1">
					<Sparkles className="size-3" />
					Featured Review
				</Badge>
				<StarRating rating={item.rating} size="lg" />
			</div>
			<Quote className="size-12 text-primary/20 mb-4" />
			<p className="text-xl @lg:text-2xl text-foreground leading-relaxed font-medium mb-8">
				"{item.quote}"
			</p>
			<div className="flex items-center gap-4">
				<Avatar className="size-14 ring-4 ring-primary/20">
					<AvatarImage src={item.avatar} alt={item.author} />
					<AvatarFallback className="bg-primary text-primary-foreground font-bold text-lg">
						{item.initials}
					</AvatarFallback>
				</Avatar>
				<div>
					<p className="font-bold text-lg text-foreground">{item.author}</p>
					<p className="text-muted-foreground">
						{item.role} at {item.company}
					</p>
				</div>
			</div>
		</CardContent>
	</Card>
);

const StandardCard = ({ item }: { item: TestimonialItem }) => (
	<Card className="h-full border-border/50 bg-card hover:shadow-lg hover:shadow-primary/5 hover:border-primary/20 transition-all duration-300 group">
		<CardContent className="p-6 flex flex-col h-full">
			<div className="flex items-center justify-between mb-4">
				<Quote className="size-8 text-primary/20 group-hover:text-primary/40 transition-colors" />
				<StarRating rating={item.rating} />
			</div>
			<p className="text-foreground leading-relaxed flex-1 mb-6">"{item.quote}"</p>
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
	const featuredTestimonial: TestimonialItem = {
		quote:
			'Implementing this solution was the best decision we made this year. Our team productivity has increased dramatically and our customers are happier than ever. The platform truly delivers on its promises.',
		author: 'Victoria Sterling',
		role: 'Chief Executive Officer',
		company: 'Enterprise Solutions',
		avatar: 'https://images.unsplash.com/photo-1573497019940-1c28c88b4f3e?w=100&h=100&fit=crop',
		initials: 'VS',
		rating: 5,
		featured: true,
	};

	const testimonials: TestimonialItem[] = [
		{
			quote: 'Exceptional product with incredible attention to detail. Worth every penny.',
			author: 'Mark Johnson',
			role: 'Founder',
			company: 'StartupXYZ',
			avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&h=100&fit=crop',
			initials: 'MJ',
			rating: 5,
		},
		{
			quote:
				'The best customer experience we have ever had with any software vendor.',
			author: 'Elena Rodriguez',
			role: 'VP Operations',
			company: 'GlobalCorp',
			avatar: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?w=100&h=100&fit=crop',
			initials: 'ER',
			rating: 5,
		},
		{
			quote:
				'Powerful features, simple interface. Our team adopted it instantly.',
			author: 'Kevin Park',
			role: 'Tech Lead',
			company: 'CodeCraft',
			avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop',
			initials: 'KP',
			rating: 5,
		},
		{
			quote:
				'We migrated from three different tools to this one. It does it all.',
			author: 'Sarah Mitchell',
			role: 'Project Manager',
			company: 'Agile Studio',
			avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100&h=100&fit=crop',
			initials: 'SM',
			rating: 5,
		},
	];

	return (
		<section className="@container relative overflow-hidden" data-theme="testimonial">
			<div className="mx-auto max-w-7xl px-4 @sm:px-6 @2xl:px-8 py-16 @md:py-20 @xl:py-24 @3xl:py-32">
				<SectionHeader
					badge="Top Rated"
					title="Loved by"
					highlight="Industry Leaders"
					description="See why the world's best companies choose us as their trusted partner."
				/>

				<div className="grid grid-cols-1 @xl:grid-cols-2 gap-6 @xl:gap-8 mb-6 @xl:mb-8">
					<FeaturedCard item={featuredTestimonial} />
					<div className="grid grid-cols-1 @md:grid-cols-2 @xl:grid-cols-1 gap-6">
						{testimonials.slice(0, 2).map((item, index) => (
							<StandardCard key={index} item={item} />
						))}
					</div>
				</div>

				<div className="grid grid-cols-1 @md:grid-cols-2 gap-6">
					{testimonials.slice(2).map((item, index) => (
						<StandardCard key={index} item={item} />
					))}
				</div>
			</div>
		</section>
	);
}
