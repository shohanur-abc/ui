import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent } from '@/components/ui/card';
import { Briefcase, Quote, Star, VerifiedIcon } from 'lucide-react';

interface TestimonialItem {
	quote: string;
	author: string;
	role: string;
	company: string;
	avatar: string;
	initials: string;
	rating: number;
	industry: string;
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
		<Badge variant="secondary" className="mb-4 gap-2">
			<Briefcase className="size-3" />
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

const IndustryBadge = ({ text }: { text: string }) => (
	<Badge
		variant="outline"
		className="text-xs gap-1 border-primary/20 text-primary bg-primary/5"
	>
		{text}
	</Badge>
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

const VerifiedBadge = () => (
	<div className="inline-flex items-center gap-1 text-xs text-primary">
		<VerifiedIcon className="size-3.5 fill-primary text-primary-foreground" />
		<span>Verified</span>
	</div>
);

const TestimonialCard = ({ item }: { item: TestimonialItem }) => (
	<Card className="h-full border-border/50 bg-gradient-to-b from-card to-card/80 hover:shadow-lg hover:shadow-primary/5 hover:border-primary/20 transition-all duration-300 group">
		<CardContent className="p-6 flex flex-col h-full">
			<div className="flex items-center justify-between mb-4">
				<IndustryBadge text={item.industry} />
				<VerifiedBadge />
			</div>
			<Quote className="size-8 text-primary/20 mb-3" />
			<StarRating rating={item.rating} />
			<p className="text-foreground leading-relaxed flex-1 mt-4 mb-6">
				"{item.quote}"
			</p>
			<div className="flex items-center gap-3 pt-4 border-t border-border/50">
				<Avatar className="size-11 ring-2 ring-primary/10 group-hover:ring-primary/30 transition-all">
					<AvatarImage src={item.avatar} alt={item.author} />
					<AvatarFallback className="bg-primary text-primary-foreground font-semibold">
						{item.initials}
					</AvatarFallback>
				</Avatar>
				<div>
					<p className="font-semibold text-foreground">{item.author}</p>
					<p className="text-sm text-muted-foreground">
						{item.role} at {item.company}
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
				'In healthcare, reliability is everything. This platform has never let us down.',
			author: 'Dr. Victoria Hayes',
			role: 'Chief Medical Officer',
			company: 'MedTech Solutions',
			avatar:
				'https://images.unsplash.com/photo-1559839734-2b71ea197ec2?w=100&h=100&fit=crop',
			initials: 'VH',
			rating: 5,
			industry: 'Healthcare',
		},
		{
			quote:
				'Financial compliance is complex. This tool simplifies it without cutting corners.',
			author: 'William Chen',
			role: 'Compliance Director',
			company: 'FinanceGuard',
			avatar:
				'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&h=100&fit=crop',
			initials: 'WC',
			rating: 5,
			industry: 'Finance',
		},
		{
			quote:
				'Our e-commerce sales doubled after implementing the customer insights features.',
			author: 'Xena Martinez',
			role: 'E-commerce Manager',
			company: 'ShopSmart',
			avatar:
				'https://images.unsplash.com/photo-1580489944761-15a19d654956?w=100&h=100&fit=crop',
			initials: 'XM',
			rating: 5,
			industry: 'E-commerce',
		},
	];

	return (
		<section
			className="@container relative overflow-hidden"
			data-theme="testimonial"
		>
			<div className="mx-auto max-w-7xl px-4 @sm:px-6 @2xl:px-8 py-16 @md:py-20 @xl:py-24 @3xl:py-32">
				<SectionHeader
					badge="Industry Leaders"
					title="Trusted Across Industries"
					description="From healthcare to finance, businesses of all types rely on our platform."
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
