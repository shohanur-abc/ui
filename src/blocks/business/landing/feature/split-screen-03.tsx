import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { ArrowRight, Check, Sparkles } from 'lucide-react';
import Link from 'next/link';
import { ComponentType } from 'react';

interface FeatureColumn {
	title: string;
	items: string[];
}

export default function Main() {
	return (
		<section className="@container relative overflow-hidden" data-theme="neon">
			<div className="mx-auto max-w-7xl px-4 @sm:px-6 @2xl:px-8 py-16 @md:py-20 @xl:py-24 @3xl:py-32">
				<div className="grid gap-10 @xl:gap-16 @xl:grid-cols-2 items-center">
					<div>
						<Eyebrow icon={Sparkles} text="All-In-One Solution" />
						<Title
							text="Replace Multiple Tools with"
							highlight="One Platform"
						/>
						<Description text="Stop paying for separate tools. Get everything you need in a single, unified solution that your team will actually love using." />
						<CTAButtons
							primaryLabel="Start Free Trial"
							primaryHref="/signup"
							secondaryLabel="Compare Plans"
							secondaryHref="/pricing"
						/>
					</div>

					<FeatureColumns
						items={[
							{
								title: 'Core Features',
								items: [
									'Project management',
									'Team collaboration',
									'Time tracking',
									'Resource planning',
								],
							},
							{
								title: 'Advanced Tools',
								items: [
									'Custom workflows',
									'API integrations',
									'Reporting suite',
									'White labeling',
								],
							},
							{
								title: 'Enterprise',
								items: [
									'SSO / SAML',
									'Audit logging',
									'Custom SLA',
									'Dedicated support',
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
	<p className="mb-6 text-base @md:text-lg text-muted-foreground">{text}</p>
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

const FeatureColumns = ({ items }: { items: FeatureColumn[] }) => (
	<div className="grid gap-4 @sm:grid-cols-3">
		{items.map((column) => (
			<Card
				key={column.title}
				className="border-border/50 bg-card/50 backdrop-blur-sm"
			>
				<CardContent className="p-5">
					<h3 className="mb-4 text-sm font-semibold text-primary">
						{column.title}
					</h3>
					<ul className="space-y-2.5">
						{column.items.map((item) => (
							<li key={item} className="flex items-center gap-2 text-sm">
								<Check className="size-4 text-primary shrink-0" />
								{item}
							</li>
						))}
					</ul>
				</CardContent>
			</Card>
		))}
	</div>
);
