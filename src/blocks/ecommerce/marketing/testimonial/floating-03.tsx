import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent } from '@/components/ui/card';
import { Atom, Quote, Star, TrendingUp } from 'lucide-react';

interface TestimonialItem {
	quote: string;
	author: string;
	role: string;
	company: string;
	avatar: string;
	initials: string;
	rating: number;
	position: 'left' | 'right' | 'center';
	metric: string;
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
		<Badge variant="outline" className="mb-4 gap-2 border-primary/30">
			<Atom className="size-3 text-primary" />
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

const MetricBadge = ({ metric }: { metric: string }) => (
	<Badge
		variant="outline"
		className="bg-primary/5 border-primary/20 text-primary"
	>
		<TrendingUp className="size-3 mr-1" />
		{metric}
	</Badge>
);

const OrbitCard = ({
	item,
	index,
}: {
	item: TestimonialItem;
	index: number;
}) => {
	const positionClasses = {
		left: '@lg:-translate-x-12',
		right: '@lg:translate-x-12',
		center: '',
	};

	return (
		<Card
			className={`border-border/50 bg-card shadow-lg shadow-primary/5 hover:shadow-xl hover:shadow-primary/10 hover:-translate-y-1 transition-all duration-500 ${positionClasses[item.position]}`}
		>
			<CardContent className="p-5 @lg:p-6">
				<div className="flex items-center justify-between mb-3">
					<Quote className="size-6 text-primary/20" />
					<MetricBadge metric={item.metric} />
				</div>
				<StarRating rating={item.rating} />
				<p className="text-foreground leading-relaxed my-4">"{item.quote}"</p>
				<div className="flex items-center gap-3 pt-4 border-t border-border/50">
					<Avatar className="size-10 ring-2 ring-primary/10">
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
	);
};

export default function Main() {
	const testimonials: TestimonialItem[] = [
		{
			quote:
				'The platform revolutionized our entire workflow. Results were immediate.',
			author: 'Zach Chen',
			role: 'CEO',
			company: 'OrbitTech',
			avatar:
				'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&h=100&fit=crop',
			initials: 'ZC',
			rating: 5,
			position: 'left',
			metric: '+45% efficiency',
		},
		{
			quote:
				'Outstanding experience from day one. The team is incredibly supportive.',
			author: 'Amy Park',
			role: 'COO',
			company: 'StarFlow',
			avatar:
				'https://images.unsplash.com/photo-1580489944761-15a19d654956?w=100&h=100&fit=crop',
			initials: 'AP',
			rating: 5,
			position: 'right',
			metric: '24/7 support',
		},
		{
			quote:
				'Security and compliance handled perfectly. Peace of mind for our team.',
			author: 'Brian Lee',
			role: 'CISO',
			company: 'SecureOrbit',
			avatar:
				'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop',
			initials: 'BL',
			rating: 5,
			position: 'center',
			metric: 'SOC 2 Type II',
		},
		{
			quote: 'Best investment decision we made. ROI exceeded all projections.',
			author: 'Clara Kim',
			role: 'CFO',
			company: 'GrowthPath',
			avatar:
				'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100&h=100&fit=crop',
			initials: 'CK',
			rating: 5,
			position: 'left',
			metric: '200% ROI',
		},
		{
			quote: 'Scaled from 10 to 1000 users without any performance issues.',
			author: 'Derek Foster',
			role: 'CTO',
			company: 'ScaleHub',
			avatar:
				'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=100&h=100&fit=crop',
			initials: 'DF',
			rating: 5,
			position: 'right',
			metric: '100x scale',
		},
	];

	return (
		<section
			className="@container relative overflow-hidden"
			data-theme="testimonial"
		>
			<div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-primary/10 via-transparent to-transparent" />

			<div className="mx-auto max-w-7xl px-4 @sm:px-6 @2xl:px-8 py-16 @md:py-20 @xl:py-24 @3xl:py-32 relative z-10">
				<SectionHeader
					badge="Orbital Layout"
					title="Gravitating"
					highlight="Towards Excellence"
				/>

				<div className="max-w-4xl mx-auto space-y-6">
					{testimonials.map((item, index) => (
						<OrbitCard key={index} item={item} index={index} />
					))}
				</div>
			</div>
		</section>
	);
}
