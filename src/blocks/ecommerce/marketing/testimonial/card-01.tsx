import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent } from '@/components/ui/card';
import { Quote, Shield, Star } from 'lucide-react';

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
	highlight,
	description,
}: {
	badge: string;
	title: string;
	highlight: string;
	description: string;
}) => (
	<div className="text-center mb-12 @lg:mb-16">
		<Badge variant="outline" className="mb-4 gap-2 border-primary/30">
			<Shield className="size-3 text-primary" />
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
	<Card className="h-full border-border/50 bg-card backdrop-blur-sm hover:shadow-xl hover:shadow-primary/5 hover:border-primary/20 transition-all duration-500 group">
		<CardContent className="p-6 @md:p-8 flex flex-col h-full">
			<Quote className="size-10 text-primary/15 mb-4 group-hover:text-primary/30 transition-colors" />
			<StarRating rating={item.rating} />
			<p className="text-foreground text-lg leading-relaxed flex-1 mb-6">
				"{item.quote}"
			</p>
			<div className="flex items-center gap-4 pt-6 border-t border-border/50">
				<Avatar className="size-12 ring-2 ring-primary/10 group-hover:ring-primary/30 group-hover:scale-105 transition-all">
					<AvatarImage src={item.avatar} alt={item.author} />
					<AvatarFallback className="bg-primary text-primary-foreground font-semibold">
						{item.initials}
					</AvatarFallback>
				</Avatar>
				<div>
					<p className="font-semibold text-foreground">{item.author}</p>
					<p className="text-sm text-muted-foreground">
						{item.role} at {item.company}
					</p>
				</div>
			</div>
		</CardContent>
	</Card>
);

export default function Main() {
	const testimonials: TestimonialItem[] = [
		{
			quote:
				'The security features are enterprise-grade while still being easy to set up. Perfect balance.',
			author: 'Nathan Clarke',
			role: 'CISO',
			company: 'SecureCorp',
			avatar:
				'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&h=100&fit=crop',
			initials: 'NC',
			rating: 5,
		},
		{
			quote:
				'From startup to enterprise, this platform scales with you. We started small and now serve millions.',
			author: 'Olivia Bennett',
			role: 'VP Engineering',
			company: 'ScaleUp Tech',
			avatar:
				'https://images.unsplash.com/photo-1580489944761-15a19d654956?w=100&h=100&fit=crop',
			initials: 'OB',
			rating: 5,
		},
		{
			quote:
				'Customer success team is phenomenal. They truly understand enterprise needs.',
			author: 'Peter Zhang',
			role: 'Director of IT',
			company: 'Global Solutions',
			avatar:
				'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop',
			initials: 'PZ',
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
					badge="Enterprise Ready"
					title="Trusted by the"
					highlight="Best Teams"
					description="Industry leaders rely on our platform for mission-critical operations."
				/>

				<div className="grid grid-cols-1 @lg:grid-cols-3 gap-6 @xl:gap-8">
					{testimonials.map((item, index) => (
						<TestimonialCard key={index} item={item} />
					))}
				</div>
			</div>
		</section>
	);
}
