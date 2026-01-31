import { Badge } from '@/components/ui/badge';
import { Card, CardContent } from '@/components/ui/card';
import {
	FileCode,
	Star,
	GitFork,
	ExternalLink,
	Heart,
	Download,
} from 'lucide-react';
import Link from 'next/link';
import { ComponentType } from 'react';

export default function Main() {
	return (
		<section className="@container bg-muted/30">
			<div className="mx-auto max-w-7xl px-4 @sm:px-6 @2xl:px-8 py-16 @md:py-20 @xl:py-24 @3xl:py-32">
				<div className="text-center max-w-2xl mx-auto mb-12 @md:mb-16">
					<Eyebrow icon={FileCode} text="Open Source" />
					<Title text="Featured Projects" />
					<Description text="Open source work I've created and maintained." />
				</div>

				<div className="grid @md:grid-cols-2 @xl:grid-cols-4 gap-4 auto-rows-[minmax(160px,auto)]">
					<FeaturedProject
						name="design-system"
						description="A comprehensive React component library with 200+ accessible components, built with TypeScript and Tailwind CSS."
						stars={2450}
						forks={180}
						downloads="50K+"
						href="https://github.com/username/design-system"
						className="@md:col-span-2 @md:row-span-2"
					/>
					<ProjectCard
						name="cache-layer"
						stars={890}
						forks={95}
						href="https://github.com/username/cache-layer"
					/>
					<StatCard icon={Star} value="4K+" label="Total Stars" />
					<StatCard icon={Heart} value="100+" label="Contributors" />
					<ProjectCard
						name="form-builder"
						stars={650}
						forks={78}
						href="https://github.com/username/form-builder"
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

interface FeaturedProjectProps {
	name: string;
	description: string;
	stars: number;
	forks: number;
	downloads: string;
	href: string;
	className?: string;
}

const FeaturedProject = ({
	name,
	description,
	stars,
	forks,
	downloads,
	href,
	className = '',
}: FeaturedProjectProps) => (
	<Link href={href} target="_blank" className={`block group ${className}`}>
		<Card className="h-full ring-2 ring-primary hover:shadow-xl transition-all">
			<CardContent className="p-8 h-full flex flex-col justify-between">
				<div>
					<Badge className="mb-4">Featured</Badge>
					<h3 className="text-2xl @md:text-3xl font-bold font-mono mb-2 group-hover:text-primary transition-colors">
						{name}
					</h3>
					<p className="text-muted-foreground">{description}</p>
				</div>
				<div className="flex flex-wrap gap-6 mt-6">
					<div className="flex items-center gap-1">
						<Star className="size-5 text-yellow-500 fill-current" />
						<span className="font-bold">{stars.toLocaleString()}</span>
						<span className="text-sm text-muted-foreground">stars</span>
					</div>
					<div className="flex items-center gap-1">
						<GitFork className="size-5 text-muted-foreground" />
						<span className="font-bold">{forks}</span>
						<span className="text-sm text-muted-foreground">forks</span>
					</div>
					<div className="flex items-center gap-1">
						<Download className="size-5 text-muted-foreground" />
						<span className="font-bold">{downloads}</span>
						<span className="text-sm text-muted-foreground">downloads</span>
					</div>
				</div>
			</CardContent>
		</Card>
	</Link>
);

interface ProjectCardProps {
	name: string;
	stars: number;
	forks: number;
	href: string;
}

const ProjectCard = ({ name, stars, forks, href }: ProjectCardProps) => (
	<Link href={href} target="_blank" className="block group">
		<Card className="h-full hover:shadow-lg transition-all">
			<CardContent className="p-5 h-full flex flex-col">
				<div className="flex items-center justify-between mb-3">
					<FileCode className="size-6 text-primary" />
					<ExternalLink className="size-4 text-muted-foreground" />
				</div>
				<h4 className="font-mono font-bold mb-auto group-hover:text-primary transition-colors">
					{name}
				</h4>
				<div className="flex gap-4 mt-3 text-xs">
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

interface StatCardProps {
	icon: ComponentType<{ className?: string }>;
	value: string;
	label: string;
}

const StatCard = ({ icon: Icon, value, label }: StatCardProps) => (
	<Card className="bg-primary text-primary-foreground">
		<CardContent className="p-5 h-full flex flex-col items-center justify-center text-center">
			<Icon className="size-8 mb-2 opacity-80" />
			<p className="text-3xl font-bold">{value}</p>
			<p className="text-xs opacity-80">{label}</p>
		</CardContent>
	</Card>
);
