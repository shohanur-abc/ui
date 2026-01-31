import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import {
	ArrowRight,
	Code2,
	ExternalLink,
	Github,
	Sparkles,
	Star,
	Terminal,
} from 'lucide-react';
import Link from 'next/link';

export default function Main() {
	return (
		<section
			className="@container relative overflow-hidden bg-background"
			data-theme="neon"
		>
			<div className="relative mx-auto max-w-7xl px-4 @sm:px-6 @2xl:px-8 py-12 @md:py-16 @xl:py-20 @3xl:py-24">
				<div className="grid grid-cols-1 @md:grid-cols-2 @xl:grid-cols-4 gap-4 auto-rows-[minmax(160px,auto)]">
					<HeroCell
						title="Open Source Dev Blog"
						className="@md:col-span-2 row-span-2"
					/>
					<GithubStatsCell stars={12500} forks={2300} className="" />
					<CodeSnippetCell className="" />
					<RepoCell
						name="next-blog-template"
						description="The template powering this blog"
						stars={4520}
						className="@xl:col-span-2"
					/>
				</div>
			</div>
			<CodeDecorative />
		</section>
	);
}

interface HeroCellProps {
	title: string;
	className?: string;
}

const HeroCell = ({ title, className }: HeroCellProps) => (
	<Card
		className={`relative overflow-hidden bg-gradient-to-br from-primary/10 via-card to-transparent flex flex-col justify-center border-primary/20 ${className}`}
	>
		<CardContent className="p-6 @md:p-8">
			<Badge
				variant="outline"
				className="mb-4 font-mono text-xs border-primary/30 text-primary"
			>
				<Terminal className="size-3.5 mr-1.5" />
				~/dev/blog
			</Badge>
			<h1 className="text-3xl @md:text-4xl @xl:text-5xl font-bold tracking-tight mb-4 font-mono">
				{title}
			</h1>
			<p className="text-muted-foreground mb-6 max-w-md">
				Articles, tutorials, and resources. All open source. Fork, learn,
				contribute.
			</p>
			<div className="flex flex-wrap gap-3">
				<Button size="lg" asChild className="gap-2">
					<Link href="/articles">
						Read Articles
						<ArrowRight className="size-4" />
					</Link>
				</Button>
				<Button size="lg" variant="outline" asChild className="gap-2">
					<Link href="https://github.com">
						<Github className="size-4" />
						View Source
					</Link>
				</Button>
			</div>
		</CardContent>
	</Card>
);

interface GithubStatsCellProps {
	stars: number;
	forks: number;
	className?: string;
}

const GithubStatsCell = ({ stars, forks, className }: GithubStatsCellProps) => (
	<Card className={`bg-gradient-to-br from-primary/5 to-card ${className}`}>
		<CardContent className="p-5 flex flex-col justify-center h-full">
			<Github className="size-8 mb-3" />
			<div className="flex gap-6">
				<div>
					<div className="flex items-center gap-1 text-2xl font-bold">
						<Star className="size-4 fill-amber-500 text-amber-500" />
						{(stars / 1000).toFixed(1)}K
					</div>
					<p className="text-xs text-muted-foreground">Stars</p>
				</div>
				<div>
					<p className="text-2xl font-bold">{(forks / 1000).toFixed(1)}K</p>
					<p className="text-xs text-muted-foreground">Forks</p>
				</div>
			</div>
		</CardContent>
	</Card>
);

interface CodeSnippetCellProps {
	className?: string;
}

const CodeSnippetCell = ({ className }: CodeSnippetCellProps) => (
	<Card
		className={`bg-[#0d1117] border-primary/20 overflow-hidden ${className}`}
	>
		<CardContent className="p-4 font-mono text-xs">
			<div className="text-slate-400 mb-2">// Quick start</div>
			<div className="text-green-400">npx create-blog my-blog</div>
			<div className="text-slate-400 mt-3">// Run dev server</div>
			<div className="text-cyan-400">bun dev</div>
		</CardContent>
	</Card>
);

interface RepoCellProps {
	name: string;
	description: string;
	stars: number;
	className?: string;
}

const RepoCell = ({ name, description, stars, className }: RepoCellProps) => (
	<Link href={`https://github.com/org/${name}`}>
		<Card
			className={`group h-full transition-all hover:border-primary ${className}`}
		>
			<CardContent className="p-5 flex items-center gap-4">
				<div className="size-12 rounded-lg bg-muted flex items-center justify-center shrink-0">
					<Code2 className="size-6 text-muted-foreground" />
				</div>
				<div className="flex-1 min-w-0">
					<p className="font-mono font-semibold truncate group-hover:text-primary transition-colors">
						{name}
					</p>
					<p className="text-sm text-muted-foreground line-clamp-1">
						{description}
					</p>
					<div className="flex items-center gap-2 mt-1">
						<Star className="size-3.5 fill-amber-500 text-amber-500" />
						<span className="text-xs text-muted-foreground">
							{stars.toLocaleString()}
						</span>
					</div>
				</div>
				<ExternalLink className="size-4 text-muted-foreground opacity-0 group-hover:opacity-100 transition-opacity shrink-0" />
			</CardContent>
		</Card>
	</Link>
);

const CodeDecorative = () => (
	<>
		<div className="pointer-events-none absolute top-0 left-0 right-0 h-px bg-linear-to-r from-transparent via-primary/30 to-transparent" />
		<div className="pointer-events-none absolute bottom-0 left-0 right-0 h-px bg-linear-to-r from-transparent via-primary/30 to-transparent" />
	</>
);
