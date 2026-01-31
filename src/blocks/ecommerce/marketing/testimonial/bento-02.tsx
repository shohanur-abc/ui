import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent } from '@/components/ui/card';
import { LayoutDashboard, Quote, Star, TrendingUp } from 'lucide-react';

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
			<LayoutDashboard className="size-3 text-primary" />
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

const MetricDisplay = ({ value, label }: { value: string; label: string }) => (
	<div className="flex items-center gap-2 bg-primary/10 text-primary px-3 py-1.5 rounded-lg text-sm font-semibold">
		<TrendingUp className="size-4" />
		<span>{value}</span>
		<span className="text-primary/70 font-normal">{label}</span>
	</div>
);

const WideCard = ({ item }: { item: TestimonialItem }) => (
	<Card className="col-span-full @xl:col-span-2 border-primary/20 bg-gradient-to-r from-primary/10 via-card to-card shadow-lg shadow-primary/5 hover:shadow-xl hover:shadow-primary/10 transition-all duration-500 group">
		<CardContent className="p-6 @md:p-8">
			<div className="flex flex-col @md:flex-row gap-6 @md:items-center">
				<div className="flex-1">
					<div className="flex items-center gap-3 mb-4 flex-wrap">
						<Quote className="size-8 text-primary/30" />
						{item.metric && (
							<MetricDisplay value={item.metric.value} label={item.metric.label} />
						)}
					</div>
					<StarRating rating={item.rating} />
					<p className="text-foreground text-lg @lg:text-xl leading-relaxed font-medium mt-4">
						"{item.quote}"
					</p>
				</div>
				<div className="flex items-center gap-4 @md:border-l @md:border-border/50 @md:pl-6">
					<Avatar className="size-14 ring-2 ring-primary/20 group-hover:ring-primary/40 transition-all">
						<AvatarImage src={item.avatar} alt={item.author} />
						<AvatarFallback className="bg-primary text-primary-foreground font-bold">
							{item.initials}
						</AvatarFallback>
					</Avatar>
					<div>
						<p className="font-bold text-lg text-foreground">{item.author}</p>
						<p className="text-muted-foreground">
							{item.role}
						</p>
						<p className="text-sm text-muted-foreground">{item.company}</p>
					</div>
				</div>
			</div>
		</CardContent>
	</Card>
);

const TallCard = ({ item }: { item: TestimonialItem }) => (
	<Card className="border-border/50 bg-card hover:shadow-lg hover:shadow-primary/5 hover:border-primary/20 transition-all duration-300 group">
		<CardContent className="p-6 flex flex-col h-full">
			<Quote className="size-8 text-primary/20 mb-3" />
			<StarRating rating={item.rating} />
			<p className="text-foreground leading-relaxed flex-1 mt-3 mb-5">"{item.quote}"</p>
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
	const wideTestimonial: TestimonialItem = {
		quote:
			'Since implementing this solution, our team productivity has skyrocketed. The intuitive interface meant we were up and running in just days, not weeks.',
		author: 'Laura Mitchell',
		role: 'Chief Technology Officer',
		company: 'TechScale Inc',
		avatar: 'https://images.unsplash.com/photo-1573497019940-1c28c88b4f3e?w=100&h=100&fit=crop',
		initials: 'LM',
		rating: 5,
		metric: { value: '+127%', label: 'productivity' },
	};

	const testimonials: TestimonialItem[] = [
		{
			quote:
				'The best software purchase we made. Clean, fast, and reliable.',
			author: 'Marcus Chen',
			role: 'Developer',
			company: 'CodePro',
			avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&h=100&fit=crop',
			initials: 'MC',
			rating: 5,
		},
		{
			quote:
				'Incredible value. Features that competitors charge triple for.',
			author: 'Nancy Drew',
			role: 'Founder',
			company: 'StartupNow',
			avatar: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?w=100&h=100&fit=crop',
			initials: 'ND',
			rating: 5,
		},
		{
			quote:
				'Support team is world-class. Always available, always helpful.',
			author: 'Oliver Park',
			role: 'IT Director',
			company: 'SupportFirst',
			avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop',
			initials: 'OP',
			rating: 5,
		},
		{
			quote:
				'Security features exceeded our compliance requirements. Audit was a breeze.',
			author: 'Patricia Adams',
			role: 'Security Lead',
			company: 'SecureNet',
			avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100&h=100&fit=crop',
			initials: 'PA',
			rating: 5,
		},
	];

	return (
		<section className="@container relative overflow-hidden" data-theme="testimonial">
			<div className="mx-auto max-w-7xl px-4 @sm:px-6 @2xl:px-8 py-16 @md:py-20 @xl:py-24 @3xl:py-32">
				<SectionHeader
					badge="Bento Grid"
					title="Trusted by"
					highlight="Innovators"
				/>

				<div className="grid grid-cols-1 @md:grid-cols-2 @xl:grid-cols-4 gap-6">
					<WideCard item={wideTestimonial} />
					{testimonials.map((item, index) => (
						<TallCard key={index} item={item} />
					))}
				</div>
			</div>
		</section>
	);
}
