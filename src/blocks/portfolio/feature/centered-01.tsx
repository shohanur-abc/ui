import { Badge } from '@/components/ui/badge';
import { Card, CardContent } from '@/components/ui/card';
import { Cpu, Database, Globe, Layout, Server, Shield } from 'lucide-react';
import { ComponentType } from 'react';

export default function Main() {
	return (
		<section className="@container">
			<div className="mx-auto max-w-7xl px-4 @sm:px-6 @md:px-8 @xl:px-12 py-12 @md:py-16 @xl:py-20 @3xl:py-24">
				<div className="text-center max-w-3xl mx-auto mb-10 @md:mb-14 @xl:mb-16">
					<Eyebrow text="Technical Skills" />
					<Title text="Full-Stack Capabilities" />
					<Description text="Proficient across the entire development stack, from crafting beautiful interfaces to building robust backend systems." />
				</div>

				<FeatureGrid
					items={[
						{
							icon: Layout,
							title: 'Frontend Development',
							description:
								'React, Next.js, Vue, and modern CSS frameworks for responsive, accessible UIs.',
						},
						{
							icon: Server,
							title: 'Backend Systems',
							description:
								'Node.js, Python, and Go for scalable APIs and microservices architecture.',
						},
						{
							icon: Database,
							title: 'Database Design',
							description:
								'PostgreSQL, MongoDB, and Redis for efficient data storage and retrieval.',
						},
						{
							icon: Globe,
							title: 'Cloud Infrastructure',
							description:
								'AWS, GCP, and Vercel for reliable, globally distributed deployments.',
						},
						{
							icon: Shield,
							title: 'Security',
							description:
								'Authentication, authorization, and data protection best practices.',
						},
						{
							icon: Cpu,
							title: 'DevOps',
							description:
								'CI/CD pipelines, Docker, and Kubernetes for automated workflows.',
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

interface FeatureItem {
	icon: ComponentType<{ className?: string }>;
	title: string;
	description: string;
}

const FeatureGrid = ({ items }: { items: FeatureItem[] }) => (
	<ul className="grid @sm:grid-cols-2 @xl:grid-cols-3 gap-4 @md:gap-6">
		{items.map(({ icon: Icon, title, description }, i) => (
			<li key={i}>
				<Card className="h-full text-center group hover:shadow-md transition-all py-0">
					<CardContent className="p-6 @md:p-8">
						<div className="size-14 @md:size-16 rounded-2xl bg-primary/10 flex items-center justify-center mx-auto mb-4 @md:mb-5 group-hover:bg-primary group-hover:text-primary-foreground transition-all">
							<Icon className="size-7 @md:size-8" />
						</div>
						<h3 className="text-lg @md:text-xl font-semibold mb-2 @md:mb-3">
							{title}
						</h3>
						<p className="text-sm @md:text-base text-muted-foreground leading-relaxed">
							{description}
						</p>
					</CardContent>
				</Card>
			</li>
		))}
	</ul>
);
