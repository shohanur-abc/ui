import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent } from '@/components/ui/card';
import { Wind, Quote, Star } from 'lucide-react';

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
		<Badge variant="secondary" className="mb-4 gap-2">
			<Wind className="size-3" />
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
	<div className="flex gap-0.5">
		{Array.from({ length: 5 }).map((_, i) => (
			<Star
				key={i}
				className={`size-4 ${i < rating ? 'fill-primary text-primary' : 'text-muted/30'}`}
			/>
		))}
	</div>
);

const FloatingCard = ({
	item,
	position,
}: {
	item: TestimonialItem;
	position: { top?: string; left?: string; right?: string; bottom?: string };
}) => (
	<Card
		className="absolute border-border/50 bg-card/95 backdrop-blur-sm shadow-xl shadow-primary/5 hover:shadow-2xl hover:shadow-primary/10 hover:scale-105 transition-all duration-500 w-[280px] @md:w-[320px]"
		style={position}
	>
		<CardContent className="p-5">
			<div className="flex items-center justify-between mb-3">
				<Quote className="size-6 text-primary/20" />
				<StarRating rating={item.rating} />
			</div>
			<p className="text-foreground text-sm leading-relaxed mb-4 line-clamp-3">
				"{item.quote}"
			</p>
			<div className="flex items-center gap-3 pt-3 border-t border-border/50">
				<Avatar className="size-9 ring-2 ring-primary/10">
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
				'Transformed our business operations completely. Incredible platform.',
			author: 'Paula Chen',
			role: 'CEO',
			company: 'TransformCo',
			avatar: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?w=100&h=100&fit=crop',
			initials: 'PC',
			rating: 5,
		},
		{
			quote:
				'ROI exceeded expectations. Best investment we made this year.',
			author: 'Quinn Park',
			role: 'CFO',
			company: 'InvestSmart',
			avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&h=100&fit=crop',
			initials: 'QP',
			rating: 5,
		},
		{
			quote:
				'Customer support is exceptional. Always there when we need them.',
			author: 'Rachel Lee',
			role: 'Operations',
			company: 'SupportFirst',
			avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100&h=100&fit=crop',
			initials: 'RL',
			rating: 5,
		},
		{
			quote:
				'Seamless integration with our tech stack. Developer experience is great.',
			author: 'Sam Kim',
			role: 'CTO',
			company: 'IntegratePro',
			avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop',
			initials: 'SK',
			rating: 5,
		},
	];

	const positions = [
		{ top: '5%', left: '5%' },
		{ top: '10%', right: '10%' },
		{ bottom: '15%', left: '15%' },
		{ bottom: '5%', right: '5%' },
	];

	return (
		<section className="@container relative overflow-hidden min-h-[800px]" data-theme="testimonial">
			<div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-primary/5" />

			<div className="mx-auto max-w-7xl px-4 @sm:px-6 @2xl:px-8 py-16 @md:py-20 @xl:py-24 @3xl:py-32 relative z-10">
				<SectionHeader
					badge="Floating Layout"
					title="Reviews That"
					highlight="Float"
					description="Interactive testimonials floating around the page for a unique experience."
				/>

				<div className="relative h-[500px] hidden @lg:block">
					{testimonials.map((item, index) => (
						<FloatingCard key={index} item={item} position={positions[index]} />
					))}
				</div>

				{/* Mobile fallback */}
				<div className="grid grid-cols-1 @md:grid-cols-2 gap-6 @lg:hidden">
					{testimonials.map((item, index) => (
						<Card
							key={index}
							className="border-border/50 bg-card shadow-lg shadow-primary/5"
						>
							<CardContent className="p-5">
								<div className="flex items-center justify-between mb-3">
									<Quote className="size-6 text-primary/20" />
									<StarRating rating={item.rating} />
								</div>
								<p className="text-foreground text-sm leading-relaxed mb-4">
									"{item.quote}"
								</p>
								<div className="flex items-center gap-3 pt-3 border-t border-border/50">
									<Avatar className="size-9 ring-2 ring-primary/10">
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
			</div>
		</section>
	);
}
