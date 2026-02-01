import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { ArrowUpRight, MessageCircle, Play, Quote, Star } from 'lucide-react';

interface TestimonialItem {
	quote: string;
	author: string;
	role: string;
	company: string;
	avatar: string;
	initials: string;
	rating: number;
	hasVideo?: boolean;
}

const SectionHeader = ({
	badge,
	title,
	description,
	ctaText,
	ctaIcon: CtaIcon,
}: {
	badge: string;
	title: string;
	description: string;
	ctaText: string;
	ctaIcon: React.ElementType;
}) => (
	<div className="flex flex-col @lg:flex-row @lg:items-end @lg:justify-between gap-6 mb-12 @lg:mb-16">
		<div className="max-w-2xl">
			<Badge variant="secondary" className="mb-4 gap-2">
				<MessageCircle className="size-3" />
				{badge}
			</Badge>
			<h2 className="text-3xl @sm:text-4xl @lg:text-5xl font-bold tracking-tight mb-4">
				{title}
			</h2>
			<p className="text-muted-foreground text-lg">{description}</p>
		</div>
		<Button
			variant="outline"
			className="gap-2 shrink-0 self-start @lg:self-auto"
		>
			{ctaText}
			<CtaIcon className="size-4" />
		</Button>
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

const VideoButton = () => (
	<button className="absolute top-4 right-4 size-10 bg-primary text-primary-foreground rounded-full flex items-center justify-center shadow-lg hover:scale-110 transition-transform">
		<Play className="size-4 fill-current" />
	</button>
);

const TestimonialCard = ({ item }: { item: TestimonialItem }) => (
	<Card className="relative h-full border-border/50 bg-card hover:shadow-lg hover:shadow-primary/5 hover:border-primary/20 transition-all duration-300 group overflow-hidden">
		{item.hasVideo && <VideoButton />}
		<CardContent className="p-6 flex flex-col h-full">
			<Quote className="size-8 text-primary/20 mb-4 group-hover:text-primary/40 transition-colors" />
			<StarRating rating={item.rating} />
			<p className="text-foreground leading-relaxed flex-1 mt-4 mb-6">
				"{item.quote}"
			</p>
			<div className="flex items-center justify-between pt-4 border-t border-border/50">
				<div className="flex items-center gap-3">
					<Avatar className="size-10 ring-2 ring-primary/10 group-hover:ring-primary/30 transition-all">
						<AvatarImage src={item.avatar} alt={item.author} />
						<AvatarFallback className="bg-primary/10 text-primary font-semibold text-sm">
							{item.initials}
						</AvatarFallback>
					</Avatar>
					<div>
						<p className="font-semibold text-sm text-foreground">
							{item.author}
						</p>
						<p className="text-xs text-muted-foreground">
							{item.role} · {item.company}
						</p>
					</div>
				</div>
			</div>
		</CardContent>
	</Card>
);

const TrustIndicators = ({
	items,
}: {
	items: { value: string; label: string }[];
}) => (
	<div className="flex flex-wrap justify-center gap-8 @lg:gap-12 mt-12 @lg:mt-16 pt-12 border-t border-border/50">
		{items.map((item, index) => (
			<div key={index} className="text-center">
				<p className="text-2xl @md:text-3xl font-bold text-foreground">
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
				'This tool has completely transformed how we collaborate. Communication is smoother, projects finish faster.',
			author: 'Amanda Chen',
			role: 'Team Lead',
			company: 'CollabHub',
			avatar:
				'https://images.unsplash.com/photo-1580489944761-15a19d654956?w=100&h=100&fit=crop',
			initials: 'AC',
			rating: 5,
			hasVideo: true,
		},
		{
			quote:
				'Intuitive design that actually makes sense. No more confusion or endless training sessions.',
			author: 'Brandon Wells',
			role: 'UX Director',
			company: 'DesignFirst',
			avatar:
				'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&h=100&fit=crop',
			initials: 'BW',
			rating: 5,
		},
		{
			quote:
				'The automation features alone saved us 20+ hours per week. An absolute must-have.',
			author: 'Claire Douglas',
			role: 'Operations Manager',
			company: 'Streamline Pro',
			avatar:
				'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100&h=100&fit=crop',
			initials: 'CD',
			rating: 5,
		},
		{
			quote:
				'Support team responds within minutes. That level of service is rare these days.',
			author: 'Derek Foster',
			role: 'IT Director',
			company: 'TechForward',
			avatar:
				'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop',
			initials: 'DF',
			rating: 5,
			hasVideo: true,
		},
		{
			quote:
				'We saw ROI within the first month. The investment paid for itself almost immediately.',
			author: 'Emily Grant',
			role: 'CFO',
			company: 'FinanceFirst',
			avatar:
				'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=100&h=100&fit=crop',
			initials: 'EG',
			rating: 5,
		},
	];

	const trustIndicators = [
		{ value: '4.9/5', label: 'Average Rating' },
		{ value: '15K+', label: 'Happy Customers' },
		{ value: '50M+', label: 'Tasks Completed' },
		{ value: '99.9%', label: 'Uptime' },
	];

	return (
		<section
			className="@container relative overflow-hidden"
			data-theme="testimonial"
		>
			<div className="mx-auto max-w-7xl px-4 @sm:px-6 @2xl:px-8 py-16 @md:py-20 @xl:py-24 @3xl:py-32">
				<SectionHeader
					badge="Customer Stories"
					title="Hear What Our Customers Say"
					description="Real feedback from real users who have transformed their workflows with our platform."
					ctaText="View All Reviews"
					ctaIcon={ArrowUpRight}
				/>

				<div className="grid grid-cols-1 @md:grid-cols-2 @xl:grid-cols-3 gap-6">
					{testimonials.map((item, index) => (
						<TestimonialCard key={index} item={item} />
					))}
				</div>

				<TrustIndicators items={trustIndicators} />
			</div>
		</section>
	);
}
