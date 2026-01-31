import { Badge } from '@/components/ui/badge';
import { Card, CardContent } from '@/components/ui/card';
import { Cpu, Database, Globe, Lock, Shield, Workflow } from 'lucide-react';
import { ComponentType } from 'react';

export default function Main() {
	return (
		<section className="@container">
			<div className="mx-auto max-w-7xl px-4 @sm:px-6 @md:px-8 @xl:px-12 py-12 @md:py-16 @xl:py-20 @3xl:py-24">
				<div className="grid @3xl:grid-cols-3 gap-4 @md:gap-6">
					<div className="@3xl:col-span-1 flex flex-col justify-center">
						<Eyebrow text="Technical Stack" />
						<Title text="Modern Technologies" />
						<Description text="Leveraging cutting-edge tools and frameworks to build robust, scalable solutions." />
					</div>

					<BentoGrid
						items={[
							{
								icon: Globe,
								title: 'Cloud Native',
								description:
									'Built for scale with modern cloud infrastructure.',
								accent: true,
							},
							{
								icon: Database,
								title: 'Data Layer',
								description: 'Optimized storage solutions.',
							},
							{
								icon: Shield,
								title: 'Security First',
								description: 'Enterprise-grade protection.',
							},
							{
								icon: Cpu,
								title: 'Edge Computing',
								description: 'Low latency worldwide.',
							},
							{
								icon: Lock,
								title: 'Auth Systems',
								description: 'Secure identity management.',
							},
							{
								icon: Workflow,
								title: 'CI/CD Pipelines',
								description: 'Automated deployments.',
								accent: true,
							},
						]}
					/>
				</div>
			</div>
		</section>
	);
}

const Eyebrow = ({ text }: { text: string }) => (
	<Badge variant="outline" className="mb-3 @md:mb-4 w-fit">
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

interface BentoItem {
	icon: ComponentType<{ className?: string }>;
	title: string;
	description: string;
	accent?: boolean;
}

const BentoGrid = ({ items }: { items: BentoItem[] }) => (
	<div className="@3xl:col-span-2 grid @sm:grid-cols-2 @xl:grid-cols-3 gap-4 @md:gap-5">
		{items.map(({ icon: Icon, title, description, accent }, i) => (
			<Card
				key={i}
				className={`group py-0 transition-all hover:shadow-lg hover:-translate-y-1 ${accent ? 'bg-primary text-primary-foreground' : ''}`}
			>
				<CardContent className="p-5 @md:p-6">
					<div
						className={`size-10 @md:size-11 rounded-lg flex items-center justify-center mb-3 transition-colors ${accent ? 'bg-primary-foreground/20' : 'bg-primary/10 group-hover:bg-primary group-hover:text-primary-foreground'}`}
					>
						<Icon className="size-5" />
					</div>
					<h3 className="font-semibold mb-1">{title}</h3>
					<p
						className={`text-sm leading-relaxed ${accent ? 'text-primary-foreground/80' : 'text-muted-foreground'}`}
					>
						{description}
					</p>
				</CardContent>
			</Card>
		))}
	</div>
);
