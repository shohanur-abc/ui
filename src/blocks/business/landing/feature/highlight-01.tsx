import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { ArrowRight, CheckCircle2, Sparkles } from 'lucide-react';
import Link from 'next/link';
import { ComponentType } from 'react';

interface HighlightItem {
	text: string;
}

export default function Main() {
	return (
		<section className="@container relative overflow-hidden" data-theme="neon">
			<div className="mx-auto max-w-7xl px-4 @sm:px-6 @2xl:px-8 py-16 @md:py-20 @xl:py-24 @3xl:py-32">
				<div className="grid gap-10 @xl:gap-16 @xl:grid-cols-2 items-center">
					<FeatureImage
						src="https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=800&q=80"
						alt="Platform dashboard showing key features"
					/>
					<div>
						<Eyebrow icon={Sparkles} text="Highlighted Feature" />
						<Title text="Smart Analytics That" highlight="Drive Results" />
						<Description text="Our AI-powered analytics engine processes millions of data points to surface the insights that matter most to your business." />
						<Highlights
							items={[
								{ text: 'Predictive analytics with 95% accuracy' },
								{ text: 'Real-time anomaly detection' },
								{ text: 'Custom KPI tracking and alerts' },
								{ text: 'Automated report generation' },
								{ text: 'Natural language query support' },
							]}
						/>
						<CTAButtons
							primaryLabel="Explore Analytics"
							primaryHref="/analytics"
							secondaryLabel="View Demo"
							secondaryHref="/demo"
						/>
					</div>
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
		<Badge variant="secondary" className="gap-2 px-3 py-1">
			<Icon className="size-3.5" />
			{text}
		</Badge>
	</div>
);

const Title = ({ text, highlight }: { text: string; highlight: string }) => (
	<h2 className="mb-4 text-3xl @sm:text-4xl @xl:text-5xl font-bold tracking-tight leading-tight">
		{text} <span className="text-primary">{highlight}</span>
	</h2>
);

const Description = ({ text }: { text: string }) => (
	<p className="mb-6 text-base @md:text-lg text-muted-foreground leading-relaxed">
		{text}
	</p>
);

const Highlights = ({ items }: { items: HighlightItem[] }) => (
	<ul className="mb-6 @md:mb-8 space-y-3">
		{items.map((item, index) => (
			<li key={index} className="flex items-start gap-3">
				<CheckCircle2 className="size-5 text-primary shrink-0 mt-0.5" />
				<span className="text-sm @md:text-base">{item.text}</span>
			</li>
		))}
	</ul>
);

const CTAButtons = ({
	primaryLabel,
	primaryHref,
	secondaryLabel,
	secondaryHref,
}: {
	primaryLabel: string;
	primaryHref: string;
	secondaryLabel: string;
	secondaryHref: string;
}) => (
	<div className="flex flex-wrap gap-3">
		<Button size="lg" className="gap-2" asChild>
			<Link href={primaryHref}>
				{primaryLabel}
				<ArrowRight className="size-4" />
			</Link>
		</Button>
		<Button size="lg" variant="outline" asChild>
			<Link href={secondaryHref}>{secondaryLabel}</Link>
		</Button>
	</div>
);

const FeatureImage = ({ src, alt }: { src: string; alt: string }) => (
	<div className="relative">
		<div className="absolute inset-0 bg-gradient-to-br from-primary/30 via-transparent to-accent/30 rounded-2xl blur-3xl opacity-40" />
		<div className="relative overflow-hidden rounded-2xl border border-border/50 shadow-2xl">
			<img src={src} alt={alt} className="w-full aspect-[4/3] object-cover" />
		</div>
	</div>
);
