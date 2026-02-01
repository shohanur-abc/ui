import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent } from '@/components/ui/card';
import { Building2, Quote, Star, TrendingUp } from 'lucide-react';

interface TestimonialItem {
	quote: string;
	author: string;
	role: string;
	company: string;
	avatar: string;
	initials: string;
	rating: number;
	metric?: { value: string; label: string };
}

const SectionHeader = ({
	icon: Icon,
	badge,
	title,
	highlight,
}: {
	icon: React.ElementType;
	badge: string;
	title: string;
	highlight: string;
}) => (
	<div className="text-center mb-12 @lg:mb-16">
		<Badge className="mb-4 gap-2 bg-primary/10 text-primary border-primary/20 hover:bg-primary/20">
			<Icon className="size-3" />
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

const MetricBadge = ({ value, label }: { value: string; label: string }) => (
	<div className="inline-flex items-center gap-2 bg-primary/10 text-primary px-3 py-1.5 rounded-full text-sm font-medium">
		<TrendingUp className="size-3.5" />
		<span>{value}</span>
		<span className="text-primary/70">{label}</span>
	</div>
);

const TestimonialCard = ({ item }: { item: TestimonialItem }) => (
	<Card className="h-full border-border/50 bg-gradient-to-br from-card to-card/50 hover:shadow-xl hover:shadow-primary/5 hover:border-primary/30 transition-all duration-500 group">
		<CardContent className="p-6 @lg:p-8 flex flex-col h-full">
			<div className="flex items-start justify-between gap-4 mb-6">
				<Quote className="size-10 text-primary/20 shrink-0" />
				{item.metric && (
					<MetricBadge value={item.metric.value} label={item.metric.label} />
				)}
			</div>
			<StarRating rating={item.rating} />
			<p className="text-foreground text-lg leading-relaxed flex-1 mt-4 mb-6">
				"{item.quote}"
			</p>
			<div className="flex items-center gap-4 pt-6 border-t border-border/50">
				<Avatar className="size-12 ring-2 ring-primary/10 group-hover:ring-primary/30 transition-all">
					<AvatarImage src={item.avatar} alt={item.author} />
					<AvatarFallback className="bg-primary text-primary-foreground font-bold">
						{item.initials}
					</AvatarFallback>
				</Avatar>
				<div>
					<p className="font-bold text-foreground">{item.author}</p>
					<p className="text-sm text-muted-foreground flex items-center gap-1.5">
						{item.role}
						<span className="text-border">•</span>
						<Building2 className="size-3" />
						{item.company}
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
				'Since implementing this solution, we have seen a dramatic improvement in our sales conversion rates. The ROI was visible within the first quarter.',
			author: 'Catherine Bell',
			role: 'VP of Sales',
			company: 'SalesForce Pro',
			avatar:
				'https://images.unsplash.com/photo-1573497019940-1c28c88b4f3e?w=100&h=100&fit=crop',
			initials: 'CB',
			rating: 5,
			metric: { value: '+127%', label: 'conversion' },
		},
		{
			quote:
				'The integration was seamless and the learning curve was minimal. Our entire team was up and running within a week.',
			author: 'Michael Foster',
			role: 'Engineering Director',
			company: 'BuildRight',
			avatar:
				'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&h=100&fit=crop',
			initials: 'MF',
			rating: 5,
			metric: { value: '5 days', label: 'to deploy' },
		},
		{
			quote:
				'Outstanding platform with enterprise-grade features at a startup-friendly price. Highly recommend for growing teams.',
			author: 'Lisa Chang',
			role: 'Founder & CEO',
			company: 'LaunchPad',
			avatar:
				'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=100&h=100&fit=crop',
			initials: 'LC',
			rating: 5,
			metric: { value: '50%', label: 'cost savings' },
		},
		{
			quote:
				'The analytics capabilities have transformed how we make decisions. Data that used to take days to compile is now available instantly.',
			author: 'Ryan Mitchell',
			role: 'Data Scientist',
			company: 'DataDriven',
			avatar:
				'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=100&h=100&fit=crop',
			initials: 'RM',
			rating: 5,
			metric: { value: '10x', label: 'faster insights' },
		},
	];

	return (
		<section
			className="@container relative overflow-hidden"
			data-theme="testimonial"
		>
			<div className="mx-auto max-w-7xl px-4 @sm:px-6 @2xl:px-8 py-16 @md:py-20 @xl:py-24 @3xl:py-32">
				<SectionHeader
					icon={TrendingUp}
					badge="Proven Results"
					title="Real Impact,"
					highlight="Real Numbers"
				/>

				<div className="grid grid-cols-1 @lg:grid-cols-2 gap-6 @xl:gap-8">
					{testimonials.map((item, index) => (
						<TestimonialCard key={index} item={item} />
					))}
				</div>
			</div>
		</section>
	);
}
