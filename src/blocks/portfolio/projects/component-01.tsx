import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import {
	ArrowUpRight,
	Component,
	Puzzle,
	Boxes,
	Box,
	PackageOpen,
} from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import { ComponentType } from 'react';

export default function Main() {
	return (
		<section className="@container" data-theme="neon">
			<div className="mx-auto max-w-7xl px-4 @sm:px-6 @2xl:px-8 py-16 @md:py-20 @xl:py-24 @3xl:py-32">
				<div className="text-center max-w-3xl mx-auto mb-12 @md:mb-16">
					<Eyebrow icon={Puzzle} text="Modular" />
					<Title text="Component View" />
					<Description text="Projects broken down into reusable components." />
				</div>

				<ComponentView
					project={{
						title: 'Banking Platform',
						description:
							'Enterprise banking solution with modular architecture.',
						category: 'Fintech',
						href: '#',
						components: [
							{
								name: 'Dashboard',
								image: 'https://picsum.photos/seed/comp1/400/300',
								count: 12,
							},
							{
								name: 'Authentication',
								image: 'https://picsum.photos/seed/comp2/400/300',
								count: 8,
							},
							{
								name: 'Transactions',
								image: 'https://picsum.photos/seed/comp3/400/300',
								count: 15,
							},
							{
								name: 'Analytics',
								image: 'https://picsum.photos/seed/comp4/400/300',
								count: 10,
							},
							{
								name: 'Settings',
								image: 'https://picsum.photos/seed/comp5/400/300',
								count: 6,
							},
							{
								name: 'Notifications',
								image: 'https://picsum.photos/seed/comp6/400/300',
								count: 4,
							},
						],
						stats: {
							totalComponents: 55,
							screens: 24,
							variants: 120,
						},
					}}
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

interface ComponentInfo {
	name: string;
	image: string;
	count: number;
}

interface ProjectStats {
	totalComponents: number;
	screens: number;
	variants: number;
}

interface ProjectData {
	title: string;
	description: string;
	category: string;
	href: string;
	components: ComponentInfo[];
	stats: ProjectStats;
}

const ComponentView = ({ project }: { project: ProjectData }) => {
	const { title, description, category, href, components, stats } = project;

	return (
		<div className="space-y-8">
			{/* Project header */}
			<Card className="p-6">
				<div className="flex flex-col @lg:flex-row @lg:items-center @lg:justify-between gap-6">
					<div>
						<Badge className="mb-3">{category}</Badge>
						<h3 className="font-bold text-2xl @md:text-3xl mb-2">{title}</h3>
						<p className="text-muted-foreground">{description}</p>
					</div>

					<div className="flex gap-6 @lg:gap-8">
						<div className="text-center">
							<div className="text-3xl font-bold text-primary">
								{stats.totalComponents}
							</div>
							<div className="text-sm text-muted-foreground">Components</div>
						</div>
						<div className="text-center">
							<div className="text-3xl font-bold text-primary">
								{stats.screens}
							</div>
							<div className="text-sm text-muted-foreground">Screens</div>
						</div>
						<div className="text-center">
							<div className="text-3xl font-bold text-primary">
								{stats.variants}
							</div>
							<div className="text-sm text-muted-foreground">Variants</div>
						</div>
					</div>
				</div>
			</Card>

			{/* Components grid */}
			<div className="grid @sm:grid-cols-2 @lg:grid-cols-3 gap-4">
				{components.map(({ name, image, count }, i) => (
					<Link
						key={i}
						href={`${href}#${name.toLowerCase()}`}
						className="group block"
					>
						<Card className="overflow-hidden border transition-all hover:shadow-lg hover:border-primary/20 p-0">
							<div className="relative aspect-video overflow-hidden bg-muted">
								<Image
									src={image}
									alt={name}
									fill
									className="object-cover transition-transform duration-500 group-hover:scale-105"
								/>
								<div className="absolute inset-0 bg-gradient-to-t from-card via-transparent to-transparent" />

								{/* Component count */}
								<div className="absolute top-3 right-3 px-2 py-1 rounded bg-primary text-primary-foreground text-xs font-medium">
									{count} items
								</div>
							</div>

							<CardContent className="p-4 flex items-center justify-between">
								<div className="flex items-center gap-2">
									<Component className="size-4 text-primary" />
									<span className="font-medium group-hover:text-primary transition-colors">
										{name}
									</span>
								</div>
								<ArrowUpRight className="size-4 text-muted-foreground opacity-0 group-hover:opacity-100 transition-opacity" />
							</CardContent>
						</Card>
					</Link>
				))}
			</div>

			{/* View full project */}
			<div className="text-center">
				<Button className="gap-2" asChild>
					<Link href={href}>
						<Boxes className="size-4" />
						View Complete System
						<ArrowUpRight className="size-4" />
					</Link>
				</Button>
			</div>
		</div>
	);
};
