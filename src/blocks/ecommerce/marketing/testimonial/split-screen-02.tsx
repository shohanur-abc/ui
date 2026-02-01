import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent } from '@/components/ui/card';
import { LayoutPanelLeft, Quote, Star, TrendingUp } from 'lucide-react';

interface TestimonialItem {
	quote: string;
	author: string;
	role: string;
	company: string;
	avatar: string;
	initials: string;
	rating: number;
}

interface MetricItem {
	value: string;
	label: string;
	icon: React.ElementType;
}

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

const MetricCard = ({ metric }: { metric: MetricItem }) => (
	<div className="flex items-center gap-4 p-4 bg-primary/5 rounded-xl border border-primary/10">
		<div className="size-12 rounded-lg bg-primary/10 flex items-center justify-center">
			<metric.icon className="size-6 text-primary" />
		</div>
		<div>
			<p className="text-2xl font-bold text-primary">{metric.value}</p>
			<p className="text-sm text-muted-foreground">{metric.label}</p>
		</div>
	</div>
);

const ImageSide = ({ metrics }: { metrics: MetricItem[] }) => (
	<div className="relative">
		<div className="aspect-square @lg:aspect-[4/5] rounded-2xl bg-gradient-to-br from-primary/20 via-primary/10 to-primary/5 flex items-center justify-center">
			<LayoutPanelLeft className="size-32 text-primary/20" />
		</div>
		<div className="absolute -bottom-6 -right-6 @lg:bottom-8 @lg:-right-8 space-y-3">
			{metrics.map((metric, index) => (
				<MetricCard key={index} metric={metric} />
			))}
		</div>
	</div>
);

const TestimonialsList = ({
	testimonials,
}: {
	testimonials: TestimonialItem[];
}) => (
	<div className="space-y-4">
		{testimonials.map((item, index) => (
			<Card
				key={index}
				className="border-border/50 bg-card hover:shadow-lg hover:shadow-primary/5 hover:border-primary/20 transition-all duration-300 group"
			>
				<CardContent className="p-5 @lg:p-6">
					<Quote className="size-6 text-primary/20 mb-3" />
					<StarRating rating={item.rating} />
					<p className="text-foreground leading-relaxed mb-4">"{item.quote}"</p>
					<div className="flex items-center gap-3 pt-3 border-t border-border/50">
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
				</CardContent>
			</Card>
		))}
	</div>
);

const ContentHeader = ({
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
	<div className="mb-8">
		<Badge className="mb-4 gap-2 bg-primary text-primary-foreground">
			<TrendingUp className="size-3" />
			{badge}
		</Badge>
		<h2 className="text-3xl @sm:text-4xl font-bold tracking-tight mb-4">
			{title} <span className="text-primary">{highlight}</span>
		</h2>
		<p className="text-muted-foreground">{description}</p>
	</div>
);

export default function Main() {
	const metrics: MetricItem[] = [
		{ value: '99%', label: 'Satisfaction', icon: TrendingUp },
		{ value: '4.9/5', label: 'Rating', icon: Star },
	];

	const testimonials: TestimonialItem[] = [
		{
			quote:
				'The onboarding experience was seamless. We were up and running within hours.',
			author: 'Carol Wright',
			role: 'Operations Lead',
			company: 'QuickStart',
			avatar:
				'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100&h=100&fit=crop',
			initials: 'CW',
			rating: 5,
		},
		{
			quote:
				'Support team is incredibly responsive. They helped us at every step.',
			author: 'David Kim',
			role: 'IT Manager',
			company: 'TechSupport',
			avatar:
				'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&h=100&fit=crop',
			initials: 'DK',
			rating: 5,
		},
		{
			quote: 'Best platform we have used. ROI was visible in the first month.',
			author: 'Emma Johnson',
			role: 'CFO',
			company: 'ROI First',
			avatar:
				'https://images.unsplash.com/photo-1573497019940-1c28c88b4f3e?w=100&h=100&fit=crop',
			initials: 'EJ',
			rating: 5,
		},
	];

	return (
		<section
			className="@container relative overflow-hidden"
			data-theme="testimonial"
		>
			<div className="mx-auto max-w-7xl px-4 @sm:px-6 @2xl:px-8 py-16 @md:py-20 @xl:py-24 @3xl:py-32">
				<div className="grid grid-cols-1 @lg:grid-cols-2 gap-12 @lg:gap-20 items-start">
					<ImageSide metrics={metrics} />
					<div>
						<ContentHeader
							badge="Success Stories"
							title="Real Results from"
							highlight="Real Customers"
							description="See how businesses like yours are achieving success with our platform."
						/>
						<TestimonialsList testimonials={testimonials} />
					</div>
				</div>
			</div>
		</section>
	);
}
