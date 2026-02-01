import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent } from '@/components/ui/card';
import { Layers, Quote, Star } from 'lucide-react';

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
	<div className="text-center mb-12 @lg:mb-16">
		<Badge variant="outline" className="mb-4 gap-2 border-primary/30">
			<Layers className="size-3 text-primary" />
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
	<div className="flex gap-0.5 mb-4">
		{Array.from({ length: 5 }).map((_, i) => (
			<Star
				key={i}
				className={`size-4 ${i < rating ? 'fill-primary text-primary' : 'text-muted/30'}`}
			/>
		))}
	</div>
);

const TestimonialCard = ({
	item,
	offset = 0,
}: {
	item: TestimonialItem;
	offset?: number;
}) => (
	<Card
		className={`border-border/50 bg-card hover:shadow-lg hover:shadow-primary/5 hover:border-primary/20 transition-all duration-300 group ${
			offset > 0 ? `mt-${offset}` : ''
		}`}
		style={{ marginTop: offset * 16 }}
	>
		<CardContent className="p-6">
			<Quote className="size-8 text-primary/20 mb-2" />
			<StarRating rating={item.rating} />
			<p className="text-foreground leading-relaxed mb-6">"{item.quote}"</p>
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
	const leftColumn: TestimonialItem[] = [
		{
			quote: 'Brilliant tool. Our team is more productive than ever before.',
			author: 'Grace Kim',
			role: 'Team Lead',
			company: 'ProductiveHQ',
			avatar:
				'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100&h=100&fit=crop',
			initials: 'GK',
			rating: 5,
		},
		{
			quote:
				'The integration capabilities are phenomenal. Works with everything we use.',
			author: 'Henry Davis',
			role: 'DevOps Lead',
			company: 'IntegratePro',
			avatar:
				'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&h=100&fit=crop',
			initials: 'HD',
			rating: 5,
		},
	];

	const middleColumn: TestimonialItem[] = [
		{
			quote:
				'I recommend this to everyone. It has changed how we approach our work entirely.',
			author: 'Isabelle Chen',
			role: 'Consultant',
			company: 'Advisory Group',
			avatar:
				'https://images.unsplash.com/photo-1580489944761-15a19d654956?w=100&h=100&fit=crop',
			initials: 'IC',
			rating: 5,
		},
		{
			quote: 'Clean, fast, reliable. The trifecta of great software.',
			author: 'Jason Wright',
			role: 'Software Engineer',
			company: 'CodeBase',
			avatar:
				'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop',
			initials: 'JW',
			rating: 5,
		},
		{
			quote: 'Best investment our startup made this year. Period.',
			author: 'Kelly Martinez',
			role: 'Co-Founder',
			company: 'StartupNow',
			avatar:
				'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=100&h=100&fit=crop',
			initials: 'KM',
			rating: 5,
		},
	];

	const rightColumn: TestimonialItem[] = [
		{
			quote:
				'The customer success team is incredible. They helped us every step of the way.',
			author: 'Liam Foster',
			role: 'Customer Success',
			company: 'HelpDesk Pro',
			avatar:
				'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=100&h=100&fit=crop',
			initials: 'LF',
			rating: 5,
		},
		{
			quote:
				'Security and performance at the highest level. Exactly what we needed.',
			author: 'Mia Thompson',
			role: 'Security Lead',
			company: 'SecureFirst',
			avatar:
				'https://images.unsplash.com/photo-1573497019940-1c28c88b4f3e?w=100&h=100&fit=crop',
			initials: 'MT',
			rating: 5,
		},
	];

	return (
		<section
			className="@container relative overflow-hidden"
			data-theme="testimonial"
		>
			<div className="mx-auto max-w-7xl px-4 @sm:px-6 @2xl:px-8 py-16 @md:py-20 @xl:py-24 @3xl:py-32">
				<SectionHeader
					badge="Stacked Reviews"
					title="Layer Upon Layer of Praise"
					description="See what makes our platform the choice of successful teams everywhere."
				/>

				<div className="grid grid-cols-1 @md:grid-cols-2 @xl:grid-cols-3 gap-6">
					<div className="flex flex-col gap-6">
						{leftColumn.map((item, index) => (
							<TestimonialCard key={index} item={item} offset={index} />
						))}
					</div>
					<div className="flex flex-col gap-6">
						{middleColumn.map((item, index) => (
							<TestimonialCard key={index} item={item} />
						))}
					</div>
					<div className="flex flex-col gap-6 @md:col-span-2 @xl:col-span-1">
						{rightColumn.map((item, index) => (
							<TestimonialCard key={index} item={item} offset={index} />
						))}
					</div>
				</div>
			</div>
		</section>
	);
}
