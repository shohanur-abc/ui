import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent } from '@/components/ui/card';
import { LayersIcon, Quote, Star, TrendingUp } from 'lucide-react';

interface TestimonialItem {
	quote: string;
	author: string;
	role: string;
	company: string;
	avatar: string;
	initials: string;
	rating: number;
	stat?: { value: string; label: string };
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
		<Badge variant="secondary" className="mb-4 gap-2">
			<LayersIcon className="size-3" />
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

const StatBadge = ({ value, label }: { value: string; label: string }) => (
	<div className="inline-flex items-center gap-1.5 bg-primary/10 text-primary px-2 py-1 rounded-md text-xs font-medium">
		<TrendingUp className="size-3" />
		{value} {label}
	</div>
);

const TestimonialCard = ({
	item,
	className = '',
}: {
	item: TestimonialItem;
	className?: string;
}) => (
	<Card
		className={`border-border/50 bg-card hover:shadow-lg hover:shadow-primary/5 hover:border-primary/20 transition-all duration-300 group ${className}`}
	>
		<CardContent className="p-5">
			<div className="flex items-start justify-between gap-3 mb-3">
				<Quote className="size-6 text-primary/20 shrink-0" />
				{item.stat && (
					<StatBadge value={item.stat.value} label={item.stat.label} />
				)}
			</div>
			<StarRating rating={item.rating} />
			<p className="text-foreground text-sm leading-relaxed mb-4">
				"{item.quote}"
			</p>
			<div className="flex items-center gap-2.5">
				<Avatar className="size-8 ring-2 ring-primary/10 group-hover:ring-primary/30 transition-all">
					<AvatarImage src={item.avatar} alt={item.author} />
					<AvatarFallback className="bg-primary/10 text-primary font-semibold text-xs">
						{item.initials}
					</AvatarFallback>
				</Avatar>
				<div>
					<p className="font-semibold text-xs text-foreground">{item.author}</p>
					<p className="text-[10px] text-muted-foreground">
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
				'The dashboard gives us complete visibility into our operations. Game-changing insights.',
			author: 'Nina Patel',
			role: 'Analytics Lead',
			company: 'DataView',
			avatar:
				'https://images.unsplash.com/photo-1573497019940-1c28c88b4f3e?w=100&h=100&fit=crop',
			initials: 'NP',
			rating: 5,
			stat: { value: '+85%', label: 'visibility' },
		},
		{
			quote: 'Simple enough for anyone to use, powerful enough for experts.',
			author: 'Oscar Lee',
			role: 'Product Manager',
			company: 'SimplePro',
			avatar:
				'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop',
			initials: 'OL',
			rating: 5,
		},
		{
			quote:
				'We onboarded 500 users in a single day without any issues. Incredible scalability.',
			author: 'Paula Chen',
			role: 'IT Director',
			company: 'ScaleUp Inc',
			avatar:
				'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100&h=100&fit=crop',
			initials: 'PC',
			rating: 5,
			stat: { value: '500', label: 'users/day' },
		},
		{
			quote: 'The automation features saved us countless hours every week.',
			author: 'Quinn Roberts',
			role: 'Operations',
			company: 'AutoFlow',
			avatar:
				'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&h=100&fit=crop',
			initials: 'QR',
			rating: 5,
		},
		{
			quote:
				'Best support team in the industry. They always go above and beyond.',
			author: 'Rosa Martinez',
			role: 'Customer Success',
			company: 'SupportFirst',
			avatar:
				'https://images.unsplash.com/photo-1580489944761-15a19d654956?w=100&h=100&fit=crop',
			initials: 'RM',
			rating: 5,
		},
		{
			quote:
				'Enterprise-grade security with startup-level ease of use. Perfect balance.',
			author: 'Sean Williams',
			role: 'Security Engineer',
			company: 'SecureScale',
			avatar:
				'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=100&h=100&fit=crop',
			initials: 'SW',
			rating: 5,
			stat: { value: 'SOC2', label: 'certified' },
		},
	];

	return (
		<section
			className="@container relative overflow-hidden"
			data-theme="testimonial"
		>
			<div className="mx-auto max-w-7xl px-4 @sm:px-6 @2xl:px-8 py-16 @md:py-20 @xl:py-24 @3xl:py-32">
				<SectionHeader
					badge="Compact Reviews"
					title="Voices of"
					highlight="Success"
				/>

				<div className="grid grid-cols-1 @sm:grid-cols-2 @lg:grid-cols-3 gap-4">
					{testimonials.map((item, index) => (
						<TestimonialCard key={index} item={item} />
					))}
				</div>
			</div>
		</section>
	);
}
