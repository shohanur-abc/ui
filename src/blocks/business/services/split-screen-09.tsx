import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import Link from 'next/link';
import {
	ArrowRight,
	BrainCircuit,
	Cpu,
	LineChart,
	Sparkles,
} from 'lucide-react';

export default function Main() {
	return (
		<section className="@container" data-theme="services">
			<div className="mx-auto max-w-7xl px-4 @sm:px-6 @md:px-8 @xl:px-12 py-12 @md:py-16 @xl:py-20 @3xl:py-24">
				<div className="grid @xl:grid-cols-2 gap-8 @xl:gap-16 items-center">
					<div>
						<Eyebrow text="AI & Machine Learning" />
						<Title text="Intelligent Automation" />
						<Description text="Harness the power of AI to automate processes, gain insights, and create intelligent products. Our ML engineers build custom solutions tailored to your needs." />

						<div className="mt-8 p-6 bg-gradient-to-br from-primary/10 via-primary/5 to-transparent rounded-2xl border border-primary/20">
							<h3 className="font-semibold mb-4">What We Can Build</h3>
							<ul className="space-y-2">
								<li className="flex items-center gap-2 text-sm">
									<Sparkles className="size-4 text-primary" />
									Natural language processing
								</li>
								<li className="flex items-center gap-2 text-sm">
									<Sparkles className="size-4 text-primary" />
									Computer vision systems
								</li>
								<li className="flex items-center gap-2 text-sm">
									<Sparkles className="size-4 text-primary" />
									Recommendation engines
								</li>
								<li className="flex items-center gap-2 text-sm">
									<Sparkles className="size-4 text-primary" />
									Predictive models
								</li>
							</ul>
						</div>

						<Button className="mt-8" asChild>
							<Link href="/contact">
								Explore AI Solutions
								<ArrowRight className="size-4" />
							</Link>
						</Button>
					</div>

					<AICards
						items={[
							{
								icon: BrainCircuit,
								title: 'Custom AI Models',
								description:
									'Train and deploy models tailored to your specific business needs.',
								metric: '95%',
								metricLabel: 'Accuracy',
							},
							{
								icon: Cpu,
								title: 'MLOps Pipeline',
								description:
									'End-to-end ML infrastructure for training, testing, and deployment.',
								metric: '10x',
								metricLabel: 'Faster Deployment',
							},
							{
								icon: LineChart,
								title: 'AI Analytics',
								description:
									'Extract insights from unstructured data at scale.',
								metric: '50%',
								metricLabel: 'Cost Reduction',
							},
						]}
					/>
				</div>
			</div>
		</section>
	);
}

const Eyebrow = ({ text }: { text: string }) => (
	<Badge variant="outline" className="mb-3 @md:mb-4">
		{text}
	</Badge>
);

const Title = ({ text }: { text: string }) => (
	<h2 className="text-2xl @sm:text-3xl @md:text-4xl font-bold tracking-tight mb-4 @md:mb-6">
		{text}
	</h2>
);

const Description = ({ text }: { text: string }) => (
	<p className="text-base @md:text-lg text-muted-foreground leading-relaxed">
		{text}
	</p>
);

interface AICardItem {
	icon: React.ComponentType<{ className?: string }>;
	title: string;
	description: string;
	metric: string;
	metricLabel: string;
}

const AICards = ({ items }: { items: AICardItem[] }) => (
	<div className="space-y-4">
		{items.map(({ icon: Icon, title, description, metric, metricLabel }, i) => (
			<Card key={i} className="py-0">
				<CardContent className="p-5 @md:p-6 flex items-start gap-4">
					<div className="size-12 rounded-xl bg-primary/10 flex items-center justify-center shrink-0">
						<Icon className="size-6 text-primary" />
					</div>
					<div className="flex-1">
						<h3 className="font-semibold text-base @md:text-lg">{title}</h3>
						<p className="text-sm text-muted-foreground mt-1">{description}</p>
					</div>
					<div className="text-right shrink-0">
						<p className="text-xl font-bold text-primary">{metric}</p>
						<p className="text-xs text-muted-foreground">{metricLabel}</p>
					</div>
				</CardContent>
			</Card>
		))}
	</div>
);
