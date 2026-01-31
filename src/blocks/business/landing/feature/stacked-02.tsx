import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import {
	ArrowRight,
	BarChart2,
	Brain,
	Cloud,
	Code,
	Database,
	Lock,
	Server,
	Workflow,
} from 'lucide-react';
import Link from 'next/link';
import { ComponentType } from 'react';

interface StackItem {
	icon: ComponentType<{ className?: string }>;
	title: string;
	items: string[];
}

export default function Main() {
	return (
		<section
			className="@container relative overflow-hidden"
			data-theme="corporate"
		>
			<div className="mx-auto max-w-7xl px-4 @sm:px-6 @2xl:px-8 py-16 @md:py-20 @xl:py-24 @3xl:py-32">
				<div className="grid gap-10 @xl:gap-16 @xl:grid-cols-2 items-center">
					<div>
						<Eyebrow icon={Server} text="Technology Stack" />
						<Title text="Powered by Modern" highlight="Technologies" />
						<Description text="We leverage cutting-edge technologies to deliver exceptional performance, security, and developer experience." />
						<CTAButton label="View Full Stack" href="/technology" />
					</div>

					<TechStack
						items={[
							{
								icon: Cloud,
								title: 'Cloud Infrastructure',
								items: ['AWS', 'Google Cloud', 'Azure', 'Cloudflare'],
							},
							{
								icon: Database,
								title: 'Data & Storage',
								items: ['PostgreSQL', 'Redis', 'Elasticsearch', 'S3'],
							},
							{
								icon: Code,
								title: 'Backend',
								items: ['Node.js', 'Go', 'Python', 'GraphQL'],
							},
							{
								icon: Brain,
								title: 'AI & ML',
								items: ['TensorFlow', 'PyTorch', 'OpenAI', 'LangChain'],
							},
							{
								icon: Lock,
								title: 'Security',
								items: ['OAuth 2.0', 'JWT', 'Vault', 'WAF'],
							},
							{
								icon: BarChart2,
								title: 'Observability',
								items: ['Datadog', 'Grafana', 'Sentry', 'PagerDuty'],
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
		<Badge variant="outline" className="gap-2">
			<Icon className="size-3.5" />
			{text}
		</Badge>
	</div>
);

const Title = ({ text, highlight }: { text: string; highlight: string }) => (
	<h2 className="mb-4 text-3xl @sm:text-4xl @xl:text-5xl font-bold tracking-tight">
		{text} <span className="text-primary">{highlight}</span>
	</h2>
);

const Description = ({ text }: { text: string }) => (
	<p className="mb-6 text-base @md:text-lg text-muted-foreground">{text}</p>
);

const CTAButton = ({ label, href }: { label: string; href: string }) => (
	<Button size="lg" variant="outline" className="gap-2" asChild>
		<Link href={href}>
			{label}
			<ArrowRight className="size-4" />
		</Link>
	</Button>
);

const TechStack = ({ items }: { items: StackItem[] }) => (
	<div className="grid gap-4 @sm:grid-cols-2">
		{items.map((item) => (
			<Card
				key={item.title}
				className="border-border/50 transition-all hover:border-primary/30"
			>
				<CardContent className="p-4 @md:p-5">
					<div className="mb-3 flex items-center gap-2">
						<div className="flex size-8 items-center justify-center rounded-lg bg-primary/10">
							<item.icon className="size-4 text-primary" />
						</div>
						<h3 className="font-semibold">{item.title}</h3>
					</div>
					<div className="flex flex-wrap gap-2">
						{item.items.map((tech) => (
							<Badge key={tech} variant="secondary" className="text-xs">
								{tech}
							</Badge>
						))}
					</div>
				</CardContent>
			</Card>
		))}
	</div>
);
