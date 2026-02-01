'use client';

import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import {
	Accordion,
	AccordionContent,
	AccordionItem,
	AccordionTrigger,
} from '@/components/ui/accordion';
import { MessageCircle, Quote, Star, Clock } from 'lucide-react';

interface TestimonialItem {
	id: string;
	topic: string;
	preview: string;
	quote: string;
	author: string;
	role: string;
	company: string;
	avatar: string;
	initials: string;
	rating: number;
	date: string;
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
			<MessageCircle className="size-3 text-primary" />
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

const DateBadge = ({ date }: { date: string }) => (
	<span className="flex items-center gap-1 text-xs text-muted-foreground">
		<Clock className="size-3" />
		{date}
	</span>
);

export default function Main() {
	const testimonials: TestimonialItem[] = [
		{
			id: 'onboarding',
			topic: 'Onboarding Experience',
			preview: 'The smoothest implementation we have ever had...',
			quote:
				'The smoothest implementation we have ever had. The onboarding team was professional, responsive, and genuinely invested in our success. They customized the training to our specific workflows and made sure every team member was comfortable before moving forward.',
			author: 'Zach Foster',
			role: 'IT Manager',
			company: 'OnboardPro',
			avatar:
				'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&h=100&fit=crop',
			initials: 'ZF',
			rating: 5,
			date: '2 weeks ago',
		},
		{
			id: 'performance',
			topic: 'Performance & Speed',
			preview: 'Lightning fast with zero downtime...',
			quote:
				'Lightning fast with zero downtime. We handle over 1 million transactions daily and the platform has never faltered. Response times are consistently under 100ms and the reliability has been exceptional.',
			author: 'Anna Chen',
			role: 'CTO',
			company: 'SpeedFirst',
			avatar:
				'https://images.unsplash.com/photo-1580489944761-15a19d654956?w=100&h=100&fit=crop',
			initials: 'AC',
			rating: 5,
			date: '1 month ago',
		},
		{
			id: 'integration',
			topic: 'API & Integrations',
			preview: 'Seamless integration with our entire stack...',
			quote:
				'Seamless integration with our entire stack. We connected Salesforce, HubSpot, Slack, and our custom tools within days. The API documentation is excellent and the developer support is outstanding.',
			author: 'Brian Park',
			role: 'Lead Developer',
			company: 'IntegrateCorp',
			avatar:
				'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop',
			initials: 'BP',
			rating: 5,
			date: '3 weeks ago',
		},
		{
			id: 'security',
			topic: 'Security & Compliance',
			preview: 'Enterprise-grade security that exceeds requirements...',
			quote:
				'Enterprise-grade security that exceeds requirements. We achieved SOC 2, HIPAA, and GDPR compliance effortlessly. The security team is knowledgeable and proactive about protecting our data.',
			author: 'Clara Lee',
			role: 'CISO',
			company: 'SecureNet',
			avatar:
				'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100&h=100&fit=crop',
			initials: 'CL',
			rating: 5,
			date: '1 week ago',
		},
	];

	return (
		<section
			className="@container relative overflow-hidden"
			data-theme="testimonial"
		>
			<div className="mx-auto max-w-7xl px-4 @sm:px-6 @2xl:px-8 py-16 @md:py-20 @xl:py-24 @3xl:py-32">
				<SectionHeader
					badge="Topic Based"
					title="Feedback by Topic"
					description="Explore detailed testimonials organized by the topics that matter most to you."
				/>

				<div className="max-w-3xl mx-auto">
					<Accordion
						type="single"
						collapsible
						defaultValue="onboarding"
						className="space-y-3"
					>
						{testimonials.map((item) => (
							<AccordionItem
								key={item.id}
								value={item.id}
								className="border border-border/50 rounded-lg overflow-hidden data-[state=open]:shadow-lg data-[state=open]:shadow-primary/5 transition-all"
							>
								<AccordionTrigger className="hover:no-underline px-5 py-4 hover:bg-muted/30">
									<div className="flex flex-col @md:flex-row @md:items-center gap-2 text-left w-full pr-4">
										<Badge variant="secondary" className="w-fit">
											{item.topic}
										</Badge>
										<span className="text-sm text-muted-foreground truncate flex-1">
											{item.preview}
										</span>
									</div>
								</AccordionTrigger>
								<AccordionContent className="px-5 pb-5 pt-0">
									<div className="flex items-center justify-between mb-3">
										<StarRating rating={item.rating} />
										<DateBadge date={item.date} />
									</div>
									<div className="p-4 bg-primary/5 rounded-lg border border-primary/10 mb-4">
										<Quote className="size-6 text-primary/30 mb-2" />
										<p className="text-foreground leading-relaxed">
											"{item.quote}"
										</p>
									</div>
									<div className="flex items-center gap-3">
										<Avatar className="size-10 ring-2 ring-primary/10">
											<AvatarImage src={item.avatar} alt={item.author} />
											<AvatarFallback className="bg-primary/10 text-primary font-semibold text-sm">
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
								</AccordionContent>
							</AccordionItem>
						))}
					</Accordion>
				</div>
			</div>
		</section>
	);
}
