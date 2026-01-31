import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent } from '@/components/ui/card';
import { Route, Quote, Star, ArrowRight } from 'lucide-react';

interface TestimonialItem {
	quote: string;
	author: string;
	role: string;
	company: string;
	avatar: string;
	initials: string;
	rating: number;
	step: string;
	stepNumber: number;
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
			<Route className="size-3" />
			{badge}
		</Badge>
		<h2 className="text-3xl @sm:text-4xl @lg:text-5xl font-bold tracking-tight">
			{title} <span className="text-primary">{highlight}</span>
		</h2>
	</div>
);

const StarRating = ({ rating }: { rating: number }) => (
	<div className="flex gap-0.5 mb-3">
		{Array.from({ length: 5 }).map((_, i) => (
			<Star
				key={i}
				className={`size-4 ${i < rating ? 'fill-primary text-primary' : 'text-muted/30'}`}
			/>
		))}
	</div>
);

const StepIndicator = ({ number, step }: { number: number; step: string }) => (
	<div className="flex flex-col items-center mb-4">
		<div className="size-12 rounded-full bg-primary text-primary-foreground font-bold text-lg flex items-center justify-center mb-2">
			{number}
		</div>
		<span className="text-sm font-semibold text-primary">{step}</span>
	</div>
);

const StepArrow = () => (
	<div className="hidden @lg:flex items-center justify-center">
		<ArrowRight className="size-8 text-border" />
	</div>
);

const StepCard = ({
	item,
	showArrow,
}: {
	item: TestimonialItem;
	showArrow: boolean;
}) => (
	<>
		<div className="flex flex-col">
			<StepIndicator number={item.stepNumber} step={item.step} />
			<Card className="flex-1 border-border/50 bg-card hover:shadow-lg hover:shadow-primary/5 hover:border-primary/20 transition-all duration-300 group">
				<CardContent className="p-5 text-center flex flex-col h-full">
					<Quote className="size-6 text-primary/20 mx-auto mb-3" />
					<StarRating rating={item.rating} />
					<p className="text-foreground leading-relaxed flex-1 mb-4">"{item.quote}"</p>
					<div className="flex flex-col items-center gap-2 pt-3 border-t border-border/50">
						<Avatar className="size-10 ring-2 ring-primary/10 group-hover:ring-primary/30 transition-all">
							<AvatarImage src={item.avatar} alt={item.author} />
							<AvatarFallback className="bg-primary/10 text-primary font-semibold text-sm">
								{item.initials}
							</AvatarFallback>
						</Avatar>
						<div className="text-center">
							<p className="font-semibold text-sm text-foreground">{item.author}</p>
							<p className="text-xs text-muted-foreground">
								{item.role} · {item.company}
							</p>
						</div>
					</div>
				</CardContent>
			</Card>
		</div>
		{showArrow && <StepArrow />}
	</>
);

export default function Main() {
	const testimonials: TestimonialItem[] = [
		{
			quote:
				'The demo showed us exactly what we needed. Clear and comprehensive.',
			author: 'Carla Young',
			role: 'Director',
			company: 'DemoPro',
			avatar: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?w=100&h=100&fit=crop',
			initials: 'CY',
			rating: 5,
			step: 'Demo',
			stepNumber: 1,
		},
		{
			quote:
				'Onboarding was personalized to our specific business needs.',
			author: 'Derek Brown',
			role: 'Ops Manager',
			company: 'OnboardFirst',
			avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&h=100&fit=crop',
			initials: 'DB',
			rating: 5,
			step: 'Onboard',
			stepNumber: 2,
		},
		{
			quote:
				'Launch was smooth. We were live in production same day.',
			author: 'Elena Kim',
			role: 'CTO',
			company: 'LaunchCorp',
			avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100&h=100&fit=crop',
			initials: 'EK',
			rating: 5,
			step: 'Launch',
			stepNumber: 3,
		},
		{
			quote:
				'Ongoing optimization has maximized our results continuously.',
			author: 'Frank Lee',
			role: 'Growth Lead',
			company: 'OptimizeInc',
			avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop',
			initials: 'FL',
			rating: 5,
			step: 'Optimize',
			stepNumber: 4,
		},
	];

	return (
		<section className="@container relative overflow-hidden" data-theme="testimonial">
			<div className="mx-auto max-w-7xl px-4 @sm:px-6 @2xl:px-8 py-16 @md:py-20 @xl:py-24 @3xl:py-32">
				<SectionHeader
					badge="Roadmap"
					title="Your Path to"
					highlight="Success"
				/>

				<div className="grid grid-cols-1 @sm:grid-cols-2 @xl:grid-cols-7 gap-6 items-start">
					{testimonials.map((item, index) => (
						<StepCard
							key={index}
							item={item}
							showArrow={index < testimonials.length - 1}
						/>
					))}
				</div>
			</div>
		</section>
	);
}
