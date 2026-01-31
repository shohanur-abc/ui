import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import {
	ArrowRight,
	GitBranch,
	Github,
	GitPullRequest,
	Star,
} from 'lucide-react';
import Link from 'next/link';

export default function Main() {
	return (
		<section
			className="@container relative overflow-hidden bg-background"
			data-theme="neon"
		>
			<div className="relative mx-auto max-w-7xl px-4 @sm:px-6 @2xl:px-8 py-12 @md:py-16 @xl:py-20 @3xl:py-24">
				<div className="grid grid-cols-1 @3xl:grid-cols-2 gap-10 @xl:gap-16 items-center">
					<ContentSection
						eyebrow={{ icon: Github, text: 'Open Source First' }}
						title="Code in the Open"
						highlight="Learn by Example"
						description="Every tutorial comes with a complete, production-ready repository. Fork, clone, and build on top of real-world examples."
						stats={[
							{ icon: Star, value: '12.5K', label: 'GitHub Stars' },
							{ icon: GitBranch, value: '2.3K', label: 'Forks' },
							{ icon: GitPullRequest, value: '450+', label: 'Contributors' },
						]}
						cta={[
							{
								label: 'View on GitHub',
								href: 'https://github.com',
								icon: Github,
							},
							{ label: 'Browse Repos', href: '/repos', variant: 'outline' },
						]}
					/>
					<RepoShowcase
						repos={[
							{
								name: 'next-saas-starter',
								description:
									'A complete SaaS boilerplate with auth, billing, and more',
								stars: 4520,
								language: 'TypeScript',
								languageColor: '#3178c6',
							},
							{
								name: 'react-component-lib',
								description: 'Production-ready React component library',
								stars: 3210,
								language: 'TypeScript',
								languageColor: '#3178c6',
							},
							{
								name: 'api-design-patterns',
								description: 'REST & GraphQL API design examples',
								stars: 2890,
								language: 'JavaScript',
								languageColor: '#f1e05a',
							},
							{
								name: 'devops-toolkit',
								description: 'Docker, K8s, and CI/CD configurations',
								stars: 1950,
								language: 'Shell',
								languageColor: '#89e051',
							},
						]}
					/>
				</div>
			</div>
			<CodeDecorative />
		</section>
	);
}

interface StatItem {
	icon: React.ComponentType<{ className?: string }>;
	value: string;
	label: string;
}

interface CTAItem {
	label: string;
	href: string;
	icon?: React.ComponentType<{ className?: string }>;
	variant?: 'default' | 'outline' | 'secondary' | 'ghost';
}

interface ContentSectionProps {
	eyebrow: { icon: React.ComponentType<{ className?: string }>; text: string };
	title: string;
	highlight: string;
	description: string;
	stats: StatItem[];
	cta: CTAItem[];
}

const ContentSection = ({
	eyebrow,
	title,
	highlight,
	description,
	stats,
	cta,
}: ContentSectionProps) => (
	<div className="space-y-6">
		<Eyebrow icon={eyebrow.icon} text={eyebrow.text} />
		<Title text={title} highlight={highlight} />
		<Description text={description} />
		<Stats items={stats} />
		<CTA items={cta} />
	</div>
);

const Eyebrow = ({
	icon: Icon,
	text,
}: {
	icon: React.ComponentType<{ className?: string }>;
	text: string;
}) => (
	<Badge
		variant="outline"
		className="gap-2 px-4 py-1.5 font-mono text-xs border-primary/30"
	>
		<Icon className="size-4" />
		{text}
	</Badge>
);

const Title = ({ text, highlight }: { text: string; highlight: string }) => (
	<h1 className="text-3xl @sm:text-4xl @md:text-5xl @xl:text-6xl font-bold tracking-tight">
		{text}
		<span className="block bg-linear-to-r from-primary to-accent bg-clip-text text-transparent">
			{highlight}
		</span>
	</h1>
);

const Description = ({ text }: { text: string }) => (
	<p className="text-base @md:text-lg text-muted-foreground leading-relaxed max-w-lg">
		{text}
	</p>
);

const Stats = ({ items }: { items: StatItem[] }) => (
	<div className="flex flex-wrap gap-6 @md:gap-8">
		{items.map(({ icon: Icon, value, label }) => (
			<div key={label}>
				<div className="flex items-center gap-2 mb-1">
					<Icon className="size-5 text-primary" />
					<span className="text-xl @md:text-2xl font-bold">{value}</span>
				</div>
				<p className="text-sm text-muted-foreground">{label}</p>
			</div>
		))}
	</div>
);

const CTA = ({ items }: { items: CTAItem[] }) => (
	<div className="flex flex-wrap gap-3">
		{items.map(({ label, href, icon: Icon, variant = 'default' }) => (
			<Button key={label} size="lg" variant={variant} asChild className="gap-2">
				<Link href={href}>
					{Icon && <Icon className="size-4" />}
					{label}
				</Link>
			</Button>
		))}
	</div>
);

interface Repo {
	name: string;
	description: string;
	stars: number;
	language: string;
	languageColor: string;
}

const RepoShowcase = ({ repos }: { repos: Repo[] }) => (
	<div className="space-y-3">
		{repos.map((repo) => (
			<RepoCard key={repo.name} repo={repo} />
		))}
	</div>
);

const RepoCard = ({ repo }: { repo: Repo }) => (
	<Link
		href={`https://github.com/org/${repo.name}`}
		className="group flex items-start gap-4 p-4 rounded-xl bg-card border transition-all hover:border-primary hover:shadow-lg"
	>
		<div className="size-10 rounded-lg bg-muted flex items-center justify-center shrink-0">
			<Github className="size-5 text-muted-foreground" />
		</div>
		<div className="flex-1 min-w-0">
			<p className="font-mono font-semibold text-sm @md:text-base group-hover:text-primary transition-colors truncate">
				{repo.name}
			</p>
			<p className="text-sm text-muted-foreground line-clamp-1">
				{repo.description}
			</p>
			<div className="flex items-center gap-4 mt-2 text-xs text-muted-foreground">
				<span className="flex items-center gap-1.5">
					<span
						className="size-3 rounded-full"
						style={{ backgroundColor: repo.languageColor }}
					/>
					{repo.language}
				</span>
				<span className="flex items-center gap-1">
					<Star className="size-3.5" />
					{repo.stars.toLocaleString()}
				</span>
			</div>
		</div>
		<ArrowRight className="size-4 text-muted-foreground opacity-0 group-hover:opacity-100 transition-opacity shrink-0 mt-1" />
	</Link>
);

const CodeDecorative = () => (
	<>
		<div className="pointer-events-none absolute top-0 left-0 right-0 h-px bg-linear-to-r from-transparent via-primary/30 to-transparent" />
		<div className="pointer-events-none absolute bottom-0 left-0 right-0 h-px bg-linear-to-r from-transparent via-primary/30 to-transparent" />
	</>
);
