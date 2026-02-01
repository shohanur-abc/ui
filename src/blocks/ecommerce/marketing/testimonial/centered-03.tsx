import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent } from '@/components/ui/card';
import { AlignVerticalJustifyCenter, Quote, Star } from 'lucide-react';

interface TestimonialItem {
	quote: string;
	author: string;
	role: string;
	company: string;
	avatar: string;
	initials: string;
	rating: number;
	isFeatured?: boolean;
}

const SectionHeader = ({
	badge,
	title,
	highlight,
}: {
	badge: string;
	title: string;
	highlight: string;
}) => (
	<div className="text-center mb-12 @lg:mb-16">
		<Badge variant="outline" className="mb-4 gap-2 border-primary/30">
			<AlignVerticalJustifyCenter className="size-3 text-primary" />
			{badge}
		</Badge>
		<h2 className="text-3xl @sm:text-4xl @lg:text-5xl font-bold tracking-tight">
			{title} <span className="text-primary">{highlight}</span>
		</h2>
	</div>
);

const StarRating = ({
	rating,
	centered = true,
}: {
	rating: number;
	centered?: boolean;
}) => (
	<div className={`flex gap-0.5 mb-4 ${centered ? 'justify-center' : ''}`}>
		{Array.from({ length: 5 }).map((_, i) => (
			<Star
				key={i}
				className={`size-4 ${i < rating ? 'fill-primary text-primary' : 'text-muted/30'}`}
			/>
		))}
	</div>
);

const FeaturedCard = ({ item }: { item: TestimonialItem }) => (
	<Card className="text-center border-primary/20 bg-gradient-to-br from-primary/10 via-card to-card shadow-xl shadow-primary/5 group">
		<CardContent className="p-8 @md:p-10">
			<div className="flex justify-center mb-5">
				<Avatar className="size-20 ring-4 ring-primary/20 group-hover:ring-primary/40 transition-all">
					<AvatarImage src={item.avatar} alt={item.author} />
					<AvatarFallback className="bg-primary text-primary-foreground font-bold text-xl">
						{item.initials}
					</AvatarFallback>
				</Avatar>
			</div>
			<StarRating rating={item.rating} />
			<Quote className="size-10 text-primary/20 mx-auto mb-4" />
			<p className="text-foreground text-xl @lg:text-2xl leading-relaxed font-medium mb-6">
				"{item.quote}"
			</p>
			<div className="pt-5 border-t border-border/50">
				<p className="font-bold text-lg text-foreground">{item.author}</p>
				<p className="text-muted-foreground">
					{item.role} · {item.company}
				</p>
			</div>
		</CardContent>
	</Card>
);

const StandardCard = ({ item }: { item: TestimonialItem }) => (
	<Card className="text-center border-border/50 bg-card hover:shadow-lg hover:shadow-primary/5 hover:border-primary/20 transition-all duration-300 group h-full">
		<CardContent className="p-6 flex flex-col h-full">
			<div className="flex justify-center mb-4">
				<Avatar className="size-12 ring-2 ring-primary/10 group-hover:ring-primary/30 transition-all">
					<AvatarImage src={item.avatar} alt={item.author} />
					<AvatarFallback className="bg-primary/10 text-primary font-semibold">
						{item.initials}
					</AvatarFallback>
				</Avatar>
			</div>
			<StarRating rating={item.rating} />
			<p className="text-foreground leading-relaxed flex-1 mb-4">
				"{item.quote}"
			</p>
			<div className="pt-4 border-t border-border/50">
				<p className="font-semibold text-sm text-foreground">{item.author}</p>
				<p className="text-xs text-muted-foreground">
					{item.role} · {item.company}
				</p>
			</div>
		</CardContent>
	</Card>
);

export default function Main() {
	const featuredTestimonial: TestimonialItem = {
		quote:
			'The best decision we ever made was switching to this platform. It has transformed our entire operation and the results speak for themselves.',
		author: 'Olivia Grant',
		role: 'CEO',
		company: 'TransformCo',
		avatar:
			'https://images.unsplash.com/photo-1580489944761-15a19d654956?w=100&h=100&fit=crop',
		initials: 'OG',
		rating: 5,
		isFeatured: true,
	};

	const testimonials: TestimonialItem[] = [
		{
			quote: 'Increased our productivity by 40% in just one month.',
			author: 'Patrick Chen',
			role: 'Operations Lead',
			company: 'ProductivityPlus',
			avatar:
				'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&h=100&fit=crop',
			initials: 'PC',
			rating: 5,
		},
		{
			quote: 'The support team is responsive and incredibly helpful.',
			author: 'Quinn Foster',
			role: 'IT Manager',
			company: 'SupportFirst',
			avatar:
				'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=100&h=100&fit=crop',
			initials: 'QF',
			rating: 5,
		},
		{
			quote: 'Seamless integration with all our existing tools.',
			author: 'Rachel Davis',
			role: 'Tech Lead',
			company: 'IntegratePro',
			avatar:
				'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100&h=100&fit=crop',
			initials: 'RD',
			rating: 5,
		},
		{
			quote: 'Best value for money in the market.',
			author: 'Sam Williams',
			role: 'CFO',
			company: 'ValueFirst',
			avatar:
				'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop',
			initials: 'SW',
			rating: 5,
		},
	];

	return (
		<section
			className="@container relative overflow-hidden"
			data-theme="testimonial"
		>
			<div className="mx-auto max-w-7xl px-4 @sm:px-6 @2xl:px-8 py-16 @md:py-20 @xl:py-24 @3xl:py-32">
				<SectionHeader
					badge="Centered Layout"
					title="Customer"
					highlight="Stories"
				/>

				<div className="grid grid-cols-1 @lg:grid-cols-3 gap-6">
					<div className="@lg:col-span-2">
						<FeaturedCard item={featuredTestimonial} />
					</div>
					<div className="grid grid-cols-1 @sm:grid-cols-2 @lg:grid-cols-1 gap-4">
						{testimonials.slice(0, 2).map((item, index) => (
							<StandardCard key={index} item={item} />
						))}
					</div>
				</div>

				<div className="grid grid-cols-1 @sm:grid-cols-2 @lg:grid-cols-4 gap-4 mt-6">
					{testimonials.map((item, index) => (
						<StandardCard key={index} item={item} />
					))}
				</div>
			</div>
		</section>
	);
}
