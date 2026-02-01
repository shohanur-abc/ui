import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent } from '@/components/ui/card';
import { Flame, Quote, Star, Zap } from 'lucide-react';

interface TestimonialItem {
	quote: string;
	author: string;
	role: string;
	company: string;
	avatar: string;
	initials: string;
	rating: number;
	impact: string;
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
			<Flame className="size-3" />
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

const ImpactBadge = ({ text }: { text: string }) => (
	<div className="inline-flex items-center gap-1.5 bg-primary/10 text-primary px-2.5 py-1 rounded-md text-sm font-medium">
		<Zap className="size-3.5" />
		{text}
	</div>
);

const TestimonialCard = ({ item }: { item: TestimonialItem }) => (
	<Card className="h-full border-border/50 bg-card hover:shadow-lg hover:shadow-primary/5 hover:border-primary/20 hover:-translate-y-1 transition-all duration-300 group">
		<CardContent className="p-6 flex flex-col h-full">
			<div className="flex items-start justify-between mb-4">
				<Quote className="size-8 text-primary/20 group-hover:text-primary/40 transition-colors" />
				<ImpactBadge text={item.impact} />
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

export default function Main() {
	const testimonials: TestimonialItem[] = [
		{
			quote:
				'Implementation was a breeze. We were live in under 48 hours with zero downtime.',
			author: 'Rebecca Stone',
			role: 'CTO',
			company: 'FastDeploy',
			avatar:
				'https://images.unsplash.com/photo-1573497019940-1c28c88b4f3e?w=100&h=100&fit=crop',
			initials: 'RS',
			rating: 5,
			impact: '48hr Setup',
		},
		{
			quote:
				'Our customer satisfaction scores jumped 40 points after switching to this platform.',
			author: 'Steven Park',
			role: 'Customer Success',
			company: 'HappyCustomers',
			avatar:
				'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=100&h=100&fit=crop',
			initials: 'SP',
			rating: 5,
			impact: '+40 NPS',
		},
		{
			quote:
				'The analytics dashboard gives us real-time visibility into every aspect of our business.',
			author: 'Tina Williams',
			role: 'Data Analyst',
			company: 'DataFirst',
			avatar:
				'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=100&h=100&fit=crop',
			initials: 'TW',
			rating: 5,
			impact: 'Real-time Data',
		},
		{
			quote:
				'We cut operational costs by 35% while improving service quality. Remarkable results.',
			author: 'Uma Patel',
			role: 'Operations Director',
			company: 'EfficiencyPro',
			avatar:
				'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100&h=100&fit=crop',
			initials: 'UP',
			rating: 5,
			impact: '-35% Costs',
		},
	];

	return (
		<section
			className="@container relative overflow-hidden"
			data-theme="testimonial"
		>
			<div className="mx-auto max-w-7xl px-4 @sm:px-6 @2xl:px-8 py-16 @md:py-20 @xl:py-24 @3xl:py-32">
				<SectionHeader
					badge="Hot Takes"
					title="Results That Speak for Themselves"
					description="Real outcomes from businesses that made the switch to our platform."
				/>

				<div className="grid grid-cols-1 @md:grid-cols-2 @xl:grid-cols-4 gap-6">
					{testimonials.map((item, index) => (
						<TestimonialCard key={index} item={item} />
					))}
				</div>
			</div>
		</section>
	);
}
