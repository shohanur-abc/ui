import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent } from '@/components/ui/card';
import { Lightbulb, Quote, Rocket, Star, Target } from 'lucide-react';

interface TestimonialItem {
	quote: string;
	author: string;
	role: string;
	company: string;
	avatar: string;
	initials: string;
	rating: number;
	icon: React.ElementType;
	theme: string;
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
		<Badge variant="outline" className="mb-4 gap-2 border-primary/30">
			<Lightbulb className="size-3 text-primary" />
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

const ThemeIcon = ({ icon: Icon, label }: { icon: React.ElementType; label: string }) => (
	<div className="flex items-center gap-2 mb-4">
		<div className="size-10 rounded-lg bg-primary/10 flex items-center justify-center">
			<Icon className="size-5 text-primary" />
		</div>
		<span className="text-sm font-medium text-primary">{label}</span>
	</div>
);

const TestimonialCard = ({ item }: { item: TestimonialItem }) => (
	<Card className="h-full border-border/50 bg-card hover:shadow-xl hover:shadow-primary/5 hover:border-primary/20 hover:scale-[1.02] transition-all duration-300 group">
		<CardContent className="p-6 @md:p-8 flex flex-col h-full">
			<ThemeIcon icon={item.icon} label={item.theme} />
			<Quote className="size-8 text-primary/20 mb-3" />
			<StarRating rating={item.rating} />
			<p className="text-foreground text-lg leading-relaxed flex-1 mt-4 mb-6">
				"{item.quote}"
			</p>
			<div className="flex items-center gap-4 pt-6 border-t border-border/50">
				<Avatar className="size-12 ring-2 ring-primary/10 group-hover:ring-primary/30 transition-all">
					<AvatarImage src={item.avatar} alt={item.author} />
					<AvatarFallback className="bg-primary text-primary-foreground font-bold">
						{item.initials}
					</AvatarFallback>
				</Avatar>
				<div>
					<p className="font-bold text-foreground">{item.author}</p>
					<p className="text-sm text-muted-foreground">
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
				'This platform accelerated our product launch by 3 months. The speed and efficiency are unmatched.',
			author: 'Zachary Nelson',
			role: 'Product Lead',
			company: 'LaunchFast',
			avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop',
			initials: 'ZN',
			rating: 5,
			icon: Rocket,
			theme: 'Speed',
		},
		{
			quote:
				'The precision of the analytics helped us target exactly the right customers at the right time.',
			author: 'Amber Collins',
			role: 'Marketing VP',
			company: 'TargetPro',
			avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100&h=100&fit=crop',
			initials: 'AC',
			rating: 5,
			icon: Target,
			theme: 'Precision',
		},
		{
			quote:
				'Innovation is in our DNA, and this tool helps us stay ahead of the competition consistently.',
			author: 'Blake Thompson',
			role: 'Innovation Director',
			company: 'FutureTech',
			avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=100&h=100&fit=crop',
			initials: 'BT',
			rating: 5,
			icon: Lightbulb,
			theme: 'Innovation',
		},
	];

	return (
		<section className="@container relative overflow-hidden" data-theme="testimonial">
			<div className="mx-auto max-w-7xl px-4 @sm:px-6 @2xl:px-8 py-16 @md:py-20 @xl:py-24 @3xl:py-32">
				<SectionHeader
					badge="Success Themes"
					title="Different Goals,"
					highlight="Same Results"
					description="Whether you prioritize speed, precision, or innovation - we deliver."
				/>

				<div className="grid grid-cols-1 @lg:grid-cols-3 gap-6 @xl:gap-8">
					{testimonials.map((item, index) => (
						<TestimonialCard key={index} item={item} />
					))}
				</div>
			</div>
		</section>
	);
}
