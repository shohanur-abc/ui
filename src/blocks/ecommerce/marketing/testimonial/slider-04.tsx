import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { ChevronDown, ChevronUp, Play, Quote, Sparkles, Star } from 'lucide-react';

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
			<Sparkles className="size-3" />
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
				className={`size-5 ${i < rating ? 'fill-primary text-primary' : 'text-muted/30'}`}
			/>
		))}
	</div>
);

const VideoPlayButton = () => (
	<button className="absolute inset-0 flex items-center justify-center bg-gradient-to-br from-primary/20 to-primary/5 group/play">
		<div className="size-16 rounded-full bg-primary text-primary-foreground flex items-center justify-center shadow-lg group-hover/play:scale-110 transition-transform">
			<Play className="size-6 fill-current ml-1" />
		</div>
	</button>
);

const MainSlide = ({ item }: { item: TestimonialItem }) => (
	<Card className="relative border-primary/20 bg-gradient-to-br from-primary/10 via-card to-card shadow-xl shadow-primary/5 overflow-hidden group">
		{item.hasVideo && (
			<div className="relative aspect-video bg-muted">
				<VideoPlayButton />
			</div>
		)}
		<CardContent className="p-8 @lg:p-10">
			{!item.hasVideo && <Quote className="size-12 text-primary/20 mb-4" />}
			<StarRating rating={item.rating} />
			<p className="text-foreground text-xl @lg:text-2xl @xl:text-3xl leading-relaxed font-medium mt-4 mb-8">
				"{item.quote}"
			</p>
			<div className="flex items-center gap-4">
				<Avatar className="size-16 ring-4 ring-primary/20 group-hover:ring-primary/40 transition-all">
					<AvatarImage src={item.avatar} alt={item.author} />
					<AvatarFallback className="bg-primary text-primary-foreground font-bold text-xl">
						{item.initials}
					</AvatarFallback>
				</Avatar>
				<div>
					<p className="font-bold text-xl text-foreground">{item.author}</p>
					<p className="text-muted-foreground text-lg">
						{item.role} at {item.company}
					</p>
				</div>
			</div>
		</CardContent>
	</Card>
);

const ThumbnailCard = ({
	item,
	active = false,
}: {
	item: TestimonialItem;
	active?: boolean;
}) => (
	<Card
		className={`cursor-pointer border-border/50 transition-all duration-300 ${
			active
				? 'bg-primary/5 border-primary/30'
				: 'bg-card hover:bg-muted/50 hover:border-primary/20'
		}`}
	>
		<CardContent className="p-4 flex items-center gap-3">
			<Avatar className={`size-10 ${active ? 'ring-2 ring-primary' : ''}`}>
				<AvatarImage src={item.avatar} alt={item.author} />
				<AvatarFallback className="bg-primary/10 text-primary text-sm font-semibold">
					{item.initials}
				</AvatarFallback>
			</Avatar>
			<div className="flex-1 min-w-0">
				<p className="font-semibold text-sm text-foreground truncate">{item.author}</p>
				<p className="text-xs text-muted-foreground truncate">{item.company}</p>
			</div>
			{item.hasVideo && <Play className="size-4 text-primary shrink-0" />}
		</CardContent>
	</Card>
);

const NavigationButtons = () => (
	<div className="flex flex-col gap-2">
		<Button variant="outline" size="icon" className="rounded-full" aria-label="Previous">
			<ChevronUp className="size-5" />
		</Button>
		<Button variant="outline" size="icon" className="rounded-full" aria-label="Next">
			<ChevronDown className="size-5" />
		</Button>
	</div>
);

export default function Main() {
	const currentTestimonial: TestimonialItem = {
		quote:
			'This platform has transformed how we work. The efficiency gains were immediate and the team adoption was seamless. I cannot recommend it highly enough.',
		author: 'Quinn Robinson',
		role: 'VP of Engineering',
		company: 'TechScale Solutions',
		avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&h=100&fit=crop',
		initials: 'QR',
		rating: 5,
		hasVideo: true,
	};

	const thumbnails: TestimonialItem[] = [
		{
			quote: 'Amazing product',
			author: 'Quinn Robinson',
			role: 'VP Engineering',
			company: 'TechScale',
			avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&h=100&fit=crop',
			initials: 'QR',
			rating: 5,
			hasVideo: true,
		},
		{
			quote: 'Great experience',
			author: 'Rachel Green',
			role: 'Product Manager',
			company: 'InnovateCo',
			avatar: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?w=100&h=100&fit=crop',
			initials: 'RG',
			rating: 5,
		},
		{
			quote: 'Highly recommend',
			author: 'Steven Park',
			role: 'CTO',
			company: 'StartupX',
			avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop',
			initials: 'SP',
			rating: 5,
			hasVideo: true,
		},
		{
			quote: 'Excellent support',
			author: 'Tina Williams',
			role: 'IT Director',
			company: 'Enterprise Inc',
			avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100&h=100&fit=crop',
			initials: 'TW',
			rating: 5,
		},
	];

	return (
		<section className="@container relative overflow-hidden" data-theme="testimonial">
			<div className="mx-auto max-w-7xl px-4 @sm:px-6 @2xl:px-8 py-16 @md:py-20 @xl:py-24 @3xl:py-32">
				<SectionHeader
					badge="Video Testimonials"
					title="Watch Our Customers"
					highlight="Share Their Stories"
					description="Real experiences from real customers, in their own words."
				/>

				<div className="grid grid-cols-1 @lg:grid-cols-4 gap-6">
					<div className="@lg:col-span-3">
						<MainSlide item={currentTestimonial} />
					</div>
					<div className="flex @lg:flex-col gap-4">
						<div className="flex-1 flex flex-col gap-3">
							{thumbnails.map((item, index) => (
								<ThumbnailCard key={index} item={item} active={index === 0} />
							))}
						</div>
						<div className="flex @lg:flex-row justify-center gap-2 self-center @lg:self-auto">
							<NavigationButtons />
						</div>
					</div>
				</div>
			</div>
		</section>
	);
}
