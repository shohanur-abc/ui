import { Badge } from '@/components/ui/badge';
import { Card, CardContent } from '@/components/ui/card';
import { Code2, ExternalLink, Github, Star } from 'lucide-react';
import Link from 'next/link';

export default function Main() {
	return (
		<section
			className="@container relative overflow-hidden bg-background"
			data-theme="corporate"
		>
			<div className="relative mx-auto max-w-7xl px-4 @sm:px-6 @2xl:px-8 py-12 @md:py-16 @xl:py-20">
				<Header title="Open Source Showcase" />
				<MasonryGrid
					repos={[
						{
							name: 'next-blog-template',
							description:
								'Modern blog template with Next.js 15 and React Server Components',
							stars: 4520,
							language: 'TypeScript',
							color: 'bg-blue-500',
							featured: true,
						},
						{
							name: 'react-ui-kit',
							description: 'Accessible component library',
							stars: 3210,
							language: 'TypeScript',
							color: 'bg-blue-500',
							featured: false,
						},
						{
							name: 'css-utils',
							description: 'Utility-first CSS framework',
							stars: 2150,
							language: 'CSS',
							color: 'bg-pink-500',
							featured: false,
						},
						{
							name: 'node-api-starter',
							description:
								'Production-ready Node.js API with TypeScript, Prisma, and Docker',
							stars: 1890,
							language: 'TypeScript',
							color: 'bg-blue-500',
							featured: true,
						},
						{
							name: 'cli-tools',
							description: 'Developer CLI utilities',
							stars: 1560,
							language: 'Go',
							color: 'bg-cyan-500',
							featured: false,
						},
						{
							name: 'blog-cms',
							description: 'Headless CMS for blogs',
							stars: 980,
							language: 'Rust',
							color: 'bg-orange-500',
							featured: false,
						},
					]}
				/>
			</div>
		</section>
	);
}

interface HeaderProps {
	title: string;
}

const Header = ({ title }: HeaderProps) => (
	<div className="flex items-center gap-3 mb-8">
		<Github className="size-7" />
		<h1 className="text-2xl @md:text-3xl font-bold">{title}</h1>
	</div>
);

interface Repo {
	name: string;
	description: string;
	stars: number;
	language: string;
	color: string;
	featured: boolean;
}

interface MasonryGridProps {
	repos: Repo[];
}

const MasonryGrid = ({ repos }: MasonryGridProps) => (
	<div className="columns-1 @sm:columns-2 @xl:columns-3 gap-4 space-y-4">
		{repos.map((repo) => (
			<Link key={repo.name} href="#" className="block break-inside-avoid">
				<Card
					className={`group transition-all hover:border-primary hover:shadow-lg ${repo.featured ? 'bg-gradient-to-br from-primary/5 to-card' : ''}`}
				>
					<CardContent className={`${repo.featured ? 'p-6' : 'p-5'}`}>
						<div className="flex items-start justify-between mb-3">
							<div className="flex items-center gap-2">
								<Code2 className="size-5 text-muted-foreground" />
								<h3 className="font-mono font-semibold group-hover:text-primary transition-colors">
									{repo.name}
								</h3>
							</div>
							<ExternalLink className="size-4 text-muted-foreground opacity-0 group-hover:opacity-100 transition-opacity" />
						</div>
						<p
							className={`text-sm text-muted-foreground mb-4 ${repo.featured ? '' : 'line-clamp-2'}`}
						>
							{repo.description}
						</p>
						<div className="flex items-center justify-between">
							<div className="flex items-center gap-2">
								<div className={`size-3 rounded-full ${repo.color}`} />
								<span className="text-xs text-muted-foreground">
									{repo.language}
								</span>
							</div>
							<div className="flex items-center gap-1 text-sm">
								<Star className="size-3.5 fill-amber-500 text-amber-500" />
								{repo.stars.toLocaleString()}
							</div>
						</div>
					</CardContent>
				</Card>
			</Link>
		))}
	</div>
);
