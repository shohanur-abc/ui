import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent } from '@/components/ui/card';
import { CheckCircle2, Quote, Star, Users } from 'lucide-react';

interface TestimonialItem {
	quote: string;
	author: string;
	role: string;
	company: string;
	avatar: string;
	initials: string;
	rating: number;
	highlights: string[];
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
			<Users className="size-3" />
			{badge}
		</Badge>
		<h2 className="text-3xl @sm:text-4xl @lg:text-5xl font-bold tracking-tight mb-4">
			{title}
		</h2>
		<p className="text-muted-foreground text-lg max-w-2xl mx-auto">
			{description}
		</p>
	</div>
);

const StarRating = ({ rating }: { rating: number }) => (
	<div className="flex gap-0.5 mb-4">
		{Array.from({ length: 5 }).map((_, i) => (
			<Star
				key={i}
				className={`size-4 ${i < rating ? 'fill-primary text-primary' : 'text-muted/30'}`}
			/>
		))}
	</div>
);

const HighlightsList = ({ items }: { items: string[] }) => (
	<div className="flex flex-wrap gap-2 mt-4">
		{items.map((item, index) => (
			<span
				key={index}
				className="inline-flex items-center gap-1 text-xs bg-primary/10 text-primary px-2 py-1 rounded-full"
			>
				<CheckCircle2 className="size-3" />
				{item}
			</span>
		))}
	</div>
);

const TestimonialCard = ({ item }: { item: TestimonialItem }) => (
	<Card className="h-full border-border/50 bg-card hover:shadow-lg hover:shadow-primary/5 hover:border-primary/20 transition-all duration-300 group">
		<CardContent className="p-6 flex flex-col h-full">
			<Quote className="size-8 text-primary/20 mb-4" />
			<StarRating rating={item.rating} />
			<p className="text-foreground leading-relaxed flex-1">"{item.quote}"</p>
			<HighlightsList items={item.highlights} />
			<div className="flex items-center gap-3 mt-6 pt-6 border-t border-border/50">
				<Avatar className="size-11 ring-2 ring-primary/10 group-hover:ring-primary/30 transition-all">
					<AvatarImage src={item.avatar} alt={item.author} />
					<AvatarFallback className="bg-primary text-primary-foreground font-semibold">
						{item.initials}
					</AvatarFallback>
				</Avatar>
				<div>
					<p className="font-semibold text-foreground">{item.author}</p>
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
				'This platform helped us streamline our entire workflow. We now accomplish in hours what used to take days.',
			author: 'Patricia Moore',
			role: 'COO',
			company: 'Efficiency Labs',
			avatar:
				'https://images.unsplash.com/photo-1580489944761-15a19d654956?w=100&h=100&fit=crop',
			initials: 'PM',
			rating: 5,
			highlights: ['Time Savings', 'Automation', 'Scalability'],
		},
		{
			quote:
				'The customer success team is incredible. They went above and beyond during our onboarding process.',
			author: 'Daniel Roberts',
			role: 'IT Manager',
			company: 'TechSolutions',
			avatar:
				'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop',
			initials: 'DR',
			rating: 5,
			highlights: ['Support', 'Onboarding', 'Training'],
		},
		{
			quote:
				'We have tried many tools, but this one stands out for its simplicity and power combined.',
			author: 'Samantha Lee',
			role: 'Product Designer',
			company: 'DesignCraft',
			avatar:
				'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100&h=100&fit=crop',
			initials: 'SL',
			rating: 5,
			highlights: ['Intuitive', 'Powerful', 'Modern'],
		},
		{
			quote:
				'Security and compliance were our top concerns. This platform exceeded all our requirements.',
			author: 'Andrew Kim',
			role: 'Security Lead',
			company: 'SecureNet',
			avatar:
				'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&h=100&fit=crop',
			initials: 'AK',
			rating: 5,
			highlights: ['Security', 'Compliance', 'Enterprise'],
		},
		{
			quote:
				'The reporting features have given us visibility we never had before. Game-changing for our operations.',
			author: 'Rachel Adams',
			role: 'Analytics Director',
			company: 'InsightPro',
			avatar:
				'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=100&h=100&fit=crop',
			initials: 'RA',
			rating: 5,
			highlights: ['Analytics', 'Reporting', 'Visibility'],
		},
		{
			quote:
				'Integration with our existing tools was seamless. We were productive from day one.',
			author: 'Thomas Wright',
			role: 'DevOps Engineer',
			company: 'CloudScale',
			avatar:
				'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=100&h=100&fit=crop',
			initials: 'TW',
			rating: 5,
			highlights: ['Integration', 'APIs', 'Developer-Friendly'],
		},
	];

	return (
		<section
			className="@container relative overflow-hidden"
			data-theme="testimonial"
		>
			<div className="mx-auto max-w-7xl px-4 @sm:px-6 @2xl:px-8 py-16 @md:py-20 @xl:py-24 @3xl:py-32">
				<SectionHeader
					badge="Success Stories"
					title="Trusted by Teams Worldwide"
					description="See how organizations of all sizes are achieving their goals with our platform."
				/>

				<div className="grid grid-cols-1 @md:grid-cols-2 @xl:grid-cols-3 gap-6">
					{testimonials.map((item, index) => (
						<TestimonialCard key={index} item={item} />
					))}
				</div>
			</div>
		</section>
	);
}
