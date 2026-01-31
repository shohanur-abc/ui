'use client';

import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent } from '@/components/ui/card';
import {
	Accordion,
	AccordionContent,
	AccordionItem,
	AccordionTrigger,
} from '@/components/ui/accordion';
import { Briefcase, Quote, Star } from 'lucide-react';

interface TestimonialItem {
	id: string;
	industry: string;
	shortQuote: string;
	fullQuote: string;
	author: string;
	role: string;
	company: string;
	avatar: string;
	initials: string;
	rating: number;
	companyLogo: string;
}

const SectionHeader = ({
	badge,
	title,
	highlight,
}: {
	badge: string;
	title: string;
	highlight: string;
}) => (
	<div className="text-center mb-12 @lg:mb-16">
		<Badge className="mb-4 gap-2 bg-primary text-primary-foreground">
			<Briefcase className="size-3" />
			{badge}
		</Badge>
		<h2 className="text-3xl @sm:text-4xl @lg:text-5xl font-bold tracking-tight">
			{title} <span className="text-primary">{highlight}</span>
		</h2>
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

const IndustryBadge = ({ industry }: { industry: string }) => (
	<Badge
		variant="outline"
		className="bg-muted/50 border-border/50 text-muted-foreground text-xs"
	>
		{industry}
	</Badge>
);

export default function Main() {
	const testimonials: TestimonialItem[] = [
		{
			id: 'tech-1',
			industry: 'Technology',
			shortQuote: 'Revolutionized our development workflow',
			fullQuote:
				'Revolutionized our development workflow. We reduced deployment time by 70% and eliminated most of our manual QA processes. The ROI has been exceptional and our engineering team loves working with it.',
			author: 'Uma Chen',
			role: 'VP Engineering',
			company: 'TechFlow',
			avatar: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?w=100&h=100&fit=crop',
			initials: 'UC',
			rating: 5,
			companyLogo: 'TF',
		},
		{
			id: 'finance-1',
			industry: 'Finance',
			shortQuote: 'Transformed our compliance reporting',
			fullQuote:
				'Transformed our compliance reporting. What used to take weeks now takes hours. We passed our SOX audit with flying colors and the regulatory team is thrilled with the accuracy and traceability.',
			author: 'Victor Park',
			role: 'Chief Compliance',
			company: 'FinServe',
			avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&h=100&fit=crop',
			initials: 'VP',
			rating: 5,
			companyLogo: 'FS',
		},
		{
			id: 'health-1',
			industry: 'Healthcare',
			shortQuote: 'HIPAA compliance made simple',
			fullQuote:
				'HIPAA compliance made simple. We implemented the solution across 15 hospitals and achieved full compliance in record time. Patient data security has never been stronger and our staff productivity improved significantly.',
			author: 'Wendy Lee',
			role: 'CIO',
			company: 'HealthNet',
			avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100&h=100&fit=crop',
			initials: 'WL',
			rating: 5,
			companyLogo: 'HN',
		},
		{
			id: 'retail-1',
			industry: 'Retail',
			shortQuote: 'Omnichannel excellence achieved',
			fullQuote:
				'Omnichannel excellence achieved. We unified our online and in-store experience, resulting in a 45% increase in customer lifetime value and 30% improvement in inventory efficiency.',
			author: 'Xavier Kim',
			role: 'COO',
			company: 'RetailMax',
			avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop',
			initials: 'XK',
			rating: 5,
			companyLogo: 'RM',
		},
		{
			id: 'edu-1',
			industry: 'Education',
			shortQuote: 'Student engagement skyrocketed',
			fullQuote:
				'Student engagement skyrocketed. Course completion rates increased by 60% and student satisfaction scores reached all-time highs. The platform is intuitive for both educators and learners.',
			author: 'Yara Foster',
			role: 'Dean of Tech',
			company: 'EduFirst',
			avatar: 'https://images.unsplash.com/photo-1573497019940-1c28c88b4f3e?w=100&h=100&fit=crop',
			initials: 'YF',
			rating: 5,
			companyLogo: 'EF',
		},
	];

	return (
		<section className="@container relative overflow-hidden" data-theme="testimonial">
			<div className="mx-auto max-w-7xl px-4 @sm:px-6 @2xl:px-8 py-16 @md:py-20 @xl:py-24 @3xl:py-32">
				<SectionHeader
					badge="Industry Focus"
					title="Trusted Across"
					highlight="Industries"
				/>

				<div className="grid grid-cols-1 @lg:grid-cols-2 gap-6 max-w-5xl mx-auto">
					{testimonials.map((item) => (
						<Card
							key={item.id}
							className="border-border/50 bg-card overflow-hidden"
						>
							<Accordion type="single" collapsible>
								<AccordionItem value={item.id} className="border-0">
									<AccordionTrigger className="hover:no-underline px-5 py-4 hover:bg-muted/30">
										<div className="flex items-center gap-3 text-left">
											<div className="size-10 rounded-lg bg-muted flex items-center justify-center font-bold text-sm text-muted-foreground shrink-0">
												{item.companyLogo}
											</div>
											<div className="min-w-0 flex-1">
												<p className="font-semibold text-sm text-foreground truncate">
													{item.shortQuote}
												</p>
												<p className="text-xs text-muted-foreground">
													{item.company}
												</p>
											</div>
										</div>
									</AccordionTrigger>
									<AccordionContent className="px-5 pb-5 pt-0">
										<div className="flex items-center justify-between mb-3">
											<IndustryBadge industry={item.industry} />
											<StarRating rating={item.rating} />
										</div>
										<Quote className="size-6 text-primary/20 mb-2" />
										<p className="text-foreground leading-relaxed mb-4">
											"{item.fullQuote}"
										</p>
										<div className="flex items-center gap-3 pt-3 border-t border-border/50">
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
							</Accordion>
						</Card>
					))}
				</div>
			</div>
		</section>
	);
}
