import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent } from '@/components/ui/card';
import { Grid2X2, Quote, Star, Award } from 'lucide-react';

interface TestimonialItem {
	quote: string;
	author: string;
	role: string;
	company: string;
	avatar: string;
	initials: string;
	rating: number;
	award?: string;
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
	<div className="text-center mb-12 @lg:mb-16">
		<Badge className="mb-4 gap-2 bg-primary text-primary-foreground">
			<Grid2X2 className="size-3" />
			{badge}
		</Badge>
		<h2 className="text-3xl @sm:text-4xl @lg:text-5xl font-bold tracking-tight mb-4">
			{title}
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

const AwardBadge = ({ text }: { text: string }) => (
	<Badge className="gap-1 bg-primary/10 text-primary border-primary/20 hover:bg-primary/20">
		<Award className="size-3" />
		{text}
	</Badge>
);

const HeroCard = ({ item }: { item: TestimonialItem }) => (
	<Card className="@lg:col-span-2 @lg:row-span-2 border-primary/20 bg-gradient-to-br from-primary/10 via-card to-card shadow-xl shadow-primary/5 hover:shadow-2xl hover:shadow-primary/10 transition-all duration-500 group">
		<CardContent className="p-8 @lg:p-10 flex flex-col h-full">
			<div className="flex items-center gap-3 mb-6 flex-wrap">
				<Quote className="size-12 text-primary/30" />
				{item.award && <AwardBadge text={item.award} />}
			</div>
			<StarRating rating={item.rating} />
			<p className="text-foreground text-xl @lg:text-2xl @xl:text-3xl leading-relaxed font-medium flex-1 mt-4 mb-8">
				"{item.quote}"
			</p>
			<div className="flex items-center gap-4 pt-6 border-t border-primary/20">
				<Avatar className="size-16 ring-4 ring-primary/30 group-hover:ring-primary/50 transition-all">
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

const SmallCard = ({ item }: { item: TestimonialItem }) => (
	<Card className="border-border/50 bg-card hover:shadow-lg hover:shadow-primary/5 hover:border-primary/20 transition-all duration-300 group">
		<CardContent className="p-5 flex flex-col h-full">
			<Quote className="size-6 text-primary/20 mb-2" />
			<StarRating rating={item.rating} />
			<p className="text-foreground text-sm leading-relaxed flex-1 mt-2 mb-4">
				"{item.quote}"
			</p>
			<div className="flex items-center gap-2.5 pt-3 border-t border-border/50">
				<Avatar className="size-8 ring-2 ring-primary/10 group-hover:ring-primary/30 transition-all">
					<AvatarImage src={item.avatar} alt={item.author} />
					<AvatarFallback className="bg-primary/10 text-primary font-semibold text-xs">
						{item.initials}
					</AvatarFallback>
				</Avatar>
				<div>
					<p className="font-semibold text-xs text-foreground">{item.author}</p>
					<p className="text-[10px] text-muted-foreground">{item.role}</p>
				</div>
			</div>
		</CardContent>
	</Card>
);

export default function Main() {
	const heroTestimonial: TestimonialItem = {
		quote:
			'Choosing this platform was the best decision our company made this year. The results speak for themselves — 3x revenue growth and happier customers than ever before.',
		author: 'Quincy Adams',
		role: 'Chief Executive Officer',
		company: 'Growth Dynamics',
		avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&h=100&fit=crop',
		initials: 'QA',
		rating: 5,
		award: 'Customer of the Year',
	};

	const testimonials: TestimonialItem[] = [
		{
			quote: 'Fast, reliable, and beautifully designed.',
			author: 'Rachel Kim',
			role: 'Designer',
			company: 'DesignCo',
			avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100&h=100&fit=crop',
			initials: 'RK',
			rating: 5,
		},
		{
			quote: 'Support is incredible. Always there when needed.',
			author: 'Sam Wilson',
			role: 'IT Manager',
			company: 'TechCorp',
			avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop',
			initials: 'SW',
			rating: 5,
		},
		{
			quote: 'Scaled from 10 to 10,000 users seamlessly.',
			author: 'Tina Brown',
			role: 'VP Ops',
			company: 'ScalePro',
			avatar: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?w=100&h=100&fit=crop',
			initials: 'TB',
			rating: 5,
		},
		{
			quote: 'Best investment we made this quarter.',
			author: 'Uma Patel',
			role: 'CFO',
			company: 'FinFirst',
			avatar: 'https://images.unsplash.com/photo-1573497019940-1c28c88b4f3e?w=100&h=100&fit=crop',
			initials: 'UP',
			rating: 5,
		},
	];

	return (
		<section className="@container relative overflow-hidden" data-theme="testimonial">
			<div className="mx-auto max-w-7xl px-4 @sm:px-6 @2xl:px-8 py-16 @md:py-20 @xl:py-24 @3xl:py-32">
				<SectionHeader
					badge="Award Winners"
					title="Customer Excellence Awards"
					description="Meet the customers who are achieving exceptional results with our platform."
				/>

				<div className="grid grid-cols-1 @sm:grid-cols-2 @lg:grid-cols-4 gap-4 @lg:gap-6">
					<HeroCard item={heroTestimonial} />
					{testimonials.map((item, index) => (
						<SmallCard key={index} item={item} />
					))}
				</div>
			</div>
		</section>
	);
}
