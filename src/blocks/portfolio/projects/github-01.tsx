import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import {
	Card,
	CardContent,
	CardHeader,
	CardTitle,
	CardDescription,
} from '@/components/ui/card';
import { ArrowUpRight, Github, Star, GitFork, Eye } from 'lucide-react';
import Link from 'next/link';
import { ComponentType } from 'react';

export default function Main() {
	return (
		<section className="@container" data-theme="neon">
			<div className="mx-auto max-w-7xl px-4 @sm:px-6 @2xl:px-8 py-16 @md:py-20 @xl:py-24 @3xl:py-32">
				<div className="text-center max-w-3xl mx-auto mb-12 @md:mb-16">
					<Eyebrow icon={Github} text="Open Source" />
					<Title text="GitHub Projects" />
					<Description text="Open source contributions and personal projects." />
				</div>

				<GithubGrid
					items={[
						{
							name: 'react-dashboard-kit',
							description:
								'Production-ready admin dashboard template with dark mode, charts, and data tables.',
							language: 'TypeScript',
							stars: 2340,
							forks: 456,
							watchers: 89,
							topics: ['react', 'dashboard', 'admin', 'tailwindcss'],
							href: 'https://github.com',
						},
						{
							name: 'node-api-starter',
							description:
								'Opinionated Node.js API boilerplate with TypeScript, Prisma, and JWT auth.',
							language: 'TypeScript',
							stars: 1890,
							forks: 312,
							watchers: 67,
							topics: ['nodejs', 'api', 'prisma', 'jwt'],
							href: 'https://github.com',
						},
						{
							name: 'ui-components',
							description:
								'Accessible React component library built with Radix UI and TailwindCSS.',
							language: 'TypeScript',
							stars: 3200,
							forks: 567,
							watchers: 112,
							topics: ['react', 'components', 'ui', 'accessibility'],
							href: 'https://github.com',
						},
						{
							name: 'ml-image-classifier',
							description:
								'Image classification API using PyTorch with pre-trained models.',
							language: 'Python',
							stars: 890,
							forks: 145,
							watchers: 34,
							topics: ['python', 'pytorch', 'machine-learning', 'api'],
							href: 'https://github.com',
						},
						{
							name: 'cli-project-generator',
							description:
								'Interactive CLI tool for scaffolding modern web projects.',
							language: 'TypeScript',
							stars: 1200,
							forks: 178,
							watchers: 45,
							topics: ['cli', 'generator', 'scaffolding', 'nodejs'],
							href: 'https://github.com',
						},
						{
							name: 'react-native-kit',
							description:
								'Cross-platform mobile app starter with navigation, auth, and offline support.',
							language: 'TypeScript',
							stars: 1560,
							forks: 234,
							watchers: 56,
							topics: ['react-native', 'mobile', 'expo', 'typescript'],
							href: 'https://github.com',
						},
					]}
				/>
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
	<div className="flex justify-center mb-4">
		<Badge variant="outline" className="gap-2">
			<Icon className="size-3.5" />
			{text}
		</Badge>
	</div>
);

const Title = ({ text }: { text: string }) => (
	<h2 className="text-3xl @sm:text-4xl @md:text-5xl font-bold tracking-tight mb-4">
		{text}
	</h2>
);

const Description = ({ text }: { text: string }) => (
	<p className="text-base @md:text-lg text-muted-foreground">{text}</p>
);

interface GithubItem {
	name: string;
	description: string;
	language: string;
	stars: number;
	forks: number;
	watchers: number;
	topics: string[];
	href: string;
}

const languageColors: Record<string, string> = {
	TypeScript: 'bg-blue-500',
	JavaScript: 'bg-yellow-500',
	Python: 'bg-green-500',
	Go: 'bg-cyan-500',
	Rust: 'bg-orange-500',
};

const GithubGrid = ({ items }: { items: GithubItem[] }) => (
	<div className="grid @md:grid-cols-2 @xl:grid-cols-3 gap-4 @md:gap-6">
		{items.map(
			(
				{ name, description, language, stars, forks, watchers, topics, href },
				i,
			) => (
				<Card
					key={i}
					className="group border transition-all hover:shadow-lg hover:shadow-primary/10 hover:border-primary/20"
				>
					<CardHeader>
						<div className="flex items-start justify-between gap-3">
							<div className="flex items-center gap-2">
								<Github className="size-5 text-muted-foreground" />
								<CardTitle className="text-base font-mono group-hover:text-primary transition-colors">
									{name}
								</CardTitle>
							</div>
							<Button variant="ghost" size="icon-sm" asChild>
								<Link href={href} target="_blank">
									<ArrowUpRight className="size-4" />
								</Link>
							</Button>
						</div>
						<CardDescription className="line-clamp-2">
							{description}
						</CardDescription>
					</CardHeader>

					<CardContent>
						{/* Topics */}
						<div className="flex flex-wrap gap-1.5 mb-4">
							{topics.slice(0, 4).map((topic, j) => (
								<Badge key={j} variant="secondary" className="text-xs">
									{topic}
								</Badge>
							))}
						</div>

						{/* Stats */}
						<div className="flex items-center gap-4 text-sm text-muted-foreground">
							<div className="flex items-center gap-1.5">
								<div
									className={`size-3 rounded-full ${languageColors[language] || 'bg-gray-500'}`}
								/>
								<span>{language}</span>
							</div>
							<div className="flex items-center gap-1">
								<Star className="size-4" />
								<span>{stars.toLocaleString()}</span>
							</div>
							<div className="flex items-center gap-1">
								<GitFork className="size-4" />
								<span>{forks}</span>
							</div>
							<div className="flex items-center gap-1">
								<Eye className="size-4" />
								<span>{watchers}</span>
							</div>
						</div>
					</CardContent>
				</Card>
			),
		)}
	</div>
);
