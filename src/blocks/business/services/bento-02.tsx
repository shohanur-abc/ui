import { Badge } from '@/components/ui/badge';
import { Card, CardContent } from '@/components/ui/card';
import {
	BrainCircuit,
	Cpu,
	Globe,
	LineChart,
	Network,
	Server,
	Shield,
	Workflow,
} from 'lucide-react';
import { ComponentType } from 'react';

export default function Main() {
	return (
		<section className="@container" data-theme="services">
			<div className="mx-auto max-w-7xl px-4 @sm:px-6 @md:px-8 @xl:px-12 py-12 @md:py-16 @xl:py-20 @3xl:py-24">
				<div className="text-center max-w-3xl mx-auto mb-10 @md:mb-14">
					<Eyebrow text="Platform Services" />
					<Title text="Enterprise-Grade Solutions" />
					<Description text="Robust, scalable services designed for organizations that demand the highest standards." />
				</div>

				<BentoGrid
					items={[
						{
							icon: Server,
							title: 'Cloud Infrastructure',
							description:
								'Multi-cloud and hybrid infrastructure solutions with 99.99% uptime SLA.',
							size: 'wide',
						},
						{
							icon: Shield,
							title: 'Zero-Trust Security',
							description: 'Comprehensive security architecture.',
							size: 'normal',
						},
						{
							icon: Network,
							title: 'API Gateway',
							description: 'Unified API management platform.',
							size: 'normal',
						},
						{
							icon: BrainCircuit,
							title: 'AI/ML Platform',
							description: 'End-to-end ML lifecycle management.',
							size: 'normal',
						},
						{
							icon: Workflow,
							title: 'Orchestration',
							description: 'Workflow automation at scale.',
							size: 'normal',
						},
						{
							icon: Globe,
							title: 'Global CDN',
							description:
								'Content delivery across 200+ edge locations worldwide.',
							size: 'wide',
						},
						{
							icon: LineChart,
							title: 'Observability',
							description: 'Full-stack monitoring and alerting.',
							size: 'normal',
						},
						{
							icon: Cpu,
							title: 'Edge Computing',
							description: 'Low-latency compute at the edge.',
							size: 'normal',
						},
					]}
				/>
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
	<h2 className="text-3xl @sm:text-4xl @md:text-5xl font-bold tracking-tight mb-4 @md:mb-6">
		{text}
	</h2>
);

const Description = ({ text }: { text: string }) => (
	<p className="text-base @md:text-lg text-muted-foreground leading-relaxed">
		{text}
	</p>
);

interface BentoItem {
	icon: ComponentType<{ className?: string }>;
	title: string;
	description: string;
	size: 'normal' | 'wide';
}

const BentoGrid = ({ items }: { items: BentoItem[] }) => (
	<div className="grid @sm:grid-cols-2 @xl:grid-cols-4 gap-4 @md:gap-5">
		{items.map(({ icon: Icon, title, description, size }, i) => (
			<Card
				key={i}
				className={`group py-0 hover:shadow-lg hover:shadow-primary/5 transition-all duration-300 hover:-translate-y-0.5 ${
					size === 'wide' ? '@sm:col-span-2' : ''
				}`}
			>
				<CardContent className="p-5 @md:p-6 h-full">
					<div className="flex items-start gap-4">
						<div className="size-11 @md:size-12 rounded-xl bg-primary/10 flex items-center justify-center shrink-0 group-hover:bg-primary group-hover:text-primary-foreground transition-all duration-300">
							<Icon className="size-5 @md:size-6" />
						</div>
						<div>
							<h3 className="text-base @md:text-lg font-semibold mb-1">
								{title}
							</h3>
							<p className="text-sm text-muted-foreground leading-relaxed">
								{description}
							</p>
						</div>
					</div>
				</CardContent>
			</Card>
		))}
	</div>
);
