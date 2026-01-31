'use client';

import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { CircleDollarSign, Cog, HeadphonesIcon, LayoutGrid, Quote, Star } from 'lucide-react';

interface TestimonialItem {
	quote: string;
	author: string;
	role: string;
	company: string;
	avatar: string;
	initials: string;
	rating: number;
}

interface UseCase {
	id: string;
	label: string;
	icon: React.ElementType;
	description: string;
	testimonials: TestimonialItem[];
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
	<div className="text-center mb-10 @lg:mb-14">
		<Badge className="mb-4 gap-2 bg-primary text-primary-foreground">
			<LayoutGrid className="size-3" />
			{badge}
		</Badge>
		<h2 className="text-3xl @sm:text-4xl @lg:text-5xl font-bold tracking-tight">
			{title} <span className="text-primary">{highlight}</span>
		</h2>
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

const UseCaseTab = ({ useCase }: { useCase: UseCase }) => (
	<div className="flex flex-col items-center gap-1">
		<useCase.icon className="size-5" />
		<span className="text-sm font-medium">{useCase.label}</span>
	</div>
);

const TestimonialGrid = ({ item }: { item: TestimonialItem }) => (
	<Card className="border-border/50 bg-card hover:shadow-lg hover:shadow-primary/5 hover:border-primary/20 transition-all duration-300 group">
		<CardContent className="p-6">
			<Quote className="size-7 text-primary/20 mb-3" />
			<StarRating rating={item.rating} />
			<p className="text-foreground leading-relaxed mb-5 line-clamp-4">"{item.quote}"</p>
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

const UseCaseDescription = ({ description }: { description: string }) => (
	<div className="text-center mb-8">
		<p className="text-muted-foreground max-w-2xl mx-auto">{description}</p>
	</div>
);

export default function Main() {
	const useCases: UseCase[] = [
		{
			id: 'marketing',
			label: 'Marketing',
			icon: CircleDollarSign,
			description: 'How marketing teams drive results with our platform',
			testimonials: [
				{
					quote: 'Our campaigns now reach 3x more customers with half the effort.',
					author: 'Jack Smith',
					role: 'Marketing Director',
					company: 'GrowthCo',
					avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&h=100&fit=crop',
					initials: 'JS',
					rating: 5,
				},
				{
					quote: 'The analytics tools have transformed our data-driven marketing.',
					author: 'Kate Miller',
					role: 'CMO',
					company: 'BrandUp',
					avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100&h=100&fit=crop',
					initials: 'KM',
					rating: 5,
				},
			],
		},
		{
			id: 'operations',
			label: 'Operations',
			icon: Cog,
			description: 'Streamlining workflows for operational excellence',
			testimonials: [
				{
					quote: 'Reduced our manual processes by 80%. Huge time savings.',
					author: 'Leo Johnson',
					role: 'Ops Manager',
					company: 'Efficient Inc',
					avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop',
					initials: 'LJ',
					rating: 5,
				},
				{
					quote: 'Integration with our existing tools was seamless.',
					author: 'Maya Patel',
					role: 'VP Operations',
					company: 'StreamLine',
					avatar: 'https://images.unsplash.com/photo-1573497019940-1c28c88b4f3e?w=100&h=100&fit=crop',
					initials: 'MP',
					rating: 5,
				},
			],
		},
		{
			id: 'support',
			label: 'Support',
			icon: HeadphonesIcon,
			description: 'Empowering customer support teams to excel',
			testimonials: [
				{
					quote: 'Response times dropped from hours to minutes.',
					author: 'Nathan Lee',
					role: 'Support Lead',
					company: 'HelpDesk Pro',
					avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=100&h=100&fit=crop',
					initials: 'NL',
					rating: 5,
				},
				{
					quote: 'Customer satisfaction scores are at an all-time high.',
					author: 'Olivia Brown',
					role: 'CX Director',
					company: 'SupportFirst',
					avatar: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?w=100&h=100&fit=crop',
					initials: 'OB',
					rating: 5,
				},
			],
		},
	];

	return (
		<section className="@container relative overflow-hidden" data-theme="testimonial">
			<div className="mx-auto max-w-7xl px-4 @sm:px-6 @2xl:px-8 py-16 @md:py-20 @xl:py-24 @3xl:py-32">
				<SectionHeader badge="Use Cases" title="Success Across" highlight="Every Team" />

				<Tabs defaultValue="marketing" className="w-full">
					<TabsList className="flex justify-center gap-1 @md:gap-2 mb-8 bg-muted/50 h-auto p-1 rounded-xl max-w-fit mx-auto">
						{useCases.map((useCase) => (
							<TabsTrigger
								key={useCase.id}
								value={useCase.id}
								className="flex-col py-3 px-4 @md:px-6 rounded-lg data-[state=active]:bg-background data-[state=active]:shadow-sm gap-1"
							>
								<UseCaseTab useCase={useCase} />
							</TabsTrigger>
						))}
					</TabsList>

					{useCases.map((useCase) => (
						<TabsContent key={useCase.id} value={useCase.id}>
							<UseCaseDescription description={useCase.description} />
							<div className="grid grid-cols-1 @md:grid-cols-2 gap-6 max-w-4xl mx-auto">
								{useCase.testimonials.map((item, index) => (
									<TestimonialGrid key={index} item={item} />
								))}
							</div>
						</TabsContent>
					))}
				</Tabs>
			</div>
		</section>
	);
}
