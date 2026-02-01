import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Quote, Star, ArrowRight, Newspaper } from 'lucide-react';

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
	description,
}: {
	badge: string;
	title: string;
	description: string;
}) => (
	<div className="mb-12 @lg:mb-16">
		<Badge variant="outline" className="mb-4 gap-2 border-primary/30">
			<Newspaper className="size-3 text-primary" />
			{badge}
		</Badge>
		<h2 className="text-3xl @sm:text-4xl @lg:text-5xl font-bold tracking-tight mb-4">
			{title}
		</h2>
		<p className="text-muted-foreground text-base @md:text-lg max-w-2xl">
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

const EditorialQuote = ({
	item,
	featured,
}: {
	item: TestimonialItem;
	featured: boolean;
}) => (
	<div
		className={`relative ${
			featured
				? 'row-span-2 bg-primary/5 border-2 border-primary/20'
				: 'bg-card border border-border/50'
		} rounded-2xl p-6 @lg:p-8`}
	>
		{featured && (
			<Badge className="absolute -top-3 left-6 bg-primary text-primary-foreground">
				Featured Quote
			</Badge>
		)}
		<Quote
			className={`${featured ? 'size-12' : 'size-8'} text-primary/20 mb-4`}
		/>
		<StarRating rating={item.rating} />
		<blockquote
			className={`${
				featured ? 'text-xl @lg:text-2xl' : 'text-base'
			} font-medium text-foreground leading-relaxed my-4`}
		>
			"{item.quote}"
		</blockquote>
		<div className="flex items-center gap-3">
			<Avatar
				className={`${featured ? 'size-12' : 'size-9'} ring-2 ring-primary/10`}
			>
				<AvatarImage src={item.avatar} alt={item.author} />
				<AvatarFallback className="bg-primary/10 text-primary font-semibold">
					{item.initials}
				</AvatarFallback>
			</Avatar>
			<div>
				<p
					className={`font-semibold text-foreground ${featured ? 'text-base' : 'text-sm'}`}
				>
					{item.author}
				</p>
				<p
					className={`text-muted-foreground ${featured ? 'text-sm' : 'text-xs'}`}
				>
					{item.role} · {item.company}
				</p>
			</div>
		</div>
	</div>
);

const ActionButton = ({ text, subtext }: { text: string; subtext: string }) => (
	<div className="flex flex-col @sm:flex-row items-start @sm:items-center justify-between gap-4 pt-8 mt-8 border-t border-border/50">
		<p className="text-muted-foreground">{subtext}</p>
		<Button className="gap-2 bg-primary hover:bg-primary/90">
			{text}
			<ArrowRight className="size-4" />
		</Button>
	</div>
);

export default function Main() {
	const featured: TestimonialItem = {
		quote:
			'This is not just a tool—it is a strategic partner. The insights we have gained have fundamentally transformed our approach to customer engagement.',
		author: 'Victoria Chen',
		role: 'VP Strategy',
		company: 'StrategicMind',
		avatar:
			'https://images.unsplash.com/photo-1580489944761-15a19d654956?w=100&h=100&fit=crop',
		initials: 'VC',
		rating: 5,
	};

	const others: TestimonialItem[] = [
		{
			quote: 'Game-changing automation that saves us hours every week.',
			author: 'William Park',
			role: 'Operations',
			company: 'AutomateFlow',
			avatar:
				'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop',
			initials: 'WP',
			rating: 5,
		},
		{
			quote: 'Security and compliance made simple. Finally.',
			author: 'Xena Lee',
			role: 'CISO',
			company: 'SecureFirst',
			avatar:
				'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100&h=100&fit=crop',
			initials: 'XL',
			rating: 5,
		},
	];

	return (
		<section
			className="@container relative overflow-hidden"
			data-theme="testimonial"
		>
			<div className="mx-auto max-w-6xl px-4 @sm:px-6 @2xl:px-8 py-16 @md:py-20 @xl:py-24 @3xl:py-32">
				<SectionHeader
					badge="Editorial"
					title="Curated Quotes"
					description="Hand-picked testimonials from our most valued customers."
				/>

				<div className="grid grid-cols-1 @lg:grid-cols-2 gap-6">
					<EditorialQuote item={featured} featured={true} />
					{others.map((item, index) => (
						<EditorialQuote key={index} item={item} featured={false} />
					))}
				</div>

				<ActionButton
					text="Read All Stories"
					subtext="Discover more success stories from our customers."
				/>
			</div>
		</section>
	);
}
