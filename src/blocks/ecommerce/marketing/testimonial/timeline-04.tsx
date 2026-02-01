import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent } from '@/components/ui/card';
import { Milestone, Quote, Star, CheckCircle } from 'lucide-react';

interface TestimonialItem {
	quote: string;
	author: string;
	role: string;
	company: string;
	avatar: string;
	initials: string;
	rating: number;
	phase: string;
	phaseDescription: string;
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
			<Milestone className="size-3 text-primary" />
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
	<div className="flex gap-0.5 mb-3">
		{Array.from({ length: 5 }).map((_, i) => (
			<Star
				key={i}
				className={`size-4 ${i < rating ? 'fill-primary text-primary' : 'text-muted/30'}`}
			/>
		))}
	</div>
);

const PhaseHeader = ({
	number,
	phase,
	description,
	isCompleted,
}: {
	number: number;
	phase: string;
	description: string;
	isCompleted: boolean;
}) => (
	<div className="flex items-start gap-4 mb-4">
		<div
			className={`size-10 rounded-full flex items-center justify-center shrink-0 ${
				isCompleted
					? 'bg-primary text-primary-foreground'
					: 'bg-muted text-muted-foreground'
			}`}
		>
			{isCompleted ? (
				<CheckCircle className="size-5" />
			) : (
				<span className="font-bold">{number}</span>
			)}
		</div>
		<div>
			<h3 className="font-bold text-lg text-foreground">{phase}</h3>
			<p className="text-sm text-muted-foreground">{description}</p>
		</div>
	</div>
);

const PhaseCard = ({
	item,
	number,
	isLast,
}: {
	item: TestimonialItem;
	number: number;
	isLast: boolean;
}) => (
	<div className="relative">
		{!isLast && (
			<div className="absolute left-5 top-12 bottom-0 w-0.5 bg-border -mb-4" />
		)}
		<Card className="border-border/50 bg-card hover:shadow-lg hover:shadow-primary/5 hover:border-primary/20 transition-all duration-300 group">
			<CardContent className="p-5 @lg:p-6">
				<PhaseHeader
					number={number}
					phase={item.phase}
					description={item.phaseDescription}
					isCompleted={true}
				/>
				<div className="pl-14">
					<div className="flex items-start gap-3 mb-3">
						<Quote className="size-6 text-primary/20 shrink-0" />
						<StarRating rating={item.rating} />
					</div>
					<p className="text-foreground leading-relaxed mb-4">"{item.quote}"</p>
					<div className="flex items-center gap-3 pt-3 border-t border-border/50">
						<Avatar className="size-9 ring-2 ring-primary/10 group-hover:ring-primary/30 transition-all">
							<AvatarImage src={item.avatar} alt={item.author} />
							<AvatarFallback className="bg-primary/10 text-primary font-semibold text-xs">
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
				</div>
			</CardContent>
		</Card>
	</div>
);

export default function Main() {
	const testimonials: TestimonialItem[] = [
		{
			quote:
				'The discovery call was informative. They understood our needs immediately.',
			author: 'Yolanda Martin',
			role: 'Director',
			company: 'DiscoveryCo',
			avatar:
				'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100&h=100&fit=crop',
			initials: 'YM',
			rating: 5,
			phase: 'Discovery',
			phaseDescription: 'Initial consultation and needs assessment',
		},
		{
			quote:
				'Implementation was smooth. The technical team knew exactly what to do.',
			author: 'Zachary Kim',
			role: 'CTO',
			company: 'ImplementPro',
			avatar:
				'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&h=100&fit=crop',
			initials: 'ZK',
			rating: 5,
			phase: 'Implementation',
			phaseDescription: 'Setup, configuration, and deployment',
		},
		{
			quote:
				'Training exceeded expectations. Our team was confident within days.',
			author: 'Amanda Chen',
			role: 'HR Manager',
			company: 'TrainFirst',
			avatar:
				'https://images.unsplash.com/photo-1573497019940-1c28c88b4f3e?w=100&h=100&fit=crop',
			initials: 'AC',
			rating: 5,
			phase: 'Training',
			phaseDescription: 'Team onboarding and skill development',
		},
		{
			quote:
				'Full adoption achieved. The platform is now central to our operations.',
			author: 'Brian Foster',
			role: 'Operations VP',
			company: 'AdoptCorp',
			avatar:
				'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop',
			initials: 'BF',
			rating: 5,
			phase: 'Adoption',
			phaseDescription: 'Full integration and daily usage',
		},
	];

	return (
		<section
			className="@container relative overflow-hidden"
			data-theme="testimonial"
		>
			<div className="mx-auto max-w-7xl px-4 @sm:px-6 @2xl:px-8 py-16 @md:py-20 @xl:py-24 @3xl:py-32">
				<SectionHeader
					badge="Implementation"
					title="The Success Journey"
					description="Follow the phases of successful implementation through customer experiences."
				/>

				<div className="max-w-3xl mx-auto space-y-6">
					{testimonials.map((item, index) => (
						<PhaseCard
							key={index}
							item={item}
							number={index + 1}
							isLast={index === testimonials.length - 1}
						/>
					))}
				</div>
			</div>
		</section>
	);
}
