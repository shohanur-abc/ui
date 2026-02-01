import { Badge } from '@/components/ui/badge';
import { Card, CardContent } from '@/components/ui/card';
import {
	BrainCircuit,
	GanttChart,
	LineChart,
	Network,
	Server,
	Zap,
} from 'lucide-react';
import { ComponentType } from 'react';

export default function Main() {
	return (
		<section className="@container" data-theme="services">
			<div className="mx-auto max-w-7xl px-4 @sm:px-6 @md:px-8 @xl:px-12 py-12 @md:py-16 @xl:py-20 @3xl:py-24">
				<div className="grid @xl:grid-cols-3 gap-8 @xl:gap-12">
					<div className="@xl:col-span-1">
						<Eyebrow text="Capabilities" />
						<Title text="Technical Excellence" />
						<Description text="Our engineering team brings deep expertise across the modern technology stack to deliver robust, scalable solutions." />
					</div>

					<div className="@xl:col-span-2">
						<ServiceGrid
							items={[
								{
									icon: Server,
									title: 'Backend Systems',
									description:
										'High-performance APIs and microservices architecture.',
								},
								{
									icon: Network,
									title: 'Distributed Computing',
									description:
										'Fault-tolerant systems designed for global scale.',
								},
								{
									icon: BrainCircuit,
									title: 'ML Infrastructure',
									description:
										'End-to-end machine learning pipelines and deployment.',
								},
								{
									icon: GanttChart,
									title: 'DevOps & CI/CD',
									description: 'Automated workflows for continuous delivery.',
								},
								{
									icon: LineChart,
									title: 'Observability',
									description:
										'Comprehensive monitoring, logging, and alerting.',
								},
								{
									icon: Zap,
									title: 'Performance Tuning',
									description:
										'Optimization for speed, efficiency, and reliability.',
								},
							]}
						/>
					</div>
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

interface ServiceItem {
	icon: ComponentType<{ className?: string }>;
	title: string;
	description: string;
}

const ServiceGrid = ({ items }: { items: ServiceItem[] }) => (
	<div className="grid @sm:grid-cols-2 gap-4 @md:gap-5">
		{items.map(({ icon: Icon, title, description }, i) => (
			<Card
				key={i}
				className="group py-0 hover:shadow-md hover:shadow-primary/5 transition-all duration-300"
			>
				<CardContent className="p-5 @md:p-6 flex gap-4">
					<div className="size-11 @md:size-12 rounded-lg bg-primary/10 flex items-center justify-center shrink-0 group-hover:bg-primary group-hover:text-primary-foreground transition-all duration-300">
						<Icon className="size-5 @md:size-6" />
					</div>
					<div>
						<h3 className="font-semibold mb-1">{title}</h3>
						<p className="text-sm text-muted-foreground leading-relaxed">
							{description}
						</p>
					</div>
				</CardContent>
			</Card>
		))}
	</div>
);
