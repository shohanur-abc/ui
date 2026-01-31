import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { ArrowUpRight, Sparkles } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import { ComponentType } from 'react';

export default function Main() {
	return (
		<section className="@container" data-theme="neon">
			<div className="mx-auto max-w-7xl px-4 @sm:px-6 @2xl:px-8 py-16 @md:py-20 @xl:py-24 @3xl:py-32">
				<div className="text-center max-w-3xl mx-auto mb-12 @md:mb-16">
					<Eyebrow icon={Sparkles} text="Featured Work" />
					<Title text="Project Highlights" />
					<Description text="Explore standout projects that showcase innovation and craftsmanship." />
				</div>

				<BentoGrid
					featured={{
						image: 'https://picsum.photos/seed/bento1a/1200/800',
						title: 'Enterprise SaaS Platform',
						description:
							'A comprehensive business management solution with advanced analytics, team collaboration, and automated workflows.',
						tags: ['Next.js', 'TypeScript', 'Prisma', 'tRPC'],
						href: '#',
					}}
					secondary={[
						{
							image: 'https://picsum.photos/seed/bento1b/600/600',
							title: 'Mobile Banking App',
							description: 'Secure fintech application.',
							tags: ['React Native', 'Node.js'],
							href: '#',
						},
						{
							image: 'https://picsum.photos/seed/bento1c/600/600',
							title: 'AI Content Generator',
							description: 'ML-powered writing tool.',
							tags: ['Python', 'FastAPI'],
							href: '#',
						},
					]}
					tertiary={[
						{
							image: 'https://picsum.photos/seed/bento1d/600/400',
							title: 'Real Estate Marketplace',
							tags: ['Vue.js', 'Laravel'],
							href: '#',
						},
						{
							image: 'https://picsum.photos/seed/bento1e/600/400',
							title: 'Event Management System',
							tags: ['Angular', 'Firebase'],
							href: '#',
						},
						{
							image: 'https://picsum.photos/seed/bento1f/600/400',
							title: 'Social Media Dashboard',
							tags: ['React', 'GraphQL'],
							href: '#',
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
	<div className="flex justify-center mb-3 @md:mb-4">
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

interface ProjectItem {
	image: string;
	title: string;
	description?: string;
	tags: string[];
	href: string;
}

interface BentoGridProps {
	featured: ProjectItem;
	secondary: ProjectItem[];
	tertiary: ProjectItem[];
}

const BentoGrid = ({ featured, secondary, tertiary }: BentoGridProps) => (
	<div className="grid @lg:grid-cols-2 @xl:grid-cols-3 gap-4 @md:gap-6">
		{/* Featured - spans 2 cols on xl */}
		<div className="@xl:col-span-2 @xl:row-span-2 group relative rounded-2xl overflow-hidden bg-card border transition-all hover:shadow-lg hover:shadow-primary/10 hover:border-primary/30">
			<div className="relative aspect-video @xl:aspect-auto @xl:h-full min-h-[400px]">
				<Image
					src={featured.image}
					alt={featured.title}
					fill
					className="object-cover transition-transform duration-700 group-hover:scale-105"
				/>
				<div className="absolute inset-0 bg-gradient-to-t from-black via-black/50 to-transparent" />
				<div className="absolute bottom-0 left-0 right-0 p-6 @md:p-8">
					<div className="flex flex-wrap gap-2 mb-3">
						{featured.tags.map((tag, i) => (
							<Badge
								key={i}
								variant="secondary"
								className="bg-white/10 backdrop-blur-sm text-white border-white/20"
							>
								{tag}
							</Badge>
						))}
					</div>
					<h3 className="text-white text-2xl @md:text-3xl font-bold mb-2">
						{featured.title}
					</h3>
					<p className="text-white/80 mb-4 max-w-xl">{featured.description}</p>
					<Button variant="secondary" className="gap-2" asChild>
						<Link href={featured.href}>
							View Project <ArrowUpRight className="size-4" />
						</Link>
					</Button>
				</div>
			</div>
		</div>

		{/* Secondary items */}
		{secondary.map(({ image, title, description, tags, href }, i) => (
			<div
				key={i}
				className="group relative rounded-2xl overflow-hidden bg-card border transition-all hover:shadow-lg hover:shadow-primary/10 hover:border-primary/30"
			>
				<Link href={href} className="block">
					<div className="relative aspect-square">
						<Image
							src={image}
							alt={title}
							fill
							className="object-cover transition-transform duration-500 group-hover:scale-105"
						/>
						<div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent" />
						<div className="absolute bottom-0 left-0 right-0 p-4 @md:p-5">
							<div className="flex flex-wrap gap-1.5 mb-2">
								{tags.map((tag, j) => (
									<Badge
										key={j}
										variant="outline"
										className="text-xs bg-white/10 backdrop-blur-sm text-white border-white/20"
									>
										{tag}
									</Badge>
								))}
							</div>
							<h3 className="text-white text-lg font-semibold mb-1">{title}</h3>
							{description && (
								<p className="text-white/70 text-sm">{description}</p>
							)}
						</div>
					</div>
				</Link>
			</div>
		))}

		{/* Tertiary items */}
		{tertiary.map(({ image, title, tags, href }, i) => (
			<div
				key={i}
				className="group relative rounded-xl overflow-hidden bg-card border transition-all hover:shadow-md hover:shadow-primary/5 hover:border-primary/20"
			>
				<Link href={href} className="block">
					<div className="relative aspect-[3/2]">
						<Image
							src={image}
							alt={title}
							fill
							className="object-cover transition-transform duration-500 group-hover:scale-105"
						/>
						<div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
						<div className="absolute bottom-0 left-0 right-0 p-4">
							<div className="flex flex-wrap gap-1 mb-1.5">
								{tags.map((tag, j) => (
									<Badge
										key={j}
										variant="outline"
										className="text-xs bg-white/10 backdrop-blur-sm text-white border-white/20"
									>
										{tag}
									</Badge>
								))}
							</div>
							<h3 className="text-white font-medium flex items-center gap-1.5">
								{title}
								<ArrowUpRight className="size-3.5 opacity-0 -translate-x-1 group-hover:opacity-100 group-hover:translate-x-0 transition-all" />
							</h3>
						</div>
					</div>
				</Link>
			</div>
		))}
	</div>
);
