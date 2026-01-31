import { Badge } from '@/components/ui/badge';
import { Card, CardContent } from '@/components/ui/card';
import { FileCode, Star, GitFork, ExternalLink } from 'lucide-react';
import Link from 'next/link';

export default function Main() {
	return (
		<section className="@container bg-muted/30">
			<div className="mx-auto max-w-7xl px-4 @sm:px-6 @2xl:px-8 py-16 @md:py-20 @xl:py-24 @3xl:py-32">
				<div className="max-w-xl mb-12 @md:mb-16">
					<Eyebrow text="Projects" />
					<Title text="Open Source" />
					<Description text="Projects I've built and maintained." />
				</div>

				<div className="grid @sm:grid-cols-2 @lg:grid-cols-3 gap-4 max-w-5xl">
					<ProjectCard
						name="design-system"
						description="Comprehensive React component library with 200+ accessible components."
						stars={2450}
						forks={180}
						language="TypeScript"
						tags={['React', 'Tailwind', 'Radix']}
						href="https://github.com/username/design-system"
					/>
					<ProjectCard
						name="cache-layer"
						description="Intelligent caching middleware for Node.js with Redis support."
						stars={890}
						forks={95}
						language="JavaScript"
						tags={['Node.js', 'Redis', 'Cache']}
						href="https://github.com/username/cache-layer"
					/>
					<ProjectCard
						name="form-builder"
						description="Drag-and-drop form builder with validation and export."
						stars={650}
						forks={78}
						language="TypeScript"
						tags={['React', 'DnD', 'Forms']}
						href="https://github.com/username/form-builder"
					/>
					<ProjectCard
						name="api-client"
						description="Type-safe API client generator from OpenAPI schemas."
						stars={420}
						forks={45}
						language="TypeScript"
						tags={['OpenAPI', 'Codegen']}
						href="https://github.com/username/api-client"
					/>
					<ProjectCard
						name="testing-utils"
						description="Testing utilities and helpers for React applications."
						stars={380}
						forks={40}
						language="TypeScript"
						tags={['Testing', 'Jest', 'React']}
						href="https://github.com/username/testing-utils"
					/>
					<ProjectCard
						name="cli-tools"
						description="Collection of CLI tools for development workflow."
						stars={250}
						forks={30}
						language="Go"
						tags={['CLI', 'DevTools']}
						href="https://github.com/username/cli-tools"
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
	stars: number;
	forks: number;
	language: string;
	tags: string[];
	href: string;
}

const ProjectCard = ({
	name,
	description,
	stars,
	forks,
	language,
	tags,
	href,
}: ProjectCardProps) => (
	<Link href={href} target="_blank" className="block group">
		<Card className="h-full hover:shadow-lg transition-all">
			<CardContent className="p-5 h-full flex flex-col">
				<div className="flex items-start justify-between mb-3">
					<div className="flex items-center gap-2">
						<FileCode className="size-5 text-primary" />
						<h3 className="font-mono font-bold group-hover:text-primary transition-colors">
							{name}
						</h3>
					</div>
					<ExternalLink className="size-4 text-muted-foreground shrink-0" />
				</div>
				<p className="text-sm text-muted-foreground mb-4 flex-1">
					{description}
				</p>
				<div className="flex flex-wrap gap-1.5 mb-4">
					{tags.map((tag, i) => (
						<Badge key={i} variant="outline" className="text-xs">
							{tag}
						</Badge>
					))}
				</div>
				<div className="flex items-center gap-4 text-xs text-muted-foreground">
					<Badge variant="secondary">{language}</Badge>
					<span className="flex items-center gap-1">
						<Star className="size-3 text-yellow-500 fill-current" />
						{stars.toLocaleString()}
					</span>
					<span className="flex items-center gap-1">
						<GitFork className="size-3" />
						{forks}
					</span>
				</div>
			</CardContent>
		</Card>
	</Link>
);
