import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent } from '@/components/ui/card';
import { CalendarCheck, Quote, Star, TrendingUp } from 'lucide-react';

interface TestimonialItem {
	quote: string;
	author: string;
	role: string;
	company: string;
	avatar: string;
	initials: string;
	rating: number;
	milestone: string;
	metric: {
		value: string;
		label: string;
	};
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
		<Badge className="mb-4 gap-2 bg-primary text-primary-foreground">
			<CalendarCheck className="size-3" />
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
	<div className="inline-flex items-center gap-2 px-3 py-1.5 bg-primary/10 rounded-full border border-primary/20">
		<TrendingUp className="size-4 text-primary" />
		<span className="text-sm font-bold text-primary">{value}</span>
		<span className="text-xs text-muted-foreground">{label}</span>
	</div>
);

const HorizontalTimeline = ({
	testimonials,
}: {
	testimonials: TestimonialItem[];
}) => (
	<div className="relative">
		<div className="absolute top-[28px] left-0 right-0 h-0.5 bg-border" />
		<div className="flex gap-6 overflow-x-auto pb-4 snap-x snap-mandatory scrollbar-hide">
			{testimonials.map((item, index) => (
				<div
					key={index}
					className="relative shrink-0 w-[300px] @md:w-[350px] snap-center"
				>
					<div className="flex items-center gap-2 mb-6">
						<div className="size-6 rounded-full bg-primary text-primary-foreground flex items-center justify-center text-xs font-bold relative z-10">
							{index + 1}
						</div>
						<Badge variant="secondary" className="text-xs">
							{item.milestone}
						</Badge>
					</div>
					<Card className="border-border/50 bg-card hover:shadow-lg hover:shadow-primary/5 hover:border-primary/20 transition-all duration-300 group">
						<CardContent className="p-5">
							<div className="flex items-center justify-between mb-3">
								<Quote className="size-6 text-primary/20" />
								<MetricBadge
									value={item.metric.value}
									label={item.metric.label}
								/>
							</div>
							<StarRating rating={item.rating} />
							<p className="text-foreground leading-relaxed mt-3 mb-4 line-clamp-3">
								"{item.quote}"
							</p>
							<div className="flex items-center gap-3 pt-3 border-t border-border/50">
								<Avatar className="size-9 ring-2 ring-primary/10 group-hover:ring-primary/30 transition-all">
									<AvatarImage src={item.avatar} alt={item.author} />
									<AvatarFallback className="bg-primary/10 text-primary font-semibold text-xs">
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
				</div>
			))}
		</div>
	</div>
);

export default function Main() {
	const testimonials: TestimonialItem[] = [
		{
			quote:
				'Signed up and deployed in a single day. The onboarding was incredibly smooth.',
			author: 'Tara Johnson',
			role: 'Tech Lead',
			company: 'QuickDeploy',
			avatar: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?w=100&h=100&fit=crop',
			initials: 'TJ',
			rating: 5,
			milestone: 'Week 1',
			metric: { value: '1 day', label: 'to deploy' },
		},
		{
			quote:
				'Team fully trained and productive. The learning curve was minimal.',
			author: 'Ulrich Park',
			role: 'Training Lead',
			company: 'LearnFast',
			avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&h=100&fit=crop',
			initials: 'UP',
			rating: 5,
			milestone: 'Week 2',
			metric: { value: '100%', label: 'trained' },
		},
		{
			quote:
				'First major milestone achieved. Productivity metrics are up significantly.',
			author: 'Victoria Lee',
			role: 'Ops Manager',
			company: 'MilestoneInc',
			avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100&h=100&fit=crop',
			initials: 'VL',
			rating: 5,
			milestone: 'Month 1',
			metric: { value: '+40%', label: 'efficiency' },
		},
		{
			quote:
				'Quarterly review showed exceptional results. ROI exceeded projections.',
			author: 'William Chen',
			role: 'CFO',
			company: 'ROITrack',
			avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop',
			initials: 'WC',
			rating: 5,
			milestone: 'Quarter 1',
			metric: { value: '3x', label: 'ROI' },
		},
		{
			quote:
				'One year anniversary! This platform is now critical to our operations.',
			author: 'Xena Davis',
			role: 'CEO',
			company: 'AnnualCorp',
			avatar: 'https://images.unsplash.com/photo-1573497019940-1c28c88b4f3e?w=100&h=100&fit=crop',
			initials: 'XD',
			rating: 5,
			milestone: 'Year 1',
			metric: { value: '10x', label: 'growth' },
		},
	];

	return (
		<section className="@container relative overflow-hidden" data-theme="testimonial">
			<div className="mx-auto max-w-7xl px-4 @sm:px-6 @2xl:px-8 py-16 @md:py-20 @xl:py-24 @3xl:py-32">
				<SectionHeader
					badge="Milestones"
					title="The Customer"
					highlight="Journey"
				/>

				<HorizontalTimeline testimonials={testimonials} />
			</div>
		</section>
	);
}
