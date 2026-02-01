import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent } from '@/components/ui/card';
import { Rows, Quote, Star, Verified } from 'lucide-react';

interface TestimonialItem {
	quote: string;
	author: string;
	role: string;
	company: string;
	avatar: string;
	initials: string;
	rating: number;
	verified?: boolean;
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
		<Badge variant="secondary" className="mb-4 gap-2">
			<Rows className="size-3" />
			{badge}
		</Badge>
		<h2 className="text-3xl @sm:text-4xl @lg:text-5xl font-bold tracking-tight">
			{title} <span className="text-primary">{highlight}</span>
		</h2>
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

const VerifiedBadge = () => (
	<div className="inline-flex items-center gap-1 text-xs text-primary font-medium">
		<Verified className="size-4 fill-primary text-primary-foreground" />
		Verified
	</div>
);

const LeftTestimonial = ({ item }: { item: TestimonialItem }) => (
	<div className="grid grid-cols-1 @lg:grid-cols-2 gap-6 items-center">
		<Card className="order-2 @lg:order-1 border-border/50 bg-card hover:shadow-lg hover:shadow-primary/5 hover:border-primary/20 transition-all duration-300 group">
			<CardContent className="p-6 @lg:p-8">
				<div className="flex items-center justify-between mb-4">
					<Quote className="size-8 text-primary/20" />
					{item.verified && <VerifiedBadge />}
				</div>
				<StarRating rating={item.rating} />
				<p className="text-foreground text-lg leading-relaxed mt-4 mb-6 font-medium">
					"{item.quote}"
				</p>
				<div className="flex items-center gap-4 pt-4 border-t border-border/50">
					<Avatar className="size-12 ring-2 ring-primary/10 group-hover:ring-primary/30 transition-all">
						<AvatarImage src={item.avatar} alt={item.author} />
						<AvatarFallback className="bg-primary/10 text-primary font-semibold">
							{item.initials}
						</AvatarFallback>
					</Avatar>
					<div>
						<p className="font-bold text-foreground">{item.author}</p>
						<p className="text-muted-foreground text-sm">
							{item.role} · {item.company}
						</p>
					</div>
				</div>
			</CardContent>
		</Card>
		<div className="order-1 @lg:order-2 aspect-video @lg:aspect-square rounded-xl bg-gradient-to-br from-primary/20 via-primary/10 to-primary/5 flex items-center justify-center">
			<Avatar className="size-32 ring-4 ring-primary/20">
				<AvatarImage src={item.avatar} alt={item.author} />
				<AvatarFallback className="bg-primary text-primary-foreground font-bold text-4xl">
					{item.initials}
				</AvatarFallback>
			</Avatar>
		</div>
	</div>
);

const RightTestimonial = ({ item }: { item: TestimonialItem }) => (
	<div className="grid grid-cols-1 @lg:grid-cols-2 gap-6 items-center">
		<div className="aspect-video @lg:aspect-square rounded-xl bg-gradient-to-br from-primary/20 via-primary/10 to-primary/5 flex items-center justify-center">
			<Avatar className="size-32 ring-4 ring-primary/20">
				<AvatarImage src={item.avatar} alt={item.author} />
				<AvatarFallback className="bg-primary text-primary-foreground font-bold text-4xl">
					{item.initials}
				</AvatarFallback>
			</Avatar>
		</div>
		<Card className="border-border/50 bg-card hover:shadow-lg hover:shadow-primary/5 hover:border-primary/20 transition-all duration-300 group">
			<CardContent className="p-6 @lg:p-8">
				<div className="flex items-center justify-between mb-4">
					<Quote className="size-8 text-primary/20" />
					{item.verified && <VerifiedBadge />}
				</div>
				<StarRating rating={item.rating} />
				<p className="text-foreground text-lg leading-relaxed mt-4 mb-6 font-medium">
					"{item.quote}"
				</p>
				<div className="flex items-center gap-4 pt-4 border-t border-border/50">
					<Avatar className="size-12 ring-2 ring-primary/10 group-hover:ring-primary/30 transition-all">
						<AvatarImage src={item.avatar} alt={item.author} />
						<AvatarFallback className="bg-primary/10 text-primary font-semibold">
							{item.initials}
						</AvatarFallback>
					</Avatar>
					<div>
						<p className="font-bold text-foreground">{item.author}</p>
						<p className="text-muted-foreground text-sm">
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
				'The platform has revolutionized our customer service. Response times dropped by 60% and satisfaction scores are at an all-time high.',
			author: 'Grace Lee',
			role: 'CX Director',
			company: 'ServiceFirst',
			avatar:
				'https://images.unsplash.com/photo-1580489944761-15a19d654956?w=100&h=100&fit=crop',
			initials: 'GL',
			rating: 5,
			verified: true,
		},
		{
			quote:
				'We evaluated many solutions before choosing this one. The decision was easy once we saw the results other companies were achieving.',
			author: 'Henry Park',
			role: 'VP Engineering',
			company: 'TechEval',
			avatar:
				'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop',
			initials: 'HP',
			rating: 5,
			verified: true,
		},
	];

	return (
		<section
			className="@container relative overflow-hidden"
			data-theme="testimonial"
		>
			<div className="mx-auto max-w-7xl px-4 @sm:px-6 @2xl:px-8 py-16 @md:py-20 @xl:py-24 @3xl:py-32">
				<SectionHeader
					badge="Split View"
					title="Customer"
					highlight="Experiences"
				/>

				<div className="space-y-12 @lg:space-y-16">
					<LeftTestimonial item={testimonials[0]} />
					<RightTestimonial item={testimonials[1]} />
				</div>
			</div>
		</section>
	);
}
