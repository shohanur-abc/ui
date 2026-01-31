import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { ArrowRight, Sparkles, Star } from 'lucide-react';
import Link from 'next/link';
import { ComponentType } from 'react';

interface HighlightStat {
	value: string;
	label: string;
}

export default function Main() {
	return (
		<section
			className="@container relative overflow-hidden"
			data-theme="corporate"
		>
			<div className="mx-auto max-w-7xl px-4 @sm:px-6 @2xl:px-8 py-16 @md:py-20 @xl:py-24 @3xl:py-32">
				<div className="max-w-4xl mx-auto text-center">
					<Eyebrow icon={Star} text="Trusted by 10,000+ Teams" />
					<Title text="The Platform That" highlight="Powers Growth" />
					<Description text="Join industry leaders who trust our platform to drive their business forward. From startups to Fortune 500, we scale with you." />

					<HighlightStats
						items={[
							{ value: '99.99%', label: 'Uptime' },
							{ value: '50M+', label: 'Users Served' },
							{ value: '<50ms', label: 'Response Time' },
							{ value: '24/7', label: 'Support' },
						]}
					/>

					<CTA
						primaryLabel="Get Started Free"
						primaryHref="/signup"
						secondaryLabel="Book a Demo"
						secondaryHref="/demo"
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
	<div className="mb-5 @md:mb-6">
		<Badge variant="outline" className="gap-2 px-4 py-1.5">
			<Icon className="size-3.5" />
			{text}
		</Badge>
	</div>
);

const Title = ({ text, highlight }: { text: string; highlight: string }) => (
	<h2 className="mb-5 @md:mb-6 text-3xl @sm:text-4xl @md:text-5xl @xl:text-6xl font-bold tracking-tight">
		{text} <span className="text-primary">{highlight}</span>
	</h2>
);

const Description = ({ text }: { text: string }) => (
	<p className="mb-8 @md:mb-10 text-base @md:text-lg @xl:text-xl text-muted-foreground leading-relaxed max-w-2xl mx-auto">
		{text}
	</p>
);

const HighlightStats = ({ items }: { items: HighlightStat[] }) => (
	<div className="mb-8 @md:mb-10 grid grid-cols-2 @md:grid-cols-4 gap-6 @md:gap-8">
		{items.map((stat) => (
			<div key={stat.label}>
				<p className="text-2xl @md:text-3xl font-bold text-primary">
					{stat.value}
				</p>
				<p className="text-sm text-muted-foreground">{stat.label}</p>
			</div>
		))}
	</div>
);

const CTA = ({
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
	<div className="flex flex-wrap justify-center gap-3 @md:gap-4">
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
