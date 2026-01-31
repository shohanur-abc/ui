import { Badge } from '@/components/ui/badge';
import { Card, CardContent } from '@/components/ui/card';
import { FileCode, Star, GitFork, ExternalLink } from 'lucide-react';
import Link from 'next/link';
import { ComponentType } from 'react';

export default function Main() {
	return (
		<section className="@container">
			<div className="mx-auto max-w-7xl px-4 @sm:px-6 @2xl:px-8 py-16 @md:py-20 @xl:py-24 @3xl:py-32">
				<div className="text-center max-w-2xl mx-auto mb-12 @md:mb-16">
					<Eyebrow icon={FileCode} text="Projects" />
					<Title text="Open Source Work" />
					<Description text="Projects I've created and contributed to." />
				</div>

				<div className="max-w-3xl mx-auto space-y-4">
					<ProjectCard
						name="design-system"
						description="A comprehensive React component library with 200+ components, built with TypeScript and Tailwind CSS."
						href="https://github.com/username/design-system"
						language="TypeScript"
						stars={2450}
						forks={180}
						tags={['React', 'Tailwind', 'Radix UI']}
					/>
					<ProjectCard
						name="cache-layer"
						description="Intelligent caching middleware for Node.js applications with support for Redis, Memcached, and in-memory storage."
						href="https://github.com/username/cache-layer"
						language="JavaScript"
						stars={890}
						forks={95}
						tags={['Node.js', 'Redis', 'Performance']}
					/>
					<ProjectCard
						name="form-builder"
						description="Drag-and-drop form builder with validation, conditional logic, and multiple export formats."
						href="https://github.com/username/form-builder"
						language="TypeScript"
						stars={650}
						forks={78}
						tags={['React', 'DnD', 'Forms']}
					/>
					<ProjectCard
						name="api-client"
						description="Type-safe API client generator with automatic TypeScript types from OpenAPI schemas."
						href="https://github.com/username/api-client"
						language="TypeScript"
						stars={420}
						forks={45}
						tags={['OpenAPI', 'Code Gen', 'TypeScript']}
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
	icon?: ComponentType<{ className?: string }>;
	text: string;
}) => (
	<Badge variant="outline" className="mb-3 @md:mb-4">
		{Icon && <Icon className="size-3.5" />}
		{text}
	</Badge>
);

const Title = ({ text }: { text: string }) => (
	<h2 className="text-3xl @sm:text-4xl @md:text-5xl font-bold tracking-tight mb-4">
		{text}
	</h2>
);

const Description = ({ text }: { text: string }) => (
	<p className="text-base @md:text-lg text-muted-foreground">{text}</p>
);

interface ProjectCardProps {
	name: string;
	description: string;
	href: string;
	language: string;
	stars: number;
	forks: number;
	tags: string[];
}

const ProjectCard = ({
	name,
	description,
	href,
	language,
	stars,
	forks,
	tags,
}: ProjectCardProps) => (
	<Link href={href} target="_blank" className="block group">
		<Card className="hover:shadow-lg transition-all">
			<CardContent className="p-6">
				<div className="flex items-start justify-between gap-4 mb-3">
					<h3 className="font-mono font-bold text-lg group-hover:text-primary transition-colors">
						{name}
					</h3>
					<ExternalLink className="size-4 text-muted-foreground group-hover:text-primary transition-colors shrink-0 mt-1" />
				</div>
				<p className="text-sm text-muted-foreground mb-4 leading-relaxed">
					{description}
				</p>
				<div className="flex flex-wrap items-center gap-3 mb-4">
					<Badge variant="secondary">{language}</Badge>
					{tags.map((tag, i) => (
						<Badge key={i} variant="outline" className="text-xs">
							{tag}
						</Badge>
					))}
				</div>
				<div className="flex items-center gap-4 text-sm text-muted-foreground">
					<span className="flex items-center gap-1">
						<Star className="size-4" />
						{stars.toLocaleString()}
					</span>
					<span className="flex items-center gap-1">
						<GitFork className="size-4" />
						{forks}
					</span>
				</div>
			</CardContent>
		</Card>
	</Link>
);
