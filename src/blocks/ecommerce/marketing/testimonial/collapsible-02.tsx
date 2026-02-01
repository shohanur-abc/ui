'use client';

import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent } from '@/components/ui/card';
import {
	Collapsible,
	CollapsibleContent,
	CollapsibleTrigger,
} from '@/components/ui/collapsible';
import { ChevronRight, FolderOpen, Quote, Star } from 'lucide-react';
import { useState } from 'react';

interface TestimonialItem {
	quote: string;
	author: string;
	role: string;
	company: string;
	avatar: string;
	initials: string;
	rating: number;
}

interface Category {
	id: string;
	name: string;
	count: number;
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
	<div className="mb-12 @lg:mb-16">
		<Badge className="mb-4 gap-2 bg-primary text-primary-foreground">
			<FolderOpen className="size-3" />
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

const TestimonialRow = ({ item }: { item: TestimonialItem }) => (
	<div className="flex items-start gap-4 p-4 rounded-lg bg-muted/30 hover:bg-muted/50 transition-colors group">
		<Avatar className="size-10 shrink-0 ring-2 ring-primary/10 group-hover:ring-primary/30 transition-all">
			<AvatarImage src={item.avatar} alt={item.author} />
			<AvatarFallback className="bg-primary/10 text-primary font-semibold text-sm">
				{item.initials}
			</AvatarFallback>
		</Avatar>
		<div className="flex-1 min-w-0">
			<div className="flex items-center justify-between gap-2 mb-1">
				<p className="font-semibold text-sm text-foreground">{item.author}</p>
				<StarRating rating={item.rating} />
			</div>
			<p className="text-xs text-muted-foreground mb-2">
				{item.role} · {item.company}
			</p>
			<p className="text-foreground text-sm leading-relaxed">"{item.quote}"</p>
		</div>
	</div>
);

const CategorySection = ({ category }: { category: Category }) => {
	const [isOpen, setIsOpen] = useState(false);

	return (
		<Card className="border-border/50 bg-card overflow-hidden">
			<Collapsible open={isOpen} onOpenChange={setIsOpen}>
				<CollapsibleTrigger className="w-full">
					<CardContent className="p-5 flex items-center justify-between hover:bg-muted/30 transition-colors">
						<div className="flex items-center gap-3">
							<div className="size-10 rounded-lg bg-primary/10 flex items-center justify-center">
								<Quote className="size-5 text-primary" />
							</div>
							<div className="text-left">
								<h3 className="font-bold text-foreground">{category.name}</h3>
								<p className="text-xs text-muted-foreground">
									{category.count} reviews
								</p>
							</div>
						</div>
						<div className="flex items-center gap-2">
							<Badge variant="secondary">{category.count}</Badge>
							<ChevronRight
								className={`size-5 text-muted-foreground transition-transform ${
									isOpen ? 'rotate-90' : ''
								}`}
							/>
						</div>
					</CardContent>
				</CollapsibleTrigger>
				<CollapsibleContent>
					<div className="px-5 pb-5 space-y-3">
						{category.testimonials.map((item, index) => (
							<TestimonialRow key={index} item={item} />
						))}
					</div>
				</CollapsibleContent>
			</Collapsible>
		</Card>
	);
};

export default function Main() {
	const categories: Category[] = [
		{
			id: 'enterprise',
			name: 'Enterprise Companies',
			count: 3,
			testimonials: [
				{
					quote: 'Scaled effortlessly to support our 5000+ team members.',
					author: 'Maya Foster',
					role: 'CIO',
					company: 'Fortune 500',
					avatar:
						'https://images.unsplash.com/photo-1580489944761-15a19d654956?w=100&h=100&fit=crop',
					initials: 'MF',
					rating: 5,
				},
				{
					quote:
						'Enterprise-grade security met all our compliance requirements.',
					author: 'Nathan Chen',
					role: 'CISO',
					company: 'Global Corp',
					avatar:
						'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&h=100&fit=crop',
					initials: 'NC',
					rating: 5,
				},
				{
					quote: 'The dedicated account team is exceptional.',
					author: 'Olivia Park',
					role: 'VP IT',
					company: 'MegaTech',
					avatar:
						'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100&h=100&fit=crop',
					initials: 'OP',
					rating: 5,
				},
			],
		},
		{
			id: 'startups',
			name: 'Startups',
			count: 3,
			testimonials: [
				{
					quote: 'Perfect for our rapid growth phase. Scales with us.',
					author: 'Patrick Lee',
					role: 'Founder',
					company: 'StartupX',
					avatar:
						'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop',
					initials: 'PL',
					rating: 5,
				},
				{
					quote: 'Affordable pricing that grows with our business.',
					author: 'Quinn Brown',
					role: 'CEO',
					company: 'LaunchPad',
					avatar:
						'https://images.unsplash.com/photo-1573497019940-1c28c88b4f3e?w=100&h=100&fit=crop',
					initials: 'QB',
					rating: 5,
				},
				{
					quote: 'Fast implementation let us focus on product.',
					author: 'Rachel Kim',
					role: 'CTO',
					company: 'InnovateLab',
					avatar:
						'https://images.unsplash.com/photo-1580489944761-15a19d654956?w=100&h=100&fit=crop',
					initials: 'RK',
					rating: 5,
				},
			],
		},
		{
			id: 'agencies',
			name: 'Agencies',
			count: 2,
			testimonials: [
				{
					quote: 'Managing multiple clients has never been easier.',
					author: 'Sam Davis',
					role: 'Agency Owner',
					company: 'Creative Co',
					avatar:
						'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&h=100&fit=crop',
					initials: 'SD',
					rating: 5,
				},
				{
					quote: 'White-label options are perfect for our brand.',
					author: 'Tina Wilson',
					role: 'Director',
					company: 'Brand Studio',
					avatar:
						'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100&h=100&fit=crop',
					initials: 'TW',
					rating: 5,
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
					badge="By Category"
					title="Organized Reviews"
					description="Browse testimonials organized by company type and industry."
				/>

				<div className="grid grid-cols-1 @lg:grid-cols-2 @xl:grid-cols-3 gap-6">
					{categories.map((category) => (
						<CategorySection key={category.id} category={category} />
					))}
				</div>
			</div>
		</section>
	);
}
