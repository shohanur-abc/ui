'use client';

import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import {
	Accordion,
	AccordionContent,
	AccordionItem,
	AccordionTrigger,
} from '@/components/ui/accordion';
import { FileText, Quote, Star, ArrowRight, CheckCircle } from 'lucide-react';

interface TestimonialItem {
	id: string;
	title: string;
	summary: string;
	challenge: string;
	solution: string;
	result: string;
	author: string;
	role: string;
	company: string;
	avatar: string;
	initials: string;
	rating: number;
	metrics: string[];
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
		<Badge className="mb-4 gap-2 bg-primary text-primary-foreground">
			<FileText className="size-3" />
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

const SectionLabel = ({
	label,
	type,
}: {
	label: string;
	type: 'challenge' | 'solution' | 'result';
}) => {
	const colors = {
		challenge: 'text-red-500',
		solution: 'text-blue-500',
		result: 'text-green-500',
	};

	return (
		<span className={`text-xs font-semibold uppercase tracking-wider ${colors[type]}`}>
			{label}
		</span>
	);
};

const MetricTag = ({ metric }: { metric: string }) => (
	<span className="inline-flex items-center gap-1 px-2 py-1 bg-primary/10 text-primary rounded-full text-xs font-medium">
		<CheckCircle className="size-3" />
		{metric}
	</span>
);

export default function Main() {
	const testimonials: TestimonialItem[] = [
		{
			id: 'case-1',
			title: 'Enterprise Digital Transformation',
			summary: 'How TechGlobal modernized their legacy systems',
			challenge:
				'Legacy systems causing 40% productivity loss and preventing innovation.',
			solution:
				'Implemented comprehensive platform migration with zero downtime strategy.',
			result:
				'Achieved 150% ROI within 6 months and enabled rapid feature development.',
			author: 'Diana Foster',
			role: 'CTO',
			company: 'TechGlobal',
			avatar: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?w=100&h=100&fit=crop',
			initials: 'DF',
			rating: 5,
			metrics: ['150% ROI', '6 months', 'Zero downtime'],
		},
		{
			id: 'case-2',
			title: 'Scaling for Hypergrowth',
			summary: 'StartupX scaled from 50 to 5000 users seamlessly',
			challenge:
				'Existing infrastructure couldnt handle 100x user growth projection.',
			solution:
				'Deployed auto-scaling architecture with global CDN and load balancing.',
			result:
				'Successfully scaled to 10,000 users with 99.99% uptime maintained.',
			author: 'Eric Chen',
			role: 'VP Engineering',
			company: 'StartupX',
			avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&h=100&fit=crop',
			initials: 'EC',
			rating: 5,
			metrics: ['10,000 users', '99.99% uptime', '100x scale'],
		},
		{
			id: 'case-3',
			title: 'Compliance & Security Overhaul',
			summary: 'FinCorp achieved multi-framework compliance',
			challenge:
				'Needed SOC 2, GDPR, and PCI-DSS compliance for enterprise clients.',
			solution:
				'Implemented comprehensive security framework with automated monitoring.',
			result:
				'Achieved all certifications in 90 days and won 15 enterprise contracts.',
			author: 'Fiona Park',
			role: 'CISO',
			company: 'FinCorp',
			avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100&h=100&fit=crop',
			initials: 'FP',
			rating: 5,
			metrics: ['3 certifications', '90 days', '15 contracts'],
		},
	];

	return (
		<section className="@container relative overflow-hidden" data-theme="testimonial">
			<div className="mx-auto max-w-7xl px-4 @sm:px-6 @2xl:px-8 py-16 @md:py-20 @xl:py-24 @3xl:py-32">
				<SectionHeader
					badge="Case Studies"
					title="Success"
					highlight="Stories"
					description="Detailed case studies showing the journey from challenge to results."
				/>

				<div className="max-w-4xl mx-auto">
					<Accordion type="single" collapsible className="space-y-4">
						{testimonials.map((item) => (
							<AccordionItem
								key={item.id}
								value={item.id}
								className="border border-border/50 rounded-xl overflow-hidden bg-card"
							>
								<AccordionTrigger className="hover:no-underline px-6 py-5 hover:bg-muted/30">
									<div className="flex flex-col text-left w-full pr-4">
										<h3 className="font-bold text-foreground">{item.title}</h3>
										<p className="text-sm text-muted-foreground">
											{item.summary}
										</p>
									</div>
								</AccordionTrigger>
								<AccordionContent className="px-6 pb-6 pt-0">
									<div className="space-y-4 mb-6">
										<div className="p-4 bg-red-500/5 rounded-lg border border-red-500/10">
											<SectionLabel label="Challenge" type="challenge" />
											<p className="text-foreground mt-1">{item.challenge}</p>
										</div>
										<div className="p-4 bg-blue-500/5 rounded-lg border border-blue-500/10">
											<SectionLabel label="Solution" type="solution" />
											<p className="text-foreground mt-1">{item.solution}</p>
										</div>
										<div className="p-4 bg-green-500/5 rounded-lg border border-green-500/10">
											<SectionLabel label="Result" type="result" />
											<p className="text-foreground mt-1">{item.result}</p>
										</div>
									</div>

									<div className="flex flex-wrap gap-2 mb-5">
										{item.metrics.map((metric, i) => (
											<MetricTag key={i} metric={metric} />
										))}
									</div>

									<div className="flex items-center justify-between pt-4 border-t border-border/50">
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
										<StarRating rating={item.rating} />
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
