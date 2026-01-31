'use client';

import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent } from '@/components/ui/card';
import {
	Collapsible,
	CollapsibleContent,
	CollapsibleTrigger,
} from '@/components/ui/collapsible';
import { ChevronsUpDown, Sparkles, Quote, Star, Building2 } from 'lucide-react';
import { useState } from 'react';

interface TestimonialItem {
	quote: string;
	author: string;
	role: string;
	company: string;
	avatar: string;
	initials: string;
	rating: number;
	impact: string;
}

interface CompanySection {
	company: string;
	logo: string;
	industry: string;
	testimonials: TestimonialItem[];
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
			<Building2 className="size-3" />
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

const ImpactBadge = ({ impact }: { impact: string }) => (
	<Badge variant="outline" className="bg-primary/5 border-primary/20 text-primary font-semibold">
		{impact}
	</Badge>
);

const TestimonialEntry = ({ item }: { item: TestimonialItem }) => (
	<div className="p-4 bg-muted/30 rounded-lg">
		<div className="flex items-center justify-between mb-3">
			<StarRating rating={item.rating} />
			<ImpactBadge impact={item.impact} />
		</div>
		<Quote className="size-5 text-primary/20 mb-2" />
		<p className="text-foreground leading-relaxed mb-3">"{item.quote}"</p>
		<div className="flex items-center gap-2">
			<Avatar className="size-8 ring-2 ring-primary/10">
				<AvatarImage src={item.avatar} alt={item.author} />
				<AvatarFallback className="bg-primary/10 text-primary font-semibold text-xs">
					{item.initials}
				</AvatarFallback>
			</Avatar>
			<div>
				<p className="font-semibold text-xs text-foreground">{item.author}</p>
				<p className="text-xs text-muted-foreground">{item.role}</p>
			</div>
		</div>
	</div>
);

const CompanyCard = ({ section }: { section: CompanySection }) => {
	const [isOpen, setIsOpen] = useState(false);

	return (
		<Card className="border-border/50 bg-card overflow-hidden">
			<Collapsible open={isOpen} onOpenChange={setIsOpen}>
				<CollapsibleTrigger className="w-full text-left">
					<CardContent className="p-5 @lg:p-6 hover:bg-muted/30 transition-colors">
						<div className="flex items-center justify-between">
							<div className="flex items-center gap-4">
								<div className="size-12 rounded-lg bg-muted flex items-center justify-center font-bold text-lg text-muted-foreground">
									{section.logo}
								</div>
								<div>
									<h3 className="font-bold text-foreground">{section.company}</h3>
									<p className="text-xs text-muted-foreground">
										{section.industry} · {section.testimonials.length} reviews
									</p>
								</div>
							</div>
							<ChevronsUpDown
								className={`size-5 text-muted-foreground transition-transform ${
									isOpen ? 'rotate-180' : ''
								}`}
							/>
						</div>
					</CardContent>
				</CollapsibleTrigger>
				<CollapsibleContent>
					<CardContent className="pt-0 pb-5 px-5 @lg:px-6 space-y-3">
						{section.testimonials.map((item, index) => (
							<TestimonialEntry key={index} item={item} />
						))}
					</CardContent>
				</CollapsibleContent>
			</Collapsible>
		</Card>
	);
};

export default function Main() {
	const companies: CompanySection[] = [
		{
			company: 'TechCorp Global',
			logo: 'TC',
			industry: 'Technology',
			testimonials: [
				{
					quote: 'Transformed our entire development workflow.',
					author: 'Zach Wilson',
					role: 'VP Engineering',
					company: 'TechCorp',
					avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&h=100&fit=crop',
					initials: 'ZW',
					rating: 5,
					impact: '+60% productivity',
				},
				{
					quote: 'Security features are best-in-class.',
					author: 'Amy Chen',
					role: 'CISO',
					company: 'TechCorp',
					avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100&h=100&fit=crop',
					initials: 'AC',
					rating: 5,
					impact: '100% compliant',
				},
			],
		},
		{
			company: 'FinanceFirst Inc',
			logo: 'FF',
			industry: 'Finance',
			testimonials: [
				{
					quote: 'Compliance reporting is now automated.',
					author: 'Brian Park',
					role: 'CFO',
					company: 'FinanceFirst',
					avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop',
					initials: 'BP',
					rating: 5,
					impact: '90% time saved',
				},
			],
		},
		{
			company: 'HealthCare Plus',
			logo: 'HC',
			industry: 'Healthcare',
			testimonials: [
				{
					quote: 'HIPAA compliance was seamless to achieve.',
					author: 'Clara Davis',
					role: 'CTO',
					company: 'HealthCare Plus',
					avatar: 'https://images.unsplash.com/photo-1573497019940-1c28c88b4f3e?w=100&h=100&fit=crop',
					initials: 'CD',
					rating: 5,
					impact: 'HIPAA certified',
				},
				{
					quote: 'Patient data security is our priority.',
					author: 'Dan Lee',
					role: 'Security Lead',
					company: 'HealthCare Plus',
					avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=100&h=100&fit=crop',
					initials: 'DL',
					rating: 5,
					impact: 'Zero breaches',
				},
			],
		},
	];

	return (
		<section className="@container relative overflow-hidden" data-theme="testimonial">
			<div className="mx-auto max-w-7xl px-4 @sm:px-6 @2xl:px-8 py-16 @md:py-20 @xl:py-24 @3xl:py-32">
				<SectionHeader
					badge="By Company"
					title="Case Study Testimonials"
					description="Explore detailed testimonials organized by company and industry."
				/>

				<div className="max-w-4xl mx-auto space-y-4">
					{companies.map((section, index) => (
						<CompanyCard key={index} section={section} />
					))}
				</div>
			</div>
		</section>
	);
}
