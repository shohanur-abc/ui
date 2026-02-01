'use client';

import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import {
	Accordion,
	AccordionContent,
	AccordionItem,
	AccordionTrigger,
} from '@/components/ui/accordion';
import { Layers, Quote, Star, TrendingUp } from 'lucide-react';

interface TestimonialItem {
	id: string;
	category: string;
	icon: React.ReactNode;
	testimonials: {
		quote: string;
		author: string;
		role: string;
		company: string;
		avatar: string;
		initials: string;
		rating: number;
		metric: string;
	}[];
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
		<Badge variant="secondary" className="mb-4 gap-2">
			<Layers className="size-3" />
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
				className={`size-3 ${i < rating ? 'fill-primary text-primary' : 'text-muted/30'}`}
			/>
		))}
	</div>
);

const MetricBadge = ({ metric }: { metric: string }) => (
	<Badge
		variant="outline"
		className="bg-primary/5 border-primary/20 text-primary text-xs"
	>
		<TrendingUp className="size-3 mr-1" />
		{metric}
	</Badge>
);

const TestimonialEntry = ({
	item,
}: {
	item: TestimonialItem['testimonials'][0];
}) => (
	<div className="flex flex-col @md:flex-row gap-4 p-4 bg-muted/30 rounded-lg">
		<Avatar className="size-12 ring-2 ring-primary/10 shrink-0">
			<AvatarImage src={item.avatar} alt={item.author} />
			<AvatarFallback className="bg-primary/10 text-primary font-semibold">
				{item.initials}
			</AvatarFallback>
		</Avatar>
		<div className="flex-1">
			<div className="flex items-center justify-between gap-2 mb-2 flex-wrap">
				<div className="flex items-center gap-2">
					<StarRating rating={item.rating} />
					<MetricBadge metric={item.metric} />
				</div>
			</div>
			<p className="text-foreground text-sm leading-relaxed mb-2">
				"{item.quote}"
			</p>
			<p className="text-xs text-muted-foreground">
				<span className="font-semibold text-foreground">{item.author}</span> ·{' '}
				{item.role} at {item.company}
			</p>
		</div>
	</div>
);

export default function Main() {
	const categories: TestimonialItem[] = [
		{
			id: 'productivity',
			category: 'Productivity Gains',
			icon: <TrendingUp className="size-4" />,
			testimonials: [
				{
					quote:
						'Our team output increased by 60% within the first month of adoption.',
					author: 'Paula Chen',
					role: 'VP Operations',
					company: 'ProductivityCo',
					avatar:
						'https://images.unsplash.com/photo-1580489944761-15a19d654956?w=100&h=100&fit=crop',
					initials: 'PC',
					rating: 5,
					metric: '+60% output',
				},
				{
					quote:
						'Time spent on manual tasks dropped by 80%. Game-changing efficiency.',
					author: 'Quinn Park',
					role: 'Director',
					company: 'EfficiencyFirst',
					avatar:
						'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&h=100&fit=crop',
					initials: 'QP',
					rating: 5,
					metric: '-80% manual work',
				},
			],
		},
		{
			id: 'cost',
			category: 'Cost Savings',
			icon: <TrendingUp className="size-4" />,
			testimonials: [
				{
					quote:
						'Reduced our operational costs by $500K annually. ROI was achieved in 60 days.',
					author: 'Rachel Lee',
					role: 'CFO',
					company: 'SaveSmart',
					avatar:
						'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100&h=100&fit=crop',
					initials: 'RL',
					rating: 5,
					metric: '$500K saved',
				},
			],
		},
		{
			id: 'satisfaction',
			category: 'Customer Satisfaction',
			icon: <TrendingUp className="size-4" />,
			testimonials: [
				{
					quote:
						'Our NPS score jumped from 35 to 72 after implementing this solution.',
					author: 'Sam Kim',
					role: 'CX Director',
					company: 'HappyCustomers',
					avatar:
						'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop',
					initials: 'SK',
					rating: 5,
					metric: 'NPS +37 pts',
				},
				{
					quote:
						'Customer complaints dropped by 65% and satisfaction surveys are at all-time highs.',
					author: 'Tina Davis',
					role: 'Support Lead',
					company: 'ServicePro',
					avatar:
						'https://images.unsplash.com/photo-1573497019940-1c28c88b4f3e?w=100&h=100&fit=crop',
					initials: 'TD',
					rating: 5,
					metric: '-65% complaints',
				},
			],
		},
	];

	return (
		<section
			className="@container relative overflow-hidden"
			data-theme="testimonial"
		>
			<div className="mx-auto max-w-7xl px-4 @sm:px-6 @2xl:px-8 py-16 @md:py-20 @xl:py-24 @3xl:py-32">
				<SectionHeader
					badge="Grouped Results"
					title="Impact by Category"
					description="Browse testimonials organized by the type of results our customers achieved."
				/>

				<div className="max-w-4xl mx-auto">
					<Accordion type="multiple" className="space-y-4">
						{categories.map((category) => (
							<AccordionItem
								key={category.id}
								value={category.id}
								className="border border-border/50 rounded-lg overflow-hidden"
							>
								<AccordionTrigger className="hover:no-underline px-5 py-4 hover:bg-muted/30 data-[state=open]:bg-muted/30">
									<div className="flex items-center gap-3">
										<div className="size-8 rounded-lg bg-primary/10 flex items-center justify-center text-primary">
											{category.icon}
										</div>
										<span className="font-semibold">{category.category}</span>
										<Badge variant="secondary" className="ml-2">
											{category.testimonials.length}
										</Badge>
									</div>
								</AccordionTrigger>
								<AccordionContent className="px-5 pb-5 pt-3 space-y-3">
									{category.testimonials.map((item, index) => (
										<TestimonialEntry key={index} item={item} />
									))}
								</AccordionContent>
							</AccordionItem>
						))}
					</Accordion>
				</div>
			</div>
		</section>
	);
}
