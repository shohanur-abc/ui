import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import Image from 'next/image';
import Link from 'next/link';
import { ArrowRight, CircleDollarSign, Clock, Users } from 'lucide-react';

export default function Main() {
	return (
		<section className="@container" data-theme="services">
			<div className="mx-auto max-w-7xl px-4 @sm:px-6 @md:px-8 @xl:px-12 py-12 @md:py-16 @xl:py-20 @3xl:py-24">
				<div className="grid @xl:grid-cols-2 gap-8 @xl:gap-16 items-center">
					<div className="relative">
						<div className="relative aspect-4/3 rounded-2xl overflow-hidden">
							<Image
								src="https://picsum.photos/seed/devops/800/600"
								alt="DevOps illustration"
								fill
								className="object-cover"
							/>
						</div>
						<MetricsFloater
							items={[
								{ icon: Clock, value: '70%', label: 'Faster Releases' },
								{ icon: Users, value: '50%', label: 'More Productivity' },
								{ icon: CircleDollarSign, value: '40%', label: 'Cost Savings' },
							]}
						/>
					</div>

					<div>
						<Eyebrow text="DevOps" />
						<Title text="Continuous Delivery Excellence" />
						<Description text="Accelerate your development lifecycle with modern DevOps practices. We help you build, test, and deploy faster with automated pipelines and infrastructure as code." />

						<div className="mt-8 space-y-4">
							<PracticeItem
								title="CI/CD Pipelines"
								description="Automated build, test, and deployment workflows"
							/>
							<PracticeItem
								title="Infrastructure as Code"
								description="Reproducible infrastructure with Terraform and Pulumi"
							/>
							<PracticeItem
								title="Container Orchestration"
								description="Kubernetes management and service mesh"
							/>
							<PracticeItem
								title="Observability"
								description="Logging, monitoring, and distributed tracing"
							/>
						</div>

						<Button className="mt-8" asChild>
							<Link href="/contact">
								Transform Your Pipeline
								<ArrowRight className="size-4" />
							</Link>
						</Button>
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

interface MetricItem {
	icon: React.ComponentType<{ className?: string }>;
	value: string;
	label: string;
}

const MetricsFloater = ({ items }: { items: MetricItem[] }) => (
	<div className="absolute -bottom-4 -right-4 @xl:-right-8 bg-background border rounded-xl p-4 shadow-lg">
		<div className="flex gap-6">
			{items.map(({ icon: Icon, value, label }, i) => (
				<div key={i} className="text-center">
					<div className="size-10 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-2">
						<Icon className="size-5 text-primary" />
					</div>
					<p className="text-lg font-bold">{value}</p>
					<p className="text-xs text-muted-foreground">{label}</p>
				</div>
			))}
		</div>
	</div>
);

const PracticeItem = ({
	title,
	description,
}: {
	title: string;
	description: string;
}) => (
	<div className="flex gap-4 items-start">
		<div className="size-2 rounded-full bg-primary mt-2 shrink-0" />
		<div>
			<h3 className="font-semibold">{title}</h3>
			<p className="text-sm text-muted-foreground">{description}</p>
		</div>
	</div>
);
