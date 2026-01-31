import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { ExternalLink, FolderOpen, Github } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import { ComponentType } from 'react';

export default function Main() {
	return (
		<section className="@container" data-theme="neon">
			<div className="mx-auto max-w-7xl px-4 @sm:px-6 @2xl:px-8 py-16 @md:py-20 @xl:py-24 @3xl:py-32">
				<div className="flex flex-col @lg:flex-row @lg:items-end @lg:justify-between gap-6 mb-12 @md:mb-16">
					<div className="max-w-2xl">
						<Eyebrow icon={FolderOpen} text="Projects" />
						<Title text="Work Showcase" />
						<Description text="A curated collection of projects demonstrating expertise across various technologies." />
					</div>
					<FilterTabs
						items={['All', 'Web', 'Mobile', 'Design']}
						activeIndex={0}
					/>
				</div>

				<ProjectGrid
					items={[
						{
							image: 'https://picsum.photos/seed/grid3a/800/600',
							title: 'Crypto Trading Platform',
							category: 'Web',
							year: '2025',
							liveUrl: '#',
							githubUrl: '#',
						},
						{
							image: 'https://picsum.photos/seed/grid3b/800/600',
							title: 'Fitness Tracking App',
							category: 'Mobile',
							year: '2025',
							liveUrl: '#',
							githubUrl: '#',
						},
						{
							image: 'https://picsum.photos/seed/grid3c/800/600',
							title: 'Restaurant Booking System',
							category: 'Web',
							year: '2024',
							liveUrl: '#',
							githubUrl: '#',
						},
						{
							image: 'https://picsum.photos/seed/grid3d/800/600',
							title: 'Brand Identity System',
							category: 'Design',
							year: '2024',
							liveUrl: '#',
						},
						{
							image: 'https://picsum.photos/seed/grid3e/800/600',
							title: 'Music Streaming UI',
							category: 'Design',
							year: '2024',
							liveUrl: '#',
							githubUrl: '#',
						},
						{
							image: 'https://picsum.photos/seed/grid3f/800/600',
							title: 'Task Management Tool',
							category: 'Web',
							year: '2024',
							liveUrl: '#',
							githubUrl: '#',
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
	<div className="flex items-center gap-2 mb-3 @md:mb-4 text-primary">
		<Icon className="size-4" />
		<span className="text-sm font-medium">{text}</span>
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

const FilterTabs = ({
	items,
	activeIndex,
}: {
	items: string[];
	activeIndex: number;
}) => (
	<div className="flex gap-2 flex-wrap">
		{items.map((item, i) => (
			<Button
				key={i}
				variant={i === activeIndex ? 'default' : 'outline'}
				size="sm"
			>
				{item}
			</Button>
		))}
	</div>
);

interface ProjectItem {
	image: string;
	title: string;
	category: string;
	year: string;
	liveUrl?: string;
	githubUrl?: string;
}

const ProjectGrid = ({ items }: { items: ProjectItem[] }) => (
	<ul className="grid @sm:grid-cols-2 @xl:grid-cols-3 gap-6">
		{items.map(({ image, title, category, year, liveUrl, githubUrl }, i) => (
			<li
				key={i}
				className="group relative rounded-xl overflow-hidden bg-card border"
			>
				<div className="relative aspect-[4/3] overflow-hidden">
					<Image
						src={image}
						alt={title}
						fill
						className="object-cover transition-transform duration-500 group-hover:scale-110"
					/>
					<div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/30 to-transparent" />
					<div className="absolute top-4 left-4 flex gap-2">
						<Badge variant="secondary">{category}</Badge>
						<Badge
							variant="outline"
							className="bg-background/50 backdrop-blur-sm"
						>
							{year}
						</Badge>
					</div>
					<div className="absolute bottom-0 left-0 right-0 p-4 @md:p-6">
						<h3 className="text-white text-lg @md:text-xl font-semibold mb-3">
							{title}
						</h3>
						<div className="flex gap-2 opacity-0 translate-y-2 group-hover:opacity-100 group-hover:translate-y-0 transition-all">
							{liveUrl && (
								<Button
									size="sm"
									variant="secondary"
									className="gap-1.5"
									asChild
								>
									<Link href={liveUrl}>
										<ExternalLink className="size-3.5" />
										Live
									</Link>
								</Button>
							)}
							{githubUrl && (
								<Button
									size="sm"
									variant="outline"
									className="gap-1.5 bg-background/50 backdrop-blur-sm"
									asChild
								>
									<Link href={githubUrl}>
										<Github className="size-3.5" />
										Code
									</Link>
								</Button>
							)}
						</div>
					</div>
				</div>
			</li>
		))}
	</ul>
);
