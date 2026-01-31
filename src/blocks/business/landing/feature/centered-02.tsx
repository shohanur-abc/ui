import { Badge } from '@/components/ui/badge';
import { Card, CardContent } from '@/components/ui/card';
import { Clock, Gauge, Headphones, Shield, Sparkles, Zap } from 'lucide-react';
import { ComponentType } from 'react';

interface FeatureItem {
	icon: ComponentType<{ className?: string }>;
	title: string;
	description: string;
}

export default function Main() {
	return (
		<section
			className="@container relative overflow-hidden"
			data-theme="corporate"
		>
			<div className="mx-auto max-w-7xl px-4 @sm:px-6 @2xl:px-8 py-16 @md:py-20 @xl:py-24 @3xl:py-32">
				<div className="max-w-3xl mx-auto text-center mb-10 @md:mb-12 @xl:mb-16">
					<Eyebrow icon={Sparkles} text="Why Choose Us" />
					<Title text="Built for Performance," highlight="Designed for Scale" />
					<Description text="Experience the difference with features that actually matter for your business growth and operational efficiency." />
				</div>

				<FeatureCards
					items={[
						{
							icon: Zap,
							title: 'Lightning Fast',
							description:
								'Optimized performance with sub-100ms response times globally.',
						},
						{
							icon: Shield,
							title: 'Bank-Level Security',
							description:
								'SOC 2 Type II certified with end-to-end encryption.',
						},
						{
							icon: Gauge,
							title: 'Real-time Updates',
							description:
								'Live synchronization across all devices and team members.',
						},
						{
							icon: Clock,
							title: '24/7 Availability',
							description: 'Multi-region infrastructure ensures zero downtime.',
						},
						{
							icon: Headphones,
							title: 'Expert Support',
							description: 'Dedicated success team available around the clock.',
						},
						{
							icon: Sparkles,
							title: 'AI-Powered',
							description:
								'Smart automation that learns and improves over time.',
						},
					]}
				/>
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
	<div className="mb-4 @md:mb-5">
		<Badge variant="outline" className="gap-2">
			<Icon className="size-3.5" />
			{text}
		</Badge>
	</div>
);

const Title = ({ text, highlight }: { text: string; highlight: string }) => (
	<h2 className="mb-4 @md:mb-5 text-3xl @sm:text-4xl @xl:text-5xl font-bold tracking-tight">
		{text} <span className="text-primary">{highlight}</span>
	</h2>
);

const Description = ({ text }: { text: string }) => (
	<p className="text-base @md:text-lg text-muted-foreground leading-relaxed">
		{text}
	</p>
);

const FeatureCards = ({ items }: { items: FeatureItem[] }) => (
	<div className="grid gap-4 @md:gap-6 @sm:grid-cols-2 @xl:grid-cols-3">
		{items.map((item) => (
			<Card
				key={item.title}
				className="group text-center border-border/50 transition-all hover:border-primary/30 hover:shadow-lg"
			>
				<CardContent className="p-6 @md:p-8">
					<div className="mb-4 mx-auto flex size-14 items-center justify-center rounded-2xl bg-primary/10 transition-all group-hover:bg-primary/15 group-hover:scale-105">
						<item.icon className="size-7 text-primary" />
					</div>
					<h3 className="mb-2 text-lg font-semibold">{item.title}</h3>
					<p className="text-sm text-muted-foreground leading-relaxed">
						{item.description}
					</p>
				</CardContent>
			</Card>
		))}
	</div>
);
