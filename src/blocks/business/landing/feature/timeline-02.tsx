import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import {
	ArrowRight,
	Box,
	CheckCircle,
	Code2,
	Database,
	Globe,
	Layers,
	Shield,
	Zap,
} from 'lucide-react';
import Link from 'next/link';
import { ComponentType } from 'react';

interface TimelineItem {
	icon: ComponentType<{ className?: string }>;
	phase: string;
	title: string;
	description: string;
	features: string[];
}

export default function Main() {
	return (
		<section
			className="@container relative overflow-hidden"
			data-theme="corporate"
		>
			<div className="mx-auto max-w-7xl px-4 @sm:px-6 @2xl:px-8 py-16 @md:py-20 @xl:py-24 @3xl:py-32">
				<div className="grid gap-10 @xl:gap-16 @xl:grid-cols-[1fr_2fr] items-start">
					<div className="@xl:sticky @xl:top-24">
						<Eyebrow icon={Layers} text="Implementation Roadmap" />
						<Title text="Your Path to" highlight="Digital Transformation" />
						<Description text="A proven methodology that has helped 500+ companies successfully modernize their infrastructure." />
						<CTAButton label="Start Your Journey" href="/contact" />
					</div>

					<Timeline
						items={[
							{
								icon: Database,
								phase: 'Phase 1',
								title: 'Discovery & Assessment',
								description:
									'We analyze your current infrastructure and identify optimization opportunities.',
								features: [
									'Infrastructure audit',
									'Performance baseline',
									'Cost analysis',
								],
							},
							{
								icon: Code2,
								phase: 'Phase 2',
								title: 'Architecture Design',
								description:
									'Design a scalable, future-proof architecture tailored to your needs.',
								features: [
									'System design',
									'Technology selection',
									'Security planning',
								],
							},
							{
								icon: Box,
								phase: 'Phase 3',
								title: 'Migration & Implementation',
								description:
									'Execute the migration with zero downtime and continuous testing.',
								features: [
									'Staged rollout',
									'Data migration',
									'Integration testing',
								],
							},
							{
								icon: Zap,
								phase: 'Phase 4',
								title: 'Optimization & Scale',
								description:
									'Fine-tune performance and establish monitoring for continuous improvement.',
								features: [
									'Performance tuning',
									'24/7 monitoring',
									'Auto-scaling',
								],
							},
						]}
					/>
				</div>
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
		<Badge variant="outline" className="gap-2">
			<Icon className="size-3.5" />
			{text}
		</Badge>
	</div>
);

const Title = ({ text, highlight }: { text: string; highlight: string }) => (
	<h2 className="mb-4 text-3xl @sm:text-4xl font-bold tracking-tight">
		{text} <span className="text-primary">{highlight}</span>
	</h2>
);

const Description = ({ text }: { text: string }) => (
	<p className="mb-6 text-base @md:text-lg text-muted-foreground">{text}</p>
);

const CTAButton = ({ label, href }: { label: string; href: string }) => (
	<Button size="lg" className="gap-2" asChild>
		<Link href={href}>
			{label}
			<ArrowRight className="size-4" />
		</Link>
	</Button>
);

const Timeline = ({ items }: { items: TimelineItem[] }) => (
	<div className="relative">
		{/* Timeline line */}
		<div className="absolute left-4 @md:left-5 top-0 bottom-0 w-0.5 bg-border" />

		<div className="space-y-8 @md:space-y-10">
			{items.map((item, index) => (
				<div key={item.phase} className="relative pl-12 @md:pl-14">
					{/* Timeline dot */}
					<div className="absolute left-0 flex size-8 @md:size-10 items-center justify-center rounded-full bg-primary">
						<item.icon className="size-4 @md:size-5 text-primary-foreground" />
					</div>

					<div className="rounded-xl border border-border/50 bg-card p-5 @md:p-6 transition-all hover:border-primary/30 hover:shadow-md">
						<Badge variant="secondary" className="mb-3">
							{item.phase}
						</Badge>
						<h3 className="mb-2 text-lg @md:text-xl font-semibold">
							{item.title}
						</h3>
						<p className="mb-4 text-sm @md:text-base text-muted-foreground">
							{item.description}
						</p>
						<ul className="space-y-2">
							{item.features.map((feature) => (
								<li key={feature} className="flex items-center gap-2 text-sm">
									<CheckCircle className="size-4 text-primary" />
									{feature}
								</li>
							))}
						</ul>
					</div>
				</div>
			))}
		</div>
	</div>
);
