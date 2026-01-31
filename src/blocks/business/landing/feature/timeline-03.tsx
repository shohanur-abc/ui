import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import {
	ArrowRight,
	Calendar,
	Check,
	Flag,
	Rocket,
	Target,
} from 'lucide-react';
import Link from 'next/link';
import { ComponentType } from 'react';

interface RoadmapItem {
	icon: ComponentType<{ className?: string }>;
	quarter: string;
	title: string;
	items: string[];
	status: 'completed' | 'in-progress' | 'upcoming';
}

export default function Main() {
	return (
		<section className="@container relative overflow-hidden" data-theme="neon">
			<div className="mx-auto max-w-7xl px-4 @sm:px-6 @2xl:px-8 py-16 @md:py-20 @xl:py-24 @3xl:py-32">
				<div className="mb-10 @md:mb-12 @xl:mb-16 text-center max-w-3xl mx-auto">
					<Eyebrow icon={Calendar} text="Product Roadmap" />
					<Title text="What's Coming" highlight="Next" />
					<Description text="Stay ahead with a glimpse of our upcoming features and improvements." />
				</div>

				<RoadmapTimeline
					items={[
						{
							icon: Check,
							quarter: 'Q1 2026',
							title: 'Foundation',
							items: ['Core platform launch', 'API v2', '50+ integrations'],
							status: 'completed',
						},
						{
							icon: Target,
							quarter: 'Q2 2026',
							title: 'Growth',
							items: ['AI assistant', 'Mobile apps', 'Advanced analytics'],
							status: 'in-progress',
						},
						{
							icon: Rocket,
							quarter: 'Q3 2026',
							title: 'Scale',
							items: ['Enterprise SSO', 'Custom workflows', 'White labeling'],
							status: 'upcoming',
						},
						{
							icon: Flag,
							quarter: 'Q4 2026',
							title: 'Expansion',
							items: ['Marketplace', 'New regions', 'Partner program'],
							status: 'upcoming',
						},
					]}
				/>

				<CTASection label="Request a Feature" href="/feedback" />
			</div>
		</section>
	);
}

const Eyebrow = ({
	icon: Icon,
	text,
}: {
	icon: ComponentType<{ className?: string }>;
	text: string;
}) => (
	<div className="mb-4">
		<Badge variant="secondary" className="gap-2 px-3 py-1">
			<Icon className="size-3.5" />
			{text}
		</Badge>
	</div>
);

const Title = ({ text, highlight }: { text: string; highlight: string }) => (
	<h2 className="mb-4 text-3xl @sm:text-4xl @xl:text-5xl font-bold tracking-tight">
		{text} <span className="text-primary">{highlight}</span>
	</h2>
);

const Description = ({ text }: { text: string }) => (
	<p className="text-base @md:text-lg text-muted-foreground">{text}</p>
);

const RoadmapTimeline = ({ items }: { items: RoadmapItem[] }) => {
	const statusColors = {
		completed: 'bg-emerald-500',
		'in-progress': 'bg-primary',
		upcoming: 'bg-muted-foreground/30',
	};

	const statusLabels = {
		completed: 'Completed',
		'in-progress': 'In Progress',
		upcoming: 'Upcoming',
	};

	return (
		<div className="relative">
			{/* Connecting line */}
			<div className="hidden @lg:block absolute top-1/2 left-0 right-0 h-0.5 bg-border -translate-y-1/2" />

			<div className="grid gap-6 @lg:grid-cols-4">
				{items.map((item) => (
					<Card
						key={item.quarter}
						className={`relative border-border/50 bg-card/50 backdrop-blur-sm transition-all hover:border-primary/30 ${item.status === 'in-progress' ? 'ring-2 ring-primary/30' : ''}`}
					>
						<CardContent className="p-5 @md:p-6">
							<div
								className={`absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 size-4 rounded-full ${statusColors[item.status]} ring-4 ring-background`}
							/>
							<Badge variant="outline" className="mb-3">
								{item.quarter}
							</Badge>
							<div className="flex items-center gap-2 mb-3">
								<item.icon className="size-5 text-primary" />
								<h3 className="font-semibold">{item.title}</h3>
							</div>
							<ul className="space-y-1.5 mb-4">
								{item.items.map((feature) => (
									<li key={feature} className="text-sm text-muted-foreground">
										• {feature}
									</li>
								))}
							</ul>
							<Badge variant="secondary" className="text-xs">
								{statusLabels[item.status]}
							</Badge>
						</CardContent>
					</Card>
				))}
			</div>
		</div>
	);
};

const CTASection = ({ label, href }: { label: string; href: string }) => (
	<div className="mt-10 @md:mt-12 text-center">
		<Button size="lg" variant="outline" className="gap-2" asChild>
			<Link href={href}>
				{label}
				<ArrowRight className="size-4" />
			</Link>
		</Button>
	</div>
);
