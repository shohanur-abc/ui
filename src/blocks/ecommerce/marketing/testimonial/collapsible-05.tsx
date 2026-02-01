'use client';

import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent } from '@/components/ui/card';
import {
	Collapsible,
	CollapsibleContent,
	CollapsibleTrigger,
} from '@/components/ui/collapsible';
import { LayoutList, Quote, Star, Eye, EyeOff } from 'lucide-react';
import { useState } from 'react';

interface TestimonialItem {
	summary: string;
	details: string;
	author: string;
	role: string;
	company: string;
	avatar: string;
	initials: string;
	rating: number;
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
		<Badge variant="outline" className="mb-4 gap-2 border-primary/30">
			<LayoutList className="size-3 text-primary" />
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

const ToggleCard = ({ item }: { item: TestimonialItem }) => {
	const [showDetails, setShowDetails] = useState(false);

	return (
		<Card className="border-border/50 bg-card hover:shadow-lg hover:shadow-primary/5 hover:border-primary/20 transition-all duration-300 group h-full">
			<CardContent className="p-5 @lg:p-6 flex flex-col h-full">
				<div className="flex items-center justify-between mb-3">
					<Quote className="size-7 text-primary/20" />
					<button
						onClick={() => setShowDetails(!showDetails)}
						className="flex items-center gap-1.5 text-xs font-medium text-primary hover:text-primary/80 transition-colors"
					>
						{showDetails ? (
							<>
								<EyeOff className="size-3.5" />
								Summary
							</>
						) : (
							<>
								<Eye className="size-3.5" />
								Details
							</>
						)}
					</button>
				</div>
				<StarRating rating={item.rating} />

				<Collapsible open={showDetails}>
					<CollapsibleContent>
						<p className="text-foreground leading-relaxed mb-4">
							"{item.details}"
						</p>
					</CollapsibleContent>
					{!showDetails && (
						<p className="text-foreground leading-relaxed mb-4 line-clamp-3">
							"{item.summary}"
						</p>
					)}
				</Collapsible>

				<div className="flex items-center gap-3 pt-4 mt-auto border-t border-border/50">
					<Avatar className="size-10 ring-2 ring-primary/10 group-hover:ring-primary/30 transition-all">
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
			</CardContent>
		</Card>
	);
};

export default function Main() {
	const testimonials: TestimonialItem[] = [
		{
			summary:
				'Incredible platform that transformed our business operations completely.',
			details:
				'Incredible platform that transformed our business operations completely. We saw immediate improvements in team efficiency, customer satisfaction increased by 40%, and our revenue grew by 25% in the first quarter alone. The implementation was smooth and the support team was exceptional throughout the entire process.',
			author: 'Emily Foster',
			role: 'CEO',
			company: 'TransformCo',
			avatar:
				'https://images.unsplash.com/photo-1580489944761-15a19d654956?w=100&h=100&fit=crop',
			initials: 'EF',
			rating: 5,
		},
		{
			summary:
				'The best investment our company has made in the last five years.',
			details:
				'The best investment our company has made in the last five years. ROI was visible within 30 days, our productivity increased by 60%, and we were able to reduce operational costs significantly. The platform has become essential to our daily operations.',
			author: 'Frank Chen',
			role: 'CFO',
			company: 'InvestSmart',
			avatar:
				'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&h=100&fit=crop',
			initials: 'FC',
			rating: 5,
		},
		{
			summary:
				'Outstanding support and a product that truly delivers on its promises.',
			details:
				'Outstanding support and a product that truly delivers on its promises. Every feature works exactly as advertised, the team responds to issues within minutes, and they genuinely care about our success. We have recommended them to all our partners.',
			author: 'Grace Kim',
			role: 'Operations',
			company: 'SupportFirst',
			avatar:
				'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100&h=100&fit=crop',
			initials: 'GK',
			rating: 5,
		},
		{
			summary:
				'Seamless integration with our existing tech stack. Highly recommended.',
			details:
				'Seamless integration with our existing tech stack. Highly recommended. We connected with Salesforce, Slack, and our custom APIs within a week. The documentation is excellent and the developer support is top-notch.',
			author: 'Henry Park',
			role: 'CTO',
			company: 'IntegratePro',
			avatar:
				'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop',
			initials: 'HP',
			rating: 5,
		},
		{
			summary:
				'Enterprise-grade security that exceeded our compliance requirements.',
			details:
				'Enterprise-grade security that exceeded our compliance requirements. We passed our SOC 2 audit with flying colors, achieved GDPR compliance effortlessly, and our security team is impressed with the depth of their security features.',
			author: 'Iris Lee',
			role: 'CISO',
			company: 'SecureCorp',
			avatar:
				'https://images.unsplash.com/photo-1573497019940-1c28c88b4f3e?w=100&h=100&fit=crop',
			initials: 'IL',
			rating: 5,
		},
		{
			summary:
				'Scales beautifully from startup to enterprise. Future-proof solution.',
			details:
				'Scales beautifully from startup to enterprise. Future-proof solution. We started with 10 users and now have over 1000 without any performance issues. The pricing scales fairly and the features grow with our needs.',
			author: 'Jack Davis',
			role: 'VP Engineering',
			company: 'ScaleUp',
			avatar:
				'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=100&h=100&fit=crop',
			initials: 'JD',
			rating: 5,
		},
	];

	return (
		<section
			className="@container relative overflow-hidden"
			data-theme="testimonial"
		>
			<div className="mx-auto max-w-7xl px-4 @sm:px-6 @2xl:px-8 py-16 @md:py-20 @xl:py-24 @3xl:py-32">
				<SectionHeader
					badge="Toggle View"
					title="Summary or"
					highlight="Full Details"
				/>

				<div className="grid grid-cols-1 @md:grid-cols-2 @xl:grid-cols-3 gap-6">
					{testimonials.map((item, index) => (
						<ToggleCard key={index} item={item} />
					))}
				</div>
			</div>
		</section>
	);
}
