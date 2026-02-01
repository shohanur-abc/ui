import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { ArrowRight, Globe, Quote, Star } from 'lucide-react';

interface TestimonialItem {
	quote: string;
	author: string;
	role: string;
	company: string;
	avatar: string;
	initials: string;
	rating: number;
	location: string;
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
			<Globe className="size-3" />
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

const LocationBadge = ({ text }: { text: string }) => (
	<span className="text-xs text-muted-foreground bg-muted px-2 py-1 rounded-full">
		📍 {text}
	</span>
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

const TestimonialCard = ({ item }: { item: TestimonialItem }) => (
	<Card className="h-full border-border/50 bg-card hover:shadow-lg hover:shadow-primary/5 hover:border-primary/20 transition-all duration-300 group">
		<CardContent className="p-6 flex flex-col h-full">
			<div className="flex items-center justify-between mb-4">
				<Quote className="size-7 text-primary/20 group-hover:text-primary/40 transition-colors" />
				<LocationBadge text={item.location} />
			</div>
			<StarRating rating={item.rating} />
			<p className="text-foreground leading-relaxed flex-1 mt-4 mb-6">
				"{item.quote}"
			</p>
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

const CTASection = ({
	text,
	buttonText,
}: {
	text: string;
	buttonText: string;
}) => (
	<div className="text-center mt-12 @lg:mt-16">
		<p className="text-muted-foreground mb-4">{text}</p>
		<Button size="lg" className="gap-2 group">
			{buttonText}
			<ArrowRight className="size-4 group-hover:translate-x-1 transition-transform" />
		</Button>
	</div>
);

export default function Main() {
	const testimonials: TestimonialItem[] = [
		{
			quote:
				'Even with the time zone difference, support is always available and responsive.',
			author: 'Carlos Mendoza',
			role: 'Operations Manager',
			company: 'LATAM Tech',
			avatar:
				'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&h=100&fit=crop',
			initials: 'CM',
			rating: 5,
			location: 'São Paulo, Brazil',
		},
		{
			quote:
				'Multi-language support made it easy to roll out across all our European offices.',
			author: 'Diana Schmidt',
			role: 'Regional Director',
			company: 'Euro Solutions',
			avatar:
				'https://images.unsplash.com/photo-1580489944761-15a19d654956?w=100&h=100&fit=crop',
			initials: 'DS',
			rating: 5,
			location: 'Berlin, Germany',
		},
		{
			quote:
				'Local data centers mean we get excellent performance for our APAC customers.',
			author: 'Eric Wong',
			role: 'Tech Director',
			company: 'Asia Pacific Corp',
			avatar:
				'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop',
			initials: 'EW',
			rating: 5,
			location: 'Singapore',
		},
		{
			quote:
				'Compliance with local regulations was seamless. They understand global business.',
			author: 'Fatima Al-Hassan',
			role: 'Legal Director',
			company: 'Gulf Enterprises',
			avatar:
				'https://images.unsplash.com/photo-1573497019940-1c28c88b4f3e?w=100&h=100&fit=crop',
			initials: 'FA',
			rating: 5,
			location: 'Dubai, UAE',
		},
	];

	return (
		<section
			className="@container relative overflow-hidden"
			data-theme="testimonial"
		>
			<div className="mx-auto max-w-7xl px-4 @sm:px-6 @2xl:px-8 py-16 @md:py-20 @xl:py-24 @3xl:py-32">
				<SectionHeader
					badge="Global Reach"
					title="Loved Around the World"
					description="Companies across continents trust us to power their operations."
				/>

				<div className="grid grid-cols-1 @md:grid-cols-2 @xl:grid-cols-4 gap-6">
					{testimonials.map((item, index) => (
						<TestimonialCard key={index} item={item} />
					))}
				</div>

				<CTASection
					text="Join thousands of companies worldwide"
					buttonText="Get Started Today"
				/>
			</div>
		</section>
	);
}
