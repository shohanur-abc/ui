'use client';

import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Layers, Quote, Star, TrendingUp, Zap } from 'lucide-react';

interface TestimonialItem {
	quote: string;
	author: string;
	role: string;
	company: string;
	avatar: string;
	initials: string;
	rating: number;
	metric: {
		value: string;
		label: string;
	};
}

interface Feature {
	id: string;
	label: string;
	icon: React.ElementType;
	color: string;
	testimonial: TestimonialItem;
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
		<Badge variant="outline" className="mb-4 gap-2 border-primary/30">
			<Layers className="size-3 text-primary" />
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
				className={`size-5 ${i < rating ? 'fill-primary text-primary' : 'text-muted/30'}`}
			/>
		))}
	</div>
);

const MetricHighlight = ({ value, label }: { value: string; label: string }) => (
	<div className="text-center p-6 bg-primary/5 rounded-xl border border-primary/10">
		<p className="text-4xl @md:text-5xl font-bold text-primary mb-1">{value}</p>
		<p className="text-sm text-muted-foreground">{label}</p>
	</div>
);

const FeatureTestimonial = ({ feature }: { feature: Feature }) => (
	<div className="grid grid-cols-1 @lg:grid-cols-2 gap-6 @lg:gap-10">
		<Card className="border-border/50 bg-card shadow-lg group">
			<CardContent className="p-6 @lg:p-8">
				<Quote className="size-10 text-primary/20 mb-4" />
				<StarRating rating={feature.testimonial.rating} />
				<p className="text-foreground text-lg @lg:text-xl leading-relaxed mt-4 mb-6 font-medium">
					"{feature.testimonial.quote}"
				</p>
				<div className="flex items-center gap-4 pt-5 border-t border-border/50">
					<Avatar className="size-14 ring-2 ring-primary/20 group-hover:ring-primary/40 transition-all">
						<AvatarImage
							src={feature.testimonial.avatar}
							alt={feature.testimonial.author}
						/>
						<AvatarFallback className="bg-primary text-primary-foreground font-bold">
							{feature.testimonial.initials}
						</AvatarFallback>
					</Avatar>
					<div>
						<p className="font-bold text-lg text-foreground">
							{feature.testimonial.author}
						</p>
						<p className="text-muted-foreground">
							{feature.testimonial.role} · {feature.testimonial.company}
						</p>
					</div>
				</div>
			</CardContent>
		</Card>

		<div className="flex flex-col justify-center">
			<MetricHighlight
				value={feature.testimonial.metric.value}
				label={feature.testimonial.metric.label}
			/>
			<div className="mt-6 flex items-center justify-center gap-2 text-muted-foreground">
				<feature.icon className="size-5 text-primary" />
				<span className="font-medium">{feature.label} Feature</span>
			</div>
		</div>
	</div>
);

export default function Main() {
	const features: Feature[] = [
		{
			id: 'speed',
			label: 'Speed',
			icon: Zap,
			color: 'text-amber-500',
			testimonial: {
				quote:
					'The speed improvements alone justified the switch. What took hours now takes minutes.',
				author: 'Yolanda Martinez',
				role: 'Engineering Lead',
				company: 'SpeedFirst',
				avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100&h=100&fit=crop',
				initials: 'YM',
				rating: 5,
				metric: {
					value: '10x',
					label: 'Faster Processing',
				},
			},
		},
		{
			id: 'growth',
			label: 'Growth',
			icon: TrendingUp,
			color: 'text-emerald-500',
			testimonial: {
				quote:
					'Our revenue grew significantly after implementing this platform. The ROI was immediate.',
				author: 'Zach Williams',
				role: 'CEO',
				company: 'GrowthMasters',
				avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&h=100&fit=crop',
				initials: 'ZW',
				rating: 5,
				metric: {
					value: '156%',
					label: 'Revenue Growth',
				},
			},
		},
		{
			id: 'scale',
			label: 'Scale',
			icon: Layers,
			color: 'text-blue-500',
			testimonial: {
				quote:
					'We scaled from 100 to 100,000 users without a single performance issue.',
				author: 'Adam Chen',
				role: 'CTO',
				company: 'ScaleUp',
				avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop',
				initials: 'AC',
				rating: 5,
				metric: {
					value: '1000x',
					label: 'Scale Capacity',
				},
			},
		},
	];

	return (
		<section className="@container relative overflow-hidden" data-theme="testimonial">
			<div className="mx-auto max-w-7xl px-4 @sm:px-6 @2xl:px-8 py-16 @md:py-20 @xl:py-24 @3xl:py-32">
				<SectionHeader
					badge="By Feature"
					title="Real Results From"
					highlight="Key Features"
					description="See how specific features deliver measurable outcomes for our customers."
				/>

				<Tabs defaultValue="speed" className="w-full">
					<TabsList className="flex justify-center gap-2 mb-10 @lg:mb-14 bg-transparent h-auto flex-wrap">
						{features.map((feature) => (
							<TabsTrigger
								key={feature.id}
								value={feature.id}
								className="gap-2 px-6 py-3 rounded-full data-[state=active]:bg-primary data-[state=active]:text-primary-foreground"
							>
								<feature.icon className="size-4" />
								{feature.label}
							</TabsTrigger>
						))}
					</TabsList>

					{features.map((feature) => (
						<TabsContent key={feature.id} value={feature.id}>
							<FeatureTestimonial feature={feature} />
						</TabsContent>
					))}
				</Tabs>
			</div>
		</section>
	);
}
