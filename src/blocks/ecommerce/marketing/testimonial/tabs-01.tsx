'use client';

import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Building2, Quote, Star, Users } from 'lucide-react';

interface TestimonialItem {
	quote: string;
	author: string;
	role: string;
	company: string;
	avatar: string;
	initials: string;
	rating: number;
}

interface CategoryData {
	id: string;
	label: string;
	icon: React.ElementType;
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
		<Badge variant="secondary" className="mb-4 gap-2">
			<Users className="size-3" />
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

const TestimonialCard = ({ item }: { item: TestimonialItem }) => (
	<Card className="h-full border-border/50 bg-card hover:shadow-lg hover:shadow-primary/5 hover:border-primary/20 transition-all duration-300 group">
		<CardContent className="p-6 flex flex-col h-full">
			<Quote className="size-8 text-primary/20 mb-3" />
			<StarRating rating={item.rating} />
			<p className="text-foreground leading-relaxed flex-1 mb-6">"{item.quote}"</p>
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
	const categories: CategoryData[] = [
		{
			id: 'startups',
			label: 'Startups',
			icon: Building2,
			testimonials: [
				{
					quote:
						'Perfect for early-stage companies. The pricing is fair and scales with us.',
					author: 'Alex Chen',
					role: 'Founder',
					company: 'TechStart',
					avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&h=100&fit=crop',
					initials: 'AC',
					rating: 5,
				},
				{
					quote:
						'We went from idea to launch in weeks thanks to this platform.',
					author: 'Beth Green',
					role: 'Co-Founder',
					company: 'LaunchFast',
					avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100&h=100&fit=crop',
					initials: 'BG',
					rating: 5,
				},
				{
					quote:
						'The onboarding was so smooth. We were productive immediately.',
					author: 'Carlos Ruiz',
					role: 'CTO',
					company: 'InnovateTech',
					avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop',
					initials: 'CR',
					rating: 5,
				},
			],
		},
		{
			id: 'enterprise',
			label: 'Enterprise',
			icon: Building2,
			testimonials: [
				{
					quote:
						'Enterprise-grade security and compliance. Audit was seamless.',
					author: 'Diana Foster',
					role: 'CISO',
					company: 'Global Corp',
					avatar: 'https://images.unsplash.com/photo-1573497019940-1c28c88b4f3e?w=100&h=100&fit=crop',
					initials: 'DF',
					rating: 5,
				},
				{
					quote:
						'Scaled to 10,000 users without any performance issues.',
					author: 'Edward Kim',
					role: 'IT Director',
					company: 'Mega Enterprise',
					avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=100&h=100&fit=crop',
					initials: 'EK',
					rating: 5,
				},
				{
					quote:
						'The dedicated support team understands enterprise needs.',
					author: 'Fiona Walsh',
					role: 'VP Operations',
					company: 'Fortune 500',
					avatar: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?w=100&h=100&fit=crop',
					initials: 'FW',
					rating: 5,
				},
			],
		},
		{
			id: 'agencies',
			label: 'Agencies',
			icon: Users,
			testimonials: [
				{
					quote:
						'Managing multiple clients is effortless with this platform.',
					author: 'George Adams',
					role: 'Agency Director',
					company: 'Creative Agency',
					avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&h=100&fit=crop',
					initials: 'GA',
					rating: 5,
				},
				{
					quote:
						'White-label options make it perfect for our brand.',
					author: 'Hannah Lee',
					role: 'Brand Manager',
					company: 'Design Studio',
					avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100&h=100&fit=crop',
					initials: 'HL',
					rating: 5,
				},
				{
					quote:
						'Our clients love the results. Huge win for our agency.',
					author: 'Ian Brooks',
					role: 'Account Director',
					company: 'Marketing Pro',
					avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop',
					initials: 'IB',
					rating: 5,
				},
			],
		},
	];

	return (
		<section className="@container relative overflow-hidden" data-theme="testimonial">
			<div className="mx-auto max-w-7xl px-4 @sm:px-6 @2xl:px-8 py-16 @md:py-20 @xl:py-24 @3xl:py-32">
				<SectionHeader
					badge="By Industry"
					title="Stories From Every Sector"
					description="See how businesses of all types are achieving success with our platform."
				/>

				<Tabs defaultValue="startups" className="w-full">
					<TabsList className="flex justify-center gap-2 mb-8 @lg:mb-12 bg-transparent h-auto flex-wrap">
						{categories.map((category) => (
							<TabsTrigger
								key={category.id}
								value={category.id}
								className="gap-2 data-[state=active]:bg-primary data-[state=active]:text-primary-foreground px-6 py-2.5 rounded-full"
							>
								<category.icon className="size-4" />
								{category.label}
							</TabsTrigger>
						))}
					</TabsList>

					{categories.map((category) => (
						<TabsContent key={category.id} value={category.id}>
							<div className="grid grid-cols-1 @md:grid-cols-2 @xl:grid-cols-3 gap-6">
								{category.testimonials.map((item, index) => (
									<TestimonialCard key={index} item={item} />
								))}
							</div>
						</TabsContent>
					))}
				</Tabs>
			</div>
		</section>
	);
}
