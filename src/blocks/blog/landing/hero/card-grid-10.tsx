import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { ArrowRight, ExternalLink, Github, Star } from 'lucide-react';
import Link from 'next/link';

export default function Main() {
	return (
		<section
			className="@container relative overflow-hidden bg-background"
			data-theme="neon"
		>
			<div className="relative mx-auto max-w-7xl px-4 @sm:px-6 @2xl:px-8 py-12 @md:py-16 @xl:py-20">
				<Header
					title="Open Source Projects"
					description="Tools we build and use"
				/>
				<ProjectGrid
					projects={[
						{
							name: 'next-blog',
							description: 'Modern blog template with Next.js 15',
							stars: 4520,
							language: 'TypeScript',
							color: 'bg-blue-500',
						},
						{
							name: 'react-components',
							description: 'Accessible React component library',
							stars: 3210,
							language: 'TypeScript',
							color: 'bg-blue-500',
						},
						{
							name: 'css-utils',
							description: 'Utility classes for modern CSS',
							stars: 2150,
							language: 'CSS',
							color: 'bg-pink-500',
						},
						{
							name: 'node-api',
							description: 'REST API starter with Node.js',
							stars: 1890,
							language: 'JavaScript',
							color: 'bg-yellow-500',
						},
						{
							name: 'dev-tools',
							description: 'CLI tools for developers',
							stars: 1560,
							language: 'Go',
							color: 'bg-cyan-500',
						},
						{
							name: 'blog-cli',
							description: 'Scaffold blog posts from terminal',
							stars: 980,
							language: 'Rust',
							color: 'bg-orange-500',
						},
					]}
				/>
			</div>
			<Decorative />
		</section>
	);
}

interface HeaderProps {
	title: string;
	description: string;
}

const Header = ({ title, description }: HeaderProps) => (
	<div className="flex items-center justify-between mb-8">
		<div>
			<div className="flex items-center gap-3 mb-2">
				<Github className="size-6" />
				<h1 className="text-2xl @md:text-3xl font-bold">{title}</h1>
			</div>
			<p className="text-muted-foreground">{description}</p>
		</div>
		<Button variant="outline" asChild className="gap-1">
			<Link href="https://github.com">
				View All
				<ExternalLink className="size-4" />
			</Link>
		</Button>
	</div>
);

interface Project {
	name: string;
	description: string;
	stars: number;
	language: string;
	color: string;
}

interface ProjectGridProps {
	projects: Project[];
}

const ProjectGrid = ({ projects }: ProjectGridProps) => (
	<div className="grid grid-cols-1 @sm:grid-cols-2 @xl:grid-cols-3 gap-4">
		{projects.map((project) => (
			<Link key={project.name} href={`https://github.com/org/${project.name}`}>
				<Card className="group h-full transition-all hover:border-primary hover:shadow-lg">
					<CardContent className="p-5">
						<div className="flex items-start justify-between mb-3">
							<h3 className="font-mono font-semibold group-hover:text-primary transition-colors">
								{project.name}
							</h3>
							<div className="flex items-center gap-1 text-sm">
								<Star className="size-3.5 fill-amber-500 text-amber-500" />
								{project.stars.toLocaleString()}
							</div>
						</div>
						<p className="text-sm text-muted-foreground mb-4 line-clamp-2">
							{project.description}
						</p>
						<div className="flex items-center gap-2">
							<div className={`size-3 rounded-full ${project.color}`} />
							<span className="text-xs text-muted-foreground">
								{project.language}
							</span>
						</div>
					</CardContent>
				</Card>
			</Link>
		))}
	</div>
);

const Decorative = () => (
	<>
		<div className="absolute top-0 left-0 right-0 h-px bg-linear-to-r from-transparent via-primary/30 to-transparent" />
	</>
);
