import { Badge } from '@/components/ui/badge';
import { Card, CardContent } from '@/components/ui/card';
import {
	Check,
	Cloud,
	Code2,
	Database,
	Lock,
	Palette,
	Workflow,
} from 'lucide-react';
import { ComponentType } from 'react';

export default function Main() {
	return (
		<section className="@container" data-theme="services">
			<div className="mx-auto max-w-7xl px-4 @sm:px-6 @md:px-8 @xl:px-12 py-12 @md:py-16 @xl:py-20 @3xl:py-24">
				<div className="text-center max-w-3xl mx-auto mb-10 @md:mb-14">
					<Eyebrow text="Core Services" />
					<Title text="What We Deliver" />
					<Description text="Proven solutions backed by industry expertise and measurable results." />
				</div>

				<BentoGrid
					items={[
						{
							icon: Code2,
							title: 'Application Development',
							description:
								'Custom software built with clean architecture and modern best practices.',
							features: [
								'Web & Mobile Apps',
								'API Development',
								'Microservices',
							],
							featured: true,
						},
						{
							icon: Palette,
							title: 'Product Design',
							description: 'User-centered design that converts.',
							features: ['UX Research', 'UI Design', 'Prototyping'],
							featured: false,
						},
						{
							icon: Cloud,
							title: 'Cloud Solutions',
							description: 'Scalable infrastructure for growth.',
							features: ['AWS/GCP/Azure', 'Kubernetes', 'Serverless'],
							featured: false,
						},
						{
							icon: Database,
							title: 'Data Engineering',
							description: 'Turn data into competitive advantage.',
							features: ['Data Pipelines', 'Analytics', 'ML/AI'],
							featured: false,
						},
						{
							icon: Lock,
							title: 'Security',
							description: 'Enterprise-grade protection.',
							features: ['Audits', 'Compliance', 'Monitoring'],
							featured: false,
						},
						{
							icon: Workflow,
							title: 'Digital Transformation',
							description:
								'End-to-end modernization of legacy systems and business processes.',
							features: [
								'Legacy Modernization',
								'Process Automation',
								'Change Management',
							],
							featured: true,
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
	features: string[];
	featured: boolean;
}

const BentoGrid = ({ items }: { items: BentoItem[] }) => (
	<div className="grid @md:grid-cols-2 @xl:grid-cols-3 gap-4 @md:gap-5">
		{items.map(({ icon: Icon, title, description, features, featured }, i) => (
			<Card
				key={i}
				className={`group py-0 transition-all duration-300 hover:-translate-y-1 ${
					featured
						? '@md:col-span-2 @xl:col-span-1 border-primary/30 hover:shadow-xl hover:shadow-primary/10'
						: 'hover:shadow-lg hover:shadow-primary/5'
				}`}
			>
				<CardContent className="p-6 @md:p-7 h-full flex flex-col">
					<div className="size-12 @md:size-14 rounded-xl bg-primary/10 flex items-center justify-center mb-4 group-hover:bg-primary group-hover:text-primary-foreground transition-all duration-300">
						<Icon className="size-6 @md:size-7" />
					</div>
					<h3 className="text-lg @md:text-xl font-semibold mb-2">{title}</h3>
					<p className="text-sm @md:text-base text-muted-foreground leading-relaxed mb-4 flex-1">
						{description}
					</p>
					<ul className="space-y-2">
						{features.map((feature, j) => (
							<li key={j} className="flex items-center gap-2 text-sm">
								<Check className="size-4 text-primary shrink-0" />
								<span>{feature}</span>
							</li>
						))}
					</ul>
				</CardContent>
			</Card>
		))}
	</div>
);
